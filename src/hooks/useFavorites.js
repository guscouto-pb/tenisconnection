import { useState } from 'react'

export function useFavorites(storageKey) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const toggle = (id) => {
    setFavorites(prev => {
      const next = prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
      localStorage.setItem(storageKey, JSON.stringify(next))
      return next
    })
  }

  const isFavorite = (id) => favorites.includes(id)

  return [favorites, toggle, isFavorite]
}
