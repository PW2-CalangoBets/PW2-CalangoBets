import { test, expect } from '@playwright/test';
import { getUserInfoApi } from '../../api/userApi';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 1,
});
test.beforeEach(async ({ page }) => {

  await page.goto("http://localhost:5173/#/signUp");


  await page.fill('input[id="name"]', "UsuarioTeste");
  await page.fill('input[id="email"]', "teste@gmail.com");
  await page.fill('input[id="password"]', "123456");
  await page.fill('input[id="confirmPassword"]', "123456");

  await page.click('button[type="submit"]');

  await page.goto('http://localhost:5173/#/login'); 
  await page.fill('input[id="email"]', "teste@gmail.com");
  await page.fill('input[id="password"]', "123456");

  
 await page.click('button[type="submit"]');

  await expect(page.getByText('Sua sorte começa aqui!')).toBeVisible();
});

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
  await page.fill('input[type="number"]', '1000000');
  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('insuficiente');
    await dialog.dismiss();
  });

  await page.click('text=Realizar o saque');
  await expect(page.getByText('0 🪙')).toBeVisible();
});


test('Deve fazer um deposito e logo após tentar sacar parte desse deposito', async ({ page }) => {
  await page.goto('http://localhost:5173/#/deposit');
  

  
  await page.click('button:has-text("Depositar")');
  await expect(page.getByRole('heading', { name: 'Depósito' })).toBeVisible();
  

  await page.fill('input[type="number"]', '100');
  const saldoAntesText = await page.locator(".actual-Money-div").innerText();
  const saldoAntes = parseInt(saldoAntesText.replace(" 🪙", ""))
  await page.click('button:has-text("Realizar o depósito")');

  await expect(page.locator(".actual-Money-div")).toHaveText((saldoAntes + 100) + " 🪙");

  await page.click('button:has-text("Sacar")');
  await expect(page.getByRole('heading', { name: 'Saque' })).toBeVisible();
  await page.fill('input[type="number"]', '50');
  await page.click('button:has-text("Realizar o saque")');

  await expect(page.locator(".actual-Money-div")).toHaveText((saldoAntes + 50) + " 🪙");
});