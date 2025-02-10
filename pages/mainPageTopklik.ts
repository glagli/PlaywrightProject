import {Page, Locator} from "@playwright/test";

export class MainPageTopklik {
    page: Page;
    loginInput: Locator;
    passInput: Locator;
    loginButton: Locator;
    private baseUrl = "https://dev.topklik.online/";
    private _login = "tester@inzhenerka.tech";
    private _password = "LetsTest!";

    constructor(page) {
        this.page = page; // сохраняем локально
        this.loginInput = page.locator("[name=login]");
        this.passInput = page.locator("[name=pass]");
        this.loginButton = page.locator("[type=button]");
    }

    async auth() {
        await this.page.goto(this.baseUrl,{waitUntil:"load",timeout:60000});
        await this.loginInput.fill(this._login);
        await this.passInput.fill(this._password);
        await this.loginButton.click();
    }

    set password(value: string) {
        this._password = value;
    }
    set login(value: string) {
        this._login = value;
    }
}