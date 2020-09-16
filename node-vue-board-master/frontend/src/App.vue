<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="/">Logo for me</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-if='isLoggedIn' href="/post">글쓰기</b-nav-item>          
          <b-nav-item @click="$router.push('/weather')">오늘의 날씨</b-nav-item>          
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <div v-if="isLoggedIn">
              <b-dropdown-item @click="logout">Logout</b-dropdown-item>
            </div>
            <div v-else>
              <b-dropdown-item href="/login">Login</b-dropdown-item>
              <b-dropdown-item href="/signup">Sign up</b-dropdown-item>
            </div>
          </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default{
  data(){
    return{

    }
  },
  computed:{
    isLoggedIn(){
      return this.$store.state.loginData;
    }
  },
  methods:{
    logout(){
      sessionStorage.removeItem("id");
      this.$store.commit("SET_LOGIN_DATA","");
      this.$router.push("/login");
    }
  },
  mounted(){
    if(!this.$store.state.loginData
    && this.$route.path !=="/login" 
    && this.$route.path !== "/signup"
    ) {
      alert("로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.");
      this.$router.push("/login");
    }
  }
};
</script>

<style>
/* 고정되는 부분 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
