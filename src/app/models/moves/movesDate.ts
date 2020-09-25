import { Category } from './category';
import { Move } from './move';

export interface MovesDate {
    moves: Array<Move>;
    categories: Array<Category>;
    _id: {
        date: string;
    }
}