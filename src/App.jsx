import React, { useState } from "react";
import { MODULE_1, DIAGRAMS, QUIZZES } from "./data.jsx";
import { MODULE_2, DIAGRAMS_M2, QUIZZES_M2 } from "./data_m2.jsx";
import { MODULE_3, DIAGRAMS_M3, QUIZZES_M3 } from "./data_m3.jsx";
import { MODULE_4, DIAGRAMS_M4, QUIZZES_M4 } from "./data_m4.jsx";

const ALL_MODULES = [MODULE_1, MODULE_2, MODULE_3, MODULE_4];
const ALL_DIAGRAMS = { ...DIAGRAMS, ...DIAGRAMS_M2, ...DIAGRAMS_M3, ...DIAGRAMS_M4 };
const ALL_QUIZZES = { ...QUIZZES, ...QUIZZES_M2, ...QUIZZES_M3, ...QUIZZES_M4 };

// ─── FONTS ───────────────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Geist:wght@300;400;500;600&display=swap";
document.head.appendChild(fontLink);

// ─── AI HINT (stub — swap to real Gemini endpoint) ────────────────────────────
async function getAIHint(context) {
  await new Promise((r) => setTimeout(r, 900));
  const hints = {
    default: `Think about what value would make the loop iterate exactly 8 times, once for each bit position. Remember bits are numbered from 7 (most significant) down to 0 (least significant).`,
    blank_1: `The loop counts from some starting number down to 0. How many bits are in a byte? Count them and subtract 1.`,
    blank_2: `You want to isolate a single bit. What number has exactly one bit set? After shifting, AND with that number.`,
    reflect: `Great question for reflection. Think about readability — how many characters does FF take vs 11111111? Also think about alignment: memory addresses often appear in 4-byte chunks. What would aligned addresses look like in hex?`,
  };
  return hints[context] || hints.default;
}

// ─── LOCAL STORAGE HELPERS ────────────────────────────────────────────────────
const STORAGE_KEY = "memlab_progress_v1";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Optional catch
  }
}

const btnStyle = (color, bg) => ({
  background: bg,
  border: `1px solid ${color}40`,
  color,
  fontFamily: "DM Mono",
  fontSize: 12,
  padding: "7px 16px",
  borderRadius: 6,
  cursor: "pointer",
  letterSpacing: 0.5,
  transition: "all 0.15s",
});

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Flashcard({ card }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onClick={() => setFlipped((f) => !f)}
      style={{
        cursor: "pointer",
        perspective: 800,
        height: 140,
        marginTop: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.45s cubic-bezier(.4,0,.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div /* Front */
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            background: "rgba(0,255,136,0.06)",
            border: "1px solid rgba(0,255,136,0.2)",
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            gap: 8,
          }}
        >
          <span style={{ color: "#00ff88", fontSize: 10, fontFamily: "DM Mono", letterSpacing: 2 }}>FLASHCARD · CLICK TO FLIP</span>
          <span style={{ color: "#ddd", fontSize: 14, fontFamily: "Geist", textAlign: "center", lineHeight: 1.5 }}>
            {card.front}
          </span>
        </div>
        <div /* Back */
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "rgba(0,136,255,0.06)",
            border: "1px solid rgba(0,136,255,0.25)",
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            gap: 8,
          }}
        >
          <span style={{ color: "#4488ff", fontSize: 10, fontFamily: "DM Mono", letterSpacing: 2 }}>ANSWER</span>
          <span style={{ color: "#ccc", fontSize: 13, fontFamily: "Geist", textAlign: "center", lineHeight: 1.6 }}>
            {card.back}
          </span>
        </div>
      </div>
    </div>
  );
}

function CodeBlock({ lines, annotations }) {
  const [hoveredLine, setHoveredLine] = useState(null);
  return (
    <div style={{ position: "relative" }}>
      <div style={{ background: "#0a0a0a", border: "1px solid #1e1e1e", borderRadius: 8, overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 6, padding: "10px 14px", borderBottom: "1px solid #141414" }}>
          {["#ff5f57", "#ffbd2e", "#28c840"].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
        </div>
        <div style={{ padding: "12px 0", overflowX: "auto" }}>
          {lines.map((line, i) => {
            const lineNum = i + 1;
            const ann = annotations?.find((a) => a.line === lineNum);
            const isHovered = hoveredLine === lineNum;
            return (
              <div
                key={i}
                onMouseEnter={() => ann && setHoveredLine(lineNum)}
                onMouseLeave={() => setHoveredLine(null)}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "1px 14px",
                  background: ann ? (isHovered ? "rgba(0,255,136,0.05)" : "rgba(0,255,136,0.02)") : "transparent",
                  transition: "background 0.15s",
                  cursor: ann ? "help" : "default",
                  borderLeft: ann ? "2px solid rgba(0,255,136,0.3)" : "2px solid transparent",
                }}
              >
                <span style={{ color: "#333", fontSize: 12, fontFamily: "DM Mono", minWidth: 22, textAlign: "right", userSelect: "none" }}>{lineNum}</span>
                <span style={{ color: ann ? "#e0ffe0" : "#b0b0b0", fontSize: 13, fontFamily: "DM Mono", whiteSpace: "pre", flex: 1 }}>{line}</span>
                {ann && isHovered && (
                  <span style={{ color: "#00ff88", fontSize: 11, fontFamily: "DM Mono", background: "#001a0d", border: "1px solid #00ff8830", borderRadius: 4, padding: "2px 8px", whiteSpace: "nowrap", maxWidth: 260 }}>
                    ← {ann.text}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {annotations && (
        <p style={{ color: "#444", fontSize: 11, fontFamily: "DM Mono", marginTop: 6 }}>↑ hover highlighted lines for annotations</p>
      )}
    </div>
  );
}

function DoSection({ doData, onComplete }) {
  const [blanks, setBlanks] = useState({});
  const [results, setResults] = useState(null);
  const [hint, setHint] = useState(null);
  const [loadingHint, setLoadingHint] = useState(false);

  const blankLines = doData.lines.filter((l) => l.blank !== undefined);

  function runTests() {
    const filledCode = doData.lines
      .map((l) => {
        if (l.blank !== undefined && !l.blank2) {
          const blankIdx = blankLines.indexOf(l);
          const val = blanks[blankIdx] ?? "";
          return l.code.replace(/___/, val);
        } else if (l.blank !== undefined && l.blank2 !== undefined) {
          const blankIdx = blankLines.indexOf(l);
          const parts = l.code.split("___");
          if(parts.length === 3) {
             const v1 = blanks[blankIdx + "_1"] ?? "";
             const v2 = blanks[blankIdx + "_2"] ?? "";
             return parts[0] + v1 + parts[1] + v2 + parts[2];
          }
        }
        return l.code;
      })
      .join("\\n");

    try {
      const fn = new Function(`${filledCode}\\nreturn ${doData.lines[0].code.match(/function (\\w+)/)?.[1]};`)();
      const testResults = doData.tests.map((t) => {
        try {
          const out = fn(t.input);
          return { ...t, out, pass: String(out) === String(t.expected) };
        } catch {
          return { ...t, out: "Error", pass: false };
        }
      });
      setResults(testResults);
      if (testResults.every((r) => r.pass)) setTimeout(() => onComplete(), 800);
    } catch (err) {
      setResults([{ label: "Syntax Error", out: err.message, pass: false }]);
    }
  }

  async function fetchHint() {
    setLoadingHint(true);
    setHint(null);
    const h = await getAIHint("default");
    setHint(h);
    setLoadingHint(false);
  }

  function revealAll() {
    const filled = {};
    blankLines.forEach((l, i) => { 
      if(l.blank2) {
        filled[i + "_1"] = l.blank;
        filled[i + "_2"] = l.blank2;
      } else {
        filled[i] = l.blank; 
      }
    });
    setBlanks(filled);
  }

  return (
    <div>
      <p style={{ color: "#888", fontSize: 13, fontFamily: "Geist", lineHeight: 1.6, marginBottom: 16 }}>{doData.prompt}</p>

      <div style={{ background: "#0a0a0a", border: "1px solid #1e1e1e", borderRadius: 8, overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 6, padding: "10px 14px", borderBottom: "1px solid #141414" }}>
          {["#ff5f57", "#ffbd2e", "#28c840"].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
          <span style={{ marginLeft: "auto", color: "#333", fontSize: 10, fontFamily: "DM Mono", letterSpacing: 1 }}>FILL IN THE BLANKS</span>
        </div>
        <div style={{ padding: "12px 0" }}>
          {doData.lines.map((line, i) => {
            if (line.blank !== undefined) {
              const blankIdx = blankLines.indexOf(line);
              let parts = line.code.split("___");
              
              if(line.blank2 && parts.length === 3) {
                 return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 0, padding: "2px 14px" }}>
                    <span style={{ color: "#444", fontSize: 12, fontFamily: "DM Mono", minWidth: 22, textAlign: "right", marginRight: 12 }}>{i + 1}</span>
                    <span style={{ color: "#b0b0b0", fontSize: 13, fontFamily: "DM Mono", whiteSpace: "pre" }}>{parts[0]}</span>
                    <input
                      value={blanks[blankIdx + "_1"] ?? ""}
                      onChange={(e) => setBlanks((b) => ({ ...b, [blankIdx + "_1"]: e.target.value }))}
                      style={{ background: "rgba(255,255,0,0.06)", border: "1px solid rgba(255,200,0,0.3)", borderRadius: 4, color: "#ffcc00", fontFamily: "DM Mono", fontSize: 13, padding: "1px 8px", width: 60, outline: "none", textAlign: "center" }}
                    />
                    <span style={{ color: "#b0b0b0", fontSize: 13, fontFamily: "DM Mono", whiteSpace: "pre" }}>{parts[1]}</span>
                    <input
                      value={blanks[blankIdx + "_2"] ?? ""}
                      onChange={(e) => setBlanks((b) => ({ ...b, [blankIdx + "_2"]: e.target.value }))}
                      style={{ background: "rgba(255,255,0,0.06)", border: "1px solid rgba(255,200,0,0.3)", borderRadius: 4, color: "#ffcc00", fontFamily: "DM Mono", fontSize: 13, padding: "1px 8px", width: 60, outline: "none", textAlign: "center" }}
                    />
                    <span style={{ color: "#b0b0b0", fontSize: 13, fontFamily: "DM Mono", whiteSpace: "pre" }}>{parts[2]}</span>
                  </div>
                 )
              } else {
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 0, padding: "2px 14px" }}>
                    <span style={{ color: "#444", fontSize: 12, fontFamily: "DM Mono", minWidth: 22, textAlign: "right", marginRight: 12 }}>{i + 1}</span>
                    <span style={{ color: "#b0b0b0", fontSize: 13, fontFamily: "DM Mono", whiteSpace: "pre" }}>{parts[0]}</span>
                    <input
                      value={blanks[blankIdx] ?? ""}
                      onChange={(e) => setBlanks((b) => ({ ...b, [blankIdx]: e.target.value }))}
                      placeholder="?"
                      style={{ background: blanks[blankIdx] ? "rgba(0,255,136,0.08)" : "rgba(255,255,0,0.06)", border: `1px solid ${blanks[blankIdx] ? "rgba(0,255,136,0.35)" : "rgba(255,200,0,0.3)"}`, borderRadius: 4, color: blanks[blankIdx] ? "#00ff88" : "#ffcc00", fontFamily: "DM Mono", fontSize: 13, padding: "1px 8px", width: Math.max(60, (blanks[blankIdx]?.length || 1) * 9 + 20), outline: "none", textAlign: "center" }}
                    />
                    {parts[1] && <span style={{ color: "#b0b0b0", fontSize: 13, fontFamily: "DM Mono", whiteSpace: "pre" }}>{parts[1]}</span>}
                  </div>
                );
              }
            }
            return (
              <div key={i} style={{ display: "flex", gap: 12, padding: "2px 14px" }}>
                <span style={{ color: "#333", fontSize: 12, fontFamily: "DM Mono", minWidth: 22, textAlign: "right" }}>{i + 1}</span>
                <span style={{ color: "#666", fontSize: 13, fontFamily: "DM Mono", whiteSpace: "pre" }}>{line.code}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        <button onClick={runTests} style={btnStyle("#00ff88", "rgba(0,255,136,0.1)")}>▶ Run Tests</button>
        <button onClick={fetchHint} disabled={loadingHint} style={btnStyle("#4488ff", "rgba(68,136,255,0.1)")}>{loadingHint ? "…" : "⚡ AI Hint"}</button>
        <button onClick={revealAll} style={btnStyle("#555", "rgba(80,80,80,0.15)")}>👁 Reveal</button>
      </div>

      {hint && (
        <div style={{ marginTop: 14, padding: "12px 16px", background: "rgba(68,136,255,0.06)", border: "1px solid rgba(68,136,255,0.2)", borderRadius: 8, color: "#99bbff", fontSize: 13, fontFamily: "Geist", lineHeight: 1.7 }}>
          <span style={{ color: "#4488ff", fontFamily: "DM Mono", fontSize: 10, letterSpacing: 2 }}>AI HINT · </span>{hint}
        </div>
      )}

      {results && (
        <div style={{ marginTop: 14 }}>
          {results.map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 14px", marginBottom: 4, background: r.pass ? "rgba(0,255,136,0.05)" : "rgba(255,60,60,0.05)", border: `1px solid ${r.pass ? "rgba(0,255,136,0.15)" : "rgba(255,60,60,0.15)"}`, borderRadius: 6 }}>
              <span style={{ color: "#666", fontSize: 12, fontFamily: "DM Mono" }}>{r.label}</span>
              <span style={{ color: "#555", fontSize: 12, fontFamily: "DM Mono" }}>→ {String(r.out)}</span>
              <span style={{ color: r.pass ? "#00ff88" : "#ff4444", fontSize: 12, fontFamily: "DM Mono" }}>{r.pass ? "✓ PASS" : `✗ expected ${r.expected}`}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function QuizSection({ lessonId, onComplete }) {
  const questions = ALL_QUIZZES[lessonId] || [];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!questions.length) return null;

  const score = submitted ? questions.filter((q, i) => answers[i] === q.ans).length : 0;

  function submit() {
    setSubmitted(true);
    if (score === questions.length) setTimeout(onComplete, 800);
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <span style={{ color: "#00ff88", fontSize: 10, fontFamily: "DM Mono", letterSpacing: 2 }}>QUICK QUIZ · {questions.length} QUESTIONS</span>
      </div>
      {questions.map((q, qi) => (
        <div key={qi} style={{ marginBottom: 22 }}>
          <p style={{ color: "#ccc", fontSize: 14, fontFamily: "Geist", marginBottom: 10, lineHeight: 1.5 }}><span style={{ color: "#00ff8860", fontFamily: "DM Mono" }}>Q{qi + 1}. </span>{q.q}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {q.opts.map((opt, oi) => {
              const selected = answers[qi] === oi;
              const correct = submitted && oi === q.ans;
              const wrong = submitted && selected && oi !== q.ans;
              return (
                <div key={oi} onClick={() => !submitted && setAnswers((a) => ({ ...a, [qi]: oi }))}
                  style={{ padding: "9px 14px", borderRadius: 6, border: `1px solid ${correct ? "#00ff88" : wrong ? "#ff4444" : selected ? "rgba(68,136,255,0.5)" : "#1e1e1e"}`, background: correct ? "rgba(0,255,136,0.07)" : wrong ? "rgba(255,60,60,0.07)" : selected ? "rgba(68,136,255,0.07)" : "rgba(255,255,255,0.02)", cursor: submitted ? "default" : "pointer", display: "flex", gap: 10, alignItems: "center", transition: "all 0.15s" }}
                >
                  <span style={{ width: 18, height: 18, borderRadius: "50%", border: `1.5px solid ${correct ? "#00ff88" : wrong ? "#ff4444" : selected ? "#4488ff" : "#333"}`, background: selected ? (correct ? "#00ff88" : wrong ? "#ff4444" : "#4488ff") : "transparent", flexShrink: 0 }} />
                  <span style={{ color: correct ? "#00ff88" : wrong ? "#ff6666" : "#bbb", fontSize: 13, fontFamily: "Geist" }}>{opt}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      {!submitted ? (
        <button onClick={submit} disabled={Object.keys(answers).length < questions.length} style={{ ...btnStyle("#00ff88", "rgba(0,255,136,0.1)"), opacity: Object.keys(answers).length < questions.length ? 0.4 : 1 }}>Submit Answers</button>
      ) : (
        <div style={{ padding: "12px 16px", background: score === questions.length ? "rgba(0,255,136,0.08)" : "rgba(255,200,0,0.06)", border: `1px solid ${score === questions.length ? "rgba(0,255,136,0.2)" : "rgba(255,200,0,0.2)"}`, borderRadius: 8, color: score === questions.length ? "#00ff88" : "#ffcc00", fontFamily: "DM Mono", fontSize: 13 }}>
          {score === questions.length ? `✓ Perfect — ${score}/${questions.length}` : `${score}/${questions.length} correct — review the highlighted answers`}
        </div>
      )}
    </div>
  );
}

function ReflectSection({ question, onWrite }) {
  const [text, setText] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!text.trim()) return;
    setLoading(true);
    const r = await getAIHint("reflect");
    setAiResponse(r);
    setLoading(false);
    onWrite();
  }

  return (
    <div>
      <div style={{ padding: "16px 20px", background: "rgba(255,200,0,0.04)", border: "1px solid rgba(255,200,0,0.12)", borderRadius: 8, marginBottom: 16 }}>
        <span style={{ color: "#ffcc0060", fontFamily: "DM Mono", fontSize: 10, letterSpacing: 2 }}>REFLECT · </span>
        <span style={{ color: "#ddd", fontSize: 14, fontFamily: "Instrument Serif", fontStyle: "italic", lineHeight: 1.7 }}>{question}</span>
      </div>
      <textarea
        value={text} onChange={(e) => setText(e.target.value)} placeholder="Write your thinking here…"
        style={{ width: "100%", minHeight: 100, background: "rgba(255,255,255,0.02)", border: "1px solid #1e1e1e", borderRadius: 8, color: "#ccc", fontFamily: "Geist", fontSize: 13, padding: "12px 14px", resize: "vertical", outline: "none", lineHeight: 1.6, boxSizing: "border-box" }}
      />
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <button onClick={askAI} disabled={!text.trim() || loading} style={{ ...btnStyle("#ffcc00", "rgba(255,200,0,0.06)"), opacity: !text.trim() ? 0.4 : 1 }}>
          {loading ? "…" : "✦ Get AI Feedback"}
        </button>
      </div>
      {aiResponse && (
        <div style={{ marginTop: 14, padding: "14px 16px", background: "rgba(255,200,0,0.04)", border: "1px solid rgba(255,200,0,0.15)", borderRadius: 8, color: "#e6c97a", fontSize: 13, fontFamily: "Geist", lineHeight: 1.7 }}>
          <div style={{ color: "#ffcc0060", fontFamily: "DM Mono", fontSize: 10, letterSpacing: 2, marginBottom: 8 }}>AI RESPONSE</div>
          {aiResponse}
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function MemLab() {
  const [progress, setProgress] = useState(() => loadProgress());
  const [activeLesson, setActiveLesson] = useState("m1l1");
  const [activeSection, setActiveSection] = useState("concept");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const lessons = ALL_MODULES.flatMap((m) => m.lessons);
  const lesson = lessons.find((l) => l.id === activeLesson);
  const sections = lesson?.sections;

  function isUnlocked(lessonId) {
    if (lessonId === "m1l1") return true;
    const idx = lessons.findIndex((l) => l.id === lessonId);
    if (idx <= 0) return true;
    return !!progress[lessons[idx - 1].id]?.completed;
  }

  function markSectionDone(lessonId, sectionKey) {
    setProgress((prev) => {
      const updated = {
        ...prev,
        [lessonId]: {
          ...prev[lessonId],
          [sectionKey]: true,
        },
      };
      const s = updated[lessonId];
      if (s?.concept && s?.observe && s?.do && s?.reflect) {
        updated[lessonId].completed = true;
      }
      saveProgress(updated);
      return updated;
    });
  }

  const totalSections = lessons.length * 4;
  const doneSections = lessons.reduce((acc, l) => {
    const p = progress[l.id] || {};
    return acc + ["concept", "observe", "do", "reflect"].filter((s) => p[s]).length;
  }, 0);
  const progressPct = Math.round((doneSections / totalSections) * 100);

  const SECTION_ORDER = ["concept", "observe", "do", "reflect"];
  const sectionLabels = { concept: "Concept", observe: "Observe", do: "Do", reflect: "Reflect" };

  function nextSection() {
    markSectionDone(activeLesson, activeSection);
    const idx = SECTION_ORDER.indexOf(activeSection);
    if (idx < SECTION_ORDER.length - 1) {
      setActiveSection(SECTION_ORDER[idx + 1]);
    } else {
      markSectionDone(activeLesson, "reflect");
      const lessonIdx = lessons.findIndex((l) => l.id === activeLesson);
      if (lessonIdx < lessons.length - 1) {
        const nextLesson = lessons[lessonIdx + 1];
        setActiveLesson(nextLesson.id);
        setActiveSection("concept");
      }
    }
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "#080808", color: "#ddd", fontFamily: "Geist, sans-serif", overflow: "hidden" }}>
      {/* ── SIDEBAR ── */}
      <div style={{ width: sidebarOpen ? 260 : 0, minWidth: sidebarOpen ? 260 : 0, transition: "width 0.25s cubic-bezier(.4,0,.2,1), min-width 0.25s", overflow: "hidden", borderRight: "1px solid #111", display: "flex", flexDirection: "column", background: "#060606" }}>
        <div style={{ padding: "20px 20px 12px" }}>
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ color: "#444", fontSize: 10, fontFamily: "DM Mono" }}>TOTAL PROGRESS</span>
              <span style={{ color: "#00ff88", fontSize: 10, fontFamily: "DM Mono" }}>{progressPct}%</span>
            </div>
            <div style={{ height: 3, background: "#111", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progressPct}%`, background: "linear-gradient(90deg, #00cc66, #00ff88)", borderRadius: 2, transition: "width 0.6s cubic-bezier(.4,0,.2,1)" }} />
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: "0 10px 16px" }}>
          {ALL_MODULES.map((mod, mi) => (
            <div key={mod.id} style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, paddingLeft: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 6, background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00ff88", fontSize: 10, fontFamily: "DM Mono", fontWeight: "500" }}>
                  {mod.icon}
                </div>
                <div>
                  <div style={{ color: "#eee", fontSize: 13, fontFamily: "Geist", fontWeight: 500 }}>{mod.title}</div>
                  <div style={{ color: "#444", fontSize: 10, fontFamily: "DM Mono", letterSpacing: 1 }}>MODULE {mi + 1}</div>
                </div>
              </div>

              {mod.lessons.map((l, li) => {
                const unlocked = isUnlocked(l.id);
                const active = l.id === activeLesson;
                const lessonProgress = progress[l.id] || {};
                const lessonDone = lessonProgress.completed;

                return (
                  <div key={l.id} style={{ marginBottom: 4 }}>
                    <div onClick={() => unlocked && (setActiveLesson(l.id), setActiveSection("concept"))}
                      style={{ padding: "10px 12px", borderRadius: 8, cursor: unlocked ? "pointer" : "not-allowed", background: active ? "rgba(0,255,136,0.07)" : "transparent", border: `1px solid ${active ? "rgba(0,255,136,0.15)" : "transparent"}`, opacity: unlocked ? 1 : 0.35, transition: "all 0.15s" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <span style={{ width: 20, height: 20, borderRadius: "50%", background: lessonDone ? "#00ff88" : active ? "rgba(0,255,136,0.15)" : "rgba(255,255,255,0.04)", border: `1.5px solid ${lessonDone ? "#00ff88" : active ? "rgba(0,255,136,0.4)" : "#1e1e1e"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: lessonDone ? "#000" : "#333", flexShrink: 0 }}>
                            {lessonDone ? "✓" : li + 1}
                          </span>
                          <span style={{ color: active ? "#eee" : "#888", fontSize: 12, fontFamily: "Geist", fontWeight: active ? 500 : 400 }}>{l.title}</span>
                        </div>
                        {!unlocked && <span style={{ color: "#333", fontSize: 10 }}>🔒</span>}
                      </div>
                      {active && (
                        <div style={{ display: "flex", gap: 5, marginTop: 8, paddingLeft: 28 }}>
                          {SECTION_ORDER.map((s) => (
                            <div key={s} onClick={(e) => { e.stopPropagation(); setActiveSection(s); }}
                              style={{ width: 28, height: 4, borderRadius: 2, background: s === activeSection ? "#00ff88" : lessonProgress[s] ? "rgba(0,255,136,0.35)" : "#1a1a1a", cursor: "pointer", transition: "background 0.15s" }}
                              title={sectionLabels[s]} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
        <header style={{ height: 60, borderBottom: "1px solid #111", display: "flex", alignItems: "center", padding: "0 24px", gap: 16, background: "rgba(8,8,8,0.8)", backdropFilter: "blur(12px)", zIndex: 10 }}>
          <button onClick={() => setSidebarOpen((o) => !o)} style={{ background: "transparent", border: "none", color: "#888", cursor: "pointer", padding: 4 }}>☰</button>
          <div style={{ color: "#eee", fontSize: 14, fontFamily: "Geist", fontWeight: 500 }}>{lesson?.title}</div>
          <div style={{ color: "#444", fontSize: 13 }}>/</div>
          <div style={{ color: "#888", fontSize: 13, fontFamily: "Geist" }}>{sectionLabels[activeSection]}</div>
        </header>

        <div style={{ flex: 1, overflow: "auto", position: "relative" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 120px" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 40 }}>
              {SECTION_ORDER.map((sec) => (
                <button key={sec} onClick={() => setActiveSection(sec)}
                  style={{ background: activeSection === sec ? "rgba(0,255,136,0.1)" : "transparent", color: activeSection === sec ? "#00ff88" : "#666", border: `1px solid ${activeSection === sec ? "rgba(0,255,136,0.2)" : "transparent"}`, padding: "6px 16px", borderRadius: 20, fontFamily: "DM Mono", fontSize: 12, cursor: "pointer", transition: "all 0.15s" }}>
                  {sectionLabels[sec]}
                </button>
              ))}
            </div>

            {activeSection === "concept" && sections && (
              <div className="section-enter">
                <h1 style={{ color: "#eee", fontSize: 36, fontFamily: "Instrument Serif", marginBottom: 24, fontStyle: "italic" }}>{sections.concept.title}</h1>
                <div style={{ color: "#aaa", fontSize: 15, fontFamily: "Geist", lineHeight: 1.8, marginBottom: 32, whiteSpace: "pre-wrap" }}>{sections.concept.body}</div>
                
                <h3 style={{ color: "#fff", fontSize: 13, fontFamily: "DM Mono", marginBottom: 12, marginTop: 32 }}>KEY POINTS</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {sections.concept.keyPoints.map((kp, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, alignItems: "center", color: "#ccc", fontSize: 14 }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#00ff88" }} />
                      {kp}
                    </li>
                  ))}
                </ul>

                <h3 style={{ color: "#fff", fontSize: 13, fontFamily: "DM Mono", marginBottom: 12, marginTop: 40 }}>FLASHCARD</h3>
                <Flashcard card={sections.concept.flashcard} />
              </div>
            )}

            {activeSection === "observe" && sections && (
              <div className="section-enter">
                <h1 style={{ color: "#eee", fontSize: 36, fontFamily: "Instrument Serif", marginBottom: 24, fontStyle: "italic" }}>{sections.observe.title}</h1>
                <div style={{ marginBottom: 40 }}>
                  <CodeBlock lines={sections.observe.code.split("\\n")} annotations={sections.observe.annotations} />
                </div>
                {sections.observe.diagram && ALL_DIAGRAMS[sections.observe.diagram] && (
                  <div style={{ padding: 24, background: "rgba(255,255,255,0.02)", border: "1px solid #1a1a1a", borderRadius: 8 }}>
                    {React.createElement(ALL_DIAGRAMS[sections.observe.diagram])}
                  </div>
                )}
              </div>
            )}

            {activeSection === "do" && sections && (
              <div className="section-enter">
                <h1 style={{ color: "#eee", fontSize: 36, fontFamily: "Instrument Serif", marginBottom: 24, fontStyle: "italic" }}>{sections.do.title}</h1>
                <DoSection doData={sections.do} onComplete={() => markSectionDone(activeLesson, "do")} />
                <div style={{ marginTop: 40, borderTop: "1px solid #1a1a1a", paddingTop: 40 }}>
                  <QuizSection lessonId={activeLesson} onComplete={() => markSectionDone(activeLesson, "do")} />
                </div>
              </div>
            )}

            {activeSection === "reflect" && sections && (
              <div className="section-enter">
                <h1 style={{ color: "#eee", fontSize: 36, fontFamily: "Instrument Serif", marginBottom: 24, fontStyle: "italic" }}>Reflection</h1>
                <ReflectSection question={sections.reflect.question} onWrite={() => markSectionDone(activeLesson, "reflect")} />
              </div>
            )}

            <div style={{ marginTop: 60, display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #111", paddingTop: 24 }}>
              <button disabled={activeSection === "concept"} onClick={() => { const idx = SECTION_ORDER.indexOf(activeSection); if (idx > 0) setActiveSection(SECTION_ORDER[idx - 1]); }} style={{ ...btnStyle("#666", "transparent"), border: "none" }}>← Previous</button>
              <button onClick={nextSection} style={btnStyle("#000", "#00ff88")}>{activeSection === "reflect" ? "Complete Lesson →" : "Next Section →"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
