function Timer(callback, delay) {
    var timer_id, start;

    this.pause = function() {
        clearInterval(timer_id);
    };

    this.resume = function() {
        start = new Date();
        if (timer_id) {
            clearInterval(timer_id);
        } timer_id = setInterval(callback, delay);
    };

    this.resume();
}

function distribute_points() {
    var points = document.querySelectorAll('.point');
    var num_points = points.length;
    for (var i = 0; i < num_points; i++) {
        var x = 200 * Math.cos(2 * Math.PI * i / num_points);
        var y = 200 * Math.sin(2 * Math.PI * i / num_points);
        points[i].style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    } return num_points;
}

function move_hand_to(e) {
    window.timer.pause();
    var hand = document.getElementById('hand');
    var points = document.querySelectorAll('.point');
    var num_points = points.length;

    for (var i = 0; i < num_points; i++) {
        if (points[i] == e) {
            hand.idx += i - hand.idx % num_points;
            hand.style.transform = 'rotate(' + 2 * Math.PI * hand.idx / num_points + 'rad)';
        }
    }

    hand.idx += 1;
    window.timer.resume();
}

window.onload = function() {
    var num_points = distribute_points();
    var hand = document.getElementById('hand');
    hand.idx = 1;
    window.timer = new Timer(function() {       // put it inside the window so that we can access later
        hand.style.transform = 'rotate(' + 2 * Math.PI * hand.idx / num_points + 'rad)';
        hand.idx += 1;
    }, 2500);
}
