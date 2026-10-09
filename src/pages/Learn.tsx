import { useState } from 'react';
import { useUser } from '../store/UserContext';
import { BookOpen, CheckCircle, ChevronRight, HelpCircle } from 'lucide-react';

const LESSONS = [
  {
    id: 'investing_101',
    title: 'What is Investing?',
    content: [
      'Investing means putting your money into assets that have the potential to grow in value over time.',
      'Unlike saving in a bank account where returns often barely beat inflation, investing aims to build wealth by taking on calculated risk.',
      'The key is to start early and stay consistent.'
    ]
  },
  {
    id: 'mutual_funds',
    title: 'Mutual Funds vs Stocks',
    content: [
      'A stock represents a piece of ownership in a single company. Buying single stocks can be risky if that company struggles.',
      'A mutual fund pools money from many investors to buy a diversified mix of stocks or bonds, managed by experts.',
      'For beginners, mutual funds (like index funds) offer instant diversification, reducing risk compared to picking individual stocks.'
    ]
  },
  {
    id: 'sip',
    title: 'What is an SIP?',
    content: [
      'SIP stands for Systematic Investment Plan.',
      'It allows you to invest a fixed amount regularly (e.g., monthly). This builds discipline and automates your savings.',
      'It helps you benefit from "Rupee Cost Averaging"—buying more units when prices are low and fewer when prices are high.'
    ]
  },
  {
    id: 'risk',
    title: 'Understanding Risk',
    content: [
      'All investments carry risk. The value of your investment can go down as well as up.',
      'Generally, higher potential returns come with higher risk. You must balance your desire for growth with your capacity to handle losses.',
      'As a beginner, it is crucial to only invest money you won’t need for immediate expenses or emergencies.'
    ]
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'What is the main advantage of an SIP?',
    options: [
      'It guarantees you will never lose money',
      'It helps build a disciplined investing habit',
      'It promises a fixed 15% return'
    ],
    answerIndex: 1
  },
  {
    id: 2,
    question: 'Which of the following is generally considered less risky for a beginner?',
    options: [
      'Investing all money in one company\'s stock',
      'A diversified mutual fund',
      'Day trading options'
    ],
    answerIndex: 1
  },
  {
    id: 3,
    question: 'Before investing, what should you ideally have in place?',
    options: [
      'An emergency fund for unexpected expenses',
      'A large loan',
      'A brand new car'
    ],
    answerIndex: 0
  }
];

const Learn = () => {
  const { lessonsCompleted, markLessonComplete, saveQuizScore, quizScores } = useUser();
  const [activeLesson, setActiveLesson] = useState(LESSONS[0].id);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizState, setQuizState] = useState({ currentQ: 0, score: 0, isFinished: false });

  const activeLessonData = LESSONS.find(l => l.id === activeLesson);

  const handleLessonComplete = () => {
    markLessonComplete(activeLesson);
    const currentIndex = LESSONS.findIndex(l => l.id === activeLesson);
    if (currentIndex < LESSONS.length - 1) {
      setActiveLesson(LESSONS[currentIndex + 1].id);
    } else {
      setShowQuiz(true);
    }
  };

  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === QUIZ_QUESTIONS[quizState.currentQ].answerIndex;
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;
    
    if (quizState.currentQ < QUIZ_QUESTIONS.length - 1) {
      setQuizState(prev => ({ ...prev, currentQ: prev.currentQ + 1, score: newScore }));
    } else {
      setQuizState(prev => ({ ...prev, isFinished: true, score: newScore }));
      saveQuizScore('beginner_quiz', newScore);
      markLessonComplete('quiz_done');
    }
  };

  const previousScore = quizScores['beginner_quiz'];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Learning Center</h2>
        <p className="text-slate-500 mt-1">Master the basics before you invest your first Rupee.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Navigation Sidebar */}
        <div className="md:col-span-1 space-y-2">
          <h3 className="font-semibold text-slate-700 mb-4 px-2">Modules</h3>
          {LESSONS.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => { setActiveLesson(lesson.id); setShowQuiz(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-colors ${
                activeLesson === lesson.id && !showQuiz
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {lessonsCompleted.includes(lesson.id) ? (
                  <CheckCircle className="w-5 h-5 text-primary" />
                ) : (
                  <BookOpen className="w-5 h-5 opacity-50" />
                )}
                <span className="text-sm">{lesson.title}</span>
              </div>
            </button>
          ))}
          
          <div className="pt-4 mt-4 border-t border-slate-200">
            <button
              onClick={() => setShowQuiz(true)}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-colors ${
                showQuiz
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className={`w-5 h-5 ${showQuiz ? 'text-white' : 'opacity-50'}`} />
                <span className="text-sm">Beginner Quiz</span>
              </div>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="md:col-span-2">
          {!showQuiz ? (
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 min-h-[400px] flex flex-col">
              <div className="flex-1">
                <span className="text-xs font-bold tracking-widest text-primary uppercase mb-2 block">Lesson</span>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{activeLessonData?.title}</h2>
                <div className="prose prose-slate space-y-4">
                  {Array.isArray(activeLessonData?.content) ? (
                    activeLessonData?.content.map((paragraph, idx) => (
                      <p key={idx} className="text-slate-600 leading-relaxed text-lg">{paragraph}</p>
                    ))
                  ) : (
                    <p className="text-slate-600 leading-relaxed text-lg">{activeLessonData?.content}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <button
                  onClick={handleLessonComplete}
                  className="flex items-center px-6 py-3 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Mark Complete & Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 min-h-[400px]">
              <span className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2 block">Knowledge Check</span>
              
              {!quizState.isFinished ? (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6 mt-2">
                    Question {quizState.currentQ + 1} of {QUIZ_QUESTIONS.length}
                  </h2>
                  <p className="text-lg font-medium text-slate-800 mb-6">
                    {QUIZ_QUESTIONS[quizState.currentQ].question}
                  </p>
                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizState.currentQ].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="w-full text-left p-4 border border-slate-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-colors text-slate-700"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Quiz Complete!</h2>
                  <p className="text-slate-600 mb-6">You scored {quizState.score} out of {QUIZ_QUESTIONS.length}.</p>
                  <button
                    onClick={() => { setQuizState({ currentQ: 0, score: 0, isFinished: false }); }}
                    className="text-primary hover:underline font-medium text-sm"
                  >
                    Retake Quiz
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {previousScore !== undefined && previousScore !== null && !showQuiz && (
        <p className="text-center text-sm text-slate-500">
          Your previous quiz score: <span className="font-bold">{previousScore}/{QUIZ_QUESTIONS.length}</span>
        </p>
      )}
    </div>
  );
};

export default Learn;
