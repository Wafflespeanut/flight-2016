function distribute_points_and_move_hand() {
    var points = document.querySelectorAll('.point');
    var num_points = points.length;
    for (var i = 0; i < num_points; i++) {
        var x = 200 * Math.cos(2 * Math.PI * i / num_points);
        var y = 200 * Math.sin(2 * Math.PI * i / num_points);
        points[i].style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    }

    var i = 1;
    var hand = document.getElementById('hand');
    setInterval(function() {
        hand.style.transform = 'rotate(' + 2 * Math.PI * i / num_points + 'rad)';
        console.log('rotate(' + 2 * Math.PI * i / num_points + 'rad)');
        i += 1;
    }, 2000);
}

window.onload = function() {
    distribute_points_and_move_hand();
}
