import { useNavigate } from 'react-router-dom';
import { useUser } from '../store/UserContext';
import { Shield, Trash2, Database } from 'lucide-react';

const Settings = () => {
  const { resetUserData, situation, mainGoal, calculateAvailableAmount } = useUser();
  const navigate = useNavigate();

  const handleReset = () => {
    if (window.confirm("Are you sure you want to delete all local progress? This cannot be undone.")) {
      resetUserData();
      navigate('/onboarding');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Settings & Data</h2>
        <p className="text-slate-500 mt-1">Manage your simulation preferences.</p>
      </div>

      <div className="space-y-6">
        
        {/* Profile Info */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center">
            <Database className="w-5 h-5 mr-2 text-slate-400" />
            Current Profile Data
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-500">Situation</span>
              <span className="font-medium text-slate-900 capitalize">{situation || 'Not set'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-500">Main Goal</span>
              <span className="font-medium text-slate-900 capitalize">{mainGoal.replace('-', ' ') || 'Not set'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-500">Investable Est.</span>
              <span className="font-medium text-slate-900">₹{calculateAvailableAmount().toLocaleString()}/mo</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/onboarding')}
            className="mt-6 w-full py-2 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors text-sm"
          >
            Re-take Comfort Check
          </button>
        </div>

        {/* Privacy */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-slate-400" />
            Privacy & Disclosure
          </h3>
          <div className="text-sm text-slate-600 space-y-3">
            <p>
              Groww FirstStep is an independent product concept created for a case study. It is not an official Groww product.
            </p>
            <p>
              All data entered here (income, expenses, goals) is stored locally in your browser's localStorage. It is never transmitted to any external server.
            </p>
            <p>
              No real transactions occur, and all returns shown in the simulator are purely illustrative.
            </p>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
          <h3 className="font-bold text-red-900 mb-2 flex items-center">
            <Trash2 className="w-5 h-5 mr-2" />
            Danger Zone
          </h3>
          <p className="text-sm text-red-700 mb-4">
            Resetting your data will erase all quiz scores, goals, and onboarding preferences. You will be redirected to the start.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors text-sm shadow-sm"
          >
            Reset All Demo Data
          </button>
        </div>

      </div>
    </div>
  );
};

export default Settings;
