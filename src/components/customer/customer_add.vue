<template >
    <div>
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">

                <!-- 多选框遍历 -->
                <el-form-item label="推送人群">
                  <el-checkbox-group v-model="form2.type_id">
                      <el-checkbox v-for="people in peoples"  :label="people.type_id" :key="people.type_id" :value="people.type_id"  >
                        {{people.type_name}}
                      </el-checkbox>
                   </el-checkbox-group>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                  <el-input type="textarea" v-model="form2.content"></el-input>
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
    width: 400px;
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
  width:150px;
  // display: inline;
}
.el-textarea__inner{
  height:200px;
}
.document-editor__editable{
    min-height: 400px;
}
.ck-content{
  min-height: 400px;
}
</style>
<script>
import apis from '../../apis/apis';
export default {
  name: "searchinput",
  data() {
    return {
      name:localStorage.getItem("name"),
      form2: {
        //表单对象
        content:"",
        type_id: [],//推送人群
        name: "",
      },
      peoples:[],
      products:[],
      editor:null,//编辑器实例
      EditorObj: "",
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      rules:  {
      }
    };
  },
  mounted() {
    this.peopleList();
  },
  methods: {
    // 群推人群
    peopleList(){
        apis.msgApi.userTyle()
          .then((data)=>{
            // console.log(data)
              if(data&&data.data){
                  var json=data.data;
                  if(json&&data.status==200){
                    this.peoples = data.data;
                  }
              }

          })
          .catch((err)=>{
            this.$message({message: '执行失败，请重试',type: "error"});
            console.log(err)
          });
    },
    //表单提交
    submitForm(form2) {
      this.$refs["form02"].validate(valid => {
        if(valid){
            let param = Object.assign({}, this.form2);
            apis.msgApi.customerAdd(param)
            .then((data)=>{
              console.log(data);
                if(data&&data.data){
                    var json=data.data;
                     if(json&&data.status==200){
                        this.$message({message: '执行成功',type: "success"});
                        this.$router.push({ path: '/customer_list' })
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
