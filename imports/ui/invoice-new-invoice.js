import {Template} from 'meteor/templating';
import {Session} from 'meteor/session'

import {insert} from '../api/invoice.js';
import './invoice-new-invoice.html';

Template.Invoices_newInvoice.onCreated(function () {
    // this.newerrors = new ReactiveDict();


    Session.set('email', [])
    Session.set('description', [])
    Session.set('amount', [])
});
Template.Invoices_newInvoice.helpers({
    errors(fieldName) {
        return Session.get(fieldName)
        // return this.newerrors.get(fieldName);
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
                    // instance.newerrors.set(errors);
                    Session.set('email', errors)
                    Session.set('description', errors)
                    Session.set('amount', errors)
                }
            }
        });
    }
});
