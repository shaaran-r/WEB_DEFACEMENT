export type Website = {
  id: string;
  name: string;
  url: string;
  hashScore: number;
  domScore: number;
  nlpScore: number;
  screenshotScore: number;
  defacementPercentage: number;
  status: 'safe' | 'warning' | 'unsafe';
  pastHash: string;
  currentHash: string;
  pastDomNodeCount: number;
  currentDomNodeCount: number;
  domNodesAdded: number;
  domNodesRemoved: number;
  domNodesModified: number;
  pastScreenshotTimestamp: string;
  currentScreenshotTimestamp: string;
  screenshotPixelDifference: number;
  nlpDetectedKeywords: string[];
  nlpFlaggedContentCount: number;
  nlpContentSummary: string;
};

export type Alert = {
  id: string;
  websiteId: string;
  websiteName: string;
  message: string;
  timestamp: Date;
  type: 'hash' | 'dom' | 'nlp' | 'screenshot';
  severity: 'warning' | 'critical';
};

export type PageType = 'dashboard' | 'hash' | 'dom' | 'nlp' | 'screenshot';
