import { addLink } from './storage.js';
import { getDaysKey } from './date.js';
// Popup for the media button
const mediaImg = document.getElementById('media-img');
const submitButton = document.getElementById('media-submit-button');
const url = document.getElementById('media-url');
const mediaDiv = document.getElementById('media-text-area');

/**
 * Toggle the display of the HTML element with elementID between displayType and none
 * @param {string} elementID - The ID for the HTML element
 * @param {string} displayType - The desired dispaly type
 */
function toggle(elementID, displayType) {
    const element = document.getElementById(elementID);
    if (element.style.display === displayType) {
        element.style.display = 'none';
    } else {
        element.style.display = displayType;
    }
}

function youtubeUpload(link) {
    let youtubeDiv = document.createElement('div');
    youtubeDiv.setAttribute('class', 'media-item');
    let youtubeIfr = document.createElement('iframe');
    youtubeIfr.setAttribute('src', `https://www.youtube.com/embed/${link.substring(32)}`);
    youtubeIfr.style.width = '100%';
    youtubeIfr.style.height = '50%';
    youtubeDiv.appendChild(youtubeIfr);
    mediaDiv.appendChild(youtubeDiv);
}

function pinterestUpload(link) {
    let pinterestDiv = document.createElement('div');
    pinterestDiv.setAttribute('class', 'iframe');
    let pinterestIfr = document.createElement('iframe');
    let pinterestUrl = `https://assets.pinterest.com/ext/embed.html?id=${link.substring(30)}`;
    pinterestIfr.setAttribute('src', pinterestUrl.substr(0, pinterestUrl.length - 1));
    pinterestIfr.style.width = '236';
    pinterestIfr.style.height = '520';
    pinterestIfr.setAttribute('scrolling', 'no');
    pinterestIfr.setAttribute('frameborder', '0');
    pinterestDiv.appendChild(pinterestIfr);
    mediaDiv.appendChild(pinterestDiv);
}

function soundcloudUpload(link) {
    let soundcloudDiv = document.createElement('div');
    soundcloudDiv.setAttribute('class', 'media-item');
    let soundcloudIfr = document.createElement('iframe');
    soundcloudIfr.setAttribute('src', `https://w.soundcloud.com/player/?url=${link}`);
    soundcloudIfr.style.width = '100%';
    soundcloudIfr.style.height = '150';
    soundcloudIfr.setAttribute('scrolling', 'no');
    soundcloudIfr.setAttribute('frameborder', '0');
    soundcloudDiv.appendChild(soundcloudIfr);
    mediaDiv.appendChild(soundcloudDiv);
}

export { youtubeUpload, pinterestUpload, soundcloudUpload };

mediaImg.addEventListener('click', () => {
    toggle('popup-media', 'flex');
});

submitButton.addEventListener('click', () => {
    toggle('popup-media', 'flex');
    addLink(getDaysKey(window.curDate), url.value);
    if (url.value.includes('youtube')) {
        youtubeUpload(url.value);
    }
    if (url.value.includes('pinterest')) {
        pinterestUpload(url.value);
    }
    if (url.value.includes('soundcloud')) {
        soundcloudUpload(url.value);
    }    
    document.getElementById('media-uploader').reset();
});

