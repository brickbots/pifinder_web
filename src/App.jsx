import { useState } from 'react'
import './App.css'
import Box from '@mui/material/Box'
import {Canvas} from '@react-three/fiber'
import {Scene} from './Scene.jsx'
import {PerformanceMonitor} from '@react-three/drei'


function App() {
  const [dpr, setDpr] = useState(Math.min(window.devicePixelRatio, 2))
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
        dpr={dpr}
      >
        <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
        <Scene />
      </Canvas>
    </Box>
  )
}

export default App
