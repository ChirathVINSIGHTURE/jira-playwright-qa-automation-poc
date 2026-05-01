import { Page } from '@playwright/test';

export class SauceDemoCheckoutPage {
  constructor(private readonly page: Page) {}

  async openCart(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/cart.html');
  }

  async checkoutFromCart(): Promise<void> {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }

  async fillYourInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
    await this.page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill(postalCode);
  }

  async continueCheckout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async finishCheckout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }

  get checkoutInfoTitle() {
    return this.page.getByText('Checkout: Your Information');
  }

  get checkoutOverviewTitle() {
    return this.page.getByText('Checkout: Overview');
  }

  get checkoutCompleteTitle() {
    return this.page.getByText('Checkout: Complete!');
  }

  get orderConfirmationHeading() {
    return this.page.getByRole('heading', { name: 'Thank you for your order!' });
  }

  get removeButton() {
    return this.page.getByRole('button', { name: 'Remove' }).first();
  }
}
