# J-Tracker - Your Job Tracking Assistant

[![GitHub license](https://img.shields.io/github/license/jashgopani/application-tracking-system)](https://github.com/jashgopani/application-tracking-system/blob/main/LICENSE)
[![DOI](https://zenodo.org/badge/426259091.svg)](https://zenodo.org/badge/latestdoi/426259091)
[![codecov](https://codecov.io/gh/SoftwareEngineering-HomeWork/application-tracking-system/branch/main/graph/badge.svg)](https://codecov.io/gh/SoftwareEngineering-HomeWork/application-tracking-system)
[![GitHub issues](https://img.shields.io/github/issues/SoftwareEngineering-HomeWork/application-tracking-system)](https://github.com/jashgopani/application-tracking-system/issues)
[![Github closes issues](https://img.shields.io/github/issues-closed-raw/SoftwareEngineering-HomeWork/application-tracking-system)](https://github.com/jashgopani/application-tracking-system/issues?q=is%3Aissue+is%3Aclosed)
![GitHub top language](https://img.shields.io/github/languages/top/SoftwareEngineering-HomeWork/application-tracking-system)
[![Static Badge][prettier-badge]][prettier-url]
[![Static Badge][test-badge]][test-url]
[![Static Badge][lint-badge]][lint-url]

[prettier-badge]:https://img.shields.io/badge/code--formatter-Prettier-blue
[prettier-url]:https://github.com/SoftwareEngineering-HomeWork/application-tracking-system/blob/dev/new_backend/package.json#L23
[test-badge]:https://github.com/SoftwareEngineering-HomeWork/application-tracking-system/actions/workflows/test.yml/badge.svg
[test-url]:https://github.com/SoftwareEngineering-HomeWork/application-tracking-system/actions/workflows/test.yml
[lint-badge]:https://github.com/SoftwareEngineering-HomeWork/application-tracking-system/actions/workflows/lint.yml/badge.svg
[lint-url]:https://github.com/SoftwareEngineering-HomeWork/application-tracking-system/actions/workflows/lint.yml




<p align="center"><img width="700" src="./resources/AnimationVideo.gif"></p>

The process of applying for jobs and internships is not a cakewalk. Managing job applications is a time-consuming process. Due to the referrals and deadlines, the entire procedure can be stressful. Our application allows you to track and manage your job application process, as well as regulate it, without the use of cumbersome Excel spreadsheets.

Our application keeps track of the jobs you've added to your wish list. It also keeps track of the companies you've already applied to and keeps a list of any rejections. Rather than having the user browse each company's site for potential prospects, our application allows the applicant to search for them directly using basic keywords. Any prospective work offers can then be added to the applicant's wishlist.


## New Features in Phase 4
🎥[Phase-4 Demo Video](https://youtu.be/VKTob1N19ug)

## ⭐ Highlight of Phase 4 ⭐
In Phase 4 of this project, we undertook a significant overhaul of both the backend and frontend to enhance maintainability, scalability, and performance. This document outlines the key improvements, new features, and technical changes made during this phase.


## 1. Backend Transformation: From Flask to Node.js
The previous backend was implemented in Flask framework, resulting in complexity and code duplication across multiple modules. We have now transitioned the entire backend to Node.js. Below are the key benefits of this migration:

## Benefits of Moving to Node.js
1) Unified Language: Both the frontend (React/JavaScript) and backend now use JavaScript, streamlining development and allowing for code reuse.
2) Asynchronous Non-blocking I/O: Node.js supports asynchronous programming, improving performance by handling multiple requests concurrently.
3) Extensive Package Ecosystem: Leveraged npm (Node Package Manager) for faster development with access to numerous libraries and modules.
4) Reduced Overhead: Node.js eliminates the need for heavyweight frameworks like Django, offering a leaner setup that is easier to maintain.

## Revised Backend Architecture: MVC model
The original backend consisted of over 800 lines of tightly coupled code, making it difficult to debug and extend. The codebase has now been modularized into Model-View-Controller (MVC) microservices architecture.

1) Separation of Concerns: Each component (Models, Controllers, Views) has a distinct role, promoting clean code and maintainability.
2) Independent Microservices: Business logic is divided into modules that communicate via APIs, allowing for easier debugging and future expansion.
3) API Gateway: Centralized routing for all route handlers, improving security and simplifying external communication.
   
This refactoring also improved the backend-frontend integration. We updated outdated package dependencies across both layers to eliminate compatibility issues that previously caused communication failures between the two.

## 2. New Feature: Recruiter Dashboard
A key addition in Phase 4 is the Recruiter Dashboard. This feature allows recruiters to filter and fetch candidate profiles that match job descriptions using search parameters.

Technical Details

Search Functionality:
- Uses MongoDB Aggregation Pipelines to perform complex searches on candidate profiles (e.g., filtering by skills, experience, location).
- Secure access through JWT-based authentication.
- Role-based authorization ensures that only users with recruiter privileges can access this feature.
- UI/UX: Built using React.js with intuitive filters and quick profile previews for a seamless recruiter experience.

## 3. Chrome Extension: Smart Application Helper
We also developed a Chrome Extension to assist users in filling out job applications efficiently. This extension saves users' job-related information and helps filling applications to reduce repetitive tasks.

How the Chrome Extension Works

1) Content Script:
Injects JavaScript into the JTracker.
Uses localstorage to access data and look out for changes in some input fields
Sends data to the background service worker


2) Service Worker:
Runs in the background and handles communication between the extension popup, content scripts, and backend.
Manages events like receiving updates from the content script and relays them to the popup.


3) Storage:
User information is saved locally using Chrome's storage API
Provides a convenient UI for users to edit and manage their stored data via the extension popup.
This extension improves the user experience by streamlining job applications and reducing manual effort, making it a practical companion for active job seekers.

## 4. Web Scraping for Daily Job Recommendations
To keep users informed about the latest job openings, we implemented a web scraping module that provides daily job recommendations.

Technical Details
Scraping Strategy:

The scraping runs on a scheduled cron job to fetch new listings daily.
It uses publicly available APIs and github repositories to fetch accurate data related to internship postings


## Summary
In Phase 4, we successfully transformed the job tracker application into a more maintainable, scalable, and feature-rich platform. The migration to Node.js, restructuring of the backend into a microservices-based MVC architecture, and the addition of new functionalities such as the Recruiter Dashboard and Chrome Extension have significantly enhanced both developer and user experiences. Our daily job recommendations feature ensures users are always up to date with the latest opportunities.

These improvements lay the foundation for future growth, making the platform well-suited for continuous enhancement and scaling as new requirements arise.

---

### Application Demo video

https://user-images.githubusercontent.com/89501363/144725439-5d9191f8-df13-4814-aa15-99cd752ab0cc.mp4

## Table of contents

- [Basic Design](#basic-design)
- [Samples](#samples)
- [New Features In Phase 4](#new-features-in-phase-4)
- [Future Scope](#future-scope)
- [Explanation](#explanation)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Requirements](#requirements)
  - [Steps to follow for the installation](#steps-to-follow-for-the-installation)
- [Hosting the Database](#hosting-the-database)
  - [Local MongoDB](#local-mongodb)
  - [Hosted database with MongoDB Atlas](#hosted-database-with-mongodb-atlas)
- [License](#license)
- [How to Contribute](#how-to-contribute)
- [Team Members](#team-members)

## Basic Design:

![Basic Design](https://github.com/prithvish-doshi-17/application-tracking-system/blob/main/resources/Overall%20Design.PNG)

## Samples:

### Login Page / Signup Page

The introductory visual interface displayed from which a user is able to register and log into the application. 
![image](https://github.com/user-attachments/assets/22090e96-9356-4256-9180-86ada115f8c9)

![image](https://github.com/user-attachments/assets/df60db51-e533-489e-bac6-659d252c4468)



### HomeScreen - Profile Page

After Logging In, the Profile page of the user is displayed where the user details such as Name, Institution, email, phone number, address, skills, and more are shown.
Users can add or update information to their profile, such as their personal information, skills, preferred job locations, and their experience level.

![image](https://github.com/user-attachments/assets/0fa1e5ec-d6d1-4980-98c5-c4a7eff055c8)


### SearchPage

The interface through which a user is able to search for specific jobs and apply on them through the 'Apply' button.

1. Navigate to Job search page, search for particular Job.
2. Click on Details button to see the Job Details
3. Click on Apply button which will redirect to the Job Apply link.

<p align="center"><img width="700" src="./resources/search_roles_companywise.png"></p> 
<p align="center"><img width="700" src="./resources/FindJobs.png"></p>
<p align="center"><img width="700" src="./resources/Job_Description.png"></p>

### ApplicationPage

The user is able to access different saved applications - Waitlisted applications, Waiting for Refereals, Applied Jobs, Application Status. The user can also add more jobs to track through this screen.

![image](https://github.com/user-attachments/assets/e2e8a374-1a4f-49bd-8386-77eee2419cb4)


<p align="center"><img width="700" src="./resources/AddApplicationpage.png"></p>

### MatchesPage

On this page, user can see different jobs that would be recommended to them based on their profile and their preferences. User can apply for that position from this page too.

<p align="center"><img width="700" src="./resources/Recommendjobspage.png"></p>

## Chrome extension
![image](https://github.com/user-attachments/assets/283a83cd-48c0-4414-8e2a-d90e3a52fc2e)

## Recruitor Dashboard
![image](https://github.com/user-attachments/assets/6ac9e593-ad88-401a-9894-0f00a7d400ed)
![image](https://github.com/user-attachments/assets/5b4bb569-1fe3-4cfb-b7d4-fa1266f04661)



## Future Scope:

- Add a feature that allows users to attach interview reminders to their Google calendar.
- Direct connection to Linkedin, allowing for the addition of job opportunities to the wishlist.
- Improve the recruiter dashboard to include filtering based on more features such as online assessments,education etc
- Enhance chrome extension to allow injecting the data directly to the required fields and thus removing the need to copy and paste content
- Make v2 of web scraping which collects data from more public APIs

## Explanation:

Currently, we have these fundamental steps in our project:

1. The SearchPage where users can search about the Job Postings
2. The MatchesPage where users get recommendation about the jobs based on daily postings
3. The ApplicationsPage where users can add and see the position they applied to and can update/delete the the information. Any details in any table can be modified at any time during the process
4. The ProfilePage where user can add his skills, experience level and preffered location. This information is used to recommend user jobs that require similar skillsets
5. A chrome extension where user can add details and use these details which filling up their job applications
6. A recruitor dashboard where based on the requirements of the recruitor, potential candidate matches are returned

## Technologies Used:

- Python
- Node.Js
- Flask
- MongoDB
- React
- Express JS
- HTML
- CSS
- Mocha
- Chai
- Cypress

## Installation:

### Requirements:

- [npm](https://nodejs.org/en/) (Latest version 6.14.4 used as of 11/3)
- [node](https://nodejs.org/en) (Latesrt version 23.1.0)
- [MongoDB Community Edition or use MongoDB Atlas](https://www.mongodb.com/docs/manual/administration/install-community/)

### Steps to follow for the installation:

1. **Clone the Repository**
    - Use the command `git clone https://github.com/SoftwareEngineering-HomeWork/application-tracking-system.git` to clone the repository.

2. **Start the Backend**
    - Ensure that node is installed on your system. If not, you can download it from the official Node JS website.
    - Change directory to new_backend
    - Run the command 'npm start'

3. **Start the backend for web scraping**
    - Navigate to the scraping folder and start the backend using the following command:
         

4. **Start frontend**
     - Change directory to frontend
    - Run the command 'npm start'

## Hosting the Database:

### Hosted database with MongoDB Atlas:

1. [Create account](https://account.mongodb.com/account/register) for MongoDB
2. Follow MongoDB Atlas [Setup Guide](https://docs.atlas.mongodb.com/getting-started/) to create a database collection for hosting applications
3. Create .env file in the new_backend folder with the following content:
   ```
   MONGO_URI : <MongoDB Cluster URL>
   ```
## License

The project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.

## How to Contribute?

Please see our CONTRIBUTING.md for instructions on how to contribute to the repository and assist us in improving the project.

## Team Members

- Dhruv Soni
- Sweekar Burji
- Prithish Samanta

## Contact Info
For any questions, please email dhruvsoni1802@gmail.com.
