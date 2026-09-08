import { useState, useEffect, useRef } from 'react'
import { loadSettings, saveSettings, translate, loadRecentModels, addRecentModel, removeRecentModel, fetchModels } from './api.js'
import { DEFAULT_PROMPT_TEMPLATE, LANGUAGES, THEMES, ACCENT_COLORS, STORAGE_KEYS } from './constants.js'
import './App.css'

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function Spinner() {
  return <span className="spinner" />
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  )
}

/* ─── Modal Overlay (drag-safe close) ─── */
function ModalOverlay({ className = '', onClose, children }) {
  const mouseDownTarget = useRef(null)

  return (
    <div
      className={`modal-overlay ${className}`.trim()}
      onMouseDown={e => { mouseDownTarget.current = e.target }}
      onClick={e => {
        // Close only when both mousedown and mouseup happened on the overlay itself,
        // so dragging from inside the modal out doesn't accidentally close it
        if (e.target === e.currentTarget && mouseDownTarget.current === e.currentTarget) {
          onClose()
        }
      }}
    >
      {children}
    </div>
  )
}

/* ─── Model Search Modal ─── */
function formatPrice(perToken) {
  const n = parseFloat(perToken)
  if (!n || isNaN(n) || n <= 0) return null
  const perM = n * 1000000
  return `$${perM >= 100 ? perM.toFixed(0) : perM >= 10 ? perM.toFixed(1) : perM.toFixed(2)}/M`
}

function formatContext(len) {
  if (!len) return null
  if (len >= 1000000) return `${(len / 1000000).toFixed(1)}M context`
  return `${Math.round(len / 1000)}K context`
}

function ModelSearchModal({ open, selectedModel, onSelect, onClose }) {
  const [query, setQuery] = useState('')
  const [models, setModels] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open || models || loading) return
    setLoading(true)
    setError('')
    fetchModels()
      .then(list => setModels(list))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [open, models, loading])

  if (!open) return null

  const q = query.trim().toLowerCase()
  const results = (models || [])
    .filter(m => !q || m.id.toLowerCase().includes(q) || (m.name || '').toLowerCase().includes(q))
    .slice(0, 50)

  return (
    <ModalOverlay className="model-search-overlay" onClose={onClose}>
      <div className="modal model-search-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Search Models</h2>
          <button className="btn-icon close-btn" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </div>

        <div className="model-search-body">
          <input
            className="model-search-input"
            type="text"
            placeholder="Search by model name or id..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />

          {loading && (
            <div className="model-search-status"><Spinner /> Loading models from OpenRouter...</div>
          )}
          {error && <div className="model-search-status model-search-error">{error}</div>}
          {models && !loading && results.length === 0 && (
            <div className="model-search-status">No models found.</div>
          )}

          <div className="model-search-results">
            {results.map(m => {
              const inPrice = formatPrice(m?.pricing?.prompt)
              const outPrice = formatPrice(m?.pricing?.completion)
              const isFree = !inPrice && !outPrice
              const context = formatContext(m.context_length)
              return (
                <button
                  key={m.id}
                  type="button"
                  className={`model-result ${selectedModel === m.id ? 'selected' : ''}`}
                  onClick={() => { onSelect(m.id); onClose() }}
                >
                  <div className="model-result-name">{m.name || m.id}</div>
                  <div className="model-result-id">{m.id}</div>
                  <div className="model-result-meta">
                    {context && <span>{context}</span>}
                    {isFree
                      ? <span className="model-free">Free</span>
                      : <span>{inPrice} in{outPrice ? ` / ${outPrice} out` : ''}</span>
                    }
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </ModalOverlay>
  )
}

/* ─── Settings Modal ─── */
function SettingsModal({ open, settings, recentModels, onPickRecentModel, onRemoveRecentModel, onSave, onClose }) {
  const [draft, setDraft] = useState(settings)
  const [showModelSearch, setShowModelSearch] = useState(false)

  useEffect(() => { if (open) setDraft(settings) }, [open, settings])

  if (!open) return null

  const handleSave = () => { onSave(draft); onClose() }
  const handleReset = () => setDraft({ ...draft, promptTemplate: DEFAULT_PROMPT_TEMPLATE })
  const filteredRecents = recentModels.filter(m => m !== draft.model)

  return (
    <>
    <ModalOverlay onClose={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Settings</h2>
          <button className="btn-icon close-btn" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </div>

        <div className="modal-body">
          <div className="field">
            <span>Appearance</span>
            <div className="theme-toggle">
              {THEMES.map(t => (
                <button
                  key={t}
                  className={`theme-toggle-btn ${draft.theme === t ? 'active' : ''}`}
                  onClick={() => setDraft({ ...draft, theme: t })}
                >
                  {t === 'dark' ? <MoonIcon /> : <SunIcon />} {t[0].toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <span>Accent Color</span>
            <div className="accent-swatches">
              {Object.entries(ACCENT_COLORS).map(([name, { primary }]) => (
                <button
                  key={name}
                  className={`swatch ${draft.accentColor === name ? 'active' : ''}`}
                  style={{ backgroundColor: primary }}
                  onClick={() => setDraft({ ...draft, accentColor: name })}
                  aria-label={name}
                  title={name}
                />
              ))}
            </div>
          </div>

          <label className="field">
            <span>OpenRouter API Key</span>
            <input
              type="password"
              placeholder="sk-or-v1-..."
              value={draft.apiKey}
              onChange={e => setDraft({ ...draft, apiKey: e.target.value })}
            />
          </label>

          <label className="field">
            <span>AI Model</span>
            <div className="model-input-row">
              <input
                type="text"
                placeholder="e.g. openai/gpt-4o, anthropic/claude-sonnet-4"
                value={draft.model}
                onChange={e => setDraft({ ...draft, model: e.target.value })}
              />
              <button
                type="button"
                className="model-search-btn"
                onClick={() => setShowModelSearch(true)}
                aria-label="Search models from OpenRouter"
                title="Search models from OpenRouter"
              >
                <SearchIcon />
              </button>
            </div>
            {filteredRecents.length > 0 && (
              <div className="recent-models">
                <span className="recent-models-label">Model history:</span>
                <div className="recent-models-list">
                  {filteredRecents.map(m => (
                    <div key={m} className="recent-model-chip">
                      <button
                        type="button"
                        className="recent-model-chip-name"
                        title={m}
                        onClick={() => {
                          setDraft({ ...draft, model: m })
                          onPickRecentModel(m)
                        }}
                      >
                        {m}
                      </button>
                      <button
                        type="button"
                        className="recent-model-chip-remove"
                        aria-label={`Remove ${m} from history`}
                        title="Remove from history"
                        onClick={e => {
                          e.stopPropagation()
                          onRemoveRecentModel(m)
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </label>

          <div className="field-row-languages">
            <label className="field">
              <span>Source Language</span>
              <select value={draft.sourceLanguage} onChange={e => setDraft({ ...draft, sourceLanguage: e.target.value })}>
                {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </label>

            <label className="field">
              <span>Target Language</span>
              <select value={draft.targetLanguage} onChange={e => setDraft({ ...draft, targetLanguage: e.target.value })}>
                {LANGUAGES.filter(l => l !== 'Auto Detect').map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </label>
          </div>

          <label className="field">
            <div className="field-row">
              <span>Prompt Template</span>
              <button className="btn-text" onClick={handleReset}>Reset to default</button>
            </div>
            <textarea
              rows={8}
              value={draft.promptTemplate}
              onChange={e => setDraft({ ...draft, promptTemplate: e.target.value })}
            />
            <span className="field-hint">Use {'{sourceLanguage}'} and {'{targetLanguage}'} as placeholders.</span>
          </label>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </ModalOverlay>

    <ModelSearchModal
      open={showModelSearch}
      selectedModel={draft.model}
      onSelect={id => setDraft({ ...draft, model: id })}
      onClose={() => setShowModelSearch(false)}
    />
    </>
  )
}

/* ─── Chat Message ─── */
function Message({ msg, onRetranslate, busy }) {
  const [copiedVariant, setCopiedVariant] = useState(null)
  const variants = [msg.content, ...(msg.alternatives || [])]
  const isAssistant = msg.role === 'assistant'

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedVariant(index)
        setTimeout(() => setCopiedVariant(null), 1500)
      })
      .catch(() => {})
  }

  return (
    <div className={`message ${msg.role}`}>
      <div className="bubble">
        <div className="bubble-header">
          <div className="bubble-label">{isAssistant ? 'Translation' : 'You'}</div>
          <div className="bubble-actions">
            {isAssistant && (
              <button
                type="button"
                className="bubble-retranslate-btn"
                onClick={onRetranslate}
                disabled={busy}
                aria-label="Re-translate"
                title="Re-translate"
              >
                {busy ? <Spinner /> : <RefreshIcon />}
              </button>
            )}
          </div>
        </div>
        {variants.map((v, i) => (
          <div key={i}>
            {i > 0 && <div className="bubble-divider" />}
            <div className="bubble-result">
              <div className="bubble-text">{v}</div>
              <button
                type="button"
                className={`bubble-copy-btn ${copiedVariant === i ? 'copied' : ''}`}
                onClick={() => handleCopy(v, i)}
                aria-label="Copy translation"
                title={copiedVariant === i ? 'Copied!' : 'Copy'}
              >
                {copiedVariant === i ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main App ─── */
export default function App() {
  const [settings, setSettings] = useState(loadSettings)
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES)
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [recentModels, setRecentModels] = useState(loadRecentModels)
  const [retranslatingIndex, setRetranslatingIndex] = useState(null)

  const chatEndRef = useRef(null)
  const textareaRef = useRef(null)

  // Persist messages to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Apply theme and accent color to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme)
    const color = ACCENT_COLORS[settings.accentColor] || ACCENT_COLORS.Purple
    document.documentElement.style.setProperty('--primary', color.primary)
    document.documentElement.style.setProperty('--primary-hover', color.hover)
  }, [settings.theme, settings.accentColor])

  const recordRecentModel = (model) => {
    const updated = addRecentModel(model)
    setRecentModels(updated)
  }

  const handleRemoveRecentModel = (model) => {
    const updated = removeRecentModel(model)
    setRecentModels(updated)
  }

  const handleSaveSettings = (newSettings) => {
    saveSettings(newSettings)
    setSettings(newSettings)
    recordRecentModel(newSettings.model)
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return

    setError('')
    setInput('')
    // Reset textarea height after clearing
    const el = textareaRef.current
    if (el) { el.style.height = 'auto' }

    setMessages(prev => [...prev, { role: 'user', content: text }])
    setLoading(true)

    try {
      const result = await translate(text, settings)
      setMessages(prev => [...prev, { role: 'assistant', content: result }])
      recordRecentModel(settings.model)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRetranslate = async (index) => {
    const msg = messages[index]
    const source = messages[index - 1]
    if (!msg || msg.role !== 'assistant' || !source || source.role !== 'user') return
    if (retranslatingIndex !== null || loading) return

    const existing = [msg.content, ...(msg.alternatives || [])]
    setError('')
    setRetranslatingIndex(index)

    try {
      let result = ''
      for (let attempt = 0; attempt < 3; attempt++) {
        result = await translate(source.content, settings, { avoid: existing, temperature: 1 })
        if (!existing.includes(result)) break
      }
      if (existing.includes(result)) {
        setError('Could not generate a different translation. Please try again.')
        return
      }
      setMessages(prev => prev.map((m, i) =>
        i === index ? { ...m, alternatives: [...(m.alternatives || []), result] } : m
      ))
    } catch (err) {
      setError(err.message)
    } finally {
      setRetranslatingIndex(null)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const autoResize = () => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = Math.min(el.scrollHeight, 160) + 'px'
    }
  }

  const handleClearChat = () => {
    setMessages([])
    localStorage.removeItem(STORAGE_KEYS.MESSAGES)
  }

  return (
    <div className="app">
      {/* Top Bar */}
      <header className="topbar">
        <div className="topbar-left">
          <span className="logo"><GlobeIcon /></span>
          <h1>Translation Chatbot</h1>
        </div>
        <div className="topbar-right">
          {messages.length > 0 && (
            <button className="btn-icon clear-btn" onClick={handleClearChat} aria-label="Clear chat" title="Clear chat">
              <TrashIcon />
            </button>
          )}
          <button className="btn-icon settings-btn" onClick={() => setShowSettings(true)} aria-label="Settings">
            <SettingsIcon />
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="chat-area">
        {messages.length === 0 && !loading && (
          <div className="empty-state">
            <p>Type any text and it will be translated automatically.</p>
            <button className="hint-link" onClick={() => setShowSettings(true)}>Configure your API key and preferences in Settings.</button>
          </div>
        )}

        {messages.map((msg, i) => (
          <Message
            key={i}
            msg={msg}
            busy={retranslatingIndex === i}
            onRetranslate={msg.role === 'assistant' ? () => handleRetranslate(i) : undefined}
          />
        ))}

        {loading && (
          <div className="message assistant">
            <div className="bubble">
              <div className="bubble-label">Translation</div>
              <div className="bubble-text loading-indicator">
                <Spinner /> Translating...
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="error-bar">
            <span>{error}</span>
            <button onClick={() => setError('')}>&times;</button>
          </div>
        )}

        <div ref={chatEndRef} />
      </main>

      {/* Input Area */}
      <footer className="input-area">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            className="chat-input"
            placeholder="Type text to translate... (Enter to send, Shift+Enter for newline)"
            value={input}
            onChange={e => { setInput(e.target.value); autoResize() }}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            className="send-btn"
            onClick={handleSend}
            disabled={!input.trim() || loading}
            aria-label="Send"
          >
            <SendIcon />
          </button>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        open={showSettings}
        settings={settings}
        recentModels={recentModels}
        onPickRecentModel={recordRecentModel}
        onRemoveRecentModel={handleRemoveRecentModel}
        onSave={handleSaveSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  )
}
