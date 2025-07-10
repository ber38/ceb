
import React from 'react';

export const CheckCircleIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const XCircleIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const EyeIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639l4.43-7.512a1.011 1.011 0 0 1 1.745 0l1.492 2.525c.094.159.223.298.374.417l2.12 1.666a1.012 1.012 0 0 1 0 1.59l-2.12 1.666c-.15.119-.28.258-.374.417l-1.492 2.525a1.011 1.011 0 0 1-1.745 0l-4.43-7.512Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12c0 .252.023.5.066.745l-1.07 1.07a2.25 2.25 0 0 0-3.394 0l-1.07-1.07a2.25 2.25 0 0 0-.066-.745c0-.252-.023-.5-.066-.745l1.07-1.07a2.25 2.25 0 0 0 3.394 0l1.07 1.07c.043.245.066.493.066.745Z" />
  </svg>
);

export const LockClosedIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);

export const LockOpenIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);

export const XMarkIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

export const SunIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
        <path fillRule="evenodd" d="M12 2.25c.497 0 .974.095 1.423.278a.75.75 0 0 1 .582 1.109 9.753 9.753 0 0 0-2.012 13.68.75.75 0 0 1-1.11.583A10.5 10.5 0 0 1 12 2.25Z" clipRule="evenodd" />
        <path d="M12.75 6a.75.75 0 0 0-1.5 0v.042a.75.75 0 0 0 1.5 0V6Z" />
        <path fillRule="evenodd" d="M9.834 4.015A.75.75 0 0 1 9.02 4.909l-.491.85a.75.75 0 0 1-1.3-.75l.491-.85a.75.75 0 0 1 1.114-.145Z" clipRule="evenodd" />
        <path d="M15.541 7.625a.75.75 0 0 0-1.061-1.06l-.707.706a.75.75 0 0 0 1.06 1.061l.708-.707Z" />
        <path fillRule="evenodd" d="M4.909 9.02a.75.75 0 0 1 .895-.815l.85.49a.75.75 0 0 1-.75 1.3l-.85-.49a.75.75 0 0 1-.145-1.114Z" clipRule="evenodd" />
        <path d="M18 12.75a.75.75 0 0 0 0-1.5h-.042a.75.75 0 0 0 0 1.5H18Z" />
        <path fillRule="evenodd" d="M18.985 14.166a.75.75 0 0 1-.145 1.114l-.85.49a.75.75 0 0 1-.75-1.3l.85-.49a.75.75 0 0 1 .895.815Z" clipRule="evenodd" />
        <path d="M15.541 16.375a.75.75 0 0 0-1.06-1.061l-.708.707a.75.75 0 0 0 1.061 1.06l.707-.708Z" />
        <path fillRule="evenodd" d="M14.166 18.985a.75.75 0 0 1-1.114.145l-.49-.85a.75.75 0 1 1 1.3-.75l.49.85a.75.75 0 0 1-.186.955Z" clipRule="evenodd" />
    </svg>
);
