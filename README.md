
# To run Application

1- Frontend Setup: 
  i. To include all packages: npm i inside FrontEnd folder (require Node version 18 and further).
  ii. Update BASE_URL in D:\Github\Q-Assignment\FrontEnd\src\utils with your backend url, to call api
  iii. check for applications dependencies at package.json file
    "dependencies": {
     "@emotion/react": "^11.14.0",
     "@emotion/styled": "^11.14.0",
     "@mui/icons-material": "^6.4.2",
     "@mui/material": "^6.4.2",
     "react": "^18.3.1",
     "react-dom": "^18.3.1",
     "react-hook-form": "^7.54.2",
     "react-router-dom": "^7.1.4",
     "react-toastify": "^11.0.3"
   },
   * if any dependency related error occur try uninstall and reinstall respective 
   *if any vite related error occurs try run following command on your directory's terminal: ( npm install -g vite
    npm install vite --save-dev)



2- Backend Setup:
  i. import ecart folder provided SDE
  ii. check if following is installed: Java JDK(17.0.14), mvn(3.9.9)
  iii. run the java code (termianl should print Started EcartApplication (process running)).

3- start frontend:
  i. check directory to .../FrontEnd> on terminal.
  ii. run command npm run dev.



# Application Flow

1. user redirected to List of Paintings, one when try to perform any add, edit, delete etc actions redirected to login page.
2. create user by clicking on signup.
3. on successfull signup and user creation, user is redirected to login page again, after successful loging in, user is redirected to List of Paintings.
4. Successful logged user will be able to perform add,edit,delete functionality

# NOTES
1. Logging In and Sign up are not integrated wiht backend yet.
2. Both backend and local storage using code are present in files except 
   i. Q-Assignment\FrontEnd\src\components\Login.tsx.
   ii. D:\Github\Q-Assignment\FrontEnd\src\components\SignUp.tsx
   Currently Local storage code is commented, please feel free to uncomment it and comment, backend code if needed.
3. From Backend side, in-memory database is being used.
4. Spring and Java code is referred online.


# Futur Improvements
Following are the improvements can be done
1. User login/signup should be integrated with backend
2. user role and permission. 
3. search funtionality
4. Integration with permenant storage like mongoDB etc.




