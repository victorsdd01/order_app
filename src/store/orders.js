import axiosInstance from "@/api/axios"

export default {
    namespaced: true,
    state:{
        orders: null,
        loading: true,
    },
    getters:{
        GET_ORDERS: state => state.orders,
        GET_LOADING: state => state.loading,
    },
    mutations:{
        SET_ORDERS: (state, orders) => {
          state.orders = orders
        },
        SET_LOADING: (state, value)=>{
            state.loading = value
        },
    },
    actions:{
        FETCH_ALL_ORDERS: ({commit}) => {
            return new Promise((resolve, reject) => {
                axiosInstance.get('/orders')
                .then(resp => {
                    const {orders} = resp.data
                    commit('SET_ORDERS', orders)
                    resolve(resp)
                })
                .catch(err => {
                    console.error('Something wrong trying to fetch all orders')
                    reject(err)
                }).finally(() => {
                    commit('SET_LOADING', false)
                })
            })
        },
        ADD_NEW_PRODUCT: async ({state}, data) => {
            const { items } = state.orders.find(order => order.id === data.orderId)
            const product = items.some(product_1 => product_1.id === data.newProduct.id)
            if(!product){
                items.push(data.newProduct)
                return true
            }
            return false
        },
    }
}