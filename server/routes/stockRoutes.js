const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Portfolio } = require('../models/stockmodel');

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'YOUR_API_KEY_HERE';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  try {
    const decoded = require('jsonwebtoken').verify(token, process.env.SECRET_KEY || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/stocks', async (req, res) => {
  try {
    console.log('Alpha Vantage API Key:', ALPHA_VANTAGE_API_KEY);
    if (!ALPHA_VANTAGE_API_KEY) {
      throw new Error('Alpha Vantage API key is missing');
    }

    const allSymbols = [
      'GOOGL', 'AAPL', 
      // 'MSFT', 'AMZN', 'TSLA'
    ];

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const symbols = allSymbols.slice(startIndex, endIndex);
    console.log(`Fetching US stocks for page ${page}, limit ${limit}:`, symbols);

    const stocks = [];
    for (const symbol of symbols) {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        console.log(`Response for ${symbol}:`, response.data);

        const quote = response.data['Global Quote'];
        if (quote && quote['05. price']) {
          stocks.push({
            id: symbol,
            name: symbol,
            symbol: symbol,
            price: parseFloat(quote['05. price']),
            priceData: {
              open: quote['02. open'],
              high: quote['03. high'],
              low: quote['04. low'],
              volume: quote['06. volume'],
              tradingDay: quote['07. latest trading day'],
              previousClose: quote['08. previous close'],
              change: quote['09. change'],
              changePercent: quote['10. change percent']
            }
          });
        } else {
          console.warn(`No valid quote data for ${symbol}:`, response.data);
          if (response.data['Information']) {
            console.warn('Rate limit or error:', response.data['Information']);
          }
        }
      } catch (error) {
        console.error(`Error fetching ${symbol}:`, error.message);
      }
      await delay(12000); 
    }

    console.log('Stocks fetched:', stocks);
    res.json({
      stocks,
      totalStocks: allSymbols.length,
      currentPage: page,
      totalPages: Math.ceil(allSymbols.length / limit),
    });
  } catch (error) {
    console.error('Error in stocks route:', error.message);
    res.status(500).json({ message: 'Error fetching real-time stock data', error: error.message });
  }
});

// Portfolio Routes
router.get('/portfolio', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching portfolio for user:', req.user.userId);
    let portfolioItems = await Portfolio.find({ userId: req.user.userId });
    console.log('Portfolio items:', portfolioItems);

    // Check if we need to update prices (if lastUpdated is more than 24 hours old)
    const now = new Date();
    const portfolio = [];
    
    for (const item of portfolioItems) {
      // Check if we have price data and if it's recent (less than 24 hours old)
      const needsPriceUpdate = !item.lastUpdated || 
                              (now - new Date(item.lastUpdated)) > (24 * 60 * 60 * 1000);
      
      if (needsPriceUpdate) {
        try {
          const response = await axios.get(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${item.symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
          );
          console.log(`Response for ${item.symbol}:`, response.data);
          const quote = response.data['Global Quote'];
          
          if (quote && quote['05. price']) {
            // Update the portfolio item with the latest price data
            item.price = parseFloat(quote['05. price']);
            item.priceData = {
              open: quote['02. open'],
              high: quote['03. high'],
              low: quote['04. low'],
              volume: quote['06. volume'],
              tradingDay: quote['07. latest trading day'],
              previousClose: quote['08. previous close'],
              change: quote['09. change'],
              changePercent: quote['10. change percent']
            };
            item.lastUpdated = now;
            
            // Save the updated item
            await item.save();
          }
          await delay(12000); // API rate limiting
        } catch (error) {
          console.error(`Error updating price for ${item.symbol}:`, error.message);
        }
      }
      
      portfolio.push(item);
    }

    res.json(portfolio);
  } catch (error) {
    console.error('Portfolio fetch error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/portfolio', authenticateToken, async (req, res) => {
  try {
    const { symbol } = req.body;
    if (!symbol) {
      return res.status(400).json({ message: 'Stock symbol is required' });
    }
    console.log('Adding stock to portfolio:', symbol, 'for user:', req.user.userId);

    const existingEntry = await Portfolio.findOne({ userId: req.user.userId, symbol });
    if (existingEntry) {
      return res.status(400).json({ message: 'Stock already in portfolio' });
    }

    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    console.log(`Full response for ${symbol}:`, response.data);

    const quote = response.data['Global Quote'];
    if (!quote || !quote['05. price']) {
      return res.status(404).json({ 
        message: 'Stock not found', 
        details: 'No quote data returned from Alpha Vantage', 
        response: response.data 
      });
    }

    // Create a new portfolio entry with price data
    const portfolioEntry = new Portfolio({
      userId: req.user.userId, 
      symbol: symbol,
      price: parseFloat(quote['05. price']),
      priceData: {
        open: quote['02. open'],
        high: quote['03. high'],
        low: quote['04. low'],
        volume: quote['06. volume'],
        tradingDay: quote['07. latest trading day'],
        previousClose: quote['08. previous close'],
        change: quote['09. change'],
        changePercent: quote['10. change percent']
      },
      lastUpdated: new Date()
    });
    
    await portfolioEntry.save();
    console.log('Portfolio entry saved:', portfolioEntry);

    res.status(201).json({
      message: 'Stock added to portfolio',
      stock: portfolioEntry
    });
  } catch (error) {
    console.error('Portfolio add error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a route to delete a stock from portfolio
router.delete('/portfolio/:symbol', authenticateToken, async (req, res) => {
  try {
    const { symbol } = req.params;
    console.log('Removing stock from portfolio:', symbol, 'for user:', req.user.userId);

    const result = await Portfolio.findOneAndDelete({ 
      userId: req.user.userId, 
      symbol: symbol 
    });

    if (!result) {
      return res.status(404).json({ message: 'Stock not found in portfolio' });
    }

    res.json({ message: 'Stock removed from portfolio', symbol });
  } catch (error) {
    console.error('Portfolio delete error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const axios = require('axios');
// const { Portfolio } = require('../models/stockmodel');


// const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'YOUR_API_KEY_HERE';

// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// const authenticateToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Authentication required' });
//   try {
//     const decoded = require('jsonwebtoken').verify(token, process.env.SECRET_KEY || 'your-secret-key');
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error('Authentication error:', error);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// router.get('/stocks', async (req, res) => {
//   try {
//     console.log('Alpha Vantage API Key:', ALPHA_VANTAGE_API_KEY);
//     if (!ALPHA_VANTAGE_API_KEY) {
//       throw new Error('Alpha Vantage API key is missing');
//     }

//     const allSymbols = [
//       'GOOGL', 'AAPL', 
//       // 'MSFT', 'AMZN', 'TSLA'
//     ];

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const symbols = allSymbols.slice(startIndex, endIndex);
//     console.log(`Fetching US stocks for page ${page}, limit ${limit}:`, symbols);

//     const stocks = [];
//     for (const symbol of symbols) {
//       try {
//         const response = await axios.get(
//           `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
//         );
//         console.log(`Response for ${symbol}:`, response.data);

//         const quote = response.data['Global Quote'];
//         if (quote && quote['05. price']) {
//           stocks.push({
//             id: symbol,
//             name: symbol,
//             symbol: symbol,
//             price: parseFloat(quote['05. price']),
//           });
//         } else {
//           console.warn(`No valid quote data for ${symbol}:`, response.data);
//           if (response.data['Information']) {
//             console.warn('Rate limit or error:', response.data['Information']);
//           }
//         }
//       } catch (error) {
//         console.error(`Error fetching ${symbol}:`, error.message);
//       }
//       await delay(12000); 
//     }

//     console.log('Stocks fetched:', stocks);
//     res.json({
//       stocks,
//       totalStocks: allSymbols.length,
//       currentPage: page,
//       totalPages: Math.ceil(allSymbols.length / limit),
//     });
//   } catch (error) {
//     console.error('Error in stocks route:', error.message);
//     res.status(500).json({ message: 'Error fetching real-time stock data', error: error.message });
//   }
// });

// // Portfolio Routes
// router.get('/portfolio', authenticateToken, async (req, res) => {
//   try {
//     console.log('Fetching portfolio for user:', req.user.userId);
//     const portfolioItems = await Portfolio.find({ userId: req.user.userId });
//     console.log('Portfolio items:', portfolioItems);

//     const portfolio = [];
//     for (const item of portfolioItems) {
//       try {
//         const response = await axios.get(
//           `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${item.symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
//         );
//         console.log(`Response for ${item.symbol}:`, response.data);
//         const quote = response.data['Global Quote'];
//         if (quote && quote['05. price']) {
//           portfolio.push({
//             id: item.symbol,
//             name: item.symbol,
//             symbol: item.symbol,
//             price: parseFloat(quote['05. price']),
//           });
//         }
//       } catch (error) {
//         console.error(`Error fetching ${item.symbol}:`, error.message);
//       }
//       await delay(12000);
//     }

//     res.json(portfolio);
//   } catch (error) {
//     console.error('Portfolio fetch error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// router.post('/portfolio', authenticateToken, async (req, res) => {
//   try {
//     const { symbol } = req.body;
//     if (!symbol) {
//       return res.status(400).json({ message: 'Stock symbol is required' });
//     }
//     console.log('Adding stock to portfolio:', symbol, 'for user:', req.user.userId);

//     const existingEntry = await Portfolio.findOne({ userId: req.user.userId, symbol });
//     if (existingEntry) {
//       return res.status(400).json({ message: 'Stock already in portfolio' });
//     }

//     const response = await axios.get(
//       `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
//     );
//     console.log(`Full response for ${symbol}:`, response.data);

//     const quote = response.data['Global Quote'];
//     if (!quote || !quote['05. price']) {
//       return res.status(404).json({ 
//         message: 'Stock not found', 
//         details: 'No quote data returned from Alpha Vantage', 
//         response: response.data 
//       });
//     }

//     const portfolioEntry = new Portfolio({ userId: req.user.userId, symbol });
//     await portfolioEntry.save();
//     console.log('Portfolio entry saved:', portfolioEntry);

//     res.status(201).json({
//       message: 'Stock added to portfolio',
//       stock: {
//         id: symbol,
//         name: symbol,
//         symbol,
//         price: parseFloat(quote['05. price']),
//       },
//     });
//   } catch (error) {
//     console.error('Portfolio add error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// module.exports = router;