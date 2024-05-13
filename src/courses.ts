import * as vscode from 'vscode';

export class CoursesProvider implements vscode.TreeDataProvider<Course> {
    private _onDidChangeTreeData: vscode.EventEmitter<Course | undefined | null | void>
        = new vscode.EventEmitter<Course | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<Course | undefined | null | void>
        = this._onDidChangeTreeData.event;

    constructor(private courses: Course[]) {}

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: Course): vscode.TreeItem {
        return element;
    }

    getChildren(element?: Course): Thenable<Course[]> {
        return Promise.resolve(this.courses);
    }
}

export class Course extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly id_: number,
        public readonly calendar: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
    }
}