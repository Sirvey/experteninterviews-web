import React from 'react';
import { useInterviewStore } from '../store';
import { AudioRecorder } from './AudioRecorder';
import { questions } from '../types';
import { ChevronLeft } from 'lucide-react';
import { Submission } from './Submission'; // Importiere Submission

export const Question = () => {
  const {
    currentStep,
    setCurrentStep,
    answers,
    addAudioRecording,
    removeAudioRecording,
    updateNotes,
  } = useInterviewStore();

  const questionIndex = currentStep - 2;
  const currentQuestion = questions[questionIndex];
  const currentAnswer = answers[questionIndex] || { audioRecordings: [], notes: '' };
  const progress = ((questionIndex + 1) / questions.length) * 100;

  const hasAnswer = currentAnswer.audioRecordings.length > 0 || currentAnswer.notes.trim().length > 0;

  const handleRecordingComplete = async ({
    blob,
    duration,
  }: {
    blob: Blob;
    duration: number;
  }) => {
    const url = URL.createObjectURL(blob);
    const id = Math.random().toString(36).substr(2, 9);
    addAudioRecording(questionIndex, { id, blob, duration, url });
  };

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Automatisch absenden nach der letzten Frage
      setCurrentStep(currentStep + 1); // Submission-Schritt auslösen
    }
  };

  if (questionIndex >= questions.length) {
    // Wenn alle Fragen beantwortet sind, rendern wir direkt das Submission-Element
    return <Submission />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Frage {questionIndex + 1} von {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentQuestion}</h2>

        <div className="space-y-6">
          <AudioRecorder
            onRecordingComplete={handleRecordingComplete}
            onDelete={(id) => removeAudioRecording(questionIndex, id)}
            recordings={currentAnswer.audioRecordings}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zusätzliche Notizen (optional)
            </label>
            <textarea
              value={currentAnswer.notes}
              onChange={(e) => updateNotes(questionIndex, e.target.value)}
              className="w-full h-32 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Hier Notizen hinzufügen..."
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Zurück
            </button>
            <div className="flex flex-col items-end">
              {!hasAnswer && (
                <p className="text-sm text-red-500 mb-2">
                  Bitte antworten Sie vorher per Audio oder Text
                </p>
              )}
              <button
                onClick={handleNext}
                disabled={!hasAnswer}
                className={`flex items-center px-6 py-2 rounded-lg transition-colors ${
                  hasAnswer
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 cursor-not-allowed text-gray-500'
                }`}
              >
                {questionIndex < questions.length - 1 ? 'Weiter' : 'Interview abschließen'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
