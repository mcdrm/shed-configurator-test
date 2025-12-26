import React from 'react'
import MainBuilding from './MainBuilding'
import Dormer from './Dormer'

const index = () => {
    return (
        <>
            <MainBuilding />

            <group name='left-dormer' rotation={[0, -Math.PI / 2, 0]}>
                <Dormer />
            </group>
            <group name='right-dormer' rotation={[0, Math.PI / 2, 0]}>
                <Dormer />
            </group>
        </>
    )
}

export default index