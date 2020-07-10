<template>
<div class="container">
    <el-form ref="form" :model="form" label-width="80px">
    <div>
        <span class="uploadImage">设置在banner时显示的图片</span>
        <el-upload
                class="avatar-uploader"
                action="url"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="changeFile"
                :before-upload="beforeAvatarUpload">
            <img v-if="form.course_big_picture" :src="form.course_big_picture" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
    </el-form>
</div>
</template>

<script>
import apis from '../../apis/apis';
export default {
  data() {
    return{
      dialogImageUrl: '',
      dialogVisible: false,
      formLabelWidth: '80px',
      limitNum: 3,
      form: {}
    }
  },
  methods: {
    postUrl(data) {
        return fetch({
          url: 'http://cloud.1yuaninfo.com/admin/article/picture_add',
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: data
        })
    },
    changeFile(file, fileList) {
      let formD = new FormData();
      formD.append('picture', file.url);
      console.log(file, fileList)
      let self = this;
      apis.msgApi.imgUpload(file.raw)
      .then((data)=>{
        console.log(data.data)
          this.listLoading=false;
          if (data && data.data) {
                  var json = data.data.data;
                  if ( data.status == 200) {
                    _this.tableData = json;

                   // localStorage.getItem(name);
                  }
                  else if (json.message) {
                      this.$message({message: json.message,type: "error"});
                  }
          }
      })
      .catch((err)=>{
          this.listLoading=false;
          this.$message({message: '查询异常，请重试',type: "error"});
      });
    },
    handleBannerImageSuccess(res, file) {
        if (res.code == 0) {
            this.form.course_big_picture = res.result.data;
        }
    },
    beforeAvatarUpload(file) {
        let isImage;
        if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/jpg') {
            isImage = file.type;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isImage) {
            this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!');
        }
        if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isImage && isLt2M;
    },

    // 上传文件之前的钩子
    handleBeforeUpload(file){

      console.log('before')
      if(!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
        this.$notify.warning({
          title: '警告',
          message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
        })
      }
      let size = file.size / 1024 / 1024 / 2
      if(size > 2) {
        this.$notify.warning({
          title: '警告',
          message: '图片大小必须小于2M'
        })
      }
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {

    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadSuccess(file,index){
      debugger
      console.log(this)
    },

    uploadFile() {
      console.log(11111111);
      // t图片

      this.$refs.upload.submit();
      var param = this.file;

      var _this = this;
      apis.msgApi.imgUpload(param)
      .then((data)=>{
        console.log(data.data)
          this.listLoading=false;
          if (data && data.data) {
                  var json = data.data.data;
                  if ( data.status == 200) {
                    _this.tableData = json;

                   // localStorage.getItem(name);
                  }
                  else if (json.message) {
                      this.$message({message: json.message,type: "error"});
                  }
          }
      })
      .catch((err)=>{
          this.listLoading=false;
          this.$message({message: '查询异常，请重试',type: "error"});
      });

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
