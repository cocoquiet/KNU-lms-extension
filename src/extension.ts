// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Course, CoursesProvider } from "./courses";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration('knu');
	const token = config.get<string>('token');

	if (token === "") {
		vscode.window.showWarningMessage("LMS 토큰을 설정해주세요.")
	}

	const response = await fetch("https://canvas.knu.ac.kr/api/v1/courses", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
		});

	let data: any = await response.json();
	vscode.window.showInformationMessage("LMS 연결 성공");
	
	let courses: Course[] = data.map((course: any) => {
		return new Course(course.name, course.id, course.calendar, vscode.TreeItemCollapsibleState.None);
	});

	vscode.window.createTreeView('course', {
		treeDataProvider: new CoursesProvider(courses)
	});

	const coursesProvider = new CoursesProvider(courses);
	vscode.window.registerTreeDataProvider('course', coursesProvider);
	vscode.commands.registerCommand('course.refreshEntry', () => {
		coursesProvider.refresh();
	});

	let checkapi = vscode.commands.registerCommand('knu.checkapi', async () => {
	});

	context.subscriptions.push(checkapi);
}

// This method is called when your extension is deactivated
export function deactivate() {}
