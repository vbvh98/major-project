import { useState, useEffect, useCallback } from 'react'
const electron = window.require('electron')
const { ipcRenderer } = electron

const useBlinkDetector = () => {
  const [data, setData] = useState({ message: 'Loading' })

  useEffect(() => {
    ipcRenderer.on('MESSAGE_FROM_BACKGROUND_VIA_MAIN', (_, args) => {
      setData(JSON.parse(args.message))
    })
  }, [])

  const startBlinkDetection = useCallback(() => {
    ipcRenderer.send('START_BACKGROUND_VIA_MAIN')
  }, [])

  const stopBlinkDetection = useCallback(() => {
    ipcRenderer.send('STOP_HIDDEN')
  }, [])

  return [data, startBlinkDetection, stopBlinkDetection]
}

export default useBlinkDetector
