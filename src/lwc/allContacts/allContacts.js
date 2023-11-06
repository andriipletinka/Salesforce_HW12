/**
 * Created by ASUS on 06.11.2023.
 */

import { LightningElement, api, wire, track } from 'lwc';
import getRelatedContacts from '@salesforce/apex/NewAccountController.getRelatedContacts';

export default class AllContacts extends LightningElement {

    @api recordId;
    @track isModalOpen = false;

    @wire(getRelatedContacts, {accountId: '$recordId'})
    retrievedContacts;

    get contactData() {
        return this.retrievedContacts?.data;
    }

    get contactError() {
        return this.retrievedContacts?.error ? JSON.stringify(this.retrievedContacts?.error) : 'no issues';
    }

    createNewContact(event) {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }
}
