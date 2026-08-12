const assert = require('node:assert/strict')
const { spawnSync } = require('node:child_process')
const { describe, test } = require('node:test')
const { join } = require('node:path')

const CLI = join(__dirname, '..', 'minimax-image.js')
const { buildGenerationBody, endpointURL, normalizeImageResponse } = require(CLI)

function runCli(args) {
  const env = { ...process.env }
  delete env.MINIMAX_API_KEY
  delete env.MINIMAX_BASE_URL
  delete env.MINIMAX_REGION
  const run = spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8', env })
  return { ...run, json: JSON.parse(run.stdout || run.stderr) }
}

describe('MiniMax image CLI', () => {
  test('builds a global text-to-image dry run with typed fields', () => {
    const run = runCli([
      'image', 'generate', '--prompt', 'A bright product hero', '--aspect-ratio', '16:9',
      '--response-format', 'base64', '--seed', '42', '--n', '3',
      '--prompt-optimizer', 'true', '--dry-run',
    ])

    assert.equal(run.status, 0)
    assert.equal(run.json.url, 'https://api.minimax.io/v1/image_generation')
    assert.equal(run.json.headers.Authorization, 'Bearer ***')
    assert.deepEqual(run.json.body, {
      model: 'image-01',
      prompt: 'A bright product hero',
      aspect_ratio: '16:9',
      response_format: 'base64',
      seed: 42,
      n: 3,
      prompt_optimizer: true,
    })
  })

  test('selects the China endpoint and validates explicit dimensions', () => {
    const run = runCli([
      'image', 'generate', '--prompt', 'A square campaign image', '--region', 'cn_zh',
      '--width', '1024', '--height', '1024', '--dry-run',
    ])

    assert.equal(run.status, 0)
    assert.equal(run.json.url, 'https://api.minimaxi.com/v1/image_generation')
    assert.equal(run.json.body.width, 1024)
    assert.equal(run.json.body.height, 1024)
  })

  test('accepts a base override with or without the API version suffix', () => {
    assert.equal(
      endpointURL('https://api.minimax.io', '/v1/image_generation'),
      'https://api.minimax.io/v1/image_generation'
    )
    assert.equal(
      endpointURL('https://api.minimax.io/v1/', '/v1/image_generation'),
      'https://api.minimax.io/v1/image_generation'
    )
  })

  test('normalizes generated outputs and failure metadata', () => {
    assert.deepEqual(normalizeImageResponse({
      id: 'trace-1',
      data: { image_urls: ['https://example.test/image.png'] },
      metadata: { success_count: '1', failed_count: '0' },
      base_resp: { status_code: 0, status_msg: 'success' },
    }), {
      images: ['https://example.test/image.png'],
      success_count: 1,
      failed_count: 0,
      trace_id: 'trace-1',
    })
    assert.deepEqual(normalizeImageResponse({
      id: 'trace-2',
      base_resp: { status_code: 2013, status_msg: 'invalid input' },
    }), {
      error: 'invalid input',
      status_code: 2013,
      trace_id: 'trace-2',
    })
  })

  test('rejects invalid generation parameters', () => {
    assert.throws(
      () => buildGenerationBody({ prompt: 'test', width: '1024' }),
      /--width and --height must be provided together/
    )
    assert.throws(
      () => buildGenerationBody({ prompt: 'test', n: '10' }),
      /--n must be from 1 to 9/
    )
  })
})
