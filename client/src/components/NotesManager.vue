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
                <textarea name="content" id="content" cols="30" rows="10" v-model="content"></textarea>
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

    <h2>Notes</h2>

    <div class="notes">
        <div class="note" v-for="note in allNotes" :key="note._id">
            <h2>{{ note.title }}</h2>
            <!-- <select v-model="category" class="noteCategory">
                <option v-for="category in categories" :key="category.name" >
                    {{ category.name }}
                </option>
            </select> -->
            <p>{{ note.category }}</p>
            <textarea name="" id="" class="noteContent" cols="30" rows="6" v-model="note.content" @blur="saveChanges(note._id, $event)"></textarea>
            <a @click="onDelete(note._id)">
                <i class="fas fa-trash-alt"></i>
            </a>
        </div>
    </div>

    </div>
</template>
<script>
export default {
    name: 'Notes',
    data() {
        return {
            allNotes: null,
            note: null,
            users: null,
            title: null,
            category: null,
            categories: [
                {name: "Books"},
                {name: "CDS"}
            ],
            content: null,
            author: null,
            authors: null,
            editNote: null
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
        getNote(noteId) {
            fetch(`http://localhost:9000/api/notes/${noteId}`)
            .then(res => res.json())
            .then(data => {
                this.editNote = data;
            })
            .catch((err) => {
                console.err(err);
                console.log("Error:", err);
            })
        },
        getUsers() {
            fetch("http://localhost:9000/api/users")
            .then(res => res.json())
            .then(data => {
                this.authors = data;
                this.users = data;
            })
            .catch((err) => {
                console.err(err);
                console.log("Error:", err);
            })
        },
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
        saveChanges(noteId, event) {
            const noteContent = {
                content: event.target.value
            }
            fetch(`http://localhost:9000/api/notes/${noteId}`, {
                method: "PUT",
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify(noteContent)
            })
                .then(res => res.json())
                .then(data => {
                    this.getNotes();
                })
                .catch(err => {
                    console.log("error:", err);
                })
        }
    },
    // computed: {
    //     filteredOptions(){
    //         return this.categories;
    //     }
    // },
    created() {
        this.getUsers();
        this.getNotes();
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

/* Note */
.note {
    border: 2px solid white;
    background-color:rgba(3, 83, 110, 0.5);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    max-width: 960px;
    margin: 0 auto;
}
.note:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.noteCategory {
    display: block;
    margin: 0 auto;
    width: 60%;
}
.noteContent {
    display: block;
    margin: 0 auto;
    width: 60%;
}
.note textarea {
    background-color: transparent;
    border: none;
    color: white;
}
</style>