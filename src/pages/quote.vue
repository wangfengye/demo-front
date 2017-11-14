/* 搞笑评论 */
/*
 *v-html 无法使用样式,直接用样式的字符串写到html中 
 */

<template>
  <div class="container">
    <div id="style" v-html="style"></div>

    <el-table align="left" :data="data" style="width:100%" stripe>
    <el-table-column label="ID" prop="id" width="60"></el-table-column>
      <el-table-column prop="content" label="内容">
          <template slot-scope="scope">
          <div v-html="stringToHtml(scope.row.content)"></div>
        </template>
      </el-table-column>
       <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="btn-copy" :value="scope.row.content" type="primary" size="mini">复制</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-table>
  </div>

</template>

<script>
import Clipboard from 'clipboard'
export default {
  data () {
    return {
      style: '<style>@-webkit-keyframes jump{0%{ top:0px; color:#fbb2b2;} 50%{top:-3px;color:#0e8761;}   100%{      top:2px;         color:#327fc2;    }   } </style>',
      data: [ { id: 0, content: '你会不会突然地出现，在街角的大保健。' },
              { id: 1, content: '如何证明你的实力？住酒店一定要选隔音最好的' },
              { id: 2, content: '你的名字是最短的情诗。' },
              { id: 3, content: '为了节约用水，今晚可以一起洗澡吗?' },
              { id: 4, content: '像你这种平胸的，只能好好学习' },
              { id: 5, content: '现在的男朋友应该像蚊子一样，一不留神就让你手上多个包' },
              { id: 6, content: '“宝贝，我想给你整个世界。”---“那你整吧！”' },
              { id: 7, content: '你所有为人称道的美丽，都有美图秀秀的痕迹。' },
              { id: 8, content: '别人笑起来的样子很好看，你笑起来的样子很好笑。' },
              { id: 9, content: '如果你前女友和现女友同时掉到河里了，那么，请问我可以做你女朋友么？' },
              { id: 10, content: '睡不到我，你的人生还有什么意义' },
              { id: 11, content: '以后的路你自己走，我打车。' },
              { id: 12, content: '你复杂的五官,掩饰不了你朴素的智商。' },
              { id: 13, content: '你认真的样子就像天桥上贴膜的。' },
              { id: 14, content: '从此我爱的人都不像你。' },
              { id: 15, content: '我喜欢你，就像你妈打你不讲道理。' },
              { id: 16, content: '青春荒唐不负你，全套包夜八百起。' },
              { id: 17, content: '希望一切事情都像长胖那么容易' },
              { id: 18, content: '我养你啊。' },
              { id: 19, content: '我来到你的城市，你却不管顿饭吃。' },
              { id: 20, content: '你走了真好，不然总担心你要留下来吃饭。' },
              { id: 21, content: '手不要给别人牵，拥抱也要留给我。' },
              { id: 22, content: '爱你就像拉肚子一样无法控制' },
              { id: 23, content: '如果再见不能红着脸，是否还能借点钱。' },
              { id: 24, content: '虽然你长的丑，但你想的美啊！' },
              { id: 25, content: '有空一起睡觉啊？' },
              { id: 26, content: '来，有事床上聊。' },
              { id: 27, content: '在有生之年遇见你，竟花光了我所有的积蓄。' },
              { id: 28, content: '多照照镜子，很多事情你就明白原因了' },
              { id: 29, content: '我喜欢你，从一而终，认真且怂' },
              { id: 30, content: '别再说自己是单身狗了，你这个年纪狗都死了。' },
              { id: 31, content: '“用两个字形容你的罩杯”“随爹”' },
              { id: 32, content: '气质永远都是无法估价的，不然我早就身价百万了' },
              { id: 33, content: '你这人没啥特出众，就是脸皮够坚固' },
              { id: 34, content: '我要吃胖点，这个冬天才不会感觉冷' },
              { id: 35, content: '一直非常羡慕我的男朋友，他有一个世界上最好的女朋友' },
              { id: 36, content: '别人笑起来很好看，但你不一样，你是看起来很好笑。' },
              { id: 37, content: '如果白痴会飞，那我身边简直是个飞机场' },
              { id: 38, content: '只是因为在人群中多看了你一眼，就不想再看第二眼。' },
              { id: 39, content: '我们不要再见面了，洗头好累，洗发水好贵' }
      ]
    }
  },
  mounted () {
    let clipboard = new Clipboard('.btn-copy', {
      text: function (trigger) {
        console.log(trigger)
        return trigger.value
      }
    })
    clipboard.on('success', () => {
      this.$message.success('复制成功')
    })
  },
  methods: {
    stringToHtml (quote) {
      let quoteHtml = ''
      for (let i = 0; i < quote.length; i++) {
        let char = quote.substring(i, i + 1)
        quoteHtml += '<span style="-webkit-animation: jump 1s linear ' + (i * 0.1) + 's infinite alternate; float: left;position: relative;">' + char + '</span>'
      }
      return quoteHtml
    }
  }
}
</script>

<style lang='scss' scoped>
.container{
  padding: 16px;
}
</style>