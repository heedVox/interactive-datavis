//Implemetation of the radial area chart

//Common variables
var margin = {top: 30, right: 30, bottom: 30, left: 30},
	width = Math.min(200, window.innerWidth - 10) - margin.left - margin.right,
	height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

//Colors
let colors = [
    d3.scale.ordinal().range(["#00A0B0"]),
    d3.scale.ordinal().range(["#EDC951"]),
    d3.scale.ordinal().range(["#CC333F"]),
    d3.scale.ordinal().range(["#6B6B47"])
  ];


//Options of the charts
let radarChartOptions = [
    {w: width,h: height,margin: margin,maxValue: 4,levels: 4,roundStrokes: true,color: colors[1]},
    {w: width,h: height,margin: margin,maxValue: 4,levels: 4,roundStrokes: true,color: colors[2]},
    {w: width,h: height,margin: margin,maxValue: 4,levels: 4,roundStrokes: true,color: colors[3]},
    {w: width,h: height,margin: margin,maxValue: 4,levels: 4,roundStrokes: true,color: colors[4]}
  ];

//Data of the charts
let areaChartDatas = [
    [[{axis:"Priority",value:2},{axis:"Pleasure",value:3},{axis:"Workload",value:1},]],
    [[{axis:"Priority",value:1},{axis:"Pleasure",value:3},{axis:"Workload",value:1},]],
    [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]],
    [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]],
    [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]],
    [[{axis:"Priority",value:4},{axis:"Pleasure",value:4},{axis:"Workload",value:1},]],
    [[{axis:"Priority",value:1},{axis:"Pleasure",value:2},{axis:"Workload",value:1},]],
    [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]],
    [[{axis:"Priority",value:2},{axis:"Pleasure",value:3},{axis:"Workload",value:1},]],
    [[{axis:"Priority",value:4},{axis:"Pleasure",value:4},{axis:"Workload",value:4},]],
    [[{axis:"Priority",value:4},{axis:"Pleasure",value:3},{axis:"Workload",value:4},]],
    [[{axis:"Priority",value:4},{axis:"Pleasure",value:4},{axis:"Workload",value:1},]],
    [[{axis:"Priority",value:4},{axis:"Pleasure",value:1},{axis:"Workload",value:4},]],
    [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]],
    [[{axis:"Priority",value:4},{axis:"Pleasure",value:4},{axis:"Workload",value:4},]],
    [[{axis:"Priority",value:2},{axis:"Pleasure",value:3},{axis:"Workload",value:1},]],
    [[{axis:"Priority",value:4},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]],
    [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]],
    [[{axis:"Priority",value:1},{axis:"Pleasure",value:4},{axis:"Workload",value:4},]],
    [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]]
  ];


//Implementation of the bar charts

let showTsv = ( filename, options ) => {

	//Common variables
  var margin = {top: 40, right: 20, bottom: 30, left: 40},
      width = 260 - margin.left - margin.right,
      height = 120 - margin.top - margin.bottom;

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
      .attr("width", width )
      .attr("height", height + margin.bottom)
    .append("g")
      // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
    let bar = svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
    bar.attr("class", "bar")
        .attr("x", 0)
        .attr("width", function(d) { return x(d.value); })
        .attr("y", function(d) { return y(d.dataType); })
        .attr("height", y.rangeBand())
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
    console.log(options)
    if(options.color)
      bar.style("fill", function(d,i) { return options.color(i); })
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

function generateChart( idx, data, options ) {
  let radId = `radarChart${idx+1}`
  console.log(radId)
  RadarChart("#"+radId, data, options);
  let barChart = showTsv(`data${idx+1}.tsv`, options )
  let div = document.getElementById(radId)
  div.appendChild(barChart[0][0])
}

// ===============================
// ========== Bootstrap the charts
// ===============================
for(let i = 0; i < 20; i++) {
  let colIdx = Math.floor(i/5)
  console.log(colIdx)
  generateChart( i, areaChartDatas[i], radarChartOptions[colIdx] )
}
