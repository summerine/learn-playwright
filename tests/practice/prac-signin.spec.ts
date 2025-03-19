import {test, expect} from '@playwright/test';

test ('Go to Auto Exercise Sign Up page', async ({page}) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");

});

test ('Check for page heading', async ({page}) => {
    const heading = page.locator('h2:has-text("Test login")');
    console.log(heading);
});

//positive test case
test('Do Sign In and do logout process', async({page}) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await page.locator("#username").click();
    await page.locator("#username").fill("student");
    //await page.pause();
    await page.locator("#password").click();
    await page.getByLabel("Password").fill("Password123");
    await page.locator('#submit').click();
    page.waitForLoadState('networkidle');
    await expect(page.getByText('Logged In Successfully')).toBeVisible();
    await page.getByText('Log out').click();
    await expect(page.locator('#login h2')).toHaveText('Test login');
});

//negative test case
test.only ('Sign in with invalid/wrong Username', async({page}) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await page.getByLabel("Username").click();
    await page.locator('#username').fill("studen");
    await page.locator('#password').fill("Password123");
    await page.getByRole('button', { name :  'Submit' }).click();
    const invalidUsername = page.locator("#error");
    await expect(invalidUsername).toHaveText(/Your username is invalid!/);

});

test.only('Sign in with invalid/wrong Password', async ({page}) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await page.locator('#username').click();
    await page.locator('#username').fill("student");
    await page.locator('#password').click();
    await page.locator('#password').fill("Password12");
    await page.getByRole('button').click();
    await expect(page.locator(".show")).toHaveText("Your password is invalid!");
});