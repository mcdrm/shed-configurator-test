import { Environment, OrbitControls } from "@react-three/drei"
import { useSelector } from "react-redux";
import { ConstProps } from "../../Utils/Constants";

const Env = () => {
    const isShowBg = useSelector(state => state.buildingCtrl.isShowBg)
    const isCamAutoRotate = useSelector(state => state.buildingCtrl.isCamAutoRotate)
    const height = useSelector(state => state.buildingCtrl.height)
    
    return (
        <>
            <Environment background preset="sunset" blur={0.8} backgroundIntensity={3} />
            <OrbitControls
                target={[0, 2, 0]}
                enablePan={false}
                autoRotate={isCamAutoRotate}
                rotateSpeed={0.6}
                dampingFactor={0.2}
                maxPolarAngle={Math.PI / 2.2}
            />
            
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[-50, 50, 50]}
                intensity={3}
                castShadow
            />
            <directionalLight
                position={[50, 50, -50]}
                intensity={1}
                castShadow={false}
            />
        </>
    )
}

export default Env