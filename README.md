Pigeon Park Feeder

Overview

Welcome to Pigeon Park Feeder, a delightful and interactive simulation where you can feed hungry pigeons in a park! Experience the joy of attracting pigeons with popcorn and watch them fly around after a good meal. This project is a simple yet engaging game built using the p5.js library, designed to bring a little bit of nature's charm to your screen.

Features

    Interactive Popcorn Dropping: Click anywhere on the screen to drop popcorn, attracting nearby pigeons.

    Dynamic Pigeon Behavior: Pigeons will seek out and approach the fallen popcorn.

    Limited Bites per Popcorn: Each piece of popcorn can only be eaten by two pigeons, mimicking real-world sharing.

    "Fed" State: Once a pigeon has eaten, it enters a "fed" state, flying around contentedly without seeking more food, accurately reflecting the rule: "Pigeon once eating it flies around NOT tempting to look for corn."

    Visual Feedback:

        Score Tracker: Keep an eye on how many unique pigeons you've fed.

        Pigeon Image Change: Pigeons change their appearance after eating, signifying they've been fed.

        Image Flipping: Pigeons dynamically flip their image to face the direction they're moving, adding to the realism.

    Sounds: Enjoy subtle sound effects for popcorn dropping and pigeons eating.

How to Play

    Open index.html: Simply open the index.html file in your web browser.

    Click to Drop Popcorn: Use your mouse to click anywhere on the green park area. This will drop a piece of popcorn from the top of the screen.

    Watch the Pigeons: Observe as the hungry pigeons fly towards the popcorn. The two fastest pigeons will get to enjoy the snack!

    Keep Feeding: Continue dropping popcorn to feed more pigeons.

    Achieve the Goal: The game will celebrate once all pigeons in the park have been fed.

Setup Instructions

To run this project locally, follow these simple steps:

    Download/Clone the Repository: Get all the project files onto your computer.

    Ensure File Structure: Make sure your project directory contains:

        index.html (the main HTML file)

        sketch.js (your p5.js script)

        pigeon.png (image for unfed pigeons)

        Flying.png (image for fed pigeons)

        Corn.png (image for popcorn)

        Your sound files (e.g., pop-sound.mp3, land-sound.mp3, croc-sound.mp3) - ensure these are correctly linked in your index.html.

    Open with a Web Browser: Drag and drop the index.html file into any modern web browser (Chrome, Firefox, Edge, Safari, etc.).

No complex server setup or installations are required!

Project Structure

    index.html: The main web page that loads the p5.js library and your sketch.js file. It also includes elements for displaying the score and managing sound effects.

    sketch.js: Contains the core p5.js code, including the setup(), draw() functions, and the Pigeon class definition.

    pigeon.png: Image asset for a standard, unfed pigeon.

    Flying.png: Image asset for a pigeon that has been fed.

    Corn.png: Image asset for the popcorn.

    pop-sound.mp3, land-sound.mp3, croc-sound.mp3: Audio assets for game feedback.

Credits

    Developed by: [Sunhyea Sakong]

    Assets: (All the audio files come from freesound.com and the images are from cleanpng.com. Thank you! )