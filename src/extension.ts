import * as vscode from 'vscode';
import { Course, CoursesProvider } from "./courses";
import { getCourseList } from './commands/getCourseList';
import { Assignment, AssignmentsProvider } from "./assignments";
import { getAssignmentList } from './commands/getAssignmentList';

export async function activate(context: vscode.ExtensionContext) {
	let config = vscode.workspace.getConfiguration('knu');
	let token: any = config.get<string>('token') || "";

	let courses: any = await getCourseList();

	const coursesProvider = new CoursesProvider(courses);
	vscode.window.createTreeView('course', {
		treeDataProvider: coursesProvider
	});

	const assignmentsProvider = new AssignmentsProvider([]);
	vscode.window.createTreeView('detail', {	// Todo: detail -> assignment로 변경(package.json도 변경)
		treeDataProvider: assignmentsProvider
	});

	vscode.commands.registerCommand('course.refreshEntry', async () => {
		courses = await getCourseList();
		coursesProvider.refresh(courses);
	});

	vscode.commands.registerCommand('course.listAssignment', async (course: Course) => {
		const assignments = await getAssignmentList(course.id_);
		assignmentsProvider.refresh(assignments);
	});
}

export function deactivate() {}
