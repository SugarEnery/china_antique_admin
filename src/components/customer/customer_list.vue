<template>
    <div class="container messageboard">
        <!-- 操作区----start -->
        <el-row class="mgb15">
        </el-row>
        <!-- 操作区----end -->
        <!-- 表格---start -->
        <el-table :data="tableData" class="customerBox" v-loading="listLoading"  border stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="id" label="id" width="50" align="center" sortable>
                 <template slot-scope="scope">
                    <a href="javacript:;" style="color: #00D1B2" @click="openDetail(scope.row)">{{ scope.row.id}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="content" label="内容" align="center" width="200" height="150" >
            </el-table-column>
            <el-table-column prop="content_time" label="创建日期" :formatter="this.$common.content_time" width="150" sortable >
            </el-table-column>
        </el-table>
        <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
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
  .customerBox{
    .cell{
      max-height: 70px !important;
      overflow: auto !important;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE 10+ */
    
    }
    ::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
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
            name:localStorage.getItem("name"),
            listLoading : false,//
            pageInfo: { //分页
                currentPage: 1,
                pageSize: 20,//每页显示数据
                pageTotal: 80,
            },
            formSearch: { //表单查询
                name:'',

            },
            formEdit: { //表单编辑
                id:'',
                name: '',
                type_id:'',
                user_remark:'',
                user_name:'',
                user_server_people:'',
                user_develop_people:'',
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
            labelWidth: '80px', //lable宽度
            formLabelWidth: '120px',
            multipleSelection: []
        };
    },
    mounted(){
      // this.getSourceList();
      this.onSearch();
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
            let param = Object.assign({}, this.formSearch,this.pageInfo);
            var _this = this;
            apis.msgApi.customerList(param)
            .then((data)=>{
              console.log(data.data)
                this.listLoading=false;
                if (data && data.data) {
                        var json = data.data.data;
                        if ( data.status == 200) {
                          this.pageInfo.pageTotal=data.data.total;
                          _this.tableData = json;
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
         * 修改
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
         * 删除
         */
        handleDelete(index, rowData) {
             if(rowData.name=='使用文档'){
                this.$message('使用文档不可删除');
                return;
            }
            var id=rowData.id;
            var name
            name=localStorage.getItem("name");
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    apis.msgApi.clientdelete({id:id,name:name})
                    .then((data)=>{
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
            this.pageInfo.currentPage = val;
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
            // this.$common.OpenNewPage(this,'detail',row);
            this.$router.push({ name: 'detail', query:row})
        },
        // 持股==
        holdList(row){
            // this.$common.OpenNewPage(this,'hold_list',row);
            this.$router.push({ name: 'hold_list', query:row})
        },
        // 成功
        successList(row){
            // this.$common.OpenNewPage(this,'success_list',row);
            this.$router.push({ name: 'success_list', query:row})
        },
        // 失败
        errorList(row){
            // this.$common.OpenNewPage(this,'error_list',row);
            this.$router.push({ name: 'error_list', query:row})
        },
        //调仓
        wareList(row){
            // this.$common.OpenNewPage(this,'ware_list',row);
            this.$router.push({ name: 'ware_list', query:row})
        },
        // 申请次数
        applyNum(row){
            // this.$common.OpenNewPage(this,'apply_num',row);
            this.$router.push({ name: 'apply_num', query:row})
        },
        // 推送数
        pushNum(row){
            // this.$common.OpenNewPage(this,'push_num',row);
            this.$router.push({ name: 'push_num', query:row})
        },
        // 查看数
        seeNum(row){
            // this.$common.OpenNewPage(this,'see_num',row);
            this.$router.push({ name: 'see_num', query:row})
        },
        // 分配管理
        allotUser(row){
            // this.$common.OpenNewPage(this,'allot_user',row);
            this.$router.push({ name: 'allot_user', query:row})
        },
    }
};
</script>
