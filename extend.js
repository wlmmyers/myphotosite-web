jQuery.fn.extend({
  addCloseButton: function(){
    $(this).append($('<button></button>', {class:'closeButton', text: 'x'}));
    return this;
  },
  addScreen: function(text){
    $(this).before($('<div>').addClass('screen').append($('<span>').addClass('inner').text(text)));
    return this;
  },
  removeScreen: function(text){
    $(this).siblings('.screen').remove();
    return this;
  },
  toSpaces: function () {
    return this.each(function () {
      var a = $(this).text().split('_');
      for (var x = 0; x < a.length; x++) a[x] = a[x].charAt(0) + a[x].substring(1);
      $(this).text(a.join(' '));
    });
  },
  toUnderscores: function () {
    return this.each(function () {
      var a = $(this).text().split(' ');
      for (var x = 0; x < a.length; x++) a[x] = a[x].charAt(0).toLowerCase() + a[x].substring(1);
      $(this).text(a.join('_'));
    });
  },
  toDisplay: function () {
    return this.each(function () {
      var a = $(this).text().split(/[\s_]+/);
      var nonowords = ['a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'so', 'yet', 'to', 'of'];
      var nonowordscount = 0;
      for (var x = 0; x < a.length; x++) {
        nonowordscount = 0;
        for (var y = 0; y < nonowords.length; y++) {
          if (a[x] == nonowords[y]) nonowordscount++;
        }
        if (nonowordscount == 0) a[x] = (a[x].charAt(0).toUpperCase()) + a[x].substring(1);
        else a[x] = a[x].charAt(0) + a[x].substring(1);

      }
      $(this).text(a.join(' '));
    });
  },
  isShown: function () {
    return (this.css('display') == 'block');

  },
  offScreen: function () {
    return (this.addClass('offscreen'));
  },
  onScreen: function () {
    return (this.removeClass('onscreen'));
  },
  loadingStart: function (size, time) {
    var delaytime = time ? time : ps.o.siteDefaults.loadingGifDelay;
    var $ele = $(this);
    $ele.removeClass('loaded');
    this.timeout = window.setTimeout(function () {
      if (!$ele.hasClass('loaded')) {
        $ele.addClass('loading');
        if (size) $ele.css('background-size', size + 'px');
      }
    }, delaytime);
    return this;
  },
  loadingStop: function () {
    $(this).removeClass('loading').addClass('loaded').css('background-size', 'initial');
    return this;
  },
  visible: function (time, callback) {
    if (callback && time) $(this).animate({ 'opacity': '1.0' }, time, function () { callback() });
    else if (time) $(this).animate({ 'opacity': '1.0' }, time);
    else if (callback) $(this).animate({ 'opacity': '1.0' }, 400, function () { callback() });
    else $(this).animate({ 'opacity': '1.0' });
    return this;
  },
  hidden: function (time, callback) {
    if (callback && time) $(this).animate({ 'opacity': '0' }, time, function () { callback() });
    else if (time) $(this).animate({ 'opacity': '0' }, time);
    else if (callback) $(this).animate({ 'opacity': '0' }, 400, function () { callback() });
    else $(this).animate({ 'opacity': '0' }, 400);
    return this;
  }

});

