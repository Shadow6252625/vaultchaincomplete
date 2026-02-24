import type { HTMLAttributes, DetailedHTMLProps } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'iconify-icon': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
                icon?: string;
                width?: string | number;
                height?: string | number;
                class?: string;
            };
        }
    }
    interface Window {
        UnicornStudio: any;
    }
}
