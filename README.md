# LC-capstone-project-The-Bookshelf

#### This repo contains the source code for the React front end & Spring Boot backend for The BookShelf project.

### The BookShelf
The BookShelf is a web application that allows users to manage their book collections. Users can add, edit, and delete books, as well as view details about each book. The
application is built using React for the frontend and Spring Boot for the backend, with PostgreSQL as the database.
Bookshelf is a user-friendly web application that lets readers discover, review, and rent books in a community-driven platform.
Built with modern front-end technologies and backed by a robust backend, it features user registration, book listings, rental tracking, and review functionalities. Whether you're an avid reader or just looking for your next great read, Bookshelf makes it easy to explore, share, and manage your personal reading journey.


### Technologies utilized in this project:

- **Frontend**: React, Vite, AWS Amplify
- **Backend**: Spring Boot, PostgreSQL, AWS EC2
- **Database**: PostgreSQL (AWS RDS)
- **Deployment**: AWS Amplify (Frontend), AWS EC2 (Backend)
- **Version Control**: GitHub
- **Development Tools**: IntelliJ IDEA, Visual Studio Code
- **Testing**: Postman for API testing
- **Build Tools**: Maven for backend, npm for frontend
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication



### Wireframes
![Wireframes](https://wireframe.cc/pro/pp/1dbb0983b906360)

### ERD Diagram
![ERD Diagram](https://drive.google.com/file/d/1vxi6AtRFWBAc8L2ybaiCFsuby2JgbMZx/view?usp=sharing)
 


### Project Structure

#### Frontend

- `src/` - Contains the React application code.
- TheBookShelf app is built using React via Vite.
- Deployed on AWS Amplify.
- Reference: [Deploy react app in aws?](https://dev.to/sachithmayantha/deploying-a-reactjs-app-on-aws-amplify-in-3-minutes-18el)

#### Backend
- `src/main/java/com/example/thebookshelf/` - Contains the Spring Boot application code.
- `src/main/resources/` - Contains the application properties and other resources.
- Deployed on AWS Elastic cloud Compute (EC2).
- Reference: [Url](https://www.baeldung.com/spring-boot-aws-ec2)
- The backend is a Spring Boot application that provides RESTful APIs for the frontend.
- Configured the inbound and outbound rules in the AWS security group to allow traffic on port 8080.
- Used Telnet to test the connection to the backend server.
- Modified the application.properties file to set the server port to 8080 and the database connection details.
- Changed the EC2 instance firewall settings to allow traffic on port 8080 using Windows Defender Firewall.
- configured with AWS RDS (PostgreSQL) for database management.

### Architecture Diagram

```plaintext


+-------------------+         HTTPS        +-------------------+         JDBC       +-------------------+
|                   |  <---------------->  |                   |  <---------------> |                   |
|  React Frontend   |                      |   Spring Boot     |                    |   PostgreSQL RDS  |
|  (AWS Amplify)    |                      |   Backend (EC2)   |                    |   (AWS RDS)       |
|                   |                      |                   |                    |                   |
+-------------------+                      +-------------------+                    +-------------------+

```

### Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone
2. **Navigate to the Project Directory**:
   ```bash
   cd LC-capstone-project-The-Bookshelf
   ```
3. **Frontend Setup**:
4. Navigate to the frontend directory:
   ```bash
   cd src/frontend
   ```
    - Install dependencies:
   ```bash
   npm install
   ```
    - Start the development server:
   ```bash
   npm run dev
   ```
5. **Backend Setup**:
6. Navigate to the backend directory:
   ```bash
   cd src/backend
   ```
    - Ensure you have Java and Maven installed.
    - Build the project:
   ```bash
   mvn clean install
   ```
    - Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
    - The backend will run on `http://localhost:8080` by default.
    - Ensure that the PostgreSQL database is running and configured correctly in the `application.properties` file.
    - You may need to set up the database schema and initial data. This can typically be done by running the application, which will execute any SQL scripts located in the `src/main/resources` directory.
