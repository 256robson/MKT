# MiniMax Image

Generate marketing images from text prompts through the MiniMax image API.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | Yes | Synchronous text-to-image generation with URL or base64 output |
| MCP | - | - |
| CLI | Yes | [minimax-image.js](../clis/minimax-image.js) — zero-dependency, single-file |
| SDK | - | - |

## Authentication

- **Type**: Bearer token
- **Header**: `Authorization: Bearer {api_key}`
- **Environment variable**: `MINIMAX_API_KEY`

## Regional Endpoints

| Region | Endpoint |
|--------|----------|
| `global_en` | `https://api.minimax.io/v1/image_generation` |
| `cn_zh` | `https://api.minimaxi.com/v1/image_generation` |

The CLI defaults to `global_en`. Select a region with `--region`, set `MINIMAX_REGION`, or override the host with `MINIMAX_BASE_URL`.

## Model and Request

`image-01` is the text-to-image model. A request requires `model` and `prompt`; prompts can contain up to 1,500 characters.

Optional fields:

- `aspect_ratio`: `1:1`, `16:9`, `4:3`, `3:2`, `2:3`, `3:4`, `9:16`, or `21:9`.
- `width` and `height`: provide both, from 512 through 2048 pixels and divisible by 8. `aspect_ratio` takes priority when both forms are present.
- `response_format`: `url` or `base64`. URL results expire after 24 hours.
- `seed`: integer seed for reproducible output.
- `n`: 1 through 9 images.
- `prompt_optimizer`: boolean prompt optimization switch.

## CLI Quick Start

```bash
# Preview a request without sending it
node tools/clis/minimax-image.js image generate \
  --prompt "A clean editorial product photograph, warm window light" \
  --aspect-ratio 16:9 --n 3 --prompt-optimizer true --dry-run

# Generate through the global endpoint
node tools/clis/minimax-image.js image generate \
  --prompt "A clean editorial product photograph, warm window light" \
  --response-format url

# Generate through the China endpoint
node tools/clis/minimax-image.js image generate \
  --prompt "A square campaign image with a minimal studio background" \
  --region cn_zh --width 1024 --height 1024 --response-format base64

# Inspect supported models
node tools/clis/minimax-image.js models
```

Successful CLI output is normalized to `images`, `success_count`, `failed_count`, and `trace_id`. URL outputs must be downloaded within 24 hours; base64 outputs can be decoded directly.

## API Request

```bash
curl -X POST https://api.minimax.io/v1/image_generation \
  -H "Authorization: Bearer $MINIMAX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "image-01",
    "prompt": "A clean editorial product photograph, warm window light",
    "aspect_ratio": "16:9",
    "response_format": "url",
    "n": 3,
    "prompt_optimizer": true
  }'
```

The API returns images in `data.image_urls`, counts in `metadata.success_count` and `metadata.failed_count`, and operation status in `base_resp.status_code`.

## Relevant Skills

- image
- ad-creative
- social
