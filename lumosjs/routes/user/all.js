import { listUsers, getUser, deleteUser, newUser, updateUser} from "#controller/userController";
import { group } from "#routeGroup";
import { auth } from "#middleware/authApi";
import { rateLimit } from "#utils/rateLimit"

/**
 * This file defines the API routes related to users.
 * It utilizes controllers, middlewares, and utilities necessary for each route.
 * 
 * - The routes "/users" and "/user/:id" are for listing all users and getting a user by ID, respectively.
 * - The route "/add/user" is used to add a new user.
 * - The route "/update/user" is used to update the information of an existing user.
 * - The route "/delete/user" is used to delete a user.
 * 
 * Note that this file uses a middleware group that includes authentication (auth) or other middleware , and the 'app' object is required.
 * Controller functions like listUsers, getUser, deleteUser, newUser, and updateUser are imported from userController.
 * 
 * All routes require authentication (auth) while also having rate limiting (rateLimit) for protection.
 * 
 * @param {object} app - Instance of the lumos application api.
 */

export function userApiRoutes(app) {
   // Using the group to apply middlewares before the routes
  //  The rate limit is set to 10 requests per IP address every 1 minute.
 
  group(auth, app, rateLimit(10, 1))
    .get("/users", listUsers)           // Route to list all users
    .get("/user/:id", getUser)          // Route to get a user by ID
    .post("/add/user", newUser)         // Route to add a new user
    .put("/update/user", updateUser)    // Route to update information of an existing user
    .delete("/delete/user", deleteUser); // Route to delete a user
}
