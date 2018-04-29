let showTsv = ( filename ) => {

  var margin = {top: 40, right: 20, bottom: 30, left: 40},
      width = 480 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom;

  var formatQuantitative = d3.format("");

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.ordinal()
      .rangeRoundBands([0, height], .3);


  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(formatQuantitative);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("right")


  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return `<strong style='color:#C0C0F0'>${scientificNotation(d.value)} Hz</strong>`;
    })

  var container = d3.select("body").append("div")
      .attr("class", "bar-chart-container")

  var svg = container.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);

  d3.tsv( filename, type, function(error, data) {      console.log(data)
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
    // svg.append("g")
    //     .attr("class", "x axis")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(xAxis);
    //
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

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
}

function type(d) {
  if(d.value === undefined) {
    let t = d.dataType.split(' ')
    d.dataType = t[0]
    d.value = +t[1]
  }
  d.dataType = d.dataType.replace("Meanfreq", "")
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
  showTsv(`data${i}.tsv`)
}
