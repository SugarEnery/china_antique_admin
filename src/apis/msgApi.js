import Axios from "axios";

/**
 * 提供msg相关接口
 */
// var name
// name=localStorage.getItem("name");
export default {
    add:function({name,city,type,age,gender,qq,text}){
         var param={
            name:name,
            city:city,
            type:type,
            age:age,
            gender:gender,
            text:text,
            qq:qq
        };
        return Axios.post('/api/msg-api/add', param);
    },
    update:function({id,name,city,type,age,gender,qq,text}){
        var param={
            id:id,
           name:name,
           city:city,
           type:type,
           age:age,
           gender:gender,
           text:text,
           qq:qq
       };
       return Axios.post('/api/msg-api/update', param);
   },
   delete:function({id}){
        var param={
            id:id
        };
        return Axios.post('/api/msg-api/delete', param);
    },
    deleteBatch:function({ids}){
        var param={
            ids:ids
        };
        return Axios.post('/api/msg-api/deleteBatch', param);
    },
    // 课程列表
    getList({name,wx_id,class_type}){
        var param={
            name:name,
            wx_id:wx_id,
            class_type:class_type,
        };
        return Axios.post('/napi/admin/classes/list', param);
    },
    // 规则列表
    rulesList(param){
        return Axios.get('/napi/admin/admin/auth/list', param);
    },
    // 用户组列表
    userList(param){
        return Axios.get('/napi/admin/admin/rule/list', param);
    },
    // 用户组详情
    userDetails(param){
        return Axios.get('/napi/admin/admin/rule/detail', param);
    },
    // 用户组修改
    userEdit({rules,title,id}){
      var param={
          rules:rules,
          title:title,
          id:id,
      };
      return Axios.post('/napi/admin/admin/rule/edit', param);
    },
    // 用户组添加
    userAdd({rules,title,wx_id}){
      var param={
          rules:rules,
          title:title,
          wx_id:wx_id,
      };
      return Axios.post('/napi/admin/admin/rule/add', param);
    },
    // 用户组删除
    userDelete({rules,title,id}){
      var param={
          id:id,
      };
      return Axios.delete('/napi/admin/admin/auth/delete', param);
    },
    // 部门列表
    departList(param){
      return Axios.get('/napi/admin/admin/depart/list', param);
    },
    // 部门修改
    departEdit({depart_name,id}){
      var param={
          depart_name:depart_name,
          id:id,
      };
      return Axios.post('/napi/admin/admin/depart/edit', param);
    },
    // 部门添加
    departAdd({depart_name}){
      var param={
          depart_name:depart_name,
      };
      return Axios.post('/napi/admin/admin/depart/add', param);
    },
    // 账号添加
    accountAdd({admin_name,admin_password,admin_names,depart_id,group_id,admin_fid}){
      var param={
          admin_name:admin_name,
          admin_password:admin_password,
          admin_names:admin_names,
          depart_id:depart_id,
          group_id:group_id,
          admin_fid:admin_fid
      };
      return Axios.post('/napi/admin/admin/supper/add', param);
    },
    //自动生成密码
    generatePassword(param){
      return Axios.get('/napi/admin/admin/supper/password', param);
    },
    // 账号列表
    accountList(param){
      return Axios.get('/napi/admin/admin/supper/all', param);
    },
    // 删除账号
    accountDelete({admin_id}){
      var param ={
        admin_id:admin_id,
      }
      return Axios.delete('/napi/admin/admin/supper/delete?admin_id='+admin_id);
    },
    // 账号详情
    accountDetail({admin_id}){
      return Axios.get('/napi/admin/admin/supper/detail?admin_id='+admin_id, );
    },
    // 修改账号
    accountEdit({admin_id,admin_name,admin_password,admin_names,depart_id}){
      var param ={
        admin_name,
        admin_password,
        admin_names,
        depart_id,
        admin_id
      }
      return Axios.post('/napi/admin/admin/supper/edit', param);
    },
    // 总监账号列表
    directorList(param){
      return Axios.get('/napi/admin/admin/supper/plist', param);
    },
    // 员工账号列表
    employeeList({depart_id}){
      return Axios.get('/napi/admin/admin/section/all?depart_id='+depart_id);
    },
    //文章添加
    articleAdd({wx_id,type,type_id,article_img,article_auth,article_content,article_desc,article_title}){
      var param ={
        wx_id,
        type,
        type_id,
        article_img,
        article_auth,
        article_content,
        article_desc,
        article_title
      }
      return Axios.post('/napi/admin/article/add', param);
    },
    //文章列表
    articleList({name,page}){
      var param = ""
      param += "name="+localStorage.getItem("name")+"&"
      if(page){
        param+='page='+page+'&';
      }
      return Axios.get('/napi/admin/article/list?'+param);
    },
    // 文章详情
    articleDetail({id}){
      var param ={
       article_id
      }
      return Axios.get('/napi/admin/article/detail', param);
    },
    // 文章修改
    articleEdit({article_img,article_auth,article_content,article_desc,article_title,id,wx_id,type,type_id}){
      var param ={
          wx_id,
          id,
          type,
          type_id,
          article_img,
          article_auth,
          article_content,
          article_desc,
          article_title,
        }
      return Axios.post('/napi/admin/article/update', param);
    },
    articleDelete({id}){
      var param ={
        id:id
      }
      return Axios.delete('/napi/admin/article/delete?id='+id);
    },
    // 列表
    coverAdd({picture}){
      var param ={
        picture
      }
      return Axios.post('/napi/admin/article/picture_add', param);
    },
    // 课程列表/
    courseList({name}){
      var param ={
        name:name
      }
      return Axios.get('/napi/admin/classes/list?name='+name);
    },
    // 课程详情/
    courseDetail({class_id}){
      var param ={
        class_id,
      }
      return Axios.get('/napi/admin/classes/detail', param);
    },
    // 删除课程/
    courseDelete({class_id}){
      var param ={
        class_id:class_id,
      }
      return Axios.delete('/napi/admin/classes/delete?class_id='+class_id);
    },
    // 课程添加/
    courseAdd({wx_id,name,class_desc,class_video_type,class_length,class_give,class_picture,class_type,class_url,class_title}){
      var param ={
        wx_id:wx_id,
        name:name,
        class_desc:class_desc,
        class_video_type:class_video_type,
        class_length:class_length,
        class_give:class_give,
        class_picture:class_picture,
        class_type:class_type,
        class_url:class_url,
        class_title:class_title
      }
      return Axios.post('/napi/admin/classes/add', param);
    },
    // 课程修改/
    courseEdit({class_id,wx_id,name,class_desc,class_video_type,class_length,class_give,class_picture,class_type,class_url,class_title}){
      var param ={
        wx_id,
        class_desc,
        class_video_type,
        class_length,
        class_give,
        class_picture,
        class_type,
        class_url,
        class_title,
        class_id
      }
      return Axios.post('/napi/admin/classes/update', param);
    },
    // 点击列表
    clickList(class_id){
      return Axios.get('/napi/admin/classes/click_list?class_id='+class_id);
    },
    // 点赞列表
    giveList(class_id){
      return Axios.get('/napi/admin/classes/give_list?class_id='+class_id);
    },
    // 评论列表
    commentList(class_id){
      return Axios.get('/napi/admin/classes/comment_list?class_id='+class_id);
    },
    // 群推列表
    pushList({name,is_shares,page}){
      var params =''
      params+='name='+localStorage.getItem("name")+'&'
      if(page){
        params+='page='+page+'&';
      }
      if(is_shares){
        params += 'is_shares='+is_shares+'&'
      }
      return Axios.get('/napi/admin/news/list?'+params);
    },
    // 群推添加
    pushAdd({is_url,news_adstracts,product_id,user_type,kx_id,new_content,is_shares,product_name,mt_name,title,name,is_free,news_money,mt_color,news_description}){
      var param ={
         name:localStorage.getItem("name"),
        is_url,
        news_adstracts,
        product_id,
        user_type,
        kx_id,
        new_content,
        is_shares,
        product_name,
        mt_name,
        title,
        is_free,
        news_money,
        mt_color,
        news_description,
      }
      return Axios.post('/napi/admin/news/add', param);
    },
    // 消息详情
    messageDetail({id,name}){
      var param ={
        id,
        name:localStorage.getItem("name"),
      }
      return Axios.get('/napi/admin/news/detail', param);
    },
    // 修改消息
    messageEdit({shares_report_url,new_content,title,id,name}){
      var param ={
        name:localStorage.getItem("name"),
        shares_report_url,
        new_content,
        title,
        id,

      }
      return Axios.post('/napi/admin/news/edit', param);
    },
    // 股票状态
    stockState({shares_status,id,name}){
      var param ={
        shares_status,
        id,
        name:localStorage.getItem("name"),
      }
      return Axios.post('/napi/admin/news/status', param);
    },
    // 删除消息/
    messageDelete({id,name}){

      return Axios.delete('/napi/admin/news/delete?id='+id+'&name='+name);
    },
    // 点击列表推送
    pushclickList({news_id,click_type,user_tel,is_leading,page}){
      var params = ''
      params += 'news_id='+news_id+'&'
      if(news_id){
        params += 'news_id='+news_id+'&'
      }
      if(user_tel){
        params += 'user_tel='+user_tel+'&'
      }
      if(click_type){
        params += 'click_type='+click_type+'&'
      }
      if(is_leading){
        params += 'is_leading='+is_leading+'&'
      }
      if(page){
        params += 'page='+page+'&'
      }
      return Axios.get('/napi/admin/news/click?'+params);
    },
    // 跟踪消息列表/
    trackList(news_id){
      return Axios.get('/napi/admin/news/track?news_id='+news_id);
    },
    // 查看跟踪列表
    trackDetail({track_id,page}){
      var params = ''
      if(track_id){
        params += 'track_id='+track_id+'&'
      }
      if(page){
        params += 'page='+page+'&'
      }
      return Axios.get('/napi/admin/news/track_list?'+params);
    },
    // 跟踪推送添加/
    trackAdd({news_adstracts,news_id,news_content,product_name,mt_name,name,mt_color}){
      var param ={
        news_adstracts,
        news_id,
        news_content,
        product_name,
        mt_name,
        mt_color,
        name:localStorage.getItem("name"),
      }
      return Axios.post('/napi/admin/news/track_add', param);
    },
    // 跟踪列表里
    // 跟踪推送修改/
    trackEdit({id,news_content}){
      var param ={
        id,
        news_content
      }
      return Axios.post('/napi/admin/news/track_upd', param);
    },
    // 删除跟踪消息/
    trackDelete({id}){
      return Axios.delete('/napi/admin/news/track_del?id='+id);
    },

    // 快讯标题添加
    falshAdd({kx_title}){
      var param ={
        kx_title
      }
      return Axios.post('/napi/admin/newstype/add', param);
    },
    // 快讯标题列表
    falshList(){
      return Axios.get('/napi/admin/newstype/list?type='+1);
    },
    // 删除快讯标题/
    falshDelete({kx_id}){
      return Axios.delete('/napi/admin/newstype/delete?kx_id='+kx_id);
    },
    // 客户管理
    // 客户列表/
    clientList({mobile,order,keywords,page,limit}){
      var params =''
      if(mobile){
          params+='mobile='+mobile+'&';
      }
      if(order){
          params+='order='+order+'&';
      }
      if(keywords){
          params+='keywords='+keywords+'&';
      }
      if(page){
        params+='page='+page+'&';
      }
      if(limit){
          params+='limit='+limit+'&';
      }
      return Axios.get('/napi/homeApi/userInfo?'+params);
    },
    // 客户修改
    clientEdit({name,id,type_id,user_name,user_remark,user_develop_people,user_server_people}){
      var param ={
        name:localStorage.getItem("name"),
        id,
        type_id,
        user_name,
        user_remark,
        user_develop_people,
        user_server_people
      }
      return Axios.post('/napi/admin/users/update',param);
    },
    // 客户删除/
    clientdelete({ids}){
      var param ={
        ids
      }
      return Axios.post('/napi/homeApi/userInfoDelete',param);
    },
    //用户类型列表/
    userTyle(param){
      return Axios.get('/napi/admin/users/type/list',param);
    },
    //用户类型添加/
    userTyleAdd({type_name}){
      var param ={
        type_name
      }
      return Axios.post('/napi/admin/users/type/add',param);
    },
    //用户类型删除/
    userTyleDelete({type_id}){
      return Axios.delete('/napi/admin/users/type/delete?type_id='+type_id);
    },
    // 封面图上传课程/
    imgUpload({picture}){
      var param ={
        picture:picture
      }
      return Axios.post('/napi/admin/classes/picture_add',param);
    },
    // 订单列表/
    orderList({name,service_type,order_type,product_id,user_tel,order_ch,pay_status}){
      var params =''
      params +='name='+localStorage.getItem("name")+'&';
      if(service_type){
          params+='service_type='+service_type+'&';
      }
      if(order_type){
          params+='order_type='+order_type+'&';
      }
      if(product_id){
          params+='product_id='+product_id+'&';
      }
      if(user_tel){
          params+='user_tel='+user_tel+'&';
      }
      if(order_ch){
          params+='order_ch='+order_ch+'&';
      }
      if(pay_status){
          params+='pay_status='+pay_status+'&';
      }
      return Axios.get('/napi/admin/order/list?'+params);
    },
    // 销售订单列表/
    salesorderList({name,service_type,order_type,product_id,user_tel,order_ch,pay_status}){
      var params =''
      params +='name='+localStorage.getItem("name")+'&';
      if(service_type){
          params+='service_type='+service_type+'&';
      }
      if(order_type){
          params+='order_type='+order_type+'&';
      }
      if(product_id){
          params+='product_id='+product_id+'&';
      }
      if(user_tel){
          params+='user_tel='+user_tel+'&';
      }
      if(order_ch){
          params+='order_ch='+order_ch+'&';
      }
      if(pay_status){
          params+='pay_status='+pay_status+'&';
      }
      return Axios.get('/napi/admin/order/viplist?'+params);
    },
    // 订单添加/
    orderAdd({name,product_id,number,end_time,start_time,user_tel,service_type}){
      var param ={
        name:localStorage.getItem("name"),
        product_id,
        number,
        end_time,
        start_time,
        user_tel,
        service_type
      }
      return Axios.post('/napi/admin/order/add', param);
    },
    // 订单修改/
    orderEdit({id,name,product_id,number,end_time,start_time,service_type}){
      var param ={
        id:id,
        name:localStorage.getItem("name"),
        product_id:product_id,
        number:number,
        end_time:end_time,
        start_time:start_time,
        service_type:service_type
      }
      return Axios.post('/napi/admin/order/update', param);
    },
    // 结束订单
    orderEnd({id}){
      var param ={
        id:id
      }
      return Axios.put('/napi/admin/order/end', param);
    },
    // 产品列表
    productList(){
      return Axios.get('/napi/admin/order/product_list?name='+name);
    },
    // 投诉列表
    complaintList({name}){
      var param =''
      param += 'name='+localStorage.getItem("name")+'&'
      return Axios.get('/napi/admin/question/list?'+param);
    },
    // 修改已查看投诉列表
    complaintEdit({question_id,remark}){
      var param ={
        question_id:question_id,
        remark:remark,
      }
      return Axios.post('/napi/admin/question/update',param);
    },
    // 分配用户管理
    //员工账号列表/
    staffList({name,admin_name,admin_names,page}){
      var param =''
      param += 'name='+localStorage.getItem("name")+'&'
      if(page){
        param+='page='+page+'&';
      }
      if(admin_name){
        param += 'admin_name='+admin_name+'&'
      }
      if(admin_names){
        param += 'admin_names='+admin_names+'&'
      }

      return Axios.get('/napi/admin/allot/list?'+param);
    },
    // 分配用户列表
    allotList({admin_id,user_tel,user_name,page}){
      var param =''
      param += 'name='+localStorage.getItem("name")+'&'
      if(page){
        param+='page='+page+'&';
      }
      if(admin_id){
        param += 'admin_id='+admin_id+'&'
      }
      if(user_tel){
        param += 'user_tel='+user_tel+'&'
      }
      if(user_name){
        param += 'user_name='+user_name+'&'
      }
      return Axios.get('/napi/admin/allot/users/list?'+param);
    },
    // 分配用户/
    allotUser({name,user_id,admin_id}){
      var param = {
        name:localStorage.getItem("name"),
        admin_id,
        user_id
      }
      return Axios.post('/napi/admin/allot/add',param);
    },
    // 调整分配员工/
    allotEdit({name,user_id,admin_id,admin_old_id}){
      var param = {
        name:localStorage.getItem("name"),
        user_id,
        admin_id,
        admin_old_id
      }
      return Axios.post('/napi/admin/allot/edit',param);
    },
    // 释放员工/
    release({name,user_id}){
      return Axios.delete('/napi/admin/allot/delete?name='+name+'&user_id='+user_id);
    },
    // 申请管理
    // 申请列表/
    applyList(){
      return Axios.get('/napi/admin/apply/list?name='+name);
    },
    // 申请添加/
    applyAdd({name,user_id,apply_num }){
      var param = {
        name:localStorage.getItem("name"),
        apply_num,
        user_id
      }
      return Axios.post('/napi/admin/apply/add',param);
    },
    // 同意申请/
    applyAgree({id,name}){
      return Axios.put('/napi/admin/apply/agree?name='+name+'&id='+id);
    },
    // 驳回申请/
    applyReject({id,name}){
      return Axios.put('/napi/admin/apply/reject?name='+name+'&id='+id);
    },
    // 系统所有权限列表
    permissList(param){
      return Axios.get('/napi/admin/admin/auth/list',param);
    },
    // 系统权限规则添加
    permissAdd({title,name,pid}){
      var param = {
        title,
        name,
        pid
      }
      return Axios.post('/napi/admin/admin/auth/add',param);
    },
    // 系统权限规则删除
    permissDelete(id){
      return Axios.delete('/napi/admin/admin/auth/delete/'+id);
    },
    // 用户股票记录
    // 0持股
    holdList(id){
      var params =''
      if(id){
        params += 'id='+id+'&'
      }
      return Axios.get('/napi/admin/users/history?name='+localStorage.getItem("name")+'&shares_status='+0+'&'+params);
    },
    // 1成功
    successList(id){
      var params =''
      if(id){
        params += 'id='+id+'&'
      }
      return Axios.get('/napi/admin/users/history?name='+localStorage.getItem("name")+'&shares_status='+1+'&'+params);
    },
    // 2失败
    errorList(id){
      var params =''
      if(id){
        params += 'id='+id+'&'
      }
      return Axios.get('/napi/admin/users/history?name='+localStorage.getItem("name")+'&shares_status='+2+'&'+params);
    },
    // 3调仓
    wareList(id){
      var params =''
      if(id){
        params += 'id='+id+'&'
      }
      return Axios.get('/napi/admin/users/history?name='+localStorage.getItem("name")+'&shares_status='+3+'&'+params);
    },
    // 6推送
    pushNum(id){
      var params =''
      if(id){
        params += 'id='+id+'&'
      }
      return Axios.get('/napi/admin/users/history?name='+localStorage.getItem("name")+'&shares_status='+6+'&'+params);
    },
    // 5查看
    seeNum(id){
      var params =''
      if(id){
        params += 'id='+id+'&'
      }
      return Axios.get('/napi/admin/users/history?name='+localStorage.getItem("name")+'&shares_status='+5+'&'+params);
    },
    // 客服系统
    // 客服群发列表
    customerList(){
      return Axios.get('/napi/admin/wxservice/list?name='+localStorage.getItem("name"));
    },
    // 客服群发添加
    customerAdd({name,type_id,content}){
      var param = {
        name:localStorage.getItem("name"),
        type_id,
        content
      }
      return Axios.post('/napi/admin/wxservice/add',param);
    },
    passWord(){
      return Axios.get('/napi/admin/admin/supper/password',);
    },
    // 退款管理
    // 退款列表
    refundList({name,refund_deal,refund_status,wx_id}){
      var params =''
      params += 'name='+localStorage.getItem("name")+'&'
      if(refund_deal){
        params += 'refund_deal='+refund_deal+'&'
      }
      if(refund_status){
        params += 'refund_status='+refund_status+'&'
      }
      if(wx_id){
        params += 'wx_id='+wx_id+'&'
      }
      return Axios.get('/napi/admin/refund/list?'+params);
    },
    // 查看状态
    refundSee({refund_id}){
      return Axios.put('/napi/admin/refund/update?refund_id='+refund_id);
    },
    // 审核结果修改
    auditEdit({refund_id,refund_deal,refund_remark}){
      var param = {
        refund_id,
        refund_deal,
        refund_remark
      }
      return Axios.post('/napi/admin/refund/examine',param);
    },
    // 适当性
    appropList({user_tel,user_id}){
        var params =''
        params += 'user_tel='+user_tel+'&'
        if(user_id){
          var params =''
          params += 'user_id='+user_id+'&'
        }
      return Axios.get('/napi/admin/order/rules?'+params);
    },
    // 用户组id
    useradminId(){
      return Axios.post('/napi/admin/admin/group/id');
    },
    // 风测状态重置
    fengcreset({id,status}){
      var param = {
        id,
        status,
      }
      return Axios.post('/napi/admin/order/rules/reset',param);
    },
    // 风测步骤详情
    fengcdetail(){
      return Axios.get('/napi/admin/order/rules/show');
    },
    // 订单价格
    orderprice(){
      return Axios.get('/napi/admin/news/price?name='+localStorage.getItem("name"));
    },
    // 导出客户
    clientLead({name,type_id}){
      var params =''
      params += 'name='+localStorage.getItem("name")+'&'
      if(type_id){
        var params =''
        params += 'type_id='+type_id+'&'
      }
      return Axios.get('/napi/admin/users/leadUser?'+ params);
    },
    // 导出未分配资源客户
    unclientLead(){
      return Axios.get('/napi/admin/users/resourses');
    },
}
