//Implemetation of the radial area chart

//Common variables
var margin = {top: 50, right: 50, bottom: 50, left: 50},
	width = Math.min(200, window.innerWidth - 10) - margin.left - margin.right,
	height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

//Colors
var color1 = d3.scale.ordinal().range(["#00A0B0"]);
var color2 = d3.scale.ordinal().range(["#EDC951"]);
var color3 = d3.scale.ordinal().range(["#CC333F"]);
var color4 = d3.scale.ordinal().range(["#6B6B47"]);

//Options of the charts
var radarChartOptions1 = {w: width,h: height,margin: margin,maxValue: 4,levels: 4,roundStrokes: true,color: color1};
var radarChartOptions2 = {w: width,h: height,margin: margin,maxValue: 4,levels: 4,roundStrokes: true,color: color2};
var radarChartOptions3 = {w: width,h: height,margin: margin,maxValue: 4,levels: 4,roundStrokes: true,color: color3};
var radarChartOptions4 = {w: width,h: height,margin: margin,maxValue: 4,levels: 4,roundStrokes: true,color: color4};

//Data of the charts
var data1 = [[{axis:"Priority",value:2},{axis:"Pleasure",value:3},{axis:"Workload",value:1},]];
var data2 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:3},{axis:"Workload",value:1},]];
var data3 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]];
var data4 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]];
var data5 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]];
var data6 = [[{axis:"Priority",value:4},{axis:"Pleasure",value:4},{axis:"Workload",value:1},]];
var data7 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:2},{axis:"Workload",value:1},]];
var data8 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]];
var data9 = [[{axis:"Priority",value:2},{axis:"Pleasure",value:3},{axis:"Workload",value:1},]];
var data10 = [[{axis:"Priority",value:4},{axis:"Pleasure",value:4},{axis:"Workload",value:4},]];
var data11 = [[{axis:"Priority",value:4},{axis:"Pleasure",value:3},{axis:"Workload",value:4},]];
var data12 = [[{axis:"Priority",value:4},{axis:"Pleasure",value:4},{axis:"Workload",value:1},]];
var data13 = [[{axis:"Priority",value:4},{axis:"Pleasure",value:1},{axis:"Workload",value:4},]];
var data14 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]];
var data15 = [[{axis:"Priority",value:4},{axis:"Pleasure",value:4},{axis:"Workload",value:4},]];
var data16 = [[{axis:"Priority",value:2},{axis:"Pleasure",value:3},{axis:"Workload",value:1},]];
var data17 = [[{axis:"Priority",value:4},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]];
var data18 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]];
var data19 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:4},{axis:"Workload",value:4},]];
var data20 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]];

//Displaying the charts
RadarChart("#radarChart1", data1, radarChartOptions1);
RadarChart("#radarChart2", data2, radarChartOptions1);
RadarChart("#radarChart3", data3, radarChartOptions1);
RadarChart("#radarChart4", data4, radarChartOptions1);
RadarChart("#radarChart5", data5, radarChartOptions1);
RadarChart("#radarChart6", data6, radarChartOptions2);
RadarChart("#radarChart7", data7, radarChartOptions2);
RadarChart("#radarChart8", data8, radarChartOptions2);
RadarChart("#radarChart9", data9, radarChartOptions2);
RadarChart("#radarChart10", data10, radarChartOptions2);
RadarChart("#radarChart11", data11, radarChartOptions3);
RadarChart("#radarChart12", data12, radarChartOptions3);
RadarChart("#radarChart13", data13, radarChartOptions3);
RadarChart("#radarChart14", data14, radarChartOptions3);
RadarChart("#radarChart15", data15, radarChartOptions3);
RadarChart("#radarChart16", data16, radarChartOptions4);
RadarChart("#radarChart17", data17, radarChartOptions4);
RadarChart("#radarChart18", data18, radarChartOptions4);
RadarChart("#radarChart19", data19, radarChartOptions4);
RadarChart("#radarChart20", data20, radarChartOptions4);


//Implementation of the bar charts

let showTsv = ( filename ) => {

	//Common variables
  var margin = {top: 40, right: 20, bottom: 30, left: 40},
      width = 260 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom;

	//Format of the bars
  var formatQuantitative = d3.format("");

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.ordinal()
      .rangeRoundBands([0, height], .3);


  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(3);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("right");


  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return `<strong style='color:#C0C0F0'>${scientificNotation(d.value)} Hz</strong>`;
    })

  var container = d3.select("body").append("div")
      .attr("class", "bar-chart-container")

	//Implementation of the svg
  var svg = container.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);

	//Getting the data from the tsv files
  d3.tsv( filename, type, function(error, data) {
    x.domain([0, d3.max(data, function(d) { return d.value; })]);
    y.domain(data.map(function(d) { return d.dataType; }));

    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .append("text")
        .attr("x", width/2)
        .attr("y", 20)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .text("Mean frequency (Hz)");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

		//Actual creation of the bars, and the hover effect
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("width", function(d) { return x(d.value); })
        .attr("y", function(d) { return y(d.dataType); })
        .attr("height", y.rangeBand())
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
  });

	return container;
}

function type(d) {
  if(d.value === undefined) {
    let t = d.dataType.split(' ')
    d.dataType = t[0]
    d.value = +t[1]
  }
  d.value = +d.value;
  return d;
}

function scientificNotation(val, pres) {
  let p = Math.ceil(Math.log10(val))
  val *= Math.pow(10,-p+1)
  val = val.toFixed(pres | 3)
  if(p != 1) return val + ` *10^${p-1}`
  else  return val
}

for (let i = 1; i <= 20; i++) {
  let container = showTsv(`data${i}.tsv`);
	let div = document.getElementById("radarChart"+i.toString());
	div.appendChild(container[0][0]);
}
