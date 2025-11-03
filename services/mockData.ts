import { Website, Alert } from '@/types';

const generateHash = (): string => {
  const chars = '0123456789abcdef';
  let hash = '';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

const formatTimestamp = (date: Date): string => {
  return date.toISOString().replace('T', ' ').substring(0, 19);
};

const maliciousKeywords = ['hacked', 'defaced', 'pwned', 'owned', 'compromised', 'spam', 'malware', 'phishing'];
const profanityKeywords = ['offensive', 'inappropriate', 'vulgar', 'abusive'];
const suspiciousKeywords = ['unauthorized', 'illegal', 'cracked', 'exploit'];

const websites: Website[] = [
  {
    id: 'WEB-001',
    name: 'E-Commerce Portal',
    url: 'http://localhost:3001',
    hashScore: 15,
    domScore: 12,
    nlpScore: 8,
    screenshotScore: 10,
    defacementPercentage: 11.25,
    status: 'safe',
    pastHash: 'a3f5e8d9c2b1f4e7a8d3c5b9f2e1d4c7b6a9f3e8d2c1b5f4e7a9d3c8b2f1e5d4c7',
    currentHash: 'a3f5e8d9c2b1f4e7a8d3c5b9f2e1d4c7b6a9f3e8d2c1b5f4e7a9d3c8b2f1e5d4c7',
    pastDomNodeCount: 245,
    currentDomNodeCount: 248,
    domNodesAdded: 3,
    domNodesRemoved: 0,
    domNodesModified: 2,
    pastScreenshotTimestamp: formatTimestamp(new Date(Date.now() - 3600000)),
    currentScreenshotTimestamp: formatTimestamp(new Date()),
    screenshotPixelDifference: 2.5,
    nlpDetectedKeywords: [],
    nlpFlaggedContentCount: 0,
    nlpContentSummary: 'Clean content - no suspicious patterns detected',
  },
  {
    id: 'WEB-002',
    name: 'Corporate Website',
    url: 'http://localhost:3002',
    hashScore: 45,
    domScore: 38,
    nlpScore: 42,
    screenshotScore: 40,
    defacementPercentage: 41.25,
    status: 'warning',
    pastHash: 'b7c4e2f1a9d6c3b8f5e2d1c9a7b4f3e6d2c8b5f1e9a3d7c4b2f6e1d8c5b9f3e7',
    currentHash: 'c8d5f3a2b1e7d4c9f6a3b8e5d2c1f7b4e9a6d3c8f5b2e1d9c7a4f6b3e8d5c2f1',
    pastDomNodeCount: 312,
    currentDomNodeCount: 335,
    domNodesAdded: 28,
    domNodesRemoved: 5,
    domNodesModified: 15,
    pastScreenshotTimestamp: formatTimestamp(new Date(Date.now() - 3600000)),
    currentScreenshotTimestamp: formatTimestamp(new Date()),
    screenshotPixelDifference: 18.7,
    nlpDetectedKeywords: ['spam', 'unauthorized'],
    nlpFlaggedContentCount: 3,
    nlpContentSummary: 'Moderate risk - suspicious keywords detected',
  },
  {
    id: 'WEB-003',
    name: 'News Portal',
    url: 'http://localhost:3003',
    hashScore: 85,
    domScore: 78,
    nlpScore: 92,
    screenshotScore: 88,
    defacementPercentage: 85.75,
    status: 'unsafe',
    pastHash: 'd9e6c3f2b8a5d1c7f4e9b2a6d3c8f5e1b7a4d9c6f3e8b2a5d1c9f7e4b3a6d8c5',
    currentHash: 'f1a8d5c2e9b6f3a7d4c1e8b5f2a9d6c3e7b4f1a8d5c2e9b6f3a7d4c1e8b5f2a9',
    pastDomNodeCount: 428,
    currentDomNodeCount: 512,
    domNodesAdded: 97,
    domNodesRemoved: 13,
    domNodesModified: 45,
    pastScreenshotTimestamp: formatTimestamp(new Date(Date.now() - 3600000)),
    currentScreenshotTimestamp: formatTimestamp(new Date()),
    screenshotPixelDifference: 42.3,
    nlpDetectedKeywords: ['hacked', 'defaced', 'pwned', 'malware', 'offensive'],
    nlpFlaggedContentCount: 12,
    nlpContentSummary: 'High risk - multiple malicious patterns and defacement indicators',
  },
];

let currentAlerts: Alert[] = [];

export const getWebsites = (): Website[] => {
  return [...websites];
};

export const updateWebsiteScores = (): Website[] => {
  websites.forEach((website) => {
    const hashChange = Math.random() > 0.7 ? Math.floor(Math.random() * 20) - 10 : 0;
    const domChange = Math.random() > 0.7 ? Math.floor(Math.random() * 15) - 7 : 0;
    const nlpChange = Math.random() > 0.7 ? Math.floor(Math.random() * 25) - 12 : 0;
    const screenshotChange = Math.random() > 0.7 ? Math.floor(Math.random() * 18) - 9 : 0;

    website.hashScore = Math.max(0, Math.min(100, website.hashScore + hashChange));
    website.domScore = Math.max(0, Math.min(100, website.domScore + domChange));
    website.nlpScore = Math.max(0, Math.min(100, website.nlpScore + nlpChange));
    website.screenshotScore = Math.max(0, Math.min(100, website.screenshotScore + screenshotChange));

    website.defacementPercentage = (website.hashScore + website.domScore + website.nlpScore + website.screenshotScore) / 4;

    if (website.defacementPercentage < 30) {
      website.status = 'safe';
    } else if (website.defacementPercentage < 60) {
      website.status = 'warning';
    } else {
      website.status = 'unsafe';
    }

    if (Math.random() > 0.85) {
      website.currentHash = generateHash();
    }

    if (Math.random() > 0.8) {
      const nodeChange = Math.floor(Math.random() * 10) - 5;
      website.currentDomNodeCount = Math.max(website.pastDomNodeCount, website.currentDomNodeCount + nodeChange);
      website.domNodesAdded = Math.max(0, website.domNodesAdded + Math.floor(Math.random() * 3) - 1);
      website.domNodesRemoved = Math.max(0, website.domNodesRemoved + Math.floor(Math.random() * 2));
      website.domNodesModified = Math.max(0, website.domNodesModified + Math.floor(Math.random() * 4) - 2);
    }

    if (Math.random() > 0.85) {
      const pixelChange = (Math.random() * 5) - 2.5;
      website.screenshotPixelDifference = Math.max(0, Math.min(100, website.screenshotPixelDifference + pixelChange));
    }

    if (Math.random() > 0.85 && website.nlpScore > 30) {
      const allKeywords = [...maliciousKeywords, ...profanityKeywords, ...suspiciousKeywords];
      const keywordCount = Math.min(Math.floor(website.nlpScore / 20), 5);
      website.nlpDetectedKeywords = [];
      for (let i = 0; i < keywordCount; i++) {
        const keyword = allKeywords[Math.floor(Math.random() * allKeywords.length)];
        if (!website.nlpDetectedKeywords.includes(keyword)) {
          website.nlpDetectedKeywords.push(keyword);
        }
      }
      website.nlpFlaggedContentCount = Math.floor(website.nlpScore / 8);
      
      if (website.nlpScore < 30) {
        website.nlpContentSummary = 'Clean content - no suspicious patterns detected';
      } else if (website.nlpScore < 70) {
        website.nlpContentSummary = 'Moderate risk - suspicious keywords detected';
      } else {
        website.nlpContentSummary = 'High risk - multiple malicious patterns and defacement indicators';
      }
    }

    website.currentScreenshotTimestamp = formatTimestamp(new Date());

    if (website.hashScore > 70 && Math.random() > 0.8) {
      addAlert(website, 'hash', website.hashScore);
    }
    if (website.domScore > 70 && Math.random() > 0.8) {
      addAlert(website, 'dom', website.domScore);
    }
    if (website.nlpScore > 70 && Math.random() > 0.8) {
      addAlert(website, 'nlp', website.nlpScore);
    }
    if (website.screenshotScore > 70 && Math.random() > 0.8) {
      addAlert(website, 'screenshot', website.screenshotScore);
    }
  });

  return [...websites];
};

const addAlert = (website: Website, type: Alert['type'], score: number): void => {
  const typeLabels = {
    hash: 'Hash Comparison',
    dom: 'DOM Tree Analysis',
    nlp: 'NLP Content Analysis',
    screenshot: 'Screenshot Comparison',
  };

  const alert: Alert = {
    id: `ALT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    websiteId: website.id,
    websiteName: website.name,
    message: `${typeLabels[type]} score exceeded threshold (${score.toFixed(1)}%)`,
    timestamp: new Date(),
    type,
    severity: score > 85 ? 'critical' : 'warning',
  };

  currentAlerts = [alert, ...currentAlerts].slice(0, 10);
};

export const getAlerts = (): Alert[] => {
  return [...currentAlerts];
};

export const clearAlert = (id: string): void => {
  currentAlerts = currentAlerts.filter((alert) => alert.id !== id);
};
