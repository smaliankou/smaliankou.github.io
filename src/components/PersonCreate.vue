<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <form @submit.prevent="addPerson">
                    <div class="form-group">
                        <label>Фамилия</label>
                        <input type="text" class="form-control" placeholder="Фамилия" v-model="form.person.second_name">
                        <span class="text-danger">{{errors.second_name?errors.second_name[0]:""}}</span>
                    </div>

                    <div class="form-group">
                        <label>Имя</label>
                        <input type="text" class="form-control" placeholder="Имя" v-model="form.person.first_name">
                        <span class="text-danger">{{errors.first_name?errors.first_name[0]:""}}</span>

                    </div>

                    <div class="form-group">
                        <label>Отчество</label>
                        <input type="text" class="form-control" placeholder="Отчество" v-model="form.person.middle_name">
                        <span class="text-danger">{{errors.middle_name?errors.middle_name[0]:""}}</span>
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
                    person: {
                        second_name: '',
                        first_name: '',
                        middle_name: '',
                    },
                },
                errors:{},

                initializeURL: `/api/persons/create`,
                storeURL: `/api/persons`,
                action: 'Create'
            }

        },
        methods:{
            addPerson(){
                axios.post(this.storeURL, this.form.person)
                    .then(response=>{
                        this.person="";
                        this.errors="";
                        this.$router.push('/persons');
                    })
                    .catch(error=>{
                        this.errors=error.response.data;
                    })
            }
        },
        created() {
            if(this.$route.meta.mode === 'edit') {
                this.initializeURL = `/api/persons/${this.$route.params.id}/edit`;
                this.storeURL = `/api/persons/${this.$route.params.id}?_method=PUT`;
                this.action = 'Update'
            }
            axios.get(this.initializeURL).then((response) => {
                this.$data.form = Object.assign(this.$data.form, response.data);
            });
        },
    }

</script>