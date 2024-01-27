/**
 * Highcharts JS v11.3.0 (2024-01-10)
 *
 * Wind barb series module
 *
 * (c) 2010-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */!function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/modules/windbarb",["highcharts"],function(o){return t(o),t.Highcharts=o,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var o=t?t._modules:{};function e(t,o,e,r){t.hasOwnProperty(o)||(t[o]=r.apply(null,e),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:o,module:t[o]}})))}e(o,"Extensions/DataGrouping/ApproximationRegistry.js",[],function(){return{}}),e(o,"Series/OnSeriesComposition.js",[o["Series/Column/ColumnSeries.js"],o["Core/Globals.js"],o["Core/Series/Series.js"],o["Core/Utilities.js"]],function(t,o,e,r){var i,n=o.composed,s=t.prototype,a=e.prototype,p=r.defined,l=r.pushUnique,u=r.stableSort;return function(t){function o(t){return a.getPlotBox.call(this.options.onSeries&&this.chart.get(this.options.onSeries)||this,t)}function e(){s.translate.apply(this);var t,o,e,r,i,n,a,l,c,h=this,f=h.options,d=h.chart,b=h.points,y=f.onSeries,g=y&&d.get(y),v=g&&g.options.step,m=g&&g.points,x=d.inverted,S=h.xAxis,j=h.yAxis,w=b.length-1,C=f.onKey||"y",O=m&&m.length,_=0;if(g&&g.visible&&O)for(_=(g.pointXOffset||0)+(g.barW||0)/2,l=g.currentDataGrouping,n=m[O-1].x+(l?l.totalRange:0),u(b,function(t,o){return t.x-o.x}),C="plot"+C[0].toUpperCase()+C.substr(1);O--&&b[w]&&"break"!==function(){if(i=m[O],(e=b[w]).y=i.y,i.x<=e.x&&void 0!==i[C]){if(e.x<=n&&(e.plotY=i[C],i.x<e.x&&!v&&(a=m[O+1])&&void 0!==a[C])){if(p(e.plotX)&&g.is("spline")){for(var r=[i.plotX||0,i.plotY||0],s=[a.plotX||0,a.plotY||0],l=(null===(t=i.controlPoints)||void 0===t?void 0:t.high)||r,u=(null===(o=a.controlPoints)||void 0===o?void 0:o.low)||s,h=function(t,o){return Math.pow(1-t,3)*r[o]+3*(1-t)*(1-t)*t*l[o]+3*(1-t)*t*t*u[o]+t*t*t*s[o]},f=0,d=1,y=void 0,x=0;x<100;x++){var S=(f+d)/2,_=h(S,0);if(null===_)break;if(.25>Math.abs(_-e.plotX)){y=S;break}_<e.plotX?f=S:d=S}p(y)&&(e.plotY=h(y,1),e.y=j.toValue(e.plotY,!0))}else c=(e.x-i.x)/(a.x-i.x),e.plotY+=c*(a[C]-i[C]),e.y+=c*(a.y-i.y)}if(w--,O++,w<0)return"break"}}(););b.forEach(function(t,o){var e;t.plotX+=_,(void 0===t.plotY||x)&&(t.plotX>=0&&t.plotX<=S.len?x?(t.plotY=S.translate(t.x,0,1,0,1),t.plotX=p(t.y)?j.translate(t.y,0,0,0,1):0):t.plotY=(S.opposite?0:h.yAxis.len)+S.offset:t.shapeArgs={}),(r=b[o-1])&&r.plotX===t.plotX&&(void 0===r.stackIndex&&(r.stackIndex=0),e=r.stackIndex+1),t.stackIndex=e}),this.onSeries=g}t.compose=function t(r){if(l(n,t)){var i=r.prototype;i.getPlotBox=o,i.translate=e}return r},t.getPlotBox=o,t.translate=e}(i||(i={})),i}),e(o,"Series/Windbarb/WindbarbPoint.js",[o["Series/Column/ColumnSeries.js"],o["Core/Utilities.js"]],function(t,o){var e,r=this&&this.__extends||(e=function(t,o){return(e=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(t[e]=o[e])})(t,o)},function(t,o){if("function"!=typeof o&&null!==o)throw TypeError("Class extends value "+String(o)+" is not a constructor or null");function r(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}),i=o.isNumber;return function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return r(o,t),o.prototype.isValid=function(){return i(this.value)&&this.value>=0},o}(t.prototype.pointClass)}),e(o,"Series/Windbarb/WindbarbSeriesDefaults.js",[],function(){return{dataGrouping:{enabled:!0,approximation:"windbarb",groupPixelWidth:30},lineWidth:2,onSeries:null,states:{hover:{lineWidthPlus:0}},tooltip:{pointFormat:'<span style="color:{point.color}">●</span> {series.name}: <b>{point.value}</b> ({point.beaufort})<br/>'},vectorLength:20,colorKey:"value",yOffset:-20,xOffset:0}}),e(o,"Series/Windbarb/WindbarbSeries.js",[o["Core/Animation/AnimationUtilities.js"],o["Extensions/DataGrouping/ApproximationRegistry.js"],o["Core/Globals.js"],o["Series/OnSeriesComposition.js"],o["Core/Series/SeriesRegistry.js"],o["Core/Utilities.js"],o["Series/Windbarb/WindbarbPoint.js"],o["Series/Windbarb/WindbarbSeriesDefaults.js"]],function(t,o,e,r,i,n,s,a){var p,l=this&&this.__extends||(p=function(t,o){return(p=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(t[e]=o[e])})(t,o)},function(t,o){if("function"!=typeof o&&null!==o)throw TypeError("Class extends value "+String(o)+" is not a constructor or null");function e(){this.constructor=t}p(t,o),t.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)}),u=t.animObject,c=i.seriesTypes.column,h=n.extend,f=n.merge,d=n.pick,b=function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return l(o,t),o.prototype.init=function(o,e){t.prototype.init.call(this,o,e)},o.prototype.pointAttribs=function(t,o){var e=this.options,r=t.color||this.color,i=this.options.lineWidth;return o&&(r=e.states[o].color||r,i=(e.states[o].lineWidth||i)+(e.states[o].lineWidthPlus||0)),{stroke:r,"stroke-width":i}},o.prototype.windArrow=function(t){var o,e=t.beaufortLevel,r=this.options.vectorLength/20,i=1.943844*t.value,n=-10;if(t.isNull)return[];if(0===e)return this.chart.renderer.symbols.circle(-10*r,-10*r,20*r,20*r);var s=[["M",0,7*r],["L",-1.5*r,7*r],["L",0,10*r],["L",1.5*r,7*r],["L",0,7*r],["L",0,-10*r]];if((o=(i-i%50)/50)>0)for(;o--;)s.push(-10===n?["L",0,n*r]:["M",0,n*r],["L",5*r,n*r+2],["L",0,n*r+4]),i-=50,n+=7;if((o=(i-i%10)/10)>0)for(;o--;)s.push(-10===n?["L",0,n*r]:["M",0,n*r],["L",7*r,n*r]),i-=10,n+=3;if((o=(i-i%5)/5)>0)for(;o--;)s.push(-10===n?["L",0,n*r]:["M",0,n*r],["L",4*r,n*r]),i-=5,n+=3;return s},o.prototype.drawPoints=function(){for(var t=this.chart,o=this.yAxis,e=t.inverted,r=this.options.vectorLength/2,i=0,n=this.points;i<n.length;i++){var s=n[i],a=s.plotX,p=s.plotY;!1===this.options.clip||t.isInsidePlot(a,0)?(s.graphic||(s.graphic=this.chart.renderer.path().add(this.markerGroup).addClass("highcharts-point highcharts-color-"+d(s.colorIndex,s.series.colorIndex))),s.graphic.attr({d:this.windArrow(s),translateX:a+this.options.xOffset,translateY:p+this.options.yOffset,rotation:s.direction}),this.chart.styledMode||s.graphic.attr(this.pointAttribs(s))):s.graphic&&(s.graphic=s.graphic.destroy()),s.tooltipPos=[a+this.options.xOffset+(e&&!this.onSeries?r:0),p+this.options.yOffset-(e?0:r+o.pos-t.plotTop)]}},o.prototype.animate=function(t){t?this.markerGroup.attr({opacity:.01}):this.markerGroup.animate({opacity:1},u(this.options.animation))},o.prototype.markerAttribs=function(t,o){return{}},o.prototype.getExtremes=function(){return{}},o.prototype.shouldShowTooltip=function(o,e,r){return void 0===r&&(r={}),r.ignoreX=this.chart.inverted,r.ignoreY=!r.ignoreX,t.prototype.shouldShowTooltip.call(this,o,e,r)},o.defaultOptions=f(c.defaultOptions,a),o}(c);return r.compose(b),h(b.prototype,{beaufortFloor:[0,.3,1.6,3.4,5.5,8,10.8,13.9,17.2,20.8,24.5,28.5,32.7],beaufortName:["Calm","Light air","Light breeze","Gentle breeze","Moderate breeze","Fresh breeze","Strong breeze","Near gale","Gale","Strong gale","Storm","Violent storm","Hurricane"],invertible:!1,parallelArrays:["x","value","direction"],pointArrayMap:["value","direction"],pointClass:s,trackerGroups:["markerGroup"],translate:function(){var t=this.beaufortFloor,o=this.beaufortName;r.translate.call(this);for(var e=0,i=this.points;e<i.length;e++){for(var n=i[e],s=0;s<t.length&&!(t[s]>n.value);s++);n.beaufortLevel=s-1,n.beaufort=o[s-1]}}}),i.registerSeriesType("windbarb",b),o.windbarb||(o.windbarb=function(t,o){for(var r=0,i=0,n=0,s=t.length;n<s;n++)r+=t[n]*Math.cos(o[n]*e.deg2rad),i+=t[n]*Math.sin(o[n]*e.deg2rad);return[t.reduce(function(t,o){return t+o},0)/t.length,Math.atan2(i,r)/e.deg2rad]}),b}),e(o,"masters/modules/windbarb.src.js",[],function(){})});