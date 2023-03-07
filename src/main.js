import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import { Canvas, } from '@react-three/fiber';
import "./index.css";
import { Avatar } from './Avatar';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
const ROTATION_STEP = Math.PI / 180;
const App = () => {
    const { mouthOpen, mouthSmile, ...bodyPose } = useControls({
        mouthOpen: { value: 0, min: 0, max: 1 },
        mouthSmile: { value: 0, min: 0, max: 1 },
        Hips: { value: { x: 0, y: 0, z: 0 }, step: ROTATION_STEP },
        Spine: { value: { x: 0, y: 0, z: 0 }, step: ROTATION_STEP },
        Spine1: { value: { x: 0, y: 0, z: 0 }, step: ROTATION_STEP },
        Spine2: { value: { x: 0, y: 0, z: 0 }, step: ROTATION_STEP },
        Neck: { value: { x: 0, y: 0, z: 0 }, step: ROTATION_STEP },
        Head: { value: { x: 0, y: 0, z: 0 }, step: ROTATION_STEP },
    });
    return _jsxs(Canvas, { children: [_jsx("ambientLight", {}), _jsx(OrbitControls, {}), _jsx(Avatar, { url: "https://models.readyplayer.me/640765d93e6d860c1d738326.glb", position: [0, -1, 0], mouthOpen: mouthOpen, mouthSmile: mouthSmile, bodyPose: bodyPose })] });
};
createRoot(document.getElementById('root')).render(_jsx(App, {}));
