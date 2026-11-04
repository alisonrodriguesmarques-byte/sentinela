(() => {
  const emojiPattern =
    /\p{Regional_Indicator}{2}|\p{Extended_Pictographic}(?:\uFE0F|\uFE0E)?(?:\p{Emoji_Modifier})?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F|\uFE0E)?(?:\p{Emoji_Modifier})?)*/gu;
  const icons = new Map([
    ["🔑", "key"], ["📺", "screen"], ["🚪", "door"], ["⚡", "bolt"],
    ["📋", "clipboard"], ["🌡️", "thermometer"], ["🩺", "stethoscope"],
    ["💊", "pill"], ["➕", "plus"], ["👁️", "eye"], ["🛡️", "shield"],
    ["ℹ️", "info"], ["💾", "save"], ["👥", "users"], ["🔄", "refresh"],
    ["🔍", "search"], ["📁", "folder"], ["👑", "crown"], ["🔒", "lock"],
    ["↗️", "open"], ["🗑️", "trash"], ["⏳", "hourglass"], ["👤", "user"],
    ["📦", "box"], ["⚠️", "warning"], ["🟢", "status"], ["❌", "close"],
    ["📥", "inbox"], ["✅", "check"], ["🕒", "clock"]
  ]);
  const accessibleLabels = new Map([
    ["👁️", "Mostrar senha"],
    ["🔒", "Ocultar senha"],
    ["🗑️", "Excluir"]
  ]);
  const skipTags = new Set(["SCRIPT", "STYLE", "TEXTAREA", "NOSCRIPT"]);

  const style = document.createElement("style");
  style.textContent = `
    canvas.canvas-icon {
      display: inline-block;
      width: 1.15em;
      height: 1.15em;
      margin-inline-end: 0.18em;
      vertical-align: -0.22em;
    }
  `;
  document.head.append(style);

  function drawIcon(context, type) {
    const color = {
      warning: "#d97706",
      status: "#16a34a",
      close: "#dc2626",
      check: "#16a34a",
      pill: "#db2777",
      thermometer: "#e11d48",
      shield: "#0891b2",
      users: "#6d28d9",
      plus: "#7c3aed",
      bolt: "#ea580c",
      info: "#2563eb"
    }[type] || "#52657d";
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = 3.5;
    context.lineCap = "round";
    context.lineJoin = "round";

    const line = (...points) => {
      context.beginPath();
      context.moveTo(points[0], points[1]);
      for (let i = 2; i < points.length; i += 2) context.lineTo(points[i], points[i + 1]);
      context.stroke();
    };
    const circle = (x, y, radius, fill = false) => {
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      fill ? context.fill() : context.stroke();
    };

    switch (type) {
      case "key":
        circle(16, 20, 8);
        line(22, 26, 38, 42, 38, 35, 33, 35, 33, 30);
        break;
      case "screen":
        context.strokeRect(6, 8, 36, 27);
        line(18, 42, 30, 42, 24, 35);
        break;
      case "door":
        context.strokeRect(12, 5, 25, 39);
        circle(31, 25, 1, true);
        line(4, 24, 24, 24, 18, 18);
        line(24, 24, 18, 30);
        break;
      case "bolt":
        context.beginPath();
        context.moveTo(27, 4);
        context.lineTo(11, 26);
        context.lineTo(22, 26);
        context.lineTo(18, 44);
        context.lineTo(38, 18);
        context.lineTo(27, 18);
        context.closePath();
        context.fill();
        break;
      case "clipboard":
        context.strokeRect(9, 8, 30, 36);
        context.strokeRect(17, 4, 14, 8);
        line(15, 21, 33, 21);
        line(15, 29, 33, 29);
        line(15, 37, 27, 37);
        break;
      case "thermometer":
        context.beginPath();
        context.arc(24, 34, 8, 0, Math.PI * 2);
        context.moveTo(21, 30);
        context.lineTo(21, 9);
        context.arc(24, 9, 3, Math.PI, 0);
        context.lineTo(27, 30);
        context.stroke();
        line(24, 15, 24, 34);
        break;
      case "stethoscope":
        context.beginPath();
        context.moveTo(12, 7);
        context.lineTo(12, 17);
        context.bezierCurveTo(12, 29, 30, 29, 30, 17);
        context.lineTo(30, 7);
        context.moveTo(21, 28);
        context.lineTo(21, 33);
        context.bezierCurveTo(21, 38, 27, 40, 32, 36);
        context.stroke();
        circle(36, 32, 5);
        break;
      case "pill":
        context.save();
        context.translate(24, 24);
        context.rotate(-Math.PI / 4);
        context.beginPath();
        context.roundRect(-18, -8, 36, 16, 8);
        context.stroke();
        line(0, -8, 0, 8);
        context.restore();
        break;
      case "plus":
        line(24, 8, 24, 40);
        line(8, 24, 40, 24);
        break;
      case "eye":
        context.beginPath();
        context.moveTo(4, 24);
        context.quadraticCurveTo(24, 4, 44, 24);
        context.quadraticCurveTo(24, 44, 4, 24);
        context.stroke();
        circle(24, 24, 7);
        break;
      case "shield":
        context.beginPath();
        context.moveTo(24, 4);
        context.lineTo(40, 10);
        context.lineTo(38, 27);
        context.quadraticCurveTo(35, 38, 24, 44);
        context.quadraticCurveTo(13, 38, 10, 27);
        context.lineTo(8, 10);
        context.closePath();
        context.stroke();
        line(16, 24, 22, 30, 33, 17);
        break;
      case "info":
        circle(24, 24, 18);
        line(24, 22, 24, 34);
        circle(24, 14, 1, true);
        break;
      case "save":
        context.strokeRect(7, 7, 34, 34);
        context.strokeRect(14, 7, 19, 13);
        context.strokeRect(13, 27, 22, 14);
        break;
      case "users":
        circle(18, 17, 7);
        circle(33, 20, 5);
        context.beginPath();
        context.arc(18, 37, 12, Math.PI, 0);
        context.stroke();
        context.beginPath();
        context.arc(34, 38, 9, Math.PI, 0);
        context.stroke();
        break;
      case "refresh":
        context.beginPath();
        context.arc(24, 24, 16, -Math.PI * 0.75, Math.PI * 0.65);
        context.stroke();
        line(9, 10, 9, 19, 18, 18);
        context.beginPath();
        context.arc(24, 24, 16, Math.PI * 0.25, Math.PI * 1.65);
        context.stroke();
        line(39, 38, 39, 29, 30, 30);
        break;
      case "search":
        circle(20, 20, 12);
        line(29, 29, 42, 42);
        break;
      case "folder":
        context.beginPath();
        context.moveTo(5, 13);
        context.lineTo(20, 13);
        context.lineTo(24, 18);
        context.lineTo(43, 18);
        context.lineTo(40, 39);
        context.lineTo(7, 39);
        context.closePath();
        context.stroke();
        break;
      case "crown":
        context.beginPath();
        context.moveTo(6, 14);
        context.lineTo(15, 23);
        context.lineTo(24, 9);
        context.lineTo(33, 23);
        context.lineTo(42, 14);
        context.lineTo(38, 37);
        context.lineTo(10, 37);
        context.closePath();
        context.stroke();
        line(10, 42, 38, 42);
        break;
      case "lock":
        context.strokeRect(9, 21, 30, 23);
        context.beginPath();
        context.arc(24, 21, 10, Math.PI, 0);
        context.stroke();
        circle(24, 31, 2, true);
        line(24, 33, 24, 37);
        break;
      case "open":
        line(8, 40, 8, 25, 24, 25);
        line(18, 8, 40, 8, 40, 30);
        line(19, 29, 40, 8);
        break;
      case "trash":
        context.strokeRect(12, 15, 24, 28);
        line(8, 11, 40, 11);
        line(18, 7, 30, 7);
        line(20, 21, 20, 37);
        line(28, 21, 28, 37);
        break;
      case "hourglass":
        line(12, 7, 36, 7, 12, 41, 36, 41);
        line(14, 9, 34, 21, 24, 26, 14, 39);
        line(34, 9, 24, 26, 34, 39);
        break;
      case "user":
        circle(24, 16, 9);
        context.beginPath();
        context.arc(24, 43, 17, Math.PI, 0);
        context.stroke();
        break;
      case "box":
        context.strokeRect(8, 14, 32, 27);
        line(8, 14, 24, 5, 40, 14);
        line(24, 5, 24, 31);
        line(8, 14, 24, 23, 40, 14);
        break;
      case "warning":
        context.beginPath();
        context.moveTo(24, 5);
        context.lineTo(44, 41);
        context.lineTo(4, 41);
        context.closePath();
        context.stroke();
        line(24, 17, 24, 29);
        circle(24, 35, 1, true);
        break;
      case "status":
        circle(24, 24, 15, true);
        break;
      case "close":
        line(12, 12, 36, 36);
        line(36, 12, 12, 36);
        break;
      case "inbox":
        context.beginPath();
        context.moveTo(7, 10);
        context.lineTo(41, 10);
        context.lineTo(45, 37);
        context.lineTo(30, 37);
        context.lineTo(26, 31);
        context.lineTo(18, 31);
        context.lineTo(14, 37);
        context.lineTo(3, 37);
        context.closePath();
        context.stroke();
        break;
      case "check":
        line(8, 25, 19, 36, 41, 12);
        break;
      case "clock":
        circle(24, 24, 18);
        line(24, 12, 24, 24, 33, 29);
        break;
      default:
        circle(24, 24, 18);
        line(15, 24, 33, 24);
        line(24, 15, 24, 33);
    }
  }

  function makeCanvas(emoji) {
    const canvas = document.createElement("canvas");
    canvas.className = "canvas-icon";
    canvas.width = 48;
    canvas.height = 48;
    canvas.setAttribute("aria-hidden", "true");

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Não foi possível inicializar o canvas para os ícones.");
    drawIcon(context, icons.get(emoji));
    return canvas;
  }

  function replaceEmojiInText(textNode) {
    const parent = textNode.parentElement;
    if (!parent || skipTags.has(parent.tagName)) return;

    const text = textNode.nodeValue;
    if (!text || !emojiPattern.test(text)) {
      emojiPattern.lastIndex = 0;
      return;
    }
    emojiPattern.lastIndex = 0;

    if (parent.tagName === "OPTION") {
      textNode.nodeValue = text.replace(emojiPattern, "").replace(/\s{2,}/g, " ");
      emojiPattern.lastIndex = 0;
      return;
    }

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let match;
    let onlyEmoji = true;
    while ((match = emojiPattern.exec(text)) !== null) {
      const before = text.slice(lastIndex, match.index);
      if (before) {
        fragment.append(document.createTextNode(before));
        if (before.trim()) onlyEmoji = false;
      }
      fragment.append(makeCanvas(match[0]));
      lastIndex = match.index + match[0].length;
    }
    const after = text.slice(lastIndex);
    if (after) {
      fragment.append(document.createTextNode(after));
      if (after.trim()) onlyEmoji = false;
    }
    emojiPattern.lastIndex = 0;

    if (onlyEmoji && parent.tagName === "BUTTON" && !parent.hasAttribute("aria-label")) {
      const label = accessibleLabels.get(text.trim());
      if (label) parent.setAttribute("aria-label", label);
    }
    textNode.replaceWith(fragment);
  }

  function scan(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      replaceEmojiInText(node);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE || skipTags.has(node.tagName)) return;

    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(replaceEmojiInText);
  }

  scan(document.body);
  new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(scan));
  }).observe(document.body, { childList: true, subtree: true });
})();
