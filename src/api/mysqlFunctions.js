const express = require('express');
const router = express.Router();
const mysqlcon = require('./../dataconnector')




router.get('/retweet/:PID', async (req, res) => {
   let sql = `SELECT retweet.*, user.uname, post.time FROM post join retweet on post.PID = retweet.PID join user on post.UID = user.uid where post.PID  = ${req.params.PID}`;

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

router.get('/followers/:UID', async (req, res) => {
   let sql = `SELECT followed_id FROM follow WHERE follower_id = ${req.params.UID}`;

   mysqlcon.query(sql, function (err, result, fields) {
      if (err) {
         res.status(400).json({ err: err });
      }
      else {

         res.status(200).json(result.map((f) => { return f.followed_id }))

      }
   });
});

router.get('/timeline/:UID', async (req, res) => {


   let sql = `SELECT PID, post_type_id FROM user JOIN follow ON user.UID = follow.follower_id JOIN post ON follow.followed_id = post.UID WHERE user.UID = ${req.params.UID} ORDER BY post.time DESC`;

   mysqlcon.query(sql, function (err, result, fields) {
      if (err) {
         res.status(400).json({ err: err });
      }
      else {
         res.status(200).json({ posts: result })
      }
   });

});

router.get('/allusers', async (req, res) => {
   let sql = `SELECT UNAME, UID FROM user`;
   mysqlcon.query(sql, function (err, result, fields) {
      if (err) {
         res.status(400).json({ err: err });
      }
      else {
         res.status(200).json(result)
      }
   });
});

router.get('/auth/:uname/:pass', async (req, res) => {

   try {
      let sql = `SELECT UID, pass_hash FROM user WHERE UNAME = '${req.params.uname}'`;

      mysqlcon.query(sql, function (err, result, fields) {
         if (err) {
            res.status(400).json({ err: err });
         }
         else {
            console.log(result[0]);
            if (result.length == 0) {
               res.status(401).send();

            }
            else if (result[0].pass_hash == req.params.pass) {
               res.status(200).json(result[0].UID);
            }
            else {
               res.status(401).send();
            }
         }
      });

   } catch {
      res.status(401).send();
   }

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
            res.status(201).send(`followed ${req.body.followed_id}`)
            // .json({ followed_id: req.body.followed_id, follower_id: req.body.follower_id });
         }
      });

   }
   catch {
      res.status(500);
   }
});

router.post('/unfollow', async (req, res) => {
   try {
      let sql1 = `DELETE from follow where follower_id = ${req.body.follower_id} and followed_id =${req.body.followed_id}`;
      mysqlcon.query(sql1, function (err, result) {
         if (err) {
            res.status(400).json({ err: err });
         }
         else {
            // let sql2 = `INSERT INTO retweet (PID, original_post_id) VALUES (${PID},'${req.body.original_post_id}')`;
            res.status(201).send(`unfollowed ${req.body.followed_id}`)
            // .json({ unfollowed_id: req.body.followed_id, unfollower_id: req.body.follower_id });

         }
      });
   }
   catch {
      res.status(500);
   }
});


router.delete('/:PID', async (req, res) => {

   mysqlcon.query(sql, function (err, result, fields) {
      if (err) {
         res.status(400).json({ err: err });
      }
      else {

         res.status(200).json(result)

      }
   });
});




module.exports = router;