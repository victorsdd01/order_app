<template>
  <v-container class="fill-height">
      <v-row no-gutters>
        <v-col>
          <v-row v-if="loading" justify="center" align="center" no-gutters>
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-row>
          <template v-else>
            <v-row no-gutters justify="space-between" align="center">
              <span class="text-h4 font-weight-bold">Orders</span>
              <span class="text-h6 font-weight-bold">Total: {{ orders.length}}</span>
            </v-row>
            <v-table>
              <thead>
                <tr>
                  <th></th>
                  <th class="text-left">
                    Order id
                  </th>
                  <th class="text-left">
                    Status
                  </th>
                  <th class="text-left">
                    Currency
                  </th>
                  <th class="text-left">
                    Total
                  </th>
                  <th class="text-left">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order, index) in orders" :key="order.id">
                  <td class="text-left">
                    {{ index+1}}
                  </td>
                  <td class="text-left">
                    <v-row no-gutters>
                      <span class="text-body">{{order.id}}</span>
                      <v-icon class="mx-3" @click="copyOrderId(order.id)">{{'mdi-content-copy'}}</v-icon>
                    </v-row>
                  </td>
                  <td class="text-left">
                    <v-chip density="compact" :color="order.payment.status === 'paid' ? 'green' : 'red'">{{ order.payment.status }}</v-chip>
                  </td>
                  <td class="text-left">{{ order.currency }}</td>
                  <td class="text-left">{{ '$'+order.totals.total }}</td>
                  <td class="text-left">
                    <v-btn class="bg-primary" flat @click="$router.push({ name: 'Order', params: { id: order.id } })" >See order</v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </template>
        </v-col>
      </v-row>
      <v-snackbar v-model="showSnackbar">
        <span class="text-body font-weight-regular">{{ 'Copy successfully' }}</span>
      </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {

  computed: {
    ...mapGetters('orders', {
      orders: 'GET_ORDERS',
      loading: 'GET_LOADING'
    })
  },
  data:() => ({
    showSnackbar: false,
  }),
  methods:{
    ...mapActions('orders', {
      fetchAllOrders :'FETCH_ALL_ORDERS'
    }),
    copyOrderId(orderId){
      navigator.clipboard.writeText(orderId).then(()=>{
        this.showSnackbar = true
      })
    }
  },
  mounted(){
    this.fetchAllOrders()
  }
}
  
</script>
