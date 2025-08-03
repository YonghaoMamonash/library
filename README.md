# NoMash-Library 📚

A comprehensive Vue.js 3 library management system with Firebase Authentication and Firestore database integration.

## 🚀 Features

### Authentication System
- **Firebase Authentication** - Email/password login with role-based access
- **Traditional Authentication** - Demo login system 
- **Multi-role Support** - Admin, Librarian, Member, and Guest access levels
- **Dual Login System** - Choose between Firebase and traditional authentication

### Firestore Database Integration
- **CRUD Operations** - Create, Read, Update, Delete books
- **Advanced Queries** - WHERE, ORDER BY, and LIMIT operations
- **Real-time Data** - Live updates from Firestore
- **Query Demonstrations** - Examples of complex Firestore queries

### Modern UI/UX
- **Bootstrap 5** - Responsive design and modern components
- **Vue Router 4** - Multi-page navigation with guards
- **PrimeVue Components** - Enhanced UI components
- **Loading States** - User-friendly feedback and animations

## 🛠️ Tech Stack

- **Frontend**: Vue.js 3 (Composition API)
- **Styling**: Bootstrap 5 + Custom CSS
- **Routing**: Vue Router 4
- **State Management**: Pinia
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Build Tool**: Vite
- **Package Manager**: NPM

## 📋 Project Structure

```
src/
├── components/
│   ├── BookList.vue              # Basic book listing (Tutorial requirement)
│   ├── AdvancedBookList.vue      # CRUD operations with advanced queries
│   ├── BHeader.vue               # Navigation component
│   └── icons/                    # Icon components
├── views/
│   ├── AddBookView.vue           # Add books to Firestore
│   ├── FirebaseSigninView.vue    # Firebase authentication
│   ├── FirebaseRegisterView.vue  # User registration
│   ├── LoginView.vue             # Traditional login
│   └── HomeView.vue              # Main dashboard
├── firebase/
│   └── init.js                   # Firebase configuration
├── stores/
│   └── auth.js                   # Authentication state management
└── router/
    └── index.js                  # Route definitions
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- NPM or Yarn
- Firebase account

### Installation

1. **Clone the repository**
```sh
git clone https://github.com/YonghaoMamonash/FIT5032WEEK2.git
cd WEEK5/NoMash-Library
```

2. **Install dependencies**
```sh
npm install
```

3. **Firebase Configuration**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Update `src/firebase/init.js` with your config

4. **Run the development server**
```sh
npm run dev
```

5. **Open your browser**
   - Navigate to `http://localhost:5173`

## 🎯 Key Features Demonstration

### 1. Add Books (WEEK8 Tutorial Compliance)
- Navigate to `/addbook`
- Add books with ISBN and name
- Data is stored in Firestore "books" collection

### 2. View Books with Advanced Queries
- **Basic View**: Simple list (Tutorial requirement)
- **Advanced View**: Full CRUD with filtering
- **Query Examples**:
  - `WHERE isbn > 1000`
  - `ORDER BY isbn ASC/DESC` 
  - `LIMIT 5/10/20`

### 3. Authentication System
- Firebase login with role selection
- Traditional demo login
- Role-based access control
- User session management

## 📊 Database Schema

### Books Collection
```javascript
{
  isbn: Number,        // Required, must be > 1000 for listing
  name: String,        // Book title
  createdAt: String,   // ISO timestamp
  updatedAt: String    // ISO timestamp (for updates)
}
```

### User Roles
- **Admin**: Full system access
- **Librarian**: Library management
- **Member**: Book browsing and borrowing
- **Guest**: Catalog viewing only

## 🎓 Academic Requirements

This project fulfills **FIT5032 WEEK8 Firestore Tutorial** requirements:

### ✅ Basic Level (Pass/Credit)
- [x] Firebase Firestore setup and configuration
- [x] AddBook page with ISBN and name fields
- [x] Form prevents page reload on submit
- [x] Required field validation
- [x] ISBN stored as number type
- [x] Data added to "books" collection
- [x] BookList component displays books with ISBN > 1000
- [x] WHERE query implementation

### ✅ Advanced Level (Distinction/High Distinction)  
- [x] Complete CRUD operations (Create, Read, Update, Delete)
- [x] Advanced Firestore queries:
  - [x] WHERE clause filtering
  - [x] ORDER BY sorting (ascending/descending)
  - [x] LIMIT result limiting
- [x] Real-time data updates
- [x] Error handling and user feedback
- [x] Professional UI design

## 🖥️ Available Scripts

### Development
```sh
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 🌐 Live Demo

### Test Accounts
```
Firebase Login:
- Email: admin@test.com / Password: test123 / Role: Administrator
- Email: user@test.com / Password: test123 / Role: Member

Traditional Login:
- Username: admin / Password: admin123
- Username: user / Password: user123
```

### Demo Data
- Add books with ISBN > 1000 to see them in the list
- Try different query combinations in Advanced view
- Test CRUD operations with Edit/Delete buttons

## 🔧 Configuration

### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project or use existing
3. Enable Authentication → Email/Password
4. Create Firestore Database → Start in test mode
5. Copy configuration to `src/firebase/init.js`

### Environment Variables (Optional)
Create `.env.local` for sensitive data:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## 📱 Responsive Design

- ✅ Mobile-friendly navigation
- ✅ Responsive card layouts
- ✅ Touch-friendly buttons
- ✅ Adaptive form elements
- ✅ Bootstrap 5 grid system

## 🎨 UI Components

- **Cards**: Consistent styling across all pages
- **Forms**: Validated inputs with feedback
- **Buttons**: Loading states and hover effects
- **Modals**: Confirmation dialogs
- **Alerts**: Success/error messaging
- **Badges**: Status indicators

## 🚀 Deployment

### Netlify/Vercel
```sh
npm run build
# Upload dist/ folder
```

### Firebase Hosting
```sh
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 📄 License

This project is created for educational purposes as part of FIT5032 coursework.

## 👨‍💻 Author

**Yonghao Ma**  
- GitHub: [@YonghaoMamonash](https://github.com/YonghaoMamonash)
- Project: FIT5032 Week 8 - Firestore Tutorial Implementation

---

## 📚 Learning Outcomes

Students will learn:
- Vue.js 3 Composition API fundamentals
- Firebase Firestore database operations  
- Real-time data synchronization
- Modern JavaScript ES6+ features
- Responsive web design principles
- State management with Pinia
- Component-based architecture
- Authentication and authorization

**⭐ Star this repository if it helped you learn Vue.js and Firebase!**
