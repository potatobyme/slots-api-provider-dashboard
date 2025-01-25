const mongoose = require('mongoose');
const crypto = require('crypto');

const apiKeySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    key: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
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
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

// Generate API key before saving
apiKeySchema.pre('save', function(next) {
    if (!this.isModified('key')) {
        next();
        return;
    }

    // Generate a random API key
    const buffer = crypto.randomBytes(32);
    this.key = buffer.toString('hex');
    next();
});

// Static method to generate API key
apiKeySchema.statics.generateApiKey = function() {
    const buffer = crypto.randomBytes(32);
    return buffer.toString('hex');
};

const ApiKey = mongoose.model('ApiKey', apiKeySchema);

module.exports = ApiKey; 