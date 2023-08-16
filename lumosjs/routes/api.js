/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the Routes and all of them will
| be assigned to the "api" group. Make something great!
|
*/

import { userApiRoutes } from "#routes/user/all";

export default function apiRoutes(app){
	userApiRoutes(app);
}