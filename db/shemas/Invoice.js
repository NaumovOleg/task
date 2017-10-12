/**
 * author Oleg .
 */

var mongoose = require ( '../config.js' ).mongoose;
//
var Invoice = mongoose.Schema ( {
    discount: {
        type:'Number'
    },
    total: {
        type: 'Number'
    },
    customer_id           : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Customer'
    }
});
exports.Invoice = mongoose.model ( 'Invoice', Invoice );
