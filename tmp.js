const http = require('http')

const options = {
   hostname: '127.0.0.1',
   port: 5000,
   path: '/api/sql',
   method: 'GET'
}

let req = http.request(options, res => {
   console.log('status code ' + res.statusCode);
   res.on('data', d => {
      process.stdout.write(d)
      console.log(d)

   })

});


req.on('error', error => {
   console.error(error)
   console.log('joi');
})

req.end()