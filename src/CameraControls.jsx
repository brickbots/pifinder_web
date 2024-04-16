import {OrbitControls} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import React, {useRef} from 'react'

export const CameraControls = React.forwardRef((props, ref) => {

  // cameraRef.current?.addEventListener('wheel', (event) => {
  //   console.log('hello')
  // })
  //
  // // Hook to update camera's FOV based on scroll or pinch gesture
  // useFrame(() => {
  //   cameraRef.current.fov += (cameraRef.current.targetFOV - cameraRef.current.fov) * 0.05;
  //   //cameraRef.current.updateProjectionMatrix()
  // })
  //
  // const handleWheel = (event) => {
  //   console.log('wheel')
  //   const deltaY = event.deltaY;
  //   cameraRef.current.targetFOV = Math.min(100, Math.max(20, cameraRef.current.targetFOV + deltaY * 0.1));
  // }

  return (
    <OrbitControls
      ref={ref}
      args={[null]}
      enableZoom={false}
      //onMouseWheel={handleWheel}
      touchZoom={false}
      enablePan={false}
      //onWheel={handleWheel}
    />
  )
})
