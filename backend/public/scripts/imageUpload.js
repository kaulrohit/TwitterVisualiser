const input = document.querySelector('input[type=file]')

input.addEventListener('change', function(){
	const reader = new FileReader();
	reader.readAsDataURL(input.files[0]);
	reader.onload = function(e) {
		const image = document.getElementById('imageDisplay');
		image.src = e.target.result;
		image.hidden = false;
	};
});