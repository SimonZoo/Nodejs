var isTrue = function(value, callback) {
    if (value === true) {
        callback(null, 'Value is True');
    } else {
        callback(new Error('Value is not true'));
    }
};

var callback = function(error, value) {
    if (error) {
        return console.log(error);
    }
    console.log(value);
};

isTrue('Simon', callback);
isTrue(true, callback);

