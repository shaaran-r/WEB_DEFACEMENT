import { useState, useEffect } from 'react';
import { Header } from '@/layout/Header';
import { Sidebar } from '@/layout/Sidebar';
import { AlertPanel } from '@/layout/AlertPanel';
import { DashboardPage } from '@/pages/DashBoardPage';
import { HashAnalysisPage } from '@/pages/HashAnalysisPage';
import { DomComparisonPage } from '@/pages/DomComparisonPage';
import { ScreenshotComparisonPage } from '@/pages/ScreenShotComparisionpage';
import { NlpAnalyzerPage } from '@/pages/NlpAnalyzerPage';
import { PageType, Website, Alert } from '@/types';
import { getWebsites, updateWebsiteScores, getAlerts, clearAlert } from '@/services/mockData';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [websites, setWebsites] = useState<Website[]>(getWebsites());
  const [alerts, setAlerts] = useState<Alert[]>(getAlerts());

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedWebsites = updateWebsiteScores();
      setWebsites(updatedWebsites);
      setAlerts(getAlerts());
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleClearAlert = (id: string) => {
    clearAlert(id);
    setAlerts(getAlerts());
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage websites={websites} />;
      case 'hash':
        return <HashAnalysisPage websites={websites} />;
      case 'dom':
        return <DomComparisonPage websites={websites} />;
      case 'nlp':
        return <NlpAnalyzerPage websites={websites} />;
      case 'screenshot':
        return <ScreenshotComparisonPage websites={websites} />;
      default:
        return <DashboardPage websites={websites} />;
    }
  };

  return (
    <div className="flex h-screen flex-col bg-slate-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1 overflow-auto p-6">{renderPage()}</main>
        <AlertPanel alerts={alerts} onClearAlert={handleClearAlert} />
      </div>
    </div>
  );
}

export default App;
