const mongoose = require('mongoose');

const slotMachineSchema = new mongoose.Schema({
    machineId: {
        type: String,
        required: [true, 'Please provide a machine ID'],
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Please provide a machine name'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Please provide a location'],
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'],
        default: 'active'
    },
    gameType: {
        type: String,
        required: [true, 'Please provide a game type'],
        trim: true
    },
    metrics: {
        totalBets: {
            type: Number,
            default: 0
        },
        totalWins: {
            type: Number,
            default: 0
        },
        rtp: {
            type: Number,
            default: 0
        },
        hitFrequency: {
            type: Number,
            default: 0
        },
        maxWin: {
            type: Number,
            default: 0
        }
    },
    lastMaintenance: {
        type: Date
    },
    lastActive: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Calculate RTP
slotMachineSchema.methods.calculateRTP = function() {
    if (this.metrics.totalBets > 0) {
        this.metrics.rtp = (this.metrics.totalWins / this.metrics.totalBets) * 100;
    }
    return this.metrics.rtp;
};

// Update metrics
slotMachineSchema.methods.updateMetrics = function(bet, win) {
    this.metrics.totalBets += bet;
    this.metrics.totalWins += win;
    this.metrics.maxWin = Math.max(this.metrics.maxWin, win);
    this.calculateRTP();
    this.lastActive = new Date();
};

module.exports = mongoose.model('SlotMachine', slotMachineSchema); 