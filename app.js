var express = require ( 'express' ),
    bodyParser = require ( 'body-parser' ),
    http = require ( 'http' ),
    path = require ( 'path' ),
    Sequelize = require ( 'sequelize' ),
    _ = require ( 'lodash' );

var mongoose = require ( './db/config.js' ).mongoose;
var Customer = require ( './db/shemas/Customer.js' ).Customer;
var Product = require ( './db/shemas/Product.js' ).Product;
var Invoice = require ( './db/shemas/Invoice.js' ).Invoice;
var InvoiceItem = require ( './db/shemas/InvoiceItem.js' ).InvoiceItem;

var app = module.exports = express ();
app.set ( 'port', process.env.PORT || 8000 );
app.use ( bodyParser.json () );
app.use ( bodyParser.urlencoded () );
app.use ( express.static ( path.join ( __dirname, 'public' ) ) );

// CUSTOMERS API

app.route ( '/api/customers' )
    .get ( function ( req, res ) {
        Customer.find ( function ( error, customers ) {
            res.json ( customers );
        })
    })
    .post ( function ( req, res ) {
        var cust = new Customer ( req.body );
        cust.save ( function ( error, customer ) {
            res.json ( customer );
        });
    });

app.route ( '/api/customers/:customer_id' )
    .get ( function ( req, res ) {
        Customer.findById ( { _id: req.params.customer_id },
            function ( error, Customer ) {
                res.json ( Customer );
            } )

    } )
    .put ( function ( req, res ) {
        Customer.update ( { _id: req.params.customer_id }, {
                $set: {
                    name   : req.body.name,
                    address: req.body.address,
                    phone  : req.body.phone
                }
            },
            function ( error, customer ) {
                res.json ( customer );
            })
    })
    .delete ( function ( req, res ) {
        Customer.remove ( { _id: req.params.customer_id },
            function ( error, customer ) {
                res.json ( customer );
            }
        )
    });

// PRODUCTS API

app.route ( '/api/products' )
    .get ( function ( req, res ) {
        Product.find (
            function ( error, products ) {
                res.json ( products );
            })
    })
    .post ( function ( req, res ) {
        var product = new Product ( {
            name : req.body.name,
            price: req.body.price
        } );
        product.save ( function ( error, product ) {
            res.json ( product );
        })
    });

app.route ( '/api/products/:product_id' )
    .get ( function ( req, res ) {
        Product.findOne ( { _id: req.params.product_id }, function ( error, product ) {
            res.json ( product );
        } )
    } )
    .put ( function ( req, res ) {
        Product.update ( { _id: req.params.product_id }, { $set: { name: req.body.name, price: req.body.price } },
            function ( error, product ) {
                res.json ( product );
            })
    });

// INVOICES API

app.route ( '/api/invoices' )
    .get ( function ( req, res ) {
        Invoice.aggregate([
            {
                $lookup: {
                    from        : 'customers',
                    localField  : 'customer_id',
                    foreignField: '_id',
                    as          : 'customer'
                }
            }] ,
            function ( error, invoices ) {
                res.json ( invoices );
        })
    })
    .post ( function ( req, res ) {
        req.body.total = '';
        var inv = new Invoice ( req.body );
        inv.save ( function ( error, invoice ) {
            res.json ( invoice );
        });
    });
app.route ( '/api/invoices/:invoice_id' )
    .get ( function ( req, res ) {
        Invoice.findById ( req.params.invoice_id )
            .then ( function ( error, invoice ) {
                res.json ( invoice );
            });
    })
    .put ( function ( req, res ) {
        Invoice.update ( { _id: req.params.invoice_id }, {
                $set: {
                    customer_id: req.body.customer_id,
                    discount   : req.body.discount,
                    total      : req.body.total
                }
            },
            function ( error, invoice ) {
                res.json ( invoice );
            })
    });

// INVOICE ITEMS API
app.route ( '/api/invoices/:invoice_id/items/:id' )
    .get ( function ( req, res ) {
        InvoiceItem.findById ( { _id: req.params.id },
            function ( error, invoice_item ) {
                res.json ( invoice_item );
            })
    })
    .put ( function ( req, res ) {
        InvoiceItem.update ( { _id: req.params.id }, {
            $set: {
                product_id: req.body.product_id,
                quantity  : req.body.quantity
            }
        }, function ( error, invoice_item ) {
            InvoiceItem.findById ( { _id: req.params.id },
                function ( error, invoice_item ) {
                    InvoiceItem.aggregate([
                        {$match:{invoice_id:mongoose.Types.ObjectId(req.params.invoice_id)}},
                        {
                            $lookup: {
                                from        : 'products',
                                localField  : 'product_id',
                                foreignField: '_id',
                                as          : 'product'
                            }
                        },
                        {
                            $unwind:{path:'$product'}
                        },

                        {
                            $lookup: {
                                from        : 'invoices',
                                localField  : 'invoice_id',
                                foreignField: '_id',
                                as          : 'invoice'
                            }
                        },
                        {
                            $unwind:'$invoice'
                        },
                        {
                            $project:{
                                invoice:'$invoice_id',
                                quantity:'$quantity',
                                price:"$product.price",
                                discount:'$invoice.discount'
                            }
                        },
                    ],function ( error,response   ) {
                        var count = 0;
                        var fullPrice = 0;
                        for ( var i = 0; i < response.length; i++ ) {
                            fullPrice = fullPrice+(Number((response[i].quantity) * Number(response[i].price)));
                            var total = ((Number((response[i].quantity) * Number(response[i].price)))*Number(response[i].discount))/100;
                            count = count+total
                        }
                        fullPrice = fullPrice-count;
                        Invoice.findByIdAndUpdate(mongoose.Types.ObjectId(response[0].invoice),{ $set:{ total:fullPrice}},function ( error,updated  ) {})
                    });
                    res.json ( invoice_item );
                })
        })
    });

app.route ( '/api/invoices/:invoice_id/items' )
    .get ( function ( req, res ) {
        InvoiceItem.aggregate ( [
            { $match: { invoice_id: mongoose.Types.ObjectId ( req.params.invoice_id ) } },
            {
                $lookup: {
                    from        : 'products',
                    localField  : 'product_id',
                    foreignField: '_id',
                    as          : 'product'
                }
            },
            {
                $unwind: {
                    path: '$product'
                }
            }
        ], function ( error, invoice_items ) {
            res.json ( invoice_items );
        });
    })
    .post ( function ( req, res ) {
        var invoice = new InvoiceItem ( {
            product_id: req.body.product_id,
            quantity  : req.body.quantity,
            invoice_id: req.params.invoice_id
        });
        invoice.save ( function ( error, invoice_item ) {
            InvoiceItem.aggregate([
                {$match:{invoice_id:mongoose.Types.ObjectId(invoice_item.invoice_id)}},
                {
                    $lookup: {
                        from        : 'products',
                        localField  : 'product_id',
                        foreignField: '_id',
                        as          : 'product'
                    }
                },
                {
                    $unwind:{path:'$product'}
                },

                {
                    $lookup: {
                        from        : 'invoices',
                        localField  : 'invoice_id',
                        foreignField: '_id',
                        as          : 'invoice'
                    }
                },
                {
                    $unwind:'$invoice'
                },
                {
                    $project:{
                        invoice:'$invoice_id',
                        quantity:'$quantity',
                        price:"$product.price",
                        discount:'$invoice.discount'
                    }
                },
            ],function ( error,response   ) {
                var count = 0;
                var fullPrice = 0;
                for ( var i = 0; i < response.length; i++ ) {
                    fullPrice = fullPrice+(Number((response[i].quantity) * Number(response[i].price)))
                    var total = ((Number((response[i].quantity) * Number(response[i].price)))*Number(response[i].discount))/100;
                    count = count+total
                }
                fullPrice = fullPrice-count;
                Invoice.findByIdAndUpdate(mongoose.Types.ObjectId(response[0].invoice),{ $set:{ total:fullPrice}},function ( error,updated  ) {})
            });
            res.json ( invoice_item );
        })
    });


// Redirect all non api requests to the index
app.get ( '*', function ( req, res ) {
    res.sendFile ( path.join ( __dirname, 'public', 'index.html' ) );
} );

// Starting express server
http.createServer ( app )
    .listen ( app.get ( 'port' ), function () {
        console.log ( 'Express server listening on port ' + app.get ( 'port' ) );
    });
