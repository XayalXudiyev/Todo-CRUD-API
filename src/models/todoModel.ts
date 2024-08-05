import mongoose, { Collection } from "mongoose";

interface ITodo extends Document {
  name: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new mongoose.Schema<ITodo>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    }, 
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: "todo" }
);

const Todo = mongoose.model<ITodo>('Todo', TodoSchema)

export default Todo