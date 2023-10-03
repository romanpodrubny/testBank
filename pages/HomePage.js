import { Selector,t } from 'testcafe';
import XPathSelector from "./XPathSelector";

class HomePage{
    constructor(){
        this.basketNav = Selector("#dropdownBasket");
        this.basketCount = XPathSelector("/html/body/div/nav/div/div/ul/li[2]/span");
        this.basketWindow = XPathSelector("/html/body/div/nav/div/div/ul/li[2]/div[2]");
        this.clearBasketBtn = XPathSelector("/html/body/div/nav/div/div/ul/li[2]/div[2]/div[3]/a");
        this.nonPromitem = Selector("div").withAttribute('data-product','2').find('button');
        this.basketTitleItem = Selector(".basket-item-title");
        this.basketPriceItem = Selector(".basket-item-price");
        this.basketPrice = Selector(".basket_price");
        this.goToBasketBtn = Selector("a").withText('Перейти в корзину');
        this.basketHeader = Selector(".site-error")
        this.promItem = Selector("div.note-item.card.h-100.hasDiscount").nth(0).find('button')
        this.inputBookProm = Selector("div.note-item.card.h-100.hasDiscount").nth(0).find('input');
    }
    
    async clearBasket() {
        let count = await this.basketCount;
        let i = await count.innerText;
        if(i == 0){
            await t
            .expect(this.basketNav.visible).ok()
        } 
        else{
            await t
            .click(this.basketNav)
            .wait(3000)
            .expect(this.basketWindow.visible).ok()
            .click(this.clearBasketBtn)
            .expect(this.basketCount.textContent).contains('0')
        }
        
    }
    async goToEmptyBasket() {
        await t
        .click(this.basketNav)
        .expect(this.basketWindow.visible).ok()
        .click(this.goToBasketBtn)
        .expect(this.basketHeader.visible).ok()
    }

    async addOneNonPromotionalItem (){
        await t
        .click(this.nonPromitem)
        .expect(this.basketCount.textContent).contains('1')
    }

    async goToBasket(){
        await t
        .click(this.basketNav)
        .expect(this.basketTitleItem.visible).ok()
        .expect(this.basketPriceItem.visible).ok()
        .expect(this.basketPrice.visible).ok()
        .click(this.goToBasketBtn)
        .expect(this.basketHeader.visible).ok()
    }

    async addOnePromotionalItem (){
        await t
        .click(this.promItem)
        .expect(this.basketCount.textContent).contains('1')
    }

    async addEightDifferentItem (){
        for (let i = 1; i < 9; i++) { 
            i = String(i)
            await t.click(this.promItem = Selector("div").withAttribute('data-product',i).find('button'))
          }
        await t.expect(this.basketCount.textContent).contains('9')
    }
    async addNineSamePromotionalItem (){
        await t
        .click(this.inputBookProm)
        .pressKey('backspace')
        .typeText(this.inputBookProm,'9')
        .click(this.promItem)
        .expect(this.basketCount.textContent).contains('9')
    }
    
}

export default HomePage = new HomePage();