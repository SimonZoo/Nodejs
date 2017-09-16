
function async(cb, err) {
    setTimeout(function() {
        try {
            if (true) {
                throw new Error('Error here');
            } else {
                cb('done');
            }
        } catch(e) {
            err(e);
        }
    }, 2000);
}

async(function (cb) {
    console.log(cb);
}, function(err){
    console.log('Error...' + err);
});