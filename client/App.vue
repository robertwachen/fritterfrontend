<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <router-view />
  </div>
</template>

<script lang="ts">
  import NavBar from '@/components/common/NavBar.vue';

  export default {
    name: 'App',
    components: {NavBar},
    beforeCreate() {
      // Sync stored username to current session
      fetch('/api/users/session', {
        credentials: 'same-origin' // Sends express-session credentials with request
      }).then(res => res.json()).then(res => {
        const user = res.user;

        this.$store.commit('setUsername', user ? user.username : null);
        this.$store.commit('setAccountType', user ? user.accountType : null);
        this.$store.commit('setFirstName', user ? user.firstName : null);
        this.$store.commit('setLastName', user ? user.lastName : null);
        this.$store.commit('setEmail', user ? user.email : null);
        this.$store.commit('setPhone', user ? user.phone : null);
        this.$store.commit('setBirthday', user ? user.birthday : null);
        this.$store.commit('setVerifiedClubs', user ? user.verifiedClubs : null);
        this.$store.commit('setPendingClubs', user ? user.pendingClubs : null);
        this.$store.commit('setFeed', user ? 'Main' : null);
      });

      // Clear alerts on page refresh
      this.$store.state.alerts = {};
    }
  };
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  height: 100vh;
  flex-direction: column;
  display: flex;
  padding: 0;
  margin: 0;
  font-size: 1.2em;
}

main {
  padding: 0 5em 5em;
}

.alerts {
    position: absolute;
    z-index: 99;
    bottom: 0;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 10%);
    width: 100%;
    text-align: center;
}

.alerts article {
    border-radius: 5px;
    padding: 10px 20px;
    color: #fff;
}

.alerts p {
    margin: 0;
}

.alerts .error {
    background-color: rgb(166, 23, 33);
}

.alerts .success {
    background-color: rgb(45, 135, 87);
}
</style>
