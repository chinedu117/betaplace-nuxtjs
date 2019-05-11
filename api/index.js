
export const baseUrl = "http://betaplace.test/api"//process.env.ROOT_API

export const PLACES_URL = baseUrl + '/p'

export const PLACES_SEARCH_URL = PLACES_URL + '/s'

export const PLACES_FILTER_URL = PLACES_URL + '/f'

export const PLACE_URL = (placeSlug) => {
    return baseUrl + '/pl/' + placeSlug
} 

export const PLACE_STAT_URL = (statID) => {
    return baseUrl + '/pl/stat/' + statID 
}

export const AGENT_RATING_URL = (agentSlug) => {
    return baseUrl + '/pl/ag/' + agentSlug
}

export const DASHBORD_PLACE_IMAGE_REMOVE_URL = (placeSlug)  =>{
    return baseUrl + '/d/p/' + placeSlug +'/i/d'
}  

export const AGENT_PLACE_DELETE_URL = (slug) => {
    return baseUrl + '/d/p/'+ slug +'/d'
} 

export const DASHBORD_PLACE_IMAGE_SAVE_URL  = (placeSlug)  =>{
    return baseUrl + '/d/p/' + placeSlug +'/i'
}

export const DASHBORD_PLACE_RETRIEVE_URL  = (placeSlug)  =>{
    return baseUrl + '/d/p/' + placeSlug
}  

export const DASHBORD_PLACE_FEATURE_SAVE_URL  = (placeSlug)  =>{

    return baseUrl + '/d/p/' + placeSlug +'/f'
}  

export const DASHBORD_PLACE_CREATE_URL = baseUrl + '/d/p/c'

export const DASHBOARD_PLACE_PUBLISH_URL = (placeSlug) => {
     return baseUrl + '/d/p/' + placeSlug + '/pb'
}

export  const DASHBORD_PLACE_EXPLICIT_PUBLISH_URL = (placeSlug) => {
    return baseUrl + '/d/p/' + placeSlug + '/expl/pb'   
}

export  const DASHBOARD_PLACE_RENEW_URL = (placeSlug) => {
    return baseUrl + '/ag/p/renew/'+ placeSlug   
}


export  const DASHBORD_PLACE_EXPLICIT_UNPUBLISH_URL = (placeSlug) => {
    return baseUrl + '/d/p/' + placeSlug + '/expl/upb'   
}

export const DASHBORD_PLACE_EDIT_URL = (placeSlug) =>{
    return baseUrl + '/d/p/' + placeSlug +'/e'
}
export const PLACE_CATEGORY_LIST_URL = baseUrl + '/d/cat/l'

export const AGENT_PLACES_URL = baseUrl + '/ag/p'

export const PACKAGES_URL = baseUrl + '/packages'

export const PACKAGE_URL = (packageID) => {
    return baseUrl + "/package/" + packageID
}
export const AGENT_PUBLIC_PLACES_URL = (agentSlug) =>{
    return baseUrl + "/ag/pub/" + agentSlug
}

export const AGENT_PUBLIC_INFO_URL = (agentSlug) => {
     return baseUrl + '/ag/pub/info/' + agentSlug
}
export const MY_SUBSCRIPTIONS_URL = baseUrl + "/my-subscriptions"

export const PAYSTACK_CONFIRM_URL = baseUrl + "/paystack-confirm"
// AUTHENTICATION //
export const REGISTER_URL = baseUrl + '/register'
export const LOGIN_URL = baseUrl + '/login'
export const LOGOUT_URL = baseUrl + '/logout'
export const SUBMIT_PROFILE_URL  = baseUrl + '/profile-submit'
export const GET_MY_PROFILE_URL  = baseUrl + '/profile'
export const AGENT_PROFILE_IMAGE_UPLOAD_URL = baseUrl + '/profile-img'
export const RESEND_VERIFICATION_MAIL_URL = baseUrl + '/resend-verification'
export const FORGOT_PASSWORD_URL = baseUrl + '/forgot-password'
export const RESET_PASSWORD_URL = baseUrl + '/reset-password'
export const USER_INFO_URL = baseUrl + "/user"
export const SOCIAL_LOGIN_URL = (provider) => {
         return baseUrl + '/login/' + provider
}