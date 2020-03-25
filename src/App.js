import Webcam from 'react-webcam'
import React, { useState, useEffect } from 'react'
import './App.css'
import { DEFAULT_BLINK_LAYOUT } from './blink-layout.json'
import { useBlinkDetector } from './hooks/useBlinkDetector'
import useInterval from './hooks/useTimer'

const indexMap = [6, 5, 6, 5, 1]

const App = () => {
  const [layout, setLayout] = useState(DEFAULT_BLINK_LAYOUT)
  const [size] = useState(indexMap.length - 1)
  const [rowIdx, setRowIdx] = useState(-1)
  const [colIdx, setColIdx] = useState(-1)
  const [runRow, setRunRow] = useState(true)
  const [ch, setCh] = useState('')
  const [text, setText] = useState('')
  const [start, setStart] = useState(true)

  const nextRowIdx = () => {
    return rowIdx === size ? setRowIdx(0) : setRowIdx(ridx => ridx + 1)
  }

  const nextColIdx = () => {
    return colIdx === indexMap[rowIdx] ? setColIdx(0) : setColIdx(cidx => cidx + 1)
  }

  useInterval(nextRowIdx, start && runRow ? 1200 : null)
  useInterval(nextColIdx, start && !runRow ? 1200 : null)

  const data = useBlinkDetector()

  useEffect(() => {
    if (data.type === 'BLINK' && data.msg === 'S') {
      setRunRow(rr => !rr)
    }
  }, [data])

  useEffect(() => {
    if (runRow) {
      if (colIdx > -1) {
        let ch = layout[rowIdx][colIdx]
        if (ch === 'Space') ch = ' '
        if (ch === 'Action') ch = '\n'
        setCh()
      }
      setColIdx(0)
    }
  }, [runRow])

  useEffect(() => {
    setText(pt => pt + ch)
  }, [ch])

  return (
    <div className='app'>
      <div className='camera'>
        <div className='camera-box cool-shadow'>
          <Webcam height='240px' />
        </div>
        <div className='text-box cool-shadow'>
          {text}: row: {rowIdx}: col: {colIdx}
        </div>
      </div>
      <div className='layout cool-shadow'>
        {layout.map((row, ridx) => (
          <div className={`letter-row ${ridx === rowIdx && 'cool-shadow'}`}>
            {row.map((cell, cidx) => (
              <div
                className={`letter ${!runRow &&
                  ridx === rowIdx &&
                  cidx === colIdx &&
                  'cool-shadow'}`}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
