const CARDS_PER_STACK = 5;
const IMAGE_WIDTH = 50;
const MAX_WIDTH = 700;
const SCROLL_WIDTH = 150;
const TITLE_TRANS_HEIGHT = 25;
const DESC_TRANS_HEIGHT = 85;
const RIGHT = '0deg';
const LEFT = '180deg';

function card_open(e) {
    if (window.innerWidth > MAX_WIDTH) {
        var image = e.querySelector('.card-logo');
        image.style.top = '15%';
        image.style.width = (IMAGE_WIDTH / 2) + '%';
        image.style.marginLeft = '-' + (IMAGE_WIDTH / 4) + '%';
        image.style.marginTop = '-' + (IMAGE_WIDTH / 4) + '%';

        var title = e.querySelector('.card-title');
        title.style.fontSize = '1.2vw';
        title.style.transform = 'translateY(' + TITLE_TRANS_HEIGHT + '%)';
        var description = e.querySelector('.card-description');
        description.style.opacity = 1;
        description.style.visibility = 'visible';
        description.style.transform = 'translateY(' + (DESC_TRANS_HEIGHT / 2) + '%)';
    }
}

function card_close(e) {
    if (window.innerWidth > MAX_WIDTH) {
        var image = e.querySelector('.card-logo');
        image.style.top = '50%';
        image.style.width = IMAGE_WIDTH + '%';
        image.style.marginLeft = '-' + (IMAGE_WIDTH / 2) + '%';
        image.style.marginTop = '-' + (IMAGE_WIDTH / 2) + '%';

        var title = e.querySelector('.card-title');
        title.style.fontSize = '1.4vw';
        title.style.transform = 'translateY(0px)';
        var description = e.querySelector('.card-description');
        description.style.transform = 'translateY(' + DESC_TRANS_HEIGHT + '%)';
        description.style.opacity = 0;
        description.style.visibility = 'hidden';
    }
}

function Scroller() {
    var pos = 0;
    var scroll_area = document.getElementById('scroll-holder');
    var cards = document.querySelectorAll('.card');
    document.addEventListener('keydown', scroll, false);
    var num_cards = cards.length;

    if (window.innerWidth <= MAX_WIDTH) {
        var stack = document.createElement('div');
        stack.className = 'mobile-stack';
        scroll_area.appendChild(stack);
        for (i = 0; i < num_cards; i++) {
            stack.appendChild(cards[i]);
        }
    } else {
        for (i = 0; i < num_cards; i++) {
            if (i % CARDS_PER_STACK == 0) {
                var stack = document.createElement('div');
                stack.className = 'stack';
                scroll_area.appendChild(stack);
            } stack.appendChild(cards[i]);
        }

        if (num_cards > CARDS_PER_STACK) {
            var left_arrow = document.createElement('img');
            left_arrow.className = 'arrow';
            left_arrow.id = 'arrow-left';
            left_arrow.src = 'images/side-arrow.png';
            left_arrow.addEventListener('mouseup', left_up, false);
            left_arrow.addEventListener('mousedown', left_down, false);
            scroll_area.appendChild(left_arrow);

            var right_arrow = document.createElement('img');
            right_arrow.className = 'arrow';
            right_arrow.id = 'arrow-right';
            right_arrow.src = 'images/side-arrow.png';
            right_arrow.addEventListener('mouseup', right_up, false);
            right_arrow.addEventListener('mousedown', right_down, false);
            scroll_area.appendChild(right_arrow);
        }
    }

    var stacks = document.querySelectorAll('.stack');
    if (stacks[0]) {
        stacks[0].style.transform = 'translateX(0px)';
    }

    function left_up() {
        left_arrow.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px) rotate(' + LEFT + ')';
        previous_stack();
    }

    function left_down() {
        left_arrow.style.transform = 'translate(' + 3 + 'px, ' + 3 + 'px) rotate(' + LEFT + ')';
    }

    function right_up() {
        right_arrow.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px) rotate(' + RIGHT + ')';
        next_stack();
    }

    function right_down() {
        right_arrow.style.transform = 'translate(' + 3 + 'px, ' + 3 + 'px) rotate(' + RIGHT + ')';
    }

    function next_stack() {
        if (pos < stacks.length - 1) {
            stacks[pos].style.transform = 'translateX(-' + SCROLL_WIDTH + '%)';
            pos += 1;
            stacks[pos].style.visibility = 'visible';
            stacks[pos].style.transform = 'translateX(0px)';
            setTimeout(function() {
                stacks[pos - 1].style.visibility = 'hidden';
            }, 1000);
        }
    }

    function previous_stack() {
        if (pos > 0) {
            stacks[pos].style.transform = 'translateX(' + SCROLL_WIDTH + '%)';
            pos -= 1;
            stacks[pos].style.visibility = 'visible';
            stacks[pos].style.transform = 'translateX(0px)';
            setTimeout(function() {
                stacks[pos + 1].style.visibility = 'hidden';
            }, 1000);
        }
    }

    function scroll(e) {
        var key_code = e.keyCode;
        if (key_code == 37) {
            e.preventDefault();
            previous_stack();
        } else if (key_code == 39) {
            e.preventDefault();
            next_stack();
        } else if (key_code == 38 || key_code == 33 || key_code == 36 ||
                  (key_code == 32 && e.shiftKey) || key_code == 40 ||
                  key_code == 34 || key_code == 32 || key_code == 35) {
            e.preventDefault();         // arrest the other keys!
        }
    }
}
