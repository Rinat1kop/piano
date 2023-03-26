const pianoKeys=document.querySelectorAll('.piano-key')
const btnNotes=document.querySelector('.btn-notes')
const btnLetters=document.querySelector('.btn-letters')
const btnContainer=document.querySelector('.btn-container')
const fullscreen=document.querySelector('.fullscreen')

function toggleFullScreen(){
    if(!document.fullscreenElement){
        document.documentElement.requestFullscreen()
        fullscreen.classList.add('openfullscreen')
    }else if(document.exitFullscreen){
        document.exitFullscreen()
        fullscreen.classList.remove('openfullscreen')
    }

}





// переключатель кнопок между нотами и буквами 
function switchBtns(event){
    if(event.target.classList.contains('btn-letters')){
        event.target.classList.add('btn-active')
        btnNotes.classList.remove('btn-active')
        pianoKeys.forEach((pianoKey)=>{
            pianoKey.classList.add('letter')
        })
    }else if(event.target.classList.contains('btn-notes')){
        event.target.classList.add('btn-active')
        btnLetters.classList.remove('btn-active')
        pianoKeys.forEach((pianoKey)=>{
            pianoKey.classList.remove('letter')
        })
    }
}


//через мышку
function playAudio(src){
    const audio=new Audio();
    audio.src=src;
    audio.currentTime=0;
    audio.play();
}

function startSound(event){
    if(event.target.classList.contains('piano-key')){
        event.target.classList.add('active');
        const note=event.target.dataset.note;
        const src=`assets/audio/${note}.mp3`;
        playAudio(src)
    }
}


function stopSound(event){
    if(event.target.classList.contains('piano-key')){
        event.target.classList.remove('active')
    }
}

function startCorrespondOver(event){
    startSound(event);

    pianoKeys.forEach((pianoKey)=>{
        pianoKey.addEventListener('mouseover',startSound);
        pianoKey.addEventListener('mouseout',stopSound)
    })

}

function stopCorrespondOver(event){
    stopSound(event);

    pianoKeys.forEach((pianoKey)=>{
        pianoKey.removeEventListener('mouseover',startSound);
        pianoKey.removeEventListener('mouseout',stopSound)
    })

}


//через клавишу
function playAudioKeyboard(event){
    const audio= document.querySelector(`audio[data-letter-code=${event.code}]`);
    const pianoKey= document.querySelector(`.piano-key[data-letter-code=${event.code}]`);
    if(!audio)return; audio.currentTime=0;
    audio.currentTime=0;
    audio.play();
    pianoKey.classList.add('active');
}

function stopKeyboard(event){
    const pianoKey= document.querySelector(`.piano-key[data-letter-code=${event.code}]`);
    pianoKey.classList.remove('active')
}

window.addEventListener('mousedown',startCorrespondOver);
window.addEventListener('mouseup', stopCorrespondOver);

window.addEventListener('keydown',playAudioKeyboard)
window.addEventListener('keyup',stopKeyboard)
btnContainer.addEventListener('click',switchBtns)
fullscreen.addEventListener('click',toggleFullScreen)