export const DEFAULT_PROMPT_TEMPLATE = `You are a professional translator. Translate the user's text automatically.

Rules:
- Source language: {sourceLanguage}
- Target language: {targetLanguage}
- Preserve the original tone, meaning, and formatting
- Return ONLY the translated text with no explanations, no notes, and no additional commentary`

export const APP_VERSION = 'v0.0.8'

export const MODELS = [
  'openai/gpt-4o',
  'openai/gpt-4o-mini',
  'anthropic/claude-sonnet-4',
  'anthropic/claude-3.5-haiku',
  'google/gemini-2.5-flash',
  'google/gemini-2.5-pro',
  'meta-llama/llama-3.1-70b-instruct',
  'mistralai/mistral-large',
]

export const LANGUAGES = [
  'Auto Detect',
  'English',
  'Chinese (Simplified)',
  'Chinese (Traditional)',
  'Japanese',
  'Korean',
  'French',
  'German',
  'Spanish',
  'Portuguese',
  'Russian',
  'Arabic',
  'Hindi',
  'Italian',
  'Dutch',
  'Thai',
  'Vietnamese',
  'Turkish',
  'Polish',
  'Swedish',
]

export const THEMES = ['dark', 'light']

export const ACCENT_COLORS = {
  Purple:   { primary: '#6c5ce7', hover: '#7e6ff0' },
  Blue:     { primary: '#0984e3', hover: '#3d9be9' },
  Teal:     { primary: '#00b894', hover: '#2ec4a9' },
  Green:    { primary: '#00b060', hover: '#22c55e' },
  Orange:   { primary: '#e17055', hover: '#e88a72' },
  Pink:     { primary: '#e84393', hover: '#f06aab' },
  Red:      { primary: '#d63031', hover: '#e05050' },
  Indigo:   { primary: '#5352ed', hover: '#6c6bf0' },
  Violet:   { primary: '#8e44ad', hover: '#a05bc4' },
  Cyan:     { primary: '#00b8d4', hover: '#22cde3' },
  Sky:      { primary: '#0ea5e9', hover: '#38bdf8' },
  Lime:     { primary: '#7cb342', hover: '#8fc75d' },
  Gold:     { primary: '#c9a227', hover: '#d8b544' },
  Amber:    { primary: '#f59e0b', hover: '#f7ac39' },
  Salmon:   { primary: '#fa8072', hover: '#fb9a8f' },
  Crimson:  { primary: '#dc143c', hover: '#e33a5e' },
  Magenta:  { primary: '#c13584', hover: '#d34d97' },
  Rose:     { primary: '#e11d48', hover: '#e8406a' },
  Fuchsia:  { primary: '#d946ef', hover: '#df62f1' },
  Maroon:   { primary: '#a4133c', hover: '#b52a50' },
  Navy:     { primary: '#1e3a8a', hover: '#2f4da3' },
  Slate:    { primary: '#64748b', hover: '#7889a0' },
  Emerald:  { primary: '#059669', hover: '#17aa7c' },
  Lavender: { primary: '#a78bfa', hover: '#b49ffc' },
  Sunrise:  { primary: '#e76f51', hover: '#f4a261', gradient: 'linear-gradient(135deg, #e76f51, #f4a261)' },
  Lagoon:   { primary: '#0077b6', hover: '#00b4d8', gradient: 'linear-gradient(135deg, #0077b6, #00b4d8)' },
  Aurora:   { primary: '#2a9d8f', hover: '#80ed99', gradient: 'linear-gradient(135deg, #2a9d8f, #80ed99)' },
  Candy:    { primary: '#d63384', hover: '#ff85a1', gradient: 'linear-gradient(135deg, #d63384, #ff85a1)' },
  Fire:     { primary: '#d00000', hover: '#ffba08', gradient: 'linear-gradient(135deg, #d00000, #ffba08)' },
  Twilight: { primary: '#4361ee', hover: '#7209b7', gradient: 'linear-gradient(135deg, #4361ee, #7209b7)' },
  Citrus:   { primary: '#65a30d', hover: '#facc15', gradient: 'linear-gradient(135deg, #65a30d, #facc15)' },
  Prism:    { primary: '#0891b2', hover: '#db2777', gradient: 'linear-gradient(135deg, #0891b2, #7c3aed, #db2777)' },
  Cosmos:   { primary: '#4338ca', hover: '#ec4899', gradient: 'linear-gradient(135deg, #4338ca, #ec4899)' },
}

export const STORAGE_KEYS = {
  API_KEY: 'translation_chatbot_api_key',
  MODEL: 'translation_chatbot_model',
  PROMPT_TEMPLATE: 'translation_chatbot_prompt_template',
  SOURCE_LANGUAGE: 'translation_chatbot_source_language',
  TARGET_LANGUAGE: 'translation_chatbot_target_language',
  THEME: 'translation_chatbot_theme',
  ACCENT_COLOR: 'translation_chatbot_accent_color',
  MESSAGES: 'translation_chatbot_messages',
  RECENT_MODELS: 'translation_chatbot_recent_models',
}
