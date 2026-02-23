export function Valiname(name) {
  const nameRegex = /^[a-zA-Z\u0600-\u06FF][a-zA-Z\u0600-\u06FF0-9\s]{1,29}$/;
  return nameRegex.test(name);
}

export function ValiEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function ValiPassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  return passwordRegex.test(password);
}

export function ValiConformPassword(passwordOne, passwordTwo) {
  return passwordOne === passwordTwo;
}
