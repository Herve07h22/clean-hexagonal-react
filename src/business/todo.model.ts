
export interface User {
    id: number;
    name: string;
    wantsToBeNotified: boolean;
}

export enum TodoState {
    pending = 1,
    done = 2,
}

export interface Todo {
    label: string;  // unique and required
    createdAt: Date;
    owner: User;
    dueDate?: Date;
    assignedTo?: User;
    state: TodoState;
}

