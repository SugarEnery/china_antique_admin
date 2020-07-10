<template >
    <div>
      <!-- {{personInfo}} -->
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
                <el-form-item label="退款id" prop="refund_id">
                    <el-input v-model="form2.refund_id" placeholder="消息id" disabled=""></el-input>
                </el-form-item>
                <el-form-item label="审核备注" prop="refund_remark">
                    <el-input v-model="form2.refund_remark" placeholder="审核备注"></el-input>
                </el-form-item>
                <el-form-item label="跟踪类型" prop="refund_deal">
                   <el-select v-model="form2.refund_deal" placeholder="跟踪类型">
                      <el-option label="已退款" value="1"></el-option>
                      <el-option label="继续合作" value="2"></el-option>
                   </el-select>
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
    width: 300px;
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
.document-editor__editable{
    min-height: 400px;
}
.ck-content{
  min-height: 400px;
}
</style>
<script>
import apis from '../../apis/apis';
import Ueditor from '../../components/ckeditor/baidu.vue';
export default {
  name: "searchinput",
  data() {
    return {
      personInfo:this.$route.query,
      form2: {
        //表单对象
        refund_remark: "",
        refund_id	: "",
        refund_deal:"",
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
        const routerParams = this.personInfo
        // this.mallCode = routerParams;
        console.log(routerParams);
        // 将数据放在当前组件的数据内
        this.form2.refund_remark = this.personInfo.refund_remark;
        this.form2.refund_id = this.personInfo.refund_id;
        this.form2.refund_deal = this.personInfo.refund_deal;

    },
    editorReady(instance) {
        instance.setContent(this.form.content);
        instance.addListener('contentChange', () => {
            this.form2.new_content = instance.getContent();
        });
    },
    //表单提交
    submitForm(form2) {
      this.$refs["form02"].validate(valid => {
        if(valid){
            let param = Object.assign({}, this.form2);
            apis.msgApi.auditEdit(param)
            .then((data)=>{
              console.log(data);
                if(data&&data.data){
                    var json=data.data;
                     if(json&&json.error_code == 0){
                        this.$message({message: '执行成功',type: "success"});
                        this.$router.push({ path: '/refund_list' })
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
