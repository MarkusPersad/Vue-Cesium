<script setup>
import { onMounted, reactive } from "vue"
import * as Cesium from "cesium"
import {getLocation} from '../utils/Location.js'
import { addWorldTerrainAsync } from '../utils/Terrain.js'
import Compass from '@cesium-extends/compass'
import ZoomController from '@cesium-extends/zoom-control'

onMounted(() => {
    //Cesium.Ion.defaultAccessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NDMzZDdhYi0wMmYwLTQ5MDUtODQ5My0wZTg5OTM3OWMzZjAiLCJpZCI6MjAwNTU2LCJpYXQiOjE3MTAwODA1Nzh9.bgQcU-Z80JpfcnCwRPPzOEpioYZgvxm6Y3Xzy16m2-g'
    //设置默认视图范围为中国
    const viewer = new Cesium.Viewer('cesiumContainer', {
        infoBox: false,
        navigationInstructionsInitiallyVisible: true,
    })
    viewer.camera.setView({
        destination: Cesium.Rectangle.fromDegrees(80, 22, 130, 50),
        orientation: {
            heading: 6.283185307179586,
            // 视角
            pitch: -1.5686521559334161,
            roll: 0,
        }
    })
    const compass = new Compass(viewer)
    console.log(compass)
    //隐藏版权信息
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    //大气层
    viewer.scene.globe.showGroundAtmosphere = true
    viewer.scene.fxaa = false
    viewer.postProcessStages.fxaa.enabled = true
    if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
        viewer.resolutionScale = window.devicePixelRatio
    }
    viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
        e.cancel = true
        viewer.camera.flyTo({
            destination:Cesium.Rectangle.fromDegrees(80, 22, 130, 50),
            duration: 2
        })
    })
    //开启地形深度检测
    viewer.scene.globe.depthTestAgainstTerrain = true
    updateLighting(viewer)
    getLocation().then(location => {
        let { longitude, latitude } = location
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 300),
            duration: 2
        })
    }).catch(err => {
        console.log(err)
    })
    addWorldTerrainAsync(viewer)
    console.log(viewer)
})
function updateLighting(_viewer) {
        // 启用光照
    _viewer.scene.globe.enableLighting = true
    _viewer.clock.shouldAnimate = true
    // 设置时针速率
    _viewer.clock.multiplier = 1
}
</script>

<template>
<div id="cesiumContainer"></div>
</template>

<style scoped>
#cesiumContainer{
    width: 100%;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
}
</style>