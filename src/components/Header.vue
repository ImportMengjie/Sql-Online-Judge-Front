<template>
  <div>
    {{this.$store.getters.Usertype}}
    <el-button @click="logout">退出</el-button>
  </div>

</template>

<script>
    export default {
        name: "Header",
        methods:{
            logout(){
              this.$store.dispatch('logout').then(()=>{
                this.$router.push('/home')
              })
            }
        }
    }
</script>

<style scoped>

</style>
