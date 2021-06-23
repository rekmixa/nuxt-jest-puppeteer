export default function ({ redirect }) {
  console.log('Guest middleware')

  if (process.server) {
    return
  }

  if (localStorage.getItem('userId')) {
    return redirect('/')
  }
}
