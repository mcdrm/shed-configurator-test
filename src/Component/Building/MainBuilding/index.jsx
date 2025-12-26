import * as THREE from 'three'
import { useMemo } from "react"
import { useSelector } from "react-redux"

import { extrudeSettings, textureAnisotropy } from '../../../Utils/Function'
import { roofThk } from '../../../Utils/Constants'
import { useThree } from '@react-three/fiber'

const MainBuilding = () => {
    const { gl } = useThree();
    
    const width = useSelector(state => state.buildingCtrl.width)
    const length = useSelector(state => state.buildingCtrl.length)
    const height = useSelector(state => state.buildingCtrl.height)
    const pitch = useSelector(state => state.buildingCtrl.pitch)
    const overhang = useSelector(state => state.buildingCtrl.overhang)
    const {roofTexture, ridgeTexture, wallTexture} = useSelector(state => state.texture.textureProps)
    
    const roofMap = roofTexture?.clone();
    textureAnisotropy(gl, roofMap, 1, 0.8, Math.PI / 2);
    const ridgeMap = ridgeTexture?.clone();
    textureAnisotropy(gl, ridgeMap, 2, 1, 0);
    const wallMap = wallTexture?.clone();
    textureAnisotropy(gl, wallMap, 1, 1, Math.PI / 2);

    const roofAngle = Math.atan(pitch / 12);
    
    const roofModel = useMemo(() => {
        const model = new THREE.Shape();
        model.moveTo(-width / 2, height);
        model.lineTo(0, height + width / 2 * pitch / 12);
        model.lineTo(width / 2, height);
        model.lineTo(width / 2 + overhang, height - overhang * Math.tan(roofAngle));
        model.lineTo(width / 2 + overhang, height - overhang * Math.tan(roofAngle) + roofThk);
        model.lineTo(0, height + width / 2 * pitch / 12 + roofThk);
        model.lineTo(-(width / 2 + overhang), height - overhang * Math.tan(roofAngle) + roofThk);
        model.lineTo(-(width / 2 + overhang), height - overhang * Math.tan(roofAngle));
        model.closePath();

        return model;
    }, [width, height, pitch, overhang])

    const bodyModel = useMemo(() => {
        const model = new THREE.Shape();
        model.moveTo(-width / 2, 0);
        model.lineTo(-width / 2, height);
        model.lineTo(0, height + width / 2 * pitch / 12);
        model.lineTo(width / 2, height);
        model.lineTo(width / 2, 0);
        model.closePath();

        return model;
    }, [width, height, pitch])

    const ridgeModel = useMemo(() => {
        const modelHeight = 0.2;
        const modelThk = 0.05

        const model = new THREE.Shape();
        model.moveTo(0, height + width / 2 * pitch / 12 + roofThk)
        model.lineTo(-(modelHeight / Math.tan(roofAngle)), height + width / 2 * pitch / 12 + roofThk - modelHeight)
        model.lineTo(-(modelHeight / Math.tan(roofAngle)), height + width / 2 * pitch / 12 + roofThk - modelHeight + modelThk)
        model.lineTo(0, height + width / 2 * pitch / 12 + roofThk + modelThk)
        model.lineTo((modelHeight / Math.tan(roofAngle)), height + width / 2 * pitch / 12 + roofThk - modelHeight + modelThk)
        model.lineTo((modelHeight / Math.tan(roofAngle)), height + width / 2 * pitch / 12 + roofThk - modelHeight)
        model.closePath();

        return model;
    }, [width, height, pitch])
    
    return (
        <group castShadow receiveShadow>
            <mesh position={[0, 0, -(length / 2 + overhang)]}>
                <extrudeGeometry args={[ridgeModel, extrudeSettings(length + overhang * 2)]} />
                <meshStandardMaterial map={ridgeMap} bumpMap={ridgeMap} roughness={0.5} metalness={0.5} />
            </mesh>
            <mesh position={[0, 0, -(length / 2 + overhang)]}>
                <extrudeGeometry args={[roofModel, extrudeSettings(length + overhang * 2)]} />
                <meshStandardMaterial map={roofMap} bumpMap={roofMap} roughness={0.5} metalness={0.5} />
            </mesh>
            <mesh position={[0, 0, -length / 2]}>
                <extrudeGeometry args={[bodyModel, extrudeSettings(length)]} />
                <meshStandardMaterial map={wallMap} bumpMap={wallMap} roughness={0.5} metalness={0.5} />
            </mesh>
        </group>
    )
}

export default MainBuilding