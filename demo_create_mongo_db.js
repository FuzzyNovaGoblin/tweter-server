// var MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://dbuser:dbuserpass@cluster0.3cvul.mongodb.net/?retryWrites=true&w=majority";
// const shoppinglistdbName = 'shoppinglistdb';
// const sampleAirbnbdbName = 'sample_airbnb';
// // var url = "mongodb://localhost:27017/mydb";

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// // function create(tmpobj) {
// //    MongoClient.connect(url, (err, db) => {
// //       if (err) throw err;
// //       let dbo = db.db(shoppinglistdbName);

// //       dbo.collection("customers").insertOne(tmpobj, (err, res) => {
// //          if (err) throw err;
// //          console.log("Collection created!");
// //          db.close();
// //       });
// //       db.close();
// //    });
// // }



// async function run(){
//    try {
//       await client.connect();
//       const database = client.db(shoppinglistdbName);
//       const col = database.collection('customers');
//       const query = {};
//       const foundThings = await col.findOne(query);
//       console.log(foundThings);
//    } finally {
//       await client.close();
//       console.log("closed connection1");
//    }
// }

// // run().catch(console.dir)


// async function findallin(dbName, collectionName) {
//    try {
//       await client.connect();
//       const database = client.db(dbName);
//       const col = database.collection(collectionName);
//       const query = {};
//       const foundThings = await col.find({});//.toArray();
//       console.log(foundThings);
//    } finally {
//       await client.close();
//       console.log("closed connection2");
//    }
// }

// findallin(shoppinglistdbName, 'customers').catch(console.dir);
// findallin(sampleAirbnbdbName, 'listingsAndReviews').catch(console.dir);



// // function findallin(collection) {
// //    // MongoClient.connect(url, (err, db) => {
// //    //    let dbo = db.db(shoppinglistdbName);
// //    //    dbo.collection(collection).find({}).toArray((err, result) => {
// //    //       if (err) throw err;
// //    //       console.log(result);
// //    //       db.close();
// //    //    });

// //    // });

// //    client.connect(err => {
// //       let collection = client.db(shoppinglistdbName).collection("customers");
// //       collection.find({}, (err, result) => {
// //          if (err) throw err;
// //          console.log(result);

// //       })
// //       client.close();
// //    });
// // }


// // // findallin("customers");
// // findallin("listingsAndReviews");

// console.log("end of file");