const express = require('express');
const router = express.Router();
const mysqlcon = require('./../dataconnector')




router.get('/retweet/:PID', async (req, res) => {
   let sql = `SELECT tweet.text, user.uname, post.time FROM post join tweet on post.PID = tweet.PID join user on post.UID = user.UID where post.PID = ${req.params.PID}`;

   mysqlcon.query(sql, function (err, result, fields) {
      if (err) {
         res.status(400).json({ err: err });
      }
      else {

         res.status(200).json(result)

      }
   });
});

router.get('/tweet/:PID', async (req, res) => {
   let sql = `SELECT tweet.text, user.uname, post.time FROM post join tweet on post.PID = tweet.PID join user on post.UID = user.UID where post.PID = ${req.params.PID}`;

   mysqlcon.query(sql, function (err, result, fields) {
      if (err) {
         res.status(400).json({ err: err });
      }
      else {

         res.status(200).json(result)

      }
   });
});

router.get('/timeline/:UID',  async (req, res) => {


   let sql = `SELECT PID, post_type_id FROM user JOIN follow ON user.UID = follow.follower_id JOIN post ON follow.followed_id = post.UID WHERE user.UID = ${req.params.UID} ORDER BY post.time`;

   mysqlcon.query(sql, function (err, result, fields) {
      if (err) {
         res.status(400).json({ err: err });
      }
      else {
         res.status(200).json({posts:result})
      }
   });

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

// router.patch('/:id', async (req, getListingByID, res) => {

//    res.send('hello World!');
// });

// router.delete('/:id', getListingByID, async (req, res) => {
//    try {
//       await res.listing.remove();
//       res.status(500).json({ messege: `Deleted ${res.listing}` })

//    } catch (error) {
//       res.status(500).json()
//    }
// });



module.exports = router;