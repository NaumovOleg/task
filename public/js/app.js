/**
 * author Oleg .
 */

angular.module ( 'app', [
    'ngMaterial',
    'ui.router',
    'ngCookies',

] )
    .config ( [ '$stateProvider', '$urlRouterProvider', '$httpProvider', '$mdDateLocaleProvider',
        function ( $stateProvider, $urlRouterProvider, $httpProvider, $mdDateLocaleProvider ) {

            $urlRouterProvider.otherwise ( '/invoiceapp' );

            $stateProvider
                .state ( {
                    name       : 'invoiceapp',
                    url        : '/invoiceapp',
                    templateUrl: '/invoiceApp.html',
                    controller: 'invoiceCtrl',
                    controllerAs:'inv'
                } )
                .state ( {
                    name       : 'products',
                    url        : '/products',
                    templateUrl: '/products.html',
                    controller: 'productCtr',
                    controllerAs:'pr'
                } )
                .state ( {
                    name       : 'customers',
                    url        : '/customers',
                    templateUrl: '/customers.html',
                    controller: 'customerCtr',
                    controllerAs:'cus'
                } )
                .state ( {
                    name       : 'invoice',
                    url        : '/invoice/:invoice_id',
                    templateUrl: '/invoices.html',
                    controller: 'invoicesCtrl',
                    controllerAs:'invs'
                } )

        }]);