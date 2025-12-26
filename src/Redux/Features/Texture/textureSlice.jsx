import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    textureProps: {
        roofTexture: null,
        ridgeTexture: null,
        wallTexture: null,
    },

    isAllTextureLoaded: false,
}

export const textureSlice = createSlice({
    name: 'texture',
    initialState,
    reducers: {
        loadInitTexture: (state, action) => {
            const { roofTexture, ridgeTexture, wallTexture } = action.payload;
            state.textureProps.roofTexture = roofTexture;
            state.textureProps.ridgeTexture = ridgeTexture;
            state.textureProps.wallTexture = wallTexture;
            
            state.isAllTextureLoaded = true;
        },
    }
})

export const { loadInitTexture } = textureSlice.actions

export default textureSlice.reducer