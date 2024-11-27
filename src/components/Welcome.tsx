import React from 'react';
import { useInterviewStore } from '../store';
import { Mic, ClipboardList } from 'lucide-react';

export const Welcome = () => {
  const setCurrentStep = useInterviewStore((state) => state.setCurrentStep);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Experteninterview
        </h1>
        <p className="text-lg text-gray-600">
          Vorab vielen Dank für die Teilnahme an meinem Interview. Hier ein paar wichtige Informationen:
        </p>
        <ul className="space-y-2">
          <li className="flex items-center justify-center space-x-2">
            <span>➔</span>
            <span>Bitte füllen Sie das Interview am Computer aus.</span>
          </li>
          <li className="flex items-center justify-center space-x-2">
            <span>➔</span>
            <span>Verwenden Sie bitte die Audio Antworten, wenn möglich.</span>
          </li>
          <li className="flex items-center justify-center space-x-2">
            <span>➔</span>
            <span>Alternativ gerne auch schriftlich oder mit entsprechenden Notizen.</span>
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-gray-700">
            <Mic className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">Audio-Aufnahmen</h3>
              <p className="text-sm">Nehmen Sie Ihre Antworten bequem als Audio auf</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-gray-700">
            <ClipboardList className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">Zusätzliche Notizen</h3>
              <p className="text-sm">Ergänzen Sie Ihre Antworten mit schriftlichen Notizen</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-500 mb-4">
            Durch die Teilnahme stimmen Sie den{" "}
            <a href="https://magic-pick-c90.notion.site/Datenschutzerkl-rung-13d59a25da4680a19b3cdbb8e1cc850b" className="text-blue-600 hover:underline">
              Datenschutzbestimmungen
            </a>{" "}
            zu.
          </p>
          <button
            onClick={() => setCurrentStep(1)}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Interview starten
          </button>
        </div>
      </div>

      {/* Neue Section: Vorstellung */}
      <div className="bg-gray-100 rounded-xl shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Über die Bachelorarbeit
        </h2>
        <p className="text-md text-gray-700 text-center">
          Mein Name ist Henry Owen, und ich studiere Betriebswirtschaftslehre
          an der Universität Siegen. Im Rahmen meiner Bachelorarbeit beschäftige ich
          mich mit dem Thema:
        </p>
        <p className="text-md text-blue-600 text-center font-semibold">
          „Social Entrepreneurship: Erfolgsfaktoren für nachhaltige Geschäftsmodelle 
          in Start-Ups und KMUs“.
        </p>
        <p className="text-md text-gray-700 text-center">
          Ziel der Arbeit ist es, die wichtigsten Erfolgsfaktoren für nachhaltige Geschäftsmodelle
          im Bereich des Social Entrepreneurships zu identifizieren und praxisorientierte 
          Handlungsempfehlungen abzuleiten.
        </p>
      </div>
    </div>
  );
};
