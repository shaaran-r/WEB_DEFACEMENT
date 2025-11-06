import { X, AlertTriangle, AlertCircle } from 'lucide-react';
import { Alert } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type AlertPanelProps = {
  alerts: Alert[];
  onClearAlert: (id: string) => void;
};

export function AlertPanel({ alerts, onClearAlert }: AlertPanelProps) {
  return (
    <div className="w-80 border-l bg-white">
      <div className="border-b bg-slate-50 px-4 py-3">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <AlertCircle className="h-4 w-4" />
          Alerts & Notifications
          {alerts.length > 0 && (
            <Badge variant="destructive" className="ml-auto">
              {alerts.length}
            </Badge>
          )}
        </h2>
      </div>
      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="space-y-2 p-4">
          {alerts.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500">
              No alerts at this time
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-lg border p-3 ${
                  alert.severity === 'critical'
                    ? 'border-red-200 bg-red-50'
                    : 'border-yellow-200 bg-yellow-50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <AlertTriangle
                    className={`h-4 w-4 flex-shrink-0 ${
                      alert.severity === 'critical' ? 'text-red-600' : 'text-yellow-600'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-900">{alert.websiteName}</p>
                    <p className="text-xs text-slate-600">{alert.message}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {alert.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onClearAlert(alert.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
