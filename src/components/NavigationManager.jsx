const home = '/'
const boardPage = '/board'

function navigateTo(location) {
    switch (location) {
        case 'home':
            window.location.href=home
            break;
        case 'boardPage':
            window.location.href=boardPage
            break;
        default:
            break;
    }
}

export default navigateTo