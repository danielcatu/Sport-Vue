<template>
	<div :class="[ openModal ? 'is-active' : '', 'modal' ]">

 <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
				<p class="modal-card-title">{{ modalTitle }}</p>
				<button class="delete" aria-label="close" @click="closeModal(false)"></button>
        </v-card-title>

        <v-card-text>
           <v-flex>
      <v-sheet height="400" width="400">
				<v-date-picker v-model="picker" color="grey lighten-1" v-if="!daycalendar">
					
				</v-date-picker>
        <v-calendar
          color="grey lighten-1"
          type="day"
		  v-model="todayDate"
		  :now="todaydate"
		   @click:date="izi"
		   v-if="daycalendar"
        >
          <template v-slot:dayHeader="{ present }">
            <template
              v-if="present"
              class="text-xs-center"
            >
              Hoy
            </template>
          </template>

          <template v-slot:interval="{ hour }">
            <div
              class="text-xs-center"
            >
						<a @click="createReservation(fieldId, present, hour)">Reservar</a>
            </div>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
		</v-card-text>
			<v-divider></v-divider>
		</v-card>
	</div>
</template>

<script>
export default {
	name: 'checkout',
    
	data () {
		return {
			todayDate: new Date().toISOString().slice(0, 10),
			modalTitle: 'Carrito de reservas',
			picker: new Date().toISOString().substr(0, 10),
			daycalendar: true
		}
	},

	computed: {
			openModal () {
				if (this.$store.getters.isReserve) {
					return true;
				} else {
					return false;
				}
			},
		isUserLoggedIn () {
			return this.$store.getters.isUserLoggedIn;
		}
	},

	methods: {
		closeModal (reloadPage) {
			this.$store.commit('showReserve', false);

			if (reloadPage) {
				window.location.reload();
			}
		},
		onNextBtn () {
			if (this.isUserLoggedIn) {
				this.isCheckoutSection = true;
			} else {
				this.$store.commit('showReserve', false);
				this.$store.commit('showLoginModal', true);
			}
		},
		onPrevBtn () {
			this.isCheckoutSection = false;
		},
		createReservation (fieldId, present, hour) {
			if (this.isUserLoggedIn) {

			} else {
				this.$store.commit('showReserve', false);
				this.$store.commit('showLoginModal', true);
			}
		},
		izi(){
			this.daycalendar=false;
		}
	}
}
</script>

