import { index, store, show, update, destroy } from "#service/userService";

export async function listUsers(req,res){
	const usersList = await index();
	res.json(usersList);
}

export async function getUser(req,res){
	const userInfo = await show(req.params.id);
	userInfo ? res.json(userInfo) : res.json({msg:"User not found..."});
}

export async function deleteUser(req,res){
	const userDelete = await destroy(req.body.id);
	userDelete ? res.json({msg:"user deleted"}) : res.json({msg:"user don`t exist"}); 
}

export async function newUser(req,res){
	const createUser = await store(req.body);
	createUser ? res.json({msg:"User created"}) : res.json({msg:"user not created"});
}

export async function updateUser(req,res){
	const userUpdate = await update(req.body.id,req.body);
	userUpdate ? res.json({msg:"User updated"}) : res.json({msg:"User dont updated"});
}