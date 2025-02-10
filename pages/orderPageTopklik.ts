import {Page, Locator} from "@playwright/test";

export class OrderPageTopklik {
    page: Page;
    toggle: Locator;
    countertopImg: Locator;
    countertopTypeUButton: Locator;
    countertopTypeUImg: Locator;
    thicknessButtonOpen: Locator;
    thicknessButtonSelect: Locator;
    baseboard: Locator;
    island: Locator;
    waterFlow: Locator;
    calcButton: Locator;
    calculationButton: Locator;
    color: Locator;

    constructor(page) {
        this.page = page; // сохраняем локально
        this.toggle = page.locator("[data-testid=hide-countertop]");
        this.countertopImg = page.locator("[src=\"/static/media/countertop-q.41258f0aa91cd0c9fa4e.png\"]");
        this.countertopTypeUButton = page.getByTestId("countertop-type-u");
        this.countertopTypeUImg = page.locator("[src=\"/static/media/countertop-p.095c44faedc9795e1fcf.png\"]");
        this.thicknessButtonOpen = page.locator("[data-testid=\"select-thickness\"] > button").first();
        this.thicknessButtonSelect = page.locator("[data-testid=\"select-thickness\"] > div > button");
        this.baseboard = page.locator("[data-testid=\"product-options-menu-countertop\"] > [data-testid=\"top-button\"]").nth(1);
        this.island = page.locator("[data-testid=\"product-menu\"] > [data-testid=\"product-item\"]").first();
        this.waterFlow = page.locator("[data-testid=\"options-menu\"] > [data-testid=\"options-item\"]").nth(2);
        this.calcButton = page.getByTestId("calc-button");
        this.calculationButton = page.getByTestId("open-report-button");
        this.color = page.getByTestId("stone-block");
    }

    async toggleEnabled() {
        await this.toggle.click();
    }

    async countertopTypeUClick() {
        await this.countertopTypeUButton.click();
    }

    async thicknessChange() {
        await this.thicknessButtonOpen.click();
        await this.thicknessButtonSelect.click();
    }

    async baseboardClicked() {
        await this.baseboard.click();
    }

    async islandAdded() {
        await this.island.click();
    }

    async waterFlowAdded() {
        await this.waterFlow.click();
    }

    async calcClick() {
        await this.calcButton.click();
        await this.calculationButton.click();
        return this.page
    }

    async selectColor(color) {
        await this.color.getByText(color).click();
    }

}