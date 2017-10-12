/**
 * author Oleg .
 */
var mongoose = require ( '../config.js' ).mongoose;
var Product = require ( '../config.js' ).mongoose;

var Product = mongoose.Schema ( {
    name: {
        type:'String'
    },
    price: {
        type: 'String'
    }
} );


exports.Product = mongoose.model ( 'Product', Product );
