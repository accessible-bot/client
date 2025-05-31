import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

export interface IChat extends Document {
  userId: Types.ObjectId; 
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  role: { type: String, enum: ['system', 'user', 'assistant'], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ChatSchema = new Schema<IChat>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  messages: { type: [MessageSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const ChatModel = mongoose.model<IChat>('Chat', ChatSchema);
