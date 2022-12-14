import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    filters: null,
    freets: [], // All freets created in the app
    username: null, // Username of the logged in user
    accountType: null, // Account type of the logged in user. Either 'Verified' or 'Anonymous'
    firstName: null, // First name of the logged in user
    lastName: null, // Last name of the logged in user
    email: null, // Email of the logged in user
    phone: null, // Phone number of the logged in user
    birthday: null, // Birthday of the logged in user
    verifiedClubs: [], // Array of verified clubs the user is a member of
    pendingClubs: [], // Array of pending clubs the user is a member of
    alerts: {}, // global success/error messages encountered during submissions to non-visible forms
    feed: null, // The feed to display on the home page
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    setAccountType(state, accountType) {
      /**
       * Update the stored accountType to the specified one.
       * @param accountType - new accountType to set
       * 
       */
      state.accountType = accountType;
    },
    setFirstName(state, firstName) {
      /**
       * Update the stored firstName to the specified one.
       * @param firstName - new firstName to set
       * 
       */
      state.firstName = firstName;
    },
    setLastName(state, lastName) {
      /**
       * Update the stored lastName to the specified one.
       * @param lastName - new lastName to set
       * 
       */
      state.lastName = lastName;
    },
    setEmail(state, email) {
      /**
       * Update the stored email to the specified one.
       * @param email - new email to set
       * 
       */
      state.email = email;
    },
    setPhone(state, phone) {
      /**
       * Update the stored phone to the specified one.
       * @param phone - new phone to set
       * 
       */
      state.phone = phone;
    },
    setBirthday(state, birthday) {
      /**
       * Update the stored birthday to the specified one.
       * @param birthday - new birthday to set
       * 
       */
      state.birthday = birthday;
    },
    setVerifiedClubs(state, verifiedClubs) {
      /**
       * Update the stored verifiedClubs to the specified one.
       * @param verifiedClubs - new verifiedClubs to set
       * 
       */

      state.verifiedClubs = verifiedClubs;
      console.log('setVerifiedClubs', state.verifiedClubs);
    },
    setPendingClubs(state, pendingClubs) {
      /**
       * Update the stored pendingClubs to the specified one.
       * @param pendingClubs - new pendingClubs to set
       * 
       */
      state.pendingClubs = pendingClubs;
    },
    updateFilter(state, newFilter) {
      /**
       * Accepts one filter at a time and updates the filters object.
       * @param newFilter = {name: 'XXX', value: 'YYY'} -> ?name=value
       */

      try {
        console.log(state.filters.entries())
      } catch (e) {
        state.filters = new URLSearchParams();
        console.log('filters was null')
      }

      if (newFilter) {
        if ((newFilter.value === '') || (newFilter.name === 'clubName' && newFilter.value === 'Main')) 
        {
          state.filters.delete(newFilter.name);
        } else 
        {
          state.filters.set(newFilter.name, newFilter.value);
          console.log(state.filters.toString());
        }
      }
    },
    updateFreets(state, freets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.freets = freets;
    },
    async refreshFreets(state) {
      /**
       * Request the server for the currently available freets.
       */

      const queryString = state.filters.toString()
      const url = queryString ? `/api/freets?${queryString}` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;
    },
    setFeed(state, feed) {
      /**
       * Update the stored feed to the provided feed.
       * @param feed - Feed to display on the home page
       */
      state.feed = feed;
    }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
