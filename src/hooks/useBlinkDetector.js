import { useState, useEffect } from 'react'

const electron = window.require('electron')
const { ipcRenderer } = electron

export const useBlinkDetector = () => {
  const [data, setData] = useState({ type: 'INFO', msg: 'Loading' })

  useEffect(() => {
    ipcRenderer.on('MESSAGE_FROM_BACKGROUND_VIA_MAIN', (_, args) => {
      setData(JSON.parse(args.message))
    })
  }, [])

  ipcRenderer.send('START_BACKGROUND_VIA_MAIN')

  return data
}
