function Color(hex){
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    this.hex = "#"+hex;
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    this.r = parseInt(result[1], 16);
    this.g = parseInt(result[2], 16);
    this.b = parseInt(result[3], 16);
}

Color.prototype.brightness = function() {
    return Math.floor((this.r+this.g+this.b)/3);
}

function Palette(colors){
    this.colors = colors;
}

Palette.prototype.lightest = function(){
    var brightest;
    var min = 255;
    _.each(this.colors, function(color, index){
        if (color.brightness() < min){
            brightest = color;
        }
    });
    return brightest;
}
Palette.prototype.darkest = function(){
    var darkest;
    var max = 0;
    _.each(this.colors, function(color, index){
        console.log(color.brightness());
        if (color.brightness() > max){
            darkest = color;
        }
    });
    return darkest;
}