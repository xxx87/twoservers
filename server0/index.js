const createSubscriber = require('pg-listen');
const cron = require('node-schedule');
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

var rule = new cron.RecurrenceRule();
rule.second = 30;
cron.scheduleJob(rule, function(){
	console.log(new Date(), 'The 30th second of the minute.');
});
