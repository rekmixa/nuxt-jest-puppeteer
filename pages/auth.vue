<template>
  <div class="form-container">
    <div class="title">Авторизация</div>
    <div class="form">
      <div class="error" v-if="errorMessage">{{ errorMessage }}</div>
      <div class="item">
        <input
          type="text"
          name="login"
          v-model="form.login"
          placeholder="Логин"
        />
      </div>
      <div class="item">
        <input
          type="password"
          name="password"
          v-model="form.password"
          placeholder="Пароль"
        />
      </div>
      <div class="item">
        <button id="#auth" @click="login">Войти</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'auth',
  middleware: ['guest'],
  head: {
    title: 'Авторизация',
  },

  data: () => ({
    form: {
      login: '',
      password: '',
    },
    errorMessage: ''
  }),

  computed: {
    ...mapState(['users']),

    userForLogin() {
      return this.users?.find?.(user => {
        return user?.login === this.form.login &&
          user?.password === this.form.password
      })
    }
  },

  methods: {
    ...mapMutations(['setUserId']),

    login() {
      if (!this.form.login) {
        this.errorMessage = 'Введите логин'
        return
      }

      if (!this.form.password) {
        this.errorMessage = 'Введите пароль'
        return
      }

      if (!this.userForLogin) {
        this.errorMessage = 'Неверный логин или пароль'
        return
      }

      this.errorMessage = ''
      this.setUserId(this.userForLogin?.id)
      this.$router.push('/')
    }
  }
}
</script>
