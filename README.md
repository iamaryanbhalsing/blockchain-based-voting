# 🗳️ Blockchain-Based Voting System - UniVote

A secure, transparent, and decentralized voting platform built with **Ethereum (Sepolia Testnet)**, **Node.js**, **MongoDB**, and modern web technologies.

---

## ✨ Features

- **Decentralized Voting** via Smart Contract on Sepolia
- **User Authentication** (Sign Up / Sign In with JWT)
- **Email OTP Verification** for registration & voting
- **Wallet Address Verification**
- **Real-time Gas Price** tracking (Etherscan API)
- **Secure Session Management**
- **Responsive Frontend** with modern UI

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
|------------|-------------------------------------|
| Frontend   | HTML, CSS, JavaScript               |
| Backend    | Node.js, Express, Mongoose          |
| Database   | MongoDB Atlas                       |
| Blockchain | Web3.js, Sepolia Testnet            |
| Auth       | JWT, bcrypt, Nodemailer (OTP)       |
| Others     | CORS, Express Session, Etherscan API|

---

## 📁 Project Structure
```
blockchain-based-voting/
├── README.md
├── backend/
│   ├── .env
│   ├── .gitignore
│   ├── app.js
│   ├── authenticate/
│   │   └── jwtCheck.js
│   ├── controller/
│   │   ├── gweiController.js
│   │   ├── homepageController.js
│   │   ├── registrationController.js
│   │   ├── signInController.js
│   │   ├── signUpController.js
│   │   ├── verificationController.js
│   │   └── votePageController.js
│   ├── models/
│   │   ├── Otp.js
│   │   ├── registrationModel.js
│   │   └── voter.js
│   ├── package.json
│   ├── package-lock.json
│   └── router/
│       ├── gweiRouter.js
│       ├── homepageRouter.js
│       ├── registrationRouter.js
│       ├── signInRouter.js
│       ├── signUpRouter.js
│       ├── verificationRouter.js
│       └── votePageRouter.js
├── frontend/
│   ├── about2.html
│   ├── base2.png
│   ├── bg.png
│   ├── download.jpeg
│   ├── homepage.html
│   ├── index.html
│   ├── index2.html
│   ├── navbar.png
│   ├── registration.html
│   ├── registration.css
│   ├── signup.html
│   ├── ujj.css
│   ├── verification.html
│   ├── verification.css
│   ├── vote.html
│   └── vote.css
└── smart-contract/          # (Assumed - not in zip but referenced)
    ├── contracts/
    └── scripts/
```
---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/blockchain-based-voting.git
cd blockchain-based-voting
```
### 2. Backend Setup
```
cd backend
npm install
```
### Create .env file:
```
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
PRIVATE_KEY=your_private_key
CONTRACT_ADDRESS=0x...
MONGO_URI=your_mongodb_connection_string
```
### 3. Start Backend
```
npm start
# Server runs on http://localhost:3000
```
---

Voting Flow
User → OTP Verification → Wallet Check → Smart Contract Interaction → Vote Recorded on Sepolia

---

### 📋 API Endpoints

| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| POST   | `/api/SignUp`           | User registration (firstname, lastname, email, password) |
| POST   | `/api/SignIn`           | User login + JWT token generation    |
| POST   | `/api/Register`         | Register wallet address with OTP     |
| POST   | `/api/Send-Otp`         | Send OTP for voting verification     |
| POST   | `/api/Verify-Otp`       | Verify OTP for voting access         |
| POST   | `/api/CheckWallet`      | Validate registered wallet address   |
| GET    | `/api/Gwei`             | Fetch current Ethereum gas prices    |

---

🔐 Security Features

JWT Authentication
Hashed Passwords (bcrypt)
OTP with 1-minute expiry
Wallet address validation
CORS configured
CSP Headers

---

🌐 Blockchain Integration

Deployed on Sepolia Testnet
Uses Web3.js
Gas optimization via Etherscan API
Immutable vote records

---

🤝 Contributing

Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit changes (git commit -m 'Add AmazingFeature')
Push to branch (git push origin feature/AmazingFeature)
Open a Pull Request

---


### 📌 **Additional Future development Scope**

1. **Add a `CONTRACT.md`** explaining the smart contract.
2. **Deploy the contract** and update `CONTRACT_ADDRESS` in `.env`.
3. **Add `.gitignore`** for `node_modules`, `.env`, etc.
4. Consider adding **Docker** support for easier deployment.

Would you like me to also generate:
- A `docker-compose.yml`?
- Smart contract deployment script?
- Deployment guide?

---

### 🤝 Open to Opportunities

- Backend / Full-Stack Internships  
- Freelance web projects  
- AI/ML and productivity-focused collaborations  

---

### 📫 Contact & Socials

<p align="center">
  <a href="mailto:aryanbhalsing7090@gmail.com">
    <img src="https://img.shields.io/badge/Email-aryanbhalsing7090%40gmail.com-red?style=for-the-badge&logo=gmail" />
  </a>
  <a href="https://www.linkedin.com/in/iamaryanbhalsing">
    <img src="https://img.shields.io/badge/LinkedIn-iamaryanbhalsing-blue?style=for-the-badge&logo=linkedin" />
  </a>
  <a href="https://github.com/iamaryanbhalsing">
    <img src="https://img.shields.io/badge/GitHub-iamaryanbhalsing-black?style=for-the-badge&logo=github" />
  </a>
  <a href="https://leetcode.com/iamaryanbhalsing">
    <img src="https://img.shields.io/badge/LeetCode-Profile-orange?style=for-the-badge&logo=leetcode" />
  </a>
</p>

---

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=iamaryanbhalsing&label=Profile%20views&color=0e75b6&style=flat" alt="Profile views" />
</p>

---
<img src="https://camo.githubusercontent.com/a5dbb660f658cb0ba61949a83a2eac3bde636395a476ecc7c16124d2a1f9d8a0/68747470733a2f2f73746174732e70706861742e746f702f69636f6e733f6e616d653d6170706c652c617263686c696e75782c646f636b65722c646a616e676f2c666173746170692c6769746c61622c6769742c6769746875622c6a736f6e2c6a6176617363726970742c6c696e75782c6d6f6e676f64622c6e656f76696d2c6e67696e782c706f737467726573716c2c707974686f6e2c727573742c72656163742c72656469732c7461696c77696e646373732c26636f6c756d6e733d3230" />

---
