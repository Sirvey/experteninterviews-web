import React, { useState, useRef } from 'react';
import { Mic, Square, Trash2, Download } from 'lucide-react';

interface Props {
  onRecordingComplete: (recording: { blob: Blob; duration: number }) => void;
  onDelete: (id: string) => void;
  recordings: Array<{ id: string; url: string; duration: number }>;
}

export const AudioRecorder: React.FC<Props> = ({
  onRecordingComplete,
  onDelete,
  recordings,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const startTime = useRef<number>(0);

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      chunks.current = [];

      mediaRecorder.current.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm' });
        const duration = (Date.now() - startTime.current) / 1000;
        onRecordingComplete({ blob, duration });
      };

      mediaRecorder.current.start();
      startTime.current = Date.now();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setShowDeleteConfirm(id);
  };

  const confirmDelete = (id: string) => {
    onDelete(id);
    setShowDeleteConfirm(null);
  };

  return (
    <div className="space-y-4">
      {/* Aufnahme Button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-3 rounded-full ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors`}
        >
          {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
        <span className="text-sm text-gray-600">
          {isRecording ? 'Aufnahme läuft...' : 'Klicken zum Aufnehmen'}
        </span>
      </div>

      {/* Aufgenommene Audios anzeigen */}
      {recordings.length > 0 && (
        <div className="space-y-2">
          {recordings.map((recording) => (
            <div
              key={recording.id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {/* Audio-Wiedergabe */}
                <audio src={recording.url} controls className="h-8" />
                {/* Dauer der Aufnahme */}
                <span className="text-sm text-gray-600">
                  {formatDuration(recording.duration)} mm:ss
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {/* Herunterladen-Button */}
                <a
                  href={recording.url}
                  download={`audio-${recording.id}.webm`}
                  className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Download className="w-5 h-5" />
                </a>
                {/* Löschen-Button */}
                {showDeleteConfirm === recording.id ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => confirmDelete(recording.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Löschen
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(null)}
                      className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                      Abbr.
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleDeleteClick(recording.id)}
                    className="p-2 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
