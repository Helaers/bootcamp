require.config({
    paths: {
        'jquery': 'bower_components/jquery/dist/jquery',
        'domready': 'bower_components/requirejs-domReady/domReady'
    }
})

require(['jquery','domready', './js/calc'], function($, domReady, calc) {

    var val1;
    var val2;
    var result;

    domReady(function() {

        $("#add").click(function() {

            getValues();
            result = calc.add(val1,val2);
            showResult();

        });

        $("#multiply").click(function() {

            getValues();
            result = calc.multiply(val1,val2);
            showResult();

        });
    });

    function getValues() {
        val1 = parseInt($('#val1').val());
        val2 = parseInt($('#val2').val());
    }

    function showResult() {
        $("#result").text(result);
    }

});


//commonJS
// var mod = require('./mod');
// mod.action();
