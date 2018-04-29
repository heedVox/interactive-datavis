let showTsv = ( filename ) => {

  var margin = {top: 40, right: 20, bottom: 30, left: 40},
      width = 480 - margin.left - margin.right,
      height = 250 - margin.top - margin.bottom;

  var formatQuantitative = d3.format("");

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.ordinal()
      .rangeRoundBands([0, height], .1);


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
      return "<strong>Value:</strong> <span style='color:red'>" + d.value + "</span>";
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
    // svg.append("g")
    //     .attr("class", "x axis")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(xAxis);
    //
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -15)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Mean frequency (Hz)");

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("width", function(d) { return width - x(d.value); })
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

for (let i = 1; i <= 20; i++) {
  showTsv(`data${i}.tsv`)
}
