# 🎓 Дипломный проект по автоматизации тестирования 
## **Playwright + JavaScript**  

![Cypress](https://img.shields.io/badge/Framework-Cypress-green)  
![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow)  
![Allure](https://img.shields.io/badge/Report-Allure-blue)  

Этот проект содержит автотесты, разработанные с использованием **Сypress (JS)** для проверки функциональности интернет-магазина [Интернет-магазин Luma](https://www.onliner.by/).  

---

## 📌 Содержание

- [📋 Чек-лист тестов](#cases)  
- [🛠️ Стек технологий](#stack)  
- [⚙️ Подготовка к запуску](#setup)  
- [🚀 Запуск автотестов](#autotests)  
- [📊 Генерация Allure-отчетов](#generateAllureReport)  
- [📑 Пример Allure-отчета](#allureReport)  
- [👤 Автор](#author)

---

<a id="cases"></a>

## 📋 Чек-лист автоматизированных тестов

💻 UI чек-лист:
- ✅ Повторный поиск товаров с главной страницы и наличия титле 
- ✅ Проверка поиск товара из каталога и добавления его в корзину и переход к оформлению заказа 
- ✅ Проверка футера
- ✅ Проверка перехода на подразделы каталога
- ✅ Проверка валидации пользователя по логину и паролю

💻 API чек-лист:
- Проверка метода /posts
- Проверка метода /comments
- Проверка метода /users

---

<a id="stack"></a>

## 🛠️ Стек технологий

- [Cypress](https://www.cypress.io/) – фреймворк для тестирования UI и API
- [Jest](https://jestjs.io/) - ранер api тестов
- [Node.js](https://nodejs.org/) – среда выполнения JavaScript  
- [Allure Report](https://docs.qameta.io/allure/) – система отчетности  
- [npm](https://www.npmjs.com/) – менеджер пакетов  
- [GitHub Actions](https://github.com/features/actions) – CI/CD (при необходимости)

---
<a id="setup"></a>

## ⚙️ Подготовка к запуску

1️⃣ Установить Node.js (версия 22+) с [официального сайта](https://nodejs.org/)  
2️⃣ Склонировать проект  
3️⃣ Локально установить все необходимые пакеты через команду npm ci  

---

<a id="autotests"></a>

## 🚀 Запуск автотестов

Запуск UI тестов
```bash
npm run test:ui
```

Запуск API тестов
```bash
npm run test:api
```

Запуск UNIT тестов
```bash
npm test:unit
---

<a id="generateAllureReport"></a>

## 📊 Генерация Allure отчетов

```bash
npm allure:report
```

<a id="author"></a>

## 👤 Автор 

Труханович Игорь
