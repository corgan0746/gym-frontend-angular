# Angular Frontend - Gym App & Management System

Welcome to the Gym Management System Angular Frontend! This application provides a user-friendly interface for gym members to manage their memberships, book classes, and interact with various features. Additionally, an admin panel is available for administrators to perform CRUD operations on Classes, Instructors, Memberships, Membership Classes, and Timeslots.
Connected to the Back-end: https://github.com/corgan0746/gym-backend-springboot-server

## Overview

This Angular frontend is developed to work in conjunction with a Spring Boot backend, handling user authentication through Firebase. The styling is done using raw CSS with some Bootstrap classes for a clean and responsive design. The integration with the Stripe payment service allows users to make secure payments for class bookings and memberships.

## Features

-   **User Authentication**: Secure login and registration powered by Firebase.
-   **Membership Management**: Memberships lasting 30 days are available, allowing users to book specific classes for free during the membership period. Users can cancel or not renew memberships in their account settings.
-   **Class Booking**: Users can search and book available classes, and bookings are open from 4 am daily as long as timeslots are assigned. Bookings automatically close after the class has started.
-   **Payment Integration**: Stripe payment service enables users to make secure payments for class bookings and memberships.
-   **Profile Management**: Users can change their profile picture and update other account settings.
-   **Admin Panel**: Administrators have access to a comprehensive admin panel for performing CRUD operations on Classes, Instructors, Memberships, Membership Classes, and Timeslots.
-   **S3 Bucket Integration**: Some assets are retrieved from an S3 bucket, enhancing the user experience with dynamic content.

## Technologies Used

- Angular 16
- RxJS
- Firebase
- Bootstrap
- AWS


## Getting Started

To run the Gym Management System Angular Frontend locally, follow these steps:

1.  Clone the repository:
    
2.  Install dependencies:
    - `npm install` 
    
3.  Configure Firebase:
    
    -   Set up a Firebase project and obtain the configuration.
    -   Update the Firebase configuration in the `src/environments/environment.ts` file.

4.  Run the application:
    - `ng serve` 
    
5.  Open your browser and navigate to `http://localhost:4200/` to view the application.

    
##

**Notes:**
- Purchase testing can be used with card: 4242424242424242 and 1234567 (Check Stripe Testing Reference)
https://stripe.com/docs/testing
- There might be some functionalities and scheduled processes that do not work properly

- Add Addresses for the Classes Locations is pending.
- Would probably swap Authentication on real world scaled scensario due to pricing and limitions of Firebase service.
- Add change of billing details and use is pending.
- Haven't tested an expired Membership Yet.

##

**License:**

This project is dual-licensed under the following licenses: -

  

- [MIT License](https://opensource.org/licenses/MIT): For general use.

- [Creative Commons Attribution-NonCommercial License (CC BY-NC)](https://creativecommons.org/licenses/by-nc/4.0/): For non-commercial use. Please review the specific terms and conditions of each license before using or contributing to this project.
