$(document).on('a', 'click', function (e) {
  if (!$(this).hasClass('imagedownload')) {
    window.location.hash = $(this).attr('href');
    e.preventDefault();
  }
});

ps.events.contentPaneMouseover = function (e) {
  if (ps.o.categoryData[this.id].defaultView == 'slider') {
    ps.fn.notify('Click to open the Slider view', '', 0);
  } else {
    var thispanenum = 0, thisPane = this.id, $myPane = $(this), currentpanenum = $(this).index(), currentPane = this.id;
    var paneExpandedWidth = ps.o.config['paneExpandedWidth'] * $myPane.height();

    $(this).addClass('expanded').animate({ 'width': paneExpandedWidth, 'background-color': ps.o.config['paneExpandedColor'] }, 100);

    //hide all expanded panes (in case of erroneously displaying)
    $('.paneexpanded').hide();

    //assign margin top
    ps.v.minipaneMarginTop = ((($('.paneexpanded').height() * 0.02) / paneExpandedWidth) * 100);
    $('.minipane').css('margin-top', ps.v.minipaneMarginTop + '%');
    //if there are pics in the category
    if (ps.o.photoData[thisPane].length > 0) {
      //fadeout thumbcontent
      $('#' + thisPane + ' .thumbcontent').fadeOut('fast', function () {
        //show arrows?
        if ((ps.o.photoData[thisPane].length > 6)) $('#' + thisPane + ' .pagearrows').fadeIn('slow');
        //create inside panes if they haven't been created
        if (ps.o.categoryData[thisPane].isFirstLoad) {
          $myPane.find('.minipane').each(function (i) {
            if (!$(this).hasClass('fake')) {
              var src = 'photothumbs/' + $(this).attr('data-path');
              var $image = $("<img>").attr('src', src);
              var $miniPane = $(this);
              $miniPane.stop(true, true);
              $miniPane.loadingStart();
              $image.one("load", function () {
                $miniPane.loadingStop().css({ 'backgroundImage': 'url(' + src + ')', 'background-size': 'cover', 'background-position': '0 0' });
              }).each(function () {
                if (this.complete) $(this).load();
              });
            }
          });
          //fade in the sub-pane
          $('#' + thisPane + ' .paneexpanded').fadeIn('fast');
          ps.o.categoryData[thisPane].isFirstLoad = false;
        }
        else $('#' + thisPane + ' .paneexpanded').fadeIn(100);
      });
    }
    //no pics in category
    else {
      $('#' + thisPane + ' .thumbcontent').fadeOut('fast', function () {
        $myPane.prepend($('<p></p>').addClass('emptyPaneMessage').hide().html('<h4>Nothing here yet</h4><span class = "openSubmitLink">Click here</span> to upload some photos.').fadeIn('fast'));
      });
    }
  }
  $('.paneAddedNotifier').remove();
  //set status text
  $('#status').stop().hide().text(this.id).toDisplay().fadeIn('fast');

};

ps.events.contentPaneMouseleave = function (e) {
  var thisPane = this.id;
  var currentpanenum = $(this).index();

  if (ps.o.categoryData[this.id].defaultView == 'slider') {
    ps.fn.closeNotification();
  }
  else {
    $(this).removeClass('expanded').animate({ 'width': ps.fn.setPaneWidth(), 'background-color': 'rgba(0,0,0,0)' }, 100);
    $(this).find('.minipane');
    //stop and fadeout mid-animations
    $('#' + thisPane + ' .thumbcontent').stop();
    $('.pagearrows').hide();

    //fadeout sub-panes, fade in thumb content
    $('#' + thisPane + ' .paneexpanded').hide();
    $('#' + thisPane + ' .thumbcontent').hide();
    $('#' + thisPane + ' .thumbcontent').fadeIn('fast', function () {
      //insure that sub-panes are definitely hidden
      $('#' + thisPane + ' .paneexpanded').hide();
      $('.pagearrows').hide();
    });
    if (!ps.o.photoData[thisPane]) $('#' + thisPane + ' p.emptyPaneMessage').stop().hide();
  }
  //fadeout status text
  $('#status').fadeOut('slow', function () {
    $('#status').stop().text('Demo').fadeIn();
  });

  $(this).find('.emptyPaneMessage').remove();
};

ps.events.contentPaneClick = function (e) {
  if (!$(this).hasClass('expanded')) {
    $(this).trigger('mouseenter');
    $(this).siblings().trigger('mouseleave');
  }
  return false;
};

$(document).on('mousewheel', '.contentpane', function (event, delta) {
   var $pane = $(this);
   function doit(){
    $pane.find('.paneexpanded').stop().animate({ 'scrollTop': '+=' + ( ps.o.siteDefaults.panePageScrollIncrement * -delta) }, 300, ps.o.siteDefaults.panePageAnimationMethod);
   }
   if (delta == -1){
    if($pane.find('.minipane:not(.fake)').last().position().top > $(this).height() - ps.o.siteDefaults.panePageScrollIncrement - 20) doit();
   }
   else if(delta == 1) doit();

});

/*
 *  Content pane events are toggled on and off using ps.fn.toggleContentPaneMouseoverAbility()
 */

$(document).on('click', '.thumbcontent', function () {
  var parentid = $(this).parent().attr('id');
  window.location.hash = 'slider&pid=' + ps.o.photoData[parentid][0].filename + '&cat=' + parentid;
  ps.fn.closeNotification();
});
$(document).on('click', 'img.settings', function () {
  ps.fn.checkThenOpen(ps.dialogs.$settings);
});

$('#maincontainer').on('click', '.minipane:not(.fake)', function (e) {
  window.location.hash = 'slideshow&pid=' + $(this).attr('data-path') + '&cat=' + this.parentNode.parentNode.id;
  return false;
});

$('#maincontainer').on('click', '.pagearrows', function () {
  var paneID = this.parentNode.id;
  var arrowID = this.id;
  var minipaneID = '#' + paneID + ' .paneexpanded #minipane';
  var paneExpanded = '#' + paneID + ' .paneexpanded';
  var numPics = ps.o.photoData[paneID].length;
  var paneHeight = $('.contentpane').height();

  //increment page positions
  if (arrowID == "arrowRight") {
    if (ps.o.categoryData[paneID].resetPane == true) ps.o.categoryData[paneID].pagePosition = (-ps.o.siteDefaults.picsPerPanePage);
    ps.o.categoryData[paneID].pagePosition = parseInt(ps.o.categoryData[paneID].pagePosition) + ps.o.siteDefaults.picsPerPanePage;
    ps.o.categoryData[paneID].resetPane = false;
  }
  else if (arrowID == "arrowLeft") {
    ps.o.categoryData[paneID].pagePosition = parseInt(ps.o.categoryData[paneID].pagePosition) - ps.o.siteDefaults.picsPerPanePage;
    ps.o.categoryData[paneID].resetPane = false;
    //if going backwards at first page
    if (ps.o.categoryData[paneID].pagePosition == (-ps.o.siteDefaults.picsPerPanePage)) {
      ps.o.categoryData[paneID].resetPane = true;
      ps.o.categoryData[paneID].pagePosition = numPics - (numPics % ps.o.siteDefaults.picsPerPanePage);
      if (ps.o.categoryData[paneID].pagePosition == numPics)
        ps.o.categoryData[paneID].pagePosition -= ps.o.siteDefaults.picsPerPanePage;
    }
  }

  //animate
  var position = $('#' + paneID).find('.minipane').eq(ps.o.categoryData[paneID].pagePosition).position().top;
  $('#' + paneID).find('.paneexpanded').stop().animate({ 'scrollTop': '+=' + (position + 1) }, ps.o.siteDefaults.panePageAnimationDuration, ps.o.siteDefaults.panePageAnimationMethod);

  if (arrowID == "arrowRight") {
    //if you're on last page
    if (parseInt(ps.o.categoryData[paneID].pagePosition + ps.o.siteDefaults.picsPerPanePage) >= numPics) ps.o.categoryData[paneID].resetPane = true;
    else ps.o.categoryData[paneID].resetPane = false;
  }
  //place page number
  var pagenum = $(paneExpanded + ' .pagenum');
  pagenum.fadeOut('fast', function () { pagenum.text((ps.o.categoryData[paneID].pagePosition / ps.o.siteDefaults.picsPerPanePage) + 1); });
  pagenum.delay(300).fadeIn('fast');

  return false;

});

$('#slideshowcontainer .bigarrowright,#slideshowcontainer .bigarrowleft').click(function () {
  var photoData = ps.o.photoData, thisPane = ps.fn.urlvars().cat;
  var currentLocation = ps.fn.lookupPhoto(ps.fn.urlvars().pid, thisPane), currentPic = '';

  if (photoData[thisPane].length == 1) {
    return false;
  }
  if ($(this).hasClass('bigarrowright') || (this.id == "imgscreen")) { offset = 1; pagenumoffset = 2; }
  else if ($(this).hasClass('bigarrowleft')) { offset = (-1); pagenumoffset = 0; }

  $('#largesingleimage').fadeOut('fast', function () {
    //if trying to go backwards at the first pic
    if (currentLocation + offset == (-1)) currentPic = photoData[thisPane][(photoData[thisPane].length) - 1].filename;
    //there is a next or previous pic
    else if (photoData[thisPane][currentLocation + offset]) currentPic = photoData[thisPane][currentLocation + offset].filename;
    //if trying to go forwards at the last pic
    else currentPic = photoData[thisPane][0].filename;

    window.location.hash = 'slideshow&pid=' + currentPic + '&cat=' + thisPane;
  });
});

$('#largesingleimage').draggable({ scroll: false });

$('#largesingleimage').dblclick(function () {
  if (ps.o.zoomData.isZoomed) {
    ps.fn.zoomImage.zoomOut();
  } else {
    ps.o.zoomData.fromButton = true;
    ps.fn.zoomImage.zoomIn();
  }
});

$('#imgscreen').click(function (event) {
  $('#slideshowcontainer .bigarrowright').trigger('click');
});

$('#slideshowcontainer .closebutton,#slidercontainer .closebutton').click(function () {
  window.location.hash = ps.v.photosHash;
  if ($(this).attr('data-action') === 'backtophotoconfig') $('.configDialog,.ui-widget-overlay').show();
});

$('.captionbutton').click(function () {
  $('.imagetext').delay(200).toggleClass("showText");
  var cat = ps.fn.urlvars().cat;
  if(ps.o.categoryData[cat].toggleCaption === 'on') ps.o.categoryData[cat].toggleCaption = 'off';
  else ps.o.categoryData[cat].toggleCaption = 'on';
});

$(document).on('click', '#addcomment', function () {
  ps.dialogs.$comment.removeAttr('data-commentid');
  ps.dialogs.$comment.dialog('open');
  return false;
});

$('.requestbutton').click(function () {
  if(!$(this).hasClass('savebutton'))
  window.location.hash = '#rbutton';
});

$(document).on('click', '#slideshowcontainer .savebutton', function () {
  var filename = $('#largesingleimage').attr('data-filename');
  var $link = $('<a></a>', {
    class : 'imagedownload',
    href : 'php/downloadPhoto.php?file=' + filename
  }).appendTo('body');
  $link[0].click();
  $link.remove();
});

$('#submitrequest').click(function (e) {
  if(ps.fn.validateForm($('#requestpane form.requestform'))){
    $.getJSON('php/emailme.php', { 'type': 'request', 'requestedphoto': $('#request_requestedphoto').val(), 'email': $('#request_email').val(), 'comments': $('#request_comments').val() }, function (data) {
      ps.fn.notify(data,'info');
    });
  }
});

$('#clearrequest').click(function () {
  ps.fn.clearForm($('#requestpane form.requestform'));
});

$('#submitfeedback').click(function () {
  if(ps.fn.validateForm($('#contactpane form.feedbackform'))){
    $.getJSON('php/emailme.php', { 'type': 'feedback', 'name': $('#feedback_name').val(), 'comments': $('#feedback_comment').val() }, function (data) {
      ps.fn.notify(data,'info');
    });
  }
});

$('#clearfeedback').click(function (e) {
  ps.fn.clearForm($('#contactpane form.feedbackform'));
});

$('#titleText').click(function () {
  ps.dialogs.$login.dialog('open');
});

ps.events.photoZoom = function (event, delta) {
  event.preventDefault();
  var thisZoom = ps.o.zoomData;
  if ((((delta > 0) && !thisZoom.isZoomed) || ((delta < 0) && thisZoom.isZoomed)) && (delta != 0)) {
    var params = { 'event': event, 'delta': delta };
    ps.fn.zoomImage.decide(params);
  }
};

$('#imgscreen, #largesingleimage').on('mousewheel', ps.events.photoZoom);

$('#zoomBack').click(function () {
  ps.fn.zoomImage.zoomOut();
});

$('.zoombutton').click(function () {
  ps.o.zoomData.fromButton = true;
  ps.fn.zoomImage.zoomIn();
});

$(document).on('click', 'span.openSubmitLink', function () {
  categoryToUpload = this.parentNode.parentNode.id;
  ps.dialogs.$upload.dialog('open');
});

$('#slidercontainer .bigarrowright').click(function(){
  if($('.sliderImg[data-filename="'+ ps.fn.urlvars().pid +'"]').next('.sliderImg').length > 0)
  ps.fn.advanceSlider($('.sliderImg[data-filename="'+ ps.fn.urlvars().pid +'"]').next('.sliderImg'))
});
$('#slidercontainer .bigarrowleft').click(function(){
  if($('.sliderImg[data-filename="'+ ps.fn.urlvars().pid +'"]').prev('.sliderImg').length > 0)
  ps.fn.advanceSlider($('.sliderImg[data-filename="'+ ps.fn.urlvars().pid +'"]').prev('.sliderImg'))
});
$('#sliderdiv .decor').dblclick(function(){ ps.fn.advanceSlider('toend') });
$('#sliderdiv .decor.end').dblclick(function(){ ps.fn.advanceSlider('tobeginning') });

$('#slidercontainer').on('click', '.sliderImg', function () {
  ps.fn.advanceSlider($(this));
});

$('#slidercontainer .sliderImg').dblclick(function () {
  ps.fn.switchPhotoDisplay();
});

$(document).on('click', '.switchphotodisplay', function () {
  ps.fn.switchPhotoDisplay();
});
$('#slidercontainer').on('click', '.skiptofront,.skiptoback', function () {
  ps.fn.advanceSlider(null, $(this).attr('class').split(' ').shift());
  return false;

  //slider autoscroll
  ////////////////////
   /*
  var classname = this.className.split(' ').shift();
  var $containerwidth = $('#sliderdiv').width();
  var $windowwidth = $(window).width();
  if (classname == 'skiptoback') ps.v.sliderAnimationRate++;
  else ps.v.sliderAnimationRate--;
  if (ps.v.sliderAnimationRate > 4) {
  ps.v.sliderAnimationRate = 4;
  ps.fn.notify('Speed limit reached!', '', '', '', 'replace');
  }
  else if (ps.v.sliderAnimationRate < -4) {
  ps.v.sliderAnimationRate = -4;
  ps.fn.notify('Speed limit reached!', '', '', '', 'replace');
  }
  else {
  cancelAnimationFrame(ps.v.sliderAnimation);
  function slide() {
  document.getElementById('slidercontainer').scrollLeft += ps.v.sliderAnimationRate;
  if (document.getElementById('slidercontainer').scrollLeft < ($containerwidth - $windowwidth) && document.getElementById('slidercontainer').scrollLeft > 0) ps.v.sliderAnimation = requestAnimationFrame(slide);
  else {
  ps.fn.notify('Sliding halted', '', '', '', 'replace');
  ps.v.sliderAnimationRate = 0;
  }
  }
  if (ps.v.sliderAnimationRate != 0) {
  ps.v.sliderAnimation = requestAnimationFrame(slide);
  ps.fn.notify('Sliding at ' + Math.abs(ps.v.sliderAnimationRate) + 'x speed!');
  }
  else ps.fn.notify('Sliding halted', '', '', '', 'replace');
  }
  */
});

$(document).on('click', '#codeitem', function () {
  ps.dialogs.$code.dialog('open');
  window.location.href = ps.v.photosHash;
  return false;
});

$(document).on('click', 'span.addPaneLink', function () {
  ps.fn.checkThenOpen(ps.dialogs.$addpane);
  return false;
});

$(document).on('click', 'span.revealPaneLink', function () {
  ps.fn.checkThenOpen(ps.dialogs.$photoconfig);
  return false;
});

$(document).on('click', 'a.deleteComment', function () {
  var id = $(this).attr('data-commentid');
  var imagefor = ps.fn.urlvars().pid;
  var cat = ps.fn.urlvars().cat;
  var comment = $(this).siblings('.comment').text();
  var name = $(this).siblings('.name').text();
  delete ps.o.picsComments[imagefor][ps.fn.lookupComment(id)];
  delete ps.o.photoData[cat][ps.fn.lookupPhoto(imagefor,cat)]['comments'][ps.fn.lookupComment(id)];
  var commentData = ps.o.picsComments[imagefor];
  var commentString = JSON.stringify(commentData);
  $.ajax({
    type: "POST",
    url: 'php/setcomments.php',
    data: { 'imagefor': imagefor, 'data': commentString, 'action': 'delete', 'sessionid': ps.fn.getCookie('sessionid') }
  }).done(function (data) {
  }).fail(function () { alert("error"); return false; });

  ps.fn.updateImageText();
  return false;
});

$(document).on('click', 'a.editComment', function () {
  ps.dialogs.$comment.attr('data-commentid' , $(this).attr('data-commentid')).dialog('open');
  $('#comment-dialog textarea.comment').val(ps.o.picsComments[ps.fn.urlvars().pid][ps.fn.lookupComment($(this).attr('data-commentid'))].comment);
  $('#comment-dialog textarea.name').val(ps.o.picsComments[ps.fn.urlvars().pid][ps.fn.lookupComment($(this).attr('data-commentid'))].name);
  return false;
});



//  ██████╗ ██╗  ██╗ ██████╗ ████████╗ ██████╗    ██████╗ ██████╗  ███╗   ██╗███████╗██╗ ██████╗   ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
//  ██╔══██╗██║  ██║██╔═══██╗╚══██╔══╝██╔═══██╗  ██╔════╝ ██╔═══██╗████╗  ██║██╔════╝██║██╔════╝   ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
//  ██████╔╝███████║██║   ██║   ██║   ██║   ██║  ██║      ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗  █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
//  ██╔═══╝ ██╔══██║██║   ██║   ██║   ██║   ██║  ██║      ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║  ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
//  ██║     ██║  ██║╚██████╔╝   ██║   ╚██████╔╝  ╚██████╗ ╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝  ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
//  ╚═╝     ╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝   ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
//



$(document).on('click', '.categoryHeader h2', function () {
  var catname = $(this).text();
  var $newfield = $("<input>").addClass('renameCategoryField').attr('type', 'text').val(catname);
  $(this).hide().parent().prepend($('<span>').addClass('requestbutton savebutton')).prepend($newfield);
  $newfield.focus();
  $('.renameCategoryField')[0].select();
  $(this).siblings('.configarrows').hide();
  ps.fn.notify('Enter a new category name', '', 0, '', 'replace');
});

ps.events.renameCategory = function (e) {
  var old = $(this).siblings('h2').toUnderscores().text();
  var newname = ps.fn.toDisplay($(this).val());
  var tosubmit = ps.fn.toUnderscores(newname);
  var $this = $(this).siblings('.savebutton');
  var uiAction = function () {
    $('.renameCategoryField').parent().children('h2').text(newname).show();
    $('.renameCategoryField').detach();
    $this.siblings('.configarrows').fadeIn();
    $this.remove();
  }
  if (old === tosubmit) {
    uiAction();
    ps.fn.closeNotification();
  }
  else if (ps.fn.validateStringAgainst(tosubmit, ps.fn.getCategories())) {
    if (ps.fn.validateString(newname, 3, 16)) {
      $.ajax({
        type: "POST",
        url: 'php/renameCat.php',
        data: { 'title': old, 'newtitle': tosubmit }
      }).done(function (data) {
        uiAction();
        ps.fn.notify("Category renamed", '', 4, null, 'replace');
        if (tosubmit != old) {
          ps.o.categoryData[tosubmit] = ps.o.categoryData[old];
          delete ps.o.categoryData[old];
          ps.o.photoData[tosubmit] = ps.o.photoData[old];
          delete ps.o.photoData[old];
        }
        $('#' + old).attr('id', tosubmit);
      }).fail(function () { alert("error"); return false; });
    }
    else {
      $(this).siblings('.renameCategoryField').focus();
      ps.fn.notify('Name must contain only letters, numbers, and spaces, and be 16 characters or less', 'error', 0, null, 'replace');
    }
  }
  else {
    $(this).siblings('.renameCategoryField').focus();
    ps.fn.notify('Category name must be unique. Do you want to <a href = "#" id = "mergeCategories" data-oldname = "' + old + '" data-newname = "' + tosubmit + '">merge cateogories</a>?', 'alert', 0, function () {
      $(document).on('blur', '.categoryHeader .renameCategoryField', ps.events.renameCategory);
    }, 'replace');
    $(document).off('blur', '.categoryHeader .renameCategoryField');
  }
};

$(document).on('keyup', '.categoryHeader .renameCategoryField', function (e) {
  if (e.which === 13) $('#configSearch-searchText').focus();
});

$(document).on('blur', '.categoryHeader .renameCategoryField', ps.events.renameCategory);

$(document).on('click', '#mergeCategories', function () {
  var oldname = $(this).attr('data-oldname');
  var newname = $(this).attr('data-newname');
  $.ajax({
    type: "POST",
    url: 'php/mergeCategory.php',
    data: { 'one': oldname, 'two': newname }
  }).done(function (data) {
    ps.o.photoData[newname] = ps.o.photoData[newname].concat(ps.o.photoData[oldname]);
    ps.fn.notify('Categories merged', '', 4, null, 'replace');
    ps.fn.refreshPhotoConfigData(newname);
    delete ps.o.categoryData[oldname];
    delete ps.o.photoData[oldname];
  }).fail(function () { alert("error"); return false; });
});

$(document).on('click', '.sortableContainer .onesection .delete', function () {
  var filename = $(this).parent().attr('data-filename');
  var $button = $(this);
  var imgid = $(this).siblings('.sortimage').attr('data-imgid');
  var cat = $(this).parent().attr('data-category');
  $button.addClass('cover');
  ps.fn.notify('Photo deleted. <a href=\'#\' id=\'cancelDelete\'>Undo this?</a>', '', 4, [function () { ps.v.multipleImagesToDelete.push({ 'imgid': imgid, 'filename': filename, 'isUnique': ps.fn.isPhotoUnique(filename), 'category': cat }); }, function () { ps.fn.deletePhotos(); } ], 'replace');
});

$('#globalNotification').on('click', '#cancelDelete', function () {
  ps.v.lastNotifyCallback = null;
  ps.fn.closeNotification();
  $('.onesection .delete.standardButton').removeClass('cover');
  return false;
});

$('#globalNotification').on('click', '#revertThumb', function () {
  ps.fn.closeNotification();
  var whichPane = $(this).attr('data-torevert');

  if (whichPane === 'all_visible_panes') {
    var thumbsArray = {};
    $(".contentpane .thumbcontent").each(function () {
      var whichPane = $(this).parent().attr('id');
      $(this).css({'background-image': 'url(' + ps.o.categoryData[whichPane].thumb.image + ')', 'background-position': ps.o.categoryData[whichPane].thumb.position });
      $(this).attr('data-imageurl', ps.o.categoryData[whichPane].thumb.image);
      thumbsArray[whichPane] = JSON.stringify({ "image": ps.o.categoryData[whichPane].thumb.image, "position": ps.o.categoryData[whichPane].thumb.position });
    });
    $.ajax({
      type: "POST",
      url: 'php/setthumbs.php',
      data: { 'thumbs': thumbsArray }
    }).done(function (data) {
      //ps.fn.closeNotification(), $('#revertThumb').remove();
      //ps.fn.notify('Thumbnail updated. <a href=\'#\' id=\'revertThumb\' data-torevert=\'' + whichPane + '\' data-imgurl=\'' + imagesrc + '\' class=\'revertLink\'>Revert to original?</a>', '', 4);
    }).fail(function () { alert("error"); return false; });
  }
  else {
    $('#' + whichPane + " .thumbcontent").css({ 'background-image': 'url(' + ps.o.categoryData[whichPane].thumb.image + ')', 'background-position': ps.o.categoryData[whichPane].thumb.position });
    $('#' + whichPane + " .thumbcontent").attr('data-imageurl', ps.o.categoryData[whichPane].thumb.image);
    var thumbstring = JSON.stringify({ "image": ps.o.categoryData[whichPane].thumb.image, "position": ps.o.categoryData[whichPane].thumb.position });
    $.ajax({
      type: "POST",
      url: 'php/setthumb.php',
      data: { 'thumb': thumbstring, 'category': whichPane }
    }).fail(function () { alert("error"); return false; });
  }
  return false;
});

$('#globalNotification').on('click', '#revertBackground', function () {
  ps.fn.closeNotification();
  var oldback = $(this).attr('data-torevert');
  ps.o.config['backgroundImage'] = oldback;
  ps.fn.sendConfig(function(){
    $('html').css('backgroundImage', oldback);
  });
  return false;
});

$(document).on('click', '.categoryOptions>.deleteCatButton', function (e) {
  ps.v.catToDelete.name = $(this).parent().parent().attr('data-category');
  ps.v.catToDelete.headerRow = $(this).parent().parent();
  ps.fn.notify('Are you sure to want to delete <i>' + ps.fn.toDisplay(ps.v.catToDelete.name) + '</i> and all the photos within? &nbsp; &nbsp; <a href = "#" class = "deleteThisCategory">Yes</a> / <a href = "#" class = "closeNotification">No</a>' , 'alert', 0, null, 'replace');
});

$(document).on('click', 'a.deleteThisCategory', function (e) {
  $.ajax({
    type: "POST",
    url: 'php/deleteCat.php',
    data: { 'category': ps.v.catToDelete.name }
  }).done(function (data) {
    var category = ps.v.catToDelete.headerRow.attr('data-category');
    if (ps.o.categoryData[ps.v.catToDelete.name].hidden === '0') ps.fn.removePane(ps.v.catToDelete.name);
    delete ps.o.photoData[category];
    delete ps.o.categoryData[category];
    ps.fn.refreshPhotoConfigData();
    ps.fn.checkandAddMainPlaceholder();
    ps.fn.notify('Category deleted', '', '', '', 'replace');
  }).fail(function () { alert("error"); return false; });
});

$(document).on('click', 'a.closeNotification', function (e) {
  ps.fn.closeNotification();
  return false;
});

$(document).on('click', '.categoryOptions>button.togglethumbnailassign', function () {
  ps.fn.toggleConfigThumbnailAction('thumbnail', $(this));
});

$(document).on('click', '.categoryOptions>button.transfer', function () {
  ps.fn.toggleConfigThumbnailAction('transfer', $(this));
});

$(document).on('click', '.categoryOptions>button.copy', function () {
  ps.fn.toggleConfigThumbnailAction('copy', $(this));
});

$(document).on('click', '.categoryOptions>button.upload', function (e) {
  ps.fn.closeNotification();
  $('#dialog-submit').attr('data-latestcategory', $(this).parent().parent().attr('data-category'));
  ps.dialogs.$upload.dialog('open');
  return false;
});

$(document).on('click', '#transferPhotos', function (e) {
  var transferto = $(this).attr('data-transferto');
  ps.fn.transferPhotos(transferto);
  return false;
});

$(document).on('click', '#copyPhotos', function (e) {
  var copyto = $(this).attr('data-copyto');
  ps.fn.copyPhotos(copyto);
  return false;
});

$(document).on('click', '#globalNotification .categoryList.transfer a', function (e) {
  ps.fn.transferPhotos($(this).text());
  return false;
});

$(document).on('click', '#globalNotification .categoryList.copy a', function (e) {
  ps.fn.copyPhotos($(this).text());
  return false;
});

$(document).on('click', '.categoryOptions>.toggle', function (e) {
  var cat = $(this).parent().parent().attr('data-category');
  var currentdisplay = $(this).text(), newstate = '', newdisplay = false;
  var $ele = $(this);
  switch ($ele.attr('class').split(' ')[0]) {
    case 'toggleview':
      if (currentdisplay === 'slideshow') newstate = 'slider';
      else newstate = 'slideshow';
      break;
    case 'togglehidden':
      if (currentdisplay === 'shown') { newstate = '1'; newdisplay = 'hidden'; ps.fn.removePane(cat); }
      else { newstate = '0'; newdisplay = 'shown'; ps.fn.addPane(cat); }
      break;
    case 'togglesaveable':
      if (currentdisplay === 'saveable') { newstate = '0'; newdisplay = 'unsaveable' }
      else { newstate = '1'; newdisplay = 'saveable' }
      break;
    case 'togglecomments':
      if (currentdisplay === 'comments on') { newstate = '0'; newdisplay = 'comments off' }
      else { newstate = '1'; newdisplay = 'comments on' }
      break;
    case 'togglecaptions':
      if (currentdisplay === 'captions shown') { newstate = '0'; newdisplay = 'captions hidden' }
      else { newstate = '1'; newdisplay = 'captions shown' }
      break;
  }
  ps.o.categoryData[cat][$ele.attr('data-variable')] = newstate;
  $ele.text(newdisplay || newstate);
  ps.fn.sendCategoryData(cat);
});

$(document).on('click', '.thumbnaillarger,.thumbnailsmaller', function () {

  if ($(this).attr('class').split(' ')[0] === 'thumbnaillarger') ps.o.config['configThumbsPerRow']--;
  else if ($(this).attr('class').split(' ')[0] === 'thumbnailsmaller') ps.o.config['configThumbsPerRow']++;
  $('.sortableContainerCloned').html('');
  ps.fn.setConfigThumbWidth();
  ps.fn.sendConfig();
  ps.fn.refreshPhotoConfigData();
});


ps.events.sortimageThumbnailAction = function (e) {

  var whichPane = $(this).parent().attr('data-category');
  var filename = $(this).attr('data-filename');
  var imagesrc = 'php/timthumb.php?a=l&h=600&src=http://'+ window.location.host +'/photos/' + filename;

  var posX = $(this).offset().left, posY = $(this).offset().top;
  var percent = ((e.pageX - posX) / $(this).width());

  if (e.ctrlKey || e.metaKey) {
    ps.fn.setUniversalThumb(filename);
    return false;
  }
  $('#' + whichPane + ' .thumbcontent').addClass('loading');
  $('#' + whichPane + ' .paneThumbPlaceholder').remove();
  $image = $('#thumbImgHidden').attr({ 'src': imagesrc });
  $image.one("load", function () {

    var thumbWidth = $(this).width();
    var backposition = -(percent * (thumbWidth - $('.contentpane').width())) + 'px 0';
    $('#' + whichPane + " .thumbcontent").removeClass('loading').css({ 'background-image': 'url(' + imagesrc + ')', 'background-position': backposition }).find('span').remove();
    $('#' + whichPane + " .thumbcontent").attr('data-imageurl', imagesrc);

    var thumbstring = JSON.stringify({ "image": imagesrc, "position": backposition });

    $.ajax({
      type: "POST",
      url: 'php/setthumb.php',
      data: { 'thumb': thumbstring, 'category': whichPane }
    }).done(function (data) {
      ps.fn.closeNotification(), $('#revertThumb').remove();
      ps.fn.notify('Thumbnail updated. <a href=\'#\' id=\'revertThumb\' data-torevert=\'' + whichPane + '\' data-imgurl=\'' + imagesrc + '\' class=\'revertLink\'>Revert to original?</a>', '', 4);
    }).fail(function () { alert("error"); return false; });
  }).each(function () {
    if (this.complete) $(this).load();
  });
  return false;
};

ps.events.sortimageBackgroundAction = function (e) {
  var newback = 'url(photos/' + $(this).attr('data-filename') + ')';
  ps.o.config['backgroundImage'] = newback;
  ps.fn.sendConfig(function(){
    $('html').css('backgroundImage', newback);
    ps.fn.notify('Background Updated. <a href=\'#\' id=\'revertBackground\' data-torevert=\''+ ps.v.originalBackground +'\' class=\'revertLink\'>Revert to original?</a>', '', 4);
  });
};

ps.events.sortimageEditCaptionAction = function (e) {

  if($(this).parent().attr('data-caption')) {
    $('#edit-caption-dialog>textarea').val($(this).parent().attr('data-caption'));
  }
  else $('#edit-caption-dialog>textarea').val('');
  $('#edit-caption-dialog').attr('data-imagefor', $(this).attr('data-filename') );
  ps.dialogs.$editcaption.dialog('open');
  ps.fn.closeNotification();
};

$('#slideshowcontainer').on('click', 'a.editcaption', function(){
  $('#edit-caption-dialog>textarea').val(ps.o.picsCaptions[ps.fn.urlvars().pid]);
  $('#edit-caption-dialog').attr('data-imagefor', ps.fn.urlvars().pid );
  ps.dialogs.$editcaption.dialog('open');
  ps.fn.closeNotification();
  return false;
});

ps.events.sortimageJustSelectAction = function (e) {
  $(this).toggleClass('selected');
  return false;
};

ps.events.sortimageSelectAction = function (e) {
  $(this).toggleClass('selected');
  if ($('#dialog-config .sortableContainer .onesection:not([data-hidden=true])').children('.sortimage.selected').length === 0) ps.fn.closeNotification();
  else if (!ps.fn.isNotificationShown('With')) ps.fn.displaySelectedConfigPhotosOptions();
  return false;
};

$(document).on('click', '.configarrows', function () {
  var $section = $(this).parent().parent();
  var whichPane = $section.children('.categoryHeader').attr('data-category');
  if ($(this).hasClass('arrowUp')) {
    if ($section.prev().attr('class') != 'hidden') {
      $section.insertBefore($section.prev());
      $('#' + whichPane).insertBefore($('#' + whichPane).prev());
    }
    else ps.fn.notify('You\'re at the top :)');
  }
  else {
    $section.insertAfter($section.next());
    $('#' + whichPane).insertAfter($('#' + whichPane).next());
  }
  $('#dialog-config').animate({ 'scrollTop': $section.position().top - 5 }, 200);
  ps.fn.sortCategories();
  return false;
});

$(document).on('mousedown', '.ui-resizable-handle', function () {
   $('.configDialog').find('.sortableContainerCloned').html('');
   $('.configDialog .searchContainer').fadeOut();
});

$(document).on('mouseup', '.ui-resizable-handle', ps.fn.refreshPhotoConfigData);

$(document).on('dblclick', '.configDialog .ui-dialog-titlebar', function () {
  var $parent = $(this).parent();
  var $titlebar = $(this);
  ps.fn.hideHint();
  if ($(this).hasClass('expanded')) {
    $('#dialog-config').hidden(400, function () {
      $parent.animate({ 'top': ps.o.dialogDefaults[$parent.attr('class')].top, 'left': ps.o.dialogDefaults[$parent.attr('class')].left, 'width': ps.o.dialogDefaults[$parent.attr('class')].width }, 400);
      $titlebar.siblings('.dialog').animate({ 'height': ps.o.dialogDefaults[$parent.attr('class')].height }, 400, function () {
        $('#dialog-config').width($(this).attr('data-initialwidth'));
        ps.fn.refreshPhotoConfigData(null, function () {
          $('#dialog-config').visible(400);
          ps.o.hints['.configDialog'].displayedOnce = false;
          ps.o.hints['button:contains("Toggle Info")'].displayedOnce = false;
          ps.fn.displayHint( '.configDialog', 'right' , 0, true, null, 1000, '.sortimage');
          ps.fn.displayHint( 'button:contains("Toggle Info")', 'bottom' , 0, true, null, 1000);
        });
      });
      $titlebar.removeClass('expanded');
      $('img.settings').show();
    });
  }
  else {
    ps.o.dialogDefaults[$parent.attr('class')] = { 'top': $parent.css('top'), 'left': $parent.css('left'), 'width': $parent.css('width'), 'height': $titlebar.siblings('.dialog').css('height') };
    $('#dialog-config').attr('data-initialwidth', $('#dialog-config').width()).hidden(400, function () {
      $parent.animate({ 'top': '0', 'left': '0', 'width': $(window).width() }, 400);
      $titlebar.siblings('.dialog').animate({ 'height': $(window).height() - 120 }, 400, function () {
        $('#dialog-config').css('width', 'auto');
        ps.fn.refreshPhotoConfigData('', function () {
          $('#dialog-config').visible(400);
        });
      });
      $titlebar.addClass('expanded');
      $('img.settings').hide();
    });
  }
});

/*
$(document).on('mouseenter', '.notifyTitle', function () {
  var title = $(this).attr('title');
  var displaytitle = '<i>' + $(this).attr('title') + '</i>';
  var $ele = $(this);
  ps.fn.notify(displaytitle, '', 0, function () { $ele.attr('title', title) });
  $(this).removeAttr('title');
});
*/

$(document).on('mouseleave', '.notifyTitle', function () {
  ps.fn.closeNotification();
});

$(document).on('click', '.notifyTitle', function () {
  ps.v.ignoreNextNotifyClose = true;
});

ps.events.preformConfigSearch = function (e) {
  if ($('#configSearch-searchText').attr('disabled') === 'disabled') $('#configSearch-searchText').removeAttr('disabled').val($('#configSearch-searchText').attr('data-old-value'));
  var $type = document.getElementById('configSearch-type');
  var type = $type.options[$type.selectedIndex].getAttribute('data-type');
  var operatorsAllowed = $type.options[$type.selectedIndex].getAttribute('data-options-available').split(',');
  if (e && e.target.id === 'configSearch-type') {
    //restrict operator based on type
    $('#configSearch-operator').html('');
    for (var x in operatorsAllowed) $('#configSearch-operator').append($('#configSearch-operator-hidden>option:contains(' + operatorsAllowed[x] + ')').clone());
  }
  var $operator = document.getElementById('configSearch-operator');
  var operator = $operator.options[$operator.selectedIndex].getAttribute('data-operator');
  var operatorVal = $operator.value;
  var numericalOperators = {
    '>': function (a, b) { return (!isNaN(a) && a) && a > b },
    '<': function (a, b) { return (!isNaN(a) && a) && a < b }
  };
  var rawsearchtext = document.getElementById('configSearch-searchText').value;
  var searchtext = '"' + rawsearchtext + '"';
  var searchdec = (operatorVal === 'less than' || operatorVal === 'greater than') ? ps.fn.stringToDecimal(rawsearchtext) : false;
  var $placeholder = $('<span class = "config-placeholder">No results</span>');
  $('.sortableContainer .onesection').attr('data-hidden', 'true');

  if (operatorVal === 'is missing' || operatorVal === 'has') {
    if (operatorVal === 'is missing') $('.sortableContainer .onesection[data-' + type + '=""]').attr('data-hidden', 'false');
    else $('.sortableContainer .onesection:not([data-' + type + '=""])').attr('data-hidden', 'false');
    $('#configSearch-searchText').attr({ 'data-old-value': rawsearchtext, 'disabled': 'disabled' }).val('');
    ps.fn.sortableConfigPhotos_toggleOff();
  }
  else {
    if (rawsearchtext != "") {
      ps.fn.sortableConfigPhotos_toggleOff();
      if (operatorVal === 'less than' || operatorVal === 'greater than' && searchdec) {
        $('.sortableContainer .onesection').filter(function (index) {
          return numericalOperators[operator](ps.fn.stringToDecimal($(this).attr('data-' + type)), searchdec);
        }).attr('data-hidden', 'false');
      }
      else if (operatorVal !== 'less than' && operatorVal !== 'greater than') {
        var rawsearcharr = rawsearchtext.split(' ');
        if (rawsearcharr.pop() === '-i') {
          searchtext = '"' + rawsearcharr.join(' ') + '"';
          $('.sortableContainer .onesection:not([data-' + type + operator + searchtext + '])').attr('data-hidden', 'false');
        }
        else $('.sortableContainer .onesection[data-' + type + operator + searchtext + ']').attr('data-hidden', 'false');
      }
      else if ( type === 'category') ps.fn.sortableConfigPhotos_toggleOn();
    }
    else {
      //show everything, make photos sortable again
      $('.sortableContainer .onesection').attr('data-hidden', 'false');
      ps.fn.sortableConfigPhotos_toggleOn();
    }
  }

  //hide category header when all images within are hidden or none exist, but show category even if no images exist within when searching for category
  $('.categoryContainer').each(function () {
    var notSearchedForByName = $(this).find('.categoryHeader').attr('data-category').indexOf(rawsearchtext) < 0;
    var noShownImagesInCategory = $(this).find('.sortableContainer .onesection[data-hidden=true]').length === $(this).find('.sortableContainer .onesection').length;
    if (type === 'category') {
      if (noShownImagesInCategory && notSearchedForByName) $(this).attr('data-hidden', 'true');
      else if (noShownImagesInCategory && !notSearchedForByName) $(this).attr('data-hidden', 'false');
      else $(this).attr('data-hidden', 'false');
    }
    else {
      if (noShownImagesInCategory && (rawsearchtext != '' || $('#configSearch-searchText').attr('disabled') === 'disabled')) $(this).attr('data-hidden', 'true');
      else $(this).attr('data-hidden', 'false');
    }
  });

  //no results placeholder
  if ($('.categoryContainer[data-hidden=false]').length === 0) {
    if ($('.config-placeholder').length === 0) $('#dialog-config').append($placeholder);
  }
  else $('.config-placeholder').remove();

  //scroll to top on new search
  if ($('#dialog-config').scrollTop() > 0) $('#dialog-config').scrollTop(0);
};

$(document).on('input', '#configSearch-searchText', ps.events.preformConfigSearch);
$(document).on('change', '#configSearch-type', ps.events.preformConfigSearch);
$(document).on('change', '#configSearch-operator', ps.events.preformConfigSearch);

$(document).on('click', '#dialog-config .searchContainer button.clear', function(e){
  $('#configSearch-searchText').val('');
  ps.events.preformConfigSearch();
});

$('#dialog-config').on('scroll',function(e){
  var $searchContainer = $('#dialog-config .searchContainer');
  if($(this).scrollTop() > ps.o.siteDefaults.config.hideFilterScrollThreshold && !$searchContainer.hasClass('faded')) $searchContainer.addClass('faded');
  else if($(this).scrollTop() < ps.o.siteDefaults.config.hideFilterScrollThreshold && $searchContainer.hasClass('faded')) $searchContainer.removeClass('faded');
});

$(document).on('mouseenter', '.configDialog .ui-dialog-titlebar, #dialog-config .searchContainer', function(e){
  var $searchContainer = $('#dialog-config .searchContainer');
  if($searchContainer.hasClass('faded')) $searchContainer.removeClass('faded');
});

$(document).on('mouseleave', '.configDialog .ui-dialog-titlebar, #dialog-config .searchContainer', function(e){
  var $searchContainer = $('#dialog-config .searchContainer');
  if(!$searchContainer.hasClass('faded') && $('#dialog-config').scrollTop() > ps.o.siteDefaults.config.hideFilterScrollThreshold) $searchContainer.addClass('faded');
});

$(document).on('click', '.configPhotosSelectedOption', function () {
  var images = [];
  switch (this.id) {
    case 'deleteSelectedConfigPhotos':
      $('#dialog-config .sortableContainer .sortimage.selected').each(function () {
        images.push({ 'imgid': $(this).attr('data-imgid'), 'filename': $(this).attr('data-filename'), 'isUnique': ps.fn.isPhotoUnique($(this).attr('data-filename')), 'category': $(this).parent().attr('data-category') });
        $(this).siblings('.delete').addClass('cover');
      });
      ps.fn.clearSelected();
      ps.v.multipleImagesToDelete = images;
      ps.fn.notify('Are you sure? <a href="#" id="confirmMultipleDelete">Yes</a> / <a href="#" id="cancelMultipleDelete">No</a>', '', 0, null, 'replace');
      break;
    case 'addTagsToSelectedConfigPhotos':
      ps.dialogs.$tags.dialog('open');
      break;
    case 'transferSelectedConfigPhotos':
    case 'copySelectedConfigPhotos':
      $('#globalNotification .categoryList').remove();
      $ul = $('<ul>');
      for (var x in ps.fn.getCategories()) $ul.append('<li><a href = "#">' + ps.fn.getCategories()[x] + '</a></li>');
      $div = $('<div>').addClass('categoryList').append($ul);
      if (this.id === 'transferSelectedConfigPhotos') $div.addClass('transfer').prepend('<h2>Transfer to:</h2>');
      else $div.addClass('copy').prepend('<h2>Copy to:</h2>');
      $('#globalNotification .inner').append($div);
      break;
  }
  return false;
});

$(document).on('click', '.sortableContainer .photoTags', function () {
  $(this).siblings('.sortimage').addClass('selected secret');
  ps.dialogs.$tags.dialog('open');
});

$(document).on('click', '#confirmMultipleDelete,#cancelMultipleDelete', function () {
  switch (this.id) {
    case 'confirmMultipleDelete':
      ps.fn.deletePhotos();
      break;
    case 'cancelMultipleDelete':
      ps.fn.closeNotification();
      $('#dialog-config .onesection .delete').removeClass('cover');
      break;
  }
});

$(document).on('click', '#globalNotification .closeButton', function () {
  ps.fn.closeNotification();
});

$(document).on('click', '.hint', function () {
  var $that = $(this);
  var callbackData = ps.o.hints[$(this).attr('data-associated-selector')].onCloseCallback;

  $(this).fadeOut(function(){ $that.remove()});
  if (callbackData) {
    ps.fn[callbackData.fn].apply(this, callbackData.args || []);
  }
});

$('#dialog-config').on('mousedown', '.sortableContainer .sortimage', function (e) {
  if (e.ctrlKey || e.metaKey) {
    $(this).toggleClass('selected');
    if ($('#dialog-config .sortableContainer .onesection:not([data-hidden=true])').children('.sortimage.selected').length === 0) ps.fn.closeNotification();
    else if (!ps.fn.isNotificationShown()) ps.fn.displaySelectedConfigPhotosOptions();
    ps.fn.hideHint( '.ui-dialog-title:contains("Photo Configuration")' );
  }
  else if (e.shiftKey) {
    var $container = $(this).parents('.sortableContainer');
    var first = $container.find('.sortimage.selected').length > 0 ? $container.find('.sortimage.selected').parent().eq(0).index() : 0;
    var last = $(this).parent().index();
    var addedToSelection = 0;
    //try forwards
    $container.find('.onesection').each(function (index) {
      if (index >= first && index <= last) {
        $(this).find('.sortimage').addClass('selected');
        addedToSelection++;
      }
    });
    //try backwards
    if (addedToSelection === 0) {
      $container.find('.onesection').each(function (index) {
        if (index >= last && index <= first) {
          $(this).find('.sortimage').addClass('selected');
        }
      });
    }
    if ($('#dialog-config .sortableContainer .onesection:not([data-hidden=true])').children('.sortimage.selected').length === 0) ps.fn.closeNotification();
    else if (!ps.fn.isNotificationShown()) ps.fn.displaySelectedConfigPhotosOptions();
    ps.fn.hideHint( '.ui-dialog-title:contains("Photo Configuration")' );
  }
});

$('#dialog-config').on('click', '.sortableContainer .sortimage', function (e) {
  if (e.shiftKey && (e.ctrlKey || e.metaKey)) {
    window.location.href = "#slideshow&pid=" + $(this).attr('data-filename') + "&cat=" + $(this).parent().attr('data-category');
    $('.configDialog,.ui-widget-overlay').fadeOut();
    $('#slideshowcontainer .closebutton').attr('data-action', 'backtophotoconfig');
  }
});

$(document).on('keydown', function (e) {
  if ($('#dialog-config').isShown()) {
    if ((e.ctrlKey || e.metaKey) && e.which === 65) { //"a" key
      var $sortimage = $('#dialog-config .sortableContainer .onesection:not([data-hidden=true])').children('.sortimage')
      if ($sortimage.filter('.selected').length === 0) {
        $sortimage.addClass('selected');
        if (!ps.fn.isNotificationShown()) ps.fn.displaySelectedConfigPhotosOptions();
      }
      else {
        ps.fn.clearSelected();
        ps.fn.closeNotification();
      }
      return false;
    }
    else if ($("span.ui-button-text:contains('Set Thumb')").hasClass('activated') && e.which === 17) { //ctrl key
      if (!ps.v.preventKeydownEvent) ps.fn.notify('Click an image to increment that image across thumbnails of all currently displayed panes.', '', 0, null);
      ps.v.preventKeydownEvent = true;
    }
    else if (e.which === 38) $('#dialog-config')[0].scrollTop -= 50;
    else if (e.which === 40) $('#dialog-config')[0].scrollTop += 50;
    else if (e.which === 84) $('#dialog-config')[0].scrollTop = 0;
    else if (e.which === 66) $('#dialog-config')[0].scrollTop = $('#dialog-config .configcontent').height();
  }
});

$(document).on('keyup', function (e) {
  if ($('#dialog-config').isShown()) {
    if ($("span.ui-button-text:contains('Set Thumb')").hasClass('activated') && e.which === 17) {
      ps.v.preventKeydownEvent = false;
      ps.fn.notify('Click an image to assign its category a new thumbnail ', '', 0, null);
      ps.fn.clearSelected();
    }
  }
});

$(document).on('keydown', '.dialog textarea', function(e){
  e.stopPropagation();
});



//  ███████╗███████╗████████╗████████╗██╗███╗   ██╗ ██████╗ ███████╗  ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
//  ██╔════╝██╔════╝╚══██╔══╝╚══██╔══╝██║████╗  ██║██╔════╝ ██╔════╝  ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
//  ███████╗█████╗   ██║    ██║   ██║██╔██╗ ██║██║  ███╗███████╗  █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
//  ╚════██║██╔══╝   ██║    ██║   ██║██║╚██╗██║██║   ██║╚════██║  ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
//  ███████║███████╗   ██║    ██║   ██║██║ ╚████║╚██████╔╝███████║  ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
//  ╚══════╝╚══════╝   ╚═╝    ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝  ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
//


$("#setHue").slider({
  min: 0,
  max: 360,
  step: 1,
  slide: function (event, ui) {
    var whichelement = ps.v.colorToSet;
    var oldcolor = ps.o.config[whichelement] || ps.o.config[ps.fn.urlvars().section + whichelement] || ps.o.categoryData[ps.fn.urlvars().cat][whichelement];
    var newcolor = ps.fn.buildHsla('h', ui.value, oldcolor);
    ps.fn.setColor(whichelement, newcolor, this.id, ui.value);
  },
  start: function (event, ui) {ps.fn.colorAdjustStart(ps.v.colorToSet.replace('Color', ''));},
  stop: function (event, ui) {ps.fn.colorAdjustStop(ps.v.colorToSet.replace('Color', ''));}
});

$("#setSaturation").slider({
  min: 0,
  max: 100,
  step: 1,
  slide: function (event, ui) {
    var whichelement = ps.v.colorToSet;
    var oldcolor = ps.o.config[whichelement] || ps.o.config[ps.fn.urlvars().section + whichelement] || ps.o.categoryData[ps.fn.urlvars().cat][whichelement];
    var newcolor = ps.fn.buildHsla('s', ui.value, oldcolor);
    ps.fn.setColor(whichelement, newcolor, this.id, ui.value);
  },
  start: function (event, ui) {ps.fn.colorAdjustStart(ps.v.colorToSet.replace('Color', ''));},
  stop: function (event, ui) {ps.fn.colorAdjustStop(ps.v.colorToSet.replace('Color', ''));}
});

$("#setLightness").slider({
  min: 0,
  max: 100,
  step: 1,
  slide: function (event, ui) {
    var whichelement = ps.v.colorToSet;
    var oldcolor = ps.o.config[whichelement] || ps.o.config[ps.fn.urlvars().section + whichelement] || ps.o.categoryData[ps.fn.urlvars().cat][whichelement];
    var newcolor = ps.fn.buildHsla('l', ui.value, oldcolor);
    ps.fn.setColor(whichelement, newcolor, this.id, ui.value);

  },
  start: function (event, ui) {ps.fn.colorAdjustStart(ps.v.colorToSet.replace('Color', ''));},
  stop: function (event, ui) {ps.fn.colorAdjustStop(ps.v.colorToSet.replace('Color', ''));}
});

$("#setOpacity").slider({
  min: 0,
  max: 1,
  step: 0.01,
  slide: function (event, ui) {
    var whichelement = ps.v.colorToSet;
    var oldcolor = ps.o.config[whichelement] || ps.o.config[ps.fn.urlvars().section + whichelement] || ps.o.categoryData[ps.fn.urlvars().cat][whichelement];
    var newcolor = ps.fn.buildHsla('a', ui.value, oldcolor);
    ps.fn.setColor(whichelement, newcolor, this.id, ui.value);
  },
  start: function (event, ui) {ps.fn.colorAdjustStart(ps.v.colorToSet.replace('Color', ''));},
  stop: function (event, ui) {ps.fn.colorAdjustStop(ps.v.colorToSet.replace('Color', ''));}
});

$('.colorSelector').change(function () {
  ps.fn.setColorSettings();
});

$('#openPhotoConfig button').click(function () {

  ps.fn.checkThenOpen(ps.dialogs.$photoconfig);
  ps.dialogs.$settings.dialog('close');
});

$("#paneSizeSlider").slider({
  min: ps.o.siteDefaults.photosWidthConfigRange[0],
  max: ps.o.siteDefaults.photosWidthConfigRange[1],
  step: 1,
  slide: function (event, ui) {
    $('#paneSizeSlider .ui-slider-handle').text(ui.value + 'px');
    $('#maincontainer').css('width', ui.value + 'px');
    ps.o.config[ps.fn.urlvars().section + 'Width'] = ui.value;
    ps.fn.setPaneWidth();
  },
  start: function (event, ui) {
    $('.settingsDialog').fadeTo(100,0.3);
  },
  stop: function (event, ui) {
    $('.settingsDialog').fadeTo(100,1);
  }

});

$("#paneExpandedSizeSlider").slider({
  min: ps.o.siteDefaults.paneExpandedWidthConfigRange[0],
  max: ps.o.siteDefaults.paneExpandedWidthConfigRange[1],
  step: 1,
  slide: function (event, ui) {
    var height = $('.contentpane').height();
    $('.contentpane').eq(0).css({ 'width': height * (ui.value / 100) + 'px' });
    ps.o.config['paneExpandedWidth'] = ui.value / 100;
  },
  start: function (event, ui) {
    $('.configDialog').fadeOut();
    $('.settingsDialog').animate({ 'opacity': '0.3' }, 200);
    $(document).on('mouseenter', '.contentpane', ps.events.contentPaneMouseover);
    $('.contentpane').eq(0).trigger('mouseenter');
    $(document).off('mouseenter', '.contentpane', ps.events.contentPaneMouseover);
  },
  stop: function (event, ui) {
    $('.settingsDialog').animate({ 'opacity': '1' }, 200);
    $(document).on('mouseleave', '.contentpane', ps.events.contentPaneMouseleave);
    $('.contentpane').eq(0).trigger('mouseleave');
    $(document).off('mouseleave', '.contentpane', ps.events.contentPaneMouseleave);
    ps.fn.assignDimensions();
  }
});

$(document).on('click', '#paneWidth a.normalize', function () {
  for (var x in ps.o.config) {
    if (x.indexOf('Width') > -1 && x.indexOf('Expanded') < 0 && x.indexOf('photos') < 0) ps.o.config[x] = $('#maincontainer').width();
  }
  ps.fn.notify('Section widths normalized to <span class = \"italic\">' + $('#paneSizeSlider a').text() + '</span>.');
  return false;
});

$(document).on('click', 'a.normalizeColors', function () {
  var cat = ps.fn.urlvars().cat;
  switch (ps.fn.urlvars().section) {
    case 'slideshow':
      ps.o.categoryData[cat].sliderAccentColor = ps.o.categoryData[cat].slideshowAccentColor;
      ps.o.categoryData[cat].sliderBackColor = ps.o.categoryData[cat].slideshowBackColor;
      break;
    case 'slider':
      ps.o.categoryData[cat].slideshowAccentColor = ps.o.categoryData[cat].sliderAccentColor;
      ps.o.categoryData[cat].slideshowBackColor = ps.o.categoryData[cat].sliderBackColor;
      break;
  }
  ps.fn.notify('Color settings for <i>'+ ps.fn.toDisplay(cat) +'</i> are normalized between Slider and Slideshow views.', '', 4);
  return false;
});

$(document).on('click', '#toggleCaptions>button', function () {
  var cat = ps.fn.urlvars().cat;
  if (ps.o.categoryData[cat].toggleCaption != 'on'){
    ps.fn.toggleCaptionDisplay(cat, 'on');
  }
  else{
    ps.fn.toggleCaptionDisplay(cat, 'off');
  }
  if(ps.fn.urlvars().section === 'slider') ps.fn.orientateSlider();
  if(ps.fn.urlvars().section === 'slideshow') $('.imagetext').delay(200).toggleClass("showText");
  return false;
});

$(document).on('change', 'input.autologin', function () {
  if ($(this).prop('checked')) localStorage.autologin = 'true';
  else localStorage.autologin = 'false';

});



//  ██╗  ██╗███████╗██╗   ██╗██████╗  ██████╗  █████╗ ██████╗ ██████╗   ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
//  ██║ ██╔╝██╔════╝╚██╗ ██╔╝██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗  ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
//  █████╔╝ █████╗   ╚████╔╝ ██████╔╝██║   ██║███████║██████╔╝██║  ██║  █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
//  ██╔═██╗ ██╔══╝    ╚██╔╝  ██╔══██╗██║   ██║██╔══██║██╔══██╗██║  ██║  ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
//  ██║  ██╗███████╗   ██║   ██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝  ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
//  ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝   ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
//

$(document).on('keydown', 'input:not(.renameCategoryField),textarea:not(#noteTextarea)', function (e) {
  if (e.which != 13) e.stopPropagation();
  else {
    $(this).parents('.dialog').siblings('.ui-dialog-buttonpane').find('button').eq(0).click();
    return false;
  }
});

$(document).on('keydown', '#noteTextarea', function (e) {
  if (e.which == 13 && (e.ctrlKey || e.metaKey)) $(this).parents('.dialog').siblings('.ui-dialog-buttonpane').find('button').eq(0).click();
});

$(document).on('keyup', function (e) {
  if (e.target.nodeName != 'TEXTAREA' && e.target.nodeName != 'INPUT') {
    switch (e.which) {
      case 49: if (ps.v.categoriesShown[0]) window.location.hash = "slideshow&pid=" + ps.o.photoData[ps.v.categoriesShown[0]][0].filename + "&cat=" + ps.v.categoriesShown[0]; break; //1
      case 50: if (ps.v.categoriesShown[1]) window.location.hash = "slideshow&pid=" + ps.o.photoData[ps.v.categoriesShown[1]][0].filename + "&cat=" + ps.v.categoriesShown[1]; break; //2
      case 51: if (ps.v.categoriesShown[2]) window.location.hash = "slideshow&pid=" + ps.o.photoData[ps.v.categoriesShown[2]][0].filename + "&cat=" + ps.v.categoriesShown[2]; break; //3
      case 52: if (ps.v.categoriesShown[3]) window.location.hash = "slideshow&pid=" + ps.o.photoData[ps.v.categoriesShown[3]][0].filename + "&cat=" + ps.v.categoriesShown[3]; break; //4
      case 53: if (ps.v.categoriesShown[4]) window.location.hash = "slideshow&pid=" + ps.o.photoData[ps.v.categoriesShown[4]][0].filename + "&cat=" + ps.v.categoriesShown[4]; break; //5
      case 54: if (ps.v.categoriesShown[5]) window.location.hash = "slideshow&pid=" + ps.o.photoData[ps.v.categoriesShown[5]][0].filename + "&cat=" + ps.v.categoriesShown[5]; break; //6
      case 55: if (ps.v.categoriesShown[6]) window.location.hash = "slideshow&pid=" + ps.o.photoData[ps.v.categoriesShown[6]][0].filename + "&cat=" + ps.v.categoriesShown[6]; break; //7
      case 56: if (ps.v.categoriesShown[7]) window.location.hash = "slideshow&pid=" + ps.o.photoData[ps.v.categoriesShown[7]][0].filename + "&cat=" + ps.v.categoriesShown[7]; break; //8

      case 67: if (ps.fn.inUrl('slideshow')) $('.captionbutton').trigger('click');
        else $('#codeitem').trigger('click');
        break; //c
      case 80: ps.fn.checkThenOpen(ps.dialogs.$photoconfig); break; //p
      case 85: ps.fn.checkThenOpen(ps.dialogs.$upload); break; //u
      case 78: ps.fn.checkThenOpen(ps.dialogs.$addpane); break; //n
      case 69: $('#editBlogButton').trigger('click'); break; //e
      case 83: ps.fn.switchPhotoDisplay(); break; //s
      case 88: ps.fn.checkThenOpen(ps.dialogs.$settings); break; //x
      case 39: if (ps.fn.inUrl('slideshow')) $('#slideshowcontainer .bigarrowright').trigger('click');
        else if (ps.fn.inUrl('slider')) $('#slidercontainer .bigarrowright').trigger('click');
        break; //right arrow
      case 37: if (ps.fn.inUrl('slideshow')) $('#slideshowcontainer .bigarrowleft').trigger('click');
        else if (ps.fn.inUrl('slider')) $('#slidercontainer .bigarrowleft').trigger('click');
        break;  //left arrow
      case 27: window.location.href = ps.v.photosHash;
        break; //esc
      case 76:
        if (ps.v.isLoggedIn) ps.dialogs.$logout.dialog('open');
        else ps.dialogs.$login.dialog('open');
        break;
      case 65: //a
        if (!$('#dialog-config').isShown()) {
          if (ps.fn.inUrl('slideshow')) $('#addcomment').trigger('click');
          else if (window.location.hash == "#about") window.location.href = ps.v.photosHash;
          else window.location.href = "#about";
        }
        break;
      case 18:
        if ($('.configDialog').isShown()) $('.configDialog').stop().fadeTo(100, 1);
        return false;
        break;

    }
  }
});

$(document).on('keydown', function (e) {
  switch (e.which) {
    case 18:
      if ($('.configDialog').isShown()) $('.configDialog').stop().fadeTo(100, 0.2);
      return false;
      break;
  }
});

$(document).on('keydown', '.contentpane', function (e) {
  switch (e.which) {
    case 13:
      $(this).find('.minipane[data-path="' + ps.o.photoData[this.id][0].filename + '"]').attr('tabindex', '0').focus();
      break;
    case 37:
      $(this).find('#arrowLeft').trigger('click');
      break;
    case 39:
      $(this).find('#arrowRight').trigger('click');
      return false;
      break;
  }
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// window EVENTS ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).resize(function () {
  ps.fn.assignDimensions();
});
