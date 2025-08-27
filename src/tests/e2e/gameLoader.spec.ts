import { test, expect } from "@playwright/test";

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

test.describe("GameLoader - Caça Níquel", () => {
  test("deve ganhar um jogo e realmente verificar se ficou salvo na tela de saque/deposito", async ({ page }) => {
    await page.goto('http://localhost:5173/#/deposit'); 
    await page.click('text=Depositar');
    await expect(page.getByRole('heading', { name: 'Depósito' })).toBeVisible();
    await page.fill('input[type="number"]', '100');
    const saldoAntesText = await page.locator(".actual-Money-div").innerText();
    const saldoAntes = parseInt(saldoAntesText.replace(" 🪙", ""));

    await page.click('text=Realizar o depósito');
    await expect(page.getByText(saldoAntes+100+' 🪙')).toBeVisible();
    const saldoDepois = saldoAntes+100;



    await page.goto("http://localhost:5173/#/jogos/caca-niquel");

    const canvas = page.locator("canvas#canvas");
    await expect(canvas).toBeVisible();

    const output = page.locator("textarea#output");
    await expect(output).toBeVisible();


    await page.evaluate(() => {
      window.addEventListener("GameEvent", (event: any) => {
        const { type, amount } = event.detail;
        const el = document.getElementById("output") as HTMLTextAreaElement;
        el.value += `${type}: ${amount}\n`;
      });
    });

    await page.waitForTimeout(3000);
    await page.evaluate(() => {
      const event = new CustomEvent("GameEvent", {
        detail: { type: "WIN", amount: 200 },
      });
      window.dispatchEvent(event);
    });

    await page.goto('http://localhost:5173/#/deposit'); 
    await expect(page.getByText(saldoDepois+200+' 🪙')).toBeVisible();
  });
  
  test("deve perde um jogo e realmente verificar se ficou salvo na tela de saque/deposito", async ({ page }) => {
    await page.goto('http://localhost:5173/#/deposit'); 
    await page.click('text=Depositar');
    await expect(page.getByRole('heading', { name: 'Depósito' })).toBeVisible();
    await page.fill('input[type="number"]', '200');
    const saldoAntesText = await page.locator(".actual-Money-div").innerText();
    const saldoAntes = parseInt(saldoAntesText.replace(" 🪙", ""));

    await page.click('text=Realizar o depósito');
    await expect(page.getByText(saldoAntes+200+' 🪙')).toBeVisible();
    const saldoDepois = saldoAntes+200;



    await page.goto("http://localhost:5173/#/jogos/caca-niquel");

    const canvas = page.locator("canvas#canvas");
    await expect(canvas).toBeVisible();

    const output = page.locator("textarea#output");
    await expect(output).toBeVisible();

    await page.evaluate(() => {
      window.addEventListener("GameEvent", (event: any) => {
        const { type, amount } = event.detail;
        const el = document.getElementById("output") as HTMLTextAreaElement;
        el.value += `${type}: ${amount}\n`;
      });
    });

    await page.waitForTimeout(3000);
    await page.evaluate(() => {
      const event = new CustomEvent("GameEvent", {
        detail: { type: "LOSE", amount: 200 },
      });
      window.dispatchEvent(event);
    });

    await page.goto('http://localhost:5173/#/deposit'); 
    await expect(page.getByText(saldoDepois-200+' 🪙')).toBeVisible();
  });
});
