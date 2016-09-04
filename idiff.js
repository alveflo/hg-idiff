'use strict';
var colors = require('colors');
var exec = require('child_process').exec;
var keypress = require('keypress');
var figures = require('figures');

keypress(process.stdin);

var files = ['test.js', 'foo.js'];
var contents = ['apa', 'bepa'];
var pressedkey = "";
var selected = 0;

if (files.length === 0) {
  console.log('No diff available.');
  return;
}

function redraw(index) {
  process.stdout.write("\u001b[2J\u001b[0;0H");
  console.log('? '.green + 'Select file'.white.bold + ' (Use arrow keys)');
  for (var i = 0; i < files.length; i++) {
    var str = " " + files[i];
    if (i === index) {
      str = figures.circleFilled + str;
      console.log(str.bold.cyan);
    } else {
      str = figures.circleDotted + str;
      console.log(str);
    }
  }
  console.log("_______________\n");
  console.log(contents[index]);
};

process.stdin.on('keypress', function (ch, key) {
  //console.log('got "keypress"', key);
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  } else if (key && key.name == 'up') {
    selected = selected - 1;
    if (selected < 0) {
      selected = files.length - 1;
    }
    redraw(selected);
  } else if (key && key.name == 'down') {
    selected = selected + 1;
    if (selected >= files.length) {
      selected = 0;
    }
    redraw(selected);
  }
});

redraw(0);

process.stdin.setRawMode(true);
process.stdin.resume();
