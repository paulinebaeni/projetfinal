// set the dimensions and margins of the graph
var width = 900
height = 500
margin = 50

// The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#piechart")
.append("svg")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
var data = {Suicide: 63175*100/100798, Homicide: 35176*100/100798, Accidental:1639*100/100798, Undetermined:807*100/100798, NA:1*100/100798}



// set the color scale
var color = d3.scaleOrdinal()

.domain(["a", "b", "c", "d", "e", "f", "g", "h"])
.range(["#8DD3C7", "#58508d" , "#bc5090","#ff6361"]);

// Compute the position of each group on the pie:
var pie = d3.pie()
  .sort(null) // Do not sort group by size
  .value(function(d) {
    return d.value; 
  })

  var data_ready = pie(d3.entries(data))

// The arc generator
var arc = d3.arc()
  .innerRadius(radius * 0.6)         // This is the size of the donut hole
  .outerRadius(radius * 1.1)


// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
.selectAll('allSlices')
.data(data_ready)
.enter()
.append('path')
.attr('d', arc)
.attr('fill', function(d){ return(color(d.data.key)) })
.attr("stroke", "#161616")
.style("stroke-width", "0px")
.style("opacity", 1)

var path = d3.selectAll('path')

path.on('mouseover', function(d) { 

  svg
  .selectAll('allLabels')
  .data(data_ready)
  .enter()
  .append('text')
  .text(
   Math.round(d.data.value)+"%")
  .attr("class","prct")
  .style("text-anchor", "middle")
  .style("font-size", 40)  
})



path.on('mouseout', function(d) {  // when mouse enters div     
  $('.prct').hide()
})



