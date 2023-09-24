$(document).ready(function () {
	// Field selector
	const firstNameField = $('#firstName');
	const lastNameField = $('#lastName');
	const emailField = $('#email');
	const phoneField = $('#phone');
	const countryField = $('#country');
	const provinceField = $('#province');
	const municipalityField = $('#municipality');
	const genderField = $('#gender');

	const imageField = $('#profileImage');
	const previewImage = $('#previewImage');
	const userName = $('.userName');
	const userEmail = $('.email');

	const oldPasswordField = $('#oldPassword');
	const newPasswordField = $('#newPassword');
	const confirmPasswordField = $('#confirmPassword');

	// Error Field selector
	const oldPasswordError = $('.oldPasswordError');
	const newPasswordError = $('.newPasswordError');
	const confirmPasswordError = $('.confirmPasswordError');

	// Flag
	let isEdit = false;

	// variables
	let currentLocation = window.location.href.split('profile.html');
	let email = localStorage.getItem('email');
	let password = localStorage.getItem('password');
	let user = JSON.parse(localStorage.getItem('user'));
	let imageSrc = localStorage.getItem('image');
	let oldPasswordValue, newPasswordValue, confirmPasswordValue;

	console.log(imageSrc, 'image src');
	if (!email && !password) {
		window.location.href = `${currentLocation[0]}index.html`;
	} else {
		initializeProfile(user);
	}

	$('.profileLink').on('click', function () {
		$('.updateDetails').addClass('active');
		$('.changePassword').removeClass('active');
	});
	$('.changePasswordLink').on('click', function () {
		$('.updateDetails').removeClass('active');
		$('.changePassword').addClass('active');
	});

	$('.logoutLink').on('click', function () {
		localStorage.clear();
		window.location.href = `${currentLocation[0]}index.html`;
	});

	function initializeProfile(user) {
		if (user) {
			firstNameField.val(user.firstName);
			lastNameField.val(user.lastName);
			emailField.val(user.email);
			phoneField.val(user.phoneNo);
			provinceField.val(user.province).trigger('change');
			municipalityField.val(user.municipality);
			genderField.val(user.gender).trigger('change');
			userName.text(`${user.firstName} ${user.lastName}`);
			userEmail.text(user.email);
			// previewImage.attr('src', imageSrc)
		}
	}




	// update profiel functionality

	

	// Change Password Functionality
	oldPasswordField.on('input', handleOldPassword);
	newPasswordField.on('input', handleNewPassword);
	confirmPasswordField.on('input', handleConfirmPassword);
	$('.changePasswordBtn').on('click', handleChangePassword);


	function handleOldPassword() {
		const value = oldPasswordField.val();
		if (!value) {
			oldPasswordError.text('required!').addClass('show');
		} else if(newPasswordValue && value === newPasswordValue){
			newPasswordError.text('should not match with old password').addClass('show')
		}else if(newPasswordValue && value !== newPasswordValue){
			newPasswordError.removeClass('show')

		}else {
			oldPasswordError.removeClass('show');
		}
		oldPasswordValue = value;
		console.log(oldPasswordValue, 'old password value')
	}

	function handleChangeOldPassword() {
		const value = oldPasswordField.val();
		if (!value) {
			oldPasswordError.text('required!').addClass('show');
		} else if (password !== value) {
			oldPasswordError.text('invalid password').addClass('show');
		} else {
			oldPasswordError.removeClass('show');
		}
		oldPasswordValue = value;
	}

	function handleNewPassword() {
		const value = newPasswordField.val();
		if (!value) {
			newPasswordError.text('required!').addClass('show');
		} else if (value === oldPasswordValue) {
			newPasswordError
				.text('should not match with old password')
				.addClass('show');
		} else if (value.length < 6) {
			newPasswordError.text('Must be at least 6 character').addClass('show');
		} else if (confirmPasswordValue && value !== confirmPasswordValue) {
			confirmPasswordError.text(`Password didn't Match`).addClass('show');
		} else if(confirmPasswordValue && value === confirmPasswordValue){
			confirmPasswordError.removeClass('show')
		}else if(value !== oldPasswordValue){
			newPasswordError.removeClass('show')
		}
		else {
			newPasswordError.removeClass('show');
		}
		newPasswordValue = value;
	}

	function handleConfirmPassword() {
		const value = confirmPasswordField.val();
		if (!value) {
			confirmPasswordError.text('required!').addClass('show');
		} else if (newPasswordValue !== value) {
			confirmPasswordError.text(`Password didn't Match`).addClass('show');
		} else {
			confirmPasswordError.removeClass('show');
		}
		confirmPasswordValue = value;
	}


	function handleChangePassword() {
		handleChangeOldPassword();
		handleNewPassword();
		handleConfirmPassword();

		if(oldPasswordError.hasClass("show") || newPasswordError.hasClass('show') || confirmPasswordError.hasClass('show')){
			return false
		}else{

			localStorage.setItem('password', newPasswordValue)
			password = localStorage.getItem('password')
			newPasswordValue = ""
			oldPasswordValue = ""
			confirmPasswordValue = ""
			newPasswordField.val("")
			confirmPasswordField.val("")
			oldPasswordField.val("")
			return true
		}


	}
});
