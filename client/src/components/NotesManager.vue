<template>
    <div class="notes">

        <form @submit.prevent="onSubmit">
        <ul>
            <li>
                <label for="">Title:</label>
                <input type="text" v-model="title">
            </li>
            <li>
                <label for="">Category:</label>
                <select name="" id="" v-model="category">
                    <option v-for="category in categories" :key="category.name">
                        {{ category.name }}
                    </option>
                </select>
            </li>
            <li>
                <label for="">Content:</label>
                <input type="text" v-model="content">
            </li>
            <li>
                <label for="">Author:</label>
                <select name="" id="" v-model="author">
                    <option v-for="author in authors" :key="author._id" :value="author._id">
                        {{ author.firstName }}
                    </option>
                </select>
            </li>
            <li>
                <input type="submit" value="Add">
            </li>
        </ul>
        </form>

        <!-- <h2>Notes</h2>
        <table>
            <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Content</th>
                <th>Author</th>
            </tr>
            <tbody>
                <tr v-for="(note, index) in allNotes" :key="index">
                    <td>{{note.title}}</td>
                    <td>{{note.category}}</td>
                    <td>{{note.content}}</td>
                    <td>{{note.author}}</td>
                </tr>
            </tbody>
        </table> -->

    <h2>Users</h2>
    <table style="margin: 0 auto;">
        <tbody>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
        </tr>
        <tr v-for="user in this.users" :key="user._id">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.age }}</td>
        </tr>
        </tbody>
    </table>

    <h2>Notes</h2>
    <table style="margin: 0 auto;">
        <tbody>
            <tr>
                <th>Id:</th>
                <th>Title:</th>
                <th>Category:</th>
                <th>Content:</th>
                <th>AuthorId:</th>
                <th>Actions:</th>
            </tr>
            <tr v-for="note in allNotes" :key="note._id">
                <td>{{ note._id }}</td>
                <td>{{ note.title }}</td>
                <td>{{ note.category }}</td>
                <td>{{ note.content }}</td>
                <td>{{ note.author }}</td>
                <td>
                    <a @click="onEdit(note._id)">
                    <i class="fas fa-edit"></i>
                    </a>
                    &nbsp;
                    <a @click="onDelete(note._id)">
                    <i class="fas fa-trash-alt"></i>
                    </a>
                </td>
            </tr>
        </tbody>
    </table>

    </div>
</template>
<script>
export default {
    name: 'Notes',
    data() {
        return {
            allNotes: null,
            users: null,
            title: null,
            category: null,
            categories: [
                {
                    name: "Books"
                },
                {
                    name: "CDS"
                }
            ],
            content: null,
            author: null,
            authors: null
        }
    },
    methods: {
        onSubmit() {
            console.log(`Submitting form with: ${this.title}/${this.category}/${this.content}/${this.author}`);
            const postData = {
                title: this.title,
                category: this.category,
                content: this.content,
                author: this.author
            };
            fetch("http://localhost:9000/api/notes", {
                method: "POST",
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify(postData)
            })
            .then(res => res.json())
            .then(data => {
                //TODO do something after adding a new note
                this.allNotes = data;
                this.getNotes();
            })
            .catch(err => console.log("error:", err));
        },
        getNotes() {
            fetch("http://localhost:9000/api/notes/all")
            .then(res => res.json())
            .then((data) => {
                console.log("data", data);
                this.allNotes = data;
            })
        },
        getUsers() {
            fetch("http://localhost:9000/api/users")
            .then(res => res.json())
            .then(data => {
                // this.notes = data;
                this.authors = data;
                this.users = data;
            })
            .catch((err) => {
                console.err(err);
                console.log("Error:", err);
            })
        },
        // getAllNotes() {
        //     console.log("Get all notes");
        //     fetch("http://localhost:9000/api/getNotes")
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log("Do something");
        //         //TODO
        //     })
        //     .catch(err => console.log("error:", err));
        // }
        // Delete User
        onDelete(id) {
        fetch("http://localhost:9000/api/notes/" + id, {
            method: "DELETE",
            headers: { "Content-Type":"application/json" },
        })
            .then(res => res.json())
            .then(data => {
                this.getNotes();
            })
            .catch(err => {
                console.log("error:", err);
            })
        },
    },
    created() {
        this.getUsers();
        this.getNotes();
        // this.getAllNotes();
    }
}
</script>
<style>
ul {
    list-style: none;
}
table td {
    border: 1px solid white;
    padding: 0.5em;
}
h2 {
    color:#42b983;
}
</style>