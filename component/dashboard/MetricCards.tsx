import { Card, CardContent } from '@/components/ui/card';
import { Globe, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Website } from '@/types';

type MetricCardsProps = {
  websites: Website[];
};

export function MetricCards({ websites }: MetricCardsProps) {
  const totalWebsites = websites.length;
  const safeWebsites = websites.filter((w) => w.status === 'safe').length;
  const unsafeWebsites = websites.filter((w) => w.status === 'unsafe').length;

  const metrics = [
    {
      label: 'Total Websites',
      value: totalWebsites,
      icon: Globe,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900',
    },
    {
      label: 'Safe Websites',
      value: safeWebsites,
      icon: ShieldCheck,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      textColor: 'text-green-900',
    },
    {
      label: 'Unsafe Websites',
      value: unsafeWebsites,
      icon: ShieldAlert,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      textColor: 'text-red-900',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.label} className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{metric.label}</p>
                  <p className={`mt-2 text-3xl font-bold ${metric.textColor}`}>{metric.value}</p>
                </div>
                <div className={`flex h-14 w-14 items-center justify-center rounded-full ${metric.bgColor}`}>
                  <Icon className={`h-7 w-7 ${metric.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
