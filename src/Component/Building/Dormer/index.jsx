import * as THREE from 'three'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { roofThk } from '../../../Utils/Constants'
import { extrudeSettings, textureAnisotropy } from '../../../Utils/Function'
import { useThree } from '@react-three/fiber'

const Dormer = () => {
    const { gl } = useThree();
    
    const width = useSelector(state => state.buildingCtrl.width)
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
    
    const dormerWidth = 5;
    const roofAngle = Math.atan(pitch / 12);
    const dormerAngle = Math.atan((width / 2 * pitch / 12) / (dormerWidth / 2 - roofThk))

    const roofModel = useMemo(() => {
        const model = new THREE.Shape();
        model.moveTo(-dormerWidth / 2, height - overhang * Math.tan(roofAngle) + roofThk)
        model.lineTo(0, height + width / 2 * pitch / 12 + roofThk);
        model.lineTo(dormerWidth / 2, height - overhang * Math.tan(roofAngle) + roofThk)
        model.lineTo(dormerWidth / 2 - roofThk * Math.cos(dormerAngle) / Math.sin(dormerAngle), height - overhang * Math.tan(roofAngle) + roofThk)
        model.lineTo(0, height + width / 2 * pitch / 12);
        model.lineTo(-(dormerWidth / 2 - roofThk * Math.cos(dormerAngle) / Math.sin(dormerAngle)), height - overhang * Math.tan(roofAngle) + roofThk)
        model.closePath();
        
        return model;
    }, [width, height, pitch, overhang])

    const frontModel = useMemo(() => {
        const model = new THREE.Shape();
        model.moveTo(dormerWidth / 2 - roofThk * Math.cos(dormerAngle) / Math.sin(dormerAngle), height - overhang * Math.tan(roofAngle) + roofThk)
        model.lineTo(0, height + width / 2 * pitch / 12);
        model.lineTo(-(dormerWidth / 2 - roofThk * Math.cos(dormerAngle) / Math.sin(dormerAngle)), height - overhang * Math.tan(roofAngle) + roofThk)
        model.closePath();
        
        return model;
    }, [width, height, pitch, overhang])
    
    const ridgeModel = useMemo(() => {
        const modelHeight = 0.2;
        const modelThk = 0.05

        const model = new THREE.Shape();
        model.moveTo(0, height + width / 2 * pitch / 12 + roofThk)
        model.lineTo(-(modelHeight / Math.tan(dormerAngle)), height + width / 2 * pitch / 12 + roofThk - modelHeight)
        model.lineTo(-(modelHeight / Math.tan(dormerAngle)), height + width / 2 * pitch / 12 + roofThk - modelHeight + modelThk)
        model.lineTo(0, height + width / 2 * pitch / 12 + roofThk + modelThk)
        model.lineTo((modelHeight / Math.tan(dormerAngle)), height + width / 2 * pitch / 12 + roofThk - modelHeight + modelThk)
        model.lineTo((modelHeight / Math.tan(dormerAngle)), height + width / 2 * pitch / 12 + roofThk - modelHeight)
        model.closePath();

        return model;
    }, [width, height, pitch])
    
    return (
        <>
            <mesh>
                <extrudeGeometry args={[ridgeModel, extrudeSettings(width / 2 + overhang)]} />
                <meshStandardMaterial map={ridgeMap} bumpMap={ridgeMap} roughness={0.5} metalness={0.5} />
            </mesh>
            <mesh>
                <extrudeGeometry args={[roofModel, extrudeSettings(width / 2 + overhang)]} />
                <meshStandardMaterial map={roofMap} bumpMap={roofMap} roughness={0.5} metalness={0.5} />
            </mesh>
            <mesh position={[0, 0, width / 2 - roofThk]}>
                <extrudeGeometry args={[frontModel, extrudeSettings(roofThk)]} />
                <meshStandardMaterial map={wallMap} bumpMap={wallMap} roughness={0.5} metalness={0.5} />
            </mesh>
        </>
    )
}

export default Dormer