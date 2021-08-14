var Player, TapeMachine, analyser, audioContext, canvas, context, ctx, player1, player2;
      Player = (function() {

        function Player(url) {
          this.url = url;
          this.loadBuffer();
          this.setBaseSpeed(1);
          this.setSpeedFine(1);
          this.createAnalyserNode();
          this.canvas = document.getElementById('fft');
          this.ctx = canvas.getContext('2d');
          this.ctx.fillStyle = "white";
        }

        Player.prototype.play = function() {
          if (this.buffer) {
            this.source = context.createBufferSource();
            this.source.buffer = this.buffer;
            this.source.connect(this.analyser);
            this.source.loop = true;
            this.setSpeed();
            return this.source.noteOn(0);
          }
        };

        Player.prototype.stop = function() {
          if (this.buffer && this.source) {
            return this.source.noteOff(0);
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

        Player.prototype.createAnalyserNode = function() {
          this.analyser = context.createAnalyser();
          this.analyser.connect(context.destination);
        };

        Player.prototype.loadBuffer = function() {
          var request, self,
            _this = this;
          self = this;
          request = new XMLHttpRequest();
          request.open('GET', this.url, true);
          request.responseType = 'arraybuffer';
          request.onload = function() {
            var onerror, onsuccess;
            onsuccess = function(buffer) {
              return self.buffer = buffer;
            };
            onerror = function() {
              return alert("Could not load " + this.url);
            };
            return context.decodeAudioData(request.response, onsuccess, onerror);
          };
          return request.send();
        };
        

        Player.prototype.draw = function() {
          var freqData;
          freqData = new Uint8Array(this.analyser.frequencyBinCount);
          this.analyser.getByteFrequencyData(freqData);
          console.log(this.analyser.getByteTimeDomainData(freqData));
          CANVAS_HEIGHT = canvas.height;
          CANVAS_WIDTH = canvas.width;
          OFFSET = 100;
          SPACING = 10;
          this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
          avg = 0;
          for (var i = 0; i < freqData.length - OFFSET; i++) {
            // Work out the hight of the current bar
            // by getting the current frequency
            var magnitude = freqData[i + OFFSET];
            // Draw a bar from the bottom up (cause for the "-magnitude")
            this.ctx.fillRect(i * SPACING, CANVAS_HEIGHT, SPACING / 2, -magnitude);
          };          
        };

        return Player;

      })();
      player1 = new Player('/audio/jsgonnarain.mp3');
