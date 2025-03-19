import {test, expect} from '@playwright/test'


test('Do registration on the Expandtesting page', async({page}) => {
    await page.goto("https://practice.expandtesting.com/register");
    await page.getByLabel('username').focus();
    await page.getByLabel('username').click();

    await page.locator('#username').fill('twgac');

    //await page.getByRole('textbox', { name: 'Password', exact: true }).click();
    await page.getByLabel('Password', { exact: true }).focus();
    await page.getByLabel('Password', { exact: true }).click();

    await page.locator('#password').fill('test1234');

    await page.getByRole('textbox', {name: 'Confirm Password' }).click();

    await page.locator('#confirmPassword').fill('test1234');

    await page.getByRole('button', {name: 'Register'}).focus();
    await page.getByRole('button', {name: 'Register'}).click();

    //await expect(page.getByText('Successfully registered, you can log in now.')).toBeVisible();
    await expect(page.locator('#flash')).toContainText('Successfully registered, you can log in now.');
    });

test.describe('Login and Logout Flow', () => {
test('Do Login and logout on Expandtesting page', async({page}) => {
    await page.goto("https://practice.expandtesting.com/login");

    await page.locator('#username').click();

    const userNameField = page.getByRole('textbox', {name : 'Username'});

    await userNameField.fill('twgac');

    await page.locator('#password').click();

    await page.locator('#password').fill('test1234');

    await page.locator("[type=submit]").click();

    const successMessage = page.locator('.alert-success');

    await expect(successMessage).toBeVisible();
    
    await expect(successMessage).toContainText('You logged into a secure area!');

    await page.getByRole('link', {name: 'Logout'}).click();

    await page.waitForURL('https://practice.expandtesting.com/login', {timeout: 10000});

    await expect(page.locator('.alert-info')).toContainText('You logged out of the secure area!');

    await expect(page.getByText('Test Login page for Automation Testing Practice')).toBeVisible();

   });   

});
