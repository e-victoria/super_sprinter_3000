export default class FormValitator {

    constructor (form) {
        this.form = form;
    }

    getIsValid() {
        return false;
    }

    getAllInputs() {
        console.log(this.form);
    }

    validateRequired() {

    }

}