import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    goal: { type: String, default: 'Build consistency' },
    points: { type: Number, default: 0 },
    workoutStreak: { type: Number, default: 0 },
    team: { type: String, default: 'Unassigned' },
}, { timestamps: true });
export const User = model('User', userSchema);
