if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      console.log('service worker registed!');
    }).catch(err => {
      console.log('Opooos, something wrong happend!');
    })
  })
}

window.onload = function () {
  document.body.append('PWA!')
}
