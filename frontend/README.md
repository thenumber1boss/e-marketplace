
# Farmers Market Frontend Directory

Welcome to the frontend of our E-Commerce store for farmers! The technology used is HTML, CSS, and JavaScript. To maintain code organization and facilitate scalability, please create individual components that can be easily managed and reused.

## Getting Started

Follow these steps to set up and contribute to the project:

1. ## Clone the Repository:

   ```bash
   git clone https://github.com/maradeben/farmers-market.git
   cd frontend
   ```

2. ## Create Components:

   Components are individual units of the frontend that can be reused and easily managed. Create a new directory for each component inside the `src/components` folder. Each component should have its own HTML, CSS, and JavaScript files.

   Example Component Structure:
   ```plaintext
   src/
   |-- components/
       |-- Header/
           |-- Header.html
           |-- Header.css
           |-- Header.js
   ```

   Each component should have a unique ID.

3. ## Create Pages:

   Pages are a combination of multiple components and page-specific elements. Create a new directory for each page inside the `src/pages` folder.

   Example Page Structure:
   ```plaintext
   src/
   |-- pages/
       |-- Home/
           |-- Home.html
           |-- Home.css
           |-- Home.js
   ```

   Use ID-specific placeholders to render components required for each page.

## Front-End Directory Structure:

```plaintext
project-root/
|-- frontend/
|   |-- assets/
|   |   |-- images/
|   |   |-- ...
|   |
|   |-- src/
|   |   |-- components/
|   |   |   |-- ...
|   |   |
|   |   |-- pages/
|   |   |   |-- ...
|   |   |
|   |   |-- services/
|   |   |   |-- ...
|   |   |
|   |
|   |-- index.html  ## Entry point for frontend
|   |-- styles.css   ## global styles
|   |-- index.js     ## entry point for webpack bundling
|   |-- webpack.config.js    ## webpack configuration file for frontend
|   |-- README.md
|
|
|-- backend/
|   |-- ...

```

## Install Dependencies:

```bash
npm install --save
npm install --save-dev
```

## Run Server:

```bash
npm run start:frontend
```