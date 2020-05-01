import React, { useReducer, useCallback } from 'react'
import AlphabetLayout from './components/AlphabetLayout'
// import Modal from './components/Modal'
import useBlinkDetector from './hooks/useBlinkDetector'

const reducer = (state, action) => {
  switch (action.type) {
    case 'APP':
      return { text: state.text + action.payload }
    case 'SPACE':
      return { text: state.text + ' ' }
    case 'DEL':
      return { text: state.text.substring(0, state.text.length - 2) }
    default:
      return state
  }
}

const App = () => {
  const [state, disptach] = useReducer(reducer, { text: '' })
  const [data, startBlinkDetection, stopBlinkDetection] = useBlinkDetector()

  const updateText = useCallback(
    (type, payload) => {
      disptach({ type, payload })
    },
    [disptach]
  )

  return (
    <div className='app'>
      <div className='camera'>
        <div className='camera-box cool-shadow'></div>
        <div className='text-box cool-shadow'>{state.text}</div>
      </div>
      <AlphabetLayout
        data={data}
        updateText={updateText}
        startBlinkDetection={startBlinkDetection}
        stopBlinkDetection={stopBlinkDetection}
      />
      {/* <Modal data={data} display={display} /> */}
    </div>
  )
}

export default App
