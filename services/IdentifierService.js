import Api from '@/services/Api'

export default {
    register (credentials) {
        return Api().post('api/usuario/registro', credentials)
    },
    login (credentials) {
        return Api().post('api/usuario/login', credentials)
    },
    showFields(){
        return Api().get('api/cancha')
    },
    storeField(credentials){
        return Api().post('api/cancha', credentials)
    }
}