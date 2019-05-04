import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usertype: '',
    token: '',
    username:''

  },
  getters:{
    Usertype: state=> state.usertype,
    Token: state=>state.token,
    Username: state =>state.username
  },
  mutations: {
    setUsertype(state,usertype){
      if(['','student','admin'].includes(usertype))
          state.usertype=usertype
    },
    setToken(state, token){
      state.token=token
    },
    setUsername(state,username){
        state.username=username
    }
  },
  actions: {
    login(context,data){
      return new Promise((resolve, reject)=> {
            return axios.post('/session/' + data['usertype'], data
            ).then((response) => {
              context.commit('setToken', response.data['session'])
              context.commit('setUsertype', data['usertype'])
              context.commit('setUsername', response.data['name'])
              resolve()
            }).catch((response) => {
              reject(response)
            });
          }
      )
    },
    logout(ctx){

        ctx.commit('setUsertype','')
        ctx.commit('setToken','')
    }
  }
})
