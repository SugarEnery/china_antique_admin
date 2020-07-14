
/**
 * 这里配置开发环境写死的路由和菜单，方便开发
 */

//静态路由
const name = localStorage.getItem("name");
var routeDevList = [
    // {
    //     path: '/routedev',
    //     component: resolve => require(['../components/test/RouteDev'], resolve),
    //     meta: {
    //         title: '静态菜单路由'
    //     }
    // },
    {
      name: 'index',
      path: '/index',
      component: resolve => require(['@/components/index.vue'], resolve),
      meta: {
        title: '系统首页'
      }
    },
    {
      name: 'clients_list',
      path: '/clients_list',
      component: resolve => require(['@/components/clients/clients_list.vue'], resolve),
      meta: {
        title: '客户列表'
      }
    },
    {
      name: 'auction_add',
      path: '/auction_add',
      component: resolve => require(['@/components/auction/auction_add.vue'], resolve),
      meta: {
        title: '拍卖添加'
      }
    },
    {
      name: 'auction_list',
      path: '/auction_list',
      component: resolve => require(['@/components/auction/auction_list.vue'], resolve),
      meta: {
        title: '拍卖列表'
      }
    },
    // {
    //   name: 'permis_rules',
    //   path: '/permis_rules',
    //   component: resolve => require(['@/components/system/permis_rules.vue'], resolve),
    //   meta: {
    //     title: '权限规则添加'
    //   }
    // },
    // {
    //   name: 'permis_msg',
    //   path: '/permis_msg',
    //   component: resolve => require(['@/components/system/permis_msg.vue'], resolve),
    //   meta: {
    //     title: '获取平台信息'
    //   }
    // },

    // {
    //   name: 'permis_list',
    //   path: '/permis_list',
    //   component: resolve => require(['@/components/system/permis_list.vue'], resolve),
    //   meta: {
    //     title: '所有权限列表'
    //   }
    // },
    // {
    //   name: 'user_list',
    //   path: '/user_list',
    //   component: resolve => require(['@/components/system/user_list.vue'], resolve),
    //   meta: {
    //     title: '用户组列表'
    //   }
    // },
    // {
    //   name: 'user_edit',
    //   path: '/user_edit',
    //   component: resolve => require(['@/components/system/user_edit.vue'], resolve),
    //   meta: {
    //     title: '用户组修改'
    //   }
    // },
    // {
    //   name: 'user_add',
    //   path: '/user_add',
    //   component: resolve => require(['@/components/system/user_add.vue'], resolve),
    //   meta: {
    //     title: '用户组添加'
    //   }
    // },
    // {
    //   name: 'depart_list',
    //   path: '/depart_list',
    //   component: resolve => require(['@/components/system/depart_list.vue'], resolve),
    //   meta: {
    //     title: '部门列表'
    //   }
    // },
    // {
    //   name: 'depart_add',
    //   path: '/depart_add',
    //   component: resolve => require(['@/components/system/depart_add.vue'], resolve),
    //   meta: {
    //     title: '部门添加'
    //   }
    // },
    // {
    //   name: 'account_add',
    //   path: '/account_add',
    //   component: resolve => require(['@/components/system/account_add.vue'], resolve),
    //   meta: {
    //     title: '账号添加'
    //   }
    // },
    // {
    //   name: 'account_list',
    //   path: '/account_list',
    //   component: resolve => require(['@/components/system/account_list.vue'], resolve),
    //   meta: {
    //     title: '账号列表'
    //   }
    // },
    // {
    //   name: 'account_edit',
    //   path: '/account_edit',
    //   component: resolve => require(['@/components/system/account_edit.vue'], resolve),
    //   meta: {
    //     title: '账号修改'
    //   }
    // },
    // {
    //   name: 'director_list',
    //   path: '/director_list',
    //   component: resolve => require(['@/components/system/director_list.vue'], resolve),
    //   meta: {
    //     title: '总监账号列表'
    //   }
    // },
    // {
    //   name: 'article_list',
    //   path: '/article_list',
    //   component: resolve => require(['@/components/article/article_list.vue'], resolve),
    //   meta: {
    //     title: '文章列表'
    //   }
    // },
    // {
    //   name: 'article_add',
    //   path: '/article_add',
    //   component: resolve => require(['@/components/article/article_add.vue'], resolve),
    //   meta: {
    //     title: '文章添加'
    //   }
    // },
    // {
    //   name: 'article_edit',
    //   path: '/article_edit',
    //   component: resolve => require(['@/components/article/article_edit.vue'], resolve),
    //   meta: {
    //     title: '文章修改'
    //   }
    // },
    // {
    //   name: 'order_list',
    //   path: '/order_list',
    //   component: resolve => require(['@/components/order/order_list.vue'], resolve),
    //   meta: {
    //     title: '订单列表'
    //   }
    // },
    // {
    //   name: 'salesorder_list',
    //   path: '/salesorder_list',
    //   component: resolve => require(['@/components/order/salesorder_list.vue'], resolve),
    //   meta: {
    //     title: '销售订单列表'
    //   }
    // },
    // {
    //   name: 'order_add',
    //   path: '/order_add',
    //   component: resolve => require(['@/components/order/order_add.vue'], resolve),
    //   meta: {
    //     title: '订单添加'
    //   }
    // },
    // {
    //   name: 'push_add',
    //   path: '/push_add',
    //   component: resolve => require(['@/components/push/push_add.vue'], resolve),
    //   meta: {
    //     title: '群推添加',
    //   }
    // },
    // {
    //   name: 'push_list',
    //   path: '/push_list',
    //   component: resolve => require(['@/components/push/push_list.vue'], resolve),
    //   meta: {
    //     title: '群推列表'
    //   }
    // },
    // {
    //   name: 'click_list',
    //   path: '/click_list',
    //   component: resolve => require(['@/components/push/click_list.vue'], resolve),
    //   meta: {
    //     title: '点击列表'
    //   }
    // },
    // {
    //   name: 'track_add',
    //   path: '/track_add',
    //   component: resolve => require(['@/components/push/track_add.vue'], resolve),
    //   meta: {
    //     title: '跟踪推送添加'
    //   }
    // },
    // {
    //   name: 'track_list',
    //   path: '/track_list',
    //   component: resolve => require(['@/components/push/track_list.vue'], resolve),
    //   meta: {
    //     title: '跟踪列表'
    //   }
    // },
    // {
    //   name: 'falsh_add',
    //   path: '/falsh_add',
    //   component: resolve => require(['@/components/falsh/falsh_add.vue'], resolve),
    //   meta: {
    //     title: '快讯添加'
    //   }
    // },
    // {
    //   name: 'falsh_list',
    //   path: '/falsh_list',
    //   component: resolve => require(['@/components/falsh/falsh_list.vue'], resolve),
    //   meta: {
    //     title: '快讯列表'
    //   }
    // },
    // {
    //   name: 'complaint_list',
    //   path: '/complaint_list',
    //   component: resolve => require(['@/components/complaint/complaint_list.vue'], resolve),
    //   meta: {
    //     title: '投诉列表'
    //   }
    // },
    // {
    //   name: 'complaint_edit',
    //   path: '/complaint_edit',
    //   component: resolve => require(['@/components/complaint/complaint_edit.vue'], resolve),
    //   meta: {
    //     title: '投诉更改'
    //   }
    // },
    // {
    //   name: 'refund_list',
    //   path: '/refund_list',
    //   component: resolve => require(['@/components/refund/refund_list.vue'], resolve),
    //   meta: {
    //     title: '退款列表'
    //   }
    // },
    // {
    //   name: 'audit_edit',
    //   path: '/audit_edit',
    //   component: resolve => require(['@/components/refund/audit_edit.vue'], resolve),
    //   meta: {
    //     title: '审核结果修改'
    //   }
    // },
    // {
    //   name: 'clients_list',
    //   path: '/clients_list',
    //   component: resolve => require(['@/components/clients/clients_list.vue'], resolve),
    //   meta: {
    //     title: '客户列表'
    //   }
    // },
    // {
    //   name: 'usertype_list',
    //   path: '/usertype_list',
    //   component: resolve => require(['@/components/clients/usertype_list.vue'], resolve),
    //   meta: {
    //     title: '用户类型'
    //   }
    // },
    // {
    //   name: 'product_list',
    //   path: '/product_list',
    //   component: resolve => require(['@/components/order/product_list.vue'], resolve),
    //   meta: {
    //     title: '产品列表'
    //   }
    // },
    // {
    //   name: 'select',
    //   path: '/select',
    //   component: resolve => require(['@/components/select.vue'], resolve),
    //   meta: {
    //     title: '选择平台'
    //   },
    // },
    // {
    //   name: 'hold_list',
    //   path: '/hold_list',
    //   component: resolve => require(['@/components/clients/hold_list.vue'], resolve),
    //   meta: {
    //     title: '持股状态'
    //   },
    // },
    // {
    //   name: 'success_list',
    //   path: '/success_list',
    //   component: resolve => require(['@/components/clients/success_list.vue'], resolve),
    //   meta: {
    //     title: '成功状态'
    //   },
    // },
    // {
    //   name: 'error_list',
    //   path: '/error_list',
    //   component: resolve => require(['@/components/clients/error_list.vue'], resolve),
    //   meta: {
    //     title: '失败状态'
    //   },
    // },
    // {
    //   name: 'ware_list',
    //   path: '/ware_list',
    //   component: resolve => require(['@/components/clients/ware_list.vue'], resolve),
    //   meta: {
    //     title: '调仓状态'
    //   },
    // },
    // {
    //   name: 'see_num',
    //   path: '/see_num',
    //   component: resolve => require(['@/components/clients/see_num'], resolve),
    //   meta: {
    //     title: '查看数'
    //   },
    // },
    // {
    //   name: 'push_num',
    //   path: '/push_num',
    //   component: resolve => require(['@/components/clients/push_num.vue'], resolve),
    //   meta: {
    //     title: '推送数'
    //   },
    // },
    // {
    //   name: 'apply_num',
    //   path: '/apply_num',
    //   component: resolve => require(['@/components/clients/apply_num.vue'], resolve),
    //   meta: {
    //     title: '申请次数'
    //   },
    // },

    // // {
    // //   name: 'detail',
    // //   path: '/detail',
    // //   component: resolve => require(['@/components/course/detail.vue'], resolve),
    // //   meta: {
    // //     title: '详情页'
    // //   },

    // // },
    // {
    //   name: 'message_detail',
    //   path: '/message_detail',
    //   component: resolve => require(['@/components/push/message_detail.vue'], resolve),
    //   meta: {
    //     title: '消息详情'
    //   },
    // },
    // {
    //   name: 'message_edit',
    //   path: '/message_edit',
    //   component: resolve => require(['@/components/push/message_edit.vue'], resolve),
    //   meta: {
    //     title: '消息编辑'
    //   },
    // },
    // {
    //   name: 'click_list',
    //   path: '/click_list',
    //   component: resolve => require(['@/components/course/click_list.vue'], resolve),
    //   meta: {
    //     title: '点击列表'
    //   },
    // },
    // {
    //   name: 'give_list',
    //   path: '/give_list',
    //   component: resolve => require(['@/components/course/give_list.vue'], resolve),
    //   meta: {
    //     title: '点赞列表'
    //   },
    // },
    // {
    //   name: 'comment_list',
    //   path: '/comment_list',
    //   component: resolve => require(['@/components/course/comment_list.vue'], resolve),
    //   meta: {
    //     title: '评论列表'
    //   },
    // },
    // {
    //   name: 'track_list',
    //   path: '/track_list',
    //   component: resolve => require(['@/components/push/track_list.vue'], resolve),
    //   meta: {
    //     title: '跟踪列表'
    //   },
    // },
    // {
    //   name: 'track_add',
    //   path: '/track_add',
    //   component: resolve => require(['@/components/push/track_add.vue'], resolve),
    //   meta: {
    //     title: '跟踪添加'
    //   },
    // },
    // {
    //   name: 'staff_list',
    //   path: '/staff_list',
    //   component: resolve => require(['@/components/allot/staff_list'], resolve),
    //   meta: {
    //     title: '员工账号列表'
    //   },
    // },
    // {
    //   name: 'allot_list',
    //   path: '/allot_list',
    //   component: resolve => require(['@/components/allot/allot_list'], resolve),
    //   meta: {
    //     title: '分配列表'
    //   },
    // },
    // {
    //   name: 'adjust_add',
    //   path: '/adjust_add',
    //   component: resolve => require(['@/components/allot/adjust_add'], resolve),
    //   meta: {
    //     title: '调整分配'
    //   },
    // },
    // {
    //   name: 'allot_user',
    //   path: '/allot_user',
    //   component: resolve => require(['@/components/clients/allot_user'], resolve),
    //   meta: {
    //     title: '分配用户'
    //   },
    // },
    // {
    //   name: 'apply_list',
    //   path: '/apply_list',
    //   component: resolve => require(['@/components/apply/apply_list'], resolve),
    //   meta: {
    //     title: '申请列表'
    //   },
    // },
    // {
    //   name: 'ckeditor',
    //   path: '/ckeditor',
    //   component: resolve => require(['@/components/ckeditor/index.vue'], resolve),
    //   meta: { title: '文本编辑器' }
    // },
    // {
    //   name: 'customer_list',
    //   path: '/customer_list',
    //   component: resolve => require(['@/components/customer/customer_list.vue'], resolve),
    //   meta: { title: '客服群发列表' }
    // },
    // {
    //   name: 'customer_add',
    //   path: '/customer_add',
    //   component: resolve => require(['@/components/customer/customer_add.vue'], resolve),
    //   meta: { title: '客服群发添加' }
    // },
    // {
    //   name: 'baidu',
    //   path: '/baidu',
    //   component: resolve => require(['@/components/ckeditor/baidu.vue'], resolve),
    //   meta: { title: '百度编辑器' }
    // },
    // {
    //   name: 'SysAcl',
    //   path: '/sysAcl',
    //   component: resolve => require(['@/components/admin/SysAcl.vue'], resolve),
    //   meta: { title: '角色资源管理' }
    // },
    // {
    //   name: 'SysMenu',
    //   path: '/sysMenu',
    //   component: resolve => require(['@/components/admin/SysMenu.vue'], resolve),
    //   meta: { title: '菜单管理' }
    // },
    // {
    //   name: 'SysResource',
    //   path: '/sysResource',
    //   component: resolve => require(['@/components/admin/SysResource.vue'], resolve),
    //   meta: { title: '资源管理' }
    // },
    // {
    //   name: 'approp_list',
    //   path: '/approp_list',
    //   component: resolve => require(['@/components/approp/approp_list.vue'], resolve),
    //   meta: { title: '适当性' }
    // },
    // {
    //   name: 'contract_detail',
    //   path: '/contract_detail',
    //   component: resolve => require(['@/components/approp/contract_detail.vue'], resolve),
    //   meta: { title: '服务合同' }
    // },
    // {
    //   name: 'result_detail',
    //   path: '/result_detail',
    //   component: resolve => require(['@/components/approp/result_detail.vue'], resolve),
    //   meta: { title: '结果告知书' }
    // },
    // {
    //   name: 'question_detail',
    //   path: '/question_detail',
    //   component: resolve => require(['@/components/approp/question_detail.vue'], resolve),
    //   meta: { title: '评估问卷' }
    // },
    // {
    //   name: 'order_edit',
    //   path: '/order_edit',
    //   component: resolve => require(['@/components/order/order_edit.vue'], resolve),
    //   meta: { title: '订单修改' }
    // },
    // {
    //   name: 'look_track',
    //   path: '/look_track',
    //   component: resolve => require(['@/components/push/look_track.vue'], resolve),
    //   meta: { title: '跟踪查看列表' }
    // },

];
//静态菜单
var menuDevList = [
    {
        icon: 'el-icon-date',
        index: Math.random()+'',
        title: '静态菜单Demo',
        subs: [
            {
                index: 'routedev',
                title: '静态菜单和路由'
            },
        ]
    }
]


var routeDev = {
    ROUTE_DEV: true,//是否写入静态路由（开关）
    routeDevList: routeDevList,
    MENU_DEV: true,//是否写入静态菜单（开关）
    menuDevList: menuDevList,
}
export default routeDev;
