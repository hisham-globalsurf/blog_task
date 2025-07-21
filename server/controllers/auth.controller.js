import * as authService from "../services/auth.service.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    const token = generateToken(user);

    const safeUser = {
      _id: user._id,
      name: user.name,
      role: user.role,
    };

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ success: true, user: safeUser });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await authService.login(req.body);
    const token = generateToken(user);

    const safeUser = {
      _id: user._id,
      name: user.name,
      role: user.role,
    };

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, user: safeUser });
  } catch (err) {
    next(err);
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  return res.status(200).json({ message: "Logged out successfully" });
};

//load current user
export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getMeService(req.user.id);

    if (!user) {
      return next(new CustomError("User not found", 404));
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
