<template>
  <div>
    {{this.$store.getters.Usertype}}
    <el-link @click.prevent="logout" type="danger">退出</el-link>
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
