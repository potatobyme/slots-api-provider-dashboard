const express = require('express');
const router = express.Router();
const SlotMachine = require('../models/SlotMachine');
const { protect, authorize } = require('../middleware/auth');

// Get all slot machines
router.get('/', protect, async (req, res) => {
    try {
        const slots = await SlotMachine.find();
        res.json({ success: true, data: slots });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single slot machine
router.get('/:id', protect, async (req, res) => {
    try {
        const slot = await SlotMachine.findById(req.params.id);
        if (!slot) {
            return res.status(404).json({ error: 'Slot machine not found' });
        }
        res.json({ success: true, data: slot });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create slot machine (Admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
    try {
        const slot = await SlotMachine.create(req.body);
        res.status(201).json({ success: true, data: slot });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update slot machine (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const slot = await SlotMachine.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!slot) {
            return res.status(404).json({ error: 'Slot machine not found' });
        }

        res.json({ success: true, data: slot });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete slot machine (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const slot = await SlotMachine.findByIdAndDelete(req.params.id);

        if (!slot) {
            return res.status(404).json({ error: 'Slot machine not found' });
        }

        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update slot metrics
router.post('/:id/metrics', protect, async (req, res) => {
    try {
        const { bet, win } = req.body;
        const slot = await SlotMachine.findById(req.params.id);

        if (!slot) {
            return res.status(404).json({ error: 'Slot machine not found' });
        }

        slot.updateMetrics(bet, win);
        await slot.save();

        res.json({ success: true, data: slot });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get slot machine statistics
router.get('/:id/stats', protect, async (req, res) => {
    try {
        const slot = await SlotMachine.findById(req.params.id);

        if (!slot) {
            return res.status(404).json({ error: 'Slot machine not found' });
        }

        const stats = {
            rtp: slot.calculateRTP(),
            totalBets: slot.metrics.totalBets,
            totalWins: slot.metrics.totalWins,
            hitFrequency: slot.metrics.hitFrequency,
            maxWin: slot.metrics.maxWin
        };

        res.json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 