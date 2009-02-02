$.sendToClipboard = function(text) {
  var copier = $("#flash_copier");
  if (copier.size() == 0) {
    copier = $('<div id="flash_copier"></div>').appendTo("body");
  }
  copier.html('<embed src="_clipboard.swf" FlashVars="clipboard='+encodeURIComponent(text)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>');
};

$.fn.centerOver = function(element, topOffset, leftOffset) {
  topOffset = topOffset || 0;
  leftOffset = leftOffset || 0;
  var self = this;
  self.css({
    top: (element.position().top + element.outerHeight()/2 - self.height()/2 + topOffset).px(),
    left: (element.position().left + element.outerWidth()/2 - self.width()/2 + leftOffset).px()
  });
  return self;
};

$.fn.sponsor = function(programFile, callback) {
  var self = this;
  $.getJSON(programFile, function(program) {
    var sponsor = program.slots[rand(program.slots.length)];
    var id = sponsor.id;
    var anchor = self.find("a");
    anchor.attr("href", sponsor.url);
    anchor.find("img").attr("src", sponsor.image);
    anchor.find("p").html(sponsor.message);
    if (pageTracker) {
      pageTracker._trackPageview("/sponsor/" + id);
      anchor.unbind("click");
      anchor.click(function() { pageTracker._trackPageview("/outgoing/sponsor/" + id); });
    }
    if (callback) callback.call(self);
  });
  return self;
};

function rand(max) {
  return Math.floor(Math.random() * max);
}

Number.prototype.px = function(){ return this.toString() + "px"; };

function gentlyEncode(string) {
  return ( encodeURIComponent
           ? encodeURIComponent(string).replace(/%20(\D)?/g, "+$1").replace(/'/g, escape("'"))
           : escape(string).replace(/\+/g, "%2B").replace(/%20/g, "+") );
}

function gentlyDecode(string) {
  return decodeURIComponent ? decodeURIComponent(string) : unescape(string);
}
