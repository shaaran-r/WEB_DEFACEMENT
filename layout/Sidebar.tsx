import { LayoutDashboard, Hash, GitCompare, MessageSquareText, Image } from 'lucide-react';
import { PageType } from '@/types';
import { cn } from '@/lib/utils';

type SidebarProps = {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
};

const menuItems = [
  { id: 'dashboard' as PageType, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'hash' as PageType, label: 'Hash Analysis', icon: Hash },
  { id: 'dom' as PageType, label: 'DOM Comparison', icon: GitCompare },
  { id: 'nlp' as PageType, label: 'NLP Analyzer', icon: MessageSquareText },
  { id: 'screenshot' as PageType, label: 'Screenshot Compare', icon: Image },
];

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <aside className="w-64 border-r bg-slate-50">
      <nav className="space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-200'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
