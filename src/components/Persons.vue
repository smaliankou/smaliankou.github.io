<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading clearfix">
                        <span>Список задач</span>
                        <router-link to="/persons/create">
                            <a class="btn btn-primary pull-right">Добавить</a>
                        </router-link>
                    </div>

                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Фамилия</th>
                                    <th>Имя</th>
                                    <th>Отчество</th>
                                    <th>Команды</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for='person in persons'>
                                    <td>{{person.id}}</td>
                                    <td>{{person.second_name}}</td>
                                    <td>{{person.first_name}}</td>
                                    <td>{{person.middle_name}}</td>
                                    <td>
                                        <router-link :to="`/persons/${person.id}/edit`">
                                            <div class="btn-info btn-sm pull-left" >
                                                <span class="glyphicon glyphicon-pencil"></span>
                                            </div>
                                        </router-link>
                                        <div class="btn-danger btn-sm pull-left" @click="destroy(person.id)">
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
                persons: [],
                loading: false,
            }
        },

        methods: {
            fetch(){
                this.loading = true;
                axios.get('api/persons').then((response) => {
                    this.persons = response.data;
                    this.loading = false
                });
            },
            destroy(personId){
                let ok = confirm("are you sure?");
                if (ok) {
                    axios.delete('api/persons/' + personId).then((response) => {
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
