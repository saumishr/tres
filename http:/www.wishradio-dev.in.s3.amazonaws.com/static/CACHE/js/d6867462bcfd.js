(function($){var types=['DOMMouseScroll','mousewheel'];if($.event.fixHooks){for(var i=types.length;i;){$.event.fixHooks[types[--i]]=$.event.mouseHooks;}}
$.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var i=types.length;i;){this.addEventListener(types[--i],handler,false);}}else{this.onmousewheel=handler;}},teardown:function(){if(this.removeEventListener){for(var i=types.length;i;){this.removeEventListener(types[--i],handler,false);}}else{this.onmousewheel=null;}}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel");},unmousewheel:function(fn){return this.unbind("mousewheel",fn);}});function handler(event){var orgEvent=event||window.event,args=[].slice.call(arguments,1),delta=0,returnValue=true,deltaX=0,deltaY=0;event=$.event.fix(orgEvent);event.type="mousewheel";if(orgEvent.wheelDelta){delta=orgEvent.wheelDelta/120;}
if(orgEvent.detail){delta=-orgEvent.detail/3;}
deltaY=delta;if(orgEvent.axis!==undefined&&orgEvent.axis===orgEvent.HORIZONTAL_AXIS){deltaY=0;deltaX=-1*delta;}
if(orgEvent.wheelDeltaY!==undefined){deltaY=orgEvent.wheelDeltaY/120;}
if(orgEvent.wheelDeltaX!==undefined){deltaX=-1*orgEvent.wheelDeltaX/120;}
args.unshift(event,delta,deltaX,deltaY);return($.event.dispatch||$.event.handle).apply(this,args);}})(jQuery);;(function($){"use strict";var feature={};feature.fileapi=$("<input type='file'/>").get(0).files!==undefined;feature.formdata=window.FormData!==undefined;var hasProp=!!$.fn.prop;$.fn.attr2=function(){if(!hasProp)
return this.attr.apply(this,arguments);var val=this.prop.apply(this,arguments);if((val&&val.jquery)||typeof val==='string')
return val;return this.attr.apply(this,arguments);};$.fn.ajaxSubmit=function(options){if(!this.length){log('ajaxSubmit: skipping submit process - no element selected');return this;}
var method,action,url,$form=this;if(typeof options=='function'){options={success:options};}
method=options.type||this.attr2('method');action=options.url||this.attr2('action');url=(typeof action==='string')?$.trim(action):'';url=url||window.location.href||'';if(url){url=(url.match(/^([^#]+)/)||[])[1];}
options=$.extend(true,{url:url,success:$.ajaxSettings.success,type:method||'GET',iframeSrc:/^https/i.test(window.location.href||'')?'javascript:false':'about:blank'},options);var veto={};this.trigger('form-pre-serialize',[this,options,veto]);if(veto.veto){log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');return this;}
if(options.beforeSerialize&&options.beforeSerialize(this,options)===false){log('ajaxSubmit: submit aborted via beforeSerialize callback');return this;}
var traditional=options.traditional;if(traditional===undefined){traditional=$.ajaxSettings.traditional;}
var elements=[];var qx,a=this.formToArray(options.semantic,elements);if(options.data){options.extraData=options.data;qx=$.param(options.data,traditional);}
if(options.beforeSubmit&&options.beforeSubmit(a,this,options)===false){log('ajaxSubmit: submit aborted via beforeSubmit callback');return this;}
this.trigger('form-submit-validate',[a,this,options,veto]);if(veto.veto){log('ajaxSubmit: submit vetoed via form-submit-validate trigger');return this;}
var q=$.param(a,traditional);if(qx){q=(q?(q+'&'+qx):qx);}
if(options.type.toUpperCase()=='GET'){options.url+=(options.url.indexOf('?')>=0?'&':'?')+q;options.data=null;}
else{options.data=q;}
var callbacks=[];if(options.resetForm){callbacks.push(function(){$form.resetForm();});}
if(options.clearForm){callbacks.push(function(){$form.clearForm(options.includeHidden);});}
if(!options.dataType&&options.target){var oldSuccess=options.success||function(){};callbacks.push(function(data){var fn=options.replaceTarget?'replaceWith':'html';$(options.target)[fn](data).each(oldSuccess,arguments);});}
else if(options.success){callbacks.push(options.success);}
options.success=function(data,status,xhr){var context=options.context||this;for(var i=0,max=callbacks.length;i<max;i++){callbacks[i].apply(context,[data,status,xhr||$form,$form]);}};if(options.error){var oldError=options.error;options.error=function(xhr,status,error){var context=options.context||this;oldError.apply(context,[xhr,status,error,$form]);};}
if(options.complete){var oldComplete=options.complete;options.complete=function(xhr,status){var context=options.context||this;oldComplete.apply(context,[xhr,status,$form]);};}
var fileInputs=$('input[type=file]:enabled[value!=""]',this);var hasFileInputs=fileInputs.length>0;var mp='multipart/form-data';var multipart=($form.attr('enctype')==mp||$form.attr('encoding')==mp);var fileAPI=feature.fileapi&&feature.formdata;log("fileAPI :"+fileAPI);var shouldUseFrame=(hasFileInputs||multipart)&&!fileAPI;var jqxhr;if(options.iframe!==false&&(options.iframe||shouldUseFrame)){if(options.closeKeepAlive){$.get(options.closeKeepAlive,function(){jqxhr=fileUploadIframe(a);});}
else{jqxhr=fileUploadIframe(a);}}
else if((hasFileInputs||multipart)&&fileAPI){jqxhr=fileUploadXhr(a);}
else{jqxhr=$.ajax(options);}
$form.removeData('jqxhr').data('jqxhr',jqxhr);for(var k=0;k<elements.length;k++)
elements[k]=null;this.trigger('form-submit-notify',[this,options]);return this;function deepSerialize(extraData){var serialized=$.param(extraData,options.traditional).split('&');var len=serialized.length;var result=[];var i,part;for(i=0;i<len;i++){serialized[i]=serialized[i].replace(/\+/g,' ');part=serialized[i].split('=');result.push([decodeURIComponent(part[0]),decodeURIComponent(part[1])]);}
return result;}
function fileUploadXhr(a){var formdata=new FormData();for(var i=0;i<a.length;i++){formdata.append(a[i].name,a[i].value);}
if(options.extraData){var serializedData=deepSerialize(options.extraData);for(i=0;i<serializedData.length;i++)
if(serializedData[i])
formdata.append(serializedData[i][0],serializedData[i][1]);}
options.data=null;var s=$.extend(true,{},$.ajaxSettings,options,{contentType:false,processData:false,cache:false,type:method||'POST'});if(options.uploadProgress){s.xhr=function(){var xhr=$.ajaxSettings.xhr();if(xhr.upload){xhr.upload.addEventListener('progress',function(event){var percent=0;var position=event.loaded||event.position;var total=event.total;if(event.lengthComputable){percent=Math.ceil(position/total*100);}
options.uploadProgress(event,position,total,percent);},false);}
return xhr;};}
s.data=null;var beforeSend=s.beforeSend;s.beforeSend=function(xhr,o){o.data=formdata;if(beforeSend)
beforeSend.call(this,xhr,o);};return $.ajax(s);}
function fileUploadIframe(a){var form=$form[0],el,i,s,g,id,$io,io,xhr,sub,n,timedOut,timeoutHandle;var deferred=$.Deferred();if(a){for(i=0;i<elements.length;i++){el=$(elements[i]);if(hasProp)
el.prop('disabled',false);else
el.removeAttr('disabled');}}
s=$.extend(true,{},$.ajaxSettings,options);s.context=s.context||s;id='jqFormIO'+(new Date().getTime());if(s.iframeTarget){$io=$(s.iframeTarget);n=$io.attr2('name');if(!n)
$io.attr2('name',id);else
id=n;}
else{$io=$('<iframe name="'+id+'" src="'+s.iframeSrc+'" />');$io.css({position:'absolute',top:'-1000px',left:'-1000px'});}
io=$io[0];xhr={aborted:0,responseText:null,responseXML:null,status:0,statusText:'n/a',getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(status){var e=(status==='timeout'?'timeout':'aborted');log('aborting upload... '+e);this.aborted=1;try{if(io.contentWindow.document.execCommand){io.contentWindow.document.execCommand('Stop');}}
catch(ignore){}
$io.attr('src',s.iframeSrc);xhr.error=e;if(s.error)
s.error.call(s.context,xhr,e,status);if(g)
$.event.trigger("ajaxError",[xhr,s,e]);if(s.complete)
s.complete.call(s.context,xhr,e);}};g=s.global;if(g&&0===$.active++){$.event.trigger("ajaxStart");}
if(g){$.event.trigger("ajaxSend",[xhr,s]);}
if(s.beforeSend&&s.beforeSend.call(s.context,xhr,s)===false){if(s.global){$.active--;}
deferred.reject();return deferred;}
if(xhr.aborted){deferred.reject();return deferred;}
sub=form.clk;if(sub){n=sub.name;if(n&&!sub.disabled){s.extraData=s.extraData||{};s.extraData[n]=sub.value;if(sub.type=="image"){s.extraData[n+'.x']=form.clk_x;s.extraData[n+'.y']=form.clk_y;}}}
var CLIENT_TIMEOUT_ABORT=1;var SERVER_ABORT=2;function getDoc(frame){var doc=null;try{if(frame.contentWindow){doc=frame.contentWindow.document;}}catch(err){log('cannot get iframe.contentWindow document: '+err);}
if(doc){return doc;}
try{doc=frame.contentDocument?frame.contentDocument:frame.document;}catch(err){log('cannot get iframe.contentDocument: '+err);doc=frame.document;}
return doc;}
var csrf_token=$('meta[name=csrf-token]').attr('content');var csrf_param=$('meta[name=csrf-param]').attr('content');if(csrf_param&&csrf_token){s.extraData=s.extraData||{};s.extraData[csrf_param]=csrf_token;}
function doSubmit(){var t=$form.attr2('target'),a=$form.attr2('action');form.setAttribute('target',id);if(!method){form.setAttribute('method','POST');}
if(a!=s.url){form.setAttribute('action',s.url);}
if(!s.skipEncodingOverride&&(!method||/post/i.test(method))){$form.attr({encoding:'multipart/form-data',enctype:'multipart/form-data'});}
if(s.timeout){timeoutHandle=setTimeout(function(){timedOut=true;cb(CLIENT_TIMEOUT_ABORT);},s.timeout);}
function checkState(){try{var state=getDoc(io).readyState;log('state = '+state);if(state&&state.toLowerCase()=='uninitialized')
setTimeout(checkState,50);}
catch(e){log('Server abort: ',e,' (',e.name,')');cb(SERVER_ABORT);if(timeoutHandle)
clearTimeout(timeoutHandle);timeoutHandle=undefined;}}
var extraInputs=[];try{if(s.extraData){for(var n in s.extraData){if(s.extraData.hasOwnProperty(n)){if($.isPlainObject(s.extraData[n])&&s.extraData[n].hasOwnProperty('name')&&s.extraData[n].hasOwnProperty('value')){extraInputs.push($('<input type="hidden" name="'+s.extraData[n].name+'">').val(s.extraData[n].value).appendTo(form)[0]);}else{extraInputs.push($('<input type="hidden" name="'+n+'">').val(s.extraData[n]).appendTo(form)[0]);}}}}
if(!s.iframeTarget){$io.appendTo('body');if(io.attachEvent)
io.attachEvent('onload',cb);else
io.addEventListener('load',cb,false);}
setTimeout(checkState,15);try{form.submit();}catch(err){var submitFn=document.createElement('form').submit;submitFn.apply(form);}}
finally{form.setAttribute('action',a);if(t){form.setAttribute('target',t);}else{$form.removeAttr('target');}
$(extraInputs).remove();}}
if(s.forceSync){doSubmit();}
else{setTimeout(doSubmit,10);}
var data,doc,domCheckCount=50,callbackProcessed;function cb(e){if(xhr.aborted||callbackProcessed){return;}
doc=getDoc(io);if(!doc){log('cannot access response document');e=SERVER_ABORT;}
if(e===CLIENT_TIMEOUT_ABORT&&xhr){xhr.abort('timeout');deferred.reject(xhr,'timeout');return;}
else if(e==SERVER_ABORT&&xhr){xhr.abort('server abort');deferred.reject(xhr,'error','server abort');return;}
if(!doc||doc.location.href==s.iframeSrc){if(!timedOut)
return;}
if(io.detachEvent)
io.detachEvent('onload',cb);else
io.removeEventListener('load',cb,false);var status='success',errMsg;try{if(timedOut){throw'timeout';}
var isXml=s.dataType=='xml'||doc.XMLDocument||$.isXMLDoc(doc);log('isXml='+isXml);if(!isXml&&window.opera&&(doc.body===null||!doc.body.innerHTML)){if(--domCheckCount){log('requeing onLoad callback, DOM not available');setTimeout(cb,250);return;}}
var docRoot=doc.body?doc.body:doc.documentElement;xhr.responseText=docRoot?docRoot.innerHTML:null;xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;if(isXml)
s.dataType='xml';xhr.getResponseHeader=function(header){var headers={'content-type':s.dataType};return headers[header];};if(docRoot){xhr.status=Number(docRoot.getAttribute('status'))||xhr.status;xhr.statusText=docRoot.getAttribute('statusText')||xhr.statusText;}
var dt=(s.dataType||'').toLowerCase();var scr=/(json|script|text)/.test(dt);if(scr||s.textarea){var ta=doc.getElementsByTagName('textarea')[0];if(ta){xhr.responseText=ta.value;xhr.status=Number(ta.getAttribute('status'))||xhr.status;xhr.statusText=ta.getAttribute('statusText')||xhr.statusText;}
else if(scr){var pre=doc.getElementsByTagName('pre')[0];var b=doc.getElementsByTagName('body')[0];if(pre){xhr.responseText=pre.textContent?pre.textContent:pre.innerText;}
else if(b){xhr.responseText=b.textContent?b.textContent:b.innerText;}}}
else if(dt=='xml'&&!xhr.responseXML&&xhr.responseText){xhr.responseXML=toXml(xhr.responseText);}
try{data=httpData(xhr,dt,s);}
catch(err){status='parsererror';xhr.error=errMsg=(err||status);}}
catch(err){log('error caught: ',err);status='error';xhr.error=errMsg=(err||status);}
if(xhr.aborted){log('upload aborted');status=null;}
if(xhr.status){status=(xhr.status>=200&&xhr.status<300||xhr.status===304)?'success':'error';}
if(status==='success'){if(s.success)
s.success.call(s.context,data,'success',xhr);deferred.resolve(xhr.responseText,'success',xhr);if(g)
$.event.trigger("ajaxSuccess",[xhr,s]);}
else if(status){if(errMsg===undefined)
errMsg=xhr.statusText;if(s.error)
s.error.call(s.context,xhr,status,errMsg);deferred.reject(xhr,'error',errMsg);if(g)
$.event.trigger("ajaxError",[xhr,s,errMsg]);}
if(g)
$.event.trigger("ajaxComplete",[xhr,s]);if(g&&!--$.active){$.event.trigger("ajaxStop");}
if(s.complete)
s.complete.call(s.context,xhr,status);callbackProcessed=true;if(s.timeout)
clearTimeout(timeoutHandle);setTimeout(function(){if(!s.iframeTarget)
$io.remove();xhr.responseXML=null;},100);}
var toXml=$.parseXML||function(s,doc){if(window.ActiveXObject){doc=new ActiveXObject('Microsoft.XMLDOM');doc.async='false';doc.loadXML(s);}
else{doc=(new DOMParser()).parseFromString(s,'text/xml');}
return(doc&&doc.documentElement&&doc.documentElement.nodeName!='parsererror')?doc:null;};var parseJSON=$.parseJSON||function(s){return window['eval']('('+s+')');};var httpData=function(xhr,type,s){var ct=xhr.getResponseHeader('content-type')||'',xml=type==='xml'||!type&&ct.indexOf('xml')>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.nodeName==='parsererror'){if($.error)
$.error('parsererror');}
if(s&&s.dataFilter){data=s.dataFilter(data,type);}
if(typeof data==='string'){if(type==='json'||!type&&ct.indexOf('json')>=0){data=parseJSON(data);}else if(type==="script"||!type&&ct.indexOf("javascript")>=0){$.globalEval(data);}}
return data;};return deferred;}};$.fn.ajaxForm=function(options){options=options||{};options.delegation=options.delegation&&$.isFunction($.fn.on);if(!options.delegation&&this.length===0){var o={s:this.selector,c:this.context};if(!$.isReady&&o.s){log('DOM not ready, queuing ajaxForm');$(function(){$(o.s,o.c).ajaxForm(options);});return this;}
log('terminating; zero elements found by selector'+($.isReady?'':' (DOM not ready)'));return this;}
if(options.delegation){$(document).off('submit.form-plugin',this.selector,doAjaxSubmit).off('click.form-plugin',this.selector,captureSubmittingElement).on('submit.form-plugin',this.selector,options,doAjaxSubmit).on('click.form-plugin',this.selector,options,captureSubmittingElement);return this;}
return this.ajaxFormUnbind().bind('submit.form-plugin',options,doAjaxSubmit).bind('click.form-plugin',options,captureSubmittingElement);};function doAjaxSubmit(e){var options=e.data;if(!e.isDefaultPrevented()){e.preventDefault();$(this).ajaxSubmit(options);}}
function captureSubmittingElement(e){var target=e.target;var $el=$(target);if(!($el.is("[type=submit],[type=image]"))){var t=$el.closest('[type=submit]');if(t.length===0){return;}
target=t[0];}
var form=this;form.clk=target;if(target.type=='image'){if(e.offsetX!==undefined){form.clk_x=e.offsetX;form.clk_y=e.offsetY;}else if(typeof $.fn.offset=='function'){var offset=$el.offset();form.clk_x=e.pageX-offset.left;form.clk_y=e.pageY-offset.top;}else{form.clk_x=e.pageX-target.offsetLeft;form.clk_y=e.pageY-target.offsetTop;}}
setTimeout(function(){form.clk=form.clk_x=form.clk_y=null;},100);}
$.fn.ajaxFormUnbind=function(){return this.unbind('submit.form-plugin click.form-plugin');};$.fn.formToArray=function(semantic,elements){var a=[];if(this.length===0){return a;}
var form=this[0];var els=semantic?form.getElementsByTagName('*'):form.elements;if(!els){return a;}
var i,j,n,v,el,max,jmax;for(i=0,max=els.length;i<max;i++){el=els[i];n=el.name;if(!n||el.disabled){continue;}
if(semantic&&form.clk&&el.type=="image"){if(form.clk==el){a.push({name:n,value:$(el).val(),type:el.type});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}
continue;}
v=$.fieldValue(el,true);if(v&&v.constructor==Array){if(elements)
elements.push(el);for(j=0,jmax=v.length;j<jmax;j++){a.push({name:n,value:v[j]});}}
else if(feature.fileapi&&el.type=='file'){if(elements)
elements.push(el);var files=el.files;if(files.length){for(j=0;j<files.length;j++){a.push({name:n,value:files[j],type:el.type});}}
else{a.push({name:n,value:'',type:el.type});}}
else if(v!==null&&typeof v!='undefined'){if(elements)
elements.push(el);a.push({name:n,value:v,type:el.type,required:el.required});}}
if(!semantic&&form.clk){var $input=$(form.clk),input=$input[0];n=input.name;if(n&&!input.disabled&&input.type=='image'){a.push({name:n,value:$input.val()});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}}
return a;};$.fn.formSerialize=function(semantic){return $.param(this.formToArray(semantic));};$.fn.fieldSerialize=function(successful){var a=[];this.each(function(){var n=this.name;if(!n){return;}
var v=$.fieldValue(this,successful);if(v&&v.constructor==Array){for(var i=0,max=v.length;i<max;i++){a.push({name:n,value:v[i]});}}
else if(v!==null&&typeof v!='undefined'){a.push({name:this.name,value:v});}});return $.param(a);};$.fn.fieldValue=function(successful){for(var val=[],i=0,max=this.length;i<max;i++){var el=this[i];var v=$.fieldValue(el,successful);if(v===null||typeof v=='undefined'||(v.constructor==Array&&!v.length)){continue;}
if(v.constructor==Array)
$.merge(val,v);else
val.push(v);}
return val;};$.fieldValue=function(el,successful){var n=el.name,t=el.type,tag=el.tagName.toLowerCase();if(successful===undefined){successful=true;}
if(successful&&(!n||el.disabled||t=='reset'||t=='button'||(t=='checkbox'||t=='radio')&&!el.checked||(t=='submit'||t=='image')&&el.form&&el.form.clk!=el||tag=='select'&&el.selectedIndex==-1)){return null;}
if(tag=='select'){var index=el.selectedIndex;if(index<0){return null;}
var a=[],ops=el.options;var one=(t=='select-one');var max=(one?index+1:ops.length);for(var i=(one?index:0);i<max;i++){var op=ops[i];if(op.selected){var v=op.value;if(!v){v=(op.attributes&&op.attributes['value']&&!(op.attributes['value'].specified))?op.text:op.value;}
if(one){return v;}
a.push(v);}}
return a;}
return $(el).val();};$.fn.clearForm=function(includeHidden){return this.each(function(){$('input,select,textarea',this).clearFields(includeHidden);});};$.fn.clearFields=$.fn.clearInputs=function(includeHidden){var re=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var t=this.type,tag=this.tagName.toLowerCase();if(re.test(t)||tag=='textarea'){this.value='';}
else if(t=='checkbox'||t=='radio'){this.checked=false;}
else if(tag=='select'){this.selectedIndex=-1;}
else if(t=="file"){if(/MSIE/.test(navigator.userAgent)){$(this).replaceWith($(this).clone(true));}else{$(this).val('');}}
else if(includeHidden){if((includeHidden===true&&/hidden/.test(t))||(typeof includeHidden=='string'&&$(this).is(includeHidden)))
this.value='';}});};$.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=='function'||(typeof this.reset=='object'&&!this.reset.nodeType)){this.reset();}});};$.fn.enable=function(b){if(b===undefined){b=true;}
return this.each(function(){this.disabled=!b;});};$.fn.selected=function(select){if(select===undefined){select=true;}
return this.each(function(){var t=this.type;if(t=='checkbox'||t=='radio'){this.checked=select;}
else if(this.tagName.toLowerCase()=='option'){var $sel=$(this).parent('select');if(select&&$sel[0]&&$sel[0].type=='select-one'){$sel.find('option').selected(false);}
this.selected=select;}});};$.fn.ajaxSubmit.debug=false;function log(){if(!$.fn.ajaxSubmit.debug)
return;var msg='[jquery.form] '+Array.prototype.join.call(arguments,'');if(window.console&&window.console.log){window.console.log(msg);}
else if(window.opera&&window.opera.postError){window.opera.postError(msg);}}})(jQuery);$(document).ready(function()
{$('.accordion-header').toggleClass('inactive-header');var contentwidth=$('.accordion-header').width();$('.accordion-content').css({'width':contentwidth});$('.accordion-header').first().toggleClass('active-header').toggleClass('inactive-header');$('.accordion-content').first().slideDown(400,function(){setupScrollBar($(this));}).toggleClass('open-content');var setupScrollBar=function($contentElement){if($contentElement.hasClass('open-content')){setupCustomScrollBar($contentElement);}};var accordian_headers=$('.accordion-header');if(accordian_headers.length>1){accordian_headers.click(function(){var $this=$(this);var $nextContentElement=null;if($this.is('.inactive-header')){$('.active-header').toggleClass('active-header').toggleClass('inactive-header').next().slideToggle().toggleClass('open-content');$this.toggleClass('active-header').toggleClass('inactive-header');$nextContentElement=$this.next();$nextContentElement.slideToggle(400,function(){setupScrollBar($nextContentElement);}).toggleClass('open-content');}
else{$this.toggleClass('active-header').toggleClass('inactive-header');$this.next().slideToggle().toggleClass('open-content');var $nextAccordianHeader=$this.next().next();if($nextAccordianHeader.length){$nextAccordianHeader.toggleClass('active-header').toggleClass('inactive-header');$nextContentElement=$nextAccordianHeader.next();$nextContentElement.slideToggle(400,function(){setupScrollBar($nextContentElement);}).toggleClass('open-content');}else{$('.accordion-header').first().toggleClass('active-header').toggleClass('inactive-header');$nextContentElement=$('.accordion-content').first();$nextContentElement.slideDown(400,function(){setupScrollBar($nextContentElement);}).toggleClass('open-content');}}});}
return false;});(function($){$.fn.linkPreview=function(){function trim(str){return str.replace(/^\s+|\s+$/g,"");}
var block=false;var text;var urlRegex=/(https?\:\/\/|\s)[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})(\/+[a-z0-9_.\:\;-]*)*(\?[\&\%\|\+a-z0-9_=,\.\:\;-]*)?([\&\%\|\+&a-z0-9_=,\:\;\.-]*)([\!\#\/\&\%\|\+a-z0-9_=,\:\;\.-]*)}*/i;var block=false;var blockTitle=false;var blockDescription=false;var contentWidth=290;var content="";var image="";var images="";var title="";var url="";var video="no";var videoPlay="";var description="";var hrefUrl="";var videoIframe="";var leftSideContent="";var photoNumber=0;var firstPosted=false;var firstPosting=false;var nT=false;var endOfCrawling=false;var imageId="";var pTP="";var pDP="";var textText="";$('#text').focus(function(){if(trim($('#text').val())==textText){$(this).val('');$(this).css({'color':'#555555'});}});$('#text').blur(function(){if(trim($('#text').val())==""){$(this).val(textText);$(this).css({'color':'#555555'});$('#submitwithouturl').removeClass('radioPostActive');$('#submitwithurl').removeClass('radioPostActive');}});function resetPreview(){$('#previewPreviousImg').removeClass('buttonLeftActive');$('#previewPreviousImg').addClass('buttonLeftDeactive');$('#previewNextImg').removeClass('buttonRightActive');$('#previewNextImg').addClass('buttonRightDeactive');$('#closePreview').css({"margin-right":"-66px"});$('#previewTitle').css({"width":"290px"});$('#previewDescription').css({"width":"290px"});$('#previewButtons').show();contentWidth=290;photoNumber=0;$('#noThumb').show();$('.nT').show();$('#noThumb').removeAttr("checked");images="";}
$('#text').keyup(function(e){if($('#text').val()!="")
{$('#submitwithouturl').addClass('radioPostActive');$('#submitwithurl').addClass('radioPostActive');}
if((e.which==13||e.which==32||e.which==17)&&trim($(this).val())!=""){text=" "+$('#text').val();video="no";videoPlay="";if(block==false&&urlRegex.test(text)){block=true;$('#preview').hide();$('#previewButtons').hide();$('#previewLoading').html("<img src='http://leocardz.com/img/littleLoader.gif' ></img>");$('#photoNumber').val(0);$.get('php/textCrawler.php',{text:text},function(answer){$('#submitwithurl').show();$('#submitwithouturl').hide();if(answer.url==null)answer.url="";if(answer.pageUrl==null)answer.pageUrl="";if(answer.title==null)answer.title=answer.titleEsc;if(answer.description==null)answer.description=answer.descriptionEsc;if(answer.title==null)answer.title="";if(answer.description==null)answer.description="";if(answer.cannonicalUrl==null)answer.cannonicalUrl="";if(answer.images==null)answer.images="";if(answer.video==null)answer.video="";if(answer.videoIframe==null)answer.videoIframe="";resetPreview();$('#previewLoading').html("");$('#preview').show();$('#previewTitle').html("<span id='previewSpanTitle' >"+answer.title+"</span><input type='text' value='"+answer.title+"' id='previewInputTitle' class='inputPreview' style='display: none;'/>");$('#previewUrl').html(answer.url);$('#previewDescription').html("<span id='previewSpanDescription' >"+answer.description+"</span><textarea id='previewInputDescription' style='width: 290px; display: none;' class='inputPreview' >"+answer.description+"</textarea>");title="<a href='"+answer.pageUrl+"' target='_blank'>"+$('#previewTitle').html()+"</a>";url="<a href='http://"+answer.cannonicalUrl+"' target='_blank'>"+answer.cannonicalUrl+"</a>";fancyUrl=answer.cannonicalUrl;hrefUrl=answer.url;description=$('#previewDescription').html();video=answer.video;videoIframe=answer.videoIframe;try{images=(answer.images).split("|");$('#previewImages').show();$('#previewButtons').show();}
catch(err){$('#previewImages').hide();$('#previewButtons').hide();}
images.length=parseInt(images.length);var appendImage="";for(i=0;i<images.length;i++){if(i==0)appendImage+="<img id='imagePreview"+i+"' src='"+images[i]+"' style='width: 130px; height: auto' ></img>";else appendImage+="<img id='imagePreview"+i+"' src='"+images[i]+"' style='width: 130px; height: auto; display: none' ></img>";}
$('#previewImage').html("<a href='"+answer.pageUrl+"' target='_blank'>"+appendImage+"</a><div id='whiteImage' style='width: 130px; color: transparent; display:none;'>...</div>");$('.photoNumbers').html("1 of "+images.length);if(images.length>1){$('#previewNextImg').removeClass('buttonRightDeactive');$('#previewNextImg').addClass('buttonRightActive');if(firstPosted==false){firstPosted=true;$('#previewPreviousImg').click(function(){if(images.length>1){photoNumber=parseInt($('#photoNumber').val());$('#imagePreview'+photoNumber).css({'display':'none'});photoNumber-=1;if(photoNumber==-1)photoNumber=0;$('#previewNextImg').removeClass('buttonRightDeactive');$('#previewNextImg').addClass('buttonRightActive');if(photoNumber==0){photoNumber=0;$('#previewPreviousImg').removeClass('buttonLeftActive');$('#previewPreviousImg').addClass('buttonLeftDeactive');}
$('#imagePreview'+photoNumber).css({'display':'block'});$('#photoNumber').val(photoNumber);$('.photoNumbers').html(parseInt(photoNumber+1)+" of "+images.length);}});$('#previewNextImg').click(function(){if(images.length>1){photoNumber=parseInt($('#photoNumber').val());$('#imagePreview'+photoNumber).css({'display':'none'});photoNumber+=1;if(photoNumber==images.length)photoNumber=images.length-1;$('#previewPreviousImg').removeClass('buttonLeftDeactive');$('#previewPreviousImg').addClass('buttonLeftActive');if(photoNumber==images.length-1){photoNumber=images.length-1;$('#previewNextImg').removeClass('buttonRightActive');$('#previewNextImg').addClass('buttonRightDeactive');}
$('#imagePreview'+photoNumber).css({'display':'block'});$('#photoNumber').val(photoNumber);$('.photoNumbers').html(parseInt(photoNumber+1)+" of "+images.length);}});}}
else if(images.length==0){$('#closePreview').css({"margin-right":"-206px"});$('#previewTitle').css({"width":"495px"});$('#previewDescription').css({"width":"495px"});$('#previewInputDescription').css({"width":"495px"});contentWidth=495;$('#previewButtons').hide();$('#noThumb').hide();$('.nT').hide();}
if(nT==false){nT=true;$('.nT').click(function(){var noThumb=$('#noThumb').attr("checked");if(noThumb!="checked"){$('#noThumb').attr("checked","checked");$('#imagePreview'+photoNumber).css({'display':'none'});$('#whiteImage').css({'display':'block'});$('#previewButtons').hide();}
else{$('#noThumb').removeAttr("checked");$('#imagePreview'+photoNumber).css({'display':'block'});$('#whiteImage').css({'display':'none'});$('#previewButtons').show();}});}
$('#previewSpanTitle').click(function(){if(blockTitle==false){blockTitle=true;$('#previewSpanTitle').hide();$('#previewInputTitle').show();$('#previewInputTitle').val($('#previewInputTitle').val());$('#previewInputTitle').focus().select();}});$('#previewInputTitle').blur(function(){blockTitle=false;$('#previewSpanTitle').html($('#previewInputTitle').val());$('#previewSpanTitle').show();$('#previewInputTitle').hide();});$('#previewInputTitle').keypress(function(e){if(e.which==13){blockTitle=false;$('#previewSpanTitle').html($('#previewInputTitle').val());$('#previewSpanTitle').show();$('#previewInputTitle').hide();}});$('#previewSpanDescription').click(function(){if(blockDescription==false){blockDescription=true;$('#previewSpanDescription').hide();$('#previewInputDescription').show();$('#previewInputDescription').val($('#previewInputDescription').val());$('#previewInputDescription').focus().select();}});$('#previewInputDescription').blur(function(){blockDescription=false;$('#previewSpanDescription').html($('#previewInputDescription').val());$('#previewSpanDescription').show();$('#previewInputDescription').hide();});$('#previewInputDescription').keypress(function(e){if(e.which==13){blockDescription=false;$('#previewSpanDescription').html($('#previewInputDescription').val());$('#previewSpanDescription').show();$('#previewInputDescription').hide();}});$('#previewSpanTitle').mouseover(function(){$('#previewSpanTitle').css({"background-color":"#ff9"});});$('#previewSpanTitle').mouseout(function(){$('#previewSpanTitle').css({"background-color":"transparent"});});$('#previewSpanDescription').mouseover(function(){$('#previewSpanDescription').css({"background-color":"#ff9"});});$('#previewSpanDescription').mouseout(function(){$('#previewSpanDescription').css({"background-color":"transparent"});});$('#noThumb').click(function(){var noThumb=$(this).attr("checked");if(noThumb!="checked"){$('#imagePreview'+photoNumber).css({'display':'block'});$('#whiteImage').css({'display':'none'});$('#previewButtons').show();}
else{$('#imagePreview'+photoNumber).css({'display':'none'});$('#whiteImage').css({'display':'block'});$('#previewButtons').hide();}});$('#closePreview').click(function(){block=false;endOfCrawling=false;$('#preview').fadeOut("fast",function(){$('#previewImage').html("");$('#previewTitle').html("");$('#previewUrl').html("");$('#previewDescription').html("");});});endOfCrawling=true;if(firstPosting==false){firstPosting=true;$('#submitwithurl').click(function(){imageId="";pTP="";pDP="";text=" "+$('#text').val();title=$('#previewTitle').html();description=$('#previewDescription').html();if((trim(text)!=""&&endOfCrawling==true)){$.get('php/searchUrls.php',{text:text,description:description},function(urls){if($('#noThumb').attr("checked")=="checked"||images.length==0){contentWidth=495;leftSideContent="";}
else{if(video=="yes"){var pattern=/id="(.+?)"/i;imageId=videoIframe.match(pattern);imageId=imageId[1];pTP="pTP"+imageId;pDP="pDP"+imageId;imageId="img"+imageId;image="<img id='"+imageId+"' src='"+$('#imagePreview'+photoNumber).attr("src")+"' class='imgIframe' style='width: 130px; height: auto; float: left;' ></img>";videoPlay='<span class="videoPostPlay"></span>';leftSideContent=image+videoPlay;}
else{image="<img src='"+$('#imagePreview'+photoNumber).attr("src")+"' style='width: 130px; height: auto; float: left;' ></img>";leftSideContent='<a href="'+hrefUrl+'" target="_blank">'+image+'</a>';}}
content='<div class="previewPosted">'+
videoIframe+'<div class="previewImagesPosted">'+'<div class="previewImagePosted">'+leftSideContent+'</div>'+'</div>'+'<div class="previewContentPosted">'+'<div class="previewTitlePosted" id="'+pTP+'"><a href="'+hrefUrl+'" target="_blank">'+title+'</a></div>'+'<div class="previewUrlPosted">'+fancyUrl+'</div>'+'<div class="previewDescriptionPosted" id="'+pDP+'" >'+urls.description+'</div>'+'</div>'+'<div style="clear: both"></div>'+'</div>';$('input[name=urlPreviewContent]').val(content);$('#broadcast').submit();block=false;endOfCrawling=false;},"json");text="";}
else{$('#broadcast').submit();}});}},"json");}}});}})(jQuery);