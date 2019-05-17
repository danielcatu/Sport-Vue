import Api from '@/services/Api'

export default {
    register (credentials) {
        return Api().post('api/usuario/register', credentials)
    },
    login (credentials) {
        return Api().post('api/usuario/login', credentials)
    },
}