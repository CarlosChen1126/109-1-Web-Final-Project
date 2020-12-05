const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDataSchema = Schema({
  account: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  collection: 'Login',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const exportSchema = mongoose.model('UserData', UserDataSchema)

module.exports = exportSchema;