<template>
    <!-- <NavBar /> -->
    <nav>
        <router-link class="navLink" 
        to="/"
        @click.native="updateFeed('Main')"
        >
        Main
        </router-link>
        <!-- <router-link
            class="navLink"
            v-for="club in $store.state.clubs"
            :key="club.id"
            :to="'/club/' + club.id"
        >
        {{ club.name }}
        </router-link> -->
        <router-link
            class="navLink"
            v-for="club in clubs"
            :to="'?club=' + club"
            @click.native="updateFeed(club)"
        >
        {{ club }}
        </router-link>
      </nav>
</template>

<script>
import BlockForm from '@/components/common/BlockForm.vue';
import NavBar from '@/components/common/NavBar.vue';
import store from '@/store';

const clubs = ['test', 'test2', 'test3'];
const updateFeed = (club) => {
    const newFilter = {
        name: 'clubName',
        value: club
    };
    store.commit('updateFilter', newFilter);
}

export default {
  name: 'ClubNavBar',
  components: {NavBar},
    data() {
        return {
        clubs,
        updateFeed
        };
    },
};
</script>

<style scoped>
nav {
    padding: 1vw 2vw;
    background-color: #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.navLink {
    font-size: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    text-decoration: none;
    color: black;
}

</style>