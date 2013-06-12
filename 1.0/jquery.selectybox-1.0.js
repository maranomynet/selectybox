// ----------------------------------------------------------------------------------
// jQuery.fn.selectybox v 1.0
// ----------------------------------------------------------------------------------
// (c) 2012 Hugsmiðjan ehf  -- http://www.hugsmidjan.is
//  written by:
//   * Már Örlygsson        -- http://mar.anomy.net
//
// Dual licensed under a MIT licence (http://en.wikipedia.org/wiki/MIT_License)
// and GPL 2.0 or above (http://www.gnu.org/licenses/old-licenses/gpl-2.0.html).
// ----------------------------------------------------------------------------------
//
// Allows simple styling of <select> boxes in a way that is both accessible and mobile friendly.
//
//
// Requires:  jQuery 1.6+
//
//
// Usage:
//  $('select').selectybox({ /* options */ });
//
//  Returns the wrapper elements.
//
//
(function($){

  var selectybox = $.fn.selectybox = function ( cfg ) {
          cfg = $.extend({}, defaultCfg, cfg);
          var wrappers = this
                            .wrap(cfg.wrapper)
                            .each(function () {
                                var sel = $(this);
                                $(cfg.button)
                                    .text( sel.find('option:selected').text() || cfg.emptyVal )
                                    .insertBefore( sel );
                              })
                            .bind('focus blur', function (e) {
                                $(this).parent()
                                    .toggleClass( cfg.focusClass, e.type === 'focus' );
                              })
                            .bind('change keypress', function (e) {
                                var sel = $(this);
                                setTimeout(function(){
                                    sel.prev()
                                        .text( sel.find('option:selected').text() || cfg.emptyVal );
                                  }, 0);
                              })
                            .css({ opacity: 0.0001 })
                            .css( cfg.selectCSS )
                            .parent()
                                .css( cfg.wrapperCSS );
            return this.pushStack( wrappers );
        },

      defaultCfg = selectybox.defaults = {
          wrapper:        '<span class="selecty"/>',
          button:         '<span class="selecty-button"/>',
          focusClass:     'focused',
          emptyVal:       '\u00a0 \u00a0 \u00a0',
          wrapperCSS:     { position: 'relative' },
          selectCSS:      { position: 'absolute', bottom:0, left:0 }
        };


})(jQuery);