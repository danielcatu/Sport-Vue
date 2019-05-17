<template>
  <div class="section">
    <h3 class="title">{{ getUserName }}.</h3>
    <div class="columns is-centered is-multiline">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <h4>{{ getUserName }}</h4>
            <p>{{ getUserBio }}</p>
            <div>
              <button
                class="btn btn-sm btn-secondary action-btn"
              >
                <i class="ion-plus-round"></i> &nbsp;Unfollow
                {{ getUserName }}
              </button>
              <button
                class="btn btn-sm btn-outline-secondary action-btn"
              >
                <i class="ion-plus-round"></i> &nbsp;Follow
                {{ getUserName }}
              </button>
            </div>
          </div>
        
    </div>
  </div>
</template>

<script>
import VmProductsList from '@/components/Products';
import { getByTitle } from '@/assets/filters';

export default {
	name: 'user-profile',

	data () {
    return {
      pageTitle: 'Welcome, User.',
      noProductLabel: 'Your wishlist is empty',
      getUserBio: 'User\'s biography goes here.'
    }
  },

  components: { VmProductsList },

  computed: {
    productsInWishlist () {
      if (this.$store.state.userInfo.hasSearched) {
        return this.getProductByTitle();
      } else {
        return this.$store.getters.productsAddedToFavourite;
      }
    },
		getUserName () {
			let name = this.$store.getters.getUserName;
			
			if (name === '') {
				return 'User';
			} else {
				return name;
			}
    }
  },

  methods: {
    getProductByTitle () {
      let listOfProducts = this.$store.getters.productsAddedToFavourite,
          titleSearched = this.$store.state.userInfo.productTitleSearched;
      
      return this.productsFiltered = getByTitle(listOfProducts, titleSearched);
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    margin: 10px;
  }
</style>


