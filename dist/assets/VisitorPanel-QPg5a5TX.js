import { u, a as b, j as e, d as j, H as f } from './index-CdsCXf8N.js';
const d = {
    family: { label: 'Family', icon: '👨‍👩‍👧‍👦', color: '#06b6d4' },
    thrill_seeker: { label: 'Thrill Seeker', icon: '🤘', color: '#f97316' },
    child: { label: 'Child', icon: '🧒', color: '#ec4899' },
    elderly: { label: 'Elderly', icon: '👴', color: '#a78bfa' },
    teen: { label: 'Teen', icon: '🧑', color: '#22c55e' },
  },
  g = () => {
    const {
        visitors: i,
        parkHappiness: x,
        parkDirt: t,
        cleanPark: p,
        isAutoCleanEnabled: c,
      } = u(
        b((s) => ({
          visitors: s.visitors,
          parkHappiness: s.parkHappiness,
          parkDirt: s.parkDirt,
          cleanPark: s.cleanPark,
          isAutoCleanEnabled: s.isAutoCleanEnabled,
        }))
      ),
      r = i.reduce((s, a) => s + a.size, 0),
      h = i.reduce((s, a) => ({ ...s, [a.type]: (s[a.type] ?? 0) + a.size }), {}),
      l = i.length > 0 ? Math.round(i.reduce((s, a) => s + a.happiness, 0) / i.length) : Math.round(x),
      n = l >= 70 ? '#22c55e' : l >= 40 ? '#eab308' : '#ef4444';
    return e.jsxs('div', {
      className: 'flex flex-col gap-3',
      children: [
        e.jsxs('div', {
          className: 'flex items-center justify-between',
          children: [
            e.jsxs('div', {
              className: 'flex items-center gap-2',
              children: [
                e.jsx(j, { size: 14, className: 'text-[#06b6d4]' }),
                e.jsx('span', {
                  className: 'text-xs font-bold tracking-wider text-slate-400 uppercase',
                  children: 'Guests',
                }),
              ],
            }),
            e.jsx('span', { className: 'font-display text-lg font-black text-[#06b6d4]', children: r }),
          ],
        }),
        e.jsx('div', {
          className: 'space-y-1.5',
          children: Object.keys(d).map((s) => {
            const a = d[s],
              o = h[s] ?? 0,
              m = r > 0 ? (o / r) * 100 : 0;
            return e.jsxs(
              'div',
              {
                className: 'flex items-center gap-2',
                children: [
                  e.jsx('span', { className: 'w-5 text-sm', children: a.icon }),
                  e.jsxs('div', {
                    className: 'flex-1',
                    children: [
                      e.jsxs('div', {
                        className: 'mb-0.5 flex justify-between text-[10px]',
                        children: [
                          e.jsx('span', { className: 'text-slate-400', children: a.label }),
                          e.jsx('span', { className: 'font-bold', style: { color: a.color }, children: o }),
                        ],
                      }),
                      e.jsx('div', {
                        className: 'h-1 overflow-hidden bg-[#2a2a50]',
                        children: e.jsx('div', {
                          className: 'h-full transition-all duration-500',
                          style: { width: `${m}%`, background: a.color, boxShadow: `0 0 4px ${a.color}` },
                        }),
                      }),
                    ],
                  }),
                ],
              },
              s
            );
          }),
        }),
        e.jsx('div', { className: 'border-t border-[#2a2a50]' }),
        e.jsxs('div', {
          children: [
            e.jsxs('div', {
              className: 'mb-1.5 flex items-center justify-between',
              children: [
                e.jsxs('div', {
                  className: 'flex items-center gap-1.5',
                  children: [
                    e.jsx(f, { size: 12, style: { color: n } }),
                    e.jsx('span', {
                      className: 'text-[10px] tracking-wider text-slate-400 uppercase',
                      children: 'Happiness',
                    }),
                  ],
                }),
                e.jsxs('span', { className: 'text-sm font-bold', style: { color: n }, children: [l, '%'] }),
              ],
            }),
            e.jsx('div', {
              className: 'h-2 overflow-hidden bg-[#2a2a50]',
              children: e.jsx('div', {
                className: 'h-full transition-all duration-500',
                style: { width: `${l}%`, background: n, boxShadow: `0 0 8px ${n}` },
              }),
            }),
            e.jsx('div', {
              className: 'mt-1 text-[9px] text-slate-500',
              children:
                l >= 80
                  ? 'Guests are ecstatic!'
                  : l >= 60
                    ? 'Guests are enjoying their visit'
                    : l >= 40
                      ? 'Some guests are unhappy'
                      : 'Guests are leaving! Fix this!',
            }),
          ],
        }),
        e.jsxs('div', {
          children: [
            e.jsxs('div', {
              className: 'mb-1.5 flex items-center justify-between',
              children: [
                e.jsx('span', {
                  className: 'text-[10px] tracking-wider text-slate-400 uppercase',
                  children: 'Park Cleanliness',
                }),
                e.jsxs('span', {
                  className: `text-sm font-bold ${t <= 30 ? 'text-green-400' : t <= 60 ? 'text-yellow-400' : 'text-red-400'}`,
                  children: [Math.round(100 - t), '%'],
                }),
              ],
            }),
            e.jsx('div', {
              className: 'h-2 overflow-hidden bg-[#2a2a50]',
              children: e.jsx('div', {
                className: 'h-full transition-all duration-500',
                style: { width: `${100 - t}%`, background: t <= 30 ? '#22c55e' : t <= 60 ? '#eab308' : '#ef4444' },
              }),
            }),
            !c &&
              e.jsx('button', {
                onClick: p,
                className:
                  'pixel-button mt-2 w-full cursor-pointer bg-[#22c55e]/10 py-1.5 text-[10px] font-bold tracking-wider text-green-400 uppercase transition-colors duration-150 hover:bg-[#22c55e]/20',
                'aria-label': 'Clean the park',
                children: '🧹 Clean Park',
              }),
            c &&
              e.jsxs('div', {
                className: 'mt-1 flex items-center gap-1 text-[9px] text-green-400',
                children: [
                  e.jsx('span', { children: '✓' }),
                  e.jsx('span', { children: 'Janitor on duty — auto-cleaning' }),
                ],
              }),
          ],
        }),
      ],
    });
  };
export { g as VisitorPanel };
