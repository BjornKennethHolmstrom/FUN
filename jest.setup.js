// jest.setup.js
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Override database URL for tests
process.env.DATABASE_URL = `postgresql://bjorn:HimitsuDesu009@localhost:5432/funtime_test?schema=public`;

// Other test environment variables
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
process.env.REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Debug logging
console.log('Test database URL:', process.env.DATABASE_URL);
