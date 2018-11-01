const maps = require('./maps')

const getRandomDate = () => {
  const currentDate = new Date();

  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + 20);
  return new Date(currentDate.getTime() + Math.random() * (futureDate.getTime() - currentDate.getTime()))
}

const getRandomSchedule = () => {
  const eventDate = getRandomDate();

  return {
    startsAt: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 9, 0, 0),
    endsAt: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 18, 0, 0),
  }
};

const getRandomName = () => {
  const possibleNames = ['Cal Hacks 5.0', 'HackHolyoke', 'VandyHacks', 'HackNJIT', 'NYHacks', 'HackFlorida', 'MakeBrasil', 'UB Hacking']

  const position = Math.floor(Math.random() * (possibleNames.length));
  return possibleNames[position]
};

const getEvents = (zipcode, travel_distance, callback, eventsNumber = 6) => {
  console.log(eventsNumber)
  const events = []
  for (let i = 0; i < eventsNumber; i++) {
    events.push({
      name: getRandomName(),
      schedule: getRandomSchedule(),
    })
  }
  console.log(Array.from(Array(eventsNumber)), events)

  const sortedEvents = events.sort((a, b) => {
    return a.schedule.startsAt - b.schedule.startsAt;
  })

  maps.addRandomAddresses(zipcode, travel_distance, sortedEvents, callback)
}

module.exports = {
  getEvents,
}
