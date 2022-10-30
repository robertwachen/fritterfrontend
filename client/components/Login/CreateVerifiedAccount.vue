<!-- Form for registering an account (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateVerifiedAccount',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users',
      method: 'POST',
      hasBody: true,
      setUsername: true,
      fields: [
        {id: 'username', label: 'Username', value: ''},
        {id: 'password', label: 'Password', value: ''},
        {id: 'accountType', label: 'Account Type', value: '', type: 'dropdown', options: ['verified']},
        {id: 'firstName', label: 'First Name', value: ''},
        {id: 'lastName', label: 'Last Name', value: ''},
        {id: 'email', label: 'Email', value: ''},
        {id: 'phone', label: 'Phone', value: ''},
        {id: 'birthday', label: 'Birthday', value: '', type: 'date'}
      ],
      title: 'Create verified account',
      callback: () => {
        const message = 'Successfully created an account!';
        this.$router.push({name: 'Home'});
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
