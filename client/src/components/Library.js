import React from 'react'
import Artist from './Artist'


const Library = () => {
  document.body.style.backgroundColor = '#121212'

  const topBarStyle = {
    height: '75px',
    width: '100%',
    backgroundColor: 'hsl(0deg, 0%, 0%)',
  }

  const headerStyles = {
    padding: '50px 0 0 53px',
    margin: '0 3px',
    color: '#FFF',
    fontSize: '24px',
    lineHeight: '28px',
    // padding: '25px 10px',
  }

  return (
    <>
      <div style={topBarStyle}></div>
      <div style={headerStyles}>Artists</div>
      <Artist />
    </>
  )
}

export default Library
