const SCROLL_HEIGHT = 475;

function focus_scroll_box() {
    document.getElementById('scrollpage').focus();
    Scroller();
}

function Scroller() {
    var pos = 0;
    var scrollarea = document.getElementById('scrollpage');
    scrollarea.addEventListener('keydown', scroll, false);
    var slides = scrollarea.querySelectorAll('.slide');
    var last_height = 0;

    function scroll(e) {
        var key_code = e.keyCode;
        if (key_code == 40 && pos < slides.length - 1) {
            last_height += SCROLL_HEIGHT;
            for (i = 0; i < slides.length; i++) {
                slides[i].style.transform = 'translateY(-' + last_height + 'px)';
            } pos += 1;
        } else if (key_code == 38 && pos > 0) {
            last_height -= SCROLL_HEIGHT;
            for (i = slides.length - 1; i >= 0; i--) {
                slides[i].style.transform = 'translateY(-' + last_height + 'px)';
            } pos -= 1;
        }
    }
}
