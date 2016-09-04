'use strict';
module.exports = function(filecmd, diffcmd) {
  var colors = require('colors');
  var keypress = require('keypress');
  var figures = require('figures');
  var exec = require('child_process').exec;
  keypress(process.stdin);
  var pressedkey = "";
  var selected = 0;

  function execute(command, callback){
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.log("abort: no repository found");
          return;
        }
        if (stderr) {
          console.log("abort: no repository found");
          return;
        }
        callback(stdout);
      });
  };
  function prettify(diff) {
    var lines = diff.split("\n");
    var str = "";
    var isHeader = true;
    for (var line in lines) {
      line = lines[line];
      if (isHeader && line.startsWith("@@")) {
        isHeader = false;
        str += line.cyan + "\n"
      } else if (!isHeader) {
        if (line.startsWith("+")) {
          str += line.green;
        } else if (line.startsWith("-")) {
          str += line.red;
        } else {
          str += line;
        }
      str += "\n";
      }
    }
    return str;
  };
  function redraw(files, index) {
    execute(diffcmd + " " + files[index], function(diff) {
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
      console.log(prettify(diff));
      console.log("\n_______________\nPress Ctrl+C to exit.");
    })
  };


  execute(filecmd, function(output) {
    var splitted = output.split("\n");
    var files = [];
    for (var split in splitted) {
      split = splitted[split];
      if (split === "") continue;
      files.push(split);
    }
    var selected = 0;
    if (files.length === 0) {
      console.log("No diff available.");
      return;
    }

    process.stdin.on('keypress', function (ch, key) {
      //console.log('got "keypress"', key);
      if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
      } else if (key && key.name == 'up') {
        selected = selected - 1;
        if (selected < 0) {
          selected = files.length - 1;
        }
        redraw(files, selected);
      } else if (key && key.name == 'down') {
        selected = selected + 1;
        if (selected >= files.length) {
          selected = 0;
        }
        redraw(files, selected);
      }
    });

    redraw(files, 0);

    process.stdin.setRawMode(true);
    process.stdin.resume();
  });
};
