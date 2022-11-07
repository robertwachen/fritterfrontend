<template>
    <!-- <NavBar /> -->
    <nav>
        <router-link class="navLink" 
        to="?"
        :style="getColor('Main')"
        @click.native="updateFeed('Main')"
        >
        Main
        </router-link>
        <router-link
            class="navLink"
            v-for="club in clubs"
            :to="'?club=' + club"
            :style="getColor(club)"
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

const clubs = store.state.verifiedClubs;
const updateFeed = (club) => {
    const newFilter = {
        name: 'clubName',
        value: club
    };
    store.commit('updateFilter', newFilter);
    store.commit('setFeed', club);
    store.commit('refreshFreets');
}

const getColor = (club) => {
    console.log('club', club)
    if (club === store.state.feed) {
        return 'color: #00f';
    }
    return 'color: #000';
}

export default {
  name: 'ClubNavBar',
  components: {NavBar},
    data() {
        return {
        clubs,
        updateFeed,
        getColor
        };
    },
};
</script>

<style scoped>
nav {
    padding: 1vw 2vw;
    background-color: #ccc;
    display: flex;
    justify-content: left;
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