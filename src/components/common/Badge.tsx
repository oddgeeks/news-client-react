import React from 'react';
import clsx from 'clsx';

const fontSizes: {
  [key: string]: string;
} = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
};

const colors: {
  [key: string]: string;
} = {
  dark: 'text-slate-900',
  blue: 'text-blue-900',
  red: 'text-red-900',
  green: 'text-green-900'
};

const bgColors: {
  [key: string]: string;
} = {
  dark: 'bg-slate-200',
  blue: 'bg-blue-200',
  red: 'bg-red-200',
  green: 'bg-green-200'
};

interface Props {
  color?: 'dark' | 'blue' | 'red' | 'green', 
  bgColor?: 'dark' | 'blue' | 'red' | 'green', 
  size?: 'sm' | 'md' | 'lg',
  content: string,
  className?: string
};

export const Badge: React.FC<Props> = ({
  color='dark', 
  bgColor='dark', 
  size='sm',
  content,
  className
}) => {
  return (
    <div className={clsx('capitalize rounded py-1 px-2', colors[color], bgColors[bgColor], fontSizes[size], className)}>
        { content }
    </div>
  )
}
