/**
 * Created by ASUS on 06.11.2023.
 */

import {LightningElement, api} from 'lwc';

export default class SingleContact extends LightningElement {

    @api contact;

    get fname() {
        return this.contact?.FirstName;
    }

    get lname() {
        return this.contact?.LastName;
    }

    get title() {
        return this.contact?.Title;
    }

    get email() {
        return this.contact?.Email;
    }

    get phone() {
        return this.contact?.Phone;
    }
}