import { c as n, u as x, a as d, j as e, e as o, W as p, f as h } from './index-CdsCXf8N.js';
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const m = n('Trophy', [
    ['path', { d: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6', key: '17hqa7' }],
    ['path', { d: 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18', key: 'lmptdp' }],
    ['path', { d: 'M4 22h16', key: '57wxv0' }],
    ['path', { d: 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22', key: '1nw9bq' }],
    ['path', { d: 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22', key: '1np0yb' }],
    ['path', { d: 'M18 2H6v7a6 6 0 0 0 12 0V2Z', key: 'u46fv3' }],
  ]),
  j = (s) => (s >= 1e6 ? `$${(s / 1e6).toFixed(1)}M` : s >= 1e3 ? `$${(s / 1e3).toFixed(1)}K` : `$${Math.floor(s)}`),
  g = (s) => {
    const t = Math.floor(s / 3600),
      r = Math.floor((s % 3600) / 60),
      i = s % 60;
    return t > 0 ? `${t}h ${r}m` : `${r}m ${i}s`;
  },
  l = ({ icon: s, label: t, value: r }) =>
    e.jsxs('div', {
      className: 'flex items-center justify-between border-b border-[#2a2a50]/50 py-1.5 last:border-0',
      children: [
        e.jsxs('div', {
          className: 'flex items-center gap-2 text-[10px] text-slate-400',
          children: [s, e.jsx('span', { className: 'tracking-wider uppercase', children: t })],
        }),
        e.jsx('span', { className: 'text-xs font-bold text-white', children: r }),
      ],
    }),
  f = () => {
    const { stats: s, rides: t } = x(d((a) => ({ stats: a.stats, rides: a.rides }))),
      r = t.filter((a) => a.status === 'operating').length,
      i = t.filter((a) => a.status === 'broken').length,
      c = t.filter((a) => a.status === 'repairing').length;
    return e.jsxs('div', {
      className: 'space-y-3',
      children: [
        e.jsxs('div', {
          className: 'mb-1 flex items-center gap-2',
          children: [
            e.jsx(o, { size: 13, className: 'text-[#a78bfa]' }),
            e.jsx('span', {
              className: 'text-[10px] font-semibold tracking-widest text-slate-400 uppercase',
              children: 'Park Stats',
            }),
          ],
        }),
        e.jsxs('div', {
          children: [
            e.jsx(l, {
              icon: e.jsx('span', { className: 'text-[#f97316]', children: '$' }),
              label: 'Total Earned',
              value: j(s.totalEarnings),
            }),
            e.jsx(l, {
              icon: e.jsx(m, { size: 10, className: 'text-yellow-400' }),
              label: 'Peak Guests',
              value: String(s.peakVisitors),
            }),
            e.jsx(l, {
              icon: e.jsx(p, { size: 10, className: 'text-slate-400' }),
              label: 'Rides Fixed',
              value: String(s.ridesFixed),
            }),
            e.jsx(l, {
              icon: e.jsx(h, { size: 10, className: 'text-slate-400' }),
              label: 'Time Played',
              value: g(s.timePlayed),
            }),
          ],
        }),
        e.jsxs('div', {
          className: 'border-t border-[#2a2a50] pt-3',
          children: [
            e.jsx('div', {
              className: 'mb-2 text-[10px] tracking-wider text-slate-500 uppercase',
              children: 'Ride Status',
            }),
            e.jsxs('div', {
              className: 'grid grid-cols-3 gap-1.5',
              children: [
                e.jsxs('div', {
                  className: 'pixel-panel bg-green-500/10 p-1.5 text-center',
                  children: [
                    e.jsx('div', { className: 'text-lg font-black text-green-400', children: r }),
                    e.jsx('div', {
                      className: 'text-[9px] tracking-wide text-green-400/70 uppercase',
                      children: 'Open',
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'pixel-panel bg-red-500/10 p-1.5 text-center',
                  children: [
                    e.jsx('div', { className: 'text-lg font-black text-red-400', children: i }),
                    e.jsx('div', {
                      className: 'text-[9px] tracking-wide text-red-400/70 uppercase',
                      children: 'Broken',
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'pixel-panel bg-yellow-500/10 p-1.5 text-center',
                  children: [
                    e.jsx('div', { className: 'text-lg font-black text-yellow-400', children: c }),
                    e.jsx('div', {
                      className: 'text-[9px] tracking-wide text-yellow-400/70 uppercase',
                      children: 'Repair',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  };
export { f as StatsPanel };
