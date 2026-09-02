import mongoose from 'mongoose';
import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());
import connectDB from '../src/lib/db';
import Round from '../src/models/Round';
import { RoundStatus } from '../src/constants/event';

async function main() {
  await connectDB();
  const result = await Round.findOneAndUpdate(
    { roundNumber: 1 },
    { $set: { status: RoundStatus.ACTIVE, startedAt: new Date() } }
  );
  console.log(`Round 1 status set to ACTIVE.`);
  process.exit(0);
}
main();
