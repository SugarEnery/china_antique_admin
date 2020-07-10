<template>
  <div class="result">
      <el-button size="mini" @click="downloadWorld">下载</el-button>
    <div class="container form02">
        <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
          <!-- {{personInfo}} -->
          <table border="1" width="100%" cellpadding="2" class="table">
                  <tbody><tr>
                      <th colspan="2">投资者风险能力评估结果告知函(一式两份)</th>
                  </tr>
                  <tr>
                      <th colspan="2">提示：本表有公司填写，公司和投资者双方各自留存</th>
                  </tr>
                  <tr>
                      <th width="30" align="center" style="font-size: 14px;">投资者留存 </th>
                      <td class="advice_tell_write">
                          <p>
                              <span>　　尊敬的投资者（：<u>
                              {{personInfo.in_name}}
                    <!-- <input v-model="form2.in_name" placeholder="姓名/名称" class="in_input" disabled=""></input> -->
                <!-- </el-form-item> -->
                </u>）：</span>
                          </p>
                          <p>
                              <span>　　根据您填写的《投资者风险承受能力问卷》，本公司对您的风险承受能力进行了综合评估，现得到评估结果如下：</span>
                          </p>
                          <p>
                              <span>　　您的风险承受能力为：{{personInfo.user_score}} </span>
                          </p>
                          <p>
                              <strong><span>　　在此郑重提醒，本公司向您销售的金融产品或金融服务将以您的风险承受能力等级、投资期限和品种为基础，若您提供的信息发生任何重大变化，您都应当及时书面通知本公司。本公司建议您审慎评判自身风险承受能力、结合自身投资行为，作出适合的投资判断。
          如您在审慎考虑后同意本公司的评估结果，请认真阅读下列内容，并签字以示同意</span></strong>
                          </p>
                          <p>
                              <strong><span>　　如您在审慎考虑后同意本公司的评估结果，请认真阅读下列内容，并签字以示同意。</span></strong>
                          </p>
                          <p> 证券营业部：证券营业部
                              <!-- <img src="/public/static/sign.png" style="width:50px;height:50px;"> -->
                          </p>
                          <p>签署日期：{{personInfo.autograph_time}}
                          <!-- <input v-model="form2.autograph_time" placeholder="姓名/名称" class="in_input" disabled=""></input> -->

                          </p>
                      </td>
                  </tr>
                  <tr>
                      <th width="30" align="center" style="font-size: 14px;">证券公司留存 </th>
                      <td class="advice_tell_write">
                          <p>
                              <span>　　证券营业部：</span>
                          </p>
                          <p>
                              <span>　　本人在贵公司的提示下，已经审慎考虑自身的风险承受能力在此确认：</span>
                          </p>
                          <p>
                              <span>　　本人（机构）的风险承受能力为：积极型</span>
                          </p>
                          <p>
                              <strong><span>　　本人（机构）经贵公司提醒，已充分知晓贵公司为本人（机构）销售的金融产品或金融服务将以本人此次确认的风险承受能力等级、投资期限和品种为基础。若本人（机构）提供的信息发生任何重大变化，
              </span></strong>
                          </p>
                          <p>
                              <strong><span>　　本人都会及时书面通知贵公司。本确认函系本人（机构）独立、自主、真实的意思表示，特此确认。</span></strong>
                          </p>
                          <p>投资者确认签名或盖章：
                              <img :src="'http://'+personInfo.autograph"  min-width="50" height="50" crossorigin="Anonymous"/>
                          </p>
                          <p>日期：{{personInfo.autograph_time}}
                          <!-- <input v-model="form2.autograph_time" placeholder="姓名/名称" class="in_input" disabled=""></input> -->

                          </p>
                      </td>
                  </tr>
              </tbody></table>
        </el-form>
    </div>

  </div>
</template>

<script>
  import apis from '../../apis/apis';
  import saveAs from 'file-saver';
  import '../../../static/js/jquery.wordexport.js'
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
              form2: {
                //表单对象
                in_name:"",
                autograph_time:"",
              },
              formSearch: { //表单查询
                  name: '',
                  admin_name: '',
                  admin_names: '',
              },
              type_info:[],//用户类型
              rules:  {

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
        this.onSearch();
        this.getParams();
      },
      methods: {
        downloadWorld() {
          $(".container").wordExport("结果告知书")
        },
        getParams() {
            // 取到路由带过来的参数
            const routerParams = this.personInfo
            // this.mallCode = routerParams;
            console.log(routerParams);
            // 将数据放在当前组件的数据内
            this.form2.in_name = this.personInfo.in_name;

            this.form2.autograph_time = this.personInfo.autograph_time;
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
              let user_id = this.personInfo.user_id;
              // var _this = this;
              // apis.msgApi.appropList(user_id)
              // .then((data)=>{
              //   console.log(data.data)
              //     this.listLoading=false;
              //     if (data && data.data) {
              //       this.form2.in_name = personInfo.in_name;
              //       console.log(personInfo.in_name)
              //       // _this.tableData = data.data.data;

              //     }
              // })
              // .catch((err)=>{
              //     this.listLoading=false;
              //     this.$message({message: '查询异常，请重试',type: "error"});
              // });
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
      }
  };
</script>
<style>
  .result{
    background-color: #FFFFFF;
    padding:1rem 2rem;
  }
  .table {
      border-collapse: collapse;
      color: #333333;
  }
  .table p {
    line-height: 30px;
  }
  .table p span{
      font-size: 14px;
      font-family: "microsoft yahei";
  }
  .in_input{
    border:0;
    background-color: #FFFFFF;
    color: #323232;
    font-size: 16px;
  }
</style>
