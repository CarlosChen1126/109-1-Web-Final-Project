const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccessSchema = Schema({
  stdID: { type: String, required: true, unique: true },
  time: [{ type: String, required: true }]
}, {
  collection: 'access',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const exportSchema = mongoose.model('access', AccessSchema)

module.exports = exportSchema;
