<template>
    <div class="container clients">
        <!-- 查询区----start -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">

            <el-form-item label="用户姓名" prop="user_name">
                <el-input v-model="formSearch.user_name" placeholder="请输入用户姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="user_tel">
                <el-input v-model="formSearch.user_tel" placeholder="请输入用户手机号"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="wx_nickname">
                <el-input v-model="formSearch.wx_nickname" placeholder="请输入用户昵称"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="user_remark">
                <el-input v-model="formSearch.user_remark" placeholder="请输入用户备注"></el-input>
            </el-form-item>
            <el-form-item label="用户类型" prop="type_id">
              <el-select v-model="user_info.type_name"  placeholder="请选择用户类型"   @change="userGet(user_info.type_name)"  >
                  <el-option
                  v-for="item in user_info"
                  :key="item.type_id"
                  :lable="item.type_name"
                  :value="item.type_name" >
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关注状态" prop="user_status">
               <el-select v-model="formSearch.user_status" placeholder="请选择关注状态">
                  <el-option label="未关注" value="0"></el-option>
                  <el-option label="关注" value="1"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="服务人员" prop="user_server_people">
                <el-input v-model="formSearch.user_server_people" placeholder="请输入服务人员"></el-input>
            </el-form-item>
            <el-form-item label="开发人员" prop="user_develop_people">
                <el-input v-model="formSearch.user_develop_people" placeholder="请输入开发人员"></el-input>
            </el-form-item>
            <!-- 销售部门组id57 58不显示 -->
            <el-form-item label="所属部门" prop="depart_id" v-if=" admingroup != 57 " else-if="admingroup != 58 ">
              <el-select v-model="depart_info.depart_name"  placeholder="所属部门"   @change="departGet(depart_info.depart_name)"  >
                  <el-option
                  v-for="item in depart_info"
                  :key="item.id"
                  :lable="item.depart_name"
                  :value="item.depart_name" >
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属人" prop="admin_names" v-if="admingroup != 57 " else-if="admingroup != 58 ">
                <el-input v-model="formSearch.admin_names" placeholder="请输入所属人"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="is_myself">
               <el-select v-model="formSearch.is_myself" placeholder="请选择查看">
                  <el-option label="查看个人用户" value="1"></el-option>
               </el-select>
            </el-form-item>

            <el-form-item label="时间类型" prop="time_type">
               <el-select v-model="formSearch.time_type" placeholder="请选择时间类型">
                  <el-option label="关注时间" value="1"></el-option>
                  <el-option label="注册时间" value="2"></el-option>
                  <el-option label="取关时间" value="3"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="开始时间" prop="start_time">
                <el-date-picker
                  v-model="formSearch.start_time"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="end_time">
                <el-date-picker
                  v-model="formSearch.end_time"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label=" " style="margin-left:50px;">
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button type="warning" plain @click="onReset">重置</el-button>
                <el-button @click="exportExcel()">导出</el-button>
                <el-button @click="exportundistributed()">导出未分配资源</el-button>
            </el-form-item>
            <!-- 接收到新用户在后台页面弹框提示给管理员 -->
            <template>
              <div class="notification sticky hide" id="sticky">
                  <p id="content"> </p>
                  <a class="close" href="javascript:">
                    <img src="../../../static/img/close.png" class="close_img" id="close_img"/>
                    </a>
              </div>
            </template>

        </el-form>
        <!-- 查询区----end -->
        <!-- 操作区----start -->
        <el-row class="mgb15">
        </el-row>
        <!-- 操作区----end -->
        <!-- 表格---start -->
        <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%;" @selection-change="handleSelectionChange" id="out-table">
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="id" label="id" width="100" align="center" sortable>
                <!-- <template slot-scope="scope">
                    <a href="javacript:;" style="color: #00D1B2" @click="openDetail(scope.row)">{{ scope.row.id}}</a>
                </template> -->
            </el-table-column>
            <el-table-column prop="register_time" label="注册时间" align="center" width="200" >
              <template slot-scope="scope">
                 {{ scope.row.register_time == ""? '暂无' :scope.row.register_time }}
              </template>
            </el-table-column>
            <el-table-column prop="user_name" label="姓名" align="center">
              <template slot-scope="scope">
                 {{ scope.row.user_name == null? '暂无' :scope.row.user_name }}
              </template>
            </el-table-column>
            <el-table-column prop="user_tel" label="手机" align="center" >
              <template slot-scope="scope">
                 {{ scope.row.user_tel == null? '暂无' :scope.row.user_tel }}
              </template>
            </el-table-column>
            <el-table-column prop="wx_nickname" label="昵称" align="center" >
            </el-table-column>
            <el-table-column prop="type_id" label="类型" align="center" >
            </el-table-column>
            <el-table-column prop="disdepart_name" label="所属部门" align="center" >
              <template slot-scope="scope">
                 {{ scope.row.disdepart_name == null? '暂无' :scope.row.disdepart_name }}
              </template>
            </el-table-column>
            <el-table-column prop="disadmin_names" label="所属人" align="center" >
              <template slot-scope="scope">
                 {{ scope.row.disadmin_names == null? '暂无' :scope.row.disadmin_names }}
              </template>
            </el-table-column>
            <el-table-column prop="user_develop_people" label="开发人员" align="center" >
              <template slot-scope="scope">
                 {{ scope.row.user_develop_people == 0? '暂无' :scope.row.user_develop_people }}
              </template>
            </el-table-column>

            <el-table-column prop="user_server_people" label="服务人员" align="center" >
              <template slot-scope="scope">
                 {{ scope.row.user_server_people == 0? '暂无' :scope.row.user_server_people }}
              </template>
            </el-table-column>
            <el-table-column prop="out_time" label="取关时间" align="center" >
              <template slot-scope="scope">
                <font v-if="scope.row.out_time == 0" >暂无</font>
                <font v-else color="green" >{{scope.row.out_time}}</font>
              </template>
            </el-table-column>
            <el-table-column prop="user_remark" label="备注" align="center" >
              <template slot-scope="scope">
                 {{ scope.row.user_remark == null? '暂无' :scope.row.user_remark }}
              </template>
            </el-table-column>
            <el-table-column prop="user_status" label="状态" align="center" >
              <template slot-scope="scope">
                 <font v-if="scope.row.add_time === '1970-01-01 08:00:00'" color="red">未关注</font>
                 <font v-else-if="scope.row.user_status === 0" color="green">取消关注</font>
                 <font v-else-if="scope.row.user_status ===1" >关注</font>
                 <!-- {{ scope.row.add_time == '1970-01-01 08:00:00'?'未关注':scope.row.user_status == 0?'取消关注':scope.row.user_status == 1?'关注':'' }} -->
              </template>
            </el-table-column>

            <el-table-column prop="experience_num" label="体验次数" align="center" v-if='name == "zhitougu"'>
            </el-table-column>
            <el-table-column prop="is_register_platform" label="其他平台" align="center" >
            </el-table-column>
            <el-table-column prop="other_platform" label=" 其他平台身份" align="center" >
            </el-table-column>

            <el-table-column prop="hold_num" label="持股" width="50" align="center">
                 <template slot-scope="scope">
                    <a href="#" style="color: #e7af4e" @click="holdList(scope.row,num)">{{ scope.row.hold_num}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="success_num" label="成功" width="50" align="center">
              <template slot-scope="scope">
                  <a href="#" style="color: red" @click="successList(scope.row)">{{ scope.row.success_num}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="error_num" label="失败" width="50" align="center">
              <template slot-scope="scope">
                  <a href="#" style="color: green" @click="errorList(scope.row)">{{ scope.row.error_num}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="ware_num" label="调仓" width="50" align="center">
                 <template slot-scope="scope">
                    <a href="#" style="color: #999999" @click="wareList(scope.row)">{{ scope.row.ware_num}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="push_num" label="推送数" width="50" align="center">
                 <template slot-scope="scope">
                    <a href="#" style="color: #00D1B2" @click="pushNum(scope.row)">{{ scope.row.push_num}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="see_num" label="查看数" width="50" align="center">
                 <template slot-scope="scope">
                    <a href="#" style="color: #00D1B2" @click="seeNum(scope.row)">{{ scope.row.see_num}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="resource_time" label="资源注册时间" align="center" width="150px" >
              <template slot-scope="scope">
                 {{ scope.row.resource_time == ""? '暂无' :scope.row.resource_time }}
              </template>
            </el-table-column>
            <el-table-column prop="account_time" label="开户时间" align="center" >
              <template slot-scope="scope">
                 {{ scope.row.account_time == ""? '暂无' :scope.row.account_time }}
              </template>
            </el-table-column>
            <el-table-column prop="birth_date" label="出生日期" align="center" width="100px" >
              <template slot-scope="scope">
                 {{ scope.row.birth_date == null? '暂无' :scope.row.birth_date }}
              </template>
            </el-table-column>
            <el-table-column prop="risk" label="风险偏好" align="center" >
              <template slot-scope="scope">
                 {{ scope.row.risk == null? '暂无' :scope.row.risk }}
              </template>
            </el-table-column>
            <el-table-column prop="funds" label="资金" align="center" >
              <template slot-scope="scope">
                 {{ scope.row.funds == null? '暂无' :scope.row.funds }}
              </template>
            </el-table-column>
            <el-table-column prop="resource_remark" label="资源备注" align="center" >
              <template slot-scope="scope">
                 {{ scope.row.resource_remark == null? '暂无' :scope.row.resource_remark }}
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="230">
                <template slot-scope="scope" >
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <!-- 接口删除 -->
                    <el-button size="mini" plain type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					<a href="#" style="color: #00D1B2" @click="appropriateness(scope.row)"><el-button size="mini" >适当性</el-button></a>
                    <a href="#" style="color: #00D1B2" @click="applyNum(scope.row)" v-if='name == "zhitougu"'><el-button size="mini" >申请</el-button></a>
                    <a href="#" style="color: #00D1B2" @click="allotUser(scope.row)" ><el-button size="mini" >分配</el-button></a>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.page" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[20]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
        <!-- 表格---end -->
        <!-- 编辑弹框---start -->
        <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="700px" @close="closeDialog('formEdit')">
            <el-form :label-position="labelPosition" :label-width="labelWidth" :rules="rulesEdit" :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
                 <el-form-item label="id" prop="id">
                    <el-input v-model="formEdit.id" placeholder="ID" disabled=""></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" prop="user_name">
                    <el-input v-model="formEdit.user_name" placeholder="用户姓名" ></el-input>
                </el-form-item>
                <el-form-item label="服务人员" prop="user_server_people">
                    <el-input v-model="formEdit.user_server_people" placeholder="服务人员" ></el-input>
                </el-form-item>
                <el-form-item label="开发人员" prop="user_develop_people">
                  <el-input v-model="formEdit.user_develop_people" placeholder="开发人员" ></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="user_remark">
                    <el-input v-model="formEdit.user_remark" placeholder="备注"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type_id">
                  <el-select v-model="type_info.type_name"  placeholder="请选择类型"   @change="typeGet(type_info.type_name)"  >
                      <el-option
                      v-for="item in type_info"
                      :key="item.type_id"
                      :lable="item.type_name"
                      :value="item.type_name" >
                      </el-option>
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
.clients{
    // 设置输入框的宽度
    .el-form-item__content {
        // width: 240px;
    }

}
.sticky p, .floated p, .fixed p, .ondemand p{
  float:left; padding:0px; margin:0px; margin-left:10px; line-height:45px; color:#fff; font-size:12px;}
	.sticky a, .floated a, .fixed a, .ondemand a{ float:right; margin:13px 10px 0px 0px; }
	img{border:0px;}
  #sticky{
    display: none;
  }
  .sticky {

  	position:fixed;
  	margin-bottom: 10px;
  	top:7rem;
  	right:0;
  	z-index:1000;
  	width:15%;
  	/* border-bottom:3px solid #fff !important; */
  	background: #2D8CF0; /* Old browsers */
  	// background: -moz-linear-gradient(top, #2D8CF0 0%, #2D8CF0 100%); /* FF3.6+ */
  	/* FireFox 3.6 */
  	/* Safari4+, Chrome */
  	// -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#2D8CF0', endColorstr='#2D8CF0')";
  	// -pie-background: linear-gradient(#2D8CF0, #2D8CF0 100%);
  	// behavior: url(PIE.htc);
  	// -moz-box-shadow: 1px 1px 7px #676767;
  	// -webkit-box-shadow: 1px 1px 7px #676767;
  	/* box-shadow: 1px 1px 7px #676767; */
  	height: 45px;
  	// background-image: -webkit-gradient(linear,left bottom,left top,color-stop(0, #2D8CF0),color-stop(1, #2D8CF0));/* IE6,IE7 */
  	/* IE8 */
  	/* Firefox F3.5+ */
  	/* Safari3.0+, Chrome */
  }
  #all_num p{
  	font-size: 16px;
  	display: block;
  	margin-top: 1rem;
  }
  #all_num p span{
  	padding-right: 1rem;
  	background: #2D8CF0;
  	color: #FFFFFF;
  	padding:.6rem .3rem;
  }
</style>

<script>
import apis from '../../apis/apis';
import io from 'socket.io-client';
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
    name: 'messageboard',
    data() {
        return {
            name:localStorage.getItem("name"),
            admingroup :localStorage.getItem("admingroup"),
            listLoading : false,//
            pageInfo: { //分页
                page: 1,
                pageSize: 20,//每页显示数据
                pageTotal: 80,
            },
            formSearch: { //表单查询
                user_name: '',
                user_tel: '',
                user_status: '',
                type_id: '',
                name:'',
                time_type:'',
                start_time:'',
                end_time:'',
                user_remark:'',
                depart_id:'',
                admin_names:'',
                is_myself:''
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
            user_info:[],//用户类型搜索
            depart_info:[],//部门列表
            rulesEdit:  {
              // user_name:[{ required: true, message: "请输入用户姓名", trigger: "blur" }]
              // ,
              type_id: [{ required: true, message: "请选择用户类型", trigger: "change" }],
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
      // this.sockets();
      this.onSearch();
      this.typeList();
      this.userList();
      this.departList();
      var loginLog = {
          ip: returnCitySN["cip"],
          city: returnCitySN["cname"] + "-增删改查页"
      };

      // getSourceList.sourceApi.getSourceList(getSourceList);
    },
    methods: {
      // 即时通讯
      sockets(){
            this.listLoading=true;
            apis.msgApi.useradminId()
            .then((data)=>{
              console.log(data.data)
                this.listLoading=false;
                var uid = data.data
                var socket = io('https://wjgzhgl.msg.hczq.com:2120');
                // uid登录账号分组的id，以便针对uid推送以及统计在线人数
                uid = uid;
                // socket连接后以uid登录
                socket.on('connect', function(){
                	socket.emit('login', uid);
                });
                // 后端推送来消息时
                socket.on('new_msg', function(msg){
                  console.log(msg)
                  //手机号订单id
                  // var sticky=document.getElementById('sticky');
                	// sticky.style.display='none';
                	// $('#content').html('收到消息：'+msg);
                });
                // 后端推送来在线数据时
                socket.on('update_online_count', function(online_stat){
                  console.log(online_stat);
                  // document.getElementById(online_box).innerHTML = online_stat;
                });
                // window.onload=function(){
                //     var sticky=document.getElementById('sticky');
                //     var close_img=document.getElementById('close_img');
                //     close_img.onclick=function(){
                //       sticky.style.display='none';
                //     }
                // };

            })
            .catch((err)=>{
                this.listLoading=false;
                this.$message({message: '查询异常，请重试',type: "error"});
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
            let param = Object.assign({}, this.formSearch,this.pageInfo);
            var _this = this;
            apis.msgApi.clientList(param)
            .then((data)=>{
              console.log(data.data)
                this.listLoading=false;
                if (data && data.data) {
                  var json = data.data.data;
                  if ( data.status == 200) {
                    this.pageInfo.pageTotal=data.data.total;
                    _this.tableData = json;
                    function getUserRules(data){//创建方法
                      var cs=new Array//声明存储数组
                      if(data){//判断是否传进有效数组
                        for(let i=0;i<data.length;i++){//循环传进来数组
                          cs.push(data[i])//声明的数组push传进来的每一项
                          if(data[i].allot !==null ){//判断当前项下面是否有allot
                            cs[i].disdepart_name=data[i].allot.dis.section.depart_name//所属账号
                            cs[i].disadmin_names=data[i].allot.dis.admin_names//所属人
                          }
                        }
                        return cs;

                      }
                    }
                    var a = getUserRules(data.data.data);
                    // console.log(a);
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
        // 选择用户类型导出用户
        exportExcel () {
            this.listLoading=true;
            let params = Object.assign({}, this.formSearch,this.pageInfo);
            apis.msgApi.clientLead(params)
            .then((data)=>{
              // console.log(data);
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
                        '客户列表.xlsx'
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
        // 导出未分配资源用户
        exportundistributed () {
            this.listLoading=true;
            apis.msgApi.unclientLead()
            .then((data)=>{
              // console.log(data);
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
                        '未分配资源列表.xlsx'
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
        // 部门列表
        departList() {
          apis.msgApi.departList()
          .then((data)=>{
            // console.log(data)
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
              this.formSearch.depart_id = this.id;
            }
          })
        },
        compare(attr) {
            return function(a,b){
                var val1 = a[attr];
                var val2 = b[attr];
                return val1 - val2;
            }
        },
        // 用户类型搜索
        userList() {//初始化下拉框动态数据
            let param = 1;
            apis.msgApi.userTyle(param)
            .then((data)=>{
              // console.log(data);
              if(data&&data.data){
                  var json=data.data;
                  if(json&&data.status==200){
                    this.user_info = data.data;
                    this.user_info.sort(this.compare('order'));
                    console.log( this.user_info.sort(this.compare('order')))
                  }
              }
            })
            .catch((err)=>{
              this.$message({message: '执行失败，请重试',type: "error"});
            console.log(err)
            });
        },
        userGet(val){
          console.log('搜索')
          console.log(val);
          this.user_info.map((s, index) => {
            if (s.type_name === val) {
              this.type_id = this.user_info[index].type_id;
              console.log(this.type_id);
              this.formSearch.type_id = this.type_id;
            }
          })
        },
        // 用户类型修改
        typeList() {//初始化下拉框动态数据
            let param = 1;
            apis.msgApi.userTyle(param)
            .then((data)=>{
              console.log(data);
                if(data&&data.data){
                    var json=data.data;
                    if(json&&data.status==200){
                      this.type_info = data.data;
                    }
                }

            })
            .catch((err)=>{
              this.$message({message: '执行失败，请重试',type: "error"});
            console.log(err)
            });
        },
        typeGet(val){
          console.log('修改')
          console.log(val);
          this.type_info.map((s, index) => {
            if (s.type_name === val) {
              this.type_id = this.type_info[index].type_id;
              console.log(this.type_id);
              this.formEdit.type_id = this.type_id;
            }
          })
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
                    apis.msgApi.clientEdit(param)
                    .then((data)=>{
                      console.log(data);
                        if(data&&data.data){
                            var json=data.data;
                            if(json&&data.status== 200 ){
                              if( data.data.error_code == 1000 ){
                                // 、用户姓名！
                                  this.$message({message: data.data.msg,type: "error"});
                              }else{
                                  this.$message({message: '执行成功',type: "success"});
                                  this.dialogEdittVisible = false;
                                  this.onSearch();
                                  return;
                              }
                            }
                        }
                       // this.$message({message: '执行失败，请重试',type: "error"});
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
                      if( data.data.error_code == 1000){
                        this.$message({message: '权限不足！',type: "error"});
                      }else{
                        this.$message({message: '执行成功',type: "success"});
                        this.onSearch();
                      }
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
          console.log(rowData)
              this.type_info.type_name = rowData.type_id;
            //var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
            //this.$message({message: msg,type: "success"});
            this.dialogEdittVisible = true;//等dom渲染完，读取data中初始值，然后再复制，这样重置的是data中初始值
            this.$nextTick(()=>{
                this.dialogType='edit';
                this.formEditTitle='编辑';
                this.formEditDisabled=false;
                this.formEdit= Object.assign({}, rowData);
                this.type_info.map((s, index) => {
                  if (s.type_name === rowData.type_id) {
                    this.type_id = this.type_info[index].type_id;
                    console.log(this.type_id);
                    this.formEdit.type_id = this.type_id;
                  }
                })
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
            this.$router.push({ name: 'ware_list', query:row})
        },
        // 申请次数
        applyNum(row){
            this.$router.push({ name: 'apply_num', query:row})
        },
        // 推送数
        pushNum(row){
            this.$router.push({ name: 'push_num', query:row})
        },
        // 查看数
        seeNum(row){
            this.$router.push({ name: 'see_num', query:row})
        },
        // 分配管理
        allotUser(row){
            this.$router.push({ name: 'allot_user', query:row})
        },
        // 适当性
        appropriateness(row){
            this.$router.push({ name: 'approp_list', query:row})
        },
    }
};
</script>
