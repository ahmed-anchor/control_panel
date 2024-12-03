import { Schema, models, model } from 'mongoose';

const DashboardSchema = new Schema({

    name: { type: String, required: true },
    sort: { type: String, required: true },
    price: { type: Number, required: true },
    offer: { type: Number, required: false, default: 0 },
    quantity: { type: Number, required: false, default: 1 },
    image: { type: String, required: true }

});

const DashboardModel = models.dashboard || model('dashboard', DashboardSchema);

export default DashboardModel;