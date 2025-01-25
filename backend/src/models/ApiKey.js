const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please add a name for the API key'],
        trim: true
    },
    key: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['active', 'disabled'],
        default: 'active'
    },
    lastUsed: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    toJSON: { 
        transform: function(doc, ret) {
            ret.createdAt = ret.createdAt.getTime().toString();
            ret.lastUsed = ret.lastUsed ? ret.lastUsed.getTime().toString() : null;
            return ret;
        }
    }
});

// Generate a unique API key
apiKeySchema.statics.generateApiKey = function(prefix = 'sk_live_') {
    const randomBytes = require('crypto').randomBytes(32);
    return prefix + randomBytes.toString('base64').replace(/[^a-zA-Z0-9]/g, '');
};

const ApiKey = mongoose.model('ApiKey', apiKeySchema);

module.exports = ApiKey; 