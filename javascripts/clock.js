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

function get_time_from_date(date) {
    var mins = date.getMinutes(), hours = date.getHours();
    var suffix = (hours - 12 > 0) ? ' PM' : ' AM'
    return hours % 12 + ':' + ('0' + mins).slice(-2) + suffix;
}

function rotate_hand_to(point) {
    document.getElementById('display-event-title').innerHTML = point.event_title;
    document.getElementById('display-event-time').innerHTML = point.event_time;
    document.getElementById('hand').style.transform = 'rotate(' + point.angle + 'deg)';
}

function distribute_points() {      // assumes that all events begin & end in 12 hours!
    var points = document.querySelectorAll('.point');
    var num_points = points.length;
    var event_times = document.querySelectorAll('.event-time');
    var event_titles = document.querySelectorAll('.event-title');

    if (num_points != event_times.length || num_points != event_titles.length) {
        throw "Exception: Unequal numbers of events & times! Check 'schedule.html'!"
    }

    for (var i = 0; i < num_points; i++) {
        var date = new Date(event_times[i].firstChild.nodeValue);
        var angle = (date.getHours() - 3) * 30 + date.getMinutes() / 2;
        var x = 200 * Math.cos(Math.PI * angle / 180);
        var y = 200 * Math.sin(Math.PI * angle / 180);
        points[i].style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        points[i].angle = angle;
        points[i].event_time = get_time_from_date(date);
        points[i].event_title = event_titles[i].firstChild.nodeValue;
    } rotate_hand_to(points[0]);
}

function move_hand_to(e) {
    window.clock_timer.pause();
    var hand = document.getElementById('hand');
    var points = document.querySelectorAll('.point');

    for (var i = 0; i < points.length; i++) {
        if (points[i] == e) {
            rotate_hand_to(points[i]);
            hand.idx = i;
            break;
        }
    } window.clock_timer.resume();
}

window.onload = function() {
    distribute_points();
    var points = document.querySelectorAll('.point');
    var hand = document.getElementById('hand');
    hand.idx = 1;
    window.clock_timer = new Timer(function() {       // put it inside the window so that we can access later
        rotate_hand_to(points[hand.idx]);
        hand.idx += 1;
        if (hand.idx == points.length) {
            hand.idx = 0;
        }
    }, 2500);
}
