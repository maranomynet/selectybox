// $.fn.selectybox 1.0  -- (c) 2012 Hugsmiðjan ehf. - MIT/GPL
(function(e){var t="selecty-button-cfg",s="change.selectybox",a=e.fn.selectybox=function(a,c){var n=this;if(a==="val"){n.val(c).trigger(s)}else if(a==="destroy"){n.each(function(){var s=e(this),a=s.data(t);if(a){s.removeData(t).css("opacity","").parent().after(s).remove();e.each(a.selectCSS||{},function(e){s.css(e,"")})}})}else{a=e.extend({},o,a);return n.pushStack(n.filter("select").data(t,a).wrap(a.wrapper).each(function(){var t=e(this);e(a.button).text(t.find("option:selected").text()||a.emptyVal).insertBefore(t)}).css({opacity:1e-4}).css(a.selectCSS).parent().css(a.wrapperCSS).on("focusin focusout","select",function(t){e(this).parent().toggleClass(a.focusClass,t.type==="focusin")}).on(s+" keypress","select",function(t){var s=e(this);setTimeout(function(){s.prev().text(s.find("option:selected").text()||a.emptyVal)},0)}).toArray())}return n},o=a.defaults={wrapper:'<span class="selecty"/>',button:'<span class="selecty-button"/>',focusClass:"focused",emptyVal:"     ",wrapperCSS:{position:"relative"},selectCSS:{position:"absolute",bottom:0,left:0}}})(jQuery);
