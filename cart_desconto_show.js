document.addEventListener('DOMContentLoaded', function () {
    // 1. Pega no texto do desconto do desktop
    var desktopLabel = document.querySelector(
        '#rdc-shop-order-resume-desktop .rdc-shop-order-item-label-title'
    );

    // 2. Pega no <p> da linha de desconto no mobile
    var mobileP = document.querySelector('tr.rowdiscount td:first-child p');

    if (!desktopLabel || !mobileP) {
        return; // se não encontrar, não faz nada
    }

    // Texto que vem do desktop, ex: "Desconto (20%)"
    var labelText = desktopLabel.textContent.trim();

    // Reaproveitar o código e o link que já existem no mobile
    var codeEl = mobileP.querySelector('.discount'); // <span class="discount"><b>...</b></span>
    var linkEl = mobileP.querySelector('a');         // link "Remover"

    // Limpar o conteúdo actual do <p> do mobile
    mobileP.textContent = labelText + ' '; // fica "Desconto (20%) "

    // Voltar a colocar o código e o link logo a seguir
    if (codeEl) mobileP.appendChild(codeEl);
    if (linkEl) mobileP.appendChild(linkEl);
});
