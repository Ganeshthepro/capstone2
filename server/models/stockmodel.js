const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// Portfolio Schema
const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symbol: { type: String, required: true },
  price: { type: Number }, // Added price field
  priceData: {             // Added detailed price data
    open: { type: String },
    high: { type: String },
    low: { type: String },
    volume: { type: String },
    tradingDay: { type: String },
    previousClose: { type: String },
    change: { type: String },
    changePercent: { type: String }
  },
  lastUpdated: { type: Date, default: Date.now }, // Track when price was last updated
  addedAt: { type: Date, default: Date.now },
});
const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = { User, Portfolio };

// const mongoose = require('mongoose');

// // User Schema
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });
// const User = mongoose.model('User', userSchema);

// // Portfolio Schema
// const portfolioSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   symbol: { type: String, required: true },
//   addedAt: { type: Date, default: Date.now },
// });
// const Portfolio = mongoose.model('Portfolio', portfolioSchema);

// module.exports = { User, Portfolio };