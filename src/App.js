import React from 'react'
import './App.css'

const electron = window.require('electron')
const { ipcRenderer } = electron

const App = () => {
  const [data, setData] = React.useState({ message: 'Loading' })

  React.useEffect(() => {
    // setting up an event listener to read data that background process
    // will send via the main process after processing the data we
    // send from visiable renderer process
    ipcRenderer.on('MESSAGE_FROM_BACKGROUND_VIA_MAIN', (event, args) => {
      setData(args)
    })

    // trigger event to start background process
    // can be triggered pretty much from anywhere after
    // you have set up a listener to get the information
    // back from background process, as I have done in line 13
  }, [])

  const startBlinkDetection = () => {
    ipcRenderer.send('START_BACKGROUND_VIA_MAIN')
  }

  return (
    <div className='App'>
      HELLO {JSON.stringify(data)}
      <button onClick={startBlinkDetection}>Start Detection</button>
    </div>
  )
}

export default App
