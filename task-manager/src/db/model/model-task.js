import mongoose from 'mongoose';
// import User from './model-user';

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true,
        default: 'user'
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
});

const Task = mongoose.model('Task', TaskSchema);
export default Task;
