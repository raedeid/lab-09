'use strict';
const superagent = require('superagent');
module.exports = getEvents;
function getEvents(location){
    const url = `https://api.eventful.com/json/events/search?location=${location}&date=future&app_key=${process.env.EVENTFUL_APP_KEY}`;
    return superagent.get(url)
    .then (data => parseEventsData(JSON.parse(data.text) ))
}
function parseEventsData(data){
    try {
        const events = data.events.event.map(eventData => {
            const event = new Event(eventData);
            return event;
        });
        return Promise.resolve(events);
    }
    catch(e){
        return Promise.reject(e);
    }
}
function Event(event) {
    this.link = enent.url;
    this.name = event.title;
    this.event_data = event.start_time;
    this.summaty = event.description;
}