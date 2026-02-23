export interface SampleDoc {
  id: string;
  title: string;
  category: string;
  icon: string;
  preview: string;
  content: string;
}

export const SAMPLE_DOCS: SampleDoc[] = [
  {
    id: "employment-contract",
    title: "Employment Contract",
    category: "Legal",
    icon: "📄",
    preview: "Standard employment agreement with IP clause",
    content: `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into as of January 15, 2026, between TechCorp Inc., a Delaware corporation ("Company"), and Alexandra Chen ("Employee").

1. POSITION AND DUTIES
The Company hereby employs Employee as Senior Software Engineer. Employee shall report to the VP of Engineering and shall perform the following duties: design, develop, and maintain software systems; participate in code reviews; mentor junior engineers; collaborate with product and design teams; and such other duties as may be reasonably assigned.

2. TERM
This Agreement commences on February 1, 2026, and shall continue until terminated in accordance with Section 8 of this Agreement.

3. COMPENSATION
(a) Base Salary: Employee shall receive a base salary of $175,000 per year, payable bi-weekly.
(b) Bonus: Employee is eligible for an annual performance bonus of up to 20% of base salary, at the Company's discretion.
(c) Equity: Employee shall receive an option to purchase 50,000 shares of Common Stock at the fair market value as of the grant date, vesting over 4 years with a 1-year cliff.

4. BENEFITS
Employee shall be entitled to: (a) health, dental, and vision insurance; (b) 15 days paid vacation; (c) 10 days sick leave; (d) $2,000 annual professional development budget; (e) remote work flexibility up to 3 days per week.

5. INTELLECTUAL PROPERTY
(a) Employee acknowledges that all work product, inventions, discoveries, and improvements created by Employee during the term of employment that relate to the Company's business ("Work Product") shall be the sole and exclusive property of the Company.
(b) Employee shall promptly disclose to the Company all Work Product and shall execute any documents necessary to confirm the Company's ownership.
(c) This Section does not apply to inventions that Employee can demonstrate were developed entirely on Employee's own time without using Company resources, equipment, or confidential information, and that do not relate to the Company's current or anticipated business.

6. CONFIDENTIALITY
During and after the term of employment, Employee shall hold in strictest confidence all Confidential Information of the Company. "Confidential Information" means any information that is not generally publicly known, including but not limited to: trade secrets, customer data, source code, financial projections, business strategies, and personnel information.

7. NON-COMPETE
For a period of 12 months following termination, Employee shall not: (a) engage in any business that directly competes with the Company's core products in the enterprise software market; (b) solicit any Company customer that Employee had contact with during the 12 months prior to termination; (c) solicit or hire any Company employee.

8. TERMINATION
(a) The Company may terminate this Agreement at any time with or without Cause. If terminated without Cause, Employee shall receive 3 months severance.
(b) "Cause" means: material breach of this Agreement; fraud or dishonesty; willful misconduct; or conviction of a felony.
(c) Employee may resign with 2 weeks written notice.

9. GOVERNING LAW
This Agreement shall be governed by the laws of the State of California.

10. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties and supersedes all prior agreements, representations, and understandings.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.

TECHCORP INC.                    EMPLOYEE
By: Michael Torres               Alexandra Chen
Title: Chief People Officer      Date: January 15, 2026
Date: January 15, 2026`,
  },
  {
    id: "research-paper",
    title: "Exercise Science Abstract",
    category: "Research",
    icon: "🔬",
    preview: "Durability and carbohydrate in trained cyclists",
    content: `European Journal of Applied Physiology — Research Article

CARBOHYDRATE INGESTION DOES NOT ALTER THE VENTILATORY THRESHOLD IN TRAINED CYCLISTS: A RANDOMIZED CROSSOVER TRIAL

Authors: Harrison Dudley-Rode, John D. Foote, et al.
SPRINZ, Sport and Exercise Science, Faculty of Health and Environmental Sciences, Auckland University of Technology, Auckland, New Zealand

DOI: 10.1007/s00421-024-05687-w
Received: September 12, 2023 | Accepted: April 4, 2024

ABSTRACT

Purpose: The ventilatory threshold (VT1) is a critical metabolic marker reflecting the onset of non-linear blood lactate accumulation during incremental exercise. Carbohydrate (CHO) supplementation is widely used to support high-intensity performance, yet its acute effect on VT1 location remains unclear. This study investigated whether acute carbohydrate ingestion alters VT1 in trained cyclists.

Methods: Twelve trained male cyclists (VO2max: 62.4 ± 5.2 mL·kg⁻¹·min⁻¹; mean ± SD) completed two incremental cycling tests to exhaustion in a randomized, double-blind crossover design. Participants consumed either 75 g of carbohydrate (maltodextrin) dissolved in 500 mL water or a taste-matched placebo 45 minutes before testing. VT1 was identified using the V-slope method and ventilatory equivalents method by two blinded investigators. Respiratory gases were measured continuously via breath-by-breath analysis.

Results: VT1 was not significantly different between the CHO trial (64.7 ± 5.8% VO2max) and placebo trial (63.9 ± 6.1% VO2max; P = 0.52, d = 0.14). Peak power output (358 ± 42 W vs. 361 ± 40 W; P = 0.71) and VO2max (62.4 ± 5.2 vs. 62.8 ± 5.0 mL·kg⁻¹·min⁻¹; P = 0.68) were also unchanged between conditions. Respiratory exchange ratio at VT1 was modestly higher in the CHO condition (0.91 ± 0.03 vs. 0.88 ± 0.04; P = 0.03), indicating greater carbohydrate oxidation, but this did not translate to a shift in threshold location.

Conclusions: Acute carbohydrate ingestion does not alter the ventilatory threshold in trained cyclists. The VT1 represents a stable physiological marker reflecting long-term metabolic adaptation, not acute substrate availability. Practitioners should not expect carbohydrate supplementation to acutely shift this threshold. The primary determinants of VT1 location remain training-induced adaptations, including mitochondrial density and fat oxidation capacity.

Keywords: ventilatory threshold; carbohydrate supplementation; endurance performance; exercise metabolism; lactate threshold

INTRODUCTION

The ventilatory threshold (VT1) — often synonymous with the aerobic threshold or lactate threshold 1 (LT1) — represents the exercise intensity at which blood lactate begins to accumulate in a nonlinear fashion and ventilation increases disproportionately relative to oxygen consumption. VT1 is a robust and clinically relevant marker of cardiorespiratory fitness, providing practical information for training zone delineation and performance prediction independent of VO2max.

Carbohydrate supplementation during exercise has well-documented ergogenic effects on sustained exercise performance, particularly at intensities above the second ventilatory threshold (VT2). The mechanisms include maintenance of blood glucose, sparing of muscle glycogen, and central nervous system fatigue attenuation. However, whether acute CHO availability influences the location of VT1 — and therefore the metabolic threshold at which aerobic system begins to be supplemented by glycolytic pathways — remains a question of both theoretical and practical interest.

Theoretically, increased carbohydrate oxidation from supplementation could shift the crossover point at which carbohydrate oxidation exceeds fat oxidation, potentially raising VT1 expression in absolute terms. Practically, sports scientists and coaches who use VT1 to prescribe training zones need to know whether pre-exercise nutrition protocols systematically alter test results.`,
  },
  {
    id: "product-spec",
    title: "Product Requirements Doc",
    category: "Product",
    icon: "📋",
    preview: "Feature specification for AI assistant integration",
    content: `PRODUCT REQUIREMENTS DOCUMENT
Feature: Intelligent Document Assistant
Product: LegalFlow Pro
Version: 2.0
Owner: Jamie Park (Product)
Engineers: AI Platform Team
Last Updated: February 10, 2026
Status: APPROVED — Ready for Development

---

EXECUTIVE SUMMARY

LegalFlow Pro users spend an average of 4.2 hours per week manually reviewing documents to answer client questions. This PRD specifies an AI-powered document assistant that reduces this to under 30 minutes by enabling natural language Q&A over any uploaded document.

TARGET USERS

Primary: Litigation associates at law firms (50-500 attorneys)
Secondary: Legal operations teams at enterprise companies
Tertiary: Contract managers in financial services

USER RESEARCH INSIGHTS

From interviews with 34 users (March 2025):
- "I spend half my day looking for information I know is somewhere in a 200-page document"
- "Clients ask me questions that the contract answers — I just need to find the exact clause"
- "I worry about missing important provisions during document review"
- Top requested feature: "search that understands what I'm asking, not just keywords"

PROBLEM STATEMENT

Legal professionals review complex documents daily but have no efficient way to:
1. Answer specific questions without reading the entire document
2. Compare provisions across multiple versions
3. Identify missing or ambiguous clauses
4. Get summaries optimized for their specific use case

PROPOSED SOLUTION

An AI document assistant embedded in the document viewer that allows users to ask natural language questions and receive cited, accurate answers.

REQUIREMENTS

Functional Requirements:
F1. Users can upload documents in PDF, DOCX, or TXT format (max 50MB)
F2. System extracts and indexes document text within 30 seconds
F3. Users can ask questions in natural language via chat interface
F4. Responses include direct quotes with page/section citations
F5. System acknowledges when information is not in the document
F6. Users can ask follow-up questions maintaining conversation context
F7. Users can clear conversation and start fresh at any time
F8. Responses stream in real-time (not block until complete)

Non-Functional Requirements:
N1. Response latency: first token within 2 seconds, complete response within 10 seconds
N2. Accuracy: <5% hallucination rate (measured against ground truth Q&A pairs)
N3. Document size: handle up to 200 pages / 500,000 characters
N4. Privacy: document text is never stored server-side beyond the active session
N5. Availability: 99.9% uptime SLA

Security Requirements:
S1. All document content encrypted in transit (TLS 1.3+)
S2. No document persistence — content deleted from memory at session end
S3. Audit log of all queries (not document content) for compliance
S4. Role-based access — only users with document access can query it

TECHNICAL ARCHITECTURE

Document Processing Pipeline:
1. Client-side extraction (pdfjs / mammoth.js) → avoids server-side data exposure
2. Text chunking (1,000 token chunks, 200 token overlap)
3. Embedding generation via OpenAI text-embedding-3-small
4. Vector storage in Pinecone (session-scoped, TTL 24h)
5. Retrieval: top-5 chunks by cosine similarity to query
6. Generation: Claude claude-haiku-4-5 with retrieved context + conversation history

Alternative Considered: Full context approach (entire document in context window)
Pros: No retrieval needed, never misses relevant passages
Cons: Higher cost, slower, fails for very long documents
Decision: Use RAG for production; maintain full-context as fallback for documents <100k chars

METRICS FOR SUCCESS

Primary:
- M1: Time-to-answer reduction: >60% vs. manual search baseline
- M2: Accuracy: >95% on gold-standard Q&A test set
- M3: User adoption: >60% of active users try feature within 30 days

Secondary:
- M4: Session depth: avg >5 questions per session (indicates genuine utility)
- M5: NPS impact: feature users show +12 NPS vs. non-users

LAUNCH PLAN

Alpha: Internal testing (week 1-2)
Beta: 50 invited power users (week 3-4)
GA: Rollout to all Pro users (week 5)
Post-GA: Usage analysis, iterate on response quality

OPEN QUESTIONS

Q1: Should we support multi-document queries? (out of scope for v1)
Q2: Citation format — verbatim quote vs. page number vs. both? (Recommendation: both)
Q3: Do we flag low-confidence answers? How? (Investigation needed)

APPENDIX

Competitive Analysis:
- Harvey AI: Full legal AI stack, expensive, requires firm-wide deployment
- Casetext CARA: Good for case law, not for client-specific documents
- ChatPDF: Consumer-grade, no citation, no audit trail
- Our advantage: Native LegalFlow integration, privacy-first, citation-required responses`,
  },
];
