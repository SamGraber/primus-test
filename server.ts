const port = parseInt(process.argv[2], 10) || 2000;
import * as authParser from 'basic-auth-parser';
import * as Primus from 'primus';

const primus = new Primus.createServer({
	port: port, 
	transformer: 'websockets',
	iknowhttpsisbetter: true,
	passphrase: 'password',
});
let color = 'blue';

switch (port) {
  case 2001:
    color = 'red';
    break;

  case 2002:
    color = 'green';
    break;

  case 2003:
    color = 'purple';
    break;
}

primus.save(__dirname + '/primus.js');

primus.authorize((req, done) => {
	if (req.query.token == 'password') {
		done();
	} else {
		return done({ statusCode: 403 });
	}
});

primus.on('connection', function(ws) {
  console.log('CONNECTED', port);
  ws.on('data', function(msg) {
	console.log(msg);
	primus.write(msg);
  });
});