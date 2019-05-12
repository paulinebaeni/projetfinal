// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 100},
width = 500 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#densitychart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.json("dataDensity.json").then(function(data) {

  // add the x Axis
  var x = d3.scaleBand()
  .rangeRound([0, width])
  .padding(.05)
  .domain(data.map(function(d){
    return d.mois;
  }))

  svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .attr("color","white")
              .append("text");


  // add the first y Axis
  var y1 = d3.scaleLinear()
  .range([height/2, 0])
  .domain([0, 10000]);
  svg.append("g")
  .attr("transform", "translate(-20,0)")
  .call(d3.axisLeft(y1).tickValues([2000,4000,6000,8000]))
    .attr("color","white");


  // add the first y Axis
  var y2 = d3.scaleLinear()
  .range([height/2, height])
  .domain([0, 10000]);
  svg.append("g")
  .attr("transform", "translate(-20,0)")
  .call(d3.axisLeft(y2).tickValues([2000,4000,6000,8000]))
    .attr("color","white");

  x.domain(data.map(function(d) { return d.mois; }));

$('.onoffswitch2-checkbox').change(function() {
    // this will contain a reference to the checkbox   
    if (this.checked) {
      svg.selectAll("rect").remove();
      svg.selectAll("bar")
  .data(data)
  .enter().append("rect")
  .attr('fill',"url(#svgGradient)")
  .attr("class", "bar")
    .attr("stroke", "#000")
  .attr("stroke-width", 1)
  .attr("x", function(d) { return x(d.mois); })
  .attr("width", x.bandwidth()/1.2)
  .attr("y", function(d) { return y1(d.sum_women); })
  .attr("height", function(d) { return height/2- y1(d.sum_women); });
// the checkbox is now checked 
            svg.selectAll("bar")
  .data(data)
  .enter().
  append("rect")
  .attr('fill',"url(#svgGradient2)")
  .attr("class", "bar")
  .attr("stroke", "#000")
  .attr("stroke-width", 1)
  .attr("x", function(d) { return x(d.mois); })
  .attr("width", x.bandwidth()/1.2)
  .attr("y", function(d) { return y1(d.sum_men); })
  .attr("height", function(d) { return height/2- y1(d.sum_men); })
  ;

} else {
        svg.selectAll("rect").remove();
    svg.selectAll("bar")
  .data(data)
  .enter().append("rect")
  .attr('fill',"url(#svgGradient)")
  .attr("class", "bar")
    .attr("stroke", "#000")
  .attr("stroke-width", 1)
  .attr("x", function(d) { return x(d.mois); })
  .attr("width", x.bandwidth()/1.2)
  .attr("y", function(d) { return height/2; })
  .attr("height", function(d) { return  y2(d.sum_women)-height/2; });
        // the checkbox is now no longer checked
          svg.selectAll("bar")
  .data(data)
  .enter().
  append("rect")
  .attr('fill',"url(#svgGradient2)")
  .attr("class", "bar")
  .attr("stroke", "#000")
  .attr("stroke-width", 1)
  .attr("x", function(d) { return x(d.mois); })
  .attr("width", x.bandwidth()/1.2)
  .attr("y", function(d) { return y1(d.sum_men); })
  .attr("height", function(d) { return height/2- y1(d.sum_men); })
  ;
      }
    });


  //bars
  svg.selectAll("bar")
  .data(data)
  .enter().append("rect")
  .attr('fill',"url(#svgGradient)")
  .attr("class", "bar")
    .attr("stroke", "#000")
  .attr("stroke-width", 1)
  .attr("x", function(d) { return x(d.mois); })
  .attr("width", x.bandwidth()/1.2)
  .attr("y", function(d) { return height/2; })
  .attr("height", function(d) { return  y2(d.sum_women)-height/2; });


  x.domain(data.map(function(d) { return d.mois; }));

  svg.selectAll("bar")
  .data(data)
  .enter().
  append("rect")
  .attr('fill',"url(#svgGradient2)")
  .attr("class", "bar")
  .attr("stroke", "#000")
  .attr("stroke-width", 1)
  .attr("x", function(d) { return x(d.mois); })
  .attr("width", x.bandwidth()/1.2)
  .attr("y", function(d) { return y1(d.sum_men); })
  .attr("height", function(d) { return height/2- y1(d.sum_men); })
  ;

});

// Handmade legend
svg.append("circle").attr("cx",380).attr("cy",60).attr("r", 6).style("fill", "url(#svgGradient)")
svg.append("circle").attr("cx",380).attr("cy",30).attr("r", 6).style("fill", "url(#svgGradient2)")
svg.append("text").attr("x", 400).attr("y", 30).text("Men").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 400).attr("y", 60).text("Women").style("font-size", "15px").attr("alignment-baseline","middle")


//add gradient
var gradient = svg.append("linearGradient")
.attr("id", "svgGradient")
.attr("x1", "0%")
.attr("x2", "100%")
.attr("y1", "0%")
.attr("y2", "100%");

gradient.append("stop")
.attr('class', 'start')
.attr("offset", "0%")
.attr("stop-color", "#f46b45")
.attr("stop-opacity", 1);

gradient.append("stop")
.attr('class', 'end')
.attr("offset", "100%")
.attr("stop-color", "#eea849")
.attr("stop-opacity", 1);

var gradient2 = svg.append("linearGradient")
.attr("id", "svgGradient2")
.attr("x1", "0%")
.attr("x2", "100%")
.attr("y1", "0%")
.attr("y2", "100%");

gradient2.append("stop")
.attr('class', 'start')
.attr("offset", "0%")
.attr("stop-color", "#2980b9")
.attr("stop-opacity", 1);

gradient2.append("stop")
.attr('class', 'end')
.attr("offset", "100%")
.attr("stop-color", "#2c3e50")
.attr("stop-opacity", 1);

