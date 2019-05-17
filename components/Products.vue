<template>
  <div>
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="https://www.como.gov/parksandrec/wp-content/uploads/sites/25/2017/03/cosmo_soccer_13-15-300x225.jpg" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">Cancha {{ product.id }}</p>
        </div>
        
        <div>
          <button class="button is-small" :title="removeFromFavouriteLabel" v-show="product.isFavourite" @click="removeFromFavourite(product.id)">
            <span class="icon is-small">
              <i class="fa fa-heart"></i>
            </span>
          </button>
          <button class="button is-small" :title="addToFavouriteLabel" v-show="!product.isFavourite" @click="saveToFavorite(product.id)">
            <span class="icon is-small">
              <i class="fa fa-heart-o"></i>
            </span>
          </button>
        </div>
      </div>
      <div class="content is-clearfix">
        <p>Esta es la cancha {{ product.id }}</p>
        <div class="media-content">
          <p class="title is-4">{{ product.ubicacion }}</p>
        </div>
        <div class="media-content">
          <p class="title is-4">Horario 08:00 - 18:00</p>
        </div>
        <div class="is-pulled-left">
          <i v-if="product.puntaje === 1" class="fa fa-star"></i>
          <i v-if="product.puntaje === 2" class="fa fa-star"></i>
          <i v-if="product.puntaje === 2" class="fa fa-star"></i>
          <i v-if="product.puntaje === 3" class="fa fa-star"></i>
          <i v-if="product.puntaje === 3" class="fa fa-star"></i>
          <i v-if="product.puntaje === 3" class="fa fa-star"></i>
          <i v-if="product.puntaje === 4" class="fa fa-star"></i>
          <i v-if="product.puntaje === 4" class="fa fa-star"></i>
          <i v-if="product.puntaje === 4" class="fa fa-star"></i>
          <i v-if="product.puntaje === 4" class="fa fa-star"></i>
          <i v-if="product.puntaje === 5" class="fa fa-star"></i>
          <i v-if="product.puntaje === 5" class="fa fa-star"></i>
          <i v-if="product.puntaje === 5" class="fa fa-star"></i>
          <i v-if="product.puntaje === 5" class="fa fa-star"></i>
          <i v-if="product.puntaje === 5" class="fa fa-star"></i>
          <p>{{ product.reviews > 0 ? `${product.reviews} Reviews` : 'No reviews' }}</p>
        </div>
        <p class="is-pulled-right">
          <span class="title is-4"><strong>&euro; {{ product.price }}</strong></span>
        </p>
      </div>
      <Scheldule-component></Scheldule-component>
      <div class="card-footer btn-actions">
        <div class="card-footer-item field is-grouped">
          <div class="buttons">
            <!-- <button class="button is-primary" v-if="!product.isAddedToCart" @click="addToCart(product.id)">{{ addToCartLabel }}</button> -->
            <Scheldule-component></Scheldule-component>
            <button class="button is-primary" @click="showCheckoutModal">{{ addToCartLabel }}</button>
            <button class="button is-text" v-if="product.isAddedToCart" @click="removeFromCart(product.id, false)">{{ removeFromCartLabel }}</button>
          </div>
           <div class="select is-rounded is-small">
            <select @change="onSelectQuantity(product.id)" v-model="selected">
              <option v-for="quantity in quantityArray" :key="quantity.id">{{ quantity }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <nuxt-link
      class="details"
      :to="{
        name: 'product_detail-id',
        params: {
          id: product.id,
          title: product.title,
          price: product.price,
          rating: product.ratings,
          reviews: product.reviews,
          isAddedBtn: product.isAddedBtn
        }
      }"
    >
    </nuxt-link>
  </div>
</template>

<script>

export default {
  name: 'products',
  props: ['product'],

  data () {
    return {
      addToCartLabel: 'Reservar',
      viewDetailsLabel: 'Detalles',
      removeFromCartLabel: 'Remover del carrito',
      addToFavouriteLabel: 'Añadir a favoritos',
      removeFromFavouriteLabel: 'Remover de favoritos',
      selected: 1,
      quantityArray: []
    }
  },

  mounted () {
    for (let i = 1; i <= 20; i++) {
      this.quantityArray.push(i);
    }

    if (this.$props.product.quantity > 1) {
      this.selected = this.$props.product.quantity;
    }
  },

  computed: {
    isUserLogged () {
      return this.$store.getters.isUserLoggedIn;
    }
  },

  methods: {
    addToCart (id) {
      let data = {
        id: id,
        status: true
      }
      this.$store.commit('addToCart', id);
      this.$store.commit('setAddedBtn', data);
    },
    removeFromCart (id) {
      let data = {
        id: id,
        status: false
      }
      this.$store.commit('removeFromCart', id);
      this.$store.commit('setAddedBtn', data);
    },
    saveToFavorite (id) {
      let isUserLogged = this.$store.state.userInfo.isLoggedIn;

      if (isUserLogged) {
        this.$store.commit('addToFavourite', id);
      } else {
        this.$store.commit('showLoginModal', true);
      }
    },
    removeFromFavourite (id) {
      this.$store.commit('removeFromFavourite', id);
    },
    onSelectQuantity (id) {
      let data = {
        id: id,
        quantity: this.selected
      }
      this.$store.commit('quantity', data);
    },
      showCheckoutModal () {
        this.$store.commit('showReserve', true);
      }
  }
}
</script>

<style lang="scss" scoped>

 .title{
   margin-top: 10px;
 }

 .details {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    &:hover {
      border: 1px solid #51bafc;
    }
 }
 .button,
 .select {
   z-index: 2;
 }
 .select {
   position: absolute;
   right: 15px;
   bottom: 35px;
 }
 .card-content {
   padding: 0;
 }
 .buttons {
   margin: 0;
 }
</style>


