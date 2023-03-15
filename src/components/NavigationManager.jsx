const home = '/'
const trialPage = '/try_now'
const loginPage = '/login'
const registerPage = '/register'

function navigateTo(location) {
    switch (location) {
        case 'home':
            window.location.href=home
            break;
        case 'try_now':
            window.location.href=trialPage
            break;
        case 'login':
            window.location.href=loginPage
            break;
        case 'register':
            window.location.href=registerPage
            break;
        default:
            break;
    }
}

export default navigateTo