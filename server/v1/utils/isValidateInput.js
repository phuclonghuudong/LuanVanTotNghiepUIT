const bcrypt = require("bcryptjs");
const saltRounds = 10;

const validUsernameInput = (value) => {
  if (!value || typeof value !== "string") return false;
  return value.length >= 6;
};

const validEmailInput = async (value) => {
  const reg = /^(\w+([.]\w+)*@\w+([.]\w+)*\.\w+([.]\w+)*)$/;
  const isCheckEmail = reg.test(value);
  return isCheckEmail;
};

const validPhoneInput = async (value) => {
  const reg = /^(0|\+84)(\d{9})$/;
  return reg.test(value.trim());
};

const validPasswordInput = async (password) => {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return reg.test(password);
};

const isValidCCCDInput = async (cccd) => {
  const regex = /^\d{12}$/;
  return regex.test(cccd);
};

const hashPassword = async (password) => {
  const hashPass = await bcrypt.hash(password, saltRounds);
  return hashPass;
};

const comparePassword = async (txtPassword, password) => {
  const pass = await bcrypt.compare(txtPassword, password);
  return pass;
};

module.exports = {
  validUsernameInput,
  validEmailInput,
  validPhoneInput,
  validPasswordInput,
  isValidCCCDInput,
  hashPassword,
  comparePassword,
};
