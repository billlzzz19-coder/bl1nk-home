import { test, expect } from '@playwright/test';

test.describe('bl1nk-deck - End-to-End Tests with Screenshots', () => {
  // Set up a user journey that goes through the main functionality
  test('complete writing workflow - Screenshots for GIFs', async ({ page }) => {
    // 1. Start at the dashboard
    await page.goto('/');
    await expect(page.locator('h1, .dashboard-title, [data-testid="dashboard-view"]')).toBeVisible();
    
    // Take initial screenshot
    await page.screenshot({ path: 'screenshots/e2e-01-dashboard.png' });
    
    // 2. Create a new project
    const projectSelector = page.locator('[data-testid="project-selector"]');
    if (await projectSelector.count() > 0) {
      await projectSelector.click();
      await page.locator('button:has-text("Create New Project")').click();
      
      // Take screenshot of project creation modal
      await page.waitForSelector('input[placeholder="Project Name"]');
      await page.screenshot({ path: 'screenshots/e2e-02-create-project.png' });
      
      // Fill in project details
      await page.locator('input[placeholder="Project Name"]').fill('Test Writing Project');
      await page.locator('textarea[placeholder="Project Description"]').fill('A project for testing the writing suite');
      await page.locator('button:has-text("Create Project")').click();
      
      // Verify project was created
      await expect(page.locator('text="Test Writing Project"')).toBeVisible();
    }
    
    // 3. Navigate to Notes section and create a note
    await page.locator('nav a:has-text("Notes")').click();
    
    // Wait for notes view to load
    await page.waitForSelector('[data-testid="notes-view"]');
    
    // Take screenshot of notes view
    await page.screenshot({ path: 'screenshots/e2e-03-notes-view.png' });
    
    // Create a new note
    await page.locator('button:has-text("Create Note"), button:has-text("New Note")').click();
    
    // Wait for note editor to appear
    await page.waitForSelector('[data-testid="note-title-input"], input[placeholder="Note Title"]');
    
    // Take screenshot during note creation
    await page.screenshot({ path: 'screenshots/e2e-04-create-note.png' });
    
    // Fill in note details
    await page.locator('[data-testid="note-title-input"], input[placeholder="Note Title"]').fill('Character Profile');
    await page.locator('[data-testid="note-content-textarea"], textarea').fill(`
# Character Profile: Hero Name
  
## Basic Information
- Name: Hero McHero
- Age: 25
- Occupation: Professional Hero
  
## Personality
- Bravery: 10/10
- Wit: 8/10
- Patience: 3/10
  
## Backstory
A hero with a tragic past who fights for justice.
    `);
    
    // Set category and status
    const categorySelect = page.locator('select[aria-label="Category"], [data-testid="note-category"]');
    if (await categorySelect.count() > 0) {
      await categorySelect.selectOption('Characters');
    }
    
    const statusSelect = page.locator('select[aria-label="Status"], [data-testid="note-status"]');
    if (await statusSelect.count() > 0) {
      await statusSelect.selectOption('draft');
    }
    
    // Take final screenshot before saving note
    await page.screenshot({ path: 'screenshots/e2e-05-filled-note.png' });
    
    // Save the note
    await page.locator('button:has-text("Save"), button:has-text("Save Note")').click();
    
    // Wait a moment and take screenshot of note in list
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/e2e-06-note-saved.png' });
    
    // Verify note appears in list
    await expect(page.locator('text="Character Profile"')).toBeVisible();
    
    // 4. Navigate to AI Writer and use it
    await page.locator('nav a:has-text("AI Writer")').click();
    
    // Wait for AI Writer view to load
    await page.waitForSelector('[data-testid="ai-writer-view"]');
    
    // Take screenshot of AI Writer interface
    await page.screenshot({ path: 'screenshots/e2e-07-ai-writer.png' });
    
    // Write a prompt to generate content
    await page.locator('[data-testid="ai-input-area"], textarea[placeholder*="prompt"], #ai-prompt').fill(`
Based on the character profile "Hero McHero", write the opening scene of a story where they encounter their first major challenge. Focus on showing their personality through action rather than description.
    `);
    
    // Take screenshot after filling prompt
    await page.screenshot({ path: 'screenshots/e2e-08-ai-prompt-filled.png' });
    
    // Select an appropriate AI personality
    const personalitySelect = page.locator('[data-testid="ai-personality-selector"], select[aria-label*="personality"]');
    if (await personalitySelect.count() > 0) {
      await personalitySelect.selectOption('creative-writer');
    }
    
    // Click generate button
    const generateButton = page.locator('button:has-text("Generate"), button:has-text("Write")');
    if (await generateButton.count() > 0) {
      await generateButton.click();
      
      // Wait for AI response (with timeout) and take intermediate screenshots
      await page.waitForSelector('[data-testid="ai-response"], [data-testid="generated-content"]', { timeout: 15000 });
      await page.waitForTimeout(2000); // Allow for partial content to appear
      await page.screenshot({ path: 'screenshots/e2e-09-ai-generating.png' });
    }
    
    // Take final screenshot of AI result
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/e2e-10-ai-result.png' });
    
    // 5. Navigate to Lore Manager to create a plot point
    await page.locator('nav a:has-text("Lore Manager")').click();
    
    // Wait for Lore Manager view to load
    await page.waitForSelector('[data-testid="lore-manager-view"]');
    
    // Take screenshot of Lore Manager
    await page.screenshot({ path: 'screenshots/e2e-11-lore-manager.png' });
    
    // Create a new plot point
    await page.locator('button:has-text("Add Plot Point"), button:has-text("New Plot")').click();
    
    // Wait for form to appear
    await page.waitForSelector('[data-testid="plot-point-title"], input[placeholder*="title"]');
    
    await page.locator('[data-testid="plot-point-title"], input[placeholder*="title"]').fill('First Major Battle');
    await page.locator('[data-testid="plot-point-description"], textarea[placeholder*="description"]').fill(`
Hero McHero faces off against the Villain X for the first time. This battle will test all of Hero's abilities and force a character development moment.
    `);
    
    const plotStatusSelect = page.locator('select[aria-label="Status"], [data-testid="plot-status"]');
    if (await plotStatusSelect.count() > 0) {
      await plotStatusSelect.selectOption('planned');
    }
    
    // Take screenshot before saving plot point
    await page.screenshot({ path: 'screenshots/e2e-12-create-plot.png' });
    
    await page.locator('button:has-text("Save Plot"), button:has-text("Save")').click();
    
    // Verify plot point appears in list
    await expect(page.locator('text="First Major Battle"')).toBeVisible();
    
    // 6. Also create a world element
    await page.locator('button:has-text("Add World Element"), button:has-text("New Element")').click();
    
    await page.locator('[data-testid="element-name"], input[placeholder*="name"]').fill('The City of Heroes');
    await page.locator('[data-testid="element-description"], textarea[placeholder*="description"]').fill(`
A metropolis dedicated to heroism and justice. The city has special zoning for training, equipment, and hero activities.
    `);
    
    const elementTypeSelect = page.locator('select[aria-label*="type"], [data-testid="element-type"]');
    if (await elementTypeSelect.count() > 0) {
      await elementTypeSelect.selectOption('Location');
    }
    
    // Take screenshot before saving element
    await page.screenshot({ path: 'screenshots/e2e-13-create-element.png' });
    
    await page.locator('button:has-text("Save Element"), button:has-text("Save")').click();
    
    // Verify world element appears in list
    await expect(page.locator('text="The City of Heroes"')).toBeVisible();
    
    // 7. Navigate to Graph View to see connections
    await page.locator('nav a:has-text("Graph")').click();
    
    // Wait for Graph View to load
    await page.waitForSelector('[data-testid="graph-view"]');
    
    // Wait a moment for graph to render
    await page.waitForTimeout(2000);
    
    // Take screenshot of the graph view
    await page.screenshot({ path: 'screenshots/e2e-14-graph-view.png' });
    
    // Verify that nodes for our content appear
    await expect(page.locator('text="Character Profile"').or(page.locator('text="Hero McHero"'))).toBeVisible();
    await expect(page.locator('text="First Major Battle"')).toBeVisible();
    await expect(page.locator('text="The City of Heroes"')).toBeVisible();
    
    // 8. Navigate to Tasks to create a task
    await page.locator('nav a:has-text("Tasks")').click();
    
    // Wait for Tasks view to load
    await page.waitForSelector('[data-testid="tasks-view"]');
    
    // Take screenshot of tasks view
    await page.screenshot({ path: 'screenshots/e2e-15-tasks-view.png' });
    
    // Create a new task
    await page.locator('button:has-text("Add Task"), button:has-text("New Task")').click();
    
    await page.locator('[data-testid="task-title"], input[placeholder*="task"]').fill('Write Chapter 1');
    await page.locator('[data-testid="task-description"], textarea[placeholder*="description"]').fill('Complete the first chapter based on the character and plot point created.');
    
    const prioritySelect = page.locator('select[aria-label*="priority"], [data-testid="task-priority"]');
    if (await prioritySelect.count() > 0) {
      await prioritySelect.selectOption('high');
    }
    
    // Take screenshot before saving task
    await page.screenshot({ path: 'screenshots/e2e-16-create-task.png' });
    
    await page.locator('button:has-text("Save Task"), button:has-text("Save")').click();
    
    // Verify task appears in list
    await expect(page.locator('text="Write Chapter 1"')).toBeVisible();
    
    // 9. Test completing a task
    const taskCheckbox = page.locator('input[type="checkbox"][data-testid*="task-complete"]');
    if (await taskCheckbox.count() > 0) {
      await taskCheckbox.first().click();
      
      // Take screenshot after completing task
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'screenshots/e2e-17-task-completed.png' });
      
      // Verify task shows as completed
      await expect(taskCheckbox.first()).toBeChecked();
    }
    
    // 10. Navigate back to dashboard to see summary
    await page.locator('nav a:has-text("Dashboard")').click();
    
    // Wait for Dashboard to load
    await page.waitForSelector('[data-testid="dashboard-view"]');
    
    // Take final screenshot of dashboard with all created content
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/e2e-18-final-dashboard.png' });
    
    // Verify dashboard shows recent activity
    await expect(page.locator('text="Character Profile"').or(page.locator('text="Recent Notes"'))).toBeVisible();
    await expect(page.locator('text="First Major Battle"').or(page.locator('text="Recent Plot Points"'))).toBeVisible();
    
    // 11. Test export functionality if available
    const exportButton = page.locator('button:has-text("Export"), button:has-text("Save All")');
    if (await exportButton.count() > 0) {
      await exportButton.click();
      
      // Wait for export options
      await page.waitForSelector('[data-testid="export-options"], [role="dialog"]');
      
      // Take screenshot of export dialog
      await page.screenshot({ path: 'screenshots/e2e-19-export-dialog.png' });
      
      // Select export format
      const exportFormatSelect = page.locator('select[aria-label*="format"]');
      if (await exportFormatSelect.count() > 0) {
        await exportFormatSelect.selectOption('json');
      }
      
      // Confirm export
      await page.locator('button:has-text("Export"), button:has-text("Download")').click();
    }
    
    // 12. Final verification - ensure all created content still exists
    await page.locator('nav a:has-text("Notes")').click();
    await expect(page.locator('text="Character Profile"')).toBeVisible();
    
    await page.locator('nav a:has-text("Tasks")').click();
    await expect(page.locator('text="Write Chapter 1"')).toBeVisible();
    
    await page.locator('nav a:has-text("Lore Manager")').click();
    await expect(page.locator('text="First Major Battle"')).toBeVisible();
    await expect(page.locator('text="The City of Heroes"')).toBeVisible();
    
    await page.locator('nav a:has-text("Graph")').click();
    await expect(page.locator('text="Hero McHero"').or(page.locator('text="Character Profile"'))).toBeVisible();
    await expect(page.locator('text="First Major Battle"')).toBeVisible();
    await expect(page.locator('text="The City of Heroes"')).toBeVisible();
  });

  test('user authentication flow', async ({ page }) => {
    // Test the authentication flow
    await page.goto('/login');
    
    // Verify login page
    await expect(page.locator('text=Login').or(page.locator('text=เข้าสู่ระบบ'))).toBeVisible();
    
    // Try to login with test credentials
    await page.locator('input[type="email"], input[placeholder*="email"]').fill('test@example.com');
    await page.locator('input[type="password"], input[placeholder*="password"]').fill('testpassword');
    
    await page.locator('button:has-text("Login"), button:has-text("เข้าสู่ระบบ")').click();
    
    // Wait for redirect to main application
    await page.waitForURL('**/');
    await expect(page.locator('[data-testid="dashboard-view"]')).toBeVisible();
    
    // Test logout functionality
    const logoutButton = page.locator('button:has-text("Logout"), button:has-text("ออกจากระบบ")');
    if (await logoutButton.count() > 0) {
      await logoutButton.click();
      
      // Should redirect back to login
      await page.waitForURL('**/login');
      await expect(page.locator('text=Login').or(page.locator('text=เข้าสู่ระบบ'))).toBeVisible();
    }
  });

  test('data import/export workflow', async ({ page }) => {
    // Test data import/export functionality
    await page.goto('/');
    
    // Navigate to settings for import/export options
    await page.locator('nav a:has-text("Settings")').click();
    
    // Look for import/export options
    const importButton = page.locator('button:has-text("Import"), button:has-text("นำเข้า")');
    const exportButton = page.locator('button:has-text("Export"), button:has-text("ส่งออก")');
    
    if (await importButton.count() > 0) {
      // Click import button
      await importButton.click();
      
      // Test file upload
      const fileInput = page.locator('input[type="file"]');
      if (await fileInput.count() > 0) {
        // Note: For this test we'll just check that the input exists
        // Actual file upload would require a test file
        await expect(fileInput).toBeVisible();
      }
    }
    
    if (await exportButton.count() > 0) {
      // Test export functionality
      await exportButton.click();
      
      // Check for export options
      await page.waitForSelector('[data-testid="export-options"], [role="dialog"]');
      
      // Select JSON export
      const formatSelect = page.locator('select');
      if (await formatSelect.count() > 0) {
        await formatSelect.selectOption('json');
      }
      
      // Confirm export
      await page.locator('button:has-text("Export"), button:has-text("Download")').click();
    }
  });

  test('theme and accessibility features', async ({ page }) => {
    // Test theme switching
    await page.goto('/');
    
    // Find and click theme toggle
    const themeToggle = page.locator('button[aria-label*="theme"], button:has-text("Dark"), button:has-text("Light")');
    if (await themeToggle.count() > 0) {
      // Get initial theme state
      const initialTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
      
      // Toggle theme
      await themeToggle.click();
      
      // Wait for theme change
      await page.waitForTimeout(500);
      
      // Verify theme change
      const newTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
      expect(initialTheme).not.toEqual(newTheme);
      
      // Toggle back
      await themeToggle.click();
      await page.waitForTimeout(500);
    }
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['BUTTON', 'A', 'INPUT', 'TEXTAREA'].includes(focusedElement || '')).toBeTruthy();
    
    // Test all interactive elements receive focus
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Test zoom functionality
    await page.keyboard.press('Control+Plus'); // Zoom in
    await page.waitForTimeout(300);
    await page.keyboard.press('Control+0'); // Reset zoom
  });

  test('performance and error handling', async ({ page }) => {
    // Test application performance
    const startTime = Date.now();
    await page.goto('/');
    
    // Wait for all resources to load
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Application should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    
    // Test error handling by accessing a malformed URL
    await page.goto('/#/invalid/route/with/special?chars=1&test=2');
    await expect(page.locator('[data-testid="dashboard-view"], [data-testid="main-content"]')).toBeVisible();
    
    // Test with large amount of data
    await page.locator('nav a:has-text("Notes")').click();
    
    // Create multiple notes to test performance with data
    for (let i = 0; i < 5; i++) {
      const createNoteButton = page.locator('button:has-text("Create Note")');
      if (await createNoteButton.count() > 0) {
        await createNoteButton.click();
        
        await page.locator('[data-testid="note-title-input"], input[placeholder*="title"]').fill(`Performance Test Note ${i}`);
        await page.locator('[data-testid="note-content-textarea"], textarea').fill(`This is note #${i} for performance testing.`);
        
        await page.locator('button:has-text("Save")').click();
      }
    }
    
    // Verify all notes appear
    for (let i = 0; i < 5; i++) {
      await expect(page.locator(`text="Performance Test Note ${i}"`)).toBeVisible();
    }
    
    // Test responsiveness by resizing window
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile
    await expect(page.locator('nav, [data-testid="mobile-menu"]')).toBeVisible();
    
    await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop
    await expect(page.locator('[data-testid="desktop-layout"]')).toBeVisible();
  });
});