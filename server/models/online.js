const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OnlineSchema = Schema({
  stdID: { type: String, required: true, unique: true },
  EntryTime: [{ type: String, required: true }],
  Purpose: [{ type: String }]

}, {
  collection: 'online'
})

const exportSchema = mongoose.model('online', OnlineSchema)

module.exports = exportSchema;
