<template>
    <div class="container messageboard">
        <!-- 表格---start -->
        <!-- {{personInfo}} -->
        <el-table :data="tableData" class="appropBox" v-loading="listLoading"  border stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="id" label="id" width="50" align="center" sortable>
                 <template slot-scope="scope">
                    <a href="javacript:;" style="color: #00D1B2" @click="openDetail(scope.row)">{{ scope.row.id}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="user_id" label="用户id" align="center" >
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" align="center">
            </el-table-column>

            <el-table-column prop="status" label="状态" align="center" >
            </el-table-column>

            <el-table-column prop="in_name" label="姓名" align="center" >
            </el-table-column>
            <!-- <el-table-column prop="in_address" label="地址" align="center" >
            </el-table-column> -->
            <el-table-column prop="in_idnumber" label="身份证" align="center" >
            </el-table-column>
            <el-table-column prop="in_time" label="时间" align="center" >
            </el-table-column>
            <el-table-column prop="autograph" label="亲笔签名" align="center"  min-width="150" height="100">
               <!-- 图片的显示 -->
               <template slot-scope="scope">
                  <img :src="'http://'+scope.row.autograph"  min-width="100" />
               </template>
            </el-table-column>

            <el-table-column prop="behind_photo" label="身份证" align="center"  min-width="160"  >
              <!-- 图片的显示 -->
              <template slot-scope="scope">
                <div class="one_reapet">
                  <el-popover placement="bottom" trigger="click">
                    <div v-if="scope.row.behind_photo === ''">暂无</div>
                    <div v-else-if="scope.row.behind_photo === scope.row.behind_photo">
                      <img :src="'http://'+scope.row.behind_photo"  min-width="160"height="500px"/>
                    </div>
                    <div slot="reference" v-if="scope.row.behind_photo === ''">暂无</div>
                    <div slot="reference" v-else-if="scope.row.behind_photo === scope.row.behind_photo" style="cursor:pointer" >
                      <img  :src="'http://'+scope.row.behind_photo"  />
                    </div>
                    <!-- <img :src="'http://'+scope.row.behind_photo" /> -->
                  </el-popover>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="front_photo" label="身份证" align="center"  min-width="160"  >
              <!-- 图片的显示 -->
              <template slot-scope="scope">
                <div class="one_reapet">
                  <el-popover placement="bottom" trigger="click">
                    <div v-if="scope.row.front_photo === ''">暂无</div>
                    <div v-else-if="scope.row.front_photo === scope.row.front_photo">
                      <img :src="'http://'+scope.row.front_photo"  min-width="160"height="500px"/>
                    </div>
                    <div slot="reference" v-if="scope.row.front_photo === ''">暂无</div>
                    <div slot="reference" v-else-if="scope.row.front_photo === scope.row.front_photo" style="cursor:pointer" >
                      <img  :src="'http://'+scope.row.front_photo"  />
                    </div>
                  </el-popover>
                </div>
              </template>
            </el-table-column>
            <!-- 图片的显示 -->
            <!-- <el-table-column prop="photo" label="自拍" align="center" min-width="160" >
              <template slot-scope="scope">
                 <img :src="'http://'+scope.row.photo"  width="150" />
              </template>
            </el-table-column> -->
            <el-table-column prop="photo_time" label="拍照时间" align="center"  width="100">
            </el-table-column>
            <el-table-column prop="question_count" label="问卷分数" align="center" >
            </el-table-column>
            <el-table-column prop="user_score" label="问卷结果" align="center" >
            </el-table-column>
            <el-table-column prop="question_time" label="问题时间" align="center" >
            </el-table-column>
            <el-table-column prop="autograph_time" label="签名时间" align="center" >
            </el-table-column>
            <el-table-column prop="confirmation_time" label="确认时间" align="center" >
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="230">
                <template slot-scope="scope">
                  <a href="#" style="color: #00D1B2" @click="contractDetail(scope.row)"><el-button size="mini" >服务合同</el-button></a>
                  <a href="#" style="color: #00D1B2" @click="resultDetail(scope.row)"><el-button size="mini" >结果告知书</el-button></a>
                  <a href="#" style="color: #00D1B2" @click="questionDetail(scope.row)"><el-button size="mini" >评估问卷</el-button></a>
                  <el-button size="mini" plain type="danger" @click="handleEdit(scope.$index, scope.row)">重置</el-button>
                    <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button size="mini" plain type="danger" @click="handleDelete(scope.$index, scope.row)">释放</el-button> -->
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
                    <!-- <el-option label="5" value="5">完成</el-option> -->
                   </el-select>
                   0开始2问题3类型4签名5完成
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
.appropBox{
    .el-table__header tr,
      .el-table__header th {
        padding: 0;
        height: 40px;
    }
    .el-table__body tr,
      .el-table__body td {
        padding: 0;
        height: 300px;
    }
    .cell img{
      margin: 0;
      padding: 0;
      height: 100px;
      width: 100%;
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
                currentPage: 1,
                pageSize: 20,//每页显示数据
                pageTotal: 80,
            },
            formSearch: { //表单查询
                name: '',
                user_tel: '',
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
            labelWidth: '80px', //lable宽度
            formLabelWidth: '120px',
            multipleSelection: []
        };
    },
    mounted(){
      // this.getSourceList();
      this.onSearch();
      this.getParams();
      this.selectRoleList();
        var loginLog = {
            ip: returnCitySN["cip"],
            city: returnCitySN["cname"] + "-增删改查页"
        };

        // getSourceList.sourceApi.getSourceList(getSourceList);
    },
    methods: {
      getParams() {
          // 取到路由带过来的参数
          const routerParams = this.personInfo
          // this.mallCode = routerParams;
          console.log(routerParams);
          // 将数据放在当前组件的数据内
          this.tableData.user_tel = this.personInfo.user_tel;


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
            // let param = Object.assign({}, this.formSearch,this.pageInfo);
            let user_tel = this.personInfo.user_tel;
            console.log(user_tel)
            var _this = this;
            apis.msgApi.appropList({user_tel:user_tel})
            .then((data)=>{
              console.log(data.data)
                this.listLoading=false;
                if (data && data.data) {
                    // function getUserRules(data){//创建方法
                    //   var cs=new Array//声明存储数组
                    //   if(data){//判断是否传进有效数组
                    //     for(let i=0;i<data.length;i++){//循环传进来数组
                    //       cs.push(data[i])//声明的数组push传进来的每一项
                    //       if(data[i].user !==null ){//判断当前项下面是否有source
                    //         cs[i].user_id=data[i].user.id//user_id用户的id
                    //         cs[i].wx_nickname=data[i].user.wx_nickname;
                    //         cs[i].user_name=data[i].user.user_name;
                    //         cs[i].user_tel=data[i].user.user_tel;
                    //         cs[i].user_remark=data[i].user.user_remark;

                    //         cs[i].register_time=data[i].user.register_time;
                    //         cs[i].user_status=data[i].user.user_status;
                    //         cs[i].user_server_people=data[i].user.user_server_people;
                    //         cs[i].user_develop_people=data[i].user.user_develop_people;




                    //       }
                    //     }
                    //     return cs;
                    //     console.log(cs)
                    //   }
                    // }
                    // var a=getUserRules(data.data.data);
                    // console.log(a);
                        var json = data.data
                        if ( data.status == 200) {
                          this.pageInfo.pageTotal=data.data.total;
                          _this.tableData = data.data.data;
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
        // 服务合同
        contractDetail(row){
          this.$router.push({ name: 'contract_detail', query:row})
        },
        // 结果告知书
        resultDetail(row){
          this.$router.push({ name: 'result_detail', query:row})
        },
        // 评估问卷
        questionDetail(row){
          this.$router.push({ name: 'question_detail', query:row})
        }




    }
};
</script>
