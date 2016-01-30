// Stuff that depend on the values set in CSS
const RADIUS = 200;
const POINT_OPACITY_TIMEOUT = 1000;

function Timer(callback, delay) {
    var timer_id;

    this.pause = function() {
        clearInterval(timer_id);
    };

    this.resume = function() {
        if (timer_id) {
            clearInterval(timer_id);
        } timer_id = setInterval(callback, delay);
    };

    this.resume();
}

function EventDistributor() {       // assumes that all events begin & end in 12 hours!
    var points = document.querySelectorAll('.point');
    var event_times = document.querySelectorAll('.event-time');
    var event_titles = document.querySelectorAll('.event-title');
    var event_box = document.getElementById('day-box');
    var point_dates_obj = {}, days = [], num_points = points.length, current = -1;

    if (num_points != event_times.length || num_points != event_titles.length) {
        throw "Exception: Unequal numbers of events & times! Check 'schedule.html'!"
    }

    for (i = 0; i < num_points; i++) {
        var raw_date = event_times[i].firstChild.nodeValue;
        var date = new Date(raw_date);
        var key = date.getFullYear() + ('0' + date.getMonth()).slice(-2) + date.getDate();

        if (point_dates_obj[key] == undefined) {
            point_dates_obj[key] = [];
        }

        var angle = (date.getHours() - 3) * 30 + date.getMinutes() / 2;
        var x = RADIUS * Math.cos(Math.PI * angle / 180);
        var y = RADIUS * Math.sin(Math.PI * angle / 180);
        points[i].style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        points[i].angle = angle;
        points[i].event_time = get_time_from_date(date);
        points[i].event_title = event_titles[i].firstChild.nodeValue;
        if (points[i].children.length == 3) {
            // blindly assumes that there's an "end time" for the event, and that the first child contains the time
            end_time = new Date(points[i].querySelectorAll('.event-end')[0].firstChild.nodeValue);
            points[i].end_angle = (end_time.getHours() - 3) * 30 + end_time.getMinutes() / 2;
        }

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
                points[i].style.opacity = 1;
                points[i].style.visibility = 'visible';
            } else {
                points[i].style.opacity = 0;
                points[i].style.visibility = 'hidden';
            }
        } rotate_hand_to(points[current_points_idx[0]]);
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

function move_hand_to(e) {
    window.clock_timer.pause();
    var hand = document.getElementById('hand');
    var points = window.distributor.current_points();

    for (var i = 0; i < points.length; i++) {
        if (points[i] == e) {
            rotate_hand_to(points[i]);
            hand.idx = i;
            break;
        }
    } window.clock_timer.resume();
}

window.onload = function() {
    window.distributor = new EventDistributor();
    var points = window.distributor.current_points();
    var hand = document.getElementById('hand');
    hand.idx = 1;
    window.clock_timer = new Timer(function() {       // put it inside the window so that we can access later
        if (hand.idx == points.length) {
            window.distributor.distribute();
            points = window.distributor.current_points();
            hand.idx = 0;
        } rotate_hand_to(points[hand.idx]);
        hand.idx += 1;
    }, 2500);
}
