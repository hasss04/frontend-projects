const fsBtn       = document.getElementById('fs-btn');
const formatSelect = document.getElementById('format-select');
const zoneSelect   = document.getElementById('zone-select');
const secondary    = document.getElementById('secondary');

fsBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
document.addEventListener('fullscreenchange', () => {
  fsBtn.textContent = document.fullscreenElement
    ? 'Exit Full Screen'
    : 'View Full Screen';
});

const clocks = [
  {
    panel: document.querySelector('.single-clock'),
    timeEl:  document.querySelector('.single-clock .time'),
    dateEl:  document.querySelector('.single-clock .date'),
    getZone: () => undefined // local
  },
  {
    panel: document.getElementById('secondary'),
    timeEl:  document.querySelector('#secondary .time'),
    dateEl:  document.querySelector('#secondary .date'),
    getZone: () => zoneSelect.value || undefined
  }
];

function updateClocks() {
  const is12h = formatSelect.value === '12';
  clocks.forEach(clock => {
    const zone = clock.getZone();
    // update time
    clock.timeEl.textContent = new Date().toLocaleTimeString(undefined, {
      hour12: is12h,
      hour:   '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: zone
    });
    clock.dateEl.textContent = new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      year:    'numeric',
      month:   'long',
      day:     'numeric',
      timeZone: zone
    });
  });
}

zoneSelect.addEventListener('change', () => {
  if (!zoneSelect.value) {
    secondary.style.display = 'none';
  } else {
    secondary.style.display = 'block';
    document.getElementById('secondary-label').textContent =
      zoneSelect.value.split('/').pop().replace('_',' ');
  }
});

updateClocks();
setInterval(updateClocks, 1000);