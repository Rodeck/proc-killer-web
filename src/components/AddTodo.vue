<template>
        <div class="text-center border border-dark p-5 add-form">
            <div class="close-button-div d-flex">
                <div class="lds-ripple" v-bind:class="{ hide: !isLoading }"><div></div><div></div></div>
                <p class="h4 header col-sm-6 offset-sm-1">Add new todo</p>
                <div class="ml-auto">
                    <i class="material-icons" v-on:click="hideWindow">close</i>
                </div>
            </div>

            <!-- Name -->
            <input type="text" id="defaultContactFormName" class="form-control mb-4" placeholder="Name" v-model="name">

            <!-- Email -->
            <textarea class="form-control" rows="5" id="comment" placeholder="What needs to be done?" v-model="description"></textarea>

            <!-- Subject -->
            <label>Date</label>
            <input type="text" id="defaultContactFormName" class="form-control mb-4" v-model="date" readonly>

            <div class="alert alert-danger" v-if="showErrorMsg">
                <span class="h4 error-msg">{{errorMessage}}</span>
            </div>

            <!-- Send button -->
            <button class="btn btn-info btn-block" v-on:click="addTodo">Add</button>

        </div>
</template>

<script>

export default {
    data() {
        return {
            name: "",
            description: "",
        }
    },
    props: ['date'],
    computed: {
        isLoading() {
            return this.$store.getters.isAddingTodo;
        },
        showErrorMsg() {
            return this.$store.getters.showAddingTodoError;
        },
        errorMessage() {
            return this.$store.state.addingTodoErrorMessage;
        }
    },
    methods: {
        addTodo: function() {
            this.$store.dispatch('addTodo', { name: this.name, description: this.description, date: this.date});
        },
        hideWindow: function() {
            this.$store.dispatch('hideAddWindow');
        }
    }
}
</script>

<style scoped>

.add-form {
    background-color: gray;
    position: absolute;
    width: 30%;
    z-index: 10;
    margin-left: 25%;
    -webkit-box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
    box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
    margin-top: 10px;
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}

.header {
    padding-top: 14px;
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

.hide {
    visibility: hidden;
}

</style>
