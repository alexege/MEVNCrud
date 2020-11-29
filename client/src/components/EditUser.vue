<template>
    <div>
        <h2>Edit Page</h2>
        ID: {{ editId }}

        <div>
            <div>
              <label for="">FirstName:</label>
              <input type="text" :value="editId">
            </div>
            <div>
              <label for="">LastName:</label>
              <input type="text">
            </div>
            <div>
              <label for="">Age:</label>
              <input type="text">
            </div>
          </div>

          <button @click="onSubmit">Submit</button>
          <button @click="onClickButton">onClickButton</button>

    </div>
</template>
<script>
export default {
    name: 'EditUser',
    props: ["editId"],
    data() {
        return {
            
        }
    },
    methods: {
        printDetails() {
            console.log("Details:", this.editId);
        },
        onSubmit(event) {
            this.$emit('editId', this.editId)
        },
        onClickButton(event) {
            this.$emit('clicked', 'someValue')
        }
    },
    started() {
        this.printDetails();
    }

}
</script>