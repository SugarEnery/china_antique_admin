<template >
    <div>
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
              <el-form-item label="微信平台" prop="wx_id">
                   <el-select v-model="form2.wx_id" placeholder="微信平台">
                       <el-option name="1" label="智投顾" value="1"></el-option>
                       <el-option name="2" label="慧投顾" value="2"></el-option>
                       <el-option name= '3' label="云投顾" value="3"></el-option>
                   </el-select>
              </el-form-item>
              <el-form-item label="所属平台" prop="name">
                   <el-select v-model="form2.name" placeholder="所属平台">
                       <el-option label="智投顾" value="zhitougu"></el-option>
                       <el-option label="慧投顾" value="huitougu"></el-option>
                       <el-option label="云投顾" value="yuntougu"></el-option>
                   </el-select>
              </el-form-item>
                <el-form-item label="展示顺序" prop="class_desc">
                    <el-input v-model="form2.class_desc" placeholder="展示顺序" ></el-input>
                </el-form-item>

                <el-form-item label="视频类型" prop="class_video_type">
                    <el-select v-model="form2.class_video_type" placeholder="视频类型">
                        <el-option label="网页" value="1"></el-option>
                        <el-option label="视频" value="2"></el-option>
                        <el-option label="第三方" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="视频时长" prop="class_length">
                    <el-input v-model="form2.class_length" placeholder="视频时长"></el-input>
                </el-form-item>
                <el-form-item label="点赞数	" prop="class_give">
                    <el-input v-model="form2.class_give" placeholder="点赞数"></el-input>
                </el-form-item>
                <el-form-item label="课程类型" prop="class_type">
                    <el-select v-model="form2.class_type" placeholder="课程类型">
                        <el-option label="早盘" value="1"></el-option>
                        <el-option label="收盘" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="视频路径	" prop="class_picture">
                    <el-input v-model="form2.class_url" placeholder="视频路径"></el-input>
                </el-form-item>
                <el-form-item label="课程标题" prop="class_picture">
                    <el-input v-model="form2.class_title" placeholder="课程标题"></el-input>
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

                <el-form-item label="封面图" prop="class_picture">
                    <el-input v-model="form2.class_picture" placeholder="封面图"></el-input>
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
        wx_id: "",
        name: "",
        class_desc: "",
        class_video_type: "",
        class_length: "",
        class_give: "",
        class_picture:"",
        class_type:"",
        class_url:"",
        class_title:"",

        doUpload:'/napi/admin/classes/picture_add',
        dialogImageUrl: '',
        dialogVisible: false,
        productImgs: [],
        isMultiple: true,
        article_img:'',
        imgLimit: 6
      },
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      rules:  {
        name: [{ required: true, message: "请填写姓名", trigger: "change" }],
        class_desc: [{ required: true, message: "请填写姓名", trigger: "change" }],
        class_length: [{ required: true, message: "请填写姓名", trigger: "change" }],
        class_give: [{ required: true, message: "请填写姓名", trigger: "change" }],
        // class_picture: [{ required: true, message: "请填写姓名", trigger: "change" }],
        class_type: [{ required: true, message: "请填写姓名", trigger: "change" }],
        class_url: [{ required: true, message: "请填写姓名", trigger: "change" }],
        class_title: [{ required: true, message: "请填写姓名", trigger: "change" }],
        wx_id: [{ required: true, message: "请选择所属微信平台", trigger: "change" }],
        class_video_type: [{ required: true, message: "请选择所属分组", trigger: "change" }],


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
  methods: {
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
      this.form2.class_picture = res;
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
            apis.msgApi.courseAdd(param)
            .then((data)=>{
              console.log(data);
                if(data&&data.data){
                    var json=data.data;
                     if(json&&data.status==200){
                        this.$message({message: '执行成功',type: "success"});
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
