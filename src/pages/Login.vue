<template>
    <form @submit.prevent="submitLoginForm()" class="row justify-content-center auth-form">
        <div class="col-4">
            <div class="row no-gutters">
                <h1 class="col-12 m-0 text-center">Вхід</h1>
                <div class="col-12 t-form">
                    <label for="username"></label>
                    <input v-model="$v.user.username.$model" type="text" id="username">
                </div>
                <div class="col-12 t-form">
                    <label for="password"></label>
                    <input v-model="$v.user.password.$model" type="text" id="password">
                </div>
                <button :disabled="$v.$invalid" class="col-3 mt-4 t-btn t-btn-primary">Увійти</button>
            </div>
        </div>
    </form>
</template>

<script>

    import { required, minLength,  maxLength } from 'vuelidate/lib/validators'
    import {mapActions} from 'vuex';

    export default {
        data() {
            return {
                user: {
                    username: '',
                    password: ''
                }
            }
        },
        validations: {
            user: {
                username: {required, minLength: minLength(3), maxLength: maxLength(16)},
                password: {required, minLength: minLength(3), maxLength: maxLength(16)}
            }
        },
        methods: {
            ...mapActions(['login']),
            submitLoginForm() {
                if (!this.$v.$invalid) {
                    this.login(this.user)
                        .then(() => {
                            this.$router.push("/")
                        })
                        .catch(() => {

                        })
                }
            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/auth.css";
    @import "../assets/css/forms.css";
</style>
