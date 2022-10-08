const userService = require("../services/user");

const createUser = async (req, res) => {
  const { name, account, password, phoneNumber, regionId, role } = req.body;

  if (!(name && account && password && phoneNumber && regionId && role)) {
    res.status(400).json({ error: "필수 항목이 입력되지 않았습니다." });
    return;
  }

  try {
    await userService.createUser(name, account, password, phoneNumber, regionId, role);
    res.status(201).json({ message: "회원가입 성공" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const checkAccount = async (req, res) => {
  const { account } = req.body;

  if (!account) {
    res.status(400).json({ error: "아이디를 입력해 주세요." });
    return;
  }

  try {
    await userService.checkAccount(account);
    res.status(200).json({ message: "사용 가능한 아이디입니다." });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

module.exports = { createUser, checkAccount };
