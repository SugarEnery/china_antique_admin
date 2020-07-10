<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" >
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from './bus';
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                name:localStorage.getItem("name"),
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'index',
                        title: '首页',
                    },
                    {
                        icon: 'el-icon-error',
                        index: 'clients',
                        title: '客户系统',
                        type: 'false',
                        subs: [
                            {
                                index: 'clients_list',
                                title: '客户列表'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: 'push',
                        title: '推送管理',
                        subs: [
                            {
                                index: 'push_list',
                                title: '群推列表'
                            },
                            {
                                index: 'push_add',
                                title: '群推添加'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'order',
                        title: '订单管理',
                        subs: [
                            {
                                index: 'order_list',
                                title: '订单列表'
                            },
                            {
                                index: 'salesorder_list',
                                title: '销售订单列表'
                            },
                            {
                                index: 'order_add',
                                title: '订单添加'
                            },
                            {
                                index: 'product_list',
                                title: '产品列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-message',
                        index: 'apply',
                        title: '申请管理',
                        subs: [
                            {
                                index: 'apply_list',
                                title: '申请列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-message',
                        index: 'article',
                        title: '文章管理',
                        subs: [
                            {
                                index: 'article_list',
                                title: '文章列表'
                            },
                            {
                                index: 'article_add',
                                title: '文章添加'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'falsh',
                        title: '快讯管理',
                        subs: [
                            {
                                index: 'falsh_list',
                                title: '快讯列表'
                            },
                            {
                                index: 'falsh_add',
                                title: '快讯添加'
                            }
                        ]
                    },
                    // {
                    //     icon: 'el-icon-tickets',
                    //     index: 'course',
                    //     title: '课程管理',
                    //     subs: [
                    //         {
                    //             index: 'course_list',
                    //             title: '课程列表'
                    //         },
                    //         {
                    //             index: 'course_add',
                    //             title: '课程添加'
                    //         }
                    //     ]
                    // },
                    {
                        icon: 'el-icon-rank',
                        index: 'complaint',
                        title: '投诉管理',
                        subs: [
                            {
                                index: 'complaint_list',
                                title: '投诉列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-warning',
                        index: 'refund',
                        title: '退款管理',
                        subs: [
                            {
                                index: 'refund_list',
                                title: '退款列表'
                            },
                            {
                                index: 'audit_edit',
                                title: '审核结果修改'
                            },

                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'allot',
                        title: '分配管理',
                        subs: [
                            {
                                index: 'staff_list',
                                title: '员工账号列表'
                            }

                        ],
                        status: '1'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'system',
                        title: '系统管理',
                        subs: [
                            {
                                index: 'user_list',
                                title: '用户组列表',
                            },
                            {
                                index: 'user_add',
                                title: '用户组添加',
                            },
                            {
                                index: 'depart_list',
                                title: '部门列表',
                            },
                            {
                                index: 'depart_add',
                                title: '部门添加',
                            },
                            {
                                index: 'account_add',
                                title: '账号添加',
                            },
                            {
                                index: 'account_list',
                                title: '账号列表',
                            },
                            {
                                index: 'director_list',
                                title: '总监账号列表',
                            },
                            {
                                index: 'permis_list',
                                title: '所有权限列表',
                            },
                            {
                                index: 'permis_rules',
                                title: '权限规则添加',
                            },

                        ],
                        status: '1'
                    },
                    {
                        icon: 'el-icon-message',
                        index: 'customer',
                        title: '客服系统',
                        subs:[
                          {
                              index: 'customer_list',
                              title: '客服群发列表',
                          },
                          {
                              index: 'customer_add',
                              title: '客服群发添加',
                          }
                        ]
                    },
                    {
                        icon: 'el-icon-message',
                        index: 'select',
                        title: '选择平台',
                    },
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: 'resources',
                    //     title: '侧边栏',
                    //     subs: [

                    //         {
                    //             index: 'sysAcl',
                    //             title: '角色资源授权'
                    //         },
                    //         {
                    //             index: 'sysResource',
                    //             title: '资源管理'
                    //         },
                    //         {
                    //             index: 'sysMenu',
                    //             title: '菜单管理'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-message',
                    //     index: 'ckeditor',
                    //     title: '编辑器',
                    // },
                    // {
                    //     icon: 'el-icon-message',
                    //     index: 'baidu',
                    //     title: '百度编辑器',
                    // },

                ]
            }
        },
        computed:mapGetters({
            menuList:'getMenuList',
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }),
        mounted(){
            var admingroup = localStorage.getItem('admingroup');
            console.log(admingroup);
            if(admingroup != 48){
               this.items.forEach((ele,index)=>{
                 if(ele.status == '1'){
                   console.log(index);
                   this.items.splice(index, 2);
                 }
               })
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 200px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
