/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Stethoscope, 
  History, 
  Beaker, 
  Image as ImageIcon, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Activity,
  FileText,
  Search,
  PlusCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { analyzeClinicalData, ClinicalAnalysis } from "./services/geminiService";

export default function App() {
  const [symptoms, setSymptoms] = useState("");
  const [history, setHistory] = useState("");
  const [labs, setLabs] = useState("");
  const [imaging, setImaging] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ClinicalAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!symptoms || !history) {
      setError("Please provide at least symptoms and medical history.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeClinicalData({ symptoms, history, labs, imaging });
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError("An error occurred during analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadExample = () => {
    setSymptoms("Severe chest pain radiating to the left arm, shortness of breath, diaphoresis.");
    setHistory("55-year-old male, smoker, history of hypertension and hyperlipidemia. Family history of early CAD.");
    setLabs("Troponin I: 0.5 ng/mL (Elevated), LDL: 160 mg/dL.");
    setImaging("ECG shows ST-segment elevation in leads V1-V4.");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Stethoscope size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">MediSense AI</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Clinical Decision Support</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={loadExample} className="text-blue-600 border-blue-200 hover:bg-blue-50">
              Load Example Case
            </Button>
            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
              <span className="text-xs font-bold text-slate-600">DR</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Input Section */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="text-blue-600" size={20} />
                  Patient Data Entry
                </CardTitle>
                <CardDescription>Enter clinical information for analysis</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Activity size={16} className="text-red-500" />
                    Symptoms & Chief Complaint
                  </label>
                  <Textarea 
                    placeholder="Describe current symptoms..." 
                    className="min-h-[100px] bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <History size={16} className="text-blue-500" />
                    Medical History
                  </label>
                  <Textarea 
                    placeholder="Past medical history, medications, allergies..." 
                    className="min-h-[100px] bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    value={history}
                    onChange={(e) => setHistory(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold flex items-center gap-2">
                      <Beaker size={16} className="text-purple-500" />
                      Lab Results
                    </label>
                    <Textarea 
                      placeholder="Blood work, vitals..." 
                      className="min-h-[80px] bg-slate-50 border-slate-200 focus:bg-white transition-colors text-sm"
                      value={labs}
                      onChange={(e) => setLabs(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold flex items-center gap-2">
                      <ImageIcon size={16} className="text-emerald-500" />
                      Imaging Data
                    </label>
                    <Textarea 
                      placeholder="X-ray, MRI, ECG notes..." 
                      className="min-h-[80px] bg-slate-50 border-slate-200 focus:bg-white transition-colors text-sm"
                      value={imaging}
                      onChange={(e) => setImaging(e.target.value)}
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Input Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100 py-6 text-lg font-semibold"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing Clinical Data...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Run Diagnostic Analysis
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
              <AlertTriangle className="text-blue-600 shrink-0" size={20} />
              <p className="text-xs text-blue-800 leading-relaxed">
                <strong>Disclaimer:</strong> This tool is for educational and clinical decision support purposes only. 
                It is not a substitute for professional medical judgment, diagnosis, or treatment. 
                Always consult with a qualified healthcare provider.
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!analysis && !isAnalyzing ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-200 rounded-3xl bg-white/50"
                >
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6">
                    <Activity size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">Ready for Analysis</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    Enter patient symptoms and history on the left to generate an AI-powered clinical analysis.
                  </p>
                </motion.div>
              ) : isAnalyzing ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <Card className="border-slate-200 animate-pulse">
                    <div className="h-48 bg-slate-100 rounded-t-xl" />
                    <CardContent className="p-6 space-y-4">
                      <div className="h-4 bg-slate-100 rounded w-3/4" />
                      <div className="h-4 bg-slate-100 rounded w-1/2" />
                      <div className="h-20 bg-slate-100 rounded w-full" />
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Summary & Critical Flags */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-slate-200 shadow-sm border-l-4 border-l-blue-600">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Clinical Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-700 leading-relaxed">{analysis?.summary}</p>
                      </CardContent>
                    </Card>

                    {analysis?.criticalFlags && analysis.criticalFlags.length > 0 && (
                      <Card className="border-red-200 bg-red-50 shadow-sm border-l-4 border-l-red-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-bold uppercase tracking-wider text-red-600 flex items-center gap-2">
                            <AlertTriangle size={16} />
                            Critical Flags
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-1">
                            {analysis.criticalFlags.map((flag, i) => (
                              <li key={i} className="text-red-800 text-sm font-medium flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                                {flag}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* Diagnoses */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <PlusCircle size={20} className="text-blue-600" />
                      Potential Diagnoses
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {analysis?.potentialDiagnoses.map((diag, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Card className={`border-slate-200 overflow-hidden hover:border-blue-300 transition-all ${diag.critical ? 'ring-1 ring-red-100' : ''}`}>
                            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <CardTitle className="text-lg font-bold">{diag.diagnosis}</CardTitle>
                                  {diag.critical && (
                                    <Badge variant="destructive" className="animate-pulse">CRITICAL</Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Progress value={diag.confidence} className="w-24 h-2" />
                                  <span className="text-xs font-bold text-slate-500">{diag.confidence}% Confidence</span>
                                </div>
                              </div>
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${diag.confidence > 70 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                <CheckCircle2 size={24} />
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-slate-200 pl-3">
                                {diag.reasoning}
                              </p>
                              <div className="space-y-2">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Recommended Tests</p>
                                <div className="flex flex-wrap gap-2">
                                  {diag.recommendedTests.map((test, j) => (
                                    <Badge key={j} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
                                      {test}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Next Steps */}
                  <Card className="border-slate-200 shadow-sm bg-slate-900 text-white">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <ChevronRight className="text-blue-400" />
                        Recommended Next Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {analysis?.nextSteps.map((step, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 font-bold text-xs">
                              {i + 1}
                            </div>
                            <p className="text-sm text-slate-300">{step}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-12 text-center text-slate-400 text-sm">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Stethoscope size={16} />
          <span className="font-bold tracking-tight text-slate-500">MediSense AI</span>
        </div>
        <p>© 2026 Clinical Decision Support System. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
}
