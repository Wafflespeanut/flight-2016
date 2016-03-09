const SCROLL_HEIGHT = 100;
const UP = '-90deg';
const DOWN = '90deg';

function Scroller() {
    var pos = 0, last_height = 0;
    var scrollarea = document.getElementById('scroll-holder');
    var slides = scrollarea.querySelectorAll('.slide');
    var up_arrow = document.getElementById('arrow-up');
    var down_arrow = document.getElementById('arrow-down');
    var home_arrow = document.getElementById('double-up');
    var end_arrow = document.getElementById('double-down');

    if (window.innerWidth > MAX_WIDTH) {        // FIXME: screwed up! refactor some day...
        document.addEventListener('keydown', scroll, false);
        up_arrow.addEventListener('mouseup', up_up, false);
        home_arrow.addEventListener('mouseup', first_slide, false);
        up_arrow.addEventListener('mousedown', up_down, false);
        down_arrow.addEventListener('mouseup', down_up, false);
        end_arrow.addEventListener('mouseup', last_slide, false);
        down_arrow.addEventListener('mousedown', down_down, false);
    }

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
                slides[i].style.transform = 'translateY(-' + last_height + '%)';
            } pos += 1;
        }

        if (pos == slides.length - 1) {
            home_arrow.style.visibility = 'visible';
            home_arrow.style.opacity = 1;
        } else {
            home_arrow.style.visibility = 'hidden';
            home_arrow.style.opacity = 0;
        }

        end_arrow.style.visibility = 'hidden';
        end_arrow.style.opacity = 0;
    }

    function previous_slide() {
        if (pos > 0) {
            last_height -= SCROLL_HEIGHT;
            for (i = slides.length - 1; i >= 0; i--) {
                slides[i].style.transform = 'translateY(-' + last_height + '%)';
            } pos -= 1;
        }

        if (pos == 0) {
            end_arrow.style.visibility = 'visible';
            end_arrow.style.opacity = 1;
        } else {
            end_arrow.style.visibility = 'hidden';
            end_arrow.style.opacity = 0;
        }

        home_arrow.style.visibility = 'hidden';
        home_arrow.style.opacity = 0;
    }

    function first_slide() {
        pos = 1;
        last_height = SCROLL_HEIGHT;
        previous_slide();
    }

    function last_slide() {
        pos = slides.length - 2;
        last_height = SCROLL_HEIGHT * pos;
        next_slide();
    }

    function scroll(e) {
        var key_code = e.keyCode;
        if (key_code == 38 || key_code == 33 || (key_code == 32 && e.shiftKey)) {
            e.preventDefault();
            previous_slide();
        } else if (key_code == 40 || key_code == 34 || key_code == 32) {
            e.preventDefault();
            next_slide();
        } else if (key_code == 36) {
            e.preventDefault();
            first_slide();
        } else if (key_code == 35) {
            e.preventDefault();
            last_slide();
        }
    }
}
