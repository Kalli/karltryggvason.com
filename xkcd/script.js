function getParams(){
    var query = window.location.search.substring(1);
    var raw_vars = query.split("&");
    params = {};
    for (var i = 0; i<raw_vars.length; i++){
        var s = raw_vars[i].split("=");
        params[s[0]] = decodeURIComponent(s[1]);
    }
    return params;
}

function loadText(a, b, c){
    var text = "Personally, I find " + a  +" just as " + b + " as " + c;
    document.getElementById("guy").innerHTML = text;
    document.getElementById("settings").style.display = "none";
    document.getElementById("what").style.display = "block";
}

function setUrl(a, b, c){
    var url = location.href + "?a="+encodeURIComponent(a);
    url += "&b="+encodeURIComponent(b);
    url += "&c="+encodeURIComponent(c);
    window.history.pushState("","", url);
}

document.addEventListener("DOMContentLoaded", function() {
    var params = getParams();
    if (params.a && params.b && params.c){
        loadText(params.a, params.b, params.c);
        document.getElementById("a").value = params.a;
        document.getElementById("b").value = params.b;
        document.getElementById("c").value = params.c;
    }

    var what = document.getElementById("what");

    what.addEventListener('click', function() {
        document.getElementById("settings").style.display = "block";
        document.getElementById("what").style.display = "what";
    }, false);

    var go = document.getElementById("go");
    go.addEventListener('click', function() {
        var a = document.getElementById("a").value;
        var b = document.getElementById("b").value;
        var c = document.getElementById("c").value;
        loadText(a, b, c);
        setUrl(a, b, c);
    }, false);
});