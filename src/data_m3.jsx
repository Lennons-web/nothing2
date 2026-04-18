import React from "react";

// ─── MODULE 3 DIAGRAMS ────────────────────────────────────────────────────────
export const DIAGRAMS_M3 = {
  pointer_basic: () => (
    <svg viewBox="0 0 450 180" style={{ width: "100%", maxWidth: 450 }}>
      {/* Cell 1: x */}
      <g transform="translate(40, 50)">
        <text x="50" y="-10" fill="#aaa" fontSize="13" fontFamily="DM Mono" textAnchor="middle">int x</text>
        <rect x="0" y="0" width="100" height="60" rx="4" fill="rgba(68,136,255,0.1)" stroke="#4488ff" strokeWidth="2" />
        <text x="50" y="38" fill="#eee" fontSize="24" fontFamily="DM Mono" textAnchor="middle">42</text>
        <text x="50" y="80" fill="#4488ff" fontSize="11" fontFamily="DM Mono" textAnchor="middle">Addr: 0x100</text>
      </g>
      
      {/* Cell 2: p */}
      <g transform="translate(280, 50)">
        <text x="50" y="-10" fill="#aaa" fontSize="13" fontFamily="DM Mono" textAnchor="middle">int *p</text>
        <rect x="0" y="0" width="100" height="60" rx="4" fill="rgba(0,255,136,0.1)" stroke="#00ff88" strokeWidth="2" />
        <text x="50" y="38" fill="#00ff88" fontSize="20" fontFamily="DM Mono" textAnchor="middle">0x100</text>
        <text x="50" y="80" fill="#888" fontSize="11" fontFamily="DM Mono" textAnchor="middle">Addr: 0x104</text>
      </g>

      {/* Arrow from p to x */}
      <path d="M 280 80 Q 210 120 150 80" fill="none" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="4 4" />
      <text x="215" y="115" fill="#00ff88" fontSize="11" fontFamily="DM Mono" textAnchor="middle">*p (dereference)</text>
    </svg>
  ),

  pointer_chain: () => (
    <svg viewBox="0 0 540 180" style={{ width: "100%", maxWidth: 540 }}>
      {/* Level 3: **pp */}
      <g transform="translate(20, 50)">
        <text x="50" y="-10" fill="#aaa" fontSize="12" fontFamily="DM Mono" textAnchor="middle">int **pp</text>
        <rect x="0" y="0" width="100" height="50" rx="4" fill="rgba(255,200,0,0.1)" stroke="#ffcc00" strokeWidth="2" />
        <text x="50" y="32" fill="#ffcc00" fontSize="16" fontFamily="DM Mono" textAnchor="middle">0x200</text>
        <text x="50" y="70" fill="#888" fontSize="10" fontFamily="DM Mono" textAnchor="middle">Addr: 0x208</text>
      </g>

      {/* Level 2: *p */}
      <g transform="translate(200, 50)">
        <text x="50" y="-10" fill="#aaa" fontSize="12" fontFamily="DM Mono" textAnchor="middle">int *p</text>
        <rect x="0" y="0" width="100" height="50" rx="4" fill="rgba(0,255,136,0.1)" stroke="#00ff88" strokeWidth="2" />
        <text x="50" y="32" fill="#00ff88" fontSize="16" fontFamily="DM Mono" textAnchor="middle">0x100</text>
        <text x="50" y="70" fill="#888" fontSize="10" fontFamily="DM Mono" textAnchor="middle">Addr: 0x200</text>
      </g>

      {/* Level 1: x */}
      <g transform="translate(380, 50)">
        <text x="50" y="-10" fill="#aaa" fontSize="12" fontFamily="DM Mono" textAnchor="middle">int x</text>
        <rect x="0" y="0" width="100" height="50" rx="4" fill="rgba(68,136,255,0.1)" stroke="#4488ff" strokeWidth="2" />
        <text x="50" y="32" fill="#eee" fontSize="20" fontFamily="DM Mono" textAnchor="middle">99</text>
        <text x="50" y="70" fill="#888" fontSize="10" fontFamily="DM Mono" textAnchor="middle">Addr: 0x100</text>
      </g>

      {/* Arrows */}
      <line x1="125" y1="75" x2="190" y2="75" stroke="#ffcc00" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="305" y1="75" x2="370" y2="75" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arrow)" />
    </svg>
  ),

  pointer_arithmetic: () => (
    <svg viewBox="0 0 500 200" style={{ width: "100%", maxWidth: 500 }}>
      {/* Arrays Cells */}
      {[10, 20, 30].map((val, i) => (
        <g key={i} transform={`translate(${80 + i * 110}, 80)`}>
          <rect x="0" y="0" width="100" height="50" rx="2" fill="rgba(68,136,255,0.05)" stroke="#4488ff" strokeWidth="1" />
          <text x="50" y="32" fill="#eee" fontSize="18" fontFamily="DM Mono" textAnchor="middle">{val}</text>
          <text x="50" y="70" fill="#888" fontSize="11" fontFamily="DM Mono" textAnchor="middle">0x20{i * 4}</text>
          <text x="50" y="-10" fill="#aaa" fontSize="12" fontFamily="DM Mono" textAnchor="middle">arr[{i}]</text>
        </g>
      ))}

      {/* Pointer State Arrows */}
      <path d="M 130 50 L 130 65" fill="none" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="130" y="40" fill="#00ff88" fontSize="12" fontFamily="DM Mono" textAnchor="middle">p</text>

      <path d="M 140 35 Q 190 10 240 35 L 240 65" fill="none" stroke="#00ff88" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" />
      <text x="190" y="15" fill="#00ff88" fontSize="10" fontFamily="DM Mono" textAnchor="middle">+1 stride</text>
      <text x="240" y="40" fill="#00ff88" fontSize="12" fontFamily="DM Mono" textAnchor="middle">p+1</text>
      
      <path d="M 250 35 Q 300 10 350 35 L 350 65" fill="none" stroke="#00ff88" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" />
      <text x="300" y="15" fill="#00ff88" fontSize="10" fontFamily="DM Mono" textAnchor="middle">+1 stride</text>
      <text x="350" y="40" fill="#00ff88" fontSize="12" fontFamily="DM Mono" textAnchor="middle">p+2</text>
    </svg>
  ),

  pass_by_ref: () => (
    <svg viewBox="0 0 540 240" style={{ width: "100%", maxWidth: 540 }}>
      {/* Caller Frame */}
      <g transform="translate(20, 20)">
        <rect x="0" y="0" width="200" height="200" rx="8" fill="rgba(255,255,255,0.02)" stroke="#1a1a1a" strokeWidth="2" />
        <text x="100" y="25" fill="#aaa" fontSize="12" fontFamily="DM Mono" textAnchor="middle">Caller Stack Frame</text>
        
        <rect x="25" y="50" width="150" height="50" rx="4" fill="rgba(68,136,255,0.1)" stroke="#4488ff" strokeWidth="1" />
        <text x="100" y="70" fill="#eee" fontSize="14" fontFamily="DM Mono" textAnchor="middle">int x = 5</text>
        <text x="100" y="90" fill="#4488ff" fontSize="10" fontFamily="DM Mono" textAnchor="middle">0x800</text>
        
        <rect x="25" y="120" width="150" height="50" rx="4" fill="rgba(68,136,255,0.1)" stroke="#4488ff" strokeWidth="1" />
        <text x="100" y="140" fill="#eee" fontSize="14" fontFamily="DM Mono" textAnchor="middle">int y = 9</text>
        <text x="100" y="160" fill="#4488ff" fontSize="10" fontFamily="DM Mono" textAnchor="middle">0x804</text>
      </g>

      {/* Swap Frame */}
      <g transform="translate(320, 20)">
        <rect x="0" y="0" width="200" height="200" rx="8" fill="rgba(255,255,255,0.02)" stroke="#1a1a1a" strokeWidth="2" />
        <text x="100" y="25" fill="#aaa" fontSize="12" fontFamily="DM Mono" textAnchor="middle">swap() Stack Frame</text>
        
        <rect x="25" y="50" width="150" height="50" rx="4" fill="rgba(0,255,136,0.1)" stroke="#00ff88" strokeWidth="1" />
        <text x="100" y="70" fill="#eee" fontSize="14" fontFamily="DM Mono" textAnchor="middle">int *a = 0x800</text>
        <text x="100" y="90" fill="#888" fontSize="10" fontFamily="DM Mono" textAnchor="middle">0x700</text>
        
        <rect x="25" y="120" width="150" height="50" rx="4" fill="rgba(0,255,136,0.1)" stroke="#00ff88" strokeWidth="1" />
        <text x="100" y="140" fill="#eee" fontSize="14" fontFamily="DM Mono" textAnchor="middle">int *b = 0x804</text>
        <text x="100" y="160" fill="#888" fontSize="10" fontFamily="DM Mono" textAnchor="middle">0x708</text>
      </g>

      {/* Deref Arrows */}
      <path d="M 340 75 Q 270 50 180 75" fill="none" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="4 4" />
      <path d="M 340 145 Q 270 120 180 145" fill="none" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="4 4" />
    </svg>
  )
};

// ─── MODULE 3 CURRICULUM ──────────────────────────────────────────────────────
export const MODULE_3 = {
  id: "m3",
  title: "Pointers & Addrs",
  subtitle: "Indirection and memory",
  icon: "03",
  lessons: [
    {
      id: "m3l1",
      title: "What is a Pointer?",
      tag: "CORE",
      sections: {
        concept: {
          title: "Variables Storing Addresses",
          body: `A pointer is simply a variable whose value is a memory address. Rather than storing a number like '42' or a character like 'A', it stores the exact physical location of another variable in RAM.

When you declare \`int *p\`, you tell the compiler: "p is a variable that will hold the address of an integer." 

But the pointer itself is a variable! This means **the pointer has its own memory address** where the numeric address it points to is physically stored. This concept of accessing memory via addresses is known as **Indirection**. 

We use pointers constantly to:
1. Prevent wasteful copying of huge blocks of data.
2. Share identical data across completely isolated function scopes.
3. Access hardware registers dynamically.

A pointer can also hold \`NULL\` (usually 0x0), which strictly means "this pointer intentionally points to absolutely nothing right now."`,
          keyPoints: [
            "A pointer purely stores a runtime memory address.",
            "The pointer itself requires bytes allocated in memory to exist.",
            "Indirection allows reading/writing to target memory dynamically.",
            "NULL is the definitive zero-address, indicating no target.",
          ],
          flashcard: {
            front: "What is the primary difference between the pointer itself and the data it points to?",
            back: "The pointer is the container holding a memory address. The data is what lives at that targeted address.",
          },
        },
        observe: {
          title: "Pointer Indirection",
          code: `/* Basic Pointer Declaration */
#include <stdio.h>

int main() {
    int x = 42;
    int *p = &x;
    
    // x is accessed securely via dereference
    printf("Value of x: %d\\n", x);
    printf("Address of x: %p\\n", &x);
    
    printf("Value of p: %p\\n", p);
    printf("Deref p to get x: %d\\n", *p);
    
    return 0;
}`,
          annotations: [
            { line: 5, text: "Declares normal variable 'x' storing 42." },
            { line: 6, text: "'p' holds the address of 'x' using the & operator." },
            { line: 12, text: "Wait, the value of p is just x's memory address! (0x100)" },
            { line: 13, text: "Dereferencing '*p' travels to 0x100 and pulls out the 42." },
          ],
          diagram: "pointer_basic",
        },
        do: {
          title: "Declare & Dereference",
          prompt: "Given `val`, declare a pointer `ptr` that targets it, then return the dereferenced integer.",
          lines: [
            { code: `function dereferenceTarget() {`, editable: false },
            { code: `  let val = 7;`, editable: false },
            { code: `  // C semantic match via JS mock`, editable: false },
            { code: `  let ___ = ___val;`, blank: "ptr", blank2: "&" },
            { code: `  return ___ptr;`, blank: "*" },
            { code: `}`, editable: false },
          ],
          tests: [
            { input: null, expected: 7, label: "Evaluating pointer target mapping" }
          ],
        },
        reflect: {
          question: "A pointer is itself stored somewhere in memory. What does it fundamentally mean to have a pointer to a pointer?",
        },
      },
    },
    {
      id: "m3l2",
      title: "Address-of & Dereference",
      tag: "THEORY",
      sections: {
        concept: {
          title: "Operations of Indirection",
          body: `C relies on two fundamental operators to control memory indirection mathematically.

1. **The Address-Of Operator (\`)**: Prefixing any variable with \`&\` retrieves its physical memory address. Think of it as "Where are you?"
2. **The Dereference Operator (\`*\`)**: Prefixing a pointer with \`*\` retrieves the value residing at that exact memory address. Think of it as "Go there and open the box."

These operators perfectly complement each other. If you apply both, they mathematically cancel out: \`*(&x)\` is literally identically equal to \`x\`.

**Double Pointers:** Since pointers are stored in memory, you can take the address of a pointer! \`int **pp\` literally declares a pointer targeting another pointer. To extract the base integer through a double pointer, the compiler emits two distinct load instructions (\`**pp\`).

**Fatal Danger:** Dereferencing a \`NULL\` pointer or an uninitialized pointer (holding garbage addresses) forces the operating system to forcefully kill your program (Segmentation Fault).`,
          keyPoints: [
            "& extracts physical hardware addresses.",
            "* reads or mutates the data residing exactly at a hardware address.",
            "Dereferencing NULL triggers guaranteed OS crashes (Segfaults).",
            "**pp represents a multi-level indirection chain.",
          ],
          flashcard: {
            front: "Why does dereferencing an uninitialized local pointer crash your system so violently?",
            back: "It points randomly to whatever garbage was left in memory (or restricted OS memory), causing a memory access violation.",
          },
        },
        observe: {
          title: "Chaining Operators",
          code: `/* Multi-level Pointers */
#include <stdio.h>

int main() {
    int x = 99;
    int *p = &x;
    
    // Address of a pointer!
    int **pp = &p; 
    
    // Evaluate x through the chain
    printf("pp holds Addr: %p\\n", pp);
    printf("Dereferencing *pp retrieves p: %p\\n", *pp);
    printf("Dereferencing **pp retrieves x: %d\\n", **pp);
    
    return 0;
}`,
          annotations: [
            { line: 5, text: "Base layer integer." },
            { line: 6, text: "Layer 1 pointer, referencing x." },
            { line: 9, text: "Layer 2 pointer, holding the address where 'p' itself lives!" },
            { line: 14, text: "**pp recursively follows the chain: 'pp' -> 'p' -> 'x' (99)." },
          ],
          diagram: "pointer_chain",
        },
        do: {
          title: "Pointer Chains",
          prompt: "Write the correct expression to properly retrieve the final integer base value bypassing intermediaries solely using `pp`.",
          lines: [
            { code: `function traverseChain(pp) {`, editable: false },
            { code: `  // pp connects to p, which connects to x.`, editable: false },
            { code: `  // Return the direct integer value:`, editable: false },
            { code: `  return ______;`, blank: "**pp" },
            { code: `}`, editable: false },
          ],
          tests: [
            { input: null, expected: 1, label: "" }
          ],
        },
        reflect: {
          question: "Why does dereferencing a NULL pointer crash the program directly instead of gracefully just returning a 0 value natively?",
        },
      },
    },
    {
      id: "m3l3",
      title: "Pointer Arithmetic",
      tag: "CORE ALGORITHM",
      sections: {
        concept: {
          title: "Stride Mechanics",
          body: `When you perform mathematical addition on a pointer, C does not merely add 1 generic byte.

Adding 1 to a pointer natively advances the target address forward exactly by the **size of the underlying type**. This scaling operation is called the pointer's **stride**.

If \`p\` points to a 4-byte \`int\` at \`0x200\`, executing \`p + 1\` calculates to \`0x204\` automatically. If it was a 1-byte \`char\`, \`p + 1\` would be \`0x201\`.

This exposes defining mechanics: **Arrays genuinely do not exist in execution**. Syntax like \`arr[3]\` is compiled strictly down to \`*(arr + 3)\`. The compiler uses type widths to leap perfectly to contiguous addresses.

Because C has no concept of boundaries, walking a pointer past the end of an allocation gracefully retrieves completely unprotected ghost memory. Furthermore, arithmetic on \`void *\` pointers is explicitly illegal logically because \`void\` carries no strict byte width.`,
          keyPoints: [
            "Arithmetic on pointers relies entirely on the underlying type's byte size (Stride).",
            "arr[i] is merely syntactical sugar mapped to *(arr + i).",
            "There are absolutely zero bounds checks on arithmetic increments.",
            "void* cannot do math natively; it has no known stride length.",
          ],
          flashcard: {
            front: "If an integer array essentially starts at 0x1000, what address does *(arr + 2) physically target?",
            back: "0x1008 — because 2 elements * 4 bytes/element calculates exactly 8 bytes forward.",
          },
        },
        observe: {
          title: "Raw Memory Leaps",
          code: `/* Bypassing Array Syntax */
#include <stdio.h>

int main() {
    int arr[3] = {10, 20, 30};
    int *p = arr; // Decays directly into address of arr[0]
    
    for (int i = 0; i < 3; i++) {
        // Equivalent to arr[i]
        printf("Addr: %p -> Val: %d\\n", (p + i), *(p + i));
    }
    
    printf("Out of bounds: %d\\n", *(p + 3)); 
    
    return 0;
}`,
          annotations: [
            { line: 5, text: "Contiguous chunk of 12 bytes total." },
            { line: 6, text: "'arr' logically acts as a pure pointer to the first element." },
            { line: 10, text: "(p + i) dynamically calculates hardware jump. *(p + i) dereferences it." },
            { line: 13, text: "Violently leaping outside allocated space." },
          ],
          diagram: "pointer_arithmetic",
        },
        do: {
          title: "Math Decoupler",
          prompt: "Eradicate the syntax sugar. Redefine bracket accesses strictly using raw address arithmetic evaluating identically.",
          lines: [
            { code: `function rawSeek(arrBase, i) {`, editable: false },
            { code: `  // Previously known as: arrBase[i]`, editable: false },
            { code: `  // Redefine using pure dereferencing offset`, editable: false },
            { code: `  return *(___ + ___);`, blank: "arrBase", blank2: "i" },
            { code: `}`, editable: false },
          ],
          tests: [
            { input: null, expected: 1, label: "" }
          ],
        },
        reflect: {
          question: "If pointer arithmetic is practically just base addition, why does C rigidly make it type-aware? What exactly would break structurally if it always added raw 1 byte jumps?",
        },
      },
    },
    {
      id: "m3l4",
      title: "Pointers & Functions",
      tag: "SYSTEMS DESIGNS",
      sections: {
        concept: {
          title: "Pass by Reference",
          body: `By default, C isolates everything strictly in **Pass by Value**. 
Every function implicitly receives a completely detached, duplicated copy of the inputs. If function B modifies a variable provided by function A, only function B's local copy alters. 

To bridge execution frames, you employ Pass by Reference via explicitly transferring pointers. When function A passes the **address** of its variable, function B receives a duplicate of the address — but dereferencing that address jumps completely backwards into function A's stack frame! 

This allows you to mutate the original caller's variables efficiently.

**Modifiers in signatures:**
- \`const int *p\`: Function can wildly alter where \`p\` points, but strictly cannot mutate the data \`p\` points to.
- \`int * const p\`: Function can heavily mutate the target data, but \`p\` is permanently locked onto that specific variable object.`,
          keyPoints: [
            "C defaults violently to local isolated copying (Pass by Value).",
            "Pointers bridge disjointed stack frames natively, giving functions remote mutation powers.",
            "Passing large arrays via pointer (8 bytes) saves huge memory vs copying raw blocks.",
            "Const variants distinctly guard underlying memory reads vs pointer reassignments.",
          ],
          flashcard: {
            front: "How exactly do you allow a sub-function to explicitly alter variables owned by main()?",
            back: "Pass its physical memory address (&var) so the sub-function acts upon the master copy.",
          },
        },
        observe: {
          title: "The Stack Crosser",
          code: `/* Pass by Reference Mutator */
#include <stdio.h>

// Accepts exact memory addresses inside arguments
void swap(int *a, int *b) {
    int temp = *a; // Hop back to caller, read val
    *a = *b;       // Hop back, overwrite val 
    *b = temp;     // Hop back, assign temp
}

int main() {
    int x = 5, y = 9;
    
    // Distribute memory addresses, NOT values
    swap(&x, &y); 
    
    printf("x=%d, y=%d\\n", x, y); // Outputs 9, 5!
    return 0;
}`,
          annotations: [
            { line: 5, text: "Accepts 8-byte pointer parameters 'a' and 'b'." },
            { line: 7, text: "Modifies x structurally within main() entirely from inside swap()." },
            { line: 15, text: "Sends addresses. If you just sent 'x', swap() would helplessly modify localized copies." },
          ],
          diagram: "pass_by_ref",
        },
        do: {
          title: "Argument Adjustments",
          prompt: "The localized function is completely broken structurally. Pass the raw pointer types required heavily to achieve cross-frame communication.",
          lines: [
            { code: `// Fix the signature types appropriately`, editable: false },
            { code: `function void addTen(int ___targetAddr) {`, blank: "*" },
            { code: `  ___targetAddr += 10; // mutate remote target value directly`, blank: "*" },
            { code: `}`, editable: false },
          ],
          tests: [
            { input: null, expected: 1, label: "" }
          ],
        },
        reflect: {
          question: "C++ natively added true 'references' (void fn(int &x)) explicitly escaping raw pointer syntax. What does this tell you about how heavily regular algorithms rely upon pass-by-reference logic?",
        },
      },
    }
  ]
};

// ─── MODULE 3 QUIZZES ─────────────────────────────────────────────────────────

export const QUIZZES_M3 = {
  m3l1: [
    { q: "What distinct conceptual entity does a regular C pointer inherently store structurally?", opts: ["Dynamic Objects", "An exact numeric memory address", "The underlying system codebase", "Hexadecimal strings natively"], ans: 1 },
    { q: "What identifies a pointer strictly communicating it targets absolutely nothing?", opts: ["The address '0xFFFFFFFF'", "A negative integer bound", "NULL pointer constraints natively holding address 0", "Empty bracket syntax []"], ans: 2 },
    { q: "The pointer itself is NOT materialized in physical memory. It floats strictly symbolically during compilation.", opts: ["True, compilers remove pointers", "False, pointers are real variables having native addresses"], ans: 1 },
    { q: "What strictly connects a pointer to an external execution space to prevent data duplication overhead?", opts: ["Data Arrays", "Direct Caching Maps", "The Indirection design pattern structurally", "Inheritance"], ans: 2 }
  ],
  m3l2: [
    { q: "Given 'int x = 5;', evaluating *(&x) strictly calculates logically identically to exactly what expression?", opts: ["The literal integer 5 structurally", "The native hex address of x", "An unknown garbage compilation code", "5 divided by the & location"], ans: 0 },
    { q: "When you execute a dereference securely upon an uninitialized pointer variable violently, what normally triggers automatically?", opts: ["Code freezes silently requiring a hard reset", "Segmentation Violation (Segfault) OS crash explicitly", "Compiler re-evaluates the link logic safely", "Returns literal integer 0"], ans: 1 },
    { q: "If 'int **pp' evaluates to base 0x1000, what happens precisely when evaluating '**pp' execution wise?", opts: ["Mathematical square logic upon the pointer natively", "Two discrete memory load instructions firing sequentially recursively", "Multiplying pointer widths dynamically by structure targets", "Dereferences exactly twice returning another pointer purely"], ans: 1 },
    { q: "Prefixing a target explicitly securely with & strictly retrieves what fundamental property directly?", opts: ["The element data size heavily", "Hardware execution address physically", "Data types inherently", "The exact value of variable references"], ans: 1 }
  ],
  m3l3: [
    { q: "Why mathematically does executing execution (ptr + 1) absolutely NOT strictly move exactly 1 isolated byte forward normally?", opts: ["It does", "Pointers move inherently proportionally exactly scaled to their explicitly linked underlying type width (Stride logic)", "The OS blocks single byte jumps recursively", "Compilers heavily require padded 4-byte boundaries strictly at all times"], ans: 1 },
    { q: "Why functionally is executing addition operations natively fundamentally blocked aggressively upon 'void *' architecture pointers natively?", opts: ["Void prohibits compilation heavily", "Void explicitly inherently acts completely sized at 0 bits", "Void natively deliberately lacks a specific structural underlying type size required securely for calculating mathematical stride bounds jumps", "void functions structurally cannot hold values whatsoever natively"], ans: 2 },
    { q: "In explicit compilation logic precisely, indexing structural syntax natively like 'arr[5]' strictly naturally transpiles inherently effectively to what native raw evaluation architecture?", opts: ["&arr / 5 natively", "*(arr + 5) perfectly mathematically", "Array.prototype.get(arr, 5) inherently", "5 * arr physically heavily"], ans: 1 },
    { q: "If short data type *p exactly points securely strictly to 0x100. Evaluating natively dynamically (p + 2) returns precisely what exact offset limit fundamentally addressing mathematically?", opts: ["0x102", "0x104", "0x108", "0x106"], ans: 1 }
  ],
  m3l4: [
    { q: "Because C rigidly acts strictly as 'Pass by Value', arguments supplied into secondary execution structurally inherently fundamentally act essentially as...", opts: ["Live bidirectional links", "Protected execution scopes heavily secured inherently", "Completely disjointed raw memory copies heavily disconnected fundamentally from original frame sources", "Hardware buffers"], ans: 2 },
    { q: "How structurally fundamentally specifically do pointers explicitly enable functions powerfully securely to actively alter caller master variables remotely inherently entirely overriding 'Pass by Value' limits?", opts: ["They copy data twice", "Dereferencing remote addresses explicitly travels drastically natively backwards up the hardware stack heavily mutating original execution cells", "They rewrite binaries explicitly", "By unlocking globals"], ans: 1 },
    { q: "What explicit syntax distinctly structurally prevents heavily the actual underlying function heavily securely from mutating actively the remote pointed data contents fundamentally?", opts: ["const int *ptr", "int * const ptr", "protected int *ptr", "static int *ptr"], ans: 0 },
    { q: "If a function receives deeply exclusively a raw large array structurally effectively by strictly copying array values recursively natively directly, what heavily drastically dynamically specifically suffers primarily natively?", opts: ["Random logic bugs strongly", "Significant drastic memory duplication bloating native overhead entirely", "Security fault leaks strongly", "Network speed boundaries natively"], ans: 1 }
  ]
};
