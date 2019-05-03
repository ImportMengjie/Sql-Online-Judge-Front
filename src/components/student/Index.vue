<template>

  <el-container width="100%" style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-setting"></i>student</template>
          <el-menu-item-group>
            <el-menu-item index="1-1" :key="'Submit'" @click="routerToMain('Submit')">练习</el-menu-item>
            <el-menu-item index="1-2" @click="routerToMain('Statistics')">统计</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <Header></Header>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
    import Header from "../Header";
    export default {
        name: "index",
      components: {Header},
      methods:{
        routerToMain(name){
          this.$router.push('/student/'+name)
        }
      }
    }
</script>

<style scoped>

</style>
