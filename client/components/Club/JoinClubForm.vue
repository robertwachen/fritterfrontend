<!-- Form for registering an account (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'JoinClub',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users',
      method: 'PATCH',
      hasBody: true,
      setVerifiedClubs: true,
      fields: [
        {id: 'verifiedClubs', label: 'Club Name', value: ''},
      ],
      title: 'Join Club',
      callback: () => {
        const message = 'Form submitted!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
