import React from 'react';
import { Icon } from './Icon';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
  icon?: 'home' | 'library' | 'school' | 'trophy' | 'pen' | 'collection' | 'archive';
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => (
  <nav className="flex items-center text-sm font-sans overflow-x-auto whitespace-nowrap no-scrollbar px-1" aria-label="Breadcrumb">
    {items.map((item, index) => (
      <React.Fragment key={index}>
        {index > 0 && (
          <span className="text-stone-300 dark:text-stone-700 mx-2.5 select-none" aria-hidden="true">/</span>
        )}
        
        {item.active ? (
          <span className="text-[#3E2723] dark:text-stone-200 font-medium py-1 px-2">
            {item.label}
          </span>
        ) : (
          <button
            onClick={item.onClick}
            className="text-[#8D6E63] dark:text-stone-400 hover:text-zen-green dark:hover:text-zen-green transition-colors duration-300 flex items-center gap-1.5 py-1 px-2 rounded-md cursor-pointer outline-none"
          >
            {item.icon && (
              <span className="w-3.5 h-3.5 opacity-60">
                <Icon name={item.icon as any} />
              </span>
            )}
            <span>{item.label}</span>
          </button>
        )}
      </React.Fragment>
    ))}
  </nav>
);