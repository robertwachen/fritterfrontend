<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
    <main>
      <section>
        <header>
          <h2>Join clubs for @{{ $store.state.username }}</h2>
        </header>
        <section
          v-if="$store.state.accountType === 'verified'"
        >
          <header>
            <h4>Verified account</h4>
            <p>To change profile data besides clubs, please email team@fritter.com.</p>
          </header>
        </section>
        <section
          v-if="$store.state.accountType === 'anonymous'"
        >
          <header>
            <h4>Anonymous Account</h4>
            <p>As an anonymous account, you can only join public clubs.</p>
          </header>
        </section>
        <section>
          <b>Your Clubs:</b>
          <ul>
            <li
              v-for="club in $store.state.verifiedClubs"
            >
              {{ club }}
            </li>
          </ul>
          <br/>
        </section>
        <JoinClubForm />
        
      </section>
    </main>
  </template>
  
  <script>
  import JoinClubForm from '@/components/Club/JoinClubForm.vue';
  
  export default {
    name: 'ClubPage',
    components: {
      JoinClubForm
    }
  };
  </script>
  