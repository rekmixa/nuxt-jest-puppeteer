<template>
  <div class="layout-container">
    <div class="header">
      <nuxt-link to="/">Мой сайт</nuxt-link>
    </div>
    <div class="main-container">
      <div class="menu">
        <template v-if="user">
          <div class="menu-item">
            <a href="#" @click="logout">
              Выйти
              <span class="small-text">({{ user.login }})</span>
            </a>
          </div>
        </template>
        <template v-else>
          <div class="menu-item">
            <nuxt-link to="/auth">Авторизация</nuxt-link>
          </div>
          <div class="menu-item">
            <nuxt-link to="/register">Регистрация</nuxt-link>
          </div>
        </template>
      </div>
      <div class="content">
        <Nuxt />
      </div>
    </div>
    <div class="footer">
      Copyright &copy; 2021
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'default',

  beforeCreate() {
    this.$store.dispatch('initStore')
  },

  computed: {
    ...mapGetters(['user']),
  },

  methods: {
    ...mapMutations(['setUserId']),

    logout() {
      this.setUserId(null)
      this.$router.push('/')
    }
  }
}
</script>
