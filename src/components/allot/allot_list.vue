<template>
    <div class="container messageboard">
        <!-- 查询区----start -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
            <el-form-item label="搜索手机" prop="user_tel">
                <el-input v-model="formSearch.user_tel" placeholder="搜索手机号"></el-input>
            </el-form-item>
            <el-form-item label="搜索名字" prop="user_name">
                <el-input v-model="formSearch.user_name" placeholder="搜索名字"></el-input>
            </el-form-item>
            <el-form-item label=" " style="margin-left:50px;">
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button type="warning" plain @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 查询区----end -->
        <!-- 操作区----start -->
        <el-row class="mgb15">
        </el-row>
        <!-- 操作区----end -->
        <!-- 表格---start -->
        <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="id" label="id" width="50" align="center" sortable>
                 <template slot-scope="scope">
                    <a href="javacript:;" style="color: #00D1B2" @click="openDetail(scope.row)">{{ scope.row.id}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="user_id" label="用户id" align="center" >
            </el-table-column>
            <el-table-column prop="admin_id" label="账号id" align="center" >
            </el-table-column>
            <el-table-column prop="wx_nickname" label="昵称" align="center">
            </el-table-column>

            <el-table-column prop="user_tel" label="手机" align="center" width="120px">
            </el-table-column>

            <el-table-column prop="user_name" label="姓名" align="center" >
            </el-table-column>
            <el-table-column prop="user_remark" label="备注" align="center" >
              <template slot-scope="scope">
                {{ scope.row.user_remark == null? '暂无' :scope.row.user_remark }}
              </template>
            </el-table-column>
            <el-table-column prop="user_status" label="状态" align="center" >
              <template slot-scope="scope">
                {{ scope.row.user_status == 0? '未关注' :'关注' }}
              </template>
            </el-table-column>
            <el-table-column prop="register_time" label="注册时间" align="center" >
            </el-table-column>
            <el-table-column prop="user_server_people" label="服务 " align="center" >
            </el-table-column>
            <el-table-column prop="user_develop_people" label="开发" align="center" >
            </el-table-column>


            <el-table-column label="操作" fixed="right" min-width="230">
                <template slot-scope="scope">
                    <a href="javacript:;" style="color: #00D1B2" @click="AdjustAdd(scope.row)"><el-button size="mini" >调整分配</el-button></a>
                    <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
                    <el-button size="mini" plain type="danger" @click="handleDelete(scope.$index, scope.row)">释放</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.page" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[10]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
        <!-- 表格---end -->
        <!-- 编辑弹框---start -->
        <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="700px" @close="closeDialog('formEdit')">
            <el-form :label-position="labelPosition" :label-width="labelWidth" :rules="rulesEdit" :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
                 <el-form-item label="id" prop="id">
                    <el-input v-model="formEdit.id" placeholder="ID" ></el-input>
                </el-form-item>

                <el-form-item label="备注" prop="user_remark">
                    <el-input v-model="formEdit.user_remark" placeholder="备注"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type_id">
                  <el-select v-model="formEdit.type_id"  placeholder="请选择类型">
                      <el-option v-for="item in type_info" :key="item.type_id" :lable="item.type_id" :value="item.type_id" >{{item.type_name}}</el-option>
                  </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEdittVisible = false">取 消</el-button>
                <el-button v-if="!formEditDisabled" type="primary" @click="handleSave">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑弹框---end -->

    </div>
</template>

<style lang="scss">
.messageboard{
    // 设置输入框的宽度
    .el-form-item__content {
        width: 220px;
    }
}

</style>

<script>
import apis from '../../apis/apis';
export default {
    name: 'messageboard',
    data() {
        return {
            listLoading : false,//
            personInfo:this.$route.query,
            pageInfo: { //分页
                page: 1,
                pageSize: 10,//每页显示数据
                pageTotal: 80,
            },
            formSearch: { //表单查询
                name: '',
                admin_name: '',
                admin_names: '',
                admin_id:'',
                user_tel:'',
                user_name:''
            },
            formEdit: { //表单编辑
                id:'',
                name: '',
                type_id:'',
                user_remark:'',
            },
            type_info:[],//用户类型
            rulesEdit:  {

            },
            formEditTitle:'编辑',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogEdittVisible: false,  //编辑弹框显示
            dialogType:'',//弹框类型：add,edit,show
            tableData: [], //表单列表
            labelPosition: 'right', //lable对齐方式
            labelWidth: '100px', //lable宽度
            formLabelWidth: '120px',
            multipleSelection: []
        };
    },
    mounted(){
      // this.getSourceList();
      this.onSearch();
      this.selectRoleList();
        var loginLog = {
            ip: returnCitySN["cip"],
            city: returnCitySN["cname"] + "-增删改查页"
        };

        // getSourceList.sourceApi.getSourceList(getSourceList);
    },
    methods: {
        /**
         * 查询列表
         */
        onSearch(){
            this.listLoading=true;

            if(this.formSearch.createtime){
                this.formSearch.startdate=this.formSearch.createtime[0];
                this.formSearch.enddate=this.formSearch.createtime[1];
            }
            this.formSearch.admin_id = this.personInfo.admin_id;
            let param = Object.assign({}, this.formSearch,this.pageInfo);
            // console.log(admin_id)
            var _this = this;
            apis.msgApi.allotList(param)
            .then((data)=>{
              console.log(data.data)
                this.listLoading=false;
                if (data && data.data) {
                    function getUserRules(data){//创建方法
                      var cs=new Array//声明存储数组
                      if(data){//判断是否传进有效数组
                        for(let i=0;i<data.length;i++){//循环传进来数组
                          cs.push(data[i])//声明的数组push传进来的每一项
                          if(data[i].user !==null ){//判断当前项下面是否有source
                            cs[i].user_id=data[i].user.id//user_id用户的id
                            cs[i].wx_nickname=data[i].user.wx_nickname;
                            cs[i].user_name=data[i].user.user_name;
                            cs[i].user_tel=data[i].user.user_tel;
                            cs[i].user_remark=data[i].user.user_remark;

                            cs[i].register_time=data[i].user.register_time;
                            cs[i].user_status=data[i].user.user_status;
                            cs[i].user_server_people=data[i].user.user_server_people;
                            cs[i].user_develop_people=data[i].user.user_develop_people;




                          }
                        }
                        return cs;
                        // console.log(cs)
                      }
                    }
                    var a=getUserRules(data.data.data);
                    // console.log(a);
                        var json = data.data.data;
                        if ( data.status == 200) {
                          this.pageInfo.pageTotal=data.data.total;
                          _this.tableData = a;
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
        // 用户类型
        selectRoleList() {//初始化下拉框动态数据
            let param = 1;
            apis.msgApi.userTyle(param)
            .then((data)=>{
              // console.log(data);
                if(data&&data.data){
                    var json=data.data;
                    if(json&&data.status==200){
                      this.type_info = data.data;
                      // return type_info;
                    }
                }

            })
            .catch((err)=>{
              this.$message({message: '执行失败，请重试',type: "error"});
            console.log(err)
            });
        },
        handleSave(){
            if(this.dialogType=='add'){

                this.save();
            }
            else if(this.dialogType=='edit'){
                this.update();

            }
            else{
                this.$message({message: '操作异常',type: "error"});
            }
        },
        /**
         * 保存
         */
        save() {
            this.$refs["formEdit"].validate(valid => {
                if(valid){
                    let param = Object.assign({}, this.formEdit);
                    apis.msgApi.userAdd(param)
                    .then((data)=>{
                        if(data&&data.data){
                            var json=data.data;
                             if(json&&data.status==200){
                                this.$message({message: '执行成功',type: "success"});
                                this.dialogEdittVisible = false;
                                this.onSearch();
                                return;
                            }
                        }
                       this.$message({message: '执行失败，请重试',type: "error"});
                    })
                    .catch((err)=>{
                        this.$message({message: '执行失败，请重试',type: "error"});
                    });
                }


            });
        },
         /**
         * 更新
         */
        update() {
            this.$refs["formEdit"].validate(valid => {
                if(valid){
                    let param = Object.assign({}, this.formEdit);
                    apis.msgApi.userEdit(param)
                    .then((data)=>{
                      // console.log(data);
                        if(data&&data.data){
                            var json=data.data;
                            if(json&&data.status== 200 ){
                                this.$message({message: '执行成功',type: "success"});
                                this.dialogEdittVisible = false;
                                this.onSearch();
                                return;
                            }
                        }
                       this.$message({message: '执行失败，请重试',type: "error"});
                    })
                    .catch((err)=>{
                      console.log(err);
                        // this.$message({message: '执行失败，请重试',type: "error"});
                    });
                }


            });
        },
         /**
         * 释放
         */
        handleDelete(index, rowData) {
             if(rowData.name=='使用文档'){
                this.$message('使用文档不可删除');
                return;
            }
            var user_id=rowData.user_id;
            var name
            name=localStorage.getItem("name");
            this.$confirm('此操作将释放, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    apis.msgApi.release({user_id:user_id,name:name})
                    .then((data)=>{
                      console.log(data)
                        this.$message({message: '执行成功',type: "success"});
                        this.onSearch();
                    })
                    .catch((err)=>{
                        this.$message({message: '执行失败，请重试',type: "error"});
                    });

            }).catch(() => {
                this.$message({type: 'info',message: '已取消删除'});
            });

        },
        /**
         * 批量删除
         */
        deleteMany() {
            var ids= this.multipleSelection.map(item => item.id);
            if(ids.length==0){
                 this.$message({message: '请选择要删除的项',type: "warn"});
                return;
            }
            this.$confirm('此操作将批量永久删除文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        apis.msgApi.deleteBatch({ids:ids})
                        .then((data)=>{
                            this.$common.isSuccess(data,()=>{
                                debugger;
                                this.onSearch();
                            });
                        })
                        .catch((err)=>{
                            debugger;
                            this.$message({message: '执行失败，请重试',type: "error"});
                        });

                }).catch(() => {
                    this.$message({type: 'info',message: '已取消删除'});
                });

        },
        onReset(){
            this.$refs['formSearch'].resetFields();
            this.onSearch();
        },
        /**
         * 打开编辑弹窗
         */
        handleAdd() {
            this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                this.dialogType='add';
                this.formEditTitle='新增';
                this.formEditDisabled=false;
            });


        },
        /**
         * 打开编辑弹窗
         */
        handleEdit(index, rowData) {
            //var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
            //this.$message({message: msg,type: "success"});
            this.dialogEdittVisible = true;//等dom渲染完，读取data中初始值，然后再复制，这样重置的是data中初始值
            this.$nextTick(()=>{
                this.dialogType='edit';
                this.formEditTitle='编辑';
                this.formEditDisabled=false;
                this.formEdit= Object.assign({}, rowData);
                this.formEdit.gender+='';//必须转换成字符串才能回显
            });
        },
        /**
         * 打开详情页
         */
        handleDetail(index,rowData){
            this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                this.dialogType='show';
                this.formEditTitle='详情';
                this.formEditDisabled=true;
                this.formEdit= Object.assign({}, rowData) ;
                this.formEdit.gender+='';
            });

        },
        /**
         * 关闭弹框，数据重置
         */
        closeDialog(formName){
            this.$refs[formName].resetFields();
        },
        /**
         * 分页大小切换
         */
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.onSearch();
        },
        /**
         * 分页切换
         */
        handleCurrentChange(val) {
            this.pageInfo.page = val;
            this.onSearch();
        },
        /**
         * 点击选择
         */
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // this.$message({
            //     message: '选中的项是:' + JSON.stringify(this.multipleSelection),
            //     type: "success"
            // });
        },
        /**
         * 打开详情页
         */
        openDetail(row){
            this.$common.OpenNewPage(this,'detail',row);
        },
        AdjustAdd(row){
          this.$router.push({ name: 'adjust_add', query:row})
        }


    }
};
</script>
