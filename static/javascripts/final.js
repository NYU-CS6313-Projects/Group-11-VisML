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

data = Args;
tot_feat = 50;
labels = ['TP', 'FP', 'TN', 'FN']
var padding = 30;

var width = (nv.utils.windowSize().width / 3) -30,
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

xScale.domain([-18.8476040574858 - 0.5, 19.073547077435 + 0.5]);
yScale.domain([-17.3624691781651 - 0.5, 17.8486509759782 + 0.5]);

// xScale.domain([d3.min(data, xValue), d3.max(data, xValue)]);
// yScale.domain([d3.min(data, yValue), d3.max(data, yValue)]);


// // console.log(d3.min(data, xValue))

// // x-axis
// svg_pca[svg_name].append("g")
//   .attr("class", "x axis")
//   .attr("transform", "translate(0," + (height + 0) + ")")
//   .call(xAxis)

// .append("text")
//   .attr("class", "label")
//   .attr("x", width)
//   .attr("y", -6)
//   // .style("text-anchor", "end")
//   // .text("PC1");

// // y-axis
// svg_pca[svg_name].append("g")
//     .attr("class", "y axis")
//     .call(yAxis)
//     .append("text")
//     .attr("class", "label")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 6)
//     .attr("dy", ".71em")
//     // .style("text-anchor", "end")
//     // .text("PC2");

// draw dots
svg_pca[svg_name].selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("r", 3.5)
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
  return 'Outcome <span style="color: "white">' + d["Prediction"] + '</span>';
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
    if (ps.length > 0) {
        var plot_data = bar_data2(ps);
        console.log(plot_data)
        if (complete == 0) {
        bar_plot(plot_data.slice(0,2));
        bar_plot2(plot_data.slice(2,4));
        };
    }
    else {
        complete = 0;
        bar_plot(gen_empty_data());
        bar_plot2(gen_empty_data2());
        };
    ps = [];
}
}

function gen_empty_data(argument) {
    var b_data = [];
    var feat = {};
    feat['key'] = 'empty';
    feat['values'] = [];
    for (var i = 0; i < tot_feat; i++) {
        feat['values'].push({'x':i, 'y': 0 });
    };
    var feat2 = {};
    feat2['key'] = 'empty';
    feat2['values'] = [];
    for (var i = 0; i < tot_feat; i++) {
        feat2['values'].push({'x':i, 'y': 0 });
    };
    b_data[0] = feat;
    b_data[1] = feat2;
    return b_data;
}

function gen_empty_data2(argument) {
    var b_data = [];
    var feat = {};
    feat['key'] = 'empty';
    feat['values'] = [];
    for (var i = 0; i < 4; i++) {
        feat['values'].push({'x':labels[i], 'y': 0 });
    };
    var feat2 = {};
    feat2['key'] = 'empty';
    feat2['values'] = [];
    for (var i = 0; i < 4; i++) {
        feat2['values'].push({'x':labels[i], 'y': 0 });
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
tpdis = {};
tpdis2 = {};

function bar_data2(arg) {

var b_data = [];
complete = complete + 1

    if (loop) {

feat['key'] = 'Selection 1';
feat['values'] = [];
tpdis['key'] = 'Selection 1';
tpdis['values'] = [];
update_feat(arg, [feat, tpdis])

    } else{

feat2['key'] = 'Selection 2';
feat2['values'] = [];
tpdis2['key'] = 'Selection 2';
tpdis2['values'] = [];
update_feat(arg, [feat2, tpdis2])

    };

if (complete == 2) {
    complete = 0;
    b_data[0] = feat;
    b_data[1] = feat2;
    b_data[2] = tpdis;
    b_data[3] = tpdis2;
    loop = !loop;
    return b_data;
} else{
    loop = !loop;
    return gen_empty_data();
    return gen_empty_data2();
};
}


function update_feat (arg, FD) {
F = FD[0]
D = FD[1]
ddict = {
    "1.0":0,
    "2.0":0,
    "3.0":0,
    "4.0":0,
}


for (var i = 0; i < arg[0].features.length; i++) {
    F['values'].push({'x':i, 'y': 0});
};

for (var i = 0; i < arg.length; i++) {
    ddict[arg[i].Prediction] = ddict[arg[i].Prediction] + 1
    for (var j = 0; j < F['values'].length; j++) {
        F['values'][j]['y'] = F['values'][j]['y'] + arg[i].features[j]['value'];
            if (i == arg.length - 1) {
                F['values'][j]['y'] = F['values'][j]['y'] / arg.length;
            };
    }};

for (var i = 0; i < 4; i++) {
        D['values'].push(
            {
                'x': labels[i],
                'y': ddict[Object.keys(ddict)[i]] / arg.length
            });
    };
}


var t_data = stream_layers(2,4,.1).map(function(data, i) {
    return {
        key: 'Stream' + i,
        values: data
    };
});

feat_names = []
for (var i = 0; i < data[0].features.length; i++) {
    feat_names.push(data[0].features[i]["name"])
};

function bar_plot(argument) {
var test_data = argument;
nv.addGraph({
    generate: function() {
        var width = nv.utils.windowSize().width / 3,
            height = nv.utils.windowSize().height / 1.3;
        var chart = nv.models.multiBarChart()
            .width(width)
            .height(height)
            .showXAxis(true)
            .tooltips(true)
            .tooltipContent(function(key, y, e, graph) {
            var data =graph.series.values[y-1];
            return  '<p>' +  feat_names[y] + '</p>'
                 + '<p> ratio: ' +  e + '</p>'
                 + '<p>' +  key + '</p>'
            });
            // .stacked(true)
        // chart.barColor(function (d, i) {
        //     var colors = ["#a2d10c", "#93131e"]
        //     return colors[i]
        // })
        chart.xAxis.axisLabel('Features (ranked)');
        chart.forceY([0,1]);
        chart.yAxis
            .tickValues([0.0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0])
            .axisLabel('Proportion of Subjects');
        chart.margin({left:80});
        // chart.showXAxis(false)
        chart.color(["#7f7f7f","#e7ba52"])
        // chart.xRange(feat_names)
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
            var width = nv.utils.windowSize().width / 3;
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
};



function bar_plot2 (argument) {
var test_data = argument;
nv.addGraph({
    generate: function() {
        var width = nv.utils.windowSize().width / 3,
            height = nv.utils.windowSize().height / 1.3;
        var chart = nv.models.multiBarChart()
            .width(width)
            .height(height)
            .showXAxis(true)
            .tooltips(true)
            .tooltipContent(function(key, y, e, graph) {
            var data =graph.series.values[y-1];
            return  '<p>' +  y + '</p>'
                 + '<p> ratio: ' +  e + '</p>'
                 + '<p>' +  key + '</p>'
            });
            // .stacked(true)
        chart.xAxis.axisLabel('Outcome');
        chart.xAxis.tickValues(["TP","FP","TN","FN"]);
        chart.forceY([0,1]);
        chart.yAxis.tickValues([0.0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0]);
        chart.barColor(function (d, i) {
            var colors = ["#2ca02c", "#d62728", "#1f77b4", "#ff7f0e"]
            return colors[i]
        })
        // chart.showXAxis(false)
        // chart.color(["#FF0000","#00FF00","#0000FF"])
        // chart.xRange(feat_names)
        chart.dispatch.on('renderEnd', function(){
            console.log('Render Complete');
        });
        var svg = d3.select('#right svg').datum(test_data);
        console.log('calling chart');
        svg.transition().duration(0).call(chart);
        return chart;
    },
    callback: function(graph) {
        nv.utils.windowResize(function() {
            var width = nv.utils.windowSize().width / 3;
            var height = nv.utils.windowSize().height / 1.3;
            graph.width(width).height(height);
            d3.select('#right svg')
                .attr('width', width)
                .attr('height', height)
                .transition().duration(0)
                .call(graph);
        });
    }
});
};







bar_plot(gen_empty_data());
bar_plot2(gen_empty_data2());










        }
    };
}());




