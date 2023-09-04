const shortUrlCollection= require('../models/shortUrlModel')
const userCollection= require('../models/userModel')
const jwt= require('jsonwebtoken')
require(`dotenv`).config()

const SaveUrl = async (req, res) => {
    try {
      const userId = req.UserId;
      const full = req.body.fullUrl;
      const short = req.body.shortenedURL;
      let user = await shortUrlCollection.findOne({ userId });
  
      if (!user) {
        user = new shortUrlCollection({ userId });
      }
      user.Url.push({ full, short });
      await user.save();
      res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  const getUrl = async (req, res) => {
    try {
        const userId = req.UserId
        const response = await shortUrlCollection.findOne({userId:userId })
        res.status(200).json({ Url:response.Url.reverse()})
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
  module.exports = { SaveUrl, getUrl}
  
  
  