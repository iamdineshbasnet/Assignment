$(document).ready(function () {
	$('.stepper').hide();
	$('.stepper:nth-child(3)').show();

	$('.nextBtn').click(function () {
		var currentStep = $(this).closest('.stepper');
		var nextStep = currentStep.next('.stepper');
		currentStep.hide();
		nextStep.show();

		// Mark current step as completed
		var stepId = currentStep.attr('data-step');
		var stepElement = document.getElementById('step' + stepId);
		stepElement.classList.add('completed');
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
});
