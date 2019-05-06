<template>
  <div>
    <el-container style="height: 900px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-setting"></i>admin</template>
              <el-menu-item-group>
                <el-menu-item index="1-1" :key="'studentManage'" @click="routerToMain('StudentManage')">学生管理</el-menu-item>
                <el-menu-item index="1-2" @click="routerToMain('DatabaseManage')">数据库管理</el-menu-item>
                <el-menu-item index="1-3" @click="routerToMain('QuestionManage')">问题管理</el-menu-item>
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
  </div>

</template>

<script>
    import Header from "../Header.vue";
    export default {
      name: "index",
      components: {Header},
      data() {
        return {

        }
      },
      methods:{
        routerToMain(name){
          this.$router.push('/admin/'+name)
        }
      }
    }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
