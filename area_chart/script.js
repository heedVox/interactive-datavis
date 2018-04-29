var margin = {top: 50, right: 50, bottom: 50, left: 50},
	width = Math.min(200, window.innerWidth - 10) - margin.left - margin.right,
	height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

var color1 = d3.scale.ordinal().range(["#00A0B0"]);
var color2 = d3.scale.ordinal().range(["#EDC951"]);
var color3 = d3.scale.ordinal().range(["#CC333F"]);
var color4 = d3.scale.ordinal().range(["#6B6B47"]);

var radarChartOptions1 = {w: width,h: height,margin: margin,maxValue: 4,levels: 4,roundStrokes: true,color: color1};
var radarChartOptions2 = {w: width,h: height,margin: margin,maxValue: 4,levels: 4,roundStrokes: true,color: color2};
var radarChartOptions3 = {w: width,h: height,margin: margin,maxValue: 4,levels: 4,roundStrokes: true,color: color3};
var radarChartOptions4 = {w: width,h: height,margin: margin,maxValue: 4,levels: 4,roundStrokes: true,color: color4};

var data1 = [[{axis:"Priority",value:2},{axis:"Pleasure",value:3},{axis:"Workload",value:1},]];
var data2 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:3},{axis:"Workload",value:1},]];
var data3 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]];
var data4 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]];
var data5 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]];
var data6 = [[{axis:"Priority",value:4},{axis:"Pleasure",value:4},{axis:"Workload",value:1},]];
var data7 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:2},{axis:"Workload",value:1},]];
var data8 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]];
var data9 = [[{axis:"Priority",value:2},{axis:"Pleasure",value:3},{axis:"Workload",value:1},]];
var data10 = [[{axis:"Priority",value:4},{axis:"Pleasure",value:4},{axis:"Workload",value:4},]];
var data11 = [[{axis:"Priority",value:4},{axis:"Pleasure",value:3},{axis:"Workload",value:4},]];
var data12 = [[{axis:"Priority",value:4},{axis:"Pleasure",value:4},{axis:"Workload",value:1},]];
var data13 = [[{axis:"Priority",value:4},{axis:"Pleasure",value:1},{axis:"Workload",value:4},]];
var data14 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]];
var data15 = [[{axis:"Priority",value:4},{axis:"Pleasure",value:4},{axis:"Workload",value:4},]];
var data16 = [[{axis:"Priority",value:2},{axis:"Pleasure",value:3},{axis:"Workload",value:1},]];
var data17 = [[{axis:"Priority",value:4},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]];
var data18 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]];
var data19 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:4},{axis:"Workload",value:4},]];
var data20 = [[{axis:"Priority",value:1},{axis:"Pleasure",value:1},{axis:"Workload",value:1},]];


RadarChart("#radarChart1", data1, radarChartOptions1);
RadarChart("#radarChart2", data2, radarChartOptions1);
RadarChart("#radarChart3", data3, radarChartOptions1);
RadarChart("#radarChart4", data4, radarChartOptions1);
RadarChart("#radarChart5", data5, radarChartOptions1);
RadarChart("#radarChart6", data6, radarChartOptions2);
RadarChart("#radarChart7", data7, radarChartOptions2);
RadarChart("#radarChart8", data8, radarChartOptions2);
RadarChart("#radarChart9", data9, radarChartOptions2);
RadarChart("#radarChart10", data10, radarChartOptions2);
RadarChart("#radarChart11", data11, radarChartOptions3);
RadarChart("#radarChart12", data12, radarChartOptions3);
RadarChart("#radarChart13", data13, radarChartOptions3);
RadarChart("#radarChart14", data14, radarChartOptions3);
RadarChart("#radarChart15", data15, radarChartOptions3);
RadarChart("#radarChart16", data16, radarChartOptions4);
RadarChart("#radarChart17", data17, radarChartOptions4);
RadarChart("#radarChart18", data18, radarChartOptions4);
RadarChart("#radarChart19", data19, radarChartOptions4);
RadarChart("#radarChart20", data20, radarChartOptions4);
