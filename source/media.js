// Popup for the media button
document.addEventListener('DOMContentLoaded', () => {
    const mediaImg = document.getElementById('media-img');
    const submitButton = document.getElementById('media-submit-button');
    const url = document.getElementById('media-url');
    const youtubeTest = document.getElementById('youtube-test');
    const pinterestTest = document.getElementById('pinterest-test');

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

    mediaImg.addEventListener('click', () => {
        toggle('popup-media', 'flex');
    });

    submitButton.addEventListener('click', () => {
        toggle('popup-media', 'flex');
        if (url.value.includes('youtube')) {
            // console.log(`https://www.youtube.com/embed/${  url.value.substring(32)}`);
            youtubeTest.src = `https://www.youtube.com/embed/${url.value.substring(
                32
            )}`;
        }
        if (url.value.includes('pinterest')) {
            pinterestTest.src = 'https://assets.pinterest.com/ext/embed.html?id=' + url.value.substring(30, 46);
        }    
        document.getElementById('media-uploader').reset();
    });
});
