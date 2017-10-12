/**
 * Created by Олег on 03.07.2017.
 */

var mongoose = require ( 'mongoose' );


mongoose.connect( 'mongodb://localhost/test' );

var connection = mongoose.connection;

connection.on( 'error', console.error.bind ( console, 'connection error' ) );
connection.once( 'open', function ( callback ) {

    console.log( 'Successfull connection to db/test' );

});

//

module.exports = {
    mongoose: mongoose,
    connection: connection
};