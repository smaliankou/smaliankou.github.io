<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading clearfix">
                        <span>Список задач</span>
                        <router-link to="/tasks/create">
                            <a class="btn btn-primary pull-right">Добавить</a>
                        </router-link>
                    </div>

                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Название</th>
                                        <th>Объем работы</th>
                                        <th>Дата начала</th>
                                        <th>Дата окончания</th>
                                        <th>Статус</th>
                                        <th>Исполнитель</th>
                                        <th>Команды</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for='task in tasks'>
                                        <td>{{task.id}}</td>
                                        <td>{{task.title}}</td>
                                        <td>{{task.volume}}</td>
                                        <td>{{task.date_start}}</td>
                                        <td>{{task.date_end}}</td>
                                        <td>{{task.status.title}}</td>
                                        <td>{{task.person.second_name}}</td>
                                        <td>
                                            <router-link :to="`/tasks/${task.id}/edit`">
                                            <div class="btn-info btn-sm pull-left" >
                                                <span class="glyphicon glyphicon-pencil"></span>
                                            </div>
                                            </router-link>
                                            <div class="btn-danger btn-sm pull-right" @click="destroy(task.id)">
                                                <span class="glyphicon glyphicon-trash"></span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                tasks: [],
                loading: false,
            }
        },

        methods: {
            fetch(){
                axios.get('data/tasks.json').then((response) => {
                    this.tasks = response.data;
                    this.loading = false
                });
            },
            destroy(taskId){
                let ok = confirm("are you sure?");
                if (ok) {
                    axios.delete('api/tasks/' + taskId).then((response) => {
                        this.fetch();
                    });
                }
            }
        },
        mounted() {
            this.fetch();
        }
    }
</script>
