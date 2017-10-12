/**
 * author Oleg .
 */

/**
 * author Oleg .
 */
angular.module ( 'app' )
    .service ( 'invoicesSrvc', [ '$http', function ( $http, ) {
        this.addInvoiceItem = function ( parameters, body ) {
            var url = '/api/invoices/' + parameters + '/items';
            return $http ( {
                url   : url,
                method: 'post',
                data  : body

            }).then ( function ( invoiseItem ) {
                    return invoiseItem;
                });
        };
        this.getProducts = function () {
            return $http ( {
                url   : '/api/products',
                method: 'get',
            }).then ( function ( products ) {
                    return products.data;
                });
        };

        this.getInvoices = function ( id ) {
            var url = '/api/invoices/' + id + '/items';
            return $http ( {
                url   : url,
                method: 'get',
            }).then ( function ( products ) {
                    return products.data;
                });
        };
        this.editQuantity = function ( invoiceId, body, id ) {

            var str = '/api/invoices/' + invoiceId + '/items/' + id;

            return $http ( {
                url   : str,
                method: 'put',
                data  : body

            }).then ( function ( quantity ) {
                    return quantity.data;
                });
        }
    }]);


