<template >
    <div>
        <!-- 查询区----start -->
        <!-- {{personInfo}} -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
              <el-form-item label="客户id" prop="user_id">
                  <el-input v-model="form2.user_id" placeholder="客户id" disabled></el-input>
              </el-form-item>
              <el-form-item label="原id" prop="admin_old_id">
                  <el-input v-model="form2.admin_old_id" placeholder="原id" disabled></el-input>
              </el-form-item>
              <el-form-item label="选择部门" prop="id">
                <el-select v-model="depart_info.depart_name"  placeholder="请选择部门"   @change="departGet(depart_info.depart_name)"  >
                    <el-option
                    v-for="item in depart_info"
                    :key="item.id"
                    :lable="item.depart_name"
                    :value="item.depart_name" >
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="员工账号" prop="admin_id">
                <el-select v-model="employee_info.admin_name"  placeholder="请选择账号"   @change="employeeGet(employee_info.admin_name)"  >
                    <el-option
                    v-for="item in employee_info"
                    :key="item.admin_id"
                    :lable="item.admin_name"
                    :value="item.admin_name" >
                    </el-option>
                </el-select>
              </el-form-item>

              <!-- <el-form-item label="账号id" prop="admin_id">
                <el-select v-model="form2.admin_id"  placeholder="请选择账号">
                    <el-option v-for="item in account_info" :key="item.admin_id" :lable="item.admin_id" :value="item.admin_id" >{{item.admin_name}}</el-option>
                </el-select>
              </el-form-item> -->


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
      personInfo:this.$route.query,
      form2: {
        //表单对象
        name: "",
        user_id	: "",
        admin_id: "",
        admin_old_id: "",
        imgLimit: 6
      },
      depart_info:[],//部门
      employee_info:[],//账号
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
    this.getParams();
    this.departList();
  },
  methods: {
    getParams() {
        // 取到路由带过来的参数
        const routerParams = this.personInfo
        // this.mallCode = routerParams;
        console.log(routerParams);
        // 将数据放在当前组件的数据内
        this.form2.admin_old_id = this.personInfo.admin_id;
        this.form2.user_id = this.personInfo.user_id;

    },
    // 部门列表
    departList() {
      apis.msgApi.departList()
      .then((data)=>{
        console.log(data)
          if(data&&data.data){
              var json=data.data;
              if(json&&data.status==200){
                this.depart_info = json;
              }
          }
      })
      .catch((err)=>{
        this.$message({message: '执行失败，请重试',type: "error"});
      console.log(err)
      });
    },
    departGet(val){
      console.log(val)
      this.depart_info.map((s, index) => {
        if (s.depart_name === val) {
          this.id = this.depart_info[index].id;
          console.log(this.id);
          this.form2.depart_id = this.id;
          // 员工账号下拉菜单
          // employeeList() {//初始化下拉框动态数据
              let depart_id = this.form2.depart_id;
              apis.msgApi.employeeList({depart_id:depart_id})
              .then((data)=>{
                console.log(data)
                  if(data&&data.data){
                      var json=data.data;
                      if(json&&data.status==200){
                        this.employee_info = data.data;
                      }
                  }

              })
              .catch((err)=>{
                this.$message({message: '执行失败，请重试',type: "error"});
              console.log(err)
              });
          // },

        }
      })

     },
    employeeGet(val){
      console.log(val)
      this.employee_info.map((s, index) => {
        if (s.admin_name === val) {
          this.admin_id = this.employee_info[index].admin_id;
          console.log(this.admin_id);
          this.form2.admin_id = this.admin_id
        }
      })

     },
    //表单提交
    submitForm(form2) {
      this.$refs["form02"].validate(valid => {
        if(valid){
            let param = Object.assign({}, this.form2);
            apis.msgApi.allotEdit(param)
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
