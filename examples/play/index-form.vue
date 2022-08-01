<template>
  <div style="margin: 20px;width:800px">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
         <template slot="error" slot-scope="slotProps">
           <div
               class="el-form-item__error"
               style="color: pink"
           >
             自定义错误样式,颜色为pink {{slotProps.error}}
           </div>
         </template>
      </el-form-item>
      <el-form-item label="活动名称2" prop="name2">
        <el-input v-model="ruleForm.name2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
    <hr>

    <sx-form :model="ruleForm" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <sx-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
        <template slot="error" slot-scope="slotProps">
          <div
              class="el-form-item__error"
              style="color: pink"
          >
            自定义错误样式,颜色为pink {{slotProps.error}}
          </div>
        </template>
      </sx-form-item>
      <sx-form-item>
        <el-button type="primary" @click="submitForm2('ruleForm2')">立即创建</el-button>
      </sx-form-item>
    </sx-form>
  </div>

</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        name2: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, message: '长度 >=3', trigger: 'blur' },
          { max: 5, message: '长度<=5', trigger: 'blur' }
        ],
        name2: [
          { required: true, message: '请输入活动名称2', trigger: 'blur' },
          { min: 3, message: '长度 >=3', trigger: 'blur' },
          { max: 5, message: '长度<=5', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid,invalidFields) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('invalidFields==',invalidFields);
          return false;
        }
      });
    },

    submitForm2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });

      // this.$refs[formName].validate().then(valid => {
      //     if (valid) {
      //       alert('submit!');
      //     }
      // }).catch(error => {
      //   alert(error)
      // })
    },
  }
}
</script>

<style scoped>
.demo-form-inline .el-form-item{
  margin-right: 10px
}

</style>
