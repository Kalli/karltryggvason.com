// Generated by CoffeeScript 1.7.1
(function() {
  require(["jquery", "underscore", "switch", "knob"], function($, _, Switch, Knob) {
    $(document).ready(function() {
      var Player, TapeMachine, context, player1, player2;
      Player = (function() {
        function Player(url, canvas, color) {
          this.url = url;
          this.canvas = canvas;
          this.color = color;
          this.loadBuffer();
          this.setUpAudioAnalysis();
          this.createCanvas();
          this.setBaseSpeed(1);
          this.setSpeedFine(1);
          this.playing = false;
        }

        Player.prototype.play = function() {
          if (this.buffer) {
            this.source = context.createBufferSource();
            this.source.buffer = this.buffer;
            this.source.connect(this.analyser);
            this.analyser.connect(this.proc);
            this.proc.connect(context.destination);
            this.source.connect(context.destination);
            this.startTime = Date.now();
            $(this.canvas).show();
            this.draw(0);
            this.source.loop = true;
            this.setSpeed();
            this.playing = true;
            return this.source.start(0);
          }
        };

        Player.prototype.stop = function() {
          this.playing = false;
          if (this.buffer && this.source) {
            return this.source.stop(0);
          }
        };

        Player.prototype.setBaseSpeed = function(speed) {
          this.base_speed = speed;
          return this.setSpeed();
        };

        Player.prototype.setSpeedFine = function(speed) {
          this.fine_speed = speed;
          return this.setSpeed();
        };

        Player.prototype.setSpeed = function() {
          if (this.source) {
            return this.source.playbackRate.value = this.base_speed * this.fine_speed;
          }
        };

        Player.prototype.getPeaks = function() {
          var c, chan, i, k, peak, slice, sum, sums, vals, _i, _j, _ref, _ref1;
          k = this.buffer.getChannelData(0).length / this.width;
          slice = Array.prototype.slice;
          sums = [];
          for (i = _i = 0, _ref = this.width; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            sum = 0;
            for (c = _j = 0, _ref1 = this.buffer.numberOfChannels - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; c = 0 <= _ref1 ? ++_j : --_j) {
              chan = this.buffer.getChannelData(c);
              vals = slice.call(chan, i * k, (i + 1) * k);
              peak = Math.max.apply(Math, vals.map(Math.abs));
              sum += peak;
            }
            sums[i] = sum;
          }
          return sums;
        };

        Player.prototype.loadBuffer = function() {
          var request, self;
          self = this;
          request = new XMLHttpRequest();
          request.open('GET', this.url, true);
          request.responseType = 'arraybuffer';
          request.onload = (function(_this) {
            return function() {
              var onerror, onsuccess;
              onsuccess = function(buffer) {
                self.buffer = buffer;
                self.peaks = self.getPeaks();
                return $('#machine').css("-webkit-transform", "scale(" + $('.hero-unit').width() / 1024 + ")");
              };
              onerror = function() {
                return alert("Could not load " + this.url);
              };
              return context.decodeAudioData(request.response, onsuccess, onerror);
            };
          })(this);
          return request.send();
        };

        Player.prototype.setUpAudioAnalysis = function() {
          this.analyser = context.createAnalyser();
          this.proc = context.createScriptProcessor(this.analyser.fftSize / 2, 1, 1);
          return this.proc.onaudioprocess = (function(_this) {
            return function(e) {
              var mod, playtime, pos;
              if (_this.buffer && _this.playing) {
                playtime = Date.now() - _this.startTime;
                mod = playtime % (_this.buffer.duration * 1000 / _this.base_speed);
                pos = (mod / (_this.buffer.duration * 1000 / _this.base_speed)) * _this.width;
                return _this.draw(Math.round(pos));
              }
            };
          })(this);
        };

        Player.prototype.createCanvas = function() {
          this.height = $(this.canvas).height();
          this.width = $(this.canvas).width();
          return this.cc = $(this.canvas)[0].getContext('2d');
        };

        Player.prototype.drawFrame = function(index, value, max) {
          var h, w, x, y;
          w = 1;
          h = Math.round(value * (this.height / max));
          x = index * w;
          y = Math.round((this.height - h) / 2);
          return this.cc.fillRect(x, y, w, h);
        };

        Player.prototype.draw = function(samplePos) {
          var i, _i, _ref;
          this.maxPeak = Math.max.apply(Math, this.peaks);
          for (i = _i = 0, _ref = this.peaks.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            if (samplePos > i) {
              this.cc.fillStyle = this.color;
            } else {
              this.cc.fillStyle = "rgb(0,0,0)";
            }
            this.drawFrame(i, this.peaks[i], this.maxPeak);
          }
          return void 0;
        };

        return Player;

      })();
      TapeMachine = (function() {
        function TapeMachine(el, player) {
          this.el = el;
          this.player = player;
          this.setupSpeedToggle();
          this.setupFineSpeed();
          this.setupPlayStop();
        }

        TapeMachine.prototype.setupSpeedToggle = function() {
          var speed_toggle;
          speed_toggle = new Switch({
            el: $(this.el).find('.speed'),
            states: ['normal', 'half']
          });
          speed_toggle.on('normal', (function(_this) {
            return function() {
              return _this.player.setBaseSpeed(1);
            };
          })(this));
          return speed_toggle.on('half', (function(_this) {
            return function() {
              return _this.player.setBaseSpeed(0.5);
            };
          })(this));
        };

        TapeMachine.prototype.setupFineSpeed = function() {
          var fine_speed_control;
          fine_speed_control = new Knob({
            el: $(this.el).find('.fine-speed'),
            initial_value: 1,
            valueMin: 0.90,
            valueMax: 1.10
          });
          return fine_speed_control.on('valueChanged', (function(_this) {
            return function(v) {
              return _this.player.setSpeedFine(v);
            };
          })(this));
        };

        TapeMachine.prototype.setupPlayStop = function() {
          var play_stop_control;
          play_stop_control = new Switch({
            el: $(this.el).find('.play')
          });
          play_stop_control.on('on', (function(_this) {
            return function() {
              return _this.player.play();
            };
          })(this));
          return play_stop_control.on('off', (function(_this) {
            return function() {
              return _this.player.stop();
            };
          })(this));
        };

        return TapeMachine;

      })();
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();
      player1 = new Player('/audio/jsgonnarain.mp3', '#c1', "#007db3");
      player2 = new Player('/audio/jsgonnarain.mp3', '#c2', "#ff0000");
      new TapeMachine('#machine1', player1);
      new TapeMachine('#machine2', player2);
      return player2.setBaseSpeed(0.98);
    });
    $(window).resize(function() {
      $('#machine').css("-webkit-transform", "scale(" + $('.hero-unit').width() / 1024 + ")");
      return void 0;
    });
    return $(window).load(function() {
      $('#machine').css("-webkit-transform", "scale(" + $('.hero-unit').width() / 1024 + ")");
      return void 0;
    });
  });

}).call(this);
