(function () {
  const nav = performance.getEntriesByType('navigation')[0];
  const isReload = nav ? nav.type === 'reload'
                       : (performance.navigation && performance.navigation.type === 1);

  const page = location.pathname.split('/').pop();
  const isSplash = page === '' || page === 'index.html';

  if (isReload && !isSplash) {
    sessionStorage.setItem('returnTo', page);   // kaunse page pe the, yaad rakhta hai
    location.replace('index.html');             // splash pe bhej deta hai
  }
})();