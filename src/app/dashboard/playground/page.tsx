'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import {
    Play,
    RotateCcw,
    Copy,
    Download,
    Check,
    AlertCircle,
    Maximize2,
    Minimize2,
    Sun,
    Moon,
} from 'lucide-react'
import { usePlayground } from '@/lib/stores'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

const defaultCode = `function App() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center',
      fontFamily: 'system-ui'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        {count}
      </h1>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button 
          onClick={() => setCount(c => c - 1)}
          style={{
            padding: '0.5rem 1.5rem',
            fontSize: '1.5rem',
            borderRadius: '0.5rem',
            border: '2px solid #333',
            background: '#f5f5f5',
            cursor: 'pointer'
          }}
        >
          −
        </button>
        <button 
          onClick={() => setCount(c => c + 1)}
          style={{
            padding: '0.5rem 1.5rem',
            fontSize: '1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            background: '#ff5e00',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}`

export default function PlaygroundPage() {
    const { code, setCode, addToHistory } = usePlayground()
    const [localCode, setLocalCode] = useState(code || defaultCode)
    const [output, setOutput] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light')
    const [highlighted, setHighlighted] = useState('')
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // Highlight code
    useEffect(() => {
        try {
            const html = Prism.highlight(localCode, Prism.languages.jsx, 'jsx')
            setHighlighted(html)
        } catch {
            setHighlighted(localCode)
        }
    }, [localCode])

    // Generate preview HTML
    const generatePreview = useCallback(() => {
        const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      background: ${previewTheme === 'dark' ? '#0a0a0a' : '#ffffff'}; 
      color: ${previewTheme === 'dark' ? '#fafafa' : '#0a0a0a'};
      min-height: 100vh;
    }
    #root { min-height: 100vh; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    try {
      ${localCode}
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<App />);
      window.parent.postMessage({ type: 'success' }, '*');
    } catch (error) {
      window.parent.postMessage({ type: 'error', message: error.message }, '*');
    }
  </script>
</body>
</html>`
        return html
    }, [localCode, previewTheme])

    // Run code
    const runCode = useCallback(() => {
        setError(null)
        setCode(localCode)
        addToHistory(localCode)
        const html = generatePreview()
        setOutput(html)
        toast.success('Code executed!')
    }, [localCode, setCode, addToHistory, generatePreview])

    // Listen for errors from iframe
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'error') {
                setError(event.data.message)
                toast.error('Error: ' + event.data.message)
            }
        }
        window.addEventListener('message', handleMessage)
        return () => window.removeEventListener('message', handleMessage)
    }, [])

    // Auto-run on mount
    useEffect(() => {
        runCode()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCopy = async () => {
        await navigator.clipboard.writeText(localCode)
        setCopied(true)
        toast.success('Copied to clipboard!')
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDownload = () => {
        const blob = new Blob([localCode], { type: 'text/javascript' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'component.jsx'
        a.click()
        URL.revokeObjectURL(url)
        toast.success('Downloaded component.jsx')
    }

    const handleReset = () => {
        setLocalCode(defaultCode)
        runCode()
        toast.info('Code reset to default')
    }

    return (
        <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''} p-6 lg:p-8`}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
            >
                <div>
                    <h1
                        className="text-4xl font-black mb-2"
                        style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                    >
                        Playground
                    </h1>
                    <p className="text-muted-foreground">
                        Write React code and see it come to life instantly
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={handleReset}>
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleCopy}>
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleDownload}>
                        <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setIsFullscreen(!isFullscreen)}>
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </Button>
                    <Button onClick={runCode} className="bg-orange hover:bg-orange-dark text-white gap-2">
                        <Play className="w-4 h-4" />
                        Run
                    </Button>
                </div>
            </motion.div>

            {/* Editor and Preview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`grid lg:grid-cols-2 gap-4 ${isFullscreen ? 'h-[calc(100vh-140px)]' : 'min-h-[600px]'}`}
            >
                {/* Code Editor */}
                <div className="relative rounded-xl overflow-hidden border border-border bg-[#0d0d0d] flex flex-col">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card/50">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="ml-2 text-xs text-muted-foreground font-mono">App.jsx</span>
                    </div>

                    <div className="relative flex-1 overflow-hidden">
                        {/* Highlighted code (display) */}
                        <pre
                            className="absolute inset-0 p-4 overflow-auto text-sm pointer-events-none"
                            aria-hidden="true"
                        >
                            <code
                                className="language-jsx"
                                dangerouslySetInnerHTML={{ __html: highlighted }}
                            />
                        </pre>

                        {/* Textarea (input) */}
                        <textarea
                            ref={textareaRef}
                            value={localCode}
                            onChange={(e) => setLocalCode(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Tab') {
                                    e.preventDefault()
                                    const start = e.currentTarget.selectionStart
                                    const end = e.currentTarget.selectionEnd
                                    const newValue = localCode.substring(0, start) + '  ' + localCode.substring(end)
                                    setLocalCode(newValue)
                                    setTimeout(() => {
                                        if (textareaRef.current) {
                                            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2
                                        }
                                    }, 0)
                                }
                                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                                    runCode()
                                }
                            }}
                            className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-orange font-mono text-sm resize-none outline-none"
                            spellCheck={false}
                            placeholder="Write your React code here..."
                        />
                    </div>

                    {error && (
                        <div className="px-4 py-2 bg-destructive/20 border-t border-destructive/30 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-destructive" />
                            <span className="text-sm text-destructive">{error}</span>
                        </div>
                    )}
                </div>

                {/* Preview */}
                <div className="relative rounded-xl overflow-hidden border border-border bg-card flex flex-col">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground font-mono">Preview</span>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs text-green-500">Live</span>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => setPreviewTheme(previewTheme === 'dark' ? 'light' : 'dark')}
                        >
                            {previewTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </Button>
                    </div>

                    <div className="flex-1 relative">
                        {output ? (
                            <iframe
                                ref={iframeRef}
                                srcDoc={output}
                                className="absolute inset-0 w-full h-full border-0"
                                title="Preview"
                                sandbox="allow-scripts"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                Click &quot;Run&quot; to see the preview
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Tips */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 p-4 rounded-xl bg-card border border-border"
            >
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-orange">Tips:</span> Press{' '}
                    <kbd className="px-2 py-1 rounded bg-secondary text-xs font-mono">Ctrl + Enter</kbd> to run.
                    Export your name function as <code className="text-orange">App</code>.
                </p>
            </motion.div>
        </div>
    )
}
