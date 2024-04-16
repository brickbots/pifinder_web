//import { useState } from 'react'
import './App.css'
import Box from '@mui/material/Box'
import {Canvas} from '@react-three/fiber'
import {Scene} from './Scene.jsx'


function App() {
  return (
    <Box
      id="main-stage"
      width='100vw'
      height="100vh"
      position="relative"
      sx={{background: 'linear-gradient(#000000, #040020 80%, #0A0B3A)'}}
    >
      <Canvas
        linear
        gl={{alpha: true, antialias: true}}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Scene />
      </Canvas>
    </Box>
  )
}

export default App
