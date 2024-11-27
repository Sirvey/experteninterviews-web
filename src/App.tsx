import React from 'react';
import { useInterviewStore } from './store';
import { Welcome } from './components/Welcome';
import { PersonalInfo } from './components/PersonalInfo';
import { Question } from './components/Question';
import { Submission } from './components/Submission';
import { questions } from './types';

function App() {
  const currentStep = useInterviewStore((state) => state.currentStep);

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep === 0 && <Welcome />}
      {currentStep === 1 && <PersonalInfo />}
      {currentStep >= 2 && currentStep < questions.length + 2 && <Question />}
      {currentStep === questions.length + 2 && <Submission />}
    </div>
  );
}

export default App;