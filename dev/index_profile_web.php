<div id="web_profile" class="web_layout">
	<table width="100%">
		<tr>

			<td class="td_user_skills" rowspan="2" valign="top">

				<table width="100%">

					<tr>
						<td class="td_user_info" rowspan="10" valign="top">

							<!--PHOTO and BUTTON--->
							<table class="tbl_photo">
								<tr>
									<td style="padding-right:10px; text-align:center; width:1px;">

										<img id="profile_photo" class="custom_photo myinfo_photo" src=""><br/>

										<span class="btn_change btn btn-primary div_input_file but_userpage">
											<i class="glyphicon glyphicon-picture"></i> Change
											<input id="inp_user_photo" class="input_file" name="input_file" type="file" accept="image/*"/>
										</span>
									</td>
								</tr>


								<tr>
									<td>
										<span class="btn_preview btn btn-primary but_userpage" onclick="openUserPage(g_user_id)">
											<i class="glyphicon glyphicon-eye-open"></i> View Profile
										</span>
									</td>
								</tr>

								<tr>
									<td align="left">
										<button class="btn btn-primary but_print but_userpage" onclick="goPrintProfile()"><i class="glyphicon glyphicon-print"></i> Print Profile</button>
									</td>
								</tr>

							</table>
						</td>

						<td>

							<!--USER INFO--->
							<table class="tbl_user_info">
								<tr>
									<td style="width:10px">
										<img src="./images/profile_username.png"/>
									</td>
									<td style="padding-top:5px; white-space:no-wrap">
										Name:
									</td>
									<td>
										<div class="editable" style="font-weight:bold; font-size:20px"
											data-name="username"
											data-mode="inline"
											data-type="text"
											data-title="Enter your name"
											data-emptytext="Your name"
											data-inputclass="input_username"
											data-placement="bottom"
											data-showbuttons="bottom"
										></div>
									</td>
								</tr>

								<tr>
									<td>
										<img src="./images/profile_email.png"/>
									</td>
									<td>
										Email:
									</td>
									<td>
										<div class="editable"
											data-name="email"
											data-mode="inline"
											data-type="text"
											data-title="Email"
											data-emptytext=""
											data-inputclass=""
											data-placement="bottom"
											data-showbuttons="bottom"
										></div>
									</td>
								</tr>

								<tr>
									<td>
										<img src="./images/profile_password.png"/>
									</td>
									<td>
										Password:
									</td>
									<td>
										<div class="editable"
											data-name="pwd"
											data-mode="inline"
											data-type="password"
											data-title="Password"
											data-emptytext=""
											data-inputclass=""
											data-placement="bottom"
											data-showbuttons="bottom"
										></div>
									</td>
								</tr>

								<tr>
									<td>
										<img src="./images/profile_birthday.png"/>
									</td>
									<td>
										Birthday:
									</td>
									<td>
										<div class="editable"
											data-name="birthday"
											data-mode="inline"
											data-type="birthday"
											data-title="Please enter your birthday"
											data-emptytext=""
											data-inputclass=""
											data-placement="bottom"
											data-showbuttons="bottom"
										></div>
									</td>
								</tr>

								<tr>
									<td>
										<img src="./images/profile_position.png"/>
									</td>
									<td>
										Position:
									</td>
									<td>
										<div class="editable"
											data-name="position"
											data-mode="inline"
											data-type="text"
											data-title="Please enter your current position"
											data-emptytext="Your current position"
											data-inputclass=""
											data-placement="bottom"
											data-showbuttons="bottom"
										></div>
									</td>
								</tr>

								<tr>
									<td>
										<img src="./images/profile_location.png"/>
									</td>
									<td>
										Location:
									</td>
									<td>
										<div class="editable"
											data-name="location"
											data-mode="inline"
											data-type="text"
											data-title="Please enter your current location"
											data-emptytext="Your current location"
											data-inputclass=""
											data-placement="bottom"
											data-showbuttons="bottom"
										></div>
									</td>
								</tr>

								<tr>
									<td>
										<img src="./images/profile_mood.png"/>
									</td>
									<td>
										Mood:
									</td>
									<td>
										<div
											class="editable"
											data-type="text"

											idx="editable_mood"
											data-typex="typeaheadjs"
											data-pkx="1"

											data-name="mood"
											data-mode="inline"
											data-title="Please enter your mood"
											data-emptytext="Your current mood"
											data-inputclass=""
											data-placement="bottom"
											data-showbuttons="bottom"
										></div>
									</td>
								</tr>

								<tr>
									<td>
										<img src="./images/profile_relationship.png"/>
									</td>
									<td>
										Glue:
									</td>
									<td>
										<div class="editable"
											data-name="relationship"
											data-mode="inline"
											data-type="text"
											data-title="Please enter your relationship"
											data-emptytext="Your current relationship"
											data-inputclass=""
											data-placement="bottom"
											data-showbuttons="bottom"
										></div>
									</td>
								</tr>

							</table>

						</td>
					</tr>

					<tr>
						<td class="td_tbl_skills">
							<div style="padding:10px"><u><b>Generic Skills</b></u></div>
							<table id="tbl_skills_profile" class="tbl_skills display round"></table>
						</td>
					</tr>

					<tr>
						<td class="td_canvas_chart">
							<canvas id="cvs_skills_profile" class="canvas_chart" width="220" height="220"></canvas>
						</td>
					</tr>

				</table>
			</td>
		</tr>
	</table>

</div>
