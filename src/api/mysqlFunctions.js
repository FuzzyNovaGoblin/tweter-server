const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');


router.get('/', async (req, res) => {
   try {
      const listings = await Listing.find();
      res.json(listings)
   } catch (err) {
      res.status(500).json(err.messege)
   }
});

router.get('/:id', getListingByID, (req, res) => {
   res.status(200).json(res.listing)
   // res.status(200).json(res.l)
});

router.post('/', async (req, res) => {
   try {
      const listing = new Listing({ name: req.body.name, count: req.body.count });
      const newListing = await listing.save();
      res.status(201).json(newListing);
   }
   catch {
      res.status(400);
   }
});

router.patch('/:id', async (req, getListingByID, res) => {

   res.send('hello World!');
});

router.delete('/:id',getListingByID, async (req, res) => {
   try {
      await res.listing.remove();
      res.status(500).json({ messege: `Deleted ${res.listing}` })

   } catch (error) {
      res.status(500).json()
   }
});


async function getListingByID(req, res, next) {
   let listing;
   try {
      listing = await Listing.findById(req.params.id);
      if (listing == null) {
         return res.status(404).json({ messege: "cannot find item" });
      }
   } catch (err) {
      res.status(500).json(err.messege)
   }
   res.listing = listing;
   next();
}


module.exports = router;