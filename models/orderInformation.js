const mongoose = require('mongoose');

const orderInformationSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    orderInformation: {
        type: String,
        required: true
    }
});

const OrderInformation = mongoose.model('OrderInfrormation', orderInformationSchema);

exports.OrderInformation = OrderInformation;