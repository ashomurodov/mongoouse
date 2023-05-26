const userModels = require("../models/userModels");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { email, phone, name, password, confirm_password } = req.body;

    if (!email || !phone || !name || !password || !confirm_password) {
      return res.status(400).json({ message: "Please fill all fields!" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email!" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: "Password is incorrect!" });
    }

    const user = await userModels.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "This email alreadt exist!" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new userModels({
      email,
      phone,
      name,
      password: passwordHash,
    });

    await newUser.save();

    res.status(200).json({ message: "Register succuss" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const checkPassword = (isMatch, res, user) => {
  if (!isMatch) {
    return res.status(400).json({ message: "Password is incorrect!" });
  }

  return res.status(200).json({ message: "Login success!", token: "HASKJDHKJAHDJASHDKJAHSKJDHASKJDHASKJDHKJDHJKAS", user });
};

const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    const user_by_email = await userModels.findOne({ email });
    const user_by_phone = await userModels.findOne({ phone });

    if (email) {
      if (!user_by_email) {
        return res.status(400).json({ message: "This email does not exist!" });
      }

      const isMatch = await bcrypt.compare(password, user_by_email.password);

      checkPassword(isMatch, res, user_by_email);
    } 
    else {
      if (!user_by_phone) {
        return res.status(400).json({ message: "This phone does not exist!" });
      }

      const isMatch = await bcrypt.compare(password, user_by_phone.password);

      checkPassword(isMatch, res, user_by_phone);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = { register, login };
