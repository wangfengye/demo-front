<template>
  <div id="firework">
    <canvas id="map"></canvas>
  </div>
</template>

<script>
import FireworkMap from './firework.js'
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let canvas = document.getElementById('map')
      FireworkMap(canvas)
    }
  }
}
</script>

<style lang='scss' scoped>
#firework{
  background: #000;
  background-image:url('../../assets/images/home_bg.jpg');
	margin: 0;
  padding: 0;
  height: auto;
}
canvas {
  // 鼠标位于上方时的形状
	cursor: crosshair;
	display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>