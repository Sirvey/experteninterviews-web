export interface PersonalInfo {
  firstName: string;
  lastName: string;
  company: string;
  position: string;
}

export interface AudioRecording {
  id: string;
  blob: Blob;
  duration: number;
  url: string;
}

export interface Answer {
  audioRecordings: AudioRecording[];
  notes: string;
}

export interface InterviewState {
  currentStep: number;
  personalInfo: PersonalInfo;
  answers: Record<number, Answer>;
  setPersonalInfo: (info: PersonalInfo) => void;
  setCurrentStep: (step: number) => void;
  addAudioRecording: (questionIndex: number, recording: AudioRecording) => void;
  removeAudioRecording: (questionIndex: number, recordingId: string) => void;
  updateNotes: (questionIndex: number, notes: string) => void;
}

export const questions = [
  "Können Sie uns kurz Ihr Unternehmen und dessen Zielsetzung vorstellen?",
  "Was hat Sie persönlich dazu motiviert, ein Social Business zu gründen?",
  "Welche spezifischen Herausforderungen haben Sie bei der Gründung und im laufenden Betrieb Ihrers Business erlebt?",
  "Inwiefern spielt Nachhaltigkeit (sozial, ökologisch und ökonomisch) eine Rolle für Ihren Erfolg?",
  "Wie gehen Sie mit Zielkonflikten zwischen ökonomischen und sozialen Zielen um?",
  "Welche Rolle spielen alternative Finanzierungsquellen (z. B. Spenden, Crowdfunding, Impact-Investments) in Ihrem Geschäftsmodell?",
  "Wie messen Sie den sozialen oder ökologischen Impact Ihres Business? Welche Methoden verwenden Sie?",
  "Welche drei Hauptfaktoren würden Sie als entscheidend für den Erfolg Ihres Business bezeichnen?",
  "Wie sehen Sie die Zukunft von Social Entrepreneurship in Deutschland?",
  "Welche Ratschläge würden Sie zukünftigen Gründern im Bereich Social Entrepreneurship geben, basierend auf Ihren Erfahrungen?"
];