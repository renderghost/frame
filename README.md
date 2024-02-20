# Photo Gallery Project

## Overview

This project is a responsive photo gallery designed to showcase a collection of photographs. It dynamically loads images and their metadata from a JSON file, presenting them in an attractive, user-friendly interface. The gallery supports various features such as lazy loading, infinite scrolling, and responsive design to accommodate different device sizes.

## Features

- **Dynamic Image Loading**: Automatically loads images and their metadata from a JSON file.
- **Responsive Design**: Adapts layout for mobile, tablet, and desktop viewports.
- **Slick Slider Integration**: Utilizes the Slick Slider library for a smooth, responsive carousel experience.
- **Lazy Loading**: Images are loaded on demand to improve performance and user experience.
- **Infinite Scrolling**: Allows users to cycle through the images in a loop without interruption.

## Credits

- [Slick Slider](https://kenwheeler.github.io/slick/) - for carousel functionality

## Setup Instructions

1. **Running the Project Locally**

   To view the project, you'll need to run it on a local server. If you have Python installed, you can start a simple HTTP server with the following command:

   ```sh
   python -m http.server
   ```

   Or, if you prefer Node.js, you can use `http-server` by first installing it globally:

   ```sh
   npm install --global http-server
   ```

   Then run it in your project directory:

   ```sh
   http-server
   ```

   Visit `http://localhost:8000` (or the port provided in your terminal) in your web browser to view the project.
