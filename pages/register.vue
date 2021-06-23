<template>
  <div class="form-container">
    <div class="title">Регистрация</div>
    <div class="form">
      <div class="error" v-if="errorMessage">{{ errorMessage }}</div>
      <div class="item">
        <input
          type="text"
          v-model="form.login"
          placeholder="Логин"
        />
      </div>
      <div class="item">
        <input
          type="password"
          v-model="form.password"
          placeholder="Пароль"
        />
      </div>
      <div class="item">
        <input
          type="password"
          v-model="form.passwordRepeat"
          placeholder="Подтверждение пароля"
        />
      </div>
      <div class="item">
        <button @click="register">Зарегистрироваться</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'register',
  middleware: ['guest'],
  head: {
    title: 'Регистрация',
  },

  data: () => ({
    form: {
      login: '',
      password: '',
      passwordRepeat: ''
    },
    errorMessage: ''
  }),

  computed: {
    ...mapState(['users']),
  },

  methods: {
    ...mapMutations([
      'setUserId',
      'registerUser',
    ]),

    register() {
      const userIndex = this.users?.findIndex(user => user?.login === this.form.login)
      if (userIndex !== -1) {
        this.errorMessage = 'Пользователь с таким логином уже зарегистрирован'
        return
      }

      if (!this.form.login) {
        this.errorMessage = 'Введите логин'
        return
      }

      if (!this.form.password) {
        this.errorMessage = 'Введите пароль'
        return
      }

      if (!this.form.passwordRepeat) {
        this.errorMessage = 'Введите подтверждение пароля'
        return
      }

      if (this.form.password !== this.form.passwordRepeat) {
        this.errorMessage = 'Пароли не совпадают'
        return
      }

      this.registerUser(this.form)
      this.$router.push('/')
    }
  }
}
</script>
