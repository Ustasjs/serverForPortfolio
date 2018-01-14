const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;



const UserSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true
  },
  hash: String,
  salt: String,
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto
    .randomBytes(8)
    .toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 512, 'sha512')
    .toString('hex');
};

UserSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 512, 'sha512')
    .toString('hex');

  return this.hash === hash;
}

mongoose.model('user', UserSchema);