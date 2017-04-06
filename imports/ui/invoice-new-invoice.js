import { Template } from 'meteor/templating';

import { insert } from '../api/invoice.js';
import './invoice-new-invoice.html';

Template.Invoices_newInvoice.onCreated(function() {
    this.errors = new ReactiveDict();
});
Template.Invoices_newInvoice.helpers({
    errors(fieldName) {
        return this.errors.get(fieldName);
    }
});
Template.Invoices_newInvoice.events({
    'submit .Invoices_newInvoice'(event, instance) {

        event.preventDefault();
        const data = {
            email: event.target.email.value,
            description: event.target.description.value,
            amount: event.target.amount.value
        };


        insert.call(data, (err, res) => {
            if (err) {
                if (err.error === 'validation-error') {
                    // Initialize error object
                    const errors = {
                        email: [],
                        description: [],
                        amount: []
                    };
                    // Go through validation errors returned from Method
                    err.details.forEach((fieldError) => {
                        // XXX i18n
                        errors[fieldError.name].push(fieldError.type);
                    });
                    // Update ReactiveDict, errors will show up in the UI
                    instance.errors.set(errors);
                }
            }
        });
    }
});
