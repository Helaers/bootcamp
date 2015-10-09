//commonJS
// module.exports = 'aaaa';
// module.exports.foo = function() {};

class Calc {
    add (x,y) {
        return x+y;
    }

    multiply (x,y) {
        return x*y;
    }
}

class Car {
    start(){
        console.log('start');
    }
}


//ES6
var calc = new Calc();
var car = Car();

export {calc, car}

