import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import crypto from 'crypto'
import fs from 'fs/promises'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const DEFAULT_OPENAI_TTS_MODEL = 'gpt-4o-mini-tts'
const DEFAULT_OPENAI_TTS_VOICE = 'coral'
const DEFAULT_OPENAI_IMAGE_MODEL = 'gpt-image-1'
const DEFAULT_OPENAI_IMAGE_PROMPT_MODEL = 'gpt-4.1-mini'
const GENERATED_PUBLIC_DIR = path.resolve(__dirname, 'public/generated')

function cacheKey(payload: unknown) {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(payload))
    .digest('hex')
    .slice(0, 24)
}

function generatedPath(kind: 'audio' | 'images', filename: string) {
  return {
    filePath: path.join(GENERATED_PUBLIC_DIR, kind, filename),
    publicUrl: `/generated/${kind}/${filename}`,
  }
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function writeGeneratedFile(filePath: string, data: Buffer | string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, data)
}

function readJsonBody(req: any) {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []

    req.on('data', (chunk: Buffer | string) => chunks.push(Buffer.from(chunk)))
    req.on('error', reject)
    req.on('end', () => {
      try {
        const body = Buffer.concat(chunks).toString('utf8')
        resolve(body ? JSON.parse(body) : {})
      } catch (error) {
        reject(error)
      }
    })
  })
}

async function readApiError(response: Response, fallback: string) {
  const responseText = await response.text()

  try {
    const parsed = JSON.parse(responseText)
    return parsed.error?.message || fallback
  } catch {
    return responseText || fallback
  }
}

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

interface OpenAiTtsApiOptions {
  apiKey?: string;
  model: string;
  voice: string;
}

interface OpenAiImageApiOptions {
  apiKey?: string;
  model: string;
  promptModel: string;
}

function openAiTtsApi({ apiKey, model, voice }: OpenAiTtsApiOptions) {
  return {
    name: 'openai-tts-api',
    configureServer(server: any) {
      server.middlewares.use('/api/openai-tts', async (req: any, res: any, next: () => void) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        res.setHeader('Content-Type', 'application/json')

        if (!apiKey) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Missing OPENAI_API_KEY in your local environment.' }))
          return
        }

        try {
          const body = await readJsonBody(req) as { text?: string }
          const text = body.text?.trim()

          if (!text) {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'Missing text to narrate.' }))
            return
          }

          const instructions = 'Read this museum story aloud in a calm, warm, accessible narration style. Speak clearly, with gentle pacing and emotional respect.'
          const key = cacheKey({ type: 'tts', model, voice, text, instructions, responseFormat: 'mp3' })
          const { filePath, publicUrl } = generatedPath('audio', `${key}.mp3`)

          if (await fileExists(filePath)) {
            res.end(JSON.stringify({
              audioUrl: publicUrl,
              mimeType: 'audio/mpeg',
              cached: true,
            }))
            return
          }

          const openAiResponse = await fetch(
            'https://api.openai.com/v1/audio/speech',
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model,
                voice,
                input: text,
                instructions,
                response_format: 'mp3',
              }),
            },
          )

          if (!openAiResponse.ok) {
            const errorText = await readApiError(openAiResponse, 'OpenAI TTS request failed.')
            res.statusCode = openAiResponse.status
            res.end(JSON.stringify({ error: errorText }))
            return
          }

          const audioBuffer = Buffer.from(await openAiResponse.arrayBuffer())
          await writeGeneratedFile(filePath, audioBuffer)

          res.end(JSON.stringify({
            audioUrl: publicUrl,
            mimeType: 'audio/mpeg',
            cached: false,
          }))
        } catch (error) {
          res.statusCode = 500
          res.end(JSON.stringify({
            error: error instanceof Error ? error.message : 'Unable to generate narration.',
          }))
        }
      })
    },
  }
}

async function createOpenAiImagePrompt({
  apiKey,
  promptModel,
  person,
  memory,
  emotion,
}: {
  apiKey: string;
  promptModel: string;
  person?: string;
  memory: string;
  emotion?: string;
}) {
  const promptResponse = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: promptModel,
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text: [
                'You write image-generation prompts for a museum of personal stories.',
                'Read the story and emotional insight. Create one concise, respectful visual prompt.',
                'The image should express the emotional core, not literal trauma or graphic harm.',
                'Base the prompt only on the person, events, setting, themes, and emotions in the story.',
                'Do not use planets, stars, galaxies, black holes, nebulae, comets, moons, or space imagery unless the story itself explicitly mentions them.',
                'Use museum-quality cinematic composition, human-scale details, atmosphere, place, objects, and symbolic lighting grounded in the story.',
                'Do not request readable text, captions, typography, logos, or UI.',
                'Return only the final image prompt, no markdown.',
              ].join(' '),
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: [
                person ? `Person: ${person}` : '',
                emotion ? `Emotional insight: ${emotion}` : '',
                `Story: ${memory.slice(0, 12000)}`,
              ].filter(Boolean).join('\n\n'),
            },
          ],
        },
      ],
      max_output_tokens: 220,
    }),
  })

  if (!promptResponse.ok) {
    const errorText = await readApiError(promptResponse, 'OpenAI prompt request failed.')
    throw new Error(errorText)
  }

  const data = await promptResponse.json()
  const outputText = data.output_text
    || data.output?.flatMap((item: any) => item.content || [])
      .map((content: any) => content.text)
      .filter(Boolean)
      .join('\n')

  if (!outputText?.trim()) {
    throw new Error('OpenAI did not return an image prompt.')
  }

  return outputText.trim()
}

function openAiImageApi({ apiKey, model, promptModel }: OpenAiImageApiOptions) {
  return {
    name: 'openai-image-api',
    configureServer(server: any) {
      server.middlewares.use('/api/openai-image', async (req: any, res: any, next: () => void) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        res.setHeader('Content-Type', 'application/json')

        if (!apiKey) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Missing OPENAI_API_KEY in your local environment.' }))
          return
        }

        try {
          const body = await readJsonBody(req) as {
            prompt?: string;
            title?: string;
            person?: string;
            memory?: string;
            emotion?: string;
          }
          const memory = body.memory?.trim()

          if (!memory) {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'Missing story text for image generation.' }))
            return
          }

          const keyPayload = {
            type: 'image',
            model,
            promptModel,
            person: body.person || '',
            memory,
            emotion: body.emotion || '',
            size: '1536x1024',
            quality: 'low',
          }
          const key = cacheKey(keyPayload)
          const { filePath, publicUrl } = generatedPath('images', `${key}.png`)
          const promptPath = filePath.replace(/\.png$/, '.prompt.txt')

          if (await fileExists(filePath)) {
            const cachedPrompt = await fs.readFile(promptPath, 'utf8').catch(() => '')
            res.end(JSON.stringify({
              imageUrl: publicUrl,
              mimeType: 'image/png',
              prompt: cachedPrompt,
              cached: true,
            }))
            return
          }

          const generatedPrompt = await createOpenAiImagePrompt({
            apiKey,
            promptModel,
            person: body.person,
            memory,
            emotion: body.emotion,
          })

          const openAiResponse = await fetch(
            'https://api.openai.com/v1/images/generations',
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model,
                prompt: generatedPrompt,
                size: '1536x1024',
                quality: 'low',
                n: 1,
              }),
            },
          )

          if (!openAiResponse.ok) {
            const errorText = await readApiError(openAiResponse, 'OpenAI image request failed.')
            res.statusCode = openAiResponse.status
            res.end(JSON.stringify({ error: errorText }))
            return
          }

          const data = await openAiResponse.json()
          const imageBase64 = data.data?.[0]?.b64_json
          const mimeType = 'image/png'

          if (!imageBase64) {
            res.statusCode = 502
            res.end(JSON.stringify({ error: 'OpenAI did not return image data.' }))
            return
          }

          await writeGeneratedFile(filePath, Buffer.from(imageBase64, 'base64'))
          await writeGeneratedFile(promptPath, generatedPrompt)

          res.end(JSON.stringify({
            imageUrl: publicUrl,
            imageBase64,
            mimeType,
            prompt: generatedPrompt,
            cached: false,
          }))
        } catch (error) {
          res.statusCode = 500
          res.end(JSON.stringify({
            error: error instanceof Error ? error.message : 'Unable to generate image.',
          }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      figmaAssetResolver(),
      openAiTtsApi({
        apiKey: env.OPENAI_API_KEY,
        model: env.OPENAI_TTS_MODEL || DEFAULT_OPENAI_TTS_MODEL,
        voice: env.OPENAI_TTS_VOICE || DEFAULT_OPENAI_TTS_VOICE,
      }),
      openAiImageApi({
        apiKey: env.OPENAI_API_KEY,
        model: env.OPENAI_IMAGE_MODEL || DEFAULT_OPENAI_IMAGE_MODEL,
        promptModel: env.OPENAI_IMAGE_PROMPT_MODEL || DEFAULT_OPENAI_IMAGE_PROMPT_MODEL,
      }),
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})
