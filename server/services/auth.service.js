import User from "../models/user.model.js";
import CustomError from "../utils/customError.js";

// register
export const register = async ({ name, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new CustomError("User already exists", 400);

  const user = await User.create({ name, email, password });
  return user;
};

// login
export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new CustomError("Invalid credentials", 401);

  if (user.blocked) {
    throw new CustomError("You are blocked, Please contact the admin", 403); 
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw new CustomError("Invalid credentials", 401);

  return user;
};


//load current user
export const getMeService = async (userId) => {
  const user = await User.findById(userId).select("-password");
  return user;
};
