const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterSchema = Schema({
    stdID: {
		type: String,
        required: [true, 'StdID field is required.'],
        index: {unique: true}
	},
	name: {
		type: String,
        required: [true, 'Name field is required.']
  },
  email: {
		type: String,
        required: [true, 'Email field is required.'],
        index: {unique: true}
  }
  
}, {
  collection: 'Register',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const exportSchema = mongoose.model('Register', RegisterSchema)

module.exports = exportSchema;
