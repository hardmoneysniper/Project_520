const MEMORIES = [
    { date: "2026年2月", text: "在一起的第一周飞快地过去了", photo: "photos/memory1.jpg"},
    { date: "2026年2月", text: "在纽约我们一起吃龙虾卷拍鼠鼠照", photo: "photos/memory2.jpg"},
    { date: "2026年2月", text: "一起开车十个小时回堡，醒来就是宝宝做的香香年夜饭", photo: "photos/memory3.jpg"},
    { date: "2026年2月", text: "第一次短暂远距离，每天都在想你", photo: "photos/memory4.jpg"},
    { date: "2026年3月", text: "一起去看极光结果看到了满天星星", photo: "photos/memory5.jpg"},
    { date: "2026年4月", text: "宝宝帮我染情侣头！", photo: "photos/memory6.jpg"},
    { date: "2026年3月", text: "我手术之后你一直在照顾我，给我做饭", photo: "photos/memory7.jpg"},
    { date: "2026年4月", text: "一起看Hamilton，超级好看！", photo: "photos/memory8.jpg"},
    { date: "2026年4月", text: "跟我一起参加毕业典礼，特别开心宝宝能见证我的人生时刻", photo: "photos/memory9.jpg"},
    { date: "2026年5月", text: "520快乐！谢谢你出现在我的生命里，爱你宝宝！", photo: "photos/memory10.jpg"},
];

const LOVE_POINTS = [
    "很愿意沟通，有事会及时说出来",
    "特别有正义感特别有理想",
    "非常坦诚",
    "对很多事情想的特别清楚，活的很通透",
    "性格特别好",
    "做饭特别好吃",
    "喜欢逛超市，特别懂享受生活",
    "会想着对方",
    "手术之后一直照顾我给我做饭",
    "回消息特别快",
    "会推荐很多很好看的剧",
    "吃饭的时候专注聊天 quality time",
    "黏在一起！",
    "很多事都会从两个人的角度考虑",
    "有自己的事业和生活",
    "很会穿搭而且很会推荐（b01太顶了）",
    "愿意互相帮助互相支持",
    "会在状态不好的时候安慰我",
    "会一起做一些很有意思的事",
    "喜欢deep talk",
    "跟我相处可以一起做小孩",
    "每天都分享生活",
    "愿意帮我改进我的缺点",
    "很可爱！",
];

const COLLAGE_COUNT = 238;
const COLLAGE_PHOTOS = Array.from({ length: COLLAGE_COUNT }, (_, i) => `collage/${i + 1}.jpg`);

function initHero() {
    const icons = ['🌸', '🌺', '🌷', '💕', '💗', '✨', '💖', '🌹'];
    const frag  = document.createDocumentFragment();
    for (let i = 0; i < 30; i++) {
        const el = document.createElement('div');
        el.className   = 'petal';
        el.textContent = icons[i % icons.length];
        el.style.cssText = `left:${(Math.random()*100).toFixed(1)}%;font-size:${(18+Math.random()*22).toFixed(0)}px;--dur:${(5+Math.random()*9).toFixed(1)}s;--del:${(-Math.random()*14).toFixed(1)}s;--sw:${((Math.random()-.5)*130).toFixed(0)}px;animation-delay:var(--del)`;
        frag.appendChild(el);
    }
    document.getElementById('petals').appendChild(frag);
}

function initMemories() {
    const frag = document.createDocumentFragment();
    MEMORIES.forEach((m, i) => {
        const even = i % 2 === 0;
        const card = document.createElement('div');
        card.className = `tl-card ${even ? 'sl' : 'sr rev'}`;

        const photo = `<div class="tl-photo"><img src="${m.photo}" alt="" loading="lazy" decoding="async" onerror="this.parentNode.innerHTML='<div style=\\'width:100%;height:100%;min-height:220px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;color:#e8758a\\'><span style=\\'font-size:50px\\'>📸</span><span style=\\'font-size:13px\\'>在此放上照片</span></div>'"></div>`;
        const dot   = `<div class="tl-dot-wrap"><div class="tl-dot"></div></div>`;
        const text  = `<div class="tl-text"${even ? '' : ' style="text-align:right"'}><div class="tl-date">${m.date}</div><div class="tl-caption">${m.text}</div></div>`;

        card.innerHTML = even ? photo + dot + text : text + dot + photo;
        frag.appendChild(card);
    });
    document.getElementById('tlItems').appendChild(frag);

    const io = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
        { threshold: 0.18 }
    );
    document.querySelectorAll('.tl-card').forEach(c => io.observe(c));
}

function initLove() {
    const frag = document.createDocumentFragment();

    for (let i = 0; i < 110; i++) {
        const s  = document.createElement('div');
        const sz = (1 + Math.random() * 3).toFixed(1);
        s.className  = 'star-dot';
        s.style.cssText = `left:${(Math.random()*100).toFixed(1)}%;top:${(Math.random()*100).toFixed(1)}%;width:${sz}px;height:${sz}px;--st:${(2+Math.random()*5).toFixed(1)}s;animation-delay:${(Math.random()*5).toFixed(1)}s`;
        frag.appendChild(s);
    }

    LOVE_POINTS.forEach((pt, i) => {
        for (let j = 0; j < 3; j++) {
            const el = document.createElement('div');
            el.className   = 'snow';
            el.textContent = `✦ ${pt}`;
            el.style.cssText = `left:${(3+Math.random()*90).toFixed(1)}%;font-size:${(17+Math.random()*10).toFixed(0)}px;animation-duration:${(11+Math.random()*13).toFixed(1)}s;animation-delay:${(i*1.5+j*10+Math.random()*7).toFixed(1)}s;--sx:${((Math.random()-.5)*70).toFixed(0)}px`;
            frag.appendChild(el);
        }
    });

    document.getElementById('love').appendChild(frag);
}

const GLYPHS = {
    ' ': ['..','..','..','..','..','..','..'],
    'I': ['###','.#.','.#.','.#.','.#.','.#.','###'],
    'L': ['#..','#..','#..','#..','#..','#..','###'],
    'O': ['.##.','#..#','#..#','#..#','#..#','#..#','.##.'],
    'V': ['#...#','#...#','#...#','.#.#.','.#.#.','..#..','..#..'],
    'E': ['####','#...','#...','###.','#...','#...','####'],
    'U': ['#..#','#..#','#..#','#..#','#..#','#..#','.##.'],
};

function buildCollage() {
    const grid = document.getElementById('photoGrid');
    const TEXT = 'I LOVE U';
    const LGAP = 1;

    const containerW = grid.parentElement.offsetWidth || 900;
    const totalCols  = [...TEXT].reduce((s, c) => s + GLYPHS[c][0].length, 0) + (TEXT.length - 1) * LGAP;
    const CELL = Math.max(10, Math.floor((containerW - 8) / totalCols));
    const TILE = Math.round(CELL * 0.82);

    const pts = [];
    let col = 0;
    [...TEXT].forEach(ch => {
        const g = GLYPHS[ch];
        g.forEach((row, r) => {
            [...row].forEach((px, c) => {
                if (px === '#') pts.push({ x: (col + c) * CELL, y: r * CELL });
            });
        });
        col += g[0].length + LGAP;
    });

    const offsetX = Math.round((containerW - (col - LGAP) * CELL) / 2);

    for (let i = pts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pts[i], pts[j]] = [pts[j], pts[i]];
    }

    const photos = [...COLLAGE_PHOTOS];
    for (let i = photos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [photos[i], photos[j]] = [photos[j], photos[i]];
    }

    grid.style.cssText = `position:relative;width:100%;height:${7 * CELL}px`;

    const frag = document.createDocumentFragment();
    pts.forEach((p, i) => {
        const div = document.createElement('div');
        div.className = 'cp';
        div.style.cssText = `left:${p.x + offsetX}px;top:${p.y}px;width:${TILE}px;height:${TILE}px;animation-delay:${(i * .015).toFixed(3)}s`;
        div.innerHTML = `<img src="${photos[i % photos.length]}" alt="" decoding="async" onerror="this.parentElement.style.background='hsl(${(i*43)%360},55%,60%)';this.remove()">`;
        frag.appendChild(div);
    });
    grid.appendChild(frag);
}

document.addEventListener('DOMContentLoaded', () => {
    initHero();
    initMemories();
    initLove();

    const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        requestAnimationFrame(buildCollage);
    }, { rootMargin: '300px' });
    io.observe(document.getElementById('love'));
});

let _rt;
window.addEventListener('resize', () => {
    clearTimeout(_rt);
    _rt = setTimeout(() => {
        const grid = document.getElementById('photoGrid');
        grid.innerHTML = '';
        grid.style.cssText = '';
        buildCollage();
    }, 380);
});
