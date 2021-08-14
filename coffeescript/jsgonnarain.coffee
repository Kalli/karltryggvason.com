require(["jquery","underscore", "switch" , "knob"], ( $, _, Switch, Knob) ->
  $(document).ready ->

    class Player
      constructor: (@url, @canvas, @color) ->
        this.loadBuffer()
        this.setUpAudioAnalysis()
        this.createCanvas()
        this.setBaseSpeed(1)
        this.setSpeedFine(1)
        this.playing = false

      play: ->
        if @buffer
          @source = context.createBufferSource()
          @source.buffer = @buffer
          @source.connect this.analyser
          this.analyser.connect this.proc
          this.proc.connect context.destination
          @source.connect context.destination
          this.startTime = Date.now()
          $(@canvas).show()
          this.draw(0)
          @source.loop = true
          this.setSpeed()
          this.playing = true
          @source.start 0

      stop: ->
        this.playing = false
        if @buffer && @source
          @source.stop 0

      setBaseSpeed: (speed) ->
        @base_speed = speed
        this.setSpeed()

      setSpeedFine: (speed) ->
        @fine_speed = speed
        this.setSpeed()

      setSpeed: ->
        if @source
          @source.playbackRate.value = @base_speed * @fine_speed

      getPeaks: () ->
        k = this.buffer.getChannelData(0).length / this.width
        slice = Array.prototype.slice
        sums = []
        for i in [0 .. this.width]
          sum = 0
          for c in [0 .. this.buffer.numberOfChannels-1]
            chan = this.buffer.getChannelData(c)
            vals = slice.call(chan,i*k, (i+1)*k)
            peak = Math.max.apply(Math, vals.map(Math.abs))
            sum += peak
          sums[i]=sum
        sums
      
      loadBuffer: ->
        self = this
        request = new XMLHttpRequest()
        request.open('GET', @url, true)
        request.responseType = 'arraybuffer'
        request.onload = =>
          onsuccess = (buffer) ->
            self.buffer = buffer
            self.peaks = self.getPeaks()
            $('#machine').css("-webkit-transform","scale("+$('.hero-unit').width()/1024+")")
          onerror = -> alert "Could not load #{@url}"
          context.decodeAudioData request.response, onsuccess, onerror

        request.send()

      setUpAudioAnalysis: () ->
        this.analyser = context.createAnalyser()
        this.proc = context.createScriptProcessor(this.analyser.fftSize/2,1,1)
        this.proc.onaudioprocess = (e) => 
          if @buffer and this.playing
            playtime = Date.now() - this.startTime
            mod = playtime % (@buffer.duration*1000 / this.base_speed)
            pos = (mod / (@buffer.duration*1000 / this.base_speed)) * (this.width)
            this.draw(Math.round(pos))
            

      createCanvas: () ->
        this.height = $(@canvas).height()
        this.width = $(@canvas).width()
        this.cc = $(@canvas)[0].getContext('2d')

      drawFrame: (index, value, max) ->
        w = 1
        h = Math.round(value * (this.height/max))
        x = index * w
        y = Math.round((this.height - h)/2)
        this.cc.fillRect(x, y, w, h)

      draw: (samplePos) ->
        this.maxPeak = Math.max.apply(Math, this.peaks)
        for i in [0 .. this.peaks.length]
          if samplePos > i
            this.cc.fillStyle = @color
          else
            this.cc.fillStyle = "rgb(0,0,0)"
          this.drawFrame(i, this.peaks[i], this.maxPeak)
        
        undefined

    class TapeMachine
      constructor: (@el, @player) ->
        @setupSpeedToggle()
        @setupFineSpeed()
        @setupPlayStop()

      setupSpeedToggle: () ->
        speed_toggle = new Switch(el: $(@el).find('.speed'), states: ['normal', 'half'])
        speed_toggle.on('normal', => @player.setBaseSpeed(1))
        speed_toggle.on('half', => @player.setBaseSpeed(0.5))

      setupFineSpeed: () ->
        fine_speed_control = new Knob(
          el: $(@el).find('.fine-speed')
          initial_value: 1
          valueMin: 0.90
          valueMax: 1.10
        )

        fine_speed_control.on('valueChanged', (v) =>
          @player.setSpeedFine(v)
        )

      setupPlayStop: () ->
        play_stop_control = new Switch(el: $(@el).find('.play'))
        play_stop_control.on('on', => @player.play())
        play_stop_control.on('off', => @player.stop())

    AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    player1 = new Player('/audio/jsgonnarain.mp3', '#c1', "#007db3")
    player2 = new Player('/audio/jsgonnarain.mp3', '#c2', "#ff0000")
    new TapeMachine('#machine1', player1)
    new TapeMachine('#machine2', player2)
    player2.setBaseSpeed(0.98)

  $(window).resize ->
    $('#machine').css("-webkit-transform","scale("+$('.hero-unit').width()/1024+")");
    undefined

  $(window).load ->
    $('#machine').css("-webkit-transform","scale("+$('.hero-unit').width()/1024+")");
    undefined

)
