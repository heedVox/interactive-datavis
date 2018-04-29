let showTsv = ( filename ) => {

  var margin = {top: 40, right: 20, bottom: 30, left: 40},
      width = 480 - margin.left - margin.right,
      height = 250 - margin.top - margin.bottom;

  var formatQuantitative = d3.format("");

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(formatQuantitative);

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
    x.domain(data.map(function(d) { return d.dataType; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

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
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value");

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.dataType); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
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
  d.value = +d.value;
  return d;
}

for (let i = 1; i <= 20; i++) {
  showTsv(`data${i}.tsv`)
}
