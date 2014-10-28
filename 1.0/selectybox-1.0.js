/* selectybox 1.0  -- (c) 2012-2014 Hugsmiðjan ehf. - MIT/GPL   @preserve */

// ----------------------------------------------------------------------------------
// selectybox v 1.0
// ----------------------------------------------------------------------------------
// (c) 2012-2014 Hugsmiðjan ehf  -- http://www.hugsmidjan.is
//  written by:
//   * Már Örlygsson        -- http://mar.anomy.net
//
// Dual licensed under a MIT licence (http://en.wikipedia.org/wiki/MIT_License)
// and GPL 2.0 or above (http://www.gnu.org/licenses/old-licenses/gpl-2.0.html).
// ----------------------------------------------------------------------------------
//
// Allows simple styling of <select> boxes in a way that is both accessible and mobile friendly.
//
// Usage:
//  var widget = window.selectybox({ /* options */ });
//  widget.refresh();         // silently refresh the widget
//  widget.val( 'apple' );  // silently updates <select>'s value + refresh
//  widget.destroy();
//  
//  widget.select;    // the original <select> element
//  widget.button;    // the proxy element that contains the value
//  widget.container; // wrapper around both `select` and `button`
//
//
(function(){'use strict';

  var win = window;
  var w3cEvents = !!win.addEventListener;
  
  var emptyDiv;

  var events = function ( widget, action ) {
          var on = w3cEvents ? '' : 'on';
          var method = w3cEvents ?
                          action=='add' ? 'addEventListener' : 'removeEventListener':
                          action=='add' ? 'attachEvent' : 'detachEvent';
          var select = widget.select;
          select[method](on+'change', widget._$refresh);
          select[method](on+'keyup',  widget._$refresh);
          select[method](on+'focus',  widget._$focus);
          select[method](on+'blur',   widget._$blur);
        };

  var setConfig = function ( widget, config, props ) {
          props = props.split(' ');
          var prop;
          var i = 0;
          while ( (prop = props[i++]) )
          {
            if ( config[prop] )
            {
              widget[prop] = config[prop];
            }
          }
        };

  var buildElm = function ( templ ) {
          emptyDiv = emptyDiv || document.createElement('div');
          emptyDiv.innerHTML = templ.replace(/^[^<]+/, '');
          return emptyDiv.firstChild;
        };

  var setStyles = function ( element, styles, doClear ) {
          for ( var cssProp in styles )
          {
            element.style[cssProp] = doClear ? '' : styles[cssProp];
          }
        };


  // ====================================================================


  var Selectybox = function ( select, config ) {
          var widget = this;
          if ( !(widget instanceof Selectybox) )
          {
            // tolerate cases when new is missing.
            return new Selectybox( select, config );
          }
          else
          {
            config = config || {};

            setConfig( widget, config, 'templ getButton focusClass emptyVal text wrapperCSS selectCSS');

            var container = widget.container = buildElm( widget.templ );
            setStyles( container, widget.wrapperCSS );

            widget.button = widget.getButton();
            widget.select = select;

            container.insertBefore( select );
            select.insertBefore( widget.button.nextSibling );
            select.styles.opacity = 0.0001;
            setStyles( select, widget.selectCSS );


            // a widget-bound event handler-functions.
            widget._$refresh = function () {
                setTimeout(function(){ widget.refresh(); }, 0);
              };
            var _focusClassRe;
            widget._$blur = function () {
                _focusClassRe = _focusClassRe || new RegExp('(?:^| )'+widget.focusClass+'( |$)');
                container.className = container.className.replace(_focusClassRe, '$1');
              };
            widget._$focus = function () {
                container.className += ' '+widget.focusClass;
              };

            events( widget, 'add' );

            widget.refresh();
          }
        };

  // Instance properties
      // _config:  Object
      // _on:      Boolean


  Selectybox.prototype = {

      templ:       '<span class="selecty"><span class="selecty-button"></span></span>',
      getButton:   function () { return this.container.firstChild; },
      focusClass:  'focused',
      emptyVal:    '\u00a0 \u00a0 \u00a0',
      text:        function (txt) { return txt; }, // <-- it's OK to add HTML markup
      wrapperCSS:  { position: 'relative' },
      selectCSS:   {
          // set necessary styles
          position: 'absolute',
          bottom:   0,
          left:     0,
          width:    '100%',
          height:   '100%',
          // unset existing styles
          top:      'auto',
          right:    'auto',
          margin:   0, 
          padding:  0,
          border:   0
        },


      refresh: function () {
          var widget = this;
          var select = widget.select;
          widget.button.innerHTML = widget.text(
              select.options[select.selectedIndex].text.replace(/</g, '&lt;')  ||  widget.emptyVal
            );
        },

      val: function ( val ) {
          var widget = this;
          var i = 0;
          var option;
          while ( (option = widget.select.options[i++]) )
          {
            if ( option.value === val )
            {
              option.selected = true;
              break;
            }
          }
          widget.refresh();
        },

      destroy: function () {
          var widget = this;
          var select = widget.select;
          var container = widget.container;
          select.insertBefore( container );
          container.parentNode.removeChild( container );
          events( widget, 'remove' );
          setStyles( select, widget.selectCSS, true );
          select.styles.opacity = '';
          widget.select = widget.container = widget.button = null;
        }

    };

            
  // ====================================================================
            

  Selectybox.jQueryPlugin = function ( $ ) {
      var getWidget = 'selectyboxwidget';
      $.fn.selectybox = function ( config, value ) {
          var selects = this;
          if ( /^(?:refresh|val|destroy)$/.text(config) )
          {
            selects.each(function(){
                $(this).data(getWidget)[config](value);
              });
          }
          else if ( typeof config !== 'string' )
          {
            // set icky default .text() method to crudely match default behaviour the old the jQuery plugin
            config.text = config.text || function (text) {
                $(this.container).toggleClass( 'selecty-empty', !text );
                return text;
              };
            var containers = selects.map(function () {
                    var widget = Selectybox( this, config );
                    $(this).data(getWidget, widget);
                    return widget.container;
                  });
            return selects.pushStack( containers );
          }
          return selects;
        };
    };



  if ( typeof module === 'object'  &&  module.exports )// typeof module.exports === 'object' )
  {
    module.exports = Selectybox;
  }
  else
  {
    win.Selectybox = Selectybox;
    if ( win.jQuery )
    {
      Selectybox.jQueryPlugin( win.jQuery );
    }
  }


})();
