// ES6 Classes Implementation

// Student Class
class Student {
    constructor(id, name, age, course) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.course = course;
    }

    introduce() {
        return `Hi, my name is ${this.name}, I am ${this.age} years old, and I am enrolled in ${this.course}.`;
    }

    isOlderThan21() {
        return this.age > 21;
    }

    getDisplayInfo() {
        const ageHighlight = this.isOlderThan21() ? ' *' : '';
        return `${this.name} (${this.age}) – ${this.course}${ageHighlight}`;
    }
}

// Instructor Class
class Instructor {
    constructor(id, name, subject) {
        this.id = id;
        this.name = name;
        this.subject = subject;
    }

    teach() {
        return `I am ${this.name} and I teach ${this.subject}.`;
    }

    getDisplayInfo() {
        return `${this.name} – ${this.subject}`;
    }
}

// Course Class for better organization
class Course {
    constructor(id, title, description, instructor) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.instructor = instructor;
    }

    getDisplayInfo() {
        return `${this.title}: ${this.description}`;
    }
}

// Embedded JSON data (fallback for direct file access)
const EMBEDDED_DATA = {
    "students": [
        { "id": 1, "name": "Ana", "age": 20, "course": "Computer Science" },
        { "id": 2, "name": "Mark", "age": 22, "course": "Information Technology" },
        { "id": 3, "name": "John", "age": 19, "course": "Software Engineering" },
        { "id": 4, "name": "Maria", "age": 23, "course": "Data Science" },
        { "id": 5, "name": "James", "age": 21, "course": "Cybersecurity" },
        { "id": 6, "name": "Sarah", "age": 24, "course": "Computer Science" },
        { "id": 7, "name": "David", "age": 18, "course": "Information Technology" },
        { "id": 8, "name": "Lisa", "age": 25, "course": "Data Science" }
    ],
    "instructors": [
        { "id": 1, "name": "John Rey Silverio", "subject": "Modern JavaScript & Next.js Prerequisites" },
        { "id": 2, "name": "Maria Santos", "subject": "Data Science Fundamentals" },
        { "id": 3, "name": "Robert Johnson", "subject": "Cybersecurity Essentials" },
        { "id": 4, "name": "Emily Davis", "subject": "Software Development Practices" },
        { "id": 5, "name": "Michael Chen", "subject": "Network Administration" }
    ],
    "courses": [
        { "id": 1, "title": "Computer Science", "description": "Study of algorithms, programming, and computing systems.", "instructorId": 1 },
        { "id": 2, "title": "Information Technology", "description": "Focus on managing and deploying computer systems and networks.", "instructorId": 5 },
        { "id": 3, "title": "Software Engineering", "description": "Application of engineering principles to software development.", "instructorId": 4 },
        { "id": 4, "title": "Data Science", "description": "Exploration of data analysis, visualization, and machine learning.", "instructorId": 2 },
        { "id": 5, "title": "Cybersecurity", "description": "Protection of systems, networks, and programs from cyber threats.", "instructorId": 3 }
    ]
};

// Data Management Class
class DataManager {
    constructor() {
        this.students = [];
        this.instructors = [];
        this.courses = [];
    }

    // Method using Promises (.then) with fallback
    loadDataWithPromises() {
        console.log('🔄 Loading data using Promises (.then)...');
        
        return fetch('./data/students.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('✅ Data loaded successfully with Promises from JSON file:', data);
                this.processData(data);
                return data;
            })
            .catch(error => {
                console.warn('⚠️ Failed to load from JSON file, using embedded data:', error.message);
                console.log('📄 Using embedded data instead...');
                this.processData(EMBEDDED_DATA);
                return EMBEDDED_DATA;
            });
    }

    // Method using Async/Await with fallback
    async loadDataWithAsyncAwait() {
        try {
            console.log('🔄 Loading data using Async/Await...');
            
            const response = await fetch('./data/students.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('✅ Data loaded successfully with Async/Await from JSON file:', data);
            
            this.processData(data);
            return data;
        } catch (error) {
            console.warn('⚠️ Failed to load from JSON file, using embedded data:', error.message);
            console.log('📄 Using embedded data instead...');
            this.processData(EMBEDDED_DATA);
            return EMBEDDED_DATA;
        }
    }

    processData(data) {
        // Clear existing data
        this.students = [];
        this.instructors = [];
        this.courses = [];

        // Process students
        if (data.students) {
            this.students = data.students.map(student => 
                new Student(student.id, student.name, student.age, student.course)
            );
        }

        // Process instructors
        if (data.instructors) {
            this.instructors = data.instructors.map(instructor => 
                new Instructor(instructor.id, instructor.name, instructor.subject)
            );
        }

        // Process courses
        if (data.courses) {
            this.courses = data.courses.map(course => {
                const instructor = this.instructors.find(inst => inst.id === course.instructorId);
                return new Course(course.id, course.title, course.description, instructor);
            });
        }
    }

    getStudentCourseRelationships() {
        return this.students.map(student => {
            const course = this.courses.find(c => c.title === student.course);
            return {
                student: student,
                course: course
            };
        });
    }

    getCourseInstructorRelationships() {
        return this.courses.map(course => ({
            course: course,
            instructor: course.instructor
        }));
    }
}

// UI Controller Class
class UIController {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.outputDiv = document.getElementById('output');
        this.loadingDiv = document.getElementById('loading');
    }

    showLoading() {
        this.loadingDiv.classList.remove('hidden');
        this.outputDiv.innerHTML = '';
    }

    hideLoading() {
        this.loadingDiv.classList.add('hidden');
    }

    displayData() {
        const { students, courses, instructors } = this.dataManager;

        let html = `
            <div class="section">
                <h2 class="section-title">👨‍🎓 Students</h2>
                <div class="grid">
                    ${students.map(student => `
                        <div class="card ${student.isOlderThan21() ? 'age-highlight' : ''}">
                            <h3>${student.name} ${student.isOlderThan21() ? '⭐' : ''}</h3>
                            <p><strong>Age:</strong> ${student.age} ${student.isOlderThan21() ? '(Above 21)' : ''}</p>
                            <p><strong>Course:</strong> ${student.course}</p>
                            <p><strong>ID:</strong> ${student.id}</p>
                            <p><em>"${student.introduce()}"</em></p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">📚 Courses</h2>
                <div class="grid">
                    ${courses.map(course => `
                        <div class="card">
                            <h3>${course.title}</h3>
                            <p>${course.description}</p>
                            <p><strong>Instructor:</strong> ${course.instructor ? course.instructor.name : 'TBA'}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">👨‍🏫 Instructors</h2>
                <div class="grid">
                    ${instructors.map(instructor => `
                        <div class="card">
                            <h3>${instructor.name}</h3>
                            <p><strong>Subject:</strong> ${instructor.subject}</p>
                            <p><strong>ID:</strong> ${instructor.id}</p>
                            <p><em>"${instructor.teach()}"</em></p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="relationships">
                <h3>🔗 Data Relationships</h3>
                
                <h4>Student → Course Relationships:</h4>
                ${this.dataManager.getStudentCourseRelationships().map(rel => `
                    <div class="relationship-item">
                        <strong>${rel.student.name}</strong> 
                        <span class="arrow">→</span> 
                        <strong>${rel.course ? rel.course.title : 'No Course Found'}</strong>
                        ${rel.course ? `<span class="arrow">→</span> ${rel.course.description}` : ''}
                    </div>
                `).join('')}
                
                <h4 style="margin-top: 1.5rem;">Course → Instructor Relationships:</h4>
                ${this.dataManager.getCourseInstructorRelationships().map(rel => `
                    <div class="relationship-item">
                        <strong>${rel.course.title}</strong> 
                        <span class="arrow">→</span> 
                        Taught by <strong>${rel.instructor ? rel.instructor.name : 'TBA'}</strong>
                    </div>
                `).join('')}
            </div>
        `;

        this.outputDiv.innerHTML = html;
    }

    displayError(error) {
        this.outputDiv.innerHTML = `
            <div class="card" style="border-color: #f56565; background: #fed7d7;">
                <h3 style="color: #742a2a;">❌ Error Loading Data</h3>
                <p style="color: #742a2a;">${error.message}</p>
                <p style="color: #742a2a; margin-top: 1rem;">
                    <strong>Possible solutions:</strong><br>
                    • Make sure the 'data/students.json' file exists<br>
                    • Check if you're running this from a web server<br>
                    • Verify the JSON file format is correct
                </p>
            </div>
        `;
    }

    clearData() {
        this.outputDiv.innerHTML = `
            <div class="card" style="text-align: center; padding: 3rem;">
                <h3>🗂️ No Data Loaded</h3>
                <p>Click one of the buttons above to load student data using different async methods.</p>
            </div>
        `;
    }
}

// Application Class
class StudentManagementApp {
    constructor() {
        this.dataManager = new DataManager();
        this.uiController = new UIController(this.dataManager);
        this.initializeEventListeners();
        this.uiController.clearData(); // Show initial state
    }

    initializeEventListeners() {
        const promiseBtn = document.getElementById('loadWithPromises');
        const asyncBtn = document.getElementById('loadWithAsyncAwait');
        const clearBtn = document.getElementById('clearData');

        promiseBtn.addEventListener('click', () => this.loadWithPromises());
        asyncBtn.addEventListener('click', () => this.loadWithAsyncAwait());
        clearBtn.addEventListener('click', () => this.clearData());
    }

    async loadWithPromises() {
        this.uiController.showLoading();
        
        try {
            await this.dataManager.loadDataWithPromises();
            this.uiController.hideLoading();
            this.uiController.displayData();
        } catch (error) {
            this.uiController.hideLoading();
            console.error('Failed to load data:', error);
            // Don't show error UI since we have fallback data
            this.uiController.displayData();
        }
    }

    async loadWithAsyncAwait() {
        this.uiController.showLoading();
        
        try {
            await this.dataManager.loadDataWithAsyncAwait();
            this.uiController.hideLoading();
            this.uiController.displayData();
        } catch (error) {
            this.uiController.hideLoading();
            console.error('Failed to load data:', error);
            // Don't show error UI since we have fallback data
            this.uiController.displayData();
        }
    }

    clearData() {
        this.uiController.clearData();
        console.log('🗑️ Data cleared');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 ES6 Student Management App Starting...');
    const app = new StudentManagementApp();
    
    // Demo: Create some instances manually (as requested in requirements)
    console.log('\n📝 Demo: Creating class instances manually...');
    
    const demoStudent1 = new Student(1, 'Ana', 20, 'Computer Science');
    const demoStudent2 = new Student(2, 'Mark', 22, 'Information Technology');
    const demoStudent3 = new Student(3, 'John', 19, 'Software Engineering');
    
    const demoInstructor1 = new Instructor(1, 'Maria Santos', 'Data Science Fundamentals');
    const demoInstructor2 = new Instructor(2, 'John Rey Silverio', 'Modern JavaScript & Next.js');
    
    console.log('👨‍🎓 Demo Students:');
    console.log('- ' + demoStudent1.introduce());
    console.log('- ' + demoStudent2.introduce());
    console.log('- ' + demoStudent3.introduce());
    
    console.log('\n👨‍🏫 Demo Instructors:');
    console.log('- ' + demoInstructor1.teach());
    console.log('- ' + demoInstructor2.teach());
    
    console.log('\n💡 Click the buttons above to load data from JSON file!');
});