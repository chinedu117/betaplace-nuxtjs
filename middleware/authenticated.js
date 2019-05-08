export default function ({ store, redirect, app }) {
  if (!store.getters["auth/loggedIn"]) {
    return redirect('/agent/login')
  }
}
