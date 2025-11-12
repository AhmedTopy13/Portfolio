document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".section");
    const videos = document.querySelectorAll(".section-video");

    const observerOptions = {
        root: null,
        threshold: 0.5
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            const image = section.querySelector('.section-image') || section.querySelector('.section-video');
            const titleBg = section.querySelector('.title-bg');
            const descBg = section.querySelector('.desc-bg');
            const h2 = section.querySelector('h2');
            const p = section.querySelector('p');

            if (entry.isIntersecting) {
                section.classList.add('show');
                section.classList.remove('out');
                image.style.transform = 'translateX(0)';
                titleBg.style.transform = 'translate(0, 0)';
                descBg.style.transform = 'translate(0, 0)';
                h2.style.transform = 'translateY(0)';
                p.style.opacity = 1;
            } else {
                section.classList.add('out');
                section.classList.remove('show');
                if (entry.boundingClientRect.top < 0) { // Scrolling down, leaving from top
                    image.style.transform = 'translateX(-100%)';
                    titleBg.style.transform = 'translate(50%, -20%)';
                    descBg.style.transform = 'translate(50%, -20%)';
                    h2.style.transform = 'translateY(-50%)';
                    p.style.opacity = 0;
                } else { // Scrolling up, leaving from bottom
                    image.style.transform = 'translateX(100%)';
                    titleBg.style.transform = 'translate(-50%, 20%)';
                    descBg.style.transform = 'translate(-50%, 20%)';
                    h2.style.transform = 'translateY(50%)';
                    p.style.opacity = 0;
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(video => videoObserver.observe(video));
});