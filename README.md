

# 🏥 AI Clinical Decision Support System (CDSS)

## 📌 Overview

The **AI Clinical Decision Support System (CDSS)** is a full-stack web application designed to assist in preliminary medical analysis using artificial intelligence. It collects patient symptoms, vital signs, and medical history, and uses an AI-powered agent to generate possible diagnoses with confidence scores, recommend medical tests, and detect critical emergency conditions.

> ⚠️ **Disclaimer:** This application is for educational purposes only and does NOT provide real medical advice. Always consult a qualified healthcare professional.

---

## 🚀 Features

* 🧠 AI-powered diagnosis prediction
* 📊 Confidence-based results with visual indicators
* 🧪 Recommended medical tests
* 🚨 Emergency condition detection with alerts
* 📋 Structured patient data input (symptoms, vitals, history)
* 📱 Fully responsive modern healthcare UI
* 🎨 Clean design using Tailwind CSS

---

## 🧩 Tech Stack

### Frontend

* React (TypeScript)
* Tailwind CSS

### Backend

* Node.js
* Express.js

### AI Integration

* Google AI Studio (Gemini API)
* Rule-based + AI-assisted reasoning

---

## 🏗️ Project Structure

```
cdss-project/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── App.tsx
│   └── styles/
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── controllers/
│   └── server.js
│
└── README.md
```

---

## ⚙️ How It Works

1. User enters:

   * Symptoms (severity scale)
   * Vital signs
   * Medical history

2. Frontend sends data to:

   ```
   POST /diagnose
   ```

3. Backend:

   * Processes input
   * Passes data to AI agent

4. AI Agent:

   * Analyzes patterns
   * Predicts conditions
   * Assigns confidence scores
   * Detects emergencies

5. Results displayed in UI:

   * Primary diagnosis
   * Top 3 conditions
   * Recommended tests
   * Emergency alerts (if any)

---

## 📡 API Endpoint

### POST `/diagnose`

#### Request Body:

```json
{
  "age": 45,
  "symptoms": {
    "fever": 2,
    "cough": 1,
    "breathingDifficulty": 3,
    "chestPain": 2
  },
  "vitals": {
    "heartRateAbnormal": true,
    "bloodPressureIssue": true
  },
  "history": {
    "diabetes": false,
    "heartDisease": true,
    "smoking": true
  }
}
```

#### Response:

```json
{
  "primaryDiagnosis": {
    "name": "Heart Attack",
    "confidence": 85
  },
  "topConditions": [
    { "name": "Heart Attack", "confidence": 85 },
    { "name": "Angina", "confidence": 65 },
    { "name": "GERD", "confidence": 40 }
  ],
  "recommendedTests": ["ECG", "Blood Test", "Chest X-ray"],
  "urgentTests": ["ECG"],
  "isEmergency": true,
  "emergencyMessage": "Seek immediate medical attention",
  "disclaimer": "This is not medical advice"
}
```

---

## 🧠 AI Agent Logic

* Uses symptom severity scoring (0–3 scale)
* Applies weighted rules for diagnosis
* Considers risk factors (age, history)
* Detects emergency patterns:

  * Chest pain + heart disease → Heart Attack
  * Breathing difficulty + fever → Pneumonia
  * BP issues + headache → Hypertensive Crisis

---

## 🖥️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/cdss-project.git
cd cdss-project
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
npm start
```

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Future Improvements

* 🔬 Integration with real medical datasets
* 🤖 Advanced ML model (TensorFlow/PyTorch)
* 🔐 User authentication system
* ☁️ Deployment (Firebase / AWS)
* 📊 Patient history tracking

---

## ⚠️ Disclaimer

This project is intended strictly for:

* Educational purposes
* Demonstration of AI in healthcare

❌ Not approved for clinical use
❌ Not a replacement for professional medical advice

