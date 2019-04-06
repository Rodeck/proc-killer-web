<template>
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
</template>

<script>
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            username: '',
            password: '',
            submitted: false
        }
    },
    computed: {
        state(){
            return this.$store.state.loginStatus == "logginIn";
        }
    },
    methods: {
        logIn: function() {
            this.$store.dispatch('logIn', { username: this.username, password: this.password });
        },
        hideWindow: function() {
            this.$store.dispatch('hideLoginWindow');
        }
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
