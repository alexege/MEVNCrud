<template>
    <div>
        <h2>Edit User</h2>
        <form v-on:submit.prevent="updateUser()">
            <ul class="wrapper">
                <li class="form-row">
                    <label for="">First Name:</label>
                    <input type="text" v-model="user.firstName">
                </li>
                <li class="form-row">
                    <label for="">Last Name:</label>
                    <input type="text" v-model="user.lastName">
                </li>
                <li class="form-row">
                    <label for="">Age:</label>
                    <input type="text" v-model="user.age">
                </li>
                <li class="form-row">
                    <button type="submit">Submit</button>
                    <button type="button" @click="toggleVisibility">Cancel</button>
                </li>
            </ul>
        </form>
    </div>
</template>
<script>
export default {
    name: 'EditUser',
    props: [ "userId" ],
    data() {
        return {
            user: {},
        }
    },
    methods: {
        
        //Get User
        fetchUser() {
            console.log("Fetching User!");
            fetch(`http://localhost:9000/api/users/${this.userId}`, {
                method: "GET"
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("Data:", data);
                this.user = data;
            })
        },

        toggleVisibility() {
            this.$emit('show-edit-menu');
        },

        // Update User
        updateUser() {
            console.log("Updating User!");
            const data = {
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                age: this.user.age
            }
            fetch("http://localhost:9000/api/users/" + this.userId, {
                method: "PUT",
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify(data)
            })
                .then((res) => res.json())
                .then((data) => {
                    this.$parent.getUsers();
                    this.$emit('show-edit-menu');
            })
        }
    },
    mounted() {
        this.fetchUser();
    }
}
</script>
<style>
  .wrapper {
    max-width: 600px;
    margin: 0 auto;
    list-style-type: none;
    padding: 0;
    border-radius: 3px;
  }
  .form-row {
    display: flex;
    justify-content: flex-end;
    padding: .5em;
  }
  .form-row > label {
    padding: .5em 1em .5em 0;
    flex: 1;
  }
  .form-row > input {
    flex: 2;
  }
  .form-row > input,
  .form-row > button {
    padding: .5em;
  }
  .form-row > button {
   background: gray;
   color: white;
   border: 0;
   margin: .5em;
  }
</style>