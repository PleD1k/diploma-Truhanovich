# 🎓 Дипломный проект по автоматизации тестирования 
## **Playwright + JavaScript**  

![Playwright](https://img.shields.io/badge/Framework-Playwright-green)  
![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow)  
![Allure](https://img.shields.io/badge/Report-Allure-blue)  

Этот проект содержит автотесты, разработанные с использованием **Playwright (JS)** для проверки функциональности интернет-магазина [Интернет-магазин Luma](https://magento.softwaretestingboard.com/).  

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
- ✅ Проверка поиска товаров с главной страницы  
- ✅ Повторный поиск товаров с главной страницы  
- ✅ Проверка выбора товара из каталога и добавления его в корзину  
- ✅ Проверка функционала подписки на новости  

💻 API чек-лист:
- Проверка метода /user-info
- Проверка создания пользователя
- Проверка удаления пользователя

---

<a id="stack"></a>

## 🛠️ Стек технологий

- [Playwright](https://playwright.dev/) – фреймворк для тестирования UI и API  
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

---

<a id="generateAllureReport"></a>

## 📊 Генерация Allure отчетов

```bash
npm run generate-allure
```

<a id="author"></a>

## 👤 Автор 

Труханович Игорь
