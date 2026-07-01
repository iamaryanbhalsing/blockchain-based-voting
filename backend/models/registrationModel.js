const mongoose = require('mongoose');

const VoterSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },

  wallet: {
    type: String,
    required: true,
    unique: true
  },

  hasVoted: { 
    type: Boolean,
     default: false 
    }
});

module.exports = mongoose.model('Registered voter', VoterSchema);
