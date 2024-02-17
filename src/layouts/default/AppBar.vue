<template>
  <v-app-bar color="primary" flat>
    <v-app-bar-title>
      <v-btn v-if="back" color="bg-primary" flat @click=" $router.push({name:'Home'}) ">Back</v-btn>
      <span v-else>Order app</span>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script>
  export default{
    computed:{
      back(){
        return this.$route.name === 'Order'
      },
    },
  }
</script>
