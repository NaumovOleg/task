/**
 * author Oleg .
 */

angular.module ( 'app' )

    .controller ( 'invoiceCtrl', ['$scope', 'invoiceSrvc',  function ( $scope ,invoiceSrvc ){

        var $this = this;

        this.invoice = {
            customer_id:'',
            discount:'',
        };

        this.customers = [];
        this.products = [];
        this.invoices = [];

        this.addInvoice = function (  ) {
            invoiceSrvc.addInvoice( $this.invoice )
                .then( function ( response  ) {
                    $this.getAllInvoices();
                })
        };

        this.getAllInvoices = function (  ) {
            invoiceSrvc.getAllInvoices()
                .then( function ( invoices  ) {
                    $this.invoices = invoices;
            })
        };
        this.getCustomers = function (  ) {
            invoiceSrvc.getCustomers()
                .then( function ( customers ) {
                    $this.customers = customers;
                })
        };
        this.getCustomers();
        this.getAllInvoices();

    }]);

