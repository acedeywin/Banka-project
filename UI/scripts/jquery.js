
$(window).on('load', () => {

	$('.green-bg').css('background-color', 'rgb(51, 153, 102)')
	//Navigating through the various login pages

	const $adminLogin = $('.admin-login');
	const $userLogin = $('.user-login');
	const $staffLogin = $('.staff-login');

	//Navigate to user login page
	$('.user').click(() => {
		$userLogin.show();
		$adminLogin.hide();
		$staffLogin.hide();
		$('.main').css('background-image', 'linear-gradient(to right bottom, rgba(0, 0, 0, 0.7), rgba(13, 13, 13, 0.7)), url(../images/main.jpeg)');
		$('title').text('Banka | User Login');
	});

	//Navigate to admin login page
	$('.admin').click(() => {
		$userLogin.hide();
		$staffLogin.hide();
		$adminLogin.show();
		$('.admin--main').css('font-size', '5rem');
		$('.main').css('background-image', 'linear-gradient(to right bottom, rgba(0, 0, 0, 0.7), rgba(13, 13, 13, 0.7)), url(../images/admin.jpeg)');
		$('title').text('Banka | Admin Login');
	});

	//Navigate to staff login page
	$('.staff').click(() => {
		$userLogin.hide();
		$adminLogin.hide();
		$staffLogin.show();
		$('.staff--main').css('font-size', '5rem');
		$('.main').css('background-image', 'linear-gradient(to right bottom, rgba(0, 0, 0, 0.7), rgba(13, 13, 13, 0.7)), url(../images/staff.jpeg)');
		$('title').text('Banka | Staff Login');
	});

	//Hide and toggle "Authorized personnel" home link
	$('.hide-personnel').hide();
	$('.personnel').click(() => {
		$('.hide-personnel').toggle();
	})

	//Added elements to the sign-up page
	$('.textbox2').append('<span class="star">*</span>');
	$('.mark').prepend('*').css({'color': '#ff4d4d', 'font-size': '2rem'});
	$('.modal p').prepend('<span class="star">*</span>');
	$('.user').prepend('&#8592; ');
	$('.arrow').append(' &#8594;');

	//Navbar functionalities
	$('.hide-admin-staff').hide();
	$('.hide-show-acct').hide();
	$('.hide-transactions').hide();
	$('.hide-sh-cli-acct').hide();

	$('.admin-staff').click(() => {
		$('.hide-admin-staff').toggle();
	});

	$('.show-acct').click(() => {
		$('.hide-show-acct').toggle();
	});

	$('.sh-cli-acct').click(() => {
		$('.hide-sh-cli-acct').toggle();
	});

	//Admin page background-image
	$('.admin-bg').css('background-image', 'linear-gradient(to right bottom, rgba(0, 0, 0, 0.7), rgba(13, 13, 13, 0.7)), url(../images/admin.jpg)');

	//Staff page background-image
	$('.staff-bg').css('background-image', 'linear-gradient(to right bottom, rgba(0, 0, 0, 0.7), rgba(13, 13, 13, 0.7)), url(../images/staff.jpg)');

	//Space between buttons
	// $('.btn-space').css('margin-right', '6rem');

	//Client create-account functionalities
	$('.create-acct').click(() => {
		$('.create-account').show();
		$('.create-acct').toggleClass('green-bg');
		$('.contact-form').hide();
		$('.contact').removeClass('green-bg');
	});

	$('.contact').click(() => {
		$('.contact-form').show();
		$('.contact').toggleClass('green-bg');
		$('.create-account').hide();
		$('.create-acct').removeClass('green-bg');
	});


	//Admin page functionalities
	$('.hide-view-acct').hide();
	$('.hide-client-acct').hide();

	$('.view-acct').click(() => {
		$('.hide-view-acct').toggle();
	});

	$('.client-acct').click(() => {
		$('.hide-client-acct').toggle();
	});

	$('.user-acct').click(() => {
		$('.create-user-acct').show();
		$('.user-acct').toggleClass('green-bg');
	})	

	//Staff page functionalities
	$('.transactions').click(() => {
		$('.transaction').show();
		$('.transactions').toggleClass('green-bg');
	})

	//Hidden navigation toggle functionalities
	$('.menu').click(() => {
		$('.menu').toggleClass('active');
		$('.overlay').toggleClass('menu-open');
	});

	$('.nav .link').click(() => {
		$('.menu').removeClass('active');
		$('.overlay').removeClass('menu-open');
	});

	//Modal pop-up functionalities
	const $viewButton = $('td button');

	$viewButton.click(() => {
		$('.modal').css('display', 'flex');
		$('.table').css('display', 'none');
	})

	$('.close').click(() => {
		$('.modal').css('display', 'none');
		$('.table').css('display', 'inline');
	})
});

//Year displayed on the page footer
const year = document.querySelector('.year');
const date = new Date(); 
year.innerText = ` Copyright ${date.getFullYear()}. Banka`;


