import React, { useRef } from 'react';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Model({ rotationSpeed = 0.001, scale = 1.128, ...props }) {
  const { nodes, materials } = useGLTF('/earth.gltf');
  const earthRef = useRef();
  useFrame(() => {
    if(earthRef.current){
      earthRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <group ref={earthRef} {...props} dispose={null}>
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials['Scene_-_Root']}
          scale={scale}
        />
      </group>
      <OrbitControls enableZoom={false} enablePan={true} />
    </>
  );
}

useGLTF.preload('/earth.gltf');
