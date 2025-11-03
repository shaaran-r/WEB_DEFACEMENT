import { Card, CardContent } from '@/components/ui/card';
import { Construction } from 'lucide-react';

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      <Card className="border-2 border-dashed">
        <CardContent className="p-12">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <Construction className="h-16 w-16 text-slate-400" />
            <div>
              <h3 className="text-lg font-semibold text-slate-700">Page Under Development</h3>
              <p className="text-sm text-slate-500">This feature will be implemented in the next phase</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
