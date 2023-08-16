/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the Route and all of them will
| be assigned to the "web" group. Make something great!
|
*/

export default function webRoutes(app) {
  app.get("/",(req,res)=>res.send("welcome to homepage"));
}