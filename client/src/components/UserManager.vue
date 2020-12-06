<template>
  <div class="hello">
      <h2>User Table</h2>

      <!-- Users table -->
      <table id="userTable">
        <tr>
          <!-- <th>ID</th> -->
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
        <tr v-for="user in this.data" :key="user._id">
          <!-- <td>{{ user._id }}</td> -->
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.age }}</td>
          <td>
            <a @click="onEdit(user._id)">
              <i class="fas fa-edit"></i>
            </a>
            &nbsp;
            <a @click="onDelete(user._id)">
              <i class="fas fa-trash-alt"></i>
            </a>
          </td>
        </tr>
        <tr>
            <td colspan="5">
                <button id="showAddUserButton" @click="showAddUser">Add User</button>
            </td>
        </tr>
        <tr id="addUserForm" style="display: none;">
            <td>
                <input type="text" v-model="firstName" placeholder="First Name" id="firstName">
            </td>
            <td>
                <input type="text" v-model="lastName" placeholder="Last Name">
            </td>
            <td>
                <input type="text" v-model="age" placeholder="Age">
            </td>
            <td>
                <button @click="onSubmit">
                    <i class="fas fa-check"></i>
                </button>
            </td>
            <td>
                <button @click="showAddUser">
                    <i class="fas fa-times"></i>
                </button>
            </td>
        </tr>
      </table>

      <edit-user v-if="showEditMenu" :user-id="editUser._id" @show-edit-menu="toggleEditMenu" />

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
      userData: null,
      data: '',
      response: '',
      users: [],
      editUser: {},
      myName: "Alexander Ege",
      showEditMenu: false
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
        document.getElementById("firstName").focus();
        })
      .catch(err => console.log("error:", err));
    },

    //Show add user
    showAddUser() {
        console.log("Showing added user");
        var addUser = document.getElementById("addUserForm");
        var addButton = document.getElementById("showAddUserButton");
        var firstNameInput = document.getElementById("firstName");
        if(addUser.style.display == "none"){
            addButton.style.display = "none";
            addUser.style.display = "table-row";
        } else {
            addButton.style.display = "table-row";
            addUser.style.display = "none";
        }
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
      fetch(`http://localhost:9000/api/${id}`, {
        method: "PUT",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .then((data) => {
        this.edit_first_name = '';
        this.edit_last_name = '';
        this.edit_age = '';
        //Update user table
        this.getUsers();
      })
    },

    // Open Edit Form
    onEdit(id) {
      this.showEditMenu = false;
      fetch(`http://localhost:9000/api/${id}`)
      .then((res) => res.json())
      .then((data) => {
        this.showEditMenu = true;
        this.edit_first_name = data.firstName;
        this.edit_last_name = data.lastName;
        this.edit_age = data.age;
        this.edit_id = data._id;
        this.editUser = data;
        this.userData = data;
      })
    },

    toggleEditMenu() {
      this.showEditMenu = false;
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
button {
    color: #42b983;
    background: rgba(0, 0, 0, 0); 
    border: none; 
    width: 100%; 
}
button:hover {
    color: #15293d;
    background-color: #42b983;
}
#addUserForm td input[type=text] {
    color: #42b983;
    background-color: transparent;
    border: 1px solid #42b983;
}
#showAddUserButton {
    color: #42b983;
    background: rgba(0, 0, 0, 0); 
    border: none; 
    width: 100%; 
}
#showAddUserButton:hover {
    color: #15293d;
    background-color: #42b983;
}
table {
  min-width: 600px;
  margin: 0 auto;
}
table {
  border: 1px solid black;
}
table > tr:first-child {
    font-size: 20px;
    border-bottom: 5px solid black;
    padding: 10px;
}
#userTable {
    border: 1px solid white;
    padding: 10px;
    height: 400px;
    overflow-y:scroll;
}
table th {
  padding: .5em;
  color: #42b983;
}
</style>
