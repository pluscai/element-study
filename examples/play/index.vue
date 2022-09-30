<template>
  <div>
    <el-select v-model="value1" placeholder="请选择" @change="handleChage">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <hr>
    <sx-select>
      
    </sx-select>
  <button @click="handleClick">设置</button>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value1: [],
      };
    },
    methods: {
      handleClick() {
        this.value1 = ['选项1','选项2']
      },
      handleChage() {
        console.log("value1==",this.value1);
      }
    }
  };
</script>