$(document).ready(function () {

  // ==========================
  // VARIABLES COMUNES
  // ==========================

  const post = '.post-wrap';
  const postBody = '.post';
  const postField = '.field';
  const postAvatar = '.pp-avatar';
  const postLabel = '.pp-flabel';
  const postContent = '.pp-fcontent';
  const postNombre = '.pp-name';

  const perfil = '.perfilsencillo';
  const perfilField = '.ps-field';
  const perfilAvatar = '.ps-ava';
  const perfilLabel = '.ps-flabel';
  const perfilContent = '.ps-fcontent';
  const perfilNombre = '.ps-name';

  const index = '.forum-section';
  const indexName = '.color-groups';

  const topiclist = '.posts-section';
  const topiclistName = '.color-groups';

  const privmessage = '.display-message';
  const privmessageName = '.block-post-footer.sender';

  const historymessage = '.history-messages';
  const historymessageName = '.post-details.sender';

  const member = '.member';
  const memberName = '.member-name';

  const spaposts = '.block.block-blogrow';
  const spapostsName = '.block-footer';

  const previewpost = '.block-comment';
  const previewpostName = '.block-comment-details';

  const nacimiento = '.fechadenacimiento';

  // Sistema de color de grupo
  const accent = '8C8C8C';
  const variableName = 'group';
  const opacityChoices = ['75', '50', '25', '15'];

  // ==========================
  // FECHA ÚNICA PARA CALCULAR EDAD
  // ==========================

  const ageRule = {
    month: 1,
    year: 2000
  };


  // ==========================
  // CLASIFICAR CAMPOS
  // ==========================

  function getClass(elem, name) {

    let clase = $(elem)
      .find(name)
      .text()
      .replace(/ /g, '')
      .toLowerCase()
      .replace(/'/g, "")
      .replace(/[()]/g, '')
      .replace(/[^a-z0-9]/gi, '');

    $(elem).addClass(clase);

    let nombreCampo;

    if ($(elem).find(name + ' > span').length) {
      nombreCampo = $(elem).find(name + ' > span').text();

    } else if ($(elem).find(name + ' > span span').length) {
      nombreCampo = $(elem).find(name + ' > span span').text();

    } else {
      nombreCampo = $(elem).find(name).text();
    }

    $(elem).find(name).text(nombreCampo);

    const exactFieldSelector = `div[data-field="${clase}"]`;

    $(elem).parents(post).find(exactFieldSelector).append(elem);
    $(elem).parents(perfil).find(exactFieldSelector).append(elem);
  }


  // ==========================
  // CALCULAR EDAD
  // ==========================

  function getAge(field, content, month, year) {

    let string = $(field).find(content).text();
    let fecha = string.split('/');

    let age = year - fecha[2];

    if (
      fecha[1] > month ||
      (fecha[1] == month && fecha[0] > new Date().getDate())
    ) {
      age--;
    }

    // Crear campo de edad
    let ageField = $('<div>', {
      class: 'field edad'
    });

    // Etiqueta
    let label = $('<div>', {
      class: $(field).find(postLabel + ', ' + perfilLabel).attr('class'),
      text: 'Edad'
    });

    // Contenido
    let contentField = $('<span>', {
      class: $(field).find(content).attr('class'),
      text: age + ' DDN'
    });

    ageField
      .append(label)
      .append(contentField);

    $(field).before(ageField);
  }


  // ==========================
  // OBTENER COLOR DE GRUPO
  // ==========================

  function getColor(name, box) {

    let color;

    if ($(box).find(name + ' span').length) {

      color = $(box)
        .find(name + ' span')
        .attr('style')
        .split(';')[0]
        .split('#')[1];

    }

    // Caso específico para .color-groups
    else if ($(box).find('.color-groups').length) {

      color = $(box)
        .find('.color-groups')
        .attr('style')
        .split('color:')[1]
        .split(';')[0]
        .trim()
        .replace('#', '');

    }

    // Caso específico para .block-comment-details
    else if ($(box).find('.block-comment-details').length) {

      color = $(box)
        .find('.block-comment-details')
        .attr('style')
        .split('color:')[1]
        .split(';')[0]
        .trim()
        .replace('#', '');

    } else {

      color = accent;
    }

    // Variable principal del grupo
    $(box).attr(
      'style',
      '--' + variableName + ':#' + color
    );

    // Variables de opacidad
    if (opacityChoices.length) {

      let existingStyle = $(box).attr('style');

      const opacities = {
        '95': 'F2',
        '90': 'E6',
        '85': 'D9',
        '80': 'CC',
        '75': 'BF',
        '70': 'B3',
        '65': 'A6',
        '60': '99',
        '55': '8C',
        '50': '80',
        '45': '73',
        '40': '66',
        '35': '59',
        '30': '4D',
        '25': '40',
        '20': '33',
        '15': '26',
        '10': '1A',
        '5': '0D',
        '0': '00'
      };

      let newString = [];

      $.each(opacityChoices, function () {

        let value = opacities[this];

        if (value !== undefined) {
          newString.push(
            '--' +
            variableName +
            '-' +
            this +
            ':#' +
            color +
            value +
            ';'
          );
        }
      });

      let finalString =
        existingStyle +
        ';' +
        newString.join('');

      $(box).attr('style', finalString);
    }
  }


  // ==========================
  // PROCESAR POSTS
  // ==========================

  $(postField).each(function () {
    getClass(this, postLabel);
  });


  $(nacimiento).each(function () {

    const color = $(this)
      .closest(post)
      .find(postNombre + ' span')
      .attr('style')
      .split(';')[0]
      .split('#')[1];

    getAge(
      this,
      postContent,
      ageRule.month,
      ageRule.year
    );
  });


  $(post).each(function () {

    getColor(postNombre, this);

    let nameContent = $(this)
      .find(postNombre)
      .text();

    if (nameContent === 'Contenido patrocinado') {
      $(this).remove();
    }
  });


  // ==========================
  // PROCESAR PERFILES
  // ==========================

  $(perfilField).each(function () {
    getClass(this, perfilLabel);
  });


  $(perfil + ' ' + nacimiento).each(function () {

    const color = $(this)
      .closest(perfil)
      .find(perfilNombre + ' span')
      .attr('style')
      .split(';')[0]
      .split('#')[1];

    getAge(
      this,
      perfilContent,
      ageRule.month,
      ageRule.year
    );
  });


  $(perfil).each(function () {

    getColor(perfilNombre, this);

    let nameContent = $(this)
      .find(perfilNombre)
      .text();

    $(this)
      .parents('html')
      .find('title')
      .text(nameContent);
  });


  // ==========================
  // COLOR EN LOS FOROS DEL ÍNDICE
  // ==========================

  $(index).each(function () {

    getColor(indexName, this);

    let nameContent = $(this)
      .find(indexName)
      .text();
  });


  // ==========================
  // COLOR EN LA TOPICLIST
  // ==========================

  $(topiclist).each(function () {

    getColor(topiclistName, this);

    let nameContent = $(this)
      .find(topiclistName)
      .text();
  });


  // ==========================
  // MENSAJES PRIVADOS
  // ==========================

  $(privmessage).each(function () {

    getColor(privmessageName, this);

    let nameContent = $(this)
      .find(privmessageName)
      .text();
  });


  // ==========================
  // HISTORIAL DE MENSAJES PRIVADOS
  // ==========================

  $(historymessage).each(function () {

    getColor(historymessageName, this);

    let nameContent = $(this)
      .find(historymessageName)
      .text();
  });


  // ==========================
  // MEMBERLIST
  // ==========================

  $(member).each(function () {

    getColor(memberName, this);

    let nameContent = $(this)
      .find(memberName)
      .text();
  });


  // ==========================
  // TODOS LOS MENSAJES DEL USER
  // ==========================

  $(spaposts).each(function () {

    getColor(spapostsName, this);

    let nameContent = $(this)
      .find(spapostsName)
      .text();
  });


  // ==========================
  // PREVISUALIZACIÓN DE MENSAJE
  // ==========================

  $(previewpost).each(function () {

    getColor(previewpostName, this);

    let nameContent = $(this)
      .find(previewpostName)
      .text();
  });

});

// EDITOR DE TEXTO
(function () {
  const settings = {
    css: `
      body { background: transparent; }
      body, code:before, html, p, table {
        font-size: 14px;
        color: #fbfbfb;
        font-family: Open Sans, sans-serif;
        line-height: 1.2;
      }
    `,

    icons: {
      bold: 'bold',
      italic: 'italic',
      underline: 'underline',
      strike: 'strikethrough',
      left: 'align-left',
      center: 'align-center',
      right: 'align-right',
      justify: 'align-justify',
      bulletlist: 'list-ul',
      orderedlist: 'list-ol',
      horizontalrule: 'grip-lines',
      quote: 'quote-right',
      code: 'code',
      faspoiler: 'toggle-on',
      fahide: 'eye-slash',
      table: 'table',
      servimg: 'upload',
      image: 'images',
      link: 'link',
      embed: 'anchor',
      youtube: ['fab', 'fa-youtube'],
      dailymotion: 'video',
      flash: 'file-video',
      headers: 'heading',
      size: 'text-height',
      color: 'palette',
      font: 'font',
      removeformat: 'undo',
      more: 'minus',
      subscript: 'subscript',
      superscript: 'superscript',
      fascroll: 'arrows-alt-h',
      faupdown: 'arrows-alt-v',
      farand: 'dice',
      faroll: 'dice-six',
      mention: 'at',
      emoticon: 'smile',
      twemojifa: 'face-laugh-wink',
      date: 'calendar',
      time: 'clock',
      pastetext: 'paste',
      source: 'file-code',
    }
  };

  function replaceButtons(container) {
    Object.keys(settings.icons).forEach(k => {
      const button = container.querySelector('.sceditor-button-' + k);

      if (!button) return;
      if (button.dataset.processed === "true") return;

      button.dataset.processed = "true";

      const icon = document.createElement('I');

      icon.classList.add(
        ...(Array.isArray(settings.icons[k])
          ? settings.icons[k]
          : ['fas', 'fa-' + settings.icons[k]]
        )
      );

      if (button.firstElementChild) {
        button.removeChild(button.firstElementChild);
      }

      button.appendChild(icon);

      // Alternar entre MÁS (+) y MENOS (-)
      if (k === 'more') {
        let desplegado = false;

        button.addEventListener('click', function () {
          desplegado = !desplegado;

          if (desplegado) {
            icon.className = 'fas fa-plus';
          } else {
            icon.className = 'fas fa-minus';
          }
        });
      }

      if (k === 'mention' && !button.querySelector('.sceditor-mention-label')) {
        const span = document.createElement('SPAN');

        span.className = 'sceditor-mention-label';
        span.textContent = 'Menciona a alguien';

        button.appendChild(span);
      }
    });
  }

  function appendStylesheet({ contentDocument }) {
    const style = contentDocument.createElement('STYLE');

    style.innerHTML = settings.css;
    contentDocument.head.appendChild(style);
  }

  function moverBotonMas(container) {
    const toolbar = container.querySelector('.sceditor-toolbar');

    if (!toolbar) return;

    const groups = toolbar.querySelectorAll('.sceditor-group');

    groups.forEach(group => {
      if (group.querySelector('.sceditor-button-more')) {
        toolbar.appendChild(group);
      }
    });
  }

  function procesarEditor(container) {
    if (!container) return;

    replaceButtons(container);
    moverBotonMas(container);

    const iframe = container.querySelector('iframe');

    if (iframe) {
      appendStylesheet(iframe);
    }
  }

  function intentarAplicar() {
    procesarEditor(document.getElementById('textarea_content'));
    procesarEditor(document.querySelector('.quick-reply-textarea-wrap'));
  }

  let intentos = 0;

  const intervalo = setInterval(() => {
    intentarAplicar();

    intentos++;

    if (document.querySelector('.sceditor-toolbar') || intentos > 20) {
      clearInterval(intervalo);
    }
  }, 300);
})();


// HEADER – Clase al hacer scroll
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if (header) {
      header.classList.toggle("on-scroll", window.scrollY > 0);
    }
  });
});


// COLOR DEL GRUPO EN BODY
document.addEventListener('DOMContentLoaded', () => {
  const opacityChoices = ['75', '50', '25', '15'];

  const groupColor = _userdata?.groupcolor
    ? `#${_userdata.groupcolor.replace('#', '')}`
    : '#8C8C8C';

  document.documentElement.style.setProperty('--groupbody', groupColor);

  const rawColor = groupColor.replace('#', '');

  const opacities = {
    '95': 'F2',
    '90': 'E6',
    '85': 'D9',
    '80': 'CC',
    '75': 'BF',
    '70': 'B3',
    '65': 'A6',
    '60': '99',
    '55': '8C',
    '50': '80',
    '45': '73',
    '40': '66',
    '35': '59',
    '30': '4D',
    '25': '40',
    '20': '33',
    '15': '26',
    '10': '1A',
    '5': '0D',
    '0': '00'
  };

  opacityChoices.forEach(opacity => {
    const hex = opacities[opacity];

    if (hex) {
      document.documentElement.style.setProperty(
        `--groupbody-${opacity}`,
        `#${rawColor}${hex}`
      );
    }
  });
});


// AVATAR EN ÚLTIMOS TEMAS
$(function () {
  var tema = '.mod-recent-row';
  var link = '.mod-recent-title';
  var name = '.mod-recent-author-name';
  var icon = '.mod-recent-avatar';
  var avatar = '.pp-ava';
  var nombre = '.pp-name';
  var post = '.post-wrap';

  var avatarPred =
    'https://2img.net/i.imgur.com/eS6oHJ5.jpeg';

  $(tema).each(function () {
    var url = $(this).find(link).attr('href');
    var target = $(this).find(icon);
    var userName = $(this).find(name).text();

    $.get(url, function (data) {
      var avaPost = $(data)
        .find(nombre + ':contains(' + userName + ')')
        .parents(post)
        .find(avatar)
        .find('img');

      $(target).find('img').remove();

      if (userName === "Invitado" || avaPost.length === 0) {
        $(target).append(
          '<img src="' + avatarPred + '">'
        );
      } else {
        $(target).append(avaPost);
      }
    });
  });
});


// OTROS – Versión segura
$(window).on('load', function () {
  const loginBtn = $('header a.button[href*="/login"]');

  if (loginBtn.length) {
    loginBtn.parents('body').addClass('bodyinvi');
  }

  const newMsg = $('.new-message');

  if (newMsg.length) {
    newMsg.parents('body').addClass('nuevomp');
  }

  const emailDl = $('dl.block-dl-default')
    .has('a[href*="/profile?mode=email"]');

  if (emailDl.length) {
    emailDl.remove();
  }

  const searchMain = $('#search-main');

  if (searchMain.length) {
    searchMain.remove();
  }

  const iconsMap = [
    {
      selector: 'img[src*="user_profile"]',
      text: 'Perfil',
      title: 'Ver el perfil del personaje'
    },
    {
      selector: 'img[src*="contact_pm"]',
      text: 'MP',
      title: 'Enviar un mensaje privado'
    },
    {
      selector: 'a img[src*="icon_contact_www\\.png"]',
      text: 'Baúl',
      title: 'Curiosear el baúl'
    }
  ];

  iconsMap.forEach(icon => {
    const $el = $(icon.selector);

    if ($el.length && $el.parent().length) {
      $el.parent()
        .text(icon.text)
        .attr('title', icon.title);
    }
  });

  const labelSelectors = [
    '.pp-flabel',
    '.ps-flabel',
    '.cp-inner label span:not(.ucp-preferencias label span, .borrar-imagen span)',
    '.ucp-preferencias label.radio-label',
    '.ucp-idiomadelforo > span',
    '.ucp-zonahoraria > span',
    '.ucp-formatodelafechafechayhoraactu > span'
  ];

  $(labelSelectors.join(',')).each(function () {
    $(this).html(
      $(this).text().replace(":", "")
    );
  });

  $('.ps-flabel').each(function () {
    $(this).html(
      $(this).text().replace("*", "")
    );
  });

  $('.posts-topic-type strong').each(function () {
    $(this).html(
      $(this).text().replace(":", "")
    );
  });
});


// FONDO DE LOS AWARDS
$(function () {
  document.querySelectorAll('.award').forEach(el => {
    const style = getComputedStyle(el);
    const imageURL = style.getPropertyValue('--award-image').trim();

    if (!imageURL || el.querySelector('img')) return;

    el.style.backgroundImage = 'none';

    const cleanURL = imageURL.replace(
      /^url\((['"]?)(.+?)\1\)$/,
      '$2'
    );

    const img = document.createElement('img');

    img.src = cleanURL;
    img.alt = 'award';
    img.className = 'award-img';

    el.appendChild(img);
  });
});


// REEMPLAZAR IMAGEN POR ICONO - ICONO DE ÚLT. MENSAJE DE UN TEMA EN EL ÍNDICE
document.addEventListener('DOMContentLoaded', () => {
  const replacements = [
    {
      src: 'https://2img.net/i/fa/awesomebb/icon_topic_latest.png',
      color: null
    },
    {
      src: 'https://2img.net/i/fa/awesomebb/icon_topic_newest.png',
      color: 'var(--groupbody)'
    }
  ];

  replacements.forEach(item => {
    document
      .querySelectorAll(`img[src="${item.src}"]`)
      .forEach(img => {

        if (img.dataset.replaced) return;

        img.dataset.replaced = 'true';

        const icon = document.createElement('i');

        icon.className =
          'fa-solid fa-arrow-right topic-icon-replacement';

        if (item.color) {
          icon.style.color = item.color;
        }

        icon.style.verticalAlign = 'middle';

        img.insertAdjacentElement('afterend', icon);
        img.style.display = 'none';
      });
  });
});

// LOGO EN NAVBAR
document.addEventListener("DOMContentLoaded", function () {

    const logoHTML = "Fatal Dreams";
    const logoClass = "logo-default";

    /* LOGO SUPERIOR (navbar) */
    const logoTitle = document.querySelector("#logo-text");

    if (logoTitle) {
        logoTitle.innerHTML = logoHTML;
        logoTitle.className = "";
        logoTitle.classList.add(logoClass);
    }

    /* LOGO DEL MENÚ LATERAL (AwesomeBB) */
    const menuHeadline = document.querySelector(".main-menu-headline");

    if (menuHeadline) {
        const words = logoHTML.trim().split(/\s+/);
        menuHeadline.innerHTML = words
            .map(word => `<span>${word}</span>`)
            .join("");

        menuHeadline.className = "main-menu-headline";
        menuHeadline.classList.add(logoClass);
    }

});

// COLOR PICKER - PALETA DE COLOR PARA EL EDITOR DE TEXTO
(function () {
  'use strict';

  /* =================== CONFIGURACIÓN =================== */
  var FORUM_BG   = '#0b0b0bb3'; // fondo del foro (admite #rrggbb o #rrggbbaa)
  var BACKDROP   = '#000000';   // color que se ve "detrás" del fondo semitransparente
                                // (si hay una imagen clara debajo, pon aquí un color más claro)
  var MIN_RATIO  = 4.5;         // 4.5 = WCAG AA texto normal · 7 = WCAG AAA · 3 = AA texto grande

  // Segunda regla: colores "puros"/neón (rojo #FF0000, verde #00FF00, amarillo #FFFF00...).
  // Demasiado vivo = saturación > MAX_SATURATION Y brillo > VIVID_MIN_VALUE (0 a 1).
  // Para desactivar la regla: MAX_SATURATION = 1.
  // (mantén estos valores iguales que en el script que fuerza el contraste en los mensajes)
  var MAX_SATURATION  = 0.7;
  var VIVID_MIN_VALUE = 0.85;
  /* ===================================================== */

  var KEY = 'awbb_color_palette_v1';
  var panel = null;

  /* ---------- Almacenamiento ---------- */
  function load() {
    try {
      var d = JSON.parse(localStorage.getItem(KEY));
      if (d && Array.isArray(d.saved)) return d;
    } catch (e) {}
    return { saved: [], current: '#ffffff' };
  }
  function store(d) {
    try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
  }

  /* ---------- Conversión de colores ---------- */
  function hsv2rgb(h, s, v) {
    var f = function (n) {
      var k = (n + h / 60) % 6;
      return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
    };
    return [Math.round(f(5) * 255), Math.round(f(3) * 255), Math.round(f(1) * 255)];
  }
  function rgb2hsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, h = 0;
    if (d) {
      if (max === r) h = ((g - b) / d) % 6;
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60; if (h < 0) h += 360;
    }
    return [h, max ? d / max : 0, max];
  }
  function rgb2hex(c) {
    return '#' + c.map(function (n) { return ('0' + n.toString(16)).slice(-2); }).join('');
  }
  function normHex(v) {
    v = String(v || '').trim().replace(/^#/, '');
    if (/^[0-9a-f]{3}$/i.test(v)) v = v.replace(/(.)/g, '$1$1');
    return /^[0-9a-f]{6}$/i.test(v) ? '#' + v.toLowerCase() : null;
  }
  function hex2rgb(hex) {
    return [1, 3, 5].map(function (i) { return parseInt(hex.substr(i, 2), 16); });
  }

  /* ---------- WCAG: luminancia y contraste ---------- */
  function lin(c) {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }
  function luminance(rgb) {
    return 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
  }
  function contrastWith(rgb, bgL) {
    var l = luminance(rgb);
    var hi = Math.max(l, bgL), lo = Math.min(l, bgL);
    return (hi + 0.05) / (lo + 0.05);
  }

  // Fondo efectivo: se mezcla el fondo semitransparente con el color de base
  function effectiveBg() {
    var h = String(FORUM_BG).replace('#', '');
    var rgb = hex2rgb('#' + h.substr(0, 6));
    var a = h.length >= 8 ? parseInt(h.substr(6, 2), 16) / 255 : 1;
    var base = hex2rgb(normHex(BACKDROP) || '#000000');
    return rgb.map(function (c, i) { return Math.round(c * a + base[i] * (1 - a)); });
  }
  var BG_RGB = effectiveBg();
  var BG_HEX = rgb2hex(BG_RGB);
  var BG_L = luminance(BG_RGB);

  function ratioOfHSV(h, s, v) { return contrastWith(hsv2rgb(h, s, v), BG_L); }
  function ratioOfHex(hex) { return contrastWith(hex2rgb(hex), BG_L); }
  function passes(r) { return r >= MIN_RATIO; }
  function isVivid(s, v) { return s > MAX_SATURATION + 0.005 && v > VIVID_MIN_VALUE; }
  function okHSV(h, s, v) { return !isVivid(s, v) && passes(ratioOfHSV(h, s, v)); }
  function okHex(hex) {
    var c = rgb2hsv.apply(null, hex2rgb(hex));
    return okHSV(c[0], c[1], c[2]);
  }

  // Busca el color accesible más cercano (mismo tono y saturación si es posible)
  function nearestAccessible(h, s, v) {
    var d, i, c, cand;
    if (isVivid(s, v)) s = MAX_SATURATION;   // primero se suaviza el color vivo
    for (d = 0; d <= 1.0001; d += 0.005) {
      cand = [Math.min(1, v + d), Math.max(0, v - d)];
      for (i = 0; i < 2; i++) {
        c = cand[i];
        if (okHSV(h, s, c)) return [h, s, c];
      }
    }
    for (d = 0; d <= 1.0001; d += 0.02) {
      var ss = Math.max(0, s - d);
      if (okHSV(h, ss, 1)) return [h, ss, 1];
      if (okHSV(h, ss, 0)) return [h, ss, 0];
    }
    return [h, 0, 1];
  }

  function levelText(r) {
    if (r >= 7) return 'AAA';
    if (r >= 4.5) return 'AA';
    if (r >= 3) return 'sólo texto grande';
    return 'insuficiente';
  }

  /* ---------- Estilos ---------- */
  function injectCSS() {
    if (document.getElementById('awc-style')) return;
    var s = document.createElement('style');
    s.id = 'awc-style';
    s.textContent =
      '.awc-panel{position:absolute;z-index:99999;width:260px;padding:12px;box-sizing:border-box;' +
      'color:var(--clr-text,#222);background-color:var(--bg-xlight,#fff);' +
      'backdrop-filter:var(--filter-blur,none);-webkit-backdrop-filter:var(--filter-blur,none);' +
      'box-shadow:0 6px 24px rgba(0,0,0,.25);font:13px/1.3 sans-serif}' +
      '.awc-sv{position:relative;height:150px;border-radius:6px;cursor:crosshair;touch-action:none;overflow:hidden}' +
      '.awc-sv canvas{display:block;width:100%;height:100%}' +
      '.awc-dot{position:absolute;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;' +
      'border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.7);pointer-events:none}' +
      '.awc-hue{width:100%;height:14px;margin:10px 0;border-radius:7px;-webkit-appearance:none;appearance:none;' +
      'background:linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00);outline:none}' +
      '.awc-hue::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;' +
      'background:#fff;border:2px solid #555;cursor:pointer}' +
      '.awc-hue::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:#fff;border:2px solid #555;cursor:pointer}' +
      '.awc-row{display:flex;gap:6px;align-items:center;margin-top:8px}' +
      '.awc-prev{width:34px;height:30px;flex:none;border-radius:6px;border:1px solid rgba(128,128,128,.6)}' +
      '.awc-sample{flex:1;height:30px;line-height:30px;padding:0 8px;border-radius:6px;font-weight:bold;' +
      'overflow:hidden;white-space:nowrap;border:1px solid rgba(128,128,128,.6)}' +
      '.awc-info{margin-top:8px;padding:5px 8px;border-radius:5px;font-size:12px}' +
      '.awc-info.ok{background:rgba(40,167,69,.18);border:1px solid rgba(40,167,69,.7)}' +
      '.awc-info.bad{background:rgba(220,53,69,.18);border:1px solid rgba(220,53,69,.7)}' +
      '.awc-fix{display:none;width:100%;margin-top:6px}' +
      '.awc-panel input[type=text]{flex:1;min-width:0;padding:5px 6px;border:1px solid rgba(128,128,128,.6);' +
      'border-radius:5px;background:transparent;color:inherit;font:inherit}' +
      '.awc-panel button{cursor:pointer;padding:5px 10px;border-radius:5px;border:1px solid rgba(128,128,128,.6);' +
      'background:rgba(128,128,128,.15);color:inherit;font:inherit}' +
      '.awc-panel button.awc-ok{color:var(--clr-text,#fff);background-color:var(--groupbody,#2d7ff9);' +
      'border-color:var(--groupbody,#2d7ff9)}' +
      '.awc-panel button:disabled{opacity:.4;cursor:not-allowed}' +
      '.awc-title{margin:12px 0 4px;font-weight:bold;font-size:12px;opacity:.8}' +
      '.awc-list{display:flex;flex-direction:column;gap:3px;max-height:120px;overflow:auto}' +
      '.awc-chip{display:flex;align-items:center;gap:6px;padding:3px 6px;border-radius:5px;cursor:pointer;' +
      'border:1px solid transparent}' +
      '.awc-chip:hover{background:rgba(128,128,128,.18)}' +
      '.awc-chip.on{border-color:var(--groupbody-50)}' +
      '.awc-chip.low b{opacity:.55}' +
      '.awc-chip i{width:18px;height:18px;flex:none;border-radius:4px;border:1px solid rgba(128,128,128,.6)}' +
      '.awc-chip b{flex:1;font-weight:normal;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
      '.awc-chip small{opacity:.6;font-family:monospace}' +
      '.awc-chip em{font-style:normal;color:#e6a100}' +
      '.awc-chip u{text-decoration:none;opacity:.6;padding:0 4px}' +
      '.awc-chip u:hover{opacity:1;color:#e33}' +
      '.awc-empty{opacity:.6;font-style:italic;padding:2px 0}' +
      '.awc-actions{display:flex;justify-content:flex-end;gap:6px;margin-top:12px}';
    document.head.appendChild(s);
  }

  /* ---------- Instancia del editor ---------- */
  function getInstance(btn) {
    var box = btn.closest('.sceditor-container');
    if (!box || !box.parentNode) return null;
    var ta = box.parentNode.querySelector('textarea');
    if (!ta) return null;
    try {
      if (window.sceditor && window.sceditor.instance) return window.sceditor.instance(ta);
    } catch (e) {}
    try {
      if (window.jQuery) return window.jQuery(ta).sceditor('instance');
    } catch (e) {}
    return null;
  }

  /* ---------- Panel ---------- */
  function closePanel() {
    if (panel) { panel.remove(); panel = null; }
    document.removeEventListener('mousedown', onOutside, true);
    document.removeEventListener('keydown', onKey, true);
  }
  function onOutside(e) {
    if (panel && !panel.contains(e.target)) closePanel();
  }
  function onKey(e) {
    if (e.key === 'Escape') closePanel();
  }

  function openPanel(btn) {
    closePanel();
    injectCSS();
    var inst = getInstance(btn);
    var data = load();
    var start = normHex(data.current) || '#ffffff';
    var hsv = rgb2hsv.apply(null, hex2rgb(start));
    if (!okHSV(hsv[0], hsv[1], hsv[2])) {
      hsv = nearestAccessible(hsv[0], hsv[1], hsv[2]);
    }

    panel = document.createElement('div');
    panel.className = 'awc-panel';
    panel.innerHTML =
      '<div class="awc-sv"><canvas width="234" height="150"></canvas><div class="awc-dot"></div></div>' +
      '<input type="range" class="awc-hue" min="0" max="360" step="1">' +
      '<div class="awc-row"><div class="awc-prev"></div>' +
      '<input type="text" class="awc-hex" maxlength="7" spellcheck="false" placeholder="#rrggbb">' +
      '<div class="awc-sample">Aa Texto</div></div>' +
      '<div class="awc-info"></div>' +
      '<button type="button" class="awc-fix">Ajustar al color accesible más cercano</button>' +
      '<div class="awc-title">Mis colores guardados</div>' +
      '<div class="awc-list"></div>' +
      '<div class="awc-row"><input type="text" class="awc-name" maxlength="30" placeholder="Nombre (p. ej. NPC Guardia)">' +
      '<button type="button" class="awc-save">Guardar</button></div>' +
      '<div class="awc-actions"><button type="button" class="awc-cancel">Cancelar</button>' +
      '<button type="button" class="awc-ok">Aceptar</button></div>';
    document.body.appendChild(panel);

    var sv = panel.querySelector('.awc-sv'),
        cv = sv.querySelector('canvas'),
        ctx = cv.getContext('2d'),
        dot = panel.querySelector('.awc-dot'),
        hue = panel.querySelector('.awc-hue'),
        prev = panel.querySelector('.awc-prev'),
        sample = panel.querySelector('.awc-sample'),
        info = panel.querySelector('.awc-info'),
        fixBtn = panel.querySelector('.awc-fix'),
        hexIn = panel.querySelector('.awc-hex'),
        nameIn = panel.querySelector('.awc-name'),
        saveBtn = panel.querySelector('.awc-save'),
        okBtn = panel.querySelector('.awc-ok'),
        list = panel.querySelector('.awc-list');

    sample.style.background = BG_HEX;

    var drawnHue = -1;

    function curHex() { return rgb2hex(hsv2rgb(hsv[0], hsv[1], hsv[2])); }

    /* Dibuja el cuadro S/V; las zonas que NO cumplen el contraste se tachan */
    function drawSV() {
      var w = cv.width, h = cv.height, img = ctx.createImageData(w, h), px = img.data, i = 0;
      for (var y = 0; y < h; y++) {
        var v = 1 - y / (h - 1);
        for (var x = 0; x < w; x++) {
          var s = x / (w - 1);
          var c = hsv2rgb(hsv[0], s, v);
          if (!okHSV(hsv[0], s, v)) {
            if (((x + y) % 8) < 4) c = [45, 45, 45];
            else c = [Math.round(c[0] * 0.25 + 34), Math.round(c[1] * 0.25 + 34), Math.round(c[2] * 0.25 + 34)];
          }
          px[i++] = c[0]; px[i++] = c[1]; px[i++] = c[2]; px[i++] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      drawnHue = hsv[0];
    }

    function render(skipHexInput) {
      var hex = curHex();
      var ratio = ratioOfHex(hex);
      var hh = rgb2hsv.apply(null, hex2rgb(hex));
      var contrastOk = passes(ratio), vivid = isVivid(hh[1], hh[2]);
      var ok = contrastOk && !vivid;

      if (Math.round(hsv[0]) !== Math.round(drawnHue)) drawSV();
      dot.style.left = (hsv[1] * 100) + '%';
      dot.style.top = ((1 - hsv[2]) * 100) + '%';
      hue.value = Math.round(hsv[0]);
      prev.style.background = hex;
      sample.style.color = hex;
      if (!skipHexInput) hexIn.value = hex;

      info.className = 'awc-info ' + (ok ? 'ok' : 'bad');
      var msg = [];
      if (!contrastOk) msg.push('contraste insuficiente (mínimo ' + MIN_RATIO + ':1)');
      if (vivid) msg.push('color demasiado vivo (saturación máx. ' + Math.round(MAX_SATURATION * 100) + ' %)');
      info.textContent = 'Contraste ' + ratio.toFixed(2) + ':1 · ' +
        (ok ? 'Cumple (' + levelText(ratio) + ')' : 'No válido: ' + msg.join(' y '));
      fixBtn.style.display = ok ? 'none' : 'block';
      okBtn.disabled = !ok;
      saveBtn.disabled = !ok;

      Array.prototype.forEach.call(list.children, function (c) {
        if (c.classList) c.classList.toggle('on', c.getAttribute('data-color') === hex);
      });
    }

    function setFromHex(hex, skipHexInput) {
      hex = normHex(hex);
      if (!hex) return;
      var c = rgb2hsv.apply(null, hex2rgb(hex));
      if (c[1] === 0 || c[2] === 0) c[0] = hsv[0]; // evita saltos del tono en grises/negros
      hsv = c;
      render(skipHexInput);
    }

    function esc(t) {
      return String(t).replace(/[&<>"]/g, function (m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m];
      });
    }

    function renderList() {
      if (!data.saved.length) {
        list.innerHTML = '<div class="awc-empty">Aún no has guardado ninguno.</div>';
        return;
      }
      list.innerHTML = data.saved.map(function (c, i) {
        var r = ratioOfHex(c.color), low = !okHex(c.color);
        return '<div class="awc-chip' + (low ? ' low' : '') + '" data-i="' + i + '" data-color="' + c.color + '" ' +
          'title="' + (low ? 'No cumple las reglas de color (contraste ' + r.toFixed(2) + ':1 o demasiado vivo): ajústalo antes de insertar' : 'Usar este color') + '">' +
          '<i style="background:' + c.color + '"></i><b>' + esc(c.name) + '</b>' +
          (low ? '<em>⚠</em>' : '') +
          '<small>' + c.color + '</small><u data-del="' + i + '" title="Eliminar">&times;</u></div>';
      }).join('');
      render(true);
    }

    /* arrastre en el cuadro saturación/brillo */
    function pick(e) {
      var r = sv.getBoundingClientRect();
      hsv[1] = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      hsv[2] = 1 - Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      render();
    }
    sv.addEventListener('pointerdown', function (e) {
      sv.setPointerCapture(e.pointerId);
      pick(e);
      sv.onpointermove = pick;
    });
    sv.addEventListener('pointerup', function () { sv.onpointermove = null; });

    hue.addEventListener('input', function () { hsv[0] = +hue.value; render(); });
    hexIn.addEventListener('input', function () {
      if (normHex(hexIn.value)) setFromHex(hexIn.value, true);
    });
    hexIn.addEventListener('blur', function () { hexIn.value = curHex(); });

    fixBtn.addEventListener('click', function () {
      hsv = nearestAccessible(hsv[0], hsv[1], hsv[2]);
      render();
    });

    /* lista de guardados */
    list.addEventListener('click', function (e) {
      var del = e.target.getAttribute && e.target.getAttribute('data-del');
      if (del !== null && del !== undefined) {
        data.saved.splice(+del, 1);
        store(data);
        renderList();
        return;
      }
      var chip = e.target.closest('.awc-chip');
      if (chip) setFromHex(chip.getAttribute('data-color'));
    });

    saveBtn.addEventListener('click', function () {
      var hex = curHex();
      if (!okHex(hex)) return;
      var name = nameIn.value.trim() || ('Color ' + (data.saved.length + 1));
      data.saved.push({ name: name, color: hex });
      store(data);
      nameIn.value = '';
      renderList();
    });

    panel.querySelector('.awc-cancel').addEventListener('click', closePanel);

    okBtn.addEventListener('click', function () {
      var hex = curHex();
      if (!okHex(hex)) return; // doble comprobación
      data.current = hex;
      store(data);
      closePanel();
      if (inst) {
        try { inst.focus(); } catch (e) {}
        inst.insertText('[color=' + hex + ']', '[/color]');
      }
    });

    /* evita que el editor pierda la selección al pulsar en zonas no editables */
    panel.addEventListener('mousedown', function (e) {
      if (!/^(INPUT|BUTTON)$/.test(e.target.tagName) && !e.target.closest('.awc-chip')) e.preventDefault();
    });
    panel.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target === nameIn) saveBtn.click();
      else if (e.key === 'Enter' && e.target === hexIn) { setFromHex(hexIn.value); e.preventDefault(); }
    });

    /* posición bajo el botón */
    var r = btn.getBoundingClientRect();
    var left = r.left + window.pageXOffset;
    var maxLeft = window.pageXOffset + document.documentElement.clientWidth - panel.offsetWidth - 8;
    panel.style.left = Math.max(8, Math.min(left, maxLeft)) + 'px';
    panel.style.top = (r.bottom + window.pageYOffset + 4) + 'px';

    renderList();
    render();

    document.addEventListener('mousedown', onOutside, true);
    document.addEventListener('keydown', onKey, true);
  }

  /* ---------- Interceptar el botón nativo ---------- */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.sceditor-button-color');
    if (!btn) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    var native = document.querySelector('.sceditor-dropdown');
    if (native) native.remove();
    if (panel) closePanel(); else openPanel(btn);
  }, true);
})();

/*!
 * Fuerza de contraste WCAG en los mensajes (foroactivo · AwesomeBB)
 *
 * Recorre el contenido ya renderizado de los mensajes y, si un texto coloreado
 * ([color=...] -> <span style="color:..."> / <font color="...">) no alcanza el
 * contraste mínimo contra el fondo del foro, lo sustituye por el color accesible
 * más cercano (mismo tono y saturación siempre que sea posible).
 *
 * - Se aplica igual dentro de citas, spoilers, código, etc. (un único fondo).
 * - Funciona también con contenido cargado dinámicamente (respuesta rápida, AJAX...).
 * - No modifica el BBCode guardado: sólo cómo se muestra.
 * - Es independiente de la paleta del editor: puede cargarse junto a ella.
 */
(function () {
  'use strict';

  /* =================== CONFIGURACIÓN =================== */
  var FORUM_BG  = '#0b0b0bb3'; // fondo del foro (#rrggbb o #rrggbbaa)
  var BACKDROP  = '#000000';   // color visible detrás del fondo semitransparente
  var MIN_RATIO = 4.5;         // 4.5 = AA · 7 = AAA · 3 = AA texto grande
                               // (mantenlo igual que en el script de la paleta)

  // Segunda regla: colores "puros"/neón (rojo #FF0000, verde #00FF00, amarillo #FFFF00...).
  // Un color se considera demasiado vivo si su saturación supera MAX_SATURATION
  // Y su brillo supera VIVID_MIN_VALUE (0 a 1). Se corrige bajando la saturación.
  // Para desactivar la regla: MAX_SATURATION = 1.
  var MAX_SATURATION  = 0.7;
  var VIVID_MIN_VALUE = 0.85;

  // Zonas donde se revisan colores. AJÚSTALO a las clases reales de tu tema
  // (inspecciona un mensaje con F12). Se evitan nombres de usuario, menús, etc.
  var SCOPE   = '.post-content';
  var EXCLUDE = '.username, .username-coloured, .sceditor-container, .sceditor-dropdown, .awc-panel, textarea';

  var DEBUG = false;           // true -> muestra en consola qué se corrige
  /* ===================================================== */

  /* ---------- Colores / WCAG ---------- */
  function hsv2rgb(h, s, v) {
    var f = function (n) {
      var k = (n + h / 60) % 6;
      return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
    };
    return [Math.round(f(5) * 255), Math.round(f(3) * 255), Math.round(f(1) * 255)];
  }
  function rgb2hsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, h = 0;
    if (d) {
      if (max === r) h = ((g - b) / d) % 6;
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60; if (h < 0) h += 360;
    }
    return [h, max ? d / max : 0, max];
  }
  function rgb2hex(c) {
    return '#' + c.map(function (n) { return ('0' + n.toString(16)).slice(-2); }).join('');
  }
  function hex2rgb(hex) {
    hex = String(hex).replace('#', '');
    return [0, 2, 4].map(function (i) { return parseInt(hex.substr(i, 2), 16); });
  }
  function lin(c) {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }
  function luminance(rgb) {
    return 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
  }
  function contrastWith(rgb, bgL) {
    var l = luminance(rgb), hi = Math.max(l, bgL), lo = Math.min(l, bgL);
    return (hi + 0.05) / (lo + 0.05);
  }

  function effectiveBg() {
    var h = String(FORUM_BG).replace('#', '');
    var rgb = hex2rgb(h.substr(0, 6));
    var a = h.length >= 8 ? parseInt(h.substr(6, 2), 16) / 255 : 1;
    var base = hex2rgb(BACKDROP);
    return rgb.map(function (c, i) { return Math.round(c * a + base[i] * (1 - a)); });
  }
  var BG_RGB = effectiveBg();
  var BG_L = luminance(BG_RGB);

  function isVivid(s, v) { return s > MAX_SATURATION + 0.005 && v > VIVID_MIN_VALUE; }
  function passesHSV(h, s, v) {
    return !isVivid(s, v) && contrastWith(hsv2rgb(h, s, v), BG_L) >= MIN_RATIO;
  }

  function nearestAccessible(h, s, v) {
    var d, i, c, cand;
    for (d = 0; d <= 1.0001; d += 0.005) {
      cand = [Math.min(1, v + d), Math.max(0, v - d)];
      for (i = 0; i < 2; i++) {
        c = cand[i];
        if (passesHSV(h, s, c)) return [h, s, c];
      }
    }
    for (d = 0; d <= 1.0001; d += 0.02) {
      var ss = Math.max(0, s - d);
      if (passesHSV(h, ss, 1)) return [h, ss, 1];
      if (passesHSV(h, ss, 0)) return [h, ss, 0];
    }
    return [h, 0, 1];
  }

  /* ---------- Lectura del color computado del navegador ---------- */
  var RGB_RE = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,\/]+([\d.]+%?))?\s*\)$/i;

  // Devuelve [r,g,b] (con la transparencia mezclada sobre el fondo) o null si no se puede leer
  function parseComputed(str) {
    var m = RGB_RE.exec(String(str).trim());
    if (!m) return null;
    var rgb = [Math.round(+m[1]), Math.round(+m[2]), Math.round(+m[3])];
    var a = 1;
    if (m[4] !== undefined) a = /%$/.test(m[4]) ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    if (a <= 0) return null;                       // transparente: no se toca
    if (a < 1) rgb = rgb.map(function (c, i) { return Math.round(c * a + BG_RGB[i] * (1 - a)); });
    return rgb;
  }

  // Caché: color original -> color corregido (o null si ya cumple)
  var cache = {};
  function fixedFor(rgb) {
    var key = rgb.join(',');
    if (key in cache) return cache[key];
    var res = null;
    var hsv = rgb2hsv(rgb[0], rgb[1], rgb[2]);
    if (!passesHSV(hsv[0], hsv[1], hsv[2])) {
      var s = hsv[1];
      if (isVivid(s, hsv[2])) s = MAX_SATURATION;   // primero se suaviza el color vivo
      res = rgb2hex(hsv2rgb.apply(null, nearestAccessible(hsv[0], s, hsv[2])));
    }
    cache[key] = res;
    return res;
  }

  /* ---------- Procesado del DOM ---------- */
  var done = typeof WeakSet === 'function' ? new WeakSet() : null;
  var CANDIDATES = '[style*="color"], font[color]';

  function processElement(el) {
    if (done) { if (done.has(el)) return; done.add(el); }
    if (el.closest(EXCLUDE)) return;
    if (!el.closest(SCOPE)) return;

    // Sólo elementos con color propio explícito (inline o <font color>)
    var hasInline = el.style && el.style.color;
    var hasFont = el.tagName === 'FONT' && el.getAttribute('color');
    if (!hasInline && !hasFont) return;

    var rgb = parseComputed(window.getComputedStyle(el).color);
    if (!rgb) return;

    var fix = fixedFor(rgb);
    if (!fix) return;

    if (DEBUG && window.console) console.log('[WCAG] ' + rgb2hex(rgb) + ' -> ' + fix, el);
    el.setAttribute('data-awc-orig', rgb2hex(rgb));
    el.style.setProperty('color', fix, 'important');
  }

  function processTree(root) {
    if (!root || root.nodeType !== 1) return;
    if (root.matches && root.matches(CANDIDATES)) processElement(root);
    var list = root.querySelectorAll ? root.querySelectorAll(CANDIDATES) : [];
    for (var i = 0; i < list.length; i++) processElement(list[i]);
  }

  /* ---------- Arranque + contenido dinámico ---------- */
  var pending = [], scheduled = false;
  function flush() {
    scheduled = false;
    var nodes = pending; pending = [];
    for (var i = 0; i < nodes.length; i++) processTree(nodes[i]);
  }
  function queue(node) {
    pending.push(node);
    if (!scheduled) {
      scheduled = true;
      (window.requestAnimationFrame || setTimeout)(flush);
    }
  }

  function start() {
    processTree(document.body);
    // El observador sólo vigila nodos añadidos; nuestros cambios de estilo (atributos) no lo disparan.
    new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var added = muts[i].addedNodes;
        for (var j = 0; j < added.length; j++) if (added[j].nodeType === 1) queue(added[j]);
      }
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();

// FOROS RASTREADOS (lo usan el editor de fecha y el thread tracker)
window.TT_FOROS = {
    // Nombres tal cual salen en el tracker
    nombres: [
        "Para trackear",
        "Una esquirla de hielo"
    ],
    // Opcional: IDs de esos foros (el número de /f1-..., /post?f=1). Sirven de respaldo
    // si el editor no logra leer el nombre del foro.
    ids: [4]
};

// EDITOR - FECHA FICTICIA EN EL TÍTULO
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form[name="post"]');
    const subject = document.querySelector('input[name="subject"]');
    const desc = document.querySelector('input[name="description"]');
    if (!form || !subject || !desc) return;
    if (document.getElementById("ficFecha")) return;

    const CFG = window.TT_FOROS || { nombres: [], ids: [] };
    const nombres = (CFG.nombres || []).map(n => n.trim().toLowerCase());
    const ids = (CFG.ids || []).map(String);

    function foroRastreado() {
        const hidden = form.querySelector('input[name="f"]');
        const id = (new URLSearchParams(location.search).get("f")) || (hidden && hidden.value) || "";
        if (id && ids.indexOf(String(id)) !== -1) return true;

        const sel = id
            ? 'a[href^="/f' + id + '-"], a[href="/f' + id + '"]'
            : 'a[href^="/f"]';
        return Array.from(document.querySelectorAll(sel)).some(a =>
            nombres.indexOf(a.textContent.trim().toLowerCase()) !== -1);
    }

    const RE = /\s*\{f:(\d+)-(\d+)-(\d+)\}\s*/i;

    if (!foroRastreado()) {
        subject.value = subject.value.replace(RE, " ").trim();
        return;
    }

    const wrap = document.createElement("div");
    wrap.id = "ficFecha";
    wrap.className = "fic-fecha";
    wrap.innerHTML =
        '<label>Fecha del tema</label>' +
        '<input class="input-subtle" type="number" min="1" max="31" id="ficDia" placeholder="Día">' +
        '<input class="input-subtle" type="number" min="1" max="12" id="ficMes" placeholder="Mes">' +
        '<input class="input-subtle" type="number" min="1" id="ficAnio" placeholder="Año">';
    desc.insertAdjacentElement("afterend", wrap);

    const dia = wrap.querySelector("#ficDia");
    const mes = wrap.querySelector("#ficMes");
    const anio = wrap.querySelector("#ficAnio");

    const m = subject.value.match(RE);
    if (m) {
        dia.value = m[1]; mes.value = m[2]; anio.value = m[3];
        subject.value = subject.value.replace(RE, " ").trim();
    }

    form.addEventListener("submit", function (e) {
        const d = dia.value.trim(), mo = mes.value.trim(), a = anio.value.trim();
        const filled = [d, mo, a].filter(Boolean).length;

        subject.value = subject.value.replace(RE, " ").trim();
        if (filled === 0) return;

        const nd = parseInt(d, 10), nm = parseInt(mo, 10), na = parseInt(a, 10);
        if (filled < 3 || !(nd >= 1 && nd <= 31) || !(nm >= 1 && nm <= 12) || !(na >= 1)) {
            e.preventDefault();
            alert("Completa la fecha con día (1-31), mes (1-12) y año (número positivo), o deja los tres campos vacíos.");
            return;
        }
        subject.value = subject.value + " {f:" + nd + "-" + nm + "-" + na + "}";
    });
});

// TAGS DE TEMAS
$(function () {
    var threadTags = [
        {
            filter: 'autoconclusivo',
            color: '#3774ad',
            icon: '<em class="fa-solid fa-feather"></em>',
        },
        {
            filter: 'baúl',
            color: '#ad3737',
            icon: '<em class="fa-solid fa-suitcase"></em>',
        },
    ];

    var threadTagClass = 'threadtag';
    var threadTagElement = 'span';
    var undeclaredTagColor = '#655670';

    var isDateTag = function (tag) {
        return /^f:\d+-\d+-\d+$/i.test(tag);
    };

    $('.module-title, .post-title, .title-thread, a.topictitle').each(function () {
        var $element =$(this);
        var tagsFound = [];
        var string = $element.text();

        // Extraer todo lo entre llaves
        var tags = string.toLowerCase().match(/[^{]+(?=\})/g);
        var titleOnly = string.replace(/\{.*?\}/g, '').trim();

        if (tags) {
            $.each(tags, function (index, tag) {
                if (isDateTag(tag)) return;

                var foundTag = false;

                $.each(threadTags, function (index, threadTag) {
                    if (tag === threadTag.filter) {
                        tagsFound.push(
                            '<' + threadTagElement + ' class="' + threadTagClass +
                            '" data-filter="' + threadTag.filter +
                            '" style="--accent:' + threadTag.color + '">' +
                            threadTag.icon + threadTag.filter +
                            '</' + threadTagElement + '>'
                        );
                        foundTag = true;
                    }
                });

                if (!foundTag) {
                    tagsFound.push(
                        '<' + threadTagElement + ' class="' + threadTagClass +
                        '" data-filter="' + tag +
                        '" style="--accent:' + undeclaredTagColor + '">' +
                        tag +
                        '</' + threadTagElement + '>'
                    );
                }
            });
        }

        var tagsString = tagsFound.join('');

        if (tagsFound.length > 0 || /\{f:\d+-\d+-\d+\}/i.test(string)) {
            $element.html(tagsString +$('<div>').text(titleOnly).html());
        }

        if ($element.hasClass('title-thread')) {$('title').text(titleOnly);
        }
    });

    $('.forum.type-table-forum .forum-section .forum-lastpost-inner>a:first-child').each(function () {
        var $element =$(this);
        var string = $element.attr('title');

        if (string && /\{.*?\}/.test(string)) {
            string = string.replace(/\{.*?\}/g, '').trim();
            $element.text(string).attr('title', string);
        }
    });

    $('form[action="/post"]').find('.threadSubject').each(function () {
        var $threadSubject =$(this);
        var subjectText = $threadSubject.val().trim();

        var formHTML = '<form id="tagForm"><div>';

        $.each(threadTags, function (index, threadTag) {
            var idTag = threadTag.filter.replace(/\s/g, '');

            var checkboxHTML =
                '<input type="checkbox" name="tags" id="tag-' + idTag + '" value="' + threadTag.filter + '">' +
                '<label for="tag-' + idTag + '"><' + threadTagElement + ' class="' + threadTagClass +
                '" data-filter="' + threadTag.filter + '" style="--accent:' + threadTag.color + '">' +
                threadTag.icon + threadTag.filter + '</' + threadTagElement + '></label>';

            formHTML += checkboxHTML;
        });

        formHTML += '</div><br/><button id="addTagsBtn" class="btn btn-flat" type="button">Modificar título de tema</button></form>';

        $threadSubject.before(formHTML);

        threadTags.forEach(function (tag) {
            if (subjectText.toLowerCase().includes(tag.filter.toLowerCase())) {
                $('#tagForm')
                    .find('input[name="tags"][value="' + tag.filter + '"]')
                    .prop('checked', true);
            }
        });
    });

    $('#tagForm').on('click', '#addTagsBtn', function (e) {
        e.preventDefault();

        var selectedTags = $(this)
            .closest('#tagForm')
            .find('input[name="tags"]:checked')
            .map(function () {
                return '{' + $(this).val() + '}';
            })
            .get();

        var threadSubjectInput = $('form[action="/post"]').find('.threadSubject');
        var inputValue = threadSubjectInput.val();

        // Conservar la fecha si existe antes de limpiar las llaves
        var fechaMatch = inputValue.match(/\{f:\d+-\d+-\d+\}/i);
        var fechaStr = fechaMatch ? ' ' + fechaMatch[0] : '';

        // Eliminar las tags antiguas sin borrar el texto limpio
        var cleanTitle = inputValue.replace(/\{.*?\}/g, '').trim();

        var updatedSubject = selectedTags.join(' ') + ' ' + cleanTitle + fechaStr;
        threadSubjectInput.val(updatedSubject.trim());
    });
});

// THREAD TRACKER (Renderizado e inserción instantánea)
const MAX_PAGINAS = 5;  // máximo de páginas a recorrer por usuario
const POSTS_POR_PAGINA = 10;
const DELAY_PETICION = 250; // Latencia mínima entre peticiones
const CLASES_CERRADO = ['folder_locked', 'folder_locked_new'];
const CLASES_EXCLUIR = [
    'folder_global', 'folder_global_new',
    'folder_announce', 'folder_announce_new',
    'folder_sticky', 'folder_sticky_new'
];

const INCLUIR_FOROS = (window.TT_FOROS && window.TT_FOROS.nombres) || [
    "Para trackear",
    "Una esquirla de hielo"
];

const SELECTOR_USERNAME = '.ps-name';
const SELECTOR_CONTENEDOR_TRACKER = '#thread-tracker';

const esperar = ms => new Promise(r => setTimeout(r, ms));

function esPerfilSencillo() {
    return /^\/u\d+/.test(location.pathname);
}

function construirUrlPaginadaSta(userId, pagina) {
    if (pagina === 0) return `/sta/u${userId}`;
    return `/sta/u${userId}/${pagina * POSTS_POR_PAGINA}`;
}

function extraerFecha(titulo) {
    const m = titulo.match(/\{f:(\d+)-(\d+)-(\d+)\}/i);
    if (!m) return null;
    return {
        dia: parseInt(m[1], 10),
        mes: parseInt(m[2], 10),
        anio: parseInt(m[3], 10)
    };
}

function crearContenedorBase() {
    const destino = document.querySelector(SELECTOR_CONTENEDOR_TRACKER);
    if (!destino) return null;

    const contenedor = document.createElement('div');
    contenedor.className = 'thread-tracker-container';
    contenedor.innerHTML = `
    <div class="thread-tracker__open">
      <div class="thread-tracker-header"><h4>Temas abiertos</h4></div>
      <div class="thread-tracker-body"></div>
    </div>
    <div class="thread-tracker__closed">
      <div class="thread-tracker-header"><h4>Temas cerrados</h4></div>
      <div class="thread-tracker-body"></div>
    </div>
  `;
    destino.appendChild(contenedor);
    return contenedor;
}

function crearBloqueTema({ titulo, url, foro, lastPoster, lastTime, fecha }) {
    const tituloLimpio = titulo.replace(/\{.*?\}\s*/g, '').trim();
    const lastTimeLimpio = lastTime.replace(/^,\s*/, '');
    const fechaHtml = fecha ? `<span class="tt-date">Día ${fecha.dia}</span>` : '';

    const div = document.createElement('div');
    div.className = 'thread-tracker';
    if (fecha) div.dataset.dia = fecha.dia;
    div.innerHTML = `
    <a href="${url}">${tituloLimpio}</a>
    <div class="tt-information">
      ${fechaHtml}
      <span class="tt-where">${foro}</span>
      <div class="tt-last">
        <span class="tt-last-poster">${lastPoster}</span> -
        <span class="tt-last-time">${lastTimeLimpio}</span>
      </div>
    </div>
  `;
    return div;
}

// Obtiene o crea directamente en el DOM el grupo de Mes/Año adecuado de forma ordenada
function obtenerOCrearGrupo(cuerpo, fecha) {
    const clave = fecha ? `${fecha.anio}-${fecha.mes}` : 'sin-fecha';
    let grupo = cuerpo.querySelector(`.tt-group[data-clave="${clave}"]`);

    if (!grupo) {
        grupo = document.createElement('div');
        grupo.className = 'tt-group';
        grupo.dataset.clave = clave;
        grupo.dataset.anio = fecha ? fecha.anio : 999999;
        grupo.dataset.mes = fecha ? fecha.mes : 999999;

        if (clave === 'sin-fecha') grupo.classList.add('tt-group--sin-fecha');

        const titulo = document.createElement('h5');
        titulo.className = 'tt-group-title';
		titulo.innerHTML = clave === 'sin-fecha'
            ? 'Sin fecha'
            : `Mes ${fecha.mes}&nbsp;·&nbsp;Año ${fecha.anio}`;

        const body = document.createElement('div');
        body.className = 'tt-group-body';

        grupo.append(titulo, body);

        // Insertar ordenado cronológicamente entre los grupos existentes
        const gruposExistentes = Array.from(cuerpo.querySelectorAll('.tt-group'));
		const grupoSiguiente = gruposExistentes.find(g => {
			const gAnio = parseInt(g.dataset.anio, 10);
			const gMes = parseInt(g.dataset.mes, 10);
			const targetAnio = fecha ? fecha.anio : -1;
			const targetMes = fecha ? fecha.mes : -1;

			// Los más recientes (mayores) van primero
			return (gAnio < targetAnio) || (gAnio === targetAnio && gMes < targetMes);
		});

        if (grupoSiguiente) {
            cuerpo.insertBefore(grupo, grupoSiguiente);
        } else {
            cuerpo.appendChild(grupo);
        }
    }

    return grupo.querySelector('.tt-group-body');
}

// Inserta el tema dentro de su grupo manteniendo el orden por día
function insertarTemaEnGrupo(grupoBody, temaBloque, fecha) {
    if (!fecha) {
        grupoBody.appendChild(temaBloque);
        return;
    }

    const temasExistentes = Array.from(grupoBody.querySelectorAll('.thread-tracker'));
	const temaSiguiente = temasExistentes.find(t => {
		const dia = parseInt(t.dataset.dia || -1, 10);
		return dia < fecha.dia;
	});

    if (temaSiguiente) {
        grupoBody.insertBefore(temaBloque, temaSiguiente);
    } else {
        grupoBody.appendChild(temaBloque);
    }
}

async function procesarPaginaSta(url, userId, temasAgregados, contenedor) {
    let html;
    try {
        html = await fetch(url).then(r => r.text());
    } catch {
        return false;
    }

    const doc = new DOMParser().parseFromString(html, 'text/html');
    const temas = doc.querySelectorAll('.block-content .block-topics-icon');
    if (!temas.length) return false;

    const openBody = contenedor.querySelector('.thread-tracker__open .thread-tracker-body');
    const closedBody = contenedor.querySelector('.thread-tracker__closed .thread-tracker-body');

    for (const icono of temas) {
        const tieneClaseExcluir = CLASES_EXCLUIR.some(c => icono.classList.contains(c));
        if (tieneClaseExcluir) continue;

        const temaContainer = icono.closest('.block-content');
        if (!temaContainer) continue;

        const foroEl = temaContainer.querySelector('a.block-topics-category');
        const foro = foroEl ? foroEl.textContent.trim() : '';
        if (INCLUIR_FOROS.length && !INCLUIR_FOROS.includes(foro)) continue;

        const tituloEl = temaContainer.querySelector('a.topictitle');
        if (!tituloEl) continue;
        const href = tituloEl.getAttribute('href');
        const matchId = href.match(/^\/t(\d+)-/);
        if (!matchId) continue;
        const temaId = matchId[1];

        if (temasAgregados.has(temaId)) continue;
        temasAgregados.add(temaId);

        const cerrado = CLASES_CERRADO.some(c => icono.classList.contains(c));
        const lastPoster = temaContainer.querySelector('.block-topics-lastpost strong')?.textContent.trim() || '';

        const lastPostEl = temaContainer.querySelector('.block-topics-lastpost');
        let lastTime = '';
        if (lastPostEl) {
            const clones = lastPostEl.cloneNode(true);
            clones.querySelectorAll('strong, a').forEach(el => el.remove());
            lastTime = clones.textContent.trim();
        }

        const titulo = tituloEl.textContent.trim();
        const fecha = extraerFecha(titulo);

        const item = { titulo, url: href, foro, lastPoster, lastTime, fecha };
        const targetCuerpo = cerrado ? closedBody : openBody;

        // Inserción directa e instantánea organizada por fecha
        const grupoBody = obtenerOCrearGrupo(targetCuerpo, fecha);
        const temaBloque = crearBloqueTema(item);
        insertarTemaEnGrupo(grupoBody, temaBloque, fecha);
    }

    await esperar(DELAY_PETICION);
    return true;
}

async function procesarUsuario(userId, contenedor) {
    const temasAgregados = new Set();

    for (let p = 0; p < MAX_PAGINAS; p++) {
        const url = construirUrlPaginadaSta(userId, p);
        const ok = await procesarPaginaSta(url, userId, temasAgregados, contenedor);
        if (!ok) break;
    }

    // Mensajes de vacío si tras escanear no hay temas
    const openBody = contenedor.querySelector('.thread-tracker__open .thread-tracker-body');
    const closedBody = contenedor.querySelector('.thread-tracker__closed .thread-tracker-body');

    if (!openBody.children.length) {
        openBody.innerHTML = '<p class="tt-no-open">Quedan historias por contar...</p>';
    }
    if (!closedBody.children.length) {
        closedBody.innerHTML = '<p class="tt-no-closed">… no se ha cerrado ningún capítulo</p>';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    if (!esPerfilSencillo()) return;

    const usernameEl = document.querySelector(SELECTOR_USERNAME);
    if (!usernameEl) return;

    const match = location.pathname.match(/^\/u(\d+)/);
    if (!match) return;
    const userId = match[1];

    const contenedor = crearContenedorBase();
    if (!contenedor) return;

    await procesarUsuario(userId, contenedor);
});

$(document).ready(function() {
    // Desde los tutoriales Desde 0 de Necro
    // Transferir links de "Descripción" (General > Foros > Categorías y foros) al foro en el índice
    $('.flinks').each(function() {
        const flinks = $(this).html();
        $(this).closest('.forum-section').find('.forum-links').append(flinks);
        $(this).remove();
    });
  
    // Transferir descripción de "Descripción" (General > Foros > Categorías y foros) al foro en el índice
    $('.fdesc').each(function() {
        const fdesc = $(this).html();
        $(this).closest('.forum-section').find('.forum-desc').append(fdesc);      
        $(this).closest('#page-desc').find('.page-desc-content div').append(fdesc);
        $(this).remove();
    });

    // Transferir imágenes de "Dirección de la imagen" al foro en el índice
    $('.forum-desc > img').each(function() {
        $(this).closest('.forum-section').find('.forum-img').append($(this));
    });

    // Manejar la ausencia de últimos mensajes
    $('.forum-lastpost-inner a').each(function() {
        if ($.trim($(this).html()) === '') {
            $(this).closest('.forum-lastpost-inner')
                .addClass('forum-nolast')
                .text('No hay mensajes');
        }
    });

    // Eliminar <br> dentro de .forum-hover
    $('.forum-hover br').remove();

    // Eliminar <p> vacío dentro de .forum-hover
    $('.forum-hover p').each(function() {
        if ($.trim($(this).html()) === '') {
            $(this).remove();
        }
    });
    
    // Eliminar .forum-links si está vacío
    $('.forum-links').each(function() {
        if ($.trim($(this).html()) === '') {
            $(this).remove();
        }
    });
});

//NECRO - LEYENDA DE GRUPO AUTOMÁTICA
$(document).ready(function() {
  $('.groups a').each(function() {
    var color = $(this).css('color');
    var name = $(this).text();
    var clase = name.replace(/\s/g, '').toLowerCase().replace(/'/g, "").replace(/\(|\)/g, "").slice(0, 10);
    
    // Agregar estilo en línea de forma correcta usando setProperty
    $(this).css('--group', color);
    
    // Reemplazar el elemento <b> por el <a> directamente sin envolverlo en el <a> como hijo de <b>
    $(this).parent('b').replaceWith(this);
    
    // Añadir la clase gr{clase} y quitar gensmall
    $(this).addClass('gr-' + clase).removeClass('gensmall');
    
    // Modificar el contenido HTML de la etiqueta <a> manteniendo el texto y añadiendo etiquetas <em> y <strong>
    $(this).html('<em></em><span><strong>' + name + '</strong><n></n></span>');
  });

  // Reestructuración de los elementos dentro de '.groups'
  $('.groups').each(function() {
    var content = $(this).children('a');
    
    // Reemplazar el HTML de .groups con el contenido de los enlaces
    $(this).html(content);
  });
});

//CONTADOR DE GRUPOS EN LA LEYENDA DEL FORO
document.addEventListener("DOMContentLoaded", function () {
  // Lista de clases de grupos excluidos de la resta
  const excludeGroups = ["gr-staff"]; // Añadir más clases si es necesario

  // Seleccionamos todos los enlaces dentro del contenedor .groups
  const groupLinks = document.querySelectorAll(".groups a");

  groupLinks.forEach((link) => {
    // Verificar si el enlace tiene un atributo title
    const title = link.getAttribute("title");
    if (title) {
      // Buscar el número después de "Miembros del Grupo :"
      const match = title.match(/Miembros del Grupo : (\d+)/);
      if (match) {
        const membersCount = parseInt(match[1], 10); // Convertir el número a entero
        let adjustedCount = membersCount;

        // Restar 1 solo si el grupo no está en la lista de exclusión
        if (!excludeGroups.some((groupClass) => link.classList.contains(groupClass))) {
          adjustedCount = membersCount - 1;
        }

        // Seleccionar el elemento <n> dentro del enlace
        const nElement = link.querySelector("n");
        if (nElement) {
          nElement.textContent = adjustedCount; // Asignar el nuevo valor
        }
      }

      // Eliminar el atributo title para evitar que se vea al hacer hover
      link.removeAttribute("title");
    }
  });
});

//AVATAR EN LAS ESTADÍSTICAS
$(document).ready(function() {
    var newestPerfil = $('.newest_user-text a').attr('href');
    $.get(newestPerfil, function(data) {
        var newestAvatar = $(data).find('.ps-ava img');
        $('.newest_user-ava').html(newestAvatar);
    });
});

//JS BÁSICO PARA LAS ESTADÍSTICAS
$(document).ready(function replaceStatisticsText (){
  var string = $('.total_users_online').text();

  var numbers = string.match(/\d+/g); // Extrae todos los números

  if (numbers) {
    numbers = numbers.map(Number); // Convierte los números en enteros

    $('.stausers>strong').html(numbers[1] || 0);
    $('.staocultos>strong').html(numbers[2] || 0);
    $('.stainvis>strong').html(numbers[3] || 0);
  }
});

jQuery(function($){
  $(".l_connected_members").html(function(_, html) {
    return html.replace(/Miembros conectados en las últimas \d+ horas?:?/i, "");
  });
});


jQuery(function($){
  $(".logged_in_user_list").html(function() { 
    var originalHtml = $(this).html();
    var updatedHtml = originalHtml.replace("Usuarios registrados: ", "");
    return updatedHtml;
  });
});

$(document).ready(function(){
  var removedBr = $('.logged_in_user_list br:first-child');
  removedBr.remove();
});

$(document).ready(function(){
  var matched = $('.l_connected_members a');

  var ad24 = $('.l_connected_members a[href*="/u1"], .l_connected_members a[href*="/u2"]');
  
  var us24 = matched.length - ad24.length;

  $('.st24admins').append(ad24.length);
  $('.st24users').append(us24);
});

//ENVOLVER LOS FOROS DEL ÍNDICE EN UN CONTENEDOR
document.addEventListener("DOMContentLoaded", function() {
  // Recorremos todos los foros
  document.querySelectorAll('.forum.type-table-forum').forEach(foro => {
    const header = foro.querySelector('.forum-header');
    if (!header) return;

    // Envolver .forum-section (salvo .guidebook) en .forums-container
    const seccionesNormales = foro.querySelectorAll('.forum-section:not(.guidebook)');
    if (seccionesNormales.length) {
      const contenedor = document.createElement('div');
      contenedor.classList.add('forums-container');

      // Movemos dentro todas las secciones que no son .guidebook
      seccionesNormales.forEach(sec => contenedor.appendChild(sec));

      // Localizamos el primer guidebook, si existe
      const primerGuidebook = foro.querySelector('.forum-section.guidebook');

      if (primerGuidebook) {
        // Insertamos después del guidebook
        primerGuidebook.insertAdjacentElement('afterend', contenedor);
      } else if (header.nextSibling) {
        // Insertamos después del header
        foro.insertBefore(contenedor, header.nextSibling);
      } else {
        foro.appendChild(contenedor);
      }
    }
  });
});

$(document).ready(function () {

    /* =========================
       1. Inicializar NPCs
    ========================= */
    window.initNPCs = initNPCs;   // expuesta para que el otro JS pueda relanzarla
    initNPCs();

    function initNPCs() {

        const npcData = {};

        // Recolectar datos de NPC
        $(".modo-npc").each(function () {
            const $npc = $(this);
            const clases = $npc.attr("class").split(/\s+/).filter(c => c !== "modo-npc");
            if (!clases.length) return;

            const key = clases[0];
            if (!npcData[key]) {
                const data = {
                    avatar: $npc.attr("avatar") || "",
                    nombre: $npc.attr("nombre") || "",
                    rango: $npc.attr("rango") || "",
                    ocupacion: $npc.attr("ocupacion") || "",
                    edad: $npc.attr("edad") || "",
                    icono: $npc.attr("icono") || "",
                    raza: $npc.attr("raza") || "",
                    afiliacion: $npc.attr("afiliacion") || "",
                    fuerza: $npc.attr("fuerza") || "",
                    destreza: $npc.attr("destreza") || "",
                    resistencia: $npc.attr("resistencia") || "",
                    inteligencia: $npc.attr("inteligencia") || "",
                    voluntad: $npc.attr("voluntad") || "",
                    clase: $npc.attr("clase") || "",
                    trasfondo: $npc.attr("trasfondo") || "",
                    color: $npc.attr("color") || ""
                };

                if (Object.values(data).some(v => v !== "")) {
                    npcData[key] = data;
                }
            }
        });

        // Aplicar datos a posts NPC
        $(".modo-npc").each(function () {
            const $npcDiv = $(this);

            // Contenedor: .post-wrap, o el preview, o .block-content como último recurso
            let $post = $npcDiv.closest(".post-wrap");
            if (!$post.length) $post = $npcDiv.closest("#preview");
            if (!$post.length) $post = $npcDiv.closest(".block-content");
            if (!$post.length) return;

            const clases = $npcDiv.attr("class").split(/\s+/).filter(c => c !== "modo-npc");
            if (!clases.length) return;
            const key = clases[0];
            const data = npcData[key];
            if (!data) return;

            // Campos básicos (el avatar también afecta al .pp-ava creado por el otro JS)
            if (data.avatar) $post.find(".pp-ava img").attr("src", data.avatar);
            if (data.nombre) $post.find(".pp-name strong").text(data.nombre);
            if (data.rango) $post.find(".pp-rank").text(data.rango);
            if (data.ocupacion) $post.find(".pp-ocupacion .pp-fcontent").text(data.ocupacion);
            if (data.edad) $post.find(".edad .pp-fcontent").text(data.edad);
            if (data.icono) $post.find(".pp-icon img").attr("src", data.icono);
            if (data.raza) $post.find(".raza .pp-fcontent").text(data.raza);
            if (data.afiliacion) $post.find(".afiliacin .pp-fcontent").text(data.afiliacion);

            // Estadísticas
            if (data.fuerza) $post.find(".fuerza .pp-fcontent").text(data.fuerza);
            if (data.destreza) $post.find(".destreza .pp-fcontent").text(data.destreza);
            if (data.resistencia) $post.find(".resistencia .pp-fcontent").text(data.resistencia);
            if (data.inteligencia) $post.find(".inteligencia .pp-fcontent").text(data.inteligencia);
            if (data.voluntad) $post.find(".voluntad .pp-fcontent").text(data.voluntad);

            // Clase y trasfondo
            if (data.clase) {
                const $claseElem = $post.find(".clase .pp-fcontent");
                $claseElem.removeClass(function(i, c){ return c.split(/\s+/).filter(cl => cl !== "pp-fcontent").join(" "); });
                $claseElem.addClass(data.clase).text(data.clase.charAt(0).toUpperCase() + data.clase.slice(1));
            }
            if (data.trasfondo) {
                const $trasElem = $post.find(".trasfondo .pp-fcontent");
                $trasElem.removeClass(function(i, c){ return c.split(/\s+/).filter(cl => cl !== "pp-fcontent").join(" "); });
                $trasElem.addClass(data.trasfondo).text(data.trasfondo.charAt(0).toUpperCase() + data.trasfondo.slice(1));
            }

            // Color NPC
            if (data.color === "npc") {
                const baseColor = "#6d6068";
                const opacities = { "75": "BF", "50": "80", "25": "40", "15": "26" };
                $post[0].style.setProperty("--group", baseColor);
                for (let keyOpacity in opacities) {
                    $post[0].style.setProperty(`--group-${keyOpacity}`, baseColor + opacities[keyOpacity]);
                }
                $post.find(".pp-name span").each(function(){
                    this.style.color = baseColor;
                    this.style.setProperty("--group", baseColor);
                    for (let keyOpacity in opacities) {
                        this.style.setProperty(`--group-${keyOpacity}`, baseColor + opacities[keyOpacity]);
                    }
                });
            }
        });

        /* =========================
           Limpiar <br> tras modo-npc
        ========================= */
        $(".post-content .modo-npc").each(function () {
            let node = this.nextSibling;

            while (node) {
                // Si es un <br>, eliminarlo y seguir
                if (node.nodeType === 1 && node.tagName === "BR") {
                    const toRemove = node;
                    node = node.nextSibling;
                    toRemove.remove();
                    continue;
                }

                // Si es texto o cualquier otro elemento, PARAMOS
                break;
            }
        });
    }

    /* =========================
       2. Funciones Necro / UI
    ========================= */
    // Ocultar avatar Necro
    $('.noprofile').each(function() {
        $(this).closest('.post-wrap').find('.post-aside').hide();
    });

    // Hoja de personaje desplegable
    $('.pp-rpg').click(function() {
        $(this).toggleClass('pp-rpgactive');
        $(this).closest('.post-wrap').find('.pb-rpg').slideToggle();
    });

    // Limpiar elementos vacíos y enlaces específicos
    $('.pb-rpg:empty').each(function() {
        $(this).closest('.post-wrap').find('.pp-rpg').remove();
        $(this).remove();
    });
    $('.pb-habis').each(function() {
        $(this).find('br').remove();
        $(this).html($(this).html().replace(/:/g, ''));
        $(this).find('a[href="/u1rpgsheet"]').remove();
        $(this).find('span.gen').first().remove();
    });

    // Iconos según texto
    $('.pb-habis .pp-fcontent').each(function() {
        var texto = $(this).text().trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
        if (texto) $(this).addClass(texto);
    });

    /* =========================
       3. Botón Copiar Código
    ========================= */
    $(".codebox:not(.hidecode) > code")
        .closest("div")
        .find('p')
        .append('<span class="selectCode" onclick="selectAndCopyCode(this)" style="cursor:pointer;"><i class="fa-solid fa-code"></i> Copiar todo</span>');

    window.selectAndCopyCode = function(e) {
        var textElement = $(e).closest("div").find("code")[0];
        if (!textElement) return;

        var range = document.createRange();
        range.selectNodeContents(textElement);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");

        var originalText = $(e).html();
        $(e).html('<i class="fa-solid fa-check"></i> ¡Copiado!');
        setTimeout(function(){ $(e).html(originalText); }, 2000);
        selection.removeAllRanges();
    };

});

//POPUP DE EXPEDIENTE EN LOS MINIPERFILES
document.addEventListener("DOMContentLoaded", function () {
  const enlaces = document.querySelectorAll(".pp-fexpediente");

  enlaces.forEach(function (enlace) {
    const contenedor = enlace.closest('.post-wrap, .perfilsencillo');
    if (!contenedor) return;

    const cita = contenedor.querySelector(".field.cita .pp-fcontent");
    const historia = contenedor.querySelector(".field.historia .pp-fcontent");
    const datosextra = contenedor.querySelector(".field.datosextra .pp-fcontent");

    const contenidoCita = cita?.innerHTML.trim() || "";
    const contenidoHistoria = historia?.innerHTML.trim() || "";
    const contenidoDatosExtra = datosextra?.innerHTML.trim() || "";

    if (!contenidoCita && !contenidoHistoria && !contenidoDatosExtra) {
      enlace.style.display = "none";
      return;
    }

    let popup = contenedor.querySelector(".popup-expediente-overlay");
    if (!popup) return;

    // Mover el popup al body si aún no está allí
    if (popup.parentElement !== document.body) {
      document.body.appendChild(popup);
    }

    // Evento para cerrar el popup haciendo click fuera
    popup.addEventListener("click", function (e) {
      if (e.target === popup) {
        popup.style.display = "none";
      }
    });

    // Evento para abrir el popup con contenido
    enlace.addEventListener("click", function (e) {
      e.preventDefault();

      popup.querySelector(".popup-cita").innerHTML = '';
      popup.querySelector(".popup-historia").innerHTML = '';
      popup.querySelector(".popup-datosextra").innerHTML = '';

      if (contenidoCita) popup.querySelector(".popup-cita").innerHTML = contenidoCita;
      if (contenidoHistoria) popup.querySelector(".popup-historia").innerHTML = contenidoHistoria;
      if (contenidoDatosExtra) popup.querySelector(".popup-datosextra").innerHTML = contenidoDatosExtra;
		
	   // ???? COPIAR COLOR DE GRUPO
	  const styleOrigen = contenedor.getAttribute("style");
	  if (styleOrigen) {
		popup.setAttribute("style", styleOrigen);
	  }

      popup.style.display = "flex";
    });
  });
});

// BARRA DE PROGRESO DE NIVEL
(function () {
  var MAX_POR_NIVEL = {
    1:  100,
    2:  150,
    3:  200,
    4:  250,
    5:  300,
    6:  350,
    7:  400,
    8:  450,
    9:  500,
    10: 600
  };

  var MAX_POR_DEFECTO = 500;

  var SEL_PUNTOS = '.ps-puntos';
  var SEL_NIVEL  = '.ps-nivel';

  var OCULTAR_NIVEL_ORIGINAL = false;

  /* A partir de aquí no hace falta tocar nada */

  var SEL_CARD = '.ps-nivel__card';

  function leerNumero(campo) {
    if (!campo) return null;
    var celda = campo.querySelector('.field_uneditable');
    if (!celda) return null;
    var n = parseInt(celda.textContent.replace(/\D/g, ''), 10);
    return isNaN(n) ? null : n;
  }

  function buscarCampo(tarjeta, selector) {
    var nodo = tarjeta.parentElement;
    while (nodo && nodo !== document.body) {
      if (nodo.querySelectorAll(SEL_CARD).length > 1) return null;
      var campo = nodo.querySelector(selector);
      if (campo) return campo;
      nodo = nodo.parentElement;
    }
    return null;
  }

  function poner(tarjeta, clave, valor) {
    var el = tarjeta.querySelector('[data-lvl="' + clave + '"]');
    if (el) el.textContent = valor;
  }

  function rellenar(tarjeta) {
    if (tarjeta.getAttribute('data-lvl-listo')) return;
    tarjeta.setAttribute('data-lvl-listo', '1');

    var campoPuntos = buscarCampo(tarjeta, SEL_PUNTOS);
    var campoNivel  = buscarCampo(tarjeta, SEL_NIVEL);

    var puntos = leerNumero(campoPuntos) || 0;
    var nivel  = leerNumero(campoNivel) || 1;
    var maximo = MAX_POR_NIVEL[nivel] || MAX_POR_DEFECTO;

    // La barra se detiene en el 100 %, pero los puntos siguen sumando.
    var ancho = Math.min(100, Math.round((puntos / maximo) * 100));

    poner(tarjeta, 'nivel', nivel);
    poner(tarjeta, 'puntos', puntos);
    poner(tarjeta, 'max', maximo);

    var barra = tarjeta.querySelector('.ps-nivel__bar');
    if (barra) {
      barra.setAttribute('aria-valuemax', maximo);
      barra.setAttribute('aria-valuenow', Math.min(puntos, maximo));
    }

    if (OCULTAR_NIVEL_ORIGINAL && campoNivel) campoNivel.style.display = 'none';

    var relleno = tarjeta.querySelector('.ps-nivel__fill');
    if (relleno) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { relleno.style.width = ancho + '%'; });
      });
    }
  }

  function iniciar() {
    var tarjetas = document.querySelectorAll(SEL_CARD);
    for (var i = 0; i < tarjetas.length; i++) rellenar(tarjetas[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();

//APODO EN EL PERFIL SENCILLO
document.addEventListener('DOMContentLoaded', function () {
    const apodoField = document.querySelector('.ps-apodo .field_uneditable');
    const historiaTitle = document.querySelector('.ps-historia-title h1');

    if (!historiaTitle) return;

    historiaTitle.textContent = 'Y así comienza la historia';

    // Si el campo no existe → lo tratamos como vacío
    if (!apodoField) {
        historiaTitle.textContent += '...';
        return;
    }

    const apodoText = apodoField.textContent.trim();

    if (!apodoText || apodoText === '-') {
        historiaTitle.textContent += '...';
    } else {
        const span = document.createElement('span');
        span.textContent = `${apodoText}...`;

        historiaTitle.textContent += ' de ';
        historiaTitle.appendChild(span);
    }
});

//MOVER CAMPOS DE PERFIL EN EL PERFIL SENCILLO
$(document).ready(function () {
    $('.ps-contact-fields').each(function () {
        $(this).parents('.perfilsencillo').find('.ps-contact').append(this);
    });
    
    $('#rpg-armamento').each(function () {
        $(this).parents('.perfilsencillo').find('.ps-armamento').append(this);
    });
    
    $('#rpg-inventario').each(function () {
        $(this).parents('.perfilsencillo').find('.ps-inventario').append(this);
    });
    
    // 1. Eliminar .ps-field cuyo contenido sea "-"
    $('.ps-field').each(function () {
        var fieldContent = $(this).find('.field_uneditable').html();

        if (fieldContent) {
            var cleanContent = fieldContent.replace(/ /g, '').trim();
            if (cleanContent === '-') {
                $(this).remove();
            }
        }
    });

    // 2. Eliminar .ps-contact-fields que hayan quedado completamente vacíos
    $('.ps-contact-fields').each(function () {
        if (!$.trim($(this).html())) {
            $(this).remove();
        }
    });

});

//BORRAR BOTÓN DE BAÚL SI ESTÁ VACÍO
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ps-user-links dl').forEach(dl => {
    const dd = dl.querySelector('dd');
    if (!dd) return;

    // Texto limpio (sin espacios raros)
    const texto = dd.textContent.replace(/\s|\u00A0/g, '');

    // Caso 1: vacío real o solo nbsp
    const vacio = texto === '';

    // Caso 2: contiene solo "-"
    const soloGuion = texto === '-';

    // Caso 3: no hay enlaces útiles dentro
    const tieneLink = dd.querySelector('a');

    if ((vacio || soloGuion) && !tieneLink) {
      dl.remove();
    }
  });
});

//CONVERTIR ALGUNOS CAMPOS DEL PERFIL EN CLASES EN EL PERFIL SENCILLO
document.addEventListener("DOMContentLoaded", function () {
    // Define las nuevas clases objetivo
    const targetClasses = ["clase", "trasfondo", "traumadeestrs"];

    // Selecciona los campos que tienen esas clases específicas
    const profileFields = Array.from(document.querySelectorAll(".ps-field"))
        .filter(field => targetClasses.some(cls => field.classList.contains(cls)));

    profileFields.forEach(field => {
        // Obtener el texto dentro de .field_uneditable para identificar el contenido del campo
        const textContent = field.querySelector(".field_uneditable")
            ? field.querySelector(".field_uneditable").textContent.trim()
            : "";

        if (textContent) {
            // Convertir el texto en una clase válida (sin espacios y con guiones)
            const classValue = textContent.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "");

            // Asegurarse de que la clase generada no se repita
            if (!field.classList.contains(classValue)) {
                field.classList.add(classValue);
            }

            // Agregar atributo `title` según la clase
            if (field.classList.contains("clase")) {
                const claseIcon = document.querySelector(".ps-clase-icon");
                if (claseIcon) {
                    claseIcon.setAttribute("title", textContent);
                }
            }

            if (field.classList.contains("trasfondo")) {
                const trasfondoIcon = document.querySelector(".ps-trasfondo-icon");
                if (trasfondoIcon) {
                    trasfondoIcon.setAttribute("title", textContent);
                }
            }
        }
    });
});


//BBCODES
$(document).ready(function () {

    // Nombre de etiqueta -> HTML. "ocupación" y "ocupacion" valen igual.
    var HEADER_TAG = '(?:nombre|edad|ocupaci[oó]n)';

    function parseFakeBBCodes(container) {
        container.html(function (_, html) {
            return html
                // HEADER: agrupa nombre/edad/ocupación consecutivos (cualquier orden)
                .replace(
                    new RegExp(
                        '((?:\\s|<br\\s*/?>)*\\[' + HEADER_TAG + '\\][\\s\\S]*?\\[/' + HEADER_TAG + '\\])' +
                        '(?:(?:\\s|<br\\s*/?>)*\\[' + HEADER_TAG + '\\][\\s\\S]*?\\[/' + HEADER_TAG + '\\])*',
                        'gi'
                    ),
                    function (block) {
                        return '<div class="bb-header">' + block.replace(/^(?:\s|<br\s*\/?>)+/i, '') + '</div>';
                    }
                )

                // NPC
                .replace(/\[npc\]([\s\S]*?)\[\/npc\]/gi,
                    '<div class="bb-npc">$1</div>')

                // INFO
                .replace(/\[info\]([\s\S]*?)\[\/info\]/gi,
                    '<div class="bb-info">$1</div>')

                // NOMBRE
                .replace(/\[nombre\]([\s\S]*?)\[\/nombre\]/gi,
                    '<div class="bb-nombre"><h4>$1</h4></div>')

                // EDAD
                .replace(/\[edad\]([\s\S]*?)\[\/edad\]/gi,
                    '<div class="bb-edad">$1</div>')

                // OCUPACIÓN (con o sin tilde)
                .replace(/\[ocupaci[oó]n\]([\s\S]*?)\[\/ocupaci[oó]n\]/gi,
                    '<div class="bb-ocupacion">$1</div>')

                // DESC
                .replace(/\[desc\]([\s\S]*?)\[\/desc\]/gi,
                    '<div class="bb-desc">$1</div>');
        });

        // Elimina los <br> automáticos que el foro genera dentro de estos bloques
        container.find('.bb-desc br, .bb-header br').remove();
    }

    // Aplicar a todos los campos de perfil
    $('.ps-field').each(function () {
        parseFakeBBCodes($(this));
    });

});

//MEDALLERO VACÍO + INVENTARIO VACÍO
window.addEventListener('DOMContentLoaded', () => {
    const contenedores = document.querySelectorAll('.ps-medallero, .ps-armamento, .ps-inventario');

    contenedores.forEach(contenedor => {
        let vacio = false;

        if (contenedor.classList.contains('ps-medallero')) {
            // Medallero: vacío si no hay div.award
            vacio = contenedor.querySelectorAll('div.award').length === 0;
        } else {
            // Armamento e inventario: vacío si no hay item
            vacio = contenedor.querySelectorAll('item').length === 0;
        }

        if (vacio) {
            const aviso = document.createElement('span');
            aviso.className = 'aviso';
           
            // Texto distinto para medallero
            aviso.innerHTML = contenedor.classList.contains('ps-medallero')
                ? 'Por las aventuras que nos quedan por vivir.'
                : 'Aquí no hay nada...&nbsp;<i>aún</i>.';
           
            contenedor.appendChild(aviso);
        }
    });
});

// ==========================
// EDITAR PERFIL
// ==========================
$(function() {
    // Asignar clases únicas a headers y labels
    $('#ucp .block-header').each(function() {
        var datafield = $(this).text().replace(/ /g, "").toLowerCase()
            .replace(/'/g, "").replace(/\(|\)/g, "")
            .replace(/[^a-z0-9\s]/gi, "").substring(0,30);
        $(this).next('.block-content').addClass('ucp-' + datafield);
    });

    $('#ucp .block-content label').each(function() {
        var datafield = $(this).find('span').first().text().replace(/ /g, "").toLowerCase()
            .replace(/'/g, "").replace(/\(|\)/g, "")
            .replace(/[^a-z0-9\s]/gi, "").substring(0,30);
        $(this).addClass('ucp-' + datafield);
    });

    $('#ucp .block-content .radio-wrap').each(function() {
        var datafield = $(this).find('label').text().replace(/ /g, "").toLowerCase()
            .replace(/'/g, "").replace(/\(|\)/g, "")
            .replace(/[^a-z0-9\s]/gi, "").substring(0,30);
        $(this).addClass('ucp-' + datafield);
    });

    // Eliminar campos no deseados
    $('.ucp-gnero, .ucp-nacimiento, .ucp-facebook, .ucp-xtwitter, .ucp-pinterest, .ucp-skype, .ucp-ocultartupresenciaenlneasno').remove();
    $('#tabs li a[href^="/rpg_sheet_edit?u="]').parent('li').remove();
});

document.addEventListener("DOMContentLoaded", function () {
    // Configuración: bloques a crear y labels que contienen
    const blocksConfig = [      
        {
            headerClass: "ucp-zonadeimagenes",
            headerContent: "Zona de Imágenes",
            labels: [".ucp-icono", ".ucp-portada", ".ucp-moodboarduno", ".ucp-moodboarddos", ".ucp-moodboardtres", ".ucp-moodboardcuatro"]
        },
        {
            headerClass: "ucp-datosdelpersonaje",
            headerContent: "Datos del Personaje",
            labels: [".ucp-apodo", ".ucp-fechadenacimiento", ".ucp-ocupacin", ".ucp-afiliacin", ".ucp-origen", ".ucp-residencia", ".ucp-rasgosdistintivos", ".ucp-fe", ".ucp-altura"]
        },
        {
            headerClass: "ucp-zonadeexpediente",
            headerContent: "Zona de Expediente",
            labels: [".ucp-cita", ".ucp-historia", ".ucp-datosextra", ".ucp-cronologa"]
        },
        {
            headerClass: "ucp-zonadeestadisticas",
            headerContent: "Zona de Estadísticas",
            labels: [".ucp-nivel", ".ucp-clase", ".ucp-trasfondo", ".ucp-pv", ".ucp-fuerza", ".ucp-destreza", ".ucp-resistencia", ".ucp-inteligencia", ".ucp-voluntad", ".ucp-habilidades"]
        },
        {
            headerClass: "ucp-zonadeequipamiento",
            headerContent: "Zona de Equipamiento",
            labels: [".ucp-armadura", ".ucp-manoizquierda", ".ucp-manoderecha", ".ucp-accesoriouno", ".ucp-accesoriodos", ".ucp-cachivacheuno", ".ucp-cachivachedos", ".ucp-cachivachetres"]
        },
        {
            headerClass: "ucp-zonadeinventario",
            headerContent: "Zona de Armamento e Inventario",
            labels: [".ucp-armamento", ".ucp-inventario"]
        },
        {
            headerClass: "ucp-zonadenpcs",
            headerContent: "Zona de NPCs y Casa",
            labels: [".ucp-nombredelacasa", ".ucp-lemadelacasa", ".ucp-lderdelacasa", ".ucp-asentamientodelacasa", ".ucp-citadelacasa", ".ucp-emblemadelacasa", ".ucp-descripcindelacasa", ".ucp-npcs"]
        }
    ];

    // Seleccionar contenedor principal
    const cpInner = document.querySelector(".cp-inner");

    if (cpInner) {
        const perfilPersonalizadoBlock = Array.from(cpInner.querySelectorAll(".block")).find(block =>
            block.querySelector(".block-header")?.textContent.trim() === "Perfil personalizado"
        );

        if (perfilPersonalizadoBlock) {
            let lastInsertedBlock = perfilPersonalizadoBlock;

            blocksConfig.forEach(({ headerClass, headerContent, labels }) => {
                const newBlock = document.createElement("div");
                newBlock.classList.add("block");

                const blockHeader = document.createElement("div");
                blockHeader.classList.add("block-header", headerClass);
                blockHeader.textContent = headerContent;

                const blockContent = document.createElement("div");
                blockContent.classList.add("block-content");

                // Mover los labels al bloque
                labels.forEach(selector => {
                    const els = document.querySelectorAll(selector);
                    els.forEach(el => {
                        blockContent.appendChild(el);

                        // Agrupar descripción + input en .descr-container solo si NO es zona de imágenes
                        if (!headerClass.includes("zonadeimagenes")) {
                            const description = el.querySelector(".description");
                            const inputs = el.querySelectorAll("input");
                            if (description && inputs.length === 1) {
                                const container = document.createElement("div");
                                container.classList.add("descr-container");
                                container.appendChild(description);
                                container.appendChild(inputs[0]);

                                const firstSpan = el.querySelector("span");
                                if (firstSpan) {
                                    firstSpan.insertAdjacentElement("afterend", container);
                                } else {
                                    el.insertBefore(container, el.firstChild);
                                }
                            }
                        }
                    });
                });

                newBlock.appendChild(blockHeader);
                newBlock.appendChild(blockContent);

                lastInsertedBlock.insertAdjacentElement("afterend", newBlock);
                lastInsertedBlock = newBlock;
            });
        }
    }
});

window.addEventListener('load', () => {

    document.querySelectorAll('label[class^="ucp-"]').forEach(label => {

        // Placeholders
        const content = label.querySelector('input[id$="_content"]');
        const alt = label.querySelector('input[id$="_alternative"]');

        if (content) content.placeholder = 'Dirección de la imagen';
        if (alt) alt.placeholder = 'Texto alternativo';

        // Eliminar los textos del foro
        [...label.childNodes].forEach(node => {
            if (node.nodeType !== Node.TEXT_NODE) return;

            const texto = node.textContent;

            if (
                texto.includes('Dirección de la imagen') ||
                texto.includes('Texto alternativo')
            ) {
                node.remove();
            }
        });

    });

});

(function() {

    /* =========================
       CONFIGURACIÓN (editable)
    ========================= */
    const CFG = {
        // Clases (cámbialas aquí y en el CSS si quieres otros nombres)
        claseToggle:      'pp-ava-toggle',          // el botón
        claseToggleIcono: 'pp-ava-toggle-icon',     // icono del botón
        claseToggleTexto: 'pp-ava-toggle-text',     // texto del botón
        claseToggleSwitch:'pp-ava-toggle-switch',   // interruptor visual
        claseToggleOff:   'is-off',                 // estado "avatar oculto" en el botón
        claseOculto:      'pp-ava-hidden',          // se añade a #preview cuando el avatar está oculto

        // Textos
        texto:            'Avatar',
        tituloOn:         'Ocultar avatar en la previsualización',
        tituloOff:        'Mostrar avatar en la previsualización',

        // Icono (Font Awesome, el que ya usa tu skin)
        icono:            'fa-solid fa-user',

        // Memoria de la preferencia
        guardar:          true,
        claveStorage:     'pp-ava-preview-oculto'
    };

    /* =========================
       ESTADO (mostrar / ocultar)
    ========================= */
    function leerEstado() {
        if (!CFG.guardar) return false;
        try { return localStorage.getItem(CFG.claveStorage) === '1'; }
        catch (e) { return false; }
    }

    function guardarEstado(oculto) {
        if (!CFG.guardar) return;
        try { localStorage.setItem(CFG.claveStorage, oculto ? '1' : '0'); }
        catch (e) { /* sin almacenamiento disponible */ }
    }

    // Regla mínima para que funcione aunque aún no hayas puesto el CSS
    // Regla mínima: ya no usa display:none para no romper la transición
    function inyectarCSSBase() {
        if (document.getElementById('pp-ava-toggle-base')) return;
        const style = document.createElement('style');
        style.id = 'pp-ava-toggle-base';
        style.textContent = '#preview.' + CFG.claseOculto + ' .pp-ava { pointer-events: none; }';
        document.head.appendChild(style);
    }

    function aplicarEstado(oculto) {
        const preview = document.querySelector('#preview');
        if (!preview) return;

        preview.classList.toggle(CFG.claseOculto, oculto);

        const btn = preview.querySelector('.' + CFG.claseToggle);
        if (btn) {
            btn.classList.toggle(CFG.claseToggleOff, oculto);
            btn.setAttribute('aria-pressed', oculto ? 'false' : 'true');
            btn.setAttribute('title', oculto ? CFG.tituloOff : CFG.tituloOn);
        }
    }

    /* =========================
       BOTÓN TOGGLE
    ========================= */
    function insertarToggle() {
        const preview = document.querySelector('#preview');
        if (!preview) return;

        // Si ya existe, solo sincronizamos el estado
        if (preview.querySelector('.' + CFG.claseToggle)) return;

        // Lo ponemos en la cabecera; si no hay, al principio del preview
        const header = preview.querySelector('.block-header') || preview;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = CFG.claseToggle;
        btn.innerHTML =
            '<i class="' + CFG.icono + ' ' + CFG.claseToggleIcono + '"></i>' +
            '<span class="' + CFG.claseToggleTexto + '">' + CFG.texto + '</span>' +
            '<span class="' + CFG.claseToggleSwitch + '"></span>';

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const oculto = !document.querySelector('#preview').classList.contains(CFG.claseOculto);
            guardarEstado(oculto);
            aplicarEstado(oculto);
        });

        header.appendChild(btn);
    }

    /* =========================
       AVATAR NPC
    ========================= */
    // Aplica el avatar del NPC (si existe) a la imagen de .pp-ava del preview
    function aplicarAvatarNPC() {
        const npc = document.querySelector('#preview .modo-npc[avatar]');
        const img = document.querySelector('#preview .pp-ava img');
        if (!npc || !img) return;

        const nuevoSrc = npc.getAttribute('avatar');
        if (nuevoSrc && img.getAttribute('src') !== nuevoSrc) {
            img.removeAttribute('srcset');
            img.setAttribute('src', nuevoSrc);
            console.log('???? Avatar NPC aplicado:', nuevoSrc);
        }
    }

    /* =========================
       INSERTAR AVATAR
    ========================= */
    function insertarAvatar() {
        const postContent = document.querySelector('#preview .post-content');
        if (!postContent) return false;

        // El botón y el estado se aseguran siempre (idempotente)
        insertarToggle();
        aplicarEstado(leerEstado());

        // Si ya existe el avatar, solo nos aseguramos de que tenga el del NPC
        if (document.querySelector('#preview .pp-ava')) {
            aplicarAvatarNPC();
            return true;
        }

        // Buscar la imagen de origen
        const userImg = document.querySelector('#header-user img');
        if (!userImg) {
            console.warn('⚠️ No se encontró #header-user img para extraer el avatar.');
            return false;
        }

        // Crear .pp-ava con la imagen clonada
        const avatarWrapper = document.createElement('div');
        avatarWrapper.className = 'pp-ava';
        avatarWrapper.appendChild(userImg.cloneNode(true));

        try {
            postContent.after(avatarWrapper);
            console.log('✅ <div class="pp-ava"> insertado después de .post-content.');

            aplicarAvatarNPC();

            // Resto de datos NPC, si el otro script está disponible
            if (typeof window.initNPCs === 'function') window.initNPCs();

            return true;
        } catch (error) {
            console.error('❌ Error al insertar el avatar:', error);
            return false;
        }
    }

    /* =========================
       OBSERVADOR
    ========================= */
    function iniciarObservador() {
        inyectarCSSBase();
        insertarAvatar();

        if (document.body) {
            const observer = new MutationObserver(() => {
                insertarAvatar();
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciarObservador);
    } else {
        iniciarObservador();
    }
})();

//ENLACES EN MENÚ LATERAL
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el segundo <ul> dentro del elemento con id="main-menu"
    const secondUl = document.querySelector("#main-menu ul:nth-of-type(2)");

    if (secondUl) {
        // Define los nuevos enlaces que deseas agregar
        const links = [
            { href: "/link1", text: "Enlace 1", className: "custom-class-1" },
            { href: "/link2", text: "Enlace 2", className: "custom-class-2" },
            { href: "/link3", text: "Enlace 3", className: "custom-class-3" }
        ];

        // Itera sobre los enlaces y crea los <li> con <a>
        links.forEach(link => {
            const li = document.createElement("li");
            const a = document.createElement("a");

            a.href = link.href;          // Asigna el enlace
            a.textContent = link.text;  // Asigna el texto del enlace
            a.className = link.className; // Asigna la clase personalizada

            li.appendChild(a);          // Añade el enlace al <li>
            secondUl.appendChild(li);  // Añade el <li> al segundo <ul>
        });
    } else {
        console.warn("No se encontró el segundo <ul> dentro de #main-menu.");
    }
});

//TABS
document.addEventListener("DOMContentLoaded", function () {
 
  document.querySelectorAll(".tabs-wrapper").forEach(function (tabsContainer) {
    const tabId = tabsContainer.getAttribute("data-tab-id");

   
    tabsContainer.querySelectorAll(".tabs-links button").forEach(function (button) {
      button.addEventListener("click", function () {
        const target = button.getAttribute("data-tab-target");

       
        tabsContainer.querySelectorAll(".tabs-links button").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

       
        tabsContainer.querySelectorAll(".tabContent").forEach(tab => tab.classList.remove("active"));
        tabsContainer.querySelector(`#${target}`).classList.add("active");
      });
    });

   
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("tabContent") && urlParams.get("tab-group") === tabId) {
      const target = urlParams.get("tabContent");
      const targetButton = tabsContainer.querySelector(`.tabs-links button[data-tab-target="${target}"]`);
      if (targetButton) {
        targetButton.click();
 
     
        const submenu = targetButton.closest('.tabs-submenu').querySelector('.submenu');
        if (submenu) {
          submenu.style.display = 'block';
        }
      }
    }
  });
});

$(function() {
    document.querySelectorAll('.notification-check').forEach(el => {
        const style = el.getAttribute('style') || '';

        if (style.includes('pm_unread.png')) {
            el.classList.add('pm-unread');
        } else if (style.includes('pm_read.png')) {
            el.classList.add('pm-read');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {

  /* =====================================================
     1. LOGIN / PASSWORD (jQuery)
  ===================================================== */
  $(window).on('load', function () {
    const $passwordContainer = $('.password-container');
    const $autologinLabel = $('label.label:has(#checkbox_autologin)');
    const $recoverLink = $('a[href="/profile?mode=sendpassword"]');
    const $registerLink = $('a[href="/register"]');

    if ($passwordContainer.length && $autologinLabel.length && $recoverLink.length) {
      if (!$('.password-wrap').length) {

        const $wrap = $('<div class="password-wrap"></div>');
        const $footer = $('<div class="password-footer"></div>');

        $passwordContainer.before($wrap);
        $wrap.append($passwordContainer);

        $footer.append($autologinLabel, $recoverLink);
        $wrap.append($footer);

        $recoverLink.removeClass('btn-flat');
        $autologinLabel.find('span').last().text('Entrar automáticamente');
      }
    }

    $registerLink.each(function () {
      const $this = $(this);
      if ($this.closest('.block-login').length) {
        $this.removeClass('btn-flat');
        $this.html('¿No tienes una cuenta? <b>Regístrate</b>');
      }
    });
  });


  /* =====================================================
     2. WRAPPER + SLIDERS (JS nativo)
  ===================================================== */
  const formSelectors = [
    'form.block-content:not(#quick_reply)',
    'form#ucp.block.block-login',
    'form#frmAgreement.has-validation-callback'
  ];

  formSelectors.forEach(selector => {
    const form = document.querySelector(selector);
    if (!form) return;
    if (form.closest('.login-wrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'login-wrapper';

    const inner = document.createElement('div');
    inner.className = 'login-container';

    form.parentNode.insertBefore(wrapper, form);
    wrapper.appendChild(inner);
    wrapper.appendChild(form);

    inner.innerHTML = `
      <div class="login-sliders">
        <div class="slider">
          <div class="slider-information">
            <h2>Ahora empieza mi guardia</h2>
            <p>ASOIAF MAGIC AU</p>
          </div>
        </div>
        <div class="slider">
          <div class="slider-information">
            <h2>The gods sent u as a punishment</h2>
            <p>Mitología&nbsp;+&nbsp;Southern Gothic&nbsp;+&nbsp;Salvaje Oeste</p>
          </div>
        </div>
        <div class="slider">
          <div class="slider-information">
            <h2>Si tengo que elegir entre un mal y otro...</h2>
            <p>The Witcher AU</p>
          </div>
        </div>
      </div>
    `;
  });


  /* =====================================================
     3. FORMULARIO DE ACUERDOS
  ===================================================== */
  const agreementForm = document.querySelector('form#frmAgreement.has-validation-callback');
  if (agreementForm) {
    const blockContent = agreementForm.querySelector('.block-content');
    if (blockContent) {

      const paragraphs = blockContent.querySelectorAll('p');
      if (paragraphs.length && !blockContent.querySelector('.agreement-info')) {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'agreement-info';
        paragraphs.forEach(p => infoDiv.appendChild(p));

        const heading = blockContent.querySelector('h2');
        heading
          ? heading.insertAdjacentElement('afterend', infoDiv)
          : blockContent.insertBefore(infoDiv, blockContent.firstChild);
      }

      const reminderSpan = blockContent.querySelector('span[style*="color:red"]');
      if (reminderSpan) {
        reminderSpan.classList.add('agreement-reminder');

        const rawHTML = reminderSpan.innerHTML;
        const lines = rawHTML.split(/<br\s*\/?>/i).map(l => l.trim()).filter(l => l);

        reminderSpan.innerHTML = '';
        const ul = document.createElement('ul');
        ul.className = 'agreement-reminder-list';

        lines.forEach(line => {
          if (line.startsWith('-')) {
            const li = document.createElement('li');
            li.textContent = line.slice(1).trim();
            ul.appendChild(li);
          } else if (line) {
            const regex = /'(.*?)'/;
            const match = line.match(regex);
            if (match) {
              const strong = document.createElement('strong');
              strong.textContent = `«${match[1]}»`;

              const before = line.slice(0, match.index);
              const after = line.slice(match.index + match[0].length);

              if (before) reminderSpan.appendChild(document.createTextNode(before));
              reminderSpan.appendChild(strong);
              if (after) reminderSpan.appendChild(document.createTextNode(after));
            } else {
              reminderSpan.appendChild(document.createTextNode(line));
            }
          }
        });

        if (ul.children.length) reminderSpan.appendChild(ul);
      }

      const infoDiv = blockContent.querySelector('.agreement-info');
      if (infoDiv && reminderSpan) {
        let sibling = infoDiv.nextSibling;
        while (sibling && sibling !== reminderSpan) {
          const next = sibling.nextSibling;
          if (sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === 'BR') {
            sibling.remove();
          }
          sibling = next;
        }
      }

      const stepInput = blockContent.querySelector('input[name="step"]');
      if (reminderSpan && stepInput) {
        let sibling = reminderSpan.nextSibling;
        while (sibling && sibling !== stepInput) {
          const next = sibling.nextSibling;
          if (sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === 'BR') {
            sibling.remove();
          }
          sibling = next;
        }
      }

      const labels = blockContent.querySelectorAll('label');
      if (labels.length && !blockContent.querySelector('.agreement-checks')) {
        const checksDiv = document.createElement('div');
        checksDiv.className = 'agreement-checks';
        labels.forEach(label => checksDiv.appendChild(label));
        blockContent.appendChild(checksDiv);
      }
    }
  }


  /* =====================================================
     4. SLIDER AUTOMÁTICO (SIN ERRORES)
  ===================================================== */
  const sliders = document.querySelectorAll(".login-container .slider");

  // ???? Si no hay sliders o solo hay uno, no ejecutamos nada
  if (sliders.length < 2) return;

  let current = 0;

  sliders.forEach((slide, i) => {
    slide.style.opacity = i === 0 ? "1" : "0";
    slide.style.zIndex = i === 0 ? "2" : "1";
  });

  function nextSlide() {
    const next = (current + 1) % sliders.length;

    sliders[next].style.zIndex = "3";
    sliders[next].style.opacity = "1";

    setTimeout(() => {
      sliders[current].style.opacity = "0";
      sliders[current].style.zIndex = "1";
      sliders[next].style.zIndex = "2";
      current = next;
    }, 800);
  }

  setInterval(nextSlide, 3000);

});

$(document).ready(function(){

  function getDiceSVG(tipo) {
    switch(tipo) {
      case 'd10':
        return `
          <svg class="svg-d10" viewBox="0 0 507.73 481.26" xmlns="http://www.w3.org/2000/svg">
            <g class="dice-caras">
              <path d="M-401.39,641.18c-3.41,1.64-6,1.88-9.65.15-50.54-24.28-155.87-74.56-158.43-75.89l163-306.52L-243.4,565.53" transform="translate(660.26 -258.92)"/>
              <path d="M-414.47,264.31c-22,41.41-155.24,292.74-158,297.23a6.13,6.13,0,0,1-4.6,2.55c-25.89-1.55-80.89-5.55-83.16-5.9.55-10.75,5.47-95.75,6.47-109,.15-2,2-4.44,3.77-5.8C-628.87,427-414.63,264.11-414.47,264.31Z" transform="translate(660.26 -258.92)"/>
              <path d="M-398.59,263.11c6.17,4.64,227.52,173.78,236.51,180.87a7.69,7.69,0,0,1,2.79,4.78c1.15,14.73,5.47,87.32,6.76,109.61-7.13.6-61.84,4.34-82.4,5.9-3.61.27-4.93-1.4-6.36-4.08" transform="translate(660.26 -258.92)"/>
              <path d="M-653,563.61c7.53.39,15.06.69,22.57,1.19,17.25,1.15,34.51,2.29,51.74,3.69a30.56,30.56,0,0,1,10.43,2.7C-535.1,586.88-502,602.76-469,618.57q28.09,13.42,56.24,26.77c2.53,1.2,4.28,2.35,4.26,5.78-.16,28.29-.08,56.57-.08,84.85,0,.95,0,2-.09,4.21" transform="translate(660.26 -258.92)"/>
              <path d="M-404.23,651.53c0-3.06.85-4.76,3.72-6.12,52.16-24.77,104.19-49.8,156.5-74.25,6-2.81,13.46-2.89,20.3-3.44,19.55-1.57,39.12-2.74,58.69-4.05a11.17,11.17,0,0,1,5.52,1L-404.13,740.09" transform="translate(660.26 -258.92)"/>
            </g>
          </svg>
        `;
      case 'd20':
        return `
        <svg class="svg-d20" viewBox="0 0 430.19 482.81" xmlns="http://www.w3.org/2000/svg">
          <g class="dice-caras">
            <path d="M-695.6,493.51c44-76.21,87.64-151.9,131.9-228.59l131.92,228.59Z" transform="translate(778.81 -179.47)"/>
            <path d="M-778.81,297.63l210.71-34.22L-699.29,490.88C-725.94,426.13-752.21,362.27-778.81,297.63Z" transform="translate(778.81 -179.47)"/>
            <path d="M-559.31,263.38l210.7,34.25-79.47,193.24Z" transform="translate(778.81 -179.47)"/>
            <path d="M-694.65,498.53h261.91l-131,163.76Z" transform="translate(778.81 -179.47)"/>
            <path d="M-778.28,310.79q37.81,91.86,75.82,184.16l-74.69,42.43" transform="translate(778.81 -179.47)"/>
            <path d="M-350.36,537.27l-74.55-42.34q38.19-92.67,76-184.45" transform="translate(778.81 -179.47)"/>
            <path d="M-352.86,541.28-552,656.55l-.6-.65c6.22-7.86,12.42-15.75,18.67-23.59q37.12-46.5,74.27-93c10.05-12.57,20.29-25,30.13-37.73,2.37-3.07,4-1.74,6.17-.51" transform="translate(778.81 -179.47)"/>
            <path d="M-566,179.47v79l-200,32.45-.4-1Z" transform="translate(778.81 -179.47)"/>
            <path d="M-561.16,258.48v-78.8L-360.94,289.9l-.33,1Z" transform="translate(778.81 -179.47)"/>
            <path d="M-698.71,500.82a2.84,2.84,0,0,0-3.62-.69l-72.24,41.11c61.49,35.6,123,71.13,183.57,106.18l19,9.13" transform="translate(778.81 -179.47)"/>
          </g>
        </svg>
        `;
      default:
        return '';
    }
  }

  function crearDado(tipo, numero) {
    return `
      <div class="d-dice d-${tipo}">
        <h4>${numero}</h4>
        <div class="d-dice-svg">
          ${getDiceSVG(tipo)}
        </div>
      </div>
    `;
  }

  var rol_dices = {
    'moneda': {},
    'situación leve': {
      '1': '<div class="d-box d-situ"><div class="d-deco d-situ-1"></div><div class="d-title">El regreso del noble</div><div class="d-txt">Un noble que había sido dado por muerto...</div></div>',
      '2': '<div class="d-box d-situ"><div class="d-deco d-situ-1"></div><div class="d-title">La vaca parlante</div><div class="d-txt">En la aldea corre el rumor de que una vaca...</div></div>',
      '3': '<div class="d-box d-situ"><div class="d-deco d-situ-1"></div><div class="d-title">La fuente envenenada</div><div class="d-txt">Varios aldeanos caen enfermos tras beber...</div></div>',
    },
    'situación moderada': {
      '1': '<div class="d-box d-situ"><div class="d-deco d-situ-2"></div><div class="d-title">El lago helado</div><div class="d-txt">Un lago cercano amaneció completamente congelado, aunque no es época de frío. En el hielo se ven figuras atrapadas, como si fueran estatuas de cristal.</div></div>',
      '2': '<div class="d-box d-situ"><div class="d-deco d-situ-2"></div><div class="d-title">El grito de la bruja</div><div class="d-txt">Un grito aterrador surge desde el bosque cercano. Los aldeanos murmuran sobre una bruja que juró venganza hace décadas.</div></div>',
      '3': '<div class="d-box d-situ"><div class="d-deco d-situ-2"></div><div class="d-title">El pueblo vacío</div><div class="d-txt">Al llegar a la aldea más cercana, descubren que está completamente desierta, pero las casas están intactas.</div></div>',
    },
    'situación extrema': {
      '1': '<div class="d-box d-situ"><div class="d-deco d-situ-3"></div><div class="d-title">El rugido del cuerno</div><div class="d-txt">Una trompeta de guerra rompe el silencio. Tropas enemigas han sido avistadas marchando hacia el pueblo cercano.</div></div>',
      '2': '<div class="d-box d-situ"><div class="d-deco d-situ-3"></div><div class="d-title">El heraldo sangriento</div><div class="d-txt">Un mensajero tambaleante llega a caballo. Su armadura está manchada de sangre y apenas puede hablar.</div></div>',
      '3': '<div class="d-box d-situ"><div class="d-deco d-situ-3"></div><div class="d-title">El carro de la peste</div><div class="d-txt">Un carro cargado de cadáveres pestilentes es dejado frente a las puertas del castillo.</div></div>',
    },
    'd10': {
      '1': crearDado('d10',1),
      '2': crearDado('d10',2),
      '3': crearDado('d10',3),
      '4': crearDado('d10',4),
      '5': crearDado('d10',5),
      '6': crearDado('d10',6),
      '7': crearDado('d10',7),
      '8': crearDado('d10',8),
      '9': crearDado('d10',9),
      '10': crearDado('d10',10)
    },
    'd20': {
      '1': crearDado('d20',1),
      '2': crearDado('d20',2),
      '3': crearDado('d20',3),
      '4': crearDado('d20',4),
      '5': crearDado('d20',5),
      '6': crearDado('d20',6),
      '7': crearDado('d20',7),
      '8': crearDado('d20',8),
      '9': crearDado('d20',9),
      '10': crearDado('d20',10),
      '11': crearDado('d20',11),
      '12': crearDado('d20',12),
      '13': crearDado('d20',13),
      '14': crearDado('d20',14),
      '15': crearDado('d20',15),
      '16': crearDado('d20',16),
      '17': crearDado('d20',17),
      '18': crearDado('d20',18),
      '19': crearDado('d20',19),
      '20': crearDado('d20',20)
    }
  };

  // Imágenes fijas para el dado moneda por defecto
  var monedaDefault = {
    "1": "https://2img.net/i.imgur.com/SzP8uLM.png",
    "2": "https://2img.net/i.imgur.com/F9ZOKwr.png"
  };

  function createRoll(title, results, user) {
    title = title.toLowerCase();
    var r = document.createElement('div'); r.className = "dice-roll roll-"+title.replaceAll(' ','-');
    var t = document.createElement('div'); t.className = 'dice-title'; t.innerText = title;
    var c = document.createElement('div'); c.className = "dice-results";

    if(title === "moneda") {
      $.each(results, function(key, value) {
        let cara = $(this).text();
        let titleText = (cara === "1") ? "Cara" : "Cruz";
        $(c).append('<span class="roll-result"><img title="'+titleText+'" src="'+monedaDefault[cara]+'"></span>');
      });
    } else {
      $.each(results, function(key, value) {
        if (rol_dices[title] == undefined) {
          $(c).append('<span class="roll-result">'+$(this).text()+'</span>');
        } else {
          $(c).append('<span class="roll-result">'+rol_dices[title][$(this).text()]+'</span>');
        }
      });
    }

    $(r).append($(t)); $(r).append($(c));
    return r;
  }

  $('.post-content:contains("Lanzada de dados"), .block-blogrow-content:contains("Lanzada de dados")').each(function () {
    var h = $(this).html().split('<hr>')[0];
    var c = $(this).html().split('<hr>')[1];
    var d = document.createElement('div'); d.className = "dice-container";
    var u = $(this).find('strong').first().text(); 
    var l = c.split('#');

    var dh = document.createElement('div'); dh.className = "dice-user";
    dh.innerHTML = `<strong>${u},</strong> el Destino ha hablado`;
    $(d).append($(dh));

    if (l.length > 1) {
      l = l.splice(1);
      $.each(l, function(key, value) {
        var lc = '<div>'+value.replace('</div>','')+'</div>';
        $(d).append($(createRoll($(lc).text().split("'")[1],$(lc).find('strong'),u)));
      });
    } else {
      var lc = '<div>'+l[0].replace('</div>','')+'</div>';
      $(d).append($(createRoll($(lc).text().split("'")[1],$(lc).find('strong'),u)));
    }

    $(this).html($(d));
  });

  $(".dice-container").each(function () {
    let currentPost  = $(this).closest(".post-wrap");
    let previousPost = currentPost.prev(".post-wrap");
    if (!previousPost.length) return;

    let nameColor = getComputedStyle(previousPost.find(".pp-name span, .pp-name a span")[0]).color;
    currentPost.find(".pp-name span, .pp-name a span").css("color", nameColor);

    let vars = ["--group","--group-75","--group-50","--group-25","--group-15"];
    let computed = getComputedStyle(previousPost[0]);
    vars.forEach(v => {
      let value = computed.getPropertyValue(v).trim();
      if(value) currentPost[0].style.setProperty(v,value);
    });
  });

  $('.dice-container').each(function(){$(this).closest('.post-wrap').find('.post-aside').hide();
  });

});

/* ===== MEMBERLIST: dropdown + campos de perfil + filtros ===== */

/* 1. Dropdown de los filtros: solo alterna la clase is-closed (la animación es CSS).
      Flecha girada (.rotate) = grupo plegado. */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.btn-submenu').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const plegado = btn.closest('.filter-group').classList.toggle('is-closed');
            btn.querySelector('.dropdown').classList.toggle('rotate', plegado);
        });
    });
});

/* 2. Campos de perfil + filtrado (sin jQuery) */
document.addEventListener('DOMContentLoaded', function () {
    const grid    = document.getElementById('memberlist');
    if (!grid) return;
    const cards   = [...grid.querySelectorAll('.member')];
    const grupos  = [...document.querySelectorAll('#memberlist-filters .filter-group')];
    const counter = document.getElementById('memberlist-count');

    // clave (= data-filter del grupo) : nombre del campo en el perfil
    const CAMPOS = { ocupacion: 'Ocupación', raza: 'Raza', afiliacion: 'Afiliación', clase: 'Clase' };

    // Valor de un campo del perfil (.field_uneditable o, si no existe, el texto sin la etiqueta)
    const valorDe = f => {
        if (!f) return '';
        const v = f.querySelector('.field_uneditable');
        if (v) return v.textContent.trim();
        const etiqueta = f.querySelector('.ps-flabel')?.textContent || '';
        return f.textContent.replace(etiqueta, '').trim();
    };
    const norm = s => (s || '').trim().toLowerCase();
    const rgbToHex = rgb => {
        const m = (rgb || '').match(/\d+/g);
        return m ? '#' + m.slice(0, 3).map(n => (+n).toString(16).padStart(2, '0')).join('') : '';
    };

    // Color del nombre -> acento de la tarjeta y dato para filtrar
    cards.forEach(card => {
        const name  = card.querySelector('.member-name');
        const color = getComputedStyle(name.querySelector('span') || name).color;
        card.dataset.color = rgbToHex(color);
        card.style.setProperty('--accent', color);
    });

    function filtrar() {
        const reglas = grupos.map(g => {
            const sel = g.querySelector('.filter-button.selected');
            return { clave: g.dataset.filter, valores: norm(sel ? sel.dataset.value : '').split(',').map(norm).filter(Boolean) };
        }).filter(r => r.valores.length);

        let visibles = 0;
        cards.forEach(card => {
            const ok = reglas.every(r => {
                const dato = norm(card.dataset[r.clave]);
                return r.clave === 'color' ? r.valores.includes(dato) : r.valores.some(v => dato.includes(v));
            });
            card.hidden = !ok;
            if (ok) visibles++;
        });
        if (counter) counter.textContent = visibles + ' de ' + cards.length + ' miembros';
    }

    // Botones: uno seleccionado por grupo ("Mostrar todos" al inicio)
    grupos.forEach(g => {
        const botones = [...g.querySelectorAll('.filter-button')];
        if (botones[0]) botones[0].classList.add('selected');
        botones.forEach(b => b.addEventListener('click', () => {
            botones.forEach(x => x.classList.remove('selected'));
            b.classList.add('selected');
            filtrar();
        }));
    });

    // Campos de perfil de cada miembro
    cards.forEach(async card => {
        try {
            const res    = await fetch(card.querySelector('.member-name').href);
            const doc    = new DOMParser().parseFromString(await res.text(), 'text/html');
            const campos = [...doc.querySelectorAll('.ps-field')];
            const lista  = card.querySelector('.member-fields');

            for (const clave in CAMPOS) {
                const campo = campos.find(f => norm(f.querySelector('.ps-flabel')?.textContent).startsWith(norm(CAMPOS[clave])));
                const valor = valorDe(campo);
                if (!valor) continue;
                card.dataset[clave] = valor;
                const fila = document.createElement('div'), et = document.createElement('span'), va = document.createElement('span');
                fila.className = 'member-field';
                et.className = 'member-field-label'; et.textContent = CAMPOS[clave];
                va.className = 'member-field-value'; va.textContent = valor;
                fila.append(et, va);
                lista.append(fila);
            }
            // Puntos: Foroactivo solo los muestra al ordenar por puntos; si faltan, se leen del perfil
            if (!card.querySelector('[data-stat="points"]')) {
                const pts = campos.find(f => norm(f.querySelector('.ps-flabel')?.textContent).startsWith('puntos'));
                const valorPts = valorDe(pts);
                if (valorPts) {
                    const stat = document.createElement('span'), b = document.createElement('b'), l = document.createElement('span');
                    stat.className = 'member-stat'; stat.dataset.stat = 'points';
                    b.textContent = valorPts; l.textContent = 'Puntos';
                    stat.append(b, l);
                    card.querySelector('.member-stats').append(stat);
                }
            }

            const rango = doc.querySelector('.ps-rank')?.textContent.trim();
            if (rango) card.querySelector('.member-rank').textContent = rango;
        } catch (e) { console.warn('No se pudo cargar el perfil', e); }
        filtrar();
    });

    filtrar();
});

// BIBLIOTECA - DATOS
// ÚNICO lugar donde se escriben habilidades, ítems, NPCs, estados alterados y huecos de equipamiento.
// Debe cargarse ANTES que cualquier otro script que use window.PSData.
(function () {
    "use strict";

    /* =====================================================
       CONFIGURACIÓN DE ICONOS
       Fuente por defecto para iconos escritos con una sola palabra.
       "wyvern" -> <i class="game-icon game-icon-wyvern"></i>
       ===================================================== */
    const DEFAULT_ICON_FAMILY = "game-icon";

    /* =====================================================
       UTILIDADES
       ===================================================== */
    const normalize = str => String(str || "")
        .replace(/&nbsp;|\u00a0/g, " ")
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/-+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const slug = str => normalize(str)
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-_]/g, "");

    const esc = s => String(s).replace(/[&<>"']/g, c =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

    // Clases del icono: una palabra -> fuente por defecto; varias -> tal cual
    function iconClass(icon) {
        const raw = String(icon || "").trim().replace(/[^A-Za-z0-9_\- ]/g, "").replace(/\s+/g, " ");
        if (!raw) return "";
        if (raw.indexOf(" ") !== -1) return raw;
        const prefix = DEFAULT_ICON_FAMILY;
        return raw.indexOf(prefix + "-") === 0 ? prefix + " " + raw : prefix + " " + prefix + "-" + raw;
    }

    // HTML del icono de un ítem: imagen > icono de fuente > nada
    function iconHTML(item) {
        if (!item) return "";
        if (item.image) return '<img src="' + esc(item.image) + '" alt="' + esc(item.name || "") + '">';
        const cls = iconClass(item.icon);
        return cls ? '<i class="' + cls + '"></i>' : "";
    }

    /* =====================================================
       1) HABILIDADES
       Forma simple:  "nombre": "descripción"
       Forma completa: "nombre": { desc: "...", passive: true }
       ===================================================== */
    const SKILLS = {
        // --- Clases ---
        "Luchador": "Suma la mitad del ataque enemigo a su Ataque físico una vez por contrincante.",
        "Luchadora": "Suma la mitad del ataque enemigo a su Ataque físico una vez por contrincante.",
        "Acechador": "No recibe el ataque del enemigo una vez por contrincante.",
        "Acechadora": "No recibe el ataque del enemigo una vez por contrincante.",
        "Caballero": "Mientras su salud sea menos de la mitad, suma +3 Resistencia.",
        "Conjurador": "Multiplica x2 la Inteligencia o Voluntad una vez por contrincante.",
        "Conjuradora": "Multiplica x2 la Inteligencia o Voluntad una vez por contrincante.",
        "Aen Saevherne": "Descripción pendiente.",

        // --- Trasfondos ---
        "Duelista": "La Fuerza del enemigo se reduce a la mitad una vez por contrincante durante 2 turnos.",
        "Bruto": "Ignora la Resistencia enemiga haciendo un daño neto una vez por contrincante.",
        "Bruta": "Ignora la Resistencia enemiga haciendo un daño neto una vez por contrincante.",
        "Defensor": "Defiende a un compañero recibiendo el ataque dirigido a éste una vez por contrincante.",
        "Defensora": "Defiende a un compañero recibiendo el ataque dirigido a éste una vez por contrincante.",
        "Brujo": "Suma la Voluntad a su Ataque físico una vez por contrincante.",
        "Bruja": "Suma la Voluntad a su Ataque físico una vez por contrincante.",
        "Exorcista": "Suma la Fuerza del enemigo a su Ataque físico una vez por contrincante.",
        "Hechicero": "Provoca un daño de área neto de -3 PV una vez por contrincante. Si solo hay un enemigo, el daño es -5 PV.",
        "Hechicera": "Provoca un daño de área neto de -3 PV una vez por contrincante. Si solo hay un enemigo, el daño es -5 PV.",
        "Sacerdote": "Crea un muro mágico alrededor del personaje y un compañero que anule el ataque enemigo recibido durante 1 turno.",
        "Sacerdotisa": "Crea un muro mágico alrededor del personaje y un compañero que anule el ataque enemigo recibido durante 1 turno.",
        "Taumaturgo": "La Resistencia del enemigo se reduce a la mitad una vez por contrincante durante 2 turnos.",
        "Taumaturga": "La Resistencia del enemigo se reduce a la mitad una vez por contrincante durante 2 turnos.",
        "Sgathan Lasair": "Otorga el Beso de la Vida una vez por combate (revive a un compañero caído para convertirlo en nefario).",

        // --- Habilidades sueltas / de NPC ---
        "Combate coordinado": { desc: "Mientras haya un compañero vivo suman +2 al Ataque físico.", passive: true },
        "Código de caballería": { desc: "Mientras viva el Escudero obtiene + 2 Resistencia.", passive: true },
        "Servidumbre": { desc: "Le otorga +2 Fuerza al Paladín.", passive: true },
        "Sangrado": "Cuando saca un crítico resta a su contrincante -2 PV durante 2 turnos.",
        "Compañerismo": { desc: "Mientras haya un compañero vivo suman +2 Resistencia.", passive: true },
        "Dureza": "Cuando saca un crítico multiplica x2 su Resistencia.",
        "Fiereza": { desc: "Cuando alcanza la mitad de PV suma +2 Fuerza.", passive: true },
        "Ponzoña": "Cuando saca un 5 envenena a su contrincante restándole -1 PV durante 3 turnos.",
        "Unión": { desc: "Mientras haya más de uno suma +2 Fuerza.", passive: true },
        "Esquiva fantasmal": "Cuando saca un crítico se hace intangible y no recibe daño."
    };

    /* =====================================================
       2) ÍTEMS (equipamiento, armamento, inventario, tienda, guidebook...)
       - name:      nombre mostrado
       - type:      término corto (card y fallback del modal)
       - tag:       (opcional) línea larga del modal
       - rarity:    (opcional) "rare" | "legendary" -> clase de la card
       - qtyLabel:  (opcional) texto que sustituye a "x1", ej. "única"
       - image:     (opcional) URL de imagen (tiene prioridad sobre icon)
       - icon:      (opcional) icono de fuente:
                      "wyvern"                 -> fuente por defecto (game-icons)
                      "fa-solid fa-shield"     -> clases completas, cualquier fuente
       - description, stats: [[etiqueta, valor], ...]
       ===================================================== */
    const ITEMS = {
        "Espada": {
            name: "Espada",
            type: "Espada",
            tag: "Arma · a una mano",
            icon: "two-handed-sword",
            description: "Para sajar y cortar.",
            stats: [["Daño", "12-18"], ["Reparable", "Requiere reparación"]]
        },
        "Armadura de placas": {
            name: "Armadura de placas",
            type: "Armadura",
            tag: "Armadura · defensa pesada",
            icon: "chest-armor",
            description: "Evita un viaje en ambulancia.",
            stats: [["CA", "+8"], ["Penalización", "-6"]]
        },
        "Cuervo Negro": {
            name: "Cuervo Negro",
            type: "Espada",
            tag: "Espada · una mano · legendaria",
            rarity: "legendary",
            qtyLabel: "única",
            icon: "wyvern",
            description: "Hoja oscura forjada con acero de meteorito.",
            stats: [["Daño", "12-18"], ["Crítico", "19-20/x2"]]
        },
        "Coraza gris": {
            name: "Coraza gris",
            type: "Armadura",
            tag: "Armadura · torso · rara",
            rarity: "rare",
            icon: "fa-solid fa-shield",
            description: "Placa ligera adaptada al clima del norte.",
            stats: [["Defensa", "Media-alta"], ["Peso", "Ligero"]]
        },
        "Manzana": {
            name: "Manzana",
            type: "Consumible",
            icon: "shiny-apple",
            description: "Una manzana fresca y jugosa.",
            stats: [["Efecto", "Recupera 5 de salud"]]
        },
        "Llave": {
            name: "Llave",
            type: "Llave",
            icon: "key-2",
            description: "Abre una cerradura.",
            stats: [["Tipo", "Objeto clave"]]
        },
        "Lágrima de sal": {
            name: "Lágrima de sal",
            type: "Material",
            icon: "crystalize",
            description: "Una lágrima cristalizada.",
            stats: [["Uso", "Acumulable"]]
        }
    };

    /* =====================================================
       3) NPCs
       - stats: fue, dex, res, int, vol
       - skills: lista de nombres (deben existir en SKILLS).
                 Si es pasiva, la tablilla lo indica sola.
                 (Opcional: { name: "...", status: "usada" })
       ===================================================== */
    const NPCS = {
        "Bandido": {
            name: "Bandido", avatar: "https://i.pravatar.cc/120?img=60",
            role: "Humanos", groupInfo: "Va en grupos de 3", maxPv: 20,
            stats: { fue: 3, dex: 4, res: 3, int: 1, vol: 2 },
            skills: ["Combate coordinado"]
        },
        "Paladín": {
            name: "Paladín", avatar: "https://i.pravatar.cc/120?img=65",
            role: "Humanos", groupInfo: "Siempre aparece con un Escudero", maxPv: 35,
            stats: { fue: 5, dex: 4, res: 4, int: 3, vol: 3 },
            skills: ["Código de caballería"]
        },
        "Escudero": {
            name: "Escudero", avatar: "https://i.pravatar.cc/120?img=14",
            role: "Humanos", maxPv: 23,
            stats: { fue: 3, dex: 3, res: 3, int: 2, vol: 2 },
            skills: ["Servidumbre"]
        },
        "Desertor": {
            name: "Desertor", avatar: "https://i.pravatar.cc/120?img=65",
            role: "Humanos", groupInfo: "Va en grupos de 2", maxPv: 28,
            stats: { fue: 4, dex: 4, res: 3, int: 1, vol: 1 },
            skills: ["Sangrado"]
        },
        "Guardia": {
            name: "Guardia", avatar: "https://i.pravatar.cc/120?img=65",
            role: "Humanos", groupInfo: "Va en grupos de 3", maxPv: 25,
            stats: { fue: 4, dex: 3, res: 4, int: 2, vol: 2 },
            skills: ["Compañerismo"]
        },
        "Uro": {
            name: "Uro", avatar: "https://i.pravatar.cc/120?img=65",
            role: "Bestias", maxPv: 70,
            stats: { fue: 5, dex: 2, res: 5, int: 1, vol: 1 },
            skills: ["Dureza"]
        },
        "Gatosombra": {
            name: "Gatosombra", avatar: "https://i.pravatar.cc/120?img=65",
            role: "Bestias", maxPv: 60,
            stats: { fue: 4, dex: 5, res: 4, int: 2, vol: 1 },
            skills: ["Fiereza"]
        },
        "Ghul": {
            name: "Ghul", avatar: "https://i.pravatar.cc/120?img=65",
            role: "Monstruosidades", maxPv: 28,
            stats: { fue: 4, dex: 4, res: 4, int: 1, vol: 1 },
            skills: ["Ponzoña"]
        },
        "Nekker": {
            name: "Nekker", avatar: "https://i.pravatar.cc/120?img=65",
            role: "Monstruosidades", groupInfo: "Va en grupos de 3 a 5", maxPv: 20,
            stats: { fue: 3, dex: 4, res: 3, int: 2, vol: 1 },
            skills: ["Unión"]
        },
        "Dama del mediodía": {
            name: "Dama del mediodía", avatar: "https://i.pravatar.cc/120?img=65",
            role: "Monstruosidades", maxPv: 75,
            stats: { fue: 4, dex: 5, res: 3, int: 2, vol: 3 },
            skills: ["Esquiva fantasmal"]
        }
    };

    /* =====================================================
       4) ESTADOS ALTERADOS
       ===================================================== */
    const STATUSES = {
        "Envenenado": "Pierde 2 PV al inicio de cada turno hasta recibir un antídoto o que el efecto expire.",
        "Aturdido":   "No puede realizar acciones de ataque durante este turno.",
        "Sangrando":  "Sufre 1 PV de daño adicional por cada acción física que realice.",
        "Maldecido":  "Sus tiradas de dado mágico se reducen en 2 puntos mientras dure el efecto.",
        "Quemado":    "Sufre daño continuo de fuego; -1 a Resistencia mientras arda."
    };

    /* =====================================================
       5) HUECOS DE EQUIPAMIENTO
       Clave = data-field del hueco en la plantilla.
       - label: texto del hueco
       - icon:  icono que se muestra cuando el hueco está VACÍO
                (mismo formato que en los ítems: "ring" o "fa-solid fa-ring")
       Los nombres de icono son orientativos: compruébalos en tu hoja de estilos.
       ===================================================== */
    const SLOTS = {
        manoderecha:    { label: "Arma principal",  icon: "broadsword" },
        manoizquierda:  { label: "Arma secundaria", icon: "round-shield" },
        armadura:       { label: "Armadura",        icon: "chest-armor" },
        accesoriouno:   { label: "Accesorio I",     icon: "ring" },
        accesoriodos:   { label: "Accesorio II",    icon: "gem-necklace" },
        cachivacheuno:  { label: "Cachivache I",    icon: "cog" },
        cachivachedos:  { label: "Cachivache II",   icon: "potion-ball" },
        cachivachetres: { label: "Cachivache III",  icon: "key" }
    };

    /* =====================================================
       ÍNDICES (no tocar)
       ===================================================== */
    function buildIndex(source, make) {
        const idx = {};
        Object.keys(source).forEach(k => { idx[normalize(k)] = make(k, source[k]); });
        return idx;
    }

    const skillIndex = buildIndex(SKILLS, (k, v) =>
        Object.assign({ key: slug(k), name: k, passive: false }, typeof v === "string" ? { desc: v } : v));

    const itemIndex = buildIndex(ITEMS, (k, v) => Object.assign({ key: slug(k) }, v));

    const npcIndex = buildIndex(NPCS, (k, v) => Object.assign({ key: slug(k) }, v));

    const statusIndex = buildIndex(STATUSES, (k, v) =>
        Object.assign({ key: slug(k), label: k }, typeof v === "string" ? { desc: v } : v));

    const get = (idx, name) => idx[normalize(name)] || null;
    const list = idx => Object.keys(idx).map(k => idx[k]);

    /* =====================================================
       API PÚBLICA: window.PSData
       ===================================================== */
    window.PSData = Object.assign(window.PSData || {}, {
        normalize: normalize,
        slug: slug,

        // Habilidades
        hasSkill:     name => !!get(skillIndex, name),
        getSkill:     name => get(skillIndex, name),
        getSkillDesc: name => (get(skillIndex, name) || {}).desc || "",
        isPassive:    name => !!(get(skillIndex, name) || {}).passive,
        skills:       () => list(skillIndex),

        // Ítems
        getItem: name => get(itemIndex, name),
        items:   () => list(itemIndex),
        iconHTML: iconHTML,       // PSData.iconHTML(item) -> <img> o <i class="...">
        iconClass: iconClass,     // PSData.iconClass("wyvern") -> "game-icon game-icon-wyvern"

        // Huecos de equipamiento
        getSlot: name => SLOTS[name] || null,
        slots:   () => Object.keys(SLOTS).map(k => Object.assign({ key: k }, SLOTS[k])),

        // NPCs
        getNpc: name => get(npcIndex, name),
        npcs:   () => list(npcIndex),

        // Estados alterados
        getStatus: name => get(statusIndex, name),
        statuses:  () => list(statusIndex)
    });
})();

// POPUPS - EQUIPAMIENTO, ARMAMENTO E INVENTARIO (modal único)
document.addEventListener("DOMContentLoaded", function () {

    if (window.__psItemsInit) return;
    window.__psItemsInit = true;

    if (!window.PSData) {
        console.warn("PSData no está cargado: el script BIBLIOTECA - DATOS debe ir antes.");
        return;
    }
    const PS = window.PSData;

    // Listas con cards (valor de data-field)
    const listFields = ["armamento", "inventario"];

    /* 1) UTILIDADES */
    const capitalize = w => w.charAt(0).toUpperCase() + w.slice(1);

    const esc = s => String(s).replace(/[&<>"']/g, c =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

    const clean = s => s.replace(/\u00a0/g, " ").trim();

    // Datos del ítem desde la biblioteca; si no existe, valores por defecto
    function getData(rawName) {
        return PS.getItem(rawName) || {
            name: capitalize(rawName),
            type: "Objeto",
            description: "Sin descripción.",
            stats: []
        };
    }

    /* 2) MODAL ÚNICO */
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.id = "item-modal";
    modal.innerHTML = `
        <div class="modal-panel">
            <button class="modal-close" id="modal-close" type="button">×</button>
            <div class="modal-icon" id="modal-icon"></div>
            <div class="modal-tag" id="modal-tag"></div>
            <h3 class="modal-title" id="modal-title"></h3>
            <p class="modal-desc" id="modal-desc"></p>
            <div class="modal-stats" id="modal-stats"></div>
        </div>
    `;
    document.body.appendChild(modal);

    const closeModal = () => modal.classList.remove("is-open");
    modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
    modal.querySelector("#modal-close").addEventListener("click", closeModal);
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

    // Copia --group y sus variantes de opacidad del perfil al modal
    function syncGroupColors() {
        const src = document.querySelector(".perfilsencillo");
        if (!src) return;
        ["", "-75", "-50", "-25", "-15"].forEach(suffix => {
            const value = src.style.getPropertyValue("--group" + suffix).trim();
            if (value) modal.style.setProperty("--group" + suffix, value);
        });
    }

    function openPopup(rawName) {
        const d = getData(rawName);

        const html = PS.iconHTML(d);
        const iconBox = modal.querySelector("#modal-icon");
        iconBox.innerHTML = html;
        iconBox.style.display = html ? "" : "none";

        modal.querySelector("#modal-tag").textContent = d.tag || d.type || "";
        modal.querySelector("#modal-title").textContent = d.name;
        modal.querySelector("#modal-desc").textContent = d.description || "";

        const stats = Array.isArray(d.stats) ? d.stats : (d.stats ? [["", d.stats]] : []);
        modal.querySelector("#modal-stats").innerHTML = stats
            .map(s => `<div><span>${esc(s[0])}</span><b>${esc(s[1])}</b></div>`).join("");

        syncGroupColors();
        modal.classList.add("is-open");
    }

    /* 3) EQUIPAMIENTO
       Etiqueta e icono por defecto vienen de la biblioteca (PSData.getSlot).
       Vacío: muestra "Vacío" con el icono propio del hueco y NO abre popup.
       Ocupado: clase .ocupado, datos e icono del ítem y popup al clic. */
    document.querySelectorAll(".ps-equip-slot[data-field]").forEach(slot => {
        const name = slot.dataset.field;
        const cfg = PS.getSlot(name);
        if (!cfg) return;

        const field = slot.querySelector(".ps-field") || document.querySelector(`.ps-field.${name}`);
        const source = field ? field.querySelector(".field_uneditable") : null;
        const raw = source ? clean(source.textContent) : "";
        const isEmpty = !raw || raw === "-";

        if (source) source.style.display = "none";
        const flabel = field ? field.querySelector(".ps-flabel") : null;
        if (flabel) flabel.style.display = "none";

        const iconEl = document.createElement("div");
        iconEl.className = "ps-equip-slot__icon";

        const textEl = document.createElement("div");
        textEl.className = "ps-equip-slot__text";

        const labelEl = document.createElement("div");
        labelEl.className = "ps-equip-slot__label";
        labelEl.textContent = cfg.label;

        const itemEl = document.createElement("div");
        itemEl.className = "ps-equip-slot__item";

        textEl.append(labelEl, itemEl);
        slot.append(iconEl, textEl);

        if (isEmpty) {
            itemEl.classList.add("is-empty");
            itemEl.textContent = "Vacío";
            iconEl.innerHTML = PS.iconHTML({ icon: cfg.icon, name: cfg.label });
            return; // sin popup
        }

        const d = getData(raw);

        slot.classList.add("ocupado");
        slot.dataset.item = PS.slug(raw);
        slot.style.cursor = "pointer";
        itemEl.textContent = d.name;
        iconEl.innerHTML = PS.iconHTML(d);

        slot.addEventListener("click", e => {
            if (e.target.closest(".field_editable")) return;
            openPopup(raw);
        });
    });

    /* 4) ÍTEMS MANUALES: <item class="manzana"> en .perfilsencillo */
    document.querySelectorAll(".perfilsencillo item").forEach(item => {
        const cls = Array.from(item.classList).find(c => PS.getItem(c));
        if (!cls) return;
        item.style.cursor = "pointer";
        item.addEventListener("click", () => openPopup(cls));
    });

    /* 5) ARMAMENTO E INVENTARIO
       Separados por | ; o salto de línea. nombre_cantidad (sin _número = 1) */
    function parseList(text) {
        const result = new Map();
        text.split(/[\n|;]+/).forEach(line => {
            line = clean(line);
            if (!line || line === "-") return;

            const match = line.match(/^(.+?)(?:_(\d+))?$/);
            const rawName = match[1].trim();
            const qty = match[2] ? parseInt(match[2], 10) : 1;
            const key = PS.slug(rawName);
            if (!key) return;

            if (result.has(key)) result.get(key).qty += qty;
            else result.set(key, { rawName, qty });
        });
        return result;
    }

    const hideEl = el => el.style.setProperty("display", "none", "important");

    function hideAvisos(container) {
        container.querySelectorAll(".aviso").forEach(hideEl);
        const section = container.closest("section");
        if (section) section.querySelectorAll(":scope > .aviso").forEach(hideEl);
    }

    listFields.forEach(fieldName => {
        const container = document.querySelector(`[data-field="${fieldName}"]`);
        if (!container) return;

        const source = container.querySelector(".field_uneditable");
        if (!source) return;

        const clone = source.cloneNode(true);
        clone.querySelectorAll("br").forEach(br => br.replaceWith("\n"));
        const items = parseList(clone.textContent);

        if (items.size === 0) return; // vacío: se mantiene el aviso y no se genera nada

        source.style.display = "none";
        const label = container.querySelector(".ps-flabel");
        if (label) label.style.display = "none";

        hideAvisos(container);
        const observer = new MutationObserver(() => hideAvisos(container));
        observer.observe(container.closest("section") || container, { childList: true });
        setTimeout(() => observer.disconnect(), 3000);

        const list = document.createElement("div");
        list.className = `ps-item-list ps-item-list-${fieldName}`;

        items.forEach(({ rawName, qty }, key) => {
            const d = getData(rawName);
            const qtyText = (qty === 1 && d.qtyLabel) ? d.qtyLabel : `x${qty}`;

            const card = document.createElement("div");
            card.className = d.rarity ? `ps-item-card ${d.rarity}` : "ps-item-card";
            card.dataset.item = key;
            card.style.cursor = "pointer";
            card.innerHTML = `
                <div class="ps-item-card__icon">${PS.iconHTML(d)}</div>
                <div class="ps-item-card__name">${esc(d.name)}</div>
                <div class="ps-item-card__qty">${esc(d.type)}&nbsp;·&nbsp;${esc(qtyText)}</div>
            `;
            card.addEventListener("click", () => openPopup(rawName));
            list.appendChild(card);
        });

        container.appendChild(list);
    });
});

// HABILIDADES - PERFIL SENCILLO
(function () {

    let lastSignature = "";

    function build() {
        if (!window.PSData) {
            console.warn("PSData no está cargado: el script BIBLIOTECA - DATOS debe ir antes.");
            return;
        }
        const PS = window.PSData;

        const container = document.querySelector('.ps-habilidades[data-field="habilidades"]');
        if (!container) return;

        const clean = s => (s || "").replace(/\u00a0/g, " ").trim();

        // Texto visible del campo; si está vacío, la opción seleccionada del <select>
        const readField = cls => {
            const field = document.querySelector(`.ps-field.${cls}`);
            if (!field) return "";
            const el = field.querySelector(".field_uneditable");
            let txt = el ? clean(el.textContent) : "";
            if (!txt) {
                const opt = field.querySelector("select option:checked");
                txt = opt ? clean(opt.textContent) : "";
            }
            return txt;
        };

        const skills = [];
        const seen = new Set();

        // origin: "clase" | "trasfondo" | "" (campo Habilidades)
        function addSkill(name, requireKnown, forcePassive, origin) {
            const key = PS.normalize(name);
            if (!key || seen.has(key)) return;
            const known = PS.hasSkill(name);
            if (requireKnown && !known) return; // "Sin clase", "Ningún"... no crean card
            seen.add(key);
            skills.push({
                name: known ? PS.getSkill(name).name : name,
                desc: known ? PS.getSkillDesc(name) : "Sin descripción.",
                passive: forcePassive || (known && PS.isPassive(name)),
                origin: origin || "",
                key: PS.slug(name)
            });
        }

        // 1) Clase y Trasfondo (van primero)
        addSkill(readField("clase"), true, false, "clase");
        addSkill(readField("trasfondo"), true, false, "trasfondo");

        // 2) Campo de perfil "Habilidades": separadas por | ; o salto de línea
        const source = container.querySelector(".field_uneditable");

        if (source) {
            const clone = source.cloneNode(true);
            clone.querySelectorAll("br").forEach(br => br.replaceWith("\n"));

            clone.textContent.split(/[\n|;]+/).forEach(line => {
                line = clean(line);
                if (!line || line === "-") return;

                let name = line;
                let forcePassive = false;
                const m = line.match(/^(.*?)\s*\[(.*?)\]$/);
                if (m) {
                    name = m[1].trim();
                    forcePassive = PS.normalize(m[2]) === "pasiva";
                }
                addSkill(name, false, forcePassive, "");
            });
        }

        if (skills.length === 0) return;

        // Solo reconstruye si algo ha cambiado (evita bucles con el observer)
        const signature = JSON.stringify(skills);
        const currentCards = container.querySelectorAll(".ps-hab-card").length;
        if (signature === lastSignature && currentCards === skills.length) return;
        lastSignature = signature;

        container.querySelectorAll(".ps-hab-card").forEach(c => c.remove());

        if (source) source.style.display = "none";
        const label = container.querySelector(".ps-flabel");
        if (label) label.style.display = "none";

        skills.forEach(s => {
            const card = document.createElement("div");
            card.className = "ps-hab-card" + (s.origin ? " ps-hab-card--" + s.origin : "");
            card.dataset.key = s.key;

            const head = document.createElement("div");
            head.className = "ps-hab-card__head";

            const nameEl = document.createElement("div");
            nameEl.className = "ps-hab-card__name";
            nameEl.textContent = s.name;
            head.appendChild(nameEl);

            if (s.passive) {
                const statusEl = document.createElement("span");
                statusEl.className = "ps-hab-card__status";
                statusEl.textContent = "Pasiva";
                head.appendChild(statusEl);
            }

            const descEl = document.createElement("div");
            descEl.className = "ps-hab-card__desc";
            descEl.textContent = s.desc;

            card.append(head, descEl);
            container.appendChild(card);
        });
    }

    // Ejecuciones iniciales
    document.addEventListener("DOMContentLoaded", build);
    window.addEventListener("load", build);
    [500, 1500, 3000].forEach(ms => setTimeout(build, ms));

    // Vigila solo los campos que importan (no toda la página) durante 4 segundos
    let timer = null;
    function startObserver() {
        const targets = document.querySelectorAll(
            '.ps-build, .ps-habilidades[data-field="habilidades"] .ps-fcontent'
        );
        if (!targets.length) return;
        const observer = new MutationObserver(() => {
            clearTimeout(timer);
            timer = setTimeout(build, 100);
        });
        targets.forEach(t => observer.observe(t, { childList: true, subtree: true, characterData: true }));
        setTimeout(() => observer.disconnect(), 4000);
    }
    if (document.body) startObserver();
    else document.addEventListener("DOMContentLoaded", startObserver);
})();

// TABLILLA DE COMBATE
(function () {
  "use strict";

  if (!window.PSData) {
    console.warn("PSData no está cargado: el script BIBLIOTECA - DATOS debe ir antes.");
    return;
  }
  const PS = window.PSData;

  /* --- Vocabulario fijo del skin --- */
  const STAT_LABELS = { fue: "Fuerza", dex: "Destreza", res: "Resistencia", int: "Inteligencia", vol: "Voluntad" };

  const SECTION_LABELS = {
    stats: "Estadísticas",
    pv: "Puntos de vida",
    calc: "Cálculo de turno",
    damage: "Daño recibido este turno",
    action: "Acción de este turno",
    log: "Historial",
    skills: "Habilidades",
    items: "Inventario disponible",
    npclist: "Enemigos en combate"
  };

  const CALC_ROW_LABELS = {
    physical: "Ataque físico",
    magic: "Ataque mágico",
    "damage-physical": "Daño físico entrante",
    "damage-magic": "Daño mágico entrante"
  };

  const ENTRY_STATUS_LABELS = { "sin-usar": "Sin usar", "en-uso": "En uso", "usada": "Usada", "pasiva": "Pasiva" };

  function sanitizeString(str) {
    if (!str) return "";
    return str
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
  }

  /* --- Mapeador COMBATE a estructura HTML --- */
  function parseFtdTablet(tablet) {
    if (tablet.dataset.parsed) return;

    const text = tablet.innerHTML.replace(/<br\s*\/?>/gi, "\n");

    function getTag(tag) {
      const match = text.match(new RegExp("COMBATE:" + tag + "([\\s\\S]*?)(?=COMBATE:|$)", "i"));
      return match ? sanitizeString(match[1]) : "";
    }

    const isNpc = tablet.classList.contains("combat-tablet--npc");

    if (isNpc) {
      const npcKey = getTag("NPC_KEY");
      if (npcKey) tablet.dataset.npc = npcKey;
      const npcSkills = getTag("NPC_HABILIDADES");
      if (npcSkills) tablet.dataset.npcSkills = npcSkills;

      tablet.style.setProperty("--group", "var(--clr-npc)");
    }

    const estadoAlt = getTag("ESTADO_ALTERADO");
    if (estadoAlt) tablet.dataset.estadoAlterado = estadoAlt;

    const avatar = getTag("AVATAR");
    if (avatar) tablet.style.setProperty("--avatar", "url('" + avatar + "')");

    const nombre = getTag("NOMBRE");
    if (nombre) tablet.style.setProperty("--nombre", "'" + nombre + "'");

    const rol = getTag("ROL");
    if (rol) tablet.style.setProperty("--rol", "'" + rol + "'");

    const rawStats = getTag("ESTADISTICAS");
    if (rawStats) {
      rawStats.split(",").forEach(pair => {
        const [k, v] = pair.split(":").map(s => s.trim());
        if (k && v) {
          const keyMap = { fue: "fuerza", dex: "destreza", res: "resistencia", int: "inteligencia", vol: "voluntad" };
          if (keyMap[k]) tablet.style.setProperty("--" + keyMap[k], v);
        }
      });
    }

    const rawPv = getTag("PV");
    if (rawPv) {
      rawPv.split(",").forEach(pair => {
        const [k, v] = pair.split(":").map(s => s.trim());
        if (k === "max") tablet.style.setProperty("--pv-max", v);
        if (k === "actual") tablet.style.setProperty("--pv-actual", v);
      });
    }

    const rawDice = getTag("DADOS");
    if (rawDice) {
      rawDice.split(",").forEach(pair => {
        const [k, v] = pair.split(":").map(s => s.trim());
        if (k === "fisico") tablet.style.setProperty("--dado-fisico", v);
        if (k === "magico") tablet.style.setProperty("--dado-magico", v);
      });
    }

    const rawDmg = getTag("DANO_RECIBIDO");
    if (rawDmg) {
      rawDmg.split(",").forEach(pair => {
        const [k, v] = pair.split(":").map(s => s.trim());
        if (k === "fisico") tablet.style.setProperty("--dano-fisico-recibido", v);
        if (k === "magico") tablet.style.setProperty("--dano-magico-recibido", v);
      });
    }

    const parseMods = (tag) => {
      const val = getTag(tag);
      if (!val) return '<span class="calc-mod">+0</span><span class="calc-mod">-0</span>';
      return val.split(",").map(m => '<span class="calc-mod">' + m.trim() + '</span>').join("");
    };

    const parseListToLi = (rawText) => {
      if (!rawText) return "";
      return rawText
        .split("\n")
        .map(line => line.trim().replace(/^[-*]\s*/, ""))
        .filter(Boolean)
        .map(line => `<li>${line}</li>`)
        .join("");
    };

    const parseEntries = (rawText) => {
      if (!rawText) return "";
      return rawText
        .split("\n")
        .map(line => line.trim().replace(/^[-*]\s*/, ""))
        .filter(Boolean)
        .map(line => {
          const match = line.match(/^(.*?)\s*\[(.*?)\]$/);
          if (match) {
            const name = match[1].trim();
            const status = match[2].trim().toLowerCase().replace(/\s+/g, "-");
            return `<div class="combat-entry" data-status="${status}" data-nombre="${name}"></div>`;
          }
          return `<div class="combat-entry" data-status="sin-usar" data-nombre="${line}"></div>`;
        })
        .join("");
    };

    const actionText = getTag("ACCION");
    const logText = parseListToLi(getTag("HISTORIAL"));
    const skillsText = parseEntries(getTag("HABILIDADES"));
    const itemsText = parseEntries(getTag("INVENTARIO"));
    const npcsText = parseListToLi(getTag("NPCS_ESCENA"));

    let html = `
      <div class="combat-tablet__head"><div class="combat-tablet__avatar"></div><div><div class="combat-tablet__name"></div><div class="combat-tablet__tag"></div></div></div>
      <div class="combat-status-list"></div>
      <div class="combat-section" data-block="stats"><h4></h4>
        <div class="stat-grid combat-stat-grid">
          <div class="stat-card"><span class="v-fue"><b></b></span><span></span></div>
          <div class="stat-card"><span class="v-dex"><b></b></span><span></span></div>
          <div class="stat-card"><span class="v-res"><b></b></span><span></span></div>
          <div class="stat-card"><span class="v-int"><b></b></span><span></span></div>
          <div class="stat-card"><span class="v-vol"><b></b></span><span></span></div>
        </div>
      </div>
      <div class="combat-section" data-block="pv"><h4></h4><div class="pv-bar"><div class="pv-bar__fill"></div></div><div class="pv-readout"><b class="pv-now"></b><span class="pv-cap"></span></div></div>
      <div class="combat-section" data-block="calc"><h4></h4>
        <div class="calc-row" data-calc="physical"><div class="calc-row__label"></div><div class="calc-row__formula" data-formula="add"><span class="calc-op v-fue"></span><span class="calc-op v-dex"></span><span class="calc-dice v-dfis"></span>${parseMods("MODIF_FISICO")}<span class="calc-total total-fisico"></span></div></div>
        <div class="calc-row" data-calc="magic"><div class="calc-row__label"></div><div class="calc-row__formula" data-formula="add"><span class="calc-op v-int"></span><span class="calc-op v-vol"></span><span class="calc-dice v-dmag"></span>${parseMods("MODIF_MAGICO")}<span class="calc-total total-magico"></span></div></div>
      </div>
      <div class="combat-section combat-damage-section" data-block="damage"><h4></h4>
        <div class="calc-row calc-damage-physical" data-calc="damage-physical"><div class="calc-row__label"></div><div class="calc-row__formula" data-formula="sub"><span class="calc-op v-dmg-p"></span><span class="calc-op v-res"></span>${parseMods("MODIF_DANO_FISICO")}<span class="calc-total calc-total--damage res-dmg-p"></span></div></div>
        <div class="calc-row calc-damage-magic" data-calc="damage-magic"><div class="calc-row__label"></div><div class="calc-row__formula" data-formula="sub"><span class="calc-op v-dmg-m"></span><span class="calc-op v-res"></span>${parseMods("MODIF_DANO_MAGICO")}<span class="calc-total calc-total--damage res-dmg-m"></span></div></div>
      </div>
    `;

    if (!isNpc) {
      html += `
        <div class="combat-section" data-block="action"><h4></h4><div class="combat-text-box">${actionText}</div></div>
        <div class="combat-section" data-block="skills"><h4></h4><div class="combat-entry-list">${skillsText}</div></div>
      `;
    } else {
      html += `<div class="combat-section" data-block="skills"><h4></h4><div class="combat-entry-list"></div></div>`;
    }

    html += `<div class="combat-section" data-block="items"><h4></h4><div class="combat-entry-list">${itemsText}</div></div>`;

    if (!isNpc) {
      html += `<div class="combat-section" data-block="log"><h4></h4><ul class="damage-history-list">${logText}</ul></div>`;
    } else {
      html += `<div class="combat-section combat-section--npc-list" data-block="npclist"><h4></h4><div class="npc-enemies-list"><ul>${npcsText}</ul></div></div>`;
    }

    tablet.innerHTML = html;
    tablet.dataset.parsed = "true";
  }

  function getCSSVar(element, varName) {
    if (!element) return "";
    let val = element.style ? element.style.getPropertyValue(varName) : "";
    if (!val || !val.trim()) {
      val = getComputedStyle(element).getPropertyValue(varName);
    }
    if (!val) return "";
    return val.trim().replace(/^['"]|['"]$/g, "");
  }

  function getRowModifiersTotal(rowElement) {
    let modTotal = 0;
    if (!rowElement) return modTotal;
    rowElement.querySelectorAll(".calc-mod").forEach((modEl) => {
      modTotal += parseFloat(modEl.textContent.replace("+", "")) || 0;
    });
    return modTotal;
  }

  /* --- Entrada de habilidad / ítem --- */
  function escHtml(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function renderEntry(entry) {
    const rawName = entry.dataset.nombre || "";
    const skill = PS.getSkill(rawName);
    const item = skill ? null : PS.getItem(rawName);

    const name = skill ? skill.name : (item ? item.name : rawName);
    const desc = skill ? skill.desc : (item ? (item.description || "") : "");

    // Solo las habilidades pasivas fuerzan el estado "Pasiva"
    let status = entry.dataset.status || "";
    if (skill && skill.passive) {
      status = "pasiva";
      entry.dataset.status = "pasiva";
    }

    // Stats: solo para ítems
    let statsHtml = "";
    if (item) {
      const stats = Array.isArray(item.stats)
        ? item.stats
        : (item.stats ? [["", item.stats]] : []);
      if (stats.length) {
        statsHtml = '<div class="combat-entry__stats">' +
          stats.map(s =>
            "<span>" +
              (s[0] ? "<em>" + escHtml(s[0]) + "</em> " : "") +
              "<b>" + escHtml(s[1]) + "</b>" +
            "</span>"
          ).join("") +
        "</div>";
      }
    }

    entry.innerHTML =
      '<div class="combat-entry__head">' +
        '<span class="combat-entry__name">' + name + "</span>" +
        '<span class="combat-entry__status">' + (ENTRY_STATUS_LABELS[status] || status) + "</span>" +
      "</div>" +
      '<div class="combat-entry__desc">' + desc + "</div>" +
      statsHtml;
  }

  function labelStaticSkeleton() {
    document.querySelectorAll(".combat-section[data-block]").forEach((section) => {
      const h4 = section.querySelector(":scope > h4");
      if (h4) h4.textContent = SECTION_LABELS[section.dataset.block] || "";
    });

    document.querySelectorAll(".calc-row[data-calc]").forEach((row) => {
      const label = row.querySelector(":scope > .calc-row__label");
      if (label) label.textContent = CALC_ROW_LABELS[row.dataset.calc] || "";
    });

    document.querySelectorAll(".calc-row__formula[data-formula]").forEach((formula) => {
      if (formula.dataset.labeled) return;
      formula.dataset.labeled = "true";

      const opSymbol = formula.dataset.formula === "sub" ? "−" : "+";
      const baseOps = Array.from(formula.querySelectorAll(":scope > .calc-op, :scope > .calc-dice"));
      baseOps.forEach((el, i) => {
        if (i > 0) {
          const sep = document.createElement("span");
          sep.className = "calc-plus";
          sep.textContent = opSymbol;
          formula.insertBefore(sep, el);
        }
      });
      const total = formula.querySelector(":scope > .calc-total");
      if (total) {
        const eq = document.createElement("span");
        eq.className = "calc-eq";
        eq.textContent = "=";
        formula.insertBefore(eq, total);
      }
    });

    document.querySelectorAll(".pv-readout").forEach((readout) => {
      const cap = readout.querySelector(".pv-cap");
      if (!cap || readout.dataset.labeled) return;
      readout.dataset.labeled = "true";

      const sep = document.createElement("span");
      sep.className = "pv-sep";
      sep.textContent = "/";
      readout.insertBefore(sep, cap);
      const unit = document.createElement("span");
      unit.className = "pv-unit";
      unit.textContent = "PV";
      readout.appendChild(unit);
    });

    document.querySelectorAll(".stat-card").forEach((card) => {
      const wrap = card.querySelector('span[class*="v-"]');
      const label = card.querySelector("span:last-child");
      if (!wrap || !label || wrap === label) return;
      const match = wrap.className.match(/v-(\w+)/);
      if (match) label.textContent = STAT_LABELS[match[1]] || "";
    });

    document.querySelectorAll(".combat-entry[data-status]").forEach(renderEntry);
  }

  function parseStatusKey(raw) {
    const match = raw.match(/^(.+?)_(\d+)\s*\/\s*(\d+)$/);
    if (match) {
      return {
        key: match[1].trim().toLowerCase(),
        current: parseInt(match[2], 10),
        max: parseInt(match[3], 10)
      };
    }
    return { key: raw.trim().toLowerCase(), current: null, max: null };
  }

  function renderStatusBanners(tablet) {
    const list = tablet.querySelector(".combat-status-list");
    if (!list) return;
    const raw = tablet.dataset.estadoAlterado || "";
    const items = raw.split(",").map((k) => k.trim()).filter(Boolean);

    list.innerHTML = items
      .map((item) => {
        const parsed = parseStatusKey(item);
        const effect = PS.getStatus(parsed.key);
        if (!effect) return "";

        const hasTurns = parsed.current !== null && parsed.max !== null;
        const turnsBadge = hasTurns
          ? `<span class="status-banner__turns">${parsed.current}/${parsed.max}&nbsp;turnos</span>`
          : "";

        return `<div class="status-banner">${turnsBadge}<p>Este personaje ha sido&nbsp;<b>${effect.label}</b>: ${effect.desc}</p></div>`;
      })
      .filter(Boolean)
      .join("");
  }

  function normalizeSkillKey(str) {
    return PS.normalize(str);
  }

  /* --- Renderizado unificado para habilidades de NPC --- */
  function renderNpcSkills(tablet, npc) {
    const section = tablet.querySelector('.combat-section[data-block="skills"]');
    const list = section && section.querySelector(".combat-entry-list");
    if (!list) return;

    list.innerHTML = "";

    const overridesRaw = tablet.dataset.npcSkills || "";
    const overrides = {};

    const lines = overridesRaw
      .replace(/<br\s*\/?>/gi, "\n")
      .split("\n")
      .map((l) => l.trim().replace(/^[-*]\s*/, ""))
      .filter(Boolean);

    lines.forEach((line) => {
      // 1. Formato unificado multilínea: Nombre [estado]
      const bracketMatch = line.match(/^(.*?)\s*\[(.*?)\]$/);
      if (bracketMatch) {
        const name = bracketMatch[1].trim();
        const status = bracketMatch[2].trim().toLowerCase().replace(/\s+/g, "-");
        if (name) overrides[normalizeSkillKey(name)] = { name, status };
        return;
      }

      // 2. Soporte de compatibilidad en línea: nombre:estado, nombre2:estado
      line.split(",").forEach((item) => {
        const separator = item.lastIndexOf(":");
        if (separator !== -1) {
          const name = item.slice(0, separator).trim();
          const status = item.slice(separator + 1).trim().toLowerCase().replace(/\s+/g, "-");
          if (name) overrides[normalizeSkillKey(name)] = { name, status };
        }
      });
    });

    // Habilidades del NPC: texto simple u objeto { name, status }
    const skills = npc
      ? (npc.skills || []).map((s) =>
          typeof s === "string"
            ? { name: s, status: "sin-usar" }
            : { name: s.name, status: s.status || "sin-usar" })
      : [];

    Object.keys(overrides).forEach((key) => {
      const existing = skills.find((s) => normalizeSkillKey(s.name) === key);
      if (existing) {
        existing.status = overrides[key].status;
      } else {
        skills.push({
          name: overrides[key].name,
          status: overrides[key].status
        });
      }
    });

    skills.forEach((s) => {
      const entry = document.createElement("div");
      entry.className = "combat-entry";
      entry.dataset.status = s.status || "sin-usar";
      entry.dataset.nombre = s.name;

      list.appendChild(entry);
      renderEntry(entry); // aquí se aplica "Pasiva" automáticamente si la biblioteca lo dice
    });
  }

  function renderTablet(tablet) {
    parseFtdTablet(tablet);

    const npcKey = tablet.dataset.npc;
    const npc = npcKey ? PS.getNpc(npcKey) : null;

    /* 1. Identidad */
    const nameEl = tablet.querySelector(".combat-tablet__name");
    const tagEl = tablet.querySelector(".combat-tablet__tag");
    if (nameEl) nameEl.textContent = npc ? npc.name : getCSSVar(tablet, "--nombre");

    if (tagEl) {
      const baseRole = npc ? (npc.role || getCSSVar(tablet, "--rol")) : getCSSVar(tablet, "--rol");
      if (npc && npc.groupInfo) {
        tagEl.textContent = baseRole ? `${baseRole} · ${npc.groupInfo}` : npc.groupInfo;
      } else {
        tagEl.textContent = baseRole;
      }
    }

    if (npc) tablet.style.setProperty("--avatar", `url('${npc.avatar}')`);

    /* 2. Estados alterados */
    renderStatusBanners(tablet);

    /* 3. Estadísticas */
    const fue = npc ? npc.stats.fue : parseFloat(getCSSVar(tablet, "--fuerza")) || 0;
    const dex = npc ? npc.stats.dex : parseFloat(getCSSVar(tablet, "--destreza")) || 0;
    const res = npc ? npc.stats.res : parseFloat(getCSSVar(tablet, "--resistencia")) || 0;
    const intel = npc ? npc.stats.int : parseFloat(getCSSVar(tablet, "--inteligencia")) || 0;
    const vol = npc ? npc.stats.vol : parseFloat(getCSSVar(tablet, "--voluntad")) || 0;

    tablet.querySelectorAll(".v-fue b").forEach((e) => { e.textContent = fue; });
    tablet.querySelectorAll(".v-dex b").forEach((e) => { e.textContent = dex; });
    tablet.querySelectorAll(".v-res b").forEach((e) => { e.textContent = res; });
    tablet.querySelectorAll(".v-int b").forEach((e) => { e.textContent = intel; });
    tablet.querySelectorAll(".v-vol b").forEach((e) => { e.textContent = vol; });

    tablet.querySelectorAll(".calc-op.v-fue").forEach((e) => { e.textContent = fue; });
    tablet.querySelectorAll(".calc-op.v-dex").forEach((e) => { e.textContent = dex; });
    tablet.querySelectorAll(".calc-op.v-res").forEach((e) => { e.textContent = res; });
    tablet.querySelectorAll(".calc-op.v-int").forEach((e) => { e.textContent = intel; });
    tablet.querySelectorAll(".calc-op.v-vol").forEach((e) => { e.textContent = vol; });

    if (npc || tablet.dataset.npcSkills) {
      renderNpcSkills(tablet, npc);
    }

    /* 4. Puntos de vida */
    let calculatedMaxPv = 1;
    const customMaxPv = parseFloat(getCSSVar(tablet, "--pv-max"));

    if (!isNaN(customMaxPv) && customMaxPv > 0) {
      calculatedMaxPv = customMaxPv;
    } else if (npc) {
      calculatedMaxPv = npc.maxPv !== undefined ? npc.maxPv : (res * 5);
    } else {
      calculatedMaxPv = 1;
    }
    const maxPv = Math.max(calculatedMaxPv, 1);

    const rawCurPv = getCSSVar(tablet, "--pv-actual");
    const parsedCurPv = rawCurPv !== "" ? parseFloat(rawCurPv) : maxPv;
    const curPv = Math.min(Math.max(isNaN(parsedCurPv) ? maxPv : parsedCurPv, 0), maxPv);

    const bar = tablet.querySelector(".pv-bar");
    if (bar) {
      bar.style.setProperty("--pv-max", maxPv);
      bar.style.setProperty("--pv-current", curPv);
      const pct = (curPv / maxPv) * 100;
      bar.dataset.level = pct <= 25 ? "danger" : pct <= 50 ? "warn" : "ok";
    }
    const nowEl = tablet.querySelector(".pv-now");
    const capEl = tablet.querySelector(".pv-cap");
    if (nowEl) nowEl.textContent = curPv;
    if (capEl) capEl.textContent = maxPv;

    /* 5. Cálculo de ataque físico / mágico */
    const dFisRaw = getCSSVar(tablet, "--dado-fisico");
    const dMagRaw = getCSSVar(tablet, "--dado-magico");
    tablet.querySelectorAll(".v-dfis").forEach((e) => { e.textContent = dFisRaw !== "" ? dFisRaw : "—"; });
    tablet.querySelectorAll(".v-dmag").forEach((e) => { e.textContent = dMagRaw !== "" ? dMagRaw : "—"; });

    const totalFisEl = tablet.querySelector(".total-fisico");
    if (totalFisEl) {
      if (dFisRaw !== "") {
        const mods = getRowModifiersTotal(totalFisEl.closest(".calc-row"));
        totalFisEl.textContent = fue + dex + (parseFloat(dFisRaw) || 0) + mods;
      } else {
        totalFisEl.textContent = "—";
      }
    }
    const totalMagEl = tablet.querySelector(".total-magico");
    if (totalMagEl) {
      if (dMagRaw !== "") {
        const mods = getRowModifiersTotal(totalMagEl.closest(".calc-row"));
        totalMagEl.textContent = intel + vol + (parseFloat(dMagRaw) || 0) + mods;
      } else {
        totalMagEl.textContent = "—";
      }
    }

    /* 6. Daño recibido */
    const dmgPVal = parseFloat(getCSSVar(tablet, "--dano-fisico-recibido"));
    const dmgMVal = parseFloat(getCSSVar(tablet, "--dano-magico-recibido"));

    const boxPhys = tablet.querySelector(".calc-damage-physical");
    if (boxPhys) {
      if (!isNaN(dmgPVal) && dmgPVal > 0) {
        boxPhys.style.display = "block";
        tablet.querySelectorAll(".v-dmg-p").forEach((e) => { e.textContent = dmgPVal; });
        const mods = getRowModifiersTotal(boxPhys);
        const resP = Math.max(dmgPVal - res + mods, 0);
        const resEl = tablet.querySelector(".res-dmg-p");
        if (resEl) {
          const formatted = resP > 0 ? ("-" + resP + "\u00A0PV") : "0\u00A0PV";
          resEl.textContent = formatted;
          resEl.classList.toggle("calc-total--active", resP > 0);
        }
      } else {
        boxPhys.style.display = "none";
      }
    }

    const boxMag = tablet.querySelector(".calc-damage-magic");
    if (boxMag) {
      if (!isNaN(dmgMVal) && dmgMVal > 0) {
        boxMag.style.display = "block";
        tablet.querySelectorAll(".v-dmg-m").forEach((e) => { e.textContent = dmgMVal; });
        const mods = getRowModifiersTotal(boxMag);
        const resM = Math.max(dmgMVal - res + mods, 0);
        const resEl = tablet.querySelector(".res-dmg-m");
        if (resEl) {
          const formatted = resM > 0 ? ("-" + resM + "\u00A0PV") : "0\u00A0PV";
          resEl.textContent = formatted;
          resEl.classList.toggle("calc-total--active", resM > 0);
        }
      } else {
        boxMag.style.display = "none";
      }
    }

    const damageSection = tablet.querySelector(".combat-damage-section");
    if (damageSection) {
      const hasPhys = !isNaN(dmgPVal) && dmgPVal > 0;
      const hasMag = !isNaN(dmgMVal) && dmgMVal > 0;
      damageSection.style.display = hasPhys || hasMag ? "block" : "none";
    }
  }

  function initCombatTablets() {
    document.querySelectorAll(".combat-tablet").forEach(renderTablet);
    labelStaticSkeleton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCombatTablets);
  } else {
    initCombatTablets();
  }
})();