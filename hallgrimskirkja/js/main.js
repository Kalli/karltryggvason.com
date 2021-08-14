

$(document).ready(function(){
  // Church dimensions
  var CHURCH_HEIGHT = 74.5; // Meters
  var CHURCH_VOLUME = 24230; // Cubic meters
  var CHURCH_CAPACITY = 750; // people
  var CHURCH_COST = 79824307; // kroner

  // init canvas and colors
  var colorscheme = kulers[Math.floor(Math.random()*kulers.length)];
  var colors = [];
  _.each(colorscheme.colors, function(element){
      colors.push(new Color(element));
  });
  var palette = new Palette(colors);
  var canvas = new fabric.StaticCanvas('c');
  // var canvas = new fabric.Canvas('c');

  canvas.setHeight($('#canvasholder').width());
  canvas.setWidth($('#canvasholder').width());

  var comparison;

  var ChurchComparison = function(units, dimension){
    this.units = units;
    this.dimension = dimension;
    this.churchCount = 0;
    var t = "";
    if (dimension === "HEIGHT"){
      this.churchCount = math.round(units/CHURCH_HEIGHT, 1);
      t = this.format(this.units)+" metrar er á við "+this.churchCount+ " Hallgrímskirkjur á hæð.";
      if(this.churchCount < 100){
        this.drawHeightComparison();
      }else{
        t = t + " Það eru svo margar Hallgrímskirkjur að við komum þeim ekki fyrir á skjánum þínum!";
      }
    }
    if (dimension === "VOLUME"){
      this.churchCount = math.round(units/CHURCH_VOLUME, 1);
      t = this.format(this.units)+" rúmmetrar er á við "+this.churchCount+ " fullar Hallgrímskirkjur.";
      if(this.churchCount < 500){
        this.drawVolumeComparison();
      }else{
        t = t + " Það eru svo margar Hallgrímskirkjur að við komum þeim ekki fyrir á skjánum þínum!";
      }
    }
    if (dimension === "CAPACITY"){
      this.churchCount = math.round(units/CHURCH_CAPACITY, 1);
      t = this.format(this.units) +" manns er á við "+this.churchCount+" þéttsetnar Hallgrímskirkjur.";
      if(this.churchCount < 500){
        this.drawVolumeComparison();
      }else{
        t = t + " Það eru svo margar Hallgrímskirkjur að við komum þeim ekki fyrir á skjánum þínum!";
      }
    }
    if (dimension === "COST"){
      this.churchCount = math.round(units/CHURCH_COST, 1);
      t = this.format(this.units) +" krónur er á við rekstur "+this.churchCount+" Hallgrímskirkna.";
      if(this.churchCount < 500){
        this.drawVolumeComparison();
      }else{
        t = t + " Það eru svo margar Hallgrímskirkjur að við komum þeim ekki fyrir á skjánum þínum!";
      }
    }
    $('#description').text(t);
    window.history.pushState(null, "Hallgrímskirkjumælir", location.protocol + "//" + location.host + "/hallgrimskirkja?dimension="+dimension+"&units="+units);
  };

  ChurchComparison.prototype.format = function (units){
    var tmp = String(units).split(".");
    var l = tmp[0].split("");
    var s = "";
    for (var i = 0; i<l.length; ++i){
      if(i!==0 && (l.length-i)%3===0){
        s = s+".";
      }
      s = s+l[i];
    }
    if (tmp.length > 1){
      s = s+","+tmp[1];
    }
    return s;
  };

  ChurchComparison.prototype.drawHeightComparison = function(){
    this.churchHeight = canvas.height/(this.churchCount > 1? this.churchCount:1);
    var _this = this;
    fabric.loadSVGFromURL("/hallgrimskirkja/hallgrimskirkja-height-partitioned.svg", function(objects, options) {
      var m = new fabric.PathGroup(objects, options);
      m.scale(_this.churchHeight/m.height);

      for (var i = 0; i < _this.churchCount; i++){
        m.clone( function(m){
          xpos = (canvas.width-m.currentWidth)/2;
          ypos = canvas.height-((i+1)*m.currentHeight);
          var ratio = ((_this.churchCount-i)<1 ? (_this.churchCount-i): 1);
          addChurch(m, xpos, ypos, i+1, ratio);
        });
      }
    });
  };

  ChurchComparison.prototype.drawVolumeComparison = function(){
    this.squares = math.round(math.sqrt(this.churchCount), 0)+1;
    // this.churchHeight = canvas.height/this.squares;
    this.churchHeight= math.round(canvas.height/this.squares)-1;
    var _this = this;
    fabric.loadSVGFromURL("/hallgrimskirkja/hallgrimskirkja-height-partitioned.svg", function(objects, options) {
      var m = new fabric.PathGroup(objects, options);
      m.scaleToHeight(_this.churchHeight);
      var counter = 0;
      for (var i = 0; i < _this.squares; i++){
        ypos = m.currentWidth*i;
        for (var j = 0; j < _this.squares; j++){
          if (counter < _this.churchCount){
            m.clone(function(m){
              xpos = m.currentHeight*j;
              var ratio = ((_this.churchCount-counter)<1 ? (_this.churchCount-counter): 1);
              addChurch(m, xpos, ypos, counter, (ratio));
            });
          }
          counter++;
      }
      }
    });
  };


  function addChurch(church, xpos, ypos, index, ratio){
    var fill =  palette.colors[index % palette.colors.length].hex;
    if (ratio >= 1){
      church.paths[10].fill = fill;
    }else{
      for (var j = 0; j < church.paths.length; j++){
        if (ratio*10>j){
          church.paths[j].fill = fill;
        }
      }
    }
    church.set({left: xpos, top: ypos});
    canvas.add(church);
  }


  $('#go').click(function(){
    canvas.clear();
    var type = $('#type').val();
    var value = $('#val').val();
    if(type && $.isNumeric(value)){
      comparison = new ChurchComparison(value, type);

    }
  });
  $( window ).resize(function(){
    canvas.setHeight($('#canvasholder').width());
    canvas.setWidth($('#canvasholder').width());
  });
  var params = getParams();
  if ( params["units"] && params["dimension"]){
    comparison = new ChurchComparison(params["units"], params["dimension"]);
  }
});

getParams = function() {
  var key, params, query, raw_vars, v, val, _i, _len, _ref;
  query = window.location.search.substring(1);
  raw_vars = query.split("&");
  params = {};
  for (_i = 0, _len = raw_vars.length; _i < _len; _i++) {
    v = raw_vars[_i];
    _ref = v.split("="), key = _ref[0], val = _ref[1];
    params[key] = decodeURIComponent(val);
  }
  return params;
};