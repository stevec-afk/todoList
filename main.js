(() => {
    "use strict";
    const t = [
            {
                title: "Pay Bills",
                description: "Electric and Internet bills due",
                duedate: "2026-03-15",
                category: "Personal",
                priority: "high",
            },
            {
                title: "Walk the Dog",
                description: "Take Fido to the park",
                duedate: "2026-04-01",
                category: "Personal",
                priority: "medium",
            },
            {
                title: "Finish Project",
                description: "Complete the Odin Project ToDo list",
                duedate: "2026-10-10",
                category: "Work",
                priority: "low",
            },
        ],
        e = ["Work", "Personal", "School", "Long-term"];
    let n = [];
    function a() {
        return "undefined" != typeof crypto && crypto.randomUUID
            ? crypto.randomUUID()
            : Math.random().toString(36).substring(2, 11) +
                  Math.random().toString(36).substring(2, 11);
    }
    const r = {
            add: (t) => {
                const e = (({
                    title: t,
                    description: e,
                    duedate: n,
                    category: r,
                    priority: o,
                    id: i = a(),
                    status: s = !1,
                }) => ({
                    title: t,
                    description: e,
                    duedate: n,
                    category: r,
                    priority: o,
                    id: i,
                    status: s,
                }))(t);
                (n.push(e), r.save());
            },
            getAll: () => [...n],
            remove: (t) => {
                ((n = n.filter((e) => e.id !== t)), r.save());
            },
            getByCategory: (t) => n.filter((e) => e.category === t),
            toggleStatus: (t) => {
                const e = n.find((e) => e.id === t);
                e && ((e.status = !e.status), r.save());
            },
            loadDefaults: () => {
                t.forEach((t) => r.add(t));
            },
            save: () => {
                const t = JSON.stringify(n);
                localStorage.setItem("myTodoList", t);
            },
            init: () => {
                const e = localStorage.getItem("myTodoList");
                let n;
                try {
                    n = JSON.parse(e);
                } catch {
                    (console.error("Save file corrupted, clearing storage."), (n = null));
                }
                (n || t).forEach((t) => r.add(t));
            },
            resetApp: () => {
                (localStorage.clear(), (n = []), r.init());
            },
            getCategories: () => {
                const t = n.map((t) => t.category).filter((t) => t && "" !== t.trim()),
                    a = [...e, ...t];
                return [...new Set(a)];
            },
            getById: (t) => n.find((e) => e.id === t),
            update: (t, e) => {
                const a = n.find((e) => e.id === t);
                a && (Object.assign(a, e), r.save());
            },
        },
        o = { showCompleted: !0, darkMode: !1, sidebarCollapsed: !1, currentView: "all-tasks" };
    let i = { ...o };
    const s = () => ({ ...i }),
        u = (t, e) => {
            t in i && ((i[t] = e), localStorage.setItem("todo_settings", JSON.stringify(i)));
        },
        d = (Math.pow(10, 8), 6048e5),
        c = Symbol.for("constructDateFrom");
    function l(t, e) {
        return "function" == typeof t
            ? t(e)
            : t && "object" == typeof t && c in t
              ? t[c](e)
              : t instanceof Date
                ? new t.constructor(e)
                : new Date(e);
    }
    function m(t) {
        return l(t, Date.now());
    }
    function h(t, ...e) {
        const n = l.bind(null, t || e.find((t) => "object" == typeof t));
        return e.map(n);
    }
    function g(t, e) {
        return l(e || t, t);
    }
    function f(t, e) {
        const n = g(t, e?.in);
        return (n.setHours(0, 0, 0, 0), n);
    }
    function w(t, e, n) {
        const [a, r] = h(n?.in, t, e);
        return +f(a) === +f(r);
    }
    function y(t, e) {
        return w(
            t,
            (function (t, e, n) {
                const a = g(t, n?.in);
                return isNaN(e) ? l(n?.in || t, NaN) : e ? (a.setDate(a.getDate() + e), a) : a;
            })(m(e?.in || t), 1),
            e,
        );
    }
    function b(t, e) {
        return (function (t, e, n) {
            const [a, r] = h(n?.in, t, e);
            return a.getFullYear() === r.getFullYear() && a.getMonth() === r.getMonth();
        })(l(e?.in || t, t), m(e?.in || t));
    }
    const p = {
        lessThanXSeconds: { one: "less than a second", other: "less than {{count}} seconds" },
        xSeconds: { one: "1 second", other: "{{count}} seconds" },
        halfAMinute: "half a minute",
        lessThanXMinutes: { one: "less than a minute", other: "less than {{count}} minutes" },
        xMinutes: { one: "1 minute", other: "{{count}} minutes" },
        aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
        xHours: { one: "1 hour", other: "{{count}} hours" },
        xDays: { one: "1 day", other: "{{count}} days" },
        aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
        xWeeks: { one: "1 week", other: "{{count}} weeks" },
        aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
        xMonths: { one: "1 month", other: "{{count}} months" },
        aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
        xYears: { one: "1 year", other: "{{count}} years" },
        overXYears: { one: "over 1 year", other: "over {{count}} years" },
        almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
    };
    function v(t) {
        return (e = {}) => {
            const n = e.width ? String(e.width) : t.defaultWidth;
            return t.formats[n] || t.formats[t.defaultWidth];
        };
    }
    const k = {
            date: v({
                formats: {
                    full: "EEEE, MMMM do, y",
                    long: "MMMM do, y",
                    medium: "MMM d, y",
                    short: "MM/dd/yyyy",
                },
                defaultWidth: "full",
            }),
            time: v({
                formats: {
                    full: "h:mm:ss a zzzz",
                    long: "h:mm:ss a z",
                    medium: "h:mm:ss a",
                    short: "h:mm a",
                },
                defaultWidth: "full",
            }),
            dateTime: v({
                formats: {
                    full: "{{date}} 'at' {{time}}",
                    long: "{{date}} 'at' {{time}}",
                    medium: "{{date}}, {{time}}",
                    short: "{{date}}, {{time}}",
                },
                defaultWidth: "full",
            }),
        },
        M = {
            lastWeek: "'last' eeee 'at' p",
            yesterday: "'yesterday at' p",
            today: "'today at' p",
            tomorrow: "'tomorrow at' p",
            nextWeek: "eeee 'at' p",
            other: "P",
        };
    function S(t) {
        return (e, n) => {
            let a;
            if (
                "formatting" === (n?.context ? String(n.context) : "standalone") &&
                t.formattingValues
            ) {
                const e = t.defaultFormattingWidth || t.defaultWidth,
                    r = n?.width ? String(n.width) : e;
                a = t.formattingValues[r] || t.formattingValues[e];
            } else {
                const e = t.defaultWidth,
                    r = n?.width ? String(n.width) : t.defaultWidth;
                a = t.values[r] || t.values[e];
            }
            return a[t.argumentCallback ? t.argumentCallback(e) : e];
        };
    }
    function D(t) {
        return (e, n = {}) => {
            const a = n.width,
                r = (a && t.matchPatterns[a]) || t.matchPatterns[t.defaultMatchWidth],
                o = e.match(r);
            if (!o) return null;
            const i = o[0],
                s = (a && t.parsePatterns[a]) || t.parsePatterns[t.defaultParseWidth],
                u = Array.isArray(s)
                    ? (function (t, e) {
                          for (let n = 0; n < t.length; n++) if (e(t[n])) return n;
                      })(s, (t) => t.test(i))
                    : (function (t, e) {
                          for (const n in t)
                              if (Object.prototype.hasOwnProperty.call(t, n) && e(t[n])) return n;
                      })(s, (t) => t.test(i));
            let d;
            return (
                (d = t.valueCallback ? t.valueCallback(u) : u),
                (d = n.valueCallback ? n.valueCallback(d) : d),
                { value: d, rest: e.slice(i.length) }
            );
        };
    }
    var P;
    const x = {
        code: "en-US",
        formatDistance: (t, e, n) => {
            let a;
            const r = p[t];
            return (
                (a =
                    "string" == typeof r
                        ? r
                        : 1 === e
                          ? r.one
                          : r.other.replace("{{count}}", e.toString())),
                n?.addSuffix ? (n.comparison && n.comparison > 0 ? "in " + a : a + " ago") : a
            );
        },
        formatLong: k,
        formatRelative: (t, e, n, a) => M[t],
        localize: {
            ordinalNumber: (t, e) => {
                const n = Number(t),
                    a = n % 100;
                if (a > 20 || a < 10)
                    switch (a % 10) {
                        case 1:
                            return n + "st";
                        case 2:
                            return n + "nd";
                        case 3:
                            return n + "rd";
                    }
                return n + "th";
            },
            era: S({
                values: {
                    narrow: ["B", "A"],
                    abbreviated: ["BC", "AD"],
                    wide: ["Before Christ", "Anno Domini"],
                },
                defaultWidth: "wide",
            }),
            quarter: S({
                values: {
                    narrow: ["1", "2", "3", "4"],
                    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
                    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
                },
                defaultWidth: "wide",
                argumentCallback: (t) => t - 1,
            }),
            month: S({
                values: {
                    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
                    abbreviated: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                    ],
                    wide: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ],
                },
                defaultWidth: "wide",
            }),
            day: S({
                values: {
                    narrow: ["S", "M", "T", "W", "T", "F", "S"],
                    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    wide: [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                    ],
                },
                defaultWidth: "wide",
            }),
            dayPeriod: S({
                values: {
                    narrow: {
                        am: "a",
                        pm: "p",
                        midnight: "mi",
                        noon: "n",
                        morning: "morning",
                        afternoon: "afternoon",
                        evening: "evening",
                        night: "night",
                    },
                    abbreviated: {
                        am: "AM",
                        pm: "PM",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "morning",
                        afternoon: "afternoon",
                        evening: "evening",
                        night: "night",
                    },
                    wide: {
                        am: "a.m.",
                        pm: "p.m.",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "morning",
                        afternoon: "afternoon",
                        evening: "evening",
                        night: "night",
                    },
                },
                defaultWidth: "wide",
                formattingValues: {
                    narrow: {
                        am: "a",
                        pm: "p",
                        midnight: "mi",
                        noon: "n",
                        morning: "in the morning",
                        afternoon: "in the afternoon",
                        evening: "in the evening",
                        night: "at night",
                    },
                    abbreviated: {
                        am: "AM",
                        pm: "PM",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "in the morning",
                        afternoon: "in the afternoon",
                        evening: "in the evening",
                        night: "at night",
                    },
                    wide: {
                        am: "a.m.",
                        pm: "p.m.",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "in the morning",
                        afternoon: "in the afternoon",
                        evening: "in the evening",
                        night: "at night",
                    },
                },
                defaultFormattingWidth: "wide",
            }),
        },
        match: {
            ordinalNumber:
                ((P = {
                    matchPattern: /^(\d+)(th|st|nd|rd)?/i,
                    parsePattern: /\d+/i,
                    valueCallback: (t) => parseInt(t, 10),
                }),
                (t, e = {}) => {
                    const n = t.match(P.matchPattern);
                    if (!n) return null;
                    const a = n[0],
                        r = t.match(P.parsePattern);
                    if (!r) return null;
                    let o = P.valueCallback ? P.valueCallback(r[0]) : r[0];
                    return (
                        (o = e.valueCallback ? e.valueCallback(o) : o),
                        { value: o, rest: t.slice(a.length) }
                    );
                }),
            era: D({
                matchPatterns: {
                    narrow: /^(b|a)/i,
                    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
                    wide: /^(before christ|before common era|anno domini|common era)/i,
                },
                defaultMatchWidth: "wide",
                parsePatterns: { any: [/^b/i, /^(a|c)/i] },
                defaultParseWidth: "any",
            }),
            quarter: D({
                matchPatterns: {
                    narrow: /^[1234]/i,
                    abbreviated: /^q[1234]/i,
                    wide: /^[1234](th|st|nd|rd)? quarter/i,
                },
                defaultMatchWidth: "wide",
                parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
                defaultParseWidth: "any",
                valueCallback: (t) => t + 1,
            }),
            month: D({
                matchPatterns: {
                    narrow: /^[jfmasond]/i,
                    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
                    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
                },
                defaultMatchWidth: "wide",
                parsePatterns: {
                    narrow: [
                        /^j/i,
                        /^f/i,
                        /^m/i,
                        /^a/i,
                        /^m/i,
                        /^j/i,
                        /^j/i,
                        /^a/i,
                        /^s/i,
                        /^o/i,
                        /^n/i,
                        /^d/i,
                    ],
                    any: [
                        /^ja/i,
                        /^f/i,
                        /^mar/i,
                        /^ap/i,
                        /^may/i,
                        /^jun/i,
                        /^jul/i,
                        /^au/i,
                        /^s/i,
                        /^o/i,
                        /^n/i,
                        /^d/i,
                    ],
                },
                defaultParseWidth: "any",
            }),
            day: D({
                matchPatterns: {
                    narrow: /^[smtwf]/i,
                    short: /^(su|mo|tu|we|th|fr|sa)/i,
                    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
                    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
                },
                defaultMatchWidth: "wide",
                parsePatterns: {
                    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
                    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
                },
                defaultParseWidth: "any",
            }),
            dayPeriod: D({
                matchPatterns: {
                    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
                    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
                },
                defaultMatchWidth: "any",
                parsePatterns: {
                    any: {
                        am: /^a/i,
                        pm: /^p/i,
                        midnight: /^mi/i,
                        noon: /^no/i,
                        morning: /morning/i,
                        afternoon: /afternoon/i,
                        evening: /evening/i,
                        night: /night/i,
                    },
                },
                defaultParseWidth: "any",
            }),
        },
        options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
    };
    let E = {};
    function C() {
        return E;
    }
    function W(t) {
        const e = g(t),
            n = new Date(
                Date.UTC(
                    e.getFullYear(),
                    e.getMonth(),
                    e.getDate(),
                    e.getHours(),
                    e.getMinutes(),
                    e.getSeconds(),
                    e.getMilliseconds(),
                ),
            );
        return (n.setUTCFullYear(e.getFullYear()), +t - +n);
    }
    function T(t, e) {
        const n = g(t, e?.in);
        return (
            (function (t, e, n) {
                const [a, r] = h(n?.in, t, e),
                    o = f(a),
                    i = f(r),
                    s = +o - W(o),
                    u = +i - W(i);
                return Math.round((s - u) / 864e5);
            })(
                n,
                (function (t, e) {
                    const n = g(t, e?.in);
                    return (n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n);
                })(n),
            ) + 1
        );
    }
    function O(t, e) {
        const n = C(),
            a =
                e?.weekStartsOn ??
                e?.locale?.options?.weekStartsOn ??
                n.weekStartsOn ??
                n.locale?.options?.weekStartsOn ??
                0,
            r = g(t, e?.in),
            o = r.getDay(),
            i = (o < a ? 7 : 0) + o - a;
        return (r.setDate(r.getDate() - i), r.setHours(0, 0, 0, 0), r);
    }
    function N(t, e) {
        return O(t, { ...e, weekStartsOn: 1 });
    }
    function Y(t, e) {
        const n = g(t, e?.in),
            a = n.getFullYear(),
            r = l(n, 0);
        (r.setFullYear(a + 1, 0, 4), r.setHours(0, 0, 0, 0));
        const o = N(r),
            i = l(n, 0);
        (i.setFullYear(a, 0, 4), i.setHours(0, 0, 0, 0));
        const s = N(i);
        return n.getTime() >= o.getTime() ? a + 1 : n.getTime() >= s.getTime() ? a : a - 1;
    }
    function B(t, e) {
        const n = g(t, e?.in),
            a =
                +N(n) -
                +(function (t, e) {
                    const n = Y(t, e),
                        a = l(e?.in || t, 0);
                    return (a.setFullYear(n, 0, 4), a.setHours(0, 0, 0, 0), N(a));
                })(n);
        return Math.round(a / d) + 1;
    }
    function L(t, e) {
        const n = g(t, e?.in),
            a = n.getFullYear(),
            r = C(),
            o =
                e?.firstWeekContainsDate ??
                e?.locale?.options?.firstWeekContainsDate ??
                r.firstWeekContainsDate ??
                r.locale?.options?.firstWeekContainsDate ??
                1,
            i = l(e?.in || t, 0);
        (i.setFullYear(a + 1, 0, o), i.setHours(0, 0, 0, 0));
        const s = O(i, e),
            u = l(e?.in || t, 0);
        (u.setFullYear(a, 0, o), u.setHours(0, 0, 0, 0));
        const d = O(u, e);
        return +n >= +s ? a + 1 : +n >= +d ? a : a - 1;
    }
    function F(t, e) {
        const n = g(t, e?.in),
            a =
                +O(n, e) -
                +(function (t, e) {
                    const n = C(),
                        a =
                            e?.firstWeekContainsDate ??
                            e?.locale?.options?.firstWeekContainsDate ??
                            n.firstWeekContainsDate ??
                            n.locale?.options?.firstWeekContainsDate ??
                            1,
                        r = L(t, e),
                        o = l(e?.in || t, 0);
                    return (o.setFullYear(r, 0, a), o.setHours(0, 0, 0, 0), O(o, e));
                })(n, e);
        return Math.round(a / d) + 1;
    }
    function I(t, e) {
        return (t < 0 ? "-" : "") + Math.abs(t).toString().padStart(e, "0");
    }
    const q = {
            y(t, e) {
                const n = t.getFullYear(),
                    a = n > 0 ? n : 1 - n;
                return I("yy" === e ? a % 100 : a, e.length);
            },
            M(t, e) {
                const n = t.getMonth();
                return "M" === e ? String(n + 1) : I(n + 1, 2);
            },
            d: (t, e) => I(t.getDate(), e.length),
            a(t, e) {
                const n = t.getHours() / 12 >= 1 ? "pm" : "am";
                switch (e) {
                    case "a":
                    case "aa":
                        return n.toUpperCase();
                    case "aaa":
                        return n;
                    case "aaaaa":
                        return n[0];
                    default:
                        return "am" === n ? "a.m." : "p.m.";
                }
            },
            h: (t, e) => I(t.getHours() % 12 || 12, e.length),
            H: (t, e) => I(t.getHours(), e.length),
            m: (t, e) => I(t.getMinutes(), e.length),
            s: (t, e) => I(t.getSeconds(), e.length),
            S(t, e) {
                const n = e.length,
                    a = t.getMilliseconds();
                return I(Math.trunc(a * Math.pow(10, n - 3)), e.length);
            },
        },
        A = {
            G: function (t, e, n) {
                const a = t.getFullYear() > 0 ? 1 : 0;
                switch (e) {
                    case "G":
                    case "GG":
                    case "GGG":
                        return n.era(a, { width: "abbreviated" });
                    case "GGGGG":
                        return n.era(a, { width: "narrow" });
                    default:
                        return n.era(a, { width: "wide" });
                }
            },
            y: function (t, e, n) {
                if ("yo" === e) {
                    const e = t.getFullYear(),
                        a = e > 0 ? e : 1 - e;
                    return n.ordinalNumber(a, { unit: "year" });
                }
                return q.y(t, e);
            },
            Y: function (t, e, n, a) {
                const r = L(t, a),
                    o = r > 0 ? r : 1 - r;
                return "YY" === e
                    ? I(o % 100, 2)
                    : "Yo" === e
                      ? n.ordinalNumber(o, { unit: "year" })
                      : I(o, e.length);
            },
            R: function (t, e) {
                return I(Y(t), e.length);
            },
            u: function (t, e) {
                return I(t.getFullYear(), e.length);
            },
            Q: function (t, e, n) {
                const a = Math.ceil((t.getMonth() + 1) / 3);
                switch (e) {
                    case "Q":
                        return String(a);
                    case "QQ":
                        return I(a, 2);
                    case "Qo":
                        return n.ordinalNumber(a, { unit: "quarter" });
                    case "QQQ":
                        return n.quarter(a, { width: "abbreviated", context: "formatting" });
                    case "QQQQQ":
                        return n.quarter(a, { width: "narrow", context: "formatting" });
                    default:
                        return n.quarter(a, { width: "wide", context: "formatting" });
                }
            },
            q: function (t, e, n) {
                const a = Math.ceil((t.getMonth() + 1) / 3);
                switch (e) {
                    case "q":
                        return String(a);
                    case "qq":
                        return I(a, 2);
                    case "qo":
                        return n.ordinalNumber(a, { unit: "quarter" });
                    case "qqq":
                        return n.quarter(a, { width: "abbreviated", context: "standalone" });
                    case "qqqqq":
                        return n.quarter(a, { width: "narrow", context: "standalone" });
                    default:
                        return n.quarter(a, { width: "wide", context: "standalone" });
                }
            },
            M: function (t, e, n) {
                const a = t.getMonth();
                switch (e) {
                    case "M":
                    case "MM":
                        return q.M(t, e);
                    case "Mo":
                        return n.ordinalNumber(a + 1, { unit: "month" });
                    case "MMM":
                        return n.month(a, { width: "abbreviated", context: "formatting" });
                    case "MMMMM":
                        return n.month(a, { width: "narrow", context: "formatting" });
                    default:
                        return n.month(a, { width: "wide", context: "formatting" });
                }
            },
            L: function (t, e, n) {
                const a = t.getMonth();
                switch (e) {
                    case "L":
                        return String(a + 1);
                    case "LL":
                        return I(a + 1, 2);
                    case "Lo":
                        return n.ordinalNumber(a + 1, { unit: "month" });
                    case "LLL":
                        return n.month(a, { width: "abbreviated", context: "standalone" });
                    case "LLLLL":
                        return n.month(a, { width: "narrow", context: "standalone" });
                    default:
                        return n.month(a, { width: "wide", context: "standalone" });
                }
            },
            w: function (t, e, n, a) {
                const r = F(t, a);
                return "wo" === e ? n.ordinalNumber(r, { unit: "week" }) : I(r, e.length);
            },
            I: function (t, e, n) {
                const a = B(t);
                return "Io" === e ? n.ordinalNumber(a, { unit: "week" }) : I(a, e.length);
            },
            d: function (t, e, n) {
                return "do" === e ? n.ordinalNumber(t.getDate(), { unit: "date" }) : q.d(t, e);
            },
            D: function (t, e, n) {
                const a = T(t);
                return "Do" === e ? n.ordinalNumber(a, { unit: "dayOfYear" }) : I(a, e.length);
            },
            E: function (t, e, n) {
                const a = t.getDay();
                switch (e) {
                    case "E":
                    case "EE":
                    case "EEE":
                        return n.day(a, { width: "abbreviated", context: "formatting" });
                    case "EEEEE":
                        return n.day(a, { width: "narrow", context: "formatting" });
                    case "EEEEEE":
                        return n.day(a, { width: "short", context: "formatting" });
                    default:
                        return n.day(a, { width: "wide", context: "formatting" });
                }
            },
            e: function (t, e, n, a) {
                const r = t.getDay(),
                    o = (r - a.weekStartsOn + 8) % 7 || 7;
                switch (e) {
                    case "e":
                        return String(o);
                    case "ee":
                        return I(o, 2);
                    case "eo":
                        return n.ordinalNumber(o, { unit: "day" });
                    case "eee":
                        return n.day(r, { width: "abbreviated", context: "formatting" });
                    case "eeeee":
                        return n.day(r, { width: "narrow", context: "formatting" });
                    case "eeeeee":
                        return n.day(r, { width: "short", context: "formatting" });
                    default:
                        return n.day(r, { width: "wide", context: "formatting" });
                }
            },
            c: function (t, e, n, a) {
                const r = t.getDay(),
                    o = (r - a.weekStartsOn + 8) % 7 || 7;
                switch (e) {
                    case "c":
                        return String(o);
                    case "cc":
                        return I(o, e.length);
                    case "co":
                        return n.ordinalNumber(o, { unit: "day" });
                    case "ccc":
                        return n.day(r, { width: "abbreviated", context: "standalone" });
                    case "ccccc":
                        return n.day(r, { width: "narrow", context: "standalone" });
                    case "cccccc":
                        return n.day(r, { width: "short", context: "standalone" });
                    default:
                        return n.day(r, { width: "wide", context: "standalone" });
                }
            },
            i: function (t, e, n) {
                const a = t.getDay(),
                    r = 0 === a ? 7 : a;
                switch (e) {
                    case "i":
                        return String(r);
                    case "ii":
                        return I(r, e.length);
                    case "io":
                        return n.ordinalNumber(r, { unit: "day" });
                    case "iii":
                        return n.day(a, { width: "abbreviated", context: "formatting" });
                    case "iiiii":
                        return n.day(a, { width: "narrow", context: "formatting" });
                    case "iiiiii":
                        return n.day(a, { width: "short", context: "formatting" });
                    default:
                        return n.day(a, { width: "wide", context: "formatting" });
                }
            },
            a: function (t, e, n) {
                const a = t.getHours() / 12 >= 1 ? "pm" : "am";
                switch (e) {
                    case "a":
                    case "aa":
                        return n.dayPeriod(a, { width: "abbreviated", context: "formatting" });
                    case "aaa":
                        return n
                            .dayPeriod(a, { width: "abbreviated", context: "formatting" })
                            .toLowerCase();
                    case "aaaaa":
                        return n.dayPeriod(a, { width: "narrow", context: "formatting" });
                    default:
                        return n.dayPeriod(a, { width: "wide", context: "formatting" });
                }
            },
            b: function (t, e, n) {
                const a = t.getHours();
                let r;
                switch (
                    ((r = 12 === a ? "noon" : 0 === a ? "midnight" : a / 12 >= 1 ? "pm" : "am"), e)
                ) {
                    case "b":
                    case "bb":
                        return n.dayPeriod(r, { width: "abbreviated", context: "formatting" });
                    case "bbb":
                        return n
                            .dayPeriod(r, { width: "abbreviated", context: "formatting" })
                            .toLowerCase();
                    case "bbbbb":
                        return n.dayPeriod(r, { width: "narrow", context: "formatting" });
                    default:
                        return n.dayPeriod(r, { width: "wide", context: "formatting" });
                }
            },
            B: function (t, e, n) {
                const a = t.getHours();
                let r;
                switch (
                    ((r =
                        a >= 17 ? "evening" : a >= 12 ? "afternoon" : a >= 4 ? "morning" : "night"),
                    e)
                ) {
                    case "B":
                    case "BB":
                    case "BBB":
                        return n.dayPeriod(r, { width: "abbreviated", context: "formatting" });
                    case "BBBBB":
                        return n.dayPeriod(r, { width: "narrow", context: "formatting" });
                    default:
                        return n.dayPeriod(r, { width: "wide", context: "formatting" });
                }
            },
            h: function (t, e, n) {
                if ("ho" === e) {
                    let e = t.getHours() % 12;
                    return (0 === e && (e = 12), n.ordinalNumber(e, { unit: "hour" }));
                }
                return q.h(t, e);
            },
            H: function (t, e, n) {
                return "Ho" === e ? n.ordinalNumber(t.getHours(), { unit: "hour" }) : q.H(t, e);
            },
            K: function (t, e, n) {
                const a = t.getHours() % 12;
                return "Ko" === e ? n.ordinalNumber(a, { unit: "hour" }) : I(a, e.length);
            },
            k: function (t, e, n) {
                let a = t.getHours();
                return (
                    0 === a && (a = 24),
                    "ko" === e ? n.ordinalNumber(a, { unit: "hour" }) : I(a, e.length)
                );
            },
            m: function (t, e, n) {
                return "mo" === e ? n.ordinalNumber(t.getMinutes(), { unit: "minute" }) : q.m(t, e);
            },
            s: function (t, e, n) {
                return "so" === e ? n.ordinalNumber(t.getSeconds(), { unit: "second" }) : q.s(t, e);
            },
            S: function (t, e) {
                return q.S(t, e);
            },
            X: function (t, e, n) {
                const a = t.getTimezoneOffset();
                if (0 === a) return "Z";
                switch (e) {
                    case "X":
                        return j(a);
                    case "XXXX":
                    case "XX":
                        return z(a);
                    default:
                        return z(a, ":");
                }
            },
            x: function (t, e, n) {
                const a = t.getTimezoneOffset();
                switch (e) {
                    case "x":
                        return j(a);
                    case "xxxx":
                    case "xx":
                        return z(a);
                    default:
                        return z(a, ":");
                }
            },
            O: function (t, e, n) {
                const a = t.getTimezoneOffset();
                switch (e) {
                    case "O":
                    case "OO":
                    case "OOO":
                        return "GMT" + H(a, ":");
                    default:
                        return "GMT" + z(a, ":");
                }
            },
            z: function (t, e, n) {
                const a = t.getTimezoneOffset();
                switch (e) {
                    case "z":
                    case "zz":
                    case "zzz":
                        return "GMT" + H(a, ":");
                    default:
                        return "GMT" + z(a, ":");
                }
            },
            t: function (t, e, n) {
                return I(Math.trunc(+t / 1e3), e.length);
            },
            T: function (t, e, n) {
                return I(+t, e.length);
            },
        };
    function H(t, e = "") {
        const n = t > 0 ? "-" : "+",
            a = Math.abs(t),
            r = Math.trunc(a / 60),
            o = a % 60;
        return 0 === o ? n + String(r) : n + String(r) + e + I(o, 2);
    }
    function j(t, e) {
        return t % 60 == 0 ? (t > 0 ? "-" : "+") + I(Math.abs(t) / 60, 2) : z(t, e);
    }
    function z(t, e = "") {
        const n = t > 0 ? "-" : "+",
            a = Math.abs(t);
        return n + I(Math.trunc(a / 60), 2) + e + I(a % 60, 2);
    }
    const Q = (t, e) => {
            switch (t) {
                case "P":
                    return e.date({ width: "short" });
                case "PP":
                    return e.date({ width: "medium" });
                case "PPP":
                    return e.date({ width: "long" });
                default:
                    return e.date({ width: "full" });
            }
        },
        G = (t, e) => {
            switch (t) {
                case "p":
                    return e.time({ width: "short" });
                case "pp":
                    return e.time({ width: "medium" });
                case "ppp":
                    return e.time({ width: "long" });
                default:
                    return e.time({ width: "full" });
            }
        },
        X = {
            p: G,
            P: (t, e) => {
                const n = t.match(/(P+)(p+)?/) || [],
                    a = n[1],
                    r = n[2];
                if (!r) return Q(t, e);
                let o;
                switch (a) {
                    case "P":
                        o = e.dateTime({ width: "short" });
                        break;
                    case "PP":
                        o = e.dateTime({ width: "medium" });
                        break;
                    case "PPP":
                        o = e.dateTime({ width: "long" });
                        break;
                    default:
                        o = e.dateTime({ width: "full" });
                }
                return o.replace("{{date}}", Q(a, e)).replace("{{time}}", G(r, e));
            },
        },
        J = /^D+$/,
        $ = /^Y+$/,
        U = ["D", "DD", "YY", "YYYY"];
    function V(t) {
        return !(
            (!(
                (e = t) instanceof Date ||
                ("object" == typeof e && "[object Date]" === Object.prototype.toString.call(e))
            ) &&
                "number" != typeof t) ||
            isNaN(+g(t))
        );
        var e;
    }
    const R = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
        K = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
        _ = /^'([^]*?)'?$/,
        Z = /''/g,
        tt = /[a-zA-Z]/;
    function et(t) {
        const e = t.match(_);
        return e ? e[1].replace(Z, "'") : t;
    }
    const nt = document.getElementById("content");
    function at(t, e, n, a) {
        const r = document.createElement(t);
        return (
            e && (r.innerText = e),
            a && (r.id = a),
            n && n.forEach((t) => r.classList.add(t)),
            r
        );
    }
    function rt() {
        const t = document.getElementById("categories"),
            e = r.getCategories();
        ((t.innerHTML = ""),
            e.forEach((e) => {
                const n = at("button", void 0, ["category-button"]),
                    a = at("span", "label", ["material-icons"]),
                    r = at("span", e);
                (n.append(a, r), (n.dataset.category = e), t.appendChild(n));
            }));
    }
    const ot = document.getElementById("sidebar"),
        it = document.getElementById("content"),
        st = document.getElementById("add-form"),
        ut = document.getElementById("edit-form"),
        dt = document.getElementById("add-modal"),
        ct = document.getElementById("edit-modal"),
        lt = document.getElementById("header"),
        mt = {
            "due-today": (t) =>
                t.filter((t) => {
                    if (!t.duedate) return !1;
                    const e = new Date(t.duedate);
                    return (
                        (function (t, e) {
                            return w(l(e?.in || t, t), m(e?.in || t));
                        })(e) ||
                        (function (t) {
                            return +g(t) < Date.now();
                        })(e)
                    );
                }),
            "due-tomorrow": (t) => t.filter((t) => !!t.duedate && y(new Date(t.duedate))),
            "due-month": (t) => t.filter((t) => !!t.duedate && b(new Date(t.duedate))),
            "no-due-date": (t) => t.filter((t) => !t.duedate),
        };
    function ht() {
        const { currentView: t, showCompleted: e } = s(),
            n = r.getAll();
        let a;
        ((a = "all-tasks" === t ? n : mt[t] ? mt[t](n) : r.getByCategory(t)),
            e || (a = a.filter((t) => !t.status)),
            (function (t) {
                ((nt.innerHTML = ""),
                    (function () {
                        const { currentView: t } = s();
                        let e;
                        switch (t) {
                            case "all-tasks":
                                e = "All Tasks";
                                break;
                            case "due-today":
                                e = "Due Today";
                                break;
                            case "due-tomorrow":
                                e = "Due Tomorrow";
                                break;
                            case "due-month":
                                e = "Due This Month";
                                break;
                            case "no-due-date":
                                e = "No Due Date";
                                break;
                            default:
                                e = t;
                        }
                        const n = at("h2", e, void 0, "current-view");
                        nt.appendChild(n);
                    })());
                const e = at("button", "Add new task", ["add-task-inline"]);
                if (
                    (e.setAttribute("command", "show-modal"),
                    e.setAttribute("commandfor", "add-modal"),
                    0 === t.length)
                ) {
                    const t = at("p", "Nothing to do here!", ["empty-msg"]);
                    return (nt.appendChild(t), void nt.appendChild(e));
                }
                t.forEach((t) => {
                    const e = (function (t) {
                        const e = at("div", void 0, ["todo-row", `prio-${t.priority}`]);
                        e.dataset.id = t.id;
                        const n = at("input");
                        ((n.type = "checkbox"), (n.checked = t.status));
                        const a = at("span", t.title, ["task-title"]);
                        !0 === t.status && a.classList.add("completed");
                        const r = at("span", t.duedate, ["task-date"]),
                            o = at("button", "...", ["details-btn"]),
                            i = at("button", void 0, ["delete-row-btn"]),
                            s = at("span", "delete", ["material-icons"]);
                        return (i.appendChild(s), e.append(n, a, r, o, i), e);
                    })(t);
                    nt.appendChild(e);
                });
                const n = at("div", void 0, void 0, "new-todo-row");
                (n.appendChild(e), nt.appendChild(n));
            })(a));
    }
    function gt() {
        console.log("sidebar toggle sync called");
        const { showCompleted: t, darkMode: e } = s(),
            n = document.getElementById("show-completed-toggle"),
            a = document.getElementById("dark-mode-toggle");
        (n && (n.checked = t),
            a &&
                ((a.checked = e),
                document.documentElement.setAttribute("data-theme", e ? "dark" : "light")));
    }
    (!(function () {
        const t = (function (t, e, n) {
            const a = C(),
                r = n?.locale ?? a.locale ?? x,
                o =
                    n?.firstWeekContainsDate ??
                    n?.locale?.options?.firstWeekContainsDate ??
                    a.firstWeekContainsDate ??
                    a.locale?.options?.firstWeekContainsDate ??
                    1,
                i =
                    n?.weekStartsOn ??
                    n?.locale?.options?.weekStartsOn ??
                    a.weekStartsOn ??
                    a.locale?.options?.weekStartsOn ??
                    0,
                s = g(t, n?.in);
            if (!V(s)) throw new RangeError("Invalid time value");
            let u = e
                .match(K)
                .map((t) => {
                    const e = t[0];
                    return "p" === e || "P" === e ? (0, X[e])(t, r.formatLong) : t;
                })
                .join("")
                .match(R)
                .map((t) => {
                    if ("''" === t) return { isToken: !1, value: "'" };
                    const e = t[0];
                    if ("'" === e) return { isToken: !1, value: et(t) };
                    if (A[e]) return { isToken: !0, value: t };
                    if (e.match(tt))
                        throw new RangeError(
                            "Format string contains an unescaped latin alphabet character `" +
                                e +
                                "`",
                        );
                    return { isToken: !1, value: t };
                });
            r.localize.preprocessor && (u = r.localize.preprocessor(s, u));
            const d = { firstWeekContainsDate: o, weekStartsOn: i, locale: r };
            return u
                .map((a) => {
                    if (!a.isToken) return a.value;
                    const o = a.value;
                    return (
                        ((!n?.useAdditionalWeekYearTokens &&
                            (function (t) {
                                return $.test(t);
                            })(o)) ||
                            (!n?.useAdditionalDayOfYearTokens &&
                                (function (t) {
                                    return J.test(t);
                                })(o))) &&
                            (function (t, e, n) {
                                const a = (function (t, e, n) {
                                    const a = "Y" === t[0] ? "years" : "days of the month";
                                    return `Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
                                })(t, e, n);
                                if ((console.warn(a), U.includes(t))) throw new RangeError(a);
                            })(o, e, String(t)),
                        (0, A[o[0]])(s, o, r.localize, d)
                    );
                })
                .join("");
        })(new Date(), "yyyy-MM-dd");
        st.elements.duedate.min = t;
    })(),
        ot.addEventListener("click", (t) => {
            const e = t.target.closest("button");
            if (e && (ot.classList.remove("active"), "close-sidebar" !== e.id)) {
                if ("reset" === e.id)
                    return (
                        console.log("Reset clicked!"),
                        void (
                            confirm("Nuke everything and restore defaults?") &&
                            (r.resetApp(),
                            console.log("Current Tasks:", r.getAll()),
                            (i = { ...o }),
                            localStorage.setItem("todo_settings", JSON.stringify(i)),
                            gt(),
                            rt(),
                            ht())
                        )
                    );
                (u("currentView", e.dataset.category || e.id), ht());
            }
        }),
        ot.addEventListener("change", (t) => {
            if (
                ("show-completed-toggle" === t.target.id &&
                    (u("showCompleted", t.target.checked), ht()),
                "dark-mode-toggle" == t.target.id)
            ) {
                u("darkMode", t.target.checked);
                const e = t.target.checked ? "dark" : "light";
                document.documentElement.setAttribute("data-theme", e);
            }
        }),
        st.addEventListener("submit", (t) => {
            const e = Object.fromEntries(new FormData(t.target));
            (e.category && (e.category = e.category.trim()),
                r.add(e),
                rt(),
                ht(),
                st.reset(),
                dt.close());
        }),
        ut.addEventListener("submit", (t) => {
            const e = t.target.dataset.id,
                n = Object.fromEntries(new FormData(t.target));
            (n.category && (n.category = n.category.trim()),
                r.update(e, n),
                rt(),
                ht(),
                ct.close());
        }),
        lt.addEventListener("click", (t) => {
            t.target.closest("#menu-toggle") && ot.classList.toggle("active");
        }),
        it.addEventListener("click", (t) => {
            const e = t.target.closest(".todo-row");
            if (!e) return;
            const n = e.dataset.id;
            if ("checkbox" === t.target.type) return (r.toggleStatus(n), void ht());
            if (t.target.closest(".delete-row-btn"))
                return void (
                    window.confirm("Are you sure you want to delete this task?") &&
                    (r.remove(n), ht(), rt())
                );
            ut.reset();
            const a = r.getById(n);
            ((document.getElementById("edit-title").value = a.title),
                (document.getElementById("edit-desc").value = a.description),
                (document.getElementById("edit-cat").value = a.category),
                (document.getElementById("edit-date").value = a.duedate),
                (document.getElementById("edit-prio").value = a.priority),
                (ut.dataset.id = n),
                ct.showModal());
        }),
        dt.addEventListener("toggle", (t) => {
            if ("open" === t.newState) {
                const { currentView: t } = s(),
                    e = document.getElementById("add-cat");
                ["all-tasks", "due-today", "due-tomorrow", "due-month", "no-due-date"].includes(t)
                    ? (e.value = "")
                    : (e.value = t);
            }
        }),
        (() => {
            const t = localStorage.getItem("todo_settings");
            t && (i = JSON.parse(t));
        })(),
        r.init(),
        gt(),
        ht(),
        rt(),
        window.addEventListener("load", () => {
            document.body.classList.remove("preload");
        }),
        console.log("Current Tasks:", r.getAll()));
})();
