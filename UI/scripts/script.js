
$(document).ready(() => {

	$('.green-bg').css('background-color', 'rgb(51, 153, 102)')
	//Navigating through the various login pages



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
	const $viewButton = $('.view');
	const $resetPassword = $('.reset');

	$viewButton.click(() => {
		$('.modal').css('display', 'flex');
		$('.table').css('display', 'none');
	});

	$('.close').click(() => {
		$('.modal').css('display', 'none');
		$('.table').css('display', 'inline');
	});

	//Reset password pop-up functionalities
	$resetPassword.click(() => {
		$('.modal').css('display', 'flex');
	});

	$('.reset-close').click(() => {
		$('.modal').css('display', 'none');
	});
	$('.reset-cancel').click(() => {
		$('.modal').css('display', 'none');
	});

	//Delete and update buttons functionalities
	const $delete = $('.delete-btn');
	const $update = $('.update-btn');

	$delete.click(() => {
		$('.delete-modal').css('display', 'flex');
	});

	$('.reset-cancel').click(() => {
		$('.delete-modal').css('display', 'none');
	});

	$update.click(() => {
		$('.update-modal').css('display', 'flex');
	});

	$('.reset-cancel').click(() => {
		$('.update-modal').css('display', 'none');
	});
});

//Year displayed on the page footer
const year = document.querySelector('.year');
const date = new Date(); 
year.innerText = ` Copyright ${date.getFullYear()}. Banka`;

const user = [{
	id:'./UI/customer/account-profile.html', name: 'Customer'
}, {
	id:'./UI/admin/admin-profile.html', name: 'Admin'
}, {
	id:'./UI/staff/staff-profile.html', name: 'Staff'
}];





user.forEach((userId) => {  

	const selectUser = document.querySelector('.select-user');
	const signIn = document.querySelector('.signin');

        const option = document.createElement('option');
        option.value = userId.id;
        option.innerText = userId.name;
        selectUser.add(option);
    });


const userSelection = () => {

	const selectUser = document.querySelector('.select-user');
	const signIn = document.querySelector('#signin');

	signIn.addEventListener('click', () => {

		const userOption  = selectUser.options[selectUser.selectedIndex];

		if(userOption != 'nothing'){
		location.href = userOption.value;
		}
	});
} 

userSelection();

