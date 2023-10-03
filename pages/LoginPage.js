import { Selector,t } from 'testcafe';

class LoginPage{
    constructor(){
        this.userLoginInput = Selector("#loginform-username", { timeout: 5000 });
        this.passwordInput = Selector("#loginform-password", { timeout: 5000 });
        this.buttonLogin = Selector("button", { timeout: 5000 }).withText('Вход');
    }
    
    async loginUser( userLogin="test",password="test") {
        await t
        .typeText(this.userLoginInput, userLogin)
        .typeText(this.passwordInput, password)
        .click(this.buttonLogin)

    }
}

export default LoginPage = new LoginPage();