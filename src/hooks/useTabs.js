import { useState } from 'react'

/**
 * Hook para manejar la lógica de tabs
 * @param {string} initialTab - Tab inicial
 * @returns {Object} Estado y funciones para manejar tabs
 */
export const useTabs = (initialTab = 'fuel') => {
  const [activeTab, setActiveTab] = useState(initialTab)

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }

  return {
    activeTab,
    handleTabChange,
    setActiveTab
  }
}