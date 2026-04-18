import React from "react";

// ─── CURRICULUM DATA ─────────────────────────────────────────────────────────

export const DIAGRAMS = {
  bit_byte: () => (
    <svg viewBox="0 0 560 200" style={{ width: "100%", maxWidth: 560 }}>
      {/* ... keeping the provided bit_byte diagram, expanded slightly */}
      <defs>
        <linearGradient id="bitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00ff88" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <text x="16" y="28" fill="#666" fontSize="11" fontFamily="DM Mono">
        decimal 42 as 8 bits (1 byte)
      </text>
      {[0, 0, 1, 0, 1, 0, 1, 0].map((bit, i) => {
        const x = 16 + i * 66;
        const active = bit === 1;
        return (
          <g key={i}>
            <rect x={x} y={40} width={58} height={58} rx={6} fill={active ? "rgba(0,255,136,0.12)" : "rgba(255,255,255,0.03)"} stroke={active ? "#00ff88" : "#2a2a2a"} strokeWidth={active ? 1.5 : 1} />
            <text x={x + 29} y={77} textAnchor="middle" fill={active ? "#00ff88" : "#444"} fontSize="22" fontFamily="DM Mono" fontWeight="500">{bit}</text>
            <text x={x + 29} y={115} textAnchor="middle" fill={active ? "#888" : "#333"} fontSize="10" fontFamily="DM Mono">2^{7 - i}</text>
            <text x={x + 29} y={128} textAnchor="middle" fill={active ? "#00cc70" : "#2a2a2a"} fontSize="10" fontFamily="DM Mono">{active ? Math.pow(2, 7 - i) : ""}</text>
            <text x={x + 29} y={158} textAnchor="middle" fill="#333" fontSize="9" fontFamily="DM Mono">bit {7 - i}</text>
          </g>
        );
      })}
      <line x1="16" y1="168" x2="544" y2="168" stroke="#222" strokeWidth={1} />
      <text x="16" y="185" fill="#555" fontSize="11" fontFamily="DM Mono">32 + 8 + 2 = 42</text>
      <text x="440" y="185" fill="#00ff88" fontSize="11" fontFamily="DM Mono" fontWeight="500">0x2A</text>
    </svg>
  ),
  memory_units: () => {
    const units = [
      { label: "Bit", sub: "1 bit", h: 14, color: "#333" },
      { label: "Nibble", sub: "4 bits", h: 20, color: "#2a3a2a" },
      { label: "Byte", sub: "8 bits", h: 26, color: "#1a3a1a" },
      { label: "KiB", sub: "1,024 B", h: 36, color: "#0d2e1a" },
      { label: "MiB", sub: "1,048,576 B", h: 48, color: "#003d1a" },
      { label: "GiB", sub: "2³⁰ bytes", h: 62, color: "#004d20" },
    ];
    return (
      <svg viewBox="0 0 480 220" style={{ width: "100%", maxWidth: 480 }}>
        <text x="16" y="20" fill="#555" fontSize="11" fontFamily="DM Mono">binary (IEC) hierarchy</text>
        {units.map((u, i) => {
          const barY = 30 + i * 30;
          const w = 60 + i * 60;
          return (
            <g key={i}>
              <rect x={16} y={barY} width={w} height={22} rx={3} fill={u.color} stroke="#00ff8820" strokeWidth={1} />
              <text x={24} y={barY + 15} fill="#00ff88" fontSize="11" fontFamily="DM Mono" fontWeight="500">{u.label}</text>
              <text x={w + 24} y={barY + 15} fill="#555" fontSize="10" fontFamily="DM Mono">{u.sub}</text>
              {i > 0 && <text x={w - 12} y={barY - 4} fill="#333" fontSize="9" fontFamily="DM Mono">×{i < 2 ? "2" : "1024"}</text>}
            </g>
          );
        })}
      </svg>
    );
  },
  number_bases: () => {
    const rows = [
      { base: "BIN", value: "0010 1010", color: "#4488ff" },
      { base: "OCT", value: "052", color: "#ff8844" },
      { base: "DEC", value: "42", color: "#ffcc00" },
      { base: "HEX", value: "2A", color: "#00ff88" },
    ];
    return (
      <svg viewBox="0 0 420 160" style={{ width: "100%", maxWidth: 420 }}>
        <text x="16" y="22" fill="#555" fontSize="11" fontFamily="DM Mono">four representations of the same value</text>
        {rows.map((r, i) => (
          <g key={i}>
            <rect x={16} y={34 + i * 30} width={60} height={22} rx={3} fill="rgba(255,255,255,0.04)" />
            <text x={46} y={50 + i * 30} textAnchor="middle" fill={r.color} fontSize="11" fontFamily="DM Mono" fontWeight="500">{r.base}</text>
            <text x={100} y={50 + i * 30} fill="#eee" fontSize="15" fontFamily="DM Mono">{r.value}</text>
          </g>
        ))}
        <line x1="88" y1="32" x2="88" y2="148" stroke="#222" strokeWidth={1} />
        <text x="300" y="90" fill="#333" fontSize="11" fontFamily="DM Mono" textAnchor="middle">all equal</text>
        <text x="300" y="108" fill="#555" fontSize="22" fontFamily="DM Mono" textAnchor="middle">42</text>
      </svg>
    );
  },
  endianness: () => {
    return (
      <svg viewBox="0 0 540 220" style={{ width: "100%", maxWidth: 540 }}>
        <text x="16" y="20" fill="#555" fontSize="11" fontFamily="DM Mono">Storing 0A 0B 0C 0D at address 0x1000</text>
        
        {/* Memory addresses */}
        {[0, 1, 2, 3].map(i => (
          <text key={`addr-${i}`} x={90 + (i * 90)} y={50} fill="#666" fontSize="11" fontFamily="DM Mono" textAnchor="middle">
            0x100{i}
          </text>
        ))}

        {/* Big Endian */}
        <text x="16" y="85" fill="#4488ff" fontSize="12" fontFamily="DM Mono" fontWeight="bold">Big Endian</text>
        {["0A", "0B", "0C", "0D"].map((byte, i) => (
          <g key={`be-${i}`}>
            <rect x={55 + (i * 90)} y={65} width={70} height={30} rx={4} fill="rgba(68,136,255,0.1)" stroke="#4488ff" strokeWidth="1" />
            <text x={90 + (i * 90)} y={85} fill="#ddd" fontSize="14" fontFamily="DM Mono" textAnchor="middle">{byte}</text>
          </g>
        ))}

        {/* Little Endian */}
        <text x="16" y="145" fill="#00ff88" fontSize="12" fontFamily="DM Mono" fontWeight="bold">Little Endian</text>
        {["0D", "0C", "0B", "0A"].map((byte, i) => (
          <g key={`le-${i}`}>
            <rect x={55 + (i * 90)} y={125} width={70} height={30} rx={4} fill="rgba(0,255,136,0.1)" stroke="#00ff88" strokeWidth="1" />
            <text x={90 + (i * 90)} y={145} fill="#ddd" fontSize="14" fontFamily="DM Mono" textAnchor="middle">{byte}</text>
          </g>
        ))}
        
        <text x="16" y="200" fill="#888" fontSize="10" fontFamily="DM Mono">x86 processors use Little Endian. Network protocols (TCP/IP) use Big Endian.</text>
      </svg>
    )
  }
};

export const MODULE_1 = {
  id: "m1",
  title: "Bits & Bytes",
  subtitle: "The language of machines",
  icon: "01",
  lessons: [
    {
      id: "m1l1",
      title: "What is a Bit?",
      tag: "FOUNDATION",
      sections: {
        concept: {
          title: "The Atom of Computing",
          body: `Everything a computer does — running your browser, storing a photo, playing music — comes down to one fundamental unit: the **bit**.

A bit is the simplest possible piece of information. It has exactly two states: **0** or **1**. Off or on. False or true. No current or current flowing. 

At a physical level, inside the silicon of your computer's CPU and memory, bits are implemented using transistors acting as microscopic switches. A voltage level above a certain threshold (like 3.3V) is considered a '1', while a voltage close to 0V is considered a '0'. Because there are billions of these tiny switches acting in concert, physical systems with two stable states are extremely easy to build, operate mathematically, and remain reliable over billions of operations per second.

The word *bit* is a portmanteau of **binary digit**. This term was coined by statistician John Tukey in 1947 and popularized by Claude Shannon in his landmark 1948 paper "A Mathematical Theory of Communication," which laid the foundation for modern information theory.`,
          keyPoints: [
            "A bit is the smallest unit of information.",
            "Two states only: 0 or 1.",
            "Physical reason: two-state voltage systems are reliable and error-resistant.",
            "8 bits = 1 byte.",
          ],
          flashcard: {
            front: "What does 'bit' stand for, and what are its possible states?",
            back: "Stands for 'binary digit'. It is the smallest unit of digital information, representing exactly two states: typically 0 or 1.",
          },
        },
        observe: {
          title: "Bits in Action",
          code: `/* How a byte stores the number 42 */

// Binary representation of 42:
// 0  0  1  0  1  0  1  0
// ↑                     ↑
// bit 7 (MSB)          bit 0 (LSB)

// Each position has a place value (power of 2):
// 128  64  32  16   8   4   2   1
//   0   0   1   0   1   0   1   0

// Add the 1s: 32 + 8 + 2 = 42 ✓

unsigned char x = 42;   // 1 byte, values 0-255
signed char   y = -42;  // 1 byte, values -128 to 127

// Bit manipulation examples:
x = x | (1 << 3);   // SET bit 3   → 42 | 8  = 58
x = x & ~(1 << 3);  // CLEAR bit 3 → 58 & ~8 = 42  
x = x ^ (1 << 0);   // FLIP bit 0  → 42 ^ 1  = 43`,
          annotations: [
            { line: 4, text: "42 in binary. Most Significant Bit (MSB) is the leftmost." },
            { line: 12, text: "Place values are powers of 2 (2⁰=1, 2¹=2...)" },
            { line: 15, text: "Unsigned ensures values stay exclusively positive (0 to 255 for 8 bits)." },
            { line: 19, text: "Bitwise OR (|) forces a bit to 1." },
            { line: 20, text: "Bitwise AND+NOT (& ~) pulls a bit back to 0." },
            { line: 21, text: "XOR (^) flips or toggles a bit state." },
          ],
          diagram: "bit_byte",
        },
        do: {
          title: "Binary Converter",
          prompt: "Complete the function that converts a decimal number (0–255) to its 8-bit binary string representation.",
          lines: [
            { code: `function toBinary(decimal) {`, editable: false },
            { code: `  let result = "";`, editable: false },
            { code: `  for (let i = ___; i >= 0; i--) {`, blank: "7" },
            { code: `    result += (decimal >> i) & ___;`, blank: "1" },
            { code: `  }`, editable: false },
            { code: `  return result;`, editable: false },
            { code: `}`, editable: false },
          ],
          tests: [
            { input: 42, expected: "00101010", label: "toBinary(42)" },
            { input: 255, expected: "11111111", label: "toBinary(255)" },
            { input: 0, expected: "00000000", label: "toBinary(0)" },
            { input: 170, expected: "10101010", label: "toBinary(170)" },
          ],
        },
        reflect: {
          question: "If computers intrinsically use binary (base-2) at the hardware level, what is the practical reason humans invented higher base abstractions like base-10 (decimal) or base-16 (hexadecimal)?",
        },
      },
    },
    {
      id: "m1l2",
      title: "Bytes & Memory Units",
      tag: "FOUNDATION",
      sections: {
        concept: {
          title: "From Bits to Kilobytes",
          body: `A single bit isn't very useful on its own. It's like asking "is it raining?" Yes or no. To build vocabulary, we need to group them. We group 8 bits into a **byte** — the fundamental addressable unit of memory in modern architectures. 

Why 8? Early computers used various groupings (such as 6-bit or 9-bit words), but IBM's System/360 architecture in 1964 standardized 8-bit bytes, which was enough to cover English alphabet characters, numbers, and basic symbols using ASCII. The industry quickly followed.

Because we need to manage billions of these tiny bytes, larger prefix units were created. However, the computing world awkwardly uses **two different systems** interchangeably:

**Decimal (SI) prefixes** — heavily used by storage providers to market hard drives:
- 1 KB = 1,000 bytes (10³)
- 1 MB = 1,000,000 bytes (10⁶)

**Binary prefixes (IEC)** — actually used by the OS and RAM:
- 1 KiB = 1,024 bytes (2¹⁰)
- 1 MiB = 1,048,576 bytes (2²⁰)

A "500 GB" (decimal) hard drive mathematically equates to roughly "~465 GiB" (binary), leading to the illusion of "missing" storage when you view the drive on your Windows OS.`,
          keyPoints: [
            "8 bits = 1 byte (the minimum directly addressable block of memory in C).",
            "Storage drives typically market sizes using SI units (1 KB = 1000 Bytes).",
            "Your OS measures allocations in binary units (1 KiB = 1024 Bytes).",
            "This gap creates the missing storage phenomenon you see in operating systems.",
          ],
          flashcard: {
            front: "What is the difference between a Kilobyte (KB) and a Kibibyte (KiB)?",
            back: "A Kilobyte (KB) is 1,000 bytes. A Kibibyte (KiB) is 1,024 bytes (2^10). Windows displays sizes in KiB but labels them as KB.",
          },
        },
        observe: {
          title: "Memory Units Ladder",
          code: `/* Memory unit conversions */

// --- Binary (IEC) --- powers of 2
1 byte   = 8 bits
1 KiB    = 1,024 bytes       = 2^10 bytes
1 MiB    = 1,048,576 bytes   = 2^20 bytes
1 GiB    = 1,073,741,824 B   = 2^30 bytes
1 TiB    = 2^40 bytes

// --- Decimal (SI) --- powers of 10
1 KB     = 1,000 bytes       = 10^3 bytes
1 MB     = 1,000,000 bytes   = 10^6 bytes
1 GB     = 1,000,000,000 B   = 10^9 bytes

// --- Typical variable footprints in C ---
char     c;   // 1 byte
short    s;   // 2 bytes
int      i;   // 4 bytes (varies by architecture)
long     l;   // 8 bytes (on 64-bit systems)
double   d;   // 8 bytes

// Typical address spaces on 64-bit systems:
// Hardware RAM: 8-64 GiB natively addressed
// Thread Stack: ~8 MiB (preventing recursion explosions!)
`,
          annotations: [
            { line: 5, text: "KiB = 2¹⁰ = 1024. OS default scale." },
            { line: 11, text: "KB = 10³ = 1000. Storage marketing." },
            { line: 16, text: "A char is guaranteed to be 1 byte." },
            { line: 18, text: "Int size depends heavily on compiler and target OS." },
          ],
          diagram: "memory_units",
        },
        do: {
          title: "Unit Converter",
          prompt: "Complete the byte-to-human-readable converter, converting raw byte numbers into proper Kibibytes (KiB), Mebibytes (MiB), etc.",
          lines: [
            { code: `function humanize(bytes) {`, editable: false },
            { code: `  const units = ["B","KiB","MiB","GiB","TiB"];`, editable: false },
            { code: `  let i = 0;`, editable: false },
            { code: `  while (bytes >= ___ && i < units.length - 1) {`, blank: "1024" },
            { code: `    bytes /= ___;`, blank: "1024" },
            { code: `    i___;`, blank: "++" },
            { code: `  }`, editable: false },
            { code: "  return `${bytes.toFixed(2)} ${units[i]}`;", editable: false },
            { code: `}`, editable: false },
          ],
          tests: [
            { input: 1024, expected: "1.00 KiB", label: "humanize(1024)" },
            { input: 1048576, expected: "1.00 MiB", label: "humanize(1048576)" },
            { input: 500, expected: "500.00 B", label: "humanize(500)" },
            { input: 1536, expected: "1.50 KiB", label: "humanize(1536)" },
          ],
        },
        reflect: {
          question: "Your new laptop has 16 GB of RAM. The OS indicates it has reserved 4.2 GiB. In what contexts do software engineers actually care about every single byte vs megabytes or gigabytes?",
        },
      },
    },
    {
      id: "m1l3",
      title: "Number Systems",
      tag: "CORE SKILL",
      sections: {
        concept: {
          title: "Binary, Octal, Hexadecimal",
          body: `At the hardware layer, our machines exclusively speak binary. But for humans, writing code directly in 0s and 1s quickly becomes an unreadable nightmare. 

That's why programmers leverage **hexadecimal** (base-16) and sometimes **octal** (base-8). They provide visual shorthands that natively map directly to binary, something that decimal (base-10, our human language) fundamentally fails to do.

**Hexadecimal** uses numerals 0–9 and alphabetic letters A–F (for numbers 10–15). Its magic trick relies on powers of 2. A single hex digit naturally represents exactly 4 bits (called a *nibble*). Hence, any 8-bit byte maps beautifully and reliably into exactly TWO hex characters. It's incredibly compact!

**Octal** (base-8) maps 3 bits per character. It traces back to old systems (like the DEC PDP) that operated on numbers built natively in 12, 18, and 36-bit structures instead of groups of 8. Today you'll still see it alive and well in Unix file permissions: \`chmod 755\`.`,
          keyPoints: [
            "Hexadecimal: base-16. Digits 0-9 and A-F.",
            "1 Hex Symbol = 4 Bits exactly (Half a byte or 'nibble').",
            "1 Byte = 2 Hex Digits (Covering ranges 0x00 to 0xFF).",
            "Octal: base-8. Digits 0-7. Used aggressively in Linux permissions.",
          ],
          flashcard: {
            front: "What is 0xFF in Decimal vs Binary?",
            back: "0xFF is 255 in Decimal. In Binary, it represents all 8 bits turned ON (11111111).",
          },
        },
        observe: {
          title: "Base Conversions",
          code: `/* Viewing the exact same value in 4 different bases in C */

int x = 42;       // decimal  (base 10) -> Pure human math
int y = 0x2A;     // hex      (base 16) → (2 × 16) + 10 = 42
int z = 052;      // octal    (base  8) → (5 × 8)  +  2 = 42
int b = 0b101010; // binary   (base  2) → 32 + 8 + 2    = 42

// You absolutely must memorize these exact hex signatures:
// 0x00 = 0     = 00000000
// 0x0F = 15    = 00001111  (isolates the bottom 4 bits)
// 0xF0 = 240   = 11110000  (isolates the top 4 bits)
// 0xFF = 255   = 11111111  (the absolute maximum for a single unsigned byte)
// 0x7F = 127   = 01111111  (the absolute maximum for a signed byte)
// 0x80 = 128   = 10000000  (the absolute minimum for a signed byte | -128)

// Example: extracting nibbles
uint8_t colorData = 0xAB;
uint8_t topNibble = (colorData >> 4) & 0x0F; // Extracting 'A' -> 10
uint8_t botNibble =  colorData       & 0x0F; // Extracting 'B' -> 11`,
          annotations: [
            { line: 4, text: "'0x' prefix denotes hexadecimal in dozens of programming languages." },
            { line: 5, text: "A leading 0 means octal in C. Be extremely careful not to accidentally prefix decimals!" },
            { line: 6, text: "'0b' signals literal binary." },
            { line: 10, text: "0x0F is known as a bitmask. Using AND extracts only those bits." },
            { line: 18, text: "Bit shifting right pushes bits out, bringing the top 4 down linearly." },
          ],
          diagram: "number_bases",
        },
        do: {
          title: "Hex Encoder",
          prompt: "Complete the logic snippet that grabs a single uint8 (0-255) and splits it into a verified 2-character hex string.",
          lines: [
            { code: `function toHex(byte) {`, editable: false },
            { code: `  const hex = "0123456789ABCDEF";`, editable: false },
            { code: `  const high = (byte >> ___) & 0x0F;`, blank: "4" },
            { code: `  const low  =  byte        & ___;`, blank: "0x0F" },
            { code: `  return hex[___] + hex[___];`, blank: "high", blank2: "low" },
            { code: `}`, editable: false },
          ],
          tests: [
            { input: 255, expected: "FF", label: "toHex(255)" },
            { input: 42, expected: "2A", label: "toHex(42)" },
            { input: 171, expected: "AB", label: "toHex(171)" },
          ],
        },
        reflect: {
          question: "When dealing with HTML colors (like #FF0000 being pure red), why is using hex drastically more logical for engineers than using decimal color values like RGB(255,0,0)?",
        },
      },
    },
    {
      id: "m1l4",
      title: "Endianness & Memory Alignment",
      tag: "SYSTEMS",
      sections: {
        concept: {
          title: "Bytes in Order",
          body: `You now know that values larger than a byte (like a 4-byte \`int\`) take up multiple slots in memory. But in what specific order are those bytes stored? This brings us to a notorious problem in systems programming: **Endianness**.

Imagine you need to store the hex number \`0x0A0B0C0D\` into memory starting at address 0x1000. 

**Big-Endian** stores the most significant byte first. The leftmost byte (0x0A) sits directly at 0x1000, 0x0B at 0x1001, etc. It feels like reading English left-to-right. Network protocols (TCP/IP) universally use Big-Endian structuring.

**Little-Endian** stores the least significant byte first. The rightmost byte (0x0D) drops at 0x1000, followed by 0x0C, 0x0B, 0x0A. This structure allows the arithmetic logic units inside CPUs to handle math more efficiently. Almost all modern personal computers (x86, ARM) are Little-Endian.

The terms come from Jonathan Swift's 1726 novel "Gulliver's Travels", depicting a bloody war over whether soft-boiled eggs should be cracked at the big end or the little end. The joke is that both arbitrarily work fine, but crossing them causes chaos.`,
          keyPoints: [
            "Big-Endian: Stores highest byte at the lowest address.",
            "Little-Endian: Stores lowest byte at the lowest address. (Used heavily in modern CPUs).",
            "This matters drastically when sending integers across a network to different hardware types.",
          ],
          flashcard: {
            front: "If an integer is 0x12345678, what byte is stored FIRST in a Little-Endian system?",
            back: "0x78. Little-Endian stores the 'little' (least significant) end first in memory.",
          },
        },
        observe: {
          title: "Memory Inspector",
          code: `/* Demonstrating Endianness in C with Pointers */

#include <stdio.h>
#include <stdint.h>

int main() {
    uint32_t val = 0x0A0B0C0D;
    
    // Cast the big 4-byte integer into a tiny 1-byte pointer
    // This allows us to inspect exactly what byte is sitting at the very first slot
    uint8_t *ptr = (uint8_t *)&val;
    
    printf("First byte: 0x%02X\\n", ptr[0]);
    
    // Output on x86 processors (Little Endian):
    // First byte: 0x0D
    
    // Output on old PowerPC/Network streams (Big Endian):
    // First byte: 0x0A
    
    return 0;
}`,
          annotations: [
            { line: 7, text: "A standard 32-bit (4-byte) integer." },
            { line: 11, text: "We explicitly trick the compiler into treating the int address as a single byte address." },
            { line: 13, text: "Looking at index 0 reveals what exactly was put physically first into memory." },
          ],
          diagram: "endianness",
        },
        do: {
          title: "Endian Swapper",
          prompt: "Write a function that swaps a 16-bit payload (2 bytes) between endian formats. Shift the high byte down, and shift the low byte up.",
          lines: [
            { code: `function swap16(val) {`, editable: false },
            { code: `  // val is a number like 0xFF00`, editable: false },
            { code: `  const high = (val >> 8) & ___; `, blank: "0xFF" },
            { code: `  const low  = (val & 0xFF) << ___; `, blank: "8" },
            { code: `  return high | low;`, editable: false },
            { code: `}`, editable: false },
          ],
          tests: [
            { input: 0xFF22, expected: 8959, label: "swap16(0xFF22) -> 0x22FF" },
            { input: 0x1234, expected: 13330, label: "swap16(0x1234) -> 0x3412" }
          ]
        },
        reflect: {
          question: "What devastating bug might happen if a multiplayer server built on an Intel CPU (Little Endian) directly sends an X,Y coordinate packet to an old console built with a Big Endian CPU?",
        },
      }
    }
  ],
};

export const QUIZZES = {
  m1l1: [
    { q: "How many states can a single bit represent?", opts: ["1", "2", "8", "16"], ans: 1 },
    { q: "What does the expression (x >> 3) & 1 compute?", opts: ["Sets bit 3", "Clears bit 3", "Reads bit 3", "Flips bit 3"], ans: 2 },
    { q: "Which operation naturally FLIPS a specific binary bit?", opts: ["AND (&)", "OR (|)", "XOR (^)", "NOT (~)"], ans: 2 },
    { q: "What voltage state typically maps to a binary '0' at the physical CPU layer?", opts: ["3.3v", "5.0v", "Ground/0V", "12v"], ans: 2 }
  ],
  m1l2: [
    { q: "How many exact bytes exist in 1 KiB?", opts: ["1000", "1024", "1048", "512"], ans: 1 },
    { q: "A file is 2 MiB. Exactly how many bytes is that?", opts: ["2,000,000", "2,048,000", "2,097,152", "2,100,000"], ans: 2 },
    { q: "Why does a '500 GB' drive show as ~465 GB in Windows?", opts: ["Windows rounds down", "Manufacturer uses decimal (10³), OS uses binary (2¹⁰)", "Some space is logically reserved", "FAT32 file overhead"], ans: 1 },
    { q: "In the C language, what is the guaranteed size of a char?", opts: ["2 Bytes", "1 Byte", "Depends on OS", "1 Bit"], ans: 1 }
  ],
  m1l3: [
    { q: "How many absolute bits does one hexadecimal digit visually represent?", opts: ["2", "3", "4", "8"], ans: 2 },
    { q: "What is 0xFF converted to decimal?", opts: ["15", "127", "240", "255"], ans: 3 },
    { q: "In standard code, what does a leading ZERO on an integer literal mean? (e.g. 052)", opts: ["Hexadecimal", "Octal representation", "Binary string", "Creates an error"], ans: 1 },
    { q: "Why does memory addresses natively map cleanly into Hexadecimal (e.g., 0xA4F2) instead of Decimal?", opts: ["It's harder to hack", "Hex symbols align perfectly into byte-sized nibbles", "The keyboard lacks numbers", "C Compilers enforce it"], ans: 1 }
  ],
  m1l4: [
    { q: "What dictates whether a system is Big-Endian or Little-Endian?", opts: ["The Operating System", "The Hardware CPU Architecture", "The Network Cable", "The programming language chosen"], ans: 1 },
    { q: "If memory stores 0xAA first, then 0xBB, then 0xCC, then 0xDD, what was the original 32-bit integer on a Little-Endian machine?", opts: ["0xAABBCCDD", "0xDDCCBBAA", "0xDDAABBCC", "0x00000000"], ans: 1 },
    { q: "If you send integer data over the internet, what Endian format is globally required by Network byte order protocols?", opts: ["Little-Endian", "Big-Endian", "Mixed-Endian", "It does not matter"], ans: 1 },
    { q: "Which of the following architectures historically heavily utilized Big Endian?", opts: ["Intel x86", "AMD64", "IBM PowerPC", "Modern ARM Phones"], ans: 2 }
  ]
};
