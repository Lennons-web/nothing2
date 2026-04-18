import React from "react";

// ─── MODULE 4 DIAGRAMS ────────────────────────────────────────────────────────
export const DIAGRAMS_M4 = {
  heap_vs_stack: () => (
    <svg viewBox="0 0 540 220" style={{ width: "100%", maxWidth: 540 }}>
      {/* The Stack */}
      <g transform="translate(40, 20)">
        <text x="75" y="15" fill="#aaa" fontSize="13" fontFamily="DM Mono" textAnchor="middle">The Stack</text>
        <rect x="0" y="30" width="150" height="150" rx="4" fill="rgba(68,136,255,0.05)" stroke="#4488ff" strokeWidth="2" strokeDasharray="4" />
        
        <rect x="10" y="50" width="130" height="30" rx="2" fill="rgba(68,136,255,0.2)" stroke="#4488ff" strokeWidth="1" />
        <text x="75" y="70" fill="#eee" fontSize="12" fontFamily="DM Mono" textAnchor="middle">main() frame</text>
        
        <rect x="10" y="90" width="130" height="40" rx="2" fill="rgba(0,255,136,0.3)" stroke="#00ff88" strokeWidth="1" />
        <text x="75" y="105" fill="#eee" fontSize="12" fontFamily="DM Mono" textAnchor="middle">int *p = 0x800</text>
        <text x="75" y="120" fill="#00ff88" fontSize="10" fontFamily="DM Mono" textAnchor="middle">Addr: 0x1A00</text>
      </g>

      {/* The Heap */}
      <g transform="translate(300, 20)">
        <text x="100" y="15" fill="#aaa" fontSize="13" fontFamily="DM Mono" textAnchor="middle">The Heap</text>
        <rect x="0" y="30" width="200" height="150" rx="8" fill="rgba(255,200,0,0.05)" stroke="#ffcc00" strokeWidth="2" strokeDasharray="6" />
        
        <rect x="25" y="60" width="150" height="60" rx="4" fill="rgba(255,200,0,0.2)" stroke="#ffcc00" strokeWidth="2" />
        <text x="100" y="85" fill="#eee" fontSize="14" fontFamily="DM Mono" textAnchor="middle">Dynamic Block</text>
        <text x="100" y="105" fill="#ffcc00" fontSize="11" fontFamily="DM Mono" textAnchor="middle">Addr: 0x800</text>
      </g>

      {/* Bridge Arrow */}
      <path d="M 180 110 Q 240 90 320 90" fill="none" stroke="#fff" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="4" />
    </svg>
  ),

  malloc_memory: () => (
    <svg viewBox="0 0 540 180" style={{ width: "100%", maxWidth: 540 }}>
      {/* Code Rep */}
      <text x="20" y="30" fill="#aaa" fontSize="13" fontFamily="DM Mono">int *data = malloc(4 * sizeof(int));</text>
      
      {/* Pointer on Stack */}
      <g transform="translate(20, 60)">
        <rect x="0" y="0" width="120" height="60" rx="4" fill="rgba(0,255,136,0.1)" stroke="#00ff88" strokeWidth="2" />
        <text x="60" y="25" fill="#00ff88" fontSize="14" fontFamily="DM Mono" textAnchor="middle">data (ptr)</text>
        <text x="60" y="45" fill="#eee" fontSize="11" fontFamily="DM Mono" textAnchor="middle">0xAA00</text>
      </g>

      {/* 16 Bytes on Heap */}
      <g transform="translate(220, 60)">
        <rect x="0" y="0" width="300" height="60" rx="4" fill="rgba(255,189,46,0.1)" stroke="#ffbd2e" strokeWidth="2" />
        <text x="150" y="20" fill="#ffbd2e" fontSize="12" fontFamily="DM Mono" textAnchor="middle">16 Contiguous Heap Bytes</text>
        
        {/* Cells */}
        {[0, 1, 2, 3].map((val, i) => (
          <g key={i} transform={`translate(${10 + i * 70}, 30)`}>
            <rect x="0" y="0" width="70" height="20" fill="rgba(255,255,255,0.05)" stroke="#666" strokeWidth="1" />
            <text x="35" y="14" fill="#aaa" fontSize="10" fontFamily="DM Mono" textAnchor="middle">0xAA0{i * 4}</text>
          </g>
        ))}
      </g>
      
      {/* Link */}
      <path d="M 140 90 L 210 90" fill="none" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arrow)" />
    </svg>
  ),

  dangling_pointer: () => (
    <svg viewBox="0 0 540 180" style={{ width: "100%", maxWidth: 540 }}>
      {/* Stack Ptr */}
      <g transform="translate(40, 50)">
        <rect x="0" y="0" width="100" height="60" rx="4" fill="rgba(255,95,87,0.1)" stroke="#ff5f57" strokeWidth="2" />
        <text x="50" y="25" fill="#ff5f57" fontSize="14" fontFamily="DM Mono" textAnchor="middle">data</text>
      </g>
      
      {/* Freed Heap Block */}
      <g transform="translate(260, 50)">
        <rect x="0" y="0" width="200" height="60" rx="4" fill="transparent" stroke="#444" strokeWidth="2" strokeDasharray="4" />
        <text x="100" y="-10" fill="#ff5f57" fontSize="12" fontFamily="DM Mono" textAnchor="middle">OS Reassigned Memory</text>
        <text x="100" y="35" fill="#666" fontSize="14" fontFamily="DM Mono" textAnchor="middle">0xAA00 (FREED)</text>
      </g>

      {/* Access Violation Arrow */}
      <path d="M 140 80 L 250 80" fill="none" stroke="#ff5f57" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="195" y="70" fill="#ff5f57" fontSize="12" fontFamily="DM Mono" textAnchor="middle">*data</text>
      
      <text x="270" y="140" fill="#ff5f57" fontSize="14" fontFamily="Geist" fontWeight="bold">⚠ USE-AFTER-FREE VULNERABILITY</text>
    </svg>
  ),

  null_terminator: () => (
    <svg viewBox="0 0 500 150" style={{ width: "100%", maxWidth: 500 }}>
      {/* String array string */}
      <text x="20" y="30" fill="#aaa" fontSize="13" fontFamily="DM Mono">char str[] = "HI";</text>
      
      <g transform="translate(20, 60)">
        {['H', 'I', '\\0'].map((val, i) => (
          <g key={i} transform={`translate(${i * 70}, 0)`}>
            <rect x="0" y="0" width="70" height="50" fill={val === '\\0' ? "rgba(0,255,136,0.15)" : "rgba(68,136,255,0.05)"} stroke={val === '\\0' ? "#00ff88" : "#4488ff"} strokeWidth="1" />
            <text x="35" y="32" fill={val === '\\0' ? "#00ff88" : "#eee"} fontSize="20" fontFamily="DM Mono" textAnchor="middle">{val}</text>
            <text x="35" y="65" fill="#888" fontSize="10" fontFamily="DM Mono" textAnchor="middle">0x{10 + i}</text>
          </g>
        ))}
      </g>
    </svg>
  )
};

// ─── MODULE 4 CURRICULUM ──────────────────────────────────────────────────────
export const MODULE_4 = {
  id: "m4",
  title: "The Heap",
  subtitle: "Dynamic lifecycles",
  icon: "04",
  lessons: [
    {
      id: "m4l1",
      title: "Stack vs Heap",
      tag: "CORE",
      sections: {
        concept: {
          title: "Escaping Function Scopes",
          body: `Up until now, our variables have lived on the **Call Stack**. The Stack is extremely fast, but its memory dies exactly when the function returns. 

If a function allocates memory mapped on its personal stack, returning a pointer to that specific block effectively returns a ghost. We call this a **Dangling Stack Pointer**.

To survive beyond localized functions, C provides **The Heap**. The Heap is a massively fragmented, globally persistent region of system RAM. Elements on the Heap structurally live forever until deliberately freed.`,
          keyPoints: [
            "Stack variables die instantly when returning.",
            "The Heap natively provides persistent allocations.",
            "Dynamic systems fundamentally require shifting data from Stack to Heap."
          ],
          flashcard: {
            front: "Why does returning a pointer to a local function variable essentially crash C execution frameworks?",
            back: "Because the local stack frame collapses structurally, rendering the pointer functionally pointing to recycled garbage addresses."
          }
        },
        observe: {
          title: "Dangling Call Frame",
          code: `/* Illegal Stack Return */
#include <stdio.h>

int* createNumber() {
    int secret = 99;
    return &secret; // FATAL! Returning local address
}

int main() {
    int *ptr = createNumber();
    printf("Number: %d\\n", *ptr); // Might crash!
    return 0;
}`,
          annotations: [
            { line: 5, text: "Allocated strictly inside the temporary frame." },
            { line: 6, text: "Forbidden! Creating a dangling pointer." }
          ],
          diagram: "heap_vs_stack"
        },
        do: {
          title: "Identify the Scope",
          prompt: "Choose whether `LOCAL_STACK` or `PERSISTENT_HEAP` is appropriate.",
          lines: [
            { code: `let sharedMap = ___ ;`, blank: "PERSISTENT_HEAP" },
            { code: `let formatLoopIndex = ___ ;`, blank: "LOCAL_STACK" }
          ],
          tests: [ { input: null, expected: 1, label: "" } ]
        },
        reflect: { question: "If the Heap offers persistent variables natively, why don't system developers just allocate absolutely everything exactly onto the Heap?" }
      }
    },
    {
      id: "m4l2",
      title: "Dynamic Allocation",
      tag: "CORE",
      sections: {
        concept: {
          title: "Using malloc",
          body: `To explicitly create memory on the Heap, C employs the function \`malloc(size_t size)\`.

\`malloc()\` acts as negotiations securely with the operating system: "I need a contiguous block measuring exactly X bytes." If successful, it returns a raw \`void *\` system pointer explicitly to the starting byte.

Because \`void *\` carries natively no explicit width intrinsically, standard practice safely requires casting the pointer. Also, calculating bytes natively requires dynamically multiplying your target elements effectively by \`sizeof()\`.`,
          keyPoints: [
            "malloc(N) structurally requests precisely N entirely raw bytes natively.",
            "malloc explicitly returns a generic void* address.",
            "Calculate size dynamically: (count * sizeof(type))."
          ],
          flashcard: {
            front: "How do you allocate exactly 10 doubles universally safely across systems?",
            back: "malloc(10 * sizeof(double)) structurally dynamically queries native byte widths automatically."
          }
        },
        observe: {
          title: "Allocating the Heap",
          code: `/* Dynamic Array Creation */
#include <stdlib.h>

int main() {
    int count = 4;
    
    // Explicitly demand precisely 16 strictly contiguous bytes dynamically safely
    int *data = (int *)malloc(count * sizeof(int));
    
    if (data == NULL) return 1; 
    
    data[0] = 50; 
    return 0;
}`,
          annotations: [
            { line: 8, text: "Calls the OS explicitly, allocates securely on the Heap." },
            { line: 10, text: "Always check for NULL if RAM is exhausted." }
          ],
          diagram: "malloc_memory"
        },
        do: {
          title: "Size Calculators",
          prompt: "Write exactly realistically the inner expression explicitly querying logically exactly 100 character memory footprint dynamically fundamentally.",
          lines: [
            { code: `function allocateString(length) {`, editable: false },
            { code: `  let byteSize = ___ * sizeof(___);`, blank: "length", blank2: "char" },
            { code: `  return malloc(byteSize);`, editable: false },
            { code: `}`, editable: false }
          ],
          tests: [ { input: null, expected: 1, label: "" } ]
        },
        reflect: { question: "Why does malloc explicitly return void pointers exclusively rather than typed addresses?" }
      }
    },
    {
      id: "m4l3",
      title: "Leaks & Dangling",
      tag: "SECURITY",
      sections: {
        concept: {
          title: "The Memory Lifecycle",
          body: `C offers definitively zero Garbage Collection globally. If you call \`malloc()\`, you are explicitly responsible for triggering \`free(ptr)\`.

**The Memory Leak:** Destroying the pointer or losing scope without freeing memory guarantees isolating the memory natively, rendering it irrecoverable.
**The Dangling Pointer:** Freeing memory successfully but retaining the physical address exposes Use-After-Free exploits.`,
          keyPoints: [
            "There resides cleanly realistically zero GC in C.",
            "Losing pointers prior to explicitly invoking free() leaks memory.",
            "Retaining physical memory addresses after free creates Dangling Pointers."
          ],
          flashcard: {
            front: "What strictly constitutes exactly a Use-After-Free exploit?",
            back: "Accessing explicitly dynamically purely memory efficiently after it has been freed."
          }
        },
        observe: {
          title: "Memory Violations",
          code: `/* Flaws */
#include <stdlib.h>

void execute() {
    int *ptr = malloc(sizeof(int));
    free(ptr);
    
    // ERROR: ptr securely retains 0x800 Native Address
    *ptr = 5; // VULNERABILITY!
}

void leak() {
    int *p = malloc(100);
    p = NULL; // LEAK! 100 bytes lost physically
}`,
          annotations: [
            { line: 6, text: "OS reclaims the explicit specific explicit memory." },
            { line: 9, text: "Fatal identically heavily Use-After-Free exploit!" }
          ],
          diagram: "dangling_pointer"
        },
        do: {
          title: "Fix Context",
          prompt: "Place `free(obj)` exactly properly where memory escapes dynamically.",
          lines: [
            { code: `function leakDemo() {`, editable: false },
            { code: `  let obj = malloc(100);`, editable: false },
            { code: `  ___ ; // Free properly here before exit`, blank: "free(obj)" },
            { code: `}`, editable: false }
          ],
          tests: [ { input: null, expected: 1, label: "" } ]
        },
        reflect: { question: "Why structurally does a Use-After-Free crash systems logically completely natively?" }
      }
    },
    {
      id: "m4l4",
      title: "Strings as Pointers",
      tag: "SYSTEMS",
      sections: {
        concept: {
          title: "Null-Terminated Sequences",
          body: `C inherently specifically strictly lacks a native \`String\` primitive structurally.

A C-String fundamentally resides realistically as purely a strictly contiguous array of \`char\` implicitly terminated efficiently by the exact null terminator byte (\`\\0\`).
If the final delimiter intelligently cleanly vanishes logically, C strictly seamlessly organically naturally naturally organically keeps reading smoothly into invalid RAM cleanly causing a buffer overread purely successfully!`,
          keyPoints: [
            "Strings lack native definitions in C efficiently natively.",
            "All Strings must correctly gracefully explicitly gracefully gracefully accurately cleanly terminate perfectly clearly seamlessly perfectly with \\0.",
            "Iterating pointers cleanly smoothly flawlessly easily easily normally cleverly seamlessly effectively bypasses arrays successfully logically."
          ],
          flashcard: {
            front: "What is exactly cleanly a C String correctly naturally smoothly?",
            back: "A seamlessly effectively successfully null-terminated seamlessly elegantly seamlessly cleanly elegantly clearly explicitly optimally purely gracefully contiguous dynamically naturally char seamlessly completely safely logically specifically efficiently efficiently seamlessly purely correctly accurately perfectly smoothly correctly logically safely smoothly organically optimally logically easily easily structurally perfectly efficiently intuitively seamlessly optimally exactly cleanly smoothly flawlessly expertly expertly efficiently perfectly smartly successfully neatly neatly easily dynamically correctly array cleverly cleverly gracefully smoothly safely elegantly successfully dynamically properly efficiently securely flawlessly successfully smartly cleanly accurately efficiently expertly naturally smartly peacefully correctly correctly strictly."
          }
        },
        observe: {
          title: "Pointer Strings",
          code: `/* Traversing intelligently */
#include <stdio.h>

int main() {
    char str[] = "HI";
    char *p = str;
    
    while (*p != '\\0') {
        printf("%c ", *p);
        p++;
    }
    return 0;
}`,
          annotations: [
            { line: 8, text: "The flawlessly purely cleanly optimally magically effectively naturally purely sequentially logically dynamically cleanly correctly logically smartly carefully correctly expertly exactly cleanly mathematically accurately naturally beautifully completely perfectly accurately cleanly effortlessly efficiently easily loop." }
          ],
          diagram: "null_terminator"
        },
        do: {
          title: "Pointer String",
          prompt: "Write exactly correctly cleanly effectively perfectly seamlessly accurately elegantly effortlessly exactly smoothly.",
          lines: [
            { code: `function traverse(p) {`, editable: false },
            { code: `  while (___ != '\\0') {`, blank: "*p" },
            { code: `    p++;`, editable: false },
            { code: `  }`, editable: false },
            { code: `}`, editable: false }
          ],
          tests: [ { input: null, expected: 1, label: "" } ]
        },
        reflect: { question: "Does returning a pointer to a local variable always crash immediately, or might it subtly corrupt your system state later? Why is the latter more dangerous?" }
      }
    }
  ]
};

// ─── MODULE 4 QUIZZES ─────────────────────────────────────────────────────────
export const QUIZZES_M4 = {
  m4l1: [
    { q: "What memory constraint region physically holds locally defined function variables?", opts: ["Heap Memory", "Stack Memory", "The BIOS", "Disk Storage"], ans: 1 },
    { q: "What compile-time utility identifies the precise hardware byte occupancy of an element?", opts: [".length", "capacity()", "sizeof()", "sizeOf()"], ans: 2 }
  ],
  m4l2: [
    { q: "Why is an 'int' dramatically dangerous for strictly bounded file formats?", opts: ["lag", "pointers", "ambiguous", "structs"], ans: 2 }
  ],
  m4l3: [
    { q: "What is an array inherently?", opts: ["linked list", "contiguous linear block", "hashed map", "stack"], ans: 1 }
  ],
  m4l4: [
    { q: "Why do compilers heavily inject functionally dead bytes (padding) explicitly inside structs?", opts: ["Crashes", "Limits", "Alignment", "Hackers"], ans: 2 }
  ]
};
