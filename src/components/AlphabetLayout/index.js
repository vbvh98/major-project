import React, { useEffect, useState } from 'react'
import { DEFAULT_BLINK_LAYOUT } from '../../blink-layout.json'
import useInterval from '../../hooks/useTimer'

const AlphabetLayout = ({ data, updateText, updateDisplayModal }) => {
  const [layout] = useState(DEFAULT_BLINK_LAYOUT)
  const [indexMap] = useState([6, 5, 6, 5])
  const [size] = useState(indexMap.length - 1)
  const [rowIdx, setRowIdx] = useState(0)
  const [colIdx, setColIdx] = useState(0)
  const [runRow, setRunRow] = useState(true)
  const [start] = useState(true)

  const nextRowIdx = () => {
    return rowIdx === size ? setRowIdx(0) : setRowIdx(ridx => ridx + 1)
  }

  const nextColIdx = () => {
    return colIdx === indexMap[rowIdx]
      ? setColIdx(0)
      : setColIdx(cidx => cidx + 1)
  }

  const reset = () => {
    setColIdx(0)
    setRowIdx(0)
    setRunRow(true)
  }

  useInterval(nextRowIdx, start && runRow ? 1400 : null)
  useInterval(nextColIdx, start && !runRow ? 1400 : null)

  useEffect(() => {
    console.log(data)
    if (data.type === 'BLINK')
      if (data.msg === 'S') {
        if (!runRow) {
          let ch = ''
          if (colIdx > -1) ch = layout[rowIdx][colIdx]
          updateText('APP', ch)
          setColIdx(0)
        }
        setRunRow(rr => !rr)
      } else if (data.msg === 'M') {
        updateText('SPACE')
        reset()
      } else if (data.msg === 'L') {
        updateText('DEL')
        reset()
      }
  }, [data])

  return (
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
  )
}

export default AlphabetLayout
