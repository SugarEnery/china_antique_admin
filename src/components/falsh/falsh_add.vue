<template >
    <div>
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
                <el-form-item label="快讯标题" prop="kx_title">
                    <el-input v-model="form2.kx_title" placeholder="快讯标题"></el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="submitForm('form2')">立即创建</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 查询区----end -->

    </div>
</template>
<style lang="scss">
// 设置输入框的宽度

.form02 {
  .el-form-item__content {
    width: 220px;
    .el-select {
      width: 300px;
    }
  }
}
.el-checkbox-group .el-checkbox {
  margin-left: 0;
  // padding-right: 30px;
}
.el-checkbox{
  width:173px;
}
</style>
<script>
import apis from '../../apis/apis';
export default {
  name: "searchinput",
  data() {
    return {
      form2: {
        //表单对象
        kx_title: "",
      },
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      rules:  {
        kx_title: [
          { required: true, message: "请输入课程标题", trigger: "blur" },
        ]
      }
    };
  },
  methods: {

    //表单提交
    submitForm(form2) {
      this.$refs["form02"].validate(valid => {
        if(valid){
            let param = Object.assign({}, this.form2);
            apis.msgApi.falshAdd(param)
            .then((data)=>{
                if(data&&data.data){
                    var json=data.data;
                     if(json&&data.status==200){
                        this.$message({message: '执行成功',type: "success"});
                        this.$router.push({ path: '/falsh_list' })
                        this.dialogEdittVisible = false;

                        return;
                    }
                }
               this.$message({message: '执行失败，请重试',type: "error"});
            })
            .catch((err)=>{
                this.$message({message: '执行失败，请重试',type: "error"});
            console.log(err)
            });
        }else {
          console.log("error submit!!");
          return false;
        }
      });
    },

  }
};
</script>
