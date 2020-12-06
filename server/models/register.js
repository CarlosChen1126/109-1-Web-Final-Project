const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterSchema = Schema({
    stdID: {
		type: String,
        required: [true, 'StdID field is required.']
	},
	name: {
		type: String,
        required: [true, 'Name field is required.']
	}
}, {
  collection: 'Register',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const exportSchema = mongoose.model('Register', RegisterSchema)

module.exports = exportSchema;
