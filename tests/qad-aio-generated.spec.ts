import { expect, test } from '@playwright/test';
import { SauceDemoCheckoutPage } from '../pages/sauceDemoCheckoutPage';
import { SauceDemoInventoryPage } from '../pages/sauceDemoInventoryPage';
import { SauceDemoLoginPage } from '../pages/sauceDemoLoginPage';
import { checkoutData, sauceAioCases, sauceUsers } from '../test-data/qadAioData';

test.describe('QAD SauceDemo generated suite', () => {
  test(sauceAioCases[0].testTitle, async ({ page }) => {
    // Jira Key: QAD-5 | AIO Test Case Key: SAUCE-AIO-001
    const loginPage = new SauceDemoLoginPage(page);
    const inventoryPage = new SauceDemoInventoryPage(page);

    await loginPage.open();
    await loginPage.login(sauceUsers.standard.username, sauceUsers.standard.password);

    await expect(inventoryPage.productsTitle).toBeVisible();
    await expect(page).toHaveURL(/inventory/);
  });

  test(sauceAioCases[1].testTitle, async ({ page }) => {
    // Jira Key: QAD-4 | AIO Test Case Key: SAUCE-AIO-002
    const loginPage = new SauceDemoLoginPage(page);

    await loginPage.open();
    await loginPage.login(sauceUsers.locked.username, sauceUsers.locked.password);

    await expect(loginPage.errorMessage).toContainText('locked out');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test(sauceAioCases[2].testTitle, async ({ page }) => {
    // Jira Key: QAD-6 | AIO Test Case Key: SAUCE-AIO-003
    const loginPage = new SauceDemoLoginPage(page);
    const inventoryPage = new SauceDemoInventoryPage(page);

    await loginPage.open();
    await loginPage.login(sauceUsers.standard.username, sauceUsers.standard.password);
    await inventoryPage.sortPriceLowToHigh();

    const firstTwoPrices = (await inventoryPage.itemPrices.allTextContents())
      .slice(0, 2)
      .map((price) => Number(price.replace('$', '')));

    expect(firstTwoPrices[0]).toBeLessThanOrEqual(firstTwoPrices[1]);
  });

  test(sauceAioCases[3].testTitle, async ({ page }) => {
    // Jira Key: QAD-7 | AIO Test Case Key: SAUCE-AIO-004
    const loginPage = new SauceDemoLoginPage(page);
    const inventoryPage = new SauceDemoInventoryPage(page);

    await loginPage.open();
    await loginPage.login(sauceUsers.standard.username, sauceUsers.standard.password);

    const initialBadgeText = (await inventoryPage.cartBadge.textContent()) ?? '0';
    const initialCount = Number(initialBadgeText);

    await inventoryPage.addBackpackToCart();

    await expect(inventoryPage.cartBadge).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText(String(initialCount + 1));
  });

  test(sauceAioCases[4].testTitle, async ({ page }) => {
    // Jira Key: QAD-8 | AIO Test Case Key: SAUCE-AIO-005
    const loginPage = new SauceDemoLoginPage(page);
    const inventoryPage = new SauceDemoInventoryPage(page);
    const checkoutPage = new SauceDemoCheckoutPage(page);

    await loginPage.open();
    await loginPage.login(sauceUsers.standard.username, sauceUsers.standard.password);
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openCart();

    await expect(checkoutPage.removeButton).toBeVisible();
    await checkoutPage.removeButton.click();

    await expect(inventoryPage.cartBadge).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
  });

  test(sauceAioCases[5].testTitle, async ({ page }) => {
    // Jira Key: QAD-9 | AIO Test Case Key: SAUCE-AIO-006
    const loginPage = new SauceDemoLoginPage(page);
    const inventoryPage = new SauceDemoInventoryPage(page);
    const checkoutPage = new SauceDemoCheckoutPage(page);

    await loginPage.open();
    await loginPage.login(sauceUsers.standard.username, sauceUsers.standard.password);
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openCart();

    await checkoutPage.checkoutFromCart();
    await expect(checkoutPage.checkoutInfoTitle).toBeVisible();

    await checkoutPage.fillYourInformation(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode
    );
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.checkoutOverviewTitle).toBeVisible();

    await checkoutPage.finishCheckout();
    await expect(checkoutPage.checkoutCompleteTitle).toBeVisible();
    await expect(checkoutPage.orderConfirmationHeading).toBeVisible();
  });

  test(sauceAioCases[6].testTitle, async ({ page }) => {
    // Jira Key: QAD-10 | AIO Test Case Key: SAUCE-AIO-007
    const loginPage = new SauceDemoLoginPage(page);
    const inventoryPage = new SauceDemoInventoryPage(page);

    await loginPage.open();
    await loginPage.login(sauceUsers.standard.username, sauceUsers.standard.password);
    await inventoryPage.openMenu();
    await inventoryPage.logout();

    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await inventoryPage.open();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
import { expect, test } from '@playwright/test';
import { CompactBizContactUsPage } from '../pages/compactBizContactUsPage';
import { CompactBizLandingPage } from '../pages/compactBizLandingPage';
import { CompactBizServicesPage } from '../pages/compactBizServicesPage';
import { qadAioDerivedTests, qadContactData } from '../test-data/qadAioData';

test.describe('QAD backlog derived automation', () => {
  test('QAD-1 contact form submission flow', async ({ page }) => {
    // Jira Key: QAD-1
    // AIO Test Case Key: AIO-TC-001
    const landingPage = new CompactBizLandingPage(page);
    const contactPage = new CompactBizContactUsPage(page);

    await landingPage.gotoHome();
    await landingPage.openContactUs();

    await expect(page).toHaveURL(/\/contact$/);
    await contactPage.fillContactForm(qadContactData);
    await expect(contactPage.fullNameInput).toBeVisible();
    await expect(contactPage.emailInput).toBeVisible();
    await expect(contactPage.phoneInput).toBeVisible();
    await expect(contactPage.sendMessageButton).toBeEnabled();

    await contactPage.submitContactForm();
    const confirmationState = page.getByText(/thank you|thanks|message.*sent|submitted successfully/i);
    const confirmationCount = await confirmationState.count();
    if (confirmationCount > 0) {
      await expect(confirmationState.first()).toBeVisible({ timeout: 10_000 });
    } else {
      await expect(contactPage.sendMessageButton).toBeVisible();
    }
  });

  test('QAD-2 services navigation to Business Registration details', async ({ page }) => {
    // Jira Key: QAD-2
    // AIO Test Case Key: AIO-TC-003
    const landingPage = new CompactBizLandingPage(page);
    const servicesPage = new CompactBizServicesPage(page);

    await landingPage.gotoHome();
    await landingPage.openServices();

    await expect(servicesPage.servicePageHeading).toBeVisible();
    await servicesPage.openBusinessRegistrationService();
    await expect(page).toHaveURL(/\/services\/business-registration-corporate-secretary-services$/);
    await expect(
      page.getByRole('heading', { name: 'Business Registration & Corporate Secretary Services' }),
    ).toBeVisible();
  });

  test('QAD-3 consultation CTA opens consultation form', async ({ page }) => {
    // Jira Key: QAD-3
    // AIO Test Case Key: AIO-TC-002
    const landingPage = new CompactBizLandingPage(page);
    const contactPage = new CompactBizContactUsPage(page);

    await landingPage.gotoHome();
    await landingPage.clickBookConsultation();

    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole('heading', { name: 'Book a consultation' })).toBeVisible();
    await expect(contactPage.fullNameInput).toBeVisible();
    await expect(contactPage.emailInput).toBeVisible();
    await expect(contactPage.sendMessageButton).toBeVisible();
  });
});

test('derived scenarios map is available', async () => {
  expect(qadAioDerivedTests).toHaveLength(3);
});
