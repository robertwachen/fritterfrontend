<!-- Form for getting freets (all, from user) (inline style) -->

<script>
import InlineForm from '@/components/common/InlineForm.vue';

export default {
  name: 'GetFreetsForm',
  mixins: [InlineForm],
  data() {
    return {value: this.$store.state.filter};
  },
  methods: {
    async submit() {
      const currentFilters = this.$store.state.filters;

      console.log('currentFilters', currentFilters);

      const newFilter = {
        name: 'author',
        value: this.value,
      };

      console.log('****')
      console.log(newFilter)
      console.log('****')

      
      // iterate through all the curretnt filters to build a query string and add the new filter to the query string
      let queryString = '';
      if (currentFilters?.length) {
        queryString = '?';
        currentFilters.forEach((filter, index) => {
          if (index) {
            queryString += '&';
          }
          queryString += `${filter.name}=${filter.value}`;
        });
      }
      else {
        queryString = '?';
        queryString += `${newFilter.name}=${newFilter.value}`;
      }

      console.log(queryString)

      const url = queryString ? `/api/freets${queryString}` : '/api/freets';
      console.log('query', url)
      try {
        // const r = await fetch(url);
        // const res = await r.json();
        // if (!r.ok) {
        //   throw new Error(res.error);
        // }
        this.$store.commit('updateFilter', newFilter);
        // this.$store.commit('updateFreets', res);
      } catch (e) {
        if (this.value === this.$store.state.filter) {
          // This section triggers if you filter to a user but they
          // change their username when you refresh
          this.$store.commit('updateFilter', null);
          this.value = ''; // Clear filter to show all users' freets
          this.$store.commit('refreshFreets');
        } else {
          // Otherwise reset to previous fitler
          this.value = this.$store.state.filter;
        }

        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>
