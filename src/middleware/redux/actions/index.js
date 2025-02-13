import { GET_TALES, GET_ACCOUNT, GET_ADVENTURES, PRELOADER_STATE, PRELOADER, SET_PAGE, LOGIN, SOUND_MUSIC, SHOW_MENU, SOUND_ALERT, SOUND_MUSIC_VOLUME, SOUND_BUTTONS, SOUND_BUTTONS_VOLUME, SET_CHARACTER, SERVER_CONNECTION, SHOW_AGAIN_SOUND_ALERT } from '../../misc/consts';
import { URL_API } from '../../config';
import { messages } from '../../misc/messages';

export function serverConnection() {
    return function(dispatch) {
        fetch(`${URL_API}/`)
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: SERVER_CONNECTION,
                payload: data
            })
        })
        .catch(e => {
            dispatch({
                type: SERVER_CONNECTION,
                payload: {
                    status: false,
                    message: messages.server.errorConnectingServer
                }
            })
        })
    }
}

export function getTales() {
    return function(dispatch) {
        fetch(`${URL_API}/get-tales`)
        .then(res => res.json())
        .then(data =>{
            dispatch({
                type: GET_TALES,
                payload: data,
            })
        })
        .catch(e => console.error(e))
    }
}

export function getAdventures() {
    return function(dispatch) {
        fetch(`${URL_API}/get-adventures`)
        .then(res => res.json())
        .then(data =>{
            dispatch({
                type: GET_ADVENTURES,
                payload: data,
            })
        })
        .catch(e => console.error(e))
    }
}

export function getAccount(id) { 
    return function(dispatch){
        fetch(`${URL_API}/account/${id}`)
        .then(res => res.json())
        .then(data =>{
            dispatch({
                type: GET_ACCOUNT,
                payload: data
            })
        })
        .catch(e => console.error(e))
    }
}

export function preloader(e){
    return {
        type: PRELOADER,
        payload: e
    }
}
export function preloaderState(e){
    return {
        type: PRELOADER_STATE,
        payload: e
    }
}

export function setCurrentPage(e) {
    return {
        type: SET_PAGE,
        payload: e
    }
}

export function setSoundALertStates(showSoundAlert) {
    return {
        type: SOUND_ALERT,
        payload: { showSoundAlert }
    }
}

export function setShowAgainSoundALert(showAgain) {
    localStorage.setItem('showAgainSoundAlert', showAgain);
    return {
        type: SHOW_AGAIN_SOUND_ALERT,
        payload: showAgain
    }
}

export function setMenuStates(showMenu, type) {
    return {
        type: SHOW_MENU,
        payload: { showMenu, type }
    }
}

export function setSoundMusic(playState, src) {
    return {
        type: SOUND_MUSIC,
        payload: { playState, src }
    }
}

export function setSoundMusicVolume(volume) {
    return {
        type: SOUND_MUSIC_VOLUME,
        payload: volume
    }
}

export function setSoundButtons(playState, src) {
    return {
        type: SOUND_BUTTONS,
        payload: { playState, src }
    }
}

export function setSoundButtonsVolume(volume) {
    return {
        type: SOUND_BUTTONS_VOLUME,
        payload: volume
    }
}

export function innerLogin(username, password, history) {
    return function(dispatch){
        const options = {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
              'Content-Type': 'application/json'
            }
        };
        fetch(`${URL_API}/inner-login`, options)
        .then(res => res.json())
        .then(data =>{
            dispatch({
                type: LOGIN,
                payload: data
            })
            data.logged && data.token && history.push(`/auth?token=${data.token}`)
        })
        .catch(e => console.error(e))
    }
}

export function authentication(token, history) {
    return function(dispatch){
        fetch(`${URL_API}/auth/account/${token}`)
        .then(res => res.json())
        .then(data =>{
            dispatch({
                type: LOGIN,
                payload: data
            })
            data?._id && history.push(`/account/${data._id}`)
        })
        .catch(e => console.error(e))
    
    }
}

export function setCharacter(e) {
    return {
        type: SET_CHARACTER,
        payload: e
    }
}