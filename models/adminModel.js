import { Schema, model, models } from 'mongoose';

const AdminSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true } );

const AdminModel = models.admin || model('admin', AdminSchema);

export default AdminModel;