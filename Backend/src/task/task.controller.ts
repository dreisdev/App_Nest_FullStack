import { Controller, Get } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Controller()
export class TaskController {
    @Get('/submit-form')
    async submitForm() {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('https://demoqa.com/text-box', { timeout: 240000 });

            await page.type('#userName', 'Diego Reis');
            await page.type('#userEmail', 'dreis@email.com');
            await page.type('#currentAddress', 'Olá, este é um teste de mensagem 1.');
            await page.type('#permanentAddress', 'Olá, este é um teste de mensagem 2.');




            await browser.close();

            return { success: true, message: 'Formulário enviado com sucesso' }

        } catch (error) {
            console.error('Error ao preencher formulário:', error);
            return { success: false, message: 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.' };
        }
    }
}
