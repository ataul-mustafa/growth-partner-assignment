AI Finance Asst. Project Setup Documentation
Table of Contents
1.	Backend Setup
o	Prerequisites
o	Clone the Repository
o	Install Dependencies
o	Environment Variables
o	MongoDB Setup
o	Running the Server
2.	Frontend Setup
o	Prerequisites
o	Clone the Repository
o	Install Dependencies
o	Running the Client

Clone the Repository
     git clone https://github.com/ataul-mustafa/growth-partner-assignment.git

Backend Setup
Prerequisites
Ensure you have the following installed on your system:
•	Node.js (v14 or higher)
•	npm (v6 or higher)
•	MongoDB (running instance)
Change the directory
Cd server
Install Dependencies
npm install

Environment Variables
Create a .env file in the root of your project and add the following variables:
PORT=5000
CHATGPT_API_KEY=YOUR_CHATGPT_API_KEY
MongoDB Setup
Ensure you have a running MongoDB instance. You can use services like MongoDB Atlas or run a local instance. Update the MONGO_URI in your .env file with your connection string.
Running the Server
npm run dev
The backend server should now be running on http://localhost:5000.

Frontend Setup
Prerequisites
Ensure you have the following installed on your system:
•	Node.js (v14 or higher)
•	npm (v6 or higher)
Chagne the direcotry
cd client
Install Dependencies
npm install
Running the Client
npm run dev
The frontend should now be running on http://localhost:5173

In case you have any query please mail me at ataul.computer786@gmail.com
