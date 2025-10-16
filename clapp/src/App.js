import React, { useState } from 'react';
import { Search, Filter, Calendar, FileText, Users, TrendingUp, Bell, BookmarkPlus, Edit3, Send, CheckCircle, Clock, XCircle, ArrowLeft } from 'lucide-react';

const ClappApp = () => {
  const [userType, setUserType] = useState('student');
  const [activeView, setActiveView] = useState('directory');
  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applications, setApplications] = useState([
    { 
      id: 1, 
      club: 'Stanford Consulting Group', 
      status: 'interview', 
      submitted: '2025-10-10',
      questions: [
        { id: 1, question: 'Why are you interested in Stanford Consulting Group?', answer: 'I am passionate about leveraging analytical frameworks to solve complex business problems. My experience in strategy consulting during my summer internship at Bain & Company showed me the power of structured problem-solving...' },
        { id: 2, question: 'Describe a time when you led a team through a challenging project.', answer: 'As project lead for my CS194 capstone, I coordinated a team of five engineers to build a machine learning platform for small businesses. We faced significant technical debt halfway through...' }
      ]
    },
    { 
      id: 2, 
      club: 'Product Space', 
      status: 'submitted', 
      submitted: '2025-10-12',
      questions: [
        { id: 1, question: 'What product are you most excited about and why?', answer: 'I am most excited about Notion because it fundamentally reimagines how teams collaborate and organize information. The flexibility of their block-based system...' },
        { id: 2, question: 'Tell us about a time you identified a user need.', answer: 'While working as a TA for CS106A, I noticed students struggling to debug their code effectively. I conducted user interviews with 20 students...' }
      ]
    },
    { id: 3, club: 'Stanford Finance Club', status: 'not_started', submitted: null, questions: [] }
  ]);

  const clubs = [
    { 
      id: 1, 
      name: 'Stanford Consulting Group', 
      category: 'Consulting', 
      commitment: '8-10 hrs/week',
      deadline: '2025-10-20',
      applicants: 156
    },
    { 
      id: 2, 
      name: 'Product Space', 
      category: 'Product Management', 
      commitment: '5-7 hrs/week',
      deadline: '2025-10-25',
      applicants: 89
    },
    { 
      id: 3, 
      name: 'Stanford Finance Club', 
      category: 'Finance', 
      commitment: '4-6 hrs/week',
      deadline: '2025-10-18',
      applicants: 124
    },
    { 
      id: 4, 
      name: 'Code the Change', 
      category: 'Social Good', 
      commitment: '3-5 hrs/week',
      deadline: '2025-11-01',
      applicants: 67
    }
  ];

  const savedEssays = [
    { id: 1, question: 'Why are you interested in this club?', text: 'I am passionate about leveraging my analytical skills...' },
    { id: 2, question: 'Describe a challenging team experience', text: 'During my sophomore year project...' }
  ];

  const StatusBadge = ({ status }) => {
    const config = {
      not_started: { bg: 'bg-gray-200', text: 'text-gray-800', icon: Clock, label: 'Not Started' },
      submitted: { bg: 'bg-gray-800', text: 'text-white', icon: Send, label: 'Submitted' },
      interview: { bg: 'bg-gray-600', text: 'text-white', icon: Calendar, label: 'Interview' },
      accepted: { bg: 'bg-black', text: 'text-white', icon: CheckCircle, label: 'Accepted' },
      rejected: { bg: 'bg-gray-400', text: 'text-gray-900', icon: XCircle, label: 'Rejected' }
    };
    const { bg, text, icon: Icon, label } = config[status];
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${bg} ${text}`}>
        <Icon className="w-4 h-4" />
        {label}
      </span>
    );
  };

  const StudentDirectory = () => (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search clubs..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      <div className="grid gap-4">
        {clubs.map(club => (
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
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <BookmarkPlus className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  onClick={() => {
                    setSelectedClub(club);
                    setActiveView('apply');
                  }}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <p className="text-gray-700">Passionate about product management and social impact. Experience in software development and user research.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
          <div className="flex flex-wrap gap-2">
            {['Python', 'React', 'Product Management', 'UI/UX Design', 'Data Analysis'].map(skill => (
              <span key={skill} className="px-3 py-1 bg-black text-white rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resume</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center gap-3">
            <FileText className="w-8 h-8 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">Alex_Johnson_Resume.pdf</p>
              <p className="text-sm text-gray-600">Uploaded on Oct 1, 2025</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Saved Essays</h3>
          <div className="space-y-3">
            {savedEssays.map(essay => (
              <div key={essay.id} className="border border-gray-200 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-1">{essay.question}</p>
                <p className="text-gray-600 text-sm line-clamp-2">{essay.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ApplicationTracker = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Applications</h2>

        <div className="space-y-3">
          {applications.map(app => (
            <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{app.club}</h3>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={app.status} />
                    {app.submitted && (
                      <span className="text-sm text-gray-600">Submitted {app.submitted}</span>
                    )}
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
      </div>
    </div>
  );

  const ApplicationDetail = () => (
    <div className="space-y-6">
      <button 
        onClick={() => setActiveView('applications')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Applications
      </button>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedApplication?.club}</h2>
            <div className="flex items-center gap-4 mt-2">
              <StatusBadge status={selectedApplication?.status} />
              {selectedApplication?.submitted && (
                <span className="text-sm text-gray-600">Submitted {selectedApplication.submitted}</span>
              )}
            </div>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <Edit3 className="w-4 h-4" />
            Edit Application
          </button>
        </div>

        <div className="space-y-6">
          {selectedApplication?.questions.length > 0 ? (
            selectedApplication.questions.map((q) => (
              <div key={q.id} className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">{q.question}</h3>
                <p className="text-gray-700 leading-relaxed">{q.answer}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No application submitted yet</p>
              <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                Start Application
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const OfficerDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Stanford Consulting Group - Applicants</h2>
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            Export to CSV
          </button>
        </div>

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

        <div className="mb-4 flex gap-4">
          <input 
            type="text" 
            placeholder="Search applicants..." 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Status</option>
            <option>Pending Review</option>
            <option>Interview Scheduled</option>
            <option>Accepted</option>
            <option>Rejected</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Majors</option>
            <option>CS</option>
            <option>Economics</option>
            <option>Engineering</option>
          </select>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Year</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Major</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Submitted</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { name: 'Sarah Chen', year: 'Sophomore', major: 'Economics', status: 'submitted', date: '10/12' },
                { name: 'Michael Park', year: 'Junior', major: 'CS', status: 'interview', date: '10/11' },
                { name: 'Emily Rodriguez', year: 'Senior', major: 'MS&E', status: 'accepted', date: '10/10' }
              ].map((applicant, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{applicant.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{applicant.year}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{applicant.major}</td>
                  <td className="px-4 py-3"><StatusBadge status={applicant.status} /></td>
                  <td className="px-4 py-3 text-sm text-gray-600">{applicant.date}</td>
                  <td className="px-4 py-3">
                    <button className="text-gray-900 hover:text-black font-medium text-sm">
                      View Application
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Analytics
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Top Majors</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Computer Science</span>
                <span className="font-medium">42%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Economics</span>
                <span className="font-medium">28%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>MS&E</span>
                <span className="font-medium">18%</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Year Distribution</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sophomores</span>
                <span className="font-medium">38%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Juniors</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Seniors</span>
                <span className="font-medium">17%</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Conversion Rate</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Interview Rate</span>
                <span className="font-medium">14.7%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Accept Rate</span>
                <span className="font-medium">7.7%</span>
              </div>
            </div>
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
                    onClick={() => setActiveView('directory')}
                    className={`px-4 py-2 rounded-lg font-medium ${activeView === 'directory' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    Directory
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
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full"></span>
              </button>
              <select 
                value={userType}
                onChange={(e) => {
                  setUserType(e.target.value);
                  setActiveView(e.target.value === 'student' ? 'directory' : 'dashboard');
                }}
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
        {userType === 'student' && activeView === 'directory' && <StudentDirectory />}
        {userType === 'student' && activeView === 'profile' && <StudentProfile />}
        {userType === 'student' && activeView === 'applications' && <ApplicationTracker />}
        {userType === 'student' && activeView === 'applicationDetail' && <ApplicationDetail />}
        {userType === 'officer' && <OfficerDashboard />}
      </main>
    </div>
  );
};

export default ClappApp;