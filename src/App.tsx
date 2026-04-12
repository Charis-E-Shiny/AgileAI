/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import PipelineView from './components/PipelineView';
import MLResults from './components/MLResults';
import DLResults from './components/DLResults';
import QMLResults from './components/QMLResults';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'pipeline':
        return <PipelineView />;
      case 'ml':
        return <MLResults />;
      case 'dl':
        return <DLResults />;
      case 'qml':
        return <QMLResults />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#E4E3E0]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-12 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

