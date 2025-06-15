// timeline.js
class TimelineController {
  constructor({svgSelector, nodesSelector, expandedSelector, dataSource}) {
    this.svg = document.querySelector(svgSelector);
    this.nodesContainer = document.querySelector(nodesSelector);
    this.expanded = document.querySelector(expandedSelector);
    this.dataSource = dataSource;
    this.data = [];
    this.activeIndex = null;
    this.init();
  }

  async init() {
    await this.loadData();
    this.renderTimeline();
    this.animateDraw();
    this.attachParallax();
  }

  async loadData() {
    // Try to fetch and parse LaTeX experience file
    try {
      const res = await fetch('/resume-source/src/experience.tex');
      if (!res.ok) throw new Error('Cannot fetch experience.tex');
      const tex = await res.text();
      this.data = this.parseLatexExperience(tex);
      if (!this.data.length) throw new Error('No data parsed');
    } catch (e) {
      // fallback to mock data
      this.data = [
        {role: "PhD Researcher", company: "IIT Gandhinagar", date: "2017-2021", location: "Gandhinagar, India", desc: "Worked on Bayesian Optimization, Polire, Vayu."},
        {role: "Engineer", company: "Rephrase AI", date: "2021-2023", location: "Bangalore, India", desc: "Built Z at Company."},
      ];
    }
  }

  // Parse LaTeX experience.tex into structured JS objects
  parseLatexExperience(tex) {
    // Each experience starts with \resumeSubheading{Company}{Date}{Role}{Location}
    // Followed by \resumeItemListStart ... \resumeItem ... \resumeItemListEnd
    const expRegex = /\\resumeSubheading\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}([\s\S]*?)(?=\\resumeSubheading|\\resumeSubHeadingListEnd)/g;
    const bulletRegex = /\\resumeItem\{([^}]*)\}/g;
    let match, result = [];
    while ((match = expRegex.exec(tex))) {
      const [_, company, date, role, location, itemsBlock] = match;
      let bullets = [];
      let bulletMatch;
      if (itemsBlock) {
        while ((bulletMatch = bulletRegex.exec(itemsBlock))) {
          bullets.push(bulletMatch[1].replace(/\\href\{[^}]+\}\{\\underline\{([^}]*)\}\}/g, '$1'));
        }
      }
      result.push({
        role: role.trim(),
        company: company.trim(),
        date: date.trim(),
        location: location.trim(),
        desc: bullets.join(' '),
        bullets
      });
    }
    return result;
  }

  renderTimeline() {
    // Clear previous
    this.nodesContainer.innerHTML = '';
    // SVG line
    this.svg.innerHTML = `<line x1="50%" y1="5%" x2="50%" y2="95%" stroke="#bbb" stroke-width="6" stroke-linecap="round" id="timeline-line" style="stroke-dasharray: 0, 1000;"></line>`;
    // Nodes
    const n = this.data.length;
    this.data.forEach((d, i) => {
      const node = document.createElement('div');
      node.className = 'timeline-node';
      // Distribute nodes evenly from 10% to 90% (handle n=1 gracefully)
      const pos = n === 1 ? 50 : 10 + (80 * i / (n-1));
      node.style.top = `${pos}%`;
      node.style.setProperty('--node-color', this.getNodeColor(i));
      node.innerHTML = `<span class="timeline-role" title="${d.role}">${d.role}</span><span class="timeline-tooltip">${d.date}</span>`;
      node.addEventListener('mouseenter', () => this.onHover(i));
      node.addEventListener('mouseleave', () => this.onUnhover(i));
      node.addEventListener('click', () => this.onClick(i));
      this.nodesContainer.appendChild(node);
    });
  }

  animateDraw() {
    const line = this.svg.querySelector('#timeline-line');
    if (!line) return;
    const length = line.getTotalLength();
    line.style.strokeDasharray = `${length},${length}`;
    line.style.strokeDashoffset = length;
    line.getBoundingClientRect(); // force reflow
    line.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(.4,2,.6,1)';
    setTimeout(() => { line.style.strokeDashoffset = 0; }, 100);
  }

  onHover(idx) {
    // Tooltip handled by CSS; could add more interactivity here
  }

  onUnhover(idx) {}

  onClick(idx) {
    this.activeIndex = idx;
    const d = this.data[idx];
    this.expanded.innerHTML = `<h2>${d.role}</h2><h4>${d.date}</h4><p>${d.desc}</p>`;
    this.expanded.classList.add('active');
    // Morphing shapes: placeholder for now, could animate node/card
  }

  getNodeColor(i) {
    // Muted, classy palette
    const palette = ['#b2b7ff','#f7b2b7','#b2f7e2','#ffe6b2','#b2d7f7','#e2b2f7'];
    return palette[i % palette.length];
  }

  attachParallax() {
    window.addEventListener('scroll', () => {
      // Parallax effect: move .parallax-bg shapes based on scroll
      // Placeholder for now
    });
  }
}

// On DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new TimelineController({
    svgSelector: '#timeline-svg',
    nodesSelector: '#timeline-nodes',
    expandedSelector: '#timeline-expanded',
    dataSource: '/demo/homepage-og/resume-source'
  });
});
