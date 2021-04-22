const express = require('express');
const router = express.Router();
// const Listing = require('../models/listing');
const mysqlcon = require('./../dataconnector')




router.get('/', async (req, res) => {
   console.log(mysqlcon);
   mysqlcon.query("SELECT * FROM user;", function (err, result, fields) {
      if (err) throw err;
      result.forEach(element => {
         console.log(element);
      });
   });
});

router.get('/post/:id', getListingByID, (req, res) => {
   // res.status(200).json(res.listing)
   // res.status(200).json(res.l)
});

router.get('/tweet/:id', getListingByID, (req, res) => {
   // res.status(200).json(res.listing)
   // res.status(200).json(res.l)
});

router.get('/retweet/:id', getListingByID, (req, res) => {
   // res.status(200).json(res.listing)
   // res.status(200).json(res.l)
});




router.post('/newuser', async (req, res) => {
   try {

      //check if user exists
      let sql1 = `SELECT UID FROM user WHERE UNAME = '${req.body.UNAME}'`;
      console.log(sql1);
      mysqlcon.query(sql1, function (err, result, fields) {
         if (err) {
            res.status(400).json({ err: err });
         }
         else {
            if (result.length > 0) {
               console.log(result);
               console.log("user exits");
               res.status(418).json({ id: -1 });
            }
            else {
               //add user
               console.log("username is good");
               let sql2 = `INSERT INTO user (UNAME, UFN, ULN, join_date, pass_hash, email) VALUES ('${req.body.UNAME}','${req.body.UFN}','${req.body.ULN}',NOW(),'${req.body.pass_hash}','${req.body.email}')`;
               mysqlcon.query(sql2, function (err, result) {
                  if (err) {
                     res.status(400).json({ err: err });
                  }
                  else {
                     console.log("user added ");
                     console.log(result);
                     res.status(201).json({ UID: result.insertId })
                  }
               });
            }
         }
      });




   }
   catch {
      res.status(500);
   }

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

router.delete('/:id', getListingByID, async (req, res) => {
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