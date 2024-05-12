// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration('knu');
	const token = config.get<string>('token');

	if (token === "") {
		vscode.window.showWarningMessage("LMS 토큰을 설정해주세요.")
	}

	let checkapi = vscode.commands.registerCommand('knu.checkapi', async () => {
		const response = await fetch("https://canvas.knu.ac.kr/api/v1/courses", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
			});

		if (response.ok) {
			let data = await response.json();
			vscode.window.showInformationMessage(JSON.stringify(data));
		}
		else {
			vscode.window.showErrorMessage("Error: " + response.status);
		}
	});

	context.subscriptions.push(checkapi);
}

// This method is called when your extension is deactivated
export function deactivate() {}
