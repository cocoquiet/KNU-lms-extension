import * as vscode from 'vscode';
import { Course, CoursesProvider } from "./courses";
import { getCourseList } from './commands/getCourseList';

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

	vscode.commands.registerCommand('course.showDetail', (course: Course) => {
		vscode.window.showInformationMessage(course.label);
	});
}

export function deactivate() {}
