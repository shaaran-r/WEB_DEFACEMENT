import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Website } from '@/types';

type NlpAnalyzerPageProps = {
  websites: Website[];
};

export function NlpAnalyzerPage({ websites }: NlpAnalyzerPageProps) {
  const getScoreBadge = (score: number) => {
    if (score < 30) {
      return <Badge className="bg-green-600 hover:bg-green-700">{score.toFixed(1)}</Badge>;
    } else if (score < 70) {
      return <Badge className="bg-yellow-600 hover:bg-yellow-700">{score.toFixed(1)}</Badge>;
    } else {
      return <Badge className="bg-red-600 hover:bg-red-700">{score.toFixed(1)}</Badge>;
    }
  };

  const getRiskLevel = (score: number) => {
    if (score < 30) return <span className="text-green-600 font-medium">Low Risk</span>;
    if (score < 70) return <span className="text-yellow-600 font-medium">Medium Risk</span>;
    return <span className="text-red-600 font-medium">High Risk</span>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">NLP-Based Content Analyzer</h2>
        <p className="text-sm text-slate-600">Detecting malicious and abusive content using natural language processing</p>
      </div>
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-16">S.No</TableHead>
              <TableHead>Website ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Detected Keywords</TableHead>
              <TableHead className="text-center">Flagged Items</TableHead>
              <TableHead>Content Summary</TableHead>
              <TableHead className="text-center">Risk Level</TableHead>
              <TableHead className="text-center">NLP Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {websites.map((website, index) => (
              <TableRow key={website.id} className="hover:bg-slate-50">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-mono text-sm">{website.id}</TableCell>
                <TableCell className="font-medium">{website.name}</TableCell>
                <TableCell className="text-sm text-slate-600">{website.url}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {website.nlpDetectedKeywords.length > 0 ? (
                      website.nlpDetectedKeywords.map((keyword, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="border-red-500 text-red-600 text-xs"
                        >
                          {keyword}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400">None detected</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {website.nlpFlaggedContentCount > 0 ? (
                    <Badge variant="outline" className="border-orange-600 text-orange-600">
                      {website.nlpFlaggedContentCount}
                    </Badge>
                  ) : (
                    <span className="text-slate-400">0</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-slate-600 max-w-xs">
                  {website.nlpContentSummary}
                </TableCell>
                <TableCell className="text-center">
                  {getRiskLevel(website.nlpScore)}
                </TableCell>
                <TableCell className="text-center">{getScoreBadge(website.nlpScore)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
