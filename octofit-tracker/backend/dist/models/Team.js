import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    focusArea: { type: String, required: true },
    captain: { type: String, required: true },
    members: { type: Number, default: 0 },
}, { timestamps: true });
export const Team = model('Team', teamSchema);
