import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";


const URL = `https://enotes.pointschool.ru/login`;

fixture `Test Case`
    .page (URL)
    .beforeEach( async () => {
        await LoginPage.loginUser("test","test");    
    });
    
    test(`Go to empty basket`, async () => {
        await HomePage.clearBasket();
        await HomePage.goToEmptyBasket();
    });

    test(`Go to basket with 1 non-promotional item.`, async () => {
        await HomePage.clearBasket();
        await HomePage.addOneNonPromotionalItem();
        await HomePage.goToBasket();
    });

    test(`Go to basket with 1 promotional item.`, async () => {
        await HomePage.clearBasket();
        await HomePage.addOnePromotionalItem();
        await HomePage.goToBasket();
    });

    test(`Go to basket with 9 different item.`, async () => {
        await HomePage.clearBasket();
        await HomePage.addOnePromotionalItem();
        await HomePage.addEightDifferentItem();
        await HomePage.goToBasket();
    });

    test(`Go to basket with 9 same promotional item.`, async () => {
        await HomePage.clearBasket();
        await HomePage.addNineSamePromotionalItem();
        await HomePage.goToBasket();
    });