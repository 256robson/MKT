#!/usr/bin/env node

// MiniMax text-to-image CLI for marketing asset generation.

const API_KEY = process.env.MINIMAX_API_KEY

const REGIONS = {
  global_en: 'https://api.minimax.io',
  cn_zh: 'https://api.minimaxi.com',
}

const IMAGE_MODELS = ['image-01', 'image-01-live']
const DEFAULT_MODEL = 'image-01'
const ASPECT_RATIOS = ['1:1', '16:9', '4:3', '3:2', '2:3', '3:4', '9:16', '21:9']
const RESPONSE_FORMATS = ['url', 'base64']

function parseArgs(argv) {
  const result = { _: [] }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg.startsWith('--')) {
      const key = arg.slice(2)
      const next = argv[i + 1]
      if (next && !next.startsWith('--')) {
        result[key] = next
        i++
      } else {
        result[key] = true
      }
    } else {
      result._.push(arg)
    }
  }
  return result
}

function integerFlag(value, name) {
  const parsed = Number(value)
  if (!Number.isInteger(parsed)) throw new Error(`--${name} must be an integer`)
  return parsed
}

function booleanFlag(value, name) {
  if (value === true || value === 'true') return true
  if (value === 'false') return false
  throw new Error(`--${name} must be true or false`)
}

function buildGenerationBody(args) {
  const model = args.model || DEFAULT_MODEL
  if (!IMAGE_MODELS.includes(model)) {
    throw new Error(`Unknown image model "${model}". Use: ${IMAGE_MODELS.join(', ')}`)
  }

  const prompt = args.prompt
  if (!prompt) throw new Error('--prompt required')
  if (prompt.length > 1500) throw new Error('--prompt must be 1500 characters or fewer')

  const body = { model, prompt }

  if (args['subject-reference'] !== undefined) {
    const imageFile = args['subject-reference']
    const isPublicURL = typeof imageFile === 'string' && /^https?:\/\//i.test(imageFile)
    const isDataURL = typeof imageFile === 'string' && /^data:image\/(?:jpeg|jpg|png);base64,/i.test(imageFile)
    if (!isPublicURL && !isDataURL) {
      throw new Error('--subject-reference must be a public URL or a JPEG/PNG base64 data URL')
    }
    body.subject_reference = [{ type: 'character', image_file: imageFile }]
  }

  if (args['aspect-ratio']) {
    if (!ASPECT_RATIOS.includes(args['aspect-ratio'])) {
      throw new Error(`--aspect-ratio must be one of: ${ASPECT_RATIOS.join(', ')}`)
    }
    body.aspect_ratio = args['aspect-ratio']
  }

  const hasWidth = args.width !== undefined
  const hasHeight = args.height !== undefined
  if (hasWidth !== hasHeight) throw new Error('--width and --height must be provided together')
  if (hasWidth) {
    if (model !== 'image-01') throw new Error('--width and --height are only supported by image-01')
    const width = integerFlag(args.width, 'width')
    const height = integerFlag(args.height, 'height')
    for (const [name, value] of [['width', width], ['height', height]]) {
      if (value < 512 || value > 2048 || value % 8 !== 0) {
        throw new Error(`--${name} must be from 512 to 2048 and divisible by 8`)
      }
    }
    body.width = width
    body.height = height
  }

  if (args['response-format']) {
    if (!RESPONSE_FORMATS.includes(args['response-format'])) {
      throw new Error(`--response-format must be one of: ${RESPONSE_FORMATS.join(', ')}`)
    }
    body.response_format = args['response-format']
  }

  if (args.seed !== undefined) body.seed = integerFlag(args.seed, 'seed')
  if (args.n !== undefined) {
    const n = integerFlag(args.n, 'n')
    if (n < 1 || n > 9) throw new Error('--n must be from 1 to 9')
    body.n = n
  }
  if (args['prompt-optimizer'] !== undefined) {
    body.prompt_optimizer = booleanFlag(args['prompt-optimizer'], 'prompt-optimizer')
  }

  return body
}

function normalizeImageResponse(payload) {
  const statusCode = payload?.base_resp?.status_code
  if (statusCode !== undefined && statusCode !== 0) {
    return {
      error: payload.base_resp.status_msg || 'MiniMax image generation failed',
      status_code: statusCode,
      trace_id: payload.id || null,
    }
  }
  return {
    images: Array.isArray(payload?.data?.image_urls) ? payload.data.image_urls : [],
    success_count: Number(payload?.metadata?.success_count || 0),
    failed_count: Number(payload?.metadata?.failed_count || 0),
    trace_id: payload?.id || null,
  }
}

function endpointURL(baseURL, path) {
  const base = baseURL.replace(/\/+$/, '')
  if (base.endsWith('/v1') && path.startsWith('/v1/')) return `${base}${path.slice(3)}`
  return `${base}${path}`
}

async function request(args, method, path, body) {
  const region = args.region || process.env.MINIMAX_REGION || 'global_en'
  if (!REGIONS[region]) {
    return { error: `Unknown region "${region}". Use: ${Object.keys(REGIONS).join(', ')}` }
  }
  const baseURL = process.env.MINIMAX_BASE_URL || REGIONS[region]
  const url = endpointURL(baseURL, path)

  if (args['dry-run']) {
    return {
      _dry_run: true,
      method,
      url,
      headers: { 'Authorization': 'Bearer ***', 'Content-Type': 'application/json' },
      body,
    }
  }
  if (!API_KEY) return { error: 'MINIMAX_API_KEY environment variable required' }

  const response = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const text = await response.text()
  let payload
  try {
    payload = JSON.parse(text)
  } catch {
    return { error: 'MiniMax returned a non-JSON response', status: response.status }
  }
  if (!response.ok) {
    return { error: payload?.base_resp?.status_msg || 'MiniMax request failed', status: response.status }
  }
  return normalizeImageResponse(payload)
}

async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv)
  const [resource, action] = args._
  let result

  if (resource === 'image' && action === 'generate') {
    result = await request(args, 'POST', '/v1/image_generation', buildGenerationBody(args))
  } else if (resource === 'models') {
    result = { default: DEFAULT_MODEL, image: IMAGE_MODELS }
  } else {
    result = {
      error: 'Unknown command',
      usage: {
        image: 'image generate --prompt <text> [--model <image-01|image-01-live>] [--subject-reference <url|data-url>] [--aspect-ratio <ratio> | --width <px> --height <px>] [--response-format <url|base64>] [--seed <n>] [--n <1-9>] [--prompt-optimizer <true|false>]',
        models: 'models',
        options: '--region <global_en|cn_zh> --dry-run',
      },
    }
  }

  console.log(JSON.stringify(result, null, 2))
  if (result.error) process.exitCode = 1
  return result
}

if (require.main === module) {
  main().catch(error => {
    console.error(JSON.stringify({ error: error.message }))
    process.exitCode = 1
  })
}

module.exports = { buildGenerationBody, endpointURL, normalizeImageResponse, parseArgs }
