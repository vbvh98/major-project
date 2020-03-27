import Webcam from 'react-webcam'
import React, { useState, useReducer, useCallback } from 'react'
import AlphabetLayout from './components/AlphabetLayout'
import Modal from './components/Modal'
import { useBlinkDetector } from './hooks/useBlinkDetector'

const reducer = (state, action) => {
  switch (action.type) {
    case 'APP':
      return { text: state.text + action.payload }
    case 'SPACE':
      return { text: state.text + ' ' }
    case 'DEL':
      return { text: state.text.substring(0, state.text.length - 1) }
    default:
      return state
  }
}

const App = () => {
  const [state, disptach] = useReducer(reducer, { text: '' })
  const [display, setDisplay] = useState(false)
  const data = useBlinkDetector()

  const updateDisplayModal = useCallback(
    val => {
      setDisplay(val)
    },
    [setDisplay]
  )

  const updateText = useCallback(
    (type, payload) => {
      disptach({ type, payload })
    },
    [disptach]
  )

  return (
    <div className='app'>
      <div className='camera'>
        <div className='camera-box cool-shadow'>
          <Webcam height='240px' />
        </div>
        <div className='text-box cool-shadow'>{state.text}</div>
      </div>
      <AlphabetLayout
        data={data}
        updateText={updateText}
        updateDisplayModal={updateDisplayModal}
      />
      <Modal data={data} display={display} />
    </div>
  )
}

export default App
