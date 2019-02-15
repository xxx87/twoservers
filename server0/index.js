const createSubscriber = require('pg-listen');
const conString = 'tcp://postgres:postgres@localhost:5432/tmpsequelize';
const subscriber = createSubscriber({ connectionString: conString });
subscriber.connect();
subscriber.listenTo("myEvent");
subscriber.notifications.on("myEvent", (payload) => {
	if(payload.key1 === 'new') check(payload);
});

function check(payload) {
	console.log('PAYLOAD: ', payload);
}
