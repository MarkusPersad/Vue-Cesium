import * as Cesium from 'cesium'

export const addWorldTerrainAsync = async (_viewer) => {
    try {
    const terrainProvider = await Cesium.createWorldTerrainAsync({
        requestWaterMask: true,
        requestVertexNormals: true,
    });  
    _viewer.terrainProvider = terrainProvider;
    } catch (error) {
    console.log(`Failed to add world imagery: ${error}`);
    }
}