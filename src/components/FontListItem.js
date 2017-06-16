import React from 'react'

function FontListItem({ fontFamily, fontSize, displayText, isSelected, onClick }) {
  const fontStyle = {
    lineHeight: `${fontSize}px`,
    fontSize,
    fontFamily
  }
  return (
    <li
      className={isSelected && 'selected'}
      onClick={() => onClick(fontFamily)}
      >
      <h1 style={fontStyle}>{displayText}</h1>
      <span>{fontFamily}</span>
    </li>
  )
}

export default FontListItem
