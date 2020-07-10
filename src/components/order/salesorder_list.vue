<template>
    <div class="container messageboard">

        <!-- 查询区----start -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
            <el-form-item label="产品" >
              <el-select v-model="formSearch.product_id" placeholder="请选择产品">
                 <el-option v-for="item in products"  :label="item.product_name" :key="item.id" :value="item.id" >
                  {{item.product_name}}
                 </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号" prop="user_tel">
                <el-input v-model="formSearch.user_tel" placeholder="请输入用户手机号"></el-input>
            </el-form-item>
            <el-form-item label="订单号" prop="order_ch">
                <el-input v-model="formSearch.order_ch" placeholder="请输入ping++订单号"></el-input>
            </el-form-item>
            <el-form-item label="服务类型" prop="service_type">
               <el-select v-model="formSearch.service_type" placeholder="请选择服务类型">
                  <el-option label="包月" value="1"></el-option>
                  <el-option label="按次" value="2"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="来源" prop="order_type">
               <el-select v-model="formSearch.order_type" placeholder="请选择来源">
                  <el-option label="支付" value="1"></el-option>
                  <el-option label="后台添加" value="2"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="支付状态" prop="pay_status">
               <el-select v-model="formSearch.pay_status" placeholder="请选择支付状态">
                  <el-option label="未支付" value="0"></el-option>
                  <el-option label="已支付" value="1"></el-option>
               </el-select>
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
            <el-table-column prop="id" label="订单id" width="50" align="center" sortable>
                 <!-- <template slot-scope="scope">
                    <a href="javacript:;" style="color: #00D1B2" @click="openDetail(scope.row)">{{ scope.row.id}}</a>
                </template> -->
            </el-table-column>
            <el-table-column prop="order_no" label="订单号" align="center" width="100">
            </el-table-column>
            <el-table-column prop="order_ch" label="ping++订单号" align="center" width="100">
            </el-table-column>
            <el-table-column prop="amount" label="支付金额" align="center" width="100">
            </el-table-column>
            <el-table-column prop="user_name" label="用户姓名" align="center" width="50">
              <template slot-scope="scope">
                 {{ scope.row.user_name == null? '暂无' :scope.row.user_name }}
              </template>
            </el-table-column>
            <el-table-column prop="user_tel" label="用户电话" align="center" width="120">
            </el-table-column>
            <el-table-column prop="subject" label="产品名称" align="center" width="100">
            </el-table-column>
            <el-table-column prop="type_id" label="用户类型" align="center" width="50">
            </el-table-column>
            <el-table-column prop="service_type" label="服务类型" align="center" width="50">
            </el-table-column>
            <el-table-column prop="number" label="总次数" align="center" width="50">
            </el-table-column>
            <el-table-column prop="order_num" label="剩余次数" align="center" width="50">
              <template slot-scope="scope">
                 {{ scope.row.order_num == null? '暂无' :scope.row.order_num }}
              </template>
            </el-table-column>

            <el-table-column prop="pay_status" label="支付状态" align="center" width="100">
              <template slot-scope="scope">
                <font v-if="scope.row.pay_status === '未支付'" color="green">未支付</font>
                <font v-else-if="scope.row.pay_status ==='已支付'" color="#999999" >已支付</font>
              </template>
            </el-table-column>
            <el-table-column prop="pay_time" label="支付时间" align="center" width="100">
            </el-table-column>
            <el-table-column prop="start_time" label="开始时间" align="center" width="100">
            </el-table-column>
            <el-table-column prop="end_time" label="结束时间" align="center" width="100">
            </el-table-column>

            <el-table-column prop="order_type" label="订单类型" align="center" width="50">
            </el-table-column>
            <el-table-column prop="add_time" label="添加时间" align="center" width="100">
            </el-table-column>

            <el-table-column prop="order_status" label="订单状态" align="center" width="100">
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="230">
                <template slot-scope="scope">
                    <a href="#" style="color: #00D1B2" @click="orderEdit(scope.row)"><el-button size="mini" >编辑</el-button></a>
<!--                    <el-button size="mini" plain type="danger" @click="handleEdit(scope.$index, scope.row)">重置</el-button> -->
                    <el-button size="mini" plain type="danger" @click="handleDelete(scope.$index, scope.row)">结束</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
        <!-- 表格---end -->

        <!-- 编辑弹框---start -->
        <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="700px" @close="closeDialog('formEdit')">
            <el-form :label-position="labelPosition" :label-width="labelWidth" :rules="rulesEdit" :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
                <el-form-item label="订单id" prop="id">
                    <el-input v-model="formEdit.id" placeholder="姓名" disabled=""></el-input>
                </el-form-item>
                <el-form-item label="合规状态" prop="status">
                   <el-select v-model="formEdit.status" placeholder="合规状态">

                    <el-option label="0" value="0">开始</el-option>
                    <el-option label="2" value="2">问题</el-option>
                    <el-option label="3" value="3">类型</el-option>
                    <el-option label="4" value="4">签名</el-option>

                   </el-select>
                   0开始2问题3类型4签名
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
            pageInfo: { //分页
                currentPage: 1,
                pageSize: 20,
                pageTotal: 80
            },
            products:[],
            formSearch: { //表单查询
                name:'',
                user_tel: '',
                service_type: '',
                order_type: '',
                product_id:'',
                order_ch:'',
                pay_status:''
            },
            formEdit: { //表单编辑
                id:'',
                states: '',
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
      this.productList();
      this.fengcdetail();
      // this.getSourceList();
      this.onSearch();
        var loginLog = {
            ip: returnCitySN["cip"],
            city: returnCitySN["cname"] + "-增删改查页"
        };

        // getSourceList.sourceApi.getSourceList(getSourceList);
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
      fengcdetail(){
        // 风测
          apis.msgApi.fengcdetail()
            .then((data)=>{
              console.log(data)
                if(data&&data.data){
                    var json=data.data;
                    if(json&&data.status==200){
                      this.fengcdetail = data.data;
                    }
                }

            })
            .catch((err)=>{
              this.$message({message: '执行失败，请重试',type: "error"});
              console.log(err)
            });
      },
        /**
         * 查询列表
         */
        onSearch(){
            this.listLoading=true;

            if(this.formSearch.createtime){
                this.formSearch.startdate=this.formSearch.createtime[0];
                this.formSearch.enddate=this.formSearch.createtime[1];
            }
            let params = Object.assign({}, this.formSearch,this.pageInfo);
            // var name
            // name=localStorage.getItem("name"); 
            var _this = this;
            apis.msgApi.salesorderList(params)
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
         * 修改
         */
        update() {
            this.$refs["formEdit"].validate(valid => {
                if(valid){
                    let param = Object.assign({}, this.formEdit);
                    apis.msgApi.fengcreset(param)
                    .then((data)=>{
                      console.log(data);
                        if(data&&data.data){
                            var json=data.data;
                            if(json&&json== 'ok' ){
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
         * 结束
         */
        handleDelete(index, rowData) {
             if(rowData.name=='使用文档'){
                this.$message('使用文档不可删除');
                return;
            }
            var id=rowData.id;
            this.$confirm('此操作将结束此订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    apis.msgApi.orderEnd({id:id})
                    .then((data)=>{
                      console.log(data)
                      this.$message({message: '执行成功',type: "success"});
                      this.onSearch();
                    })
                    .catch((err)=>{
                        debugger;
                        this.$message({message: '执行失败，请重试',type: "success"});
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
            this.$common.OpenNewPage(this,'detail',row);
        },
        // 订单修改
        orderEdit(row){
          this.$router.push({ name: 'order_edit', query:row})
          // this.$common.OpenNewPage(this,'message_edit',row);
        },

    }
};
</script>
