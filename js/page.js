'use strict';

(function( $ ) {
  // Extent jquery object properties.
  $.fn.cdlFonts = function(fontRatio) {
    var maxFontRatio = fontRatio;
    var $this = $(this);

    /**
     * Calculate the font size that adjust to the parent box.
     *
     * @param fontRatio
     */
    function calculateFontSize(fontRatio) {
      $this.fitText(1, { minFontSize: fontRatio + 'px', maxFontSize: maxFontRatio + 'px' });
      if ($this.height() > $this.parent().height()) {
        calculateFontSize(--fontRatio);
      }
    }

    calculateFontSize(fontRatio);
  };

  // Apply resize to the circle titles.
  $('.inner-text-title').cdlFonts(50)
})(jQuery);