var MYLIBRARY = MYLIBRARY || (function(){
    var _args = {}; // private
    pca_chart = {};
    svg_pca = {};

    return {
        init : function(Args) {
            _args = Args;
            // some other initialising
        },
        helloWorld : function(Args) {

var data = Args;
var padding = 30;

var margin = {top: 20, right: 20, bottom: 30, left: 40},
     width = 250 - margin.left - margin.right,
     height = 250 - margin.top - margin.bottom;

// var dataset = Args[1]; //Initialize empty array
// var keys = Object.keys(dataset);
// var values = []
var svg_name = "#pca"

// for (var i = 1; i < keys.length; i++){
//     values.push(dataset[keys[i]])
// }

// Resize pca_chart
var aspect = 600 / 600;
    pca_chart[svg_name] = $(svg_name);

$(window).on("resize", function() {
    for (var i = 0; i < Object.keys(pca_chart).length; i++){
        var targetWidth = pca_chart[Object.keys(pca_chart)[i]]
                            .parent()
                            .width();
        pca_chart[Object.keys(pca_chart)[i]].attr("width", targetWidth);
        pca_chart[Object.keys(pca_chart)[i]].attr("height", targetWidth / aspect);
    }
});


// setup x
var xValue = function(d) { return d.PC1;}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .ticks(5);

// setup y
var yValue = function(d) { return d.PC2;}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(4);

// setup fill color
var cValue = function(d) { return d.Prediction;},
    color = d3.scale.category10();


// add the graph canvas to the body of the webpage
svg_pca[svg_name] = d3.select(svg_name)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// don't want dots overlapping axis, so add in buffer to data domain
xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

// x-axis
svg_pca[svg_name].append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (height + 0) + ")")
  .call(xAxis)

.append("text")
  .attr("class", "label")
  .attr("x", width)
  .attr("y", -6)
  .style("text-anchor", "end")
  .text("PC1");

// y-axis
svg_pca[svg_name].append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("PC2");

// draw dots
svg_pca[svg_name].selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("r", 1.5)
    .attr("cx", xMap)
    .attr("cy", yMap)
    .style("fill", function(d) { return color(cValue(d));});

// // draw legend
// var legend = svg.selectAll(".legend")
//     .data(color.domain())
//     .enter().append("g")
//     .attr("class", "legend")
//     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

// // draw legend colored rectangles
// legend.append("rect")
//     .attr("x", width - 18)
//     .attr("width", 18)
//     .attr("height", 18)
//     .style("fill", color);

// // draw legend text
// legend.append("text")
//     .attr("x", width - 24)
//     .attr("y", 9)
//     .attr("dy", ".35em")
//     .style("text-anchor", "end")
//     .text(function(d) { return d;})

// // Scales and labels
// var xScale = d3.scale.ordinal()
//                 .domain(d3.range(keys.length - 1))
//                 .rangeRoundBands([0, width], 0.35);

// var yScale = d3.scale.linear()
//                 .domain([0, d3.max(values)])
//                 .range([0, height-30]);

// var xLabel = d3.scale.ordinal()
//                 .domain(keys.slice(1, keys.length))
//                 .rangeRoundBands([0, width], 0.35);

// var yLabel = d3.scale.ordinal()
//                 .domain(dataset[keys[0]])
//                 .rangeRoundBands([0, height], 0.35);

// //Create SVG element
// svg_pca[svg_name] = d3.select(svg_name)
//             .append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");;

// var xAxis = d3.svg.axis()
//                   .scale(xLabel)
//                   .orient("bottom")
//                   .ticks(4);

// var yAxis = d3.svg.axis()
//     .scale(yScale)
//     .orient("left");

// //Create bars
// svg_pca[svg_name].selectAll("rect")
//    .data(values)
//    .enter()
//    .append("rect")
//    .attr("x", function(d, i) {
//            return xScale(i);
//    })
//    .attr("y", function(d) {
//            return height - yScale(d);
//    })
//    .attr("width", xScale.rangeBand())
//    .attr("height", function(d) {
//            return yScale(d);
//    })
//    .attr("fill", function(d, i) {
//         console.log(i)
//         if (i % 2 == 0) {return "rgb(0, 200, " + (d * 10) + ")";}
//         else {return "rgb(0, " + (d * 10) + ", 200)";}
//    });

// //Create X axis
// svg_pca[svg_name].append("g")
//     .attr("class", "axis")
//     .attr("transform", "translate(0," + (height + 0) + ")")
//     .call(xAxis);

// // // y Axis
// // svg_pca[svg_name].append("text")
// //       .attr("transform", "rotate(0)")
// //       .attr("y", 10)
// //       .attr("dy", "1em")
// //       .style("text-anchor", "end")
// //       .text("Feature Name");

// svg_pca[svg_name].append("text")
//         .attr("transform", "rotate(0)")
//         .attr("x",0)
//         .attr("y", -5)
//         .attr("dy", "1em")
//         .style("text-anchor", "start")
//         .style("font-size","14px")
//         .text(dataset[keys[0]]);


// Initialize size
for (var i = 0; i < Object.keys(pca_chart).length; i++){
    var targetWidth = pca_chart[Object.keys(pca_chart)[i]].parent().width();
    pca_chart[Object.keys(pca_chart)[i]].attr("width", targetWidth);
    pca_chart[Object.keys(pca_chart)[i]].attr("height", targetWidth / aspect);
}

$('svg circle').tipsy({
gravity: 'w',
html: true,
title: function() {
  var d = this.__data__;
  return 'Prediction <span style="color: "white">' + d["Prediction"] + '</span>';
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
   //      var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + height / 2;

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

