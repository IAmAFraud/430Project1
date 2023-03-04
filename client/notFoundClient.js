// Init Function
const init = () => {
    const returnBtn = document.querySelector('#home');

    returnBtn.addEventListener('click', () => {
        window.location.href = '/';
    });
}


window.onload = init;