import videosectionHtml from './VideoSection.html';
import './VideoSection.scss';
// video player library
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

const VideoSection = (container) => {
    container.innerHTML += videosectionHtml;

    window.addEventListener('DOMContentLoaded', () => {
        // initialize video player
        const player = new Plyr('#video', {
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'airplay', 'fullscreen'],
        });
        // video player wrapper
        const videoWrapper = document.querySelector('.plyr');
        // buttons on the bottom of the video
        const controls = videoWrapper.querySelector('.plyr__controls');
        // hide buttons
        controls.style.opacity = 0;
        // description of the video
        let videoDescription = document.createElement('div');
        videoDescription.classList.add('video__description');
        let videoDescriptionText = document.createElement('span');
        videoDescriptionText.innerText = 'About BRUME - Interiors Design studio.';
        videoDescription.appendChild(videoDescriptionText);
        // add it to the video wrapper element
        videoWrapper.appendChild(videoDescription);

        let firstPlay = true;
        player.on('play', () => {
            if (firstPlay) {
                firstPlay = false;
                // hide description of the video
                videoDescription.classList.add('video__description-hidden');
                // show buttons
                controls.style.opacity = 1;
            }
        });

        /* smooth appearing on the screen */
        const videosection = document.querySelector('.video__wrapper');

        if ('IntersectionObserver' in window) {
            const observerCallback = (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        videosection.style.transform = 'scale(1)';
                        observer.unobserve(videosection);
                    }
                });
            };
            const observerOptions = {
                threshold: 0.20,
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);

            observer.observe(videosection);
        } else {
            videosection.style.transform = 'scale(1)';
        }
    });
};

export { VideoSection };
