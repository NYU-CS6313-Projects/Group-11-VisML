//Width and height

var MYLIBRARY = MYLIBRARY || (function(){
    var _args = {}; // private
    chart = {};
    svg = {};

    return {
        init : function(Args) {
            _args = Args;
            // some other initialising
        },
        helloWorld : function(Args) {

var padding = 30;

var margin = {top: 20, right: 20, bottom: 30, left: 40},
     w = 600 - margin.left - margin.right,
     h = 250 - margin.top - margin.bottom;

dataset = []; //Initialize empty array
for (var i = 0; i < 4; i++) {//Loop numValues times
var newNumber = Math.floor(Math.random() * 25); //New random integer (0-25)
dataset.push(newNumber);                         //Add new number to array
}

// Resize chart
var aspect = 600 / 250;
    chart[Args[0]] = $(Args[0]);

$(window).on("resize", function() {
    for (var i = 0; i < Object.keys(chart).length; i++){
        var targetWidth = chart[Object.keys(chart)[i]].parent().width();
        chart[Object.keys(chart)[i]].attr("width", targetWidth);
        chart[Object.keys(chart)[i]].attr("height", targetWidth / aspect);
    }
});

// Scales and labels
var xScale = d3.scale.ordinal()
                .domain(d3.range(dataset.length))
                .rangeRoundBands([0, w], 0.35);

var yScale = d3.scale.linear()
                .domain([0, d3.max(dataset)])
                .range([0, h-30]);

var xLabel = d3.scale.ordinal()
                .domain(['True Positives',
                        'False Positives',
                        'True Negatives',
                        'False Negatives'])
                .rangeRoundBands([0, w], 0.35);

var yLabel = d3.scale.ordinal()
                .domain(['Feature Name'])
                .rangeRoundBands([0, h], 0.35);

//Create SVG element
svg[Args[0]] = d3.select(Args[0])
            .append("svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");;

var xAxis = d3.svg.axis()
                  .scale(xLabel)
                  .orient("bottom")
                  .ticks(4);

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

//Create bars
svg[Args[0]].selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
           return xScale(i);
   })
   .attr("y", function(d) {
           return h - yScale(d);
   })
   .attr("width", xScale.rangeBand())
   .attr("height", function(d) {
           return yScale(d);
   })
   .attr("fill", function(d) {
        return "rgb(0, 200, " + (d * 10) + ")";
   });

//Create X axis
svg[Args[0]].append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h + 0) + ")")
    .call(xAxis);

svg[Args[0]].append("text")
      .attr("transform", "rotate(0)")
      .attr("y", 10)
      .attr("dy", "1em")
      .style("text-anchor", "end")
      .text("Feature Name");


// Initialize size
for (var i = 0; i < Object.keys(chart).length; i++){
    var targetWidth = chart[Object.keys(chart)[i]].parent().width();
    chart[Object.keys(chart)[i]].attr("width", targetWidth);
    chart[Object.keys(chart)[i]].attr("height", targetWidth / aspect);
}


$('svg rect').tipsy({
gravity: 'w',
html: true,
title: function() {
  var d = this.__data__;
  return 'Hi there! My count is <span style="color: "black">' + d + '</span>';
}
});

        }
    };
}());





// //Create Y axis
// svg.append("g")
//     .attr("class", "axis")
//     .attr("transform", "translate(" ",0)")
//     .call(yAxis);

   // .on("mouseover", function(d) {

   //      //Get this bar's x/y values, then augment for the tooltip
   //      var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
   //      var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

   //      //Update the tooltip position and value
   //      d3.select(Args[1][0])
   //          .style("left", xPosition + "px")
   //          .style("top", yPosition + "px")
   //          .select(Args[1][1])
   //          .text(d);

   //      //Show the tooltip
   //      d3.select(Args[1][0]).classed("hidden", false);

   // })
   // .on("mouseout", function() {

   //      //Hide the tooltip
   //      d3.select(Args[1][0]).classed("hidden", true);

   // });
//    .on("click", function() {
//            sortBars();
//    });


// //Define sort order flag
// var sortOrder = false;

// //Define sort function
// var sortBars = function() {

//     //Flip value of sortOrder
//        sortOrder = !sortOrder;

//     svg.selectAll("rect")
//        .sort(function(a, b) {
//                if (sortOrder) {
//                    return d3.ascending(a, b);
//                } else {
//                    return d3.descending(a, b);
//                }
//            })
//        .transition()
//        .delay(function(d, i) {
//            return i * 50;
//        })
//        .duration(1000)
//        .attr("x", function(d, i) {
//                return xScale(i);
//        });

// };

