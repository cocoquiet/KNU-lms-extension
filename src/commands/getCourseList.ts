import * as vscode from "vscode";
import { Course } from "../courses";

export async function getCourseList(): Promise<Course[]> {
    let config = vscode.workspace.getConfiguration('knu');
    let token: any = config.get<string>('token') || "";

    if (token === "") {
        vscode.window.showWarningMessage("LMS 토큰을 설정해주세요.");
        return Promise.resolve([]); // Ensure a Promise is returned even in this conditional block
    }

    try {
        const response = await fetch("https://canvas.knu.ac.kr/api/v1/courses", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`LMS 연결 실패: ${response.status}`);
        }
        
        let data: any = await response.json();
        
        return data.map((course: any) => new Course(course.name || "empty", course.id || 0, course.calendar, vscode.TreeItemCollapsibleState.None));
    } catch (error: any) {
        vscode.window.showErrorMessage("LMS 연결 실패: " + error.message);
        return [];
    }
}
