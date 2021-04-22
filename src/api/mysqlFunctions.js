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

/*  router.get('/post/:PID', getListingByID, (req, res) => {
    // res.status(200).json(res.listing)
    // res.status(200).json(res.l)
  });
*/

router.get('/tweet/:PID', getListingByID, (req, res) => {
   // res.status(200).json(res.listing)
   // res.status(200).json(res.l)
});

router.get('/retweet/:PID', getListingByID, (req, res) => {
   // res.status(200).json(res.listing)
   // res.status(200).json(res.l)
});

router.get('/timeline/:UID', getListingByID, (req, res) => {
   // res.status(200).json(res.listing)
   // res.status(200).json(res.l)
});




router.post('/newuser', async (req, res) => {
   try {

      //check if user exists
      let sql1 = `SELECT UID FROM user WHERE UNAME = '${req.body.UNAME}'`;
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


router.post('/tweet', async (req, res) => {
   try {
      let sql1 = `INSERT INTO post (UID, post_type_id, time) VALUES ('${req.body.UID}', 0, NOW())`;
      mysqlcon.query(sql1, function (err, result) {
         if (err) {
            res.status(400).json({ err: err });
         }
         else {
            //add user
            let PID = result.insertId;
            let sql2 = `INSERT INTO tweet (PID, text) VALUES (${PID},'${req.body.text}')`;
            mysqlcon.query(sql2, function (err, result) {
               if (err) {
                  res.status(400).json({ err: err });
               }
               else {
                  console.log("post added");
                  console.log(result);
                  res.status(201).json({ PID: PID })
               }
            });
         }
      });
      res.status(201).json(newListing);
   }
   catch {
      res.status(500);
   }
});

router.post('/retweet', async (req, res) => {
   try {
      let sql1 = `INSERT INTO post (UID, post_type_id, time) VALUES ('${req.body.UID}', 1, NOW())`;
      mysqlcon.query(sql1, function (err, result) {
         if (err) {
            res.status(400).json({ err: err });
         }
         else {
            //add user
            let PID = result.insertId;
            let sql2 = `INSERT INTO retweet (PID, original_post_id) VALUES (${PID},'${req.body.original_post_id}')`;
            mysqlcon.query(sql2, function (err, result) {
               if (err) {
                  res.status(400).json({ err: err });
               }
               else {
                  console.log("post added");
                  console.log(result);
                  res.status(201).json({ PID: PID })
               }
            });
         }
      });
      res.status(201).json(newListing);
   }
   catch {
      res.status(500);
   }
});


router.post('/follow', async (req, res) => {
   try {
      let sql1 = `INSERT INTO follow (follower_id, followed_id) VALUES ('${req.body.follower_id}','${req.body.followed_id}')`;
      mysqlcon.query(sql1, function (err, result) {
         if (err) {
            res.status(400).json({ err: err });
         }
         else {
            // let sql2 = `INSERT INTO retweet (PID, original_post_id) VALUES (${PID},'${req.body.original_post_id}')`;
            res.status(201);
         }
      });
      res.status(201).json(newListing);
   }
   catch {
      res.status(500);
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