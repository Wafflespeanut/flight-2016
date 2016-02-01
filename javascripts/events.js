const IMAGE_WIDTH = 60;
const STACK_HEIGHT = 475;
const CARD_HEIGHT = 300;
const SCROLL_WIDTH = 1280;
const SINGLE_LINE_PAD = 40;
const RIGHT = '0deg';
const LEFT = '180deg';

function card_open(e) {
    var image = e.querySelector('.card-logo');
    image.style.top = '10%';
    image.style.width = (IMAGE_WIDTH / 2) + 'px';
    image.style.marginLeft = '-' + (IMAGE_WIDTH / 4) + 'px';
    image.style.marginTop = '-' + (IMAGE_WIDTH / 4) + 'px';

    var title = e.querySelector('.card-title');
    title.style.fontSize = '15px';
    if (title.style.paddingTop) {
        title.style.paddingTop = '0px';
    }
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
    if (title.style.paddingTop == '0px') {
        title.style.paddingTop = SINGLE_LINE_PAD + 'px';
    }
    title.style.transform = 'translateY(0px)';
    var description = e.querySelector('.card-description');
    description.style.transform = 'translateY(' + CARD_HEIGHT + 'px)';
    description.style.opacity = 0;
    description.style.visibility = 'hidden';
}

function Scroller() {
    var pos = 0;
    var scrollarea = document.getElementById('scroll-holder');
    var stacks = document.querySelectorAll('.stack');
    stacks[0].style.transform = 'translateX(0px)';
    document.addEventListener('keydown', scroll, false);

    var left_arrow = document.getElementById('arrow-left');
    if (left_arrow != undefined) {
        left_arrow.addEventListener('mouseup', left_up, false);
        left_arrow.addEventListener('mousedown', left_down, false);
    }

    var right_arrow = document.getElementById('arrow-right');
    if (right_arrow != undefined) {
        right_arrow.addEventListener('mouseup', right_up, false);
        right_arrow.addEventListener('mousedown', right_down, false);
    }

    function left_up() {
        left_arrow.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px) rotate(' + LEFT + ')';
        previous_slide();
    }
    function left_down() {
        left_arrow.style.transform = 'translate(' + 3 + 'px, ' + 3 + 'px) rotate(' + LEFT + ')';
    }

    function right_up() {
        right_arrow.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px) rotate(' + RIGHT + ')';
        next_slide();
    }

    function right_down() {
        right_arrow.style.transform = 'translate(' + 3 + 'px, ' + 3 + 'px) rotate(' + RIGHT + ')';
    }

    function next_slide() {
        if (pos < stacks.length - 1) {
            stacks[pos].style.transform = 'translateX(-' + SCROLL_WIDTH + 'px)';
            pos += 1;
            stacks[pos].style.transform = 'translateX(0px)';
        }
    }

    function previous_slide() {
        if (pos > 0) {
            stacks[pos].style.transform = 'translateX(' + SCROLL_WIDTH + 'px)';
            pos -= 1;
            stacks[pos].style.transform = 'translateX(0px)';
        }
    }

    function scroll(e) {
        var key_code = e.keyCode;
        if (key_code == 37) {
            previous_slide();
        } else if (key_code == 39) {
            next_slide();
        }
    }
}

window.onload = function() {
    Scroller();
}
