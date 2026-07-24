let messageCounter = 1;
let currentActiveId = null;
let isDarkMode = false;
let isSidebarOpen = false;

const mockResponses = {
  short: [
    'The impact of renewable energy on global economies is significant. <span data-source-id="src-1">Solar and wind power have become cost-competitive with fossil fuels</span>, driving adoption worldwide. <span data-source-id="src-2">Countries like Denmark now generate over 50% of their electricity from wind</span>. This transition creates jobs but also requires grid modernization. <span data-source-id="src-3">The International Energy Agency projects renewable energy will supply 90% of new power capacity by 2030</span>. Challenges remain in energy storage and transmission infrastructure, though battery costs have dropped by 80% since 2015.',
    'The evolution of artificial intelligence in healthcare is transformative. <span data-source-id="src-4">AI-powered diagnostic systems now match or exceed human radiologists in detecting certain cancers</span>. Machine learning algorithms analyze medical imaging, genomic data, and electronic health records. <span data-source-id="src-5">A 2023 study found AI reduced diagnostic errors by 37% in clinical settings</span>. Drug discovery has accelerated dramatically, with AI cutting development timelines from years to months. <span data-source-id="src-6">The global AI healthcare market is projected to reach $188 billion by 2030</span>.',
    'Urban farming is reshaping food systems in cities worldwide. <span data-source-id="src-7">Vertical farms use 95% less water than traditional agriculture</span> while producing yields up to 100 times higher per square foot. <span data-source-id="src-8">Singapore aims to produce 30% of its nutritional needs locally by 2030</span> through high-tech urban agriculture. Rooftop gardens, hydroponic systems, and aquaponics are creating local food resilience. <span data-source-id="src-9">Studies show urban farming can reduce food transportation emissions by up to 90%</span>.'
  ],
  medium: [
    'The transition to sustainable transportation represents one of the most significant industrial shifts in modern history. <span data-source-id="src-10">Electric vehicle sales grew by 55% globally in 2023, reaching 14 million units</span>, and this momentum shows no signs of slowing. Major automakers have pledged to phase out internal combustion engines by 2035 in key markets. <span data-source-id="src-11">The cost of lithium-ion batteries has fallen by approximately 89% since 2010</span>, making EVs increasingly affordable for mainstream consumers. However, challenges persist in charging infrastructure deployment and raw material supply chains. <span data-source-id="src-12">China currently dominates battery manufacturing, controlling 70% of global production capacity</span>. Governments worldwide are investing billions in charging networks and domestic battery production. The shift to electric mobility extends beyond cars to include electric buses, trucks, and even short-haul aviation. <span data-source-id="src-13">A study by the International Council on Clean Transportation found that EVs produce 60-68% fewer lifetime emissions than comparable gasoline vehicles</span>, even when accounting for manufacturing and electricity generation. Urban planners are also rethinking city design around pedestrian-friendly, transit-oriented development that reduces overall vehicle dependence. The convergence of renewable energy, battery storage, and smart grid technology is creating the foundation for a fully decarbonized transportation system that could reshape global oil demand by 2030.',
    'The intersection of biotechnology and computing is opening unprecedented frontiers in medicine and human health. <span data-source-id="src-14">CRISPR gene-editing technology has advanced from laboratory research to approved human trials for blood disorders and certain forms of blindness</span>. These therapies represent a fundamental shift from treating symptoms to addressing genetic root causes. <span data-source-id="src-15">The global gene therapy market is expected to exceed $35 billion by 2030</span>, driven by breakthroughs in delivery mechanisms and reduced manufacturing costs. Personalized medicine, powered by genomic sequencing that now costs under $200 per genome, enables treatments tailored to individual genetic profiles. <span data-source-id="src-16">AI-driven protein folding prediction, exemplified by AlphaFold, has mapped over 200 million protein structures</span>, accelerating drug discovery for diseases previously considered intractable. Synthetic biology companies are engineering microorganisms to produce everything from pharmaceuticals to sustainable materials. <span data-source-id="src-17">The FDA approved a record number of gene and cell therapies in 2023</span>, signaling regulatory readiness for this new class of medicines. Ethical frameworks continue to evolve alongside the technology, with particular attention to equitable access and the implications of heritable genetic modifications. The convergence of AI, genomics, and cellular engineering promises to redefine what is possible in medicine within this decade.'
  ],
  long: [
    'The transformation of global energy systems toward decarbonization represents one of the most complex technical and socioeconomic challenges of the twenty-first century. <span data-source-id="src-18">Renewable energy sources accounted for over 80% of new electricity generation capacity added globally in 2023</span>, according to the International Renewable Energy Agency. This shift is driven by rapidly falling costs, with solar photovoltaic module prices decreasing by approximately 90% since 2010 and onshore wind costs declining by 70% over the same period. <span data-source-id="src-19">Levelized cost of energy analysis shows that solar and wind are now the cheapest sources of new electricity in countries representing over 80% of global power generation</span>. However, the intermittent nature of these sources necessitates significant investments in energy storage, grid modernization, and demand-side management. Battery storage capacity additions quadrupled in 2023, and utility-scale battery costs fell below $150 per kilowatt-hour. <span data-source-id="src-20">The International Energy Agency projects that global energy storage capacity needs to increase by over 30-fold by 2030 to meet climate targets</span>. Green hydrogen, produced via electrolysis using renewable electricity, is emerging as a solution for hard-to-decarbonize sectors including steel manufacturing, cement production, and long-haul shipping. <span data-source-id="src-21">The European Union has committed over $500 billion to its Green Deal industrial plan</span>, while the United States Inflation Reduction Act represents the largest climate investment in American history at over $350 billion. Carbon capture and storage technologies, though still nascent and expensive, are being deployed at increasing scale with over 40 commercial facilities operating globally. <span data-source-id="src-22">A landmark study from Princeton University found that achieving net-zero emissions by 2050 requires annual clean energy investments of $3-4 trillion globally</span>. The social dimensions of the energy transition are equally critical, with just transition policies needed to support communities dependent on fossil fuel industries. Workforce retraining programs, community benefit agreements, and targeted investment in affected regions are essential components of a politically sustainable transition. The electrification of transportation, building heating, and industrial processes will fundamentally reshape energy demand patterns, potentially reducing total primary energy demand by 30-40% due to the higher efficiency of electric systems compared to combustion-based alternatives. Grid operators are developing new market designs and operational protocols to manage the increasing complexity of decentralized, variable renewable generation combined with distributed energy resources including rooftop solar, electric vehicle charging, and smart home systems. <span data-source-id="src-23">Analysis by Bloomberg New Energy Finance suggests that the global energy transition will require cumulative investments of $150-200 trillion by 2050</span>, but the economic benefits in terms of avoided climate damages, improved public health, and energy security are expected to substantially exceed these costs. The pace and scale of the transition will ultimately depend on political will, international cooperation, and the continued acceleration of technological innovation across the energy sector.',
    'The revolution in artificial intelligence is reshaping virtually every sector of the global economy, raising profound questions about productivity, employment, governance, and human identity. <span data-source-id="src-24">Generative AI systems demonstrated capabilities in 2023 that surprised even their creators</span>, with large language models achieving performance on professional benchmarks that rival or exceed human experts in fields including law, medicine, and software engineering. <span data-source-id="src-25">Goldman Sachs estimates that AI could automate 300 million full-time jobs globally</span>, while simultaneously creating new categories of work and potentially boosting annual global GDP by 7% over a ten-year period. The economic impact of AI is expected to be distributed unevenly, with higher-income knowledge workers facing more significant disruption than those in manual or service occupations. <span data-source-id="src-26">A study from MIT found that access to AI tools improved worker productivity by 14% on average</span>, with the largest gains among less experienced workers. This suggests AI may serve as a powerful levelling tool for expertise and skills development. However, concerns about algorithmic bias, privacy, and the concentration of AI capabilities among a small number of technology companies have prompted regulatory responses worldwide. <span data-source-id="src-27">The European Union Artificial Intelligence Act, passed in 2024, establishes a comprehensive regulatory framework based on risk categories</span>, banning certain high-risk applications while imposing transparency requirements on general-purpose AI systems. The United States, China, and other major powers are developing their own regulatory approaches, creating a complex global governance landscape. <span data-source-id="src-28">Research from the Stanford Institute for Human-Centered AI found that the number of AI incidents and controversies increased by 26 times since 2012</span>, highlighting the growing real-world impact of these systems. In healthcare, AI systems are being deployed for drug discovery, diagnostic imaging, clinical decision support, and personalized treatment planning. In education, adaptive learning platforms customize instruction to individual student needs, potentially addressing long-standing achievement gaps. <span data-source-id="src-29">A UNESCO report found that AI in education could improve learning outcomes by up to 30% when properly implemented</span>. The environmental footprint of AI is a growing concern, with training large models consuming vast amounts of energy and water. <span data-source-id="src-30">Estimates suggest that training a single large language model can emit as much carbon as five cars over their lifetimes</span>, prompting research into more efficient model architectures and training methods. The long-term trajectory of AI development raises fundamental questions about the nature of intelligence, consciousness, and human agency that society is only beginning to grapple with. The coming decade will be critical in determining whether AI serves primarily to augment human capabilities and address pressing global challenges, or whether it exacerbates existing inequalities and concentrates power in unprecedented ways.'
  ]
};

const mockData = {
  'msg-1': {
    evaluator: [
      { quote: 'Energy transition requires substantial investment in grid modernization.', status: 'verified', explanation: 'Corroborated by multiple grid operator reports and IEA analysis confirming grid infrastructure needs.' },
      { quote: 'Battery storage will increase 30-fold by 2030 to meet climate targets.', status: 'nuanced', explanation: 'IEA projections support this target, but supply chain constraints and mineral availability may limit actual deployment.' },
      { quote: 'The energy transition will create a net increase in total energy demand.', status: 'disputed', explanation: 'Electric systems are inherently more efficient, likely reducing primary energy demand by 30-40% per Princeton University analysis.' }
    ],
    bias: { economic: 45, social: 55, foreignPolicy: 40, environment: 75, religion: 50, nationalIdentity: 35 },
    sources: [
      { name: 'International Energy Agency', url: 'https://iea.org', percentage: 85, type: 'Primary' },
      { name: 'Princeton University Study', url: 'https://princeton.edu', percentage: 72, type: 'Secondary' },
      { name: 'Bloomberg NEF Analysis', url: 'https://about.bnef.com', percentage: 68, type: 'Secondary' },
      { name: 'IRENA Report 2023', url: 'https://irena.org', percentage: 91, type: 'Primary' }
    ]
  },
  'msg-2': {
    evaluator: [
      { quote: 'AI can automate 300 million jobs globally.', status: 'verified', explanation: 'Directly sourced from Goldman Sachs research report on AI and labor market impact.' },
      { quote: 'AI tools improve worker productivity by 14% on average.', status: 'verified', explanation: 'Confirmed by MIT study on AI-assisted worker productivity across multiple industries.' },
      { quote: 'AI incidents have increased 26 times since 2012.', status: 'nuanced', explanation: 'Stanford HAI data shows increase, but this partly reflects improved reporting and monitoring.' }
    ],
    bias: { economic: 60, social: 45, foreignPolicy: 50, environment: 40, religion: 50, nationalIdentity: 55 },
    sources: [
      { name: 'Goldman Sachs Global Research', url: 'https://goldmansachs.com', percentage: 78, type: 'Primary' },
      { name: 'MIT Economics Department', url: 'https://mit.edu', percentage: 74, type: 'Primary' },
      { name: 'Stanford HAI Report', url: 'https://hai.stanford.edu', percentage: 69, type: 'Secondary' },
      { name: 'UNESCO AI in Education', url: 'https://unesco.org', percentage: 55, type: 'Tertiary' }
    ]
  }
};

function generateMockDataForMessage(msgId) {
  const biases = ['economic', 'social', 'foreignPolicy', 'environment', 'religion', 'nationalIdentity'];
  const bias = {};
  biases.forEach(b => { bias[b] = Math.floor(Math.random() * 70) + 15; });

  const statuses = ['verified', 'nuanced', 'disputed'];
  const statementTemplates = [
    { quote: 'This claim is supported by recent research in the field.', status: 'verified', explanation: 'Multiple peer-reviewed studies and institutional reports confirm this finding.' },
    { quote: 'The evidence for this proposition is mixed across different studies.', status: 'nuanced', explanation: 'Results vary by methodology and context; more research is needed for a definitive conclusion.' },
    { quote: 'Current evidence does not strongly support this assertion.', status: 'disputed', explanation: 'Contradicts findings from several major studies in this area; further investigation warranted.' }
  ];

  return {
    evaluator: statementTemplates.map(t => ({ ...t, quote: `"${t.quote}"` })),
    bias,
    sources: [
      { name: 'Academic Research Database', url: '#', percentage: Math.floor(Math.random() * 40) + 50, type: 'Primary' },
      { name: 'Industry Analysis Report', url: '#', percentage: Math.floor(Math.random() * 30) + 40, type: 'Secondary' },
      { name: 'News Media Compilation', url: '#', percentage: Math.floor(Math.random() * 20) + 20, type: 'Tertiary' }
    ]
  };
}

function getResponseByLength(length) {
  const pool = mockResponses[length] || mockResponses.medium;
  return pool[Math.floor(Math.random() * pool.length)];
}

function sendMessage() {
  const textarea = document.getElementById('messageInput');
  const text = textarea.value.trim();
  if (!text) return;

  const lengthSelector = document.querySelector('input[name="responseLength"]:checked');
  const length = lengthSelector ? lengthSelector.value : 'medium';

  appendMessage('user', text);
  textarea.value = '';
  showTypingIndicator();

  setTimeout(() => {
    hideTypingIndicator();
    const responseText = getResponseByLength(length);
    const msgId = 'msg-' + messageCounter++;
    appendMessage('assistant', responseText, msgId);

    const data = generateMockDataForMessage(msgId);
    mockData[msgId] = data;

    document.querySelector('.right-column').classList.add('visible');
    selectMessage(msgId);
  }, 1000 + Math.random() * 800);
}

function appendMessage(role, content, msgId) {
  const chatHistory = document.getElementById('chatHistory');
  const div = document.createElement('div');
  div.className = 'message ' + role;
  if (msgId) {
    div.dataset.messageId = msgId;
    div.addEventListener('click', () => selectMessage(msgId));
  }
  div.innerHTML = content;
  chatHistory.appendChild(div);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function selectMessage(msgId) {
  document.querySelectorAll('.message.assistant').forEach(m => m.classList.remove('active-message'));
  const msgEl = document.querySelector(`.message.assistant[data-message-id="${msgId}"]`);
  if (msgEl) msgEl.classList.add('active-message');

  currentActiveId = msgId;
  updateRightColumn(msgId);
  updateToolbar(msgId);

  const toolbar = document.querySelector('.active-answer-toolbar');
  if (toolbar) toolbar.classList.add('visible');
}

function showTypingIndicator() {
  const chatHistory = document.getElementById('chatHistory');
  const div = document.createElement('div');
  div.className = 'typing-indicator';
  div.id = 'typingIndicator';
  div.innerHTML = '<span></span><span></span><span></span>';
  chatHistory.appendChild(div);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function hideTypingIndicator() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

function updateToolbar(msgId) {
  const msgEl = document.querySelector(`.message.assistant[data-message-id="${msgId}"]`);
  const wordCount = msgEl ? msgEl.textContent.trim().split(/\s+/).length : 0;
  document.getElementById('wordCountDisplay').textContent = 'Word count: ' + wordCount;
  document.getElementById('downloadPdf').onclick = () => {
    alert('Downloading PDF report for ' + msgId + ' including Bias Metrics and Sources...');
  };
}

function updateRightColumn(msgId) {
  const data = mockData[msgId];
  if (!data) return;

  renderEvaluator(data.evaluator);
  renderBiasMetrics(data.bias);
  renderSources(data.sources);
}

function renderEvaluator(statements) {
  const container = document.getElementById('evaluatorCards');
  container.innerHTML = statements.map(s => `
    <div class="evaluator-card">
      <p class="evaluator-quote"><em>${s.quote}</em></p>
      <span class="status-pill ${s.status}">${s.status}</span>
      <p class="evaluator-explanation">${s.explanation}</p>
    </div>
  `).join('');
}

function renderBiasMetrics(bias) {
  const metrics = [
    { key: 'economic', left: 'Redistribution', right: 'Free Market' },
    { key: 'social', left: 'Progressive', right: 'Traditional' },
    { key: 'foreignPolicy', left: 'Dovish', right: 'Hawkish' },
    { key: 'environment', left: 'Green', right: 'Growth' },
    { key: 'religion', left: 'Secular', right: 'Religious' },
    { key: 'nationalIdentity', left: 'Cosmopolitan', right: 'Nationalist' }
  ];

  const container = document.getElementById('biasMetrics');
  container.innerHTML = metrics.map(m => {
    const value = bias[m.key] || 50;
    return `
      <div class="bias-item">
        <div class="bias-labels">
          <span>${m.left}</span>
          <span>${m.right}</span>
        </div>
        <div class="bias-bar">
          <div class="bias-marker" style="left: ${value}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderSources(sources) {
  const container = document.getElementById('sourceList');
  container.innerHTML = sources.map(s => {
    const typeClass = s.type.toLowerCase();
    return `
      <div class="source-item" data-source-id="${s.name.toLowerCase().replace(/\s+/g, '-')}"
           onmouseenter="highlightSource('${s.name}')" onmouseleave="unhighlightSource()">
        <a href="${s.url}" target="_blank" class="source-name">${s.name}</a>
        <span class="source-percentage">${s.percentage}%</span>
        <span class="source-type ${typeClass}">${s.type}</span>
      </div>
    `;
  }).join('');
}

function highlightSource(sourceName) {
  const msgEl = document.querySelector(`.message.assistant[data-message-id="${currentActiveId}"]`);
  if (!msgEl) return;
  const key = sourceName.toLowerCase().replace(/\s+/g, '-');
  msgEl.querySelectorAll(`span[data-source-id="${key}"]`).forEach(s => s.classList.add('source-highlighted'));
}

function unhighlightSource() {
  document.querySelectorAll('.source-highlighted').forEach(s => s.classList.remove('source-highlighted'));
}

// Sidebar
function toggleSidebar() {
  isSidebarOpen = !isSidebarOpen;
  document.querySelector('.left-column').classList.toggle('open', isSidebarOpen);
}

// Dark mode
function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode', isDarkMode);
}

// Enter to send
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('messageInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
});