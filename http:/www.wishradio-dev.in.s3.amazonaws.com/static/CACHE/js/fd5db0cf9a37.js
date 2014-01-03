(function($){'use strict';if($.zepto&&!$.fn.removeData){throw new ReferenceError('Zepto is loaded without the data module.');}
$.fn.noUiSlider=function(options){var
doc=$(document),body=$('body'),namespace='.nui',$VAL=$.fn.val,clsList=['noUi-base','noUi-origin','noUi-handle','noUi-input','noUi-active','noUi-state-tap','noUi-target','-lower','-upper','noUi-connect','noUi-vertical','noUi-horizontal','noUi-background','noUi-z-index','noUi-block','noUi-state-blocked','noUi-rtl'],actions=window.navigator.pointerEnabled?{start:'pointerdown',move:'pointermove',end:'pointerup'}:window.navigator.msPointerEnabled?{start:'MSPointerDown',move:'MSPointerMove',end:'MSPointerUp'}:{start:'mousedown touchstart',move:'mousemove touchmove',end:'mouseup touchend'};function fromPercentage(range,value){return(value*100)/(range[1]-range[0]);}
function toPercentage(range,value){return fromPercentage(range,range[0]<0?value+Math.abs(range[0]):value-range[0]);}
function isPercentage(range,value){return((value*(range[1]-range[0]))/100)+range[0];}
function call(functions,scope,args){if(!$.isArray(functions)){functions=[functions];}
$.each(functions,function(){if(typeof this==='function'){this.call(scope,args);}});}
function instance(object){return object instanceof $||($.zepto&&$.zepto.isZ(object));}
function fixEvent(e){e.preventDefault();var touch=e.type.indexOf('touch')===0,mouse=e.type.indexOf('mouse')===0,pointer=e.type.indexOf('pointer')===0,x,y,event=e;if(e.type.indexOf('MSPointer')===0){pointer=true;}
if(e.originalEvent){e=e.originalEvent;}
if(touch){x=e.changedTouches[0].pageX;y=e.changedTouches[0].pageY;}
if(mouse||pointer){if(!pointer&&window.pageXOffset===undefined){window.pageXOffset=document.documentElement.scrollLeft;window.pageYOffset=document.documentElement.scrollTop;}
x=e.clientX+window.pageXOffset;y=e.clientY+window.pageYOffset;}
return $.extend(event,{pointX:x,pointY:y,cursor:mouse});}
function attach(events,target,callback,scope,noAbstraction){events=events.replace(/\s/g,namespace+' ')+namespace;if(noAbstraction){return target.on(events,$.proxy(callback,$.extend(target,scope)));}
scope.handler=callback;return target.on(events,$.proxy(function(e){if(this.target.hasClass('noUi-state-tap')||this.target.attr('disabled')){return false;}
this.handler(fixEvent(e));},scope));}
function isNumeric(a){return!isNaN(parseFloat(a))&&isFinite(a);}
function getPercentage(){var value=parseFloat(this.style[$(this).data('style')]);return isNaN(value)?-1:value;}
function serialize(a){var target=this.target;if(a===undefined){return this.element.data('value');}
if(a===true){a=this.element.data('value');}else{this.element.data('value',a);}
$.each(this.elements,function(){if(typeof this==='function'){this.call(target,a);}else{this[0][this[1]](a);}});}
function inputValue(){var val=[null,null];val[this.which]=this.val();this.target.val(val,true);}
function test(input,sliders){var tests={'handles':{r:true,t:function(q){q=parseInt(q,10);return(q===1||q===2);}},'range':{r:true,t:function(q,o,w){if(q.length!==2){return false;}
q=[parseFloat(q[0]),parseFloat(q[1])];if(!isNumeric(q[0])||!isNumeric(q[1])){return false;}
if(w==='range'&&q[0]===q[1]){return false;}
if(q[1]<q[0]){return false;}
o[w]=q;return true;}},'start':{r:true,t:function(q,o,w){if(o.handles===1){if($.isArray(q)){q=q[0];}
q=parseFloat(q);o.start=[q];return isNumeric(q);}
return tests.range.t(q,o,w);}},'connect':{t:function(q,o){return o.handles===1?(q==='lower'||q==='upper'):typeof q==='boolean';}},'orientation':{t:function(q){return(q==='horizontal'||q==='vertical');}},'margin':{r:true,t:function(q,o,w){q=parseFloat(q);o[w]=fromPercentage(o.range,q);return isNumeric(q);}},'direction':{r:true,t:function(q,o,w){switch(q){case'ltr':o[w]=0;break;case'rtl':o[w]=1;break;default:return false;}
return true;}},'serialization':{r:true,t:function(q,o,w){function ser(r){return instance(r)||typeof r==='string'||typeof r==='function'||r===false||(instance(r[0])&&typeof r[0][r[1]]==='function');}
function filter(value){var items=[[],[]];if(ser(value)){items[0].push(value);}else{$.each(value,function(i,val){if(i>1){return;}
if(ser(val)){items[i].push(val);}else{items[i]=items[i].concat(val);}});}
return items;}
if(!q.to){o[w].to=[[],[]];}else{var i,j;q.to=filter(q.to,0);if(o.direction&&q.to[1].length){q.to.reverse();}
for(i=0;i<o.handles;i++){for(j=0;j<q.to[i].length;j++){if(!ser(q.to[i][j])){return false;}
if(!q.to[i][j]){q.to[i].splice(j,1);}}}
o[w].to=q.to;}
if(!q.resolution){o[w].resolution=0.01;}else{switch(q.resolution){case 1:case 0.1:case 0.01:case 0.001:case 0.0001:case 0.00001:break;default:return false;}}
if(!q.mark){o[w].mark='.';}else if(q.mark!=='.'&&q.mark!==','){return false;}
return true;}},'slide':{t:function(q){return typeof q==='function';}},'set':{t:function(q,o){return tests.slide.t(q,o);}},'block':{t:function(q,o){return tests.slide.t(q,o);}},'step':{t:function(q,o,w){q=parseFloat(q);o[w]=q;return isNumeric(q);}}};$.each(tests,function(name,test){var value=input[name],isSet=(value||value===0);if((test.r&&!isSet)||(isSet&&!test.t(value,input,name))){if(console&&console.log&&console.group){console.group('Invalid noUiSlider initialisation:');console.log('Option:\t',name);console.log('Value:\t',value);console.log('Slider(s):\t',sliders);console.groupEnd();}
throw new RangeError('noUiSlider');}});}
function closest(value,to){return Math.round(value/to)*to;}
function format(value,options){value=value.toFixed(options.decimals);return value.replace('.',options.serialization.mark);}
function block(base,ignore,stateless){if(ignore){return false;}
var target=base.data('target');if(!target.hasClass(clsList[14])){if(!stateless){target.addClass(clsList[15]);setTimeout(function(){target.removeClass(clsList[15]);},600);}
target.addClass(clsList[14]);call(base.data('options').block,target);}
return false;}
function setHandle(handle,to,ignore){var settings=handle.data('options'),base=handle.data('base'),handles=base.data('handles'),edge,initial=handle[0].gPct();to=to<0?0:to>100?100:to;if(!isNumeric(to)||to===initial){return false;}
if(settings.step){to=closest(to,fromPercentage(settings.range,settings.step));}
if(to===initial){return false;}
if(handles.length>1){if(handle[0]===handles[1][0]){edge=handles[0][0].gPct()+settings.margin;to=to<edge?edge:to;}else{edge=handles[1][0].gPct()-settings.margin;to=to>edge?edge:to;}}
to=to<0?0:to>100?100:to;if(to===initial){return block(base,ignore,!settings.margin);}
base.data('target').removeClass(clsList[14]);handle.css(handle.data('style'),to+'%');if(handle[0]===handles[0][0]){handle.children('.'+clsList[2]).toggleClass(clsList[13],to>50);}
if(settings.direction){to=100-to;}
handle.data('store').val(format(isPercentage(settings.range,to),settings));return true;}
function storeElement(handle,item,number){if(instance(item)){var elements=[];if(handle.data('options').direction){number=number?0:1;}
item.each(function(){attach('change',$(this),inputValue,{target:handle.data('target'),handle:handle,which:number},true);elements.push([$(this),'val']);});return elements;}
if(typeof item==='string'){item=[$('<input type="hidden" name="'+item+'">').appendTo(handle).addClass(clsList[3]).change(function(e){e.stopPropagation();}),'val'];}
return[item];}
function store(handle,i,serialization){var elements=[];$.each(serialization.to[i],function(index){elements=elements.concat(storeElement(handle,serialization.to[i][index],i));});return{element:handle,elements:elements,target:handle.data('target'),val:serialize};}
function move(event){var base=this.base,proposal,baseSize;if(this.handle.data('style')==='left'){proposal=event.pointX-this.startEvent.pointX;baseSize=base.width();}else{proposal=event.pointY-this.startEvent.pointY;baseSize=base.height();}
proposal=this.position+((proposal*100)/baseSize);if(setHandle(this.handle,proposal)){call(base.data('options').slide,base.data('target'));}}
function end(event){this.handle.children('.'+clsList[2]).removeClass(clsList[4]);if(event.cursor){body.css('cursor','').off(namespace);}
doc.off(namespace);this.target.removeClass(clsList[14]).change();call(this.handle.data('options').set,this.target);}
function start(event){this.handle.children('.'+clsList[2]).addClass(clsList[4]);event.stopPropagation();attach(actions.move,doc,move,{startEvent:event,position:this.handle[0].gPct(),base:this.base,target:this.target,handle:this.handle});attach(actions.end,doc,end,{base:this.base,target:this.target,handle:this.handle});if(event.cursor){body.css('cursor','default');body.on('selectstart'+namespace,function(){return false;});}}
function tap(event){if(this.base.find('.'+clsList[4]).length){return;}
var i,handle,hCenter,base=this.base,handles=base.data('handles'),style=handles[0].data('style'),eventXY=event[style==='left'?'pointX':'pointY'],baseSize=style==='left'?base.width():base.height(),offset={handles:[],base:base.offset()};for(i=0;i<handles.length;i++){offset.handles.push(handles[i].offset());}
hCenter=handles.length===1?0:((offset.handles[0][style]+offset.handles[1][style])/2);if(handles.length===1||eventXY<hCenter){handle=handles[0];}else{handle=handles[1];}
base.addClass(clsList[5]);setTimeout(function(){base.removeClass(clsList[5]);},300);setHandle(handle,(((eventXY-offset.base[style])*100)/baseSize));call([handle.data('options').slide,handle.data('options').set],base.data('target'));base.data('target').change();}
function create(options){options=$.extend({handles:2,margin:0,direction:'ltr',orientation:'horizontal'},options)||{};options.serialization=options.serialization||{};test(options,this);return this.each(function(){var target=$(this).addClass(clsList[6]),i,handle,base=$('<div/>').appendTo(target),d=options.direction,classes={base:[clsList[0]],origin:[[clsList[1],clsList[1]+clsList[d?8:7]],[clsList[1],clsList[1]+clsList[d?7:8]]],handle:[[clsList[2],clsList[2]+clsList[d?8:7]],[clsList[2],clsList[2]+clsList[d?7:8]]]};if(options.connect){if(d){if(options.connect==='lower'){options.connect='upper';}else if(options.connect==='upper'){options.connect='lower';}}
if(options.connect==='lower'){classes.base.push(clsList[9],clsList[9]+clsList[7]);classes.origin[0].push(clsList[12]);}else{classes.base.push(clsList[9]+clsList[8],clsList[12]);classes.origin[0].push(clsList[9]);}}else{classes.base.push(clsList[12]);}
options.decimals=(function(d){d=d.toString().split('.');return d[0]==='1'?0:d[1].length;}(options.serialization.resolution));if(options.orientation==='vertical'){classes.base.push(clsList[10]);}else{classes.base.push(clsList[11]);}
base.addClass(classes.base.join(' ')).data({target:target,options:options,handles:[]});target.data('base',base);if(d){target.addClass(clsList[16]);}
for(i=0;i<options.handles;i++){handle=$('<div><div/></div>').appendTo(base);handle.addClass(classes.origin[i].join(' '));handle.children().addClass(classes.handle[i].join(' '));attach(actions.start,handle.children(),start,{base:base,target:target,handle:handle});handle.data({base:base,target:target,options:options,style:options.orientation==='vertical'?'top':'left'});handle.data({store:store(handle,i,options.serialization)});handle[0].gPct=getPercentage;base.data('handles').push(handle);}
target.val(options.start);attach(actions.start,base,tap,{base:base,target:target});});}
function getValue(){var base=$(this).data('base'),answer=[];$.each(base.data('handles'),function(){answer.push($(this).data('store').val());});if(answer.length===1){return answer[0];}
if(base.data('options').direction){return answer.reverse();}
return answer;}
function setValue(args,set){if(!$.isArray(args)){args=[args];}
return this.each(function(){var handles=Array.prototype.slice.call($(this).data('base').data('handles'),0),settings=handles[0].data('options'),to,i;if(handles.length>1){handles[2]=handles[0];}
if(settings.direction){args.reverse();}
for(i=0;i<handles.length;i++){to=args[i%2];if(to===null||to===undefined){continue;}
if($.type(to)==='string'){to=to.replace(',','.');}
to=toPercentage(settings.range,parseFloat(to));if(settings.direction){to=100-to;}
if(!setHandle(handles[i],to,true)){handles[i].data('store').val(true);}
if(set===true){call(settings.set,$(this));}}});}
$.fn.val=function(){if(this.hasClass(clsList[6])){return arguments.length?setValue.apply(this,arguments):getValue.apply(this);}
return $VAL.apply(this,arguments);};return create.call(this,options);};}(window.jQuery||window.Zepto));$(document).ready(function(){install_review_handlers($('.reviewContainer'));});var manageFeedOwner=function(){var $this=$(this);if($this.hasClass('manageFeedUp')){$this.removeClass('manageFeedUp');$this.parent().find('.whiteBox').hide();}
else{$this.addClass('manageFeedUp');$this.parent().find('.whiteBox').show().css({'display':'inline-block','position':'relative','left':'10px'});}}
var manageFeedOther=function(){if($(this).hasClass('manageFeedUp')){$(this).removeClass('manageFeedUp');$(this).parent().find('.whiteBox').hide();}else{$(this).addClass('manageFeedUp');$(this).parent().find('.whiteBox').show().css({'display':'inline-block','position':'relative','left':'10px'});}}