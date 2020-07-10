<template >
    <div>
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
              <el-form-item label="服务类型" prop="service_type">
                   <el-select v-model="form2.service_type" placeholder="选择服务类型">
                      <el-option label="包月" value="1"></el-option>
                      <el-option label="按次" value="2"></el-option>
                   </el-select>
              </el-form-item>
              <el-form-item label="手机号" prop="user_tel">
                  <el-input v-model="form2.user_tel" placeholder="用户手机号"></el-input>
              </el-form-item>
              <el-form-item label="产品" v-if='name != "zhitougu"'>
                <el-checkbox-group v-model="form2.product_id">
                    <el-checkbox v-for="item in products"  :label="item.product_name" :key="item.id" >
                    </el-checkbox>
                 </el-checkbox-group>
              </el-form-item>

                <el-form-item label="数量" prop="number">
                    <el-input v-model="form2.number" placeholder="数量" ></el-input>
                </el-form-item>
                <el-form-item label="开始时间" required>
                    <el-col :span="11">
                      <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form2.start_time" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                </el-form-item>
                <el-form-item label="结束时间" required>
                    <el-col :span="11">
                      <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form2.end_time" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>

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
      name:localStorage.getItem("name"),
      form2: {
        //表单对象
        name: "",
        product_id: "",
        number: "",
        end_time: "",
        start_time: "",
        user_tel:"",
      },
      products:[],
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      rules:  {
        user_tel: [{ required: true, message: "请填写手机", trigger: "change" }],
        product_id: [{ type: 'array', required: true, message: '请至少选择一个产品', trigger: 'change' }],
        number: [{ required: true, message: "请填写数量", trigger: "change" }],
        start_time:[{ required: true, message: "请选择", trigger: "change" }],
        end_time:[{ required: true, message: "请选择", trigger: "change" }],


      }
    };
  },
  mounted() {
   this.productList();
  },
  methods: {
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
            console.log(param)
            apis.msgApi.orderAdd(param)
            .then((data)=>{
              console.log(data);
                if(data&&data.data){
                    var json=data.data;
                     if(json&&data.status==200){
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
