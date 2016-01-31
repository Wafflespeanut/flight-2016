const SCROLL_HEIGHT = 475;
const UP = '-90deg';
const DOWN = '90deg';

function focus_scroll_box() {
    document.getElementById('scrollpage').focus();
    Scroller();
}

function Scroller() {
    var pos = 0;
    var scrollarea = document.getElementById('scroll-holder');
    var up_arrow = document.getElementById('arrow-up');
    var down_arrow = document.getElementById('arrow-down');
    document.addEventListener('keydown', scroll, false);
    up_arrow.addEventListener('mouseup', up_up, false);
    up_arrow.addEventListener('mousedown', up_down, false);
    down_arrow.addEventListener('mouseup', down_up, false);
    down_arrow.addEventListener('mousedown', down_down, false);
    var slides = scrollarea.querySelectorAll('.slide');
    var last_height = 0;

    function up_up() {
        up_arrow.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px) rotate(' + UP + ')';
        previous_slide();
    }

    function up_down() {
        up_arrow.style.transform = 'translate(' + 2 + 'px, ' + 2 + 'px) rotate(' + UP + ')';
    }

    function down_up() {
        down_arrow.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px) rotate(' + DOWN + ')';
        next_slide();
    }

    function down_down() {
        down_arrow.style.transform = 'translate(' + 2 + 'px, ' + 2 + 'px) rotate(' + DOWN + ')';
    }

    function next_slide() {
        if (pos < slides.length - 1) {
            last_height += SCROLL_HEIGHT;
            for (i = 0; i < slides.length; i++) {
                slides[i].style.transform = 'translateY(-' + last_height + 'px)';
            } pos += 1;
        }
    }

    function previous_slide() {
        if (pos > 0) {
            last_height -= SCROLL_HEIGHT;
            for (i = slides.length - 1; i >= 0; i--) {
                slides[i].style.transform = 'translateY(-' + last_height + 'px)';
            } pos -= 1;
        }
    }

    function scroll(e) {
        var key_code = e.keyCode;
        console.log(key_code);
        if (key_code == 38 || key_code == 33 || (key_code == 32 && e.shiftKey)) {
            previous_slide();
        } else if (key_code == 40 || key_code == 34 || key_code == 32) {
            next_slide();
        } else if (key_code == 36) {
            last_height = SCROLL_HEIGHT;
            pos = 1;
            previous_slide();
        } else if (key_code == 35) {
            last_height = SCROLL_HEIGHT * (slides.length - 2);
            pos = slides.length - 2;
            next_slide();
        }
    }
}
