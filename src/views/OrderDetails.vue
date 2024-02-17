<template>
  <v-row no-gutters>
    <v-col>
        <template v-if="orders && order">
            <v-row class="my-3 mx-3" no-gutters>
                <span class="text-h5 font-weight-bold"> Number of order: {{ '#'+order.number }}</span>
                <v-spacer></v-spacer>
                <v-btn class="mx-3 bg-light-blue" @click="pay">Pay</v-btn>
                <v-btn class="bg-primary" @click="addNewProduct">Add new product</v-btn>
            </v-row>
            <v-table class="mx-3">
              <thead>
                <tr>
                  <th class="text-left">
                    Sku
                  </th>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Quantity
                  </th>
                  <th class="text-left">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in order.items" :key="product.id">
                  <td class="text-left">{{ product.sku ? product.sku : '-' }}</td>
                  <td class="text-left">{{ product.name }}</td>
                  <td class="text-left">{{ product.quantity }}</td>
                  <td class="text-left">{{ '$'+product.price }}</td>
                </tr>
              </tbody>
            </v-table>
        </template>
        <v-row v-else no-gutters justify="center" align="center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-row>
    </v-col>
  </v-row>
  <AddNewProductDialog :show="addNewProductDialog" :justify-actions="'center'" @change-state="cancelForm($event)">
    <template #header>
        <span class="text-h5 font-weight-bold">Add new product</span>
    </template>
    <v-row class="my-2" no-gutters>
     <v-col>
      <v-form ref="newProductForm" @submit.prevent>
       <v-text-field
        v-model="input.sku"
        class="my-2"
        :rules="rules.skuRules"
        placeholder="Write the sku"
       >
       </v-text-field>
       <v-text-field
        v-model="input.name"
        class="my-2"
        :rules="rules.nameRules"
        placeholder="Write the name"
       >
       </v-text-field>
       <v-text-field
        v-model="input.quantity"
        class="my-2"
        :rules="rules.quantityRules"
        placeholder="Write the quantity"
       >
       </v-text-field>
       <v-text-field
        v-model="input.price"
        class="my-2"
        :rules="rules.priceRules"
        placeholder="Write the price"
       >
       </v-text-field>
      </v-form>
     </v-col>
    </v-row>
    <template #actions>
        <v-row no-gutters justify="end" align="center">
        <v-btn class="bg-primary" :loading="isLoading" flat @click="onSubmit">Add</v-btn>
        </v-row>
    </template>
  </AddNewProductDialog>
  <Success :show="success" :showCloseButton="false">
    <v-row no-gutters>
        <v-col>
            <v-row class="my-2" no-gutters justify="center" align="center">
                <v-icon size="90" color="green">mdi-check-circle</v-icon>
            </v-row>
            <v-row class="my-2" no-gutters justify="center" align="center">
                <span class="text-body font-weight-bold">Product added successfully!!</span>
            </v-row>
        </v-col>
    </v-row>
  </Success>
  <SuccessPaid :show="showPaidDialog" :showCloseButton="false">
    <v-row no-gutters>
      <v-col>
        <v-row no-gutters justify="center" align="center">
          <v-icon color="green" size="100">mdi-check-circle</v-icon>
        </v-row>
        <v-row no-gutters justify="center" align="center">
          <span class="text-body font-weight-bold">Paid successfully</span>
        </v-row>
      </v-col>
    </v-row>
  </SuccessPaid>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
export default {
    components:{
        AddNewProductDialog: defineAsyncComponent(() => import('@/components/Dialog.vue')),
        Success: defineAsyncComponent(() => import('@/components/Dialog.vue')),
        SuccessPaid: defineAsyncComponent(()=> import('@/components/Dialog.vue'))
    },
    computed: {
        ...mapGetters('orders', {
            orders: 'GET_ORDERS'
        }),
    },
    methods: {
        ...mapActions('orders',{
            addNewProductToOrder: 'ADD_NEW_PRODUCT',
        }),
        getOrder(id){
             return this.orders.find(order => order.id === id)
        },
        generateRandomId() {
            return Math.floor(Math.random() * 100000) + 1;
        },
        cancelForm() {
            this.addNewProductDialog = false
        },
        addNewProduct(){
            this.addNewProductDialog = true
        },
        onSubmit(){
            this.$refs.newProductForm.validate().then(value => {
                if(value.valid){
                    this.isLoading = true
                    const newProduct = {
                        id: this.generateRandomId(),
                        sku:this.input.sku,
                        name:this.input.name,
                        quantity:this.input.quantity,
                        price:this.input.price,
                    }
                    setTimeout(() => {
                        
                        this.addNewProductToOrder({
                            orderId:this.$route.params.id,
                            newProduct
                        }).then(value => {
                            if(!value) return this.error = true
                            this.addNewProductDialog = false;
                            this.success = true
                            this.$refs.newProductForm.reset();
                            setTimeout(() => {
                                this.success = false
                            }, 2000);
                        }).finally(() => this.isLoading = false)
                    }, 2500);
                    
                }
            }).catch(err =>{
                console.error(err)
            })            
        },
        pay(){
         this.showPaidDialog = true
         setTimeout(() => {
            this.showPaidDialog = false
         }, 2500);
        }
    },
    data: () => ({
        isLoading: false,
        order: null,
        addNewProductDialog: false,
        success: false,
        error: false,
        input:{
            sku:'',
            name:'',
            quantity: null,
            price:null,
        },
        rules:{
            skuRules:[v => !!v || 'This field is required'],
            nameRules:  [v => !!v || 'This field is required'],
            quantityRules:[
                v => v !== null || 'This field is required',
                v => Number.isInteger(Number(v)) || 'Quantity must be an integer',
            ],
            priceRules:[
                v => v !== null || 'This field is required',
                v => !isNaN(parseFloat(v)) && isFinite(v) || 'Price must be a number',
            ],
        },
        showPaidDialog:false
    }),
    mounted(){
        this.order = this.getOrder(this.$route.params.id)
    }
}
</script>