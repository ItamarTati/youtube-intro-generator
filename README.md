# YouTube Intro Generator

An interactive web application that helps content creators craft catchy YouTube intros from their video scripts. Built using **React**, **TypeScript**, and **Vite**, this project leverages an AI-powered LLM API to generate engaging introductions quickly and efficiently.

---

## **Features**

- **Script Input Box**: Paste your video script into an intuitive input field.
- **AI-Powered Intro Generation**: Generate a professional YouTube intro with a single click.
- **User-Friendly Interface**: Clean and responsive design for seamless user experience.
- **Hosted on GitHub Pages**: Easily accessible from anywhere.

---

## **Getting Started**

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or later)
- **npm** (v7 or later)
- A **GitHub account**

---

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-username>/youtube-intro-generator.git
   cd youtube-intro-generator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:

   ```arduino
   http://localhost:5173/
   ```

---

### Deployment
This project is hosted on **GitHub Pages**. To deploy your changes:

1. Build the production-ready application:

   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:

   ```bash
   npm run deploy
   ```

Your site will be available at:



   ```arduino
   https://<your-username>.github.io/youtube-intro-generator/
   ```

---

## Technologies Used

**React**: Frontend library for building user interfaces.
**TypeScript**: Ensures type safety and scalability.
**Vite**: Fast and modern frontend build tool.
**Axios**: For seamless API integration.
**Jest**: Ensures the application is robust and bug-free.
**GitHub Pages**: For effortless hosting and deployment.

---

## File Structure

```plaintext
./
 ├── public/              # Static assets
 ├── src/                 # Source code
 │   ├── components/      # React components
 │   ├── tests/           # Tests
 │   ├── App.tsx          # Main application file
 │   ├── main.tsx         # React entry point
 │   ├── api.ts           # API interaction logic
 ├── package.json         # Dependencies and scripts
 ├── tsconfig.json        # TypeScript configuration
 ├── README.md            # Project documentation
 ```