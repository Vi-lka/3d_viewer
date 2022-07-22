import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/web'
import './home.css';
import SceneHome from '../../components/sceneHome/SceneHome';
import OverlayHome from '../../components/overlayHome/OverlayHome';

export default function Home() {
  const [{ background, fill }, set] = useSpring({ background: '#202020', fill: '#f0f0f0' }, [])
  return (
    <>
      <div className='main-logo-container' style={{ background:  '#202020'}}>
        <a href="https://www.sfu-kras.ru/">
          <img className='main-logo' src="../main-logo.png" alt="" />
        </a>
      </div>
      <div className='home-container'>
        <a.main style={{ background }}>
          <Canvas 
            className="canvas" 
            dpr={[1, 2]} 
            camera={{fov: 45, near: 0.1, far: 1000, position: [0, 0, 10]}}
            gl={{ preserveDrawingBuffer: true }}
          >
            <SceneHome />
            <OrbitControls enablePan={false} enableZoom={false}  />
          </Canvas>
          {/* <OverlayHome fill={fill} /> */}
        </a.main>
      </div>
    </>
  )
}
