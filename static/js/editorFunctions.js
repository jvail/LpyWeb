$(document).ready(function() {
	if(document.getElementById('submitCode')) {
		document.getElementById('submitCode').onclick = function(event) {
			$.ajax({
				data : {
					LString : $('textarea[name="code"]').val(),
					code : $('textarea[name="code"]').val()
				},
				type : "POST",
				url : '/simulate',
				success: function(data) {
					if(data.error) {
						console.log(data.error)
						$('textarea[name="code"]').text(data.error);
						display(data.error);
					}else {
						$('textarea[name="code"]').text(data.code);
						display(data.LString);
					}
				}
			});
			event.preventDefault();
		};
	}
});

function upload() {
	document.getElementById('hiddenButton').click();
}

function hiddenUpload(editor) {
	let fileInput = document.getElementById('hiddenButton');
	let file = fileInput.files[0];
	console.log(file);
	let uploadFiletype = file.name.split('.')[1];
			
	if (!(uploadFiletype == 'lpy')){
		alert("The imported file isn't a .lpy file. Please choose another one.");
	}
	else{
		fileInput.addEventListener('change', function() {
			let reader = new FileReader();
			reader.addEventListener('load', function() {
				editor.getSession().setValue(reader.result);
			});
			reader.readAsText(file, 'UTF-8');
		});
	}
}

function downloadFile(editor) {
	document.getElementById("modalSaveButton").setAttribute('data-dismiss', 'modal');
	let element = document.createElement('a');
	let inputName = "" + document.getElementById('filename').value;
	if(inputName.length == 0){
		document.getElementById("modalSaveButton").removeAttribute('data-dismiss', 'modal');
	}else {
		if(!(inputName.split('.')[1] == 'lpy')) {
			inputName = inputName + ".lpy";
		}
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(editor.getSession().getValue()));
		element.setAttribute('download', inputName);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
}

function loadExample(editor) {
	
}
/*function loadFromURL(editor) {
	document.getElementById("modalLoadButton").setAttribute('data-dismiss', 'modal');
	let inputURL = document.getElementById('fileURL').value;
	if(inputURL.length == 0){
		document.getElementById("modalLoadButton").removeAttribute('data-dismiss', 'modal');
	}else {
		$.ajax({
			url : inputURL,
			crossDomain: true,
			contentType: 'text/html',
			xhrFields: { withCredentials: false },
			headers: {  'Access-Control-Allow-Origin' : '*' , },
			type : 'GET',
			dataType: 'jsonp',
			success: function(data) {
				$('textarea[name=code]').val(data);
			}
		});
		$('textarea[name=code]').load(inputURL);
		console.log($('textarea[name=code]').val());
	}
}*/