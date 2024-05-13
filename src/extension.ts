import * as vscode from 'vscode';
import { getCourseList } from './commands/getCourseList';
import { Course, CoursesProvider } from "./courses";

export async function activate(context: vscode.ExtensionContext) {
	let config = vscode.workspace.getConfiguration('knu');
	let token: any = config.get<string>('token') || "";

	let courses: any = await getCourseList();

	const coursesProvider = new CoursesProvider(courses);
	vscode.window.createTreeView('course', {
		treeDataProvider: coursesProvider
	});

	vscode.window.registerTreeDataProvider('course', coursesProvider);
	vscode.commands.registerCommand('course.refreshEntry', async () => {
		courses = await getCourseList();
		coursesProvider.refresh(courses);
	});

	let checkapi = vscode.commands.registerCommand('knu.checkapi', async () => {
	});

	context.subscriptions.push(checkapi);
}

export function deactivate() {}
