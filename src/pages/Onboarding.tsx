import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../store/UserContext';
import { ShieldAlert, ArrowRight } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    situation: '',
    monthlyIncome: '',
    monthlyExpenses: '',
    upcomingCommitments: '',
    emergencySavings: '',
    mainGoal: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateAvailable = () => {
    const inc = Number(formData.monthlyIncome) || 0;
    const exp = Number(formData.monthlyExpenses) || 0;
    const comm = Number(formData.upcomingCommitments) || 0;
    const available = inc - exp - comm;
    return available > 0 ? available : 0;
  };

  const handleFinish = () => {
    updateUserData({
      hasCompletedOnboarding: true,
      situation: formData.situation,
      monthlyIncome: Number(formData.monthlyIncome) || 0,
      monthlyExpenses: Number(formData.monthlyExpenses) || 0,
      upcomingCommitments: Number(formData.upcomingCommitments) || 0,
      emergencySavings: formData.emergencySavings === '' ? null : Number(formData.emergencySavings),
      mainGoal: formData.mainGoal,
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Groww FirstStep
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Let's figure out your comfort zone before you start investing.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-slate-100 mx-4 sm:mx-0">
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Step {step} of 3</span>
              <span className="text-xs font-medium text-primary">
                {step === 1 ? 'Profile' : step === 2 ? 'Finances' : 'Goals'}
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div 
                className="bg-primary h-1.5 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h3 className="text-xl font-semibold">1. Your Current Situation</h3>
              <div>
                <label htmlFor="situation" className="block text-sm font-medium text-slate-700">What best describes you?</label>
                <select
                  id="situation"
                  name="situation"
                  value={formData.situation}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-slate-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-xl border"
                >
                  <option value="">Select...</option>
                  <option value="student">College Student</option>
                  <option value="part-time">Part-time Worker / Freelancer</option>
                  <option value="salaried">Salaried Professional</option>
                </select>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!formData.situation}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none disabled:bg-slate-300 transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h3 className="text-xl font-semibold">2. Financial Comfort Check</h3>
              <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-start space-x-2">
                <ShieldAlert className="w-5 h-5 text-slate-400 shrink-0" />
                <span>This helps us estimate how much you can comfortably invest. This data stays on your device and is not shared.</span>
              </p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="monthlyIncome" className="block text-sm font-medium text-slate-700">Monthly Income/Allowance (₹)</label>
                  <input
                    id="monthlyIncome"
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="e.g. 10000"
                  />
                </div>
                <div>
                  <label htmlFor="monthlyExpenses" className="block text-sm font-medium text-slate-700">Essential Monthly Expenses (₹)</label>
                  <input
                    id="monthlyExpenses"
                    type="number"
                    name="monthlyExpenses"
                    value={formData.monthlyExpenses}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="e.g. 5000"
                  />
                </div>
                <div>
                  <label htmlFor="upcomingCommitments" className="block text-sm font-medium text-slate-700">Upcoming Short-term Commitments (₹)</label>
                  <input
                    id="upcomingCommitments"
                    type="number"
                    name="upcomingCommitments"
                    value={formData.upcomingCommitments}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="e.g. 1000"
                  />
                </div>
                <div>
                  <label htmlFor="emergencySavings" className="block text-sm font-medium text-slate-700">Existing Emergency Savings (₹) - Optional</label>
                  <input
                    id="emergencySavings"
                    type="number"
                    name="emergencySavings"
                    value={formData.emergencySavings}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="e.g. 15000"
                  />
                </div>
              </div>

              {formData.monthlyIncome && (
                <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                  <p className="text-sm text-slate-600">Calculated Available Amount:</p>
                  <p className="text-3xl font-bold text-primary">₹{calculateAvailable().toLocaleString()}</p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    *This is just a planning aid, not personalized financial advice.
                  </p>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 px-4 border border-slate-300 rounded-xl shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="w-2/3 flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors"
                >
                  Next
                </button>
              </div>
              <div className="text-center">
                <button onClick={() => setStep(3)} className="text-sm text-primary hover:underline font-medium">
                  Skip this step
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h3 className="text-xl font-semibold">3. Your Main Goal</h3>
              
              <div className="space-y-3">
                {[
                  { id: 'learn', label: 'Just learn about investing' },
                  { id: 'habit', label: 'Build a long-term habit' },
                  { id: 'mutual-funds', label: 'Understand mutual funds' }
                ].map(goal => (
                  <label key={goal.id} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${formData.mainGoal === goal.id ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300'}`}>
                    <input
                      type="radio"
                      name="mainGoal"
                      value={goal.id}
                      checked={formData.mainGoal === goal.id}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-slate-300"
                    />
                    <span className="ml-3 font-medium text-slate-900">{goal.label}</span>
                  </label>
                ))}
              </div>

              <div className="flex space-x-3 mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="w-1/3 py-3 px-4 border border-slate-300 rounded-xl shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  onClick={handleFinish}
                  disabled={!formData.mainGoal}
                  className="w-2/3 flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark disabled:bg-slate-300 transition-colors"
                >
                  Let's Begin <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
