<template>
  <div>
    <el-input v-model="input1" :disabled="false"  show-password clearable placeholder="请输入内容"></el-input>

    {{input1}}
    <hr>

    <sx-input v-model="input2" :disabled="false" clearable show-password placeholder="请输入内容"></sx-input> 
    {{input2}}
  </div>

</template>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: ''
    }
  }
}
</script>