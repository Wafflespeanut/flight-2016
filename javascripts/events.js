IMAGE_WIDTH = 60;
CARD_HEIGHT = 300;

function card_open(e) {
    var image = e.querySelector('.card-logo');
    image.style.top = '10%';
    image.style.width = (IMAGE_WIDTH / 2) + 'px';
    image.style.marginLeft = '-' + (IMAGE_WIDTH / 4) + 'px';
    image.style.marginTop = '-' + (IMAGE_WIDTH / 4) + 'px';

    var title = e.querySelector('.card-title');
    title.style.fontSize = '15px';
    title.style.transform = 'translateY(' + (CARD_HEIGHT / 4) + 'px)';
    var description = e.querySelector('.card-description');
    description.style.opacity = 1;
    description.style.visibility = 'visible';
    description.style.transform = 'translateY(' + (CARD_HEIGHT / 3.5) + 'px)';
}

function card_close(e) {
    var image = e.querySelector('.card-logo');
    image.style.top = '50%';
    image.style.width = IMAGE_WIDTH + 'px';
    image.style.marginLeft = '-' + (IMAGE_WIDTH / 2) + 'px';
    image.style.marginTop = '-' + (IMAGE_WIDTH / 2) + 'px';

    var title = e.querySelector('.card-title');
    title.style.fontSize = '22px';
    title.style.transform = 'translateY(0px)';
    var description = e.querySelector('.card-description');
    description.style.transform = 'translateY(' + CARD_HEIGHT + 'px)';
    description.style.opacity = 0;
    description.style.visibility = 'hidden';
}
