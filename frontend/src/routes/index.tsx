import { Routes, Route } from 'react-router-dom';

import AppLayout from '../layouts/AppLayout';

import Dashboard from '../pages/Dashboard/Dashboard';
import Chat from '../pages/Chat/Chat';
import Agents from '../pages/Agents/Agents';
import Models from '../pages/Models/Models';
import Prompts from '../pages/Prompts/Prompts';
import Settings from '../pages/Settings/Settings';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/models" element={<Models />} />
        <Route path="/prompts" element={<Prompts />} />
        <Route path="/settings" element={<Settings />} />

      </Route>
    </Routes>
  );
}