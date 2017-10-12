/**
 * author Oleg .
 */

angular.module ( 'app' )

    .controller ( 'customerCtr', ['$scope', 'customerSrvc',  function ( $scope ,productsSrvc ){

        var $this = this;

        this.customers = [];

        this.name = '';
        this.phone = '';
        this.address = '';

        this.addCustomer = function (  ) {

            var body = {
                name:$this.name,
                address:$this.address,
                phone:$this.phone
            };

            productsSrvc.addCustomer(body)
                .then(function ( response  ) {
                    $this.getCustomers();
                })

        };

        this.getCustomers = function (  ) {
            productsSrvc.getCustomers()
                .then( function ( response  ) {
                    $this.customers = response.data;
                })

        };
        this.getCustomers();
    } ] );