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
var svg_name = "#pca"

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
// xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
// yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

xScale.domain([d3.min(data, xValue), d3.max(data, xValue)]);
yScale.domain([d3.min(data, yValue), d3.max(data, yValue)]);


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

var brush = d3.svg.brush()
  .x(xScale)
  .y(yScale)
  .on("brushstart", brushstart)
  .on("brush", brushmove)
  .on("brushend", brushend);

svg_pca[svg_name]
    .append('g')
    .attr('class', 'brush')
    .call(brush);


var brushCell;

// Clear the previously-active brush, if any.
function brushstart(p) {
if (brushCell !== this) {
  d3.select(brushCell).call(brush.clear());
  // xScale.domain(data[p.x]);
  // yScale.domain(data[p.y]);
  brushCell = this;
}
}

// Highlight the selected circles.
function brushmove(p) {
var e = brush.extent();
var ps = []
svg_pca[svg_name].selectAll(".dot").classed("hidden", function(d) {
    var a = e[0][0] > d.PC1 || d.PC1 > e[1][0] || e[0][1] > d.PC2 || d.PC2 > e[1][1];
    if (a == false) {
        ps.push(d);
    }
    return a
});
}

// If the brush is empty, select all circles.
function brushend() {
if (brush.empty()) svg_pca[svg_name].selectAll(".hidden").classed("hidden", false);
bar_plot(bar_data());
}

function bar_data(argument) {
    var b_data = [];
    var feat = {};
    feat['key'] = 'juan';
    feat['values'] = [];
    for (var i = 0; i < 4; i++) {
        feat['values'].push({'x':i, 'y':Math.random() });
    };
    var feat2 = {};
    feat2['key'] = 'san';
    feat2['values'] = [];
    for (var i = 0; i < 4; i++) {
        feat2['values'].push({'x':i, 'y':Math.random() });
    };
    b_data[0] = feat;
    b_data[1] = feat2;
    return b_data;
}


var t_data = stream_layers(2,4,.1).map(function(data, i) {
    return {
        key: 'Stream' + i,
        values: data
    };
});

function bar_plot (argument) {

test_data = argument;

nv.addGraph({
    generate: function() {
        var width = nv.utils.windowSize().width / 2,
            height = nv.utils.windowSize().height / 2;
        var chart = nv.models.multiBarChart()
            .width(width)
            .height(height)
            // .stacked(true)
            ;
        chart.dispatch.on('renderEnd', function(){
            console.log('Render Complete');
        });
        var svg = d3.select('#left svg').datum(test_data);
        console.log('calling chart');
        svg.transition().duration(0).call(chart);
        return chart;
    },
    callback: function(graph) {
        nv.utils.windowResize(function() {
            var width = nv.utils.windowSize().width;
            var height = nv.utils.windowSize().height;
            graph.width(width).height(height);
            d3.select('#left svg')
                .attr('width', width)
                .attr('height', height)
                .transition().duration(0)
                .call(graph);
        });
    }
});

}


bar_plot(t_data);

        }
    };
}());




