$(document).ready(function () {
	$('#updateMode').hide();
	$('#editMode').show();
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

	// Error Field Selector
	const firstNameError = $('.firstNameError');
	const lastNameError = $('.lastNameError');
	const emailError = $('.emailError');
	const phoneError = $('.phoneError');
	const provinceError = $('.provinceError');
	const municipalityError = $('.municipalityError');
	const genderError = $('.genderError');

	// variables
	let currentLocation = window.location.href.split('profile.html');
	let email = localStorage.getItem('email');
	let password = localStorage.getItem('password');
	let user = JSON.parse(localStorage.getItem('user'));
	let imageSrc = localStorage.getItem('image');

	let oldPasswordValue,
		newPasswordValue,
		confirmPasswordValue,
		emailValue,
		firstNameValue,
		lastNameValue,
		phoneFieldValue,
		provinceValue,
		municipalityValue,
		genderValue;

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

	$('.editBtn').on('click', function () {
		firstNameField.prop('disabled', false);
		lastNameField.prop('disabled', false);
		emailField.prop('disabled', false);
		phoneField.prop('disabled', false);
		provinceField.prop('disabled', false);
		municipalityField.prop('disabled', false);
		genderField.prop('disabled', false);
		$('#updateMode').show();
		$('#editMode').hide();
	});

	$('.cancelBtn').on('click', function () {
		disableFields()
		initializeProfile(user);
	});
	
	function disableFields(){
		firstNameField.prop('disabled', true);
		lastNameField.prop('disabled', true);
		emailField.prop('disabled', true);
		phoneField.prop('disabled', true);
		provinceField.prop('disabled', true);
		municipalityField.prop('disabled', true);
		genderField.prop('disabled', true);
		firstNameError.removeClass('show');
		lastNameError.removeClass('show');
		$('#updateMode').hide();
		$('#editMode').show();

	}

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

	// update profie functionality

	// Input field event listener
	emailField.on('input', handleEmail);
	firstNameField.on('input', handleFirstName);
	lastNameField.on('input', handleLastName);
	phoneField.on('input', handlePhoneNumber);
	provinceField.on('input', handleProvince);
	municipalityField.on('input', handleMunicipality);
	genderField.on('input', handleGender);

	// check email
	function handleEmail() {
		const value = emailField.val();
		if (!value) {
			emailError.text('required!').addClass('show');
		} else if (!isValidEmail(value)) {
			emailError.text('invalid email!').addClass('show');
		} else {
			emailError.removeClass('show');
		}
		emailValue = value;
	}

	// check first name
	function handleFirstName() {
		const value = firstNameField.val();
		if (!value) {
			firstNameError.text('required!').addClass('show');
		} else if (!isValidName(value)) {
			firstNameError.text('invalid name').addClass('show');
		} else {
			firstNameError.removeClass('show');
		}
		firstNameValue = value;
	}
	// check name
	function handleLastName() {
		const value = lastNameField.val();
		if (!value) {
			lastNameError.text('required!').addClass('show');
		} else if (!isValidName(value)) {
			lastNameError.text('invalid name').addClass('show');
		} else {
			lastNameError.removeClass('show');
		}
		lastNameValue = value;
	}

	// check phone number
	function handlePhoneNumber() {
		const value = phoneField.val();
		if (!value) {
			phoneError.text('required!').addClass('show');
		} else if (!isValidPhone(value)) {
			phoneError
				.text('Number must start with 9 and 10 characters')
				.addClass('show');
		} else {
			phoneError.removeClass('show');
		}
		phoneFieldValue = value;
	}

	// check province
	function handleProvince() {
		const value = provinceField.val();
		if (!value) {
			provinceError.text('required!').addClass('show');
		} else {
			provinceError.removeClass('show');
		}
		provinceValue = value;
	}

	// check municipality/vdc
	function handleMunicipality() {
		const value = municipalityField.val();
		if (!value) {
			municipalityError.text('required!').addClass('show');
		} else if (!isValidName(value)) {
			municipalityError.text('Invalid name!').addClass('show');
		} else {
			municipalityError.removeClass('show');
		}
		municipalityValue = value;
	}

	// check gender
	function handleGender() {
		const value = genderField.val();
		if (!value) {
			genderError.text('required!').addClass('show');
		} else {
			genderError.removeClass('show');
		}
		genderValue = value;
	}

	// Validation
	function isValidEmail(value) {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(value);
	}

	function isValidPhone(value) {
		const mobileNumberRegex = /^9\d{9}$/;
		return mobileNumberRegex.test(value);
	}

	function isValidName(value) {
		const nameRegex = /^[A-Za-z -]{2,}$/;
		return nameRegex.test(value);
	}

	$('.updateBtn').on('click', function () {
		handleFirstName();
		handleLastName();
		handleEmail();
		handlePhoneNumber();
		handleProvince();
		handleMunicipality();
		handleGender();

		if (
			emailError.hasClass('show') ||
			firstNameError.hasClass('show') ||
			lastNameError.hasClass('show') ||
			phoneError.hasClass('show') ||
			provinceError.hasClass('show') ||
			municipalityError.hasClass('show') ||
			genderError.hasClass('show')
		) {
			return false; // if not valid
		} else {
			const data = {
				firstName: firstNameValue,
				lastName: lastNameValue,
				email: emailValue,
				phoneNo: phoneFieldValue,
				province: provinceValue,
				municipality: municipalityValue,
				gender: genderValue,
			};
			localStorage.setItem('user', JSON.stringify(data))
			user = JSON.parse(localStorage.getItem('user'))
			disableFields()
			initializeProfile(user);
		}
	});

	// Change Password Functionality
	oldPasswordField.on('input', handleOldPassword);
	newPasswordField.on('input', handleNewPassword);
	confirmPasswordField.on('input', handleConfirmPassword);
	$('.changePasswordBtn').on('click', handleChangePassword);

	function handleOldPassword() {
		const value = oldPasswordField.val();
		if (!value) {
			oldPasswordError.text('required!').addClass('show');
		} else if (newPasswordValue && value === newPasswordValue) {
			newPasswordError
				.text('should not match with old password')
				.addClass('show');
		} else if (newPasswordValue && value !== newPasswordValue) {
			newPasswordError.removeClass('show');
		} else {
			oldPasswordError.removeClass('show');
		}
		oldPasswordValue = value;
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
			newPasswordError
				.text('Must be at least 6 character')
				.addClass('show');
		} else if (confirmPasswordValue && value !== confirmPasswordValue) {
			confirmPasswordError.text(`Password didn't Match`).addClass('show');
		} else if (confirmPasswordValue && value === confirmPasswordValue) {
			confirmPasswordError.removeClass('show');
		} else if (value !== oldPasswordValue) {
			newPasswordError.removeClass('show');
		} else {
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

		if (
			oldPasswordError.hasClass('show') ||
			newPasswordError.hasClass('show') ||
			confirmPasswordError.hasClass('show')
		) {
			return false;
		} else {
			localStorage.setItem('password', newPasswordValue);
			password = localStorage.getItem('password');
			newPasswordValue = '';
			oldPasswordValue = '';
			confirmPasswordValue = '';
			newPasswordField.val('');
			confirmPasswordField.val('');
			oldPasswordField.val('');
			return true;
		}
	}
});
