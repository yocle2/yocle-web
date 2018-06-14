<?php

include "common.php";
include "database.php";

$email = isset($_COOKIE['email']) ? $_COOKIE['email'] : '';
$email = "alantypoon@gmail.com";
$pwd = isset($_COOKIE['pwd']) ? $_COOKIE['pwd'] : '';
$pwd = "1234";
$login = isset($_COOKIE['login']) ? $_COOKIE['login'] : '';
$login = "1";
$reset_pwd = isset($_COOKIE['reset_pwd']) ? $_COOKIE['reset_pwd'] : '';
setcookie('reset_pwd', '');

$redirect = 1;
if ($email != '' && $pwd != '' && $login == '1'){
	// check secret_token
	$documents = databaseRead($database, 'users', ['email' => $email]);
	if ($documents && sizeof($documents)){
		$user = json_decode(json_encode($documents[0]), true);
		//$reset_pwd = "";
		if ($reset_pwd != ''){
			if ($user['secret_token'] != $reset_pwd){
				echo 'invalid password reset';
				exit();
			} else {
				// RESET PASSWORD HERE AND REMOVE SECRET TOKEN
				$result = databaseUpdate($database, 'users', ['email' => $email], ['$set' => ['pwd' => $pwd, 'secret_token' => '']]);
				// continue login
				$redirect = 0;
			}
		} else if ($user['confirmed_email'] == 0){
			echo 'account not confirmed yet';
			exit();
		} else if ($user['pwd'] == $pwd){
			// login
			$redirect = 0;
		}
	}
}
//$redirect = 1;
if ($redirect){
	header("Location: ./login.php");
	die();
} else {
	echo "<script>var g_user = ".json_encode($user).";</script>";
}
?>

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>YOCLE - Your Out of Classroom Learning Experience</title>
	
	<link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/manifest.json">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
	<meta name="theme-color" content="#ffffff">

	<noscript>Your browser does not support JavaScript!</noscript>
	<script>
		function load_script(path, s){
			s = '<script src="' + path + '" type="text/javascript"><\/script>';
			document.writeln(s);
		}
		function load_css(path, s){
			if (s) path += '?d=' + s;
			s = '<link href="' + path + '"  type="text/css" rel="stylesheet"\/>';
			document.writeln(s);
		}
		function getDateString(){
			var d = new Date();
			return d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString();
		}
		function mobileAndTabletcheck(){
			var check = false;
			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
			return check;
		}
		var g_bProduction =
			window.location.href.indexOf('yolofolio.cetl.hku.hk' ) >= 0
		||
			window.location.href.indexOf('yolofolio2.cetl.hku.hk' ) >= 0
		;
		var g_bIsMobile = mobileAndTabletcheck();			
		var s = getDateString();
		s = '';	// testing only
		
		// Development loader
		// load jqueryui BEFORE bootstrap
		var cssfiles = ''
											+ 'jquery-ui1.css jquery-ui2.css '
											+ 'bootstrap-alan.css bootstrap-editable-alan.css '
											+ 'jquery.datetimepicker.css index.css '
											+ 'toggles.css star-rating-svg.css '
											+ 'bootstrap-wysihtml5-0.0.2.css wysiwyg-color.css '
											+ 'buttons.dataTables.css '
											+ 'arrow-box.css '
											+ 'featherlight.css featherlight.gallery-alan.css '
											+ 'jquery.bxslider.css '
											+ 'bootstrap.min.css '
											//+ 'jquery.dataTables.min.css responsive.dataTables.min.css '
											+ 'jquery.dataTables.css responsive.dataTables.css '
											
				,commonjsfiles = ''
											+ 'jquery-2.2.4-alan.js '
											+ 'dataTables.js '
											+ 'jquery-ui-1.11.4.js '
											+ 'featherlight.js featherlight.gallery.js '
											+ 'jquery.ui.touch-punch.js '	// for mobile touch events
											
											+ 'bootstrap-alan.js '
											+ 'dataTables.responsive.js '
											//+ 'bootstrap.min.js '
											
				,myjsfiles = 'interface.js test_datatable.js';
		;
		
		[cssfiles, commonjsfiles, myjsfiles].forEach(function(files){
			if (files){
				files.split(' ').forEach(function(file){
					if (file.indexOf('.css') > 0){
						load_css('./'+file, s);
					} else if (file.indexOf('.js') > 0){
						load_script('./'+file, s);
					}
				})
			}
		});

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		window.onload = function(){
			var dt_ops = {
				responsive: true,
				//order: [[ 2, "asc" ]],
				dom: '',
				language:{
					emptyTable: '',
					zeroRecords: '',
				},
				autoWidth: false,
				columnDefs: [
					{	targets: 0, className: 'dt-left',},
					{	targets: 1, className: 'dt-left',},
		//			{	targets: 1,	visible: true,},
		//			{	targets: 2,	type: 'string',	},
		//			{	targets: 4,	visible: true,	searchable: false,	orderable : false, },
				],
			};			
			var dt = $('.my_datatable').addClass('nowrap').DataTable(dt_ops);
			//$('.my_datatable>tbody').html('<tr role="row" class="odd"><td tabindex="0">Parachute Diving (YOLO-X)</td><td class="sorting_1"><!--02000084775-->Closed</td><td>Participant</td><td><button type="button" class="btn btn-sm btn-list-edit" onclick="viewActivity(getActIdFromRow(this))" data-toggle="tooltip" title="" data-original-title="View"><i class="glyphicon glyphicon-eye-open"></i></button></td></tr><tr role="row" class="even"><td tabindex="0">test act 7 (OCL-X)</td><td class="sorting_1"><!--02000004135-->Closed</td><td>Coordinator</td><td><button type="button" class="btn btn-sm btn-list-edit" onclick="viewActivity(getActIdFromRow(this))" data-toggle="tooltip" title="" data-original-title="View"><i class="glyphicon glyphicon-eye-open"></i></button></td></tr><tr role="row" class="odd"><td tabindex="0">Post-earthquake Visit to Sichuan (OCL-X)</td><td class="sorting_1"><!--00000000000-->Unpublished</td><td>Coordinator</td><td><button type="button" class="btn btn-sm btn-list-edit" onclick="editActivity(getActIdFromRow(this))" data-toggle="tooltip" title="" data-original-title="Edit"><i class="glyphicon glyphicon-edit"></i></button></td></tr><tr role="row" class="even"><td tabindex="0">Beyond Our Borders: Experience Taiwan and South Korea (OCL-X)</td><td class="sorting_1"><!--00001032664-->~1 year to close</td><td>Assessor</td><td><button type="button" class="btn btn-sm btn-list-edit" onclick="viewActivity(getActIdFromRow(this))" data-toggle="tooltip" title="" data-original-title="View"><i class="glyphicon glyphicon-eye-open"></i></button></td></tr><tr role="row" class="odd"><td tabindex="0">Science Society Open Day (OCL-X)</td><td class="sorting_1"><!--00000463864-->~10 months to close</td><td>Participant</td><td><button type="button" class="btn btn-sm btn-list-edit" onclick="viewActivity(getActIdFromRow(this))" data-toggle="tooltip" title="" data-original-title="View"><i class="glyphicon glyphicon-eye-open"></i></button></td></tr><tr role="row" class="even"><td tabindex="0">Volunteer at Stocklerbridge Hospital (YOLO-X)</td><td class="sorting_1"><!--00000025324-->~2 weeks to close</td><td>Coordinator</td><td><button type="button" class="btn btn-sm btn-list-edit" onclick="viewActivity(getActIdFromRow(this))" data-toggle="tooltip" title="" data-original-title="View"><i class="glyphicon glyphicon-eye-open"></i></button></td></tr><tr role="row" class="odd"><td tabindex="0">Experiential Learning 2016 (YOLO-X)</td><td class="sorting_1"><!--01000420124-->~9 months to open</td><td>Coordinator</td><td><button type="button" class="btn btn-sm btn-list-edit" onclick="viewActivity(getActIdFromRow(this))" data-toggle="tooltip" title="" data-original-title="View"><i class="glyphicon glyphicon-eye-open"></i></button></td></tr>');
			dt.destroy(false);
			
			$('.my_datatable').addClass('nowrap').DataTable(dt_ops);
			//dt.ajax.reload();
		}
	</script>

</head>
<body>

<!--
TABLE IN TABLE NOT WORKING!!!
<table><tr><td>
-->

<table class="tmp_datatable my_datatable display nowrap no-footer dataTable" dt_type="ref" id="DataTables_Table_6" role="grid" aria-describedby="DataTables_Table_6_info" style="width: 1614px;">
		<thead>
			<tr role="row">
				<td class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_6" rowspan="1" colspan="1" style="width: 5px;" aria-label="&amp;nbsp;: activate to sort column descending" aria-sort="ascending">Title</td>
				<td class="sorting" tabindex="0" aria-controls="DataTables_Table_6" rowspan="1" colspan="1" style="width: 1170px;" aria-label="Question: activate to sort column ascending">Question</td><td class="sorting" tabindex="0" aria-controls="DataTables_Table_6" rowspan="1" colspan="1" style="width: 84px;" aria-label="Word limit: activate to sort column ascending">Word limit</td><td class="sorting" tabindex="0" aria-controls="DataTables_Table_6" rowspan="1" colspan="1" style="width: 74px;" aria-label="Weight%: activate to sort column ascending">Weight%</td><td class="sorting" tabindex="0" aria-controls="DataTables_Table_6" rowspan="1" colspan="1" style="width: 17px;" aria-label="&amp;nbsp;: activate to sort column ascending">&nbsp;</td><td class="sorting" tabindex="0" aria-controls="DataTables_Table_6" rowspan="1" colspan="1" style="width: 48px;" aria-label="
					Add
				: activate to sort column ascending">
					<div class="btn btn-primary but_additem" style="font-size:12px"><span>Add</span></div>
				</td></tr>
		</thead>
	<tbody><tr role="row" class="odd"><td class="sorting_1">1</td><td><div><div data-name="editable_question" data-mode="inline" data-type="wysihtml5" data-title="Enter the question" data-emptytext="(+ Question)" data-showbuttons="bottom" data-placement="bottom" data-inputclass="editable_assessment_title" class="editable_assessment_title editable editable-click" show_trash="0" data-url=""><b>Experience:</b>&nbsp;What have you done and contribute? Briefly describe the activity that you want to reflect upon. Consider what happened and what part your played in it.</div></div></td><td><div data-name="editable_limit" data-mode="popup" data-type="limit" data-title="Word Limit" data-emptytext="N/A" data-showbuttons="bottom" data-placement="top" data-inputclass="editable_normal" class="editable_normal editable editable-click" show_trash="0" data-url=""><span>300 - 500</span></div></td><td><div class="basicLinked ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content hasLinkedSliders"><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 33%;"></span></div></td><td>33%</td><td><button type="button" class="btn btn-danger btn-sm btn-list-trash" onclick="deleteDtRow(this)" data-toggle="tooltip" title="" data-original-title="Remove"><i class="glyphicon glyphicon-trash"></i></button></td></tr><tr role="row" class="even"><td class="sorting_1">2</td><td><div><div data-name="editable_question" data-mode="inline" data-type="wysihtml5" data-title="Enter the question" data-emptytext="(+ Question)" data-showbuttons="bottom" data-placement="bottom" data-inputclass="editable_assessment_title" class="editable_assessment_title editable editable-click" show_trash="0" data-url="">What went well?</div></div></td><td><div data-name="editable_limit" data-mode="popup" data-type="limit" data-title="Word Limit" data-emptytext="N/A" data-showbuttons="bottom" data-placement="top" data-inputclass="editable_normal" class="editable_normal editable editable-click" show_trash="0" data-url=""><span>500 - 1000</span></div></td><td><div class="basicLinked ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content hasLinkedSliders"><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 33%;"></span></div></td><td>33%</td><td><button type="button" class="btn btn-danger btn-sm btn-list-trash" onclick="deleteDtRow(this)" data-toggle="tooltip" title="" data-original-title="Remove"><i class="glyphicon glyphicon-trash"></i></button></td></tr><tr role="row" class="odd"><td class="sorting_1">3</td><td><div><div data-name="editable_question" data-mode="inline" data-type="wysihtml5" data-title="Enter the question" data-emptytext="(+ Question)" data-showbuttons="bottom" data-placement="bottom" data-inputclass="editable_assessment_title" class="editable_assessment_title editable editable-click" show_trash="0" data-url=""><b>Learning:</b> What have you learnt?</div></div></td><td><div data-name="editable_limit" data-mode="popup" data-type="limit" data-title="Word Limit" data-emptytext="N/A" data-showbuttons="bottom" data-placement="top" data-inputclass="editable_normal" class="editable_normal editable editable-click" show_trash="0" data-url=""><span>500 - 1000</span></div></td><td><div class="basicLinked ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content hasLinkedSliders"><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 34%;"></span></div></td><td>34%</td><td><button type="button" class="btn btn-danger btn-sm btn-list-trash" onclick="deleteDtRow(this)" data-toggle="tooltip" title="" data-original-title="Remove"><i class="glyphicon glyphicon-trash"></i></button></td></tr></tbody></table>

<!--
</td></tr></table>
-->
</body>
</html>