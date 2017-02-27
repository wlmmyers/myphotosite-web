ps.dialogs.$photoconfig = $("#dialog-config").dialog({
  open: function () {
    var winwidth = $(window).width(), winheight = $(window).height();
    if ($('#dialog-config').height() > winheight - 200) {
      $('#dialog-config').height(winheight - 200);
      $('.configDialog').css({ 'top': ((winheight - $('.configDialog').height()) / 2) + 'px' });
    }
    //fix
    $('#dialog-config .searchContainer').attr('data-width', $('#dialog-config .searchContainer').width());
    if ($('.settingsDialog').css('display') == 'block') ps.dialogs.$settings.dialog('close');
    ps.fn.loadingStart($(this), 60, 500);
    ps.fn.refreshPhotoConfigData();
    ps.fn.hideHint();
    ps.fn.addDialogHint($(this), 'Hold <span class = \'italic\'>Alt</span> to make transparent');
    ps.fn.toggleConfigThumbnailAction('disable');
    $('#configSearch-searchText').val('');
    //restrict operator based on type
    var $type = document.getElementById('configSearch-type');
    var operatorsAllowed = $type.options[$type.selectedIndex].getAttribute('data-options-available').split(',');
    for (var x in operatorsAllowed) $('#configSearch-operator').append($('#configSearch-operator-hidden>option:contains(' + operatorsAllowed[x] + ')').clone());

    ps.fn.displayHint( '.configDialog', 'right' , 0, true, null, 1000, '.sortimage', 'mouseup' );
    ps.fn.displayHint( 'button:contains("Toggle Info")', 'bottom' , 0, true, null, 1000 );
    ps.fn.displayHint( '.ui-dialog-title:contains("Photo Configuration")', 'top' , 0, true, null, 1000 );

  },
  close: function () {
    ps.fn.closeNotification();
    ps.fn.hideHint();
    if ($('.configDialog .ui-dialog-titlebar').hasClass('expanded')) $('.configDialog .ui-dialog-titlebar').trigger('dblclick');
  },
  autoOpen: false, resizable: true, width: 950, height: 700, show: "fade", modal: true,
  hide: "fade", dialogClass: "configDialog",
  buttons: {
    "Select": function () {
      var $button = $("span.ui-button-text:contains('Select')");
      ps.fn.toggleConfigThumbnailAction('select', $button);
      ps.v.multipleImagesToDelete = [];
    },
    "Set Thumb": function () {
      var $button = $("span.ui-button-text:contains('Set Thumb')");
      ps.fn.toggleConfigThumbnailAction('thumbnail', $button);
    },
    "Set Background": function () {
      var $button = $("span.ui-button-text:contains('Set Background')");
      ps.fn.toggleConfigThumbnailAction('background', $button);
    },
    "Edit Captions": function () {
      var $button = $("span.ui-button-text:contains('Edit Captions')");
      ps.fn.toggleConfigThumbnailAction('captions', $button);
    },
    "New Pane": function () {
      ps.fn.checkThenOpen(ps.dialogs.$addpane);
    },
    "Toggle Info": function () {
      var $info = $('.configcontent .photoInfo');
      var $all_info = $info.add('.categoryHeader .date-created,.categoryHeader .photo-count');
      if ($info.isShown()) {
        $all_info.hide();
        ps.fn.sortableConfigPhotos_toggleOn();
      }
      else {
        $all_info.show();
        ps.fn.sortableConfigPhotos_toggleOff();
      }
    },
    "General Settings": function () {
      ps.dialogs.$photoconfig.dialog('close');
      ps.dialogs.$settings.dialog('open');
    },
    "Note": function () {
      ps.dialogs.$note.dialog('open');
    },
    "Close": function () {
      $(this).dialog("close");
    }
  }
});

ps.dialogs.$settings = $("#dialog-settings").dialog({
  open: function () {
    ps.fn.hideHint();
    if (ps.fn.urlvars().section === 'photos') ps.fn.removeAddedPanes();
    if ($('.configDialog').isShown()) ps.dialogs.$photoconfig.dialog('close');
    ps.fn.setSettings(ps.fn.urlvars().section);
    ps.fn.toggleContentPaneMouseoverAbility(false);

    ps.fn.displayHint('.settingsDialog', 'left', 0, true, 1000, 'button');
    if(ps.fn.urlvars().section === 'photos') ps.fn.displayHint('#openPhotoConfig button', 'right', 0, true, 3000, 'button');
  },
  close: function () {
    ps.fn.toggleContentPaneMouseoverAbility(true);
    ps.fn.closeNotification();
    ps.fn.hideHint();
  },

  autoOpen: false, resizable: false, width: 380, show: "fade", hide: "fade",
  dialogClass: "settingsDialog",
  buttons: {
    "Logout": function () {
      ps.fn.logout();
      $(this).dialog("close");
    },
    "Update": function () {
      $(this).dialog("close");
      var section = ps.fn.urlvars().section;
      if(section === 'slider' || section === 'slideshow') ps.fn.sendCategoryData(ps.fn.urlvars().cat);
      ps.fn.sendConfig();
    },
    Cancel: function () {
      //if (window.location.hash == ps.v.photosHash) $('.settingsDialog').css({ 'opacity': '1' });
      $(this).dialog("close");

    }
  }
});

ps.dialogs.$login = $("#dialog-login").dialog({
  open: function () {
    if (localStorage.username) {
      $('#username').val(localStorage.username);
      $('#rememberMe').prop('checked', true);
    }
    if (localStorage.password) $('#password').val(localStorage.password);
    if (localStorage.autologin == 'true') $('input.autologin').prop('checked', true);

  },
  autoOpen: false, resizable: false, show: "fade", width: 'auto',
  hide: "fade", dialogClass: "loginDialog", modal: true,
  buttons: {
    "Submit": function () {
      if (($('#username').val() != '') && ($('#password').val() != '')) {
        ps.fn.api.post('php/login.php', {
          'user': $('#username').val(),
          'pass': $('#password').val()
        }).done(function (data) {
          var result = data.message;
          if (result == "cleared") {
            if ($('#rememberMe').prop('checked')){
              localStorage.username = $('#username').val();
              localStorage.password = $('#password').val();
            }
            //if user unchecks the box, delete info from storage
            else{
              if (localStorage.username) localStorage.removeItem('username');
              if (localStorage.password) localStorage.removeItem('password');
            }
            if ($('#autoLogin').prop('checked')) localStorage.autologin = 'true';

            ps.fn.completeLogin('dialog');
            ps.fn.notify('You are logged in');
            ps.dialogs.$login.dialog('close');
          }
          else {
            ps.fn.notify(result, 'error');
          }
        });
      }
      else ps.fn.notify('Please complete all fields', 'alert');
    },
    Cancel: function () {
      ps.dialogs.$login.dialog('close');
    }
  }
});

ps.dialogs.$logout = $("#dialog-logout").dialog({
  open: function () {
     if(localStorage.autologin == 'true') $('input.autologin').prop('checked', true);
  },
  autoOpen: false, resizable: false, show: "fade", width: '300px', minHeight: '200px',
  hide: "fade", dialogClass: "logoutDialog", modal: true,
  buttons: {
    "Logout": function () {
      ps.fn.logout();
      $(this).dialog("close");
    },
    Cancel: function () {
      $(this).dialog("close");
    }
  }
});


ps.dialogs.$code = $("#dialog-code").dialog({
  open: function () {
    $("#codestatus").text('');
    $('#dialog-code input').val('');
    ps.fn.displayHint('.codeDialog', 'left', 0 );
  },
  close: function(){
    ps.fn.hideHint('.codeDialog');
  },
  autoOpen: false, resizable: false, show: "fade", width: 'auto',
  hide: "fade", dialogClass: "codeDialog", modal: true,

  buttons: {
    "Submit": function () {
      var theevent = ps.fn.toUnderscores($('#thecode').val());
      if (theevent != '') {
        if (!ps.fn.processCode(theevent)) {
          if (ps.o.categoryData[theevent] && ps.v.categoriesShown.indexOf(theevent) > -1) ps.fn.notify('That album is already displayed', 'alert');
          else if (ps.o.categoryData[theevent] && ps.o.categoryData[theevent].hidden == '1') {
            ps.dialogs.$code.dialog("close");
            ps.fn.addPane(theevent);
            window.location.href = ps.v.photosHash = ps.fn.addURLparam('addhidden', theevent);
            $('#photos').attr('href', ps.v.photosHash);
            ps.fn.displayHint('URL_bar', 'bottom', 8, false, null, 1000);
          }
          else ps.fn.notify('Code not found', 'error');
        }
      }
      else ps.fn.notify('Please enter a code', 'alert');
    },
    Cancel: function () {
      $(this).dialog("close");
    }
  }
});

ps.dialogs.$addpane = $("#dialog-panetitle").dialog({
  open: function () {
    window.location.hash = ps.v.photosHash;
    $('#isHidden').prop('checked', true);
    $('#isSaveable').prop('checked', false);
    $('#newpanetitle').val('');
  },
  close: function () {
    if (ps.v.returnToUpload) ps.dialogs.$upload.dialog('open');
  },
  autoOpen: false, resizable: false, width: 'auto', show: "fade",
  hide: "fade", dialogClass: "loginDialog", modal: true,
  buttons: {
    "Create": function () {
      var thetitle = $('#newpanetitle').val();
      if (ps.fn.validateString(thetitle)) {
        var newpanetitle = ps.fn.toUnderscores($('#newpanetitle').val());
        var isHidden = $('#isHidden').is(':checked') ? 1 : 0;
        var isSaveable = $('#isSaveable').is(':checked') ? 1 : 0;
        if (ps.fn.validateStringAgainst(newpanetitle, ps.fn.getCategories())) {
          ps.fn.api.post('php/addCat.php', {
            'category': newpanetitle,
            'ishidden': isHidden,
            'issaveable': isSaveable
          }).done(function (data) {
            data = data.message;
            if (data == 'Failed') {
              ps.fn.notify('Failed to add pane', 'error');
            }
            else {
              ps.dialogs.$upload.attr('data-latestcategory' , newpanetitle);
              ps.o.categoryData[newpanetitle] = { 'hidden': isHidden, 'saveable': isSaveable };
              ps.o.photoData[newpanetitle] = [];
              ps.dialogs.$addpane.dialog("close");
              $('#category').html('');
              for (var x in ps.o.categoryData) {
                $('#category').append($("<option value = \"" + x + "\">" + x + "</option>"));
              }
              $('#category').val(newpanetitle);
              if (ps.v.returnToUpload) ps.dialogs.$upload.dialog('open');
              if (isHidden == 0) ps.fn.addPane(newpanetitle);
              ps.fn.checkandAddMainPlaceholder();
              ps.fn.notify('Pane successfully added');
              if($('.configDialog').isShown()) ps.fn.refreshPhotoConfigData();
            }
          });
        }
        else ps.fn.notify('Please enter a unique pane title', 'error');
      }
      else ps.fn.notify('Please enter a valid title', 'error');

    },
    Cancel: function () {
      $(this).dialog("close");
    }
  }
});

ps.dialogs.$upload = $("#dialog-submit").dialog({
  autoOpen: false, resizable: false, width: 'auto', show: "fade",
  hide: "fade", modal: true, dialogClass: "submitDialog",
  open: function () {
    if(ps.fn.getCategories().length === 0) {
      $(this).dialog('close');
      ps.dialogs.$addpane.dialog('open');
      ps.v.returnToUpload = true;
      ps.fn.notify('No categories exist... Create one first!');
    }
    var $catselector = $('#dialog-submit select[name=category]');
    var latestCategory = $('#dialog-submit').attr('data-latestcategory');
    //replace input node (to refresh file upload list)
    //$('#submitform').find('input[type=file]').replaceWith( $('<input>', { 'type' : 'file', 'id' : 'filename0' , 'name' : 'file[]' , 'multiple' : 'multiple'}));
    var allcats = ps.fn.getCategories();
    $catselector.html('');
    for (var x in allcats) {
      $catselector.append($("<option value = \"" + allcats[x] + "\">" + allcats[x] + "</option>"));
    }
    if (latestCategory) $catselector.val(latestCategory);
    ps.v.returnToUpload = false;
  },
  buttons: {
    "Submit": function () {
      if ($('#filename0').val() != '')
        $('#submitform').submit();
      else ps.fn.notify('Please choose files to upload');
    },
    "New Pane": function () {
      $(this).dialog("close");
      ps.dialogs.$addpane.dialog("open");
      ps.v.returnToUpload = true;
    },
    Cancel: function () {
      $(this).dialog("close");
    }

  }
});


ps.dialogs.$editcaption = $("#edit-caption-dialog").dialog({
  open: function () {},
  close: function () {},
  autoOpen: false, show: "fade", width: 700, height: 300, resizable: true,
  hide: "fade", modal: true,
  buttons: {
    Save: function () {
      var imagefor = $('#edit-caption-dialog').attr('data-imagefor');
      var caption = $('#edit-caption-dialog>textarea').val();
      $('.sortableContainer .sortimage[data-filename="'+ imagefor +'"').parent().attr('data-caption', caption);
      //change to only save THIS caption
      ps.fn.api.post('php/updatecaptions.php', {
        'caption': caption,
        'imagefor' : imagefor
      }).fail(function () { alert("error"); return false; });
      ps.o.picsCaptions[ps.fn.urlvars().pid] = caption;
      if(ps.fn.inUrl('slideshow')) ps.fn.updateImageText();
      $(this).dialog("close");
    },
    Cancel: function () {
      $(this).dialog("close");
    }
  }
});

ps.dialogs.$comment = $("#comment-dialog").dialog({
  open: function () {
    var commentID = $(this).attr('data-commentid');
    if (typeof commentID === 'undefined' || commentID === false) $(this).attr('data-commentid', Math.random() * 10e16);
  },
  close: function () {
    ps.fn.closeNotification();
    ps.fn.clearForm(ps.dialogs.$comment);
  },
  autoOpen: false, show: "fade", width: 700, resizable: true, hide: "fade", modal: true,
  buttons: {
    Save: function () {
      var commentID = $(this).attr('data-commentid');
      if (ps.fn.validateForm(ps.dialogs.$comment)) {
        var imagefor = ps.fn.urlvars().pid;
        var cat = ps.fn.urlvars().cat;
        var comment = $('#comment_text').val();
        var name = $('#comment_name').val();

        //the comment already exists (edit)
        if (ps.fn.lookupComment(commentID)) {
          ps.o.picsComments[imagefor][ps.fn.lookupComment(commentID)].name = name;
          ps.o.picsComments[imagefor][ps.fn.lookupComment(commentID)].comment = comment;
        }
        else {
          ps.o.picsComments[imagefor].push({ 'commentid': commentID, 'name': name, 'comment': comment, 'sessionid': ps.fn.getCookie('sessionid') });
        }

        var commentData = ps.o.picsComments[imagefor];
        ps.o.photoData[cat][ps.fn.lookupPhoto(imagefor,cat)].comments = commentData;
        var commentString = JSON.stringify(commentData);

        ps.fn.api.post('php/setcomments.php', {
          'sessionid' : ps.fn.getCookie('sessionid'),
          'imagefor': imagefor,
          'data': commentString
        }).done(function () {
          ps.fn.updateImageText();
          ps.fn.clearForm(ps.dialogs.$comment);
        }).fail(function () { alert("error"); return false; });
        $(this).dialog("close");
      }
    },
    Cancel: function () {
      $(this).dialog("close");
    }
  }
});

ps.dialogs.$note = $("#note-dialog").dialog({
  open: function () {
    // TODO: first, cry. then, use a GET request here and remove `action` param
    ps.fn.api.post('php/handleNote.php', {
      'action': 'get',
      'note_id': 1
    }).done(function (data) {
      $('#noteTextarea').val(data.result);
    }).fail(function () { alert("error"); return false; });
  },
  close: function () { },
  autoOpen: false, show: "fade", width: 700, height: 500, resizable: true,
  hide: "fade", modal: true,
  buttons: {
    Save: function () {
      // TODO: remove `action` param
      ps.fn.api.post('php/handleNote.php', {
        'action': 'set',
        'note_text': $('#noteTextarea').val(),
        'note_id': 1
      }).fail(function () { alert("error"); return false; });
      $(this).dialog("close");
    },
    Cancel: function () {
      $(this).dialog("close");
    }
  }
});

ps.dialogs.$tags = $("#tags-dialog").dialog({
  open: function () {
    var selected = ps.fn.getSelectedConfigImages();
    $('#tagsTextarea').val(ps.o.photoData[ps.fn.lookupCategory(selected[0])][ps.fn.lookupPhoto(selected[0])].tags);
  },
  close: function () { },
  autoOpen: false, show: "fade", width: 700, resizable: true,
  hide: "fade", modal: true,
  buttons: {
    Save: function () {
      var selected = ps.fn.getSelectedConfigImages();
      var tags = $('#tagsTextarea').val();
      var tagsArr = tags.split(',');
      for (var x in selected) {
        var $image = $('#dialog-config .sortableContainer .sortimage[data-imgid=' + selected[x] + ']');
        ps.o.photoData[ps.fn.lookupCategory(selected[x])][ps.fn.lookupPhoto(selected[x])].tags = tags;
        $image.siblings('.photoTags').html('').end().parent().attr('data-tags', tags).end();
        for (var a in tagsArr) if (tagsArr[a] != '') $('#dialog-config .sortableContainer .sortimage[data-imgid=' + selected[x] + ']').siblings('.photoTags').append($('<li>').text(tagsArr[a]));
      }
      ps.fn.sendPhotoData(selected, 'tags');
      ps.fn.clearSelected();
      ps.fn.notify('Tags updated');
      $(this).dialog('close');
    },
    Clear: function () {
      var selected = ps.fn.getSelectedConfigImages();
      for (var x in selected) {
        var $image = $('#dialog-config .sortableContainer .sortimage[data-imgid=' + selected[x] + ']');
        ps.o.photoData[ps.fn.lookupCategory(selected[x])][ps.fn.lookupPhoto(selected[x])].tags = '';
        $image.siblings('.photoTags').html('').parent().attr('data-tags', '');
      }
      ps.fn.sendPhotoData(selected, 'tags');
      ps.fn.clearSelected();
      ps.fn.notify('Tags cleared');
      $(this).dialog('close');
    },
    Cancel: function () {
      $('#tagsTextarea').val('');
      $(this).dialog('close');
    }
  }
});
