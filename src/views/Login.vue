<template>
  <div class="login-container">
    <div v-if="$root.currentUser ==''" class="modal">
      <div v-if="validation" class="form-validation">
        <h4>Неправильний логін або пароль</h4>
      </div>
      <div class="form-title">
        <h2>ВХIД В СИСТЕМУ</h2>
      </div>
      <div class="input-group" v-bind:class="{ invalidValidation: validation }">
        <input v-model="username" type="text" id="name" placeholder="Логiн" />
        <!--<label for="name">Username</label>-->
      </div>
      <div class="input-group" v-bind:class="{ invalidValidation: validation }">
        <input v-model="password" type="password" id="password" placeholder="Пароль" />
        <!--<label for="password">Password</label>-->
      </div>
      <div @click="log(username, password)" class="form-button">УВIЙТИ</div>

    </div>
    <div v-else>
      <div class="modal">
        <div class="form-title successfulLogin">
          <h1>ВІТАЄМО!</h1>
          <h3>Авторизацiя прошла успiшно</h3>
          <img src="../assets/images/done.png" alt="done">
          <h3>
            <router-link to="/main">Перейти на головну сторiнку</router-link>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  props: {

  },
  data: function(){
    return {
      username: '',
      password: '',
      error: false,
      validation: false
    }
  },
  methods: {
    log: function(login, password) {

      for (var i = 0; i < this.$root.users.data.length; i++) {
        console.log(password == this.$root.users.data[i].password)
        if (
                login == this.$root.users.data[i].username &&
                password == this.$root.users.data[i].password
        ) {
          this.$root.currentUser = this.$root.users.data[i].username;
          var v = encodeURIComponent(document.lastModified);
          document.cookie = "user=" + this.$root.currentUser;
          break;
        } else {
          this.error = true;
        }
      }
      if (this.$root.currentUser == "" && this.error == true) {
        // alert("Неправильний логін або пароль");
        this.validation = true;
      } else return true;
    },
  }
}
</script>

<style scoped lang="sass">

  .login-container
    display: flex
    width: 100%
    height: auto

  *, *:before, *:after
    margin: 0
    padding: 0
    box-sizing: border-box

  .modal
    top: 0
    left: 0
    z-index: 3
    width: 100%
    height: 70%
    margin-top: 105px
    padding: 20px
    display: flex
    position: fixed
    align-items: center
    justify-content: center
    flex-direction: column
    background-color: inherit
    transform-origin: center center

  .form-title
    margin-bottom: 30px
    h2
      color: #42b983

  .form-button
    width: 100%
    padding: 10px
    color: #42b983
    margin-top: 30px
    max-width: 300px
    font-weight: bold
    text-align: center
    border: solid 1.5px #42b983
    background-color: #fff
    transition-duration: 0.5s
    &:hover
      color: #fff
      cursor: pointer
      background-color: #42b983
      transition-duration: 0.5s

  .input-group
    width: 100%
    font-size: 16px
    max-width: 300px
    padding-top: 20px
    position: relative
    margin-bottom: 15px
    input
      width: 100%
      color: #262626
      border: none
      outline: none
      padding: 5px 0
      line-height: 1
      font-size: 16px
      border-bottom: solid 1.5px #42b983
      background-color: transparent

  .invalidValidation
    input
      border-bottom: solid 1.5px #e02340

  .form-validation
    margin-bottom: 65px
    margin-top: -83px
    h4
      color: #e02340

  .successfulLogin
    margin-top: 20px
    h1
      margin-bottom: 30px
      color: #42b983
    h3
      margin-bottom: 10px
      color: #42b983
      a
        color: #42b983

    img
      height: 90px
      width: 90px
      margin: 20px 0

</style>
