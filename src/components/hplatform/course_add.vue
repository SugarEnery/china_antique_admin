<template >
    <div>
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
               <el-form-item label="微信平台" prop="wx_id">
                   <el-select v-model="form2.wx_id" placeholder="微信平台">
                       <el-option label="智投顾" value="1"></el-option>
                       <el-option label="慧投顾" value="2"></el-option>
                       <el-option label="云投顾" value="3"></el-option>
                   </el-select>
               </el-form-item>
                <el-form-item label="展示顺序" prop="name">
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
                <el-form-item label="封面图" prop="class_picture">
                    <el-input v-model="form2.class_picture" placeholder="封面图"></el-input>
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
                <!-- <el-upload class="upload-demo" action="上传的地址" list-type="picture-card" :limit='5' :auto-upload="false" :on-exceed='uploadOverrun' :on-preview="handleContImgPreview" :on-remove='handleRmove' :http-request='submitUpload' :file-list="fileList" ref="upload">
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" :append-to-body="true" :close-on-click-modal="false">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog> -->
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
      form2: {
        //表单对象
        wx_id: "",
        name: "zhitougu",
        class_desc: "",
        class_video_type: "",
        class_length: "",
        class_give: "",
        class_picture:"",
        class_type:"",
        class_url:"",
        class_title:"",
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
  methods: {
    //表单提交
    submitForm(form2) {
      this.$refs["form02"].validate(valid => {
        if(valid){
          debugger
            let param = Object.assign({}, this.form2);
            apis.msgApi.courseAdd(param)
            .then((data)=>{
              console.log(data);
               //  if(data&&data.data){
               //      var json=data.data;
               //       if(json&&data.status==200){
               //          this.$message({message: '执行成功',type: "success"});
               //          this.dialogEdittVisible = false;
               //          return;
               //      }
               //  }
               // this.$message({message: '执行失败，请重试',type: "error"});
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
      // this.dialogImageUrl = []; // 存放图片路径的数组
      // this.fileName = '';
      // this.a.img.forEach((item) => { // this.a是后台编辑时返回给你的数据
      //     this.dialogImageUrl.push('地址' + item.'后台返回的地址');
      //     this.fileName += item.'后台返回的地址'+ ','; // 由于返回的是多个图片，所以要拼接起来
      // })
      // var imgList = [];
      // for (var i = 0; i < this.dialogImageUrl.length; i++) {
      //     imgList.push(this.dialogImageUrl[i]);
      // }
      // this.fileList = imgList.map((ele) => { // 最后将数据给fileLis
      //     let item = {};
      //     item.url = ele;
      //     return item;
      // })
    },

  }
};
</script>
