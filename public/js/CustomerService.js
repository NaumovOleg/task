/**
 * author Oleg .
 */
/**
 * author Oleg .
 */
angular.module ( 'app' )
    .service ( 'customerSrvc', [ '$http', function ( $http, ) {
        this.getCustomers = function (  ) {
            return $http ( {
                url   : '/api/customers',
                method: 'get',
            }).then ( function ( customer ) {
                    return customer;
                })
        };

        this.addCustomer = function (  body ) {
            return $http ( {
                url   : '/api/customers',
                method: 'post',
                data:{name:body.name, address:body.address,phone:body.phone}
            }).then ( function ( customer ) {
                    return customer;
                })
        };
    }]);