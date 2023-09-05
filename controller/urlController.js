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

 
  const deleteUrl = async (req, res) => {
    try {
      const userId = req.UserId
      const urlIdToDelete = req.params.urlId
  
      const response = await shortUrlCollection.updateOne(
        { userId: userId },
        { $pull: { Url: { _id: urlIdToDelete } } }
      );
  
      if (response.modifiedCount === 0) {
        return res.status(404).json({ message: "URL not found" });
      }
      
      const updatedDocument = await shortUrlCollection.findOne({ userId: userId });
  
      res.status(200).json({ Url: updatedDocument.Url.reverse() });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  module.exports = { SaveUrl, getUrl,deleteUrl}
  

  
   // const deleteUrl1 = async (req, res) => {
  //   try {
  //     console.log('hello iam delete url')
  //     const userId = req.UserId; 
  //     const urlIdToDelete = req.params.urlId; 
  //     console.log(urlIdToDelete,'hjhjhh')
      
  //   //  const url = await shortUrlCollection.findOne({_id: urlIdToDelete, userId: userId });
  //    const url = await shortUrlCollection.findOne({
  //     userId: userId,
  //     Url: { $elemMatch: { _id: urlIdToDelete } },
  //   });
  //    console.log(url,'eerer')
  //     if (!url) {
  //       return res.status(404).json({ message: "URL not found" });
  //     }
  //     console.log('hdsds')
  //     const response = await shortUrlCollection.deleteOne({ _id: urlIdToDelete });
  //     console.log(response,'---------------')
  //     const remainingUrls = await shortUrlCollection.find({ userId: userId });
  
  //     res.status(200).json({ Url: remainingUrls.reverse() });
  //   } catch (error) {
  //     return res.status(500).json({ message: "Internal Server Error" });
  //   }
  // };