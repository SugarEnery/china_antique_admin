<template >
    <div>
      <!-- {{personInfo}} -->
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
                <el-form-item label="id" prop="id">
                    <el-input v-model="form2.id" placeholder="Id" disabled></el-input>
                </el-form-item>
                <el-form-item label="微信平台" prop="wx_id">
                    <el-input v-model="form2.wx_id" placeholder="请选择平台" disabled ></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type_id">
                   <el-select v-model="form2.type_id" placeholder="请选择类型">
                      <el-option label="研究力" value="3" ></el-option>
                      <el-option label="技术谈" value="4" ></el-option>
                   </el-select>
                   <!-- <p>1早知道2最强音</p> -->
                </el-form-item>
                <el-form-item label="区分类型" prop="type">
                   <el-select v-model="form2.type" placeholder="请区分类型">
                      <el-option label="早知道" value="1" ></el-option>
                      <el-option label="最强音" value="2" ></el-option>
                   </el-select>
                   <!-- <p>3研究力4技术谈</p> -->
                </el-form-item>
                <el-form-item label="标题" prop="article_title">
                    <el-input v-model="form2.article_title" placeholder="标题"></el-input>
                </el-form-item>
                 <el-form-item label="摘要" prop="article_desc">
                    <el-input  v-model="form2.article_desc" placeholder="摘要"></el-input>
                </el-form-item>
                <el-form-item label="来源" prop="article_auth">
                    <el-input v-model="form2.article_auth" placeholder="来源"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-upload
                    :action="form2.doUpload"
                    list-type="picture-card"
                    accept="image/*"
                    name = "picture"
                    :headers="headers"
                    :limit="form2.imgLimit"
                    :file-list="form2.productImgs"
                    :multiple="form2.isMultiple"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="form2.dialogVisible">
                    <img width="100%" :src="form2.dialogImageUrl" alt="">
                  </el-dialog>
                </el-form-item>

                <el-form-item label="封面图" prop="article_img">
                    <el-input v-model="form2.article_img" placeholder="封面图"></el-input>
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
export default {
  name: "searchinput",
  data() {
    return {
      personInfo:this.$route.query,
      form2: {
        //表单对象
        id:"",
        wx_id: "",
        article_auth: "",
        article_content: "",
        article_desc: "",
        article_title:"",
        article_img: "",
        article_type:"",
        type:"",
        type_id:"",
        doUpload:'/napi/admin/article/picture_add',
        dialogImageUrl: '',
        dialogVisible: false,
        productImgs: [],
        isMultiple: true,
        article_img:'',
        imgLimit: 1
      },
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
        wx_id: [{ required: true, message: "请填写", trigger: "change" }],
        type: [{ required: true, message: "请填写", trigger: "change" }],
        type_id: [{ required: true, message: "请填写", trigger: "change" }],
        article_type: [{ required: true, message: "请填写", trigger: "change" }],
        article_content: [{ required: true, message: "请填写", trigger: "change" }],
        article_title: [{ required: true, message: "请填写", trigger: "change" }]
      }
    };
  },
  computed: {
      headers() {
          return {
              'Authorization': localStorage.getItem('Authorization')
          }
      }
  },
  mounted(){
    this.getParams();
  },
  methods: {
    getParams() {
        // 取到路由带过来的参数
        const routerParams = this.personInfo
        // this.mallCode = routerParams;
        // console.log(routerParams);
        // 将数据放在当前组件的数据内
        this.form2.id = this.personInfo.id;
        this.form2.wx_id = this.personInfo.wx_id;
        this.form2.type = this.personInfo.type;
        if(this.form2.type == 1){
          this.form2.type = "1";
        }else{
          this.form2.type = "2";
        }
        this.form2.type_id = this.personInfo.type_id;
        if(this.form2.type_id == 3){
          this.form2.type_id = "3";
        }else{
          this.form2.type_id = "4";
        }
        this.form2.article_img = this.personInfo.article_img;
        this.form2.article_auth = this.personInfo.article_auth;
        this.form2.article_content = this.personInfo.article_content;
        this.article_desc = this.personInfo.article_desc;
        this.form2.article_title = this.personInfo.article_title;
        this.form.content = this.personInfo.article_content;
    },
    editorReady(instance) {
        instance.setContent(this.form.content);
        instance.addListener('contentChange', () => {
            this.form2.article_content = instance.getContent();
        });
    },
    handleRemove(file, fileList) {//移除图片
        console.log(file, fileList);
    },
    handlePictureCardPreview(file) {//预览图片时调用
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    beforeAvatarUpload(file) {//文件上传之前调用做一些拦截限制
      console.log(file);
      const isJPG = true;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file) {//图片上传成功
      console.log(res);
      console.log(file);
      this.form2.article_img = res;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleExceed(files, fileList) {//图片上传超过数量限制
      this.$message.error('上传图片不能超过6张!');
      console.log(file, fileList);
    },
    imgUploadError(err, file, fileList){//图片上传失败调用
      console.log(err)
      this.$message.error('上传图片失败!');
    },
    //表单提交
    submitForm(form2) {
      this.$refs["form02"].validate(valid => {
        if(valid){
            let param = Object.assign({}, this.form2);
            apis.msgApi.articleEdit(param)
            .then((data)=>{
              console.log(data);
                if(data&&data.data){
                    var json=data.data;
                     if(json&&data.status==200){
                        this.$message({message: '执行成功',type: "success"});
                        this.$router.push({ path: '/article_list' })
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
