<template>
<div id="girls">
  <el-carousel type="card" height="400px">
    <el-carousel-item v-for="item in topImages" :key="item._id">
      <img class="img" :src="item.url" />
    </el-carousel-item>
  </el-carousel>
  <el-button type="primary" icon="el-icon-search" @click="nextImages">刷新</el-button>
  <div class="flex">
      <el-card class="card"  :body-style="{ padding: '0px' }" v-for="item in images"  :key="item._id">
        <div class="card_content">
          <img :src="item.url" class="image img1"> 
          <div class="clearfix"> <i class="el-icon-share"></i></div> 
        </div>
      </el-card>
  </div>
</div>
</template>

<script>
import { getImages } from '@/api/gank.js'
export default {
  data () {
    return {
      topImages: [],
      images: [],
      page: 1
    }
  },
  mounted () {
    this.initImages()
  },
  methods: {
    initImages () {
      let _this = this
      getImages(10, this.page).then(res => {
        _this.images = res.data.results
        _this.topImages = res.data.results
      })
    },
    nextImages () {
      let _this = this
      this.page++
      getImages(10, this.page).then(res => {
        _this.images = res.data.results
      })
    }
  }
}
</script>

<style lang='scss' scoped>
#girls{
  background: #f0f8ff;
}
.flex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  .card{
    margin: 10px;
  }
  .card_content{
    display: flex;
    flex-direction: column;
    .clearfix i{
      float: right;
      padding: 10px;
    }
  }
}
.img{
  width: 100%;
}
.img1{
  width:auto; height:400px;
}

</style>