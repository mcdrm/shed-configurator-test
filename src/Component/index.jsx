import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useState } from "react"
import { useSelector } from "react-redux"

import ControlPanel from "./ControlPanel"
import Env from "./Env"
import Building from "./Building"

const Component = () => {
    const isAllTextureLoaded = useSelector(state => state.texture.isAllTextureLoaded)
    const height = useSelector(state => state.buildingCtrl.height)
    
    const [isReadyForCanvas, setIsReadyForCanvas] = useState(false);

    useEffect(() => {
        if (isAllTextureLoaded) {
            setTimeout(() => {setIsReadyForCanvas(true)}, "2500")
        }
        else setIsReadyForCanvas(false);
    }, [isAllTextureLoaded])

    return (
        <>
            { isReadyForCanvas && <ControlPanel /> }
            <Canvas
                shadows
                dpr={[1, 1.5]}
                camera={{ position: [-20, height * 5, 20], fov: 30, near: 1, far: 100000 }}
                style={{
                    width: "100%",
                    height: "100vh",
                }}
            >
                <Suspense>
                    <Env />
                    { isReadyForCanvas && <Building /> }
                </Suspense>
            </Canvas>
        </>
    )
}

export default Component