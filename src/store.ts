import { create } from 'zustand';
import { InterviewState, PersonalInfo, AudioRecording } from './types';

export const useInterviewStore = create<InterviewState>((set) => ({
  currentStep: 0,
  personalInfo: {
    firstName: '',
    lastName: '',
    company: '',
    position: '',
  },
  answers: {},
  
  setPersonalInfo: (info: PersonalInfo) =>
    set({ personalInfo: info }),
    
  setCurrentStep: (step: number) =>
    set({ currentStep: step }),
    
  addAudioRecording: (questionIndex: number, recording: AudioRecording) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionIndex]: {
          audioRecordings: [
            ...(state.answers[questionIndex]?.audioRecordings || []),
            recording,
          ],
          notes: state.answers[questionIndex]?.notes || '',
        },
      },
    })),
    
  removeAudioRecording: (questionIndex: number, recordingId: string) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionIndex]: {
          ...state.answers[questionIndex],
          audioRecordings: state.answers[questionIndex].audioRecordings.filter(
            (rec) => rec.id !== recordingId
          ),
        },
      },
    })),
    
  updateNotes: (questionIndex: number, notes: string) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionIndex]: {
          audioRecordings: state.answers[questionIndex]?.audioRecordings || [],
          notes,
        },
      },
    })),
}));