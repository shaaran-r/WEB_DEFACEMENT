import { MetricCards } from '@/components/dashboard/MetricCard';
import { MonitoringTable } from '@/components/dashboard/MonitoringTable';
import { Website } from '@/types';

type DashboardPageProps = {
  websites: Website[];
};

export function DashboardPage({ websites }: DashboardPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
        <p className="text-sm text-slate-600">Real-time monitoring of website defacement detection</p>
      </div>
      <MetricCards websites={websites} />
      <div>
        <h3 className="mb-3 text-lg font-semibold text-slate-900">Monitored Websites</h3>
        <MonitoringTable websites={websites} />
      </div>
    </div>
  );
}
