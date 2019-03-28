'use strict';

(() => {

	const transaction = [{
	id: 'CRE', name: 'Credit'
}, {
	id: 'DEB', name: 'Debit'
}];

const transactionType = () => {

	const selectTransaction = document.querySelector('.select-transaction');

	transaction.forEach((transType) => {     
        const option = document.createElement('option');
        option.value = transType.id;
        option.innerText = transType.name;
        selectTransaction.add(option);
    });
}

transactionType();

}) ();