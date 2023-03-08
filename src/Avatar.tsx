import { Suspense, useEffect } from "react";
import { GroupProps, useLoader } from "@react-three/fiber";
import "./index.css";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Euler, Vector3 } from "three";

export type SimplePosition = { x: number; y: number; z: number };
export type SimpleEuler = { x: number; y: number; z: number };

export interface AvatarPose {
  MouthOpen?: number;
  MouthSmile?: number;
  Center?: SimplePosition;
  Hips?: SimpleEuler;
  Spine?: SimpleEuler;
  Spine1?: SimpleEuler;
  Spine2?: SimpleEuler;
  Neck?: SimpleEuler;
  Head?: SimpleEuler;
  HeadTop_End?: SimpleEuler;
  LeftEye?: SimpleEuler;
  RightEye?: SimpleEuler;
  LeftShoulder?: SimpleEuler;
  LeftArm?: SimpleEuler;
  LeftForeArm?: SimpleEuler;
  LeftHand?: SimpleEuler;
  LeftHandThumb1?: SimpleEuler;
  LeftHandThumb2?: SimpleEuler;
  LeftHandThumb3?: SimpleEuler;
  LeftHandThumb4?: SimpleEuler;
  LeftHandIndex1?: SimpleEuler;
  LeftHandIndex2?: SimpleEuler;
  LeftHandIndex3?: SimpleEuler;
  LeftHandIndex4?: SimpleEuler;
  LeftHandMiddle1?: SimpleEuler;
  LeftHandMiddle2?: SimpleEuler;
  LeftHandMiddle3?: SimpleEuler;
  LeftHandMiddle4?: SimpleEuler;
  LeftHandRing1?: SimpleEuler;
  LeftHandRing2?: SimpleEuler;
  LeftHandRing3?: SimpleEuler;
  LeftHandRing4?: SimpleEuler;
  LeftHandPinky1?: SimpleEuler;
  LeftHandPinky2?: SimpleEuler;
  LeftHandPinky3?: SimpleEuler;
  LeftHandPinky4?: SimpleEuler;
  RightShoulder?: SimpleEuler;
  RightArm?: SimpleEuler;
  RightForeArm?: SimpleEuler;
  RightHand?: SimpleEuler;
  RightHandThumb1?: SimpleEuler;
  RightHandThumb2?: SimpleEuler;
  RightHandThumb3?: SimpleEuler;
  RightHandThumb4?: SimpleEuler;
  RightHandIndex1?: SimpleEuler;
  RightHandIndex2?: SimpleEuler;
  RightHandIndex3?: SimpleEuler;
  RightHandIndex4?: SimpleEuler;
  RightHandMiddle1?: SimpleEuler;
  RightHandMiddle2?: SimpleEuler;
  RightHandMiddle3?: SimpleEuler;
  RightHandMiddle4?: SimpleEuler;
  RightHandRing1?: SimpleEuler;
  RightHandRing2?: SimpleEuler;
  RightHandRing3?: SimpleEuler;
  RightHandRing4?: SimpleEuler;
  RightHandPinky1?: SimpleEuler;
  RightHandPinky2?: SimpleEuler;
  RightHandPinky3?: SimpleEuler;
  RightHandPinky4?: SimpleEuler;
  LeftUpLeg?: SimpleEuler;
  LeftLeg?: SimpleEuler;
  LeftFoot?: SimpleEuler;
  LeftToeBase?: SimpleEuler;
  LeftToe_End?: SimpleEuler;
  RightUpLeg?: SimpleEuler;
  RightLeg?: SimpleEuler;
  RightFoot?: SimpleEuler;
  RightToeBase?: SimpleEuler;
  RightToe_End?: SimpleEuler;
}

export type AvatarProps = { url: string; pose?: AvatarPose } & GroupProps;

export function Avatar(props: AvatarProps) {
  const { pose, url } = props;
  // load a glb
  const gltf = useLoader(GLTFLoader, props.url);

  useEffect(() => {
    if (pose) {
      // list out all bones we can animate
      gltf.scenes.forEach((_) =>
        _.traverse((o: any) => {
          if (o.isBone) {
            const name = o.name as string;
            const value: SimpleEuler | undefined = (pose as any)[name];
            if (value) {
              (o.rotation as Euler).set(value.x, value.y, value.z);
            }
          }
        })
      );
    }
  }, [pose]);

  // on change of controls update the morph targets
  useEffect(() => {
    gltf.scenes.forEach((_) =>
      _.traverse((o: any) => {
        // find all morph targets
        if (o.morphTargetInfluences && o.userData.targetNames) {
          // find the mouth open target
          const mouthOpenIndex = o.userData.targetNames.indexOf("mouthOpen");
          if (mouthOpenIndex >= 0 && pose?.MouthOpen !== undefined) {
            o.morphTargetInfluences[mouthOpenIndex] = pose.MouthOpen;
          }
          // find the mouth smile target
          const mouthSmileIndex = o.userData.targetNames.indexOf("mouthSmile");
          if (mouthSmileIndex >= 0 && pose?.MouthOpen !== undefined) {
            o.morphTargetInfluences[mouthSmileIndex] = pose.MouthOpen;
          }
        }
      })
    );
  }, [gltf, pose]);

  return (
    <group {...props}>
      <Suspense fallback={null}>
        <primitive
          object={gltf.scene}
          position={
            pose?.Center
              ? [pose.Center.x, pose.Center.y, pose.Center.z]
              : undefined
          }
        />
      </Suspense>
    </group>
  );
}
