import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import utils,{ locale as $l } from './lib/utils';
import ocr from './lib/ocr';

export function activate(context: vscode.ExtensionContext) {
	
	console.info('Congratulations, your extension "image-to-text" is now active!');
	let disposable = vscode.commands.registerCommand('img-to-text.show', async () => {	
		const close = utils.showProgress($l['loading']);
		try {
			let config: any = utils.getConfig();
			const {client_id, client_secret, show_result} = config;	
			let savePath = utils.getTmpFolder();
			savePath = path.join(savePath, `img_${+new Date()}.png`);
			const imageList = await utils.getPasteImage(savePath);	
			if (imageList[0] === 'no image') {
				throw($l['no_image']);
			}
			let url: string = '';
			if(client_id && client_secret) {
				url = await ocr.getUrlByConfig(client_id, client_secret);
			} else {
				const defaultOp = await ocr.getDefaultUrl();
				url = defaultOp.api;
			}
			const bitmap = fs.readFileSync(imageList[0]);
			const base64str = Buffer.from(bitmap).toString('base64');
			const content = await ocr.postImgToOCR(url, base64str);
			const words = ([''].concat(content.words_result.map((word: any) => word.words))).join(os.EOL);
			vscode.env.clipboard.writeText(words);
			if (show_result) {
				const panel: any = vscode.window.createWebviewPanel(
					'imagetotext', 
					'ImageToText', 
					vscode.ViewColumn.One
				);
				panel.webview.html = utils.getWebviewContent(base64str, words);
			}
		} catch (error) {
			console.log('error:', error);
			vscode.window.showErrorMessage(error);
		}
		close();
	});

	context.subscriptions.push(disposable);

	let configCommand = vscode.commands.registerCommand('img-to-text.config', () => {
        vscode.commands.executeCommand('workbench.action.openSettings', 'img-to-text' );
    });

    context.subscriptions.push(configCommand);
}

export function deactivate() {}

