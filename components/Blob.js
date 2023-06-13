import React, { useMemo, useRef } from "react";
import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Blob = () => {
  const mesh = useRef();
  const hover = useRef(false);

  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
      uDisplace: { value: 2 },
      uSpread: { value: 1.2 },
      uNoise: { value: 16 },
      // u_intensity: { value: 0.3 },
    };
  }, []);

  useFrame((state) => {
    // get time from state
    const { clock } = state;

    const elaspedTime = clock.getElapsedTime();

    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value = elaspedTime;

      mesh.current.rotation.z =
        Math.sin(elaspedTime) / 4 + elaspedTime / 20 + 5;
    }
  });

  return (
    <mesh ref={mesh}>
      <torusGeometry args={[1, 0.3, 100, 100]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default Blob;
