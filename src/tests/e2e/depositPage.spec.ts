import { test, expect } from '@playwright/test';

test('Deve abrir o modal de Depósito e fazer um depósito', async ({ page }) => {
  await page.goto('http://localhost:5173/#/deposit'); 
  await page.click('text=Depositar');
  await expect(page.getByRole('heading', { name: 'Depósito' })).toBeVisible();
  await page.fill('input[type="number"]', '50');
  await page.click('text=Realizar o depósito');
  await expect(page.getByText('50 🪙')).toBeVisible();

});

test('Deve abrir o modal de Saque e tentar sacar valor inválido', async ({ page }) => {
  await page.goto('http://localhost:5173/#/deposit');

  await page.click('text=Sacar');

  await expect(page.getByRole('heading', { name: 'Saque' })).toBeVisible();
  await page.fill('input[type="number"]', '1000');
  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('insuficiente');
    await dialog.dismiss();
  });

  await page.click('text=Realizar o saque');
  await expect(page.getByText('0 🪙')).toBeVisible();
});


test('Deve fazer um deposito e logo após tentar sacar parte desse deposito', async ({ page }) => {
  await page.goto('http://localhost:5173/#/deposit'); 
  await page.click('text=Depositar');
  await expect(page.getByRole('heading', { name: 'Depósito' })).toBeVisible();
  await page.fill('input[type="number"]', '100');
  await page.click('text=Realizar o depósito');
  await expect(page.getByText('100 🪙')).toBeVisible();

   await page.goto('http://localhost:5173/#/deposit');

  await page.click('text=Sacar');

  await expect(page.getByRole('heading', { name: 'Saque' })).toBeVisible();
  await page.fill('input[type="number"]', '50');

  await page.click('text=Realizar o saque');

  await expect(page.getByText('50 🪙')).toBeVisible();



});