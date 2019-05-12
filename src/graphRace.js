
var margin = {top: 0, right: 0, bottom: 0, left: 0},
width = 900
height = 300
var svg=d3.select("#graphRace").append("svg")
.attr("width", width)
.attr("height", height)
.attr("class","ml-5")




svg.append("defs")
.append("g")
.attr("id","iconCustom")
.append("path")
.attr("d","M3.5,2H2.7C3,1.8,3.3,1.5,3.3,1.1c0-0.6-0.4-1-1-1c-0.6,0-1,0.4-1,1c0,0.4,0.2,0.7,0.6,0.9H1.1C0.7,2,0.4,2.3,0.4,2.6v1.9c0,0.3,0.3,0.6,0.6,0.6h0.2c0,0,0,0.1,0,0.1v1.9c0,0.3,0.2,0.6,0.3,0.6h1.3c0.2,0,0.3-0.3,0.3-0.6V5.3c0,0,0-0.1,0-0.1h0.2c0.3,0,0.6-0.3,0.6-0.6V2.6C4.1,2.3,3.8,2,3.5,2z")
.attr("transform", "scale(5)");

var numCols = 20;
var numRows = 5;

//padding for the grid
var xPadding = 10;
var yPadding = 15;

//horizontal and vertical spacing between the icons
var hBuffer = 50;
var wBuffer = 50;

//generate a d3 range for the total number of required elements
var myIndex=d3.range(numCols*numRows);


svg.append("g")
.attr("id","pictoLayer")
.selectAll("use")
.data(myIndex)
.enter()
.append("use")
.attr("xlink:href","#iconCustom")
.attr("id",function(d)    {
  return d;
})
.attr("x",function(d) {
var remainder=d % numCols;//calculates the x position (column number) using modulus
return xPadding+(remainder*wBuffer);//apply the buffer and return value
})
.attr("y",function(d) {
var whole=Math.floor(d/numCols)//calculates the y position (row number)
return yPadding+(whole*hBuffer);//apply the buffer and return the value
})
.classed("black",true);


changeColor("dataRace.json")

$('.onoffswitch-checkbox').change(function() {
    // this will contain a reference to the checkbox   
    if (this.checked) {
      changeColor("dataRaceTrue.json")
// the checkbox is now checked 
} else {
 changeColor("dataRace.json")
        // the checkbox is now no longer checked
      }
    });

function changeColor(donnees){
  d3.json(donnees).then(function(data){ 

    d3.selectAll("use").attr("class",function(d,i){
      if (d<=data[0].fakeperc-1) {
        return "black"                                                             
      } 
      if (d>data[0].fakeperc-1 && d<=data[0].fakeperc+data[1].fakeperc-1) {
        return "white"
      }
      if (d>data[0].fakeperc+data[1].fakeperc-1 && d<=data[0].fakeperc+data[1].fakeperc+data[2].fakeperc-1) {
        return "hispanic"
      }
      if (d>data[0].fakeperc+data[1].fakeperc+data[2].fakeperc-1 && d<=data[0].fakeperc+data[1].fakeperc+data[2].fakeperc+data[3].fakeperc-1) {
        return "asian"
      }
      if (d>data[0].fakeperc+data[1].fakeperc+data[2].fakeperc+data[3].fakeperc-1 && d<=data[0].fakeperc+data[1].fakeperc+data[2].fakeperc+data[3].fakeperc+data[4].fakeperc-1) {
        return "native"
      }
    });


  })
}

