var calc = (function () {
   'use strict'


    function add (a,b) {
        return a+b;
    }
    function multiply (a,b) {
        return a*b;
    }

    return {
        add: add,
        multiply: multiply
    }

})();

