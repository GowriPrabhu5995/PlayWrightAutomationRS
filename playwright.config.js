// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { report } from 'node:process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

//config is an varialbe which holds the configuration details to run the tests
const config =({
  testDir: './tests',
 timeout: 40*1000,  // Set default timeout to 40 seconds for each test execution 
 expect: {
timeout: 5*1000, // Set expect timeout to 40 seconds for assertions
 },

 reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  screenshot: 'on',
  trace: "only-on-failure",
  },
});

module.exports = config





