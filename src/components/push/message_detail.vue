<template >
    <div>
        <!-- 查询区----start -->
        <div class="container form02">
          <!-- 传过来的参数：{{personInfo}} -->
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
              <el-form-item label="详情页">
                <el-radio-group v-model="form2.is_url">
                  <el-radio label="1" >需要</el-radio>
                  <el-radio label="0" >不需要</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否股票">
                <el-radio-group v-model="form2.is_shares">
                  <el-radio label="1" >是</el-radio>
                  <el-radio label="0" >否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="所属平台" prop="name">
                 <el-select v-model="form2.name" placeholder="微信平台">
                     <el-option label="慧投顾" value="huitougu"></el-option>
                 </el-select>
              </el-form-item>
                <el-form-item label="模板备注" prop="news_adstracts">
                    <el-input v-model="form2.news_adstracts" placeholder="模板备注"></el-input>
                </el-form-item>
                <el-form-item label="产品">
                  <el-checkbox-group v-model="form2.product_id">
                      <el-checkbox v-for="item in products"  :label="item.product_name" :key="item.id" >
                      </el-checkbox>
                   </el-checkbox-group>
                </el-form-item>
                <!-- 多选框遍历 -->
                <el-form-item label="推送人群">
                  <el-checkbox-group v-model="form2.user_type">
                      <el-checkbox v-for="people in peoples"  :label="people.type_name" :key="people.type_name" >
                      </el-checkbox>
                   </el-checkbox-group>
                </el-form-item>
                <el-form-item label="快讯" prop="kx_id">
                  <el-select v-model="form2.kx_id"  placeholder="请选择快讯">
                      <el-option v-for="item in kx_info" :key="item.kx_id" :lable="item.kx_id" :value="item.kx_id" >{{item.kx_addtime}}</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="产品名字" prop="product_name">
                    <el-input v-model="form2.product_name" placeholder="产品名字"></el-input>
                </el-form-item>
                <el-form-item label="类型名字" prop="mt_name">
                    <el-input v-model="form2.mt_name" placeholder="类型名字"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form2.title" placeholder="title"></el-input>
                </el-form-item>
                <el-form-item label="详情内容" prop="new_content">
                    <el-input type="textarea" v-model="form2.new_content"></el-input>
                </el-form-item>
                <div class="document-editor">
                    <!-- 工具栏容器 start -->
                    <div class="document-editor__toolbar"></div>
                    <!-- 工具栏容器 end -->

                    <!-- 编辑器容器 start -->
                    <div class="document-editor__editable-container">
                        <div class="document-editor__editable">
                            <p>CSDN同款富文本编辑器，支持将截图直接粘贴进来</p>
                        </div>
                    </div>
                    <!-- 编辑器容器 end -->
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
export default {
  name: "searchinput",
  data() {
    return {
      personInfo:this.$route.query,
      form2: {
        //表单对象
        is_url:"",
        news_adstracts: "",
        product_id: [],//产品
        user_type: [],//推送人群
        kx_id: "",
        new_content: "",
        is_shares: "",
        product_name: "",
        mt_name:"",
        title: "",
        name:"",
      },
      kx_info:[],
      peoples:[],
      products:[],
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      rules:  {
      }
    };
  },
  mounted() {
    console.log(this.personInfo);
    this.selectRoleList();
    this.peopleList();
    this.productList();
    this.initCKEditor()
  },
  methods: {
    selectRoleList() {//初始化下拉框动态数据
        let param = 1;
        apis.msgApi.falshList(param)
        .then((data)=>{
          // console.log(data)
            if(data&&data.data){
                var json=data.data.data;
                if(json&&data.status==200){
                  this.kx_info = data.data.data;
                  // return kx_info;
                }
            }

        })
        .catch((err)=>{
          this.$message({message: '执行失败，请重试',type: "error"});
        console.log(err)
        });
    },
    peopleList(){
      // 群推人群
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
    //初始化容器
    initCKEditor() {
            DecoupledEditor.create(document.querySelector('.document-editor__editable'), {
                ckfinder: {
                    // 使用CKFinder QuickUpload命令将图像上传到服务器。
                    uploadUrl: '/api/img-api/upload'
                }
            })
            .then(editor => {
                const toolbarContainer = document.querySelector('.document-editor__toolbar');
                toolbarContainer.appendChild(editor.ui.view.toolbar.element);//添加工具栏
                this.EditorObj = editor;
            })
            .catch(err => {
                console.error(err);
            });
    },
    //表单提交
    submitForm(form2) {
      this.$refs["form02"].validate(valid => {
        if(valid){
            let param = Object.assign({}, this.form2);
            debugger
            apis.msgApi.pushAdd(param)
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
