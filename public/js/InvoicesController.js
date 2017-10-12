/**
 * author Oleg .
 */

angular.module ( 'app' )

    .controller ( 'invoicesCtrl', [ '$scope', 'invoicesSrvc', '$stateParams', function ( $scope, invoicesSrvc,
                                                                                        $stateParams ) {

        var $this = this;
        this.invoiceItem = {
            product_id : '',
            quantity: ''
        };

        this.quantityEdited = '';
        this.invoiceItems = [];

        this.addInvoiceItem = function () {
            invoicesSrvc.addInvoiceItem ( $stateParams.invoice_id, $this.invoiceItem )
                .then ( function ( response ) {
                    $this.getInvoices();
                } )
        };

        this.getInvoices = function () {
            invoicesSrvc.getInvoices ( $stateParams.invoice_id )
                .then ( function ( response ) {
                    $this.invoiceItems = response;

                } )
        };

        this.getProducts = function (  ) {
            invoicesSrvc.getProducts()
                .then( function ( products ) {
                    $this.products = products;
                })
        };

        this.editQuantity = function ( product,id,element ) {

            var body = {
                product_id:product,
                quantity:$this.quantityEdited
            };

            invoicesSrvc.editQuantity($stateParams.invoice_id,body,id)
                .then( function ( response  ) {
                    $this.getInvoices();
                })
        };
        this.getProducts();
        this.getInvoices();
    }]);
