// change the constants to affect the countdown
const DEADLINE = 'January 25 2016 23:59:59 GMT+05:30';  // any parseable date is enough
const BASE_UNIT = 'second';     // the base unit from which subsequent units are derived
const FACTORS = [   // (singular) unit names and relative factors (object attributes are based on this)
    [BASE_UNIT, 1],     // BASE_UNIT shouldn't be removed!
    ['minute', 60],
    ['hour', 60],
    ['day', 24],
];

function time_calc() {      // all of this stunt is to construct an object out of the constant arrays
    var cur_unit, factor, prev_unit = BASE_UNIT, time_vals = {};
    var milli_secs = Date.parse(DEADLINE) - Date.parse(new Date());
    time_vals[BASE_UNIT] = time_vals['total'] = milli_secs / 1000;
    for (var i = 0; i < FACTORS.length; i++) {
        cur_unit = FACTORS[i][0], factor = FACTORS[i][1];
        time_vals[cur_unit] = Math.floor(time_vals[prev_unit] / factor);
        if (i) {
            time_vals[prev_unit] %= factor;
        } prev_unit = cur_unit;
    } return time_vals;
}
