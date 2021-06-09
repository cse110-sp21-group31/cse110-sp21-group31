// Popup for the media button
document.addEventListener('DOMContentLoaded', () => {
    const mediaImg = document.getElementById('media-img');
    const submitButton = document.getElementById('media-submit-button');
    const url = document.getElementById('media-url');
    const youtubeTest = document.getElementById('youtube-test');
    const pinterestTest = document.getElementById('pinterest-test');
    const soundcloudTest = document.getElementById('soundcloud-test');
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

    function youtubeUpload() {
        let youtubeDiv = document.createElement('div');
        youtubeDiv.setAttribute('class', 'media-item');
        let youtubeIfr = document.createElement('iframe');
        youtubeIfr.setAttribute('src', `https://www.youtube.com/embed/${url.value.substring(32)}`);
        youtubeIfr.style.width = '100%';
        youtubeIfr.style.height = '50%';
        youtubeDiv.appendChild(youtubeIfr);
        mediaDiv.appendChild(youtubeDiv);
    }

    function pinterestUpload() {
        let pinterestDiv = document.createElement('div');
        pinterestDiv.setAttribute('class', 'iframe');
        let pinterestIfr = document.createElement('iframe');
        let pinterestUrl = `https://assets.pinterest.com/ext/embed.html?id=${  url.value.substring(30)}`;
        pinterestIfr.setAttribute('src', pinterestUrl.substr(0, pinterestUrl.length - 1));
        pinterestIfr.style.width = '236';
        pinterestIfr.style.height = '520';
        pinterestIfr.setAttribute('scrolling', 'no');
        pinterestIfr.setAttribute('frameborder', '0');
        pinterestDiv.appendChild(pinterestIfr);
        mediaDiv.appendChild(pinterestDiv);
    }

    function soundcloudUpload() {
        let soundcloudDiv = document.createElement('div');
        soundcloudDiv.setAttribute('class', 'media-item');
        let soundcloudIfr = document.createElement('iframe');
        soundcloudIfr.setAttribute('src', `https://w.soundcloud.com/player/?url=${  url.value}`);
        soundcloudIfr.style.width = '100%';
        soundcloudIfr.style.height = '150';
        soundcloudIfr.setAttribute('scrolling', 'no');
        soundcloudIfr.setAttribute('frameborder', '0');
        soundcloudDiv.appendChild(soundcloudIfr);
        mediaDiv.appendChild(soundcloudDiv);
    }

    mediaImg.addEventListener('click', () => {
        toggle('popup-media', 'flex');
    });

    submitButton.addEventListener('click', () => {
        toggle('popup-media', 'flex');
        if (url.value.includes('youtube')) {
            youtubeUpload();
            /*youtubeTest.src = `https://www.youtube.com/embed/${url.value.substring(
                32
            )}`;*/
        }
        if (url.value.includes('pinterest')) {
            pinterestUpload();
            //pinterestTest.src = `https://assets.pinterest.com/ext/embed.html?id=${  url.value.substring(30, 46)}`;
        }
        if (url.value.includes('soundcloud')) {
            soundcloudUpload();
            //soundcloudTest.src = `https://w.soundcloud.com/player/?url=${  url.value}`;
        }    
        document.getElementById('media-uploader').reset();
    });
});
