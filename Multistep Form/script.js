$(document).ready(function () {
	$('.stepper').hide();
	$('.stepper:nth-child(1)').show();

	$('.nextBtn').click(function () {
		var currentStep = $(this).closest('.stepper');
		var nextStep = currentStep.next('.stepper');

		if (validateFields(currentStep)) {
			const step = currentStep.attr('data-step');
			currentStep.hide();
			nextStep.show();

			var stepId = currentStep.attr('data-step');
			var stepElement = document.getElementById('step' + stepId);
			stepElement.classList.add('completed');

			if (step === '1') {
				localStorage.setItem('email', emailValue);
				localStorage.setItem('password', passwordValue);
			} else if (step === '2') {
				const data = {
					firstName: firstNameValue,
					lastName: lastNameValue,
					email: emailValue,
					phoneNo: phoneFieldValue,
					province: provinceValue,
					municipality: municipalityValue,
					gender: genderValue
				};
				localStorage.setItem('user', JSON.stringify(data))
			} else {
				localStorage.setItem('image', imageValue);
			}
		}
	});
	$('.backBtn').click(function () {
		var currentStep = $(this).closest('.stepper');
		var prevStep = currentStep.prev('.stepper');
		currentStep.hide();
		prevStep.show();

		// Remove completed class from the previous step
		var currentStepId = currentStep.attr('data-step');
		var prevStepId = parseInt(currentStepId) - 1;
		var prevStepElement = document.getElementById('step' + prevStepId);
		prevStepElement.classList.remove('completed');
	});

	$('.finishBtn').click(function () {
		if (validateImage) {
			localStorage.setItem('image', imageValue);
			const currentLocation = window.location.href.split('index.html');
			window.location.href = `${currentLocation[0]}profile.html`;
		}
	});

	function validateImage() {
		if (imageError.hasClass('show')) {
			return false;
		}
		return true;
	}

	// Input field selector
	const emailField = $('#email');
	const passwordField = $('#password');
	const confirmPasswordField = $('#confirmPassword');
	const firstNameField = $('#firstName');
	const lastNameField = $('#lastName');
	const phoneField = $('#phone');
	const countryField = $('#country');
	const provinceField = $('#province');
	const municipalityField = $('#municipality');
	const genderField = $('#gender');
	const imageField = $('#profileImage');
	const previewImage = $('#previewImage');

	// Error Field Selector
	const emailError = $('.emailError');
	const passwordError = $('.passwordError');
	const confirmPasswordError = $('.confirmPasswordError');
	const firstNameError = $('.firstNameError');
	const lastNameError = $('.lastNameError');
	const phoneError = $('.phoneError');
	const countryError = $('.countryError');
	const provinceError = $('.provinceError');
	const municipalityError = $('.municipalityError');
	const genderError = $('.genderError');
	const imageError = $('.imageError');

	// input value initialize
	let emailValue,
		passwordValue,
		confirmPasswordValue,
		firstNameValue,
		lastNameValue,
		phoneFieldValue,
		countryValue,
		provinceValue,
		municipalityValue,
		genderValue,
		imageValue = previewImage.attr('src');

	// Input field event listener
	emailField.on('input', handleEmail);
	passwordField.on('input', handlePassword);
	confirmPasswordField.on('input', handleConfirmPassword);
	firstNameField.on('input', handleFirstName);
	lastNameField.on('input', handleLastName);
	phoneField.on('input', handlePhoneNumber);
	provinceField.on('input', handleProvince);
	municipalityField.on('input', handleMunicipality);
	genderField.on('input', handleGender);
	imageField.on('change', handleProfileImage);

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

	// check password
	function handlePassword() {
		const value = passwordField.val();
		if (!value) {
			passwordError.text('required!').addClass('show');
		} else if (value.length < 6) {
			passwordError.text('Must be at least 6 character').addClass('show');
		} else if (confirmPasswordValue && value !== confirmPasswordValue) {
			confirmPasswordError.text(`Password didn't Match`).addClass('show');
		} else if (confirmPasswordValue && value === confirmPasswordValue) {
			confirmPasswordError.removeClass('show');
		} else {
			passwordError.removeClass('show');
		}
		passwordValue = value;
	}

	// check password
	function handleConfirmPassword() {
		const value = confirmPasswordField.val();
		if (!value) {
			confirmPasswordError.text('required!').addClass('show');
		} else if (passwordValue !== value) {
			confirmPasswordError.text(`Password didn't Match`).addClass('show');
		} else {
			confirmPasswordError.removeClass('show');
		}
		confirmPasswordValue = value;
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

	// handle profile image
	function handleProfileImage(event) {
		const selectedFile = event.target.files[0];

		if (selectedFile) {
			const imageURL = URL.createObjectURL(selectedFile);
			imageValue = imageURL
			previewImage.attr('src', imageURL);
			imageError.removeClass('show');
		} else if (event) {
		} else {
			imageError.text('required').addClass('show');
		}
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
	// Validate all fields in the current step
	function validateFields(currentStep) {
		handleEmail();
		handlePassword();
		handleConfirmPassword();

		// Check if current step is the second step (step 2)
		if (currentStep.attr('data-step') === '2') {
			handleFirstName();
			handleLastName();
			handlePhoneNumber();
			handleProvince();
			handleMunicipality();
			handleGender();
		}

		// Check if any of the error fields have the 'show' class
		if (
			emailError.hasClass('show') ||
			passwordError.hasClass('show') ||
			confirmPasswordError.hasClass('show') ||
			(currentStep.attr('data-step') === '2' &&
				(firstNameError.hasClass('show') ||
					lastNameError.hasClass('show') ||
					phoneError.hasClass('show') ||
					provinceError.hasClass('show') ||
					municipalityError.hasClass('show') ||
					genderError.hasClass('show')))
		) {
			return false; // if not valid
		}
		return true; // if valid
	}
});
