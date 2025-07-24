# Centivo API Take-Home Project

This project implements a secure Node.js and Express API that interfaces with a MongoDB database. Our approach focuses on ensuring that only users over the age of 21 can be accessed through the API endpoint. To achieve this, we leverage a MongoDB database view that permanently filters out any users who do not meet the age requirement, treating it as if it were mission-critical security measure baked into the data access layer. The setup for the view is included
for convenience.
