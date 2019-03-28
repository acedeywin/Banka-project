'use strict';

(() => {


//Declaring objects for selectOption dropdown menu
const identification = [{
	id:'PVC', name: 'Permanent Voters Card'
}, {
	id:'NAT', name: 'National ID Card'
}, {
	id:'IPP', name: 'International Passport'
}];

const account = [{
	id: 'CUR', name: 'Current'
}, {
	id: 'SAV', name: 'Savings'
}];

const sex = [{
	id: 'FL', name: 'Female'
}, {
	id: 'ML', name: 'Male'
}];

const status = [{
	id: 'MAR', name: 'Married'
}, {
	id: 'SNG', name: 'Single'
}, {
	id: 'DIV', name: 'Divorced'
}];

//Method for selecting options
const selectOption = () => {

	const selectId = document.querySelector('.select-id');
	const selectAccount = document.querySelector('.select-account');
	const selectSex = document.querySelector('.select-sex');
	const selectStatus = document.querySelector('.select-status');
     
    identification.forEach((idCard) => {       
        const option = document.createElement('option');
        option.value = idCard.id;
        option.innerText = idCard.name;
        selectId.add(option);
    }); 
        
    account.forEach((actType) => {       
        const option = document.createElement('option');
        option.value = actType.id;
        option.innerText = actType.name;
        selectAccount.add(option);
    });

    sex.forEach((sexType) => {     
        const option = document.createElement('option');
        option.value = sexType.id;
        option.innerText = sexType.name;
        selectSex.add(option);
    });

    status.forEach((statType) => {     
        const option = document.createElement('option');
        option.value = statType.id;
        option.innerText = statType.name;
        selectStatus.add(option);
    });
};
selectOption();

})();

