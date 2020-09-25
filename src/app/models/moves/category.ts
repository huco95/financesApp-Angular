import { SafeHtml } from '@angular/platform-browser';

export interface Category {
    color: string;
    description: string;
    icon: string;
    icon_svg: SafeHtml;
    name: string;
    type: string;
    _id: string;
}