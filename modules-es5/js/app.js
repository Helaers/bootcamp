(function($, calc){

    $(document).ready(function() {

        var val1;
        var val2;
        var result;

        function getValues() {
            val1 = parseInt($('#val1').val());
            val2 = parseInt($('#val2').val());
        }

        function showResult() {
            $("#result").text(result);
        }

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

})(jQuery, calc);
