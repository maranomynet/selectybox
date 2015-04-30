/* Selectybox 1.0  -- (c) 2012-2014 Hugsmiðjan ehf. - MIT/GPL   @preserve */
!function(){"use strict";var e,t=window,s=!!t.addEventListener,n=function(e,t){var n="add"===t,r=s?(n?"add":"remove")+"EventListener":(n?"at":"de")+"tachEvent",i=s?"":"on",o=e.select;o[r](i+"change",e._$refresh),o[r](i+"keyup",e._$refresh),o[r](i+"focus",e._$focus),o[r](i+"blur",e._$blur)},r=function(e,t,s){for(var n in t)e.style[n]=s?"":t[n]},i="templ getButton focusClass emptyVal text selectCSS".split(" "),o="_$refresh _$focus _$blur select container button".split(" "),l=function(t,s){var o=l.getWidget(t),a=o||this;if(!(a instanceof l))return new l(t,s);if(o&&o.destroy(),s){for(var c,u=0;c=i[u++];)s[c]&&(a[c]=s[c]);s=null}e=e||document.createElement("div"),e.innerHTML=a.templ.replace(/^[^<]+/,"");var f=a.container=e.firstChild;f.style.position="relative",a.button=a.getButton(),a.select=t,t.parentNode.insertBefore(f,t),f.insertBefore(t,a.button.nextSibling),t.style.opacity=1e-4,r(t,a.selectCSS),a._$refresh=function(){setTimeout(function(){a.refresh()},0)};var d;a._$blur=function(){d=d||new RegExp("(?:^| )"+a.focusClass+"( |$)"),f.className=f.className.replace(d,"$1")},a._$focus=function(){f.className+=" "+a.focusClass};var p,h=!1;return a._$able=function(){var e=t.disabled,s=f.className;h!==e&&(h=e,h&&(p=p||new RegExp("(?:^| )"+a.disabledClass+"( |$)")),f.className=h?s+" "+a.disabledClass:s.replace(p,"$1"))},n(a,"add"),a.refresh(),t.$selectybox=a,o?a:void 0};l.prototype={templ:'<span class="selecty"><span class="selecty-button"/></span>',getButton:function(){return this.container.firstChild},focusClass:"focused",disabledClass:"disabled",emptyVal:"     ",text:function(e){return e},selectCSS:{position:"absolute",bottom:0,left:0,width:"100%",height:"100%",top:"auto",right:"auto",margin:0,padding:0,border:0},refresh:function(){this._$able(),this.val()},val:function(e){var t=this,s=t.select;if(null!=e){e+="";for(var n,r=0;n=s.options[r++];)if(n.value===e){n.selected=!0;break}}t.button.innerHTML=t.text(s.options[s.selectedIndex].text.replace(/</g,"&lt;"))||t.emptyVal},disable:function(e){this.select.disabled=e!==!1,this._$able()},destroy:function(){var e=this,t=e.select,s=e.container,l=s.parentNode;l.insertBefore(t,s),l.removeChild(s),n(e,"remove"),t.style.opacity="",r(t,e.selectCSS,!0),t.$selectybox="";for(var a=i.concat(o),c=a.length;c--;)delete e[a[c]]}},l.jQueryPlugin=function(e){e.fn.selectybox=function(t,s){var n=this;if(/^(?:refresh|val|destroy|widget)$/.test(t))n.each(function(){var e=l.getWidget(this);if(e){if("widget"===t)return e;e[t](s)}});else if("string"!=typeof t)return t=t||{},t.text=t.text||function(t){return e(this.container).toggleClass("selecty-empty",!e(this.select).val()),t},n.pushStack(n.filter("select").map(function(e,s){return l(s,t).container}));return n}},l.getWidget=function(e){return e.$selectybox},"object"==typeof module&&module.exports?module.exports=l:(t.Selectybox=l,t.jQuery&&l.jQueryPlugin(t.jQuery))}();
