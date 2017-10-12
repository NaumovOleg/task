/**
 * author Oleg .
 */
angular.module ( 'app' )

    .service ( 'productsSrvc', [ '$http', function ( $http, ) {

        this.getAllProducts = function (  ) {
            return $http ( {
                url   : '/api/products',
                method: 'get',
            }).then ( function ( invoiseItem ) {
                    return invoiseItem;
                })

        };

        this.addProduct = function (  body ) {
            return $http ( {
                url   : '/api/products',
                method: 'post',
                data:{name:body.name, price:body.price}
            }).then ( function ( product ) {
                    return product;
                })
        };
    }]);