import careerProfiles from "../data/careerProfiles.json";

export type CareerProfile = {
  id: string;
  name: string;
  ideal_mbti: string;
  description: string;
  tags?: string[];
};

export type MatchResult = {
  career: CareerProfile;
  score: number; // 0..1
  matchedLetters: string[];
  explanation: string;
};

function normalizeMBTIRaw(code: string) {
  return String(code || "")
    .trim()
    .toUpperCase();
}

function splitMBTI(code: string) {
  const raw = normalizeMBTIRaw(code);
  const base = raw.substring(0, 4);
  const suffix =
    raw.length > 4 && raw[4] === "-" ? raw.substring(5) : raw.substring(4);
  return { base, suffix };
}

function validateMBTIBase(code: string) {
  return /^[IE][SN][TF][JP]$/.test(code);
}

export function matchCareers(mbtiType: string, top = 5): MatchResult[] {
  const { base, suffix } = splitMBTI(mbtiType);
  if (!validateMBTIBase(base)) throw new Error("Invalid MBTI type");

  const suffixBoost = (() => {
    if (!suffix) return 0;
    const s = suffix.toUpperCase();
    if (s.startsWith("A")) return 0.05; // assertive -> small positive
    if (s.startsWith("T")) return -0.03; // turbulent -> small negative
    return 0;
  })();

  const results: MatchResult[] = (careerProfiles as CareerProfile[])
    .map((c) => {
      const ideal = normalizeMBTIRaw(c.ideal_mbti || "").substring(0, 4);
      let matchedLetters: string[] = [];
      for (let i = 0; i < 4; i++) {
        if (base[i] === ideal[i]) matchedLetters.push(base[i]);
      }
      const baseScore = matchedLetters.length / 4;
      let score = baseScore + suffixBoost;
      if (score > 1) score = 1;
      if (score < 0) score = 0;
      const explanation = `Matched ${matchedLetters.length}/4 letters: ${matchedLetters.join(", ")}${
        suffix ? `; variant: ${suffix}` : ""
      }`;
      return { career: c, score, matchedLetters, explanation };
    })
    .sort((a, b) => b.score - a.score);

  return results.slice(0, top);
}

export function safeMatch(mbtiType: string, top = 5) {
  try {
    return matchCareers(mbtiType, top);
  } catch (e) {
    return [];
  }
}

export default { matchCareers, safeMatch };
