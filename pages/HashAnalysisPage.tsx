import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Website } from '@/types';

type HashAnalysisPageProps = {
  websites: Website[];
};

export function HashAnalysisPage({ websites }: HashAnalysisPageProps) {
  const getScoreBadge = (score: number) => {
    if (score < 30) {
      return <Badge className="bg-green-600 hover:bg-green-700">{score.toFixed(1)}</Badge>;
    } else if (score < 70) {
      return <Badge className="bg-yellow-600 hover:bg-yellow-700">{score.toFixed(1)}</Badge>;
    } else {
      return <Badge className="bg-red-600 hover:bg-red-700">{score.toFixed(1)}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Hash-Based Comparison Analysis</h2>
        <p className="text-sm text-slate-600">Monitoring file integrity through cryptographic hash comparison</p>
      </div>
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-16">S.No</TableHead>
              <TableHead>Website ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Past Saved Hash</TableHead>
              <TableHead>Current Hash</TableHead>
              <TableHead className="text-center">Hash Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {websites.map((website, index) => (
              <TableRow key={website.id} className="hover:bg-slate-50">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-mono text-sm">{website.id}</TableCell>
                <TableCell className="font-medium">{website.name}</TableCell>
                <TableCell className="text-sm text-slate-600">{website.url}</TableCell>
                <TableCell className="font-mono text-xs text-slate-500">
                  {website.pastHash.substring(0, 16)}...
                </TableCell>
                <TableCell className={`font-mono text-xs ${
                  website.pastHash !== website.currentHash ? 'text-red-600 font-semibold' : 'text-slate-500'
                }`}>
                  {website.currentHash.substring(0, 16)}...
                </TableCell>
                <TableCell className="text-center">{getScoreBadge(website.hashScore)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
