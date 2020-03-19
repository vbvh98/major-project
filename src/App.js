import React, { useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import { DEFAULT_BLINK_LAYOUT } from './blink-layout.json'
import './App.css'

// const deepCopy = inObject => {
//   let outObject, value, key

//   if (typeof inObject !== 'object' || inObject === null) {
//     return inObject // Return the value if inObject is not an object
//   }

//   // Create an array or object to hold the values
//   outObject = Array.isArray(inObject) ? [] : {}

//   for (key in inObject) {
//     value = inObject[key]

//     // Recursively (deep) copy for nested objects, including arrays
//     outObject[key] = typeof value === 'object' && value !== null ? deepCopy(value) : value
//   }

//   return outObject
// }

// const indexMap = [7, 6, 7, 6, 2]

const App = () => {
  const [layout, setLayout] = useState(DEFAULT_BLINK_LAYOUT)
  // const [rowIdx, setRowIdx] = useState(2)
  // const [letterIdx, setLetterIdx] = useState(3)

  return (
    <div className='app'>
      <div className='camera'>
        <div className='camera-box cool-shadow'>
          <Webcam height='240px' />
        </div>
        <div className='text-box cool-shadow'>typed-text</div>
      </div>
      <div className='layout cool-shadow'>
        {layout.map(({ letterGroup, selection }) => {
          return (
            <div className={selection ? 'letter-row  cool-shadow-selected' : 'letter-row '}>
              {letterGroup.map(({ letter, selection }) => {
                return (
                  <div className={selection ? 'letter cool-shadow-selected' : 'letter'}>
                    {letter}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
