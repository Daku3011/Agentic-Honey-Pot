import React, { useState, useEffect } from "react";
import {
  Shield,
  Activity,
  Search,
  MessageSquare,
  Database,
  AlertTriangle,
  ExternalLink,
  Target,
  RefreshCcw,
  User,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [sessions, setSessions] = useState([
    {
      id: "wertyu-dfghj-ertyui",
      status: "Active",
      scamDetected: true,
      sender: "+91 98765 43210",
      channel: "SMS",
      lastMsg: "Share your UPI ID to avoid account suspension.",
      intelCount: 3,
      startTime: "10:15 AM",
      messages: 5,
    },
    {
      id: "abcde-12345-fghij",
      status: "Monitoring",
      scamDetected: true,
      sender: "support@bank-verify.cc",
      channel: "Email",
      lastMsg: "Click here to reactivate your card.",
      intelCount: 1,
      startTime: "11:20 AM",
      messages: 2,
    },
    {
      id: "zxcvb-67890-mnbvc",
      status: "Engagement",
      scamDetected: true,
      sender: "+91 88888 11111",
      channel: "WhatsApp",
      lastMsg: "Verify your identity using this link.",
      intelCount: 2,
      startTime: "11:45 AM",
      messages: 8,
    },
  ]);

  const [selectedSession, setSelectedSession] = useState(sessions[0]);

  return (
    <div className="min-h-screen p-6 md:p-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold gradient-text">
            ANTIGRAVITY HONEY-POT
          </h1>
          <p className="text-text-dim mt-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-accent-cyan" />
            Active Scam Detection & Intelligence Extraction
          </p>
        </div>
        <div className="flex gap-4">
          <button className="glass px-4 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors">
            <RefreshCcw className="w-4 h-4" /> Refresh
          </button>
          <div className="glass px-4 py-2 flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
            <span className="text-sm font-medium">System Online</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Stats & Sessions */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-4">
              <p className="text-xs text-text-dim mb-1 uppercase tracking-wider">
                Total Detected
              </p>
              <h3 className="text-2xl font-bold text-accent-rose">124</h3>
            </div>
            <div className="glass p-4">
              <p className="text-xs text-text-dim mb-1 uppercase tracking-wider">
                Intel Extracted
              </p>
              <h3 className="text-2xl font-bold text-accent-cyan">482</h3>
            </div>
          </div>

          {/* Session List */}
          <div className="glass p-5 flex flex-col h-[600px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Activity className="w-5 h-5 text-accent-purple" /> Active
                Sessions
              </h2>
              <span className="text-xs bg-accent-purple/20 text-accent-purple px-2 py-1 rounded-full">
                {sessions.length} Live
              </span>
            </div>

            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              {sessions.map((session) => (
                <motion.div
                  key={session.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedSession(session)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedSession.id === session.id ? "bg-white/10 border-accent-purple/50" : "bg-white/5 border-white/5"}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-1.5 rounded-lg ${session.channel === "SMS" ? "bg-orange-500/20 text-orange-400" : session.channel === "Email" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"}`}
                      >
                        {session.channel === "SMS" ? (
                          <MessageSquare size={14} />
                        ) : session.channel === "Email" ? (
                          <Database size={14} />
                        ) : (
                          <User size={14} />
                        )}
                      </div>
                      <span className="font-medium text-sm">
                        {session.sender}
                      </span>
                    </div>
                    <span className="text-[10px] text-text-dim">
                      {session.startTime}
                    </span>
                  </div>
                  <p className="text-xs text-text-dim truncate italic">
                    "{session.lastMsg}"
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[10px] text-accent-cyan">
                        <Target size={10} /> {session.intelCount} Intel
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-text-dim">
                        <MessageSquare size={10} /> {session.messages} Msgs
                      </div>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${session.status === "Active" ? "bg-red-500/10 text-red-400" : "bg-yellow-500/10 text-yellow-400"}`}
                    >
                      {session.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed View */}
        <div className="lg:col-span-8 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSession.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass p-6 min-h-[700px] flex flex-col"
            >
              {/* Session Header */}
              <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center font-bold text-xl">
                    {selectedSession.sender[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      {selectedSession.sender}
                    </h3>
                    <p className="text-sm text-text-dim">
                      Session ID: {selectedSession.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 flex items-center gap-2 text-sm">
                    <AlertTriangle size={16} /> Scam Detected
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
                {/* Chat Log (Mock) */}
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-text-dim mb-4 flex items-center gap-2">
                    <MessageSquare size={16} className="text-accent-purple" />{" "}
                    Engagement Log
                  </h4>
                  <div className="bg-black/30 rounded-xl p-4 flex-grow overflow-y-auto space-y-4 max-h-[500px]">
                    <div className="flex flex-col items-start max-w-[80%]">
                      <div className="bg-white/10 p-3 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl text-sm mb-1">
                        Your bank account will be blocked today. Verify
                        immediately.
                      </div>
                      <span className="text-[10px] text-text-dim ml-1">
                        Scammer • 10:15 AM
                      </span>
                    </div>
                    <div className="flex flex-col items-end self-end max-w-[80%]">
                      <div className="bg-accent-purple/20 border border-accent-purple/30 p-3 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl text-sm mb-1">
                        Wait, why will it be blocked? I haven't done anything
                        wrong.
                      </div>
                      <span className="text-[10px] text-text-dim mr-1">
                        Agent • 10:16 AM
                      </span>
                    </div>
                    <div className="flex flex-col items-start max-w-[80%]">
                      <div className="bg-white/10 p-3 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl text-sm mb-1">
                        Security concern. Share your UPI ID to avoid account
                        suspension.
                      </div>
                      <span className="text-[10px] text-text-dim ml-1">
                        Scammer • 10:17 AM
                      </span>
                    </div>
                    <div className="flex flex-col items-end self-end max-w-[80%]">
                      <div className="bg-accent-purple/20 border border-accent-purple/30 p-3 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl text-sm mb-1">
                        I'm not sure how to find my UPI ID. Is it on my bank
                        card?
                      </div>
                      <span className="text-[10px] text-text-dim mr-1">
                        Agent • 10:18 AM
                      </span>
                    </div>
                  </div>
                </div>

                {/* Intelligence Extraction */}
                <div className="flex flex-col space-y-6">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-text-dim mb-4 flex items-center gap-2">
                      <Target size={16} className="text-accent-cyan" />{" "}
                      Intelligence Report
                    </h4>
                    <div className="space-y-3">
                      <div className="glass p-3 flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded bg-accent-cyan/10 text-accent-cyan">
                            <Database size={16} />
                          </div>
                          <div>
                            <p className="text-[10px] text-text-dim font-medium uppercase">
                              UPI ID
                            </p>
                            <p className="text-sm font-mono tracking-wider">
                              scammer@okhdfc
                            </p>
                          </div>
                        </div>
                        <ExternalLink
                          size={14}
                          className="text-text-dim opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        />
                      </div>
                      <div className="glass p-3 flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded bg-accent-purple/10 text-accent-purple">
                            <RefreshCcw size={16} />
                          </div>
                          <div>
                            <p className="text-[10px] text-text-dim font-medium uppercase">
                              Bank Account
                            </p>
                            <p className="text-sm font-mono tracking-wider">
                              XXXX-XXXX-8821
                            </p>
                          </div>
                        </div>
                        <ExternalLink
                          size={14}
                          className="text-text-dim opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        />
                      </div>
                      <div className="glass p-3 flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded bg-accent-rose/10 text-accent-rose">
                            <ExternalLink size={16} />
                          </div>
                          <div>
                            <p className="text-[10px] text-text-dim font-medium uppercase">
                              Phishing Link
                            </p>
                            <p className="text-sm font-mono tracking-wider text-accent-rose">
                              http://verify-link.cz/auth
                            </p>
                          </div>
                        </div>
                        <ExternalLink
                          size={14}
                          className="text-text-dim opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-text-dim mb-4">
                      Tactics Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 uppercase tracking-widest">
                        Urgency
                      </span>
                      <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 uppercase tracking-widest">
                        Redirection
                      </span>
                      <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 uppercase tracking-widest">
                        Social Engineering
                      </span>
                    </div>
                  </div>

                  <div className="glass p-4 mt-auto">
                    <p className="text-xs text-text-dim mb-2 flex items-center gap-2">
                      <TrendingUp size={12} className="text-green-400" />{" "}
                      Confidence Score
                    </p>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "98%" }}
                        className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan"
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] font-bold">
                      <span>Low risk</span>
                      <span className="text-accent-cyan">98.4% Confidence</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
