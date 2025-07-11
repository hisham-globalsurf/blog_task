import * as authService from "../services/auth.service.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    const token = generateToken(user._id);

    const safeUser = {
      _id: user._id,
      name: user.name,
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
    const token = generateToken(user._id);

    const safeUser = {
      _id: user._id,
      name: user.name,
    };

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, user: safeUser });
  } catch (err) {
    next(err);
  }
};
