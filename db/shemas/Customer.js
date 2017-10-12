/**
 * author Oleg .
 */
var mongoose = require ( '../config.js' ).mongoose;



var Customer = mongoose.Schema ( {
    name: {
        type: 'String'
    },
    address: {
        type: 'String'
    },
    phone: {
        type: 'String'
    }

});


exports.Customer = mongoose.model(  'Customer', Customer );