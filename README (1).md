
# COLLABCANVAS (Collaborative Drawing Application )

A robust desktop web application designed for canvas-based digital drawing. Users can create and manipulate artwork using a diverse range of tools such as freehand sketches, lines, rectangles, and text. The application provides extensive customization options, making it a powerful tool for creative expression.


## Overview

This application offers an intuitive drawing interface with a variety of features, including:

👉 **Freehand Drawing:** Allows unrestricted sketching directly on the canvas.

👉 **Shape Drawing:** Enables the creation of lines and rectangles, with options for resizing.

👉 **Text Input:** Facilitates the addition and precise positioning of text elements.

👉 **Tool Customization:** Offers flexibility in adjusting tool settings like color, roughness, size, and stroke width.

👉 **Eraser Tool:** Easily erase any unwanted parts of your drawing.

👉 **Clear All:** Provides a quick way to clear the entire canvas.

👉 **Undo/Redo:** Supports undoing and redoing actions for error correction.
## Known Constraints

👉 **Rectangle Deletion:** Currently, deleting elements within rectangles removes the rectangle first, followed by the enclosed content. It is advisable to move the rectangle before attempting deletion. A fix for this issue is planned in a future update.

👉 **Text Tool Focus:** There are focus issues with the text tool, which will be addressed in an upcoming release.


## Tech Stack

**Vite + React js** for fast and efficient development.

**SASS** for styling.

**Vercel** for seamless deployment.


## Libraries

The following libraries have been integrated into this project: 

👉 **Perfect-freehand** for smooth freehand drawing.

👉 **Roughjs** for rendering sketchy, hand-drawn-style graphics.
## Installation
To set up the project locally, follow these steps:

  1. **Set up the Vite + React App:** 
    Using command: npm create vite@latest

  2. **Install dependencies with npm:**
    Using command: npm install

  3. **Start the development server:**
    Using command: npm run dev

After running these commands, you can access the application at http://localhost:5173.

