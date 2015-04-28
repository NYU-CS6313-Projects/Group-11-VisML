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

var width = nv.utils.windowSize().width / 2,
    height = nv.utils.windowSize().height / 1.3;

var margin = {top: 20, right: 20, bottom: 30, left: 40},
     width = width - margin.left - margin.right,
     height = height - margin.top - margin.bottom;
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
var xValue = function(d) { return d.PC1;}; // data -> value
var xScale = d3.scale.linear().range([0, width]); // value -> display
var xMap = function(d) { return xScale(xValue(d));}; // data -> display
var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .ticks(5);

// setup y
var yValue = function(d) { return d.PC2;}; // data -> value
var yScale = d3.scale.linear().range([height, 0]); // value -> display
var yMap = function(d) { return yScale(yValue(d));}; // data -> display
var yAxis = d3.svg.axis()
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

xScale.domain([-2.471607621155838 - 0.5, 8.0506795710372625 + 0.5]);
yScale.domain([-3.1572950457717712 - 0.5, 3.1379183478055239 + 0.5]);

// xScale.domain([d3.min(data, xValue), d3.max(data, xValue)]);
// yScale.domain([d3.min(data, yValue), d3.max(data, yValue)]);


// console.log(d3.min(data, xValue))

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

ps = [];

// Highlight the selected circles.
function brushmove(p) {
var e = brush.extent();
svg_pca[svg_name].selectAll(".dot").classed("hidden", function(d) {
    var a = e[0][0] > d.PC1 || d.PC1 > e[1][0] || e[0][1] > d.PC2 || d.PC2 > e[1][1];
    return a
});
}

// If the brush is empty, select all circles.
function brushend() {

var e = brush.extent();
svg_pca[svg_name].selectAll(".dot").classed("hidden", function(d) {
    var a = e[0][0] > d.PC1 || d.PC1 > e[1][0] || e[0][1] > d.PC2 || d.PC2 > e[1][1];
    if (a == false) {
        ps.push(d);
    }
    return a
});

if (brush.empty()) {

    svg_pca[svg_name].selectAll(".hidden").classed("hidden", false);
    if (ps.length > 0) {bar_plot(bar_data2(ps));}
    else {bar_plot(bar_data());};
    ps = [];
}
}


function bar_data(argument) {
    var b_data = [];
    var feat = {};
    feat['key'] = 'empty0';
    feat['values'] = [];
    for (var i = 0; i < 4; i++) {
        feat['values'].push({'x':i, 'y': 0 });
    };
    var feat2 = {};
    feat2['key'] = 'empty2';
    feat2['values'] = [];
    for (var i = 0; i < 4; i++) {
        feat2['values'].push({'x':i, 'y': 0 });
    };
    b_data[0] = feat;
    b_data[1] = feat2;
    return b_data;
}

loop = true;
start = true;
complete = 0;
feat = {};
feat2 = {};

function bar_data2(arg) {

var b_data = [];
complete = complete + 1

    if (loop) {

feat['key'] = arg[0].features[0].name;
feat['values'] = [];

for (var i = 0; i < 4; i++) {
    feat['values'].push({'x':i, 'y': 0});
};

for (var i = 0; i < arg.length; i++) {
    feat['values'][0]['y'] = feat['values'][0]['y'] +
        arg[i].features[0].value[0];
    feat['values'][1]['y'] = feat['values'][1]['y'] +
        arg[i].features[0].value[1];
    feat['values'][2]['y'] = feat['values'][2]['y'] +
        arg[i].features[0].value[2];
    feat['values'][3]['y'] = feat['values'][3]['y'] +
        arg[i].features[0].value[3];
};

    } else{

feat2['key'] = arg[0].features[0].name;
feat2['values'] = [];

for (var i = 0; i < 4; i++) {
    feat2['values'].push({'x':i, 'y': 0});
};


for (var i = 0; i < arg.length; i++) {
    feat2['values'][0]['y'] = feat2['values'][0]['y'] +
        arg[i].features[0].value[0];
    feat2['values'][1]['y'] = feat2['values'][1]['y'] +
        arg[i].features[0].value[1];
    feat2['values'][2]['y'] = feat2['values'][2]['y'] +
        arg[i].features[0].value[2];
    feat2['values'][3]['y'] = feat2['values'][3]['y'] +
        arg[i].features[0].value[3];
};


    };

    if (start) {
        start = false;
        loop = !loop;
        return bar_data();
    };

if (complete == 2) {
    complete = 0;
    b_data[0] = feat;
    b_data[1] = feat2;
    loop = !loop;
    return b_data;
} else{
    loop = !loop;
    return bar_data();
};


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
            height = nv.utils.windowSize().height / 1.3;
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
            var width = nv.utils.windowSize().width / 2;
            var height = nv.utils.windowSize().height / 1.3;
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

bar_plot(bar_data());

        }
    };
}());




