import { useDispatch, useSelector } from "react-redux"

import { setBuildingType, setIsShowBg, setIsCamAutoRotate, setIsBuildingOnly, setIsShowGrass, setBuildingDimension, setInitBuildingSize } from "../../Redux/Features/BuildingCtrl/buildingCtrlSlice";
import { SvgGrass, SvgRotate } from "../../Utils/SvgSource"
import { useEffect, useState } from "react";

const ControlPanel = () => {
    const dispatch = useDispatch();

    const isShowBg = useSelector(state => state.buildingCtrl.isShowBg)
    const isCamAutoRotate = useSelector(state => state.buildingCtrl.isCamAutoRotate)
    const isShowGrass = useSelector(state => state.buildingCtrl.isShowGrass)
    
    const [dimensions, setDimensions] = useState({
        width: 7,
        length: 9,
        height: 4,
        pitch: 5,
        overhang: 0.2
    });
    
    const handleOptionClick = (type, value) => {
        if (type === 'building') {
            dispatch(setBuildingType(value));
        } else if (type === 'bgImage') {
            dispatch(setIsShowBg());
            dispatch(setIsShowGrass(false));
        } else if (type === 'cam-rotate') {
            dispatch(setIsCamAutoRotate());
        } else if (type === 'building-only') {
            dispatch(setIsBuildingOnly());
        } else if (type === 'grass-floor') {
            dispatch(setIsShowGrass());
        }
    }

    const handleDimensionChange = (e) => {
        const { name, value } = e.target;
        const numValue = Number(value);
        setDimensions(prev => ({ ...prev, [name]: numValue }));
        dispatch(setBuildingDimension({ [name]: numValue }));
    }

    useEffect(() => {
        dispatch(setInitBuildingSize(dimensions));
    }, [dispatch, dimensions]);

    const handleKeyDown = (type, value) => (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            handleOptionClick(type, value);
        }
    };
    
    return (
        <div className="building-controller">
            <div className="bottom-section">
                <button 
                    type="button"
                    className={isCamAutoRotate ? "select-item isSelected" : "select-item"} 
                    onClick={() => handleOptionClick('cam-rotate')} 
                    onKeyDown={handleKeyDown('cam-rotate')}
                >
                    <span>Rotate</span>
                    <SvgRotate color={isCamAutoRotate ? '#0066FF' : '#3C3C3C'} />
                </button>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 fixed right-4 top-4 w-64 z-10">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Dimensions</h3>
                
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="width-slider" className="text-sm font-medium text-gray-700">Width</label>
                        <span className="text-xs text-blue-600 font-semibold">{dimensions.width}m</span>
                    </div>
                    <input 
                        id="width-slider"
                        type="range" 
                        name="width" 
                        onChange={handleDimensionChange} 
                        min="5" 
                        max="10" 
                        step="1" 
                        value={dimensions.width}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>5m</span>
                        <span>10m</span>
                    </div>
                </div>
                
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="length-slider" className="text-sm font-medium text-gray-700">Length</label>
                        <span className="text-xs text-blue-600 font-semibold">{dimensions.length}m</span>
                    </div>
                    <input 
                        id="length-slider"
                        type="range" 
                        name="length" 
                        onChange={handleDimensionChange} 
                        min="6" 
                        max="12" 
                        step="1" 
                        value={dimensions.length}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>6m</span>
                        <span>12m</span>
                    </div>
                </div>
                
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="height-slider" className="text-sm font-medium text-gray-700">Height</label>
                        <span className="text-xs text-blue-600 font-semibold">{dimensions.height}m</span>
                    </div>
                    <input 
                        id="height-slider"
                        type="range" 
                        name="height" 
                        onChange={handleDimensionChange} 
                        min="3" 
                        max="6" 
                        step="1" 
                        value={dimensions.height}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>3m</span>
                        <span>6m</span>
                    </div>
                </div>
                
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="pitch-slider" className="text-sm font-medium text-gray-700">Pitch</label>
                        <span className="text-xs text-blue-600 font-semibold">{dimensions.pitch}</span>
                    </div>
                    <input 
                        id="pitch-slider"
                        type="range" 
                        name="pitch" 
                        onChange={handleDimensionChange} 
                        min="3" 
                        max="12" 
                        step="1" 
                        value={dimensions.pitch}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>3</span>
                        <span>12</span>
                    </div>
                </div>
                
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="overhang-slider" className="text-sm font-medium text-gray-700">Overhang</label>
                        <span className="text-xs text-blue-600 font-semibold">{dimensions.overhang}</span>
                    </div>
                    <input 
                        id="overhang-slider"
                        type="range" 
                        name="overhang" 
                        onChange={handleDimensionChange} 
                        min="0.1" 
                        max="0.6" 
                        step="0.1" 
                        value={dimensions.overhang}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0.1m</span>
                        <span>0.8m</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ControlPanel