import React from 'react'
import { render } from 'react-dom'

export default (url: string) => {
  const root = document.createElement('div')
  document.body.appendChild(root)

  function escClose(e: KeyboardEvent) {
    if (e.keyCode === 27) {
      document.body.removeChild(root)
      document.body.removeEventListener('keydown', escClose)
    }
  }

  document.body.addEventListener('keydown', escClose)

  render(
    <div style={style.modal} onClick={() => document.body.removeChild(root)}>
      <img style={style.img} src={url} />
    </div>,
    root,
  )
}

const style: {
  [key: string]: React.CSSProperties
} = {
  modal: {
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 2000,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0,0,0,.65)',
    cursor: 'zoom-out',
  },
  img: {
    maxWidth: '95%',
    maxHeight: '95%',
  },
}
