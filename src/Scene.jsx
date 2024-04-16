//import { useState } from 'react'
import './App.css'
import {Circle, GradientTexture, PerspectiveCamera, Ring, Sphere, Torus, TrackballControls} from '@react-three/drei'
import {BackSide} from 'three'
import {useRef} from 'react'
import {useFrame, useThree} from '@react-three/fiber'
import {CameraControls} from './CameraControls.jsx'

export const Scene = () => {

  const cameraRef = useRef()
  const {camera  } = useThree()

  const handleZoom = (event) => {

    const maxFov = 160
    const minFov = 10

    const deltaY = event.deltaY;
    camera.fov = Math.min(maxFov, Math.max(minFov, camera.fov + deltaY * 0.2))
    camera.updateProjectionMatrix()
  }

  return (
    <>
      <CameraControls ref={cameraRef}/>
      <Sphere
        args={[100, 32, 32]}
        onWheel={(event) => handleZoom(event)}
      >
        <meshBasicMaterial side={BackSide}>
          <GradientTexture
            sGradientTexture
            stops={[0, 0.5, 1]} // As many stops as you want
            colors={['blue', 'black', 'red']} // Colors need to match the number of stops
            size={1024} // Size (height) is optional, default = 1024
            width={1024} // Width of the canvas producing the texture, default = 16
            //type={GradientType.Radial} // The type of the gradient, default = GradientType.Linear
            innerCircleRadius={0} // Optional, the radius of the inner circle of the gradient, default = 0
            outerCircleRadius={'auto'} // Optional, the radius of the outer circle of the gradient, default = auto
          />
        </meshBasicMaterial>
      </Sphere>

      <Torus args={[99, .2, 5, 32]}>
        <meshBasicMaterial color={'lime'} />
      </Torus>
      <Torus args={[99, .2, 5, 32]} rotation={[Math.PI /2, 0, 0]}>
        <meshBasicMaterial color={'hotpink'} />
      </Torus>
    </>
  )
}
