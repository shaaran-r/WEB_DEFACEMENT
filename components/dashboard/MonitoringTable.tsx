import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Website } from '@/types';

type MonitoringTableProps = {
  websites: Website[];
};

export function MonitoringTable({ websites }: MonitoringTableProps) {
  const getStatusBadge = (status: Website['status'], percentage: number) => {
    if (status === 'safe') {
      return <Badge className="bg-green-600 hover:bg-green-700">Safe</Badge>;
    } else if (status === 'warning') {
      return <Badge className="bg-yellow-600 hover:bg-yellow-700">Warning</Badge>;
    } else {
      return <Badge className="bg-red-600 hover:bg-red-700">Unsafe</Badge>;
    }
  };

  const getDefacementColor = (percentage: number) => {
    if (percentage < 30) return 'text-green-700 font-semibold';
    if (percentage < 60) return 'text-yellow-700 font-semibold';
    return 'text-red-700 font-semibold';
  };

  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="w-16">S.No</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>URL</TableHead>
            <TableHead className="text-center">Defacement %</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {websites.map((website, index) => (
            <TableRow key={website.id} className="hover:bg-slate-50">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-mono text-sm">{website.id}</TableCell>
              <TableCell className="font-medium">{website.name}</TableCell>
              <TableCell className="text-sm text-slate-600">{website.url}</TableCell>
              <TableCell className="text-center">
                <span className={getDefacementColor(website.defacementPercentage)}>
                  {website.defacementPercentage.toFixed(2)}%
                </span>
              </TableCell>
              <TableCell className="text-center">
                {getStatusBadge(website.status, website.defacementPercentage)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
