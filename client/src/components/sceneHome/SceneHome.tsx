import * as THREE from 'three'
import React, { Suspense } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { PerspectiveCamera, Environment, ContactShadows, Bounds, Center, OrbitControls, Html, Loader } from '@react-three/drei'
import { TextureLoader } from 'three'

export default function Scene() {
const gltf = useLoader(GLTFLoader, '/scene.gltf')

function  Scene() {
    
    // const colormap = useControls({ colormap: { 
    //   image: colorMapURL,
    //     onChange: (e) => {
    //       setcolorMapURL(e)
    //     }, transient: false
    //   }
    // })

    // const [colormap, normalmap, metalnessmap, roughnessmap, ] = useLoader(TextureLoader, [
    //     ('/models/8192.png'),
    //     ('/models/null_texture_normal.png'),
    //     ('/models/null_texture.png'),
    //     ('/models/null_texture.png'),
    //     ('/models/null_texture.png'),
    //   ])

    // let material= new THREE.MeshPhysicalMaterial(
    //     {
    //       map: colormap,
    //       normalMap: normalmap,
    //       metalnessMap: metalnessmap,
    //       metalness: 1,
    //       roughnessMap: roughnessmap, 
    //       roughness: 0.8
    //       }
    //   );

    // const fbx = useLoader(FBXLoader, '/models/coin-main.fbx')
    // fbx.traverse(function (child) {
    //     if ((child as THREE.Mesh).isMesh) {
    //       (child as THREE.Mesh).material = material;
    //       (child as THREE.Mesh).castShadow = true;
    //       (child as THREE.Mesh).receiveShadow = true;
    //     }
    //   })

      useFrame((state) => {
        const t = state.clock.getElapsedTime()
        gltf.scene.position.y = (1 + Math.sin(t / 1.5)) / 8
      })
    
    return (
      <>
        <primitive object={gltf.scene} position={[0, 0, 0]} rotation-y={45.5} scale={1} receiveShadow castShadow />
      </>
    ) 
  }

  return (
    <>
      <Suspense fallback={
        <Html>
            <Loader
             dataStyles={{color: "#ffffff"}} // Text styles
             dataInterpolation={(p) => `Loading ${p.toFixed(1)}%`} // Text
             initialState={(active) => active} // Initial black out state 
            />
        </Html> 
      }>
        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={45}>
          {/* <ambientLight intensity={1} />
          <pointLight position={[0, 10, 10]} intensity={1} color="#F8C069" /> */}
        </PerspectiveCamera>
        <ambientLight intensity={1} />
        <pointLight position={[0, 10, 10]} intensity={0.5} />
        <pointLight position={[0, -10, -10]} intensity={0.5} />
        <pointLight position={[0, 30, 30]} intensity={0.25} color="#c29a50" />
        <pointLight position={[0, 30, -30]} intensity={0.25} color="#c29a50" />
        {/* <hemisphereLight color="#000000" groundColor="#b9b9b9" position={[-7, 25, 13]} intensity={0.85} /> */}
        <directionalLight
          castShadow
          position={[2, 8, 4]}
          intensity={0.22}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <Bounds fit clip observe damping={0} margin={1.3}>
            <Center>
                <Scene/>
            </Center>
        </Bounds>
        <Environment preset="warehouse" />
      </Suspense>
    </>
  )
}
