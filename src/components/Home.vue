
<template>
  <div class="home">

    <img src="../assets/logo.png">

    <el-container>
      <el-header>
        <h1>{{msg}}</h1>
      </el-header>
      <el-main>
        <el-row type="flex" justify="center" class="r">
          <el-col :span="3">
            <el-input  v-model="username" size="medium" placeholder="用户名"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="3">
            <el-input v-model="password" placeholder="密码" show-password></el-input>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="5">
            <el-select v-model="usertype" placeholder="请选择用户类型">
              <el-option
                v-for="t in usertype_list"
                :key="t.value"
                :label="t.label"
                :value="t.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row>
          <el-button type="primary" @click="login">登录</el-button>
          <!--        <el-button class="login_btn" @click.native="login" type="primary" round :loading="isBtnLoading">登录</el-button>-->
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
      return {
        username:'',
        password:'',
        usertype:'admin',
        usertype_list:[
          {
            value:'student',
            label:'学生'
          },
          {
            value:'admin',
            label:'管理员'
          }
        ],
        msg:"Sql Online Judge"
      }
  },
  methods:{
    login(){
      if(!this.username || !this.password || !this.usertype){
        this.$message.error("输入为空")
        return
      }
      let data = {'username':this.username,'password':this.password, 'usertype':this.usertype}
      this.$store.dispatch('login',data).then(
        ()=>{
          this.$router.push('/'+this.usertype)
        }
      ).catch(response=>{
        this.$message.error(response.toString())
      })
    }
  }
}
</script>

<style>
  .el-row {
    margin-bottom: 20px;
  }
</style>
