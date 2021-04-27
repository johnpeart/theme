---
---
// ========================== //
// EMAIL GENERATOR
// ========================== //

function getField(el) {
	var content = document.getElementById(el).value;
	return content;
}

function getRadios(el) {
	var radios = document.getElementsByName(el);
	for (var i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
		  // do whatever you want with the checked radio
		  value = radios[i].value;
		  // only one radio can be logically checked, don't check the rest
		  break;
		}
	}
	return value;
}

function formatPersonalSignature(name, address, phone, email, website, twitter) {
	// Generate the signature
	var signature = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><HTML><HEAD><META content="text/html; charset=utf-8" http-equiv="Content-Type"></HEAD><BODY>
			
	<table style="width: 100%; max-width: 600px;" cellpadding="0" cellspacing="0" border="0">
		<tr>
			<td colspan="2" style="vertical-align: top;" valign="top">
				<span style="display: block; font-size: 12pt; line-height: 1.4; padding-bottom: 14pt;"><strong>`
	signature += name;
	signature += `</strong></span>
			</td>
		</tr>`
	if (phone != '') {
	signature += `<tr>
			<td style="vertical-align: top;" valign="top">
				<span style="font-size: 12pt; font-weight: bold; line-height: 1.4;">phone</span>
			</td>
			<td valign="top">
				<span style="font-size: 12pt; line-height: 1.4;"><a href="tel:`
	signature += phone;
	signature += `" title="Call my number" style="color: #009fe3; text-decoration: none;">`
	signature += phone;
	signature += `</a></span>
			</td>
		</tr>`
	} 
	if (email != '') {
		signature += `<tr>
			<td style="vertical-align: top;" valign="top">
				<span style="font-size: 12pt; font-weight: bold; line-height: 1.4;">email</span>
			</td>
			<td style="vertical-align: top;" valign="top">
				<span style="font-size: 12pt; line-height: 1.4;"><a href="mailto:`
	signature += email;
	signature += `" title="Send me an email" style="color: #009fe3; text-decoration: none;">`
	signature += email;
	signature += `</a></span>
			</td>
		</tr>`
	} 
	if (address != '') {
		signature += `<tr>
			<td style="vertical-align: top;" valign="top">
				<span style="font-size: 12pt; font-weight: bold; line-height: 1.4;">address</span>
			</td>
			<td style="vertical-align: top;" valign="top">
				<span style="font-size: 12pt; line-height: 1.4;">`
	signature += address;
	signature += `</span>
			</td>
		</tr>`
	} 
	if (website != '') {
		signature += `<tr>
			<td style="vertical-align: top;" valign="top">
				<span style="font-size: 12pt; font-weight: bold; line-height: 1.4;">web</span>
			</td>
			<td style="vertical-align: top;" valign="top">
				<span style="font-size: 12pt; line-height: 1.4;"><a href="https://`
	signature += website;
	signature += `" title="Visit my website" style="color: #009fe3; text-decoration: none;">`
	signature += website;
	signature += `</a></span>
			</td>
		</tr>`
	} 
	if (twitter != '') {
		signature += `<tr>
			<td style="vertical-align: top;" valign="top">
				<span style="font-size: 12pt; font-weight: bold; line-height: 1.4;">twitter</span>
			</td>
			<td style="vertical-align: top;" valign="top">
				<span style="font-size: 12pt; line-height: 1.4;"><a href="https://www.twitter.com/`
	signature += twitter;
	signature += `" title="Visit my website" style="color: #009fe3; text-decoration: none;">@`
	signature += twitter;
	signature += `</a></span>
			</td>
		</tr>`
	}
	signature += `</table>
	</BODY></HTML>`;
	
	return signature;
}
function formatWorkSignature(name, role, team, address, phone, email) {
	// Generate the signature
	var signature = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><HTML><HEAD><META content="text/html; charset=utf-8" http-equiv="Content-Type"></HEAD><BODY>
			
	<table style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; width: 100%; max-width: 600px;" cellpadding="0" cellspacing="0" border="0">
		<tr>
			<td rowspan="4" valign="top" style="min-width: 140px; max-width: 140px; padding-right: 10px; vertical-align: top;">
				<div style="border-left: 2px solid #d40072; padding-left: 6px;">
					<img border="0" alt="Logo" width="40" style="display: block; width:40px; height:auto; border:0; clear: both; margin-bottom: 6px;" src="{{ site.url | append: site.baseurl | append: '/assets/images/email/work-logo.png' }}">
					<span style="display: block; font-size: 12pt; line-height: 1.2">Department for<br>Digital, Culture,<br>Media &amp; Sport</span>
				</div>
			</td>
			<td colspan="2" style="vertical-align: top;" valign="top">
				<span style="display: block; font-size: 12pt; line-height: 1.3;"><strong>`
				signature += name;
				signature += `</strong></span>
				<span style="display: block; font-size: 12pt; line-height: 1.3;">`
				signature += role;
				signature += `</span>
				<span style="display: block; font-size: 12pt; line-height: 1.3; margin-bottom: 10px;">`
				signature += team;
				signature += `</span>
			</td>
		</tr>
		<tr>
			<td colspan="2" style="vertical-align: top;" valign="top">
				<span style="display: block; font-size: 12pt; line-height: 1.3; margin-bottom: 10px;">`
				signature += address;
				signature += `</span>
			</td>
		</tr>
		<tr>
			<td style="vertical-align: top;" valign="top">
				<span style="font-size: 12pt; font-weight: bold; line-height: 1.3;">phone</span>
			</td>
			<td style="vertical-align: top;" valign="top">
				<span style="font-size: 12pt; line-height: 1.3;"><a href="tel:`
				signature += phone;
				signature += `" title="Call my number" style="color: #009fe3; text-decoration: none;">`
				signature += phone;
				signature += `</a></span>
			</td>
		</tr>
		<tr>
			<td style="vertical-align: top;" valign="top">
				<span style="font-size: 12pt; font-weight: bold; line-height: 1.3">email</span>
			</td>
			<td style="vertical-align: top;" valign="top">
				<span style="font-size: 12pt; line-height: 1.3;"><a href="mailto:`
				signature += email;
				signature += `" title="Send me an email" style="color: #009fe3; text-decoration: none;">`
				signature += email;
				signature += `</a></span>
			</td>
		</tr>
	</table>
	</BODY></HTML>`;

	return signature;
}

function createSignature() {
	
	var style = getRadios('radio-style');
	
	// Get fields
	
	if (style == 'personal') {
		var name = getField('input-fields--name');
		var address = getField('input-fields--address');
		var phone = getField('input-fields--phone-number');
		var email = getField('input-fields--email');
		var website = getField('input-fields--website');
		var twitter = getField('input-fields--twitter');
		
		var signature = formatPersonalSignature(name, address, phone, email, website, twitter);
		
		// Update the preview
		var parsedoutput = document.getElementById("signature-block");
		parsedoutput.innerHTML = signature;
		// Update the raw HTML output
		var textarea = document.getElementById("html-output");
		textarea.value = signature;
		
	} else if (style == 'work') {
		var name = getField('input-fields--name');
		var role = getField('input-fields--title');
		var team = getField('input-fields--team');
		var address = getField('input-fields--address');
		var phone = getField('input-fields--phone-number');
		var email = getField('input-fields--email');
		
		var signature = formatWorkSignature(name, role, team, address, phone, email);
		
		// Update the preview
		var parsedoutput = document.getElementById("signature-block");
		parsedoutput.innerHTML = signature;
		// Update the raw HTML output
		var textarea = document.getElementById("html-output");
		textarea.value = signature;
	}
	
	
	
}

function copySignature() {
	// Generate preview
	createSignature()
	
	// Check the output format
	var sigOutput = getRadios('radio-output');
	
	if (sigOutput == 'parsed') {
		// Get the parsed block;
		var clipboardContent = document.getElementById('signature-block').outerHTML;
		var clipboardContent = [
			new ClipboardItem(
				{ 
					"text/html": new Blob(
						[clipboardContent], { 
							type: "text/html" 
						}
					) 
				}
			)
		];
		
		navigator.clipboard.write(clipboardContent).then(function() {
		  console.log("Copied to clipboard successfully!");
		}, function() {
		  console.error("Unable to write to clipboard. :-(");
		});
	} else if (sigOutput == 'html') {
		// OR Get the textarea content instead
		var clipboardContent = document.getElementById('html-output');
		var clipboardContent = clipboardContent.value;
		// // Copy to the clipboard
		navigator.clipboard.writeText(clipboardContent);
	}
}