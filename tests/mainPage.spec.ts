import {test, expect} from "@playwright/test";
import {MainPageTopklik} from "../pages/mainPageTopklik";
import {OrderPageTopklik} from "../pages/orderPageTopklik";

test.describe('Тесты на авторизацию', () => {
    test('Успешная авторизация', async ({page}) => {
        const mainPage = new MainPageTopklik(page);
        await mainPage.auth();
        await expect(page.getByText("Tester")).toBeVisible();
        await expect(page.getByText("Выйти")).toBeVisible();
    });

    test('Не успешная попытка авторизации', async ({page}) => {
        const mainPage = new MainPageTopklik(page);
        mainPage.login = "test";
        mainPage.password = "test";
        await mainPage.auth();
        await expect(page.getByText("Войти")).toBeVisible();
        await expect(page.getByText("Войдите в личный кабинет, чтобы начать расчет.")).toBeVisible();
    });
});

test.describe('Тесты на отображение столешницы', () => {
    test.beforeEach('Логин', async ({page}) => {
        const mainPage = new MainPageTopklik(page);
        await mainPage.auth();
        await expect(page.getByText("Tester")).toBeVisible();
        await expect(page.getByText("Выйти")).toBeVisible();
    });

    test('Проверить, что работает переключатель "Скрыть столешницу"', async ({page}) => {
        const orderPage = new OrderPageTopklik(page);
        await expect(orderPage.countertopImg).toBeVisible();
        await orderPage.toggleEnabled();
        await expect(orderPage.countertopImg).not.toBeVisible();
    });

    test('Переключение на П-образную столешницу', async ({page}) => {
        const orderPage = new OrderPageTopklik(page);
        await orderPage.countertopTypeUClick();
        await expect(orderPage.countertopTypeUImg).toBeVisible();
    });

    test('e2e-сценарий', async ({page, context}) => {
        const pagePromise = context.waitForEvent('page');

        const orderPage = new OrderPageTopklik(page);
        await orderPage.countertopTypeUClick();
        await orderPage.thicknessChange();
        await orderPage.baseboardClicked();
        await orderPage.islandAdded();
        await orderPage.waterFlowAdded();
        await orderPage.selectColor("N-103 Gray Onix");
        await orderPage.calcClick();
        const newPage = await pagePromise;

        // проверить, что открылась страница с результатами расчета
        await expect(newPage).toHaveTitle("Результаты расчета");
        await expect(newPage).toHaveURL((new RegExp("^https:\\/\\/report.topklik.online\\/calculation-?")));

        // Материал: acryl: Neomarm:N-103 Gray Onix
        const material = await newPage.locator('.table').first().locator('tr').nth(1).locator('td').nth(2).textContent();
        await expect(material).toEqual("acryl:Neomarm:N-103 Gray Onix");

        //Тип столешницы: П-образная
        const typeTableTop = await newPage.locator('.table').nth(1).locator('tr').nth(1).locator('td').nth(2).textContent();
        await expect(typeTableTop).toEqual("П-образная");

        //Опции: Проточки для стока воды
        const waterFlow = await newPage.locator('.table').nth(1).locator('tr').nth(4).locator('td').nth(2).textContent();
        await expect(waterFlow).toEqual("Проточки для стока воды");

        //Итоговая стоимость: 451500.00 ₽
        const sum = await newPage.locator('.table').nth(9).locator('tr').nth(5).locator('td').nth(4).textContent();
        await expect(sum).toEqual("490200.00 ₽");
    });
});