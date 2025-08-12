🏠 FlexLiving Project

Welcome to the FlexLiving app! This project showcases a modern full-stack application integrating Google Reviews data, with a sleek dashboard to manage and analyze reviews. 🚀


📦 Tech Stack

- Frontend: React.js + Material-UI  
- Backend: Node.js + Express.js  
- Deployment:  
  - Backend: Render  
  - Frontend: Vercel  

🛠️ Key Design & Logic Decisions

- Frontend:  
  - Component-based React architecture with reusable hooks  
  - Responsive design with Material-UI for a clean UI/UX  
- Backend:  
  - RESTful API endpoints for scalable and maintainable services  
  - Middleware for JSON parsing & error handling  
- API:  
  - Centralized routes to fetch and normalize review data  
- Data Handling:  
  - Used mock data due to Google Reviews API sandbox limitations  
  - Enabled filtering & sorting on the frontend for better user experience

🔗 API Endpoints

Endpoint: /api/reviews  
Method: GET  
Description: Retrieves all reviews

📊 Google Reviews Findings

- The real Google Reviews API is sandboxed with limited data access.  
- Used mock data to simulate realistic reviews for testing features like filtering by category, rating, and channel.

🚀 Running Locally

Backend:  
cd backend  
npm install  
npm start

Runs on: http://localhost:4000

Frontend:  
cd frontend  
npm install  
npm start

Runs on: http://localhost:3000

🌍 Deployment

- Backend deployed on Render: https://flexliving.onrender.com  
- Frontend deployed on Vercel: https://flexlivingfront.vercel.app

🤖 AI Tool Used

This project was developed with support from chat GPT language model to accelerate development and improve code quality.

🎉 Thank You!

Feel free to explore the code and reach out if you have any questions or feedback!
