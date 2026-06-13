function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getCapContent() {
  if (typeof CAPData === 'undefined') return null;
  return CAPData.getContent();
}

function renderResearch(selector, options) {
  var root = document.querySelector(selector);
  var c = getCapContent();
  if (!root || !c || !c.research || !c.research.axes) return;
  var limit = options && options.limit ? options.limit : c.research.axes.length;
  root.innerHTML = c.research.axes.slice(0, limit).map(function(axis, index) {
    var descLimit = options && options.long ? 150 : 86;
    return '<article class="research-card" data-num="0' + (index + 1) + '">' +
      '<h3>' + escHtml(axis.title) + '</h3>' +
      '<p>' + escHtml(axis.desc.substring(0, descLimit)) + '...</p>' +
      '<span class="en">' + escHtml(axis.en) + '</span>' +
      '</article>';
  }).join('');
}

function renderPublications(selector, count) {
  var root = document.querySelector(selector);
  if (!root || typeof CAPData === 'undefined') return;
  root.innerHTML = CAPData.getArticles().slice(0, count || 2).map(function(article) {
    return '<div class="pub-item">' +
      '<div><span class="pub-title">' + escHtml(article.title) + '</span>' +
      '<span class="pub-meta">' + escHtml(article.authors) + ' · ' + escHtml(article.journal) + ' · ' + escHtml(article.year) + '</span></div>' +
      (article.doi ? '<a class="pub-link" href="' + escHtml(article.doi) + '" target="_blank">DOI -></a>' : '<span class="pub-no-link">DOI 추가 예정</span>') +
      '</div>';
  }).join('');
}

function fillCounts() {
  if (typeof CAPData === 'undefined') return;
  var content = CAPData.getContent();
  var axisCount = content.research && content.research.axes ? content.research.axes.length : 4;
  var memberCount = CAPData.getMembers().length;
  document.querySelectorAll('[data-axis-count]').forEach(function(node) { node.textContent = axisCount; });
  document.querySelectorAll('[data-member-count]').forEach(function(node) { node.textContent = memberCount; });
}

document.addEventListener('DOMContentLoaded', function() {
  fillCounts();
  renderResearch('[data-research-grid]', { limit: 4 });
  renderResearch('[data-axis-board]', { limit: 4, long: true });
  renderPublications('[data-publications]', 2);
  renderPublications('[data-publications-wide]', 3);
});
