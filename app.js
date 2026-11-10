const EXTRACTOR_BASE_URL = "https://nyayadesk-supreme-court-extractor.vercel.app";

const FALLBACK_SOURCE_COLUMNS = [
  "title", "petitioner", "respondent", "description", "judge", "author_judge", "citation", "case_id", "cnr",
  "decision_date", "disposal_nature", "court", "available_languages", "raw_html", "path", "nc_display", "scraped_at", "year"
];
const FALLBACK_DERIVED_COLUMNS = [
  "record_id", "source_pdf_url", "source_metadata_url", "source_dataset", "source_repository", "source_license", "extracted_at",
  "source_headnote", "judges_normalized", "author_judge_normalized", "bench_strength", "judgment_text", "paragraph_count",
  "word_count", "text_sha256", "text_extraction_method"
];
const FALLBACK_ANALYSIS_COLUMNS = [
  "ai_headnote", "facts", "issues", "reasoning", "holding", "ratio", "final_order", "statutes_cited", "cases_cited",
  "citation_treatment", "keywords", "verification_status", "reviewer_status", "analysis_status", "ai_model", "prompt_version", "extraction_error"
];
const EXTRACTOR_SCHEMA_FALLBACK = {
  source_columns: FALLBACK_SOURCE_COLUMNS,
  derived_columns: FALLBACK_DERIVED_COLUMNS,
  analysis_columns: FALLBACK_ANALYSIS_COLUMNS,
  all_columns: [...FALLBACK_SOURCE_COLUMNS, ...FALLBACK_DERIVED_COLUMNS, ...FALLBACK_ANALYSIS_COLUMNS],
  groups: [
    { id: "identity", label: "Case identity", description: "Names, citations and stable identifiers from source metadata.", columns: ["record_id", "title", "petitioner", "respondent", "citation", "case_id", "cnr", "nc_display"] },
    { id: "court", label: "Court and decision", description: "Decision date, court, disposal and language information.", columns: ["court", "decision_date", "year", "disposal_nature", "available_languages"] },
    { id: "judges", label: "Judges and bench", description: "Original and normalized judge fields for analytics.", columns: ["judge", "author_judge", "judges_normalized", "author_judge_normalized", "bench_strength"] },
    { id: "source", label: "Source and provenance", description: "Raw source fields, URLs, licence and extraction timestamp.", columns: ["description", "raw_html", "path", "scraped_at", "source_pdf_url", "source_metadata_url", "source_dataset", "source_repository", "source_license", "extracted_at"] },
    { id: "text", label: "Judgment text", description: "Optional PDF text and measurable text properties.", columns: ["source_headnote", "judgment_text", "paragraph_count", "word_count", "text_sha256", "text_extraction_method"] },
    { id: "analysis", label: "Analysis-ready columns", description: "Blank until a separate verified enrichment pipeline runs.", columns: FALLBACK_ANALYSIS_COLUMNS }
  ]
};

const cases = [
  {
    id: "kesavananda",
    title: "Kesavananda Bharati Sripadagalvaru v. State of Kerala",
    shortTitle: "Kesavananda Bharati v. State of Kerala",
    citation: "(1973) 4 SCC 225",
    date: "24 April 1973",
    year: 1973,
    bench: 13,
    judges: "13-judge Constitution Bench",
    author: "Multiple opinions",
    category: "Constitutional law",
    tags: ["Basic structure", "Constitutional amendment", "Article 368"],
    summary: "Parliament’s amending power is broad, but it cannot be used to alter the basic structure of the Constitution.",
    background: "The case arose from challenges to land reform measures and constitutional amendments affecting property and the scope of Parliament’s power to amend the Constitution.",
    issues: ["Whether Parliament’s power under Article 368 is unlimited.", "Whether constitutional amendments may damage the Constitution’s essential identity."],
    holding: "By a narrow majority, the Court held that Parliament may amend the Constitution but may not destroy or damage its basic structure.",
    ratio: "The constituent power to amend the Constitution does not include a power to abrogate its basic structure.",
    headnote: true,
    language: "English"
  },
  {
    id: "maneka",
    title: "Maneka Gandhi v. Union of India",
    shortTitle: "Maneka Gandhi v. Union of India",
    citation: "(1978) 1 SCC 248 · AIR 1978 SC 597",
    date: "25 January 1978",
    year: 1978,
    bench: 7,
    judges: "7-judge Constitution Bench",
    author: "Multiple opinions",
    category: "Civil liberties",
    tags: ["Article 21", "Due process", "Personal liberty"],
    summary: "A procedure restricting life or personal liberty must be fair, just and reasonable, and fundamental rights must be read together rather than in isolation.",
    background: "The petitioner challenged the impounding of her passport without reasons being supplied at the time of the decision.",
    issues: ["What makes a procedure under Article 21 constitutionally valid.", "How Articles 14, 19 and 21 interact."],
    holding: "The Court rejected a narrow reading of Article 21 and required procedures affecting liberty to satisfy fairness and non-arbitrariness.",
    ratio: "A procedure that deprives a person of life or liberty cannot be arbitrary; it must be fair, just and reasonable.",
    headnote: true,
    language: "English"
  },
  {
    id: "vishaka",
    title: "Vishaka and Others v. State of Rajasthan and Others",
    shortTitle: "Vishaka v. State of Rajasthan",
    citation: "(1997) 6 SCC 241",
    date: "13 August 1997",
    year: 1997,
    bench: 3,
    judges: "3-judge bench",
    author: "J.S. Verma, C.J.",
    category: "Civil liberties",
    tags: ["Workplace harassment", "Gender equality", "Guidelines"],
    summary: "The Court framed binding safeguards against workplace sexual harassment to operate until Parliament enacted legislation.",
    background: "Public interest petitioners sought enforcement of fundamental rights following the gang rape of social worker Bhanwari Devi.",
    issues: ["How constitutional equality and dignity protections apply to workplace sexual harassment.", "Whether the Court could frame safeguards in the absence of legislation."],
    holding: "The Court laid down the Vishaka Guidelines, treating them as binding law until suitable legislation was enacted.",
    ratio: "Workplace sexual harassment violates constitutional guarantees of equality, dignity and the freedom to practice a profession.",
    headnote: true,
    language: "English"
  },
  {
    id: "puttaswamy",
    title: "Justice K.S. Puttaswamy (Retd.) and Another v. Union of India and Others",
    shortTitle: "Justice K.S. Puttaswamy (Retd.) v. Union of India",
    citation: "(2017) 10 SCC 1",
    date: "24 August 2017",
    year: 2017,
    bench: 9,
    judges: "9-judge Constitution Bench",
    author: "Six concurring opinions",
    category: "Technology",
    tags: ["Privacy", "Article 21", "Dignity", "Autonomy"],
    summary: "A unanimous nine-judge bench recognised privacy as a fundamental right protected as an intrinsic part of life, liberty and the freedoms guaranteed by Part III.",
    background: "A constitutional reference asked whether earlier decisions denying a fundamental right to privacy were correctly decided.",
    issues: ["Whether privacy is protected as a fundamental right under the Constitution.", "Whether M.P. Sharma and Kharak Singh correctly denied that status."],
    holding: "The Court unanimously held that privacy is a fundamental right. Earlier decisions were overruled to the extent that they denied constitutional protection to privacy.",
    ratio: "Privacy is intrinsic to life and personal liberty and is protected within the guarantees of Part III of the Constitution.",
    headnote: true,
    language: "English"
  },
  {
    id: "navtej",
    title: "Navtej Singh Johar and Others v. Union of India",
    shortTitle: "Navtej Singh Johar v. Union of India",
    citation: "(2018) 10 SCC 1",
    date: "6 September 2018",
    year: 2018,
    bench: 5,
    judges: "5-judge Constitution Bench",
    author: "Four concurring opinions",
    category: "Civil liberties",
    tags: ["Section 377", "Equality", "Dignity", "Constitutional morality"],
    summary: "Section 377 was held unconstitutional insofar as it criminalised consensual sexual conduct between adults in private.",
    background: "Petitioners challenged the continuing criminalisation of consensual same-sex intimacy under Section 377 of the Penal Code.",
    issues: ["Whether criminalising consensual same-sex intimacy violates equality, expression, dignity and privacy.", "The role of constitutional morality in protecting minorities."],
    holding: "The Court read down Section 377 to exclude consensual sexual acts between adults, while leaving other applications of the provision intact.",
    ratio: "Constitutional rights protect individual dignity, autonomy and equal citizenship against majoritarian social morality.",
    headnote: true,
    language: "English"
  },
  {
    id: "joseph-shine",
    title: "Joseph Shine v. Union of India",
    shortTitle: "Joseph Shine v. Union of India",
    citation: "(2019) 3 SCC 39",
    date: "27 September 2018",
    year: 2018,
    bench: 5,
    judges: "5-judge Constitution Bench",
    author: "Four concurring opinions",
    category: "Civil liberties",
    tags: ["Adultery", "Equality", "Dignity", "Autonomy"],
    summary: "The adultery offence in Section 497 of the Penal Code was struck down as unconstitutional.",
    background: "A public interest petition challenged the adultery offence, which treated a married woman as lacking legal agency and punished only the man involved.",
    issues: ["Whether Section 497 violated equality and dignity.", "Whether adultery should remain a criminal offence."],
    holding: "The Court unanimously invalidated Section 497 and the related procedural provision, while noting that adultery may remain a civil ground for matrimonial relief.",
    ratio: "A criminal law founded on gender stereotypes and denial of women’s autonomy violates equality and dignity.",
    headnote: true,
    language: "English"
  },
  {
    id: "anuradha",
    title: "Anuradha Bhasin v. Union of India and Others",
    shortTitle: "Anuradha Bhasin v. Union of India",
    citation: "(2020) 3 SCC 637",
    date: "10 January 2020",
    year: 2020,
    bench: 3,
    judges: "3-judge bench",
    author: "N.V. Ramana, J.",
    category: "Technology",
    tags: ["Internet shutdown", "Proportionality", "Article 19"],
    summary: "Orders suspending telecom services must be published and are subject to proportionality, temporal limits and judicial review.",
    background: "Petitions challenged restrictions on movement, communication and internet access imposed in Jammu and Kashmir in August 2019.",
    issues: ["How constitutional freedoms apply when exercised through the internet.", "What safeguards govern orders suspending telecom services."],
    holding: "The Court required publication and review of suspension orders, rejected indefinite suspension and applied proportionality to restrictions on constitutional freedoms.",
    ratio: "Restrictions on constitutional freedoms exercised through the internet must have a legal basis, pursue a legitimate aim and satisfy proportionality; indefinite suspension is impermissible.",
    headnote: true,
    language: "English"
  },
  {
    id: "iamai",
    title: "Internet and Mobile Association of India v. Reserve Bank of India",
    shortTitle: "Internet and Mobile Association of India v. RBI",
    citation: "(2020) 10 SCC 274",
    date: "4 March 2020",
    year: 2020,
    bench: 3,
    judges: "3-judge bench",
    author: "V. Ramasubramanian, J.",
    category: "Technology",
    tags: ["Virtual currency", "RBI", "Proportionality"],
    summary: "The RBI circular restricting regulated entities from providing services connected with virtual currencies was set aside on proportionality grounds.",
    background: "Virtual-currency businesses and an industry association challenged an RBI circular that cut off banking services to entities dealing in virtual currencies.",
    issues: ["Whether the RBI had authority over risks connected with virtual currencies.", "Whether the banking restriction was proportionate."],
    holding: "The Court recognised the RBI’s regulatory authority but set aside the circular because the restriction failed the proportionality analysis on the record presented.",
    ratio: "A regulatory measure affecting a lawful business must maintain a proportionate relationship between the identified harm and the chosen restriction.",
    headnote: true,
    language: "English"
  },
  {
    id: "supriyo",
    title: "Supriyo @ Supriya Chakraborty and Another v. Union of India",
    shortTitle: "Supriyo @ Supriya Chakraborty v. Union of India",
    citation: "2023 INSC 920",
    date: "17 October 2023",
    year: 2023,
    bench: 5,
    judges: "5-judge Constitution Bench",
    author: "Multiple opinions",
    category: "Civil liberties",
    tags: ["Marriage equality", "Queer rights", "Judicial review"],
    summary: "The Court declined to read a gender-neutral right to marry into the Special Marriage Act, while differing on aspects of relationship recognition and adoption.",
    background: "Petitioners sought legal recognition of marriages between persons of the same sex under the Special Marriage Act and related laws.",
    issues: ["Whether the Constitution guarantees a right to marry.", "Whether the Special Marriage Act could be judicially read in a gender-neutral manner."],
    holding: "The Court declined to rewrite the Special Marriage Act and held that creating a legal status of marriage is for the legislature. The separate opinions differed on some connected questions.",
    ratio: "The Court may review existing legal rules for constitutional validity, but cannot create a new legislative framework by extensively rewriting a statute.",
    headnote: true,
    language: "English"
  }
];

const researchAnswers = {
  privacy: {
    title: "Privacy is a constitutionally protected fundamental right",
    short: "<strong>Short answer.</strong> A nine-judge bench unanimously recognised privacy as a fundamental right protected by the Constitution. Its protection arises primarily from life and personal liberty, while also drawing support from the freedoms and guarantees in Part III.",
    reasoning: [
      `In <em>Justice K.S. Puttaswamy (Retd.) v. Union of India</em>, the Court resolved the constitutional question directly and overruled earlier authority to the extent it denied a protected right to privacy. <button class="cite-pill" data-case="puttaswamy" type="button">1</button>`,
      `The doctrinal foundation also builds on <em>Maneka Gandhi</em>, which required any procedure restricting personal liberty to be fair, just and reasonable. <button class="cite-pill" data-case="maneka" type="button">2</button> Later, <em>Navtej Singh Johar</em> applied privacy, dignity and autonomy principles when invalidating the criminalisation of consensual same-sex intimacy. <button class="cite-pill" data-case="navtej" type="button">3</button>`
    ],
    steps: [
      ["Begin with the nine-judge authority", "Use Puttaswamy for the status and constitutional foundations of privacy."],
      ["Identify the particular privacy interest", "For example: bodily integrity, decisional autonomy, home, communications or information."],
      ["Test the restriction", "Examine legal basis, legitimate state aim, proportionality and safeguards on the actual facts."]
    ],
    caution: "This answers the constitutional status of privacy. A specific privacy restriction still requires analysis of legality, legitimate aim, proportionality and procedural safeguards.",
    sources: ["puttaswamy", "maneka", "navtej"],
    claims: 5
  },
  basic: {
    title: "Parliament cannot amend away the Constitution’s basic structure",
    short: "<strong>Short answer.</strong> Parliament has wide power to amend the Constitution under Article 368, but that power does not extend to destroying or damaging its basic structure.",
    reasoning: [
      `<em>Kesavananda Bharati</em>, decided by a thirteen-judge bench, established the controlling limitation: constitutional amendment cannot abrogate the Constitution’s basic structure. <button class="cite-pill" data-case="kesavananda" type="button">1</button>`,
      `The judgment contains multiple opinions. A filing should therefore identify the precise feature said to be basic and trace it through later authorities rather than treating “basic structure” as an open-ended label.`
    ],
    steps: [
      ["Identify the challenged amendment", "Separate the text of the amendment from the policy dispute around it."],
      ["Name the asserted basic feature", "Link it to authority recognising that feature, rather than relying on abstraction."],
      ["Show damage or destruction", "Explain how the amendment changes the constitutional identity, not merely its operation."]
    ],
    caution: "The current reviewed set contains the founding authority but not a complete later-treatment graph. A filing memo must retrieve subsequent basic-structure decisions before reaching a conclusion.",
    sources: ["kesavananda", "maneka"],
    claims: 3
  },
  shutdown: {
    title: "Internet shutdown orders must be published, temporary and proportionate",
    short: "<strong>Short answer.</strong> Restrictions imposed through telecom suspension orders are reviewable. Indefinite suspension is impermissible, and the government must publish operative orders so affected persons can challenge them.",
    reasoning: [
      `<em>Anuradha Bhasin</em> applied constitutional scrutiny to restrictions on speech and trade exercised through the internet, required publication of orders and rejected indefinite suspension. <button class="cite-pill" data-case="anuradha" type="button">1</button>`,
      `<em>Internet and Mobile Association of India v. RBI</em> is a separate application of proportionality in a technology-related economic context; it is useful comparatively but does not itself govern telecom shutdown procedure. <button class="cite-pill" data-case="iamai" type="button">2</button>`
    ],
    steps: [
      ["Obtain the operative order", "Publication is central to meaningful review; identify the legal power, duration and area."],
      ["Test necessity and proportionality", "Compare the stated aim with less restrictive, geographically or temporally narrower measures."],
      ["Check review and renewal", "Verify the review process and whether any continuation was supported by a fresh order."]
    ],
    caution: "Rules and statutory directions may have changed after the 2020 decision. Current delegated legislation must be checked before filing.",
    sources: ["anuradha", "iamai"],
    claims: 4
  },
  morality: {
    title: "Constitutional morality protects rights against majoritarian social morality",
    short: "<strong>Short answer.</strong> In Navtej Singh Johar, the Court used equality, dignity, autonomy and constitutional morality to invalidate the criminalisation of consensual same-sex intimacy between adults.",
    reasoning: [
      `<em>Navtej Singh Johar</em> treated constitutional morality as fidelity to constitutional values and rights, not conformity with popular moral disapproval. <button class="cite-pill" data-case="navtej" type="button">1</button>`,
      `The privacy and autonomy foundation recognised in <em>Puttaswamy</em> informed the analysis. <button class="cite-pill" data-case="puttaswamy" type="button">2</button> The reasoning is rights-protective, but its use in a new dispute still depends on the applicable constitutional text and precedent.`
    ],
    steps: [
      ["Identify the constitutional value", "Tie the argument to a protected right such as equality, dignity, liberty or expression."],
      ["Separate constitutional from social morality", "Show why public disapproval cannot, by itself, justify the rights restriction."],
      ["Apply the relevant standard", "Complete the equality or proportionality analysis required by the facts."]
    ],
    caution: "Constitutional morality is not a substitute for doctrinal analysis. It must remain anchored in constitutional text, structure and binding authority.",
    sources: ["navtej", "puttaswamy", "joseph-shine"],
    claims: 4
  }
};

const matterData = [
  { title: "Digital rights challenge", description: "Privacy, proportionality and restrictions on online access.", authorities: 5, notes: 3, updated: "Today" },
  { title: "Constitutional amendment research", description: "Basic structure doctrine and amendment limits.", authorities: 3, notes: 2, updated: "Yesterday" }
];

const alertData = [
  { title: "Cases citing Justice K.S. Puttaswamy", detail: "New Supreme Court decisions · Weekly digest", on: true },
  { title: "Internet shutdowns and telecom suspension", detail: "Query alert · As published", on: true },
  { title: "Basic structure doctrine", detail: "Citation and treatment changes · Monthly", on: true }
];

let activeFilter = "all";
let currentCase = cases.find(c => c.id === "puttaswamy");
let currentAnswer = researchAnswers.privacy;
let toastTimer;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const icon = id => `<svg aria-hidden="true"><use href="#${id}" /></svg>`;

function showToast(message) {
  const toast = $("#toast");
  toast.innerHTML = `${icon("i-check")}<span>${message}</span>`;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function navigate(view) {
  $$(".view").forEach(section => section.classList.toggle("active", section.id === `view-${view}`));
  $$(".nav-item").forEach(button => button.classList.toggle("active", button.dataset.view === view));
  $(".sidebar").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", `#${view}`);
}

function modal(title, body, options = {}) {
  $("#modalTitle").textContent = title;
  $("#modalBody").innerHTML = body;
  $("#modalIcon").innerHTML = icon(options.icon || "i-shield");
  $("#modalActions").innerHTML = options.actions || `<button class="ask-button" id="modalOkay" type="button">Understood</button>`;
  $("#modalBackdrop").hidden = false;
  document.body.style.overflow = "hidden";
  $("#modalOkay")?.addEventListener("click", closeModal);
  options.afterOpen?.();
}

function closeModal() {
  $("#modalBackdrop").hidden = true;
  document.body.style.overflow = "";
}

function caseById(id) { return cases.find(item => item.id === id); }

function sourceCard(item, index) {
  return `<article class="evidence-card ${index === 0 ? "active" : ""}" data-open-case="${item.id}">
    <div class="evidence-card-top"><span>SUPREME COURT</span><span>${item.date}</span></div>
    <h3>${item.shortTitle}</h3>
    <div class="citation">${item.citation}</div>
    <p>${item.summary}</p>
    <div class="evidence-card-footer"><span>${item.bench}-judge bench</span><strong>${icon("i-check")} Metadata checked</strong></div>
  </article>`;
}

function selectResearch(query) {
  const q = query.toLowerCase();
  if (q.includes("basic structure") || q.includes("amend")) return researchAnswers.basic;
  if (q.includes("shutdown") || q.includes("internet")) return researchAnswers.shutdown;
  if (q.includes("morality") || q.includes("377") || q.includes("navtej")) return researchAnswers.morality;
  if (q.includes("privacy") || q.includes("data") || q.includes("autonomy")) return researchAnswers.privacy;
  return null;
}

function renderAnswer(answer) {
  currentAnswer = answer;
  $("#answerTitle").textContent = answer.title;
  $("#answerShort").innerHTML = answer.short;
  $("#answerReasoning").innerHTML = answer.reasoning.map(p => `<p>${p}</p>`).join("");
  $("#answerSteps").innerHTML = answer.steps.map(([title, detail]) => `<li><div><strong>${title}</strong><small>${detail}</small></div></li>`).join("");
  $("#answerCaution").innerHTML = `${icon("i-alert")}<span><strong>Scope note</strong>${answer.caution}</span>`;
  $("#claimScore").textContent = `${answer.claims}/${answer.claims}`;
  $("#answerTime").textContent = `Prepared from ${answer.sources.length} ${answer.sources.length === 1 ? "authority" : "authorities"}`;
  $("#sourceCount").textContent = `${answer.sources.length} sources`;
  $("#evidenceList").innerHTML = answer.sources.map((id, i) => sourceCard(caseById(id), i)).join("");
  $("#evidencePercent").textContent = "100%";
  $("#evidenceProgress").style.width = "100%";
  bindDynamicActions();
}

function renderUnsupported(query) {
  $("#answerTitle").textContent = "This proposition is not verified in the current research set";
  $("#answerShort").innerHTML = `<strong>No supported answer returned.</strong> The current reviewed set contains nine landmark records and none provides sufficient authority for “${escapeHtml(query)}”.`;
  $("#answerReasoning").innerHTML = `<p>NyayaDesk has stopped rather than completing the answer from general model memory. In production, this query would expand retrieval across the complete Supreme Court index and would answer only after supporting text is resolved.</p>`;
  $("#answerSteps").innerHTML = `<li><div><strong>Broaden retrieval</strong><small>Search the full corpus by proposition, statute and related authority.</small></div></li><li><div><strong>Review candidate judgments</strong><small>Confirm the court, date, bench and source PDF.</small></div></li><li><div><strong>Link the answer</strong><small>Every material claim must point to supporting judgment text.</small></div></li>`;
  $("#answerCaution").innerHTML = `${icon("i-alert")}<span><strong>Verification stopped</strong>No filing-ready conclusion should be drawn from this limited result.</span>`;
  $("#claimScore").textContent = "0/1";
  $("#answerTime").textContent = "Insufficient verified authority";
  $("#sourceCount").textContent = "0 sources";
  $("#evidenceList").innerHTML = `<div class="empty-state">${icon("i-search")}<p>No supporting authority in the current research set.</p></div>`;
  $("#evidencePercent").textContent = "0%";
  $("#evidenceProgress").style.width = "0%";
}

function renderCases() {
  const term = $("#caseSearch").value.trim().toLowerCase();
  const year = $("#yearFilter").value;
  const bench = $("#benchFilter").value;
  const headnoteOnly = $("#headnoteOnly").checked;
  let filtered = cases.filter(item => {
    const haystack = [item.title, item.citation, item.category, item.tags.join(" "), item.summary, item.author].join(" ").toLowerCase();
    return (!term || haystack.includes(term)) &&
      (activeFilter === "all" || item.category === activeFilter) &&
      (year === "all" || String(item.year) === year) &&
      (bench === "all" || item.bench >= Number(bench)) &&
      (!headnoteOnly || item.headnote);
  });
  const sort = $("#sortCases").value;
  if (sort === "newest") filtered.sort((a, b) => b.year - a.year);
  if (sort === "oldest") filtered.sort((a, b) => a.year - b.year);
  $("#resultCount").textContent = filtered.length;
  $("#caseResults").innerHTML = filtered.length ? filtered.map(item => `<article class="case-card" data-open-case="${item.id}">
    <div>
      <div class="case-card-top"><span>SUPREME COURT</span><span>${item.date}</span><span>${item.bench}-judge bench</span></div>
      <h2>${item.shortTitle}</h2>
      <div class="case-citation">${item.citation}</div>
      <p>${item.summary}</p>
      <div class="case-tags">${item.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
    </div>
    <div class="case-card-side"><span class="quality-badge">${icon("i-shield-check")} Metadata verified</span><span class="case-open">Open judgment →</span></div>
  </article>`).join("") : `<div class="empty-state">${icon("i-search")}<h3>No matching case</h3><p>Try a broader case name, citation or legal issue.</p></div>`;
  bindDynamicActions();
}

function renderReader(item) {
  currentCase = item;
  $("#readerTitle").textContent = item.title;
  $("#readerCitation").textContent = item.citation;
  $("#readerMeta").innerHTML = `<span><strong>Decided</strong> ${item.date}</span><span><strong>Bench</strong> ${item.judges}</span><span><strong>Opinion</strong> ${item.author}</span><span><strong>Language</strong> ${item.language}</span>`;
  renderReaderSection("headnote");
}

function renderReaderSection(section) {
  const item = currentCase;
  const sections = {
    headnote: `<h2>Verified headnote</h2><p>${item.summary}</p><h3>Core holding</h3><div class="ratio-box"><span>EDITOR-REVIEWED SUMMARY</span><p>${item.ratio}</p></div><p>This headnote is intentionally concise. It does not replace the original judgment, separate opinions or a current later-treatment check.</p>`,
    facts: `<h2>Background</h2><p>${item.background}</p><h3>Research caution</h3><p>This is a compact procedural and factual orientation, not a complete statement of the record.</p>`,
    issues: `<h2>Questions before the Court</h2><ul>${item.issues.map(issue => `<li>${issue}</li>`).join("")}</ul>`,
    holding: `<h2>Holding</h2><p>${item.holding}</p><div class="ratio-box"><span>RATIO CANDIDATE</span><p>${item.ratio}</p></div><p>The ratio label remains a candidate until proposition-level pinpoint review is completed.</p>`,
    citations: `<h2>Authorities and later treatment</h2><div class="machine-banner">${icon("i-clock")}<span><strong>Not calculated for this reviewed set.</strong> A treatment label such as followed, distinguished or overruled will appear only when a later judgment’s operative text supports it.</span></div><p>Related records can be discovered by topic, but these links are not represented as precedential treatment without verification.</p>`,
    source: `<h2>Source record</h2><div class="source-record"><div><span>Case title</span><strong>${item.title}</strong></div><div><span>Reported citation</span><strong>${item.citation}</strong></div><div><span>Decision date</span><strong>${item.date}</strong></div><div><span>Bench</span><strong>${item.judges}</strong></div><div><span>Author information</span><strong>${item.author}</strong></div><div><span>Record status</span><strong>Metadata reviewed</strong></div></div><h3>Source chain</h3><p>Public dataset metadata → source PDF identity match → normalized case record → paragraph extraction → proposition review.</p>`
  };
  $("#readerContent").innerHTML = sections[section] || sections.headnote;
  $$("[data-reader-tab]").forEach(button => button.classList.toggle("active", button.dataset.readerTab === section));
}

function openCase(id) {
  const item = caseById(id);
  if (!item) return;
  renderReader(item);
  navigate("reader");
}

function renderAnalytics() {
  const select = $("#judgeSelect");
  if (!select.options.length) {
    select.innerHTML = `<option value="all">All reviewed records</option>${[...new Set(cases.map(c => c.author))].map(j => `<option>${j}</option>`).join("")}`;
  }
  const selected = select.value;
  const data = selected === "all" ? cases : cases.filter(c => c.author === selected);
  const categories = data.reduce((acc, item) => ((acc[item.category] = (acc[item.category] || 0) + 1), acc), {});
  const max = Math.max(1, ...Object.values(categories));
  const avgBench = data.length ? (data.reduce((sum, c) => sum + c.bench, 0) / data.length).toFixed(1) : "0";
  const constitutionBenches = data.filter(c => c.bench >= 5).length;
  $("#metricCards").innerHTML = [
    ["Records in denominator", data.length, "Current research set"],
    ["Constitution benches", constitutionBenches, "Five judges or more"],
    ["Average bench strength", avgBench, "Computed from reviewed metadata"],
    ["Metadata coverage", data.length ? "100%" : "—", "Selected fields reviewed"]
  ].map(([label, value, note]) => `<article class="metric-card"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`).join("");
  $("#chartDenominator").textContent = `n=${data.length}`;
  $("#subjectChart").innerHTML = Object.entries(categories).map(([name, value]) => `<div class="bar-row"><span>${name}</span><div class="bar-track"><div class="bar-fill" style="width:${(value / max) * 100}%"></div></div><strong>${value}</strong></div>`).join("") || `<div class="empty-state">No records for this selection.</div>`;
  const strong = data.filter(c => c.bench >= 9).length;
  const constitution = data.filter(c => c.bench >= 5 && c.bench < 9).length;
  const regular = data.filter(c => c.bench < 5).length;
  const total = Math.max(1, data.length);
  const p1 = strong / total * 100;
  const p2 = constitution / total * 100;
  $("#benchDonut").style.background = `conic-gradient(var(--green) 0 ${p1}%, var(--orange) ${p1}% ${p1 + p2}%, var(--yellow) ${p1 + p2}% 100%)`;
  $("#benchDonut").innerHTML = `<span><strong>${data.length}</strong><small>cases</small></span>`;
  $("#benchLegend").innerHTML = [["#103d34", "9+ judges", strong], ["#d26432", "5–8 judges", constitution], ["#f0d474", "2–4 judges", regular]].map(([color, label, value]) => `<div><i style="background:${color}"></i><span>${label}</span><strong>${value}</strong></div>`).join("");
  const groupedYears = data.reduce((acc, item) => ((acc[item.year] = (acc[item.year] || 0) + 1), acc), {});
  $("#timelineChart").innerHTML = Object.entries(groupedYears).sort((a,b) => a[0]-b[0]).map(([year, value]) => `<div class="timeline-item"><i style="height:${30 + value * 32}px"></i><span>${year}</span></div>`).join("");
}

function renderMatters() {
  $("#matterGrid").innerHTML = matterData.map(item => `<article class="matter-card"><div class="matter-icon">${icon("i-folder")}</div><h2>${item.title}</h2><p>${item.description}</p><div class="matter-stats"><span><strong>${item.authorities}</strong> authorities</span><span><strong>${item.notes}</strong> notes</span><span>Updated ${item.updated}</span></div></article>`).join("");
}

function renderAlerts() {
  $("#alertList").innerHTML = alertData.map((item, index) => `<article class="alert-card"><span>${icon("i-bell")}</span><div><h2>${item.title}</h2><p>${item.detail}</p></div><button class="toggle ${item.on ? "on" : ""}" data-alert-index="${index}" type="button" aria-label="Toggle ${item.title}"></button></article>`).join("");
  $$("[data-alert-index]").forEach(button => button.addEventListener("click", () => {
    const i = Number(button.dataset.alertIndex);
    alertData[i].on = !alertData[i].on;
    button.classList.toggle("on", alertData[i].on);
    showToast(alertData[i].on ? "Alert enabled" : "Alert paused");
  }));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function renderExtractorSchema(schema, connectionState) {
  const groups = Array.isArray(schema.groups) && schema.groups.length ? schema.groups : EXTRACTOR_SCHEMA_FALLBACK.groups;
  const allColumns = Array.isArray(schema.all_columns) && schema.all_columns.length
    ? schema.all_columns
    : [...new Set(groups.flatMap(group => group.columns || []))];
  const sourceCount = schema.source_columns?.length || FALLBACK_SOURCE_COLUMNS.length;
  const derivedCount = schema.derived_columns?.length || FALLBACK_DERIVED_COLUMNS.length;
  const analysisCount = schema.analysis_columns?.length || FALLBACK_ANALYSIS_COLUMNS.length;
  $("#extractorColumnTotal").textContent = allColumns.length;
  $("#sourceColumnCount").textContent = sourceCount;
  $("#derivedColumnCount").textContent = derivedCount;
  $("#analysisColumnCount").textContent = analysisCount;
  $("#corpusStatus").textContent = `${connectionState === "live" ? "Live" : "Verified"} schema · ${allColumns.length} extractor fields`;
  $("#schemaConnection").innerHTML = connectionState === "live"
    ? `<span class="schema-status live"><i></i>Connected to the production extractor schema</span>`
    : `<span class="schema-status"><i></i>Showing the bundled verified schema; the live endpoint can be retried by reloading</span>`;
  $("#extractorSchemaGroups").innerHTML = groups.map((group, index) => {
    const columns = Array.isArray(group.columns) ? group.columns : [];
    const linkedUrl = `${EXTRACTOR_BASE_URL}/?columns=${encodeURIComponent(columns.join(","))}`;
    return `<article class="extractor-schema-group">
      <header><span>${String(index + 1).padStart(2, "0")}</span><div><h3>${escapeHtml(group.label)}</h3><p>${escapeHtml(group.description || "")}</p></div><strong>${columns.length}</strong></header>
      <div class="schema-column-list">${columns.map(column => `<code>${escapeHtml(column)}</code>`).join("")}</div>
      <a href="${linkedUrl}" target="_blank" rel="noreferrer">Use these ${columns.length} columns in the extractor <svg><use href="#i-external" /></svg></a>
    </article>`;
  }).join("");
}

async function loadExtractorSchema() {
  renderExtractorSchema(EXTRACTOR_SCHEMA_FALLBACK, "bundled");
  try {
    const response = await fetch(`${EXTRACTOR_BASE_URL}/api/schema`, { mode: "cors", cache: "no-store" });
    if (!response.ok) throw new Error(`Extractor schema returned ${response.status}`);
    const schema = await response.json();
    if (!Array.isArray(schema.all_columns) || !Array.isArray(schema.groups)) throw new Error("Extractor schema is incomplete");
    renderExtractorSchema(schema, "live");
  } catch (error) {
    console.warn("Live extractor schema unavailable; using bundled schema.", error);
  }
}

function exportNote() {
  const plainShort = $("#answerShort").textContent.trim();
  const reasoning = $("#answerReasoning").textContent.trim();
  const sources = currentAnswer?.sources?.map(id => { const c = caseById(id); return `- ${c.title} — ${c.citation}`; }).join("\n") || "- No verified sources in the current research set";
  const content = `NYAYADESK RESEARCH NOTE\n\n${$("#answerTitle").textContent}\n\n${plainShort}\n\nREASONING\n${reasoning}\n\nAUTHORITIES\n${sources}\n\nVerify against the official judgment before filing.`;
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "nyayadesk-research-note.txt";
  a.click();
  URL.revokeObjectURL(url);
  showToast("Research note exported");
}

function bindDynamicActions() {
  $$('[data-open-case]').forEach(element => {
    element.onclick = event => {
      if (event.target.closest("button") && !event.target.closest("[data-open-case]")) return;
      openCase(element.dataset.openCase);
    };
  });
  $$(".cite-pill").forEach(button => button.onclick = () => openCase(button.dataset.case));
}

function initialize() {
  $$("[data-view]").forEach(button => button.addEventListener("click", () => navigate(button.dataset.view)));
  $$("[data-route]").forEach(link => link.addEventListener("click", event => { event.preventDefault(); navigate(link.dataset.route); }));
  $$("[data-prompt]").forEach(button => button.addEventListener("click", () => {
    const prompt = button.dataset.prompt;
    $("#researchInput").value = prompt;
    navigate("research");
    renderAnswer(selectResearch(prompt));
  }));
  $("#mobileMenu").addEventListener("click", () => $(".sidebar").classList.toggle("open"));
  $("#newResearch").addEventListener("click", () => { $("#researchInput").value = ""; navigate("research"); $("#researchInput").focus(); });
  $("#researchForm").addEventListener("submit", event => {
    event.preventDefault();
    const query = $("#researchInput").value.trim();
    if (!query) return showToast("Enter a research question");
    const answer = selectResearch(query);
    if (answer) renderAnswer(answer); else renderUnsupported(query);
    $("#answerCard").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  $("#methodButton").addEventListener("click", () => modal("Verification method", `<p>NyayaDesk treats generation as the final formatting step—not the source of legal authority.</p><ol><li>Retrieve candidate judgments from the selected court and date scope.</li><li>Resolve the case identity against source metadata and the court PDF.</li><li>Link each material proposition to supporting judgment text.</li><li>Check how later courts treated the authority.</li><li>Block unsupported claims and show unresolved gaps.</li></ol><p><strong>Current coverage:</strong> the research interface contains nine reviewed records, while the linked extractor exposes the full source schema. Paragraph pinpoints and later-treatment labels remain disabled until the evidence pipeline can support them.</p>`));
  $("#analyticsMethod").addEventListener("click", () => modal("Judge Lens methodology", `<p>All numbers are descriptive counts from the selected corpus. The denominator is always displayed.</p><ul><li>Bench participation and authorship come from normalized metadata.</li><li>Subject labels need a documented taxonomy and quality review.</li><li>Treatment labels require supporting language in a later judgment.</li><li>No outcome prediction, ideology score or judge ranking is produced.</li></ul>` , { icon: "i-chart" }));
  $("#researchInput").addEventListener("keydown", event => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") $("#researchForm").requestSubmit();
  });
  $("#attachButton").addEventListener("click", () => $("#fileInput").click());
  $("#fileInput").addEventListener("change", event => {
    const file = event.target.files[0];
    if (!file) return;
    modal("Document staged locally", `<p><strong>${escapeHtml(file.name)}</strong> has been selected for analysis.</p><p>This browser-only interface does not upload the file. A connected document workflow should encrypt it, isolate it by matter, exclude it from model training and delete it under the workspace retention policy.</p>`, { icon: "i-paperclip" });
  });
  $("#copyAnswer").addEventListener("click", async () => {
    const text = `${$("#answerTitle").textContent}\n\n${$("#answerShort").textContent.trim()}\n\n${$("#answerReasoning").textContent.trim()}`;
    try { await navigator.clipboard.writeText(text); showToast("Answer copied"); } catch { showToast("Copy unavailable in this browser"); }
  });
  $("#exportAnswer").addEventListener("click", exportNote);
  $("#saveResearch").addEventListener("click", () => showToast("Research saved to Digital rights challenge"));
  $("#readerExport").addEventListener("click", () => {
    const blob = new Blob([`${currentCase.title}\n${currentCase.citation}\n\n${currentCase.summary}\n\nHolding\n${currentCase.holding}\n\nVerify against the original judgment before filing.`], { type: "text/plain" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `${currentCase.id}-case-note.txt`; a.click(); URL.revokeObjectURL(url); showToast("Case note exported");
  });
  $("#readerSave").addEventListener("click", () => showToast(`${currentCase.shortTitle} saved`));
  $("#reportRecord").addEventListener("click", () => modal("Report a record issue", `<p>Describe the suspected issue. A production workflow should preserve the original value, proposed correction, source and reviewer decision.</p><textarea class="modal-input" rows="4" placeholder="Citation, date, judge, text extraction or another issue…"></textarea>`, { icon: "i-flag", actions: `<button class="ask-button" id="submitIssue" type="button">Submit report</button>`, afterOpen: () => $("#submitIssue").addEventListener("click", () => { closeModal(); showToast("Issue report captured for review"); }) }));
  $$("[data-reader-tab]").forEach(button => button.addEventListener("click", () => renderReaderSection(button.dataset.readerTab)));
  $$("[data-doc-view]").forEach(button => button.addEventListener("click", () => {
    $$("[data-doc-view]").forEach(b => b.classList.toggle("active", b === button));
    if (button.dataset.docView === "full") renderReaderSection("source"); else renderReaderSection("headnote");
  }));
  ["#caseSearch", "#yearFilter", "#benchFilter", "#headnoteOnly", "#sortCases"].forEach(selector => $(selector).addEventListener("input", renderCases));
  $$("[data-filter]").forEach(button => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    $$("[data-filter]").forEach(b => b.classList.toggle("active", b === button));
    renderCases();
  }));
  $("#clearFilters").addEventListener("click", () => { activeFilter = "all"; $("#caseSearch").value = ""; $("#yearFilter").value = "all"; $("#benchFilter").value = "all"; $("#headnoteOnly").checked = false; $$("[data-filter]").forEach(b => b.classList.toggle("active", b.dataset.filter === "all")); renderCases(); });
  $("#savedSearchButton").addEventListener("click", () => modal("Create a case alert", `<p>Save the current search and choose how often NyayaDesk should check newly indexed Supreme Court decisions.</p><input class="modal-input" value="${escapeHtml($("#caseSearch").value || "New Supreme Court decisions")}" />`, { icon: "i-bell", actions: `<button class="ask-button" id="createAlertConfirm" type="button">Create weekly alert</button>`, afterOpen: () => $("#createAlertConfirm").addEventListener("click", () => { closeModal(); showToast("Weekly alert created"); }) }));
  $("#judgeSelect").addEventListener("change", renderAnalytics);
  $("#newMatter").addEventListener("click", () => modal("Create a matter", `<p>Name the workspace where you want to collect authorities, research notes and uploaded documents.</p><input class="modal-input" id="matterName" placeholder="Matter name" />`, { icon: "i-folder", actions: `<button class="ask-button" id="createMatterConfirm" type="button">Create matter</button>`, afterOpen: () => $("#createMatterConfirm").addEventListener("click", () => {
    const name = $("#matterName").value.trim(); if (!name) return; matterData.push({ title: name, description: "New research workspace.", authorities: 0, notes: 0, updated: "Just now" }); renderMatters(); closeModal(); showToast("Matter created");
  }) }));
  $("#newAlert").addEventListener("click", () => $("#savedSearchButton").click());
  $("#modalClose").addEventListener("click", closeModal);
  $("#modalBackdrop").addEventListener("click", event => { if (event.target === $("#modalBackdrop")) closeModal(); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); navigate("research"); $("#researchInput").focus(); }
  });
  renderAnswer(currentAnswer);
  renderCases();
  renderReader(currentCase);
  renderAnalytics();
  renderMatters();
  renderAlerts();
  loadExtractorSchema();
  const requested = location.hash.replace("#", "");
  if (["research", "cases", "reader", "analytics", "matters", "alerts", "data"].includes(requested)) navigate(requested);
}

document.addEventListener("DOMContentLoaded", initialize);
