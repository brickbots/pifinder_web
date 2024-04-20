//import { useState } from 'react'
import './App.css'
import {
  Circle,
  GradientTexture,
  PerspectiveCamera,
  Ring,
  Sphere,
  Torus,
  TrackballControls,
  Instances,
  Instance,
  Html, Points, Point
} from '@react-three/drei'

import {BackSide, Color} from 'three'
import {useRef, useState} from 'react'
import {useFrame, useThree} from '@react-three/fiber'
import {CameraControls} from './CameraControls.jsx'
import {useHTCatalogue} from './useHTCatalogue.js'
import Box from '@mui/material/Box'
import {Typography} from '@mui/material'

export const Scene = () => {

  const cameraRef = useRef()
  const {camera  } = useThree()
  const {data}  = useHTCatalogue()

  const handleZoom = (event) => {
    const maxFov = 160
    const minFov = 10

    const deltaY = event.deltaY;
    camera.fov = Math.min(maxFov, Math.max(minFov, camera.fov + deltaY * 0.2))
    camera.updateProjectionMatrix()
  }

  if (data) console.log(data)


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





      {data &&
        <Instances range={data?.length} limit={data.length}>
          <sphereGeometry args={[.5, 1, 1]}/>
          <meshBasicMaterial color={'white'}/>
          {data?.map((body) =>
            <CelestialBody
              key={body.HIP}
              id={body.HIP}
              body={body}
              cameraRef={cameraRef}
            />
          )}
        </Instances>
      }
    </>
  )
}



const CelestialBody = ({body, cameraRef, color = new Color()}) => {

  const viewLimit = mapRange(cameraRef.current?.object.fov, 10, 160, 0.001, 18)


  const [hovered, setHover] = useState(false)
  const [display, setDisplay] = useState(body.Plx > viewLimit)
  const ref = useRef()

  const scaleScore = body.Plx * .1


  useFrame(({ camera, clock }) => {

    const viewLimit = mapRange(cameraRef.current?.object.fov, 10, 160, 0.001, 18)

    if (display && body.Plx < viewLimit){
      setDisplay(false)
    }
    if (!display && body.Plx > viewLimit){
      setDisplay(true)
    }

    ref.current?.color.lerp(color.set(hovered ? 'red' : 'white'), hovered ? 1 : 0.1)
  })

  return (
    <group
      position={convertToCartesian(body.RAdeg, body.DEdeg, 99)}
      scale={Math.min(Math.max(scaleScore, .3), 1)}
    >
      {display &&
        <Instance
          ref={ref}
          onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
          onPointerOut={(e) => setHover(false)}
        >
          {hovered && <Html>
            <Box
              width={162 * 2}
              p={2}
              sx={{borderRadius: 5, background: 'rgba(0,0,0,0.4)'}}
            >
              <Typography variant={'h6'}>HIP: {body.HIP}</Typography>
              <Typography variant={'body2'}>Catalog: {body.Catalog} Chart: {body.Chart || "None"} Survey: {body.Survey | "None"}</Typography>
              <Typography variant={'body2'}>RA/DE: {body.RAdeg} {body.DEdeg} Plx: {body.Plx}</Typography>
            </Box>

          </Html>
          }
        </Instance>
      }
    </group>

  )
}


const convertToCartesian = (RAdeg, DEdeg, R) => {
  const RA = (RAdeg * Math.PI) / 180 // Convert RA to radians
  const DE = (DEdeg * Math.PI) / 180 // Convert Dec to radians

  const x = R * Math.cos(DE) * Math.cos(RA)
  const y = R * Math.cos(DE) * Math.sin(RA)
  const z = R * Math.sin(DE)

  return [ x, y, z ]
}

function mapRange(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
