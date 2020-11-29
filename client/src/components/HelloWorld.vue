<template>
  <div class="hello">
      <h2>User Table</h2>

      <!-- Users table -->
      <table style="border: 1px solid black">
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th colspan="2">Actions</th>
        </tr>
        <tr v-for="user in this.data" :key="user._id">
          <td>{{ user._id }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.age }}</td>
          <td><a @click="onEdit(user._id)">Edit</a></td>
          <td><a @click="onDelete(user._id)">Delete</a></td>
        </tr>
      </table>

      <!-- Add User -->
      <h2>Add User:</h2>
      <form v-on:submit.prevent="onSubmit">
        <input type="text" v-model="firstName" placeholder="First Name">
        <input type="text" v-model="lastName" placeholder="Last Name">
        <input type="text" v-model="age" placeholder="Age">
        <button>Add</button>
      </form>

      <!-- Edit User Component -->
        <div v-if="editUserFlag">
          <h2>Edit User:</h2>
          <div>
            <label for="">First Name: {{ editUser.firstName }}</label>
            <input type="text" v-model="edit_first_name" placeholder="firstName">
          </div>
          <div>
            <label for="">Last Name: {{ editUser.lastName }}</label>
            <input type="text" v-model="edit_last_name" placeholder="lastName">
          </div>
          <div>
            <label for="">Age: {{ editUser.age }}</label>
            <input type="text" v-model="edit_age" placeholder="age">
          </div>
          <button @click="update(edit_id)">Update</button>
        </div>
    </div>
</template>

<script>

import EditUser from "@/components/EditUser.vue"

export default {
  name: "HelloWorld",
  components: {
    EditUser
  },
  props: {},
  data() {
    return {
      firstName: null,
      lastName: null,
      age: null,
      data: '',
      response: '',
      users: [],
      edit_id: null,
      edit_first_name: null,
      edit_last_name: null,
      edit_age: null,
      edit_id: "40",
      editUser: false,
      editUserFlag: false
    }
  },
  methods: {
    // Add User
    onSubmit() {
      const postData = {
        "firstName": this.firstName,
        "lastName": this.lastName,
        "age": this.age
      };
      fetch("http://localhost:9000/api", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(postData)
      })
      .then(res => res.json())
      .then(data => {
        this.data = data;
        this.firstName = '';
        this.lastName = '';
        this.age = '';
        this.getUsers();
        })
      .catch(err => console.log("error:", err));
    },
    
    // Get all users
    getUsers() {
      fetch("http://localhost:9000/api")
      .then(res => res.json())
      .then(data => {
        this.data = data;
      })
    },

    // Delete User
    onDelete(id) {
      fetch("http://localhost:9000/api/" + id, {
        method: "DELETE",
        headers: { "Content-Type":"application/json" },
      })
      .then(res => res.json())
      .then(data => {
        this.getUsers();
      })
      .catch(err => {
        console.log("error:", err);
      })
    },

    // Update User
    update(id) {
      const data = {
        firstName: this.edit_first_name,
        lastName: this.edit_last_name,
        age: this.edit_age
      }
      fetch("http://localhost:9000/api/" + id, {
        method: "PUT",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .then((data) => {
        this.edit_first_name = '';
        this.edit_last_name = '';
        this.edit_age = '';
        this.editUserFlag = false;
        //Update user table
        this.getUsers();
      })
    },

    // Open Edit Form
    onEdit(id) {
      this.editUserFlag = true;
      fetch("http://localhost:9000/api/" + id, {
        method: "GET",
      })
      .then((res) => res.json())
      .then((data) => {
        this.edit_first_name = data.firstName;
        this.edit_last_name = data.lastName;
        this.edit_age = data.age;
        this.edit_id = data._id;
      })
    }
  },
  computed: {
    isDisabledComputed() {
      return this.firstName.length == 0;
    }
  },
  created() {
    this.getUsers();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
a:hover {
  cursor: pointer;
}
table {
  min-width: 600px;
  margin: 0 auto;
}
table, table th {
  border: 1px solid black;
}
</style>
