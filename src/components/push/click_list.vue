<template>
    <div class="container clicklist">
        <!-- 查询区----start -->
        <!-- {{personInfo}} -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
                </el-select>
            </el-form-item>
            <el-form-item label="查看类型" prop="click_type">
               <el-select v-model="formSearch.click_type" placeholder="查看类型">
                  <el-option label="交易时段" value="1"></el-option>
                  <el-option label="超时" value="2"></el-option>
                  <el-option label="失效" value="3"></el-option>
                  <el-option label="结束点击需要" value="4"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="手机号" prop="user_tel">
                <el-input v-model="formSearch.user_tel" placeholder="请输入用户手机号"></el-input>
            </el-form-item>
            <el-form-item label=" " style="margin-left:50px;">
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button @click="exportExcel()">导出</el-button>
                <el-button type="warning" plain @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 表格---start -->
        <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%" @selection-change="handleSelectionChange" id="out-table">
            <!-- <el-table-column type="selection" width="60">
            </el-table-column> -->
            <el-table-column prop="id" label="id" width="100" align="center" sortable>
                <!-- <template slot-scope="scope">
                    <a href="javacript:;" style="color: #00D1B2" @click="openDetail(scope.row)">{{ scope.row.id}}</a>
                </template> -->
            </el-table-column>
            <el-table-column prop="user_name" label="姓名" align="center" width="100">
              <template slot-scope="scope">
                 {{ scope.row.user_name == null? '暂无' :scope.row.user_name}}
              </template>
            </el-table-column>
            <el-table-column prop="user_tel" label="手机号" align="center" width="150">
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center" width="100">
            </el-table-column>

            <el-table-column prop="click_type" label="点击类型" align="center" width="150">
            </el-table-column>
            <el-table-column prop="type_id" label="用户类型" align="center" width="100">
            </el-table-column>
            <el-table-column prop="wx_nickname" label="昵称" align="center" width="100">
            </el-table-column>
            <el-table-column prop="user_server_people" label="服务人员" align="center" width="100">
              <template slot-scope="scope">
                 {{ scope.row.user_server_people == 0? '' :scope.row.user_server_people}}
              </template>
            </el-table-column>
            <el-table-column prop="user_develop_people" label="开发人员" align="center" width="100">
              <template slot-scope="scope">
                 {{ scope.row.user_develop_people == 0? '' :scope.row.user_develop_people}}
              </template>
            </el-table-column>
            <el-table-column prop="add_time" label="创建日期" :formatter="this.$common.timestampToTime" width="200" align="center" sortable>
            </el-table-column>
        </el-table>
        <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.page" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
        <!-- 表格---end -->

        <!-- 编辑弹框---start -->
        <!-- <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="700px" @close="closeDialog('formEdit')">
            <el-form :label-position="labelPosition" :label-width="labelWidth" :rules="rulesEdit" :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
                 <el-form-item label="id" prop="id">
                    <el-input v-model="formEdit.id" placeholder="姓名" ></el-input>
                </el-form-item>
                <el-form-item label="title" prop="title">
                    <el-input v-model="formEdit.title" placeholder="地址"></el-input>
                </el-form-item>

                 <el-form-item label="status" prop="status">
                    <el-input  v-model="formEdit.status" placeholder="年龄"></el-input>
                </el-form-item>

                <el-form-item label="wx_id" prop="wx_id">
                    <el-input v-model="formEdit.wx_id" placeholder="QQ号"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEdittVisible = false">取 消</el-button>
                <el-button v-if="!formEditDisabled" type="primary" @click="handleSave">确 定</el-button>
            </div>
        </el-dialog> -->

        <!-- 编辑弹框---end -->

    </div>
</template>

<style lang="scss">
.clicklist{
    // 设置输入框的宽度
    .el-form-item__content {
        // width: 220px;
    }
}

</style>

<script>
import apis from '../../apis/apis';
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
    name: 'clicklist',
    data() {
        return {
            personInfo:this.$route.query,
            listLoading : false,//
            pageInfo: { //分页
                page: 1,
                pageSize: 20,
                pageTotal: 80
            },
            formSearch: { //表单查询
                news_id: '',
                click_type:'',
                user_tel:'',
                is_leading:'',
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
            var news_id = this.personInfo.id;
            this.formSearch.news_id = this.personInfo.id
            let params = Object.assign({}, this.formSearch,this.pageInfo);
            var _this = this;
            apis.msgApi.pushclickList(params)
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
        // 导出用户
        exportExcel () {
            this.listLoading=true;
            this.formSearch.is_leading = '1';
            let params = Object.assign({}, this.formSearch,this.pageInfo);
            apis.msgApi.pushclickList(params)
            .then((data)=>{
              console.log(data);
              this.listLoading=false;
              if(data.data.error_code == 1000){
                this.$message({message: data.data.msg ,type: "error"});
              }else{
                this.tableData = data.data;
                setTimeout( function(){
                   let fix = document.querySelector('.el-table__fixed-right');
                    let wb;
                    //判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去
                    if(fix){
                      wb = XLSX.utils.table_to_book(document.querySelector('#out-table').removeChild(fix));
                      document.querySelector('#out-table').appendChild(fix);
                    }else{
                      wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
                    }
                    /* get binary string as output */
                    var wbout = XLSX.write(wb, {
                      bookType: 'xlsx',
                      bookSST: true,
                      type: 'array'
                    });
                    try {
                      FileSaver.saveAs(
                        new Blob([wbout], {
                          type: 'application/octet-stream'
                        }),
                        '点击列表.xlsx'
                      );
                    } catch (e) {
                      if (typeof console !== 'undefined') console.log(e, wbout);
                    }
                    return wbout;
                    this.$message({message: '导出成功',type: "success"});
                }, 1 * 500 );

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
                    apis.msgApi.userDelete({id:id})
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
        }


    }
};
</script>
