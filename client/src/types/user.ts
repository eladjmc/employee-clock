export enum Role {
    EMPLOYEE = 'EMPLOYEE',
    MANAGER = 'MANAGER',
  }
  
  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    managerId?: string | null;
  }
  