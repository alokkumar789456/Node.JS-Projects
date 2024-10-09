const auth = require('../middleware/auth');
const shortid = require('shortid');
const URL = require('../models/URL');

exports.shorten =  auth, async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = shortid.generate();
    try {
      let url = new URL({ originalUrl, shortUrl, user: req.user });
      await url.save();
      res.json({ shortUrl });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }

exports.getUrl = async (req, res) => {
    try {
      const url = await URL.findOne({ shortUrl: req.params.shortUrl });
      if (!url) return res.status(404).json({ msg: 'URL not found' });
      url.clicks++;
      await url.save();
      res.redirect(url.originalUrl);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }


