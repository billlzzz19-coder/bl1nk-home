// utils/gif-creator.js
// This script creates animated GIFs from screenshots for the demo

const fs = require('fs');
const path = require('path');

// Function to create a simple HTML page that demonstrates the app workflow using screenshots
function createDemoPage() {
  const screenshots = fs.readdirSync('./screenshots')
    .filter(file => file.endsWith('.png'))
    .sort();
  
  // Select key screenshots for the demo
  const selectedScreenshots = screenshots.filter(file => 
    file.includes('dashboard') || 
    file.includes('notes') || 
    file.includes('ai') || 
    file.includes('graph') || 
    file.includes('task')
  );
  
  // Create an HTML file that shows the screenshots in sequence
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>bl1nk-deck - Demo</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
    h1 {
      text-align: center;
      color: #333;
    }
    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .demo-item {
      text-align: center;
    }
    .demo-item img {
      max-width: 100%;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .demo-caption {
      margin-top: 10px;
      font-weight: bold;
      color: #555;
    }
    .gif-section {
      text-align: center;
      margin: 30px 0;
    }
    .gif-placeholder {
      background: #f0f0f0;
      padding: 40px;
      border-radius: 8px;
      border: 2px dashed #ccc;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>bl1nk-deck - UI Demonstration</h1>
    
    <div class="gif-section">
      <h2>App Workflow Demo (Animated)</h2>
      <div class="gif-placeholder">
        <p>animated-demo.gif would be displayed here in a production environment</p>
        <p>This would show navigation through various views</p>
      </div>
    </div>
    
    <h2>Screenshot Sequence</h2>
    <div class="demo-grid">
      ${selectedScreenshots.map((file, index) => `
        <div class="demo-item">
          <img src="screenshots/${file}" alt="App view ${index + 1}">
          <div class="demo-caption">${file.replace('.png', '').replace(/-/g, ' ')}</div>
        </div>
      `).join('')}
    </div>
  </div>
</body>
</html>`;

  fs.writeFileSync('./demo-page.html', htmlContent);
  console.log(`Demo page created with ${selectedScreenshots.length} screenshots`);
}

// Function to generate a simple GIF workflow description
function createGifWorkflow() {
  const gifWorkflow = {
    "dashboard-to-notes": {
      "title": "Dashboard to Notes View",
      "description": "Navigate from dashboard to notes management",
      "screenshots": [
        "screenshots/01-homepage.png",
        "screenshots/03-dashboard-view.png", 
        "screenshots/04-notes-view.png"
      ],
      "duration": "3 seconds"
    },
    "create-note": {
      "title": "Creating a New Note",
      "description": "Creating and saving a new note",
      "screenshots": [
        "screenshots/04-notes-view.png",
        "screenshots/e2e-04-create-note.png",
        "screenshots/e2e-05-filled-note.png",
        "screenshots/e2e-06-note-saved.png"
      ],
      "duration": "4 seconds"
    },
    "ai-writer-flow": {
      "title": "AI Writer Interaction",
      "description": "Using the AI writer functionality",
      "screenshots": [
        "screenshots/05-ai-writer-view.png",
        "screenshots/e2e-08-ai-prompt-filled.png",
        "screenshots/e2e-09-ai-generating.png",
        "screenshots/e2e-10-ai-result.png"
      ],
      "duration": "5 seconds"
    }
  };

  fs.writeFileSync('./gif-workflows.json', JSON.stringify(gifWorkflow, null, 2));
  console.log('GIF workflow configuration created');
}

// Run the functions
createDemoPage();
createGifWorkflow();

module.exports = {
  createDemoPage,
  createGifWorkflow
};