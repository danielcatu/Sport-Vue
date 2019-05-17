<template>
  <div class="columns is-centered is-multiline">
    <div class="card column is-one-quarter" v-for="product in products" :key="product.cid">
      <VmProducts :product="product"></VmProducts>
    </div>
    <div class="section" v-if="products.length === 0">
      <p>{{ noProductLabel }}</p>
    </div>
  </div>
</template>

<script>
import VmProducts from '../Products';
import IdentifierService from '@/services/IdentifierService'
import { getByTitle } from '@/assets/filters';

export default {
  name: 'productsList',
  
  components: { VmProducts },
  
  data () {
    return {
      id: '',
      canchas: [],
      noProductLabel: 'No se han encontrado canchas',
      productsFiltered: []
    };
  },

  mounted() {
    this.init();
  },

  computed: {
    products () {
      if (this.$store.state.userInfo.hasSearched) {
        return this.getProductByTitle();
      } else {
        return this.$store.state.products;
      }
    }
  },

  methods: {
    getProductByTitle () {
      let listOfProducts = this.$store.state.products,
          titleSearched = this.$store.state.userInfo.productTitleSearched;
      
      return this.productsFiltered = getByTitle(listOfProducts, titleSearched);
    },
    init: async function(){
    //   var canchas = [];
    //   date = new Date();
    //   date = ('00' + date.getUTCHours()).slice(-2) + ':' + 
    //   ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    //   ('00' + date.getUTCSeconds()).slice(-2);
    //   await IdentifierService.storeField({
    //     nombre: 'La cancha',
    //     ubicacion: 'calle 80',
    //     descripcion: 'cancha',
    //     puntaje: 4,
    //     fecha_inicio: ('00' + date.getUTCHours()).slice(-2) + ':' + 
    //   ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    //   ('00' + date.getUTCSeconds()).slice(-2),
    //     fecha_final: ('00' + date.getUTCHours()).slice(-2) + ':' + 
    //   ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    //   ('00' + date.getUTCSeconds()).slice(-2)
    //   }).then(function(response){
    //       canchas = response.data.canchas;
    //     }).catch(e => {
    //       console.log(e);
    //     }); 
    //   await IdentifierService.showFields().then(function(response){
    //       canchas = response.data.canchas;
    //     }).catch(e => {
    //       console.log(e);
    //     }); 
    //     this.canchas = canchas;
    //     console.log(this.canchas);
    // }
  }
  }

}
</script>

<style lang="scss" scoped>
  .card {
    margin: 10px;
  }
</style>
