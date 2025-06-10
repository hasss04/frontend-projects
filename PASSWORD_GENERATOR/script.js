const UPPER   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER   = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{};:,.<>?';

const WORDS = [
  'apple','jungle','river','mountain','cloud','tiger','ocean','forest','star','desert',
  'moon','sun','flower','stone','wind','island','rain','snow','tree','fire',
  'shadow','canvas','pixel','ember','harbor','glade','sage','quartz','meadow','breeze',
  'canyon','peak','valley','reef','glimmer','marsh','arch','rift','spire','blossom',
  'dune','gale','hollow','lagoon','mist','opal','quill','raven','thicket','zephyr'
];

const modeEl       = document.getElementById('mode');
const lengthEl     = document.getElementById('length');
const upperEl      = document.getElementById('upper');
const lowerEl      = document.getElementById('lower');
const numsEl       = document.getElementById('numbers');
const symEl        = document.getElementById('symbols');
const incSymPhrase = document.getElementById('includeSymbolsInPhrase');
const genBtn       = document.getElementById('generate');
const passEl       = document.getElementById('password');
const copyBtn      = document.getElementById('copy');
const gibOptions   = document.getElementById('gib-options');
const phraseOptions= document.getElementById('phrase-options');

function syncMode() {
  if (modeEl.value === 'gibberish') {
    gibOptions.style.display = 'flex';
    phraseOptions.style.display = 'none';
  } else {
    gibOptions.style.display = 'none';
    phraseOptions.style.display = 'flex';
  }
}
modeEl.addEventListener('change', syncMode);
syncMode();

const rnd = s => s[Math.floor(Math.random()*s.length)];

function makeGibberish(len) {
  let charset = '';
  if (upperEl.checked) charset += UPPER;
  if (lowerEl.checked) charset += LOWER;
  if (numsEl.checked)   charset += NUMBERS;
  if (symEl.checked)    charset += SYMBOLS;
  if (!charset) return '';
  return Array.from({length:len}, () => rnd(charset)).join('');
}

function makePassphrase(len) {
  const count = Math.max(1, Math.round(len/4));
  const words = Array.from({length:count}, () => rnd(WORDS));
  if (!incSymPhrase.checked) {
    return words.join('-');
  }

  return words.map((w,i) => {
    if (i > 0 && Math.random() < 0.5) {
      return rnd(SYMBOLS) + w;
    }
    return w;
  }).join('-');
}

genBtn.addEventListener('click', () => {
  const len  = Math.min(64, Math.max(4, +lengthEl.value || 16));
  const pwd  = modeEl.value==='gibberish'
    ? makeGibberish(len)
    : makePassphrase(len);
  passEl.value = pwd;
});


copyBtn.addEventListener('click', () => {
  if (!passEl.value) return;
  navigator.clipboard.writeText(passEl.value)
    .then(() => copyBtn.textContent = 'Copied!')
    .catch(() => copyBtn.textContent = 'Failed')
    .finally(() => setTimeout(()=> copyBtn.textContent = 'Copy', 1500));
});
