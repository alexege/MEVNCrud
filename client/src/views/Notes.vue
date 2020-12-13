<template>
    <div class="notes">
        <NotesManager />
    </div>
</template>

<script>
import NotesManager from '../components/NotesManager.vue';

export default {
    name: "notes",
    components: {
        NotesManager
    }
};
</script>