import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure WebSocket for serverless environment
if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

// Use the DATABASE_URL environment variable
const databaseUrl = process.env.DATABASE_URL || "postgresql://localhost/phantom_auth";

console.log('Connecting to database...');

export const pool = new Pool({ 
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false }
});

export const db = drizzle({ client: pool, schema });