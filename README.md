# LC-capstone-project-The-Bookshelf

#### This repo contains the source code for the React front end & Spring Boot backend for The BookShelf project.


### Resources utilized in this project:




### Project Structure

#### Frontend

- `src/` - Contains the React application code.
- TheBookShelf app is built using React via Vite.
- Deployed on AWS Amplify.
- Reference: [Url](Deploy react app in aws?(https://dev.to/sachithmayantha/deploying-a-reactjs-app-on-aws-amplify-in-3-minutes-18el)

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

plaintext
+-------------------+         HTTPS        +-------------------+         JDBC       +-------------------+
|                   |  <---------------->  |                   |  <---------------> |                   |
|  React Frontend   |                      |   Spring Boot     |                    |   PostgreSQL RDS  |
|  (AWS Amplify)    |                      |   Backend (EC2)   |                    |   (AWS RDS)       |
|                   |                      |                   |                    |                   |
+-------------------+                      +-------------------+                    +-------------------+

```
### Technologies Used
### How to Run the Project Locally

