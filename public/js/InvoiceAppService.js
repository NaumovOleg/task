/**
 * author Oleg .
 */
angular.module ( 'app' )

    .service ( 'invoiceSrvc', [ '$http', function ( $http ) {

        this.getAllInvoices = function () {
            return $http ( {
                url   : '/api/invoices',
                method: 'get',
            }).then ( function ( invoises ) {
                    return invoises.data;
                });
        };
        this.getTotal = function (  ) {
            return $http ( {
                url   : '/api/total/invoices/get',
                method: 'get',
            }).then ( function ( invoises ) {
                    return invoises.data;
                });
            };
        this.addInvoice = function ( invoice ) {
            return $http ( {
                url   : '/api/invoices',
                method: 'post',
                data:invoice
            }).then ( function ( invoise ) {
                    return invoise.data;
                });
        };

        this.getCustomers = function () {
            return $http ( {
                url   : '/api/customers',
                method: 'get',

            }).then ( function ( customers ) {
                    return customers.data;
                });
        };
    }]);