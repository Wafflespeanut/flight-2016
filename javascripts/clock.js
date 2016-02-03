// Stuff that depend on the values set in CSS
const RADIUS = 225;
// Other constants
const HAND_TIMEOUT = 2500;
const BLEND_OPACITY_TIME = 500;
const BLEND_OPACITY = 0.8;
const SCALE = 2;

function Timer(callback, delay) {
    var timer_id;

    this.pause = function() {
        clearInterval(timer_id);
    };

    this.resume = function() {
        if (timer_id) {
            clearInterval(timer_id);
        } callback();     // so that there's no initial delay
        timer_id = setInterval(callback, delay);
    };

    this.resume();
}

function EventDistributor() {       // assumes that all events begin & end in 12 hours!
    var points = document.querySelectorAll('.event-icon');
    var event_times = document.querySelectorAll('.event-time');
    var event_titles = document.querySelectorAll('.event-title');
    var event_box = document.getElementById('day-box');
    var point_dates_obj = {}, days = [], num_points = points.length, current = -1;

    if (num_points != event_times.length || num_points != event_titles.length) {
        throw "unequal numbers of events & times! Check 'schedule.html'";
    }

    for (i = 0; i < num_points; i++) {
        var raw_date = event_times[i].firstChild.nodeValue;
        var date = new Date(raw_date);
        var key = date.getFullYear() + ('0' + date.getMonth()).slice(-2) + date.getDate();

        if (point_dates_obj[key] == undefined) {
            point_dates_obj[key] = [];
        }

        var angle = (date.getHours() - 3) * 30 + date.getMinutes() / 2;
        points[i].angle = angle;
        set_point(points[i]);
        set_time(points[i], date);
        points[i].event_title = event_titles[i].firstChild.nodeValue;

        point_dates_obj[key].push(i);  // remember the point corresponding to a day
        point_dates_obj[key].display_format = raw_date.split(' ').splice(0, 2).join(' ');
        if (!days.includes(key)) {
            days.push(key);
        }
    }

    days.sort();

    this.distribute = function() {
        current += 1;
        if (current == days.length) {
            current = 0;
        }

        var current_points_idx = point_dates_obj[days[current]];
        event_box.innerHTML = current_points_idx.display_format;
        for (i = 0; i < num_points; i++) {
            if (current_points_idx.includes(i)) {
                points[i].style.opacity = 0.5;
                points[i].style.visibility = 'visible';
            } else {
                points[i].style.opacity = 0;
                points[i].style.visibility = 'hidden';
            }
        }
    };

    this.current_points = function() {      // FIXME: could be an iterator, or the values could probably be stored
        var cur_points = [];
        var current_points_idx = point_dates_obj[days[current]];
        for (i = 0; i < num_points; i++) {
            if (current_points_idx.includes(i)) {
                cur_points.push(points[i]);
            }
        } return cur_points;
    }

    this.distribute();
}

function Clock() {
    var pos = 0;
    var distributor = new EventDistributor();
    var hand = document.getElementById('hand');
    var title = document.getElementById('display-event-title');
    var time = document.getElementById('display-event-time');
    var background = document.querySelector('.bg-image');
    var blend = document.querySelector('.bg-dissolve');
    var points = distributor.current_points();
    var prev_point = null;
    // var canvas = document.getElementById('arc-area');

    function rotate_hand_to(point) {
        set_point(prev_point);
        title.innerHTML = point.event_title;
        time.innerHTML = point.event_time;
        if (prev_point && prev_point.event_period != point.event_period) {
            blend.style.opacity = 1;
            setTimeout(function() {     // workaround for background image transition
                background.style.backgroundImage = 'url("images/' + point.event_period + '.jpg")';
                blend.style.opacity = BLEND_OPACITY;
            }, BLEND_OPACITY_TIME);
        } hand.style.transform = 'rotate(' + point.angle + 'deg)';
        scale_point(point);
        prev_point = point;
    }

    function rotate_hand() {
        if (pos == points.length) {
            distributor.distribute();
            points = distributor.current_points();
            pos = 0;
        } rotate_hand_to(points[pos]);
        pos += 1;
    }

    rotate_hand_to(points[0]);
    var clock_timer = new Timer(rotate_hand, HAND_TIMEOUT);

    this.move_hand_to = function(point) {
        clock_timer.pause();        // this should be resumed 'onmouseout'
        for (i = 0; i < points.length; i++) {
            if (points[i] == point) {
                rotate_hand_to(point);
                pos = i;
                break;
            }
        }
    }

    this.resume = function() {
        clock_timer.resume();
    }

    this.next_date = function() {
        clock_timer.pause();
        pos = points.length;
        clock_timer.resume();
    }
}

function set_time(point, date) {
    var mins = date.getMinutes(), hours = date.getHours();
    var suffix = (hours - 12 > 0) ? ' PM' : ' AM';
    if (hours > 12) {
        point.event_time = (hours - 12) + ':' + ('0' + mins).slice(-2) + suffix;
        if (hours >= 16) {
            point.event_period = 'evening';
        } else {
            point.event_period = 'noon';
        }
    } else {
        point.event_time = hours + ':' + ('0' + mins).slice(-2) + suffix;
        point.event_period = 'morning';
    }
}

function scale_point(point) {
    if (!point.style.transform.includes('scale')) {
        point.style.transform += 'scale(' + SCALE + ')';
        point.style.opacity = 1;
    }
}

function set_point(point) {
    if (point) {
        var x = RADIUS * Math.cos(Math.PI * point.angle / 180);
        var y = RADIUS * Math.sin(Math.PI * point.angle / 180);
        point.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        point.style.opacity = 0.5;
    }
}

window.onload = function() {
    window.event_clock = new Clock();   // put it inside the window so that we can access later (workaround)
}
