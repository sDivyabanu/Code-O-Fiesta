import mongoose from 'mongoose';
import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());
import connectDB from './src/lib/db';
import ParticipantIntegrity from './src/models/ParticipantIntegrity';
import User from './src/models/User';

async function main() {
  await connectDB();
  const users = await User.find({ email: 'team@test.com' });
  for (const u of users) {
    const int = await ParticipantIntegrity.findOne({ userId: u._id });
    console.log(`User ${u.name} (${u._id}):`, int);
  }
  process.exit(0);
}
main();
