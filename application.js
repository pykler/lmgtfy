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
    return options.defaultvalue
  };
})(jQuery);

// helpers
Number.prototype.px = function(){ return this.toString() + "px" }

function gentlyEncode(string){
  return ( encodeURIComponent
           ? encodeURIComponent(string).replace(/%20(\D)?/g, "+$1").replace(/'/g, escape("'"))
           : escape(string).replace(/\+/g, "%2B").replace(/%20/g, "+") )
}

function gentlyDecode(string){
  return decodeURIComponent ? decodeURIComponent(string) : unescape(string)
}

// app code
$(function(){
  initializeContent()

  var searchString = $.getQueryString({ id: "q" })
  var inputField   = $("input[type=text]")
  var fakeMouse    = $("#fake_mouse")
  var instructions = $("#instructions > div")
  var button       = ($.getQueryString({ id: "l" }) == "1") ? $("#lucky") : $("#search")

  if (searchString && searchString.length > 0) googleItForThem()
  else getTheSearchTerms()
  
  function initializeContent(){
    $("a[name=about]").click(function(){ $("#about").toggle(); return false; })

    $("#about p").each(function() {
      $(this).html($(this).text().replace(/(@([a-zA-Z0-9]+))/g, '<a href="http://twitter.com/$2">$1</a>'))
    })
  }

  function instruct(words){ instructions.html(words) }

  function getTheSearchTerms(){
    $("form").submit(function(){ $("#search").click(); return false; })
    instruct("Type a question, click a button.")
    inputField.focus().select()

    $("input[type=button]").click(function(e){
      instruct("Share the link below.")

      var l   = window.location
      var url = l.protocol + "//" + l.hostname + l.pathname + "?"

      strings = [ "q=" + gentlyEncode(inputField.val()) ]
      if (this.id == "lucky") strings.push("l=1")
      
      url += strings.join("&")
      
      var link = "<a href='" + url + "'>" + url + "</a>"
      $("#link").html(link)
    })
  }

  function googleItForThem(){
    $("body").css("cursor", "wait")
    fakeMouse.show()
    instruct("Step 1: Type in your question")

    fakeMouse.animate({
      top:  (inputField.position().top  + 15).px(),
      left: (inputField.position().left + 10).px()
    }, 1500, 'swing', function(){
      inputField.focus()
      fakeMouse.animate({ top: "+=18px", left: "+=10px" }, 'fast', function() { fixSafariRenderGlitch() })
      type(searchString, 0)
    })

    function type(string, index){
      var val = string.substr(0, index + 1)
      inputField.attr('value', val)
      if (index < string.length) {
        setTimeout(function(){ type(string, index + 1) }, Math.random() * 240)
      }
      else {
        doneTyping()
      }
    }

    function doneTyping(){
      instruct("Step 2: Click the Search button")
      fakeMouse.animate({
        top:  (button.position().top  + 10).px(),
        left: (button.position().left + 30).px()
      }, 2000, 'swing', function(){
        instruct("Was that so hard?")
        button.focus()
        setTimeout(redirect, 2000)
      })
    }

    function redirect(){
      if ($.getQueryString({ id: "debug" })) return

      var escapedString = gentlyEncode(searchString)
      var button_key    = (button.attr("id") == $("#lucky").attr("id")) ? "btnI" : "btnG"
      
      window.location = "http://www.google.com/search?q=" + escapedString + "&" + button_key + "=" + escape(button.attr("value"))
    }

    function fixSafariRenderGlitch() {
      if ($.browser.safari) inputField.blur().focus()
    }
  }

})