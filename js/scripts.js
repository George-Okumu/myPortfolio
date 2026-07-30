    document.getElementById('year').textContent = new Date().getFullYear();

    const menuBtn    = document.getElementById('menuBtn');
    const navDrawer  = document.getElementById('navDrawer');
    const navOverlay = document.getElementById('navOverlay');
    const drawerClose = document.getElementById('drawerClose');

    function openDrawer() {
      navDrawer.classList.add('open');
      navOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      navDrawer.classList.remove('open');
      navOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);
    navOverlay.addEventListener('click', closeDrawer);

    document.querySelectorAll('.nav-drawer__link').forEach(function(link) {
      link.addEventListener('click', closeDrawer);
    });

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    var filterBtns = document.querySelectorAll('.filter-btn');
    var portfolioItems = document.querySelectorAll('.portfolio__item');

    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var filter = this.dataset.filter;

        filterBtns.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');

        portfolioItems.forEach(function(item) {
          var match = filter === 'all' || item.dataset.name === filter;
          item.classList.toggle('item--hidden', !match);
        });
      });
    });

    if ('IntersectionObserver' in window) {
      var srObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            srObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.sr').forEach(function(el) {
        srObserver.observe(el);
      });
    } else {
      document.querySelectorAll('.sr').forEach(function(el) {
        el.classList.add('in');
      });
    }