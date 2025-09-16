import * as React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'user-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        info?: string;
        type?: string;
      };
    }
  }
}