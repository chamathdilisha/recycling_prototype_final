import { useCallback, useState } from 'react'
import { analyzeImage } from '../services/aiModelService.js'

let historyIdCounter = 0

/**
 * useImageWorkflow
 * Owns the shared state for capture -> upload -> analyze -> history flow.
 */
export function useImageWorkflow() {
  const [selectedImage, setSelectedImage] = useState(null) // base64/dataURL string
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])
  const [activeHistoryId, setActiveHistoryId] = useState(null)

  const setImageFromCamera = useCallback((dataUrl) => {
    setError(null)
    setResults(null)
    setActiveHistoryId(null)
    setSelectedImage(dataUrl)
  }, [])

  const setImageFromUpload = useCallback((dataUrl) => {
    setError(null)
    setResults(null)
    setActiveHistoryId(null)
    setSelectedImage(dataUrl)
  }, [])

  const resetImage = useCallback(() => {
    setSelectedImage(null)
    setResults(null)
    setError(null)
    setActiveHistoryId(null)
  }, [])

  const submitForAnalysis = useCallback(async () => {
    if (!selectedImage) return
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const data = await analyzeImage(selectedImage)
      setResults(data)

      const entry = {
        id: `scan-${++historyIdCounter}`,
        thumbnail: selectedImage,
        timestamp: new Date(),
        results: data,
      }
      setHistory((prev) => [entry, ...prev])
      setActiveHistoryId(entry.id)
    } catch (err) {
      setError(err.message || 'Something went wrong while analyzing the image.')
    } finally {
      setLoading(false)
    }
  }, [selectedImage])

  const loadFromHistory = useCallback((entryId) => {
    setHistory((prev) => {
      const entry = prev.find((h) => h.id === entryId)
      if (entry) {
        setSelectedImage(entry.thumbnail)
        setResults(entry.results)
        setError(null)
        setActiveHistoryId(entry.id)
      }
      return prev
    })
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
    setActiveHistoryId(null)
  }, [])

  return {
    selectedImage,
    results,
    loading,
    error,
    history,
    activeHistoryId,
    setImageFromCamera,
    setImageFromUpload,
    submitForAnalysis,
    loadFromHistory,
    resetImage,
    clearHistory,
  }
}

