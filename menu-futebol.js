const observer = new MutationObserver(() => {
  const ul = document.querySelector('[attr-id-hover="1871"] .column-menu > ul');
  if (!ul) return;

  const items = [...ul.querySelectorAll(':scope > li:not(.sub-sub)')];
  if (items.length >= 2) {
    items[1].classList.add('futebol-li');
    observer.disconnect(); // parar de observar
  }
});

observer.observe(document.body, { childList: true, subtree: true });

const styleTag = document.createElement('style');
styleTag.textContent = `
  .futebol-li > a {
    background-color: #38D430 !important;
    color: #000 !important;
    border-radius: 4px !important;
    padding: 5px 10px !important;
    display: inline-block !important;
    margin: 0 4px !important;
  }

  .futebol-li:hover > a,
  .futebol-li.sel > a {
    background-color: #2DB82B !important;
  }
`;
document.head.appendChild(styleTag);
