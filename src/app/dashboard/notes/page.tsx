'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Plus,
    Search,
    FileText,
    Trash2,
    Edit3,
    Download,
    Eye,
    Code2,
    X,
    SplitSquareVertical,
} from 'lucide-react'
import { useNotes, Note } from '@/lib/stores'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

// Simple markdown parser
function parseMarkdown(markdown: string): string {
    let html = markdown
        // Headers
        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-black mt-6 mb-4">$1</h1>')
        // Bold and Italic
        .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Code blocks
        .replace(/```([\s\S]*?)```/g, '<pre class="p-4 rounded-lg bg-[#0d0d0d] overflow-x-auto my-4"><code>$1</code></pre>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-secondary text-orange text-sm">$1</code>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-orange hover:underline">$1</a>')
        // Lists
        .replace(/^\s*[-*]\s+(.*)$/gim, '<li class="ml-4">• $1</li>')
        .replace(/^\s*\d+\.\s+(.*)$/gim, '<li class="ml-4 list-decimal">$1</li>')
        // Blockquotes
        .replace(/^>\s*(.*$)/gim, '<blockquote class="border-l-4 border-orange pl-4 my-4 text-muted-foreground italic">$1</blockquote>')
        // Horizontal rules
        .replace(/^---$/gim, '<hr class="my-6 border-border">')
        // Line breaks
        .replace(/\n\n/g, '</p><p class="my-2">')
        .replace(/\n/g, '<br>')

    return `<div class="prose prose-invert max-w-none"><p class="my-2">${html}</p></div>`
}

export default function NotesPage() {
    const { notes, addNote, updateNote, deleteNote } = useNotes()
    const [search, setSearch] = useState('')
    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [editingNote, setEditingNote] = useState<Note | null>(null)
    const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split')
    const [newNote, setNewNote] = useState({
        title: '',
        content: '',
        tags: [] as string[],
    })
    const [tagInput, setTagInput] = useState('')

    // Get all unique tags
    const allTags = Array.from(new Set(notes.flatMap((n) => n.tags)))

    // Filter notes
    const filteredNotes = notes.filter((n) => {
        const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.content.toLowerCase().includes(search.toLowerCase())
        const matchesTag = !selectedTag || n.tags.includes(selectedTag)
        return matchesSearch && matchesTag
    })

    const handleCreateNote = useCallback(() => {
        if (!newNote.title.trim()) {
            toast.error('Please enter a title')
            return
        }
        addNote(newNote)
        setNewNote({ title: '', content: '', tags: [] })
        setIsCreating(false)
        toast.success('Note created!')
    }, [newNote, addNote])

    const handleUpdateNote = useCallback(() => {
        if (!editingNote) return
        updateNote(editingNote.id, editingNote)
        setEditingNote(null)
        toast.success('Note updated!')
    }, [editingNote, updateNote])

    const handleDelete = useCallback((id: string) => {
        deleteNote(id)
        toast.success('Note deleted')
    }, [deleteNote])

    const addTag = (isEditing: boolean = false) => {
        if (!tagInput.trim()) return
        if (isEditing && editingNote) {
            if (!editingNote.tags.includes(tagInput.trim())) {
                setEditingNote({
                    ...editingNote,
                    tags: [...editingNote.tags, tagInput.trim()]
                })
            }
        } else {
            if (!newNote.tags.includes(tagInput.trim())) {
                setNewNote({ ...newNote, tags: [...newNote.tags, tagInput.trim()] })
            }
        }
        setTagInput('')
    }

    const removeTag = (tag: string, isEditing: boolean = false) => {
        if (isEditing && editingNote) {
            setEditingNote({
                ...editingNote,
                tags: editingNote.tags.filter((t) => t !== tag)
            })
        } else {
            setNewNote({ ...newNote, tags: newNote.tags.filter((t) => t !== tag) })
        }
    }

    const exportNote = (note: Note, format: 'md' | 'html') => {
        const content = format === 'md'
            ? `# ${note.title}\n\n${note.content}`
            : `<!DOCTYPE html><html><head><title>${note.title}</title></head><body>${parseMarkdown(note.content)}</body></html>`

        const blob = new Blob([content], { type: format === 'md' ? 'text/markdown' : 'text/html' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${note.title.replace(/\s+/g, '-').toLowerCase()}.${format}`
        a.click()
        URL.revokeObjectURL(url)
        toast.success(`Exported as ${format.toUpperCase()}`)
    }

    const currentContent = editingNote?.content || newNote.content
    const renderedMarkdown = useMemo(() => parseMarkdown(currentContent), [currentContent])

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
            >
                <div>
                    <h1
                        className="text-4xl font-black mb-2"
                        style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                    >
                        Notes
                    </h1>
                    <p className="text-muted-foreground">
                        Markdown notes with live preview
                    </p>
                </div>
                <Button
                    onClick={() => setIsCreating(true)}
                    className="bg-orange hover:bg-orange-dark text-white gap-2"
                >
                    <Plus className="w-4 h-4" />
                    New Note
                </Button>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col sm:flex-row gap-4 mb-6"
            >
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search notes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                    {allTags.map((tag) => (
                        <Badge
                            key={tag}
                            variant={selectedTag === tag ? 'default' : 'secondary'}
                            className={`cursor-pointer transition-colors ${selectedTag === tag ? 'bg-orange text-white' : 'hover:bg-orange/20'
                                }`}
                            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </motion.div>

            {/* Notes Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                <AnimatePresence mode="popLayout">
                    {filteredNotes.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="col-span-full py-16 text-center"
                        >
                            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-10 h-10 text-muted-foreground/50" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No notes yet</h3>
                            <p className="text-muted-foreground mb-4">
                                Create your first note to get started
                            </p>
                            <Button
                                onClick={() => setIsCreating(true)}
                                className="bg-orange hover:bg-orange-dark text-white"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Create Note
                            </Button>
                        </motion.div>
                    ) : (
                        filteredNotes.map((note, i) => (
                            <motion.div
                                key={note.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ y: -2 }}
                                className="group p-4 rounded-xl bg-card border border-border hover:border-orange/30 transition-all cursor-pointer"
                                onClick={() => setEditingNote(note)}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-orange" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{note.title}</h3>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(note.updatedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                exportNote(note, 'md')
                                            }}
                                            className="p-2 rounded-lg hover:bg-secondary transition-colors"
                                        >
                                            <Download className="w-4 h-4" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDelete(note.id)
                                            }}
                                            className="p-2 rounded-lg hover:bg-destructive/20 text-destructive transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                                    {note.content.substring(0, 150)}...
                                </p>

                                <div className="flex items-center gap-1 flex-wrap">
                                    {note.tags.slice(0, 3).map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                    {note.tags.length > 3 && (
                                        <Badge variant="secondary" className="text-xs">
                                            +{note.tags.length - 3}
                                        </Badge>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Create/Edit Modal */}
            <AnimatePresence>
                {(isCreating || editingNote) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => {
                            setIsCreating(false)
                            setEditingNote(null)
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-6xl h-[85vh] rounded-2xl bg-card border border-border overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-border">
                                <Input
                                    placeholder="Note title"
                                    value={editingNote?.title ?? newNote.title}
                                    onChange={(e) => {
                                        if (editingNote) {
                                            setEditingNote({ ...editingNote, title: e.target.value })
                                        } else {
                                            setNewNote({ ...newNote, title: e.target.value })
                                        }
                                    }}
                                    className="max-w-md font-semibold text-lg border-none bg-transparent focus-visible:ring-0"
                                />
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setViewMode('edit')}
                                        className={viewMode === 'edit' ? 'bg-secondary' : ''}
                                    >
                                        <Code2 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setViewMode('split')}
                                        className={viewMode === 'split' ? 'bg-secondary' : ''}
                                    >
                                        <SplitSquareVertical className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setViewMode('preview')}
                                        className={viewMode === 'preview' ? 'bg-secondary' : ''}
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            setIsCreating(false)
                                            setEditingNote(null)
                                        }}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Editor and Preview */}
                            <div className="flex-1 grid" style={{
                                gridTemplateColumns:
                                    viewMode === 'edit' ? '1fr' :
                                        viewMode === 'preview' ? '1fr' :
                                            '1fr 1fr'
                            }}>
                                {/* Editor */}
                                {viewMode !== 'preview' && (
                                    <div className="flex flex-col border-r border-border">
                                        <Textarea
                                            placeholder="Write your markdown here..."
                                            value={editingNote?.content ?? newNote.content}
                                            onChange={(e) => {
                                                if (editingNote) {
                                                    setEditingNote({ ...editingNote, content: e.target.value })
                                                } else {
                                                    setNewNote({ ...newNote, content: e.target.value })
                                                }
                                            }}
                                            className="flex-1 p-4 rounded-none border-none resize-none focus-visible:ring-0 font-mono text-sm"
                                        />
                                    </div>
                                )}

                                {/* Preview */}
                                {viewMode !== 'edit' && (
                                    <div className="flex flex-col overflow-auto p-6">
                                        <div
                                            className="prose prose-invert max-w-none"
                                            dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-border">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {(editingNote?.tags ?? newNote.tags).map((tag) => (
                                            <Badge key={tag} variant="secondary" className="gap-1">
                                                {tag}
                                                <X
                                                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                                                    onClick={() => removeTag(tag, !!editingNote)}
                                                />
                                            </Badge>
                                        ))}
                                        <Input
                                            placeholder="Add tag..."
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(!!editingNote))}
                                            className="w-32 h-8"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            onClick={() => {
                                                setIsCreating(false)
                                                setEditingNote(null)
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={editingNote ? handleUpdateNote : handleCreateNote}
                                            className="bg-orange hover:bg-orange-dark text-white"
                                        >
                                            {editingNote ? 'Save Changes' : 'Create Note'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
