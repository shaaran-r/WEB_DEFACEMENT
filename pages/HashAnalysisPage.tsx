import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Website } from '@/types';
import { Button } from '@/components/ui/button';
import { fetchAndHashWebsite, generateContentHash, HashableContent } from '@/lib/hash';

type HashAnalysisPageProps = {
  websites: Website[];
};

type WebsiteHash = {
  url: string;
  currentHash: string;
  originalHash: string;
  lastChecked: Date;
  status: 'unchanged' | 'modified' | 'error';
};

export function HashAnalysisPage({ websites }: HashAnalysisPageProps) {
  const [websiteHashes, setWebsiteHashes] = useState<Record<string, WebsiteHash>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeWebsite = async (url: string) => {
    try {
      const { hash } = await fetchAndHashWebsite(url);
      
      setWebsiteHashes(prev => ({
        ...prev,
        [url]: {
          url,
          currentHash: hash,
          originalHash: prev[url]?.originalHash || hash,
          lastChecked: new Date(),
          status: prev[url]?.originalHash 
            ? (prev[url].originalHash === hash ? 'unchanged' : 'modified')
            : 'unchanged'
        }
      }));
    } catch (error) {
      setWebsiteHashes(prev => ({
        ...prev,
        [url]: {
          url,
          currentHash: '',
          originalHash: prev[url]?.originalHash || '',
          lastChecked: new Date(),
          status: 'error'
        }
      }));
    }
  };

  const analyzeAllWebsites = async () => {
    setIsAnalyzing(true);
    for (const website of websites) {
      await analyzeWebsite(website.url);
    }
    setIsAnalyzing(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unchanged':
        return <Badge className="bg-green-600 hover:bg-green-700">Unchanged</Badge>;
      case 'modified':
        return <Badge className="bg-red-600 hover:bg-red-700">Modified</Badge>;
      case 'error':
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Error</Badge>;
      default:
        return <Badge className="bg-gray-600 hover:bg-gray-700">Unknown</Badge>;
    }
  };

  useEffect(() => {
    // Initial hash analysis of all websites
    analyzeAllWebsites();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Hash-Based Comparison Analysis</h2>
        <p className="text-sm text-slate-600">Monitoring file integrity through cryptographic hash comparison</p>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Button
            onClick={analyzeAllWebsites}
            disabled={isAnalyzing}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze All Websites'}
          </Button>
        </div>

        <div className="rounded-lg border bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-16">S.No</TableHead>
                <TableHead>Website ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Original Hash</TableHead>
                <TableHead>Current Hash</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Last Checked</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {websites.map((website, index) => {
                const hashData = websiteHashes[website.url];
                return (
                  <TableRow key={website.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-mono text-sm">{website.id}</TableCell>
                    <TableCell className="font-medium">{website.name}</TableCell>
                    <TableCell className="text-sm text-slate-600">{website.url}</TableCell>
                    <TableCell className="font-mono text-xs text-slate-500">
                      {hashData?.originalHash 
                        ? `${hashData.originalHash.substring(0, 16)}...` 
                        : 'Not analyzed'}
                    </TableCell>
                    <TableCell className={`font-mono text-xs ${
                      hashData?.status === 'modified' ? 'text-red-600 font-semibold' : 'text-slate-500'
                    }`}>
                      {hashData?.currentHash 
                        ? `${hashData.currentHash.substring(0, 16)}...`
                        : 'Not analyzed'}
                    </TableCell>
                    <TableCell className="text-center">
                      {hashData ? getStatusBadge(hashData.status) : '-'}
                    </TableCell>
                    <TableCell className="text-center text-sm text-slate-600">
                      {hashData?.lastChecked 
                        ? hashData.lastChecked.toLocaleString()
                        : '-'}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        onClick={() => analyzeWebsite(website.url)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700"
                        size="sm"
                      >
                        Analyze
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
