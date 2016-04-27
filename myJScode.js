d3.csv("data.csv", function(d) {
	return {
		date : d.Date,
		canada : +d.Canada,
		AB : +d.Alberta,
		BC : +d["British Columbia"],
		MB : +d.Manitoba,
		NB : +d["New Brunswick"],
		NL  : +d["Newfoundland and Labrador"],
		NS  : +d["Nova Scotia"],
		ON  : +d.Ontario,
		SK  : +d.Saskatchewan,
		QC  : +d.Quebec

	};
}, function(data2){
	data = data2;
	visualisation();
});

function visualisation() {
	var dataEntriesCount = data.length;
	var chosenState = "";


	var t = 0;
	var max = 0;
	var pom = 2.5;
	var gh = 120;
	var gw = dataEntriesCount*pom;


	function line() {
		graph.selectAll("line")
		.attr('x1', t*pom)
		.attr('x2', t*pom)
	}

	function graphIt(){
		graph.selectAll(".gData").remove();
		for (var i = 0; i < dataEntriesCount; i++) {
			for(var key in data[i]) {
				if (key == chosenState) {
					var red = "rgb(" + Math.ceil(data[i][key]/110 / max * 255 * 255) + "," + Math.ceil(data[i][key]/110 / max * 255 * 255) + ",0)";
					graph.append("rect")
					.attr("x", pom*i)
					.attr("y", gh-Math.ceil(data[i][key]/110)-10)
					.attr("width", 2)
					.attr("height", Math.ceil(data[i][key]/110))
					.attr("class", "gData")
					.attr("i", i)
					.attr("fill",red);
				}
			}
		}
	}


	var canvas = d3.select("body").select(".map");
	var graph = d3.select("body").select(".graph").attr("width",gw).attr("height", gh);
	canvas.selectAll("g").attr("fill", function (obj) {
			
	});
//		var red = "rgb(" + Math.ceil(data[t][key]/110 / max * 255 * 255) + "," + Math.ceil(data[t][key]/110 / max * 255 * 255) + ",0)";

	graph.append("line")
	.attr("x1", t*pom)
	.attr("y1", 0)
	.attr("x2", t*pom)
	.attr("y2", gh + 150)
	.attr("stroke-width", 1)
	.attr("stroke", "silver")

	data.forEach(function (object) {
		for(var type in object){
			if (type != "date") {
				if ( object[type] > max) {
					max = object[type];
				}
			}
		}
	});


	canvas.selectAll("g").on("click", function(){
		chosenState = d3.select(this).attr('id');

		borderIt(this);
		graphIt();

	});
	graph.on('click', function () {
		t = parseInt(d3.mouse(this)[0]/pom);
		line();
	});
}



function borderIt(obj) {
	d3.selectAll("g").style("stroke-width", 0);
	d3.select(obj).style("stroke","yellow").style("stroke-width", 4);
}