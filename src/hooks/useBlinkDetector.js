import { useState, useEffect } from 'react'

// const electron = window.require('electron')
// const { ipcRenderer } = electron

const useBlinkDetector = () => {
  const [data, setData] = useState({ message: 'Loading' })

  useEffect(() => {
    // ipcRenderer.on('MESSAGE_FROM_BACKGROUND_VIA_MAIN', (_, args) => {
    // setData(args)
    // })
  }, [])

  const startBlinkDetection = () => {
    // ipcRenderer.send('START_BACKGROUND_VIA_MAIN')
  }

  const stopBlinkDetection = () => {
    // ipcRenderer.send('STOP_HIDDEN')
  }

  return [data, startBlinkDetection, stopBlinkDetection]
}

export default useBlinkDetector
