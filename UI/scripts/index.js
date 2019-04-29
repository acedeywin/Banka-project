
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
