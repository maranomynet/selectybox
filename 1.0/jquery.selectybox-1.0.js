// encoding: utf-8
// ----------------------------------------------------------------------------------
// jQuery.fn.selectybox v 1.0
// ----------------------------------------------------------------------------------
// (c) 2012 Hugsmiðjan ehf  -- http://www.hugsmidjan.is
//  written by:
//   * Már Örlygsson        -- http://mar.anomy.net
// ----------------------------------------------------------------------------------
//
// Allows simple styling of selectboxes in a way that is both a11y and mobile friendly.
//
//
// Requires:  jQuery 1.6+
//
//
// Usage:
//  $('select').selectybox({ /* options */ });
//
//
// Options (defaults):
//
//
//
(function($, selectyButton){

  var selectybox = $.fn.selectybox = function ( cfg ) {
          cfg = $.extend({}, defaultCfg, cfg);
          var button = $(cfg.button);
          this
              .wrap(cfg.wrapper)
              .each(function () {
                  var sel = $(this);
                      btn = $(cfg.button)
                                .css( cfg.btnCSS )
                                .text( sel.val() || emptyVal );
                  sel
                      .data(selectyButton, btn)
                      .before( btn );
                })
              .bind('change', function (e) {
                  var sel = $(this);
                  sel.data( selectyButton )
                      .text( sel.val() || emptyVal );
                })
              .css({ opacity: .0001 })
              .css( cfg.selectCSS )
              .parent()
                  .css( cfg.wrapperCSS );
        },

      emptyVal = '\u00a0 \u00a0 \u00a0';

      defaultCfg = selectybox.defaults = {
          wrapper: '<span class="selecty"/>',
          button:  '<span class="'+selectyButton+'"/>',
          btnValSelector: '.'+selectyButton,
          wrapperCSS: { position: 'relative', display:'inline-block' },
          btnCSS:     { display:'block' },
          selectCSS:  { position: 'absolute', top:0, left:0, width:'100%', height:'100%' },
        };


})(jQuery, 'selecty-button');