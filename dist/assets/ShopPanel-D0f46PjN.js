import { c as p, u as j, a as v, R as N, j as s, S as g, U as y, g as k, b as w, C as I } from './index-CdsCXf8N.js';
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const R = p('ChevronRight', [['path', { d: 'm9 18 6-6-6-6', key: 'mthhwq' }]]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const C = p('Lock', [
    ['rect', { width: '18', height: '11', x: '3', y: '11', rx: '2', ry: '2', key: '1w4ew1' }],
    ['path', { d: 'M7 11V7a5 5 0 0 1 10 0v4', key: 'fwvmzm' }],
  ]),
  o = (a) => (a >= 1e3 ? `$${(a / 1e3).toFixed(1)}K` : `$${a}`),
  $ = {
    auto_repair: '⚙ Auto-Repair',
    capacity_boost: '👥 +Capacity',
    income_boost: '💰 +Income',
    breakdown_reduction: '🛡 -Breakdowns',
    auto_clean: '🧹 Auto-Clean',
    visitor_attraction: '📣 +Visitors',
  },
  _ = () => {
    const {
        money: a,
        rides: b,
        purchasedUpgrades: c,
        buyRide: u,
        buyUpgrade: f,
      } = j(
        v((e) => ({
          money: e.money,
          rides: e.rides,
          purchasedUpgrades: e.purchasedUpgrades,
          buyRide: e.buyRide,
          buyUpgrade: e.buyUpgrade,
        }))
      ),
      d = new Set(b.map((e) => e.definitionId)),
      x = N.filter((e) => !d.has(e.id));
    return s.jsxs('div', {
      className: 'flex flex-col gap-4 overflow-y-auto',
      children: [
        x.length > 0 &&
          s.jsxs('section', {
            children: [
              s.jsxs('div', {
                className: 'mb-2 flex items-center gap-2',
                children: [
                  s.jsx(g, { size: 13, className: 'text-neon-orange' }),
                  s.jsx('span', {
                    className: 'text-[10px] font-semibold tracking-widest text-slate-400 uppercase',
                    children: 'Build Rides',
                  }),
                ],
              }),
              s.jsx('div', {
                className: 'space-y-2',
                children: x.map((e) => {
                  const t = a >= e.unlockCost;
                  return s.jsxs(
                    'button',
                    {
                      onClick: () => u(e.id),
                      disabled: !t,
                      className: `pixel-button w-full cursor-pointer p-2.5 text-left transition-all duration-150 ${t ? 'border-park-border hover:border-neon-orange/60 hover:bg-neon-orange/5 bg-park-surface' : 'cursor-not-allowed border-[#1a1a30] bg-[#0f0f22] opacity-50'} `,
                      'aria-label': `Buy ${e.name} for ${o(e.unlockCost)}`,
                      children: [
                        s.jsxs('div', {
                          className: 'flex items-center justify-between',
                          children: [
                            s.jsxs('div', {
                              className: 'flex items-center gap-2',
                              children: [
                                s.jsx('span', { className: 'text-xl', children: e.icon }),
                                s.jsxs('div', {
                                  children: [
                                    s.jsx('div', { className: 'text-xs font-bold text-white', children: e.name }),
                                    s.jsx('div', {
                                      className: 'mt-0.5 max-w-[140px] truncate text-[9px] text-slate-500',
                                      children: e.description,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            s.jsx('div', {
                              className: `text-xs font-black ${t ? 'text-neon-orange' : 'text-slate-600'}`,
                              children: o(e.unlockCost),
                            }),
                          ],
                        }),
                        s.jsxs('div', {
                          className: 'mt-1.5 ml-8 flex gap-0.5',
                          children: [
                            Array.from({ length: 5 }, (l, n) =>
                              s.jsx(
                                'div',
                                {
                                  className: `h-1 w-2 rounded-sm ${n < e.thrillLevel ? 'bg-neon-orange' : 'bg-park-border'}`,
                                },
                                n
                              )
                            ),
                            s.jsx('span', { className: 'ml-1 text-[9px] text-slate-500', children: 'thrill' }),
                          ],
                        }),
                      ],
                    },
                    e.id
                  );
                }),
              }),
            ],
          }),
        s.jsxs('section', {
          children: [
            s.jsxs('div', {
              className: 'mb-2 flex items-center gap-2',
              children: [
                s.jsx(R, { size: 13, className: 'text-neon-violet' }),
                s.jsx('span', {
                  className: 'text-[10px] font-semibold tracking-widest text-slate-400 uppercase',
                  children: 'Upgrades',
                }),
              ],
            }),
            s.jsx('div', {
              className: 'space-y-1.5',
              children: y.map((e) => {
                const t = c.includes(e.id),
                  l = !e.rideId || d.has(e.rideId),
                  n = !e.requires || c.includes(e.requires),
                  r = a >= e.cost,
                  m = e.rideId ? k(e.rideId) : null,
                  h = e.requires ? w(e.requires) : null,
                  i = l && n && !t;
                return l
                  ? s.jsx(
                      'button',
                      {
                        onClick: () => i && r && f(e.id),
                        disabled: !i || !r,
                        className: `pixel-button w-full p-2.5 text-left transition-all duration-150 ${t ? 'border-neon-green/30 bg-neon-green/5 cursor-default' : i && r ? 'border-park-border hover:border-neon-violet/60 hover:bg-neon-purple/5 bg-park-surface cursor-pointer' : 'cursor-not-allowed border-[#1a1a30] bg-[#0f0f22] opacity-50'} `,
                        'aria-label': `${t ? 'Purchased' : 'Buy'}: ${e.name}`,
                        children: s.jsxs('div', {
                          className: 'flex items-start justify-between gap-2',
                          children: [
                            s.jsxs('div', {
                              className: 'min-w-0 flex-1',
                              children: [
                                s.jsxs('div', {
                                  className: 'flex flex-wrap items-center gap-1.5',
                                  children: [
                                    m && s.jsx('span', { className: 'text-sm leading-none', children: m.icon }),
                                    s.jsx('span', {
                                      className: 'truncate text-[11px] font-bold text-white',
                                      children: e.name,
                                    }),
                                    s.jsx('span', {
                                      className: 'bg-park-border rounded px-1.5 py-0.5 text-[9px] text-slate-400',
                                      children: $[e.effect] ?? e.effect,
                                    }),
                                  ],
                                }),
                                s.jsx('div', {
                                  className: 'mt-0.5 text-[9px] text-slate-500',
                                  children: e.description,
                                }),
                                !n &&
                                  h &&
                                  s.jsxs('div', {
                                    className: 'mt-0.5 flex items-center gap-1 text-[9px] text-yellow-500/70',
                                    children: [s.jsx(C, { size: 8 }), 'Requires: ', h.name],
                                  }),
                              ],
                            }),
                            s.jsx('div', {
                              className: 'shrink-0',
                              children: t
                                ? s.jsx(I, { size: 14, className: 'text-green-400' })
                                : s.jsx('span', {
                                    className: `text-xs font-black ${r && i ? 'text-neon-violet' : 'text-slate-600'}`,
                                    children: o(e.cost),
                                  }),
                            }),
                          ],
                        }),
                      },
                      e.id
                    )
                  : null;
              }),
            }),
          ],
        }),
      ],
    });
  };
export { _ as ShopPanel };
