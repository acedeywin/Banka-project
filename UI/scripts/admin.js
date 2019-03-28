'use strict';

(() => {

	const account = [{
	id: 'AD', name: 'Admin'
}, {
	id: 'ST', name: 'Staff'
}];

const accountType = () => {

	const selectAccount = document.querySelector('.select-account');

	account.forEach((acctType) => {     
        const option = document.createElement('option');
        option.value = acctType.id;
        option.innerText = acctType.name;
        selectAccount.add(option);
    });
}

accountType();

}) ();