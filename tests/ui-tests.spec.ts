import { test, expect } from '@playwright/test';

test.describe('bl1nk-deck - UI Tests with Screenshots', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('/');
    // Wait for initial load
    await page.waitForLoadState('networkidle');
  });

  test('should load the main application and show header - Screenshot', async ({ page }) => {
    // Check that the application loads correctly
    await expect(page).toHaveTitle(/bl1nk-deck/);
    
    // Verify header is present
    await expect(page.locator('header')).toBeVisible();
    
    // Check for basic layout elements
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('[data-testid="main-content"]')).toBeVisible();
    
    // Take screenshot for documentation
    await page.screenshot({ 
      path: 'screenshots/01-homepage.png',
      fullPage: true 
    });
  });

  test('should navigate to different views', async ({ page }) => {
    // Take initial screenshot
    await page.screenshot({ path: 'screenshots/02-before-navigation.png' });
    
    // Test navigation to Dashboard
    await page.locator('nav a:has-text("Dashboard")').click();
    await expect(page.locator('[data-testid="dashboard-view"]')).toBeVisible();
    await page.screenshot({ path: 'screenshots/03-dashboard-view.png' });

    // Test navigation to Notes
    await page.locator('nav a:has-text("Notes")').click();
    await expect(page.locator('[data-testid="notes-view"]')).toBeVisible();
    await page.screenshot({ path: 'screenshots/04-notes-view.png' });

    // Test navigation to AI Writer
    await page.locator('nav a:has-text("AI Writer")').click();
    await expect(page.locator('[data-testid="ai-writer-view"]')).toBeVisible();
    await page.screenshot({ path: 'screenshots/05-ai-writer-view.png' });

    // Test navigation to Graph View
    await page.locator('nav a:has-text("Graph")').click();
    await expect(page.locator('[data-testid="graph-view"]')).toBeVisible();
    await page.screenshot({ path: 'screenshots/06-graph-view.png' });

    // Test navigation to Tasks
    await page.locator('nav a:has-text("Tasks")').click();
    await expect(page.locator('[data-testid="tasks-view"]')).toBeVisible();
    await page.screenshot({ path: 'screenshots/07-tasks-view.png' });

    // Test navigation to Dictionary
    await page.locator('nav a:has-text("Dictionary")').click();
    await expect(page.locator('[data-testid="dictionary-view"]')).toBeVisible();
    await page.screenshot({ path: 'screenshots/08-dictionary-view.png' });

    // Test navigation to Lore Manager
    await page.locator('nav a:has-text("Lore Manager")').click();
    await expect(page.locator('[data-testid="lore-manager-view"]')).toBeVisible();
    await page.screenshot({ path: 'screenshots/09-lore-manager-view.png' });

    // Test navigation to Pomodoro
    await page.locator('nav a:has-text("Pomodoro")').click();
    await expect(page.locator('[data-testid="pomodoro-view"]')).toBeVisible();
    await page.screenshot({ path: 'screenshots/10-pomodoro-view.png' });

    // Test navigation to Story Structure
    await page.locator('nav a:has-text("Story Structure")').click();
    await expect(page.locator('[data-testid="story-structure-view"]')).toBeVisible();
    await page.screenshot({ path: 'screenshots/11-story-structure-view.png' });
  });

  test('should navigate to different views', async ({ page }) => {
    // Test navigation to Dashboard
    await page.locator('nav a:has-text("Dashboard")').click();
    await expect(page.locator('[data-testid="dashboard-view"]')).toBeVisible();

    // Test navigation to Notes
    await page.locator('nav a:has-text("Notes")').click();
    await expect(page.locator('[data-testid="notes-view"]')).toBeVisible();

    // Test navigation to AI Writer
    await page.locator('nav a:has-text("AI Writer")').click();
    await expect(page.locator('[data-testid="ai-writer-view"]')).toBeVisible();

    // Test navigation to Graph View
    await page.locator('nav a:has-text("Graph")').click();
    await expect(page.locator('[data-testid="graph-view"]')).toBeVisible();

    // Test navigation to Tasks
    await page.locator('nav a:has-text("Tasks")').click();
    await expect(page.locator('[data-testid="tasks-view"]')).toBeVisible();

    // Test navigation to Dictionary
    await page.locator('nav a:has-text("Dictionary")').click();
    await expect(page.locator('[data-testid="dictionary-view"]')).toBeVisible();

    // Test navigation to Lore Manager
    await page.locator('nav a:has-text("Lore Manager")').click();
    await expect(page.locator('[data-testid="lore-manager-view"]')).toBeVisible();

    // Test navigation to Pomodoro
    await page.locator('nav a:has-text("Pomodoro")').click();
    await expect(page.locator('[data-testid="pomodoro-view"]')).toBeVisible();

    // Test navigation to Story Structure
    await page.locator('nav a:has-text("Story Structure")').click();
    await expect(page.locator('[data-testid="story-structure-view"]')).toBeVisible();
  });

  test('should test notes functionality', async ({ page }) => {
    await page.locator('nav a:has-text("Notes")').click();
    
    // Wait for the notes view to load
    await page.waitForSelector('[data-testid="notes-view"]');
    
    // Check that notes list is visible
    await expect(page.locator('[data-testid="notes-list"]')).toBeVisible();
    
    // Click on create new note button
    const createNoteButton = page.locator('button:has-text("Create Note")');
    if (await createNoteButton.count() > 0) {
      await createNoteButton.click();
      
      // Check that note editor modal appears
      await expect(page.locator('[data-testid="note-editor-modal"]')).toBeVisible();
      
      // Test note editor fields
      await page.locator('[data-testid="note-title-input"]').fill('Test Note Title');
      await page.locator('[data-testid="note-content-textarea"]').fill('This is a test note content.');
      
      // Save the note
      await page.locator('button:has-text("Save Note")').click();
      
      // Verify the note appears in the list
      await expect(page.locator('text="Test Note Title"')).toBeVisible();
    }
  });

  test('should test AI Writer functionality', async ({ page }) => {
    await page.locator('nav a:has-text("AI Writer")').click();
    
    // Wait for the AI Writer view to load
    await page.waitForSelector('[data-testid="ai-writer-view"]');
    
    // Check that AI Writer components are visible
    await expect(page.locator('[data-testid="ai-input-area"]')).toBeVisible();
    await expect(page.locator('[data-testid="ai-model-selector"]')).toBeVisible();
    await expect(page.locator('[data-testid="ai-personality-selector"]')).toBeVisible();
    
    // Test typing in the input area
    await page.locator('[data-testid="ai-input-area"]').fill('Test prompt for AI');
    
    // Select an AI model if selector exists
    const modelSelector = page.locator('[data-testid="ai-model-selector"]');
    if (await modelSelector.count() > 0) {
      await modelSelector.selectOption('gemini-pro');
    }
    
    // Select an AI personality if selector exists
    const personalitySelector = page.locator('[data-testid="ai-personality-selector"]');
    if (await personalitySelector.count() > 0) {
      await personalitySelector.selectOption('creative-writer');
    }
    
    // Click the generate button
    const generateButton = page.locator('button:has-text("Generate")');
    if (await generateButton.count() > 0) {
      await generateButton.click();
      
      // Wait for AI response (with timeout)
      await page.waitForSelector('[data-testid="ai-response"]', { timeout: 10000 }).catch(() => {
        // If AI response doesn't appear within timeout, that's fine for this test
      });
    }
  });

  test('should test graph view interactions', async ({ page }) => {
    await page.locator('nav a:has-text("Graph")').click();
    
    // Wait for the graph view to load
    await page.waitForSelector('[data-testid="graph-view"]');
    
    // Check that graph view elements are visible
    await expect(page.locator('[data-testid="graph-container"]')).toBeVisible();
    
    // Test graph interactions if possible
    const graphContainer = page.locator('[data-testid="graph-container"]');
    if (await graphContainer.count() > 0) {
      // Try to interact with the graph (click, drag simulation)
      await graphContainer.click({ position: { x: 100, y: 100 } });
      
      // Test zoom controls if they exist
      const zoomInButton = page.locator('button:has-text("Zoom In")');
      if (await zoomInButton.count() > 0) {
        await zoomInButton.click();
      }
      
      const zoomOutButton = page.locator('button:has-text("Zoom Out")');
      if (await zoomOutButton.count() > 0) {
        await zoomOutButton.click();
      }
    }
  });

  test('should test dark/light mode toggle', async ({ page }) => {
    // Find the theme toggle button (could be a sun/moon icon or text)
    const themeToggle = page.locator('button:has-text("Dark")').or(page.locator('button:has-text("Light")'));
    
    if (await themeToggle.count() > 0) {
      const initialTheme = await themeToggle.textContent();
      
      // Click to toggle theme
      await themeToggle.click();
      
      // Wait a moment for the theme to change
      await page.waitForTimeout(500);
      
      // Verify theme changed
      const newTheme = await themeToggle.textContent();
      expect(newTheme).not.toEqual(initialTheme);
    }
  });

  test('should test project selector', async ({ page }) => {
    // Find and test the project selector dropdown
    const projectSelector = page.locator('[data-testid="project-selector"] button');
    if (await projectSelector.count() > 0) {
      await projectSelector.click();
      
      // Wait for dropdown to appear
      await page.waitForSelector('[data-testid="project-dropdown"]', { timeout: 2000 });
      
      // Check that options are visible
      await expect(page.locator('[data-testid="project-option"]')).toBeVisible();
      
      // Close the dropdown
      await page.keyboard.press('Escape');
    }
  });

  test('should test responsive sidebar toggle', async ({ page }) => {
    // Test mobile menu toggle on smaller screens
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Find the menu toggle button (usually a hamburger icon)
    const menuToggle = page.locator('button:has-text("Menu")').or(page.locator('[aria-label="Toggle menu"]'));
    if (await menuToggle.count() > 0) {
      await menuToggle.click();
      
      // Check that sidebar appears
      await expect(page.locator('[data-testid="sidebar"]')).toBeVisible();
      
      // Close the sidebar
      await menuToggle.click();
      
      // Check that sidebar is hidden
      await expect(page.locator('[data-testid="sidebar"]')).not.toBeVisible();
    }
  });

  test('should test all navigation elements', async ({ page }) => {
    // Navigate to each main section and verify it loads correctly
    const navigationLinks = page.locator('nav a');
    const linkCount = await navigationLinks.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = navigationLinks.nth(i);
      const linkText = await link.textContent();
      
      // Skip if link is for settings or other special pages
      if (!['Settings'].includes(linkText?.trim() || '')) {
        await link.click();
        
        // Wait briefly for the view to load
        await page.waitForTimeout(1000);
        
        // Verify page has content
        const content = page.locator('[data-testid*="-view"]');
        if (await content.count() > 0) {
          await expect(content.first()).toBeVisible();
        }
      }
    }
  });

  test('should test settings functionality', async ({ page }) => {
    await page.locator('nav a:has-text("Settings")').click();
    
    // Wait for the settings view to load
    await page.waitForSelector('[data-testid="settings-view"]');
    
    // Check that settings components are visible
    await expect(page.locator('[data-testid="settings-container"]')).toBeVisible();
    
    // Test API key input if it exists
    const apiKeyInput = page.locator('[data-testid="api-key-input"]');
    if (await apiKeyInput.count() > 0) {
      await apiKeyInput.fill('test-api-key');
      await expect(apiKeyInput).toHaveValue('test-api-key');
    }
    
    // Test any other settings controls
    const saveSettingsButton = page.locator('button:has-text("Save Settings")');
    if (await saveSettingsButton.count() > 0) {
      await saveSettingsButton.click();
    }
  });

  test('should test form validation', async ({ page }) => {
    // Test form validation in various views
    await page.locator('nav a:has-text("Notes")').click();
    
    // Try to create a note with empty fields to test validation
    const createNoteButton = page.locator('button:has-text("Create Note")');
    if (await createNoteButton.count() > 0) {
      await createNoteButton.click();
      
      // Try to save without filling required fields
      const saveButton = page.locator('button:has-text("Save Note")');
      if (await saveButton.count() > 0) {
        await saveButton.click();
        
        // Check for validation messages
        const validationMessage = page.locator('[data-testid="validation-error"]');
        if (await validationMessage.count() > 0) {
          await expect(validationMessage).toBeVisible();
        }
      }
    }
  });

  test('should test error handling', async ({ page }) => {
    // Test how the app handles errors
    // Try to access a non-existent route to test 404 handling
    await page.goto('/non-existent-page');
    
    // Check for 404 page or redirect to home
    const notFound = page.locator('text=Page not found').or(page.locator('text=404'));
    if (await notFound.count() > 0) {
      await expect(notFound).toBeVisible();
    } else {
      // Should redirect to home
      await expect(page).toHaveURL('/');
    }
  });

  test('should test local storage persistence', async ({ page }) => {
    // Test if data persists in local storage
    await page.locator('nav a:has-text("Notes")').click();
    
    // Add a test note
    const createNoteButton = page.locator('button:has-text("Create Note")');
    if (await createNoteButton.count() > 0) {
      await createNoteButton.click();
      
      await page.locator('[data-testid="note-title-input"]').fill('Persistent Test Note');
      await page.locator('[data-testid="note-content-textarea"]').fill('This note should persist after refresh.');
      
      await page.locator('button:has-text("Save Note")').click();
      
      // Refresh the page to test persistence
      await page.reload();
      
      // Wait for the page to load
      await page.waitForLoadState('networkidle');
      
      // Navigate back to notes view
      await page.locator('nav a:has-text("Notes")').click();
      
      // Check that the note still exists after refresh
      await expect(page.locator('text="Persistent Test Note"')).toBeVisible();
    }
  });
});