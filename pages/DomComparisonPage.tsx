import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Website } from '@/types';

type DomComparisonPageProps = {
  websites: Website[];
};

export function DomComparisonPage({ websites }: DomComparisonPageProps) {
  const getScoreBadge = (score: number) => {
    if (score < 30) {
      return <Badge className="bg-green-600 hover:bg-green-700">{score.toFixed(1)}</Badge>;
    } else if (score < 70) {
      return <Badge className="bg-yellow-600 hover:bg-yellow-700">{score.toFixed(1)}</Badge>;
    } else {
      return <Badge className="bg-red-600 hover:bg-red-700">{score.toFixed(1)}</Badge>;
    }
  };

  const getChangeIndicator = (added: number, removed: number, modified: number) => {
    const total = added + removed + modified;
    if (total === 0) return <span className="text-green-600">No Changes</span>;
    if (total < 10) return <span className="text-yellow-600">Minor Changes</span>;
    return <span className="text-red-600">Major Changes</span>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">DOM Tree Node Comparison</h2>
        <p className="text-sm text-slate-600">Analyzing structural changes in Document Object Model hierarchy</p>
      </div>
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-16">S.No</TableHead>
              <TableHead>Website ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="text-center">Past Nodes</TableHead>
              <TableHead className="text-center">Current Nodes</TableHead>
              <TableHead className="text-center">Added</TableHead>
              <TableHead className="text-center">Removed</TableHead>
              <TableHead className="text-center">Modified</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">DOM Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {websites.map((website, index) => (
              <TableRow key={website.id} className="hover:bg-slate-50">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-mono text-sm">{website.id}</TableCell>
                <TableCell className="font-medium">{website.name}</TableCell>
                <TableCell className="text-sm text-slate-600">{website.url}</TableCell>
                <TableCell className="text-center font-mono text-sm">{website.pastDomNodeCount}</TableCell>
                <TableCell className={`text-center font-mono text-sm ${
                  website.currentDomNodeCount !== website.pastDomNodeCount ? 'text-blue-600 font-semibold' : ''
                }`}>
                  {website.currentDomNodeCount}
                </TableCell>
                <TableCell className="text-center">
                  {website.domNodesAdded > 0 ? (
                    <Badge variant="outline" className="border-green-600 text-green-600">
                      +{website.domNodesAdded}
                    </Badge>
                  ) : (
                    <span className="text-slate-400">0</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {website.domNodesRemoved > 0 ? (
                    <Badge variant="outline" className="border-red-600 text-red-600">
                      -{website.domNodesRemoved}
                    </Badge>
                  ) : (
                    <span className="text-slate-400">0</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {website.domNodesModified > 0 ? (
                    <Badge variant="outline" className="border-orange-600 text-orange-600">
                      ~{website.domNodesModified}
                    </Badge>
                  ) : (
                    <span className="text-slate-400">0</span>
                  )}
                </TableCell>
                <TableCell className="text-center text-sm font-medium">
                  {getChangeIndicator(website.domNodesAdded, website.domNodesRemoved, website.domNodesModified)}
                </TableCell>
                <TableCell className="text-center">{getScoreBadge(website.domScore)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
