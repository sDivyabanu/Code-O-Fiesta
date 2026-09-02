import mongoose from 'mongoose';
import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());
import connectDB from '../src/lib/db';
import ParticipantIntegrity from '../src/models/ParticipantIntegrity';

async function main() {
  await connectDB();
  const result = await ParticipantIntegrity.updateMany({}, {
    $set: {
      isSubmissionsLocked: false,
      awaySessionCount: 0
    }
  });
  console.log(`Unlocked ${result.modifiedCount} participant(s).`);
  process.exit(0);
}
main();
