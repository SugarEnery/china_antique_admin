<template >
    <div>
        <!-- 查询区----start -->
        <div class="container form02">
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
              <el-form-item label="模板备注" prop="news_adstracts">
                  <el-input v-model="form2.news_adstracts" placeholder="模板备注"></el-input>
              </el-form-item>
              <el-form-item label="服务类型颜色">
                <el-radio-group v-model="form2.mt_color">
                  <el-radio label="1" >红色</el-radio>
                  <el-radio label="2" >绿色</el-radio>
                </el-radio-group>
              </el-form-item>
                <el-form-item label="产品"  v-if='name != "zhitougu"'>
                  <el-checkbox-group v-model="form2.product_id">
                      <el-checkbox v-for="item in products"  :label="item.product_name" :key="item.id" >
                      </el-checkbox>
                   </el-checkbox-group>
                </el-form-item>

                <el-form-item label="是否收费">
                  <el-radio-group v-model="form2.is_free">
                    <el-radio label="1" >免费</el-radio>
                    <el-radio label="2" >会员免费</el-radio>
                    <el-radio label="3" >收费</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="收费金额" prop="news_money">
                  <el-select v-model="form2.news_money"  placeholder="请选择收费金额"    >
                      <el-option
                      v-for="item in orderprice"
                      :key="item.news_money"
                      :lable="item.price"
                      :value="item.price" >
                      </el-option>
                  </el-select>
                  <el-input v-model="form2.news_moneys" placeholder="自定义金额"></el-input>
                </el-form-item>
                <!-- <el-form-item label="自定义金额" prop="news_moneys">

                </el-form-item> -->
                <!-- 多选框遍历 -->
                <el-form-item label="推送人群">
                  <el-checkbox-group v-model="form2.user_type">
                      <el-checkbox v-for="people in peoples"  :label="people.type_id" :key="people.type_id" :value="people.type_id"  >
                        {{people.type_name}}
                      </el-checkbox>
                   </el-checkbox-group>
                </el-form-item>
                <el-form-item label="产品名称" prop="product_name">
                    <el-input v-model="form2.product_name" placeholder="产品名字"></el-input>
                </el-form-item>
                <el-form-item label="服务类型" prop="mt_name">
                    <el-input v-model="form2.mt_name" placeholder="类型名字"></el-input>
                </el-form-item>
                <el-form-item label="快讯" prop="kx_id">
                  <el-select v-model="kx_info.kx_title"  placeholder="请选择快讯"   @change="selectGet(kx_info.kx_title)"  >
                      <el-option
                      v-for="item in kx_info"
                      :key="item.kx_id"
                      :lable="item.kx_title"
                      :value="item.kx_title" >
                      </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="标题" prop="title">
                    <el-input v-model="form2.title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="付费摘要" prop="news_description">
                  <el-input type="textarea" v-model="form2.news_description"></el-input>
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
      name:localStorage.getItem("name"),
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
        is_free:"",
        news_money:"0",
        news_moneys:"",
        mt_color:"",
        news_description:"",
      },
      defaultMSG: null,
      form: {
          content: ''
      },
      config: {
          initialFrameHeight: 500
      },
      orderprice:[],
      kx_info:[],//快讯
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
  mounted() {
    this.selectRoleList();
    this.orderList();
    this.peopleList();
    this.productList();
  },
  components: {
    Ueditor
  },
  methods: {
    // 快讯下拉菜单
    selectRoleList() {//初始化下拉框动态数据
        apis.msgApi.falshList()
        .then((data)=>{
          console.log(data)
            if(data&&data.data){
                var json=data.data;
                if(json&&data.status==200){
                  var kx_info = data.data.data
                  this.kx_info = data.data.data;
                }
            }

        })
        .catch((err)=>{
          this.$message({message: '执行失败，请重试',type: "error"});
        console.log(err)
        });
    },
    selectGet(val){
      console.log(val)
      this.kx_info.map((s, index) => {
        if (s.kx_title === val) {
          this.kx_id = this.kx_info[index].kx_id;
          console.log(this.kx_id);
          this.form2.kx_id = this.kx_id
        }
      })

     },
    // 订单价格菜单
    orderList() {//初始化下拉框动态数据
        apis.msgApi.orderprice()
        .then((data)=>{
          console.log(data);
            if(data&&data.data){
                var json=data.data;
                if(json&&data.status==200){
                  var orderprice = data.data;
                  this.orderprice = data.data;

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
            // console.log(data)
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
            if(this.form2.is_free == '3' && this.form2.news_money =="0"){
              this.form2.news_money = this.form2.news_moneys;
            }
            let param = Object.assign({}, this.form2);
            apis.msgApi.pushAdd(param)
            .then((data)=>{
              console.log(data);
                if(data&&data.data){
                    var json=data.data;
                     if(json&&json.error_code== 0){
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
