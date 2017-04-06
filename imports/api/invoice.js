import {Meteor} from 'meteor/meteor';

import {ValidatedMethod} from 'meteor/mdg:validated-method';

import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// This Method encodes the form validation requirements.
// By defining them in the Method, we do client and server-side
// validation in one place.
export const insert = new ValidatedMethod({
    name: 'Invoices.methods.insert',
    validate: new SimpleSchema({
        email: {type: String, regEx: SimpleSchema.RegEx.Email},
        description: {type: String, min: 5},
        amount: {type: String}
    }).validator(),
    run(newInvoice) {


        // In here, we can be sure that the newInvoice argument is
        // validated.
        /*
         if (!this.userId) {
         throw new Meteor.Error('Invoices.methods.insert.not-logged-in',
         'Must be logged in to create an invoice.');
         }
         */
        console.log('SUCCESS: Invoice insert: ', newInvoice)
    }
});
