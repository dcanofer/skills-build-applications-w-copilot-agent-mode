import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Workout } from '../models/Workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                username: 'ava.martinez',
                email: 'ava.martinez@octofit.example',
                displayName: 'Ava Martinez',
                goal: 'Improve weekly consistency',
                points: 980,
                workoutStreak: 18,
                team: 'Velocity Crew',
            },
            {
                username: 'noah.patel',
                email: 'noah.patel@octofit.example',
                displayName: 'Noah Patel',
                goal: 'Build strength and mobility',
                points: 880,
                workoutStreak: 12,
                team: 'Velocity Crew',
            },
            {
                username: 'mila.chen',
                email: 'mila.chen@octofit.example',
                displayName: 'Mila Chen',
                goal: 'Train for a 10K',
                points: 840,
                workoutStreak: 9,
                team: 'Summit Squad',
            },
        ]);
        const teams = await Team.insertMany([
            {
                name: 'Velocity Crew',
                description: 'A high-energy accountability group focused on weekly consistency.',
                focusArea: 'Cardio and endurance',
                captain: 'Ava Martinez',
                members: 2,
            },
            {
                name: 'Summit Squad',
                description: 'A strength-first training circle with mobility and recovery support.',
                focusArea: 'Strength and resilience',
                captain: 'Mila Chen',
                members: 1,
            },
        ]);
        await Activity.insertMany([
            {
                userId: users[0]._id,
                type: 'Run',
                durationMinutes: 32,
                caloriesBurned: 310,
                date: new Date('2026-07-13'),
            },
            {
                userId: users[1]._id,
                type: 'Strength',
                durationMinutes: 45,
                caloriesBurned: 400,
                date: new Date('2026-07-12'),
            },
            {
                userId: users[2]._id,
                type: 'Yoga',
                durationMinutes: 28,
                caloriesBurned: 180,
                date: new Date('2026-07-11'),
            },
        ]);
        await Leaderboard.insertMany([
            {
                userId: users[0]._id,
                rank: 1,
                points: 980,
                streak: 18,
            },
            {
                userId: users[1]._id,
                rank: 2,
                points: 880,
                streak: 12,
            },
            {
                userId: users[2]._id,
                rank: 3,
                points: 840,
                streak: 9,
            },
        ]);
        await Workout.insertMany([
            {
                title: 'HIIT Core Blast',
                focus: 'Core and conditioning',
                difficulty: 'Medium',
                durationMinutes: 25,
                equipment: 'Bodyweight',
            },
            {
                title: 'Upper Body Circuit',
                focus: 'Shoulders and arms',
                difficulty: 'Hard',
                durationMinutes: 35,
                equipment: 'Dumbbells',
            },
            {
                title: 'Mobility Reset',
                focus: 'Recovery and flexibility',
                difficulty: 'Easy',
                durationMinutes: 20,
                equipment: 'Mat',
            },
        ]);
        console.log('Seed the octofit_db database with test data');
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
