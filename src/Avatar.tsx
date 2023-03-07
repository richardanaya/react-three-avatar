
import { Suspense, useEffect } from 'react'
import { GroupProps, useLoader } from '@react-three/fiber'
import "./index.css";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Euler, Vector3 } from 'three';

export type SimpleEuler = { x: number, y: number, z: number };

export interface BodyPose {
    Hips?: SimpleEuler,
    Spine?: SimpleEuler,
    Spine1?: SimpleEuler,
    Spine2?: SimpleEuler,
    Neck?: SimpleEuler,
    Head?: SimpleEuler,
    HeadTop_End?: SimpleEuler,
    LeftEye?: SimpleEuler,
    RightEye?: SimpleEuler,
    LeftShoulder?: SimpleEuler,
    LeftArm?: SimpleEuler,
    LeftForeArm?: SimpleEuler,
    LeftHand?: SimpleEuler,
    LeftHandThumb1?: SimpleEuler,
    LeftHandThumb2?: SimpleEuler,
    LeftHandThumb3?: SimpleEuler,
    LeftHandThumb4?: SimpleEuler,
    LeftHandIndex1?: SimpleEuler,
    LeftHandIndex2?: SimpleEuler,
    LeftHandIndex3?: SimpleEuler,
    LeftHandIndex4?: SimpleEuler,
    LeftHandMiddle1?: SimpleEuler,
    LeftHandMiddle2?: SimpleEuler,
    LeftHandMiddle3?: SimpleEuler,
    LeftHandMiddle4?: SimpleEuler,
    LeftHandRing1?: SimpleEuler,
    LeftHandRing2?: SimpleEuler,
    LeftHandRing3?: SimpleEuler,
    LeftHandRing4?: SimpleEuler,
    LeftHandPinky1?: SimpleEuler,
    LeftHandPinky2?: SimpleEuler,
    LeftHandPinky3?: SimpleEuler,
    LeftHandPinky4?: SimpleEuler,
    RightShoulder?: SimpleEuler,
    RightArm?: SimpleEuler,
    RightForeArm?: SimpleEuler,
    RightHand?: SimpleEuler,
    RightHandThumb1?: SimpleEuler,
    RightHandThumb2?: SimpleEuler,
    RightHandThumb3?: SimpleEuler,
    RightHandThumb4?: SimpleEuler,
    RightHandIndex1?: SimpleEuler,
    RightHandIndex2?: SimpleEuler,
    RightHandIndex3?: SimpleEuler,
    RightHandIndex4?: SimpleEuler,
    RightHandMiddle1?: SimpleEuler,
    RightHandMiddle2?: SimpleEuler,
    RightHandMiddle3?: SimpleEuler,
    RightHandMiddle4?: SimpleEuler,
    RightHandRing1?: SimpleEuler,
    RightHandRing2?: SimpleEuler,
    RightHandRing3?: SimpleEuler,
    RightHandRing4?: SimpleEuler,
    RightHandPinky1?: SimpleEuler,
    RightHandPinky2?: SimpleEuler,
    RightHandPinky3?: SimpleEuler,
    RightHandPinky4?: SimpleEuler,
    LeftUpLeg?: SimpleEuler,
    LeftLeg?: SimpleEuler,
    LeftFoot?: SimpleEuler,
    LeftToeBase?: SimpleEuler,
    LeftToe_End?: SimpleEuler,
    RightUpLeg?: SimpleEuler,
    RightLeg?: SimpleEuler,
    RightFoot?: SimpleEuler,
    RightToeBase?: SimpleEuler,
    RightToe_End?: SimpleEuler,
}

export function Avatar(props: { url: string, mouthOpen: number, mouthSmile: number, bodyPose?: BodyPose, center: { x: number, y: number, z: number } } & GroupProps) {
    const { mouthOpen, mouthSmile, bodyPose, center } = props;
    // load a glb
    const gltf = useLoader(GLTFLoader, props.url)

    useEffect(() => {
        if (bodyPose) {
            // list out all bones we can animate
            gltf.scenes.forEach(_ => _.traverse((o: any) => {
                if (o.isBone) {
                    const name = o.name as string;
                    const value: SimpleEuler | undefined = (bodyPose as any)[name];
                    if (value) {
                        (o.rotation as Euler).set(value.x, value.y, value.z);
                    }
                }
            }
            ));
        }
    }, [bodyPose]);


    // on change of controls update the morph targets
    useEffect(() => {
        gltf.scenes.forEach(_ => _.traverse((o: any) => {
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

    return <group {...props}>
        <Suspense fallback={null}>
            <primitive object={gltf.scene} position={center ? [center.x, center.y, center.z] : undefined} />
        </Suspense>
    </group>
}