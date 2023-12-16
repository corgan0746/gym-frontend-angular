# Notes

- 02/11/2023 Ended this project for now, there are a few inmplementations that could be added but it's not a priority right now.
- REFER TO THE BOTTOM OF THIS FILE TO CHECK WHAT IS MISSING.

- Should delete the share-routing.module.ts as I will use directly the components from the share module.

# Things Learned from this Project
- Using a If statement on the html template will prevent pipes used to work properly.
- a Type of a parameter (On this example response of next function in a subscription will infere the type taking that type as a reference)
  I had a Customer response but was unable to access the Membership cause it was not defined within the Customer interface.

# Working
-Join the delete callbacks correclty(start on customers-panel) probably pass the arg as an array in the right order (Done
 [only for Main rows and no proper refresh after success implemented]
-add simple add form
-adapt to mobile

# Currently on Process

08/10/2023-Finished
-*Auth service (Done - MNA - need register
--States: (Done - MNA
[ isAuthenticated , user, isBeingAuthenticated, token ] (Done - MNA
--Methods: (Done - MNA
[ login(), logout(), register(), verifyToken(), revokeToken()] (Done - it does not revoke the token, just deletes the token from storage
*Guards -Account Route- (Done - MNA

08/10/2023-Up
-*Auth service (Done
-Registration and all related to it (Done
-*Components
-Classes GET[fetch Data, add Interface ] (Done
-Class Single GET[fetch Data, add Interface ]and single instructor (Done
-Instructors GET[fetch Data, add Interface ] (Done
-Instructor Single GET[fetch Data, add Interface ]ans classes (Done
-Membership (Done
-Locations
-Search Classes (Done
--Account Section--
-Memberships GET[fetch Data, add Interface ]
-Bookings GET[fetch Data, add Interface ]
-User full details GET[fetch Data, add Interface ]

------------

Future must add:
-Memberships sections to display GET and purchase(Frontend) (Done
*-Actions POST:
-Buy a Booking (Maybe make available dinamically depending on current time) (Done
-Cancel Booking(? 
-Buy a Membership (Done
-Cancel Membership
-Change USer Details? (Done partially
-Recover Password Email 
-Add terms and conditions(? 
;

--Didn't add the isBeingAuthenticated, might be important to add.
--Async Mail check for registration (Validator)
--Add proper Address Search, selection(dropdown select) and Validation (at some point in Registration)
;


# Might need add and notes
- isBeingAuthenticated state.
- more animations onload states.
- optimization and size reduce when uploading photos.
- Create an instructor panel that states all the upcoming classes and the number of customers in it.
- Add Location component and maybe a map that includes the location.
- abbility to change extra information on customer profile like Address.
- Change of Address and Location on Admin panel.
- Add extra security for admin login (Admin login is temporary disabled and only relies on Privileges state of customers).
- Add CORS to the AWS S3 bucket.
- Create my own Auth server as Firebase authentication can be expensive on scale.
- ? Fix the classes display on singleInstructor display (which is currently not showing, or maybe just not added the classes to instructor) ???

//
