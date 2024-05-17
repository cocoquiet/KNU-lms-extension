import * as vscode from 'vscode';
import { Course, CoursesProvider } from "./courses";
import { Assignment, AssignmentsProvider } from "./assignments";
import { getCourseList } from './commands/getCourseList';
import { getAssignmentList } from './commands/getAssignmentList';
import { displayAssignmentPage } from './commands/displayAssignmentPage';

export async function activate(context: vscode.ExtensionContext) {
	let config = vscode.workspace.getConfiguration('knu');
	let token: any = config.get<string>('token') || "";

	let courses: any = await getCourseList();

	const coursesProvider = new CoursesProvider(courses);
	vscode.window.createTreeView('course', {
		treeDataProvider: coursesProvider
	});

	const assignmentsProvider = new AssignmentsProvider([]);
	vscode.window.createTreeView('assignment', {	// Todo: detail -> assignment로 변경(package.json도 변경)
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

	vscode.commands.registerCommand('assignment.displayAssignmentPage', async (assignment: Assignment) => {
		displayAssignmentPage(assignment);
	});
}

export function deactivate() {}
