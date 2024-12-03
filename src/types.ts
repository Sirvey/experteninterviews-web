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
  "Können Sie kurz sich, Ihr Unternehmen und dessen Zielsetzung vorstellen?",
  "Was hat Sie persönlich dazu motiviert, mit Ihrem Unternehmen sozial orientiert zu handeln?",
  "Welche spezifischen Herausforderungen haben Sie bei der Gründung und im laufenden Betrieb Ihres Unternehmens erlebt?",
  "Inwiefern spielt Nachhaltigkeit (sozial, ökologisch und ökonomisch) eine Rolle für Ihren Erfolg?",
  "Wie gehen Sie mit Zielkonflikten zwischen ökonomischen und sozialen Zielen um?",
  "Welche Rolle spielen alternative Finanzierungsquellen (z. B. Spenden, Crowdfunding, Impact-Investments) in Ihrem Geschäftsmodell?",
  "Wie messen Sie den sozialen oder ökologischen Impact Ihres Unternehmens? Welche Methoden verwenden Sie?",
  "Welche drei Hauptfaktoren würden Sie als entscheidend für den Erfolg Ihres Unternehmens bezeichnen?",
  "Wie sehen Sie die Zukunft von Social Entrepreneurship in Deutschland?",
  "Welche Ratschläge würden Sie zukünftigen Gründern im Bereich Social Entrepreneurship geben, basierend auf Ihren Erfahrungen?"
];