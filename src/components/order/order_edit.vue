<template >
    <div>
      <!-- {{personInfo}} -->
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
                <el-form-item label="产品">
                  <el-checkbox-group v-model="form2.product_id">
                      <el-checkbox v-for="item in products"  :label="item.product_name" :key="item.id" >
                      </el-checkbox>
                   </el-checkbox-group>
                </el-form-item>
                <el-form-item label="服务类型" prop="service_type">
                   <el-select v-model="form2.service_type" placeholder="服务类型">
                    <el-option label="1" value="1">包月</el-option>
                    <el-option label="2" value="2">按次</el-option>
                   </el-select>
                   1包月2按次
                </el-form-item>
                <el-form-item label="数量" prop="number">
                    <el-input v-model="form2.number" placeholder="数量" ></el-input>
                </el-form-item>
                <el-form-item label="开始日期" prop="start_time" label-width="100px">
                    <el-date-picker  v-model="form2.start_time" type="date"  placeholder="选择日期" value-format="timestamp"> </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="end_time" label-width="100px">
                    <el-date-picker  v-model="form2.end_time" type="date"  placeholder="选择日期" value-format="timestamp"> </el-date-picker>
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
        new_content:"",
        shares_report_url: "",
        title: "",
        id	: "",
        name:"",
      },
      products:[],
      defaultMSG: null,
      form: {
          content: ''
      },
      config: {
          initialFrameHeight: 500
      },
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      rules:  {
      }
    };
  },
  mounted() {
    this.getParams();
    this.productList();
  },
  methods: {
    getParams() {
        // 取到路由带过来的参数
        const routerParams = this.personInfo
        // this.mallCode = routerParams;
        console.log(routerParams);
        // 将数据放在当前组件的数据内
        this.form2.shares_report_url = this.personInfo.shares_report_url;
        this.form2.id = this.personInfo.id;
        this.form2.title = this.personInfo.title;
        this.form.content = this.personInfo.new_content;
        this.form2.new_content = this.personInfo.new_content;

    },
    editorReady(instance) {
        instance.setContent(this.form.content);
        instance.addListener('contentChange', () => {
            this.form2.new_content = instance.getContent();
        });
    },
    productList(){
      // 产品列表下拉
        apis.msgApi.productList()
          .then((data)=>{
            console.log(data)
              if(data&&data.data){
                  var json=data.data;
                  if(json&&data.status==200){
                    this.products = data.data;
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
            apis.msgApi.orderEdit(param)
            .then((data)=>{
              console.log(data);
                if(data&&data.data){
                    var json=data.data;
                     if(json&&json.error_code == 0){
                        this.$message({message: '执行成功',type: "success"});
                        this.$router.push({ path: '/order_list' })
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
