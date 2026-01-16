import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<ITask, {}, {}, {}, mongoose.Document<unknown, {}, ITask, {}, mongoose.DefaultSchemaOptions> & ITask & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITask>;
export default _default;
//# sourceMappingURL=Task.model.d.ts.map