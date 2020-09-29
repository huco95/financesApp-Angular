import { SafeHtml } from '@angular/platform-browser';

export interface Category {
    name: string;
    type: "expense" | "income";
    color: string;
    icon_svg: SafeHtml;
    _id: string;
}