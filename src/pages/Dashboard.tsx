import { Link } from 'react-router-dom';
import { useUser } from '../store/UserContext';
import { BookOpen, Calculator, CheckCircle2, Circle, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const { situation, calculateAvailableAmount, lessonsCompleted, goals, mainGoal, emergencySavings, monthlyExpenses } = useUser();
  const available = calculateAvailableAmount();
  const needsEmergencyFund = emergencySavings !== null && emergencySavings < (monthlyExpenses * 3);
  const skippedEmergencyFund = emergencySavings === null;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const steps = [
    { id: '1', title: 'Complete Financial Check', isComplete: true },
    { id: '2', title: 'Understand SIPs', isComplete: lessonsCompleted.includes('sip') },
    { id: '3', title: 'Set a Mock Goal', isComplete: goals.length > 0 },
    { id: '4', title: 'Take Beginner Quiz', isComplete: lessonsCompleted.includes('quiz_done') },
  ];

  const progress = Math.round((steps.filter(s => s.isComplete).length / steps.length) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">{getGreeting()}!</h2>
        <p className="text-slate-500 mt-1">
          {mainGoal === 'habit' && "Let's build a long-term investing habit."}
          {mainGoal === 'mutual-funds' && "Let's start learning about mutual funds."}
          {mainGoal === 'learn' && "Let's master the basics of investing."}
          {!mainGoal && "Let's build your financial foundation."}
        </p>
      </div>

      {needsEmergencyFund && monthlyExpenses > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-sm text-amber-800">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
          <div>
            <p className="font-bold">Prioritize your Emergency Fund</p>
            <p className="mt-1">You have less than 3 months of expenses saved. Consider directing your investable amount to a safe, easily accessible savings account first.</p>
          </div>
        </div>
      )}

      {skippedEmergencyFund && monthlyExpenses > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3 text-sm text-slate-700">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-slate-500" />
          <div>
            <p className="font-bold">Emergency Fund Rule of Thumb</p>
            <p className="mt-1">You skipped adding your emergency savings amount. As a best practice, aim to save at least 3 months of essential expenses before investing heavily.</p>
          </div>
        </div>
      )}

      {/* Snapshot Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="relative z-10">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Estimated Investable Amount</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900">₹{available.toLocaleString()}</span>
            <span className="text-sm text-slate-500">/mo</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Based on your {situation} profile inputs.</p>
        </div>
        <div className="relative z-10 shrink-0">
          <Link
            to="/simulator"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-primary hover:bg-primary-dark transition-colors shadow-sm w-full md:w-auto"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Try SIP Simulator
          </Link>
        </div>
      </div>

      {/* Two Column Layout for Main Content */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Readiness Checklist */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Readiness Checklist</h3>
            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{progress}%</span>
          </div>
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-3">
                {step.isComplete ? (
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300 shrink-0" />
                )}
                <span className={`text-sm ${step.isComplete ? 'text-slate-500 line-through' : 'text-slate-700 font-medium'}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Learning */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-sm text-white relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
          <div className="relative z-10 mb-6">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Investment Basics</h3>
            <p className="text-slate-300 text-sm mt-2">Learn the difference between saving and investing, and how compounding works.</p>
          </div>
          <Link
            to="/learn"
            className="relative z-10 inline-flex items-center justify-center px-6 py-3 border border-white/20 text-sm font-medium rounded-xl text-white bg-white/10 hover:bg-white/20 transition-colors w-full md:w-auto"
          >
            Start Learning
          </Link>
        </div>

      </div>

      <p className="text-center text-xs text-slate-400 mt-8">
        Groww FirstStep is an educational simulation. No real transactions occur here.
      </p>
    </div>
  );
};

export default Dashboard;
