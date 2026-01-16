import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    color: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a category name'],
        trim: true,
        maxlength: [30, 'Name can not be more than 30 characters']
    },
    color: {
        type: String,
        required: [true, 'Please choose a color'],
        match: [/^#([0-9a-f]{3}){1,2}$/i, 'Please provide a valid hex color']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model<ICategory>('Category', CategorySchema);
