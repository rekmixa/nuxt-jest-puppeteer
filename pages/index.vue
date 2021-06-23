<template>
  <div class="form-container">
    <div class="title">
      <template v-if="user">
        Заполнение профиля
      </template>
      <template v-else>
        Добро пожаловать на сайт!
      </template>
    </div>
    <div class="form" v-if="user">
      <div class="error" v-if="errorMessage">{{ errorMessage }}</div>
      <div class="item">
        <input
          type="text"
          name="lastName"
          v-model="form.lastName"
          placeholder="Фамилия"
        />
      </div>
      <div class="item">
        <input
          type="text"
          name="firstName"
          v-model="form.firstName"
          placeholder="Имя"
        />
      </div>
      <div class="item">
        <input
          type="text"
          name="middleName"
          v-model="form.middleName"
          placeholder="Отчество"
        />
      </div>
      <div class="item">
        <button id="#save" @click="save">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'index',
  head: {
    title: 'Главная',
  },

  computed: {
    ...mapGetters(['user']),
  },

  mounted() {
    if (this.user) {
      this.form.firstName = this.user?.firstName || ''
      this.form.lastName = this.user?.lastName || ''
      this.form.middleName = this.user?.middleName || ''
    }
  },

  data: () => ({
    form: {
      firstName: '',
      lastName: '',
      middleName: '',
    },
    errorMessage: '',
  }),

  methods: {
    ...mapMutations(['saveProfile']),

    save() {
      if (!this.form.firstName) {
        this.errorMessage = 'Введите имя'
        return
      }

      if (!this.form.lastName) {
        this.errorMessage = 'Введите фамилию'
        return
      }

      this.saveProfile(this.form)
    }
  }
}
</script>
