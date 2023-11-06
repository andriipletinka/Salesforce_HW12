/**
 * Created by ASUS on 06.11.2023.
 */

import {api, LightningElement, wire} from 'lwc';
import {getObjectInfo} from "lightning/uiObjectInfoApi";
import {createRecord} from "lightning/uiRecordApi";
import {ShowToastEvent} from "lightning/platformShowToastEvent";

import CONTACT_OBJECT from '@salesforce/schema/Contact'
import FNAME_FIELD from "@salesforce/schema/Contact.FirstName";
import LNAME_FIELD from "@salesforce/schema/Contact.LastName";
import TITLE_FIELD from "@salesforce/schema/Contact.Title";
import EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import PHONE_FIELD from "@salesforce/schema/Contact.Phone";
import ACCOUNT_FIELD from "@salesforce/schema/Contact.AccountId";

export default class NewContact extends LightningElement {

    @api accountId;

    fname;
    lname;
    title;
    email;
    phone;

    @wire(getObjectInfo, { objectApiName: CONTACT_OBJECT })
    objectInfo;

    get isSubmitDisabled() {
        return !(this.lname && this.email);
    }

    closeModal() {
        this.fname = null;
        this.lname = null;
        this.title = null;
        this.email = null;
        this.phone = null;

        this.dispatchEvent(new CustomEvent('closemodal', {}));
    }

    handleFNameChange(event) {
        this.fname = event.target.value;
    }

    handleLNameChange(event) {
        this.lname = event.target.value;
    }

    handleTitleChange(event) {
        this.title = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handlePhoneChange(event) {
        this.phone = event.target.value;
    }

    submitDetails(event) {
        const fields = {};
        fields[FNAME_FIELD.fieldApiName] = this.fname;
        fields[LNAME_FIELD.fieldApiName] = this.lname;
        fields[TITLE_FIELD.fieldApiName] = this.title;
        fields[EMAIL_FIELD.fieldApiName] = this.email;
        fields[PHONE_FIELD.fieldApiName] = this.phone;
        fields[ACCOUNT_FIELD.fieldApiName] = this.accountId;

        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields};
        createRecord(recordInput)
            .then(contact => {
                this.closeModal();
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact successfully created!',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            })
    }
}