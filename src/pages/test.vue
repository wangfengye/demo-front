/**直接设置点击事件在选中项上
 */
<template>
  <div id="app">
    <el-tree :props="props" :load="loadNode" lazy="" show-checkbox @current-change="handleCheckChange"></el-tree>
  </div>
</template>

<script>
export default {
  data () {
    return {
      props: {
        label: 'name',
        children: 'zones'
      },
      count: 1
    }
  },
  components: {
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      handleNodeClick(data) {
        console.log(data);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: 'Root1' }, { name: 'Root2' }]);
        }
        if (node.level > 3) return resolve([]);

        var hasChild;
        if (node.data.name === 'region1') {
          hasChild = true;
        } else if (node.data.name === 'region2') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }

        setTimeout(() => {
          var data;
          if (hasChild) {
            data = [{
              name: 'zone' + this.count++
            }, {
              name: 'zone' + this.count++
            }];
          } else {
            data = [];
          }

          resolve(data);
        }, 500);
      }
  }
}
</script>
<style>
.right{
  margin-right: 200px; 
}
</style>
