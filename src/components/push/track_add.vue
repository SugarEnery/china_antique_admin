<template >
    <div>
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
                <el-form-item label="消息id" prop="news_id">
                    <el-input v-model="form2.news_id" placeholder="消息id" disabled></el-input>
                </el-form-item>
                <el-form-item label="服务类型颜色">
                  <el-radio-group v-model="form2.mt_color">
                    <el-radio label="1" >红色</el-radio>
                    <el-radio label="2" >绿色</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="模板备注" prop="news_adstracts">
                    <el-input v-model="form2.news_adstracts" placeholder="模板备注"></el-input>
                </el-form-item>

                <el-form-item label="产品名字" prop="product_name">
                    <el-input v-model="form2.product_name" placeholder="产品名字"></el-input>
                </el-form-item>
                <el-form-item label="类型名字" prop="mt_name">
                    <el-input v-model="form2.mt_name" placeholder="类型名字"></el-input>
                </el-form-item>
                <div class="box-container">
                    <Ueditor @ready="editorReady"
                      ref="ue"
                      :value="defaultMSG"
                      :ueditorConfig="config"
                      style="width:100%;">
                    </Ueditor>
                </div>
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
        news_id:'',
        news_adstracts: "",
        news_content: "",
        is_shares: "",
        product_name: "",
        mt_name:"",
        name:"",
        mt_color:'',
      },
      defaultMSG: null,
      form: {
          content: ''
      },
      config: {
          initialFrameHeight: 500
      },
      kx_info:[],
      peoples:[],
      products:[],
      labelPosition: "right", //lable对齐方式
      labelWidth: "100px", //lable宽度
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
        //this.mallInfo.searchMap.mallCode = routerParams;
        //this.keyupMallName()
        this.form2.news_id = this.personInfo.id;
    },
    editorReady(instance) {
        instance.setContent(this.form.content);
        instance.addListener('contentChange', () => {
            this.form2.news_content = instance.getContent();
        });
    },

    //表单提交
    submitForm(form2) {
      this.$refs["form02"].validate(valid => {
        if(valid){
            let param = Object.assign({}, this.form2);
            apis.msgApi.trackAdd(param)
            .then((data)=>{
              console.log(data);
                if(data&&data.data){
                    var json=data.data;
                     if(json&&data.status==200){
                        this.$message({message: '执行成功',type: "success"});
                        this.$router.push({ path: '/push_list' })
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
