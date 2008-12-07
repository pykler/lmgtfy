// QueryString Engine v1.0.1 (modified)
// By James Campbell (modified by coderifous)
(function($) {
  $.querystringvalues = $.queryStringValues = $.QueryStringValues = $.QueryStringvalues = $.queryStringValues = $.queryStringvalues = $.querystringValues = $.getqueryString = $.queryString = $.querystring = $.QueryString = $.Querystring = $.getQueryString = $.getquerystring = $.getQuerystring  = function(options)
  {
    defaults = { defaultvalue: null };
    options = $.extend(defaults , options);
    qs = location.search.substring(1, location.search.length);
    if (qs.length == 0) return options.defaultvalue;
      qs = qs.replace(/\+/g, ' ');
      var args = qs.split('&');
      for (var i = 0; i < args.length; i ++ )
      {
        var value;
        var pair = args[i].split('=');
        var name = gentlyDecode(pair[0]);

      if (pair.length == 2)
      {
        value = gentlyDecode(pair[1]);
      }
      else
      {
        value = name;
      }
      if (name == options.id || i == options.id-1)
      {
          return value;
      }
      }
    return options.defaultvalue;
  };
})(jQuery);

(function($) {
  $.sendToClipboard = function(text) {
    var copier = $("#flash_copier");
    if (copier.size() == 0) {
      copier = $('<div id="flash_copier"></div>').appendTo("body");
    }
    copier.html('<embed src="_clipboard.swf" FlashVars="clipboard='+encodeURIComponent(text)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>');
  };
})(jQuery);

(function($) {
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
})(jQuery);

// http://keith-wood.name/localisation.html
// Localisation assistance for jQuery v1.0.2.
// Written by Keith Wood (kbwood@iprimus.com.au) June 2007.
// Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and
// MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses.
// Please attribute the author if you use it.
(function($) {

  // Load applicable localisation package(s) for one or more jQuery packages.
  // Assumes that the localisations are named <base>-<lang>.js
  // and loads them in order from least to most specific.
  // For example, $.localise('jquery-calendar');
  // with the browser set to 'en-US' would attempt to load
  // jquery-calendar-en.js and jquery-calendar-en-US.js.
  // Also accepts an array of package names to process.
  // Optionally specify whether or not to include the base file,
  // the desired language, and/or the timeout period, e.g.
  // $.localise(['jquery-calendar', 'jquery-timeentry'],
  //      {loadBase: true; language: 'en-AU', timeout: 300});
  $.localise = function(pkg, settings) {
    settings = settings || {};
    var saveSettings = {async: $.ajaxSettings.async, timeout: $.ajaxSettings.timeout};
    $.ajaxSetup({async: false, timeout: (settings && settings.timeout ? settings.timeout : 500)});

    var intermediateLangData = {};
    function loadLanguage(pkg, lang, level) {
      level = level || 1;
      if (settings && settings.loadBase && level == 1) {
        intermediateLangData = {};
        var file = pkg + '.json';
        jsonCall(file, pkg, lang, level);
      }
      else if (level == 1) {
        intermediateLangData = {};
        loadLanguage(pkg, lang, 2);
      }
      else if (level == 2 && lang.length >= 2) {
        var file = pkg + '-' + lang.substring(0, 2) + '.json';
        jsonCall(file, pkg, lang, level);
      }
      else if (level == 3 && lang.length >= 5) {
        var file = pkg + '-' + lang.substring(0, 5) + '.json';
        jsonCall(file, pkg, lang, level);
      }
    }

    function jsonCall(file, pkg, lang, level) {
      if (settings.pathPrefix) file = settings.pathPrefix + "/" + file;
      $.getJSON(file, null, function(d){
        $.extend(intermediateLangData, d);
        notifyDelegateLanguageLoaded(intermediateLangData);
        loadLanguage(pkg, lang, level + 1);
      });
    }

    function notifyDelegateLanguageLoaded(data) {
      if (settings.callback) settings.callback(data);
    }

    var lang = normaliseLang(settings && settings.language ? settings.language : $.defaultLanguage);

    if (settings.skipLanguage && settings.skipLanguage == lang) return;
    loadLanguage(pkg, lang, 1);

    $.ajaxSetup(saveSettings);
  };

  // Retrieve the default language set for the browser.
  $.defaultLanguage = normaliseLang(navigator.language
    ? navigator.language       // Mozilla
    : navigator.userLanguage   // IE
  );

  // Ensure language code is in the format aa-AA.
  function normaliseLang(lang) {
   lang = lang.replace(/_/, '-').toLowerCase();
   if (lang.length > 3) {
     lang = lang.substring(0, 3) + lang.substring(3).toUpperCase();
   }
   return lang;
  }

  // Determine whether an object is an array.
  function isArray(a) {
   return (a.constructor && a.constructor.toString().match(/\Array\(\)/));
  }
})(jQuery);

(function($) {
  $.fn.sponsor = function(programFile, callback) {
    var self = this;
    $.getJSON(programFile, function(program) {
      var sponsor = program.slots[rand(program.slots.length - 1)];
      var id = sponsor.id;
      var anchor = self.find("a");
      anchor.attr("href", sponsor.url);
      anchor.find("img").attr("src", sponsor.image);
      anchor.find("p").html(sponsor.message);
      if (pageTracker) {
        pageTracker._trackPageview("/sponsor/" + id);
        anchor.click(function() { pageTracker._trackPageview("/outgoing/sponsor/" + id); });
      }
      if (callback) callback.call(self);
    });
    return self;
  };

  function rand(max) {
    return Math.round(Math.random() * max);
  }
})(jQuery);

// helpers
Number.prototype.px = function(){ return this.toString() + "px"; };

function gentlyEncode(string) {
  return ( encodeURIComponent
           ? encodeURIComponent(string).replace(/%20(\D)?/g, "+$1").replace(/'/g, escape("'"))
           : escape(string).replace(/\+/g, "%2B").replace(/%20/g, "+") );
}

function gentlyDecode(string) {
  return decodeURIComponent ? decodeURIComponent(string) : unescape(string);
}

// default lang necessities
var LMGTFY = {};
LMGTFY.lang = {
  setup: {
    type_question: "Type a question, click a button.",
    share_link:    "Share the link below.",
    or:            "or"
  },

  play: {
    step_1: "Step 1: Type in your question",
    step_2: "Step 2: Click the Search button",
    pwnage: "Was that so hard?"
  },

  link: {
    creating:  "Creating...",
    fetching:  "Fetching...",
    copied:    "URL copied to clipboard",
    shortened: "TinyURL copied to clipboard"
  }
};

// app code
$(function(){
  initializeContent();

  var searchString = $.getQueryString({ id: "q" });
  var inputField   = $("input[type=text]:first");
  var fakeMouse    = $("#fake_mouse");
  var instructions = $("#instructions > div");
  var button       = ($.getQueryString({ id: "l" }) == "1") ? $("#lucky") : $("#search");
  var inputLink    = $("#link input.link");
  var linkButtons  = $("#link_buttons");
  var linkMessage  = $("#link_message");

  if (searchString && searchString.length > 0) googleItForThem();
  else getTheSearchTerms();

  function initializeContent() {
    $("a[name=about]").click(function(){ $("#about").toggle(); return false; });
    $('input.copyable').click(function() { $(this).select(); });
    linkifyAbout();

    var localise_opts = { pathPrefix: 'lang', callback: languageLoaded, skipLanguage: "en-US" };
    var lang = $.getQueryString({ id: "lang" }) || sniffSubdomainForLanguage();
    if (lang) localise_opts.language = lang;
    $.localise('lmgtfy', localise_opts);

    $("#link").hover(function(){ linkButtons.fadeIn("fast"); }, function(){ linkButtons.fadeOut("fast"); });
    $("#go").click(function(){ window.location = inputLink.val(); return false; });
    $("#reset").click(function(){ showTheUrl($(this).attr("url")); return false; });
    $("#tiny").click(function(){
      linkStatus("link.fetching", 0, true);
      $.getJSON("http://json-tinyurl.appspot.com/?callback=?&url=" + gentlyEncode(inputLink.val()), function(data) {
        inputLink.val(data.tinyurl).focus().select();
        linkStatus("link.fetching", 1500);
      });
      $(this).hide();
      $("#reset").show();
      return false;
    });
//     $("#copy").click(function(){
//       $.sendToClipboard(inputLink.val());
//       linkStatus("link.copied");
//       return false;
//     });
  }

  function sniffSubdomainForLanguage() {
    var first = document.location.hostname.split(".")[0];
    var match = first.match(/^[a-z]{2}(?:-[a-z]{2})?$/i);
    return match ? match[0] : null;
  }

  function languageLoaded(data) {
    LMGTFY.lang = data;
    var keys, value;
    $("[rel*=localize]").each(function(){
      elem = $(this);
      keys = elem.attr("rel").split(/\./);
      value = keys.length == 2 ? data[keys[1]] : data[keys[1]][keys[2]];
      if (elem.attr('tagName') == "INPUT")
        elem.val(value);
      else
        elem.text(value);
    });
    linkifyAbout();
  }

  function linkifyAbout() {
    $("#about p").each(function() {
      $(this).html($(this).text().replace(/(@([a-zA-Z0-9]+))/g, '<a href="http://twitter.com/$2">$1</a>'));
    });
  }

  function instruct(langkey) {
    instructions.html(langString(langkey));
  }

  function linkStatus(langkey, millis, stuck) {
    millis = millis || 2500;
    linkMessage.html(langString(langkey)).show().centerOver(inputLink);
    if (!stuck) {
      setTimeout(function(){ linkMessage.fadeOut(millis/4*3); }, millis/4);
    }
  }

  function langString(langkey) {
    var keys = langkey.split(/\./);
    return keys.length == 1 ? LMGTFY.lang[keys[0]] : LMGTFY.lang[keys[0]][keys[1]];
  }

  function getTheSearchTerms() {
    $("#sponsor").hide().sponsor("/sponsors/program.json", function() { this.fadeIn(1000); });
    $("form").submit(function(){ $("#search").click(); return false; });
    instruct("setup.type_question");
    inputField.focus().select();

    $("input[type=button]").click(function(e){
      instruct("setup.share_link");

      var l   = window.location;
      var url = l.protocol + "//" + l.hostname + l.pathname + "?";

      strings = [ "q=" + gentlyEncode(inputField.val()) ];
      if (this.id == "lucky") strings.push("l=1");

      url += strings.join("&");

      showTheUrl(url);
    });
  }

  function showTheUrl(url) {
    $("#copy").hide();

    $("#link").centerOver($("#link_placeholder")).show();
    $("#reset").attr("url", url).hide();
    $("#tiny").show();

    linkStatus("link.creating", 1500);
    inputLink.val(url).focus().select();
    linkButtons.centerOver(inputLink, 28);

//     $.sendToClipboard(inputLink.val());
//     linkStatus("link.copied");
  }

  function googleItForThem() {
    $("#sponsor").hide();
    $("body").css("cursor", "wait");
    fakeMouse.show();
    instruct("play.step_1");

    fakeMouse.animate({
      top:  (inputField.position().top  + 15).px(),
      left: (inputField.position().left + 10).px()
    }, 1500, 'swing', function(){
      inputField.focus();
      fakeMouse.animate({ top: "+=18px", left: "+=10px" }, 'fast', function() { fixSafariRenderGlitch(); });
      type(searchString, 0);
    });

    function type(string, index){
      var val = string.substr(0, index + 1);
      inputField.attr('value', val);
      if (index < string.length) {
        setTimeout(function(){ type(string, index + 1); }, Math.random() * 240);
      }
      else {
        doneTyping();
      }
    }

    function doneTyping(){
      instruct("play.step_2");
      fakeMouse.animate({
        top:  (button.position().top  + 10).px(),
        left: (button.position().left + 30).px()
      }, 2000, 'swing', function(){
        instruct("play.pwnage");
        button.focus();
        setTimeout(redirect, 2000);
      });
    }

    function redirect(){
      if ($.getQueryString({ id: "debug" })) return;

      var escapedString = gentlyEncode(searchString);
      var button_key    = (button.attr("id") == $("#lucky").attr("id")) ? "btnI" : "btnG";

      window.location = "http://www.google.com/search?q=" + escapedString + "&" + button_key + "=" + escape(button.attr("value"));
    }

    function fixSafariRenderGlitch() {
      if ($.browser.safari) inputField.blur().focus();
    }
  }
});
