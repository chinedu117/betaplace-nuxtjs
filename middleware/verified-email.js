export default function ({ store, redirect, app }) {
	
  if (!store.getters['auth/userEmailVerified']) {
    return redirect('/agent/verify-email')
  }
}
