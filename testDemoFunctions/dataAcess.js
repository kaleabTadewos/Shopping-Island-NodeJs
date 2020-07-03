module.exports.getCustomer = function(id){
    return {id : id , points: 11};
}

exports.sendMail = function(email , message){
    console.log(message , ' send successfully to'  , email);
}