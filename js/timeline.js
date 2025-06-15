// timeline.js
class TimelineController {
  constructor({fixedSelector, contentSelector, dataSource}) {
    this.fixedContainer = document.querySelector(fixedSelector);
    this.contentContainer = document.querySelector(contentSelector);
    this.dataSource = dataSource;
    this.data = [];
    this.observer = null;
    this.init();
  }

  async init() {
    await this.loadData();
    this.renderParallaxTimeline();
    this.setupIntersectionObserver();
  }

  async loadData() {
    try {
      const res = await fetch(this.dataSource + '/src/experience.tex');
      if (!res.ok) throw new Error('Cannot fetch experience.tex');
      const tex = await res.text();
      this.data = this.parseLatexExperience(tex);
      if (!this.data.length) throw new Error('No data parsed');
    } catch (e) {
      console.error(e);
      // fallback to mock data
      this.data = [
        {role: "PhD Researcher", company: "IIT Gandhinagar", date: "2017-2021", location: "Gandhinagar, India", desc: "Worked on Bayesian Optimization, Polire, Vayu.", bullets: []},
        {role: "Engineer", company: "Rephrase AI", date: "2021-2023", location: "Bangalore, India", desc: "Built Z at Company.", bullets: []},
      ];
    }
  }

  parseLatexExperience(tex) {
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

  renderParallaxTimeline() {
    // Clear previous content
    this.fixedContainer.innerHTML = '';
    this.contentContainer.innerHTML = '';

    this.data.forEach((d, i) => {
      // Create timeline node
      const node = document.createElement('div');
      node.className = 'timeline-node';
      node.dataset.target = `#experience-${i}`;
      node.innerHTML = `<a href="#experience-${i}">${d.role}</a>`;
      node.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(node.dataset.target).scrollIntoView({ behavior: 'smooth' });
      });
      this.fixedContainer.appendChild(node);

      // Create content card
      const card = document.createElement('div');
      card.className = 'experience-card';
      card.id = `experience-${i}`;
      let bulletsHtml = d.bullets.map(bullet => `<li>${bullet}</li>`).join('');
      card.innerHTML = `
        <h3>${d.role}</h3>
        <h4>${d.company} &bull; ${d.date}</h4>
        <p>${d.location}</p>
        <ul>${bulletsHtml}</ul>
      `;
      this.contentContainer.appendChild(card);
    });
  }

  setupIntersectionObserver() {
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.5 // 50% of the item is visible
    };

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        const targetId = entry.target.id;
        const correspondingNode = this.fixedContainer.querySelector(`[data-target="#${targetId}"]`);

        if (entry.isIntersecting) {
          // Remove active class from all nodes
          this.fixedContainer.querySelectorAll('.timeline-node').forEach(n => n.classList.remove('active'));
          // Add active class to the corresponding node
          if (correspondingNode) {
            correspondingNode.classList.add('active');
          }
          entry.target.classList.add('active');
        } else {
            if (correspondingNode) {
                correspondingNode.classList.remove('active');
            }
            entry.target.classList.remove('active');
        }
      });
    }, options);

    // Observe all experience cards
    this.contentContainer.querySelectorAll('.experience-card').forEach(card => {
      this.observer.observe(card);
    });
  }
}

// On DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new TimelineController({
    fixedSelector: '#timeline-fixed',
    contentSelector: '#timeline-content',
    dataSource: '/demo/homepage-og/resume-source'
  });
});
