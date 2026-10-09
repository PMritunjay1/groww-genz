import { useState } from 'react';
import { useUser, type Goal } from '../store/UserContext';
import { Plus, Target, Trash2, Edit2 } from 'lucide-react';

const Goals = () => {
  const { goals, addGoal, deleteGoal, updateGoal } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: ''
  });

  const handleOpenModal = (goal?: Goal) => {
    if (goal) {
      setEditingId(goal.id);
      setFormData({
        name: goal.name,
        targetAmount: goal.targetAmount.toString(),
        currentAmount: goal.currentAmount.toString(),
        targetDate: goal.targetDate
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', targetAmount: '', currentAmount: '', targetDate: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateGoal(editingId, {
        name: formData.name,
        targetAmount: Number(formData.targetAmount),
        currentAmount: Number(formData.currentAmount),
        targetDate: formData.targetDate
      });
    } else {
      addGoal({
        name: formData.name,
        targetAmount: Number(formData.targetAmount),
        currentAmount: Number(formData.currentAmount),
        targetDate: formData.targetDate
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Savings Goals</h2>
          <p className="text-slate-500 mt-1">Track your progress towards hypothetical financial milestones. These represent manual savings, not market-linked investments.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">No goals set yet</h3>
          <p className="text-slate-500 mt-1 max-w-sm mx-auto">Start by setting a small milestone, like building an emergency fund of ₹10,000.</p>
          <button
            onClick={() => handleOpenModal()}
            className="mt-6 inline-flex items-center justify-center px-4 py-2 border border-slate-200 text-sm font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm"
          >
            Create First Goal
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {goals.map(goal => {
            const progress = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
            return (
              <div key={goal.id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-slate-900 text-lg">{goal.name}</h3>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenModal(goal)} className="p-1.5 text-slate-400 hover:text-primary transition-colors bg-slate-50 rounded-md">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteGoal(goal.id)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors bg-slate-50 rounded-md">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">₹{goal.currentAmount.toLocaleString()} saved</span>
                  <span className="text-slate-900 font-medium">₹{goal.targetAmount.toLocaleString()}</span>
                </div>
                
                <div className="w-full bg-slate-100 rounded-full h-2.5 mb-4">
                  <div className="bg-primary h-2.5 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                </div>
                
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>{progress}% Complete</span>
                  <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">{editingId ? 'Edit Goal' : 'Create New Goal'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Goal Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-primary focus:border-primary"
                  placeholder="e.g. Emergency Fund"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Amount (₹)</label>
                <input
                  required
                  type="number"
                  min="1"
                  value={formData.targetAmount}
                  onChange={e => setFormData({...formData, targetAmount: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Amount Saved (₹)</label>
                <input
                  required
                  type="number"
                  min="0"
                  value={formData.currentAmount}
                  onChange={e => setFormData({...formData, currentAmount: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Date</label>
                <input
                  required
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.targetDate}
                  onChange={e => setFormData({...formData, targetDate: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="flex gap-3 mt-6 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium"
                >
                  {editingId ? 'Save Changes' : 'Add Goal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Goals;
