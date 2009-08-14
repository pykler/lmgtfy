// proMarket plugin - easy insert promarket tracking snippet with site id and keyword
// By James Garvin (coderifous)
// Copyright 2009 - License: MIT

(function($) {
  $.proMarket = function(siteId, keyWords) {
    $("body").proMarket(siteId, keyWords);
  };

  $.fn.proMarket = function(siteId, keyWords) {
    this.append(
      '<IFRAME WIDTH="1" HEIGHT="1" MARGINWIDTH="0" MARGINHEIGHT="0" HSPACE="0" ' +
      'VSPACE="0" FRAMEBORDER="0" SCROLLING="no" ' +
      'SRC="http://pbid.pro-market.net/engine?site=' + siteId.toString() +
      ';size=1x1;kw=' + keyWords + '"></IFRAME>');
    return this;
  };
})(jQuery);
