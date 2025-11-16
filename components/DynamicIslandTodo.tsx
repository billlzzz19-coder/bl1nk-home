"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Pencil, Plus, X, Check, RotateCcw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface Todo {
  id: number
  text: string
  completed: boolean
}

const snappyTransition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 1,
}

export default function DynamicIslandTodo() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo("")
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) return 0
    return a.completed ? 1 : -1
  })

  const completedTodos = todos.filter((todo) => todo.completed).length
  const remainingTodos = todos.length - completedTodos

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExpanded && !(event.target as Element).closest(".dynamic-island-todo")) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isExpanded])

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  return (
    <motion.div
      className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 dynamic-island-todo"
      initial={false}
      animate={{
        width: isExpanded ? "var(--di-expanded-width)" : "var(--di-collapsed-width)",
        height: isExpanded ? "auto" : "var(--di-collapsed-height)",
        borderRadius: isExpanded ? "var(--di-expanded-radius)" : "var(--di-border-radius)",
      }}
      transition={{
        ...snappyTransition,
        borderRadius: { duration: 0.08 },
      }}
    >
      <motion.div
        className="bg-black text-white h-full cursor-pointer overflow-hidden rounded-[inherit] border border-gray-800"
        onClick={() => !isExpanded && setIsExpanded(true)}
        layout
        transition={snappyTransition}
      >
        {!isExpanded && (
          <motion.div className="p-2 flex items-center justify-between h-full" layout>
            <span className="font-semibold">To-do List</span>
            <div className="flex items-center space-x-2 h-full">
              {remainingTodos > 0 && (
                <span className="bg-yellow-500 text-black rounded-full w-6 h-6 min-w-[24px] flex items-center justify-center text-xs font-medium">
                  {remainingTodos}
                </span>
              )}
              {completedTodos > 0 && (
                <span className="bg-gray-500 text-white rounded-full w-6 h-6 min-w-[24px] flex items-center justify-center text-xs font-medium">
                  {completedTodos}
                </span>
              )}
            </div>
          </motion.div>
        )}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                ...snappyTransition,
                opacity: { duration: 0.1 },
              }}
              className="p-4 pb-2"
            >
              <div className="flex mb-4 items-center">
                <div className="flex-grow relative mr-2">
                  <Input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a new todo"
                    className="w-full bg-[#111111] border-[#222222] text-gray-200 placeholder:text-gray-500 focus:border-[#333333] focus:outline-none focus:ring-0 focus:ring-offset-0 h-10 pl-10 transition-colors duration-200 rounded-lg"
                    ref={inputRef}
                    aria-label="New todo input"
                  />
                  <Pencil className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
                <Button
                  onClick={addTodo}
                  className="bg-[#111111] hover:bg-[#222222] text-gray-400 hover:text-gray-200 transition-colors h-10 px-3 border border-[#222222] rounded-lg"
                >
                  <Plus size={16} />
                </Button>
              </div>
              <motion.ul className="space-y-2 max-h-60 overflow-y-auto" role="list" aria-label="Todo list" layout>
                <AnimatePresence initial={false}>
                  {sortedTodos.map((todo, index) => (
                    <motion.li
                      key={todo.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={snappyTransition}
                      className="flex items-center justify-between"
                      role="listitem"
                      layout
                    >
                      <span
                        className={`flex-grow text-sm ${
                          todo.completed ? "text-gray-500 line-through decoration-gray-500" : "text-yellow-500"
                        }`}
                        onClick={() => toggleTodo(todo.id)}
                      >
                        {todo.text}
                      </span>
                      <div className="flex items-center bg-[#111111] rounded-md border border-[#222222]">
                        <Button
                          onClick={() => toggleTodo(todo.id)}
                          size="sm"
                          variant="ghost"
                          className="h-10 px-3 text-gray-400 hover:text-gray-200 hover:bg-[#222222] rounded-none"
                          aria-label={`${todo.completed ? "Revert" : "Complete"} "${todo.text}"`}
                        >
                          {todo.completed ? <RotateCcw size={14} /> : <Check size={14} />}
                        </Button>
                        <Separator orientation="vertical" className="h-5 bg-[#222222]" />
                        <Button
                          onClick={() => removeTodo(todo.id)}
                          size="sm"
                          variant="ghost"
                          className="h-10 px-3 text-gray-400 hover:text-gray-200 hover:bg-[#222222] rounded-none"
                          aria-label={`Remove "${todo.text}" from the list`}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
