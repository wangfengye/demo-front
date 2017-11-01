<template>
  <div>
    <el-button @click="dispatch">dispatch</el-button>
    <el-button @click="commit">commit</el-button>
    <el-button @click="testIndexOf">indexof</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    testFilter () {
      let a = [1, 2, 3]
      let b = a.filter(item => {
        return item > 2
      })
      console.log(a)
      console.log(b)
    },
    commit () {
      this.$store.commit('aa', 'commit')
      console.log(this.$store.getters.aa)
    },
    dispatch () {
      this.$store.dispatch('aa', 'dispatch')
      console.log(this.$store.getters.aa)
    },
    log () {
      console.log(this.$store.getters.aa)
    },
    testIndexOf () {
      let data = {name: 'w', age: 2}
      data._method = 'delete'
      console.log(data)
    }
  }
}
</script>

<style lang='scss' scoped>

</style>