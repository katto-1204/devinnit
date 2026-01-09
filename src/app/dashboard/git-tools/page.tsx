'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Terminal,
    Copy,
    Check,
    Play,
    ChevronRight,
    BookOpen,
    GitBranch,
    GitCommit,
    GitMerge,
    GitPullRequest,
    Trash2,
    RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

// Git commands cheatsheet
const gitCommands = [
    {
        category: 'Basics',
        icon: GitBranch,
        commands: [
            { cmd: 'git init', desc: 'Initialize a new repository' },
            { cmd: 'git clone <url>', desc: 'Clone a repository' },
            { cmd: 'git status', desc: 'Check status of files' },
            { cmd: 'git add .', desc: 'Stage all changes' },
            { cmd: 'git add <file>', desc: 'Stage specific file' },
        ],
    },
    {
        category: 'Commits',
        icon: GitCommit,
        commands: [
            { cmd: 'git commit -m "message"', desc: 'Commit with message' },
            { cmd: 'git commit --amend', desc: 'Amend last commit' },
            { cmd: 'git log --oneline', desc: 'View commit history' },
            { cmd: 'git diff', desc: 'Show unstaged changes' },
            { cmd: 'git diff --staged', desc: 'Show staged changes' },
        ],
    },
    {
        category: 'Branches',
        icon: GitBranch,
        commands: [
            { cmd: 'git branch', desc: 'List branches' },
            { cmd: 'git branch <name>', desc: 'Create new branch' },
            { cmd: 'git checkout <branch>', desc: 'Switch branch' },
            { cmd: 'git checkout -b <name>', desc: 'Create and switch' },
            { cmd: 'git branch -d <name>', desc: 'Delete branch' },
        ],
    },
    {
        category: 'Merging',
        icon: GitMerge,
        commands: [
            { cmd: 'git merge <branch>', desc: 'Merge branch' },
            { cmd: 'git rebase <branch>', desc: 'Rebase onto branch' },
            { cmd: 'git cherry-pick <hash>', desc: 'Cherry-pick commit' },
            { cmd: 'git merge --abort', desc: 'Abort merge' },
            { cmd: 'git rebase --abort', desc: 'Abort rebase' },
        ],
    },
    {
        category: 'Remote',
        icon: GitPullRequest,
        commands: [
            { cmd: 'git remote -v', desc: 'View remotes' },
            { cmd: 'git push origin <branch>', desc: 'Push to remote' },
            { cmd: 'git pull origin <branch>', desc: 'Pull from remote' },
            { cmd: 'git fetch', desc: 'Fetch changes' },
            { cmd: 'git remote add origin <url>', desc: 'Add remote' },
        ],
    },
    {
        category: 'Undo',
        icon: RotateCcw,
        commands: [
            { cmd: 'git reset HEAD~1', desc: 'Undo last commit (keep changes)' },
            { cmd: 'git reset --hard HEAD~1', desc: 'Undo last commit (discard)' },
            { cmd: 'git checkout -- <file>', desc: 'Discard file changes' },
            { cmd: 'git stash', desc: 'Stash changes' },
            { cmd: 'git stash pop', desc: 'Apply stashed changes' },
        ],
    },
]

interface TerminalLine {
    type: 'input' | 'output' | 'error' | 'success'
    content: string
}

// Simulated command responses
function simulateCommand(cmd: string): TerminalLine[] {
    const trimmed = cmd.trim().toLowerCase()

    if (trimmed === 'git status') {
        return [
            { type: 'output', content: 'On branch main' },
            { type: 'output', content: 'Your branch is up to date with \'origin/main\'.' },
            { type: 'output', content: '' },
            { type: 'output', content: 'nothing to commit, working tree clean' },
        ]
    }

    if (trimmed === 'git branch') {
        return [
            { type: 'success', content: '* main' },
            { type: 'output', content: '  develop' },
            { type: 'output', content: '  feature/new-ui' },
        ]
    }

    if (trimmed === 'git log --oneline') {
        return [
            { type: 'output', content: 'a1b2c3d (HEAD -> main) Add new feature' },
            { type: 'output', content: 'e4f5g6h Fix bug in login' },
            { type: 'output', content: 'i7j8k9l Initial commit' },
        ]
    }

    if (trimmed.startsWith('git commit')) {
        return [
            { type: 'success', content: '[main abc1234] ' + (cmd.match(/"([^"]+)"/) ? cmd.match(/"([^"]+)"/)![1] : 'Commit message') },
            { type: 'output', content: ' 1 file changed, 10 insertions(+), 2 deletions(-)' },
        ]
    }

    if (trimmed === 'git init') {
        return [
            { type: 'success', content: 'Initialized empty Git repository in /project/.git/' },
        ]
    }

    if (trimmed.startsWith('git add')) {
        return [
            { type: 'success', content: 'Changes staged for commit.' },
        ]
    }

    if (trimmed === 'help') {
        return [
            { type: 'output', content: 'Available commands:' },
            { type: 'output', content: '  git init, git status, git branch, git log --oneline' },
            { type: 'output', content: '  git add, git commit, clear, help' },
            { type: 'output', content: '' },
            { type: 'output', content: 'Check the cheatsheet for more commands!' },
        ]
    }

    if (trimmed === 'clear') {
        return []
    }

    if (!trimmed.startsWith('git')) {
        return [
            { type: 'error', content: `Command not found: ${cmd.split(' ')[0]}` },
            { type: 'output', content: 'Type "help" for available commands.' },
        ]
    }

    return [
        { type: 'output', content: `Simulated: ${cmd}` },
    ]
}

export default function GitToolsPage() {
    const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
        { type: 'output', content: 'Welcome to Devinnit Git Terminal Simulator' },
        { type: 'output', content: 'Type "help" for available commands' },
        { type: 'output', content: '' },
    ])
    const [currentInput, setCurrentInput] = useState('')
    const [copiedCmd, setCopiedCmd] = useState<string | null>(null)
    const [expandedCategory, setExpandedCategory] = useState<string | null>('Basics')
    const terminalRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
    }, [terminalLines])

    const runCommand = (cmd: string) => {
        if (!cmd.trim()) return

        setTerminalLines((prev) => [
            ...prev,
            { type: 'input', content: `$ ${cmd}` },
        ])

        if (cmd.trim().toLowerCase() === 'clear') {
            setTerminalLines([])
        } else {
            const output = simulateCommand(cmd)
            setTerminalLines((prev) => [...prev, ...output])
        }

        setCurrentInput('')
    }

    const handleCopyCommand = async (cmd: string) => {
        await navigator.clipboard.writeText(cmd)
        setCopiedCmd(cmd)
        toast.success('Copied to clipboard!')
        setTimeout(() => setCopiedCmd(null), 2000)
    }

    const handlePasteToTerminal = (cmd: string) => {
        setCurrentInput(cmd)
        inputRef.current?.focus()
        toast.info('Command pasted to terminal')
    }

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1
                    className="text-4xl font-black mb-2"
                    style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                >
                    Git Tools
                </h1>
                <p className="text-muted-foreground">
                    Terminal simulator and Git cheatsheet
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Terminal */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-xl overflow-hidden border border-border bg-[#0d0d0d] flex flex-col"
                >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="ml-2 text-xs text-muted-foreground font-mono">Terminal</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setTerminalLines([])}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Terminal Output */}
                    <div
                        ref={terminalRef}
                        className="flex-1 p-4 overflow-y-auto font-mono text-sm min-h-[400px] max-h-[500px]"
                        onClick={() => inputRef.current?.focus()}
                    >
                        <AnimatePresence>
                            {terminalLines.map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`mb-1 ${line.type === 'input' ? 'text-orange' :
                                            line.type === 'error' ? 'text-red-500' :
                                                line.type === 'success' ? 'text-green-500' :
                                                    'text-muted-foreground'
                                        }`}
                                >
                                    {line.content || '\u00A0'}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Current Input Line */}
                        <div className="flex items-center gap-2 text-orange">
                            <ChevronRight className="w-4 h-4" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={currentInput}
                                onChange={(e) => setCurrentInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        runCommand(currentInput)
                                    }
                                }}
                                className="flex-1 bg-transparent outline-none caret-orange"
                                placeholder="Enter command..."
                                autoFocus
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Cheatsheet */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-xl border border-border bg-card overflow-hidden flex flex-col"
                >
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card/50">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Git Cheatsheet</span>
                    </div>

                    <div className="flex-1 overflow-y-auto max-h-[500px]">
                        {gitCommands.map((category) => {
                            const Icon = category.icon
                            const isExpanded = expandedCategory === category.category

                            return (
                                <div key={category.category} className="border-b border-border last:border-b-0">
                                    <button
                                        onClick={() => setExpandedCategory(isExpanded ? null : category.category)}
                                        className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center">
                                                <Icon className="w-4 h-4 text-orange" />
                                            </div>
                                            <span className="font-medium">{category.category}</span>
                                            <Badge variant="secondary" className="text-xs">
                                                {category.commands.length}
                                            </Badge>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: isExpanded ? 90 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-4 pb-4 space-y-2">
                                                    {category.commands.map((cmd) => (
                                                        <div
                                                            key={cmd.cmd}
                                                            className="group flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                                                        >
                                                            <div className="flex-1 min-w-0">
                                                                <code className="text-sm text-orange font-mono block truncate">
                                                                    {cmd.cmd}
                                                                </code>
                                                                <p className="text-xs text-muted-foreground mt-1">
                                                                    {cmd.desc}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                                                                <motion.button
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onClick={() => handleCopyCommand(cmd.cmd)}
                                                                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                                                                    title="Copy"
                                                                >
                                                                    {copiedCmd === cmd.cmd ? (
                                                                        <Check className="w-4 h-4 text-green-500" />
                                                                    ) : (
                                                                        <Copy className="w-4 h-4" />
                                                                    )}
                                                                </motion.button>
                                                                <motion.button
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onClick={() => handlePasteToTerminal(cmd.cmd)}
                                                                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                                                                    title="Paste to terminal"
                                                                >
                                                                    <Play className="w-4 h-4" />
                                                                </motion.button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Tips */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 p-4 rounded-xl bg-card border border-border"
            >
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-orange">Tips:</span> Click any command in the cheatsheet to copy,
                    or use the play button to paste it into the terminal. Type{' '}
                    <code className="px-1.5 py-0.5 rounded bg-secondary text-orange text-xs">help</code> for available simulated commands.
                </p>
            </motion.div>
        </div>
    )
}
