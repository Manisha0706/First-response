console.log('console log');

const login = document.querySelector('.box');
const ca = document.querySelector('.box1');

login.addEventListener('click', (e) => {
    window.location.href = 'login.html';
});

ca.addEventListener('click', (e) => {
    window.location.href = 'ca.html';
});