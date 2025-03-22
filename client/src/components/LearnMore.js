import React, { useRef, useState } from 'react';
import './LearnMore.css';



    // Knowledge base data
    const knowledgeBase = [
        { title: 'What is a Stock?', link: 'https://www.investopedia.com/terms/s/stock.asp', description: 'An overview of what stocks are and how they work.' },
        { title: 'How to Invest in Stocks', link: 'https://www.nerdwallet.com/article/investing/how-to-invest-in-stocks', description: 'A beginner\'s guide to investing in stocks.' },
        { title: 'Understanding Stock Market Indices', link: 'https://www.investopedia.com/terms/s/stockindex.asp', description: 'Learn about stock market indices like the S&P 500 and Nasdaq.' },
        { title: 'Stock Analysis Basics', link: 'https://www.fool.com/investing/how-to-invest/stocks/', description: 'Introduction to analyzing stocks before investing.' },
        { title: 'Risk Management in Stock Trading', link: 'https://www.investopedia.com/terms/r/riskmanagement.asp', description: 'Learn risk management techniques for stock trading.' },
        { title: 'Types of Stocks', link: 'https://www.investopedia.com/terms/c/common-stock.asp', description: 'Difference between common stocks and preferred stocks.' },
        { title: 'How Dividends Work', link: 'https://www.investopedia.com/terms/d/dividend.asp', description: 'A guide to understanding stock dividends.' },
        { title: 'What is an IPO?', link: 'https://www.investopedia.com/terms/i/ipo.asp', description: 'Learn about Initial Public Offerings (IPOs).' },
        { title: 'What is a Bear Market?', link: 'https://www.investopedia.com/terms/b/bearmarket.asp', description: 'Definition and characteristics of a bear market.' },
        { title: 'What is a Bull Market?', link: 'https://www.investopedia.com/terms/b/bullmarket.asp', description: 'Definition and characteristics of a bull market.' },
        { title: 'Understanding Market Capitalization', link: 'https://www.investopedia.com/terms/m/marketcapitalization.asp', description: 'Learn what market cap is and why it matters.' },
        { title: 'Stock Trading Strategies', link: 'https://www.nerdwallet.com/article/investing/stock-trading-strategies', description: 'Various strategies for trading stocks effectively.' },
        { title: 'What is a Stock Split?', link: 'https://www.investopedia.com/terms/s/stocksplit.asp', description: 'Learn how stock splits work and why companies do them.' },
        { title: 'Understanding Stock Buybacks', link: 'https://www.investopedia.com/terms/s/stock-buyback.asp', description: 'An overview of stock buybacks and their impact.' },
        { title: 'How to Read a Stock Chart', link: 'https://www.investopedia.com/articles/technical/102201.asp', description: 'A beginner\'s guide to reading stock charts.' },
        { title: 'What are Stock Options?', link: 'https://www.investopedia.com/terms/s/stockoption.asp', description: 'Introduction to stock options and how they work.' },
        { title: 'What is a Mutual Fund?', link: 'https://www.investopedia.com/terms/m/mutualfund.asp', description: 'Understanding mutual funds and their relation to stocks.' },
        { title: 'What is an ETF?', link: 'https://www.investopedia.com/terms/e/etf.asp', description: 'An overview of Exchange-Traded Funds (ETFs).' },
        { title: 'Technical vs. Fundamental Analysis', link: 'https://www.investopedia.com/terms/t/technicalanalysis.asp', description: 'Differences between technical and fundamental analysis.' },
        { title: 'Blue-Chip Stocks', link: 'https://www.investopedia.com/terms/b/bluechip.asp', description: 'Learn what blue-chip stocks are and their significance.' },
        { title: 'Growth vs. Value Stocks', link: 'https://www.investopedia.com/terms/g/growthstock.asp', description: 'Understand the difference between growth and value stocks.' },
        { title: 'Penny Stocks: Pros and Cons', link: 'https://www.investopedia.com/terms/p/pennystock.asp', description: 'Overview of penny stocks and associated risks.' },
        { title: 'Stock Market Regulation', link: 'https://www.investopedia.com/terms/s/sec.asp', description: 'Learn how the SEC regulates the stock market.' },
        { title: 'What is Insider Trading?', link: 'https://www.investopedia.com/terms/i/insidertrading.asp', description: 'Definition and examples of insider trading.' },
        { title: 'The Role of a Stockbroker', link: 'https://www.investopedia.com/terms/s/stockbroker.asp', description: 'Learn what stockbrokers do and how they assist investors.' },
        { title: 'The Basics of Day Trading', link: 'https://www.investopedia.com/terms/d/daytrading.asp', description: 'Introduction to day trading and its risks.' },
        { title: 'Swing Trading vs. Day Trading', link: 'https://www.investopedia.com/articles/trading/05/swingvsday.asp', description: 'Comparison between swing trading and day trading.' },
        { title: 'Margin Trading Explained', link: 'https://www.investopedia.com/terms/m/margintrading.asp', description: 'Learn what margin trading is and how it works.' },
        { title: 'Short Selling Basics', link: 'https://www.investopedia.com/terms/s/shortselling.asp', description: 'Introduction to short selling and its risks.' },
        { title: 'What is Market Liquidity?', link: 'https://www.investopedia.com/terms/l/liquidity.asp', description: 'Understand the concept of market liquidity.' },
        { title: 'What are Stock Futures?', link: 'https://www.investopedia.com/terms/f/futures.asp', description: 'Learn about stock futures and their usage.' },
        { title: 'The Importance of Diversification', link: 'https://www.investopedia.com/terms/d/diversification.asp', description: 'How diversification reduces risk in your portfolio.' },
        { title: 'What are Dividends?', link: 'https://www.investopedia.com/terms/d/dividend.asp', description: 'Learn how dividends are paid and their significance.' },
        { title: 'What is the Dow Jones Index?', link: 'https://www.investopedia.com/terms/d/djia.asp', description: 'An introduction to the Dow Jones Industrial Average.' },
        { title: 'S&P 500 Overview', link: 'https://www.investopedia.com/terms/s/sp500.asp', description: 'Learn about the S&P 500 and its significance in the market.' },
        { title: 'What is the Nasdaq Index?', link: 'https://www.investopedia.com/terms/n/nasdaq.asp', description: 'Overview of the Nasdaq stock market index.' },
        { title: 'What is Stock Volatility?', link: 'https://www.investopedia.com/terms/v/volatility.asp', description: 'Understanding stock price volatility and its impact.' },
        { title: 'Earnings Per Share (EPS)', link: 'https://www.investopedia.com/terms/e/eps.asp', description: 'Learn what EPS is and why it matters to investors.' },
        { title: 'Price-to-Earnings Ratio (P/E)', link: 'https://www.investopedia.com/terms/p/price-earningsratio.asp', description: 'An explanation of the P/E ratio and how to use it.' },
        { title: 'The Importance of a 10-K Report', link: 'https://www.investopedia.com/terms/1/10k.asp', description: 'Learn what a 10-K report is and its relevance for investors.' },
        { title: 'What is a Dividend Yield?', link: 'https://www.investopedia.com/terms/d/dividendyield.asp', description: 'Understanding dividend yield and its importance.' },
        { title: 'What is Arbitrage?', link: 'https://www.investopedia.com/terms/a/arbitrage.asp', description: 'Learn the basics of arbitrage trading.' },
        { title: 'Stock Market Bubbles', link: 'https://www.investopedia.com/terms/s/stock-market-bubble.asp', description: 'What causes stock market bubbles and how to identify them.' },
        { title: 'Understanding Stock Beta', link: 'https://www.investopedia.com/terms/b/beta.asp', description: 'Learn about beta and how it measures stock volatility.' },
        { title: 'What is a Limit Order?', link: 'https://www.investopedia.com/terms/l/limitorder.asp', description: 'Introduction to limit orders and how they work.' },
        { title: 'What is a Market Order?', link: 'https://www.investopedia.com/terms/m/marketorder.asp', description: 'Learn about market orders and their usage.' },
        { title: 'The Basics of ETFs', link: 'https://www.investopedia.com/terms/e/etf.asp', description: 'Learn what ETFs are and how they differ from mutual funds.' },
        { title: 'How to Start an Investment Portfolio', link: 'https://www.investopedia.com/articles/basics/06/invest1000.asp', description: 'Steps to creating a diverse investment portfolio.' },
        { title: 'What are Stock CFDs?', link: 'https://www.investopedia.com/terms/c/contractfordifferences.asp', description: 'Learn about Contracts for Difference and their role in stock trading.' },
    ];


    // Filtered data based on the search term
function LearnMore() {
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef(null);

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    // Function to highlight text inside the topic
    const highlightText = (text) => {
        if (!searchQuery) return text;

        const regex = new RegExp(`(${searchQuery})`, 'gi');
        return text.split(regex).map((part, index) =>
            regex.test(part) ? <span key={index} className="highlight">{part}</span> : part
        );
    };

    return (
        <div className="learn-more-page">
            {/* Topic Search Section */}
            <div className="topic-search">
                Topic Search
            </div>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search topics..."
                className="search-bar"
                value={searchQuery}
                onChange={handleSearch}
            />

            {/* Topics Container */}
            <div className="topics-container" ref={containerRef}>
                {knowledgeBase.map((topic, index) => {
                    // Check if the topic contains the search query in title or description
                    const isMatched = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        topic.description.toLowerCase().includes(searchQuery.toLowerCase());

                    return (
                        <div
                            className={`topic-box ${isMatched ? 'highlight-box' : ''}`}
                            key={index}
                            style={{
                                display: searchQuery && !isMatched ? 'none' : 'block', // Hide non-matched topics
                            }}
                        >
                            <h3>{highlightText(topic.title)}</h3>
                            <p>{highlightText(topic.description)}</p>
                            <a href={topic.link} target="_blank" rel="noopener noreferrer">
                                Learn More
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default LearnMore;
