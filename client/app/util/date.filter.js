'use strict';

var MIN = 60 * 1000;
var HOUR = MIN * 60;
var DAY = HOUR * 24;
var MONTH = DAY * 30;
var YEAR = DAY * 365;

/**
 * pluralize a time
 * @param  {Date}   time : time to output
 * @param  {String} type : type of time eg 'Minute'
 * @return {String} pluralized version of time
 */
function pluralize(time, type) {
  return (time === 1) ? 'a ' + type + ' ago': time + ' ' + type + 's ago';
}

function dateFilter() {

  return function(date) {

    // convert date and capture current time
    date = new Date(date);
    var now = new Date();

    var elapsed = now - date;

    if (elapsed < MIN) {
         return 'A few seconds ago';
    }

    else if (elapsed < HOUR) {
      elapsed = Math.round(elapsed/MIN);
      return pluralize(elapsed, 'minute');
    }

    else if (elapsed < DAY ) {
      elapsed = Math.round(elapsed/HOUR);
      return pluralize(elapsed, 'hour');
    }

    else if (elapsed < MONTH) {
      elapsed = Math.round(elapsed/DAY);
      return pluralize(elapsed, 'day');
    }

    else if (elapsed < YEAR) {
      elapsed = Math.round(elapsed/MONTH);
      return pluralize(elapsed, 'month');
    }

    else {
      console.log(elapsed);
        return 'approximately ' + Math.round(elapsed/YEAR ) + ' years ago';
    }
  };
}

module.exports = dateFilter;
