var ps = {

  v: {
    $imagesToTransfer: [],
    $openAfterLogin: null,
    allowMousewheel: true,
    categoriesShown: [],
    categoryToUpload: '',
    catToDelete: { 'name': '', 'headerRow': {} },
    colorToSet: '',
    desiredSliderImageLoaded: false,
    distanceToEdge: 0,
    globalSaveFreeForAll: false,
    hintTimeout: null,
    ignoreNextNotifyClose: false,
    isFirstLoad: true,
    isLoggedIn: false,
    lastHash: null,
    lastNotifyCallback: null,
    lastPhotoShown: '',
    loadingGifTimeout: null,
    minipaneMarginTop: 0,
    mousewheelBuffer: 0,
    mousewheelBufferInterval: null,
    mousewheelDirection: 0,
    multipleImagesToDelete: [],
    notifyTimeout: null,
    originalBackground: '',
    panesAddedByURL: [],
    panesHiddenByURL: [],
    photosHash: '#photos',
    photosWidthExpanded: false,
    preventKeydownEvent: false,
    prolongFirstLoad: false,
    returnToUpload: false,
    sliderAnimation: null,
    sliderAnimationRate: 0,
    sliderCategoryLastLoaded: null,
    sliderFreshLoad: true,
    sliderImgsNotYetLoaded: [],
    transferFromCategory: null
  }, //end variables

  o: {
    photoData: {},
    categoryData: {},
    config: {},
    siteDefaults: {
      accentColor: 'hsla(0,0%,100%,0.7)',
      config: {
        hideFilterScrollThreshold: 100,
        thumbnailMargin: 5
      },
      infoPanes: ['contact', 'about', 'request', 'creations'],
      loadingGifDelay: 1000,
      mousewheelDelayAfterLimit: 500,
      mousewheelLimit: 10,
      mousewheelReverseRate: 100,
      noThumbPaneColor: 'rgba(156, 156, 156, 0.682353)',
      notificiationAnimationTiming: [300, 300],
      paneAddedNotifierTiming: [500, 5000],
      paneExpandedWidthConfigRange: [70, 120],
      panePageAnimationDuration: 1000,
      panePageAnimationMethod: 'easeOutExpo',
      panePageScrollIncrement: 100,
      photoConfigThumbnailIncrement: 50,
      photosWidthConfigRange: [600, 1300],
      picsPerPanePage: 6,
      sliderAccentColor: 'hsla(0,0%,100%,0.7)',
      sliderBackColor: 'hsla(0,0%,50%,1)',
      sliderCaptionColor: 'hsla(0,0%,0%,0.26)',
      sliderPhotoHeight: $(window).height() * 0.75,
      sliderTextColor: 'hsla(163,55%,100%,1)',
      sliderTextWidth: 800,
      slideshowAccentColor: 'hsla(0,0%,100%,0.7)',
      slideshowBackColor: 'hsla(0,0%,50%,1)',
      slideshowCaptionBackgroundColor: 'hsla(0,0%,0%,0.26)',
      slideshowCaptionTextColor: 'hsla(163,55%,100%,1)',
      slideshowPlaceholderColor: 'hsla(0,0%,0%,0.2)'

    },
    hints: {
      //selector to place tip after : hint content
      'body': {text: 'Hi There! Welcome to a demo of what\'s soon to be <i>MyPhotosite.me</i>. <br/><br/>This site will provide the aspiring photographer or established pro the ability to manage and showcase their photography to the masses in a unique, comepletely customizable manner. <br/><br/>The administrator features of the site have been unlocked for your enjoyment, and some hints have been added to help you along your way.' ,width: 470, displayedOnce: false},
      'img.settings' : {text: 'Click here to open the settings dialog', width: 300, displayedOnce: false},
      '#openPhotoConfig button' : {text: 'Click here to open the photo config dialog.', displayedOnce: false},
      '.configDialog' : {text: 'Here, you can manage your photos. In addition to the many options presented, try dragging images to sort them within their categories or using Ctrl/Cmd or Shift to select multiple images.', width: 300, displayedOnce: false},
      'button:contains("Toggle Info")' : {text: 'Click here to display your photos\' metadata. Try filtering the photos by their metadata using the "Filter" box above!', width: 400, displayedOnce: false},
      '.ui-dialog-title:contains("Photo Configuration")' : {text: 'Double-click the titlebar to toggle a larger view.', width: 400, displayedOnce: false},
      '.settingsDialog' : {text: 'In this dialog, you can alter the appearance of the site. Try switching to a different section using the navigation menu at the bottom of the page.', width: 300, displayedOnce: false},
      '.codeDialog' : {text: 'This dialog allows you to restrict access to certain categories. When the category is marked as "hidden" in the Photo Config dialog, entering it\'s name here will reveal it. Try typing "tilt shift" to reveal that hidden category.', width: 400, displayedOnce: false},
      'URL_bar' : {text: 'If this URL is given to a vistor, they will see the "tilt shift" category immediately!', width: 300, displayedOnce: false},
      '.contentpane:last-child' : {text: 'Mouseover a pane to see the photos within.', displayedOnce: false},
      '#slideshowcontainer .switchphotodisplay' : {text: 'Click here to switch views.', displayedOnce: false},
      '#codeitem' : {text: 'Click here to reveal a hidden category.', width: 300, displayedOnce: false}
    },
    //[selector, regex, message, required]
    validationData: [
      ['#comment_name', '^[a-zA-Z0-9 ]*$', 'Please only include letters, numbers, and spaces in the <fieldname> field.', 'required'],
      ['#comment_text', '', '', 'required'],
      ['#feedback_name', '^[a-zA-Z0-9 ]*$', 'Please only include letters, numbers, and spaces in the <fieldname> field.', ''],
      ['#feedback_comment', '', '', 'required'],
      ['#request_requestedphoto', '', '', 'required'],
      ['#request_email', '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$', 'Please enter a valid email address.', 'required']
    ],
    zoomData: { x: 0, y: 0, scrollMult: 0, zoomMult: 0, isZoomed: false, fromButton: false },
    picsCaptions: {},
    picsComments: {},
    dialogDefaults: {}
  }, //end objects

  fn: {
    addDialogHint: function ($dialog, hint) {
      $dialog.parent().find('.ui-dialog-titlebar').append($('<span></span>').addClass('dialoghint').html(hint));
    },
    addPane: function (which) {
      ps.v.categoriesShown.push(which);
      ps.fn.createPane(which);
      ps.fn.assignDimensions();
      ps.fn.adjustSectionWidth('photos');
    },
    adjustSectionWidth: function (section, callback) {
      $('#maincontainer').animate({ 'width': ps.o.config[section + 'Width'] + 'px' }, 200, function () {
        if (typeof callback === 'function') callback();
      });
      if (section === 'photos') ps.fn.setPaneWidth();
    },
    addURLparam: function (param, value) {
      var href = '';
      var urlobj = ps.fn.urlvars();

      if (urlobj.hasOwnProperty(param) && urlobj[param].indexOf(value) == -1) {
        urlobj[param] += ',' + value;
      }
      else if (!urlobj.hasOwnProperty(param)) {
        urlobj[param] = value;
      }
      for (var x in urlobj) {
        if (x == 'section') href += '#' + urlobj[x];
        else href += '&' + x + '=' + urlobj[x];
      }

      window.location.href = href;
      return href;
    },
    advanceSlider: function ($imgtocenter, where, instant) {
      var filename = '';
      if ($imgtocenter) {
        filename = $imgtocenter.attr('data-filename');
        if (instant) {
          var distance = $imgtocenter.position().left - (($(window).width() - $imgtocenter.width()) / 2);
          $('#slidercontainer').scrollLeft(distance);
          window.setTimeout(function () { $('#slidercontainer').scrollLeft(distance); }, 500);
        }
        else {
          $('#slidercontainer').animate({ 'scrollLeft': '+=' + ($imgtocenter.offset().left - (($(window).width() - $imgtocenter.width()) / 2)) }, 500);
        }
      }
      else if (where == 'skiptoback') {
        filename = ps.o.photoData[ps.fn.urlvars().cat][ps.o.photoData[ps.fn.urlvars().cat].length - 1].filename;
        $('#slidercontainer').animate({ 'scrollLeft': '+=' + ($('#sliderdiv').width()) }, 600);

      }
      else if (where == 'skiptofront') {
        filename = ps.o.photoData[ps.fn.urlvars().cat][0].filename;
        $('#slidercontainer').animate({ 'scrollLeft': 0 }, 600);
      }
      if (ps.o.categoryData[ps.fn.urlvars().cat].toggleCaption == 'on') ps.fn.displaySliderCaption(ps.o.picsCaptions[filename]);
      window.location.href = '#slider&cat=' + ps.fn.urlvars().cat + '&pid=' + filename;
    },
    assignConfigDataToPage: function (thisconfig) {
      var hash = window.location.hash.substring(1);
      ps.v.originalPhotosWidth = parseInt(thisconfig['photosWidth']);
      ps.v.originalBackground = thisconfig['backgroundImage'];
      $('#maincontainer').css({ 'width': thisconfig[ps.fn.urlvars().section + 'Width'] + 'px' });
      $('html').css('backgroundImage', thisconfig['backgroundImage']);
      $('#bodyScreen').css({ 'background-color': thisconfig['backFilterColor'] });
      $('#globalNotification .inner').css('background-color', thisconfig['notificationColor']);
      $('#titleText').css('color', thisconfig['titleColor']);
      $('#aboutpane').css('background-color', thisconfig['aboutBackColor']);
      $('#contactpane').css('background-color', thisconfig['contactBackColor']);
      $('#creationspane').css('background-color', thisconfig['creationsBackColor']);
      $('#requestpane').css('background-color', thisconfig['requestBackColor']);
      $('.infopane').css('background-color', thisconfig[hash + 'AccentColor']);
      $('#maincontainer').css('max-height', thisconfig['contentMaxHeight']);
      $('#status').css('color', thisconfig['statusColor']);
      $('footer a,footer a.visited,footer aside,.bigpane,input,h2,h3').css('color', thisconfig['textColor']);

      ps.o.config = thisconfig;

    },
    assignDimensions: function () {
      //this function runs window resize
      $('html').height($(window).height());
      var mainmargin = parseInt($('#maincontainer').css('margin-left'));
      var paneheight = $('.contentpane').height();
      var winwidth = $(window).width();
      var distanceToEdge = winwidth - mainmargin - 50;
      var panewidths = 0;

      if (ps.fn.urlvars().section === 'slideshow') ps.fn.orientateLargeImage($('#largesingleimage'), false);
      else if (ps.fn.urlvars().section === 'slider') ps.fn.orientateSlider();

      $('.contentpane:not(:last-child)').each(function () {
        panewidths += $(this).width();
      });
      panewidths += (ps.o.config['paneExpandedWidth'] * paneheight) + 50;
      if (panewidths > distanceToEdge) distanceToEdge = panewidths;
      if (!ps.fn.inUrl(ps.o.siteDefaults.infoPanes)) $('.panecontainer').width(distanceToEdge);
      $('.titleWrapper').width(distanceToEdge);
      ps.v.distanceToEdge = distanceToEdge;
    },
    buildHsla: function (component, colorpiece, thecolor) {
      var oldcolor = thecolor;
      //get separate old color values
      var thesettings = [
          thecolor.substring(5, oldcolor.indexOf(',')),
          thecolor.substring(oldcolor.indexOf(',') + 1, oldcolor.indexOf('%')) + '%',
          thecolor.substring(oldcolor.indexOf('%') + 2, ps.fn.xIndexOf('%', oldcolor, 2)) + '%',
          thecolor.substring(ps.fn.xIndexOf('%', oldcolor, 2) + 2, oldcolor.indexOf(')'))
      ];
      //return old parts together with new part
      switch (component) {
        case 'h': return 'hsla(' + colorpiece + ',' + thesettings[1] + ',' + thesettings[2] + ',' + thesettings[3] + ')'; break;
        case 's': return 'hsla(' + thesettings[0] + ',' + colorpiece + '%,' + thesettings[2] + ',' + thesettings[3] + ')'; break;
        case 'l': return 'hsla(' + thesettings[0] + ',' + thesettings[1] + ',' + colorpiece + '%,' + thesettings[3] + ')'; break;
        case 'a': return 'hsla(' + thesettings[0] + ',' + thesettings[1] + ',' + thesettings[2] + ',' + colorpiece + ')'; break;
      }
    },
    checkandAddMainPlaceholder: function () {
      $('.emptyPaneMessage').remove();
      if (ps.fn.getCategories().length === 0) {
        $nopanesplaceholder = $('<p></p>').addClass('emptyPaneMessage').html('<h4>Nothing here yet</h4><span class = "addPaneLink">Add a pane!</span>');
        $('.panecontainer').addClass('nopanes').prepend($nopanesplaceholder);
      }
      else if (ps.v.categoriesShown.length === 0) {
        $nopanesplaceholder = $('<p></p>').addClass('emptyPaneMessage').html('<h4>All panes currently hidden</h4><span class = "revealPaneLink">Reveal some panes!</span>');
        $('.panecontainer').addClass('nopanes').prepend($nopanesplaceholder);
      }
    },
    checkThenOpen: function (dialogToOpen) {
      $.getJSON('php/check.php', function (data) {
        if (data == 'cleared') dialogToOpen.dialog('open');
        else {
          ps.fn.notify("Please login to use this feature", "alert");
          ps.dialogs.$login.dialog('open');
          ps.v.$openAfterLogin = dialogToOpen;
        }
      });
    },
    clearFieldError: function ($field) {
      $field.removeClass('invalid').siblings('.validationicon').remove();
    },
    clearForm: function ($dialogs) {
      $dialogs.each(function () {
        $(this).find('textarea,input:not([type=button])').each(function () {
          $(this).val('').removeClass('invalid');
        });
        $(this).find('.validationicon').remove();
      });
      ps.fn.closeNotification();
    },
    clearSelected: function () {
      $('#dialog-config .sortableContainer .sortimage.selected').removeClass('selected secret');
    },
    closeNotification: function () {
      //normal callback function
      if (typeof ps.v.lastNotifyCallback == 'function') {
        ps.v.lastNotifyCallback();
        ps.v.lastNotifyCallback = null;
      }
      //two callback functions: one to run when notification interrupted before timeout expires, and one to run when timeout actually expires
      else if (ps.v.lastNotifyCallback && typeof ps.v.lastNotifyCallback[1] == 'function') {
        if (ps.v.lastNotifyCallback[0] && typeof ps.v.lastNotifyCallback[0] == 'function') {
          ps.v.lastNotifyCallback[0]();
          ps.v.lastNotifyCallback[0] = null;
        }
        ps.v.lastNotifyCallback[1]();
        ps.v.lastNotifyCallback = null;
      }
      if (!ps.v.ignoreNextNotifyClose) {
        var $ele = $('#globalNotification');
        $ele.animate({ 'top': -$ele.height() }, ps.o.siteDefaults.notificiationAnimationTiming[1], function () {
          $(this).find('.inner, br').remove();
        });
        clearTimeout(ps.v.notifyTimeout);
      }
      else ps.v.ignoreNextNotifyClose = false;

    },
    colorAdjustAction: function (element, color) {
      switch (element) {
        case 'Back': $(window.location.hash + 'pane').css('background-color', color); break;
        case 'Accent': $('.infopane,.bigpane input[type=button]').css('background-color', color); break;
        case 'backFilter': $('#bodyScreen').css('background-color', color); break;
        case 'paneExpanded': $('.contentpane').css('background-color', color); break;
        case 'title': $('#titleText').css('color', color); break;
        case 'status': $('#status').css('color', color); break;
        case 'notification': $('#globalNotification .inner').css('background-color', color); break;
        case 'notificationAccent': $('#globalNotification .inner a').css('color', color); break;
        case 'text': $('footer a,footer a.visited,footer aside,.bigpane,input,h3,h2').css('color', color); break;
        case 'slideshowBack': $('#slideshowcontainer').css('background-color', color); break;
        case 'slideshowPlaceholder': $('#slideshowcontainer>.interior').css('background-color', color); break;
        case 'slideshowAccent': $('#slideshowcontainer .bigarrowright').css('border-left-color', color);
          $('#slideshowcontainer .bigarrowleft').css('border-right-color', color);
          $('#slideshowcontainer .imagetext').css('background-color', color); break;
        case 'sliderCaption': $('#slidertext').css('background-color', color); break;
        case 'sliderText': $('#slidertext').css('color', color); break;
        case 'sliderBack': $('#slidercontainer').css('background-color', color); break;
        case 'sliderAccent': $('#slidercontainer .bigarrowright').css('border-left-color', color);
          $('#slidercontainer .bigarrowleft').css('border-right-color', color); break;
      }
    },
    colorAdjustStart: function (element) {
      switch (element) {
        case 'status':
          $('#status').text(ps.v.categoriesShown[0]).toDisplay();
          $('#status').stop().hide().fadeIn('fast');
          break;
        case 'paneExpanded':
          $('.settingsDialog').animate({ 'opacity': '0.3' }, 200);
          $(document).on('mouseenter', '.contentpane', ps.events.contentPaneMouseover);
          $('.contentpane').eq(0).trigger('mouseenter');
          $(document).off('mouseenter', '.contentpane', ps.events.contentPaneMouseover);
          break;
        case 'notification':
        case 'notificationAccent':
          ps.fn.notify('Sample Notification - <a href=\'#\'>with sample link</a>', 'alert', 0);
          break;
        case 'slideshowPlaceholder':
          $('#largesingleimage').fadeOut(100);
          break;
        case 'sliderCaption':
          if ($('#slidertext').text() == '') $('#slidertext').fadeIn(100);
          break;
        case 'sliderText':
          if (ps.o.picsCaptions[ps.fn.urlvars().pid] == '') {
            $('#slidertext').text('Sample Text');
            $('#slidertext').fadeIn(100);
          }
          break;
      }
    },
    colorAdjustStop: function (element) {
      switch (element) {
        case 'status':
          $('#status').stop().fadeOut('fast');
          break;
        case 'paneExpanded':
          $('.settingsDialog').animate({ 'opacity': '1' }, 200);
          $('.contentpane').eq(0).trigger('mouseleave');
          break;
        case 'notification':
        case 'notificationAccent':
          ps.fn.closeNotification();
          break;
        case 'slideshowPlaceholder':
          $('#largesingleimage').fadeIn(100);
          break;
        case 'sliderCaption':
          if ($('#slidertext').text() == '') $('#slidertext').fadeOut(100);
          break;
        case 'sliderText':
          if (ps.o.picsCaptions[ps.fn.urlvars().pid] == '') {
            $('#slidertext').fadeOut(100, function () {
              $('#slidertext').text('');
            });
          }
          break;
      }
    },
    completeLogin: function (source) {
      if (ps.v.isLoggedIn == false) {
        if (source == 'dialog') {
          ps.dialogs.$login.dialog("close");
        }
        ps.v.isLoggedIn = true;
        $('#titleText').off().css('cursor', 'text');
        $('body').prepend($('<img>').addClass('settings').attr('src', 'images/gear.png'));
        if (ps.fn.urlvars().section == 'slider') $('img.settings').css('top', '85px');
        if (ps.v.$openAfterLogin) ps.v.$openAfterLogin.dialog('open');
      }
    },
    copyPhotos: function (categoryTitle) {
      var images = ps.fn.getSelectedConfigImages();
      $.ajax({
        type: "POST",
        url: 'php/copyPhotos.php',
        data: { 'category_title': categoryTitle, 'images': images }
      }).done(function (data) {
        for (var x in images) {
          var fromcategory = ps.fn.lookupCategory(images[x]);
          var photoIndex = ps.fn.lookupPhoto(images[x]);
          ps.o.photoData[copyto].push(ps.o.photoData[fromcategory][photoIndex]);
          ps.o.photoData[fromcategory].splice(photoIndex, 1);
        }
        ps.fn.toggleConfigThumbnailAction('disable');
        ps.fn.notify('Images copied successfully');
        ps.fn.refreshPhotoConfigData(copyto);
        ps.fn.refreshPanes();
      }).fail(function () { alert("error"); return false; });
    },
    createPane: function (paneTitle) {
      $('.panecontainer').removeClass('nopanes').find('.emptyPaneMessage').remove();
      //if no pane title is given, create a pane for the last category added in ps.v.categoriesShown
      if (!paneTitle) paneTitle = ps.v.categoriesShown.length - 1;
      //create the pane
      var $thispane = $("<div>").addClass('contentpane').attr({ 'id': paneTitle }).css('width', ps.fn.setPaneWidth());
      var $thumbcontent = $("<div>").addClass('thumbcontent');
      $('.panecontainer').append($thispane);
      $thispane.append($("<div>").addClass('pagearrows').attr('id', 'arrowRight'));
      $thispane.append($("<div>").addClass('pagearrows').attr('id', 'arrowLeft'));
      $thispane.append($("<div>").addClass('paneexpanded').append($("<div>").addClass('pagenum')));
      $thispane.append($("<div>").addClass('scrollProgress'));
      $thispane.append($thumbcontent);
      var timeout = new ps.fn.loadingStart($thumbcontent, 80);
      var $paneexpanded = $thispane.find('.paneexpanded');
      //add paneNotifier to pane here, set to fadeOut after 10 secs, fadeIn after thumbnails load
      if (ps.v.panesAddedByURL.length == 1 && ps.v.panesAddedByURL.indexOf(paneTitle) > -1 && ps.v.categoriesShown > 1) {
        var $addedNotifier = $("<div>").addClass('paneAddedNotifier');
        $addedNotifier.append($("<span>").text('Your pane here'));
        $addedNotifier.append($("<img>").attr('src', 'images/curveddownarrow.png'));
        $thispane.append($addedNotifier);
        var paneAddedNotificationTimeout = window.setTimeout(function () {
          $('.paneAddedNotifier').fadeOut('slow', function () { $(this).remove() });
        }, ps.o.siteDefaults.paneAddedNotifierTiming[1]);
      }
      //add images to the pane
      if (ps.o.photoData.hasOwnProperty(paneTitle)) {
        var numPics = ps.o.photoData[paneTitle].length;
        var limit = numPics + (ps.o.siteDefaults.picsPerPanePage - numPics % ps.o.siteDefaults.picsPerPanePage) + 1;
        for (var x = 0; x < limit; x++) {
          var imdiv = $("<div>").addClass('minipane');
          if (ps.o.photoData[paneTitle][x]) imdiv.attr({ 'data-path': ps.o.photoData[paneTitle][x].filename });
          else imdiv.addClass('fake');
          $paneexpanded.append(imdiv);
        }
      }
      //create the thumbnail
      ps.fn.loadThumbnail($thispane.find('.thumbcontent'), paneTitle);
    },
    deletePhotos: function () {
      $.ajax({
        type: "POST",
        url: 'php/delete.php',
        data: { 'images': ps.v.multipleImagesToDelete }
      }).done(function (data) {
        for (var x in ps.v.multipleImagesToDelete) delete ps.o.photoData[ps.fn.lookupCategory(ps.v.multipleImagesToDelete[x].filename)][ps.fn.lookupPhoto(parseInt(ps.v.multipleImagesToDelete[x].imgid))];
        ps.fn.refreshPanes();
      }).fail(function () { ps.fn.notify('Delete failed!', 'error') });

      for (var x in ps.v.multipleImagesToDelete) {
        $('.sortimage[data-imgid=' + ps.v.multipleImagesToDelete[x].imgid + ']').parent().remove();
      }

      $('.sortableContainerCloned').html('');
      ps.fn.sortableConfigPhotos_toggleOff();
      ps.v.ignoreNextNotifyClose = true;
      if (ps.v.multipleImagesToDelete.length === 1) ps.fn.notify('Photo deleted.');
      else if (ps.v.multipleImagesToDelete.length > 1) ps.fn.notify('Photos deleted.');
      ps.v.multipleImagesToDelete = [];
    },
    disableThumbnailEdit: function () {
      if (ps.v.$thumbnailEditCategory != null) ps.v.$thumbnailEditCategory.off('click', '.sortableContainer .sortimage', ps.events.sortimageThumbnailAction);
      $('.togglethumbnailassign').removeClass('activated');
    },
    displayHint: function ( selector , placement, time, hideOnSpecificAction, text, delay, alternateHidingSelector, triggerEventType){
      if(!placement) placement = 'left';
      if(!time && time !== 0) time = 3;
      if(!delay) delay = 200;
      if($(selector).length === 0 && selector != 'URL_bar' && $(selector).isShown()){
        ps.fn.log('Selector "' + selector + '" not found or not visible. Cannot display hint.');
        return;
      }
      if(ps.fn.inUrl('nohints')) {
        return;
      }
      var hinttext = (!ps.o.hints[selector] && text) ? text : ps.o.hints[selector].text;
      var where = {}, $obj = $(selector);
      var $hint = $('<div></div>', { class : 'hint ' + placement, html : hinttext });

      $('body').prepend($hint);
      if(ps.o.hints[selector] && ps.o.hints[selector].width) $hint.css('max-width', ps.o.hints[selector].width += 'px');

      if(selector != 'URL_bar'){
        if(hideOnSpecificAction === true) $(document).on( triggerEventType || 'click', selector, function(){ps.fn.hideHint(selector);});
        if(hideOnSpecificAction === true && alternateHidingSelector) $(document).on(triggerEventType || 'click', alternateHidingSelector, function(){ps.fn.hideHint(selector)});
        switch(placement){
          case 'left':
            where.left = $obj.offset().left - $hint.outerWidth() - 18;
            where.top = $obj.offset().top + $obj.outerHeight() / 2 - $hint.outerHeight() / 2;
            break;
          case 'right':
            where.left = $obj.offset().left + $obj.outerWidth() + 20;
            where.top = $obj.offset().top + $obj.outerHeight() / 2 - $hint.outerHeight() / 2;
            break;
          case 'top':
            where.left = $obj.offset().left + $obj.outerWidth() / 2 - ($hint.outerWidth() / 2);
            where.top = $obj.offset().top - $hint.outerHeight() - 22;
            break;
          case 'bottom':
            where.left = $obj.offset().left + $obj.outerWidth() / 2 - ($hint.outerWidth() / 2);
            where.top = $obj.offset().top + $obj.outerHeight() + 20;
            break;
          case 'center modal':
            where.left = $(window).width() / 2 - ($hint.outerWidth() / 2);
            where.top = $(window).height() / 2 - ($hint.outerHeight() / 2);
            $hint.addCloseButton();
            break;
        }
      }
      else if (selector === 'URL_bar') {
        where.left = 200;
        where.top = 20;
      }
      if(where.top < 0 || where.top + $hint.outerHeight() > $(window).height()){
        ps.fn.log('Hint from selector "' + selector + '" would be outside of the visible page area. Not displaying.');
        return;
      }
      if(!ps.o.hints[selector] || ps.o.hints[selector].displayedOnce === false){
        this.displayHintTimeout = window.setTimeout(function(){
          $hint.attr('data-associated-selector', selector).css({'left': where.left + 'px', 'top': where.top + 'px'}).fadeIn();
          clearTimeout(this.displayHintTimeout);
        }, delay);
        clearTimeout(ps.v.hintTimeout);
        if(time > 0) ps.v.hintTimeout = window.setTimeout(function(){ps.fn.hideHint(selector)}, time * 1000);
        if(ps.o.hints[selector]) ps.o.hints[selector].displayedOnce = true;
      }
    },
    displaySelectedConfigPhotosOptions: function () {
      var html = 'With selected: ';
      html += '<a href = "#" class = "configPhotosSelectedOption" id = "deleteSelectedConfigPhotos">delete</a> / ';
      html += '<a href = "#" class = "configPhotosSelectedOption" id = "transferSelectedConfigPhotos">transfer</a> / ';
      html += '<a href = "#" class = "configPhotosSelectedOption" id = "copySelectedConfigPhotos">copy</a> / ';
      html += '<a href = "#" class = "configPhotosSelectedOption" id = "addTagsToSelectedConfigPhotos">edit tags</a>';

      ps.fn.notify(html, '', 0, null, 'replace');
    },
    displaySliderCaption: function (captiontext) {
      $('#slidertext').stop().fadeOut(100, function () {
        var sliderMarginTop = parseInt($('#sliderdiv').css('margin-top'));
        var captionPadding = parseInt($('#slidertext').css('padding-top'));
        var textLeft = ($(window).width() - ps.o.siteDefaults.sliderTextWidth - captionPadding * 2) / 2;
        var windowHeight = $(window).height(), windowWidth = $(window).width(), captionHeight = 0;
        var windowWidth = $(window).width();
        var sliderHeight = ps.o.siteDefaults.sliderPhotoHeight;
        var captionSpaceAvail = (windowHeight - sliderHeight - sliderMarginTop) - captionPadding * 6;
        $('#slidertext').css({ 'background': ps.o.config['sliderCaptionBackground'], 'height': 'initial', 'width': '800px' });
        $(this).text(captiontext).fadeTo(10, 0.001, function () {
          captionHeight = $(this).height();
          //first layer: if text is too tall, try expanding the width
          if (captionHeight > captionSpaceAvail) {
            $('#slidertext').css({ 'width': windowWidth * 0.8, 'left': (windowWidth - windowWidth * 0.8 - captionPadding * 2) / 2 });
            captionHeight = $('#slidertext').height();
            //second layer: if text is still too tall, add scroll bar
            if (captionHeight > captionSpaceAvail) {
              $('#slidertext').css({ 'height': captionSpaceAvail, 'overflow-y': 'scroll' });
              captionHeight = captionSpaceAvail;
            }
          }
          else $('#slidertext').css({ 'width': ps.o.siteDefaults.sliderTextWidth, 'left': textLeft, 'height': 'initial', 'overflow-y': 'visible' });

          $('#slidertext').css('margin-top', (((windowHeight - sliderMarginTop - sliderHeight) - captionHeight) / 2) - captionPadding).fadeTo(300, 1);
          if (captiontext == '') $(this).hide();
        });
      });
    },
    getCategories: function () {
      var categories = [], count = 0;
      for (var x in ps.o.categoryData) {
        categories[count] = x; count++;
      }
      return categories;
    },
    getCookie: function (which) {
      var cookieObj = {};
      var cookieArr = document.cookie.split('; ');
      for (var x in cookieArr) cookieObj[cookieArr[x].substring(0, cookieArr[x].indexOf('='))] = cookieArr[x].substring(cookieArr[x].indexOf('=') + 1);
      if (which) return cookieObj[which];
      else return cookieObj;
    },
    getSelectedConfigImages: function () {
      var images = [];
      $('#dialog-config .sortableContainer .sortimage.selected').each(function () {
        images.push(parseInt($(this).attr('data-imgid')));
      });
      return images;
    },
    hideHint: function(selector){
      var $hint;
      if(selector) $hint = $('.hint[data-associated-selector="' + selector + '"]');
      else $hint = $('.hint');
      $hint.each(function(){
        if ($(this).isShown()) $(this).fadeOut(function(){ $(this).remove(); });
      });
    },
    init: function (hideIt) {
      //create the panes
      for (var x in ps.v.categoriesShown) {
        ps.fn.createPane(ps.v.categoriesShown[x]);
      }
      if (hideIt) $('.contentpane').hide();
      $('header,footer').fadeIn();
      ps.fn.checkandAddMainPlaceholder();

      $('html').height($(window).height());
      var $nopanesplaceholder;
      var mainmargin = parseInt($('#maincontainer').css('margin-left'));
      var paneheight = $('.contentpane').height();
      var winwidth = $(window).width();
      var distanceToEdge = winwidth - mainmargin - 50;
      var panewidths = 0;

      $('.contentpane:not(:last-child)').each(function () {
        panewidths += $(this).width();
      });
      panewidths += (ps.o.config['paneExpandedWidth'] * paneheight) + 50;
      if (panewidths > distanceToEdge) distanceToEdge = panewidths;
      if (!ps.fn.inUrl(ps.o.siteDefaults.infoPanes)) $('.panecontainer').width(distanceToEdge);
      $('.titleWrapper').width(distanceToEdge);
      ps.v.distanceToEdge = distanceToEdge;
    },
    inUrl: function (x, logic) {
      var result = false;
      if (typeof x === 'string') result = window.location.href.indexOf(x) >= 0;
      else if (typeof x === 'object') {
        if (logic === 'and') {
          result = true;
          for (var a in x) if (window.location.href.indexOf(x[a]) < 0) result = false;
        }
        else for (var a in x) if (window.location.href.indexOf(x[a]) >= 0) result = true;
      }
      return result;
    },
    isImageLoaded: function(img){
      if(img){
        if (!img.complete) return false;
        if (img.naturalWidth === 0) return false;
        return true;
      }
      else return false;
    },
    isNotificationShown: function (wordToCheck) {
      var firstWord = $('#globalNotification .inner span').text().split(' ').shift();
      if (wordToCheck && firstWord === wordToCheck) return true;
      else if (wordToCheck) return false;
      else return $('#globalNotification .inner').length != 0;
    },
    isPhotoUnique: function (imgFilename) {
      var count = 0;
      for (var cat in ps.o.photoData) {
        for (var object in ps.o.photoData[cat]) {
          if (ps.o.photoData[cat][object].filename === imgFilename) count++;
        }
      }
      if (count > 1) return false;
      else if (count === 1) return true;

    },
    killSlideshowView: function () {
      $('.imagecaption').toggleClass("showCaption", false);
      $('.largepagenum').hide();
      $('#largesingleimage').hide().attr('src', '');
      $('.paneexpanded').hide();
      $('#bodyScreen').css('background-color', ps.o.config['backFilterColor']);
      $('body').css('padding-top', '4%');
      $('#maincontainer').fadeIn();
      $('.panecontainer').css('width', '100%');
      $('.contentpane').fadeOut('fast');
    },
    loadingStart: function ($element, size, time) {
      var delaytime = time ? time : ps.v.loadingGifDelay;
      this.timeout = window.setTimeout(function () {
        if (!$element.hasClass('loaded')) {
          $element.addClass('loading');
          if (size) $element.css('background-size', size + 'px');
        }
      }, delaytime);
    },
    loadingStop: function ($element) {
      $element.removeClass('loading').addClass('loaded').css('background-size', 'initial');
    },
    loadThumbnail: function ($thumbelement, panetitle) {
      var $placeholder = '<div class = "paneThumbPlaceholder"><h2>' + ps.fn.toDisplay(panetitle) + '</h2><p>Add a thumbnail for this pane in the Config dialog</p></div>';
      if (ps.o.categoryData[panetitle] && ps.o.categoryData[panetitle].thumb) {
        var thumbimagepath = ps.o.categoryData[panetitle].thumb.image;
        var thumbimagepos = ps.o.categoryData[panetitle].thumb.position;
        var $thumbimage = $("<img>").attr('src', thumbimagepath);
        $thumbelement.loadingStart(100);
        $thumbimage.one("load", function () {
          $thumbelement.loadingStop().css({ 'background-image': 'url(' + thumbimagepath + ')', 'background-position': thumbimagepos }).attr('data-imageurl', thumbimagepath).fadeIn();
          //fadeIn paneAddedNotifier once that pane's thumbnail has been loaded
          if (ps.v.panesAddedByURL.indexOf(panetitle) > -1) $('.paneAddedNotifier').delay(ps.o.siteDefaults.paneAddedNotifierTiming[0]).fadeIn();
        }).each(function () {
          if (this.complete) $(this).load();
        });
      }
      else $thumbelement.loadingStop().css('background-color', ps.o.siteDefaults.noThumbPaneColor).append($placeholder).fadeIn();

    },
    log: function () {
      var args = [].slice.apply(arguments), config = {}, output = "";
      for (var x in args) {
        if (args[x].hasOwnProperty('color') || args[x].hasOwnProperty('size')) config = args.splice(x)[0];
      }
      if (window.console && console.log) {
        if (config.hasOwnProperty('color')) color = config['color'];
        else color = 'blue';
        if (config.hasOwnProperty('size')) {
          size = config['size'];
          if (!size || size == 1) size = 'normal';
          else if (size == 2) size = 'large';
          else size = 'x-large';
        }
        else size = 'normal';
        for (var x in args) {
          if (typeof args[x] == 'object') console.log(args[x]);
          else console.log('%c' + args[x], 'color:' + color + '; font-size:' + size);
        }
      }
    },
    logout: function () {
      $.getJSON('php/logout.php', function (data) {
        if (data == 'cleared') {
          $('img.settings').remove();
          ps.v.isLoggedIn = false;
          ps.fn.notify('You are logged out');
        }
      });
    },
    lookupCategory: function (identifier) {
      var result = false;
      //for imageid
      if (typeof identifier === 'number') {
        for (var a in ps.o.photoData) {
          for (var i in ps.o.photoData[a]) {
            if (i && a && ps.o.photoData[a][i] && ps.o.photoData[a][i].id == identifier) result = a;
          }
        }
      }
      //for filename
      else {
        for (var a in ps.o.photoData) {
          for (var i in ps.o.photoData[a]) {
            if (i && a && ps.o.photoData[a][i] && ps.o.photoData[a][i].filename == identifier) result = a;
          }
        }
      }
      return result;
    },
    lookupPhoto: function (identifier, category) {
      var result = false;
      if (!identifier) identifier = ps.fn.urlvars().pid;
      //for imageid
      if (typeof identifier === 'number') {
        for (var a in ps.o.photoData) {
          for (var i in ps.o.photoData[a]) {
            if (i && a && ps.o.photoData[a][i] && ps.o.photoData[a][i].id == identifier) result = i;
          }
        }
      }
      //for filename
      else if (typeof identifier === 'string') {
        if (category) {
          for (var i in ps.o.photoData[category]) {
            if (i && ps.o.photoData[category][i] && ps.o.photoData[category][i].filename == identifier) result = i;
          }
        }
        else {
          for (var a in ps.o.photoData) {
            for (var i in ps.o.photoData[a]) {
              if (i && a && ps.o.photoData[a][i] && ps.o.photoData[a][i].filename == identifier) result = i;
            }
          }
        }
      }
      return result && parseInt(result);
    },
    lookupComment: function (commentid) {
      var result = false;
      for (var a in ps.o.picsComments) {
        for (var i in ps.o.picsComments[a]) {
          if (i && a && ps.o.picsComments[a][i] && ps.o.picsComments[a][i].commentid == commentid) result = i;
        }
      }
      return result && parseInt(result);
    },
    mousewheelAction: function (delta, reverseRate, limit, delayAfterLimit, intervalAction, endAction) {
      if (ps.v.allowMousewheel) {
        if (!limit) limit = ps.o.siteDefaults.mousewheelLimit;
        if (!reverseRate) reverseRate = ps.o.siteDefaults.mousewheelReverseRate;
        if (!delayAfterLimit) delayAfterLimit = ps.o.siteDefaults.mousewheelDelayAfterLimit;
        clearInterval(ps.v.mousewheelBufferInterval);
        if (delta != ps.v.mousewheelDirection) ps.v.mousewheelBuffer = 0;
        ps.v.mousewheelBuffer += delta;
        ps.v.mousewheelBufferInterval = window.setInterval(function () {
          ps.v.mousewheelBuffer -= delta;
          if (typeof intervalAction == 'function') intervalAction();
          if (ps.v.mousewheelBuffer == 0) clearInterval(ps.v.mousewheelBufferInterval);
        }, reverseRate);
        ps.v.mousewheelDirection = delta;
        if (typeof intervalAction == 'function') intervalAction();
        if (Math.abs(ps.v.mousewheelBuffer) == limit) {
          if (typeof endAction == 'function') endAction();
          ps.v.mousewheelBuffer = 0;
          clearInterval(ps.v.mousewheelBufferInterval);
          ps.v.allowMousewheel = false;
          var mousewheelPrevention = window.setTimeout(function () { ps.v.allowMousewheel = true; }, delayAfterLimit);
        }
      }
    },
    notify: function (message, type, time, callback, stack) {
      var innerCount = 0;
      function assignIcon() {
        switch (type) {
          case 'alert': return 'alerticon'; break;
          case 'error': return 'erroricon'; break;
          case 'blank': return 'noicon'; break;
          case 'question': return 'questionicon'; break;
          default: return 'infoicon';
        }
      }
      //normal callback function
      if (typeof ps.v.lastNotifyCallback == 'function') {
        ps.v.lastNotifyCallback();
        ps.v.lastNotifyCallback = null;
      }
      //two callback functions: one to run when notification interrupted before timeout expires, and one to run when timeout actually expires
      else if (ps.v.lastNotifyCallback && typeof ps.v.lastNotifyCallback[0] == 'function') {
        ps.v.lastNotifyCallback[0]();
        ps.v.lastNotifyCallback[0] = null;
      }
      if (callback) ps.v.lastNotifyCallback = callback;

      if ((!time) && (time != 0)) time = 3;


      //replace shortcuts
      message = message.replace('<i>', '<span class=\"italic\">').replace('</i>', '</span>');
      if (stack != 'stack') $('#globalNotification').find('.inner, br').remove();
      innerCount = $('#globalNotification .inner').length;

      //create notification element, append to notification div
      var $inner = $('<div>').css({ 'background-color': ps.o.config['notificationColor'] }).addClass('inner').append($('<img>').addClass(assignIcon()).attr({ 'src': 'images/blank.png', 'alt': 'notification icon' })).append($('<span>').html(message));
      $('#globalNotification').css({ 'top': -(innerCount + 1) * 40 + 'px' }).append($inner).append($('<br/>')).stop().animate({ 'top': '0' }, ps.o.siteDefaults.notificiationAnimationTiming[0]);
      $('#globalNotification .inner a').css('color', ps.o.config['notificationAccentColor']);
      if (time === 0) $('#globalNotification .inner').last().addCloseButton();
      else $('#globalNotification .inner .closeButton').remove();

      //set timeOut for hiding notification
      if (time > 0) {
        clearTimeout(ps.v.notifyTimeout);
        ps.v.notifyTimeout = window.setTimeout(ps.fn.closeNotification, time * 1000);
      }

    },
    orientateLargeImage: function ($image, whetherToFade) {
      $image.css({ 'height': '0px', 'width': '' });
      var $imageDiv = $('#slideshowcontainer>.interior');
      var windowheight = ($(window).height());
      var windowwidth = ($(window).width());
      $image.height(windowheight + 'px');
      $image.fadeTo(30, 0.001, function () {
        var calcwidth = $image.width();
        // fix
        if (calcwidth === 0) calcwidth = (windowheight * (3 / 2));
        //if $image too wide for window, set to window width, then derive image height
        else if (calcwidth > windowwidth) {
          $image.css('width', windowwidth + 'px');
          $image.css('height', '');
          $imageDiv.css({ 'margin-top': (windowheight - $image.height()) / 2, 'width': windowwidth });
          $('.imagetext').width(windowwidth);
        }
        else if (calcwidth < windowwidth) {
          $imageDiv.css('margin-top', '0');
          $imageDiv.css({ 'height': windowheight + 'px', 'width': calcwidth + 'px' });
          $('.imagetext').width(calcwidth);
        }

        if (whetherToFade) $image.fadeTo(400, 1.0);
        else $image.css('opacity', 1.0)

        //finish fading in large image
        $('#slideshowcontainer').fadeIn();
      });
    },
    orientateSlider: function () {
      var windowHeight = $(window).height();
      var cat = ps.fn.urlvars().cat;
      ps.o.siteDefaults.sliderPhotoHeight = windowHeight * 0.75;
      var imageHeight = (ps.o.categoryData[cat].toggleCaption === 'on') ? ps.o.siteDefaults.sliderPhotoHeight : windowHeight - 40;
      var sliderWidth = 0, sliderMargin = 0;

      $bigarrows = $('#slidercontainer .bigarrowright,#slidercontainer .bigarrowleft');
      ps.fn.toggleCaptionDisplay(cat, ps.o.categoryData[cat].toggleCaption);
      if (ps.o.categoryData[cat].toggleCaption === 'off') $bigarrows.addClass('centered');
      else $bigarrows.removeClass('centered');

      $('#slidercontainer').height(windowHeight);
      $('.sliderImg').each(function () {
        $(this).addClass('hidden').height(imageHeight);
        if ($(this).hasClass('first')) sliderMargin = (($(window).width() - $(this).width()) / 2);
        sliderWidth += $(this).width() + 10;
      });
      if (sliderMargin < 0) sliderMargin = 0;
      $('#sliderdiv').width(sliderWidth + (sliderMargin * 2));
      $('.sliderImg').removeClass('hidden');
      ps.fn.advanceSlider($('.sliderImg[data-filename="' + ps.fn.urlvars().pid + '"]'), '', true);
    },
    paneExists: function (panetitle) {
      if (ps.o.photoData.hasOwnProperty(panetitle)) return true;
      else return false;
    },
    paneIsHidden: function (panetitle) {
      if (ps.o.categoryData[panetitle]) {
        if (ps.o.categoryData[panetitle].hidden == '1') return true;
        else return false;
      }
    },
    processCode: function (code) {
      var keywords = code.split('_');
      switch (keywords[0]) {
        case 'hide':
          if (ps.o.photoData.hasOwnProperty(keywords[1])) {
            ps.fn.addURLparam('tohide', keywords[1]);
            $('#' + keywords[1]).remove();
            ps.v.categoriesShown.splice(ps.v.categoriesShown.indexOf(keywords[1]), 1);
            ps.fn.adjustSectionWidth('photos');
            delete ps.o.photoData[keywords[1]];
          }
          else ps.fn.notify('Category doesn\'t exist', 'error');
          return true;
          break;
        case 'add':
          if (keywords[1] && keywords[2]) ps.fn.addURLparam(keywords[1], keywords[2]);
          else ps.fn.notify('Bad parameters', 'error');
          return true;
          break;
        case 'remove':
          if (keywords[1] && keywords[2]) ps.fn.removeURLparam(keywords[1], keywords[2]);
          else if (keywords[1]) ps.fn.removeURLparam(keywords[1]);
          else ps.fn.notify('Bad parameters', 'error');
          return true;
          break;
        case 'reset':
          ps.fn.removeAddedPanes();
          return true;
          break;
        case 'isabelle':
          ps.v.globalSaveFreeForAll = true;
          return true;
          break;
      }
      return false;
    },
    refreshPanes: function () {
      $('.contentpane').remove();
      for (var x in ps.v.categoriesShown) {
        ps.fn.createPane(ps.v.categoriesShown[x]);
        ps.o.categoryData[ps.v.categoriesShown[x]].isFirstLoad = true;
      }
    },
    refreshPhotoConfigData: function (categoryToScroll, callback) {
      var $nocatsplaceholder = $('<span class = "config-placeholder nocats">No categories or images</span>');
      ps.v.multipleImagesToDelete = [];
      $.getJSON('php/launchconfig.php', function (data) {
        ps.fn.loadingStop($('#dialog-config'));
        $('.configcontent').html(data).fadeIn('fast');
        $('.config-placeholder').remove();
        if ($('.categoryContainer').length > 0) {
          $('.categoryHeader h2').toDisplay();
          //set thumbnail size from config[]
          ps.fn.setConfigThumbWidth();
          //to make the photos sortable (animated drag and drop)
          ps.fn.sortableConfigPhotos();
          $('.categoryContainer').each(function (index) {
            if ($(this).find('.onesection').length === 0) $(this).append($('<span class = "config-placeholder left">No images</span>'));
            $(this).find('.date-created').after($('<span class = "photo-count"> / ' + ps.o.photoData[$(this).find('.categoryHeader').attr('data-category')].length + ' Photos</span>'));
          });
          $('#dialog-config .searchContainer').fadeIn().css('margin-left', $('#dialog-config').width() - $('#dialog-config .searchContainer').attr('data-width') - 25);
          $('#configSearch-type').val('category');
          $('#configSearch-operator').val('contains');
          $('#configSearch-searchText').val('').removeAttr('disabled');
        }
        else {
          $('#dialog-config').append($nocatsplaceholder);
        }
        if (typeof callback === 'function') callback();
        if (typeof categoryToScroll === 'string' && categoryToScroll != '') $('#dialog-config').scrollTop($('#' + categoryToScroll + '_container').position().top);
        else $('#dialog-config').scrollTop(0);
      });
    },
    removeAddedPanes: function () {
      for (var index in ps.o.categoryData) {
        if (ps.o.categoryData[index].hidden == "1" && ps.v.categoriesShown.indexOf(index) > -1) {
          ps.v.categoriesShown.splice(ps.v.categoriesShown.indexOf(index), 1);
          $('#' + index).remove();
        }
      }
      ps.o.config['photosWidth'] = ps.v.originalPhotosWidth;
      ps.fn.adjustSectionWidth('photos');
      ps.fn.removeURLparam('addhidden');
      ps.v.photosHash = '#photos';

    },
    removePane: function (cat) {
      $('#' + cat).remove();
      ps.o.categoryData[cat].hidden = '1';
      ps.v.categoriesShown.splice(ps.v.categoriesShown.indexOf(cat), 1);
      ps.fn.adjustSectionWidth('photos');
    },
    removeURLparam: function (param, value) {
      var href = '';
      var urlobj = ps.fn.urlvars();
      if (urlobj.hasOwnProperty(param)) {
        if (param && !value) {
          delete urlobj[param]
        }
        else if (param && value) {
          if (urlobj[param].indexOf(',') > -1) {
            if (urlobj[param].indexOf(value) == 0) urlobj[param] = urlobj[param].replace(value + ',', '');
            else urlobj[param] = urlobj[param].replace(',' + value, '');
          }
          else delete urlobj[param];
        }
        for (var x in urlobj) {
          if (x == 'section') href += '#' + urlobj[x];
          else href += '&' + x + '=' + urlobj[x];
        }
        window.location.href = href;
      }

      return href;
    },
    sendConfig: function (callback) {
      //pass ps.o.config[] to database only. assign values to config as they are set.
      $.getJSON('php/setconfig.php', { 'config': ps.o.config }, function (data) {
        if (typeof callback == 'function') {
          callback();
        }
      });
    },
    sendCategoryData: function (cat) {
      $.getJSON('php/setcategoryvars.php', { 'config': ps.o.categoryData[cat], 'cat': cat });
    },
    sendPhotoData: function (imageIds, whatToSet) {
      //photoData must be set to desired values before calling this function
      var data = [];
      for (var x in imageIds) {
        data[x] = ps.o.photoData[ps.fn.lookupCategory(imageIds[x])][ps.fn.lookupPhoto(imageIds[x])][whatToSet];
      }
      $.ajax({
        type: "POST",
        url: 'php/setPhotoData.php',
        data: { 'images': imageIds, 'toset': whatToSet, 'data': data }
      }).done(function (data) {
      }).fail(function () { alert("error"); return false; });
    },
    setColor: function (colortoset, newcolor, whichSlider, uiValue) {
      var rawColorToSet = colortoset.replace('Color', '');
      var section = $(".colorSettingsSelect option[data-type='" + rawColorToSet + "']").attr('class');

      if (section == 'sliderSpecific' || section == 'slideshowSpecific') {
        ps.o.categoryData[ps.fn.urlvars().cat][colortoset] = newcolor;
      }
      else if (section == 'sectionSpecific'){
        ps.o.config[ps.fn.urlvars().section + colortoset] = newcolor;
      }
      else{
        ps.o.config[colortoset] = newcolor;
      }

      $('.colorSettings div').css('background', newcolor);
      $('#' + whichSlider + ' .ui-slider-handle').text(uiValue);
      ps.fn.colorAdjustAction(rawColorToSet, newcolor);

    },
    setColorSettings: function () {
      var selectedOptionSection = $('.colorSelector').children('option').filter(':selected').attr('class').replace('Specific', '');

      ps.v.colorToSet = $('.colorSelector').children('option').filter(':selected').attr('data-type') + 'Color';

      var thisconfig = ps.o.config;
      var label, thecolor, hue, saturation, lightness, opacity;
      thecolor = thisconfig[ps.v.colorToSet] || thisconfig[ps.fn.urlvars().section + ps.v.colorToSet] || ps.o.categoryData[ps.fn.urlvars().cat][ps.v.colorToSet] || ps.o.siteDefaults[ps.v.colorToSet] || "hsla(50,50%,50%,1)";

      var oldcolor = thecolor;
      var thesettings = [
          thecolor.substring(5, oldcolor.indexOf(',')),
          thecolor.substring(oldcolor.indexOf(',') + 1, oldcolor.indexOf('%')),
          thecolor.substring(oldcolor.indexOf('%') + 2, ps.fn.xIndexOf('%', oldcolor, 2)),
          thecolor.substring(ps.fn.xIndexOf('%', oldcolor, 2) + 2, oldcolor.indexOf(')'))
        ];

      $('.colorSettings').each(function (index) {
        $(this).find('.ui-slider-handle').text(thesettings[index]);
        $(this).children('div').slider('value', thesettings[index]);
        $('.colorSettings div').css('background', thecolor);
      });
    },
    setConfigThumbWidth: function () {
      var $configDialog = $('#dialog-config');
      var padding = parseInt($configDialog.css('padding-left'));
      var dialogWidth = $configDialog.width() - padding * 2;
      var thumbWidth = Math.floor(dialogWidth / ps.o.config['configThumbsPerRow']) - ps.o.siteDefaults.config.thumbnailMargin;
      $('.sortableContainer .onesection').css('width', thumbWidth);
      $('img.sortimage').css('height', thumbWidth * 0.66);
    },
    setPageNumber: function (selector) {
      $(selector).show().text(ps.fn.lookupPhoto(ps.fn.urlvars().pid, ps.fn.urlvars().cat) + 1);
    },
    setPaneWidth: function () {
      var paneWidth = (ps.v.categoriesShown.length > 1) ? ps.o.config['photosWidth'] / ps.v.categoriesShown.length : ps.o.config['photosWidth'] / 2;
      $('.contentpane').css('width', (paneWidth) - 10);
      return (paneWidth - 10);
    },
    setSettings: function (section) {
      var thisconfig = ps.o.config, selector = '';
      var $settings = $('#dialog-settings');

      function setCaptionButton() {
        if (ps.o.categoryData[ps.fn.urlvars().cat].toggleCaption == 'on') $('#toggleCaptions button').text('On');
        else $('#toggleCaptions button').text('Off');
      }

      //hide and disable everything
      $settings.find('.onerow,a.normalizeColors').hide();
      $settings.find('select.colorSelector>option').appendTo('#dialog-settings .colorSelectorInactive');
      //assign selector and place settings icon
      switch (section) {
        case 'photos':
        case '': selector = '.photoSpecific';
          $('img.settings').css({ 'top': '15px', 'left': '15px' }); break;
        case 'slider': selector = '.sliderSpecific';
          $('img.settings').css({ 'top': '85px', 'left': '15px' }); break;
        case 'slideshow': selector = '.slideshowSpecific';
          $('img.settings').css({ 'top': '15px', 'left': '15px' }); break;
        default: selector = '.sectionSpecific';
          $('img.settings').css({ 'top': '15px', 'left': '15px' });
      }
      //set all slider positons and values
      $('#paneSizeSlider .ui-slider-handle').text(thisconfig[section + 'Width'] + 'px');
      $('#paneSizeSlider').slider('value', thisconfig[section + 'Width']);
      $('#paneExpandedSizeSlider .ui-slider-handle').html('&nbsp;');
      $('#paneExpandedSizeSlider').slider('value', thisconfig['paneExpandedWidth'] * 100);

      //show controls
      $('section.generalSettings,' + selector).show();
      //enable section specific colorSelector options
      $settings.find('option.generalSettings,option' + selector).appendTo('select.colorSelector');

      //set selected colorSelector option to the default sectionSpecific option
      var colorLength = ($('select.colorSelector>option').length < 2) ? 2 : $('select.colorSelector>option').length;
      $('select.colorSelector').attr('size', colorLength).val($('option' + selector + '[data-default=default]').attr('value'));

      if (section == 'slider' || section == 'slideshow') setCaptionButton();
      ps.fn.setColorSettings();
    },
    setSliderColors: function () {
      $('#slidercontainer').css('background-color', ps.o.categoryData[ps.fn.urlvars().cat]['sliderBackColor'] || ps.o.siteDefaults['sliderBackColor']);
      $('#slidertext').css('background-color', ps.o.categoryData[ps.fn.urlvars().cat]['sliderCaptionColor'] || ps.o.siteDefaults['sliderCaptionColor']);
      $('#slidertext').css('color', ps.o.categoryData[ps.fn.urlvars().cat]['sliderTextColor'] || ps.o.siteDefaults['sliderTextColor']);
      $('#slidercontainer .bigarrowright').css('border-left-color', ps.o.categoryData[ps.fn.urlvars().cat]['sliderAccentColor'] || ps.o.siteDefaults['sliderAccentColor']);
      $('#slidercontainer .bigarrowleft').css('border-right-color', ps.o.categoryData[ps.fn.urlvars().cat]['sliderAccentColor'] || ps.o.siteDefaults['sliderAccentColor']);
    },
    setSlideshowColors: function () {
      $('#slideshowcontainer').css('background-color', ps.o.categoryData[ps.fn.urlvars().cat]['slideshowBackColor'] || ps.o.siteDefaults['slideshowBackColor']);
      $('#slideshowcontainer>.interior').css('background-color', ps.o.categoryData[ps.fn.urlvars().cat]['slideshowPlaceholderColor'] || ps.o.siteDefaults['slideshowPlaceholderColor']);
      $('#slideshowcontainer .bigarrowright').css('border-left-color', ps.o.categoryData[ps.fn.urlvars().cat]['slideshowAccentColor'] || ps.o.siteDefaults['slideshowAccentColor']);
      $('#slideshowcontainer .bigarrowleft').css('border-right-color', ps.o.categoryData[ps.fn.urlvars().cat]['slideshowAccentColor'] || ps.o.siteDefaults['slideshowAccentColor']);
      $('#slideshowcontainer .imagetext').css('background-color', ps.o.categoryData[ps.fn.urlvars().cat]['slideshowAccentColor'] || ps.o.siteDefaults['slideshowAccentColor']);
    },
    setUniversalThumb: function (filename) {
      var width = $('#maincontainer').width();
      var src = 'php/timthumb.php?a=l&w=' + width + '&src=http://'+ window.location.host +'/photos/' + filename;
      var thumbsArray = {};
      $image = $('#thumbImgHidden').attr({ 'src': src });
      $('.contentpane .thumbcontent').addClass('loading');
      $image.one("load", function () {
        var segmentwidth = $(this).width() / ps.v.categoriesShown.length;
        $('.contentpane .thumbcontent').each(function (index) {
          var backposition = -(segmentwidth * (index)) + 'px 0';
          $(this).css({ 'background-image': 'url(' + src + ')', 'background-position': backposition }).removeClass('loading');
          thumbsArray[$(this).parent().attr('id')] = JSON.stringify({ "image": src, "position": backposition });
        });
        $.ajax({
          type: "POST",
          url: 'php/setthumbs.php',
          data: { 'thumbs': thumbsArray }
        }).done(function (data) {
          ps.fn.closeNotification(), $('#revertThumb').remove();
          ps.fn.notify('Thumbnails updated. <a href=\'#\' id=\'revertThumb\' data-torevert=\'all_visible_panes\' class=\'revertLink\'>Revert to original?</a>', '', 4);
        }).fail(function () { alert("error"); return false; });
      }).each(function () {
        if (this.complete) $(this).load();
      });

    },
    sortableConfigPhotos: function () {
      function makeSortable(section) {
        $("#" + section + ">.onesection").each(function () {
          // clone the original items to make their absolute-positioned counterparts...
          var item = $(this);
          var item_clone = item.clone();
          // 'store' the clone for later use...
          item.data("clone", item_clone);
          // set the initial position of the clone
          var position = item.position();
          item_clone.css("left", position.left);
          item_clone.css("top", position.top);
          // append the clone...
          $("#" + section + "_cloned").append(item_clone);
        });
        // create our sortable as usual...with some event handler extras...
        $("#" + section).sortable({
          // on sorting start, hide the original items... only adjust the visibility, we still need their float positions..!
          start: function (e, ui) {
            // loop through the items, except the one we're currently dragging, and hide them...
            ui.helper.addClass("exclude-me")
            $("#" + section + ">.onesection:not(.exclude-me)")
            .css("visibility", "hidden");
            // get the clone that's under it and hide it...
            ui.helper.data("clone").hide();
          },
          stop: function (e, ui) {
            // get the item we were just dragging, and its clone, and adjust accordingly...
            $("#" + section + ">.onesection.exclude-me").each(function () {
              var item = $(this);
              var clone = item.data("clone");
              var position = item.position();
              // move the clone under the item we've just dropped...
              clone.css("left", position.left);
              clone.css("top", position.top);
              clone.show();
              // remove unnecessary class...
              item.removeClass("exclude-me");
            });
            // make sure all our original items are visible again...
            $("#" + section + ">.onesection").css("visibility", "visible");
            ps.fn.sortPictures();
          },
          // here's where the magic happens...
          change: function (e, ui) {
            // get all invisible items that are also not placeholders and process them when ordering changes...
            $("#" + section + ">.onesection:not(.exclude-me, .ui-sortable-placeholder)").each(function () {
              var item = $(this);
              var clone = item.data("clone");
              // stop current clone animations...
              clone.stop(true, false);
              // get the invisible item, which has snapped to a new location, get its position, and animate the visible clone to it...
              var position = item.position();
              clone.animate({
                left: position.left,
                top: position.top
              }, 400);
            });
          }
        }).disableSelection();
      }
      $('.categoryContainer').each(function (index) {
        if ($(this).find('.sortableContainerCloned').children().length === 0) makeSortable($(this).find('.sortableContainer').attr('id'));
      });
    },
    sortableConfigPhotos_Clone: function (section) {
      $("#" + section + ">.onesection").each(function () {
        var item = $(this);
        var item_clone = item.clone();
        item.data("clone", item_clone);
        var position = item.position();
        item_clone.css("left", position.left);
        item_clone.css("top", position.top);
        $("#" + section + "_cloned").append(item_clone);
      });
    },
    sortableConfigPhotos_toggleOff: function () {
      $('.sortableContainerCloned').hide();
      $('.categoryContainer').each(function (index) {
        $(this).find('.sortableContainer').sortable('disable').enableSelection();
      });
    },
    sortableConfigPhotos_toggleOn: function () {
      $('.categoryContainer').each(function (index) {
        $(this).find('.sortableContainer').sortable('enable').disableSelection();
      });
      $('.sortableContainerCloned').show();
    },
    sortCategories: function () {
      var positions = {};
      $('.categoryHeader').each(function (index) {
        positions[$(this).attr('data-catid')] = index;
      });
      $.ajax({
        type: "POST",
        url: 'php/catSort.php',
        data: { 'sort': positions }
      }).done(function (data) {
      }).fail(function () { alert("error"); return false; });
    },
    sortPictures: function () {
      var sortArray = {};
      $('.sortableContainer .onesection').each(function (index) {
        sortArray[$(this).find('.sortimage').attr('data-imgid')] = index;
      });
      $.ajax({
        type: "POST",
        url: 'php/performsort.php',
        data: { 'sort': sortArray }
      }).done(function (data) {
      }).fail(function () { alert("error"); return false; });
    },
    stringToDecimal: function (value) {
      if (value.indexOf('.') === -1) {
        var arr = value.split('/');
        if (arr.length === 1) return !isNaN(parseInt(value)) && parseInt(value);
        if (arr.length === 2) return (!isNaN(parseInt(arr[0])) && !isNaN(parseInt(arr[1]))) && parseInt(arr[0]) / parseInt(arr[1]);
        else return false;
      }
      else return parseFloat(value) || false;
    },
    switchPhotoDisplay: function () {
      if (ps.fn.urlvars().cat != '' && (ps.fn.inUrl('slideshow') || ps.fn.inUrl('slider'))) {
        window.location.hash = ($('#slidercontainer').isShown()) ?
        "slideshow&pid=" + ps.fn.urlvars().pid + "&cat=" + ps.fn.urlvars().cat :
        "slider&cat=" + ps.fn.urlvars().cat + '&pid=' + ps.fn.urlvars().pid;
      }
    },
    toDisplay: function (old) {
      var a = old.split(/[\s_]+/);
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
      return a.join(' ');
    },
    toggleCaptionDisplay: function (cat, toggle) {
      ps.o.categoryData[cat].toggleCaption = toggle;
      $('#toggleCaptions').find('button').text(ps.fn.toDisplay(toggle));
    },
    toggleConfigThumbnailAction: function (which, $element) {

      //disassociate event handlers
      $(document).off('mousedown', '.sortableContainer .sortimage', ps.events.sortimageThumbnailAction);
      $(document).off('mousedown', '.sortableContainer .sortimage', ps.events.sortimageEditCaptionAction);
      $(document).off('mousedown', '.sortableContainer .sortimage', ps.events.sortimageBackgroundAction);
      $(document).off('mousedown', '.sortableContainer .sortimage', ps.events.sortimageTransferAction);
      $(document).off('mousedown', '.sortableContainer .sortimage', ps.events.sortimageSelectAction);

      var currentlyActivated = false, categoryText = null, $sortimage = $('.sortableContainer .onesection img.sortimage');
      if ($element) {
        currentlyActivated = $element.hasClass('activated');
        categoryText = '<i>' + $element.parent().siblings('h2').text() + '</i>';
      }

      ps.fn.sortableConfigPhotos_toggleOn();
      ps.fn.closeNotification();
      $sortimage.css('cursor', 'pointer');
      ps.fn.clearSelected();

      if (!currentlyActivated)
        switch (which) {
        case 'thumbnail':
          $(document).on('mousedown', '.sortableContainer .sortimage', ps.events.sortimageThumbnailAction);
          ps.fn.notify('Click an image to assign its category a new thumbnail ', '', 0, null);
          $sortimage.css('cursor', 'crosshair');
          break;
        case 'universalthumbnail':
          $(document).on('mousedown', '.sortableContainer .sortimage', ps.events.sortimageThumbnailAction);
          ps.fn.notify('Click an image to increment it across thumbnails of all currently displayed panes.', '', 0, null, 'replace');
          break;
        case 'captions':
          $(document).on('mousedown', '.sortableContainer .sortimage', ps.events.sortimageEditCaptionAction);
          ps.fn.notify('Click an image to edit its caption', '', 0, null);
          break;
        case 'background':
          $(document).on('mousedown', '.sortableContainer .sortimage', ps.events.sortimageBackgroundAction);
          ps.fn.notify('Click an image to set the site background', '', 0, null);
          break;
        case 'transfer':
        case 'copy':
          $(document).on('mousedown', '.sortableContainer .sortimage', ps.events.sortimageJustSelectAction);
          ps.fn.notify('Select images to ' + which + ' to ' + categoryText + ', then <a href = "#" id = "' + which + 'Photos" data-' + which + 'to = "' + $element.parent().parent().attr('data-category') + '">click here to ' + which + '</a>', '', 0, null);
          break;
        case 'select':
          $(document).on('mousedown', '.sortableContainer .sortimage', ps.events.sortimageSelectAction);
          ps.fn.sortableConfigPhotos_toggleOff();
          ps.fn.notify('Click an image to select it, then choose the desired action', '', 0, null);
          break;
      }

      //reset button highlighting
      $("span.ui-button-text:contains('Edit Captions')").removeClass('activated');
      $("span.ui-button-text:contains('Select')").removeClass('activated');
      $("span.ui-button-text:contains('Set Background')").removeClass('activated');
      $("span.ui-button-text:contains('Set Thumb')").removeClass('activated');
      $('.categoryOptions>.togglethumbnailassign').removeClass('activated');
      $('.categoryOptions>.transfer').removeClass('activated');
      $('.categoryOptions>.copy').removeClass('activated');

      if (!currentlyActivated && $element) $element.addClass('activated');

    },
    toUnderscores: function (old) {
      var a = old.split(' ');
      for (var x = 0; x < a.length; x++) a[x] = a[x].charAt(0).toLowerCase() + a[x].substring(1);
      return a.join('_');
    },
    transferPhotos: function (transferto) {
      var images = ps.fn.getSelectedConfigImages();
      $.ajax({
        type: "POST",
        url: 'php/transferPhotos.php',
        data: { 'category': transferto, 'images': images }
      }).done(function (data) {
        for (var x in images) {
          var fromcategory = ps.fn.lookupCategory(images[x]);
          var photoIndex = ps.fn.lookupPhoto(images[x], fromcategory);
          ps.o.photoData[transferto].push(ps.o.photoData[fromcategory][photoIndex]);
          ps.o.photoData[fromcategory].splice(photoIndex, 1);
        }
        ps.fn.toggleConfigThumbnailAction('disable');
        ps.fn.notify('Images transferred successfully');
        ps.fn.refreshPhotoConfigData(transferto);
        ps.fn.refreshPanes();
      }).fail(function () { alert("error"); return false; });

    },
    updateImageText: function () {
      var caption = ps.o.picsCaptions[ps.fn.urlvars().pid];
      var comments = ps.o.picsComments[ps.fn.urlvars().pid];
      var displaycaption = '';
      if (caption != '') {
        if (ps.v.isLoggedIn) displaycaption = '<span>' + caption + '</span><a class = "editcaption" href = "#">edit</a>';
        else displaycaption = '<span>' + caption + '</span>';
      }
      else {
        if (ps.v.isLoggedIn) displaycaption = '<a href = "#" class = "editcaption">Add a caption</a>';
        else displaycaption = 'No caption for this image';
      }
      $('.imagecaption').html(displaycaption);
      $('section.imagecomments').html('');
      for (var x in comments) {
        if (comments[x]) {
          var attr = { 'href': '#', 'data-commentid': comments[x].commentid };
          var $commentrow = $('<div>').addClass('commentrow').html('<hr/><span class = \"comment\">' + comments[x].comment + '</span><span class = \"name\">' + comments[x].name + '</span>');
          if (comments[x].sessionid == ps.fn.getCookie('sessionid'))
            $commentrow.append($('<a>').attr(attr).addClass('editComment').text('edit'))
          .append($('<a>').attr(attr).addClass('deleteComment').text('delete'));
          else if (ps.v.isLoggedIn)
            $commentrow.append($('<a>').attr(attr).addClass('deleteComment').text('delete'));
          $('section.imagecomments').append($commentrow);
        }
      }

    },
    urlvars: function (param, value) {
      if (param && value) {
        var firsturlarray = window.location.href.split('#'), urlobj = {}, key;
        if (firsturlarray[1]) {
          var urlarray = firsturlarray[1].split('&');
          for (var x in urlarray) {
            key = urlarray[x].substring(0, urlarray[x].indexOf('='));
            if (key == param) {
              urlobj[key] = urlobj[key] += ',' + value;
            }

          }
        }
      }
      else {
        var firsturlarray = window.location.href.split('#'), urlobj = {};
        if (firsturlarray[1]) {
          var urlarray = firsturlarray[1].split('&');
          for (var x in urlarray) {
            var key = urlarray[x].substring(0, urlarray[x].indexOf('='));
            if (key == '') key = 'section';
            urlobj[key] = urlarray[x].substring(urlarray[x].indexOf('=') + 1);
          }
        }
        else urlobj = { 'section': 'photos' };
        return urlobj;
      }
    },
    validateString: function (stringToValidate, criteria, maxlength) {
      var regex;
      if (stringToValidate.length < 2) return false;
      switch (criteria) {
        case 1: regex = /^[a-zA-Z]*$/; break;
        case 2: regex = /^[a-zA-Z0-9]*$/; break;
        default: regex = /^[a-zA-Z0-9 ]*$/;
      }
      if (maxlength && regex.test(stringToValidate) && stringToValidate.length <= maxlength) return true;
      else if (!maxlength && regex.test(stringToValidate)) return true;
      else return false;
    },
    validateForm: function ($dialog) {
      var reason = '';
      var isFormValid = true;
      $('#globalNotification').find('.inner, br').remove();
      $dialog.find('textarea,input').each(function () {
        var skipOtherValidation = false;
        var validationmessage = $(this).attr('data-validationmessage');
        var tovalidate = $(this).val();
        var id = $(this).attr('id');
        var isFieldValid = true;
        var labeltext = $(this).siblings('label[for="' + id + '"]').text();
        if (typeof validationmessage !== 'undefined' && validationmessage !== false) {
          //if only checking for required
          if ($(this).attr('data-required') === 'required' && tovalidate.trim().length === 0) {
            ps.fn.notify('The <i>' + labeltext + '</i> field is required', 'error', 0, null, 'stack');
            $(this).addClass('invalid').after($('<img>').attr('src', 'images/blank.png').addClass('alerticon validationicon'));
            isFormValid = false;
            isFieldValid = false;
            skipOtherValidation = true;
          }
          if (validationmessage != '' && !skipOtherValidation) {
            var regex = new RegExp($(this).attr('data-validationregex'), "i");
            var message = validationmessage.replace('<fieldname>', '<i>' + labeltext + '</i>');
            var reason = regex.test(tovalidate) || $(this);
            if (reason !== true) {
              ps.fn.notify(message, 'error', 0, null, 'stack');
              $(this).addClass('invalid').after($('<img>').attr('src', 'images/blank.png').addClass('alerticon validationicon'));
              isFormValid = false;
              isFieldValid = false;
            }
          }
          if (isFieldValid === true) ps.fn.clearFieldError($(this));
        }
      });
      if (isFormValid) ps.fn.closeNotification();
      return isFormValid;
    },
    validateStringAgainst: function (stringToValidate, notToMatch) {
      for (var x in notToMatch) {
        if (stringToValidate == notToMatch[x]) return false;
      }
      return true;
    },
    xIndexOf: function (Val, Str, x) {
      if (x <= (Str.split(Val).length - 1)) {
        Ot = Str.indexOf(Val);
        if (x > 1) { for (var i = 1; i < x; i++) { var Ot = Str.indexOf(Val, Ot + 1) } }
        return Ot;
      } else { alert(Val + " Occurs less than " + x + " times"); return 0 }
    },
    zoomImage: {
      'zoomIn': function (event) {
        var thisZoom = ps.o.zoomData, image = $('#largesingleimage');
        var imageScreen = $('#imgscreen'), imageHeight = image.height(), imageWidth = image.width();

        //calculate multipliers
        var imageSize = (imageWidth * imageHeight) / 1000000;
        if (imageSize >= 0.8) {
          ps.o.zoomData.zoomMult = 2;
          ps.o.zoomData.scrollMult = 1;
        }
        else if (imageSize < 0.8) {
          ps.o.zoomData.zoomMult = 3;
          ps.o.zoomData.scrollMult = 2;
        }
        //determine origin
        if (thisZoom.fromButton) {
          //zoom to 50/50 of image
          ps.o.zoomData.x = (imageWidth / 2) * ps.o.zoomData.scrollMult;
          ps.o.zoomData.y = (imageHeight / 2) * ps.o.zoomData.scrollMult;
          thisZoom.fromButton = false;
        }
        else {
          //get position of mouse
          var posX = $('#imgscreen').offset().left, posY = $('#imgscreen').offset().top;
          ps.o.zoomData.x = (event.pageX - posX) * ps.o.zoomData.scrollMult;
          ps.o.zoomData.y = (event.pageY - posY) * ps.o.zoomData.scrollMult;
        }
        $('#imgscreen').css('z-index', '0');
        $('.requestbutton, .captionbutton, .closebutton, .bigarrows, .bigarrowright, .bigarrowleft, .imagetext, .largepagenum, .zoombutton, .switchphotodisplay, img.settings').hide();
        $('#zoomBack').fadeIn();
        $('#tipBlock').text('Click and drag to move the image. Double-click or click the zoom icon to exit').fadeIn().delay(5000).fadeOut();

        image.stop().animate({
          'width': (imageWidth * thisZoom.zoomMult),
          'height': (imageHeight * thisZoom.zoomMult),
          'left': '-=' + thisZoom.x + 'px',
          'top': '-=' + thisZoom.y + 'px'
        }, 200);

        imageScreen.hide();
        thisZoom.isZoomed = true;
        ps.o.zoomData = thisZoom;
      },
      'zoomOut': function () {

        var thisZoom = ps.o.zoomData, image = $('#largesingleimage');
        var imageScreen = $('#imgscreen'), imageHeight = image.height(), imageWidth = image.width();

        $('#imgscreen').css('z-index', '550');
        $('.requestbutton, .captionbutton, .closebutton, .bigarrows, .bigarrowright, .bigarrowleft, .imagetext, .largepagenum, .zoombutton, .switchphotodisplay, img.settings').delay(200).fadeIn();
        $('#zoomBack').fadeOut();
        $('#tipBlock').stop().fadeOut(function () { $('#tipBlock').text(''); });

        image.stop().animate({
          'width': (imageWidth / thisZoom.zoomMult),
          'height': (imageHeight / thisZoom.zoomMult),
          'left': '0',
          'top': '0'
        }, 200);

        imageScreen.show();
        thisZoom.isZoomed = false;
        ps.o.zoomData = thisZoom
      },
      'decide': function (data) {
        //used for mousewheel zooming
        var thisZoom = ps.o.zoomData;
        if (!data) {
          if (ps.o.zoomData.isZoomed) ps.fn.zoomImage.zoomIn;
          else ps.fn.zoomImage.zoomOut;
        }
        else {
          var event = data.event;
          var delta = data.delta;
          //zoom in
          if ((delta > 0) && !ps.o.zoomData.isZoomed) ps.fn.zoomImage.zoomIn(event);
          //zoom out
          else if ((delta < 0) && ps.o.zoomData.isZoomed) ps.fn.zoomImage.zoomOut();
        }
      }
    }

  },
  dialogs: {},
  events: {} //end functions

}; //end global object


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////  ONREADY  //////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {

  var hash = window.location.hash;

  //addHidden hash stuff
  if (ps.fn.inUrl('addhidden')) {
    ps.v.panesAddedByURL = ps.fn.urlvars().addhidden.split(',');
    ps.v.photosHash += '&addhidden=' + ps.fn.urlvars().addhidden;
    $('#photos').attr('href', ps.v.photosHash);
  }
  if (ps.fn.inUrl('tohide')) {
    ps.v.panesHiddenByURL = ps.fn.urlvars().tohide.split(',');
    ps.v.photosHash += '&tohide=' + ps.fn.urlvars().tohide;
    $('#photos').attr('href', ps.v.photosHash);
  }

  $.getJSON('php/getdata.php', function (data) {
    ps.fn.assignConfigDataToPage(data.configdata);
    ps.o.categoryData = data.photodata;
    for (var category in data.photodata) {
      if(data.photodata[category]['photos'][0]['id'] != null) ps.o.photoData[category] = data.photodata[category]['photos'];
      else ps.o.photoData[category] = [];

      for (var prop in data.photodata[category]) {
        if (data.photodata[category][prop] == "") ps.o.categoryData[category][prop] = ps.o.siteDefaults[prop] || "";
      }
      if (ps.v.panesHiddenByURL.indexOf(category) == -1 && data.photodata[category].hidden == '0' || ps.v.panesAddedByURL.indexOf(category) > -1) ps.v.categoriesShown.push(category);
      ps.o.categoryData[category].isFirstLoad = true;
      ps.o.categoryData[category].pagePosition = 0;
      ps.o.categoryData[category].resetPane = false;
      delete ps.o.categoryData[category].photos;
    }

    for (var x in ps.o.photoData) {
      for (var y in ps.o.photoData[x]) {
        ps.o.picsCaptions[ps.o.photoData[x][y].filename] = ps.o.photoData[x][y].caption;
        ps.o.picsComments[ps.o.photoData[x][y].filename] = ps.o.photoData[x][y].comments;
      }
    }
    $('body').trigger('click');
    $(window).trigger('hashchange');
  });

  /*
  //check for logged in, display settings button if so
  $.getJSON('php/check.php', function (data) {
    if (data == 'cleared') ps.fn.completeLogin('pageload');
    //check for localStorage "autoLogin" and attempt login if present
    else if (localStorage.autologin == 'true') {
      $.ajax({
        type: "POST",
        url: "php/login.php",
        data: { 'user': localStorage.username, 'pass': localStorage.password }
      }).done(function (data) {
        var result = $.parseJSON(data);
        if (result == "cleared") ps.fn.completeLogin();
        else ps.fn.notify(result, 'error');
      });
    }
  });
  */

  //for demo purposes, autologin every time
  $.ajax({
    type: "POST",
    url: "php/login.php",
    data: { 'user': 'demouser', 'pass': 'demopass' }
  }).done(function (data) {
    var result = $.parseJSON(data);
    if (result == "cleared") ps.fn.completeLogin();
    else ps.fn.notify(result, 'error');
  });

  //bind form validation to form elements
  for (var x in ps.o.validationData)
    $(ps.o.validationData[x][0]).attr({ 'data-validationregex': ps.o.validationData[x][1], 'data-validationmessage': ps.o.validationData[x][2], 'data-required': ps.o.validationData[x][3] });
});

$(window).load(function(){
  ps.fn.displayHint('body', 'center modal', 0, false);

  $(document).off('mouseenter', '.contentpane', ps.events.contentPaneMouseover);
  $(document).off('mouseleave', '.contentpane', ps.events.contentPaneMouseleave);
  $(document).off('click', '.contentpane', ps.events.contentPaneClick);

});

$(window).bind('hashchange', function () {

  var hash = window.location.hash;
  var urlvars = ps.fn.urlvars();
  if (!urlvars.section) urlvars.section = "photos";
  if (urlvars.section != 'slider') ps.v.sliderFreshLoad = true;
  if (urlvars.section != 'rbutton') ps.fn.setSettings(urlvars.section);
  if (!ps.v.isFirstLoad){
    ps.fn.closeNotification();
    ps.fn.hideHint();
  }
  switch (urlvars.section) {

    case 'about':
    case 'contact':
    case 'request':
    case 'creations':

      var finishSwitch = function () {
        ps.fn.adjustSectionWidth(urlvars.section, function () {
          $('#' + urlvars.section + 'pane').fadeIn('fast');
        });
        $('input[type="button"]').css('background-color', ps.o.config[urlvars.section + 'AccentColor']);
      };
      $('.panecontainer').css('width', '100%');
      $('.infopane h3').text(urlvars.section).toDisplay();
      $('.infopane').fadeIn('fast');
      var bigpanes = 0, $whichPane = {};
      $('.bigpane').each(function () {
        if ($(this).css('display') == 'block') {
          bigpanes++;
          $whichPane = $(this);
        }
      });
      if (bigpanes == 0) $('.contentpane').fadeOut('fast').promise().done(finishSwitch);
      else $whichPane.fadeOut('fast').promise().done(finishSwitch);

      $('.infopane').css('background-color', ps.o.config[urlvars.section + 'AccentColor']);
      if (ps.v.isFirstLoad) ps.fn.init(true);

      $('.panecontainer').removeClass('nopanes').find('.emptyPaneMessage').hide();

      //pane specific behavior
      switch (urlvars.section) {
        case 'about':
          $('.icon').each(function (index) { $(this).delay(600 + (index * 100)).fadeIn('slow'); });
          break;
        case 'request':
          ps.fn.clearForm($('#requestpane'));
          break;
        case 'contact':
          ps.fn.clearForm($('#contactpane'));
          break;
      }
      break;

    case 'slider':
      if (!ps.v.sliderFreshLoad) {
        ps.fn.setPageNumber('#slidercontainer .largepagenum');
        break;
      }
      var sliderWidth = 0, sliderMargin = 0, numpics = 0;
      var currentPane = urlvars.cat;

      ps.v.desiredSliderImageLoaded = false;

      //cancelAnimationFrame(ps.v.sliderAnimation);
      //ps.v.sliderAnimationRate = 0;

      $('#slidertext').hide();
      $('#slideshowcontainer').fadeOut();
      $('img.settings').css('top', '85px');

      $bigarrows = $('#slidercontainer .bigarrowright,#slidercontainer .bigarrowleft');
      ps.fn.toggleCaptionDisplay(urlvars.cat, ps.o.categoryData[urlvars.cat].toggleCaption);
      if (ps.o.categoryData[urlvars.cat].toggleCaption != 'on') $bigarrows.addClass('centered');
      else $bigarrows.removeClass('centered');

      function afterDataLoad() {
        if (!urlvars.pid) {
          window.location.href = '#slider&cat=' + currentPane + '&pid=' + ps.o.photoData[currentPane][0].filename;
          return;
        }
        //populate array with previous images and current image
        ps.v.sliderImgsNotYetLoaded = [];
        for (var x in ps.o.photoData[currentPane]) {
          ps.v.sliderImgsNotYetLoaded.push(ps.o.photoData[currentPane][x].filename);
          if (ps.o.photoData[currentPane][x].filename == urlvars.pid) break;
        }
        $('#maincontainer').fadeOut('fast', function () {
          $('body').css('padding', '0');
          $('#bodyScreen').hide();
          ps.fn.setPageNumber('#slidercontainer .largepagenum');
          ps.fn.setSliderColors();
          $('#slidercontainer').show();
          //if same slider category was loaded most recently, just display it
          if (ps.v.sliderCategoryLastLoaded == urlvars.cat) {
            ps.fn.orientateSlider();
            return
          }
          $('#sliderdiv').html('');
          $('#slidercontainer').height($(window).height()).loadingStart(80);
          numpics = ps.o.photoData[currentPane].length;
          var imageHeight = (ps.o.categoryData[ps.fn.urlvars().cat].toggleCaption == 'on') ? ps.o.siteDefaults.sliderPhotoHeight : $(window).height() - 40;

          for (var x = 0; x < numpics; x++) {
            var imgclass = (x == (numpics - 1)) ? 'sliderImg last' : 'sliderImg';
            if (x == 0) imgclass = 'sliderImg first';
            $('#sliderdiv').append($('<img>')
              .addClass(imgclass)
              .attr({ 'src': 'photos/' + ps.o.photoData[currentPane][x].filename, 'data-filename': ps.o.photoData[currentPane][x].filename })
              .css('height', imageHeight)
              .load(function () {
                if (urlvars.section === 'slider') {
                  afterImgLoad(this);
                }
              }).one(function () {
                if (this.complete) $(this).load();
              }));
          }
        });
      }

      function afterImgLoad(img) {

        function displayAndScroll() {
          $('#slidercontainer').loadingStop();
          $('.sliderImg.loaded').fadeTo(1, 1.0);
          ps.v.desiredSliderImageLoaded = true;
          ps.fn.advanceSlider($('.sliderImg[data-filename="' + urlvars.pid + '"]'), '', false);
          ps.v.sliderCategoryLastLoaded = urlvars.cat;
        }

        var $image = $(img);
        var filename = $image.attr('data-filename');
        var index = ps.v.sliderImgsNotYetLoaded.indexOf(filename);
        $image.addClass('loaded');

        if (index > -1) ps.v.sliderImgsNotYetLoaded.splice(index, 1);

        //slider margin
        if ($image.hasClass('first')) {
          sliderMargin = (($(window).width() - $image.width()) / 2);
          $image.css('margin-left', sliderMargin);
        }
        sliderWidth += $image.width() + 10;
        if (sliderMargin < 0) sliderMargin = 0;
        $('#sliderdiv').css('width', sliderWidth + (sliderMargin * 2) + 'px');

        if (!ps.v.desiredSliderImageLoaded) {
          if (ps.v.sliderImgsNotYetLoaded.length == 0) { displayAndScroll(); /*console.log('all desired images loaded, displaying and scrolling: ' + $image.attr('data-filename'));*/ }
          else { $image.fadeTo(1, 0.001); /*console.log('image ' + $image.attr('data-filename') + ' loaded. waiting on other desired images');*/ }
        }
        else { $image.fadeTo(600, 1); /*console.log('all desired images loaded, displaying this one immediately: ' + $image.attr('data-filename'));*/ }
      }

      afterDataLoad();
      if (ps.v.isFirstLoad) ps.fn.init(false);
      ps.v.sliderFreshLoad = false;
      ps.v.lastPhotoShown = urlvars.pid;
      break;

    case 'slideshow':
      var currentPic = urlvars.pid;
      var photoData = ps.o.photoData;
      var currentPane = urlvars.cat;
      ps.fn.setSlideshowColors();
      ps.fn.setPageNumber('#slideshowcontainer>.largepagenum');

      //check if image is a member of a saveable category
      var isSaveable = (ps.o.categoryData[currentPane].saveable == 1);
      if (ps.v.globalSaveFreeForAll) isSaveable = true;

      $('.requestbutton').toggleClass('savebutton', isSaveable);

      //preloads all images into browser cache
      $(photoData[currentPane]).each(function () {
        var image = $('<img />').attr('src', 'photos/' + this.filename);
      });

      if (photoData[currentPane].length == 1) $('.bigarrows').hide();
      if (!photoData[currentPane][ps.fn.lookupPhoto(currentPic, currentPane)]) {
        //future 'picture not found' here
        ps.fn.log('picture not found');
      }

      $('#slidercontainer').fadeOut('slow');
      $('body').css('overflow-x', 'hidden');
      $('#slideshowcontainer').fadeIn('fast').loadingStart(80);

      $('#maincontainer').fadeOut('fast', function () {
        $('body').css('padding', '0');
        $('#bodyScreen').hide();
        $('#largesingleimage').removeAttr('src');
        $('#largesingleimage').attr({ 'src': 'photos/' + currentPic, 'data-filename': currentPic
        }).one('load', function () {
          if (urlvars.section === 'slideshow') {
            $('#slideshowcontainer').loadingStop();
            ps.fn.orientateLargeImage($(this), ps.v.lastHash != 'slider');
            ps.fn.displayHint('#slideshowcontainer .switchphotodisplay', 'left', 0, true);
            ps.fn.updateImageText();
          }
        }).each(function () {
          if (this.complete) $(this).load();
        });
      });
      var commentsOn = ps.o.categoryData[currentPane].commentsEnabled === '1';
      var captionsOn = ps.o.categoryData[currentPane].toggleCaption === 'on';
      var isCaption = photoData[currentPane][ps.fn.lookupPhoto(currentPic, currentPane)].caption != "";

      if (commentsOn) $('#addcomment,.imagecomments').show();
      else $('#addcomment,.imagecomments').hide();

      if (ps.v.isLoggedIn) {
        if (captionsOn) $('.imagetext').addClass("showText");
        else $('.imagetext').removeClass("showText");
      }
      else {
        if (captionsOn && isCaption) $('.imagetext').addClass("showText");
        else if (!commentsOn) $('.imagetext').removeClass("showText");
      }

      if (ps.v.isFirstLoad) ps.fn.init(false);

      ps.v.lastPhotoShown = urlvars.pid;
      break;

    case 'rbutton':

      if (ps.v.isFirstLoad) window.location.hash = "";
      ps.v.prolongFirstLoad = true;
      ps.fn.clearForm($('#requestpane'));

      if ($('#slideshowcontainer').css('display') == 'block') {

        $('#request_requestedphoto').val(ps.v.lastPhotoShown);

        $('#slideshowcontainer').fadeOut('fast', function () {
          ps.fn.killSlideshowView();
          $('#bodyScreen').show();
          $('.infopane').css('background-color', ps.o.config['request' + 'AccentColor']);
          $('.infopane h3').text('Request');
          $('.infopane').fadeIn('fast');
          $('.bigpane').fadeOut('fast');
          $('#requestpane').fadeIn('fast', function () { $('#request_email').focus() });
          $('input[type="button"]').css('background-color', ps.o.config['requestAccentColor']);
        });
      }
      break;

    default: //photos
      if (ps.v.isFirstLoad) ps.fn.init(false);

      if (ps.v.lastHash == '#photos') break;

      if (ps.v.categoriesShown.length == 0) {
        $('.panecontainer').addClass('nopanes').find('.emptyPaneMessage').show();
      }

      var finishRestore = function () {
        $('#bodyScreen').show();
        $('.imagecaption').toggleClass("showCaption", false);
        $('.largepagenum').hide();
        $('#largesingleimage').hide().attr('src', '');
        $('.paneexpanded').hide();
        $('#slidercontainer').hide();
        //re-add body padding
        $('body').css('padding-top', '4%');
        $('#maincontainer').fadeIn(function () { ps.fn.assignDimensions() });
      };

      var finishSwitch = function () {
        if (ps.fn.inUrl('addhidden') && !ps.v.photosWidthExpanded) ps.v.photosWidthExpanded = true;

        ps.fn.adjustSectionWidth(urlvars.section, function () {
          $('.contentpane').fadeIn('fast', function () { $('.panecontainer').css('width', ps.v.distanceToEdge); });
        });
      };

      if ($('#slideshowcontainer').isShown()) {
        $('#slideshowcontainer').fadeOut('fast', function () {
          finishRestore();
        });
      }
      else if ($('#slidercontainer').isShown()) {
        $('#slidercontainer').fadeOut('fast', function () {
          finishRestore();
        });
      }
      var bigpanes = 0, $whichPane = {};
      $('.bigpane').each(function () {
        if ($(this).css('display') == 'block') {
          bigpanes++;
          $whichPane = $(this);
        }
      });
      if (bigpanes == 0) finishSwitch();
      else $whichPane.fadeOut('fast').promise().done(finishSwitch);

      $('.infopane').fadeOut('fast');
      ps.v.prolongFirstLoad = false;
  }
  if (!ps.v.prolongFirstLoad) ps.v.isFirstLoad = false;
  ps.v.lastHash = urlvars.section;
});

