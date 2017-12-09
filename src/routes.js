import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Index from './views/Index.vue'
import Table from './views/nav1/Table.vue'
import Table1 from './views/nav1/Table1.vue'


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '我的主页',
        iconCls: 'fa fa-desktop',//图标样式class
        leaf: true,//只有一个节点
        children: [
            { path: '/index', component: Index, name: '我的主页' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '添加资源',
        iconCls: 'fa fa-video-camera',//图标样式class
        leaf: true,//只有一个节点
        children: [
            { path: '/table', component: Table, name: '电影列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '添加资源',
        iconCls: 'fa fa-youtube-play',//图标样式class
        leaf: true,//只有一个节点
        children: [
            { path: '/table1', component: Table1, name: '美剧列表' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
