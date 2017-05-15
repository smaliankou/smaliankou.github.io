import VueRouter from 'vue-router';

let routes=[
    {
        path:'/',
        component:require('./components/Tasks.vue')
    },
    {
        path:'/persons',
        component:require('./components/Persons.vue')
    },
    {
        path:'/persons/create',
        component:require('./components/PersonCreate.vue')
    },
    {
        path:'/tasks/create',
        component:require('./components/TaskCreate.vue'),
        meta: { mode: 'create' }
    },
    {
        path:'/tasks/:id/edit',
        component:require('./components/TaskCreate.vue'),
        meta: { mode: 'edit' }
    },
    {
        path:'/persons/:id/edit',
        component:require('./components/PersonCreate.vue'),
        meta: { mode: 'edit' }
    },
	{
        path:'/blog',
        component:require('./components/Blog.vue')
    },
];

export default new VueRouter({
	mode: 'history',
    routes
});