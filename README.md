# AI-Powered Skin Cancer Detection

## 🚀 Overview
We developed an **AI-Powered Skin Cancer Detection** system in a **hackathon within 24 hours**. The project utilizes the **MERN stack**, along with **Flask** and **MobileNetV2** for skin cancer detection. Our model is trained on **10,000+ images**, ensuring accurate predictions.

## 🏗️ Tech Stack
- **Frontend:** React JS
- **Backend:** Express.js (Node.js)
- **AI Model:** MobileNetV2 (Flask API)
- **Database:** MongoDB
- **Maps Integration:** Mapbox
- **AI Assistant:** Gemini AI for preventive measures
- **Chatbot:** Provides information related to skin cancer

## 📌 Features
✅ **Skin Cancer Prediction:** Upload an image of the affected skin area, and the AI model detects the possibility of skin cancer.  
✅ **AI-Based Preventive Measures:** The detected results are analyzed using **Gemini AI**, which provides personalized preventive measures.  
✅ **Nearby Hospitals Locator:** Integrated with **Mapbox** to show nearby hospitals for immediate medical assistance.  
✅ **Chatbot Assistance:** Get instant answers to common skin cancer-related queries.  
✅ **Seamless Integration:** Frontend collects user data and sends it to the backend (Express.js), which then communicates with Flask for AI-based predictions. Results are further enhanced using Gemini AI.  

## 🛠️ Installation & Setup
### Clone the Repository
```sh
git clone https://github.com/Pranav-Sutar47/DermaSense
```

### Backend Setup (Express + Flask)
1. **Navigate to Backend Directory:**
   ```sh
   cd backend
   ```
2. **Install Dependencies:**
   ```sh
   npm install
   ```
3. **Start Backend Server:**
   ```sh
   npm start
   ```
4. **Run Flask Model Server:**
   ```sh
   cd model
   pip install -r requirements.txt
   python app.py
   ```

### Frontend Setup (React)
1. **Navigate to Frontend Directory:**
   ```sh
   cd frontend
   ```
2. **Install Dependencies:**
   ```sh
   npm install
   ```
3. **Start React App:**
   ```sh
   npm start
   ```

## 🚀 Usage
1. Upload an image of the affected skin area.
2. The AI model (MobileNetV2) processes the image and detects the likelihood of skin cancer.
3. The Express.js backend fetches additional **preventive measures from Gemini AI** based on the results.
4. If needed, use **Mapbox integration** to find nearby hospitals.
5. Use the **chatbot** to get insights into skin cancer symptoms, treatment, and FAQs.


## 🤖 AI Model Details
- **Model Used:** MobileNetV2
- **Dataset:** 10,000+ labeled images
- **Framework:** TensorFlow & Flask API

## 📍 Future Enhancements
🔹 Improve model accuracy with a larger dataset.  
🔹 Implement an appointment booking system with hospitals.  
🔹 Enhance chatbot capabilities with more dynamic interactions.  

## 🏆 Hackathon Achievement
This project was built in just **24 hours** during a hackathon, demonstrating a practical application of AI in **healthcare & early disease detection**.

---

🌟 **If you like this project, give it a star! ⭐**

