# pk-project

This is a modern React application bootstrapped with Vite and styled with Tailwind CSS, offering a fast development experience and optimized production builds. It includes routing powered by `react-router-dom` and animations with `framer-motion`.

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool that provides a lightning-fast development experience for modern web projects.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **React Router DOM:** Declarative routing for React.js.
*   **Framer Motion:** A production-ready motion library for React.
*   **Lucide React:** A beautiful and consistent icon toolkit.

## Project Structure (Layout Components)

The main layout components are located in `src/app/components/layout`:

*   `Header.tsx`: Handles the top navigation and branding of the application.
*   `Hero.tsx`: Displays the main introductory section, often with a prominent call to action.
*   `Footer.tsx`: Contains copyright information, links, and other bottom-of-page content.

## Color Palette

The project primarily utilizes a dark theme with the following base colors:

*   **Background:** Black (`#000`)
*   **Text:** White / Light Gray (`rgba(255, 255, 255, 0.87)`)

Further styling and color definitions are primarily managed through Tailwind CSS utility classes directly within the components.

## Available Scripts

In the project directory, you can run:

*   ### `npm run dev`
    Runs the app in development mode.
    Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
    The page will reload if you make edits.

*   ### `npm run build`
    Builds the app for production to the `dist` folder.
    It correctly bundles React in production mode and optimizes the build for the best performance.

*   ### `npm run lint`
    Lints the project files for potential errors and style violations.

*   ### `npm run preview`
    Locally previews your production build.

## Installation and Usage

To get started with the project, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd pk-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This will open the application in your browser at `http://localhost:5173`.