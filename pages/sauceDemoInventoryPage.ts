import { Page } from '@playwright/test';

export class SauceDemoInventoryPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async sortPriceLowToHigh(): Promise<void> {
    await this.page.getByRole('combobox').selectOption('lohi');
  }

  async addBackpackToCart(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add to cart' }).first().click();
  }

  async removeBackpackFromCart(): Promise<void> {
    await this.page.getByRole('button', { name: 'Remove' }).first().click();
  }

  async openCart(): Promise<void> {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async openMenu(): Promise<void> {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
  }

  async logout(): Promise<void> {
    await this.page.locator('[data-test="logout-sidebar-link"]').click();
  }

  get productsTitle() {
    return this.page.getByText('Products');
  }

  get itemPrices() {
    return this.page.locator('[data-test="inventory-item-price"]');
  }

  get cartBadge() {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }
}
