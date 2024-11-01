import React, { useState, useCallback } from 'react';
import { Shield, Upload, Mail, AlertCircle } from 'lucide-react';
import FileUploader from './components/FileUploader';
import AnalysisResult from './components/AnalysisResult';
import Header from './components/Header';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleFileUpload = useCallback((uploadedFile: File) => {
    setFile(uploadedFile);
    setIsAnalyzing(true);
    
    // Simuleer analyse (in werkelijkheid zou dit een AI-service aanroepen)
    setTimeout(() => {
      setAnalysisResult("We hebben een mogelijk phishing-probleem gedetecteerd. Dit lijkt op een poging om gevoelige gegevens te verkrijgen. Advies: Klik niet op verdachte links en deel nooit persoonlijke informatie via e-mail.");
      setIsAnalyzing(false);
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <main className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
              <div className="flex items-center space-x-4 mb-4">
                <Upload className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-semibold text-white">Afbeelding Analyseren</h2>
              </div>
              <p className="text-slate-300">Upload een screenshot van een verdacht bericht of beveiligingsprobleem.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
              <div className="flex items-center space-x-4 mb-4">
                <Mail className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-semibold text-white">Email Analyseren</h2>
              </div>
              <p className="text-slate-300">Laat ons controleren of een e-mail verdacht is.</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <FileUploader onFileUpload={handleFileUpload} isAnalyzing={isAnalyzing} />
            
            {file && (
              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <p className="text-white flex items-center">
                  <Shield className="w-5 h-5 text-emerald-400 mr-2" />
                  Uw bestand wordt veilig en privé verwerkt
                </p>
              </div>
            )}

            {analysisResult && <AnalysisResult result={analysisResult} />}
          </div>

          <div className="mt-8 bg-yellow-500/10 rounded-xl p-6 border border-yellow-500/20">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-yellow-500">Privacy Garantie</h3>
                <p className="mt-2 text-slate-300">
                  Alle analyses worden lokaal uitgevoerd. Uw gegevens blijven privé en worden nooit opgeslagen of gedeeld met derden.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;