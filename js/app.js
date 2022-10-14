let body = document.querySelector('body');
let background = document.querySelector('.background');
let texts = document.querySelectorAll('.history--title, h3, p, .expositions h2');
let opacity;
let scrollValue;

updateOpacity();
updateBg();

window.addEventListener('scroll', () => {
    updateOpacity();
    updateBg();
})

//functions

function updateOpacity() {
    if(window.scrollY < window.innerHeight) {
        opacity = (window.scrollY/window.innerHeight)*0.5;
        document.documentElement.style.setProperty('--opacity', opacity);
    }
    else {
        document.documentElement.style.setProperty('--opacity', 0.5);
    }
}

function updateBg() {
    scrollValue = 5-window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*10;
    background.style.translate = '0 ' + scrollValue + '%';
}

function addAnim($element, $name, $duration, $delay) {
    $element.style.animation = $name + ' ' + $duration + 's ease ' + $delay;
}