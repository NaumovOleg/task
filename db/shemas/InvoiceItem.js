/**
 * author Oleg .
 */

var mongoose = require ( '../config.js' ).mongoose;


//


var InvoiceItem = mongoose.Schema ( {

    invoice_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Invoice'
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    },
    quantity: {
        type: 'Number'
    }

});


exports.InvoiceItem = mongoose.model ( 'InvoiceItem', InvoiceItem );
