import React, { useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import { DEFAULT_BLINK_LAYOUT } from './blink-layout.json'
import './App.css'

const indexMap = [7, 6, 7, 6, 2]

const App = () => {
  const [layout, setLayout] = useState(DEFAULT_BLINK_LAYOUT)
  // const [rowIdx, setRowIdx] = useState(2)
  // const [letterIdx, setLetterIdx] = useState(3)

  return (
    <div className='app'>
      <div className='camera'>
        <div className='camera-box cool-shadow'>{/* <Webcam height='240px' /> */}</div>
        <div className='text-box cool-shadow'>typed-text</div>
      </div>
      <div className='layout cool-shadow'>
        {layout.map(row => (
          <div className='letter-row'>
            {row.map(cell => (
              <div className='letter'>{cell}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
