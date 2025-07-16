import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubscription extends Document {
  name: string;
  details: string[];
  price: number;
  currency: 'RON';
}

const SubscriptionSchema = new Schema<ISubscription>({
  name: { type: String, required: true },
  details: { type: [String], default: [] },
  price: { type: Number, required: true },
  currency: { type: String, enum: ['RON'], required: true },
});

// Dacă modelul există deja, îl refolosești; altfel îl creezi
export const Subscription: Model<ISubscription> =
  mongoose.models.Subscription ||
  mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
