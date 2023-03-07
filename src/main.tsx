import { createRoot } from 'react-dom/client'
import { Canvas, } from '@react-three/fiber'
import "./index.css";
import { Avatar } from './Avatar'
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';

const ROTATION_STEP = Math.PI / 180;

const App = () => {
  const { ...pose } = useControls({
    MouthOpen: { value: 0, min: 0, max: 1 },
    MouthSmile: { value: 0, min: 0, max: 1 },
    Center: { value: { x: 0, y: 0, z: 0 }, step: .1 },
    Hips: { value: { x: 0, y: 0, z: 0 }, step: ROTATION_STEP },
    Spine: { value: { x: 0, y: 0, z: 0 }, step: ROTATION_STEP },
    Spine1: { value: { x: 0, y: 0, z: 0 }, step: ROTATION_STEP },
    Spine2: { value: { x: 0, y: 0, z: 0 }, step: ROTATION_STEP },
    Neck: { value: { x: 0, y: 0, z: 0 }, step: ROTATION_STEP },
    Head: { value: { x: 0, y: 0, z: 0 }, step: ROTATION_STEP },
  })
  return <Canvas>
    <ambientLight />
    <OrbitControls />
    <Avatar url="https://models.readyplayer.me/640765d93e6d860c1d738326.glb" position={[0, -1, 0]}
      pose={pose} />
  </Canvas>;
}

createRoot(document.getElementById('root')!).render(
  <App />,
)