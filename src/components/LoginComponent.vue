<template>
<div>
        <md-dialog :md-active.sync="showDialog">
            <md-tabs md-dynamic-height>  
                <md-tab md-label="Login">

                <form novalidate class="md-layout" @submit.prevent="validateUser">
                <md-card class="md-layout-item no-shadow">

                        <div class="md-layout md-gutter">
                            <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('username')" id="test">
                                <label for="username">Username</label>
                                <md-input name="username" id="login.username" v-model="$v.login.username.$model" />

                                <span class="md-error" v-if="!$v.login.username.required">The first name is required</span>
                                <span class="md-error" v-else-if="!$v.login.username.minLength">Invalid first name</span>
                            </md-field>
                            </div>
                        </div>
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('password')">
                                <label for="last-name">Password</label>
                                <md-input name="last-name" id="login.password" type="password" v-model="$v.login.password.$model" />
                                <span class="md-error" v-if="!$v.login.password.required">The first name is required</span>
                                <span class="md-error" v-else-if="!$v.login.password.minLength">Invalid first name</span>
                            </md-field>
                            </div>
                        </div>

                        <md-progress-bar md-mode="indeterminate" v-if="state" />

                        <md-card-actions>
                            <md-button type="submit" class="md-primary" :disabled="state">Login</md-button>
                            <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                        </md-card-actions>
                </md-card>

                </form>

                </md-tab>

                <md-tab md-label="Register">
                
                <form novalidate class="md-layout" @submit.prevent="validateUser">
                    <md-card class="md-layout-item no-shadow md-gutter">

                            <div class="md-layout md-gutter">
                                <div class="md-layout-item md-small-size-100">
                                <md-field>
                                    <label for="first-name">Username</label>
                                    <md-input name="first-name" id="login" v-model="register.username" />

                                </md-field>
                                </div>

                                <div class="md-layout-item md-small-size-100">
                                <md-field>
                                    <label for="password">Password</label>
                                    <md-input name="register.password" id="register.password" type="password" v-model="register.password" />
                                </md-field>
                                </div>

                                <div class="md-layout-item md-small-size-100">
                                <md-field>
                                    <label for="email">Email</label>
                                    <md-input name="register.email" id="register.email" type="email" v-model="register.email" />
                                </md-field>
                                </div>

                                <div class="md-layout-item md-small-size-100">
                                <md-field>
                                    <label for="repeat-email">Repeat email</label>
                                    <md-input name="register.repeat-email" id="register.repeat-email" type="email" v-model="register.reEmail" />
                                </md-field>
                                </div>

                                <div class="md-layout-item md-small-size-100">
                                    <md-checkbox v-model="register.terms">* I agree to <a>terms</a> </md-checkbox>
                                    <md-checkbox v-model="register.newsletter">I want to receive newsletter</md-checkbox>
                                </div>
                            </div>

                            <md-progress-bar md-mode="indeterminate" v-if="state" />

                            <md-card-actions>
                                <md-button type="submit" class="md-primary" :disabled="state">Register</md-button>
                                <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                            </md-card-actions>
                    </md-card>
                </form>
                
                </md-tab>
            </md-tabs>

        </md-dialog>
        <!-- 
        <div class="loginContainer col-sm-6 offset-sm-4">
            <div class="row">
                <div class="loginContainer col-sm-12">
                    <div class="close-button-div d-flex">
                        <h2 class="">Login</h2>
                        <div class="ml-auto">
                            <i class="material-icons" v-on:click="hideWindow">close</i>
                        </div>
                    </div>
                    <form @submit.prevent="logIn">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                            <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
                        </div>
                        <div class="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary">Login</button>
                            <img v-show="state" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        -->
</div>
</template>

<script>
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
import Vuelidate from 'vuelidate'
import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    data() {
        return {
            login: {
                username: '',
                password: ''
            },
            submitted: false,
            showDialog: true,
            register: {
                username: null,
                password: null,
                email: null,
                reEmail: null,
                newsletter: false,
                terms: false
            },
            test: {
                input: null
            }
        }
    },
    validations: {
        login: {
            username: {
                required: true,
                minLength: minLength(3)
            },
            password: {
                required: true,
                minLength: minLength(6)
            },
        },
        test: {
            input: {
                required: true
            }
        }
    },
    computed: {
        state(){
            return this.$store.state.loginStatus == "logginIn";
        }
    },
    methods: {
        logIn: function() {
            this.$store.dispatch('logIn', { username: this.login.username, password: this.login.password });
        },
        hideWindow: function() {
            this.$store.dispatch('hideLoginWindow');
        },
        validateUser () {
            this.$v.$touch()
            if (!this.$v.login.$invalid) {
                this.logIn();
            }
        },
        getValidationClass (fieldName) {
            const field = this.$v.login[fieldName]
            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty
                }
            }
        },
    },
    watch: {
        showDialog: function(val) {
            if (val == false)
            this.$store.dispatch('hideLoginWindow');  
        }
    },
    mounted: function() {
    }
}
</script>

<style scoped>
.loginContainer {
    background-color: rgb(92, 85, 85);
    -webkit-box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
    box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
}

.close-button-div {
    display: inline;
    padding: 15px 0px 15px 0px;
}

.no-shadow 
{
    box-shadow: none;
}

.close-button-div i {
    cursor: pointer;
      -webkit-transition: -webkit-transform .8s ease-in-out;
          transition:         transform .8s ease-in-out;
}

.close-button-div i:hover {
    cursor: pointer;
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

</style>
