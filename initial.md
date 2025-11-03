# Requirements
## Summary
A real-time Web Defacement Detection System that monitors 2-3 locally created test websites using four analysis methods: hash-based comparison, DOM tree node comparison, NLP-based abusive content detection, and screenshot comparison. Each method provides a 0-100 score that aggregates into a final defacement percentage. The system provides a comprehensive dashboard with real-time monitoring, alerts for threshold violations, and detailed analysis pages for each detection method. This tool helps security teams proactively identify website compromises and respond quickly to defacement attacks.

## Use cases
- **Dashboard Overview & Real-time Monitoring**
  1) User opens the dashboard and sees header with title, settings, website name, and logo
  2) Left sidebar displays navigation: Dashboard, Hash Analysis, DOM Comparison, NLP Analyzer, Screenshot Comparison
  3) Right side shows alert/notification panel
  4) Center displays three metric boxes: Total Websites, Safe Websites, Unsafe Websites
  5) Below metrics, a table shows all monitored sites with S.No, ID, Name, URL, Defacement %, and Status
  6) Real-time updates refresh the table as analysis runs
  7) Alerts appear when any method score exceeds threshold

- **Hash-Based Comparison Analysis**
  1) User navigates to Hash Analysis page from sidebar
  2) Table displays all websites with S.No, Website ID, Name, URL, Past Saved Hash, Current Hash, and Hash Comparison Score (0-100)
  3) Current hash updates in real-time during active monitoring
  4) Score highlights sites with hash mismatches indicating potential modifications

- **DOM Tree Node Comparison**
  1) User navigates to DOM Comparison page
  2) User selects a website from dropdown selector
  3) System displays visual comparison of past vs current DOM tree structure
  4) Shows DOM comparison score (0-100) for the selected website
  5) Highlights structural differences and node changes

- **NLP-Based Content Analysis**
  1) User navigates to NLP Analyzer page
  2) Table displays all websites with S.No, Website ID, Name, URL, Malicious Content Score (0-100)
  3) System analyzes content for abusive, malicious, or irrelevant text using NLP
  4) Scores indicate likelihood of defacement based on content anomalies

- **Screenshot Comparison Analysis**
  1) User navigates to Screenshot Comparison page
  2) System displays side-by-side comparison of past vs current screenshots for each website
  3) Visual difference score (0-100) indicates pixel-level or perceptual changes
  4) Highlights areas with significant visual differences

## Plan
### Dashboard Overview & Real-time Monitoring
1. [x] Create main dashboard layout with header containing title bar, settings icon, website name, and logo
2. [x] Implement left sidebar navigation with menu items: Dashboard, Hash Analysis, DOM Comparison, NLP Analyzer, Screenshot Comparison
3. [x] Add right-side alert/notification panel component for threshold violations
4. [x] Create three metric cards displaying: Total Websites Count, Safe Websites Count, Unsafe Websites Count with real-time data
5. [x] Build main dashboard table with columns: S.No, ID, Name, URL, Defacement %, Status
6. [x] Implement mock data for 3 test websites with randomized scores updating every 3-5 seconds
7. [x] Add aggregation logic to calculate final defacement percentage from all four methods
8. [x] Implement color-coded status indicators (green for safe <30%, yellow for warning 30-60%, red for unsafe >60%)
9. [x] Add alert triggering system when individual method scores exceed 70% threshold
10. [x] Style dashboard with professional, unique appearance using Tailwind and Shadcn components

### Hash-Based Comparison Analysis
1. [x] Create Hash Analysis page layout with navigation
2. [x] Build table component with columns: S.No, Website ID, Name, URL, Past Saved Hash, Current Hash, Hash Score
3. [x] Generate mock hash values (SHA-256 format) for past saved hashes
4. [x] Implement real-time hash generation that changes every 3-5 seconds to simulate monitoring
5. [x] Add comparison logic to calculate hash-based score (0 = identical, 100 = completely different)
6. [x] Highlight rows where hash mismatch detected with warning colors
7. [x] Add score badge component showing 0-100 range with color coding

### DOM Tree Node Comparison
1. [x] Create DOM Comparison page layout
2. [x] Implement tabular format showing all monitored sites
3. [x] Display past and current DOM node counts
4. [x] Generate mock DOM node data with added/removed/modified counts
5. [x] Show DOM comparison score (0-100) for each website
6. [x] Add color-coded badges for node changes (green=added, red=removed, orange=modified)
7. [x] Display change status indicator (No Changes/Minor/Major)
8. [x] Real-time updates of DOM metrics

### NLP-Based Content Analysis
1. [x] Create NLP Analyzer page layout
2. [x] Build table component with columns: S.No, Website ID, Name, URL, Detected Keywords, Flagged Items, Content Summary, Risk Level, NLP Score
3. [x] Generate mock detected keywords (hacked, defaced, malware, spam, etc.)
4. [x] Implement mock NLP analysis displaying malicious keywords as badges
5. [x] Calculate and display malicious content score (0-100) with color coding
6. [x] Show flagged content count for each website
7. [x] Display content analysis summary with risk level indicators (Low/Medium/High)
8. [x] Real-time updates of NLP metrics

### Screenshot Comparison Analysis
1. [x] Create Screenshot Comparison page layout
2. [x] Build tabular format showing all monitored sites
3. [x] Display past and current screenshot timestamps
4. [x] Generate mock pixel difference percentage data
5. [x] Show screenshot comparison score (0-100) for each website
6. [x] Add color-coded difference indicators (Minimal/Moderate/Significant)
7. [x] Real-time updates of screenshot metrics
8. [x] Display pixel difference with appropriate visual badges
