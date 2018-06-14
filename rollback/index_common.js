
//////////////////////////////////////////////////////////////////////
// jQuery
jQuery.fn.outerHTML = function(s){
	return s
		? this.before(s).remove()
		: jQuery("<p>").append(this.eq(0).clone()).html();
}

//////////////////////////////////////////////////////////////////////
// list all events
var list_all_events = 0;
if (list_all_events){
	var oldJQueryEventTrigger = jQuery.event.trigger;
	jQuery.event.trigger = function( event, data, elem, onlyHandlers ) { 
		console.log( event, data, elem, onlyHandlers ); 
		oldJQueryEventTrigger( event, data, elem, onlyHandlers ); 
	}
}

//////////////////////////////////////////////////////////////////////

var g_editor_opts = {
	lang: 'en',
	fixedBtnPane: true,
	btnsGrps: {
		test: ['strong', 'em'] // Custom nammed group
	},
	btnsDef: {
			// Customizables dropdowns
			align: {
					dropdown: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
					ico: 'justifyLeft'
			},
			image: {
					dropdown: ['insertImage', 'noembed', 'upload'],//, 'base64'],
					ico: 'insertImage'
			},
			//createTable: {
			//	ico: 'createTable',
			//}
	},
	btns: [
//		['createTable'],
			['bold', 'italic', 'underline'],//, 'strikethrough'],
			['formatting'],
			['align'],
			['unorderedList', 'orderedList'],
//		['superscript', 'subscript'],
			['link'],
			['image'],
			['foreColor', 'backColor'],
// 		['preformatted'],
			['horizontalRule'],
			['removeformat'],
			['viewHTML'],
//		['fullscreen', 'close']
			//['undo', 'redo'],
			['script', 'style'],
	],
	autogrow: true,
};

/////////////////////////////////////////////////////////////////

function drawSvg(jobj){
	jobj.each(function(){
		var jobj = $(this),
			svg = jobj.attr('svg'),
			html = svg_obj[svg],
			jhtml = $(html);
		var svgfill = jobj.attr('svgfill'),
				svgsize = jobj.attr('svgsize'),
				svgback = jobj.attr('svgback')
		;
		jhtml
			.find('path,ellipse,circle,polygon')
			.attr('fill', svgfill ? svgfill : '#ffffff')
		;
		if (svgsize){
			jhtml.width(svgsize).height(svgsize)
		}
		if (svgback){
			jobj.css('background-color', svgback);
		}
		jobj.find('svg').remove();
		jobj.prepend(jhtml);
		//console.info(jobj.outerHTML());
	});
}

//////////////////////////////////////////////////////////////////////
 
 function setBalloonNumber(name, num){
	var jobj = $('#topmenu_'+name), jballoon = jobj.find('.balloon'), jtext = jobj.find('.balloon2');
	if (num){
		if (num > 99){
			num = 99;
		}
		var offset = jobj.offset(), x = offset.left, y = offset.top, w = jobj.width(), w1 = num.toString().lenth*10;
		jtext.text(num);
		jballoon.show();
	} else {
		jballoon.hide();
	}
}

//////////////////////////////////////////////////////////////////////
 
function toggleDropmenu(obj, menu){
	var jobj = $(obj), jmenu = $("#dropmenu_"+menu);
	if (jmenu.css('display') != 'none'){
		console.info('toggleDropMenu', 'close');
		jmenu.hide();
	} else {
		console.info('toggleDropMenu', 'open');
		openDropmenu(obj, menu);
	}
}

///////////////////////////////////////////////////////////////////////////

var HIGHLIGHT_BORDER = 2,
		HIGHLIGHT_COLOR0 = 'rgba(0,0,0,0.2)'
		HIGHLIGHT_COLOR1 = 'red';
;
jQuery.fn.highlight = function (bOn){
	if (typeof(bOn) == 'undefined'){
		bOn = 1;	// default
	}
	var offset = this.offset(), w = this.width(), h = this.height(), val = this.attr('highlight');
	if (!offset){
		debugger;
	}
	if (bOn && val != 1){
		// TYPE 2 ON
		this.css('border', HIGHLIGHT_BORDER+'px solid ' + HIGHLIGHT_COLOR1)
			.attr('highlight', '1');
		;
	} else {
		this.css('border', HIGHLIGHT_BORDER+'px solid ' + HIGHLIGHT_COLOR0)
			.attr('highlight', '0');
	}
	return this;
}

///////////////////////////////////////////////////////////////////////////

function setCookie(cname, cvalue, exdays){
	//console.info('setCookie', cname, cvalue);
	var d = new Date();
	if (!exdays){
		exdays = 365;
	}
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

///////////////////////////////////////////////////////////////////////////
	
function getCookie(cname, defaultValue){
	var name = cname + "=";
	var value = null;
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		//console.info(c);
		while (c.charAt(0)==' '){
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0){
			value = c.substring(name.length, c.length);
			break;
		}
	}
	if (typeof(defaultValue)!='undefined' && (value == '' || value === null)){
		value = defaultValue;
		this.setCookie(cname, value);
	}
	return value;
}

///////////////////////////////////////////////////////////////////////////
var email_re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var email_re2 = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


function checkValid(arr){
	var err = 0, jobj = 0;
	arr.forEach(function(name){
		if (!err){
			jobj = $('#'+name),
			val = jobj.val().trim()
			;
			if (jobj.hasClass('nonempty') && val == ''){
				
				err = 'This field cannot be empty';
				
			} else if (jobj.hasClass('isemail')){
				var index = val.indexOf(' ');
				if (index >= 0){
					err = 'Your email contains space at ' + index;
				} else if (val.indexOf('@') == -1){
					err = 'Your email must contain @';
				} else {
					var user = val.split('@')[0],
						domain = val.split('@')[1]
					;
					if (!user || !domain){
						err = 'Your email is invalid in format';
					}
				}
				// final test
				if (!err && !email_re.test(val)){
					err = 'Your email is invalid.';
				}
			}
		}
	});
	
	// clear tooltip
	//jobj.tooltip( "hide" ).attr( "title", "");
	
	jobj.tooltip('hide')
          .attr('data-original-title', '')
          .tooltip('fixTitle')
          .tooltip('show');	
	
	if (err){
		console.error(err);
		
		jobj.highlight(1);
		//jobj.attr('title', err);
		jobj.tooltip('hide')
          .attr('data-original-title', err)
          .tooltip('fixTitle')
          .tooltip('show');	
		
		// http://jsfiddle.net/tj_vantoll/kyBwU/
		jobj.tooltip({
			position: {
				my: 'left center',
				at: 'right+10 center',
				collision: 'none',
			},
			tooltipClass: 'right',
		}).tooltip('show');
		//jerr.text(err);
		
	} else {
		jobj.highlight(0);
	}
	return !err;
}

////////////////////////////////////////////////////////
// scroll to element 
// try to show the element in the middle of the screen
// http://gsgd.co.uk/sandbox/jquery/easing/
////////////////////////////////////////////////////////
var g_scrollingtop = 0;
function scroll2Element(jobj, onCompleted){
	if (g_scrollingtop){
		console.info('skipped scroll2Element...')
		return;
	} else {
		g_scrollingtop = 1;
	}

	//console.info('', jobj);
	var
		//nScreenW = eval(window.innerWidth|| document.documentElement.clientWidth || document.body.clientWidth),
		nScreenY = $(window).scrollTop(),
		nScreenH = eval(window.innerHeight|| document.documentElement.clientHeight || document.body.clientHeight),
		nObjectY = jobj.offset().top,
		nObjectH = jobj.height(),
		nBodyViewH = g_bodyview_level > 1 ? 52 : 0
	;
	var upper = nObjectY - nScreenY - nBodyViewH,
		lower = nScreenY + nScreenH - (nObjectY + nObjectH - nBodyViewH) - 100;
	
	console.info('scroll2Element', 'screenH='+nScreenH, 'y='+nObjectY, 'h='+nObjectH, 'screenY='+nScreenY, 'top='+top, 'upper='+upper, 'lower='+lower);
	
	if (upper > 0 && lower > 0){
		//console.info('skipped scrolling');
		onCompleted && onCompleted();
		g_scrollingtop = 0;
		
	} else {

		// find the new scrolltop
		var top = nObjectY - ((nScreenH - nObjectH) / 2) + nBodyViewH;
		if (top < 0) top = 0;
		
		if (g_lightbox){
			
			// case 1: popup
			$('.featherlight-content').animate({
					scrollTop: top,
				}, 1000, 'swing', function(){
					onCompleted && onCompleted();
					g_scrollingtop = 0;
				}
			);

		} else {
			
			// case 2: window
			//console.error('step 0: ' + $(window).scrollTop()); return;
			var final_val = top,
					initial_val = $(window).scrollTop(),
					diff = final_val - initial_val
			;
			$(window).animate({
						scrollTop: diff,	// assume it will read zero 
					},
					{
						duration: 1000,
						step: function(now, fx){
							$(window).scrollTop(initial_val + now);
						},
						complete: function(){
							onCompleted && onCompleted();
							$(window).scrollTop(final_val);
							g_scrollingtop = 0;
						}
					}
			);
		}
	}
}

///////////////////////////////////////////////////////////////////////////////////

function uploadPhoto(jobj, user_id, act_id, img_id, onSuccess, onError){
	// http://stackoverflow.com/questions/23980733/jquery-ajax-file-upload-php
	// http://geniuscarrier.com/how-to-style-a-html-file-upload-button-in-pure-css/
	// uncomment in php.ini: always_populate_raw_post_data = -1 
	var file_data = jobj.prop('files')[0];   
	//if (!file_data){
		//console.info('skip null file');
	//} else {
	if (file_data){
		var form_data = new FormData();                  
		form_data.append('type', 'ul_img');	// upload image
		form_data.append('user_id', user_id);
		form_data.append('act_id', act_id);
		form_data.append('img_id', img_id);
		form_data.append('file', file_data);
		console.info('image uploading...', user_id, act_id, img_id, file_data);
		$.ajax({
			url: './svrop.php', // point to server-side PHP script 
			dataType: 'text',  	// what to expect back from the PHP script, if anything
			cache: false,
			contentType: false,
			processData: false,
			data: form_data,
			type: 'post',
			success: function(resp){
				var bError = 0;
				//console.info(resp);
				if (resp){
					try {
						resp = JSON.parse(resp);
						if (resp.error == ''){
							img_id = resp.img_id;
							console.info('image upload success', 'img_id='+img_id); // display response from the PHP script, if any
							onSuccess & onSuccess(img_id);
						} else {
							bError = 1;
						}
					} catch(e){
						bError = 1;
						console.info('Server error', resp);
						resp.error = 'Server error';
					}
					if (bError){
						console.error('image upload error', resp);
						onError & onError(resp);
						BootstrapDialog.show({
							type: BootstrapDialog.TYPE_DANGER,
							title: 'Error: Cannot upload image',
							closable: true,
							closeByBackdrop: true,
							closeByKeyboard: true,
							message: resp.error + '<br/><br/>Is the file invalid or too big?',
							buttons: [{
								label: 'Close',
								action: function(dialogRef){
									dialogRef.close();
								}
              }],
						});
					}
				}
				jobj.val('');	// reset the file contents
				//console.info($("#input_file").val());
			}
		});
	}
}

/////////////////////////////////////////////////////////////////////////////

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/////////////////////////////////////////////////////////////////////////////

function getBrText(s){
	return s.replace(/(\r\n|\n|\r)/g, '<br />')
}

/////////////////////////////////////////////////////////////////////////////

function sortByNumber(a,b){
	return a - b;
}

/////////////////////////////////////////////////////////////////////////////

function strcmp ( str1, str2 ) {
	// http://kevin.vanzonneveld.net
	// +   original by: Waldo Malqui Silva
	// +      input by: Steve Hilder
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +    revised by: gorthaur
	// *     example 1: strcmp( 'waldo', 'owald' );
	// *     returns 1: 1
	// *     example 2: strcmp( 'owald', 'waldo' );
	// *     returns 2: -1

	return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function sortByDate(a, b){
	if (a.end){
		if (a.end == sPresent && b.end != sPresent){
			return 1;
		} else if (a.end != sPresent && b.end == sPresent){
			return -1;
		}
	}
	// both present or both not present
	if (a.start){
		return strcmp(a.start, b.start);	
	} else if (a.date){
		return strcmp(a.date, b.date);	
	} else {
		return 0;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function jsonclone(obj){
	return JSON.parse(JSON.stringify(obj));
}


/////////////////////////////////////////////////////////////////////////////
// http://stackoverflow.com/questions/201183/how-to-determine-equality-for-two-javascript-objects
// simpleRecusiveDeepEqual
/////////////////////////////////////////////////////////////////////////////
/** Recursively check if both objects are equal in value
***
*** This function is designed to use multiple methods from most probable 
*** (and in most cases) valid, to the more regid and complex method.
***
*** One of the main principles behind the various check is that while
*** some of the simpler checks such as == or JSON may cause false negatives,
*** they do not cause false positives. As such they can be safely run first.
***
*** # !Important Note:
*** as this function is designed for simplified deep equal checks it is not designed
*** for the following
***
*** - Class equality, (ClassA().a = 1) maybe valid to (ClassB().b = 1)
*** - Inherited values, this actually ignores them
*** - Values being strictly equal, "1" is equal to 1 (see the basic equality check on this)
*** - Performance across all cases. This is designed for high performance on the
***   most probable cases of == / JSON equality. Consider bench testing, if you have
***   more 'complex' requirments
***
*** @param  objA : First object to compare
*** @param  objB : 2nd object to compare
*** @param  .... : Any other objects to compare
***
*** @returns true if all equals, or false if invalid
***
*** @license Copyright by eugene@picoded.com, 2012.
***          Licensed under the MIT license: http://opensource.org/licenses/MIT
**/

function deepequal(objA, objB) {
	// Multiple comparision check
	//--------------------------------------------
	var args = Array.prototype.slice.call(arguments);
	if (args.length > 2) {
		for (var a = 1; a < args.length; ++a) {
			if (!deepequal(args[a-1], args[a])) {
				return false;
			}
		}
		return true;
	} else if(args.length < 2) {
		throw "deepequal, requires at least 2 arguments";
	}
	
	// basic equality check,
	//--------------------------------------------
	// if this succed the 2 basic values is equal,
	// such as numbers and string.
	//
	// or its actually the same object pointer. Bam
	//
	// Note that if string and number strictly equal is required
	// change the equality from ==, to ===
	//
	if (objA == objB){
		return true;
	}
	
	// If a value is a bsic type, and failed above. This fails
	var basicTypes = ["boolean", "number", "string"];
	if (basicTypes.indexOf(typeof objA) >= 0 || basicTypes.indexOf(typeof objB) >= 0 ) {
		return false;
	}
	
	// JSON equality check,
	//--------------------------------------------
	// this can fail, if the JSON stringify the objects in the wrong order
	// for example the following may fail, due to different string order:
	//
	// JSON.stringify( {a:1, b:2} ) == JSON.stringify( {b:2, a:1} )
	//
	if (JSON.stringify(objA) == JSON.stringify(objB)) {
		return true;
	}
	
	// Array equality check
	//--------------------------------------------
	// This is performed prior to iteration check,
	// Without this check the following would have been considered valid
	//
	// deepequal( { 0:1963 }, [1963] );
	//
	// Note that u may remove this segment if this is what is intended
	//
	if( Array.isArray(objA) ) {
		//objA is array, objB is not an array
		if( !Array.isArray(objB) ) {
			return false;
		}
	} else if( Array.isArray(objB) ) {
		//objA is not array, objB is an array
		return false;
	}
	
	// Nested values iteration
	//--------------------------------------------
	// Scan and iterate all the nested values, and check for non equal values recusively
	//
	// Note that this does not check against null equality, remove the various "!= null"
	// if this is required
	
	var i; //reuse var to iterate
	
	// Check objA values against objB
	for (i in objA) {
		//Protect against inherited properties
		if(objA.hasOwnProperty(i)) {
			if(objB.hasOwnProperty(i)) {
				// Check if deep equal is valid
				if(!deepequal( objA[i], objB[i] )) {
					console.info('unequal item', i, objA[i], objB[i]);
					return false;
				}
			} else if(objA[i] != null) {
				//ignore null values in objA, that objB does not have
				//else fails
				console.info('unequal nullness1', i, objA[i], objB[i]);
				return false;
			}
		}
	}
	
	// Check if objB has additional values, that objA do not, fail if so
	for (i in objB) {
		if(objB.hasOwnProperty(i)) {
			if(objB[i] != null && !objA.hasOwnProperty(i)) {
				//ignore null values in objB, that objA does not have
				//else fails
				console.info('unequal nullness2', i, objA[i], objB[i]);
				return false;
			}
		}
	}
	
	// End of all checks
	//--------------------------------------------
	// By reaching here, all iteration scans have been done.
	// and should have returned false if it failed
	return true;
}
/*
// Sanity checking of simpleRecusiveDeepEqual
(function() {
	if(
		// Basic checks
		!deepequal({}, {}) ||
		!deepequal([], []) ||
		!deepequal(['a'], ['a']) ||
		// Not strict checks
		!deepequal("1", 1) ||
		// Multiple objects check
		!deepequal( { a:[1,2] }, { a:[1,2] }, { a:[1,2] } ) ||
		// Ensure distinction between array and object (the following should fail)
		deepequal( [1963], { 0:1963 } ) ||
		// Null strict checks
		deepequal( 0, null ) ||
		deepequal( "", null ) ||
		// Last "false" exists to make the various check above easy to comment in/out
		false
	) {
		alert("FATAL ERROR: deepequal failed basic checks");
	} else { 
		//added this last line, for SO snippet alert on success
		alert("deepequal: Passed all checks, Yays!");
	}
})();
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function checkLoseInput(msg, onConfirm){
	var bSuspended = 0;
	// if (g_checkinglostinput) return false;
	// g_checkinglostinput = 1;
	// toggle(true);	// closeall the editables

	var editing_doc = 0;
	if (g_saved_assessment_view){			// for viewing
		var
		 editing = getAssessmentInput(),
		 equal = deepequal(g_saved_assessment_view, editing)
		;
		if (!equal){
			editing_doc = 'assessment';
		}
	} else if (g_saved_assessment_edit){	// for editing
		if ($('.editable-open').length){
			editing_doc = 'assessment';
		} else {
			var 
				editing = getEditAssessment(),
				equal = deepequal(g_saved_assessment_edit, editing)
			;
			//console.info('saved', g_saved_assessment_edit); console.info('editing', editing); console.info('equal', equal?1:0);
			if (!equal){
				editing_doc = 'assessment';
			}
		}
	} else if (g_saved_activity){
		if ($('.editable-open').length){
			editing_doc = 'activity';
		} else {
			var editing = getEditActivity(), equal = deepequal(g_saved_activity, editing);
			//console.info('saved', g_saved_activity); console.info('editing', editing);  console.info('equal', equal?1:0);
			if (!equal){
				editing_doc = 'activity';
			}
		}
	}
	//editing_doc = 'test';
	if (editing_doc){
		msg = 'Are you sure you want to ' + msg + ' on the editing ' + editing_doc + '?';
		if (onConfirm){
			confirmDialog(msg, function(){
					clearAllInputs();
					onConfirm && onConfirm();
				},
				function(){
					g_checkinglostinput = 0;
				}
			);
			bSuspended = 1;
		}
	} else {
		//onSuccess && onSuccess();
		//g_checkinglostinput = 0;
		g_checkinglostinput = 0;

	}

	return bSuspended;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getUserPosition(user){
	return user.position ? user.position.split(',').length?user.position.split(',')[0]:user.position : '';
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function capitalizeWords(s){
	if (s && s.length){
		s = s.substring(0, 1).toUpperCase() + s.substring(1);
	}
	return s;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getImgUrl(img_id, type){
	return img_id ? './svrop.php?type=dl_img&img_id=' + img_id + '&d=' + getDateString2() : './images/new_' + type + '.png';
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateImgPhoto(jobj, img_id, type){

	var url = getImgUrl(img_id, type);
	jobj
		.css('visibility', 'hidden')
		.unbind()
		.load(function(){
			$(this).css('visibility', 'visible')
		})	
		.attr('img_id', img_id)
		.attr('src', url)
	;
}


////////////////////////////////////////////////////////////////////////////////////////

function getSkillByName(skills, name){
	return skills[name];
}

////////////////////////////////////////////////////////////////////////////////////////

function getUserByID(users, user_id){
	var user = 0;
	if (users){
		if ($.isArray(users)){
			for (var index in users){
				var user2 = users[index];
				if (typeof(user2) == 'object' && user2.user_id == user_id){
					user = user2;
					break;
				} else if (user2 == user_id){
					user = user2;
					break;
				}
			}
		} else if (users[user_id]){
			user = users[user_id];
		}
	}
	return user;
}

///////////////////////////////////////////////////////////////////////////////////////////

function addUserIdToObj(obj, user_id){
	if (typeof(user_id) == 'object'){
		for (var key in user_id){
			addUserIdToObj(user_id[key]);
		}
	}
	if (!isNaN(user_id)){
		obj[user_id] = true;
	}
}

///////////////////////////////////////////////////////////////////////////////////////////

function getMarkedPercent(unmarked, marked){
	var percent = !unmarked && marked ? 100 : parseInt(100 * marked / (marked + unmarked));
	if (percent < 100){
		percent = '<span style="color:red">' + percent + '%</span>';
	} else {
		percent += '%';
	}
	return percent;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getCompletedByID(assessment, name, assr_id){
	var completed = 0;
	if (assessment && assessment[name] && assessment[name][assr_id]){
		completed = assessment[name][assr_id];
	}
	return getCompleted(completed);
}

///////////////////////////////////////////////////////////////////////////////////////////////////
	
function getCompleted(completed){
	if (completed < 100){
		 completed = '<span style="color:red">' + completed + '%</span>';
	} else {
		 completed += '%';
	}
	return completed;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function setCompletedByID(assessment, name, assr_id, completed){
	if (!assessment[name]){
		assessment[name] = {};
	}	
	assessment[name][assr_id] = completed;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getObjCount(obj){
	return obj && Object.keys(obj).length;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function isActClosed(activity){
	var closed = 0;
	if (g_server_time < activity.start || g_server_time > activity.end){
		closed = 1;
	}
	return closed;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getStarRating(score){
	return '<!--' + score + '--><div class="star_rating" data-rating="' + score + '"></div>';
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getActivityByID(activities, act_id){
	var activity = 0;
	for (var i in activities){
		var activity2 = activities[i];
		if (activity2.act_id == act_id){
			activity = activity2;
			break;
		}
	}
	return activity;
}

///////////////////////////////////////////////////////////////////////////////////////

function hash2numArr(hasharr){
	if (Array.isArray(hasharr)){
		return hasharr;
	} else {
		var numarr = [];
		for (var key in hasharr){
			numarr.push(key);
		}
		numarr.sort(sortByNumber);
		return numarr;
	}
}

///////////////////////////////////////////////////////////////////////////////////////

function hash2numArr2(hasharr){
	if (Array.isArray(hasharr)){
		return hasharr;
	} else {
		var numarr = [];
		for (var key in hasharr){
			if (!isNaN(key)){
				key = parseInt(key);
			}
			numarr.push(key);
		}
		numarr.sort(sortByNumber);
		return numarr;
	}
}

///////////////////////////////////////////////////////////////////////////////////////

function num2hashArr(numarr){
	var hasharr = {};
	for (var index in numarr){
		var value = numarr[index];
		hasharr[value] = 1;
	}
	return hasharr;
}


///////////////////////////////////////////////////////////////////////////////////////////////////

function getUserImgSrc(img_id){
	return img_id ? image_url + img_id + '&d=' + getDateString2() : './images/new_user.png';
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getActImgSrc(img_id){
	return img_id ? image_url + img_id + '&d=' + getDateString2() : './images/new_activity.png';
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getImgUserName(user_id, users){
	if (typeof(user_id) == 'object'){
		user = user_id;
		user_id = user.user_id;
	} else {
		user = getUserByID(users, user_id);
	}
	if (user){
		var username = user.username ? user.username : user.email ? user.email : '';
		return '<!--' + username + '--><span class="imgusername" onclick="openUserPage(' + user_id + ')"><img class="person_photo" src="' + getUserImgSrc(user.img_id) + '"/> ' + username + '</span>';
	} else {
		return user_id;
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getImgActTitle(act){
	var s = '<!--' + act.title + '-->'
		+ '<table class="tbl_imgactitle imgusername" onclick="viewActivity(' + act.act_id + ')">'
			+ '<tr>'
				+ '<td style="width:1px" valign="top">'
					+ '<img class="activity_photo" src="' + getActImgSrc(act.img_id) + '"/>'
				+ '</td>'
				+ '<td>'
					+ act.title
				+ '</td>'
			+ '</tr>'
		+ '</table>';
	return s;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getUserStat(user){
	var obj = {
		coordinated: 0,
		assessed: 0,
		participated: 0,
	};
	for (var i in user.profile.activity){
		var uact = user.profile.activity[i];
		if (uact.uact_coordinator){
			obj.coordinated++;
		}
		if (uact.uact_assessor){
			obj.assessed++;
		}
		if (uact.uact_participant){
			obj.participated++;
		}
	}
	return obj;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function updateMyUserStat(){
	var obj = getUserStat(g_user);
	g_user.participated = obj.participated;
	g_user.assessed = obj.assessed;
	g_user.coordinated = obj.coordinated;
	$('.stat_network1, .stat_network2').text(g_user.network);
	$('.stat_participated1, .stat_participated2').text(g_user.participated);
	$('.stat_assessed1, .stat_assessed2').text(g_user.assessed);
	$('.stat_coordinated1, .stat_coordinated2').text(g_user.coordinated);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
var g_os = '';
var g_nScreenW = 0, g_nScreenH = 0;

function getHardwareSpec(){
	//alert('initAll');
	if (g_platform == ''){
		g_os = platform.os.toString();
		if (typeof(g_platform) == 'undefined' || !g_platform){
			if (g_os.indexOf('iOS')>=0){
				g_platform = 'ios';
			} else if (g_os.indexOf('Android')>=0){
				g_platform = 'android';
			} else {
				g_platform = 'web';
			}
		}
	}
	g_nScreenW = eval(window.innerWidth|| document.documentElement.clientWidth || document.body.clientWidth);
	g_nScreenH = eval(window.innerHeight|| document.documentElement.clientHeight || document.body.clientHeight);
	//alert(g_os+'\r\n'+g_platform+'\r\n'+g_nScreenW+'x'+g_nScreenH);
	//alert(g_platform);
}
*/
///////////////////////////////////////////////////////////////////////////////////////////
// http://stackoverflow.com/questions/5937339/ipad-safari-make-keyboard-disappear
///////////////////////////////////////////////////////////////////////////////////////////

function hideKeyboard(jobj){
	document.activeElement.blur();
	$("input").blur();
	//console.info(jobj);
	//jobj.focus();
	//alert(1);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
// http://xdsoft.net/jqplugins/datetimepicker/
//////////////////////////////////////////////////////////////////////////////////////////////////////

var g_datetimepicker_opts =	{
	format: 'Y-m-d H:i',
	//className: 'my_datetimepicker',
};
function setDateTimePicker(selector, bDisable){
	var jobj = typeof(selector) == 'string' ? $(selector) : selector;
	var opts = jsonclone(g_datetimepicker_opts);
	opts.onSelectTime = function(){
		console.info('time');
	};
	opts.onShow = function (){
		var jobj2 = $(this);
		jobj2.css({
			'margin-left': 0,
		});
		setTimeout(function () {
			//console.info('onShow', jobj2);
			jobj2.css({
				'margin-left': 80,
			});
		}, 10);
	};
	if (bDisable){
	//	opts.timepicker = false;
	//	opts.datepicker = false;
		opts.onGenerate = function( ct ){
			$(this).find('.xdsoft_date, .xdsoft_time')
				.addClass('xdsoft_disabled');
		};
		jobj
			.find('.event_datetime')
			.prop('disabled', true)
		;
	}
	jobj
		.find('.event_datetime')
		.datetimepicker(opts)
		.focus(function(){
		//	$(this).select();
			//hideKeyboard(jobj);
			$(this).blur();
		})
		.change(function(){
			//console.info(this);
			var jstart = $(this);
			if (jstart.hasClass('start_datetime')){
				var jend = jstart.closest('tr').find('.end_datetime');
				var start = jstart.val(), end = jend.val();
				console.info(start, end);
				if (end < start){
					jend.val(start);
				}
			}
		});		
}

//////////////////////////////////////////////////////////////////////////////////
// http://stackoverflow.com/questions/822452/strip-html-from-text-javascript

function stripHtmlTags(html){
   var tmp = document.implementation.createHTMLDocument("New").body;
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// check with server
function getUsersFromDB(users, onComplete){

	if (!users || !users.length){
		console.info('getUserFromDB no users');
		onComplete && onComplete([]);
	} else {
		// is it an array of objects
		if (typeof(users[0]) == 'object'){
			var users2 = [];
			for (var i in users){
				users2.push(users[i].user_id);
			}
			users = users2;
		}
		if (users.length){
			call_svrop(
				{
					type: 'check_users',
					users: users,
				},
				function (obj){
					//console.info(obj.users);
					onComplete && onComplete(obj.users);
				}
			);
		}
	}
}


///////////////////////////////////////////////////////////////////////////////////////////

function getPrimaryAssessors(coor_id, my_user_id, ass_panelists, uass_panelists){
	var	assessors = {};
	// add coordinator
	if (ass_panelists){
		if (ass_panelists.coordinator == 1){
			addUserIdToObj(assessors, coor_id);
		}
		// add self
		if (ass_panelists.self == 1){
			addUserIdToObj(assessors, my_user_id);
		}
		// add others
		if (ass_panelists.others != '0'){
			for (var index in ass_panelists.others){
				addUserIdToObj(assessors, ass_panelists.others[index]);
			}
		}
		// add uact's peers
		//if (ass_panelists.peers != '0' && uass_panelists && uass_panelists.peer_assessors){
		//	var peers = uass_panelists.peer_assessors;
		//	for (var index in peers){
		//		addUserIdToObj(assessors, peers[index]);
		//	}
		//}
	}
	// reallocate from an object to an array
	var assessors2 = [];
	for (var key in assessors){
		assessors2.push(parseInt(key));
	}
	// sort by number
	assessors2.sort(sortByNumber);
	return assessors2;
}

///////////////////////////////////////////////////////////////////////////////////
// progress
///////////////////////////////////////////////////////////////////////////////////

function initProgress(){
	//NProgress.configure({
	//	template: $('.splash.card').html(),
	//});
}
var g_progress_opened = 0;
function openProgress2(s){
	if (!s) s = 'Processing...';
	//NProgress.start();
	if (!g_progress_opened){
		g_progress_opened = 1;
		waitingDialog.show(s);	// https://github.com/ehpc/bootstrap-waitingfor
	}
}
function closeProgress2(){
	//NProgress.stop();
	if (g_progress_opened){
		waitingDialog.hide();
		g_progress_opened = 0;
	}
}

/////////////////////////////////////////////////////////////////////////
// dialog
/////////////////////////////////////////////////////////////////////////

function confirmDialog(msg, onOkay, onCancel){
	BootstrapDialog.confirm({
		//animate: false,
		type: BootstrapDialog.TYPE_WARNING,
		title: 'Warning',
		closable: true,
		closeByBackdrop: true,
		closeByKeyboard: true,
		message: msg,
		onshown: function(){
			$('.bootstrap-dialog .btn-default').focus();	// set the focus					
		},
		callback: function(result) {
			if (result)	{
				onOkay && onOkay();
			} else {
				onCancel && onCancel();
			}
		},
	});
}

/////////////////////////////////////////////////////////////////////////

function notifyDialog(msg, type){
	//$("body, html").css("overflow", "hidden");
	if (!type){
		type = BootstrapDialog.TYPE_SUCCESS
	}
	BootstrapDialog.alert({
		message: msg,
		//animate: false,
		type: type,
		title: 'Information',
		closable: true,
		closeByBackdrop: true,
		closeByKeyboard: true,
		onshown: function(){
			//$('.bootstrap-dialog .btn-default').focus();	// set the focus					
		},
		onhidden: function(){
			//$("body, html").css("overflow", "auto");
		},
		buttons: [
			{
				label: 'Close',
				action: function(dialog){
						dialog.close();
				}
			}		
		]
	});
}

//////////////////////////////////////////////////////////////////////////////

function errorDialog(msg){
	notifyDialog(msg, BootstrapDialog.TYPE_DANGER);
}

///////////////////////////////////////////////////////////////////////////////

var
	g_bodyview = 0,
	g_bodyview_level = 0,
	g_scrolltop_arr = [],
	g_curr_page = 0,
	g_actionbar = 0,
	g_prev_stack = [];
;
var
	TAB_HOME 			= 1,
	TAB_PROFILE 	= 2,
	TAB_ACTIVITY 	= 3,
	TAB_PEERS 	= 4,
	TAB_SCHEDULE 	= 5
	TAB_POSTAPROJ = 6,
	TAB_GSLEAGUE 	= 7,
	
	PAGE_EDIT_ACT = 20,
	PAGE_VIEW_ACT = 21,
	PAGE_EDIT_ASS = 22,
	PAGE_VIEW_ASS = 23,
	PAGE_VIEW_SKILL = 30,
	PAGE_VIEW_USER = 40,
	
	PAGE_MESSENGER_LIST = 50,
	PAGE_MESSENGER_COMM = 51,
	
	PAGE_WHATSUP = 52
;

var g_bvparams = {};
g_bvparams[TAB_HOME] 				= { level: 1, topmenu: 1, actionbar: 1, div: '#tab_home', name: 'home'};
g_bvparams[TAB_PROFILE]			=	{ level: 1, topmenu: 0, actionbar: 1, div: '#tab_profile', name: 'profile'};
g_bvparams[TAB_ACTIVITY]		=	{	level: 1, topmenu: 0, actionbar: 1,	div: '#tab_activity, #div_activity_list', name: 'activity'};
g_bvparams[TAB_SCHEDULE]		= {	level: 1, topmenu: 0, actionbar: 1,	div: '#tab_schedule', name: 'schedule'};
g_bvparams[TAB_PEERS]				= {	level: 1, topmenu: 0, actionbar: 1,	div: '#tab_peers, #div_peers', name: 'peers', pulldownrefresh: 0};

g_bvparams[TAB_POSTAPROJ] 	= {	level: 1, topmenu: 1, actionbar: 1,	div: '', name: 'postaprj'};
g_bvparams[TAB_GSLEAGUE]		= {	level: 1, topmenu: 1, actionbar: 1,	div: '', name: 'gsleague'};

g_bvparams[PAGE_EDIT_ACT] 	=	{	level: 2, topmenu: 1, actionbar: 0,	div: '#div_activity_edit', name: 'edit_act'};
g_bvparams[PAGE_VIEW_ACT] 	= {	level: 2, topmenu: 1, actionbar: 0,	div: '#div_activity_view', name: 'view_act'};
g_bvparams[PAGE_VIEW_SKILL]	=	{	level: 2, topmenu: 1, actionbar: 0,	div: '#div_skill_breakdown', name: 'view_skill'};
g_bvparams[PAGE_VIEW_USER]	= {	level: 2, topmenu: 1, actionbar: 0,	div: '#div_view_user', name: 'view_user'};

g_bvparams[PAGE_EDIT_ASS] 	= {	level: 3, topmenu: 1, actionbar: 0,	div: '#div_assessment_edit', name: 'edit_ass'};
g_bvparams[PAGE_VIEW_ASS] 	= {	level: 3, topmenu: 1, actionbar: 0,	div: '#div_assessment_view', name: 'view_ass'};
g_bvparams[PAGE_MESSENGER_LIST] 	= {	level: 4, topmenu: 1, actionbar: 0,	div: '#div_messenger_list', name: 'messenger_list'
,pulldownrefresh:0};
g_bvparams[PAGE_MESSENGER_COMM] 	= {	level: 5, topmenu: 1, actionbar: 0,	div: '#div_messenger_comm', name: 'messenger_comm', pulldownrefresh: 0};
g_bvparams[PAGE_WHATSUP] 	= {	level: 6, topmenu: 1, actionbar: 0,	div: '#div_whatsup', name: 'whatsup', pulldownrefresh: 0};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function changeBodyView(page){
	var goback = 0;
	if (page == -1){
		goback = 1;
		// return to the previous page
		if (g_prev_stack.length >= 2){
			g_prev_stack.pop();
			page = g_prev_stack.pop();
		}
	}
	//alert(page + ', ' + g_curr_page + ', ' + g_bodyview_level);
	if (page <= 0){
		// special case used from url for page_view_user or page_view_act
		//alert('special:' + g_platform);
		openHome3();
		checkPlatform();// check platform			
		g_curr_page = 2;
		g_bodyview_level = 2;
		page = TAB_HOME;
	}	
	var param = g_bvparams[page];	
	console.debug('changeBodyView', param.name);
	
	// special operation (e.g. cmenu)
	if (g_curr_page != page){

		///////////////////////////////////////////////////////////
		// CLEAR LIGHTBOX & PROGRESS
		///////////////////////////////////////////////////////////
		closeLightBox();
				
		///////////////////////////////////////////////////////////
		// 3. check for level
		///////////////////////////////////////////////////////////
		var old_level = g_bodyview_level;
		var new_level = param.level;

		if (goback){
			///////////////////////////////////////////////////////
			// go back
			///////////////////////////////////////////////////////
			$('.bodyview_lvl' + param.level).hide();
			if (param.div){
				$(param.div).show();
			}				
			$('.bodyview').hide();
			g_bodyview = $('#bodyview_' + param.level);
			g_bodyview.show();	// or fadeIn();

			// clear all edit after returning level 1
			if (new_level == 1){
				clearAllInputs();
			}
			setTimeout(function(){
				$(window).scrollTop(g_scrolltop_arr[new_level]);
			}, 10);

		} else {

			///////////////////////////////////////////////////////
			// go forth
			///////////////////////////////////////////////////////
			var old_level = g_bodyview_level;
			var new_level = param.level;
			if (page >= PAGE_EDIT_ACT){
				new_level = g_bodyview_level + 1;
			}
			if (new_level != old_level){

				// reserve the current scrolltop
				g_scrolltop_arr[old_level] = $(window).scrollTop();

				$('.bodyview_lvl' + param.level).hide();
				if (param.div){
					$(param.div).show();
				}				
				$('.bodyview').hide();
				g_bodyview = $('#bodyview_' + param.level);
				g_bodyview.show();	// or fadeIn();

				// restore the old scrolltop (after drawing)
				setTimeout(function(){
					$(window).scrollTop(0);
				}, 10);
			}
		}
		// remember the new level
		g_bodyview_level = new_level;
	
		///////////////////////////////////////////////////////////
		// 5. SHOW/HIDE ACTIONBAR & PULLDOWNREFRESH
		///////////////////////////////////////////////////////////
		if (param.actionbar && !g_actionbar){
			showhideactionbar(1);
		} else if (!param.actionbar){
			showhideactionbar(0);
		}
		g_actionbar = param.actionbar;
		
		if (param.pulldownrefresh == 0){
			enabledisablepullrefresh(0);
		} else {
			enabledisablepullrefresh(1);
		}		
		
		if (param.level > 1 || (g_platform != 'web' && !param.topmenu && g_nativeapp == 1)){
			$('#div_topmenu').hide();
		} else {
			$('#div_topmenu').show();
		}
		
		///////////////////////////////////////////////////////////
		// 6. level 1: show the tab
		///////////////////////////////////////////////////////////
		// save for future use
		if (param.level == 1){
			g_prev_stack = [];
			switch (page){
				case TAB_HOME:	case TAB_PROFILE:	case TAB_ACTIVITY:	case TAB_SCHEDULE:	case TAB_PEERS:	case TAB_POSTAPROJ:	case TAB_GSLEAGUE:
					$("#tabs").tabs("option", "active", page-1);
					break;
			}			
		}
		if (g_curr_page){
			g_prev_stack.push(page);
		}
				
		// remember the page
		g_curr_page = page;
	}
	
	// 4 post operation
	switch (page){
		case TAB_ACTIVITY:
			if (!g_init_actlist){
				openActivityList2();
			}
			break;

		case PAGE_MESSENGER_LIST:
			openMessengerList2();
			break;

		case TAB_PEERS:
			//openPeers();
			break;
	}
	// footer
	switch (page){
		
		case TAB_HOME:
			$('#div_footer').show();
			break;
			
		default:
			$('#div_footer').hide();
			break;
	}

	///////////////////////////////////////////////////////////
	// 5. cmenu
	///////////////////////////////////////////////////////////
	switch (page){
		
		case TAB_PROFILE:
			var menuitems = g_profile_menuitems;
			if (!menuitems){
				menuitems = [];
			}
			cmenu({menuitems:menuitems});
			break;

		case TAB_ACTIVITY:
			if (!g_init_actlist){
				openActivityList2();
			}
			cmenu(json);
			break;
			
		case PAGE_VIEW_ACT:
				var json = {
					menuitems:[
						{
							title: 'Information',
							anchor: 'anchor_actview_information',
						},
						{
							title: 'Assessments',
							anchor: 'anchor_actview_assessment',
						},
						{
							title: 'Skills Rating and Comments',
							anchor: 'anchor_actview_impression',
						},
						{
							title: 'Participants',
							anchor: 'anchor_actview_participants',
						},
						{
							title: 'Photos and Videos',
							anchor: 'anchor_actview_photosvideos',
						},
					],
				};
			cmenu(json);
			break;

		default:
			cmenu();	// remove the menu
			break;
	}
	
}

/////////////////////////////////////////////////////////////////////////////////////

function clearAllInputs(){
	g_checkinglostinput = 0;
	g_saved_assessment_view = 0;
	g_saved_assessment_edit = 0;
	g_saved_activity = 0;
}

/////////////////////////////////////////////////////////////////////////////////////

function my_server_url(){
	var url = window.location.href;
	url = url.substring(0, url.lastIndexOf('/') + 1);
	return url;
}

/////////////////////////////////////////////////////////////

function showInvalidInput(jobj, err){
	jobj
		.attr('title', err)
		.tooltip('show')	// bootstrap tooltip is used here https://www.w3schools.com/bootstrap/bootstrap_tooltip.asp
		.highlight(1)
	;
	jobj.focus(function(){
		$(this)
			.highlight(0)
			.tooltip('destroy')
			//.unbind('focus')
		;
	})
}

////////////////////////////////////////////////////////////////////////////
var g_os = '';
var g_nScreenW = 0, g_nScreenH = 0;

function checkPlatform(loginpage){

	// set g_platform
	if (g_platform == ''){
		g_os = platform.os.toString();
		if (typeof(g_platform) == 'undefined' || !g_platform){
			if (g_os.indexOf('iOS')>=0){
				g_platform = 'ios';
			} else if (g_os.indexOf('Android')>=0){
				g_platform = 'android';
			} else {
				g_platform = 'web';
			}
		}
	}
	g_nScreenW = eval(window.innerWidth|| document.documentElement.clientWidth || document.body.clientWidth);
	g_nScreenH = eval(window.innerHeight|| document.documentElement.clientHeight || document.body.clientHeight);
	
	if (loginpage){
		return;
	}
	
	//alert(g_platform);
	switch (g_platform){
		case 'ios':
		case 'android':
			// body scrollbars
			$('body').css({
				//'overflow-y': 'hidden',
				'overflow-x': 'hidden',
			});
			
			$('#web_home, #web_profile').remove();
			
			// hide unused topmenu items
			$('#tbl_topmenu>tbody>tr>td:nth-child(1), #tbl_topmenu>tbody>tr>td:nth-child(3)').hide();

			// smaller image
			$('#home_photo, #profile_photo, #userpage_photo, .activity_photo_edit').css({
				width: 100,
				height: 100,
			});
			$('#tbl_my_profile .userinfo .btn').width(80);
			
			// hide navigation bar
			if (g_nativeapp == ''){
				switch (g_platform){
					case 'ios':
						if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.app && window.webkit.messageHandlers.app.postMessage){
							g_nativeapp = 1;
						}
						break;
					case 'android':
						if (typeof app != "undefined")	{
							g_nativeapp = 1;
						}
						break;
				}
			}
			break;
			
		case 'web':
			if (g_nativeapp == ''){
				g_nativeapp = 0;
			}
			// change to web home, profile and user page
			$('#web_home, #web_profile, #web_userpage').show();
			$('.user_info_col1').hide();

			// home
			$('#mobile_home, #mobile_profile, #mobile_userpage').hide();
			
			// profile
			$('#mobile_home, #mobile_profile').remove();
			
			///////////////////////////////////////////////////////
			// user page
			///////////////////////////////////////////////////////
		
			// rearrange user page
			[
				//'photo', 'username', 'position', 'location', 'mood', 'relationship',
				'tbl_userstat', 'tbl_gauge'
				,'tbl_skills'
				,'div_canvas_userpage'
				,'div_userpage_oclx',
				,'div_userpage_yolox',
			].forEach(function(name){
				$('#web_userpage .td_' + name).append($('#mobile_userpage .' + name));
			});
		
			break;
	}	
	// placeholder (too long)
	setShortPlaceHolder($('#div_activity_edit'));
	
	if (g_platform != 'web' && g_nativeapp == 1){
		// hide 
		//$('.ui-tabs-nav').hide();
		// hide logout button
		$('#topmenu_logout').hide();
	}
}

/////////////////////////////////////////////////////////////////////////////////
var
	g_but_expand_plus = '<i class="glyphicon glyphicon-plus"></i>',
	g_but_expand_minus = '<i class="glyphicon glyphicon-minus"></i>'
;
	
function setExpandable(jbut, jdiv){
	jbut.unbind().click(function(e){
		var display = jdiv.css('display')
		
		var s = '';
		if (display == 'none'){
			console.debug('expand');
			jdiv.slideDown();
			s = g_but_expand_minus;
		} else {
			console.debug('collapse');
			jdiv.slideUp();
			s = g_but_expand_plus;
		}
		jbut.html(s);
	});
	// default
	jbut.html(g_but_expand_plus);
	jdiv.hide();
}	

////////////////////////////////

function removeAllTooltips(){
	//console.debug('removeAllTooltips');
	$('div.tooltip').remove();	
}