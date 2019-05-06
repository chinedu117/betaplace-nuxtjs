export default function ({ store, redirect }) {

	const hasProfile = store.getters['auth/userHasProfile']
    const hasVerifiedEmail = store.getters['auth/userEmailVerified']

    if(!hasVerifiedEmail){
               store.dispatch("common/updateSnackBar",{
                  
                    show: true,
                    msg: 'Verify your email to proceed',
                    color: ''
               })
                return redirect('/agent/verify-email')
             }

        if(!hasProfile){ 
                 store.dispatch("common/updateSnackBar",{
                  
                    show: true,
                    msg: 'Set up your profile to upload your places',
                    color: ''
               })
                 return redirect('/agent/profile/create')
            }

}
