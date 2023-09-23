$(document).ready(function () {
	// Flag
	let isEdit = false;
	// Form Input
	const fullName = $('#name');
	const parentName = $('#parent');
	const course = $('#course');
	const rank = $('#rank');
	const participation = $('#participation');
	const attendance = $('#attendance');
	const grade = $('#grade');
	const feedback = $('#feedback');

	// Error Field
	const nameError = $('.nameError');
	const parentError = $('.parentError');
	const courseError = $('.courseError');
	const rankError = $('.rankError');
	const participationError = $('.participationError');
	const attendanceError = $('.attendanceError');
	const gradeError = $('.gradeError');
	const feedbackError = $('.feedbackError');

	// variables
	let fullNameValue,
		parentNameValue,
		courseValue,
		rankValue,
		participationValue,
		attendanceValue,
		gradeValue,
		editedRow,
		feedbackValue;

	const tableHead = $('#studentTableHead');
	const tableBody = $('#studentTableBody');
	const searchInput = $('#searchInput');
	$('.addBtn').on('click', function(){
		$('#exampleModal').modal('show');
	})

	let studentData = JSON.parse(localStorage.getItem('studentData')) || [];
	updateTable(studentData);

	// handle search input field
	searchInput.on('input', filterTable);

	// close modal
	$('.closeBtn').on('click', handleClose);
	// Close modal on pressing the "Escape" key
	$(document).on('keydown', function (event) {
		if (event.key === 'Escape') {
			handleClose();
		}
	});

	// Map table headers
	columns.forEach((column) => {
		const th = `<th  class="text-capitalize">${column.label}</th>`;

		tableHead.append(th);
	});

	// update table
	function updateTable(data) {
		localStorage.setItem('studentData', JSON.stringify(data));
		const studentData = JSON.parse(localStorage.getItem('studentData'));
		tableBody.empty();
		loadData(studentData);
	}

	// Load Data
	function loadData(data) {
		// Map the data
		if (data?.length > 0) {
			data.forEach((student, index) => {
				const row = `
				<tr>
						<td scope="row">${index + 1}</td>
						<td class="text-capitalize" style="${ index % 2 === 0 ? 'background: #FFF' : 'background: #e5e5e5'}">${student?.fullName}</td>
						<td>${student?.rank}</td>
						<td class="text-capitalize">${student?.course}</td>
						<td class="text-capitalize">${student?.parent}</td>
						<td>${calculateAttendancePercentage(student?.attendance)}%</td>
						<td class="text-uppercase">${student?.grade}</td>
						<td class="text-capitalize">
							<span class="chip ${student.participation.toLowerCase()}">${
					student?.participation
				}</span>
						</td>
						<td class="text-capitalize">${student?.comments}</td>
						
						<td class="d-flex">
								<i class="fa-regular fa-pen-to-square text-xl pointer text-primary editBtn" 
								data-id="${index}"
								data-name="${student?.fullName}" 
								data-rank="${student?.rank}" 
								data-course="${student?.course}" 
								data-parent="${student?.parent}" 
								data-attendance="${student?.attendance}" 
								data-grade="${student?.grade}" 
								data-comments="${student?.comments}" 
								data-participation="${student?.participation}"></i>
								<i class="fa-solid fa-trash text-xl pointer ml-3 text-red deleteBtn" data-id="${index}"></i>
						</td>
				</tr>
		`;
				tableBody.append(row);
			});
		} else {
			const row = `<tr class="dataNotFound"><td >No data available</td></tr>`;
			tableBody.append(row);
		}
	}

	$(document).on('click', '.editBtn', handleEdit);
	$(document).on('click', '.deleteBtn', handleDelete);

	// handle delete
	function handleDelete() {
		const row = $(this).data('id');

		// Retrieve the current studentData from localStorage
		const storedData = JSON.parse(localStorage.getItem('studentData'));

		// Check if the row is a valid index and remove it from the array
		if (row >= 0 && row < storedData.length) {
			storedData.splice(row, 1);

			// Update localStorage with the modified data
			localStorage.setItem('studentData', JSON.stringify(storedData));

			// Remove the deleted data item from localStorage
			localStorage.removeItem('studentData_' + row);

			// Update the table
			updateTable(storedData);

			studentData = storedData;
		}
	}

	// Handle Edit
	function handleEdit() {
		isEdit = true;
		$('#exampleModal').modal('show');
		const id = $(this).data('id');
		editedRow = id;

		const rowData = {
			fullName: $(this).data('name'),
			rank: $(this).data('rank').toString(),
			course: $(this).data('course'),
			parent: $(this).data('parent'),
			attendance: $(this).data('attendance'),
			grade: $(this).data('grade'),
			participation: $(this).data('participation'),
			comments: $(this).data('comments'),
		};
		fullName.val(rowData.fullName);
		fullNameValue = rowData.fullName;
		parentName.val(rowData.parent);
		parentNameValue = rowData.parent;
		course.val(rowData.course).trigger('change');
		courseValue = rowData.course;
		rank.val(rowData.rank);
		rankValue = rowData.rank;
		participation.val(rowData.participation).trigger('change');
		participationValue = rowData.participation;
		attendance.val(rowData.attendance);
		attendanceValue = rowData.attendance;
		grade.val(rowData.grade).trigger('change');
		gradeValue = rowData.grade;
		feedback.val(rowData.comments).trigger('change');
		feedbackValue = rowData.comments;

		$('.modal-title').text(`Edit ${fullName.val()} Details`);
		$('.submitButton').text('Update');
	}

	function filterTable(event) {
		// get the search input value
		const searchTerm = searchInput.val().toLowerCase();

		const filteredData = studentData.filter((student) => {
			return student.fullName.toLowerCase().includes(searchTerm);
		});

		// Clear existing table rows
		tableBody.empty();

		loadData(filteredData);
	}

	//  calculate attendance in percentage
	function calculateAttendancePercentage(days) {
		return Math.round((days * 100) / 30);
	}

	// Handle Name
	fullName.on('input', handleFullName);
	function handleFullName() {
		const name = fullName.val();
		if (!name) {
			nameError.text('required!').addClass('show');
		} else if (!isValidName(name)) {
			nameError.text('Enter a valid name').addClass('show');
		} else {
			nameError.removeClass('show');
		}
		fullNameValue = name;
	}

	// Handle Parent Name
	parentName.on('input', handleParentName);
	function handleParentName() {
		const name = parentName.val();
		if (!name) {
			parentError.text('required!').addClass('show');
		} else if (!isValidName(name)) {
			parentError.text('Enter a valid name').addClass('show');
		} else {
			parentError.removeClass('show');
		}
		parentNameValue = name;
	}

	// Handle Course
	course.on('input', handleCourse);
	function handleCourse() {
		const value = course.val();
		if (!value) {
			courseError.text('required!').addClass('show');
		} else {
			courseError.removeClass('show');
		}
		courseValue = value;
	}

	// check existed value
	function checkExistence(value){
		if(isEdit){
			return studentData?.filter((data, index)=> data?.rank === value && index !== editedRow)
		}else{
			return studentData?.filter((data) => data?.rank === value)

		}
	}

	// handle Rank
	rank.on('input', handleRank);
	function handleRank() {
		const value = rank.val();
		const isExist = checkExistence(value);
		if (!value) {
			rankError.text('required!').addClass('show');
		} else if (value <= 0) {
			rankError.text('Invalid rank').addClass(show);
		} else if (isExist?.length > 0) {
			rankError.text('already exist!').addClass('show');
		} else {
			rankError.removeClass('show');
		}
		rankValue = value;
	}

	// Handle Participation
	participation.on('input', handleParticipation);
	function handleParticipation() {
		const value = participation.val();
		if (value === '') {
			participationError.text('required!').addClass('show');
		} else {
			participationError.removeClass('show');
		}
		participationValue = value;
	}

	// handle attendance
	attendance.on('input', handleAttendance);
	function handleAttendance() {
		const value = attendance.val();
		if (!value) {
			attendanceError.text('required!').addClass('show');
		} else if (value < 0) {
			attendanceError.text('Invalid!').addClass(show);
		} else if (value > 30) {
			attendanceError.text('Should not exceed 30').addClass('show');
		} else {
			attendanceError.removeClass('show');
		}
		attendanceValue = value;
	}

	// Handle grade
	grade.on('input', handleGrade);
	function handleGrade() {
		const value = grade.val();
		if (!value) {
			gradeError.text('required!').addClass('show');
		} else {
			gradeError.removeClass('show');
		}
		gradeValue = value;
	}
	// Handle grade
	feedback.on('input', handleFeedback);
	function handleFeedback() {
		const value = feedback.val();
		if (!value) {
			feedbackError.text('required!').addClass('show');
		} else {
			feedbackError.removeClass('show');
		}
		feedbackValue = value;
	}

	function isValidName(fullName) {
		var fullNameRegex = /^[A-Za-z\s]+$/u;
		return fullNameRegex.test(fullName);
	}

	$('.submitButton').on('click', function () {
		const isExist = checkExistence(rankValue)
		if (!fullNameValue) {
			nameError.text('required!').addClass('show');
		} else if (!parentNameValue) {
			parentError.text('required!').addClass('show');
		} else if (!courseValue) {
			courseError.text('required!').addClass('show');
		} else if (!rankValue) {
			rankError.text('required!').addClass('show');
		} else if (isExist.length > 0) {
			rankError.text('already exist!').addClass('show');
		}else if (!participationValue) {
			participationError.text('required!').addClass('show');
		} else if (rankValue <= 0) {
			rankError.text('invalid!').addClass('show');
		} else if (attendanceValue < 0) {
			attendanceError.text('invalid!').addClass('show');
		} else if (attendanceValue === '') {
			attendanceError.text('required!').addClass('show');
		}  else if (attendanceValue > 30) {
			attendanceError.text('should not exceed 30').addClass('show');
		}else if (!gradeValue) {
			gradeError.text('required!').addClass('show');
		} else if (!feedbackValue) {
			feedbackError.text('required!').addClass('show');
		} else {
			if (isEdit) {
				studentData[editedRow] = {
					fullName: fullNameValue,
					rank: rankValue,
					course: courseValue,
					parent: parentNameValue,
					attendance: attendanceValue,
					grade: gradeValue,
					participation: participationValue,
					comments: feedbackValue,
				};
			} else {
				studentData.push({
					fullName: fullNameValue,
					rank: rankValue,
					course: courseValue,
					parent: parentNameValue,
					attendance: attendanceValue,
					grade: gradeValue,
					participation: participationValue,
					comments: feedbackValue,
				});
			}

			updateTable(studentData);
			handleClose();
			isEdit = false;
		}
	});

	// handle close
	function handleClose() {
		fullName.val('');
		rank.val('');
		course.val('');
		attendance.val('');
		grade.val('');
		participation.val('');
		feedback.val('');
		parentName.val('');
		fullNameValue = '';
		rankValue = '';
		courseValue = '';
		attendanceValue = '';
		gradeValue = '';
		participationValue = '';
		feedbackValue = '';
		parentNameValue = '';
		nameError.removeClass('show');
		rankError.removeClass('show');
		courseError.removeClass('show');
		parentError.removeClass('show');
		attendanceError.removeClass('show');
		gradeError.removeClass('show');
		participationError.removeClass('show');
		feedbackError.removeClass('show');
		isEdit = false;

		$('.modal-title').text('Add New Student');
		$('.submitButton').text('Add');
		$('#exampleModal').modal('hide');
	}
});
