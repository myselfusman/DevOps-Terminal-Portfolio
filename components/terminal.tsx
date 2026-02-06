"use client"

import React from "react"
import { useState, useEffect, useRef, useCallback } from "react"

type Theme = "green" | "amber" | "white" | "cyan" | "magenta" | "orange"

interface HistoryEntry {
  command: string
  output: string[]
  isError?: boolean
  isAnimating?: boolean
}

const ASCII_BANNER = `
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ██╗   ██╗███████╗███╗   ███╗ █████╗ ███╗   ██╗             ║
║   ██║   ██║██╔════╝████╗ ████║██╔══██╗████╗  ██║             ║
║   ██║   ██║███████╗██╔████╔██║███████║██╔██╗ ██║             ║
║   ██║   ██║╚════██║██║╚██╔╝██║██╔══██║██║╚██╗██║             ║
║   ╚██████╔╝███████║██║ ╚═╝ ██║██║  ██║██║ ╚████║             ║
║    ╚═════╝ ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝             ║
║                                                              ║
║              USMAN SIDDIQUE - DevOps Engineer                ║
║          Junior DevOps | Building, Deploying, Scaling        ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝`

const MOBILE_BANNER = `
╔══════════════════════════════════╗
║                                  ║
║  ██╗   ██╗███████╗███╗   ███╗    ║
║  ██║   ██║██╔════╝████╗ ████║    ║
║  ██║   ██║███████╗██╔████╔██║    ║
║  ██║   ██║╚════██║██║╚██╔╝██║    ║
║  ╚██████╔╝███████║██║ ╚═╝ ██║    ║
║   ╚═════╝ ╚══════╝╚═╝     ╚═╝    ║
║                                  ║
║   █████╗ ███╗   ██╗              ║
║  ██╔══██╗████╗  ██║              ║
║  ███████║██╔██╗ ██║              ║
║  ██╔══██║██║╚██╗██║              ║
║  ██║  ██║██║ ╚████║              ║
║  ╚═╝  ╚═╝╚═╝  ╚═══╝              ║
║                                  ║
║    USMAN SIDDIQUE                ║
║    DevOps Engineer               ║
║                                  ║
╚══════════════════════════════════╝`

const WELCOME_MESSAGE = [
  "",
  "Welcome to Usman's Portfolio Terminal",
  "",
]

const MENU_SECTIONS = ["about", "skills", "projects", "certifications", "contact", "resume"]

// Fortune quotes - shown sequentially
const FORTUNE_QUOTES = [
  "\"Infrastructure as code is the future.\" - Anonymous DevOps Engineer",
  "\"Automate everything that can be automated.\" - DevOps Wisdom",
  "\"If it's not in Git, it doesn't exist.\" - Version Control Mantra",
  "\"Deploy early, deploy often.\" - CI/CD Philosophy",
  "\"Containers: Because 'it works on my machine' isn't good enough.\"",
  "\"The best time to automate was yesterday. The second best time is now.\"",
  "\"In the world of DevOps, the only constant is change.\"",
  "\"Write code as if the next person to maintain it is a violent psychopath who knows where you live.\"",
  "\"There is no cloud, it's just someone else's computer.\"",
  "\"It's not a bug, it's an undocumented feature.\"",
  "\"Keep calm and kubectl apply.\"",
  "\"Works on my container.\"",
  "\"Talk is cheap. Show me the pipeline.\"",
  "\"First, solve the problem. Then, write the code.\"",
  "\"DevOps is not a goal, but a never-ending process of continual improvement.\"",
  "\"The only way to go fast is to go well.\" - Robert C. Martin",
  "\"Simplicity is the soul of efficiency.\" - Austin Freeman",
  "\"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.\"",
]

let fortuneIndex = 0

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "",
    "╔════════════════════════════════════════════════════════════════╗",
    "║                      AVAILABLE COMMANDS                        ║",
    "╚════════════════════════════════════════════════════════════════╝",
    "",
    "  help ................ Display this help menu",
    "  about ............... Learn about Usman",
    "  skills .............. View technical skills",
    "  projects ............ Browse projects",
    "  certifications ...... View certifications",
    "  contact ............. Get contact information",
    "  resume .............. Download resume",
    "  clear ............... Clear terminal",
    "  whoami .............. Current user info",
    "  date ................ Display current date/time",
    "  banner .............. Show welcome banner",
    "  theme [color] ....... Change theme",
    "  history ............. Command history",
    "  ls .................. List available sections",
    "",
    "[EASTER EGGS]",
    "",
    "  matrix .............. Enter the Matrix",
    "  neofetch ............ System information",
    "  fortune ............. Inspirational quote",
    "  cowsay .............. ASCII cow with message",
    "",
    "[AVAILABLE THEMES]",
    "",
    "  green | amber | white | cyan | magenta | orange",
    "",
    "Type any command to continue...",
    "",
  ],
  about: () => [
    "",
    "Loading profile...",
    "[████████████████████] 100%",
    "",
    "══════════════════════════════════════════════════",
    "              ABOUT USMAN SIDDIQUE",
    "══════════════════════════════════════════════════",
    "",
    "Name ............ Usman Siddique",
    "Role ............ Junior DevOps Engineer",
    "Status .......... Completing Internship",
    "Location ........ Rahim Yar Khan, Punjab, Pakistan",
    "",
    "[DESCRIPTION]",
    "",
    "I'm a Junior DevOps Engineer passionate about",
    "automating infrastructure and streamlining",
    "deployment pipelines. Currently completing my",
    "internship, I specialize in containerization,",
    "CI/CD, and cloud technologies.",
    "",
    "I love turning complex deployment challenges",
    "into automated, scalable solutions.",
    "",
    "Mission ......... Building tomorrow's infrastructure today",
    "Passion ......... Automation, Cloud, Open Source",
    "",
    "══════════════════════════════════════════════════",
    "Type 'skills' to see my technical stack",
    "",
  ],
  skills: () => [
    "",
    "Fetching skill tree...",
    "",
    "══════════════════════════════════════════════════",
    "                 TECHNICAL SKILLS",
    "══════════════════════════════════════════════════",
    "",
    "[CURRENT EXPERTISE]",
    "",
    "✓ Docker          ████████████████░░░░ 85%",
    "✓ Jenkins         ███████████████░░░░░ 75%",
    "✓ AWS             ████████████████░░░░ 80%",
    "✓ Git/GitHub      ██████████████████░░ 90%",
    "✓ CI/CD Pipelines ██████████████░░░░░░ 70%",
    "✓ Linux/Bash      ████████████████░░░░ 80%",
    "",
    "[CURRENTLY LEARNING]",
    "",
    "⟳ Kubernetes      ██████████░░░░░░░░░░ 50%",
    "⟳ Terraform       ████████░░░░░░░░░░░░ 40%",
    "⟳ Ansible         ███████░░░░░░░░░░░░░ 35%",
    "⟳ Prometheus      ██████░░░░░░░░░░░░░░ 30%",
    "⟳ Python          █████████░░░░░░░░░░░ 45%",
    "",
    "[TOOLS & PLATFORMS]",
    "",
    "• GitLab CI/CD      • Docker Compose",
    "• EC2               • S3",
    "• Nginx             • Shell Scripting",
    "• YAML              • JSON",
    "",
    "Type 'projects' to see my work",
    "",
  ],
  projects: () => [
    "",
    "Listing project directories...",
    "",
    "══════════════════════════════════════════════════",
    "                   MY PROJECTS",
    "══════════════════════════════════════════════════",
    "",
    "[1] nextjs-web-app-deployment/",
    "",
    "    Description: Production-ready Next.js app",
    "    Tech Stack:  Next.js, Docker, Jenkins, AWS",
    "    Features:    CI/CD, Automated Testing",
    "    GitHub:      github.com/myselfusman",
    "",
    "[2] react-cicd-pipeline/",
    "",
    "    Description: React app with full CI/CD",
    "    Tech Stack:  React.js, Docker, Git, AWS",
    "    Features:    Automated builds, Registry",
    "    GitHub:      github.com/myselfusman",
    "",
    "[3] netflix-clone-static/",
    "",
    "    Description: Static site containerized",
    "    Tech Stack:  HTML/CSS/JS, Docker, Nginx",
    "    Features:    Responsive, Automated workflow",
    "    GitHub:      github.com/myselfusman",
    "",
    "Total Projects: 3",
    "",
  ],
  certifications: () => [
    "",
    "Loading certifications...",
    "",
    "══════════════════════════════════════════════════",
    "                  CERTIFICATIONS",
    "══════════════════════════════════════════════════",
    "",
    "📜 AWS Cloud Practitioner (In Progress)",
    "   Expected: 2025",
    "",
    "📜 Docker Certified Associate (Planned)",
    "   Studying containerization best practices",
    "",
    "📜 Jenkins Administrator (Self-Study)",
    "   Completed internal training modules",
    "",
    "📜 Linux System Administration",
    "   Hands-on experience with Ubuntu/CentOS",
    "",
    "Type 'contact' for more information",
    "",
  ],
  contact: () => [
    "",
    "Establishing connection...",
    "",
    "══════════════════════════════════════════════════",
    "                CONTACT INFORMATION",
    "══════════════════════════════════════════════════",
    "",
    "📧 Email ....... contact@myselfusman.com",
    "💼 LinkedIn .... linkedin.com/in/myself-usman",
    "🐙 GitHub ...... github.com/myselfusman",
    "",
    "📍 Location .... Rahim Yar Khan, Pakistan",
    "🕐 Timezone .... PKT (UTC+5)",
    "",
    "[AVAILABLE FOR]",
    "",
    "• Full-time DevOps roles",
    "• Contract/Freelance projects",
    "• Collaboration opportunities",
    "",
    "Response Time: Usually within 24 hours",
    "",
    "Type 'resume' to download my CV",
    "",
  ],
  resume: () => [
    "",
    "Preparing download...",
    "[████████████████████] 100%",
    "",
    "📄 Resume: Usman_Siddique_DevOps.pdf",
    "📦 Size:   245 KB",
    "✓ Status:  Ready for download",
    "",
    "[ Resume link will be available here ]",
    "",
  ],
  whoami: () => [
    "",
    "visitor@usman-portfolio",
    "",
    "You are currently viewing Usman Siddique's portfolio.",
    "Welcome, stranger! Feel free to explore.",
    "",
  ],
  date: () => {
    const now = new Date()
    return [
      "",
      now.toString(),
      "",
    ]
  },
  ls: () => [
    "",
    "drwxr-xr-x  about/",
    "drwxr-xr-x  skills/",
    "drwxr-xr-x  projects/",
    "drwxr-xr-x  certifications/",
    "drwxr-xr-x  contact/",
    "-rw-r--r--  resume.pdf",
    "-rw-r--r--  README.md",
    "",
    "Use commands to explore each section.",
    "",
  ],
  neofetch: () => [
    "",
    "         .---.               usman@portfolio.dev",
    "        /     \\              ─────────────────────",
    "        \\.@-@./              OS: Portfolio Linux",
    "        /`\\_/`\\              Host: GitHub Pages",
    "       //  _  \\\\             Uptime: Since 2025",
    "      | \\     )|_            Shell: bash 5.0",
    "     /`\\_`>  <_/ \\           Terminal: xterm-256color",
    "     \\__/'---'\\__/           CPU: DevOps Engineer",
    "                             Theme: Terminal CRT",
    "                             Projects: 3",
    "                             Skills: Docker, Jenkins, AWS",
    "",
  ],
  fortune: () => {
    const quote = FORTUNE_QUOTES[fortuneIndex]
    fortuneIndex = (fortuneIndex + 1) % FORTUNE_QUOTES.length
    return ["", quote, ""]
  },
  cowsay: () => [
    "",
    " ________________________________",
    "< DevOps is the way to go! Moo! >",
    " --------------------------------",
    "        \\   ^__^",
    "         \\  (oo)\\_______",
    "            (__)\\       )\\/\\",
    "                ||----w |",
    "                ||     ||",
    "",
  ],
  sudo: () => ["", "Nice try! Root access denied.", ""],
  "rm": () => ["", "Not today, my friend!", ""],
  hack: () => ["", "Access Denied. Try 'help' instead.", ""],
}

const AVAILABLE_COMMANDS = Object.keys(COMMANDS).concat(["clear", "banner", "theme", "history", "matrix"])

export function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentInput, setCurrentInput] = useState("")
  const [theme, setTheme] = useState<Theme>("green")
  const [showMatrix, setShowMatrix] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isBooting, setIsBooting] = useState(true)
  const [bootText, setBootText] = useState<string[]>([])
  const [animatingLines, setAnimatingLines] = useState<{[key: number]: number}>({})
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Boot sequence
  useEffect(() => {
    const bootSequence = [
      "Initializing portfolio...",
      "Loading system files...",
      "[████████████████████] 100%",
      "Connection established.",
      "",
    ]

    let currentLine = 0
    const interval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setBootText((prev) => [...prev, bootSequence[currentLine]])
        currentLine++
      } else {
        clearInterval(interval)
        setTimeout(() => setIsBooting(false), 500)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [])

  // Apply theme to body
  useEffect(() => {
    document.body.classList.remove("theme-green", "theme-amber", "theme-white", "theme-cyan", "theme-magenta", "theme-orange")
    if (theme !== "green") {
      document.body.classList.add(`theme-${theme}`)
    }
  }, [theme])

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history, bootText, animatingLines])

  // Focus input on click
  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  // Animate output lines one by one
  const animateOutput = useCallback((historyIndex: number, output: string[]) => {
    let lineIndex = 0
    setAnimatingLines(prev => ({ ...prev, [historyIndex]: 0 }))
    
    const interval = setInterval(() => {
      lineIndex++
      if (lineIndex >= output.length) {
        clearInterval(interval)
        setAnimatingLines(prev => {
          const newState = { ...prev }
          delete newState[historyIndex]
          return newState
        })
        setHistory(prev => prev.map((entry, i) => 
          i === historyIndex ? { ...entry, isAnimating: false } : entry
        ))
      } else {
        setAnimatingLines(prev => ({ ...prev, [historyIndex]: lineIndex }))
      }
    }, 30)
  }, [])

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    const parts = trimmedCmd.split(" ")
    const baseCommand = parts[0]

    // Add to command history
    if (trimmedCmd) {
      setCommandHistory((prev) => [...prev, trimmedCmd])
      setHistoryIndex(-1)
    }

    // Handle special commands
    if (baseCommand === "clear") {
      setHistory([])
      return
    }

    if (baseCommand === "banner") {
      const output = [(isMobile ? MOBILE_BANNER : ASCII_BANNER), ...WELCOME_MESSAGE]
      const newIndex = history.length
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: output,
          isAnimating: true,
        },
      ])
      setTimeout(() => animateOutput(newIndex, output), 50)
      return
    }

    if (baseCommand === "theme") {
      const newTheme = parts[1] as Theme
      if (["green", "amber", "white", "cyan", "magenta", "orange"].includes(newTheme)) {
        setTheme(newTheme)
        setHistory((prev) => [
          ...prev,
          { command: cmd, output: ["", `Theme changed to ${newTheme}.`, ""] },
        ])
      } else {
        setHistory((prev) => [
          ...prev,
          {
            command: cmd,
            output: ["", "Usage: theme [green|amber|white|cyan|magenta|orange]", ""],
            isError: true,
          },
        ])
      }
      return
    }

    if (baseCommand === "history") {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: ["", "Command History:", "───────────────", ...commandHistory.map((c, i) => `  ${i + 1}  ${c}`), ""],
        },
      ])
      return
    }

    if (baseCommand === "matrix") {
      setShowMatrix(true)
      setTimeout(() => setShowMatrix(false), 5000)
      setHistory((prev) => [
        ...prev,
        { command: cmd, output: ["", "Entering the Matrix... (5 seconds)", ""] },
      ])
      return
    }

    // Handle rm -rf specially
    if (trimmedCmd.startsWith("rm")) {
      setHistory((prev) => [
        ...prev,
        { command: cmd, output: COMMANDS["rm"]() },
      ])
      return
    }

    // Check if command exists
    if (COMMANDS[baseCommand]) {
      const output = COMMANDS[baseCommand]()
      const newIndex = history.length
      setHistory((prev) => [
        ...prev,
        { command: cmd, output: output, isAnimating: true },
      ])
      setTimeout(() => animateOutput(newIndex, output), 50)
    } else if (trimmedCmd === "") {
      setHistory((prev) => [...prev, { command: "", output: [] }])
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: [
            "",
            `bash: ${baseCommand}: command not found`,
            "Type 'help' to see available commands.",
            "",
          ],
          isError: true,
        },
      ])
    }
  }, [isMobile, commandHistory, history.length, animateOutput])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        executeCommand(currentInput)
        setCurrentInput("")
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        if (commandHistory.length > 0) {
          const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || "")
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || "")
        } else {
          setHistoryIndex(-1)
          setCurrentInput("")
        }
      } else if (e.key === "Tab") {
        e.preventDefault()
        const matches = AVAILABLE_COMMANDS.filter((c) => c.startsWith(currentInput.toLowerCase()))
        if (matches.length === 1) {
          setCurrentInput(matches[0])
        } else if (matches.length > 1) {
          setHistory((prev) => [
            ...prev,
            { command: currentInput, output: ["", matches.join("  "), ""] },
          ])
        }
      } else if (e.ctrlKey && e.key === "l") {
        e.preventDefault()
        setHistory([])
      } else if (e.ctrlKey && e.key === "c") {
        e.preventDefault()
        setHistory((prev) => [...prev, { command: currentInput + "^C", output: [] }])
        setCurrentInput("")
      }
    },
    [currentInput, executeCommand, commandHistory, historyIndex]
  )

  return (
    <>
      {/* Matrix Rain Effect */}
      {showMatrix && <MatrixRain />}

      {/* Scanlines overlay */}
      <div className="fixed inset-0 scanlines pointer-events-none z-10" />

      {/* Terminal Container */}
      <div
        className="min-h-screen bg-background p-2 sm:p-4 md:p-6 flex flex-col cursor-text"
        onClick={focusInput}
      >
        {/* Terminal Window */}
        <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
          {/* Window Header */}
          <div className="flex items-center gap-2 px-3 py-2 border border-foreground/30 border-b-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-[#FFB000]" />
              <div className="w-3 h-3 rounded-full bg-foreground" />
            </div>
            <span className="text-xs text-muted-foreground ml-2">
              Terminal - Usman Siddique Portfolio
            </span>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalRef}
            className="flex-1 border border-foreground/30 p-3 sm:p-4 overflow-y-auto terminal-scroll min-h-[70vh] max-h-[85vh] crt-effect"
          >
            {/* Boot Sequence */}
            {isBooting ? (
              <div className="terminal-glow">
                {bootText.map((line, i) => (
                  <div key={i} className="whitespace-pre-wrap text-sm sm:text-base">
                    {line}
                  </div>
                ))}
                <span className="cursor-blink">█</span>
              </div>
            ) : (
              <>
                {/* Banner */}
                <pre className="terminal-glow text-[6px] sm:text-[10px] md:text-xs leading-tight whitespace-pre overflow-x-auto">
                  {isMobile ? MOBILE_BANNER : ASCII_BANNER}
                </pre>

                {/* Welcome Message */}
                <div className="terminal-glow mt-2">
                  {WELCOME_MESSAGE.map((line, i) => (
                    <div key={i} className="text-sm sm:text-base">
                      {line}
                    </div>
                  ))}
                </div>

                {/* Inline Menu */}
                <div className="terminal-glow text-xs sm:text-sm md:text-base">
                  <span className="text-muted-foreground">[</span>
                  {MENU_SECTIONS.map((section, i) => (
                    <span key={section}>
                      <button
                        type="button"
                        onClick={() => executeCommand(section)}
                        className="text-foreground hover:terminal-glow-bright hover:underline underline-offset-2 cursor-pointer bg-transparent border-none p-0"
                      >
                        {section}
                      </button>
                      {i < MENU_SECTIONS.length - 1 && (
                        <span className="text-muted-foreground"> | </span>
                      )}
                    </span>
                  ))}
                  <span className="text-muted-foreground">]</span>
                </div>
                
                {/* Help hint on new line */}
                <div className="terminal-glow mb-2 text-xs sm:text-sm md:text-base text-foreground">
                  {"Type 'help' for commands"}
                </div>

                {/* Command History */}
                {history.map((entry, i) => (
                  <div key={i} className="mt-2">
                    <div className="flex items-center gap-1 text-sm sm:text-base">
                      <span className="terminal-glow text-foreground shrink-0">usman@portfolio:~$</span>
                      <span className="text-foreground/80">{entry.command}</span>
                    </div>
                    <div className={entry.isError ? "text-destructive" : "terminal-glow"}>
                      {entry.output.slice(0, entry.isAnimating ? (animatingLines[i] ?? 0) + 1 : entry.output.length).map((line, j) => (
                        <div key={j} className="whitespace-pre text-xs sm:text-sm md:text-base font-mono">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Current Input Line */}
                <div className="flex items-center gap-1 mt-2 text-sm sm:text-base">
                  <span className="terminal-glow text-foreground shrink-0">usman@portfolio:~$</span>
                  <div className="relative flex-1 min-w-0">
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full bg-transparent border-none outline-none text-foreground terminal-glow caret-transparent"
                      autoFocus
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                    />
                    {/* Custom cursor */}
                    <span
                      className="absolute top-0 pointer-events-none terminal-glow"
                      style={{ left: `${currentInput.length}ch` }}
                    >
                      <span className="cursor-blink">█</span>
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Quick Commands */}
          {isMobile && !isBooting && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["help", "about", "skills", "projects", "contact", "clear"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => {
                    executeCommand(cmd)
                  }}
                  className="px-2 py-1 text-xs border border-foreground/50 text-foreground hover:bg-foreground/10 active:bg-foreground/20 terminal-glow"
                >
                  {cmd}
                </button>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-4 text-center text-xs text-muted-foreground border-t border-foreground/20 pt-2">
            <div>© 2025 Usman Siddique | Built with pure terminal magic</div>
            <div>{"Type 'help' for commands"}</div>
          </div>
        </div>
      </div>
    </>
  )
}

// Matrix Rain Component
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#00FF00"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)
    return () => clearInterval(interval)
  }, [])

  return <canvas ref={canvasRef} className="matrix-rain" />
}
