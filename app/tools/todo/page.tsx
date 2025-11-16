"use client"

import { useState } from 'react'
import { Plus, Trash2, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo,
          completed: false,
          createdAt: new Date(),
        },
      ])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 pt-24"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="glass max-w-2xl w-full p-8 rounded-3xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 gradient-text">Dynamic Island Todo</h1>
          <p className="text-gray-400">
            {completedCount} of {todos.length} tasks completed
          </p>
        </div>

        {/* Add Todo */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-400"
          />
          <button onClick={addTodo} className="btn btn-primary px-6">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          <AnimatePresence>
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                  todo.completed ? 'bg-green-500/10' : 'bg-white/5'
                } hover:bg-white/10`}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    todo.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-400 hover:border-primary'
                  }`}
                >
                  {todo.completed && <Check className="w-4 h-4 text-white" />}
                </button>

                <span
                  className={`flex-1 ${
                    todo.completed ? 'line-through text-gray-500' : 'text-white'
                  }`}
                >
                  {todo.text}
                </span>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {todos.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p>No tasks yet. Add one to get started!</p>
            </div>
          )}
        </div>

        {/* Stats */}
        {todos.length > 0 && (
          <div className="mt-6 p-4 bg-white/5 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total: {todos.length}</span>
              <span className="text-gray-400">Active: {todos.length - completedCount}</span>
              <span className="text-green-400">Completed: {completedCount}</span>
            </div>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-green-500 transition-all duration-300"
                style={{ width: `${todos.length > 0 ? (completedCount / todos.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
