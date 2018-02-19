const jwt = require('jsonwebtoken');

var password = {
    pw:'abc123',
    us:'ab'
}
var signedpw = jwt.sign(password, 'somesecretkey');
console.log('signed pw',signedpw);

jwt.verify(signedpw,'somesecretkey',(err, decoded)=>{
    if(err) return console.log(err);
    console.log(decoded);
});
