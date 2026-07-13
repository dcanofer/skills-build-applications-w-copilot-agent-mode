import { Router } from 'express';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Workout } from '../models/Workout.js';

const router = Router();

router.get('/users', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

router.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.get('/teams', async (_req, res) => {
  const teams = await Team.find().lean();
  res.json(teams);
});

router.post('/teams', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

router.get('/activities', async (_req, res) => {
  const activities = await Activity.find().populate('userId', 'displayName').lean();
  res.json(activities);
});

router.post('/activities', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

router.get('/leaderboard', async (_req, res) => {
  const leaderboardEntries = await Leaderboard.find().populate('userId', 'displayName').lean();
  const leaderboard = leaderboardEntries.map((entry: any) => ({
    _id: entry._id,
    rank: entry.rank,
    name: entry.userId?.displayName ?? 'Unknown',
    points: entry.points,
    streak: entry.streak,
  }));

  res.json(leaderboard);
});

router.post('/leaderboard', async (req, res) => {
  const entry = await Leaderboard.create(req.body);
  res.status(201).json(entry);
});

router.get('/workouts', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

router.post('/workouts', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

export default router;
