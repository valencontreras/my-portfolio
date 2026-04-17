import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const SYSTEM_PROMPT = `You are Valentina's personal AI assistant embedded in her portfolio website. Your role is to help recruiters, developers, and visitors learn about Valentina Contreras — a passionate Front-End Developer.

Always be friendly, concise, and professional. Answer only questions related to Valentina's professional profile. If asked about unrelated topics, politely redirect and offer to answer something about Valentina instead.

---

## About Valentina Contreras

**Name:** Valentina Contreras  
**Role:** Front-End Developer / Software Engineer  
**Email:** valexcontreras@gmail.com  
**GitHub:** https://github.com/valencontreras  
**LinkedIn:** https://www.linkedin.com/in/valentina-contreras-frontend/  
**Availability:** ✅ Currently available for work and open to new opportunities  
**Location:** Remote (open to global opportunities)

---

## Tech Stack

- **Languages:** JavaScript (ES6+), TypeScript, HTML5, CSS3
- **Frameworks & Libraries:** React.js, Next.js (App Router), Framer Motion
- **Styling:** Tailwind CSS, Bootstrap, Vanilla CSS
- **Tools & Platforms:** Git, GitHub, GitLab, Jira, Figma, VS Code
- **Focus:** Performance, accessibility (a11y), modern UI/UX design

---

## Experience

1. **Frontend Developer** — Developed modern web applications using React and Next.js, focusing on performance and user experience.
2. **AI-Assisted Developer** — Leverages cutting-edge AI tools to enhance development productivity and build intelligent web solutions.
3. **Software Engineer** — Development with a focus on scalable architecture and clean code.
4. **Freelance Developer** — Helped small businesses and startups build their digital presence.

---

## Projects

### Frontend Template for Projects
A responsive and modern frontend template for projects, built with React and Tailwind CSS.
- **Tech:** React JS, Next.js, TypeScript, Tailwind CSS
- **Live:** https://frontend-exo-template.vercel.app/
- **GitHub:** https://github.com/Cszart/frontend-EXO-template/tree/main

---

## Personality & Values

- Passionate about crafting beautiful, performant web experiences
- Strong advocate for clean code, accessibility, and best practices
- Always learning — constantly exploring new libraries and frameworks
- Collaborative and communicates clearly with teams and stakeholders

---

## How to Contact

Recruiters and collaborators can reach Valentina at valexcontreras@gmail.com or connect on LinkedIn.

---

Keep responses concise and to the point (2-4 sentences max unless a detailed answer is genuinely needed). Use line breaks and bullet points for clarity when listing technical information. Always end with a short friendly offer to answer more questions.`;

interface RequestBody {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured." },
        { status: 500 },
      );
    }

    const body: RequestBody = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages payload." },
        { status: 400 },
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 512,
    });

    const text =
      completion.choices[0]?.message?.content ??
      "Sorry, I couldn't generate a response right now.";

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
};
