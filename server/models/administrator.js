const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdministratorSchema = Schema({
  day: { type: String, required: true },
  time: { type: String, required: true },
  name: { type: String, required: true}
}, {
  collection: 'administrator',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const exportSchema = mongoose.model('administrator', AdministratorSchema)

module.exports = exportSchema;
