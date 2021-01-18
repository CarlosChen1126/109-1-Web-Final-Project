const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MailSchema = Schema({
  account: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  collection: 'mail',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const exportSchema = mongoose.model('mail', MailSchema)

module.exports = exportSchema;
