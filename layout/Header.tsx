import { Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="border-b bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Web Defacement Detection System</h1>
            <p className="text-xs text-slate-300">Real-time Security Monitoring</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-slate-700">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
