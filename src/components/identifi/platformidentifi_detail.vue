<template >
    <div>
        <!-- {{personInfo}} -->
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
              <el-form-item label="名称" prop="name">
                  <el-input v-model="form2.name" placeholder="名称" disabled=""></el-input>
              </el-form-item>
              <!-- <el-form-item label="订单价格" prop="order_price">
                  <el-input v-model="form2.order_price" placeholder="订单价格" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
 disabled=""></el-input>
              </el-form-item>
              <el-form-item label="订单号" prop="order_sn">
                  <el-input v-model="form2.order_sn" placeholder="订单号" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" disabled="" ></el-input>
              </el-form-item> -->
              <el-form-item label="图片" prop="image" width="120">
                <img width="100%" :src="form2.image" alt="">
              </el-form-item>
              <el-form-item label="专家意见">
                  <el-input type="textarea" :rows="2" v-model="form2.expert_opinion" disabled=""></el-input>
              </el-form-item>
              <el-form-item label="藏品年代" prop="dating">
                  <el-input v-model="form2.dating" placeholder="鉴定藏品年代" ></el-input>
              </el-form-item>
              <!-- <el-form-item label="年代">
                  <el-input type="textarea" :rows="2" v-model="form2.dating" disabled=""></el-input>
              </el-form-item> -->
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
    width: 310px;
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
.document-editor__editable{
    min-height: 400px;
}
.ck-content{
  min-height: 400px;
}
.el-textarea__inner{
  height:150px;
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
        id:"",
        name: "",
        order_price: "",
        order_sn:"",
        image: "",
        order_status: "",
        starting_price:"",
        expert_opinion:'',
        dating:"",
        doUpload:'/napi/homeApi/upload',
        dialogImageUrl: '',
        dialogVisible: false,
        productImgs: [],
        isMultiple: true,
        imgLimit: 1
      },
      defaultMSG: null,
      form: {
          content: ''
      },
      config: {
          initialFrameHeight: 500
      },
      orderprice:[],
      auctionType_info:[],//拍卖分类列表
      peoples:[],
      products:[],
      editor:null,//编辑器实例
      EditorObj: "",
      labelPosition: "right", //lable对齐方式
      labelWidth: "100px", //lable宽度
      rules:  {
      }
    };
  },
  computed: {
      headers() {
          return {
              'Authorization': localStorage.getItem('Authorization'),
              'Access-Control-Allow-Headers':'x-requested-with:content-type'
          }
      }
  },
  mounted() {
    this.getParams();
  },
  components: {
    Ueditor
  },
  methods: {
    getParams() {
        // 取到路由带过来的参数
        const routerParams = this.personInfo
        // this.mallCode = routerParams;
        console.log(routerParams);
        // 将数据放在当前组件的数据内
        this.form2.id = this.personInfo.id;
        this.form2.name = this.personInfo.name;
        this.form2.image = this.personInfo.image;
        this.form2.order_sn = this.personInfo.order_sn;
        this.form2.order_price = this.personInfo.order_price;
        this.form2.order_status = this.personInfo.order_status;
        this.form2.expert_opinion = this.personInfo.expert_opinion;
        this.form.content = this.personInfo.expert_opinion;
        this.form.dating = this.personInfo.dating;
    },
    // 编辑器
    editorReady(instance) {
        instance.setContent(this.form.content);
        instance.addListener('contentChange', () => {
            this.form2.expert_opinion = instance.getContent();
        });
    },
    //表单提交
    submitForm(form2) {
      this.$refs["form02"].validate(valid => {
        if(valid){
            let param = Object.assign({}, this.form2);
            debugger
            apis.msgApi.platformIdentifi(param)
            .then((data)=>{
              console.log(data);
                if(data&&data.data){
                    var json=data.data;
                     if(json&&json.code == 1){
                        this.$message({message: '执行成功',type: "success"});
                        this.$router.push({ path: '/platformidentifi_list' })
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
