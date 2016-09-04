'use strict';

var diff = require("./idiff.js");
diff("git ls-files -m", "git diff");
