import React from "react";

// ─── MODULE 2 DIAGRAMS ────────────────────────────────────────────────────────
export const DIAGRAMS_M2 = {
  stack_memory: () => (
    <svg viewBox="0 0 400 240" style={{ width: "100%", maxWidth: 400 }}>
      {/* Background Frame */}
      <rect x="20" y="20" width="360" height="200" rx="8" fill="rgba(255,255,255,0.02)" stroke="#1a1a1a" strokeWidth="2" />
      <text x="40" y="45" fill="#666" fontSize="12" fontFamily="DM Mono">Stack Memory (Growing Downwards)</text>

      {/* Variables */}
      <g transform="translate(40, 70)">
        <rect x="0" y="0" width="220" height="40" rx="4" fill="rgba(68,136,255,0.1)" stroke="#4488ff" strokeWidth="1" />
        <text x="110" y="25" fill="#eee" fontSize="14" fontFamily="DM Mono" textAnchor="middle">int score (4 bytes)</text>
        <text x="240" y="25" fill="#4488ff" fontSize="13" fontFamily="DM Mono">0x7fffc004</text>
      </g>
      
      <g transform="translate(40, 115)">
        <rect x="0" y="0" width="220" height="25" rx="4" fill="rgba(0,255,136,0.1)" stroke="#00ff88" strokeWidth="1" />
        <text x="110" y="16" fill="#eee" fontSize="14" fontFamily="DM Mono" textAnchor="middle">char grade (1 byte)</text>
        <text x="240" y="16" fill="#00ff88" fontSize="13" fontFamily="DM Mono">0x7fffc003</text>
      </g>
      
      <g transform="translate(40, 145)">
        <rect x="0" y="0" width="220" height="60" rx="4" fill="rgba(255,200,0,0.1)" stroke="#ffcc00" strokeWidth="1" />
        <text x="110" y="35" fill="#eee" fontSize="14" fontFamily="DM Mono" textAnchor="middle">double gpa (8 bytes)</text>
        <text x="240" y="35" fill="#ffcc00" fontSize="13" fontFamily="DM Mono">0x7fffc010</text>
      </g>
      
      <line x1="340" y1="210" x2="340" y2="70" stroke="#444" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="4 4" />
      <text x="350" y="145" transform="rotate(90 350 145)" fill="#666" fontSize="10" fontFamily="DM Mono">STACK GROWTH</text>
    </svg>
  ),

  data_sizes: () => (
    <svg viewBox="0 0 500 240" style={{ width: "100%", maxWidth: 500 }}>
      {[
        { name: "char", bytes: 1, color: "#ff5f57" },
        { name: "short", bytes: 2, color: "#ffbd2e" },
        { name: "int", bytes: 4, color: "#4488ff" },
        { name: "float", bytes: 4, color: "#cc44ff" },
        { name: "double", bytes: 8, color: "#00ff88" },
        { name: "long", bytes: 8, color: "#00cc66" }
      ].map((type, i) => (
        <g key={i} transform={`translate(20, ${30 + i * 32})`}>
          <text x="0" y="18" fill="#aaa" fontSize="13" fontFamily="DM Mono">{type.name}</text>
          <rect x="60" y="4" width={type.bytes * 45} height="20" rx="3" fill={`${type.color}30`} stroke={type.color} strokeWidth="1" />
          <text x={70 + type.bytes * 45} y="18" fill={type.color} fontSize="12" fontFamily="DM Mono">{type.bytes}B</text>
        </g>
      ))}
      <text x="20" y="230" fill="#666" fontSize="11" fontFamily="DM Mono">* Sizes can be implementation-defined. These are typical x86-64 sizes.</text>
    </svg>
  ),

  array_memory: () => (
    <svg viewBox="0 0 500 120" style={{ width: "100%", maxWidth: 500 }}>
      {/* Array Base */}
      <text x="20" y="25" fill="#aaa" fontSize="13" fontFamily="DM Mono">int arr[4] = {'{'}10, 20, 30, 40{'}'};</text>
      
      {/* Memory cells */}
      {[10, 20, 30, 40].map((val, i) => (
        <g key={i} transform={`translate(${40 + i * 100}, 50)`}>
          <rect x="0" y="0" width="100" height="40" rx="0" fill="rgba(0,255,136,0.05)" stroke="#00ff88" strokeWidth="1" />
          <text x="50" y="25" fill="#eee" fontSize="18" fontFamily="DM Mono" textAnchor="middle">{val}</text>
          
          <text x="50" y="-8" fill="#4488ff" fontSize="11" fontFamily="DM Mono" textAnchor="middle">arr[{i}]</text>
          <text x="50" y="58" fill="#888" fontSize="10" fontFamily="DM Mono" textAnchor="middle">0x100{i * 4}</text>
        </g>
      ))}

      {/* Out of bounds */}
      <rect x="440" y="50" width="50" height="40" fill="rgba(255,95,87,0.1)" stroke="#ff5f57" strokeDasharray="4" strokeWidth="1" />
      <text x="465" y="75" fill="#ff5f57" fontSize="12" fontFamily="DM Mono" textAnchor="middle">???</text>
      <text x="465" y="42" fill="#ff5f57" fontSize="10" fontFamily="DM Mono" textAnchor="middle">arr[4]</text>
    </svg>
  ),

  struct_padding: () => (
    <svg viewBox="0 0 540 240" style={{ width: "100%", maxWidth: 540 }}>
      <text x="100" y="30" fill="#ff5f57" fontSize="13" fontFamily="DM Mono" textAnchor="middle">Wasted Padding</text>
      <text x="380" y="30" fill="#00ff88" fontSize="13" fontFamily="DM Mono" textAnchor="middle">Properly Packed</text>
      
      {/* Unpacked Struct: 1 byte char, 3 padding, 4 byte int, 1 byte char, 3 padding = 12 bytes total */}
      <g transform="translate(20, 50)">
        <rect x="0" y="0" width="160" height="24" rx="2" fill="rgba(255,189,46,0.2)" stroke="#ffbd2e" strokeWidth="1" />
        <text x="10" y="17" fill="#eee" fontSize="12" fontFamily="DM Mono">char a (1B)</text>
        
        <rect x="0" y="24" width="160" height="72" rx="2" fill="rgba(255,95,87,0.1)" stroke="#ff5f57" strokeWidth="1" strokeDasharray="2" />
        <text x="80" y="65" fill="#ff5f57" fontSize="12" fontFamily="DM Mono" textAnchor="middle">3B PADDING</text>
        
        <rect x="0" y="96" width="160" height="96" rx="2" fill="rgba(68,136,255,0.2)" stroke="#4488ff" strokeWidth="1" />
        <text x="10" y="113" fill="#eee" fontSize="12" fontFamily="DM Mono">int b (4B)</text>
        
        <rect x="0" y="192" width="160" height="24" rx="2" fill="rgba(255,189,46,0.2)" stroke="#ffbd2e" strokeWidth="1" />
        <text x="10" y="209" fill="#eee" fontSize="12" fontFamily="DM Mono">char c (1B)</text>
        
        <text x="80" y="236" fill="#888" fontSize="11" fontFamily="DM Mono" textAnchor="middle">Size: 12 Bytes</text>
      </g>
      
      {/* Packed Struct: 4 int, 1 char, 1 char, 2 padding = 8 bytes total */}
      <g transform="translate(300, 50)">
        <rect x="0" y="0" width="160" height="96" rx="2" fill="rgba(68,136,255,0.2)" stroke="#4488ff" strokeWidth="1" />
        <text x="10" y="17" fill="#eee" fontSize="12" fontFamily="DM Mono">int b (4B)</text>
        
        <rect x="0" y="96" width="160" height="24" rx="2" fill="rgba(255,189,46,0.2)" stroke="#ffbd2e" strokeWidth="1" />
        <text x="10" y="113" fill="#eee" fontSize="12" fontFamily="DM Mono">char a (1B)</text>
        
        <rect x="0" y="120" width="160" height="24" rx="2" fill="rgba(255,189,46,0.2)" stroke="#ffbd2e" strokeWidth="1" />
        <text x="10" y="137" fill="#eee" fontSize="12" fontFamily="DM Mono">char c (1B)</text>
        
        <rect x="0" y="144" width="160" height="48" rx="2" fill="rgba(255,95,87,0.1)" stroke="#ff5f57" strokeWidth="1" strokeDasharray="2" />
        <text x="80" y="171" fill="#ff5f57" fontSize="12" fontFamily="DM Mono" textAnchor="middle">2B PADDING</text>
        
        <text x="80" y="210" fill="#00ff88" fontSize="11" fontFamily="DM Mono" textAnchor="middle">Size: 8 Bytes</text>
      </g>
    </svg>
  )
};

// ─── MODULE 2 CURRICULUM ──────────────────────────────────────────────────────
export const MODULE_2 = {
  id: "m2",
  title: "Memory & Types",
  subtitle: "C's flat address space",
  icon: "02",
  lessons: [
    {
      id: "m2l1",
      title: "How C Sees Memory",
      tag: "CORE",
      sections: {
        concept: {
          title: "The Flat Address Space",
          body: `In high-level languages like JavaScript or Python, memory is an abstract concept. You create an object, and the runtime hides where it actually lives. 
          
In C, **memory is just one massive, contiguous array of bytes.** 

When you declare a variable, the C compiler assigns it a physical address inside this array. Every single byte has a unique address. If you declare variables inside a function, the compiler allocates them on the **Call Stack**. The compiler mathematically calculates exactly how much room each function needs, taking over the manual labor of calculating relative addresses.

However, the layout decision is entirely up to the compiler. It calculates offsets and manages spaces (padding/alignment) based on the CPU architecture constraints. You can never guarantee that two variables declared sequentially in code will be sequentially placed in the physical memory address space.`,
          keyPoints: [
            "C treats memory as one massive array of bytes.",
            "Variables are assigned physical memory addresses by the compiler.",
            "Local variables map to the Call Stack memory frame.",
            "sizeof() is an operator evaluated safely at compile time, retrieving byte constraints.",
          ],
          flashcard: {
            front: "What operator in C tells you exactly how many bytes a variable occupies in memory?",
            back: "sizeof() — Note: it's not a function call! It's evaluated during compilation.",
          },
        },
        observe: {
          title: "Memory Inspector",
          code: `/* Inspecting stack addresses */
#include <stdio.h>

int main() {
    int score = 100;
    char grade = 'A';
    double gpa = 4.0;
    
    // Use %p to print pointer addresses
    printf("score: %p (size: %zu bytes)\\n", &score, sizeof(score));
    printf("grade: %p (size: %zu bytes)\\n", &grade, sizeof(grade));
    printf("gpa:   %p (size: %zu bytes)\\n", &gpa, sizeof(gpa));
    
    return 0;
}`,
          annotations: [
            { line: 5, text: "Allocates 4 bytes logically on the stack" },
            { line: 6, text: "Allocates exactly 1 byte" },
            { line: 10, text: "& operator fetches the exact memory address (pointer) of the variable." },
            { line: 10, text: "%zu is the format specifier for size_t (the type sizeof returns)" },
          ],
          diagram: "stack_memory",
        },
        do: {
          title: "Size Inspector",
          prompt: "Fill in the missing standard sizeof checks to reveal runtime memory allocation sizes.",
          lines: [
            { code: `function predictSizes() {`, editable: false },
            { code: `  let sizes = {};`, editable: false },
            { code: `  sizes.charSize = sizeof(___);`, blank: "char" },
            { code: `  sizes.intSize = sizeof(___);`, blank: "int" },
            { code: `  return sizes;`, editable: false },
            { code: `}`, editable: false },
          ],
          tests: [
            // Dummy JS test runner handling simulating 'sizeof' for the do block logic
            { input: null, expected: 4, label: "Simulating sizeof sizes internally" }, // Just a pass condition handled gracefully if blanks are correct
          ],
        },
        reflect: {
          question: "If two variables are declared next to each other, are their addresses always adjacent? Why might they not be?",
        },
      },
    },
    {
      id: "m2l2",
      title: "Data Types & Sizes",
      tag: "FOUNDATION",
      sections: {
        concept: {
          title: "Primitive Limitations",
          body: `Unlike dynamic languages where numbers morph to fit your needs, C demands rigid boundaries. 
          
The primary integers are **char** (1 byte), **short** (2 bytes), **int** (typically 4 bytes), and **long** (4 or 8 bytes). Types hold signed characteristics (allowing negatives via Two's Complement logic) or 'unsigned' boundaries maximizing positive reaches.

Here is the chaos: the C standard DOES NOT enforce strict byte widths for types like int. It only guarantees that \`sizeof(char) <= sizeof(short) <= sizeof(int) <= sizeof(long)\`. A long could be 4 bytes on a 32-bit processor and 8 bytes on a 64-bit platform.

To save engineers from porting hell, **stdint.h** introduced fixed-width types like \`int32_t\` (always safely 4 bytes) and \`uint8_t\` (unsigned 1 byte). Using wrong widths creates devastating outcomes specifically known as **Silent Truncation** (where bytes simply vanish when casting down) or **Integer Overflow**.`,
          keyPoints: [
            "char = 1B, short = 2B, int = 4B (typically).",
            "Sizes are technically implementation-defined based on CPU topology.",
            "Silent truncation happens entirely secretly when you cram a 4-byte int into a 1-byte char.",
            "Safety protocol: standard modern code uses stdint.h (int32_t, uint8_t).",
          ],
          flashcard: {
            front: "What is Silent Truncation?",
            back: "When a larger byte-width variable is assigned to a smaller variable (e.g. int to char), the topmost bytes are deleted permanently without warning.",
          },
        },
        observe: {
          title: "Silent Truncation",
          code: `/* The dangers of loose types */
#include <stdio.h>

int main() {
    int bigNum = 258; 
    // binary: 00000000 00000000 00000001 00000010
    
    // Casting large 4 byte int heavily down to a 1 byte char
    // The top three bytes are completely eradicated secretly
    char tinyVal = (char)bigNum; 
    
    // Output: 
    // tinyVal contains only '00000010'
    printf("tinyVal equals: %d\\n", tinyVal); // prints 2
    
    return 0;
}`,
          annotations: [
            { line: 5, text: "258 requires 9 bits minimum (100000010). Thus, it requires at least a 2 byte structure." },
            { line: 10, text: "Forced casting! 'char' limits exactly to the bottom 8 bits." },
            { line: 14, text: "258 completely vanished. Logic flows forward with 2, crashing potentially critical systems." },
          ],
          diagram: "data_sizes",
        },
        do: {
          title: "Type Fixer",
          prompt: "Choose the proper exact width uint typedefs imported from stdint.h into the blanks.",
          lines: [
            { code: `// Select fixed-width stdint types`, editable: false },
            { code: `___ tinyValue = 250;     // maximum limits fits in 1 unsigned byte `, blank: "uint8_t" },
            { code: `___ standardId = 60000;  // Fits standard 2 unsigned bytes `, blank: "uint16_t" },
          ],
          tests: [
            { input: null, expected: 1, label: "Code logic validation" },
          ],
        },
        reflect: {
          question: "Why does C not mathematically guarantee int is always 32 bits? What exact problem does this create for cross-platform systems programmers?",
        },
      },
    },
    {
      id: "m2l3",
      title: "Arrays & Contiguous Memory",
      tag: "CORE SKILL",
      sections: {
        concept: {
          title: "Contiguous Architecture",
          body: `What exactly is an Array in C? An array is merely a strict, contiguous block of memory cells physically strung adjacent to each other.

There is deep magic here: the bracket syntax \`arr[i]\` doesn't actually exist in the hardware. It is syntactic sugar for basic **pointer arithmetic**: \`*(arr + i)\`.

When the compiler queries an element, it requests logic like: \`Base Address + (Index * sizeof(type))\`. If you have an array of 4-byte integers, moving from \`arr[0]\` to \`arr[1]\` jumps exactly 4 positions forward in memory.

**The Danger Zone:** C fundamentally trusts you entirely. It performs **no bounds checking**. If you declare an array of 4 elements, and ask for the 5th (\`arr[4]\`), C calculates the physical offset, sneaks past the memory allocation, and retrieves whatever garbage data happens to live next door. This is famously known as a Buffer Overrun, leading to historically gigantic security exploits.`,
          keyPoints: [
            "Arrays are contiguous physical memory blocks.",
            "arr[i] is identical to *(arr + i).",
            "The compiler calculates stride mathematically: address + (i * size).",
            "C conducts ZERO bounds checking. Asking outside the array limits is undefined behavior.",
          ],
          flashcard: {
            front: "Why does arr[1] jump perfectly to the exact next element even if the element is 8 bytes large?",
            back: "The C compiler knows the type stride. Pointer math adds (index * sizeof(type)) cleanly.",
          },
        },
        observe: {
          title: "Array Mechanics",
          code: `/* Array pointer offsets */
#include <stdio.h>

int main() {
    int arr[4] = {10, 20, 30, 40};
    
    // Normal syntactic access
    printf("%d\\n", arr[2]);
    
    // Explicit pointer arithmetic 
    // This evaluates exactly identically to arr[2]
    printf("%d\\n", *(arr + 2)); 
    
    // Memory jumps via arithmetic
    // Assuming base arr is 0x1000, 
    // (arr + 1) calculates as 0x1000 + (1 * 4 bytes) = 0x1004!
    
    return 0;
}`,
          annotations: [
            { line: 5, text: "Allocates precisely 16 continuous bytes (4 * 4B ints)." },
            { line: 8, text: "The conventional syntactic sugar." },
            { line: 12, text: "The raw truth! Dereferencing the mathematical hop from the array base." },
          ],
          diagram: "array_memory",
        },
        do: {
          title: "Syntactic Unwrapping",
          prompt: "Write the raw, unadulterated pointer-arithmetic equivalent that accesses the third element manually.",
          lines: [
            { code: `function getThirdBlock(arrPtr) {`, editable: false },
            { code: `  // Without brackets: arr[2] equates to:`, editable: false },
            { code: `  return *(___ + ___);`, blank: "arrPtr", blank2: "2" },
            { code: `}`, editable: false },
          ],
          tests: [
            { input: null, expected: 1, label: "" }
          ],
        },
        reflect: {
          question: "C does not natively bounds-check arrays. What are the severe security implications of this capability, and what major exploit does it regularly enable?",
        },
      },
    },
    {
      id: "m2l4",
      title: "Structs & Memory Layout",
      tag: "SYSTEMS",
      sections: {
        concept: {
          title: "Data Packing & Padding",
          body: `**Structs** bundle multiple varied data types into a singular named block of memory.

You might logically assume that a struct holding a \`char\` (1B) and an \`int\` (4B) equals 5 total bytes. Usually, you are wrong.

Modern CPUs hate reading memory addresses that are not beautifully aligned to standard chunk limits (like 4-byte boundaries). To prevent the CPU from severely lagging or outright crashing on certain architectures (like ARM), the C compiler aggressively inserts **invisible padding bytes** heavily altering the structure size. 

If a char is natively placed before an int, 3 bytes of useless padding are secretly injected just to guarantee the int successfully aligns on a clean 4-byte axis! 

The remedy? **Order matters.** Declare struct fields heavily from largest to smallest. Alternatively, compiler directives like \`__attribute__((packed))\` explicitly force C to abandon padding alignments (saving RAM but violently costing cycle performance).`,
          keyPoints: [
            "Structs visually bundle data, but CPUs mathematically dictate physical layouts.",
            "Padding consists of dead/waste bytes injected cleanly to align wider elements.",
            "Ordering variables internally from Largest to Smallest naturally curtails padding.",
            "Packed structs absolutely kill padding entirely at steep computational reading cost.",
          ],
          flashcard: {
            front: "How do you minimize wasteful padding heavily without using risky packed attributes?",
            back: "Always order struct fields strictly from largest byte size (e.g., 8-byte doubles) to the smallest byte size (e.g., 1-byte chars).",
          },
        },
        observe: {
          title: "The Packing Visualizer",
          code: `/* Demonstrating Padding waste */
#include <stdio.h>

struct Wasteful {
    char a;    // 1 byte
               // [3 bytes transparent padding!]
    int b;     // 4 bytes
    char c;    // 1 byte
               // [3 bytes transparent padding!] 
}; // Total size logically 6? No, actually 12.

struct Optimized {
    int b;     // 4 bytes
    char a;    // 1 byte
    char c;    // 1 byte
               // [2 byte end padding]
}; // Total size: 8. Saved 33% memory footprint magically!

int main() {
    printf("Wasteful: %zu \\n", sizeof(struct Wasteful));
    printf("Optimized: %zu \\n", sizeof(struct Optimized));
}`,
          annotations: [
            { line: 5, text: "Wait... the int comes next! Ints must align on intervals perfectly divisible by 4. So the compiler brutally injects 3 dead bytes." },
            { line: 10, text: "Size is 12 logically!" },
            { line: 13, text: "Start with the heaviest, restrictive requirement (int)." },
          ],
          diagram: "struct_padding",
        },
        do: {
          title: "Struct Optimization",
          prompt: "Observe the fields. Order them inside the structural logic from 'heaviest/largest' to naturally prevent padding gaps.",
          lines: [
            { code: `// Reordered struct elements (int, char, short)`, editable: false },
            { code: `// Type 1: (largest)`, editable: false },
            { code: `___ heavyVar; // 4 Bytes `, blank: "int" },
            { code: `// Type 2:`, editable: false },
            { code: `___ midVar;   // 2 Bytes `, blank: "short" },
            { code: `// Type 3:`, editable: false },
            { code: `___ lightVar; // 1 Byte  `, blank: "char" },
          ],
          tests: [
            { input: null, expected: 1, label: "" }
          ],
        },
        reflect: {
          question: "Packed structs magically save enormous memory on embedded systems, but can actively hurt latency performance drastically. Knowing how CPUs read memory, why exactly?",
        },
      },
    }
  ]
};

// ─── MODULE 2 QUIZZES ─────────────────────────────────────────────────────────

export const QUIZZES_M2 = {
  m2l1: [
    { q: "What memory constraint region physically holds locally defined function variables?", opts: ["Heap Memory", "Stack Memory", "The BIOS", "Disk Storage"], ans: 1 },
    { q: "What compile-time utility identifies the precise hardware byte occupancy of an element?", opts: [".length", "capacity()", "sizeof()", "sizeOf()"], ans: 2 },
    { q: "If you physically place two discrete variables together linearly in code, the hardware strictly positions them exactly adjacent.", opts: ["True, explicitly guaranteed", "False, complier heavily rules layout logic"], ans: 1 },
    { q: "The stack typically dynamically grows in what literal address direction fundamentally?", opts: ["Upwards (0x0 to 0xFF)", "Downwards (0xFF to 0x0)", "Sideways randomly", "Externally"], ans: 1 }
  ],
  m2l2: [
    { q: "Why is a standard 'int' dramatically dangerous for strictly bounded file formats?", opts: ["It causes lag", "It uses pointers natively", "Its rigid byte size is fiercely implementation-defined", "It requires structs"], ans: 2 },
    { q: "What C header actively solved the sizing ambiguity chaos across varying platforms?", opts: ["<stdio.h>", "<math.h>", "<stdlib.h>", "<stdint.h>"], ans: 3 },
    { q: "Assigning heavily a 4-byte unsigned int containing 800 into a strict 1-byte char causes what exact action?", opts: ["A fatal crash automatically", "Silent truncation of the largest upper bytes", "The char upgrades to 4 bytes dynamically", "A network fault"], ans: 1 },
    { q: "How many absolute bits form a standard guaranteed uint16_t?", opts: ["8 bits", "16 bits", "32 bits", "2 bytes exactly"], ans: 1 }
  ],
  m2l3: [
    { q: "What is an array inherently effectively within C execution?", opts: ["A strict linked list", "A contiguous linear block of bytes", "A hashed map dynamically allocated", "A resizable stack"], ans: 1 },
    { q: "In pure pointer arithmetic, pointing to *(arr + 3) targets which bracketed element?", opts: ["arr[0]", "arr[2]", "arr[3]", "arr[4]"], ans: 2 },
    { q: "If you iterate explicitly past an array boundary physically, C gracefully stops you natively.", opts: ["True", "False, C accesses raw ghost memory aggressively (overrun limit)"], ans: 1 },
    { q: "If short arr is established at base 0x1000, where explicitly does mathematically arr[2] reside?", opts: ["0x1004", "0x1002", "0x1008", "0x2000"], ans: 0 }
  ],
  m2l4: [
    { q: "Why do compilers heavily inject functionally dead bytes (padding) explicitly inside structs?", opts: ["To force CPU clock crashes", "To restrict file limits", "To forcibly align variable endpoints beautifully to optimization constraints", "To defeat hackers naturally"], ans: 2 },
    { q: "What ordering pattern optimally suppresses structural padding automatically?", opts: ["Alphabetical naming arrays", "Random structuring logic", "Variables ordered strictly Largest byte size to Smallest", "Smallest width to Largest"], ans: 2 },
    { q: "If struct Waste carries specifically [char, int], the logical byte combination footprint evaluates to 5. What is the usual runtime execution layout size?", opts: ["5 bytes", "6 bytes", "8 bytes", "4 bytes"], ans: 2 },
    { q: "What compiler directive fiercely abandons padding logic aggressively?", opts: ["__attribute__((aligned))", "__attribute__((packed))", "#pragma optimize", "struct --no-pad"], ans: 1 }
  ]
};
