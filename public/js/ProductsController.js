/**
 * author Oleg .
 */
angular.module ( 'app' )

    .controller ( 'productCtr', ['$scope', 'productsSrvc',  function ( $scope ,productsSrvc ){

        var $this = this;

        this.products = [];
        this.name = '';
        this.price = '';
        
        this.addProduct = function (  ) {

            var body = {
                name:$this.name,
                price:$this.price
            };

            productsSrvc.addProduct(body)
                .then(function ( response  ) {
                    $this.getProducts();
                })
            
        };

        this.getProducts = function (  ) {
            productsSrvc.getAllProducts()
                .then( function ( response  ) {
                    $this.products = response.data;
                })

        };
        this.getProducts();
    }]);