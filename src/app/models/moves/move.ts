import { Category } from '../category/category';

export class Move {
    amount: number;
    category: Category;
    description: string;
    type: "expense" | "income";
    _id: string;
    date: Date;
}