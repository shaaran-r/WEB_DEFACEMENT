import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Website } from '@/types';

type ScreenshotComparisonPageProps = {
  websites: Website[];
};

export function ScreenshotComparisonPage({ websites }: ScreenshotComparisonPageProps) {
  const getScoreBadge = (score: number) => {
    if (score < 30) {
      return <Badge className="bg-green-600 hover:bg-green-700">{score.toFixed(1)}</Badge>;
    } else if (score < 70) {
      return <Badge className="bg-yellow-600 hover:bg-yellow-700">{score.toFixed(1)}</Badge>;
    } else {
      return <Badge className="bg-red-600 hover:bg-red-700">{score.toFixed(1)}</Badge>;
    }
  };

  const getDifferenceIndicator = (pixelDiff: number) => {
    if (pixelDiff < 5) {
      return (
        <div className="flex flex-col items-center">
          <Badge variant="outline" className="border-green-600 text-green-600">
            {pixelDiff.toFixed(2)}%
          </Badge>
          <span className="mt-1 text-xs text-green-600">Minimal</span>
        </div>
      );
    } else if (pixelDiff < 20) {
      return (
        <div className="flex flex-col items-center">
          <Badge variant="outline" className="border-yellow-600 text-yellow-600">
            {pixelDiff.toFixed(2)}%
          </Badge>
          <span className="mt-1 text-xs text-yellow-600">Moderate</span>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center">
          <Badge variant="outline" className="border-red-600 text-red-600">
            {pixelDiff.toFixed(2)}%
          </Badge>
          <span className="mt-1 text-xs text-red-600">Significant</span>
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Screenshot Comparison Analysis</h2>
        <p className="text-sm text-slate-600">Visual comparison of website snapshots for defacement detection</p>
      </div>
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-16">S.No</TableHead>
              <TableHead>Website ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Past Screenshot Time</TableHead>
              <TableHead>Current Screenshot Time</TableHead>
              <TableHead className="text-center">Pixel Difference</TableHead>
              <TableHead className="text-center">Screenshot Score</TableHead>
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
                  {website.pastScreenshotTimestamp}
                </TableCell>
                <TableCell className="font-mono text-xs text-blue-600 font-semibold">
                  {website.currentScreenshotTimestamp}
                </TableCell>
                <TableCell className="text-center">
                  {getDifferenceIndicator(website.screenshotPixelDifference)}
                </TableCell>
                <TableCell className="text-center">{getScoreBadge(website.screenshotScore)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
