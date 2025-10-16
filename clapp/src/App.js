import React, { useState } from 'react';
import { Search, Calendar, Users, Bell, Edit3, Send, Clock, ArrowLeft, Plus, X } from 'lucide-react';

const ClappApp = () => {
  const [userType, setUserType] = useState('student');
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formAnswers, setFormAnswers] = useState({});

  // All available clubs
  const allClubs = [
    { id: 1, name: 'Stanford Consulting Group', category: 'Consulting', commitment: '8-10 hrs/week', deadline: '2025-10-20', applicants: 156, questions: [{ id: 1, question: 'Why are you interested?', type: 'essay' }, { id: 2, question: 'Leadership experience?', type: 'essay' }] },
    { id: 2, name: 'Product Space', category: 'Product Management', commitment: '5-7 hrs/week', deadline: '2025-10-25', applicants: 89, questions: [{ id: 1, question: 'Favorite product?', type: 'essay' }, { id: 2, question: 'User research experience?', type: 'essay' }] },
    { id: 3, name: 'Stanford Finance Club', category: 'Finance', commitment: '4-6 hrs/week', deadline: '2025-10-18', applicants: 124, questions: [{ id: 1, question: 'Investment interests?', type: 'text' }] },
    { id: 4, name: 'Code the Change', category: 'Social Good', commitment: '3-5 hrs/week', deadline: '2025-11-01', applicants: 67, questions: [{ id: 1, question: 'Social impact goals?', type: 'essay' }] },
  ];

  // State for saved clubs and applications
  const [savedClubs, setSavedClubs] = useState([allClubs[0], allClubs[1]]);
  const [applications, setApplications] = useState([]);

  const filteredClubs = allClubs.filter(club =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const StatusBadge = ({ status }) => {
    const styles = {
      'not_started': { bg: 'bg-gray-200', text: 'text-gray-800', label: 'Not Started' },
      'submitted': { bg: 'bg-gray-800', text: 'text-white', label: 'Submitted' },
      'interview': { bg: 'bg-gray-600', text: 'text-white', label: 'Interview' },
      'accepted': { bg: 'bg-black', text: 'text-white', label: 'Accepted' },
      'rejected': { bg: 'bg-gray-400', text: 'text-gray-900', label: 'Rejected' }
    };
    const style = styles[status] || styles['not_started'];
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}>
        {style.label}
      </span>
    );
  };

  // Dashboard - shows saved clubs
  const StudentDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Clubs</h2>
      {savedClubs.length === 0 ? (
        <p className="text-gray-600">No clubs added yet. Click "Add Club" to get started!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedClubs.map(club => (
            <div key={club.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                  {club.name.charAt(0)}
                </div>
                <button 
                  onClick={() => setSavedClubs(savedClubs.filter(c => c.id !== club.id))} 
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{club.name}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-1 bg-black text-white rounded text-xs">{club.category}</span>
                <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs">{club.commitment}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Calendar className="w-4 h-4" />
                Due {club.deadline}
              </div>
              <button 
                onClick={() => {
                  setSelectedClub(club);
                  setActiveView('apply');
                  setFormAnswers({});
                }}
                className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium"
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Search clubs page
  const SearchClubs = () => (
    <div className="space-y-6">
      <button 
        onClick={() => setActiveView('dashboard')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to My Clubs
      </button>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search clubs by name or category..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredClubs.map(club => (
          <div key={club.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                  {club.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{club.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 bg-black text-white rounded text-sm">{club.category}</span>
                    <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-sm">{club.commitment}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Due {club.deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {club.applicants} applicants
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => {
                  if (!savedClubs.find(c => c.id === club.id)) {
                    setSavedClubs([...savedClubs, club]);
                    setActiveView('dashboard');
                  }
                }}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Apply page
  const ApplyView = () => (
    <div className="space-y-6">
      <button 
        onClick={() => setActiveView('dashboard')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedClub?.name}</h2>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-black text-white rounded text-sm">{selectedClub?.category}</span>
            <span className="text-sm text-gray-600">Due {selectedClub?.deadline}</span>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          {selectedClub?.questions?.map((q) => (
            <div key={q.id}>
              <label className="block font-semibold text-gray-900 mb-3">{q.question}</label>
              {q.type === 'essay' ? (
                <textarea
                  placeholder="Type your answer..."
                  value={formAnswers[q.id] || ''}
                  onChange={(e) => setFormAnswers({ ...formAnswers, [q.id]: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                  rows="6"
                />
              ) : (
                <input
                  type="text"
                  placeholder="Type your answer..."
                  value={formAnswers[q.id] || ''}
                  onChange={(e) => setFormAnswers({ ...formAnswers, [q.id]: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => setActiveView('dashboard')}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              const existingApp = applications.find(a => a.clubId === selectedClub.id);
              const newApp = {
                id: existingApp?.id || applications.length + 1,
                clubId: selectedClub.id,
                clubName: selectedClub.name,
                status: 'submitted',
                submitted: new Date().toISOString().split('T')[0],
                answers: formAnswers
              };
              
              if (existingApp) {
                setApplications(applications.map(a => a.id === existingApp.id ? newApp : a));
              } else {
                setApplications([...applications, newApp]);
              }
              
              setActiveView('dashboard');
              alert('Application submitted!');
            }}
            className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-semibold flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );

  // My Applications page
  const ApplicationTracker = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Applications</h2>

      {applications.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">No applications yet. Start by applying to a club!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map(app => (
            <div key={app.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{app.clubName}</h3>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={app.status} />
                    <span className="text-sm text-gray-600">Submitted {app.submitted}</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setSelectedApplication(app);
                    setActiveView('applicationDetail');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Application detail page
  const ApplicationDetail = () => {
    const club = allClubs.find(c => c.id === selectedApplication?.clubId);
    
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setActiveView('applications')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Applications
        </button>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{selectedApplication?.clubName}</h2>
            <div className="flex items-center gap-4 mt-2">
              <StatusBadge status={selectedApplication?.status} />
              <span className="text-sm text-gray-600">Submitted {selectedApplication?.submitted}</span>
            </div>
          </div>

          <div className="space-y-6">
            {club?.questions?.map((q) => (
              <div key={q.id} className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">{q.question}</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedApplication?.answers[q.id] || 'No answer provided'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Student Profile page
  const StudentProfile = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
        <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
          <Edit3 className="w-4 h-4" />
          Edit
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <p className="text-gray-900">Alex Johnson</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <p className="text-gray-900">Junior</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
            <p className="text-gray-900">Computer Science</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pronouns</label>
            <p className="text-gray-900">they/them</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
          <div className="flex flex-wrap gap-2">
            {['Python', 'React', 'Product Management', 'UI/UX Design'].map(skill => (
              <span key={skill} className="px-3 py-1 bg-black text-white rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Officer Dashboard
  const OfficerDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Applicant Dashboard</h2>
        
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Applicants</p>
            <p className="text-3xl font-bold text-gray-900">156</p>
          </div>
          <div className="bg-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-700 mb-1">To Interview</p>
            <p className="text-3xl font-bold text-gray-900">23</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-300 mb-1">Accepted</p>
            <p className="text-3xl font-bold text-white">12</p>
          </div>
          <div className="bg-gray-300 rounded-lg p-4">
            <p className="text-sm text-gray-700 mb-1">Rejected</p>
            <p className="text-3xl font-bold text-gray-900">45</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-black">Clapp</h1>
              {userType === 'student' && (
                <div className="flex gap-4">
                  <button 
                    onClick={() => setActiveView('dashboard')}
                    className={`px-4 py-2 rounded-lg font-medium ${activeView === 'dashboard' || activeView === 'search' || activeView === 'apply' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    My Clubs
                  </button>
                  <button 
                    onClick={() => setActiveView('applications')}
                    className={`px-4 py-2 rounded-lg font-medium ${activeView === 'applications' || activeView === 'applicationDetail' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    My Applications
                  </button>
                  <button 
                    onClick={() => setActiveView('profile')}
                    className={`px-4 py-2 rounded-lg font-medium ${activeView === 'profile' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    Profile
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              {userType === 'student' && activeView === 'dashboard' && (
                <button 
                  onClick={() => setActiveView('search')}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Club
                </button>
              )}
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <select 
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="student">Student View</option>
                <option value="officer">Officer View</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {userType === 'student' && activeView === 'dashboard' && <StudentDashboard />}
        {userType === 'student' && activeView === 'search' && <SearchClubs />}
        {userType === 'student' && activeView === 'apply' && <ApplyView />}
        {userType === 'student' && activeView === 'profile' && <StudentProfile />}
        {userType === 'student' && activeView === 'applications' && <ApplicationTracker />}
        {userType === 'student' && activeView === 'applicationDetail' && <ApplicationDetail />}
        {userType === 'officer' && <OfficerDashboard />}
      </main>
    </div>
  );
};

export default ClappApp;