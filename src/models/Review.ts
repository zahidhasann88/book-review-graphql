import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  bookId: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
}

const ReviewSchema: Schema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
});

export default mongoose.model<IReview>('Review', ReviewSchema);