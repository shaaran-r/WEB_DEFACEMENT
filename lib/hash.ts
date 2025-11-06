import * as crypto from 'crypto';

export type HashableContent = {
  html: string;
  css?: string;
  scripts?: string;
  // Add more content types as needed
};

export function generateContentHash(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

export function generateWebsiteFingerprint(content: HashableContent): string {
  // Combine all content types into a single string
  const combinedContent = Object.values(content).filter(Boolean).join('');
  return generateContentHash(combinedContent);
}

export function compareHashes(oldHash: string, newHash: string): boolean {
  return oldHash === newHash;
}

export async function fetchAndHashWebsite(url: string): Promise<{ content: HashableContent; hash: string }> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // Extract CSS and script content if needed
    const content: HashableContent = {
      html,
      // You can add more content types here
    };

    const hash = generateWebsiteFingerprint(content);
    return { content, hash };
  } catch (error) {
    throw new Error(`Failed to fetch and hash website: ${error.message}`);
  }
}

// Function to detect changes between two website states
export function detectChanges(oldContent: HashableContent, newContent: HashableContent): {
  hasChanges: boolean;
  changes: {
    html?: boolean;
    css?: boolean;
    scripts?: boolean;
  };
} {
  const changes = {
    html: oldContent.html !== newContent.html,
    css: oldContent.css !== newContent.css,
    scripts: oldContent.scripts !== newContent.scripts,
  };

  return {
    hasChanges: Object.values(changes).some(Boolean),
    changes,
  };
}