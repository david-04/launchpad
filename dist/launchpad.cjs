#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/kleur/index.js
var require_kleur = __commonJS({
  "node_modules/kleur/index.js"(exports2, module2) {
    "use strict";
    var { FORCE_COLOR, NODE_DISABLE_COLORS, TERM } = process.env;
    var $ = {
      enabled: !NODE_DISABLE_COLORS && TERM !== "dumb" && FORCE_COLOR !== "0",
      // modifiers
      reset: init2(0, 0),
      bold: init2(1, 22),
      dim: init2(2, 22),
      italic: init2(3, 23),
      underline: init2(4, 24),
      inverse: init2(7, 27),
      hidden: init2(8, 28),
      strikethrough: init2(9, 29),
      // colors
      black: init2(30, 39),
      red: init2(31, 39),
      green: init2(32, 39),
      yellow: init2(33, 39),
      blue: init2(34, 39),
      magenta: init2(35, 39),
      cyan: init2(36, 39),
      white: init2(37, 39),
      gray: init2(90, 39),
      grey: init2(90, 39),
      // background colors
      bgBlack: init2(40, 49),
      bgRed: init2(41, 49),
      bgGreen: init2(42, 49),
      bgYellow: init2(43, 49),
      bgBlue: init2(44, 49),
      bgMagenta: init2(45, 49),
      bgCyan: init2(46, 49),
      bgWhite: init2(47, 49)
    };
    function run(arr, str) {
      let i = 0, tmp, beg = "", end = "";
      for (; i < arr.length; i++) {
        tmp = arr[i];
        beg += tmp.open;
        end += tmp.close;
        if (str.includes(tmp.close)) {
          str = str.replace(tmp.rgx, tmp.close + tmp.open);
        }
      }
      return beg + str + end;
    }
    function chain(has, keys) {
      let ctx = { has, keys };
      ctx.reset = $.reset.bind(ctx);
      ctx.bold = $.bold.bind(ctx);
      ctx.dim = $.dim.bind(ctx);
      ctx.italic = $.italic.bind(ctx);
      ctx.underline = $.underline.bind(ctx);
      ctx.inverse = $.inverse.bind(ctx);
      ctx.hidden = $.hidden.bind(ctx);
      ctx.strikethrough = $.strikethrough.bind(ctx);
      ctx.black = $.black.bind(ctx);
      ctx.red = $.red.bind(ctx);
      ctx.green = $.green.bind(ctx);
      ctx.yellow = $.yellow.bind(ctx);
      ctx.blue = $.blue.bind(ctx);
      ctx.magenta = $.magenta.bind(ctx);
      ctx.cyan = $.cyan.bind(ctx);
      ctx.white = $.white.bind(ctx);
      ctx.gray = $.gray.bind(ctx);
      ctx.grey = $.grey.bind(ctx);
      ctx.bgBlack = $.bgBlack.bind(ctx);
      ctx.bgRed = $.bgRed.bind(ctx);
      ctx.bgGreen = $.bgGreen.bind(ctx);
      ctx.bgYellow = $.bgYellow.bind(ctx);
      ctx.bgBlue = $.bgBlue.bind(ctx);
      ctx.bgMagenta = $.bgMagenta.bind(ctx);
      ctx.bgCyan = $.bgCyan.bind(ctx);
      ctx.bgWhite = $.bgWhite.bind(ctx);
      return ctx;
    }
    function init2(open, close) {
      let blk = {
        open: `\x1B[${open}m`,
        close: `\x1B[${close}m`,
        rgx: new RegExp(`\\x1b\\[${close}m`, "g")
      };
      return function(txt) {
        if (this !== void 0 && this.has !== void 0) {
          this.has.includes(open) || (this.has.push(open), this.keys.push(blk));
          return txt === void 0 ? this : $.enabled ? run(this.keys, txt + "") : txt + "";
        }
        return txt === void 0 ? chain([open], [blk]) : $.enabled ? run([blk], txt + "") : txt + "";
      };
    }
    module2.exports = $;
  }
});

// node_modules/prompts/dist/util/action.js
var require_action = __commonJS({
  "node_modules/prompts/dist/util/action.js"(exports2, module2) {
    "use strict";
    module2.exports = (key, isSelect) => {
      if (key.meta && key.name !== "escape")
        return;
      if (key.ctrl) {
        if (key.name === "a")
          return "first";
        if (key.name === "c")
          return "abort";
        if (key.name === "d")
          return "abort";
        if (key.name === "e")
          return "last";
        if (key.name === "g")
          return "reset";
      }
      if (isSelect) {
        if (key.name === "j")
          return "down";
        if (key.name === "k")
          return "up";
      }
      if (key.name === "return")
        return "submit";
      if (key.name === "enter")
        return "submit";
      if (key.name === "backspace")
        return "delete";
      if (key.name === "delete")
        return "deleteForward";
      if (key.name === "abort")
        return "abort";
      if (key.name === "escape")
        return "exit";
      if (key.name === "tab")
        return "next";
      if (key.name === "pagedown")
        return "nextPage";
      if (key.name === "pageup")
        return "prevPage";
      if (key.name === "home")
        return "home";
      if (key.name === "end")
        return "end";
      if (key.name === "up")
        return "up";
      if (key.name === "down")
        return "down";
      if (key.name === "right")
        return "right";
      if (key.name === "left")
        return "left";
      return false;
    };
  }
});

// node_modules/prompts/dist/util/strip.js
var require_strip = __commonJS({
  "node_modules/prompts/dist/util/strip.js"(exports2, module2) {
    "use strict";
    module2.exports = (str) => {
      const pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))"].join("|");
      const RGX = new RegExp(pattern, "g");
      return typeof str === "string" ? str.replace(RGX, "") : str;
    };
  }
});

// node_modules/sisteransi/src/index.js
var require_src = __commonJS({
  "node_modules/sisteransi/src/index.js"(exports2, module2) {
    "use strict";
    var ESC = "\x1B";
    var CSI = `${ESC}[`;
    var beep = "\x07";
    var cursor = {
      to(x, y) {
        if (!y)
          return `${CSI}${x + 1}G`;
        return `${CSI}${y + 1};${x + 1}H`;
      },
      move(x, y) {
        let ret = "";
        if (x < 0)
          ret += `${CSI}${-x}D`;
        else if (x > 0)
          ret += `${CSI}${x}C`;
        if (y < 0)
          ret += `${CSI}${-y}A`;
        else if (y > 0)
          ret += `${CSI}${y}B`;
        return ret;
      },
      up: (count = 1) => `${CSI}${count}A`,
      down: (count = 1) => `${CSI}${count}B`,
      forward: (count = 1) => `${CSI}${count}C`,
      backward: (count = 1) => `${CSI}${count}D`,
      nextLine: (count = 1) => `${CSI}E`.repeat(count),
      prevLine: (count = 1) => `${CSI}F`.repeat(count),
      left: `${CSI}G`,
      hide: `${CSI}?25l`,
      show: `${CSI}?25h`,
      save: `${ESC}7`,
      restore: `${ESC}8`
    };
    var scroll = {
      up: (count = 1) => `${CSI}S`.repeat(count),
      down: (count = 1) => `${CSI}T`.repeat(count)
    };
    var erase = {
      screen: `${CSI}2J`,
      up: (count = 1) => `${CSI}1J`.repeat(count),
      down: (count = 1) => `${CSI}J`.repeat(count),
      line: `${CSI}2K`,
      lineEnd: `${CSI}K`,
      lineStart: `${CSI}1K`,
      lines(count) {
        let clear = "";
        for (let i = 0; i < count; i++)
          clear += this.line + (i < count - 1 ? cursor.up() : "");
        if (count)
          clear += cursor.left;
        return clear;
      }
    };
    module2.exports = { cursor, scroll, erase, beep };
  }
});

// node_modules/prompts/dist/util/clear.js
var require_clear = __commonJS({
  "node_modules/prompts/dist/util/clear.js"(exports2, module2) {
    "use strict";
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          var F = function F2() {
          };
          return { s: F, n: function n() {
            if (i >= o.length)
              return { done: true };
            return { done: false, value: o[i++] };
          }, e: function e(_e) {
            throw _e;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var normalCompletion = true, didErr = false, err;
      return { s: function s() {
        it = it.call(o);
      }, n: function n() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      }, e: function e(_e2) {
        didErr = true;
        err = _e2;
      }, f: function f() {
        try {
          if (!normalCompletion && it.return != null)
            it.return();
        } finally {
          if (didErr)
            throw err;
        }
      } };
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    var strip = require_strip();
    var _require = require_src();
    var erase = _require.erase;
    var cursor = _require.cursor;
    var width = (str) => [...strip(str)].length;
    module2.exports = function(prompt2, perLine) {
      if (!perLine)
        return erase.line + cursor.to(0);
      let rows = 0;
      const lines = prompt2.split(/\r?\n/);
      var _iterator = _createForOfIteratorHelper(lines), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          let line = _step.value;
          rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return erase.lines(rows);
    };
  }
});

// node_modules/prompts/dist/util/figures.js
var require_figures = __commonJS({
  "node_modules/prompts/dist/util/figures.js"(exports2, module2) {
    "use strict";
    var main = {
      arrowUp: "\u2191",
      arrowDown: "\u2193",
      arrowLeft: "\u2190",
      arrowRight: "\u2192",
      radioOn: "\u25C9",
      radioOff: "\u25EF",
      tick: "\u2714",
      cross: "\u2716",
      ellipsis: "\u2026",
      pointerSmall: "\u203A",
      line: "\u2500",
      pointer: "\u276F"
    };
    var win = {
      arrowUp: main.arrowUp,
      arrowDown: main.arrowDown,
      arrowLeft: main.arrowLeft,
      arrowRight: main.arrowRight,
      radioOn: "(*)",
      radioOff: "( )",
      tick: "\u221A",
      cross: "\xD7",
      ellipsis: "...",
      pointerSmall: "\xBB",
      line: "\u2500",
      pointer: ">"
    };
    var figures = process.platform === "win32" ? win : main;
    module2.exports = figures;
  }
});

// node_modules/prompts/dist/util/style.js
var require_style = __commonJS({
  "node_modules/prompts/dist/util/style.js"(exports2, module2) {
    "use strict";
    var c = require_kleur();
    var figures = require_figures();
    var styles = Object.freeze({
      password: {
        scale: 1,
        render: (input) => "*".repeat(input.length)
      },
      emoji: {
        scale: 2,
        render: (input) => "\u{1F603}".repeat(input.length)
      },
      invisible: {
        scale: 0,
        render: (input) => ""
      },
      default: {
        scale: 1,
        render: (input) => `${input}`
      }
    });
    var render = (type) => styles[type] || styles.default;
    var symbols = Object.freeze({
      aborted: c.red(figures.cross),
      done: c.green(figures.tick),
      exited: c.yellow(figures.cross),
      default: c.cyan("?")
    });
    var symbol = (done, aborted, exited) => aborted ? symbols.aborted : exited ? symbols.exited : done ? symbols.done : symbols.default;
    var delimiter = (completing) => c.gray(completing ? figures.ellipsis : figures.pointerSmall);
    var item = (expandable, expanded) => c.gray(expandable ? expanded ? figures.pointerSmall : "+" : figures.line);
    module2.exports = {
      styles,
      render,
      symbols,
      symbol,
      delimiter,
      item
    };
  }
});

// node_modules/prompts/dist/util/lines.js
var require_lines = __commonJS({
  "node_modules/prompts/dist/util/lines.js"(exports2, module2) {
    "use strict";
    var strip = require_strip();
    module2.exports = function(msg, perLine) {
      let lines = String(strip(msg) || "").split(/\r?\n/);
      if (!perLine)
        return lines.length;
      return lines.map((l) => Math.ceil(l.length / perLine)).reduce((a, b) => a + b);
    };
  }
});

// node_modules/prompts/dist/util/wrap.js
var require_wrap = __commonJS({
  "node_modules/prompts/dist/util/wrap.js"(exports2, module2) {
    "use strict";
    module2.exports = (msg, opts = {}) => {
      const tab = Number.isSafeInteger(parseInt(opts.margin)) ? new Array(parseInt(opts.margin)).fill(" ").join("") : opts.margin || "";
      const width = opts.width;
      return (msg || "").split(/\r?\n/g).map((line) => line.split(/\s+/g).reduce((arr, w) => {
        if (w.length + tab.length >= width || arr[arr.length - 1].length + w.length + 1 < width)
          arr[arr.length - 1] += ` ${w}`;
        else
          arr.push(`${tab}${w}`);
        return arr;
      }, [tab]).join("\n")).join("\n");
    };
  }
});

// node_modules/prompts/dist/util/entriesToDisplay.js
var require_entriesToDisplay = __commonJS({
  "node_modules/prompts/dist/util/entriesToDisplay.js"(exports2, module2) {
    "use strict";
    module2.exports = (cursor, total, maxVisible) => {
      maxVisible = maxVisible || total;
      let startIndex = Math.min(total - maxVisible, cursor - Math.floor(maxVisible / 2));
      if (startIndex < 0)
        startIndex = 0;
      let endIndex = Math.min(startIndex + maxVisible, total);
      return {
        startIndex,
        endIndex
      };
    };
  }
});

// node_modules/prompts/dist/util/index.js
var require_util = __commonJS({
  "node_modules/prompts/dist/util/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      action: require_action(),
      clear: require_clear(),
      style: require_style(),
      strip: require_strip(),
      figures: require_figures(),
      lines: require_lines(),
      wrap: require_wrap(),
      entriesToDisplay: require_entriesToDisplay()
    };
  }
});

// node_modules/prompts/dist/elements/prompt.js
var require_prompt = __commonJS({
  "node_modules/prompts/dist/elements/prompt.js"(exports2, module2) {
    "use strict";
    var readline = require("readline");
    var _require = require_util();
    var action = _require.action;
    var EventEmitter = require("events");
    var _require2 = require_src();
    var beep = _require2.beep;
    var cursor = _require2.cursor;
    var color = require_kleur();
    var Prompt = class extends EventEmitter {
      constructor(opts = {}) {
        super();
        this.firstRender = true;
        this.in = opts.stdin || process.stdin;
        this.out = opts.stdout || process.stdout;
        this.onRender = (opts.onRender || (() => void 0)).bind(this);
        const rl = readline.createInterface({
          input: this.in,
          escapeCodeTimeout: 50
        });
        readline.emitKeypressEvents(this.in, rl);
        if (this.in.isTTY)
          this.in.setRawMode(true);
        const isSelect = ["SelectPrompt", "MultiselectPrompt"].indexOf(this.constructor.name) > -1;
        const keypress = (str, key) => {
          let a = action(key, isSelect);
          if (a === false) {
            this._ && this._(str, key);
          } else if (typeof this[a] === "function") {
            this[a](key);
          } else {
            this.bell();
          }
        };
        this.close = () => {
          this.out.write(cursor.show);
          this.in.removeListener("keypress", keypress);
          if (this.in.isTTY)
            this.in.setRawMode(false);
          rl.close();
          this.emit(this.aborted ? "abort" : this.exited ? "exit" : "submit", this.value);
          this.closed = true;
        };
        this.in.on("keypress", keypress);
      }
      fire() {
        this.emit("state", {
          value: this.value,
          aborted: !!this.aborted,
          exited: !!this.exited
        });
      }
      bell() {
        this.out.write(beep);
      }
      render() {
        this.onRender(color);
        if (this.firstRender)
          this.firstRender = false;
      }
    };
    module2.exports = Prompt;
  }
});

// node_modules/prompts/dist/elements/text.js
var require_text = __commonJS({
  "node_modules/prompts/dist/elements/text.js"(exports2, module2) {
    "use strict";
    function asyncGeneratorStep(gen, resolve2, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error2) {
        reject(error2);
        return;
      }
      if (info.done) {
        resolve2(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve2, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve2, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve2, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_src();
    var erase = _require.erase;
    var cursor = _require.cursor;
    var _require2 = require_util();
    var style = _require2.style;
    var clear = _require2.clear;
    var lines = _require2.lines;
    var figures = _require2.figures;
    var TextPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.transform = style.render(opts.style);
        this.scale = this.transform.scale;
        this.msg = opts.message;
        this.initial = opts.initial || ``;
        this.validator = opts.validate || (() => true);
        this.value = ``;
        this.errorMsg = opts.error || `Please Enter A Valid Value`;
        this.cursor = Number(!!this.initial);
        this.cursorOffset = 0;
        this.clear = clear(``, this.out.columns);
        this.render();
      }
      set value(v) {
        if (!v && this.initial) {
          this.placeholder = true;
          this.rendered = color.gray(this.transform.render(this.initial));
        } else {
          this.placeholder = false;
          this.rendered = this.transform.render(v);
        }
        this._value = v;
        this.fire();
      }
      get value() {
        return this._value;
      }
      reset() {
        this.value = ``;
        this.cursor = Number(!!this.initial);
        this.cursorOffset = 0;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.value = this.value || this.initial;
        this.done = this.aborted = true;
        this.error = false;
        this.red = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      validate() {
        var _this = this;
        return _asyncToGenerator(function* () {
          let valid = yield _this.validator(_this.value);
          if (typeof valid === `string`) {
            _this.errorMsg = valid;
            valid = false;
          }
          _this.error = !valid;
        })();
      }
      submit() {
        var _this2 = this;
        return _asyncToGenerator(function* () {
          _this2.value = _this2.value || _this2.initial;
          _this2.cursorOffset = 0;
          _this2.cursor = _this2.rendered.length;
          yield _this2.validate();
          if (_this2.error) {
            _this2.red = true;
            _this2.fire();
            _this2.render();
            return;
          }
          _this2.done = true;
          _this2.aborted = false;
          _this2.fire();
          _this2.render();
          _this2.out.write("\n");
          _this2.close();
        })();
      }
      next() {
        if (!this.placeholder)
          return this.bell();
        this.value = this.initial;
        this.cursor = this.rendered.length;
        this.fire();
        this.render();
      }
      moveCursor(n) {
        if (this.placeholder)
          return;
        this.cursor = this.cursor + n;
        this.cursorOffset += n;
      }
      _(c, key) {
        let s1 = this.value.slice(0, this.cursor);
        let s2 = this.value.slice(this.cursor);
        this.value = `${s1}${c}${s2}`;
        this.red = false;
        this.cursor = this.placeholder ? 0 : s1.length + 1;
        this.render();
      }
      delete() {
        if (this.isCursorAtStart())
          return this.bell();
        let s1 = this.value.slice(0, this.cursor - 1);
        let s2 = this.value.slice(this.cursor);
        this.value = `${s1}${s2}`;
        this.red = false;
        if (this.isCursorAtStart()) {
          this.cursorOffset = 0;
        } else {
          this.cursorOffset++;
          this.moveCursor(-1);
        }
        this.render();
      }
      deleteForward() {
        if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
          return this.bell();
        let s1 = this.value.slice(0, this.cursor);
        let s2 = this.value.slice(this.cursor + 1);
        this.value = `${s1}${s2}`;
        this.red = false;
        if (this.isCursorAtEnd()) {
          this.cursorOffset = 0;
        } else {
          this.cursorOffset++;
        }
        this.render();
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.value.length;
        this.render();
      }
      left() {
        if (this.cursor <= 0 || this.placeholder)
          return this.bell();
        this.moveCursor(-1);
        this.render();
      }
      right() {
        if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
          return this.bell();
        this.moveCursor(1);
        this.render();
      }
      isCursorAtStart() {
        return this.cursor === 0 || this.placeholder && this.cursor === 1;
      }
      isCursorAtEnd() {
        return this.cursor === this.rendered.length || this.placeholder && this.cursor === this.rendered.length + 1;
      }
      render() {
        if (this.closed)
          return;
        if (!this.firstRender) {
          if (this.outputError)
            this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
          this.out.write(clear(this.outputText, this.out.columns));
        }
        super.render();
        this.outputError = "";
        this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.red ? color.red(this.rendered) : this.rendered].join(` `);
        if (this.error) {
          this.outputError += this.errorMsg.split(`
`).reduce((a, l, i) => a + `
${i ? " " : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore + cursor.move(this.cursorOffset, 0));
      }
    };
    module2.exports = TextPrompt;
  }
});

// node_modules/prompts/dist/elements/select.js
var require_select = __commonJS({
  "node_modules/prompts/dist/elements/select.js"(exports2, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_util();
    var style = _require.style;
    var clear = _require.clear;
    var figures = _require.figures;
    var wrap = _require.wrap;
    var entriesToDisplay = _require.entriesToDisplay;
    var _require2 = require_src();
    var cursor = _require2.cursor;
    var SelectPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.hint = opts.hint || "- Use arrow-keys. Return to submit.";
        this.warn = opts.warn || "- This option is disabled";
        this.cursor = opts.initial || 0;
        this.choices = opts.choices.map((ch, idx) => {
          if (typeof ch === "string")
            ch = {
              title: ch,
              value: idx
            };
          return {
            title: ch && (ch.title || ch.value || ch),
            value: ch && (ch.value === void 0 ? idx : ch.value),
            description: ch && ch.description,
            selected: ch && ch.selected,
            disabled: ch && ch.disabled
          };
        });
        this.optionsPerPage = opts.optionsPerPage || 10;
        this.value = (this.choices[this.cursor] || {}).value;
        this.clear = clear("", this.out.columns);
        this.render();
      }
      moveCursor(n) {
        this.cursor = n;
        this.value = this.choices[n].value;
        this.fire();
      }
      reset() {
        this.moveCursor(0);
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        if (!this.selection.disabled) {
          this.done = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        } else
          this.bell();
      }
      first() {
        this.moveCursor(0);
        this.render();
      }
      last() {
        this.moveCursor(this.choices.length - 1);
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.moveCursor(this.choices.length - 1);
        } else {
          this.moveCursor(this.cursor - 1);
        }
        this.render();
      }
      down() {
        if (this.cursor === this.choices.length - 1) {
          this.moveCursor(0);
        } else {
          this.moveCursor(this.cursor + 1);
        }
        this.render();
      }
      next() {
        this.moveCursor((this.cursor + 1) % this.choices.length);
        this.render();
      }
      _(c, key) {
        if (c === " ")
          return this.submit();
      }
      get selection() {
        return this.choices[this.cursor];
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        let _entriesToDisplay = entriesToDisplay(this.cursor, this.choices.length, this.optionsPerPage), startIndex = _entriesToDisplay.startIndex, endIndex = _entriesToDisplay.endIndex;
        this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.done ? this.selection.title : this.selection.disabled ? color.yellow(this.warn) : color.gray(this.hint)].join(" ");
        if (!this.done) {
          this.outputText += "\n";
          for (let i = startIndex; i < endIndex; i++) {
            let title, prefix, desc = "", v = this.choices[i];
            if (i === startIndex && startIndex > 0) {
              prefix = figures.arrowUp;
            } else if (i === endIndex - 1 && endIndex < this.choices.length) {
              prefix = figures.arrowDown;
            } else {
              prefix = " ";
            }
            if (v.disabled) {
              title = this.cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
              prefix = (this.cursor === i ? color.bold().gray(figures.pointer) + " " : "  ") + prefix;
            } else {
              title = this.cursor === i ? color.cyan().underline(v.title) : v.title;
              prefix = (this.cursor === i ? color.cyan(figures.pointer) + " " : "  ") + prefix;
              if (v.description && this.cursor === i) {
                desc = ` - ${v.description}`;
                if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
                  desc = "\n" + wrap(v.description, {
                    margin: 3,
                    width: this.out.columns
                  });
                }
              }
            }
            this.outputText += `${prefix} ${title}${color.gray(desc)}
`;
          }
        }
        this.out.write(this.outputText);
      }
    };
    module2.exports = SelectPrompt;
  }
});

// node_modules/prompts/dist/elements/toggle.js
var require_toggle = __commonJS({
  "node_modules/prompts/dist/elements/toggle.js"(exports2, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_util();
    var style = _require.style;
    var clear = _require.clear;
    var _require2 = require_src();
    var cursor = _require2.cursor;
    var erase = _require2.erase;
    var TogglePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.value = !!opts.initial;
        this.active = opts.active || "on";
        this.inactive = opts.inactive || "off";
        this.initialValue = this.value;
        this.render();
      }
      reset() {
        this.value = this.initialValue;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      deactivate() {
        if (this.value === false)
          return this.bell();
        this.value = false;
        this.render();
      }
      activate() {
        if (this.value === true)
          return this.bell();
        this.value = true;
        this.render();
      }
      delete() {
        this.deactivate();
      }
      left() {
        this.deactivate();
      }
      right() {
        this.activate();
      }
      down() {
        this.deactivate();
      }
      up() {
        this.activate();
      }
      next() {
        this.value = !this.value;
        this.fire();
        this.render();
      }
      _(c, key) {
        if (c === " ") {
          this.value = !this.value;
        } else if (c === "1") {
          this.value = true;
        } else if (c === "0") {
          this.value = false;
        } else
          return this.bell();
        this.render();
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.value ? this.inactive : color.cyan().underline(this.inactive), color.gray("/"), this.value ? color.cyan().underline(this.active) : this.active].join(" ");
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = TogglePrompt;
  }
});

// node_modules/prompts/dist/dateparts/datepart.js
var require_datepart = __commonJS({
  "node_modules/prompts/dist/dateparts/datepart.js"(exports2, module2) {
    "use strict";
    var DatePart = class _DatePart {
      constructor({
        token,
        date,
        parts,
        locales
      }) {
        this.token = token;
        this.date = date || /* @__PURE__ */ new Date();
        this.parts = parts || [this];
        this.locales = locales || {};
      }
      up() {
      }
      down() {
      }
      next() {
        const currentIdx = this.parts.indexOf(this);
        return this.parts.find((part, idx) => idx > currentIdx && part instanceof _DatePart);
      }
      setTo(val) {
      }
      prev() {
        let parts = [].concat(this.parts).reverse();
        const currentIdx = parts.indexOf(this);
        return parts.find((part, idx) => idx > currentIdx && part instanceof _DatePart);
      }
      toString() {
        return String(this.date);
      }
    };
    module2.exports = DatePart;
  }
});

// node_modules/prompts/dist/dateparts/meridiem.js
var require_meridiem = __commonJS({
  "node_modules/prompts/dist/dateparts/meridiem.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Meridiem = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setHours((this.date.getHours() + 12) % 24);
      }
      down() {
        this.up();
      }
      toString() {
        let meridiem = this.date.getHours() > 12 ? "pm" : "am";
        return /\A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
      }
    };
    module2.exports = Meridiem;
  }
});

// node_modules/prompts/dist/dateparts/day.js
var require_day = __commonJS({
  "node_modules/prompts/dist/dateparts/day.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart();
    var pos = (n) => {
      n = n % 10;
      return n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
    };
    var Day = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setDate(this.date.getDate() + 1);
      }
      down() {
        this.date.setDate(this.date.getDate() - 1);
      }
      setTo(val) {
        this.date.setDate(parseInt(val.substr(-2)));
      }
      toString() {
        let date = this.date.getDate();
        let day = this.date.getDay();
        return this.token === "DD" ? String(date).padStart(2, "0") : this.token === "Do" ? date + pos(date) : this.token === "d" ? day + 1 : this.token === "ddd" ? this.locales.weekdaysShort[day] : this.token === "dddd" ? this.locales.weekdays[day] : date;
      }
    };
    module2.exports = Day;
  }
});

// node_modules/prompts/dist/dateparts/hours.js
var require_hours = __commonJS({
  "node_modules/prompts/dist/dateparts/hours.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Hours = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setHours(this.date.getHours() + 1);
      }
      down() {
        this.date.setHours(this.date.getHours() - 1);
      }
      setTo(val) {
        this.date.setHours(parseInt(val.substr(-2)));
      }
      toString() {
        let hours = this.date.getHours();
        if (/h/.test(this.token))
          hours = hours % 12 || 12;
        return this.token.length > 1 ? String(hours).padStart(2, "0") : hours;
      }
    };
    module2.exports = Hours;
  }
});

// node_modules/prompts/dist/dateparts/milliseconds.js
var require_milliseconds = __commonJS({
  "node_modules/prompts/dist/dateparts/milliseconds.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Milliseconds = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMilliseconds(this.date.getMilliseconds() + 1);
      }
      down() {
        this.date.setMilliseconds(this.date.getMilliseconds() - 1);
      }
      setTo(val) {
        this.date.setMilliseconds(parseInt(val.substr(-this.token.length)));
      }
      toString() {
        return String(this.date.getMilliseconds()).padStart(4, "0").substr(0, this.token.length);
      }
    };
    module2.exports = Milliseconds;
  }
});

// node_modules/prompts/dist/dateparts/minutes.js
var require_minutes = __commonJS({
  "node_modules/prompts/dist/dateparts/minutes.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Minutes = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMinutes(this.date.getMinutes() + 1);
      }
      down() {
        this.date.setMinutes(this.date.getMinutes() - 1);
      }
      setTo(val) {
        this.date.setMinutes(parseInt(val.substr(-2)));
      }
      toString() {
        let m = this.date.getMinutes();
        return this.token.length > 1 ? String(m).padStart(2, "0") : m;
      }
    };
    module2.exports = Minutes;
  }
});

// node_modules/prompts/dist/dateparts/month.js
var require_month = __commonJS({
  "node_modules/prompts/dist/dateparts/month.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Month = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMonth(this.date.getMonth() + 1);
      }
      down() {
        this.date.setMonth(this.date.getMonth() - 1);
      }
      setTo(val) {
        val = parseInt(val.substr(-2)) - 1;
        this.date.setMonth(val < 0 ? 0 : val);
      }
      toString() {
        let month = this.date.getMonth();
        let tl = this.token.length;
        return tl === 2 ? String(month + 1).padStart(2, "0") : tl === 3 ? this.locales.monthsShort[month] : tl === 4 ? this.locales.months[month] : String(month + 1);
      }
    };
    module2.exports = Month;
  }
});

// node_modules/prompts/dist/dateparts/seconds.js
var require_seconds = __commonJS({
  "node_modules/prompts/dist/dateparts/seconds.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Seconds = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setSeconds(this.date.getSeconds() + 1);
      }
      down() {
        this.date.setSeconds(this.date.getSeconds() - 1);
      }
      setTo(val) {
        this.date.setSeconds(parseInt(val.substr(-2)));
      }
      toString() {
        let s = this.date.getSeconds();
        return this.token.length > 1 ? String(s).padStart(2, "0") : s;
      }
    };
    module2.exports = Seconds;
  }
});

// node_modules/prompts/dist/dateparts/year.js
var require_year = __commonJS({
  "node_modules/prompts/dist/dateparts/year.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Year = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setFullYear(this.date.getFullYear() + 1);
      }
      down() {
        this.date.setFullYear(this.date.getFullYear() - 1);
      }
      setTo(val) {
        this.date.setFullYear(val.substr(-4));
      }
      toString() {
        let year = String(this.date.getFullYear()).padStart(4, "0");
        return this.token.length === 2 ? year.substr(-2) : year;
      }
    };
    module2.exports = Year;
  }
});

// node_modules/prompts/dist/dateparts/index.js
var require_dateparts = __commonJS({
  "node_modules/prompts/dist/dateparts/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      DatePart: require_datepart(),
      Meridiem: require_meridiem(),
      Day: require_day(),
      Hours: require_hours(),
      Milliseconds: require_milliseconds(),
      Minutes: require_minutes(),
      Month: require_month(),
      Seconds: require_seconds(),
      Year: require_year()
    };
  }
});

// node_modules/prompts/dist/elements/date.js
var require_date = __commonJS({
  "node_modules/prompts/dist/elements/date.js"(exports2, module2) {
    "use strict";
    function asyncGeneratorStep(gen, resolve2, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error2) {
        reject(error2);
        return;
      }
      if (info.done) {
        resolve2(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve2, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve2, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve2, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_util();
    var style = _require.style;
    var clear = _require.clear;
    var figures = _require.figures;
    var _require2 = require_src();
    var erase = _require2.erase;
    var cursor = _require2.cursor;
    var _require3 = require_dateparts();
    var DatePart = _require3.DatePart;
    var Meridiem = _require3.Meridiem;
    var Day = _require3.Day;
    var Hours = _require3.Hours;
    var Milliseconds = _require3.Milliseconds;
    var Minutes = _require3.Minutes;
    var Month = _require3.Month;
    var Seconds = _require3.Seconds;
    var Year = _require3.Year;
    var regex = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
    var regexGroups = {
      1: ({
        token
      }) => token.replace(/\\(.)/g, "$1"),
      2: (opts) => new Day(opts),
      // Day // TODO
      3: (opts) => new Month(opts),
      // Month
      4: (opts) => new Year(opts),
      // Year
      5: (opts) => new Meridiem(opts),
      // AM/PM // TODO (special)
      6: (opts) => new Hours(opts),
      // Hours
      7: (opts) => new Minutes(opts),
      // Minutes
      8: (opts) => new Seconds(opts),
      // Seconds
      9: (opts) => new Milliseconds(opts)
      // Fractional seconds
    };
    var dfltLocales = {
      months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
      monthsShort: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
      weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
      weekdaysShort: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",")
    };
    var DatePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.cursor = 0;
        this.typed = "";
        this.locales = Object.assign(dfltLocales, opts.locales);
        this._date = opts.initial || /* @__PURE__ */ new Date();
        this.errorMsg = opts.error || "Please Enter A Valid Value";
        this.validator = opts.validate || (() => true);
        this.mask = opts.mask || "YYYY-MM-DD HH:mm:ss";
        this.clear = clear("", this.out.columns);
        this.render();
      }
      get value() {
        return this.date;
      }
      get date() {
        return this._date;
      }
      set date(date) {
        if (date)
          this._date.setTime(date.getTime());
      }
      set mask(mask) {
        let result;
        this.parts = [];
        while (result = regex.exec(mask)) {
          let match = result.shift();
          let idx = result.findIndex((gr) => gr != null);
          this.parts.push(idx in regexGroups ? regexGroups[idx]({
            token: result[idx] || match,
            date: this.date,
            parts: this.parts,
            locales: this.locales
          }) : result[idx] || match);
        }
        let parts = this.parts.reduce((arr, i) => {
          if (typeof i === "string" && typeof arr[arr.length - 1] === "string")
            arr[arr.length - 1] += i;
          else
            arr.push(i);
          return arr;
        }, []);
        this.parts.splice(0);
        this.parts.push(...parts);
        this.reset();
      }
      moveCursor(n) {
        this.typed = "";
        this.cursor = n;
        this.fire();
      }
      reset() {
        this.moveCursor(this.parts.findIndex((p) => p instanceof DatePart));
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.error = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      validate() {
        var _this = this;
        return _asyncToGenerator(function* () {
          let valid = yield _this.validator(_this.value);
          if (typeof valid === "string") {
            _this.errorMsg = valid;
            valid = false;
          }
          _this.error = !valid;
        })();
      }
      submit() {
        var _this2 = this;
        return _asyncToGenerator(function* () {
          yield _this2.validate();
          if (_this2.error) {
            _this2.color = "red";
            _this2.fire();
            _this2.render();
            return;
          }
          _this2.done = true;
          _this2.aborted = false;
          _this2.fire();
          _this2.render();
          _this2.out.write("\n");
          _this2.close();
        })();
      }
      up() {
        this.typed = "";
        this.parts[this.cursor].up();
        this.render();
      }
      down() {
        this.typed = "";
        this.parts[this.cursor].down();
        this.render();
      }
      left() {
        let prev = this.parts[this.cursor].prev();
        if (prev == null)
          return this.bell();
        this.moveCursor(this.parts.indexOf(prev));
        this.render();
      }
      right() {
        let next = this.parts[this.cursor].next();
        if (next == null)
          return this.bell();
        this.moveCursor(this.parts.indexOf(next));
        this.render();
      }
      next() {
        let next = this.parts[this.cursor].next();
        this.moveCursor(next ? this.parts.indexOf(next) : this.parts.findIndex((part) => part instanceof DatePart));
        this.render();
      }
      _(c) {
        if (/\d/.test(c)) {
          this.typed += c;
          this.parts[this.cursor].setTo(this.typed);
          this.render();
        }
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? color.cyan().underline(p.toString()) : p), []).join("")].join(" ");
        if (this.error) {
          this.outputText += this.errorMsg.split("\n").reduce((a, l, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = DatePrompt;
  }
});

// node_modules/prompts/dist/elements/number.js
var require_number = __commonJS({
  "node_modules/prompts/dist/elements/number.js"(exports2, module2) {
    "use strict";
    function asyncGeneratorStep(gen, resolve2, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error2) {
        reject(error2);
        return;
      }
      if (info.done) {
        resolve2(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve2, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve2, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve2, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_src();
    var cursor = _require.cursor;
    var erase = _require.erase;
    var _require2 = require_util();
    var style = _require2.style;
    var figures = _require2.figures;
    var clear = _require2.clear;
    var lines = _require2.lines;
    var isNumber = /[0-9]/;
    var isDef = (any) => any !== void 0;
    var round = (number, precision) => {
      let factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    };
    var NumberPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.transform = style.render(opts.style);
        this.msg = opts.message;
        this.initial = isDef(opts.initial) ? opts.initial : "";
        this.float = !!opts.float;
        this.round = opts.round || 2;
        this.inc = opts.increment || 1;
        this.min = isDef(opts.min) ? opts.min : -Infinity;
        this.max = isDef(opts.max) ? opts.max : Infinity;
        this.errorMsg = opts.error || `Please Enter A Valid Value`;
        this.validator = opts.validate || (() => true);
        this.color = `cyan`;
        this.value = ``;
        this.typed = ``;
        this.lastHit = 0;
        this.render();
      }
      set value(v) {
        if (!v && v !== 0) {
          this.placeholder = true;
          this.rendered = color.gray(this.transform.render(`${this.initial}`));
          this._value = ``;
        } else {
          this.placeholder = false;
          this.rendered = this.transform.render(`${round(v, this.round)}`);
          this._value = round(v, this.round);
        }
        this.fire();
      }
      get value() {
        return this._value;
      }
      parse(x) {
        return this.float ? parseFloat(x) : parseInt(x);
      }
      valid(c) {
        return c === `-` || c === `.` && this.float || isNumber.test(c);
      }
      reset() {
        this.typed = ``;
        this.value = ``;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        let x = this.value;
        this.value = x !== `` ? x : this.initial;
        this.done = this.aborted = true;
        this.error = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      }
      validate() {
        var _this = this;
        return _asyncToGenerator(function* () {
          let valid = yield _this.validator(_this.value);
          if (typeof valid === `string`) {
            _this.errorMsg = valid;
            valid = false;
          }
          _this.error = !valid;
        })();
      }
      submit() {
        var _this2 = this;
        return _asyncToGenerator(function* () {
          yield _this2.validate();
          if (_this2.error) {
            _this2.color = `red`;
            _this2.fire();
            _this2.render();
            return;
          }
          let x = _this2.value;
          _this2.value = x !== `` ? x : _this2.initial;
          _this2.done = true;
          _this2.aborted = false;
          _this2.error = false;
          _this2.fire();
          _this2.render();
          _this2.out.write(`
`);
          _this2.close();
        })();
      }
      up() {
        this.typed = ``;
        if (this.value === "") {
          this.value = this.min - this.inc;
        }
        if (this.value >= this.max)
          return this.bell();
        this.value += this.inc;
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      down() {
        this.typed = ``;
        if (this.value === "") {
          this.value = this.min + this.inc;
        }
        if (this.value <= this.min)
          return this.bell();
        this.value -= this.inc;
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      delete() {
        let val = this.value.toString();
        if (val.length === 0)
          return this.bell();
        this.value = this.parse(val = val.slice(0, -1)) || ``;
        if (this.value !== "" && this.value < this.min) {
          this.value = this.min;
        }
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      next() {
        this.value = this.initial;
        this.fire();
        this.render();
      }
      _(c, key) {
        if (!this.valid(c))
          return this.bell();
        const now = Date.now();
        if (now - this.lastHit > 1e3)
          this.typed = ``;
        this.typed += c;
        this.lastHit = now;
        this.color = `cyan`;
        if (c === `.`)
          return this.fire();
        this.value = Math.min(this.parse(this.typed), this.max);
        if (this.value > this.max)
          this.value = this.max;
        if (this.value < this.min)
          this.value = this.min;
        this.fire();
        this.render();
      }
      render() {
        if (this.closed)
          return;
        if (!this.firstRender) {
          if (this.outputError)
            this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
          this.out.write(clear(this.outputText, this.out.columns));
        }
        super.render();
        this.outputError = "";
        this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), !this.done || !this.done && !this.placeholder ? color[this.color]().underline(this.rendered) : this.rendered].join(` `);
        if (this.error) {
          this.outputError += this.errorMsg.split(`
`).reduce((a, l, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore);
      }
    };
    module2.exports = NumberPrompt;
  }
});

// node_modules/prompts/dist/elements/multiselect.js
var require_multiselect = __commonJS({
  "node_modules/prompts/dist/elements/multiselect.js"(exports2, module2) {
    "use strict";
    var color = require_kleur();
    var _require = require_src();
    var cursor = _require.cursor;
    var Prompt = require_prompt();
    var _require2 = require_util();
    var clear = _require2.clear;
    var figures = _require2.figures;
    var style = _require2.style;
    var wrap = _require2.wrap;
    var entriesToDisplay = _require2.entriesToDisplay;
    var MultiselectPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.cursor = opts.cursor || 0;
        this.scrollIndex = opts.cursor || 0;
        this.hint = opts.hint || "";
        this.warn = opts.warn || "- This option is disabled -";
        this.minSelected = opts.min;
        this.showMinError = false;
        this.maxChoices = opts.max;
        this.instructions = opts.instructions;
        this.optionsPerPage = opts.optionsPerPage || 10;
        this.value = opts.choices.map((ch, idx) => {
          if (typeof ch === "string")
            ch = {
              title: ch,
              value: idx
            };
          return {
            title: ch && (ch.title || ch.value || ch),
            description: ch && ch.description,
            value: ch && (ch.value === void 0 ? idx : ch.value),
            selected: ch && ch.selected,
            disabled: ch && ch.disabled
          };
        });
        this.clear = clear("", this.out.columns);
        if (!opts.overrideRender) {
          this.render();
        }
      }
      reset() {
        this.value.map((v) => !v.selected);
        this.cursor = 0;
        this.fire();
        this.render();
      }
      selected() {
        return this.value.filter((v) => v.selected);
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        const selected = this.value.filter((e) => e.selected);
        if (this.minSelected && selected.length < this.minSelected) {
          this.showMinError = true;
          this.render();
        } else {
          this.done = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        }
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.value.length - 1;
        this.render();
      }
      next() {
        this.cursor = (this.cursor + 1) % this.value.length;
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.cursor = this.value.length - 1;
        } else {
          this.cursor--;
        }
        this.render();
      }
      down() {
        if (this.cursor === this.value.length - 1) {
          this.cursor = 0;
        } else {
          this.cursor++;
        }
        this.render();
      }
      left() {
        this.value[this.cursor].selected = false;
        this.render();
      }
      right() {
        if (this.value.filter((e) => e.selected).length >= this.maxChoices)
          return this.bell();
        this.value[this.cursor].selected = true;
        this.render();
      }
      handleSpaceToggle() {
        const v = this.value[this.cursor];
        if (v.selected) {
          v.selected = false;
          this.render();
        } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
          return this.bell();
        } else {
          v.selected = true;
          this.render();
        }
      }
      toggleAll() {
        if (this.maxChoices !== void 0 || this.value[this.cursor].disabled) {
          return this.bell();
        }
        const newSelected = !this.value[this.cursor].selected;
        this.value.filter((v) => !v.disabled).forEach((v) => v.selected = newSelected);
        this.render();
      }
      _(c, key) {
        if (c === " ") {
          this.handleSpaceToggle();
        } else if (c === "a") {
          this.toggleAll();
        } else {
          return this.bell();
        }
      }
      renderInstructions() {
        if (this.instructions === void 0 || this.instructions) {
          if (typeof this.instructions === "string") {
            return this.instructions;
          }
          return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
` + (this.maxChoices === void 0 ? `    a: Toggle all
` : "") + `    enter/return: Complete answer`;
        }
        return "";
      }
      renderOption(cursor2, v, i, arrowIndicator) {
        const prefix = (v.selected ? color.green(figures.radioOn) : figures.radioOff) + " " + arrowIndicator + " ";
        let title, desc;
        if (v.disabled) {
          title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
        } else {
          title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
          if (cursor2 === i && v.description) {
            desc = ` - ${v.description}`;
            if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
              desc = "\n" + wrap(v.description, {
                margin: prefix.length,
                width: this.out.columns
              });
            }
          }
        }
        return prefix + title + color.gray(desc || "");
      }
      // shared with autocompleteMultiselect
      paginateOptions(options) {
        if (options.length === 0) {
          return color.red("No matches for this query.");
        }
        let _entriesToDisplay = entriesToDisplay(this.cursor, options.length, this.optionsPerPage), startIndex = _entriesToDisplay.startIndex, endIndex = _entriesToDisplay.endIndex;
        let prefix, styledOptions = [];
        for (let i = startIndex; i < endIndex; i++) {
          if (i === startIndex && startIndex > 0) {
            prefix = figures.arrowUp;
          } else if (i === endIndex - 1 && endIndex < options.length) {
            prefix = figures.arrowDown;
          } else {
            prefix = " ";
          }
          styledOptions.push(this.renderOption(this.cursor, options[i], i, prefix));
        }
        return "\n" + styledOptions.join("\n");
      }
      // shared with autocomleteMultiselect
      renderOptions(options) {
        if (!this.done) {
          return this.paginateOptions(options);
        }
        return "";
      }
      renderDoneOrInstructions() {
        if (this.done) {
          return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
        }
        const output = [color.gray(this.hint), this.renderInstructions()];
        if (this.value[this.cursor].disabled) {
          output.push(color.yellow(this.warn));
        }
        return output.join(" ");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        super.render();
        let prompt2 = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.renderDoneOrInstructions()].join(" ");
        if (this.showMinError) {
          prompt2 += color.red(`You must select a minimum of ${this.minSelected} choices.`);
          this.showMinError = false;
        }
        prompt2 += this.renderOptions(this.value);
        this.out.write(this.clear + prompt2);
        this.clear = clear(prompt2, this.out.columns);
      }
    };
    module2.exports = MultiselectPrompt;
  }
});

// node_modules/prompts/dist/elements/autocomplete.js
var require_autocomplete = __commonJS({
  "node_modules/prompts/dist/elements/autocomplete.js"(exports2, module2) {
    "use strict";
    function asyncGeneratorStep(gen, resolve2, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error2) {
        reject(error2);
        return;
      }
      if (info.done) {
        resolve2(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve2, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve2, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve2, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_src();
    var erase = _require.erase;
    var cursor = _require.cursor;
    var _require2 = require_util();
    var style = _require2.style;
    var clear = _require2.clear;
    var figures = _require2.figures;
    var wrap = _require2.wrap;
    var entriesToDisplay = _require2.entriesToDisplay;
    var getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);
    var getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);
    var getIndex = (arr, valOrTitle) => {
      const index = arr.findIndex((el) => el.value === valOrTitle || el.title === valOrTitle);
      return index > -1 ? index : void 0;
    };
    var AutocompletePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.suggest = opts.suggest;
        this.choices = opts.choices;
        this.initial = typeof opts.initial === "number" ? opts.initial : getIndex(opts.choices, opts.initial);
        this.select = this.initial || opts.cursor || 0;
        this.i18n = {
          noMatches: opts.noMatches || "no matches found"
        };
        this.fallback = opts.fallback || this.initial;
        this.clearFirst = opts.clearFirst || false;
        this.suggestions = [];
        this.input = "";
        this.limit = opts.limit || 10;
        this.cursor = 0;
        this.transform = style.render(opts.style);
        this.scale = this.transform.scale;
        this.render = this.render.bind(this);
        this.complete = this.complete.bind(this);
        this.clear = clear("", this.out.columns);
        this.complete(this.render);
        this.render();
      }
      set fallback(fb) {
        this._fb = Number.isSafeInteger(parseInt(fb)) ? parseInt(fb) : fb;
      }
      get fallback() {
        let choice;
        if (typeof this._fb === "number")
          choice = this.choices[this._fb];
        else if (typeof this._fb === "string")
          choice = {
            title: this._fb
          };
        return choice || this._fb || {
          title: this.i18n.noMatches
        };
      }
      moveSelect(i) {
        this.select = i;
        if (this.suggestions.length > 0)
          this.value = getVal(this.suggestions, i);
        else
          this.value = this.fallback.value;
        this.fire();
      }
      complete(cb) {
        var _this = this;
        return _asyncToGenerator(function* () {
          const p = _this.completing = _this.suggest(_this.input, _this.choices);
          const suggestions = yield p;
          if (_this.completing !== p)
            return;
          _this.suggestions = suggestions.map((s, i, arr) => ({
            title: getTitle(arr, i),
            value: getVal(arr, i),
            description: s.description
          }));
          _this.completing = false;
          const l = Math.max(suggestions.length - 1, 0);
          _this.moveSelect(Math.min(l, _this.select));
          cb && cb();
        })();
      }
      reset() {
        this.input = "";
        this.complete(() => {
          this.moveSelect(this.initial !== void 0 ? this.initial : 0);
          this.render();
        });
        this.render();
      }
      exit() {
        if (this.clearFirst && this.input.length > 0) {
          this.reset();
        } else {
          this.done = this.exited = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        }
      }
      abort() {
        this.done = this.aborted = true;
        this.exited = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.done = true;
        this.aborted = this.exited = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      _(c, key) {
        let s1 = this.input.slice(0, this.cursor);
        let s2 = this.input.slice(this.cursor);
        this.input = `${s1}${c}${s2}`;
        this.cursor = s1.length + 1;
        this.complete(this.render);
        this.render();
      }
      delete() {
        if (this.cursor === 0)
          return this.bell();
        let s1 = this.input.slice(0, this.cursor - 1);
        let s2 = this.input.slice(this.cursor);
        this.input = `${s1}${s2}`;
        this.complete(this.render);
        this.cursor = this.cursor - 1;
        this.render();
      }
      deleteForward() {
        if (this.cursor * this.scale >= this.rendered.length)
          return this.bell();
        let s1 = this.input.slice(0, this.cursor);
        let s2 = this.input.slice(this.cursor + 1);
        this.input = `${s1}${s2}`;
        this.complete(this.render);
        this.render();
      }
      first() {
        this.moveSelect(0);
        this.render();
      }
      last() {
        this.moveSelect(this.suggestions.length - 1);
        this.render();
      }
      up() {
        if (this.select === 0) {
          this.moveSelect(this.suggestions.length - 1);
        } else {
          this.moveSelect(this.select - 1);
        }
        this.render();
      }
      down() {
        if (this.select === this.suggestions.length - 1) {
          this.moveSelect(0);
        } else {
          this.moveSelect(this.select + 1);
        }
        this.render();
      }
      next() {
        if (this.select === this.suggestions.length - 1) {
          this.moveSelect(0);
        } else
          this.moveSelect(this.select + 1);
        this.render();
      }
      nextPage() {
        this.moveSelect(Math.min(this.select + this.limit, this.suggestions.length - 1));
        this.render();
      }
      prevPage() {
        this.moveSelect(Math.max(this.select - this.limit, 0));
        this.render();
      }
      left() {
        if (this.cursor <= 0)
          return this.bell();
        this.cursor = this.cursor - 1;
        this.render();
      }
      right() {
        if (this.cursor * this.scale >= this.rendered.length)
          return this.bell();
        this.cursor = this.cursor + 1;
        this.render();
      }
      renderOption(v, hovered, isStart, isEnd) {
        let desc;
        let prefix = isStart ? figures.arrowUp : isEnd ? figures.arrowDown : " ";
        let title = hovered ? color.cyan().underline(v.title) : v.title;
        prefix = (hovered ? color.cyan(figures.pointer) + " " : "  ") + prefix;
        if (v.description) {
          desc = ` - ${v.description}`;
          if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
            desc = "\n" + wrap(v.description, {
              margin: 3,
              width: this.out.columns
            });
          }
        }
        return prefix + " " + title + color.gray(desc || "");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        let _entriesToDisplay = entriesToDisplay(this.select, this.choices.length, this.limit), startIndex = _entriesToDisplay.startIndex, endIndex = _entriesToDisplay.endIndex;
        this.outputText = [style.symbol(this.done, this.aborted, this.exited), color.bold(this.msg), style.delimiter(this.completing), this.done && this.suggestions[this.select] ? this.suggestions[this.select].title : this.rendered = this.transform.render(this.input)].join(" ");
        if (!this.done) {
          const suggestions = this.suggestions.slice(startIndex, endIndex).map((item, i) => this.renderOption(item, this.select === i + startIndex, i === 0 && startIndex > 0, i + startIndex === endIndex - 1 && endIndex < this.choices.length)).join("\n");
          this.outputText += `
` + (suggestions || color.gray(this.fallback.title));
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = AutocompletePrompt;
  }
});

// node_modules/prompts/dist/elements/autocompleteMultiselect.js
var require_autocompleteMultiselect = __commonJS({
  "node_modules/prompts/dist/elements/autocompleteMultiselect.js"(exports2, module2) {
    "use strict";
    var color = require_kleur();
    var _require = require_src();
    var cursor = _require.cursor;
    var MultiselectPrompt = require_multiselect();
    var _require2 = require_util();
    var clear = _require2.clear;
    var style = _require2.style;
    var figures = _require2.figures;
    var AutocompleteMultiselectPrompt = class extends MultiselectPrompt {
      constructor(opts = {}) {
        opts.overrideRender = true;
        super(opts);
        this.inputValue = "";
        this.clear = clear("", this.out.columns);
        this.filteredOptions = this.value;
        this.render();
      }
      last() {
        this.cursor = this.filteredOptions.length - 1;
        this.render();
      }
      next() {
        this.cursor = (this.cursor + 1) % this.filteredOptions.length;
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.cursor = this.filteredOptions.length - 1;
        } else {
          this.cursor--;
        }
        this.render();
      }
      down() {
        if (this.cursor === this.filteredOptions.length - 1) {
          this.cursor = 0;
        } else {
          this.cursor++;
        }
        this.render();
      }
      left() {
        this.filteredOptions[this.cursor].selected = false;
        this.render();
      }
      right() {
        if (this.value.filter((e) => e.selected).length >= this.maxChoices)
          return this.bell();
        this.filteredOptions[this.cursor].selected = true;
        this.render();
      }
      delete() {
        if (this.inputValue.length) {
          this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
          this.updateFilteredOptions();
        }
      }
      updateFilteredOptions() {
        const currentHighlight = this.filteredOptions[this.cursor];
        this.filteredOptions = this.value.filter((v) => {
          if (this.inputValue) {
            if (typeof v.title === "string") {
              if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
                return true;
              }
            }
            if (typeof v.value === "string") {
              if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
                return true;
              }
            }
            return false;
          }
          return true;
        });
        const newHighlightIndex = this.filteredOptions.findIndex((v) => v === currentHighlight);
        this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
        this.render();
      }
      handleSpaceToggle() {
        const v = this.filteredOptions[this.cursor];
        if (v.selected) {
          v.selected = false;
          this.render();
        } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
          return this.bell();
        } else {
          v.selected = true;
          this.render();
        }
      }
      handleInputChange(c) {
        this.inputValue = this.inputValue + c;
        this.updateFilteredOptions();
      }
      _(c, key) {
        if (c === " ") {
          this.handleSpaceToggle();
        } else {
          this.handleInputChange(c);
        }
      }
      renderInstructions() {
        if (this.instructions === void 0 || this.instructions) {
          if (typeof this.instructions === "string") {
            return this.instructions;
          }
          return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
`;
        }
        return "";
      }
      renderCurrentInput() {
        return `
Filtered results for: ${this.inputValue ? this.inputValue : color.gray("Enter something to filter")}
`;
      }
      renderOption(cursor2, v, i) {
        let title;
        if (v.disabled)
          title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
        else
          title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
        return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + "  " + title;
      }
      renderDoneOrInstructions() {
        if (this.done) {
          return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
        }
        const output = [color.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];
        if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
          output.push(color.yellow(this.warn));
        }
        return output.join(" ");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        super.render();
        let prompt2 = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.renderDoneOrInstructions()].join(" ");
        if (this.showMinError) {
          prompt2 += color.red(`You must select a minimum of ${this.minSelected} choices.`);
          this.showMinError = false;
        }
        prompt2 += this.renderOptions(this.filteredOptions);
        this.out.write(this.clear + prompt2);
        this.clear = clear(prompt2, this.out.columns);
      }
    };
    module2.exports = AutocompleteMultiselectPrompt;
  }
});

// node_modules/prompts/dist/elements/confirm.js
var require_confirm = __commonJS({
  "node_modules/prompts/dist/elements/confirm.js"(exports2, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_util();
    var style = _require.style;
    var clear = _require.clear;
    var _require2 = require_src();
    var erase = _require2.erase;
    var cursor = _require2.cursor;
    var ConfirmPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.value = opts.initial;
        this.initialValue = !!opts.initial;
        this.yesMsg = opts.yes || "yes";
        this.yesOption = opts.yesOption || "(Y/n)";
        this.noMsg = opts.no || "no";
        this.noOption = opts.noOption || "(y/N)";
        this.render();
      }
      reset() {
        this.value = this.initialValue;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.value = this.value || false;
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      _(c, key) {
        if (c.toLowerCase() === "y") {
          this.value = true;
          return this.submit();
        }
        if (c.toLowerCase() === "n") {
          this.value = false;
          return this.submit();
        }
        return this.bell();
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.done ? this.value ? this.yesMsg : this.noMsg : color.gray(this.initialValue ? this.yesOption : this.noOption)].join(" ");
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = ConfirmPrompt;
  }
});

// node_modules/prompts/dist/elements/index.js
var require_elements = __commonJS({
  "node_modules/prompts/dist/elements/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      TextPrompt: require_text(),
      SelectPrompt: require_select(),
      TogglePrompt: require_toggle(),
      DatePrompt: require_date(),
      NumberPrompt: require_number(),
      MultiselectPrompt: require_multiselect(),
      AutocompletePrompt: require_autocomplete(),
      AutocompleteMultiselectPrompt: require_autocompleteMultiselect(),
      ConfirmPrompt: require_confirm()
    };
  }
});

// node_modules/prompts/dist/prompts.js
var require_prompts = __commonJS({
  "node_modules/prompts/dist/prompts.js"(exports2) {
    "use strict";
    var $ = exports2;
    var el = require_elements();
    var noop = (v) => v;
    function toPrompt(type, args, opts = {}) {
      return new Promise((res, rej) => {
        const p = new el[type](args);
        const onAbort = opts.onAbort || noop;
        const onSubmit = opts.onSubmit || noop;
        const onExit = opts.onExit || noop;
        p.on("state", args.onState || noop);
        p.on("submit", (x) => res(onSubmit(x)));
        p.on("exit", (x) => res(onExit(x)));
        p.on("abort", (x) => rej(onAbort(x)));
      });
    }
    $.text = (args) => toPrompt("TextPrompt", args);
    $.password = (args) => {
      args.style = "password";
      return $.text(args);
    };
    $.invisible = (args) => {
      args.style = "invisible";
      return $.text(args);
    };
    $.number = (args) => toPrompt("NumberPrompt", args);
    $.date = (args) => toPrompt("DatePrompt", args);
    $.confirm = (args) => toPrompt("ConfirmPrompt", args);
    $.list = (args) => {
      const sep = args.separator || ",";
      return toPrompt("TextPrompt", args, {
        onSubmit: (str) => str.split(sep).map((s) => s.trim())
      });
    };
    $.toggle = (args) => toPrompt("TogglePrompt", args);
    $.select = (args) => toPrompt("SelectPrompt", args);
    $.multiselect = (args) => {
      args.choices = [].concat(args.choices || []);
      const toSelected = (items) => items.filter((item) => item.selected).map((item) => item.value);
      return toPrompt("MultiselectPrompt", args, {
        onAbort: toSelected,
        onSubmit: toSelected
      });
    };
    $.autocompleteMultiselect = (args) => {
      args.choices = [].concat(args.choices || []);
      const toSelected = (items) => items.filter((item) => item.selected).map((item) => item.value);
      return toPrompt("AutocompleteMultiselectPrompt", args, {
        onAbort: toSelected,
        onSubmit: toSelected
      });
    };
    var byTitle = (input, choices) => Promise.resolve(choices.filter((item) => item.title.slice(0, input.length).toLowerCase() === input.toLowerCase()));
    $.autocomplete = (args) => {
      args.suggest = args.suggest || byTitle;
      args.choices = [].concat(args.choices || []);
      return toPrompt("AutocompletePrompt", args);
    };
  }
});

// node_modules/prompts/dist/index.js
var require_dist = __commonJS({
  "node_modules/prompts/dist/index.js"(exports2, module2) {
    "use strict";
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          var F = function F2() {
          };
          return { s: F, n: function n() {
            if (i >= o.length)
              return { done: true };
            return { done: false, value: o[i++] };
          }, e: function e(_e) {
            throw _e;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var normalCompletion = true, didErr = false, err;
      return { s: function s() {
        it = it.call(o);
      }, n: function n() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      }, e: function e(_e2) {
        didErr = true;
        err = _e2;
      }, f: function f() {
        try {
          if (!normalCompletion && it.return != null)
            it.return();
        } finally {
          if (didErr)
            throw err;
        }
      } };
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    function asyncGeneratorStep(gen, resolve2, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error2) {
        reject(error2);
        return;
      }
      if (info.done) {
        resolve2(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve2, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve2, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve2, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var prompts2 = require_prompts();
    var passOn = ["suggest", "format", "onState", "validate", "onRender", "type"];
    var noop = () => {
    };
    function prompt2() {
      return _prompt.apply(this, arguments);
    }
    function _prompt() {
      _prompt = _asyncToGenerator(function* (questions = [], {
        onSubmit = noop,
        onCancel = noop
      } = {}) {
        const answers = {};
        const override2 = prompt2._override || {};
        questions = [].concat(questions);
        let answer, question, quit, name, type, lastPrompt;
        const getFormattedAnswer = /* @__PURE__ */ function() {
          var _ref = _asyncToGenerator(function* (question2, answer2, skipValidation = false) {
            if (!skipValidation && question2.validate && question2.validate(answer2) !== true) {
              return;
            }
            return question2.format ? yield question2.format(answer2, answers) : answer2;
          });
          return function getFormattedAnswer2(_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }();
        var _iterator = _createForOfIteratorHelper(questions), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            question = _step.value;
            var _question = question;
            name = _question.name;
            type = _question.type;
            if (typeof type === "function") {
              type = yield type(answer, _objectSpread({}, answers), question);
              question["type"] = type;
            }
            if (!type)
              continue;
            for (let key in question) {
              if (passOn.includes(key))
                continue;
              let value = question[key];
              question[key] = typeof value === "function" ? yield value(answer, _objectSpread({}, answers), lastPrompt) : value;
            }
            lastPrompt = question;
            if (typeof question.message !== "string") {
              throw new Error("prompt message is required");
            }
            var _question2 = question;
            name = _question2.name;
            type = _question2.type;
            if (prompts2[type] === void 0) {
              throw new Error(`prompt type (${type}) is not defined`);
            }
            if (override2[question.name] !== void 0) {
              answer = yield getFormattedAnswer(question, override2[question.name]);
              if (answer !== void 0) {
                answers[name] = answer;
                continue;
              }
            }
            try {
              answer = prompt2._injected ? getInjectedAnswer(prompt2._injected, question.initial) : yield prompts2[type](question);
              answers[name] = answer = yield getFormattedAnswer(question, answer, true);
              quit = yield onSubmit(question, answer, answers);
            } catch (err) {
              quit = !(yield onCancel(question, answers));
            }
            if (quit)
              return answers;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return answers;
      });
      return _prompt.apply(this, arguments);
    }
    function getInjectedAnswer(injected, deafultValue) {
      const answer = injected.shift();
      if (answer instanceof Error) {
        throw answer;
      }
      return answer === void 0 ? deafultValue : answer;
    }
    function inject(answers) {
      prompt2._injected = (prompt2._injected || []).concat(answers);
    }
    function override(answers) {
      prompt2._override = Object.assign({}, answers);
    }
    module2.exports = Object.assign(prompt2, {
      prompt: prompt2,
      prompts: prompts2,
      inject,
      override
    });
  }
});

// node_modules/prompts/lib/util/action.js
var require_action2 = __commonJS({
  "node_modules/prompts/lib/util/action.js"(exports2, module2) {
    "use strict";
    module2.exports = (key, isSelect) => {
      if (key.meta && key.name !== "escape")
        return;
      if (key.ctrl) {
        if (key.name === "a")
          return "first";
        if (key.name === "c")
          return "abort";
        if (key.name === "d")
          return "abort";
        if (key.name === "e")
          return "last";
        if (key.name === "g")
          return "reset";
      }
      if (isSelect) {
        if (key.name === "j")
          return "down";
        if (key.name === "k")
          return "up";
      }
      if (key.name === "return")
        return "submit";
      if (key.name === "enter")
        return "submit";
      if (key.name === "backspace")
        return "delete";
      if (key.name === "delete")
        return "deleteForward";
      if (key.name === "abort")
        return "abort";
      if (key.name === "escape")
        return "exit";
      if (key.name === "tab")
        return "next";
      if (key.name === "pagedown")
        return "nextPage";
      if (key.name === "pageup")
        return "prevPage";
      if (key.name === "home")
        return "home";
      if (key.name === "end")
        return "end";
      if (key.name === "up")
        return "up";
      if (key.name === "down")
        return "down";
      if (key.name === "right")
        return "right";
      if (key.name === "left")
        return "left";
      return false;
    };
  }
});

// node_modules/prompts/lib/util/strip.js
var require_strip2 = __commonJS({
  "node_modules/prompts/lib/util/strip.js"(exports2, module2) {
    "use strict";
    module2.exports = (str) => {
      const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))"
      ].join("|");
      const RGX = new RegExp(pattern, "g");
      return typeof str === "string" ? str.replace(RGX, "") : str;
    };
  }
});

// node_modules/prompts/lib/util/clear.js
var require_clear2 = __commonJS({
  "node_modules/prompts/lib/util/clear.js"(exports2, module2) {
    "use strict";
    var strip = require_strip2();
    var { erase, cursor } = require_src();
    var width = (str) => [...strip(str)].length;
    module2.exports = function(prompt2, perLine) {
      if (!perLine)
        return erase.line + cursor.to(0);
      let rows = 0;
      const lines = prompt2.split(/\r?\n/);
      for (let line of lines) {
        rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
      }
      return erase.lines(rows);
    };
  }
});

// node_modules/prompts/lib/util/figures.js
var require_figures2 = __commonJS({
  "node_modules/prompts/lib/util/figures.js"(exports2, module2) {
    "use strict";
    var main = {
      arrowUp: "\u2191",
      arrowDown: "\u2193",
      arrowLeft: "\u2190",
      arrowRight: "\u2192",
      radioOn: "\u25C9",
      radioOff: "\u25EF",
      tick: "\u2714",
      cross: "\u2716",
      ellipsis: "\u2026",
      pointerSmall: "\u203A",
      line: "\u2500",
      pointer: "\u276F"
    };
    var win = {
      arrowUp: main.arrowUp,
      arrowDown: main.arrowDown,
      arrowLeft: main.arrowLeft,
      arrowRight: main.arrowRight,
      radioOn: "(*)",
      radioOff: "( )",
      tick: "\u221A",
      cross: "\xD7",
      ellipsis: "...",
      pointerSmall: "\xBB",
      line: "\u2500",
      pointer: ">"
    };
    var figures = process.platform === "win32" ? win : main;
    module2.exports = figures;
  }
});

// node_modules/prompts/lib/util/style.js
var require_style2 = __commonJS({
  "node_modules/prompts/lib/util/style.js"(exports2, module2) {
    "use strict";
    var c = require_kleur();
    var figures = require_figures2();
    var styles = Object.freeze({
      password: { scale: 1, render: (input) => "*".repeat(input.length) },
      emoji: { scale: 2, render: (input) => "\u{1F603}".repeat(input.length) },
      invisible: { scale: 0, render: (input) => "" },
      default: { scale: 1, render: (input) => `${input}` }
    });
    var render = (type) => styles[type] || styles.default;
    var symbols = Object.freeze({
      aborted: c.red(figures.cross),
      done: c.green(figures.tick),
      exited: c.yellow(figures.cross),
      default: c.cyan("?")
    });
    var symbol = (done, aborted, exited) => aborted ? symbols.aborted : exited ? symbols.exited : done ? symbols.done : symbols.default;
    var delimiter = (completing) => c.gray(completing ? figures.ellipsis : figures.pointerSmall);
    var item = (expandable, expanded) => c.gray(expandable ? expanded ? figures.pointerSmall : "+" : figures.line);
    module2.exports = {
      styles,
      render,
      symbols,
      symbol,
      delimiter,
      item
    };
  }
});

// node_modules/prompts/lib/util/lines.js
var require_lines2 = __commonJS({
  "node_modules/prompts/lib/util/lines.js"(exports2, module2) {
    "use strict";
    var strip = require_strip2();
    module2.exports = function(msg, perLine) {
      let lines = String(strip(msg) || "").split(/\r?\n/);
      if (!perLine)
        return lines.length;
      return lines.map((l) => Math.ceil(l.length / perLine)).reduce((a, b) => a + b);
    };
  }
});

// node_modules/prompts/lib/util/wrap.js
var require_wrap2 = __commonJS({
  "node_modules/prompts/lib/util/wrap.js"(exports2, module2) {
    "use strict";
    module2.exports = (msg, opts = {}) => {
      const tab = Number.isSafeInteger(parseInt(opts.margin)) ? new Array(parseInt(opts.margin)).fill(" ").join("") : opts.margin || "";
      const width = opts.width;
      return (msg || "").split(/\r?\n/g).map((line) => line.split(/\s+/g).reduce((arr, w) => {
        if (w.length + tab.length >= width || arr[arr.length - 1].length + w.length + 1 < width)
          arr[arr.length - 1] += ` ${w}`;
        else
          arr.push(`${tab}${w}`);
        return arr;
      }, [tab]).join("\n")).join("\n");
    };
  }
});

// node_modules/prompts/lib/util/entriesToDisplay.js
var require_entriesToDisplay2 = __commonJS({
  "node_modules/prompts/lib/util/entriesToDisplay.js"(exports2, module2) {
    "use strict";
    module2.exports = (cursor, total, maxVisible) => {
      maxVisible = maxVisible || total;
      let startIndex = Math.min(total - maxVisible, cursor - Math.floor(maxVisible / 2));
      if (startIndex < 0)
        startIndex = 0;
      let endIndex = Math.min(startIndex + maxVisible, total);
      return { startIndex, endIndex };
    };
  }
});

// node_modules/prompts/lib/util/index.js
var require_util2 = __commonJS({
  "node_modules/prompts/lib/util/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      action: require_action2(),
      clear: require_clear2(),
      style: require_style2(),
      strip: require_strip2(),
      figures: require_figures2(),
      lines: require_lines2(),
      wrap: require_wrap2(),
      entriesToDisplay: require_entriesToDisplay2()
    };
  }
});

// node_modules/prompts/lib/elements/prompt.js
var require_prompt2 = __commonJS({
  "node_modules/prompts/lib/elements/prompt.js"(exports2, module2) {
    "use strict";
    var readline = require("readline");
    var { action } = require_util2();
    var EventEmitter = require("events");
    var { beep, cursor } = require_src();
    var color = require_kleur();
    var Prompt = class extends EventEmitter {
      constructor(opts = {}) {
        super();
        this.firstRender = true;
        this.in = opts.stdin || process.stdin;
        this.out = opts.stdout || process.stdout;
        this.onRender = (opts.onRender || (() => void 0)).bind(this);
        const rl = readline.createInterface({ input: this.in, escapeCodeTimeout: 50 });
        readline.emitKeypressEvents(this.in, rl);
        if (this.in.isTTY)
          this.in.setRawMode(true);
        const isSelect = ["SelectPrompt", "MultiselectPrompt"].indexOf(this.constructor.name) > -1;
        const keypress = (str, key) => {
          let a = action(key, isSelect);
          if (a === false) {
            this._ && this._(str, key);
          } else if (typeof this[a] === "function") {
            this[a](key);
          } else {
            this.bell();
          }
        };
        this.close = () => {
          this.out.write(cursor.show);
          this.in.removeListener("keypress", keypress);
          if (this.in.isTTY)
            this.in.setRawMode(false);
          rl.close();
          this.emit(this.aborted ? "abort" : this.exited ? "exit" : "submit", this.value);
          this.closed = true;
        };
        this.in.on("keypress", keypress);
      }
      fire() {
        this.emit("state", {
          value: this.value,
          aborted: !!this.aborted,
          exited: !!this.exited
        });
      }
      bell() {
        this.out.write(beep);
      }
      render() {
        this.onRender(color);
        if (this.firstRender)
          this.firstRender = false;
      }
    };
    module2.exports = Prompt;
  }
});

// node_modules/prompts/lib/elements/text.js
var require_text2 = __commonJS({
  "node_modules/prompts/lib/elements/text.js"(exports2, module2) {
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { erase, cursor } = require_src();
    var { style, clear, lines, figures } = require_util2();
    var TextPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.transform = style.render(opts.style);
        this.scale = this.transform.scale;
        this.msg = opts.message;
        this.initial = opts.initial || ``;
        this.validator = opts.validate || (() => true);
        this.value = ``;
        this.errorMsg = opts.error || `Please Enter A Valid Value`;
        this.cursor = Number(!!this.initial);
        this.cursorOffset = 0;
        this.clear = clear(``, this.out.columns);
        this.render();
      }
      set value(v) {
        if (!v && this.initial) {
          this.placeholder = true;
          this.rendered = color.gray(this.transform.render(this.initial));
        } else {
          this.placeholder = false;
          this.rendered = this.transform.render(v);
        }
        this._value = v;
        this.fire();
      }
      get value() {
        return this._value;
      }
      reset() {
        this.value = ``;
        this.cursor = Number(!!this.initial);
        this.cursorOffset = 0;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.value = this.value || this.initial;
        this.done = this.aborted = true;
        this.error = false;
        this.red = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      async validate() {
        let valid = await this.validator(this.value);
        if (typeof valid === `string`) {
          this.errorMsg = valid;
          valid = false;
        }
        this.error = !valid;
      }
      async submit() {
        this.value = this.value || this.initial;
        this.cursorOffset = 0;
        this.cursor = this.rendered.length;
        await this.validate();
        if (this.error) {
          this.red = true;
          this.fire();
          this.render();
          return;
        }
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      next() {
        if (!this.placeholder)
          return this.bell();
        this.value = this.initial;
        this.cursor = this.rendered.length;
        this.fire();
        this.render();
      }
      moveCursor(n) {
        if (this.placeholder)
          return;
        this.cursor = this.cursor + n;
        this.cursorOffset += n;
      }
      _(c, key) {
        let s1 = this.value.slice(0, this.cursor);
        let s2 = this.value.slice(this.cursor);
        this.value = `${s1}${c}${s2}`;
        this.red = false;
        this.cursor = this.placeholder ? 0 : s1.length + 1;
        this.render();
      }
      delete() {
        if (this.isCursorAtStart())
          return this.bell();
        let s1 = this.value.slice(0, this.cursor - 1);
        let s2 = this.value.slice(this.cursor);
        this.value = `${s1}${s2}`;
        this.red = false;
        if (this.isCursorAtStart()) {
          this.cursorOffset = 0;
        } else {
          this.cursorOffset++;
          this.moveCursor(-1);
        }
        this.render();
      }
      deleteForward() {
        if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
          return this.bell();
        let s1 = this.value.slice(0, this.cursor);
        let s2 = this.value.slice(this.cursor + 1);
        this.value = `${s1}${s2}`;
        this.red = false;
        if (this.isCursorAtEnd()) {
          this.cursorOffset = 0;
        } else {
          this.cursorOffset++;
        }
        this.render();
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.value.length;
        this.render();
      }
      left() {
        if (this.cursor <= 0 || this.placeholder)
          return this.bell();
        this.moveCursor(-1);
        this.render();
      }
      right() {
        if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
          return this.bell();
        this.moveCursor(1);
        this.render();
      }
      isCursorAtStart() {
        return this.cursor === 0 || this.placeholder && this.cursor === 1;
      }
      isCursorAtEnd() {
        return this.cursor === this.rendered.length || this.placeholder && this.cursor === this.rendered.length + 1;
      }
      render() {
        if (this.closed)
          return;
        if (!this.firstRender) {
          if (this.outputError)
            this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
          this.out.write(clear(this.outputText, this.out.columns));
        }
        super.render();
        this.outputError = "";
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          this.red ? color.red(this.rendered) : this.rendered
        ].join(` `);
        if (this.error) {
          this.outputError += this.errorMsg.split(`
`).reduce((a, l, i) => a + `
${i ? " " : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore + cursor.move(this.cursorOffset, 0));
      }
    };
    module2.exports = TextPrompt;
  }
});

// node_modules/prompts/lib/elements/select.js
var require_select2 = __commonJS({
  "node_modules/prompts/lib/elements/select.js"(exports2, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { style, clear, figures, wrap, entriesToDisplay } = require_util2();
    var { cursor } = require_src();
    var SelectPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.hint = opts.hint || "- Use arrow-keys. Return to submit.";
        this.warn = opts.warn || "- This option is disabled";
        this.cursor = opts.initial || 0;
        this.choices = opts.choices.map((ch, idx) => {
          if (typeof ch === "string")
            ch = { title: ch, value: idx };
          return {
            title: ch && (ch.title || ch.value || ch),
            value: ch && (ch.value === void 0 ? idx : ch.value),
            description: ch && ch.description,
            selected: ch && ch.selected,
            disabled: ch && ch.disabled
          };
        });
        this.optionsPerPage = opts.optionsPerPage || 10;
        this.value = (this.choices[this.cursor] || {}).value;
        this.clear = clear("", this.out.columns);
        this.render();
      }
      moveCursor(n) {
        this.cursor = n;
        this.value = this.choices[n].value;
        this.fire();
      }
      reset() {
        this.moveCursor(0);
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        if (!this.selection.disabled) {
          this.done = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        } else
          this.bell();
      }
      first() {
        this.moveCursor(0);
        this.render();
      }
      last() {
        this.moveCursor(this.choices.length - 1);
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.moveCursor(this.choices.length - 1);
        } else {
          this.moveCursor(this.cursor - 1);
        }
        this.render();
      }
      down() {
        if (this.cursor === this.choices.length - 1) {
          this.moveCursor(0);
        } else {
          this.moveCursor(this.cursor + 1);
        }
        this.render();
      }
      next() {
        this.moveCursor((this.cursor + 1) % this.choices.length);
        this.render();
      }
      _(c, key) {
        if (c === " ")
          return this.submit();
      }
      get selection() {
        return this.choices[this.cursor];
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        let { startIndex, endIndex } = entriesToDisplay(this.cursor, this.choices.length, this.optionsPerPage);
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.done ? this.selection.title : this.selection.disabled ? color.yellow(this.warn) : color.gray(this.hint)
        ].join(" ");
        if (!this.done) {
          this.outputText += "\n";
          for (let i = startIndex; i < endIndex; i++) {
            let title, prefix, desc = "", v = this.choices[i];
            if (i === startIndex && startIndex > 0) {
              prefix = figures.arrowUp;
            } else if (i === endIndex - 1 && endIndex < this.choices.length) {
              prefix = figures.arrowDown;
            } else {
              prefix = " ";
            }
            if (v.disabled) {
              title = this.cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
              prefix = (this.cursor === i ? color.bold().gray(figures.pointer) + " " : "  ") + prefix;
            } else {
              title = this.cursor === i ? color.cyan().underline(v.title) : v.title;
              prefix = (this.cursor === i ? color.cyan(figures.pointer) + " " : "  ") + prefix;
              if (v.description && this.cursor === i) {
                desc = ` - ${v.description}`;
                if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
                  desc = "\n" + wrap(v.description, { margin: 3, width: this.out.columns });
                }
              }
            }
            this.outputText += `${prefix} ${title}${color.gray(desc)}
`;
          }
        }
        this.out.write(this.outputText);
      }
    };
    module2.exports = SelectPrompt;
  }
});

// node_modules/prompts/lib/elements/toggle.js
var require_toggle2 = __commonJS({
  "node_modules/prompts/lib/elements/toggle.js"(exports2, module2) {
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { style, clear } = require_util2();
    var { cursor, erase } = require_src();
    var TogglePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.value = !!opts.initial;
        this.active = opts.active || "on";
        this.inactive = opts.inactive || "off";
        this.initialValue = this.value;
        this.render();
      }
      reset() {
        this.value = this.initialValue;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      deactivate() {
        if (this.value === false)
          return this.bell();
        this.value = false;
        this.render();
      }
      activate() {
        if (this.value === true)
          return this.bell();
        this.value = true;
        this.render();
      }
      delete() {
        this.deactivate();
      }
      left() {
        this.deactivate();
      }
      right() {
        this.activate();
      }
      down() {
        this.deactivate();
      }
      up() {
        this.activate();
      }
      next() {
        this.value = !this.value;
        this.fire();
        this.render();
      }
      _(c, key) {
        if (c === " ") {
          this.value = !this.value;
        } else if (c === "1") {
          this.value = true;
        } else if (c === "0") {
          this.value = false;
        } else
          return this.bell();
        this.render();
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          this.value ? this.inactive : color.cyan().underline(this.inactive),
          color.gray("/"),
          this.value ? color.cyan().underline(this.active) : this.active
        ].join(" ");
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = TogglePrompt;
  }
});

// node_modules/prompts/lib/dateparts/datepart.js
var require_datepart2 = __commonJS({
  "node_modules/prompts/lib/dateparts/datepart.js"(exports2, module2) {
    "use strict";
    var DatePart = class _DatePart {
      constructor({ token, date, parts, locales }) {
        this.token = token;
        this.date = date || /* @__PURE__ */ new Date();
        this.parts = parts || [this];
        this.locales = locales || {};
      }
      up() {
      }
      down() {
      }
      next() {
        const currentIdx = this.parts.indexOf(this);
        return this.parts.find((part, idx) => idx > currentIdx && part instanceof _DatePart);
      }
      setTo(val) {
      }
      prev() {
        let parts = [].concat(this.parts).reverse();
        const currentIdx = parts.indexOf(this);
        return parts.find((part, idx) => idx > currentIdx && part instanceof _DatePart);
      }
      toString() {
        return String(this.date);
      }
    };
    module2.exports = DatePart;
  }
});

// node_modules/prompts/lib/dateparts/meridiem.js
var require_meridiem2 = __commonJS({
  "node_modules/prompts/lib/dateparts/meridiem.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Meridiem = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setHours((this.date.getHours() + 12) % 24);
      }
      down() {
        this.up();
      }
      toString() {
        let meridiem = this.date.getHours() > 12 ? "pm" : "am";
        return /\A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
      }
    };
    module2.exports = Meridiem;
  }
});

// node_modules/prompts/lib/dateparts/day.js
var require_day2 = __commonJS({
  "node_modules/prompts/lib/dateparts/day.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var pos = (n) => {
      n = n % 10;
      return n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
    };
    var Day = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setDate(this.date.getDate() + 1);
      }
      down() {
        this.date.setDate(this.date.getDate() - 1);
      }
      setTo(val) {
        this.date.setDate(parseInt(val.substr(-2)));
      }
      toString() {
        let date = this.date.getDate();
        let day = this.date.getDay();
        return this.token === "DD" ? String(date).padStart(2, "0") : this.token === "Do" ? date + pos(date) : this.token === "d" ? day + 1 : this.token === "ddd" ? this.locales.weekdaysShort[day] : this.token === "dddd" ? this.locales.weekdays[day] : date;
      }
    };
    module2.exports = Day;
  }
});

// node_modules/prompts/lib/dateparts/hours.js
var require_hours2 = __commonJS({
  "node_modules/prompts/lib/dateparts/hours.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Hours = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setHours(this.date.getHours() + 1);
      }
      down() {
        this.date.setHours(this.date.getHours() - 1);
      }
      setTo(val) {
        this.date.setHours(parseInt(val.substr(-2)));
      }
      toString() {
        let hours = this.date.getHours();
        if (/h/.test(this.token))
          hours = hours % 12 || 12;
        return this.token.length > 1 ? String(hours).padStart(2, "0") : hours;
      }
    };
    module2.exports = Hours;
  }
});

// node_modules/prompts/lib/dateparts/milliseconds.js
var require_milliseconds2 = __commonJS({
  "node_modules/prompts/lib/dateparts/milliseconds.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Milliseconds = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMilliseconds(this.date.getMilliseconds() + 1);
      }
      down() {
        this.date.setMilliseconds(this.date.getMilliseconds() - 1);
      }
      setTo(val) {
        this.date.setMilliseconds(parseInt(val.substr(-this.token.length)));
      }
      toString() {
        return String(this.date.getMilliseconds()).padStart(4, "0").substr(0, this.token.length);
      }
    };
    module2.exports = Milliseconds;
  }
});

// node_modules/prompts/lib/dateparts/minutes.js
var require_minutes2 = __commonJS({
  "node_modules/prompts/lib/dateparts/minutes.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Minutes = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMinutes(this.date.getMinutes() + 1);
      }
      down() {
        this.date.setMinutes(this.date.getMinutes() - 1);
      }
      setTo(val) {
        this.date.setMinutes(parseInt(val.substr(-2)));
      }
      toString() {
        let m = this.date.getMinutes();
        return this.token.length > 1 ? String(m).padStart(2, "0") : m;
      }
    };
    module2.exports = Minutes;
  }
});

// node_modules/prompts/lib/dateparts/month.js
var require_month2 = __commonJS({
  "node_modules/prompts/lib/dateparts/month.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Month = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMonth(this.date.getMonth() + 1);
      }
      down() {
        this.date.setMonth(this.date.getMonth() - 1);
      }
      setTo(val) {
        val = parseInt(val.substr(-2)) - 1;
        this.date.setMonth(val < 0 ? 0 : val);
      }
      toString() {
        let month = this.date.getMonth();
        let tl = this.token.length;
        return tl === 2 ? String(month + 1).padStart(2, "0") : tl === 3 ? this.locales.monthsShort[month] : tl === 4 ? this.locales.months[month] : String(month + 1);
      }
    };
    module2.exports = Month;
  }
});

// node_modules/prompts/lib/dateparts/seconds.js
var require_seconds2 = __commonJS({
  "node_modules/prompts/lib/dateparts/seconds.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Seconds = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setSeconds(this.date.getSeconds() + 1);
      }
      down() {
        this.date.setSeconds(this.date.getSeconds() - 1);
      }
      setTo(val) {
        this.date.setSeconds(parseInt(val.substr(-2)));
      }
      toString() {
        let s = this.date.getSeconds();
        return this.token.length > 1 ? String(s).padStart(2, "0") : s;
      }
    };
    module2.exports = Seconds;
  }
});

// node_modules/prompts/lib/dateparts/year.js
var require_year2 = __commonJS({
  "node_modules/prompts/lib/dateparts/year.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Year = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setFullYear(this.date.getFullYear() + 1);
      }
      down() {
        this.date.setFullYear(this.date.getFullYear() - 1);
      }
      setTo(val) {
        this.date.setFullYear(val.substr(-4));
      }
      toString() {
        let year = String(this.date.getFullYear()).padStart(4, "0");
        return this.token.length === 2 ? year.substr(-2) : year;
      }
    };
    module2.exports = Year;
  }
});

// node_modules/prompts/lib/dateparts/index.js
var require_dateparts2 = __commonJS({
  "node_modules/prompts/lib/dateparts/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      DatePart: require_datepart2(),
      Meridiem: require_meridiem2(),
      Day: require_day2(),
      Hours: require_hours2(),
      Milliseconds: require_milliseconds2(),
      Minutes: require_minutes2(),
      Month: require_month2(),
      Seconds: require_seconds2(),
      Year: require_year2()
    };
  }
});

// node_modules/prompts/lib/elements/date.js
var require_date2 = __commonJS({
  "node_modules/prompts/lib/elements/date.js"(exports2, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { style, clear, figures } = require_util2();
    var { erase, cursor } = require_src();
    var { DatePart, Meridiem, Day, Hours, Milliseconds, Minutes, Month, Seconds, Year } = require_dateparts2();
    var regex = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
    var regexGroups = {
      1: ({ token }) => token.replace(/\\(.)/g, "$1"),
      2: (opts) => new Day(opts),
      // Day // TODO
      3: (opts) => new Month(opts),
      // Month
      4: (opts) => new Year(opts),
      // Year
      5: (opts) => new Meridiem(opts),
      // AM/PM // TODO (special)
      6: (opts) => new Hours(opts),
      // Hours
      7: (opts) => new Minutes(opts),
      // Minutes
      8: (opts) => new Seconds(opts),
      // Seconds
      9: (opts) => new Milliseconds(opts)
      // Fractional seconds
    };
    var dfltLocales = {
      months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
      monthsShort: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
      weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
      weekdaysShort: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",")
    };
    var DatePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.cursor = 0;
        this.typed = "";
        this.locales = Object.assign(dfltLocales, opts.locales);
        this._date = opts.initial || /* @__PURE__ */ new Date();
        this.errorMsg = opts.error || "Please Enter A Valid Value";
        this.validator = opts.validate || (() => true);
        this.mask = opts.mask || "YYYY-MM-DD HH:mm:ss";
        this.clear = clear("", this.out.columns);
        this.render();
      }
      get value() {
        return this.date;
      }
      get date() {
        return this._date;
      }
      set date(date) {
        if (date)
          this._date.setTime(date.getTime());
      }
      set mask(mask) {
        let result;
        this.parts = [];
        while (result = regex.exec(mask)) {
          let match = result.shift();
          let idx = result.findIndex((gr) => gr != null);
          this.parts.push(idx in regexGroups ? regexGroups[idx]({ token: result[idx] || match, date: this.date, parts: this.parts, locales: this.locales }) : result[idx] || match);
        }
        let parts = this.parts.reduce((arr, i) => {
          if (typeof i === "string" && typeof arr[arr.length - 1] === "string")
            arr[arr.length - 1] += i;
          else
            arr.push(i);
          return arr;
        }, []);
        this.parts.splice(0);
        this.parts.push(...parts);
        this.reset();
      }
      moveCursor(n) {
        this.typed = "";
        this.cursor = n;
        this.fire();
      }
      reset() {
        this.moveCursor(this.parts.findIndex((p) => p instanceof DatePart));
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.error = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      async validate() {
        let valid = await this.validator(this.value);
        if (typeof valid === "string") {
          this.errorMsg = valid;
          valid = false;
        }
        this.error = !valid;
      }
      async submit() {
        await this.validate();
        if (this.error) {
          this.color = "red";
          this.fire();
          this.render();
          return;
        }
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      up() {
        this.typed = "";
        this.parts[this.cursor].up();
        this.render();
      }
      down() {
        this.typed = "";
        this.parts[this.cursor].down();
        this.render();
      }
      left() {
        let prev = this.parts[this.cursor].prev();
        if (prev == null)
          return this.bell();
        this.moveCursor(this.parts.indexOf(prev));
        this.render();
      }
      right() {
        let next = this.parts[this.cursor].next();
        if (next == null)
          return this.bell();
        this.moveCursor(this.parts.indexOf(next));
        this.render();
      }
      next() {
        let next = this.parts[this.cursor].next();
        this.moveCursor(next ? this.parts.indexOf(next) : this.parts.findIndex((part) => part instanceof DatePart));
        this.render();
      }
      _(c) {
        if (/\d/.test(c)) {
          this.typed += c;
          this.parts[this.cursor].setTo(this.typed);
          this.render();
        }
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? color.cyan().underline(p.toString()) : p), []).join("")
        ].join(" ");
        if (this.error) {
          this.outputText += this.errorMsg.split("\n").reduce(
            (a, l, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`,
            ``
          );
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = DatePrompt;
  }
});

// node_modules/prompts/lib/elements/number.js
var require_number2 = __commonJS({
  "node_modules/prompts/lib/elements/number.js"(exports2, module2) {
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { cursor, erase } = require_src();
    var { style, figures, clear, lines } = require_util2();
    var isNumber = /[0-9]/;
    var isDef = (any) => any !== void 0;
    var round = (number, precision) => {
      let factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    };
    var NumberPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.transform = style.render(opts.style);
        this.msg = opts.message;
        this.initial = isDef(opts.initial) ? opts.initial : "";
        this.float = !!opts.float;
        this.round = opts.round || 2;
        this.inc = opts.increment || 1;
        this.min = isDef(opts.min) ? opts.min : -Infinity;
        this.max = isDef(opts.max) ? opts.max : Infinity;
        this.errorMsg = opts.error || `Please Enter A Valid Value`;
        this.validator = opts.validate || (() => true);
        this.color = `cyan`;
        this.value = ``;
        this.typed = ``;
        this.lastHit = 0;
        this.render();
      }
      set value(v) {
        if (!v && v !== 0) {
          this.placeholder = true;
          this.rendered = color.gray(this.transform.render(`${this.initial}`));
          this._value = ``;
        } else {
          this.placeholder = false;
          this.rendered = this.transform.render(`${round(v, this.round)}`);
          this._value = round(v, this.round);
        }
        this.fire();
      }
      get value() {
        return this._value;
      }
      parse(x) {
        return this.float ? parseFloat(x) : parseInt(x);
      }
      valid(c) {
        return c === `-` || c === `.` && this.float || isNumber.test(c);
      }
      reset() {
        this.typed = ``;
        this.value = ``;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        let x = this.value;
        this.value = x !== `` ? x : this.initial;
        this.done = this.aborted = true;
        this.error = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      }
      async validate() {
        let valid = await this.validator(this.value);
        if (typeof valid === `string`) {
          this.errorMsg = valid;
          valid = false;
        }
        this.error = !valid;
      }
      async submit() {
        await this.validate();
        if (this.error) {
          this.color = `red`;
          this.fire();
          this.render();
          return;
        }
        let x = this.value;
        this.value = x !== `` ? x : this.initial;
        this.done = true;
        this.aborted = false;
        this.error = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      }
      up() {
        this.typed = ``;
        if (this.value === "") {
          this.value = this.min - this.inc;
        }
        if (this.value >= this.max)
          return this.bell();
        this.value += this.inc;
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      down() {
        this.typed = ``;
        if (this.value === "") {
          this.value = this.min + this.inc;
        }
        if (this.value <= this.min)
          return this.bell();
        this.value -= this.inc;
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      delete() {
        let val = this.value.toString();
        if (val.length === 0)
          return this.bell();
        this.value = this.parse(val = val.slice(0, -1)) || ``;
        if (this.value !== "" && this.value < this.min) {
          this.value = this.min;
        }
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      next() {
        this.value = this.initial;
        this.fire();
        this.render();
      }
      _(c, key) {
        if (!this.valid(c))
          return this.bell();
        const now = Date.now();
        if (now - this.lastHit > 1e3)
          this.typed = ``;
        this.typed += c;
        this.lastHit = now;
        this.color = `cyan`;
        if (c === `.`)
          return this.fire();
        this.value = Math.min(this.parse(this.typed), this.max);
        if (this.value > this.max)
          this.value = this.max;
        if (this.value < this.min)
          this.value = this.min;
        this.fire();
        this.render();
      }
      render() {
        if (this.closed)
          return;
        if (!this.firstRender) {
          if (this.outputError)
            this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
          this.out.write(clear(this.outputText, this.out.columns));
        }
        super.render();
        this.outputError = "";
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          !this.done || !this.done && !this.placeholder ? color[this.color]().underline(this.rendered) : this.rendered
        ].join(` `);
        if (this.error) {
          this.outputError += this.errorMsg.split(`
`).reduce((a, l, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore);
      }
    };
    module2.exports = NumberPrompt;
  }
});

// node_modules/prompts/lib/elements/multiselect.js
var require_multiselect2 = __commonJS({
  "node_modules/prompts/lib/elements/multiselect.js"(exports2, module2) {
    "use strict";
    var color = require_kleur();
    var { cursor } = require_src();
    var Prompt = require_prompt2();
    var { clear, figures, style, wrap, entriesToDisplay } = require_util2();
    var MultiselectPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.cursor = opts.cursor || 0;
        this.scrollIndex = opts.cursor || 0;
        this.hint = opts.hint || "";
        this.warn = opts.warn || "- This option is disabled -";
        this.minSelected = opts.min;
        this.showMinError = false;
        this.maxChoices = opts.max;
        this.instructions = opts.instructions;
        this.optionsPerPage = opts.optionsPerPage || 10;
        this.value = opts.choices.map((ch, idx) => {
          if (typeof ch === "string")
            ch = { title: ch, value: idx };
          return {
            title: ch && (ch.title || ch.value || ch),
            description: ch && ch.description,
            value: ch && (ch.value === void 0 ? idx : ch.value),
            selected: ch && ch.selected,
            disabled: ch && ch.disabled
          };
        });
        this.clear = clear("", this.out.columns);
        if (!opts.overrideRender) {
          this.render();
        }
      }
      reset() {
        this.value.map((v) => !v.selected);
        this.cursor = 0;
        this.fire();
        this.render();
      }
      selected() {
        return this.value.filter((v) => v.selected);
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        const selected = this.value.filter((e) => e.selected);
        if (this.minSelected && selected.length < this.minSelected) {
          this.showMinError = true;
          this.render();
        } else {
          this.done = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        }
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.value.length - 1;
        this.render();
      }
      next() {
        this.cursor = (this.cursor + 1) % this.value.length;
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.cursor = this.value.length - 1;
        } else {
          this.cursor--;
        }
        this.render();
      }
      down() {
        if (this.cursor === this.value.length - 1) {
          this.cursor = 0;
        } else {
          this.cursor++;
        }
        this.render();
      }
      left() {
        this.value[this.cursor].selected = false;
        this.render();
      }
      right() {
        if (this.value.filter((e) => e.selected).length >= this.maxChoices)
          return this.bell();
        this.value[this.cursor].selected = true;
        this.render();
      }
      handleSpaceToggle() {
        const v = this.value[this.cursor];
        if (v.selected) {
          v.selected = false;
          this.render();
        } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
          return this.bell();
        } else {
          v.selected = true;
          this.render();
        }
      }
      toggleAll() {
        if (this.maxChoices !== void 0 || this.value[this.cursor].disabled) {
          return this.bell();
        }
        const newSelected = !this.value[this.cursor].selected;
        this.value.filter((v) => !v.disabled).forEach((v) => v.selected = newSelected);
        this.render();
      }
      _(c, key) {
        if (c === " ") {
          this.handleSpaceToggle();
        } else if (c === "a") {
          this.toggleAll();
        } else {
          return this.bell();
        }
      }
      renderInstructions() {
        if (this.instructions === void 0 || this.instructions) {
          if (typeof this.instructions === "string") {
            return this.instructions;
          }
          return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
` + (this.maxChoices === void 0 ? `    a: Toggle all
` : "") + `    enter/return: Complete answer`;
        }
        return "";
      }
      renderOption(cursor2, v, i, arrowIndicator) {
        const prefix = (v.selected ? color.green(figures.radioOn) : figures.radioOff) + " " + arrowIndicator + " ";
        let title, desc;
        if (v.disabled) {
          title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
        } else {
          title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
          if (cursor2 === i && v.description) {
            desc = ` - ${v.description}`;
            if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
              desc = "\n" + wrap(v.description, { margin: prefix.length, width: this.out.columns });
            }
          }
        }
        return prefix + title + color.gray(desc || "");
      }
      // shared with autocompleteMultiselect
      paginateOptions(options) {
        if (options.length === 0) {
          return color.red("No matches for this query.");
        }
        let { startIndex, endIndex } = entriesToDisplay(this.cursor, options.length, this.optionsPerPage);
        let prefix, styledOptions = [];
        for (let i = startIndex; i < endIndex; i++) {
          if (i === startIndex && startIndex > 0) {
            prefix = figures.arrowUp;
          } else if (i === endIndex - 1 && endIndex < options.length) {
            prefix = figures.arrowDown;
          } else {
            prefix = " ";
          }
          styledOptions.push(this.renderOption(this.cursor, options[i], i, prefix));
        }
        return "\n" + styledOptions.join("\n");
      }
      // shared with autocomleteMultiselect
      renderOptions(options) {
        if (!this.done) {
          return this.paginateOptions(options);
        }
        return "";
      }
      renderDoneOrInstructions() {
        if (this.done) {
          return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
        }
        const output = [color.gray(this.hint), this.renderInstructions()];
        if (this.value[this.cursor].disabled) {
          output.push(color.yellow(this.warn));
        }
        return output.join(" ");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        super.render();
        let prompt2 = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.renderDoneOrInstructions()
        ].join(" ");
        if (this.showMinError) {
          prompt2 += color.red(`You must select a minimum of ${this.minSelected} choices.`);
          this.showMinError = false;
        }
        prompt2 += this.renderOptions(this.value);
        this.out.write(this.clear + prompt2);
        this.clear = clear(prompt2, this.out.columns);
      }
    };
    module2.exports = MultiselectPrompt;
  }
});

// node_modules/prompts/lib/elements/autocomplete.js
var require_autocomplete2 = __commonJS({
  "node_modules/prompts/lib/elements/autocomplete.js"(exports2, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { erase, cursor } = require_src();
    var { style, clear, figures, wrap, entriesToDisplay } = require_util2();
    var getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);
    var getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);
    var getIndex = (arr, valOrTitle) => {
      const index = arr.findIndex((el) => el.value === valOrTitle || el.title === valOrTitle);
      return index > -1 ? index : void 0;
    };
    var AutocompletePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.suggest = opts.suggest;
        this.choices = opts.choices;
        this.initial = typeof opts.initial === "number" ? opts.initial : getIndex(opts.choices, opts.initial);
        this.select = this.initial || opts.cursor || 0;
        this.i18n = { noMatches: opts.noMatches || "no matches found" };
        this.fallback = opts.fallback || this.initial;
        this.clearFirst = opts.clearFirst || false;
        this.suggestions = [];
        this.input = "";
        this.limit = opts.limit || 10;
        this.cursor = 0;
        this.transform = style.render(opts.style);
        this.scale = this.transform.scale;
        this.render = this.render.bind(this);
        this.complete = this.complete.bind(this);
        this.clear = clear("", this.out.columns);
        this.complete(this.render);
        this.render();
      }
      set fallback(fb) {
        this._fb = Number.isSafeInteger(parseInt(fb)) ? parseInt(fb) : fb;
      }
      get fallback() {
        let choice;
        if (typeof this._fb === "number")
          choice = this.choices[this._fb];
        else if (typeof this._fb === "string")
          choice = { title: this._fb };
        return choice || this._fb || { title: this.i18n.noMatches };
      }
      moveSelect(i) {
        this.select = i;
        if (this.suggestions.length > 0)
          this.value = getVal(this.suggestions, i);
        else
          this.value = this.fallback.value;
        this.fire();
      }
      async complete(cb) {
        const p = this.completing = this.suggest(this.input, this.choices);
        const suggestions = await p;
        if (this.completing !== p)
          return;
        this.suggestions = suggestions.map((s, i, arr) => ({ title: getTitle(arr, i), value: getVal(arr, i), description: s.description }));
        this.completing = false;
        const l = Math.max(suggestions.length - 1, 0);
        this.moveSelect(Math.min(l, this.select));
        cb && cb();
      }
      reset() {
        this.input = "";
        this.complete(() => {
          this.moveSelect(this.initial !== void 0 ? this.initial : 0);
          this.render();
        });
        this.render();
      }
      exit() {
        if (this.clearFirst && this.input.length > 0) {
          this.reset();
        } else {
          this.done = this.exited = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        }
      }
      abort() {
        this.done = this.aborted = true;
        this.exited = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.done = true;
        this.aborted = this.exited = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      _(c, key) {
        let s1 = this.input.slice(0, this.cursor);
        let s2 = this.input.slice(this.cursor);
        this.input = `${s1}${c}${s2}`;
        this.cursor = s1.length + 1;
        this.complete(this.render);
        this.render();
      }
      delete() {
        if (this.cursor === 0)
          return this.bell();
        let s1 = this.input.slice(0, this.cursor - 1);
        let s2 = this.input.slice(this.cursor);
        this.input = `${s1}${s2}`;
        this.complete(this.render);
        this.cursor = this.cursor - 1;
        this.render();
      }
      deleteForward() {
        if (this.cursor * this.scale >= this.rendered.length)
          return this.bell();
        let s1 = this.input.slice(0, this.cursor);
        let s2 = this.input.slice(this.cursor + 1);
        this.input = `${s1}${s2}`;
        this.complete(this.render);
        this.render();
      }
      first() {
        this.moveSelect(0);
        this.render();
      }
      last() {
        this.moveSelect(this.suggestions.length - 1);
        this.render();
      }
      up() {
        if (this.select === 0) {
          this.moveSelect(this.suggestions.length - 1);
        } else {
          this.moveSelect(this.select - 1);
        }
        this.render();
      }
      down() {
        if (this.select === this.suggestions.length - 1) {
          this.moveSelect(0);
        } else {
          this.moveSelect(this.select + 1);
        }
        this.render();
      }
      next() {
        if (this.select === this.suggestions.length - 1) {
          this.moveSelect(0);
        } else
          this.moveSelect(this.select + 1);
        this.render();
      }
      nextPage() {
        this.moveSelect(Math.min(this.select + this.limit, this.suggestions.length - 1));
        this.render();
      }
      prevPage() {
        this.moveSelect(Math.max(this.select - this.limit, 0));
        this.render();
      }
      left() {
        if (this.cursor <= 0)
          return this.bell();
        this.cursor = this.cursor - 1;
        this.render();
      }
      right() {
        if (this.cursor * this.scale >= this.rendered.length)
          return this.bell();
        this.cursor = this.cursor + 1;
        this.render();
      }
      renderOption(v, hovered, isStart, isEnd) {
        let desc;
        let prefix = isStart ? figures.arrowUp : isEnd ? figures.arrowDown : " ";
        let title = hovered ? color.cyan().underline(v.title) : v.title;
        prefix = (hovered ? color.cyan(figures.pointer) + " " : "  ") + prefix;
        if (v.description) {
          desc = ` - ${v.description}`;
          if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
            desc = "\n" + wrap(v.description, { margin: 3, width: this.out.columns });
          }
        }
        return prefix + " " + title + color.gray(desc || "");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        let { startIndex, endIndex } = entriesToDisplay(this.select, this.choices.length, this.limit);
        this.outputText = [
          style.symbol(this.done, this.aborted, this.exited),
          color.bold(this.msg),
          style.delimiter(this.completing),
          this.done && this.suggestions[this.select] ? this.suggestions[this.select].title : this.rendered = this.transform.render(this.input)
        ].join(" ");
        if (!this.done) {
          const suggestions = this.suggestions.slice(startIndex, endIndex).map((item, i) => this.renderOption(
            item,
            this.select === i + startIndex,
            i === 0 && startIndex > 0,
            i + startIndex === endIndex - 1 && endIndex < this.choices.length
          )).join("\n");
          this.outputText += `
` + (suggestions || color.gray(this.fallback.title));
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = AutocompletePrompt;
  }
});

// node_modules/prompts/lib/elements/autocompleteMultiselect.js
var require_autocompleteMultiselect2 = __commonJS({
  "node_modules/prompts/lib/elements/autocompleteMultiselect.js"(exports2, module2) {
    "use strict";
    var color = require_kleur();
    var { cursor } = require_src();
    var MultiselectPrompt = require_multiselect2();
    var { clear, style, figures } = require_util2();
    var AutocompleteMultiselectPrompt = class extends MultiselectPrompt {
      constructor(opts = {}) {
        opts.overrideRender = true;
        super(opts);
        this.inputValue = "";
        this.clear = clear("", this.out.columns);
        this.filteredOptions = this.value;
        this.render();
      }
      last() {
        this.cursor = this.filteredOptions.length - 1;
        this.render();
      }
      next() {
        this.cursor = (this.cursor + 1) % this.filteredOptions.length;
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.cursor = this.filteredOptions.length - 1;
        } else {
          this.cursor--;
        }
        this.render();
      }
      down() {
        if (this.cursor === this.filteredOptions.length - 1) {
          this.cursor = 0;
        } else {
          this.cursor++;
        }
        this.render();
      }
      left() {
        this.filteredOptions[this.cursor].selected = false;
        this.render();
      }
      right() {
        if (this.value.filter((e) => e.selected).length >= this.maxChoices)
          return this.bell();
        this.filteredOptions[this.cursor].selected = true;
        this.render();
      }
      delete() {
        if (this.inputValue.length) {
          this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
          this.updateFilteredOptions();
        }
      }
      updateFilteredOptions() {
        const currentHighlight = this.filteredOptions[this.cursor];
        this.filteredOptions = this.value.filter((v) => {
          if (this.inputValue) {
            if (typeof v.title === "string") {
              if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
                return true;
              }
            }
            if (typeof v.value === "string") {
              if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
                return true;
              }
            }
            return false;
          }
          return true;
        });
        const newHighlightIndex = this.filteredOptions.findIndex((v) => v === currentHighlight);
        this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
        this.render();
      }
      handleSpaceToggle() {
        const v = this.filteredOptions[this.cursor];
        if (v.selected) {
          v.selected = false;
          this.render();
        } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
          return this.bell();
        } else {
          v.selected = true;
          this.render();
        }
      }
      handleInputChange(c) {
        this.inputValue = this.inputValue + c;
        this.updateFilteredOptions();
      }
      _(c, key) {
        if (c === " ") {
          this.handleSpaceToggle();
        } else {
          this.handleInputChange(c);
        }
      }
      renderInstructions() {
        if (this.instructions === void 0 || this.instructions) {
          if (typeof this.instructions === "string") {
            return this.instructions;
          }
          return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
`;
        }
        return "";
      }
      renderCurrentInput() {
        return `
Filtered results for: ${this.inputValue ? this.inputValue : color.gray("Enter something to filter")}
`;
      }
      renderOption(cursor2, v, i) {
        let title;
        if (v.disabled)
          title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
        else
          title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
        return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + "  " + title;
      }
      renderDoneOrInstructions() {
        if (this.done) {
          return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
        }
        const output = [color.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];
        if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
          output.push(color.yellow(this.warn));
        }
        return output.join(" ");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        super.render();
        let prompt2 = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.renderDoneOrInstructions()
        ].join(" ");
        if (this.showMinError) {
          prompt2 += color.red(`You must select a minimum of ${this.minSelected} choices.`);
          this.showMinError = false;
        }
        prompt2 += this.renderOptions(this.filteredOptions);
        this.out.write(this.clear + prompt2);
        this.clear = clear(prompt2, this.out.columns);
      }
    };
    module2.exports = AutocompleteMultiselectPrompt;
  }
});

// node_modules/prompts/lib/elements/confirm.js
var require_confirm2 = __commonJS({
  "node_modules/prompts/lib/elements/confirm.js"(exports2, module2) {
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { style, clear } = require_util2();
    var { erase, cursor } = require_src();
    var ConfirmPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.value = opts.initial;
        this.initialValue = !!opts.initial;
        this.yesMsg = opts.yes || "yes";
        this.yesOption = opts.yesOption || "(Y/n)";
        this.noMsg = opts.no || "no";
        this.noOption = opts.noOption || "(y/N)";
        this.render();
      }
      reset() {
        this.value = this.initialValue;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.value = this.value || false;
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      _(c, key) {
        if (c.toLowerCase() === "y") {
          this.value = true;
          return this.submit();
        }
        if (c.toLowerCase() === "n") {
          this.value = false;
          return this.submit();
        }
        return this.bell();
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          this.done ? this.value ? this.yesMsg : this.noMsg : color.gray(this.initialValue ? this.yesOption : this.noOption)
        ].join(" ");
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = ConfirmPrompt;
  }
});

// node_modules/prompts/lib/elements/index.js
var require_elements2 = __commonJS({
  "node_modules/prompts/lib/elements/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      TextPrompt: require_text2(),
      SelectPrompt: require_select2(),
      TogglePrompt: require_toggle2(),
      DatePrompt: require_date2(),
      NumberPrompt: require_number2(),
      MultiselectPrompt: require_multiselect2(),
      AutocompletePrompt: require_autocomplete2(),
      AutocompleteMultiselectPrompt: require_autocompleteMultiselect2(),
      ConfirmPrompt: require_confirm2()
    };
  }
});

// node_modules/prompts/lib/prompts.js
var require_prompts2 = __commonJS({
  "node_modules/prompts/lib/prompts.js"(exports2) {
    "use strict";
    var $ = exports2;
    var el = require_elements2();
    var noop = (v) => v;
    function toPrompt(type, args, opts = {}) {
      return new Promise((res, rej) => {
        const p = new el[type](args);
        const onAbort = opts.onAbort || noop;
        const onSubmit = opts.onSubmit || noop;
        const onExit = opts.onExit || noop;
        p.on("state", args.onState || noop);
        p.on("submit", (x) => res(onSubmit(x)));
        p.on("exit", (x) => res(onExit(x)));
        p.on("abort", (x) => rej(onAbort(x)));
      });
    }
    $.text = (args) => toPrompt("TextPrompt", args);
    $.password = (args) => {
      args.style = "password";
      return $.text(args);
    };
    $.invisible = (args) => {
      args.style = "invisible";
      return $.text(args);
    };
    $.number = (args) => toPrompt("NumberPrompt", args);
    $.date = (args) => toPrompt("DatePrompt", args);
    $.confirm = (args) => toPrompt("ConfirmPrompt", args);
    $.list = (args) => {
      const sep = args.separator || ",";
      return toPrompt("TextPrompt", args, {
        onSubmit: (str) => str.split(sep).map((s) => s.trim())
      });
    };
    $.toggle = (args) => toPrompt("TogglePrompt", args);
    $.select = (args) => toPrompt("SelectPrompt", args);
    $.multiselect = (args) => {
      args.choices = [].concat(args.choices || []);
      const toSelected = (items) => items.filter((item) => item.selected).map((item) => item.value);
      return toPrompt("MultiselectPrompt", args, {
        onAbort: toSelected,
        onSubmit: toSelected
      });
    };
    $.autocompleteMultiselect = (args) => {
      args.choices = [].concat(args.choices || []);
      const toSelected = (items) => items.filter((item) => item.selected).map((item) => item.value);
      return toPrompt("AutocompleteMultiselectPrompt", args, {
        onAbort: toSelected,
        onSubmit: toSelected
      });
    };
    var byTitle = (input, choices) => Promise.resolve(
      choices.filter((item) => item.title.slice(0, input.length).toLowerCase() === input.toLowerCase())
    );
    $.autocomplete = (args) => {
      args.suggest = args.suggest || byTitle;
      args.choices = [].concat(args.choices || []);
      return toPrompt("AutocompletePrompt", args);
    };
  }
});

// node_modules/prompts/lib/index.js
var require_lib = __commonJS({
  "node_modules/prompts/lib/index.js"(exports2, module2) {
    "use strict";
    var prompts2 = require_prompts2();
    var passOn = ["suggest", "format", "onState", "validate", "onRender", "type"];
    var noop = () => {
    };
    async function prompt2(questions = [], { onSubmit = noop, onCancel = noop } = {}) {
      const answers = {};
      const override2 = prompt2._override || {};
      questions = [].concat(questions);
      let answer, question, quit, name, type, lastPrompt;
      const getFormattedAnswer = async (question2, answer2, skipValidation = false) => {
        if (!skipValidation && question2.validate && question2.validate(answer2) !== true) {
          return;
        }
        return question2.format ? await question2.format(answer2, answers) : answer2;
      };
      for (question of questions) {
        ({ name, type } = question);
        if (typeof type === "function") {
          type = await type(answer, { ...answers }, question);
          question["type"] = type;
        }
        if (!type)
          continue;
        for (let key in question) {
          if (passOn.includes(key))
            continue;
          let value = question[key];
          question[key] = typeof value === "function" ? await value(answer, { ...answers }, lastPrompt) : value;
        }
        lastPrompt = question;
        if (typeof question.message !== "string") {
          throw new Error("prompt message is required");
        }
        ({ name, type } = question);
        if (prompts2[type] === void 0) {
          throw new Error(`prompt type (${type}) is not defined`);
        }
        if (override2[question.name] !== void 0) {
          answer = await getFormattedAnswer(question, override2[question.name]);
          if (answer !== void 0) {
            answers[name] = answer;
            continue;
          }
        }
        try {
          answer = prompt2._injected ? getInjectedAnswer(prompt2._injected, question.initial) : await prompts2[type](question);
          answers[name] = answer = await getFormattedAnswer(question, answer, true);
          quit = await onSubmit(question, answer, answers);
        } catch (err) {
          quit = !await onCancel(question, answers);
        }
        if (quit)
          return answers;
      }
      return answers;
    }
    function getInjectedAnswer(injected, deafultValue) {
      const answer = injected.shift();
      if (answer instanceof Error) {
        throw answer;
      }
      return answer === void 0 ? deafultValue : answer;
    }
    function inject(answers) {
      prompt2._injected = (prompt2._injected || []).concat(answers);
    }
    function override(answers) {
      prompt2._override = Object.assign({}, answers);
    }
    module2.exports = Object.assign(prompt2, { prompt: prompt2, prompts: prompts2, inject, override });
  }
});

// node_modules/prompts/index.js
var require_prompts3 = __commonJS({
  "node_modules/prompts/index.js"(exports2, module2) {
    function isNodeLT(tar) {
      tar = (Array.isArray(tar) ? tar : tar.split(".")).map(Number);
      let i = 0, src = process.versions.node.split(".").map(Number);
      for (; i < tar.length; i++) {
        if (src[i] > tar[i])
          return false;
        if (tar[i] > src[i])
          return true;
      }
      return false;
    }
    module2.exports = isNodeLT("8.6.0") ? require_dist() : require_lib();
  }
});

// src/utilities/fail.ts
var ERROR_BANNER = `

 _____ ____  ____   ___  ____
| ____|  _ \\|  _ \\ / _ \\|  _ \\
|  _| | |_) | |_) | | | | |_) |
| |___|  _ <|  _ <| |_| |  _ <
|_____|_| \\_\\_| \\_\\\\___/|_| \\_\\

`.replace(/^( *\r?\n)+/m, "").replace(/( *\r?\n *)+$/m, "");
var FriendlyError = class extends Error {
  constructor(message) {
    super(message);
  }
};
function fail(message) {
  throw new FriendlyError(message);
}
function formatError(error2) {
  if (error2 instanceof FriendlyError) {
    return `${error2.message}`;
  } else if (error2 instanceof Error) {
    return error2.stack ?? `${error2.name}: ${error2.message}`;
  } else {
    return `${error2}`;
  }
}

// src/config/config-data-types.ts
var ValidationError = class extends Error {
  constructor(message) {
    super(message);
  }
};
function pinned(value) {
  return { value, pinned: true };
}
function unpinned(value) {
  return { value, pinned: false };
}

// src/utilities/constants.ts
var DEFAULT_ENUM = "default";
var PINNED_SUFFIX = "::pinned";
var LP_NEW_FILE_EXTENSION = ".LP_NEW";
var LP_OLD_FILE_EXTENSION = ".LP_OLD";
var ERROR_LOG_FILE = "LAUNCHPAD.ERROR";
var MAX_LINE_LENGTH = 120;
var SEPARATOR_LINE = new Array(MAX_LINE_LENGTH).fill("-").join("");
var LAUNCHPAD_PACKAGE_NAME = "@david-04/launchpad";
function defaultMightChange(defaultValue) {
  return `currently ${defaultValue} (might change in future uplifts)`;
}

// src/config/version-number.ts
var Version = class {
  //
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(major, minor, patch) {
    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Compare the current version with another one
  //------------------------------------------------------------------------------------------------------------------
  compareTo(other) {
    return this.major - other.major || this.minor - other.minor || this.patch - other.patch;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Render the full version into a string
  //------------------------------------------------------------------------------------------------------------------
  render() {
    return `${this.major}.${this.minor}.${this.patch}`;
  }
};

// src/config/config-parsers.ts
function parseProjectName(value, source) {
  const reference = source ? `${source.substring(0, 1).toUpperCase()}${source.substring(1)}` : `The project name`;
  const trimmed = value.trim();
  if (!trimmed) {
    return error(`${reference} must not be empty`);
  } else if (trimmed.match(/[\\\/:*<>$#?]/)) {
    return error(`${reference} must be a valid file name and not contain any special characters`);
  } else {
    return trimmed;
  }
}
function createDirectoryParser(type, mode) {
  return (value, source) => {
    const reference = source ? `${source.substring(0, 1).toUpperCase()}${source.substring(1)}` : `The ${type}`;
    const trimmed = value.trim().replace(/\\/g, "/");
    if (!trimmed && "mandatory" === mode) {
      return error(`${reference} must neither be empty nor the current directory`);
    } else if (!trimmed) {
      return trimmed;
    } else if (trimmed.match(/^(\/|[a-z]:)/i)) {
      return error(`${reference} must not be a relative (and not an absolute) path`);
    } else {
      const normalized = trimmed.replace(/(^\.\/)|(\/$)/g, "");
      if (!normalized) {
        return error(`${reference} must not be the current directory`);
      } else if (normalized.match(/[:*<>$#?]/)) {
        return error(`${reference} must be a valid path and not contain any special characters`);
      } else {
        return normalized;
      }
    }
  };
}
function parseVersion(value, source) {
  const trimmed = value.trim();
  const split = trimmed.split(".").map((value2) => value2.trim());
  const parsed = split.map((segment) => segment.match(/^\d+$/) ? parseInt(segment) : NaN);
  const [major, minor, patch, ...other] = parsed;
  const isNumber = (value2) => void 0 !== value2 && !isNaN(value2) && 0 <= value2;
  if (isNumber(major) && isNumber(minor) && isNumber(patch) && !other.length) {
    return new Version(major, minor, patch);
  } else {
    return source ? error(`"${trimmed}" is not a valid value for ${source}`) : error(`"${trimmed}" is not a valid version number`);
  }
}
function parseBoolean(value, source) {
  const trimmed = value.trim();
  const normalized = value.toLowerCase();
  if (["t", "true", "y", "yes"].includes(normalized)) {
    return true;
  } else if (["f", "false", "n", "no"].includes(normalized)) {
    return false;
  } else {
    return source ? error(`"${trimmed}" is not a valid value for ${source}`) : error(`"${trimmed}" is not a valid boolean (allowed values: true/false or yes/no)`);
  }
}
function createIntegerParser(name, min, max) {
  return (value, source) => {
    const parsed = parseInt(value);
    if (isNaN(parsed)) {
      return source ? error(`"${value}" is not a valid value for ${source} (it must be a number/integer)`) : error(`"${value}" is not a valid ${name} (it must be a number/integer)`);
    } else if (parsed < min || max < parsed) {
      return source ? error(`"${value}" is not a valid value for ${source} (it must be between ${min} and ${max})`) : error(`"${value}" is not a valid ${name} (it must be between ${min} and ${max})`);
    } else {
      return parsed;
    }
  };
}
function createNonPinnableEnumParser(allowedValues) {
  return (value, source) => {
    if (allowedValues.some((allowed) => allowed === value)) {
      return value;
    } else {
      const message = [
        `"${value}" is not a valid value`,
        source ? `for ${source}` : "",
        `(allowed values: ${allowedValues.join(", ")})`
      ];
      return error(message.join(" ").replace(/ +/g, " "));
    }
  };
}
function createPinnableEnumParser(allowedValues) {
  const parser = createNonPinnableEnumParser(allowedValues);
  return (value, source) => {
    const trimmed = value.trim();
    const isPinned = trimmed.endsWith(PINNED_SUFFIX);
    const text = parser(isPinned ? trimmed.substring(0, trimmed.length - PINNED_SUFFIX.length) : trimmed, source);
    if ("string" === typeof text) {
      return isPinned ? pinned(text) : unpinned(text);
    } else {
      return text;
    }
  };
}
function createEnumSetParser(allowedValues) {
  return (value, source) => {
    const result = /* @__PURE__ */ new Set();
    const errors = new Array();
    const items = value.split(",").map((value2) => value2.trim()).filter((value2) => value2);
    for (const item of items) {
      const match = allowedValues.filter((allowed) => allowed.toLowerCase() === item.toLowerCase())[0];
      if (void 0 !== match) {
        result.add(match);
      } else {
        errors.push(item);
      }
    }
    if (errors.length) {
      const message = [
        `"${errors[0]}" is not a valid value`,
        source ? `for ${source}` : "",
        `(allowed values: default or a comma-separated list of ${allowedValues.join(",")})`
      ];
      return error(message.join(" ").replace(/ +/g, " "));
    } else {
      return result;
    }
  };
}
function parseStringArray(value) {
  return value.split(",").map((value2) => value2.trim()).filter((value2) => value2);
}
function error(message) {
  return { error: message };
}

// src/config/config-descriptor-factories.ts
function createNonPinnableEnumProperty(property) {
  const currentValues = property.currentValues.map((value) => value[0]);
  const allValues = [...currentValues, ...property.obsoleteValues];
  const currentValuesWithDefault = [DEFAULT_ENUM, ...currentValues];
  const commandLineInfo = createCommandLineInfo(
    property.commandLine,
    property.commandLine?.placeholder ?? `[${currentValuesWithDefault.join(" | ")}]`
  );
  const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
  const parseOldValue = createOldValueParser(matchesConfigFileKey, createNonPinnableEnumParser(allValues));
  const parseNewValue = createNonPinnableEnumParser(currentValues);
  const parseFromCommandLine = createCommandLineParser(property.commandLine, parseNewValue);
  const values = currentValues.join(", ");
  const serialize = createSerializer(property.configFile, (value) => value, values);
  const assertOldValuePresent = createAssertPresentHandler(property.name, property.configFile);
  const descriptor = {
    commandLineInfo,
    matchesConfigFileKey,
    parseOldValue,
    parseNewValue,
    parseFromCommandLine,
    serialize,
    assertOldValuePresent
  };
  return { ...descriptor, options: property.currentValues };
}
function createPinnableEnumProperty(property) {
  const currentValues = property.currentValues.map((value) => value[0]);
  const allValues = [...currentValues, ...property.obsoleteValues];
  const currentValuesWithDefault = [DEFAULT_ENUM, ...currentValues];
  const commandLineInfo = createCommandLineInfo(property.commandLine, `[${currentValuesWithDefault.join(" | ")}]`);
  const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
  const parseOldValue = createOldValueParser(
    matchesConfigFileKey,
    createPinnableEnumParser(allValues)
  );
  const parseNewValue = createPinnableEnumParser(currentValues);
  const parseFromCommandLine = createCommandLineParser(property.commandLine, parseNewValue);
  const values = currentValues.join(", ");
  const render = (prop) => [prop.value, prop.pinned ? PINNED_SUFFIX : ""].join("");
  const serialize = createSerializer(property.configFile, render, values);
  const assertOldValuePresent = createAssertPresentHandler(
    property.name,
    property.configFile
  );
  const descriptor = {
    commandLineInfo,
    matchesConfigFileKey,
    parseOldValue,
    parseNewValue,
    parseFromCommandLine,
    serialize,
    assertOldValuePresent
  };
  return { ...descriptor, options: property.currentValues };
}
function createEnumSetProperty(property) {
  const currentValues = property.currentValues.map((value) => value[0]);
  const allValues = [...currentValues, ...property.obsoleteValues];
  const currentValuesWithDefault = [DEFAULT_ENUM, ...currentValues];
  const commandLineInfo = createCommandLineInfo(
    property.commandLine,
    property.commandLine?.placeholder ?? `[${currentValuesWithDefault.join(",")}]`
  );
  const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
  const parseOldValue = createOldValueParser(matchesConfigFileKey, createEnumSetParser(allValues));
  const parseNewValue = createEnumSetParser(currentValues);
  const parseFromCommandLine = createCommandLineParser(property.commandLine, parseNewValue);
  const values = currentValues.join(", ");
  const serialize = createSerializer(
    property.configFile,
    (value) => [...value].join(","),
    values
  );
  const assertOldValuePresent = createAssertPresentHandler(property.name, property.configFile);
  const descriptor = {
    commandLineInfo,
    matchesConfigFileKey,
    parseOldValue,
    parseNewValue,
    parseFromCommandLine,
    serialize,
    assertOldValuePresent
  };
  return { ...descriptor, options: property.currentValues };
}
function createStringProperty(property) {
  const placeholder = property.commandLine ? `[${property.commandLine?.placeholder} | default]` : void 0;
  const commandLineInfo = createCommandLineInfo(property.commandLine, placeholder);
  const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
  const parseOldValue = createOldValueParser(matchesConfigFileKey, property.parseOldValue);
  const parseNewValue = property.parseNewValue;
  const parseFromCommandLine = createCommandLineParser(property.commandLine, parseNewValue);
  const serialize = createSerializer(property.configFile, (value) => value);
  const assertOldValuePresent = createAssertPresentHandler(property.name, property.configFile);
  return {
    commandLineInfo,
    matchesConfigFileKey,
    parseOldValue,
    parseNewValue,
    parseFromCommandLine,
    serialize,
    assertOldValuePresent
  };
}
function createStringArrayProperty(property) {
  const placeholder = property.commandLine ? `[${property.commandLine?.placeholder}]` : void 0;
  const commandLineInfo = createCommandLineInfo(property.commandLine, placeholder);
  const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
  const parseOldValue = createOldValueParser(matchesConfigFileKey, property.parseOldValue);
  const parseNewValue = property.parseNewValue;
  const parseFromCommandLine = createCommandLineParser(property.commandLine, parseNewValue);
  const serialize = createSerializer(
    property.configFile,
    (value) => Array.from(value).join(",")
  );
  const assertOldValuePresent = createAssertPresentHandler(
    property.name,
    property.configFile
  );
  return {
    commandLineInfo,
    matchesConfigFileKey,
    parseOldValue,
    parseNewValue,
    parseFromCommandLine,
    serialize,
    assertOldValuePresent
  };
}
function createBooleanProperty(property) {
  const commandLineInfo = property.commandLine;
  const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
  const parseOldValue = createOldValueParser(matchesConfigFileKey, parseBoolean);
  const parseNewValue = parseBoolean;
  const parseFromCommandLine = createCommandLineParser(property.commandLine, parseNewValue);
  const serialize = createSerializer(
    property.configFile,
    (value) => value ? "true" : "false"
  );
  const assertOldValuePresent = createAssertPresentHandler(property.name, property.configFile);
  return {
    commandLineInfo,
    matchesConfigFileKey,
    parseOldValue,
    parseNewValue,
    parseFromCommandLine,
    serialize,
    assertOldValuePresent
  };
}
function createIntegerProperty(property) {
  const commandLineInfo = property.commandLine;
  const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
  const numberParser = createIntegerParser(property.name, property.range.min, property.range.max);
  const parseOldValue = createOldValueParser(matchesConfigFileKey, numberParser);
  const parseNewValue = numberParser;
  const parseFromCommandLine = createCommandLineParser(property.commandLine, parseNewValue);
  const serialize = createSerializer(property.configFile, (value) => `${value}`);
  const assertOldValuePresent = createAssertPresentHandler(property.name, property.configFile);
  return {
    commandLineInfo,
    matchesConfigFileKey,
    parseOldValue,
    parseNewValue,
    parseFromCommandLine,
    serialize,
    assertOldValuePresent
  };
}
function createVersionProperty(property) {
  const commandLineInfo = void 0;
  const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
  const parseOldValue = createOldValueParser(matchesConfigFileKey, parseVersion);
  const parseNewValue = parseVersion;
  const parseFromCommandLine = createCommandLineParser(void 0, parseNewValue);
  const serialize = createSerializer(property.configFile, (value) => value.render());
  const assertOldValuePresent = createAssertPresentHandler(property.name, property.configFile);
  return {
    commandLineInfo,
    matchesConfigFileKey,
    parseOldValue,
    parseNewValue,
    parseFromCommandLine,
    serialize,
    assertOldValuePresent
  };
}
function createCommandLineInfo(descriptor, placeholder) {
  if (descriptor) {
    return { ...descriptor, placeholder };
  } else {
    return void 0;
  }
}
function createConfigFileKeyMatcher(descriptor) {
  if (descriptor) {
    const name = "currentKey";
    const activeKey = name in descriptor ? [descriptor[name]] : [];
    const allKeys = [...activeKey, ...descriptor.obsoleteKeys ?? []];
    return (key) => allKeys.some((currentKey) => currentKey === key);
  } else {
    return () => false;
  }
}
function createOldValueParser(matchesConfigFileKey, parse) {
  return (properties, addError) => {
    const property = properties.filter((property2) => matchesConfigFileKey(property2.key)).pop();
    if (property) {
      const value = parse(property.value, property.key);
      if (value && "object" === typeof value && "error" in value) {
        addError(property.formatError(value.error));
      } else {
        return value;
      }
    }
    return void 0;
  };
}
function createSerializer(descriptor, render, fallbackComment) {
  return (data) => {
    if (descriptor && "currentKey" in descriptor && "newConfigObjectName" in descriptor) {
      const key = descriptor.currentKey;
      const value = render(data[descriptor.newConfigObjectName]);
      const comment = descriptor.comment ?? fallbackComment ?? "";
      return { key, value, comment };
    } else {
      return void 0;
    }
  };
}
function createAssertPresentHandler(propertyName, configFileDescriptor) {
  return (value) => {
    if (void 0 === value) {
      if (configFileDescriptor && "currentKey" in configFileDescriptor) {
        throw new ValidationError(`Config property ${configFileDescriptor.currentKey} is missing`);
      } else {
        throw new ValidationError(`The ${propertyName} is missing`);
      }
    }
    return value;
  };
}
function createCommandLineParser(commandLineDescriptor, parse) {
  return (options) => {
    for (let index = options.length - 1; 0 <= index; index--) {
      const option = options[index];
      if (option.key === commandLineDescriptor?.option) {
        if (DEFAULT_ENUM === option.value) {
          return DEFAULT_ENUM;
        } else {
          const value = parse(option.value, `command line option ${option.key}`);
          if (value && "object" === typeof value && "error" in value) {
            fail(value.error);
          } else {
            return value;
          }
        }
      }
    }
    return void 0;
  };
}

// src/config/command-line-options.ts
var COMMAND_LINE_OPTIONS = {
  //
  //------------------------------------------------------------------------------------------------------------------
  //
  //   ########  ######## ########  ######## ##    ## ########  ######## ##    ##  ######  #### ########  ######
  //   ##     ## ##       ##     ## ##       ###   ## ##     ## ##       ###   ## ##    ##  ##  ##       ##    ##
  //   ##     ## ##       ##     ## ##       ####  ## ##     ## ##       ####  ## ##        ##  ##       ##
  //   ##     ## ######   ########  ######   ## ## ## ##     ## ######   ## ## ## ##        ##  ######    ######
  //   ##     ## ##       ##        ##       ##  #### ##     ## ##       ##  #### ##        ##  ##             ##
  //   ##     ## ##       ##        ##       ##   ### ##     ## ##       ##   ### ##    ##  ##  ##       ##    ##
  //   ########  ######## ##        ######## ##    ## ########  ######## ##    ##  ######  #### ########  ######
  //
  //------------------------------------------------------------------------------------------------------------------
  installDevDependencies: createBooleanProperty({
    name: "install development tools toggle",
    commandLine: {
      option: "--install-dev-dependencies",
      placeholder: "[true | false]",
      description: "Install development tools (compiler, bundler, formatter, ...) locally"
    }
  }),
  dependencies: createStringArrayProperty({
    name: "auto-selected NPM packages",
    commandLine: {
      option: "--auto-selected-dependencies",
      placeholder: "<dep1>, <dep2>, ...",
      description: "NPM packages to install without without prompting"
    },
    parseOldValue: parseStringArray,
    parseNewValue: parseStringArray
  }),
  preselectedDependencies: createStringArrayProperty({
    name: "pre-selected NPM packages",
    commandLine: {
      option: "--preselected-dependencies",
      placeholder: "<dep1>, <dep2>, ...",
      description: "Pre-selected NPM packages offered for installation"
    },
    parseOldValue: parseStringArray,
    parseNewValue: parseStringArray
  }),
  optionalDependencies: createStringArrayProperty({
    name: "optional NPM packages",
    commandLine: {
      option: "--optional-dependencies",
      placeholder: "<dep1>, <dep2>, ...",
      description: "Optional (non-pre-selected) NPM packages offered for installation"
    },
    parseOldValue: parseStringArray,
    parseNewValue: parseStringArray
  }),
  //------------------------------------------------------------------------------------------------------------------
  //
  //   ########  ##     ## ##    ## ######## #### ##     ## ########
  //   ##     ## ##     ## ###   ##    ##     ##  ###   ### ##
  //   ##     ## ##     ## ####  ##    ##     ##  #### #### ##
  //   ########  ##     ## ## ## ##    ##     ##  ## ### ## ######
  //   ##   ##   ##     ## ##  ####    ##     ##  ##     ## ##
  //   ##    ##  ##     ## ##   ###    ##     ##  ##     ## ##
  //   ##     ##  #######  ##    ##    ##    #### ##     ## ########
  //
  //------------------------------------------------------------------------------------------------------------------
  runtimeCli: createNonPinnableEnumProperty({
    name: "runtime environment",
    commandLine: {
      option: "--runtime",
      description: "Runtime environment",
      placeholder: "[cli | node | web]"
    },
    currentValues: [
      ["cli", defaultMightChange("node")],
      ["node", "command line"],
      ["web", "web browser"]
    ],
    obsoleteValues: []
  }),
  //------------------------------------------------------------------------------------------------------------------
  //
  //   ######## ######## ##     ## ########  ##          ###    ######## ########
  //      ##    ##       ###   ### ##     ## ##         ## ##      ##    ##
  //      ##    ##       #### #### ##     ## ##        ##   ##     ##    ##
  //      ##    ######   ## ### ## ########  ##       ##     ##    ##    ######
  //      ##    ##       ##     ## ##        ##       #########    ##    ##
  //      ##    ##       ##     ## ##        ##       ##     ##    ##    ##
  //      ##    ######## ##     ## ##        ######## ##     ##    ##    ########
  //
  //------------------------------------------------------------------------------------------------------------------
  createProjectTemplate: createBooleanProperty({
    name: "project template toggle",
    commandLine: {
      option: "--create-project-template",
      placeholder: "[true | false]",
      description: "Create a basic project template (main module, Makefile, ...)"
    }
  }),
  createDebugModule: createBooleanProperty({
    name: "debug module toggle",
    commandLine: {
      option: "--create-debug-module",
      placeholder: "[true | false]",
      description: "Create a debug.ts file"
    }
  }),
  createMakefile: createBooleanProperty({
    name: "Makefile toggle",
    commandLine: {
      option: "--create-makefile",
      placeholder: "[true | false]",
      description: "Create a template Makefile"
    }
  })
};

// src/config/config-properties.ts
var CURRENT_CONFIG_PROPERTIES = {
  //
  //------------------------------------------------------------------------------------------------------------------
  //
  //      ###    ########  ######## #### ########    ###     ######  ########
  //     ## ##   ##     ##    ##     ##  ##         ## ##   ##    ##    ##
  //    ##   ##  ##     ##    ##     ##  ##        ##   ##  ##          ##
  //   ##     ## ########     ##     ##  ######   ##     ## ##          ##
  //   ######### ##   ##      ##     ##  ##       ######### ##          ##
  //   ##     ## ##    ##     ##     ##  ##       ##     ## ##    ##    ##
  //   ##     ## ##     ##    ##    #### ##       ##     ##  ######     ##
  //
  //------------------------------------------------------------------------------------------------------------------
  artifact: createNonPinnableEnumProperty({
    name: "artifact",
    configFile: {
      currentKey: "LP_CFG_ARTIFACT",
      newConfigObjectName: "artifact"
    },
    commandLine: {
      option: "--artifact",
      description: "Project type",
      placeholder: "[app | lib]"
    },
    currentValues: [
      ["app", "a stand-alone application"],
      ["lib", "a library with typings"]
    ],
    obsoleteValues: []
  }),
  //------------------------------------------------------------------------------------------------------------------
  //
  //   ########  ##     ## ##    ## ########  ##       ######## ########
  //   ##     ## ##     ## ###   ## ##     ## ##       ##       ##     ##
  //   ##     ## ##     ## ####  ## ##     ## ##       ##       ##     ##
  //   ########  ##     ## ## ## ## ##     ## ##       ######   ########
  //   ##     ## ##     ## ##  #### ##     ## ##       ##       ##   ##
  //   ##     ## ##     ## ##   ### ##     ## ##       ##       ##    ##
  //   ########   #######  ##    ## ########  ######## ######## ##     ##
  //
  //------------------------------------------------------------------------------------------------------------------
  bundler: createPinnableEnumProperty({
    name: "bundler",
    configFile: {
      currentKey: "LP_CFG_BUNDLER",
      newConfigObjectName: "bundler"
    },
    commandLine: {
      option: "--bundler",
      description: "Bundler"
    },
    currentValues: [
      ["esbuild", void 0],
      ["disabled", "don't use bundling"]
    ],
    obsoleteValues: []
  }),
  //------------------------------------------------------------------------------------------------------------------
  //
  // ########  ##     ## ##    ## ########  ##       ######## ########          ########  #### ########
  // ##     ## ##     ## ###   ## ##     ## ##       ##       ##     ##         ##     ##  ##  ##     ##
  // ##     ## ##     ## ####  ## ##     ## ##       ##       ##     ##         ##     ##  ##  ##     ##
  // ########  ##     ## ## ## ## ##     ## ##       ######   ########          ##     ##  ##  ########
  // ##     ## ##     ## ##  #### ##     ## ##       ##       ##   ##           ##     ##  ##  ##   ##
  // ##     ## ##     ## ##   ### ##     ## ##       ##       ##    ##          ##     ##  ##  ##    ##
  // ########   #######  ##    ## ########  ######## ######## ##     ##         ########  #### ##     ##
  //
  //------------------------------------------------------------------------------------------------------------------
  bundlerOutDir: createStringProperty({
    name: "bundler output directory",
    configFile: {
      currentKey: "LP_CFG_BUNDLER_OUT_DIR",
      newConfigObjectName: "bundlerOutDir",
      comment: "only applicable if bundling is enabled"
    },
    commandLine: {
      option: "--bundler-out-dir",
      placeholder: "<DIR>",
      description: "Bundler output directory"
    },
    parseOldValue: createDirectoryParser("bundler output directory", "optional"),
    parseNewValue: createDirectoryParser("bundler output directory", "optional")
  }),
  //------------------------------------------------------------------------------------------------------------------
  //
  //   ########  ########  ######         ########  ##     ## ##    ## ########  ##       ######## ########
  //   ##     ##    ##    ##    ##        ##     ## ##     ## ###   ## ##     ## ##       ##       ##     ##
  //   ##     ##    ##    ##              ##     ## ##     ## ####  ## ##     ## ##       ##       ##     ##
  //   ##     ##    ##     ######         ########  ##     ## ## ## ## ##     ## ##       ######   ########
  //   ##     ##    ##          ##        ##     ## ##     ## ##  #### ##     ## ##       ##       ##   ##
  //   ##     ##    ##    ##    ##        ##     ## ##     ## ##   ### ##     ## ##       ##       ##    ##
  //   ########     ##     ######         ########   #######  ##    ## ########  ######## ######## ##     ##
  //
  //------------------------------------------------------------------------------------------------------------------
  dtsBundler: createPinnableEnumProperty({
    name: "d.ts bundler",
    configFile: {
      currentKey: "LP_CFG_DTS_BUNDLER",
      newConfigObjectName: "dtsBundler"
    },
    commandLine: {
      option: "--dts-bundler",
      description: "Bundler for declaration files (d.ts)"
    },
    currentValues: [
      ["dts-bundle-generator", void 0],
      ["disabled", "don't bundle declaration files"]
    ],
    obsoleteValues: []
  }),
  //------------------------------------------------------------------------------------------------------------------
  //
  //   ########  #######   ########   ##     ##     ###   ######## ######## ######## ########
  //   ##       ##     ##  ##     ##  ###   ###    ## ##     ##       ##    ##       ##     ##
  //   ##       ##     ##  ##     ##  #### ####   ##   ##    ##       ##    ##       ##     ##
  //   ######   ##     ##  ########   ## ### ##  ##     ##   ##       ##    ######   ########
  //   ##       ##     ##  ##   ##    ##     ##  #########   ##       ##    ##       ##   ##
  //   ##       ##     ##  ##    ##   ##     ##  ##     ##   ##       ##    ##       ##    ##
  //   ##        #######   ##     ##  ##     ##  ##     ##   ##       ##    ######## ##     ##
  //
  //------------------------------------------------------------------------------------------------------------------
  formatter: createPinnableEnumProperty({
    name: "formatter",
    configFile: {
      currentKey: "LP_CFG_FORMATTER",
      newConfigObjectName: "formatter"
    },
    commandLine: {
      option: "--formatter",
      description: "Code formatter"
    },
    currentValues: [
      ["prettier", void 0],
      ["biome", void 0],
      ["disabled", "don't format sources"]
    ],
    obsoleteValues: []
  }),
  //------------------------------------------------------------------------------------------------------------------
  //
  //   #### ##    ##  ######  ########    ###    ##       ##            ##     ##  #######  ########  ########
  //    ##  ###   ## ##    ##    ##      ## ##   ##       ##            ###   ### ##     ## ##     ## ##
  //    ##  ####  ## ##          ##     ##   ##  ##       ##            #### #### ##     ## ##     ## ##
  //    ##  ## ## ##  ######     ##    ##     ## ##       ##            ## ### ## ##     ## ##     ## ######
  //    ##  ##  ####       ##    ##    ######### ##       ##            ##     ## ##     ## ##     ## ##
  //    ##  ##   ### ##    ##    ##    ##     ## ##       ##            ##     ## ##     ## ##     ## ##
  //   #### ##    ##  ######     ##    ##     ## ######## ########      ##     ##  #######  ########  ########
  //
  //------------------------------------------------------------------------------------------------------------------
  installationMode: createNonPinnableEnumProperty({
    name: "launchpad installation mode",
    configFile: {
      currentKey: "LP_CFG_INSTALLATION_MODE",
      newConfigObjectName: "installationMode"
    },
    commandLine: {
      option: "--installation-mode",
      description: "Location of the the launchpad npm package",
      placeholder: "[local | global | temp | npx | pnpm-dlx | yarn-dlx]"
    },
    currentValues: [
      ["local", "install locally within the project"],
      ["global", "use a globally installed version (needs to be kept up-to-date manually)"],
      ["temp", "temporary installation via this project's package manager"],
      ["npx", "temporary installation via npx"],
      ["pnpm-dlx", "temporary installation via pnpm dlx"],
      ["yarn-dlx", "temporary installation via yarn dlx"]
    ],
    obsoleteValues: []
  }),
  //------------------------------------------------------------------------------------------------------------------
  //
  //   ##     ##  #######  ########  ##     ## ##       ########        ######  ##    ##  ######
  //   ###   ### ##     ## ##     ## ##     ## ##       ##             ##    ##  ##  ##  ##    ##
  //   #### #### ##     ## ##     ## ##     ## ##       ##             ##         ####   ##
  //   ## ### ## ##     ## ##     ## ##     ## ##       ######          ######     ##     ######
  //   ##     ## ##     ## ##     ## ##     ## ##       ##                   ##    ##          ##
  //   ##     ## ##     ## ##     ## ##     ## ##       ##             ##    ##    ##    ##    ##
  //   ##     ##  #######  ########   #######  ######## ########        ######     ##     ######
  //
  //------------------------------------------------------------------------------------------------------------------
  moduleSystem: createNonPinnableEnumProperty({
    name: "module system",
    configFile: {
      currentKey: "LP_CFG_MODULE_SYSTEM",
      newConfigObjectName: "moduleSystem"
    },
    commandLine: {
      option: "--module-system",
      description: "Target module system"
    },
    currentValues: [
      ["cjs", "CommonJS"],
      ["esm", "ECMAScript modules"]
    ],
    obsoleteValues: []
  }),
  //------------------------------------------------------------------------------------------------------------------
  //
  //   ########     ###     ######  ##    ##    ###     ######   ########       ##     ##  ######   ########
  //   ##     ##   ## ##   ##    ## ##   ##    ## ##   ##    ##  ##             ###   ### ##    ##  ##     ##
  //   ##     ##  ##   ##  ##       ##  ##    ##   ##  ##        ##             #### #### ##        ##     ##
  //   ########  ##     ## ##       #####    ##     ## ##   #### ######         ## ### ## ##   #### ########
  //   ##        ######### ##       ##  ##   ######### ##    ##  ##             ##     ## ##    ##  ##   ##
  //   ##        ##     ## ##    ## ##   ##  ##     ## ##    ##  ##             ##     ## ##    ##  ##    ##
  //   ##        ##     ##  ######  ##    ## ##     ##  ######   ########       ##     ##  ######   ##     ##
  //
  //------------------------------------------------------------------------------------------------------------------
  packageManager: createPinnableEnumProperty({
    name: "package manager",
    configFile: {
      currentKey: "LP_CFG_PACKAGE_MANAGER",
      newConfigObjectName: "packageManager"
    },
    commandLine: {
      option: "--package-manager",
      description: "Package manager"
    },
    currentValues: [
      ["npm", void 0],
      ["pnpm", "use globally pre-installed pnpm"],
      ["yarn", "localyl installed Yarn without Plug'n'Play (requires a globally pre-installed Yarn Classic)"]
    ],
    obsoleteValues: []
  }),
  //------------------------------------------------------------------------------------------------------------------
  //
  //   ########  ########   #######        ## ########  ######  ########    ##    ##    ###    ##     ## ########
  //   ##     ## ##     ## ##     ##       ## ##       ##    ##    ##       ###   ##   ## ##   ###   ### ##
  //   ##     ## ##     ## ##     ##       ## ##       ##          ##       ####  ##  ##   ##  #### #### ##
  //   ########  ########  ##     ##       ## ######   ##          ##       ## ## ## ##     ## ## ### ## ######
  //   ##        ##   ##   ##     ## ##    ## ##       ##          ##       ##  #### ######### ##     ## ##
  //   ##        ##    ##  ##     ## ##    ## ##       ##    ##    ##       ##   ### ##     ## ##     ## ##
  //   ##        ##     ##  #######   ######  ########  ######     ##       ##    ## ##     ## ##     ## ########
  //
  //------------------------------------------------------------------------------------------------------------------
  projectName: createStringProperty({
    name: "project name",
    configFile: {
      currentKey: "LP_CFG_PROJECT_NAME",
      newConfigObjectName: "projectName",
      comment: "the main module's file name"
    },
    commandLine: {
      option: "--project-name",
      placeholder: "<NAME>",
      description: "Name of the main module/project"
    },
    parseOldValue: parseProjectName,
    parseNewValue: parseProjectName
  }),
  //------------------------------------------------------------------------------------------------------------------
  //
  //   ########  ##     ## ##    ## ######## #### ##     ## ########
  //   ##     ## ##     ## ###   ##    ##     ##  ###   ### ##
  //   ##     ## ##     ## ####  ##    ##     ##  #### #### ##
  //   ########  ##     ## ## ## ##    ##     ##  ## ### ## ######
  //   ##   ##   ##     ## ##  ####    ##     ##  ##     ## ##
  //   ##    ##  ##     ## ##   ###    ##     ##  ##     ## ##
  //   ##     ##  #######  ##    ##    ##    #### ##     ## ########
  //
  //------------------------------------------------------------------------------------------------------------------
  runtime: createPinnableEnumProperty({
    name: "runtime environment",
    configFile: {
      currentKey: "LP_CFG_RUNTIME",
      newConfigObjectName: "runtime"
    },
    currentValues: [
      ["node", "command line"],
      ["web", "web browser"]
    ],
    obsoleteValues: []
  }),
  //------------------------------------------------------------------------------------------------------------------
  //
  //    ######   #######  ##     ## ########   ######  ########        ########  #### ########
  //   ##    ## ##     ## ##     ## ##     ## ##    ## ##              ##     ##  ##  ##     ##
  //   ##       ##     ## ##     ## ##     ## ##       ##              ##     ##  ##  ##     ##
  //    ######  ##     ## ##     ## ########  ##       ######          ##     ##  ##  ########
  //         ## ##     ## ##     ## ##   ##   ##       ##              ##     ##  ##  ##   ##
  //   ##    ## ##     ## ##     ## ##    ##  ##    ## ##              ##     ##  ##  ##    ##
  //    ######   #######   #######  ##     ##  ######  ########        ########  #### ##     ##
  //
  //------------------------------------------------------------------------------------------------------------------
  srcDir: createStringProperty({
    name: "source directory",
    configFile: {
      currentKey: "LP_CFG_SRC_DIR",
      newConfigObjectName: "srcDir"
    },
    commandLine: {
      option: "--src-dir",
      placeholder: "<DIR>",
      description: "Relative path to the source directory"
    },
    parseOldValue: createDirectoryParser("source directory", "mandatory"),
    parseNewValue: createDirectoryParser("source directory", "mandatory")
  }),
  //------------------------------------------------------------------------------------------------------------------
  //
  //   ########    ###    ########        ######  #### ######## ########
  //      ##      ## ##   ##     ##      ##    ##  ##       ##  ##
  //      ##     ##   ##  ##     ##      ##        ##      ##   ##
  //      ##    ##     ## ########        ######   ##     ##    ######
  //      ##    ######### ##     ##            ##  ##    ##     ##
  //      ##    ##     ## ##     ##      ##    ##  ##   ##      ##
  //      ##    ##     ## ########        ######  #### ######## ########
  //
  //------------------------------------------------------------------------------------------------------------------
  tabSize: createIntegerProperty({
    name: "tab size",
    configFile: {
      currentKey: "LP_CFG_TAB_SIZE",
      newConfigObjectName: "tabSize",
      comment: "only applicable if code formatting is enabled"
    },
    commandLine: {
      option: "--tab-size",
      placeholder: "<SIZE>",
      description: "Tab size (for code formatting)"
    },
    range: { min: 2, max: 20 }
  }),
  //------------------------------------------------------------------------------------------------------------------
  //
  //   ########  ######   ######          #######  ##     ## ########        ########  #### ########
  //      ##    ##    ## ##    ##        ##     ## ##     ##    ##           ##     ##  ##  ##     ##
  //      ##    ##       ##              ##     ## ##     ##    ##           ##     ##  ##  ##     ##
  //      ##     ######  ##              ##     ## ##     ##    ##           ##     ##  ##  ########
  //      ##          ## ##              ##     ## ##     ##    ##           ##     ##  ##  ##   ##
  //      ##    ##    ## ##    ##        ##     ## ##     ##    ##           ##     ##  ##  ##    ##
  //      ##     ######   ######          #######   #######     ##           ########  #### ##     ##
  //
  //------------------------------------------------------------------------------------------------------------------
  tscOutDir: createStringProperty({
    name: "TypeScript output directory",
    configFile: {
      currentKey: "LP_CFG_TSC_OUT_DIR",
      newConfigObjectName: "tscOutDir",
      comment: "directory for compiled JavaScript files"
    },
    commandLine: {
      option: "--tsc-out-dir",
      placeholder: "<DIR>",
      description: "TypeScript compiler output directory"
    },
    parseOldValue: createDirectoryParser("TypeScript output directory", "optional"),
    parseNewValue: createDirectoryParser("TypeScript output directory", "optional")
  }),
  //------------------------------------------------------------------------------------------------------------------
  //
  //   ##     ## ########  ##       #### ######## ########       ########  ######## ########   ######
  //   ##     ## ##     ## ##        ##  ##          ##          ##     ## ##       ##     ## ##    ##
  //   ##     ## ##     ## ##        ##  ##          ##          ##     ## ##       ##     ## ##
  //   ##     ## ########  ##        ##  ######      ##          ##     ## ######   ########   ######
  //   ##     ## ##        ##        ##  ##          ##          ##     ## ##       ##              ##
  //   ##     ## ##        ##        ##  ##          ##          ##     ## ##       ##        ##    ##
  //    #######  ##        ######## #### ##          ##          ########  ######## ##         ######
  //
  //------------------------------------------------------------------------------------------------------------------
  upliftDependencies: createBooleanProperty({
    name: "upgrade all npm packages during uplifts",
    configFile: {
      currentKey: "LP_CFG_UPLIFT_DEPENDENCIES",
      newConfigObjectName: "upliftDependencies",
      comment: "upgrade all npm packages during uplifts"
    },
    commandLine: {
      option: "--uplift-dependencies",
      placeholder: "[true | false]",
      description: "Upgrade all npm packages during uplifts"
    }
  }),
  //------------------------------------------------------------------------------------------------------------------
  //
  //    ##     ## ######## ########   ######  ####  #######  ##    ##          ##    ##  #######
  //    ##     ## ##       ##     ## ##    ##  ##  ##     ## ###   ##          ###   ## ##     ##
  //    ##     ## ##       ##     ## ##        ##  ##     ## ####  ##          ####  ## ##     ##
  //    ##     ## ######   ########   ######   ##  ##     ## ## ## ##          ## ## ## ##     ##
  //     ##   ##  ##       ##   ##         ##  ##  ##     ## ##  ####          ##  #### ##     ##
  //      ## ##   ##       ##    ##  ##    ##  ##  ##     ## ##   ###          ##   ### ##     ##
  //       ###    ######## ##     ##  ######  ####  #######  ##    ##          ##    ##  #######
  //
  //------------------------------------------------------------------------------------------------------------------
  version: createVersionProperty({
    name: "version number",
    configFile: {
      currentKey: "LP_CFG_VERSION",
      newConfigObjectName: "version"
    }
  }),
  //------------------------------------------------------------------------------------------------------------------
  //
  //   ##     ##  ######   ######   #######  ########  ########        ######  ########  ######
  //   ##     ## ##    ## ##    ## ##     ## ##     ## ##             ##    ## ##       ##    ##
  //   ##     ## ##       ##       ##     ## ##     ## ##             ##       ##       ##
  //   ##     ##  ######  ##       ##     ## ##     ## ######         ##       ######   ##   ####
  //    ##   ##        ## ##       ##     ## ##     ## ##             ##       ##       ##    ##
  //     ## ##   ##    ## ##    ## ##     ## ##     ## ##             ##    ## ##       ##    ##
  //      ###     ######   ######   #######  ########  ########        ######  ##        ######
  //
  //------------------------------------------------------------------------------------------------------------------
  vsCodeSettings: createEnumSetProperty({
    name: "Manage selected VSCode settings",
    commandLine: {
      option: "--vscode-settings",
      description: "Create settings for VSCode"
    },
    configFile: {
      currentKey: "LP_CFG_VSCODE_SETTINGS",
      newConfigObjectName: "vsCodeSettings"
    },
    currentValues: [
      ["formatter", "use the project's formatter (if it has any)"],
      ["format-on-save", "enabled auto-format"],
      ["future-settings", "manage settings that might be added to launchpad in the future"]
    ],
    obsoleteValues: []
  }),
  //------------------------------------------------------------------------------------------------------------------
  //
  //   ##      ## ######## ########            ###    ########  ########         ########  #### ########
  //   ##  ##  ## ##       ##     ##          ## ##   ##     ## ##     ##        ##     ##  ##  ##     ##
  //   ##  ##  ## ##       ##     ##         ##   ##  ##     ## ##     ##        ##     ##  ##  ##     ##
  //   ##  ##  ## ######   ########         ##     ## ########  ########         ##     ##  ##  ########
  //   ##  ##  ## ##       ##     ##        ######### ##        ##               ##     ##  ##  ##   ##
  //   ##  ##  ## ##       ##     ##        ##     ## ##        ##               ##     ##  ##  ##    ##
  //    ###  ###  ######## ########         ##     ## ##        ##               ########  #### ##     ##
  //
  //------------------------------------------------------------------------------------------------------------------
  webAppDir: createStringProperty({
    name: "web app directory",
    configFile: {
      currentKey: "LP_CFG_WEB_APP_DIR",
      newConfigObjectName: "webAppDir",
      comment: "only applicable for web applications"
    },
    commandLine: {
      option: "--web-app-dir",
      placeholder: "<DIR>",
      description: "Relative path to the web application (with the index.html)"
    },
    parseOldValue: createDirectoryParser("web app directory", "optional"),
    parseNewValue: createDirectoryParser("web app directory", "mandatory")
  })
};
var OBSOLETE_CONFIG_PROPERTIES = {};
var ALL_CONFIG_PROPERTIES = {
  ...CURRENT_CONFIG_PROPERTIES,
  ...OBSOLETE_CONFIG_PROPERTIES,
  ...COMMAND_LINE_OPTIONS
};
var CURRENT_AND_OBSOLETE_CONFIG_PROPERTIES = { ...CURRENT_CONFIG_PROPERTIES, ...OBSOLETE_CONFIG_PROPERTIES };
var CURRENT_AND_INIT_ONLY_CONFIG_PROPERTIES = {
  ...CURRENT_CONFIG_PROPERTIES,
  ...COMMAND_LINE_OPTIONS
};
var toArray = (properties) => Object.keys(properties).map((key) => properties[key]);
var ConfigProperties = {
  ...ALL_CONFIG_PROPERTIES,
  all: ALL_CONFIG_PROPERTIES,
  current: CURRENT_CONFIG_PROPERTIES,
  currentAndInitOnly: CURRENT_AND_INIT_ONLY_CONFIG_PROPERTIES,
  currentAndObsolete: CURRENT_AND_OBSOLETE_CONFIG_PROPERTIES,
  initOnly: COMMAND_LINE_OPTIONS,
  obsolete: OBSOLETE_CONFIG_PROPERTIES,
  arrays: {
    all: toArray(ALL_CONFIG_PROPERTIES),
    current: toArray(CURRENT_CONFIG_PROPERTIES),
    currentAndInitOnly: toArray(CURRENT_AND_INIT_ONLY_CONFIG_PROPERTIES),
    currentAndObsolete: toArray(CURRENT_AND_OBSOLETE_CONFIG_PROPERTIES),
    initOnly: toArray(COMMAND_LINE_OPTIONS),
    obsolete: toArray(OBSOLETE_CONFIG_PROPERTIES)
  }
};

// src/config/config-objects.ts
function assembleConfig(properties, addError) {
  return {
    artifact: ConfigProperties.artifact.parseOldValue(properties, addError),
    bundler: ConfigProperties.bundler.parseOldValue(properties, addError),
    bundlerOutDir: ConfigProperties.bundlerOutDir.parseOldValue(properties, addError),
    dtsBundler: ConfigProperties.dtsBundler.parseOldValue(properties, addError),
    formatter: ConfigProperties.formatter.parseOldValue(properties, addError),
    installationMode: ConfigProperties.installationMode.parseOldValue(properties, addError),
    moduleSystem: ConfigProperties.moduleSystem.parseOldValue(properties, addError),
    packageManager: ConfigProperties.packageManager.parseOldValue(properties, addError),
    projectName: ConfigProperties.projectName.parseOldValue(properties, addError),
    runtime: ConfigProperties.runtime.parseOldValue(properties, addError),
    srcDir: ConfigProperties.srcDir.parseOldValue(properties, addError),
    tabSize: ConfigProperties.tabSize.parseOldValue(properties, addError),
    tscOutDir: ConfigProperties.tscOutDir.parseOldValue(properties, addError),
    upliftDependencies: ConfigProperties.upliftDependencies.parseOldValue(properties, addError),
    version: ConfigProperties.version.parseOldValue(properties, addError),
    vsCodeSettings: ConfigProperties.vsCodeSettings.parseOldValue(properties, addError),
    webAppDir: ConfigProperties.webAppDir.parseOldValue(properties, addError)
  };
}
function validateConfig(config, addError) {
  try {
    return {
      artifact: ConfigProperties.artifact.assertOldValuePresent(config.artifact),
      bundler: ConfigProperties.bundler.assertOldValuePresent(config.bundler),
      bundlerOutDir: ConfigProperties.bundlerOutDir.assertOldValuePresent(config.tscOutDir),
      dtsBundler: ConfigProperties.dtsBundler.assertOldValuePresent(config.dtsBundler),
      formatter: ConfigProperties.formatter.assertOldValuePresent(config.formatter),
      installationMode: ConfigProperties.installationMode.assertOldValuePresent(config.installationMode),
      moduleSystem: ConfigProperties.moduleSystem.assertOldValuePresent(config.moduleSystem),
      packageManager: ConfigProperties.packageManager.assertOldValuePresent(config.packageManager),
      projectName: ConfigProperties.projectName.assertOldValuePresent(config.projectName),
      runtime: ConfigProperties.runtime.assertOldValuePresent(config.runtime),
      srcDir: ConfigProperties.srcDir.assertOldValuePresent(config.srcDir),
      tabSize: ConfigProperties.tabSize.assertOldValuePresent(config.tabSize),
      tscOutDir: ConfigProperties.tscOutDir.assertOldValuePresent(config.tscOutDir),
      upliftDependencies: ConfigProperties.upliftDependencies.assertOldValuePresent(config.upliftDependencies),
      version: ConfigProperties.version.assertOldValuePresent(config.version),
      vsCodeSettings: ConfigProperties.vsCodeSettings.assertOldValuePresent(config.vsCodeSettings),
      webAppDir: ConfigProperties.webAppDir.assertOldValuePresent(config.webAppDir)
    };
  } catch (error2) {
    if (error2 instanceof ValidationError) {
      addError(error2.message);
    } else {
      throw error2;
    }
    return void 0;
  }
}
function assembleConfigFromCommandLineOptions(properties) {
  return {
    artifact: ConfigProperties.artifact.parseFromCommandLine(properties),
    bundler: ConfigProperties.bundler.parseFromCommandLine(properties),
    bundlerOutDir: ConfigProperties.bundlerOutDir.parseFromCommandLine(properties),
    createDebugModule: ConfigProperties.createDebugModule.parseFromCommandLine(properties),
    createMakefile: ConfigProperties.createMakefile.parseFromCommandLine(properties),
    createProjectTemplate: ConfigProperties.createProjectTemplate.parseFromCommandLine(properties),
    dependencies: ConfigProperties.dependencies.parseFromCommandLine(properties),
    dtsBundler: ConfigProperties.dtsBundler.parseFromCommandLine(properties),
    formatter: ConfigProperties.formatter.parseFromCommandLine(properties),
    installationMode: ConfigProperties.installationMode.parseFromCommandLine(properties),
    installDevDependencies: ConfigProperties.installDevDependencies.parseFromCommandLine(properties),
    moduleSystem: ConfigProperties.moduleSystem.parseFromCommandLine(properties),
    optionalDependencies: ConfigProperties.optionalDependencies.parseFromCommandLine(properties),
    packageManager: ConfigProperties.packageManager.parseFromCommandLine(properties),
    preselectedDependencies: ConfigProperties.preselectedDependencies.parseFromCommandLine(properties),
    projectName: ConfigProperties.projectName.parseFromCommandLine(properties),
    runtimeCli: ConfigProperties.runtimeCli.parseFromCommandLine(properties),
    srcDir: ConfigProperties.srcDir.parseFromCommandLine(properties),
    tabSize: ConfigProperties.tabSize.parseFromCommandLine(properties),
    tscOutDir: ConfigProperties.tscOutDir.parseFromCommandLine(properties),
    upliftDependencies: ConfigProperties.upliftDependencies.parseFromCommandLine(properties),
    vsCodeSettings: ConfigProperties.vsCodeSettings.parseFromCommandLine(properties),
    webAppDir: ConfigProperties.webAppDir.parseFromCommandLine(properties)
  };
}

// src/config/command-line-parser.ts
function parseCommandLineOptions(parameters) {
  return assembleConfigFromCommandLineOptions(parameters.map((parameter) => decomposeCommandLineParameter(parameter)));
}
function decomposeCommandLineParameter(argument) {
  const index = Math.max(0, argument.indexOf("="));
  const key = argument.substring(0, index).trim();
  const value = argument.substring(index + 1).trim();
  if (!key) {
    fail(`Invalid command line option "${argument}". Try launchpad --help for more information.`);
  } else if (!ConfigProperties.arrays.currentAndInitOnly.some((property) => property.commandLineInfo?.option === key)) {
    fail(`Invalid command line option "${key}". Try launchpad --help for more information.`);
  } else {
    return { key, value };
  }
}

// src/config/config-loader.ts
function loadConfigFile(configFile) {
  if (configFile.existsAndIsFile()) {
    const properties = new Array();
    const addProperty = createAddPropertyHandler(properties);
    const errors = new Array();
    configFile.loadFileContents().split(/\r?\n/).map((line) => ({ line })).map((item, index) => ({ ...item, ...createErrorHandlers(index, errors) })).forEach((item) => processLine(item.line, item.formatError, item.addError, addProperty));
    return parseConfig(configFile, properties, errors);
  } else {
    return void 0;
  }
}
function createErrorHandlers(index, errors) {
  const formatError2 = createFormatErrorHandler(index);
  const addError = createAddErrorHandler(formatError2, errors);
  return { formatError: formatError2, addError };
}
function createFormatErrorHandler(index) {
  return (message) => `Line ${index + 1}: ${message}`;
}
function createAddErrorHandler(format, errors) {
  return (message) => {
    errors.push(format(message));
  };
}
function createAddPropertyHandler(properties) {
  return (key, value, formatError2) => {
    properties.push({ key, value, formatError: formatError2 });
  };
}
function processLine(line, formatError2, addError, addProperty) {
  const trimmed = line.replace(/#.*/, "").trim();
  if (trimmed) {
    const pair = splitLine(trimmed, addError);
    if (pair) {
      addProperty(pair.key, pair.value, formatError2);
    }
  }
}
function splitLine(line, addError) {
  const index = line.indexOf("=");
  if (0 < index) {
    const key = line.substring(0, index).trim();
    return { key, value: line.substring(index + 1).trim() };
  } else {
    addError("The line is not in key=value format");
    return void 0;
  }
}
function parseConfig(configFilePath, properties, errors) {
  const addError = (message) => errors.push(message);
  validatePropertyKeys(properties, addError);
  const partial = assembleConfig(properties, addError);
  const validated = errors.length ? void 0 : validateConfig(partial, addError);
  const configFile = configFilePath.path.replace(/.*\/\.launchpad\//, ".launchpad/");
  return { configFile, partial, validated, errors: errors.length ? errors : void 0 };
}
function validatePropertyKeys(properties, addError) {
  for (const configFileProperty of properties) {
    const key = configFileProperty.key;
    if (!ConfigProperties.arrays.currentAndObsolete.some((property) => property.matchesConfigFileKey(key))) {
      addError(configFileProperty.formatError(`Unknown config property "${configFileProperty.key}"`));
    }
  }
}

// src/migration/migrate.ts
var import_fs2 = require("fs");

// src/utilities/string-utilities.ts
function adjustTabSize(contents, originalTabSize, newTabSize) {
  const regExp = new RegExp(`^(	*) {${originalTabSize}}`, "g");
  const newIndent = " ".repeat(newTabSize);
  return contents.split("\n").map((line) => line.replace(regExp, "$1	")).map((line) => line.replace(regExp, "$1	")).map((line) => line.replace(regExp, "$1	")).map((line) => line.replace(regExp, "$1	")).map((line) => line.replace(regExp, "$1	")).map((line) => line.replace(regExp, "$1	")).map((line) => line.replace(regExp, "$1	")).map((line) => line.replace(regExp, "$1	")).map((line) => line.replace(regExp, "$1	")).map((line) => line.replace(regExp, "$1	")).map((line) => line.replace(regExp, "$1	")).map((line) => line.replace(regExp, "$1	")).map((line) => line.replaceAll("	", newIndent)).join("\n");
}
function breakLine(line) {
  line = line.trim();
  const isListItem = line.startsWith("- ");
  const lines = new Array();
  while (MAX_LINE_LENGTH < line.length) {
    let index = line.substring(0, MAX_LINE_LENGTH).lastIndexOf(" ");
    index = 0 < index ? index : MAX_LINE_LENGTH;
    lines.push(line.substring(0, index));
    line = line.substring(index + 1).trim();
    line = (isListItem && line ? "  " : "") + line;
  }
  if (line || !lines.length) {
    lines.push(line);
  }
  return lines;
}

// src/utilities/logging.ts
function createSeparator(title) {
  return [SEPARATOR_LINE, title, SEPARATOR_LINE, ""];
}
function breakAndLog(...message) {
  breakLine(message.join("")).forEach((line) => console.log(line));
}

// src/config/default-config-values.ts
var DEFAULT_ARTIFACT = "app";
var DEFAULT_BUILD_DIR = "build";
var DEFAULT_BUNDLER = unpinned("esbuild");
var DEFAULT_CREATE_PROJECT_TEMPLATE = true;
var DEFAULT_DEPENDENCIES_CLI = ["@types/node"];
var DEFAULT_DEPENDENCIES_WEB = [];
var DEFAULT_DIST_DIR = "dist";
var DEFAULT_DTS_BUNDLER = unpinned("dts-bundle-generator");
var DEFAULT_FORMATTER = unpinned("biome");
var DEFAULT_INSTALL_DEV_DEPENDENCIES = true;
var DEFAULT_UPLIFT_DEPENDENCIES = true;
var DEFAULT_INSTALLATION_MODE = "local";
var DEFAULT_MODULE_SYSTEM = "esm";
var DEFAULT_PACKAGE_MANAGER = unpinned("npm");
var DEFAULT_RUNTIME = "cli";
var DEFAULT_SRC_DIR = "src";
var DEFAULT_TAB_SIZE = 4;

// src/resources/version-information.ts
var VERSION_NUMBER = new Version(1, 0, 2);

// src/migration/data/file.ts
var File = class _File {
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(projectRoot, relativePath, tabSize) {
    this.relativePath = relativePath;
    this.tabSize = tabSize;
    this.absolutePath = projectRoot.child(relativePath);
    if (this.absolutePath.existsAndIsDirectory()) {
      fail(`${this.absolutePath.path} is a directory (expected it to be a file)`);
    } else if (this.absolutePath.exists()) {
      this.originalContents = _File.serialize(this.absolutePath.loadFileContents(), tabSize);
      this.newContents = this.originalContents;
    } else {
      this.originalContents = void 0;
      this.newContents = void 0;
    }
  }
  type = "file";
  absolutePath;
  originalContents;
  newContents;
  executable = false;
  //------------------------------------------------------------------------------------------------------------------
  // Getters and setters
  //------------------------------------------------------------------------------------------------------------------
  get contents() {
    return this.newContents;
  }
  set contents(contents) {
    this.newContents = void 0 === contents ? contents : _File.serialize(contents, this.tabSize);
  }
  get lines() {
    return this.newContents?.replace(/(\s*\r?\n\s*)+$/, "").split(/\r?\n/);
  }
  set lines(lines) {
    this.newContents = void 0 === lines ? lines : _File.serialize(lines, this.tabSize);
  }
  get json() {
    try {
      return void 0 === this.newContents ? void 0 : JSON.parse(this.newContents.replace(/(\n\s)+$/, ""));
    } catch (error2) {
      fail(`Failed to parse ${this.absolutePath.path}: ${error2}`);
    }
  }
  set json(json) {
    this.newContents = void 0 === json ? json : _File.serialize(json, this.tabSize);
  }
  get exists() {
    return void 0 !== this.originalContents;
  }
  delete() {
    this.contents = void 0;
  }
  makeExecutable() {
    this.executable = true;
  }
  shouldBeExecutable() {
    return this.executable;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Determine the status
  //------------------------------------------------------------------------------------------------------------------
  mustCreateOrOverwrite() {
    return void 0 !== this.newContents && this.newContents !== this.originalContents;
  }
  mustDelete() {
    return void 0 !== this.originalContents && void 0 === this.newContents;
  }
  getSummaryOfChanges() {
    if (this.mustDelete()) {
      return [`Deleted ${this.absolutePath.path}`];
    } else if (!this.mustCreateOrOverwrite()) {
      return [];
    } else if (void 0 === this.originalContents) {
      return [`Created ${this.absolutePath.path}`];
    } else {
      return [`Updated ${this.absolutePath.path}`];
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Serialize file contents into a string
  //------------------------------------------------------------------------------------------------------------------
  static serialize(contents, tabSize) {
    const normalize2 = (text) => text.replaceAll("\r", "").replace(/(\s\n)+$/, "") + "\n";
    if ("string" === typeof contents) {
      return normalize2(contents);
    } else if (Array.isArray(contents)) {
      return normalize2(contents.join("\n"));
    } else {
      return normalize2(JSON.stringify(contents, void 0, tabSize));
    }
  }
};

// src/migration/data/known-files.ts
var GITIGNORE = ".gitignore";
var LAUNCHPAD = ".launchpad";
var LAUNCHPAD_MAKEFILE_DOCUMENTATION = `${LAUNCHPAD}/Makefile.documentation`;
var LAUNCHPAD_MAKEFILE_FOOTER = `${LAUNCHPAD}/Makefile.footer`;
var LAUNCHPAD_MAKEFILE_HEADER = `${LAUNCHPAD}/Makefile.header`;
var LAUNCHPAD_CFG = `${LAUNCHPAD}/launchpad.cfg`;
var LAUNCHPAD_TSCONFIG_DEFAULT_JSON = `${LAUNCHPAD}/tsconfig.default.json`;
var PACKAGE_JSON = "package.json";
var TSBUILDINFO = ".tsbuildinfo";
var TSCONFIG_JSON = "tsconfig.json";
var VSCODE = ".vscode";
var VSCODE_SETTINGS_JSON = `${VSCODE}/settings.json`;

// src/migration/files/package-json.ts
var DEPENDENCY_KEYS = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"];
var PackageJsonOperations = class {
  //
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(file) {
    this.file = file;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Getters and setters
  //------------------------------------------------------------------------------------------------------------------
  get json() {
    return this.file.json ?? {};
  }
  set json(json) {
    this.file.json = json;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Delete properties
  //------------------------------------------------------------------------------------------------------------------
  deletePrettierConfiguration() {
    this.deleteProperty("prettier");
  }
  deleteProperty(name) {
    const json = { ...this.json };
    const temp = json;
    if (temp && "object" === typeof temp && name in temp) {
      delete temp[name];
    }
    this.json = json;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Dependencies
  //------------------------------------------------------------------------------------------------------------------
  getAllDependencies() {
    return DEPENDENCY_KEYS.map((key) => this.json[key]).flatMap((value) => Object.keys(value ?? {}));
  }
  containsDependency(name) {
    return DEPENDENCY_KEYS.map((key) => this.json[key]).some((dependencies) => name in (dependencies ?? {}));
  }
  containsTypeScriptDependency() {
    return this.containsDependency("typescript");
  }
  removeDependencyIfExists(name) {
    return !![this.json.dependencies, this.json.devDependencies].filter((dependencies) => {
      if (dependencies && name in dependencies) {
        delete dependencies[name];
        return true;
      } else {
        return false;
      }
    }).length;
  }
  addDependencyIfMissing(name, version) {
    if (this.containsDependency(name)) {
      return false;
    } else {
      this.json = { ...this.json, dependencies: { ...this.json.dependencies, [name]: version } };
      return true;
    }
  }
  addDevDependencyIfMissing(name, version) {
    if (this.containsDependency(name)) {
      return false;
    } else {
      this.json = { ...this.json, devDependencies: { ...this.json.devDependencies, [name]: version } };
      return true;
    }
  }
};

// src/migration/actions/calculate-new-config.ts
function calculateNewConfig(options, oldConfig) {
  const packageJson = new PackageJsonOperations(new File(options.projectRoot, PACKAGE_JSON, oldConfig.tabSize));
  return {
    artifact: oldConfig.artifact,
    bundler: oldConfig.bundler,
    bundlerOutDir: oldConfig.bundlerOutDir,
    createDebugModule: false,
    createMakefile: false,
    createProjectTemplate: false,
    vsCodeSettings: /* @__PURE__ */ new Set(),
    dependencies: [],
    dtsBundler: oldConfig.dtsBundler,
    formatter: oldConfig.formatter,
    installationMode: oldConfig.installationMode,
    installDevDependencies: packageJson.containsTypeScriptDependency(),
    moduleSystem: oldConfig.moduleSystem,
    packageManager: calculateNewPackageManager(oldConfig),
    projectName: oldConfig.projectName,
    runtime: oldConfig.runtime,
    srcDir: oldConfig.srcDir,
    tabSize: oldConfig.tabSize,
    tscOutDir: oldConfig.tscOutDir,
    upliftDependencies: oldConfig.upliftDependencies,
    version: VERSION_NUMBER,
    webAppDir: oldConfig.webAppDir
  };
}
function calculateNewPackageManager(oldConfig) {
  const oldPackageManager = oldConfig.packageManager;
  const defaultPackageManager = DEFAULT_PACKAGE_MANAGER;
  if (oldPackageManager.pinned || oldPackageManager.value === defaultPackageManager.value) {
    return oldPackageManager;
  } else {
    return defaultPackageManager;
  }
}

// src/utilities/object-utilities.ts
function deepClone(value) {
  return recursiveClone(value, []);
}
function recursiveClone(value, stack) {
  let clone = value;
  if (value && "object" === typeof value) {
    const parent = stack.filter((item) => item.value === value)[0];
    if (parent) {
      return parent.clone;
    }
    if (Array.isArray(value)) {
      const cloneArray = new Array();
      stack.push({ value, clone });
      value.forEach((item) => cloneArray.push(recursiveClone(item, stack)));
      clone = cloneArray;
    } else {
      const cloneObject = Object.create(Object.getPrototypeOf(value));
      if (value instanceof Error) {
        cloneObject.stack = `${value.stack}`;
        cloneObject.message = value.message;
        cloneObject.name = value.name;
      }
      stack.push({ value, clone });
      for (const key of Object.keys(value)) {
        if ("constructor" !== key) {
          cloneObject[key] = recursiveClone(value[key], stack);
        }
      }
      clone = cloneObject;
    }
    stack.pop();
  }
  return clone;
}
function deepMerge(base, overlay) {
  return recursiveMerge(deepClone(base), overlay, []);
}
function recursiveMerge(base, overlay, stack) {
  if (base && "object" === typeof base && overlay && "object" === typeof overlay && !Array.isArray(base)) {
    if (!stack.filter((item) => item.base === base && item.overlay === overlay).length) {
      for (const key of Object.keys(overlay)) {
        stack.push({ base, overlay });
        if (base && "object" === typeof base) {
          base = { ...base, [key]: recursiveMerge(base[key], overlay[key], stack) };
        }
        stack.pop();
      }
    }
    return base;
  }
  return deepClone(overlay);
}

// src/migration/formatters/formatter.ts
var Formatter = class {
  //
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(supportedLanguageIds, vsCodeFormatterId, createOrUpdateConfigurationExcludingVsCode, removeConfigurationExcludingVsCode) {
    this.supportedLanguageIds = supportedLanguageIds;
    this.vsCodeFormatterId = vsCodeFormatterId;
    this.createOrUpdateConfigurationExcludingVsCode = createOrUpdateConfigurationExcludingVsCode;
    this.removeConfigurationExcludingVsCode = removeConfigurationExcludingVsCode;
  }
};

// src/migration/formatters/biome.ts
function getDefaultBiomeConfiguration(tabSize) {
  return {
    $schema: "https://biomejs.dev/schemas/1.4.1/schema.json",
    files: {
      ignoreUnknown: true
    },
    vcs: {
      enabled: false
    },
    linter: {
      enabled: false
    },
    formatter: {
      enabled: true,
      formatWithErrors: true,
      indentStyle: "space",
      indentWidth: tabSize,
      lineEnding: "lf",
      lineWidth: 120
    },
    organizeImports: {
      enabled: false
    },
    javascript: {
      parser: {
        unsafeParameterDecoratorsEnabled: true
      },
      formatter: {
        quoteStyle: "double",
        jsxQuoteStyle: "double",
        quoteProperties: "asNeeded",
        trailingComma: "es5",
        semicolons: "always",
        arrowParentheses: "asNeeded",
        enabled: true,
        bracketSameLine: false,
        bracketSpacing: true
      }
    },
    json: {
      parser: {
        allowComments: true,
        allowTrailingCommas: false
      },
      formatter: {
        enabled: true
      }
    }
  };
}
var Biome = class extends Formatter {
  constructor() {
    super(
      ["json", "jsonc", "javascript", "javascriptreact", "typescript", "typescriptreact"],
      "biomejs.biome",
      updateBiomeConfigurationExcludingVsCode,
      removeBiomeConfigurationExcludingVsCode
    );
  }
};
function updateBiomeConfigurationExcludingVsCode(context) {
  const { tabSize } = context.newConfig;
  const configFile = context.files.get("biome.json");
  const currentConfig = JSON.parse(configFile.contents?.trim() || "{}");
  const defaultConfig = getDefaultBiomeConfiguration(tabSize);
  const json = deepMerge(defaultConfig, currentConfig);
  json.formatter = { ...json.formatter, indentWidth: tabSize };
  configFile.contents = JSON.stringify(json, void 0, tabSize);
}
function removeBiomeConfigurationExcludingVsCode(context) {
  const configFile = context.files.get("biome.json");
  if (configFile.exists) {
    const config = JSON.parse(configFile.contents?.trim() || "{}");
    if (true !== config?.linter?.enabled) {
      configFile.delete();
    }
  }
}

// src/migration/formatters/no-formatter.ts
var NoFormatter = class extends Formatter {
  constructor() {
    super(
      [],
      "",
      () => {
      },
      () => {
      }
    );
  }
};

// src/migration/formatters/prettier.ts
function getDefaultPrettierConfiguration(tabSize) {
  return {
    arrowParens: "avoid",
    bracketSameLine: false,
    bracketSpacing: true,
    embeddedLanguageFormatting: "auto",
    endOfLine: "lf",
    htmlWhitespaceSensitivity: "css",
    jsxSingleQuote: false,
    printWidth: 120,
    proseWrap: "preserve",
    quoteProps: "consistent",
    semi: true,
    singleAttributePerLine: false,
    singleQuote: false,
    tabWidth: tabSize,
    trailingComma: "es5",
    useTabs: false
  };
}
var Prettier = class extends Formatter {
  constructor() {
    super(
      [
        "css",
        "html",
        "json",
        "jsonc",
        "javascript",
        "javascriptreact",
        "less",
        "scss",
        "typescript",
        "typescriptreact"
      ],
      "esbenp.prettier-vscode",
      updatePrettierConfigurationExcludingVsCode,
      removePrettierConfigurationExcludingVsCode
    );
  }
};
function updatePrettierConfigurationExcludingVsCode(context) {
  const { packageJson } = context.fileOperations;
  packageJson.json = {
    ...packageJson.json,
    prettier: {
      ...packageJson.json.prettier,
      ...getDefaultPrettierConfiguration(context.newConfig.tabSize)
    }
  };
}
function removePrettierConfigurationExcludingVsCode(context) {
  context.fileOperations.packageJson.deletePrettierConfiguration();
}

// src/migration/formatters/formatter-registry.ts
var FORMATTERS = {
  disabled: new NoFormatter(),
  prettier: new Prettier(),
  biome: new Biome()
};
function getFormatter(formatterOrContext) {
  return FORMATTERS["string" === typeof formatterOrContext ? formatterOrContext : formatterOrContext.newConfig.formatter.value];
}
function getAllFormattersExcept(formatter) {
  return getFormatters((currentFormatter) => currentFormatter !== formatter);
}
function getFormatters(filter) {
  const result = new Array();
  for (const formatter of Object.keys(FORMATTERS)) {
    if (formatter in FORMATTERS && filter(formatter)) {
      result.push(FORMATTERS[formatter]);
    }
  }
  return result;
}

// src/migration/actions/configure-formatter.ts
function configureFormatter(context) {
  for (const formatter of getAllFormattersExcept(context.newConfig.formatter.value)) {
    formatter.removeConfigurationExcludingVsCode(context);
  }
  getFormatter(context.newConfig.formatter.value).createOrUpdateConfigurationExcludingVsCode(context);
}

// src/migration/package-managers/package-manager.ts
var PackageManager = class {
  constructor(descriptor, createOrUpdateConfiguration, removeConfigurationAndArtifacts, getUpgradePackagesCommand) {
    this.createOrUpdateConfiguration = createOrUpdateConfiguration;
    this.removeConfigurationAndArtifacts = removeConfigurationAndArtifacts;
    this.getUpgradePackagesCommand = getUpgradePackagesCommand;
    this.gitignorePatterns = descriptor.gitignorePatterns;
    this.swpmIdentifier = descriptor.swpmIdentifier;
    this.installCommand = descriptor.installCommand;
    this.upgradeAllPackagesCommand = descriptor.upgradeAllCommand;
    this.launchpadDlxCommand = descriptor.launchpadDlxCommand;
    this.launchpadLocalCommand = descriptor.launchpadLocalCommand;
  }
  gitignorePatterns;
  swpmIdentifier;
  installCommand;
  upgradeAllPackagesCommand;
  launchpadDlxCommand;
  launchpadLocalCommand;
};

// src/migration/package-managers/npm.ts
var Npm = class extends PackageManager {
  constructor() {
    super(
      {
        gitignorePatterns: {
          current: ["/node_modules"],
          deprecated: []
        },
        swpmIdentifier: "npm",
        installCommand: ["npm", "install"],
        upgradeAllCommand: void 0,
        launchpadDlxCommand: ["npm", "exec", "--", `${LAUNCHPAD_PACKAGE_NAME}@latest`],
        launchpadLocalCommand: ["npm", "exec", "--no", "--", `${LAUNCHPAD_PACKAGE_NAME}`]
      },
      createOrUpdateNpmConfiguration,
      removeNpmConfigurationAndArtifacts,
      getNpmUpgradeCommand
    );
  }
};
function createOrUpdateNpmConfiguration(_context) {
}
function removeNpmConfigurationAndArtifacts(context) {
  context.files.get(".npmrc").delete();
  context.files.get("package-lock.json").delete();
}
function getNpmUpgradeCommand(npmPackages) {
  return ["npm", "install", ...npmPackages.map((npmPackage) => `${npmPackage}@latest`)];
}

// src/migration/package-managers/pnpm.ts
var Pnpm = class extends PackageManager {
  constructor() {
    super(
      {
        gitignorePatterns: {
          current: ["/node_modules"],
          deprecated: []
        },
        swpmIdentifier: "pnpm",
        installCommand: ["pnpm", "install"],
        upgradeAllCommand: ["pnpm", "up", "--latest"],
        launchpadDlxCommand: ["pnpm", "dlx", `${LAUNCHPAD_PACKAGE_NAME}@latest`],
        launchpadLocalCommand: ["pnpm", "exec", "launchpad"]
      },
      createOrUpdatePnpmConfiguration,
      removePnpmConfigurationAndArtifacts,
      getPnpmUpgradeCommand
    );
  }
};
function createOrUpdatePnpmConfiguration(context) {
  deleteIgnoredNodeModules(context);
}
function removePnpmConfigurationAndArtifacts(context) {
  deleteIgnoredNodeModules(context);
  context.files.get(".npmrc").delete();
  context.files.get("pnpm-lock.yaml").delete();
}
function deleteIgnoredNodeModules(context) {
  context.directories.get("node_modules/.ignored").delete();
}
function getPnpmUpgradeCommand(npmPackages) {
  return ["pnpm", "update", "--latest", ...npmPackages];
}

// src/migration/package-managers/yarn.ts
var Yarn = class extends PackageManager {
  constructor() {
    super(
      {
        gitignorePatterns: {
          current: [
            "/node_modules",
            "/.pnp.*",
            "/.yarn/*",
            "!/.yarn/patches",
            "!/.yarn/plugins",
            "!/.yarn/releases",
            "!/.yarn/sdks",
            "!/.yarn/versions"
          ],
          deprecated: []
        },
        swpmIdentifier: "yarn@berry",
        installCommand: ["yarn", "install"],
        upgradeAllCommand: ["yarn", "up", "*@latest"],
        launchpadDlxCommand: ["yarn", "dlx", `${LAUNCHPAD_PACKAGE_NAME}@latest`],
        launchpadLocalCommand: ["yarn", "run", "--binaries-only", "launchpad"]
      },
      createOrUpdateYarnConfiguration,
      removeYarnConfigurationAndArtifacts,
      getYarnUpgradeCommand
    );
  }
};
function createOrUpdateYarnConfiguration(context) {
  disablePlugAndPlay(context);
  installOrUpgradeYarn(context);
}
function disablePlugAndPlay(context) {
  const yarnrc = context.files.get(".yarnrc.yml");
  yarnrc.contents = yarnrc.contents ?? "nodeLinker: node-modules";
}
function installOrUpgradeYarn(context) {
  const hasChanged = context.oldConfig?.packageManager?.value !== context.newConfig.packageManager.value;
  const message = hasChanged ? "Installing yarn" : "Upgrading yarn to the latest version";
  context.addExternalCommand(message, ["yarn", "set", "version", "stable"]);
}
function removeYarnConfigurationAndArtifacts(context) {
  context.directories.get(".yarn").delete();
  context.files.get(".yarnrc.yml").delete();
  context.files.get("yarn.lock").delete();
  const { packageJson } = context.fileOperations;
  if (packageJson.json.packageManager?.match(/^yarn@.*/)) {
    packageJson.deleteProperty("packageManager");
  }
}
function getYarnUpgradeCommand(npmPackages) {
  return ["yarn", "up", ...npmPackages];
}

// src/migration/package-managers/package-manager-registry.ts
var PACKAGE_MANAGERS = {
  npm: new Npm(),
  pnpm: new Pnpm(),
  yarn: new Yarn()
};
function getAllPackageManagers() {
  return getPackageManagers(() => true);
}
function getPackageManager(packageManagerOrContext) {
  return PACKAGE_MANAGERS["string" === typeof packageManagerOrContext ? packageManagerOrContext : packageManagerOrContext.newConfig.packageManager.value];
}
function getAllPackageManagersExcept(packageManager) {
  return getPackageManagers((currentPackageManager) => currentPackageManager !== packageManager);
}
function getPackageManagers(filter) {
  const result = new Array();
  for (const formatter of Object.keys(PACKAGE_MANAGERS)) {
    if (formatter in PACKAGE_MANAGERS && filter(formatter)) {
      result.push(PACKAGE_MANAGERS[formatter]);
    }
  }
  return result;
}

// src/migration/actions/configure-package-manager.ts
function configurePackageManager(context) {
  const activePackageManager = context.newConfig.packageManager.value;
  getAllPackageManagersExcept(activePackageManager).forEach(
    (packageManager) => packageManager.removeConfigurationAndArtifacts(context)
  );
  getPackageManager(activePackageManager).createOrUpdateConfiguration(context);
}

// src/migration/actions/create-debug-module.ts
function createDebugModule(context) {
  const debugModule = context.files.get(context.debugModulePath);
  const mainModule = context.files.get(context.mainModulePath);
  if (context.newConfig.createDebugModule && !debugModule.exists) {
    if (mainModule.exists || context.newConfig.createProjectTemplate) {
      const importFileExtension = "esm" === context.newConfig.moduleSystem ? ".js" : "";
      const importPath = `./${context.newConfig.projectName}${importFileExtension}`;
      debugModule.contents = `import ${JSON.stringify(importPath)};`;
    } else {
      debugModule.contents = `console.log("This is the debug module");`;
    }
  }
}

// src/resources/embedded-assets.ts
var ASSETS = {
  ".launchpad/Makefile.documentation": [
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#    ##     ## ######## ##       ########",
    "#    ##     ## ##       ##       ##     ##",
    "#    ##     ## ##       ##       ##     ##",
    "#    ######### ######   ##       ########",
    "#    ##     ## ##       ##       ##",
    "#    ##     ## ##       ##       ##",
    "#    ##     ## ######## ######## ##",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    '$(call lp.help.disable                                          ) # disable the "help" target ("lp.help" remains active)',
    "",
    "$(call lp.help.add-target       , generated.ts, ....... refresh ) # register a target with description",
    "$(call lp.help.add-phony-target , run, ................ execute ) # register a target and make it .PHONY",
    "",
    "$(call lp.help.add-extra-dots   ,                      ...      ) # add more spacing/dots when printing built-in targets",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#   ########  ####    ###     ######   ##    ##  #######   ######  ######## ####  ######   ######",
    "#   ##     ##  ##    ## ##   ##    ##  ###   ## ##     ## ##    ##    ##     ##  ##    ## ##    ##",
    "#   ##     ##  ##   ##   ##  ##        ####  ## ##     ## ##          ##     ##  ##       ##",
    "#   ##     ##  ##  ##     ## ##   #### ## ## ## ##     ##  ######     ##     ##  ##        ######",
    "#   ##     ##  ##  ######### ##    ##  ##  #### ##     ##       ##    ##     ##  ##             ##",
    "#   ##     ##  ##  ##     ## ##    ##  ##   ### ##     ## ##    ##    ##     ##  ##    ## ##    ##",
    "#   ########  #### ##     ##  ######   ##    ##  #######   ######     ##    ####  ######   ######",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    '$(call lp.diagnostics.disable                                   ) # disable diagnostics targets ("lp.*" remains active)',
    "",
    "$(call lp.diagnostics.set-target-names, help info config        ) # set aliases for diagnostics targets",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#    ######   #######  ##     ## ########  #### ##       ########",
    "#   ##    ## ##     ## ###   ### ##     ##  ##  ##       ##",
    "#   ##       ##     ## #### #### ##     ##  ##  ##       ##",
    "#   ##       ##     ## ## ### ## ########   ##  ##       ######",
    "#   ##       ##     ## ##     ## ##         ##  ##       ##",
    "#   ##    ## ##     ## ##     ## ##         ##  ##       ##",
    "#    ######   #######  ##     ## ##        #### ######## ########",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    '$(call lp.tsc.disable                                ) # disable the "tsc" target ("lp.tsc" remains active)',
    "",
    "$(call lp.tsc.add-extra-prerequisites    , ...files  ) # add extra prerequisite files that should cause a re-build",
    "$(call lp.tsc.overwrite-prerequisites    , ...files  ) # use only the given files as prerequisites",
    "$(call lp.tsc.add-extra-targets          , ...files  ) # declare extra target files generated by the before/after hooks",
    "$(call lp.tsc.overwrite-targets          , ...files  ) # use only the given files as targets",
    "",
    "$(call lp.tsc.add-before-hook            , pwd && ls ) # append commands to run before compiling",
    "$(call lp.tsc.overwrite-before-hooks     , pwd && ls ) # overwrite any previously defined before-hook commands",
    "$(call lp.tsc.add-after-hook             , pwd && ls ) # append commands to run after compiling",
    "$(call lp.tsc.overwrite-after-hooks      , pwd && ls ) # overwrite any previously defined after-hook commands",
    "$(call lp.tsc.overwrite-command          , tsc -b    ) # overwrite the command itself",
    "",
    '$(call lp.tsc.get-command-with-hooks     , Compile...) # get the command with all hooks (with an optional "echo")',
    '$(call lp.tsc.get-default-command        , Compile...) # get the built-in command (with an optional "echo")',
    "",
    '$(LP_PREREQUISITE_TSC)                                 # use as a prerequisite for targets that depend on "tsc"',
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#    ########  ##     ## ##    ## ########  ##       ########",
    "#    ##     ## ##     ## ###   ## ##     ## ##       ##",
    "#    ##     ## ##     ## ####  ## ##     ## ##       ##",
    "#    ########  ##     ## ## ## ## ##     ## ##       ######",
    "#    ##     ## ##     ## ##  #### ##     ## ##       ##",
    "#    ##     ## ##     ## ##   ### ##     ## ##       ##",
    "#    ########   #######  ##    ## ########  ######## ########",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    '$(call lp.bundle.disable                             ) # disable the "bundle" target ("lp.bundle" remains active)',
    "",
    "$(call lp.bundle.add,                                  # add a file to be bundled",
    "       src/app.ts,                                     # [1] source file",
    "       dist/app.js,                                    # [2] bundled output file",
    "                                                       # [3] list of strings to override the project's configuration",
    "           cjs | esm                                   #     - set the target module system",
    "           cli | web                                   #     - bundle for cli/node or web",
    "           minify                                      #     - minify the JavaScript bundle",
    "           sourcemap                                   #     - generate a source map",
    "           inline-sources                              #     - generate a source map and inline sources",
    "           dts                                         #     - generate a bundled d.ts declaration file",
    "           shebang                                     #     - prepend #!/usr/bin/env node to JavaScript bundle",
    '       echo "js after-hook",                           # [3] command to run after bundling the js file',
    '	   echo "dts after-hook"                           # [4] command to run after bundling the d.ts file',
    " )",
    "",
    "$(call lp.bundle.add-extra-prerequisites , ...files  ) # add extra prerequisite files that should cause a re-bundle",
    "$(call lp.bundle.overwrite-prerequisites , ...files  ) # use only the given files as prerequisites for bundling",
    "$(call lp.bundle.add-extra-js-targets    , ...files  ) # declare extra js targets (created separately or by hooks)",
    "$(call lp.bundle.add-extra-dts-targets   , ...files  ) # declare extra d.ts targets (created separately or by hooks)",
    "$(call lp.bundle.overwrite-js-targets    , ...files  ) # use only the given files as js targets",
    "$(call lp.bundle.overwrite-dts-targets   , ...files  ) # use only the given files as d.ts targets",
    "",
    '$(LP_PREREQUISITE_BUNDLE)                              # use as a prerequisite for targets that depend on "bundle"',
    "$(LP_PREREQUISITE_BUNDLE_JS)                           # same as above but only require bundled JavaScript files",
    "$(LP_PREREQUISITE_BUNDLE_DTS)                          # same as above but only require bundled d.ts. declaration files",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#    ########  #######  ########  ##     ##    ###    ########",
    "#    ##       ##     ## ##     ## ###   ###   ## ##      ##",
    "#    ##       ##     ## ##     ## #### ####  ##   ##     ##",
    "#    ######   ##     ## ########  ## ### ## ##     ##    ##",
    "#    ##       ##     ## ##   ##   ##     ## #########    ##",
    "#    ##       ##     ## ##    ##  ##     ## ##     ##    ##",
    "#    ##        #######  ##     ## ##     ## ##     ##    ##",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    '$(call lp.format.disable                             ) # disable the "format" target ("lp.format" remains active)',
    "",
    "$(call lp.format.include      , *.cjs resources/*    ) # format files/directores matching the $(wildcard) pattern",
    "$(call lp.format.exclude      , resources/tmp        ) # don't format files/directores matching the $(wildcard) pattern",
    "$(call lp.format.include-only , *.json src           ) # format only these files/directories (but not the built-in ones)",
    "",
    "                                                       # Note: All patterns are expanded via $(wildcard ...). They can",
    "                                                       # resolve to files or directories. They do not expand recursively.",
    "                                                       # It not possible to exclude sub-directories of included parent",
    "                                                       # directories, e.g.:",
    "                                                       #",
    "                                                       # $(call lp.format.include, src     )",
    "                                                       # $(call lp.format.exclude, src/tmp ) # DOES NOT WORK!",
    "                                                       #",
    "                                                       # Instead, include the child path and all of its siblings and",
    "                                                       # then exclude the specific child:",
    "                                                       #",
    "                                                       # $(call lp.format.include, src/*   ) # expands to src/tmp src/...",
    "                                                       # $(call lp.format.exclude, src/tmp ) # works now",
    "                                                       #",
    '                                                       # The effective paths can be checked via "make format.help"',
    "",
    "$(call lp.format.add-before-hook         , pwd && ls ) # append commands to run before formatting",
    "$(call lp.format.overwrite-before-hooks  , pwd && ls ) # overwrite any previously defined before-hook commands",
    "$(call lp.format.add-after-hook          , pwd && ls ) # append commands to run after formatting",
    "$(call lp.format.overwrite-after-hooks   , pwd && ls ) # overwrite any previously defined after-hook commands",
    "$(call lp.format.overwrite-command       , prettier  ) # overwrite the command itself",
    "",
    '$(call lp.bundle.get-command-with-hooks  , Format... ) # get the command with all hooks (with an optional "echo")',
    '$(call lp.bundle.get-default-command     , Format... ) # get the built-in command (with an optional "echo")',
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#   ##     ## ########  ##       #### ######## ########",
    "#   ##     ## ##     ## ##        ##  ##          ##",
    "#   ##     ## ##     ## ##        ##  ##          ##",
    "#   ##     ## ########  ##        ##  ######      ##",
    "#   ##     ## ##        ##        ##  ##          ##",
    "#   ##     ## ##        ##        ##  ##          ##",
    "#    #######  ##        ######## #### ##          ##",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    '$(call lp.uplift.disable                             ) # disable the uplift target ("lp.uplift" remains active)',
    "",
    "$(call lp.uplift.add-before-hook         , pwd && ls ) # append commands to run before uplifting",
    "$(call lp.uplift.overwrite-before-hooks  , pwd && ls ) # overwrite any previously defined before-hook commands",
    "$(call lp.uplift.add-after-hook          , pwd && ls ) # append commands to run after uplifting",
    "$(call lp.uplift.overwrite-after-hooks   , pwd && ls ) # overwrite any previously defined after-hook commands",
    "$(call lp.uplift.overwrite-command       , prettier  ) # overwrite the command itself",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#     ######  ##       ########    ###    ##    ##",
    "#    ##    ## ##       ##         ## ##   ###   ##",
    "#    ##       ##       ##        ##   ##  ####  ##",
    "#    ##       ##       ######   ##     ## ## ## ##",
    "#    ##       ##       ##       ######### ##  ####",
    "#    ##    ## ##       ##       ##     ## ##   ###",
    "#     ######  ######## ######## ##     ## ##    ##",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    "$(call lp.clean.npm-packages                         ) # delete node_modules",
    "$(call lp.clean.tsc-output                           ) # delete transpiled JavaScript files",
    "$(call lp.clean.bundles                              ) # delete bundles",
    "$(call lp.clean.files, output.log dist               ) # delete the given files and directories",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#    ########  ##     ## ##    ##",
    "#    ##     ## ##     ## ###   ##",
    "#    ##     ## ##     ## ####  ##",
    "#    ########  ##     ## ## ## ##",
    "#    ##   ##   ##     ## ##  ####",
    "#    ##    ##  ##     ## ##   ###",
    "#    ##     ##  #######  ##    ##",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    "$(call lp.run    , dir/js-or-ts-file ) ...arguments  # run a TypeScript source file or a compiled JavaScript file",
    "",
    "$(call lp.run.js , out/my-app.js     ) ...arguments  # run a JavaScript file",
    "$(call lp.run.ts , src/my-app.ts     ) ...arguments  # run a TypeScript file (via ts-node)",
    ""
  ].join("\n"),
  ".launchpad/Makefile.footer": [
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#    ##     ## ######## ##       ########",
    "#    ##     ## ##       ##       ##     ##",
    "#    ##     ## ##       ##       ##     ##",
    "#    ######### ######   ##       ########",
    "#    ##     ## ##       ##       ##",
    "#    ##     ## ##       ##       ##",
    "#    ##     ## ######## ######## ##",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    "$(if $(call lp.bundle.is-enabled     ), $(call lp.help.add-builtin-target, bundle ............., bundle))",
    "$(if $(call lp.clean.is-enabled      ), $(call lp.help.add-builtin-target, clean .............., clean ))",
    "$(if $(call lp.tsc.is-enabled        ), $(call lp.help.add-builtin-target, compile ............, tsc   ))",
    "$(if $(call lp.format.is-enabled     ), $(call lp.help.add-builtin-target, format ............., format))",
    "$(if $(call lp.help.is-enabled       ), $(call lp.help.add-builtin-target, help ..............., help  ))",
    "$(if $(call lp.tsc.is-enabled        ), $(call lp.help.add-builtin-target, tsc ................, tsc   ))",
    "$(if $(call lp.uplift.is-enabled     ), $(call lp.help.add-builtin-target, uplift ............., uplift))",
    "$(if $(call lp.diagnostics.is-enabled), $(call lp.help.add-target        , <target>.help ......, show diagnostic information (aliases: $(sort $(call lp.diagnostics.get-target-names)))))",
    "",
    "$(foreach name, $(call lp.help.get-phony-targets), lp.$(name)) : ;",
    "	$(call lp.help.print-targets)",
    "",
    'ifeq "$(call lp.help.is-enabled)" "true"',
    "    $(call lp.fn.publicize-phony-targets, help)",
    "endif",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#   ########  ####    ###     ######   ##    ##  #######   ######  ######## ####  ######   ######",
    "#   ##     ##  ##    ## ##   ##    ##  ###   ## ##     ## ##    ##    ##     ##  ##    ## ##    ##",
    "#   ##     ##  ##   ##   ##  ##        ####  ## ##     ## ##          ##     ##  ##       ##",
    "#   ##     ##  ##  ##     ## ##   #### ## ## ## ##     ##  ######     ##     ##  ##        ######",
    "#   ##     ##  ##  ######### ##    ##  ##  #### ##     ##       ##    ##     ##  ##             ##",
    "#   ##     ##  ##  ##     ## ##    ##  ##   ### ##     ## ##    ##    ##     ##  ##    ## ##    ##",
    "#   ########  #### ##     ##  ######   ##    ##  #######   ######     ##    ####  ######   ######",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    "$(foreach feature, tsc bundle format uplift clean, \\",
    "	$(foreach target, $(call lp.$(feature).get-phony-targets), \\",
    "        $(foreach shortcut, $(call lp.diagnostics.get-target-names), \\",
    "		        $(eval $(call lp.fn.create-diagnostics-target,$(strip $(target)),$(strip $(shortcut)))) \\",
    "         ) \\",
    "	 ) \\",
    " )",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#     ######   #######  ##     ## ########  #### ##       ########",
    "#    ##    ## ##     ## ###   ### ##     ##  ##  ##       ##",
    "#    ##       ##     ## #### #### ##     ##  ##  ##       ##",
    "#    ##       ##     ## ## ### ## ########   ##  ##       ######",
    "#    ##       ##     ## ##     ## ##         ##  ##       ##",
    "#    ##    ## ##     ## ##     ## ##         ##  ##       ##",
    "#     ######   #######  ##     ## ##        #### ######## ########",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    'ifeq "$(call lp.tsc.is-enabled)" "true" # ......................................................... compiling is enabled',
    "",
    "$(call lp.fn.declare-phony-targets, tsc, $(call lp.tsc.get-targets))",
    "",
    "$(call lp.tsc.get-targets) : $$(call lp.tsc.get-prerequisites)",
    "	$(call lp.tsc.get-command-with-hooks, Compiling...)",
    "",
    "else # ........................................................................................... compiling is disabled",
    "",
    ".PHONY: $(foreach name, $(call lp.tsc.get-phony-targets), lp.$(name))",
    "",
    "$(foreach name, $(call lp.tsc.get-phony-targets), lp.$(name)) : ;",
    '    ifeq "$(strip $(call lp.tsc.get-command-with-hooks))" ""',
    "		$(error Compiling is disabled/not configured)",
    "    else",
    "		$(call lp.tsc.get-command-with-hooks, Compiling...)",
    "    endif",
    "",
    "endif",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#    ########  ##     ## ##    ## ########  ##       ########",
    "#    ##     ## ##     ## ###   ## ##     ## ##       ##",
    "#    ##     ## ##     ## ####  ## ##     ## ##       ##",
    "#    ########  ##     ## ## ## ## ##     ## ##       ######",
    "#    ##     ## ##     ## ##  #### ##     ## ##       ##",
    "#    ##     ## ##     ## ##   ### ##     ## ##       ##",
    "#    ########   #######  ##    ## ########  ######## ########",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    'ifeq "$(call lp.bundle.is-enabled)" "" # .......................................................... bundling is disabled',
    "",
    ".PHONY: lp.bundle",
    "",
    "lp.bundle : ;",
    "		$(error Bundling is disabled)",
    "",
    'else ifeq "$(call lp.bundle.get-targets)" "" # .............................................. no bundles have been added',
    "",
    "$(call lp.fn.declare-phony-targets, bundle, lp.bundle)",
    "",
    "lp.bundle :",
    "	$(error No bundles have been defined via lp.bundle.add",
    "",
    "else # ........................................................................................... bundles are available",
    "",
    "$(call lp.fn.declare-phony-targets, bundle, $(call lp.bundle.get-targets))",
    "",
    "endif",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#    ########  #######  ########  ##     ##    ###    ########",
    "#    ##       ##     ## ##     ## ###   ###   ## ##      ##",
    "#    ##       ##     ## ##     ## #### ####  ##   ##     ##",
    "#    ######   ##     ## ########  ## ### ## ##     ##    ##",
    "#    ##       ##     ## ##   ##   ##     ## #########    ##",
    "#    ##       ##     ## ##    ##  ##     ## ##     ##    ##",
    "#    ##        #######  ##     ## ##     ## ##     ##    ##",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    'ifeq "$(call lp.format.is-enabled)" "" # ........................................................ formatting is disabled',
    "",
    ".PHONY: $(foreach name, $(call lp.format.get-phony-targets), lp.$(name))",
    "",
    "$(foreach name, $(call lp.format.get-phony-targets), lp.$(name)) : ;",
    "	$(if $(call lp.format.get-command-with-hooks), \\",
    "	     $(call lp.format.get-command-with-hooks, Formatting...), \\",
    "	     $(error No paths to format have been configured)\\",
    "	 )",
    "",
    "else # ........................................................................................... formatting is enabled",
    "",
    "$(call lp.fn.declare-phony-targets, format, lp.internal.format)",
    "",
    "lp.internal.format :",
    "	$(if $(call lp.format.get-command-with-hooks), \\",
    "	     $(call lp.format.get-command-with-hooks, Formatting...), \\",
    "	     $(error No paths to format have been configured)\\",
    "	 )",
    "",
    "endif",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#   ##     ## ########  ##       #### ######## ########",
    "#   ##     ## ##     ## ##        ##  ##          ##",
    "#   ##     ## ##     ## ##        ##  ##          ##",
    "#   ##     ## ########  ##        ##  ######      ##",
    "#   ##     ## ##        ##        ##  ##          ##",
    "#   ##     ## ##        ##        ##  ##          ##",
    "#    #######  ##        ######## #### ##          ##",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    'ifeq "$(call lp.uplift.is-enabled)" "true" # ........................................................ uplift is enabled',
    "",
    "$(call lp.fn.declare-phony-targets, uplift, lp.internal.uplift)",
    "",
    "lp.internal.uplift :",
    "	$(call lp.uplift.get-command-with-hooks, Uplifting...)",
    "",
    "else # .............................................................................................. uplift is disabled",
    "",
    ".PHONY: $(foreach name, $(call lp.uplift.get-phony-targets), lp.$(name))",
    "",
    "$(foreach name, $(call lp.uplift.get-phony-targets), lp.$(name)) : ;",
    "		$(call lp.uplift.get-command-with-hooks, Uplifting...)",
    "",
    "endif",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#     ######  ##       ########    ###    ##    ##",
    "#    ##    ## ##       ##         ## ##   ###   ##",
    "#    ##       ##       ##        ##   ##  ####  ##",
    "#    ##       ##       ######   ##     ## ## ## ##",
    "#    ##       ##       ##       ######### ##  ####",
    "#    ##    ## ##       ##       ##     ## ##   ###",
    "#     ######  ######## ######## ##     ## ##    ##",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    'ifeq "$(call lp.clean.is-enabled)" "true" # ........................................................ cleaning is enabled',
    "",
    "$(call lp.fn.declare-phony-targets, clean, lp.internal.clean)",
    "",
    "lp.internal.clean :",
    '    ifeq "$(call lp.clean.get-default-command)" "$(call lp.clean.get-effective-command)"',
    "		$(if $(wildcard $(call lp.clean.get-files)), $(call lp.clean.get-effective-command))",
    "    else",
    "		$(call lp.clean.get-effective-command)",
    "    endif",
    "",
    "else # ............................................................................................ cleaning is disabled",
    "",
    ".PHONY: $(foreach name, $(call lp.clean.get-phony-targets), lp.$(name))",
    "",
    "$(foreach name, $(call lp.clean.get-phony-targets), lp.$(name)) : ;",
    '    ifeq "$(strip $(call lp.clean.get-command-with-hooks))" ""',
    "		$(error Cleaning is disabled)",
    "    else",
    '        ifeq "$(call lp.clean.get-default-command)" "$(call lp.clean.get-effective-command)"',
    "			$(if $(wildcard $(call lp.clean.get-files)), $(call lp.clean.get-effective-command))",
    "        else",
    "			$(call lp.clean.get-effective-command)",
    "        endif",
    "    endif",
    "endif",
    ""
  ].join("\n"),
  ".launchpad/Makefile.header": [
    ".SECONDEXPANSION:",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#    ######   #######  ##    ##  ######  ########    ###    ##    ## ########  ######",
    "#   ##    ## ##     ## ###   ## ##    ##    ##      ## ##   ###   ##    ##    ##    ##",
    "#   ##       ##     ## ####  ## ##          ##     ##   ##  ####  ##    ##    ##",
    "#   ##       ##     ## ## ## ##  ######     ##    ##     ## ## ## ##    ##     ######",
    "#   ##       ##     ## ##  ####       ##    ##    ######### ##  ####    ##          ##",
    "#   ##    ## ##     ## ##   ### ##    ##    ##    ##     ## ##   ###    ##    ##    ##",
    "#    ######   #######  ##    ##  ######     ##    ##     ## ##    ##    ##     ######",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    "__LP_HOME_DIR                  :=$(strip $(patsubst %/Makefile.header,%,$(lastword $(MAKEFILE_LIST))))",
    "__LP_LAUNCHPAD_CFG             :=$(strip $(__LP_HOME_DIR)/launchpad.cfg)",
    "__LP_MAKEFILE_HEADER           :=$(strip $(__LP_HOME_DIR)/Makefile.header)",
    "__LP_MAKEFILE_FOOTER           :=$(strip $(__LP_HOME_DIR)/Makefile.footer)",
    "__LP_TSCONFIG_DEFAULT_JSON     :=$(strip $(__LP_HOME_DIR)/tsconfig.default.json)",
    "__LP_MAKEFILES                 :=Makefile $(foreach ext, header footer, $(__LP_HOME_DIR)/Makefile.$(ext)) $(wildcard Makefile*)",
    "__LP_MAKEFILES_AND_SETTINGS    :=$(__LP_MAKEFILES) $(__LP_LAUNCHPAD_CFG)",
    "__LP_TSCONFIG_JSON             :=tsconfig.json $(__LP_TSCONFIG_DEFAULT_JSON) $(wildcard tsconfig*.json)",
    "",
    "__LP_EMPTY_STRING               =#",
    "__LP_BLANK                      =$(__LP_EMPTY_STRING) $(__LP_EMPTY_STRING)#",
    "__LP_COMMA                      =,",
    "define __LP_LINE_BREAK",
    "",
    "",
    "endef",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#    ######## ##     ## ##    ##  ######  ######## ####  #######  ##    ##  ######",
    "#    ##       ##     ## ###   ## ##    ##    ##     ##  ##     ## ###   ## ##    ##",
    "#    ##       ##     ## ####  ## ##          ##     ##  ##     ## ####  ## ##",
    "#    ######   ##     ## ## ## ## ##          ##     ##  ##     ## ## ## ##  ######",
    "#    ##       ##     ## ##  #### ##          ##     ##  ##     ## ##  ####       ##",
    "#    ##       ##     ## ##   ### ##    ##    ##     ##  ##     ## ##   ### ##    ##",
    "#    ##        #######  ##    ##  ######     ##    ####  #######  ##    ##  ######",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    "lp.fn.assert.param-not-empty    =$(if $(strip $(2)),,$(error Missing parameter in $(if $(strip $(1)), call to $(strip $(1), function call))))",
    "",
    "lp.fn.map.empty-to              =$(if $(strip $(1)),$(subst __LP_LINE_BREAK,$(__LP_LINE_BREAK),$(strip $(1))),$(strip $(2)))",
    "",
    "lp.fn.print.header              =$(info #-----------------------------------------------------------------------------------------------------------------------) \\",
    "                                 $(info # $(strip $(1))) \\",
    "                                 $(info #-----------------------------------------------------------------------------------------------------------------------)",
    "lp.fn.print.indented            =$(info $(__LP_EMPTY_STRING)  $(strip $(1)))",
    "",
    "lp.fn.var.assign                =$(eval $(strip $(1))=$(strip $(2)))",
    "lp.fn.var.append                =$(if $(strip $(2)), $(eval $(strip $(1))$(if $(strip $(2)),+= ,)$(strip $(2))))",
    "lp.fn.var.erase                 =$(call lp.fn.var.assign, $(1),)",
    "lp.fn.var.append-with-separator =$(if $(strip $(3)), \\",
    "                                     $(if $(strip $($(strip $(1)))), \\",
    "                                        $(call lp.fn.var.append, $(1), $(strip $(2)) $(strip $(3))), \\",
    "                                        $(call lp.fn.var.assign, $(1), $(strip $(3))) \\",
    "                                      ) \\",
    "                                  )",
    "",
    "lp.fn.wildcard                  =$(call lp.fn.normalize.file-paths, $(patsubst %/,,$(wildcard $(patsubst %,%/,$(foreach d,$(wildcard $(1:=/*)),$(call lp.fn.wildcard,$d,$2) $(filter $(subst *,%,$2),$d))))))",
    "lp.fn.normalize.file-paths      =$(foreach path, $(1), $(patsubst %/,%,$(patsubst ./%,%,$(path))))",
    "",
    "lp.fn.if-equal                  =$(if $(patsubst $(strip $(1)),,$(strip $(2))),$(strip $(4)), \\",
    "                                 $(if $(patsubst $(strip $(2)),,$(strip $(1))),$(strip $(4)),$(strip $(3))))",
    "lp.fn.if-contains               =$(if $(filter $(strip $(2)),$(strip $(1))),$(strip $(3)),$(strip $(4)))",
    "lp.fn.if-not-contains           =$(call lp.fn.if-contains,$(1),$(2),$(4),$(3))",
    "",
    "lp.fn.config.normalize.string   =$(call lp.fn.var.assign, $(strip $(1)), $(strip $($(strip $(1)))))",
    "lp.fn.config.normalize.enum     =$(call lp.fn.var.assign, $(strip $(1)), $(strip $(patsubst %::pinned,%,$($(strip $(1))))))",
    "lp.fn.config.normalize.disabled =$(if $(filter disabled, $($(strip $(1)))),$(call lp.fn.var.erase, $(1)))",
    "",
    'lp.fn.config.clean-enums        =$(strip $(filter-out or, $(subst ",,$(subst $(__LP_COMMA),,$(strip $(1))))))',
    "lp.fn.config.extract-enums      =$(strip $(filter $(call lp.fn.config.clean-enums, $($(strip $(1))_ENUMS)), $($(strip $(1)))))",
    "",
    "lp.fn.config.assert.not-empty   =$(if $(strip $($(strip $(1)))),,$(call lp.fn.config.fail.missing-value, $(1), $($(strip $(1))_ENUMS)))",
    "lp.fn.config.assert.valid-enum  =$(if $(call lp.fn.config.extract-enums, $(1)),,$(call lp.fn.config.fail.invalid-enum, $(1)))",
    "lp.fn.config.assert.single-enum =$(if $(patsubst 1%,%,$(words $(strip $($(strip $(1)))))), $(call lp.fn.config.fail.invalid-enum, $(1)))",
    "lp.fn.config.assert.enum        =$(foreach fn, not-empty valid-enum single-enum, $(call lp.fn.config.assert.$(fn), $(1)))",
    "",
    "lp.fn.config.fail               =$(info Invalid configuration in $(__LP_LAUNCHPAD_CFG)) \\",
    "                                 $(info $(strip $(1))) \\",
    "                                 $(info ) \\",
    "                                 $(error $(__LP_BLANK))",
    "lp.fn.config.fail.missing-value =$(call lp.fn.config.fail, $(1) is not set $(if $(2), (should be $(strip $(2)))))",
    'lp.fn.config.fail.invalid-enum  =$(call lp.fn.config.fail, $(strip $(1)) must be $($(strip $(1))_ENUMS) (current value: "$(strip $($(strip $(1)))")))',
    "",
    "lp.fn.config.validate-enum      =$(call lp.fn.config.normalize.enum, $(1))\\",
    "                                 $(call lp.fn.config.assert.enum, $(1))\\",
    "                                 $(call lp.fn.config.normalize.disabled, $(1))",
    "",
    'lp.fn.get-command               =$(strip $(if $(strip $(2)), echo "$(strip $(2))" && ) \\',
    "                                     $(if $(call lp.$(strip $(1)).get-before-hooks), $(call lp.$(strip $(1)).get-before-hooks) &&) \\",
    "                                     $(call lp.$(strip $(1)).get-effective-command) \\",
    "                                     $(if $(call lp.$(strip $(1)).get-after-hooks), && $(call lp.$(strip $(1)).get-after-hooks)) \\",
    "                                 )",
    "",
    "lp.fn.declare-phony-targets     =$(foreach target, \\",
    "                                     $(call lp.$(strip $(1)).get-phony-targets), \\",
    "                                     $(eval $(call lp.fn.declare-phony-target,$(target),$(call lp.$(strip $(1)).get-description),$(2))) \\",
    "                                  )",
    "",
    "define lp.fn.declare-phony-target",
    "#----",
    ".PHONY: lp.$(1) $(1)",
    "lp.$(1) $(1) : $(3);",
    "endef",
    "",
    "lp.fn.publicize-phony-targets   =$(foreach target, \\",
    "                                    $(call lp.$(strip $(1)).get-phony-targets), \\",
    "                                    $(eval $(call lp.fn.publicize-phony-target,$(target),$(call lp.$(strip $(1)).get-description))) \\",
    "                                 )",
    "",
    "define lp.fn.publicize-phony-target",
    "#----",
    ".PHONY: $(1)",
    "$(1) : lp.$(1);",
    "endef",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#     ######   #######  ##    ## ######## ####  ######",
    "#    ##    ## ##     ## ###   ## ##        ##  ##    ##",
    "#    ##       ##     ## ####  ## ##        ##  ##",
    "#    ##       ##     ## ## ## ## ######    ##  ##   ####",
    "#    ##       ##     ## ##  #### ##        ##  ##    ##",
    "#    ##    ## ##     ## ##   ### ##        ##  ##    ##",
    "#     ######   #######  ##    ## ##       ####  ######",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    "include $(__LP_LAUNCHPAD_CFG)",
    "",
    'LP_CFG_ARTIFACT_ENUMS="app" or "lib"',
    "$(call lp.fn.config.validate-enum, LP_CFG_ARTIFACT)",
    "",
    'LP_CFG_RUNTIME_ENUMS="node" or "web"',
    "$(call lp.fn.config.validate-enum, LP_CFG_RUNTIME)",
    "",
    'LP_CFG_MODULE_SYSTEM_ENUMS="cjs" or "esm"',
    "$(call lp.fn.config.validate-enum, LP_CFG_MODULE_SYSTEM)",
    "",
    'LP_CFG_BUNDLER_ENUMS="disabled" or "esbuild"',
    "$(call lp.fn.config.validate-enum, LP_CFG_BUNDLER)",
    "",
    "__LP_DEFAULT_DTS_BUNDLER=dts-bundle-generator",
    'LP_CFG_DTS_BUNDLER_ENUMS="disabled" or "$(__LP_DEFAULT_DTS_BUNDLER)"',
    "$(call lp.fn.config.validate-enum, LP_CFG_DTS_BUNDLER)",
    "",
    'LP_CFG_FORMATTER_ENUMS="disabled", "biome" or "prettier"',
    "$(call lp.fn.config.validate-enum, LP_CFG_FORMATTER)",
    "",
    'LP_CFG_PACKAGE_MANAGER_ENUMS="npm", "pnpm" or "yarn"',
    "$(call lp.fn.config.validate-enum, LP_CFG_PACKAGE_MANAGER)",
    "",
    'LP_CFG_INSTALLATION_MODE_ENUMS="local", "global", "temp", "npx", "pnpm-dlx" or "yarn-dlx"',
    "$(call lp.fn.config.validate-enum, LP_CFG_INSTALLATION_MODE)",
    "",
    "$(call lp.fn.config.normalize.string, LP_CFG_SRC_DIR)",
    "$(call lp.fn.config.assert.not-empty, LP_CFG_SRC_DIR)",
    "",
    'LP_CFG_UPLIFT_DEPENDENCIES_ENUMS="true" or "false"',
    "$(call lp.fn.config.validate-enum, LP_CFG_UPLIFT_DEPENDENCIES)",
    'ifeq "$(LP_CFG_UPLIFT_DEPENDENCIES)" "false"',
    "    LP_CFG_UPLIFT_DEPENDENCIES=",
    "endif",
    "",
    "$(call lp.fn.config.normalize.boolean, LP_CFG_UPLIFT_DEPENDENCIES)",
    "",
    "$(call lp.fn.config.normalize.string, LP_CFG_TSC_OUT_DIR)",
    'ifeq "$(LP_CFG_TSC_OUT_DIR)" ""',
    "    $(call lp.fn.config.fail, LP_CFG_TSC_OUT_DIR must not be empty)",
    "endif",
    "",
    'ifeq "$(LP_CFG_BUNDLER)" ""',
    '    ifneq "$(LP_CFG_DTS_BUNDLER)" ""',
    '        $(call lp.fn.config.fail, LP_CFG_DTS_BUNDLER must be "disabled" when LP_CFG_BUNDLER is "disabled" as well)',
    "    endif",
    "endif",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#    ##     ## ######## ##       ########",
    "#    ##     ## ##       ##       ##     ##",
    "#    ##     ## ##       ##       ##     ##",
    "#    ######### ######   ##       ########",
    "#    ##     ## ##       ##       ##",
    "#    ##     ## ##       ##       ##",
    "#    ##     ## ######## ######## ##",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    "__LP_HELP_ENABLED          =true",
    "__LP_EXTRA_DOTS            =",
    "__LP_HELP_TARGETS          =",
    "",
    "lp.help.disable            =$(call lp.fn.var.erase, __LP_HELP_ENABLED)",
    "lp.help.add-extra-dots     =$(call lp.fn.var.assign, __LP_EXTRA_DOTS, $(1))",
    "lp.help.add-target         =$(call lp.fn.var.append, __LP_HELP_TARGETS,$(subst $(__LP_BLANK),__LP_BLANK,$(strip $(1)) $(strip $(2))))",
    "",
    "lp.help.add-phony-target   =$(eval .PHONY: $(1))$(call lp.help.add-target, $(1), $(2))",
    "lp.help.add-builtin-target =$(call lp.help.add-target, $(strip $(1))$(__LP_EXTRA_DOTS), $(call lp.$(strip $(2)).get-description))",
    "lp.help.get-phony-targets  =help",
    "lp.help.get-description    =list all targets",
    "lp.help.is-enabled         =$(strip $(__LP_HELP_ENABLED))",
    "lp.help.print-targets      =$(foreach line, $(sort $(__LP_HELP_TARGETS)),$(info $(__LP_BLANK) $(subst __LP_BLANK,$(__LP_BLANK),$(line))))",
    "",
    "",
    "",
    "",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#   ########  ####    ###     ######   ##    ##  #######   ######  ######## ####  ######   ######",
    "#   ##     ##  ##    ## ##   ##    ##  ###   ## ##     ## ##    ##    ##     ##  ##    ## ##    ##",
    "#   ##     ##  ##   ##   ##  ##        ####  ## ##     ## ##          ##     ##  ##       ##",
    "#   ##     ##  ##  ##     ## ##   #### ## ## ## ##     ##  ######     ##     ##  ##        ######",
    "#   ##     ##  ##  ######### ##    ##  ##  #### ##     ##       ##    ##     ##  ##             ##",
    "#   ##     ##  ##  ##     ## ##    ##  ##   ### ##     ## ##    ##    ##     ##  ##    ## ##    ##",
    "#   ########  #### ##     ##  ######   ##    ##  #######   ######     ##    ####  ######   ######",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    "__LP_DIAGNOSTICS_ENABLED                =true",
    "__LP_DIAGNOSTICS_TARGET_NAMES           =help info debug",
    "",
    "lp.diagnostics.disable                  =$(call lp.fn.var.erase, __LP_DIAGNOSTICS_ENABLED)",
    "lp.diagnostics.set-target-names         =$(call lp.fn.var.assign, __LP_DIAGNOSTICS_TARGET_NAMES, $(1))",
    "lp.diagnostics.get-target-names         =$(__LP_DIAGNOSTICS_TARGET_NAMES)",
    "",
    "lp.diagnostics.is-enabled               =$(strip $(__LP_DIAGNOSTICS_ENABLED))",
    "",
    "",
    "lp.fn.print.property                    =$(info ) $(info $(strip $(1)):) $(info $(call lp.fn.map.empty-to, $(strip $(call $(2))), $(3)))",
    "lp.fn.print-diagnostics                 =$(call lp.fn.print.header, $(call lp.$(strip $(1)).get-name) settings) \\",
    "                                         $(call lp.fn.print.property, Enabled                , lp.$(strip $(1)).is-enabled             , false  ) \\",
    "                                         $(call lp.fn.print.property, Phony names            , lp.$(strip $(1)).get-phony-targets      , <none> ) \\",
    "                                         $(call lp.fn.print.property, Targets                , lp.$(strip $(1)).get-targets            , <none> ) \\",
    "                                         $(call lp.fn.print.property, Prerequisites          , lp.$(strip $(1)).get-prerequisites      , <none> ) \\",
    "                                         $(if $(filter bundle,$(strip $(1))), \\",
    "                                             $(call lp.fn.print.property, Commands           , lp.$(strip $(1)).get-commands           , <none> ) \\",
    "                                             , \\",
    "                                             $(call lp.fn.print.property, Default command    , lp.$(strip $(1)).get-default-command    , <none> ) \\",
    "                                             $(call lp.fn.print.property, Before-hooks       , lp.$(strip $(1)).get-before-hooks       , <none> ) \\",
    "                                             $(call lp.fn.print.property, Effective command  , lp.$(strip $(1)).get-effective-command  , <none> ) \\",
    "                                             $(call lp.fn.print.property, After-hooks        , lp.$(strip $(1)).get-after-hooks        , <none> ) \\",
    "                                             $(call lp.fn.print.property, Command with hooks , lp.$(strip $(1)).get-command-with-hooks , <none> ) \\",
    "                                         )",
    "",
    "# $1=target, $2=shortcut",
    "define lp.fn.create-diagnostics-target",
    ".PHONY: lp.$(1).$(2) lp.$(2).$(1) $(if $(call lp.diagnostics.is-enabled), $(1).$(2) $(2).$(1))",
    "lp.$(1).$(2) lp.$(2).$(1) $(if $(call lp.diagnostics.is-enabled), $(1).$(2) $(2).$(1)) : ;",
    "	$$(call lp.fn.print-diagnostics, $(1))",
    "endef",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#     ######   #######  ##     ## ########  #### ##       ########",
    "#    ##    ## ##     ## ###   ### ##     ##  ##  ##       ##",
    "#    ##       ##     ## #### #### ##     ##  ##  ##       ##",
    "#    ##       ##     ## ## ### ## ########   ##  ##       ######",
    "#    ##       ##     ## ##     ## ##         ##  ##       ##",
    "#    ##    ## ##     ## ##     ## ##         ##  ##       ##",
    "#     ######   #######  ##     ## ##        #### ######## ########",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    "__LP_TSC_ENABLED                        =true",
    "__LP_TSC_BUILDINFO                      =$(if $(LP_CFG_TSC_OUT_DIR),$(LP_CFG_TSC_OUT_DIR)/.tsbuildinfo,$(__LP_HOME_DIR)/.tsbuildinfo.tmp)",
    "__LP_TSC_DEFAULT_PREREQUISITES          =$(sort $(call lp.fn.wildcard, $(LP_CFG_SRC_DIR), *) $(__LP_TSCONFIG_JSON) $(__LP_MAKEFILES_AND_SETTINGS))",
    "__LP_TSC_EFFECTIVE_PREREQUISITES        =$(__LP_TSC_DEFAULT_PREREQUISITES)",
    "__LP_TSC_DEFAULT_TARGETS                =$(__LP_TSC_BUILDINFO)",
    "__LP_TSC_EFFECTIVE_TARGETS              =$(__LP_TSC_DEFAULT_TARGETS)",
    "__LP_TSC_DEFAULT_BEFORE_HOOKS           =",
    "__LP_TSC_EFFECTIVE_BEFORE_HOOKS         =$(__LP_TSC_DEFAULT_BEFORE_HOOKS)",
    "__LP_TSC_DEFAULT_AFTER_HOOKS            =",
    "__LP_TSC_EFFECTIVE_AFTER_HOOKS          =$(__LP_TSC_DEFAULT_AFTER_HOOKS)",
    "__LP_TSC_DEFAULT_COMMAND                =$(strip $(if $(LP_CFG_TSC_OUT_DIR), \\",
    "                                             tsc -b, \\",
    "                                             tsc --noEmit true \\",
    '                                                 --tsBuildInfoFile "$(__LP_TSC_BUILDINFO)" \\',
    "                                                 $(if $(call lp.bundle.is-dts-enabled), --declaration true) \\",
    '                                          )) && touch "$(__LP_TSC_BUILDINFO)"',
    "__LP_TSC_EFFECTIVE_COMMAND              =$(call lp.tsc.get-default-command)",
    "",
    "lp.tsc.disable                          =$(call lp.fn.var.erase, __LP_TSC_ENABLED)",
    "lp.tsc.add-extra-prerequisites          =$(call lp.fn.var.append, __LP_TSC_EFFECTIVE_PREREQUISITES, $(1))",
    "lp.tsc.overwrite-prerequisites          =$(call lp.fn.var.assign, __LP_TSC_EFFECTIVE_PREREQUISITES, $(1))",
    "lp.tsc.add-extra-targets                =$(call lp.fn.var.append, __LP_TSC_EFFECTIVE_TARGETS, $(1))",
    "lp.tsc.overwrite-targets                =$(call lp.fn.assert.param-not-empty, lp.tsc.overwrite-targets, $(1)) \\",
    "                                         $(call lp.fn.var.assign, __LP_TSC_EFFECTIVE_TARGETS, $(1))",
    "lp.tsc.add-before-hook                  =$(call lp.fn.var.append-with-separator, __LP_TSC_EFFECTIVE_BEFORE_HOOKS, &&, $(1))",
    "lp.tsc.overwrite-before-hooks           =$(call lp.fn.var.assign, __LP_TSC_EFFECTIVE_BEFORE_HOOKS, $(1))",
    "lp.tsc.add-after-hook                   =$(call lp.fn.var.append-with-separator, __LP_TSC_EFFECTIVE_AFTER_HOOKS, &&, $(1))",
    "lp.tsc.overwrite-after-hooks            =$(call lp.fn.var.assign, __LP_TSC_EFFECTIVE_AFTER_HOOKS, $(1))",
    "lp.tsc.overwrite-command                =$(call lp.fn.assert.param-not-empty, lp.tsc.overwrite-command, $(1)) \\",
    "                                         $(call lp.fn.var.assign, __LP_TSC_EFFECTIVE_COMMAND, $(1))",
    "",
    "lp.tsc.get-phony-targets                =compile tsc",
    "lp.tsc.get-name                         =Compile",
    "lp.tsc.get-description                  =compile TypeScript sources",
    "lp.tsc.is-enabled                       =$(strip $(__LP_TSC_ENABLED))",
    "lp.tsc.get-default-prerequisites        =$(sort $(strip $(__LP_TSC_DEFAULT_PREREQUISITES)))",
    "lp.tsc.get-prerequisites                =$(sort $(strip $(__LP_TSC_EFFECTIVE_PREREQUISITES)))",
    "lp.tsc.get-default-targets              =$(sort $(strip $(__LP_TSC_DEFAULT_TARGETS)))",
    "lp.tsc.get-targets                      =$(sort $(strip $(__LP_TSC_EFFECTIVE_TARGETS)))",
    "lp.tsc.get-default-before-hooks         =$(strip $(__LP_TSC_DEFAULT_BEFORE_HOOKS))",
    "lp.tsc.get-before-hooks                 =$(strip $(__LP_TSC_EFFECTIVE_BEFORE_HOOKS))",
    "lp.tsc.get-default-after-hooks          =$(strip $(__LP_TSC_DEFAULT_AFTER_HOOKS))",
    "lp.tsc.get-after-hooks                  =$(strip $(__LP_TSC_EFFECTIVE_AFTER_HOOKS))",
    "lp.tsc.get-default-command              =$(if $(1), echo $(1) && )$(strip $(__LP_TSC_DEFAULT_COMMAND))",
    "lp.tsc.get-effective-command            =$(strip $(__LP_TSC_EFFECTIVE_COMMAND))",
    "lp.tsc.get-command-with-hooks           =$(call lp.fn.get-command, tsc, $(1))",
    "",
    "LP_PREREQUISITE_TSC                     =$$(call lp.tsc.get-targets)",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#   ########  ##     ## ##    ## ########  ##       ########",
    "#   ##     ## ##     ## ###   ## ##     ## ##       ##",
    "#   ##     ## ##     ## ####  ## ##     ## ##       ##",
    "#   ########  ##     ## ## ## ## ##     ## ##       ######",
    "#   ##     ## ##     ## ##  #### ##     ## ##       ##",
    "#   ##     ## ##     ## ##   ### ##     ## ##       ##",
    "#   ########   #######  ##    ## ########  ######## ########",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    "__LP_BUNDLE_ENABLED                     =$(if $(LP_CFG_BUNDLER),true)",
    "__LP_BUNDLE_DEFAULT_PREREQUISITES       =$(call lp.tsc.get-targets) $(__LP_MAKEFILES_AND_SETTINGS)",
    "__LP_BUNDLE_EFFECTIVE_PREREQUISITES     =$(call lp.bundle.get-default-prerequisites)",
    "__LP_BUNDLE_DEFAULT_JS_TARGETS          =",
    "__LP_BUNDLE_EFFECTIVE_JS_TARGETS        =$(__LP_BUNDLE_DEFAULT_JS_TARGETS)",
    "__LP_BUNDLE_DEFAULT_DTS_TARGETS         =",
    "__LP_BUNDLE_EFFECTIVE_DTS_TARGETS       =$(__LP_BUNDLE_DEFAULT_DTS_TARGETS)",
    "__LP_BUNDLE_COMMANDS                    =",
    "",
    "__LP_BUNDLE_ALLOWED_OPTIONS             =minify web cli sourcemap inline-sources esm cjs dts shebang",
    "",
    "# $1=target, $2=command, $3=after-hook",
    "define lp.bundle.create-rule",
    "",
    "$(if $(__LP_BUNDLE_COMMANDS),$(eval __LP_BUNDLE_COMMANDS=$(__LP_BUNDLE_COMMANDS)__LP_LINE_BREAK))",
    "__LP_BUNDLE_COMMANDS=$(__LP_BUNDLE_COMMANDS)echo Bundling $(1)... && $(2) $(if $(3), && $(3))",
    "",
    "$(1) : $$(call lp.bundle.get-prerequisites)",
    "	echo Bundling $(1)... && $(2) $(if $(3), && $(3))",
    "",
    "endef",
    "",
    "# $1=target, $2=options, $3=cjs, $4=esm",
    "lp.bundle.get-module-system             =$(strip $(call lp.fn.if-contains, $(2), cjs, $3, \\",
    "                                                 $(call lp.fn.if-contains, $(2), esm, $4, \\",
    "                                                 $(call lp.fn.if-contains, $(1), %.cjs, $3, \\",
    "                                                 $(call lp.fn.if-contains, $(1), %.mjs, $4, \\",
    "                                                 $(call lp.fn.if-equal,$(LP_CFG_MODULE_SYSTEM), esm, $4, \\",
    "                                                 $3 \\",
    "                                          ))))))",
    "# $1=options, $2=web, $3=cli",
    "lp.bundle.get-runtime                   =$(strip $(call lp.fn.if-contains, $(1), web, $2, \\",
    "                                                 $(call lp.fn.if-contains, $(1), cli, $3, \\",
    "                                                 $(call lp.fn.if-equal,$(LP_CFG_RUNTIME), web, $2, \\",
    "                                                 $(3) \\",
    "                                          ))))",
    "# $1=src, $2=target, $3=options",
    'lp.bundle.get-js-command-esbuild        =esbuild "$(strip $(1))" \\',
    '                                                 "--outfile=$(strip $(2))" \\',
    "                                                 --bundle \\",
    "                                                 --log-level=error \\",
    "                                                 $(call lp.fn.if-contains, $(3), minify, --minify) \\",
    "                                                 --format=$(call lp.bundle.get-module-system,$(2),$(3),cjs,esm) \\",
    "                                                 $(call lp.fn.if-contains, \\",
    "                                                         $(3), \\",
    "                                                         sourcemap inline-sources, \\",
    "                                                         --sourcemap=linked \\",
    "                                                  ) \\",
    "                                                 $(call lp.fn.if-contains, \\",
    "                                                        $(3), \\",
    "                                                        inline-sources, \\",
    "                                                        --sources-content=true \\",
    "                                                  ) \\",
    "                                                 $(call lp.fn.if-equal, \\",
    "                                                        $(call lp.bundle.get-runtime,$(3),web,cli), \\",
    "                                                        web, \\",
    "                                                        --platform=browser --target=es6 --jsx=transform, \\",
    "                                                        --platform=node --target=es2022 \\",
    "                                                  ) \\",
    "                                                 $(call lp.fn.if-contains, \\",
    "                                                        $(3), \\",
    "                                                        shebang hashbang, \\",
    '                                                        "--banner:js=#!/usr/bin/env node" \\',
    "                                                  )",
    "# $1=src, $2=target, $3=options",
    "lp.bundle.get-js-command-               =$(error lp.bundle.add can't be called when bundling is disabled)",
    "lp.bundle.get-js-command                =$(call lp.bundle.get-js-command-$(LP_CFG_BUNDLER),$(1),$(2),$(3))",
    "",
    "# $1=src, $2=target, $3=options",
    'lp.bundle.get-dts-command-dts-bundle-generator=dts-bundle-generator "$(strip $(1))" -o "$(strip $(2))" --no-banner --silent',
    `lp.bundle.get-dts-command-              =$(error lp.bundle.add can't be called with the "dts" option when dts-bundling is disabled)`,
    "lp.bundle.get-dts-command               =$(call lp.bundle.get-dts-command-$(LP_CFG_DTS_BUNDLER),$(1),$(2),$(3))",
    "",
    "# $1=src, $2=target, $3=options, $4=after-hook",
    "lp.bundle.create-js-rule                =$(call lp.bundle.add-extra-js-targets, $(2)) \\",
    "                                         $(eval $(call lp.bundle.create-rule,$(2),$(call lp.bundle.get-js-command,$(1),$(2),$(3)),$(4)))",
    "lp.bundle.create-dts-rule               =$(call lp.bundle.add-extra-dts-targets, $(2)) \\",
    "                                         $(eval $(call lp.bundle.create-rule,$(2),$(call lp.bundle.get-dts-command,$(1),$(2),$(3)),$(4)))",
    "",
    "lp.bundle.js-extension-to-dts           =$(strip $(patsubst %.mjs,%.d.ts,$(patsubst %.cjs,%.d.ts,$(patsubst %.js,%.d.ts,$(1)))))",
    "",
    "",
    "lp.bundle.validate-options              =$(if $(filter-out $(__LP_BUNDLE_ALLOWED_OPTIONS),$(1)), \\",
    "                                            $(error Invalid option(s) for lp.bundle.add: $(filter-out $(__LP_BUNDLE_ALLOWED_OPTIONS),$(1)) (allowed values: $(__LP_BUNDLE_ALLOWED_OPTIONS))) \\",
    "                                          ) \\",
    `                                         $(if $(filter esm, $(1)), $(if $(filter cjs, $(1)), $(error lp.bundle.add options "cjs" and "esm" can't be used at the same time))) \\`,
    `                                         $(if $(filter cli, $(1)), $(if $(filter web, $(1)), $(error lp.bundle.add options "cli" and "web" can't be used at the same time)))`,
    "",
    "# $1=src, $2=target, $3=options, $4=after-hook-js, $5=after-hook-dts",
    "lp.bundle.add                           =$(if $(LP_CFG_BUNDLER),,$(error lp.bundle.add can't be called when bundling is disabled)) \\",
    "                                         $(call lp.bundle.validate-options,$(strip $(3))) \\",
    "                                         $(call lp.bundle.create-js-rule,$(strip $(1)),$(strip $(2)),$(strip $(3)),$(strip $(4))) \\",
    "                                         $(if $(filter dts,$(strip $(3))), \\",
    `                                              $(if $(LP_CFG_DTS_BUNDLER),,$(error lp.bundle.add can't be called with the "dts" option when dts-bundling is disabled)) \\`,
    "                                              $(call lp.bundle.create-dts-rule,$(strip $(1)),$(call lp.bundle.js-extension-to-dts,$(strip $(2))),$(strip $(3)),$(strip $(5))) \\",
    "                                          )",
    "",
    "lp.bundle.assert-no-commands            =$(if $(__LP_BUNDLE_COMMANDS),$(error $(strip $(1)) must be called before adding any bundles))",
    "",
    "lp.bundle.disable                       =$(call lp.fn.var.erase, __LP_BUNDLE_ENABLED)",
    "lp.bundle.add-extra-prerequisites       =$(call lp.bundle.assert-no-commands, lp.bundle.add-extra-prerequisites) \\",
    "                                         $(call lp.fn.var.append, __LP_BUNDLE_EFFECTIVE_PREREQUISITES, $(1))",
    "lp.bundle.overwrite-prerequisites       =$(call lp.bundle.assert-no-commands, lp.bundle.overwrite-prerequisites) \\",
    "                                         $(call lp.fn.var.assign, __LP_BUNDLE_EFFECTIVE_PREREQUISITES, $(1))",
    "lp.bundle.add-extra-js-targets          =$(call lp.fn.var.append, __LP_BUNDLE_EFFECTIVE_JS_TARGETS, $(1))",
    "lp.bundle.add-extra-dts-targets         =$(call lp.fn.var.append, __LP_BUNDLE_EFFECTIVE_DTS_TARGETS, $(1))",
    "lp.bundle.overwrite-js-targets          =$(call lp.fn.var.assign, __LP_BUNDLE_EFFECTIVE_JS_TARGETS, $(1))",
    "lp.bundle.overwrite-dts-targets         =$(call lp.fn.var.assign, __LP_BUNDLE_EFFECTIVE_DTS_TARGETS, $(1))",
    "",
    "lp.bundle.get-phony-targets             =bundle",
    "lp.bundle.get-name                      =Bundle",
    "lp.bundle.get-description               =create bundles",
    "lp.bundle.is-enabled                    =$(strip $(__LP_BUNDLE_ENABLED))",
    "lp.bundle.is-dts-enabled                =$(if $(__LP_BUNDLE_EFFECTIVE_DTS_TARGETS),true)",
    "lp.bundle.get-default-prerequisites     =$(sort $(strip $(__LP_BUNDLE_DEFAULT_PREREQUISITES)))",
    "lp.bundle.get-prerequisites             =$(sort $(strip $(__LP_BUNDLE_EFFECTIVE_PREREQUISITES)))",
    "lp.bundle.get-default-js-targets        =$(sort $(strip $(__LP_BUNDLE_DEFAULT_JS_TARGETS)))",
    "lp.bundle.get-default-dts-targets       =$(sort $(strip $(__LP_BUNDLE_DEFAULT_DTS_TARGETS)))",
    "lp.bundle.get-default-targets           =$(sort $(call lp.bundle.get-default-js-targets) $(call lp.bundle.get-default-dts-targets))",
    "lp.bundle.get-js-targets                =$(sort $(strip $(__LP_BUNDLE_EFFECTIVE_JS_TARGETS)))",
    "lp.bundle.get-dts-targets               =$(sort $(strip $(__LP_BUNDLE_EFFECTIVE_DTS_TARGETS)))",
    "lp.bundle.get-targets                   =$(sort $(call lp.bundle.get-js-targets) $(call lp.bundle.get-dts-targets))",
    "",
    "lp.bundle.get-default-command           =<n/a>",
    "lp.bundle.get-before-hooks              =<n/a>",
    "lp.bundle.get-effective-command         =<n/a>",
    "lp.bundle.get-after-hooks               =<n/a>",
    "lp.bundle.get-commands                  =$(if $(__LP_BUNDLE_COMMANDS),$(__LP_BUNDLE_COMMANDS),<none>)",
    "",
    "LP_PREREQUISITE_BUNDLE                  =$$(call lp.bundle.get-targets)",
    "LP_PREREQUISITE_BUNDLE_JS               =$$(call lp.bundle.get-js-targets)",
    "LP_PREREQUISITE_BUNDLE_DTS              =$$(call lp.bundle.get-dts-targets)",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#    ########  #######  ########  ##     ##    ###    ########",
    "#    ##       ##     ## ##     ## ###   ###   ## ##      ##",
    "#    ##       ##     ## ##     ## #### ####  ##   ##     ##",
    "#    ######   ##     ## ########  ## ### ## ##     ##    ##",
    "#    ##       ##     ## ##   ##   ##     ## #########    ##",
    "#    ##       ##     ## ##    ##  ##     ## ##     ##    ##",
    "#    ##        #######  ##     ## ##     ## ##     ##    ##",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    "__LP_FORMAT_EXTENSIONS_prettier         =ts tsx js jsx json html htm css less sass",
    "__LP_FORMAT_EXTENSIONS_biome            =ts tsx js jsx json # html htm css less sass",
    "__LP_FORMAT_EXTENSIONS                  =$(__LP_FORMAT_EXTENSIONS_$(LP_CFG_FORMATTER))",
    "",
    "__LP_FORMAT_ENABLED                     =$(if $(LP_CFG_FORMATTER),true)",
    "__LP_FORMAT_DEFAULT_BEFORE_HOOKS        =",
    "__LP_FORMAT_EFFECTIVE_BEFORE_HOOKS      =$(__LP_FORMAT_DEFAULT_BEFORE_HOOKS)",
    "__LP_FORMAT_DEFAULT_AFTER_HOOKS         =",
    "__LP_FORMAT_EFFECTIVE_AFTER_HOOKS       =$(__LP_FORMAT_DEFAULT_AFTER_HOOKS)",
    "__LP_FORMAT_DEFAULT_COMMAND_prettier    =prettier --write --ignore-unknown $(patsubst %, '%', $(call lp.format.get-paths))",
    "__LP_FORMAT_DEFAULT_COMMAND_biome       =biome format --write --files-ignore-unknown=true $(patsubst %, '%', $(call lp.format.get-paths))",
    "__LP_FORMAT_DEFAULT_COMMAND             =$(__LP_FORMAT_DEFAULT_COMMAND_$(LP_CFG_FORMATTER))",
    "__LP_FORMAT_EFFECTIVE_COMMAND           =$(if $(__LP_FORMAT_EFFECTIVE_PATHS),$(call lp.format.get-default-command))",
    "__LP_FORMAT_DEFAULT_PATHS               =$(filter-out .launchpad .vscode .yarn node_modules $(LP_CFG_TSC_OUT_DIR), \\",
    "                                                      $(call lp.fn.normalize.file-paths, $(wildcard */))) \\",
    "                                         $(filter-out pnpm-lock% .npmrc package-lock% .yarnrc% yarn.lock, \\",
    "                                                      $(wildcard $(foreach EXTENSION, $(__LP_FORMAT_EXTENSIONS),*.$(EXTENSION))))",
    "__LP_FORMAT_CUSTOM_DEFAULT_PATHS        =$(__LP_FORMAT_DEFAULT_PATHS)",
    "__LP_FORMAT_CUSTOM_INCLUDED_PATHS       =",
    "__LP_FORMAT_CUSTOM_EXCLUDED_PATHS       =",
    "__LP_FORMAT_EFFECTIVE_PATHS             =$(filter-out $(wildcard $(__LP_FORMAT_CUSTOM_EXCLUDED_PATHS)),\\",
    "                                                      $(wildcard $(__LP_FORMAT_CUSTOM_DEFAULT_PATHS) $(__LP_FORMAT_CUSTOM_INCLUDED_PATHS)))",
    "",
    "lp.format.disable                       =$(call lp.fn.var.erase, __LP_FORMAT_ENABLED)",
    "lp.format.add-before-hook               =$(call lp.fn.var.append-with-separator, __LP_FORMAT_EFFECTIVE_BEFORE_HOOKS, &&, $(1))",
    "lp.format.overwrite-before-hooks        =$(call lp.fn.var.assign, __LP_FORMAT_EFFECTIVE_BEFORE_HOOKS, $(1))",
    "lp.format.add-after-hook                =$(call lp.fn.var.append-with-separator, __LP_FORMAT_EFFECTIVE_AFTER_HOOKS, &&, $(1))",
    "lp.format.overwrite-after-hooks         =$(call lp.fn.var.assign, __LP_FORMAT_EFFECTIVE_AFTER_HOOKS, $(1))",
    "lp.format.overwrite-command             =$(call lp.fn.assert.param-not-empty, lp.format.overwrite-command, $(1)) \\",
    "                                         $(call lp.fn.var.assign, __LP_FORMAT_EFFECTIVE_COMMAND, $(1))",
    "",
    "lp.format.exclude                       =$(call lp.fn.var.append, __LP_FORMAT_CUSTOM_EXCLUDED_PATHS, $(1))",
    "lp.format.include                       =$(call lp.fn.var.append, __LP_FORMAT_CUSTOM_INCLUDED_PATHS, $(1))",
    "lp.format.include-only                  =$(call lp.fn.var.assign, __LP_FORMAT_CUSTOM_DEFAULT_PATHS, $(1)) \\",
    "                                         $(call lp.fn.var.erase, __LP_FORMAT_CUSTOM_INCLUDED_PATHS) \\",
    "                                         $(call lp.fn.var.erase, __LP_FORMAT_CUSTOM_EXCLUDED_PATHS)",
    "",
    "lp.format.get-phony-targets             =format reformat",
    "lp.format.get-name                      =Format",
    "lp.format.get-description               =format sources with $(LP_CFG_FORMATTER)",
    "lp.format.is-enabled                    =$(strip $(__LP_FORMAT_ENABLED))",
    "lp.format.get-default-prerequisites     =<n/a>",
    "lp.format.get-prerequisites             =",
    "lp.format.get-default-targets           =<n/a>",
    "lp.format.get-targets                   =",
    "lp.format.get-default-before-hook       =$(strip $(__LP_FORMAT_DEFAULT_BEFORE_HOOKS))",
    "lp.format.get-before-hooks              =$(strip $(__LP_FORMAT_EFFECTIVE_BEFORE_HOOKS))",
    "lp.format.get-default-after-hook        =$(strip $(__LP_FORMAT_DEFAULT_AFTER_HOOKS))",
    "lp.format.get-after-hooks               =$(strip $(__LP_FORMAT_EFFECTIVE_AFTER_HOOKS))",
    "lp.format.get-default-command           =$(if $(1), echo $(1) && )$(strip $(__LP_FORMAT_DEFAULT_COMMAND))",
    "lp.format.get-effective-command         =$(strip $(__LP_FORMAT_EFFECTIVE_COMMAND))",
    "lp.format.get-command-with-hooks        =$(call lp.fn.get-command, format, $(1))",
    "lp.format.get-default-paths             =$(sort $(strip $(__LP_FORMAT_DEFAULT_PATHS)))",
    "lp.format.get-paths                     =$(wildcard $(sort $(strip $(__LP_FORMAT_EFFECTIVE_PATHS))))",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#   ##     ## ########  ##       #### ######## ########",
    "#   ##     ## ##     ## ##        ##  ##          ##",
    "#   ##     ## ##     ## ##        ##  ##          ##",
    "#   ##     ## ########  ##        ##  ######      ##",
    "#   ##     ## ##        ##        ##  ##          ##",
    "#   ##     ## ##        ##        ##  ##          ##",
    "#    #######  ##        ######## #### ##          ##",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    "__LP_UPLIFT_ENABLED                     =true",
    "__LP_UPLIFT_DEFAULT_BEFORE_HOOKS        =",
    "__LP_UPLIFT_EFFECTIVE_BEFORE_HOOKS      =$(__LP_UPLIFT_DEFAULT_BEFORE_HOOKS)",
    "__LP_UPLIFT_DEFAULT_AFTER_HOOKS         =",
    "__LP_UPLIFT_EFFECTIVE_AFTER_HOOKS       =$(__LP_UPLIFT_DEFAULT_AFTER_HOOKS)",
    "__LP_UPLIFT_DEFAULT_COMMAND             =.launchpad/uplift",
    "__LP_UPLIFT_EFFECTIVE_COMMAND           =$(__LP_UPLIFT_DEFAULT_COMMAND)",
    "",
    "lp.uplift.disable                       =$(call lp.fn.var.erase, __LP_UPLIFT_ENABLED)",
    "lp.uplift.add-before-hook               =$(call lp.fn.var.append-with-separator, __LP_UPLIFT_EFFECTIVE_BEFORE_HOOKS, &&, $(1))",
    "lp.uplift.overwrite-before-hooks        =$(call lp.fn.var.assign, __LP_UPLIFT_EFFECTIVE_BEFORE_HOOKS, $(1))",
    "lp.uplift.add-after-hook                =$(call lp.fn.var.append-with-separator, __LP_UPLIFT_EFFECTIVE_AFTER_HOOKS, &&, $(1))",
    "lp.uplift.overwrite-after-hooks         =$(call lp.fn.var.assign, __LP_UPLIFT_EFFECTIVE_AFTER_HOOKS, $(1))",
    "lp.uplift.overwrite-command             =$(call lp.fn.assert.param-not-empty, lp.uplift.overwrite-command, $(1)) \\",
    "                                         $(call lp.fn.var.assign, __LP_UPLIFT_EFFECTIVE_COMMAND, $(1))",
    "",
    "lp.uplift.get-phony-targets             =uplift",
    "lp.uplift.get-name                      =Uplift",
    "lp.uplift.get-description               =uplift launchpad",
    "lp.uplift.is-enabled                    =$(strip $(__LP_UPLIFT_ENABLED))",
    "lp.uplift.get-default-prerequisites     =<n/a>",
    "lp.uplift.get-prerequisites             =",
    "lp.uplift.get-default-targets           =<n/a>",
    "lp.uplift.get-targets                   =",
    "lp.uplift.get-default-before-hook       =$(strip $(__LP_UPLIFT_DEFAULT_BEFORE_HOOKS))",
    "lp.uplift.get-before-hooks              =$(strip $(__LP_UPLIFT_EFFECTIVE_BEFORE_HOOKS))",
    "lp.uplift.get-default-after-hook        =$(strip $(__LP_UPLIFT_DEFAULT_AFTER_HOOKS))",
    "lp.uplift.get-after-hooks               =$(strip $(__LP_UPLIFT_EFFECTIVE_AFTER_HOOKS))",
    "lp.uplift.get-default-command           =$(if $(1), echo $(1) && )$(strip $(__LP_UPLIFT_DEFAULT_COMMAND))",
    "lp.uplift.get-effective-command         =$(strip $(__LP_UPLIFT_EFFECTIVE_COMMAND))",
    "lp.uplift.get-command-with-hooks        =$(call lp.fn.get-command, uplift, $(1))",
    "",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#     ######  ##       ########    ###    ##    ##",
    "#    ##    ## ##       ##         ## ##   ###   ##",
    "#    ##       ##       ##        ##   ##  ####  ##",
    "#    ##       ##       ######   ##     ## ## ## ##",
    "#    ##       ##       ##       ######### ##  ####",
    "#    ##    ## ##       ##       ##     ## ##   ###",
    "#     ######  ######## ######## ##     ## ##    ##",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    "__LP_CLEAN_ENABLED                      =true",
    "__LP_CLEAN_DEFAULT_COMMAND              =rm -rf $(call lp.clean.get-files)",
    "__LP_CLEAN_EFFECTIVE_COMMAND            =$(__LP_CLEAN_DEFAULT_COMMAND)",
    "__LP_CLEAN_FILES                        =.launchpad/NON_EXISTENT_FILE",
    "__LP_CLEAN_DELETE_BUNDLES               =",
    "",
    "lp.clean.disable                        =$(call lp.fn.var.erase, __LP_CLEAN_ENABLED)",
    "lp.clean.overwrite-command              =$(call lp.fn.assert.param-not-empty, lp.clean.overwrite-command, $(1)) \\",
    "                                         $(call lp.fn.var.assign, __LP_CLEAN_EFFECTIVE_COMMAND, $(1))",
    "",
    "lp.clean.npm-packages                   =$(call lp.clean.files, node_modules)",
    "lp.clean.tsc-output                     =$(call lp.clean.files, $(if $(strip $(LP_CFG_TSC_OUT_DIR)), $(LP_CFG_TSC_OUT_DIR), $(__LP_TSC_BUILDINFO)))",
    "lp.clean.bundles                        =$(call lp.fn.var.assign, __LP_CLEAN_DELETE_BUNDLES, true)",
    "lp.clean.files                          =$(call lp.fn.var.append, __LP_CLEAN_FILES, $(1))",
    "",
    "lp.clean.get-phony-targets              =clean",
    "lp.clean.get-name                       =Clean",
    "lp.clean.get-description                =delete temporary files",
    "lp.clean.is-enabled                     =$(strip $(__LP_CLEAN_ENABLED))",
    "lp.clean.get-default-prerequisites      =<n/a>",
    "lp.clean.get-prerequisites              =",
    "lp.clean.get-default-targets            =<n/a>",
    "lp.clean.get-targets                    =",
    "lp.clean.get-default-before-hooks       =<n/a>",
    "lp.clean.get-before-hooks               =",
    "lp.clean.get-default-after-hooks        =<n/a>",
    "lp.clean.get-after-hooks                =",
    "lp.clean.get-default-command            =$(if $(1), echo $(1) && )$(strip $(__LP_CLEAN_DEFAULT_COMMAND))",
    "lp.clean.get-effective-command          =$(strip $(__LP_CLEAN_EFFECTIVE_COMMAND))",
    "lp.clean.get-command-with-hooks         =$(call lp.fn.get-command, clean, $(1))",
    "lp.clean.get-files                      =$(strip $(sort \\",
    "                                             $(__LP_CLEAN_FILES) \\",
    "                                             $(if $(__LP_CLEAN_DELETE_BUNDLES), \\",
    "                                                  $(call lp.bundle.get-targets) \\",
    "                                                  $(patsubst %.js, %.d.ts, $(call lp.bundle.get-targets)) \\",
    "                                                  $(patsubst %.js, %.js.map, $(call lp.bundle.get-targets)) \\",
    "                                              ) \\",
    "                                          ))",
    "",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "#",
    "#    ########  ##     ## ##    ##",
    "#    ##     ## ##     ## ###   ##",
    "#    ##     ## ##     ## ####  ##",
    "#    ########  ##     ## ## ## ##",
    "#    ##   ##   ##     ## ##  ####",
    "#    ##    ##  ##     ## ##   ###",
    "#    ##     ##  #######  ##    ##",
    "#",
    "#-----------------------------------------------------------------------------------------------------------------------",
    "",
    "lp.run.js                               =node $(1)",
    "lp.run.ts                               =$(call lp.fn.if-equal, $(LP_CFG_MODULE_SYSTEM), esm, \\",
    "                                                                ts-node-esm, \\",
    "                                                                ts-node \\",
    "                                          ) $(1)",
    "lp.run                                  =$(if $(filter %.ts,$(lastword $(strip $(1)))),\\",
    "                                              $(call lp.run.ts,$(1)),\\",
    "                                              $(call lp.run.js,$(1)) \\",
    "                                          )",
    ""
  ].join("\n"),
  ".launchpad/tsconfig.default.json": [
    "{",
    '    "compilerOptions": {',
    '        "allowArbitraryExtensions": false,',
    '        "allowImportingTsExtensions": false,',
    '        "allowJs": false,',
    '        "allowSyntheticDefaultImports": false,',
    '        "allowUmdGlobalAccess": false,',
    '        "allowUnreachableCode": false,',
    '        "allowUnusedLabels": false,',
    '        "alwaysStrict": true,',
    '        "baseUrl": "../src",',
    '        "composite": false,',
    '        "declaration": false,',
    '        "declarationMap": false,',
    '        "disableReferencedProjectLoad": false,',
    '        "disableSolutionSearching": false,',
    '        "disableSourceOfProjectReferenceRedirect": false,',
    '        "downlevelIteration": false,',
    '        "emitBOM": false,',
    '        "emitDeclarationOnly": false,',
    '        "emitDecoratorMetadata": false,',
    '        "esModuleInterop": true,',
    '        "exactOptionalPropertyTypes": true,',
    '        "experimentalDecorators": false,',
    '        "forceConsistentCasingInFileNames": true,',
    '        "importHelpers": false,',
    '        "incremental": true,',
    '        "inlineSourceMap": false,',
    '        "inlineSources": false,',
    '        "isolatedModules": true,',
    '        "module": "commonjs",',
    '        "moduleDetection": "force",',
    '        "moduleResolution": "node10",',
    '        "newLine": "lf",',
    '        "noEmit": false,',
    '        "noEmitHelpers": false,',
    '        "noEmitOnError": true,',
    '        "noFallthroughCasesInSwitch": true,',
    '        "noImplicitAny": true,',
    '        "noImplicitOverride": true,',
    '        "noImplicitReturns": true,',
    '        "noImplicitThis": true,',
    '        "noLib": false,',
    '        "noPropertyAccessFromIndexSignature": true,',
    '        "noUncheckedIndexedAccess": true,',
    '        "noUnusedLocals": true,',
    '        "noUnusedParameters": true,',
    '        "outDir": "../build",',
    '        "preserveConstEnums": true,',
    '        "preserveSymlinks": false,',
    '        "removeComments": true,',
    '        "resolveJsonModule": true,',
    '        "skipLibCheck": true,',
    '        "sourceMap": true,',
    '        "strict": true,',
    '        "strictBindCallApply": true,',
    '        "strictFunctionTypes": true,',
    '        "strictNullChecks": true,',
    '        "strictPropertyInitialization": true,',
    '        "stripInternal": true,',
    '        "target": "es2022",',
    '        "tsBuildInfoFile": "../build/.tsbuildinfo",',
    '        "useDefineForClassFields": true,',
    '        "useUnknownInCatchVariables": true,',
    '        "verbatimModuleSyntax": false',
    "    },",
    '    "include": [',
    '        "../src/**/*.ts"',
    "    ]",
    "}"
  ].join("\n"),
  ".launchpad/uplift": [
    "#!/usr/bin/env bash",
    "",
    "# shellcheck disable=SC2046",
    "npm install \\",
    `    $(npm list -p | grep 'node_modules[/\\\\]' | sed 's|\\r||g;s|\\\\|/|g;s|.*node_modules/||;s|^|"|;s|$|@latest"|' | grep -v "@types/node") \\`,
    "    @types/node@$(node --version | sed 's|^v||;s|\\..*||')",
    ""
  ].join("\n"),
  "resources/templates/index.css": [
    "html {",
    "    font-family: sans-serif;",
    "}",
    ""
  ].join("\n"),
  "resources/templates/index.html": [
    "<!DOCTYPE html>",
    '<html lang="en">',
    "    <head>",
    '        <meta charset="UTF-8" />',
    '        <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    "        <title><!-- PROJECT_NAME --></title>",
    '        <link href="index.css" rel="stylesheet" type="text/css" />',
    "    </head>",
    "    <body>",
    "        This is <!-- PROJECT_NAME -->",
    "    </body>",
    "</html>",
    "",
    "<!-- JAVASCRIPT -->",
    ""
  ].join("\n")
};

// src/migration/actions/create-index-css.ts
function createIndexCss(context) {
  if (context.newConfig.createProjectTemplate && "web" === context.newConfig.runtime.value) {
    const css = context.files.get(`${context.newConfig.webAppDir}/index.css`);
    if (!css.exists) {
      css.contents = adjustTabSize(ASSETS["resources/templates/index.css"], 4, context.newConfig.tabSize);
    }
  }
}

// src/migration/actions/create-index-html.ts
var import_path = require("path");
function createIndexHtml(context) {
  if (context.newConfig.createProjectTemplate && "web" === context.newConfig.runtime.value) {
    const html = context.files.get(`${context.newConfig.webAppDir}/index.html`);
    if (!html.exists) {
      const contents = ASSETS["resources/templates/index.html"].replace(/<!--\s*PROJECT_NAME\s*-->/g, context.newConfig.projectName).replace(/<!--\s*JAVASCRIPT\s*-->/g, getScriptTag(context));
      html.contents = adjustTabSize(contents, 4, context.newConfig.tabSize);
    }
  }
}
function getScriptTag(context) {
  const path = getRelativeJsMainModulePath(context);
  return "esm" === context.newConfig.moduleSystem ? `<script src="${path}" charset="utf-8" type="module"></script>` : `<script src="${path}" charset="utf-8"></script>`;
}
function getRelativeJsMainModulePath(context) {
  const usesBundler = "disabled" !== context.newConfig.bundler.value;
  const jsDirectory = usesBundler ? context.newConfig.bundlerOutDir : context.newConfig.tscOutDir;
  const fileName = `${context.newConfig.projectName}.js`;
  const htmlDirectory = context.newConfig.webAppDir;
  const relativePath = (0, import_path.relative)(htmlDirectory, jsDirectory).replaceAll("\\", "/");
  const normalizedRelativePath = relativePath ? `${relativePath}/` : "";
  return htmlDirectory === jsDirectory ? fileName : `${normalizedRelativePath}${fileName}`;
}

// src/migration/actions/create-main-module.ts
function createMainModule(context) {
  if (context.newConfig.createProjectTemplate) {
    const mainModule = context.files.get(context.mainModulePath);
    if (!mainModule.exists) {
      const message = `This is ${context.newConfig.projectName}`;
      mainModule.contents = `console.log(${JSON.stringify(message)});`;
    }
  }
}

// src/migration/actions/create-makefile.ts
var SEPARATOR_LINE2 = `#${new Array(119).fill("-").join("")}`;
function createMakefile(context) {
  const makefile = context.files.get("Makefile");
  if (context.newConfig.createMakefile && !makefile.exists) {
    makefile.lines = [
      "include .launchpad/Makefile.header # see .launchpad/Makefile.documentation",
      ...getDefaultTargetSection(context.newConfig),
      ...getBundleSection(context.newConfig),
      ...getCleanSection(context.newConfig),
      "",
      "",
      "",
      "",
      "",
      SEPARATOR_LINE2,
      "include .launchpad/Makefile.footer"
    ];
  }
}
function getDefaultTargetSection({ bundler, runtime, tscOutDir, bundlerOutDir, projectName }) {
  const header = getSpacedSeparator("Default target");
  const prerequisites = bundler.value === "disabled" ? "LP_PREREQUISITE_TSC" : "LP_PREREQUISITE_BUNDLE";
  const comment = bundler.value === "disabled" ? "" : " # or $(LP_PREREQUISITE_BUNDLE_JS) + $(LP_PREREQUISITE_BUNDLE_DTS)";
  if ("web" === runtime.value) {
    return [...header, `autorun : $(${prerequisites});${comment}`];
  } else {
    runtime.value;
    const directory = "disabled" === bundler.value ? tscOutDir : bundlerOutDir;
    const script = `${directory}/${projectName}.js`;
    return [...header, `autorun : $(${prerequisites})${comment}`, `	$(call lp.run, ${script})`];
  }
}
function getBundleSection({ srcDir, projectName, bundlerOutDir, bundler, artifact, dtsBundler, runtime }) {
  if ("disabled" === bundler.value) {
    return [];
  } else {
    const options = [
      "sourcemap",
      "lib" === artifact && "disabled" !== dtsBundler.value ? ["dts"] : [],
      "app" === artifact && "web" !== runtime.value ? ["shebang"] : []
    ].flatMap((option) => option).map((option) => option.trim()).filter((option) => option).join(" ");
    return [
      ...getSpacedSeparator("Bundling"),
      `$(call lp.bundle.add, ${srcDir}/${projectName}.ts, ${bundlerOutDir}/${projectName}.js, ${options})`
    ];
  }
}
function getCleanSection({ bundler, bundlerOutDir, tscOutDir, webAppDir }) {
  const shouldCleanTscOutput = "disabled" !== bundler.value && !bundlerOutDir.startsWith(tscOutDir) && (!webAppDir || !webAppDir.startsWith(tscOutDir));
  return [
    ...getSpacedSeparator("Clean"),
    `${shouldCleanTscOutput ? "" : "# "}$(call lp.clean.tsc-output)`,
    ..."disabled" === bundler.value ? [] : [`# $(call lp.clean.bundles)`],
    "# $(call lp.clean.npm-packages)",
    "# $(call lp.clean.files, list files here...)"
  ];
}
function getSpacedSeparator(title) {
  return ["", SEPARATOR_LINE2, `# ${title}`, SEPARATOR_LINE2, ""];
}

// src/migration/actions/create-output-directories.ts
function createOutputDirectories(context) {
  const config = context.newConfig;
  const { tscOutDir, bundlerOutDir } = config;
  if (bundlerOutDir) {
    context.directories.get(bundlerOutDir).create();
  } else {
    context.directories.get(tscOutDir).create();
  }
}

// src/migration/actions/create-tsconfig-json.ts
function createTsconfigJson(context) {
  const tsconfigJson = context.files.get(TSCONFIG_JSON);
  if (!tsconfigJson.exists) {
    tsconfigJson.json = {
      extends: "./.launchpad/tsconfig.default.json"
    };
  }
}

// src/migration/actions/install-or-upgrade-npm-packages.ts
function installOrUpgradeNpmPackages(context) {
  const dependencies = context.fileOperations.packageJson.getAllDependencies();
  if (dependencies.length) {
    const hasNodeModules = context.directories.get("node_modules").exists;
    const packageManager = getPackageManager(context);
    const { operation, upliftDependenciesOverride } = context;
    if ("uplift" === operation && (context.newConfig.upliftDependencies || upliftDependenciesOverride)) {
      context.addExternalCommand(
        "Upgrading all dependencies",
        packageManager.upgradeAllPackagesCommand ?? packageManager.getUpgradePackagesCommand(dependencies)
      );
    } else if ("uplift" !== operation || !hasNodeModules) {
      context.addExternalCommand("Installing dependencies", packageManager.installCommand);
    }
  }
}

// src/migration/actions/recreate-launchpad-directory-makefiles.ts
function recreateLaunchpadDirectoryMakefiles(context) {
  const files = [LAUNCHPAD_MAKEFILE_DOCUMENTATION, LAUNCHPAD_MAKEFILE_HEADER, LAUNCHPAD_MAKEFILE_FOOTER];
  files.forEach((makefile) => context.files.get(makefile).contents = ASSETS[makefile]);
}

// src/config/config-serializer.ts
function serializeConfig(config) {
  const header = [
    "#-----------------------------------------------------------------------------------------------------------------------",
    '# Do not edit this file manually. Run "launchpad init" to reconfigure/reset the project.',
    "#-----------------------------------------------------------------------------------------------------------------------"
  ];
  const properties = ConfigProperties.arrays.current.map((property) => property.serialize(config));
  const maxKeyLength = properties.reduce((max, property) => Math.max(max, property?.key.length ?? 0), 0);
  const maxValueLength = properties.reduce((max, property) => Math.max(max, property?.value.length ?? 0), 0);
  const lines = properties.map((property) => property ? formatProperty(property, maxKeyLength, maxValueLength) : "");
  return [...header, "", ...lines.filter((line) => line)].map((line) => line.trim()).join("\n");
}
function formatProperty(property, maxKeyLength, maxValueLength) {
  const key = property.key.padEnd(maxKeyLength);
  const value = property.value.padEnd(maxValueLength);
  const comment = property.comment ? ` # ${property.comment}` : "";
  return `${key} = ${value} ${comment}`;
}

// src/migration/actions/recreate-launchpad-directory-settings.ts
function recreateLaunchpadDirectorySettings(context) {
  context.files.get(LAUNCHPAD_CFG).contents = serializeConfig(context.newConfig);
}

// src/resources/embedded-tsconfig.ts
var TSCONFIG_JSON_TEMPLATES = {
  "tsconfig.cli-app-cjs.json": {
    compilerOptions: {
      allowArbitraryExtensions: false,
      allowImportingTsExtensions: false,
      allowJs: false,
      allowSyntheticDefaultImports: false,
      allowUmdGlobalAccess: false,
      allowUnreachableCode: false,
      allowUnusedLabels: false,
      alwaysStrict: true,
      baseUrl: "__SRC_DIR__",
      composite: false,
      declaration: false,
      declarationMap: false,
      disableReferencedProjectLoad: false,
      disableSolutionSearching: false,
      disableSourceOfProjectReferenceRedirect: false,
      downlevelIteration: false,
      emitBOM: false,
      emitDeclarationOnly: false,
      emitDecoratorMetadata: false,
      esModuleInterop: true,
      exactOptionalPropertyTypes: true,
      experimentalDecorators: false,
      forceConsistentCasingInFileNames: true,
      importHelpers: false,
      incremental: true,
      inlineSourceMap: false,
      inlineSources: false,
      isolatedModules: true,
      module: "commonjs",
      moduleDetection: "force",
      moduleResolution: "node10",
      newLine: "lf",
      noEmit: false,
      noEmitHelpers: false,
      noEmitOnError: true,
      noFallthroughCasesInSwitch: true,
      noImplicitAny: true,
      noImplicitOverride: true,
      noImplicitReturns: true,
      noImplicitThis: true,
      noLib: false,
      noPropertyAccessFromIndexSignature: true,
      noUncheckedIndexedAccess: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      outDir: "__OUT_DIR__",
      preserveConstEnums: true,
      preserveSymlinks: false,
      removeComments: true,
      resolveJsonModule: true,
      skipLibCheck: true,
      sourceMap: true,
      strict: true,
      strictBindCallApply: true,
      strictFunctionTypes: true,
      strictNullChecks: true,
      strictPropertyInitialization: true,
      stripInternal: true,
      target: "es2022",
      tsBuildInfoFile: "__OUT_DIR__/.tsbuildinfo",
      useDefineForClassFields: true,
      useUnknownInCatchVariables: true,
      verbatimModuleSyntax: false
    },
    include: ["__SRC_DIR__/**/*.ts"]
  },
  "tsconfig.cli-app-esm.json": {
    compilerOptions: {
      allowArbitraryExtensions: false,
      allowImportingTsExtensions: false,
      allowJs: false,
      allowSyntheticDefaultImports: false,
      allowUmdGlobalAccess: false,
      allowUnreachableCode: false,
      allowUnusedLabels: false,
      alwaysStrict: true,
      composite: false,
      declaration: false,
      declarationMap: false,
      disableReferencedProjectLoad: false,
      disableSolutionSearching: false,
      disableSourceOfProjectReferenceRedirect: false,
      downlevelIteration: false,
      emitBOM: false,
      emitDeclarationOnly: false,
      emitDecoratorMetadata: false,
      esModuleInterop: true,
      exactOptionalPropertyTypes: true,
      experimentalDecorators: false,
      forceConsistentCasingInFileNames: true,
      importHelpers: false,
      incremental: true,
      inlineSourceMap: false,
      inlineSources: false,
      isolatedModules: true,
      module: "node16",
      moduleDetection: "force",
      moduleResolution: "node16",
      newLine: "lf",
      noEmit: false,
      noEmitHelpers: false,
      noEmitOnError: true,
      noFallthroughCasesInSwitch: true,
      noImplicitAny: true,
      noImplicitOverride: true,
      noImplicitReturns: true,
      noImplicitThis: true,
      noLib: false,
      noPropertyAccessFromIndexSignature: true,
      noUncheckedIndexedAccess: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      outDir: "__OUT_DIR__",
      preserveConstEnums: true,
      preserveSymlinks: false,
      removeComments: true,
      resolveJsonModule: true,
      skipLibCheck: true,
      sourceMap: true,
      strict: true,
      strictBindCallApply: true,
      strictFunctionTypes: true,
      strictNullChecks: true,
      strictPropertyInitialization: true,
      stripInternal: true,
      target: "es2022",
      tsBuildInfoFile: "__OUT_DIR__/.tsbuildinfo",
      useDefineForClassFields: true,
      useUnknownInCatchVariables: true,
      verbatimModuleSyntax: false
    },
    include: ["__SRC_DIR__/**/*.ts"],
    "ts-node": {
      esm: true
    }
  },
  "tsconfig.cli-lib-cjs.json": {
    compilerOptions: {
      allowArbitraryExtensions: false,
      allowImportingTsExtensions: false,
      allowJs: false,
      allowSyntheticDefaultImports: false,
      allowUmdGlobalAccess: false,
      allowUnreachableCode: false,
      allowUnusedLabels: false,
      alwaysStrict: true,
      baseUrl: "__SRC_DIR__",
      composite: false,
      declaration: true,
      declarationMap: true,
      disableReferencedProjectLoad: false,
      disableSolutionSearching: false,
      disableSourceOfProjectReferenceRedirect: false,
      downlevelIteration: false,
      emitBOM: false,
      emitDeclarationOnly: false,
      emitDecoratorMetadata: false,
      esModuleInterop: true,
      exactOptionalPropertyTypes: true,
      experimentalDecorators: false,
      forceConsistentCasingInFileNames: true,
      importHelpers: false,
      incremental: true,
      inlineSourceMap: false,
      inlineSources: false,
      isolatedModules: true,
      module: "commonjs",
      moduleDetection: "force",
      moduleResolution: "node10",
      newLine: "lf",
      noEmit: false,
      noEmitHelpers: false,
      noEmitOnError: true,
      noFallthroughCasesInSwitch: true,
      noImplicitAny: true,
      noImplicitOverride: true,
      noImplicitReturns: true,
      noImplicitThis: true,
      noLib: false,
      noPropertyAccessFromIndexSignature: true,
      noUncheckedIndexedAccess: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      outDir: "__OUT_DIR__",
      preserveConstEnums: true,
      preserveSymlinks: false,
      removeComments: true,
      resolveJsonModule: true,
      skipLibCheck: true,
      sourceMap: true,
      strict: true,
      strictBindCallApply: true,
      strictFunctionTypes: true,
      strictNullChecks: true,
      strictPropertyInitialization: true,
      stripInternal: true,
      target: "es2022",
      tsBuildInfoFile: "__OUT_DIR__/.tsbuildinfo",
      useDefineForClassFields: true,
      useUnknownInCatchVariables: true,
      verbatimModuleSyntax: false
    },
    include: ["__SRC_DIR__/**/*.ts"]
  },
  "tsconfig.cli-lib-esm.json": {
    compilerOptions: {
      allowArbitraryExtensions: false,
      allowImportingTsExtensions: false,
      allowJs: false,
      allowSyntheticDefaultImports: false,
      allowUmdGlobalAccess: false,
      allowUnreachableCode: false,
      allowUnusedLabels: false,
      alwaysStrict: true,
      composite: false,
      declaration: true,
      declarationMap: true,
      disableReferencedProjectLoad: false,
      disableSolutionSearching: false,
      disableSourceOfProjectReferenceRedirect: false,
      downlevelIteration: false,
      emitBOM: false,
      emitDeclarationOnly: false,
      emitDecoratorMetadata: false,
      esModuleInterop: true,
      exactOptionalPropertyTypes: true,
      experimentalDecorators: false,
      forceConsistentCasingInFileNames: true,
      importHelpers: false,
      incremental: true,
      inlineSourceMap: false,
      inlineSources: false,
      isolatedModules: true,
      module: "node16",
      moduleDetection: "force",
      moduleResolution: "node16",
      newLine: "lf",
      noEmit: false,
      noEmitHelpers: false,
      noEmitOnError: true,
      noFallthroughCasesInSwitch: true,
      noImplicitAny: true,
      noImplicitOverride: true,
      noImplicitReturns: true,
      noImplicitThis: true,
      noLib: false,
      noPropertyAccessFromIndexSignature: true,
      noUncheckedIndexedAccess: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      outDir: "__OUT_DIR__",
      preserveConstEnums: true,
      preserveSymlinks: false,
      removeComments: true,
      resolveJsonModule: true,
      skipLibCheck: true,
      sourceMap: true,
      strict: true,
      strictBindCallApply: true,
      strictFunctionTypes: true,
      strictNullChecks: true,
      strictPropertyInitialization: true,
      stripInternal: true,
      target: "es2022",
      tsBuildInfoFile: "__OUT_DIR__/.tsbuildinfo",
      useDefineForClassFields: true,
      useUnknownInCatchVariables: true,
      verbatimModuleSyntax: false
    },
    include: ["__SRC_DIR__/**/*.ts"],
    "ts-node": {
      esm: true
    }
  },
  "tsconfig.web-app-cjs.json": {
    compilerOptions: {
      allowArbitraryExtensions: true,
      allowImportingTsExtensions: false,
      allowJs: false,
      allowSyntheticDefaultImports: false,
      allowUmdGlobalAccess: false,
      allowUnreachableCode: false,
      allowUnusedLabels: false,
      alwaysStrict: true,
      baseUrl: "__SRC_DIR__",
      composite: false,
      declaration: false,
      declarationMap: false,
      disableReferencedProjectLoad: false,
      disableSolutionSearching: false,
      disableSourceOfProjectReferenceRedirect: false,
      downlevelIteration: false,
      emitBOM: false,
      emitDeclarationOnly: false,
      emitDecoratorMetadata: false,
      esModuleInterop: true,
      exactOptionalPropertyTypes: true,
      experimentalDecorators: false,
      forceConsistentCasingInFileNames: true,
      importHelpers: false,
      incremental: true,
      inlineSourceMap: false,
      inlineSources: false,
      isolatedModules: true,
      jsx: "react",
      module: "commonjs",
      moduleDetection: "force",
      moduleResolution: "node10",
      newLine: "lf",
      noEmit: false,
      noEmitHelpers: false,
      noEmitOnError: true,
      noFallthroughCasesInSwitch: true,
      noImplicitAny: true,
      noImplicitOverride: true,
      noImplicitReturns: true,
      noImplicitThis: true,
      noLib: false,
      noPropertyAccessFromIndexSignature: true,
      noUncheckedIndexedAccess: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      outDir: "__OUT_DIR__",
      preserveConstEnums: true,
      preserveSymlinks: false,
      removeComments: true,
      resolveJsonModule: true,
      skipLibCheck: true,
      sourceMap: true,
      strict: true,
      strictBindCallApply: true,
      strictFunctionTypes: true,
      strictNullChecks: true,
      strictPropertyInitialization: true,
      stripInternal: true,
      target: "es6",
      tsBuildInfoFile: "__OUT_DIR__/.tsbuildinfo",
      useDefineForClassFields: true,
      useUnknownInCatchVariables: true,
      verbatimModuleSyntax: false
    },
    include: ["__SRC_DIR__/**/*.ts"]
  },
  "tsconfig.web-app-esm.json": {
    compilerOptions: {
      allowArbitraryExtensions: true,
      allowImportingTsExtensions: false,
      allowJs: false,
      allowSyntheticDefaultImports: false,
      allowUmdGlobalAccess: false,
      allowUnreachableCode: false,
      allowUnusedLabels: false,
      alwaysStrict: true,
      composite: false,
      declaration: false,
      declarationMap: false,
      disableReferencedProjectLoad: false,
      disableSolutionSearching: false,
      disableSourceOfProjectReferenceRedirect: false,
      downlevelIteration: false,
      emitBOM: false,
      emitDeclarationOnly: false,
      emitDecoratorMetadata: false,
      esModuleInterop: true,
      exactOptionalPropertyTypes: true,
      experimentalDecorators: false,
      forceConsistentCasingInFileNames: true,
      importHelpers: false,
      incremental: true,
      inlineSourceMap: false,
      inlineSources: false,
      isolatedModules: true,
      jsx: "react",
      module: "node16",
      moduleDetection: "force",
      moduleResolution: "node16",
      newLine: "lf",
      noEmit: false,
      noEmitHelpers: false,
      noEmitOnError: true,
      noFallthroughCasesInSwitch: true,
      noImplicitAny: true,
      noImplicitOverride: true,
      noImplicitReturns: true,
      noImplicitThis: true,
      noLib: false,
      noPropertyAccessFromIndexSignature: true,
      noUncheckedIndexedAccess: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      outDir: "__OUT_DIR__",
      preserveConstEnums: true,
      preserveSymlinks: false,
      removeComments: true,
      resolveJsonModule: true,
      skipLibCheck: true,
      sourceMap: true,
      strict: true,
      strictBindCallApply: true,
      strictFunctionTypes: true,
      strictNullChecks: true,
      strictPropertyInitialization: true,
      stripInternal: true,
      target: "es6",
      tsBuildInfoFile: "__OUT_DIR__/.tsbuildinfo",
      useDefineForClassFields: true,
      useUnknownInCatchVariables: true,
      verbatimModuleSyntax: false
    },
    include: ["__SRC_DIR__/**/*.ts"],
    "ts-node": {
      esm: true
    }
  },
  "tsconfig.web-lib-cjs.json": {
    compilerOptions: {
      allowArbitraryExtensions: true,
      allowImportingTsExtensions: false,
      allowJs: false,
      allowSyntheticDefaultImports: false,
      allowUmdGlobalAccess: false,
      allowUnreachableCode: false,
      allowUnusedLabels: false,
      alwaysStrict: true,
      baseUrl: "__SRC_DIR__",
      composite: false,
      declaration: true,
      declarationMap: true,
      disableReferencedProjectLoad: false,
      disableSolutionSearching: false,
      disableSourceOfProjectReferenceRedirect: false,
      downlevelIteration: false,
      emitBOM: false,
      emitDeclarationOnly: false,
      emitDecoratorMetadata: false,
      esModuleInterop: true,
      exactOptionalPropertyTypes: true,
      experimentalDecorators: false,
      forceConsistentCasingInFileNames: true,
      importHelpers: false,
      incremental: true,
      inlineSourceMap: false,
      inlineSources: false,
      isolatedModules: true,
      jsx: "react",
      module: "commonjs",
      moduleDetection: "force",
      moduleResolution: "node10",
      newLine: "lf",
      noEmit: false,
      noEmitHelpers: false,
      noEmitOnError: true,
      noFallthroughCasesInSwitch: true,
      noImplicitAny: true,
      noImplicitOverride: true,
      noImplicitReturns: true,
      noImplicitThis: true,
      noLib: false,
      noPropertyAccessFromIndexSignature: true,
      noUncheckedIndexedAccess: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      outDir: "__OUT_DIR__",
      preserveConstEnums: true,
      preserveSymlinks: false,
      removeComments: true,
      resolveJsonModule: true,
      skipLibCheck: true,
      sourceMap: true,
      strict: true,
      strictBindCallApply: true,
      strictFunctionTypes: true,
      strictNullChecks: true,
      strictPropertyInitialization: true,
      stripInternal: true,
      target: "es6",
      tsBuildInfoFile: "__OUT_DIR__/.tsbuildinfo",
      useDefineForClassFields: true,
      useUnknownInCatchVariables: true,
      verbatimModuleSyntax: false
    },
    include: ["__SRC_DIR__/**/*.ts"]
  },
  "tsconfig.web-lib-esm.json": {
    compilerOptions: {
      allowArbitraryExtensions: true,
      allowImportingTsExtensions: false,
      allowJs: false,
      allowSyntheticDefaultImports: false,
      allowUmdGlobalAccess: false,
      allowUnreachableCode: false,
      allowUnusedLabels: false,
      alwaysStrict: true,
      composite: false,
      declaration: true,
      declarationMap: true,
      disableReferencedProjectLoad: false,
      disableSolutionSearching: false,
      disableSourceOfProjectReferenceRedirect: false,
      downlevelIteration: false,
      emitBOM: false,
      emitDeclarationOnly: false,
      emitDecoratorMetadata: false,
      esModuleInterop: true,
      exactOptionalPropertyTypes: true,
      experimentalDecorators: false,
      forceConsistentCasingInFileNames: true,
      importHelpers: false,
      incremental: true,
      inlineSourceMap: false,
      inlineSources: false,
      isolatedModules: true,
      jsx: "react",
      module: "node16",
      moduleDetection: "force",
      moduleResolution: "node16",
      newLine: "lf",
      noEmit: false,
      noEmitHelpers: false,
      noEmitOnError: true,
      noFallthroughCasesInSwitch: true,
      noImplicitAny: true,
      noImplicitOverride: true,
      noImplicitReturns: true,
      noImplicitThis: true,
      noLib: false,
      noPropertyAccessFromIndexSignature: true,
      noUncheckedIndexedAccess: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      outDir: "__OUT_DIR__",
      preserveConstEnums: true,
      preserveSymlinks: false,
      removeComments: true,
      resolveJsonModule: true,
      skipLibCheck: true,
      sourceMap: true,
      strict: true,
      strictBindCallApply: true,
      strictFunctionTypes: true,
      strictNullChecks: true,
      strictPropertyInitialization: true,
      stripInternal: true,
      target: "es6",
      tsBuildInfoFile: "__OUT_DIR__/.tsbuildinfo",
      useDefineForClassFields: true,
      useUnknownInCatchVariables: true,
      verbatimModuleSyntax: false
    },
    include: ["__SRC_DIR__/**/*.ts"],
    "ts-node": {
      esm: true
    }
  }
};

// src/migration/actions/recreate-launchpad-directory-tsconfig.ts
function recreateLaunchpadDirectoryTsConfig(context) {
  const { artifact, moduleSystem, runtime } = context.newConfig;
  const normalizedRuntime = "node" === runtime.value ? "cli" : runtime.value;
  const file = `tsconfig.${normalizedRuntime}-${artifact}-${moduleSystem}.json`;
  const tsconfig = TSCONFIG_JSON_TEMPLATES[file];
  const stringified = JSON.stringify(tsconfig, void 0, context.newConfig.tabSize).replaceAll("__SRC_DIR__", normalizeDirectory(context.newConfig.srcDir)).replaceAll("__OUT_DIR__", normalizeDirectory(context.newConfig.tscOutDir));
  context.files.get(LAUNCHPAD_TSCONFIG_DEFAULT_JSON).contents = `${stringified}
`;
}
function normalizeDirectory(directory) {
  return JSON.stringify(`../${directory}`).replace(/^"/, "").replace(/"$/, "");
}

// src/migration/actions/recreate-launchpad-directory-uplift-scripts.ts
var UPLIFT_PARAMETERS = "__UPLIFT_PARAMETERS__";
function recreateLaunchpadDirectoryUpliftScripts(context) {
  const upgradeLaunchpadCommand = serializeCommand(getUpgradeLaunchpadCommand(context));
  const upliftCommand = serializeCommand([...getUpliftCommand(context), UPLIFT_PARAMETERS]);
  const commands = [upgradeLaunchpadCommand, upliftCommand].filter((command) => command.trim());
  recreateUpliftShellScript(context, commands);
  recreateUpliftBatchScript(context, commands);
}
function recreateUpliftShellScript(context, commands) {
  const file = context.files.get(".launchpad/uplift");
  file.lines = [
    "#!/usr/bin/env bash",
    "",
    'if [[ -d "../.launchpad" ]]; then',
    "    cd ..",
    "fi",
    "",
    'if [[ ! -d "./.launchpad" ]]; then',
    '    echo "\u26D4 ERROR: .launchpad/uplift must be run from the project root directory" >&2',
    "    exit 1",
    "fi",
    "",
    'echo "Uplifting the project..."',
    'echo ""',
    "",
    `if ! ${commands.map((command) => command.replaceAll(UPLIFT_PARAMETERS, 'uplift "$@"')).join(" && ")}; then`,
    '    echo "" >&2',
    '    echo "\u26D4 ERROR: The uplift has failed" >&2',
    "    exit 1",
    "fi"
  ];
  file.makeExecutable();
}
function recreateUpliftBatchScript(context, commands) {
  context.files.get(".launchpad/uplift.bat").lines = [
    "@echo off",
    "",
    'cd /D "%~dp0\\.."',
    "",
    'if not exist ".launchpad" (',
    "    echo ERROR: .launchpad/uplift.bat must be run from the project root directory",
    "    exit /b 1",
    ")",
    "",
    "echo Uplifting the project...",
    "echo .",
    ...commands.flatMap(toBatchCommandWithErrorHandler)
  ];
}
function getUpgradeLaunchpadCommand(context) {
  return "local" === context.newConfig.installationMode ? getPackageManager(context).getUpgradePackagesCommand([LAUNCHPAD_PACKAGE_NAME]) : [];
}
function getUpliftCommand(context) {
  if ("local" === context.newConfig.installationMode) {
    return getPackageManager(context).launchpadLocalCommand;
  } else if ("global" === context.newConfig.installationMode) {
    return ["launchpad"];
  } else {
    const packageManager = {
      temp: getPackageManager(context),
      npx: getPackageManager("npm"),
      "pnpm-dlx": getPackageManager("pnpm"),
      "yarn-dlx": getPackageManager("yarn")
    }[context.newConfig.installationMode];
    return packageManager.launchpadDlxCommand;
  }
}
function serializeCommand(command) {
  return command.map((element) => element.match(/.*(\s|").*/) ? JSON.stringify(element) : element).join(" ");
}
function toBatchCommandWithErrorHandler(command) {
  return !command ? [] : [
    "",
    command.replaceAll(UPLIFT_PARAMETERS, "uplift %*"),
    'if not "%ERRORLEVEL%" == "0" (',
    "    echo.",
    "    echo ERROR: The uplift has failed",
    "    exit /b 1",
    ")"
  ];
}

// src/migration/actions/update-gitignore-bundler-output.ts
function updateGitignoreBundlerOutput(context) {
  const oldBundlerOutDir = context.oldConfig?.bundlerOutDir;
  const newBundlerOutDir = context.newConfig.bundlerOutDir;
  const currentGlobs = ["**/*.js", "**/*.d.js", "**/*.js.map"];
  const deprecatedGlobs = [];
  const allGlobs = [...currentGlobs, ...deprecatedGlobs];
  if (oldBundlerOutDir && oldBundlerOutDir !== newBundlerOutDir) {
    allGlobs.forEach((glob) => context.fileOperations.gitignore.remove(`/${oldBundlerOutDir}/${glob}`));
  }
  if (!oldBundlerOutDir || oldBundlerOutDir !== newBundlerOutDir) {
    currentGlobs.forEach((glob) => context.fileOperations.gitignore.add(`/${oldBundlerOutDir}/${glob}`));
  }
}

// src/migration/actions/update-gitignore-package-manager.ts
function updateGitignorePackageManager(context) {
  const { gitignore } = context.fileOperations;
  const patternsToAdd = new Set(getPackageManager(context).gitignorePatterns.current);
  getAllPackageManagers().map((packageManager) => packageManager.gitignorePatterns).flatMap((gitignorePatterns) => [...gitignorePatterns.current, ...gitignorePatterns.deprecated]).filter((pattern) => !patternsToAdd.has(pattern)).forEach((pattern) => gitignore.remove(pattern));
  patternsToAdd.forEach((pattern) => gitignore.add(pattern));
}

// src/migration/actions/update-gitignore-tsc-output.ts
function updateGitignoreTscOutput(context) {
  const oldTscOutDir = context.oldConfig?.tscOutDir;
  const newTscOutDir = context.newConfig.tscOutDir;
  const currentGlobs = ["**/*.js", "**/*.d.js", "**/*.js.map", TSBUILDINFO];
  const deprecatedGlobs = [];
  const allGlobs = [...currentGlobs, ...deprecatedGlobs];
  if (oldTscOutDir && oldTscOutDir !== newTscOutDir) {
    allGlobs.forEach((glob) => context.fileOperations.gitignore.remove(`/${oldTscOutDir}/${glob}`));
  }
  currentGlobs.forEach((glob) => context.fileOperations.gitignore.add(`/${newTscOutDir}/${glob}`));
}

// src/migration/actions/update-package-json-dependencies.ts
function updatePackageJsonDependencies(context) {
  const packageJson = context.fileOperations.packageJson;
  updateDependencies(context, packageJson);
  updateDevDependencies(context.newConfig, packageJson);
}
function updateDependencies(context, packageJson) {
  context.newConfig.dependencies.forEach((dependency) => packageJson.addDependencyIfMissing(dependency, "*"));
}
function updateDevDependencies(config, packageJson) {
  const addOrRemove = (configuredValue, map) => addAndRemoveDevDependencies(config.installDevDependencies, packageJson, configuredValue, map);
  addOrRemove("always", { always: ["typescript", "ts-node"] });
  addOrRemove(config.bundler.value, { disabled: [], esbuild: ["esbuild"] });
  addOrRemove(config.dtsBundler.value, { disabled: [], "dts-bundle-generator": ["dts-bundle-generator"] });
  addOrRemove(config.formatter.value, { disabled: [], prettier: ["prettier"], biome: ["@biomejs/biome"] });
}
function addAndRemoveDevDependencies(installDevDependencies, packageJson, configuredValue, map) {
  const npmPackagesToRemove = /* @__PURE__ */ new Set();
  for (const key in map) {
    map[key]?.forEach((npmPackage) => npmPackagesToRemove.add(npmPackage));
  }
  if (installDevDependencies) {
    map[configuredValue]?.forEach((npmPackage) => {
      packageJson.addDevDependencyIfMissing(npmPackage, "*");
      npmPackagesToRemove.delete(npmPackage);
    });
  }
  npmPackagesToRemove.forEach((dependency) => packageJson.removeDependencyIfExists(dependency));
}

// src/migration/actions/update-package-json-metadata.ts
function updatePackageJsonMetadata(context) {
  const packageJson = context.fileOperations.packageJson;
  setIfMissing(packageJson, "name", context.newConfig.projectName);
  setIfMissing(packageJson, "version", "0.0.0");
  setIfMissing(packageJson, "private", true);
  setIfMissing(packageJson, "license", "UNLICENSED");
  setIfMissing(packageJson, "module", { esm: "module", cjs: "commonjs" }[context.newConfig.moduleSystem]);
}
function setIfMissing(packageJson, key, value) {
  const json = packageJson.json;
  if (!(key in json)) {
    packageJson.json = { ...json, [key]: value };
  }
}

// src/migration/actions/update-package-json-package-manager.ts
function updatePackageJsonPackageManager(context) {
  const { packageJson } = context.fileOperations;
  pinSwpmPackageManager(context, packageJson);
}
function pinSwpmPackageManager(context, packageJson) {
  const identifier = getPackageManager(context).swpmIdentifier;
  if (identifier) {
    packageJson.json = { ...packageJson.json, swpm: identifier };
  } else {
    packageJson.deleteProperty("swpm");
  }
}

// src/migration/actions/update-vscode-settings-format-on-save.ts
function updateVsCodeSettingsFormatOnSave(context) {
  if (context.newConfig.vsCodeSettings.has("format-on-save")) {
    const vscodeSettings = context.fileOperations.vscodeSettings;
    const formatOnSave = vscodeSettings.json["editor.formatOnSave"] ?? true;
    vscodeSettings.json = { ...vscodeSettings.json, "editor.formatOnSave": formatOnSave };
  }
}

// src/migration/files/vscode-settings.ts
var VSCODE_LANGUAGE_IDS = [
  "css",
  "html",
  "json",
  "jsonc",
  "javascript",
  "javascriptreact",
  "less",
  "scss",
  "typescript",
  "typescriptreact"
];
var DEFAULT_FORMATTER2 = "editor.defaultFormatter";
var VSCodeSettingsOperations = class _VSCodeSettingsOperations {
  //
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(file) {
    this.file = file;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Get and set the whole JSON
  //------------------------------------------------------------------------------------------------------------------
  get json() {
    return this.file.json ?? {};
  }
  set json(json) {
    this.file.json = json;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Get, set or remove the formatter
  //------------------------------------------------------------------------------------------------------------------
  setFormatter(languageId, formatter) {
    const key = _VSCodeSettingsOperations.languageIdToJsonKey(languageId);
    this.json = { ...this.json, [key]: { ...this.json[key], [DEFAULT_FORMATTER2]: formatter } };
  }
  removeFormatter(languageId) {
    const key = _VSCodeSettingsOperations.languageIdToJsonKey(languageId);
    if (this.json[key]) {
      const languageSettings = { ...this.json[key] };
      delete languageSettings[DEFAULT_FORMATTER2];
      this.json = { ...this.json, [key]: languageSettings };
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Convert a language ID to the respective VSCode settings key
  //------------------------------------------------------------------------------------------------------------------
  static languageIdToJsonKey(languageId) {
    return `[${languageId}]`;
  }
};

// src/migration/actions/update-vscode-settings-formatter.ts
function updateVsCodeSettingsFormatter(context) {
  if (context.newConfig.vsCodeSettings.has("formatter")) {
    const vscodeSettings = context.fileOperations.vscodeSettings;
    const formatter = getFormatter(context);
    for (const languageId of VSCODE_LANGUAGE_IDS) {
      formatter.supportedLanguageIds.includes(languageId) ? vscodeSettings.setFormatter(languageId, formatter.vsCodeFormatterId) : vscodeSettings.removeFormatter(languageId);
    }
  }
}

// src/migration/executor/external-command.ts
var import_child_process = require("child_process");
var ExternalCommand = class {
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(description, workingDirectory, argv) {
    this.description = description;
    this.argv = argv;
    this.workingDirectory = workingDirectory.path;
  }
  workingDirectory;
  //------------------------------------------------------------------------------------------------------------------
  // Execute the command
  //------------------------------------------------------------------------------------------------------------------
  execute() {
    const [cmd, ...args] = this.argv;
    (0, import_child_process.execFileSync)(cmd ?? "", args, { cwd: this.workingDirectory, stdio: "inherit" });
  }
};

// src/migration/files/gitignore.ts
var GitignoreOperations = class _GitignoreOperations {
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(file) {
    this.file = file;
  }
  static CACHE = /* @__PURE__ */ new Map();
  //------------------------------------------------------------------------------------------------------------------
  // Getters and setters
  //------------------------------------------------------------------------------------------------------------------
  get lines() {
    return this.file.lines ?? [];
  }
  set lines(lines) {
    this.file.lines = lines.length ? lines : void 0;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Destructure/normalize a pattern
  //------------------------------------------------------------------------------------------------------------------
  destructure(line) {
    if (_GitignoreOperations.CACHE.has(line)) {
      return _GitignoreOperations.CACHE.get(line);
    }
    const trimmed = line.trim();
    const isCommentedOut = trimmed.startsWith("#");
    const isNegated = !!trimmed.match(/^#?\s*!/);
    const glob = trimmed.replace(/^#?\s*!/, "");
    const pattern = `${isNegated ? "!" : ""}${glob}`;
    const normalized = `${isCommentedOut ? "# " : ""}${pattern}`;
    const result = { original: line, normalized, glob, pattern, isCommentedOut, isNegated };
    _GitignoreOperations.CACHE.set(line, result);
    return result;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Check if a pattern exists
  //------------------------------------------------------------------------------------------------------------------
  containsActiveOrCommentedOut(pattern) {
    return this.containsActive(pattern) || this.containsCommentedOut(pattern);
  }
  containsCommentedOut(pattern) {
    return this.lines.some((line) => this.matches(line, "commented-out", pattern));
  }
  containsActive(pattern) {
    return this.lines.some((line) => this.matches(line, "active", pattern));
  }
  matches(line, type, pattern) {
    const normalizedLine = this.destructure(line);
    return normalizedLine.isCommentedOut === (type === "commented-out") && normalizedLine.normalized === this.destructure(pattern).normalized;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Add and remove patterns
  //------------------------------------------------------------------------------------------------------------------
  add(pattern) {
    if (!this.containsActive(pattern)) {
      this.lines = [...this.lines, this.destructure(pattern).normalized];
    }
  }
  remove(pattern) {
    this.lines = this.lines.filter((line) => this.matches(line, "active", pattern));
  }
};

// src/migration/data/directory.ts
var Directory = class {
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(projectRoot, relativePath) {
    this.relativePath = relativePath;
    this.absolutePath = projectRoot.child(relativePath);
    if (this.absolutePath.existsAndIsFile()) {
      fail(`${this.absolutePath.path} is a file (expected it to be a directory)`);
    }
    this.exists = this.absolutePath.exists();
    this.shouldExist = this.exists;
  }
  type = "directory";
  absolutePath;
  exists;
  shouldExist;
  //------------------------------------------------------------------------------------------------------------------
  // Getters and setters
  //------------------------------------------------------------------------------------------------------------------
  create() {
    this.shouldExist = true;
  }
  delete() {
    this.shouldExist = false;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Determine the status
  //------------------------------------------------------------------------------------------------------------------
  mustCreate() {
    return !this.exists && this.shouldExist;
  }
  mustDelete() {
    return this.exists && !this.shouldExist;
  }
  getSummaryOfChanges() {
    if (this.mustDelete()) {
      return [`Deleted ${this.absolutePath.path}`];
    } else if (this.mustCreate()) {
      return [`Created ${this.absolutePath.path}`];
    } else {
      return [];
    }
  }
};

// src/migration/executor/file-system-operation.ts
var import_fs = require("fs");

// src/utilities/path.ts
var fs = __toESM(require("fs"));
var import_path2 = require("path");
var Path = class _Path {
  path;
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(_path) {
    this.path = _Path.normalize(_path);
  }
  //------------------------------------------------------------------------------------------------------------------
  // Normalize the given path
  //------------------------------------------------------------------------------------------------------------------
  static normalize(path) {
    const normalized = (0, import_path2.normalize)((0, import_path2.resolve)(path));
    return normalized.match(/^[a-z]:/i) ? normalized.substring(0, 1).toUpperCase() + normalized.substring(1).replace(/\\/g, "/") : normalized;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Construct a child path or get the parent
  //------------------------------------------------------------------------------------------------------------------
  child(name) {
    return new _Path(`${this.path}/${name}`);
  }
  getParent() {
    return new _Path(this.path.substring(0, this.path.lastIndexOf("/")));
  }
  //------------------------------------------------------------------------------------------------------------------
  // Check a paths existence and type
  //------------------------------------------------------------------------------------------------------------------
  exists() {
    return fs.existsSync(this.path);
  }
  existsAndIsFile() {
    return this.exists() && this.getProperties().isFile();
  }
  existsAndIsDirectory() {
    return this.exists() && this.getProperties().isDirectory();
  }
  //------------------------------------------------------------------------------------------------------------------
  // Get file properties
  //------------------------------------------------------------------------------------------------------------------
  getProperties() {
    return fs.lstatSync(this.path);
  }
  //------------------------------------------------------------------------------------------------------------------
  // Load the file contents
  //------------------------------------------------------------------------------------------------------------------
  loadFileContents() {
    return fs.readFileSync(this.path).toString();
  }
  //------------------------------------------------------------------------------------------------------------------
  // Append to the file
  //------------------------------------------------------------------------------------------------------------------
  appendFileContents(contents) {
    return fs.appendFileSync(this.path, "string" === typeof contents ? contents : contents.join("\n"));
  }
};
function getConfigFilePath(projectRoot) {
  return projectRoot.child(LAUNCHPAD_CFG);
}

// src/migration/executor/file-system-operation.ts
var FileSystemOperation = class {
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(fileOrDirectory) {
    this.fileOrDirectory = fileOrDirectory;
    this.type = fileOrDirectory.type;
    this.path = fileOrDirectory.absolutePath;
    this.newPath = new Path(`${this.path.path}${LP_NEW_FILE_EXTENSION}`);
    this.oldPath = new Path(`${this.path.path}${LP_OLD_FILE_EXTENSION}`);
  }
  type;
  hasCreatedNew = false;
  hasRenamedCurrentToOld = false;
  hasRenamedNewToCurrent = false;
  hasDeletedOld = false;
  path;
  newPath;
  oldPath;
  //------------------------------------------------------------------------------------------------------------------
  // Check if any LP_OLD or LP_NEW files already exist
  //------------------------------------------------------------------------------------------------------------------
  getExistingConflictPaths() {
    return [this.newPath, this.oldPath].flatMap((path) => path.exists() ? [path.path] : []);
  }
  //------------------------------------------------------------------------------------------------------------------
  // Create the LP_NEW file or directory
  //------------------------------------------------------------------------------------------------------------------
  createNew(log) {
    try {
      if (!this.fileOrDirectory.mustDelete()) {
        const directory = this.fileOrDirectory instanceof Directory ? this.newPath : this.newPath.getParent();
        if (!directory.exists()) {
          (0, import_fs.mkdirSync)(directory.path, { recursive: true });
        }
        if (this.fileOrDirectory instanceof File) {
          const contents = this.fileOrDirectory.contents ?? "";
          const mode = this.fileOrDirectory.shouldBeExecutable() ? 511 : 438;
          (0, import_fs.writeFileSync)(this.newPath.path, contents, { encoding: "utf-8", flag: "wx", mode });
        }
        log.push(`Created ${this.type} ${this.newPath.path}`);
        this.hasCreatedNew = true;
      }
    } catch (error2) {
      throw new Error(`Failed to create ${this.type} ${this.newPath.path}: ${error2}`);
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Rename the current file or directory to LP_OLD
  //------------------------------------------------------------------------------------------------------------------
  renameCurrentToOld(log) {
    try {
      if (this.fileOrDirectory.exists) {
        (0, import_fs.renameSync)(this.path.path, this.oldPath.path);
        log.push(`Renamed ${this.type} ${this.path.path} to ${this.oldPath.path}`);
        this.hasRenamedCurrentToOld = true;
      }
    } catch (error2) {
      throw new Error(`Failed to rename ${this.type} ${this.path.path} to ${this.oldPath.path}: ${error2}`);
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Make the LP_NEW file or directory the current one
  //------------------------------------------------------------------------------------------------------------------
  renameNewToCurrent(log) {
    try {
      if (this.hasCreatedNew) {
        (0, import_fs.renameSync)(this.newPath.path, this.path.path);
        this.hasRenamedNewToCurrent;
        log.push(`Renamed ${this.type} ${this.newPath.path} to ${this.path.path}`);
      }
    } catch (error2) {
      throw new Error(`Failed to rename ${this.type} ${this.newPath.path} to ${this.path.path}: ${error2}`);
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Delete the LP_OLD file or directory
  //------------------------------------------------------------------------------------------------------------------
  deleteOld(log) {
    if (this.hasRenamedCurrentToOld) {
      if (this.fileOrDirectory instanceof Directory) {
        (0, import_fs.rmSync)(this.oldPath.path, { recursive: true });
      } else {
        (0, import_fs.rmSync)(this.oldPath.path);
      }
      log.push(`Deleted ${this.type} ${this.oldPath.path}`);
      this.hasDeletedOld = true;
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Roll back all changes
  //------------------------------------------------------------------------------------------------------------------
  rollBack(log) {
    if (this.hasDeletedOld) {
      throw new Error(`Can't roll back because ${this.type} ${this.oldPath.path} has already been deleted`);
    }
    if (this.hasCreatedNew) {
      const pathToDelete = this.hasRenamedNewToCurrent ? this.path.path : this.newPath.path;
      try {
        (0, import_fs.rmSync)(pathToDelete, this.fileOrDirectory instanceof Directory ? { recursive: true } : {});
      } catch (error2) {
        throw new Error(`Failed to delete ${this.type} ${pathToDelete}`);
      }
      log.push(`Deleted ${this.type} ${pathToDelete}`);
      this.hasRenamedNewToCurrent = this.hasCreatedNew = false;
    }
    if (this.hasRenamedCurrentToOld) {
      try {
        (0, import_fs.renameSync)(this.oldPath.path, this.path.path);
      } catch (error2) {
        throw new Error(`Failed to rename ${this.type} ${this.oldPath.path} to ${this.path.path}`);
      }
      log.push(`Renamed ${this.type} ${this.oldPath.path} to ${this.path.path}`);
      this.hasRenamedCurrentToOld;
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Get instructions on how to complete the rollback
  //------------------------------------------------------------------------------------------------------------------
  getRollbackInstructions() {
    const instructions = new Array();
    if (this.hasCreatedNew) {
      const pathToDelete = this.hasRenamedNewToCurrent ? this.path.path : this.newPath.path;
      instructions.push(`Delete ${this.type} ${pathToDelete}`);
    }
    if (this.hasRenamedCurrentToOld) {
      instructions.push(`Rename ${this.type} ${this.oldPath.path} to ${this.path.path}`);
    }
    return instructions;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Get instructions for manually completing the transaction
  //------------------------------------------------------------------------------------------------------------------
  getCompletionInstructions() {
    return this.hasDeletedOld || !this.hasRenamedCurrentToOld ? [] : [`Delete ${this.type} ${this.oldPath.path}`];
  }
};

// src/migration/data/file-or-directory-cache.ts
var FileOrDirectoryCache = class {
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(projectRoot, tabSize, instantiate) {
    this.projectRoot = projectRoot;
    this.instantiate = (projectRoot2, relativePath) => instantiate(projectRoot2, relativePath, tabSize);
  }
  filesOrDirectories = /* @__PURE__ */ new Map();
  instantiate;
  //------------------------------------------------------------------------------------------------------------------
  // Retrieve or create a file or directory
  //------------------------------------------------------------------------------------------------------------------
  get(path) {
    const fileOrDirectory = this.filesOrDirectories.get(path) ?? this.instantiate(this.projectRoot, path);
    this.filesOrDirectories.set(path, fileOrDirectory);
    return fileOrDirectory;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Convert all new/modified/deleted items to a file system operation
  //------------------------------------------------------------------------------------------------------------------
  toFileSystemOperations() {
    const fileSystemOperations = new Array();
    for (const fileOrDirectory of this.filesOrDirectories.values()) {
      if (fileOrDirectory instanceof File) {
        if (fileOrDirectory.mustCreateOrOverwrite() || fileOrDirectory.mustDelete()) {
          fileSystemOperations.push(new FileSystemOperation(fileOrDirectory));
        }
      } else {
        if (fileOrDirectory.mustCreate() || fileOrDirectory.mustDelete()) {
          fileSystemOperations.push(new FileSystemOperation(fileOrDirectory));
        }
      }
    }
    return fileSystemOperations;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Get a summary of changes
  //------------------------------------------------------------------------------------------------------------------
  toSummaryOfChanges() {
    const changes = new Array();
    for (const fileOrDirectory of this.filesOrDirectories.values()) {
      changes.push(...fileOrDirectory.getSummaryOfChanges());
    }
    return changes;
  }
};

// src/migration/data/migration-context.ts
var MigrationContext = class {
  operation;
  mainModulePath;
  debugModulePath;
  projectRoot;
  oldConfig;
  newConfig;
  fileOperations;
  startedAt = /* @__PURE__ */ new Date();
  upliftDependenciesOverride;
  files;
  directories;
  externalCommands = new Array();
  manualActionRequired;
  manualFileSystemInstructions = new Array();
  manualCommandInstructions = new Array();
  activityLog = new Array();
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(options) {
    this.operation = options.operation;
    this.projectRoot = options.projectRoot;
    this.oldConfig = options.oldConfig;
    this.newConfig = options.newConfig;
    this.upliftDependenciesOverride = options.upliftDependenciesOverride;
    this.files = new FileOrDirectoryCache(
      options.projectRoot,
      options.newConfig.tabSize,
      (root, path, tabSize) => new File(root, path, tabSize)
    );
    this.directories = new FileOrDirectoryCache(
      options.projectRoot,
      options.newConfig.tabSize,
      (root, path) => new Directory(root, path)
    );
    this.fileOperations = {
      gitignore: new GitignoreOperations(this.files.get(GITIGNORE)),
      packageJson: new PackageJsonOperations(this.files.get(PACKAGE_JSON)),
      vscodeSettings: new VSCodeSettingsOperations(this.files.get(VSCODE_SETTINGS_JSON))
    };
    this.mainModulePath = `${options.newConfig.srcDir}/${options.newConfig.projectName}.ts`;
    this.debugModulePath = `${options.newConfig.srcDir}/debug.ts`;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Add an external command
  //------------------------------------------------------------------------------------------------------------------
  addExternalCommand(description, command) {
    this.externalCommands.push(new ExternalCommand(description, this.projectRoot, command));
  }
};

// src/migration/executor/apply-file-system-changes.ts
function applyFileSystemChanges(context) {
  const operations = {
    files: context.files.toFileSystemOperations(),
    directories: context.directories.toFileSystemOperations()
  };
  assertNoConflictingFiles(context, operations);
  if (!context.manualActionRequired) {
    prepareFileSystemChanges(context, operations);
  }
  if (!context.manualActionRequired) {
    finalizeFileSystemChanges(context, operations);
  }
}
function assertNoConflictingFiles(context, operations) {
  const conflictingPaths = [operations.directories, operations.files].flatMap(
    (filesOrDirectories) => filesOrDirectories.flatMap((fileOrDirectory) => fileOrDirectory.getExistingConflictPaths())
  );
  if (conflictingPaths.length) {
    context.manualActionRequired = "rollback";
    context.manualFileSystemInstructions.push(...conflictingPaths.map((item) => `Delete ${item}`));
  }
}
function prepareFileSystemChanges(context, operations) {
  try {
    [operations.directories, operations.files].forEach((filesOrDirectories) => {
      filesOrDirectories.forEach((fileOrDirectory) => {
        fileOrDirectory.createNew(context.activityLog);
        fileOrDirectory.renameCurrentToOld(context.activityLog);
        fileOrDirectory.renameNewToCurrent(context.activityLog);
      });
    });
  } catch (error2) {
    context.activityLog.push(`Encountered an error: ${error2}`);
    context.activityLog.push(`Rolling back changes...`);
    rollBackFileSystemChanges(context, operations);
    if (!context.manualActionRequired) {
      fail(`Failed to ${context.operation} the project: ${error2}`);
    }
  }
}
function rollBackFileSystemChanges(context, operations) {
  try {
    [operations.files, operations.directories].forEach((filesOrDirectories) => {
      filesOrDirectories.forEach((fileOrDirectory) => {
        fileOrDirectory.rollBack(context.activityLog);
      });
    });
  } catch (error2) {
    context.activityLog.push(`Encountered an error during the rollback: ${error2}`);
    context.manualActionRequired = "rollback";
    context.manualFileSystemInstructions.push(
      ...[...operations.directories, ...operations.files].flatMap((item) => item.getRollbackInstructions())
    );
  }
}
function finalizeFileSystemChanges(context, operations) {
  try {
    [operations.files, operations.directories].forEach((filesOrDirectories) => {
      filesOrDirectories.forEach((fileOrDirectory) => {
        fileOrDirectory.deleteOld(context.activityLog);
      });
    });
  } catch (error2) {
    context.activityLog.push(`Encountered an error: ${error2}`);
    context.manualActionRequired = "complete";
    context.manualFileSystemInstructions.push(
      ...[...operations.directories, ...operations.files].flatMap((item) => item.getCompletionInstructions())
    );
  }
}

// src/migration/migrate.ts
function migrate(options) {
  const newConfig = options.newConfig ?? calculateNewConfig(options, options.oldConfig);
  const context = new MigrationContext({ ...options, newConfig });
  prepareMigrationSteps(context);
  applyFileSystemChanges(context);
  if ("rollback" === context.manualActionRequired) {
    onFileSystemChangesRequireManualRollback(context);
  } else if ("complete" === context.manualActionRequired) {
    onFileSystemChangesRequireManualCompletion(context);
  } else {
    context.manualActionRequired;
    onFileSystemChangesSucceeded(context);
  }
}
function prepareMigrationSteps(context) {
  recreateLaunchpadDirectoryMakefiles(context);
  recreateLaunchpadDirectorySettings(context);
  recreateLaunchpadDirectoryTsConfig(context);
  recreateLaunchpadDirectoryUpliftScripts(context);
  updateGitignoreBundlerOutput(context);
  updateGitignorePackageManager(context);
  updateGitignoreTscOutput(context);
  updatePackageJsonDependencies(context);
  updatePackageJsonMetadata(context);
  updatePackageJsonPackageManager(context);
  updateVsCodeSettingsFormatOnSave(context);
  updateVsCodeSettingsFormatter(context);
  createTsconfigJson(context);
  createDebugModule(context);
  createIndexHtml(context);
  createIndexCss(context);
  createMainModule(context);
  createMakefile(context);
  createOutputDirectories(context);
  configureFormatter(context);
  configurePackageManager(context);
  installOrUpgradeNpmPackages(context);
}
function onFileSystemChangesRequireManualRollback(context) {
  if (context.activityLog.length) {
    console.log("");
    context.activityLog.flatMap((line) => breakAndLog("- ", line));
  }
  if (context.manualFileSystemInstructions) {
    console.log("");
    console.log("Please complete the rollback manually as follows:");
    console.log("");
    context.manualFileSystemInstructions.flatMap((line) => breakAndLog("- ", line));
  }
  console.log("");
  failMigration(context);
}
function onFileSystemChangesRequireManualCompletion(context) {
  if (context.activityLog.length) {
    console.log("");
    context.activityLog.flatMap((line) => breakAndLog("- ", line));
  }
  if (context.manualFileSystemInstructions.length) {
    console.log("");
    console.log(`Please complete the the operation manually as follows:`);
    console.log("");
    context.manualFileSystemInstructions.flatMap((line) => breakAndLog("- ", line));
  }
  if (context.externalCommands.length) {
    console.log("");
    if (context.manualFileSystemInstructions.length) {
      console.log("Then run the following commands:");
    } else {
      console.log("`Please complete the ${context.operation} by running the following commands:`");
    }
    console.log("");
    context.externalCommands.map((command) => command.argv.join(" ")).flatMap((line) => breakAndLog("- ", line));
  }
  console.log("");
  failMigration(context);
}
function onFileSystemChangesSucceeded(context) {
  const summaryOfChanges = [...context.directories.toSummaryOfChanges(), ...context.files.toSummaryOfChanges()];
  if (summaryOfChanges.length) {
    console.log("");
    summaryOfChanges.flatMap((line) => breakAndLog("- ", line));
  }
  executeExternalCommands(context);
  if (context.manualActionRequired) {
    console.log("");
    console.log(`Please complete the operation manually by running the following commands:`);
    console.log("");
    context.manualCommandInstructions.flatMap((line) => breakAndLog("- ", line));
    console.log("");
    failMigration(context);
  }
}
function executeExternalCommands(context) {
  for (const command of context.externalCommands) {
    const stringifiedCommand = command.argv.join(" ");
    if (!context.manualActionRequired) {
      try {
        breakAndLog("- ", `${command.description}...`);
        command.execute();
        context.activityLog.push(`Ran command: ${stringifiedCommand}`);
      } catch (error2) {
        context.activityLog.push(`Tried to run command: ${stringifiedCommand}`);
        context.activityLog.push(`Encountered an error: ${error2}`);
        console.log("");
        breakAndLog(`Encountered an error: ${error2}`);
        context.manualActionRequired = "complete";
      }
    }
    if (context.manualActionRequired) {
      context.manualCommandInstructions.push(stringifiedCommand);
    }
  }
}
function failMigration(context) {
  try {
    createLogFile(context);
  } catch (ignored) {
  }
  fail(`Failed to ${context.operation} the project`);
}
function createLogFile(context) {
  const file = context.projectRoot.child(ERROR_LOG_FILE);
  const lines = new Array();
  if (file.exists()) {
    lines.push("");
  }
  lines.push(...createSeparator(`${context.startedAt.toISOString()} ${context.operation}`));
  if (context.activityLog.length) {
    lines.push("Performed the following actions:");
    lines.push("");
    lines.push(...context.activityLog.map((line) => `- ${line}`));
    lines.push("");
  }
  if ("rollback" === context.manualActionRequired) {
    if (context.manualFileSystemInstructions.length) {
      lines.push("Please complete the rollback manually as follows:");
      lines.push("");
      lines.push(...context.manualFileSystemInstructions.map((line) => `- ${line}`));
      lines.push("");
    }
  } else {
    if (context.manualFileSystemInstructions.length) {
      lines.push(`Please complete the operation manually as follows:`);
      lines.push("");
      lines.push(...context.manualFileSystemInstructions.map((line) => `- ${line}`));
      lines.push("");
    }
    if (context.manualCommandInstructions.length) {
      if (context.manualFileSystemInstructions.length) {
        lines.push("Then run the following commands:");
      } else {
        lines.push(`Please complete operation manually by running the following commands:`);
      }
      lines.push("");
      lines.push(...context.manualCommandInstructions.map((line) => `- ${line}`));
      lines.push("");
    }
  }
  (0, import_fs2.writeFileSync)(file.path, lines.flatMap(breakLine).join("\n"), { encoding: "utf-8", flag: "a" });
}

// src/utilities/config-wizard.ts
var import_process2 = require("process");

// src/utilities/prompt.ts
var import_process = require("process");
var prompts = require_prompts3();
function forcePinned(value) {
  return { value: value.value, pinned: true };
}
function toValidator(parseNewValue) {
  return (value) => {
    const result = parseNewValue(value, void 0);
    return result && "object" === typeof result && "error" in result ? result.error : true;
  };
}
function createDefaultOption(value) {
  return ["default", defaultMightChange(value), unpinned(value)];
}
function toChoice(options) {
  return options.map((option) => ({ title: option[0], description: option[1], value: option[2], selected: option[3] }));
}
function findNonPinnableMatchingChoice(choices, ...selectedValues) {
  for (const selectedValue of selectedValues) {
    const index = choices.findIndex((choice) => choice[0] === selectedValue);
    if (0 <= index) {
      return index;
    }
  }
  return 0;
}
function findPinnableMatchingChoice(choices, ...selectedValues) {
  for (const selectedValue of selectedValues) {
    if (selectedValue) {
      const index1 = choices.findIndex(
        (choice) => choice[2].pinned === selectedValue.pinned && choice[2].value === selectedValue.value
      );
      if (0 <= index1) {
        return index1;
      }
      const index2 = choices.findIndex((choice) => choice[2].value === selectedValue.value);
      if (0 <= index2) {
        return index2;
      }
    }
  }
  return 0;
}
async function prompt(options) {
  return (await prompts({ ...options, name: "RESULT" }) ?? {})["RESULT"] ?? (0, import_process.exit)(1);
}
async function promptMultiSelect(options) {
  return await prompt({
    instructions: false,
    hint: "[space | arrow right/left] = toggle selection; [enter / return] = save and continue",
    ...options
  });
}
async function promptYesNo(options) {
  return await prompt({
    type: "select",
    message: options.message,
    choices: [
      { title: "Yes", value: true, description: options.yesHint },
      { title: "No", value: false, description: options.noHint }
    ],
    initial: options.default ? 0 : 1
  });
}

// src/utilities/config-wizard.ts
async function getNewConfig(projectRoot, parsedConfig, commandLineConfig) {
  const presets = { oldConfig: await getOldConfig(parsedConfig), commandLineConfig };
  const version = VERSION_NUMBER;
  const projectName = await getProjectName(presets, projectRoot);
  const artifact = await getArtifact(presets);
  const runtime = await getRuntime(presets);
  const moduleSystem = await getModuleSystem(presets);
  const installationMode = await getInstallationMode(presets);
  const bundler = await getBundler(presets, artifact);
  const dtsBundler = await getDtsBundler(presets, artifact, bundler);
  const formatter = await getFormatter2(presets);
  const tabSize = await getTabSize(presets);
  const packageManager = await getPackageManager2(presets);
  const srcDir = await getSrcDir(presets);
  const webAppDir = await getWebAppDir(presets, { runtime, artifact });
  const tscOutDir = await getTscOutDir(presets, { projectName, runtime, bundler, dtsBundler, webAppDir });
  const bundlerOutDir = await getBundlerOutDir(presets, { runtime, bundler, webAppDir });
  const dependencies = await getDependencies(presets, { runtime });
  const installDevDependencies = await getInstallDevDependencies(presets);
  const upliftDependencies = await getUpliftDependencies(presets);
  const createProjectTemplate = await getCreateProjectTemplate(presets);
  const createDebugModule2 = true === commandLineConfig.createDebugModule ? true : false;
  const createMakefile2 = getCreateMakefile(presets, createProjectTemplate);
  const vsCodeSettings = await getVsCodeSettings(presets);
  return {
    artifact,
    bundler,
    bundlerOutDir,
    createDebugModule: createDebugModule2,
    createMakefile: createMakefile2,
    createProjectTemplate,
    dependencies,
    dtsBundler,
    formatter,
    installationMode,
    installDevDependencies,
    moduleSystem,
    packageManager,
    projectName,
    runtime,
    srcDir,
    tabSize,
    tscOutDir,
    upliftDependencies,
    version,
    vsCodeSettings,
    webAppDir
  };
}
async function getOldConfig(parsedConfig) {
  if (parsedConfig) {
    const { partial, errors } = parsedConfig;
    if (errors && errors.length) {
      console.log(`Invalid configuration in ${parsedConfig.configFile}:`);
      errors.forEach((error2) => console.log(1 < errors.length ? `- ${error2}` : error2));
      console.log("");
      const choices = toChoice([
        ["yes", "Reconfigure the project anyway", true],
        ["no", "Abort the configuration wizard", false]
      ]);
      const message = "Proceed despite errors?";
      if (!await prompt({ type: "select", hint: " ", message, choices, initial: 0 })) {
        (0, import_process2.exit)(1);
      }
    }
    return partial;
  } else {
    return void 0;
  }
}
async function getProjectName(presets, projectRoot) {
  const defaultName = projectRoot.path.replace(/.*\//, "").trim();
  const preselectedName = presets.commandLineConfig.projectName;
  if (void 0 !== preselectedName) {
    return DEFAULT_ENUM === preselectedName ? defaultName : preselectedName;
  }
  return prompt({
    type: "text",
    initial: presets.oldConfig?.projectName?.trim() || defaultName,
    message: "Project name",
    format: (input) => input.trim(),
    validate: toValidator(ConfigProperties.projectName.parseNewValue)
  });
}
async function getArtifact(presets) {
  const FIELD = "artifact";
  const defaultValue = DEFAULT_ARTIFACT;
  const presetValue = presets.commandLineConfig[FIELD];
  const oldValue = presets.oldConfig?.[FIELD];
  if (presetValue) {
    return DEFAULT_ENUM === presetValue ? defaultValue : presetValue;
  } else {
    const options = ConfigProperties[FIELD].options.map((array) => [...array, array[0]]);
    const choices = toChoice(options);
    const initial = findNonPinnableMatchingChoice(options, oldValue, defaultValue);
    return prompt({ type: "select", message: "Artifact", choices, initial });
  }
}
async function getRuntime(presets) {
  const FIELD = "runtimeCli";
  const preselectedValue = DEFAULT_RUNTIME;
  const presetValue = DEFAULT_ENUM === presets.commandLineConfig[FIELD] ? "cli" : presets.commandLineConfig[FIELD];
  const oldValue = runtimeConfigToCli(presets.oldConfig?.["runtime"]);
  if (presetValue) {
    return runtimeCliToConfig(presetValue);
  } else {
    const options = ConfigProperties[FIELD].options.map((array) => [...array, array[0]]);
    const choices = toChoice(options);
    const initial = findNonPinnableMatchingChoice(options, oldValue, preselectedValue);
    return runtimeCliToConfig(
      await prompt({ type: "select", message: "Runtime", choices, initial })
    );
  }
}
function runtimeConfigToCli(property) {
  if (void 0 === property) {
    return void 0;
  } else {
    return "node" === property.value && !property.pinned ? "cli" : property.value;
  }
}
function runtimeCliToConfig(value) {
  if ("cli" === value || DEFAULT_ENUM === value) {
    return unpinned("node");
  } else {
    return pinned(value);
  }
}
async function getModuleSystem(presets) {
  const FIELD = "moduleSystem";
  const defaultValue = DEFAULT_MODULE_SYSTEM;
  const presetValue = presets.commandLineConfig[FIELD];
  const oldValue = presets.oldConfig?.[FIELD];
  if (presetValue) {
    return DEFAULT_ENUM === presetValue ? defaultValue : presetValue;
  } else {
    const options = ConfigProperties[FIELD].options.map((array) => [...array, array[0]]);
    const choices = toChoice(options);
    const initial = findNonPinnableMatchingChoice(options, oldValue, defaultValue);
    return prompt({ type: "select", message: "Module system", choices, initial });
  }
}
async function getInstallationMode(presets) {
  const FIELD = "installationMode";
  const defaultValue = DEFAULT_INSTALLATION_MODE;
  const presetValue = presets.commandLineConfig[FIELD];
  const oldValue = presets.oldConfig?.[FIELD];
  if (presetValue) {
    return DEFAULT_ENUM === presetValue ? defaultValue : presetValue;
  } else {
    const options = ConfigProperties[FIELD].options.map((array) => [...array, array[0]]);
    const choices = toChoice(options);
    const initial = findNonPinnableMatchingChoice(options, oldValue, defaultValue);
    return prompt({ type: "select", message: "Launchpad installation mode", choices, initial });
  }
}
async function getBundler(presets, artifact) {
  const FIELD = "bundler";
  const defaultValue = DEFAULT_BUNDLER;
  const preselectedValue = "lib" === artifact ? DEFAULT_BUNDLER : pinned("disabled");
  const presetValue = presets.commandLineConfig[FIELD];
  const oldValue = presets.oldConfig?.[FIELD];
  if (presetValue) {
    return DEFAULT_ENUM === presetValue ? defaultValue : forcePinned(presetValue);
  } else {
    const options = [
      createDefaultOption(defaultValue.value),
      ...ConfigProperties[FIELD].options.map((array) => [...array, pinned(array[0])])
    ];
    const choices = toChoice(options);
    const initial = findPinnableMatchingChoice(options, oldValue, preselectedValue);
    return prompt({ type: "select", message: "Bundler", choices, initial });
  }
}
async function getDtsBundler(presets, artifact, bundler) {
  if ("disabled" === bundler.value) {
    return pinned("disabled");
  }
  const FIELD = "dtsBundler";
  const defaultValue = "lib" === artifact ? DEFAULT_DTS_BUNDLER : pinned("disabled");
  const presetValue = presets.commandLineConfig[FIELD];
  const oldValue = presets.oldConfig?.[FIELD];
  if (presetValue) {
    return DEFAULT_ENUM === presetValue ? defaultValue : forcePinned(presetValue);
  } else {
    const options = [
      createDefaultOption(defaultValue.value),
      ...ConfigProperties[FIELD].options.map((array) => [...array, pinned(array[0])])
    ];
    const choices = toChoice(options);
    const initial = findPinnableMatchingChoice(options, oldValue, defaultValue);
    return prompt({ type: "select", message: "DTS bundler", choices, initial });
  }
}
async function getFormatter2(presets) {
  const FIELD = "formatter";
  const defaultValue = DEFAULT_FORMATTER;
  const presetValue = presets.commandLineConfig[FIELD];
  const oldValue = presets.oldConfig?.[FIELD];
  if (presetValue) {
    return DEFAULT_ENUM === presetValue ? defaultValue : forcePinned(presetValue);
  } else {
    const options = [
      createDefaultOption(defaultValue.value),
      ...ConfigProperties[FIELD].options.map((array) => [...array, pinned(array[0])])
    ];
    const choices = toChoice(options);
    const initial = findPinnableMatchingChoice(options, oldValue, defaultValue);
    return prompt({ type: "select", message: "Formatter", choices, initial });
  }
}
async function getTabSize(presets) {
  const FIELD = "tabSize";
  const defaultValue = DEFAULT_TAB_SIZE;
  const presetValue = presets.commandLineConfig[FIELD];
  const oldValue = presets.oldConfig?.[FIELD];
  if (presetValue) {
    return DEFAULT_ENUM === presetValue ? defaultValue : presetValue;
  } else {
    return prompt({
      type: "number",
      initial: oldValue ?? defaultValue,
      message: "Tab size",
      validate: toValidator((value, source) => {
        if ("" === value) {
          return "";
        } else {
          const result = ConfigProperties[FIELD].parseNewValue(value, source);
          return "number" === typeof result ? `${result}` : result;
        }
      })
    });
  }
}
async function getPackageManager2(presets) {
  const FIELD = "packageManager";
  const defaultValue = DEFAULT_PACKAGE_MANAGER;
  const presetValue = presets.commandLineConfig[FIELD];
  const oldValue = presets.oldConfig?.[FIELD];
  if (presetValue) {
    return DEFAULT_ENUM === presetValue ? defaultValue : forcePinned(presetValue);
  } else {
    const options = [
      createDefaultOption(defaultValue.value),
      ...ConfigProperties[FIELD].options.map((array) => [...array, pinned(array[0])])
    ];
    const choices = toChoice(options);
    const initial = findPinnableMatchingChoice(options, oldValue, defaultValue);
    return prompt({ type: "select", message: "Package manager", choices, initial });
  }
}
async function getSrcDir(presets) {
  const FIELD = "srcDir";
  const defaultDirectory = DEFAULT_SRC_DIR;
  const preselectedDirectory = presets.commandLineConfig[FIELD];
  if (preselectedDirectory) {
    return DEFAULT_ENUM === preselectedDirectory ? defaultDirectory : preselectedDirectory;
  } else {
    return prompt({
      type: "text",
      initial: presets.oldConfig?.[FIELD] ?? defaultDirectory,
      message: "Source directory",
      format: (input) => input.trim(),
      validate: toValidator(ConfigProperties[FIELD].parseNewValue)
    });
  }
}
async function getWebAppDir(presets, config) {
  if ("web" !== config.runtime.value) {
    return "";
  }
  const FIELD = "webAppDir";
  const defaultDirectory = DEFAULT_DIST_DIR;
  const preselectedDirectory = presets.commandLineConfig[FIELD];
  if (preselectedDirectory) {
    return DEFAULT_ENUM === preselectedDirectory ? defaultDirectory : preselectedDirectory;
  } else {
    const previousValue = presets.oldConfig?.[FIELD];
    return prompt({
      type: "text",
      initial: previousValue?.trim() || defaultDirectory,
      message: "Web app root directory",
      format: (input) => input.trim(),
      validate: toValidator(ConfigProperties[FIELD].parseNewValue)
    });
  }
}
async function getTscOutDir(presets, config) {
  const FIELD = "tscOutDir";
  const defaultDirectory = getDefaultTscOutDir(config);
  const preselectedDirectory = presets.commandLineConfig[FIELD];
  if (preselectedDirectory) {
    return DEFAULT_ENUM === preselectedDirectory ? defaultDirectory : preselectedDirectory;
  } else {
    return prompt({
      type: "text",
      initial: presets.oldConfig?.[FIELD] ?? defaultDirectory,
      message: "TSC output directory",
      format: (input) => input.trim(),
      validate: toValidator(ConfigProperties[FIELD].parseNewValue)
    });
  }
}
function getDefaultTscOutDir(config) {
  if ("web" === config.runtime.value) {
    return "disabled" === config.bundler.value ? `${config.webAppDir}/js/${config.projectName}` : DEFAULT_BUILD_DIR;
  } else {
    return "disabled" === config.bundler.value ? DEFAULT_DIST_DIR : DEFAULT_BUILD_DIR;
  }
}
async function getBundlerOutDir(presets, config) {
  if ("disabled" === config.bundler.value) {
    return "";
  }
  const FIELD = "bundlerOutDir";
  const defaultDirectory = "web" === config.runtime.value && config.webAppDir ? `${config.webAppDir}/js` : DEFAULT_DIST_DIR;
  const preselectedDirectory = presets.commandLineConfig[FIELD];
  if (preselectedDirectory) {
    return DEFAULT_ENUM === preselectedDirectory ? defaultDirectory : preselectedDirectory;
  } else {
    const previousValue = presets.oldConfig?.[FIELD];
    return prompt({
      type: "text",
      initial: previousValue?.trim() || defaultDirectory,
      message: "Bundler output directory",
      format: (input) => input.trim(),
      validate: toValidator(createDirectoryParser("Bundler output directory", "mandatory"))
    });
  }
}
async function getDependencies(presets, config) {
  const options = getDependencyOptions(presets, config);
  if (0 == options.interactive.length) {
    return options.autoSelected;
  } else {
    const selection = await promptMultiSelect({
      type: "multiselect",
      choices: options.interactive,
      message: "Install packages"
    });
    return [...options.autoSelected, ...selection].sort();
  }
}
function getDependencyOptions(presets, config) {
  const defaultOptionalDependencies = "web" === config.runtime.value ? DEFAULT_DEPENDENCIES_WEB : DEFAULT_DEPENDENCIES_CLI;
  return toDependencyOptions({
    mandatory: toSet(presets.commandLineConfig.dependencies, []),
    preselected: toSet(presets.commandLineConfig.preselectedDependencies, []),
    optional: toSet(presets.commandLineConfig.optionalDependencies, defaultOptionalDependencies)
  });
}
function toSet(value, defaultValues) {
  return value instanceof Array ? new Set(value) : new Set(defaultValues);
}
function toDependencyOptions(dependencies) {
  const preselected = new Set(dependencies.preselected);
  const optional = new Set(dependencies.optional);
  dependencies.mandatory.forEach((dependency) => [preselected, optional].forEach((set) => set.delete(dependency)));
  preselected.forEach((dependency) => optional.delete(dependency));
  return {
    autoSelected: [...dependencies.mandatory],
    interactive: [
      ...Array.from(preselected).map((value) => ({ value, title: value, selected: true })),
      ...Array.from(optional).map((value) => ({ value, title: value, selected: false }))
    ].sort((a, b) => a.value.localeCompare(b.value))
  };
}
async function getInstallDevDependencies(presets) {
  const FIELD = "installDevDependencies";
  const preselectedOption = presets.commandLineConfig[FIELD];
  if (void 0 !== preselectedOption) {
    return DEFAULT_ENUM === preselectedOption ? true : preselectedOption;
  } else {
    return promptYesNo({
      message: "Install dev dependencies (compiler, bundler, formatter, ...)",
      yesHint: "Install locally",
      noHint: "Rely on globally installed versions",
      default: DEFAULT_INSTALL_DEV_DEPENDENCIES
    });
  }
}
async function getUpliftDependencies(presets) {
  const FIELD = "upliftDependencies";
  const preselectedOption = presets.commandLineConfig[FIELD];
  if (void 0 !== preselectedOption) {
    return DEFAULT_ENUM === preselectedOption ? true : preselectedOption;
  } else {
    return promptYesNo({
      message: "Uplift all dependencies (not just launchpad)",
      yesHint: "Upgrade all npm packages during uplifts",
      noHint: "Only upgrade launchpad itself during uplifts",
      default: DEFAULT_UPLIFT_DEPENDENCIES
    });
  }
}
async function getCreateProjectTemplate(presets) {
  const FIELD = "createProjectTemplate";
  const preselectedOption = presets.commandLineConfig[FIELD];
  if (void 0 !== preselectedOption) {
    return DEFAULT_ENUM === preselectedOption ? !presets.oldConfig : preselectedOption;
  } else if (!presets.oldConfig) {
    return true;
  } else {
    return promptYesNo({
      message: "Create project template",
      yesHint: "Scaffold a minimal project",
      noHint: "Don't create any source files",
      default: DEFAULT_CREATE_PROJECT_TEMPLATE
    });
  }
}
async function getVsCodeSettings(presets) {
  const FIELD = "vsCodeSettings";
  const preselectedOption = presets.commandLineConfig[FIELD];
  const allCurrentValues = ConfigProperties.vsCodeSettings.options.map((item) => item[0]);
  const defaultValue = new Set(allCurrentValues);
  if (void 0 !== preselectedOption) {
    return DEFAULT_ENUM === preselectedOption ? defaultValue : preselectedOption;
  } else {
    const selection = await promptMultiSelect({
      type: "multiselect",
      choices: ConfigProperties.vsCodeSettings.options.map((item) => {
        return {
          title: item[0],
          description: item[1],
          selected: presets.oldConfig?.vsCodeSettings?.has(item[0]) ?? true,
          value: item[0]
        };
      }),
      message: "Manage VSCode settings"
    });
    return new Set(selection);
  }
}
function getCreateMakefile(presets, createProjectTemplate) {
  return "boolean" === typeof presets.commandLineConfig.createMakefile ? presets.commandLineConfig.createMakefile : createProjectTemplate;
}

// src/commands/init.ts
async function init(projectRoot, configFile, options) {
  const parsedConfig = loadConfigFile(configFile);
  const commandLineConfig = parseCommandLineOptions(options);
  const newConfig = await getNewConfig(projectRoot, parsedConfig, commandLineConfig);
  const { projectName } = newConfig;
  console.log(parsedConfig ? `Re-initializing project ${projectName}...` : `Initializing project ${projectName}...`);
  migrate({
    operation: "init",
    oldConfig: parsedConfig?.validated ?? parsedConfig?.partial,
    newConfig,
    projectRoot,
    upliftDependenciesOverride: false
  });
  console.log("");
  console.log(`\u2705 Successfully initialized project ${newConfig.projectName}`);
}

// src/commands/uplift.ts
async function uplift(projectRoot, configFile, options) {
  const commandLineOptions = parseCommandLineOptions2(options);
  const parsedConfig = loadConfigFile(configFile);
  const oldConfig = parsedConfig?.validated;
  if (!parsedConfig) {
    fail(`Config file ${configFile.path} does not exist`);
  } else if (!oldConfig) {
    const lines = [`Failed to load config file ${configFile.path}`];
    if (parsedConfig.errors) {
      if (1 === parsedConfig.errors.length) {
        parsedConfig.errors.map((line) => lines.push(line));
        lines.push('Correct the error manually or run "launchpad init" to reconfigure/reset the project');
      } else {
        lines.push("");
        parsedConfig.errors.map((line) => lines.push(`- ${line}`));
        lines.push("");
        lines.push('Correct the errors manually or run "launchpad init" to reconfigure/reset the project');
      }
    } else {
      lines.push('Try running "launchpad init" to reconfigure/reset the project');
    }
    fail(lines.flatMap(breakLine).join("\n"));
  } else {
    const project = oldConfig.projectName ? `project ${oldConfig.projectName}` : "the project";
    console.log(`Uplifting ${project}...`);
    migrate({ operation: "uplift", oldConfig, newConfig: void 0, projectRoot, ...commandLineOptions });
    console.log("");
    console.log(`\u2705 Successfully uplifted ${project}`);
  }
}
function parseCommandLineOptions2(options) {
  const result = { upliftDependenciesOverride: false };
  for (const option of options.map((option2) => option2.trim())) {
    if (["all", "a", "--all", "-all", "-a"].includes(option)) {
      result.upliftDependenciesOverride = true;
    } else if (option) {
      fail(`Invalid command line option: "${option}"`);
    }
  }
  return result;
}

// src/launchpad.ts
var COMMANDS = [
  {
    name: "init",
    help: "init .......... initialize a new project or re-configure an existing one",
    getProjectRootDirectory: () => process.cwd(),
    execute: init
  },
  {
    name: "uplift",
    help: "uplift ........ upgrade all dependencies (including launchpad) to the latest version ",
    getProjectRootDirectory: () => process.cwd(),
    execute: uplift
  }
];
async function launchpad(argv) {
  try {
    if (argv.some((arg) => arg.match(/^--?h(elp)?$/))) {
      return showHelp();
    } else if (argv.some((arg) => arg.match(/^--?(v|version)$/))) {
      return showVersion();
    } else {
      const [command, ...options] = argv.map((item) => item.trim());
      return await findAndInvokeHandler(command, options);
    }
  } catch (error2) {
    console.error("\u26D4 ERROR:", formatError(error2));
    process.exit(1);
  }
}
async function findAndInvokeHandler(argument, options) {
  const [command, ...rest] = COMMANDS.filter((command2) => command2.name.toLowerCase() === argument?.toLowerCase());
  if (!argument) {
    fail(`Missing command line argument. Try launchpad --help for more information.`);
  } else if (!command) {
    fail(`Invalid command: ${argument}. Try launchpad --help for more information.`);
  } else if (rest.length) {
    fail(`Found more than one handler for command ${argument}`);
  } else {
    const projectRoot = new Path(command.getProjectRootDirectory());
    const configFile = getConfigFilePath(projectRoot);
    return command.execute(projectRoot, configFile, options);
  }
}
function showHelp() {
  const commands = COMMANDS.map((command) => command.help).filter((help) => help.trim()).map((help) => `  ${help}`);
  const options = getConfigProperties();
  const helpMessage = [
    "Usage: launchpad [COMMAND] [OPTIONS]",
    "",
    "[COMMAND]",
    "",
    ...commands.sort(),
    "",
    "[OPTIONS]",
    "",
    ...options.map((option) => `  ${option}`).sort()
  ];
  helpMessage.forEach((line) => console.log(line));
}
function getConfigProperties() {
  const properties = ConfigProperties.arrays.currentAndInitOnly.map((property) => property.commandLineInfo).filter((property) => !!property).map((property) => ({
    parameter: `${property.option}=${property.placeholder}`,
    description: property.description
  }));
  const maxPropertyLength = properties.reduce((max, property) => Math.max(max, property.parameter.length), 0);
  return properties.map((property) => `${property.parameter.padEnd(maxPropertyLength)}   ${property.description}`);
}
function showVersion() {
  console.log(VERSION_NUMBER.render());
}

// src/launchpad-cli.ts
launchpad(process.argv.slice(2));
