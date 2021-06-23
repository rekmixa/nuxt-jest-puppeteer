export default {
  state: () => ({
    users: [],
    userId: null
  }),

  getters: {
    user: (state) => {
      return state.users?.find(user => user?.id === state.userId)
    }
  },

  mutations: {
    loadUsers(state, users) {
      state.users = users
    },

    setUserId(state, userId) {
      state.userId = userId

      if (process.browser) {
        if (!userId) {
          localStorage.removeItem('userId')
          return
        }

        localStorage.setItem('userId', userId)
      }
    },

    saveProfile(state, form) {
      const user = state.users?.find(user => user?.id === state.userId)

      user.firstName = form?.firstName || ''
      user.lastName = form?.lastName || ''
      user.middleName = form?.middleName || ''

      if (process.browser) {
        localStorage.setItem('users', JSON.stringify(state.users))
      }
    },

    registerUser(state, form) {
      const userId = state.users.length + 1
      state.users.push({
        id: userId,
        login: form.login,
        password: form.password,
        firstName: '',
        lastName: '',
        middleName: '',
      })

      state.userId = userId
      if (process.browser) {
        localStorage.setItem('userId', userId)
        localStorage.setItem('users', JSON.stringify(state.users))
      }
    }
  },

  actions: {
    initStore({ commit }) {
      if (process.server) {
        return
      }

      console.log('Initialization store...')

      const users = localStorage.getItem('users')
      if (users) {
        console.log('Loading users...')
        commit('loadUsers', JSON.parse(users))
      }

      const userId = localStorage.getItem('userId')
      if (userId) {
        console.log('Setting user id...')
        commit('setUserId', Number(userId))
      }
    }
  }
}
