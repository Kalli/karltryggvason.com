function countGroups(nodes){
	var max = 0;
	for(var i=0;i<nodes.length;i++){
		if(nodes[i].group>max){
			max = nodes[i].group;
		}
	}
	return max;
}

function findNeighbors(links, node){
	var connectednodes = [];
	for(var j=0; j<links.length; j++){
		if (links[j].target.id == node.id && links[j].source.id != node.id ){
			connectednodes.push(links[j]);
		}
		if (links[j].source.id == node.id && links[j].target.id != node.id ){
			connectednodes.push(links[j]);
		}
	}
	return connectednodes;
}
function createLabelLinks(labelstring){
	var labels = labelstring.split(",");
	var labelspan = $('<span>');
	for(var i=0;i<labels.length;i++){
		var labellink = $('<a>').attr("href","http://www.discogs.com/label/"+escape(labels[i])).attr("target","blank").text(labels[i]);
		if ((i+1)!==labels.length){
			labellink.append(",");
		}
		labelspan.append(labellink);
	}
	return labelspan;
}
function displayNetworkConnections(node, neighbors, element){
	var artistlink = $("<p>").append($("<a>").attr("href", "http://www.discogs.com/artist/"+escape(node.name)).attr("target","blank").text(node.name));
	var info = $('<div>').append(artistlink);
	if (neighbors.length>0){
		artistlink.append(' is connected to: ');
		var ul = $('<ul>');
		for (var i = 0;i<neighbors.length;i++){
			if (neighbors[i].target.id != neighbors[i].source.id){
				var li = $('<li>');
				var connectionLink;
				if (neighbors[i].target.id == node.id){
					connectionLink = $("<a>").attr("href", "http://www.discogs.com/artist/"+escape(neighbors[i].source.name)).attr("target","blank").text(neighbors[i].source.name);
					li.append(connectionLink);
				}else{
					connectionLink = $("<a>").attr("href", "http://www.discogs.com/artist/"+escape(neighbors[i].target.name)).attr("target","blank").text(neighbors[i].target.name);
					li.append(connectionLink);
				}
				li.append(" via ");
				var link = createLabelLinks(neighbors[i].label);
				li.append(link);
			ul.append(li);
			}
		}
		info.append(ul);
	}else{
		artistlink.append(" doesn't have any connections");
	}
	$('#'+element).html(info);
}
function drawGraph(name, chartelement, infoelement){
	$('#'+infoelement).html("");
	$("#"+chartelement).html("");
	var w = $("#"+chartelement).width();
	var h = w*0.7;
	var fill = d3.scale.category20();

	var vis = d3.select("#"+chartelement)
	.append("svg:svg")
	.attr("width", w)
	.attr("height", h);
	d3.json("/discogsgrapher/data/"+name+".json", function(json) {
		var g = countGroups(json.nodes);
		for(var i;i<json.nodes.length;i++){
			node.x = node[i].group*(w/g)+Math.random()*(w/g);
			node.y = node[i].group*(h/g)+Math.random()*(h/g);
		}
	var force = d3.layout.force()
		.charge(-10) .gravity(0.1)
		.linkDistance(function(l){
			if(l.source.group == l.target.group){
				return 100/l.value;
			}else{
				return 400/l.value;
			}
		}
			)
		.nodes(json.nodes)
		.links(json.links)
		.size([w, h])
		.start();
	var link = vis.selectAll("line.link")
		.data(json.links)
		.enter().append("svg:line")
		.attr("class", "link")
		.style("stroke-width", function(d) { return .5; })
		.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; })
		.on("mouseover", function(l){
			//document.getElementById("info").textContent = l.source.name +" and "+l.target.name+" both released on "+l.label;
		})
		;

	var node = vis.selectAll("g.node")
		.data(json.nodes)
		.enter().append("svg:g")
		.attr("class", "node")
		node.append("svg:circle")
		.attr("r", function(d) { return Math.log(d.count)*5 || 10; })
		.style("opacity", .7)
		.style("fill", function(d) { return fill(d.group); })
		.on("mouseover", function() {
			d3.select(this).transition()
			.attr("stroke-width","0")
			.text(function(d) {
				return d.name;
			})
			.attr("r", function(d) { return Math.log(d.count)*5 || 10; })
			.style("opacity", 1)
			.attr("stroke","grey");}
		)
		.on("click", function() {
			d3.select(this).transition()
			.attr("stroke-width","0")
			.text(function(d) {
				var neighbors = findNeighbors(json.links, d);
				displayNetworkConnections(d, neighbors, infoelement);
				return d.name; })
			.attr("r", function(d) { return Math.log(d.count)*5 || 10; })
			.style("opacity", 1)
			.attr("stroke","grey");}
		)
		.on("mouseout", function() {
			d3.select(this).transition()
			.attr("stroke-width","0")
			.attr("r", function(d) { return Math.log(d.count)*5 || 10; })
			.style("opacity", .7)
			.transition()
			.duration(1000)
			.attr("stroke","black");})
		.call(force.drag);
		var drag = force.drag()
			.on("dragstart", dragstart);
			$('svg circle').tipsy({
			gravity: 'n',
			html: true,
			offset: 20,
			title: function() {
				var d = this.__data__;
				return d.name;
			}
        });
		
		vis.style("opacity", 1e-6)
		.transition()
		.duration(1000)
		.style("opacity", 1);

		force.on("tick", function() {
			link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });
			node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		});
	});
}
function dragstart(d) {
  d.fixed = true;
  d3.select(this).classed("fixed", true);
}


$(document).ready(function(){
	$('.btn').bind("click", function(){
		$('.btn').removeClass("active");
		$(this).addClass("active");
	});
	drawGraph("Drum-n-Bass-UK-1993-1993", "dnbchart", "dnbinfo");
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		if(String(e.target).indexOf("dubstep") != -1){
			drawGraph("Dubstep-UK-2004-2004", "dubchart", "dubinfo");
		}
	});
	$('#dnbslider').slider().on('slideStop', function(ev){
		var years = ev.value[1]-ev.value[0];
		var rangeString = years!==0? ev.value[0]+"-"+ev.value[1]:ev.value[0];
		var yearsString = years>2? years:"2";
		$("#dnbheading").text("dnb/jungle artists who released more than "+yearsString+" tracks in "+rangeString);
		var range = "Drum-n-Bass-UK-"+String(ev.value[0])+"-"+String(ev.value[1]);
		drawGraph(range, "dnbchart", "dnbinfo");
	});
	$('#dubslider').slider().on('slideStop', function(ev){
		var years = ev.value[1]-ev.value[0];
		var rangeString = years!==0? ev.value[0]+"-"+ev.value[1]:ev.value[0];
		var yearsString = years>2?years:"2";
		$("#dubheading").text("dubstep artists who released more than "+yearsString+" tracks in "+rangeString);
		var range = "Dubstep-UK-"+String(ev.value[0])+"-"+String(ev.value[1]);
		drawGraph(range, "dubchart", "dubinfo");
	});
});