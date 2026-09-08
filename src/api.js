import { STORAGE_KEYS, DEFAULT_PROMPT_TEMPLATE, MODELS, LANGUAGES, ACCENT_COLORS } from './constants'

function loadSettings() {
  const deviceTheme = globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  return {
    apiKey: localStorage.getItem(STORAGE_KEYS.API_KEY) || '',
    model: localStorage.getItem(STORAGE_KEYS.MODEL) || MODELS[0],
    promptTemplate: localStorage.getItem(STORAGE_KEYS.PROMPT_TEMPLATE) || DEFAULT_PROMPT_TEMPLATE,
    sourceLanguage: localStorage.getItem(STORAGE_KEYS.SOURCE_LANGUAGE) || LANGUAGES[0],
    targetLanguage: localStorage.getItem(STORAGE_KEYS.TARGET_LANGUAGE) || 'English',
    theme: localStorage.getItem(STORAGE_KEYS.THEME) || deviceTheme,
    accentColor: localStorage.getItem(STORAGE_KEYS.ACCENT_COLOR) || 'Purple',
  }
}

function saveSettings({ apiKey, model, promptTemplate, sourceLanguage, targetLanguage, theme, accentColor }) {
  localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey)
  localStorage.setItem(STORAGE_KEYS.MODEL, model)
  localStorage.setItem(STORAGE_KEYS.PROMPT_TEMPLATE, promptTemplate)
  localStorage.setItem(STORAGE_KEYS.SOURCE_LANGUAGE, sourceLanguage)
  localStorage.setItem(STORAGE_KEYS.TARGET_LANGUAGE, targetLanguage)
  localStorage.setItem(STORAGE_KEYS.THEME, theme)
  localStorage.setItem(STORAGE_KEYS.ACCENT_COLOR, accentColor)
}

export async function translate(text, settings, { avoid = [], temperature } = {}) {
  const { apiKey, model, promptTemplate, sourceLanguage, targetLanguage } = settings

  if (!apiKey) {
    throw new Error('Please set your OpenRouter API key in Settings.')
  }

  let systemPrompt = promptTemplate
    .replace(/\{sourceLanguage\}/g, sourceLanguage)
    .replace(/\{targetLanguage\}/g, targetLanguage)

  if (avoid.length > 0) {
    systemPrompt += `\n\nThis text has been translated before. The previous translation(s) below must NOT be repeated — produce a different alternative with different wording:\n${avoid.map(a => `- ${a}`).join('\n')}`
  }

  const body = {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: text },
    ],
  }
  if (typeof temperature === 'number') {
    body.temperature = temperature
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Translation Chatbot',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error: ${response.status}`)
  }

  const data = await response.json()
  const reply = data.choices?.[0]?.message?.content?.trim()
  if (!reply) throw new Error('No translation returned.')
  return reply
}

export async function fetchModels() {
  const response = await fetch('https://openrouter.ai/api/v1/models')
  if (!response.ok) {
    throw new Error(`Failed to load models: ${response.status}`)
  }
  const data = await response.json()
  return data.data || []
}

export { loadSettings, saveSettings, loadRecentModels, addRecentModel, removeRecentModel }

function loadRecentModels() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECENT_MODELS)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function addRecentModel(model) {
  if (!model?.trim()) return loadRecentModels()
  const trimmed = model.trim()
  const list = loadRecentModels().filter(m => m !== trimmed)
  list.unshift(trimmed)
  localStorage.setItem(STORAGE_KEYS.RECENT_MODELS, JSON.stringify(list))
  return list
}

function removeRecentModel(model) {
  const list = loadRecentModels().filter(m => m !== model)
  localStorage.setItem(STORAGE_KEYS.RECENT_MODELS, JSON.stringify(list))
  return list
}
