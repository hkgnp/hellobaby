# How to Use

- HelloBaby can be accessed at [https://focused-panini-18207b.netlify.app/](https://focused-panini-18207b.netlify.app/).
- HelloBaby's backend (built on expressjs) can be accessed at [https://ancient-fortress-09431.herokuapp.com/](https://ancient-fortress-09431.herokuapp.com/).

This app consists of a frontend shopping cart and a backend system for managing products in the "shop". A summary of its functions are below:

## Backend

1. Login and Logout system for vendors to manage their products:
   - Create new products, and upload an image (via UploadCare). Also allows associating a product with categories (one-to-many) and tags (many-to-many).
   - View all products in the shop.
   - Update an existing product.
   - Delete an existing product.
2. Add new categories and tags without needing to go into the database.
3. Manage orders:
   - Update status of each order (pending payment, processing, shippped, delivered).
   - Delete an order.
   - See details of each order (items that customer purchased).
4. Order mechanism:
   - When a customer checks out their cart, an order will be created and status set to "Pending Payment".
   - After checkout is completed, backend is notified (via Stripe webhook), order status is immediately changed to "Processing".
   - Vendor may change the order status after the order is shipped or delivered.
5. Testing a shopping cart checkout (via backend).
6. Registering of a new admin account.

## Frontend

1. Customers can browse a list of products that the shop offers.
   - They can also do a search (case insensitive);
   - And change the number of results that they would like to view per page. This would dynamically change the number of pages available.
2. Customers can filter by categories using the menu buttons.
3. Shopping cart validation:
   - To only allow logged in customers to add an item to cart.
   - To only add an item to cart when the quantity is more than 0.
4. Social media functions to allow customers to share the product page with Twitter, Facebook and WhatsApp.
5. Customers interested to purchase items can register for an account:
   - Registration form has validation for required fields;
   - Password confirmation; and
   - Password complexity (must have at least 5 characters, one uppercase character and one lowercase character.)
   - Upon submission, customer is immediately logged in to their account to start shopping.
6. Customer can start adding items to their shopping cart upon logging in.
7. Customer can view their shopping cart, and adjust the quantity that they would like to purchase:
   - When the quantity is reduced from 1 to 0, the item is immediately removed from the cart.
   - Customers can directly remove the item from the shopping cart as well.
   - The shopping cart is always kept updated in the database so it is always retrievable, even if the customer logs out and logs back in again.
8. Upon clicking "Checkout", customers will be brought to Stripe to complete their checkout.
9. After completing payment, customers will be shown an Order Confirmation page, with a list of items ordered, and the ability to print the page.
10. Customers can navigate to their profile page to see a list of all their current and past orders.
11. Customers can also update their name, email, address and contact via their profile page.
12. For security purposes, upon logging out, the customer's access tokens will be cleared and will require them to log back in again to start a new session.

# Project Summary

This web application is to be used by Medical Social Workers (MSWs) to contribute resources that may be helpful to their colleagues within or outside their organisation. It is a community driven platform where contributors only need to register to contribute new resources, but registration is not needed to review resources.

# Strategy

It is important for MSWs to be kept updated on the latest health and social care resources that can be used to help patients. Often time, MSWs will need to either maintain their own database of resources, or to frequently ask around whenever their patient needs something that they are not familiar with. Depending on who is asked, there may be different responses. And because the landscape changes quickly, information can get outdated by the time you need it.

This application hopes to be able to create a consolidate pool of updated resources for everyone to reference, and for MSWs to be able to also contribute reviews to keep the data refreshed.

## User Stories

1. As a MSW, I want to be able to look for relevant social and healthcare resources using keywords.
2. As a MSW, I want to be able to contribute new resources that I have come across and provide useful details about them, including upload an image related to the resource (e.g. a flyer).
3. As a MSW, I want to be able to leave reviews of resources that I have used for my patients, to better advise other MSWs who are thinking of using them.
4. As a user, I want to be able to edit the resources that I or my fellow healthcare professionals have contributed.

# Scope

The app must be able to perform the following functions:

- Allow users to employ a variety of search and filter methods to locate the resource they need.
- Allow a user to register, log in and log out.
- Users' passwords must be hashed before storing on the database.
- Allow a user to edit their details on their own dashboard.
- For accountability purposes, to only allow registered users to contribute new resources.
- Allow registered users to edit not only their own contributions, but those of others as well.
- To encourage resources to be vetted as much as possible, allow non-registered users to contribute reviews.
- Each resource should contain critical information, including a map to allow easy location of resource.

# Structure

### Dynamic search

Dynamic search for resources using either the Title, Description, Address or Postal Code. Users can also adjust the number of results that they want to see in one page.

### Filter resources

Filter resources by their category. Users can also adjust the number of results that they want to see in one page.

### Post reviews

Post reviews of resources for other users to decide on the suitability for their patients.

### Register / Login / Log out

Register for an account to contribute or edit resources. User can login and a JWT will be stored on the browser until the user logs out, where it will be deleted.

### User dashboard

Users who have registered and logged in, can access their Dashboard where they can change their display name and username.

### Contribute resource / Edit resource

Registered users can log in to contribute a new resource or edit an existing resource (contributed by themselves or others). They will also be able to upload a picture from their device to provide more details about the resource.

# Skeleton

![image](./readmescreenshots/dashboard.png)
![image](./readmescreenshots/posts.png)
![image](./readmescreenshots/contributeresource.png)
![image](./readmescreenshots/resource.png)
![image](./readmescreenshots/hashpassword.png)

# Code style

Code is formatted using Prettier (installed as an extension in VS Code).
[![js-standard-style](https://img.shields.io/badge/code%20style-prettier-brightgreen.svg?style=flat)](https://github.com/prettier/prettier)

# Deployment

`msw-keeposted` is deployed to Netlify. The API for resources, reviews and user information is hostedon Heroku. MongoDB and Amazon S3 are used for storing text information and images respectively. API details can be found at [https://github.com/hkgnp/msw-keeposted-api](https://github.com/hkgnp/msw-keeposted-api)

### Deploying `msw-keeposted`

After cloning the repository, ensure that the folder and files are in the root directory (e.g. same directory as your .git directory). You may then proceed to log in to your [Netlify](https://www.netlify.com) and deploy a new site from Github. Select your Github directory and Netlify will proceed to deploy your site.

### Deploying `msw-keeposted-api`

After cloning the repository, ensure that the folder and files are in the root directory (e.g. same directory as your .git directory). Using [Heroku's CLI tool](https://devcenter.heroku.com/articles/heroku-cli), proceed to use your terminal to link your repository with Heroku. Before pushing to Heroku (using `git push heroku master` OR `git push heroku <branch>`), ensure that the following is done:

- Your .gitignore file is properly configured to include `node_modules` and any `.env` files.
- A **Procfile** has been created and contains the following: `web: node index.js`.
- The version of Node is included in your `package.json` file:

```
"engines": {
    "node": "14.x"
  }
```

- After creaing the app on Heroku using `heroku create`, set up your **config variables** in the settings section of your application in Heroku. It should contain the variables for the following:
  - S3_ACCESS_KEY (for uploading images to Amazon S3)
  - S3_ACCESS_SECRET (for uploading images to Amazon S3)
  - MONGO_URL (for CRUD in MongoDB)
  - TOKEN_SECRET (for bcrypt to hash users' passwords)

For further details, please refer to the awesome [guide](https://devcenter.heroku.com/articles/deploying-nodejs) on Heroku's website.

# Tech/frameworks Used

This app is made only possible thanks to the following technologies:

- [Github](https://www.github.com/)
- [Node](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [joi-browser](https://www.npmjs.com/package/joi-browser)
- [reactstrap](https://reactstrap.github.io/)
- [React Router](https://reactrouter.com/)
- [Express](https://expressjs.com/)
- [Leaflet](https://leafletjs.com/)
- [Leaflet Default Icon Compatibility](https://github.com/ghybs/leaflet-defaulticon-compatibility)
- [Bootstrap](https://getbootstrap.com/)
- [Google Fonts](https://fonts.google.com/)
- [Font Awesome](https://fontawesome.com/)
- [MongoDB](https://www.mongodb.com/cloud/atlas)
- [Amazon S3](https://aws.amazon.com/s3/)
- [Heroku](https://www.heroku.com)
- [Axios](https://github.com/axios/axios)
- [Unsplash](https://unsplash.com)
- [JWT](https://jwt.io/)
- Built with [VS Code](https://code.visualstudio.com/)

# API References

And it is also made only possible thanks to the painstaking work done by the following organisations:

- [OneMap](https://app.swaggerhub.com/apis/onemap-sg/new-onemap-api/1.0.3)
- [Open Street Map](https://www.openstreetmap.org/)
- [Mapbox](https://www.mapbox.com/)

# Acknowledgments

- Mr Paul Chor
- Mr Alexander Yan
- Mr Shun
- Mr Ace Liang
- Mr Christopher Seow
- My wonderful classmates who have been part of this journey together:
  - Hidayah
  - Howard
  - Julius (thank you for the API idea)
  - Ryan
  - Ying Ru
- The following guides that helped me understand React further:
  - [To Handle Authentication with Node JS, Express, Mongo, JWT](https://codeburst.io/to-handle-authentication-with-node-js-express-mongo-jwt-7e55f5818181)
  - [Stack Overflow: how to implement Pagination in reactJS](https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-reactjs)

# Testing

| Category                          | Cases                                                                                                                                       | Expected Outcome                                                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Dynamic search                    | 1. Choose attribute from the dropdown list                                                                                                  | Select from options: Title, Description, Address, Postal Code                                                                          |
|                                   | 2. Start typing in the search bar                                                                                                           | Results are dynamically rendered based on the typed string in the search bar                                                           |
| Filter resources                  | 1. Choose filter option from the dropdown list                                                                                              | Select from options: Jobs, Donations, Long-term care, Misc                                                                             |
|                                   | 2.Select filter option                                                                                                                      | Results are filtered according to selected filter option                                                                               |
| Change number of results per page | 1. Choose number from the dropdown list                                                                                                     | The number of results per page will dynamically change depending on number selected                                                    |
| Register                          | 1. Click on 'Sign Up'                                                                                                                       | User is brought to the sign up page                                                                                                    |
|                                   | 2. Complete the sign up form and click sumit                                                                                                | If validation is successful, user will be automatically logged in and brought to the 'All Resources' page                              |
|                                   | 3. Check LocalStorage in the Developer tools                                                                                                | User will see the JSON Web Token that is stored in the LocalStorage                                                                    |
| Login                             | 1. Click on 'Log In'                                                                                                                        | User is brought to the log in page                                                                                                     |
|                                   | 2. Complete the login form and click submit                                                                                                 | If validation is successful, user will be logged in and brought to the 'All Resources' page                                            |
|                                   | 3. Check LocalStorage in the Developer tools                                                                                                | User will see the JSON Web Token that is stored in the LocalStorage                                                                    |
| Form validation                   | 1. While completing forms in **Sign Up**, **Login**, **Contribute Resource** and **Edit Resource** pages, intentionally omit certain fields | Joi-browser will render an error message on the field that needs to be corrected                                                       |
|                                   | Sign Up                                                                                                                                     | Validation is done against whether another registered user shares the same username (email address)                                    |
|                                   | Login                                                                                                                                       | Validation is done against whether the username exists, or whether the entered password is correct                                     |
|                                   | Contribute Resource                                                                                                                         | Validation is done against whether all fields are completed, whether a user is logged in, and if the Postal Code contains 6 characters |
|                                   | Edit Resource                                                                                                                               | Validation is done against whether all fields are completed, whether a user is logged in, and if the Postal Code contains 6 characters |
| Uploading of images               | 1. User selects a file from their device, and uploads it while contributing or editing a resource                                           | Image is successfully uploaded, and is shown on the 'All Resources' page                                                               |
| Post reviews of resources         | 1. Click on the reviews button on a particular resource on the 'All Resources' page                                                         | A modal appears with a list of reviews for the resource                                                                                |
|                                   | 2. User enters their name and review, and clicks submit (please note there is no validation for reviews).                                   | The review, with the user's name and date stamp is rendered almost immediately                                                         |
| Password hashing                  | 1. User registers with a name, username and password                                                                                        | Password is hashed using bcrypt and stored as a hash on MongoDB (refer to screenshot above)                                            |
| User dashboard                    | 1. User clicks on their name in the navigation bar                                                                                          | User is brought to their dashboard, where they are able to view their details, and a history of their resource contributions           |
|                                   | 2. Click edit                                                                                                                               | Name and username fields become editable and user able to input their changes                                                          |
|                                   | 3. Click submit                                                                                                                             | User is brought to the login page where they can log in with their new username                                                        |
