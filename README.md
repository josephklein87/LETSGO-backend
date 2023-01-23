# LETS GO APP BACKEND
created by Joe Klein

This is a backend for the LETSGO app set up using Express and Postgres.

The purpose of the app is to find or submit cool events in your area, confined to three cities currently (NY / LA / CHICAGO)

The features are as follows:

Routes for multiple functionalities. We have full CRUD and the backend interacts with the front end by searching by the selected city on the front-end and returning events from that city.

Users can then click on buttons on the front end to fav events to save them to their profile or sort by date. The favs are accomplished with INNER JOIN of a separate "following" database.

Users can see their own submitted events on their user profile page with a route that returns only the events that match user.