export default class popupValitator {

    constructor(popup) {
        this.popup = popup;
    }

    getIsValid() {
        let result;
        const errorMessage = this.popup.querySelectorAll('.popup__error-message');
        const inputsList = this.popup.querySelectorAll('input, textarea, select');

        if (errorMessage) {
            for (let i = 0; i < inputsList.length; i++) {
                inputsList[i].classList.remove('input--error');
            }
            for (let i = 0; i < errorMessage.length; i++) {
                errorMessage[i].textContent = '';
            }
        }
        result = getIsValid();

        if (result) {
            this.popup.setAttribute('isValid', 'true');
        }

        function getIsValid() {
            const areValid = [];
            for (let i = 0; i < inputsList.length; i++) {
                areValid.push(true);
                checkRequiredFields(i);
                checkIfMetMinLength(i);
                checkIfNumberInRange(i);
                checkIfNumValueValid(i);
            }


            function throwError(i, message) {
                inputsList[i].classList.add('input--error');
                for (let i = 0; i < errorMessage.length; i++) {
                    errorMessage[i].textContent = message;
                }
                areValid[i] = false;
            }

            function removeErrorBorder() {
                for (let i = 0; i < areValid.length; i++) {
                    if (areValid[i] === true) {
                        inputsList[i].classList.remove('input--error');
                    }
                }
            }

            function removeErrorMessage() {
                for (let i = 0; i < inputsList.length; i++) {
                    for (let i = 0; i < errorMessage.length; i++) {
                        errorMessage[i].textContent = '';
                    }
                }
            }

            function checkRequiredFields(i) {
                if (inputsList[i].hasAttribute('required') && !inputsList[i].value) {
                    throwError(i, 'Please, fill all the required fields');
                }
            }

            function checkIfMetMinLength(i) {
                if (inputsList[i].hasAttribute('minlength') && inputsList[i].value.length < inputsList[i].getAttribute('minlength')) {
                    throwError(i, `The value should have more, then ${inputsList[i].getAttribute('minlength')} characters`);
                }
            }

            function checkIfNumberInRange(i) {
                if (inputsList[i].getAttribute('type') === 'number' && inputsList[i].getAttribute('min') < inputsList[i].value) {
                    throwError(i, `The value should be higher, then ${inputsList[i].getAttribute('min')}`);
                }
                if (inputsList[i].getAttribute('type') === 'number' && inputsList[i].getAttribute('max') > inputsList[i].value) {
                    throwError(i, `The value should be less, then ${inputsList[i].getAttribute('max')}`);
                }
            }

            function checkIfNumValueValid(i) {
                if (inputsList[i].getAttribute('type') === 'number' && inputsList[i].value % inputsList[i].getAttribute('step') !== 0) {
                    console.log(inputsList[i])
                    throwError(i, `The value should be dividable by ${inputsList[i].getAttribute('step')}`);
                }
            }

            function checkIsTrue(input) {
                return input;
            }

            removeErrorBorder();
            console.log(areValid);
            if (areValid.every(checkIsTrue)) {
                removeErrorMessage();
                return true;
            }
            return false;

        }

        console.log('result: '+ result);

        return result;
    }

}