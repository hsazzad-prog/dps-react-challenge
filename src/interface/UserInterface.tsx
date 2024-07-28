
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    address:{city:string};
    birthDate: string;
    isHighlighted?: boolean;
}