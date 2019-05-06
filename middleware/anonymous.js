export default function ({ store, redirect }) {
  if (store.getters["auth/loggedIn"]) {
  	  store.dispatch("common/updateSnackBar",{
                  
                    show: true,
                    msg: 'Logout to continue',
                    color: ''
               })
  	  
    return redirect('/')
  }
}