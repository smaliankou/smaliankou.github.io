<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">

                <form @submit.prevent="addTask">
                    <div class="form-group">
                        <label>Название</label>
                        <input type="text" class="form-control" placeholder="Название" v-model="form.task.title">
                        <span class="text-danger">{{errors.title?errors.title[0]:""}}</span>
                    </div>

                    <div class="form-group">
                        <label>Объем</label>
                        <input type="text" class="form-control" placeholder="Input field" v-model="form.task.volume">
                        <span class="text-danger">{{errors.volume?errors.volume[0]:""}}</span>

                    </div>

                    <div class="form-group">
                        <label>Дата начала</label>
                        <input type="date" class="form-control" placeholder="Input field" v-model="form.task.date_start">
                        <span class="text-danger">{{errors.date_start?errors.date_start[0]:""}}</span>

                    </div>

                    <div class="form-group">
                        <label>Дата окончания</label>
                        <input type="date" class="form-control" placeholder="Input field" v-model="form.task.date_end">
                        <span class="text-danger">{{errors.date_end?errors.date_end[0]:""}}</span>

                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <button class="btn btn-default" @click="$router.back()">Отмена</button>
                </form>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                form: {
                    task: {
                        title: '',
                        volume: '',
                        date_start: '',
                        date_end: '',
                    },
                    statuses: [],
                    persons: [],
                },
                errors:{},

                initializeURL: `/api/tasks/create`,
                storeURL: `/api/tasks`,
                action: 'Create'
            }

        },
        methods:{
            addTask(){
                axios.post(this.storeURL, this.form.task)
                    .then(response=>{
                        this.task="";
                        this.errors="";
                        this.$router.push('/');
                    })
                    .catch(error=>{
                        this.errors=error.response.data;
                    })
            }
        },
        created() {
            if(this.$route.meta.mode === 'edit') {
                this.initializeURL = `/data/tasks.json`;
                this.storeURL = `/api/tasks/${this.$route.params.id}?_method=PUT`;
                this.action = 'Update'
            }
            axios.get(this.initializeURL).then((response) => {
                this.$data.form = Object.assign(this.$data.form, response.data[this.$route.params.id]);
				console.log(this.$data.form);
            });
        },
    }

</script>