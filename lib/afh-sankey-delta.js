// afh-sankey-delta.js
(function(){
  const dbg = document.getElementById('debug');
  const log = m => dbg && (dbg.textContent += '\n' + m);

  // --- Circular self-test ---
  function testCircular(){
    if(!(window.d3 && d3.sankeyCircular)) {
      throw new Error('d3-sankey-circular not loaded');
    }
    const nodes = [{name:'A'}, {name:'B'}];
    const links = [{source:'A', target:'B', value:1}, {source:'B', target:'A', value:1}];
    const sankey = d3.sankeyCircular().nodeId(d => d.name);
    sankey({nodes: nodes.map(d => ({...d})), links: links.map(d => ({...d}))});
    return true;
  }

  try {
    if(testCircular()) {
      log('circular self-test: ok');
    }
  } catch(e) {
    log('circular self-test failed: ' + e.message);
    // Disable circular use globally
    window.d3.sankeyCircular = null;
  }

  // --- Legend tweak: add churn loop key ---
  document.addEventListener('DOMContentLoaded', () => {
    const legend = document.querySelector('#legend');
    if(legend && !legend.querySelector('.legend-churn')){
      const churnItem = document.createElement('div');
      churnItem.className = 'legend-churn';
      churnItem.innerHTML = `<svg width="30" height="10"><path d="M0 5 Q 15 -5 30 5" stroke="rgba(200,220,255,0.65)" stroke-width="3" stroke-dasharray="6,4" fill="none"></path></svg> Churn loop`;
      legend.appendChild(churnItem);
    }
  });
})();
