require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const typeDefs = require('./schema/types');
const resolvers = require('./schema/resolvers');
const { authMiddleware } = require('./utils/auth');

// Import routes
const authRoutes = require('./routes/auth');
const slotRoutes = require('./routes/slots');

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/slots', slotRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Create Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
        const auth = await authMiddleware(req);
        return {
            ...auth,
            res
        };
    },
    formatError: (error) => {
        console.error('GraphQL Error:', error);
        return error;
    }
});

async function startServer() {
    await server.start();
    
    // Apply Apollo middleware to Express
    server.applyMiddleware({ 
        app,
        path: '/graphql',
        cors: false // We're handling CORS with Express
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer().catch(error => {
    console.error('Failed to start server:', error);
}); 