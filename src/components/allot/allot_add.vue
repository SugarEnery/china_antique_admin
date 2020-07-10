<template >
    <div>
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
                <el-form-item label="账号id" prop="admin_id">
                  <el-select v-model="form2.admin_id"  placeholder="请选择账号">
                      <el-option v-for="item in account_info" :key="item.admin_id" :lable="item.admin_id" :value="item.admin_id" >{{item.admin_name}}</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="客户id" prop="user_id">
                    <el-input v-model="form2.user_id" placeholder="客户id" ></el-input>
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
// http://cloud.1yuaninfo.com/admin/article/picture_add
// /apis/admin/article/picture_add
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
        article_auth: "",
        article_content: "",
        article_desc: "",
        imgLimit: 6
      },
      account_info:[],//账号
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      rules:  {
        wx_id: [{ required: true, message: "请填写姓名", trigger: "change" }],
        article_type: [{ required: true, message: "请填写姓名", trigger: "change" }],
        article_img: [{ required: true, message: "请填写姓名", trigger: "change" }],
        article_auth: [{ required: true, message: "请填写姓名", trigger: "change" }],
        article_content: [{ required: true, message: "请填写姓名", trigger: "change" }],
        article_desc: [{ required: true, message: "请填写姓名", trigger: "change" }],
        article_title: [{ required: true, message: "请填写姓名", trigger: "change" }]
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
  mounted() {
    this.selectRoleList();
  },
  methods: {
    // 账号下拉菜单
    selectRoleList() {//初始化下拉框动态数据
        apis.msgApi.accountList()
        .then((data)=>{
          console.log(data)
            if(data&&data.data){
                var json=data.data.data;
                if(json&&data.status==200){
                  this.account_info = data.data.data;
                }
            }

        })
        .catch((err)=>{
          this.$message({message: '执行失败，请重试',type: "error"});
        console.log(err)
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
            apis.msgApi.articleAdd(param)
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
