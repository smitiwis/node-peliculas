
import cors from 'cors';

const ACCEPTED_ORIGINS = [
  "http://localhost:8080",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://movies.com",
  "https://steamcommunity.com"
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {

    if (acceptedOrigins.includes(origin) || !origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders :['Content-Type', 'Authorization'],
})