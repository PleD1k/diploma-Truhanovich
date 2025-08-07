const RegistrationForm = require('../../src/registration-form/registration-form');

describe('RegistrationForm - Positive tests', () => {
  let form;
  beforeEach(() => {
    form = new RegistrationForm();
  });

  it('setName accepts a valid name', () => {
    expect(form.setName('Igor')).toBe(true);
  });

  it('setSurname accepts a valid surname', () => {
    expect(form.setSurname('Petrov')).toBe(true);
  });

  it('setEmail accepts a valid email with subdomain', () => {
    expect(form.setEmail('user@mail.example.com')).toBe(true);
  });

  it('setEmail accepts an email with digits', () => {
    expect(form.setEmail('user123@example.com')).toBe(true);
  });

  it('setPassword accepts a password exactly 6 characters long', () => {
    expect(form.setPassword('123456')).toBe(true);
  });

  it('setPassword accepts a long password', () => {
    expect(form.setPassword('password1234567890')).toBe(true);
  });

  it('setRepeatPassword accepts matching password', () => {
    form.setPassword('password123');
    expect(form.setRepeatPassword('password123')).toBe(true);
  });

  it('setPhone accepts a 10-digit number', () => {
    expect(form.setPhone('0123456789')).toBe(true);
  });

  it('setPhone accepts a 15-digit number', () => {
    expect(form.setPhone('012345678901234')).toBe(true);
  });

  it('setBirthday accepts a valid date', () => {
    expect(form.setBirthday('1990-12-31')).toBe(true);
  });

  it('setGender accepts "male"', () => {
    expect(form.setGender('male')).toBe(true);
  });

  it('setGender accepts "female"', () => {
    expect(form.setGender('female')).toBe(true);
  });

  it('setGender accepts "other"', () => {
    expect(form.setGender('other')).toBe(true);
  });

  it('setCity accepts city name', () => {
    expect(form.setCity('Minsk')).toBe(true);
  });

  it('setAgree accepts true', () => {
    expect(form.setAgree(true)).toBe(true);
  });
});

describe('RegistrationForm - Negative tests', () => {
  let form;
  beforeEach(() => {
    form = new RegistrationForm();
  });

  it('setName does not accept empty string', () => {
    expect(form.setName('')).toBe(false);
  });

  it('setName does not accept a number', () => {
    expect(form.setName(123)).toBe(false);
  });

  it('setSurname does not accept empty string', () => {
    expect(form.setSurname('')).toBe(false);
  });

  it('setEmail does not accept string without "@"', () => {
    expect(form.setEmail('wrongemail.com')).toBe(false);
  });

  it('setEmail does not accept empty string', () => {
    expect(form.setEmail('')).toBe(false);
  });

  it('setPassword does not accept password less than 6 characters', () => {
    expect(form.setPassword('123')).toBe(false);
  });

  it('setRepeatPassword does not accept if password was not set', () => {
    expect(form.setRepeatPassword('pass123')).toBe(false);
  });

  it('setRepeatPassword does not accept non-matching password', () => {
    form.setPassword('correctpass');
    expect(form.setRepeatPassword('wrongpass')).toBe(false);
  });

  it('setPhone does not accept string with letters', () => {
    expect(form.setPhone('12345abcde')).toBe(false);
  });

  it('setPhone does not accept too short number', () => {
    expect(form.setPhone('123')).toBe(false);
  });

  it('setPhone does not accept too long number', () => {
    expect(form.setPhone('1234567890123456')).toBe(false);
  });

  it('setBirthday does not accept date not in YYYY-MM-DD format', () => {
    expect(form.setBirthday('31-12-1990')).toBe(false);
  });

  it('setBirthday does not accept empty string', () => {
    expect(form.setBirthday('')).toBe(false);
  });

  it('setGender does not accept arbitrary string', () => {
    expect(form.setGender('unknown')).toBe(false);
  });

  it('setAgree does not accept false', () => {
    expect(form.setAgree(false)).toBe(false);
  });
});
