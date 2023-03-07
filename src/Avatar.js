import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import "./index.css";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
export function Avatar(props) {
    const { mouthOpen, mouthSmile, bodyPose } = props;
    // load a glb
    const gltf = useLoader(GLTFLoader, props.url);
    useEffect(() => {
        if (bodyPose) {
            // list out all bones we can animate
            gltf.scenes.forEach(_ => _.traverse((o) => {
                if (o.isBone) {
                    const name = o.name;
                    const value = bodyPose[name];
                    if (value) {
                        o.rotation.set(value.x, value.y, value.z);
                    }
                }
            }));
        }
    }, [bodyPose]);
    // on change of controls update the morph targets
    useEffect(() => {
        gltf.scenes.forEach(_ => _.traverse((o) => {
            // find all morph targets
            if (o.morphTargetInfluences && o.userData.targetNames) {
                // find the mouth open target
                const mouthOpenIndex = o.userData.targetNames.indexOf("mouthOpen");
                if (mouthOpenIndex >= 0) {
                    o.morphTargetInfluences[mouthOpenIndex] = mouthOpen;
                }
                // find the mouth smile target
                const mouthSmileIndex = o.userData.targetNames.indexOf("mouthSmile");
                if (mouthSmileIndex >= 0) {
                    o.morphTargetInfluences[mouthSmileIndex] = mouthSmile;
                }
            }
        }));
    }, [gltf, mouthOpen, mouthSmile]);
    return _jsx(Suspense, { fallback: null, children: _jsx("primitive", { object: gltf.scene, ...props }) });
}
