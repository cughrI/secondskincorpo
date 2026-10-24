# Pumaras Group website

This beginner project uses only HTML, CSS, and JavaScript. It does not use React, a database, Supabase, or SQL.

## Run the website

1. Open the project folder in Visual Studio Code.
2. Install the **Live Server** extension if you do not have it.
3. Right-click `index.html` and choose **Open with Live Server**.
4. Your browser opens the website. Use the navigation at the top to visit each page.

## What works

- Home, About, Services, Contact, Sign Up, Log In, and account dashboard pages.
- Sign-up and login demo accounts saved in this browser. Passwords are hashed before they are saved.
- Welcome message after signup or login, account name in the navigation, and logout.
- Contact messages are saved in this browser and shown in the demo admin area.
- Demo admin can add and remove services. Visit Sign Up and create an account using `admin@pumarasgroup.com` to see those tools.
- The website works at mobile and desktop sizes.

## Important limitation

This is a learning demo. `localStorage` belongs to one browser on one device, so it is not a real shared database. The demo administrator check is not secure: visitors can create that email themselves. Password hashing in a browser does not replace a proper authentication service. Do not use this demo for real customer accounts, private messages, or business administration. A real public website needs a server or hosted authentication/database service to protect accounts and data.

## Main files

- `index.html` — the page shell and navigation.
- `styles.css` — colors, layout, responsive styles, and page design.
- `app.js` — page content, navigation, forms, and browser storage.

To change the business details, open `app.js` and edit the page text, email address, or starter service list near the top of the file.
