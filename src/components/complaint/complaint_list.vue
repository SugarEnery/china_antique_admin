<template>
    <div class="container messageboard">
        <!-- 查询区----start -->
        <!-- <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
          <el-form-item label="查看状态" prop="question_status">
              <el-select v-model="formSearch.question_status" placeholder="选择查看状态">
                  <el-option label="未查看" value="1"></el-option>
                  <el-option label="已查看" value="2"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label=" " style="margin-left:50px;">
              <el-button type="primary" @click="onSearch">查询</el-button>
              <el-button type="warning" plain @click="onReset">重置</el-button>
          </el-form-item>
        </el-form> -->
        <!-- 查询区----end -->
        <!-- 操作区----start -->
        <el-row class="mgb15">
        </el-row>
        <!-- 操作区----end -->
        <!-- 表格---start -->
        <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="question_id" label="id" width="100" align="center" sortable>
                <!-- <template slot-scope="scope">
                    <a href="javacript:;" style="color: #00D1B2" @click="openDetail(scope.row)">{{ scope.row.question_id}}</a>
                </template> -->
            </el-table-column>
            <el-table-column prop="user_id" label="用户" align="center" width="100">
            </el-table-column>
            <el-table-column prop="question_content" label="问题内容" align="center" width="100">
            </el-table-column>
            <el-table-column prop="question_type" label="投诉类型" align="center" width="100">
            </el-table-column>
            <el-table-column prop="question_status" label="问题状态" align="center" width="100">
              <template slot-scope="scope">
                {{ scope.row.question_status == 1 ? '未查看' : scope.row.question_status == 2 ?'已查看': '' }}
              </template>
            </el-table-column>
            <el-table-column prop="user_tel" label="用户电话" align="center" width="100">
            </el-table-column>
            <el-table-column prop="type_id" label="类型id" align="center" width="100">
            </el-table-column>
            <el-table-column prop="question_addtime" label="创建日期" :formatter="this.$common.question_addtime" width="150" sortable>
            </el-table-column>

            <el-table-column label="操作" fixed="right" min-width="230">
                <template slot-scope="scope">
                    <el-button size="mini" plain type="primary" @click="handleDetail(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
        <!-- 表格---end -->
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
            pageInfo: { //分页
                currentPage: 1,
                pageSize: 5,
                pageTotal: 80
            },
            formSearch: { //表单查询
                question_status: '',
                name:'',
            },
            formEdit: { //表单编辑
                id:'',
                title: '',
                status:'',
                wx_id:'',
                create_time:'',
            },
             rulesEdit:  {
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" },
                    { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
                ],
                city:[{ required: true, message: "请输入城市", trigger: "blur" }]
                ,
                type: [{ required: true, message: "请选择类别", trigger: "change" }],
                gender: [{ required: true, message: "请选择性别", trigger: "change" }]
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
            console.log(param)
            var _this = this;
            apis.msgApi.complaintList(param)
            .then((data)=>{
              console.log(data)
                this.listLoading=false;
                if (data && data.data) {
                        var json = data.data.data;
                        if ( data.status == 200) {
                          _this.tableData.question_status = json.question_status == 1?'未查看':'已查看';
                          _this.pageInfo.pageTotal=data.data.total;
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
         * 更新
         */
        update() {
            this.$refs["formEdit"].validate(valid => {
                if(valid){
                    let param = Object.assign({}, this.formEdit);
                    apis.msgApi.userEdit(param)
                    .then((data)=>{
                      console.log(data);
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
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    apis.msgApi.falshDelete({kx_id:kx_id})
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
          console.log(rowData);
          var param = rowData.question_id;
          apis.msgApi.complaintEdit(param)
          .then((data)=>{
            console.log(data);
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
            this.$common.OpenNewPage(this,'detail',row);
        }


    }
};
</script>
