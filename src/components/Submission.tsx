import React, { useEffect, useState } from 'react';
import { useInterviewStore } from '../store';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const Submission = () => {
  const { personalInfo, answers, setCurrentStep } = useInterviewStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const submitInterview = async () => {
      setIsSubmitting(true);
      try {
        // Hochladen der Audioaufnahmen und URLs abrufen
        const audioUploads = await Promise.all(
          Object.entries(answers).flatMap(([questionIndex, answer]) =>
            answer.audioRecordings.map(async (recording) => {
              const storageRef = ref(
                storage,
                `experten/${Date.now()}-q${questionIndex}-${recording.id}.webm`
              );
              await uploadBytes(storageRef, recording.blob);
              const url = await getDownloadURL(storageRef);
              return {
                questionIndex,
                recordingId: recording.id,
                url,
                duration: recording.duration,
              };
            })
          )
        );

        // Strukturierte Daten für Firestore vorbereiten
        const interviewData = {
          personalInfo,
          timestamp: new Date(),
          answers: Object.entries(answers).map(([questionIndex, answer]) => ({
            questionIndex: parseInt(questionIndex),
            notes: answer.notes,
            audioRecordings: audioUploads
              .filter((audio) => audio.questionIndex === questionIndex)
              .map(({ url, duration, recordingId }) => ({
                url,
                duration,
                id: recordingId,
              })),
          })),
        };

        // Daten in Firestore speichern
        await addDoc(collection(db, 'experten'), interviewData);
        setIsSubmitted(true);
      } catch (error) {
        console.error('Error submitting interview:', error);
        alert('Es gab einen Fehler beim Speichern des Interviews. Bitte versuchen Sie es erneut.');
      } finally {
        setIsSubmitting(false);
      }
    };

    submitInterview();
  }, [answers, personalInfo]);

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Vielen Dank, {personalInfo.firstName}! 😄
          </h2>
          <p className="text-gray-600">
            Das Interview wurde erfolgreich gespeichert ✅
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Bitte kurz warten, das Interview wird abgeschickt...
        </h2>
        {isSubmitting && (
          <p className="text-gray-600">Die Daten werden verarbeitet und hochgeladen ⚙️</p>
        )}
      </div>
    </div>
  );
};
