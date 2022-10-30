<!-- Page for account sign-in and registration -->
<!-- User should be NOT authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>New to Fritter?</h2>
      </header>
      <CreateAnonAccount />
      <CreateVerifiedAccount />
    </section>
    <section>
      <header>
        <h2>Have an account?</h2>
      </header>
      <LoginForm />
    </section>
  </main>
</template>

<script>
import CreateVerifiedAccount from '@/components/Login/CreateVerifiedAccount.vue';
import CreateAnonAccount from '@/components/Login/CreateAnonAccount.vue';
import LoginForm from '@/components/Login/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: {
    CreateVerifiedAccount,
    CreateAnonAccount,
    LoginForm,
  }
};
</script>
