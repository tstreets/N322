export interface TodoList {
    id: string;
    title: string;
    items: TodoListItem[];
}

export interface TodoListItem {
    title: string;
    checked: boolean;
}