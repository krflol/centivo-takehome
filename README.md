# Centivo API Take-Home Project

This project implements a Node.js and Express API that interfaces with a MongoDB database. Our approach focuses on ensuring that only users over the age of 21 can be accessed through the API endpoint. To achieve this, we leverage a MongoDB database view that permanently filters out any users who do not meet the age requirement, treating it as a mission-critical security measure baked into the data access layer. We would have a seperate view for this
if the requirements weren't explicit about the api only returning users over 21.

We handle invalid objects with a check before anything else.

Hope to hear back soon!

## Setup and Configuration

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env` file in the root of the project and add the following variables. The `PORT` is optional and will default to 3000.

    ```
    # .env.example
    MONGODB_URI=mongodb://127.0.0.1:27017/your_database_name
    PORT=3000
    ```

3.  **Database View Setup:**
    Run the following command to create the required MongoDB view.
    ```bash
    node setupMongoView.js
    ```

4.  **Start the Server:**
    ```bash
    npm start
    ```