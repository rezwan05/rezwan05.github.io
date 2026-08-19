(function () {
  function initMobileNavigation() {
    const header = document.querySelector('.course-top');
    const inner = header && header.querySelector('.inner');
    const desktopNav = header && header.querySelector('.subnav');
    if (!header || !inner || !desktopNav || header.querySelector('.course-burger')) return;

    const right = header.querySelector('.right');
    if (right && !right.querySelector('.course-search')) {
      const searchLink = document.createElement('a');
      searchLink.className = 'theme-btn course-search';
      searchLink.title = 'Search';
      searchLink.setAttribute('aria-label', 'Search');
      searchLink.href = '/?search=1&return=' + encodeURIComponent(location.pathname);
      searchLink.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4.35-4.35"></path></svg>';
      right.insertBefore(searchLink, right.firstChild);
    }

    const button = document.createElement('button');
    button.className = 'course-burger';
    button.type = 'button';
    button.title = 'Menu';
    button.setAttribute('aria-label', 'Open menu');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'courseMobileNav');
    button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path class="bline bl1" d="M4 7h16"></path><path class="bline bl2" d="M4 12h16"></path><path class="bline bl3" d="M4 17h16"></path></svg>';

    const overlay = document.createElement('div');
    overlay.className = 'course-mobile-nav';
    overlay.id = 'courseMobileNav';
    overlay.setAttribute('aria-hidden', 'true');

    const sheet = document.createElement('nav');
    sheet.className = 'sheet';
    sheet.setAttribute('aria-label', 'Mobile navigation');

    const currentSection = location.pathname.includes('/blog/')
      ? '/blog/'
      : location.pathname.includes('/courses/') || location.pathname.includes('/teaching/')
        ? '/teaching/'
        : location.pathname;

    desktopNav.querySelectorAll('a').forEach(function (link) {
      const mobileLink = link.cloneNode(true);
      const linkPath = new URL(link.href, location.href).pathname;
      if (linkPath === currentSection) mobileLink.classList.add('current');
      sheet.appendChild(mobileLink);
    });

    overlay.appendChild(sheet);
    inner.insertBefore(button, inner.firstChild);
    header.insertAdjacentElement('afterend', overlay);
    document.body.classList.add('course-nav-ready');

    function setOpen(open) {
      overlay.classList.toggle('open', open);
      document.body.classList.toggle('course-nav-open', open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      overlay.setAttribute('aria-hidden', String(!open));
    }

    button.addEventListener('click', function () {
      setOpen(!overlay.classList.contains('open'));
    });
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) setOpen(false);
    });
    sheet.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && overlay.classList.contains('open')) {
        setOpen(false);
        button.focus();
      }
    });
    window.matchMedia('(min-width: 761px)').addEventListener('change', function (event) {
      if (event.matches) setOpen(false);
    });
  }

  function addGitHubFooterLink() {
    const footerLinks = document.querySelector('.course-foot .inner span:last-child');
    if (!footerLinks || footerLinks.querySelector('a[href="https://github.com/rezwan05"]')) return;

    const separator = document.createTextNode(' · ');
    const githubLink = document.createElement('a');
    githubLink.href = 'https://github.com/rezwan05';
    githubLink.target = '_blank';
    githubLink.rel = 'noopener';
    githubLink.textContent = 'GitHub';
    footerLinks.append(separator, githubLink);
  }

  function addSectionNavigation() {
    const isBlog = location.pathname.includes('/blog/');
    const isTeaching = location.pathname.includes('/teaching/') || location.pathname.includes('/courses/');
    if (!isBlog && !isTeaching) return;

    const sectionName = isBlog ? 'Blog' : 'Teaching';
    const sectionHref = isBlog ? '/blog/' : '/teaching/';
    const heading = document.querySelector(isBlog ? '.article-head' : '.course-head');
    const content = document.querySelector(isBlog ? 'article.post' : 'main.course-body');

    if (heading && !heading.querySelector('.context-back')) {
      const topLink = document.createElement('a');
      topLink.className = 'context-back';
      topLink.href = sectionHref;
      topLink.textContent = '\u2190 ' + sectionName;
      heading.insertBefore(topLink, heading.firstChild);
    }

    if (content && !content.querySelector('.context-links')) {
      const bottomNav = document.createElement('nav');
      bottomNav.className = 'context-links';
      bottomNav.setAttribute('aria-label', 'Return navigation');

      const sectionLink = document.createElement('a');
      sectionLink.href = sectionHref;
      sectionLink.textContent = 'Back to ' + sectionName;

      const homeLink = document.createElement('a');
      homeLink.href = '/';
      homeLink.textContent = 'Back to Home';

      bottomNav.append(sectionLink, homeLink);
      content.appendChild(bottomNav);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initMobileNavigation();
      addSectionNavigation();
      addGitHubFooterLink();
    });
  } else {
    initMobileNavigation();
    addSectionNavigation();
    addGitHubFooterLink();
  }
})();
