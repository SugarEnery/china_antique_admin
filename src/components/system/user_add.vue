<template >
    <div>
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
                <el-form-item label="微信平台" prop="wx_id">
                    <el-select v-model="form2.wx_id" placeholder="微信平台">
                        <el-option label="所有平台" value="0"></el-option>
                        <el-option label="智投顾" value="1"></el-option>
                        <el-option label="慧投顾" value="2"></el-option>
                    </el-select>
                </el-form-item>
               <div class="custom-tree-container" prop="rules">
                 <div class="block">
                   <el-tree
                   v-model="form2.rules"
                     :data="treeData"
                     ref="tree"
                     :props="defaultProps"
                     node-key="id"
                     show-checkbox
                     :check-on-click-node="true"
                     :expand-on-click-node="false"
                     @node-click="nodeClick"
                   >
                   </el-tree>
                   <!-- v-loading="listLoading"
                     :expand-on-click-node="false" -->
                 </div>
               </div>
                <el-form-item label="用户组名" prop="title">
                    <el-input v-model="form2.title" placeholder="姓名"></el-input>
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
  width:20px;
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
        title: "",
        rules:[],
      },
      //组织结构数据
      treeData: [],
      //属性名称转换
      defaultProps: {
        children: "children",
        label: "title"
      },
      //组织结构树Loading
      listLoading: false,
      //添加组织结构dialog显示状态
      addFormVisible: false,
      //添加按钮Loading加载
      addLoading: false,
      depart_info:[],
      user_info:[],
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      rules:  {

      }
    };
  },
  mounted() {
    this.getResult();
    this.departList();
    this.userList();
  },
  methods: {
    //获取组织结构信息
    // 规则数组
    getResult: function() {
      var _this = this;
      this.listLoading = true;
      let param = Object.assign({}, {});
      apis.msgApi.permissList(param)
        .then((data)=>{
          if( data.data.error_code == 1000){
            this.$message({message: '权限不足！请联系管理员',type: "error"});
          }else{
              console.log(data);
              _this.treeData = data.data;
              _this.listLoading = false;
          }


        })
        .catch((err)=>{
          this.$message({message: '执行失败，请重试',type: "error"});
          console.log(err)
        });
    },
    nodeClick(item) {
      let res = this.$refs.tree.getCheckedNodes()
      // let arr = []
      res.forEach((item) => {
        this.form2.rules.push(item.id);
        console.log(this.form2.rules);
      })

    },
    // 部门下拉菜单
    departList() {//初始化下拉框动态数据
        apis.msgApi.departList()
        .then((data)=>{
          // console.log(data)
            if(data&&data.data){
                var json=data.data;
                if(json&&data.status==200){
                  this.depart_info = data.data;
                }
            }

        })
        .catch((err)=>{
          this.$message({message: '执行失败，请重试',type: "error"});
        console.log(err)
        });
    },
    // 分组下拉菜单
    userList() {//初始化下拉框动态数据
        apis.msgApi.userList()
        .then((data)=>{
          // console.log(data)
            if(data&&data.data){
                var json=data.data;
                if(json&&data.status==200){
                  this.user_info = data.data;
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
            debugger
            apis.msgApi.userAdd(param)
            .then((data)=>{
              console.log(data)
                if(data&&data.data){
                    var json=data.data;
                     if(json&&json.msg == 'ok'){
                        this.$message({message: '执行成功',type: "success"});
                        this.$router.push({ path: '/user_list' })
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
