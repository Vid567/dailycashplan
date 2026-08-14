(()=>{
  const labels={income:'Total income',expenses:'Total expenses',debts:'Total debt',plan:'Available'};
  const classes={income:'income',expenses:'expenses',debts:'debt',plan:'available'};
  function ensureSlots(){
    for(const id of Object.keys(labels)){
      const screen=document.getElementById(id); if(!screen) continue;
      let box=screen.querySelector('.workflow-total');
      if(!box){
        box=document.createElement('div');
        box.className=`workflow-total workflow-total-${classes[id]}`;
        box.innerHTML=`<span>${labels[id]}</span><strong></strong>`;
        const h1=screen.querySelector('h1');
        if(h1) h1.insertAdjacentElement('afterend',box); else screen.prepend(box);
      }
    }
  }
  function update(){
    if(typeof totals!=='function'||typeof money!=='function') return;
    ensureSlots();
    const t=totals();
    const values={income:t.income,expenses:t.expenses,debts:t.debt,plan:t.available};
    for(const [id,value] of Object.entries(values)){
      const strong=document.querySelector(`#${id} .workflow-total strong`);
      if(strong) strong.textContent=money(value);
    }
  }
  function hookRender(){
    if(typeof render==='function'&&!render.__liveTotalsHooked){
      const original=render;
      const wrapped=function(){const result=original.apply(this,arguments);update();return result;};
      wrapped.__liveTotalsHooked=true;
      render=wrapped;
    }
  }
  function init(){hookRender();update();setInterval(()=>{hookRender();update();},500);}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
