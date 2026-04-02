(function () {
  const M = document.createElement('link').relList;
  if (M && M.supports && M.supports('modulepreload')) return;
  for (const A of document.querySelectorAll('link[rel="modulepreload"]')) s(A);
  new MutationObserver((A) => {
    for (const C of A)
      if (C.type === 'childList')
        for (const B of C.addedNodes) B.tagName === 'LINK' && B.rel === 'modulepreload' && s(B);
  }).observe(document, { childList: !0, subtree: !0 });
  function b(A) {
    const C = {};
    return (
      A.integrity && (C.integrity = A.integrity),
      A.referrerPolicy && (C.referrerPolicy = A.referrerPolicy),
      A.crossOrigin === 'use-credentials'
        ? (C.credentials = 'include')
        : A.crossOrigin === 'anonymous'
          ? (C.credentials = 'omit')
          : (C.credentials = 'same-origin'),
      C
    );
  }
  function s(A) {
    if (A.ep) return;
    A.ep = !0;
    const C = b(A);
    fetch(A.href, C);
  }
})();
function S1(d) {
  return d && d.__esModule && Object.prototype.hasOwnProperty.call(d, 'default') ? d.default : d;
}
var vf = { exports: {} },
  Eu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var D0;
function z1() {
  if (D0) return Eu;
  D0 = 1;
  var d = Symbol.for('react.transitional.element'),
    M = Symbol.for('react.fragment');
  function b(s, A, C) {
    var B = null;
    if ((C !== void 0 && (B = '' + C), A.key !== void 0 && (B = '' + A.key), 'key' in A)) {
      C = {};
      for (var Z in A) Z !== 'key' && (C[Z] = A[Z]);
    } else C = A;
    return ((A = C.ref), { $$typeof: d, type: s, key: B, ref: A !== void 0 ? A : null, props: C });
  }
  return ((Eu.Fragment = M), (Eu.jsx = b), (Eu.jsxs = b), Eu);
}
var N0;
function T1() {
  return (N0 || ((N0 = 1), (vf.exports = z1())), vf.exports);
}
var T = T1(),
  gf = { exports: {} },
  L = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var C0;
function E1() {
  if (C0) return L;
  C0 = 1;
  var d = Symbol.for('react.transitional.element'),
    M = Symbol.for('react.portal'),
    b = Symbol.for('react.fragment'),
    s = Symbol.for('react.strict_mode'),
    A = Symbol.for('react.profiler'),
    C = Symbol.for('react.consumer'),
    B = Symbol.for('react.context'),
    Z = Symbol.for('react.forward_ref'),
    j = Symbol.for('react.suspense'),
    p = Symbol.for('react.memo'),
    Q = Symbol.for('react.lazy'),
    D = Symbol.for('react.activity'),
    K = Symbol.iterator;
  function Sl(r) {
    return r === null || typeof r != 'object'
      ? null
      : ((r = (K && r[K]) || r['@@iterator']), typeof r == 'function' ? r : null);
  }
  var cl = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    xl = Object.assign,
    At = {};
  function Jl(r, x, U) {
    ((this.props = r), (this.context = x), (this.refs = At), (this.updater = U || cl));
  }
  ((Jl.prototype.isReactComponent = {}),
    (Jl.prototype.setState = function (r, x) {
      if (typeof r != 'object' && typeof r != 'function' && r != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, r, x, 'setState');
    }),
    (Jl.prototype.forceUpdate = function (r) {
      this.updater.enqueueForceUpdate(this, r, 'forceUpdate');
    }));
  function J() {}
  J.prototype = Jl.prototype;
  function fl(r, x, U) {
    ((this.props = r), (this.context = x), (this.refs = At), (this.updater = U || cl));
  }
  var G = (fl.prototype = new J());
  ((G.constructor = fl), xl(G, Jl.prototype), (G.isPureReactComponent = !0));
  var Hl = Array.isArray;
  function Vl() {}
  var $ = { H: null, A: null, T: null, S: null },
    ol = Object.prototype.hasOwnProperty;
  function Zl(r, x, U) {
    var H = U.ref;
    return { $$typeof: d, type: r, key: x, ref: H !== void 0 ? H : null, props: U };
  }
  function Ae(r, x) {
    return Zl(r.type, x, r.props);
  }
  function yt(r) {
    return typeof r == 'object' && r !== null && r.$$typeof === d;
  }
  function ql(r) {
    var x = { '=': '=0', ':': '=2' };
    return (
      '$' +
      r.replace(/[=:]/g, function (U) {
        return x[U];
      })
    );
  }
  var Rt = /\/+/g;
  function xt(r, x) {
    return typeof r == 'object' && r !== null && r.key != null ? ql('' + r.key) : x.toString(36);
  }
  function Wl(r) {
    switch (r.status) {
      case 'fulfilled':
        return r.value;
      case 'rejected':
        throw r.reason;
      default:
        switch (
          (typeof r.status == 'string'
            ? r.then(Vl, Vl)
            : ((r.status = 'pending'),
              r.then(
                function (x) {
                  r.status === 'pending' && ((r.status = 'fulfilled'), (r.value = x));
                },
                function (x) {
                  r.status === 'pending' && ((r.status = 'rejected'), (r.reason = x));
                }
              )),
          r.status)
        ) {
          case 'fulfilled':
            return r.value;
          case 'rejected':
            throw r.reason;
        }
    }
    throw r;
  }
  function z(r, x, U, H, w) {
    var F = typeof r;
    (F === 'undefined' || F === 'boolean') && (r = null);
    var sl = !1;
    if (r === null) sl = !0;
    else
      switch (F) {
        case 'bigint':
        case 'string':
        case 'number':
          sl = !0;
          break;
        case 'object':
          switch (r.$$typeof) {
            case d:
            case M:
              sl = !0;
              break;
            case Q:
              return ((sl = r._init), z(sl(r._payload), x, U, H, w));
          }
      }
    if (sl)
      return (
        (w = w(r)),
        (sl = H === '' ? '.' + xt(r, 0) : H),
        Hl(w)
          ? ((U = ''),
            sl != null && (U = sl.replace(Rt, '$&/') + '/'),
            z(w, x, U, '', function (Na) {
              return Na;
            }))
          : w != null &&
            (yt(w) &&
              (w = Ae(
                w,
                U + (w.key == null || (r && r.key === w.key) ? '' : ('' + w.key).replace(Rt, '$&/') + '/') + sl
              )),
            x.push(w)),
        1
      );
    sl = 0;
    var wl = H === '' ? '.' : H + ':';
    if (Hl(r)) for (var El = 0; El < r.length; El++) ((H = r[El]), (F = wl + xt(H, El)), (sl += z(H, x, U, F, w)));
    else if (((El = Sl(r)), typeof El == 'function'))
      for (r = El.call(r), El = 0; !(H = r.next()).done; )
        ((H = H.value), (F = wl + xt(H, El++)), (sl += z(H, x, U, F, w)));
    else if (F === 'object') {
      if (typeof r.then == 'function') return z(Wl(r), x, U, H, w);
      throw (
        (x = String(r)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (x === '[object Object]' ? 'object with keys {' + Object.keys(r).join(', ') + '}' : x) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return sl;
  }
  function N(r, x, U) {
    if (r == null) return r;
    var H = [],
      w = 0;
    return (
      z(r, H, '', '', function (F) {
        return x.call(U, F, w++);
      }),
      H
    );
  }
  function O(r) {
    if (r._status === -1) {
      var x = r._result;
      ((x = x()),
        x.then(
          function (U) {
            (r._status === 0 || r._status === -1) && ((r._status = 1), (r._result = U));
          },
          function (U) {
            (r._status === 0 || r._status === -1) && ((r._status = 2), (r._result = U));
          }
        ),
        r._status === -1 && ((r._status = 0), (r._result = x)));
    }
    if (r._status === 1) return r._result.default;
    throw r._result;
  }
  var V =
      typeof reportError == 'function'
        ? reportError
        : function (r) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var x = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof r == 'object' && r !== null && typeof r.message == 'string' ? String(r.message) : String(r),
                error: r,
              });
              if (!window.dispatchEvent(x)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', r);
              return;
            }
            console.error(r);
          },
    ll = {
      map: N,
      forEach: function (r, x, U) {
        N(
          r,
          function () {
            x.apply(this, arguments);
          },
          U
        );
      },
      count: function (r) {
        var x = 0;
        return (
          N(r, function () {
            x++;
          }),
          x
        );
      },
      toArray: function (r) {
        return (
          N(r, function (x) {
            return x;
          }) || []
        );
      },
      only: function (r) {
        if (!yt(r)) throw Error('React.Children.only expected to receive a single React element child.');
        return r;
      },
    };
  return (
    (L.Activity = D),
    (L.Children = ll),
    (L.Component = Jl),
    (L.Fragment = b),
    (L.Profiler = A),
    (L.PureComponent = fl),
    (L.StrictMode = s),
    (L.Suspense = j),
    (L.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $),
    (L.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (r) {
        return $.H.useMemoCache(r);
      },
    }),
    (L.cache = function (r) {
      return function () {
        return r.apply(null, arguments);
      };
    }),
    (L.cacheSignal = function () {
      return null;
    }),
    (L.cloneElement = function (r, x, U) {
      if (r == null) throw Error('The argument must be a React element, but you passed ' + r + '.');
      var H = xl({}, r.props),
        w = r.key;
      if (x != null)
        for (F in (x.key !== void 0 && (w = '' + x.key), x))
          !ol.call(x, F) ||
            F === 'key' ||
            F === '__self' ||
            F === '__source' ||
            (F === 'ref' && x.ref === void 0) ||
            (H[F] = x[F]);
      var F = arguments.length - 2;
      if (F === 1) H.children = U;
      else if (1 < F) {
        for (var sl = Array(F), wl = 0; wl < F; wl++) sl[wl] = arguments[wl + 2];
        H.children = sl;
      }
      return Zl(r.type, w, H);
    }),
    (L.createContext = function (r) {
      return (
        (r = { $$typeof: B, _currentValue: r, _currentValue2: r, _threadCount: 0, Provider: null, Consumer: null }),
        (r.Provider = r),
        (r.Consumer = { $$typeof: C, _context: r }),
        r
      );
    }),
    (L.createElement = function (r, x, U) {
      var H,
        w = {},
        F = null;
      if (x != null)
        for (H in (x.key !== void 0 && (F = '' + x.key), x))
          ol.call(x, H) && H !== 'key' && H !== '__self' && H !== '__source' && (w[H] = x[H]);
      var sl = arguments.length - 2;
      if (sl === 1) w.children = U;
      else if (1 < sl) {
        for (var wl = Array(sl), El = 0; El < sl; El++) wl[El] = arguments[El + 2];
        w.children = wl;
      }
      if (r && r.defaultProps) for (H in ((sl = r.defaultProps), sl)) w[H] === void 0 && (w[H] = sl[H]);
      return Zl(r, F, w);
    }),
    (L.createRef = function () {
      return { current: null };
    }),
    (L.forwardRef = function (r) {
      return { $$typeof: Z, render: r };
    }),
    (L.isValidElement = yt),
    (L.lazy = function (r) {
      return { $$typeof: Q, _payload: { _status: -1, _result: r }, _init: O };
    }),
    (L.memo = function (r, x) {
      return { $$typeof: p, type: r, compare: x === void 0 ? null : x };
    }),
    (L.startTransition = function (r) {
      var x = $.T,
        U = {};
      $.T = U;
      try {
        var H = r(),
          w = $.S;
        (w !== null && w(U, H), typeof H == 'object' && H !== null && typeof H.then == 'function' && H.then(Vl, V));
      } catch (F) {
        V(F);
      } finally {
        (x !== null && U.types !== null && (x.types = U.types), ($.T = x));
      }
    }),
    (L.unstable_useCacheRefresh = function () {
      return $.H.useCacheRefresh();
    }),
    (L.use = function (r) {
      return $.H.use(r);
    }),
    (L.useActionState = function (r, x, U) {
      return $.H.useActionState(r, x, U);
    }),
    (L.useCallback = function (r, x) {
      return $.H.useCallback(r, x);
    }),
    (L.useContext = function (r) {
      return $.H.useContext(r);
    }),
    (L.useDebugValue = function () {}),
    (L.useDeferredValue = function (r, x) {
      return $.H.useDeferredValue(r, x);
    }),
    (L.useEffect = function (r, x) {
      return $.H.useEffect(r, x);
    }),
    (L.useEffectEvent = function (r) {
      return $.H.useEffectEvent(r);
    }),
    (L.useId = function () {
      return $.H.useId();
    }),
    (L.useImperativeHandle = function (r, x, U) {
      return $.H.useImperativeHandle(r, x, U);
    }),
    (L.useInsertionEffect = function (r, x) {
      return $.H.useInsertionEffect(r, x);
    }),
    (L.useLayoutEffect = function (r, x) {
      return $.H.useLayoutEffect(r, x);
    }),
    (L.useMemo = function (r, x) {
      return $.H.useMemo(r, x);
    }),
    (L.useOptimistic = function (r, x) {
      return $.H.useOptimistic(r, x);
    }),
    (L.useReducer = function (r, x, U) {
      return $.H.useReducer(r, x, U);
    }),
    (L.useRef = function (r) {
      return $.H.useRef(r);
    }),
    (L.useState = function (r) {
      return $.H.useState(r);
    }),
    (L.useSyncExternalStore = function (r, x, U) {
      return $.H.useSyncExternalStore(r, x, U);
    }),
    (L.useTransition = function () {
      return $.H.useTransition();
    }),
    (L.version = '19.2.4'),
    L
  );
}
var U0;
function _f() {
  return (U0 || ((U0 = 1), (gf.exports = E1())), gf.exports);
}
var Ul = _f();
const xu = S1(Ul);
var bf = { exports: {} },
  _u = {},
  pf = { exports: {} },
  Sf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var j0;
function _1() {
  return (
    j0 ||
      ((j0 = 1),
      (function (d) {
        function M(z, N) {
          var O = z.length;
          z.push(N);
          l: for (; 0 < O; ) {
            var V = (O - 1) >>> 1,
              ll = z[V];
            if (0 < A(ll, N)) ((z[V] = N), (z[O] = ll), (O = V));
            else break l;
          }
        }
        function b(z) {
          return z.length === 0 ? null : z[0];
        }
        function s(z) {
          if (z.length === 0) return null;
          var N = z[0],
            O = z.pop();
          if (O !== N) {
            z[0] = O;
            l: for (var V = 0, ll = z.length, r = ll >>> 1; V < r; ) {
              var x = 2 * (V + 1) - 1,
                U = z[x],
                H = x + 1,
                w = z[H];
              if (0 > A(U, O))
                H < ll && 0 > A(w, U) ? ((z[V] = w), (z[H] = O), (V = H)) : ((z[V] = U), (z[x] = O), (V = x));
              else if (H < ll && 0 > A(w, O)) ((z[V] = w), (z[H] = O), (V = H));
              else break l;
            }
          }
          return N;
        }
        function A(z, N) {
          var O = z.sortIndex - N.sortIndex;
          return O !== 0 ? O : z.id - N.id;
        }
        if (((d.unstable_now = void 0), typeof performance == 'object' && typeof performance.now == 'function')) {
          var C = performance;
          d.unstable_now = function () {
            return C.now();
          };
        } else {
          var B = Date,
            Z = B.now();
          d.unstable_now = function () {
            return B.now() - Z;
          };
        }
        var j = [],
          p = [],
          Q = 1,
          D = null,
          K = 3,
          Sl = !1,
          cl = !1,
          xl = !1,
          At = !1,
          Jl = typeof setTimeout == 'function' ? setTimeout : null,
          J = typeof clearTimeout == 'function' ? clearTimeout : null,
          fl = typeof setImmediate < 'u' ? setImmediate : null;
        function G(z) {
          for (var N = b(p); N !== null; ) {
            if (N.callback === null) s(p);
            else if (N.startTime <= z) (s(p), (N.sortIndex = N.expirationTime), M(j, N));
            else break;
            N = b(p);
          }
        }
        function Hl(z) {
          if (((xl = !1), G(z), !cl))
            if (b(j) !== null) ((cl = !0), Vl || ((Vl = !0), ql()));
            else {
              var N = b(p);
              N !== null && Wl(Hl, N.startTime - z);
            }
        }
        var Vl = !1,
          $ = -1,
          ol = 5,
          Zl = -1;
        function Ae() {
          return At ? !0 : !(d.unstable_now() - Zl < ol);
        }
        function yt() {
          if (((At = !1), Vl)) {
            var z = d.unstable_now();
            Zl = z;
            var N = !0;
            try {
              l: {
                ((cl = !1), xl && ((xl = !1), J($), ($ = -1)), (Sl = !0));
                var O = K;
                try {
                  t: {
                    for (G(z), D = b(j); D !== null && !(D.expirationTime > z && Ae()); ) {
                      var V = D.callback;
                      if (typeof V == 'function') {
                        ((D.callback = null), (K = D.priorityLevel));
                        var ll = V(D.expirationTime <= z);
                        if (((z = d.unstable_now()), typeof ll == 'function')) {
                          ((D.callback = ll), G(z), (N = !0));
                          break t;
                        }
                        (D === b(j) && s(j), G(z));
                      } else s(j);
                      D = b(j);
                    }
                    if (D !== null) N = !0;
                    else {
                      var r = b(p);
                      (r !== null && Wl(Hl, r.startTime - z), (N = !1));
                    }
                  }
                  break l;
                } finally {
                  ((D = null), (K = O), (Sl = !1));
                }
                N = void 0;
              }
            } finally {
              N ? ql() : (Vl = !1);
            }
          }
        }
        var ql;
        if (typeof fl == 'function')
          ql = function () {
            fl(yt);
          };
        else if (typeof MessageChannel < 'u') {
          var Rt = new MessageChannel(),
            xt = Rt.port2;
          ((Rt.port1.onmessage = yt),
            (ql = function () {
              xt.postMessage(null);
            }));
        } else
          ql = function () {
            Jl(yt, 0);
          };
        function Wl(z, N) {
          $ = Jl(function () {
            z(d.unstable_now());
          }, N);
        }
        ((d.unstable_IdlePriority = 5),
          (d.unstable_ImmediatePriority = 1),
          (d.unstable_LowPriority = 4),
          (d.unstable_NormalPriority = 3),
          (d.unstable_Profiling = null),
          (d.unstable_UserBlockingPriority = 2),
          (d.unstable_cancelCallback = function (z) {
            z.callback = null;
          }),
          (d.unstable_forceFrameRate = function (z) {
            0 > z || 125 < z
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (ol = 0 < z ? Math.floor(1e3 / z) : 5);
          }),
          (d.unstable_getCurrentPriorityLevel = function () {
            return K;
          }),
          (d.unstable_next = function (z) {
            switch (K) {
              case 1:
              case 2:
              case 3:
                var N = 3;
                break;
              default:
                N = K;
            }
            var O = K;
            K = N;
            try {
              return z();
            } finally {
              K = O;
            }
          }),
          (d.unstable_requestPaint = function () {
            At = !0;
          }),
          (d.unstable_runWithPriority = function (z, N) {
            switch (z) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                z = 3;
            }
            var O = K;
            K = z;
            try {
              return N();
            } finally {
              K = O;
            }
          }),
          (d.unstable_scheduleCallback = function (z, N, O) {
            var V = d.unstable_now();
            switch (
              (typeof O == 'object' && O !== null
                ? ((O = O.delay), (O = typeof O == 'number' && 0 < O ? V + O : V))
                : (O = V),
              z)
            ) {
              case 1:
                var ll = -1;
                break;
              case 2:
                ll = 250;
                break;
              case 5:
                ll = 1073741823;
                break;
              case 4:
                ll = 1e4;
                break;
              default:
                ll = 5e3;
            }
            return (
              (ll = O + ll),
              (z = { id: Q++, callback: N, priorityLevel: z, startTime: O, expirationTime: ll, sortIndex: -1 }),
              O > V
                ? ((z.sortIndex = O),
                  M(p, z),
                  b(j) === null && z === b(p) && (xl ? (J($), ($ = -1)) : (xl = !0), Wl(Hl, O - V)))
                : ((z.sortIndex = ll), M(j, z), cl || Sl || ((cl = !0), Vl || ((Vl = !0), ql()))),
              z
            );
          }),
          (d.unstable_shouldYield = Ae),
          (d.unstable_wrapCallback = function (z) {
            var N = K;
            return function () {
              var O = K;
              K = N;
              try {
                return z.apply(this, arguments);
              } finally {
                K = O;
              }
            };
          }));
      })(Sf)),
    Sf
  );
}
var R0;
function A1() {
  return (R0 || ((R0 = 1), (pf.exports = _1())), pf.exports);
}
var zf = { exports: {} },
  Ll = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var H0;
function x1() {
  if (H0) return Ll;
  H0 = 1;
  var d = _f();
  function M(j) {
    var p = 'https://react.dev/errors/' + j;
    if (1 < arguments.length) {
      p += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var Q = 2; Q < arguments.length; Q++) p += '&args[]=' + encodeURIComponent(arguments[Q]);
    }
    return (
      'Minified React error #' +
      j +
      '; visit ' +
      p +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function b() {}
  var s = {
      d: {
        f: b,
        r: function () {
          throw Error(M(522));
        },
        D: b,
        C: b,
        L: b,
        m: b,
        X: b,
        S: b,
        M: b,
      },
      p: 0,
      findDOMNode: null,
    },
    A = Symbol.for('react.portal');
  function C(j, p, Q) {
    var D = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: A, key: D == null ? null : '' + D, children: j, containerInfo: p, implementation: Q };
  }
  var B = d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function Z(j, p) {
    if (j === 'font') return '';
    if (typeof p == 'string') return p === 'use-credentials' ? p : '';
  }
  return (
    (Ll.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
    (Ll.createPortal = function (j, p) {
      var Q = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!p || (p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)) throw Error(M(299));
      return C(j, p, null, Q);
    }),
    (Ll.flushSync = function (j) {
      var p = B.T,
        Q = s.p;
      try {
        if (((B.T = null), (s.p = 2), j)) return j();
      } finally {
        ((B.T = p), (s.p = Q), s.d.f());
      }
    }),
    (Ll.preconnect = function (j, p) {
      typeof j == 'string' &&
        (p
          ? ((p = p.crossOrigin), (p = typeof p == 'string' ? (p === 'use-credentials' ? p : '') : void 0))
          : (p = null),
        s.d.C(j, p));
    }),
    (Ll.prefetchDNS = function (j) {
      typeof j == 'string' && s.d.D(j);
    }),
    (Ll.preinit = function (j, p) {
      if (typeof j == 'string' && p && typeof p.as == 'string') {
        var Q = p.as,
          D = Z(Q, p.crossOrigin),
          K = typeof p.integrity == 'string' ? p.integrity : void 0,
          Sl = typeof p.fetchPriority == 'string' ? p.fetchPriority : void 0;
        Q === 'style'
          ? s.d.S(j, typeof p.precedence == 'string' ? p.precedence : void 0, {
              crossOrigin: D,
              integrity: K,
              fetchPriority: Sl,
            })
          : Q === 'script' &&
            s.d.X(j, {
              crossOrigin: D,
              integrity: K,
              fetchPriority: Sl,
              nonce: typeof p.nonce == 'string' ? p.nonce : void 0,
            });
      }
    }),
    (Ll.preinitModule = function (j, p) {
      if (typeof j == 'string')
        if (typeof p == 'object' && p !== null) {
          if (p.as == null || p.as === 'script') {
            var Q = Z(p.as, p.crossOrigin);
            s.d.M(j, {
              crossOrigin: Q,
              integrity: typeof p.integrity == 'string' ? p.integrity : void 0,
              nonce: typeof p.nonce == 'string' ? p.nonce : void 0,
            });
          }
        } else p == null && s.d.M(j);
    }),
    (Ll.preload = function (j, p) {
      if (typeof j == 'string' && typeof p == 'object' && p !== null && typeof p.as == 'string') {
        var Q = p.as,
          D = Z(Q, p.crossOrigin);
        s.d.L(j, Q, {
          crossOrigin: D,
          integrity: typeof p.integrity == 'string' ? p.integrity : void 0,
          nonce: typeof p.nonce == 'string' ? p.nonce : void 0,
          type: typeof p.type == 'string' ? p.type : void 0,
          fetchPriority: typeof p.fetchPriority == 'string' ? p.fetchPriority : void 0,
          referrerPolicy: typeof p.referrerPolicy == 'string' ? p.referrerPolicy : void 0,
          imageSrcSet: typeof p.imageSrcSet == 'string' ? p.imageSrcSet : void 0,
          imageSizes: typeof p.imageSizes == 'string' ? p.imageSizes : void 0,
          media: typeof p.media == 'string' ? p.media : void 0,
        });
      }
    }),
    (Ll.preloadModule = function (j, p) {
      if (typeof j == 'string')
        if (p) {
          var Q = Z(p.as, p.crossOrigin);
          s.d.m(j, {
            as: typeof p.as == 'string' && p.as !== 'script' ? p.as : void 0,
            crossOrigin: Q,
            integrity: typeof p.integrity == 'string' ? p.integrity : void 0,
          });
        } else s.d.m(j);
    }),
    (Ll.requestFormReset = function (j) {
      s.d.r(j);
    }),
    (Ll.unstable_batchedUpdates = function (j, p) {
      return j(p);
    }),
    (Ll.useFormState = function (j, p, Q) {
      return B.H.useFormState(j, p, Q);
    }),
    (Ll.useFormStatus = function () {
      return B.H.useHostTransitionStatus();
    }),
    (Ll.version = '19.2.4'),
    Ll
  );
}
var q0;
function M1() {
  if (q0) return zf.exports;
  q0 = 1;
  function d() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(d);
      } catch (M) {
        console.error(M);
      }
  }
  return (d(), (zf.exports = x1()), zf.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var B0;
function O1() {
  if (B0) return _u;
  B0 = 1;
  var d = A1(),
    M = _f(),
    b = M1();
  function s(l) {
    var t = 'https://react.dev/errors/' + l;
    if (1 < arguments.length) {
      t += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++) t += '&args[]=' + encodeURIComponent(arguments[e]);
    }
    return (
      'Minified React error #' +
      l +
      '; visit ' +
      t +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function A(l) {
    return !(!l || (l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11));
  }
  function C(l) {
    var t = l,
      e = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do ((t = l), (t.flags & 4098) !== 0 && (e = t.return), (l = t.return));
      while (l);
    }
    return t.tag === 3 ? e : null;
  }
  function B(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if ((t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)), t !== null)) return t.dehydrated;
    }
    return null;
  }
  function Z(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if ((t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)), t !== null)) return t.dehydrated;
    }
    return null;
  }
  function j(l) {
    if (C(l) !== l) throw Error(s(188));
  }
  function p(l) {
    var t = l.alternate;
    if (!t) {
      if (((t = C(l)), t === null)) throw Error(s(188));
      return t !== l ? null : l;
    }
    for (var e = l, a = t; ; ) {
      var u = e.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (((a = u.return), a !== null)) {
          e = a;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === e) return (j(u), l);
          if (n === a) return (j(u), t);
          n = n.sibling;
        }
        throw Error(s(188));
      }
      if (e.return !== a.return) ((e = u), (a = n));
      else {
        for (var i = !1, c = u.child; c; ) {
          if (c === e) {
            ((i = !0), (e = u), (a = n));
            break;
          }
          if (c === a) {
            ((i = !0), (a = u), (e = n));
            break;
          }
          c = c.sibling;
        }
        if (!i) {
          for (c = n.child; c; ) {
            if (c === e) {
              ((i = !0), (e = n), (a = u));
              break;
            }
            if (c === a) {
              ((i = !0), (a = n), (e = u));
              break;
            }
            c = c.sibling;
          }
          if (!i) throw Error(s(189));
        }
      }
      if (e.alternate !== a) throw Error(s(190));
    }
    if (e.tag !== 3) throw Error(s(188));
    return e.stateNode.current === e ? l : t;
  }
  function Q(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (((t = Q(l)), t !== null)) return t;
      l = l.sibling;
    }
    return null;
  }
  var D = Object.assign,
    K = Symbol.for('react.element'),
    Sl = Symbol.for('react.transitional.element'),
    cl = Symbol.for('react.portal'),
    xl = Symbol.for('react.fragment'),
    At = Symbol.for('react.strict_mode'),
    Jl = Symbol.for('react.profiler'),
    J = Symbol.for('react.consumer'),
    fl = Symbol.for('react.context'),
    G = Symbol.for('react.forward_ref'),
    Hl = Symbol.for('react.suspense'),
    Vl = Symbol.for('react.suspense_list'),
    $ = Symbol.for('react.memo'),
    ol = Symbol.for('react.lazy'),
    Zl = Symbol.for('react.activity'),
    Ae = Symbol.for('react.memo_cache_sentinel'),
    yt = Symbol.iterator;
  function ql(l) {
    return l === null || typeof l != 'object'
      ? null
      : ((l = (yt && l[yt]) || l['@@iterator']), typeof l == 'function' ? l : null);
  }
  var Rt = Symbol.for('react.client.reference');
  function xt(l) {
    if (l == null) return null;
    if (typeof l == 'function') return l.$$typeof === Rt ? null : l.displayName || l.name || null;
    if (typeof l == 'string') return l;
    switch (l) {
      case xl:
        return 'Fragment';
      case Jl:
        return 'Profiler';
      case At:
        return 'StrictMode';
      case Hl:
        return 'Suspense';
      case Vl:
        return 'SuspenseList';
      case Zl:
        return 'Activity';
    }
    if (typeof l == 'object')
      switch (l.$$typeof) {
        case cl:
          return 'Portal';
        case fl:
          return l.displayName || 'Context';
        case J:
          return (l._context.displayName || 'Context') + '.Consumer';
        case G:
          var t = l.render;
          return (
            (l = l.displayName),
            l || ((l = t.displayName || t.name || ''), (l = l !== '' ? 'ForwardRef(' + l + ')' : 'ForwardRef')),
            l
          );
        case $:
          return ((t = l.displayName || null), t !== null ? t : xt(l.type) || 'Memo');
        case ol:
          ((t = l._payload), (l = l._init));
          try {
            return xt(l(t));
          } catch {}
      }
    return null;
  }
  var Wl = Array.isArray,
    z = M.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    N = b.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    O = { pending: !1, data: null, method: null, action: null },
    V = [],
    ll = -1;
  function r(l) {
    return { current: l };
  }
  function x(l) {
    0 > ll || ((l.current = V[ll]), (V[ll] = null), ll--);
  }
  function U(l, t) {
    (ll++, (V[ll] = l.current), (l.current = t));
  }
  var H = r(null),
    w = r(null),
    F = r(null),
    sl = r(null);
  function wl(l, t) {
    switch ((U(F, t), U(w, l), U(H, null), t.nodeType)) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Ir(l) : 0;
        break;
      default:
        if (((l = t.tagName), (t = t.namespaceURI))) ((t = Ir(t)), (l = Pr(t, l)));
        else
          switch (l) {
            case 'svg':
              l = 1;
              break;
            case 'math':
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    (x(H), U(H, l));
  }
  function El() {
    (x(H), x(w), x(F));
  }
  function Na(l) {
    l.memoizedState !== null && U(sl, l);
    var t = H.current,
      e = Pr(t, l.type);
    t !== e && (U(w, l), U(H, e));
  }
  function Ou(l) {
    (w.current === l && (x(H), x(w)), sl.current === l && (x(sl), (pu._currentValue = O)));
  }
  var Fn, Mf;
  function xe(l) {
    if (Fn === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        ((Fn = (t && t[1]) || ''),
          (Mf =
            -1 <
            e.stack.indexOf(`
    at`)
              ? ' (<anonymous>)'
              : -1 < e.stack.indexOf('@')
                ? '@unknown:0:0'
                : ''));
      }
    return (
      `
` +
      Fn +
      l +
      Mf
    );
  }
  var In = !1;
  function Pn(l, t) {
    if (!l || In) return '';
    In = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var _ = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(_.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(_, []);
                } catch (g) {
                  var v = g;
                }
                Reflect.construct(l, [], _);
              } else {
                try {
                  _.call();
                } catch (g) {
                  v = g;
                }
                l.call(_.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (g) {
                v = g;
              }
              (_ = l()) && typeof _.catch == 'function' && _.catch(function () {});
            }
          } catch (g) {
            if (g && v && typeof g.stack == 'string') return [g.stack, v.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var u = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, 'name');
      u &&
        u.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, 'name', { value: 'DetermineComponentFrameRoot' });
      var n = a.DetermineComponentFrameRoot(),
        i = n[0],
        c = n[1];
      if (i && c) {
        var f = i.split(`
`),
          h = c.split(`
`);
        for (u = a = 0; a < f.length && !f[a].includes('DetermineComponentFrameRoot'); ) a++;
        for (; u < h.length && !h[u].includes('DetermineComponentFrameRoot'); ) u++;
        if (a === f.length || u === h.length)
          for (a = f.length - 1, u = h.length - 1; 1 <= a && 0 <= u && f[a] !== h[u]; ) u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (f[a] !== h[u]) {
            if (a !== 1 || u !== 1)
              do
                if ((a--, u--, 0 > u || f[a] !== h[u])) {
                  var S =
                    `
` + f[a].replace(' at new ', ' at ');
                  return (
                    l.displayName && S.includes('<anonymous>') && (S = S.replace('<anonymous>', l.displayName)),
                    S
                  );
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      ((In = !1), (Error.prepareStackTrace = e));
    }
    return (e = l ? l.displayName || l.name : '') ? xe(e) : '';
  }
  function F0(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return xe(l.type);
      case 16:
        return xe('Lazy');
      case 13:
        return l.child !== t && t !== null ? xe('Suspense Fallback') : xe('Suspense');
      case 19:
        return xe('SuspenseList');
      case 0:
      case 15:
        return Pn(l.type, !1);
      case 11:
        return Pn(l.type.render, !1);
      case 1:
        return Pn(l.type, !0);
      case 31:
        return xe('Activity');
      default:
        return '';
    }
  }
  function Of(l) {
    try {
      var t = '',
        e = null;
      do ((t += F0(l, e)), (e = l), (l = l.return));
      while (l);
      return t;
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      );
    }
  }
  var li = Object.prototype.hasOwnProperty,
    ti = d.unstable_scheduleCallback,
    ei = d.unstable_cancelCallback,
    I0 = d.unstable_shouldYield,
    P0 = d.unstable_requestPaint,
    at = d.unstable_now,
    ld = d.unstable_getCurrentPriorityLevel,
    Df = d.unstable_ImmediatePriority,
    Nf = d.unstable_UserBlockingPriority,
    Du = d.unstable_NormalPriority,
    td = d.unstable_LowPriority,
    Cf = d.unstable_IdlePriority,
    ed = d.log,
    ad = d.unstable_setDisableYieldValue,
    Ca = null,
    ut = null;
  function le(l) {
    if ((typeof ed == 'function' && ad(l), ut && typeof ut.setStrictMode == 'function'))
      try {
        ut.setStrictMode(Ca, l);
      } catch {}
  }
  var nt = Math.clz32 ? Math.clz32 : id,
    ud = Math.log,
    nd = Math.LN2;
  function id(l) {
    return ((l >>>= 0), l === 0 ? 32 : (31 - ((ud(l) / nd) | 0)) | 0);
  }
  var Nu = 256,
    Cu = 262144,
    Uu = 4194304;
  function Me(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function ju(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var u = 0,
      n = l.suspendedLanes,
      i = l.pingedLanes;
    l = l.warmLanes;
    var c = a & 134217727;
    return (
      c !== 0
        ? ((a = c & ~n),
          a !== 0 ? (u = Me(a)) : ((i &= c), i !== 0 ? (u = Me(i)) : e || ((e = c & ~l), e !== 0 && (u = Me(e)))))
        : ((c = a & ~n), c !== 0 ? (u = Me(c)) : i !== 0 ? (u = Me(i)) : e || ((e = a & ~l), e !== 0 && (u = Me(e)))),
      u === 0
        ? 0
        : t !== 0 &&
            t !== u &&
            (t & n) === 0 &&
            ((n = u & -u), (e = t & -t), n >= e || (n === 32 && (e & 4194048) !== 0))
          ? t
          : u
    );
  }
  function Ua(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function cd(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Uf() {
    var l = Uu;
    return ((Uu <<= 1), (Uu & 62914560) === 0 && (Uu = 4194304), l);
  }
  function ai(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function ja(l, t) {
    ((l.pendingLanes |= t), t !== 268435456 && ((l.suspendedLanes = 0), (l.pingedLanes = 0), (l.warmLanes = 0)));
  }
  function fd(l, t, e, a, u, n) {
    var i = l.pendingLanes;
    ((l.pendingLanes = e),
      (l.suspendedLanes = 0),
      (l.pingedLanes = 0),
      (l.warmLanes = 0),
      (l.expiredLanes &= e),
      (l.entangledLanes &= e),
      (l.errorRecoveryDisabledLanes &= e),
      (l.shellSuspendCounter = 0));
    var c = l.entanglements,
      f = l.expirationTimes,
      h = l.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var S = 31 - nt(e),
        _ = 1 << S;
      ((c[S] = 0), (f[S] = -1));
      var v = h[S];
      if (v !== null)
        for (h[S] = null, S = 0; S < v.length; S++) {
          var g = v[S];
          g !== null && (g.lane &= -536870913);
        }
      e &= ~_;
    }
    (a !== 0 && jf(l, a, 0), n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(i & ~t)));
  }
  function jf(l, t, e) {
    ((l.pendingLanes |= t), (l.suspendedLanes &= ~t));
    var a = 31 - nt(t);
    ((l.entangledLanes |= t), (l.entanglements[a] = l.entanglements[a] | 1073741824 | (e & 261930)));
  }
  function Rf(l, t) {
    var e = (l.entangledLanes |= t);
    for (l = l.entanglements; e; ) {
      var a = 31 - nt(e),
        u = 1 << a;
      ((u & t) | (l[a] & t) && (l[a] |= t), (e &= ~u));
    }
  }
  function Hf(l, t) {
    var e = t & -t;
    return ((e = (e & 42) !== 0 ? 1 : ui(e)), (e & (l.suspendedLanes | t)) !== 0 ? 0 : e);
  }
  function ui(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function ni(l) {
    return ((l &= -l), 2 < l ? (8 < l ? ((l & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function qf() {
    var l = N.p;
    return l !== 0 ? l : ((l = window.event), l === void 0 ? 32 : T0(l.type));
  }
  function Bf(l, t) {
    var e = N.p;
    try {
      return ((N.p = l), t());
    } finally {
      N.p = e;
    }
  }
  var te = Math.random().toString(36).slice(2),
    Bl = '__reactFiber$' + te,
    $l = '__reactProps$' + te,
    Je = '__reactContainer$' + te,
    ii = '__reactEvents$' + te,
    sd = '__reactListeners$' + te,
    od = '__reactHandles$' + te,
    Yf = '__reactResources$' + te,
    Ra = '__reactMarker$' + te;
  function ci(l) {
    (delete l[Bl], delete l[$l], delete l[ii], delete l[sd], delete l[od]);
  }
  function we(l) {
    var t = l[Bl];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if ((t = e[Je] || e[Bl])) {
        if (((e = t.alternate), t.child !== null || (e !== null && e.child !== null)))
          for (l = i0(l); l !== null; ) {
            if ((e = l[Bl])) return e;
            l = i0(l);
          }
        return t;
      }
      ((l = e), (e = l.parentNode));
    }
    return null;
  }
  function ke(l) {
    if ((l = l[Bl] || l[Je])) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return l;
    }
    return null;
  }
  function Ha(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(s(33));
  }
  function We(l) {
    var t = l[Yf];
    return (t || (t = l[Yf] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function jl(l) {
    l[Ra] = !0;
  }
  var Gf = new Set(),
    Xf = {};
  function Oe(l, t) {
    ($e(l, t), $e(l + 'Capture', t));
  }
  function $e(l, t) {
    for (Xf[l] = t, l = 0; l < t.length; l++) Gf.add(t[l]);
  }
  var rd = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Qf = {},
    Vf = {};
  function dd(l) {
    return li.call(Vf, l) ? !0 : li.call(Qf, l) ? !1 : rd.test(l) ? (Vf[l] = !0) : ((Qf[l] = !0), !1);
  }
  function Ru(l, t, e) {
    if (dd(t))
      if (e === null) l.removeAttribute(t);
      else {
        switch (typeof e) {
          case 'undefined':
          case 'function':
          case 'symbol':
            l.removeAttribute(t);
            return;
          case 'boolean':
            var a = t.toLowerCase().slice(0, 5);
            if (a !== 'data-' && a !== 'aria-') {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, '' + e);
      }
  }
  function Hu(l, t, e) {
    if (e === null) l.removeAttribute(t);
    else {
      switch (typeof e) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, '' + e);
    }
  }
  function Ht(l, t, e, a) {
    if (a === null) l.removeAttribute(e);
    else {
      switch (typeof a) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          l.removeAttribute(e);
          return;
      }
      l.setAttributeNS(t, e, '' + a);
    }
  }
  function ht(l) {
    switch (typeof l) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return l;
      case 'object':
        return l;
      default:
        return '';
    }
  }
  function Zf(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function md(l, t, e) {
    var a = Object.getOwnPropertyDescriptor(l.constructor.prototype, t);
    if (!l.hasOwnProperty(t) && typeof a < 'u' && typeof a.get == 'function' && typeof a.set == 'function') {
      var u = a.get,
        n = a.set;
      return (
        Object.defineProperty(l, t, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (i) {
            ((e = '' + i), n.call(this, i));
          },
        }),
        Object.defineProperty(l, t, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return e;
          },
          setValue: function (i) {
            e = '' + i;
          },
          stopTracking: function () {
            ((l._valueTracker = null), delete l[t]);
          },
        }
      );
    }
  }
  function fi(l) {
    if (!l._valueTracker) {
      var t = Zf(l) ? 'checked' : 'value';
      l._valueTracker = md(l, t, '' + l[t]);
    }
  }
  function Lf(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var e = t.getValue(),
      a = '';
    return (l && (a = Zf(l) ? (l.checked ? 'true' : 'false') : l.value), (l = a), l !== e ? (t.setValue(l), !0) : !1);
  }
  function qu(l) {
    if (((l = l || (typeof document < 'u' ? document : void 0)), typeof l > 'u')) return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var yd = /[\n"\\]/g;
  function vt(l) {
    return l.replace(yd, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function si(l, t, e, a, u, n, i, c) {
    ((l.name = ''),
      i != null && typeof i != 'function' && typeof i != 'symbol' && typeof i != 'boolean'
        ? (l.type = i)
        : l.removeAttribute('type'),
      t != null
        ? i === 'number'
          ? ((t === 0 && l.value === '') || l.value != t) && (l.value = '' + ht(t))
          : l.value !== '' + ht(t) && (l.value = '' + ht(t))
        : (i !== 'submit' && i !== 'reset') || l.removeAttribute('value'),
      t != null ? oi(l, i, ht(t)) : e != null ? oi(l, i, ht(e)) : a != null && l.removeAttribute('value'),
      u == null && n != null && (l.defaultChecked = !!n),
      u != null && (l.checked = u && typeof u != 'function' && typeof u != 'symbol'),
      c != null && typeof c != 'function' && typeof c != 'symbol' && typeof c != 'boolean'
        ? (l.name = '' + ht(c))
        : l.removeAttribute('name'));
  }
  function Kf(l, t, e, a, u, n, i, c) {
    if (
      (n != null && typeof n != 'function' && typeof n != 'symbol' && typeof n != 'boolean' && (l.type = n),
      t != null || e != null)
    ) {
      if (!((n !== 'submit' && n !== 'reset') || t != null)) {
        fi(l);
        return;
      }
      ((e = e != null ? '' + ht(e) : ''),
        (t = t != null ? '' + ht(t) : e),
        c || t === l.value || (l.value = t),
        (l.defaultValue = t));
    }
    ((a = a ?? u),
      (a = typeof a != 'function' && typeof a != 'symbol' && !!a),
      (l.checked = c ? l.checked : !!a),
      (l.defaultChecked = !!a),
      i != null && typeof i != 'function' && typeof i != 'symbol' && typeof i != 'boolean' && (l.name = i),
      fi(l));
  }
  function oi(l, t, e) {
    (t === 'number' && qu(l.ownerDocument) === l) || l.defaultValue === '' + e || (l.defaultValue = '' + e);
  }
  function Fe(l, t, e, a) {
    if (((l = l.options), t)) {
      t = {};
      for (var u = 0; u < e.length; u++) t['$' + e[u]] = !0;
      for (e = 0; e < l.length; e++)
        ((u = t.hasOwnProperty('$' + l[e].value)),
          l[e].selected !== u && (l[e].selected = u),
          u && a && (l[e].defaultSelected = !0));
    } else {
      for (e = '' + ht(e), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === e) {
          ((l[u].selected = !0), a && (l[u].defaultSelected = !0));
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Jf(l, t, e) {
    if (t != null && ((t = '' + ht(t)), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? '' + ht(e) : '';
  }
  function wf(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(s(92));
        if (Wl(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        e = a;
      }
      (e == null && (e = ''), (t = e));
    }
    ((e = ht(t)), (l.defaultValue = e), (a = l.textContent), a === e && a !== '' && a !== null && (l.value = a), fi(l));
  }
  function Ie(l, t) {
    if (t) {
      var e = l.firstChild;
      if (e && e === l.lastChild && e.nodeType === 3) {
        e.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var hd = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function kf(l, t, e) {
    var a = t.indexOf('--') === 0;
    e == null || typeof e == 'boolean' || e === ''
      ? a
        ? l.setProperty(t, '')
        : t === 'float'
          ? (l.cssFloat = '')
          : (l[t] = '')
      : a
        ? l.setProperty(t, e)
        : typeof e != 'number' || e === 0 || hd.has(t)
          ? t === 'float'
            ? (l.cssFloat = e)
            : (l[t] = ('' + e).trim())
          : (l[t] = e + 'px');
  }
  function Wf(l, t, e) {
    if (t != null && typeof t != 'object') throw Error(s(62));
    if (((l = l.style), e != null)) {
      for (var a in e)
        !e.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf('--') === 0 ? l.setProperty(a, '') : a === 'float' ? (l.cssFloat = '') : (l[a] = ''));
      for (var u in t) ((a = t[u]), t.hasOwnProperty(u) && e[u] !== a && kf(l, u, a));
    } else for (var n in t) t.hasOwnProperty(n) && kf(l, n, t[n]);
  }
  function ri(l) {
    if (l.indexOf('-') === -1) return !1;
    switch (l) {
      case 'annotation-xml':
      case 'color-profile':
      case 'font-face':
      case 'font-face-src':
      case 'font-face-uri':
      case 'font-face-format':
      case 'font-face-name':
      case 'missing-glyph':
        return !1;
      default:
        return !0;
    }
  }
  var vd = new Map([
      ['acceptCharset', 'accept-charset'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
      ['crossOrigin', 'crossorigin'],
      ['accentHeight', 'accent-height'],
      ['alignmentBaseline', 'alignment-baseline'],
      ['arabicForm', 'arabic-form'],
      ['baselineShift', 'baseline-shift'],
      ['capHeight', 'cap-height'],
      ['clipPath', 'clip-path'],
      ['clipRule', 'clip-rule'],
      ['colorInterpolation', 'color-interpolation'],
      ['colorInterpolationFilters', 'color-interpolation-filters'],
      ['colorProfile', 'color-profile'],
      ['colorRendering', 'color-rendering'],
      ['dominantBaseline', 'dominant-baseline'],
      ['enableBackground', 'enable-background'],
      ['fillOpacity', 'fill-opacity'],
      ['fillRule', 'fill-rule'],
      ['floodColor', 'flood-color'],
      ['floodOpacity', 'flood-opacity'],
      ['fontFamily', 'font-family'],
      ['fontSize', 'font-size'],
      ['fontSizeAdjust', 'font-size-adjust'],
      ['fontStretch', 'font-stretch'],
      ['fontStyle', 'font-style'],
      ['fontVariant', 'font-variant'],
      ['fontWeight', 'font-weight'],
      ['glyphName', 'glyph-name'],
      ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
      ['glyphOrientationVertical', 'glyph-orientation-vertical'],
      ['horizAdvX', 'horiz-adv-x'],
      ['horizOriginX', 'horiz-origin-x'],
      ['imageRendering', 'image-rendering'],
      ['letterSpacing', 'letter-spacing'],
      ['lightingColor', 'lighting-color'],
      ['markerEnd', 'marker-end'],
      ['markerMid', 'marker-mid'],
      ['markerStart', 'marker-start'],
      ['overlinePosition', 'overline-position'],
      ['overlineThickness', 'overline-thickness'],
      ['paintOrder', 'paint-order'],
      ['panose-1', 'panose-1'],
      ['pointerEvents', 'pointer-events'],
      ['renderingIntent', 'rendering-intent'],
      ['shapeRendering', 'shape-rendering'],
      ['stopColor', 'stop-color'],
      ['stopOpacity', 'stop-opacity'],
      ['strikethroughPosition', 'strikethrough-position'],
      ['strikethroughThickness', 'strikethrough-thickness'],
      ['strokeDasharray', 'stroke-dasharray'],
      ['strokeDashoffset', 'stroke-dashoffset'],
      ['strokeLinecap', 'stroke-linecap'],
      ['strokeLinejoin', 'stroke-linejoin'],
      ['strokeMiterlimit', 'stroke-miterlimit'],
      ['strokeOpacity', 'stroke-opacity'],
      ['strokeWidth', 'stroke-width'],
      ['textAnchor', 'text-anchor'],
      ['textDecoration', 'text-decoration'],
      ['textRendering', 'text-rendering'],
      ['transformOrigin', 'transform-origin'],
      ['underlinePosition', 'underline-position'],
      ['underlineThickness', 'underline-thickness'],
      ['unicodeBidi', 'unicode-bidi'],
      ['unicodeRange', 'unicode-range'],
      ['unitsPerEm', 'units-per-em'],
      ['vAlphabetic', 'v-alphabetic'],
      ['vHanging', 'v-hanging'],
      ['vIdeographic', 'v-ideographic'],
      ['vMathematical', 'v-mathematical'],
      ['vectorEffect', 'vector-effect'],
      ['vertAdvY', 'vert-adv-y'],
      ['vertOriginX', 'vert-origin-x'],
      ['vertOriginY', 'vert-origin-y'],
      ['wordSpacing', 'word-spacing'],
      ['writingMode', 'writing-mode'],
      ['xmlnsXlink', 'xmlns:xlink'],
      ['xHeight', 'x-height'],
    ]),
    gd =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Bu(l) {
    return gd.test('' + l)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : l;
  }
  function qt() {}
  var di = null;
  function mi(l) {
    return (
      (l = l.target || l.srcElement || window),
      l.correspondingUseElement && (l = l.correspondingUseElement),
      l.nodeType === 3 ? l.parentNode : l
    );
  }
  var Pe = null,
    la = null;
  function $f(l) {
    var t = ke(l);
    if (t && (l = t.stateNode)) {
      var e = l[$l] || null;
      l: switch (((l = t.stateNode), t.type)) {
        case 'input':
          if (
            (si(l, e.value, e.defaultValue, e.defaultValue, e.checked, e.defaultChecked, e.type, e.name),
            (t = e.name),
            e.type === 'radio' && t != null)
          ) {
            for (e = l; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll('input[name="' + vt('' + t) + '"][type="radio"]'), t = 0; t < e.length; t++) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var u = a[$l] || null;
                if (!u) throw Error(s(90));
                si(a, u.value, u.defaultValue, u.defaultValue, u.checked, u.defaultChecked, u.type, u.name);
              }
            }
            for (t = 0; t < e.length; t++) ((a = e[t]), a.form === l.form && Lf(a));
          }
          break l;
        case 'textarea':
          Jf(l, e.value, e.defaultValue);
          break l;
        case 'select':
          ((t = e.value), t != null && Fe(l, !!e.multiple, t, !1));
      }
    }
  }
  var yi = !1;
  function Ff(l, t, e) {
    if (yi) return l(t, e);
    yi = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (((yi = !1), (Pe !== null || la !== null) && (An(), Pe && ((t = Pe), (l = la), (la = Pe = null), $f(t), l))))
        for (t = 0; t < l.length; t++) $f(l[t]);
    }
  }
  function qa(l, t) {
    var e = l.stateNode;
    if (e === null) return null;
    var a = e[$l] || null;
    if (a === null) return null;
    e = a[t];
    l: switch (t) {
      case 'onClick':
      case 'onClickCapture':
      case 'onDoubleClick':
      case 'onDoubleClickCapture':
      case 'onMouseDown':
      case 'onMouseDownCapture':
      case 'onMouseMove':
      case 'onMouseMoveCapture':
      case 'onMouseUp':
      case 'onMouseUpCapture':
      case 'onMouseEnter':
        ((a = !a.disabled) ||
          ((l = l.type), (a = !(l === 'button' || l === 'input' || l === 'select' || l === 'textarea'))),
          (l = !a));
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (e && typeof e != 'function') throw Error(s(231, t, typeof e));
    return e;
  }
  var Bt = !(typeof window > 'u' || typeof window.document > 'u' || typeof window.document.createElement > 'u'),
    hi = !1;
  if (Bt)
    try {
      var Ba = {};
      (Object.defineProperty(Ba, 'passive', {
        get: function () {
          hi = !0;
        },
      }),
        window.addEventListener('test', Ba, Ba),
        window.removeEventListener('test', Ba, Ba));
    } catch {
      hi = !1;
    }
  var ee = null,
    vi = null,
    Yu = null;
  function If() {
    if (Yu) return Yu;
    var l,
      t = vi,
      e = t.length,
      a,
      u = 'value' in ee ? ee.value : ee.textContent,
      n = u.length;
    for (l = 0; l < e && t[l] === u[l]; l++);
    var i = e - l;
    for (a = 1; a <= i && t[e - a] === u[n - a]; a++);
    return (Yu = u.slice(l, 1 < a ? 1 - a : void 0));
  }
  function Gu(l) {
    var t = l.keyCode;
    return (
      'charCode' in l ? ((l = l.charCode), l === 0 && t === 13 && (l = 13)) : (l = t),
      l === 10 && (l = 13),
      32 <= l || l === 13 ? l : 0
    );
  }
  function Xu() {
    return !0;
  }
  function Pf() {
    return !1;
  }
  function Fl(l) {
    function t(e, a, u, n, i) {
      ((this._reactName = e),
        (this._targetInst = u),
        (this.type = a),
        (this.nativeEvent = n),
        (this.target = i),
        (this.currentTarget = null));
      for (var c in l) l.hasOwnProperty(c) && ((e = l[c]), (this[c] = e ? e(n) : n[c]));
      return (
        (this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? Xu : Pf),
        (this.isPropagationStopped = Pf),
        this
      );
    }
    return (
      D(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var e = this.nativeEvent;
          e &&
            (e.preventDefault ? e.preventDefault() : typeof e.returnValue != 'unknown' && (e.returnValue = !1),
            (this.isDefaultPrevented = Xu));
        },
        stopPropagation: function () {
          var e = this.nativeEvent;
          e &&
            (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != 'unknown' && (e.cancelBubble = !0),
            (this.isPropagationStopped = Xu));
        },
        persist: function () {},
        isPersistent: Xu,
      }),
      t
    );
  }
  var De = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (l) {
        return l.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Qu = Fl(De),
    Ya = D({}, De, { view: 0, detail: 0 }),
    bd = Fl(Ya),
    gi,
    bi,
    Ga,
    Vu = D({}, Ya, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Si,
      button: 0,
      buttons: 0,
      relatedTarget: function (l) {
        return l.relatedTarget === void 0
          ? l.fromElement === l.srcElement
            ? l.toElement
            : l.fromElement
          : l.relatedTarget;
      },
      movementX: function (l) {
        return 'movementX' in l
          ? l.movementX
          : (l !== Ga &&
              (Ga && l.type === 'mousemove'
                ? ((gi = l.screenX - Ga.screenX), (bi = l.screenY - Ga.screenY))
                : (bi = gi = 0),
              (Ga = l)),
            gi);
      },
      movementY: function (l) {
        return 'movementY' in l ? l.movementY : bi;
      },
    }),
    ls = Fl(Vu),
    pd = D({}, Vu, { dataTransfer: 0 }),
    Sd = Fl(pd),
    zd = D({}, Ya, { relatedTarget: 0 }),
    pi = Fl(zd),
    Td = D({}, De, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Ed = Fl(Td),
    _d = D({}, De, {
      clipboardData: function (l) {
        return 'clipboardData' in l ? l.clipboardData : window.clipboardData;
      },
    }),
    Ad = Fl(_d),
    xd = D({}, De, { data: 0 }),
    ts = Fl(xd),
    Md = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified',
    },
    Od = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta',
    },
    Dd = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function Nd(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = Dd[l]) ? !!t[l] : !1;
  }
  function Si() {
    return Nd;
  }
  var Cd = D({}, Ya, {
      key: function (l) {
        if (l.key) {
          var t = Md[l.key] || l.key;
          if (t !== 'Unidentified') return t;
        }
        return l.type === 'keypress'
          ? ((l = Gu(l)), l === 13 ? 'Enter' : String.fromCharCode(l))
          : l.type === 'keydown' || l.type === 'keyup'
            ? Od[l.keyCode] || 'Unidentified'
            : '';
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Si,
      charCode: function (l) {
        return l.type === 'keypress' ? Gu(l) : 0;
      },
      keyCode: function (l) {
        return l.type === 'keydown' || l.type === 'keyup' ? l.keyCode : 0;
      },
      which: function (l) {
        return l.type === 'keypress' ? Gu(l) : l.type === 'keydown' || l.type === 'keyup' ? l.keyCode : 0;
      },
    }),
    Ud = Fl(Cd),
    jd = D({}, Vu, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    es = Fl(jd),
    Rd = D({}, Ya, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Si,
    }),
    Hd = Fl(Rd),
    qd = D({}, De, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Bd = Fl(qd),
    Yd = D({}, Vu, {
      deltaX: function (l) {
        return 'deltaX' in l ? l.deltaX : 'wheelDeltaX' in l ? -l.wheelDeltaX : 0;
      },
      deltaY: function (l) {
        return 'deltaY' in l ? l.deltaY : 'wheelDeltaY' in l ? -l.wheelDeltaY : 'wheelDelta' in l ? -l.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Gd = Fl(Yd),
    Xd = D({}, De, { newState: 0, oldState: 0 }),
    Qd = Fl(Xd),
    Vd = [9, 13, 27, 32],
    zi = Bt && 'CompositionEvent' in window,
    Xa = null;
  Bt && 'documentMode' in document && (Xa = document.documentMode);
  var Zd = Bt && 'TextEvent' in window && !Xa,
    as = Bt && (!zi || (Xa && 8 < Xa && 11 >= Xa)),
    us = ' ',
    ns = !1;
  function is(l, t) {
    switch (l) {
      case 'keyup':
        return Vd.indexOf(t.keyCode) !== -1;
      case 'keydown':
        return t.keyCode !== 229;
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0;
      default:
        return !1;
    }
  }
  function cs(l) {
    return ((l = l.detail), typeof l == 'object' && 'data' in l ? l.data : null);
  }
  var ta = !1;
  function Ld(l, t) {
    switch (l) {
      case 'compositionend':
        return cs(t);
      case 'keypress':
        return t.which !== 32 ? null : ((ns = !0), us);
      case 'textInput':
        return ((l = t.data), l === us && ns ? null : l);
      default:
        return null;
    }
  }
  function Kd(l, t) {
    if (ta)
      return l === 'compositionend' || (!zi && is(l, t)) ? ((l = If()), (Yu = vi = ee = null), (ta = !1), l) : null;
    switch (l) {
      case 'paste':
        return null;
      case 'keypress':
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case 'compositionend':
        return as && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var Jd = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function fs(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === 'input' ? !!Jd[l.type] : t === 'textarea';
  }
  function ss(l, t, e, a) {
    (Pe ? (la ? la.push(a) : (la = [a])) : (Pe = a),
      (t = Un(t, 'onChange')),
      0 < t.length && ((e = new Qu('onChange', 'change', null, e, a)), l.push({ event: e, listeners: t })));
  }
  var Qa = null,
    Va = null;
  function wd(l) {
    Jr(l, 0);
  }
  function Zu(l) {
    var t = Ha(l);
    if (Lf(t)) return l;
  }
  function os(l, t) {
    if (l === 'change') return t;
  }
  var rs = !1;
  if (Bt) {
    var Ti;
    if (Bt) {
      var Ei = 'oninput' in document;
      if (!Ei) {
        var ds = document.createElement('div');
        (ds.setAttribute('oninput', 'return;'), (Ei = typeof ds.oninput == 'function'));
      }
      Ti = Ei;
    } else Ti = !1;
    rs = Ti && (!document.documentMode || 9 < document.documentMode);
  }
  function ms() {
    Qa && (Qa.detachEvent('onpropertychange', ys), (Va = Qa = null));
  }
  function ys(l) {
    if (l.propertyName === 'value' && Zu(Va)) {
      var t = [];
      (ss(t, Va, l, mi(l)), Ff(wd, t));
    }
  }
  function kd(l, t, e) {
    l === 'focusin' ? (ms(), (Qa = t), (Va = e), Qa.attachEvent('onpropertychange', ys)) : l === 'focusout' && ms();
  }
  function Wd(l) {
    if (l === 'selectionchange' || l === 'keyup' || l === 'keydown') return Zu(Va);
  }
  function $d(l, t) {
    if (l === 'click') return Zu(t);
  }
  function Fd(l, t) {
    if (l === 'input' || l === 'change') return Zu(t);
  }
  function Id(l, t) {
    return (l === t && (l !== 0 || 1 / l === 1 / t)) || (l !== l && t !== t);
  }
  var it = typeof Object.is == 'function' ? Object.is : Id;
  function Za(l, t) {
    if (it(l, t)) return !0;
    if (typeof l != 'object' || l === null || typeof t != 'object' || t === null) return !1;
    var e = Object.keys(l),
      a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!li.call(t, u) || !it(l[u], t[u])) return !1;
    }
    return !0;
  }
  function hs(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function vs(l, t) {
    var e = hs(l);
    l = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (((a = l + e.textContent.length), l <= t && a >= t)) return { node: e, offset: t - l };
        l = a;
      }
      l: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break l;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = hs(e);
    }
  }
  function gs(l, t) {
    return l && t
      ? l === t
        ? !0
        : l && l.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? gs(l, t.parentNode)
            : 'contains' in l
              ? l.contains(t)
              : l.compareDocumentPosition
                ? !!(l.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function bs(l) {
    l =
      l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null
        ? l.ownerDocument.defaultView
        : window;
    for (var t = qu(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == 'string';
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = qu(l.document);
    }
    return t;
  }
  function _i(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return (
      t &&
      ((t === 'input' &&
        (l.type === 'text' || l.type === 'search' || l.type === 'tel' || l.type === 'url' || l.type === 'password')) ||
        t === 'textarea' ||
        l.contentEditable === 'true')
    );
  }
  var Pd = Bt && 'documentMode' in document && 11 >= document.documentMode,
    ea = null,
    Ai = null,
    La = null,
    xi = !1;
  function ps(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    xi ||
      ea == null ||
      ea !== qu(a) ||
      ((a = ea),
      'selectionStart' in a && _i(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = ((a.ownerDocument && a.ownerDocument.defaultView) || window).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (La && Za(La, a)) ||
        ((La = a),
        (a = Un(Ai, 'onSelect')),
        0 < a.length &&
          ((t = new Qu('onSelect', 'select', null, t, e)), l.push({ event: t, listeners: a }), (t.target = ea))));
  }
  function Ne(l, t) {
    var e = {};
    return ((e[l.toLowerCase()] = t.toLowerCase()), (e['Webkit' + l] = 'webkit' + t), (e['Moz' + l] = 'moz' + t), e);
  }
  var aa = {
      animationend: Ne('Animation', 'AnimationEnd'),
      animationiteration: Ne('Animation', 'AnimationIteration'),
      animationstart: Ne('Animation', 'AnimationStart'),
      transitionrun: Ne('Transition', 'TransitionRun'),
      transitionstart: Ne('Transition', 'TransitionStart'),
      transitioncancel: Ne('Transition', 'TransitionCancel'),
      transitionend: Ne('Transition', 'TransitionEnd'),
    },
    Mi = {},
    Ss = {};
  Bt &&
    ((Ss = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete aa.animationend.animation, delete aa.animationiteration.animation, delete aa.animationstart.animation),
    'TransitionEvent' in window || delete aa.transitionend.transition);
  function Ce(l) {
    if (Mi[l]) return Mi[l];
    if (!aa[l]) return l;
    var t = aa[l],
      e;
    for (e in t) if (t.hasOwnProperty(e) && e in Ss) return (Mi[l] = t[e]);
    return l;
  }
  var zs = Ce('animationend'),
    Ts = Ce('animationiteration'),
    Es = Ce('animationstart'),
    lm = Ce('transitionrun'),
    tm = Ce('transitionstart'),
    em = Ce('transitioncancel'),
    _s = Ce('transitionend'),
    As = new Map(),
    Oi =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Oi.push('scrollEnd');
  function Mt(l, t) {
    (As.set(l, t), Oe(t, [l]));
  }
  var Lu =
      typeof reportError == 'function'
        ? reportError
        : function (l) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var t = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof l == 'object' && l !== null && typeof l.message == 'string' ? String(l.message) : String(l),
                error: l,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', l);
              return;
            }
            console.error(l);
          },
    gt = [],
    ua = 0,
    Di = 0;
  function Ku() {
    for (var l = ua, t = (Di = ua = 0); t < l; ) {
      var e = gt[t];
      gt[t++] = null;
      var a = gt[t];
      gt[t++] = null;
      var u = gt[t];
      gt[t++] = null;
      var n = gt[t];
      if (((gt[t++] = null), a !== null && u !== null)) {
        var i = a.pending;
        (i === null ? (u.next = u) : ((u.next = i.next), (i.next = u)), (a.pending = u));
      }
      n !== 0 && xs(e, u, n);
    }
  }
  function Ju(l, t, e, a) {
    ((gt[ua++] = l),
      (gt[ua++] = t),
      (gt[ua++] = e),
      (gt[ua++] = a),
      (Di |= a),
      (l.lanes |= a),
      (l = l.alternate),
      l !== null && (l.lanes |= a));
  }
  function Ni(l, t, e, a) {
    return (Ju(l, t, e, a), wu(l));
  }
  function Ue(l, t) {
    return (Ju(l, null, null, t), wu(l));
  }
  function xs(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = l.return; n !== null; )
      ((n.childLanes |= e),
        (a = n.alternate),
        a !== null && (a.childLanes |= e),
        n.tag === 22 && ((l = n.stateNode), l === null || l._visibility & 1 || (u = !0)),
        (l = n),
        (n = n.return));
    return l.tag === 3
      ? ((n = l.stateNode),
        u &&
          t !== null &&
          ((u = 31 - nt(e)),
          (l = n.hiddenUpdates),
          (a = l[u]),
          a === null ? (l[u] = [t]) : a.push(t),
          (t.lane = e | 536870912)),
        n)
      : null;
  }
  function wu(l) {
    if (50 < du) throw ((du = 0), (Gc = null), Error(s(185)));
    for (var t = l.return; t !== null; ) ((l = t), (t = l.return));
    return l.tag === 3 ? l.stateNode : null;
  }
  var na = {};
  function am(l, t, e, a) {
    ((this.tag = l),
      (this.key = e),
      (this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function ct(l, t, e, a) {
    return new am(l, t, e, a);
  }
  function Ci(l) {
    return ((l = l.prototype), !(!l || !l.isReactComponent));
  }
  function Yt(l, t) {
    var e = l.alternate;
    return (
      e === null
        ? ((e = ct(l.tag, t, l.key, l.mode)),
          (e.elementType = l.elementType),
          (e.type = l.type),
          (e.stateNode = l.stateNode),
          (e.alternate = l),
          (l.alternate = e))
        : ((e.pendingProps = t), (e.type = l.type), (e.flags = 0), (e.subtreeFlags = 0), (e.deletions = null)),
      (e.flags = l.flags & 65011712),
      (e.childLanes = l.childLanes),
      (e.lanes = l.lanes),
      (e.child = l.child),
      (e.memoizedProps = l.memoizedProps),
      (e.memoizedState = l.memoizedState),
      (e.updateQueue = l.updateQueue),
      (t = l.dependencies),
      (e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (e.sibling = l.sibling),
      (e.index = l.index),
      (e.ref = l.ref),
      (e.refCleanup = l.refCleanup),
      e
    );
  }
  function Ms(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return (
      e === null
        ? ((l.childLanes = 0),
          (l.lanes = t),
          (l.child = null),
          (l.subtreeFlags = 0),
          (l.memoizedProps = null),
          (l.memoizedState = null),
          (l.updateQueue = null),
          (l.dependencies = null),
          (l.stateNode = null))
        : ((l.childLanes = e.childLanes),
          (l.lanes = e.lanes),
          (l.child = e.child),
          (l.subtreeFlags = 0),
          (l.deletions = null),
          (l.memoizedProps = e.memoizedProps),
          (l.memoizedState = e.memoizedState),
          (l.updateQueue = e.updateQueue),
          (l.type = e.type),
          (t = e.dependencies),
          (l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext })),
      l
    );
  }
  function ku(l, t, e, a, u, n) {
    var i = 0;
    if (((a = l), typeof l == 'function')) Ci(l) && (i = 1);
    else if (typeof l == 'string') i = f1(l, e, H.current) ? 26 : l === 'html' || l === 'head' || l === 'body' ? 27 : 5;
    else
      l: switch (l) {
        case Zl:
          return ((l = ct(31, e, t, u)), (l.elementType = Zl), (l.lanes = n), l);
        case xl:
          return je(e.children, u, n, t);
        case At:
          ((i = 8), (u |= 24));
          break;
        case Jl:
          return ((l = ct(12, e, t, u | 2)), (l.elementType = Jl), (l.lanes = n), l);
        case Hl:
          return ((l = ct(13, e, t, u)), (l.elementType = Hl), (l.lanes = n), l);
        case Vl:
          return ((l = ct(19, e, t, u)), (l.elementType = Vl), (l.lanes = n), l);
        default:
          if (typeof l == 'object' && l !== null)
            switch (l.$$typeof) {
              case fl:
                i = 10;
                break l;
              case J:
                i = 9;
                break l;
              case G:
                i = 11;
                break l;
              case $:
                i = 14;
                break l;
              case ol:
                ((i = 16), (a = null));
                break l;
            }
          ((i = 29), (e = Error(s(130, l === null ? 'null' : typeof l, ''))), (a = null));
      }
    return ((t = ct(i, e, t, u)), (t.elementType = l), (t.type = a), (t.lanes = n), t);
  }
  function je(l, t, e, a) {
    return ((l = ct(7, l, a, t)), (l.lanes = e), l);
  }
  function Ui(l, t, e) {
    return ((l = ct(6, l, null, t)), (l.lanes = e), l);
  }
  function Os(l) {
    var t = ct(18, null, null, 0);
    return ((t.stateNode = l), t);
  }
  function ji(l, t, e) {
    return (
      (t = ct(4, l.children !== null ? l.children : [], l.key, t)),
      (t.lanes = e),
      (t.stateNode = { containerInfo: l.containerInfo, pendingChildren: null, implementation: l.implementation }),
      t
    );
  }
  var Ds = new WeakMap();
  function bt(l, t) {
    if (typeof l == 'object' && l !== null) {
      var e = Ds.get(l);
      return e !== void 0 ? e : ((t = { value: l, source: t, stack: Of(t) }), Ds.set(l, t), t);
    }
    return { value: l, source: t, stack: Of(t) };
  }
  var ia = [],
    ca = 0,
    Wu = null,
    Ka = 0,
    pt = [],
    St = 0,
    ae = null,
    Nt = 1,
    Ct = '';
  function Gt(l, t) {
    ((ia[ca++] = Ka), (ia[ca++] = Wu), (Wu = l), (Ka = t));
  }
  function Ns(l, t, e) {
    ((pt[St++] = Nt), (pt[St++] = Ct), (pt[St++] = ae), (ae = l));
    var a = Nt;
    l = Ct;
    var u = 32 - nt(a) - 1;
    ((a &= ~(1 << u)), (e += 1));
    var n = 32 - nt(t) + u;
    if (30 < n) {
      var i = u - (u % 5);
      ((n = (a & ((1 << i) - 1)).toString(32)),
        (a >>= i),
        (u -= i),
        (Nt = (1 << (32 - nt(t) + u)) | (e << u) | a),
        (Ct = n + l));
    } else ((Nt = (1 << n) | (e << u) | a), (Ct = l));
  }
  function Ri(l) {
    l.return !== null && (Gt(l, 1), Ns(l, 1, 0));
  }
  function Hi(l) {
    for (; l === Wu; ) ((Wu = ia[--ca]), (ia[ca] = null), (Ka = ia[--ca]), (ia[ca] = null));
    for (; l === ae; )
      ((ae = pt[--St]), (pt[St] = null), (Ct = pt[--St]), (pt[St] = null), (Nt = pt[--St]), (pt[St] = null));
  }
  function Cs(l, t) {
    ((pt[St++] = Nt), (pt[St++] = Ct), (pt[St++] = ae), (Nt = t.id), (Ct = t.overflow), (ae = l));
  }
  var Yl = null,
    gl = null,
    al = !1,
    ue = null,
    zt = !1,
    qi = Error(s(519));
  function ne(l) {
    var t = Error(s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', ''));
    throw (Ja(bt(t, l)), qi);
  }
  function Us(l) {
    var t = l.stateNode,
      e = l.type,
      a = l.memoizedProps;
    switch (((t[Bl] = l), (t[$l] = a), e)) {
      case 'dialog':
        (P('cancel', t), P('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        P('load', t);
        break;
      case 'video':
      case 'audio':
        for (e = 0; e < yu.length; e++) P(yu[e], t);
        break;
      case 'source':
        P('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (P('error', t), P('load', t));
        break;
      case 'details':
        P('toggle', t);
        break;
      case 'input':
        (P('invalid', t), Kf(t, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, !0));
        break;
      case 'select':
        P('invalid', t);
        break;
      case 'textarea':
        (P('invalid', t), wf(t, a.value, a.defaultValue, a.children));
    }
    ((e = a.children),
      (typeof e != 'string' && typeof e != 'number' && typeof e != 'bigint') ||
      t.textContent === '' + e ||
      a.suppressHydrationWarning === !0 ||
      $r(t.textContent, e)
        ? (a.popover != null && (P('beforetoggle', t), P('toggle', t)),
          a.onScroll != null && P('scroll', t),
          a.onScrollEnd != null && P('scrollend', t),
          a.onClick != null && (t.onclick = qt),
          (t = !0))
        : (t = !1),
      t || ne(l, !0));
  }
  function js(l) {
    for (Yl = l.return; Yl; )
      switch (Yl.tag) {
        case 5:
        case 31:
        case 13:
          zt = !1;
          return;
        case 27:
        case 3:
          zt = !0;
          return;
        default:
          Yl = Yl.return;
      }
  }
  function fa(l) {
    if (l !== Yl) return !1;
    if (!al) return (js(l), (al = !0), !1);
    var t = l.tag,
      e;
    if (
      ((e = t !== 3 && t !== 27) &&
        ((e = t === 5) && ((e = l.type), (e = !(e !== 'form' && e !== 'button') || lf(l.type, l.memoizedProps))),
        (e = !e)),
      e && gl && ne(l),
      js(l),
      t === 13)
    ) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l)) throw Error(s(317));
      gl = n0(l);
    } else if (t === 31) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l)) throw Error(s(317));
      gl = n0(l);
    } else
      t === 27
        ? ((t = gl), pe(l.type) ? ((l = nf), (nf = null), (gl = l)) : (gl = t))
        : (gl = Yl ? Et(l.stateNode.nextSibling) : null);
    return !0;
  }
  function Re() {
    ((gl = Yl = null), (al = !1));
  }
  function Bi() {
    var l = ue;
    return (l !== null && (tt === null ? (tt = l) : tt.push.apply(tt, l), (ue = null)), l);
  }
  function Ja(l) {
    ue === null ? (ue = [l]) : ue.push(l);
  }
  var Yi = r(null),
    He = null,
    Xt = null;
  function ie(l, t, e) {
    (U(Yi, t._currentValue), (t._currentValue = e));
  }
  function Qt(l) {
    ((l._currentValue = Yi.current), x(Yi));
  }
  function Gi(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if (
        ((l.childLanes & t) !== t
          ? ((l.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        l === e)
      )
        break;
      l = l.return;
    }
  }
  function Xi(l, t, e, a) {
    var u = l.child;
    for (u !== null && (u.return = l); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var c = n;
          n = u;
          for (var f = 0; f < t.length; f++)
            if (c.context === t[f]) {
              ((n.lanes |= e), (c = n.alternate), c !== null && (c.lanes |= e), Gi(n.return, e, l), a || (i = null));
              break l;
            }
          n = c.next;
        }
      } else if (u.tag === 18) {
        if (((i = u.return), i === null)) throw Error(s(341));
        ((i.lanes |= e), (n = i.alternate), n !== null && (n.lanes |= e), Gi(i, e, l), (i = null));
      } else i = u.child;
      if (i !== null) i.return = u;
      else
        for (i = u; i !== null; ) {
          if (i === l) {
            i = null;
            break;
          }
          if (((u = i.sibling), u !== null)) {
            ((u.return = i.return), (i = u));
            break;
          }
          i = i.return;
        }
      u = i;
    }
  }
  function sa(l, t, e, a) {
    l = null;
    for (var u = t, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var i = u.alternate;
        if (i === null) throw Error(s(387));
        if (((i = i.memoizedProps), i !== null)) {
          var c = u.type;
          it(u.pendingProps.value, i.value) || (l !== null ? l.push(c) : (l = [c]));
        }
      } else if (u === sl.current) {
        if (((i = u.alternate), i === null)) throw Error(s(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (l !== null ? l.push(pu) : (l = [pu]));
      }
      u = u.return;
    }
    (l !== null && Xi(t, l, e, a), (t.flags |= 262144));
  }
  function $u(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!it(l.context._currentValue, l.memoizedValue)) return !0;
      l = l.next;
    }
    return !1;
  }
  function qe(l) {
    ((He = l), (Xt = null), (l = l.dependencies), l !== null && (l.firstContext = null));
  }
  function Gl(l) {
    return Rs(He, l);
  }
  function Fu(l, t) {
    return (He === null && qe(l), Rs(l, t));
  }
  function Rs(l, t) {
    var e = t._currentValue;
    if (((t = { context: t, memoizedValue: e, next: null }), Xt === null)) {
      if (l === null) throw Error(s(308));
      ((Xt = t), (l.dependencies = { lanes: 0, firstContext: t }), (l.flags |= 524288));
    } else Xt = Xt.next = t;
    return e;
  }
  var um =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var l = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (e, a) {
                  l.push(a);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                l.forEach(function (e) {
                  return e();
                }));
            };
          },
    nm = d.unstable_scheduleCallback,
    im = d.unstable_NormalPriority,
    Ml = { $$typeof: fl, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
  function Qi() {
    return { controller: new um(), data: new Map(), refCount: 0 };
  }
  function wa(l) {
    (l.refCount--,
      l.refCount === 0 &&
        nm(im, function () {
          l.controller.abort();
        }));
  }
  var ka = null,
    Vi = 0,
    oa = 0,
    ra = null;
  function cm(l, t) {
    if (ka === null) {
      var e = (ka = []);
      ((Vi = 0),
        (oa = Kc()),
        (ra = {
          status: 'pending',
          value: void 0,
          then: function (a) {
            e.push(a);
          },
        }));
    }
    return (Vi++, t.then(Hs, Hs), t);
  }
  function Hs() {
    if (--Vi === 0 && ka !== null) {
      ra !== null && (ra.status = 'fulfilled');
      var l = ka;
      ((ka = null), (oa = 0), (ra = null));
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function fm(l, t) {
    var e = [],
      a = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (u) {
          e.push(u);
        },
      };
    return (
      l.then(
        function () {
          ((a.status = 'fulfilled'), (a.value = t));
          for (var u = 0; u < e.length; u++) (0, e[u])(t);
        },
        function (u) {
          for (a.status = 'rejected', a.reason = u, u = 0; u < e.length; u++) (0, e[u])(void 0);
        }
      ),
      a
    );
  }
  var qs = z.S;
  z.S = function (l, t) {
    ((Sr = at()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && cm(l, t),
      qs !== null && qs(l, t));
  };
  var Be = r(null);
  function Zi() {
    var l = Be.current;
    return l !== null ? l : vl.pooledCache;
  }
  function Iu(l, t) {
    t === null ? U(Be, Be.current) : U(Be, t.pool);
  }
  function Bs() {
    var l = Zi();
    return l === null ? null : { parent: Ml._currentValue, pool: l };
  }
  var da = Error(s(460)),
    Li = Error(s(474)),
    Pu = Error(s(542)),
    ln = { then: function () {} };
  function Ys(l) {
    return ((l = l.status), l === 'fulfilled' || l === 'rejected');
  }
  function Gs(l, t, e) {
    switch (((e = l[e]), e === void 0 ? l.push(t) : e !== t && (t.then(qt, qt), (t = e)), t.status)) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((l = t.reason), Qs(l), l);
      default:
        if (typeof t.status == 'string') t.then(qt, qt);
        else {
          if (((l = vl), l !== null && 100 < l.shellSuspendCounter)) throw Error(s(482));
          ((l = t),
            (l.status = 'pending'),
            l.then(
              function (a) {
                if (t.status === 'pending') {
                  var u = t;
                  ((u.status = 'fulfilled'), (u.value = a));
                }
              },
              function (a) {
                if (t.status === 'pending') {
                  var u = t;
                  ((u.status = 'rejected'), (u.reason = a));
                }
              }
            ));
        }
        switch (t.status) {
          case 'fulfilled':
            return t.value;
          case 'rejected':
            throw ((l = t.reason), Qs(l), l);
        }
        throw ((Ge = t), da);
    }
  }
  function Ye(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == 'object' && typeof e.then == 'function' ? ((Ge = e), da) : e;
    }
  }
  var Ge = null;
  function Xs() {
    if (Ge === null) throw Error(s(459));
    var l = Ge;
    return ((Ge = null), l);
  }
  function Qs(l) {
    if (l === da || l === Pu) throw Error(s(483));
  }
  var ma = null,
    Wa = 0;
  function tn(l) {
    var t = Wa;
    return ((Wa += 1), ma === null && (ma = []), Gs(ma, l, t));
  }
  function $a(l, t) {
    ((t = t.props.ref), (l.ref = t !== void 0 ? t : null));
  }
  function en(l, t) {
    throw t.$$typeof === K
      ? Error(s(525))
      : ((l = Object.prototype.toString.call(t)),
        Error(s(31, l === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : l)));
  }
  function Vs(l) {
    function t(m, o) {
      if (l) {
        var y = m.deletions;
        y === null ? ((m.deletions = [o]), (m.flags |= 16)) : y.push(o);
      }
    }
    function e(m, o) {
      if (!l) return null;
      for (; o !== null; ) (t(m, o), (o = o.sibling));
      return null;
    }
    function a(m) {
      for (var o = new Map(); m !== null; ) (m.key !== null ? o.set(m.key, m) : o.set(m.index, m), (m = m.sibling));
      return o;
    }
    function u(m, o) {
      return ((m = Yt(m, o)), (m.index = 0), (m.sibling = null), m);
    }
    function n(m, o, y) {
      return (
        (m.index = y),
        l
          ? ((y = m.alternate),
            y !== null ? ((y = y.index), y < o ? ((m.flags |= 67108866), o) : y) : ((m.flags |= 67108866), o))
          : ((m.flags |= 1048576), o)
      );
    }
    function i(m) {
      return (l && m.alternate === null && (m.flags |= 67108866), m);
    }
    function c(m, o, y, E) {
      return o === null || o.tag !== 6
        ? ((o = Ui(y, m.mode, E)), (o.return = m), o)
        : ((o = u(o, y)), (o.return = m), o);
    }
    function f(m, o, y, E) {
      var Y = y.type;
      return Y === xl
        ? S(m, o, y.props.children, E, y.key)
        : o !== null &&
            (o.elementType === Y || (typeof Y == 'object' && Y !== null && Y.$$typeof === ol && Ye(Y) === o.type))
          ? ((o = u(o, y.props)), $a(o, y), (o.return = m), o)
          : ((o = ku(y.type, y.key, y.props, null, m.mode, E)), $a(o, y), (o.return = m), o);
    }
    function h(m, o, y, E) {
      return o === null ||
        o.tag !== 4 ||
        o.stateNode.containerInfo !== y.containerInfo ||
        o.stateNode.implementation !== y.implementation
        ? ((o = ji(y, m.mode, E)), (o.return = m), o)
        : ((o = u(o, y.children || [])), (o.return = m), o);
    }
    function S(m, o, y, E, Y) {
      return o === null || o.tag !== 7
        ? ((o = je(y, m.mode, E, Y)), (o.return = m), o)
        : ((o = u(o, y)), (o.return = m), o);
    }
    function _(m, o, y) {
      if ((typeof o == 'string' && o !== '') || typeof o == 'number' || typeof o == 'bigint')
        return ((o = Ui('' + o, m.mode, y)), (o.return = m), o);
      if (typeof o == 'object' && o !== null) {
        switch (o.$$typeof) {
          case Sl:
            return ((y = ku(o.type, o.key, o.props, null, m.mode, y)), $a(y, o), (y.return = m), y);
          case cl:
            return ((o = ji(o, m.mode, y)), (o.return = m), o);
          case ol:
            return ((o = Ye(o)), _(m, o, y));
        }
        if (Wl(o) || ql(o)) return ((o = je(o, m.mode, y, null)), (o.return = m), o);
        if (typeof o.then == 'function') return _(m, tn(o), y);
        if (o.$$typeof === fl) return _(m, Fu(m, o), y);
        en(m, o);
      }
      return null;
    }
    function v(m, o, y, E) {
      var Y = o !== null ? o.key : null;
      if ((typeof y == 'string' && y !== '') || typeof y == 'number' || typeof y == 'bigint')
        return Y !== null ? null : c(m, o, '' + y, E);
      if (typeof y == 'object' && y !== null) {
        switch (y.$$typeof) {
          case Sl:
            return y.key === Y ? f(m, o, y, E) : null;
          case cl:
            return y.key === Y ? h(m, o, y, E) : null;
          case ol:
            return ((y = Ye(y)), v(m, o, y, E));
        }
        if (Wl(y) || ql(y)) return Y !== null ? null : S(m, o, y, E, null);
        if (typeof y.then == 'function') return v(m, o, tn(y), E);
        if (y.$$typeof === fl) return v(m, o, Fu(m, y), E);
        en(m, y);
      }
      return null;
    }
    function g(m, o, y, E, Y) {
      if ((typeof E == 'string' && E !== '') || typeof E == 'number' || typeof E == 'bigint')
        return ((m = m.get(y) || null), c(o, m, '' + E, Y));
      if (typeof E == 'object' && E !== null) {
        switch (E.$$typeof) {
          case Sl:
            return ((m = m.get(E.key === null ? y : E.key) || null), f(o, m, E, Y));
          case cl:
            return ((m = m.get(E.key === null ? y : E.key) || null), h(o, m, E, Y));
          case ol:
            return ((E = Ye(E)), g(m, o, y, E, Y));
        }
        if (Wl(E) || ql(E)) return ((m = m.get(y) || null), S(o, m, E, Y, null));
        if (typeof E.then == 'function') return g(m, o, y, tn(E), Y);
        if (E.$$typeof === fl) return g(m, o, y, Fu(o, E), Y);
        en(o, E);
      }
      return null;
    }
    function R(m, o, y, E) {
      for (var Y = null, ul = null, q = o, W = (o = 0), el = null; q !== null && W < y.length; W++) {
        q.index > W ? ((el = q), (q = null)) : (el = q.sibling);
        var nl = v(m, q, y[W], E);
        if (nl === null) {
          q === null && (q = el);
          break;
        }
        (l && q && nl.alternate === null && t(m, q),
          (o = n(nl, o, W)),
          ul === null ? (Y = nl) : (ul.sibling = nl),
          (ul = nl),
          (q = el));
      }
      if (W === y.length) return (e(m, q), al && Gt(m, W), Y);
      if (q === null) {
        for (; W < y.length; W++)
          ((q = _(m, y[W], E)), q !== null && ((o = n(q, o, W)), ul === null ? (Y = q) : (ul.sibling = q), (ul = q)));
        return (al && Gt(m, W), Y);
      }
      for (q = a(q); W < y.length; W++)
        ((el = g(q, m, W, y[W], E)),
          el !== null &&
            (l && el.alternate !== null && q.delete(el.key === null ? W : el.key),
            (o = n(el, o, W)),
            ul === null ? (Y = el) : (ul.sibling = el),
            (ul = el)));
      return (
        l &&
          q.forEach(function (_e) {
            return t(m, _e);
          }),
        al && Gt(m, W),
        Y
      );
    }
    function X(m, o, y, E) {
      if (y == null) throw Error(s(151));
      for (
        var Y = null, ul = null, q = o, W = (o = 0), el = null, nl = y.next();
        q !== null && !nl.done;
        W++, nl = y.next()
      ) {
        q.index > W ? ((el = q), (q = null)) : (el = q.sibling);
        var _e = v(m, q, nl.value, E);
        if (_e === null) {
          q === null && (q = el);
          break;
        }
        (l && q && _e.alternate === null && t(m, q),
          (o = n(_e, o, W)),
          ul === null ? (Y = _e) : (ul.sibling = _e),
          (ul = _e),
          (q = el));
      }
      if (nl.done) return (e(m, q), al && Gt(m, W), Y);
      if (q === null) {
        for (; !nl.done; W++, nl = y.next())
          ((nl = _(m, nl.value, E)),
            nl !== null && ((o = n(nl, o, W)), ul === null ? (Y = nl) : (ul.sibling = nl), (ul = nl)));
        return (al && Gt(m, W), Y);
      }
      for (q = a(q); !nl.done; W++, nl = y.next())
        ((nl = g(q, m, W, nl.value, E)),
          nl !== null &&
            (l && nl.alternate !== null && q.delete(nl.key === null ? W : nl.key),
            (o = n(nl, o, W)),
            ul === null ? (Y = nl) : (ul.sibling = nl),
            (ul = nl)));
      return (
        l &&
          q.forEach(function (p1) {
            return t(m, p1);
          }),
        al && Gt(m, W),
        Y
      );
    }
    function hl(m, o, y, E) {
      if (
        (typeof y == 'object' && y !== null && y.type === xl && y.key === null && (y = y.props.children),
        typeof y == 'object' && y !== null)
      ) {
        switch (y.$$typeof) {
          case Sl:
            l: {
              for (var Y = y.key; o !== null; ) {
                if (o.key === Y) {
                  if (((Y = y.type), Y === xl)) {
                    if (o.tag === 7) {
                      (e(m, o.sibling), (E = u(o, y.props.children)), (E.return = m), (m = E));
                      break l;
                    }
                  } else if (
                    o.elementType === Y ||
                    (typeof Y == 'object' && Y !== null && Y.$$typeof === ol && Ye(Y) === o.type)
                  ) {
                    (e(m, o.sibling), (E = u(o, y.props)), $a(E, y), (E.return = m), (m = E));
                    break l;
                  }
                  e(m, o);
                  break;
                } else t(m, o);
                o = o.sibling;
              }
              y.type === xl
                ? ((E = je(y.props.children, m.mode, E, y.key)), (E.return = m), (m = E))
                : ((E = ku(y.type, y.key, y.props, null, m.mode, E)), $a(E, y), (E.return = m), (m = E));
            }
            return i(m);
          case cl:
            l: {
              for (Y = y.key; o !== null; ) {
                if (o.key === Y)
                  if (
                    o.tag === 4 &&
                    o.stateNode.containerInfo === y.containerInfo &&
                    o.stateNode.implementation === y.implementation
                  ) {
                    (e(m, o.sibling), (E = u(o, y.children || [])), (E.return = m), (m = E));
                    break l;
                  } else {
                    e(m, o);
                    break;
                  }
                else t(m, o);
                o = o.sibling;
              }
              ((E = ji(y, m.mode, E)), (E.return = m), (m = E));
            }
            return i(m);
          case ol:
            return ((y = Ye(y)), hl(m, o, y, E));
        }
        if (Wl(y)) return R(m, o, y, E);
        if (ql(y)) {
          if (((Y = ql(y)), typeof Y != 'function')) throw Error(s(150));
          return ((y = Y.call(y)), X(m, o, y, E));
        }
        if (typeof y.then == 'function') return hl(m, o, tn(y), E);
        if (y.$$typeof === fl) return hl(m, o, Fu(m, y), E);
        en(m, y);
      }
      return (typeof y == 'string' && y !== '') || typeof y == 'number' || typeof y == 'bigint'
        ? ((y = '' + y),
          o !== null && o.tag === 6
            ? (e(m, o.sibling), (E = u(o, y)), (E.return = m), (m = E))
            : (e(m, o), (E = Ui(y, m.mode, E)), (E.return = m), (m = E)),
          i(m))
        : e(m, o);
    }
    return function (m, o, y, E) {
      try {
        Wa = 0;
        var Y = hl(m, o, y, E);
        return ((ma = null), Y);
      } catch (q) {
        if (q === da || q === Pu) throw q;
        var ul = ct(29, q, null, m.mode);
        return ((ul.lanes = E), (ul.return = m), ul);
      } finally {
      }
    };
  }
  var Xe = Vs(!0),
    Zs = Vs(!1),
    ce = !1;
  function Ki(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Ji(l, t) {
    ((l = l.updateQueue),
      t.updateQueue === l &&
        (t.updateQueue = {
          baseState: l.baseState,
          firstBaseUpdate: l.firstBaseUpdate,
          lastBaseUpdate: l.lastBaseUpdate,
          shared: l.shared,
          callbacks: null,
        }));
  }
  function fe(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function se(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (il & 2) !== 0)) {
      var u = a.pending;
      return (
        u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
        (a.pending = t),
        (t = wu(l)),
        xs(l, null, e),
        t
      );
    }
    return (Ju(l, a, t, e), wu(l));
  }
  function Fa(l, t, e) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (e & 4194048) !== 0))) {
      var a = t.lanes;
      ((a &= l.pendingLanes), (e |= a), (t.lanes = e), Rf(l, e));
    }
  }
  function wi(l, t) {
    var e = l.updateQueue,
      a = l.alternate;
    if (a !== null && ((a = a.updateQueue), e === a)) {
      var u = null,
        n = null;
      if (((e = e.firstBaseUpdate), e !== null)) {
        do {
          var i = { lane: e.lane, tag: e.tag, payload: e.payload, callback: null, next: null };
          (n === null ? (u = n = i) : (n = n.next = i), (e = e.next));
        } while (e !== null);
        n === null ? (u = n = t) : (n = n.next = t);
      } else u = n = t;
      ((e = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (l.updateQueue = e));
      return;
    }
    ((l = e.lastBaseUpdate), l === null ? (e.firstBaseUpdate = t) : (l.next = t), (e.lastBaseUpdate = t));
  }
  var ki = !1;
  function Ia() {
    if (ki) {
      var l = ra;
      if (l !== null) throw l;
    }
  }
  function Pa(l, t, e, a) {
    ki = !1;
    var u = l.updateQueue;
    ce = !1;
    var n = u.firstBaseUpdate,
      i = u.lastBaseUpdate,
      c = u.shared.pending;
    if (c !== null) {
      u.shared.pending = null;
      var f = c,
        h = f.next;
      ((f.next = null), i === null ? (n = h) : (i.next = h), (i = f));
      var S = l.alternate;
      S !== null &&
        ((S = S.updateQueue),
        (c = S.lastBaseUpdate),
        c !== i && (c === null ? (S.firstBaseUpdate = h) : (c.next = h), (S.lastBaseUpdate = f)));
    }
    if (n !== null) {
      var _ = u.baseState;
      ((i = 0), (S = h = f = null), (c = n));
      do {
        var v = c.lane & -536870913,
          g = v !== c.lane;
        if (g ? (tl & v) === v : (a & v) === v) {
          (v !== 0 && v === oa && (ki = !0),
            S !== null && (S = S.next = { lane: 0, tag: c.tag, payload: c.payload, callback: null, next: null }));
          l: {
            var R = l,
              X = c;
            v = t;
            var hl = e;
            switch (X.tag) {
              case 1:
                if (((R = X.payload), typeof R == 'function')) {
                  _ = R.call(hl, _, v);
                  break l;
                }
                _ = R;
                break l;
              case 3:
                R.flags = (R.flags & -65537) | 128;
              case 0:
                if (((R = X.payload), (v = typeof R == 'function' ? R.call(hl, _, v) : R), v == null)) break l;
                _ = D({}, _, v);
                break l;
              case 2:
                ce = !0;
            }
          }
          ((v = c.callback),
            v !== null &&
              ((l.flags |= 64),
              g && (l.flags |= 8192),
              (g = u.callbacks),
              g === null ? (u.callbacks = [v]) : g.push(v)));
        } else
          ((g = { lane: v, tag: c.tag, payload: c.payload, callback: c.callback, next: null }),
            S === null ? ((h = S = g), (f = _)) : (S = S.next = g),
            (i |= v));
        if (((c = c.next), c === null)) {
          if (((c = u.shared.pending), c === null)) break;
          ((g = c), (c = g.next), (g.next = null), (u.lastBaseUpdate = g), (u.shared.pending = null));
        }
      } while (!0);
      (S === null && (f = _),
        (u.baseState = f),
        (u.firstBaseUpdate = h),
        (u.lastBaseUpdate = S),
        n === null && (u.shared.lanes = 0),
        (ye |= i),
        (l.lanes = i),
        (l.memoizedState = _));
    }
  }
  function Ls(l, t) {
    if (typeof l != 'function') throw Error(s(191, l));
    l.call(t);
  }
  function Ks(l, t) {
    var e = l.callbacks;
    if (e !== null) for (l.callbacks = null, l = 0; l < e.length; l++) Ls(e[l], t);
  }
  var ya = r(null),
    an = r(0);
  function Js(l, t) {
    ((l = $t), U(an, l), U(ya, t), ($t = l | t.baseLanes));
  }
  function Wi() {
    (U(an, $t), U(ya, ya.current));
  }
  function $i() {
    (($t = an.current), x(ya), x(an));
  }
  var ft = r(null),
    Tt = null;
  function oe(l) {
    var t = l.alternate;
    (U(_l, _l.current & 1),
      U(ft, l),
      Tt === null && (t === null || ya.current !== null || t.memoizedState !== null) && (Tt = l));
  }
  function Fi(l) {
    (U(_l, _l.current), U(ft, l), Tt === null && (Tt = l));
  }
  function ws(l) {
    l.tag === 22 ? (U(_l, _l.current), U(ft, l), Tt === null && (Tt = l)) : re();
  }
  function re() {
    (U(_l, _l.current), U(ft, ft.current));
  }
  function st(l) {
    (x(ft), Tt === l && (Tt = null), x(_l));
  }
  var _l = r(0);
  function un(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && ((e = e.dehydrated), e === null || af(e) || uf(e))) return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === 'forwards' ||
          t.memoizedProps.revealOrder === 'backwards' ||
          t.memoizedProps.revealOrder === 'unstable_legacy-backwards' ||
          t.memoizedProps.revealOrder === 'together')
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var Vt = 0,
    k = null,
    ml = null,
    Ol = null,
    nn = !1,
    ha = !1,
    Qe = !1,
    cn = 0,
    lu = 0,
    va = null,
    sm = 0;
  function zl() {
    throw Error(s(321));
  }
  function Ii(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++) if (!it(l[e], t[e])) return !1;
    return !0;
  }
  function Pi(l, t, e, a, u, n) {
    return (
      (Vt = n),
      (k = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (z.H = l === null || l.memoizedState === null ? Co : yc),
      (Qe = !1),
      (n = e(a, u)),
      (Qe = !1),
      ha && (n = Ws(t, e, a, u)),
      ks(l),
      n
    );
  }
  function ks(l) {
    z.H = au;
    var t = ml !== null && ml.next !== null;
    if (((Vt = 0), (Ol = ml = k = null), (nn = !1), (lu = 0), (va = null), t)) throw Error(s(300));
    l === null || Dl || ((l = l.dependencies), l !== null && $u(l) && (Dl = !0));
  }
  function Ws(l, t, e, a) {
    k = l;
    var u = 0;
    do {
      if ((ha && (va = null), (lu = 0), (ha = !1), 25 <= u)) throw Error(s(301));
      if (((u += 1), (Ol = ml = null), l.updateQueue != null)) {
        var n = l.updateQueue;
        ((n.lastEffect = null), (n.events = null), (n.stores = null), n.memoCache != null && (n.memoCache.index = 0));
      }
      ((z.H = Uo), (n = t(e, a)));
    } while (ha);
    return n;
  }
  function om() {
    var l = z.H,
      t = l.useState()[0];
    return (
      (t = typeof t.then == 'function' ? tu(t) : t),
      (l = l.useState()[0]),
      (ml !== null ? ml.memoizedState : null) !== l && (k.flags |= 1024),
      t
    );
  }
  function lc() {
    var l = cn !== 0;
    return ((cn = 0), l);
  }
  function tc(l, t, e) {
    ((t.updateQueue = l.updateQueue), (t.flags &= -2053), (l.lanes &= ~e));
  }
  function ec(l) {
    if (nn) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        (t !== null && (t.pending = null), (l = l.next));
      }
      nn = !1;
    }
    ((Vt = 0), (Ol = ml = k = null), (ha = !1), (lu = cn = 0), (va = null));
  }
  function kl() {
    var l = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Ol === null ? (k.memoizedState = Ol = l) : (Ol = Ol.next = l), Ol);
  }
  function Al() {
    if (ml === null) {
      var l = k.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = ml.next;
    var t = Ol === null ? k.memoizedState : Ol.next;
    if (t !== null) ((Ol = t), (ml = l));
    else {
      if (l === null) throw k.alternate === null ? Error(s(467)) : Error(s(310));
      ((ml = l),
        (l = {
          memoizedState: ml.memoizedState,
          baseState: ml.baseState,
          baseQueue: ml.baseQueue,
          queue: ml.queue,
          next: null,
        }),
        Ol === null ? (k.memoizedState = Ol = l) : (Ol = Ol.next = l));
    }
    return Ol;
  }
  function fn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function tu(l) {
    var t = lu;
    return (
      (lu += 1),
      va === null && (va = []),
      (l = Gs(va, l, t)),
      (t = k),
      (Ol === null ? t.memoizedState : Ol.next) === null &&
        ((t = t.alternate), (z.H = t === null || t.memoizedState === null ? Co : yc)),
      l
    );
  }
  function sn(l) {
    if (l !== null && typeof l == 'object') {
      if (typeof l.then == 'function') return tu(l);
      if (l.$$typeof === fl) return Gl(l);
    }
    throw Error(s(438, String(l)));
  }
  function ac(l) {
    var t = null,
      e = k.updateQueue;
    if ((e !== null && (t = e.memoCache), t == null)) {
      var a = k.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      e === null && ((e = fn()), (k.updateQueue = e)),
      (e.memoCache = t),
      (e = t.data[t.index]),
      e === void 0)
    )
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++) e[a] = Ae;
    return (t.index++, e);
  }
  function Zt(l, t) {
    return typeof t == 'function' ? t(l) : t;
  }
  function on(l) {
    var t = Al();
    return uc(t, ml, l);
  }
  function uc(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = e;
    var u = l.baseQueue,
      n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        ((u.next = n.next), (n.next = i));
      }
      ((t.baseQueue = u = n), (a.pending = null));
    }
    if (((n = l.baseState), u === null)) l.memoizedState = n;
    else {
      t = u.next;
      var c = (i = null),
        f = null,
        h = t,
        S = !1;
      do {
        var _ = h.lane & -536870913;
        if (_ !== h.lane ? (tl & _) === _ : (Vt & _) === _) {
          var v = h.revertLane;
          if (v === 0)
            (f !== null &&
              (f = f.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: h.action,
                  hasEagerState: h.hasEagerState,
                  eagerState: h.eagerState,
                  next: null,
                }),
              _ === oa && (S = !0));
          else if ((Vt & v) === v) {
            ((h = h.next), v === oa && (S = !0));
            continue;
          } else
            ((_ = {
              lane: 0,
              revertLane: h.revertLane,
              gesture: null,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null,
            }),
              f === null ? ((c = f = _), (i = n)) : (f = f.next = _),
              (k.lanes |= v),
              (ye |= v));
          ((_ = h.action), Qe && e(n, _), (n = h.hasEagerState ? h.eagerState : e(n, _)));
        } else
          ((v = {
            lane: _,
            revertLane: h.revertLane,
            gesture: h.gesture,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null,
          }),
            f === null ? ((c = f = v), (i = n)) : (f = f.next = v),
            (k.lanes |= _),
            (ye |= _));
        h = h.next;
      } while (h !== null && h !== t);
      if ((f === null ? (i = n) : (f.next = c), !it(n, l.memoizedState) && ((Dl = !0), S && ((e = ra), e !== null))))
        throw e;
      ((l.memoizedState = n), (l.baseState = i), (l.baseQueue = f), (a.lastRenderedState = n));
    }
    return (u === null && (a.lanes = 0), [l.memoizedState, a.dispatch]);
  }
  function nc(l) {
    var t = Al(),
      e = t.queue;
    if (e === null) throw Error(s(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch,
      u = e.pending,
      n = t.memoizedState;
    if (u !== null) {
      e.pending = null;
      var i = (u = u.next);
      do ((n = l(n, i.action)), (i = i.next));
      while (i !== u);
      (it(n, t.memoizedState) || (Dl = !0),
        (t.memoizedState = n),
        t.baseQueue === null && (t.baseState = n),
        (e.lastRenderedState = n));
    }
    return [n, a];
  }
  function $s(l, t, e) {
    var a = k,
      u = Al(),
      n = al;
    if (n) {
      if (e === void 0) throw Error(s(407));
      e = e();
    } else e = t();
    var i = !it((ml || u).memoizedState, e);
    if (
      (i && ((u.memoizedState = e), (Dl = !0)),
      (u = u.queue),
      fc(Ps.bind(null, a, u, l), [l]),
      u.getSnapshot !== t || i || (Ol !== null && Ol.memoizedState.tag & 1))
    ) {
      if (((a.flags |= 2048), ga(9, { destroy: void 0 }, Is.bind(null, a, u, e, t), null), vl === null))
        throw Error(s(349));
      n || (Vt & 127) !== 0 || Fs(a, t, e);
    }
    return e;
  }
  function Fs(l, t, e) {
    ((l.flags |= 16384),
      (l = { getSnapshot: t, value: e }),
      (t = k.updateQueue),
      t === null
        ? ((t = fn()), (k.updateQueue = t), (t.stores = [l]))
        : ((e = t.stores), e === null ? (t.stores = [l]) : e.push(l)));
  }
  function Is(l, t, e, a) {
    ((t.value = e), (t.getSnapshot = a), lo(t) && to(l));
  }
  function Ps(l, t, e) {
    return e(function () {
      lo(t) && to(l);
    });
  }
  function lo(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !it(l, e);
    } catch {
      return !0;
    }
  }
  function to(l) {
    var t = Ue(l, 2);
    t !== null && et(t, l, 2);
  }
  function ic(l) {
    var t = kl();
    if (typeof l == 'function') {
      var e = l;
      if (((l = e()), Qe)) {
        le(!0);
        try {
          e();
        } finally {
          le(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = l),
      (t.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Zt, lastRenderedState: l }),
      t
    );
  }
  function eo(l, t, e, a) {
    return ((l.baseState = e), uc(l, ml, typeof a == 'function' ? a : Zt));
  }
  function rm(l, t, e, a, u) {
    if (mn(l)) throw Error(s(485));
    if (((l = t.action), l !== null)) {
      var n = {
        payload: u,
        action: l,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (i) {
          n.listeners.push(i);
        },
      };
      (z.T !== null ? e(!0) : (n.isTransition = !1),
        a(n),
        (e = t.pending),
        e === null ? ((n.next = t.pending = n), ao(t, n)) : ((n.next = e.next), (t.pending = e.next = n)));
    }
  }
  function ao(l, t) {
    var e = t.action,
      a = t.payload,
      u = l.state;
    if (t.isTransition) {
      var n = z.T,
        i = {};
      z.T = i;
      try {
        var c = e(u, a),
          f = z.S;
        (f !== null && f(i, c), uo(l, t, c));
      } catch (h) {
        cc(l, t, h);
      } finally {
        (n !== null && i.types !== null && (n.types = i.types), (z.T = n));
      }
    } else
      try {
        ((n = e(u, a)), uo(l, t, n));
      } catch (h) {
        cc(l, t, h);
      }
  }
  function uo(l, t, e) {
    e !== null && typeof e == 'object' && typeof e.then == 'function'
      ? e.then(
          function (a) {
            no(l, t, a);
          },
          function (a) {
            return cc(l, t, a);
          }
        )
      : no(l, t, e);
  }
  function no(l, t, e) {
    ((t.status = 'fulfilled'),
      (t.value = e),
      io(t),
      (l.state = e),
      (t = l.pending),
      t !== null && ((e = t.next), e === t ? (l.pending = null) : ((e = e.next), (t.next = e), ao(l, e))));
  }
  function cc(l, t, e) {
    var a = l.pending;
    if (((l.pending = null), a !== null)) {
      a = a.next;
      do ((t.status = 'rejected'), (t.reason = e), io(t), (t = t.next));
      while (t !== a);
    }
    l.action = null;
  }
  function io(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function co(l, t) {
    return t;
  }
  function fo(l, t) {
    if (al) {
      var e = vl.formState;
      if (e !== null) {
        l: {
          var a = k;
          if (al) {
            if (gl) {
              t: {
                for (var u = gl, n = zt; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (((u = Et(u.nextSibling)), u === null)) {
                    u = null;
                    break t;
                  }
                }
                ((n = u.data), (u = n === 'F!' || n === 'F' ? u : null));
              }
              if (u) {
                ((gl = Et(u.nextSibling)), (a = u.data === 'F!'));
                break l;
              }
            }
            ne(a);
          }
          a = !1;
        }
        a && (t = e[0]);
      }
    }
    return (
      (e = kl()),
      (e.memoizedState = e.baseState = t),
      (a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: co, lastRenderedState: t }),
      (e.queue = a),
      (e = Oo.bind(null, k, a)),
      (a.dispatch = e),
      (a = ic(!1)),
      (n = mc.bind(null, k, !1, a.queue)),
      (a = kl()),
      (u = { state: t, dispatch: null, action: l, pending: null }),
      (a.queue = u),
      (e = rm.bind(null, k, u, n, e)),
      (u.dispatch = e),
      (a.memoizedState = l),
      [t, e, !1]
    );
  }
  function so(l) {
    var t = Al();
    return oo(t, ml, l);
  }
  function oo(l, t, e) {
    if (((t = uc(l, t, co)[0]), (l = on(Zt)[0]), typeof t == 'object' && t !== null && typeof t.then == 'function'))
      try {
        var a = tu(t);
      } catch (i) {
        throw i === da ? Pu : i;
      }
    else a = t;
    t = Al();
    var u = t.queue,
      n = u.dispatch;
    return (
      e !== t.memoizedState && ((k.flags |= 2048), ga(9, { destroy: void 0 }, dm.bind(null, u, e), null)),
      [a, n, l]
    );
  }
  function dm(l, t) {
    l.action = t;
  }
  function ro(l) {
    var t = Al(),
      e = ml;
    if (e !== null) return oo(t, e, l);
    (Al(), (t = t.memoizedState), (e = Al()));
    var a = e.queue.dispatch;
    return ((e.memoizedState = l), [t, a, !1]);
  }
  function ga(l, t, e, a) {
    return (
      (l = { tag: l, create: e, deps: a, inst: t, next: null }),
      (t = k.updateQueue),
      t === null && ((t = fn()), (k.updateQueue = t)),
      (e = t.lastEffect),
      e === null ? (t.lastEffect = l.next = l) : ((a = e.next), (e.next = l), (l.next = a), (t.lastEffect = l)),
      l
    );
  }
  function mo() {
    return Al().memoizedState;
  }
  function rn(l, t, e, a) {
    var u = kl();
    ((k.flags |= l), (u.memoizedState = ga(1 | t, { destroy: void 0 }, e, a === void 0 ? null : a)));
  }
  function dn(l, t, e, a) {
    var u = Al();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    ml !== null && a !== null && Ii(a, ml.memoizedState.deps)
      ? (u.memoizedState = ga(t, n, e, a))
      : ((k.flags |= l), (u.memoizedState = ga(1 | t, n, e, a)));
  }
  function yo(l, t) {
    rn(8390656, 8, l, t);
  }
  function fc(l, t) {
    dn(2048, 8, l, t);
  }
  function mm(l) {
    k.flags |= 4;
    var t = k.updateQueue;
    if (t === null) ((t = fn()), (k.updateQueue = t), (t.events = [l]));
    else {
      var e = t.events;
      e === null ? (t.events = [l]) : e.push(l);
    }
  }
  function ho(l) {
    var t = Al().memoizedState;
    return (
      mm({ ref: t, nextImpl: l }),
      function () {
        if ((il & 2) !== 0) throw Error(s(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function vo(l, t) {
    return dn(4, 2, l, t);
  }
  function go(l, t) {
    return dn(4, 4, l, t);
  }
  function bo(l, t) {
    if (typeof t == 'function') {
      l = l();
      var e = t(l);
      return function () {
        typeof e == 'function' ? e() : t(null);
      };
    }
    if (t != null)
      return (
        (l = l()),
        (t.current = l),
        function () {
          t.current = null;
        }
      );
  }
  function po(l, t, e) {
    ((e = e != null ? e.concat([l]) : null), dn(4, 4, bo.bind(null, t, l), e));
  }
  function sc() {}
  function So(l, t) {
    var e = Al();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Ii(t, a[1]) ? a[0] : ((e.memoizedState = [l, t]), l);
  }
  function zo(l, t) {
    var e = Al();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Ii(t, a[1])) return a[0];
    if (((a = l()), Qe)) {
      le(!0);
      try {
        l();
      } finally {
        le(!1);
      }
    }
    return ((e.memoizedState = [a, t]), a);
  }
  function oc(l, t, e) {
    return e === void 0 || ((Vt & 1073741824) !== 0 && (tl & 261930) === 0)
      ? (l.memoizedState = t)
      : ((l.memoizedState = e), (l = Tr()), (k.lanes |= l), (ye |= l), e);
  }
  function To(l, t, e, a) {
    return it(e, t)
      ? e
      : ya.current !== null
        ? ((l = oc(l, e, a)), it(l, t) || (Dl = !0), l)
        : (Vt & 42) === 0 || ((Vt & 1073741824) !== 0 && (tl & 261930) === 0)
          ? ((Dl = !0), (l.memoizedState = e))
          : ((l = Tr()), (k.lanes |= l), (ye |= l), t);
  }
  function Eo(l, t, e, a, u) {
    var n = N.p;
    N.p = n !== 0 && 8 > n ? n : 8;
    var i = z.T,
      c = {};
    ((z.T = c), mc(l, !1, t, e));
    try {
      var f = u(),
        h = z.S;
      if ((h !== null && h(c, f), f !== null && typeof f == 'object' && typeof f.then == 'function')) {
        var S = fm(f, a);
        eu(l, t, S, dt(l));
      } else eu(l, t, a, dt(l));
    } catch (_) {
      eu(l, t, { then: function () {}, status: 'rejected', reason: _ }, dt());
    } finally {
      ((N.p = n), i !== null && c.types !== null && (i.types = c.types), (z.T = i));
    }
  }
  function ym() {}
  function rc(l, t, e, a) {
    if (l.tag !== 5) throw Error(s(476));
    var u = _o(l).queue;
    Eo(
      l,
      u,
      t,
      O,
      e === null
        ? ym
        : function () {
            return (Ao(l), e(a));
          }
    );
  }
  function _o(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: O,
      baseState: O,
      baseQueue: null,
      queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Zt, lastRenderedState: O },
      next: null,
    };
    var e = {};
    return (
      (t.next = {
        memoizedState: e,
        baseState: e,
        baseQueue: null,
        queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Zt, lastRenderedState: e },
        next: null,
      }),
      (l.memoizedState = t),
      (l = l.alternate),
      l !== null && (l.memoizedState = t),
      t
    );
  }
  function Ao(l) {
    var t = _o(l);
    (t.next === null && (t = l.alternate.memoizedState), eu(l, t.next.queue, {}, dt()));
  }
  function dc() {
    return Gl(pu);
  }
  function xo() {
    return Al().memoizedState;
  }
  function Mo() {
    return Al().memoizedState;
  }
  function hm(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = dt();
          l = fe(e);
          var a = se(t, l, e);
          (a !== null && (et(a, t, e), Fa(a, t, e)), (t = { cache: Qi() }), (l.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function vm(l, t, e) {
    var a = dt();
    ((e = { lane: a, revertLane: 0, gesture: null, action: e, hasEagerState: !1, eagerState: null, next: null }),
      mn(l) ? Do(t, e) : ((e = Ni(l, t, e, a)), e !== null && (et(e, l, a), No(e, t, a))));
  }
  function Oo(l, t, e) {
    var a = dt();
    eu(l, t, e, a);
  }
  function eu(l, t, e, a) {
    var u = { lane: a, revertLane: 0, gesture: null, action: e, hasEagerState: !1, eagerState: null, next: null };
    if (mn(l)) Do(t, u);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && ((n = t.lastRenderedReducer), n !== null))
        try {
          var i = t.lastRenderedState,
            c = n(i, e);
          if (((u.hasEagerState = !0), (u.eagerState = c), it(c, i))) return (Ju(l, t, u, 0), vl === null && Ku(), !1);
        } catch {
        } finally {
        }
      if (((e = Ni(l, t, u, a)), e !== null)) return (et(e, l, a), No(e, t, a), !0);
    }
    return !1;
  }
  function mc(l, t, e, a) {
    if (
      ((a = { lane: 2, revertLane: Kc(), gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null }),
      mn(l))
    ) {
      if (t) throw Error(s(479));
    } else ((t = Ni(l, e, a, 2)), t !== null && et(t, l, 2));
  }
  function mn(l) {
    var t = l.alternate;
    return l === k || (t !== null && t === k);
  }
  function Do(l, t) {
    ha = nn = !0;
    var e = l.pending;
    (e === null ? (t.next = t) : ((t.next = e.next), (e.next = t)), (l.pending = t));
  }
  function No(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      ((a &= l.pendingLanes), (e |= a), (t.lanes = e), Rf(l, e));
    }
  }
  var au = {
    readContext: Gl,
    use: sn,
    useCallback: zl,
    useContext: zl,
    useEffect: zl,
    useImperativeHandle: zl,
    useLayoutEffect: zl,
    useInsertionEffect: zl,
    useMemo: zl,
    useReducer: zl,
    useRef: zl,
    useState: zl,
    useDebugValue: zl,
    useDeferredValue: zl,
    useTransition: zl,
    useSyncExternalStore: zl,
    useId: zl,
    useHostTransitionStatus: zl,
    useFormState: zl,
    useActionState: zl,
    useOptimistic: zl,
    useMemoCache: zl,
    useCacheRefresh: zl,
  };
  au.useEffectEvent = zl;
  var Co = {
      readContext: Gl,
      use: sn,
      useCallback: function (l, t) {
        return ((kl().memoizedState = [l, t === void 0 ? null : t]), l);
      },
      useContext: Gl,
      useEffect: yo,
      useImperativeHandle: function (l, t, e) {
        ((e = e != null ? e.concat([l]) : null), rn(4194308, 4, bo.bind(null, t, l), e));
      },
      useLayoutEffect: function (l, t) {
        return rn(4194308, 4, l, t);
      },
      useInsertionEffect: function (l, t) {
        rn(4, 2, l, t);
      },
      useMemo: function (l, t) {
        var e = kl();
        t = t === void 0 ? null : t;
        var a = l();
        if (Qe) {
          le(!0);
          try {
            l();
          } finally {
            le(!1);
          }
        }
        return ((e.memoizedState = [a, t]), a);
      },
      useReducer: function (l, t, e) {
        var a = kl();
        if (e !== void 0) {
          var u = e(t);
          if (Qe) {
            le(!0);
            try {
              e(t);
            } finally {
              le(!1);
            }
          }
        } else u = t;
        return (
          (a.memoizedState = a.baseState = u),
          (l = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: l, lastRenderedState: u }),
          (a.queue = l),
          (l = l.dispatch = vm.bind(null, k, l)),
          [a.memoizedState, l]
        );
      },
      useRef: function (l) {
        var t = kl();
        return ((l = { current: l }), (t.memoizedState = l));
      },
      useState: function (l) {
        l = ic(l);
        var t = l.queue,
          e = Oo.bind(null, k, t);
        return ((t.dispatch = e), [l.memoizedState, e]);
      },
      useDebugValue: sc,
      useDeferredValue: function (l, t) {
        var e = kl();
        return oc(e, l, t);
      },
      useTransition: function () {
        var l = ic(!1);
        return ((l = Eo.bind(null, k, l.queue, !0, !1)), (kl().memoizedState = l), [!1, l]);
      },
      useSyncExternalStore: function (l, t, e) {
        var a = k,
          u = kl();
        if (al) {
          if (e === void 0) throw Error(s(407));
          e = e();
        } else {
          if (((e = t()), vl === null)) throw Error(s(349));
          (tl & 127) !== 0 || Fs(a, t, e);
        }
        u.memoizedState = e;
        var n = { value: e, getSnapshot: t };
        return (
          (u.queue = n),
          yo(Ps.bind(null, a, n, l), [l]),
          (a.flags |= 2048),
          ga(9, { destroy: void 0 }, Is.bind(null, a, n, e, t), null),
          e
        );
      },
      useId: function () {
        var l = kl(),
          t = vl.identifierPrefix;
        if (al) {
          var e = Ct,
            a = Nt;
          ((e = (a & ~(1 << (32 - nt(a) - 1))).toString(32) + e),
            (t = '_' + t + 'R_' + e),
            (e = cn++),
            0 < e && (t += 'H' + e.toString(32)),
            (t += '_'));
        } else ((e = sm++), (t = '_' + t + 'r_' + e.toString(32) + '_'));
        return (l.memoizedState = t);
      },
      useHostTransitionStatus: dc,
      useFormState: fo,
      useActionState: fo,
      useOptimistic: function (l) {
        var t = kl();
        t.memoizedState = t.baseState = l;
        var e = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
        return ((t.queue = e), (t = mc.bind(null, k, !0, e)), (e.dispatch = t), [l, t]);
      },
      useMemoCache: ac,
      useCacheRefresh: function () {
        return (kl().memoizedState = hm.bind(null, k));
      },
      useEffectEvent: function (l) {
        var t = kl(),
          e = { impl: l };
        return (
          (t.memoizedState = e),
          function () {
            if ((il & 2) !== 0) throw Error(s(440));
            return e.impl.apply(void 0, arguments);
          }
        );
      },
    },
    yc = {
      readContext: Gl,
      use: sn,
      useCallback: So,
      useContext: Gl,
      useEffect: fc,
      useImperativeHandle: po,
      useInsertionEffect: vo,
      useLayoutEffect: go,
      useMemo: zo,
      useReducer: on,
      useRef: mo,
      useState: function () {
        return on(Zt);
      },
      useDebugValue: sc,
      useDeferredValue: function (l, t) {
        var e = Al();
        return To(e, ml.memoizedState, l, t);
      },
      useTransition: function () {
        var l = on(Zt)[0],
          t = Al().memoizedState;
        return [typeof l == 'boolean' ? l : tu(l), t];
      },
      useSyncExternalStore: $s,
      useId: xo,
      useHostTransitionStatus: dc,
      useFormState: so,
      useActionState: so,
      useOptimistic: function (l, t) {
        var e = Al();
        return eo(e, ml, l, t);
      },
      useMemoCache: ac,
      useCacheRefresh: Mo,
    };
  yc.useEffectEvent = ho;
  var Uo = {
    readContext: Gl,
    use: sn,
    useCallback: So,
    useContext: Gl,
    useEffect: fc,
    useImperativeHandle: po,
    useInsertionEffect: vo,
    useLayoutEffect: go,
    useMemo: zo,
    useReducer: nc,
    useRef: mo,
    useState: function () {
      return nc(Zt);
    },
    useDebugValue: sc,
    useDeferredValue: function (l, t) {
      var e = Al();
      return ml === null ? oc(e, l, t) : To(e, ml.memoizedState, l, t);
    },
    useTransition: function () {
      var l = nc(Zt)[0],
        t = Al().memoizedState;
      return [typeof l == 'boolean' ? l : tu(l), t];
    },
    useSyncExternalStore: $s,
    useId: xo,
    useHostTransitionStatus: dc,
    useFormState: ro,
    useActionState: ro,
    useOptimistic: function (l, t) {
      var e = Al();
      return ml !== null ? eo(e, ml, l, t) : ((e.baseState = l), [l, e.queue.dispatch]);
    },
    useMemoCache: ac,
    useCacheRefresh: Mo,
  };
  Uo.useEffectEvent = ho;
  function hc(l, t, e, a) {
    ((t = l.memoizedState),
      (e = e(a, t)),
      (e = e == null ? t : D({}, t, e)),
      (l.memoizedState = e),
      l.lanes === 0 && (l.updateQueue.baseState = e));
  }
  var vc = {
    enqueueSetState: function (l, t, e) {
      l = l._reactInternals;
      var a = dt(),
        u = fe(a);
      ((u.payload = t), e != null && (u.callback = e), (t = se(l, u, a)), t !== null && (et(t, l, a), Fa(t, l, a)));
    },
    enqueueReplaceState: function (l, t, e) {
      l = l._reactInternals;
      var a = dt(),
        u = fe(a);
      ((u.tag = 1),
        (u.payload = t),
        e != null && (u.callback = e),
        (t = se(l, u, a)),
        t !== null && (et(t, l, a), Fa(t, l, a)));
    },
    enqueueForceUpdate: function (l, t) {
      l = l._reactInternals;
      var e = dt(),
        a = fe(e);
      ((a.tag = 2), t != null && (a.callback = t), (t = se(l, a, e)), t !== null && (et(t, l, e), Fa(t, l, e)));
    },
  };
  function jo(l, t, e, a, u, n, i) {
    return (
      (l = l.stateNode),
      typeof l.shouldComponentUpdate == 'function'
        ? l.shouldComponentUpdate(a, n, i)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Za(e, a) || !Za(u, n)
          : !0
    );
  }
  function Ro(l, t, e, a) {
    ((l = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(e, a),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' && t.UNSAFE_componentWillReceiveProps(e, a),
      t.state !== l && vc.enqueueReplaceState(t, t.state, null));
  }
  function Ve(l, t) {
    var e = t;
    if ('ref' in t) {
      e = {};
      for (var a in t) a !== 'ref' && (e[a] = t[a]);
    }
    if ((l = l.defaultProps)) {
      e === t && (e = D({}, e));
      for (var u in l) e[u] === void 0 && (e[u] = l[u]);
    }
    return e;
  }
  function Ho(l) {
    Lu(l);
  }
  function qo(l) {
    console.error(l);
  }
  function Bo(l) {
    Lu(l);
  }
  function yn(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function Yo(l, t, e) {
    try {
      var a = l.onCaughtError;
      a(e.value, { componentStack: e.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function gc(l, t, e) {
    return (
      (e = fe(e)),
      (e.tag = 3),
      (e.payload = { element: null }),
      (e.callback = function () {
        yn(l, t);
      }),
      e
    );
  }
  function Go(l) {
    return ((l = fe(l)), (l.tag = 3), l);
  }
  function Xo(l, t, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == 'function') {
      var n = a.value;
      ((l.payload = function () {
        return u(n);
      }),
        (l.callback = function () {
          Yo(t, e, a);
        }));
    }
    var i = e.stateNode;
    i !== null &&
      typeof i.componentDidCatch == 'function' &&
      (l.callback = function () {
        (Yo(t, e, a), typeof u != 'function' && (he === null ? (he = new Set([this])) : he.add(this)));
        var c = a.stack;
        this.componentDidCatch(a.value, { componentStack: c !== null ? c : '' });
      });
  }
  function gm(l, t, e, a, u) {
    if (((e.flags |= 32768), a !== null && typeof a == 'object' && typeof a.then == 'function')) {
      if (((t = e.alternate), t !== null && sa(t, e, u, !0), (e = ft.current), e !== null)) {
        switch (e.tag) {
          case 31:
          case 13:
            return (
              Tt === null ? xn() : e.alternate === null && Tl === 0 && (Tl = 3),
              (e.flags &= -257),
              (e.flags |= 65536),
              (e.lanes = u),
              a === ln
                ? (e.flags |= 16384)
                : ((t = e.updateQueue), t === null ? (e.updateQueue = new Set([a])) : t.add(a), Vc(l, a, u)),
              !1
            );
          case 22:
            return (
              (e.flags |= 65536),
              a === ln
                ? (e.flags |= 16384)
                : ((t = e.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([a]) }),
                      (e.updateQueue = t))
                    : ((e = t.retryQueue), e === null ? (t.retryQueue = new Set([a])) : e.add(a)),
                  Vc(l, a, u)),
              !1
            );
        }
        throw Error(s(435, e.tag));
      }
      return (Vc(l, a, u), xn(), !1);
    }
    if (al)
      return (
        (t = ft.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = u),
            a !== qi && ((l = Error(s(422), { cause: a })), Ja(bt(l, e))))
          : (a !== qi && ((t = Error(s(423), { cause: a })), Ja(bt(t, e))),
            (l = l.current.alternate),
            (l.flags |= 65536),
            (u &= -u),
            (l.lanes |= u),
            (a = bt(a, e)),
            (u = gc(l.stateNode, a, u)),
            wi(l, u),
            Tl !== 4 && (Tl = 2)),
        !1
      );
    var n = Error(s(520), { cause: a });
    if (((n = bt(n, e)), ru === null ? (ru = [n]) : ru.push(n), Tl !== 4 && (Tl = 2), t === null)) return !0;
    ((a = bt(a, e)), (e = t));
    do {
      switch (e.tag) {
        case 3:
          return ((e.flags |= 65536), (l = u & -u), (e.lanes |= l), (l = gc(e.stateNode, a, l)), wi(e, l), !1);
        case 1:
          if (
            ((t = e.type),
            (n = e.stateNode),
            (e.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == 'function' ||
                (n !== null && typeof n.componentDidCatch == 'function' && (he === null || !he.has(n)))))
          )
            return ((e.flags |= 65536), (u &= -u), (e.lanes |= u), (u = Go(u)), Xo(u, l, e, a), wi(e, u), !1);
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var bc = Error(s(461)),
    Dl = !1;
  function Xl(l, t, e, a) {
    t.child = l === null ? Zs(t, null, e, a) : Xe(t, l.child, e, a);
  }
  function Qo(l, t, e, a, u) {
    e = e.render;
    var n = t.ref;
    if ('ref' in a) {
      var i = {};
      for (var c in a) c !== 'ref' && (i[c] = a[c]);
    } else i = a;
    return (
      qe(t),
      (a = Pi(l, t, e, i, n, u)),
      (c = lc()),
      l !== null && !Dl ? (tc(l, t, u), Lt(l, t, u)) : (al && c && Ri(t), (t.flags |= 1), Xl(l, t, a, u), t.child)
    );
  }
  function Vo(l, t, e, a, u) {
    if (l === null) {
      var n = e.type;
      return typeof n == 'function' && !Ci(n) && n.defaultProps === void 0 && e.compare === null
        ? ((t.tag = 15), (t.type = n), Zo(l, t, n, a, u))
        : ((l = ku(e.type, null, a, t, t.mode, u)), (l.ref = t.ref), (l.return = t), (t.child = l));
    }
    if (((n = l.child), !xc(l, u))) {
      var i = n.memoizedProps;
      if (((e = e.compare), (e = e !== null ? e : Za), e(i, a) && l.ref === t.ref)) return Lt(l, t, u);
    }
    return ((t.flags |= 1), (l = Yt(n, a)), (l.ref = t.ref), (l.return = t), (t.child = l));
  }
  function Zo(l, t, e, a, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Za(n, a) && l.ref === t.ref)
        if (((Dl = !1), (t.pendingProps = a = n), xc(l, u))) (l.flags & 131072) !== 0 && (Dl = !0);
        else return ((t.lanes = l.lanes), Lt(l, t, u));
    }
    return pc(l, t, e, a, u);
  }
  function Lo(l, t, e, a) {
    var u = a.children,
      n = l !== null ? l.memoizedState : null;
    if (
      (l === null &&
        t.stateNode === null &&
        (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
      a.mode === 'hidden')
    ) {
      if ((t.flags & 128) !== 0) {
        if (((n = n !== null ? n.baseLanes | e : e), l !== null)) {
          for (a = t.child = l.child, u = 0; a !== null; ) ((u = u | a.lanes | a.childLanes), (a = a.sibling));
          a = u & ~n;
        } else ((a = 0), (t.child = null));
        return Ko(l, t, n, e, a);
      }
      if ((e & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          l !== null && Iu(t, n !== null ? n.cachePool : null),
          n !== null ? Js(t, n) : Wi(),
          ws(t));
      else return ((a = t.lanes = 536870912), Ko(l, t, n !== null ? n.baseLanes | e : e, e, a));
    } else
      n !== null
        ? (Iu(t, n.cachePool), Js(t, n), re(), (t.memoizedState = null))
        : (l !== null && Iu(t, null), Wi(), re());
    return (Xl(l, t, u, e), t.child);
  }
  function uu(l, t) {
    return (
      (l !== null && l.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
      t.sibling
    );
  }
  function Ko(l, t, e, a, u) {
    var n = Zi();
    return (
      (n = n === null ? null : { parent: Ml._currentValue, pool: n }),
      (t.memoizedState = { baseLanes: e, cachePool: n }),
      l !== null && Iu(t, null),
      Wi(),
      ws(t),
      l !== null && sa(l, t, a, !0),
      (t.childLanes = u),
      null
    );
  }
  function hn(l, t) {
    return (
      (t = gn({ mode: t.mode, children: t.children }, l.mode)),
      (t.ref = l.ref),
      (l.child = t),
      (t.return = l),
      t
    );
  }
  function Jo(l, t, e) {
    return (Xe(t, l.child, null, e), (l = hn(t, t.pendingProps)), (l.flags |= 2), st(t), (t.memoizedState = null), l);
  }
  function bm(l, t, e) {
    var a = t.pendingProps,
      u = (t.flags & 128) !== 0;
    if (((t.flags &= -129), l === null)) {
      if (al) {
        if (a.mode === 'hidden') return ((l = hn(t, a)), (t.lanes = 536870912), uu(null, l));
        if (
          (Fi(t),
          (l = gl)
            ? ((l = u0(l, zt)),
              (l = l !== null && l.data === '&' ? l : null),
              l !== null &&
                ((t.memoizedState = {
                  dehydrated: l,
                  treeContext: ae !== null ? { id: Nt, overflow: Ct } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (e = Os(l)),
                (e.return = t),
                (t.child = e),
                (Yl = t),
                (gl = null)))
            : (l = null),
          l === null)
        )
          throw ne(t);
        return ((t.lanes = 536870912), null);
      }
      return hn(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if ((Fi(t), u))
        if (t.flags & 256) ((t.flags &= -257), (t = Jo(l, t, e)));
        else if (t.memoizedState !== null) ((t.child = l.child), (t.flags |= 128), (t = null));
        else throw Error(s(558));
      else if ((Dl || sa(l, t, e, !1), (u = (e & l.childLanes) !== 0), Dl || u)) {
        if (((a = vl), a !== null && ((i = Hf(a, e)), i !== 0 && i !== n.retryLane)))
          throw ((n.retryLane = i), Ue(l, i), et(a, l, i), bc);
        (xn(), (t = Jo(l, t, e)));
      } else
        ((l = n.treeContext),
          (gl = Et(i.nextSibling)),
          (Yl = t),
          (al = !0),
          (ue = null),
          (zt = !1),
          l !== null && Cs(t, l),
          (t = hn(t, a)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (l = Yt(l.child, { mode: a.mode, children: a.children })),
      (l.ref = t.ref),
      (t.child = l),
      (l.return = t),
      l
    );
  }
  function vn(l, t) {
    var e = t.ref;
    if (e === null) l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != 'function' && typeof e != 'object') throw Error(s(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function pc(l, t, e, a, u) {
    return (
      qe(t),
      (e = Pi(l, t, e, a, void 0, u)),
      (a = lc()),
      l !== null && !Dl ? (tc(l, t, u), Lt(l, t, u)) : (al && a && Ri(t), (t.flags |= 1), Xl(l, t, e, u), t.child)
    );
  }
  function wo(l, t, e, a, u, n) {
    return (
      qe(t),
      (t.updateQueue = null),
      (e = Ws(t, a, e, u)),
      ks(l),
      (a = lc()),
      l !== null && !Dl ? (tc(l, t, n), Lt(l, t, n)) : (al && a && Ri(t), (t.flags |= 1), Xl(l, t, e, n), t.child)
    );
  }
  function ko(l, t, e, a, u) {
    if ((qe(t), t.stateNode === null)) {
      var n = na,
        i = e.contextType;
      (typeof i == 'object' && i !== null && (n = Gl(i)),
        (n = new e(a, n)),
        (t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null),
        (n.updater = vc),
        (t.stateNode = n),
        (n._reactInternals = t),
        (n = t.stateNode),
        (n.props = a),
        (n.state = t.memoizedState),
        (n.refs = {}),
        Ki(t),
        (i = e.contextType),
        (n.context = typeof i == 'object' && i !== null ? Gl(i) : na),
        (n.state = t.memoizedState),
        (i = e.getDerivedStateFromProps),
        typeof i == 'function' && (hc(t, e, i, a), (n.state = t.memoizedState)),
        typeof e.getDerivedStateFromProps == 'function' ||
          typeof n.getSnapshotBeforeUpdate == 'function' ||
          (typeof n.UNSAFE_componentWillMount != 'function' && typeof n.componentWillMount != 'function') ||
          ((i = n.state),
          typeof n.componentWillMount == 'function' && n.componentWillMount(),
          typeof n.UNSAFE_componentWillMount == 'function' && n.UNSAFE_componentWillMount(),
          i !== n.state && vc.enqueueReplaceState(n, n.state, null),
          Pa(t, a, n, u),
          Ia(),
          (n.state = t.memoizedState)),
        typeof n.componentDidMount == 'function' && (t.flags |= 4194308),
        (a = !0));
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps,
        f = Ve(e, c);
      n.props = f;
      var h = n.context,
        S = e.contextType;
      ((i = na), typeof S == 'object' && S !== null && (i = Gl(S)));
      var _ = e.getDerivedStateFromProps;
      ((S = typeof _ == 'function' || typeof n.getSnapshotBeforeUpdate == 'function'),
        (c = t.pendingProps !== c),
        S ||
          (typeof n.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof n.componentWillReceiveProps != 'function') ||
          ((c || h !== i) && Ro(t, n, a, i)),
        (ce = !1));
      var v = t.memoizedState;
      ((n.state = v),
        Pa(t, a, n, u),
        Ia(),
        (h = t.memoizedState),
        c || v !== h || ce
          ? (typeof _ == 'function' && (hc(t, e, _, a), (h = t.memoizedState)),
            (f = ce || jo(t, e, f, a, v, h, i))
              ? (S ||
                  (typeof n.UNSAFE_componentWillMount != 'function' && typeof n.componentWillMount != 'function') ||
                  (typeof n.componentWillMount == 'function' && n.componentWillMount(),
                  typeof n.UNSAFE_componentWillMount == 'function' && n.UNSAFE_componentWillMount()),
                typeof n.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof n.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = h)),
            (n.props = a),
            (n.state = h),
            (n.context = i),
            (a = f))
          : (typeof n.componentDidMount == 'function' && (t.flags |= 4194308), (a = !1)));
    } else {
      ((n = t.stateNode),
        Ji(l, t),
        (i = t.memoizedProps),
        (S = Ve(e, i)),
        (n.props = S),
        (_ = t.pendingProps),
        (v = n.context),
        (h = e.contextType),
        (f = na),
        typeof h == 'object' && h !== null && (f = Gl(h)),
        (c = e.getDerivedStateFromProps),
        (h = typeof c == 'function' || typeof n.getSnapshotBeforeUpdate == 'function') ||
          (typeof n.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof n.componentWillReceiveProps != 'function') ||
          ((i !== _ || v !== f) && Ro(t, n, a, f)),
        (ce = !1),
        (v = t.memoizedState),
        (n.state = v),
        Pa(t, a, n, u),
        Ia());
      var g = t.memoizedState;
      i !== _ || v !== g || ce || (l !== null && l.dependencies !== null && $u(l.dependencies))
        ? (typeof c == 'function' && (hc(t, e, c, a), (g = t.memoizedState)),
          (S = ce || jo(t, e, S, a, v, g, f) || (l !== null && l.dependencies !== null && $u(l.dependencies)))
            ? (h ||
                (typeof n.UNSAFE_componentWillUpdate != 'function' && typeof n.componentWillUpdate != 'function') ||
                (typeof n.componentWillUpdate == 'function' && n.componentWillUpdate(a, g, f),
                typeof n.UNSAFE_componentWillUpdate == 'function' && n.UNSAFE_componentWillUpdate(a, g, f)),
              typeof n.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof n.componentDidUpdate != 'function' ||
                (i === l.memoizedProps && v === l.memoizedState) ||
                (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate != 'function' ||
                (i === l.memoizedProps && v === l.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = g)),
          (n.props = a),
          (n.state = g),
          (n.context = f),
          (a = S))
        : (typeof n.componentDidUpdate != 'function' ||
            (i === l.memoizedProps && v === l.memoizedState) ||
            (t.flags |= 4),
          typeof n.getSnapshotBeforeUpdate != 'function' ||
            (i === l.memoizedProps && v === l.memoizedState) ||
            (t.flags |= 1024),
          (a = !1));
    }
    return (
      (n = a),
      vn(l, t),
      (a = (t.flags & 128) !== 0),
      n || a
        ? ((n = t.stateNode),
          (e = a && typeof e.getDerivedStateFromError != 'function' ? null : n.render()),
          (t.flags |= 1),
          l !== null && a ? ((t.child = Xe(t, l.child, null, u)), (t.child = Xe(t, null, e, u))) : Xl(l, t, e, u),
          (t.memoizedState = n.state),
          (l = t.child))
        : (l = Lt(l, t, u)),
      l
    );
  }
  function Wo(l, t, e, a) {
    return (Re(), (t.flags |= 256), Xl(l, t, e, a), t.child);
  }
  var Sc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function zc(l) {
    return { baseLanes: l, cachePool: Bs() };
  }
  function Tc(l, t, e) {
    return ((l = l !== null ? l.childLanes & ~e : 0), t && (l |= rt), l);
  }
  function $o(l, t, e) {
    var a = t.pendingProps,
      u = !1,
      n = (t.flags & 128) !== 0,
      i;
    if (
      ((i = n) || (i = l !== null && l.memoizedState === null ? !1 : (_l.current & 2) !== 0),
      i && ((u = !0), (t.flags &= -129)),
      (i = (t.flags & 32) !== 0),
      (t.flags &= -33),
      l === null)
    ) {
      if (al) {
        if (
          (u ? oe(t) : re(),
          (l = gl)
            ? ((l = u0(l, zt)),
              (l = l !== null && l.data !== '&' ? l : null),
              l !== null &&
                ((t.memoizedState = {
                  dehydrated: l,
                  treeContext: ae !== null ? { id: Nt, overflow: Ct } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (e = Os(l)),
                (e.return = t),
                (t.child = e),
                (Yl = t),
                (gl = null)))
            : (l = null),
          l === null)
        )
          throw ne(t);
        return (uf(l) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var c = a.children;
      return (
        (a = a.fallback),
        u
          ? (re(),
            (u = t.mode),
            (c = gn({ mode: 'hidden', children: c }, u)),
            (a = je(a, u, e, null)),
            (c.return = t),
            (a.return = t),
            (c.sibling = a),
            (t.child = c),
            (a = t.child),
            (a.memoizedState = zc(e)),
            (a.childLanes = Tc(l, i, e)),
            (t.memoizedState = Sc),
            uu(null, a))
          : (oe(t), Ec(t, c))
      );
    }
    var f = l.memoizedState;
    if (f !== null && ((c = f.dehydrated), c !== null)) {
      if (n)
        t.flags & 256
          ? (oe(t), (t.flags &= -257), (t = _c(l, t, e)))
          : t.memoizedState !== null
            ? (re(), (t.child = l.child), (t.flags |= 128), (t = null))
            : (re(),
              (c = a.fallback),
              (u = t.mode),
              (a = gn({ mode: 'visible', children: a.children }, u)),
              (c = je(c, u, e, null)),
              (c.flags |= 2),
              (a.return = t),
              (c.return = t),
              (a.sibling = c),
              (t.child = a),
              Xe(t, l.child, null, e),
              (a = t.child),
              (a.memoizedState = zc(e)),
              (a.childLanes = Tc(l, i, e)),
              (t.memoizedState = Sc),
              (t = uu(null, a)));
      else if ((oe(t), uf(c))) {
        if (((i = c.nextSibling && c.nextSibling.dataset), i)) var h = i.dgst;
        ((i = h),
          (a = Error(s(419))),
          (a.stack = ''),
          (a.digest = i),
          Ja({ value: a, source: null, stack: null }),
          (t = _c(l, t, e)));
      } else if ((Dl || sa(l, t, e, !1), (i = (e & l.childLanes) !== 0), Dl || i)) {
        if (((i = vl), i !== null && ((a = Hf(i, e)), a !== 0 && a !== f.retryLane)))
          throw ((f.retryLane = a), Ue(l, a), et(i, l, a), bc);
        (af(c) || xn(), (t = _c(l, t, e)));
      } else
        af(c)
          ? ((t.flags |= 192), (t.child = l.child), (t = null))
          : ((l = f.treeContext),
            (gl = Et(c.nextSibling)),
            (Yl = t),
            (al = !0),
            (ue = null),
            (zt = !1),
            l !== null && Cs(t, l),
            (t = Ec(t, a.children)),
            (t.flags |= 4096));
      return t;
    }
    return u
      ? (re(),
        (c = a.fallback),
        (u = t.mode),
        (f = l.child),
        (h = f.sibling),
        (a = Yt(f, { mode: 'hidden', children: a.children })),
        (a.subtreeFlags = f.subtreeFlags & 65011712),
        h !== null ? (c = Yt(h, c)) : ((c = je(c, u, e, null)), (c.flags |= 2)),
        (c.return = t),
        (a.return = t),
        (a.sibling = c),
        (t.child = a),
        uu(null, a),
        (a = t.child),
        (c = l.child.memoizedState),
        c === null
          ? (c = zc(e))
          : ((u = c.cachePool),
            u !== null ? ((f = Ml._currentValue), (u = u.parent !== f ? { parent: f, pool: f } : u)) : (u = Bs()),
            (c = { baseLanes: c.baseLanes | e, cachePool: u })),
        (a.memoizedState = c),
        (a.childLanes = Tc(l, i, e)),
        (t.memoizedState = Sc),
        uu(l.child, a))
      : (oe(t),
        (e = l.child),
        (l = e.sibling),
        (e = Yt(e, { mode: 'visible', children: a.children })),
        (e.return = t),
        (e.sibling = null),
        l !== null && ((i = t.deletions), i === null ? ((t.deletions = [l]), (t.flags |= 16)) : i.push(l)),
        (t.child = e),
        (t.memoizedState = null),
        e);
  }
  function Ec(l, t) {
    return ((t = gn({ mode: 'visible', children: t }, l.mode)), (t.return = l), (l.child = t));
  }
  function gn(l, t) {
    return ((l = ct(22, l, null, t)), (l.lanes = 0), l);
  }
  function _c(l, t, e) {
    return (Xe(t, l.child, null, e), (l = Ec(t, t.pendingProps.children)), (l.flags |= 2), (t.memoizedState = null), l);
  }
  function Fo(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    (a !== null && (a.lanes |= t), Gi(l.return, t, e));
  }
  function Ac(l, t, e, a, u, n) {
    var i = l.memoizedState;
    i === null
      ? (l.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: e,
          tailMode: u,
          treeForkCount: n,
        })
      : ((i.isBackwards = t),
        (i.rendering = null),
        (i.renderingStartTime = 0),
        (i.last = a),
        (i.tail = e),
        (i.tailMode = u),
        (i.treeForkCount = n));
  }
  function Io(l, t, e) {
    var a = t.pendingProps,
      u = a.revealOrder,
      n = a.tail;
    a = a.children;
    var i = _l.current,
      c = (i & 2) !== 0;
    if (
      (c ? ((i = (i & 1) | 2), (t.flags |= 128)) : (i &= 1),
      U(_l, i),
      Xl(l, t, a, e),
      (a = al ? Ka : 0),
      !c && l !== null && (l.flags & 128) !== 0)
    )
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13) l.memoizedState !== null && Fo(l, e, t);
        else if (l.tag === 19) Fo(l, e, t);
        else if (l.child !== null) {
          ((l.child.return = l), (l = l.child));
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) break l;
          l = l.return;
        }
        ((l.sibling.return = l.return), (l = l.sibling));
      }
    switch (u) {
      case 'forwards':
        for (e = t.child, u = null; e !== null; )
          ((l = e.alternate), l !== null && un(l) === null && (u = e), (e = e.sibling));
        ((e = u),
          e === null ? ((u = t.child), (t.child = null)) : ((u = e.sibling), (e.sibling = null)),
          Ac(t, !1, u, e, n, a));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (e = null, u = t.child, t.child = null; u !== null; ) {
          if (((l = u.alternate), l !== null && un(l) === null)) {
            t.child = u;
            break;
          }
          ((l = u.sibling), (u.sibling = e), (e = u), (u = l));
        }
        Ac(t, !0, e, null, n, a);
        break;
      case 'together':
        Ac(t, !1, null, null, void 0, a);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Lt(l, t, e) {
    if ((l !== null && (t.dependencies = l.dependencies), (ye |= t.lanes), (e & t.childLanes) === 0))
      if (l !== null) {
        if ((sa(l, t, e, !1), (e & t.childLanes) === 0)) return null;
      } else return null;
    if (l !== null && t.child !== l.child) throw Error(s(153));
    if (t.child !== null) {
      for (l = t.child, e = Yt(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; )
        ((l = l.sibling), (e = e.sibling = Yt(l, l.pendingProps)), (e.return = t));
      e.sibling = null;
    }
    return t.child;
  }
  function xc(l, t) {
    return (l.lanes & t) !== 0 ? !0 : ((l = l.dependencies), !!(l !== null && $u(l)));
  }
  function pm(l, t, e) {
    switch (t.tag) {
      case 3:
        (wl(t, t.stateNode.containerInfo), ie(t, Ml, l.memoizedState.cache), Re());
        break;
      case 27:
      case 5:
        Na(t);
        break;
      case 4:
        wl(t, t.stateNode.containerInfo);
        break;
      case 10:
        ie(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Fi(t), null);
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (oe(t), (t.flags |= 128), null)
            : (e & t.child.childLanes) !== 0
              ? $o(l, t, e)
              : (oe(t), (l = Lt(l, t, e)), l !== null ? l.sibling : null);
        oe(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (((a = (e & t.childLanes) !== 0), a || (sa(l, t, e, !1), (a = (e & t.childLanes) !== 0)), u)) {
          if (a) return Io(l, t, e);
          t.flags |= 128;
        }
        if (
          ((u = t.memoizedState),
          u !== null && ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          U(_l, _l.current),
          a)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), Lo(l, t, e, t.pendingProps));
      case 24:
        ie(t, Ml, l.memoizedState.cache);
    }
    return Lt(l, t, e);
  }
  function Po(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps) Dl = !0;
      else {
        if (!xc(l, e) && (t.flags & 128) === 0) return ((Dl = !1), pm(l, t, e));
        Dl = (l.flags & 131072) !== 0;
      }
    else ((Dl = !1), al && (t.flags & 1048576) !== 0 && Ns(t, Ka, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (((l = Ye(t.elementType)), (t.type = l), typeof l == 'function'))
            Ci(l)
              ? ((a = Ve(l, a)), (t.tag = 1), (t = ko(null, t, l, a, e)))
              : ((t.tag = 0), (t = pc(null, t, l, a, e)));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === G) {
                ((t.tag = 11), (t = Qo(null, t, l, a, e)));
                break l;
              } else if (u === $) {
                ((t.tag = 14), (t = Vo(null, t, l, a, e)));
                break l;
              }
            }
            throw ((t = xt(l) || l), Error(s(306, t, '')));
          }
        }
        return t;
      case 0:
        return pc(l, t, t.type, t.pendingProps, e);
      case 1:
        return ((a = t.type), (u = Ve(a, t.pendingProps)), ko(l, t, a, u, e));
      case 3:
        l: {
          if ((wl(t, t.stateNode.containerInfo), l === null)) throw Error(s(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          ((u = n.element), Ji(l, t), Pa(t, a, null, e));
          var i = t.memoizedState;
          if (((a = i.cache), ie(t, Ml, a), a !== n.cache && Xi(t, [Ml], e, !0), Ia(), (a = i.element), n.isDehydrated))
            if (
              ((n = { element: a, isDehydrated: !1, cache: i.cache }),
              (t.updateQueue.baseState = n),
              (t.memoizedState = n),
              t.flags & 256)
            ) {
              t = Wo(l, t, a, e);
              break l;
            } else if (a !== u) {
              ((u = bt(Error(s(424)), t)), Ja(u), (t = Wo(l, t, a, e)));
              break l;
            } else {
              switch (((l = t.stateNode.containerInfo), l.nodeType)) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === 'HTML' ? l.ownerDocument.body : l;
              }
              for (gl = Et(l.firstChild), Yl = t, al = !0, ue = null, zt = !0, e = Zs(t, null, a, e), t.child = e; e; )
                ((e.flags = (e.flags & -3) | 4096), (e = e.sibling));
            }
          else {
            if ((Re(), a === u)) {
              t = Lt(l, t, e);
              break l;
            }
            Xl(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          vn(l, t),
          l === null
            ? (e = o0(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = e)
              : al ||
                ((e = t.type),
                (l = t.pendingProps),
                (a = jn(F.current).createElement(e)),
                (a[Bl] = t),
                (a[$l] = l),
                Ql(a, e, l),
                jl(a),
                (t.stateNode = a))
            : (t.memoizedState = o0(t.type, l.memoizedProps, t.pendingProps, l.memoizedState)),
          null
        );
      case 27:
        return (
          Na(t),
          l === null &&
            al &&
            ((a = t.stateNode = c0(t.type, t.pendingProps, F.current)),
            (Yl = t),
            (zt = !0),
            (u = gl),
            pe(t.type) ? ((nf = u), (gl = Et(a.firstChild))) : (gl = u)),
          Xl(l, t, t.pendingProps.children, e),
          vn(l, t),
          l === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          l === null &&
            al &&
            ((u = a = gl) &&
              ((a = Wm(a, t.type, t.pendingProps, zt)),
              a !== null ? ((t.stateNode = a), (Yl = t), (gl = Et(a.firstChild)), (zt = !1), (u = !0)) : (u = !1)),
            u || ne(t)),
          Na(t),
          (u = t.type),
          (n = t.pendingProps),
          (i = l !== null ? l.memoizedProps : null),
          (a = n.children),
          lf(u, n) ? (a = null) : i !== null && lf(u, i) && (t.flags |= 32),
          t.memoizedState !== null && ((u = Pi(l, t, om, null, null, e)), (pu._currentValue = u)),
          vn(l, t),
          Xl(l, t, a, e),
          t.child
        );
      case 6:
        return (
          l === null &&
            al &&
            ((l = e = gl) &&
              ((e = $m(e, t.pendingProps, zt)),
              e !== null ? ((t.stateNode = e), (Yl = t), (gl = null), (l = !0)) : (l = !1)),
            l || ne(t)),
          null
        );
      case 13:
        return $o(l, t, e);
      case 4:
        return (
          wl(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          l === null ? (t.child = Xe(t, null, a, e)) : Xl(l, t, a, e),
          t.child
        );
      case 11:
        return Qo(l, t, t.type, t.pendingProps, e);
      case 7:
        return (Xl(l, t, t.pendingProps, e), t.child);
      case 8:
        return (Xl(l, t, t.pendingProps.children, e), t.child);
      case 12:
        return (Xl(l, t, t.pendingProps.children, e), t.child);
      case 10:
        return ((a = t.pendingProps), ie(t, t.type, a.value), Xl(l, t, a.children, e), t.child);
      case 9:
        return (
          (u = t.type._context),
          (a = t.pendingProps.children),
          qe(t),
          (u = Gl(u)),
          (a = a(u)),
          (t.flags |= 1),
          Xl(l, t, a, e),
          t.child
        );
      case 14:
        return Vo(l, t, t.type, t.pendingProps, e);
      case 15:
        return Zo(l, t, t.type, t.pendingProps, e);
      case 19:
        return Io(l, t, e);
      case 31:
        return bm(l, t, e);
      case 22:
        return Lo(l, t, e, t.pendingProps);
      case 24:
        return (
          qe(t),
          (a = Gl(Ml)),
          l === null
            ? ((u = Zi()),
              u === null &&
                ((u = vl),
                (n = Qi()),
                (u.pooledCache = n),
                n.refCount++,
                n !== null && (u.pooledCacheLanes |= e),
                (u = n)),
              (t.memoizedState = { parent: a, cache: u }),
              Ki(t),
              ie(t, Ml, u))
            : ((l.lanes & e) !== 0 && (Ji(l, t), Pa(t, null, null, e), Ia()),
              (u = l.memoizedState),
              (n = t.memoizedState),
              u.parent !== a
                ? ((u = { parent: a, cache: a }),
                  (t.memoizedState = u),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u),
                  ie(t, Ml, a))
                : ((a = n.cache), ie(t, Ml, a), a !== u.cache && Xi(t, [Ml], e, !0))),
          Xl(l, t, t.pendingProps.children, e),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function Kt(l) {
    l.flags |= 4;
  }
  function Mc(l, t, e, a, u) {
    if (((t = (l.mode & 32) !== 0) && (t = !1), t)) {
      if (((l.flags |= 16777216), (u & 335544128) === u))
        if (l.stateNode.complete) l.flags |= 8192;
        else if (xr()) l.flags |= 8192;
        else throw ((Ge = ln), Li);
    } else l.flags &= -16777217;
  }
  function lr(l, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) l.flags &= -16777217;
    else if (((l.flags |= 16777216), !h0(t)))
      if (xr()) l.flags |= 8192;
      else throw ((Ge = ln), Li);
  }
  function bn(l, t) {
    (t !== null && (l.flags |= 4),
      l.flags & 16384 && ((t = l.tag !== 22 ? Uf() : 536870912), (l.lanes |= t), (za |= t)));
  }
  function nu(l, t) {
    if (!al)
      switch (l.tailMode) {
        case 'hidden':
          t = l.tail;
          for (var e = null; t !== null; ) (t.alternate !== null && (e = t), (t = t.sibling));
          e === null ? (l.tail = null) : (e.sibling = null);
          break;
        case 'collapsed':
          e = l.tail;
          for (var a = null; e !== null; ) (e.alternate !== null && (a = e), (e = e.sibling));
          a === null ? (t || l.tail === null ? (l.tail = null) : (l.tail.sibling = null)) : (a.sibling = null);
      }
  }
  function bl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child,
      e = 0,
      a = 0;
    if (t)
      for (var u = l.child; u !== null; )
        ((e |= u.lanes | u.childLanes),
          (a |= u.subtreeFlags & 65011712),
          (a |= u.flags & 65011712),
          (u.return = l),
          (u = u.sibling));
    else
      for (u = l.child; u !== null; )
        ((e |= u.lanes | u.childLanes), (a |= u.subtreeFlags), (a |= u.flags), (u.return = l), (u = u.sibling));
    return ((l.subtreeFlags |= a), (l.childLanes = e), t);
  }
  function Sm(l, t, e) {
    var a = t.pendingProps;
    switch ((Hi(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (bl(t), null);
      case 1:
        return (bl(t), null);
      case 3:
        return (
          (e = t.stateNode),
          (a = null),
          l !== null && (a = l.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Qt(Ml),
          El(),
          e.pendingContext && ((e.context = e.pendingContext), (e.pendingContext = null)),
          (l === null || l.child === null) &&
            (fa(t)
              ? Kt(t)
              : l === null || (l.memoizedState.isDehydrated && (t.flags & 256) === 0) || ((t.flags |= 1024), Bi())),
          bl(t),
          null
        );
      case 26:
        var u = t.type,
          n = t.memoizedState;
        return (
          l === null
            ? (Kt(t), n !== null ? (bl(t), lr(t, n)) : (bl(t), Mc(t, u, null, a, e)))
            : n
              ? n !== l.memoizedState
                ? (Kt(t), bl(t), lr(t, n))
                : (bl(t), (t.flags &= -16777217))
              : ((l = l.memoizedProps), l !== a && Kt(t), bl(t), Mc(t, u, l, a, e)),
          null
        );
      case 27:
        if ((Ou(t), (e = F.current), (u = t.type), l !== null && t.stateNode != null)) l.memoizedProps !== a && Kt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(s(166));
            return (bl(t), null);
          }
          ((l = H.current), fa(t) ? Us(t) : ((l = c0(u, a, e)), (t.stateNode = l), Kt(t)));
        }
        return (bl(t), null);
      case 5:
        if ((Ou(t), (u = t.type), l !== null && t.stateNode != null)) l.memoizedProps !== a && Kt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(s(166));
            return (bl(t), null);
          }
          if (((n = H.current), fa(t))) Us(t);
          else {
            var i = jn(F.current);
            switch (n) {
              case 1:
                n = i.createElementNS('http://www.w3.org/2000/svg', u);
                break;
              case 2:
                n = i.createElementNS('http://www.w3.org/1998/Math/MathML', u);
                break;
              default:
                switch (u) {
                  case 'svg':
                    n = i.createElementNS('http://www.w3.org/2000/svg', u);
                    break;
                  case 'math':
                    n = i.createElementNS('http://www.w3.org/1998/Math/MathML', u);
                    break;
                  case 'script':
                    ((n = i.createElement('div')),
                      (n.innerHTML = '<script><\/script>'),
                      (n = n.removeChild(n.firstChild)));
                    break;
                  case 'select':
                    ((n =
                      typeof a.is == 'string' ? i.createElement('select', { is: a.is }) : i.createElement('select')),
                      a.multiple ? (n.multiple = !0) : a.size && (n.size = a.size));
                    break;
                  default:
                    n = typeof a.is == 'string' ? i.createElement(u, { is: a.is }) : i.createElement(u);
                }
            }
            ((n[Bl] = t), (n[$l] = a));
            l: for (i = t.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6) n.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                ((i.child.return = i), (i = i.child));
                continue;
              }
              if (i === t) break l;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === t) break l;
                i = i.return;
              }
              ((i.sibling.return = i.return), (i = i.sibling));
            }
            t.stateNode = n;
            l: switch ((Ql(n, u, a), u)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                a = !!a.autoFocus;
                break l;
              case 'img':
                a = !0;
                break l;
              default:
                a = !1;
            }
            a && Kt(t);
          }
        }
        return (bl(t), Mc(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, e), null);
      case 6:
        if (l && t.stateNode != null) l.memoizedProps !== a && Kt(t);
        else {
          if (typeof a != 'string' && t.stateNode === null) throw Error(s(166));
          if (((l = F.current), fa(t))) {
            if (((l = t.stateNode), (e = t.memoizedProps), (a = null), (u = Yl), u !== null))
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            ((l[Bl] = t),
              (l = !!(l.nodeValue === e || (a !== null && a.suppressHydrationWarning === !0) || $r(l.nodeValue, e))),
              l || ne(t, !0));
          } else ((l = jn(l).createTextNode(a)), (l[Bl] = t), (t.stateNode = l));
        }
        return (bl(t), null);
      case 31:
        if (((e = t.memoizedState), l === null || l.memoizedState !== null)) {
          if (((a = fa(t)), e !== null)) {
            if (l === null) {
              if (!a) throw Error(s(318));
              if (((l = t.memoizedState), (l = l !== null ? l.dehydrated : null), !l)) throw Error(s(557));
              l[Bl] = t;
            } else (Re(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (bl(t), (l = !1));
          } else
            ((e = Bi()), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), (l = !0));
          if (!l) return t.flags & 256 ? (st(t), t) : (st(t), null);
          if ((t.flags & 128) !== 0) throw Error(s(558));
        }
        return (bl(t), null);
      case 13:
        if (((a = t.memoizedState), l === null || (l.memoizedState !== null && l.memoizedState.dehydrated !== null))) {
          if (((u = fa(t)), a !== null && a.dehydrated !== null)) {
            if (l === null) {
              if (!u) throw Error(s(318));
              if (((u = t.memoizedState), (u = u !== null ? u.dehydrated : null), !u)) throw Error(s(317));
              u[Bl] = t;
            } else (Re(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (bl(t), (u = !1));
          } else
            ((u = Bi()), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), (u = !0));
          if (!u) return t.flags & 256 ? (st(t), t) : (st(t), null);
        }
        return (
          st(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = e), t)
            : ((e = a !== null),
              (l = l !== null && l.memoizedState !== null),
              e &&
                ((a = t.child),
                (u = null),
                a.alternate !== null &&
                  a.alternate.memoizedState !== null &&
                  a.alternate.memoizedState.cachePool !== null &&
                  (u = a.alternate.memoizedState.cachePool.pool),
                (n = null),
                a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool),
                n !== u && (a.flags |= 2048)),
              e !== l && e && (t.child.flags |= 8192),
              bn(t, t.updateQueue),
              bl(t),
              null)
        );
      case 4:
        return (El(), l === null && Wc(t.stateNode.containerInfo), bl(t), null);
      case 10:
        return (Qt(t.type), bl(t), null);
      case 19:
        if ((x(_l), (a = t.memoizedState), a === null)) return (bl(t), null);
        if (((u = (t.flags & 128) !== 0), (n = a.rendering), n === null))
          if (u) nu(a, !1);
          else {
            if (Tl !== 0 || (l !== null && (l.flags & 128) !== 0))
              for (l = t.child; l !== null; ) {
                if (((n = un(l)), n !== null)) {
                  for (
                    t.flags |= 128,
                      nu(a, !1),
                      l = n.updateQueue,
                      t.updateQueue = l,
                      bn(t, l),
                      t.subtreeFlags = 0,
                      l = e,
                      e = t.child;
                    e !== null;
                  )
                    (Ms(e, l), (e = e.sibling));
                  return (U(_l, (_l.current & 1) | 2), al && Gt(t, a.treeForkCount), t.child);
                }
                l = l.sibling;
              }
            a.tail !== null && at() > En && ((t.flags |= 128), (u = !0), nu(a, !1), (t.lanes = 4194304));
          }
        else {
          if (!u)
            if (((l = un(n)), l !== null)) {
              if (
                ((t.flags |= 128),
                (u = !0),
                (l = l.updateQueue),
                (t.updateQueue = l),
                bn(t, l),
                nu(a, !0),
                a.tail === null && a.tailMode === 'hidden' && !n.alternate && !al)
              )
                return (bl(t), null);
            } else
              2 * at() - a.renderingStartTime > En &&
                e !== 536870912 &&
                ((t.flags |= 128), (u = !0), nu(a, !1), (t.lanes = 4194304));
          a.isBackwards
            ? ((n.sibling = t.child), (t.child = n))
            : ((l = a.last), l !== null ? (l.sibling = n) : (t.child = n), (a.last = n));
        }
        return a.tail !== null
          ? ((l = a.tail),
            (a.rendering = l),
            (a.tail = l.sibling),
            (a.renderingStartTime = at()),
            (l.sibling = null),
            (e = _l.current),
            U(_l, u ? (e & 1) | 2 : e & 1),
            al && Gt(t, a.treeForkCount),
            l)
          : (bl(t), null);
      case 22:
      case 23:
        return (
          st(t),
          $i(),
          (a = t.memoizedState !== null),
          l !== null ? (l.memoizedState !== null) !== a && (t.flags |= 8192) : a && (t.flags |= 8192),
          a
            ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (bl(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : bl(t),
          (e = t.updateQueue),
          e !== null && bn(t, e.retryQueue),
          (e = null),
          l !== null &&
            l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (e = l.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool),
          a !== e && (t.flags |= 2048),
          l !== null && x(Be),
          null
        );
      case 24:
        return (
          (e = null),
          l !== null && (e = l.memoizedState.cache),
          t.memoizedState.cache !== e && (t.flags |= 2048),
          Qt(Ml),
          bl(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function zm(l, t) {
    switch ((Hi(t), t.tag)) {
      case 1:
        return ((l = t.flags), l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null);
      case 3:
        return (
          Qt(Ml),
          El(),
          (l = t.flags),
          (l & 65536) !== 0 && (l & 128) === 0 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (Ou(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((st(t), t.alternate === null)) throw Error(s(340));
          Re();
        }
        return ((l = t.flags), l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null);
      case 13:
        if ((st(t), (l = t.memoizedState), l !== null && l.dehydrated !== null)) {
          if (t.alternate === null) throw Error(s(340));
          Re();
        }
        return ((l = t.flags), l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null);
      case 19:
        return (x(_l), null);
      case 4:
        return (El(), null);
      case 10:
        return (Qt(t.type), null);
      case 22:
      case 23:
        return (
          st(t),
          $i(),
          l !== null && x(Be),
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 24:
        return (Qt(Ml), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function tr(l, t) {
    switch ((Hi(t), t.tag)) {
      case 3:
        (Qt(Ml), El());
        break;
      case 26:
      case 27:
      case 5:
        Ou(t);
        break;
      case 4:
        El();
        break;
      case 31:
        t.memoizedState !== null && st(t);
        break;
      case 13:
        st(t);
        break;
      case 19:
        x(_l);
        break;
      case 10:
        Qt(t.type);
        break;
      case 22:
      case 23:
        (st(t), $i(), l !== null && x(Be));
        break;
      case 24:
        Qt(Ml);
    }
  }
  function iu(l, t) {
    try {
      var e = t.updateQueue,
        a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        e = u;
        do {
          if ((e.tag & l) === l) {
            a = void 0;
            var n = e.create,
              i = e.inst;
            ((a = n()), (i.destroy = a));
          }
          e = e.next;
        } while (e !== u);
      }
    } catch (c) {
      dl(t, t.return, c);
    }
  }
  function de(l, t, e) {
    try {
      var a = t.updateQueue,
        u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & l) === l) {
            var i = a.inst,
              c = i.destroy;
            if (c !== void 0) {
              ((i.destroy = void 0), (u = t));
              var f = e,
                h = c;
              try {
                h();
              } catch (S) {
                dl(u, f, S);
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (S) {
      dl(t, t.return, S);
    }
  }
  function er(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        Ks(t, e);
      } catch (a) {
        dl(l, l.return, a);
      }
    }
  }
  function ar(l, t, e) {
    ((e.props = Ve(l.type, l.memoizedProps)), (e.state = l.memoizedState));
    try {
      e.componentWillUnmount();
    } catch (a) {
      dl(l, t, a);
    }
  }
  function cu(l, t) {
    try {
      var e = l.ref;
      if (e !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var a = l.stateNode;
            break;
          case 30:
            a = l.stateNode;
            break;
          default:
            a = l.stateNode;
        }
        typeof e == 'function' ? (l.refCleanup = e(a)) : (e.current = a);
      }
    } catch (u) {
      dl(l, t, u);
    }
  }
  function Ut(l, t) {
    var e = l.ref,
      a = l.refCleanup;
    if (e !== null)
      if (typeof a == 'function')
        try {
          a();
        } catch (u) {
          dl(l, t, u);
        } finally {
          ((l.refCleanup = null), (l = l.alternate), l != null && (l.refCleanup = null));
        }
      else if (typeof e == 'function')
        try {
          e(null);
        } catch (u) {
          dl(l, t, u);
        }
      else e.current = null;
  }
  function ur(l) {
    var t = l.type,
      e = l.memoizedProps,
      a = l.stateNode;
    try {
      l: switch (t) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          e.autoFocus && a.focus();
          break l;
        case 'img':
          e.src ? (a.src = e.src) : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (u) {
      dl(l, l.return, u);
    }
  }
  function Oc(l, t, e) {
    try {
      var a = l.stateNode;
      (Zm(a, l.type, e, t), (a[$l] = t));
    } catch (u) {
      dl(l, l.return, u);
    }
  }
  function nr(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || (l.tag === 27 && pe(l.type)) || l.tag === 4;
  }
  function Dc(l) {
    l: for (;;) {
      for (; l.sibling === null; ) {
        if (l.return === null || nr(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if ((l.tag === 27 && pe(l.type)) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        ((l.child.return = l), (l = l.child));
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Nc(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      ((l = l.stateNode),
        t
          ? (e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e).insertBefore(l, t)
          : ((t = e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e),
            t.appendChild(l),
            (e = e._reactRootContainer),
            e != null || t.onclick !== null || (t.onclick = qt)));
    else if (a !== 4 && (a === 27 && pe(l.type) && ((e = l.stateNode), (t = null)), (l = l.child), l !== null))
      for (Nc(l, t, e), l = l.sibling; l !== null; ) (Nc(l, t, e), (l = l.sibling));
  }
  function pn(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6) ((l = l.stateNode), t ? e.insertBefore(l, t) : e.appendChild(l));
    else if (a !== 4 && (a === 27 && pe(l.type) && (e = l.stateNode), (l = l.child), l !== null))
      for (pn(l, t, e), l = l.sibling; l !== null; ) (pn(l, t, e), (l = l.sibling));
  }
  function ir(l) {
    var t = l.stateNode,
      e = l.memoizedProps;
    try {
      for (var a = l.type, u = t.attributes; u.length; ) t.removeAttributeNode(u[0]);
      (Ql(t, a, e), (t[Bl] = l), (t[$l] = e));
    } catch (n) {
      dl(l, l.return, n);
    }
  }
  var Jt = !1,
    Nl = !1,
    Cc = !1,
    cr = typeof WeakSet == 'function' ? WeakSet : Set,
    Rl = null;
  function Tm(l, t) {
    if (((l = l.containerInfo), (Ic = Xn), (l = bs(l)), _i(l))) {
      if ('selectionStart' in l) var e = { start: l.selectionStart, end: l.selectionEnd };
      else
        l: {
          e = ((e = l.ownerDocument) && e.defaultView) || window;
          var a = e.getSelection && e.getSelection();
          if (a && a.rangeCount !== 0) {
            e = a.anchorNode;
            var u = a.anchorOffset,
              n = a.focusNode;
            a = a.focusOffset;
            try {
              (e.nodeType, n.nodeType);
            } catch {
              e = null;
              break l;
            }
            var i = 0,
              c = -1,
              f = -1,
              h = 0,
              S = 0,
              _ = l,
              v = null;
            t: for (;;) {
              for (
                var g;
                _ !== e || (u !== 0 && _.nodeType !== 3) || (c = i + u),
                  _ !== n || (a !== 0 && _.nodeType !== 3) || (f = i + a),
                  _.nodeType === 3 && (i += _.nodeValue.length),
                  (g = _.firstChild) !== null;
              )
                ((v = _), (_ = g));
              for (;;) {
                if (_ === l) break t;
                if ((v === e && ++h === u && (c = i), v === n && ++S === a && (f = i), (g = _.nextSibling) !== null))
                  break;
                ((_ = v), (v = _.parentNode));
              }
              _ = g;
            }
            e = c === -1 || f === -1 ? null : { start: c, end: f };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Pc = { focusedElem: l, selectionRange: e }, Xn = !1, Rl = t; Rl !== null; )
      if (((t = Rl), (l = t.child), (t.subtreeFlags & 1028) !== 0 && l !== null)) ((l.return = t), (Rl = l));
      else
        for (; Rl !== null; ) {
          switch (((t = Rl), (n = t.alternate), (l = t.flags), t.tag)) {
            case 0:
              if ((l & 4) !== 0 && ((l = t.updateQueue), (l = l !== null ? l.events : null), l !== null))
                for (e = 0; e < l.length; e++) ((u = l[e]), (u.ref.impl = u.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && n !== null) {
                ((l = void 0), (e = t), (u = n.memoizedProps), (n = n.memoizedState), (a = e.stateNode));
                try {
                  var R = Ve(e.type, u);
                  ((l = a.getSnapshotBeforeUpdate(R, n)), (a.__reactInternalSnapshotBeforeUpdate = l));
                } catch (X) {
                  dl(e, e.return, X);
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (((l = t.stateNode.containerInfo), (e = l.nodeType), e === 9)) ef(l);
                else if (e === 1)
                  switch (l.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      ef(l);
                      break;
                    default:
                      l.textContent = '';
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) throw Error(s(163));
          }
          if (((l = t.sibling), l !== null)) {
            ((l.return = t.return), (Rl = l));
            break;
          }
          Rl = t.return;
        }
  }
  function fr(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (kt(l, e), a & 4 && iu(5, e));
        break;
      case 1:
        if ((kt(l, e), a & 4))
          if (((l = e.stateNode), t === null))
            try {
              l.componentDidMount();
            } catch (i) {
              dl(e, e.return, i);
            }
          else {
            var u = Ve(e.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              l.componentDidUpdate(u, t, l.__reactInternalSnapshotBeforeUpdate);
            } catch (i) {
              dl(e, e.return, i);
            }
          }
        (a & 64 && er(e), a & 512 && cu(e, e.return));
        break;
      case 3:
        if ((kt(l, e), a & 64 && ((l = e.updateQueue), l !== null))) {
          if (((t = null), e.child !== null))
            switch (e.child.tag) {
              case 27:
              case 5:
                t = e.child.stateNode;
                break;
              case 1:
                t = e.child.stateNode;
            }
          try {
            Ks(l, t);
          } catch (i) {
            dl(e, e.return, i);
          }
        }
        break;
      case 27:
        t === null && a & 4 && ir(e);
      case 26:
      case 5:
        (kt(l, e), t === null && a & 4 && ur(e), a & 512 && cu(e, e.return));
        break;
      case 12:
        kt(l, e);
        break;
      case 31:
        (kt(l, e), a & 4 && rr(l, e));
        break;
      case 13:
        (kt(l, e),
          a & 4 && dr(l, e),
          a & 64 &&
            ((l = e.memoizedState),
            l !== null && ((l = l.dehydrated), l !== null && ((e = Cm.bind(null, e)), Fm(l, e)))));
        break;
      case 22:
        if (((a = e.memoizedState !== null || Jt), !a)) {
          ((t = (t !== null && t.memoizedState !== null) || Nl), (u = Jt));
          var n = Nl;
          ((Jt = a), (Nl = t) && !n ? Wt(l, e, (e.subtreeFlags & 8772) !== 0) : kt(l, e), (Jt = u), (Nl = n));
        }
        break;
      case 30:
        break;
      default:
        kt(l, e);
    }
  }
  function sr(l) {
    var t = l.alternate;
    (t !== null && ((l.alternate = null), sr(t)),
      (l.child = null),
      (l.deletions = null),
      (l.sibling = null),
      l.tag === 5 && ((t = l.stateNode), t !== null && ci(t)),
      (l.stateNode = null),
      (l.return = null),
      (l.dependencies = null),
      (l.memoizedProps = null),
      (l.memoizedState = null),
      (l.pendingProps = null),
      (l.stateNode = null),
      (l.updateQueue = null));
  }
  var pl = null,
    Il = !1;
  function wt(l, t, e) {
    for (e = e.child; e !== null; ) (or(l, t, e), (e = e.sibling));
  }
  function or(l, t, e) {
    if (ut && typeof ut.onCommitFiberUnmount == 'function')
      try {
        ut.onCommitFiberUnmount(Ca, e);
      } catch {}
    switch (e.tag) {
      case 26:
        (Nl || Ut(e, t),
          wt(l, t, e),
          e.memoizedState ? e.memoizedState.count-- : e.stateNode && ((e = e.stateNode), e.parentNode.removeChild(e)));
        break;
      case 27:
        Nl || Ut(e, t);
        var a = pl,
          u = Il;
        (pe(e.type) && ((pl = e.stateNode), (Il = !1)), wt(l, t, e), vu(e.stateNode), (pl = a), (Il = u));
        break;
      case 5:
        Nl || Ut(e, t);
      case 6:
        if (((a = pl), (u = Il), (pl = null), wt(l, t, e), (pl = a), (Il = u), pl !== null))
          if (Il)
            try {
              (pl.nodeType === 9 ? pl.body : pl.nodeName === 'HTML' ? pl.ownerDocument.body : pl).removeChild(
                e.stateNode
              );
            } catch (n) {
              dl(e, t, n);
            }
          else
            try {
              pl.removeChild(e.stateNode);
            } catch (n) {
              dl(e, t, n);
            }
        break;
      case 18:
        pl !== null &&
          (Il
            ? ((l = pl),
              e0(l.nodeType === 9 ? l.body : l.nodeName === 'HTML' ? l.ownerDocument.body : l, e.stateNode),
              Da(l))
            : e0(pl, e.stateNode));
        break;
      case 4:
        ((a = pl), (u = Il), (pl = e.stateNode.containerInfo), (Il = !0), wt(l, t, e), (pl = a), (Il = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (de(2, e, t), Nl || de(4, e, t), wt(l, t, e));
        break;
      case 1:
        (Nl || (Ut(e, t), (a = e.stateNode), typeof a.componentWillUnmount == 'function' && ar(e, t, a)), wt(l, t, e));
        break;
      case 21:
        wt(l, t, e);
        break;
      case 22:
        ((Nl = (a = Nl) || e.memoizedState !== null), wt(l, t, e), (Nl = a));
        break;
      default:
        wt(l, t, e);
    }
  }
  function rr(l, t) {
    if (t.memoizedState === null && ((l = t.alternate), l !== null && ((l = l.memoizedState), l !== null))) {
      l = l.dehydrated;
      try {
        Da(l);
      } catch (e) {
        dl(t, t.return, e);
      }
    }
  }
  function dr(l, t) {
    if (
      t.memoizedState === null &&
      ((l = t.alternate), l !== null && ((l = l.memoizedState), l !== null && ((l = l.dehydrated), l !== null)))
    )
      try {
        Da(l);
      } catch (e) {
        dl(t, t.return, e);
      }
  }
  function Em(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return (t === null && (t = l.stateNode = new cr()), t);
      case 22:
        return ((l = l.stateNode), (t = l._retryCache), t === null && (t = l._retryCache = new cr()), t);
      default:
        throw Error(s(435, l.tag));
    }
  }
  function Sn(l, t) {
    var e = Em(l);
    t.forEach(function (a) {
      if (!e.has(a)) {
        e.add(a);
        var u = Um.bind(null, l, a);
        a.then(u, u);
      }
    });
  }
  function Pl(l, t) {
    var e = t.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a],
          n = l,
          i = t,
          c = i;
        l: for (; c !== null; ) {
          switch (c.tag) {
            case 27:
              if (pe(c.type)) {
                ((pl = c.stateNode), (Il = !1));
                break l;
              }
              break;
            case 5:
              ((pl = c.stateNode), (Il = !1));
              break l;
            case 3:
            case 4:
              ((pl = c.stateNode.containerInfo), (Il = !0));
              break l;
          }
          c = c.return;
        }
        if (pl === null) throw Error(s(160));
        (or(n, i, u), (pl = null), (Il = !1), (n = u.alternate), n !== null && (n.return = null), (u.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (mr(t, l), (t = t.sibling));
  }
  var Ot = null;
  function mr(l, t) {
    var e = l.alternate,
      a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Pl(t, l), lt(l), a & 4 && (de(3, l, l.return), iu(3, l), de(5, l, l.return)));
        break;
      case 1:
        (Pl(t, l),
          lt(l),
          a & 512 && (Nl || e === null || Ut(e, e.return)),
          a & 64 &&
            Jt &&
            ((l = l.updateQueue),
            l !== null &&
              ((a = l.callbacks),
              a !== null &&
                ((e = l.shared.hiddenCallbacks), (l.shared.hiddenCallbacks = e === null ? a : e.concat(a))))));
        break;
      case 26:
        var u = Ot;
        if ((Pl(t, l), lt(l), a & 512 && (Nl || e === null || Ut(e, e.return)), a & 4)) {
          var n = e !== null ? e.memoizedState : null;
          if (((a = l.memoizedState), e === null))
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  ((a = l.type), (e = l.memoizedProps), (u = u.ownerDocument || u));
                  t: switch (a) {
                    case 'title':
                      ((n = u.getElementsByTagName('title')[0]),
                        (!n ||
                          n[Ra] ||
                          n[Bl] ||
                          n.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          n.hasAttribute('itemprop')) &&
                          ((n = u.createElement(a)), u.head.insertBefore(n, u.querySelector('head > title'))),
                        Ql(n, a, e),
                        (n[Bl] = l),
                        jl(n),
                        (a = n));
                      break l;
                    case 'link':
                      var i = m0('link', 'href', u).get(a + (e.href || ''));
                      if (i) {
                        for (var c = 0; c < i.length; c++)
                          if (
                            ((n = i[c]),
                            n.getAttribute('href') === (e.href == null || e.href === '' ? null : e.href) &&
                              n.getAttribute('rel') === (e.rel == null ? null : e.rel) &&
                              n.getAttribute('title') === (e.title == null ? null : e.title) &&
                              n.getAttribute('crossorigin') === (e.crossOrigin == null ? null : e.crossOrigin))
                          ) {
                            i.splice(c, 1);
                            break t;
                          }
                      }
                      ((n = u.createElement(a)), Ql(n, a, e), u.head.appendChild(n));
                      break;
                    case 'meta':
                      if ((i = m0('meta', 'content', u).get(a + (e.content || '')))) {
                        for (c = 0; c < i.length; c++)
                          if (
                            ((n = i[c]),
                            n.getAttribute('content') === (e.content == null ? null : '' + e.content) &&
                              n.getAttribute('name') === (e.name == null ? null : e.name) &&
                              n.getAttribute('property') === (e.property == null ? null : e.property) &&
                              n.getAttribute('http-equiv') === (e.httpEquiv == null ? null : e.httpEquiv) &&
                              n.getAttribute('charset') === (e.charSet == null ? null : e.charSet))
                          ) {
                            i.splice(c, 1);
                            break t;
                          }
                      }
                      ((n = u.createElement(a)), Ql(n, a, e), u.head.appendChild(n));
                      break;
                    default:
                      throw Error(s(468, a));
                  }
                  ((n[Bl] = l), jl(n), (a = n));
                }
                l.stateNode = a;
              } else y0(u, l.type, l.stateNode);
            else l.stateNode = d0(u, a, l.memoizedProps);
          else
            n !== a
              ? (n === null ? e.stateNode !== null && ((e = e.stateNode), e.parentNode.removeChild(e)) : n.count--,
                a === null ? y0(u, l.type, l.stateNode) : d0(u, a, l.memoizedProps))
              : a === null && l.stateNode !== null && Oc(l, l.memoizedProps, e.memoizedProps);
        }
        break;
      case 27:
        (Pl(t, l),
          lt(l),
          a & 512 && (Nl || e === null || Ut(e, e.return)),
          e !== null && a & 4 && Oc(l, l.memoizedProps, e.memoizedProps));
        break;
      case 5:
        if ((Pl(t, l), lt(l), a & 512 && (Nl || e === null || Ut(e, e.return)), l.flags & 32)) {
          u = l.stateNode;
          try {
            Ie(u, '');
          } catch (R) {
            dl(l, l.return, R);
          }
        }
        (a & 4 && l.stateNode != null && ((u = l.memoizedProps), Oc(l, u, e !== null ? e.memoizedProps : u)),
          a & 1024 && (Cc = !0));
        break;
      case 6:
        if ((Pl(t, l), lt(l), a & 4)) {
          if (l.stateNode === null) throw Error(s(162));
          ((a = l.memoizedProps), (e = l.stateNode));
          try {
            e.nodeValue = a;
          } catch (R) {
            dl(l, l.return, R);
          }
        }
        break;
      case 3:
        if (
          ((qn = null),
          (u = Ot),
          (Ot = Rn(t.containerInfo)),
          Pl(t, l),
          (Ot = u),
          lt(l),
          a & 4 && e !== null && e.memoizedState.isDehydrated)
        )
          try {
            Da(t.containerInfo);
          } catch (R) {
            dl(l, l.return, R);
          }
        Cc && ((Cc = !1), yr(l));
        break;
      case 4:
        ((a = Ot), (Ot = Rn(l.stateNode.containerInfo)), Pl(t, l), lt(l), (Ot = a));
        break;
      case 12:
        (Pl(t, l), lt(l));
        break;
      case 31:
        (Pl(t, l), lt(l), a & 4 && ((a = l.updateQueue), a !== null && ((l.updateQueue = null), Sn(l, a))));
        break;
      case 13:
        (Pl(t, l),
          lt(l),
          l.child.flags & 8192 && (l.memoizedState !== null) != (e !== null && e.memoizedState !== null) && (Tn = at()),
          a & 4 && ((a = l.updateQueue), a !== null && ((l.updateQueue = null), Sn(l, a))));
        break;
      case 22:
        u = l.memoizedState !== null;
        var f = e !== null && e.memoizedState !== null,
          h = Jt,
          S = Nl;
        if (((Jt = h || u), (Nl = S || f), Pl(t, l), (Nl = S), (Jt = h), lt(l), a & 8192))
          l: for (
            t = l.stateNode,
              t._visibility = u ? t._visibility & -2 : t._visibility | 1,
              u && (e === null || f || Jt || Nl || Ze(l)),
              e = null,
              t = l;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (e === null) {
                f = e = t;
                try {
                  if (((n = f.stateNode), u))
                    ((i = n.style),
                      typeof i.setProperty == 'function'
                        ? i.setProperty('display', 'none', 'important')
                        : (i.display = 'none'));
                  else {
                    c = f.stateNode;
                    var _ = f.memoizedProps.style,
                      v = _ != null && _.hasOwnProperty('display') ? _.display : null;
                    c.style.display = v == null || typeof v == 'boolean' ? '' : ('' + v).trim();
                  }
                } catch (R) {
                  dl(f, f.return, R);
                }
              }
            } else if (t.tag === 6) {
              if (e === null) {
                f = t;
                try {
                  f.stateNode.nodeValue = u ? '' : f.memoizedProps;
                } catch (R) {
                  dl(f, f.return, R);
                }
              }
            } else if (t.tag === 18) {
              if (e === null) {
                f = t;
                try {
                  var g = f.stateNode;
                  u ? a0(g, !0) : a0(f.stateNode, !1);
                } catch (R) {
                  dl(f, f.return, R);
                }
              }
            } else if (((t.tag !== 22 && t.tag !== 23) || t.memoizedState === null || t === l) && t.child !== null) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l) break l;
              (e === t && (e = null), (t = t.return));
            }
            (e === t && (e = null), (t.sibling.return = t.return), (t = t.sibling));
          }
        a & 4 &&
          ((a = l.updateQueue), a !== null && ((e = a.retryQueue), e !== null && ((a.retryQueue = null), Sn(l, e))));
        break;
      case 19:
        (Pl(t, l), lt(l), a & 4 && ((a = l.updateQueue), a !== null && ((l.updateQueue = null), Sn(l, a))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Pl(t, l), lt(l));
    }
  }
  function lt(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if (nr(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(s(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode,
              n = Dc(l);
            pn(l, n, u);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (Ie(i, ''), (e.flags &= -33));
            var c = Dc(l);
            pn(l, c, i);
            break;
          case 3:
          case 4:
            var f = e.stateNode.containerInfo,
              h = Dc(l);
            Nc(l, h, f);
            break;
          default:
            throw Error(s(161));
        }
      } catch (S) {
        dl(l, l.return, S);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function yr(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        (yr(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (l = l.sibling));
      }
  }
  function kt(l, t) {
    if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) (fr(l, t.alternate, t), (t = t.sibling));
  }
  function Ze(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (de(4, t, t.return), Ze(t));
          break;
        case 1:
          Ut(t, t.return);
          var e = t.stateNode;
          (typeof e.componentWillUnmount == 'function' && ar(t, t.return, e), Ze(t));
          break;
        case 27:
          vu(t.stateNode);
        case 26:
        case 5:
          (Ut(t, t.return), Ze(t));
          break;
        case 22:
          t.memoizedState === null && Ze(t);
          break;
        case 30:
          Ze(t);
          break;
        default:
          Ze(t);
      }
      l = l.sibling;
    }
  }
  function Wt(l, t, e) {
    for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate,
        u = l,
        n = t,
        i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          (Wt(u, n, e), iu(4, n));
          break;
        case 1:
          if ((Wt(u, n, e), (a = n), (u = a.stateNode), typeof u.componentDidMount == 'function'))
            try {
              u.componentDidMount();
            } catch (h) {
              dl(a, a.return, h);
            }
          if (((a = n), (u = a.updateQueue), u !== null)) {
            var c = a.stateNode;
            try {
              var f = u.shared.hiddenCallbacks;
              if (f !== null) for (u.shared.hiddenCallbacks = null, u = 0; u < f.length; u++) Ls(f[u], c);
            } catch (h) {
              dl(a, a.return, h);
            }
          }
          (e && i & 64 && er(n), cu(n, n.return));
          break;
        case 27:
          ir(n);
        case 26:
        case 5:
          (Wt(u, n, e), e && a === null && i & 4 && ur(n), cu(n, n.return));
          break;
        case 12:
          Wt(u, n, e);
          break;
        case 31:
          (Wt(u, n, e), e && i & 4 && rr(u, n));
          break;
        case 13:
          (Wt(u, n, e), e && i & 4 && dr(u, n));
          break;
        case 22:
          (n.memoizedState === null && Wt(u, n, e), cu(n, n.return));
          break;
        case 30:
          break;
        default:
          Wt(u, n, e);
      }
      t = t.sibling;
    }
  }
  function Uc(l, t) {
    var e = null;
    (l !== null &&
      l.memoizedState !== null &&
      l.memoizedState.cachePool !== null &&
      (e = l.memoizedState.cachePool.pool),
      (l = null),
      t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool),
      l !== e && (l != null && l.refCount++, e != null && wa(e)));
  }
  function jc(l, t) {
    ((l = null),
      t.alternate !== null && (l = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== l && (t.refCount++, l != null && wa(l)));
  }
  function Dt(l, t, e, a) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (hr(l, t, e, a), (t = t.sibling));
  }
  function hr(l, t, e, a) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Dt(l, t, e, a), u & 2048 && iu(9, t));
        break;
      case 1:
        Dt(l, t, e, a);
        break;
      case 3:
        (Dt(l, t, e, a),
          u & 2048 &&
            ((l = null),
            t.alternate !== null && (l = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== l && (t.refCount++, l != null && wa(l))));
        break;
      case 12:
        if (u & 2048) {
          (Dt(l, t, e, a), (l = t.stateNode));
          try {
            var n = t.memoizedProps,
              i = n.id,
              c = n.onPostCommit;
            typeof c == 'function' && c(i, t.alternate === null ? 'mount' : 'update', l.passiveEffectDuration, -0);
          } catch (f) {
            dl(t, t.return, f);
          }
        } else Dt(l, t, e, a);
        break;
      case 31:
        Dt(l, t, e, a);
        break;
      case 13:
        Dt(l, t, e, a);
        break;
      case 23:
        break;
      case 22:
        ((n = t.stateNode),
          (i = t.alternate),
          t.memoizedState !== null
            ? n._visibility & 2
              ? Dt(l, t, e, a)
              : fu(l, t)
            : n._visibility & 2
              ? Dt(l, t, e, a)
              : ((n._visibility |= 2), ba(l, t, e, a, (t.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && Uc(i, t));
        break;
      case 24:
        (Dt(l, t, e, a), u & 2048 && jc(t.alternate, t));
        break;
      default:
        Dt(l, t, e, a);
    }
  }
  function ba(l, t, e, a, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var n = l,
        i = t,
        c = e,
        f = a,
        h = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (ba(n, i, c, f, u), iu(8, i));
          break;
        case 23:
          break;
        case 22:
          var S = i.stateNode;
          (i.memoizedState !== null
            ? S._visibility & 2
              ? ba(n, i, c, f, u)
              : fu(n, i)
            : ((S._visibility |= 2), ba(n, i, c, f, u)),
            u && h & 2048 && Uc(i.alternate, i));
          break;
        case 24:
          (ba(n, i, c, f, u), u && h & 2048 && jc(i.alternate, i));
          break;
        default:
          ba(n, i, c, f, u);
      }
      t = t.sibling;
    }
  }
  function fu(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var e = l,
          a = t,
          u = a.flags;
        switch (a.tag) {
          case 22:
            (fu(e, a), u & 2048 && Uc(a.alternate, a));
            break;
          case 24:
            (fu(e, a), u & 2048 && jc(a.alternate, a));
            break;
          default:
            fu(e, a);
        }
        t = t.sibling;
      }
  }
  var su = 8192;
  function pa(l, t, e) {
    if (l.subtreeFlags & su) for (l = l.child; l !== null; ) (vr(l, t, e), (l = l.sibling));
  }
  function vr(l, t, e) {
    switch (l.tag) {
      case 26:
        (pa(l, t, e), l.flags & su && l.memoizedState !== null && s1(e, Ot, l.memoizedState, l.memoizedProps));
        break;
      case 5:
        pa(l, t, e);
        break;
      case 3:
      case 4:
        var a = Ot;
        ((Ot = Rn(l.stateNode.containerInfo)), pa(l, t, e), (Ot = a));
        break;
      case 22:
        l.memoizedState === null &&
          ((a = l.alternate),
          a !== null && a.memoizedState !== null ? ((a = su), (su = 16777216), pa(l, t, e), (su = a)) : pa(l, t, e));
        break;
      default:
        pa(l, t, e);
    }
  }
  function gr(l) {
    var t = l.alternate;
    if (t !== null && ((l = t.child), l !== null)) {
      t.child = null;
      do ((t = l.sibling), (l.sibling = null), (l = t));
      while (l !== null);
    }
  }
  function ou(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          ((Rl = a), pr(a, l));
        }
      gr(l);
    }
    if (l.subtreeFlags & 10256) for (l = l.child; l !== null; ) (br(l), (l = l.sibling));
  }
  function br(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (ou(l), l.flags & 2048 && de(9, l, l.return));
        break;
      case 3:
        ou(l);
        break;
      case 12:
        ou(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13)
          ? ((t._visibility &= -3), zn(l))
          : ou(l);
        break;
      default:
        ou(l);
    }
  }
  function zn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          ((Rl = a), pr(a, l));
        }
      gr(l);
    }
    for (l = l.child; l !== null; ) {
      switch (((t = l), t.tag)) {
        case 0:
        case 11:
        case 15:
          (de(8, t, t.return), zn(t));
          break;
        case 22:
          ((e = t.stateNode), e._visibility & 2 && ((e._visibility &= -3), zn(t)));
          break;
        default:
          zn(t);
      }
      l = l.sibling;
    }
  }
  function pr(l, t) {
    for (; Rl !== null; ) {
      var e = Rl;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          de(8, e, t);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          wa(e.memoizedState.cache);
      }
      if (((a = e.child), a !== null)) ((a.return = e), (Rl = a));
      else
        l: for (e = l; Rl !== null; ) {
          a = Rl;
          var u = a.sibling,
            n = a.return;
          if ((sr(a), a === e)) {
            Rl = null;
            break l;
          }
          if (u !== null) {
            ((u.return = n), (Rl = u));
            break l;
          }
          Rl = n;
        }
    }
  }
  var _m = {
      getCacheForType: function (l) {
        var t = Gl(Ml),
          e = t.data.get(l);
        return (e === void 0 && ((e = l()), t.data.set(l, e)), e);
      },
      cacheSignal: function () {
        return Gl(Ml).controller.signal;
      },
    },
    Am = typeof WeakMap == 'function' ? WeakMap : Map,
    il = 0,
    vl = null,
    I = null,
    tl = 0,
    rl = 0,
    ot = null,
    me = !1,
    Sa = !1,
    Rc = !1,
    $t = 0,
    Tl = 0,
    ye = 0,
    Le = 0,
    Hc = 0,
    rt = 0,
    za = 0,
    ru = null,
    tt = null,
    qc = !1,
    Tn = 0,
    Sr = 0,
    En = 1 / 0,
    _n = null,
    he = null,
    Cl = 0,
    ve = null,
    Ta = null,
    Ft = 0,
    Bc = 0,
    Yc = null,
    zr = null,
    du = 0,
    Gc = null;
  function dt() {
    return (il & 2) !== 0 && tl !== 0 ? tl & -tl : z.T !== null ? Kc() : qf();
  }
  function Tr() {
    if (rt === 0)
      if ((tl & 536870912) === 0 || al) {
        var l = Cu;
        ((Cu <<= 1), (Cu & 3932160) === 0 && (Cu = 262144), (rt = l));
      } else rt = 536870912;
    return ((l = ft.current), l !== null && (l.flags |= 32), rt);
  }
  function et(l, t, e) {
    (((l === vl && (rl === 2 || rl === 9)) || l.cancelPendingCommit !== null) && (Ea(l, 0), ge(l, tl, rt, !1)),
      ja(l, e),
      ((il & 2) === 0 || l !== vl) &&
        (l === vl && ((il & 2) === 0 && (Le |= e), Tl === 4 && ge(l, tl, rt, !1)), jt(l)));
  }
  function Er(l, t, e) {
    if ((il & 6) !== 0) throw Error(s(327));
    var a = (!e && (t & 127) === 0 && (t & l.expiredLanes) === 0) || Ua(l, t),
      u = a ? Om(l, t) : Qc(l, t, !0),
      n = a;
    do {
      if (u === 0) {
        Sa && !a && ge(l, t, 0, !1);
        break;
      } else {
        if (((e = l.current.alternate), n && !xm(e))) {
          ((u = Qc(l, t, !1)), (n = !1));
          continue;
        }
        if (u === 2) {
          if (((n = t), l.errorRecoveryDisabledLanes & n)) var i = 0;
          else ((i = l.pendingLanes & -536870913), (i = i !== 0 ? i : i & 536870912 ? 536870912 : 0));
          if (i !== 0) {
            t = i;
            l: {
              var c = l;
              u = ru;
              var f = c.current.memoizedState.isDehydrated;
              if ((f && (Ea(c, i).flags |= 256), (i = Qc(c, i, !1)), i !== 2)) {
                if (Rc && !f) {
                  ((c.errorRecoveryDisabledLanes |= n), (Le |= n), (u = 4));
                  break l;
                }
                ((n = tt), (tt = u), n !== null && (tt === null ? (tt = n) : tt.push.apply(tt, n)));
              }
              u = i;
            }
            if (((n = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (Ea(l, 0), ge(l, t, 0, !0));
          break;
        }
        l: {
          switch (((a = l), (n = u), n)) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ge(a, t, rt, !me);
              break l;
            case 2:
              tt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && ((u = Tn + 300 - at()), 10 < u)) {
            if ((ge(a, t, rt, !me), ju(a, 0, !0) !== 0)) break l;
            ((Ft = t),
              (a.timeoutHandle = l0(_r.bind(null, a, e, tt, _n, qc, t, rt, Le, za, me, n, 'Throttled', -0, 0), u)));
            break l;
          }
          _r(a, e, tt, _n, qc, t, rt, Le, za, me, n, null, -0, 0);
        }
      }
      break;
    } while (!0);
    jt(l);
  }
  function _r(l, t, e, a, u, n, i, c, f, h, S, _, v, g) {
    if (((l.timeoutHandle = -1), (_ = t.subtreeFlags), _ & 8192 || (_ & 16785408) === 16785408)) {
      ((_ = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: qt,
      }),
        vr(t, n, _));
      var R = (n & 62914560) === n ? Tn - at() : (n & 4194048) === n ? Sr - at() : 0;
      if (((R = o1(_, R)), R !== null)) {
        ((Ft = n),
          (l.cancelPendingCommit = R(Ur.bind(null, l, t, n, e, a, u, i, c, f, S, _, null, v, g))),
          ge(l, n, i, !h));
        return;
      }
    }
    Ur(l, t, n, e, a, u, i, c, f);
  }
  function xm(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if (
        (e === 0 || e === 11 || e === 15) &&
        t.flags & 16384 &&
        ((e = t.updateQueue), e !== null && ((e = e.stores), e !== null))
      )
        for (var a = 0; a < e.length; a++) {
          var u = e[a],
            n = u.getSnapshot;
          u = u.value;
          try {
            if (!it(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((e = t.child), t.subtreeFlags & 16384 && e !== null)) ((e.return = t), (t = e));
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function ge(l, t, e, a) {
    ((t &= ~Hc),
      (t &= ~Le),
      (l.suspendedLanes |= t),
      (l.pingedLanes &= ~t),
      a && (l.warmLanes |= t),
      (a = l.expirationTimes));
    for (var u = t; 0 < u; ) {
      var n = 31 - nt(u),
        i = 1 << n;
      ((a[n] = -1), (u &= ~i));
    }
    e !== 0 && jf(l, e, t);
  }
  function An() {
    return (il & 6) === 0 ? (mu(0), !1) : !0;
  }
  function Xc() {
    if (I !== null) {
      if (rl === 0) var l = I.return;
      else ((l = I), (Xt = He = null), ec(l), (ma = null), (Wa = 0), (l = I));
      for (; l !== null; ) (tr(l.alternate, l), (l = l.return));
      I = null;
    }
  }
  function Ea(l, t) {
    var e = l.timeoutHandle;
    (e !== -1 && ((l.timeoutHandle = -1), Jm(e)),
      (e = l.cancelPendingCommit),
      e !== null && ((l.cancelPendingCommit = null), e()),
      (Ft = 0),
      Xc(),
      (vl = l),
      (I = e = Yt(l.current, null)),
      (tl = t),
      (rl = 0),
      (ot = null),
      (me = !1),
      (Sa = Ua(l, t)),
      (Rc = !1),
      (za = rt = Hc = Le = ye = Tl = 0),
      (tt = ru = null),
      (qc = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var u = 31 - nt(a),
          n = 1 << u;
        ((t |= l[u]), (a &= ~n));
      }
    return (($t = t), Ku(), e);
  }
  function Ar(l, t) {
    ((k = null),
      (z.H = au),
      t === da || t === Pu
        ? ((t = Xs()), (rl = 3))
        : t === Li
          ? ((t = Xs()), (rl = 4))
          : (rl = t === bc ? 8 : t !== null && typeof t == 'object' && typeof t.then == 'function' ? 6 : 1),
      (ot = t),
      I === null && ((Tl = 1), yn(l, bt(t, l.current))));
  }
  function xr() {
    var l = ft.current;
    return l === null
      ? !0
      : (tl & 4194048) === tl
        ? Tt === null
        : (tl & 62914560) === tl || (tl & 536870912) !== 0
          ? l === Tt
          : !1;
  }
  function Mr() {
    var l = z.H;
    return ((z.H = au), l === null ? au : l);
  }
  function Or() {
    var l = z.A;
    return ((z.A = _m), l);
  }
  function xn() {
    ((Tl = 4),
      me || ((tl & 4194048) !== tl && ft.current !== null) || (Sa = !0),
      ((ye & 134217727) === 0 && (Le & 134217727) === 0) || vl === null || ge(vl, tl, rt, !1));
  }
  function Qc(l, t, e) {
    var a = il;
    il |= 2;
    var u = Mr(),
      n = Or();
    ((vl !== l || tl !== t) && ((_n = null), Ea(l, t)), (t = !1));
    var i = Tl;
    l: do
      try {
        if (rl !== 0 && I !== null) {
          var c = I,
            f = ot;
          switch (rl) {
            case 8:
              (Xc(), (i = 6));
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              ft.current === null && (t = !0);
              var h = rl;
              if (((rl = 0), (ot = null), _a(l, c, f, h), e && Sa)) {
                i = 0;
                break l;
              }
              break;
            default:
              ((h = rl), (rl = 0), (ot = null), _a(l, c, f, h));
          }
        }
        (Mm(), (i = Tl));
        break;
      } catch (S) {
        Ar(l, S);
      }
    while (!0);
    return (
      t && l.shellSuspendCounter++,
      (Xt = He = null),
      (il = a),
      (z.H = u),
      (z.A = n),
      I === null && ((vl = null), (tl = 0), Ku()),
      i
    );
  }
  function Mm() {
    for (; I !== null; ) Dr(I);
  }
  function Om(l, t) {
    var e = il;
    il |= 2;
    var a = Mr(),
      u = Or();
    vl !== l || tl !== t ? ((_n = null), (En = at() + 500), Ea(l, t)) : (Sa = Ua(l, t));
    l: do
      try {
        if (rl !== 0 && I !== null) {
          t = I;
          var n = ot;
          t: switch (rl) {
            case 1:
              ((rl = 0), (ot = null), _a(l, t, n, 1));
              break;
            case 2:
            case 9:
              if (Ys(n)) {
                ((rl = 0), (ot = null), Nr(t));
                break;
              }
              ((t = function () {
                ((rl !== 2 && rl !== 9) || vl !== l || (rl = 7), jt(l));
              }),
                n.then(t, t));
              break l;
            case 3:
              rl = 7;
              break l;
            case 4:
              rl = 5;
              break l;
            case 7:
              Ys(n) ? ((rl = 0), (ot = null), Nr(t)) : ((rl = 0), (ot = null), _a(l, t, n, 7));
              break;
            case 5:
              var i = null;
              switch (I.tag) {
                case 26:
                  i = I.memoizedState;
                case 5:
                case 27:
                  var c = I;
                  if (i ? h0(i) : c.stateNode.complete) {
                    ((rl = 0), (ot = null));
                    var f = c.sibling;
                    if (f !== null) I = f;
                    else {
                      var h = c.return;
                      h !== null ? ((I = h), Mn(h)) : (I = null);
                    }
                    break t;
                  }
              }
              ((rl = 0), (ot = null), _a(l, t, n, 5));
              break;
            case 6:
              ((rl = 0), (ot = null), _a(l, t, n, 6));
              break;
            case 8:
              (Xc(), (Tl = 6));
              break l;
            default:
              throw Error(s(462));
          }
        }
        Dm();
        break;
      } catch (S) {
        Ar(l, S);
      }
    while (!0);
    return ((Xt = He = null), (z.H = a), (z.A = u), (il = e), I !== null ? 0 : ((vl = null), (tl = 0), Ku(), Tl));
  }
  function Dm() {
    for (; I !== null && !I0(); ) Dr(I);
  }
  function Dr(l) {
    var t = Po(l.alternate, l, $t);
    ((l.memoizedProps = l.pendingProps), t === null ? Mn(l) : (I = t));
  }
  function Nr(l) {
    var t = l,
      e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = wo(e, t, t.pendingProps, t.type, void 0, tl);
        break;
      case 11:
        t = wo(e, t, t.pendingProps, t.type.render, t.ref, tl);
        break;
      case 5:
        ec(t);
      default:
        (tr(e, t), (t = I = Ms(t, $t)), (t = Po(e, t, $t)));
    }
    ((l.memoizedProps = l.pendingProps), t === null ? Mn(l) : (I = t));
  }
  function _a(l, t, e, a) {
    ((Xt = He = null), ec(t), (ma = null), (Wa = 0));
    var u = t.return;
    try {
      if (gm(l, u, t, e, tl)) {
        ((Tl = 1), yn(l, bt(e, l.current)), (I = null));
        return;
      }
    } catch (n) {
      if (u !== null) throw ((I = u), n);
      ((Tl = 1), yn(l, bt(e, l.current)), (I = null));
      return;
    }
    t.flags & 32768
      ? (al || a === 1
          ? (l = !0)
          : Sa || (tl & 536870912) !== 0
            ? (l = !1)
            : ((me = l = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = ft.current), a !== null && a.tag === 13 && (a.flags |= 16384))),
        Cr(t, l))
      : Mn(t);
  }
  function Mn(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        Cr(t, me);
        return;
      }
      l = t.return;
      var e = Sm(t.alternate, t, $t);
      if (e !== null) {
        I = e;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        I = t;
        return;
      }
      I = t = l;
    } while (t !== null);
    Tl === 0 && (Tl = 5);
  }
  function Cr(l, t) {
    do {
      var e = zm(l.alternate, l);
      if (e !== null) {
        ((e.flags &= 32767), (I = e));
        return;
      }
      if (
        ((e = l.return),
        e !== null && ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null)),
        !t && ((l = l.sibling), l !== null))
      ) {
        I = l;
        return;
      }
      I = l = e;
    } while (l !== null);
    ((Tl = 6), (I = null));
  }
  function Ur(l, t, e, a, u, n, i, c, f) {
    l.cancelPendingCommit = null;
    do On();
    while (Cl !== 0);
    if ((il & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === l.current) throw Error(s(177));
      if (
        ((n = t.lanes | t.childLanes),
        (n |= Di),
        fd(l, e, n, i, c, f),
        l === vl && ((I = vl = null), (tl = 0)),
        (Ta = t),
        (ve = l),
        (Ft = e),
        (Bc = n),
        (Yc = u),
        (zr = a),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((l.callbackNode = null),
            (l.callbackPriority = 0),
            jm(Du, function () {
              return (Br(), null);
            }))
          : ((l.callbackNode = null), (l.callbackPriority = 0)),
        (a = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || a)
      ) {
        ((a = z.T), (z.T = null), (u = N.p), (N.p = 2), (i = il), (il |= 4));
        try {
          Tm(l, t, e);
        } finally {
          ((il = i), (N.p = u), (z.T = a));
        }
      }
      ((Cl = 1), jr(), Rr(), Hr());
    }
  }
  function jr() {
    if (Cl === 1) {
      Cl = 0;
      var l = ve,
        t = Ta,
        e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        ((e = z.T), (z.T = null));
        var a = N.p;
        N.p = 2;
        var u = il;
        il |= 4;
        try {
          mr(t, l);
          var n = Pc,
            i = bs(l.containerInfo),
            c = n.focusedElem,
            f = n.selectionRange;
          if (i !== c && c && c.ownerDocument && gs(c.ownerDocument.documentElement, c)) {
            if (f !== null && _i(c)) {
              var h = f.start,
                S = f.end;
              if ((S === void 0 && (S = h), 'selectionStart' in c))
                ((c.selectionStart = h), (c.selectionEnd = Math.min(S, c.value.length)));
              else {
                var _ = c.ownerDocument || document,
                  v = (_ && _.defaultView) || window;
                if (v.getSelection) {
                  var g = v.getSelection(),
                    R = c.textContent.length,
                    X = Math.min(f.start, R),
                    hl = f.end === void 0 ? X : Math.min(f.end, R);
                  !g.extend && X > hl && ((i = hl), (hl = X), (X = i));
                  var m = vs(c, X),
                    o = vs(c, hl);
                  if (
                    m &&
                    o &&
                    (g.rangeCount !== 1 ||
                      g.anchorNode !== m.node ||
                      g.anchorOffset !== m.offset ||
                      g.focusNode !== o.node ||
                      g.focusOffset !== o.offset)
                  ) {
                    var y = _.createRange();
                    (y.setStart(m.node, m.offset),
                      g.removeAllRanges(),
                      X > hl
                        ? (g.addRange(y), g.extend(o.node, o.offset))
                        : (y.setEnd(o.node, o.offset), g.addRange(y)));
                  }
                }
              }
            }
            for (_ = [], g = c; (g = g.parentNode); )
              g.nodeType === 1 && _.push({ element: g, left: g.scrollLeft, top: g.scrollTop });
            for (typeof c.focus == 'function' && c.focus(), c = 0; c < _.length; c++) {
              var E = _[c];
              ((E.element.scrollLeft = E.left), (E.element.scrollTop = E.top));
            }
          }
          ((Xn = !!Ic), (Pc = Ic = null));
        } finally {
          ((il = u), (N.p = a), (z.T = e));
        }
      }
      ((l.current = t), (Cl = 2));
    }
  }
  function Rr() {
    if (Cl === 2) {
      Cl = 0;
      var l = ve,
        t = Ta,
        e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        ((e = z.T), (z.T = null));
        var a = N.p;
        N.p = 2;
        var u = il;
        il |= 4;
        try {
          fr(l, t.alternate, t);
        } finally {
          ((il = u), (N.p = a), (z.T = e));
        }
      }
      Cl = 3;
    }
  }
  function Hr() {
    if (Cl === 4 || Cl === 3) {
      ((Cl = 0), P0());
      var l = ve,
        t = Ta,
        e = Ft,
        a = zr;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Cl = 5)
        : ((Cl = 0), (Ta = ve = null), qr(l, l.pendingLanes));
      var u = l.pendingLanes;
      if ((u === 0 && (he = null), ni(e), (t = t.stateNode), ut && typeof ut.onCommitFiberRoot == 'function'))
        try {
          ut.onCommitFiberRoot(Ca, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        ((t = z.T), (u = N.p), (N.p = 2), (z.T = null));
        try {
          for (var n = l.onRecoverableError, i = 0; i < a.length; i++) {
            var c = a[i];
            n(c.value, { componentStack: c.stack });
          }
        } finally {
          ((z.T = t), (N.p = u));
        }
      }
      ((Ft & 3) !== 0 && On(),
        jt(l),
        (u = l.pendingLanes),
        (e & 261930) !== 0 && (u & 42) !== 0 ? (l === Gc ? du++ : ((du = 0), (Gc = l))) : (du = 0),
        mu(0));
    }
  }
  function qr(l, t) {
    (l.pooledCacheLanes &= t) === 0 && ((t = l.pooledCache), t != null && ((l.pooledCache = null), wa(t)));
  }
  function On() {
    return (jr(), Rr(), Hr(), Br());
  }
  function Br() {
    if (Cl !== 5) return !1;
    var l = ve,
      t = Bc;
    Bc = 0;
    var e = ni(Ft),
      a = z.T,
      u = N.p;
    try {
      ((N.p = 32 > e ? 32 : e), (z.T = null), (e = Yc), (Yc = null));
      var n = ve,
        i = Ft;
      if (((Cl = 0), (Ta = ve = null), (Ft = 0), (il & 6) !== 0)) throw Error(s(331));
      var c = il;
      if (
        ((il |= 4),
        br(n.current),
        hr(n, n.current, i, e),
        (il = c),
        mu(0, !1),
        ut && typeof ut.onPostCommitFiberRoot == 'function')
      )
        try {
          ut.onPostCommitFiberRoot(Ca, n);
        } catch {}
      return !0;
    } finally {
      ((N.p = u), (z.T = a), qr(l, t));
    }
  }
  function Yr(l, t, e) {
    ((t = bt(e, t)), (t = gc(l.stateNode, t, 2)), (l = se(l, t, 2)), l !== null && (ja(l, 2), jt(l)));
  }
  function dl(l, t, e) {
    if (l.tag === 3) Yr(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Yr(t, l, e);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof a.componentDidCatch == 'function' && (he === null || !he.has(a)))
          ) {
            ((l = bt(e, l)), (e = Go(2)), (a = se(t, e, 2)), a !== null && (Xo(e, a, t, l), ja(a, 2), jt(a)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Vc(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new Am();
      var u = new Set();
      a.set(t, u);
    } else ((u = a.get(t)), u === void 0 && ((u = new Set()), a.set(t, u)));
    u.has(e) || ((Rc = !0), u.add(e), (l = Nm.bind(null, l, t, e)), t.then(l, l));
  }
  function Nm(l, t, e) {
    var a = l.pingCache;
    (a !== null && a.delete(t),
      (l.pingedLanes |= l.suspendedLanes & e),
      (l.warmLanes &= ~e),
      vl === l &&
        (tl & e) === e &&
        (Tl === 4 || (Tl === 3 && (tl & 62914560) === tl && 300 > at() - Tn) ? (il & 2) === 0 && Ea(l, 0) : (Hc |= e),
        za === tl && (za = 0)),
      jt(l));
  }
  function Gr(l, t) {
    (t === 0 && (t = Uf()), (l = Ue(l, t)), l !== null && (ja(l, t), jt(l)));
  }
  function Cm(l) {
    var t = l.memoizedState,
      e = 0;
    (t !== null && (e = t.retryLane), Gr(l, e));
  }
  function Um(l, t) {
    var e = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var a = l.stateNode,
          u = l.memoizedState;
        u !== null && (e = u.retryLane);
        break;
      case 19:
        a = l.stateNode;
        break;
      case 22:
        a = l.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    (a !== null && a.delete(t), Gr(l, e));
  }
  function jm(l, t) {
    return ti(l, t);
  }
  var Dn = null,
    Aa = null,
    Zc = !1,
    Nn = !1,
    Lc = !1,
    be = 0;
  function jt(l) {
    (l !== Aa && l.next === null && (Aa === null ? (Dn = Aa = l) : (Aa = Aa.next = l)),
      (Nn = !0),
      Zc || ((Zc = !0), Hm()));
  }
  function mu(l, t) {
    if (!Lc && Nn) {
      Lc = !0;
      do
        for (var e = !1, a = Dn; a !== null; ) {
          if (l !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes,
                c = a.pingedLanes;
              ((n = (1 << (31 - nt(42 | l) + 1)) - 1),
                (n &= u & ~(i & ~c)),
                (n = n & 201326741 ? (n & 201326741) | 1 : n ? n | 2 : 0));
            }
            n !== 0 && ((e = !0), Zr(a, n));
          } else
            ((n = tl),
              (n = ju(a, a === vl ? n : 0, a.cancelPendingCommit !== null || a.timeoutHandle !== -1)),
              (n & 3) === 0 || Ua(a, n) || ((e = !0), Zr(a, n)));
          a = a.next;
        }
      while (e);
      Lc = !1;
    }
  }
  function Rm() {
    Xr();
  }
  function Xr() {
    Nn = Zc = !1;
    var l = 0;
    be !== 0 && Km() && (l = be);
    for (var t = at(), e = null, a = Dn; a !== null; ) {
      var u = a.next,
        n = Qr(a, t);
      (n === 0
        ? ((a.next = null), e === null ? (Dn = u) : (e.next = u), u === null && (Aa = e))
        : ((e = a), (l !== 0 || (n & 3) !== 0) && (Nn = !0)),
        (a = u));
    }
    ((Cl !== 0 && Cl !== 5) || mu(l), be !== 0 && (be = 0));
  }
  function Qr(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, u = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - nt(n),
        c = 1 << i,
        f = u[i];
      (f === -1 ? ((c & e) === 0 || (c & a) !== 0) && (u[i] = cd(c, t)) : f <= t && (l.expiredLanes |= c), (n &= ~c));
    }
    if (
      ((t = vl),
      (e = tl),
      (e = ju(l, l === t ? e : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1)),
      (a = l.callbackNode),
      e === 0 || (l === t && (rl === 2 || rl === 9)) || l.cancelPendingCommit !== null)
    )
      return (a !== null && a !== null && ei(a), (l.callbackNode = null), (l.callbackPriority = 0));
    if ((e & 3) === 0 || Ua(l, e)) {
      if (((t = e & -e), t === l.callbackPriority)) return t;
      switch ((a !== null && ei(a), ni(e))) {
        case 2:
        case 8:
          e = Nf;
          break;
        case 32:
          e = Du;
          break;
        case 268435456:
          e = Cf;
          break;
        default:
          e = Du;
      }
      return ((a = Vr.bind(null, l)), (e = ti(e, a)), (l.callbackPriority = t), (l.callbackNode = e), t);
    }
    return (a !== null && a !== null && ei(a), (l.callbackPriority = 2), (l.callbackNode = null), 2);
  }
  function Vr(l, t) {
    if (Cl !== 0 && Cl !== 5) return ((l.callbackNode = null), (l.callbackPriority = 0), null);
    var e = l.callbackNode;
    if (On() && l.callbackNode !== e) return null;
    var a = tl;
    return (
      (a = ju(l, l === vl ? a : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1)),
      a === 0
        ? null
        : (Er(l, a, t), Qr(l, at()), l.callbackNode != null && l.callbackNode === e ? Vr.bind(null, l) : null)
    );
  }
  function Zr(l, t) {
    if (On()) return null;
    Er(l, t, !0);
  }
  function Hm() {
    wm(function () {
      (il & 6) !== 0 ? ti(Df, Rm) : Xr();
    });
  }
  function Kc() {
    if (be === 0) {
      var l = oa;
      (l === 0 && ((l = Nu), (Nu <<= 1), (Nu & 261888) === 0 && (Nu = 256)), (be = l));
    }
    return be;
  }
  function Lr(l) {
    return l == null || typeof l == 'symbol' || typeof l == 'boolean' ? null : typeof l == 'function' ? l : Bu('' + l);
  }
  function Kr(l, t) {
    var e = t.ownerDocument.createElement('input');
    return (
      (e.name = t.name),
      (e.value = t.value),
      l.id && e.setAttribute('form', l.id),
      t.parentNode.insertBefore(e, t),
      (l = new FormData(l)),
      e.parentNode.removeChild(e),
      l
    );
  }
  function qm(l, t, e, a, u) {
    if (t === 'submit' && e && e.stateNode === u) {
      var n = Lr((u[$l] || null).action),
        i = a.submitter;
      i &&
        ((t = (t = i[$l] || null) ? Lr(t.formAction) : i.getAttribute('formAction')),
        t !== null && ((n = t), (i = null)));
      var c = new Qu('action', 'action', null, a, u);
      l.push({
        event: c,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (be !== 0) {
                  var f = i ? Kr(u, i) : new FormData(u);
                  rc(e, { pending: !0, data: f, method: u.method, action: n }, null, f);
                }
              } else
                typeof n == 'function' &&
                  (c.preventDefault(),
                  (f = i ? Kr(u, i) : new FormData(u)),
                  rc(e, { pending: !0, data: f, method: u.method, action: n }, n, f));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var Jc = 0; Jc < Oi.length; Jc++) {
    var wc = Oi[Jc],
      Bm = wc.toLowerCase(),
      Ym = wc[0].toUpperCase() + wc.slice(1);
    Mt(Bm, 'on' + Ym);
  }
  (Mt(zs, 'onAnimationEnd'),
    Mt(Ts, 'onAnimationIteration'),
    Mt(Es, 'onAnimationStart'),
    Mt('dblclick', 'onDoubleClick'),
    Mt('focusin', 'onFocus'),
    Mt('focusout', 'onBlur'),
    Mt(lm, 'onTransitionRun'),
    Mt(tm, 'onTransitionStart'),
    Mt(em, 'onTransitionCancel'),
    Mt(_s, 'onTransitionEnd'),
    $e('onMouseEnter', ['mouseout', 'mouseover']),
    $e('onMouseLeave', ['mouseout', 'mouseover']),
    $e('onPointerEnter', ['pointerout', 'pointerover']),
    $e('onPointerLeave', ['pointerout', 'pointerover']),
    Oe('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    Oe('onSelect', 'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(' ')),
    Oe('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    Oe('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    Oe('onCompositionStart', 'compositionstart focusout keydown keypress keyup mousedown'.split(' ')),
    Oe('onCompositionUpdate', 'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')));
  var yu =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    Gm = new Set('beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(yu));
  function Jr(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e],
        u = a.event;
      a = a.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var i = a.length - 1; 0 <= i; i--) {
            var c = a[i],
              f = c.instance,
              h = c.currentTarget;
            if (((c = c.listener), f !== n && u.isPropagationStopped())) break l;
            ((n = c), (u.currentTarget = h));
            try {
              n(u);
            } catch (S) {
              Lu(S);
            }
            ((u.currentTarget = null), (n = f));
          }
        else
          for (i = 0; i < a.length; i++) {
            if (
              ((c = a[i]),
              (f = c.instance),
              (h = c.currentTarget),
              (c = c.listener),
              f !== n && u.isPropagationStopped())
            )
              break l;
            ((n = c), (u.currentTarget = h));
            try {
              n(u);
            } catch (S) {
              Lu(S);
            }
            ((u.currentTarget = null), (n = f));
          }
      }
    }
  }
  function P(l, t) {
    var e = t[ii];
    e === void 0 && (e = t[ii] = new Set());
    var a = l + '__bubble';
    e.has(a) || (wr(t, l, 2, !1), e.add(a));
  }
  function kc(l, t, e) {
    var a = 0;
    (t && (a |= 4), wr(e, l, a, t));
  }
  var Cn = '_reactListening' + Math.random().toString(36).slice(2);
  function Wc(l) {
    if (!l[Cn]) {
      ((l[Cn] = !0),
        Gf.forEach(function (e) {
          e !== 'selectionchange' && (Gm.has(e) || kc(e, !1, l), kc(e, !0, l));
        }));
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Cn] || ((t[Cn] = !0), kc('selectionchange', !1, t));
    }
  }
  function wr(l, t, e, a) {
    switch (T0(t)) {
      case 2:
        var u = m1;
        break;
      case 8:
        u = y1;
        break;
      default:
        u = rf;
    }
    ((e = u.bind(null, t, e, l)),
      (u = void 0),
      !hi || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (u = !0),
      a
        ? u !== void 0
          ? l.addEventListener(t, e, { capture: !0, passive: u })
          : l.addEventListener(t, e, !0)
        : u !== void 0
          ? l.addEventListener(t, e, { passive: u })
          : l.addEventListener(t, e, !1));
  }
  function $c(l, t, e, a, u) {
    var n = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      l: for (;;) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var c = a.stateNode.containerInfo;
          if (c === u) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var f = i.tag;
              if ((f === 3 || f === 4) && i.stateNode.containerInfo === u) return;
              i = i.return;
            }
          for (; c !== null; ) {
            if (((i = we(c)), i === null)) return;
            if (((f = i.tag), f === 5 || f === 6 || f === 26 || f === 27)) {
              a = n = i;
              continue l;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    Ff(function () {
      var h = n,
        S = mi(e),
        _ = [];
      l: {
        var v = As.get(l);
        if (v !== void 0) {
          var g = Qu,
            R = l;
          switch (l) {
            case 'keypress':
              if (Gu(e) === 0) break l;
            case 'keydown':
            case 'keyup':
              g = Ud;
              break;
            case 'focusin':
              ((R = 'focus'), (g = pi));
              break;
            case 'focusout':
              ((R = 'blur'), (g = pi));
              break;
            case 'beforeblur':
            case 'afterblur':
              g = pi;
              break;
            case 'click':
              if (e.button === 2) break l;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              g = ls;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              g = Sd;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              g = Hd;
              break;
            case zs:
            case Ts:
            case Es:
              g = Ed;
              break;
            case _s:
              g = Bd;
              break;
            case 'scroll':
            case 'scrollend':
              g = bd;
              break;
            case 'wheel':
              g = Gd;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              g = Ad;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              g = es;
              break;
            case 'toggle':
            case 'beforetoggle':
              g = Qd;
          }
          var X = (t & 4) !== 0,
            hl = !X && (l === 'scroll' || l === 'scrollend'),
            m = X ? (v !== null ? v + 'Capture' : null) : v;
          X = [];
          for (var o = h, y; o !== null; ) {
            var E = o;
            if (
              ((y = E.stateNode),
              (E = E.tag),
              (E !== 5 && E !== 26 && E !== 27) ||
                y === null ||
                m === null ||
                ((E = qa(o, m)), E != null && X.push(hu(o, E, y))),
              hl)
            )
              break;
            o = o.return;
          }
          0 < X.length && ((v = new g(v, R, null, e, S)), _.push({ event: v, listeners: X }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (
            ((v = l === 'mouseover' || l === 'pointerover'),
            (g = l === 'mouseout' || l === 'pointerout'),
            v && e !== di && (R = e.relatedTarget || e.fromElement) && (we(R) || R[Je]))
          )
            break l;
          if (
            (g || v) &&
            ((v = S.window === S ? S : (v = S.ownerDocument) ? v.defaultView || v.parentWindow : window),
            g
              ? ((R = e.relatedTarget || e.toElement),
                (g = h),
                (R = R ? we(R) : null),
                R !== null && ((hl = C(R)), (X = R.tag), R !== hl || (X !== 5 && X !== 27 && X !== 6)) && (R = null))
              : ((g = null), (R = h)),
            g !== R)
          ) {
            if (
              ((X = ls),
              (E = 'onMouseLeave'),
              (m = 'onMouseEnter'),
              (o = 'mouse'),
              (l === 'pointerout' || l === 'pointerover') &&
                ((X = es), (E = 'onPointerLeave'), (m = 'onPointerEnter'), (o = 'pointer')),
              (hl = g == null ? v : Ha(g)),
              (y = R == null ? v : Ha(R)),
              (v = new X(E, o + 'leave', g, e, S)),
              (v.target = hl),
              (v.relatedTarget = y),
              (E = null),
              we(S) === h && ((X = new X(m, o + 'enter', R, e, S)), (X.target = y), (X.relatedTarget = hl), (E = X)),
              (hl = E),
              g && R)
            )
              t: {
                for (X = Xm, m = g, o = R, y = 0, E = m; E; E = X(E)) y++;
                E = 0;
                for (var Y = o; Y; Y = X(Y)) E++;
                for (; 0 < y - E; ) ((m = X(m)), y--);
                for (; 0 < E - y; ) ((o = X(o)), E--);
                for (; y--; ) {
                  if (m === o || (o !== null && m === o.alternate)) {
                    X = m;
                    break t;
                  }
                  ((m = X(m)), (o = X(o)));
                }
                X = null;
              }
            else X = null;
            (g !== null && kr(_, v, g, X, !1), R !== null && hl !== null && kr(_, hl, R, X, !0));
          }
        }
        l: {
          if (
            ((v = h ? Ha(h) : window),
            (g = v.nodeName && v.nodeName.toLowerCase()),
            g === 'select' || (g === 'input' && v.type === 'file'))
          )
            var ul = os;
          else if (fs(v))
            if (rs) ul = Fd;
            else {
              ul = Wd;
              var q = kd;
            }
          else
            ((g = v.nodeName),
              !g || g.toLowerCase() !== 'input' || (v.type !== 'checkbox' && v.type !== 'radio')
                ? h && ri(h.elementType) && (ul = os)
                : (ul = $d));
          if (ul && (ul = ul(l, h))) {
            ss(_, ul, e, S);
            break l;
          }
          (q && q(l, v, h),
            l === 'focusout' && h && v.type === 'number' && h.memoizedProps.value != null && oi(v, 'number', v.value));
        }
        switch (((q = h ? Ha(h) : window), l)) {
          case 'focusin':
            (fs(q) || q.contentEditable === 'true') && ((ea = q), (Ai = h), (La = null));
            break;
          case 'focusout':
            La = Ai = ea = null;
            break;
          case 'mousedown':
            xi = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((xi = !1), ps(_, e, S));
            break;
          case 'selectionchange':
            if (Pd) break;
          case 'keydown':
          case 'keyup':
            ps(_, e, S);
        }
        var W;
        if (zi)
          l: {
            switch (l) {
              case 'compositionstart':
                var el = 'onCompositionStart';
                break l;
              case 'compositionend':
                el = 'onCompositionEnd';
                break l;
              case 'compositionupdate':
                el = 'onCompositionUpdate';
                break l;
            }
            el = void 0;
          }
        else
          ta
            ? is(l, e) && (el = 'onCompositionEnd')
            : l === 'keydown' && e.keyCode === 229 && (el = 'onCompositionStart');
        (el &&
          (as &&
            e.locale !== 'ko' &&
            (ta || el !== 'onCompositionStart'
              ? el === 'onCompositionEnd' && ta && (W = If())
              : ((ee = S), (vi = 'value' in ee ? ee.value : ee.textContent), (ta = !0))),
          (q = Un(h, el)),
          0 < q.length &&
            ((el = new ts(el, l, null, e, S)),
            _.push({ event: el, listeners: q }),
            W ? (el.data = W) : ((W = cs(e)), W !== null && (el.data = W)))),
          (W = Zd ? Ld(l, e) : Kd(l, e)) &&
            ((el = Un(h, 'onBeforeInput')),
            0 < el.length &&
              ((q = new ts('onBeforeInput', 'beforeinput', null, e, S)),
              _.push({ event: q, listeners: el }),
              (q.data = W))),
          qm(_, l, h, e, S));
      }
      Jr(_, t);
    });
  }
  function hu(l, t, e) {
    return { instance: l, listener: t, currentTarget: e };
  }
  function Un(l, t) {
    for (var e = t + 'Capture', a = []; l !== null; ) {
      var u = l,
        n = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          n === null ||
          ((u = qa(l, e)), u != null && a.unshift(hu(l, u, n)), (u = qa(l, t)), u != null && a.push(hu(l, u, n))),
        l.tag === 3)
      )
        return a;
      l = l.return;
    }
    return [];
  }
  function Xm(l) {
    if (l === null) return null;
    do l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function kr(l, t, e, a, u) {
    for (var n = t._reactName, i = []; e !== null && e !== a; ) {
      var c = e,
        f = c.alternate,
        h = c.stateNode;
      if (((c = c.tag), f !== null && f === a)) break;
      ((c !== 5 && c !== 26 && c !== 27) ||
        h === null ||
        ((f = h),
        u
          ? ((h = qa(e, n)), h != null && i.unshift(hu(e, h, f)))
          : u || ((h = qa(e, n)), h != null && i.push(hu(e, h, f)))),
        (e = e.return));
    }
    i.length !== 0 && l.push({ event: t, listeners: i });
  }
  var Qm = /\r\n?/g,
    Vm = /\u0000|\uFFFD/g;
  function Wr(l) {
    return (typeof l == 'string' ? l : '' + l)
      .replace(
        Qm,
        `
`
      )
      .replace(Vm, '');
  }
  function $r(l, t) {
    return ((t = Wr(t)), Wr(l) === t);
  }
  function yl(l, t, e, a, u, n) {
    switch (e) {
      case 'children':
        typeof a == 'string'
          ? t === 'body' || (t === 'textarea' && a === '') || Ie(l, a)
          : (typeof a == 'number' || typeof a == 'bigint') && t !== 'body' && Ie(l, '' + a);
        break;
      case 'className':
        Hu(l, 'class', a);
        break;
      case 'tabIndex':
        Hu(l, 'tabindex', a);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Hu(l, e, a);
        break;
      case 'style':
        Wf(l, a, n);
        break;
      case 'data':
        if (t !== 'object') {
          Hu(l, 'data', a);
          break;
        }
      case 'src':
      case 'href':
        if (a === '' && (t !== 'a' || e !== 'href')) {
          l.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == 'function' || typeof a == 'symbol' || typeof a == 'boolean') {
          l.removeAttribute(e);
          break;
        }
        ((a = Bu('' + a)), l.setAttribute(e, a));
        break;
      case 'action':
      case 'formAction':
        if (typeof a == 'function') {
          l.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == 'function' &&
            (e === 'formAction'
              ? (t !== 'input' && yl(l, t, 'name', u.name, u, null),
                yl(l, t, 'formEncType', u.formEncType, u, null),
                yl(l, t, 'formMethod', u.formMethod, u, null),
                yl(l, t, 'formTarget', u.formTarget, u, null))
              : (yl(l, t, 'encType', u.encType, u, null),
                yl(l, t, 'method', u.method, u, null),
                yl(l, t, 'target', u.target, u, null)));
        if (a == null || typeof a == 'symbol' || typeof a == 'boolean') {
          l.removeAttribute(e);
          break;
        }
        ((a = Bu('' + a)), l.setAttribute(e, a));
        break;
      case 'onClick':
        a != null && (l.onclick = qt);
        break;
      case 'onScroll':
        a != null && P('scroll', l);
        break;
      case 'onScrollEnd':
        a != null && P('scrollend', l);
        break;
      case 'dangerouslySetInnerHTML':
        if (a != null) {
          if (typeof a != 'object' || !('__html' in a)) throw Error(s(61));
          if (((e = a.__html), e != null)) {
            if (u.children != null) throw Error(s(60));
            l.innerHTML = e;
          }
        }
        break;
      case 'multiple':
        l.multiple = a && typeof a != 'function' && typeof a != 'symbol';
        break;
      case 'muted':
        l.muted = a && typeof a != 'function' && typeof a != 'symbol';
        break;
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'defaultValue':
      case 'defaultChecked':
      case 'innerHTML':
      case 'ref':
        break;
      case 'autoFocus':
        break;
      case 'xlinkHref':
        if (a == null || typeof a == 'function' || typeof a == 'boolean' || typeof a == 'symbol') {
          l.removeAttribute('xlink:href');
          break;
        }
        ((e = Bu('' + a)), l.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', e));
        break;
      case 'contentEditable':
      case 'spellCheck':
      case 'draggable':
      case 'value':
      case 'autoReverse':
      case 'externalResourcesRequired':
      case 'focusable':
      case 'preserveAlpha':
        a != null && typeof a != 'function' && typeof a != 'symbol' ? l.setAttribute(e, '' + a) : l.removeAttribute(e);
        break;
      case 'inert':
      case 'allowFullScreen':
      case 'async':
      case 'autoPlay':
      case 'controls':
      case 'default':
      case 'defer':
      case 'disabled':
      case 'disablePictureInPicture':
      case 'disableRemotePlayback':
      case 'formNoValidate':
      case 'hidden':
      case 'loop':
      case 'noModule':
      case 'noValidate':
      case 'open':
      case 'playsInline':
      case 'readOnly':
      case 'required':
      case 'reversed':
      case 'scoped':
      case 'seamless':
      case 'itemScope':
        a && typeof a != 'function' && typeof a != 'symbol' ? l.setAttribute(e, '') : l.removeAttribute(e);
        break;
      case 'capture':
      case 'download':
        a === !0
          ? l.setAttribute(e, '')
          : a !== !1 && a != null && typeof a != 'function' && typeof a != 'symbol'
            ? l.setAttribute(e, a)
            : l.removeAttribute(e);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        a != null && typeof a != 'function' && typeof a != 'symbol' && !isNaN(a) && 1 <= a
          ? l.setAttribute(e, a)
          : l.removeAttribute(e);
        break;
      case 'rowSpan':
      case 'start':
        a == null || typeof a == 'function' || typeof a == 'symbol' || isNaN(a)
          ? l.removeAttribute(e)
          : l.setAttribute(e, a);
        break;
      case 'popover':
        (P('beforetoggle', l), P('toggle', l), Ru(l, 'popover', a));
        break;
      case 'xlinkActuate':
        Ht(l, 'http://www.w3.org/1999/xlink', 'xlink:actuate', a);
        break;
      case 'xlinkArcrole':
        Ht(l, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', a);
        break;
      case 'xlinkRole':
        Ht(l, 'http://www.w3.org/1999/xlink', 'xlink:role', a);
        break;
      case 'xlinkShow':
        Ht(l, 'http://www.w3.org/1999/xlink', 'xlink:show', a);
        break;
      case 'xlinkTitle':
        Ht(l, 'http://www.w3.org/1999/xlink', 'xlink:title', a);
        break;
      case 'xlinkType':
        Ht(l, 'http://www.w3.org/1999/xlink', 'xlink:type', a);
        break;
      case 'xmlBase':
        Ht(l, 'http://www.w3.org/XML/1998/namespace', 'xml:base', a);
        break;
      case 'xmlLang':
        Ht(l, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', a);
        break;
      case 'xmlSpace':
        Ht(l, 'http://www.w3.org/XML/1998/namespace', 'xml:space', a);
        break;
      case 'is':
        Ru(l, 'is', a);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < e.length) || (e[0] !== 'o' && e[0] !== 'O') || (e[1] !== 'n' && e[1] !== 'N')) &&
          ((e = vd.get(e) || e), Ru(l, e, a));
    }
  }
  function Fc(l, t, e, a, u, n) {
    switch (e) {
      case 'style':
        Wf(l, a, n);
        break;
      case 'dangerouslySetInnerHTML':
        if (a != null) {
          if (typeof a != 'object' || !('__html' in a)) throw Error(s(61));
          if (((e = a.__html), e != null)) {
            if (u.children != null) throw Error(s(60));
            l.innerHTML = e;
          }
        }
        break;
      case 'children':
        typeof a == 'string' ? Ie(l, a) : (typeof a == 'number' || typeof a == 'bigint') && Ie(l, '' + a);
        break;
      case 'onScroll':
        a != null && P('scroll', l);
        break;
      case 'onScrollEnd':
        a != null && P('scrollend', l);
        break;
      case 'onClick':
        a != null && (l.onclick = qt);
        break;
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'innerHTML':
      case 'ref':
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        if (!Xf.hasOwnProperty(e))
          l: {
            if (
              e[0] === 'o' &&
              e[1] === 'n' &&
              ((u = e.endsWith('Capture')),
              (t = e.slice(2, u ? e.length - 7 : void 0)),
              (n = l[$l] || null),
              (n = n != null ? n[e] : null),
              typeof n == 'function' && l.removeEventListener(t, n, u),
              typeof a == 'function')
            ) {
              (typeof n != 'function' &&
                n !== null &&
                (e in l ? (l[e] = null) : l.hasAttribute(e) && l.removeAttribute(e)),
                l.addEventListener(t, a, u));
              break l;
            }
            e in l ? (l[e] = a) : a === !0 ? l.setAttribute(e, '') : Ru(l, e, a);
          }
    }
  }
  function Ql(l, t, e) {
    switch (t) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break;
      case 'img':
        (P('error', l), P('load', l));
        var a = !1,
          u = !1,
          n;
        for (n in e)
          if (e.hasOwnProperty(n)) {
            var i = e[n];
            if (i != null)
              switch (n) {
                case 'src':
                  a = !0;
                  break;
                case 'srcSet':
                  u = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(s(137, t));
                default:
                  yl(l, t, n, i, e, null);
              }
          }
        (u && yl(l, t, 'srcSet', e.srcSet, e, null), a && yl(l, t, 'src', e.src, e, null));
        return;
      case 'input':
        P('invalid', l);
        var c = (n = i = u = null),
          f = null,
          h = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var S = e[a];
            if (S != null)
              switch (a) {
                case 'name':
                  u = S;
                  break;
                case 'type':
                  i = S;
                  break;
                case 'checked':
                  f = S;
                  break;
                case 'defaultChecked':
                  h = S;
                  break;
                case 'value':
                  n = S;
                  break;
                case 'defaultValue':
                  c = S;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (S != null) throw Error(s(137, t));
                  break;
                default:
                  yl(l, t, a, S, e, null);
              }
          }
        Kf(l, n, c, f, h, i, u, !1);
        return;
      case 'select':
        (P('invalid', l), (a = i = n = null));
        for (u in e)
          if (e.hasOwnProperty(u) && ((c = e[u]), c != null))
            switch (u) {
              case 'value':
                n = c;
                break;
              case 'defaultValue':
                i = c;
                break;
              case 'multiple':
                a = c;
              default:
                yl(l, t, u, c, e, null);
            }
        ((t = n), (e = i), (l.multiple = !!a), t != null ? Fe(l, !!a, t, !1) : e != null && Fe(l, !!a, e, !0));
        return;
      case 'textarea':
        (P('invalid', l), (n = u = a = null));
        for (i in e)
          if (e.hasOwnProperty(i) && ((c = e[i]), c != null))
            switch (i) {
              case 'value':
                a = c;
                break;
              case 'defaultValue':
                u = c;
                break;
              case 'children':
                n = c;
                break;
              case 'dangerouslySetInnerHTML':
                if (c != null) throw Error(s(91));
                break;
              default:
                yl(l, t, i, c, e, null);
            }
        wf(l, a, u, n);
        return;
      case 'option':
        for (f in e)
          if (e.hasOwnProperty(f) && ((a = e[f]), a != null))
            switch (f) {
              case 'selected':
                l.selected = a && typeof a != 'function' && typeof a != 'symbol';
                break;
              default:
                yl(l, t, f, a, e, null);
            }
        return;
      case 'dialog':
        (P('beforetoggle', l), P('toggle', l), P('cancel', l), P('close', l));
        break;
      case 'iframe':
      case 'object':
        P('load', l);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < yu.length; a++) P(yu[a], l);
        break;
      case 'image':
        (P('error', l), P('load', l));
        break;
      case 'details':
        P('toggle', l);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (P('error', l), P('load', l));
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (h in e)
          if (e.hasOwnProperty(h) && ((a = e[h]), a != null))
            switch (h) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(s(137, t));
              default:
                yl(l, t, h, a, e, null);
            }
        return;
      default:
        if (ri(t)) {
          for (S in e) e.hasOwnProperty(S) && ((a = e[S]), a !== void 0 && Fc(l, t, S, a, e, void 0));
          return;
        }
    }
    for (c in e) e.hasOwnProperty(c) && ((a = e[c]), a != null && yl(l, t, c, a, e, null));
  }
  function Zm(l, t, e, a) {
    switch (t) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break;
      case 'input':
        var u = null,
          n = null,
          i = null,
          c = null,
          f = null,
          h = null,
          S = null;
        for (g in e) {
          var _ = e[g];
          if (e.hasOwnProperty(g) && _ != null)
            switch (g) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                f = _;
              default:
                a.hasOwnProperty(g) || yl(l, t, g, null, a, _);
            }
        }
        for (var v in a) {
          var g = a[v];
          if (((_ = e[v]), a.hasOwnProperty(v) && (g != null || _ != null)))
            switch (v) {
              case 'type':
                n = g;
                break;
              case 'name':
                u = g;
                break;
              case 'checked':
                h = g;
                break;
              case 'defaultChecked':
                S = g;
                break;
              case 'value':
                i = g;
                break;
              case 'defaultValue':
                c = g;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (g != null) throw Error(s(137, t));
                break;
              default:
                g !== _ && yl(l, t, v, g, a, _);
            }
        }
        si(l, i, c, f, h, S, n, u);
        return;
      case 'select':
        g = i = c = v = null;
        for (n in e)
          if (((f = e[n]), e.hasOwnProperty(n) && f != null))
            switch (n) {
              case 'value':
                break;
              case 'multiple':
                g = f;
              default:
                a.hasOwnProperty(n) || yl(l, t, n, null, a, f);
            }
        for (u in a)
          if (((n = a[u]), (f = e[u]), a.hasOwnProperty(u) && (n != null || f != null)))
            switch (u) {
              case 'value':
                v = n;
                break;
              case 'defaultValue':
                c = n;
                break;
              case 'multiple':
                i = n;
              default:
                n !== f && yl(l, t, u, n, a, f);
            }
        ((t = c),
          (e = i),
          (a = g),
          v != null ? Fe(l, !!e, v, !1) : !!a != !!e && (t != null ? Fe(l, !!e, t, !0) : Fe(l, !!e, e ? [] : '', !1)));
        return;
      case 'textarea':
        g = v = null;
        for (c in e)
          if (((u = e[c]), e.hasOwnProperty(c) && u != null && !a.hasOwnProperty(c)))
            switch (c) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                yl(l, t, c, null, a, u);
            }
        for (i in a)
          if (((u = a[i]), (n = e[i]), a.hasOwnProperty(i) && (u != null || n != null)))
            switch (i) {
              case 'value':
                v = u;
                break;
              case 'defaultValue':
                g = u;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== n && yl(l, t, i, u, a, n);
            }
        Jf(l, v, g);
        return;
      case 'option':
        for (var R in e)
          if (((v = e[R]), e.hasOwnProperty(R) && v != null && !a.hasOwnProperty(R)))
            switch (R) {
              case 'selected':
                l.selected = !1;
                break;
              default:
                yl(l, t, R, null, a, v);
            }
        for (f in a)
          if (((v = a[f]), (g = e[f]), a.hasOwnProperty(f) && v !== g && (v != null || g != null)))
            switch (f) {
              case 'selected':
                l.selected = v && typeof v != 'function' && typeof v != 'symbol';
                break;
              default:
                yl(l, t, f, v, a, g);
            }
        return;
      case 'img':
      case 'link':
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'embed':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'source':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (var X in e)
          ((v = e[X]), e.hasOwnProperty(X) && v != null && !a.hasOwnProperty(X) && yl(l, t, X, null, a, v));
        for (h in a)
          if (((v = a[h]), (g = e[h]), a.hasOwnProperty(h) && v !== g && (v != null || g != null)))
            switch (h) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (v != null) throw Error(s(137, t));
                break;
              default:
                yl(l, t, h, v, a, g);
            }
        return;
      default:
        if (ri(t)) {
          for (var hl in e)
            ((v = e[hl]), e.hasOwnProperty(hl) && v !== void 0 && !a.hasOwnProperty(hl) && Fc(l, t, hl, void 0, a, v));
          for (S in a)
            ((v = a[S]),
              (g = e[S]),
              !a.hasOwnProperty(S) || v === g || (v === void 0 && g === void 0) || Fc(l, t, S, v, a, g));
          return;
        }
    }
    for (var m in e) ((v = e[m]), e.hasOwnProperty(m) && v != null && !a.hasOwnProperty(m) && yl(l, t, m, null, a, v));
    for (_ in a)
      ((v = a[_]), (g = e[_]), !a.hasOwnProperty(_) || v === g || (v == null && g == null) || yl(l, t, _, v, a, g));
  }
  function Fr(l) {
    switch (l) {
      case 'css':
      case 'script':
      case 'font':
      case 'img':
      case 'image':
      case 'input':
      case 'link':
        return !0;
      default:
        return !1;
    }
  }
  function Lm() {
    if (typeof performance.getEntriesByType == 'function') {
      for (var l = 0, t = 0, e = performance.getEntriesByType('resource'), a = 0; a < e.length; a++) {
        var u = e[a],
          n = u.transferSize,
          i = u.initiatorType,
          c = u.duration;
        if (n && c && Fr(i)) {
          for (i = 0, c = u.responseEnd, a += 1; a < e.length; a++) {
            var f = e[a],
              h = f.startTime;
            if (h > c) break;
            var S = f.transferSize,
              _ = f.initiatorType;
            S && Fr(_) && ((f = f.responseEnd), (i += S * (f < c ? 1 : (c - h) / (f - h))));
          }
          if ((--a, (t += (8 * (n + i)) / (u.duration / 1e3)), l++, 10 < l)) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && ((l = navigator.connection.downlink), typeof l == 'number') ? l : 5;
  }
  var Ic = null,
    Pc = null;
  function jn(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Ir(l) {
    switch (l) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function Pr(l, t) {
    if (l === 0)
      switch (t) {
        case 'svg':
          return 1;
        case 'math':
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === 'foreignObject' ? 0 : l;
  }
  function lf(l, t) {
    return (
      l === 'textarea' ||
      l === 'noscript' ||
      typeof t.children == 'string' ||
      typeof t.children == 'number' ||
      typeof t.children == 'bigint' ||
      (typeof t.dangerouslySetInnerHTML == 'object' &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var tf = null;
  function Km() {
    var l = window.event;
    return l && l.type === 'popstate' ? (l === tf ? !1 : ((tf = l), !0)) : ((tf = null), !1);
  }
  var l0 = typeof setTimeout == 'function' ? setTimeout : void 0,
    Jm = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    t0 = typeof Promise == 'function' ? Promise : void 0,
    wm =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof t0 < 'u'
          ? function (l) {
              return t0.resolve(null).then(l).catch(km);
            }
          : l0;
  function km(l) {
    setTimeout(function () {
      throw l;
    });
  }
  function pe(l) {
    return l === 'head';
  }
  function e0(l, t) {
    var e = t,
      a = 0;
    do {
      var u = e.nextSibling;
      if ((l.removeChild(e), u && u.nodeType === 8))
        if (((e = u.data), e === '/$' || e === '/&')) {
          if (a === 0) {
            (l.removeChild(u), Da(t));
            return;
          }
          a--;
        } else if (e === '$' || e === '$?' || e === '$~' || e === '$!' || e === '&') a++;
        else if (e === 'html') vu(l.ownerDocument.documentElement);
        else if (e === 'head') {
          ((e = l.ownerDocument.head), vu(e));
          for (var n = e.firstChild; n; ) {
            var i = n.nextSibling,
              c = n.nodeName;
            (n[Ra] ||
              c === 'SCRIPT' ||
              c === 'STYLE' ||
              (c === 'LINK' && n.rel.toLowerCase() === 'stylesheet') ||
              e.removeChild(n),
              (n = i));
          }
        } else e === 'body' && vu(l.ownerDocument.body);
      e = u;
    } while (e);
    Da(t);
  }
  function a0(l, t) {
    var e = l;
    l = 0;
    do {
      var a = e.nextSibling;
      if (
        (e.nodeType === 1
          ? t
            ? ((e._stashedDisplay = e.style.display), (e.style.display = 'none'))
            : ((e.style.display = e._stashedDisplay || ''),
              e.getAttribute('style') === '' && e.removeAttribute('style'))
          : e.nodeType === 3 &&
            (t ? ((e._stashedText = e.nodeValue), (e.nodeValue = '')) : (e.nodeValue = e._stashedText || '')),
        a && a.nodeType === 8)
      )
        if (((e = a.data), e === '/$')) {
          if (l === 0) break;
          l--;
        } else (e !== '$' && e !== '$?' && e !== '$~' && e !== '$!') || l++;
      e = a;
    } while (e);
  }
  function ef(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (((t = t.nextSibling), e.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (ef(e), ci(e));
          continue;
        case 'SCRIPT':
        case 'STYLE':
          continue;
        case 'LINK':
          if (e.rel.toLowerCase() === 'stylesheet') continue;
      }
      l.removeChild(e);
    }
  }
  function Wm(l, t, e, a) {
    for (; l.nodeType === 1; ) {
      var u = e;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== 'INPUT' || l.type !== 'hidden')) break;
      } else if (a) {
        if (!l[Ra])
          switch (t) {
            case 'meta':
              if (!l.hasAttribute('itemprop')) break;
              return l;
            case 'link':
              if (((n = l.getAttribute('rel')), n === 'stylesheet' && l.hasAttribute('data-precedence'))) break;
              if (
                n !== u.rel ||
                l.getAttribute('href') !== (u.href == null || u.href === '' ? null : u.href) ||
                l.getAttribute('crossorigin') !== (u.crossOrigin == null ? null : u.crossOrigin) ||
                l.getAttribute('title') !== (u.title == null ? null : u.title)
              )
                break;
              return l;
            case 'style':
              if (l.hasAttribute('data-precedence')) break;
              return l;
            case 'script':
              if (
                ((n = l.getAttribute('src')),
                (n !== (u.src == null ? null : u.src) ||
                  l.getAttribute('type') !== (u.type == null ? null : u.type) ||
                  l.getAttribute('crossorigin') !== (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  n &&
                  l.hasAttribute('async') &&
                  !l.hasAttribute('itemprop'))
              )
                break;
              return l;
            default:
              return l;
          }
      } else if (t === 'input' && l.type === 'hidden') {
        var n = u.name == null ? null : '' + u.name;
        if (u.type === 'hidden' && l.getAttribute('name') === n) return l;
      } else return l;
      if (((l = Et(l.nextSibling)), l === null)) break;
    }
    return null;
  }
  function $m(l, t, e) {
    if (t === '') return null;
    for (; l.nodeType !== 3; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== 'INPUT' || l.type !== 'hidden') && !e) ||
        ((l = Et(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function u0(l, t) {
    for (; l.nodeType !== 8; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== 'INPUT' || l.type !== 'hidden') && !t) ||
        ((l = Et(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function af(l) {
    return l.data === '$?' || l.data === '$~';
  }
  function uf(l) {
    return l.data === '$!' || (l.data === '$?' && l.ownerDocument.readyState !== 'loading');
  }
  function Fm(l, t) {
    var e = l.ownerDocument;
    if (l.data === '$~') l._reactRetry = t;
    else if (l.data !== '$?' || e.readyState !== 'loading') t();
    else {
      var a = function () {
        (t(), e.removeEventListener('DOMContentLoaded', a));
      };
      (e.addEventListener('DOMContentLoaded', a), (l._reactRetry = a));
    }
  }
  function Et(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (((t = l.data), t === '$' || t === '$!' || t === '$?' || t === '$~' || t === '&' || t === 'F!' || t === 'F'))
          break;
        if (t === '/$' || t === '/&') return null;
      }
    }
    return l;
  }
  var nf = null;
  function n0(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === '/$' || e === '/&') {
          if (t === 0) return Et(l.nextSibling);
          t--;
        } else (e !== '$' && e !== '$!' && e !== '$?' && e !== '$~' && e !== '&') || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function i0(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === '$' || e === '$!' || e === '$?' || e === '$~' || e === '&') {
          if (t === 0) return l;
          t--;
        } else (e !== '/$' && e !== '/&') || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function c0(l, t, e) {
    switch (((t = jn(e)), l)) {
      case 'html':
        if (((l = t.documentElement), !l)) throw Error(s(452));
        return l;
      case 'head':
        if (((l = t.head), !l)) throw Error(s(453));
        return l;
      case 'body':
        if (((l = t.body), !l)) throw Error(s(454));
        return l;
      default:
        throw Error(s(451));
    }
  }
  function vu(l) {
    for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
    ci(l);
  }
  var _t = new Map(),
    f0 = new Set();
  function Rn(l) {
    return typeof l.getRootNode == 'function' ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var It = N.d;
  N.d = { f: Im, r: Pm, D: l1, C: t1, L: e1, m: a1, X: n1, S: u1, M: i1 };
  function Im() {
    var l = It.f(),
      t = An();
    return l || t;
  }
  function Pm(l) {
    var t = ke(l);
    t !== null && t.tag === 5 && t.type === 'form' ? Ao(t) : It.r(l);
  }
  var xa = typeof document > 'u' ? null : document;
  function s0(l, t, e) {
    var a = xa;
    if (a && typeof t == 'string' && t) {
      var u = vt(t);
      ((u = 'link[rel="' + l + '"][href="' + u + '"]'),
        typeof e == 'string' && (u += '[crossorigin="' + e + '"]'),
        f0.has(u) ||
          (f0.add(u),
          (l = { rel: l, crossOrigin: e, href: t }),
          a.querySelector(u) === null &&
            ((t = a.createElement('link')), Ql(t, 'link', l), jl(t), a.head.appendChild(t))));
    }
  }
  function l1(l) {
    (It.D(l), s0('dns-prefetch', l, null));
  }
  function t1(l, t) {
    (It.C(l, t), s0('preconnect', l, t));
  }
  function e1(l, t, e) {
    It.L(l, t, e);
    var a = xa;
    if (a && l && t) {
      var u = 'link[rel="preload"][as="' + vt(t) + '"]';
      t === 'image' && e && e.imageSrcSet
        ? ((u += '[imagesrcset="' + vt(e.imageSrcSet) + '"]'),
          typeof e.imageSizes == 'string' && (u += '[imagesizes="' + vt(e.imageSizes) + '"]'))
        : (u += '[href="' + vt(l) + '"]');
      var n = u;
      switch (t) {
        case 'style':
          n = Ma(l);
          break;
        case 'script':
          n = Oa(l);
      }
      _t.has(n) ||
        ((l = D({ rel: 'preload', href: t === 'image' && e && e.imageSrcSet ? void 0 : l, as: t }, e)),
        _t.set(n, l),
        a.querySelector(u) !== null ||
          (t === 'style' && a.querySelector(gu(n))) ||
          (t === 'script' && a.querySelector(bu(n))) ||
          ((t = a.createElement('link')), Ql(t, 'link', l), jl(t), a.head.appendChild(t)));
    }
  }
  function a1(l, t) {
    It.m(l, t);
    var e = xa;
    if (e && l) {
      var a = t && typeof t.as == 'string' ? t.as : 'script',
        u = 'link[rel="modulepreload"][as="' + vt(a) + '"][href="' + vt(l) + '"]',
        n = u;
      switch (a) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          n = Oa(l);
      }
      if (!_t.has(n) && ((l = D({ rel: 'modulepreload', href: l }, t)), _t.set(n, l), e.querySelector(u) === null)) {
        switch (a) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (e.querySelector(bu(n))) return;
        }
        ((a = e.createElement('link')), Ql(a, 'link', l), jl(a), e.head.appendChild(a));
      }
    }
  }
  function u1(l, t, e) {
    It.S(l, t, e);
    var a = xa;
    if (a && l) {
      var u = We(a).hoistableStyles,
        n = Ma(l);
      t = t || 'default';
      var i = u.get(n);
      if (!i) {
        var c = { loading: 0, preload: null };
        if ((i = a.querySelector(gu(n)))) c.loading = 5;
        else {
          ((l = D({ rel: 'stylesheet', href: l, 'data-precedence': t }, e)), (e = _t.get(n)) && cf(l, e));
          var f = (i = a.createElement('link'));
          (jl(f),
            Ql(f, 'link', l),
            (f._p = new Promise(function (h, S) {
              ((f.onload = h), (f.onerror = S));
            })),
            f.addEventListener('load', function () {
              c.loading |= 1;
            }),
            f.addEventListener('error', function () {
              c.loading |= 2;
            }),
            (c.loading |= 4),
            Hn(i, t, a));
        }
        ((i = { type: 'stylesheet', instance: i, count: 1, state: c }), u.set(n, i));
      }
    }
  }
  function n1(l, t) {
    It.X(l, t);
    var e = xa;
    if (e && l) {
      var a = We(e).hoistableScripts,
        u = Oa(l),
        n = a.get(u);
      n ||
        ((n = e.querySelector(bu(u))),
        n ||
          ((l = D({ src: l, async: !0 }, t)),
          (t = _t.get(u)) && ff(l, t),
          (n = e.createElement('script')),
          jl(n),
          Ql(n, 'link', l),
          e.head.appendChild(n)),
        (n = { type: 'script', instance: n, count: 1, state: null }),
        a.set(u, n));
    }
  }
  function i1(l, t) {
    It.M(l, t);
    var e = xa;
    if (e && l) {
      var a = We(e).hoistableScripts,
        u = Oa(l),
        n = a.get(u);
      n ||
        ((n = e.querySelector(bu(u))),
        n ||
          ((l = D({ src: l, async: !0, type: 'module' }, t)),
          (t = _t.get(u)) && ff(l, t),
          (n = e.createElement('script')),
          jl(n),
          Ql(n, 'link', l),
          e.head.appendChild(n)),
        (n = { type: 'script', instance: n, count: 1, state: null }),
        a.set(u, n));
    }
  }
  function o0(l, t, e, a) {
    var u = (u = F.current) ? Rn(u) : null;
    if (!u) throw Error(s(446));
    switch (l) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof e.precedence == 'string' && typeof e.href == 'string'
          ? ((t = Ma(e.href)),
            (e = We(u).hoistableStyles),
            (a = e.get(t)),
            a || ((a = { type: 'style', instance: null, count: 0, state: null }), e.set(t, a)),
            a)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (e.rel === 'stylesheet' && typeof e.href == 'string' && typeof e.precedence == 'string') {
          l = Ma(e.href);
          var n = We(u).hoistableStyles,
            i = n.get(l);
          if (
            (i ||
              ((u = u.ownerDocument || u),
              (i = { type: 'stylesheet', instance: null, count: 0, state: { loading: 0, preload: null } }),
              n.set(l, i),
              (n = u.querySelector(gu(l))) && !n._p && ((i.instance = n), (i.state.loading = 5)),
              _t.has(l) ||
                ((e = {
                  rel: 'preload',
                  as: 'style',
                  href: e.href,
                  crossOrigin: e.crossOrigin,
                  integrity: e.integrity,
                  media: e.media,
                  hrefLang: e.hrefLang,
                  referrerPolicy: e.referrerPolicy,
                }),
                _t.set(l, e),
                n || c1(u, l, e, i.state))),
            t && a === null)
          )
            throw Error(s(528, ''));
          return i;
        }
        if (t && a !== null) throw Error(s(529, ''));
        return null;
      case 'script':
        return (
          (t = e.async),
          (e = e.src),
          typeof e == 'string' && t && typeof t != 'function' && typeof t != 'symbol'
            ? ((t = Oa(e)),
              (e = We(u).hoistableScripts),
              (a = e.get(t)),
              a || ((a = { type: 'script', instance: null, count: 0, state: null }), e.set(t, a)),
              a)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(s(444, l));
    }
  }
  function Ma(l) {
    return 'href="' + vt(l) + '"';
  }
  function gu(l) {
    return 'link[rel="stylesheet"][' + l + ']';
  }
  function r0(l) {
    return D({}, l, { 'data-precedence': l.precedence, precedence: null });
  }
  function c1(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + ']')
      ? (a.loading = 1)
      : ((t = l.createElement('link')),
        (a.preload = t),
        t.addEventListener('load', function () {
          return (a.loading |= 1);
        }),
        t.addEventListener('error', function () {
          return (a.loading |= 2);
        }),
        Ql(t, 'link', e),
        jl(t),
        l.head.appendChild(t));
  }
  function Oa(l) {
    return '[src="' + vt(l) + '"]';
  }
  function bu(l) {
    return 'script[async]' + l;
  }
  function d0(l, t, e) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var a = l.querySelector('style[data-href~="' + vt(e.href) + '"]');
          if (a) return ((t.instance = a), jl(a), a);
          var u = D({}, e, { 'data-href': e.href, 'data-precedence': e.precedence, href: null, precedence: null });
          return (
            (a = (l.ownerDocument || l).createElement('style')),
            jl(a),
            Ql(a, 'style', u),
            Hn(a, e.precedence, l),
            (t.instance = a)
          );
        case 'stylesheet':
          u = Ma(e.href);
          var n = l.querySelector(gu(u));
          if (n) return ((t.state.loading |= 4), (t.instance = n), jl(n), n);
          ((a = r0(e)), (u = _t.get(u)) && cf(a, u), (n = (l.ownerDocument || l).createElement('link')), jl(n));
          var i = n;
          return (
            (i._p = new Promise(function (c, f) {
              ((i.onload = c), (i.onerror = f));
            })),
            Ql(n, 'link', a),
            (t.state.loading |= 4),
            Hn(n, e.precedence, l),
            (t.instance = n)
          );
        case 'script':
          return (
            (n = Oa(e.src)),
            (u = l.querySelector(bu(n)))
              ? ((t.instance = u), jl(u), u)
              : ((a = e),
                (u = _t.get(n)) && ((a = D({}, e)), ff(a, u)),
                (l = l.ownerDocument || l),
                (u = l.createElement('script')),
                jl(u),
                Ql(u, 'link', a),
                l.head.appendChild(u),
                (t.instance = u))
          );
        case 'void':
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === 'stylesheet' &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), Hn(a, e.precedence, l));
    return t.instance;
  }
  function Hn(l, t, e) {
    for (
      var a = e.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        u = a.length ? a[a.length - 1] : null,
        n = u,
        i = 0;
      i < a.length;
      i++
    ) {
      var c = a[i];
      if (c.dataset.precedence === t) n = c;
      else if (n !== u) break;
    }
    n
      ? n.parentNode.insertBefore(l, n.nextSibling)
      : ((t = e.nodeType === 9 ? e.head : e), t.insertBefore(l, t.firstChild));
  }
  function cf(l, t) {
    (l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.title == null && (l.title = t.title));
  }
  function ff(l, t) {
    (l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.integrity == null && (l.integrity = t.integrity));
  }
  var qn = null;
  function m0(l, t, e) {
    if (qn === null) {
      var a = new Map(),
        u = (qn = new Map());
      u.set(e, a);
    } else ((u = qn), (a = u.get(e)), a || ((a = new Map()), u.set(e, a)));
    if (a.has(l)) return a;
    for (a.set(l, null), e = e.getElementsByTagName(l), u = 0; u < e.length; u++) {
      var n = e[u];
      if (
        !(n[Ra] || n[Bl] || (l === 'link' && n.getAttribute('rel') === 'stylesheet')) &&
        n.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var i = n.getAttribute(t) || '';
        i = l + i;
        var c = a.get(i);
        c ? c.push(n) : a.set(i, [n]);
      }
    }
    return a;
  }
  function y0(l, t, e) {
    ((l = l.ownerDocument || l), l.head.insertBefore(e, t === 'title' ? l.querySelector('head > title') : null));
  }
  function f1(l, t, e) {
    if (e === 1 || t.itemProp != null) return !1;
    switch (l) {
      case 'meta':
      case 'title':
        return !0;
      case 'style':
        if (typeof t.precedence != 'string' || typeof t.href != 'string' || t.href === '') break;
        return !0;
      case 'link':
        if (typeof t.rel != 'string' || typeof t.href != 'string' || t.href === '' || t.onLoad || t.onError) break;
        switch (t.rel) {
          case 'stylesheet':
            return ((l = t.disabled), typeof t.precedence == 'string' && l == null);
          default:
            return !0;
        }
      case 'script':
        if (
          t.async &&
          typeof t.async != 'function' &&
          typeof t.async != 'symbol' &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == 'string'
        )
          return !0;
    }
    return !1;
  }
  function h0(l) {
    return !(l.type === 'stylesheet' && (l.state.loading & 3) === 0);
  }
  function s1(l, t, e, a) {
    if (
      e.type === 'stylesheet' &&
      (typeof a.media != 'string' || matchMedia(a.media).matches !== !1) &&
      (e.state.loading & 4) === 0
    ) {
      if (e.instance === null) {
        var u = Ma(a.href),
          n = t.querySelector(gu(u));
        if (n) {
          ((t = n._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (l.count++, (l = Bn.bind(l)), t.then(l, l)),
            (e.state.loading |= 4),
            (e.instance = n),
            jl(n));
          return;
        }
        ((n = t.ownerDocument || t), (a = r0(a)), (u = _t.get(u)) && cf(a, u), (n = n.createElement('link')), jl(n));
        var i = n;
        ((i._p = new Promise(function (c, f) {
          ((i.onload = c), (i.onerror = f));
        })),
          Ql(n, 'link', a),
          (e.instance = n));
      }
      (l.stylesheets === null && (l.stylesheets = new Map()),
        l.stylesheets.set(e, t),
        (t = e.state.preload) &&
          (e.state.loading & 3) === 0 &&
          (l.count++, (e = Bn.bind(l)), t.addEventListener('load', e), t.addEventListener('error', e)));
    }
  }
  var sf = 0;
  function o1(l, t) {
    return (
      l.stylesheets && l.count === 0 && Gn(l, l.stylesheets),
      0 < l.count || 0 < l.imgCount
        ? function (e) {
            var a = setTimeout(function () {
              if ((l.stylesheets && Gn(l, l.stylesheets), l.unsuspend)) {
                var n = l.unsuspend;
                ((l.unsuspend = null), n());
              }
            }, 6e4 + t);
            0 < l.imgBytes && sf === 0 && (sf = 62500 * Lm());
            var u = setTimeout(
              function () {
                if (
                  ((l.waitingForImages = !1), l.count === 0 && (l.stylesheets && Gn(l, l.stylesheets), l.unsuspend))
                ) {
                  var n = l.unsuspend;
                  ((l.unsuspend = null), n());
                }
              },
              (l.imgBytes > sf ? 50 : 800) + t
            );
            return (
              (l.unsuspend = e),
              function () {
                ((l.unsuspend = null), clearTimeout(a), clearTimeout(u));
              }
            );
          }
        : null
    );
  }
  function Bn() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Gn(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        ((this.unsuspend = null), l());
      }
    }
  }
  var Yn = null;
  function Gn(l, t) {
    ((l.stylesheets = null),
      l.unsuspend !== null && (l.count++, (Yn = new Map()), t.forEach(r1, l), (Yn = null), Bn.call(l)));
  }
  function r1(l, t) {
    if (!(t.state.loading & 4)) {
      var e = Yn.get(l);
      if (e) var a = e.get(null);
      else {
        ((e = new Map()), Yn.set(l, e));
        for (var u = l.querySelectorAll('link[data-precedence],style[data-precedence]'), n = 0; n < u.length; n++) {
          var i = u[n];
          (i.nodeName === 'LINK' || i.getAttribute('media') !== 'not all') && (e.set(i.dataset.precedence, i), (a = i));
        }
        a && e.set(null, a);
      }
      ((u = t.instance),
        (i = u.getAttribute('data-precedence')),
        (n = e.get(i) || a),
        n === a && e.set(null, u),
        e.set(i, u),
        this.count++,
        (a = Bn.bind(this)),
        u.addEventListener('load', a),
        u.addEventListener('error', a),
        n
          ? n.parentNode.insertBefore(u, n.nextSibling)
          : ((l = l.nodeType === 9 ? l.head : l), l.insertBefore(u, l.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var pu = { $$typeof: fl, Provider: null, Consumer: null, _currentValue: O, _currentValue2: O, _threadCount: 0 };
  function d1(l, t, e, a, u, n, i, c, f) {
    ((this.tag = 1),
      (this.containerInfo = l),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null),
      (this.callbackPriority = 0),
      (this.expirationTimes = ai(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = ai(0)),
      (this.hiddenUpdates = ai(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = u),
      (this.onCaughtError = n),
      (this.onRecoverableError = i),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = f),
      (this.incompleteTransitions = new Map()));
  }
  function v0(l, t, e, a, u, n, i, c, f, h, S, _) {
    return (
      (l = new d1(l, t, e, i, f, h, S, _, c)),
      (t = 1),
      n === !0 && (t |= 24),
      (n = ct(3, null, null, t)),
      (l.current = n),
      (n.stateNode = l),
      (t = Qi()),
      t.refCount++,
      (l.pooledCache = t),
      t.refCount++,
      (n.memoizedState = { element: a, isDehydrated: e, cache: t }),
      Ki(n),
      l
    );
  }
  function g0(l) {
    return l ? ((l = na), l) : na;
  }
  function b0(l, t, e, a, u, n) {
    ((u = g0(u)),
      a.context === null ? (a.context = u) : (a.pendingContext = u),
      (a = fe(t)),
      (a.payload = { element: e }),
      (n = n === void 0 ? null : n),
      n !== null && (a.callback = n),
      (e = se(l, a, t)),
      e !== null && (et(e, l, t), Fa(e, l, t)));
  }
  function p0(l, t) {
    if (((l = l.memoizedState), l !== null && l.dehydrated !== null)) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function of(l, t) {
    (p0(l, t), (l = l.alternate) && p0(l, t));
  }
  function S0(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Ue(l, 67108864);
      (t !== null && et(t, l, 67108864), of(l, 67108864));
    }
  }
  function z0(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = dt();
      t = ui(t);
      var e = Ue(l, t);
      (e !== null && et(e, l, t), of(l, t));
    }
  }
  var Xn = !0;
  function m1(l, t, e, a) {
    var u = z.T;
    z.T = null;
    var n = N.p;
    try {
      ((N.p = 2), rf(l, t, e, a));
    } finally {
      ((N.p = n), (z.T = u));
    }
  }
  function y1(l, t, e, a) {
    var u = z.T;
    z.T = null;
    var n = N.p;
    try {
      ((N.p = 8), rf(l, t, e, a));
    } finally {
      ((N.p = n), (z.T = u));
    }
  }
  function rf(l, t, e, a) {
    if (Xn) {
      var u = df(a);
      if (u === null) ($c(l, t, a, Qn, e), E0(l, a));
      else if (v1(u, l, t, e, a)) a.stopPropagation();
      else if ((E0(l, a), t & 4 && -1 < h1.indexOf(l))) {
        for (; u !== null; ) {
          var n = ke(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (((n = n.stateNode), n.current.memoizedState.isDehydrated)) {
                  var i = Me(n.pendingLanes);
                  if (i !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var f = 1 << (31 - nt(i));
                      ((c.entanglements[1] |= f), (i &= ~f));
                    }
                    (jt(n), (il & 6) === 0 && ((En = at() + 500), mu(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((c = Ue(n, 2)), c !== null && et(c, n, 2), An(), of(n, 2));
            }
          if (((n = df(a)), n === null && $c(l, t, a, Qn, e), n === u)) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else $c(l, t, a, null, e);
    }
  }
  function df(l) {
    return ((l = mi(l)), mf(l));
  }
  var Qn = null;
  function mf(l) {
    if (((Qn = null), (l = we(l)), l !== null)) {
      var t = C(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (((l = B(t)), l !== null)) return l;
          l = null;
        } else if (e === 31) {
          if (((l = Z(t)), l !== null)) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return ((Qn = l), null);
  }
  function T0(l) {
    switch (l) {
      case 'beforetoggle':
      case 'cancel':
      case 'click':
      case 'close':
      case 'contextmenu':
      case 'copy':
      case 'cut':
      case 'auxclick':
      case 'dblclick':
      case 'dragend':
      case 'dragstart':
      case 'drop':
      case 'focusin':
      case 'focusout':
      case 'input':
      case 'invalid':
      case 'keydown':
      case 'keypress':
      case 'keyup':
      case 'mousedown':
      case 'mouseup':
      case 'paste':
      case 'pause':
      case 'play':
      case 'pointercancel':
      case 'pointerdown':
      case 'pointerup':
      case 'ratechange':
      case 'reset':
      case 'resize':
      case 'seeked':
      case 'submit':
      case 'toggle':
      case 'touchcancel':
      case 'touchend':
      case 'touchstart':
      case 'volumechange':
      case 'change':
      case 'selectionchange':
      case 'textInput':
      case 'compositionstart':
      case 'compositionend':
      case 'compositionupdate':
      case 'beforeblur':
      case 'afterblur':
      case 'beforeinput':
      case 'blur':
      case 'fullscreenchange':
      case 'focus':
      case 'hashchange':
      case 'popstate':
      case 'select':
      case 'selectstart':
        return 2;
      case 'drag':
      case 'dragenter':
      case 'dragexit':
      case 'dragleave':
      case 'dragover':
      case 'mousemove':
      case 'mouseout':
      case 'mouseover':
      case 'pointermove':
      case 'pointerout':
      case 'pointerover':
      case 'scroll':
      case 'touchmove':
      case 'wheel':
      case 'mouseenter':
      case 'mouseleave':
      case 'pointerenter':
      case 'pointerleave':
        return 8;
      case 'message':
        switch (ld()) {
          case Df:
            return 2;
          case Nf:
            return 8;
          case Du:
          case td:
            return 32;
          case Cf:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var yf = !1,
    Se = null,
    ze = null,
    Te = null,
    Su = new Map(),
    zu = new Map(),
    Ee = [],
    h1 =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function E0(l, t) {
    switch (l) {
      case 'focusin':
      case 'focusout':
        Se = null;
        break;
      case 'dragenter':
      case 'dragleave':
        ze = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Te = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Su.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        zu.delete(t.pointerId);
    }
  }
  function Tu(l, t, e, a, u, n) {
    return l === null || l.nativeEvent !== n
      ? ((l = { blockedOn: t, domEventName: e, eventSystemFlags: a, nativeEvent: n, targetContainers: [u] }),
        t !== null && ((t = ke(t)), t !== null && S0(t)),
        l)
      : ((l.eventSystemFlags |= a), (t = l.targetContainers), u !== null && t.indexOf(u) === -1 && t.push(u), l);
  }
  function v1(l, t, e, a, u) {
    switch (t) {
      case 'focusin':
        return ((Se = Tu(Se, l, t, e, a, u)), !0);
      case 'dragenter':
        return ((ze = Tu(ze, l, t, e, a, u)), !0);
      case 'mouseover':
        return ((Te = Tu(Te, l, t, e, a, u)), !0);
      case 'pointerover':
        var n = u.pointerId;
        return (Su.set(n, Tu(Su.get(n) || null, l, t, e, a, u)), !0);
      case 'gotpointercapture':
        return ((n = u.pointerId), zu.set(n, Tu(zu.get(n) || null, l, t, e, a, u)), !0);
    }
    return !1;
  }
  function _0(l) {
    var t = we(l.target);
    if (t !== null) {
      var e = C(t);
      if (e !== null) {
        if (((t = e.tag), t === 13)) {
          if (((t = B(e)), t !== null)) {
            ((l.blockedOn = t),
              Bf(l.priority, function () {
                z0(e);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = Z(e)), t !== null)) {
            ((l.blockedOn = t),
              Bf(l.priority, function () {
                z0(e);
              }));
            return;
          }
        } else if (t === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Vn(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = df(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(e.type, e);
        ((di = a), e.target.dispatchEvent(a), (di = null));
      } else return ((t = ke(e)), t !== null && S0(t), (l.blockedOn = e), !1);
      t.shift();
    }
    return !0;
  }
  function A0(l, t, e) {
    Vn(l) && e.delete(t);
  }
  function g1() {
    ((yf = !1),
      Se !== null && Vn(Se) && (Se = null),
      ze !== null && Vn(ze) && (ze = null),
      Te !== null && Vn(Te) && (Te = null),
      Su.forEach(A0),
      zu.forEach(A0));
  }
  function Zn(l, t) {
    l.blockedOn === t &&
      ((l.blockedOn = null), yf || ((yf = !0), d.unstable_scheduleCallback(d.unstable_NormalPriority, g1)));
  }
  var Ln = null;
  function x0(l) {
    Ln !== l &&
      ((Ln = l),
      d.unstable_scheduleCallback(d.unstable_NormalPriority, function () {
        Ln === l && (Ln = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t],
            a = l[t + 1],
            u = l[t + 2];
          if (typeof a != 'function') {
            if (mf(a || e) === null) continue;
            break;
          }
          var n = ke(e);
          n !== null && (l.splice(t, 3), (t -= 3), rc(n, { pending: !0, data: u, method: e.method, action: a }, a, u));
        }
      }));
  }
  function Da(l) {
    function t(f) {
      return Zn(f, l);
    }
    (Se !== null && Zn(Se, l), ze !== null && Zn(ze, l), Te !== null && Zn(Te, l), Su.forEach(t), zu.forEach(t));
    for (var e = 0; e < Ee.length; e++) {
      var a = Ee[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Ee.length && ((e = Ee[0]), e.blockedOn === null); ) (_0(e), e.blockedOn === null && Ee.shift());
    if (((e = (l.ownerDocument || l).$$reactFormReplay), e != null))
      for (a = 0; a < e.length; a += 3) {
        var u = e[a],
          n = e[a + 1],
          i = u[$l] || null;
        if (typeof n == 'function') i || x0(e);
        else if (i) {
          var c = null;
          if (n && n.hasAttribute('formAction')) {
            if (((u = n), (i = n[$l] || null))) c = i.formAction;
            else if (mf(u) !== null) continue;
          } else c = i.action;
          (typeof c == 'function' ? (e[a + 1] = c) : (e.splice(a, 3), (a -= 3)), x0(e));
        }
      }
  }
  function M0() {
    function l(n) {
      n.canIntercept &&
        n.info === 'react-transition' &&
        n.intercept({
          handler: function () {
            return new Promise(function (i) {
              return (u = i);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function t() {
      (u !== null && (u(), (u = null)), a || setTimeout(e, 20));
    }
    function e() {
      if (!a && !navigation.transition) {
        var n = navigation.currentEntry;
        n &&
          n.url != null &&
          navigation.navigate(n.url, { state: n.getState(), info: 'react-transition', history: 'replace' });
      }
    }
    if (typeof navigation == 'object') {
      var a = !1,
        u = null;
      return (
        navigation.addEventListener('navigate', l),
        navigation.addEventListener('navigatesuccess', t),
        navigation.addEventListener('navigateerror', t),
        setTimeout(e, 100),
        function () {
          ((a = !0),
            navigation.removeEventListener('navigate', l),
            navigation.removeEventListener('navigatesuccess', t),
            navigation.removeEventListener('navigateerror', t),
            u !== null && (u(), (u = null)));
        }
      );
    }
  }
  function hf(l) {
    this._internalRoot = l;
  }
  ((Kn.prototype.render = hf.prototype.render =
    function (l) {
      var t = this._internalRoot;
      if (t === null) throw Error(s(409));
      var e = t.current,
        a = dt();
      b0(e, a, l, t, null, null);
    }),
    (Kn.prototype.unmount = hf.prototype.unmount =
      function () {
        var l = this._internalRoot;
        if (l !== null) {
          this._internalRoot = null;
          var t = l.containerInfo;
          (b0(l.current, 2, null, l, null, null), An(), (t[Je] = null));
        }
      }));
  function Kn(l) {
    this._internalRoot = l;
  }
  Kn.prototype.unstable_scheduleHydration = function (l) {
    if (l) {
      var t = qf();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Ee.length && t !== 0 && t < Ee[e].priority; e++);
      (Ee.splice(e, 0, l), e === 0 && _0(l));
    }
  };
  var O0 = M.version;
  if (O0 !== '19.2.4') throw Error(s(527, O0, '19.2.4'));
  N.findDOMNode = function (l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == 'function' ? Error(s(188)) : ((l = Object.keys(l).join(',')), Error(s(268, l)));
    return ((l = p(t)), (l = l !== null ? Q(l) : null), (l = l === null ? null : l.stateNode), l);
  };
  var b1 = {
    bundleType: 0,
    version: '19.2.4',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: z,
    reconcilerVersion: '19.2.4',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Jn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Jn.isDisabled && Jn.supportsFiber)
      try {
        ((Ca = Jn.inject(b1)), (ut = Jn));
      } catch {}
  }
  return (
    (_u.createRoot = function (l, t) {
      if (!A(l)) throw Error(s(299));
      var e = !1,
        a = '',
        u = Ho,
        n = qo,
        i = Bo;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (e = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (u = t.onUncaughtError),
          t.onCaughtError !== void 0 && (n = t.onCaughtError),
          t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
        (t = v0(l, 1, !1, null, null, e, a, null, u, n, i, M0)),
        (l[Je] = t.current),
        Wc(l),
        new hf(t)
      );
    }),
    (_u.hydrateRoot = function (l, t, e) {
      if (!A(l)) throw Error(s(299));
      var a = !1,
        u = '',
        n = Ho,
        i = qo,
        c = Bo,
        f = null;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (a = !0),
          e.identifierPrefix !== void 0 && (u = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (n = e.onUncaughtError),
          e.onCaughtError !== void 0 && (i = e.onCaughtError),
          e.onRecoverableError !== void 0 && (c = e.onRecoverableError),
          e.formState !== void 0 && (f = e.formState)),
        (t = v0(l, 1, !0, t, e ?? null, a, u, f, n, i, c, M0)),
        (t.context = g0(null)),
        (e = t.current),
        (a = dt()),
        (a = ui(a)),
        (u = fe(a)),
        (u.callback = null),
        se(e, u, a),
        (e = a),
        (t.current.lanes = e),
        ja(t, e),
        jt(t),
        (l[Je] = t.current),
        Wc(l),
        new Kn(t)
      );
    }),
    (_u.version = '19.2.4'),
    _u
  );
}
var Y0;
function D1() {
  if (Y0) return bf.exports;
  Y0 = 1;
  function d() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(d);
      } catch (M) {
        console.error(M);
      }
  }
  return (d(), (bf.exports = O1()), bf.exports);
}
var N1 = D1();
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const C1 = (d) => d.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  k0 = (...d) =>
    d
      .filter((M, b, s) => !!M && M.trim() !== '' && s.indexOf(M) === b)
      .join(' ')
      .trim();
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var U1 = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const j1 = Ul.forwardRef(
  (
    {
      color: d = 'currentColor',
      size: M = 24,
      strokeWidth: b = 2,
      absoluteStrokeWidth: s,
      className: A = '',
      children: C,
      iconNode: B,
      ...Z
    },
    j
  ) =>
    Ul.createElement(
      'svg',
      {
        ref: j,
        ...U1,
        width: M,
        height: M,
        stroke: d,
        strokeWidth: s ? (Number(b) * 24) / Number(M) : b,
        className: k0('lucide', A),
        ...Z,
      },
      [...B.map(([p, Q]) => Ul.createElement(p, Q)), ...(Array.isArray(C) ? C : [C])]
    )
);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Kl = (d, M) => {
  const b = Ul.forwardRef(({ className: s, ...A }, C) =>
    Ul.createElement(j1, { ref: C, iconNode: M, className: k0(`lucide-${C1(d)}`, s), ...A })
  );
  return ((b.displayName = `${d}`), b);
};
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const R1 = Kl('ChartNoAxesColumn', [
  ['line', { x1: '18', x2: '18', y1: '20', y2: '10', key: '1xfpm4' }],
  ['line', { x1: '12', x2: '12', y1: '20', y2: '4', key: 'be30l9' }],
  ['line', { x1: '6', x2: '6', y1: '20', y2: '14', key: '1r4le6' }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const H1 = Kl('CircleCheckBig', [
  ['path', { d: 'M21.801 10A10 10 0 1 1 17 3.335', key: 'yps3ct' }],
  ['path', { d: 'm9 11 3 3L22 4', key: '1pflzl' }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const q1 = Kl('Clock', [
  ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ['polyline', { points: '12 6 12 12 16 14', key: '68esgv' }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const B1 = Kl('DollarSign', [
  ['line', { x1: '12', x2: '12', y1: '2', y2: '22', key: '7eqyqh' }],
  ['path', { d: 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', key: '1b0p4s' }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Y1 = Kl('Heart', [
  [
    'path',
    {
      d: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z',
      key: 'c3ymky',
    },
  ],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const G1 = Kl('Layers', [
  [
    'path',
    {
      d: 'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z',
      key: 'zw3jo',
    },
  ],
  ['path', { d: 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12', key: '1wduqc' }],
  ['path', { d: 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17', key: 'kqbvx6' }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const X1 = Kl('Pause', [
  ['rect', { x: '14', y: '4', width: '4', height: '16', rx: '1', key: 'zuxfzm' }],
  ['rect', { x: '6', y: '4', width: '4', height: '16', rx: '1', key: '1okwgv' }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Q1 = Kl('Play', [['polygon', { points: '6 3 20 12 6 21 6 3', key: '1oa8hb' }]]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const V1 = Kl('Settings', [
  [
    'path',
    {
      d: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z',
      key: '1qme2f',
    },
  ],
  ['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Z1 = Kl('ShoppingBag', [
  ['path', { d: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z', key: 'hou9p0' }],
  ['path', { d: 'M3 6h18', key: 'd0wm0j' }],
  ['path', { d: 'M16 10a4 4 0 0 1-8 0', key: '1ltviw' }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const W0 = Kl('TrendingUp', [
  ['polyline', { points: '22 7 13.5 15.5 8.5 10.5 2 17', key: '126l90' }],
  ['polyline', { points: '16 7 22 7 22 13', key: 'kwv8wd' }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ef = Kl('TriangleAlert', [
  ['path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', key: 'wmoenq' }],
  ['path', { d: 'M12 9v4', key: 'juzpu7' }],
  ['path', { d: 'M12 17h.01', key: 'p32p05' }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $n = Kl('Users', [
  ['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', key: '1yyitq' }],
  ['circle', { cx: '9', cy: '7', r: '4', key: 'nufk8' }],
  ['path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87', key: 'kshegd' }],
  ['path', { d: 'M16 3.13a4 4 0 0 1 0 7.75', key: '1da9ce' }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Wn = Kl('Wrench', [
  [
    'path',
    {
      d: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
      key: 'cbrjhi',
    },
  ],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const L1 = Kl('X', [
  ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
  ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const K1 = Kl('Zap', [
    [
      'path',
      {
        d: 'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z',
        key: '1xq2db',
      },
    ],
  ]),
  G0 = (d) => Symbol.iterator in d,
  X0 = (d) => 'entries' in d,
  Q0 = (d, M) => {
    const b = d instanceof Map ? d : new Map(d.entries()),
      s = M instanceof Map ? M : new Map(M.entries());
    if (b.size !== s.size) return !1;
    for (const [A, C] of b) if (!s.has(A) || !Object.is(C, s.get(A))) return !1;
    return !0;
  },
  J1 = (d, M) => {
    const b = d[Symbol.iterator](),
      s = M[Symbol.iterator]();
    let A = b.next(),
      C = s.next();
    for (; !A.done && !C.done; ) {
      if (!Object.is(A.value, C.value)) return !1;
      ((A = b.next()), (C = s.next()));
    }
    return !!A.done && !!C.done;
  };
function w1(d, M) {
  return Object.is(d, M)
    ? !0
    : typeof d != 'object' ||
        d === null ||
        typeof M != 'object' ||
        M === null ||
        Object.getPrototypeOf(d) !== Object.getPrototypeOf(M)
      ? !1
      : G0(d) && G0(M)
        ? X0(d) && X0(M)
          ? Q0(d, M)
          : J1(d, M)
        : Q0({ entries: () => Object.entries(d) }, { entries: () => Object.entries(M) });
}
function k1(d) {
  const M = xu.useRef(void 0);
  return (b) => {
    const s = d(b);
    return w1(M.current, s) ? M.current : (M.current = s);
  };
}
const V0 = (d) => {
    let M;
    const b = new Set(),
      s = (p, Q) => {
        const D = typeof p == 'function' ? p(M) : p;
        if (!Object.is(D, M)) {
          const K = M;
          ((M = (Q ?? (typeof D != 'object' || D === null)) ? D : Object.assign({}, M, D)),
            b.forEach((Sl) => Sl(M, K)));
        }
      },
      A = () => M,
      Z = { setState: s, getState: A, getInitialState: () => j, subscribe: (p) => (b.add(p), () => b.delete(p)) },
      j = (M = d(s, A, Z));
    return Z;
  },
  W1 = (d) => (d ? V0(d) : V0),
  $1 = (d) => d;
function F1(d, M = $1) {
  const b = xu.useSyncExternalStore(
    d.subscribe,
    xu.useCallback(() => M(d.getState()), [d, M]),
    xu.useCallback(() => M(d.getInitialState()), [d, M])
  );
  return (xu.useDebugValue(b), b);
}
const Z0 = (d) => {
    const M = W1(d),
      b = (s) => F1(M, s);
    return (Object.assign(b, M), b);
  },
  I1 = (d) => (d ? Z0(d) : Z0),
  P1 = [
    {
      id: 'ferris_wheel',
      name: 'Ferris Wheel',
      icon: '🎡',
      thrillLevel: 1,
      baseCostPerTick: 8,
      baseCapacity: 32,
      breakdownChance: 0.03,
      repairTime: 15,
      unlockCost: 0,
      attractedVisitors: ['family', 'child', 'elderly'],
      description: 'A classic slow ride with panoramic views. Low thrill, high appeal.',
      gridColor: '#06b6d4',
    },
    {
      id: 'carousel',
      name: 'Carousel',
      icon: '🎠',
      thrillLevel: 1,
      baseCostPerTick: 5,
      baseCapacity: 24,
      breakdownChance: 0.02,
      repairTime: 10,
      unlockCost: 150,
      attractedVisitors: ['child', 'family'],
      description: 'Kids and families love the spinning horses.',
      gridColor: '#ec4899',
    },
    {
      id: 'roller_coaster',
      name: 'Roller Coaster',
      icon: '🎢',
      thrillLevel: 5,
      baseCostPerTick: 25,
      baseCapacity: 16,
      breakdownChance: 0.12,
      repairTime: 45,
      unlockCost: 800,
      attractedVisitors: ['thrill_seeker', 'teen'],
      description: 'The main attraction. Breaks down often but earns big.',
      gridColor: '#f97316',
    },
    {
      id: 'haunted_house',
      name: 'Haunted House',
      icon: '👻',
      thrillLevel: 3,
      baseCostPerTick: 15,
      baseCapacity: 20,
      breakdownChance: 0.06,
      repairTime: 25,
      unlockCost: 400,
      attractedVisitors: ['teen', 'thrill_seeker', 'family'],
      description: 'A spooky walkthrough attraction. Popular year round.',
      gridColor: '#a78bfa',
    },
    {
      id: 'water_ride',
      name: 'Water Ride',
      icon: '💦',
      thrillLevel: 3,
      baseCostPerTick: 20,
      baseCapacity: 20,
      breakdownChance: 0.08,
      repairTime: 35,
      unlockCost: 600,
      attractedVisitors: ['family', 'teen', 'thrill_seeker'],
      description: 'Guests get soaked on this log flume. Creates lots of dirt.',
      gridColor: '#22c55e',
    },
    {
      id: 'bumper_cars',
      name: 'Bumper Cars',
      icon: '🚗',
      thrillLevel: 2,
      baseCostPerTick: 12,
      baseCapacity: 20,
      breakdownChance: 0.07,
      repairTime: 20,
      unlockCost: 300,
      attractedVisitors: ['teen', 'family', 'child'],
      description: 'Friendly chaos for all ages. Frequently needs maintenance.',
      gridColor: '#eab308',
    },
  ],
  kn = (d) => P1.find((M) => M.id === d),
  ly = [
    {
      id: 'marketing_1',
      name: 'Flyer Campaign',
      description: 'Attract 25% more visitors to the park',
      cost: 200,
      effect: 'visitor_attraction',
      value: 0.25,
    },
    {
      id: 'marketing_2',
      name: 'Billboard Ads',
      description: 'Attract 50% more visitors to the park',
      cost: 800,
      effect: 'visitor_attraction',
      value: 0.5,
      requires: 'marketing_1',
    },
    {
      id: 'auto_clean',
      name: 'Hire Janitor',
      description: 'Automatically cleans park dirt over time',
      cost: 350,
      effect: 'auto_clean',
      value: 1,
    },
    {
      id: 'ferris_auto_repair',
      name: 'Ferris Auto-Repair',
      description: 'Ferris Wheel repairs itself automatically',
      cost: 300,
      rideId: 'ferris_wheel',
      effect: 'auto_repair',
      value: 1,
    },
    {
      id: 'ferris_capacity',
      name: 'Ferris Gondolas+',
      description: 'Ferris Wheel carries 50% more guests',
      cost: 400,
      rideId: 'ferris_wheel',
      effect: 'capacity_boost',
      value: 0.5,
    },
    {
      id: 'carousel_auto_repair',
      name: 'Carousel Auto-Repair',
      description: 'Carousel repairs itself automatically',
      cost: 200,
      rideId: 'carousel',
      effect: 'auto_repair',
      value: 1,
    },
    {
      id: 'carousel_income',
      name: 'Premium Carousel',
      description: 'Carousel earns 40% more per guest',
      cost: 350,
      rideId: 'carousel',
      effect: 'income_boost',
      value: 0.4,
    },
    {
      id: 'coaster_auto_repair',
      name: 'Coaster Maintenance Crew',
      description: 'Roller Coaster repairs itself automatically',
      cost: 1200,
      rideId: 'roller_coaster',
      effect: 'auto_repair',
      value: 1,
    },
    {
      id: 'coaster_breakdown',
      name: 'Coaster Reliability Kit',
      description: 'Roller Coaster breaks down 40% less often',
      cost: 900,
      rideId: 'roller_coaster',
      effect: 'breakdown_reduction',
      value: 0.4,
    },
    {
      id: 'coaster_income',
      name: 'VIP Coaster Seating',
      description: 'Roller Coaster earns 60% more per guest',
      cost: 1500,
      rideId: 'roller_coaster',
      effect: 'income_boost',
      value: 0.6,
      requires: 'coaster_breakdown',
    },
    {
      id: 'haunted_auto_repair',
      name: 'Ghost Crew',
      description: 'Haunted House repairs itself automatically',
      cost: 500,
      rideId: 'haunted_house',
      effect: 'auto_repair',
      value: 1,
    },
    {
      id: 'haunted_income',
      name: 'Horror Overhaul',
      description: 'Haunted House earns 50% more per guest',
      cost: 700,
      rideId: 'haunted_house',
      effect: 'income_boost',
      value: 0.5,
    },
    {
      id: 'water_auto_repair',
      name: 'Water Pump Maintenance',
      description: 'Water Ride repairs itself automatically',
      cost: 600,
      rideId: 'water_ride',
      effect: 'auto_repair',
      value: 1,
    },
    {
      id: 'water_breakdown',
      name: 'Flood-Proof Systems',
      description: 'Water Ride breaks down 30% less often',
      cost: 450,
      rideId: 'water_ride',
      effect: 'breakdown_reduction',
      value: 0.3,
    },
    {
      id: 'bumper_auto_repair',
      name: 'Bumper Auto-Repair',
      description: 'Bumper Cars repair themselves automatically',
      cost: 400,
      rideId: 'bumper_cars',
      effect: 'auto_repair',
      value: 1,
    },
    {
      id: 'bumper_capacity',
      name: 'More Cars',
      description: 'Bumper Cars carry 40% more guests',
      cost: 500,
      rideId: 'bumper_cars',
      effect: 'capacity_boost',
      value: 0.4,
    },
  ],
  mt = (d) => ly.find((M) => M.id === d),
  ty = (d, M) =>
    d.some((b) => {
      const s = mt(b);
      return (s == null ? void 0 : s.rideId) === M && (s == null ? void 0 : s.effect) === 'auto_repair';
    }),
  ey = 1e3,
  L0 = ['family', 'thrill_seeker', 'child', 'elderly', 'teen'];
function Af() {
  return Math.random().toString(36).slice(2, 9);
}
function $0(d) {
  return {
    definitionId: d,
    instanceId: Af(),
    status: 'operating',
    dirtLevel: 0,
    currentVisitors: 0,
    totalVisitorsServed: 0,
    repairProgress: 0,
    isAutoRepair: !1,
    level: 1,
    ticksSinceLastBreakdown: 0,
  };
}
function Au(d, M, b) {
  return { id: Af(), type: d, message: M, timestamp: Date.now(), rideInstanceId: b };
}
const ay = {
    money: 500,
    rides: [$0('ferris_wheel')],
    visitors: [],
    parkDirt: 0,
    parkHappiness: 80,
    notifications: [],
    purchasedUpgrades: [],
    stats: { totalEarnings: 0, totalVisitors: 0, peakVisitors: 0, ridesFixed: 0, timePlayed: 0 },
    gameTick: 0,
    isPaused: !1,
    isAutoCleanEnabled: !1,
    selectedRideId: null,
  },
  Pt = I1((d, M) => ({
    ...ay,
    tick: () => {
      const b = M();
      if (b.isPaused) return;
      const s = [];
      let A = 0;
      const C = b.rides.map((J) => {
          const fl = kn(J.definitionId);
          if (!fl) return J;
          const G = { ...J },
            Vl = b.purchasedUpgrades
              .map((ol) => mt(ol))
              .filter(
                (ol) =>
                  (ol == null ? void 0 : ol.rideId) === J.definitionId &&
                  (ol == null ? void 0 : ol.effect) === 'breakdown_reduction'
              )
              .reduce((ol, Zl) => ol + ((Zl == null ? void 0 : Zl.value) ?? 0), 0),
            $ = (fl.breakdownChance * (1 - Vl)) / 60;
          if (G.status === 'operating') {
            G.ticksSinceLastBreakdown++;
            const ol = b.purchasedUpgrades.some((O) => {
                var V, ll;
                return (
                  ((V = mt(O)) == null ? void 0 : V.rideId) === J.definitionId &&
                  ((ll = mt(O)) == null ? void 0 : ll.effect) === 'income_boost'
                );
              }),
              Zl = b.purchasedUpgrades
                .map((O) => mt(O))
                .filter(
                  (O) =>
                    (O == null ? void 0 : O.rideId) === J.definitionId &&
                    (O == null ? void 0 : O.effect) === 'income_boost'
                )
                .reduce((O, V) => O + ((V == null ? void 0 : V.value) ?? 0), 0),
              yt = b.purchasedUpgrades.some((O) => {
                var V, ll;
                return (
                  ((V = mt(O)) == null ? void 0 : V.rideId) === J.definitionId &&
                  ((ll = mt(O)) == null ? void 0 : ll.effect) === 'capacity_boost'
                );
              })
                ? b.purchasedUpgrades
                    .map((O) => mt(O))
                    .filter(
                      (O) =>
                        (O == null ? void 0 : O.rideId) === J.definitionId &&
                        (O == null ? void 0 : O.effect) === 'capacity_boost'
                    )
                    .reduce((O, V) => O + ((V == null ? void 0 : V.value) ?? 0), 0)
                : 0,
              ql = Math.floor(fl.baseCapacity * (1 + yt)),
              Rt = b.purchasedUpgrades
                .map((O) => mt(O))
                .filter((O) => !(O != null && O.rideId) && (O == null ? void 0 : O.effect) === 'visitor_attraction')
                .reduce((O, V) => O + ((V == null ? void 0 : V.value) ?? 0), 0),
              xt = b.parkHappiness / 100,
              Wl = Math.max(0.3, 1 - G.dirtLevel / 100),
              z = Math.floor(ql * xt * Wl * (1 + Rt) * (Math.random() * 0.4 + 0.8));
            ((G.currentVisitors = Math.min(ql, z)), (G.totalVisitorsServed += G.currentVisitors));
            const N = Math.floor(G.currentVisitors * fl.baseCostPerTick * (ol ? 1 + Zl : 1) * Wl);
            ((A += N),
              (G.dirtLevel = Math.min(100, G.dirtLevel + 0.5 + (J.definitionId === 'water_ride' ? 1 : 0))),
              Math.random() < $ &&
                G.ticksSinceLastBreakdown > 30 &&
                ((G.status = 'broken'),
                (G.currentVisitors = 0),
                (G.ticksSinceLastBreakdown = 0),
                s.push(Au('breakdown', `${fl.name} has broken down!`, J.instanceId)),
                b.purchasedUpgrades.some((V) => {
                  var ll, r;
                  return (
                    ((ll = mt(V)) == null ? void 0 : ll.rideId) === J.definitionId &&
                    ((r = mt(V)) == null ? void 0 : r.effect) === 'auto_repair'
                  );
                }) && ((G.isAutoRepair = !0), (G.status = 'repairing'), (G.repairProgress = 0))));
          } else if (G.status === 'broken') G.currentVisitors = 0;
          else if (G.status === 'repairing') {
            const ol = 100 / fl.repairTime;
            ((G.repairProgress = Math.min(100, G.repairProgress + ol)),
              (G.currentVisitors = 0),
              G.repairProgress >= 100 &&
                ((G.status = 'operating'),
                (G.repairProgress = 0),
                s.push(Au('repair', `${fl.name} is back online!`, J.instanceId))));
          }
          return G;
        }),
        B = 0.2 + C.filter((J) => J.status === 'operating').length * 0.1;
      let Z = Math.min(100, b.parkDirt + B);
      b.isAutoCleanEnabled &&
        ((Z = Math.max(0, Z - 2)),
        C.forEach((J) => {
          J.dirtLevel = Math.max(0, J.dirtLevel - 1);
        }));
      const j = C.filter((J) => J.status === 'operating').length,
        p = C.filter((J) => J.status === 'broken').length,
        Q = C.reduce((J, fl) => J + fl.dirtLevel, 0) / Math.max(1, C.length),
        D = Math.max(10, 100 - Z * 0.3 - Q * 0.2 - p * 15 + j * 5),
        K = Math.max(0, Math.min(100, b.parkHappiness + (D - b.parkHappiness) * 0.05)),
        Sl = [...b.visitors];
      if (b.gameTick % 5 === 0 && j > 0) {
        const J = b.purchasedUpgrades
            .map((G) => mt(G))
            .filter((G) => !(G != null && G.rideId) && (G == null ? void 0 : G.effect) === 'visitor_attraction')
            .reduce((G, Hl) => G + ((Hl == null ? void 0 : Hl.value) ?? 0), 0),
          fl = Math.floor((1 + J) * (Math.random() < 0.5 ? 1 : 2));
        for (let G = 0; G < fl; G++) {
          const Hl = L0[Math.floor(Math.random() * L0.length)];
          Sl.push({
            id: Af(),
            type: Hl,
            size: Math.floor(Math.random() * 4) + 1,
            happiness: Math.floor(Math.random() * 30) + 70,
            spendingPower: Math.floor(Math.random() * 50) + 20,
            timeInPark: 0,
          });
        }
      }
      const cl = Sl.map((J) => ({
          ...J,
          timeInPark: J.timeInPark + 1,
          happiness: Math.max(0, J.happiness - Z / 200),
        })).filter((J) => J.timeInPark < 120 && J.happiness > 20),
        xl = cl.reduce((J, fl) => J + fl.size, 0),
        At = [...s, ...b.notifications].slice(0, 5),
        Jl = {
          ...b.stats,
          totalEarnings: b.stats.totalEarnings + A,
          totalVisitors: b.stats.totalVisitors + xl * 0.01,
          peakVisitors: Math.max(b.stats.peakVisitors, xl),
          timePlayed: b.stats.timePlayed + 1,
        };
      d({
        rides: C,
        money: b.money + A,
        parkDirt: Z,
        parkHappiness: K,
        visitors: cl,
        notifications: At,
        stats: Jl,
        gameTick: b.gameTick + 1,
      });
    },
    buyRide: (b) => {
      const s = M(),
        A = kn(b);
      if (!A || s.money < A.unlockCost || s.rides.some((B) => B.definitionId === b)) return;
      const C = $0(b);
      d({
        money: s.money - A.unlockCost,
        rides: [...s.rides, C],
        notifications: [Au('upgrade', `${A.name} has been added to the park!`), ...s.notifications].slice(0, 5),
      });
    },
    repairRide: (b) => {
      const s = M(),
        A = s.rides.find((B) => B.instanceId === b);
      if (!A || A.status !== 'broken') return;
      const C = kn(A.definitionId);
      d({
        rides: s.rides.map((B) =>
          B.instanceId === b ? { ...B, status: 'repairing', repairProgress: 0, isAutoRepair: !1 } : B
        ),
        notifications: [
          Au('repair', `Repairing ${(C == null ? void 0 : C.name) ?? 'ride'}...`, b),
          ...s.notifications,
        ].slice(0, 5),
      });
    },
    cleanPark: () => {
      d((b) => ({ parkDirt: 0, rides: b.rides.map((s) => ({ ...s, dirtLevel: 0 })) }));
    },
    buyUpgrade: (b) => {
      const s = M(),
        A = mt(b);
      if (
        !A ||
        s.money < A.cost ||
        s.purchasedUpgrades.includes(b) ||
        (A.requires && !s.purchasedUpgrades.includes(A.requires))
      )
        return;
      const C = {
        money: s.money - A.cost,
        purchasedUpgrades: [...s.purchasedUpgrades, b],
        notifications: [Au('upgrade', `Upgrade purchased: ${A.name}!`), ...s.notifications].slice(0, 5),
      };
      (A.effect === 'auto_clean' && (C.isAutoCleanEnabled = !0),
        A.effect === 'auto_repair' &&
          A.rideId &&
          (C.rides = s.rides.map((B) =>
            B.definitionId === A.rideId && B.status === 'broken'
              ? { ...B, status: 'repairing', repairProgress: 0, isAutoRepair: !0 }
              : B
          )),
        d(C));
    },
    selectRide: (b) => {
      d({ selectedRideId: b });
    },
    togglePause: () => {
      d((b) => ({ isPaused: !b.isPaused }));
    },
    dismissNotification: (b) => {
      d((s) => ({ notifications: s.notifications.filter((A) => A.id !== b) }));
    },
  }));
let Mu = null;
const uy = () => {
    Mu ||
      (Mu = setInterval(() => {
        Pt.getState().tick();
      }, ey));
  },
  ny = () => {
    Mu && (clearInterval(Mu), (Mu = null));
  },
  K0 = (d) => (d >= 1e6 ? `$${(d / 1e6).toFixed(1)}M` : d >= 1e3 ? `$${(d / 1e3).toFixed(1)}K` : `$${Math.floor(d)}`),
  iy = (d) => {
    const M = Math.floor(d / 60),
      b = d % 60;
    return `${M}:${b.toString().padStart(2, '0')}`;
  },
  Ke = Ul.memo(({ icon: d, label: M, value: b, color: s, glowClass: A }) =>
    T.jsxs('div', {
      className: `pixel-panel flex items-center gap-2 px-3 py-2 ${s} ${A} bg-[#1a1a35]`,
      children: [
        T.jsx('span', { className: 'opacity-80', children: d }),
        T.jsxs('div', {
          className: 'flex flex-col leading-none',
          children: [
            T.jsx('span', { className: 'text-[10px] font-medium tracking-widest uppercase opacity-50', children: M }),
            T.jsx(
              'span',
              { className: 'font-display animate-juicy-pop inline-block origin-left text-sm font-bold', children: b },
              b
            ),
          ],
        }),
      ],
    })
  );
Ke.displayName = 'StatPill';
const wn = {
    cash: T.jsx(B1, { size: 14, className: 'text-[#f97316]' }),
    guests: T.jsx($n, { size: 14, className: 'text-[#06b6d4]' }),
    earned: T.jsx(W0, { size: 14, className: 'text-[#a78bfa]' }),
    time: T.jsx(q1, { size: 14, className: 'text-slate-400' }),
  },
  cy = () => {
    const {
        money: d,
        visitors: M,
        parkHappiness: b,
        parkDirt: s,
        stats: A,
        isPaused: C,
        togglePause: B,
        gameTick: Z,
      } = Pt(
        k1((cl) => ({
          money: cl.money,
          visitors: cl.visitors,
          parkHappiness: cl.parkHappiness,
          parkDirt: cl.parkDirt,
          stats: cl.stats,
          isPaused: cl.isPaused,
          togglePause: cl.togglePause,
          gameTick: cl.gameTick,
        }))
      ),
      j = M.reduce((cl, xl) => cl + xl.size, 0),
      p = b >= 70 ? 'text-green-400' : b >= 40 ? 'text-yellow-400' : 'text-red-400',
      Q = s <= 30 ? 'text-green-400' : s <= 60 ? 'text-yellow-400' : 'text-red-400',
      D = s <= 20 ? 'Sparkling' : s <= 40 ? 'Clean' : s <= 70 ? 'Dirty' : 'Filthy',
      K = Ul.useMemo(() => T.jsx(Y1, { size: 14, className: p }), [p]),
      Sl = Ul.useMemo(() => T.jsx('span', { className: `text-xs font-bold ${Q}`, children: '🧹' }), [Q]);
    return T.jsxs('header', {
      className: 'flex shrink-0 items-center justify-between border-b border-[#2a2a50] bg-[#0d0d24] px-4 py-2',
      children: [
        T.jsxs('div', {
          className: 'flex items-center gap-3',
          children: [
            T.jsxs('div', {
              className: 'font-display neon-text-purple text-xl font-black tracking-tight text-[#a78bfa]',
              children: ['IDLE', T.jsx('span', { className: 'neon-text-orange text-[#f97316]', children: 'PARK' })],
            }),
            T.jsx('div', {
              className: 'hidden text-[10px] font-medium tracking-widest text-[#4a4a70] uppercase sm:block',
              children: 'Theme Park Tycoon',
            }),
          ],
        }),
        T.jsxs('div', {
          className: 'flex flex-wrap items-center gap-2',
          children: [
            T.jsx(Ke, {
              icon: wn.cash,
              label: 'Cash',
              value: K0(d),
              color: 'border-[#f97316]/30',
              glowClass: 'neon-border-orange',
            }),
            T.jsx(Ke, {
              icon: wn.guests,
              label: 'Guests',
              value: j.toString(),
              color: 'border-[#06b6d4]/30',
              glowClass: '',
            }),
            T.jsx(Ke, {
              icon: K,
              label: 'Happy',
              value: `${Math.round(b)}%`,
              color: b >= 70 ? 'border-green-500/30' : 'border-yellow-500/30',
              glowClass: '',
            }),
            T.jsx(Ke, {
              icon: Sl,
              label: 'Park',
              value: D,
              color: s <= 30 ? 'border-green-500/30' : s <= 60 ? 'border-yellow-500/30' : 'border-red-500/30',
              glowClass: '',
            }),
            T.jsx(Ke, {
              icon: wn.earned,
              label: 'Earned',
              value: K0(A.totalEarnings),
              color: 'border-[#7c3aed]/30',
              glowClass: '',
            }),
            T.jsx(Ke, { icon: wn.time, label: 'Time', value: iy(Z), color: 'border-slate-600/30', glowClass: '' }),
          ],
        }),
        T.jsxs('button', {
          onClick: B,
          className: `pixel-button flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-bold transition-all duration-200 ${C ? 'neon-border-orange border-[#f97316] bg-[#f97316]/10 text-[#f97316]' : 'border-[#7c3aed]/50 text-[#a78bfa] hover:border-[#7c3aed] hover:bg-[#7c3aed]/10'} `,
          'aria-label': C ? 'Resume game' : 'Pause game',
          children: [
            C ? T.jsx(Q1, { size: 14 }) : T.jsx(X1, { size: 14 }),
            T.jsx('span', { children: C ? 'PAUSED' : 'PAUSE' }),
          ],
        }),
      ],
    });
  },
  fy = 'modulepreload',
  sy = function (d) {
    return '/' + d;
  },
  J0 = {},
  xf = function (M, b, s) {
    let A = Promise.resolve();
    if (b && b.length > 0) {
      let B = function (p) {
        return Promise.all(
          p.map((Q) =>
            Promise.resolve(Q).then(
              (D) => ({ status: 'fulfilled', value: D }),
              (D) => ({ status: 'rejected', reason: D })
            )
          )
        );
      };
      document.getElementsByTagName('link');
      const Z = document.querySelector('meta[property=csp-nonce]'),
        j = (Z == null ? void 0 : Z.nonce) || (Z == null ? void 0 : Z.getAttribute('nonce'));
      A = B(
        b.map((p) => {
          if (((p = sy(p)), p in J0)) return;
          J0[p] = !0;
          const Q = p.endsWith('.css'),
            D = Q ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${p}"]${D}`)) return;
          const K = document.createElement('link');
          if (
            ((K.rel = Q ? 'stylesheet' : fy),
            Q || (K.as = 'script'),
            (K.crossOrigin = ''),
            (K.href = p),
            j && K.setAttribute('nonce', j),
            document.head.appendChild(K),
            Q)
          )
            return new Promise((Sl, cl) => {
              (K.addEventListener('load', Sl),
                K.addEventListener('error', () => cl(new Error(`Unable to preload CSS for ${p}`))));
            });
        })
      );
    }
    function C(B) {
      const Z = new Event('vite:preloadError', { cancelable: !0 });
      if (((Z.payload = B), window.dispatchEvent(Z), !Z.defaultPrevented)) throw B;
    }
    return A.then((B) => {
      for (const Z of B || []) Z.status === 'rejected' && C(Z.reason);
      return M().catch(C);
    });
  },
  oy = {
    operating: {
      label: 'OPEN',
      color: 'text-green-400',
      borderClass: 'border-green-500/40 neon-border-green',
      bgClass: 'bg-green-500/5',
      icon: T.jsx(H1, { size: 12 }),
    },
    broken: {
      label: 'BROKEN',
      color: 'text-red-400',
      borderClass: 'border-red-500/40 neon-border-red animate-pulse-neon',
      bgClass: 'bg-red-500/5',
      icon: T.jsx(Ef, { size: 12 }),
    },
    repairing: {
      label: 'REPAIRING',
      color: 'text-yellow-400',
      borderClass: 'border-yellow-500/40',
      bgClass: 'bg-yellow-500/5',
      icon: T.jsx(Wn, { size: 12 }),
    },
    idle: {
      label: 'IDLE',
      color: 'text-slate-400',
      borderClass: 'border-slate-600/40',
      bgClass: 'bg-slate-800/30',
      icon: null,
    },
    locked: {
      label: 'LOCKED',
      color: 'text-slate-500',
      borderClass: 'border-slate-700/40',
      bgClass: 'bg-slate-900/30',
      icon: null,
    },
  },
  w0 = ({ ride: d }) => {
    const M = d.definitionId,
      b = Pt((D) => D.repairRide),
      s = Pt((D) => D.selectRide),
      A = Pt((D) => D.selectedRideId),
      C = Pt(Ul.useCallback((D) => ty(D.purchasedUpgrades, M), [M])),
      B = kn(d.definitionId);
    if (!B) return null;
    const Z = A === d.instanceId,
      j = oy[d.status],
      p = Array.from({ length: 5 }, (D, K) => K < B.thrillLevel),
      Q = (D) => {
        (D.stopPropagation(), b(d.instanceId));
      };
    return T.jsxs('div', {
      onClick: () => s(Z ? null : d.instanceId),
      className: `pixel-panel relative cursor-pointer p-3 transition-all duration-200 select-none ${j.borderClass} ${j.bgClass} ${Z ? 'ring-neon-purple ring-offset-park-bg ring-2 ring-offset-1' : 'hover:brightness-125'} bg-park-card ${d.status === 'broken' ? 'animate-shake' : ''}`,
      role: 'button',
      'aria-label': `${B.name} - ${j.label}`,
      children: [
        T.jsxs('div', {
          className: 'mb-2 flex items-start justify-between',
          children: [
            T.jsxs('div', {
              className: 'flex items-center gap-2',
              children: [
                T.jsx('span', { className: 'text-2xl leading-none', children: B.icon }),
                T.jsxs('div', {
                  children: [
                    T.jsx('div', { className: 'text-xs leading-none font-bold text-white', children: B.name }),
                    T.jsxs('div', {
                      className: `mt-0.5 flex items-center gap-1 text-[10px] font-semibold ${j.color}`,
                      children: [j.icon, j.label],
                    }),
                  ],
                }),
              ],
            }),
            C &&
              T.jsxs('div', {
                className: 'bg-neon-purple/20 border-neon-purple/40 flex items-center gap-1 border px-1.5 py-0.5',
                children: [
                  T.jsx(K1, { size: 10, className: 'text-neon-violet' }),
                  T.jsx('span', { className: 'text-neon-violet text-[9px] font-bold', children: 'AUTO' }),
                ],
              }),
          ],
        }),
        T.jsxs('div', {
          className: 'mb-2 flex items-center gap-1',
          children: [
            T.jsx('span', { className: 'w-8 text-[9px] tracking-wider text-slate-500 uppercase', children: 'Thrill' }),
            T.jsx('div', {
              className: 'flex gap-0.5',
              children: p.map((D, K) =>
                T.jsx(
                  'div',
                  {
                    className: `h-1.5 w-3 ${D ? 'bg-neon-orange' : 'bg-park-border'}`,
                    style: D ? { boxShadow: '0 0 4px #f97316' } : void 0,
                  },
                  K
                )
              ),
            }),
          ],
        }),
        d.dirtLevel > 0 &&
          T.jsxs('div', {
            className: 'mb-2',
            children: [
              T.jsxs('div', {
                className: 'mb-0.5 flex justify-between text-[9px] text-slate-500',
                children: [
                  T.jsx('span', { className: 'tracking-wider uppercase', children: 'Dirt' }),
                  T.jsxs('span', { children: [Math.round(d.dirtLevel), '%'] }),
                ],
              }),
              T.jsx('div', {
                className: 'bg-park-border h-1 overflow-hidden',
                children: T.jsx('div', {
                  className: 'h-full transition-all duration-500',
                  style: {
                    width: `${d.dirtLevel}%`,
                    background: d.dirtLevel > 70 ? '#ef4444' : d.dirtLevel > 40 ? '#eab308' : '#8b7355',
                  },
                }),
              }),
            ],
          }),
        d.status === 'operating' &&
          T.jsxs('div', {
            className: 'flex items-center gap-1 text-[10px] text-slate-400',
            children: [
              T.jsx($n, { size: 10, className: 'text-neon-cyan' }),
              T.jsx('span', { className: 'font-medium', children: d.currentVisitors }),
              T.jsxs('span', { className: 'opacity-50', children: ['/ ', B.baseCapacity, ' guests'] }),
            ],
          }),
        d.status === 'repairing' &&
          T.jsxs('div', {
            children: [
              T.jsxs('div', {
                className: 'mb-0.5 flex justify-between text-[9px] text-yellow-400',
                children: [
                  T.jsxs('span', {
                    className: 'flex items-center gap-1 tracking-wider uppercase',
                    children: [T.jsx(Wn, { size: 9 }), d.isAutoRepair ? 'Auto Repair' : 'Repairing'],
                  }),
                  T.jsxs('span', { children: [Math.round(d.repairProgress), '%'] }),
                ],
              }),
              T.jsx('div', {
                className: 'bg-park-border h-1.5 overflow-hidden',
                children: T.jsx('div', {
                  className: 'h-full bg-yellow-400 transition-all duration-1000',
                  style: { width: `${d.repairProgress}%`, boxShadow: '0 0 6px #eab308' },
                }),
              }),
            ],
          }),
        d.status === 'broken' &&
          T.jsxs('button', {
            onClick: Q,
            className:
              'pixel-button bg-neon-orange/20 border-neon-orange/50 text-neon-orange hover:bg-neon-orange/30 neon-border-orange mt-2 flex w-full cursor-pointer items-center justify-center gap-2 py-1.5 text-[10px] font-bold tracking-wider uppercase transition-colors duration-150',
            'aria-label': `Repair ${B.name}`,
            children: [T.jsx(Wn, { size: 12 }), 'Repair Now'],
          }),
        Z &&
          T.jsx('div', {
            className: 'absolute top-1 right-1',
            children: T.jsx(V1, { size: 12, className: 'text-neon-purple animate-spin-slow' }),
          }),
        T.jsx('div', {
          className: 'absolute top-0 bottom-0 left-0 w-1 opacity-80',
          style: { background: B.gridColor, boxShadow: `0 0 8px ${B.gridColor}` },
        }),
      ],
    });
  },
  ry = Ul.lazy(() => xf(() => import('./ShopPanel-D0f46PjN.js'), []).then((d) => ({ default: d.ShopPanel }))),
  dy = Ul.lazy(() => xf(() => import('./VisitorPanel-QPg5a5TX.js'), []).then((d) => ({ default: d.VisitorPanel }))),
  my = Ul.lazy(() => xf(() => import('./StatsPanel-68V4CSqZ.js'), []).then((d) => ({ default: d.StatsPanel }))),
  Tf = T.jsx('div', { className: 'text-xs text-slate-500', role: 'status', children: 'Loading…' }),
  yy = [
    { id: 'rides', label: 'Rides', icon: T.jsx(G1, { size: 14 }) },
    { id: 'shop', label: 'Shop', icon: T.jsx(Z1, { size: 14 }) },
    { id: 'visitors', label: 'Guests', icon: T.jsx($n, { size: 14 }) },
    { id: 'stats', label: 'Stats', icon: T.jsx(R1, { size: 14 }) },
  ],
  hy = () => {
    const d = Pt((A) => A.rides),
      [M, b] = Ul.useState('rides'),
      s = d.filter((A) => A.status === 'broken').length;
    return T.jsxs('div', {
      className: 'flex flex-1 gap-0 overflow-hidden',
      children: [
        T.jsxs('main', {
          className: 'relative flex-1 overflow-hidden p-4',
          children: [
            T.jsx('div', {
              className: 'absolute inset-0 opacity-5',
              style: {
                backgroundImage: `
              linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)
            `,
                backgroundSize: '40px 40px',
              },
            }),
            T.jsx('div', {
              className: 'relative mb-4 flex items-center gap-3',
              children: T.jsxs('div', {
                children: [
                  T.jsxs('h1', {
                    className: 'font-display text-xl leading-none font-black text-white',
                    children: [
                      'Your ',
                      T.jsx('span', { className: 'neon-text-purple text-[#a78bfa]', children: 'Theme Park' }),
                    ],
                  }),
                  T.jsxs('p', {
                    className: 'mt-0.5 text-xs text-slate-500',
                    children: [
                      d.length,
                      ' ride',
                      d.length !== 1 ? 's' : '',
                      ' installed',
                      s > 0 &&
                        T.jsxs('span', {
                          className: 'animate-pulse-neon ml-2 font-semibold text-red-400',
                          children: ['⚠ ', s, ' broken'],
                        }),
                    ],
                  }),
                ],
              }),
            }),
            T.jsxs('div', {
              className:
                'relative grid max-h-[calc(100vh-160px)] grid-cols-2 gap-3 overflow-y-auto pb-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
              children: [
                d.map((A) => T.jsx(w0, { ride: A }, A.instanceId)),
                d.length === 0 &&
                  T.jsxs('div', {
                    className: 'col-span-full flex flex-col items-center justify-center py-16 text-slate-600',
                    children: [
                      T.jsx('div', { className: 'mb-3 text-4xl', children: '🎪' }),
                      T.jsx('div', { className: 'text-sm font-medium', children: 'Your park is empty' }),
                      T.jsx('div', { className: 'mt-1 text-xs', children: 'Buy a ride from the Shop to get started!' }),
                    ],
                  }),
                Array.from({ length: Math.max(0, 3 - d.length) }, (A, C) =>
                  T.jsx(
                    'div',
                    {
                      className:
                        'border-park-border/50 bg-park-card flex h-28 items-center justify-center border-2 border-dashed opacity-50',
                      children: T.jsx('span', { className: 'text-xl text-[#2a2a50]', children: '+' }),
                    },
                    `empty-${C}`
                  )
                ),
              ],
            }),
          ],
        }),
        T.jsxs('aside', {
          className: 'flex w-72 flex-col overflow-hidden border-l border-[#2a2a50] bg-[#0d0d24]',
          children: [
            T.jsx('div', {
              className: 'flex shrink-0 border-b border-[#2a2a50]',
              children: yy.map((A) =>
                T.jsxs(
                  'button',
                  {
                    onClick: () => b(A.id),
                    className: `relative flex flex-1 cursor-pointer flex-col items-center gap-0.5 py-2.5 text-[9px] font-bold tracking-widest uppercase transition-colors duration-150 ${M === A.id ? 'bg-[#7c3aed]/10 text-[#a78bfa]' : 'text-slate-500 hover:text-slate-300'} `,
                    'aria-label': `Switch to ${A.label} tab`,
                    'aria-selected': M === A.id,
                    children: [
                      A.icon,
                      A.label,
                      A.id === 'rides' &&
                        s > 0 &&
                        T.jsx('span', {
                          className:
                            'absolute top-1 right-1 flex h-4 w-4 items-center justify-center bg-red-500 text-[8px] font-black text-white',
                          children: s,
                        }),
                      M === A.id && T.jsx('div', { className: 'bg-neon-purple absolute right-0 bottom-0 left-0 h-1' }),
                    ],
                  },
                  A.id
                )
              ),
            }),
            T.jsxs('div', {
              className: 'flex-1 overflow-y-auto p-3',
              children: [
                M === 'rides' &&
                  T.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      T.jsxs('div', {
                        className: 'mb-2 text-[10px] tracking-widest text-slate-500 uppercase',
                        children: [d.length, ' ride', d.length !== 1 ? 's' : '', ' — click to select'],
                      }),
                      d.map((A) => T.jsx(w0, { ride: A }, A.instanceId)),
                      d.length === 0 &&
                        T.jsx('div', {
                          className: 'py-8 text-center text-xs text-slate-600',
                          children: 'No rides yet. Visit the Shop tab!',
                        }),
                    ],
                  }),
                M === 'shop' && T.jsx(Ul.Suspense, { fallback: Tf, children: T.jsx(ry, {}) }),
                M === 'visitors' && T.jsx(Ul.Suspense, { fallback: Tf, children: T.jsx(dy, {}) }),
                M === 'stats' && T.jsx(Ul.Suspense, { fallback: Tf, children: T.jsx(my, {}) }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  vy = {
    breakdown: {
      icon: T.jsx(Ef, { size: 14 }),
      color: 'text-red-400',
      borderColor: 'border-red-500/50',
      bgColor: 'bg-red-500/10',
    },
    repair: {
      icon: T.jsx(Wn, { size: 14 }),
      color: 'text-yellow-400',
      borderColor: 'border-yellow-500/50',
      bgColor: 'bg-yellow-500/10',
    },
    visitor: {
      icon: T.jsx($n, { size: 14 }),
      color: 'text-[#06b6d4]',
      borderColor: 'border-cyan-500/50',
      bgColor: 'bg-cyan-500/10',
    },
    income: {
      icon: T.jsx('span', { className: 'text-xs font-bold', children: '$' }),
      color: 'text-[#f97316]',
      borderColor: 'border-orange-500/50',
      bgColor: 'bg-orange-500/10',
    },
    upgrade: {
      icon: T.jsx(W0, { size: 14 }),
      color: 'text-[#a78bfa]',
      borderColor: 'border-purple-500/50',
      bgColor: 'bg-purple-500/10',
    },
    warning: {
      icon: T.jsx(Ef, { size: 14 }),
      color: 'text-yellow-400',
      borderColor: 'border-yellow-500/50',
      bgColor: 'bg-yellow-500/10',
    },
  },
  gy = () => {
    const d = Pt((b) => b.notifications),
      M = Pt((b) => b.dismissNotification);
    return d.length === 0
      ? null
      : T.jsx('div', {
          className: 'pointer-events-none fixed top-16 right-3 z-50 flex w-72 flex-col gap-1.5',
          role: 'region',
          'aria-label': 'Game notifications',
          'aria-live': 'polite',
          children: d.map((b, s) => {
            const A = vy[b.type];
            return T.jsxs(
              'div',
              {
                className: `pixel-panel flex items-start gap-2 px-3 py-2 ${A.borderColor} ${A.bgColor} animate-slide-in pointer-events-auto backdrop-blur-sm`,
                style: { animationDelay: `${s * 50}ms` },
                children: [
                  T.jsx('span', { className: `${A.color} mt-0.5 shrink-0`, children: A.icon }),
                  T.jsx('span', { className: 'flex-1 text-xs leading-snug text-slate-300', children: b.message }),
                  T.jsx('button', {
                    onClick: () => M(b.id),
                    className: 'mt-0.5 shrink-0 cursor-pointer text-slate-600 transition-colors hover:text-slate-300',
                    'aria-label': 'Dismiss notification',
                    children: T.jsx(L1, { size: 12 }),
                  }),
                ],
              },
              b.id
            );
          }),
        });
  },
  by = () => (
    Ul.useEffect(() => (uy(), () => ny()), []),
    T.jsxs('div', {
      className: 'crt-overlay flex h-screen flex-col overflow-hidden bg-[#0a0a1a] text-white',
      children: [T.jsx(cy, {}), T.jsx(hy, {}), T.jsx(gy, {})],
    })
  );
N1.createRoot(document.getElementById('root')).render(T.jsx(Ul.StrictMode, { children: T.jsx(by, {}) }));
export {
  H1 as C,
  Y1 as H,
  P1 as R,
  Z1 as S,
  ly as U,
  Wn as W,
  k1 as a,
  mt as b,
  Kl as c,
  $n as d,
  R1 as e,
  q1 as f,
  kn as g,
  T as j,
  Pt as u,
};
