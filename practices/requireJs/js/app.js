require.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    }
});

require(['app/purchase'], function(purchase) {
    purchase.purchaseProduct();
});
