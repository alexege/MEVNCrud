<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/mevn.jpg" width="350" /> -->
    <UserManager />
  </div>
</template>

<script>
// @ is an alias to /src
import UserManager from '../components/UserManager.vue';

export default {
  name: "home",
  components: {
    UserManager
  }
};
</script>
