function hello() {
    return 'world';
}

function helloWorldAgain() {
    return hello() + ' again';
}

function myPrivateFunction(number) {
    return number +1;
}

function increment(number) {
    return myPrivateFunction(number);
}

module.exports.hello = hello;
module.exports.helloWorldAgain = helloWorldAgain;
module.exports.increment = increment;
