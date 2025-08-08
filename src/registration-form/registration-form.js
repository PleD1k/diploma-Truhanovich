class RegistrationForm {
  constructor() {
    this.name = null;
    this.surname = null;
    this.email = null;
    this.password = null;
    this.repeatPassword = null;
    this.phone = null;
    this.birthday = null;
    this.gender = null;
    this.city = null;
    this.agree = false;
  }

  setName(name) {
    if (typeof name === 'string' && name.trim() !== '') {
      this.name = name.trim();
      return true;
    }
    return false;
  }

  setSurname(surname) {
    if (typeof surname === 'string' && surname.trim() !== '') {
      this.surname = surname.trim();
      return true;
    }
    return false;
  }

  setEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email === 'string' && emailRegex.test(email)) {
      this.email = email;
      return true;
    }
    return false;
  }

  setPassword(password) {
    if (typeof password === 'string' && password.length >= 6) {
      this.password = password;
      return true;
    }
    return false;
  }

  setRepeatPassword(repeatPassword) {
    if (repeatPassword === this.password) {
      this.repeatPassword = repeatPassword;
      return true;
    }
    return false;
  }

  setPhone(phone) {
    const phoneRegex = /^\d{10,15}$/;
    if (typeof phone === 'string' && phoneRegex.test(phone)) {
      this.phone = phone;
      return true;
    }
    return false;
  }

  setBirthday(birthday) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (typeof birthday === 'string' && dateRegex.test(birthday)) {
      this.birthday = birthday;
      return true;
    }
    return false;
  }

  setGender(gender) {
    const validGenders = ['male', 'female', 'other'];
    if (validGenders.includes(gender)) {
      this.gender = gender;
      return true;
    }
    return false;
  }

  setCity(city) {
    if (typeof city === 'string' && city.trim() !== '') {
      this.city = city.trim();
      return true;
    }
    return false;
  }

  setAgree(agree) {
    if (agree === true) {
      this.agree = agree;
      return true;
    }
    return false;
  }
}

module.exports = RegistrationForm;
