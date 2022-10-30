<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Account settings for @{{ $store.state.username }}</h2>
      </header>
      <section
        v-if="$store.state.accountType === 'verified'"
      >
        <header>
          <h4>Verified account</h4>
          <p>To change profile data besides clubs, please email team@fritter.com.</p>
        </header>
        <AccountDataTable />
      </section>
      <section
        v-if="$store.state.accountType === 'anonymous'"
      >
        <header>
          <h4>Anonymous Account</h4>
        </header>
        <ChangeUsernameForm />
        <ChangePasswordForm />
      </section>
      
    </section>
    <section>
      <header>
        <h2>Account management</h2>
      </header>
      <LogoutForm />
      <DeleteAccountForm />
    </section>
  </main>
</template>

<script>
import ChangeUsernameForm from '@/components/Account/ChangeUsernameForm.vue';
import ChangePasswordForm from '@/components/Account/ChangePasswordForm.vue';
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';
import LogoutForm from '@/components/Account/LogoutForm.vue';
import AccountDataTable from '@/components/Account/AccountDataTable.vue';

export default {
  name: 'AccountPage',
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
    AccountDataTable,
    LogoutForm
  }
};
</script>
