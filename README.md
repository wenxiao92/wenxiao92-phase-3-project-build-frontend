### Trip Planner
---
A person would be able to book an activity in the trip with other people or by him/herself. He/She should be able to get all the bookings by going through each activity (via dropdown) and edit the booking. They can also create a new booking and choose the participants.

### Requirement
---
You will need to have yarn and Ruby installed to use Trip Planner web page

### Getting Started
---
To get started type the below in the terminal
```
~/phase-3-project-build cd frontend
~/phase-3-project-build cd yarn start
```

Open a new terminal and enter this in
```
~/phase-3-project-build cd backend
~/phase-3-project-build cd bundle install
~/phase-3-project-build rake db:migrate
~/phase-3-project-build rake db:seed
~/phase-3-project-build rake server
```

### Backend
[Backend Repo](https://github.com/wenxiao92/phase-3-trip-planning-project/tree/project-build)

### Features/MVP
* Render initial page to book an activity
* Create booking based on availability (determined by chosen activity and timeslot)
* Current bookings can be edited (CRUD)
* Add travelers to the whole trip

### License
[MIT](https://choosealicense.com/licenses/mit/)