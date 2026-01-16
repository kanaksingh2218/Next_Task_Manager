import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
    completed: boolean;
    userId: mongoose.Types.ObjectId;
    categoryId: mongoose.Types.ObjectId;
    priority: 'low' | 'medium' | 'high';
    dueDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema: Schema = new Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [50, 'Title can not be more than 50 characters']
    },
    description: {
        type: String,
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    dueDate: {
        type: Date
    }
}, {
    timestamps: true
});

export default mongoose.model<ITask>('Task', TaskSchema);
