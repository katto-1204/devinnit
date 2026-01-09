import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
export interface Snippet {
  id: string
  title: string
  language: string
  code: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  isFavorite: boolean
}

export interface UIComponent {
  id: string
  name: string
  category: string
  code: string
  preview: string
  isFavorite: boolean
}

export interface Widget {
  id: string
  type: 'snippets' | 'components' | 'git-stats' | 'todo' | 'markdown' | 'clock' | 'calendar'
  position: { x: number; y: number }
  size: { w: number; h: number }
}

export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

// User Preferences Store
interface UserPreferencesState {
  theme: 'light' | 'dark'
  sidebarCollapsed: boolean
  currentView: string
  setTheme: (theme: 'light' | 'dark') => void
  toggleSidebar: () => void
  setCurrentView: (view: string) => void
}

export const useUserPreferences = create<UserPreferencesState>()(
  persist(
    (set) => ({
      theme: 'dark',
      sidebarCollapsed: false,
      currentView: 'dashboard',
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setCurrentView: (view) => set({ currentView: view }),
    }),
    {
      name: 'devinnit-preferences',
    }
  )
)

// Snippets Store
interface SnippetsState {
  snippets: Snippet[]
  addSnippet: (snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateSnippet: (id: string, updates: Partial<Snippet>) => void
  deleteSnippet: (id: string) => void
  toggleFavorite: (id: string) => void
}

export const useSnippets = create<SnippetsState>()(
  persist(
    (set) => ({
      snippets: [],
      addSnippet: (snippet) =>
        set((state) => ({
          snippets: [
            ...state.snippets,
            {
              ...snippet,
              id: crypto.randomUUID(),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        })),
      updateSnippet: (id, updates) =>
        set((state) => ({
          snippets: state.snippets.map((s) =>
            s.id === id ? { ...s, ...updates, updatedAt: new Date() } : s
          ),
        })),
      deleteSnippet: (id) =>
        set((state) => ({
          snippets: state.snippets.filter((s) => s.id !== id),
        })),
      toggleFavorite: (id) =>
        set((state) => ({
          snippets: state.snippets.map((s) =>
            s.id === id ? { ...s, isFavorite: !s.isFavorite } : s
          ),
        })),
    }),
    {
      name: 'devinnit-snippets',
    }
  )
)

// Notes Store
interface NotesState {
  notes: Note[]
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateNote: (id: string, updates: Partial<Note>) => void
  deleteNote: (id: string) => void
}

export const useNotes = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (note) =>
        set((state) => ({
          notes: [
            ...state.notes,
            {
              ...note,
              id: crypto.randomUUID(),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        })),
      updateNote: (id, updates) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, ...updates, updatedAt: new Date() } : n
          ),
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        })),
    }),
    {
      name: 'devinnit-notes',
    }
  )
)

// Dashboard Widgets Store
interface DashboardState {
  widgets: Widget[]
  addWidget: (widget: Omit<Widget, 'id'>) => void
  updateWidget: (id: string, updates: Partial<Widget>) => void
  removeWidget: (id: string) => void
  resetLayout: () => void
}

const defaultWidgets: Widget[] = [
  { id: '1', type: 'clock', position: { x: 0, y: 0 }, size: { w: 2, h: 1 } },
  { id: '2', type: 'snippets', position: { x: 2, y: 0 }, size: { w: 2, h: 2 } },
  { id: '3', type: 'todo', position: { x: 0, y: 1 }, size: { w: 2, h: 2 } },
]

export const useDashboard = create<DashboardState>()(
  persist(
    (set) => ({
      widgets: defaultWidgets,
      addWidget: (widget) =>
        set((state) => ({
          widgets: [...state.widgets, { ...widget, id: crypto.randomUUID() }],
        })),
      updateWidget: (id, updates) =>
        set((state) => ({
          widgets: state.widgets.map((w) => (w.id === id ? { ...w, ...updates } : w)),
        })),
      removeWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== id),
        })),
      resetLayout: () => set({ widgets: defaultWidgets }),
    }),
    {
      name: 'devinnit-dashboard',
    }
  )
)

// Playground Store
interface PlaygroundState {
  code: string
  setCode: (code: string) => void
  history: string[]
  addToHistory: (code: string) => void
  clearHistory: () => void
}

export const usePlayground = create<PlaygroundState>()(
  persist(
    (set) => ({
      code: `function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Hello Devinnit!</h1>
      <p>Start coding...</p>
    </div>
  );
}`,
      setCode: (code) => set({ code }),
      history: [],
      addToHistory: (code) =>
        set((state) => ({
          history: [...state.history.slice(-9), code],
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'devinnit-playground',
    }
  )
)
