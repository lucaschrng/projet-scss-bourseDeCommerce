let body = document.querySelector('body');
let background = document.querySelector('.background');
let appearElements = document.querySelectorAll('.history--title, .expositions h2, .exposition');
let historyContent = document.querySelector('.history--content');
let timelineElements = document.querySelectorAll('.history--content > div, .history--content img');
let timelineTexts = document.querySelectorAll('.history--content h3, .history--content p');

let opacity;
let scrollValue;
let posY;
let resetNeeded = false;

widthCheck();

window.addEventListener('resize', widthCheck);
window.addEventListener('scroll', widthCheck);

//functions

function widthCheck() {
    if (screen.width > 600 && screen.height > 600 && window.innerWidth > 600) {
        updateOpacity();
        updateBg();
        appearOnScroll();
        animOnScroll();
        resetNeeded = false;
        console.log('hello');
    }
    else {
        if(!(resetNeeded)){
            console.log(timelineElements);
            reset();
            resetNeeded = true;
        }
    }
}

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

function appearOnScroll() {
    appearElements.forEach(element => {
        posY = element.getBoundingClientRect().top;
        if (posY < window.innerHeight - 100) {
            element.style.opacity = 1;
            element.style.translate = '0 0';
        }
        else if (posY > window.innerHeight + 100) {
            element.style.opacity = 0;
            element.style.translate = '0 5rem';
            element.style.transition = 'all 0.5s ease';
        }
    });
}

function animOnScroll() {
    posY = historyContent.getBoundingClientRect().top;
    if (posY < window.innerHeight - 100) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                timelineTexts[i].style.transition = 'all 0.5s ease';
                timelineTexts[i+3].style.transition = 'all 1s ease';
                timelineElements[i].style.scale = 1;
                timelineTexts[i].style.translate = '0 0';
                timelineTexts[i].style.opacity = 1;
                setTimeout(() => {
                    timelineTexts[i+3].style.translate = '0 0';
                    timelineTexts[i+3].style.opacity = 1;
                }, 100);
            }, i*300);
        }
        timelineElements[3].style.width = '100%';
        setTimeout(() => {
            timelineElements[4].style.opacity = 1;
        }, 1200);
    }
    else if (posY > window.innerHeight + 50) {
        for (let i = 0; i < 3; i++) {
            timelineTexts[i].style.transition = 'all 0s ease';
            timelineTexts[i+3].style.transition = 'all 0s ease';
            timelineElements[i].style.scale = 0;
            timelineTexts[i].style.translate = '0 5rem';
            timelineTexts[i].style.opacity = 0;
            timelineTexts[i+3].style.translate = '0 5rem';
            timelineTexts[i+3].style.opacity = 0;
        }
        timelineElements[3].style.width = '0%';
        timelineElements[4].style.opacity = 0;
    }
}

function reset() {
    appearElements.forEach(element => {
        element.style.opacity = 1;
        element.style.translate = '0 0';
    });
    for (let i = 0; i < 3; i++) {
            timelineElements[i].style.scale = 1;
            timelineTexts[i].style.transition = 'all 0.5s ease';
            timelineTexts[i+3].style.transition = 'all 0.5s ease';
            timelineTexts[i].style.translate = '0 0';
            timelineTexts[i+3].style.translate = '0 0';
            timelineTexts[i].style.opacity = 1;
            timelineTexts[i+3].style.opacity = 1;
    }
    timelineElements[3].style.width = '100%';
    timelineElements[4].style.opacity = 1;
}