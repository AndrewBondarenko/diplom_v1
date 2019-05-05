<template>
  <div id="app">
    <div id="nav">
      <div class="nav_logo">
        <img src="../src/assets/images/logo2.png" alt="logo">
      </div>
      <div class="nav_title">
       <h4>Система управління процесом утворення водню з відновлюваної целюлозовмісної
         сировини у біореакторі</h4>
      </div>
      <div class="nav_menu">
        <router-link to="/">Головна</router-link>
        <router-link to="/about">Довiдка</router-link>
        <router-link to="/login">Вийти</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="sass">

  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #262626

  #nav
    padding: 0 10px
    background-color: #42b983
    margin-bottom: 30px
    display: flex
    flex-direction: row
    a
      font-weight: bold
      color: white
      text-decoration: none
      padding: 10px 15px 10px 15px
      margin: 0 15px 0 15px
      &.router-link-exact-active
        color: white
      &:hover
        border-bottom: 2px solid white
        border-top: 2px solid white
    img
      height: 70px
      width: 70px
    .nav_logo
      margin: auto 25px auto 15px
    .nav_title
      width: 350px
      color: white
      text-align: left
    .nav_menu
      margin: auto 45px auto auto


</style>
