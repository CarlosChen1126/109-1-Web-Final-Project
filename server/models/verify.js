const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VerifySchema = Schema({
  email: { type: String, required: true, unique: true },
  verifyCode: { type: String, required: true }
}, {
  collection: 'Verify',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const exportSchema = mongoose.model('Verify', VerifySchema)

module.exports = exportSchema;
