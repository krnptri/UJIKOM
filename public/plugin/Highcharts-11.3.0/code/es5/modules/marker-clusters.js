/**
 * Highcharts JS v11.3.0 (2024-01-10)
 *
 * Marker clusters module for Highcharts
 *
 * (c) 2010-2024 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */!function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/modules/marker-clusters",["highcharts"],function(e){return t(e),t.Highcharts=e,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var e=t?t._modules:{};function i(t,e,i,r){t.hasOwnProperty(e)||(t[e]=r.apply(null,i),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}i(e,"Extensions/MarkerClusters/MarkerClusterDefaults.js",[],function(){return{cluster:{enabled:!1,allowOverlap:!0,animation:{duration:500},drillToCluster:!0,minimumClusterSize:2,layoutAlgorithm:{gridSize:50,distance:40,kmeansThreshold:100},marker:{symbol:"cluster",radius:15,lineWidth:0,lineColor:"#ffffff"},dataLabels:{enabled:!0,format:"{point.clusterPointsAmount}",verticalAlign:"middle",align:"center",style:{color:"contrast"},inside:!0}},tooltip:{clusterFormat:"<span>Clustered points: {point.clusterPointsAmount}</span><br/>"}}}),i(e,"Extensions/MarkerClusters/MarkerClusterScatter.js",[e["Core/Animation/AnimationUtilities.js"],e["Core/Globals.js"],e["Extensions/MarkerClusters/MarkerClusterDefaults.js"],e["Core/Utilities.js"]],function(t,e,i,r){var a,s=t.animObject,n=e.composed,o=i.cluster,l=r.addEvent,u=r.defined,p=r.error,d=r.isArray,h=r.isFunction,c=r.isObject,m=r.isNumber,f=r.merge,g=r.objectEach,x=r.pushUnique,y=r.relativeLength,C=r.syncTimeout,k={grid:function(t,e,i,r){var a,s,n,o,l,u={},p=this.getGridOffset(),d=this.getScaledGridSize(r);for(l=0;l<t.length;l++){var h=H(this,{x:t[l],y:e[l]});a=h.x-p.plotLeft,s=h.y-p.plotTop,n=Math.floor(a/d),u[o=Math.floor(s/d)+"-"+n]||(u[o]=[]),u[o].push({dataIndex:i[l],x:t[l],y:e[l]})}return u},kmeans:function(t,e,i,r){var a,s=[],n=[],l={},u=r.processedDistance||o.layoutAlgorithm.distance,p=r.iterations,d=0,h=!0,c=0,m=0,f=[];r.processedGridSize=r.processedDistance;var g=this.markerClusterAlgorithms?this.markerClusterAlgorithms.grid.call(this,t,e,i,r):{};for(var x in g)g[x].length>1&&(a=A(g[x]),s.push({posX:a.x,posY:a.y,oldX:0,oldY:0,startPointsLen:g[x].length,points:[]}));for(;h;){for(var y=0;y<s.length;y++)s[y].points.length=0;n.length=0;for(var C=0;C<t.length;C++)c=t[C],m=e[C],(f=this.getClusterDistancesFromPoint(s,c,m)).length&&f[0].distance<u?s[f[0].clusterIndex].points.push({x:c,y:m,dataIndex:i[C]}):n.push({x:c,y:m,dataIndex:i[C]});for(var C=0;C<s.length;C++)1===s[C].points.length&&(f=this.getClusterDistancesFromPoint(s,s[C].points[0].x,s[C].points[0].y))[1].distance<u&&(s[f[1].clusterIndex].points.push(s[C].points[0]),s[f[0].clusterIndex].points.length=0);h=!1;for(var C=0;C<s.length;C++)a=A(s[C].points),s[C].oldX=s[C].posX,s[C].oldY=s[C].posY,s[C].posX=a.x,s[C].posY=a.y,(s[C].posX>s[C].oldX+1||s[C].posX<s[C].oldX-1||s[C].posY>s[C].oldY+1||s[C].posY<s[C].oldY-1)&&(h=!0);p&&(h=d<p-1),d++}for(var C=0,k=s.length;C<k;++C)l["cluster"+C]=s[C].points;for(var C=0,k=n.length;C<k;++C)l["noise"+C]=[n[C]];return l},optimizedKmeans:function(t,e,i,r){var a,s,n,l=r.processedDistance||o.layoutAlgorithm.gridSize,p=this.getRealExtremes(),d=(this.options.cluster||{}).marker,h={};if(!this.markerClusterInfo||this.initMaxX&&this.initMaxX<p.maxX||this.initMinX&&this.initMinX>p.minX||this.initMaxY&&this.initMaxY<p.maxY||this.initMinY&&this.initMinY>p.minY)this.initMaxX=p.maxX,this.initMinX=p.minX,this.initMaxY=p.maxY,this.initMinY=p.minY,h=this.markerClusterAlgorithms?this.markerClusterAlgorithms.kmeans.call(this,t,e,i,r):{},this.baseClusters=null;else{this.baseClusters||(this.baseClusters={clusters:this.markerClusterInfo.clusters,noise:this.markerClusterInfo.noise});for(var c=0,m=this.baseClusters.clusters;c<m.length;c++){var f=m[c];f.pointsOutside=[],f.pointsInside=[];for(var g=0,x=f.data;g<x.length;g++){var y=x[g],C=H(this,y),k=H(this,f);a=Math.sqrt(Math.pow(C.x-k.x,2)+Math.pow(C.y-k.y,2)),s=l-(n=f.clusterZone&&f.clusterZone.marker&&f.clusterZone.marker.radius?f.clusterZone.marker.radius:d&&d.radius?d.radius:o.marker.radius)>=0?l-n:n,a>n+s&&u(f.pointsOutside)?f.pointsOutside.push(y):u(f.pointsInside)&&f.pointsInside.push(y)}f.pointsInside.length&&(h[f.id]=f.pointsInside);for(var v=0,M=0,I=f.pointsOutside;M<I.length;M++){var S=I[M];h[f.id+"_noise"+v++]=[S]}}for(var b=0,A=this.baseClusters.noise;b<A.length;b++){var X=A[b];h[X.id]=X.data}}return h}},v=[],M=0;function I(t,e,i){t.attr({opacity:e}).animate({opacity:1},i)}function S(t,e,i,r){b(t,r,i,!0,!0);for(var a=0;a<e.length;a++){var s=e[a];s.point&&s.point.destroy&&s.point.destroy()}}function b(t,e,i,r,a){t.point&&(r&&t.point.graphic&&(t.point.graphic.show(),I(t.point.graphic,e,i)),a&&t.point.dataLabel&&(t.point.dataLabel.show(),I(t.point.dataLabel,e,i)))}function A(t){for(var e=t.length,i=0,r=0,a=0;a<e;a++)i+=t[a].x,r+=t[a].y;return{x:i/e,y:r/e}}function X(t,e){var i=[];return i.length=e,t.clusters.forEach(function(t){t.data.forEach(function(t){i[t.dataIndex]=t})}),t.noise.forEach(function(t){i[t.data[0].dataIndex]=t.data[0]}),i}function Y(){return Math.random().toString(36).substring(2,7)+"-"+M++}function D(t,e,i){t.point&&(e&&t.point.graphic&&t.point.graphic.hide(),i&&t.point.dataLabel&&t.point.dataLabel.hide())}function L(t){(t.point||t.target).firePointEvent("drillToCluster",t,function(t){var e=t.point||t.target,i=e.series,r=e.series.xAxis,a=e.series.yAxis,s=e.series.chart,n=s.mapView;if((i.options.cluster||{}).drillToCluster&&e.clusteredData){var o=e.clusteredData.map(function(t){return t.x}).sort(function(t,e){return t-e}),l=e.clusteredData.map(function(t){return t.y}).sort(function(t,e){return t-e}),u=o[0],p=o[o.length-1],d=l[0],h=l[l.length-1],c=Math.abs((p-u)*.1),m=Math.abs((h-d)*.1),f=Math.min(u,p)-c,g=Math.max(u,p)+c,x=Math.min(d,h)-m,y=Math.max(d,h)+m;n?n.fitToBounds({x1:f,x2:g,y1:x,y2:y}):r&&a&&(s.pointer.zoomX=!0,s.pointer.zoomY=!0,s.zoom({originalEvent:t,xAxis:[{axis:r,min:f,max:g}],yAxis:[{axis:a,min:x,max:y}]}))}})}function z(t,e){var i=t.chart,r=t.xAxis,a=t.yAxis;return i.mapView?i.mapView.pixelsToProjectedUnits(e):{x:r?r.toValue(e.x):0,y:a?a.toValue(e.y):0}}function P(t){var e,i,r,a=this.chart,n=a.mapView,o=s((this.options.cluster||{}).animation),l=o.duration||500,u=(this.markerClusterInfo||{}).pointsState,p=(u||{}).newState,d=(u||{}).oldState,h=[],c=0,m=0,f=0,g=!1,x=!1;if(d&&p){var y=H(this,i=p[t.stateId]);m=y.x-(n?0:a.plotLeft),f=y.y-(n?0:a.plotTop),1===i.parentsId.length?(e=d[(p||{})[t.stateId].parentsId[0]],i.point&&i.point.graphic&&e&&e.point&&e.point.plotX&&e.point.plotY&&e.point.plotX!==i.point.plotX&&e.point.plotY!==i.point.plotY&&(r=i.point.graphic.getBBox(),c=i.point.graphic&&i.point.graphic.isImg?0:r.width/2,i.point.graphic.attr({x:e.point.plotX-c,y:e.point.plotY-c}),i.point.graphic.animate({x:m-(i.point.graphic.radius||0),y:f-(i.point.graphic.radius||0)},o,function(){x=!0,e.point&&e.point.destroy&&e.point.destroy()}),i.point.dataLabel&&i.point.dataLabel.alignAttr&&e.point.dataLabel&&e.point.dataLabel.alignAttr&&(i.point.dataLabel.attr({x:e.point.dataLabel.alignAttr.x,y:e.point.dataLabel.alignAttr.y}),i.point.dataLabel.animate({x:i.point.dataLabel.alignAttr.x,y:i.point.dataLabel.alignAttr.y},o)))):0===i.parentsId.length?(D(i,!0,!0),C(function(){b(i,.1,o,!0,!0)},l/2)):(D(i,!0,!0),i.parentsId.forEach(function(t){d&&d[t]&&(e=d[t],h.push(e),e.point&&e.point.graphic&&(g=!0,e.point.graphic.show(),e.point.graphic.animate({x:m-(e.point.graphic.radius||0),y:f-(e.point.graphic.radius||0),opacity:.4},o,function(){x=!0,S(i,h,o,.7)}),e.point.dataLabel&&-9999!==e.point.dataLabel.y&&i.point&&i.point.dataLabel&&i.point.dataLabel.alignAttr&&(e.point.dataLabel.show(),e.point.dataLabel.animate({x:i.point.dataLabel.alignAttr.x,y:i.point.dataLabel.alignAttr.y,opacity:.4},o))))}),C(function(){x||S(i,h,o,.85)},l),g||C(function(){S(i,h,o,.1)},l/2))}}function j(){(this.markerClusterSeriesData||[]).forEach(function(t){t&&t.destroy&&t.destroy()}),this.markerClusterSeriesData=null}function E(){var t,e,i,r,s,n,p,d,c,f,g,x,C,k,v,M,I=this,S=I.chart,b=S.mapView,A=I.xData,X=I.yData,Y=I.options.cluster,D=I.getRealExtremes(),P=[],j=[],E=[];if(b&&I.is("mappoint")&&A&&X&&(I.options.data||[]).forEach(function(t,e){var i=I.projectPoint(t);i&&(A[e]=i.x,X[e]=i.y)}),Y&&Y.enabled&&A&&A.length&&X&&X.length&&!S.polar){g=Y.layoutAlgorithm.type,(k=Y.layoutAlgorithm).processedGridSize=y(k.gridSize||o.layoutAlgorithm.gridSize,S.plotWidth),k.processedDistance=y(k.distance||o.layoutAlgorithm.distance,S.plotWidth),r=k.kmeansThreshold||o.layoutAlgorithm.kmeansThreshold;var w=k.processedGridSize/2,O=z(I,{x:0,y:0}),T=z(I,{x:w,y:w});for(M=0,s=Math.abs(O.x-T.x),n=Math.abs(O.y-T.y);M<A.length;M++)!I.dataMaxX&&(u(d)&&u(p)&&u(f)&&u(c)?m(X[M])&&m(f)&&m(c)&&(d=Math.max(A[M],d),p=Math.min(A[M],p),f=Math.max(X[M]||f,f),c=Math.min(X[M]||c,c)):(d=p=A[M],f=c=X[M])),A[M]>=D.minX-s&&A[M]<=D.maxX+s&&(X[M]||D.minY)>=D.minY-n&&(X[M]||D.maxY)<=D.maxY+n&&(P.push(A[M]),j.push(X[M]),E.push(M));u(d)&&u(p)&&m(f)&&m(c)&&(I.dataMaxX=d,I.dataMinX=p,I.dataMaxY=f,I.dataMinY=c),x=(C=(h(g)?g:I.markerClusterAlgorithms?g&&I.markerClusterAlgorithms[g]?I.markerClusterAlgorithms[g]:P.length<r?I.markerClusterAlgorithms.kmeans:I.markerClusterAlgorithms.grid:function(){return!1}).call(this,P,j,E,k))?I.getClusteredData(C,Y):C,Y.animation&&I.markerClusterInfo&&I.markerClusterInfo.pointsState&&I.markerClusterInfo.pointsState.oldState?(function(t){if(t)for(var e=void 0,i=0,r=Object.keys(t);i<r.length;i++)(e=t[r[i]]).point&&e.point.destroy&&e.point.destroy()}(I.markerClusterInfo.pointsState.oldState),t=I.markerClusterInfo.pointsState.newState):t={},e=A.length,i=I.markerClusterInfo,x&&(I.processedXData=x.groupedXData,I.processedYData=x.groupedYData,I.hasGroupedData=!0,I.markerClusterInfo=x,I.groupMap=x.groupMap),a.apply(this),x&&I.markerClusterInfo&&((I.markerClusterInfo.clusters||[]).forEach(function(t){(v=I.points[t.index]).isCluster=!0,v.clusteredData=t.data,v.clusterPointsAmount=t.data.length,t.point=v,l(v,"click",L)}),(I.markerClusterInfo.noise||[]).forEach(function(t){t.point=I.points[t.index]}),Y.animation&&I.markerClusterInfo&&(I.markerClusterInfo.pointsState={oldState:t,newState:I.getPointsState(x,i,e)}),Y.animation?this.hideClusteredData():this.destroyClusteredData(),this.markerClusterSeriesData=this.hasGroupedData?this.points:null)}else a.apply(this)}function w(t,e,i){for(var r=[],a=0;a<t.length;a++){var s=H(this,{x:e,y:i}),n=H(this,{x:t[a].posX,y:t[a].posY}),o=Math.sqrt(Math.pow(s.x-n.x,2)+Math.pow(s.y-n.y,2));r.push({clusterIndex:a,distance:o})}return r.sort(function(t,e){return t.distance-e.distance})}function O(t,e){var i,r,a,s,n,l,u,m,g,x,y,C,k,v,M=[],I=[],S=[],b=[],X=[],D=Math.max(2,e.minimumClusterSize||2),L=0;if(h(e.layoutAlgorithm.type)&&!this.isValidGroupedDataObject(t))return p("Highcharts marker-clusters module: The custom algorithm result is not valid!",!1,this.chart),!1;for(v in t)if(t[v].length>=D){if(a=t[v],i=Y(),n=a.length,e.zones)for(k=0;k<e.zones.length;k++)n>=e.zones[k].from&&n<=e.zones[k].to&&((y=e.zones[k]).zoneIndex=k,x=e.zones[k].marker,C=e.zones[k].className);for(g=A(a),"grid"!==e.layoutAlgorithm.type||e.allowOverlap?u={x:g.x,y:g.y}:(l=this.options.marker||{},u=this.preventClusterCollisions({x:g.x,y:g.y,key:v,groupedData:t,gridSize:this.getScaledGridSize(e.layoutAlgorithm),defaultRadius:l.radius||3+(l.lineWidth||0),clusterRadius:x&&x.radius?x.radius:(e.marker||{}).radius||o.marker.radius})),k=0;k<n;k++)a[k].parentStateId=i;if(S.push({x:u.x,y:u.y,id:v,stateId:i,index:L,data:a,clusterZone:y,clusterZoneClassName:C}),M.push(u.x),I.push(u.y),X.push({options:{formatPrefix:"cluster",dataLabels:e.dataLabels,marker:f(e.marker,{states:e.states},x||{})}}),this.options.data&&this.options.data.length)for(k=0;k<n;k++)c(this.options.data[a[k].dataIndex])&&(a[k].options=this.options.data[a[k].dataIndex]);L++,x=null}else for(k=0;k<t[v].length;k++)r=t[v][k],i=Y(),m=null,s=((this.options||{}).data||[])[r.dataIndex],M.push(r.x),I.push(r.y),r.parentStateId=i,b.push({x:r.x,y:r.y,id:v,stateId:i,index:L,data:t[v]}),m=s&&"object"==typeof s&&!d(s)?f(s,{x:r.x,y:r.y}):{userOptions:s,x:r.x,y:r.y},X.push({options:m}),L++;return{clusters:S,noise:b,groupedXData:M,groupedYData:I,groupMap:X}}function T(){var t=this.chart,e=this.xAxis,i=this.yAxis,r=0;return{plotLeft:e&&this.dataMinX&&this.dataMaxX?e.reversed?e.toPixels(this.dataMaxX):e.toPixels(this.dataMinX):t.plotLeft,plotTop:i&&this.dataMinY&&this.dataMaxY?i.reversed?i.toPixels(this.dataMinY):i.toPixels(this.dataMaxY):t.plotTop}}function V(t,e,i){var r,a,s=e?X(e,i):[],n=X(t,i),o={};v=[],t.clusters.forEach(function(t){o[t.stateId]={x:t.x,y:t.y,id:t.stateId,point:t.point,parentsId:[]}}),t.noise.forEach(function(t){o[t.stateId]={x:t.x,y:t.y,id:t.stateId,point:t.point,parentsId:[]}});for(var l=0;l<n.length;l++)r=n[l],a=s[l],r&&a&&r.parentStateId&&a.parentStateId&&o[r.parentStateId]&&-1===o[r.parentStateId].parentsId.indexOf(a.parentStateId)&&(o[r.parentStateId].parentsId.push(a.parentStateId),-1===v.indexOf(a.parentStateId)&&v.push(a.parentStateId));return o}function G(){var t=this.chart,e=t.mapView?0:t.plotLeft,i=z(this,{x:e,y:t.mapView?0:t.plotTop}),r=z(this,{x:e+t.plotWidth,y:e+t.plotHeight}),a=i.x,s=r.x,n=i.y,o=r.y;return{minX:Math.min(a,s),maxX:Math.max(a,s),minY:Math.min(n,o),maxY:Math.max(n,o)}}function R(t){var e=this.xAxis,i=this.chart.mapView,r=t.processedGridSize||o.layoutAlgorithm.gridSize,a=!0,s=1,n=1;this.gridValueSize||(i?this.gridValueSize=r/i.getScale():this.gridValueSize=Math.abs(e.toValue(r)-e.toValue(0)));for(var l=+(r/(i?this.gridValueSize*i.getScale():e.toPixels(this.gridValueSize)-e.toPixels(0))).toFixed(14);a&&1!==l;){var u=Math.pow(2,s);l>.75&&l<1.25?a=!1:l>=1/u&&l<2*(1/u)?(a=!1,n=u):l<=u&&l>u/2&&(a=!1,n=1/u),s++}return r/n/l}function U(){var t=this.markerClusterSeriesData,e=((this.markerClusterInfo||{}).pointsState||{}).oldState||{},i=v.map(function(t){return(e[t].point||{}).id||""});(t||[]).forEach(function(t){t&&-1!==i.indexOf(t.id)?(t.graphic&&t.graphic.hide(),t.dataLabel&&t.dataLabel.hide()):t&&t.destroy&&t.destroy()})}function F(t){var e,i=!1;return!!c(t)&&(g(t,function(t){if(i=!0,!d(t)||!t.length){i=!1;return}for(e=0;e<t.length;e++)if(!c(t[e])||!t[e].x||!t[e].y){i=!1;return}}),i)}function Z(t){var e,i,r,a,s,n,l,p,d,h,c,m,f,g,x=t.key.split("-").map(parseFloat),y=x[0],C=x[1],k=t.gridSize,v=t.groupedData,M=t.defaultRadius,I=t.clusterRadius,S=C*k,b=y*k,X=H(this,t),Y=[],D=(this.options.cluster||{}).marker,L=(this.options.cluster||{}).zones,P=this.getGridOffset(),j=X.x,E=X.y,w=0,O=0;for(j-=P.plotLeft,E-=P.plotTop,p=1;p<5;p++)for(d=0,a=p%2?-1:1,s=p<3?-1:1,n=Math.floor((j+a*I)/k),g=[(l=Math.floor((E+s*I)/k))+"-"+n,l+"-"+C,y+"-"+n];d<g.length;d++)-1===Y.indexOf(g[d])&&g[d]!==t.key&&Y.push(g[d]);for(var T=0;T<Y.length;T++){var V=Y[T];if(v[V]){v[V].posX||(m=A(v[V]),v[V].posX=m.x,v[V].posY=m.y);var G=H(this,{x:v[V].posX||0,y:v[V].posY||0});if(i=G.x-P.plotLeft,r=G.y-P.plotTop,c=(e=V.split("-").map(parseFloat))[0],h=e[1],L)for(p=0,w=v[V].length;p<L.length;p++)w>=L[p].from&&w<=L[p].to&&(O=u((L[p].marker||{}).radius)?L[p].marker.radius||0:D&&D.radius?D.radius:o.marker.radius);v[V].length>1&&0===O&&D&&D.radius?O=D.radius:1===v[V].length&&(O=M),f=I+O,O=0,h!==C&&Math.abs(j-i)<f&&(j=h-C<0?S+I:S+k-I),c!==y&&Math.abs(E-r)<f&&(E=c-y<0?b+I:b+k-I)}}var R=z(this,{x:j+P.plotLeft,y:E+P.plotTop});return v[t.key].posX=R.x,v[t.key].posY=R.y,R}function H(t,e){var i=t.chart,r=t.xAxis,a=t.yAxis;return i.mapView?i.mapView.projectedUnitsToPixels(e):{x:r?r.toPixels(e.x):0,y:a?a.toPixels(e.y):0}}return{compose:function t(e,r){if(x(n,t)){var s=r.prototype;a=s.generatePoints,s.markerClusterAlgorithms=k,s.animateClusterPoint=P,s.destroyClusteredData=j,s.generatePoints=E,s.getClusterDistancesFromPoint=w,s.getClusteredData=O,s.getGridOffset=T,s.getPointsState=V,s.getRealExtremes=G,s.getScaledGridSize=R,s.hideClusteredData=U,s.isValidGroupedDataObject=F,s.preventClusterCollisions=Z,l(r,"destroy",s.destroyClusteredData),(e.plotOptions||{}).series=f((e.plotOptions||{}).series,i)}}}}),i(e,"Extensions/MarkerClusters/MarkerClusters.js",[e["Core/Animation/AnimationUtilities.js"],e["Core/Defaults.js"],e["Core/Globals.js"],e["Extensions/MarkerClusters/MarkerClusterDefaults.js"],e["Extensions/MarkerClusters/MarkerClusterScatter.js"],e["Core/Utilities.js"]],function(t,e,i,r,a,s){var n=t.animObject,o=e.defaultOptions,l=i.composed,u=s.addEvent,p=s.defined,d=s.error,h=s.isFunction,c=s.merge,m=s.pushUnique,f=s.syncTimeout;function g(){for(var t=this.chart,e=0,i=0,r=t.series;i<r.length;i++){var a=r[i];a.markerClusterInfo&&(e=n((a.options.cluster||{}).animation).duration||0)}f(function(){t.tooltip&&t.tooltip.destroy()},e)}function x(){for(var t=0,e=this.series||[];t<e.length;t++){var i=e[t];if(i.markerClusterInfo){var r=i.options.cluster,a=((i.markerClusterInfo||{}).pointsState||{}).oldState;if((r||{}).animation&&i.markerClusterInfo&&0===i.chart.pointer.pinchDown.length&&"pan"!==((i.xAxis||{}).eventArgs||{}).trigger&&a&&Object.keys(a).length){for(var s=0,n=i.markerClusterInfo.clusters;s<n.length;s++){var o=n[s];i.animateClusterPoint(o)}for(var l=0,u=i.markerClusterInfo.noise;l<u.length;l++){var p=u[l];i.animateClusterPoint(p)}}}}}function y(t){var e=(((t.point||t.target).series.options.cluster||{}).events||{}).drillToCluster;h(e)&&e.call(this,t)}function C(){if(this.dataGroup)return d("Highcharts marker-clusters module: Running `Point.update` when point belongs to clustered series is not supported.",!1,this.series.chart),!1}function k(){var t=(this.options.cluster||{}).drillToCluster;if(this.markerClusterInfo&&this.markerClusterInfo.clusters)for(var e=0,i=this.markerClusterInfo.clusters;e<i.length;e++){var r=i[e];r.point&&r.point.graphic&&(r.point.graphic.addClass("highcharts-cluster-point"),t&&r.point&&(r.point.graphic.css({cursor:"pointer"}),r.point.dataLabel&&r.point.dataLabel.css({cursor:"pointer"})),p(r.clusterZone)&&r.point.graphic.addClass(r.clusterZoneClassName||"highcharts-cluster-zone-"+r.clusterZone.zoneIndex))}}return(o.plotOptions||{}).series=c((o.plotOptions||{}).series,r),{compose:function t(e,i,r,s){if(m(l,t)){var n=s.prototype.pointClass,o=s.types.scatter;u(e,"setExtremes",g),u(i,"render",x),u(n,"drillToCluster",y),u(n,"update",C),u(s,"afterRender",k),o&&a.compose(r,o)}}}}),i(e,"Extensions/MarkerClusters/MarkerClusterSymbols.js",[e["Core/Utilities.js"]],function(t){var e,i=t.pushUnique,r=[];function a(t,i,r,a){var s=r/2,n=a/2,o=e.arc(t+s,i+n,s-4,n-4,{start:.5*Math.PI,end:2.5*Math.PI,open:!1}),l=e.arc(t+s,i+n,s-3,n-3,{start:.5*Math.PI,end:2.5*Math.PI,innerR:s-2,open:!1});return e.arc(t+s,i+n,s-1,n-1,{start:.5*Math.PI,end:2.5*Math.PI,innerR:s,open:!1}).concat(l,o)}return{compose:function t(s){i(r,t)&&((e=s.prototype.symbols).cluster=a)}}}),i(e,"masters/modules/marker-clusters.src.js",[e["Core/Globals.js"],e["Extensions/MarkerClusters/MarkerClusters.js"],e["Extensions/MarkerClusters/MarkerClusterSymbols.js"]],function(t,e,i){e.compose(t.Axis,t.Chart,t.defaultOptions,t.Series),i.compose(t.SVGRenderer)})});