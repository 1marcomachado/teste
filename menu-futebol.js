const css = `
  [attr-id-hover="1871"] .column-menu > ul > li:nth-child(2):not(.sub-sub) > a {
    background-color: #38D430 !important;
    color: #000 !important;
    border-radius: 4px;
    padding: 5px 10px;
    display: inline-block;
    margin: 0 4px;
  }

  [attr-id-hover="1871"] .column-menu > ul > li:nth-child(2):not(.sub-sub):hover > a,
  [attr-id-hover="1871"] .column-menu > ul > li:nth-child(2):not(.sub-sub).sel > a {
    background-color: #2DB82B !important;
  }
`;
const style = document.createElement("style");
style.textContent = css;
document.head.appendChild(style);
