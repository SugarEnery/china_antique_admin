<template >
    <div>
        <!-- 查询区----start -->
        <!-- {{personInfo}} -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
              <el-form-item label="用户id" prop="user_id" >
                  <el-input v-model="form2.user_id" placeholder="用户id" disabled ></el-input>
              </el-form-item>
              <el-form-item label="申请次数" prop="apply_num">
                  <el-input v-model="form2.apply_num" placeholder="申请添加次数"></el-input>
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
      personInfo:this.$route.query,
      form2: {
        //表单对象
        user_id:'',
        name:'',
        apply_num: "",

      },
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      rules:  {

      }
    };
  },
  mounted() {
    this.getParams();
  },
  methods: {
    getParams() {
        // 取到路由带过来的参数
        // const routerParams = this.personInfo
        // this.mallCode = routerParams;
        // console.log(routerParams);
        // 将数据放在当前组件的数据内
        //this.mallInfo.searchMap.mallCode = routerParams;
        //this.keyupMallName()
        this.form2.user_id = this.personInfo.id;

    },
    //表单提交
    submitForm(form2) {
      this.$refs["form02"].validate(valid => {
        if(valid){
            let param = Object.assign({}, this.form2);
            apis.msgApi.applyAdd(param)
            .then((data)=>{
              // console.log(data)
                if(data&&data.data){
                    var json=data.data;
                     if(json&&data.status==200){
                        this.$message({message: '执行成功',type: "success"});
                        this.$router.push({ path: '/clients_list' })
                        this.dialogEdittVisible = false;
                        return;
                    }
                }
            })
            .catch((err)=>{
              // console.log(err)
              this.$message({message: '执行失败，请重试',type: "error"});
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
