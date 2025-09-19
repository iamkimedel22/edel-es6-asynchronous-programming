# ES6 Asynchronous Programming Project

## 🎯 Project Overview
This project demonstrates advanced ES6 concepts, classes, and asynchronous JavaScript programming using Promises, Async/Await, and the Fetch API to work with student data.

## 📂 Project Structure
```
edel-es6-asynchronous-programming/
├── index.html          # Main HTML file
├── script.js           # JavaScript ES6 implementation
├── style.css          # CSS styles
├── data/
│   └── students.json  # JSON data file
└── README.md          # Project documentation
```

## 🚀 Features Implemented

### Part 1 - ES6 Classes
- **Student Class**: Properties (id, name, age, course) with `introduce()` method
- **Instructor Class**: Properties (id, name, subject) with `teach()` method
- **Course Class**: Additional class for better data organization
- **DataManager Class**: Handles data loading and processing

### Part 2 - Asynchronous JavaScript
- ✅ **Promises Implementation**: Using `.then()` and `.catch()`
- ✅ **Async/Await Implementation**: Modern async syntax
- ✅ **Error Handling**: Comprehensive error handling for both methods
- ✅ **Console Logging**: Both versions log data to console

### Part 3 - Fetch API & Display Data
- ✅ **Fetch API**: Loads data from `students.json`
- ✅ **Dynamic Display**: Shows students, courses, and instructors
- ✅ **Age Highlighting**: Students older than 21 are highlighted with ⭐
- ✅ **Responsive Design**: Modern, mobile-friendly interface

### Part 4 - Data Relationships
- ✅ **Student-Course Matching**: Links students to their courses with descriptions
- ✅ **Course-Instructor Matching**: Shows which instructor teaches each course
- ✅ **Visual Relationships**: Clear display of data connections

## 🛠️ Technologies Used
- **HTML5**: Semantic markup with SEO meta tags
- **CSS3**: Modern styling with Flexbox/Grid, animations, and responsive design
- **ES6+ JavaScript**: Classes, Promises, Async/Await, Template Literals, Arrow Functions
- **Fetch API**: For loading JSON data
- **JSON**: Structured data storage

## 📱 SEO Requirements Met
- ✅ **Title**: Descriptive page title
- ✅ **Description**: Meta description for search engines
- ✅ **Viewport**: Mobile-responsive viewport meta tag

## 🎨 User Interface Features
- **Loading States**: Animated spinner during data loading
- **Interactive Buttons**: Load data using different async methods
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Styling**: Gradient backgrounds, cards, hover effects

## 🔧 How to Run

### Option 1: Live Server (Recommended)
1. Install a local server extension (like Live Server for VS Code)
2. Right-click on `index.html` and select "Open with Live Server"
3. The app will open in your browser

### Option 2: HTTP Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

### Option 3: Direct File Access
⚠️ **Note**: Due to CORS restrictions, opening `index.html` directly in the browser may not load the JSON file. Use a local server instead.

## 📊 Expected Output

### Students Display
- Ana (20) – Computer Science
- Mark (22) – Information Technology ⭐
- John (19) – Software Engineering
- Maria (23) – Data Science ⭐
- James (21) – Cybersecurity
- Sarah (24) – Computer Science ⭐
- David (18) – Information Technology
- Lisa (25) – Data Science ⭐

### Courses Display
- **Computer Science**: Study of algorithms, programming, and computing systems.
- **Information Technology**: Focus on managing and deploying computer systems and networks.
- **Software Engineering**: Application of engineering principles to software development.
- **Data Science**: Exploration of data analysis, visualization, and machine learning.
- **Cybersecurity**: Protection of systems, networks, and programs from cyber threats.

### Instructors Display
- **John Rey Silverio** – Modern JavaScript & Next.js Prerequisites
- **Maria Santos** – Data Science Fundamentals
- **Robert Johnson** – Cybersecurity Essentials
- **Emily Davis** – Software Development Practices
- **Michael Chen** – Network Administration

### Data Relationships
- **Student → Course**: Ana → Computer Science → Study of algorithms, programming, and computing systems.
- **Course → Instructor**: Computer Science → Taught by John Rey Silverio

## 🎯 Learning Objectives Achieved
1. **ES6 Classes**: Constructor functions, methods,