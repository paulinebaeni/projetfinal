
var margin = {top: 20, right: 0, bottom: 70, left: 80},
width = 600 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;



// set the range
var x = d3.scaleBand()
.rangeRound([0,width])
.padding(.05)

var y = d3.scaleLinear().range([height, 0]);


// define the axis
// define the axis
var xAxis = d3.axisBottom(x)

var yAxis = d3.axisLeft(y)
.ticks(10);


// add the SVG element
var svg = d3.select("#chart2").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", 
  "translate(" + margin.left + "," + margin.top + ")");


// load the data
d3.json("data/data.json").then(function(data){ 

  // scale the range of the data
  var range = 11300;
  draw(range)

  var slider = d3.select('#slider2');
  slider.on('input', function() {
    draw(this.value);
  });


  function draw(range) {
      //draw bars
      svg.selectAll("*").remove();
      x.domain(data.map(function(d) { return d.year; }));
      y.domain([range, d3.max(data, function(d) { return d.sum; })]);
      svg.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr('fill',"url(#svgGradient)")
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.bandwidth()/1.2)
      .attr("y", function(d) { return y(d.sum); })
      .attr("height", function(d) { return height - y(d.sum); });

//add y axis
svg.append("g")
.attr("class", "y axis")
.call(yAxis)
.attr("fill","white")
.append("text")
.attr("transform", "rotate(-90)")
.attr("y", -80)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text("Number of murders");

    // add x axis
    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .attr("fill","white")
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-90)")
    .attr("fill","white");



//add gradient

}
});
