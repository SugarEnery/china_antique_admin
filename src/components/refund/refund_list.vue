<template>
    <div class="container resund_list">
        <!-- 查询区----start -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="是否股票" prop="is_shares">
               <el-select v-model="formSearch.is_shares" placeholder="是否股票">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label=" " style="margin-left:50px;">
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button type="warning" plain @click="onReset">重置</el-button>
            </el-form-item> -->
        </el-form>
        <!-- 查询区----end -->
        <!-- 表格---start -->
        <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%;"  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="refund_id" label="id" width="50" align="center" sortable>
                 <template slot-scope="scope">
                    <a href="#" style="color: #00D1B2" @click="openDetail(scope.row)">{{ scope.row.refund_id}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="user_name" label="用户姓名" align="center" width="100">
              <template slot-scope="scope">
                  {{ scope.row.user_name == null? '暂无' :scope.row.user_name }}
              </template>
            </el-table-column>
            <el-table-column prop="user_tel" label="手机号" align="center" width="100">
            </el-table-column>
            <el-table-column prop="type_id" label="类型" align="center" width="100">
            </el-table-column>
            <el-table-column prop="refund_type" label="退款类型" align="center" width="100">
              <template slot-scope="scope">
                  {{ scope.row.refund_type == ""? '暂无' :scope.row.refund_type }}
              </template>
            </el-table-column>
            <el-table-column prop="refund_addtime" label="退款时间" align="center" width="100">
            </el-table-column>
            <el-table-column prop="refund_status" label="审核状态" align="center" width="100">
              <template slot-scope="scope">
                  {{ scope.row.refund_status == 1? '未查看' :'已查看' }}
              </template>
            </el-table-column>
            <el-table-column prop="user_id" label="用户id" align="center" width="100">
            </el-table-column>

            <el-table-column prop="refund_deal" label="跟踪类型" align="center" width="200" height="150" >
              <template slot-scope="scope">
                  {{ scope.row.refund_deal == null? '暂无' :scope.row.refund_deal == 1?"已退款":scope.row.refund_deal == 2?"继续合作":'' }}
              </template>
            </el-table-column>
            <el-table-column prop="refund_remark" label="退款备注" align="center" width="200" height="150" >
              <template slot-scope="scope">
                  {{ scope.row.refund_remark == null? '暂无' :scope.row.refund_remark }}
              </template>
            </el-table-column>
            <el-table-column prop="refund_suggest" label="退款内容" align="center" width="50">
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="230">
                <template slot-scope="scope">
                    <el-button size="mini" plain type="danger" @click="handleDelete(scope.$index, scope.row)">查看</el-button>
                    <a href="#" style="color: #00D1B2" @click="auditEdit(scope.row)"><el-button size="mini" >审核修改</el-button></a>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
        <!-- 表格---end -->

        <!-- 编辑弹框---start -->
        <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="700px" @close="closeDialog('formEdit')">
            <el-form :label-position="labelPosition" :label-width="labelWidth" :rules="rulesEdit" :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
                <el-form-item label="消息id" prop="id">
                    <el-input v-model="formEdit.id" placeholder="分享" disabled></el-input>
                </el-form-item>
                <el-form-item label="股票状态" prop="shares_status">
                   <el-select v-model="formEdit.shares_status" placeholder="是否股票">
                    <el-option label="持股" :value="0"></el-option>
                    <el-option label="获利" :value="1"></el-option>
                    <el-option label="止损" :value="2"></el-option>
                    <el-option label="调仓" :value="3"></el-option>
                   </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEdittVisible = false">取 消</el-button>
                <el-button v-if="!formEditDisabled" type="primary" @click="handleSave">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑弹框-end -->

    </div>
</template>

<style lang="scss">

.resund_list{
    // 设置输入框的宽度
    .el-form-item__content {
        width: 220px;
    }
    .el-table .cell{
      height: 60px;
    }
}

</style>

<script>
import apis from '../../apis/apis';
export default {
    name: 'resund_list',
    data() {
        return {
            listLoading : false,//
            pageInfo: { //分页
                currentPage: 1,
                pageSize: 20,//每页显示数据
                pageTotal: 80,
            },
            formSearch: { //表单查询
                name: '',
                refund_deal: '',
                refund_status: '',
                wx_id: '',
            },
            formEdit: { //表单编辑
                id:'',
                shares_status:'',
                name:''
            },
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
            apis.msgApi.refundList(param)
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
        // stockState
         /**
         * 修改股票状态
         */
        update() {
            this.$refs["formEdit"].validate(valid => {
                if(valid){
                    let param = Object.assign({}, this.formEdit);
                    apis.msgApi.stockState(param)
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
         * 查看状态
         */
        handleDelete(index, rowData) {
             if(rowData.name=='使用文档'){
                this.$message('使用文档不可删除');
                return;
            }
            var refund_id= rowData.refund_id;
            this.$confirm('此操作将查看, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    apis.msgApi.refundSee({refund_id:refund_id})
                    .then((data)=>{
                      console.log(data)
                      if(data.data.error_code == 0){
                          this.$message({message: '执行成功',type: "success"});
                          this.onSearch();
                      }

                    })
                    .catch((err)=>{
                        // debugger;
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
         * 打开消息详情
         */
        messageDetail(row){
            this.$router.push({ name: 'message_detail', query:row})
            // this.$common.OpenNewPage(this,'message_detail',row);
        },
        // 审核结果修改
        auditEdit(row){
            this.$router.push({ name: 'audit_edit', query:row})
        },

    }
};
</script>
