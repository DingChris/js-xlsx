/* xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var DO_NOT_EXPORT_CODEPAGE = true;
var DO_NOT_EXPORT_JSZIP = true;
(function(e) {
	if ("object" == typeof exports && "undefined" != typeof module && "undefined" == typeof DO_NOT_EXPORT_JSZIP) module.exports = e();
	else if ("function" == typeof define && define.amd) {
		JSZip = e();
		define([], e)
	} else {
		var r;
		"undefined" != typeof window ? r = window : "undefined" != typeof global ? r = global : "undefined" != typeof $ && $.global ? r = $.global :
			"undefined" != typeof self && (r = self), r.JSZip = e()
	}
})(function() {
	var e, r, t;
	return function a(e, r, t) {
		function n(s, f) {
			if (!r[s]) {
				if (!e[s]) {
					var o = typeof require == "function" && require;
					if (!f && o) return o(s, !0);
					if (i) return i(s, !0);
					throw new Error("Cannot find module '" + s + "'")
				}
				var l = r[s] = {
					exports: {}
				};
				e[s][0].call(l.exports, function(r) {
					var t = e[s][1][r];
					return n(t ? t : r)
				}, l, l.exports, a, e, r, t)
			}
			return r[s].exports
		}
		var i = typeof require == "function" && require;
		for (var s = 0; s < t.length; s++) n(t[s]);
		return n
	}({
		1: [function(e, r, t) {
			"use strict";
			var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			t.encode = function(e, r) {
				var t = "";
				var n, i, s, f, o, l, c;
				var h = 0;
				while (h < e.length) {
					n = e.charCodeAt(h++);
					i = e.charCodeAt(h++);
					s = e.charCodeAt(h++);
					f = n >> 2;
					o = (n & 3) << 4 | i >> 4;
					l = (i & 15) << 2 | s >> 6;
					c = s & 63;
					if (isNaN(i)) {
						l = c = 64
					} else if (isNaN(s)) {
						c = 64
					}
					t = t + a.charAt(f) + a.charAt(o) + a.charAt(l) + a.charAt(c)
				}
				return t
			};
			t.decode = function(e, r) {
				var t = "";
				var n, i, s;
				var f, o, l, c;
				var h = 0;
				e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
				while (h < e.length) {
					f = a.indexOf(e.charAt(h++));
					o = a.indexOf(e.charAt(h++));
					l = a.indexOf(e.charAt(h++));
					c = a.indexOf(e.charAt(h++));
					n = f << 2 | o >> 4;
					i = (o & 15) << 4 | l >> 2;
					s = (l & 3) << 6 | c;
					t = t + String.fromCharCode(n);
					if (l != 64) {
						t = t + String.fromCharCode(i)
					}
					if (c != 64) {
						t = t + String.fromCharCode(s)
					}
				}
				return t
			}
		}, {}],
		2: [function(e, r, t) {
			"use strict";

			function a() {
				this.compressedSize = 0;
				this.uncompressedSize = 0;
				this.crc32 = 0;
				this.compressionMethod = null;
				this.compressedContent = null
			}
			a.prototype = {
				getContent: function() {
					return null
				},
				getCompressedContent: function() {
					return null
				}
			};
			r.exports = a
		}, {}],
		3: [function(e, r, t) {
			"use strict";
			t.STORE = {
				magic: "\0\0",
				compress: function(e) {
					return e
				},
				uncompress: function(e) {
					return e
				},
				compressInputType: null,
				uncompressInputType: null
			};
			t.DEFLATE = e("./flate")
		}, {
			"./flate": 8
		}],
		4: [function(e, r, t) {
			"use strict";
			var a = e("./utils");
			var n = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230,
				2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603,
				4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096,
				1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728,
				853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705,
				3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534,
				2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763,
				141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223,
				1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092,
				3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277,
				2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054,
				702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842,
				3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743,
				2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920,
				282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985,
				2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161,
				3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954,
				1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151,
				1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012,
				4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116,
				2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301,
				1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130,
				1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471,
				3272380065, 1510334235, 755167117
			];
			r.exports = function i(e, r) {
				if (typeof e === "undefined" || !e.length) {
					return 0
				}
				var t = a.getTypeOf(e) !== "string";
				if (typeof r == "undefined") {
					r = 0
				}
				var i = 0;
				var s = 0;
				var f = 0;
				r = r ^ -1;
				for (var o = 0, l = e.length; o < l; o++) {
					f = t ? e[o] : e.charCodeAt(o);
					s = (r ^ f) & 255;
					i = n[s];
					r = r >>> 8 ^ i
				}
				return r ^ -1
			}
		}, {
			"./utils": 21
		}],
		5: [function(e, r, t) {
			"use strict";
			var a = e("./utils");

			function n(e) {
				this.data = null;
				this.length = 0;
				this.index = 0
			}
			n.prototype = {
				checkOffset: function(e) {
					this.checkIndex(this.index + e)
				},
				checkIndex: function(e) {
					if (this.length < e || e < 0) {
						throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?")
					}
				},
				setIndex: function(e) {
					this.checkIndex(e);
					this.index = e
				},
				skip: function(e) {
					this.setIndex(this.index + e)
				},
				byteAt: function(e) {},
				readInt: function(e) {
					var r = 0,
						t;
					this.checkOffset(e);
					for (t = this.index + e - 1; t >= this.index; t--) {
						r = (r << 8) + this.byteAt(t)
					}
					this.index += e;
					return r
				},
				readString: function(e) {
					return a.transformTo("string", this.readData(e))
				},
				readData: function(e) {},
				lastIndexOfSignature: function(e) {},
				readDate: function() {
					var e = this.readInt(4);
					return new Date((e >> 25 & 127) + 1980, (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (e & 31) << 1)
				}
			};
			r.exports = n
		}, {
			"./utils": 21
		}],
		6: [function(e, r, t) {
			"use strict";
			t.base64 = false;
			t.binary = false;
			t.dir = false;
			t.createFolders = false;
			t.date = null;
			t.compression = null;
			t.comment = null
		}, {}],
		7: [function(e, r, t) {
			"use strict";
			var a = e("./utils");
			t.string2binary = function(e) {
				return a.string2binary(e)
			};
			t.string2Uint8Array = function(e) {
				return a.transformTo("uint8array", e)
			};
			t.uint8Array2String = function(e) {
				return a.transformTo("string", e)
			};
			t.string2Blob = function(e) {
				var r = a.transformTo("arraybuffer", e);
				return a.arrayBuffer2Blob(r)
			};
			t.arrayBuffer2Blob = function(e) {
				return a.arrayBuffer2Blob(e)
			};
			t.transformTo = function(e, r) {
				return a.transformTo(e, r)
			};
			t.getTypeOf = function(e) {
				return a.getTypeOf(e)
			};
			t.checkSupport = function(e) {
				return a.checkSupport(e)
			};
			t.MAX_VALUE_16BITS = a.MAX_VALUE_16BITS;
			t.MAX_VALUE_32BITS = a.MAX_VALUE_32BITS;
			t.pretty = function(e) {
				return a.pretty(e)
			};
			t.findCompression = function(e) {
				return a.findCompression(e)
			};
			t.isRegExp = function(e) {
				return a.isRegExp(e)
			}
		}, {
			"./utils": 21
		}],
		8: [function(e, r, t) {
			"use strict";
			var a = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Uint32Array !== "undefined";
			var n = e("pako");
			t.uncompressInputType = a ? "uint8array" : "array";
			t.compressInputType = a ? "uint8array" : "array";
			t.magic = "\b\0";
			t.compress = function(e) {
				return n.deflateRaw(e)
			};
			t.uncompress = function(e) {
				return n.inflateRaw(e)
			}
		}, {
			pako: 24
		}],
		9: [function(e, r, t) {
			"use strict";
			var a = e("./base64");

			function n(e, r) {
				if (!(this instanceof n)) return new n(e, r);
				this.files = {};
				this.comment = null;
				this.root = "";
				if (e) {
					this.load(e, r)
				}
				this.clone = function() {
					var e = new n;
					for (var r in this) {
						if (typeof this[r] !== "function") {
							e[r] = this[r]
						}
					}
					return e
				}
			}
			n.prototype = e("./object");
			n.prototype.load = e("./load");
			n.support = e("./support");
			n.defaults = e("./defaults");
			n.utils = e("./deprecatedPublicUtils");
			n.base64 = {
				encode: function(e) {
					return a.encode(e)
				},
				decode: function(e) {
					return a.decode(e)
				}
			};
			n.compressions = e("./compressions");
			r.exports = n
		}, {
			"./base64": 1,
			"./compressions": 3,
			"./defaults": 6,
			"./deprecatedPublicUtils": 7,
			"./load": 10,
			"./object": 13,
			"./support": 17
		}],
		10: [function(e, r, t) {
			"use strict";
			var a = e("./base64");
			var n = e("./zipEntries");
			r.exports = function(e, r) {
				var t, i, s, f;
				r = r || {};
				if (r.base64) {
					e = a.decode(e)
				}
				i = new n(e, r);
				t = i.files;
				for (s = 0; s < t.length; s++) {
					f = t[s];
					this.file(f.fileName, f.decompressed, {
						binary: true,
						optimizedBinaryString: true,
						date: f.date,
						dir: f.dir,
						comment: f.fileComment.length ? f.fileComment : null,
						createFolders: r.createFolders
					})
				}
				if (i.zipComment.length) {
					this.comment = i.zipComment
				}
				return this
			}
		}, {
			"./base64": 1,
			"./zipEntries": 22
		}],
		11: [function(e, r, t) {
			(function(e) {
				"use strict";
				r.exports = function(r, t) {
					return new e(r, t)
				};
				r.exports.test = function(r) {
					return e.isBuffer(r)
				}
			}).call(this, typeof Buffer !== "undefined" ? Buffer : undefined)
		}, {}],
		12: [function(e, r, t) {
			"use strict";
			var a = e("./uint8ArrayReader");

			function n(e) {
				this.data = e;
				this.length = this.data.length;
				this.index = 0
			}
			n.prototype = new a;
			n.prototype.readData = function(e) {
				this.checkOffset(e);
				var r = this.data.slice(this.index, this.index + e);
				this.index += e;
				return r
			};
			r.exports = n
		}, {
			"./uint8ArrayReader": 18
		}],
		13: [function(e, r, t) {
			"use strict";
			var a = e("./support");
			var n = e("./utils");
			var i = e("./crc32");
			var s = e("./signature");
			var f = e("./defaults");
			var o = e("./base64");
			var l = e("./compressions");
			var c = e("./compressedObject");
			var h = e("./nodeBuffer");
			var u = e("./utf8");
			var d = e("./stringWriter");
			var p = e("./uint8ArrayWriter");
			var v = function(e) {
				if (e._data instanceof c) {
					e._data = e._data.getContent();
					e.options.binary = true;
					e.options.base64 = false;
					if (n.getTypeOf(e._data) === "uint8array") {
						var r = e._data;
						e._data = new Uint8Array(r.length);
						if (r.length !== 0) {
							e._data.set(r, 0)
						}
					}
				}
				return e._data
			};
			var g = function(e) {
				var r = v(e),
					t = n.getTypeOf(r);
				if (t === "string") {
					if (!e.options.binary) {
						if (a.nodebuffer) {
							return h(r, "utf-8")
						}
					}
					return e.asBinary()
				}
				return r
			};
			var m = function(e) {
				var r = v(this);
				if (r === null || typeof r === "undefined") {
					return ""
				}
				if (this.options.base64) {
					r = o.decode(r)
				}
				if (e && this.options.binary) {
					r = T.utf8decode(r)
				} else {
					r = n.transformTo("string", r)
				}
				if (!e && !this.options.binary) {
					r = n.transformTo("string", T.utf8encode(r))
				}
				return r
			};
			var b = function(e, r, t) {
				this.name = e;
				this.dir = t.dir;
				this.date = t.date;
				this.comment = t.comment;
				this._data = r;
				this.options = t;
				this._initialMetadata = {
					dir: t.dir,
					date: t.date
				}
			};
			b.prototype = {
				asText: function() {
					return m.call(this, true)
				},
				asBinary: function() {
					return m.call(this, false)
				},
				asNodeBuffer: function() {
					var e = g(this);
					return n.transformTo("nodebuffer", e)
				},
				asUint8Array: function() {
					var e = g(this);
					return n.transformTo("uint8array", e)
				},
				asArrayBuffer: function() {
					return this.asUint8Array().buffer
				}
			};
			var C = function(e, r) {
				var t = "",
					a;
				for (a = 0; a < r; a++) {
					t += String.fromCharCode(e & 255);
					e = e >>> 8
				}
				return t
			};
			var E = function() {
				var e = {},
					r, t;
				for (r = 0; r < arguments.length; r++) {
					for (t in arguments[r]) {
						if (arguments[r].hasOwnProperty(t) && typeof e[t] === "undefined") {
							e[t] = arguments[r][t]
						}
					}
				}
				return e
			};
			var w = function(e) {
				e = e || {};
				if (e.base64 === true && (e.binary === null || e.binary === undefined)) {
					e.binary = true
				}
				e = E(e, f);
				e.date = e.date || new Date;
				if (e.compression !== null) e.compression = e.compression.toUpperCase();
				return e
			};
			var k = function(e, r, t) {
				var a = n.getTypeOf(r),
					i;
				t = w(t);
				if (t.createFolders && (i = S(e))) {
					A.call(this, i, true)
				}
				if (t.dir || r === null || typeof r === "undefined") {
					t.base64 = false;
					t.binary = false;
					r = null
				} else if (a === "string") {
					if (t.binary && !t.base64) {
						if (t.optimizedBinaryString !== true) {
							r = n.string2binary(r)
						}
					}
				} else {
					t.base64 = false;
					t.binary = true;
					if (!a && !(r instanceof c)) {
						throw new Error("The data of '" + e + "' is in an unsupported format !")
					}
					if (a === "arraybuffer") {
						r = n.transformTo("uint8array", r)
					}
				}
				var s = new b(e, r, t);
				this.files[e] = s;
				return s
			};
			var S = function(e) {
				if (e.slice(-1) == "/") {
					e = e.substring(0, e.length - 1)
				}
				var r = e.lastIndexOf("/");
				return r > 0 ? e.substring(0, r) : ""
			};
			var A = function(e, r) {
				if (e.slice(-1) != "/") {
					e += "/"
				}
				r = typeof r !== "undefined" ? r : false;
				if (!this.files[e]) {
					k.call(this, e, null, {
						dir: true,
						createFolders: r
					})
				}
				return this.files[e]
			};
			var _ = function(e, r) {
				var t = new c,
					a;
				if (e._data instanceof c) {
					t.uncompressedSize = e._data.uncompressedSize;
					t.crc32 = e._data.crc32;
					if (t.uncompressedSize === 0 || e.dir) {
						r = l["STORE"];
						t.compressedContent = "";
						t.crc32 = 0
					} else if (e._data.compressionMethod === r.magic) {
						t.compressedContent = e._data.getCompressedContent()
					} else {
						a = e._data.getContent();
						t.compressedContent = r.compress(n.transformTo(r.compressInputType, a))
					}
				} else {
					a = g(e);
					if (!a || a.length === 0 || e.dir) {
						r = l["STORE"];
						a = ""
					}
					t.uncompressedSize = a.length;
					t.crc32 = i(a);
					t.compressedContent = r.compress(n.transformTo(r.compressInputType, a))
				}
				t.compressedSize = t.compressedContent.length;
				t.compressionMethod = r.magic;
				return t
			};
			var B = function(e, r, t, a) {
				var f = t.compressedContent,
					o = n.transformTo("string", u.utf8encode(r.name)),
					l = r.comment || "",
					c = n.transformTo("string", u.utf8encode(l)),
					h = o.length !== r.name.length,
					d = c.length !== l.length,
					p = r.options,
					v, g, m = "",
					b = "",
					E = "",
					w, k;
				if (r._initialMetadata.dir !== r.dir) {
					w = r.dir
				} else {
					w = p.dir
				}
				if (r._initialMetadata.date !== r.date) {
					k = r.date
				} else {
					k = p.date
				}
				v = k.getHours();
				v = v << 6;
				v = v | k.getMinutes();
				v = v << 5;
				v = v | k.getSeconds() / 2;
				g = k.getFullYear() - 1980;
				g = g << 4;
				g = g | k.getMonth() + 1;
				g = g << 5;
				g = g | k.getDate();
				if (h) {
					b = C(1, 1) + C(i(o), 4) + o;
					m += "up" + C(b.length, 2) + b
				}
				if (d) {
					E = C(1, 1) + C(this.crc32(c), 4) + c;
					m += "uc" + C(E.length, 2) + E
				}
				var S = "";
				S += "\n\0";
				S += h || d ? "\0\b" : "\0\0";
				S += t.compressionMethod;
				S += C(v, 2);
				S += C(g, 2);
				S += C(t.crc32, 4);
				S += C(t.compressedSize, 4);
				S += C(t.uncompressedSize, 4);
				S += C(o.length, 2);
				S += C(m.length, 2);
				var A = s.LOCAL_FILE_HEADER + S + o + m;
				var _ = s.CENTRAL_FILE_HEADER + "\0" + S + C(c.length, 2) + "\0\0" + "\0\0" + (w === true ? "\0\0\0" : "\0\0\0\0") + C(a, 4) +
					o + m + c;
				return {
					fileRecord: A,
					dirRecord: _,
					compressedObject: t
				}
			};
			var T = {
				load: function(e, r) {
					throw new Error("Load method is not defined. Is the file jszip-load.js included ?")
				},
				filter: function(e) {
					var r = [],
						t, a, n, i;
					for (t in this.files) {
						if (!this.files.hasOwnProperty(t)) {
							continue
						}
						n = this.files[t];
						i = new b(n.name, n._data, E(n.options));
						a = t.slice(this.root.length, t.length);
						if (t.slice(0, this.root.length) === this.root && e(a, i)) {
							r.push(i)
						}
					}
					return r
				},
				file: function(e, r, t) {
					if (arguments.length === 1) {
						if (n.isRegExp(e)) {
							var a = e;
							return this.filter(function(e, r) {
								return !r.dir && a.test(e)
							})
						} else {
							return this.filter(function(r, t) {
								return !t.dir && r === e
							})[0] || null
						}
					} else {
						e = this.root + e;
						k.call(this, e, r, t)
					}
					return this
				},
				folder: function(e) {
					if (!e) {
						return this
					}
					if (n.isRegExp(e)) {
						return this.filter(function(r, t) {
							return t.dir && e.test(r)
						})
					}
					var r = this.root + e;
					var t = A.call(this, r);
					var a = this.clone();
					a.root = t.name;
					return a
				},
				remove: function(e) {
					e = this.root + e;
					var r = this.files[e];
					if (!r) {
						if (e.slice(-1) != "/") {
							e += "/"
						}
						r = this.files[e]
					}
					if (r && !r.dir) {
						delete this.files[e]
					} else {
						var t = this.filter(function(r, t) {
							return t.name.slice(0, e.length) === e
						});
						for (var a = 0; a < t.length; a++) {
							delete this.files[t[a].name]
						}
					}
					return this
				},
				generate: function(e) {
					e = E(e || {}, {
						base64: true,
						compression: "STORE",
						type: "base64",
						comment: null
					});
					n.checkSupport(e.type);
					var r = [],
						t = 0,
						a = 0,
						i, f, c = n.transformTo("string", this.utf8encode(e.comment || this.comment || ""));
					for (var h in this.files) {
						if (!this.files.hasOwnProperty(h)) {
							continue
						}
						var u = this.files[h];
						var v = u.options.compression || e.compression.toUpperCase();
						var g = l[v];
						if (!g) {
							throw new Error(v + " is not a valid compression method !")
						}
						var m = _.call(this, u, g);
						var b = B.call(this, h, u, m, t);
						t += b.fileRecord.length + m.compressedSize;
						a += b.dirRecord.length;
						r.push(b)
					}
					var w = "";
					w = s.CENTRAL_DIRECTORY_END + "\0\0" + "\0\0" + C(r.length, 2) + C(r.length, 2) + C(a, 4) + C(t, 4) + C(c.length, 2) + c;
					var k = e.type.toLowerCase();
					if (k === "uint8array" || k === "arraybuffer" || k === "blob" || k === "nodebuffer") {
						i = new p(t + a + w.length)
					} else {
						i = new d(t + a + w.length)
					}
					for (f = 0; f < r.length; f++) {
						i.append(r[f].fileRecord);
						i.append(r[f].compressedObject.compressedContent)
					}
					for (f = 0; f < r.length; f++) {
						i.append(r[f].dirRecord)
					}
					i.append(w);
					var S = i.finalize();
					switch (e.type.toLowerCase()) {
						case "uint8array":
							;
						case "arraybuffer":
							;
						case "nodebuffer":
							return n.transformTo(e.type.toLowerCase(), S);
						case "blob":
							return n.arrayBuffer2Blob(n.transformTo("arraybuffer", S));
						case "base64":
							return e.base64 ? o.encode(S) : S;
						default:
							return S;
					}
				},
				crc32: function(e, r) {
					return i(e, r)
				},
				utf8encode: function(e) {
					return n.transformTo("string", u.utf8encode(e))
				},
				utf8decode: function(e) {
					return u.utf8decode(e)
				}
			};
			r.exports = T
		}, {
			"./base64": 1,
			"./compressedObject": 2,
			"./compressions": 3,
			"./crc32": 4,
			"./defaults": 6,
			"./nodeBuffer": 11,
			"./signature": 14,
			"./stringWriter": 16,
			"./support": 17,
			"./uint8ArrayWriter": 19,
			"./utf8": 20,
			"./utils": 21
		}],
		14: [function(e, r, t) {
			"use strict";
			t.LOCAL_FILE_HEADER = "PK";
			t.CENTRAL_FILE_HEADER = "PK";
			t.CENTRAL_DIRECTORY_END = "PK";
			t.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK";
			t.ZIP64_CENTRAL_DIRECTORY_END = "PK";
			t.DATA_DESCRIPTOR = "PK\b"
		}, {}],
		15: [function(e, r, t) {
			"use strict";
			var a = e("./dataReader");
			var n = e("./utils");

			function i(e, r) {
				this.data = e;
				if (!r) {
					this.data = n.string2binary(this.data)
				}
				this.length = this.data.length;
				this.index = 0
			}
			i.prototype = new a;
			i.prototype.byteAt = function(e) {
				return this.data.charCodeAt(e)
			};
			i.prototype.lastIndexOfSignature = function(e) {
				return this.data.lastIndexOf(e)
			};
			i.prototype.readData = function(e) {
				this.checkOffset(e);
				var r = this.data.slice(this.index, this.index + e);
				this.index += e;
				return r
			};
			r.exports = i
		}, {
			"./dataReader": 5,
			"./utils": 21
		}],
		16: [function(e, r, t) {
			"use strict";
			var a = e("./utils");
			var n = function() {
				this.data = []
			};
			n.prototype = {
				append: function(e) {
					e = a.transformTo("string", e);
					this.data.push(e)
				},
				finalize: function() {
					return this.data.join("")
				}
			};
			r.exports = n
		}, {
			"./utils": 21
		}],
		17: [function(e, r, t) {
			(function(e) {
				"use strict";
				t.base64 = true;
				t.array = true;
				t.string = true;
				t.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
				t.nodebuffer = typeof e !== "undefined";
				t.uint8array = typeof Uint8Array !== "undefined";
				if (typeof ArrayBuffer === "undefined") {
					t.blob = false
				} else {
					var r = new ArrayBuffer(0);
					try {
						t.blob = new Blob([r], {
							type: "application/zip"
						}).size === 0
					} catch (a) {
						try {
							var n = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
							var i = new n;
							i.append(r);
							t.blob = i.getBlob("application/zip").size === 0
						} catch (a) {
							t.blob = false
						}
					}
				}
			}).call(this, typeof Buffer !== "undefined" ? Buffer : undefined)
		}, {}],
		18: [function(e, r, t) {
			"use strict";
			var a = e("./dataReader");

			function n(e) {
				if (e) {
					this.data = e;
					this.length = this.data.length;
					this.index = 0
				}
			}
			n.prototype = new a;
			n.prototype.byteAt = function(e) {
				return this.data[e]
			};
			n.prototype.lastIndexOfSignature = function(e) {
				var r = e.charCodeAt(0),
					t = e.charCodeAt(1),
					a = e.charCodeAt(2),
					n = e.charCodeAt(3);
				for (var i = this.length - 4; i >= 0; --i) {
					if (this.data[i] === r && this.data[i + 1] === t && this.data[i + 2] === a && this.data[i + 3] === n) {
						return i
					}
				}
				return -1
			};
			n.prototype.readData = function(e) {
				this.checkOffset(e);
				if (e === 0) {
					return new Uint8Array(0)
				}
				var r = this.data.subarray(this.index, this.index + e);
				this.index += e;
				return r
			};
			r.exports = n
		}, {
			"./dataReader": 5
		}],
		19: [function(e, r, t) {
			"use strict";
			var a = e("./utils");
			var n = function(e) {
				this.data = new Uint8Array(e);
				this.index = 0
			};
			n.prototype = {
				append: function(e) {
					if (e.length !== 0) {
						e = a.transformTo("uint8array", e);
						this.data.set(e, this.index);
						this.index += e.length
					}
				},
				finalize: function() {
					return this.data
				}
			};
			r.exports = n
		}, {
			"./utils": 21
		}],
		20: [function(e, r, t) {
			"use strict";
			var a = e("./utils");
			var n = e("./support");
			var i = e("./nodeBuffer");
			var s = new Array(256);
			for (var f = 0; f < 256; f++) {
				s[f] = f >= 252 ? 6 : f >= 248 ? 5 : f >= 240 ? 4 : f >= 224 ? 3 : f >= 192 ? 2 : 1
			}
			s[254] = s[254] = 1;
			var o = function(e) {
				var r, t, a, i, s, f = e.length,
					o = 0;
				for (i = 0; i < f; i++) {
					t = e.charCodeAt(i);
					if ((t & 64512) === 55296 && i + 1 < f) {
						a = e.charCodeAt(i + 1);
						if ((a & 64512) === 56320) {
							t = 65536 + (t - 55296 << 10) + (a - 56320);
							i++
						}
					}
					o += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4
				}
				if (n.uint8array) {
					r = new Uint8Array(o)
				} else {
					r = new Array(o)
				}
				for (s = 0, i = 0; s < o; i++) {
					t = e.charCodeAt(i);
					if ((t & 64512) === 55296 && i + 1 < f) {
						a = e.charCodeAt(i + 1);
						if ((a & 64512) === 56320) {
							t = 65536 + (t - 55296 << 10) + (a - 56320);
							i++
						}
					}
					if (t < 128) {
						r[s++] = t
					} else if (t < 2048) {
						r[s++] = 192 | t >>> 6;
						r[s++] = 128 | t & 63
					} else if (t < 65536) {
						r[s++] = 224 | t >>> 12;
						r[s++] = 128 | t >>> 6 & 63;
						r[s++] = 128 | t & 63
					} else {
						r[s++] = 240 | t >>> 18;
						r[s++] = 128 | t >>> 12 & 63;
						r[s++] = 128 | t >>> 6 & 63;
						r[s++] = 128 | t & 63
					}
				}
				return r
			};
			var l = function(e, r) {
				var t;
				r = r || e.length;
				if (r > e.length) {
					r = e.length
				}
				t = r - 1;
				while (t >= 0 && (e[t] & 192) === 128) {
					t--
				}
				if (t < 0) {
					return r
				}
				if (t === 0) {
					return r
				}
				return t + s[e[t]] > r ? t : r
			};
			var c = function(e) {
				var r, t, n, i, f;
				var o = e.length;
				var l = new Array(o * 2);
				for (n = 0, t = 0; t < o;) {
					i = e[t++];
					if (i < 128) {
						l[n++] = i;
						continue
					}
					f = s[i];
					if (f > 4) {
						l[n++] = 65533;
						t += f - 1;
						continue
					}
					i &= f === 2 ? 31 : f === 3 ? 15 : 7;
					while (f > 1 && t < o) {
						i = i << 6 | e[t++] & 63;
						f--
					}
					if (f > 1) {
						l[n++] = 65533;
						continue
					}
					if (i < 65536) {
						l[n++] = i
					} else {
						i -= 65536;
						l[n++] = 55296 | i >> 10 & 1023;
						l[n++] = 56320 | i & 1023
					}
				}
				if (l.length !== n) {
					if (l.subarray) {
						l = l.subarray(0, n)
					} else {
						l.length = n
					}
				}
				return a.applyFromCharCode(l)
			};
			t.utf8encode = function h(e) {
				if (n.nodebuffer) {
					return i(e, "utf-8")
				}
				return o(e)
			};
			t.utf8decode = function u(e) {
				if (n.nodebuffer) {
					return a.transformTo("nodebuffer", e).toString("utf-8")
				}
				e = a.transformTo(n.uint8array ? "uint8array" : "array", e);
				var r = [],
					t = 0,
					i = e.length,
					s = 65536;
				while (t < i) {
					var f = l(e, Math.min(t + s, i));
					if (n.uint8array) {
						r.push(c(e.subarray(t, f)))
					} else {
						r.push(c(e.slice(t, f)))
					}
					t = f
				}
				return r.join("")
			}
		}, {
			"./nodeBuffer": 11,
			"./support": 17,
			"./utils": 21
		}],
		21: [function(e, r, t) {
			"use strict";
			var a = e("./support");
			var n = e("./compressions");
			var i = e("./nodeBuffer");
			t.string2binary = function(e) {
				var r = "";
				for (var t = 0; t < e.length; t++) {
					r += String.fromCharCode(e.charCodeAt(t) & 255)
				}
				return r
			};
			t.arrayBuffer2Blob = function(e) {
				t.checkSupport("blob");
				try {
					return new Blob([e], {
						type: "application/zip"
					})
				} catch (r) {
					try {
						var a = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
						var n = new a;
						n.append(e);
						return n.getBlob("application/zip")
					} catch (r) {
						throw new Error("Bug : can't construct the Blob.")
					}
				}
			};

			function s(e) {
				return e
			}

			function f(e, r) {
				for (var t = 0; t < e.length; ++t) {
					r[t] = e.charCodeAt(t) & 255
				}
				return r
			}

			function o(e) {
				var r = 65536;
				var a = [],
					n = e.length,
					s = t.getTypeOf(e),
					f = 0,
					o = true;
				try {
					switch (s) {
						case "uint8array":
							String.fromCharCode.apply(null, new Uint8Array(0));
							break;
						case "nodebuffer":
							String.fromCharCode.apply(null, i(0));
							break;
					}
				} catch (l) {
					o = false
				}
				if (!o) {
					var c = "";
					for (var h = 0; h < e.length; h++) {
						c += String.fromCharCode(e[h])
					}
					return c
				}
				while (f < n && r > 1) {
					try {
						if (s === "array" || s === "nodebuffer") {
							a.push(String.fromCharCode.apply(null, e.slice(f, Math.min(f + r, n))))
						} else {
							a.push(String.fromCharCode.apply(null, e.subarray(f, Math.min(f + r, n))))
						}
						f += r
					} catch (l) {
						r = Math.floor(r / 2)
					}
				}
				return a.join("")
			}
			t.applyFromCharCode = o;

			function l(e, r) {
				for (var t = 0; t < e.length; t++) {
					r[t] = e[t]
				}
				return r
			}
			var c = {};
			c["string"] = {
				string: s,
				array: function(e) {
					return f(e, new Array(e.length))
				},
				arraybuffer: function(e) {
					return c["string"]["uint8array"](e).buffer
				},
				uint8array: function(e) {
					return f(e, new Uint8Array(e.length))
				},
				nodebuffer: function(e) {
					return f(e, i(e.length))
				}
			};
			c["array"] = {
				string: o,
				array: s,
				arraybuffer: function(e) {
					return new Uint8Array(e).buffer
				},
				uint8array: function(e) {
					return new Uint8Array(e)
				},
				nodebuffer: function(e) {
					return i(e)
				}
			};
			c["arraybuffer"] = {
				string: function(e) {
					return o(new Uint8Array(e))
				},
				array: function(e) {
					return l(new Uint8Array(e), new Array(e.byteLength))
				},
				arraybuffer: s,
				uint8array: function(e) {
					return new Uint8Array(e)
				},
				nodebuffer: function(e) {
					return i(new Uint8Array(e))
				}
			};
			c["uint8array"] = {
				string: o,
				array: function(e) {
					return l(e, new Array(e.length))
				},
				arraybuffer: function(e) {
					return e.buffer
				},
				uint8array: s,
				nodebuffer: function(e) {
					return i(e)
				}
			};
			c["nodebuffer"] = {
				string: o,
				array: function(e) {
					return l(e, new Array(e.length))
				},
				arraybuffer: function(e) {
					return c["nodebuffer"]["uint8array"](e).buffer
				},
				uint8array: function(e) {
					return l(e, new Uint8Array(e.length))
				},
				nodebuffer: s
			};
			t.transformTo = function(e, r) {
				if (!r) {
					r = ""
				}
				if (!e) {
					return r
				}
				t.checkSupport(e);
				var a = t.getTypeOf(r);
				var n = c[a][e](r);
				return n
			};
			t.getTypeOf = function(e) {
				if (typeof e === "string") {
					return "string"
				}
				if (Object.prototype.toString.call(e) === "[object Array]") {
					return "array"
				}
				if (a.nodebuffer && i.test(e)) {
					return "nodebuffer"
				}
				if (a.uint8array && e instanceof Uint8Array) {
					return "uint8array"
				}
				if (a.arraybuffer && e instanceof ArrayBuffer) {
					return "arraybuffer"
				}
			};
			t.checkSupport = function(e) {
				var r = a[e.toLowerCase()];
				if (!r) {
					throw new Error(e + " is not supported by this browser")
				}
			};
			t.MAX_VALUE_16BITS = 65535;
			t.MAX_VALUE_32BITS = -1;
			t.pretty = function(e) {
				var r = "",
					t, a;
				for (a = 0; a < (e || "").length; a++) {
					t = e.charCodeAt(a);
					r += "\\x" + (t < 16 ? "0" : "") + t.toString(16).toUpperCase()
				}
				return r
			};
			t.findCompression = function(e) {
				for (var r in n) {
					if (!n.hasOwnProperty(r)) {
						continue
					}
					if (n[r].magic === e) {
						return n[r]
					}
				}
				return null
			};
			t.isRegExp = function(e) {
				return Object.prototype.toString.call(e) === "[object RegExp]"
			}
		}, {
			"./compressions": 3,
			"./nodeBuffer": 11,
			"./support": 17
		}],
		22: [function(e, r, t) {
			"use strict";
			var a = e("./stringReader");
			var n = e("./nodeBufferReader");
			var i = e("./uint8ArrayReader");
			var s = e("./utils");
			var f = e("./signature");
			var o = e("./zipEntry");
			var l = e("./support");
			var c = e("./object");

			function h(e, r) {
				this.files = [];
				this.loadOptions = r;
				if (e) {
					this.load(e)
				}
			}
			h.prototype = {
				checkSignature: function(e) {
					var r = this.reader.readString(4);
					if (r !== e) {
						throw new Error("Corrupted zip or bug : unexpected signature " + "(" + s.pretty(r) + ", expected " + s.pretty(e) + ")")
					}
				},
				readBlockEndOfCentral: function() {
					this.diskNumber = this.reader.readInt(2);
					this.diskWithCentralDirStart = this.reader.readInt(2);
					this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
					this.centralDirRecords = this.reader.readInt(2);
					this.centralDirSize = this.reader.readInt(4);
					this.centralDirOffset = this.reader.readInt(4);
					this.zipCommentLength = this.reader.readInt(2);
					this.zipComment = this.reader.readString(this.zipCommentLength);
					this.zipComment = c.utf8decode(this.zipComment)
				},
				readBlockZip64EndOfCentral: function() {
					this.zip64EndOfCentralSize = this.reader.readInt(8);
					this.versionMadeBy = this.reader.readString(2);
					this.versionNeeded = this.reader.readInt(2);
					this.diskNumber = this.reader.readInt(4);
					this.diskWithCentralDirStart = this.reader.readInt(4);
					this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
					this.centralDirRecords = this.reader.readInt(8);
					this.centralDirSize = this.reader.readInt(8);
					this.centralDirOffset = this.reader.readInt(8);
					this.zip64ExtensibleData = {};
					var e = this.zip64EndOfCentralSize - 44,
						r = 0,
						t, a, n;
					while (r < e) {
						t = this.reader.readInt(2);
						a = this.reader.readInt(4);
						n = this.reader.readString(a);
						this.zip64ExtensibleData[t] = {
							id: t,
							length: a,
							value: n
						}
					}
				},
				readBlockZip64EndOfCentralLocator: function() {
					this.diskWithZip64CentralDirStart = this.reader.readInt(4);
					this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
					this.disksCount = this.reader.readInt(4);
					if (this.disksCount > 1) {
						throw new Error("Multi-volumes zip are not supported")
					}
				},
				readLocalFiles: function() {
					var e, r;
					for (e = 0; e < this.files.length; e++) {
						r = this.files[e];
						this.reader.setIndex(r.localHeaderOffset);
						this.checkSignature(f.LOCAL_FILE_HEADER);
						r.readLocalPart(this.reader);
						r.handleUTF8()
					}
				},
				readCentralDir: function() {
					var e;
					this.reader.setIndex(this.centralDirOffset);
					while (this.reader.readString(4) === f.CENTRAL_FILE_HEADER) {
						e = new o({
							zip64: this.zip64
						}, this.loadOptions);
						e.readCentralPart(this.reader);
						this.files.push(e)
					}
				},
				readEndOfCentral: function() {
					var e = this.reader.lastIndexOfSignature(f.CENTRAL_DIRECTORY_END);
					if (e === -1) {
						throw new Error("Corrupted zip : can't find end of central directory")
					}
					this.reader.setIndex(e);
					this.checkSignature(f.CENTRAL_DIRECTORY_END);
					this.readBlockEndOfCentral();
					if (this.diskNumber === s.MAX_VALUE_16BITS || this.diskWithCentralDirStart === s.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk ===
						s.MAX_VALUE_16BITS || this.centralDirRecords === s.MAX_VALUE_16BITS || this.centralDirSize === s.MAX_VALUE_32BITS || this.centralDirOffset ===
						s.MAX_VALUE_32BITS) {
						this.zip64 = true;
						e = this.reader.lastIndexOfSignature(f.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
						if (e === -1) {
							throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator")
						}
						this.reader.setIndex(e);
						this.checkSignature(f.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
						this.readBlockZip64EndOfCentralLocator();
						this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
						this.checkSignature(f.ZIP64_CENTRAL_DIRECTORY_END);
						this.readBlockZip64EndOfCentral()
					}
				},
				prepareReader: function(e) {
					var r = s.getTypeOf(e);
					if (r === "string" && !l.uint8array) {
						this.reader = new a(e, this.loadOptions.optimizedBinaryString)
					} else if (r === "nodebuffer") {
						this.reader = new n(e)
					} else {
						this.reader = new i(s.transformTo("uint8array", e))
					}
				},
				load: function(e) {
					this.prepareReader(e);
					this.readEndOfCentral();
					this.readCentralDir();
					this.readLocalFiles()
				}
			};
			r.exports = h
		}, {
			"./nodeBufferReader": 12,
			"./object": 13,
			"./signature": 14,
			"./stringReader": 15,
			"./support": 17,
			"./uint8ArrayReader": 18,
			"./utils": 21,
			"./zipEntry": 23
		}],
		23: [function(e, r, t) {
			"use strict";
			var a = e("./stringReader");
			var n = e("./utils");
			var i = e("./compressedObject");
			var s = e("./object");

			function f(e, r) {
				this.options = e;
				this.loadOptions = r
			}
			f.prototype = {
				isEncrypted: function() {
					return (this.bitFlag & 1) === 1
				},
				useUTF8: function() {
					return (this.bitFlag & 2048) === 2048
				},
				prepareCompressedContent: function(e, r, t) {
					return function() {
						var a = e.index;
						e.setIndex(r);
						var n = e.readData(t);
						e.setIndex(a);
						return n
					}
				},
				prepareContent: function(e, r, t, a, i) {
					return function() {
						var e = n.transformTo(a.uncompressInputType, this.getCompressedContent());
						var r = a.uncompress(e);
						if (r.length !== i) {
							throw new Error("Bug : uncompressed data size mismatch")
						}
						return r
					}
				},
				readLocalPart: function(e) {
					var r, t;
					e.skip(22);
					this.fileNameLength = e.readInt(2);
					t = e.readInt(2);
					this.fileName = e.readString(this.fileNameLength);
					e.skip(t);
					if (this.compressedSize == -1 || this.uncompressedSize == -1) {
						throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory " +
							"(compressedSize == -1 || uncompressedSize == -1)")
					}
					r = n.findCompression(this.compressionMethod);
					if (r === null) {
						throw new Error("Corrupted zip : compression " + n.pretty(this.compressionMethod) + " unknown (inner file : " + this.fileName +
							")")
					}
					this.decompressed = new i;
					this.decompressed.compressedSize = this.compressedSize;
					this.decompressed.uncompressedSize = this.uncompressedSize;
					this.decompressed.crc32 = this.crc32;
					this.decompressed.compressionMethod = this.compressionMethod;
					this.decompressed.getCompressedContent = this.prepareCompressedContent(e, e.index, this.compressedSize, r);
					this.decompressed.getContent = this.prepareContent(e, e.index, this.compressedSize, r, this.uncompressedSize);
					if (this.loadOptions.checkCRC32) {
						this.decompressed = n.transformTo("string", this.decompressed.getContent());
						if (s.crc32(this.decompressed) !== this.crc32) {
							throw new Error("Corrupted zip : CRC32 mismatch")
						}
					}
				},
				readCentralPart: function(e) {
					this.versionMadeBy = e.readString(2);
					this.versionNeeded = e.readInt(2);
					this.bitFlag = e.readInt(2);
					this.compressionMethod = e.readString(2);
					this.date = e.readDate();
					this.crc32 = e.readInt(4);
					this.compressedSize = e.readInt(4);
					this.uncompressedSize = e.readInt(4);
					this.fileNameLength = e.readInt(2);
					this.extraFieldsLength = e.readInt(2);
					this.fileCommentLength = e.readInt(2);
					this.diskNumberStart = e.readInt(2);
					this.internalFileAttributes = e.readInt(2);
					this.externalFileAttributes = e.readInt(4);
					this.localHeaderOffset = e.readInt(4);
					if (this.isEncrypted()) {
						throw new Error("Encrypted zip are not supported")
					}
					this.fileName = e.readString(this.fileNameLength);
					this.readExtraFields(e);
					this.parseZIP64ExtraField(e);
					this.fileComment = e.readString(this.fileCommentLength);
					this.dir = this.externalFileAttributes & 16 ? true : false
				},
				parseZIP64ExtraField: function(e) {
					if (!this.extraFields[1]) {
						return
					}
					var r = new a(this.extraFields[1].value);
					if (this.uncompressedSize === n.MAX_VALUE_32BITS) {
						this.uncompressedSize = r.readInt(8)
					}
					if (this.compressedSize === n.MAX_VALUE_32BITS) {
						this.compressedSize = r.readInt(8)
					}
					if (this.localHeaderOffset === n.MAX_VALUE_32BITS) {
						this.localHeaderOffset = r.readInt(8)
					}
					if (this.diskNumberStart === n.MAX_VALUE_32BITS) {
						this.diskNumberStart = r.readInt(4)
					}
				},
				readExtraFields: function(e) {
					var r = e.index,
						t, a, n;
					this.extraFields = this.extraFields || {};
					while (e.index < r + this.extraFieldsLength) {
						t = e.readInt(2);
						a = e.readInt(2);
						n = e.readString(a);
						this.extraFields[t] = {
							id: t,
							length: a,
							value: n
						}
					}
				},
				handleUTF8: function() {
					if (this.useUTF8()) {
						this.fileName = s.utf8decode(this.fileName);
						this.fileComment = s.utf8decode(this.fileComment)
					} else {
						var e = this.findExtraFieldUnicodePath();
						if (e !== null) {
							this.fileName = e
						}
						var r = this.findExtraFieldUnicodeComment();
						if (r !== null) {
							this.fileComment = r
						}
					}
				},
				findExtraFieldUnicodePath: function() {
					var e = this.extraFields[28789];
					if (e) {
						var r = new a(e.value);
						if (r.readInt(1) !== 1) {
							return null
						}
						if (s.crc32(this.fileName) !== r.readInt(4)) {
							return null
						}
						return s.utf8decode(r.readString(e.length - 5))
					}
					return null
				},
				findExtraFieldUnicodeComment: function() {
					var e = this.extraFields[25461];
					if (e) {
						var r = new a(e.value);
						if (r.readInt(1) !== 1) {
							return null
						}
						if (s.crc32(this.fileComment) !== r.readInt(4)) {
							return null
						}
						return s.utf8decode(r.readString(e.length - 5));
					}
					return null
				}
			};
			r.exports = f
		}, {
			"./compressedObject": 2,
			"./object": 13,
			"./stringReader": 15,
			"./utils": 21
		}],
		24: [function(e, r, t) {
			"use strict";
			var a = e("./lib/utils/common").assign;
			var n = e("./lib/deflate");
			var i = e("./lib/inflate");
			var s = e("./lib/zlib/constants");
			var f = {};
			a(f, n, i, s);
			r.exports = f
		}, {
			"./lib/deflate": 25,
			"./lib/inflate": 26,
			"./lib/utils/common": 27,
			"./lib/zlib/constants": 30
		}],
		25: [function(e, r, t) {
			"use strict";
			var a = e("./zlib/deflate.js");
			var n = e("./utils/common");
			var i = e("./utils/strings");
			var s = e("./zlib/messages");
			var f = e("./zlib/zstream");
			var o = 0;
			var l = 4;
			var c = 0;
			var h = 1;
			var u = -1;
			var d = 0;
			var p = 8;
			var v = function(e) {
				this.options = n.assign({
					level: u,
					method: p,
					chunkSize: 16384,
					windowBits: 15,
					memLevel: 8,
					strategy: d,
					to: ""
				}, e || {});
				var r = this.options;
				if (r.raw && r.windowBits > 0) {
					r.windowBits = -r.windowBits
				} else if (r.gzip && r.windowBits > 0 && r.windowBits < 16) {
					r.windowBits += 16
				}
				this.err = 0;
				this.msg = "";
				this.ended = false;
				this.chunks = [];
				this.strm = new f;
				this.strm.avail_out = 0;
				var t = a.deflateInit2(this.strm, r.level, r.method, r.windowBits, r.memLevel, r.strategy);
				if (t !== c) {
					throw new Error(s[t])
				}
				if (r.header) {
					a.deflateSetHeader(this.strm, r.header)
				}
			};
			v.prototype.push = function(e, r) {
				var t = this.strm;
				var s = this.options.chunkSize;
				var f, u;
				if (this.ended) {
					return false
				}
				u = r === ~~r ? r : r === true ? l : o;
				if (typeof e === "string") {
					t.input = i.string2buf(e)
				} else {
					t.input = e
				}
				t.next_in = 0;
				t.avail_in = t.input.length;
				do {
					if (t.avail_out === 0) {
						t.output = new n.Buf8(s);
						t.next_out = 0;
						t.avail_out = s
					}
					f = a.deflate(t, u);
					if (f !== h && f !== c) {
						this.onEnd(f);
						this.ended = true;
						return false
					}
					if (t.avail_out === 0 || t.avail_in === 0 && u === l) {
						if (this.options.to === "string") {
							this.onData(i.buf2binstring(n.shrinkBuf(t.output, t.next_out)))
						} else {
							this.onData(n.shrinkBuf(t.output, t.next_out))
						}
					}
				} while ((t.avail_in > 0 || t.avail_out === 0) && f !== h);
				if (u === l) {
					f = a.deflateEnd(this.strm);
					this.onEnd(f);
					this.ended = true;
					return f === c
				}
				return true
			};
			v.prototype.onData = function(e) {
				this.chunks.push(e)
			};
			v.prototype.onEnd = function(e) {
				if (e === c) {
					if (this.options.to === "string") {
						this.result = this.chunks.join("")
					} else {
						this.result = n.flattenChunks(this.chunks)
					}
				}
				this.chunks = [];
				this.err = e;
				this.msg = this.strm.msg
			};

			function g(e, r) {
				var t = new v(r);
				t.push(e, true);
				if (t.err) {
					throw t.msg
				}
				return t.result
			}

			function m(e, r) {
				r = r || {};
				r.raw = true;
				return g(e, r)
			}

			function b(e, r) {
				r = r || {};
				r.gzip = true;
				return g(e, r)
			}
			t.Deflate = v;
			t.deflate = g;
			t.deflateRaw = m;
			t.gzip = b
		}, {
			"./utils/common": 27,
			"./utils/strings": 28,
			"./zlib/deflate.js": 32,
			"./zlib/messages": 37,
			"./zlib/zstream": 39
		}],
		26: [function(e, r, t) {
			"use strict";
			var a = e("./zlib/inflate.js");
			var n = e("./utils/common");
			var i = e("./utils/strings");
			var s = e("./zlib/constants");
			var f = e("./zlib/messages");
			var o = e("./zlib/zstream");
			var l = e("./zlib/gzheader");
			var c = function(e) {
				this.options = n.assign({
					chunkSize: 16384,
					windowBits: 0,
					to: ""
				}, e || {});
				var r = this.options;
				if (r.raw && r.windowBits >= 0 && r.windowBits < 16) {
					r.windowBits = -r.windowBits;
					if (r.windowBits === 0) {
						r.windowBits = -15
					}
				}
				if (r.windowBits >= 0 && r.windowBits < 16 && !(e && e.windowBits)) {
					r.windowBits += 32
				}
				if (r.windowBits > 15 && r.windowBits < 48) {
					if ((r.windowBits & 15) === 0) {
						r.windowBits |= 15
					}
				}
				this.err = 0;
				this.msg = "";
				this.ended = false;
				this.chunks = [];
				this.strm = new o;
				this.strm.avail_out = 0;
				var t = a.inflateInit2(this.strm, r.windowBits);
				if (t !== s.Z_OK) {
					throw new Error(f[t])
				}
				this.header = new l;
				a.inflateGetHeader(this.strm, this.header)
			};
			c.prototype.push = function(e, r) {
				var t = this.strm;
				var f = this.options.chunkSize;
				var o, l;
				var c, h, u;
				if (this.ended) {
					return false
				}
				l = r === ~~r ? r : r === true ? s.Z_FINISH : s.Z_NO_FLUSH;
				if (typeof e === "string") {
					t.input = i.binstring2buf(e)
				} else {
					t.input = e
				}
				t.next_in = 0;
				t.avail_in = t.input.length;
				do {
					if (t.avail_out === 0) {
						t.output = new n.Buf8(f);
						t.next_out = 0;
						t.avail_out = f
					}
					o = a.inflate(t, s.Z_NO_FLUSH);
					if (o !== s.Z_STREAM_END && o !== s.Z_OK) {
						this.onEnd(o);
						this.ended = true;
						return false
					}
					if (t.next_out) {
						if (t.avail_out === 0 || o === s.Z_STREAM_END || t.avail_in === 0 && l === s.Z_FINISH) {
							if (this.options.to === "string") {
								c = i.utf8border(t.output, t.next_out);
								h = t.next_out - c;
								u = i.buf2string(t.output, c);
								t.next_out = h;
								t.avail_out = f - h;
								if (h) {
									n.arraySet(t.output, t.output, c, h, 0)
								}
								this.onData(u)
							} else {
								this.onData(n.shrinkBuf(t.output, t.next_out))
							}
						}
					}
				} while (t.avail_in > 0 && o !== s.Z_STREAM_END);
				if (o === s.Z_STREAM_END) {
					l = s.Z_FINISH
				}
				if (l === s.Z_FINISH) {
					o = a.inflateEnd(this.strm);
					this.onEnd(o);
					this.ended = true;
					return o === s.Z_OK
				}
				return true
			};
			c.prototype.onData = function(e) {
				this.chunks.push(e)
			};
			c.prototype.onEnd = function(e) {
				if (e === s.Z_OK) {
					if (this.options.to === "string") {
						this.result = this.chunks.join("")
					} else {
						this.result = n.flattenChunks(this.chunks)
					}
				}
				this.chunks = [];
				this.err = e;
				this.msg = this.strm.msg
			};

			function h(e, r) {
				var t = new c(r);
				t.push(e, true);
				if (t.err) {
					throw t.msg
				}
				return t.result
			}

			function u(e, r) {
				r = r || {};
				r.raw = true;
				return h(e, r)
			}
			t.Inflate = c;
			t.inflate = h;
			t.inflateRaw = u;
			t.ungzip = h
		}, {
			"./utils/common": 27,
			"./utils/strings": 28,
			"./zlib/constants": 30,
			"./zlib/gzheader": 33,
			"./zlib/inflate.js": 35,
			"./zlib/messages": 37,
			"./zlib/zstream": 39
		}],
		27: [function(e, r, t) {
			"use strict";
			var a = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
			t.assign = function(e) {
				var r = Array.prototype.slice.call(arguments, 1);
				while (r.length) {
					var t = r.shift();
					if (!t) {
						continue
					}
					if (typeof t !== "object") {
						throw new TypeError(t + "must be non-object")
					}
					for (var a in t) {
						if (t.hasOwnProperty(a)) {
							e[a] = t[a]
						}
					}
				}
				return e
			};
			t.shrinkBuf = function(e, r) {
				if (e.length === r) {
					return e
				}
				if (e.subarray) {
					return e.subarray(0, r)
				}
				e.length = r;
				return e
			};
			var n = {
				arraySet: function(e, r, t, a, n) {
					if (r.subarray && e.subarray) {
						e.set(r.subarray(t, t + a), n);
						return
					}
					for (var i = 0; i < a; i++) {
						e[n + i] = r[t + i]
					}
				},
				flattenChunks: function(e) {
					var r, t, a, n, i, s;
					a = 0;
					for (r = 0, t = e.length; r < t; r++) {
						a += e[r].length
					}
					s = new Uint8Array(a);
					n = 0;
					for (r = 0, t = e.length; r < t; r++) {
						i = e[r];
						s.set(i, n);
						n += i.length
					}
					return s
				}
			};
			var i = {
				arraySet: function(e, r, t, a, n) {
					for (var i = 0; i < a; i++) {
						e[n + i] = r[t + i]
					}
				},
				flattenChunks: function(e) {
					return [].concat.apply([], e)
				}
			};
			t.setTyped = function(e) {
				if (e) {
					t.Buf8 = Uint8Array;
					t.Buf16 = Uint16Array;
					t.Buf32 = Int32Array;
					t.assign(t, n)
				} else {
					t.Buf8 = Array;
					t.Buf16 = Array;
					t.Buf32 = Array;
					t.assign(t, i)
				}
			};
			t.setTyped(a)
		}, {}],
		28: [function(e, r, t) {
			"use strict";
			var a = e("./common");
			var n = true;
			var i = true;
			try {
				String.fromCharCode.apply(null, [0])
			} catch (s) {
				n = false
			}
			try {
				String.fromCharCode.apply(null, new Uint8Array(1))
			} catch (s) {
				i = false
			}
			var f = new a.Buf8(256);
			for (var o = 0; o < 256; o++) {
				f[o] = o >= 252 ? 6 : o >= 248 ? 5 : o >= 240 ? 4 : o >= 224 ? 3 : o >= 192 ? 2 : 1
			}
			f[254] = f[254] = 1;
			t.string2buf = function(e) {
				var r, t, n, i, s, f = e.length,
					o = 0;
				for (i = 0; i < f; i++) {
					t = e.charCodeAt(i);
					if ((t & 64512) === 55296 && i + 1 < f) {
						n = e.charCodeAt(i + 1);
						if ((n & 64512) === 56320) {
							t = 65536 + (t - 55296 << 10) + (n - 56320);
							i++
						}
					}
					o += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4
				}
				r = new a.Buf8(o);
				for (s = 0, i = 0; s < o; i++) {
					t = e.charCodeAt(i);
					if ((t & 64512) === 55296 && i + 1 < f) {
						n = e.charCodeAt(i + 1);
						if ((n & 64512) === 56320) {
							t = 65536 + (t - 55296 << 10) + (n - 56320);
							i++
						}
					}
					if (t < 128) {
						r[s++] = t
					} else if (t < 2048) {
						r[s++] = 192 | t >>> 6;
						r[s++] = 128 | t & 63
					} else if (t < 65536) {
						r[s++] = 224 | t >>> 12;
						r[s++] = 128 | t >>> 6 & 63;
						r[s++] = 128 | t & 63
					} else {
						r[s++] = 240 | t >>> 18;
						r[s++] = 128 | t >>> 12 & 63;
						r[s++] = 128 | t >>> 6 & 63;
						r[s++] = 128 | t & 63
					}
				}
				return r
			};

			function l(e, r) {
				if (r < 65537) {
					if (e.subarray && i || !e.subarray && n) {
						return String.fromCharCode.apply(null, a.shrinkBuf(e, r))
					}
				}
				var t = "";
				for (var s = 0; s < r; s++) {
					t += String.fromCharCode(e[s])
				}
				return t
			}
			t.buf2binstring = function(e) {
				return l(e, e.length)
			};
			t.binstring2buf = function(e) {
				var r = new a.Buf8(e.length);
				for (var t = 0, n = r.length; t < n; t++) {
					r[t] = e.charCodeAt(t)
				}
				return r
			};
			t.buf2string = function(e, r) {
				var t, a, n, i;
				var s = r || e.length;
				var o = new Array(s * 2);
				for (a = 0, t = 0; t < s;) {
					n = e[t++];
					if (n < 128) {
						o[a++] = n;
						continue
					}
					i = f[n];
					if (i > 4) {
						o[a++] = 65533;
						t += i - 1;
						continue
					}
					n &= i === 2 ? 31 : i === 3 ? 15 : 7;
					while (i > 1 && t < s) {
						n = n << 6 | e[t++] & 63;
						i--
					}
					if (i > 1) {
						o[a++] = 65533;
						continue
					}
					if (n < 65536) {
						o[a++] = n
					} else {
						n -= 65536;
						o[a++] = 55296 | n >> 10 & 1023;
						o[a++] = 56320 | n & 1023
					}
				}
				return l(o, a)
			};
			t.utf8border = function(e, r) {
				var t;
				r = r || e.length;
				if (r > e.length) {
					r = e.length
				}
				t = r - 1;
				while (t >= 0 && (e[t] & 192) === 128) {
					t--
				}
				if (t < 0) {
					return r
				}
				if (t === 0) {
					return r
				}
				return t + f[e[t]] > r ? t : r
			}
		}, {
			"./common": 27
		}],
		29: [function(e, r, t) {
			"use strict";

			function a(e, r, t, a) {
				var n = e & 65535 | 0,
					i = e >>> 16 & 65535 | 0,
					s = 0;
				while (t !== 0) {
					s = t > 2e3 ? 2e3 : t;
					t -= s;
					do {
						n = n + r[a++] | 0;
						i = i + n | 0
					} while (--s);
					n %= 65521;
					i %= 65521
				}
				return n | i << 16 | 0
			}
			r.exports = a
		}, {}],
		30: [function(e, r, t) {
			r.exports = {
				Z_NO_FLUSH: 0,
				Z_PARTIAL_FLUSH: 1,
				Z_SYNC_FLUSH: 2,
				Z_FULL_FLUSH: 3,
				Z_FINISH: 4,
				Z_BLOCK: 5,
				Z_TREES: 6,
				Z_OK: 0,
				Z_STREAM_END: 1,
				Z_NEED_DICT: 2,
				Z_ERRNO: -1,
				Z_STREAM_ERROR: -2,
				Z_DATA_ERROR: -3,
				Z_BUF_ERROR: -5,
				Z_NO_COMPRESSION: 0,
				Z_BEST_SPEED: 1,
				Z_BEST_COMPRESSION: 9,
				Z_DEFAULT_COMPRESSION: -1,
				Z_FILTERED: 1,
				Z_HUFFMAN_ONLY: 2,
				Z_RLE: 3,
				Z_FIXED: 4,
				Z_DEFAULT_STRATEGY: 0,
				Z_BINARY: 0,
				Z_TEXT: 1,
				Z_UNKNOWN: 2,
				Z_DEFLATED: 8
			}
		}, {}],
		31: [function(e, r, t) {
			"use strict";

			function a() {
				var e, r = [];
				for (var t = 0; t < 256; t++) {
					e = t;
					for (var a = 0; a < 8; a++) {
						e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1
					}
					r[t] = e
				}
				return r
			}
			var n = a();

			function i(e, r, t, a) {
				var i = n,
					s = a + t;
				e = e ^ -1;
				for (var f = a; f < s; f++) {
					e = e >>> 8 ^ i[(e ^ r[f]) & 255]
				}
				return e ^ -1
			}
			r.exports = i
		}, {}],
		32: [function(e, r, t) {
			"use strict";
			var a = e("../utils/common");
			var n = e("./trees");
			var i = e("./adler32");
			var s = e("./crc32");
			var f = e("./messages");
			var o = 0;
			var l = 1;
			var c = 3;
			var h = 4;
			var u = 5;
			var d = 0;
			var p = 1;
			var v = -2;
			var g = -3;
			var m = -5;
			var b = -1;
			var C = 1;
			var E = 2;
			var w = 3;
			var k = 4;
			var S = 0;
			var A = 2;
			var _ = 8;
			var B = 9;
			var T = 15;
			var x = 8;
			var y = 29;
			var I = 256;
			var R = I + 1 + y;
			var O = 30;
			var D = 19;
			var F = 2 * R + 1;
			var P = 15;
			var N = 3;
			var L = 258;
			var M = L + N + 1;
			var U = 32;
			var H = 42;
			var W = 69;
			var V = 73;
			var z = 91;
			var X = 103;
			var G = 113;
			var j = 666;
			var K = 1;
			var Y = 2;
			var $ = 3;
			var Z = 4;
			var Q = 3;

			function J(e, r) {
				e.msg = f[r];
				return r
			}

			function q(e) {
				return (e << 1) - (e > 4 ? 9 : 0)
			}

			function ee(e) {
				var r = e.length;
				while (--r >= 0) {
					e[r] = 0
				}
			}

			function re(e) {
				var r = e.state;
				var t = r.pending;
				if (t > e.avail_out) {
					t = e.avail_out
				}
				if (t === 0) {
					return
				}
				a.arraySet(e.output, r.pending_buf, r.pending_out, t, e.next_out);
				e.next_out += t;
				r.pending_out += t;
				e.total_out += t;
				e.avail_out -= t;
				r.pending -= t;
				if (r.pending === 0) {
					r.pending_out = 0
				}
			}

			function te(e, r) {
				n._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, r);
				e.block_start = e.strstart;
				re(e.strm)
			}

			function ae(e, r) {
				e.pending_buf[e.pending++] = r
			}

			function ne(e, r) {
				e.pending_buf[e.pending++] = r >>> 8 & 255;
				e.pending_buf[e.pending++] = r & 255
			}

			function ie(e, r, t, n) {
				var f = e.avail_in;
				if (f > n) {
					f = n
				}
				if (f === 0) {
					return 0
				}
				e.avail_in -= f;
				a.arraySet(r, e.input, e.next_in, f, t);
				if (e.state.wrap === 1) {
					e.adler = i(e.adler, r, f, t)
				} else if (e.state.wrap === 2) {
					e.adler = s(e.adler, r, f, t)
				}
				e.next_in += f;
				e.total_in += f;
				return f
			}

			function se(e, r) {
				var t = e.max_chain_length;
				var a = e.strstart;
				var n;
				var i;
				var s = e.prev_length;
				var f = e.nice_match;
				var o = e.strstart > e.w_size - M ? e.strstart - (e.w_size - M) : 0;
				var l = e.window;
				var c = e.w_mask;
				var h = e.prev;
				var u = e.strstart + L;
				var d = l[a + s - 1];
				var p = l[a + s];
				if (e.prev_length >= e.good_match) {
					t >>= 2
				}
				if (f > e.lookahead) {
					f = e.lookahead
				}
				do {
					n = r;
					if (l[n + s] !== p || l[n + s - 1] !== d || l[n] !== l[a] || l[++n] !== l[a + 1]) {
						continue
					}
					a += 2;
					n++;
					do {} while (l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] ===
						l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && a < u);
					i = L - (u - a);
					a = u - L;
					if (i > s) {
						e.match_start = r;
						s = i;
						if (i >= f) {
							break
						}
						d = l[a + s - 1];
						p = l[a + s]
					}
				} while ((r = h[r & c]) > o && --t !== 0);
				if (s <= e.lookahead) {
					return s
				}
				return e.lookahead
			}

			function fe(e) {
				var r = e.w_size;
				var t, n, i, s, f;
				do {
					s = e.window_size - e.lookahead - e.strstart;
					if (e.strstart >= r + (r - M)) {
						a.arraySet(e.window, e.window, r, r, 0);
						e.match_start -= r;
						e.strstart -= r;
						e.block_start -= r;
						n = e.hash_size;
						t = n;
						do {
							i = e.head[--t];
							e.head[t] = i >= r ? i - r : 0
						} while (--n);
						n = r;
						t = n;
						do {
							i = e.prev[--t];
							e.prev[t] = i >= r ? i - r : 0
						} while (--n);
						s += r
					}
					if (e.strm.avail_in === 0) {
						break
					}
					n = ie(e.strm, e.window, e.strstart + e.lookahead, s);
					e.lookahead += n;
					if (e.lookahead + e.insert >= N) {
						f = e.strstart - e.insert;
						e.ins_h = e.window[f];
						e.ins_h = (e.ins_h << e.hash_shift ^ e.window[f + 1]) & e.hash_mask;
						while (e.insert) {
							e.ins_h = (e.ins_h << e.hash_shift ^ e.window[f + N - 1]) & e.hash_mask;
							e.prev[f & e.w_mask] = e.head[e.ins_h];
							e.head[e.ins_h] = f;
							f++;
							e.insert--;
							if (e.lookahead + e.insert < N) {
								break
							}
						}
					}
				} while (e.lookahead < M && e.strm.avail_in !== 0)
			}

			function oe(e, r) {
				var t = 65535;
				if (t > e.pending_buf_size - 5) {
					t = e.pending_buf_size - 5
				}
				for (;;) {
					if (e.lookahead <= 1) {
						fe(e);
						if (e.lookahead === 0 && r === o) {
							return K
						}
						if (e.lookahead === 0) {
							break
						}
					}
					e.strstart += e.lookahead;
					e.lookahead = 0;
					var a = e.block_start + t;
					if (e.strstart === 0 || e.strstart >= a) {
						e.lookahead = e.strstart - a;
						e.strstart = a;
						te(e, false);
						if (e.strm.avail_out === 0) {
							return K
						}
					}
					if (e.strstart - e.block_start >= e.w_size - M) {
						te(e, false);
						if (e.strm.avail_out === 0) {
							return K
						}
					}
				}
				e.insert = 0;
				if (r === h) {
					te(e, true);
					if (e.strm.avail_out === 0) {
						return $
					}
					return Z
				}
				if (e.strstart > e.block_start) {
					te(e, false);
					if (e.strm.avail_out === 0) {
						return K
					}
				}
				return K
			}

			function le(e, r) {
				var t;
				var a;
				for (;;) {
					if (e.lookahead < M) {
						fe(e);
						if (e.lookahead < M && r === o) {
							return K
						}
						if (e.lookahead === 0) {
							break
						}
					}
					t = 0;
					if (e.lookahead >= N) {
						e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
						t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
						e.head[e.ins_h] = e.strstart
					}
					if (t !== 0 && e.strstart - t <= e.w_size - M) {
						e.match_length = se(e, t)
					}
					if (e.match_length >= N) {
						a = n._tr_tally(e, e.strstart - e.match_start, e.match_length - N);
						e.lookahead -= e.match_length;
						if (e.match_length <= e.max_lazy_match && e.lookahead >= N) {
							e.match_length--;
							do {
								e.strstart++;
								e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
								t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
								e.head[e.ins_h] = e.strstart
							} while (--e.match_length !== 0);
							e.strstart++
						} else {
							e.strstart += e.match_length;
							e.match_length = 0;
							e.ins_h = e.window[e.strstart];
							e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask
						}
					} else {
						a = n._tr_tally(e, 0, e.window[e.strstart]);
						e.lookahead--;
						e.strstart++
					}
					if (a) {
						te(e, false);
						if (e.strm.avail_out === 0) {
							return K
						}
					}
				}
				e.insert = e.strstart < N - 1 ? e.strstart : N - 1;
				if (r === h) {
					te(e, true);
					if (e.strm.avail_out === 0) {
						return $
					}
					return Z
				}
				if (e.last_lit) {
					te(e, false);
					if (e.strm.avail_out === 0) {
						return K
					}
				}
				return Y
			}

			function ce(e, r) {
				var t;
				var a;
				var i;
				for (;;) {
					if (e.lookahead < M) {
						fe(e);
						if (e.lookahead < M && r === o) {
							return K
						}
						if (e.lookahead === 0) {
							break
						}
					}
					t = 0;
					if (e.lookahead >= N) {
						e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
						t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
						e.head[e.ins_h] = e.strstart
					}
					e.prev_length = e.match_length;
					e.prev_match = e.match_start;
					e.match_length = N - 1;
					if (t !== 0 && e.prev_length < e.max_lazy_match && e.strstart - t <= e.w_size - M) {
						e.match_length = se(e, t);
						if (e.match_length <= 5 && (e.strategy === C || e.match_length === N && e.strstart - e.match_start > 4096)) {
							e.match_length = N - 1
						}
					}
					if (e.prev_length >= N && e.match_length <= e.prev_length) {
						i = e.strstart + e.lookahead - N;
						a = n._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - N);
						e.lookahead -= e.prev_length - 1;
						e.prev_length -= 2;
						do {
							if (++e.strstart <= i) {
								e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
								t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
								e.head[e.ins_h] = e.strstart
							}
						} while (--e.prev_length !== 0);
						e.match_available = 0;
						e.match_length = N - 1;
						e.strstart++;
						if (a) {
							te(e, false);
							if (e.strm.avail_out === 0) {
								return K
							}
						}
					} else if (e.match_available) {
						a = n._tr_tally(e, 0, e.window[e.strstart - 1]);
						if (a) {
							te(e, false)
						}
						e.strstart++;
						e.lookahead--;
						if (e.strm.avail_out === 0) {
							return K
						}
					} else {
						e.match_available = 1;
						e.strstart++;
						e.lookahead--
					}
				}
				if (e.match_available) {
					a = n._tr_tally(e, 0, e.window[e.strstart - 1]);
					e.match_available = 0
				}
				e.insert = e.strstart < N - 1 ? e.strstart : N - 1;
				if (r === h) {
					te(e, true);
					if (e.strm.avail_out === 0) {
						return $
					}
					return Z
				}
				if (e.last_lit) {
					te(e, false);
					if (e.strm.avail_out === 0) {
						return K
					}
				}
				return Y
			}

			function he(e, r) {
				var t;
				var a;
				var i, s;
				var f = e.window;
				for (;;) {
					if (e.lookahead <= L) {
						fe(e);
						if (e.lookahead <= L && r === o) {
							return K
						}
						if (e.lookahead === 0) {
							break
						}
					}
					e.match_length = 0;
					if (e.lookahead >= N && e.strstart > 0) {
						i = e.strstart - 1;
						a = f[i];
						if (a === f[++i] && a === f[++i] && a === f[++i]) {
							s = e.strstart + L;
							do {} while (a === f[++i] && a === f[++i] && a === f[++i] && a === f[++i] && a === f[++i] && a === f[++i] && a === f[++i] && a ===
								f[++i] && i < s);
							e.match_length = L - (s - i);
							if (e.match_length > e.lookahead) {
								e.match_length = e.lookahead
							}
						}
					}
					if (e.match_length >= N) {
						t = n._tr_tally(e, 1, e.match_length - N);
						e.lookahead -= e.match_length;
						e.strstart += e.match_length;
						e.match_length = 0
					} else {
						t = n._tr_tally(e, 0, e.window[e.strstart]);
						e.lookahead--;
						e.strstart++
					}
					if (t) {
						te(e, false);
						if (e.strm.avail_out === 0) {
							return K
						}
					}
				}
				e.insert = 0;
				if (r === h) {
					te(e, true);
					if (e.strm.avail_out === 0) {
						return $
					}
					return Z
				}
				if (e.last_lit) {
					te(e, false);
					if (e.strm.avail_out === 0) {
						return K
					}
				}
				return Y
			}

			function ue(e, r) {
				var t;
				for (;;) {
					if (e.lookahead === 0) {
						fe(e);
						if (e.lookahead === 0) {
							if (r === o) {
								return K
							}
							break
						}
					}
					e.match_length = 0;
					t = n._tr_tally(e, 0, e.window[e.strstart]);
					e.lookahead--;
					e.strstart++;
					if (t) {
						te(e, false);
						if (e.strm.avail_out === 0) {
							return K
						}
					}
				}
				e.insert = 0;
				if (r === h) {
					te(e, true);
					if (e.strm.avail_out === 0) {
						return $
					}
					return Z
				}
				if (e.last_lit) {
					te(e, false);
					if (e.strm.avail_out === 0) {
						return K
					}
				}
				return Y
			}
			var de = function(e, r, t, a, n) {
				this.good_length = e;
				this.max_lazy = r;
				this.nice_length = t;
				this.max_chain = a;
				this.func = n
			};
			var pe;
			pe = [new de(0, 0, 0, 0, oe), new de(4, 4, 8, 4, le), new de(4, 5, 16, 8, le), new de(4, 6, 32, 32, le), new de(4, 4, 16, 16, ce),
				new de(8, 16, 32, 32, ce), new de(8, 16, 128, 128, ce), new de(8, 32, 128, 256, ce), new de(32, 128, 258, 1024, ce), new de(32,
					258, 258, 4096, ce)
			];

			function ve(e) {
				e.window_size = 2 * e.w_size;
				ee(e.head);
				e.max_lazy_match = pe[e.level].max_lazy;
				e.good_match = pe[e.level].good_length;
				e.nice_match = pe[e.level].nice_length;
				e.max_chain_length = pe[e.level].max_chain;
				e.strstart = 0;
				e.block_start = 0;
				e.lookahead = 0;
				e.insert = 0;
				e.match_length = e.prev_length = N - 1;
				e.match_available = 0;
				e.ins_h = 0
			}

			function ge() {
				this.strm = null;
				this.status = 0;
				this.pending_buf = null;
				this.pending_buf_size = 0;
				this.pending_out = 0;
				this.pending = 0;
				this.wrap = 0;
				this.gzhead = null;
				this.gzindex = 0;
				this.method = _;
				this.last_flush = -1;
				this.w_size = 0;
				this.w_bits = 0;
				this.w_mask = 0;
				this.window = null;
				this.window_size = 0;
				this.prev = null;
				this.head = null;
				this.ins_h = 0;
				this.hash_size = 0;
				this.hash_bits = 0;
				this.hash_mask = 0;
				this.hash_shift = 0;
				this.block_start = 0;
				this.match_length = 0;
				this.prev_match = 0;
				this.match_available = 0;
				this.strstart = 0;
				this.match_start = 0;
				this.lookahead = 0;
				this.prev_length = 0;
				this.max_chain_length = 0;
				this.max_lazy_match = 0;
				this.level = 0;
				this.strategy = 0;
				this.good_match = 0;
				this.nice_match = 0;
				this.dyn_ltree = new a.Buf16(F * 2);
				this.dyn_dtree = new a.Buf16((2 * O + 1) * 2);
				this.bl_tree = new a.Buf16((2 * D + 1) * 2);
				ee(this.dyn_ltree);
				ee(this.dyn_dtree);
				ee(this.bl_tree);
				this.l_desc = null;
				this.d_desc = null;
				this.bl_desc = null;
				this.bl_count = new a.Buf16(P + 1);
				this.heap = new a.Buf16(2 * R + 1);
				ee(this.heap);
				this.heap_len = 0;
				this.heap_max = 0;
				this.depth = new a.Buf16(2 * R + 1);
				ee(this.depth);
				this.l_buf = 0;
				this.lit_bufsize = 0;
				this.last_lit = 0;
				this.d_buf = 0;
				this.opt_len = 0;
				this.static_len = 0;
				this.matches = 0;
				this.insert = 0;
				this.bi_buf = 0;
				this.bi_valid = 0
			}

			function me(e) {
				var r;
				if (!e || !e.state) {
					return J(e, v)
				}
				e.total_in = e.total_out = 0;
				e.data_type = A;
				r = e.state;
				r.pending = 0;
				r.pending_out = 0;
				if (r.wrap < 0) {
					r.wrap = -r.wrap
				}
				r.status = r.wrap ? H : G;
				e.adler = r.wrap === 2 ? 0 : 1;
				r.last_flush = o;
				n._tr_init(r);
				return d
			}

			function be(e) {
				var r = me(e);
				if (r === d) {
					ve(e.state)
				}
				return r
			}

			function Ce(e, r) {
				if (!e || !e.state) {
					return v
				}
				if (e.state.wrap !== 2) {
					return v
				}
				e.state.gzhead = r;
				return d
			}

			function Ee(e, r, t, n, i, s) {
				if (!e) {
					return v
				}
				var f = 1;
				if (r === b) {
					r = 6
				}
				if (n < 0) {
					f = 0;
					n = -n
				} else if (n > 15) {
					f = 2;
					n -= 16
				}
				if (i < 1 || i > B || t !== _ || n < 8 || n > 15 || r < 0 || r > 9 || s < 0 || s > k) {
					return J(e, v)
				}
				if (n === 8) {
					n = 9
				}
				var o = new ge;
				e.state = o;
				o.strm = e;
				o.wrap = f;
				o.gzhead = null;
				o.w_bits = n;
				o.w_size = 1 << o.w_bits;
				o.w_mask = o.w_size - 1;
				o.hash_bits = i + 7;
				o.hash_size = 1 << o.hash_bits;
				o.hash_mask = o.hash_size - 1;
				o.hash_shift = ~~((o.hash_bits + N - 1) / N);
				o.window = new a.Buf8(o.w_size * 2);
				o.head = new a.Buf16(o.hash_size);
				o.prev = new a.Buf16(o.w_size);
				o.lit_bufsize = 1 << i + 6;
				o.pending_buf_size = o.lit_bufsize * 4;
				o.pending_buf = new a.Buf8(o.pending_buf_size);
				o.d_buf = o.lit_bufsize >> 1;
				o.l_buf = (1 + 2) * o.lit_bufsize;
				o.level = r;
				o.strategy = s;
				o.method = t;
				return be(e)
			}

			function we(e, r) {
				return Ee(e, r, _, T, x, S)
			}

			function ke(e, r) {
				var t, a;
				var i, f;
				if (!e || !e.state || r > u || r < 0) {
					return e ? J(e, v) : v
				}
				a = e.state;
				if (!e.output || !e.input && e.avail_in !== 0 || a.status === j && r !== h) {
					return J(e, e.avail_out === 0 ? m : v)
				}
				a.strm = e;
				t = a.last_flush;
				a.last_flush = r;
				if (a.status === H) {
					if (a.wrap === 2) {
						e.adler = 0;
						ae(a, 31);
						ae(a, 139);
						ae(a, 8);
						if (!a.gzhead) {
							ae(a, 0);
							ae(a, 0);
							ae(a, 0);
							ae(a, 0);
							ae(a, 0);
							ae(a, a.level === 9 ? 2 : a.strategy >= E || a.level < 2 ? 4 : 0);
							ae(a, Q);
							a.status = G
						} else {
							ae(a, (a.gzhead.text ? 1 : 0) + (a.gzhead.hcrc ? 2 : 0) + (!a.gzhead.extra ? 0 : 4) + (!a.gzhead.name ? 0 : 8) + (!a.gzhead.comment ?
								0 : 16));
							ae(a, a.gzhead.time & 255);
							ae(a, a.gzhead.time >> 8 & 255);
							ae(a, a.gzhead.time >> 16 & 255);
							ae(a, a.gzhead.time >> 24 & 255);
							ae(a, a.level === 9 ? 2 : a.strategy >= E || a.level < 2 ? 4 : 0);
							ae(a, a.gzhead.os & 255);
							if (a.gzhead.extra && a.gzhead.extra.length) {
								ae(a, a.gzhead.extra.length & 255);
								ae(a, a.gzhead.extra.length >> 8 & 255)
							}
							if (a.gzhead.hcrc) {
								e.adler = s(e.adler, a.pending_buf, a.pending, 0)
							}
							a.gzindex = 0;
							a.status = W
						}
					} else {
						var g = _ + (a.w_bits - 8 << 4) << 8;
						var b = -1;
						if (a.strategy >= E || a.level < 2) {
							b = 0
						} else if (a.level < 6) {
							b = 1
						} else if (a.level === 6) {
							b = 2
						} else {
							b = 3
						}
						g |= b << 6;
						if (a.strstart !== 0) {
							g |= U
						}
						g += 31 - g % 31;
						a.status = G;
						ne(a, g);
						if (a.strstart !== 0) {
							ne(a, e.adler >>> 16);
							ne(a, e.adler & 65535)
						}
						e.adler = 1
					}
				}
				if (a.status === W) {
					if (a.gzhead.extra) {
						i = a.pending;
						while (a.gzindex < (a.gzhead.extra.length & 65535)) {
							if (a.pending === a.pending_buf_size) {
								if (a.gzhead.hcrc && a.pending > i) {
									e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
								}
								re(e);
								i = a.pending;
								if (a.pending === a.pending_buf_size) {
									break
								}
							}
							ae(a, a.gzhead.extra[a.gzindex] & 255);
							a.gzindex++
						}
						if (a.gzhead.hcrc && a.pending > i) {
							e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
						}
						if (a.gzindex === a.gzhead.extra.length) {
							a.gzindex = 0;
							a.status = V
						}
					} else {
						a.status = V
					}
				}
				if (a.status === V) {
					if (a.gzhead.name) {
						i = a.pending;
						do {
							if (a.pending === a.pending_buf_size) {
								if (a.gzhead.hcrc && a.pending > i) {
									e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
								}
								re(e);
								i = a.pending;
								if (a.pending === a.pending_buf_size) {
									f = 1;
									break
								}
							}
							if (a.gzindex < a.gzhead.name.length) {
								f = a.gzhead.name.charCodeAt(a.gzindex++) & 255
							} else {
								f = 0
							}
							ae(a, f)
						} while (f !== 0);
						if (a.gzhead.hcrc && a.pending > i) {
							e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
						}
						if (f === 0) {
							a.gzindex = 0;
							a.status = z
						}
					} else {
						a.status = z
					}
				}
				if (a.status === z) {
					if (a.gzhead.comment) {
						i = a.pending;
						do {
							if (a.pending === a.pending_buf_size) {
								if (a.gzhead.hcrc && a.pending > i) {
									e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
								}
								re(e);
								i = a.pending;
								if (a.pending === a.pending_buf_size) {
									f = 1;
									break
								}
							}
							if (a.gzindex < a.gzhead.comment.length) {
								f = a.gzhead.comment.charCodeAt(a.gzindex++) & 255
							} else {
								f = 0
							}
							ae(a, f)
						} while (f !== 0);
						if (a.gzhead.hcrc && a.pending > i) {
							e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
						}
						if (f === 0) {
							a.status = X
						}
					} else {
						a.status = X
					}
				}
				if (a.status === X) {
					if (a.gzhead.hcrc) {
						if (a.pending + 2 > a.pending_buf_size) {
							re(e)
						}
						if (a.pending + 2 <= a.pending_buf_size) {
							ae(a, e.adler & 255);
							ae(a, e.adler >> 8 & 255);
							e.adler = 0;
							a.status = G
						}
					} else {
						a.status = G
					}
				}
				if (a.pending !== 0) {
					re(e);
					if (e.avail_out === 0) {
						a.last_flush = -1;
						return d
					}
				} else if (e.avail_in === 0 && q(r) <= q(t) && r !== h) {
					return J(e, m)
				}
				if (a.status === j && e.avail_in !== 0) {
					return J(e, m)
				}
				if (e.avail_in !== 0 || a.lookahead !== 0 || r !== o && a.status !== j) {
					var C = a.strategy === E ? ue(a, r) : a.strategy === w ? he(a, r) : pe[a.level].func(a, r);
					if (C === $ || C === Z) {
						a.status = j
					}
					if (C === K || C === $) {
						if (e.avail_out === 0) {
							a.last_flush = -1
						}
						return d
					}
					if (C === Y) {
						if (r === l) {
							n._tr_align(a)
						} else if (r !== u) {
							n._tr_stored_block(a, 0, 0, false);
							if (r === c) {
								ee(a.head);
								if (a.lookahead === 0) {
									a.strstart = 0;
									a.block_start = 0;
									a.insert = 0
								}
							}
						}
						re(e);
						if (e.avail_out === 0) {
							a.last_flush = -1;
							return d
						}
					}
				}
				if (r !== h) {
					return d
				}
				if (a.wrap <= 0) {
					return p
				}
				if (a.wrap === 2) {
					ae(a, e.adler & 255);
					ae(a, e.adler >> 8 & 255);
					ae(a, e.adler >> 16 & 255);
					ae(a, e.adler >> 24 & 255);
					ae(a, e.total_in & 255);
					ae(a, e.total_in >> 8 & 255);
					ae(a, e.total_in >> 16 & 255);
					ae(a, e.total_in >> 24 & 255)
				} else {
					ne(a, e.adler >>> 16);
					ne(a, e.adler & 65535)
				}
				re(e);
				if (a.wrap > 0) {
					a.wrap = -a.wrap
				}
				return a.pending !== 0 ? d : p
			}

			function Se(e) {
				var r;
				if (!e || !e.state) {
					return v
				}
				r = e.state.status;
				if (r !== H && r !== W && r !== V && r !== z && r !== X && r !== G && r !== j) {
					return J(e, v)
				}
				e.state = null;
				return r === G ? J(e, g) : d
			}
			t.deflateInit = we;
			t.deflateInit2 = Ee;
			t.deflateReset = be;
			t.deflateResetKeep = me;
			t.deflateSetHeader = Ce;
			t.deflate = ke;
			t.deflateEnd = Se;
			t.deflateInfo = "pako deflate (from Nodeca project)"
		}, {
			"../utils/common": 27,
			"./adler32": 29,
			"./crc32": 31,
			"./messages": 37,
			"./trees": 38
		}],
		33: [function(e, r, t) {
			"use strict";

			function a() {
				this.text = 0;
				this.time = 0;
				this.xflags = 0;
				this.os = 0;
				this.extra = null;
				this.extra_len = 0;
				this.name = "";
				this.comment = "";
				this.hcrc = 0;
				this.done = false
			}
			r.exports = a
		}, {}],
		34: [function(e, r, t) {
			"use strict";
			var a = 30;
			var n = 12;
			r.exports = function i(e, r) {
				var t;
				var i;
				var s;
				var f;
				var o;
				var l;
				var c;
				var h;
				var u;
				var d;
				var p;
				var v;
				var g;
				var m;
				var b;
				var C;
				var E;
				var w;
				var k;
				var S;
				var A;
				var _;
				var B;
				var T, x;
				t = e.state;
				i = e.next_in;
				T = e.input;
				s = i + (e.avail_in - 5);
				f = e.next_out;
				x = e.output;
				o = f - (r - e.avail_out);
				l = f + (e.avail_out - 257);
				c = t.dmax;
				h = t.wsize;
				u = t.whave;
				d = t.wnext;
				p = t.window;
				v = t.hold;
				g = t.bits;
				m = t.lencode;
				b = t.distcode;
				C = (1 << t.lenbits) - 1;
				E = (1 << t.distbits) - 1;
				e: do {
					if (g < 15) {
						v += T[i++] << g;
						g += 8;
						v += T[i++] << g;
						g += 8
					}
					w = m[v & C];
					r: for (;;) {
						k = w >>> 24;
						v >>>= k;
						g -= k;
						k = w >>> 16 & 255;
						if (k === 0) {
							x[f++] = w & 65535
						} else if (k & 16) {
							S = w & 65535;
							k &= 15;
							if (k) {
								if (g < k) {
									v += T[i++] << g;
									g += 8
								}
								S += v & (1 << k) - 1;
								v >>>= k;
								g -= k
							}
							if (g < 15) {
								v += T[i++] << g;
								g += 8;
								v += T[i++] << g;
								g += 8
							}
							w = b[v & E];
							t: for (;;) {
								k = w >>> 24;
								v >>>= k;
								g -= k;
								k = w >>> 16 & 255;
								if (k & 16) {
									A = w & 65535;
									k &= 15;
									if (g < k) {
										v += T[i++] << g;
										g += 8;
										if (g < k) {
											v += T[i++] << g;
											g += 8
										}
									}
									A += v & (1 << k) - 1;
									if (A > c) {
										e.msg = "invalid distance too far back";
										t.mode = a;
										break e
									}
									v >>>= k;
									g -= k;
									k = f - o;
									if (A > k) {
										k = A - k;
										if (k > u) {
											if (t.sane) {
												e.msg = "invalid distance too far back";
												t.mode = a;
												break e
											}
										}
										_ = 0;
										B = p;
										if (d === 0) {
											_ += h - k;
											if (k < S) {
												S -= k;
												do {
													x[f++] = p[_++]
												} while (--k);
												_ = f - A;
												B = x
											}
										} else if (d < k) {
											_ += h + d - k;
											k -= d;
											if (k < S) {
												S -= k;
												do {
													x[f++] = p[_++]
												} while (--k);
												_ = 0;
												if (d < S) {
													k = d;
													S -= k;
													do {
														x[f++] = p[_++]
													} while (--k);
													_ = f - A;
													B = x
												}
											}
										} else {
											_ += d - k;
											if (k < S) {
												S -= k;
												do {
													x[f++] = p[_++]
												} while (--k);
												_ = f - A;
												B = x
											}
										}
										while (S > 2) {
											x[f++] = B[_++];
											x[f++] = B[_++];
											x[f++] = B[_++];
											S -= 3
										}
										if (S) {
											x[f++] = B[_++];
											if (S > 1) {
												x[f++] = B[_++]
											}
										}
									} else {
										_ = f - A;
										do {
											x[f++] = x[_++];
											x[f++] = x[_++];
											x[f++] = x[_++];
											S -= 3
										} while (S > 2);
										if (S) {
											x[f++] = x[_++];
											if (S > 1) {
												x[f++] = x[_++]
											}
										}
									}
								} else if ((k & 64) === 0) {
									w = b[(w & 65535) + (v & (1 << k) - 1)];
									continue t
								} else {
									e.msg = "invalid distance code";
									t.mode = a;
									break e
								}
								break
							}
						} else if ((k & 64) === 0) {
							w = m[(w & 65535) + (v & (1 << k) - 1)];
							continue r
						} else if (k & 32) {
							t.mode = n;
							break e
						} else {
							e.msg = "invalid literal/length code";
							t.mode = a;
							break e
						}
						break
					}
				} while (i < s && f < l);
				S = g >> 3;
				i -= S;
				g -= S << 3;
				v &= (1 << g) - 1;
				e.next_in = i;
				e.next_out = f;
				e.avail_in = i < s ? 5 + (s - i) : 5 - (i - s);
				e.avail_out = f < l ? 257 + (l - f) : 257 - (f - l);
				t.hold = v;
				t.bits = g;
				return
			}
		}, {}],
		35: [function(e, r, t) {
			"use strict";
			var a = e("../utils/common");
			var n = e("./adler32");
			var i = e("./crc32");
			var s = e("./inffast");
			var f = e("./inftrees");
			var o = 0;
			var l = 1;
			var c = 2;
			var h = 4;
			var u = 5;
			var d = 6;
			var p = 0;
			var v = 1;
			var g = 2;
			var m = -2;
			var b = -3;
			var C = -4;
			var E = -5;
			var w = 8;
			var k = 1;
			var S = 2;
			var A = 3;
			var _ = 4;
			var B = 5;
			var T = 6;
			var x = 7;
			var y = 8;
			var I = 9;
			var R = 10;
			var O = 11;
			var D = 12;
			var F = 13;
			var P = 14;
			var N = 15;
			var L = 16;
			var M = 17;
			var U = 18;
			var H = 19;
			var W = 20;
			var V = 21;
			var z = 22;
			var X = 23;
			var G = 24;
			var j = 25;
			var K = 26;
			var Y = 27;
			var $ = 28;
			var Z = 29;
			var Q = 30;
			var J = 31;
			var q = 32;
			var ee = 852;
			var re = 592;
			var te = 15;
			var ae = te;

			function ne(e) {
				return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24)
			}

			function ie() {
				this.mode = 0;
				this.last = false;
				this.wrap = 0;
				this.havedict = false;
				this.flags = 0;
				this.dmax = 0;
				this.check = 0;
				this.total = 0;
				this.head = null;
				this.wbits = 0;
				this.wsize = 0;
				this.whave = 0;
				this.wnext = 0;
				this.window = null;
				this.hold = 0;
				this.bits = 0;
				this.length = 0;
				this.offset = 0;
				this.extra = 0;
				this.lencode = null;
				this.distcode = null;
				this.lenbits = 0;
				this.distbits = 0;
				this.ncode = 0;
				this.nlen = 0;
				this.ndist = 0;
				this.have = 0;
				this.next = null;
				this.lens = new a.Buf16(320);
				this.work = new a.Buf16(288);
				this.lendyn = null;
				this.distdyn = null;
				this.sane = 0;
				this.back = 0;
				this.was = 0
			}

			function se(e) {
				var r;
				if (!e || !e.state) {
					return m
				}
				r = e.state;
				e.total_in = e.total_out = r.total = 0;
				e.msg = "";
				if (r.wrap) {
					e.adler = r.wrap & 1
				}
				r.mode = k;
				r.last = 0;
				r.havedict = 0;
				r.dmax = 32768;
				r.head = null;
				r.hold = 0;
				r.bits = 0;
				r.lencode = r.lendyn = new a.Buf32(ee);
				r.distcode = r.distdyn = new a.Buf32(re);
				r.sane = 1;
				r.back = -1;
				return p
			}

			function fe(e) {
				var r;
				if (!e || !e.state) {
					return m
				}
				r = e.state;
				r.wsize = 0;
				r.whave = 0;
				r.wnext = 0;
				return se(e)
			}

			function oe(e, r) {
				var t;
				var a;
				if (!e || !e.state) {
					return m
				}
				a = e.state;
				if (r < 0) {
					t = 0;
					r = -r
				} else {
					t = (r >> 4) + 1;
					if (r < 48) {
						r &= 15
					}
				}
				if (r && (r < 8 || r > 15)) {
					return m
				}
				if (a.window !== null && a.wbits !== r) {
					a.window = null
				}
				a.wrap = t;
				a.wbits = r;
				return fe(e)
			}

			function le(e, r) {
				var t;
				var a;
				if (!e) {
					return m
				}
				a = new ie;
				e.state = a;
				a.window = null;
				t = oe(e, r);
				if (t !== p) {
					e.state = null
				}
				return t
			}

			function ce(e) {
				return le(e, ae)
			}
			var he = true;
			var ue, de;

			function pe(e) {
				if (he) {
					var r;
					ue = new a.Buf32(512);
					de = new a.Buf32(32);
					r = 0;
					while (r < 144) {
						e.lens[r++] = 8
					}
					while (r < 256) {
						e.lens[r++] = 9
					}
					while (r < 280) {
						e.lens[r++] = 7
					}
					while (r < 288) {
						e.lens[r++] = 8
					}
					f(l, e.lens, 0, 288, ue, 0, e.work, {
						bits: 9
					});
					r = 0;
					while (r < 32) {
						e.lens[r++] = 5
					}
					f(c, e.lens, 0, 32, de, 0, e.work, {
						bits: 5
					});
					he = false
				}
				e.lencode = ue;
				e.lenbits = 9;
				e.distcode = de;
				e.distbits = 5
			}

			function ve(e, r, t, n) {
				var i;
				var s = e.state;
				if (s.window === null) {
					s.wsize = 1 << s.wbits;
					s.wnext = 0;
					s.whave = 0;
					s.window = new a.Buf8(s.wsize)
				}
				if (n >= s.wsize) {
					a.arraySet(s.window, r, t - s.wsize, s.wsize, 0);
					s.wnext = 0;
					s.whave = s.wsize
				} else {
					i = s.wsize - s.wnext;
					if (i > n) {
						i = n
					}
					a.arraySet(s.window, r, t - n, i, s.wnext);
					n -= i;
					if (n) {
						a.arraySet(s.window, r, t - n, n, 0);
						s.wnext = n;
						s.whave = s.wsize
					} else {
						s.wnext += i;
						if (s.wnext === s.wsize) {
							s.wnext = 0
						}
						if (s.whave < s.wsize) {
							s.whave += i
						}
					}
				}
				return 0
			}

			function ge(e, r) {
				var t;
				var ee, re;
				var te;
				var ae;
				var ie, se;
				var fe;
				var oe;
				var le, ce;
				var he;
				var ue;
				var de;
				var ge = 0;
				var me, be, Ce;
				var Ee, we, ke;
				var Se;
				var Ae;
				var _e = new a.Buf8(4);
				var Be;
				var Te;
				var xe = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
				if (!e || !e.state || !e.output || !e.input && e.avail_in !== 0) {
					return m
				}
				t = e.state;
				if (t.mode === D) {
					t.mode = F
				}
				ae = e.next_out;
				re = e.output;
				se = e.avail_out;
				te = e.next_in;
				ee = e.input;
				ie = e.avail_in;
				fe = t.hold;
				oe = t.bits;
				le = ie;
				ce = se;
				Ae = p;
				e: for (;;) {
					switch (t.mode) {
						case k:
							if (t.wrap === 0) {
								t.mode = F;
								break
							}
							while (oe < 16) {
								if (ie === 0) {
									break e
								}
								ie--;
								fe += ee[te++] << oe;
								oe += 8
							}
							if (t.wrap & 2 && fe === 35615) {
								t.check = 0;
								_e[0] = fe & 255;
								_e[1] = fe >>> 8 & 255;
								t.check = i(t.check, _e, 2, 0);
								fe = 0;
								oe = 0;
								t.mode = S;
								break
							}
							t.flags = 0;
							if (t.head) {
								t.head.done = false
							}
							if (!(t.wrap & 1) || (((fe & 255) << 8) + (fe >> 8)) % 31) {
								e.msg = "incorrect header check";
								t.mode = Q;
								break
							}
							if ((fe & 15) !== w) {
								e.msg = "unknown compression method";
								t.mode = Q;
								break
							}
							fe >>>= 4;
							oe -= 4;
							Se = (fe & 15) + 8;
							if (t.wbits === 0) {
								t.wbits = Se
							} else if (Se > t.wbits) {
								e.msg = "invalid window size";
								t.mode = Q;
								break
							}
							t.dmax = 1 << Se;
							e.adler = t.check = 1;
							t.mode = fe & 512 ? R : D;
							fe = 0;
							oe = 0;
							break;
						case S:
							while (oe < 16) {
								if (ie === 0) {
									break e
								}
								ie--;
								fe += ee[te++] << oe;
								oe += 8
							}
							t.flags = fe;
							if ((t.flags & 255) !== w) {
								e.msg = "unknown compression method";
								t.mode = Q;
								break
							}
							if (t.flags & 57344) {
								e.msg = "unknown header flags set";
								t.mode = Q;
								break
							}
							if (t.head) {
								t.head.text = fe >> 8 & 1
							}
							if (t.flags & 512) {
								_e[0] = fe & 255;
								_e[1] = fe >>> 8 & 255;
								t.check = i(t.check, _e, 2, 0)
							}
							fe = 0;
							oe = 0;
							t.mode = A;
						case A:
							while (oe < 32) {
								if (ie === 0) {
									break e
								}
								ie--;
								fe += ee[te++] << oe;
								oe += 8
							}
							if (t.head) {
								t.head.time = fe
							}
							if (t.flags & 512) {
								_e[0] = fe & 255;
								_e[1] = fe >>> 8 & 255;
								_e[2] = fe >>> 16 & 255;
								_e[3] = fe >>> 24 & 255;
								t.check = i(t.check, _e, 4, 0)
							}
							fe = 0;
							oe = 0;
							t.mode = _;
						case _:
							while (oe < 16) {
								if (ie === 0) {
									break e
								}
								ie--;
								fe += ee[te++] << oe;
								oe += 8
							}
							if (t.head) {
								t.head.xflags = fe & 255;
								t.head.os = fe >> 8
							}
							if (t.flags & 512) {
								_e[0] = fe & 255;
								_e[1] = fe >>> 8 & 255;
								t.check = i(t.check, _e, 2, 0)
							}
							fe = 0;
							oe = 0;
							t.mode = B;
						case B:
							if (t.flags & 1024) {
								while (oe < 16) {
									if (ie === 0) {
										break e
									}
									ie--;
									fe += ee[te++] << oe;
									oe += 8
								}
								t.length = fe;
								if (t.head) {
									t.head.extra_len = fe
								}
								if (t.flags & 512) {
									_e[0] = fe & 255;
									_e[1] = fe >>> 8 & 255;
									t.check = i(t.check, _e, 2, 0)
								}
								fe = 0;
								oe = 0
							} else if (t.head) {
								t.head.extra = null
							}
							t.mode = T;
						case T:
							if (t.flags & 1024) {
								he = t.length;
								if (he > ie) {
									he = ie
								}
								if (he) {
									if (t.head) {
										Se = t.head.extra_len - t.length;
										if (!t.head.extra) {
											t.head.extra = new Array(t.head.extra_len)
										}
										a.arraySet(t.head.extra, ee, te, he, Se)
									}
									if (t.flags & 512) {
										t.check = i(t.check, ee, he, te)
									}
									ie -= he;
									te += he;
									t.length -= he
								}
								if (t.length) {
									break e
								}
							}
							t.length = 0;
							t.mode = x;
						case x:
							if (t.flags & 2048) {
								if (ie === 0) {
									break e
								}
								he = 0;
								do {
									Se = ee[te + he++];
									if (t.head && Se && t.length < 65536) {
										t.head.name += String.fromCharCode(Se)
									}
								} while (Se && he < ie);
								if (t.flags & 512) {
									t.check = i(t.check, ee, he, te)
								}
								ie -= he;
								te += he;
								if (Se) {
									break e
								}
							} else if (t.head) {
								t.head.name = null
							}
							t.length = 0;
							t.mode = y;
						case y:
							if (t.flags & 4096) {
								if (ie === 0) {
									break e
								}
								he = 0;
								do {
									Se = ee[te + he++];
									if (t.head && Se && t.length < 65536) {
										t.head.comment += String.fromCharCode(Se)
									}
								} while (Se && he < ie);
								if (t.flags & 512) {
									t.check = i(t.check, ee, he, te)
								}
								ie -= he;
								te += he;
								if (Se) {
									break e
								}
							} else if (t.head) {
								t.head.comment = null
							}
							t.mode = I;
						case I:
							if (t.flags & 512) {
								while (oe < 16) {
									if (ie === 0) {
										break e
									}
									ie--;
									fe += ee[te++] << oe;
									oe += 8
								}
								if (fe !== (t.check & 65535)) {
									e.msg = "header crc mismatch";
									t.mode = Q;
									break
								}
								fe = 0;
								oe = 0
							}
							if (t.head) {
								t.head.hcrc = t.flags >> 9 & 1;
								t.head.done = true
							}
							e.adler = t.check = 0;
							t.mode = D;
							break;
						case R:
							while (oe < 32) {
								if (ie === 0) {
									break e
								}
								ie--;
								fe += ee[te++] << oe;
								oe += 8
							}
							e.adler = t.check = ne(fe);
							fe = 0;
							oe = 0;
							t.mode = O;
						case O:
							if (t.havedict === 0) {
								e.next_out = ae;
								e.avail_out = se;
								e.next_in = te;
								e.avail_in = ie;
								t.hold = fe;
								t.bits = oe;
								return g
							}
							e.adler = t.check = 1;
							t.mode = D;
						case D:
							if (r === u || r === d) {
								break e
							};
						case F:
							if (t.last) {
								fe >>>= oe & 7;
								oe -= oe & 7;
								t.mode = Y;
								break
							}
							while (oe < 3) {
								if (ie === 0) {
									break e
								}
								ie--;
								fe += ee[te++] << oe;
								oe += 8
							}
							t.last = fe & 1;
							fe >>>= 1;
							oe -= 1;
							switch (fe & 3) {
								case 0:
									t.mode = P;
									break;
								case 1:
									pe(t);
									t.mode = W;
									if (r === d) {
										fe >>>= 2;
										oe -= 2;
										break e
									}
									break;
								case 2:
									t.mode = M;
									break;
								case 3:
									e.msg = "invalid block type";
									t.mode = Q;
							}
							fe >>>= 2;
							oe -= 2;
							break;
						case P:
							fe >>>= oe & 7;
							oe -= oe & 7;
							while (oe < 32) {
								if (ie === 0) {
									break e
								}
								ie--;
								fe += ee[te++] << oe;
								oe += 8
							}
							if ((fe & 65535) !== (fe >>> 16 ^ 65535)) {
								e.msg = "invalid stored block lengths";
								t.mode = Q;
								break
							}
							t.length = fe & 65535;
							fe = 0;
							oe = 0;
							t.mode = N;
							if (r === d) {
								break e
							};
						case N:
							t.mode = L;
						case L:
							he = t.length;
							if (he) {
								if (he > ie) {
									he = ie
								}
								if (he > se) {
									he = se
								}
								if (he === 0) {
									break e
								}
								a.arraySet(re, ee, te, he, ae);
								ie -= he;
								te += he;
								se -= he;
								ae += he;
								t.length -= he;
								break
							}
							t.mode = D;
							break;
						case M:
							while (oe < 14) {
								if (ie === 0) {
									break e
								}
								ie--;
								fe += ee[te++] << oe;
								oe += 8
							}
							t.nlen = (fe & 31) + 257;
							fe >>>= 5;
							oe -= 5;
							t.ndist = (fe & 31) + 1;
							fe >>>= 5;
							oe -= 5;
							t.ncode = (fe & 15) + 4;
							fe >>>= 4;
							oe -= 4;
							if (t.nlen > 286 || t.ndist > 30) {
								e.msg = "too many length or distance symbols";
								t.mode = Q;
								break
							}
							t.have = 0;
							t.mode = U;
						case U:
							while (t.have < t.ncode) {
								while (oe < 3) {
									if (ie === 0) {
										break e
									}
									ie--;
									fe += ee[te++] << oe;
									oe += 8
								}
								t.lens[xe[t.have++]] = fe & 7;
								fe >>>= 3;
								oe -= 3
							}
							while (t.have < 19) {
								t.lens[xe[t.have++]] = 0
							}
							t.lencode = t.lendyn;
							t.lenbits = 7;
							Be = {
								bits: t.lenbits
							};
							Ae = f(o, t.lens, 0, 19, t.lencode, 0, t.work, Be);
							t.lenbits = Be.bits;
							if (Ae) {
								e.msg = "invalid code lengths set";
								t.mode = Q;
								break
							}
							t.have = 0;
							t.mode = H;
						case H:
							while (t.have < t.nlen + t.ndist) {
								for (;;) {
									ge = t.lencode[fe & (1 << t.lenbits) - 1];
									me = ge >>> 24;
									be = ge >>> 16 & 255;
									Ce = ge & 65535;
									if (me <= oe) {
										break
									}
									if (ie === 0) {
										break e
									}
									ie--;
									fe += ee[te++] << oe;
									oe += 8
								}
								if (Ce < 16) {
									fe >>>= me;
									oe -= me;
									t.lens[t.have++] = Ce
								} else {
									if (Ce === 16) {
										Te = me + 2;
										while (oe < Te) {
											if (ie === 0) {
												break e
											}
											ie--;
											fe += ee[te++] << oe;
											oe += 8
										}
										fe >>>= me;
										oe -= me;
										if (t.have === 0) {
											e.msg = "invalid bit length repeat";
											t.mode = Q;
											break
										}
										Se = t.lens[t.have - 1];
										he = 3 + (fe & 3);
										fe >>>= 2;
										oe -= 2
									} else if (Ce === 17) {
										Te = me + 3;
										while (oe < Te) {
											if (ie === 0) {
												break e
											}
											ie--;
											fe += ee[te++] << oe;
											oe += 8
										}
										fe >>>= me;
										oe -= me;
										Se = 0;
										he = 3 + (fe & 7);
										fe >>>= 3;
										oe -= 3
									} else {
										Te = me + 7;
										while (oe < Te) {
											if (ie === 0) {
												break e
											}
											ie--;
											fe += ee[te++] << oe;
											oe += 8
										}
										fe >>>= me;
										oe -= me;
										Se = 0;
										he = 11 + (fe & 127);
										fe >>>= 7;
										oe -= 7
									}
									if (t.have + he > t.nlen + t.ndist) {
										e.msg = "invalid bit length repeat";
										t.mode = Q;
										break
									}
									while (he--) {
										t.lens[t.have++] = Se
									}
								}
							}
							if (t.mode === Q) {
								break
							}
							if (t.lens[256] === 0) {
								e.msg = "invalid code -- missing end-of-block";
								t.mode = Q;
								break
							}
							t.lenbits = 9;
							Be = {
								bits: t.lenbits
							};
							Ae = f(l, t.lens, 0, t.nlen, t.lencode, 0, t.work, Be);
							t.lenbits = Be.bits;
							if (Ae) {
								e.msg = "invalid literal/lengths set";
								t.mode = Q;
								break
							}
							t.distbits = 6;
							t.distcode = t.distdyn;
							Be = {
								bits: t.distbits
							};
							Ae = f(c, t.lens, t.nlen, t.ndist, t.distcode, 0, t.work, Be);
							t.distbits = Be.bits;
							if (Ae) {
								e.msg = "invalid distances set";
								t.mode = Q;
								break
							}
							t.mode = W;
							if (r === d) {
								break e
							};
						case W:
							t.mode = V;
						case V:
							if (ie >= 6 && se >= 258) {
								e.next_out = ae;
								e.avail_out = se;
								e.next_in = te;
								e.avail_in = ie;
								t.hold = fe;
								t.bits = oe;
								s(e, ce);
								ae = e.next_out;
								re = e.output;
								se = e.avail_out;
								te = e.next_in;
								ee = e.input;
								ie = e.avail_in;
								fe = t.hold;
								oe = t.bits;
								if (t.mode === D) {
									t.back = -1
								}
								break
							}
							t.back = 0;
							for (;;) {
								ge = t.lencode[fe & (1 << t.lenbits) - 1];
								me = ge >>> 24;
								be = ge >>> 16 & 255;
								Ce = ge & 65535;
								if (me <= oe) {
									break
								}
								if (ie === 0) {
									break e
								}
								ie--;
								fe += ee[te++] << oe;
								oe += 8
							}
							if (be && (be & 240) === 0) {
								Ee = me;
								we = be;
								ke = Ce;
								for (;;) {
									ge = t.lencode[ke + ((fe & (1 << Ee + we) - 1) >> Ee)];
									me = ge >>> 24;
									be = ge >>> 16 & 255;
									Ce = ge & 65535;
									if (Ee + me <= oe) {
										break
									}
									if (ie === 0) {
										break e
									}
									ie--;
									fe += ee[te++] << oe;
									oe += 8
								}
								fe >>>= Ee;
								oe -= Ee;
								t.back += Ee
							}
							fe >>>= me;
							oe -= me;
							t.back += me;
							t.length = Ce;
							if (be === 0) {
								t.mode = K;
								break
							}
							if (be & 32) {
								t.back = -1;
								t.mode = D;
								break
							}
							if (be & 64) {
								e.msg = "invalid literal/length code";
								t.mode = Q;
								break
							}
							t.extra = be & 15;
							t.mode = z;
						case z:
							if (t.extra) {
								Te = t.extra;
								while (oe < Te) {
									if (ie === 0) {
										break e
									}
									ie--;
									fe += ee[te++] << oe;
									oe += 8
								}
								t.length += fe & (1 << t.extra) - 1;
								fe >>>= t.extra;
								oe -= t.extra;
								t.back += t.extra
							}
							t.was = t.length;
							t.mode = X;
						case X:
							for (;;) {
								ge = t.distcode[fe & (1 << t.distbits) - 1];
								me = ge >>> 24;
								be = ge >>> 16 & 255;
								Ce = ge & 65535;
								if (me <= oe) {
									break
								}
								if (ie === 0) {
									break e
								}
								ie--;
								fe += ee[te++] << oe;
								oe += 8
							}
							if ((be & 240) === 0) {
								Ee = me;
								we = be;
								ke = Ce;
								for (;;) {
									ge = t.distcode[ke + ((fe & (1 << Ee + we) - 1) >> Ee)];
									me = ge >>> 24;
									be = ge >>> 16 & 255;
									Ce = ge & 65535;
									if (Ee + me <= oe) {
										break
									}
									if (ie === 0) {
										break e
									}
									ie--;
									fe += ee[te++] << oe;
									oe += 8
								}
								fe >>>= Ee;
								oe -= Ee;
								t.back += Ee
							}
							fe >>>= me;
							oe -= me;
							t.back += me;
							if (be & 64) {
								e.msg = "invalid distance code";
								t.mode = Q;
								break
							}
							t.offset = Ce;
							t.extra = be & 15;
							t.mode = G;
						case G:
							if (t.extra) {
								Te = t.extra;
								while (oe < Te) {
									if (ie === 0) {
										break e
									}
									ie--;
									fe += ee[te++] << oe;
									oe += 8
								}
								t.offset += fe & (1 << t.extra) - 1;
								fe >>>= t.extra;
								oe -= t.extra;
								t.back += t.extra
							}
							if (t.offset > t.dmax) {
								e.msg = "invalid distance too far back";
								t.mode = Q;
								break
							}
							t.mode = j;
						case j:
							if (se === 0) {
								break e
							}
							he = ce - se;
							if (t.offset > he) {
								he = t.offset - he;
								if (he > t.whave) {
									if (t.sane) {
										e.msg = "invalid distance too far back";
										t.mode = Q;
										break
									}
								}
								if (he > t.wnext) {
									he -= t.wnext;
									ue = t.wsize - he
								} else {
									ue = t.wnext - he
								}
								if (he > t.length) {
									he = t.length
								}
								de = t.window
							} else {
								de = re;
								ue = ae - t.offset;
								he = t.length
							}
							if (he > se) {
								he = se
							}
							se -= he;
							t.length -= he;
							do {
								re[ae++] = de[ue++]
							} while (--he);
							if (t.length === 0) {
								t.mode = V
							}
							break;
						case K:
							if (se === 0) {
								break e
							}
							re[ae++] = t.length;
							se--;
							t.mode = V;
							break;
						case Y:
							if (t.wrap) {
								while (oe < 32) {
									if (ie === 0) {
										break e
									}
									ie--;
									fe |= ee[te++] << oe;
									oe += 8
								}
								ce -= se;
								e.total_out += ce;
								t.total += ce;
								if (ce) {
									e.adler = t.check = t.flags ? i(t.check, re, ce, ae - ce) : n(t.check, re, ce, ae - ce)
								}
								ce = se;
								if ((t.flags ? fe : ne(fe)) !== t.check) {
									e.msg = "incorrect data check";
									t.mode = Q;
									break
								}
								fe = 0;
								oe = 0
							}
							t.mode = $;
						case $:
							if (t.wrap && t.flags) {
								while (oe < 32) {
									if (ie === 0) {
										break e
									}
									ie--;
									fe += ee[te++] << oe;
									oe += 8
								}
								if (fe !== (t.total & 4294967295)) {
									e.msg = "incorrect length check";
									t.mode = Q;
									break
								}
								fe = 0;
								oe = 0
							}
							t.mode = Z;
						case Z:
							Ae = v;
							break e;
						case Q:
							Ae = b;
							break e;
						case J:
							return C;
						case q:
							;
						default:
							return m;
					}
				}
				e.next_out = ae;
				e.avail_out = se;
				e.next_in = te;
				e.avail_in = ie;
				t.hold = fe;
				t.bits = oe;
				if (t.wsize || ce !== e.avail_out && t.mode < Q && (t.mode < Y || r !== h)) {
					if (ve(e, e.output, e.next_out, ce - e.avail_out)) {
						t.mode = J;
						return C
					}
				}
				le -= e.avail_in;
				ce -= e.avail_out;
				e.total_in += le;
				e.total_out += ce;
				t.total += ce;
				if (t.wrap && ce) {
					e.adler = t.check = t.flags ? i(t.check, re, ce, e.next_out - ce) : n(t.check, re, ce, e.next_out - ce)
				}
				e.data_type = t.bits + (t.last ? 64 : 0) + (t.mode === D ? 128 : 0) + (t.mode === W || t.mode === N ? 256 : 0);
				if ((le === 0 && ce === 0 || r === h) && Ae === p) {
					Ae = E
				}
				return Ae
			}

			function me(e) {
				if (!e || !e.state) {
					return m
				}
				var r = e.state;
				if (r.window) {
					r.window = null
				}
				e.state = null;
				return p
			}

			function be(e, r) {
				var t;
				if (!e || !e.state) {
					return m
				}
				t = e.state;
				if ((t.wrap & 2) === 0) {
					return m
				}
				t.head = r;
				r.done = false;
				return p
			}
			t.inflateReset = fe;
			t.inflateReset2 = oe;
			t.inflateResetKeep = se;
			t.inflateInit = ce;
			t.inflateInit2 = le;
			t.inflate = ge;
			t.inflateEnd = me;
			t.inflateGetHeader = be;
			t.inflateInfo = "pako inflate (from Nodeca project)"
		}, {
			"../utils/common": 27,
			"./adler32": 29,
			"./crc32": 31,
			"./inffast": 34,
			"./inftrees": 36
		}],
		36: [function(e, r, t) {
			"use strict";
			var a = e("../utils/common");
			var n = 15;
			var i = 852;
			var s = 592;
			var f = 0;
			var o = 1;
			var l = 2;
			var c = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0];
			var h = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78];
			var u = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193,
				12289, 16385, 24577, 0, 0
			];
			var d = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64,
				64
			];
			r.exports = function p(e, r, t, v, g, m, b, C) {
				var E = C.bits;
				var w = 0;
				var k = 0;
				var S = 0,
					A = 0;
				var _ = 0;
				var B = 0;
				var T = 0;
				var x = 0;
				var y = 0;
				var I = 0;
				var R;
				var O;
				var D;
				var F;
				var P;
				var N = null;
				var L = 0;
				var M;
				var U = new a.Buf16(n + 1);
				var H = new a.Buf16(n + 1);
				var W = null;
				var V = 0;
				var z, X, G;
				for (w = 0; w <= n; w++) {
					U[w] = 0
				}
				for (k = 0; k < v; k++) {
					U[r[t + k]]++
				}
				_ = E;
				for (A = n; A >= 1; A--) {
					if (U[A] !== 0) {
						break
					}
				}
				if (_ > A) {
					_ = A
				}
				if (A === 0) {
					g[m++] = 1 << 24 | 64 << 16 | 0;
					g[m++] = 1 << 24 | 64 << 16 | 0;
					C.bits = 1;
					return 0
				}
				for (S = 1; S < A; S++) {
					if (U[S] !== 0) {
						break
					}
				}
				if (_ < S) {
					_ = S
				}
				x = 1;
				for (w = 1; w <= n; w++) {
					x <<= 1;
					x -= U[w];
					if (x < 0) {
						return -1
					}
				}
				if (x > 0 && (e === f || A !== 1)) {
					return -1
				}
				H[1] = 0;
				for (w = 1; w < n; w++) {
					H[w + 1] = H[w] + U[w]
				}
				for (k = 0; k < v; k++) {
					if (r[t + k] !== 0) {
						b[H[r[t + k]]++] = k
					}
				}
				if (e === f) {
					N = W = b;
					M = 19
				} else if (e === o) {
					N = c;
					L -= 257;
					W = h;
					V -= 257;
					M = 256
				} else {
					N = u;
					W = d;
					M = -1
				}
				I = 0;
				k = 0;
				w = S;
				P = m;
				B = _;
				T = 0;
				D = -1;
				y = 1 << _;
				F = y - 1;
				if (e === o && y > i || e === l && y > s) {
					return 1
				}
				var j = 0;
				for (;;) {
					j++;
					z = w - T;
					if (b[k] < M) {
						X = 0;
						G = b[k]
					} else if (b[k] > M) {
						X = W[V + b[k]];
						G = N[L + b[k]]
					} else {
						X = 32 + 64;
						G = 0
					}
					R = 1 << w - T;
					O = 1 << B;
					S = O;
					do {
						O -= R;
						g[P + (I >> T) + O] = z << 24 | X << 16 | G | 0
					} while (O !== 0);
					R = 1 << w - 1;
					while (I & R) {
						R >>= 1
					}
					if (R !== 0) {
						I &= R - 1;
						I += R
					} else {
						I = 0
					}
					k++;
					if (--U[w] === 0) {
						if (w === A) {
							break
						}
						w = r[t + b[k]]
					}
					if (w > _ && (I & F) !== D) {
						if (T === 0) {
							T = _
						}
						P += S;
						B = w - T;
						x = 1 << B;
						while (B + T < A) {
							x -= U[B + T];
							if (x <= 0) {
								break
							}
							B++;
							x <<= 1
						}
						y += 1 << B;
						if (e === o && y > i || e === l && y > s) {
							return 1
						}
						D = I & F;
						g[D] = _ << 24 | B << 16 | P - m | 0
					}
				}
				if (I !== 0) {
					g[P + I] = w - T << 24 | 64 << 16 | 0
				}
				C.bits = _;
				return 0
			}
		}, {
			"../utils/common": 27
		}],
		37: [function(e, r, t) {
			"use strict";
			r.exports = {
				2: "need dictionary",
				1: "stream end",
				0: "",
				"-1": "file error",
				"-2": "stream error",
				"-3": "data error",
				"-4": "insufficient memory",
				"-5": "buffer error",
				"-6": "incompatible version"
			}
		}, {}],
		38: [function(e, r, t) {
			"use strict";
			var a = e("../utils/common");
			var n = 4;
			var i = 0;
			var s = 1;
			var f = 2;

			function o(e) {
				var r = e.length;
				while (--r >= 0) {
					e[r] = 0
				}
			}
			var l = 0;
			var c = 1;
			var h = 2;
			var u = 3;
			var d = 258;
			var p = 29;
			var v = 256;
			var g = v + 1 + p;
			var m = 30;
			var b = 19;
			var C = 2 * g + 1;
			var E = 15;
			var w = 16;
			var k = 7;
			var S = 256;
			var A = 16;
			var _ = 17;
			var B = 18;
			var T = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
			var x = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
			var y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
			var I = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
			var R = 512;
			var O = new Array((g + 2) * 2);
			o(O);
			var D = new Array(m * 2);
			o(D);
			var F = new Array(R);
			o(F);
			var P = new Array(d - u + 1);
			o(P);
			var N = new Array(p);
			o(N);
			var L = new Array(m);
			o(L);
			var M = function(e, r, t, a, n) {
				this.static_tree = e;
				this.extra_bits = r;
				this.extra_base = t;
				this.elems = a;
				this.max_length = n;
				this.has_stree = e && e.length
			};
			var U;
			var H;
			var W;
			var V = function(e, r) {
				this.dyn_tree = e;
				this.max_code = 0;
				this.stat_desc = r
			};

			function z(e) {
				return e < 256 ? F[e] : F[256 + (e >>> 7)]
			}

			function X(e, r) {
				e.pending_buf[e.pending++] = r & 255;
				e.pending_buf[e.pending++] = r >>> 8 & 255
			}

			function G(e, r, t) {
				if (e.bi_valid > w - t) {
					e.bi_buf |= r << e.bi_valid & 65535;
					X(e, e.bi_buf);
					e.bi_buf = r >> w - e.bi_valid;
					e.bi_valid += t - w
				} else {
					e.bi_buf |= r << e.bi_valid & 65535;
					e.bi_valid += t
				}
			}

			function j(e, r, t) {
				G(e, t[r * 2], t[r * 2 + 1])
			}

			function K(e, r) {
				var t = 0;
				do {
					t |= e & 1;
					e >>>= 1;
					t <<= 1
				} while (--r > 0);
				return t >>> 1
			}

			function Y(e) {
				if (e.bi_valid === 16) {
					X(e, e.bi_buf);
					e.bi_buf = 0;
					e.bi_valid = 0
				} else if (e.bi_valid >= 8) {
					e.pending_buf[e.pending++] = e.bi_buf & 255;
					e.bi_buf >>= 8;
					e.bi_valid -= 8
				}
			}

			function $(e, r) {
				var t = r.dyn_tree;
				var a = r.max_code;
				var n = r.stat_desc.static_tree;
				var i = r.stat_desc.has_stree;
				var s = r.stat_desc.extra_bits;
				var f = r.stat_desc.extra_base;
				var o = r.stat_desc.max_length;
				var l;
				var c, h;
				var u;
				var d;
				var p;
				var v = 0;
				for (u = 0; u <= E; u++) {
					e.bl_count[u] = 0
				}
				t[e.heap[e.heap_max] * 2 + 1] = 0;
				for (l = e.heap_max + 1; l < C; l++) {
					c = e.heap[l];
					u = t[t[c * 2 + 1] * 2 + 1] + 1;
					if (u > o) {
						u = o;
						v++
					}
					t[c * 2 + 1] = u;
					if (c > a) {
						continue
					}
					e.bl_count[u]++;
					d = 0;
					if (c >= f) {
						d = s[c - f]
					}
					p = t[c * 2];
					e.opt_len += p * (u + d);
					if (i) {
						e.static_len += p * (n[c * 2 + 1] + d)
					}
				}
				if (v === 0) {
					return
				}
				do {
					u = o - 1;
					while (e.bl_count[u] === 0) {
						u--
					}
					e.bl_count[u]--;
					e.bl_count[u + 1] += 2;
					e.bl_count[o]--;
					v -= 2
				} while (v > 0);
				for (u = o; u !== 0; u--) {
					c = e.bl_count[u];
					while (c !== 0) {
						h = e.heap[--l];
						if (h > a) {
							continue
						}
						if (t[h * 2 + 1] !== u) {
							e.opt_len += (u - t[h * 2 + 1]) * t[h * 2];
							t[h * 2 + 1] = u
						}
						c--
					}
				}
			}

			function Z(e, r, t) {
				var a = new Array(E + 1);
				var n = 0;
				var i;
				var s;
				for (i = 1; i <= E; i++) {
					a[i] = n = n + t[i - 1] << 1
				}
				for (s = 0; s <= r; s++) {
					var f = e[s * 2 + 1];
					if (f === 0) {
						continue
					}
					e[s * 2] = K(a[f]++, f)
				}
			}

			function Q() {
				var e;
				var r;
				var t;
				var a;
				var n;
				var i = new Array(E + 1);
				t = 0;
				for (a = 0; a < p - 1; a++) {
					N[a] = t;
					for (e = 0; e < 1 << T[a]; e++) {
						P[t++] = a
					}
				}
				P[t - 1] = a;
				n = 0;
				for (a = 0; a < 16; a++) {
					L[a] = n;
					for (e = 0; e < 1 << x[a]; e++) {
						F[n++] = a
					}
				}
				n >>= 7;
				for (; a < m; a++) {
					L[a] = n << 7;
					for (e = 0; e < 1 << x[a] - 7; e++) {
						F[256 + n++] = a
					}
				}
				for (r = 0; r <= E; r++) {
					i[r] = 0
				}
				e = 0;
				while (e <= 143) {
					O[e * 2 + 1] = 8;
					e++;
					i[8]++
				}
				while (e <= 255) {
					O[e * 2 + 1] = 9;
					e++;
					i[9]++
				}
				while (e <= 279) {
					O[e * 2 + 1] = 7;
					e++;
					i[7]++
				}
				while (e <= 287) {
					O[e * 2 + 1] = 8;
					e++;
					i[8]++
				}
				Z(O, g + 1, i);
				for (e = 0; e < m; e++) {
					D[e * 2 + 1] = 5;
					D[e * 2] = K(e, 5)
				}
				U = new M(O, T, v + 1, g, E);
				H = new M(D, x, 0, m, E);
				W = new M(new Array(0), y, 0, b, k)
			}

			function J(e) {
				var r;
				for (r = 0; r < g; r++) {
					e.dyn_ltree[r * 2] = 0
				}
				for (r = 0; r < m; r++) {
					e.dyn_dtree[r * 2] = 0
				}
				for (r = 0; r < b; r++) {
					e.bl_tree[r * 2] = 0
				}
				e.dyn_ltree[S * 2] = 1;
				e.opt_len = e.static_len = 0;
				e.last_lit = e.matches = 0
			}

			function q(e) {
				if (e.bi_valid > 8) {
					X(e, e.bi_buf)
				} else if (e.bi_valid > 0) {
					e.pending_buf[e.pending++] = e.bi_buf
				}
				e.bi_buf = 0;
				e.bi_valid = 0
			}

			function ee(e, r, t, n) {
				q(e);
				if (n) {
					X(e, t);
					X(e, ~t)
				}
				a.arraySet(e.pending_buf, e.window, r, t, e.pending);
				e.pending += t
			}

			function re(e, r, t, a) {
				var n = r * 2;
				var i = t * 2;
				return e[n] < e[i] || e[n] === e[i] && a[r] <= a[t]
			}

			function te(e, r, t) {
				var a = e.heap[t];
				var n = t << 1;
				while (n <= e.heap_len) {
					if (n < e.heap_len && re(r, e.heap[n + 1], e.heap[n], e.depth)) {
						n++
					}
					if (re(r, a, e.heap[n], e.depth)) {
						break
					}
					e.heap[t] = e.heap[n];
					t = n;
					n <<= 1
				}
				e.heap[t] = a
			}

			function ae(e, r, t) {
				var a;
				var n;
				var i = 0;
				var s;
				var f;
				if (e.last_lit !== 0) {
					do {
						a = e.pending_buf[e.d_buf + i * 2] << 8 | e.pending_buf[e.d_buf + i * 2 + 1];
						n = e.pending_buf[e.l_buf + i];
						i++;
						if (a === 0) {
							j(e, n, r)
						} else {
							s = P[n];
							j(e, s + v + 1, r);
							f = T[s];
							if (f !== 0) {
								n -= N[s];
								G(e, n, f)
							}
							a--;
							s = z(a);
							j(e, s, t);
							f = x[s];
							if (f !== 0) {
								a -= L[s];
								G(e, a, f)
							}
						}
					} while (i < e.last_lit)
				}
				j(e, S, r)
			}

			function ne(e, r) {
				var t = r.dyn_tree;
				var a = r.stat_desc.static_tree;
				var n = r.stat_desc.has_stree;
				var i = r.stat_desc.elems;
				var s, f;
				var o = -1;
				var l;
				e.heap_len = 0;
				e.heap_max = C;
				for (s = 0; s < i; s++) {
					if (t[s * 2] !== 0) {
						e.heap[++e.heap_len] = o = s;
						e.depth[s] = 0
					} else {
						t[s * 2 + 1] = 0
					}
				}
				while (e.heap_len < 2) {
					l = e.heap[++e.heap_len] = o < 2 ? ++o : 0;
					t[l * 2] = 1;
					e.depth[l] = 0;
					e.opt_len--;
					if (n) {
						e.static_len -= a[l * 2 + 1]
					}
				}
				r.max_code = o;
				for (s = e.heap_len >> 1; s >= 1; s--) {
					te(e, t, s)
				}
				l = i;
				do {
					s = e.heap[1];
					e.heap[1] = e.heap[e.heap_len--];
					te(e, t, 1);
					f = e.heap[1];
					e.heap[--e.heap_max] = s;
					e.heap[--e.heap_max] = f;
					t[l * 2] = t[s * 2] + t[f * 2];
					e.depth[l] = (e.depth[s] >= e.depth[f] ? e.depth[s] : e.depth[f]) + 1;
					t[s * 2 + 1] = t[f * 2 + 1] = l;
					e.heap[1] = l++;
					te(e, t, 1)
				} while (e.heap_len >= 2);
				e.heap[--e.heap_max] = e.heap[1];
				$(e, r);
				Z(t, o, e.bl_count)
			}

			function ie(e, r, t) {
				var a;
				var n = -1;
				var i;
				var s = r[0 * 2 + 1];
				var f = 0;
				var o = 7;
				var l = 4;
				if (s === 0) {
					o = 138;
					l = 3
				}
				r[(t + 1) * 2 + 1] = 65535;
				for (a = 0; a <= t; a++) {
					i = s;
					s = r[(a + 1) * 2 + 1];
					if (++f < o && i === s) {
						continue
					} else if (f < l) {
						e.bl_tree[i * 2] += f
					} else if (i !== 0) {
						if (i !== n) {
							e.bl_tree[i * 2]++
						}
						e.bl_tree[A * 2]++
					} else if (f <= 10) {
						e.bl_tree[_ * 2]++
					} else {
						e.bl_tree[B * 2]++
					}
					f = 0;
					n = i;
					if (s === 0) {
						o = 138;
						l = 3
					} else if (i === s) {
						o = 6;
						l = 3
					} else {
						o = 7;
						l = 4
					}
				}
			}

			function se(e, r, t) {
				var a;
				var n = -1;
				var i;
				var s = r[0 * 2 + 1];
				var f = 0;
				var o = 7;
				var l = 4;
				if (s === 0) {
					o = 138;
					l = 3
				}
				for (a = 0; a <= t; a++) {
					i = s;
					s = r[(a + 1) * 2 + 1];
					if (++f < o && i === s) {
						continue
					} else if (f < l) {
						do {
							j(e, i, e.bl_tree)
						} while (--f !== 0)
					} else if (i !== 0) {
						if (i !== n) {
							j(e, i, e.bl_tree);
							f--
						}
						j(e, A, e.bl_tree);
						G(e, f - 3, 2)
					} else if (f <= 10) {
						j(e, _, e.bl_tree);
						G(e, f - 3, 3)
					} else {
						j(e, B, e.bl_tree);
						G(e, f - 11, 7)
					}
					f = 0;
					n = i;
					if (s === 0) {
						o = 138;
						l = 3
					} else if (i === s) {
						o = 6;
						l = 3
					} else {
						o = 7;
						l = 4
					}
				}
			}

			function fe(e) {
				var r;
				ie(e, e.dyn_ltree, e.l_desc.max_code);
				ie(e, e.dyn_dtree, e.d_desc.max_code);
				ne(e, e.bl_desc);
				for (r = b - 1; r >= 3; r--) {
					if (e.bl_tree[I[r] * 2 + 1] !== 0) {
						break
					}
				}
				e.opt_len += 3 * (r + 1) + 5 + 5 + 4;
				return r
			}

			function oe(e, r, t, a) {
				var n;
				G(e, r - 257, 5);
				G(e, t - 1, 5);
				G(e, a - 4, 4);
				for (n = 0; n < a; n++) {
					G(e, e.bl_tree[I[n] * 2 + 1], 3)
				}
				se(e, e.dyn_ltree, r - 1);
				se(e, e.dyn_dtree, t - 1)
			}

			function le(e) {
				var r = 4093624447;
				var t;
				for (t = 0; t <= 31; t++, r >>>= 1) {
					if (r & 1 && e.dyn_ltree[t * 2] !== 0) {
						return i
					}
				}
				if (e.dyn_ltree[9 * 2] !== 0 || e.dyn_ltree[10 * 2] !== 0 || e.dyn_ltree[13 * 2] !== 0) {
					return s
				}
				for (t = 32; t < v; t++) {
					if (e.dyn_ltree[t * 2] !== 0) {
						return s
					}
				}
				return i
			}
			var ce = false;

			function he(e) {
				if (!ce) {
					Q();
					ce = true
				}
				e.l_desc = new V(e.dyn_ltree, U);
				e.d_desc = new V(e.dyn_dtree, H);
				e.bl_desc = new V(e.bl_tree, W);
				e.bi_buf = 0;
				e.bi_valid = 0;
				J(e)
			}

			function ue(e, r, t, a) {
				G(e, (l << 1) + (a ? 1 : 0), 3);
				ee(e, r, t, true)
			}

			function de(e) {
				G(e, c << 1, 3);
				j(e, S, O);
				Y(e)
			}

			function pe(e, r, t, a) {
				var i, s;
				var o = 0;
				if (e.level > 0) {
					if (e.strm.data_type === f) {
						e.strm.data_type = le(e)
					}
					ne(e, e.l_desc);
					ne(e, e.d_desc);
					o = fe(e);
					i = e.opt_len + 3 + 7 >>> 3;
					s = e.static_len + 3 + 7 >>> 3;
					if (s <= i) {
						i = s
					}
				} else {
					i = s = t + 5
				}
				if (t + 4 <= i && r !== -1) {
					ue(e, r, t, a)
				} else if (e.strategy === n || s === i) {
					G(e, (c << 1) + (a ? 1 : 0), 3);
					ae(e, O, D)
				} else {
					G(e, (h << 1) + (a ? 1 : 0), 3);
					oe(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, o + 1);
					ae(e, e.dyn_ltree, e.dyn_dtree)
				}
				J(e);
				if (a) {
					q(e)
				}
			}

			function ve(e, r, t) {
				e.pending_buf[e.d_buf + e.last_lit * 2] = r >>> 8 & 255;
				e.pending_buf[e.d_buf + e.last_lit * 2 + 1] = r & 255;
				e.pending_buf[e.l_buf + e.last_lit] = t & 255;
				e.last_lit++;
				if (r === 0) {
					e.dyn_ltree[t * 2]++
				} else {
					e.matches++;
					r--;
					e.dyn_ltree[(P[t] + v + 1) * 2]++;
					e.dyn_dtree[z(r) * 2]++
				}
				return e.last_lit === e.lit_bufsize - 1
			}
			t._tr_init = he;
			t._tr_stored_block = ue;
			t._tr_flush_block = pe;
			t._tr_tally = ve;
			t._tr_align = de
		}, {
			"../utils/common": 27
		}],
		39: [function(e, r, t) {
			"use strict";

			function a() {
				this.input = null;
				this.next_in = 0;
				this.avail_in = 0;
				this.total_in = 0;
				this.output = null;
				this.next_out = 0;
				this.avail_out = 0;
				this.total_out = 0;
				this.msg = "";
				this.state = null;
				this.data_type = 2;
				this.adler = 0
			}
			r.exports = a
		}, {}]
	}, {}, [9])(9)
});
var cptable = {
	version: "1.12.0"
};
cptable[437] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[620] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÇüéâäàąçêëèïîćÄĄĘęłôöĆûùŚÖÜ¢Ł¥śƒŹŻóÓńŃźż¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[737] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψ░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ωάέήϊίόύϋώΆΈΉΊΌΎΏ±≥≤ΪΫ÷≈°∙·√ⁿ²■ ",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[850] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ ",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[852] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ ",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[857] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■ ",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[861] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÇüéâäàåçêëèÐðÞÄÅÉæÆôöþûÝýÖÜø£Ø₧ƒáíóúÁÍÓÚ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[865] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø₧ƒáíóúñÑªº¿⌐¬½¼¡«¤░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[866] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■ ",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[874] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€����…�����������‘’“”•–—�������� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[895] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ČüéďäĎŤčěĚĹÍľǪÄÁÉžŽôöÓůÚýÖÜŠĽÝŘťáíóúňŇŮÔšřŕŔ¼§«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[932] = function() {
	var e = [],
		r = {},
		t = [],
		a;
	t[0] =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~���������������������������������｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ��������������������������������"
		.split("");
	for (a = 0; a != t[0].length; ++a)
		if (t[0][a].charCodeAt(0) !== 65533) {
			r[t[0][a]] = 0 + a;
			e[0 + a] = t[0][a]
		}
	t[129] =
		"����������������������������������������������������������������　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈〉《》「」『』【】＋－±×�÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓�����������∈∋⊆⊇⊂⊃∪∩��������∧∨￢⇒⇔∀∃�����������∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬�������Å‰♯♭♪†‡¶����◯���"
		.split("");
	for (a = 0; a != t[129].length; ++a)
		if (t[129][a].charCodeAt(0) !== 65533) {
			r[t[129][a]] = 33024 + a;
			e[33024 + a] = t[129][a]
		}
	t[130] =
		"�������������������������������������������������������������������������������０１２３４５６７８９�������ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ�������ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ����ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん��������������"
		.split("");
	for (a = 0; a != t[130].length; ++a)
		if (t[130][a].charCodeAt(0) !== 65533) {
			r[t[130][a]] = 33280 + a;
			e[33280 + a] = t[130][a]
		}
	t[131] =
		"����������������������������������������������������������������ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミ�ムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ��������ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ��������αβγδεζηθικλμνξοπρστυφχψω�����������������������������������������"
		.split("");
	for (a = 0; a != t[131].length; ++a)
		if (t[131][a].charCodeAt(0) !== 65533) {
			r[t[131][a]] = 33536 + a;
			e[33536 + a] = t[131][a]
		}
	t[132] =
		"����������������������������������������������������������������АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ���������������абвгдеёжзийклмн�опрстуфхцчшщъыьэюя�������������─│┌┐┘└├┬┤┴┼'a! `%p━'``p'a! `%p┃'``p'a! `%p┏'``p'a! `%p┓'``p'a! `%p┛'``p'a! `%p┗'``p'a! `%p┣'``p'a! `%p┳'``p'a! `%p┫'``p'a! `%p┻'``p'a! `%p╋'``p┠┯┨┷┿┝┰┥┸╂�����������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[132].length; ++a)
		if (t[132][a].charCodeAt(0) !== 65533) {
			r[t[132][a]] = 33792 + a;
			e[33792 + a] = t[132][a]
		}
	t[135] =
		"����������������������������������������������������������������①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ�㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡��������㍻�〝〟№㏍℡㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪���������������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[135].length; ++a)
		if (t[135][a].charCodeAt(0) !== 65533) {
			r[t[135][a]] = 34560 + a;
			e[34560 + a] = t[135][a]
		}
	t[136] =
		"���������������������������������������������������������������������������������������������������������������������������������������������������������������亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭���"
		.split("");
	for (a = 0; a != t[136].length; ++a)
		if (t[136][a].charCodeAt(0) !== 65533) {
			r[t[136][a]] = 34816 + a;
			e[34816 + a] = t[136][a]
		}
	t[137] =
		"����������������������������������������������������������������院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円�園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改���"
		.split("");
	for (a = 0; a != t[137].length; ++a)
		if (t[137][a].charCodeAt(0) !== 65533) {
			r[t[137][a]] = 35072 + a;
			e[35072 + a] = t[137][a]
		}
	t[138] =
		"����������������������������������������������������������������魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫�橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄���"
		.split("");
	for (a = 0; a != t[138].length; ++a)
		if (t[138][a].charCodeAt(0) !== 65533) {
			r[t[138][a]] = 35328 + a;
			e[35328 + a] = t[138][a]
		}
	t[139] =
		"����������������������������������������������������������������機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救�朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈���"
		.split("");
	for (a = 0; a != t[139].length; ++a)
		if (t[139][a].charCodeAt(0) !== 65533) {
			r[t[139][a]] = 35584 + a;
			e[35584 + a] = t[139][a]
		}
	t[140] =
		"����������������������������������������������������������������掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨�劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向���"
		.split("");
	for (a = 0; a != t[140].length; ++a)
		if (t[140][a].charCodeAt(0) !== 65533) {
			r[t[140][a]] = 35840 + a;
			e[35840 + a] = t[140][a]
		}
	t[141] =
		"����������������������������������������������������������������后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降�項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷���"
		.split("");
	for (a = 0; a != t[141].length; ++a)
		if (t[141][a].charCodeAt(0) !== 65533) {
			r[t[141][a]] = 36096 + a;
			e[36096 + a] = t[141][a]
		}
	t[142] =
		"����������������������������������������������������������������察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止�死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周���"
		.split("");
	for (a = 0; a != t[142].length; ++a)
		if (t[142][a].charCodeAt(0) !== 65533) {
			r[t[142][a]] = 36352 + a;
			e[36352 + a] = t[142][a]
		}
	t[143] =
		"����������������������������������������������������������������宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳�準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾���"
		.split("");
	for (a = 0; a != t[143].length; ++a)
		if (t[143][a].charCodeAt(0) !== 65533) {
			r[t[143][a]] = 36608 + a;
			e[36608 + a] = t[143][a]
		}
	t[144] =
		"����������������������������������������������������������������拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨�逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線���"
		.split("");
	for (a = 0; a != t[144].length; ++a)
		if (t[144][a].charCodeAt(0) !== 65533) {
			r[t[144][a]] = 36864 + a;
			e[36864 + a] = t[144][a]
		}
	t[145] =
		"����������������������������������������������������������������繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻�操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只���"
		.split("");
	for (a = 0; a != t[145].length; ++a)
		if (t[145][a].charCodeAt(0) !== 65533) {
			r[t[145][a]] = 37120 + a;
			e[37120 + a] = t[145][a]
		}
	t[146] =
		"����������������������������������������������������������������叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄�逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓���"
		.split("");
	for (a = 0; a != t[146].length; ++a)
		if (t[146][a].charCodeAt(0) !== 65533) {
			r[t[146][a]] = 37376 + a;
			e[37376 + a] = t[146][a]
		}
	t[147] =
		"����������������������������������������������������������������邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬�凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入���"
		.split("");
	for (a = 0; a != t[147].length; ++a)
		if (t[147][a].charCodeAt(0) !== 65533) {
			r[t[147][a]] = 37632 + a;
			e[37632 + a] = t[147][a]
		}
	t[148] =
		"����������������������������������������������������������������如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅�楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美���"
		.split("");
	for (a = 0; a != t[148].length; ++a)
		if (t[148][a].charCodeAt(0) !== 65533) {
			r[t[148][a]] = 37888 + a;
			e[37888 + a] = t[148][a]
		}
	t[149] =
		"����������������������������������������������������������������鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷�斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋���"
		.split("");
	for (a = 0; a != t[149].length; ++a)
		if (t[149][a].charCodeAt(0) !== 65533) {
			r[t[149][a]] = 38144 + a;
			e[38144 + a] = t[149][a]
		}
	t[150] =
		"����������������������������������������������������������������法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆�摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒���"
		.split("");
	for (a = 0; a != t[150].length; ++a)
		if (t[150][a].charCodeAt(0) !== 65533) {
			r[t[150][a]] = 38400 + a;
			e[38400 + a] = t[150][a]
		}
	t[151] =
		"����������������������������������������������������������������諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲�沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯���"
		.split("");
	for (a = 0; a != t[151].length; ++a)
		if (t[151][a].charCodeAt(0) !== 65533) {
			r[t[151][a]] = 38656 + a;
			e[38656 + a] = t[151][a]
		}
	t[152] =
		"����������������������������������������������������������������蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕��������������������������������������������弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲���"
		.split("");
	for (a = 0; a != t[152].length; ++a)
		if (t[152][a].charCodeAt(0) !== 65533) {
			r[t[152][a]] = 38912 + a;
			e[38912 + a] = t[152][a]
		}
	t[153] =
		"����������������������������������������������������������������僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭�凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨���"
		.split("");
	for (a = 0; a != t[153].length; ++a)
		if (t[153][a].charCodeAt(0) !== 65533) {
			r[t[153][a]] = 39168 + a;
			e[39168 + a] = t[153][a]
		}
	t[154] =
		"����������������������������������������������������������������咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸�噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩���"
		.split("");
	for (a = 0; a != t[154].length; ++a)
		if (t[154][a].charCodeAt(0) !== 65533) {
			r[t[154][a]] = 39424 + a;
			e[39424 + a] = t[154][a]
		}
	t[155] =
		"����������������������������������������������������������������奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀�它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏���"
		.split("");
	for (a = 0; a != t[155].length; ++a)
		if (t[155][a].charCodeAt(0) !== 65533) {
			r[t[155][a]] = 39680 + a;
			e[39680 + a] = t[155][a]
		}
	t[156] =
		"����������������������������������������������������������������廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠�怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛���"
		.split("");
	for (a = 0; a != t[156].length; ++a)
		if (t[156][a].charCodeAt(0) !== 65533) {
			r[t[156][a]] = 39936 + a;
			e[39936 + a] = t[156][a]
		}
	t[157] =
		"����������������������������������������������������������������戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫�捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼���"
		.split("");
	for (a = 0; a != t[157].length; ++a)
		if (t[157][a].charCodeAt(0) !== 65533) {
			r[t[157][a]] = 40192 + a;
			e[40192 + a] = t[157][a]
		}
	t[158] =
		"����������������������������������������������������������������曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎�梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣���"
		.split("");
	for (a = 0; a != t[158].length; ++a)
		if (t[158][a].charCodeAt(0) !== 65533) {
			r[t[158][a]] = 40448 + a;
			e[40448 + a] = t[158][a]
		}
	t[159] =
		"����������������������������������������������������������������檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯�麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌���"
		.split("");
	for (a = 0; a != t[159].length; ++a)
		if (t[159][a].charCodeAt(0) !== 65533) {
			r[t[159][a]] = 40704 + a;
			e[40704 + a] = t[159][a]
		}
	t[224] =
		"����������������������������������������������������������������漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝�烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱���"
		.split("");
	for (a = 0; a != t[224].length; ++a)
		if (t[224][a].charCodeAt(0) !== 65533) {
			r[t[224][a]] = 57344 + a;
			e[57344 + a] = t[224][a]
		}
	t[225] =
		"����������������������������������������������������������������瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿�痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬���"
		.split("");
	for (a = 0; a != t[225].length; ++a)
		if (t[225][a].charCodeAt(0) !== 65533) {
			r[t[225][a]] = 57600 + a;
			e[57600 + a] = t[225][a]
		}
	t[226] =
		"����������������������������������������������������������������磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰�窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆���"
		.split("");
	for (a = 0; a != t[226].length; ++a)
		if (t[226][a].charCodeAt(0) !== 65533) {
			r[t[226][a]] = 57856 + a;
			e[57856 + a] = t[226][a]
		}
	t[227] =
		"����������������������������������������������������������������紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷�縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋���"
		.split("");
	for (a = 0; a != t[227].length; ++a)
		if (t[227][a].charCodeAt(0) !== 65533) {
			r[t[227][a]] = 58112 + a;
			e[58112 + a] = t[227][a]
		}
	t[228] =
		"����������������������������������������������������������������隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤�艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈���"
		.split("");
	for (a = 0; a != t[228].length; ++a)
		if (t[228][a].charCodeAt(0) !== 65533) {
			r[t[228][a]] = 58368 + a;
			e[58368 + a] = t[228][a]
		}
	t[229] =
		"����������������������������������������������������������������蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬�蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞���"
		.split("");
	for (a = 0; a != t[229].length; ++a)
		if (t[229][a].charCodeAt(0) !== 65533) {
			r[t[229][a]] = 58624 + a;
			e[58624 + a] = t[229][a]
		}
	t[230] =
		"����������������������������������������������������������������襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧�諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊���"
		.split("");
	for (a = 0; a != t[230].length; ++a)
		if (t[230][a].charCodeAt(0) !== 65533) {
			r[t[230][a]] = 58880 + a;
			e[58880 + a] = t[230][a]
		}
	t[231] =
		"����������������������������������������������������������������蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜�轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮���"
		.split("");
	for (a = 0; a != t[231].length; ++a)
		if (t[231][a].charCodeAt(0) !== 65533) {
			r[t[231][a]] = 59136 + a;
			e[59136 + a] = t[231][a]
		}
	t[232] =
		"����������������������������������������������������������������錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙�閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰���"
		.split("");
	for (a = 0; a != t[232].length; ++a)
		if (t[232][a].charCodeAt(0) !== 65533) {
			r[t[232][a]] = 59392 + a;
			e[59392 + a] = t[232][a]
		}
	t[233] =
		"����������������������������������������������������������������顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃�騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈���"
		.split("");
	for (a = 0; a != t[233].length; ++a)
		if (t[233][a].charCodeAt(0) !== 65533) {
			r[t[233][a]] = 59648 + a;
			e[59648 + a] = t[233][a]
		}
	t[234] =
		"����������������������������������������������������������������鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯�黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙�������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[234].length; ++a)
		if (t[234][a].charCodeAt(0) !== 65533) {
			r[t[234][a]] = 59904 + a;
			e[59904 + a] = t[234][a]
		}
	t[237] =
		"����������������������������������������������������������������纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏�塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱���"
		.split("");
	for (a = 0; a != t[237].length; ++a)
		if (t[237][a].charCodeAt(0) !== 65533) {
			r[t[237][a]] = 60672 + a;
			e[60672 + a] = t[237][a]
		}
	t[238] =
		"����������������������������������������������������������������犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙�蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑��ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹ￢￤＇＂���"
		.split("");
	for (a = 0; a != t[238].length; ++a)
		if (t[238][a].charCodeAt(0) !== 65533) {
			r[t[238][a]] = 60928 + a;
			e[60928 + a] = t[238][a]
		}
	t[250] =
		"����������������������������������������������������������������ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ￢￤＇＂㈱№℡∵纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊�兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯���"
		.split("");
	for (a = 0; a != t[250].length; ++a)
		if (t[250][a].charCodeAt(0) !== 65533) {
			r[t[250][a]] = 64e3 + a;
			e[64e3 + a] = t[250][a]
		}
	t[251] =
		"����������������������������������������������������������������涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神�祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙���"
		.split("");
	for (a = 0; a != t[251].length; ++a)
		if (t[251][a].charCodeAt(0) !== 65533) {
			r[t[251][a]] = 64256 + a;
			e[64256 + a] = t[251][a]
		}
	t[252] =
		"����������������������������������������������������������������髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[252].length; ++a)
		if (t[252][a].charCodeAt(0) !== 65533) {
			r[t[252][a]] = 64512 + a;
			e[64512 + a] = t[252][a]
		}
	return {
		enc: r,
		dec: e
	}
}();
cptable[936] = function() {
	var e = [],
		r = {},
		t = [],
		a;
	t[0] =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€�������������������������������������������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[0].length; ++a)
		if (t[0][a].charCodeAt(0) !== 65533) {
			r[t[0][a]] = 0 + a;
			e[0 + a] = t[0][a]
		}
	t[129] =
		"����������������������������������������������������������������丂丄丅丆丏丒丗丟丠両丣並丩丮丯丱丳丵丷丼乀乁乂乄乆乊乑乕乗乚乛乢乣乤乥乧乨乪乫乬乭乮乯乲乴乵乶乷乸乹乺乻乼乽乿亀亁亂亃亄亅亇亊�亐亖亗亙亜亝亞亣亪亯亰亱亴亶亷亸亹亼亽亾仈仌仏仐仒仚仛仜仠仢仦仧仩仭仮仯仱仴仸仹仺仼仾伀伂伃伄伅伆伇伈伋伌伒伓伔伕伖伜伝伡伣伨伩伬伭伮伱伳伵伷伹伻伾伿佀佁佂佄佅佇佈佉佊佋佌佒佔佖佡佢佦佨佪佫佭佮佱佲併佷佸佹佺佽侀侁侂侅來侇侊侌侎侐侒侓侕侖侘侙侚侜侞侟価侢�"
		.split("");
	for (a = 0; a != t[129].length; ++a)
		if (t[129][a].charCodeAt(0) !== 65533) {
			r[t[129][a]] = 33024 + a;
			e[33024 + a] = t[129][a]
		}
	t[130] =
		"����������������������������������������������������������������侤侫侭侰侱侲侳侴侶侷侸侹侺侻侼侽侾俀俁係俆俇俈俉俋俌俍俒俓俔俕俖俙俛俠俢俤俥俧俫俬俰俲俴俵俶俷俹俻俼俽俿倀倁倂倃倄倅倆倇倈倉倊�個倎倐們倓倕倖倗倛倝倞倠倢倣値倧倫倯倰倱倲倳倴倵倶倷倸倹倻倽倿偀偁偂偄偅偆偉偊偋偍偐偑偒偓偔偖偗偘偙偛偝偞偟偠偡偢偣偤偦偧偨偩偪偫偭偮偯偰偱偲偳側偵偸偹偺偼偽傁傂傃傄傆傇傉傊傋傌傎傏傐傑傒傓傔傕傖傗傘備傚傛傜傝傞傟傠傡傢傤傦傪傫傭傮傯傰傱傳傴債傶傷傸傹傼�"
		.split("");
	for (a = 0; a != t[130].length; ++a)
		if (t[130][a].charCodeAt(0) !== 65533) {
			r[t[130][a]] = 33280 + a;
			e[33280 + a] = t[130][a]
		}
	t[131] =
		"����������������������������������������������������������������傽傾傿僀僁僂僃僄僅僆僇僈僉僊僋僌働僎僐僑僒僓僔僕僗僘僙僛僜僝僞僟僠僡僢僣僤僥僨僩僪僫僯僰僱僲僴僶僷僸價僺僼僽僾僿儀儁儂儃億儅儈�儉儊儌儍儎儏儐儑儓儔儕儖儗儘儙儚儛儜儝儞償儠儢儣儤儥儦儧儨儩優儫儬儭儮儯儰儱儲儳儴儵儶儷儸儹儺儻儼儽儾兂兇兊兌兎兏児兒兓兗兘兙兛兝兞兟兠兡兣兤兦內兩兪兯兲兺兾兿冃冄円冇冊冋冎冏冐冑冓冔冘冚冝冞冟冡冣冦冧冨冩冪冭冮冴冸冹冺冾冿凁凂凃凅凈凊凍凎凐凒凓凔凕凖凗�"
		.split("");
	for (a = 0; a != t[131].length; ++a)
		if (t[131][a].charCodeAt(0) !== 65533) {
			r[t[131][a]] = 33536 + a;
			e[33536 + a] = t[131][a]
		}
	t[132] =
		"����������������������������������������������������������������凘凙凚凜凞凟凢凣凥処凧凨凩凪凬凮凱凲凴凷凾刄刅刉刋刌刏刐刓刔刕刜刞刟刡刢刣別刦刧刪刬刯刱刲刴刵刼刾剄剅剆則剈剉剋剎剏剒剓剕剗剘�剙剚剛剝剟剠剢剣剤剦剨剫剬剭剮剰剱剳剴創剶剷剸剹剺剻剼剾劀劃劄劅劆劇劉劊劋劌劍劎劏劑劒劔劕劖劗劘劙劚劜劤劥劦劧劮劯劰労劵劶劷劸効劺劻劼劽勀勁勂勄勅勆勈勊勌勍勎勏勑勓勔動勗務勚勛勜勝勞勠勡勢勣勥勦勧勨勩勪勫勬勭勮勯勱勲勳勴勵勶勷勸勻勼勽匁匂匃匄匇匉匊匋匌匎�"
		.split("");
	for (a = 0; a != t[132].length; ++a)
		if (t[132][a].charCodeAt(0) !== 65533) {
			r[t[132][a]] = 33792 + a;
			e[33792 + a] = t[132][a]
		}
	t[133] =
		"����������������������������������������������������������������匑匒匓匔匘匛匜匞匟匢匤匥匧匨匩匫匬匭匯匰匱匲匳匴匵匶匷匸匼匽區卂卄卆卋卌卍卐協単卙卛卝卥卨卪卬卭卲卶卹卻卼卽卾厀厁厃厇厈厊厎厏�厐厑厒厓厔厖厗厙厛厜厞厠厡厤厧厪厫厬厭厯厰厱厲厳厴厵厷厸厹厺厼厽厾叀參叄叅叆叇収叏叐叒叓叕叚叜叝叞叡叢叧叴叺叾叿吀吂吅吇吋吔吘吙吚吜吢吤吥吪吰吳吶吷吺吽吿呁呂呄呅呇呉呌呍呎呏呑呚呝呞呟呠呡呣呥呧呩呪呫呬呭呮呯呰呴呹呺呾呿咁咃咅咇咈咉咊咍咑咓咗咘咜咞咟咠咡�"
		.split("");
	for (a = 0; a != t[133].length; ++a)
		if (t[133][a].charCodeAt(0) !== 65533) {
			r[t[133][a]] = 34048 + a;
			e[34048 + a] = t[133][a]
		}
	t[134] =
		"����������������������������������������������������������������咢咥咮咰咲咵咶咷咹咺咼咾哃哅哊哋哖哘哛哠員哢哣哤哫哬哯哰哱哴哵哶哷哸哹哻哾唀唂唃唄唅唈唊唋唌唍唎唒唓唕唖唗唘唙唚唜唝唞唟唡唥唦�唨唩唫唭唲唴唵唶唸唹唺唻唽啀啂啅啇啈啋啌啍啎問啑啒啓啔啗啘啙啚啛啝啞啟啠啢啣啨啩啫啯啰啱啲啳啴啹啺啽啿喅喆喌喍喎喐喒喓喕喖喗喚喛喞喠喡喢喣喤喥喦喨喩喪喫喬喭單喯喰喲喴営喸喺喼喿嗀嗁嗂嗃嗆嗇嗈嗊嗋嗎嗏嗐嗕嗗嗘嗙嗚嗛嗞嗠嗢嗧嗩嗭嗮嗰嗱嗴嗶嗸嗹嗺嗻嗼嗿嘂嘃嘄嘅�"
		.split("");
	for (a = 0; a != t[134].length; ++a)
		if (t[134][a].charCodeAt(0) !== 65533) {
			r[t[134][a]] = 34304 + a;
			e[34304 + a] = t[134][a]
		}
	t[135] =
		"����������������������������������������������������������������嘆嘇嘊嘋嘍嘐嘑嘒嘓嘔嘕嘖嘗嘙嘚嘜嘝嘠嘡嘢嘥嘦嘨嘩嘪嘫嘮嘯嘰嘳嘵嘷嘸嘺嘼嘽嘾噀噁噂噃噄噅噆噇噈噉噊噋噏噐噑噒噓噕噖噚噛噝噞噟噠噡�噣噥噦噧噭噮噯噰噲噳噴噵噷噸噹噺噽噾噿嚀嚁嚂嚃嚄嚇嚈嚉嚊嚋嚌嚍嚐嚑嚒嚔嚕嚖嚗嚘嚙嚚嚛嚜嚝嚞嚟嚠嚡嚢嚤嚥嚦嚧嚨嚩嚪嚫嚬嚭嚮嚰嚱嚲嚳嚴嚵嚶嚸嚹嚺嚻嚽嚾嚿囀囁囂囃囄囅囆囇囈囉囋囌囍囎囏囐囑囒囓囕囖囘囙囜団囥囦囧囨囩囪囬囮囯囲図囶囷囸囻囼圀圁圂圅圇國圌圍圎圏圐圑�"
		.split("");
	for (a = 0; a != t[135].length; ++a)
		if (t[135][a].charCodeAt(0) !== 65533) {
			r[t[135][a]] = 34560 + a;
			e[34560 + a] = t[135][a]
		}
	t[136] =
		"����������������������������������������������������������������園圓圔圕圖圗團圙圚圛圝圞圠圡圢圤圥圦圧圫圱圲圴圵圶圷圸圼圽圿坁坃坄坅坆坈坉坋坒坓坔坕坖坘坙坢坣坥坧坬坮坰坱坲坴坵坸坹坺坽坾坿垀�垁垇垈垉垊垍垎垏垐垑垔垕垖垗垘垙垚垜垝垞垟垥垨垪垬垯垰垱垳垵垶垷垹垺垻垼垽垾垿埀埁埄埅埆埇埈埉埊埌埍埐埑埓埖埗埛埜埞埡埢埣埥埦埧埨埩埪埫埬埮埰埱埲埳埵埶執埻埼埾埿堁堃堄堅堈堉堊堌堎堏堐堒堓堔堖堗堘堚堛堜堝堟堢堣堥堦堧堨堩堫堬堭堮堯報堲堳場堶堷堸堹堺堻堼堽�"
		.split("");
	for (a = 0; a != t[136].length; ++a)
		if (t[136][a].charCodeAt(0) !== 65533) {
			r[t[136][a]] = 34816 + a;
			e[34816 + a] = t[136][a]
		}
	t[137] =
		"����������������������������������������������������������������堾堿塀塁塂塃塅塆塇塈塉塊塋塎塏塐塒塓塕塖塗塙塚塛塜塝塟塠塡塢塣塤塦塧塨塩塪塭塮塯塰塱塲塳塴塵塶塷塸塹塺塻塼塽塿墂墄墆墇墈墊墋墌�墍墎墏墐墑墔墕墖増墘墛墜墝墠墡墢墣墤墥墦墧墪墫墬墭墮墯墰墱墲墳墴墵墶墷墸墹墺墻墽墾墿壀壂壃壄壆壇壈壉壊壋壌壍壎壏壐壒壓壔壖壗壘壙壚壛壜壝壞壟壠壡壢壣壥壦壧壨壩壪壭壯壱売壴壵壷壸壺壻壼壽壾壿夀夁夃夅夆夈変夊夋夌夎夐夑夒夓夗夘夛夝夞夠夡夢夣夦夨夬夰夲夳夵夶夻�"
		.split("");
	for (a = 0; a != t[137].length; ++a)
		if (t[137][a].charCodeAt(0) !== 65533) {
			r[t[137][a]] = 35072 + a;
			e[35072 + a] = t[137][a]
		}
	t[138] =
		"����������������������������������������������������������������夽夾夿奀奃奅奆奊奌奍奐奒奓奙奛奜奝奞奟奡奣奤奦奧奨奩奪奫奬奭奮奯奰奱奲奵奷奺奻奼奾奿妀妅妉妋妌妎妏妐妑妔妕妘妚妛妜妝妟妠妡妢妦�妧妬妭妰妱妳妴妵妶妷妸妺妼妽妿姀姁姂姃姄姅姇姈姉姌姍姎姏姕姖姙姛姞姟姠姡姢姤姦姧姩姪姫姭姮姯姰姱姲姳姴姵姶姷姸姺姼姽姾娀娂娊娋娍娎娏娐娒娔娕娖娗娙娚娛娝娞娡娢娤娦娧娨娪娫娬娭娮娯娰娳娵娷娸娹娺娻娽娾娿婁婂婃婄婅婇婈婋婌婍婎婏婐婑婒婓婔婖婗婘婙婛婜婝婞婟婠�"
		.split("");
	for (a = 0; a != t[138].length; ++a)
		if (t[138][a].charCodeAt(0) !== 65533) {
			r[t[138][a]] = 35328 + a;
			e[35328 + a] = t[138][a]
		}
	t[139] =
		"����������������������������������������������������������������婡婣婤婥婦婨婩婫婬婭婮婯婰婱婲婳婸婹婻婼婽婾媀媁媂媃媄媅媆媇媈媉媊媋媌媍媎媏媐媑媓媔媕媖媗媘媙媜媝媞媟媠媡媢媣媤媥媦媧媨媩媫媬�媭媮媯媰媱媴媶媷媹媺媻媼媽媿嫀嫃嫄嫅嫆嫇嫈嫊嫋嫍嫎嫏嫐嫑嫓嫕嫗嫙嫚嫛嫝嫞嫟嫢嫤嫥嫧嫨嫪嫬嫭嫮嫯嫰嫲嫳嫴嫵嫶嫷嫸嫹嫺嫻嫼嫽嫾嫿嬀嬁嬂嬃嬄嬅嬆嬇嬈嬊嬋嬌嬍嬎嬏嬐嬑嬒嬓嬔嬕嬘嬙嬚嬛嬜嬝嬞嬟嬠嬡嬢嬣嬤嬥嬦嬧嬨嬩嬪嬫嬬嬭嬮嬯嬰嬱嬳嬵嬶嬸嬹嬺嬻嬼嬽嬾嬿孁孂孃孄孅孆孇�"
		.split("");
	for (a = 0; a != t[139].length; ++a)
		if (t[139][a].charCodeAt(0) !== 65533) {
			r[t[139][a]] = 35584 + a;
			e[35584 + a] = t[139][a]
		}
	t[140] =
		"����������������������������������������������������������������孈孉孊孋孌孍孎孏孒孖孞孠孡孧孨孫孭孮孯孲孴孶孷學孹孻孼孾孿宂宆宊宍宎宐宑宒宔宖実宧宨宩宬宭宮宯宱宲宷宺宻宼寀寁寃寈寉寊寋寍寎寏�寑寔寕寖寗寘寙寚寛寜寠寢寣實寧審寪寫寬寭寯寱寲寳寴寵寶寷寽対尀専尃尅將專尋尌對導尐尒尓尗尙尛尞尟尠尡尣尦尨尩尪尫尭尮尯尰尲尳尵尶尷屃屄屆屇屌屍屒屓屔屖屗屘屚屛屜屝屟屢層屧屨屩屪屫屬屭屰屲屳屴屵屶屷屸屻屼屽屾岀岃岄岅岆岇岉岊岋岎岏岒岓岕岝岞岟岠岡岤岥岦岧岨�"
		.split("");
	for (a = 0; a != t[140].length; ++a)
		if (t[140][a].charCodeAt(0) !== 65533) {
			r[t[140][a]] = 35840 + a;
			e[35840 + a] = t[140][a]
		}
	t[141] =
		"����������������������������������������������������������������岪岮岯岰岲岴岶岹岺岻岼岾峀峂峃峅峆峇峈峉峊峌峍峎峏峐峑峓峔峕峖峗峘峚峛峜峝峞峟峠峢峣峧峩峫峬峮峯峱峲峳峴峵島峷峸峹峺峼峽峾峿崀�崁崄崅崈崉崊崋崌崍崏崐崑崒崓崕崗崘崙崚崜崝崟崠崡崢崣崥崨崪崫崬崯崰崱崲崳崵崶崷崸崹崺崻崼崿嵀嵁嵂嵃嵄嵅嵆嵈嵉嵍嵎嵏嵐嵑嵒嵓嵔嵕嵖嵗嵙嵚嵜嵞嵟嵠嵡嵢嵣嵤嵥嵦嵧嵨嵪嵭嵮嵰嵱嵲嵳嵵嵶嵷嵸嵹嵺嵻嵼嵽嵾嵿嶀嶁嶃嶄嶅嶆嶇嶈嶉嶊嶋嶌嶍嶎嶏嶐嶑嶒嶓嶔嶕嶖嶗嶘嶚嶛嶜嶞嶟嶠�"
		.split("");
	for (a = 0; a != t[141].length; ++a)
		if (t[141][a].charCodeAt(0) !== 65533) {
			r[t[141][a]] = 36096 + a;
			e[36096 + a] = t[141][a]
		}
	t[142] =
		"����������������������������������������������������������������嶡嶢嶣嶤嶥嶦嶧嶨嶩嶪嶫嶬嶭嶮嶯嶰嶱嶲嶳嶴嶵嶶嶸嶹嶺嶻嶼嶽嶾嶿巀巁巂巃巄巆巇巈巉巊巋巌巎巏巐巑巒巓巔巕巖巗巘巙巚巜巟巠巣巤巪巬巭�巰巵巶巸巹巺巻巼巿帀帄帇帉帊帋帍帎帒帓帗帞帟帠帡帢帣帤帥帨帩帪師帬帯帰帲帳帴帵帶帹帺帾帿幀幁幃幆幇幈幉幊幋幍幎幏幐幑幒幓幖幗幘幙幚幜幝幟幠幣幤幥幦幧幨幩幪幫幬幭幮幯幰幱幵幷幹幾庁庂広庅庈庉庌庍庎庒庘庛庝庡庢庣庤庨庩庪庫庬庮庯庰庱庲庴庺庻庼庽庿廀廁廂廃廄廅�"
		.split("");
	for (a = 0; a != t[142].length; ++a)
		if (t[142][a].charCodeAt(0) !== 65533) {
			r[t[142][a]] = 36352 + a;
			e[36352 + a] = t[142][a]
		}
	t[143] =
		"����������������������������������������������������������������廆廇廈廋廌廍廎廏廐廔廕廗廘廙廚廜廝廞廟廠廡廢廣廤廥廦廧廩廫廬廭廮廯廰廱廲廳廵廸廹廻廼廽弅弆弇弉弌弍弎弐弒弔弖弙弚弜弝弞弡弢弣弤�弨弫弬弮弰弲弳弴張弶強弸弻弽弾弿彁彂彃彄彅彆彇彈彉彊彋彌彍彎彏彑彔彙彚彛彜彞彟彠彣彥彧彨彫彮彯彲彴彵彶彸彺彽彾彿徃徆徍徎徏徑従徔徖徚徛徝從徟徠徢徣徤徥徦徧復徫徬徯徰徱徲徳徴徶徸徹徺徻徾徿忀忁忂忇忈忊忋忎忓忔忕忚忛応忞忟忢忣忥忦忨忩忬忯忰忲忳忴忶忷忹忺忼怇�"
		.split("");
	for (a = 0; a != t[143].length; ++a)
		if (t[143][a].charCodeAt(0) !== 65533) {
			r[t[143][a]] = 36608 + a;
			e[36608 + a] = t[143][a]
		}
	t[144] =
		"����������������������������������������������������������������怈怉怋怌怐怑怓怗怘怚怞怟怢怣怤怬怭怮怰怱怲怳怴怶怷怸怹怺怽怾恀恄恅恆恇恈恉恊恌恎恏恑恓恔恖恗恘恛恜恞恟恠恡恥恦恮恱恲恴恵恷恾悀�悁悂悅悆悇悈悊悋悎悏悐悑悓悕悗悘悙悜悞悡悢悤悥悧悩悪悮悰悳悵悶悷悹悺悽悾悿惀惁惂惃惄惇惈惉惌惍惎惏惐惒惓惔惖惗惙惛惞惡惢惣惤惥惪惱惲惵惷惸惻惼惽惾惿愂愃愄愅愇愊愋愌愐愑愒愓愔愖愗愘愙愛愜愝愞愡愢愥愨愩愪愬愭愮愯愰愱愲愳愴愵愶愷愸愹愺愻愼愽愾慀慁慂慃慄慅慆�"
		.split("");
	for (a = 0; a != t[144].length; ++a)
		if (t[144][a].charCodeAt(0) !== 65533) {
			r[t[144][a]] = 36864 + a;
			e[36864 + a] = t[144][a]
		}
	t[145] =
		"����������������������������������������������������������������慇慉態慍慏慐慒慓慔慖慗慘慙慚慛慜慞慟慠慡慣慤慥慦慩慪慫慬慭慮慯慱慲慳慴慶慸慹慺慻慼慽慾慿憀憁憂憃憄憅憆憇憈憉憊憌憍憏憐憑憒憓憕�憖憗憘憙憚憛憜憞憟憠憡憢憣憤憥憦憪憫憭憮憯憰憱憲憳憴憵憶憸憹憺憻憼憽憿懀懁懃懄懅懆懇應懌懍懎懏懐懓懕懖懗懘懙懚懛懜懝懞懟懠懡懢懣懤懥懧懨懩懪懫懬懭懮懯懰懱懲懳懴懶懷懸懹懺懻懼懽懾戀戁戂戃戄戅戇戉戓戔戙戜戝戞戠戣戦戧戨戩戫戭戯戰戱戲戵戶戸戹戺戻戼扂扄扅扆扊�"
		.split("");
	for (a = 0; a != t[145].length; ++a)
		if (t[145][a].charCodeAt(0) !== 65533) {
			r[t[145][a]] = 37120 + a;
			e[37120 + a] = t[145][a]
		}
	t[146] =
		"����������������������������������������������������������������扏扐払扖扗扙扚扜扝扞扟扠扡扢扤扥扨扱扲扴扵扷扸扺扻扽抁抂抃抅抆抇抈抋抌抍抎抏抐抔抙抜抝択抣抦抧抩抪抭抮抯抰抲抳抴抶抷抸抺抾拀拁�拃拋拏拑拕拝拞拠拡拤拪拫拰拲拵拸拹拺拻挀挃挄挅挆挊挋挌挍挏挐挒挓挔挕挗挘挙挜挦挧挩挬挭挮挰挱挳挴挵挶挷挸挻挼挾挿捀捁捄捇捈捊捑捒捓捔捖捗捘捙捚捛捜捝捠捤捥捦捨捪捫捬捯捰捲捳捴捵捸捹捼捽捾捿掁掃掄掅掆掋掍掑掓掔掕掗掙掚掛掜掝掞掟採掤掦掫掯掱掲掵掶掹掻掽掿揀�"
		.split("");
	for (a = 0; a != t[146].length; ++a)
		if (t[146][a].charCodeAt(0) !== 65533) {
			r[t[146][a]] = 37376 + a;
			e[37376 + a] = t[146][a]
		}
	t[147] =
		"����������������������������������������������������������������揁揂揃揅揇揈揊揋揌揑揓揔揕揗揘揙揚換揜揝揟揢揤揥揦揧揨揫揬揮揯揰揱揳揵揷揹揺揻揼揾搃搄搆搇搈搉搊損搎搑搒搕搖搗搘搙搚搝搟搢搣搤�搥搧搨搩搫搮搯搰搱搲搳搵搶搷搸搹搻搼搾摀摂摃摉摋摌摍摎摏摐摑摓摕摖摗摙摚摛摜摝摟摠摡摢摣摤摥摦摨摪摫摬摮摯摰摱摲摳摴摵摶摷摻摼摽摾摿撀撁撃撆撈撉撊撋撌撍撎撏撐撓撔撗撘撚撛撜撝撟撠撡撢撣撥撦撧撨撪撫撯撱撲撳撴撶撹撻撽撾撿擁擃擄擆擇擈擉擊擋擌擏擑擓擔擕擖擙據�"
		.split("");
	for (a = 0; a != t[147].length; ++a)
		if (t[147][a].charCodeAt(0) !== 65533) {
			r[t[147][a]] = 37632 + a;
			e[37632 + a] = t[147][a]
		}
	t[148] =
		"����������������������������������������������������������������擛擜擝擟擠擡擣擥擧擨擩擪擫擬擭擮擯擰擱擲擳擴擵擶擷擸擹擺擻擼擽擾擿攁攂攃攄攅攆攇攈攊攋攌攍攎攏攐攑攓攔攕攖攗攙攚攛攜攝攞攟攠攡�攢攣攤攦攧攨攩攪攬攭攰攱攲攳攷攺攼攽敀敁敂敃敄敆敇敊敋敍敎敐敒敓敔敗敘敚敜敟敠敡敤敥敧敨敩敪敭敮敯敱敳敵敶數敹敺敻敼敽敾敿斀斁斂斃斄斅斆斈斉斊斍斎斏斒斔斕斖斘斚斝斞斠斢斣斦斨斪斬斮斱斲斳斴斵斶斷斸斺斻斾斿旀旂旇旈旉旊旍旐旑旓旔旕旘旙旚旛旜旝旞旟旡旣旤旪旫�"
		.split("");
	for (a = 0; a != t[148].length; ++a)
		if (t[148][a].charCodeAt(0) !== 65533) {
			r[t[148][a]] = 37888 + a;
			e[37888 + a] = t[148][a]
		}
	t[149] =
		"����������������������������������������������������������������旲旳旴旵旸旹旻旼旽旾旿昁昄昅昇昈昉昋昍昐昑昒昖昗昘昚昛昜昞昡昢昣昤昦昩昪昫昬昮昰昲昳昷昸昹昺昻昽昿晀時晄晅晆晇晈晉晊晍晎晐晑晘�晙晛晜晝晞晠晢晣晥晧晩晪晫晬晭晱晲晳晵晸晹晻晼晽晿暀暁暃暅暆暈暉暊暋暍暎暏暐暒暓暔暕暘暙暚暛暜暞暟暠暡暢暣暤暥暦暩暪暫暬暭暯暰暱暲暳暵暶暷暸暺暻暼暽暿曀曁曂曃曄曅曆曇曈曉曊曋曌曍曎曏曐曑曒曓曔曕曖曗曘曚曞曟曠曡曢曣曤曥曧曨曪曫曬曭曮曯曱曵曶書曺曻曽朁朂會�"
		.split("");
	for (a = 0; a != t[149].length; ++a)
		if (t[149][a].charCodeAt(0) !== 65533) {
			r[t[149][a]] = 38144 + a;
			e[38144 + a] = t[149][a]
		}
	t[150] =
		"����������������������������������������������������������������朄朅朆朇朌朎朏朑朒朓朖朘朙朚朜朞朠朡朢朣朤朥朧朩朮朰朲朳朶朷朸朹朻朼朾朿杁杄杅杇杊杋杍杒杔杕杗杘杙杚杛杝杢杣杤杦杧杫杬杮東杴杶�杸杹杺杻杽枀枂枃枅枆枈枊枌枍枎枏枑枒枓枔枖枙枛枟枠枡枤枦枩枬枮枱枲枴枹枺枻枼枽枾枿柀柂柅柆柇柈柉柊柋柌柍柎柕柖柗柛柟柡柣柤柦柧柨柪柫柭柮柲柵柶柷柸柹柺査柼柾栁栂栃栄栆栍栐栒栔栕栘栙栚栛栜栞栟栠栢栣栤栥栦栧栨栫栬栭栮栯栰栱栴栵栶栺栻栿桇桋桍桏桒桖桗桘桙桚桛�"
		.split("");
	for (a = 0; a != t[150].length; ++a)
		if (t[150][a].charCodeAt(0) !== 65533) {
			r[t[150][a]] = 38400 + a;
			e[38400 + a] = t[150][a]
		}
	t[151] =
		"����������������������������������������������������������������桜桝桞桟桪桬桭桮桯桰桱桲桳桵桸桹桺桻桼桽桾桿梀梂梄梇梈梉梊梋梌梍梎梐梑梒梔梕梖梘梙梚梛梜條梞梟梠梡梣梤梥梩梪梫梬梮梱梲梴梶梷梸�梹梺梻梼梽梾梿棁棃棄棅棆棇棈棊棌棎棏棐棑棓棔棖棗棙棛棜棝棞棟棡棢棤棥棦棧棨棩棪棫棬棭棯棲棳棴棶棷棸棻棽棾棿椀椂椃椄椆椇椈椉椊椌椏椑椓椔椕椖椗椘椙椚椛検椝椞椡椢椣椥椦椧椨椩椪椫椬椮椯椱椲椳椵椶椷椸椺椻椼椾楀楁楃楄楅楆楇楈楉楊楋楌楍楎楏楐楑楒楓楕楖楘楙楛楜楟�"
		.split("");
	for (a = 0; a != t[151].length; ++a)
		if (t[151][a].charCodeAt(0) !== 65533) {
			r[t[151][a]] = 38656 + a;
			e[38656 + a] = t[151][a]
		}
	t[152] =
		"����������������������������������������������������������������楡楢楤楥楧楨楩楪楬業楯楰楲楳楴極楶楺楻楽楾楿榁榃榅榊榋榌榎榏榐榑榒榓榖榗榙榚榝榞榟榠榡榢榣榤榥榦榩榪榬榮榯榰榲榳榵榶榸榹榺榼榽�榾榿槀槂槃槄槅槆槇槈槉構槍槏槑槒槓槕槖槗様槙槚槜槝槞槡槢槣槤槥槦槧槨槩槪槫槬槮槯槰槱槳槴槵槶槷槸槹槺槻槼槾樀樁樂樃樄樅樆樇樈樉樋樌樍樎樏樐樑樒樓樔樕樖標樚樛樜樝樞樠樢樣樤樥樦樧権樫樬樭樮樰樲樳樴樶樷樸樹樺樻樼樿橀橁橂橃橅橆橈橉橊橋橌橍橎橏橑橒橓橔橕橖橗橚�"
		.split("");
	for (a = 0; a != t[152].length; ++a)
		if (t[152][a].charCodeAt(0) !== 65533) {
			r[t[152][a]] = 38912 + a;
			e[38912 + a] = t[152][a]
		}
	t[153] =
		"����������������������������������������������������������������橜橝橞機橠橢橣橤橦橧橨橩橪橫橬橭橮橯橰橲橳橴橵橶橷橸橺橻橽橾橿檁檂檃檅檆檇檈檉檊檋檌檍檏檒檓檔檕檖檘檙檚檛檜檝檞檟檡檢檣檤檥檦�檧檨檪檭檮檯檰檱檲檳檴檵檶檷檸檹檺檻檼檽檾檿櫀櫁櫂櫃櫄櫅櫆櫇櫈櫉櫊櫋櫌櫍櫎櫏櫐櫑櫒櫓櫔櫕櫖櫗櫘櫙櫚櫛櫜櫝櫞櫟櫠櫡櫢櫣櫤櫥櫦櫧櫨櫩櫪櫫櫬櫭櫮櫯櫰櫱櫲櫳櫴櫵櫶櫷櫸櫹櫺櫻櫼櫽櫾櫿欀欁欂欃欄欅欆欇欈欉權欋欌欍欎欏欐欑欒欓欔欕欖欗欘欙欚欛欜欝欞欟欥欦欨欩欪欫欬欭欮�"
		.split("");
	for (a = 0; a != t[153].length; ++a)
		if (t[153][a].charCodeAt(0) !== 65533) {
			r[t[153][a]] = 39168 + a;
			e[39168 + a] = t[153][a]
		}
	t[154] =
		"����������������������������������������������������������������欯欰欱欳欴欵欶欸欻欼欽欿歀歁歂歄歅歈歊歋歍歎歏歐歑歒歓歔歕歖歗歘歚歛歜歝歞歟歠歡歨歩歫歬歭歮歯歰歱歲歳歴歵歶歷歸歺歽歾歿殀殅殈�殌殎殏殐殑殔殕殗殘殙殜殝殞殟殠殢殣殤殥殦殧殨殩殫殬殭殮殯殰殱殲殶殸殹殺殻殼殽殾毀毃毄毆毇毈毉毊毌毎毐毑毘毚毜毝毞毟毠毢毣毤毥毦毧毨毩毬毭毮毰毱毲毴毶毷毸毺毻毼毾毿氀氁氂氃氄氈氉氊氋氌氎氒気氜氝氞氠氣氥氫氬氭氱氳氶氷氹氺氻氼氾氿汃汄汅汈汋汌汍汎汏汑汒汓汖汘�"
		.split("");
	for (a = 0; a != t[154].length; ++a)
		if (t[154][a].charCodeAt(0) !== 65533) {
			r[t[154][a]] = 39424 + a;
			e[39424 + a] = t[154][a]
		}
	t[155] =
		"����������������������������������������������������������������汙汚汢汣汥汦汧汫汬汭汮汯汱汳汵汷汸決汻汼汿沀沄沇沊沋沍沎沑沒沕沖沗沘沚沜沝沞沠沢沨沬沯沰沴沵沶沷沺泀況泂泃泆泇泈泋泍泎泏泑泒泘�泙泚泜泝泟泤泦泧泩泬泭泲泴泹泿洀洂洃洅洆洈洉洊洍洏洐洑洓洔洕洖洘洜洝洟洠洡洢洣洤洦洨洩洬洭洯洰洴洶洷洸洺洿浀浂浄浉浌浐浕浖浗浘浛浝浟浡浢浤浥浧浨浫浬浭浰浱浲浳浵浶浹浺浻浽浾浿涀涁涃涄涆涇涊涋涍涏涐涒涖涗涘涙涚涜涢涥涬涭涰涱涳涴涶涷涹涺涻涼涽涾淁淂淃淈淉淊�"
		.split("");
	for (a = 0; a != t[155].length; ++a)
		if (t[155][a].charCodeAt(0) !== 65533) {
			r[t[155][a]] = 39680 + a;
			e[39680 + a] = t[155][a]
		}
	t[156] =
		"����������������������������������������������������������������淍淎淏淐淒淓淔淕淗淚淛淜淟淢淣淥淧淨淩淪淭淯淰淲淴淵淶淸淺淽淾淿渀渁渂渃渄渆渇済渉渋渏渒渓渕渘渙減渜渞渟渢渦渧渨渪測渮渰渱渳渵�渶渷渹渻渼渽渾渿湀湁湂湅湆湇湈湉湊湋湌湏湐湑湒湕湗湙湚湜湝湞湠湡湢湣湤湥湦湧湨湩湪湬湭湯湰湱湲湳湴湵湶湷湸湹湺湻湼湽満溁溂溄溇溈溊溋溌溍溎溑溒溓溔溕準溗溙溚溛溝溞溠溡溣溤溦溨溩溫溬溭溮溰溳溵溸溹溼溾溿滀滃滄滅滆滈滉滊滌滍滎滐滒滖滘滙滛滜滝滣滧滪滫滬滭滮滯�"
		.split("");
	for (a = 0; a != t[156].length; ++a)
		if (t[156][a].charCodeAt(0) !== 65533) {
			r[t[156][a]] = 39936 + a;
			e[39936 + a] = t[156][a]
		}
	t[157] =
		"����������������������������������������������������������������滰滱滲滳滵滶滷滸滺滻滼滽滾滿漀漁漃漄漅漇漈漊漋漌漍漎漐漑漒漖漗漘漙漚漛漜漝漞漟漡漢漣漥漦漧漨漬漮漰漲漴漵漷漸漹漺漻漼漽漿潀潁潂�潃潄潅潈潉潊潌潎潏潐潑潒潓潔潕潖潗潙潚潛潝潟潠潡潣潤潥潧潨潩潪潫潬潯潰潱潳潵潶潷潹潻潽潾潿澀澁澂澃澅澆澇澊澋澏澐澑澒澓澔澕澖澗澘澙澚澛澝澞澟澠澢澣澤澥澦澨澩澪澫澬澭澮澯澰澱澲澴澵澷澸澺澻澼澽澾澿濁濃濄濅濆濇濈濊濋濌濍濎濏濐濓濔濕濖濗濘濙濚濛濜濝濟濢濣濤濥�"
		.split("");
	for (a = 0; a != t[157].length; ++a)
		if (t[157][a].charCodeAt(0) !== 65533) {
			r[t[157][a]] = 40192 + a;
			e[40192 + a] = t[157][a]
		}
	t[158] =
		"����������������������������������������������������������������濦濧濨濩濪濫濬濭濰濱濲濳濴濵濶濷濸濹濺濻濼濽濾濿瀀瀁瀂瀃瀄瀅瀆瀇瀈瀉瀊瀋瀌瀍瀎瀏瀐瀒瀓瀔瀕瀖瀗瀘瀙瀜瀝瀞瀟瀠瀡瀢瀤瀥瀦瀧瀨瀩瀪�瀫瀬瀭瀮瀯瀰瀱瀲瀳瀴瀶瀷瀸瀺瀻瀼瀽瀾瀿灀灁灂灃灄灅灆灇灈灉灊灋灍灎灐灑灒灓灔灕灖灗灘灙灚灛灜灝灟灠灡灢灣灤灥灦灧灨灩灪灮灱灲灳灴灷灹灺灻災炁炂炃炄炆炇炈炋炌炍炏炐炑炓炗炘炚炛炞炟炠炡炢炣炤炥炦炧炨炩炪炰炲炴炵炶為炾炿烄烅烆烇烉烋烌烍烎烏烐烑烒烓烔烕烖烗烚�"
		.split("");
	for (a = 0; a != t[158].length; ++a)
		if (t[158][a].charCodeAt(0) !== 65533) {
			r[t[158][a]] = 40448 + a;
			e[40448 + a] = t[158][a]
		}
	t[159] =
		"����������������������������������������������������������������烜烝烞烠烡烢烣烥烪烮烰烱烲烳烴烵烶烸烺烻烼烾烿焀焁焂焃焄焅焆焇焈焋焌焍焎焏焑焒焔焗焛焜焝焞焟焠無焢焣焤焥焧焨焩焪焫焬焭焮焲焳焴�焵焷焸焹焺焻焼焽焾焿煀煁煂煃煄煆煇煈煉煋煍煏煐煑煒煓煔煕煖煗煘煙煚煛煝煟煠煡煢煣煥煩煪煫煬煭煯煰煱煴煵煶煷煹煻煼煾煿熀熁熂熃熅熆熇熈熉熋熌熍熎熐熑熒熓熕熖熗熚熛熜熝熞熡熢熣熤熥熦熧熩熪熫熭熮熯熰熱熲熴熶熷熸熺熻熼熽熾熿燀燁燂燄燅燆燇燈燉燊燋燌燍燏燐燑燒燓�"
		.split("");
	for (a = 0; a != t[159].length; ++a)
		if (t[159][a].charCodeAt(0) !== 65533) {
			r[t[159][a]] = 40704 + a;
			e[40704 + a] = t[159][a]
		}
	t[160] =
		"����������������������������������������������������������������燖燗燘燙燚燛燜燝燞營燡燢燣燤燦燨燩燪燫燬燭燯燰燱燲燳燴燵燶燷燸燺燻燼燽燾燿爀爁爂爃爄爅爇爈爉爊爋爌爍爎爏爐爑爒爓爔爕爖爗爘爙爚�爛爜爞爟爠爡爢爣爤爥爦爧爩爫爭爮爯爲爳爴爺爼爾牀牁牂牃牄牅牆牉牊牋牎牏牐牑牓牔牕牗牘牚牜牞牠牣牤牥牨牪牫牬牭牰牱牳牴牶牷牸牻牼牽犂犃犅犆犇犈犉犌犎犐犑犓犔犕犖犗犘犙犚犛犜犝犞犠犡犢犣犤犥犦犧犨犩犪犫犮犱犲犳犵犺犻犼犽犾犿狀狅狆狇狉狊狋狌狏狑狓狔狕狖狘狚狛�"
		.split("");
	for (a = 0; a != t[160].length; ++a)
		if (t[160][a].charCodeAt(0) !== 65533) {
			r[t[160][a]] = 40960 + a;
			e[40960 + a] = t[160][a]
		}
	t[161] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������　、。·ˉˇ¨〃々—～‖…‘’“”〔〕〈〉《》「」『』〖〗【】±×÷∶∧∨∑∏∪∩∈∷√⊥∥∠⌒⊙∫∮≡≌≈∽∝≠≮≯≤≥∞∵∴♂♀°′″℃＄¤￠￡‰§№☆★○●◎◇◆□■△▲※→←↑↓〓�"
		.split("");
	for (a = 0; a != t[161].length; ++a)
		if (t[161][a].charCodeAt(0) !== 65533) {
			r[t[161][a]] = 41216 + a;
			e[41216 + a] = t[161][a]
		}
	t[162] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹ������⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑⒒⒓⒔⒕⒖⒗⒘⒙⒚⒛⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂⒃⒄⒅⒆⒇①②③④⑤⑥⑦⑧⑨⑩��㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩��ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ���"
		.split("");
	for (a = 0; a != t[162].length; ++a)
		if (t[162][a].charCodeAt(0) !== 65533) {
			r[t[162][a]] = 41472 + a;
			e[41472 + a] = t[162][a]
		}
	t[163] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������！＂＃￥％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝￣�"
		.split("");
	for (a = 0; a != t[163].length; ++a)
		if (t[163][a].charCodeAt(0) !== 65533) {
			r[t[163][a]] = 41728 + a;
			e[41728 + a] = t[163][a]
		}
	t[164] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん������������"
		.split("");
	for (a = 0; a != t[164].length; ++a)
		if (t[164][a].charCodeAt(0) !== 65533) {
			r[t[164][a]] = 41984 + a;
			e[41984 + a] = t[164][a]
		}
	t[165] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ���������"
		.split("");
	for (a = 0; a != t[165].length; ++a)
		if (t[165][a].charCodeAt(0) !== 65533) {
			r[t[165][a]] = 42240 + a;
			e[42240 + a] = t[165][a]
		}
	t[166] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ��������αβγδεζηθικλμνξοπρστυφχψω�������︵︶︹︺︿﹀︽︾﹁﹂﹃﹄��︻︼︷︸︱�︳︴����������"
		.split("");
	for (a = 0; a != t[166].length; ++a)
		if (t[166][a].charCodeAt(0) !== 65533) {
			r[t[166][a]] = 42496 + a;
			e[42496 + a] = t[166][a]
		}
	t[167] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ���������������абвгдеёжзийклмнопрстуфхцчшщъыьэюя��������������"
		.split("");
	for (a = 0; a != t[167].length; ++a)
		if (t[167][a].charCodeAt(0) !== 65533) {
			r[t[167][a]] = 42752 + a;
			e[42752 + a] = t[167][a]
		}
	t[168] =
		"����������������������������������������������������������������ˊˋ˙–―‥‵℅℉↖↗↘↙∕∟∣≒≦≧⊿═║╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬╭╮╯╰╱╲╳▁▂▃▄▅▆▇�█▉▊▋▌▍▎▏▓▔▕▼▽◢◣◤◥☉⊕〒〝〞�����������āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüêɑ�ńň�ɡ����ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦㄧㄨㄩ����������������������"
		.split("");
	for (a = 0; a != t[168].length; ++a)
		if (t[168][a].charCodeAt(0) !== 65533) {
			r[t[168][a]] = 43008 + a;
			e[43008 + a] = t[168][a]
		}
	t[169] =
		"����������������������������������������������������������������〡〢〣〤〥〦〧〨〩㊣㎎㎏㎜㎝㎞㎡㏄㏎㏑㏒㏕︰￢￤�℡㈱�‐���ー゛゜ヽヾ〆ゝゞ﹉﹊﹋﹌﹍﹎﹏﹐﹑﹒﹔﹕﹖﹗﹙﹚﹛﹜﹝﹞﹟﹠﹡�﹢﹣﹤﹥﹦﹨﹩﹪﹫�������������〇�������������─'a! `%p━'``p│'a! `%p┃'``p┄┅┆┇┈┉┊┋┌┍┎'a! `%p┏'``p┐┑┒'a! `%p┓'``p└┕┖'a! `%p┗'``p┘┙┚'a! `%p┛'``p├┝┞┟┠┡┢'a! `%p┣'``p┤┥┦┧┨┩┪'a! `%p┫'``p┬┭┮┯┰┱┲'a! `%p┳'``p┴┵┶┷┸┹┺'a! `%p┻'``p┼┽┾┿╀╁╂╃╄╅╆╇╈╉╊'a! `%p╋'``p����������������"
		.split("");
	for (a = 0; a != t[169].length; ++a)
		if (t[169][a].charCodeAt(0) !== 65533) {
			r[t[169][a]] = 43264 + a;
			e[43264 + a] = t[169][a]
		}
	t[170] =
		"����������������������������������������������������������������狜狝狟狢狣狤狥狦狧狪狫狵狶狹狽狾狿猀猂猄猅猆猇猈猉猋猌猍猏猐猑猒猔猘猙猚猟猠猣猤猦猧猨猭猯猰猲猳猵猶猺猻猼猽獀獁獂獃獄獅獆獇獈�獉獊獋獌獎獏獑獓獔獕獖獘獙獚獛獜獝獞獟獡獢獣獤獥獦獧獨獩獪獫獮獰獱�����������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[170].length; ++a)
		if (t[170][a].charCodeAt(0) !== 65533) {
			r[t[170][a]] = 43520 + a;
			e[43520 + a] = t[170][a]
		}
	t[171] =
		"����������������������������������������������������������������獲獳獴獵獶獷獸獹獺獻獼獽獿玀玁玂玃玅玆玈玊玌玍玏玐玒玓玔玕玗玘玙玚玜玝玞玠玡玣玤玥玦玧玨玪玬玭玱玴玵玶玸玹玼玽玾玿珁珃珄珅珆珇�珋珌珎珒珓珔珕珖珗珘珚珛珜珝珟珡珢珣珤珦珨珪珫珬珮珯珰珱珳珴珵珶珷�����������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[171].length; ++a)
		if (t[171][a].charCodeAt(0) !== 65533) {
			r[t[171][a]] = 43776 + a;
			e[43776 + a] = t[171][a]
		}
	t[172] =
		"����������������������������������������������������������������珸珹珺珻珼珽現珿琀琁琂琄琇琈琋琌琍琎琑琒琓琔琕琖琗琘琙琜琝琞琟琠琡琣琤琧琩琫琭琯琱琲琷琸琹琺琻琽琾琿瑀瑂瑃瑄瑅瑆瑇瑈瑉瑊瑋瑌瑍�瑎瑏瑐瑑瑒瑓瑔瑖瑘瑝瑠瑡瑢瑣瑤瑥瑦瑧瑨瑩瑪瑫瑬瑮瑯瑱瑲瑳瑴瑵瑸瑹瑺�����������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[172].length; ++a)
		if (t[172][a].charCodeAt(0) !== 65533) {
			r[t[172][a]] = 44032 + a;
			e[44032 + a] = t[172][a]
		}
	t[173] =
		"����������������������������������������������������������������瑻瑼瑽瑿璂璄璅璆璈璉璊璌璍璏璑璒璓璔璕璖璗璘璙璚璛璝璟璠璡璢璣璤璥璦璪璫璬璭璮璯環璱璲璳璴璵璶璷璸璹璻璼璽璾璿瓀瓁瓂瓃瓄瓅瓆瓇�瓈瓉瓊瓋瓌瓍瓎瓏瓐瓑瓓瓔瓕瓖瓗瓘瓙瓚瓛瓝瓟瓡瓥瓧瓨瓩瓪瓫瓬瓭瓰瓱瓲�����������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[173].length; ++a)
		if (t[173][a].charCodeAt(0) !== 65533) {
			r[t[173][a]] = 44288 + a;
			e[44288 + a] = t[173][a]
		}
	t[174] =
		"����������������������������������������������������������������瓳瓵瓸瓹瓺瓻瓼瓽瓾甀甁甂甃甅甆甇甈甉甊甋甌甎甐甒甔甕甖甗甛甝甞甠甡產産甤甦甧甪甮甴甶甹甼甽甿畁畂畃畄畆畇畉畊畍畐畑畒畓畕畖畗畘�畝畞畟畠畡畢畣畤畧畨畩畫畬畭畮畯異畱畳畵當畷畺畻畼畽畾疀疁疂疄疅疇�����������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[174].length; ++a)
		if (t[174][a].charCodeAt(0) !== 65533) {
			r[t[174][a]] = 44544 + a;
			e[44544 + a] = t[174][a]
		}
	t[175] =
		"����������������������������������������������������������������疈疉疊疌疍疎疐疓疕疘疛疜疞疢疦疧疨疩疪疭疶疷疺疻疿痀痁痆痋痌痎痏痐痑痓痗痙痚痜痝痟痠痡痥痩痬痭痮痯痲痳痵痶痷痸痺痻痽痾瘂瘄瘆瘇�瘈瘉瘋瘍瘎瘏瘑瘒瘓瘔瘖瘚瘜瘝瘞瘡瘣瘧瘨瘬瘮瘯瘱瘲瘶瘷瘹瘺瘻瘽癁療癄�����������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[175].length; ++a)
		if (t[175][a].charCodeAt(0) !== 65533) {
			r[t[175][a]] = 44800 + a;
			e[44800 + a] = t[175][a]
		}
	t[176] =
		"����������������������������������������������������������������癅癆癇癈癉癊癋癎癏癐癑癒癓癕癗癘癙癚癛癝癟癠癡癢癤癥癦癧癨癩癪癬癭癮癰癱癲癳癴癵癶癷癹発發癿皀皁皃皅皉皊皌皍皏皐皒皔皕皗皘皚皛�皜皝皞皟皠皡皢皣皥皦皧皨皩皪皫皬皭皯皰皳皵皶皷皸皹皺皻皼皽皾盀盁盃啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥�"
		.split("");
	for (a = 0; a != t[176].length; ++a)
		if (t[176][a].charCodeAt(0) !== 65533) {
			r[t[176][a]] = 45056 + a;
			e[45056 + a] = t[176][a]
		}
	t[177] =
		"����������������������������������������������������������������盄盇盉盋盌盓盕盙盚盜盝盞盠盡盢監盤盦盧盨盩盪盫盬盭盰盳盵盶盷盺盻盽盿眀眂眃眅眆眊県眎眏眐眑眒眓眔眕眖眗眘眛眜眝眞眡眣眤眥眧眪眫�眬眮眰眱眲眳眴眹眻眽眾眿睂睄睅睆睈睉睊睋睌睍睎睏睒睓睔睕睖睗睘睙睜薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳�"
		.split("");
	for (a = 0; a != t[177].length; ++a)
		if (t[177][a].charCodeAt(0) !== 65533) {
			r[t[177][a]] = 45312 + a;
			e[45312 + a] = t[177][a]
		}
	t[178] =
		"����������������������������������������������������������������睝睞睟睠睤睧睩睪睭睮睯睰睱睲睳睴睵睶睷睸睺睻睼瞁瞂瞃瞆瞇瞈瞉瞊瞋瞏瞐瞓瞔瞕瞖瞗瞘瞙瞚瞛瞜瞝瞞瞡瞣瞤瞦瞨瞫瞭瞮瞯瞱瞲瞴瞶瞷瞸瞹瞺�瞼瞾矀矁矂矃矄矅矆矇矈矉矊矋矌矎矏矐矑矒矓矔矕矖矘矙矚矝矞矟矠矡矤病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖�"
		.split("");
	for (a = 0; a != t[178].length; ++a)
		if (t[178][a].charCodeAt(0) !== 65533) {
			r[t[178][a]] = 45568 + a;
			e[45568 + a] = t[178][a]
		}
	t[179] =
		"����������������������������������������������������������������矦矨矪矯矰矱矲矴矵矷矹矺矻矼砃砄砅砆砇砈砊砋砎砏砐砓砕砙砛砞砠砡砢砤砨砪砫砮砯砱砲砳砵砶砽砿硁硂硃硄硆硈硉硊硋硍硏硑硓硔硘硙硚�硛硜硞硟硠硡硢硣硤硥硦硧硨硩硯硰硱硲硳硴硵硶硸硹硺硻硽硾硿碀碁碂碃场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚�"
		.split("");
	for (a = 0; a != t[179].length; ++a)
		if (t[179][a].charCodeAt(0) !== 65533) {
			r[t[179][a]] = 45824 + a;
			e[45824 + a] = t[179][a]
		}
	t[180] =
		"����������������������������������������������������������������碄碅碆碈碊碋碏碐碒碔碕碖碙碝碞碠碢碤碦碨碩碪碫碬碭碮碯碵碶碷碸確碻碼碽碿磀磂磃磄磆磇磈磌磍磎磏磑磒磓磖磗磘磚磛磜磝磞磟磠磡磢磣�磤磥磦磧磩磪磫磭磮磯磰磱磳磵磶磸磹磻磼磽磾磿礀礂礃礄礆礇礈礉礊礋礌础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮�"
		.split("");
	for (a = 0; a != t[180].length; ++a)
		if (t[180][a].charCodeAt(0) !== 65533) {
			r[t[180][a]] = 46080 + a;
			e[46080 + a] = t[180][a]
		}
	t[181] =
		"����������������������������������������������������������������礍礎礏礐礑礒礔礕礖礗礘礙礚礛礜礝礟礠礡礢礣礥礦礧礨礩礪礫礬礭礮礯礰礱礲礳礵礶礷礸礹礽礿祂祃祄祅祇祊祋祌祍祎祏祐祑祒祔祕祘祙祡祣�祤祦祩祪祫祬祮祰祱祲祳祴祵祶祹祻祼祽祾祿禂禃禆禇禈禉禋禌禍禎禐禑禒怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠�"
		.split("");
	for (a = 0; a != t[181].length; ++a)
		if (t[181][a].charCodeAt(0) !== 65533) {
			r[t[181][a]] = 46336 + a;
			e[46336 + a] = t[181][a]
		}
	t[182] =
		"����������������������������������������������������������������禓禔禕禖禗禘禙禛禜禝禞禟禠禡禢禣禤禥禦禨禩禪禫禬禭禮禯禰禱禲禴禵禶禷禸禼禿秂秄秅秇秈秊秌秎秏秐秓秔秖秗秙秚秛秜秝秞秠秡秢秥秨秪�秬秮秱秲秳秴秵秶秷秹秺秼秾秿稁稄稅稇稈稉稊稌稏稐稑稒稓稕稖稘稙稛稜丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二�"
		.split("");
	for (a = 0; a != t[182].length; ++a)
		if (t[182][a].charCodeAt(0) !== 65533) {
			r[t[182][a]] = 46592 + a;
			e[46592 + a] = t[182][a]
		}
	t[183] =
		"����������������������������������������������������������������稝稟稡稢稤稥稦稧稨稩稪稫稬稭種稯稰稱稲稴稵稶稸稺稾穀穁穂穃穄穅穇穈穉穊穋穌積穎穏穐穒穓穔穕穖穘穙穚穛穜穝穞穟穠穡穢穣穤穥穦穧穨�穩穪穫穬穭穮穯穱穲穳穵穻穼穽穾窂窅窇窉窊窋窌窎窏窐窓窔窙窚窛窞窡窢贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服�"
		.split("");
	for (a = 0; a != t[183].length; ++a)
		if (t[183][a].charCodeAt(0) !== 65533) {
			r[t[183][a]] = 46848 + a;
			e[46848 + a] = t[183][a]
		}
	t[184] =
		"����������������������������������������������������������������窣窤窧窩窪窫窮窯窰窱窲窴窵窶窷窸窹窺窻窼窽窾竀竁竂竃竄竅竆竇竈竉竊竌竍竎竏竐竑竒竓竔竕竗竘竚竛竜竝竡竢竤竧竨竩竪竫竬竮竰竱竲竳�竴竵競竷竸竻竼竾笀笁笂笅笇笉笌笍笎笐笒笓笖笗笘笚笜笝笟笡笢笣笧笩笭浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹�"
		.split("");
	for (a = 0; a != t[184].length; ++a)
		if (t[184][a].charCodeAt(0) !== 65533) {
			r[t[184][a]] = 47104 + a;
			e[47104 + a] = t[184][a]
		}
	t[185] =
		"����������������������������������������������������������������笯笰笲笴笵笶笷笹笻笽笿筀筁筂筃筄筆筈筊筍筎筓筕筗筙筜筞筟筡筣筤筥筦筧筨筩筪筫筬筭筯筰筳筴筶筸筺筼筽筿箁箂箃箄箆箇箈箉箊箋箌箎箏�箑箒箓箖箘箙箚箛箞箟箠箣箤箥箮箯箰箲箳箵箶箷箹箺箻箼箽箾箿節篂篃範埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈�"
		.split("");
	for (a = 0; a != t[185].length; ++a)
		if (t[185][a].charCodeAt(0) !== 65533) {
			r[t[185][a]] = 47360 + a;
			e[47360 + a] = t[185][a]
		}
	t[186] =
		"����������������������������������������������������������������篅篈築篊篋篍篎篏篐篒篔篕篖篗篘篛篜篞篟篠篢篣篤篧篨篩篫篬篭篯篰篲篳篴篵篶篸篹篺篻篽篿簀簁簂簃簄簅簆簈簉簊簍簎簐簑簒簓簔簕簗簘簙�簚簛簜簝簞簠簡簢簣簤簥簨簩簫簬簭簮簯簰簱簲簳簴簵簶簷簹簺簻簼簽簾籂骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖�"
		.split("");
	for (a = 0; a != t[186].length; ++a)
		if (t[186][a].charCodeAt(0) !== 65533) {
			r[t[186][a]] = 47616 + a;
			e[47616 + a] = t[186][a]
		}
	t[187] =
		"����������������������������������������������������������������籃籄籅籆籇籈籉籊籋籌籎籏籐籑籒籓籔籕籖籗籘籙籚籛籜籝籞籟籠籡籢籣籤籥籦籧籨籩籪籫籬籭籮籯籰籱籲籵籶籷籸籹籺籾籿粀粁粂粃粄粅粆粇�粈粊粋粌粍粎粏粐粓粔粖粙粚粛粠粡粣粦粧粨粩粫粬粭粯粰粴粵粶粷粸粺粻弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕�"
		.split("");
	for (a = 0; a != t[187].length; ++a)
		if (t[187][a].charCodeAt(0) !== 65533) {
			r[t[187][a]] = 47872 + a;
			e[47872 + a] = t[187][a]
		}
	t[188] =
		"����������������������������������������������������������������粿糀糂糃糄糆糉糋糎糏糐糑糒糓糔糘糚糛糝糞糡糢糣糤糥糦糧糩糪糫糬糭糮糰糱糲糳糴糵糶糷糹糺糼糽糾糿紀紁紂紃約紅紆紇紈紉紋紌納紎紏紐�紑紒紓純紕紖紗紘紙級紛紜紝紞紟紡紣紤紥紦紨紩紪紬紭紮細紱紲紳紴紵紶肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件�"
		.split("");
	for (a = 0; a != t[188].length; ++a)
		if (t[188][a].charCodeAt(0) !== 65533) {
			r[t[188][a]] = 48128 + a;
			e[48128 + a] = t[188][a]
		}
	t[189] =
		"����������������������������������������������������������������紷紸紹紺紻紼紽紾紿絀絁終絃組絅絆絇絈絉絊絋経絍絎絏結絑絒絓絔絕絖絗絘絙絚絛絜絝絞絟絠絡絢絣絤絥給絧絨絩絪絫絬絭絯絰統絲絳絴絵絶�絸絹絺絻絼絽絾絿綀綁綂綃綄綅綆綇綈綉綊綋綌綍綎綏綐綑綒經綔綕綖綗綘健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸�"
		.split("");
	for (a = 0; a != t[189].length; ++a)
		if (t[189][a].charCodeAt(0) !== 65533) {
			r[t[189][a]] = 48384 + a;
			e[48384 + a] = t[189][a]
		}
	t[190] =
		"����������������������������������������������������������������継続綛綜綝綞綟綠綡綢綣綤綥綧綨綩綪綫綬維綯綰綱網綳綴綵綶綷綸綹綺綻綼綽綾綿緀緁緂緃緄緅緆緇緈緉緊緋緌緍緎総緐緑緒緓緔緕緖緗緘緙�線緛緜緝緞緟締緡緢緣緤緥緦緧編緩緪緫緬緭緮緯緰緱緲緳練緵緶緷緸緹緺尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻�"
		.split("");
	for (a = 0; a != t[190].length; ++a)
		if (t[190][a].charCodeAt(0) !== 65533) {
			r[t[190][a]] = 48640 + a;
			e[48640 + a] = t[190][a]
		}
	t[191] =
		"����������������������������������������������������������������緻緼緽緾緿縀縁縂縃縄縅縆縇縈縉縊縋縌縍縎縏縐縑縒縓縔縕縖縗縘縙縚縛縜縝縞縟縠縡縢縣縤縥縦縧縨縩縪縫縬縭縮縯縰縱縲縳縴縵縶縷縸縹�縺縼總績縿繀繂繃繄繅繆繈繉繊繋繌繍繎繏繐繑繒繓織繕繖繗繘繙繚繛繜繝俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀�"
		.split("");
	for (a = 0; a != t[191].length; ++a)
		if (t[191][a].charCodeAt(0) !== 65533) {
			r[t[191][a]] = 48896 + a;
			e[48896 + a] = t[191][a]
		}
	t[192] =
		"����������������������������������������������������������������繞繟繠繡繢繣繤繥繦繧繨繩繪繫繬繭繮繯繰繱繲繳繴繵繶繷繸繹繺繻繼繽繾繿纀纁纃纄纅纆纇纈纉纊纋續纍纎纏纐纑纒纓纔纕纖纗纘纙纚纜纝纞�纮纴纻纼绖绤绬绹缊缐缞缷缹缻缼缽缾缿罀罁罃罆罇罈罉罊罋罌罍罎罏罒罓馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐�"
		.split("");
	for (a = 0; a != t[192].length; ++a)
		if (t[192][a].charCodeAt(0) !== 65533) {
			r[t[192][a]] = 49152 + a;
			e[49152 + a] = t[192][a]
		}
	t[193] =
		"����������������������������������������������������������������罖罙罛罜罝罞罠罣罤罥罦罧罫罬罭罯罰罳罵罶罷罸罺罻罼罽罿羀羂羃羄羅羆羇羈羉羋羍羏羐羑羒羓羕羖羗羘羙羛羜羠羢羣羥羦羨義羪羫羬羭羮羱�羳羴羵羶羷羺羻羾翀翂翃翄翆翇翈翉翋翍翏翐翑習翓翖翗翙翚翛翜翝翞翢翣痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿�"
		.split("");
	for (a = 0; a != t[193].length; ++a)
		if (t[193][a].charCodeAt(0) !== 65533) {
			r[t[193][a]] = 49408 + a;
			e[49408 + a] = t[193][a]
		}
	t[194] =
		"����������������������������������������������������������������翤翧翨翪翫翬翭翯翲翴翵翶翷翸翹翺翽翾翿耂耇耈耉耊耎耏耑耓耚耛耝耞耟耡耣耤耫耬耭耮耯耰耲耴耹耺耼耾聀聁聄聅聇聈聉聎聏聐聑聓聕聖聗�聙聛聜聝聞聟聠聡聢聣聤聥聦聧聨聫聬聭聮聯聰聲聳聴聵聶職聸聹聺聻聼聽隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫�"
		.split("");
	for (a = 0; a != t[194].length; ++a)
		if (t[194][a].charCodeAt(0) !== 65533) {
			r[t[194][a]] = 49664 + a;
			e[49664 + a] = t[194][a]
		}
	t[195] =
		"����������������������������������������������������������������聾肁肂肅肈肊肍肎肏肐肑肒肔肕肗肙肞肣肦肧肨肬肰肳肵肶肸肹肻胅胇胈胉胊胋胏胐胑胒胓胔胕胘胟胠胢胣胦胮胵胷胹胻胾胿脀脁脃脄脅脇脈脋�脌脕脗脙脛脜脝脟脠脡脢脣脤脥脦脧脨脩脪脫脭脮脰脳脴脵脷脹脺脻脼脽脿谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸�"
		.split("");
	for (a = 0; a != t[195].length; ++a)
		if (t[195][a].charCodeAt(0) !== 65533) {
			r[t[195][a]] = 49920 + a;
			e[49920 + a] = t[195][a]
		}
	t[196] =
		"����������������������������������������������������������������腀腁腂腃腄腅腇腉腍腎腏腒腖腗腘腛腜腝腞腟腡腢腣腤腦腨腪腫腬腯腲腳腵腶腷腸膁膃膄膅膆膇膉膋膌膍膎膐膒膓膔膕膖膗膙膚膞膟膠膡膢膤膥�膧膩膫膬膭膮膯膰膱膲膴膵膶膷膸膹膼膽膾膿臄臅臇臈臉臋臍臎臏臐臑臒臓摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁�"
		.split("");
	for (a = 0; a != t[196].length; ++a)
		if (t[196][a].charCodeAt(0) !== 65533) {
			r[t[196][a]] = 50176 + a;
			e[50176 + a] = t[196][a]
		}
	t[197] =
		"����������������������������������������������������������������臔臕臖臗臘臙臚臛臜臝臞臟臠臡臢臤臥臦臨臩臫臮臯臰臱臲臵臶臷臸臹臺臽臿舃與興舉舊舋舎舏舑舓舕舖舗舘舙舚舝舠舤舥舦舧舩舮舲舺舼舽舿�艀艁艂艃艅艆艈艊艌艍艎艐艑艒艓艔艕艖艗艙艛艜艝艞艠艡艢艣艤艥艦艧艩拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗�"
		.split("");
	for (a = 0; a != t[197].length; ++a)
		if (t[197][a].charCodeAt(0) !== 65533) {
			r[t[197][a]] = 50432 + a;
			e[50432 + a] = t[197][a]
		}
	t[198] =
		"����������������������������������������������������������������艪艫艬艭艱艵艶艷艸艻艼芀芁芃芅芆芇芉芌芐芓芔芕芖芚芛芞芠芢芣芧芲芵芶芺芻芼芿苀苂苃苅苆苉苐苖苙苚苝苢苧苨苩苪苬苭苮苰苲苳苵苶苸�苺苼苽苾苿茀茊茋茍茐茒茓茖茘茙茝茞茟茠茡茢茣茤茥茦茩茪茮茰茲茷茻茽啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐�"
		.split("");
	for (a = 0; a != t[198].length; ++a)
		if (t[198][a].charCodeAt(0) !== 65533) {
			r[t[198][a]] = 50688 + a;
			e[50688 + a] = t[198][a]
		}
	t[199] =
		"����������������������������������������������������������������茾茿荁荂荄荅荈荊荋荌荍荎荓荕荖荗荘荙荝荢荰荱荲荳荴荵荶荹荺荾荿莀莁莂莃莄莇莈莊莋莌莍莏莐莑莔莕莖莗莙莚莝莟莡莢莣莤莥莦莧莬莭莮�莯莵莻莾莿菂菃菄菆菈菉菋菍菎菐菑菒菓菕菗菙菚菛菞菢菣菤菦菧菨菫菬菭恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠�"
		.split("");
	for (a = 0; a != t[199].length; ++a)
		if (t[199][a].charCodeAt(0) !== 65533) {
			r[t[199][a]] = 50944 + a;
			e[50944 + a] = t[199][a]
		}
	t[200] =
		"����������������������������������������������������������������菮華菳菴菵菶菷菺菻菼菾菿萀萂萅萇萈萉萊萐萒萓萔萕萖萗萙萚萛萞萟萠萡萢萣萩萪萫萬萭萮萯萰萲萳萴萵萶萷萹萺萻萾萿葀葁葂葃葄葅葇葈葉�葊葋葌葍葎葏葐葒葓葔葕葖葘葝葞葟葠葢葤葥葦葧葨葪葮葯葰葲葴葷葹葻葼取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁�"
		.split("");
	for (a = 0; a != t[200].length; ++a)
		if (t[200][a].charCodeAt(0) !== 65533) {
			r[t[200][a]] = 51200 + a;
			e[51200 + a] = t[200][a]
		}
	t[201] =
		"����������������������������������������������������������������葽葾葿蒀蒁蒃蒄蒅蒆蒊蒍蒏蒐蒑蒒蒓蒔蒕蒖蒘蒚蒛蒝蒞蒟蒠蒢蒣蒤蒥蒦蒧蒨蒩蒪蒫蒬蒭蒮蒰蒱蒳蒵蒶蒷蒻蒼蒾蓀蓂蓃蓅蓆蓇蓈蓋蓌蓎蓏蓒蓔蓕蓗�蓘蓙蓚蓛蓜蓞蓡蓢蓤蓧蓨蓩蓪蓫蓭蓮蓯蓱蓲蓳蓴蓵蓶蓷蓸蓹蓺蓻蓽蓾蔀蔁蔂伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳�"
		.split("");
	for (a = 0; a != t[201].length; ++a)
		if (t[201][a].charCodeAt(0) !== 65533) {
			r[t[201][a]] = 51456 + a;
			e[51456 + a] = t[201][a]
		}
	t[202] =
		"����������������������������������������������������������������蔃蔄蔅蔆蔇蔈蔉蔊蔋蔍蔎蔏蔐蔒蔔蔕蔖蔘蔙蔛蔜蔝蔞蔠蔢蔣蔤蔥蔦蔧蔨蔩蔪蔭蔮蔯蔰蔱蔲蔳蔴蔵蔶蔾蔿蕀蕁蕂蕄蕅蕆蕇蕋蕌蕍蕎蕏蕐蕑蕒蕓蕔蕕�蕗蕘蕚蕛蕜蕝蕟蕠蕡蕢蕣蕥蕦蕧蕩蕪蕫蕬蕭蕮蕯蕰蕱蕳蕵蕶蕷蕸蕼蕽蕿薀薁省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱�"
		.split("");
	for (a = 0; a != t[202].length; ++a)
		if (t[202][a].charCodeAt(0) !== 65533) {
			r[t[202][a]] = 51712 + a;
			e[51712 + a] = t[202][a]
		}
	t[203] =
		"����������������������������������������������������������������薂薃薆薈薉薊薋薌薍薎薐薑薒薓薔薕薖薗薘薙薚薝薞薟薠薡薢薣薥薦薧薩薫薬薭薱薲薳薴薵薶薸薺薻薼薽薾薿藀藂藃藄藅藆藇藈藊藋藌藍藎藑藒�藔藖藗藘藙藚藛藝藞藟藠藡藢藣藥藦藧藨藪藫藬藭藮藯藰藱藲藳藴藵藶藷藸恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔�"
		.split("");
	for (a = 0; a != t[203].length; ++a)
		if (t[203][a].charCodeAt(0) !== 65533) {
			r[t[203][a]] = 51968 + a;
			e[51968 + a] = t[203][a]
		}
	t[204] =
		"����������������������������������������������������������������藹藺藼藽藾蘀蘁蘂蘃蘄蘆蘇蘈蘉蘊蘋蘌蘍蘎蘏蘐蘒蘓蘔蘕蘗蘘蘙蘚蘛蘜蘝蘞蘟蘠蘡蘢蘣蘤蘥蘦蘨蘪蘫蘬蘭蘮蘯蘰蘱蘲蘳蘴蘵蘶蘷蘹蘺蘻蘽蘾蘿虀�虁虂虃虄虅虆虇虈虉虊虋虌虒虓處虖虗虘虙虛虜虝號虠虡虣虤虥虦虧虨虩虪獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃�"
		.split("");
	for (a = 0; a != t[204].length; ++a)
		if (t[204][a].charCodeAt(0) !== 65533) {
			r[t[204][a]] = 52224 + a;
			e[52224 + a] = t[204][a]
		}
	t[205] =
		"����������������������������������������������������������������虭虯虰虲虳虴虵虶虷虸蚃蚄蚅蚆蚇蚈蚉蚎蚏蚐蚑蚒蚔蚖蚗蚘蚙蚚蚛蚞蚟蚠蚡蚢蚥蚦蚫蚭蚮蚲蚳蚷蚸蚹蚻蚼蚽蚾蚿蛁蛂蛃蛅蛈蛌蛍蛒蛓蛕蛖蛗蛚蛜�蛝蛠蛡蛢蛣蛥蛦蛧蛨蛪蛫蛬蛯蛵蛶蛷蛺蛻蛼蛽蛿蜁蜄蜅蜆蜋蜌蜎蜏蜐蜑蜔蜖汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威�"
		.split("");
	for (a = 0; a != t[205].length; ++a)
		if (t[205][a].charCodeAt(0) !== 65533) {
			r[t[205][a]] = 52480 + a;
			e[52480 + a] = t[205][a]
		}
	t[206] =
		"����������������������������������������������������������������蜙蜛蜝蜟蜠蜤蜦蜧蜨蜪蜫蜬蜭蜯蜰蜲蜳蜵蜶蜸蜹蜺蜼蜽蝀蝁蝂蝃蝄蝅蝆蝊蝋蝍蝏蝐蝑蝒蝔蝕蝖蝘蝚蝛蝜蝝蝞蝟蝡蝢蝦蝧蝨蝩蝪蝫蝬蝭蝯蝱蝲蝳蝵�蝷蝸蝹蝺蝿螀螁螄螆螇螉螊螌螎螏螐螑螒螔螕螖螘螙螚螛螜螝螞螠螡螢螣螤巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺�"
		.split("");
	for (a = 0; a != t[206].length; ++a)
		if (t[206][a].charCodeAt(0) !== 65533) {
			r[t[206][a]] = 52736 + a;
			e[52736 + a] = t[206][a]
		}
	t[207] =
		"����������������������������������������������������������������螥螦螧螩螪螮螰螱螲螴螶螷螸螹螻螼螾螿蟁蟂蟃蟄蟅蟇蟈蟉蟌蟍蟎蟏蟐蟔蟕蟖蟗蟘蟙蟚蟜蟝蟞蟟蟡蟢蟣蟤蟦蟧蟨蟩蟫蟬蟭蟯蟰蟱蟲蟳蟴蟵蟶蟷蟸�蟺蟻蟼蟽蟿蠀蠁蠂蠄蠅蠆蠇蠈蠉蠋蠌蠍蠎蠏蠐蠑蠒蠔蠗蠘蠙蠚蠜蠝蠞蠟蠠蠣稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓�"
		.split("");
	for (a = 0; a != t[207].length; ++a)
		if (t[207][a].charCodeAt(0) !== 65533) {
			r[t[207][a]] = 52992 + a;
			e[52992 + a] = t[207][a]
		}
	t[208] =
		"����������������������������������������������������������������蠤蠥蠦蠧蠨蠩蠪蠫蠬蠭蠮蠯蠰蠱蠳蠴蠵蠶蠷蠸蠺蠻蠽蠾蠿衁衂衃衆衇衈衉衊衋衎衏衐衑衒術衕衖衘衚衛衜衝衞衟衠衦衧衪衭衯衱衳衴衵衶衸衹衺�衻衼袀袃袆袇袉袊袌袎袏袐袑袓袔袕袗袘袙袚袛袝袞袟袠袡袣袥袦袧袨袩袪小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄�"
		.split("");
	for (a = 0; a != t[208].length; ++a)
		if (t[208][a].charCodeAt(0) !== 65533) {
			r[t[208][a]] = 53248 + a;
			e[53248 + a] = t[208][a]
		}
	t[209] =
		"����������������������������������������������������������������袬袮袯袰袲袳袴袵袶袸袹袺袻袽袾袿裀裃裄裇裈裊裋裌裍裏裐裑裓裖裗裚裛補裝裞裠裡裦裧裩裪裫裬裭裮裯裲裵裶裷裺裻製裿褀褁褃褄褅褆複褈�褉褋褌褍褎褏褑褔褕褖褗褘褜褝褞褟褠褢褣褤褦褧褨褩褬褭褮褯褱褲褳褵褷选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶�"
		.split("");
	for (a = 0; a != t[209].length; ++a)
		if (t[209][a].charCodeAt(0) !== 65533) {
			r[t[209][a]] = 53504 + a;
			e[53504 + a] = t[209][a]
		}
	t[210] =
		"����������������������������������������������������������������褸褹褺褻褼褽褾褿襀襂襃襅襆襇襈襉襊襋襌襍襎襏襐襑襒襓襔襕襖襗襘襙襚襛襜襝襠襡襢襣襤襥襧襨襩襪襫襬襭襮襯襰襱襲襳襴襵襶襷襸襹襺襼�襽襾覀覂覄覅覇覈覉覊見覌覍覎規覐覑覒覓覔覕視覗覘覙覚覛覜覝覞覟覠覡摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐�"
		.split("");
	for (a = 0; a != t[210].length; ++a)
		if (t[210][a].charCodeAt(0) !== 65533) {
			r[t[210][a]] = 53760 + a;
			e[53760 + a] = t[210][a]
		}
	t[211] =
		"����������������������������������������������������������������覢覣覤覥覦覧覨覩親覫覬覭覮覯覰覱覲観覴覵覶覷覸覹覺覻覼覽覾覿觀觃觍觓觔觕觗觘觙觛觝觟觠觡觢觤觧觨觩觪觬觭觮觰觱觲觴觵觶觷觸觹觺�觻觼觽觾觿訁訂訃訄訅訆計訉訊訋訌訍討訏訐訑訒訓訔訕訖託記訙訚訛訜訝印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉�"
		.split("");
	for (a = 0; a != t[211].length; ++a)
		if (t[211][a].charCodeAt(0) !== 65533) {
			r[t[211][a]] = 54016 + a;
			e[54016 + a] = t[211][a]
		}
	t[212] =
		"����������������������������������������������������������������訞訟訠訡訢訣訤訥訦訧訨訩訪訫訬設訮訯訰許訲訳訴訵訶訷訸訹診註証訽訿詀詁詂詃詄詅詆詇詉詊詋詌詍詎詏詐詑詒詓詔評詖詗詘詙詚詛詜詝詞�詟詠詡詢詣詤詥試詧詨詩詪詫詬詭詮詯詰話該詳詴詵詶詷詸詺詻詼詽詾詿誀浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧�"
		.split("");
	for (a = 0; a != t[212].length; ++a)
		if (t[212][a].charCodeAt(0) !== 65533) {
			r[t[212][a]] = 54272 + a;
			e[54272 + a] = t[212][a]
		}
	t[213] =
		"����������������������������������������������������������������誁誂誃誄誅誆誇誈誋誌認誎誏誐誑誒誔誕誖誗誘誙誚誛誜誝語誟誠誡誢誣誤誥誦誧誨誩說誫説読誮誯誰誱課誳誴誵誶誷誸誹誺誻誼誽誾調諀諁諂�諃諄諅諆談諈諉諊請諌諍諎諏諐諑諒諓諔諕論諗諘諙諚諛諜諝諞諟諠諡諢諣铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政�"
		.split("");
	for (a = 0; a != t[213].length; ++a)
		if (t[213][a].charCodeAt(0) !== 65533) {
			r[t[213][a]] = 54528 + a;
			e[54528 + a] = t[213][a]
		}
	t[214] =
		"����������������������������������������������������������������諤諥諦諧諨諩諪諫諬諭諮諯諰諱諲諳諴諵諶諷諸諹諺諻諼諽諾諿謀謁謂謃謄謅謆謈謉謊謋謌謍謎謏謐謑謒謓謔謕謖謗謘謙謚講謜謝謞謟謠謡謢謣�謤謥謧謨謩謪謫謬謭謮謯謰謱謲謳謴謵謶謷謸謹謺謻謼謽謾謿譀譁譂譃譄譅帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑�"
		.split("");
	for (a = 0; a != t[214].length; ++a)
		if (t[214][a].charCodeAt(0) !== 65533) {
			r[t[214][a]] = 54784 + a;
			e[54784 + a] = t[214][a]
		}
	t[215] =
		"����������������������������������������������������������������譆譇譈證譊譋譌譍譎譏譐譑譒譓譔譕譖譗識譙譚譛譜譝譞譟譠譡譢譣譤譥譧譨譩譪譫譭譮譯議譱譲譳譴譵譶護譸譹譺譻譼譽譾譿讀讁讂讃讄讅讆�讇讈讉變讋讌讍讎讏讐讑讒讓讔讕讖讗讘讙讚讛讜讝讞讟讬讱讻诇诐诪谉谞住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座������"
		.split("");
	for (a = 0; a != t[215].length; ++a)
		if (t[215][a].charCodeAt(0) !== 65533) {
			r[t[215][a]] = 55040 + a;
			e[55040 + a] = t[215][a]
		}
	t[216] =
		"����������������������������������������������������������������谸谹谺谻谼谽谾谿豀豂豃豄豅豈豊豋豍豎豏豐豑豒豓豔豖豗豘豙豛豜豝豞豟豠豣豤豥豦豧豨豩豬豭豮豯豰豱豲豴豵豶豷豻豼豽豾豿貀貁貃貄貆貇�貈貋貍貎貏貐貑貒貓貕貖貗貙貚貛貜貝貞貟負財貢貣貤貥貦貧貨販貪貫責貭亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝�"
		.split("");
	for (a = 0; a != t[216].length; ++a)
		if (t[216][a].charCodeAt(0) !== 65533) {
			r[t[216][a]] = 55296 + a;
			e[55296 + a] = t[216][a]
		}
	t[217] =
		"����������������������������������������������������������������貮貯貰貱貲貳貴貵貶買貸貹貺費貼貽貾貿賀賁賂賃賄賅賆資賈賉賊賋賌賍賎賏賐賑賒賓賔賕賖賗賘賙賚賛賜賝賞賟賠賡賢賣賤賥賦賧賨賩質賫賬�賭賮賯賰賱賲賳賴賵賶賷賸賹賺賻購賽賾賿贀贁贂贃贄贅贆贇贈贉贊贋贌贍佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼�"
		.split("");
	for (a = 0; a != t[217].length; ++a)
		if (t[217][a].charCodeAt(0) !== 65533) {
			r[t[217][a]] = 55552 + a;
			e[55552 + a] = t[217][a]
		}
	t[218] =
		"����������������������������������������������������������������贎贏贐贑贒贓贔贕贖贗贘贙贚贛贜贠赑赒赗赟赥赨赩赪赬赮赯赱赲赸赹赺赻赼赽赾赿趀趂趃趆趇趈趉趌趍趎趏趐趒趓趕趖趗趘趙趚趛趜趝趞趠趡�趢趤趥趦趧趨趩趪趫趬趭趮趯趰趲趶趷趹趻趽跀跁跂跅跇跈跉跊跍跐跒跓跔凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺�"
		.split("");
	for (a = 0; a != t[218].length; ++a)
		if (t[218][a].charCodeAt(0) !== 65533) {
			r[t[218][a]] = 55808 + a;
			e[55808 + a] = t[218][a]
		}
	t[219] =
		"����������������������������������������������������������������跕跘跙跜跠跡跢跥跦跧跩跭跮跰跱跲跴跶跼跾跿踀踁踂踃踄踆踇踈踋踍踎踐踑踒踓踕踖踗踘踙踚踛踜踠踡踤踥踦踧踨踫踭踰踲踳踴踶踷踸踻踼踾�踿蹃蹅蹆蹌蹍蹎蹏蹐蹓蹔蹕蹖蹗蹘蹚蹛蹜蹝蹞蹟蹠蹡蹢蹣蹤蹥蹧蹨蹪蹫蹮蹱邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝�"
		.split("");
	for (a = 0; a != t[219].length; ++a)
		if (t[219][a].charCodeAt(0) !== 65533) {
			r[t[219][a]] = 56064 + a;
			e[56064 + a] = t[219][a]
		}
	t[220] =
		"����������������������������������������������������������������蹳蹵蹷蹸蹹蹺蹻蹽蹾躀躂躃躄躆躈躉躊躋躌躍躎躑躒躓躕躖躗躘躙躚躛躝躟躠躡躢躣躤躥躦躧躨躩躪躭躮躰躱躳躴躵躶躷躸躹躻躼躽躾躿軀軁軂�軃軄軅軆軇軈軉車軋軌軍軏軐軑軒軓軔軕軖軗軘軙軚軛軜軝軞軟軠軡転軣軤堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥�"
		.split("");
	for (a = 0; a != t[220].length; ++a)
		if (t[220][a].charCodeAt(0) !== 65533) {
			r[t[220][a]] = 56320 + a;
			e[56320 + a] = t[220][a]
		}
	t[221] =
		"����������������������������������������������������������������軥軦軧軨軩軪軫軬軭軮軯軰軱軲軳軴軵軶軷軸軹軺軻軼軽軾軿輀輁輂較輄輅輆輇輈載輊輋輌輍輎輏輐輑輒輓輔輕輖輗輘輙輚輛輜輝輞輟輠輡輢輣�輤輥輦輧輨輩輪輫輬輭輮輯輰輱輲輳輴輵輶輷輸輹輺輻輼輽輾輿轀轁轂轃轄荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺�"
		.split("");
	for (a = 0; a != t[221].length; ++a)
		if (t[221][a].charCodeAt(0) !== 65533) {
			r[t[221][a]] = 56576 + a;
			e[56576 + a] = t[221][a]
		}
	t[222] =
		"����������������������������������������������������������������轅轆轇轈轉轊轋轌轍轎轏轐轑轒轓轔轕轖轗轘轙轚轛轜轝轞轟轠轡轢轣轤轥轪辀辌辒辝辠辡辢辤辥辦辧辪辬辭辮辯農辳辴辵辷辸辺辻込辿迀迃迆�迉迊迋迌迍迏迒迖迗迚迠迡迣迧迬迯迱迲迴迵迶迺迻迼迾迿逇逈逌逎逓逕逘蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖�"
		.split("");
	for (a = 0; a != t[222].length; ++a)
		if (t[222][a].charCodeAt(0) !== 65533) {
			r[t[222][a]] = 56832 + a;
			e[56832 + a] = t[222][a]
		}
	t[223] =
		"����������������������������������������������������������������這逜連逤逥逧逨逩逪逫逬逰週進逳逴逷逹逺逽逿遀遃遅遆遈遉遊運遌過達違遖遙遚遜遝遞遟遠遡遤遦遧適遪遫遬遯遰遱遲遳遶遷選遹遺遻遼遾邁�還邅邆邇邉邊邌邍邎邏邐邒邔邖邘邚邜邞邟邠邤邥邧邨邩邫邭邲邷邼邽邿郀摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼�"
		.split("");
	for (a = 0; a != t[223].length; ++a)
		if (t[223][a].charCodeAt(0) !== 65533) {
			r[t[223][a]] = 57088 + a;
			e[57088 + a] = t[223][a]
		}
	t[224] =
		"����������������������������������������������������������������郂郃郆郈郉郋郌郍郒郔郕郖郘郙郚郞郟郠郣郤郥郩郪郬郮郰郱郲郳郵郶郷郹郺郻郼郿鄀鄁鄃鄅鄆鄇鄈鄉鄊鄋鄌鄍鄎鄏鄐鄑鄒鄓鄔鄕鄖鄗鄘鄚鄛鄜�鄝鄟鄠鄡鄤鄥鄦鄧鄨鄩鄪鄫鄬鄭鄮鄰鄲鄳鄴鄵鄶鄷鄸鄺鄻鄼鄽鄾鄿酀酁酂酄唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼�"
		.split("");
	for (a = 0; a != t[224].length; ++a)
		if (t[224][a].charCodeAt(0) !== 65533) {
			r[t[224][a]] = 57344 + a;
			e[57344 + a] = t[224][a]
		}
	t[225] =
		"����������������������������������������������������������������酅酇酈酑酓酔酕酖酘酙酛酜酟酠酦酧酨酫酭酳酺酻酼醀醁醂醃醄醆醈醊醎醏醓醔醕醖醗醘醙醜醝醞醟醠醡醤醥醦醧醨醩醫醬醰醱醲醳醶醷醸醹醻�醼醽醾醿釀釁釂釃釄釅釆釈釋釐釒釓釔釕釖釗釘釙釚釛針釞釟釠釡釢釣釤釥帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉後徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺�"
		.split("");
	for (a = 0; a != t[225].length; ++a)
		if (t[225][a].charCodeAt(0) !== 65533) {
			r[t[225][a]] = 57600 + a;
			e[57600 + a] = t[225][a]
		}
	t[226] =
		"����������������������������������������������������������������釦釧釨釩釪釫釬釭釮釯釰釱釲釳釴釵釶釷釸釹釺釻釼釽釾釿鈀鈁鈂鈃鈄鈅鈆鈇鈈鈉鈊鈋鈌鈍鈎鈏鈐鈑鈒鈓鈔鈕鈖鈗鈘鈙鈚鈛鈜鈝鈞鈟鈠鈡鈢鈣鈤�鈥鈦鈧鈨鈩鈪鈫鈬鈭鈮鈯鈰鈱鈲鈳鈴鈵鈶鈷鈸鈹鈺鈻鈼鈽鈾鈿鉀鉁鉂鉃鉄鉅狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧饨饩饪饫饬饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂�"
		.split("");
	for (a = 0; a != t[226].length; ++a)
		if (t[226][a].charCodeAt(0) !== 65533) {
			r[t[226][a]] = 57856 + a;
			e[57856 + a] = t[226][a]
		}
	t[227] =
		"����������������������������������������������������������������鉆鉇鉈鉉鉊鉋鉌鉍鉎鉏鉐鉑鉒鉓鉔鉕鉖鉗鉘鉙鉚鉛鉜鉝鉞鉟鉠鉡鉢鉣鉤鉥鉦鉧鉨鉩鉪鉫鉬鉭鉮鉯鉰鉱鉲鉳鉵鉶鉷鉸鉹鉺鉻鉼鉽鉾鉿銀銁銂銃銄銅�銆銇銈銉銊銋銌銍銏銐銑銒銓銔銕銖銗銘銙銚銛銜銝銞銟銠銡銢銣銤銥銦銧恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾�"
		.split("");
	for (a = 0; a != t[227].length; ++a)
		if (t[227][a].charCodeAt(0) !== 65533) {
			r[t[227][a]] = 58112 + a;
			e[58112 + a] = t[227][a]
		}
	t[228] =
		"����������������������������������������������������������������銨銩銪銫銬銭銯銰銱銲銳銴銵銶銷銸銹銺銻銼銽銾銿鋀鋁鋂鋃鋄鋅鋆鋇鋉鋊鋋鋌鋍鋎鋏鋐鋑鋒鋓鋔鋕鋖鋗鋘鋙鋚鋛鋜鋝鋞鋟鋠鋡鋢鋣鋤鋥鋦鋧鋨�鋩鋪鋫鋬鋭鋮鋯鋰鋱鋲鋳鋴鋵鋶鋷鋸鋹鋺鋻鋼鋽鋾鋿錀錁錂錃錄錅錆錇錈錉洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑�"
		.split("");
	for (a = 0; a != t[228].length; ++a)
		if (t[228][a].charCodeAt(0) !== 65533) {
			r[t[228][a]] = 58368 + a;
			e[58368 + a] = t[228][a]
		}
	t[229] =
		"����������������������������������������������������������������錊錋錌錍錎錏錐錑錒錓錔錕錖錗錘錙錚錛錜錝錞錟錠錡錢錣錤錥錦錧錨錩錪錫錬錭錮錯錰錱録錳錴錵錶錷錸錹錺錻錼錽錿鍀鍁鍂鍃鍄鍅鍆鍇鍈鍉�鍊鍋鍌鍍鍎鍏鍐鍑鍒鍓鍔鍕鍖鍗鍘鍙鍚鍛鍜鍝鍞鍟鍠鍡鍢鍣鍤鍥鍦鍧鍨鍩鍫濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣�"
		.split("");
	for (a = 0; a != t[229].length; ++a)
		if (t[229][a].charCodeAt(0) !== 65533) {
			r[t[229][a]] = 58624 + a;
			e[58624 + a] = t[229][a]
		}
	t[230] =
		"����������������������������������������������������������������鍬鍭鍮鍯鍰鍱鍲鍳鍴鍵鍶鍷鍸鍹鍺鍻鍼鍽鍾鍿鎀鎁鎂鎃鎄鎅鎆鎇鎈鎉鎊鎋鎌鎍鎎鎐鎑鎒鎓鎔鎕鎖鎗鎘鎙鎚鎛鎜鎝鎞鎟鎠鎡鎢鎣鎤鎥鎦鎧鎨鎩鎪鎫�鎬鎭鎮鎯鎰鎱鎲鎳鎴鎵鎶鎷鎸鎹鎺鎻鎼鎽鎾鎿鏀鏁鏂鏃鏄鏅鏆鏇鏈鏉鏋鏌鏍妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩�"
		.split("");
	for (a = 0; a != t[230].length; ++a)
		if (t[230][a].charCodeAt(0) !== 65533) {
			r[t[230][a]] = 58880 + a;
			e[58880 + a] = t[230][a]
		}
	t[231] =
		"����������������������������������������������������������������鏎鏏鏐鏑鏒鏓鏔鏕鏗鏘鏙鏚鏛鏜鏝鏞鏟鏠鏡鏢鏣鏤鏥鏦鏧鏨鏩鏪鏫鏬鏭鏮鏯鏰鏱鏲鏳鏴鏵鏶鏷鏸鏹鏺鏻鏼鏽鏾鏿鐀鐁鐂鐃鐄鐅鐆鐇鐈鐉鐊鐋鐌鐍�鐎鐏鐐鐑鐒鐓鐔鐕鐖鐗鐘鐙鐚鐛鐜鐝鐞鐟鐠鐡鐢鐣鐤鐥鐦鐧鐨鐩鐪鐫鐬鐭鐮纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡缢缣缤缥缦缧缪缫缬缭缯缰缱缲缳缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬�"
		.split("");
	for (a = 0; a != t[231].length; ++a)
		if (t[231][a].charCodeAt(0) !== 65533) {
			r[t[231][a]] = 59136 + a;
			e[59136 + a] = t[231][a]
		}
	t[232] =
		"����������������������������������������������������������������鐯鐰鐱鐲鐳鐴鐵鐶鐷鐸鐹鐺鐻鐼鐽鐿鑀鑁鑂鑃鑄鑅鑆鑇鑈鑉鑊鑋鑌鑍鑎鑏鑐鑑鑒鑓鑔鑕鑖鑗鑘鑙鑚鑛鑜鑝鑞鑟鑠鑡鑢鑣鑤鑥鑦鑧鑨鑩鑪鑬鑭鑮鑯�鑰鑱鑲鑳鑴鑵鑶鑷鑸鑹鑺鑻鑼鑽鑾鑿钀钁钂钃钄钑钖钘铇铏铓铔铚铦铻锜锠琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹�"
		.split("");
	for (a = 0; a != t[232].length; ++a)
		if (t[232][a].charCodeAt(0) !== 65533) {
			r[t[232][a]] = 59392 + a;
			e[59392 + a] = t[232][a]
		}
	t[233] =
		"����������������������������������������������������������������锧锳锽镃镈镋镕镚镠镮镴镵長镸镹镺镻镼镽镾門閁閂閃閄閅閆閇閈閉閊開閌閍閎閏閐閑閒間閔閕閖閗閘閙閚閛閜閝閞閟閠閡関閣閤閥閦閧閨閩閪�閫閬閭閮閯閰閱閲閳閴閵閶閷閸閹閺閻閼閽閾閿闀闁闂闃闄闅闆闇闈闉闊闋椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋�"
		.split("");
	for (a = 0; a != t[233].length; ++a)
		if (t[233][a].charCodeAt(0) !== 65533) {
			r[t[233][a]] = 59648 + a;
			e[59648 + a] = t[233][a]
		}
	t[234] =
		"����������������������������������������������������������������闌闍闎闏闐闑闒闓闔闕闖闗闘闙闚闛關闝闞闟闠闡闢闣闤闥闦闧闬闿阇阓阘阛阞阠阣阤阥阦阧阨阩阫阬阭阯阰阷阸阹阺阾陁陃陊陎陏陑陒陓陖陗�陘陙陚陜陝陞陠陣陥陦陫陭陮陯陰陱陳陸陹険陻陼陽陾陿隀隁隂隃隄隇隉隊辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰�"
		.split("");
	for (a = 0; a != t[234].length; ++a)
		if (t[234][a].charCodeAt(0) !== 65533) {
			r[t[234][a]] = 59904 + a;
			e[59904 + a] = t[234][a]
		}
	t[235] =
		"����������������������������������������������������������������隌階隑隒隓隕隖隚際隝隞隟隠隡隢隣隤隥隦隨隩險隫隬隭隮隯隱隲隴隵隷隸隺隻隿雂雃雈雊雋雐雑雓雔雖雗雘雙雚雛雜雝雞雟雡離難雤雥雦雧雫�雬雭雮雰雱雲雴雵雸雺電雼雽雿霂霃霅霊霋霌霐霑霒霔霕霗霘霙霚霛霝霟霠搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻�"
		.split("");
	for (a = 0; a != t[235].length; ++a)
		if (t[235][a].charCodeAt(0) !== 65533) {
			r[t[235][a]] = 60160 + a;
			e[60160 + a] = t[235][a]
		}
	t[236] =
		"����������������������������������������������������������������霡霢霣霤霥霦霧霨霩霫霬霮霯霱霳霴霵霶霷霺霻霼霽霿靀靁靂靃靄靅靆靇靈靉靊靋靌靍靎靏靐靑靔靕靗靘靚靜靝靟靣靤靦靧靨靪靫靬靭靮靯靰靱�靲靵靷靸靹靺靻靽靾靿鞀鞁鞂鞃鞄鞆鞇鞈鞉鞊鞌鞎鞏鞐鞓鞕鞖鞗鞙鞚鞛鞜鞝臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐�"
		.split("");
	for (a = 0; a != t[236].length; ++a)
		if (t[236][a].charCodeAt(0) !== 65533) {
			r[t[236][a]] = 60416 + a;
			e[60416 + a] = t[236][a]
		}
	t[237] =
		"����������������������������������������������������������������鞞鞟鞡鞢鞤鞥鞦鞧鞨鞩鞪鞬鞮鞰鞱鞳鞵鞶鞷鞸鞹鞺鞻鞼鞽鞾鞿韀韁韂韃韄韅韆韇韈韉韊韋韌韍韎韏韐韑韒韓韔韕韖韗韘韙韚韛韜韝韞韟韠韡韢韣�韤韥韨韮韯韰韱韲韴韷韸韹韺韻韼韽韾響頀頁頂頃頄項順頇須頉頊頋頌頍頎怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨�"
		.split("");
	for (a = 0; a != t[237].length; ++a)
		if (t[237][a].charCodeAt(0) !== 65533) {
			r[t[237][a]] = 60672 + a;
			e[60672 + a] = t[237][a]
		}
	t[238] =
		"����������������������������������������������������������������頏預頑頒頓頔頕頖頗領頙頚頛頜頝頞頟頠頡頢頣頤頥頦頧頨頩頪頫頬頭頮頯頰頱頲頳頴頵頶頷頸頹頺頻頼頽頾頿顀顁顂顃顄顅顆顇顈顉顊顋題額�顎顏顐顑顒顓顔顕顖顗願顙顚顛顜顝類顟顠顡顢顣顤顥顦顧顨顩顪顫顬顭顮睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶钷钸钹钺钼钽钿铄铈铉铊铋铌铍铎铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪�"
		.split("");
	for (a = 0; a != t[238].length; ++a)
		if (t[238][a].charCodeAt(0) !== 65533) {
			r[t[238][a]] = 60928 + a;
			e[60928 + a] = t[238][a]
		}
	t[239] =
		"����������������������������������������������������������������顯顰顱顲顳顴颋颎颒颕颙颣風颩颪颫颬颭颮颯颰颱颲颳颴颵颶颷颸颹颺颻颼颽颾颿飀飁飂飃飄飅飆飇飈飉飊飋飌飍飏飐飔飖飗飛飜飝飠飡飢飣飤�飥飦飩飪飫飬飭飮飯飰飱飲飳飴飵飶飷飸飹飺飻飼飽飾飿餀餁餂餃餄餅餆餇铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒锓锔锕锖锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤镥镦镧镨镩镪镫镬镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔�"
		.split("");
	for (a = 0; a != t[239].length; ++a)
		if (t[239][a].charCodeAt(0) !== 65533) {
			r[t[239][a]] = 61184 + a;
			e[61184 + a] = t[239][a]
		}
	t[240] =
		"����������������������������������������������������������������餈餉養餋餌餎餏餑餒餓餔餕餖餗餘餙餚餛餜餝餞餟餠餡餢餣餤餥餦餧館餩餪餫餬餭餯餰餱餲餳餴餵餶餷餸餹餺餻餼餽餾餿饀饁饂饃饄饅饆饇饈饉�饊饋饌饍饎饏饐饑饒饓饖饗饘饙饚饛饜饝饞饟饠饡饢饤饦饳饸饹饻饾馂馃馉稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨鸩鸪鸫鸬鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦鹧鹨鹩鹪鹫鹬鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙�"
		.split("");
	for (a = 0; a != t[240].length; ++a)
		if (t[240][a].charCodeAt(0) !== 65533) {
			r[t[240][a]] = 61440 + a;
			e[61440 + a] = t[240][a]
		}
	t[241] =
		"����������������������������������������������������������������馌馎馚馛馜馝馞馟馠馡馢馣馤馦馧馩馪馫馬馭馮馯馰馱馲馳馴馵馶馷馸馹馺馻馼馽馾馿駀駁駂駃駄駅駆駇駈駉駊駋駌駍駎駏駐駑駒駓駔駕駖駗駘�駙駚駛駜駝駞駟駠駡駢駣駤駥駦駧駨駩駪駫駬駭駮駯駰駱駲駳駴駵駶駷駸駹瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃�"
		.split("");
	for (a = 0; a != t[241].length; ++a)
		if (t[241][a].charCodeAt(0) !== 65533) {
			r[t[241][a]] = 61696 + a;
			e[61696 + a] = t[241][a]
		}
	t[242] =
		"����������������������������������������������������������������駺駻駼駽駾駿騀騁騂騃騄騅騆騇騈騉騊騋騌騍騎騏騐騑騒験騔騕騖騗騘騙騚騛騜騝騞騟騠騡騢騣騤騥騦騧騨騩騪騫騬騭騮騯騰騱騲騳騴騵騶騷騸�騹騺騻騼騽騾騿驀驁驂驃驄驅驆驇驈驉驊驋驌驍驎驏驐驑驒驓驔驕驖驗驘驙颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒�"
		.split("");
	for (a = 0; a != t[242].length; ++a)
		if (t[242][a].charCodeAt(0) !== 65533) {
			r[t[242][a]] = 61952 + a;
			e[61952 + a] = t[242][a]
		}
	t[243] =
		"����������������������������������������������������������������驚驛驜驝驞驟驠驡驢驣驤驥驦驧驨驩驪驫驲骃骉骍骎骔骕骙骦骩骪骫骬骭骮骯骲骳骴骵骹骻骽骾骿髃髄髆髇髈髉髊髍髎髏髐髒體髕髖髗髙髚髛髜�髝髞髠髢髣髤髥髧髨髩髪髬髮髰髱髲髳髴髵髶髷髸髺髼髽髾髿鬀鬁鬂鬄鬅鬆蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋�"
		.split("");
	for (a = 0; a != t[243].length; ++a)
		if (t[243][a].charCodeAt(0) !== 65533) {
			r[t[243][a]] = 62208 + a;
			e[62208 + a] = t[243][a]
		}
	t[244] =
		"����������������������������������������������������������������鬇鬉鬊鬋鬌鬍鬎鬐鬑鬒鬔鬕鬖鬗鬘鬙鬚鬛鬜鬝鬞鬠鬡鬢鬤鬥鬦鬧鬨鬩鬪鬫鬬鬭鬮鬰鬱鬳鬴鬵鬶鬷鬸鬹鬺鬽鬾鬿魀魆魊魋魌魎魐魒魓魕魖魗魘魙魚�魛魜魝魞魟魠魡魢魣魤魥魦魧魨魩魪魫魬魭魮魯魰魱魲魳魴魵魶魷魸魹魺魻簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤�"
		.split("");
	for (a = 0; a != t[244].length; ++a)
		if (t[244][a].charCodeAt(0) !== 65533) {
			r[t[244][a]] = 62464 + a;
			e[62464 + a] = t[244][a]
		}
	t[245] =
		"����������������������������������������������������������������魼魽魾魿鮀鮁鮂鮃鮄鮅鮆鮇鮈鮉鮊鮋鮌鮍鮎鮏鮐鮑鮒鮓鮔鮕鮖鮗鮘鮙鮚鮛鮜鮝鮞鮟鮠鮡鮢鮣鮤鮥鮦鮧鮨鮩鮪鮫鮬鮭鮮鮯鮰鮱鮲鮳鮴鮵鮶鮷鮸鮹鮺�鮻鮼鮽鮾鮿鯀鯁鯂鯃鯄鯅鯆鯇鯈鯉鯊鯋鯌鯍鯎鯏鯐鯑鯒鯓鯔鯕鯖鯗鯘鯙鯚鯛酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜�"
		.split("");
	for (a = 0; a != t[245].length; ++a)
		if (t[245][a].charCodeAt(0) !== 65533) {
			r[t[245][a]] = 62720 + a;
			e[62720 + a] = t[245][a]
		}
	t[246] =
		"����������������������������������������������������������������鯜鯝鯞鯟鯠鯡鯢鯣鯤鯥鯦鯧鯨鯩鯪鯫鯬鯭鯮鯯鯰鯱鯲鯳鯴鯵鯶鯷鯸鯹鯺鯻鯼鯽鯾鯿鰀鰁鰂鰃鰄鰅鰆鰇鰈鰉鰊鰋鰌鰍鰎鰏鰐鰑鰒鰓鰔鰕鰖鰗鰘鰙鰚�鰛鰜鰝鰞鰟鰠鰡鰢鰣鰤鰥鰦鰧鰨鰩鰪鰫鰬鰭鰮鰯鰰鰱鰲鰳鰴鰵鰶鰷鰸鰹鰺鰻觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅龆龇龈龉龊龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞鲟鲠鲡鲢鲣鲥鲦鲧鲨鲩鲫鲭鲮鲰鲱鲲鲳鲴鲵鲶鲷鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋�"
		.split("");
	for (a = 0; a != t[246].length; ++a)
		if (t[246][a].charCodeAt(0) !== 65533) {
			r[t[246][a]] = 62976 + a;
			e[62976 + a] = t[246][a]
		}
	t[247] =
		"����������������������������������������������������������������鰼鰽鰾鰿鱀鱁鱂鱃鱄鱅鱆鱇鱈鱉鱊鱋鱌鱍鱎鱏鱐鱑鱒鱓鱔鱕鱖鱗鱘鱙鱚鱛鱜鱝鱞鱟鱠鱡鱢鱣鱤鱥鱦鱧鱨鱩鱪鱫鱬鱭鱮鱯鱰鱱鱲鱳鱴鱵鱶鱷鱸鱹鱺�鱻鱽鱾鲀鲃鲄鲉鲊鲌鲏鲓鲖鲗鲘鲙鲝鲪鲬鲯鲹鲾鲿鳀鳁鳂鳈鳉鳑鳒鳚鳛鳠鳡鳌鳍鳎鳏鳐鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄�"
		.split("");
	for (a = 0; a != t[247].length; ++a)
		if (t[247][a].charCodeAt(0) !== 65533) {
			r[t[247][a]] = 63232 + a;
			e[63232 + a] = t[247][a]
		}
	t[248] =
		"����������������������������������������������������������������鳣鳤鳥鳦鳧鳨鳩鳪鳫鳬鳭鳮鳯鳰鳱鳲鳳鳴鳵鳶鳷鳸鳹鳺鳻鳼鳽鳾鳿鴀鴁鴂鴃鴄鴅鴆鴇鴈鴉鴊鴋鴌鴍鴎鴏鴐鴑鴒鴓鴔鴕鴖鴗鴘鴙鴚鴛鴜鴝鴞鴟鴠鴡�鴢鴣鴤鴥鴦鴧鴨鴩鴪鴫鴬鴭鴮鴯鴰鴱鴲鴳鴴鴵鴶鴷鴸鴹鴺鴻鴼鴽鴾鴿鵀鵁鵂�����������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[248].length; ++a)
		if (t[248][a].charCodeAt(0) !== 65533) {
			r[t[248][a]] = 63488 + a;
			e[63488 + a] = t[248][a]
		}
	t[249] =
		"����������������������������������������������������������������鵃鵄鵅鵆鵇鵈鵉鵊鵋鵌鵍鵎鵏鵐鵑鵒鵓鵔鵕鵖鵗鵘鵙鵚鵛鵜鵝鵞鵟鵠鵡鵢鵣鵤鵥鵦鵧鵨鵩鵪鵫鵬鵭鵮鵯鵰鵱鵲鵳鵴鵵鵶鵷鵸鵹鵺鵻鵼鵽鵾鵿鶀鶁�鶂鶃鶄鶅鶆鶇鶈鶉鶊鶋鶌鶍鶎鶏鶐鶑鶒鶓鶔鶕鶖鶗鶘鶙鶚鶛鶜鶝鶞鶟鶠鶡鶢�����������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[249].length; ++a)
		if (t[249][a].charCodeAt(0) !== 65533) {
			r[t[249][a]] = 63744 + a;
			e[63744 + a] = t[249][a]
		}
	t[250] =
		"����������������������������������������������������������������鶣鶤鶥鶦鶧鶨鶩鶪鶫鶬鶭鶮鶯鶰鶱鶲鶳鶴鶵鶶鶷鶸鶹鶺鶻鶼鶽鶾鶿鷀鷁鷂鷃鷄鷅鷆鷇鷈鷉鷊鷋鷌鷍鷎鷏鷐鷑鷒鷓鷔鷕鷖鷗鷘鷙鷚鷛鷜鷝鷞鷟鷠鷡�鷢鷣鷤鷥鷦鷧鷨鷩鷪鷫鷬鷭鷮鷯鷰鷱鷲鷳鷴鷵鷶鷷鷸鷹鷺鷻鷼鷽鷾鷿鸀鸁鸂�����������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[250].length; ++a)
		if (t[250][a].charCodeAt(0) !== 65533) {
			r[t[250][a]] = 64e3 + a;
			e[64e3 + a] = t[250][a]
		}
	t[251] =
		"����������������������������������������������������������������鸃鸄鸅鸆鸇鸈鸉鸊鸋鸌鸍鸎鸏鸐鸑鸒鸓鸔鸕鸖鸗鸘鸙鸚鸛鸜鸝鸞鸤鸧鸮鸰鸴鸻鸼鹀鹍鹐鹒鹓鹔鹖鹙鹝鹟鹠鹡鹢鹥鹮鹯鹲鹴鹵鹶鹷鹸鹹鹺鹻鹼鹽麀�麁麃麄麅麆麉麊麌麍麎麏麐麑麔麕麖麗麘麙麚麛麜麞麠麡麢麣麤麥麧麨麩麪�����������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[251].length; ++a)
		if (t[251][a].charCodeAt(0) !== 65533) {
			r[t[251][a]] = 64256 + a;
			e[64256 + a] = t[251][a]
		}
	t[252] =
		"����������������������������������������������������������������麫麬麭麮麯麰麱麲麳麵麶麷麹麺麼麿黀黁黂黃黅黆黇黈黊黋黌黐黒黓黕黖黗黙黚點黡黣黤黦黨黫黬黭黮黰黱黲黳黴黵黶黷黸黺黽黿鼀鼁鼂鼃鼄鼅�鼆鼇鼈鼉鼊鼌鼏鼑鼒鼔鼕鼖鼘鼚鼛鼜鼝鼞鼟鼡鼣鼤鼥鼦鼧鼨鼩鼪鼫鼭鼮鼰鼱�����������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[252].length; ++a)
		if (t[252][a].charCodeAt(0) !== 65533) {
			r[t[252][a]] = 64512 + a;
			e[64512 + a] = t[252][a]
		}
	t[253] =
		"����������������������������������������������������������������鼲鼳鼴鼵鼶鼸鼺鼼鼿齀齁齂齃齅齆齇齈齉齊齋齌齍齎齏齒齓齔齕齖齗齘齙齚齛齜齝齞齟齠齡齢齣齤齥齦齧齨齩齪齫齬齭齮齯齰齱齲齳齴齵齶齷齸�齹齺齻齼齽齾龁龂龍龎龏龐龑龒龓龔龕龖龗龘龜龝龞龡龢龣龤龥郎凉秊裏隣�����������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[253].length; ++a)
		if (t[253][a].charCodeAt(0) !== 65533) {
			r[t[253][a]] = 64768 + a;
			e[64768 + a] = t[253][a]
		}
	t[254] =
		"����������������������������������������������������������������兀嗀﨎﨏﨑﨓﨔礼﨟蘒﨡﨣﨤﨧﨨﨩��������������������������������������������������������������������������������������������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[254].length; ++a)
		if (t[254][a].charCodeAt(0) !== 65533) {
			r[t[254][a]] = 65024 + a;
			e[65024 + a] = t[254][a]
		}
	return {
		enc: r,
		dec: e
	}
}();
cptable[949] = function() {
	var e = [],
		r = {},
		t = [],
		a;
	t[0] =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~��������������������������������������������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[0].length; ++a)
		if (t[0][a].charCodeAt(0) !== 65533) {
			r[t[0][a]] = 0 + a;
			e[0 + a] = t[0][a]
		}
	t[129] =
		"�����������������������������������������������������������������갂갃갅갆갋갌갍갎갏갘갞갟갡갢갣갥갦갧갨갩갪갫갮갲갳갴������갵갶갷갺갻갽갾갿걁걂걃걄걅걆걇걈걉걊걌걎걏걐걑걒걓걕������걖걗걙걚걛걝걞걟걠걡걢걣걤걥걦걧걨걩걪걫걬걭걮걯걲걳걵걶걹걻걼걽걾걿겂겇겈겍겎겏겑겒겓겕겖겗겘겙겚겛겞겢겣겤겥겦겧겫겭겮겱겲겳겴겵겶겷겺겾겿곀곂곃곅곆곇곉곊곋곍곎곏곐곑곒곓곔곖곘곙곚곛곜곝곞곟곢곣곥곦곩곫곭곮곲곴곷곸곹곺곻곾곿괁괂괃괅괇괈괉괊괋괎괐괒괓�"
		.split("");
	for (a = 0; a != t[129].length; ++a)
		if (t[129][a].charCodeAt(0) !== 65533) {
			r[t[129][a]] = 33024 + a;
			e[33024 + a] = t[129][a]
		}
	t[130] =
		"�����������������������������������������������������������������괔괕괖괗괙괚괛괝괞괟괡괢괣괤괥괦괧괨괪괫괮괯괰괱괲괳������괶괷괹괺괻괽괾괿굀굁굂굃굆굈굊굋굌굍굎굏굑굒굓굕굖굗������굙굚굛굜굝굞굟굠굢굤굥굦굧굨굩굪굫굮굯굱굲굷굸굹굺굾궀궃궄궅궆궇궊궋궍궎궏궑궒궓궔궕궖궗궘궙궚궛궞궟궠궡궢궣궥궦궧궨궩궪궫궬궭궮궯궰궱궲궳궴궵궶궸궹궺궻궼궽궾궿귂귃귅귆귇귉귊귋귌귍귎귏귒귔귕귖귗귘귙귚귛귝귞귟귡귢귣귥귦귧귨귩귪귫귬귭귮귯귰귱귲귳귴귵귶귷�"
		.split("");
	for (a = 0; a != t[130].length; ++a)
		if (t[130][a].charCodeAt(0) !== 65533) {
			r[t[130][a]] = 33280 + a;
			e[33280 + a] = t[130][a]
		}
	t[131] =
		"�����������������������������������������������������������������귺귻귽귾긂긃긄긅긆긇긊긌긎긏긐긑긒긓긕긖긗긘긙긚긛긜������긝긞긟긠긡긢긣긤긥긦긧긨긩긪긫긬긭긮긯긲긳긵긶긹긻긼������긽긾긿깂깄깇깈깉깋깏깑깒깓깕깗깘깙깚깛깞깢깣깤깦깧깪깫깭깮깯깱깲깳깴깵깶깷깺깾깿꺀꺁꺂꺃꺆꺇꺈꺉꺊꺋꺍꺎꺏꺐꺑꺒꺓꺔꺕꺖꺗꺘꺙꺚꺛꺜꺝꺞꺟꺠꺡꺢꺣꺤꺥꺦꺧꺨꺩꺪꺫꺬꺭꺮꺯꺰꺱꺲꺳꺴꺵꺶꺷꺸꺹꺺꺻꺿껁껂껃껅껆껇껈껉껊껋껎껒껓껔껕껖껗껚껛껝껞껟껠껡껢껣껤껥�"
		.split("");
	for (a = 0; a != t[131].length; ++a)
		if (t[131][a].charCodeAt(0) !== 65533) {
			r[t[131][a]] = 33536 + a;
			e[33536 + a] = t[131][a]
		}
	t[132] =
		"�����������������������������������������������������������������껦껧껩껪껬껮껯껰껱껲껳껵껶껷껹껺껻껽껾껿꼀꼁꼂꼃꼄꼅������꼆꼉꼊꼋꼌꼎꼏꼑꼒꼓꼔꼕꼖꼗꼘꼙꼚꼛꼜꼝꼞꼟꼠꼡꼢꼣������꼤꼥꼦꼧꼨꼩꼪꼫꼮꼯꼱꼳꼵꼶꼷꼸꼹꼺꼻꼾꽀꽄꽅꽆꽇꽊꽋꽌꽍꽎꽏꽑꽒꽓꽔꽕꽖꽗꽘꽙꽚꽛꽞꽟꽠꽡꽢꽣꽦꽧꽨꽩꽪꽫꽬꽭꽮꽯꽰꽱꽲꽳꽴꽵꽶꽷꽸꽺꽻꽼꽽꽾꽿꾁꾂꾃꾅꾆꾇꾉꾊꾋꾌꾍꾎꾏꾒꾓꾔꾖꾗꾘꾙꾚꾛꾝꾞꾟꾠꾡꾢꾣꾤꾥꾦꾧꾨꾩꾪꾫꾬꾭꾮꾯꾰꾱꾲꾳꾴꾵꾶꾷꾺꾻꾽꾾�"
		.split("");
	for (a = 0; a != t[132].length; ++a)
		if (t[132][a].charCodeAt(0) !== 65533) {
			r[t[132][a]] = 33792 + a;
			e[33792 + a] = t[132][a]
		}
	t[133] =
		"�����������������������������������������������������������������꾿꿁꿂꿃꿄꿅꿆꿊꿌꿏꿐꿑꿒꿓꿕꿖꿗꿘꿙꿚꿛꿝꿞꿟꿠꿡������꿢꿣꿤꿥꿦꿧꿪꿫꿬꿭꿮꿯꿲꿳꿵꿶꿷꿹꿺꿻꿼꿽꿾꿿뀂뀃������뀅뀆뀇뀈뀉뀊뀋뀍뀎뀏뀑뀒뀓뀕뀖뀗뀘뀙뀚뀛뀞뀟뀠뀡뀢뀣뀤뀥뀦뀧뀩뀪뀫뀬뀭뀮뀯뀰뀱뀲뀳뀴뀵뀶뀷뀸뀹뀺뀻뀼뀽뀾뀿끀끁끂끃끆끇끉끋끍끏끐끑끒끖끘끚끛끜끞끟끠끡끢끣끤끥끦끧끨끩끪끫끬끭끮끯끰끱끲끳끴끵끶끷끸끹끺끻끾끿낁낂낃낅낆낇낈낉낊낋낎낐낒낓낔낕낖낗낛낝낞낣낤�"
		.split("");
	for (a = 0; a != t[133].length; ++a)
		if (t[133][a].charCodeAt(0) !== 65533) {
			r[t[133][a]] = 34048 + a;
			e[34048 + a] = t[133][a]
		}
	t[134] =
		"�����������������������������������������������������������������낥낦낧낪낰낲낶낷낹낺낻낽낾낿냀냁냂냃냆냊냋냌냍냎냏냒������냓냕냖냗냙냚냛냜냝냞냟냡냢냣냤냦냧냨냩냪냫냬냭냮냯냰������냱냲냳냴냵냶냷냸냹냺냻냼냽냾냿넀넁넂넃넄넅넆넇넊넍넎넏넑넔넕넖넗넚넞넟넠넡넢넦넧넩넪넫넭넮넯넰넱넲넳넶넺넻넼넽넾넿녂녃녅녆녇녉녊녋녌녍녎녏녒녓녖녗녙녚녛녝녞녟녡녢녣녤녥녦녧녨녩녪녫녬녭녮녯녰녱녲녳녴녵녶녷녺녻녽녾녿놁놃놄놅놆놇놊놌놎놏놐놑놕놖놗놙놚놛놝�"
		.split("");
	for (a = 0; a != t[134].length; ++a)
		if (t[134][a].charCodeAt(0) !== 65533) {
			r[t[134][a]] = 34304 + a;
			e[34304 + a] = t[134][a]
		}
	t[135] =
		"�����������������������������������������������������������������놞놟놠놡놢놣놤놥놦놧놩놪놫놬놭놮놯놰놱놲놳놴놵놶놷놸������놹놺놻놼놽놾놿뇀뇁뇂뇃뇄뇅뇆뇇뇈뇉뇊뇋뇍뇎뇏뇑뇒뇓뇕������뇖뇗뇘뇙뇚뇛뇞뇠뇡뇢뇣뇤뇥뇦뇧뇪뇫뇭뇮뇯뇱뇲뇳뇴뇵뇶뇷뇸뇺뇼뇾뇿눀눁눂눃눆눇눉눊눍눎눏눐눑눒눓눖눘눚눛눜눝눞눟눡눢눣눤눥눦눧눨눩눪눫눬눭눮눯눰눱눲눳눵눶눷눸눹눺눻눽눾눿뉀뉁뉂뉃뉄뉅뉆뉇뉈뉉뉊뉋뉌뉍뉎뉏뉐뉑뉒뉓뉔뉕뉖뉗뉙뉚뉛뉝뉞뉟뉡뉢뉣뉤뉥뉦뉧뉪뉫뉬뉭뉮�"
		.split("");
	for (a = 0; a != t[135].length; ++a)
		if (t[135][a].charCodeAt(0) !== 65533) {
			r[t[135][a]] = 34560 + a;
			e[34560 + a] = t[135][a]
		}
	t[136] =
		"�����������������������������������������������������������������뉯뉰뉱뉲뉳뉶뉷뉸뉹뉺뉻뉽뉾뉿늀늁늂늃늆늇늈늊늋늌늍늎������늏늒늓늕늖늗늛늜늝늞늟늢늤늧늨늩늫늭늮늯늱늲늳늵늶늷������늸늹늺늻늼늽늾늿닀닁닂닃닄닅닆닇닊닋닍닎닏닑닓닔닕닖닗닚닜닞닟닠닡닣닧닩닪닰닱닲닶닼닽닾댂댃댅댆댇댉댊댋댌댍댎댏댒댖댗댘댙댚댛댝댞댟댠댡댢댣댤댥댦댧댨댩댪댫댬댭댮댯댰댱댲댳댴댵댶댷댸댹댺댻댼댽댾댿덀덁덂덃덄덅덆덇덈덉덊덋덌덍덎덏덐덑덒덓덗덙덚덝덠덡덢덣�"
		.split("");
	for (a = 0; a != t[136].length; ++a)
		if (t[136][a].charCodeAt(0) !== 65533) {
			r[t[136][a]] = 34816 + a;
			e[34816 + a] = t[136][a]
		}
	t[137] =
		"�����������������������������������������������������������������덦덨덪덬덭덯덲덳덵덶덷덹덺덻덼덽덾덿뎂뎆뎇뎈뎉뎊뎋뎍������뎎뎏뎑뎒뎓뎕뎖뎗뎘뎙뎚뎛뎜뎝뎞뎟뎢뎣뎤뎥뎦뎧뎩뎪뎫뎭������뎮뎯뎰뎱뎲뎳뎴뎵뎶뎷뎸뎹뎺뎻뎼뎽뎾뎿돀돁돂돃돆돇돉돊돍돏돑돒돓돖돘돚돜돞돟돡돢돣돥돦돧돩돪돫돬돭돮돯돰돱돲돳돴돵돶돷돸돹돺돻돽돾돿됀됁됂됃됄됅됆됇됈됉됊됋됌됍됎됏됑됒됓됔됕됖됗됙됚됛됝됞됟됡됢됣됤됥됦됧됪됬됭됮됯됰됱됲됳됵됶됷됸됹됺됻됼됽됾됿둀둁둂둃둄�"
		.split("");
	for (a = 0; a != t[137].length; ++a)
		if (t[137][a].charCodeAt(0) !== 65533) {
			r[t[137][a]] = 35072 + a;
			e[35072 + a] = t[137][a]
		}
	t[138] =
		"�����������������������������������������������������������������둅둆둇둈둉둊둋둌둍둎둏둒둓둕둖둗둙둚둛둜둝둞둟둢둤둦������둧둨둩둪둫둭둮둯둰둱둲둳둴둵둶둷둸둹둺둻둼둽둾둿뒁뒂������뒃뒄뒅뒆뒇뒉뒊뒋뒌뒍뒎뒏뒐뒑뒒뒓뒔뒕뒖뒗뒘뒙뒚뒛뒜뒞뒟뒠뒡뒢뒣뒥뒦뒧뒩뒪뒫뒭뒮뒯뒰뒱뒲뒳뒴뒶뒸뒺뒻뒼뒽뒾뒿듁듂듃듅듆듇듉듊듋듌듍듎듏듑듒듓듔듖듗듘듙듚듛듞듟듡듢듥듧듨듩듪듫듮듰듲듳듴듵듶듷듹듺듻듼듽듾듿딀딁딂딃딄딅딆딇딈딉딊딋딌딍딎딏딐딑딒딓딖딗딙딚딝�"
		.split("");
	for (a = 0; a != t[138].length; ++a)
		if (t[138][a].charCodeAt(0) !== 65533) {
			r[t[138][a]] = 35328 + a;
			e[35328 + a] = t[138][a]
		}
	t[139] =
		"�����������������������������������������������������������������딞딟딠딡딢딣딦딫딬딭딮딯딲딳딵딶딷딹딺딻딼딽딾딿땂땆������땇땈땉땊땎땏땑땒땓땕땖땗땘땙땚땛땞땢땣땤땥땦땧땨땩땪������땫땬땭땮땯땰땱땲땳땴땵땶땷땸땹땺땻땼땽땾땿떀떁떂떃떄떅떆떇떈떉떊떋떌떍떎떏떐떑떒떓떔떕떖떗떘떙떚떛떜떝떞떟떢떣떥떦떧떩떬떭떮떯떲떶떷떸떹떺떾떿뗁뗂뗃뗅뗆뗇뗈뗉뗊뗋뗎뗒뗓뗔뗕뗖뗗뗙뗚뗛뗜뗝뗞뗟뗠뗡뗢뗣뗤뗥뗦뗧뗨뗩뗪뗫뗭뗮뗯뗰뗱뗲뗳뗴뗵뗶뗷뗸뗹뗺뗻뗼뗽뗾뗿�"
		.split("");
	for (a = 0; a != t[139].length; ++a)
		if (t[139][a].charCodeAt(0) !== 65533) {
			r[t[139][a]] = 35584 + a;
			e[35584 + a] = t[139][a]
		}
	t[140] =
		"�����������������������������������������������������������������똀똁똂똃똄똅똆똇똈똉똊똋똌똍똎똏똒똓똕똖똗똙똚똛똜똝������똞똟똠똡똢똣똤똦똧똨똩똪똫똭똮똯똰똱똲똳똵똶똷똸똹똺������똻똼똽똾똿뙀뙁뙂뙃뙄뙅뙆뙇뙉뙊뙋뙌뙍뙎뙏뙐뙑뙒뙓뙔뙕뙖뙗뙘뙙뙚뙛뙜뙝뙞뙟뙠뙡뙢뙣뙥뙦뙧뙩뙪뙫뙬뙭뙮뙯뙰뙱뙲뙳뙴뙵뙶뙷뙸뙹뙺뙻뙼뙽뙾뙿뚀뚁뚂뚃뚄뚅뚆뚇뚈뚉뚊뚋뚌뚍뚎뚏뚐뚑뚒뚓뚔뚕뚖뚗뚘뚙뚚뚛뚞뚟뚡뚢뚣뚥뚦뚧뚨뚩뚪뚭뚮뚯뚰뚲뚳뚴뚵뚶뚷뚸뚹뚺뚻뚼뚽뚾뚿뛀뛁뛂�"
		.split("");
	for (a = 0; a != t[140].length; ++a)
		if (t[140][a].charCodeAt(0) !== 65533) {
			r[t[140][a]] = 35840 + a;
			e[35840 + a] = t[140][a]
		}
	t[141] =
		"�����������������������������������������������������������������뛃뛄뛅뛆뛇뛈뛉뛊뛋뛌뛍뛎뛏뛐뛑뛒뛓뛕뛖뛗뛘뛙뛚뛛뛜뛝������뛞뛟뛠뛡뛢뛣뛤뛥뛦뛧뛨뛩뛪뛫뛬뛭뛮뛯뛱뛲뛳뛵뛶뛷뛹뛺������뛻뛼뛽뛾뛿뜂뜃뜄뜆뜇뜈뜉뜊뜋뜌뜍뜎뜏뜐뜑뜒뜓뜔뜕뜖뜗뜘뜙뜚뜛뜜뜝뜞뜟뜠뜡뜢뜣뜤뜥뜦뜧뜪뜫뜭뜮뜱뜲뜳뜴뜵뜶뜷뜺뜼뜽뜾뜿띀띁띂띃띅띆띇띉띊띋띍띎띏띐띑띒띓띖띗띘띙띚띛띜띝띞띟띡띢띣띥띦띧띩띪띫띬띭띮띯띲띴띶띷띸띹띺띻띾띿랁랂랃랅랆랇랈랉랊랋랎랓랔랕랚랛랝랞�"
		.split("");
	for (a = 0; a != t[141].length; ++a)
		if (t[141][a].charCodeAt(0) !== 65533) {
			r[t[141][a]] = 36096 + a;
			e[36096 + a] = t[141][a]
		}
	t[142] =
		"�����������������������������������������������������������������랟랡랢랣랤랥랦랧랪랮랯랰랱랲랳랶랷랹랺랻랼랽랾랿럀럁������럂럃럄럅럆럈럊럋럌럍럎럏럐럑럒럓럔럕럖럗럘럙럚럛럜럝������럞럟럠럡럢럣럤럥럦럧럨럩럪럫럮럯럱럲럳럵럶럷럸럹럺럻럾렂렃렄렅렆렊렋렍렎렏렑렒렓렔렕렖렗렚렜렞렟렠렡렢렣렦렧렩렪렫렭렮렯렰렱렲렳렶렺렻렼렽렾렿롁롂롃롅롆롇롈롉롊롋롌롍롎롏롐롒롔롕롖롗롘롙롚롛롞롟롡롢롣롥롦롧롨롩롪롫롮롰롲롳롴롵롶롷롹롺롻롽롾롿뢀뢁뢂뢃뢄�"
		.split("");
	for (a = 0; a != t[142].length; ++a)
		if (t[142][a].charCodeAt(0) !== 65533) {
			r[t[142][a]] = 36352 + a;
			e[36352 + a] = t[142][a]
		}
	t[143] =
		"�����������������������������������������������������������������뢅뢆뢇뢈뢉뢊뢋뢌뢎뢏뢐뢑뢒뢓뢔뢕뢖뢗뢘뢙뢚뢛뢜뢝뢞뢟������뢠뢡뢢뢣뢤뢥뢦뢧뢩뢪뢫뢬뢭뢮뢯뢱뢲뢳뢵뢶뢷뢹뢺뢻뢼뢽������뢾뢿룂룄룆룇룈룉룊룋룍룎룏룑룒룓룕룖룗룘룙룚룛룜룞룠룢룣룤룥룦룧룪룫룭룮룯룱룲룳룴룵룶룷룺룼룾룿뤀뤁뤂뤃뤅뤆뤇뤈뤉뤊뤋뤌뤍뤎뤏뤐뤑뤒뤓뤔뤕뤖뤗뤙뤚뤛뤜뤝뤞뤟뤡뤢뤣뤤뤥뤦뤧뤨뤩뤪뤫뤬뤭뤮뤯뤰뤱뤲뤳뤴뤵뤶뤷뤸뤹뤺뤻뤾뤿륁륂륃륅륆륇륈륉륊륋륍륎륐륒륓륔륕륖륗�"
		.split("");
	for (a = 0; a != t[143].length; ++a)
		if (t[143][a].charCodeAt(0) !== 65533) {
			r[t[143][a]] = 36608 + a;
			e[36608 + a] = t[143][a]
		}
	t[144] =
		"�����������������������������������������������������������������륚륛륝륞륟륡륢륣륤륥륦륧륪륬륮륯륰륱륲륳륶륷륹륺륻륽������륾륿릀릁릂릃릆릈릋릌릏릐릑릒릓릔릕릖릗릘릙릚릛릜릝릞������릟릠릡릢릣릤릥릦릧릨릩릪릫릮릯릱릲릳릵릶릷릸릹릺릻릾맀맂맃맄맅맆맇맊맋맍맓맔맕맖맗맚맜맟맠맢맦맧맩맪맫맭맮맯맰맱맲맳맶맻맼맽맾맿먂먃먄먅먆먇먉먊먋먌먍먎먏먐먑먒먓먔먖먗먘먙먚먛먜먝먞먟먠먡먢먣먤먥먦먧먨먩먪먫먬먭먮먯먰먱먲먳먴먵먶먷먺먻먽먾먿멁멃멄멅멆�"
		.split("");
	for (a = 0; a != t[144].length; ++a)
		if (t[144][a].charCodeAt(0) !== 65533) {
			r[t[144][a]] = 36864 + a;
			e[36864 + a] = t[144][a]
		}
	t[145] =
		"�����������������������������������������������������������������멇멊멌멏멐멑멒멖멗멙멚멛멝멞멟멠멡멢멣멦멪멫멬멭멮멯������멲멳멵멶멷멹멺멻멼멽멾멿몀몁몂몆몈몉몊몋몍몎몏몐몑몒������몓몔몕몖몗몘몙몚몛몜몝몞몟몠몡몢몣몤몥몦몧몪몭몮몯몱몳몴몵몶몷몺몼몾몿뫀뫁뫂뫃뫅뫆뫇뫉뫊뫋뫌뫍뫎뫏뫐뫑뫒뫓뫔뫕뫖뫗뫚뫛뫜뫝뫞뫟뫠뫡뫢뫣뫤뫥뫦뫧뫨뫩뫪뫫뫬뫭뫮뫯뫰뫱뫲뫳뫴뫵뫶뫷뫸뫹뫺뫻뫽뫾뫿묁묂묃묅묆묇묈묉묊묋묌묎묐묒묓묔묕묖묗묙묚묛묝묞묟묡묢묣묤묥묦묧�"
		.split("");
	for (a = 0; a != t[145].length; ++a)
		if (t[145][a].charCodeAt(0) !== 65533) {
			r[t[145][a]] = 37120 + a;
			e[37120 + a] = t[145][a]
		}
	t[146] =
		"�����������������������������������������������������������������묨묪묬묭묮묯묰묱묲묳묷묹묺묿뭀뭁뭂뭃뭆뭈뭊뭋뭌뭎뭑뭒������뭓뭕뭖뭗뭙뭚뭛뭜뭝뭞뭟뭠뭢뭤뭥뭦뭧뭨뭩뭪뭫뭭뭮뭯뭰뭱������뭲뭳뭴뭵뭶뭷뭸뭹뭺뭻뭼뭽뭾뭿뮀뮁뮂뮃뮄뮅뮆뮇뮉뮊뮋뮍뮎뮏뮑뮒뮓뮔뮕뮖뮗뮘뮙뮚뮛뮜뮝뮞뮟뮠뮡뮢뮣뮥뮦뮧뮩뮪뮫뮭뮮뮯뮰뮱뮲뮳뮵뮶뮸뮹뮺뮻뮼뮽뮾뮿믁믂믃믅믆믇믉믊믋믌믍믎믏믑믒믔믕믖믗믘믙믚믛믜믝믞믟믠믡믢믣믤믥믦믧믨믩믪믫믬믭믮믯믰믱믲믳믴믵믶믷믺믻믽믾밁�"
		.split("");
	for (a = 0; a != t[146].length; ++a)
		if (t[146][a].charCodeAt(0) !== 65533) {
			r[t[146][a]] = 37376 + a;
			e[37376 + a] = t[146][a]
		}
	t[147] =
		"�����������������������������������������������������������������밃밄밅밆밇밊밎밐밒밓밙밚밠밡밢밣밦밨밪밫밬밮밯밲밳밵������밶밷밹밺밻밼밽밾밿뱂뱆뱇뱈뱊뱋뱎뱏뱑뱒뱓뱔뱕뱖뱗뱘뱙������뱚뱛뱜뱞뱟뱠뱡뱢뱣뱤뱥뱦뱧뱨뱩뱪뱫뱬뱭뱮뱯뱰뱱뱲뱳뱴뱵뱶뱷뱸뱹뱺뱻뱼뱽뱾뱿벀벁벂벃벆벇벉벊벍벏벐벑벒벓벖벘벛벜벝벞벟벢벣벥벦벩벪벫벬벭벮벯벲벶벷벸벹벺벻벾벿볁볂볃볅볆볇볈볉볊볋볌볎볒볓볔볖볗볙볚볛볝볞볟볠볡볢볣볤볥볦볧볨볩볪볫볬볭볮볯볰볱볲볳볷볹볺볻볽�"
		.split("");
	for (a = 0; a != t[147].length; ++a)
		if (t[147][a].charCodeAt(0) !== 65533) {
			r[t[147][a]] = 37632 + a;
			e[37632 + a] = t[147][a]
		}
	t[148] =
		"�����������������������������������������������������������������볾볿봀봁봂봃봆봈봊봋봌봍봎봏봑봒봓봕봖봗봘봙봚봛봜봝������봞봟봠봡봢봣봥봦봧봨봩봪봫봭봮봯봰봱봲봳봴봵봶봷봸봹������봺봻봼봽봾봿뵁뵂뵃뵄뵅뵆뵇뵊뵋뵍뵎뵏뵑뵒뵓뵔뵕뵖뵗뵚뵛뵜뵝뵞뵟뵠뵡뵢뵣뵥뵦뵧뵩뵪뵫뵬뵭뵮뵯뵰뵱뵲뵳뵴뵵뵶뵷뵸뵹뵺뵻뵼뵽뵾뵿붂붃붅붆붋붌붍붎붏붒붔붖붗붘붛붝붞붟붠붡붢붣붥붦붧붨붩붪붫붬붭붮붯붱붲붳붴붵붶붷붹붺붻붼붽붾붿뷀뷁뷂뷃뷄뷅뷆뷇뷈뷉뷊뷋뷌뷍뷎뷏뷐뷑�"
		.split("");
	for (a = 0; a != t[148].length; ++a)
		if (t[148][a].charCodeAt(0) !== 65533) {
			r[t[148][a]] = 37888 + a;
			e[37888 + a] = t[148][a]
		}
	t[149] =
		"�����������������������������������������������������������������뷒뷓뷖뷗뷙뷚뷛뷝뷞뷟뷠뷡뷢뷣뷤뷥뷦뷧뷨뷪뷫뷬뷭뷮뷯뷱������뷲뷳뷵뷶뷷뷹뷺뷻뷼뷽뷾뷿븁븂븄븆븇븈븉븊븋븎븏븑븒븓������븕븖븗븘븙븚븛븞븠븡븢븣븤븥븦븧븨븩븪븫븬븭븮븯븰븱븲븳븴븵븶븷븸븹븺븻븼븽븾븿빀빁빂빃빆빇빉빊빋빍빏빐빑빒빓빖빘빜빝빞빟빢빣빥빦빧빩빫빬빭빮빯빲빶빷빸빹빺빾빿뺁뺂뺃뺅뺆뺇뺈뺉뺊뺋뺎뺒뺓뺔뺕뺖뺗뺚뺛뺜뺝뺞뺟뺠뺡뺢뺣뺤뺥뺦뺧뺩뺪뺫뺬뺭뺮뺯뺰뺱뺲뺳뺴뺵뺶뺷�"
		.split("");
	for (a = 0; a != t[149].length; ++a)
		if (t[149][a].charCodeAt(0) !== 65533) {
			r[t[149][a]] = 38144 + a;
			e[38144 + a] = t[149][a]
		}
	t[150] =
		"�����������������������������������������������������������������뺸뺹뺺뺻뺼뺽뺾뺿뻀뻁뻂뻃뻄뻅뻆뻇뻈뻉뻊뻋뻌뻍뻎뻏뻒뻓������뻕뻖뻙뻚뻛뻜뻝뻞뻟뻡뻢뻦뻧뻨뻩뻪뻫뻭뻮뻯뻰뻱뻲뻳뻴뻵������뻶뻷뻸뻹뻺뻻뻼뻽뻾뻿뼀뼂뼃뼄뼅뼆뼇뼊뼋뼌뼍뼎뼏뼐뼑뼒뼓뼔뼕뼖뼗뼚뼞뼟뼠뼡뼢뼣뼤뼥뼦뼧뼨뼩뼪뼫뼬뼭뼮뼯뼰뼱뼲뼳뼴뼵뼶뼷뼸뼹뼺뼻뼼뼽뼾뼿뽂뽃뽅뽆뽇뽉뽊뽋뽌뽍뽎뽏뽒뽓뽔뽖뽗뽘뽙뽚뽛뽜뽝뽞뽟뽠뽡뽢뽣뽤뽥뽦뽧뽨뽩뽪뽫뽬뽭뽮뽯뽰뽱뽲뽳뽴뽵뽶뽷뽸뽹뽺뽻뽼뽽뽾뽿뾀뾁뾂�"
		.split("");
	for (a = 0; a != t[150].length; ++a)
		if (t[150][a].charCodeAt(0) !== 65533) {
			r[t[150][a]] = 38400 + a;
			e[38400 + a] = t[150][a]
		}
	t[151] =
		"�����������������������������������������������������������������뾃뾄뾅뾆뾇뾈뾉뾊뾋뾌뾍뾎뾏뾐뾑뾒뾓뾕뾖뾗뾘뾙뾚뾛뾜뾝������뾞뾟뾠뾡뾢뾣뾤뾥뾦뾧뾨뾩뾪뾫뾬뾭뾮뾯뾱뾲뾳뾴뾵뾶뾷뾸������뾹뾺뾻뾼뾽뾾뾿뿀뿁뿂뿃뿄뿆뿇뿈뿉뿊뿋뿎뿏뿑뿒뿓뿕뿖뿗뿘뿙뿚뿛뿝뿞뿠뿢뿣뿤뿥뿦뿧뿨뿩뿪뿫뿬뿭뿮뿯뿰뿱뿲뿳뿴뿵뿶뿷뿸뿹뿺뿻뿼뿽뿾뿿쀀쀁쀂쀃쀄쀅쀆쀇쀈쀉쀊쀋쀌쀍쀎쀏쀐쀑쀒쀓쀔쀕쀖쀗쀘쀙쀚쀛쀜쀝쀞쀟쀠쀡쀢쀣쀤쀥쀦쀧쀨쀩쀪쀫쀬쀭쀮쀯쀰쀱쀲쀳쀴쀵쀶쀷쀸쀹쀺쀻쀽쀾쀿�"
		.split("");
	for (a = 0; a != t[151].length; ++a)
		if (t[151][a].charCodeAt(0) !== 65533) {
			r[t[151][a]] = 38656 + a;
			e[38656 + a] = t[151][a]
		}
	t[152] =
		"�����������������������������������������������������������������쁀쁁쁂쁃쁄쁅쁆쁇쁈쁉쁊쁋쁌쁍쁎쁏쁐쁒쁓쁔쁕쁖쁗쁙쁚쁛������쁝쁞쁟쁡쁢쁣쁤쁥쁦쁧쁪쁫쁬쁭쁮쁯쁰쁱쁲쁳쁴쁵쁶쁷쁸쁹������쁺쁻쁼쁽쁾쁿삀삁삂삃삄삅삆삇삈삉삊삋삌삍삎삏삒삓삕삖삗삙삚삛삜삝삞삟삢삤삦삧삨삩삪삫삮삱삲삷삸삹삺삻삾샂샃샄샆샇샊샋샍샎샏샑샒샓샔샕샖샗샚샞샟샠샡샢샣샦샧샩샪샫샭샮샯샰샱샲샳샶샸샺샻샼샽샾샿섁섂섃섅섆섇섉섊섋섌섍섎섏섑섒섓섔섖섗섘섙섚섛섡섢섥섨섩섪섫섮�"
		.split("");
	for (a = 0; a != t[152].length; ++a)
		if (t[152][a].charCodeAt(0) !== 65533) {
			r[t[152][a]] = 38912 + a;
			e[38912 + a] = t[152][a]
		}
	t[153] =
		"�����������������������������������������������������������������섲섳섴섵섷섺섻섽섾섿셁셂셃셄셅셆셇셊셎셏셐셑셒셓셖셗������셙셚셛셝셞셟셠셡셢셣셦셪셫셬셭셮셯셱셲셳셵셶셷셹셺셻������셼셽셾셿솀솁솂솃솄솆솇솈솉솊솋솏솑솒솓솕솗솘솙솚솛솞솠솢솣솤솦솧솪솫솭솮솯솱솲솳솴솵솶솷솸솹솺솻솼솾솿쇀쇁쇂쇃쇅쇆쇇쇉쇊쇋쇍쇎쇏쇐쇑쇒쇓쇕쇖쇙쇚쇛쇜쇝쇞쇟쇡쇢쇣쇥쇦쇧쇩쇪쇫쇬쇭쇮쇯쇲쇴쇵쇶쇷쇸쇹쇺쇻쇾쇿숁숂숃숅숆숇숈숉숊숋숎숐숒숓숔숕숖숗숚숛숝숞숡숢숣�"
		.split("");
	for (a = 0; a != t[153].length; ++a)
		if (t[153][a].charCodeAt(0) !== 65533) {
			r[t[153][a]] = 39168 + a;
			e[39168 + a] = t[153][a]
		}
	t[154] =
		"�����������������������������������������������������������������숤숥숦숧숪숬숮숰숳숵숶숷숸숹숺숻숼숽숾숿쉀쉁쉂쉃쉄쉅������쉆쉇쉉쉊쉋쉌쉍쉎쉏쉒쉓쉕쉖쉗쉙쉚쉛쉜쉝쉞쉟쉡쉢쉣쉤쉦������쉧쉨쉩쉪쉫쉮쉯쉱쉲쉳쉵쉶쉷쉸쉹쉺쉻쉾슀슂슃슄슅슆슇슊슋슌슍슎슏슑슒슓슔슕슖슗슙슚슜슞슟슠슡슢슣슦슧슩슪슫슮슯슰슱슲슳슶슸슺슻슼슽슾슿싀싁싂싃싄싅싆싇싈싉싊싋싌싍싎싏싐싑싒싓싔싕싖싗싘싙싚싛싞싟싡싢싥싦싧싨싩싪싮싰싲싳싴싵싷싺싽싾싿쌁쌂쌃쌄쌅쌆쌇쌊쌋쌎쌏�"
		.split("");
	for (a = 0; a != t[154].length; ++a)
		if (t[154][a].charCodeAt(0) !== 65533) {
			r[t[154][a]] = 39424 + a;
			e[39424 + a] = t[154][a]
		}
	t[155] =
		"�����������������������������������������������������������������쌐쌑쌒쌖쌗쌙쌚쌛쌝쌞쌟쌠쌡쌢쌣쌦쌧쌪쌫쌬쌭쌮쌯쌰쌱쌲������쌳쌴쌵쌶쌷쌸쌹쌺쌻쌼쌽쌾쌿썀썁썂썃썄썆썇썈썉썊썋썌썍������썎썏썐썑썒썓썔썕썖썗썘썙썚썛썜썝썞썟썠썡썢썣썤썥썦썧썪썫썭썮썯썱썳썴썵썶썷썺썻썾썿쎀쎁쎂쎃쎅쎆쎇쎉쎊쎋쎍쎎쎏쎐쎑쎒쎓쎔쎕쎖쎗쎘쎙쎚쎛쎜쎝쎞쎟쎠쎡쎢쎣쎤쎥쎦쎧쎨쎩쎪쎫쎬쎭쎮쎯쎰쎱쎲쎳쎴쎵쎶쎷쎸쎹쎺쎻쎼쎽쎾쎿쏁쏂쏃쏄쏅쏆쏇쏈쏉쏊쏋쏌쏍쏎쏏쏐쏑쏒쏓쏔쏕쏖쏗쏚�"
		.split("");
	for (a = 0; a != t[155].length; ++a)
		if (t[155][a].charCodeAt(0) !== 65533) {
			r[t[155][a]] = 39680 + a;
			e[39680 + a] = t[155][a]
		}
	t[156] =
		"�����������������������������������������������������������������쏛쏝쏞쏡쏣쏤쏥쏦쏧쏪쏫쏬쏮쏯쏰쏱쏲쏳쏶쏷쏹쏺쏻쏼쏽쏾������쏿쐀쐁쐂쐃쐄쐅쐆쐇쐉쐊쐋쐌쐍쐎쐏쐑쐒쐓쐔쐕쐖쐗쐘쐙쐚������쐛쐜쐝쐞쐟쐠쐡쐢쐣쐥쐦쐧쐨쐩쐪쐫쐭쐮쐯쐱쐲쐳쐵쐶쐷쐸쐹쐺쐻쐾쐿쑀쑁쑂쑃쑄쑅쑆쑇쑉쑊쑋쑌쑍쑎쑏쑐쑑쑒쑓쑔쑕쑖쑗쑘쑙쑚쑛쑜쑝쑞쑟쑠쑡쑢쑣쑦쑧쑩쑪쑫쑭쑮쑯쑰쑱쑲쑳쑶쑷쑸쑺쑻쑼쑽쑾쑿쒁쒂쒃쒄쒅쒆쒇쒈쒉쒊쒋쒌쒍쒎쒏쒐쒑쒒쒓쒕쒖쒗쒘쒙쒚쒛쒝쒞쒟쒠쒡쒢쒣쒤쒥쒦쒧쒨쒩�"
		.split("");
	for (a = 0; a != t[156].length; ++a)
		if (t[156][a].charCodeAt(0) !== 65533) {
			r[t[156][a]] = 39936 + a;
			e[39936 + a] = t[156][a]
		}
	t[157] =
		"�����������������������������������������������������������������쒪쒫쒬쒭쒮쒯쒰쒱쒲쒳쒴쒵쒶쒷쒹쒺쒻쒽쒾쒿쓀쓁쓂쓃쓄쓅������쓆쓇쓈쓉쓊쓋쓌쓍쓎쓏쓐쓑쓒쓓쓔쓕쓖쓗쓘쓙쓚쓛쓜쓝쓞쓟������쓠쓡쓢쓣쓤쓥쓦쓧쓨쓪쓫쓬쓭쓮쓯쓲쓳쓵쓶쓷쓹쓻쓼쓽쓾씂씃씄씅씆씇씈씉씊씋씍씎씏씑씒씓씕씖씗씘씙씚씛씝씞씟씠씡씢씣씤씥씦씧씪씫씭씮씯씱씲씳씴씵씶씷씺씼씾씿앀앁앂앃앆앇앋앏앐앑앒앖앚앛앜앟앢앣앥앦앧앩앪앫앬앭앮앯앲앶앷앸앹앺앻앾앿얁얂얃얅얆얈얉얊얋얎얐얒얓얔�"
		.split("");
	for (a = 0; a != t[157].length; ++a)
		if (t[157][a].charCodeAt(0) !== 65533) {
			r[t[157][a]] = 40192 + a;
			e[40192 + a] = t[157][a]
		}
	t[158] =
		"�����������������������������������������������������������������얖얙얚얛얝얞얟얡얢얣얤얥얦얧얨얪얫얬얭얮얯얰얱얲얳얶������얷얺얿엀엁엂엃엋엍엏엒엓엕엖엗엙엚엛엜엝엞엟엢엤엦엧������엨엩엪엫엯엱엲엳엵엸엹엺엻옂옃옄옉옊옋옍옎옏옑옒옓옔옕옖옗옚옝옞옟옠옡옢옣옦옧옩옪옫옯옱옲옶옸옺옼옽옾옿왂왃왅왆왇왉왊왋왌왍왎왏왒왖왗왘왙왚왛왞왟왡왢왣왤왥왦왧왨왩왪왫왭왮왰왲왳왴왵왶왷왺왻왽왾왿욁욂욃욄욅욆욇욊욌욎욏욐욑욒욓욖욗욙욚욛욝욞욟욠욡욢욣욦�"
		.split("");
	for (a = 0; a != t[158].length; ++a)
		if (t[158][a].charCodeAt(0) !== 65533) {
			r[t[158][a]] = 40448 + a;
			e[40448 + a] = t[158][a]
		}
	t[159] =
		"�����������������������������������������������������������������욨욪욫욬욭욮욯욲욳욵욶욷욻욼욽욾욿웂웄웆웇웈웉웊웋웎������웏웑웒웓웕웖웗웘웙웚웛웞웟웢웣웤웥웦웧웪웫웭웮웯웱웲������웳웴웵웶웷웺웻웼웾웿윀윁윂윃윆윇윉윊윋윍윎윏윐윑윒윓윖윘윚윛윜윝윞윟윢윣윥윦윧윩윪윫윬윭윮윯윲윴윶윸윹윺윻윾윿읁읂읃읅읆읇읈읉읋읎읐읙읚읛읝읞읟읡읢읣읤읥읦읧읩읪읬읭읮읯읰읱읲읳읶읷읹읺읻읿잀잁잂잆잋잌잍잏잒잓잕잙잛잜잝잞잟잢잧잨잩잪잫잮잯잱잲잳잵잶잷�"
		.split("");
	for (a = 0; a != t[159].length; ++a)
		if (t[159][a].charCodeAt(0) !== 65533) {
			r[t[159][a]] = 40704 + a;
			e[40704 + a] = t[159][a]
		}
	t[160] =
		"�����������������������������������������������������������������잸잹잺잻잾쟂쟃쟄쟅쟆쟇쟊쟋쟍쟏쟑쟒쟓쟔쟕쟖쟗쟙쟚쟛쟜������쟞쟟쟠쟡쟢쟣쟥쟦쟧쟩쟪쟫쟭쟮쟯쟰쟱쟲쟳쟴쟵쟶쟷쟸쟹쟺������쟻쟼쟽쟾쟿젂젃젅젆젇젉젋젌젍젎젏젒젔젗젘젙젚젛젞젟젡젢젣젥젦젧젨젩젪젫젮젰젲젳젴젵젶젷젹젺젻젽젾젿졁졂졃졄졅졆졇졊졋졎졏졐졑졒졓졕졖졗졘졙졚졛졜졝졞졟졠졡졢졣졤졥졦졧졨졩졪졫졬졭졮졯졲졳졵졶졷졹졻졼졽졾졿좂좄좈좉좊좎좏좐좑좒좓좕좖좗좘좙좚좛좜좞좠좢좣좤�"
		.split("");
	for (a = 0; a != t[160].length; ++a)
		if (t[160][a].charCodeAt(0) !== 65533) {
			r[t[160][a]] = 40960 + a;
			e[40960 + a] = t[160][a]
		}
	t[161] =
		"�����������������������������������������������������������������좥좦좧좩좪좫좬좭좮좯좰좱좲좳좴좵좶좷좸좹좺좻좾좿죀죁������죂죃죅죆죇죉죊죋죍죎죏죐죑죒죓죖죘죚죛죜죝죞죟죢죣죥������죦죧죨죩죪죫죬죭죮죯죰죱죲죳죴죶죷죸죹죺죻죾죿줁줂줃줇줈줉줊줋줎　、。·‥…¨〃­―∥＼∼‘’“”〔〕〈〉《》「」『』【】±×÷≠≤≥∞∴°′″℃Å￠￡￥♂♀∠⊥⌒∂∇≡≒§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢�"
		.split("");
	for (a = 0; a != t[161].length; ++a)
		if (t[161][a].charCodeAt(0) !== 65533) {
			r[t[161][a]] = 41216 + a;
			e[41216 + a] = t[161][a]
		}
	t[162] =
		"�����������������������������������������������������������������줐줒줓줔줕줖줗줙줚줛줜줝줞줟줠줡줢줣줤줥줦줧줨줩줪줫������줭줮줯줰줱줲줳줵줶줷줸줹줺줻줼줽줾줿쥀쥁쥂쥃쥄쥅쥆쥇������쥈쥉쥊쥋쥌쥍쥎쥏쥒쥓쥕쥖쥗쥙쥚쥛쥜쥝쥞쥟쥢쥤쥥쥦쥧쥨쥩쥪쥫쥭쥮쥯⇒⇔∀∃´～ˇ˘˝˚˙¸˛¡¿ː∮∑∏¤℉‰◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡€®������������������������"
		.split("");
	for (a = 0; a != t[162].length; ++a)
		if (t[162][a].charCodeAt(0) !== 65533) {
			r[t[162][a]] = 41472 + a;
			e[41472 + a] = t[162][a]
		}
	t[163] =
		"�����������������������������������������������������������������쥱쥲쥳쥵쥶쥷쥸쥹쥺쥻쥽쥾쥿즀즁즂즃즄즅즆즇즊즋즍즎즏������즑즒즓즔즕즖즗즚즜즞즟즠즡즢즣즤즥즦즧즨즩즪즫즬즭즮������즯즰즱즲즳즴즵즶즷즸즹즺즻즼즽즾즿짂짃짅짆짉짋짌짍짎짏짒짔짗짘짛！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［￦］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝￣�"
		.split("");
	for (a = 0; a != t[163].length; ++a)
		if (t[163][a].charCodeAt(0) !== 65533) {
			r[t[163][a]] = 41728 + a;
			e[41728 + a] = t[163][a]
		}
	t[164] =
		"�����������������������������������������������������������������짞짟짡짣짥짦짨짩짪짫짮짲짳짴짵짶짷짺짻짽짾짿쨁쨂쨃쨄������쨅쨆쨇쨊쨎쨏쨐쨑쨒쨓쨕쨖쨗쨙쨚쨛쨜쨝쨞쨟쨠쨡쨢쨣쨤쨥������쨦쨧쨨쨪쨫쨬쨭쨮쨯쨰쨱쨲쨳쨴쨵쨶쨷쨸쨹쨺쨻쨼쨽쨾쨿쩀쩁쩂쩃쩄쩅쩆ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣㅤㅥㅦㅧㅨㅩㅪㅫㅬㅭㅮㅯㅰㅱㅲㅳㅴㅵㅶㅷㅸㅹㅺㅻㅼㅽㅾㅿㆀㆁㆂㆃㆄㆅㆆㆇㆈㆉㆊㆋㆌㆍㆎ�"
		.split("");
	for (a = 0; a != t[164].length; ++a)
		if (t[164][a].charCodeAt(0) !== 65533) {
			r[t[164][a]] = 41984 + a;
			e[41984 + a] = t[164][a]
		}
	t[165] =
		"�����������������������������������������������������������������쩇쩈쩉쩊쩋쩎쩏쩑쩒쩓쩕쩖쩗쩘쩙쩚쩛쩞쩢쩣쩤쩥쩦쩧쩩쩪������쩫쩬쩭쩮쩯쩰쩱쩲쩳쩴쩵쩶쩷쩸쩹쩺쩻쩼쩾쩿쪀쪁쪂쪃쪅쪆������쪇쪈쪉쪊쪋쪌쪍쪎쪏쪐쪑쪒쪓쪔쪕쪖쪗쪙쪚쪛쪜쪝쪞쪟쪠쪡쪢쪣쪤쪥쪦쪧ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹ�����ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ�������ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ��������αβγδεζηθικλμνξοπρστυφχψω�������"
		.split("");
	for (a = 0; a != t[165].length; ++a)
		if (t[165][a].charCodeAt(0) !== 65533) {
			r[t[165][a]] = 42240 + a;
			e[42240 + a] = t[165][a]
		}
	t[166] =
		"�����������������������������������������������������������������쪨쪩쪪쪫쪬쪭쪮쪯쪰쪱쪲쪳쪴쪵쪶쪷쪸쪹쪺쪻쪾쪿쫁쫂쫃쫅������쫆쫇쫈쫉쫊쫋쫎쫐쫒쫔쫕쫖쫗쫚쫛쫜쫝쫞쫟쫡쫢쫣쫤쫥쫦쫧������쫨쫩쫪쫫쫭쫮쫯쫰쫱쫲쫳쫵쫶쫷쫸쫹쫺쫻쫼쫽쫾쫿쬀쬁쬂쬃쬄쬅쬆쬇쬉쬊─│┌┐┘└├┬┤┴┼'a! `%p━'``p'a! `%p┃'``p'a! `%p┏'``p'a! `%p┓'``p'a! `%p┛'``p'a! `%p┗'``p'a! `%p┣'``p'a! `%p┳'``p'a! `%p┫'``p'a! `%p┻'``p'a! `%p╋'``p┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃╄╅╆╇╈╉╊���������������������������"
		.split("");
	for (a = 0; a != t[166].length; ++a)
		if (t[166][a].charCodeAt(0) !== 65533) {
			r[t[166][a]] = 42496 + a;
			e[42496 + a] = t[166][a]
		}
	t[167] =
		"�����������������������������������������������������������������쬋쬌쬍쬎쬏쬑쬒쬓쬕쬖쬗쬙쬚쬛쬜쬝쬞쬟쬢쬣쬤쬥쬦쬧쬨쬩������쬪쬫쬬쬭쬮쬯쬰쬱쬲쬳쬴쬵쬶쬷쬸쬹쬺쬻쬼쬽쬾쬿쭀쭂쭃쭄������쭅쭆쭇쭊쭋쭍쭎쭏쭑쭒쭓쭔쭕쭖쭗쭚쭛쭜쭞쭟쭠쭡쭢쭣쭥쭦쭧쭨쭩쭪쭫쭬㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎦㎙㎚㎛㎜㎝㎞㎟㎠㎡㎢㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰㎱㎲㎳㎴㎵㎶㎷㎸㎹㎀㎁㎂㎃㎄㎺㎻㎼㎽㎾㎿㎐㎑㎒㎓㎔Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆����������������"
		.split("");
	for (a = 0; a != t[167].length; ++a)
		if (t[167][a].charCodeAt(0) !== 65533) {
			r[t[167][a]] = 42752 + a;
			e[42752 + a] = t[167][a]
		}
	t[168] =
		"�����������������������������������������������������������������쭭쭮쭯쭰쭱쭲쭳쭴쭵쭶쭷쭺쭻쭼쭽쭾쭿쮀쮁쮂쮃쮄쮅쮆쮇쮈������쮉쮊쮋쮌쮍쮎쮏쮐쮑쮒쮓쮔쮕쮖쮗쮘쮙쮚쮛쮝쮞쮟쮠쮡쮢쮣������쮤쮥쮦쮧쮨쮩쮪쮫쮬쮭쮮쮯쮰쮱쮲쮳쮴쮵쮶쮷쮹쮺쮻쮼쮽쮾쮿쯀쯁쯂쯃쯄ÆÐªĦ�Ĳ�ĿŁØŒºÞŦŊ�㉠㉡㉢㉣㉤㉥㉦㉧㉨㉩㉪㉫㉬㉭㉮㉯㉰㉱㉲㉳㉴㉵㉶㉷㉸㉹㉺㉻ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮½⅓⅔¼¾⅛⅜⅝⅞�"
		.split("");
	for (a = 0; a != t[168].length; ++a)
		if (t[168][a].charCodeAt(0) !== 65533) {
			r[t[168][a]] = 43008 + a;
			e[43008 + a] = t[168][a]
		}
	t[169] =
		"�����������������������������������������������������������������쯅쯆쯇쯈쯉쯊쯋쯌쯍쯎쯏쯐쯑쯒쯓쯕쯖쯗쯘쯙쯚쯛쯜쯝쯞쯟������쯠쯡쯢쯣쯥쯦쯨쯪쯫쯬쯭쯮쯯쯰쯱쯲쯳쯴쯵쯶쯷쯸쯹쯺쯻쯼������쯽쯾쯿찀찁찂찃찄찅찆찇찈찉찊찋찎찏찑찒찓찕찖찗찘찙찚찛찞찟찠찣찤æđðħıĳĸŀłøœßþŧŋŉ㈀㈁㈂㈃㈄㈅㈆㈇㈈㈉㈊㈋㈌㈍㈎㈏㈐㈑㈒㈓㈔㈕㈖㈗㈘㈙㈚㈛⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂¹²³⁴ⁿ₁₂₃₄�"
		.split("");
	for (a = 0; a != t[169].length; ++a)
		if (t[169][a].charCodeAt(0) !== 65533) {
			r[t[169][a]] = 43264 + a;
			e[43264 + a] = t[169][a]
		}
	t[170] =
		"�����������������������������������������������������������������찥찦찪찫찭찯찱찲찳찴찵찶찷찺찿챀챁챂챃챆챇챉챊챋챍챎������챏챐챑챒챓챖챚챛챜챝챞챟챡챢챣챥챧챩챪챫챬챭챮챯챱챲������챳챴챶챷챸챹챺챻챼챽챾챿첀첁첂첃첄첅첆첇첈첉첊첋첌첍첎첏첐첑첒첓ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん������������"
		.split("");
	for (a = 0; a != t[170].length; ++a)
		if (t[170][a].charCodeAt(0) !== 65533) {
			r[t[170][a]] = 43520 + a;
			e[43520 + a] = t[170][a]
		}
	t[171] =
		"�����������������������������������������������������������������첔첕첖첗첚첛첝첞첟첡첢첣첤첥첦첧첪첮첯첰첱첲첳첶첷첹������첺첻첽첾첿쳀쳁쳂쳃쳆쳈쳊쳋쳌쳍쳎쳏쳑쳒쳓쳕쳖쳗쳘쳙쳚������쳛쳜쳝쳞쳟쳠쳡쳢쳣쳥쳦쳧쳨쳩쳪쳫쳭쳮쳯쳱쳲쳳쳴쳵쳶쳷쳸쳹쳺쳻쳼쳽ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ���������"
		.split("");
	for (a = 0; a != t[171].length; ++a)
		if (t[171][a].charCodeAt(0) !== 65533) {
			r[t[171][a]] = 43776 + a;
			e[43776 + a] = t[171][a]
		}
	t[172] =
		"�����������������������������������������������������������������쳾쳿촀촂촃촄촅촆촇촊촋촍촎촏촑촒촓촔촕촖촗촚촜촞촟촠������촡촢촣촥촦촧촩촪촫촭촮촯촰촱촲촳촴촵촶촷촸촺촻촼촽촾������촿쵀쵁쵂쵃쵄쵅쵆쵇쵈쵉쵊쵋쵌쵍쵎쵏쵐쵑쵒쵓쵔쵕쵖쵗쵘쵙쵚쵛쵝쵞쵟АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ���������������абвгдеёжзийклмнопрстуфхцчшщъыьэюя��������������"
		.split("");
	for (a = 0; a != t[172].length; ++a)
		if (t[172][a].charCodeAt(0) !== 65533) {
			r[t[172][a]] = 44032 + a;
			e[44032 + a] = t[172][a]
		}
	t[173] =
		"�����������������������������������������������������������������쵡쵢쵣쵥쵦쵧쵨쵩쵪쵫쵮쵰쵲쵳쵴쵵쵶쵷쵹쵺쵻쵼쵽쵾쵿춀������춁춂춃춄춅춆춇춉춊춋춌춍춎춏춐춑춒춓춖춗춙춚춛춝춞춟������춠춡춢춣춦춨춪춫춬춭춮춯춱춲춳춴춵춶춷춸춹춺춻춼춽춾춿췀췁췂췃췅�����������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[173].length; ++a)
		if (t[173][a].charCodeAt(0) !== 65533) {
			r[t[173][a]] = 44288 + a;
			e[44288 + a] = t[173][a]
		}
	t[174] =
		"�����������������������������������������������������������������췆췇췈췉췊췋췍췎췏췑췒췓췔췕췖췗췘췙췚췛췜췝췞췟췠췡������췢췣췤췥췦췧췩췪췫췭췮췯췱췲췳췴췵췶췷췺췼췾췿츀츁츂������츃츅츆츇츉츊츋츍츎츏츐츑츒츓츕츖츗츘츚츛츜츝츞츟츢츣츥츦츧츩츪츫�����������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[174].length; ++a)
		if (t[174][a].charCodeAt(0) !== 65533) {
			r[t[174][a]] = 44544 + a;
			e[44544 + a] = t[174][a]
		}
	t[175] =
		"�����������������������������������������������������������������츬츭츮츯츲츴츶츷츸츹츺츻츼츽츾츿칀칁칂칃칄칅칆칇칈칉������칊칋칌칍칎칏칐칑칒칓칔칕칖칗칚칛칝칞칢칣칤칥칦칧칪칬������칮칯칰칱칲칳칶칷칹칺칻칽칾칿캀캁캂캃캆캈캊캋캌캍캎캏캒캓캕캖캗캙�����������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[175].length; ++a)
		if (t[175][a].charCodeAt(0) !== 65533) {
			r[t[175][a]] = 44800 + a;
			e[44800 + a] = t[175][a]
		}
	t[176] =
		"�����������������������������������������������������������������캚캛캜캝캞캟캢캦캧캨캩캪캫캮캯캰캱캲캳캴캵캶캷캸캹캺������캻캼캽캾캿컀컂컃컄컅컆컇컈컉컊컋컌컍컎컏컐컑컒컓컔컕������컖컗컘컙컚컛컜컝컞컟컠컡컢컣컦컧컩컪컭컮컯컰컱컲컳컶컺컻컼컽컾컿가각간갇갈갉갊감갑값갓갔강갖갗같갚갛개객갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆�"
		.split("");
	for (a = 0; a != t[176].length; ++a)
		if (t[176][a].charCodeAt(0) !== 65533) {
			r[t[176][a]] = 45056 + a;
			e[45056 + a] = t[176][a]
		}
	t[177] =
		"�����������������������������������������������������������������켂켃켅켆켇켉켊켋켌켍켎켏켒켔켖켗켘켙켚켛켝켞켟켡켢켣������켥켦켧켨켩켪켫켮켲켳켴켵켶켷켹켺켻켼켽켾켿콀콁콂콃콄������콅콆콇콈콉콊콋콌콍콎콏콐콑콒콓콖콗콙콚콛콝콞콟콠콡콢콣콦콨콪콫콬괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸�"
		.split("");
	for (a = 0; a != t[177].length; ++a)
		if (t[177][a].charCodeAt(0) !== 65533) {
			r[t[177][a]] = 45312 + a;
			e[45312 + a] = t[177][a]
		}
	t[178] =
		"�����������������������������������������������������������������콭콮콯콲콳콵콶콷콹콺콻콼콽콾콿쾁쾂쾃쾄쾆쾇쾈쾉쾊쾋쾍������쾎쾏쾐쾑쾒쾓쾔쾕쾖쾗쾘쾙쾚쾛쾜쾝쾞쾟쾠쾢쾣쾤쾥쾦쾧쾩������쾪쾫쾬쾭쾮쾯쾱쾲쾳쾴쾵쾶쾷쾸쾹쾺쾻쾼쾽쾾쾿쿀쿁쿂쿃쿅쿆쿇쿈쿉쿊쿋깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙�"
		.split("");
	for (a = 0; a != t[178].length; ++a)
		if (t[178][a].charCodeAt(0) !== 65533) {
			r[t[178][a]] = 45568 + a;
			e[45568 + a] = t[178][a]
		}
	t[179] =
		"�����������������������������������������������������������������쿌쿍쿎쿏쿐쿑쿒쿓쿔쿕쿖쿗쿘쿙쿚쿛쿜쿝쿞쿟쿢쿣쿥쿦쿧쿩������쿪쿫쿬쿭쿮쿯쿲쿴쿶쿷쿸쿹쿺쿻쿽쿾쿿퀁퀂퀃퀅퀆퀇퀈퀉퀊������퀋퀌퀍퀎퀏퀐퀒퀓퀔퀕퀖퀗퀙퀚퀛퀜퀝퀞퀟퀠퀡퀢퀣퀤퀥퀦퀧퀨퀩퀪퀫퀬끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫났낭낮낯낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝�"
		.split("");
	for (a = 0; a != t[179].length; ++a)
		if (t[179][a].charCodeAt(0) !== 65533) {
			r[t[179][a]] = 45824 + a;
			e[45824 + a] = t[179][a]
		}
	t[180] =
		"�����������������������������������������������������������������퀮퀯퀰퀱퀲퀳퀶퀷퀹퀺퀻퀽퀾퀿큀큁큂큃큆큈큊큋큌큍큎큏������큑큒큓큕큖큗큙큚큛큜큝큞큟큡큢큣큤큥큦큧큨큩큪큫큮큯������큱큲큳큵큶큷큸큹큺큻큾큿킀킂킃킄킅킆킇킈킉킊킋킌킍킎킏킐킑킒킓킔뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫달닭닮닯닳담답닷닸당닺닻닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥�"
		.split("");
	for (a = 0; a != t[180].length; ++a)
		if (t[180][a].charCodeAt(0) !== 65533) {
			r[t[180][a]] = 46080 + a;
			e[46080 + a] = t[180][a]
		}
	t[181] =
		"�����������������������������������������������������������������킕킖킗킘킙킚킛킜킝킞킟킠킡킢킣킦킧킩킪킫킭킮킯킰킱킲������킳킶킸킺킻킼킽킾킿탂탃탅탆탇탊탋탌탍탎탏탒탖탗탘탙탚������탛탞탟탡탢탣탥탦탧탨탩탪탫탮탲탳탴탵탶탷탹탺탻탼탽탾탿턀턁턂턃턄덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸�"
		.split("");
	for (a = 0; a != t[181].length; ++a)
		if (t[181][a].charCodeAt(0) !== 65533) {
			r[t[181][a]] = 46336 + a;
			e[46336 + a] = t[181][a]
		}
	t[182] =
		"�����������������������������������������������������������������턅턆턇턈턉턊턋턌턎턏턐턑턒턓턔턕턖턗턘턙턚턛턜턝턞턟������턠턡턢턣턤턥턦턧턨턩턪턫턬턭턮턯턲턳턵턶턷턹턻턼턽턾������턿텂텆텇텈텉텊텋텎텏텑텒텓텕텖텗텘텙텚텛텞텠텢텣텤텥텦텧텩텪텫텭땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗�"
		.split("");
	for (a = 0; a != t[182].length; ++a)
		if (t[182][a].charCodeAt(0) !== 65533) {
			r[t[182][a]] = 46592 + a;
			e[46592 + a] = t[182][a]
		}
	t[183] =
		"�����������������������������������������������������������������텮텯텰텱텲텳텴텵텶텷텸텹텺텻텽텾텿톀톁톂톃톅톆톇톉톊������톋톌톍톎톏톐톑톒톓톔톕톖톗톘톙톚톛톜톝톞톟톢톣톥톦톧������톩톪톫톬톭톮톯톲톴톶톷톸톹톻톽톾톿퇁퇂퇃퇄퇅퇆퇇퇈퇉퇊퇋퇌퇍퇎퇏래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩�"
		.split("");
	for (a = 0; a != t[183].length; ++a)
		if (t[183][a].charCodeAt(0) !== 65533) {
			r[t[183][a]] = 46848 + a;
			e[46848 + a] = t[183][a]
		}
	t[184] =
		"�����������������������������������������������������������������퇐퇑퇒퇓퇔퇕퇖퇗퇙퇚퇛퇜퇝퇞퇟퇠퇡퇢퇣퇤퇥퇦퇧퇨퇩퇪������퇫퇬퇭퇮퇯퇰퇱퇲퇳퇵퇶퇷퇹퇺퇻퇼퇽퇾퇿툀툁툂툃툄툅툆������툈툊툋툌툍툎툏툑툒툓툔툕툖툗툘툙툚툛툜툝툞툟툠툡툢툣툤툥툦툧툨툩륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많맏말맑맒맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼�"
		.split("");
	for (a = 0; a != t[184].length; ++a)
		if (t[184][a].charCodeAt(0) !== 65533) {
			r[t[184][a]] = 47104 + a;
			e[47104 + a] = t[184][a]
		}
	t[185] =
		"�����������������������������������������������������������������툪툫툮툯툱툲툳툵툶툷툸툹툺툻툾퉀퉂퉃퉄퉅퉆퉇퉉퉊퉋퉌������퉍퉎퉏퉐퉑퉒퉓퉔퉕퉖퉗퉘퉙퉚퉛퉝퉞퉟퉠퉡퉢퉣퉥퉦퉧퉨������퉩퉪퉫퉬퉭퉮퉯퉰퉱퉲퉳퉴퉵퉶퉷퉸퉹퉺퉻퉼퉽퉾퉿튂튃튅튆튇튉튊튋튌묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바박밖밗반받발밝밞밟밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗�"
		.split("");
	for (a = 0; a != t[185].length; ++a)
		if (t[185][a].charCodeAt(0) !== 65533) {
			r[t[185][a]] = 47360 + a;
			e[47360 + a] = t[185][a]
		}
	t[186] =
		"�����������������������������������������������������������������튍튎튏튒튓튔튖튗튘튙튚튛튝튞튟튡튢튣튥튦튧튨튩튪튫튭������튮튯튰튲튳튴튵튶튷튺튻튽튾틁틃틄틅틆틇틊틌틍틎틏틐틑������틒틓틕틖틗틙틚틛틝틞틟틠틡틢틣틦틧틨틩틪틫틬틭틮틯틲틳틵틶틷틹틺벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤�"
		.split("");
	for (a = 0; a != t[186].length; ++a)
		if (t[186][a].charCodeAt(0) !== 65533) {
			r[t[186][a]] = 47616 + a;
			e[47616 + a] = t[186][a]
		}
	t[187] =
		"�����������������������������������������������������������������틻틼틽틾틿팂팄팆팇팈팉팊팋팏팑팒팓팕팗팘팙팚팛팞팢팣������팤팦팧팪팫팭팮팯팱팲팳팴팵팶팷팺팾팿퍀퍁퍂퍃퍆퍇퍈퍉������퍊퍋퍌퍍퍎퍏퍐퍑퍒퍓퍔퍕퍖퍗퍘퍙퍚퍛퍜퍝퍞퍟퍠퍡퍢퍣퍤퍥퍦퍧퍨퍩빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤�"
		.split("");
	for (a = 0; a != t[187].length; ++a)
		if (t[187][a].charCodeAt(0) !== 65533) {
			r[t[187][a]] = 47872 + a;
			e[47872 + a] = t[187][a]
		}
	t[188] =
		"�����������������������������������������������������������������퍪퍫퍬퍭퍮퍯퍰퍱퍲퍳퍴퍵퍶퍷퍸퍹퍺퍻퍾퍿펁펂펃펅펆펇������펈펉펊펋펎펒펓펔펕펖펗펚펛펝펞펟펡펢펣펤펥펦펧펪펬펮������펯펰펱펲펳펵펶펷펹펺펻펽펾펿폀폁폂폃폆폇폊폋폌폍폎폏폑폒폓폔폕폖샥샨샬샴샵샷샹섀섄섈섐섕서석섞섟선섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭�"
		.split("");
	for (a = 0; a != t[188].length; ++a)
		if (t[188][a].charCodeAt(0) !== 65533) {
			r[t[188][a]] = 48128 + a;
			e[48128 + a] = t[188][a]
		}
	t[189] =
		"�����������������������������������������������������������������폗폙폚폛폜폝폞폟폠폢폤폥폦폧폨폩폪폫폮폯폱폲폳폵폶폷������폸폹폺폻폾퐀퐂퐃퐄퐅퐆퐇퐉퐊퐋퐌퐍퐎퐏퐐퐑퐒퐓퐔퐕퐖������퐗퐘퐙퐚퐛퐜퐞퐟퐠퐡퐢퐣퐤퐥퐦퐧퐨퐩퐪퐫퐬퐭퐮퐯퐰퐱퐲퐳퐴퐵퐶퐷숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰�"
		.split("");
	for (a = 0; a != t[189].length; ++a)
		if (t[189][a].charCodeAt(0) !== 65533) {
			r[t[189][a]] = 48384 + a;
			e[48384 + a] = t[189][a]
		}
	t[190] =
		"�����������������������������������������������������������������퐸퐹퐺퐻퐼퐽퐾퐿푁푂푃푅푆푇푈푉푊푋푌푍푎푏푐푑푒푓������푔푕푖푗푘푙푚푛푝푞푟푡푢푣푥푦푧푨푩푪푫푬푮푰푱푲������푳푴푵푶푷푺푻푽푾풁풃풄풅풆풇풊풌풎풏풐풑풒풓풕풖풗풘풙풚풛풜풝쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄업없엇었엉엊엌엎�"
		.split("");
	for (a = 0; a != t[190].length; ++a)
		if (t[190][a].charCodeAt(0) !== 65533) {
			r[t[190][a]] = 48640 + a;
			e[48640 + a] = t[190][a]
		}
	t[191] =
		"�����������������������������������������������������������������풞풟풠풡풢풣풤풥풦풧풨풪풫풬풭풮풯풰풱풲풳풴풵풶풷풸������풹풺풻풼풽풾풿퓀퓁퓂퓃퓄퓅퓆퓇퓈퓉퓊퓋퓍퓎퓏퓑퓒퓓퓕������퓖퓗퓘퓙퓚퓛퓝퓞퓠퓡퓢퓣퓤퓥퓦퓧퓩퓪퓫퓭퓮퓯퓱퓲퓳퓴퓵퓶퓷퓹퓺퓼에엑엔엘엠엡엣엥여역엮연열엶엷염엽엾엿였영옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨�"
		.split("");
	for (a = 0; a != t[191].length; ++a)
		if (t[191][a].charCodeAt(0) !== 65533) {
			r[t[191][a]] = 48896 + a;
			e[48896 + a] = t[191][a]
		}
	t[192] =
		"�����������������������������������������������������������������퓾퓿픀픁픂픃픅픆픇픉픊픋픍픎픏픐픑픒픓픖픘픙픚픛픜픝������픞픟픠픡픢픣픤픥픦픧픨픩픪픫픬픭픮픯픰픱픲픳픴픵픶픷������픸픹픺픻픾픿핁핂핃핅핆핇핈핉핊핋핎핐핒핓핔핕핖핗핚핛핝핞핟핡핢핣웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응읒읓읔읕읖읗의읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊�"
		.split("");
	for (a = 0; a != t[192].length; ++a)
		if (t[192][a].charCodeAt(0) !== 65533) {
			r[t[192][a]] = 49152 + a;
			e[49152 + a] = t[192][a]
		}
	t[193] =
		"�����������������������������������������������������������������핤핦핧핪핬핮핯핰핱핲핳핶핷핹핺핻핽핾핿햀햁햂햃햆햊햋������햌햍햎햏햑햒햓햔햕햖햗햘햙햚햛햜햝햞햟햠햡햢햣햤햦햧������햨햩햪햫햬햭햮햯햰햱햲햳햴햵햶햷햸햹햺햻햼햽햾햿헀헁헂헃헄헅헆헇점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓�"
		.split("");
	for (a = 0; a != t[193].length; ++a)
		if (t[193][a].charCodeAt(0) !== 65533) {
			r[t[193][a]] = 49408 + a;
			e[49408 + a] = t[193][a]
		}
	t[194] =
		"�����������������������������������������������������������������헊헋헍헎헏헑헓헔헕헖헗헚헜헞헟헠헡헢헣헦헧헩헪헫헭헮������헯헰헱헲헳헶헸헺헻헼헽헾헿혂혃혅혆혇혉혊혋혌혍혎혏혒������혖혗혘혙혚혛혝혞혟혡혢혣혥혦혧혨혩혪혫혬혮혯혰혱혲혳혴혵혶혷혺혻징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻�"
		.split("");
	for (a = 0; a != t[194].length; ++a)
		if (t[194][a].charCodeAt(0) !== 65533) {
			r[t[194][a]] = 49664 + a;
			e[49664 + a] = t[194][a]
		}
	t[195] =
		"�����������������������������������������������������������������혽혾혿홁홂홃홄홆홇홊홌홎홏홐홒홓홖홗홙홚홛홝홞홟홠홡������홢홣홤홥홦홨홪홫홬홭홮홯홲홳홵홶홷홸홹홺홻홼홽홾홿횀������횁횂횄횆횇횈횉횊횋횎횏횑횒횓횕횖횗횘횙횚횛횜횞횠횢횣횤횥횦횧횩횪찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층�"
		.split("");
	for (a = 0; a != t[195].length; ++a)
		if (t[195][a].charCodeAt(0) !== 65533) {
			r[t[195][a]] = 49920 + a;
			e[49920 + a] = t[195][a]
		}
	t[196] =
		"�����������������������������������������������������������������횫횭횮횯횱횲횳횴횵횶횷횸횺횼횽횾횿훀훁훂훃훆훇훉훊훋������훍훎훏훐훒훓훕훖훘훚훛훜훝훞훟훡훢훣훥훦훧훩훪훫훬훭������훮훯훱훲훳훴훶훷훸훹훺훻훾훿휁휂휃휅휆휇휈휉휊휋휌휍휎휏휐휒휓휔치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼�"
		.split("");
	for (a = 0; a != t[196].length; ++a)
		if (t[196][a].charCodeAt(0) !== 65533) {
			r[t[196][a]] = 50176 + a;
			e[50176 + a] = t[196][a]
		}
	t[197] =
		"�����������������������������������������������������������������휕휖휗휚휛휝휞휟휡휢휣휤휥휦휧휪휬휮휯휰휱휲휳휶휷휹������휺휻휽휾휿흀흁흂흃흅흆흈흊흋흌흍흎흏흒흓흕흚흛흜흝흞������흟흢흤흦흧흨흪흫흭흮흯흱흲흳흵흶흷흸흹흺흻흾흿힀힂힃힄힅힆힇힊힋큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜�"
		.split("");
	for (a = 0; a != t[197].length; ++a)
		if (t[197][a].charCodeAt(0) !== 65533) {
			r[t[197][a]] = 50432 + a;
			e[50432 + a] = t[197][a]
		}
	t[198] =
		"�����������������������������������������������������������������힍힎힏힑힒힓힔힕힖힗힚힜힞힟힠힡힢힣������������������������������������������������������������������������������퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁�"
		.split("");
	for (a = 0; a != t[198].length; ++a)
		if (t[198][a].charCodeAt(0) !== 65533) {
			r[t[198][a]] = 50688 + a;
			e[50688 + a] = t[198][a]
		}
	t[199] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠�"
		.split("");
	for (a = 0; a != t[199].length; ++a)
		if (t[199][a].charCodeAt(0) !== 65533) {
			r[t[199][a]] = 50944 + a;
			e[50944 + a] = t[199][a]
		}
	t[200] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝�"
		.split("");
	for (a = 0; a != t[200].length; ++a)
		if (t[200][a].charCodeAt(0) !== 65533) {
			r[t[200][a]] = 51200 + a;
			e[51200 + a] = t[200][a]
		}
	t[202] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������伽佳假價加可呵哥嘉嫁家暇架枷柯歌珂痂稼苛茄街袈訶賈跏軻迦駕刻却各恪慤殼珏脚覺角閣侃刊墾奸姦干幹懇揀杆柬桿澗癎看磵稈竿簡肝艮艱諫間乫喝曷渴碣竭葛褐蝎鞨勘坎堪嵌感憾戡敢柑橄減甘疳監瞰紺邯鑑鑒龕�"
		.split("");
	for (a = 0; a != t[202].length; ++a)
		if (t[202][a].charCodeAt(0) !== 65533) {
			r[t[202][a]] = 51712 + a;
			e[51712 + a] = t[202][a]
		}
	t[203] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������匣岬甲胛鉀閘剛堈姜岡崗康强彊慷江畺疆糠絳綱羌腔舡薑襁講鋼降鱇介价個凱塏愷愾慨改槪漑疥皆盖箇芥蓋豈鎧開喀客坑更粳羹醵倨去居巨拒据據擧渠炬祛距踞車遽鉅鋸乾件健巾建愆楗腱虔蹇鍵騫乞傑杰桀儉劍劒檢�"
		.split("");
	for (a = 0; a != t[203].length; ++a)
		if (t[203][a].charCodeAt(0) !== 65533) {
			r[t[203][a]] = 51968 + a;
			e[51968 + a] = t[203][a]
		}
	t[204] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������瞼鈐黔劫怯迲偈憩揭擊格檄激膈覡隔堅牽犬甄絹繭肩見譴遣鵑抉決潔結缺訣兼慊箝謙鉗鎌京俓倞傾儆勁勍卿坰境庚徑慶憬擎敬景暻更梗涇炅烱璟璥瓊痙硬磬竟競絅經耕耿脛莖警輕逕鏡頃頸驚鯨係啓堺契季屆悸戒桂械�"
		.split("");
	for (a = 0; a != t[204].length; ++a)
		if (t[204][a].charCodeAt(0) !== 65533) {
			r[t[204][a]] = 52224 + a;
			e[52224 + a] = t[204][a]
		}
	t[205] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������棨溪界癸磎稽系繫繼計誡谿階鷄古叩告呱固姑孤尻庫拷攷故敲暠枯槁沽痼皐睾稿羔考股膏苦苽菰藁蠱袴誥賈辜錮雇顧高鼓哭斛曲梏穀谷鵠困坤崑昆梱棍滾琨袞鯤汨滑骨供公共功孔工恐恭拱控攻珙空蚣貢鞏串寡戈果瓜�"
		.split("");
	for (a = 0; a != t[205].length; ++a)
		if (t[205][a].charCodeAt(0) !== 65533) {
			r[t[205][a]] = 52480 + a;
			e[52480 + a] = t[205][a]
		}
	t[206] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������科菓誇課跨過鍋顆廓槨藿郭串冠官寬慣棺款灌琯瓘管罐菅觀貫關館刮恝括适侊光匡壙廣曠洸炚狂珖筐胱鑛卦掛罫乖傀塊壞怪愧拐槐魁宏紘肱轟交僑咬喬嬌嶠巧攪敎校橋狡皎矯絞翹膠蕎蛟較轎郊餃驕鮫丘久九仇俱具勾�"
		.split("");
	for (a = 0; a != t[206].length; ++a)
		if (t[206][a].charCodeAt(0) !== 65533) {
			r[t[206][a]] = 52736 + a;
			e[52736 + a] = t[206][a]
		}
	t[207] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������區口句咎嘔坵垢寇嶇廐懼拘救枸柩構歐毆毬求溝灸狗玖球瞿矩究絿耉臼舅舊苟衢謳購軀逑邱鉤銶駒驅鳩鷗龜國局菊鞠鞫麴君窘群裙軍郡堀屈掘窟宮弓穹窮芎躬倦券勸卷圈拳捲權淃眷厥獗蕨蹶闕机櫃潰詭軌饋句晷歸貴�"
		.split("");
	for (a = 0; a != t[207].length; ++a)
		if (t[207][a].charCodeAt(0) !== 65533) {
			r[t[207][a]] = 52992 + a;
			e[52992 + a] = t[207][a]
		}
	t[208] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������鬼龜叫圭奎揆槻珪硅窺竅糾葵規赳逵閨勻均畇筠菌鈞龜橘克剋劇戟棘極隙僅劤勤懃斤根槿瑾筋芹菫覲謹近饉契今妗擒昑檎琴禁禽芩衾衿襟金錦伋及急扱汲級給亘兢矜肯企伎其冀嗜器圻基埼夔奇妓寄岐崎己幾忌技旗旣�"
		.split("");
	for (a = 0; a != t[208].length; ++a)
		if (t[208][a].charCodeAt(0) !== 65533) {
			r[t[208][a]] = 53248 + a;
			e[53248 + a] = t[208][a]
		}
	t[209] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������朞期杞棋棄機欺氣汽沂淇玘琦琪璂璣畸畿碁磯祁祇祈祺箕紀綺羈耆耭肌記譏豈起錡錤飢饑騎騏驥麒緊佶吉拮桔金喫儺喇奈娜懦懶拏拿癩羅蘿螺裸邏那樂洛烙珞落諾酪駱亂卵暖欄煖爛蘭難鸞捏捺南嵐枏楠湳濫男藍襤拉�"
		.split("");
	for (a = 0; a != t[209].length; ++a)
		if (t[209][a].charCodeAt(0) !== 65533) {
			r[t[209][a]] = 53504 + a;
			e[53504 + a] = t[209][a]
		}
	t[210] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������納臘蠟衲囊娘廊朗浪狼郎乃來內奈柰耐冷女年撚秊念恬拈捻寧寗努勞奴弩怒擄櫓爐瑙盧老蘆虜路露駑魯鷺碌祿綠菉錄鹿論壟弄濃籠聾膿農惱牢磊腦賂雷尿壘屢樓淚漏累縷陋嫩訥杻紐勒肋凜凌稜綾能菱陵尼泥匿溺多茶�"
		.split("");
	for (a = 0; a != t[210].length; ++a)
		if (t[210][a].charCodeAt(0) !== 65533) {
			r[t[210][a]] = 53760 + a;
			e[53760 + a] = t[210][a]
		}
	t[211] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������丹亶但單團壇彖斷旦檀段湍短端簞緞蛋袒鄲鍛撻澾獺疸達啖坍憺擔曇淡湛潭澹痰聃膽蕁覃談譚錟沓畓答踏遝唐堂塘幢戇撞棠當糖螳黨代垈坮大對岱帶待戴擡玳臺袋貸隊黛宅德悳倒刀到圖堵塗導屠島嶋度徒悼挑掉搗桃�"
		.split("");
	for (a = 0; a != t[211].length; ++a)
		if (t[211][a].charCodeAt(0) !== 65533) {
			r[t[211][a]] = 54016 + a;
			e[54016 + a] = t[211][a]
		}
	t[212] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������棹櫂淘渡滔濤燾盜睹禱稻萄覩賭跳蹈逃途道都鍍陶韜毒瀆牘犢獨督禿篤纛讀墩惇敦旽暾沌焞燉豚頓乭突仝冬凍動同憧東桐棟洞潼疼瞳童胴董銅兜斗杜枓痘竇荳讀豆逗頭屯臀芚遁遯鈍得嶝橙燈登等藤謄鄧騰喇懶拏癩羅�"
		.split("");
	for (a = 0; a != t[212].length; ++a)
		if (t[212][a].charCodeAt(0) !== 65533) {
			r[t[212][a]] = 54272 + a;
			e[54272 + a] = t[212][a]
		}
	t[213] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������蘿螺裸邏樂洛烙珞絡落諾酪駱丹亂卵欄欒瀾爛蘭鸞剌辣嵐擥攬欖濫籃纜藍襤覽拉臘蠟廊朗浪狼琅瑯螂郞來崍徠萊冷掠略亮倆兩凉梁樑粮粱糧良諒輛量侶儷勵呂廬慮戾旅櫚濾礪藜蠣閭驢驪麗黎力曆歷瀝礫轢靂憐戀攣漣�"
		.split("");
	for (a = 0; a != t[213].length; ++a)
		if (t[213][a].charCodeAt(0) !== 65533) {
			r[t[213][a]] = 54528 + a;
			e[54528 + a] = t[213][a]
		}
	t[214] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������煉璉練聯蓮輦連鍊冽列劣洌烈裂廉斂殮濂簾獵令伶囹寧岺嶺怜玲笭羚翎聆逞鈴零靈領齡例澧禮醴隷勞怒撈擄櫓潞瀘爐盧老蘆虜路輅露魯鷺鹵碌祿綠菉錄鹿麓論壟弄朧瀧瓏籠聾儡瀨牢磊賂賚賴雷了僚寮廖料燎療瞭聊蓼�"
		.split("");
	for (a = 0; a != t[214].length; ++a)
		if (t[214][a].charCodeAt(0) !== 65533) {
			r[t[214][a]] = 54784 + a;
			e[54784 + a] = t[214][a]
		}
	t[215] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������遼鬧龍壘婁屢樓淚漏瘻累縷蔞褸鏤陋劉旒柳榴流溜瀏琉瑠留瘤硫謬類六戮陸侖倫崙淪綸輪律慄栗率隆勒肋凜凌楞稜綾菱陵俚利厘吏唎履悧李梨浬犁狸理璃異痢籬罹羸莉裏裡里釐離鯉吝潾燐璘藺躪隣鱗麟林淋琳臨霖砬�"
		.split("");
	for (a = 0; a != t[215].length; ++a)
		if (t[215][a].charCodeAt(0) !== 65533) {
			r[t[215][a]] = 55040 + a;
			e[55040 + a] = t[215][a]
		}
	t[216] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������立笠粒摩瑪痲碼磨馬魔麻寞幕漠膜莫邈万卍娩巒彎慢挽晩曼滿漫灣瞞萬蔓蠻輓饅鰻唜抹末沫茉襪靺亡妄忘忙望網罔芒茫莽輞邙埋妹媒寐昧枚梅每煤罵買賣邁魅脈貊陌驀麥孟氓猛盲盟萌冪覓免冕勉棉沔眄眠綿緬面麵滅�"
		.split("");
	for (a = 0; a != t[216].length; ++a)
		if (t[216][a].charCodeAt(0) !== 65533) {
			r[t[216][a]] = 55296 + a;
			e[55296 + a] = t[216][a]
		}
	t[217] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������蔑冥名命明暝椧溟皿瞑茗蓂螟酩銘鳴袂侮冒募姆帽慕摸摹暮某模母毛牟牡瑁眸矛耗芼茅謀謨貌木沐牧目睦穆鶩歿沒夢朦蒙卯墓妙廟描昴杳渺猫竗苗錨務巫憮懋戊拇撫无楙武毋無珷畝繆舞茂蕪誣貿霧鵡墨默們刎吻問文�"
		.split("");
	for (a = 0; a != t[217].length; ++a)
		if (t[217][a].charCodeAt(0) !== 65533) {
			r[t[217][a]] = 55552 + a;
			e[55552 + a] = t[217][a]
		}
	t[218] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������汶紊紋聞蚊門雯勿沕物味媚尾嵋彌微未梶楣渼湄眉米美薇謎迷靡黴岷悶愍憫敏旻旼民泯玟珉緡閔密蜜謐剝博拍搏撲朴樸泊珀璞箔粕縛膊舶薄迫雹駁伴半反叛拌搬攀斑槃泮潘班畔瘢盤盼磐磻礬絆般蟠返頒飯勃拔撥渤潑�"
		.split("");
	for (a = 0; a != t[218].length; ++a)
		if (t[218][a].charCodeAt(0) !== 65533) {
			r[t[218][a]] = 55808 + a;
			e[55808 + a] = t[218][a]
		}
	t[219] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������發跋醱鉢髮魃倣傍坊妨尨幇彷房放方旁昉枋榜滂磅紡肪膀舫芳蒡蚌訪謗邦防龐倍俳北培徘拜排杯湃焙盃背胚裴裵褙賠輩配陪伯佰帛柏栢白百魄幡樊煩燔番磻繁蕃藩飜伐筏罰閥凡帆梵氾汎泛犯範范法琺僻劈壁擘檗璧癖�"
		.split("");
	for (a = 0; a != t[219].length; ++a)
		if (t[219][a].charCodeAt(0) !== 65533) {
			r[t[219][a]] = 56064 + a;
			e[56064 + a] = t[219][a]
		}
	t[220] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������碧蘗闢霹便卞弁變辨辯邊別瞥鱉鼈丙倂兵屛幷昞昺柄棅炳甁病秉竝輧餠騈保堡報寶普步洑湺潽珤甫菩補褓譜輔伏僕匐卜宓復服福腹茯蔔複覆輹輻馥鰒本乶俸奉封峯峰捧棒烽熢琫縫蓬蜂逢鋒鳳不付俯傅剖副否咐埠夫婦�"
		.split("");
	for (a = 0; a != t[220].length; ++a)
		if (t[220][a].charCodeAt(0) !== 65533) {
			r[t[220][a]] = 56320 + a;
			e[56320 + a] = t[220][a]
		}
	t[221] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������孚孵富府復扶敷斧浮溥父符簿缶腐腑膚艀芙莩訃負賦賻赴趺部釜阜附駙鳧北分吩噴墳奔奮忿憤扮昐汾焚盆粉糞紛芬賁雰不佛弗彿拂崩朋棚硼繃鵬丕備匕匪卑妃婢庇悲憊扉批斐枇榧比毖毗毘沸泌琵痺砒碑秕秘粃緋翡肥�"
		.split("");
	for (a = 0; a != t[221].length; ++a)
		if (t[221][a].charCodeAt(0) !== 65533) {
			r[t[221][a]] = 56576 + a;
			e[56576 + a] = t[221][a]
		}
	t[222] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������脾臂菲蜚裨誹譬費鄙非飛鼻嚬嬪彬斌檳殯浜濱瀕牝玭貧賓頻憑氷聘騁乍事些仕伺似使俟僿史司唆嗣四士奢娑寫寺射巳師徙思捨斜斯柶査梭死沙泗渣瀉獅砂社祀祠私篩紗絲肆舍莎蓑蛇裟詐詞謝賜赦辭邪飼駟麝削數朔索�"
		.split("");
	for (a = 0; a != t[222].length; ++a)
		if (t[222][a].charCodeAt(0) !== 65533) {
			r[t[222][a]] = 56832 + a;
			e[56832 + a] = t[222][a]
		}
	t[223] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������傘刪山散汕珊産疝算蒜酸霰乷撒殺煞薩三參杉森渗芟蔘衫揷澁鈒颯上傷像償商喪嘗孀尙峠常床庠廂想桑橡湘爽牀狀相祥箱翔裳觴詳象賞霜塞璽賽嗇塞穡索色牲生甥省笙墅壻嶼序庶徐恕抒捿敍暑曙書栖棲犀瑞筮絮緖署�"
		.split("");
	for (a = 0; a != t[223].length; ++a)
		if (t[223][a].charCodeAt(0) !== 65533) {
			r[t[223][a]] = 57088 + a;
			e[57088 + a] = t[223][a]
		}
	t[224] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������胥舒薯西誓逝鋤黍鼠夕奭席惜昔晳析汐淅潟石碩蓆釋錫仙僊先善嬋宣扇敾旋渲煽琁瑄璇璿癬禪線繕羨腺膳船蘚蟬詵跣選銑鐥饍鮮卨屑楔泄洩渫舌薛褻設說雪齧剡暹殲纖蟾贍閃陝攝涉燮葉城姓宬性惺成星晟猩珹盛省筬�"
		.split("");
	for (a = 0; a != t[224].length; ++a)
		if (t[224][a].charCodeAt(0) !== 65533) {
			r[t[224][a]] = 57344 + a;
			e[57344 + a] = t[224][a]
		}
	t[225] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������聖聲腥誠醒世勢歲洗稅笹細說貰召嘯塑宵小少巢所掃搔昭梳沼消溯瀟炤燒甦疏疎瘙笑篠簫素紹蔬蕭蘇訴逍遡邵銷韶騷俗屬束涑粟續謖贖速孫巽損蓀遜飡率宋悚松淞訟誦送頌刷殺灑碎鎖衰釗修受嗽囚垂壽嫂守岫峀帥愁�"
		.split("");
	for (a = 0; a != t[225].length; ++a)
		if (t[225][a].charCodeAt(0) !== 65533) {
			r[t[225][a]] = 57600 + a;
			e[57600 + a] = t[225][a]
		}
	t[226] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������戍手授搜收數樹殊水洙漱燧狩獸琇璲瘦睡秀穗竪粹綏綬繡羞脩茱蒐蓚藪袖誰讐輸遂邃酬銖銹隋隧隨雖需須首髓鬚叔塾夙孰宿淑潚熟琡璹肅菽巡徇循恂旬栒楯橓殉洵淳珣盾瞬筍純脣舜荀蓴蕣詢諄醇錞順馴戌術述鉥崇崧�"
		.split("");
	for (a = 0; a != t[226].length; ++a)
		if (t[226][a].charCodeAt(0) !== 65533) {
			r[t[226][a]] = 57856 + a;
			e[57856 + a] = t[226][a]
		}
	t[227] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������嵩瑟膝蝨濕拾習褶襲丞乘僧勝升承昇繩蠅陞侍匙嘶始媤尸屎屍市弑恃施是時枾柴猜矢示翅蒔蓍視試詩諡豕豺埴寔式息拭植殖湜熄篒蝕識軾食飾伸侁信呻娠宸愼新晨燼申神紳腎臣莘薪藎蜃訊身辛辰迅失室實悉審尋心沁�"
		.split("");
	for (a = 0; a != t[227].length; ++a)
		if (t[227][a].charCodeAt(0) !== 65533) {
			r[t[227][a]] = 58112 + a;
			e[58112 + a] = t[227][a]
		}
	t[228] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������沈深瀋甚芯諶什十拾雙氏亞俄兒啞娥峨我牙芽莪蛾衙訝阿雅餓鴉鵝堊岳嶽幄惡愕握樂渥鄂鍔顎鰐齷安岸按晏案眼雁鞍顔鮟斡謁軋閼唵岩巖庵暗癌菴闇壓押狎鴨仰央怏昻殃秧鴦厓哀埃崖愛曖涯碍艾隘靄厄扼掖液縊腋額�"
		.split("");
	for (a = 0; a != t[228].length; ++a)
		if (t[228][a].charCodeAt(0) !== 65533) {
			r[t[228][a]] = 58368 + a;
			e[58368 + a] = t[228][a]
		}
	t[229] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������櫻罌鶯鸚也倻冶夜惹揶椰爺耶若野弱掠略約若葯蒻藥躍亮佯兩凉壤孃恙揚攘敭暘梁楊樣洋瀁煬痒瘍禳穰糧羊良襄諒讓釀陽量養圄御於漁瘀禦語馭魚齬億憶抑檍臆偃堰彦焉言諺孼蘖俺儼嚴奄掩淹嶪業円予余勵呂女如廬�"
		.split("");
	for (a = 0; a != t[229].length; ++a)
		if (t[229][a].charCodeAt(0) !== 65533) {
			r[t[229][a]] = 58624 + a;
			e[58624 + a] = t[229][a]
		}
	t[230] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������旅歟汝濾璵礖礪與艅茹輿轝閭餘驪麗黎亦力域役易曆歷疫繹譯轢逆驛嚥堧姸娟宴年延憐戀捐挻撚椽沇沿涎涓淵演漣烟然煙煉燃燕璉硏硯秊筵緣練縯聯衍軟輦蓮連鉛鍊鳶列劣咽悅涅烈熱裂說閱厭廉念捻染殮炎焰琰艶苒�"
		.split("");
	for (a = 0; a != t[230].length; ++a)
		if (t[230][a].charCodeAt(0) !== 65533) {
			r[t[230][a]] = 58880 + a;
			e[58880 + a] = t[230][a]
		}
	t[231] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������簾閻髥鹽曄獵燁葉令囹塋寧嶺嶸影怜映暎楹榮永泳渶潁濚瀛瀯煐營獰玲瑛瑩瓔盈穎纓羚聆英詠迎鈴鍈零霙靈領乂倪例刈叡曳汭濊猊睿穢芮藝蘂禮裔詣譽豫醴銳隸霓預五伍俉傲午吾吳嗚塢墺奧娛寤悟惡懊敖旿晤梧汚澳�"
		.split("");
	for (a = 0; a != t[231].length; ++a)
		if (t[231][a].charCodeAt(0) !== 65533) {
			r[t[231][a]] = 59136 + a;
			e[59136 + a] = t[231][a]
		}
	t[232] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������烏熬獒筽蜈誤鰲鼇屋沃獄玉鈺溫瑥瘟穩縕蘊兀壅擁瓮甕癰翁邕雍饔渦瓦窩窪臥蛙蝸訛婉完宛梡椀浣玩琓琬碗緩翫脘腕莞豌阮頑曰往旺枉汪王倭娃歪矮外嵬巍猥畏了僚僥凹堯夭妖姚寥寮尿嶢拗搖撓擾料曜樂橈燎燿瑤療�"
		.split("");
	for (a = 0; a != t[232].length; ++a)
		if (t[232][a].charCodeAt(0) !== 65533) {
			r[t[232][a]] = 59392 + a;
			e[59392 + a] = t[232][a]
		}
	t[233] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������窈窯繇繞耀腰蓼蟯要謠遙遼邀饒慾欲浴縟褥辱俑傭冗勇埇墉容庸慂榕涌湧溶熔瑢用甬聳茸蓉踊鎔鏞龍于佑偶優又友右宇寓尤愚憂旴牛玗瑀盂祐禑禹紆羽芋藕虞迂遇郵釪隅雨雩勖彧旭昱栯煜稶郁頊云暈橒殞澐熉耘芸蕓�"
		.split("");
	for (a = 0; a != t[233].length; ++a)
		if (t[233][a].charCodeAt(0) !== 65533) {
			r[t[233][a]] = 59648 + a;
			e[59648 + a] = t[233][a]
		}
	t[234] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������運隕雲韻蔚鬱亐熊雄元原員圓園垣媛嫄寃怨愿援沅洹湲源爰猿瑗苑袁轅遠阮院願鴛月越鉞位偉僞危圍委威尉慰暐渭爲瑋緯胃萎葦蔿蝟衛褘謂違韋魏乳侑儒兪劉唯喩孺宥幼幽庾悠惟愈愉揄攸有杻柔柚柳楡楢油洧流游溜�"
		.split("");
	for (a = 0; a != t[234].length; ++a)
		if (t[234][a].charCodeAt(0) !== 65533) {
			r[t[234][a]] = 59904 + a;
			e[59904 + a] = t[234][a]
		}
	t[235] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������濡猶猷琉瑜由留癒硫紐維臾萸裕誘諛諭踰蹂遊逾遺酉釉鍮類六堉戮毓肉育陸倫允奫尹崙淪潤玧胤贇輪鈗閏律慄栗率聿戎瀜絨融隆垠恩慇殷誾銀隱乙吟淫蔭陰音飮揖泣邑凝應膺鷹依倚儀宜意懿擬椅毅疑矣義艤薏蟻衣誼�"
		.split("");
	for (a = 0; a != t[235].length; ++a)
		if (t[235][a].charCodeAt(0) !== 65533) {
			r[t[235][a]] = 60160 + a;
			e[60160 + a] = t[235][a]
		}
	t[236] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������議醫二以伊利吏夷姨履已弛彛怡易李梨泥爾珥理異痍痢移罹而耳肄苡荑裏裡貽貳邇里離飴餌匿溺瀷益翊翌翼謚人仁刃印吝咽因姻寅引忍湮燐璘絪茵藺蚓認隣靭靷鱗麟一佚佾壹日溢逸鎰馹任壬妊姙恁林淋稔臨荏賃入卄�"
		.split("");
	for (a = 0; a != t[236].length; ++a)
		if (t[236][a].charCodeAt(0) !== 65533) {
			r[t[236][a]] = 60416 + a;
			e[60416 + a] = t[236][a]
		}
	t[237] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������立笠粒仍剩孕芿仔刺咨姉姿子字孜恣慈滋炙煮玆瓷疵磁紫者自茨蔗藉諮資雌作勺嚼斫昨灼炸爵綽芍酌雀鵲孱棧殘潺盞岑暫潛箴簪蠶雜丈仗匠場墻壯奬將帳庄張掌暲杖樟檣欌漿牆狀獐璋章粧腸臟臧莊葬蔣薔藏裝贓醬長�"
		.split("");
	for (a = 0; a != t[237].length; ++a)
		if (t[237][a].charCodeAt(0) !== 65533) {
			r[t[237][a]] = 60672 + a;
			e[60672 + a] = t[237][a]
		}
	t[238] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������障再哉在宰才材栽梓渽滓災縡裁財載齋齎爭箏諍錚佇低儲咀姐底抵杵楮樗沮渚狙猪疽箸紵苧菹著藷詛貯躇這邸雎齟勣吊嫡寂摘敵滴狄炙的積笛籍績翟荻謫賊赤跡蹟迪迹適鏑佃佺傳全典前剪塡塼奠專展廛悛戰栓殿氈澱�"
		.split("");
	for (a = 0; a != t[238].length; ++a)
		if (t[238][a].charCodeAt(0) !== 65533) {
			r[t[238][a]] = 60928 + a;
			e[60928 + a] = t[238][a]
		}
	t[239] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������煎琠田甸畑癲筌箋箭篆纏詮輾轉鈿銓錢鐫電顚顫餞切截折浙癤竊節絶占岾店漸点粘霑鮎點接摺蝶丁井亭停偵呈姃定幀庭廷征情挺政整旌晶晸柾楨檉正汀淀淨渟湞瀞炡玎珽町睛碇禎程穽精綎艇訂諪貞鄭酊釘鉦鋌錠霆靖�"
		.split("");
	for (a = 0; a != t[239].length; ++a)
		if (t[239][a].charCodeAt(0) !== 65533) {
			r[t[239][a]] = 61184 + a;
			e[61184 + a] = t[239][a]
		}
	t[240] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������靜頂鼎制劑啼堤帝弟悌提梯濟祭第臍薺製諸蹄醍除際霽題齊俎兆凋助嘲弔彫措操早晁曺曹朝條棗槽漕潮照燥爪璪眺祖祚租稠窕粗糟組繰肇藻蚤詔調趙躁造遭釣阻雕鳥族簇足鏃存尊卒拙猝倧宗從悰慫棕淙琮種終綜縱腫�"
		.split("");
	for (a = 0; a != t[240].length; ++a)
		if (t[240][a].charCodeAt(0) !== 65533) {
			r[t[240][a]] = 61440 + a;
			e[61440 + a] = t[240][a]
		}
	t[241] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������踪踵鍾鐘佐坐左座挫罪主住侏做姝胄呪周嗾奏宙州廚晝朱柱株注洲湊澍炷珠疇籌紂紬綢舟蛛註誅走躊輳週酎酒鑄駐竹粥俊儁准埈寯峻晙樽浚準濬焌畯竣蠢逡遵雋駿茁中仲衆重卽櫛楫汁葺增憎曾拯烝甑症繒蒸證贈之只�"
		.split("");
	for (a = 0; a != t[241].length; ++a)
		if (t[241][a].charCodeAt(0) !== 65533) {
			r[t[241][a]] = 61696 + a;
			e[61696 + a] = t[241][a]
		}
	t[242] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������咫地址志持指摯支旨智枝枳止池沚漬知砥祉祗紙肢脂至芝芷蜘誌識贄趾遲直稙稷織職唇嗔塵振搢晉晋桭榛殄津溱珍瑨璡畛疹盡眞瞋秦縉縝臻蔯袗診賑軫辰進鎭陣陳震侄叱姪嫉帙桎瓆疾秩窒膣蛭質跌迭斟朕什執潗緝輯�"
		.split("");
	for (a = 0; a != t[242].length; ++a)
		if (t[242][a].charCodeAt(0) !== 65533) {
			r[t[242][a]] = 61952 + a;
			e[61952 + a] = t[242][a]
		}
	t[243] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������鏶集徵懲澄且侘借叉嗟嵯差次此磋箚茶蹉車遮捉搾着窄錯鑿齪撰澯燦璨瓚竄簒纂粲纘讚贊鑽餐饌刹察擦札紮僭參塹慘慙懺斬站讒讖倉倡創唱娼廠彰愴敞昌昶暢槍滄漲猖瘡窓脹艙菖蒼債埰寀寨彩採砦綵菜蔡采釵冊柵策�"
		.split("");
	for (a = 0; a != t[243].length; ++a)
		if (t[243][a].charCodeAt(0) !== 65533) {
			r[t[243][a]] = 62208 + a;
			e[62208 + a] = t[243][a]
		}
	t[244] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������責凄妻悽處倜刺剔尺慽戚拓擲斥滌瘠脊蹠陟隻仟千喘天川擅泉淺玔穿舛薦賤踐遷釧闡阡韆凸哲喆徹撤澈綴輟轍鐵僉尖沾添甛瞻簽籤詹諂堞妾帖捷牒疊睫諜貼輒廳晴淸聽菁請靑鯖切剃替涕滯締諦逮遞體初剿哨憔抄招梢�"
		.split("");
	for (a = 0; a != t[244].length; ++a)
		if (t[244][a].charCodeAt(0) !== 65533) {
			r[t[244][a]] = 62464 + a;
			e[62464 + a] = t[244][a]
		}
	t[245] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������椒楚樵炒焦硝礁礎秒稍肖艸苕草蕉貂超酢醋醮促囑燭矗蜀觸寸忖村邨叢塚寵悤憁摠總聰蔥銃撮催崔最墜抽推椎楸樞湫皺秋芻萩諏趨追鄒酋醜錐錘鎚雛騶鰍丑畜祝竺筑築縮蓄蹙蹴軸逐春椿瑃出朮黜充忠沖蟲衝衷悴膵萃�"
		.split("");
	for (a = 0; a != t[245].length; ++a)
		if (t[245][a].charCodeAt(0) !== 65533) {
			r[t[245][a]] = 62720 + a;
			e[62720 + a] = t[245][a]
		}
	t[246] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������贅取吹嘴娶就炊翠聚脆臭趣醉驟鷲側仄厠惻測層侈値嗤峙幟恥梔治淄熾痔痴癡稚穉緇緻置致蚩輜雉馳齒則勅飭親七柒漆侵寢枕沈浸琛砧針鍼蟄秤稱快他咤唾墮妥惰打拖朶楕舵陀馱駝倬卓啄坼度托拓擢晫柝濁濯琢琸託�"
		.split("");
	for (a = 0; a != t[246].length; ++a)
		if (t[246][a].charCodeAt(0) !== 65533) {
			r[t[246][a]] = 62976 + a;
			e[62976 + a] = t[246][a]
		}
	t[247] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������鐸呑嘆坦彈憚歎灘炭綻誕奪脫探眈耽貪塔搭榻宕帑湯糖蕩兌台太怠態殆汰泰笞胎苔跆邰颱宅擇澤撑攄兎吐土討慟桶洞痛筒統通堆槌腿褪退頹偸套妬投透鬪慝特闖坡婆巴把播擺杷波派爬琶破罷芭跛頗判坂板版瓣販辦鈑�"
		.split("");
	for (a = 0; a != t[247].length; ++a)
		if (t[247][a].charCodeAt(0) !== 65533) {
			r[t[247][a]] = 63232 + a;
			e[63232 + a] = t[247][a]
		}
	t[248] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������阪八叭捌佩唄悖敗沛浿牌狽稗覇貝彭澎烹膨愎便偏扁片篇編翩遍鞭騙貶坪平枰萍評吠嬖幣廢弊斃肺蔽閉陛佈包匍匏咆哺圃布怖抛抱捕暴泡浦疱砲胞脯苞葡蒲袍褒逋鋪飽鮑幅暴曝瀑爆輻俵剽彪慓杓標漂瓢票表豹飇飄驃�"
		.split("");
	for (a = 0; a != t[248].length; ++a)
		if (t[248][a].charCodeAt(0) !== 65533) {
			r[t[248][a]] = 63488 + a;
			e[63488 + a] = t[248][a]
		}
	t[249] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������品稟楓諷豊風馮彼披疲皮被避陂匹弼必泌珌畢疋筆苾馝乏逼下何厦夏廈昰河瑕荷蝦賀遐霞鰕壑學虐謔鶴寒恨悍旱汗漢澣瀚罕翰閑閒限韓割轄函含咸啣喊檻涵緘艦銜陷鹹合哈盒蛤閤闔陜亢伉姮嫦巷恒抗杭桁沆港缸肛航�"
		.split("");
	for (a = 0; a != t[249].length; ++a)
		if (t[249][a].charCodeAt(0) !== 65533) {
			r[t[249][a]] = 63744 + a;
			e[63744 + a] = t[249][a]
		}
	t[250] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������行降項亥偕咳垓奚孩害懈楷海瀣蟹解該諧邂駭骸劾核倖幸杏荇行享向嚮珦鄕響餉饗香噓墟虛許憲櫶獻軒歇險驗奕爀赫革俔峴弦懸晛泫炫玄玹現眩睍絃絢縣舷衒見賢鉉顯孑穴血頁嫌俠協夾峽挾浹狹脅脇莢鋏頰亨兄刑型�"
		.split("");
	for (a = 0; a != t[250].length; ++a)
		if (t[250][a].charCodeAt(0) !== 65533) {
			r[t[250][a]] = 64e3 + a;
			e[64e3 + a] = t[250][a]
		}
	t[251] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������形泂滎瀅灐炯熒珩瑩荊螢衡逈邢鎣馨兮彗惠慧暳蕙蹊醯鞋乎互呼壕壺好岵弧戶扈昊晧毫浩淏湖滸澔濠濩灝狐琥瑚瓠皓祜糊縞胡芦葫蒿虎號蝴護豪鎬頀顥惑或酷婚昏混渾琿魂忽惚笏哄弘汞泓洪烘紅虹訌鴻化和嬅樺火畵�"
		.split("");
	for (a = 0; a != t[251].length; ++a)
		if (t[251][a].charCodeAt(0) !== 65533) {
			r[t[251][a]] = 64256 + a;
			e[64256 + a] = t[251][a]
		}
	t[252] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������禍禾花華話譁貨靴廓擴攫確碻穫丸喚奐宦幻患換歡晥桓渙煥環紈還驩鰥活滑猾豁闊凰幌徨恍惶愰慌晃晄榥況湟滉潢煌璜皇篁簧荒蝗遑隍黃匯回廻徊恢悔懷晦會檜淮澮灰獪繪膾茴蛔誨賄劃獲宖橫鐄哮嚆孝效斅曉梟涍淆�"
		.split("");
	for (a = 0; a != t[252].length; ++a)
		if (t[252][a].charCodeAt(0) !== 65533) {
			r[t[252][a]] = 64512 + a;
			e[64512 + a] = t[252][a]
		}
	t[253] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������爻肴酵驍侯候厚后吼喉嗅帿後朽煦珝逅勛勳塤壎焄熏燻薰訓暈薨喧暄煊萱卉喙毁彙徽揮暉煇諱輝麾休携烋畦虧恤譎鷸兇凶匈洶胸黑昕欣炘痕吃屹紇訖欠欽歆吸恰洽翕興僖凞喜噫囍姬嬉希憙憘戱晞曦熙熹熺犧禧稀羲詰�"
		.split("");
	for (a = 0; a != t[253].length; ++a)
		if (t[253][a].charCodeAt(0) !== 65533) {
			r[t[253][a]] = 64768 + a;
			e[64768 + a] = t[253][a]
		}
	return {
		enc: r,
		dec: e
	}
}();
cptable[950] = function() {
	var e = [],
		r = {},
		t = [],
		a;
	t[0] =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~��������������������������������������������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[0].length; ++a)
		if (t[0][a].charCodeAt(0) !== 65533) {
			r[t[0][a]] = 0 + a;
			e[0 + a] = t[0][a]
		}
	t[161] =
		"����������������������������������������������������������������　，、。．‧；：？！︰…‥﹐﹑﹒·﹔﹕﹖﹗｜–︱—︳╴︴﹏（）︵︶｛｝︷︸〔〕︹︺【】︻︼《》︽︾〈〉︿﹀「」﹁﹂『』﹃﹄﹙﹚����������������������������������﹛﹜﹝﹞‘’“”〝〞‵′＃＆＊※§〃○●△▲◎☆★◇◆□■▽▼㊣℅¯￣＿ˍ﹉﹊﹍﹎﹋﹌﹟﹠﹡＋－×÷±√＜＞＝≦≧≠∞≒≡﹢﹣﹤﹥﹦～∩∪⊥∠∟⊿㏒㏑∫∮∵∴♀♂⊕⊙↑↓←→↖↗↙↘∥∣／�"
		.split("");
	for (a = 0; a != t[161].length; ++a)
		if (t[161][a].charCodeAt(0) !== 65533) {
			r[t[161][a]] = 41216 + a;
			e[41216 + a] = t[161][a]
		}
	t[162] =
		"����������������������������������������������������������������＼∕﹨＄￥〒￠￡％＠℃℉﹩﹪﹫㏕㎜㎝㎞㏎㎡㎎㎏㏄°兙兛兞兝兡兣嗧瓩糎▁▂▃▄▅▆▇█▏▎▍▌▋▊▉┼┴┬┤├▔─│▕┌┐└┘╭����������������������������������╮╰╯═╞╪╡◢◣◥◤╱╲╳０１２３４５６７８９ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ〡〢〣〤〥〦〧〨〩十卄卅ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖ�"
		.split("");
	for (a = 0; a != t[162].length; ++a)
		if (t[162][a].charCodeAt(0) !== 65533) {
			r[t[162][a]] = 41472 + a;
			e[41472 + a] = t[162][a]
		}
	t[163] =
		"����������������������������������������������������������������ｗｘｙｚΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψωㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏ����������������������������������ㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦㄧㄨㄩ˙ˉˊˇˋ���������������������������������€������������������������������"
		.split("");
	for (a = 0; a != t[163].length; ++a)
		if (t[163][a].charCodeAt(0) !== 65533) {
			r[t[163][a]] = 41728 + a;
			e[41728 + a] = t[163][a]
		}
	t[164] =
		"����������������������������������������������������������������一乙丁七乃九了二人儿入八几刀刁力匕十卜又三下丈上丫丸凡久么也乞于亡兀刃勺千叉口土士夕大女子孑孓寸小尢尸山川工己已巳巾干廾弋弓才����������������������������������丑丐不中丰丹之尹予云井互五亢仁什仃仆仇仍今介仄元允內六兮公冗凶分切刈勻勾勿化匹午升卅卞厄友及反壬天夫太夭孔少尤尺屯巴幻廿弔引心戈戶手扎支文斗斤方日曰月木欠止歹毋比毛氏水火爪父爻片牙牛犬王丙�"
		.split("");
	for (a = 0; a != t[164].length; ++a)
		if (t[164][a].charCodeAt(0) !== 65533) {
			r[t[164][a]] = 41984 + a;
			e[41984 + a] = t[164][a]
		}
	t[165] =
		"����������������������������������������������������������������世丕且丘主乍乏乎以付仔仕他仗代令仙仞充兄冉冊冬凹出凸刊加功包匆北匝仟半卉卡占卯卮去可古右召叮叩叨叼司叵叫另只史叱台句叭叻四囚外����������������������������������央失奴奶孕它尼巨巧左市布平幼弁弘弗必戊打扔扒扑斥旦朮本未末札正母民氐永汁汀氾犯玄玉瓜瓦甘生用甩田由甲申疋白皮皿目矛矢石示禾穴立丞丟乒乓乩亙交亦亥仿伉伙伊伕伍伐休伏仲件任仰仳份企伋光兇兆先全�"
		.split("");
	for (a = 0; a != t[165].length; ++a)
		if (t[165][a].charCodeAt(0) !== 65533) {
			r[t[165][a]] = 42240 + a;
			e[42240 + a] = t[165][a]
		}
	t[166] =
		"����������������������������������������������������������������共再冰列刑划刎刖劣匈匡匠印危吉吏同吊吐吁吋各向名合吃后吆吒因回囝圳地在圭圬圯圩夙多夷夸妄奸妃好她如妁字存宇守宅安寺尖屹州帆并年����������������������������������式弛忙忖戎戌戍成扣扛托收早旨旬旭曲曳有朽朴朱朵次此死氖汝汗汙江池汐汕污汛汍汎灰牟牝百竹米糸缶羊羽老考而耒耳聿肉肋肌臣自至臼舌舛舟艮色艾虫血行衣西阡串亨位住佇佗佞伴佛何估佐佑伽伺伸佃佔似但佣�"
		.split("");
	for (a = 0; a != t[166].length; ++a)
		if (t[166][a].charCodeAt(0) !== 65533) {
			r[t[166][a]] = 42496 + a;
			e[42496 + a] = t[166][a]
		}
	t[167] =
		"����������������������������������������������������������������作你伯低伶余佝佈佚兌克免兵冶冷別判利刪刨劫助努劬匣即卵吝吭吞吾否呎吧呆呃吳呈呂君吩告吹吻吸吮吵吶吠吼呀吱含吟听囪困囤囫坊坑址坍����������������������������������均坎圾坐坏圻壯夾妝妒妨妞妣妙妖妍妤妓妊妥孝孜孚孛完宋宏尬局屁尿尾岐岑岔岌巫希序庇床廷弄弟彤形彷役忘忌志忍忱快忸忪戒我抄抗抖技扶抉扭把扼找批扳抒扯折扮投抓抑抆改攻攸旱更束李杏材村杜杖杞杉杆杠�"
		.split("");
	for (a = 0; a != t[167].length; ++a)
		if (t[167][a].charCodeAt(0) !== 65533) {
			r[t[167][a]] = 42752 + a;
			e[42752 + a] = t[167][a]
		}
	t[168] =
		"����������������������������������������������������������������杓杗步每求汞沙沁沈沉沅沛汪決沐汰沌汨沖沒汽沃汲汾汴沆汶沍沔沘沂灶灼災灸牢牡牠狄狂玖甬甫男甸皂盯矣私秀禿究系罕肖肓肝肘肛肚育良芒����������������������������������芋芍見角言谷豆豕貝赤走足身車辛辰迂迆迅迄巡邑邢邪邦那酉釆里防阮阱阪阬並乖乳事些亞享京佯依侍佳使佬供例來侃佰併侈佩佻侖佾侏侑佺兔兒兕兩具其典冽函刻券刷刺到刮制剁劾劻卒協卓卑卦卷卸卹取叔受味呵�"
		.split("");
	for (a = 0; a != t[168].length; ++a)
		if (t[168][a].charCodeAt(0) !== 65533) {
			r[t[168][a]] = 43008 + a;
			e[43008 + a] = t[168][a]
		}
	t[169] =
		"����������������������������������������������������������������咖呸咕咀呻呷咄咒咆呼咐呱呶和咚呢周咋命咎固垃坷坪坩坡坦坤坼夜奉奇奈奄奔妾妻委妹妮姑姆姐姍始姓姊妯妳姒姅孟孤季宗定官宜宙宛尚屈居����������������������������������屆岷岡岸岩岫岱岳帘帚帖帕帛帑幸庚店府底庖延弦弧弩往征彿彼忝忠忽念忿怏怔怯怵怖怪怕怡性怩怫怛或戕房戾所承拉拌拄抿拂抹拒招披拓拔拋拈抨抽押拐拙拇拍抵拚抱拘拖拗拆抬拎放斧於旺昔易昌昆昂明昀昏昕昊�"
		.split("");
	for (a = 0; a != t[169].length; ++a)
		if (t[169][a].charCodeAt(0) !== 65533) {
			r[t[169][a]] = 43264 + a;
			e[43264 + a] = t[169][a]
		}
	t[170] =
		"����������������������������������������������������������������昇服朋杭枋枕東果杳杷枇枝林杯杰板枉松析杵枚枓杼杪杲欣武歧歿氓氛泣注泳沱泌泥河沽沾沼波沫法泓沸泄油況沮泗泅泱沿治泡泛泊沬泯泜泖泠����������������������������������炕炎炒炊炙爬爭爸版牧物狀狎狙狗狐玩玨玟玫玥甽疝疙疚的盂盲直知矽社祀祁秉秈空穹竺糾罔羌羋者肺肥肢肱股肫肩肴肪肯臥臾舍芳芝芙芭芽芟芹花芬芥芯芸芣芰芾芷虎虱初表軋迎返近邵邸邱邶采金長門阜陀阿阻附�"
		.split("");
	for (a = 0; a != t[170].length; ++a)
		if (t[170][a].charCodeAt(0) !== 65533) {
			r[t[170][a]] = 43520 + a;
			e[43520 + a] = t[170][a]
		}
	t[171] =
		"����������������������������������������������������������������陂隹雨青非亟亭亮信侵侯便俠俑俏保促侶俘俟俊俗侮俐俄係俚俎俞侷兗冒冑冠剎剃削前剌剋則勇勉勃勁匍南卻厚叛咬哀咨哎哉咸咦咳哇哂咽咪品����������������������������������哄哈咯咫咱咻咩咧咿囿垂型垠垣垢城垮垓奕契奏奎奐姜姘姿姣姨娃姥姪姚姦威姻孩宣宦室客宥封屎屏屍屋峙峒巷帝帥帟幽庠度建弈弭彥很待徊律徇後徉怒思怠急怎怨恍恰恨恢恆恃恬恫恪恤扁拜挖按拼拭持拮拽指拱拷�"
		.split("");
	for (a = 0; a != t[171].length; ++a)
		if (t[171][a].charCodeAt(0) !== 65533) {
			r[t[171][a]] = 43776 + a;
			e[43776 + a] = t[171][a]
		}
	t[172] =
		"����������������������������������������������������������������拯括拾拴挑挂政故斫施既春昭映昧是星昨昱昤曷柿染柱柔某柬架枯柵柩柯柄柑枴柚查枸柏柞柳枰柙柢柝柒歪殃殆段毒毗氟泉洋洲洪流津洌洱洞洗����������������������������������活洽派洶洛泵洹洧洸洩洮洵洎洫炫為炳炬炯炭炸炮炤爰牲牯牴狩狠狡玷珊玻玲珍珀玳甚甭畏界畎畋疫疤疥疢疣癸皆皇皈盈盆盃盅省盹相眉看盾盼眇矜砂研砌砍祆祉祈祇禹禺科秒秋穿突竿竽籽紂紅紀紉紇約紆缸美羿耄�"
		.split("");
	for (a = 0; a != t[172].length; ++a)
		if (t[172][a].charCodeAt(0) !== 65533) {
			r[t[172][a]] = 44032 + a;
			e[44032 + a] = t[172][a]
		}
	t[173] =
		"����������������������������������������������������������������耐耍耑耶胖胥胚胃胄背胡胛胎胞胤胝致舢苧范茅苣苛苦茄若茂茉苒苗英茁苜苔苑苞苓苟苯茆虐虹虻虺衍衫要觔計訂訃貞負赴赳趴軍軌述迦迢迪迥����������������������������������迭迫迤迨郊郎郁郃酋酊重閂限陋陌降面革韋韭音頁風飛食首香乘亳倌倍倣俯倦倥俸倩倖倆值借倚倒們俺倀倔倨俱倡個候倘俳修倭倪俾倫倉兼冤冥冢凍凌准凋剖剜剔剛剝匪卿原厝叟哨唐唁唷哼哥哲唆哺唔哩哭員唉哮哪�"
		.split("");
	for (a = 0; a != t[173].length; ++a)
		if (t[173][a].charCodeAt(0) !== 65533) {
			r[t[173][a]] = 44288 + a;
			e[44288 + a] = t[173][a]
		}
	t[174] =
		"����������������������������������������������������������������哦唧唇哽唏圃圄埂埔埋埃堉夏套奘奚娑娘娜娟娛娓姬娠娣娩娥娌娉孫屘宰害家宴宮宵容宸射屑展屐峭峽峻峪峨峰島崁峴差席師庫庭座弱徒徑徐恙����������������������������������恣恥恐恕恭恩息悄悟悚悍悔悌悅悖扇拳挈拿捎挾振捕捂捆捏捉挺捐挽挪挫挨捍捌效敉料旁旅時晉晏晃晒晌晅晁書朔朕朗校核案框桓根桂桔栩梳栗桌桑栽柴桐桀格桃株桅栓栘桁殊殉殷氣氧氨氦氤泰浪涕消涇浦浸海浙涓�"
		.split("");
	for (a = 0; a != t[174].length; ++a)
		if (t[174][a].charCodeAt(0) !== 65533) {
			r[t[174][a]] = 44544 + a;
			e[44544 + a] = t[174][a]
		}
	t[175] =
		"����������������������������������������������������������������浬涉浮浚浴浩涌涊浹涅浥涔烊烘烤烙烈烏爹特狼狹狽狸狷玆班琉珮珠珪珞畔畝畜畚留疾病症疲疳疽疼疹痂疸皋皰益盍盎眩真眠眨矩砰砧砸砝破砷����������������������������������砥砭砠砟砲祕祐祠祟祖神祝祗祚秤秣秧租秦秩秘窄窈站笆笑粉紡紗紋紊素索純紐紕級紜納紙紛缺罟羔翅翁耆耘耕耙耗耽耿胱脂胰脅胭胴脆胸胳脈能脊胼胯臭臬舀舐航舫舨般芻茫荒荔荊茸荐草茵茴荏茲茹茶茗荀茱茨荃�"
		.split("");
	for (a = 0; a != t[175].length; ++a)
		if (t[175][a].charCodeAt(0) !== 65533) {
			r[t[175][a]] = 44800 + a;
			e[44800 + a] = t[175][a]
		}
	t[176] =
		"����������������������������������������������������������������虔蚊蚪蚓蚤蚩蚌蚣蚜衰衷袁袂衽衹記訐討訌訕訊託訓訖訏訑豈豺豹財貢起躬軒軔軏辱送逆迷退迺迴逃追逅迸邕郡郝郢酒配酌釘針釗釜釙閃院陣陡����������������������������������陛陝除陘陞隻飢馬骨高鬥鬲鬼乾偺偽停假偃偌做偉健偶偎偕偵側偷偏倏偯偭兜冕凰剪副勒務勘動匐匏匙匿區匾參曼商啪啦啄啞啡啃啊唱啖問啕唯啤唸售啜唬啣唳啁啗圈國圉域堅堊堆埠埤基堂堵執培夠奢娶婁婉婦婪婀�"
		.split("");
	for (a = 0; a != t[176].length; ++a)
		if (t[176][a].charCodeAt(0) !== 65533) {
			r[t[176][a]] = 45056 + a;
			e[45056 + a] = t[176][a]
		}
	t[177] =
		"����������������������������������������������������������������娼婢婚婆婊孰寇寅寄寂宿密尉專將屠屜屝崇崆崎崛崖崢崑崩崔崙崤崧崗巢常帶帳帷康庸庶庵庾張強彗彬彩彫得徙從徘御徠徜恿患悉悠您惋悴惦悽����������������������������������情悻悵惜悼惘惕惆惟悸惚惇戚戛扈掠控捲掖探接捷捧掘措捱掩掉掃掛捫推掄授掙採掬排掏掀捻捩捨捺敝敖救教敗啟敏敘敕敔斜斛斬族旋旌旎晝晚晤晨晦晞曹勗望梁梯梢梓梵桿桶梱梧梗械梃棄梭梆梅梔條梨梟梡梂欲殺�"
		.split("");
	for (a = 0; a != t[177].length; ++a)
		if (t[177][a].charCodeAt(0) !== 65533) {
			r[t[177][a]] = 45312 + a;
			e[45312 + a] = t[177][a]
		}
	t[178] =
		"����������������������������������������������������������������毫毬氫涎涼淳淙液淡淌淤添淺清淇淋涯淑涮淞淹涸混淵淅淒渚涵淚淫淘淪深淮淨淆淄涪淬涿淦烹焉焊烽烯爽牽犁猜猛猖猓猙率琅琊球理現琍瓠瓶����������������������������������瓷甜產略畦畢異疏痔痕疵痊痍皎盔盒盛眷眾眼眶眸眺硫硃硎祥票祭移窒窕笠笨笛第符笙笞笮粒粗粕絆絃統紮紹紼絀細紳組累終紲紱缽羞羚翌翎習耜聊聆脯脖脣脫脩脰脤舂舵舷舶船莎莞莘荸莢莖莽莫莒莊莓莉莠荷荻荼�"
		.split("");
	for (a = 0; a != t[178].length; ++a)
		if (t[178][a].charCodeAt(0) !== 65533) {
			r[t[178][a]] = 45568 + a;
			e[45568 + a] = t[178][a]
		}
	t[179] =
		"����������������������������������������������������������������莆莧處彪蛇蛀蚶蛄蚵蛆蛋蚱蚯蛉術袞袈被袒袖袍袋覓規訪訝訣訥許設訟訛訢豉豚販責貫貨貪貧赧赦趾趺軛軟這逍通逗連速逝逐逕逞造透逢逖逛途����������������������������������部郭都酗野釵釦釣釧釭釩閉陪陵陳陸陰陴陶陷陬雀雪雩章竟頂頃魚鳥鹵鹿麥麻傢傍傅備傑傀傖傘傚最凱割剴創剩勞勝勛博厥啻喀喧啼喊喝喘喂喜喪喔喇喋喃喳單喟唾喲喚喻喬喱啾喉喫喙圍堯堪場堤堰報堡堝堠壹壺奠�"
		.split("");
	for (a = 0; a != t[179].length; ++a)
		if (t[179][a].charCodeAt(0) !== 65533) {
			r[t[179][a]] = 45824 + a;
			e[45824 + a] = t[179][a]
		}
	t[180] =
		"����������������������������������������������������������������婷媚婿媒媛媧孳孱寒富寓寐尊尋就嵌嵐崴嵇巽幅帽幀幃幾廊廁廂廄弼彭復循徨惑惡悲悶惠愜愣惺愕惰惻惴慨惱愎惶愉愀愒戟扉掣掌描揀揩揉揆揍����������������������������������插揣提握揖揭揮捶援揪換摒揚揹敞敦敢散斑斐斯普晰晴晶景暑智晾晷曾替期朝棺棕棠棘棗椅棟棵森棧棹棒棲棣棋棍植椒椎棉棚楮棻款欺欽殘殖殼毯氮氯氬港游湔渡渲湧湊渠渥渣減湛湘渤湖湮渭渦湯渴湍渺測湃渝渾滋�"
		.split("");
	for (a = 0; a != t[180].length; ++a)
		if (t[180][a].charCodeAt(0) !== 65533) {
			r[t[180][a]] = 46080 + a;
			e[46080 + a] = t[180][a]
		}
	t[181] =
		"����������������������������������������������������������������溉渙湎湣湄湲湩湟焙焚焦焰無然煮焜牌犄犀猶猥猴猩琺琪琳琢琥琵琶琴琯琛琦琨甥甦畫番痢痛痣痙痘痞痠登發皖皓皴盜睏短硝硬硯稍稈程稅稀窘����������������������������������窗窖童竣等策筆筐筒答筍筋筏筑粟粥絞結絨絕紫絮絲絡給絢絰絳善翔翕耋聒肅腕腔腋腑腎脹腆脾腌腓腴舒舜菩萃菸萍菠菅萋菁華菱菴著萊菰萌菌菽菲菊萸萎萄菜萇菔菟虛蛟蛙蛭蛔蛛蛤蛐蛞街裁裂袱覃視註詠評詞証詁�"
		.split("");
	for (a = 0; a != t[181].length; ++a)
		if (t[181][a].charCodeAt(0) !== 65533) {
			r[t[181][a]] = 46336 + a;
			e[46336 + a] = t[181][a]
		}
	t[182] =
		"����������������������������������������������������������������詔詛詐詆訴診訶詖象貂貯貼貳貽賁費賀貴買貶貿貸越超趁跎距跋跚跑跌跛跆軻軸軼辜逮逵週逸進逶鄂郵鄉郾酣酥量鈔鈕鈣鈉鈞鈍鈐鈇鈑閔閏開閑����������������������������������間閒閎隊階隋陽隅隆隍陲隄雁雅雄集雇雯雲韌項順須飧飪飯飩飲飭馮馭黃黍黑亂傭債傲傳僅傾催傷傻傯僇剿剷剽募勦勤勢勣匯嗟嗨嗓嗦嗎嗜嗇嗑嗣嗤嗯嗚嗡嗅嗆嗥嗉園圓塞塑塘塗塚塔填塌塭塊塢塒塋奧嫁嫉嫌媾媽媼�"
		.split("");
	for (a = 0; a != t[182].length; ++a)
		if (t[182][a].charCodeAt(0) !== 65533) {
			r[t[182][a]] = 46592 + a;
			e[46592 + a] = t[182][a]
		}
	t[183] =
		"����������������������������������������������������������������媳嫂媲嵩嵯幌幹廉廈弒彙徬微愚意慈感想愛惹愁愈慎慌慄慍愾愴愧愍愆愷戡戢搓搾搞搪搭搽搬搏搜搔損搶搖搗搆敬斟新暗暉暇暈暖暄暘暍會榔業����������������������������������楚楷楠楔極椰概楊楨楫楞楓楹榆楝楣楛歇歲毀殿毓毽溢溯滓溶滂源溝滇滅溥溘溼溺溫滑準溜滄滔溪溧溴煎煙煩煤煉照煜煬煦煌煥煞煆煨煖爺牒猷獅猿猾瑯瑚瑕瑟瑞瑁琿瑙瑛瑜當畸瘀痰瘁痲痱痺痿痴痳盞盟睛睫睦睞督�"
		.split("");
	for (a = 0; a != t[183].length; ++a)
		if (t[183][a].charCodeAt(0) !== 65533) {
			r[t[183][a]] = 46848 + a;
			e[46848 + a] = t[183][a]
		}
	t[184] =
		"����������������������������������������������������������������睹睪睬睜睥睨睢矮碎碰碗碘碌碉硼碑碓硿祺祿禁萬禽稜稚稠稔稟稞窟窠筷節筠筮筧粱粳粵經絹綑綁綏絛置罩罪署義羨群聖聘肆肄腱腰腸腥腮腳腫����������������������������������腹腺腦舅艇蒂葷落萱葵葦葫葉葬葛萼萵葡董葩葭葆虞虜號蛹蜓蜈蜇蜀蛾蛻蜂蜃蜆蜊衙裟裔裙補裘裝裡裊裕裒覜解詫該詳試詩詰誇詼詣誠話誅詭詢詮詬詹詻訾詨豢貊貉賊資賈賄貲賃賂賅跡跟跨路跳跺跪跤跦躲較載軾輊�"
		.split("");
	for (a = 0; a != t[184].length; ++a)
		if (t[184][a].charCodeAt(0) !== 65533) {
			r[t[184][a]] = 47104 + a;
			e[47104 + a] = t[184][a]
		}
	t[185] =
		"����������������������������������������������������������������辟農運遊道遂達逼違遐遇遏過遍遑逾遁鄒鄗酬酪酩釉鈷鉗鈸鈽鉀鈾鉛鉋鉤鉑鈴鉉鉍鉅鈹鈿鉚閘隘隔隕雍雋雉雊雷電雹零靖靴靶預頑頓頊頒頌飼飴����������������������������������飽飾馳馱馴髡鳩麂鼎鼓鼠僧僮僥僖僭僚僕像僑僱僎僩兢凳劃劂匱厭嗾嘀嘛嘗嗽嘔嘆嘉嘍嘎嗷嘖嘟嘈嘐嗶團圖塵塾境墓墊塹墅塽壽夥夢夤奪奩嫡嫦嫩嫗嫖嫘嫣孵寞寧寡寥實寨寢寤察對屢嶄嶇幛幣幕幗幔廓廖弊彆彰徹慇�"
		.split("");
	for (a = 0; a != t[185].length; ++a)
		if (t[185][a].charCodeAt(0) !== 65533) {
			r[t[185][a]] = 47360 + a;
			e[47360 + a] = t[185][a]
		}
	t[186] =
		"����������������������������������������������������������������愿態慷慢慣慟慚慘慵截撇摘摔撤摸摟摺摑摧搴摭摻敲斡旗旖暢暨暝榜榨榕槁榮槓構榛榷榻榫榴槐槍榭槌榦槃榣歉歌氳漳演滾漓滴漩漾漠漬漏漂漢����������������������������������滿滯漆漱漸漲漣漕漫漯澈漪滬漁滲滌滷熔熙煽熊熄熒爾犒犖獄獐瑤瑣瑪瑰瑭甄疑瘧瘍瘋瘉瘓盡監瞄睽睿睡磁碟碧碳碩碣禎福禍種稱窪窩竭端管箕箋筵算箝箔箏箸箇箄粹粽精綻綰綜綽綾綠緊綴網綱綺綢綿綵綸維緒緇綬�"
		.split("");
	for (a = 0; a != t[186].length; ++a)
		if (t[186][a].charCodeAt(0) !== 65533) {
			r[t[186][a]] = 47616 + a;
			e[47616 + a] = t[186][a]
		}
	t[187] =
		"����������������������������������������������������������������罰翠翡翟聞聚肇腐膀膏膈膊腿膂臧臺與舔舞艋蓉蒿蓆蓄蒙蒞蒲蒜蓋蒸蓀蓓蒐蒼蓑蓊蜿蜜蜻蜢蜥蜴蜘蝕蜷蜩裳褂裴裹裸製裨褚裯誦誌語誣認誡誓誤����������������������������������說誥誨誘誑誚誧豪貍貌賓賑賒赫趙趕跼輔輒輕輓辣遠遘遜遣遙遞遢遝遛鄙鄘鄞酵酸酷酴鉸銀銅銘銖鉻銓銜銨鉼銑閡閨閩閣閥閤隙障際雌雒需靼鞅韶頗領颯颱餃餅餌餉駁骯骰髦魁魂鳴鳶鳳麼鼻齊億儀僻僵價儂儈儉儅凜�"
		.split("");
	for (a = 0; a != t[187].length; ++a)
		if (t[187][a].charCodeAt(0) !== 65533) {
			r[t[187][a]] = 47872 + a;
			e[47872 + a] = t[187][a]
		}
	t[188] =
		"����������������������������������������������������������������劇劈劉劍劊勰厲嘮嘻嘹嘲嘿嘴嘩噓噎噗噴嘶嘯嘰墀墟增墳墜墮墩墦奭嬉嫻嬋嫵嬌嬈寮寬審寫層履嶝嶔幢幟幡廢廚廟廝廣廠彈影德徵慶慧慮慝慕憂����������������������������������慼慰慫慾憧憐憫憎憬憚憤憔憮戮摩摯摹撞撲撈撐撰撥撓撕撩撒撮播撫撚撬撙撢撳敵敷數暮暫暴暱樣樟槨樁樞標槽模樓樊槳樂樅槭樑歐歎殤毅毆漿潼澄潑潦潔澆潭潛潸潮澎潺潰潤澗潘滕潯潠潟熟熬熱熨牖犛獎獗瑩璋璃�"
		.split("");
	for (a = 0; a != t[188].length; ++a)
		if (t[188][a].charCodeAt(0) !== 65533) {
			r[t[188][a]] = 48128 + a;
			e[48128 + a] = t[188][a]
		}
	t[189] =
		"����������������������������������������������������������������瑾璀畿瘠瘩瘟瘤瘦瘡瘢皚皺盤瞎瞇瞌瞑瞋磋磅確磊碾磕碼磐稿稼穀稽稷稻窯窮箭箱範箴篆篇篁箠篌糊締練緯緻緘緬緝編緣線緞緩綞緙緲緹罵罷羯����������������������������������翩耦膛膜膝膠膚膘蔗蔽蔚蓮蔬蔭蔓蔑蔣蔡蔔蓬蔥蓿蔆螂蝴蝶蝠蝦蝸蝨蝙蝗蝌蝓衛衝褐複褒褓褕褊誼諒談諄誕請諸課諉諂調誰論諍誶誹諛豌豎豬賠賞賦賤賬賭賢賣賜質賡赭趟趣踫踐踝踢踏踩踟踡踞躺輝輛輟輩輦輪輜輞�"
		.split("");
	for (a = 0; a != t[189].length; ++a)
		if (t[189][a].charCodeAt(0) !== 65533) {
			r[t[189][a]] = 48384 + a;
			e[48384 + a] = t[189][a]
		}
	t[190] =
		"����������������������������������������������������������������輥適遮遨遭遷鄰鄭鄧鄱醇醉醋醃鋅銻銷鋪銬鋤鋁銳銼鋒鋇鋰銲閭閱霄霆震霉靠鞍鞋鞏頡頫頜颳養餓餒餘駝駐駟駛駑駕駒駙骷髮髯鬧魅魄魷魯鴆鴉����������������������������������鴃麩麾黎墨齒儒儘儔儐儕冀冪凝劑劓勳噙噫噹噩噤噸噪器噥噱噯噬噢噶壁墾壇壅奮嬝嬴學寰導彊憲憑憩憊懍憶憾懊懈戰擅擁擋撻撼據擄擇擂操撿擒擔撾整曆曉暹曄曇暸樽樸樺橙橫橘樹橄橢橡橋橇樵機橈歙歷氅濂澱澡�"
		.split("");
	for (a = 0; a != t[190].length; ++a)
		if (t[190][a].charCodeAt(0) !== 65533) {
			r[t[190][a]] = 48640 + a;
			e[48640 + a] = t[190][a]
		}
	t[191] =
		"����������������������������������������������������������������濃澤濁澧澳激澹澶澦澠澴熾燉燐燒燈燕熹燎燙燜燃燄獨璜璣璘璟璞瓢甌甍瘴瘸瘺盧盥瞠瞞瞟瞥磨磚磬磧禦積穎穆穌穋窺篙簑築篤篛篡篩篦糕糖縊����������������������������������縑縈縛縣縞縝縉縐罹羲翰翱翮耨膳膩膨臻興艘艙蕊蕙蕈蕨蕩蕃蕉蕭蕪蕞螃螟螞螢融衡褪褲褥褫褡親覦諦諺諫諱謀諜諧諮諾謁謂諷諭諳諶諼豫豭貓賴蹄踱踴蹂踹踵輻輯輸輳辨辦遵遴選遲遼遺鄴醒錠錶鋸錳錯錢鋼錫錄錚�"
		.split("");
	for (a = 0; a != t[191].length; ++a)
		if (t[191][a].charCodeAt(0) !== 65533) {
			r[t[191][a]] = 48896 + a;
			e[48896 + a] = t[191][a]
		}
	t[192] =
		"����������������������������������������������������������������錐錦錡錕錮錙閻隧隨險雕霎霑霖霍霓霏靛靜靦鞘頰頸頻頷頭頹頤餐館餞餛餡餚駭駢駱骸骼髻髭鬨鮑鴕鴣鴦鴨鴒鴛默黔龍龜優償儡儲勵嚎嚀嚐嚅嚇����������������������������������嚏壕壓壑壎嬰嬪嬤孺尷屨嶼嶺嶽嶸幫彌徽應懂懇懦懋戲戴擎擊擘擠擰擦擬擱擢擭斂斃曙曖檀檔檄檢檜櫛檣橾檗檐檠歜殮毚氈濘濱濟濠濛濤濫濯澀濬濡濩濕濮濰燧營燮燦燥燭燬燴燠爵牆獰獲璩環璦璨癆療癌盪瞳瞪瞰瞬�"
		.split("");
	for (a = 0; a != t[192].length; ++a)
		if (t[192][a].charCodeAt(0) !== 65533) {
			r[t[192][a]] = 49152 + a;
			e[49152 + a] = t[192][a]
		}
	t[193] =
		"����������������������������������������������������������������瞧瞭矯磷磺磴磯礁禧禪穗窿簇簍篾篷簌篠糠糜糞糢糟糙糝縮績繆縷縲繃縫總縱繅繁縴縹繈縵縿縯罄翳翼聱聲聰聯聳臆臃膺臂臀膿膽臉膾臨舉艱薪����������������������������������薄蕾薜薑薔薯薛薇薨薊虧蟀蟑螳蟒蟆螫螻螺蟈蟋褻褶襄褸褽覬謎謗謙講謊謠謝謄謐豁谿豳賺賽購賸賻趨蹉蹋蹈蹊轄輾轂轅輿避遽還邁邂邀鄹醣醞醜鍍鎂錨鍵鍊鍥鍋錘鍾鍬鍛鍰鍚鍔闊闋闌闈闆隱隸雖霜霞鞠韓顆颶餵騁�"
		.split("");
	for (a = 0; a != t[193].length; ++a)
		if (t[193][a].charCodeAt(0) !== 65533) {
			r[t[193][a]] = 49408 + a;
			e[49408 + a] = t[193][a]
		}
	t[194] =
		"����������������������������������������������������������������駿鮮鮫鮪鮭鴻鴿麋黏點黜黝黛鼾齋叢嚕嚮壙壘嬸彝懣戳擴擲擾攆擺擻擷斷曜朦檳檬櫃檻檸櫂檮檯歟歸殯瀉瀋濾瀆濺瀑瀏燻燼燾燸獷獵璧璿甕癖癘����������������������������������癒瞽瞿瞻瞼礎禮穡穢穠竄竅簫簧簪簞簣簡糧織繕繞繚繡繒繙罈翹翻職聶臍臏舊藏薩藍藐藉薰薺薹薦蟯蟬蟲蟠覆覲觴謨謹謬謫豐贅蹙蹣蹦蹤蹟蹕軀轉轍邇邃邈醫醬釐鎔鎊鎖鎢鎳鎮鎬鎰鎘鎚鎗闔闖闐闕離雜雙雛雞霤鞣鞦�"
		.split("");
	for (a = 0; a != t[194].length; ++a)
		if (t[194][a].charCodeAt(0) !== 65533) {
			r[t[194][a]] = 49664 + a;
			e[49664 + a] = t[194][a]
		}
	t[195] =
		"����������������������������������������������������������������鞭韹額顏題顎顓颺餾餿餽餮馥騎髁鬃鬆魏魎魍鯊鯉鯽鯈鯀鵑鵝鵠黠鼕鼬儳嚥壞壟壢寵龐廬懲懷懶懵攀攏曠曝櫥櫝櫚櫓瀛瀟瀨瀚瀝瀕瀘爆爍牘犢獸����������������������������������獺璽瓊瓣疇疆癟癡矇礙禱穫穩簾簿簸簽簷籀繫繭繹繩繪羅繳羶羹羸臘藩藝藪藕藤藥藷蟻蠅蠍蟹蟾襠襟襖襞譁譜識證譚譎譏譆譙贈贊蹼蹲躇蹶蹬蹺蹴轔轎辭邊邋醱醮鏡鏑鏟鏃鏈鏜鏝鏖鏢鏍鏘鏤鏗鏨關隴難霪霧靡韜韻類�"
		.split("");
	for (a = 0; a != t[195].length; ++a)
		if (t[195][a].charCodeAt(0) !== 65533) {
			r[t[195][a]] = 49920 + a;
			e[49920 + a] = t[195][a]
		}
	t[196] =
		"����������������������������������������������������������������願顛颼饅饉騖騙鬍鯨鯧鯖鯛鶉鵡鵲鵪鵬麒麗麓麴勸嚨嚷嚶嚴嚼壤孀孃孽寶巉懸懺攘攔攙曦朧櫬瀾瀰瀲爐獻瓏癢癥礦礪礬礫竇競籌籃籍糯糰辮繽繼����������������������������������纂罌耀臚艦藻藹蘑藺蘆蘋蘇蘊蠔蠕襤覺觸議譬警譯譟譫贏贍躉躁躅躂醴釋鐘鐃鏽闡霰飄饒饑馨騫騰騷騵鰓鰍鹹麵黨鼯齟齣齡儷儸囁囀囂夔屬巍懼懾攝攜斕曩櫻欄櫺殲灌爛犧瓖瓔癩矓籐纏續羼蘗蘭蘚蠣蠢蠡蠟襪襬覽譴�"
		.split("");
	for (a = 0; a != t[196].length; ++a)
		if (t[196][a].charCodeAt(0) !== 65533) {
			r[t[196][a]] = 50176 + a;
			e[50176 + a] = t[196][a]
		}
	t[197] =
		"����������������������������������������������������������������護譽贓躊躍躋轟辯醺鐮鐳鐵鐺鐸鐲鐫闢霸霹露響顧顥饗驅驃驀騾髏魔魑鰭鰥鶯鶴鷂鶸麝黯鼙齜齦齧儼儻囈囊囉孿巔巒彎懿攤權歡灑灘玀瓤疊癮癬����������������������������������禳籠籟聾聽臟襲襯觼讀贖贗躑躓轡酈鑄鑑鑒霽霾韃韁顫饕驕驍髒鬚鱉鰱鰾鰻鷓鷗鼴齬齪龔囌巖戀攣攫攪曬欐瓚竊籤籣籥纓纖纔臢蘸蘿蠱變邐邏鑣鑠鑤靨顯饜驚驛驗髓體髑鱔鱗鱖鷥麟黴囑壩攬灞癱癲矗罐羈蠶蠹衢讓讒�"
		.split("");
	for (a = 0; a != t[197].length; ++a)
		if (t[197][a].charCodeAt(0) !== 65533) {
			r[t[197][a]] = 50432 + a;
			e[50432 + a] = t[197][a]
		}
	t[198] =
		"����������������������������������������������������������������讖艷贛釀鑪靂靈靄韆顰驟鬢魘鱟鷹鷺鹼鹽鼇齷齲廳欖灣籬籮蠻觀躡釁鑲鑰顱饞髖鬣黌灤矚讚鑷韉驢驥纜讜躪釅鑽鑾鑼鱷鱸黷豔鑿鸚爨驪鬱鸛鸞籲���������������������������������������������������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[198].length; ++a)
		if (t[198][a].charCodeAt(0) !== 65533) {
			r[t[198][a]] = 50688 + a;
			e[50688 + a] = t[198][a]
		}
	t[201] =
		"����������������������������������������������������������������乂乜凵匚厂万丌乇亍囗兀屮彳丏冇与丮亓仂仉仈冘勼卬厹圠夃夬尐巿旡殳毌气爿丱丼仨仜仩仡仝仚刌匜卌圢圣夗夯宁宄尒尻屴屳帄庀庂忉戉扐氕����������������������������������氶汃氿氻犮犰玊禸肊阞伎优伬仵伔仱伀价伈伝伂伅伢伓伄仴伒冱刓刉刐劦匢匟卍厊吇囡囟圮圪圴夼妀奼妅奻奾奷奿孖尕尥屼屺屻屾巟幵庄异弚彴忕忔忏扜扞扤扡扦扢扙扠扚扥旯旮朾朹朸朻机朿朼朳氘汆汒汜汏汊汔汋�"
		.split("");
	for (a = 0; a != t[201].length; ++a)
		if (t[201][a].charCodeAt(0) !== 65533) {
			r[t[201][a]] = 51456 + a;
			e[51456 + a] = t[201][a]
		}
	t[202] =
		"����������������������������������������������������������������汌灱牞犴犵玎甪癿穵网艸艼芀艽艿虍襾邙邗邘邛邔阢阤阠阣佖伻佢佉体佤伾佧佒佟佁佘伭伳伿佡冏冹刜刞刡劭劮匉卣卲厎厏吰吷吪呔呅吙吜吥吘����������������������������������吽呏呁吨吤呇囮囧囥坁坅坌坉坋坒夆奀妦妘妠妗妎妢妐妏妧妡宎宒尨尪岍岏岈岋岉岒岊岆岓岕巠帊帎庋庉庌庈庍弅弝彸彶忒忑忐忭忨忮忳忡忤忣忺忯忷忻怀忴戺抃抌抎抏抔抇扱扻扺扰抁抈扷扽扲扴攷旰旴旳旲旵杅杇�"
		.split("");
	for (a = 0; a != t[202].length; ++a)
		if (t[202][a].charCodeAt(0) !== 65533) {
			r[t[202][a]] = 51712 + a;
			e[51712 + a] = t[202][a]
		}
	t[203] =
		"����������������������������������������������������������������杙杕杌杈杝杍杚杋毐氙氚汸汧汫沄沋沏汱汯汩沚汭沇沕沜汦汳汥汻沎灴灺牣犿犽狃狆狁犺狅玕玗玓玔玒町甹疔疕皁礽耴肕肙肐肒肜芐芏芅芎芑芓����������������������������������芊芃芄豸迉辿邟邡邥邞邧邠阰阨阯阭丳侘佼侅佽侀侇佶佴侉侄佷佌侗佪侚佹侁佸侐侜侔侞侒侂侕佫佮冞冼冾刵刲刳剆刱劼匊匋匼厒厔咇呿咁咑咂咈呫呺呾呥呬呴呦咍呯呡呠咘呣呧呤囷囹坯坲坭坫坱坰坶垀坵坻坳坴坢�"
		.split("");
	for (a = 0; a != t[203].length; ++a)
		if (t[203][a].charCodeAt(0) !== 65533) {
			r[t[203][a]] = 51968 + a;
			e[51968 + a] = t[203][a]
		}
	t[204] =
		"����������������������������������������������������������������坨坽夌奅妵妺姏姎妲姌姁妶妼姃姖妱妽姀姈妴姇孢孥宓宕屄屇岮岤岠岵岯岨岬岟岣岭岢岪岧岝岥岶岰岦帗帔帙弨弢弣弤彔徂彾彽忞忥怭怦怙怲怋����������������������������������怴怊怗怳怚怞怬怢怍怐怮怓怑怌怉怜戔戽抭抴拑抾抪抶拊抮抳抯抻抩抰抸攽斨斻昉旼昄昒昈旻昃昋昍昅旽昑昐曶朊枅杬枎枒杶杻枘枆构杴枍枌杺枟枑枙枃杽极杸杹枔欥殀歾毞氝沓泬泫泮泙沶泔沭泧沷泐泂沺泃泆泭泲�"
		.split("");
	for (a = 0; a != t[204].length; ++a)
		if (t[204][a].charCodeAt(0) !== 65533) {
			r[t[204][a]] = 52224 + a;
			e[52224 + a] = t[204][a]
		}
	t[205] =
		"����������������������������������������������������������������泒泝沴沊沝沀泞泀洰泍泇沰泹泏泩泑炔炘炅炓炆炄炑炖炂炚炃牪狖狋狘狉狜狒狔狚狌狑玤玡玭玦玢玠玬玝瓝瓨甿畀甾疌疘皯盳盱盰盵矸矼矹矻矺����������������������������������矷祂礿秅穸穻竻籵糽耵肏肮肣肸肵肭舠芠苀芫芚芘芛芵芧芮芼芞芺芴芨芡芩苂芤苃芶芢虰虯虭虮豖迒迋迓迍迖迕迗邲邴邯邳邰阹阽阼阺陃俍俅俓侲俉俋俁俔俜俙侻侳俛俇俖侺俀侹俬剄剉勀勂匽卼厗厖厙厘咺咡咭咥哏�"
		.split("");
	for (a = 0; a != t[205].length; ++a)
		if (t[205][a].charCodeAt(0) !== 65533) {
			r[t[205][a]] = 52480 + a;
			e[52480 + a] = t[205][a]
		}
	t[206] =
		"����������������������������������������������������������������哃茍咷咮哖咶哅哆咠呰咼咢咾呲哞咰垵垞垟垤垌垗垝垛垔垘垏垙垥垚垕壴复奓姡姞姮娀姱姝姺姽姼姶姤姲姷姛姩姳姵姠姾姴姭宨屌峐峘峌峗峋峛����������������������������������峞峚峉峇峊峖峓峔峏峈峆峎峟峸巹帡帢帣帠帤庰庤庢庛庣庥弇弮彖徆怷怹恔恲恞恅恓恇恉恛恌恀恂恟怤恄恘恦恮扂扃拏挍挋拵挎挃拫拹挏挌拸拶挀挓挔拺挕拻拰敁敃斪斿昶昡昲昵昜昦昢昳昫昺昝昴昹昮朏朐柁柲柈枺�"
		.split("");
	for (a = 0; a != t[206].length; ++a)
		if (t[206][a].charCodeAt(0) !== 65533) {
			r[t[206][a]] = 52736 + a;
			e[52736 + a] = t[206][a]
		}
	t[207] =
		"����������������������������������������������������������������柜枻柸柘柀枷柅柫柤柟枵柍枳柷柶柮柣柂枹柎柧柰枲柼柆柭柌枮柦柛柺柉柊柃柪柋欨殂殄殶毖毘毠氠氡洨洴洭洟洼洿洒洊泚洳洄洙洺洚洑洀洝浂����������������������������������洁洘洷洃洏浀洇洠洬洈洢洉洐炷炟炾炱炰炡炴炵炩牁牉牊牬牰牳牮狊狤狨狫狟狪狦狣玅珌珂珈珅玹玶玵玴珫玿珇玾珃珆玸珋瓬瓮甮畇畈疧疪癹盄眈眃眄眅眊盷盻盺矧矨砆砑砒砅砐砏砎砉砃砓祊祌祋祅祄秕种秏秖秎窀�"
		.split("");
	for (a = 0; a != t[207].length; ++a)
		if (t[207][a].charCodeAt(0) !== 65533) {
			r[t[207][a]] = 52992 + a;
			e[52992 + a] = t[207][a]
		}
	t[208] =
		"����������������������������������������������������������������穾竑笀笁籺籸籹籿粀粁紃紈紁罘羑羍羾耇耎耏耔耷胘胇胠胑胈胂胐胅胣胙胜胊胕胉胏胗胦胍臿舡芔苙苾苹茇苨茀苕茺苫苖苴苬苡苲苵茌苻苶苰苪����������������������������������苤苠苺苳苭虷虴虼虳衁衎衧衪衩觓訄訇赲迣迡迮迠郱邽邿郕郅邾郇郋郈釔釓陔陏陑陓陊陎倞倅倇倓倢倰倛俵俴倳倷倬俶俷倗倜倠倧倵倯倱倎党冔冓凊凄凅凈凎剡剚剒剞剟剕剢勍匎厞唦哢唗唒哧哳哤唚哿唄唈哫唑唅哱�"
		.split("");
	for (a = 0; a != t[208].length; ++a)
		if (t[208][a].charCodeAt(0) !== 65533) {
			r[t[208][a]] = 53248 + a;
			e[53248 + a] = t[208][a]
		}
	t[209] =
		"����������������������������������������������������������������唊哻哷哸哠唎唃唋圁圂埌堲埕埒垺埆垽垼垸垶垿埇埐垹埁夎奊娙娖娭娮娕娏娗娊娞娳孬宧宭宬尃屖屔峬峿峮峱峷崀峹帩帨庨庮庪庬弳弰彧恝恚恧����������������������������������恁悢悈悀悒悁悝悃悕悛悗悇悜悎戙扆拲挐捖挬捄捅挶捃揤挹捋捊挼挩捁挴捘捔捙挭捇挳捚捑挸捗捀捈敊敆旆旃旄旂晊晟晇晑朒朓栟栚桉栲栳栻桋桏栖栱栜栵栫栭栯桎桄栴栝栒栔栦栨栮桍栺栥栠欬欯欭欱欴歭肂殈毦毤�"
		.split("");
	for (a = 0; a != t[209].length; ++a)
		if (t[209][a].charCodeAt(0) !== 65533) {
			r[t[209][a]] = 53504 + a;
			e[53504 + a] = t[209][a]
		}
	t[210] =
		"����������������������������������������������������������������毨毣毢毧氥浺浣浤浶洍浡涒浘浢浭浯涑涍淯浿涆浞浧浠涗浰浼浟涂涘洯浨涋浾涀涄洖涃浻浽浵涐烜烓烑烝烋缹烢烗烒烞烠烔烍烅烆烇烚烎烡牂牸����������������������������������牷牶猀狺狴狾狶狳狻猁珓珙珥珖玼珧珣珩珜珒珛珔珝珚珗珘珨瓞瓟瓴瓵甡畛畟疰痁疻痄痀疿疶疺皊盉眝眛眐眓眒眣眑眕眙眚眢眧砣砬砢砵砯砨砮砫砡砩砳砪砱祔祛祏祜祓祒祑秫秬秠秮秭秪秜秞秝窆窉窅窋窌窊窇竘笐�"
		.split("");
	for (a = 0; a != t[210].length; ++a)
		if (t[210][a].charCodeAt(0) !== 65533) {
			r[t[210][a]] = 53760 + a;
			e[53760 + a] = t[210][a]
		}
	t[211] =
		"����������������������������������������������������������������笄笓笅笏笈笊笎笉笒粄粑粊粌粈粍粅紞紝紑紎紘紖紓紟紒紏紌罜罡罞罠罝罛羖羒翃翂翀耖耾耹胺胲胹胵脁胻脀舁舯舥茳茭荄茙荑茥荖茿荁茦茜茢����������������������������������荂荎茛茪茈茼荍茖茤茠茷茯茩荇荅荌荓茞茬荋茧荈虓虒蚢蚨蚖蚍蚑蚞蚇蚗蚆蚋蚚蚅蚥蚙蚡蚧蚕蚘蚎蚝蚐蚔衃衄衭衵衶衲袀衱衿衯袃衾衴衼訒豇豗豻貤貣赶赸趵趷趶軑軓迾迵适迿迻逄迼迶郖郠郙郚郣郟郥郘郛郗郜郤酐�"
		.split("");
	for (a = 0; a != t[211].length; ++a)
		if (t[211][a].charCodeAt(0) !== 65533) {
			r[t[211][a]] = 54016 + a;
			e[54016 + a] = t[211][a]
		}
	t[212] =
		"����������������������������������������������������������������酎酏釕釢釚陜陟隼飣髟鬯乿偰偪偡偞偠偓偋偝偲偈偍偁偛偊偢倕偅偟偩偫偣偤偆偀偮偳偗偑凐剫剭剬剮勖勓匭厜啵啶唼啍啐唴唪啑啢唶唵唰啒啅����������������������������������唌唲啥啎唹啈唭唻啀啋圊圇埻堔埢埶埜埴堀埭埽堈埸堋埳埏堇埮埣埲埥埬埡堎埼堐埧堁堌埱埩埰堍堄奜婠婘婕婧婞娸娵婭婐婟婥婬婓婤婗婃婝婒婄婛婈媎娾婍娹婌婰婩婇婑婖婂婜孲孮寁寀屙崞崋崝崚崠崌崨崍崦崥崏�"
		.split("");
	for (a = 0; a != t[212].length; ++a)
		if (t[212][a].charCodeAt(0) !== 65533) {
			r[t[212][a]] = 54272 + a;
			e[54272 + a] = t[212][a]
		}
	t[213] =
		"����������������������������������������������������������������崰崒崣崟崮帾帴庱庴庹庲庳弶弸徛徖徟悊悐悆悾悰悺惓惔惏惤惙惝惈悱惛悷惊悿惃惍惀挲捥掊掂捽掽掞掭掝掗掫掎捯掇掐据掯捵掜捭掮捼掤挻掟����������������������������������捸掅掁掑掍捰敓旍晥晡晛晙晜晢朘桹梇梐梜桭桮梮梫楖桯梣梬梩桵桴梲梏桷梒桼桫桲梪梀桱桾梛梖梋梠梉梤桸桻梑梌梊桽欶欳欷欸殑殏殍殎殌氪淀涫涴涳湴涬淩淢涷淶淔渀淈淠淟淖涾淥淜淝淛淴淊涽淭淰涺淕淂淏淉�"
		.split("");
	for (a = 0; a != t[213].length; ++a)
		if (t[213][a].charCodeAt(0) !== 65533) {
			r[t[213][a]] = 54528 + a;
			e[54528 + a] = t[213][a]
		}
	t[214] =
		"����������������������������������������������������������������淐淲淓淽淗淍淣涻烺焍烷焗烴焌烰焄烳焐烼烿焆焓焀烸烶焋焂焎牾牻牼牿猝猗猇猑猘猊猈狿猏猞玈珶珸珵琄琁珽琇琀珺珼珿琌琋珴琈畤畣痎痒痏����������������������������������痋痌痑痐皏皉盓眹眯眭眱眲眴眳眽眥眻眵硈硒硉硍硊硌砦硅硐祤祧祩祪祣祫祡离秺秸秶秷窏窔窐笵筇笴笥笰笢笤笳笘笪笝笱笫笭笯笲笸笚笣粔粘粖粣紵紽紸紶紺絅紬紩絁絇紾紿絊紻紨罣羕羜羝羛翊翋翍翐翑翇翏翉耟�"
		.split("");
	for (a = 0; a != t[214].length; ++a)
		if (t[214][a].charCodeAt(0) !== 65533) {
			r[t[214][a]] = 54784 + a;
			e[54784 + a] = t[214][a]
		}
	t[215] =
		"����������������������������������������������������������������耞耛聇聃聈脘脥脙脛脭脟脬脞脡脕脧脝脢舑舸舳舺舴舲艴莐莣莨莍荺荳莤荴莏莁莕莙荵莔莩荽莃莌莝莛莪莋荾莥莯莈莗莰荿莦莇莮荶莚虙虖蚿蚷����������������������������������蛂蛁蛅蚺蚰蛈蚹蚳蚸蛌蚴蚻蚼蛃蚽蚾衒袉袕袨袢袪袚袑袡袟袘袧袙袛袗袤袬袌袓袎覂觖觙觕訰訧訬訞谹谻豜豝豽貥赽赻赹趼跂趹趿跁軘軞軝軜軗軠軡逤逋逑逜逌逡郯郪郰郴郲郳郔郫郬郩酖酘酚酓酕釬釴釱釳釸釤釹釪�"
		.split("");
	for (a = 0; a != t[215].length; ++a)
		if (t[215][a].charCodeAt(0) !== 65533) {
			r[t[215][a]] = 55040 + a;
			e[55040 + a] = t[215][a]
		}
	t[216] =
		"����������������������������������������������������������������釫釷釨釮镺閆閈陼陭陫陱陯隿靪頄飥馗傛傕傔傞傋傣傃傌傎傝偨傜傒傂傇兟凔匒匑厤厧喑喨喥喭啷噅喢喓喈喏喵喁喣喒喤啽喌喦啿喕喡喎圌堩堷����������������������������������堙堞堧堣堨埵塈堥堜堛堳堿堶堮堹堸堭堬堻奡媯媔媟婺媢媞婸媦婼媥媬媕媮娷媄媊媗媃媋媩婻婽媌媜媏媓媝寪寍寋寔寑寊寎尌尰崷嵃嵫嵁嵋崿崵嵑嵎嵕崳崺嵒崽崱嵙嵂崹嵉崸崼崲崶嵀嵅幄幁彘徦徥徫惉悹惌惢惎惄愔�"
		.split("");
	for (a = 0; a != t[216].length; ++a)
		if (t[216][a].charCodeAt(0) !== 65533) {
			r[t[216][a]] = 55296 + a;
			e[55296 + a] = t[216][a]
		}
	t[217] =
		"����������������������������������������������������������������惲愊愖愅惵愓惸惼惾惁愃愘愝愐惿愄愋扊掔掱掰揎揥揨揯揃撝揳揊揠揶揕揲揵摡揟掾揝揜揄揘揓揂揇揌揋揈揰揗揙攲敧敪敤敜敨敥斌斝斞斮旐旒����������������������������������晼晬晻暀晱晹晪晲朁椌棓椄棜椪棬棪棱椏棖棷棫棤棶椓椐棳棡椇棌椈楰梴椑棯棆椔棸棐棽棼棨椋椊椗棎棈棝棞棦棴棑椆棔棩椕椥棇欹欻欿欼殔殗殙殕殽毰毲毳氰淼湆湇渟湉溈渼渽湅湢渫渿湁湝湳渜渳湋湀湑渻渃渮湞�"
		.split("");
	for (a = 0; a != t[217].length; ++a)
		if (t[217][a].charCodeAt(0) !== 65533) {
			r[t[217][a]] = 55552 + a;
			e[55552 + a] = t[217][a]
		}
	t[218] =
		"����������������������������������������������������������������湨湜湡渱渨湠湱湫渹渢渰湓湥渧湸湤湷湕湹湒湦渵渶湚焠焞焯烻焮焱焣焥焢焲焟焨焺焛牋牚犈犉犆犅犋猒猋猰猢猱猳猧猲猭猦猣猵猌琮琬琰琫琖����������������������������������琚琡琭琱琤琣琝琩琠琲瓻甯畯畬痧痚痡痦痝痟痤痗皕皒盚睆睇睄睍睅睊睎睋睌矞矬硠硤硥硜硭硱硪确硰硩硨硞硢祴祳祲祰稂稊稃稌稄窙竦竤筊笻筄筈筌筎筀筘筅粢粞粨粡絘絯絣絓絖絧絪絏絭絜絫絒絔絩絑絟絎缾缿罥�"
		.split("");
	for (a = 0; a != t[218].length; ++a)
		if (t[218][a].charCodeAt(0) !== 65533) {
			r[t[218][a]] = 55808 + a;
			e[55808 + a] = t[218][a]
		}
	t[219] =
		"����������������������������������������������������������������罦羢羠羡翗聑聏聐胾胔腃腊腒腏腇脽腍脺臦臮臷臸臹舄舼舽舿艵茻菏菹萣菀菨萒菧菤菼菶萐菆菈菫菣莿萁菝菥菘菿菡菋菎菖菵菉萉萏菞萑萆菂菳����������������������������������菕菺菇菑菪萓菃菬菮菄菻菗菢萛菛菾蛘蛢蛦蛓蛣蛚蛪蛝蛫蛜蛬蛩蛗蛨蛑衈衖衕袺裗袹袸裀袾袶袼袷袽袲褁裉覕覘覗觝觚觛詎詍訹詙詀詗詘詄詅詒詈詑詊詌詏豟貁貀貺貾貰貹貵趄趀趉跘跓跍跇跖跜跏跕跙跈跗跅軯軷軺�"
		.split("");
	for (a = 0; a != t[219].length; ++a)
		if (t[219][a].charCodeAt(0) !== 65533) {
			r[t[219][a]] = 56064 + a;
			e[56064 + a] = t[219][a]
		}
	t[220] =
		"����������������������������������������������������������������軹軦軮軥軵軧軨軶軫軱軬軴軩逭逴逯鄆鄬鄄郿郼鄈郹郻鄁鄀鄇鄅鄃酡酤酟酢酠鈁鈊鈥鈃鈚鈦鈏鈌鈀鈒釿釽鈆鈄鈧鈂鈜鈤鈙鈗鈅鈖镻閍閌閐隇陾隈����������������������������������隉隃隀雂雈雃雱雰靬靰靮頇颩飫鳦黹亃亄亶傽傿僆傮僄僊傴僈僂傰僁傺傱僋僉傶傸凗剺剸剻剼嗃嗛嗌嗐嗋嗊嗝嗀嗔嗄嗩喿嗒喍嗏嗕嗢嗖嗈嗲嗍嗙嗂圔塓塨塤塏塍塉塯塕塎塝塙塥塛堽塣塱壼嫇嫄嫋媺媸媱媵媰媿嫈媻嫆�"
		.split("");
	for (a = 0; a != t[220].length; ++a)
		if (t[220][a].charCodeAt(0) !== 65533) {
			r[t[220][a]] = 56320 + a;
			e[56320 + a] = t[220][a]
		}
	t[221] =
		"����������������������������������������������������������������媷嫀嫊媴媶嫍媹媐寖寘寙尟尳嵱嵣嵊嵥嵲嵬嵞嵨嵧嵢巰幏幎幊幍幋廅廌廆廋廇彀徯徭惷慉慊愫慅愶愲愮慆愯慏愩慀戠酨戣戥戤揅揱揫搐搒搉搠搤����������������������������������搳摃搟搕搘搹搷搢搣搌搦搰搨摁搵搯搊搚摀搥搧搋揧搛搮搡搎敯斒旓暆暌暕暐暋暊暙暔晸朠楦楟椸楎楢楱椿楅楪椹楂楗楙楺楈楉椵楬椳椽楥棰楸椴楩楀楯楄楶楘楁楴楌椻楋椷楜楏楑椲楒椯楻椼歆歅歃歂歈歁殛嗀毻毼�"
		.split("");
	for (a = 0; a != t[221].length; ++a)
		if (t[221][a].charCodeAt(0) !== 65533) {
			r[t[221][a]] = 56576 + a;
			e[56576 + a] = t[221][a]
		}
	t[222] =
		"����������������������������������������������������������������毹毷毸溛滖滈溏滀溟溓溔溠溱溹滆滒溽滁溞滉溷溰滍溦滏溲溾滃滜滘溙溒溎溍溤溡溿溳滐滊溗溮溣煇煔煒煣煠煁煝煢煲煸煪煡煂煘煃煋煰煟煐煓����������������������������������煄煍煚牏犍犌犑犐犎猼獂猻猺獀獊獉瑄瑊瑋瑒瑑瑗瑀瑏瑐瑎瑂瑆瑍瑔瓡瓿瓾瓽甝畹畷榃痯瘏瘃痷痾痼痹痸瘐痻痶痭痵痽皙皵盝睕睟睠睒睖睚睩睧睔睙睭矠碇碚碔碏碄碕碅碆碡碃硹碙碀碖硻祼禂祽祹稑稘稙稒稗稕稢稓�"
		.split("");
	for (a = 0; a != t[222].length; ++a)
		if (t[222][a].charCodeAt(0) !== 65533) {
			r[t[222][a]] = 56832 + a;
			e[56832 + a] = t[222][a]
		}
	t[223] =
		"����������������������������������������������������������������稛稐窣窢窞竫筦筤筭筴筩筲筥筳筱筰筡筸筶筣粲粴粯綈綆綀綍絿綅絺綎絻綃絼綌綔綄絽綒罭罫罧罨罬羦羥羧翛翜耡腤腠腷腜腩腛腢腲朡腞腶腧腯����������������������������������腄腡舝艉艄艀艂艅蓱萿葖葶葹蒏蒍葥葑葀蒆葧萰葍葽葚葙葴葳葝蔇葞萷萺萴葺葃葸萲葅萩菙葋萯葂萭葟葰萹葎葌葒葯蓅蒎萻葇萶萳葨葾葄萫葠葔葮葐蜋蜄蛷蜌蛺蛖蛵蝍蛸蜎蜉蜁蛶蜍蜅裖裋裍裎裞裛裚裌裐覅覛觟觥觤�"
		.split("");
	for (a = 0; a != t[223].length; ++a)
		if (t[223][a].charCodeAt(0) !== 65533) {
			r[t[223][a]] = 57088 + a;
			e[57088 + a] = t[223][a]
		}
	t[224] =
		"����������������������������������������������������������������觡觠觢觜触詶誆詿詡訿詷誂誄詵誃誁詴詺谼豋豊豥豤豦貆貄貅賌赨赩趑趌趎趏趍趓趔趐趒跰跠跬跱跮跐跩跣跢跧跲跫跴輆軿輁輀輅輇輈輂輋遒逿����������������������������������遄遉逽鄐鄍鄏鄑鄖鄔鄋鄎酮酯鉈鉒鈰鈺鉦鈳鉥鉞銃鈮鉊鉆鉭鉬鉏鉠鉧鉯鈶鉡鉰鈱鉔鉣鉐鉲鉎鉓鉌鉖鈲閟閜閞閛隒隓隑隗雎雺雽雸雵靳靷靸靲頏頍頎颬飶飹馯馲馰馵骭骫魛鳪鳭鳧麀黽僦僔僗僨僳僛僪僝僤僓僬僰僯僣僠�"
		.split("");
	for (a = 0; a != t[224].length; ++a)
		if (t[224][a].charCodeAt(0) !== 65533) {
			r[t[224][a]] = 57344 + a;
			e[57344 + a] = t[224][a]
		}
	t[225] =
		"����������������������������������������������������������������凘劀劁勩勫匰厬嘧嘕嘌嘒嗼嘏嘜嘁嘓嘂嗺嘝嘄嗿嗹墉塼墐墘墆墁塿塴墋塺墇墑墎塶墂墈塻墔墏壾奫嫜嫮嫥嫕嫪嫚嫭嫫嫳嫢嫠嫛嫬嫞嫝嫙嫨嫟孷寠����������������������������������寣屣嶂嶀嵽嶆嵺嶁嵷嶊嶉嶈嵾嵼嶍嵹嵿幘幙幓廘廑廗廎廜廕廙廒廔彄彃彯徶愬愨慁慞慱慳慒慓慲慬憀慴慔慺慛慥愻慪慡慖戩戧戫搫摍摛摝摴摶摲摳摽摵摦撦摎撂摞摜摋摓摠摐摿搿摬摫摙摥摷敳斠暡暠暟朅朄朢榱榶槉�"
		.split("");
	for (a = 0; a != t[225].length; ++a)
		if (t[225][a].charCodeAt(0) !== 65533) {
			r[t[225][a]] = 57600 + a;
			e[57600 + a] = t[225][a]
		}
	t[226] =
		"����������������������������������������������������������������榠槎榖榰榬榼榑榙榎榧榍榩榾榯榿槄榽榤槔榹槊榚槏榳榓榪榡榞槙榗榐槂榵榥槆歊歍歋殞殟殠毃毄毾滎滵滱漃漥滸漷滻漮漉潎漙漚漧漘漻漒滭漊����������������������������������漶潳滹滮漭潀漰漼漵滫漇漎潃漅滽滶漹漜滼漺漟漍漞漈漡熇熐熉熀熅熂熏煻熆熁熗牄牓犗犕犓獃獍獑獌瑢瑳瑱瑵瑲瑧瑮甀甂甃畽疐瘖瘈瘌瘕瘑瘊瘔皸瞁睼瞅瞂睮瞀睯睾瞃碲碪碴碭碨硾碫碞碥碠碬碢碤禘禊禋禖禕禔禓�"
		.split("");
	for (a = 0; a != t[226].length; ++a)
		if (t[226][a].charCodeAt(0) !== 65533) {
			r[t[226][a]] = 57856 + a;
			e[57856 + a] = t[226][a]
		}
	t[227] =
		"����������������������������������������������������������������禗禈禒禐稫穊稰稯稨稦窨窫窬竮箈箜箊箑箐箖箍箌箛箎箅箘劄箙箤箂粻粿粼粺綧綷緂綣綪緁緀緅綝緎緄緆緋緌綯綹綖綼綟綦綮綩綡緉罳翢翣翥翞����������������������������������耤聝聜膉膆膃膇膍膌膋舕蒗蒤蒡蒟蒺蓎蓂蒬蒮蒫蒹蒴蓁蓍蒪蒚蒱蓐蒝蒧蒻蒢蒔蓇蓌蒛蒩蒯蒨蓖蒘蒶蓏蒠蓗蓔蓒蓛蒰蒑虡蜳蜣蜨蝫蝀蜮蜞蜡蜙蜛蝃蜬蝁蜾蝆蜠蜲蜪蜭蜼蜒蜺蜱蜵蝂蜦蜧蜸蜤蜚蜰蜑裷裧裱裲裺裾裮裼裶裻�"
		.split("");
	for (a = 0; a != t[227].length; ++a)
		if (t[227][a].charCodeAt(0) !== 65533) {
			r[t[227][a]] = 58112 + a;
			e[58112 + a] = t[227][a]
		}
	t[228] =
		"����������������������������������������������������������������裰裬裫覝覡覟覞觩觫觨誫誙誋誒誏誖谽豨豩賕賏賗趖踉踂跿踍跽踊踃踇踆踅跾踀踄輐輑輎輍鄣鄜鄠鄢鄟鄝鄚鄤鄡鄛酺酲酹酳銥銤鉶銛鉺銠銔銪銍����������������������������������銦銚銫鉹銗鉿銣鋮銎銂銕銢鉽銈銡銊銆銌銙銧鉾銇銩銝銋鈭隞隡雿靘靽靺靾鞃鞀鞂靻鞄鞁靿韎韍頖颭颮餂餀餇馝馜駃馹馻馺駂馽駇骱髣髧鬾鬿魠魡魟鳱鳲鳵麧僿儃儰僸儆儇僶僾儋儌僽儊劋劌勱勯噈噂噌嘵噁噊噉噆噘�"
		.split("");
	for (a = 0; a != t[228].length; ++a)
		if (t[228][a].charCodeAt(0) !== 65533) {
			r[t[228][a]] = 58368 + a;
			e[58368 + a] = t[228][a]
		}
	t[229] =
		"����������������������������������������������������������������噚噀嘳嘽嘬嘾嘸嘪嘺圚墫墝墱墠墣墯墬墥墡壿嫿嫴嫽嫷嫶嬃嫸嬂嫹嬁嬇嬅嬏屧嶙嶗嶟嶒嶢嶓嶕嶠嶜嶡嶚嶞幩幝幠幜緳廛廞廡彉徲憋憃慹憱憰憢憉����������������������������������憛憓憯憭憟憒憪憡憍慦憳戭摮摰撖撠撅撗撜撏撋撊撌撣撟摨撱撘敶敺敹敻斲斳暵暰暩暲暷暪暯樀樆樗槥槸樕槱槤樠槿槬槢樛樝槾樧槲槮樔槷槧橀樈槦槻樍槼槫樉樄樘樥樏槶樦樇槴樖歑殥殣殢殦氁氀毿氂潁漦潾澇濆澒�"
		.split("");
	for (a = 0; a != t[229].length; ++a)
		if (t[229][a].charCodeAt(0) !== 65533) {
			r[t[229][a]] = 58624 + a;
			e[58624 + a] = t[229][a]
		}
	t[230] =
		"����������������������������������������������������������������澍澉澌潢潏澅潚澖潶潬澂潕潲潒潐潗澔澓潝漀潡潫潽潧澐潓澋潩潿澕潣潷潪潻熲熯熛熰熠熚熩熵熝熥熞熤熡熪熜熧熳犘犚獘獒獞獟獠獝獛獡獚獙����������������������������������獢璇璉璊璆璁瑽璅璈瑼瑹甈甇畾瘥瘞瘙瘝瘜瘣瘚瘨瘛皜皝皞皛瞍瞏瞉瞈磍碻磏磌磑磎磔磈磃磄磉禚禡禠禜禢禛歶稹窲窴窳箷篋箾箬篎箯箹篊箵糅糈糌糋緷緛緪緧緗緡縃緺緦緶緱緰緮緟罶羬羰羭翭翫翪翬翦翨聤聧膣膟�"
		.split("");
	for (a = 0; a != t[230].length; ++a)
		if (t[230][a].charCodeAt(0) !== 65533) {
			r[t[230][a]] = 58880 + a;
			e[58880 + a] = t[230][a]
		}
	t[231] =
		"����������������������������������������������������������������膞膕膢膙膗舖艏艓艒艐艎艑蔤蔻蔏蔀蔩蔎蔉蔍蔟蔊蔧蔜蓻蔫蓺蔈蔌蓴蔪蓲蔕蓷蓫蓳蓼蔒蓪蓩蔖蓾蔨蔝蔮蔂蓽蔞蓶蔱蔦蓧蓨蓰蓯蓹蔘蔠蔰蔋蔙蔯虢����������������������������������蝖蝣蝤蝷蟡蝳蝘蝔蝛蝒蝡蝚蝑蝞蝭蝪蝐蝎蝟蝝蝯蝬蝺蝮蝜蝥蝏蝻蝵蝢蝧蝩衚褅褌褔褋褗褘褙褆褖褑褎褉覢覤覣觭觰觬諏諆誸諓諑諔諕誻諗誾諀諅諘諃誺誽諙谾豍貏賥賟賙賨賚賝賧趠趜趡趛踠踣踥踤踮踕踛踖踑踙踦踧�"
		.split("");
	for (a = 0; a != t[231].length; ++a)
		if (t[231][a].charCodeAt(0) !== 65533) {
			r[t[231][a]] = 59136 + a;
			e[59136 + a] = t[231][a]
		}
	t[232] =
		"����������������������������������������������������������������踔踒踘踓踜踗踚輬輤輘輚輠輣輖輗遳遰遯遧遫鄯鄫鄩鄪鄲鄦鄮醅醆醊醁醂醄醀鋐鋃鋄鋀鋙銶鋏鋱鋟鋘鋩鋗鋝鋌鋯鋂鋨鋊鋈鋎鋦鋍鋕鋉鋠鋞鋧鋑鋓����������������������������������銵鋡鋆銴镼閬閫閮閰隤隢雓霅霈霂靚鞊鞎鞈韐韏頞頝頦頩頨頠頛頧颲餈飺餑餔餖餗餕駜駍駏駓駔駎駉駖駘駋駗駌骳髬髫髳髲髱魆魃魧魴魱魦魶魵魰魨魤魬鳼鳺鳽鳿鳷鴇鴀鳹鳻鴈鴅鴄麃黓鼏鼐儜儓儗儚儑凞匴叡噰噠噮�"
		.split("");
	for (a = 0; a != t[232].length; ++a)
		if (t[232][a].charCodeAt(0) !== 65533) {
			r[t[232][a]] = 59392 + a;
			e[59392 + a] = t[232][a]
		}
	t[233] =
		"����������������������������������������������������������������噳噦噣噭噲噞噷圜圛壈墽壉墿墺壂墼壆嬗嬙嬛嬡嬔嬓嬐嬖嬨嬚嬠嬞寯嶬嶱嶩嶧嶵嶰嶮嶪嶨嶲嶭嶯嶴幧幨幦幯廩廧廦廨廥彋徼憝憨憖懅憴懆懁懌憺����������������������������������憿憸憌擗擖擐擏擉撽撉擃擛擳擙攳敿敼斢曈暾曀曊曋曏暽暻暺曌朣樴橦橉橧樲橨樾橝橭橶橛橑樨橚樻樿橁橪橤橐橏橔橯橩橠樼橞橖橕橍橎橆歕歔歖殧殪殫毈毇氄氃氆澭濋澣濇澼濎濈潞濄澽澞濊澨瀄澥澮澺澬澪濏澿澸�"
		.split("");
	for (a = 0; a != t[233].length; ++a)
		if (t[233][a].charCodeAt(0) !== 65533) {
			r[t[233][a]] = 59648 + a;
			e[59648 + a] = t[233][a]
		}
	t[234] =
		"����������������������������������������������������������������澢濉澫濍澯澲澰燅燂熿熸燖燀燁燋燔燊燇燏熽燘熼燆燚燛犝犞獩獦獧獬獥獫獪瑿璚璠璔璒璕璡甋疀瘯瘭瘱瘽瘳瘼瘵瘲瘰皻盦瞚瞝瞡瞜瞛瞢瞣瞕瞙����������������������������������瞗磝磩磥磪磞磣磛磡磢磭磟磠禤穄穈穇窶窸窵窱窷篞篣篧篝篕篥篚篨篹篔篪篢篜篫篘篟糒糔糗糐糑縒縡縗縌縟縠縓縎縜縕縚縢縋縏縖縍縔縥縤罃罻罼罺羱翯耪耩聬膱膦膮膹膵膫膰膬膴膲膷膧臲艕艖艗蕖蕅蕫蕍蕓蕡蕘�"
		.split("");
	for (a = 0; a != t[234].length; ++a)
		if (t[234][a].charCodeAt(0) !== 65533) {
			r[t[234][a]] = 59904 + a;
			e[59904 + a] = t[234][a]
		}
	t[235] =
		"����������������������������������������������������������������蕀蕆蕤蕁蕢蕄蕑蕇蕣蔾蕛蕱蕎蕮蕵蕕蕧蕠薌蕦蕝蕔蕥蕬虣虥虤螛螏螗螓螒螈螁螖螘蝹螇螣螅螐螑螝螄螔螜螚螉褞褦褰褭褮褧褱褢褩褣褯褬褟觱諠����������������������������������諢諲諴諵諝謔諤諟諰諈諞諡諨諿諯諻貑貒貐賵賮賱賰賳赬赮趥趧踳踾踸蹀蹅踶踼踽蹁踰踿躽輶輮輵輲輹輷輴遶遹遻邆郺鄳鄵鄶醓醐醑醍醏錧錞錈錟錆錏鍺錸錼錛錣錒錁鍆錭錎錍鋋錝鋺錥錓鋹鋷錴錂錤鋿錩錹錵錪錔錌�"
		.split("");
	for (a = 0; a != t[235].length; ++a)
		if (t[235][a].charCodeAt(0) !== 65533) {
			r[t[235][a]] = 60160 + a;
			e[60160 + a] = t[235][a]
		}
	t[236] =
		"����������������������������������������������������������������錋鋾錉錀鋻錖閼闍閾閹閺閶閿閵閽隩雔霋霒霐鞙鞗鞔韰韸頵頯頲餤餟餧餩馞駮駬駥駤駰駣駪駩駧骹骿骴骻髶髺髹髷鬳鮀鮅鮇魼魾魻鮂鮓鮒鮐魺鮕����������������������������������魽鮈鴥鴗鴠鴞鴔鴩鴝鴘鴢鴐鴙鴟麈麆麇麮麭黕黖黺鼒鼽儦儥儢儤儠儩勴嚓嚌嚍嚆嚄嚃噾嚂噿嚁壖壔壏壒嬭嬥嬲嬣嬬嬧嬦嬯嬮孻寱寲嶷幬幪徾徻懃憵憼懧懠懥懤懨懞擯擩擣擫擤擨斁斀斶旚曒檍檖檁檥檉檟檛檡檞檇檓檎�"
		.split("");
	for (a = 0; a != t[236].length; ++a)
		if (t[236][a].charCodeAt(0) !== 65533) {
			r[t[236][a]] = 60416 + a;
			e[60416 + a] = t[236][a]
		}
	t[237] =
		"����������������������������������������������������������������檕檃檨檤檑橿檦檚檅檌檒歛殭氉濌澩濴濔濣濜濭濧濦濞濲濝濢濨燡燱燨燲燤燰燢獳獮獯璗璲璫璐璪璭璱璥璯甐甑甒甏疄癃癈癉癇皤盩瞵瞫瞲瞷瞶����������������������������������瞴瞱瞨矰磳磽礂磻磼磲礅磹磾礄禫禨穜穛穖穘穔穚窾竀竁簅簏篲簀篿篻簎篴簋篳簂簉簃簁篸篽簆篰篱簐簊糨縭縼繂縳顈縸縪繉繀繇縩繌縰縻縶繄縺罅罿罾罽翴翲耬膻臄臌臊臅臇膼臩艛艚艜薃薀薏薧薕薠薋薣蕻薤薚薞�"
		.split("");
	for (a = 0; a != t[237].length; ++a)
		if (t[237][a].charCodeAt(0) !== 65533) {
			r[t[237][a]] = 60672 + a;
			e[60672 + a] = t[237][a]
		}
	t[238] =
		"����������������������������������������������������������������蕷蕼薉薡蕺蕸蕗薎薖薆薍薙薝薁薢薂薈薅蕹蕶薘薐薟虨螾螪螭蟅螰螬螹螵螼螮蟉蟃蟂蟌螷螯蟄蟊螴螶螿螸螽蟞螲褵褳褼褾襁襒褷襂覭覯覮觲觳謞����������������������������������謘謖謑謅謋謢謏謒謕謇謍謈謆謜謓謚豏豰豲豱豯貕貔賹赯蹎蹍蹓蹐蹌蹇轃轀邅遾鄸醚醢醛醙醟醡醝醠鎡鎃鎯鍤鍖鍇鍼鍘鍜鍶鍉鍐鍑鍠鍭鎏鍌鍪鍹鍗鍕鍒鍏鍱鍷鍻鍡鍞鍣鍧鎀鍎鍙闇闀闉闃闅閷隮隰隬霠霟霘霝霙鞚鞡鞜�"
		.split("");
	for (a = 0; a != t[238].length; ++a)
		if (t[238][a].charCodeAt(0) !== 65533) {
			r[t[238][a]] = 60928 + a;
			e[60928 + a] = t[238][a]
		}
	t[239] =
		"����������������������������������������������������������������鞞鞝韕韔韱顁顄顊顉顅顃餥餫餬餪餳餲餯餭餱餰馘馣馡騂駺駴駷駹駸駶駻駽駾駼騃骾髾髽鬁髼魈鮚鮨鮞鮛鮦鮡鮥鮤鮆鮢鮠鮯鴳鵁鵧鴶鴮鴯鴱鴸鴰����������������������������������鵅鵂鵃鴾鴷鵀鴽翵鴭麊麉麍麰黈黚黻黿鼤鼣鼢齔龠儱儭儮嚘嚜嚗嚚嚝嚙奰嬼屩屪巀幭幮懘懟懭懮懱懪懰懫懖懩擿攄擽擸攁攃擼斔旛曚曛曘櫅檹檽櫡櫆檺檶檷櫇檴檭歞毉氋瀇瀌瀍瀁瀅瀔瀎濿瀀濻瀦濼濷瀊爁燿燹爃燽獶�"
		.split("");
	for (a = 0; a != t[239].length; ++a)
		if (t[239][a].charCodeAt(0) !== 65533) {
			r[t[239][a]] = 61184 + a;
			e[61184 + a] = t[239][a]
		}
	t[240] =
		"����������������������������������������������������������������璸瓀璵瓁璾璶璻瓂甔甓癜癤癙癐癓癗癚皦皽盬矂瞺磿礌礓礔礉礐礒礑禭禬穟簜簩簙簠簟簭簝簦簨簢簥簰繜繐繖繣繘繢繟繑繠繗繓羵羳翷翸聵臑臒����������������������������������臐艟艞薴藆藀藃藂薳薵薽藇藄薿藋藎藈藅薱薶藒蘤薸薷薾虩蟧蟦蟢蟛蟫蟪蟥蟟蟳蟤蟔蟜蟓蟭蟘蟣螤蟗蟙蠁蟴蟨蟝襓襋襏襌襆襐襑襉謪謧謣謳謰謵譇謯謼謾謱謥謷謦謶謮謤謻謽謺豂豵貙貘貗賾贄贂贀蹜蹢蹠蹗蹖蹞蹥蹧�"
		.split("");
	for (a = 0; a != t[240].length; ++a)
		if (t[240][a].charCodeAt(0) !== 65533) {
			r[t[240][a]] = 61440 + a;
			e[61440 + a] = t[240][a]
		}
	t[241] =
		"����������������������������������������������������������������蹛蹚蹡蹝蹩蹔轆轇轈轋鄨鄺鄻鄾醨醥醧醯醪鎵鎌鎒鎷鎛鎝鎉鎧鎎鎪鎞鎦鎕鎈鎙鎟鎍鎱鎑鎲鎤鎨鎴鎣鎥闒闓闑隳雗雚巂雟雘雝霣霢霥鞬鞮鞨鞫鞤鞪����������������������������������鞢鞥韗韙韖韘韺顐顑顒颸饁餼餺騏騋騉騍騄騑騊騅騇騆髀髜鬈鬄鬅鬩鬵魊魌魋鯇鯆鯃鮿鯁鮵鮸鯓鮶鯄鮹鮽鵜鵓鵏鵊鵛鵋鵙鵖鵌鵗鵒鵔鵟鵘鵚麎麌黟鼁鼀鼖鼥鼫鼪鼩鼨齌齕儴儵劖勷厴嚫嚭嚦嚧嚪嚬壚壝壛夒嬽嬾嬿巃幰�"
		.split("");
	for (a = 0; a != t[241].length; ++a)
		if (t[241][a].charCodeAt(0) !== 65533) {
			r[t[241][a]] = 61696 + a;
			e[61696 + a] = t[241][a]
		}
	t[242] =
		"����������������������������������������������������������������徿懻攇攐攍攉攌攎斄旞旝曞櫧櫠櫌櫑櫙櫋櫟櫜櫐櫫櫏櫍櫞歠殰氌瀙瀧瀠瀖瀫瀡瀢瀣瀩瀗瀤瀜瀪爌爊爇爂爅犥犦犤犣犡瓋瓅璷瓃甖癠矉矊矄矱礝礛����������������������������������礡礜礗礞禰穧穨簳簼簹簬簻糬糪繶繵繸繰繷繯繺繲繴繨罋罊羃羆羷翽翾聸臗臕艤艡艣藫藱藭藙藡藨藚藗藬藲藸藘藟藣藜藑藰藦藯藞藢蠀蟺蠃蟶蟷蠉蠌蠋蠆蟼蠈蟿蠊蠂襢襚襛襗襡襜襘襝襙覈覷覶觶譐譈譊譀譓譖譔譋譕�"
		.split("");
	for (a = 0; a != t[242].length; ++a)
		if (t[242][a].charCodeAt(0) !== 65533) {
			r[t[242][a]] = 61952 + a;
			e[61952 + a] = t[242][a]
		}
	t[243] =
		"����������������������������������������������������������������譑譂譒譗豃豷豶貚贆贇贉趬趪趭趫蹭蹸蹳蹪蹯蹻軂轒轑轏轐轓辴酀鄿醰醭鏞鏇鏏鏂鏚鏐鏹鏬鏌鏙鎩鏦鏊鏔鏮鏣鏕鏄鏎鏀鏒鏧镽闚闛雡霩霫霬霨霦����������������������������������鞳鞷鞶韝韞韟顜顙顝顗颿颽颻颾饈饇饃馦馧騚騕騥騝騤騛騢騠騧騣騞騜騔髂鬋鬊鬎鬌鬷鯪鯫鯠鯞鯤鯦鯢鯰鯔鯗鯬鯜鯙鯥鯕鯡鯚鵷鶁鶊鶄鶈鵱鶀鵸鶆鶋鶌鵽鵫鵴鵵鵰鵩鶅鵳鵻鶂鵯鵹鵿鶇鵨麔麑黀黼鼭齀齁齍齖齗齘匷嚲�"
		.split("");
	for (a = 0; a != t[243].length; ++a)
		if (t[243][a].charCodeAt(0) !== 65533) {
			r[t[243][a]] = 62208 + a;
			e[62208 + a] = t[243][a]
		}
	t[244] =
		"����������������������������������������������������������������嚵嚳壣孅巆巇廮廯忀忁懹攗攖攕攓旟曨曣曤櫳櫰櫪櫨櫹櫱櫮櫯瀼瀵瀯瀷瀴瀱灂瀸瀿瀺瀹灀瀻瀳灁爓爔犨獽獼璺皫皪皾盭矌矎矏矍矲礥礣礧礨礤礩����������������������������������禲穮穬穭竷籉籈籊籇籅糮繻繾纁纀羺翿聹臛臙舋艨艩蘢藿蘁藾蘛蘀藶蘄蘉蘅蘌藽蠙蠐蠑蠗蠓蠖襣襦覹觷譠譪譝譨譣譥譧譭趮躆躈躄轙轖轗轕轘轚邍酃酁醷醵醲醳鐋鐓鏻鐠鐏鐔鏾鐕鐐鐨鐙鐍鏵鐀鏷鐇鐎鐖鐒鏺鐉鏸鐊鏿�"
		.split("");
	for (a = 0; a != t[244].length; ++a)
		if (t[244][a].charCodeAt(0) !== 65533) {
			r[t[244][a]] = 62464 + a;
			e[62464 + a] = t[244][a]
		}
	t[245] =
		"����������������������������������������������������������������鏼鐌鏶鐑鐆闞闠闟霮霯鞹鞻韽韾顠顢顣顟飁飂饐饎饙饌饋饓騲騴騱騬騪騶騩騮騸騭髇髊髆鬐鬒鬑鰋鰈鯷鰅鰒鯸鱀鰇鰎鰆鰗鰔鰉鶟鶙鶤鶝鶒鶘鶐鶛����������������������������������鶠鶔鶜鶪鶗鶡鶚鶢鶨鶞鶣鶿鶩鶖鶦鶧麙麛麚黥黤黧黦鼰鼮齛齠齞齝齙龑儺儹劘劗囃嚽嚾孈孇巋巏廱懽攛欂櫼欃櫸欀灃灄灊灈灉灅灆爝爚爙獾甗癪矐礭礱礯籔籓糲纊纇纈纋纆纍罍羻耰臝蘘蘪蘦蘟蘣蘜蘙蘧蘮蘡蘠蘩蘞蘥�"
		.split("");
	for (a = 0; a != t[245].length; ++a)
		if (t[245][a].charCodeAt(0) !== 65533) {
			r[t[245][a]] = 62720 + a;
			e[62720 + a] = t[245][a]
		}
	t[246] =
		"����������������������������������������������������������������蠩蠝蠛蠠蠤蠜蠫衊襭襩襮襫觺譹譸譅譺譻贐贔趯躎躌轞轛轝酆酄酅醹鐿鐻鐶鐩鐽鐼鐰鐹鐪鐷鐬鑀鐱闥闤闣霵霺鞿韡顤飉飆飀饘饖騹騽驆驄驂驁騺����������������������������������騿髍鬕鬗鬘鬖鬺魒鰫鰝鰜鰬鰣鰨鰩鰤鰡鶷鶶鶼鷁鷇鷊鷏鶾鷅鷃鶻鶵鷎鶹鶺鶬鷈鶱鶭鷌鶳鷍鶲鹺麜黫黮黭鼛鼘鼚鼱齎齥齤龒亹囆囅囋奱孋孌巕巑廲攡攠攦攢欋欈欉氍灕灖灗灒爞爟犩獿瓘瓕瓙瓗癭皭礵禴穰穱籗籜籙籛籚�"
		.split("");
	for (a = 0; a != t[246].length; ++a)
		if (t[246][a].charCodeAt(0) !== 65533) {
			r[t[246][a]] = 62976 + a;
			e[62976 + a] = t[246][a]
		}
	t[247] =
		"����������������������������������������������������������������糴糱纑罏羇臞艫蘴蘵蘳蘬蘲蘶蠬蠨蠦蠪蠥襱覿覾觻譾讄讂讆讅譿贕躕躔躚躒躐躖躗轠轢酇鑌鑐鑊鑋鑏鑇鑅鑈鑉鑆霿韣顪顩飋饔饛驎驓驔驌驏驈驊����������������������������������驉驒驐髐鬙鬫鬻魖魕鱆鱈鰿鱄鰹鰳鱁鰼鰷鰴鰲鰽鰶鷛鷒鷞鷚鷋鷐鷜鷑鷟鷩鷙鷘鷖鷵鷕鷝麶黰鼵鼳鼲齂齫龕龢儽劙壨壧奲孍巘蠯彏戁戃戄攩攥斖曫欑欒欏毊灛灚爢玂玁玃癰矔籧籦纕艬蘺虀蘹蘼蘱蘻蘾蠰蠲蠮蠳襶襴襳觾�"
		.split("");
	for (a = 0; a != t[247].length; ++a)
		if (t[247][a].charCodeAt(0) !== 65533) {
			r[t[247][a]] = 63232 + a;
			e[63232 + a] = t[247][a]
		}
	t[248] =
		"����������������������������������������������������������������讌讎讋讈豅贙躘轤轣醼鑢鑕鑝鑗鑞韄韅頀驖驙鬞鬟鬠鱒鱘鱐鱊鱍鱋鱕鱙鱌鱎鷻鷷鷯鷣鷫鷸鷤鷶鷡鷮鷦鷲鷰鷢鷬鷴鷳鷨鷭黂黐黲黳鼆鼜鼸鼷鼶齃齏����������������������������������齱齰齮齯囓囍孎屭攭曭曮欓灟灡灝灠爣瓛瓥矕礸禷禶籪纗羉艭虃蠸蠷蠵衋讔讕躞躟躠躝醾醽釂鑫鑨鑩雥靆靃靇韇韥驞髕魙鱣鱧鱦鱢鱞鱠鸂鷾鸇鸃鸆鸅鸀鸁鸉鷿鷽鸄麠鼞齆齴齵齶囔攮斸欘欙欗欚灢爦犪矘矙礹籩籫糶纚�"
		.split("");
	for (a = 0; a != t[248].length; ++a)
		if (t[248][a].charCodeAt(0) !== 65533) {
			r[t[248][a]] = 63488 + a;
			e[63488 + a] = t[248][a]
		}
	t[249] =
		"����������������������������������������������������������������纘纛纙臠臡虆虇虈襹襺襼襻觿讘讙躥躤躣鑮鑭鑯鑱鑳靉顲饟鱨鱮鱭鸋鸍鸐鸏鸒鸑麡黵鼉齇齸齻齺齹圞灦籯蠼趲躦釃鑴鑸鑶鑵驠鱴鱳鱱鱵鸔鸓黶鼊����������������������������������龤灨灥糷虪蠾蠽蠿讞貜躩軉靋顳顴飌饡馫驤驦驧鬤鸕鸗齈戇欞爧虌躨钂钀钁驩驨鬮鸙爩虋讟钃鱹麷癵驫鱺鸝灩灪麤齾齉龘碁銹裏墻恒粧嫺╔╦╗╠╬╣╚╩╝╒╤╕╞╪╡╘╧╛╓╥╖╟╫╢╙╨╜║═╭╮╰╯▓�"
		.split("");
	for (a = 0; a != t[249].length; ++a)
		if (t[249][a].charCodeAt(0) !== 65533) {
			r[t[249][a]] = 63744 + a;
			e[63744 + a] = t[249][a]
		}
	return {
		enc: r,
		dec: e
	}
}();
cptable[1250] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€�‚�„…†‡�‰Š‹ŚŤŽŹ�‘’“”•–—�™š›śťžź ˇ˘Ł¤Ą¦§¨©Ş«¬­®Ż°±˛ł´µ¶·¸ąş»Ľ˝ľżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[1251] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬­®Ї°±Ііґµ¶·ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[1252] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž��‘’“”•–—˜™š›œ�žŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[1253] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[1254] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€�‚ƒ„…†‡ˆ‰Š‹Œ����‘’“”•–—˜™š›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[1255] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€�‚ƒ„…†‡ˆ‰�‹�����‘’“”•–—˜™�›���� ¡¢£₪¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾¿ְֱֲֳִֵֶַָֹ�ֻּֽ־ֿ׀ׁׂ׃װױײ׳״�������אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[1256] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€پ‚ƒ„…†‡ˆ‰ٹ‹Œچژڈگ‘’“”•–—ک™ڑ›œ‌‍ں ،¢£¤¥¦§¨©ھ«¬­®¯°±²³´µ¶·¸¹؛»¼½¾؟ہءآأؤإئابةتثجحخدذرزسشصض×طظعغـفقكàلâمنهوçèéêëىيîïًٌٍَôُِ÷ّùْûü‎‏ے",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[1257] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€�‚�„…†‡�‰�‹�¨ˇ¸�‘’“”•–—�™�›�¯˛� �¢£¤�¦§Ø©Ŗ«¬­®Æ°±²³´µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž˙",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[1258] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€�‚ƒ„…†‡ˆ‰�‹Œ����‘’“”•–—˜™�›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[1e4] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[10006] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦­ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ�",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[10007] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°¢£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµ∂ЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[10008] = function() {
	var e = [],
		r = {},
		t = [],
		a;
	t[0] =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~���������������������������������������������������������������������������������������"
		.split("");
	for (a = 0; a != t[0].length; ++a)
		if (t[0][a].charCodeAt(0) !== 65533) {
			r[t[0][a]] = 0 + a;
			e[0 + a] = t[0][a]
		}
	t[161] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������　、。・ˉˇ¨〃々―～�…‘’“”〔〕〈〉《》「」『』〖〗【】±×÷∶∧∨∑∏∪∩∈∷√⊥∥∠⌒⊙∫∮≡≌≈∽∝≠≮≯≤≥∞∵∴♂♀°′″℃＄¤￠￡‰§№☆★○●◎◇◆□■△▲※→←↑↓〓�"
		.split("");
	for (a = 0; a != t[161].length; ++a)
		if (t[161][a].charCodeAt(0) !== 65533) {
			r[t[161][a]] = 41216 + a;
			e[41216 + a] = t[161][a]
		}
	t[162] =
		"���������������������������������������������������������������������������������������������������������������������������������������������������������������������������������⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑⒒⒓⒔⒕⒖⒗⒘⒙⒚⒛⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂⒃⒄⒅⒆⒇①②③④⑤⑥⑦⑧⑨⑩��㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩��ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ���"
		.split("");
	for (a = 0; a != t[162].length; ++a)
		if (t[162][a].charCodeAt(0) !== 65533) {
			r[t[162][a]] = 41472 + a;
			e[41472 + a] = t[162][a]
		}
	t[163] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������！＂＃￥％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝￣�"
		.split("");
	for (a = 0; a != t[163].length; ++a)
		if (t[163][a].charCodeAt(0) !== 65533) {
			r[t[163][a]] = 41728 + a;
			e[41728 + a] = t[163][a]
		}
	t[164] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん������������"
		.split("");
	for (a = 0; a != t[164].length; ++a)
		if (t[164][a].charCodeAt(0) !== 65533) {
			r[t[164][a]] = 41984 + a;
			e[41984 + a] = t[164][a]
		}
	t[165] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ���������"
		.split("");
	for (a = 0; a != t[165].length; ++a)
		if (t[165][a].charCodeAt(0) !== 65533) {
			r[t[165][a]] = 42240 + a;
			e[42240 + a] = t[165][a]
		}
	t[166] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ��������αβγδεζηθικλμνξοπρστυφχψω���������������������������������������"
		.split("");
	for (a = 0; a != t[166].length; ++a)
		if (t[166][a].charCodeAt(0) !== 65533) {
			r[t[166][a]] = 42496 + a;
			e[42496 + a] = t[166][a]
		}
	t[167] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ���������������абвгдеёжзийклмнопрстуфхцчшщъыьэюя��������������"
		.split("");
	for (a = 0; a != t[167].length; ++a)
		if (t[167][a].charCodeAt(0) !== 65533) {
			r[t[167][a]] = 42752 + a;
			e[42752 + a] = t[167][a]
		}
	t[168] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüê����������ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦㄧㄨㄩ����������������������"
		.split("");
	for (a = 0; a != t[168].length; ++a)
		if (t[168][a].charCodeAt(0) !== 65533) {
			r[t[168][a]] = 43008 + a;
			e[43008 + a] = t[168][a]
		}
	t[169] =
		"��������������������������������������������������������������������������������������������������������������������������������������������������������������������─'a! `%p━'``p│'a! `%p┃'``p┄┅┆┇┈┉┊┋┌┍┎'a! `%p┏'``p┐┑┒'a! `%p┓'``p└┕┖'a! `%p┗'``p┘┙┚'a! `%p┛'``p├┝┞┟┠┡┢'a! `%p┣'``p┤┥┦┧┨┩┪'a! `%p┫'``p┬┭┮┯┰┱┲'a! `%p┳'``p┴┵┶┷┸┹┺'a! `%p┻'``p┼┽┾┿╀╁╂╃╄╅╆╇╈╉╊'a! `%p╋'``p����������������"
		.split("");
	for (a = 0; a != t[169].length; ++a)
		if (t[169][a].charCodeAt(0) !== 65533) {
			r[t[169][a]] = 43264 + a;
			e[43264 + a] = t[169][a]
		}
	t[176] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥�"
		.split("");
	for (a = 0; a != t[176].length; ++a)
		if (t[176][a].charCodeAt(0) !== 65533) {
			r[t[176][a]] = 45056 + a;
			e[45056 + a] = t[176][a]
		}
	t[177] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳�"
		.split("");
	for (a = 0; a != t[177].length; ++a)
		if (t[177][a].charCodeAt(0) !== 65533) {
			r[t[177][a]] = 45312 + a;
			e[45312 + a] = t[177][a]
		}
	t[178] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖�"
		.split("");
	for (a = 0; a != t[178].length; ++a)
		if (t[178][a].charCodeAt(0) !== 65533) {
			r[t[178][a]] = 45568 + a;
			e[45568 + a] = t[178][a]
		}
	t[179] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚�"
		.split("");
	for (a = 0; a != t[179].length; ++a)
		if (t[179][a].charCodeAt(0) !== 65533) {
			r[t[179][a]] = 45824 + a;
			e[45824 + a] = t[179][a]
		}
	t[180] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮�"
		.split("");
	for (a = 0; a != t[180].length; ++a)
		if (t[180][a].charCodeAt(0) !== 65533) {
			r[t[180][a]] = 46080 + a;
			e[46080 + a] = t[180][a]
		}
	t[181] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠�"
		.split("");
	for (a = 0; a != t[181].length; ++a)
		if (t[181][a].charCodeAt(0) !== 65533) {
			r[t[181][a]] = 46336 + a;
			e[46336 + a] = t[181][a]
		}
	t[182] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二�"
		.split("");
	for (a = 0; a != t[182].length; ++a)
		if (t[182][a].charCodeAt(0) !== 65533) {
			r[t[182][a]] = 46592 + a;
			e[46592 + a] = t[182][a]
		}
	t[183] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服�"
		.split("");
	for (a = 0; a != t[183].length; ++a)
		if (t[183][a].charCodeAt(0) !== 65533) {
			r[t[183][a]] = 46848 + a;
			e[46848 + a] = t[183][a]
		}
	t[184] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹�"
		.split("");
	for (a = 0; a != t[184].length; ++a)
		if (t[184][a].charCodeAt(0) !== 65533) {
			r[t[184][a]] = 47104 + a;
			e[47104 + a] = t[184][a]
		}
	t[185] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈�"
		.split("");
	for (a = 0; a != t[185].length; ++a)
		if (t[185][a].charCodeAt(0) !== 65533) {
			r[t[185][a]] = 47360 + a;
			e[47360 + a] = t[185][a]
		}
	t[186] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖�"
		.split("");
	for (a = 0; a != t[186].length; ++a)
		if (t[186][a].charCodeAt(0) !== 65533) {
			r[t[186][a]] = 47616 + a;
			e[47616 + a] = t[186][a]
		}
	t[187] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕�"
		.split("");
	for (a = 0; a != t[187].length; ++a)
		if (t[187][a].charCodeAt(0) !== 65533) {
			r[t[187][a]] = 47872 + a;
			e[47872 + a] = t[187][a]
		}
	t[188] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件�"
		.split("");
	for (a = 0; a != t[188].length; ++a)
		if (t[188][a].charCodeAt(0) !== 65533) {
			r[t[188][a]] = 48128 + a;
			e[48128 + a] = t[188][a]
		}
	t[189] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸�"
		.split("");
	for (a = 0; a != t[189].length; ++a)
		if (t[189][a].charCodeAt(0) !== 65533) {
			r[t[189][a]] = 48384 + a;
			e[48384 + a] = t[189][a]
		}
	t[190] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻�"
		.split("");
	for (a = 0; a != t[190].length; ++a)
		if (t[190][a].charCodeAt(0) !== 65533) {
			r[t[190][a]] = 48640 + a;
			e[48640 + a] = t[190][a]
		}
	t[191] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀�"
		.split("");
	for (a = 0; a != t[191].length; ++a)
		if (t[191][a].charCodeAt(0) !== 65533) {
			r[t[191][a]] = 48896 + a;
			e[48896 + a] = t[191][a]
		}
	t[192] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐�"
		.split("");
	for (a = 0; a != t[192].length; ++a)
		if (t[192][a].charCodeAt(0) !== 65533) {
			r[t[192][a]] = 49152 + a;
			e[49152 + a] = t[192][a]
		}
	t[193] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿�"
		.split("");
	for (a = 0; a != t[193].length; ++a)
		if (t[193][a].charCodeAt(0) !== 65533) {
			r[t[193][a]] = 49408 + a;
			e[49408 + a] = t[193][a]
		}
	t[194] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫�"
		.split("");
	for (a = 0; a != t[194].length; ++a)
		if (t[194][a].charCodeAt(0) !== 65533) {
			r[t[194][a]] = 49664 + a;
			e[49664 + a] = t[194][a]
		}
	t[195] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸�"
		.split("");
	for (a = 0; a != t[195].length; ++a)
		if (t[195][a].charCodeAt(0) !== 65533) {
			r[t[195][a]] = 49920 + a;
			e[49920 + a] = t[195][a]
		}
	t[196] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁�"
		.split("");
	for (a = 0; a != t[196].length; ++a)
		if (t[196][a].charCodeAt(0) !== 65533) {
			r[t[196][a]] = 50176 + a;
			e[50176 + a] = t[196][a]
		}
	t[197] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗�"
		.split("");
	for (a = 0; a != t[197].length; ++a)
		if (t[197][a].charCodeAt(0) !== 65533) {
			r[t[197][a]] = 50432 + a;
			e[50432 + a] = t[197][a]
		}
	t[198] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐�"
		.split("");
	for (a = 0; a != t[198].length; ++a)
		if (t[198][a].charCodeAt(0) !== 65533) {
			r[t[198][a]] = 50688 + a;
			e[50688 + a] = t[198][a]
		}
	t[199] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠�"
		.split("");
	for (a = 0; a != t[199].length; ++a)
		if (t[199][a].charCodeAt(0) !== 65533) {
			r[t[199][a]] = 50944 + a;
			e[50944 + a] = t[199][a]
		}
	t[200] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁�"
		.split("");
	for (a = 0; a != t[200].length; ++a)
		if (t[200][a].charCodeAt(0) !== 65533) {
			r[t[200][a]] = 51200 + a;
			e[51200 + a] = t[200][a]
		}
	t[201] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳�"
		.split("");
	for (a = 0; a != t[201].length; ++a)
		if (t[201][a].charCodeAt(0) !== 65533) {
			r[t[201][a]] = 51456 + a;
			e[51456 + a] = t[201][a]
		}
	t[202] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱�"
		.split("");
	for (a = 0; a != t[202].length; ++a)
		if (t[202][a].charCodeAt(0) !== 65533) {
			r[t[202][a]] = 51712 + a;
			e[51712 + a] = t[202][a]
		}
	t[203] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔�"
		.split("");
	for (a = 0; a != t[203].length; ++a)
		if (t[203][a].charCodeAt(0) !== 65533) {
			r[t[203][a]] = 51968 + a;
			e[51968 + a] = t[203][a]
		}
	t[204] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃�"
		.split("");
	for (a = 0; a != t[204].length; ++a)
		if (t[204][a].charCodeAt(0) !== 65533) {
			r[t[204][a]] = 52224 + a;
			e[52224 + a] = t[204][a]
		}
	t[205] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威�"
		.split("");
	for (a = 0; a != t[205].length; ++a)
		if (t[205][a].charCodeAt(0) !== 65533) {
			r[t[205][a]] = 52480 + a;
			e[52480 + a] = t[205][a]
		}
	t[206] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺�"
		.split("");
	for (a = 0; a != t[206].length; ++a)
		if (t[206][a].charCodeAt(0) !== 65533) {
			r[t[206][a]] = 52736 + a;
			e[52736 + a] = t[206][a]
		}
	t[207] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓�"
		.split("");
	for (a = 0; a != t[207].length; ++a)
		if (t[207][a].charCodeAt(0) !== 65533) {
			r[t[207][a]] = 52992 + a;
			e[52992 + a] = t[207][a]
		}
	t[208] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄�"
		.split("");
	for (a = 0; a != t[208].length; ++a)
		if (t[208][a].charCodeAt(0) !== 65533) {
			r[t[208][a]] = 53248 + a;
			e[53248 + a] = t[208][a]
		}
	t[209] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶�"
		.split("");
	for (a = 0; a != t[209].length; ++a)
		if (t[209][a].charCodeAt(0) !== 65533) {
			r[t[209][a]] = 53504 + a;
			e[53504 + a] = t[209][a]
		}
	t[210] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐�"
		.split("");
	for (a = 0; a != t[210].length; ++a)
		if (t[210][a].charCodeAt(0) !== 65533) {
			r[t[210][a]] = 53760 + a;
			e[53760 + a] = t[210][a]
		}
	t[211] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉�"
		.split("");
	for (a = 0; a != t[211].length; ++a)
		if (t[211][a].charCodeAt(0) !== 65533) {
			r[t[211][a]] = 54016 + a;
			e[54016 + a] = t[211][a]
		}
	t[212] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧�"
		.split("");
	for (a = 0; a != t[212].length; ++a)
		if (t[212][a].charCodeAt(0) !== 65533) {
			r[t[212][a]] = 54272 + a;
			e[54272 + a] = t[212][a]
		}
	t[213] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政�"
		.split("");
	for (a = 0; a != t[213].length; ++a)
		if (t[213][a].charCodeAt(0) !== 65533) {
			r[t[213][a]] = 54528 + a;
			e[54528 + a] = t[213][a]
		}
	t[214] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑�"
		.split("");
	for (a = 0; a != t[214].length; ++a)
		if (t[214][a].charCodeAt(0) !== 65533) {
			r[t[214][a]] = 54784 + a;
			e[54784 + a] = t[214][a]
		}
	t[215] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座������"
		.split("");
	for (a = 0; a != t[215].length; ++a)
		if (t[215][a].charCodeAt(0) !== 65533) {
			r[t[215][a]] = 55040 + a;
			e[55040 + a] = t[215][a]
		}
	t[216] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝�"
		.split("");
	for (a = 0; a != t[216].length; ++a)
		if (t[216][a].charCodeAt(0) !== 65533) {
			r[t[216][a]] = 55296 + a;
			e[55296 + a] = t[216][a]
		}
	t[217] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼�"
		.split("");
	for (a = 0; a != t[217].length; ++a)
		if (t[217][a].charCodeAt(0) !== 65533) {
			r[t[217][a]] = 55552 + a;
			e[55552 + a] = t[217][a]
		}
	t[218] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺�"
		.split("");
	for (a = 0; a != t[218].length; ++a)
		if (t[218][a].charCodeAt(0) !== 65533) {
			r[t[218][a]] = 55808 + a;
			e[55808 + a] = t[218][a]
		}
	t[219] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝�"
		.split("");
	for (a = 0; a != t[219].length; ++a)
		if (t[219][a].charCodeAt(0) !== 65533) {
			r[t[219][a]] = 56064 + a;
			e[56064 + a] = t[219][a]
		}
	t[220] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥�"
		.split("");
	for (a = 0; a != t[220].length; ++a)
		if (t[220][a].charCodeAt(0) !== 65533) {
			r[t[220][a]] = 56320 + a;
			e[56320 + a] = t[220][a]
		}
	t[221] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺�"
		.split("");
	for (a = 0; a != t[221].length; ++a)
		if (t[221][a].charCodeAt(0) !== 65533) {
			r[t[221][a]] = 56576 + a;
			e[56576 + a] = t[221][a]
		}
	t[222] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖�"
		.split("");
	for (a = 0; a != t[222].length; ++a)
		if (t[222][a].charCodeAt(0) !== 65533) {
			r[t[222][a]] = 56832 + a;
			e[56832 + a] = t[222][a]
		}
	t[223] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼�"
		.split("");
	for (a = 0; a != t[223].length; ++a)
		if (t[223][a].charCodeAt(0) !== 65533) {
			r[t[223][a]] = 57088 + a;
			e[57088 + a] = t[223][a]
		}
	t[224] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼�"
		.split("");
	for (a = 0; a != t[224].length; ++a)
		if (t[224][a].charCodeAt(0) !== 65533) {
			r[t[224][a]] = 57344 + a;
			e[57344 + a] = t[224][a]
		}
	t[225] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉後徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺�"
		.split("");
	for (a = 0; a != t[225].length; ++a)
		if (t[225][a].charCodeAt(0) !== 65533) {
			r[t[225][a]] = 57600 + a;
			e[57600 + a] = t[225][a]
		}
	t[226] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧饨饩饪饫饬饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂�"
		.split("");
	for (a = 0; a != t[226].length; ++a)
		if (t[226][a].charCodeAt(0) !== 65533) {
			r[t[226][a]] = 57856 + a;
			e[57856 + a] = t[226][a]
		}
	t[227] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾�"
		.split("");
	for (a = 0; a != t[227].length; ++a)
		if (t[227][a].charCodeAt(0) !== 65533) {
			r[t[227][a]] = 58112 + a;
			e[58112 + a] = t[227][a]
		}
	t[228] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑�"
		.split("");
	for (a = 0; a != t[228].length; ++a)
		if (t[228][a].charCodeAt(0) !== 65533) {
			r[t[228][a]] = 58368 + a;
			e[58368 + a] = t[228][a]
		}
	t[229] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣�"
		.split("");
	for (a = 0; a != t[229].length; ++a)
		if (t[229][a].charCodeAt(0) !== 65533) {
			r[t[229][a]] = 58624 + a;
			e[58624 + a] = t[229][a]
		}
	t[230] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩�"
		.split("");
	for (a = 0; a != t[230].length; ++a)
		if (t[230][a].charCodeAt(0) !== 65533) {
			r[t[230][a]] = 58880 + a;
			e[58880 + a] = t[230][a]
		}
	t[231] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡缢缣缤缥缦缧缪缫缬缭缯缰缱缲缳缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬�"
		.split("");
	for (a = 0; a != t[231].length; ++a)
		if (t[231][a].charCodeAt(0) !== 65533) {
			r[t[231][a]] = 59136 + a;
			e[59136 + a] = t[231][a]
		}
	t[232] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹�"
		.split("");
	for (a = 0; a != t[232].length; ++a)
		if (t[232][a].charCodeAt(0) !== 65533) {
			r[t[232][a]] = 59392 + a;
			e[59392 + a] = t[232][a]
		}
	t[233] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋�"
		.split("");
	for (a = 0; a != t[233].length; ++a)
		if (t[233][a].charCodeAt(0) !== 65533) {
			r[t[233][a]] = 59648 + a;
			e[59648 + a] = t[233][a]
		}
	t[234] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰�"
		.split("");
	for (a = 0; a != t[234].length; ++a)
		if (t[234][a].charCodeAt(0) !== 65533) {
			r[t[234][a]] = 59904 + a;
			e[59904 + a] = t[234][a]
		}
	t[235] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻�"
		.split("");
	for (a = 0; a != t[235].length; ++a)
		if (t[235][a].charCodeAt(0) !== 65533) {
			r[t[235][a]] = 60160 + a;
			e[60160 + a] = t[235][a]
		}
	t[236] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐�"
		.split("");
	for (a = 0; a != t[236].length; ++a)
		if (t[236][a].charCodeAt(0) !== 65533) {
			r[t[236][a]] = 60416 + a;
			e[60416 + a] = t[236][a]
		}
	t[237] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨�"
		.split("");
	for (a = 0; a != t[237].length; ++a)
		if (t[237][a].charCodeAt(0) !== 65533) {
			r[t[237][a]] = 60672 + a;
			e[60672 + a] = t[237][a]
		}
	t[238] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶钷钸钹钺钼钽钿铄铈铉铊铋铌铍铎铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪�"
		.split("");
	for (a = 0; a != t[238].length; ++a)
		if (t[238][a].charCodeAt(0) !== 65533) {
			r[t[238][a]] = 60928 + a;
			e[60928 + a] = t[238][a]
		}
	t[239] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒锓锔锕锖锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤镥镦镧镨镩镪镫镬镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔�"
		.split("");
	for (a = 0; a != t[239].length; ++a)
		if (t[239][a].charCodeAt(0) !== 65533) {
			r[t[239][a]] = 61184 + a;
			e[61184 + a] = t[239][a]
		}
	t[240] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨鸩鸪鸫鸬鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦鹧鹨鹩鹪鹫鹬鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙�"
		.split("");
	for (a = 0; a != t[240].length; ++a)
		if (t[240][a].charCodeAt(0) !== 65533) {
			r[t[240][a]] = 61440 + a;
			e[61440 + a] = t[240][a]
		}
	t[241] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃�"
		.split("");
	for (a = 0; a != t[241].length; ++a)
		if (t[241][a].charCodeAt(0) !== 65533) {
			r[t[241][a]] = 61696 + a;
			e[61696 + a] = t[241][a]
		}
	t[242] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒�"
		.split("");
	for (a = 0; a != t[242].length; ++a)
		if (t[242][a].charCodeAt(0) !== 65533) {
			r[t[242][a]] = 61952 + a;
			e[61952 + a] = t[242][a]
		}
	t[243] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋�"
		.split("");
	for (a = 0; a != t[243].length; ++a)
		if (t[243][a].charCodeAt(0) !== 65533) {
			r[t[243][a]] = 62208 + a;
			e[62208 + a] = t[243][a]
		}
	t[244] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤�"
		.split("");
	for (a = 0; a != t[244].length; ++a)
		if (t[244][a].charCodeAt(0) !== 65533) {
			r[t[244][a]] = 62464 + a;
			e[62464 + a] = t[244][a]
		}
	t[245] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜�"
		.split("");
	for (a = 0; a != t[245].length; ++a)
		if (t[245][a].charCodeAt(0) !== 65533) {
			r[t[245][a]] = 62720 + a;
			e[62720 + a] = t[245][a]
		}
	t[246] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅龆龇龈龉龊龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞鲟鲠鲡鲢鲣鲥鲦鲧鲨鲩鲫鲭鲮鲰鲱鲲鲳鲴鲵鲶鲷鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋�"
		.split("");
	for (a = 0; a != t[246].length; ++a)
		if (t[246][a].charCodeAt(0) !== 65533) {
			r[t[246][a]] = 62976 + a;
			e[62976 + a] = t[246][a]
		}
	t[247] =
		"�����������������������������������������������������������������������������������������������������������������������������������������������������������������鳌鳍鳎鳏鳐鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄�"
		.split("");
	for (a = 0; a != t[247].length; ++a)
		if (t[247][a].charCodeAt(0) !== 65533) {
			r[t[247][a]] = 63232 + a;
			e[63232 + a] = t[247][a]
		}
	return {
		enc: r,
		dec: e
	}
}();
cptable[10029] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[10079] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[10081] = function() {
	var e =
		"\0\b\t\n\x0B\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙ�ˆ˜¯˘˙˚¸˝˛ˇ",
		r = [],
		t = {};
	for (var a = 0; a != e.length; ++a) {
		if (e.charCodeAt(a) !== 65533) t[e.charAt(a)] = a;
		r[a] = e.charAt(a)
	}
	return {
		enc: t,
		dec: r
	}
}();
if (typeof module !== "undefined" && module.exports && typeof DO_NOT_EXPORT_CODEPAGE === "undefined") module.exports = cptable;
(function(e, r) {
	"use strict";
	if (typeof cptable === "undefined") {
		if (typeof require !== "undefined") {
			var t = cptable;
			if (typeof module !== "undefined" && module.exports && typeof DO_NOT_EXPORT_CODEPAGE === "undefined") module.exports = r(t);
			else e.cptable = r(t)
		} else throw new Error("cptable not found")
	} else cptable = r(cptable)
})(this, function(e) {
	"use strict";
	var r = {
		1200: "utf16le",
		1201: "utf16be",
		12000: "utf32le",
		12001: "utf32be",
		16969: "utf64le",
		20127: "ascii",
		65000: "utf7",
		65001: "utf8"
	};
	var t = [874, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1e4];
	var a = [932, 936, 949, 950];
	var n = [65001];
	var i = {};
	var s = {};
	var f = {};
	var o = {};
	var l = function R(e) {
		return String.fromCharCode(e)
	};
	var c = function O(e) {
		return e.charCodeAt(0)
	};
	var h = typeof Buffer !== "undefined";
	if (h) {
		var u = 1024,
			d = new Buffer(u);
		var p = function D(e) {
			var r = new Buffer(65536);
			for (var t = 0; t < 65536; ++t) r[t] = 0;
			var a = Object.keys(e),
				n = a.length;
			for (var i = 0, s = a[i]; i < n; ++i) {
				if (!(s = a[i])) continue;
				r[s.charCodeAt(0)] = e[s]
			}
			return r
		};
		var v = function F(r) {
			var t = p(e[r].enc);
			return function a(e, r) {
				var a = e.length;
				var n, i = 0,
					s = 0,
					f = 0,
					o = 0;
				if (typeof e === "string") {
					n = new Buffer(a);
					for (i = 0; i < a; ++i) n[i] = t[e.charCodeAt(i)]
				} else if (Buffer.isBuffer(e)) {
					n = new Buffer(2 * a);
					s = 0;
					for (i = 0; i < a; ++i) {
						f = e[i];
						if (f < 128) n[s++] = t[f];
						else if (f < 224) {
							n[s++] = t[((f & 31) << 6) + (e[i + 1] & 63)];
							++i
						} else if (f < 240) {
							n[s++] = t[((f & 15) << 12) + ((e[i + 1] & 63) << 6) + (e[i + 2] & 63)];
							i += 2
						} else {
							o = ((f & 7) << 18) + ((e[i + 1] & 63) << 12) + ((e[i + 2] & 63) << 6) + (e[i + 3] & 63);
							i += 3;
							if (o < 65536) n[s++] = t[o];
							else {
								o -= 65536;
								n[s++] = t[55296 + (o >> 10 & 1023)];
								n[s++] = t[56320 + (o & 1023)]
							}
						}
					}
					n = n.slice(0, s)
				} else {
					n = new Buffer(a);
					for (i = 0; i < a; ++i) n[i] = t[e[i].charCodeAt(0)]
				}
				if (!r || r === "buf") return n;
				if (r !== "arr") return n.toString("binary");
				return [].slice.call(n)
			}
		};
		var g = function P(r) {
			var t = e[r].dec;
			var a = new Buffer(131072),
				n = 0,
				i = "";
			for (n = 0; n < t.length; ++n) {
				if (!(i = t[n])) continue;
				var s = i.charCodeAt(0);
				a[2 * n] = s & 255;
				a[2 * n + 1] = s >> 8
			}
			return function f(e) {
				var r = e.length,
					t = 0,
					n = 0;
				if (2 * r > u) {
					u = 2 * r;
					d = new Buffer(u)
				}
				if (Buffer.isBuffer(e)) {
					for (t = 0; t < r; t++) {
						n = 2 * e[t];
						d[2 * t] = a[n];
						d[2 * t + 1] = a[n + 1]
					}
				} else if (typeof e === "string") {
					for (t = 0; t < r; t++) {
						n = 2 * e.charCodeAt(t);
						d[2 * t] = a[n];
						d[2 * t + 1] = a[n + 1]
					}
				} else {
					for (t = 0; t < r; t++) {
						n = 2 * e[t];
						d[2 * t] = a[n];
						d[2 * t + 1] = a[n + 1]
					}
				}
				return d.slice(0, 2 * r).toString("ucs2")
			}
		};
		var m = function N(r) {
			var t = e[r].enc;
			var a = new Buffer(131072);
			for (var n = 0; n < 131072; ++n) a[n] = 0;
			var i = Object.keys(t);
			for (var s = 0, f = i[s]; s < i.length; ++s) {
				if (!(f = i[s])) continue;
				var o = f.charCodeAt(0);
				a[2 * o] = t[f] & 255;
				a[2 * o + 1] = t[f] >> 8
			}
			return function l(e, r) {
				var t = e.length,
					n = new Buffer(2 * t),
					i = 0,
					s = 0,
					f = 0,
					o = 0,
					l = 0;
				if (typeof e === "string") {
					for (i = o = 0; i < t; ++i) {
						s = e.charCodeAt(i) * 2;
						n[o++] = a[s + 1] || a[s];
						if (a[s + 1] > 0) n[o++] = a[s]
					}
					n = n.slice(0, o)
				} else if (Buffer.isBuffer(e)) {
					for (i = o = 0; i < t; ++i) {
						l = e[i];
						if (l < 128) s = l;
						else if (l < 224) {
							s = ((l & 31) << 6) + (e[i + 1] & 63);
							++i
						} else if (l < 240) {
							s = ((l & 15) << 12) + ((e[i + 1] & 63) << 6) + (e[i + 2] & 63);
							i += 2
						} else {
							s = ((l & 7) << 18) + ((e[i + 1] & 63) << 12) + ((e[i + 2] & 63) << 6) + (e[i + 3] & 63);
							i += 3
						}
						if (s < 65536) {
							s *= 2;
							n[o++] = a[s + 1] || a[s];
							if (a[s + 1] > 0) n[o++] = a[s]
						} else {
							f = s - 65536;
							s = 2 * (55296 + (f >> 10 & 1023));
							n[o++] = a[s + 1] || a[s];
							if (a[s + 1] > 0) n[o++] = a[s];
							s = 2 * (56320 + (f & 1023));
							n[o++] = a[s + 1] || a[s];
							if (a[s + 1] > 0) n[o++] = a[s]
						}
					}
					n = n.slice(0, o)
				} else {
					for (i = o = 0; i < t; i++) {
						s = e[i].charCodeAt(0) * 2;
						n[o++] = a[s + 1] || a[s];
						if (a[s + 1] > 0) n[o++] = a[s]
					}
				}
				if (!r || r === "buf") return n;
				if (r !== "arr") return n.toString("binary");
				return [].slice.call(n)
			}
		};
		var b = function L(r) {
			var t = e[r].dec;
			var a = new Buffer(131072),
				n = 0,
				i, s = 0,
				f = 0,
				o = 0;
			for (o = 0; o < 65536; ++o) {
				a[2 * o] = 255;
				a[2 * o + 1] = 253
			}
			for (n = 0; n < t.length; ++n) {
				if (!(i = t[n])) continue;
				s = i.charCodeAt(0);
				f = 2 * n;
				a[f] = s & 255;
				a[f + 1] = s >> 8
			}
			return function l(e) {
				var r = e.length,
					t = new Buffer(2 * r),
					n = 0,
					i = 0,
					s = 0;
				if (Buffer.isBuffer(e)) {
					for (n = 0; n < r; n++) {
						i = 2 * e[n];
						if (a[i] === 255 && a[i + 1] === 253) {
							i = 2 * ((e[n] << 8) + e[n + 1]);
							++n
						}
						t[s++] = a[i];
						t[s++] = a[i + 1]
					}
				} else if (typeof e === "string") {
					for (n = 0; n < r; n++) {
						i = 2 * e.charCodeAt(n);
						if (a[i] === 255 && a[i + 1] === 253) {
							i = 2 * ((e.charCodeAt(n) << 8) + e.charCodeAt(n + 1));
							++n
						}
						t[s++] = a[i];
						t[s++] = a[i + 1]
					}
				} else {
					for (n = 0; n < r; n++) {
						i = 2 * e[n];
						if (a[i] === 255 && a[i + 1] === 253) {
							i = 2 * ((e[n] << 8) + e[n + 1]);
							++n
						}
						t[s++] = a[i];
						t[s++] = a[i + 1]
					}
				}
				return t.slice(0, s).toString("ucs2")
			}
		};
		i[65001] = function M(e) {
			if (typeof e === "string") return M(e.split("").map(c));
			var r = e.length,
				t = 0,
				a = 0;
			if (4 * r > u) {
				u = 4 * r;
				d = new Buffer(u)
			}
			var n = 0;
			if (r >= 3 && e[0] == 239)
				if (e[1] == 187 && e[2] == 191) n = 3;
			for (var i = 1, s = 0, f = 0; n < r; n += i) {
				i = 1;
				f = e[n];
				if (f < 128) t = f;
				else if (f < 224) {
					t = (f & 31) * 64 + (e[n + 1] & 63);
					i = 2
				} else if (f < 240) {
					t = ((f & 15) << 12) + (e[n + 1] & 63) * 64 + (e[n + 2] & 63);
					i = 3
				} else {
					t = (f & 7) * 262144 + ((e[n + 1] & 63) << 12) + (e[n + 2] & 63) * 64 + (e[n + 3] & 63);
					i = 4
				}
				if (t < 65536) {
					d[s++] = t & 255;
					d[s++] = t >> 8
				} else {
					t -= 65536;
					a = 55296 + (t >> 10 & 1023);
					t = 56320 + (t & 1023);
					d[s++] = a & 255;
					d[s++] = a >>> 8;
					d[s++] = t & 255;
					d[s++] = t >>> 8 & 255
				}
			}
			return d.slice(0, s).toString("ucs2")
		};
		s[65001] = function U(e, r) {
			if (h && Buffer.isBuffer(e)) {
				if (!r || r === "buf") return e;
				if (r !== "arr") return e.toString("binary");
				return [].slice.call(e)
			}
			var t = e.length,
				a = 0,
				n = 0,
				i = 0;
			var s = typeof e === "string";
			if (4 * t > u) {
				u = 4 * t;
				d = new Buffer(u)
			}
			for (var f = 0; f < t; ++f) {
				a = s ? e.charCodeAt(f) : e[f].charCodeAt(0);
				if (a <= 127) d[i++] = a;
				else if (a <= 2047) {
					d[i++] = 192 + (a >> 6);
					d[i++] = 128 + (a & 63)
				} else if (a >= 55296 && a <= 57343) {
					a -= 55296;
					++f;
					n = (s ? e.charCodeAt(f) : e[f].charCodeAt(0)) - 56320 + (a << 10);
					d[i++] = 240 + (n >>> 18 & 7);
					d[i++] = 144 + (n >>> 12 & 63);
					d[i++] = 128 + (n >>> 6 & 63);
					d[i++] = 128 + (n & 63)
				} else {
					d[i++] = 224 + (a >> 12);
					d[i++] = 128 + (a >> 6 & 63);
					d[i++] = 128 + (a & 63)
				}
			}
			if (!r || r === "buf") return d.slice(0, i);
			if (r !== "arr") return d.slice(0, i).toString("binary");
			return [].slice.call(d, 0, i)
		}
	}
	var C = function H() {
		if (h) {
			if (f[t[0]]) return;
			var r = 0,
				l = 0;
			for (r = 0; r < t.length; ++r) {
				l = t[r];
				if (e[l]) {
					f[l] = g(l);
					o[l] = v(l)
				}
			}
			for (r = 0; r < a.length; ++r) {
				l = a[r];
				if (e[l]) {
					f[l] = b(l);
					o[l] = m(l)
				}
			}
			for (r = 0; r < n.length; ++r) {
				l = n[r];
				if (i[l]) f[l] = i[l];
				if (s[l]) o[l] = s[l]
			}
		}
	};
	var E = function(e, r) {
		void r;
		return ""
	};
	var w = function W(e) {
		delete f[e];
		delete o[e]
	};
	var k = function V() {
		if (h) {
			if (!f[t[0]]) return;
			t.forEach(w);
			a.forEach(w);
			n.forEach(w)
		}
		B = E;
		T = 0
	};
	var S = {
		encache: C,
		decache: k,
		sbcs: t,
		dbcs: a
	};
	C();
	var A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var _ = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'(),-./:?";
	var B = E,
		T = 0;
	var x = function z(t, a, n) {
		if (t === T && B) {
			return B(a, n)
		}
		if (o[t]) {
			B = o[T = t];
			return B(a, n)
		}
		if (h && Buffer.isBuffer(a)) a = a.toString("utf8");
		var i = a.length;
		var s = h ? new Buffer(4 * i) : [],
			f = 0,
			c = 0,
			u = 0,
			d = 0;
		var p = e[t],
			v, g = "";
		var m = typeof a === "string";
		if (p && (v = p.enc))
			for (c = 0; c < i; ++c, ++u) {
				f = v[m ? a.charAt(c) : a[c]];
				if (f > 255) {
					s[u] = f >> 8;
					s[++u] = f & 255
				} else s[u] = f & 255
			} else if (g = r[t]) switch (g) {
				case "utf8":
					if (h && m) {
						s = new Buffer(a, g);
						u = s.length;
						break
					}
					for (c = 0; c < i; ++c, ++u) {
						f = m ? a.charCodeAt(c) : a[c].charCodeAt(0);
						if (f <= 127) s[u] = f;
						else if (f <= 2047) {
							s[u] = 192 + (f >> 6);
							s[++u] = 128 + (f & 63)
						} else if (f >= 55296 && f <= 57343) {
							f -= 55296;
							d = (m ? a.charCodeAt(++c) : a[++c].charCodeAt(0)) - 56320 + (f << 10);
							s[u] = 240 + (d >>> 18 & 7);
							s[++u] = 144 + (d >>> 12 & 63);
							s[++u] = 128 + (d >>> 6 & 63);
							s[++u] = 128 + (d & 63)
						} else {
							s[u] = 224 + (f >> 12);
							s[++u] = 128 + (f >> 6 & 63);
							s[++u] = 128 + (f & 63)
						}
					}
					break;
				case "ascii":
					if (h && typeof a === "string") {
						s = new Buffer(a, g);
						u = s.length;
						break
					}
					for (c = 0; c < i; ++c, ++u) {
						f = m ? a.charCodeAt(c) : a[c].charCodeAt(0);
						if (f <= 127) s[u] = f;
						else throw new Error("bad ascii " + f)
					}
					break;
				case "utf16le":
					if (h && typeof a === "string") {
						s = new Buffer(a, g);
						u = s.length;
						break
					}
					for (c = 0; c < i; ++c) {
						f = m ? a.charCodeAt(c) : a[c].charCodeAt(0);
						s[u++] = f & 255;
						s[u++] = f >> 8
					}
					break;
				case "utf16be":
					for (c = 0; c < i; ++c) {
						f = m ? a.charCodeAt(c) : a[c].charCodeAt(0);
						s[u++] = f >> 8;
						s[u++] = f & 255
					}
					break;
				case "utf32le":
					for (c = 0; c < i; ++c) {
						f = m ? a.charCodeAt(c) : a[c].charCodeAt(0);
						if (f >= 55296 && f <= 57343) f = 65536 + (f - 55296 << 10) + (a[++c].charCodeAt(0) - 56320);
						s[u++] = f & 255;
						f >>= 8;
						s[u++] = f & 255;
						f >>= 8;
						s[u++] = f & 255;
						f >>= 8;
						s[u++] = f & 255
					}
					break;
				case "utf32be":
					for (c = 0; c < i; ++c) {
						f = m ? a.charCodeAt(c) : a[c].charCodeAt(0);
						if (f >= 55296 && f <= 57343) f = 65536 + (f - 55296 << 10) + (a[++c].charCodeAt(0) - 56320);
						s[u + 3] = f & 255;
						f >>= 8;
						s[u + 2] = f & 255;
						f >>= 8;
						s[u + 1] = f & 255;
						f >>= 8;
						s[u] = f & 255;
						u += 4
					}
					break;
				case "utf7":
					for (c = 0; c < i; c++) {
						var b = m ? a.charAt(c) : a[c].charAt(0);
						if (b === "+") {
							s[u++] = 43;
							s[u++] = 45;
							continue
						}
						if (_.indexOf(b) > -1) {
							s[u++] = b.charCodeAt(0);
							continue
						}
						var C = z(1201, b);
						s[u++] = 43;
						s[u++] = A.charCodeAt(C[0] >> 2);
						s[u++] = A.charCodeAt(((C[0] & 3) << 4) + ((C[1] || 0) >> 4));
						s[u++] = A.charCodeAt(((C[1] & 15) << 2) + ((C[2] || 0) >> 6));
						s[u++] = 45
					}
					break;
				default:
					throw new Error("Unsupported magic: " + t + " " + r[t]);
			} else throw new Error("Unrecognized CP: " + t);
		s = s.slice(0, u);
		if (!h) return n == "str" ? s.map(l).join("") : s;
		if (!n || n === "buf") return s;
		if (n !== "arr") return s.toString("binary");
		return [].slice.call(s)
	};
	var y = function X(t, a) {
		var n;
		if (n = f[t]) return n(a);
		if (typeof a === "string") return X(t, a.split("").map(c));
		var i = a.length,
			s = new Array(i),
			o = "",
			l = 0,
			u = 0,
			d = 1,
			p = 0,
			v = 0;
		var g = e[t],
			m, b = "";
		if (g && (m = g.dec)) {
			for (u = 0; u < i; u += d) {
				d = 2;
				o = m[(a[u] << 8) + a[u + 1]];
				if (!o) {
					d = 1;
					o = m[a[u]]
				}
				if (!o) throw new Error("Unrecognized code: " + a[u] + " " + a[u + d - 1] + " " + u + " " + d + " " + m[a[u]]);
				s[p++] = o
			}
		} else if (b = r[t]) switch (b) {
			case "utf8":
				if (i >= 3 && a[0] == 239)
					if (a[1] == 187 && a[2] == 191) u = 3;
				for (; u < i; u += d) {
					d = 1;
					if (a[u] < 128) l = a[u];
					else if (a[u] < 224) {
						l = (a[u] & 31) * 64 + (a[u + 1] & 63);
						d = 2
					} else if (a[u] < 240) {
						l = ((a[u] & 15) << 12) + (a[u + 1] & 63) * 64 + (a[u + 2] & 63);
						d = 3
					} else {
						l = (a[u] & 7) * 262144 + ((a[u + 1] & 63) << 12) + (a[u + 2] & 63) * 64 + (a[u + 3] & 63);
						d = 4
					}
					if (l < 65536) {
						s[p++] = String.fromCharCode(l)
					} else {
						l -= 65536;
						v = 55296 + (l >> 10 & 1023);
						l = 56320 + (l & 1023);
						s[p++] = String.fromCharCode(v);
						s[p++] = String.fromCharCode(l)
					}
				}
				break;
			case "ascii":
				if (h && Buffer.isBuffer(a)) return a.toString(b);
				for (u = 0; u < i; u++) s[u] = String.fromCharCode(a[u]);
				p = i;
				break;
			case "utf16le":
				if (i >= 2 && a[0] == 255)
					if (a[1] == 254) u = 2;
				if (h && Buffer.isBuffer(a)) return a.toString(b);
				d = 2;
				for (; u + 1 < i; u += d) {
					s[p++] = String.fromCharCode((a[u + 1] << 8) + a[u])
				}
				break;
			case "utf16be":
				if (i >= 2 && a[0] == 254)
					if (a[1] == 255) u = 2;
				d = 2;
				for (; u + 1 < i; u += d) {
					s[p++] = String.fromCharCode((a[u] << 8) + a[u + 1])
				}
				break;
			case "utf32le":
				if (i >= 4 && a[0] == 255)
					if (a[1] == 254 && a[2] === 0 && a[3] === 0) u = 4;
				d = 4;
				for (; u < i; u += d) {
					l = (a[u + 3] << 24) + (a[u + 2] << 16) + (a[u + 1] << 8) + a[u];
					if (l > 65535) {
						l -= 65536;
						s[p++] = String.fromCharCode(55296 + (l >> 10 & 1023));
						s[p++] = String.fromCharCode(56320 + (l & 1023))
					} else s[p++] = String.fromCharCode(l)
				}
				break;
			case "utf32be":
				if (i >= 4 && a[3] == 255)
					if (a[2] == 254 && a[1] === 0 && a[0] === 0) u = 4;
				d = 4;
				for (; u < i; u += d) {
					l = (a[u] << 24) + (a[u + 1] << 16) + (a[u + 2] << 8) + a[u + 3];
					if (l > 65535) {
						l -= 65536;
						s[p++] = String.fromCharCode(55296 + (l >> 10 & 1023));
						s[p++] = String.fromCharCode(56320 + (l & 1023))
					} else s[p++] = String.fromCharCode(l)
				}
				break;
			case "utf7":
				if (i >= 4 && a[0] == 43 && a[1] == 47 && a[2] == 118) {
					if (i >= 5 && a[3] == 56 && a[4] == 45) u = 5;
					else if (a[3] == 56 || a[3] == 57 || a[3] == 43 || a[3] == 47) u = 4
				}
				for (; u < i; u += d) {
					if (a[u] !== 43) {
						d = 1;
						s[p++] = String.fromCharCode(a[u]);
						continue
					}
					d = 1;
					if (a[u + 1] === 45) {
						d = 2;
						s[p++] = "+";
						continue
					}
					while (String.fromCharCode(a[u + d]).match(/[A-Za-z0-9+\/]/)) d++;
					var C = 0;
					if (a[u + d] === 45) {
						++d;
						C = 1
					}
					var E = [];
					var w = "";
					var k = 0,
						S = 0,
						_ = 0;
					var B = 0,
						T = 0,
						x = 0,
						y = 0;
					for (var I = 1; I < d - C;) {
						B = A.indexOf(String.fromCharCode(a[u + I++]));
						T = A.indexOf(String.fromCharCode(a[u + I++]));
						k = B << 2 | T >> 4;
						E.push(k);
						x = A.indexOf(String.fromCharCode(a[u + I++]));
						if (x === -1) break;
						S = (T & 15) << 4 | x >> 2;
						E.push(S);
						y = A.indexOf(String.fromCharCode(a[u + I++]));
						if (y === -1) break;
						_ = (x & 3) << 6 | y;
						if (y < 64) E.push(_)
					}
					w = X(1201, E);
					for (I = 0; I < w.length; ++I) s[p++] = w.charAt(I)
				}
				break;
			default:
				throw new Error("Unsupported magic: " + t + " " + r[t]);
		} else throw new Error("Unrecognized CP: " + t);
		return s.slice(0, p).join("")
	};
	var I = function G(t) {
		return !!(e[t] || r[t])
	};
	e.utils = {
		decode: y,
		encode: x,
		hascp: I,
		magic: r,
		cache: S
	};
	return e
});
var XLSX = {};
(function e(r) {
	r.version = "0.12.2";
	var t = 1200,
		a = 1252;
	if (typeof module !== "undefined" && typeof require !== "undefined") {
		if (typeof cptable === "undefined") global.cptable = undefined
	}
	var n = [874, 932, 936, 949, 950];
	for (var i = 0; i <= 8; ++i) n.push(1250 + i);
	var s = {
		0: 1252,
		1: 65001,
		2: 65001,
		77: 1e4,
		128: 932,
		129: 949,
		130: 1361,
		134: 936,
		136: 950,
		161: 1253,
		162: 1254,
		163: 1258,
		177: 1255,
		178: 1256,
		186: 1257,
		204: 1251,
		222: 874,
		238: 1250,
		255: 1252,
		69: 6969
	};
	var f = function(e) {
		if (n.indexOf(e) == -1) return;
		a = s[0] = e
	};

	function o() {
		f(1252)
	}
	var l = function(e) {
		t = e;
		f(e)
	};

	function c() {
		l(1200);
		o()
	}

	function h(e) {
		var r = [];
		for (var t = 0, a = e.length; t < a; ++t) r[t] = e.charCodeAt(t);
		return r
	}

	function u(e) {
		var r = [];
		for (var t = 0; t < e.length >> 1; ++t) r[t] = String.fromCharCode(e.charCodeAt(2 * t) + (e.charCodeAt(2 * t + 1) << 8));
		return r.join("")
	}

	function d(e) {
		var r = [];
		for (var t = 0; t < e.length >> 1; ++t) r[t] = String.fromCharCode(e.charCodeAt(2 * t + 1) + (e.charCodeAt(2 * t) << 8));
		return r.join("")
	}
	var p = function(e) {
		var r = e.charCodeAt(0),
			t = e.charCodeAt(1);
		if (r == 255 && t == 254) return u(e.slice(2));
		if (r == 254 && t == 255) return d(e.slice(2));
		if (r == 65279) return e.slice(1);
		return e
	};
	var v = function dg(e) {
		return String.fromCharCode(e)
	};
	if (typeof cptable !== "undefined") {
		l = function(e) {
			t = e
		};
		p = function(e) {
			if (e.charCodeAt(0) === 255 && e.charCodeAt(1) === 254) {
				return cptable.utils.decode(1200, h(e.slice(2)))
			}
			return e
		};
		v = function pg(e) {
			if (t === 1200) return String.fromCharCode(e);
			return cptable.utils.decode(t, [e & 255, e >> 8])[0]
		}
	}
	var g = null;
	var m = true;
	var b = function vg() {
		var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		return {
			encode: function(r) {
				var t = "";
				var a = 0,
					n = 0,
					i = 0,
					s = 0,
					f = 0,
					o = 0,
					l = 0;
				for (var c = 0; c < r.length;) {
					a = r.charCodeAt(c++);
					n = r.charCodeAt(c++);
					i = r.charCodeAt(c++);
					s = a >> 2;
					f = (a & 3) << 4 | n >> 4;
					o = (n & 15) << 2 | i >> 6;
					l = i & 63;
					if (isNaN(n)) {
						o = l = 64
					} else if (isNaN(i)) {
						l = 64
					}
					t += e.charAt(s) + e.charAt(f) + e.charAt(o) + e.charAt(l)
				}
				return t
			},
			decode: function r(t) {
				var a = "";
				var n = 0,
					i = 0,
					s = 0;
				var f = 0,
					o = 0,
					l = 0,
					c = 0;
				t = t.replace(/[^A-Za-z0-9\+\/\=]/g, "");
				for (var h = 0; h < t.length;) {
					f = e.indexOf(t.charAt(h++));
					o = e.indexOf(t.charAt(h++));
					l = e.indexOf(t.charAt(h++));
					c = e.indexOf(t.charAt(h++));
					n = f << 2 | o >> 4;
					i = (o & 15) << 4 | l >> 2;
					s = (l & 3) << 6 | c;
					a += String.fromCharCode(n);
					if (l !== 64) {
						a += String.fromCharCode(i)
					}
					if (c !== 64) {
						a += String.fromCharCode(s)
					}
				}
				return a
			}
		}
	}();
	var C = typeof Buffer !== "undefined" && typeof process !== "undefined" && typeof process.versions !== "undefined" && process.versions.node;

	function E(e) {
		return new(C ? Buffer : Array)(e)
	}

	function w(e) {
		if (C) return new Buffer(e, "binary");
		return e.split("").map(function(e) {
			return e.charCodeAt(0) & 255
		})
	}

	function k(e) {
		if (typeof ArrayBuffer === "undefined") return w(e);
		var r = new ArrayBuffer(e.length),
			t = new Uint8Array(r);
		for (var a = 0; a != e.length; ++a) t[a] = e.charCodeAt(a) & 255;
		return r
	}

	function S(e) {
		if (Array.isArray(e)) return e.map(fp).join("");
		var r = [];
		for (var t = 0; t < e.length; ++t) r[t] = fp(e[t]);
		return r.join("")
	}

	function A(e) {
		if (typeof Uint8Array === "undefined") throw new Error("Unsupported");
		return new Uint8Array(e)
	}

	function _(e) {
		if (typeof ArrayBuffer == "undefined") throw new Error("Unsupported");
		if (e instanceof ArrayBuffer) return _(new Uint8Array(e));
		var r = new Array(e.length);
		for (var t = 0; t < e.length; ++t) r[t] = e[t];
		return r
	}
	var B = function(e) {
		return [].concat.apply([], e)
	};
	var T = /\u0000/g,
		x = /[\u0001-\u0006]/g;
	var y = {};
	var I = function gg(e) {
		e.version = "0.10.2";

		function r(e) {
			var r = "",
				t = e.length - 1;
			while (t >= 0) r += e.charAt(t--);
			return r
		}

		function t(e, r) {
			var t = "";
			while (t.length < r) t += e;
			return t
		}

		function a(e, r) {
			var a = "" + e;
			return a.length >= r ? a : t("0", r - a.length) + a
		}

		function n(e, r) {
			var a = "" + e;
			return a.length >= r ? a : t(" ", r - a.length) + a
		}

		function i(e, r) {
			var a = "" + e;
			return a.length >= r ? a : a + t(" ", r - a.length)
		}

		function s(e, r) {
			var a = "" + Math.round(e);
			return a.length >= r ? a : t("0", r - a.length) + a
		}

		function f(e, r) {
			var a = "" + e;
			return a.length >= r ? a : t("0", r - a.length) + a
		}
		var o = Math.pow(2, 32);

		function l(e, r) {
			if (e > o || e < -o) return s(e, r);
			var t = Math.round(e);
			return f(t, r)
		}

		function c(e, r) {
			r = r || 0;
			return e.length >= 7 + r && (e.charCodeAt(r) | 32) === 103 && (e.charCodeAt(r + 1) | 32) === 101 && (e.charCodeAt(r + 2) | 32) === 110 &&
				(e.charCodeAt(r + 3) | 32) === 101 && (e.charCodeAt(r + 4) | 32) === 114 && (e.charCodeAt(r + 5) | 32) === 97 && (e.charCodeAt(r + 6) |
					32) === 108
		}
		var h = [
			["Sun", "Sunday"],
			["Mon", "Monday"],
			["Tue", "Tuesday"],
			["Wed", "Wednesday"],
			["Thu", "Thursday"],
			["Fri", "Friday"],
			["Sat", "Saturday"]
		];
		var u = [
			["J", "Jan", "January"],
			["F", "Feb", "February"],
			["M", "Mar", "March"],
			["A", "Apr", "April"],
			["M", "May", "May"],
			["J", "Jun", "June"],
			["J", "Jul", "July"],
			["A", "Aug", "August"],
			["S", "Sep", "September"],
			["O", "Oct", "October"],
			["N", "Nov", "November"],
			["D", "Dec", "December"]
		];

		function d(e) {
			e[0] = "General";
			e[1] = "0";
			e[2] = "0.00";
			e[3] = "#,##0";
			e[4] = "#,##0.00";
			e[9] = "0%";
			e[10] = "0.00%";
			e[11] = "0.00E+00";
			e[12] = "# ?/?";
			e[13] = "# ??/??";
			e[14] = "m/d/yy";
			e[15] = "d-mmm-yy";
			e[16] = "d-mmm";
			e[17] = "mmm-yy";
			e[18] = "h:mm AM/PM";
			e[19] = "h:mm:ss AM/PM";
			e[20] = "h:mm";
			e[21] = "h:mm:ss";
			e[22] = "m/d/yy h:mm";
			e[37] = "#,##0 ;(#,##0)";
			e[38] = "#,##0 ;[Red](#,##0)";
			e[39] = "#,##0.00;(#,##0.00)";
			e[40] = "#,##0.00;[Red](#,##0.00)";
			e[45] = "mm:ss";
			e[46] = "[h]:mm:ss";
			e[47] = "mmss.0";
			e[48] = "##0.0E+0";
			e[49] = "@";
			e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "';
			e[65535] = "General"
		}
		var p = {};
		d(p);

		function v(e, r, t) {
			var a = e < 0 ? -1 : 1;
			var n = e * a;
			var i = 0,
				s = 1,
				f = 0;
			var o = 1,
				l = 0,
				c = 0;
			var h = Math.floor(n);
			while (l < r) {
				h = Math.floor(n);
				f = h * s + i;
				c = h * l + o;
				if (n - h < 5e-8) break;
				n = 1 / (n - h);
				i = s;
				s = f;
				o = l;
				l = c
			}
			if (c > r) {
				if (l > r) {
					c = o;
					f = i
				} else {
					c = l;
					f = s
				}
			}
			if (!t) return [0, a * f, c];
			var u = Math.floor(a * f / c);
			return [u, a * f - u * c, c]
		}

		function g(e, r, t) {
			if (e > 2958465 || e < 0) return null;
			var a = e | 0,
				n = Math.floor(86400 * (e - a)),
				i = 0;
			var s = [];
			var f = {
				D: a,
				T: n,
				u: 86400 * (e - a) - n,
				y: 0,
				m: 0,
				d: 0,
				H: 0,
				M: 0,
				S: 0,
				q: 0
			};
			if (Math.abs(f.u) < 1e-6) f.u = 0;
			if (r && r.date1904) a += 1462;
			if (f.u > .9999) {
				f.u = 0;
				if (++n == 86400) {
					f.T = n = 0;
					++a;
					++f.D
				}
			}
			if (a === 60) {
				s = t ? [1317, 10, 29] : [1900, 2, 29];
				i = 3
			} else if (a === 0) {
				s = t ? [1317, 8, 29] : [1900, 1, 0];
				i = 6
			} else {
				if (a > 60) --a;
				var o = new Date(1900, 0, 1);
				o.setDate(o.getDate() + a - 1);
				s = [o.getFullYear(), o.getMonth() + 1, o.getDate()];
				i = o.getDay();
				if (a < 60) i = (i + 6) % 7;
				if (t) i = A(o, s)
			}
			f.y = s[0];
			f.m = s[1];
			f.d = s[2];
			f.S = n % 60;
			n = Math.floor(n / 60);
			f.M = n % 60;
			n = Math.floor(n / 60);
			f.H = n;
			f.q = i;
			return f
		}
		e.parse_date_code = g;
		var m = new Date(1899, 11, 31, 0, 0, 0);
		var b = m.getTime();
		var C = new Date(1900, 2, 1, 0, 0, 0);

		function E(e, r) {
			var t = e.getTime();
			if (r) t -= 1461 * 24 * 60 * 60 * 1e3;
			else if (e >= C) t += 24 * 60 * 60 * 1e3;
			return (t - (b + (e.getTimezoneOffset() - m.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3)
		}

		function w(e) {
			return e.toString(10)
		}
		e._general_int = w;
		var k = function M() {
			var e = /\.(\d*[1-9])0+$/,
				r = /\.0*$/,
				t = /\.(\d*[1-9])0+/,
				a = /\.0*[Ee]/,
				n = /(E[+-])(\d)$/;

			function i(e) {
				var r = e < 0 ? 12 : 11;
				var t = o(e.toFixed(12));
				if (t.length <= r) return t;
				t = e.toPrecision(10);
				if (t.length <= r) return t;
				return e.toExponential(5)
			}

			function s(r) {
				var t = r.toFixed(11).replace(e, ".$1");
				if (t.length > (r < 0 ? 12 : 11)) t = r.toPrecision(6);
				return t
			}

			function f(e) {
				for (var r = 0; r != e.length; ++r)
					if ((e.charCodeAt(r) | 32) === 101) return e.replace(t, ".$1").replace(a, "E").replace("e", "E").replace(n, "$10$2");
				return e
			}

			function o(t) {
				return t.indexOf(".") > -1 ? t.replace(r, "").replace(e, ".$1") : t
			}
			return function l(e) {
				var r = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E),
					t;
				if (r >= -4 && r <= -1) t = e.toPrecision(10 + r);
				else if (Math.abs(r) <= 9) t = i(e);
				else if (r === 10) t = e.toFixed(10).substr(0, 12);
				else t = s(e);
				return o(f(t))
			}
		}();
		e._general_num = k;

		function S(e, r) {
			switch (typeof e) {
				case "string":
					return e;
				case "boolean":
					return e ? "TRUE" : "FALSE";
				case "number":
					return (e | 0) === e ? w(e) : k(e);
				case "undefined":
					return "";
				case "object":
					if (e == null) return "";
					if (e instanceof Date) return N(14, E(e, r && r.date1904), r);
			}
			throw new Error("unsupported value in General format: " + e)
		}
		e._general = S;

		function A() {
			return 0
		}

		function _(e, r, t, n) {
			var i = "",
				s = 0,
				f = 0,
				o = t.y,
				l, c = 0;
			switch (e) {
				case 98:
					o = t.y + 543;
				case 121:
					switch (r.length) {
						case 1:
							;
						case 2:
							l = o % 100;
							c = 2;
							break;
						default:
							l = o % 1e4;
							c = 4;
							break;
					}
					break;
				case 109:
					switch (r.length) {
						case 1:
							;
						case 2:
							l = t.m;
							c = r.length;
							break;
						case 3:
							return u[t.m - 1][1];
						case 5:
							return u[t.m - 1][0];
						default:
							return u[t.m - 1][2];
					}
					break;
				case 100:
					switch (r.length) {
						case 1:
							;
						case 2:
							l = t.d;
							c = r.length;
							break;
						case 3:
							return h[t.q][0];
						default:
							return h[t.q][1];
					}
					break;
				case 104:
					switch (r.length) {
						case 1:
							;
						case 2:
							l = 1 + (t.H + 11) % 12;
							c = r.length;
							break;
						default:
							throw "bad hour format: " + r;
					}
					break;
				case 72:
					switch (r.length) {
						case 1:
							;
						case 2:
							l = t.H;
							c = r.length;
							break;
						default:
							throw "bad hour format: " + r;
					}
					break;
				case 77:
					switch (r.length) {
						case 1:
							;
						case 2:
							l = t.M;
							c = r.length;
							break;
						default:
							throw "bad minute format: " + r;
					}
					break;
				case 115:
					if (r != "s" && r != "ss" && r != ".0" && r != ".00" && r != ".000") throw "bad second format: " + r;
					if (t.u === 0 && (r == "s" || r == "ss")) return a(t.S, r.length);
					if (n >= 2) f = n === 3 ? 1e3 : 100;
					else f = n === 1 ? 10 : 1;
					s = Math.round(f * (t.S + t.u));
					if (s >= 60 * f) s = 0;
					if (r === "s") return s === 0 ? "0" : "" + s / f;
					i = a(s, 2 + n);
					if (r === "ss") return i.substr(0, 2);
					return "." + i.substr(2, r.length - 1);
				case 90:
					switch (r) {
						case "[h]":
							;
						case "[hh]":
							l = t.D * 24 + t.H;
							break;
						case "[m]":
							;
						case "[mm]":
							l = (t.D * 24 + t.H) * 60 + t.M;
							break;
						case "[s]":
							;
						case "[ss]":
							l = ((t.D * 24 + t.H) * 60 + t.M) * 60 + Math.round(t.S + t.u);
							break;
						default:
							throw "bad abstime format: " + r;
					}
					c = r.length === 3 ? 1 : 2;
					break;
				case 101:
					l = o;
					c = 1;
			}
			if (c > 0) return a(l, c);
			else return ""
		}

		function B(e) {
			var r = 3;
			if (e.length <= r) return e;
			var t = e.length % r,
				a = e.substr(0, t);
			for (; t != e.length; t += r) a += (a.length > 0 ? "," : "") + e.substr(t, r);
			return a
		}
		var T = function U() {
			var e = /%/g;

			function s(r, a, n) {
				var i = a.replace(e, ""),
					s = a.length - i.length;
				return T(r, i, n * Math.pow(10, 2 * s)) + t("%", s)
			}

			function f(e, r, t) {
				var a = r.length - 1;
				while (r.charCodeAt(a - 1) === 44) --a;
				return T(e, r.substr(0, a), t / Math.pow(10, 3 * (r.length - a)))
			}

			function o(e, r) {
				var t;
				var a = e.indexOf("E") - e.indexOf(".") - 1;
				if (e.match(/^#+0.0E\+0$/)) {
					if (r == 0) return "0.0E+0";
					else if (r < 0) return "-" + o(e, -r);
					var n = e.indexOf(".");
					if (n === -1) n = e.indexOf("E");
					var i = Math.floor(Math.log(r) * Math.LOG10E) % n;
					if (i < 0) i += n;
					t = (r / Math.pow(10, i)).toPrecision(a + 1 + (n + i) % n);
					if (t.indexOf("e") === -1) {
						var s = Math.floor(Math.log(r) * Math.LOG10E);
						if (t.indexOf(".") === -1) t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i);
						else t += "E+" + (s - i);
						while (t.substr(0, 2) === "0.") {
							t = t.charAt(0) + t.substr(2, n) + "." + t.substr(2 + n);
							t = t.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.")
						}
						t = t.replace(/\+-/, "-")
					}
					t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(e, r, t, a) {
						return r + t + a.substr(0, (n + i) % n) + "." + a.substr(i) + "E"
					})
				} else t = r.toExponential(a);
				if (e.match(/E\+00$/) && t.match(/e[+-]\d$/)) t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1);
				if (e.match(/E\-/) && t.match(/e\+/)) t = t.replace(/e\+/, "e");
				return t.replace("e", "E")
			}
			var c = /# (\?+)( ?)\/( ?)(\d+)/;

			function h(e, r, i) {
				var s = parseInt(e[4], 10),
					f = Math.round(r * s),
					o = Math.floor(f / s);
				var l = f - o * s,
					c = s;
				return i + (o === 0 ? "" : "" + o) + " " + (l === 0 ? t(" ", e[1].length + 1 + e[4].length) : n(l, e[1].length) + e[2] + "/" + e[3] +
					a(c, e[4].length))
			}

			function u(e, r, a) {
				return a + (r === 0 ? "" : "" + r) + t(" ", e[1].length + 2 + e[4].length)
			}
			var d = /^#*0*\.([0#]+)/;
			var p = /\).*[0#]/;
			var g = /\(###\) ###\\?-####/;

			function m(e) {
				var r = "",
					t;
				for (var a = 0; a != e.length; ++a) switch (t = e.charCodeAt(a)) {
					case 35:
						break;
					case 63:
						r += " ";
						break;
					case 48:
						r += "0";
						break;
					default:
						r += String.fromCharCode(t);
				}
				return r
			}

			function b(e, r) {
				var t = Math.pow(10, r);
				return "" + Math.round(e * t) / t
			}

			function C(e, r) {
				if (r < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, r))).length) {
					return 0
				}
				return Math.round((e - Math.floor(e)) * Math.pow(10, r))
			}

			function E(e, r) {
				if (r < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, r))).length) {
					return 1
				}
				return 0
			}

			function w(e) {
				if (e < 2147483647 && e > -2147483648) return "" + (e >= 0 ? e | 0 : e - 1 | 0);
				return "" + Math.floor(e)
			}

			function k(e, u, S) {
				if (e.charCodeAt(0) === 40 && !u.match(p)) {
					var A = u.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
					if (S >= 0) return k("n", A, S);
					return "(" + k("n", A, -S) + ")"
				}
				if (u.charCodeAt(u.length - 1) === 44) return f(e, u, S);
				if (u.indexOf("%") !== -1) return s(e, u, S);
				if (u.indexOf("E") !== -1) return o(u, S);
				if (u.charCodeAt(0) === 36) return "$" + k(e, u.substr(u.charAt(1) == " " ? 2 : 1), S);
				var _;
				var x, y, I, R = Math.abs(S),
					O = S < 0 ? "-" : "";
				if (u.match(/^00+$/)) return O + l(R, u.length);
				if (u.match(/^[#?]+$/)) {
					_ = l(S, 0);
					if (_ === "0") _ = "";
					return _.length > u.length ? _ : m(u.substr(0, u.length - _.length)) + _
				}
				if (x = u.match(c)) return h(x, R, O);
				if (u.match(/^#+0+$/)) return O + l(R, u.length - u.indexOf("0"));
				if (x = u.match(d)) {
					_ = b(S, x[1].length).replace(/^([^\.]+)$/, "$1." + m(x[1])).replace(/\.$/, "." + m(x[1])).replace(/\.(\d*)$/, function(e, r) {
						return "." + r + t("0", m(x[1]).length - r.length)
					});
					return u.indexOf("0.") !== -1 ? _ : _.replace(/^0\./, ".")
				}
				u = u.replace(/^#+([0.])/, "$1");
				if (x = u.match(/^(0*)\.(#*)$/)) {
					return O + b(R, x[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, x[1].length ? "0." : ".")
				}
				if (x = u.match(/^#{1,3},##0(\.?)$/)) return O + B(l(R, 0));
				if (x = u.match(/^#,##0\.([#0]*0)$/)) {
					return S < 0 ? "-" + k(e, u, -S) : B("" + (Math.floor(S) + E(S, x[1].length))) + "." + a(C(S, x[1].length), x[1].length)
				}
				if (x = u.match(/^#,#*,#0/)) return k(e, u.replace(/^#,#*,/, ""), S);
				if (x = u.match(/^([0#]+)(\\?-([0#]+))+$/)) {
					_ = r(k(e, u.replace(/[\\-]/g, ""), S));
					y = 0;
					return r(r(u.replace(/\\/g, "")).replace(/[0#]/g, function(e) {
						return y < _.length ? _.charAt(y++) : e === "0" ? "0" : ""
					}))
				}
				if (u.match(g)) {
					_ = k(e, "##########", S);
					return "(" + _.substr(0, 3) + ") " + _.substr(3, 3) + "-" + _.substr(6)
				}
				var D = "";
				if (x = u.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) {
					y = Math.min(x[4].length, 7);
					I = v(R, Math.pow(10, y) - 1, false);
					_ = "" + O;
					D = T("n", x[1], I[1]);
					if (D.charAt(D.length - 1) == " ") D = D.substr(0, D.length - 1) + "0";
					_ += D + x[2] + "/" + x[3];
					D = i(I[2], y);
					if (D.length < x[4].length) D = m(x[4].substr(x[4].length - D.length)) + D;
					_ += D;
					return _
				}
				if (x = u.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) {
					y = Math.min(Math.max(x[1].length, x[4].length), 7);
					I = v(R, Math.pow(10, y) - 1, true);
					return O + (I[0] || (I[1] ? "" : "0")) + " " + (I[1] ? n(I[1], y) + x[2] + "/" + x[3] + i(I[2], y) : t(" ", 2 * y + 1 + x[2].length +
						x[3].length))
				}
				if (x = u.match(/^[#0?]+$/)) {
					_ = l(S, 0);
					if (u.length <= _.length) return _;
					return m(u.substr(0, u.length - _.length)) + _
				}
				if (x = u.match(/^([#0?]+)\.([#0]+)$/)) {
					_ = "" + S.toFixed(Math.min(x[2].length, 10)).replace(/([^0])0+$/, "$1");
					y = _.indexOf(".");
					var F = u.indexOf(".") - y,
						P = u.length - _.length - F;
					return m(u.substr(0, F) + _ + u.substr(u.length - P))
				}
				if (x = u.match(/^00,000\.([#0]*0)$/)) {
					y = C(S, x[1].length);
					return S < 0 ? "-" + k(e, u, -S) : B(w(S)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(e) {
						return "00," + (e.length < 3 ? a(0, 3 - e.length) : "") + e
					}) + "." + a(y, x[1].length)
				}
				switch (u) {
					case "###,##0.00":
						return k(e, "#,##0.00", S);
					case "###,###":
						;
					case "##,###":
						;
					case "#,###":
						var N = B(l(R, 0));
						return N !== "0" ? O + N : "";
					case "###,###.00":
						return k(e, "###,##0.00", S).replace(/^0\./, ".");
					case "#,###.00":
						return k(e, "#,##0.00", S).replace(/^0\./, ".");
					default:
						;
				}
				throw new Error("unsupported format |" + u + "|")
			}

			function S(e, r, t) {
				var a = r.length - 1;
				while (r.charCodeAt(a - 1) === 44) --a;
				return T(e, r.substr(0, a), t / Math.pow(10, 3 * (r.length - a)))
			}

			function A(r, a, n) {
				var i = a.replace(e, ""),
					s = a.length - i.length;
				return T(r, i, n * Math.pow(10, 2 * s)) + t("%", s)
			}

			function _(e, r) {
				var t;
				var a = e.indexOf("E") - e.indexOf(".") - 1;
				if (e.match(/^#+0.0E\+0$/)) {
					if (r == 0) return "0.0E+0";
					else if (r < 0) return "-" + _(e, -r);
					var n = e.indexOf(".");
					if (n === -1) n = e.indexOf("E");
					var i = Math.floor(Math.log(r) * Math.LOG10E) % n;
					if (i < 0) i += n;
					t = (r / Math.pow(10, i)).toPrecision(a + 1 + (n + i) % n);
					if (!t.match(/[Ee]/)) {
						var s = Math.floor(Math.log(r) * Math.LOG10E);
						if (t.indexOf(".") === -1) t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i);
						else t += "E+" + (s - i);
						t = t.replace(/\+-/, "-")
					}
					t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(e, r, t, a) {
						return r + t + a.substr(0, (n + i) % n) + "." + a.substr(i) + "E"
					})
				} else t = r.toExponential(a);
				if (e.match(/E\+00$/) && t.match(/e[+-]\d$/)) t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1);
				if (e.match(/E\-/) && t.match(/e\+/)) t = t.replace(/e\+/, "e");
				return t.replace("e", "E")
			}

			function x(e, s, f) {
				if (e.charCodeAt(0) === 40 && !s.match(p)) {
					var o = s.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
					if (f >= 0) return x("n", o, f);
					return "(" + x("n", o, -f) + ")"
				}
				if (s.charCodeAt(s.length - 1) === 44) return S(e, s, f);
				if (s.indexOf("%") !== -1) return A(e, s, f);
				if (s.indexOf("E") !== -1) return _(s, f);
				if (s.charCodeAt(0) === 36) return "$" + x(e, s.substr(s.charAt(1) == " " ? 2 : 1), f);
				var l;
				var h, b, C, E = Math.abs(f),
					w = f < 0 ? "-" : "";
				if (s.match(/^00+$/)) return w + a(E, s.length);
				if (s.match(/^[#?]+$/)) {
					l = "" + f;
					if (f === 0) l = "";
					return l.length > s.length ? l : m(s.substr(0, s.length - l.length)) + l
				}
				if (h = s.match(c)) return u(h, E, w);
				if (s.match(/^#+0+$/)) return w + a(E, s.length - s.indexOf("0"));
				if (h = s.match(d)) {
					l = ("" + f).replace(/^([^\.]+)$/, "$1." + m(h[1])).replace(/\.$/, "." + m(h[1]));
					l = l.replace(/\.(\d*)$/, function(e, r) {
						return "." + r + t("0", m(h[1]).length - r.length)
					});
					return s.indexOf("0.") !== -1 ? l : l.replace(/^0\./, ".")
				}
				s = s.replace(/^#+([0.])/, "$1");
				if (h = s.match(/^(0*)\.(#*)$/)) {
					return w + ("" + E).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, h[1].length ? "0." : ".")
				}
				if (h = s.match(/^#{1,3},##0(\.?)$/)) return w + B("" + E);
				if (h = s.match(/^#,##0\.([#0]*0)$/)) {
					return f < 0 ? "-" + x(e, s, -f) : B("" + f) + "." + t("0", h[1].length)
				}
				if (h = s.match(/^#,#*,#0/)) return x(e, s.replace(/^#,#*,/, ""), f);
				if (h = s.match(/^([0#]+)(\\?-([0#]+))+$/)) {
					l = r(x(e, s.replace(/[\\-]/g, ""), f));
					b = 0;
					return r(r(s.replace(/\\/g, "")).replace(/[0#]/g, function(e) {
						return b < l.length ? l.charAt(b++) : e === "0" ? "0" : ""
					}))
				}
				if (s.match(g)) {
					l = x(e, "##########", f);
					return "(" + l.substr(0, 3) + ") " + l.substr(3, 3) + "-" + l.substr(6)
				}
				var k = "";
				if (h = s.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) {
					b = Math.min(h[4].length, 7);
					C = v(E, Math.pow(10, b) - 1, false);
					l = "" + w;
					k = T("n", h[1], C[1]);
					if (k.charAt(k.length - 1) == " ") k = k.substr(0, k.length - 1) + "0";
					l += k + h[2] + "/" + h[3];
					k = i(C[2], b);
					if (k.length < h[4].length) k = m(h[4].substr(h[4].length - k.length)) + k;
					l += k;
					return l
				}
				if (h = s.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) {
					b = Math.min(Math.max(h[1].length, h[4].length), 7);
					C = v(E, Math.pow(10, b) - 1, true);
					return w + (C[0] || (C[1] ? "" : "0")) + " " + (C[1] ? n(C[1], b) + h[2] + "/" + h[3] + i(C[2], b) : t(" ", 2 * b + 1 + h[2].length +
						h[3].length))
				}
				if (h = s.match(/^[#0?]+$/)) {
					l = "" + f;
					if (s.length <= l.length) return l;
					return m(s.substr(0, s.length - l.length)) + l
				}
				if (h = s.match(/^([#0]+)\.([#0]+)$/)) {
					l = "" + f.toFixed(Math.min(h[2].length, 10)).replace(/([^0])0+$/, "$1");
					b = l.indexOf(".");
					var y = s.indexOf(".") - b,
						I = s.length - l.length - y;
					return m(s.substr(0, y) + l + s.substr(s.length - I))
				}
				if (h = s.match(/^00,000\.([#0]*0)$/)) {
					return f < 0 ? "-" + x(e, s, -f) : B("" + f).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(e) {
						return "00," + (e.length < 3 ? a(0, 3 - e.length) : "") + e
					}) + "." + a(0, h[1].length)
				}
				switch (s) {
					case "###,###":
						;
					case "##,###":
						;
					case "#,###":
						var R = B("" + E);
						return R !== "0" ? w + R : "";
					default:
						if (s.match(/\.[0#?]*$/)) return x(e, s.slice(0, s.lastIndexOf(".")), f) + m(s.slice(s.lastIndexOf(".")));
				}
				throw new Error("unsupported format |" + s + "|")
			}
			return function y(e, r, t) {
				return (t | 0) === t ? x(e, r, t) : k(e, r, t)
			}
		}();

		function x(e) {
			var r = [];
			var t = false;
			for (var a = 0, n = 0; a < e.length; ++a) switch (e.charCodeAt(a)) {
				case 34:
					t = !t;
					break;
				case 95:
					;
				case 42:
					;
				case 92:
					++a;
					break;
				case 59:
					r[r.length] = e.substr(n, a - n);
					n = a + 1;
			}
			r[r.length] = e.substr(n);
			if (t === true) throw new Error("Format |" + e + "| unterminated string ");
			return r
		}
		e._split = x;
		var y = /\[[HhMmSs]*\]/;

		function I(e) {
			var r = 0,
				t = "",
				a = "";
			while (r < e.length) {
				switch (t = e.charAt(r)) {
					case "G":
						if (c(e, r)) r += 6;
						r++;
						break;
					case '"':
						for (; e.charCodeAt(++r) !== 34 && r < e.length;) ++r;
						++r;
						break;
					case "\\":
						r += 2;
						break;
					case "_":
						r += 2;
						break;
					case "@":
						++r;
						break;
					case "B":
						;
					case "b":
						if (e.charAt(r + 1) === "1" || e.charAt(r + 1) === "2") return true;
					case "M":
						;
					case "D":
						;
					case "Y":
						;
					case "H":
						;
					case "S":
						;
					case "E":
						;
					case "m":
						;
					case "d":
						;
					case "y":
						;
					case "h":
						;
					case "s":
						;
					case "e":
						;
					case "g":
						return true;
					case "A":
						;
					case "a":
						if (e.substr(r, 3).toUpperCase() === "A/P") return true;
						if (e.substr(r, 5).toUpperCase() === "AM/PM") return true;
						++r;
						break;
					case "[":
						a = t;
						while (e.charAt(r++) !== "]" && r < e.length) a += e.charAt(r);
						if (a.match(y)) return true;
						break;
					case ".":
						;
					case "0":
						;
					case "#":
						while (r < e.length && ("0#?.,E+-%".indexOf(t = e.charAt(++r)) > -1 || t == "\\" && e.charAt(r + 1) == "-" && "0#".indexOf(e.charAt(
								r + 2)) > -1)) {}
						break;
					case "?":
						while (e.charAt(++r) === t) {}
						break;
					case "*":
						++r;
						if (e.charAt(r) == " " || e.charAt(r) == "*") ++r;
						break;
					case "(":
						;
					case ")":
						++r;
						break;
					case "1":
						;
					case "2":
						;
					case "3":
						;
					case "4":
						;
					case "5":
						;
					case "6":
						;
					case "7":
						;
					case "8":
						;
					case "9":
						while (r < e.length && "0123456789".indexOf(e.charAt(++r)) > -1) {}
						break;
					case " ":
						++r;
						break;
					default:
						++r;
						break;
				}
			}
			return false
		}
		e.is_date = I;

		function R(e, r, t, a) {
			var n = [],
				i = "",
				s = 0,
				f = "",
				o = "t",
				l, h, u;
			var d = "H";
			while (s < e.length) {
				switch (f = e.charAt(s)) {
					case "G":
						if (!c(e, s)) throw new Error("unrecognized character " + f + " in " + e);
						n[n.length] = {
							t: "G",
							v: "General"
						};
						s += 7;
						break;
					case '"':
						for (i = "";
							(u = e.charCodeAt(++s)) !== 34 && s < e.length;) i += String.fromCharCode(u);
						n[n.length] = {
							t: "t",
							v: i
						};
						++s;
						break;
					case "\\":
						var p = e.charAt(++s),
							v = p === "(" || p === ")" ? p : "t";
						n[n.length] = {
							t: v,
							v: p
						};
						++s;
						break;
					case "_":
						n[n.length] = {
							t: "t",
							v: " "
						};
						s += 2;
						break;
					case "@":
						n[n.length] = {
							t: "T",
							v: r
						};
						++s;
						break;
					case "B":
						;
					case "b":
						if (e.charAt(s + 1) === "1" || e.charAt(s + 1) === "2") {
							if (l == null) {
								l = g(r, t, e.charAt(s + 1) === "2");
								if (l == null) return ""
							}
							n[n.length] = {
								t: "X",
								v: e.substr(s, 2)
							};
							o = f;
							s += 2;
							break
						};
					case "M":
						;
					case "D":
						;
					case "Y":
						;
					case "H":
						;
					case "S":
						;
					case "E":
						f = f.toLowerCase();
					case "m":
						;
					case "d":
						;
					case "y":
						;
					case "h":
						;
					case "s":
						;
					case "e":
						;
					case "g":
						if (r < 0) return "";
						if (l == null) {
							l = g(r, t);
							if (l == null) return ""
						}
						i = f;
						while (++s < e.length && e.charAt(s).toLowerCase() === f) i += f;
						if (f === "m" && o.toLowerCase() === "h") f = "M";
						if (f === "h") f = d;
						n[n.length] = {
							t: f,
							v: i
						};
						o = f;
						break;
					case "A":
						;
					case "a":
						var m = {
							t: f,
							v: f
						};
						if (l == null) l = g(r, t);
						if (e.substr(s, 3).toUpperCase() === "A/P") {
							if (l != null) m.v = l.H >= 12 ? "P" : "A";
							m.t = "T";
							d = "h";
							s += 3
						} else if (e.substr(s, 5).toUpperCase() === "AM/PM") {
							if (l != null) m.v = l.H >= 12 ? "PM" : "AM";
							m.t = "T";
							s += 5;
							d = "h"
						} else {
							m.t = "t";
							++s
						}
						if (l == null && m.t === "T") return "";
						n[n.length] = m;
						o = f;
						break;
					case "[":
						i = f;
						while (e.charAt(s++) !== "]" && s < e.length) i += e.charAt(s);
						if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
						if (i.match(y)) {
							if (l == null) {
								l = g(r, t);
								if (l == null) return ""
							}
							n[n.length] = {
								t: "Z",
								v: i.toLowerCase()
							};
							o = i.charAt(1)
						} else if (i.indexOf("$") > -1) {
							i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$";
							if (!I(e)) n[n.length] = {
								t: "t",
								v: i
							}
						}
						break;
					case ".":
						if (l != null) {
							i = f;
							while (++s < e.length && (f = e.charAt(s)) === "0") i += f;
							n[n.length] = {
								t: "s",
								v: i
							};
							break
						};
					case "0":
						;
					case "#":
						i = f;
						while (++s < e.length && "0#?.,E+-%".indexOf(f = e.charAt(s)) > -1 || f == "\\" && e.charAt(s + 1) == "-" && s < e.length - 2 &&
							"0#".indexOf(e.charAt(s + 2)) > -1) i += f;
						n[n.length] = {
							t: "n",
							v: i
						};
						break;
					case "?":
						i = f;
						while (e.charAt(++s) === f) i += f;
						n[n.length] = {
							t: f,
							v: i
						};
						o = f;
						break;
					case "*":
						++s;
						if (e.charAt(s) == " " || e.charAt(s) == "*") ++s;
						break;
					case "(":
						;
					case ")":
						n[n.length] = {
							t: a === 1 ? "t" : f,
							v: f
						};
						++s;
						break;
					case "1":
						;
					case "2":
						;
					case "3":
						;
					case "4":
						;
					case "5":
						;
					case "6":
						;
					case "7":
						;
					case "8":
						;
					case "9":
						i = f;
						while (s < e.length && "0123456789".indexOf(e.charAt(++s)) > -1) i += e.charAt(s);
						n[n.length] = {
							t: "D",
							v: i
						};
						break;
					case " ":
						n[n.length] = {
							t: f,
							v: f
						};
						++s;
						break;
					default:
						if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(f) === -1) throw new Error("unrecognized character " + f + " in " + e);
						n[n.length] = {
							t: "t",
							v: f
						};
						++s;
						break;
				}
			}
			var b = 0,
				C = 0,
				E;
			for (s = n.length - 1, o = "t"; s >= 0; --s) {
				switch (n[s].t) {
					case "h":
						;
					case "H":
						n[s].t = d;
						o = "h";
						if (b < 1) b = 1;
						break;
					case "s":
						if (E = n[s].v.match(/\.0+$/)) C = Math.max(C, E[0].length - 1);
						if (b < 3) b = 3;
					case "d":
						;
					case "y":
						;
					case "M":
						;
					case "e":
						o = n[s].t;
						break;
					case "m":
						if (o === "s") {
							n[s].t = "M";
							if (b < 2) b = 2
						}
						break;
					case "X":
						break;
					case "Z":
						if (b < 1 && n[s].v.match(/[Hh]/)) b = 1;
						if (b < 2 && n[s].v.match(/[Mm]/)) b = 2;
						if (b < 3 && n[s].v.match(/[Ss]/)) b = 3;
				}
			}
			switch (b) {
				case 0:
					break;
				case 1:
					if (l.u >= .5) {
						l.u = 0;
						++l.S
					}
					if (l.S >= 60) {
						l.S = 0;
						++l.M
					}
					if (l.M >= 60) {
						l.M = 0;
						++l.H
					}
					break;
				case 2:
					if (l.u >= .5) {
						l.u = 0;
						++l.S
					}
					if (l.S >= 60) {
						l.S = 0;
						++l.M
					}
					break;
			}
			var w = "",
				k;
			for (s = 0; s < n.length; ++s) {
				switch (n[s].t) {
					case "t":
						;
					case "T":
						;
					case " ":
						;
					case "D":
						break;
					case "X":
						n[s].v = "";
						n[s].t = ";";
						break;
					case "d":
						;
					case "m":
						;
					case "y":
						;
					case "h":
						;
					case "H":
						;
					case "M":
						;
					case "s":
						;
					case "e":
						;
					case "b":
						;
					case "Z":
						n[s].v = _(n[s].t.charCodeAt(0), n[s].v, l, C);
						n[s].t = "t";
						break;
					case "n":
						;
					case "(":
						;
					case "?":
						k = s + 1;
						while (n[k] != null && ((f = n[k].t) === "?" || f === "D" || (f === " " || f === "t") && n[k + 1] != null && (n[k + 1].t === "?" ||
								n[k + 1].t === "t" && n[k + 1].v === "/") || n[s].t === "(" && (f === " " || f === "n" || f === ")") || f === "t" && (n[k].v ===
								"/" || n[k].v === " " && n[k + 1] != null && n[k + 1].t == "?"))) {
							n[s].v += n[k].v;
							n[k] = {
								v: "",
								t: ";"
							};
							++k
						}
						w += n[s].v;
						s = k - 1;
						break;
					case "G":
						n[s].t = "t";
						n[s].v = S(r, t);
						break;
				}
			}
			var A = "",
				B, x;
			if (w.length > 0) {
				if (w.charCodeAt(0) == 40) {
					B = r < 0 && w.charCodeAt(0) === 45 ? -r : r;
					x = T("(", w, B)
				} else {
					B = r < 0 && a > 1 ? -r : r;
					x = T("n", w, B);
					if (B < 0 && n[0] && n[0].t == "t") {
						x = x.substr(1);
						n[0].v = "-" + n[0].v
					}
				}
				k = x.length - 1;
				var R = n.length;
				for (s = 0; s < n.length; ++s)
					if (n[s] != null && n[s].t != "t" && n[s].v.indexOf(".") > -1) {
						R = s;
						break
					}
				var O = n.length;
				if (R === n.length && x.indexOf("E") === -1) {
					for (s = n.length - 1; s >= 0; --s) {
						if (n[s] == null || "n?(".indexOf(n[s].t) === -1) continue;
						if (k >= n[s].v.length - 1) {
							k -= n[s].v.length;
							n[s].v = x.substr(k + 1, n[s].v.length)
						} else if (k < 0) n[s].v = "";
						else {
							n[s].v = x.substr(0, k + 1);
							k = -1
						}
						n[s].t = "t";
						O = s
					}
					if (k >= 0 && O < n.length) n[O].v = x.substr(0, k + 1) + n[O].v
				} else if (R !== n.length && x.indexOf("E") === -1) {
					k = x.indexOf(".") - 1;
					for (s = R; s >= 0; --s) {
						if (n[s] == null || "n?(".indexOf(n[s].t) === -1) continue;
						h = n[s].v.indexOf(".") > -1 && s === R ? n[s].v.indexOf(".") - 1 : n[s].v.length - 1;
						A = n[s].v.substr(h + 1);
						for (; h >= 0; --h) {
							if (k >= 0 && (n[s].v.charAt(h) === "0" || n[s].v.charAt(h) === "#")) A = x.charAt(k--) + A
						}
						n[s].v = A;
						n[s].t = "t";
						O = s
					}
					if (k >= 0 && O < n.length) n[O].v = x.substr(0, k + 1) + n[O].v;
					k = x.indexOf(".") + 1;
					for (s = R; s < n.length; ++s) {
						if (n[s] == null || "n?(".indexOf(n[s].t) === -1 && s !== R) continue;
						h = n[s].v.indexOf(".") > -1 && s === R ? n[s].v.indexOf(".") + 1 : 0;
						A = n[s].v.substr(0, h);
						for (; h < n[s].v.length; ++h) {
							if (k < x.length) A += x.charAt(k++)
						}
						n[s].v = A;
						n[s].t = "t";
						O = s
					}
				}
			}
			for (s = 0; s < n.length; ++s)
				if (n[s] != null && "n(?".indexOf(n[s].t) > -1) {
					B = a > 1 && r < 0 && s > 0 && n[s - 1].v === "-" ? -r : r;
					n[s].v = T(n[s].t, n[s].v, B);
					n[s].t = "t"
				}
			var D = "";
			for (s = 0; s !== n.length; ++s)
				if (n[s] != null) D += n[s].v;
			return D
		}
		e._eval = R;
		var O = /\[[=<>]/;
		var D = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;

		function F(e, r) {
			if (r == null) return false;
			var t = parseFloat(r[2]);
			switch (r[1]) {
				case "=":
					if (e == t) return true;
					break;
				case ">":
					if (e > t) return true;
					break;
				case "<":
					if (e < t) return true;
					break;
				case "<>":
					if (e != t) return true;
					break;
				case ">=":
					if (e >= t) return true;
					break;
				case "<=":
					if (e <= t) return true;
					break;
			}
			return false
		}

		function P(e, r) {
			var t = x(e);
			var a = t.length,
				n = t[a - 1].indexOf("@");
			if (a < 4 && n > -1) --a;
			if (t.length > 4) throw new Error("cannot find right format for |" + t.join("|") + "|");
			if (typeof r !== "number") return [4, t.length === 4 || n > -1 ? t[t.length - 1] : "@"];
			switch (t.length) {
				case 1:
					t = n > -1 ? ["General", "General", "General", t[0]] : [t[0], t[0], t[0], "@"];
					break;
				case 2:
					t = n > -1 ? [t[0], t[0], t[0], t[1]] : [t[0], t[1], t[0], "@"];
					break;
				case 3:
					t = n > -1 ? [t[0], t[1], t[0], t[2]] : [t[0], t[1], t[2], "@"];
					break;
				case 4:
					break;
			}
			var i = r > 0 ? t[0] : r < 0 ? t[1] : t[2];
			if (t[0].indexOf("[") === -1 && t[1].indexOf("[") === -1) return [a, i];
			if (t[0].match(O) != null || t[1].match(O) != null) {
				var s = t[0].match(D);
				var f = t[1].match(D);
				return F(r, s) ? [a, t[0]] : F(r, f) ? [a, t[1]] : [a, t[s != null && f != null ? 2 : 1]]
			}
			return [a, i]
		}

		function N(e, r, t) {
			if (t == null) t = {};
			var a = "";
			switch (typeof e) {
				case "string":
					if (e == "m/d/yy" && t.dateNF) a = t.dateNF;
					else a = e;
					break;
				case "number":
					if (e == 14 && t.dateNF) a = t.dateNF;
					else a = (t.table != null ? t.table : p)[e];
					break;
			}
			if (c(a, 0)) return S(r, t);
			if (r instanceof Date) r = E(r, t.date1904);
			var n = P(a, r);
			if (c(n[1])) return S(r, t);
			if (r === true) r = "TRUE";
			else if (r === false) r = "FALSE";
			else if (r === "" || r == null) return "";
			return R(n[1], r, t, n[0])
		}

		function L(e, r) {
			if (typeof r != "number") {
				r = +r || -1;
				for (var t = 0; t < 392; ++t) {
					if (p[t] == undefined) {
						if (r < 0) r = t;
						continue
					}
					if (p[t] == e) {
						r = t;
						break
					}
				}
				if (r < 0) r = 391
			}
			p[r] = e;
			return r
		}
		e.load = L;
		e._table = p;
		e.get_table = function H() {
			return p
		};
		e.load_table = function W(e) {
			for (var r = 0; r != 392; ++r)
				if (e[r] !== undefined) L(e[r], r)
		};
		e.init_table = d;
		e.format = N
	};
	I(y);
	var R = {
		"General Number": "General",
		"General Date": y._table[22],
		"Long Date": "dddd, mmmm dd, yyyy",
		"Medium Date": y._table[15],
		"Short Date": y._table[14],
		"Long Time": y._table[19],
		"Medium Time": y._table[18],
		"Short Time": y._table[20],
		Currency: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
		Fixed: y._table[2],
		Standard: y._table[4],
		Percent: y._table[10],
		Scientific: y._table[11],
		"Yes/No": '"Yes";"Yes";"No";@',
		"True/False": '"True";"True";"False";@',
		"On/Off": '"Yes";"Yes";"No";@'
	};
	var O = {
		5: '"$"#,##0_);\\("$"#,##0\\)',
		6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
		7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
		8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
		23: "General",
		24: "General",
		25: "General",
		26: "General",
		27: "m/d/yy",
		28: "m/d/yy",
		29: "m/d/yy",
		30: "m/d/yy",
		31: "m/d/yy",
		32: "h:mm:ss",
		33: "h:mm:ss",
		34: "h:mm:ss",
		35: "h:mm:ss",
		36: "m/d/yy",
		41: '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
		42: '_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"_);_(@_)',
		43: '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',
		44: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
		50: "m/d/yy",
		51: "m/d/yy",
		52: "m/d/yy",
		53: "m/d/yy",
		54: "m/d/yy",
		55: "m/d/yy",
		56: "m/d/yy",
		57: "m/d/yy",
		58: "m/d/yy",
		59: "0",
		60: "0.00",
		61: "#,##0",
		62: "#,##0.00",
		63: '"$"#,##0_);\\("$"#,##0\\)',
		64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
		65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
		66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
		67: "0%",
		68: "0.00%",
		69: "# ?/?",
		70: "# ??/??",
		71: "m/d/yy",
		72: "m/d/yy",
		73: "d-mmm-yy",
		74: "d-mmm",
		75: "mmm-yy",
		76: "h:mm",
		77: "h:mm:ss",
		78: "m/d/yy h:mm",
		79: "mm:ss",
		80: "[h]:mm:ss",
		81: "mmss.0"
	};
	var D = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;

	function F(e) {
		var r = typeof e == "number" ? y._table[e] : e;
		r = r.replace(D, "(\\d+)");
		return new RegExp("^" + r + "$")
	}

	function P(e, r, t) {
		var a = -1,
			n = -1,
			i = -1,
			s = -1,
			f = -1,
			o = -1;
		(r.match(D) || []).forEach(function(e, r) {
			var l = parseInt(t[r + 1], 10);
			switch (e.toLowerCase().charAt(0)) {
				case "y":
					a = l;
					break;
				case "d":
					i = l;
					break;
				case "h":
					s = l;
					break;
				case "s":
					o = l;
					break;
				case "m":
					if (s >= 0) f = l;
					else n = l;
					break;
			}
		});
		if (o >= 0 && f == -1 && n >= 0) {
			f = n;
			n = -1
		}
		var l = ("" + (a >= 0 ? a : (new Date).getFullYear())).slice(-4) + "-" + ("00" + (n >= 1 ? n : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i :
			1)).slice(-2);
		if (l.length == 7) l = "0" + l;
		if (l.length == 8) l = "20" + l;
		var c = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (f >= 0 ? f : 0)).slice(-2) + ":" + ("00" + (o >= 0 ? o : 0)).slice(-2);
		if (s == -1 && f == -1 && o == -1) return l;
		if (a == -1 && n == -1 && i == -1) return c;
		return l + "T" + c
	}
	var N = true;
	var L = function mg() {
		var e = {};
		e.version = "1.0.3";

		function r(e, r) {
			var t = e.split("/"),
				a = r.split("/");
			for (var n = 0, i = 0, s = Math.min(t.length, a.length); n < s; ++n) {
				if (i = t[n].length - a[n].length) return i;
				if (t[n] != a[n]) return t[n] < a[n] ? -1 : 1
			}
			return t.length - a.length
		}

		function t(e) {
			if (e.charAt(e.length - 1) == "/") return e.slice(0, -1).indexOf("/") === -1 ? e : t(e.slice(0, -1));
			var r = e.lastIndexOf("/");
			return r === -1 ? e : e.slice(0, r + 1)
		}

		function a(e) {
			if (e.charAt(e.length - 1) == "/") return a(e.slice(0, -1));
			var r = e.lastIndexOf("/");
			return r === -1 ? e : e.slice(r + 1)
		}
		var n;

		function i() {
			return n || (n = require("fs"))
		}

		function s(e, r) {
			var t = 3;
			var a = 512;
			var n = 0;
			var i = 0;
			var s = 0;
			var h = 0;
			var d = 0;
			var g = [];
			var m = e.slice(0, 512);
			Ur(m, 0);
			var b = f(m);
			t = b[0];
			switch (t) {
				case 3:
					a = 512;
					break;
				case 4:
					a = 4096;
					break;
				default:
					throw new Error("Major Version: Expected 3 or 4 saw " + t);
			}
			if (a !== 512) {
				m = e.slice(0, a);
				Ur(m, 28)
			}
			var C = e.slice(0, a);
			o(m, t);
			var E = m._R(4, "i");
			if (t === 3 && E !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + E);
			m.l += 4;
			s = m._R(4, "i");
			m.l += 4;
			m.chk("00100000", "Mini Stream Cutoff Size: ");
			h = m._R(4, "i");
			n = m._R(4, "i");
			d = m._R(4, "i");
			i = m._R(4, "i");
			for (var w = -1, k = 0; k < 109; ++k) {
				w = m._R(4, "i");
				if (w < 0) break;
				g[k] = w
			}
			var S = l(e, a);
			u(d, i, S, a, g);
			var A = p(S, s, g, a);
			A[s].name = "!Directory";
			if (n > 0 && h !== I) A[h].name = "!MiniFAT";
			A[g[0]].name = "!FAT";
			A.fat_addrs = g;
			A.ssz = a;
			var _ = {},
				B = [],
				T = [],
				x = [];
			v(s, A, S, B, n, _, T, h);
			c(T, x, B);
			B.shift();
			var y = {
				FileIndex: T,
				FullPaths: x
			};
			if (r && r.raw) y.raw = {
				header: C,
				sectors: S
			};
			return y
		}

		function f(e) {
			e.chk(R, "Header Signature: ");
			e.chk(D, "CLSID: ");
			var r = e._R(2, "u");
			return [e._R(2, "u"), r]
		}

		function o(e, r) {
			var t = 9;
			e.l += 2;
			switch (t = e._R(2)) {
				case 9:
					if (r != 3) throw new Error("Sector Shift: Expected 9 saw " + t);
					break;
				case 12:
					if (r != 4) throw new Error("Sector Shift: Expected 12 saw " + t);
					break;
				default:
					throw new Error("Sector Shift: Expected 9 or 12 saw " + t);
			}
			e.chk("0600", "Mini Sector Shift: ");
			e.chk("000000000000", "Reserved: ")
		}

		function l(e, r) {
			var t = Math.ceil(e.length / r) - 1;
			var a = [];
			for (var n = 1; n < t; ++n) a[n - 1] = e.slice(n * r, (n + 1) * r);
			a[t - 1] = e.slice(t * r);
			return a
		}

		function c(e, r, t) {
			var a = 0,
				n = 0,
				i = 0,
				s = 0,
				f = 0,
				o = t.length;
			var l = [],
				c = [];
			for (; a < o; ++a) {
				l[a] = c[a] = a;
				r[a] = t[a]
			}
			for (; f < c.length; ++f) {
				a = c[f];
				n = e[a].L;
				i = e[a].R;
				s = e[a].C;
				if (l[a] === a) {
					if (n !== -1 && l[n] !== n) l[a] = l[n];
					if (i !== -1 && l[i] !== i) l[a] = l[i]
				}
				if (s !== -1) l[s] = a;
				if (n !== -1) {
					l[n] = l[a];
					c.push(n)
				}
				if (i !== -1) {
					l[i] = l[a];
					c.push(i)
				}
			}
			for (a = 1; a !== o; ++a)
				if (l[a] === a) {
					if (i !== -1 && l[i] !== i) l[a] = l[i];
					else if (n !== -1 && l[n] !== n) l[a] = l[n]
				}
			for (a = 1; a < o; ++a) {
				if (e[a].type === 0) continue;
				f = l[a];
				if (f === 0) r[a] = r[0] + "/" + r[a];
				else
					while (f !== 0 && f !== l[f]) {
						r[a] = r[f] + "/" + r[a];
						f = l[f]
					}
				l[a] = 0
			}
			r[0] += "/";
			for (a = 1; a < o; ++a) {
				if (e[a].type !== 2) r[a] += "/"
			}
		}

		function h(e, r, t) {
			var a = e.start,
				n = e.size;
			var i = [];
			var s = a;
			while (t && n > 0 && s >= 0) {
				i.push(r.slice(s * y, s * y + y));
				n -= y;
				s = Rr(t, s * 4)
			}
			if (i.length === 0) return Wr(0);
			return B(i).slice(0, e.size)
		}

		function u(e, r, t, a, n) {
			var i = I;
			if (e === I) {
				if (r !== 0) throw new Error("DIFAT chain shorter than expected")
			} else if (e !== -1) {
				var s = t[e],
					f = (a >>> 2) - 1;
				if (!s) return;
				for (var o = 0; o < f; ++o) {
					if ((i = Rr(s, o * 4)) === I) break;
					n.push(i)
				}
				u(Rr(s, a - 4), r - 1, t, a, n)
			}
		}

		function d(e, r, t, a, n) {
			var i = [],
				s = [];
			if (!n) n = [];
			var f = a - 1,
				o = 0,
				l = 0;
			for (o = r; o >= 0;) {
				n[o] = true;
				i[i.length] = o;
				s.push(e[o]);
				var c = t[Math.floor(o * 4 / a)];
				l = o * 4 & f;
				if (a < 4 + l) throw new Error("FAT boundary crossed: " + o + " 4 " + a);
				if (!e[c]) break;
				o = Rr(e[c], l)
			}
			return {
				nodes: i,
				data: sr([s])
			}
		}

		function p(e, r, t, a) {
			var n = e.length,
				i = [];
			var s = [],
				f = [],
				o = [];
			var l = a - 1,
				c = 0,
				h = 0,
				u = 0,
				d = 0;
			for (c = 0; c < n; ++c) {
				f = [];
				u = c + r;
				if (u >= n) u -= n;
				if (s[u]) continue;
				o = [];
				for (h = u; h >= 0;) {
					s[h] = true;
					f[f.length] = h;
					o.push(e[h]);
					var p = t[Math.floor(h * 4 / a)];
					d = h * 4 & l;
					if (a < 4 + d) throw new Error("FAT boundary crossed: " + h + " 4 " + a);
					if (!e[p]) break;
					h = Rr(e[p], d)
				}
				i[u] = {
					nodes: f,
					data: sr([o])
				}
			}
			return i
		}

		function v(e, r, t, a, n, i, s, f) {
			var o = 0,
				l = a.length ? 2 : 0;
			var c = r[e].data;
			var u = 0,
				p = 0,
				v;
			for (; u < c.length; u += 128) {
				var m = c.slice(u, u + 128);
				Ur(m, 64);
				p = m._R(2);
				v = or(m, 0, p - l);
				a.push(v);
				var b = {
					name: v,
					type: m._R(1),
					color: m._R(1),
					L: m._R(4, "i"),
					R: m._R(4, "i"),
					C: m._R(4, "i"),
					clsid: m._R(16),
					state: m._R(4, "i"),
					start: 0,
					size: 0
				};
				var C = m._R(2) + m._R(2) + m._R(2) + m._R(2);
				if (C !== 0) b.ct = g(m, m.l - 8);
				var E = m._R(2) + m._R(2) + m._R(2) + m._R(2);
				if (E !== 0) b.mt = g(m, m.l - 8);
				b.start = m._R(4, "i");
				b.size = m._R(4, "i");
				if (b.size < 0 && b.start < 0) {
					b.size = b.type = 0;
					b.start = I;
					b.name = ""
				}
				if (b.type === 5) {
					o = b.start;
					if (n > 0 && o !== I) r[o].name = "!StreamData"
				} else if (b.size >= 4096) {
					b.storage = "fat";
					if (r[b.start] === undefined) r[b.start] = d(t, b.start, r.fat_addrs, r.ssz);
					r[b.start].name = b.name;
					b.content = r[b.start].data.slice(0, b.size)
				} else {
					b.storage = "minifat";
					if (b.size < 0) b.size = 0;
					else if (o !== I && b.start !== I && r[o]) {
						b.content = h(b, r[o].data, (r[f] || {}).data)
					}
				}
				if (b.content) Ur(b.content, 0);
				i[v] = b;
				s.push(b)
			}
		}

		function g(e, r) {
			return new Date((Ir(e, r + 4) / 1e7 * Math.pow(2, 32) + Ir(e, r) / 1e7 - 11644473600) * 1e3)
		}

		function m(e, r) {
			i();
			return s(n.readFileSync(e), r)
		}

		function C(e, r) {
			switch (r && r.type || "base64") {
				case "file":
					return m(e, r);
				case "base64":
					return s(w(b.decode(e)), r);
				case "binary":
					return s(w(e), r);
			}
			return s(e, r)
		}

		function E(e, r) {
			var t = r || {},
				a = t.root || "Root Entry";
			if (!e.FullPaths) e.FullPaths = [];
			if (!e.FileIndex) e.FileIndex = [];
			if (e.FullPaths.length !== e.FileIndex.length) throw new Error("inconsistent CFB structure");
			if (e.FullPaths.length === 0) {
				e.FullPaths[0] = a + "/";
				e.FileIndex[0] = {
					name: a,
					type: 5
				}
			}
			if (t.CLSID) e.FileIndex[0].clsid = t.CLSID;
			k(e)
		}

		function k(e) {
			var r = "Sh33tJ5";
			if (L.find(e, "/" + r)) return;
			var t = Wr(4);
			t[0] = 55;
			t[1] = t[3] = 50;
			t[2] = 54;
			e.FileIndex.push({
				name: r,
				type: 2,
				content: t,
				size: 4,
				L: 69,
				R: 69,
				C: 69
			});
			e.FullPaths.push(e.FullPaths[0] + r);
			S(e)
		}

		function S(e, n) {
			E(e);
			var i = false,
				s = false;
			for (var f = e.FullPaths.length - 1; f >= 0; --f) {
				var o = e.FileIndex[f];
				switch (o.type) {
					case 0:
						if (s) i = true;
						else {
							e.FileIndex.pop();
							e.FullPaths.pop()
						}
						break;
					case 1:
						;
					case 2:
						;
					case 5:
						s = true;
						if (isNaN(o.R * o.L * o.C)) i = true;
						if (o.R > -1 && o.L > -1 && o.R == o.L) i = true;
						break;
					default:
						i = true;
						break;
				}
			}
			if (!i && !n) return;
			var l = new Date(1987, 1, 19),
				c = 0;
			var h = [];
			for (f = 0; f < e.FullPaths.length; ++f) {
				if (e.FileIndex[f].type === 0) continue;
				h.push([e.FullPaths[f], e.FileIndex[f]])
			}
			for (f = 0; f < h.length; ++f) {
				var u = t(h[f][0]);
				s = false;
				for (c = 0; c < h.length; ++c)
					if (h[c][0] === u) s = true;
				if (!s) h.push([u, {
					name: a(u).replace("/", ""),
					type: 1,
					clsid: D,
					ct: l,
					mt: l,
					content: null
				}])
			}
			h.sort(function(e, t) {
				return r(e[0], t[0])
			});
			e.FullPaths = [];
			e.FileIndex = [];
			for (f = 0; f < h.length; ++f) {
				e.FullPaths[f] = h[f][0];
				e.FileIndex[f] = h[f][1]
			}
			for (f = 0; f < h.length; ++f) {
				var d = e.FileIndex[f];
				var p = e.FullPaths[f];
				d.name = a(p).replace("/", "");
				d.L = d.R = d.C = -(d.color = 1);
				d.size = d.content ? d.content.length : 0;
				d.start = 0;
				d.clsid = d.clsid || D;
				if (f === 0) {
					d.C = h.length > 1 ? 1 : -1;
					d.size = 0;
					d.type = 5
				} else if (p.slice(-1) == "/") {
					for (c = f + 1; c < h.length; ++c)
						if (t(e.FullPaths[c]) == p) break;
					d.C = c >= h.length ? -1 : c;
					for (c = f + 1; c < h.length; ++c)
						if (t(e.FullPaths[c]) == t(p)) break;
					d.R = c >= h.length ? -1 : c;
					d.type = 1
				} else {
					if (t(e.FullPaths[f + 1] || "") == t(p)) d.R = f + 1;
					d.type = 2
				}
			}
		}

		function A(e, r) {
			var t = r || {};
			S(e);
			var a = function(e) {
				var r = 0,
					t = 0;
				for (var a = 0; a < e.FileIndex.length; ++a) {
					var n = e.FileIndex[a];
					if (!n.content) continue;
					var i = n.content.length;
					if (i > 0) {
						if (i < 4096) r += i + 63 >> 6;
						else t += i + 511 >> 9
					}
				}
				var s = e.FullPaths.length + 3 >> 2;
				var f = r + 7 >> 3;
				var o = r + 127 >> 7;
				var l = f + t + s + o;
				var c = l + 127 >> 7;
				var h = c <= 109 ? 0 : Math.ceil((c - 109) / 127);
				while (l + c + h + 127 >> 7 > c) h = ++c <= 109 ? 0 : Math.ceil((c - 109) / 127);
				var u = [1, h, c, o, s, t, r, 0];
				e.FileIndex[0].size = r << 6;
				u[7] = (e.FileIndex[0].start = u[0] + u[1] + u[2] + u[3] + u[4] + u[5]) + (u[6] + 7 >> 3);
				return u
			}(e);
			var n = Wr(a[7] << 9);
			var i = 0,
				s = 0; {
				for (i = 0; i < 8; ++i) n._W(1, O[i]);
				for (i = 0; i < 8; ++i) n._W(2, 0);
				n._W(2, 62);
				n._W(2, 3);
				n._W(2, 65534);
				n._W(2, 9);
				n._W(2, 6);
				for (i = 0; i < 3; ++i) n._W(2, 0);
				n._W(4, 0);
				n._W(4, a[2]);
				n._W(4, a[0] + a[1] + a[2] + a[3] - 1);
				n._W(4, 0);
				n._W(4, 1 << 12);
				n._W(4, a[3] ? a[0] + a[1] + a[2] - 1 : I);
				n._W(4, a[3]);
				n._W(-4, a[1] ? a[0] - 1 : I);
				n._W(4, a[1]);
				for (i = 0; i < 109; ++i) n._W(-4, i < a[2] ? a[1] + i : -1)
			}
			if (a[1]) {
				for (s = 0; s < a[1]; ++s) {
					for (; i < 236 + s * 127; ++i) n._W(-4, i < a[2] ? a[1] + i : -1);
					n._W(-4, s === a[1] - 1 ? I : s + 1)
				}
			}
			var f = function(e) {
				for (s += e; i < s - 1; ++i) n._W(-4, i + 1);
				if (e) {
					++i;
					n._W(-4, I)
				}
			};
			s = i = 0;
			for (s += a[1]; i < s; ++i) n._W(-4, F.DIFSECT);
			for (s += a[2]; i < s; ++i) n._W(-4, F.FATSECT);
			f(a[3]);
			f(a[4]);
			var o = 0,
				l = 0;
			var c = e.FileIndex[0];
			for (; o < e.FileIndex.length; ++o) {
				c = e.FileIndex[o];
				if (!c.content) continue;
				l = c.content.length;
				if (l < 4096) continue;
				c.start = s;
				f(l + 511 >> 9)
			}
			f(a[6] + 7 >> 3);
			while (n.l & 511) n._W(-4, F.ENDOFCHAIN);
			s = i = 0;
			for (o = 0; o < e.FileIndex.length; ++o) {
				c = e.FileIndex[o];
				if (!c.content) continue;
				l = c.content.length;
				if (!l || l >= 4096) continue;
				c.start = s;
				f(l + 63 >> 6)
			}
			while (n.l & 511) n._W(-4, F.ENDOFCHAIN);
			for (i = 0; i < a[4] << 2; ++i) {
				var h = e.FullPaths[i];
				if (!h || h.length === 0) {
					for (o = 0; o < 17; ++o) n._W(4, 0);
					for (o = 0; o < 3; ++o) n._W(4, -1);
					for (o = 0; o < 12; ++o) n._W(4, 0);
					continue
				}
				c = e.FileIndex[i];
				if (i === 0) c.start = c.size ? c.start - 1 : I;
				var u = i === 0 && t.root || c.name;
				l = 2 * (u.length + 1);
				n._W(64, u, "utf16le");
				n._W(2, l);
				n._W(1, c.type);
				n._W(1, c.color);
				n._W(-4, c.L);
				n._W(-4, c.R);
				n._W(-4, c.C);
				if (!c.clsid)
					for (o = 0; o < 4; ++o) n._W(4, 0);
				else n._W(16, c.clsid, "hex");
				n._W(4, c.state || 0);
				n._W(4, 0);
				n._W(4, 0);
				n._W(4, 0);
				n._W(4, 0);
				n._W(4, c.start);
				n._W(4, c.size);
				n._W(4, 0)
			}
			for (i = 1; i < e.FileIndex.length; ++i) {
				c = e.FileIndex[i];
				if (c.size >= 4096) {
					n.l = c.start + 1 << 9;
					for (o = 0; o < c.size; ++o) n._W(1, c.content[o]);
					for (; o & 511; ++o) n._W(1, 0)
				}
			}
			for (i = 1; i < e.FileIndex.length; ++i) {
				c = e.FileIndex[i];
				if (c.size > 0 && c.size < 4096) {
					for (o = 0; o < c.size; ++o) n._W(1, c.content[o]);
					for (; o & 63; ++o) n._W(1, 0)
				}
			}
			while (n.l < n.length) n._W(1, 0);
			return n
		}

		function _(e, r) {
			var t = e.FullPaths.map(function(e) {
				return e.toUpperCase()
			});
			var a = t.map(function(e) {
				var r = e.split("/");
				return r[r.length - (e.slice(-1) == "/" ? 2 : 1)]
			});
			var n = false;
			if (r.charCodeAt(0) === 47) {
				n = true;
				r = t[0].slice(0, -1) + r
			} else n = r.indexOf("/") !== -1;
			var i = r.toUpperCase();
			var s = n === true ? t.indexOf(i) : a.indexOf(i);
			if (s !== -1) return e.FileIndex[s];
			i = i.replace(T, "").replace(x, "!");
			for (s = 0; s < t.length; ++s) {
				if (t[s].replace(T, "").replace(x, "!") == i) return e.FileIndex[s];
				if (a[s].replace(T, "").replace(x, "!") == i) return e.FileIndex[s]
			}
			return null
		}
		var y = 64;
		var I = -2;
		var R = "d0cf11e0a1b11ae1";
		var O = [208, 207, 17, 224, 161, 177, 26, 225];
		var D = "00000000000000000000000000000000";
		var F = {
			MAXREGSECT: -6,
			DIFSECT: -4,
			FATSECT: -3,
			ENDOFCHAIN: I,
			FREESECT: -1,
			HEADER_SIGNATURE: R,
			HEADER_MINOR_VERSION: "3e00",
			MAXREGSID: -6,
			NOSTREAM: -1,
			HEADER_CLSID: D,
			EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
		};

		function P(e, r, t) {
			i();
			var a = A(e, t);
			n.writeFileSync(r, a)
		}

		function N(e) {
			var r = new Array(e.length);
			for (var t = 0; t < e.length; ++t) r[t] = String.fromCharCode(e[t]);
			return r.join("")
		}

		function M(e, r) {
			var t = A(e, r);
			switch (r && r.type) {
				case "file":
					i();
					n.writeFileSync(r.filename, t);
					return t;
				case "binary":
					return N(t);
				case "base64":
					return b.encode(N(t));
			}
			return t
		}

		function U(e) {
			var r = {};
			E(r, e);
			return r
		}

		function H(e, r, t, n) {
			E(e);
			var i = L.find(e, r);
			if (!i) {
				var s = e.FullPaths[0];
				if (r.slice(0, s.length) == s) s = r;
				else {
					if (s.slice(-1) != "/") s += "/";
					s = (s + r).replace("//", "/")
				}
				i = {
					name: a(r),
					type: 2
				};
				e.FileIndex.push(i);
				e.FullPaths.push(s);
				L.utils.cfb_gc(e)
			}
			i.content = t;
			i.size = t ? t.length : 0;
			if (n) {
				if (n.CLSID) i.clsid = n.CLSID
			}
			return i
		}

		function W(e, r) {
			E(e);
			var t = L.find(e, r);
			if (t)
				for (var a = 0; a < e.FileIndex.length; ++a)
					if (e.FileIndex[a] == t) {
						e.FileIndex.splice(a, 1);
						e.FullPaths.splice(a, 1);
						return true
					}
			return false
		}

		function V(e, r, t) {
			E(e);
			var n = L.find(e, r);
			if (n)
				for (var i = 0; i < e.FileIndex.length; ++i)
					if (e.FileIndex[i] == n) {
						e.FileIndex[i].name = a(t);
						e.FullPaths[i] = t;
						return true
					}
			return false
		}

		function z(e) {
			S(e, true)
		}
		e.find = _;
		e.read = C;
		e.parse = s;
		e.write = M;
		e.writeFile = P;
		e.utils = {
			cfb_new: U,
			cfb_add: H,
			cfb_del: W,
			cfb_mov: V,
			cfb_gc: z,
			ReadShift: Dr,
			CheckField: Mr,
			prep_blob: Ur,
			bconcat: B,
			consts: F
		};
		return e
	}();
	if (typeof require !== "undefined" && typeof module !== "undefined" && typeof N === "undefined") {
		module.exports = L
	}
	var M;
	if (typeof require !== "undefined") try {
		M = require("fs")
	} catch (U) {}

	function H(e) {
		if (typeof e === "string") return k(e);
		if (Array.isArray(e)) return A(e);
		return e
	}

	function W(e, r, t) {
		if (typeof M !== "undefined" && M.writeFileSync) return t ? M.writeFileSync(e, r, t) : M.writeFileSync(e, r);
		var a = t == "utf8" ? He(r) : r;
		if (typeof IE_SaveFile !== "undefined") return IE_SaveFile(a, e);
		if (typeof Blob !== "undefined") {
			var n = new Blob([H(a)], {
				type: "application/octet-stream"
			});
			if (typeof navigator !== "undefined" && navigator.msSaveBlob) return navigator.msSaveBlob(n, e);
			if (typeof saveAs !== "undefined") return saveAs(n, e);
			if (typeof URL !== "undefined" && typeof document !== "undefined" && document.createElement && URL.createObjectURL) {
				var i = document.createElement("a");
				if (i.download != null) {
					var s = URL.createObjectURL(n);
					i.download = e;
					i.href = s;
					document.body.appendChild(i);
					i.click();
					document.body.removeChild(i);
					if (URL.revokeObjectURL && typeof setTimeout !== "undefined") setTimeout(function() {
						URL.revokeObjectURL(s)
					}, 6e4);
					return s
				}
			}
		}
		if (typeof $ !== "undefined" && typeof File !== "undefined" && typeof Folder !== "undefined") try {
			var f = File(e);
			f.open("w");
			f.encoding = "binary";
			if (Array.isArray(r)) r = S(r);
			f.write(r);
			f.close();
			return r
		} catch (o) {
			if (!o.message || !o.message.match(/onstruct/)) throw o
		}
		throw new Error("cannot save file " + e)
	}

	function V(e) {
		if (typeof M !== "undefined") return M.readFileSync(e);
		if (typeof $ !== "undefined" && typeof File !== "undefined" && typeof Folder !== "undefined") try {
			var r = File(e);
			r.open("r");
			r.encoding = "binary";
			var t = r.read();
			r.close();
			return t
		} catch (a) {
			if (!a.message || !a.message.match(/onstruct/)) throw a
		}
		throw new Error("Cannot access file " + e)
	}

	function z(e) {
		return Object.keys(e)
	}

	function X(e, r) {
		var t = [],
			a = z(e);
		for (var n = 0; n !== a.length; ++n)
			if (t[e[a[n]][r]] == null) t[e[a[n]][r]] = a[n];
		return t
	}

	function G(e) {
		var r = [],
			t = z(e);
		for (var a = 0; a !== t.length; ++a) r[e[t[a]]] = t[a];
		return r
	}

	function j(e) {
		var r = [],
			t = z(e);
		for (var a = 0; a !== t.length; ++a) r[e[t[a]]] = parseInt(t[a], 10);
		return r
	}

	function K(e) {
		var r = [],
			t = z(e);
		for (var a = 0; a !== t.length; ++a) {
			if (r[e[t[a]]] == null) r[e[t[a]]] = [];
			r[e[t[a]]].push(t[a])
		}
		return r
	}
	var Y = new Date(1899, 11, 30, 0, 0, 0);
	var Z = Y.getTime() + ((new Date).getTimezoneOffset() - Y.getTimezoneOffset()) * 6e4;

	function Q(e, r) {
		var t = e.getTime();
		if (r) t -= 1462 * 24 * 60 * 60 * 1e3;
		return (t - Z) / (24 * 60 * 60 * 1e3)
	}

	function J(e) {
		var r = new Date;
		r.setTime(e * 24 * 60 * 60 * 1e3 + Z);
		return r
	}

	function q(e) {
		var r = 0,
			t = 0,
			a = false;
		var n = e.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);
		if (!n) throw new Error("|" + e + "| is not an ISO8601 Duration");
		for (var i = 1; i != n.length; ++i) {
			if (!n[i]) continue;
			t = 1;
			if (i > 3) a = true;
			switch (n[i].slice(n[i].length - 1)) {
				case "Y":
					throw new Error("Unsupported ISO Duration Field: " + n[i].slice(n[i].length - 1));
				case "D":
					t *= 24;
				case "H":
					t *= 60;
				case "M":
					if (!a) throw new Error("Unsupported ISO Duration Field: M");
					else t *= 60;
				case "S":
					break;
			}
			r += t * parseInt(n[i], 10)
		}
		return r
	}
	var ee = new Date("2017-02-19T19:06:09.000Z");
	if (isNaN(ee.getFullYear())) ee = new Date("2/19/17");
	var re = ee.getFullYear() == 2017;

	function te(e, r) {
		var t = new Date(e);
		if (re) {
			if (r > 0) t.setTime(t.getTime() + t.getTimezoneOffset() * 60 * 1e3);
			else if (r < 0) t.setTime(t.getTime() - t.getTimezoneOffset() * 60 * 1e3);
			return t
		}
		if (e instanceof Date) return e;
		if (ee.getFullYear() == 1917 && !isNaN(t.getFullYear())) {
			var a = t.getFullYear();
			if (e.indexOf("" + a) > -1) return t;
			t.setFullYear(t.getFullYear() + 100);
			return t
		}
		var n = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"];
		var i = new Date(+n[0], +n[1] - 1, +n[2], +n[3] || 0, +n[4] || 0, +n[5] || 0);
		if (e.indexOf("Z") > -1) i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3);
		return i
	}

	function ae(e) {
		var r = "";
		for (var t = 0; t != e.length; ++t) r += String.fromCharCode(e[t]);
		return r
	}

	function ne(e) {
		if (typeof JSON != "undefined" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
		if (typeof e != "object" || e == null) return e;
		if (e instanceof Date) return new Date(e.getTime());
		var r = {};
		for (var t in e)
			if (e.hasOwnProperty(t)) r[t] = ne(e[t]);
		return r
	}

	function ie(e, r) {
		var t = "";
		while (t.length < r) t += e;
		return t
	}

	function se(e) {
		var r = Number(e);
		if (!isNaN(r)) return r;
		var t = 1;
		var a = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function() {
			t *= 100;
			return ""
		});
		if (!isNaN(r = Number(a))) return r / t;
		a = a.replace(/[(](.*)[)]/, function(e, r) {
			t = -t;
			return r
		});
		if (!isNaN(r = Number(a))) return r / t;
		return r
	}

	function fe(e) {
		var r = new Date(e),
			t = new Date(NaN);
		var a = r.getYear(),
			n = r.getMonth(),
			i = r.getDate();
		if (isNaN(i)) return t;
		if (a < 0 || a > 8099) return t;
		if ((n > 0 || i > 1) && a != 101) return r;
		if (e.toLowerCase().match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) return r;
		if (e.match(/[^-0-9:,\/\\]/)) return t;
		return r
	}
	var oe = "abacaba".split(/(:?b)/i).length == 5;

	function le(e, r, t) {
		if (oe || typeof r == "string") return e.split(r);
		var a = e.split(r),
			n = [a[0]];
		for (var i = 1; i < a.length; ++i) {
			n.push(t);
			n.push(a[i])
		}
		return n
	}

	function ce(e) {
		if (!e) return null;
		if (e.data) return p(e.data);
		if (e.asNodeBuffer && C) return p(e.asNodeBuffer().toString("binary"));
		if (e.asBinary) return p(e.asBinary());
		if (e._data && e._data.getContent) return p(ae(Array.prototype.slice.call(e._data.getContent(), 0)));
		return null
	}

	function he(e) {
		if (!e) return null;
		if (e.data) return h(e.data);
		if (e.asNodeBuffer && C) return e.asNodeBuffer();
		if (e._data && e._data.getContent) {
			var r = e._data.getContent();
			if (typeof r == "string") return h(r);
			return Array.prototype.slice.call(r)
		}
		return null
	}

	function ue(e) {
		return e && e.name.slice(-4) === ".bin" ? he(e) : ce(e)
	}

	function de(e, r) {
		var t = z(e.files);
		var a = r.toLowerCase(),
			n = a.replace(/\//g, "\\");
		for (var i = 0; i < t.length; ++i) {
			var s = t[i].toLowerCase();
			if (a == s || n == s) return e.files[t[i]]
		}
		return null
	}

	function pe(e, r) {
		var t = de(e, r);
		if (t == null) throw new Error("Cannot find file " + r + " in zip");
		return t
	}

	function ve(e, r, t) {
		if (!t) return ue(pe(e, r));
		if (!r) return null;
		try {
			return ve(e, r)
		} catch (a) {
			return null
		}
	}

	function ge(e, r, t) {
		if (!t) return ce(pe(e, r));
		if (!r) return null;
		try {
			return ge(e, r)
		} catch (a) {
			return null
		}
	}
	var me;
	if (typeof JSZip !== "undefined") me = JSZip;
	if (typeof exports !== "undefined") {
		if (typeof module !== "undefined" && module.exports) {
			if (typeof me === "undefined") me = undefined
		}
	}

	function be(e, r) {
		var t = r.split("/");
		if (r.slice(-1) != "/") t.pop();
		var a = e.split("/");
		while (a.length !== 0) {
			var n = a.shift();
			if (n === "..") t.pop();
			else if (n !== ".") t.push(n)
		}
		return t.join("/")
	}
	var Ce = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n';
	var Ee = /([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g;
	var we = /<[\/\?]?[a-zA-Z0-9:]+(?:\s+[^"\s?>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s=]+))*\s?[\/\?]?>/g;
	if (!Ce.match(we)) we = /<[^>]*>/g;
	var ke = /<\w*:/,
		Se = /<(\/?)\w+:/;

	function Ae(e, r) {
		var t = {};
		var a = 0,
			n = 0;
		for (; a !== e.length; ++a)
			if ((n = e.charCodeAt(a)) === 32 || n === 10 || n === 13) break;
		if (!r) t[0] = e.slice(0, a);
		if (a === e.length) return t;
		var i = e.match(Ee),
			s = 0,
			f = "",
			o = 0,
			l = "",
			c = "",
			h = 1;
		if (i)
			for (o = 0; o != i.length; ++o) {
				c = i[o];
				for (n = 0; n != c.length; ++n)
					if (c.charCodeAt(n) === 61) break;
				l = c.slice(0, n).trim();
				while (c.charCodeAt(n + 1) == 32) ++n;
				h = (a = c.charCodeAt(n + 1)) == 34 || a == 39 ? 1 : 0;
				f = c.slice(n + 1 + h, c.length - h);
				for (s = 0; s != l.length; ++s)
					if (l.charCodeAt(s) === 58) break;
				if (s === l.length) {
					if (l.indexOf("_") > 0) l = l.slice(0, l.indexOf("_"));
					t[l] = f
				} else {
					var u = (s === 5 && l.slice(0, 5) === "xmlns" ? "xmlns" : "") + l.slice(s + 1);
					if (t[u] && l.slice(s - 3, s) == "ext") continue;
					t[u] = f
				}
			}
		return t
	}

	function _e(e) {
		return e.replace(Se, "<$1")
	}
	var Be = {
		"&quot;": '"',
		"&apos;": "'",
		"&gt;": ">",
		"&lt;": "<",
		"&amp;": "&"
	};
	var Te = G(Be);
	var xe = function() {
		var e = /&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/g,
			r = /_x([\da-fA-F]{4})_/g;
		return function t(a) {
			var n = a + "",
				i = n.indexOf("<![CDATA[");
			if (i == -1) return n.replace(e, function(e, r) {
				return Be[e] || String.fromCharCode(parseInt(r, e.indexOf("x") > -1 ? 16 : 10)) || e
			}).replace(r, function(e, r) {
				return String.fromCharCode(parseInt(r, 16))
			});
			var s = n.indexOf("]]>");
			return t(n.slice(0, i)) + n.slice(i + 9, s) + t(n.slice(s + 3))
		}
	}();
	var ye = /[&<>'"]/g,
		Ie = /[\u0000-\u0008\u000b-\u001f]/g;

	function Re(e) {
		var r = e + "";
		return r.replace(ye, function(e) {
			return Te[e]
		}).replace(Ie, function(e) {
			return "_x" + ("000" + e.charCodeAt(0).toString(16)).slice(-4) + "_"
		})
	}

	function Oe(e) {
		return Re(e).replace(/ /g, "_x0020_")
	}
	var De = /[\u0000-\u001f]/g;

	function Fe(e) {
		var r = e + "";
		return r.replace(ye, function(e) {
			return Te[e]
		}).replace(De, function(e) {
			return "&#x" + ("000" + e.charCodeAt(0).toString(16)).slice(-4) + ";"
		})
	}

	function Pe(e) {
		var r = e + "";
		return r.replace(ye, function(e) {
			return Te[e]
		}).replace(De, function(e) {
			return "&#x" + e.charCodeAt(0).toString(16).toUpperCase() + ";"
		})
	}
	var Ne = function() {
		var e = /&#(\d+);/g;

		function r(e, r) {
			return String.fromCharCode(parseInt(r, 10))
		}
		return function t(a) {
			return a.replace(e, r)
		}
	}();
	var Le = function() {
		return function e(r) {
			return r.replace(/(\r\n|[\r\n])/g, "&#10;")
		}
	}();

	function Me(e) {
		switch (e) {
			case 1:
				;
			case true:
				;
			case "1":
				;
			case "true":
				;
			case "TRUE":
				return true;
			default:
				return false;
		}
	}
	var Ue = function bg(e) {
		var r = "",
			t = 0,
			a = 0,
			n = 0,
			i = 0,
			s = 0,
			f = 0;
		while (t < e.length) {
			a = e.charCodeAt(t++);
			if (a < 128) {
				r += String.fromCharCode(a);
				continue
			}
			n = e.charCodeAt(t++);
			if (a > 191 && a < 224) {
				s = (a & 31) << 6;
				s |= n & 63;
				r += String.fromCharCode(s);
				continue
			}
			i = e.charCodeAt(t++);
			if (a < 240) {
				r += String.fromCharCode((a & 15) << 12 | (n & 63) << 6 | i & 63);
				continue
			}
			s = e.charCodeAt(t++);
			f = ((a & 7) << 18 | (n & 63) << 12 | (i & 63) << 6 | s & 63) - 65536;
			r += String.fromCharCode(55296 + (f >>> 10 & 1023));
			r += String.fromCharCode(56320 + (f & 1023))
		}
		return r
	};
	var He = function(e) {
		var r = [],
			t = 0,
			a = 0,
			n = 0;
		while (t < e.length) {
			a = e.charCodeAt(t++);
			switch (true) {
				case a < 128:
					r.push(String.fromCharCode(a));
					break;
				case a < 2048:
					r.push(String.fromCharCode(192 + (a >> 6)));
					r.push(String.fromCharCode(128 + (a & 63)));
					break;
				case a >= 55296 && a < 57344:
					a -= 55296;
					n = e.charCodeAt(t++) - 56320 + (a << 10);
					r.push(String.fromCharCode(240 + (n >> 18 & 7)));
					r.push(String.fromCharCode(144 + (n >> 12 & 63)));
					r.push(String.fromCharCode(128 + (n >> 6 & 63)));
					r.push(String.fromCharCode(128 + (n & 63)));
					break;
				default:
					r.push(String.fromCharCode(224 + (a >> 12)));
					r.push(String.fromCharCode(128 + (a >> 6 & 63)));
					r.push(String.fromCharCode(128 + (a & 63)));
			}
		}
		return r.join("")
	};
	if (C) {
		var We = function Cg(e) {
			var r = new Buffer(2 * e.length),
				t, a, n = 1,
				i = 0,
				s = 0,
				f;
			for (a = 0; a < e.length; a += n) {
				n = 1;
				if ((f = e.charCodeAt(a)) < 128) t = f;
				else if (f < 224) {
					t = (f & 31) * 64 + (e.charCodeAt(a + 1) & 63);
					n = 2
				} else if (f < 240) {
					t = (f & 15) * 4096 + (e.charCodeAt(a + 1) & 63) * 64 + (e.charCodeAt(a + 2) & 63);
					n = 3
				} else {
					n = 4;
					t = (f & 7) * 262144 + (e.charCodeAt(a + 1) & 63) * 4096 + (e.charCodeAt(a + 2) & 63) * 64 + (e.charCodeAt(a + 3) & 63);
					t -= 65536;
					s = 55296 + (t >>> 10 & 1023);
					t = 56320 + (t & 1023)
				}
				if (s !== 0) {
					r[i++] = s & 255;
					r[i++] = s >>> 8;
					s = 0
				}
				r[i++] = t % 256;
				r[i++] = t >>> 8
			}
			return r.slice(0, i).toString("ucs2")
		};
		var Ve = "foo bar bazâð£";
		if (Ue(Ve) == We(Ve)) Ue = We;
		var ze = function Eg(e) {
			return Buffer(e, "binary").toString("utf8")
		};
		if (Ue(Ve) == ze(Ve)) Ue = ze;
		He = function(e) {
			return new Buffer(e, "utf8").toString("binary")
		}
	}
	var Xe = function() {
		var e = {};
		return function r(t, a) {
			var n = t + "|" + (a || "");
			if (e[n]) return e[n];
			return e[n] = new RegExp("<(?:\\w+:)?" + t + '(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?' + t + ">", a || "")
		}
	}();
	var Ge = function() {
		var e = [
			["nbsp", " "],
			["middot", "·"],
			["quot", '"'],
			["apos", "'"],
			["gt", ">"],
			["lt", "<"],
			["amp", "&"]
		].map(function(e) {
			return [new RegExp("&" + e[0] + ";", "g"), e[1]]
		});
		return function r(t) {
			var a = t.trim().replace(/\s+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, "\n").replace(/<[^>]*>/g, "");
			for (var n = 0; n < e.length; ++n) a = a.replace(e[n][0], e[n][1]);
			return a
		}
	}();
	var je = function() {
		var e = {};
		return function r(t) {
			if (e[t] !== undefined) return e[t];
			return e[t] = new RegExp("<(?:vt:)?" + t + ">([\\s\\S]*?)</(?:vt:)?" + t + ">", "g")
		}
	}();
	var Ke = /<\/?(?:vt:)?variant>/g,
		Ye = /<(?:vt:)([^>]*)>([\s\S]*)</;

	function $e(e, r) {
		var t = Ae(e);
		var a = e.match(je(t.baseType)) || [];
		var n = [];
		if (a.length != t.size) {
			if (r.WTF) throw new Error("unexpected vector length " + a.length + " != " + t.size);
			return n
		}
		a.forEach(function(e) {
			var r = e.replace(Ke, "").match(Ye);
			if (r) n.push({
				v: Ue(r[2]),
				t: r[1]
			})
		});
		return n
	}
	var Ze = /(^\s|\s$|\n)/;

	function Qe(e, r) {
		return "<" + e + (r.match(Ze) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e + ">"
	}

	function Je(e) {
		return z(e).map(function(r) {
			return " " + r + '="' + e[r] + '"'
		}).join("")
	}

	function qe(e, r, t) {
		return "<" + e + (t != null ? Je(t) : "") + (r != null ? (r.match(Ze) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e : "/") + ">"
	}

	function er(e, r) {
		try {
			return e.toISOString().replace(/\.\d*/, "")
		} catch (t) {
			if (r) throw t
		}
		return ""
	}

	function rr(e) {
		switch (typeof e) {
			case "string":
				return qe("vt:lpwstr", e);
			case "number":
				return qe((e | 0) == e ? "vt:i4" : "vt:r8", String(e));
			case "boolean":
				return qe("vt:bool", e ? "true" : "false");
		}
		if (e instanceof Date) return qe("vt:filetime", er(e));
		throw new Error("Unable to serialize " + e)
	}
	var tr = {
		dc: "http://purl.org/dc/elements/1.1/",
		dcterms: "http://purl.org/dc/terms/",
		dcmitype: "http://purl.org/dc/dcmitype/",
		mx: "http://schemas.microsoft.com/office/mac/excel/2008/main",
		r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
		sjs: "http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties",
		vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
		xsi: "http://www.w3.org/2001/XMLSchema-instance",
		xsd: "http://www.w3.org/2001/XMLSchema"
	};
	tr.main = ["http://schemas.openxmlformats.org/spreadsheetml/2006/main", "http://purl.oclc.org/ooxml/spreadsheetml/main",
		"http://schemas.microsoft.com/office/excel/2006/main", "http://schemas.microsoft.com/office/excel/2006/2"
	];
	var ar = {
		o: "urn:schemas-microsoft-com:office:office",
		x: "urn:schemas-microsoft-com:office:excel",
		ss: "urn:schemas-microsoft-com:office:spreadsheet",
		dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
		mv: "http://macVmlSchemaUri",
		v: "urn:schemas-microsoft-com:vml",
		html: "http://www.w3.org/TR/REC-html40"
	};

	function nr(e, r) {
		var t = 1 - 2 * (e[r + 7] >>> 7);
		var a = ((e[r + 7] & 127) << 4) + (e[r + 6] >>> 4 & 15);
		var n = e[r + 6] & 15;
		for (var i = 5; i >= 0; --i) n = n * 256 + e[r + i];
		if (a == 2047) return n == 0 ? t * Infinity : NaN;
		if (a == 0) a = -1022;
		else {
			a -= 1023;
			n += Math.pow(2, 52)
		}
		return t * Math.pow(2, a - 52) * n
	}

	function ir(e, r, t) {
		var a = (r < 0 || 1 / r == -Infinity ? 1 : 0) << 7,
			n = 0,
			i = 0;
		var s = a ? -r : r;
		if (!isFinite(s)) {
			n = 2047;
			i = isNaN(r) ? 26985 : 0
		} else if (s == 0) n = i = 0;
		else {
			n = Math.floor(Math.log(s) / Math.LN2);
			i = s * Math.pow(2, 52 - n);
			if (n <= -1023 && (!isFinite(i) || i < Math.pow(2, 52))) {
				n = -1022
			} else {
				i -= Math.pow(2, 52);
				n += 1023
			}
		}
		for (var f = 0; f <= 5; ++f, i /= 256) e[t + f] = i & 255;
		e[t + 6] = (n & 15) << 4 | i & 15;
		e[t + 7] = n >> 4 | a
	}
	var sr = function(e) {
		var r = [],
			t = 10240;
		for (var a = 0; a < e[0].length; ++a)
			if (e[0][a])
				for (var n = 0, i = e[0][a].length; n < i; n += t) r.push.apply(r, e[0][a].slice(n, n + t));
		return r
	};
	var fr = sr;
	var or = function(e, r, t) {
		var a = [];
		for (var n = r; n < t; n += 2) a.push(String.fromCharCode(xr(e, n)));
		return a.join("").replace(T, "")
	};
	var lr = or;
	var cr = function(e, r, t) {
		var a = [];
		for (var n = r; n < r + t; ++n) a.push(("0" + e[n].toString(16)).slice(-2));
		return a.join("")
	};
	var hr = cr;
	var ur = function(e, r, t) {
		var a = [];
		for (var n = r; n < t; n++) a.push(String.fromCharCode(Tr(e, n)));
		return a.join("")
	};
	var dr = ur;
	var pr = function(e, r) {
		var t = Ir(e, r);
		return t > 0 ? ur(e, r + 4, r + 4 + t - 1) : ""
	};
	var vr = pr;
	var gr = function(e, r) {
		var t = Ir(e, r);
		return t > 0 ? ur(e, r + 4, r + 4 + t - 1) : ""
	};
	var mr = gr;
	var br = function(e, r) {
		var t = 2 * Ir(e, r);
		return t > 0 ? ur(e, r + 4, r + 4 + t - 1) : ""
	};
	var Cr = br;
	var Er, wr;
	Er = wr = function wg(e, r) {
		var t = Ir(e, r);
		return t > 0 ? or(e, r + 4, r + 4 + t) : ""
	};
	var kr = function(e, r) {
		var t = Ir(e, r);
		return t > 0 ? ur(e, r + 4, r + 4 + t) : ""
	};
	var Sr = kr;
	var Ar, _r;
	Ar = _r = function(e, r) {
		return nr(e, r)
	};
	var Br = function kg(e) {
		return Array.isArray(e)
	};
	if (C) {
		or = function(e, r, t) {
			if (!Buffer.isBuffer(e)) return lr(e, r, t);
			return e.toString("utf16le", r, t).replace(T, "")
		};
		cr = function(e, r, t) {
			return Buffer.isBuffer(e) ? e.toString("hex", r, r + t) : hr(e, r, t)
		};
		pr = function Sg(e, r) {
			if (!Buffer.isBuffer(e)) return vr(e, r);
			var t = e.readUInt32LE(r);
			return t > 0 ? e.toString("utf8", r + 4, r + 4 + t - 1) : ""
		};
		gr = function Ag(e, r) {
			if (!Buffer.isBuffer(e)) return mr(e, r);
			var t = e.readUInt32LE(r);
			return t > 0 ? e.toString("utf8", r + 4, r + 4 + t - 1) : ""
		};
		br = function _g(e, r) {
			if (!Buffer.isBuffer(e)) return Cr(e, r);
			var t = 2 * e.readUInt32LE(r);
			return e.toString("utf16le", r + 4, r + 4 + t - 1)
		};
		Er = function Bg(e, r) {
			if (!Buffer.isBuffer(e)) return wr(e, r);
			var t = e.readUInt32LE(r);
			return e.toString("utf16le", r + 4, r + 4 + t)
		};
		kr = function Tg(e, r) {
			if (!Buffer.isBuffer(e)) return Sr(e, r);
			var t = e.readUInt32LE(r);
			return e.toString("utf8", r + 4, r + 4 + t)
		};
		ur = function xg(e, r, t) {
			return Buffer.isBuffer(e) ? e.toString("utf8", r, t) : dr(e, r, t)
		};
		sr = function(e) {
			return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0]) : fr(e)
		};
		B = function(e) {
			return Buffer.isBuffer(e[0]) ? Buffer.concat(e) : [].concat.apply([], e)
		};
		Ar = function yg(e, r) {
			if (Buffer.isBuffer(e)) return e.readDoubleLE(r);
			return _r(e, r)
		};
		Br = function Ig(e) {
			return Buffer.isBuffer(e) || Array.isArray(e)
		}
	}
	if (typeof cptable !== "undefined") {
		or = function(e, r, t) {
			return cptable.utils.decode(1200, e.slice(r, t)).replace(T, "")
		};
		ur = function(e, r, t) {
			return cptable.utils.decode(65001, e.slice(r, t))
		};
		pr = function(e, r) {
			var t = Ir(e, r);
			return t > 0 ? cptable.utils.decode(a, e.slice(r + 4, r + 4 + t - 1)) : ""
		};
		gr = function(e, r) {
			var a = Ir(e, r);
			return a > 0 ? cptable.utils.decode(t, e.slice(r + 4, r + 4 + a - 1)) : ""
		};
		br = function(e, r) {
			var t = 2 * Ir(e, r);
			return t > 0 ? cptable.utils.decode(1200, e.slice(r + 4, r + 4 + t - 1)) : ""
		};
		Er = function(e, r) {
			var t = Ir(e, r);
			return t > 0 ? cptable.utils.decode(1200, e.slice(r + 4, r + 4 + t)) : ""
		};
		kr = function(e, r) {
			var t = Ir(e, r);
			return t > 0 ? cptable.utils.decode(65001, e.slice(r + 4, r + 4 + t)) : ""
		}
	}
	var Tr = function(e, r) {
		return e[r]
	};
	var xr = function(e, r) {
		return e[r + 1] * (1 << 8) + e[r]
	};
	var yr = function(e, r) {
		var t = e[r + 1] * (1 << 8) + e[r];
		return t < 32768 ? t : (65535 - t + 1) * -1
	};
	var Ir = function(e, r) {
		return e[r + 3] * (1 << 24) + (e[r + 2] << 16) + (e[r + 1] << 8) + e[r]
	};
	var Rr = function(e, r) {
		return e[r + 3] << 24 | e[r + 2] << 16 | e[r + 1] << 8 | e[r]
	};
	var Or = function(e, r) {
		return e[r] << 24 | e[r + 1] << 16 | e[r + 2] << 8 | e[r + 3]
	};

	function Dr(e, r) {
		var a = "",
			n, i, s = [],
			f, o, l, c;
		switch (r) {
			case "dbcs":
				c = this.l;
				if (C && Buffer.isBuffer(this)) a = this.slice(this.l, this.l + 2 * e).toString("utf16le");
				else
					for (l = 0; l < e; ++l) {
						a += String.fromCharCode(xr(this, c));
						c += 2
					}
				e *= 2;
				break;
			case "utf8":
				a = ur(this, this.l, this.l + e);
				break;
			case "utf16le":
				e *= 2;
				a = or(this, this.l, this.l + e);
				break;
			case "wstr":
				if (typeof cptable !== "undefined") a = cptable.utils.decode(t, this.slice(this.l, this.l + 2 * e));
				else return Dr.call(this, e, "dbcs");
				e = 2 * e;
				break;
			case "lpstr-ansi":
				a = pr(this, this.l);
				e = 4 + Ir(this, this.l);
				break;
			case "lpstr-cp":
				a = gr(this, this.l);
				e = 4 + Ir(this, this.l);
				break;
			case "lpwstr":
				a = br(this, this.l);
				e = 4 + 2 * Ir(this, this.l);
				break;
			case "lpp4":
				e = 4 + Ir(this, this.l);
				a = Er(this, this.l);
				if (e & 2) e += 2;
				break;
			case "8lpp4":
				e = 4 + Ir(this, this.l);
				a = kr(this, this.l);
				if (e & 3) e += 4 - (e & 3);
				break;
			case "cstr":
				e = 0;
				a = "";
				while ((f = Tr(this, this.l + e++)) !== 0) s.push(v(f));
				a = s.join("");
				break;
			case "_wstr":
				e = 0;
				a = "";
				while ((f = xr(this, this.l + e)) !== 0) {
					s.push(v(f));
					e += 2
				}
				e += 2;
				a = s.join("");
				break;
			case "dbcs-cont":
				a = "";
				c = this.l;
				for (l = 0; l < e; ++l) {
					if (this.lens && this.lens.indexOf(c) !== -1) {
						f = Tr(this, c);
						this.l = c + 1;
						o = Dr.call(this, e - l, f ? "dbcs-cont" : "sbcs-cont");
						return s.join("") + o
					}
					s.push(v(xr(this, c)));
					c += 2
				}
				a = s.join("");
				e *= 2;
				break;
			case "cpstr":
				if (typeof cptable !== "undefined") {
					a = cptable.utils.decode(t, this.slice(this.l, this.l + e));
					break
				};
			case "sbcs-cont":
				a = "";
				c = this.l;
				for (l = 0; l != e; ++l) {
					if (this.lens && this.lens.indexOf(c) !== -1) {
						f = Tr(this, c);
						this.l = c + 1;
						o = Dr.call(this, e - l, f ? "dbcs-cont" : "sbcs-cont");
						return s.join("") + o
					}
					s.push(v(Tr(this, c)));
					c += 1
				}
				a = s.join("");
				break;
			default:
				switch (e) {
					case 1:
						n = Tr(this, this.l);
						this.l++;
						return n;
					case 2:
						n = (r === "i" ? yr : xr)(this, this.l);
						this.l += 2;
						return n;
					case 4:
						;
					case -4:
						if (r === "i" || (this[this.l + 3] & 128) === 0) {
							n = (e > 0 ? Rr : Or)(this, this.l);
							this.l += 4;
							return n
						} else {
							i = Ir(this, this.l);
							this.l += 4
						}
						return i;
					case 8:
						;
					case -8:
						if (r === "f") {
							if (e == 8) i = Ar(this, this.l);
							else i = Ar([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l +
								1], this[this.l + 0]], 0);
							this.l += 8;
							return i
						} else e = 8;
					case 16:
						a = cr(this, this.l, e);
						break;
				};
		}
		this.l += e;
		return a
	}
	var Fr = function(e, r, t) {
		e[t] = r & 255;
		e[t + 1] = r >>> 8 & 255;
		e[t + 2] = r >>> 16 & 255;
		e[t + 3] = r >>> 24 & 255
	};
	var Pr = function(e, r, t) {
		e[t] = r & 255;
		e[t + 1] = r >> 8 & 255;
		e[t + 2] = r >> 16 & 255;
		e[t + 3] = r >> 24 & 255
	};
	var Nr = function(e, r, t) {
		e[t] = r & 255;
		e[t + 1] = r >>> 8 & 255
	};

	function Lr(e, r, t) {
		var a = 0,
			n = 0;
		if (t === "dbcs") {
			for (n = 0; n != r.length; ++n) Nr(this, r.charCodeAt(n), this.l + 2 * n);
			a = 2 * r.length
		} else if (t === "sbcs") {
			r = r.replace(/[^\x00-\x7F]/g, "_");
			for (n = 0; n != r.length; ++n) this[this.l + n] = r.charCodeAt(n) & 255;
			a = r.length
		} else if (t === "hex") {
			for (; n < e; ++n) {
				this[this.l++] = parseInt(r.slice(2 * n, 2 * n + 2), 16) || 0
			}
			return this
		} else if (t === "utf16le") {
			var i = Math.min(this.l + e, this.length);
			for (n = 0; n < Math.min(r.length, e); ++n) {
				var s = r.charCodeAt(n);
				this[this.l++] = s & 255;
				this[this.l++] = s >> 8
			}
			while (this.l < i) this[this.l++] = 0;
			return this
		} else switch (e) {
			case 1:
				a = 1;
				this[this.l] = r & 255;
				break;
			case 2:
				a = 2;
				this[this.l] = r & 255;
				r >>>= 8;
				this[this.l + 1] = r & 255;
				break;
			case 3:
				a = 3;
				this[this.l] = r & 255;
				r >>>= 8;
				this[this.l + 1] = r & 255;
				r >>>= 8;
				this[this.l + 2] = r & 255;
				break;
			case 4:
				a = 4;
				Fr(this, r, this.l);
				break;
			case 8:
				a = 8;
				if (t === "f") {
					ir(this, r, this.l);
					break
				};
			case 16:
				break;
			case -4:
				a = 4;
				Pr(this, r, this.l);
				break;
		}
		this.l += a;
		return this
	}

	function Mr(e, r) {
		var t = cr(this, this.l, e.length >> 1);
		if (t !== e) throw new Error(r + "Expected " + e + " saw " + t);
		this.l += e.length >> 1
	}

	function Ur(e, r) {
		e.l = r;
		e._R = Dr;
		e.chk = Mr;
		e._W = Lr
	}

	function Hr(e, r) {
		e.l += r
	}

	function Wr(e) {
		var r = E(e);
		Ur(r, 0);
		return r
	}

	function Vr(e, r, t) {
		if (!e) return;
		var a, n, i;
		Ur(e, e.l || 0);
		var s = e.length,
			f = 0,
			o = 0;
		while (e.l < s) {
			f = e._R(1);
			if (f & 128) f = (f & 127) + ((e._R(1) & 127) << 7);
			var l = Wp[f] || Wp[65535];
			a = e._R(1);
			i = a & 127;
			for (n = 1; n < 4 && a & 128; ++n) i += ((a = e._R(1)) & 127) << 7 * n;
			o = e.l + i;
			var c = (l.f || Hr)(e, i, t);
			e.l = o;
			if (r(c, l.n, f)) return
		}
	}

	function zr() {
		var e = [],
			r = C ? 256 : 2048;
		var t = function o(e) {
			var r = Wr(e);
			Ur(r, 0);
			return r
		};
		var a = t(r);
		var n = function l() {
			if (!a) return;
			if (a.length > a.l) {
				a = a.slice(0, a.l);
				a.l = a.length
			}
			if (a.length > 0) e.push(a);
			a = null
		};
		var i = function c(e) {
			if (a && e < a.length - a.l) return a;
			n();
			return a = t(Math.max(e + 1, r))
		};
		var s = function h() {
			n();
			return sr([e])
		};
		var f = function u(e) {
			n();
			a = e;
			if (a.l == null) a.l = a.length;
			i(r)
		};
		return {
			next: i,
			push: f,
			end: s,
			_bufs: e
		}
	}

	function Xr(e, r, t, a) {
		var n = +Vp[r],
			i;
		if (isNaN(n)) return;
		if (!a) a = Wp[n].p || (t || []).length || 0;
		i = 1 + (n >= 128 ? 1 : 0) + 1;
		if (a >= 128) ++i;
		if (a >= 16384) ++i;
		if (a >= 2097152) ++i;
		var s = e.next(i);
		if (n <= 127) s._W(1, n);
		else {
			s._W(1, (n & 127) + 128);
			s._W(1, n >> 7)
		}
		for (var f = 0; f != 4; ++f) {
			if (a >= 128) {
				s._W(1, (a & 127) + 128);
				a >>= 7
			} else {
				s._W(1, a);
				break
			}
		}
		if (a > 0 && Br(t)) e.push(t)
	}

	function Gr(e, r, t) {
		var a = ne(e);
		if (r.s) {
			if (a.cRel) a.c += r.s.c;
			if (a.rRel) a.r += r.s.r
		} else {
			if (a.cRel) a.c += r.c;
			if (a.rRel) a.r += r.r
		}
		if (!t || t.biff < 12) {
			while (a.c >= 256) a.c -= 256;
			while (a.r >= 65536) a.r -= 65536
		}
		return a
	}

	function jr(e, r, t) {
		var a = ne(e);
		a.s = Gr(a.s, r.s, t);
		a.e = Gr(a.e, r.s, t);
		return a
	}

	function Kr(e, r) {
		if (e.cRel && e.c < 0) {
			e = ne(e);
			e.c += r > 8 ? 16384 : 256
		}
		if (e.rRel && e.r < 0) {
			e = ne(e);
			e.r += r > 8 ? 1048576 : r > 5 ? 65536 : 16384
		}
		var t = ft(e);
		if (e.cRel === 0) t = at(t);
		if (e.rRel === 0) t = qr(t);
		return t
	}

	function Yr(e, r) {
		if (e.s.r == 0 && !e.s.rRel) {
			if (e.e.r == (r.biff >= 12 ? 1048575 : r.biff >= 8 ? 65536 : 16384) && !e.e.rRel) {
				return (e.s.cRel ? "" : "$") + tt(e.s.c) + ":" + (e.e.cRel ? "" : "$") + tt(e.e.c)
			}
		}
		if (e.s.c == 0 && !e.s.cRel) {
			if (e.e.c == (r.biff >= 12 ? 65535 : 255) && !e.e.cRel) {
				return (e.s.rRel ? "" : "$") + Jr(e.s.r) + ":" + (e.e.rRel ? "" : "$") + Jr(e.e.r)
			}
		}
		return Kr(e.s, r.biff) + ":" + Kr(e.e, r.biff)
	}
	var $r = {};
	var Zr = function(e, r) {
		var t;
		if (typeof r !== "undefined") t = r;
		else if (typeof require !== "undefined") {
			try {
				t = undefined
			} catch (a) {
				t = null
			}
		}
		e.rc4 = function(e, r) {
			var t = new Array(256);
			var a = 0,
				n = 0,
				i = 0,
				s = 0;
			for (n = 0; n != 256; ++n) t[n] = n;
			for (n = 0; n != 256; ++n) {
				i = i + t[n] + e[n % e.length].charCodeAt(0) & 255;
				s = t[n];
				t[n] = t[i];
				t[i] = s
			}
			n = i = 0;
			var f = Buffer(r.length);
			for (a = 0; a != r.length; ++a) {
				n = n + 1 & 255;
				i = (i + t[n]) % 256;
				s = t[n];
				t[n] = t[i];
				t[i] = s;
				f[a] = r[a] ^ t[t[n] + t[i] & 255]
			}
			return f
		};
		e.md5 = function(e) {
			if (!t) throw new Error("Unsupported crypto");
			return t.createHash("md5").update(e).digest("hex")
		}
	};
	Zr($r, typeof crypto !== "undefined" ? crypto : undefined);

	function Qr(e) {
		return parseInt(et(e), 10) - 1
	}

	function Jr(e) {
		return "" + (e + 1)
	}

	function qr(e) {
		return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2")
	}

	function et(e) {
		return e.replace(/\$(\d+)$/, "$1")
	}

	function rt(e) {
		var r = nt(e),
			t = 0,
			a = 0;
		for (; a !== r.length; ++a) t = 26 * t + r.charCodeAt(a) - 64;
		return t - 1
	}

	function tt(e) {
		var r = "";
		for (++e; e; e = Math.floor((e - 1) / 26)) r = String.fromCharCode((e - 1) % 26 + 65) + r;
		return r
	}

	function at(e) {
		return e.replace(/^([A-Z])/, "$$$1")
	}

	function nt(e) {
		return e.replace(/^\$([A-Z])/, "$1")
	}

	function it(e) {
		return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",")
	}

	function st(e) {
		var r = it(e);
		return {
			c: rt(r[0]),
			r: Qr(r[1])
		}
	}

	function ft(e) {
		return tt(e.c) + Jr(e.r)
	}

	function ot(e) {
		var r = e.split(":").map(st);
		return {
			s: r[0],
			e: r[r.length - 1]
		}
	}

	function lt(e, r) {
		if (typeof r === "undefined" || typeof r === "number") {
			return lt(e.s, e.e)
		}
		if (typeof e !== "string") e = ft(e);
		if (typeof r !== "string") r = ft(r);
		return e == r ? e : e + ":" + r
	}

	function ct(e) {
		var r = {
			s: {
				c: 0,
				r: 0
			},
			e: {
				c: 0,
				r: 0
			}
		};
		var t = 0,
			a = 0,
			n = 0;
		var i = e.length;
		for (t = 0; a < i; ++a) {
			if ((n = e.charCodeAt(a) - 64) < 1 || n > 26) break;
			t = 26 * t + n
		}
		r.s.c = --t;
		for (t = 0; a < i; ++a) {
			if ((n = e.charCodeAt(a) - 48) < 0 || n > 9) break;
			t = 10 * t + n
		}
		r.s.r = --t;
		if (a === i || e.charCodeAt(++a) === 58) {
			r.e.c = r.s.c;
			r.e.r = r.s.r;
			return r
		}
		for (t = 0; a != i; ++a) {
			if ((n = e.charCodeAt(a) - 64) < 1 || n > 26) break;
			t = 26 * t + n
		}
		r.e.c = --t;
		for (t = 0; a != i; ++a) {
			if ((n = e.charCodeAt(a) - 48) < 0 || n > 9) break;
			t = 10 * t + n
		}
		r.e.r = --t;
		return r
	}

	function ht(e, r) {
		var t = e.t == "d" && r instanceof Date;
		if (e.z != null) try {
			return e.w = y.format(e.z, t ? Q(r) : r)
		} catch (a) {}
		try {
			return e.w = y.format((e.XF || {}).numFmtId || (t ? 14 : 0), t ? Q(r) : r)
		} catch (a) {
			return "" + r
		}
	}

	function ut(e, r, t) {
		if (e == null || e.t == null || e.t == "z") return "";
		if (e.w !== undefined) return e.w;
		if (e.t == "d" && !e.z && t && t.dateNF) e.z = t.dateNF;
		if (r == undefined) return ht(e, e.v);
		return ht(e, r)
	}

	function dt(e, r) {
		var t = r && r.sheet ? r.sheet : "Sheet1";
		var a = {};
		a[t] = e;
		return {
			SheetNames: [t],
			Sheets: a
		}
	}

	function pt(e, r, t) {
		var a = t || {};
		var n = e ? Array.isArray(e) : a.dense;
		if (g != null && n == null) n = g;
		var i = e || (n ? [] : {});
		var s = 0,
			f = 0;
		if (i && a.origin != null) {
			if (typeof a.origin == "number") s = a.origin;
			else {
				var o = typeof a.origin == "string" ? st(a.origin) : a.origin;
				s = o.r;
				f = o.c
			}
		}
		var l = {
			s: {
				c: 1e7,
				r: 1e7
			},
			e: {
				c: 0,
				r: 0
			}
		};
		if (i["!ref"]) {
			var c = ct(i["!ref"]);
			l.s.c = c.s.c;
			l.s.r = c.s.r;
			l.e.c = Math.max(l.e.c, c.e.c);
			l.e.r = Math.max(l.e.r, c.e.r);
			if (s == -1) l.e.r = s = c.e.r + 1
		}
		for (var h = 0; h != r.length; ++h) {
			for (var u = 0; u != r[h].length; ++u) {
				if (typeof r[h][u] === "undefined") continue;
				var d = {
					v: r[h][u]
				};
				if (Array.isArray(d.v)) {
					d.f = r[h][u][1];
					d.v = d.v[0]
				}
				var p = s + h,
					v = f + u;
				if (l.s.r > p) l.s.r = p;
				if (l.s.c > v) l.s.c = v;
				if (l.e.r < p) l.e.r = p;
				if (l.e.c < v) l.e.c = v;
				if (d.v === null) {
					if (d.f) d.t = "n";
					else if (!a.cellStubs) continue;
					else d.t = "z"
				} else if (typeof d.v === "number") d.t = "n";
				else if (typeof d.v === "boolean") d.t = "b";
				else if (d.v instanceof Date) {
					d.z = a.dateNF || y._table[14];
					if (a.cellDates) {
						d.t = "d";
						d.w = y.format(d.z, Q(d.v))
					} else {
						d.t = "n";
						d.v = Q(d.v);
						d.w = y.format(d.z, d.v)
					}
				} else d.t = "s";
				if (n) {
					if (!i[p]) i[p] = [];
					i[p][v] = d
				} else {
					var m = ft({
						c: v,
						r: p
					});
					i[m] = d
				}
			}
		}
		if (l.s.c < 1e7) i["!ref"] = lt(l);
		return i
	}

	function vt(e, r) {
		return pt(null, e, r)
	}

	function gt(e, r) {
		if (!r) r = Wr(4);
		r._W(4, e);
		return r
	}

	function mt(e) {
		var r = e._R(4);
		return r === 0 ? "" : e._R(r, "dbcs")
	}

	function bt(e, r) {
		var t = false;
		if (r == null) {
			t = true;
			r = Wr(4 + 2 * e.length)
		}
		r._W(4, e.length);
		if (e.length > 0) r._W(0, e, "dbcs");
		return t ? r.slice(0, r.l) : r
	}

	function Ct(e) {
		return {
			ich: e._R(2),
			ifnt: e._R(2)
		}
	}

	function Et(e, r) {
		if (!r) r = Wr(4);
		r._W(2, e.ich || 0);
		r._W(2, e.ifnt || 0);
		return r
	}

	function wt(e, r) {
		var t = e.l;
		var a = e._R(1);
		var n = mt(e);
		var i = [];
		var s = {
			t: n,
			h: n
		};
		if ((a & 1) !== 0) {
			var f = e._R(4);
			for (var o = 0; o != f; ++o) i.push(Ct(e));
			s.r = i
		} else s.r = [{
			ich: 0,
			ifnt: 0
		}];
		e.l = t + r;
		return s
	}

	function kt(e, r) {
		var t = false;
		if (r == null) {
			t = true;
			r = Wr(15 + 4 * e.t.length)
		}
		r._W(1, 0);
		bt(e.t, r);
		return t ? r.slice(0, r.l) : r
	}
	var St = wt;

	function At(e, r) {
		var t = false;
		if (r == null) {
			t = true;
			r = Wr(23 + 4 * e.t.length)
		}
		r._W(1, 1);
		bt(e.t, r);
		r._W(4, 1);
		Et({
			ich: 0,
			ifnt: 0
		}, r);
		return t ? r.slice(0, r.l) : r
	}

	function _t(e) {
		var r = e._R(4);
		var t = e._R(2);
		t += e._R(1) << 16;
		e.l++;
		return {
			c: r,
			iStyleRef: t
		}
	}

	function Bt(e, r) {
		if (r == null) r = Wr(8);
		r._W(-4, e.c);
		r._W(3, e.iStyleRef || e.s);
		r._W(1, 0);
		return r
	}
	var Tt = mt;
	var xt = bt;

	function yt(e) {
		var r = e._R(4);
		return r === 0 || r === 4294967295 ? "" : e._R(r, "dbcs")
	}

	function It(e, r) {
		var t = false;
		if (r == null) {
			t = true;
			r = Wr(127)
		}
		r._W(4, e.length > 0 ? e.length : 4294967295);
		if (e.length > 0) r._W(0, e, "dbcs");
		return t ? r.slice(0, r.l) : r
	}
	var Rt = mt;
	var Ot = yt;
	var Dt = It;

	function Ft(e) {
		var r = e.slice(e.l, e.l + 4);
		var t = r[0] & 1,
			a = r[0] & 2;
		e.l += 4;
		r[0] &= 252;
		var n = a === 0 ? Ar([0, 0, 0, 0, r[0], r[1], r[2], r[3]], 0) : Rr(r, 0) >> 2;
		return t ? n / 100 : n
	}

	function Pt(e, r) {
		if (r == null) r = Wr(4);
		var t = 0,
			a = 0,
			n = e * 100;
		if (e == (e | 0) && e >= -(1 << 29) && e < 1 << 29) {
			a = 1
		} else if (n == (n | 0) && n >= -(1 << 29) && n < 1 << 29) {
			a = 1;
			t = 1
		}
		if (a) r._W(-4, ((t ? n : e) << 2) + (t + 2));
		else throw new Error("unsupported RkNumber " + e)
	}

	function Nt(e) {
		var r = {
			s: {},
			e: {}
		};
		r.s.r = e._R(4);
		r.e.r = e._R(4);
		r.s.c = e._R(4);
		r.e.c = e._R(4);
		return r
	}

	function Lt(e, r) {
		if (!r) r = Wr(16);
		r._W(4, e.s.r);
		r._W(4, e.e.r);
		r._W(4, e.s.c);
		r._W(4, e.e.c);
		return r
	}
	var Mt = Nt;
	var Ut = Lt;

	function Ht(e) {
		return e._R(8, "f")
	}

	function Wt(e, r) {
		return (r || Wr(8))._W(8, e, "f")
	}
	var Vt = {
		0: "#NULL!",
		7: "#DIV/0!",
		15: "#VALUE!",
		23: "#REF!",
		29: "#NAME?",
		36: "#NUM!",
		42: "#N/A",
		43: "#GETTING_DATA",
		255: "#WTF?"
	};
	var zt = j(Vt);

	function Xt(e) {
		var r = {};
		var t = e._R(1);
		var a = t >>> 1;
		var n = e._R(1);
		var i = e._R(2, "i");
		var s = e._R(1);
		var f = e._R(1);
		var o = e._R(1);
		e.l++;
		switch (a) {
			case 0:
				r.auto = 1;
				break;
			case 1:
				r.index = n;
				var l = ga[n];
				if (l) r.rgb = Ff(l);
				break;
			case 2:
				r.rgb = Ff([s, f, o]);
				break;
			case 3:
				r.theme = n;
				break;
		}
		if (i != 0) r.tint = i > 0 ? i / 32767 : i / 32768;
		return r
	}

	function Gt(e, r) {
		if (!r) r = Wr(8);
		if (!e || e.auto) {
			r._W(4, 0);
			r._W(4, 0);
			return r
		}
		if (e.index) {
			r._W(1, 2);
			r._W(1, e.index)
		} else if (e.theme) {
			r._W(1, 6);
			r._W(1, e.theme)
		} else {
			r._W(1, 5);
			r._W(1, 0)
		}
		var t = e.tint || 0;
		if (t > 0) t *= 32767;
		else if (t < 0) t *= 32768;
		r._W(2, t);
		if (!e.rgb) {
			r._W(2, 0);
			r._W(1, 0);
			r._W(1, 0)
		} else {
			var a = e.rgb || "FFFFFF";
			r._W(1, parseInt(a.slice(0, 2), 16));
			r._W(1, parseInt(a.slice(2, 4), 16));
			r._W(1, parseInt(a.slice(4, 6), 16));
			r._W(1, 255)
		}
		return r
	}

	function jt(e) {
		var r = e._R(1);
		e.l++;
		var t = {
			fItalic: r & 2,
			fStrikeout: r & 8,
			fOutline: r & 16,
			fShadow: r & 32,
			fCondense: r & 64,
			fExtend: r & 128
		};
		return t
	}

	function Kt(e, r) {
		if (!r) r = Wr(2);
		var t = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 :
			0);
		r._W(1, t);
		r._W(1, 0);
		return r
	}

	function Yt(e, r) {
		var t = {
			2: "BITMAP",
			3: "METAFILEPICT",
			8: "DIB",
			14: "ENHMETAFILE"
		};
		var a = e._R(4);
		switch (a) {
			case 0:
				return "";
			case 4294967295:
				;
			case 4294967294:
				return t[e._R(4)] || "";
		}
		if (a > 400) throw new Error("Unsupported Clipboard: " + a.toString(16));
		e.l -= 4;
		return e._R(0, r == 1 ? "lpstr" : "lpwstr")
	}

	function $t(e) {
		return Yt(e, 1)
	}

	function Zt(e) {
		return Yt(e, 2)
	}
	var Qt = 2;
	var Jt = 3;
	var qt = 11;
	var ea = 12;
	var ra = 19;
	var ta = 30;
	var aa = 64;
	var na = 65;
	var ia = 71;
	var sa = 4096;
	var fa = 80;
	var oa = 81;
	var la = [fa, oa];
	var ca = {
		1: {
			n: "CodePage",
			t: Qt
		},
		2: {
			n: "Category",
			t: fa
		},
		3: {
			n: "PresentationFormat",
			t: fa
		},
		4: {
			n: "ByteCount",
			t: Jt
		},
		5: {
			n: "LineCount",
			t: Jt
		},
		6: {
			n: "ParagraphCount",
			t: Jt
		},
		7: {
			n: "SlideCount",
			t: Jt
		},
		8: {
			n: "NoteCount",
			t: Jt
		},
		9: {
			n: "HiddenCount",
			t: Jt
		},
		10: {
			n: "MultimediaClipCount",
			t: Jt
		},
		11: {
			n: "Scale",
			t: qt
		},
		12: {
			n: "HeadingPair",
			t: sa | ea
		},
		13: {
			n: "DocParts",
			t: sa | ta
		},
		14: {
			n: "Manager",
			t: fa
		},
		15: {
			n: "Company",
			t: fa
		},
		16: {
			n: "LinksDirty",
			t: qt
		},
		17: {
			n: "CharacterCount",
			t: Jt
		},
		19: {
			n: "SharedDoc",
			t: qt
		},
		22: {
			n: "HLinksChanged",
			t: qt
		},
		23: {
			n: "AppVersion",
			t: Jt,
			p: "version"
		},
		24: {
			n: "DigSig",
			t: na
		},
		26: {
			n: "ContentType",
			t: fa
		},
		27: {
			n: "ContentStatus",
			t: fa
		},
		28: {
			n: "Language",
			t: fa
		},
		29: {
			n: "Version",
			t: fa
		},
		255: {}
	};
	var ha = {
		1: {
			n: "CodePage",
			t: Qt
		},
		2: {
			n: "Title",
			t: fa
		},
		3: {
			n: "Subject",
			t: fa
		},
		4: {
			n: "Author",
			t: fa
		},
		5: {
			n: "Keywords",
			t: fa
		},
		6: {
			n: "Comments",
			t: fa
		},
		7: {
			n: "Template",
			t: fa
		},
		8: {
			n: "LastAuthor",
			t: fa
		},
		9: {
			n: "RevNumber",
			t: fa
		},
		10: {
			n: "EditTime",
			t: aa
		},
		11: {
			n: "LastPrinted",
			t: aa
		},
		12: {
			n: "CreatedDate",
			t: aa
		},
		13: {
			n: "ModifiedDate",
			t: aa
		},
		14: {
			n: "PageCount",
			t: Jt
		},
		15: {
			n: "WordCount",
			t: Jt
		},
		16: {
			n: "CharCount",
			t: Jt
		},
		17: {
			n: "Thumbnail",
			t: ia
		},
		18: {
			n: "ApplicationName",
			t: fa
		},
		19: {
			n: "DocumentSecurity",
			t: Jt
		},
		255: {}
	};
	var ua = {
		2147483648: {
			n: "Locale",
			t: ra
		},
		2147483651: {
			n: "Behavior",
			t: ra
		},
		1919054434: {}
	};
	(function() {
		for (var e in ua)
			if (ua.hasOwnProperty(e)) ca[e] = ha[e] = ua[e]
	})();
	var da = {
		1: "US",
		2: "CA",
		3: "",
		7: "RU",
		20: "EG",
		30: "GR",
		31: "NL",
		32: "BE",
		33: "FR",
		34: "ES",
		36: "HU",
		39: "IT",
		41: "CH",
		43: "AT",
		44: "GB",
		45: "DK",
		46: "SE",
		47: "NO",
		48: "PL",
		49: "DE",
		52: "MX",
		55: "BR",
		61: "AU",
		64: "NZ",
		66: "TH",
		81: "JP",
		82: "KR",
		84: "VN",
		86: "CN",
		90: "TR",
		105: "JS",
		213: "DZ",
		216: "MA",
		218: "LY",
		351: "PT",
		354: "IS",
		358: "FI",
		420: "CZ",
		886: "TW",
		961: "LB",
		962: "JO",
		963: "SY",
		964: "IQ",
		965: "KW",
		966: "SA",
		971: "AE",
		972: "IL",
		974: "QA",
		981: "IR",
		65535: "US"
	};
	var pa = [null, "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid",
		"darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"
	];

	function va(e) {
		return e.map(function(e) {
			return [e >> 16 & 255, e >> 8 & 255, e & 255]
		})
	}
	var ga = va([0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535,
		8388608, 32768, 128, 8421376, 8388736, 32896, 12632256, 8421504, 10066431, 10040166, 16777164, 13434879, 6684774, 16744576, 26316,
		13421823, 128, 16711935, 16776960, 65535, 8388736, 8388608, 32896, 255, 52479, 13434879, 13434828, 16777113, 10079487, 16751052,
		13408767, 16764057, 3368703, 3394764, 10079232, 16763904, 16750848, 16737792, 6710937, 9868950, 13158, 3381606, 13056, 3355392,
		10040064, 10040166, 3355545, 3355443, 16777215, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	]);
	var ma = {
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
		"application/vnd.ms-excel.binIndexWs": "TODO",
		"application/vnd.ms-excel.intlmacrosheet": "TODO",
		"application/vnd.ms-excel.binIndexMs": "TODO",
		"application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
		"application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
		"application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
		"application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
		"application/vnd.ms-excel.pivotTable": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
		"application/vnd.ms-office.chartcolorstyle+xml": "TODO",
		"application/vnd.ms-office.chartstyle+xml": "TODO",
		"application/vnd.ms-excel.calcChain": "calcchains",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
		"application/vnd.ms-office.activeX": "TODO",
		"application/vnd.ms-office.activeX+xml": "TODO",
		"application/vnd.ms-excel.attachedToolbars": "TODO",
		"application/vnd.ms-excel.connections": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
		"application/vnd.ms-excel.externalLink": "links",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
		"application/vnd.ms-excel.sheetMetadata": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "TODO",
		"application/vnd.ms-excel.pivotCacheDefinition": "TODO",
		"application/vnd.ms-excel.pivotCacheRecords": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
		"application/vnd.ms-excel.queryTable": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
		"application/vnd.ms-excel.userNames": "TODO",
		"application/vnd.ms-excel.revisionHeaders": "TODO",
		"application/vnd.ms-excel.revisionLog": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
		"application/vnd.ms-excel.tableSingleCells": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
		"application/vnd.ms-excel.slicer": "TODO",
		"application/vnd.ms-excel.slicerCache": "TODO",
		"application/vnd.ms-excel.slicer+xml": "TODO",
		"application/vnd.ms-excel.slicerCache+xml": "TODO",
		"application/vnd.ms-excel.wsSortMap": "TODO",
		"application/vnd.ms-excel.table": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.theme+xml": "themes",
		"application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
		"application/vnd.ms-excel.Timeline+xml": "TODO",
		"application/vnd.ms-excel.TimelineCache+xml": "TODO",
		"application/vnd.ms-office.vbaProject": "vba",
		"application/vnd.ms-office.vbaProjectSignature": "vba",
		"application/vnd.ms-office.volatileDependencies": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
		"application/vnd.ms-excel.controlproperties+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.model+data": "TODO",
		"application/vnd.ms-excel.Survey+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
		"application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
		"application/vnd.openxmlformats-package.relationships+xml": "rels",
		"application/vnd.openxmlformats-officedocument.oleObject": "TODO",
		"image/png": "TODO",
		sheet: "js"
	};
	var ba = function() {
		var e = {
			workbooks: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
				xlsm: "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
				xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.main",
				xlam: "application/vnd.ms-excel.addin.macroEnabled.main+xml",
				xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"
			},
			strs: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
				xlsb: "application/vnd.ms-excel.sharedStrings"
			},
			comments: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",
				xlsb: "application/vnd.ms-excel.comments"
			},
			sheets: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
				xlsb: "application/vnd.ms-excel.worksheet"
			},
			charts: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
				xlsb: "application/vnd.ms-excel.chartsheet"
			},
			dialogs: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",
				xlsb: "application/vnd.ms-excel.dialogsheet"
			},
			macros: {
				xlsx: "application/vnd.ms-excel.macrosheet+xml",
				xlsb: "application/vnd.ms-excel.macrosheet"
			},
			styles: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
				xlsb: "application/vnd.ms-excel.styles"
			}
		};
		z(e).forEach(function(r) {
			["xlsm", "xlam"].forEach(function(t) {
				if (!e[r][t]) e[r][t] = e[r].xlsx
			})
		});
		z(e).forEach(function(r) {
			z(e[r]).forEach(function(t) {
				ma[e[r][t]] = r
			})
		});
		return e
	}();
	var Ca = K(ma);
	tr.CT = "http://schemas.openxmlformats.org/package/2006/content-types";

	function Ea() {
		return {
			workbooks: [],
			sheets: [],
			charts: [],
			dialogs: [],
			macros: [],
			rels: [],
			strs: [],
			comments: [],
			links: [],
			coreprops: [],
			extprops: [],
			custprops: [],
			themes: [],
			styles: [],
			calcchains: [],
			vba: [],
			drawings: [],
			TODO: [],
			xmlns: ""
		}
	}

	function wa(e) {
		var r = Ea();
		if (!e || !e.match) return r;
		var t = {};
		(e.match(we) || []).forEach(function(e) {
			var a = Ae(e);
			switch (a[0].replace(ke, "<")) {
				case "<?xml":
					break;
				case "<Types":
					r.xmlns = a["xmlns" + (a[0].match(/<(\w+):/) || ["", ""])[1]];
					break;
				case "<Default":
					t[a.Extension] = a.ContentType;
					break;
				case "<Override":
					if (r[ma[a.ContentType]] !== undefined) r[ma[a.ContentType]].push(a.PartName);
					break;
			}
		});
		if (r.xmlns !== tr.CT) throw new Error("Unknown Namespace: " + r.xmlns);
		r.calcchain = r.calcchains.length > 0 ? r.calcchains[0] : "";
		r.sst = r.strs.length > 0 ? r.strs[0] : "";
		r.style = r.styles.length > 0 ? r.styles[0] : "";
		r.defaults = t;
		delete r.calcchains;
		return r
	}
	var ka = qe("Types", null, {
		xmlns: tr.CT,
		"xmlns:xsd": tr.xsd,
		"xmlns:xsi": tr.xsi
	});
	var Sa = [
		["xml", "application/xml"],
		["bin", "application/vnd.ms-excel.sheet.binary.macroEnabled.main"],
		["vml", "application/vnd.openxmlformats-officedocument.vmlDrawing"],
		["bmp", "image/bmp"],
		["png", "image/png"],
		["gif", "image/gif"],
		["emf", "image/x-emf"],
		["wmf", "image/x-wmf"],
		["jpg", "image/jpeg"],
		["jpeg", "image/jpeg"],
		["tif", "image/tiff"],
		["tiff", "image/tiff"],
		["pdf", "application/pdf"],
		["rels", Ca.rels[0]]
	].map(function(e) {
		return qe("Default", null, {
			Extension: e[0],
			ContentType: e[1]
		})
	});

	function Aa(e, r) {
		var t = [],
			a;
		t[t.length] = Ce;
		t[t.length] = ka;
		t = t.concat(Sa);
		var n = function(n) {
			if (e[n] && e[n].length > 0) {
				a = e[n][0];
				t[t.length] = qe("Override", null, {
					PartName: (a[0] == "/" ? "" : "/") + a,
					ContentType: ba[n][r.bookType || "xlsx"]
				})
			}
		};
		var i = function(a) {
			(e[a] || []).forEach(function(e) {
				t[t.length] = qe("Override", null, {
					PartName: (e[0] == "/" ? "" : "/") + e,
					ContentType: ba[a][r.bookType || "xlsx"]
				})
			})
		};
		var s = function(r) {
			(e[r] || []).forEach(function(e) {
				t[t.length] = qe("Override", null, {
					PartName: (e[0] == "/" ? "" : "/") + e,
					ContentType: Ca[r][0]
				})
			})
		};
		n("workbooks");
		i("sheets");
		i("charts");
		s("themes");
		["strs", "styles"].forEach(n);
		["coreprops", "extprops", "custprops"].forEach(s);
		s("vba");
		s("comments");
		s("drawings");
		if (t.length > 2) {
			t[t.length] = "</Types>";
			t[1] = t[1].replace("/>", ">")
		}
		return t.join("")
	}
	var _a = {
		WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
		SHEET: "http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
		HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
		VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
		VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
	};

	function Ba(e) {
		var r = e.lastIndexOf("/");
		return e.slice(0, r + 1) + "_rels/" + e.slice(r + 1) + ".rels"
	}

	function Ta(e, r) {
		if (!e) return e;
		if (r.charAt(0) !== "/") {
			r = "/" + r
		}
		var t = {};
		var a = {};
		(e.match(we) || []).forEach(function(e) {
			var n = Ae(e);
			if (n[0] === "<Relationship") {
				var i = {};
				i.Type = n.Type;
				i.Target = n.Target;
				i.Id = n.Id;
				i.TargetMode = n.TargetMode;
				var s = n.TargetMode === "External" ? n.Target : be(n.Target, r);
				t[s] = i;
				a[n.Id] = i
			}
		});
		t["!id"] = a;
		return t
	}
	tr.RELS = "http://schemas.openxmlformats.org/package/2006/relationships";
	var xa = qe("Relationships", null, {
		xmlns: tr.RELS
	});

	function ya(e) {
		var r = [Ce, xa];
		z(e["!id"]).forEach(function(t) {
			r[r.length] = qe("Relationship", null, e["!id"][t])
		});
		if (r.length > 2) {
			r[r.length] = "</Relationships>";
			r[1] = r[1].replace("/>", ">")
		}
		return r.join("")
	}

	function Ia(e, r, t, a, n) {
		if (!n) n = {};
		if (!e["!id"]) e["!id"] = {};
		if (r < 0)
			for (r = 1; e["!id"]["rId" + r]; ++r) {}
		n.Id = "rId" + r;
		n.Type = a;
		n.Target = t;
		if (n.Type == _a.HLINK) n.TargetMode = "External";
		if (e["!id"][n.Id]) throw new Error("Cannot rewrite rId " + r);
		e["!id"][n.Id] = n;
		e[("/" + n.Target).replace("//", "/")] = n;
		return r
	}
	var Ra = "application/vnd.oasis.opendocument.spreadsheet";

	function Oa(e, r) {
		var t = gp(e);
		var a;
		var n;
		while (a = mp.exec(t)) switch (a[3]) {
			case "manifest":
				break;
			case "file-entry":
				n = Ae(a[0], false);
				if (n.path == "/" && n.type !== Ra) throw new Error("This OpenDocument is not a spreadsheet");
				break;
			case "encryption-data":
				;
			case "algorithm":
				;
			case "start-key-generation":
				;
			case "key-derivation":
				throw new Error("Unsupported ODS Encryption");
			default:
				if (r && r.WTF) throw a;
		}
	}

	function Da(e) {
		var r = [Ce];
		r.push('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">\n');
		r.push(
			'  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>\n'
		);
		for (var t = 0; t < e.length; ++t) r.push('  <manifest:file-entry manifest:full-path="' + e[t][0] + '" manifest:media-type="' + e[t][1] +
			'"/>\n');
		r.push("</manifest:manifest>");
		return r.join("")
	}

	function Fa(e, r, t) {
		return ['  <rdf:Description rdf:about="' + e + '">\n', '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (t ||
			"odf") + "#" + r + '"/>\n', "  </rdf:Description>\n"].join("")
	}

	function Pa(e, r) {
		return ['  <rdf:Description rdf:about="' + e + '">\n',
			'    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + r + '"/>\n',
			"  </rdf:Description>\n"
		].join("")
	}

	function Na(e) {
		var r = [Ce];
		r.push('<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n');
		for (var t = 0; t != e.length; ++t) {
			r.push(Fa(e[t][0], e[t][1]));
			r.push(Pa("", e[t][0]))
		}
		r.push(Fa("", "Document", "pkg"));
		r.push("</rdf:RDF>");
		return r.join("")
	}
	var La = function() {
		var e =
			'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>Sheet' +
			"JS " + r.version + "</meta:generator></office:meta></office:document-meta>";
		return function t() {
			return e
		}
	}();
	var Ma = [
		["cp:category", "Category"],
		["cp:contentStatus", "ContentStatus"],
		["cp:keywords", "Keywords"],
		["cp:lastModifiedBy", "LastAuthor"],
		["cp:lastPrinted", "LastPrinted"],
		["cp:revision", "RevNumber"],
		["cp:version", "Version"],
		["dc:creator", "Author"],
		["dc:description", "Comments"],
		["dc:identifier", "Identifier"],
		["dc:language", "Language"],
		["dc:subject", "Subject"],
		["dc:title", "Title"],
		["dcterms:created", "CreatedDate", "date"],
		["dcterms:modified", "ModifiedDate", "date"]
	];
	tr.CORE_PROPS = "http://schemas.openxmlformats.org/package/2006/metadata/core-properties";
	_a.CORE_PROPS = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties";
	var Ua = function() {
		var e = new Array(Ma.length);
		for (var r = 0; r < Ma.length; ++r) {
			var t = Ma[r];
			var a = "(?:" + t[0].slice(0, t[0].indexOf(":")) + ":)" + t[0].slice(t[0].indexOf(":") + 1);
			e[r] = new RegExp("<" + a + "[^>]*>([\\s\\S]*?)</" + a + ">")
		}
		return e
	}();

	function Ha(e) {
		var r = {};
		e = Ue(e);
		for (var t = 0; t < Ma.length; ++t) {
			var a = Ma[t],
				n = e.match(Ua[t]);
			if (n != null && n.length > 0) r[a[1]] = n[1];
			if (a[2] === "date" && r[a[1]]) r[a[1]] = te(r[a[1]])
		}
		return r
	}
	var Wa = qe("cp:coreProperties", null, {
		"xmlns:cp": tr.CORE_PROPS,
		"xmlns:dc": tr.dc,
		"xmlns:dcterms": tr.dcterms,
		"xmlns:dcmitype": tr.dcmitype,
		"xmlns:xsi": tr.xsi
	});

	function Va(e, r, t, a, n) {
		if (n[e] != null || r == null || r === "") return;
		n[e] = r;
		a[a.length] = t ? qe(e, r, t) : Qe(e, r)
	}

	function za(e, r) {
		var t = r || {};
		var a = [Ce, Wa],
			n = {};
		if (!e && !t.Props) return a.join("");
		if (e) {
			if (e.CreatedDate != null) Va("dcterms:created", typeof e.CreatedDate === "string" ? e.CreatedDate : er(e.CreatedDate, t.WTF), {
				"xsi:type": "dcterms:W3CDTF"
			}, a, n);
			if (e.ModifiedDate != null) Va("dcterms:modified", typeof e.ModifiedDate === "string" ? e.ModifiedDate : er(e.ModifiedDate, t.WTF), {
				"xsi:type": "dcterms:W3CDTF"
			}, a, n)
		}
		for (var i = 0; i != Ma.length; ++i) {
			var s = Ma[i];
			var f = t.Props && t.Props[s[1]] != null ? t.Props[s[1]] : e ? e[s[1]] : null;
			if (f === true) f = "1";
			else if (f === false) f = "0";
			else if (typeof f == "number") f = String(f);
			if (f != null) Va(s[0], f, null, a, n)
		}
		if (a.length > 2) {
			a[a.length] = "</cp:coreProperties>";
			a[1] = a[1].replace("/>", ">")
		}
		return a.join("")
	}
	var Xa = [
		["Application", "Application", "string"],
		["AppVersion", "AppVersion", "string"],
		["Company", "Company", "string"],
		["DocSecurity", "DocSecurity", "string"],
		["Manager", "Manager", "string"],
		["HyperlinksChanged", "HyperlinksChanged", "bool"],
		["SharedDoc", "SharedDoc", "bool"],
		["LinksUpToDate", "LinksUpToDate", "bool"],
		["ScaleCrop", "ScaleCrop", "bool"],
		["HeadingPairs", "HeadingPairs", "raw"],
		["TitlesOfParts", "TitlesOfParts", "raw"]
	];
	tr.EXT_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties";
	_a.EXT_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties";

	function Ga(e, r, t) {
		var a = {};
		if (!r) r = {};
		e = Ue(e);
		Xa.forEach(function(t) {
			switch (t[2]) {
				case "string":
					r[t[1]] = (e.match(Xe(t[0])) || [])[1];
					break;
				case "bool":
					r[t[1]] = (e.match(Xe(t[0])) || [])[1] === "true";
					break;
				case "raw":
					var n = e.match(new RegExp("<" + t[0] + "[^>]*>([\\s\\S]*?)</" + t[0] + ">"));
					if (n && n.length > 0) a[t[1]] = n[1];
					break;
			}
		});
		if (a.HeadingPairs && a.TitlesOfParts) {
			var n = $e(a.HeadingPairs, t);
			var i = $e(a.TitlesOfParts, t).map(function(e) {
				return e.v
			});
			var s = 0,
				f = 0;
			if (i.length > 0)
				for (var o = 0; o !== n.length; o += 2) {
					f = +n[o + 1].v;
					switch (n[o].v) {
						case "Worksheets":
							;
						case "工作表":
							;
						case "Листы":
							;
						case "أوراق العمل":
							;
						case "ワークシート":
							;
						case "גליונות עבודה":
							;
						case "Arbeitsblätter":
							;
						case "Çalışma Sayfaları":
							;
						case "Feuilles de calcul":
							;
						case "Fogli di lavoro":
							;
						case "Folhas de cálculo":
							;
						case "Planilhas":
							;
						case "Regneark":
							;
						case "Werkbladen":
							r.Worksheets = f;
							r.SheetNames = i.slice(s, s + f);
							break;
						case "Named Ranges":
							;
						case "名前付き一覧":
							;
						case "Benannte Bereiche":
							;
						case "Navngivne områder":
							r.NamedRanges = f;
							r.DefinedNames = i.slice(s, s + f);
							break;
						case "Charts":
							;
						case "Diagramme":
							r.Chartsheets = f;
							r.ChartNames = i.slice(s, s + f);
							break;
					}
					s += f
				}
		}
		return r
	}
	var ja = qe("Properties", null, {
		xmlns: tr.EXT_PROPS,
		"xmlns:vt": tr.vt
	});

	function Ka(e) {
		var r = [],
			t = qe;
		if (!e) e = {};
		e.Application = "SheetJS";
		r[r.length] = Ce;
		r[r.length] = ja;
		Xa.forEach(function(a) {
			if (e[a[1]] === undefined) return;
			var n;
			switch (a[2]) {
				case "string":
					n = String(e[a[1]]);
					break;
				case "bool":
					n = e[a[1]] ? "true" : "false";
					break;
			}
			if (n !== undefined) r[r.length] = t(a[0], n)
		});
		r[r.length] = t("HeadingPairs", t("vt:vector", t("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + t("vt:variant", t("vt:i4", String(e.Worksheets))), {
			size: 2,
			baseType: "variant"
		}));
		r[r.length] = t("TitlesOfParts", t("vt:vector", e.SheetNames.map(function(e) {
			return "<vt:lpstr>" + Re(e) + "</vt:lpstr>"
		}).join(""), {
			size: e.Worksheets,
			baseType: "lpstr"
		}));
		if (r.length > 2) {
			r[r.length] = "</Properties>";
			r[1] = r[1].replace("/>", ">")
		}
		return r.join("")
	}
	tr.CUST_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties";
	_a.CUST_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties";
	var Ya = /<[^>]+>[^<]*/g;

	function $a(e, r) {
		var t = {},
			a = "";
		var n = e.match(Ya);
		if (n)
			for (var i = 0; i != n.length; ++i) {
				var s = n[i],
					f = Ae(s);
				switch (f[0]) {
					case "<?xml":
						break;
					case "<Properties":
						break;
					case "<property":
						a = f.name;
						break;
					case "</property>":
						a = null;
						break;
					default:
						if (s.indexOf("<vt:") === 0) {
							var o = s.split(">");
							var l = o[0].slice(4),
								c = o[1];
							switch (l) {
								case "lpstr":
									;
								case "bstr":
									;
								case "lpwstr":
									t[a] = xe(c);
									break;
								case "bool":
									t[a] = Me(c);
									break;
								case "i1":
									;
								case "i2":
									;
								case "i4":
									;
								case "i8":
									;
								case "int":
									;
								case "uint":
									t[a] = parseInt(c, 10);
									break;
								case "r4":
									;
								case "r8":
									;
								case "decimal":
									t[a] = parseFloat(c);
									break;
								case "filetime":
									;
								case "date":
									t[a] = te(c);
									break;
								case "cy":
									;
								case "error":
									t[a] = xe(c);
									break;
								default:
									if (l.slice(-1) == "/") break;
									if (r.WTF && typeof console !== "undefined") console.warn("Unexpected", s, l, o);
							}
						} else if (s.slice(0, 2) === "</") {} else if (r.WTF) throw new Error(s);
				}
			}
		return t
	}
	var Za = qe("Properties", null, {
		xmlns: tr.CUST_PROPS,
		"xmlns:vt": tr.vt
	});

	function Qa(e) {
		var r = [Ce, Za];
		if (!e) return r.join("");
		var t = 1;
		z(e).forEach(function a(n) {
			++t;
			r[r.length] = qe("property", rr(e[n]), {
				fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
				pid: t,
				name: n
			})
		});
		if (r.length > 2) {
			r[r.length] = "</Properties>";
			r[1] = r[1].replace("/>", ">")
		}
		return r.join("")
	}
	var Ja = {
		Title: "Title",
		Subject: "Subject",
		Author: "Author",
		Keywords: "Keywords",
		Comments: "Description",
		LastAuthor: "LastAuthor",
		RevNumber: "Revision",
		Application: "AppName",
		LastPrinted: "LastPrinted",
		CreatedDate: "Created",
		ModifiedDate: "LastSaved",
		Category: "Category",
		Manager: "Manager",
		Company: "Company",
		AppVersion: "Version",
		ContentStatus: "ContentStatus",
		Identifier: "Identifier",
		Language: "Language"
	};
	var qa = G(Ja);

	function en(e, r, t) {
		r = qa[r] || r;
		e[r] = t
	}

	function rn(e, r) {
		var t = [];
		z(Ja).map(function(e) {
			for (var r = 0; r < Ma.length; ++r)
				if (Ma[r][1] == e) return Ma[r];
			for (r = 0; r < Xa.length; ++r)
				if (Xa[r][1] == e) return Xa[r];
			throw e
		}).forEach(function(a) {
			if (e[a[1]] == null) return;
			var n = r && r.Props && r.Props[a[1]] != null ? r.Props[a[1]] : e[a[1]];
			switch (a[2]) {
				case "date":
					n = new Date(n).toISOString().replace(/\.\d*Z/, "Z");
					break;
			}
			if (typeof n == "number") n = String(n);
			else if (n === true || n === false) {
				n = n ? "1" : "0"
			} else if (n instanceof Date) n = new Date(n).toISOString().replace(/\.\d*Z/, "");
			t.push(Qe(Ja[a[1]] || a[1], n))
		});
		return qe("DocumentProperties", t.join(""), {
			xmlns: ar.o
		})
	}

	function tn(e, r) {
		var t = ["Worksheets", "SheetNames"];
		var a = "CustomDocumentProperties";
		var n = [];
		if (e) z(e).forEach(function(r) {
			if (!e.hasOwnProperty(r)) return;
			for (var a = 0; a < Ma.length; ++a)
				if (r == Ma[a][1]) return;
			for (a = 0; a < Xa.length; ++a)
				if (r == Xa[a][1]) return;
			for (a = 0; a < t.length; ++a)
				if (r == t[a]) return;
			var i = e[r];
			var s = "string";
			if (typeof i == "number") {
				s = "float";
				i = String(i)
			} else if (i === true || i === false) {
				s = "boolean";
				i = i ? "1" : "0"
			} else i = String(i);
			n.push(qe(Oe(r), i, {
				"dt:dt": s
			}))
		});
		if (r) z(r).forEach(function(t) {
			if (!r.hasOwnProperty(t)) return;
			if (e && e.hasOwnProperty(t)) return;
			var a = r[t];
			var i = "string";
			if (typeof a == "number") {
				i = "float";
				a = String(a)
			} else if (a === true || a === false) {
				i = "boolean";
				a = a ? "1" : "0"
			} else if (a instanceof Date) {
				i = "dateTime.tz";
				a = a.toISOString()
			} else a = String(a);
			n.push(qe(Oe(t), a, {
				"dt:dt": i
			}))
		});
		return "<" + a + ' xmlns="' + ar.o + '">' + n.join("") + "</" + a + ">"
	}

	function an(e) {
		var r = e._R(4),
			t = e._R(4);
		return new Date((t / 1e7 * Math.pow(2, 32) + r / 1e7 - 11644473600) * 1e3).toISOString().replace(/\.000/, "")
	}

	function nn(e, r, t) {
		var a = e.l;
		var n = e._R(0, "lpstr-cp");
		if (t)
			while (e.l - a & 3) ++e.l;
		return n
	}

	function sn(e, r, t) {
		var a = e._R(0, "lpwstr");
		if (t) e.l += 4 - (a.length + 1 & 3) & 3;
		return a
	}

	function fn(e, r, t) {
		if (r === 31) return sn(e);
		return nn(e, r, t)
	}

	function on(e, r, t) {
		return fn(e, r, t === false ? 0 : 4)
	}

	function ln(e, r) {
		if (!r) throw new Error("VtUnalignedString must have positive length");
		return fn(e, r, 0)
	}

	function cn(e) {
		var r = e._R(4);
		var t = [];
		for (var a = 0; a != r; ++a) t[a] = e._R(0, "lpstr-cp").replace(T, "");
		return t
	}

	function hn(e) {
		return cn(e)
	}

	function un(e) {
		var r = bn(e, oa);
		var t = bn(e, Jt);
		return [r, t]
	}

	function dn(e) {
		var r = e._R(4);
		var t = [];
		for (var a = 0; a != r / 2; ++a) t.push(un(e));
		return t
	}

	function pn(e) {
		return dn(e)
	}

	function vn(e, r) {
		var t = e._R(4);
		var a = {};
		for (var n = 0; n != t; ++n) {
			var i = e._R(4);
			var s = e._R(4);
			a[i] = e._R(s, r === 1200 ? "utf16le" : "utf8").replace(T, "").replace(x, "!")
		}
		if (e.l & 3) e.l = e.l >> 2 + 1 << 2;
		return a
	}

	function gn(e) {
		var r = e._R(4);
		var t = e.slice(e.l, e.l + r);
		e.l += r;
		if ((r & 3) > 0) e.l += 4 - (r & 3) & 3;
		return t
	}

	function mn(e) {
		var r = {};
		r.Size = e._R(4);
		e.l += r.Size + 3 - (r.Size - 1) % 4;
		return r
	}

	function bn(e, r, t) {
		var a = e._R(2),
			n, i = t || {};
		e.l += 2;
		if (r !== ea)
			if (a !== r && la.indexOf(r) === -1) throw new Error("Expected type " + r + " saw " + a);
		switch (r === ea ? a : r) {
			case 2:
				n = e._R(2, "i");
				if (!i.raw) e.l += 2;
				return n;
			case 3:
				n = e._R(4, "i");
				return n;
			case 11:
				return e._R(4) !== 0;
			case 19:
				n = e._R(4);
				return n;
			case 30:
				return nn(e, a, 4).replace(T, "");
			case 31:
				return sn(e);
			case 64:
				return an(e);
			case 65:
				return gn(e);
			case 71:
				return mn(e);
			case 80:
				return on(e, a, !i.raw).replace(T, "");
			case 81:
				return ln(e, a).replace(T, "");
			case 4108:
				return pn(e);
			case 4126:
				return hn(e);
			default:
				throw new Error("TypedPropertyValue unrecognized type " + r + " " + a);
		}
	}

	function Cn(e, r) {
		var t = e.l;
		var a = e._R(4);
		var n = e._R(4);
		var i = [],
			s = 0;
		var f = 0;
		var o = -1,
			c = {};
		for (s = 0; s != n; ++s) {
			var h = e._R(4);
			var u = e._R(4);
			i[s] = [h, u + t]
		}
		i.sort(function(e, r) {
			return e[1] - r[1]
		});
		var d = {};
		for (s = 0; s != n; ++s) {
			if (e.l !== i[s][1]) {
				var p = true;
				if (s > 0 && r) switch (r[i[s - 1][0]].t) {
					case 2:
						if (e.l + 2 === i[s][1]) {
							e.l += 2;
							p = false
						}
						break;
					case 80:
						if (e.l <= i[s][1]) {
							e.l = i[s][1];
							p = false
						}
						break;
					case 4108:
						if (e.l <= i[s][1]) {
							e.l = i[s][1];
							p = false
						}
						break;
				}
				if ((!r || s == 0) && e.l <= i[s][1]) {
					p = false;
					e.l = i[s][1]
				}
				if (p) throw new Error("Read Error: Expected address " + i[s][1] + " at " + e.l + " :" + s)
			}
			if (r) {
				var v = r[i[s][0]];
				d[v.n] = bn(e, v.t, {
					raw: true
				});
				if (v.p === "version") d[v.n] = String(d[v.n] >> 16) + "." + String(d[v.n] & 65535);
				if (v.n == "CodePage") switch (d[v.n]) {
					case 0:
						d[v.n] = 1252;
					case 874:
						;
					case 932:
						;
					case 936:
						;
					case 949:
						;
					case 950:
						;
					case 1250:
						;
					case 1251:
						;
					case 1253:
						;
					case 1254:
						;
					case 1255:
						;
					case 1256:
						;
					case 1257:
						;
					case 1258:
						;
					case 1e4:
						;
					case 1200:
						;
					case 1201:
						;
					case 1252:
						;
					case 65e3:
						;
					case -536:
						;
					case 65001:
						;
					case -535:
						l(f = d[v.n] >>> 0 & 65535);
						break;
					default:
						throw new Error("Unsupported CodePage: " + d[v.n]);
				}
			} else {
				if (i[s][0] === 1) {
					f = d.CodePage = bn(e, Qt);
					l(f);
					if (o !== -1) {
						var g = e.l;
						e.l = i[o][1];
						c = vn(e, f);
						e.l = g
					}
				} else if (i[s][0] === 0) {
					if (f === 0) {
						o = s;
						e.l = i[s + 1][1];
						continue
					}
					c = vn(e, f)
				} else {
					var m = c[i[s][0]];
					var b;
					switch (e[e.l]) {
						case 65:
							e.l += 4;
							b = gn(e);
							break;
						case 30:
							e.l += 4;
							b = on(e, e[e.l - 4]);
							break;
						case 31:
							e.l += 4;
							b = on(e, e[e.l - 4]);
							break;
						case 3:
							e.l += 4;
							b = e._R(4, "i");
							break;
						case 19:
							e.l += 4;
							b = e._R(4);
							break;
						case 5:
							e.l += 4;
							b = e._R(8, "f");
							break;
						case 11:
							e.l += 4;
							b = An(e, 4);
							break;
						case 64:
							e.l += 4;
							b = te(an(e));
							break;
						default:
							throw new Error("unparsed value: " + e[e.l]);
					}
					d[m] = b
				}
			}
		}
		e.l = t + a;
		return d
	}

	function En(e, r, t) {
		var a = e.content;
		if (!a) return {};
		Ur(a, 0);
		var n, i, s, f, o = 0;
		a.chk("feff", "Byte Order: ");
		a._R(2);
		var l = a._R(4);
		var c = a._R(16);
		if (c !== L.utils.consts.HEADER_CLSID && c !== t) throw new Error("Bad PropertySet CLSID " + c);
		n = a._R(4);
		if (n !== 1 && n !== 2) throw new Error("Unrecognized #Sets: " + n);
		i = a._R(16);
		f = a._R(4);
		if (n === 1 && f !== a.l) throw new Error("Length mismatch: " + f + " !== " + a.l);
		else if (n === 2) {
			s = a._R(16);
			o = a._R(4)
		}
		var h = Cn(a, r);
		var u = {
			SystemIdentifier: l
		};
		for (var d in h) u[d] = h[d];
		u.FMTID = i;
		if (n === 1) return u;
		if (o - a.l == 2) a.l += 2;
		if (a.l !== o) throw new Error("Length mismatch 2: " + a.l + " !== " + o);
		var p;
		try {
			p = Cn(a, null)
		} catch (v) {}
		for (d in p) u[d] = p[d];
		u.FMTID = [i, s];
		return u
	}

	function wn(e, r) {
		e._R(r);
		return null
	}

	function kn(e, r) {
		if (!r) r = Wr(e);
		for (var t = 0; t < e; ++t) r._W(1, 0);
		return r
	}

	function Sn(e, r, t) {
		var a = [],
			n = e.l + r;
		while (e.l < n) a.push(t(e, n - e.l));
		if (n !== e.l) throw new Error("Slurp error");
		return a
	}

	function An(e, r) {
		return e._R(r) === 1
	}

	function _n(e, r) {
		if (!r) r = Wr(2);
		r._W(2, +!!e);
		return r
	}

	function Bn(e) {
		return e._R(2, "u")
	}

	function Tn(e, r) {
		if (!r) r = Wr(2);
		r._W(2, e);
		return r
	}

	function xn(e, r) {
		return Sn(e, r, Bn)
	}

	function yn(e) {
		var r = e._R(1),
			t = e._R(1);
		return t === 1 ? r : r === 1
	}

	function In(e, r, t) {
		if (!t) t = Wr(2);
		t._W(1, +e);
		t._W(1, r == "e" ? 1 : 0);
		return t
	}

	function Rn(e, r, a) {
		var n = e._R(a && a.biff >= 12 ? 2 : 1);
		var i = "sbcs-cont";
		var s = t;
		if (a && a.biff >= 8) t = 1200;
		if (!a || a.biff == 8) {
			var f = e._R(1);
			if (f) {
				i = "dbcs-cont"
			}
		} else if (a.biff == 12) {
			i = "wstr"
		}
		if (a.biff >= 2 && a.biff <= 5) i = "cpstr";
		var o = n ? e._R(n, i) : "";
		t = s;
		return o
	}

	function On(e) {
		var r = t;
		t = 1200;
		var a = e._R(2),
			n = e._R(1);
		var i = n & 4,
			s = n & 8;
		var f = 1 + (n & 1);
		var o = 0,
			l;
		var c = {};
		if (s) o = e._R(2);
		if (i) l = e._R(4);
		var h = f == 2 ? "dbcs-cont" : "sbcs-cont";
		var u = a === 0 ? "" : e._R(a, h);
		if (s) e.l += 4 * o;
		if (i) e.l += l;
		c.t = u;
		if (!s) {
			c.raw = "<t>" + c.t + "</t>";
			c.r = c.t
		}
		t = r;
		return c
	}

	function Dn(e, r, t) {
		var a;
		if (t) {
			if (t.biff >= 2 && t.biff <= 5) return e._R(r, "cpstr");
			if (t.biff >= 12) return e._R(r, "dbcs-cont")
		}
		var n = e._R(1);
		if (n === 0) {
			a = e._R(r, "sbcs-cont")
		} else {
			a = e._R(r, "dbcs-cont")
		}
		return a
	}

	function Fn(e, r, t) {
		var a = e._R(t && t.biff == 2 ? 1 : 2);
		if (a === 0) {
			e.l++;
			return ""
		}
		return Dn(e, a, t)
	}

	function Pn(e, r, t) {
		if (t.biff > 5) return Fn(e, r, t);
		var a = e._R(1);
		if (a === 0) {
			e.l++;
			return ""
		}
		return e._R(a, t.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont")
	}

	function Nn(e, r, t) {
		if (!t) t = Wr(3 + 2 * e.length);
		t._W(2, e.length);
		t._W(1, 1);
		t._W(31, e, "utf16le");
		return t
	}

	function Ln(e) {
		var r = e._R(1);
		e.l++;
		var t = e._R(2);
		e.l += 2;
		return [r, t]
	}

	function Mn(e) {
		var r = e._R(4),
			t = e.l;
		var a = false;
		if (r > 24) {
			e.l += r - 24;
			if (e._R(16) === "795881f43b1d7f48af2c825dc4852763") a = true;
			e.l = t
		}
		var n = e._R((a ? r - 24 : r) >> 1, "utf16le").replace(T, "");
		if (a) e.l += 24;
		return n
	}

	function Un(e) {
		e.l += 2;
		var r = e._R(0, "lpstr-ansi");
		e.l += 2;
		if (e._R(2) != 57005) throw new Error("Bad FileMoniker");
		var t = e._R(4);
		if (t === 0) return r.replace(/\\/g, "/");
		var a = e._R(4);
		if (e._R(2) != 3) throw new Error("Bad FileMoniker");
		var n = e._R(a >> 1, "utf16le").replace(T, "");
		return n
	}

	function Hn(e, r) {
		var t = e._R(16);
		r -= 16;
		switch (t) {
			case "e0c9ea79f9bace118c8200aa004ba90b":
				return Mn(e, r);
			case "0303000000000000c000000000000046":
				return Un(e, r);
			default:
				throw new Error("Unsupported Moniker " + t);
		}
	}

	function Wn(e) {
		var r = e._R(4);
		var t = r > 0 ? e._R(r, "utf16le").replace(T, "") : "";
		return t
	}

	function Vn(e, r) {
		var t = e.l + r;
		var a = e._R(4);
		if (a !== 2) throw new Error("Unrecognized streamVersion: " + a);
		var n = e._R(2);
		e.l += 2;
		var i, s, f, o, l = "",
			c, h;
		if (n & 16) i = Wn(e, t - e.l);
		if (n & 128) s = Wn(e, t - e.l);
		if ((n & 257) === 257) f = Wn(e, t - e.l);
		if ((n & 257) === 1) o = Hn(e, t - e.l);
		if (n & 8) l = Wn(e, t - e.l);
		if (n & 32) c = e._R(16);
		if (n & 64) h = an(e);
		e.l = t;
		var u = s || f || o || "";
		if (u && l) u += "#" + l;
		if (!u) u = "#" + l;
		var d = {
			Target: u
		};
		if (c) d.guid = c;
		if (h) d.time = h;
		if (i) d.Tooltip = i;
		return d
	}

	function zn(e) {
		var r = Wr(512),
			t = 0;
		var a = e.Target;
		var n = a.indexOf("#") > -1 ? 31 : 23;
		switch (a.charAt(0)) {
			case "#":
				n = 28;
				break;
			case ".":
				n &= ~2;
				break;
		}
		r._W(4, 2);
		r._W(4, n);
		var i = [8, 6815827, 6619237, 4849780, 83];
		for (t = 0; t < i.length; ++t) r._W(4, i[t]);
		if (n == 28) {
			a = a.slice(1);
			r._W(4, a.length + 1);
			for (t = 0; t < a.length; ++t) r._W(2, a.charCodeAt(t));
			r._W(2, 0)
		} else if (n & 2) {
			i = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" ");
			for (t = 0; t < i.length; ++t) r._W(1, parseInt(i[t], 16));
			r._W(4, 2 * (a.length + 1));
			for (t = 0; t < a.length; ++t) r._W(2, a.charCodeAt(t));
			r._W(2, 0)
		} else {
			i = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" ");
			for (t = 0; t < i.length; ++t) r._W(1, parseInt(i[t], 16));
			var s = 0;
			while (a.slice(s * 3, s * 3 + 3) == "../" || a.slice(s * 3, s * 3 + 3) == "..\\") ++s;
			r._W(2, s);
			r._W(4, a.length + 1);
			for (t = 0; t < a.length; ++t) r._W(1, a.charCodeAt(t) & 255);
			r._W(1, 0);
			r._W(2, 65535);
			r._W(2, 57005);
			for (t = 0; t < 6; ++t) r._W(4, 0)
		}
		return r.slice(0, r.l)
	}

	function Xn(e) {
		var r = e._R(1),
			t = e._R(1),
			a = e._R(1),
			n = e._R(1);
		return [r, t, a, n]
	}

	function Gn(e, r) {
		var t = Xn(e, r);
		t[3] = 0;
		return t
	}

	function jn(e) {
		var r = e._R(2);
		var t = e._R(2);
		var a = e._R(2);
		return {
			r: r,
			c: t,
			ixfe: a
		}
	}

	function Kn(e, r, t, a) {
		if (!a) a = Wr(6);
		a._W(2, e);
		a._W(2, r);
		a._W(2, t || 0);
		return a
	}

	function Yn(e) {
		var r = e._R(2);
		var t = e._R(2);
		e.l += 8;
		return {
			type: r,
			flags: t
		}
	}

	function $n(e, r, t) {
		return r === 0 ? "" : Pn(e, r, t)
	}

	function Zn(e, r, t) {
		var a = t.biff > 8 ? 4 : 2;
		var n = e._R(a),
			i = e._R(a, "i"),
			s = e._R(a, "i");
		return [n, i, s]
	}

	function Qn(e) {
		var r = e._R(2);
		var t = Ft(e);
		return [r, t]
	}

	function Jn(e, r, t) {
		e.l += 4;
		r -= 4;
		var a = e.l + r;
		var n = Rn(e, r, t);
		var i = e._R(2);
		a -= e.l;
		if (i !== a) throw new Error("Malformed AddinUdf: padding = " + a + " != " + i);
		e.l += i;
		return n
	}

	function qn(e) {
		var r = e._R(2);
		var t = e._R(2);
		var a = e._R(2);
		var n = e._R(2);
		return {
			s: {
				c: a,
				r: r
			},
			e: {
				c: n,
				r: t
			}
		}
	}

	function ei(e, r) {
		if (!r) r = Wr(8);
		r._W(2, e.s.r);
		r._W(2, e.e.r);
		r._W(2, e.s.c);
		r._W(2, e.e.c);
		return r
	}

	function ri(e) {
		var r = e._R(2);
		var t = e._R(2);
		var a = e._R(1);
		var n = e._R(1);
		return {
			s: {
				c: a,
				r: r
			},
			e: {
				c: n,
				r: t
			}
		}
	}
	var ti = ri;

	function ai(e) {
		e.l += 4;
		var r = e._R(2);
		var t = e._R(2);
		var a = e._R(2);
		e.l += 12;
		return [t, r, a]
	}

	function ni(e) {
		var r = {};
		e.l += 4;
		e.l += 16;
		r.fSharedNote = e._R(2);
		e.l += 4;
		return r
	}

	function ii(e) {
		var r = {};
		e.l += 4;
		e.cf = e._R(2);
		return r
	}

	function si(e) {
		e.l += 2;
		e.l += e._R(2)
	}
	var fi = {
		0: si,
		4: si,
		5: si,
		6: si,
		7: ii,
		8: si,
		9: si,
		10: si,
		11: si,
		12: si,
		13: ni,
		14: si,
		15: si,
		16: si,
		17: si,
		18: si,
		19: si,
		20: si,
		21: ai
	};

	function oi(e, r) {
		var t = e.l + r;
		var a = [];
		while (e.l < t) {
			var n = e._R(2);
			e.l -= 2;
			try {
				a.push(fi[n](e, t - e.l))
			} catch (i) {
				e.l = t;
				return a
			}
		}
		if (e.l != t) e.l = t;
		return a
	}

	function li(e, r) {
		var t = {
			BIFFVer: 0,
			dt: 0
		};
		t.BIFFVer = e._R(2);
		r -= 2;
		if (r >= 2) {
			t.dt = e._R(2);
			e.l -= 2
		}
		switch (t.BIFFVer) {
			case 1536:
				;
			case 1280:
				;
			case 1024:
				;
			case 768:
				;
			case 512:
				;
			case 2:
				;
			case 7:
				break;
			default:
				if (r > 6) throw new Error("Unexpected BIFF Ver " + t.BIFFVer);
		}
		e._R(r);
		return t
	}

	function ci(e, r, t) {
		var a = 1536,
			n = 16;
		switch (t.bookType) {
			case "biff8":
				break;
			case "biff5":
				a = 1280;
				n = 8;
				break;
			case "biff4":
				a = 4;
				n = 6;
				break;
			case "biff3":
				a = 3;
				n = 6;
				break;
			case "biff2":
				a = 2;
				n = 4;
				break;
			case "xla":
				break;
			default:
				throw new Error("unsupported BIFF version");
		}
		var i = Wr(n);
		i._W(2, a);
		i._W(2, r);
		if (n > 4) i._W(2, 29282);
		if (n > 6) i._W(2, 1997);
		if (n > 8) {
			i._W(2, 49161);
			i._W(2, 1);
			i._W(2, 1798);
			i._W(2, 0)
		}
		return i
	}

	function hi(e, r) {
		if (r === 0) return 1200;
		if (e._R(2) !== 1200) {}
		return 1200
	}

	function ui(e, r, t) {
		if (t.enc) {
			e.l += r;
			return ""
		}
		var a = e.l;
		var n = Pn(e, 0, t);
		e._R(r + a - e.l);
		return n
	}

	function di(e, r) {
		var t = !r || r.biff == 8;
		var a = Wr(t ? 112 : 54);
		a._W(r.biff == 8 ? 2 : 1, 7);
		if (t) a._W(1, 0);
		a._W(4, 859007059);
		a._W(4, 5458548 | (t ? 0 : 536870912));
		while (a.l < a.length) a._W(1, t ? 0 : 32);
		return a
	}

	function pi(e, r, t) {
		var a = t && t.biff == 8 || r == 2 ? e._R(2) : (e.l += r, 0);
		return {
			fDialog: a & 16
		}
	}

	function vi(e, r, t) {
		var a = e._R(4);
		var n = e._R(1) & 3;
		var i = e._R(1);
		switch (i) {
			case 0:
				i = "Worksheet";
				break;
			case 1:
				i = "Macrosheet";
				break;
			case 2:
				i = "Chartsheet";
				break;
			case 6:
				i = "VBAModule";
				break;
		}
		var s = Rn(e, 0, t);
		if (s.length === 0) s = "Sheet1";
		return {
			pos: a,
			hs: n,
			dt: i,
			name: s
		}
	}

	function gi(e, r) {
		var t = !r || r.biff >= 8 ? 2 : 1;
		var a = Wr(8 + t * e.name.length);
		a._W(4, e.pos);
		a._W(1, e.hs || 0);
		a._W(1, e.dt);
		a._W(1, e.name.length);
		if (r.biff >= 8) a._W(1, 1);
		a._W(t * e.name.length, e.name, r.biff < 8 ? "sbcs" : "utf16le");
		var n = a.slice(0, a.l);
		n.l = a.l;
		return n
	}

	function mi(e, r) {
		var t = e.l + r;
		var a = e._R(4);
		var n = e._R(4);
		var i = [];
		for (var s = 0; s != n && e.l < t; ++s) {
			i.push(On(e))
		}
		i.Count = a;
		i.Unique = n;
		return i
	}

	function bi(e, r) {
		var t = {};
		t.dsst = e._R(2);
		e.l += r - 2;
		return t
	}

	function Ci(e) {
		var r = {};
		r.r = e._R(2);
		r.c = e._R(2);
		r.cnt = e._R(2) - r.c;
		var t = e._R(2);
		e.l += 4;
		var a = e._R(1);
		e.l += 3;
		if (a & 7) r.level = a & 7;
		if (a & 32) r.hidden = true;
		if (a & 64) r.hpt = t / 20;
		return r
	}

	function Ei(e) {
		var r = Yn(e);
		if (r.type != 2211) throw new Error("Invalid Future Record " + r.type);
		var t = e._R(4);
		return t !== 0
	}

	function wi(e) {
		e._R(2);
		return e._R(4)
	}

	function ki(e, r, t) {
		var a = 0;
		if (!(t && t.biff == 2)) {
			a = e._R(2)
		}
		var n = e._R(2);
		if (t && t.biff == 2) {
			a = 1 - (n >> 15);
			n &= 32767
		}
		var i = {
			Unsynced: a & 1,
			DyZero: (a & 2) >> 1,
			ExAsc: (a & 4) >> 2,
			ExDsc: (a & 8) >> 3
		};
		return [i, n]
	}

	function Si(e) {
		var r = e._R(2),
			t = e._R(2),
			a = e._R(2),
			n = e._R(2);
		var i = e._R(2),
			s = e._R(2),
			f = e._R(2);
		var o = e._R(2),
			l = e._R(2);
		return {
			Pos: [r, t],
			Dim: [a, n],
			Flags: i,
			CurTab: s,
			FirstTab: f,
			Selected: o,
			TabRatio: l
		}
	}

	function Ai() {
		var e = Wr(18);
		e._W(2, 0);
		e._W(2, 0);
		e._W(2, 29280);
		e._W(2, 17600);
		e._W(2, 56);
		e._W(2, 0);
		e._W(2, 0);
		e._W(2, 1);
		e._W(2, 500);
		return e
	}

	function _i(e, r, t) {
		if (t && t.biff >= 2 && t.biff < 8) return {};
		var a = e._R(2);
		return {
			RTL: a & 64
		}
	}

	function Bi(e) {
		var r = Wr(18),
			t = 1718;
		if (e && e.RTL) t |= 64;
		r._W(2, t);
		r._W(4, 0);
		r._W(4, 64);
		r._W(4, 0);
		r._W(4, 0);
		return r
	}

	function Ti(e, r, t) {
		var a = {
			dyHeight: e._R(2),
			fl: e._R(2)
		};
		switch (t && t.biff || 8) {
			case 2:
				break;
			case 3:
				;
			case 4:
				e.l += 2;
				break;
			default:
				e.l += 10;
				break;
		}
		a.name = Rn(e, 0, t);
		return a
	}

	function xi(e, r) {
		var t = e.name || "Arial";
		var a = r && r.biff == 5,
			n = a ? 15 + t.length : 16 + 2 * t.length;
		var i = Wr(n);
		i._W(2, (e.sz || 12) * 20);
		i._W(4, 0);
		i._W(2, 400);
		i._W(4, 0);
		i._W(2, 0);
		i._W(1, t.length);
		if (!a) i._W(1, 1);
		i._W((a ? 1 : 2) * t.length, t, a ? "sbcs" : "utf16le");
		return i
	}

	function yi(e) {
		var r = jn(e);
		r.isst = e._R(4);
		return r
	}

	function Ii(e, r, t) {
		var a = e.l + r;
		var n = jn(e, 6);
		if (t.biff == 2) e.l++;
		var i = Fn(e, a - e.l, t);
		n.val = i;
		return n
	}

	function Ri(e, r, t, a, n) {
		var i = !n || n.biff == 8;
		var s = Wr(6 + 2 + +i + (1 + i) * t.length);
		Kn(e, r, a, s);
		s._W(2, t.length);
		if (i) s._W(1, 1);
		s._W((1 + i) * t.length, t, i ? "utf16le" : "sbcs");
		return s
	}

	function Oi(e, r, t) {
		var a = e._R(2);
		var n = Pn(e, 0, t);
		return [a, n]
	}

	function Di(e, r, t, a) {
		var n = t && t.biff == 5;
		if (!a) a = Wr(n ? 3 + r.length : 5 + 2 * r.length);
		a._W(2, e);
		a._W(n ? 1 : 2, r.length);
		if (!n) a._W(1, 1);
		a._W((n ? 1 : 2) * r.length, r, n ? "sbcs" : "utf16le");
		var i = a.length > a.l ? a.slice(0, a.l) : a;
		if (i.l == null) i.l = i.length;
		return i
	}
	var Fi = Pn;

	function Pi(e, r, t) {
		var a = e.l + r;
		var n = t.biff == 8 || !t.biff ? 4 : 2;
		var i = e._R(n),
			s = e._R(n);
		var f = e._R(2),
			o = e._R(2);
		e.l = a;
		return {
			s: {
				r: i,
				c: f
			},
			e: {
				r: s,
				c: o
			}
		}
	}

	function Ni(e, r) {
		var t = r.biff == 8 || !r.biff ? 4 : 2;
		var a = Wr(2 * t + 6);
		a._W(t, e.s.r);
		a._W(t, e.e.r + 1);
		a._W(2, e.s.c);
		a._W(2, e.e.c + 1);
		a._W(2, 0);
		return a
	}

	function Li(e) {
		var r = e._R(2),
			t = e._R(2);
		var a = Qn(e);
		return {
			r: r,
			c: t,
			ixfe: a[0],
			rknum: a[1]
		}
	}

	function Mi(e, r) {
		var t = e.l + r - 2;
		var a = e._R(2),
			n = e._R(2);
		var i = [];
		while (e.l < t) i.push(Qn(e));
		if (e.l !== t) throw new Error("MulRK read error");
		var s = e._R(2);
		if (i.length != s - n + 1) throw new Error("MulRK length mismatch");
		return {
			r: a,
			c: n,
			C: s,
			rkrec: i
		}
	}

	function Ui(e, r) {
		var t = e.l + r - 2;
		var a = e._R(2),
			n = e._R(2);
		var i = [];
		while (e.l < t) i.push(e._R(2));
		if (e.l !== t) throw new Error("MulBlank read error");
		var s = e._R(2);
		if (i.length != s - n + 1) throw new Error("MulBlank length mismatch");
		return {
			r: a,
			c: n,
			C: s,
			ixfe: i
		}
	}

	function Hi(e, r, t, a) {
		var n = {};
		var i = e._R(4),
			s = e._R(4);
		var f = e._R(4),
			o = e._R(2);
		n.patternType = pa[f >> 26];
		if (!a.cellStyles) return n;
		n.alc = i & 7;
		n.fWrap = i >> 3 & 1;
		n.alcV = i >> 4 & 7;
		n.fJustLast = i >> 7 & 1;
		n.trot = i >> 8 & 255;
		n.cIndent = i >> 16 & 15;
		n.fShrinkToFit = i >> 20 & 1;
		n.iReadOrder = i >> 22 & 2;
		n.fAtrNum = i >> 26 & 1;
		n.fAtrFnt = i >> 27 & 1;
		n.fAtrAlc = i >> 28 & 1;
		n.fAtrBdr = i >> 29 & 1;
		n.fAtrPat = i >> 30 & 1;
		n.fAtrProt = i >> 31 & 1;
		n.dgLeft = s & 15;
		n.dgRight = s >> 4 & 15;
		n.dgTop = s >> 8 & 15;
		n.dgBottom = s >> 12 & 15;
		n.icvLeft = s >> 16 & 127;
		n.icvRight = s >> 23 & 127;
		n.grbitDiag = s >> 30 & 3;
		n.icvTop = f & 127;
		n.icvBottom = f >> 7 & 127;
		n.icvDiag = f >> 14 & 127;
		n.dgDiag = f >> 21 & 15;
		n.icvFore = o & 127;
		n.icvBack = o >> 7 & 127;
		n.fsxButton = o >> 14 & 1;
		return n
	}

	function Wi(e, r, t) {
		var a = {};
		a.ifnt = e._R(2);
		a.numFmtId = e._R(2);
		a.flags = e._R(2);
		a.fStyle = a.flags >> 2 & 1;
		r -= 6;
		a.data = Hi(e, r, a.fStyle, t);
		return a
	}

	function Vi(e, r, t, a) {
		var n = t && t.biff == 5;
		if (!a) a = Wr(n ? 16 : 20);
		a._W(2, 0);
		if (e.style) {
			a._W(2, e.numFmtId || 0);
			a._W(2, 65524)
		} else {
			a._W(2, e.numFmtId || 0);
			a._W(2, r << 4)
		}
		a._W(4, 0);
		a._W(4, 0);
		if (!n) a._W(4, 0);
		a._W(2, 0);
		return a
	}

	function zi(e) {
		e.l += 4;
		var r = [e._R(2), e._R(2)];
		if (r[0] !== 0) r[0]--;
		if (r[1] !== 0) r[1]--;
		if (r[0] > 7 || r[1] > 7) throw new Error("Bad Gutters: " + r.join("|"));
		return r
	}

	function Xi(e) {
		var r = Wr(8);
		r._W(4, 0);
		r._W(2, e[0] ? e[0] + 1 : 0);
		r._W(2, e[1] ? e[1] + 1 : 0);
		return r
	}

	function Gi(e, r, t) {
		var a = jn(e, 6);
		if (t.biff == 2) ++e.l;
		var n = yn(e, 2);
		a.val = n;
		a.t = n === true || n === false ? "b" : "e";
		return a
	}

	function ji(e, r, t, a, n, i) {
		var s = Wr(8);
		Kn(e, r, a, s);
		In(t, i, s);
		return s
	}

	function Ki(e) {
		var r = jn(e, 6);
		var t = Ht(e, 8);
		r.val = t;
		return r
	}

	function Yi(e, r, t, a) {
		var n = Wr(14);
		Kn(e, r, a, n);
		Wt(t, n);
		return n
	}
	var $i = $n;

	function Zi(e, r, t) {
		var a = e.l + r;
		var n = e._R(2);
		var i = e._R(2);
		t.sbcch = i;
		if (i == 1025 || i == 14849) return [i, n];
		if (i < 1 || i > 255) throw new Error("Unexpected SupBook type: " + i);
		var s = Dn(e, i);
		var f = [];
		while (a > e.l) f.push(Fn(e));
		return [i, n, s, f]
	}

	function Qi(e, r, t) {
		var a = e._R(2);
		var n;
		var i = {
			fBuiltIn: a & 1,
			fWantAdvise: a >>> 1 & 1,
			fWantPict: a >>> 2 & 1,
			fOle: a >>> 3 & 1,
			fOleLink: a >>> 4 & 1,
			cf: a >>> 5 & 1023,
			fIcon: a >>> 15 & 1
		};
		if (t.sbcch === 14849) n = Jn(e, r - 2, t);
		i.body = n || e._R(r - 2);
		if (typeof n === "string") i.Name = n;
		return i
	}
	var Ji = ["_xlnm.Consolidate_Area", "_xlnm.Auto_Open", "_xlnm.Auto_Close", "_xlnm.Extract", "_xlnm.Database", "_xlnm.Criteria",
		"_xlnm.Print_Area", "_xlnm.Print_Titles", "_xlnm.Recorder", "_xlnm.Data_Form", "_xlnm.Auto_Activate", "_xlnm.Auto_Deactivate",
		"_xlnm.Sheet_Title", "_xlnm._FilterDatabase"
	];

	function qi(e, r, t) {
		var a = e.l + r;
		var n = e._R(2);
		var i = e._R(1);
		var s = e._R(1);
		var f = e._R(t && t.biff == 2 ? 1 : 2);
		var o = 0;
		if (!t || t.biff >= 5) {
			if (t.biff != 5) e.l += 2;
			o = e._R(2);
			if (t.biff == 5) e.l += 2;
			e.l += 4
		}
		var l = Dn(e, s, t);
		if (n & 32) l = Ji[l.charCodeAt(0)];
		var c = a - e.l;
		if (t && t.biff == 2) --c;
		var h = a == e.l || f === 0 ? [] : oh(e, c, t, f);
		return {
			chKey: i,
			Name: l,
			itab: o,
			rgce: h
		}
	}

	function es(e, r, t) {
		if (t.biff < 8) return rs(e, r, t);
		var a = [],
			n = e.l + r,
			i = e._R(t.biff > 8 ? 4 : 2);
		while (i-- !== 0) a.push(Zn(e, t.biff > 8 ? 12 : 6, t));
		if (e.l != n) throw new Error("Bad ExternSheet: " + e.l + " != " + n);
		return a
	}

	function rs(e, r, t) {
		if (e[e.l + 1] == 3) e[e.l]++;
		var a = Rn(e, r, t);
		return a.charCodeAt(0) == 3 ? a.slice(1) : a
	}

	function ts(e, r, t) {
		if (t.biff < 8) {
			e.l += r;
			return
		}
		var a = e._R(2);
		var n = e._R(2);
		var i = Dn(e, a, t);
		var s = Dn(e, n, t);
		return [i, s]
	}

	function as(e, r, t) {
		var a = ri(e, 6);
		e.l++;
		var n = e._R(1);
		r -= 8;
		return [lh(e, r, t), n, a]
	}

	function ns(e, r, t) {
		var a = ti(e, 6);
		switch (t.biff) {
			case 2:
				e.l++;
				r -= 7;
				break;
			case 3:
				;
			case 4:
				e.l += 2;
				r -= 8;
				break;
			default:
				e.l += 6;
				r -= 12;
		}
		return [a, sh(e, r, t, a)]
	}

	function is(e) {
		var r = e._R(4) !== 0;
		var t = e._R(4) !== 0;
		var a = e._R(4);
		return [r, t, a]
	}

	function ss(e, r, t) {
		if (t.biff < 8) return;
		var a = e._R(2),
			n = e._R(2);
		var i = e._R(2),
			s = e._R(2);
		var f = Pn(e, 0, t);
		if (t.biff < 8) e._R(1);
		return [{
			r: a,
			c: n
		}, f, s, i]
	}

	function fs(e, r, t) {
		return ss(e, r, t)
	}

	function os(e, r) {
		var t = [];
		var a = e._R(2);
		while (a--) t.push(qn(e, r));
		return t
	}

	function ls(e) {
		var r = Wr(2 + e.length * 8);
		r._W(2, e.length);
		for (var t = 0; t < e.length; ++t) ei(e[t], r);
		return r
	}

	function cs(e, r, t) {
		if (t && t.biff < 8) return us(e, r, t);
		var a = ai(e, 22);
		var n = oi(e, r - 22, a[1]);
		return {
			cmo: a,
			ft: n
		}
	}
	var hs = [];
	hs[8] = function(e, r) {
		var t = e.l + r;
		e.l += 10;
		var a = e._R(2);
		e.l += 4;
		e.l += 2;
		e.l += 2;
		e.l += 2;
		e.l += 4;
		var n = e._R(1);
		e.l += n;
		e.l = t;
		return {
			fmt: a
		}
	};

	function us(e, r, t) {
		e.l += 4;
		var a = e._R(2);
		var n = e._R(2);
		var i = e._R(2);
		e.l += 2;
		e.l += 2;
		e.l += 2;
		e.l += 2;
		e.l += 2;
		e.l += 2;
		e.l += 2;
		e.l += 2;
		e.l += 2;
		e.l += 6;
		r -= 36;
		var s = [];
		s.push((hs[a] || Hr)(e, r, t));
		return {
			cmo: [n, a, i],
			ft: s
		}
	}

	function ds(e, r, t) {
		var a = e.l;
		var n = "";
		try {
			e.l += 4;
			var i = (t.lastobj || {
				cmo: [0, 0]
			}).cmo[1];
			var s;
			if ([0, 5, 7, 11, 12, 14].indexOf(i) == -1) e.l += 6;
			else s = Ln(e, 6, t);
			var f = e._R(2);
			e._R(2);
			Bn(e, 2);
			var o = e._R(2);
			e.l += o;
			for (var l = 1; l < e.lens.length - 1; ++l) {
				if (e.l - a != e.lens[l]) throw new Error("TxO: bad continue record");
				var c = e[e.l];
				var h = Dn(e, e.lens[l + 1] - e.lens[l] - 1);
				n += h;
				if (n.length >= (c ? f : 2 * f)) break
			}
			if (n.length !== f && n.length !== f * 2) {
				throw new Error("cchText: " + f + " != " + n.length)
			}
			e.l = a + r;
			return {
				t: n
			}
		} catch (u) {
			e.l = a + r;
			return {
				t: n
			}
		}
	}

	function ps(e, r) {
		var t = qn(e, 8);
		e.l += 16;
		var a = Vn(e, r - 24);
		return [t, a]
	}

	function vs(e) {
		var r = Wr(24);
		var t = st(e[0]);
		r._W(2, t.r);
		r._W(2, t.r);
		r._W(2, t.c);
		r._W(2, t.c);
		var a = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" ");
		for (var n = 0; n < 16; ++n) r._W(1, parseInt(a[n], 16));
		return B([r, zn(e[1])])
	}

	function gs(e, r) {
		e._R(2);
		var t = qn(e, 8);
		var a = e._R((r - 10) / 2, "dbcs-cont");
		a = a.replace(T, "");
		return [t, a]
	}

	function ms(e) {
		var r = e[1].Tooltip;
		var t = Wr(10 + 2 * (r.length + 1));
		t._W(2, 2048);
		var a = st(e[0]);
		t._W(2, a.r);
		t._W(2, a.r);
		t._W(2, a.c);
		t._W(2, a.c);
		for (var n = 0; n < r.length; ++n) t._W(2, r.charCodeAt(n));
		t._W(2, 0);
		return t
	}

	function bs(e) {
		var r = [0, 0],
			t;
		t = e._R(2);
		r[0] = da[t] || t;
		t = e._R(2);
		r[1] = da[t] || t;
		return r
	}

	function Cs(e) {
		if (!e) e = Wr(4);
		e._W(2, 1);
		e._W(2, 1);
		return e
	}

	function Es(e) {
		var r = e._R(2);
		var t = [];
		while (r-- > 0) t.push(Gn(e, 8));
		return t
	}

	function ws(e) {
		var r = e._R(2);
		var t = [];
		while (r-- > 0) t.push(Gn(e, 8));
		return t
	}

	function ks(e) {
		e.l += 2;
		var r = {
			cxfs: 0,
			crc: 0
		};
		r.cxfs = e._R(2);
		r.crc = e._R(4);
		return r
	}

	function Ss(e, r, t) {
		if (!t.cellStyles) return Hr(e, r);
		var a = t && t.biff >= 12 ? 4 : 2;
		var n = e._R(a);
		var i = e._R(a);
		var s = e._R(a);
		var f = e._R(a);
		var o = e._R(2);
		if (a == 2) e.l += 2;
		return {
			s: n,
			e: i,
			w: s,
			ixfe: f,
			flags: o
		}
	}

	function As(e, r) {
		var t = {};
		if (r < 32) return t;
		e.l += 16;
		t.header = Ht(e, 8);
		t.footer = Ht(e, 8);
		e.l += 2;
		return t
	}

	function _s(e, r, t) {
		var a = {
			area: false
		};
		if (t.biff != 5) {
			e.l += r;
			return a
		}
		var n = e._R(1);
		e.l += 3;
		if (n & 16) a.area = true;
		return a
	}

	function Bs(e) {
		var r = Wr(2 * e);
		for (var t = 0; t < e; ++t) r._W(2, t + 1);
		return r
	}
	var Ts = jn;
	var xs = xn;
	var ys = Fn;

	function Is(e) {
		var r = e._R(2);
		var t = e._R(2);
		var a = e._R(4);
		var n = {
			fmt: r,
			env: t,
			len: a,
			data: e.slice(e.l, e.l + a)
		};
		e.l += a;
		return n
	}

	function Rs(e, r, t) {
		var a = jn(e, 6);
		++e.l;
		var n = Pn(e, r - 7, t);
		a.t = "str";
		a.val = n;
		return a
	}

	function Os(e) {
		var r = jn(e, 6);
		++e.l;
		var t = Ht(e, 8);
		r.t = "n";
		r.val = t;
		return r
	}

	function Ds(e, r, t) {
		var a = Wr(15);
		jp(a, e, r);
		a._W(8, t, "f");
		return a
	}

	function Fs(e) {
		var r = jn(e, 6);
		++e.l;
		var t = e._R(2);
		r.t = "n";
		r.val = t;
		return r
	}

	function Ps(e, r, t) {
		var a = Wr(9);
		jp(a, e, r);
		a._W(2, t);
		return a
	}

	function Ns(e) {
		var r = e._R(1);
		if (r === 0) {
			e.l++;
			return ""
		}
		return e._R(r, "sbcs-cont")
	}

	function Ls(e, r) {
		e.l += 6;
		e.l += 2;
		e.l += 1;
		e.l += 3;
		e.l += 1;
		e.l += r - 13
	}

	function Ms(e, r, t) {
		var a = e.l + r;
		var n = jn(e, 6);
		var i = e._R(2);
		var s = Dn(e, i, t);
		e.l = a;
		n.t = "str";
		n.val = s;
		return n
	}
	var Us = function() {
		var e = {
			1: 437,
			2: 850,
			3: 1252,
			4: 1e4,
			100: 852,
			101: 866,
			102: 865,
			103: 861,
			104: 895,
			105: 620,
			106: 737,
			107: 857,
			120: 950,
			121: 949,
			122: 936,
			123: 932,
			124: 874,
			125: 1255,
			126: 1256,
			150: 10007,
			151: 10029,
			152: 10006,
			200: 1250,
			201: 1251,
			202: 1254,
			203: 1253,
			0: 20127,
			8: 865,
			9: 437,
			10: 850,
			11: 437,
			13: 437,
			14: 850,
			15: 437,
			16: 850,
			17: 437,
			18: 850,
			19: 932,
			20: 850,
			21: 437,
			22: 850,
			23: 865,
			24: 437,
			25: 437,
			26: 850,
			27: 437,
			28: 863,
			29: 850,
			31: 852,
			34: 852,
			35: 852,
			36: 860,
			37: 850,
			38: 866,
			55: 850,
			64: 852,
			77: 936,
			78: 949,
			79: 950,
			80: 874,
			87: 1252,
			88: 1252,
			89: 1252,
			255: 16969
		};

		function r(r, t) {
			var a = [];
			var n = E(1);
			switch (t.type) {
				case "base64":
					n = w(b.decode(r));
					break;
				case "binary":
					n = w(r);
					break;
				case "buffer":
					;
				case "array":
					n = r;
					break;
			}
			Ur(n, 0);
			var i = n._R(1);
			var s = false;
			var f = false,
				o = false;
			switch (i) {
				case 2:
					;
				case 3:
					break;
				case 48:
					f = true;
					s = true;
					break;
				case 49:
					f = true;
					break;
				case 131:
					s = true;
					break;
				case 139:
					s = true;
					break;
				case 140:
					s = true;
					o = true;
					break;
				case 245:
					s = true;
					break;
				default:
					throw new Error("DBF Unsupported Version: " + i.toString(16));
			}
			var l = 0,
				c = 0;
			if (i == 2) l = n._R(2);
			n.l += 3;
			if (i != 2) l = n._R(4);
			if (i != 2) c = n._R(2);
			var h = n._R(2);
			var u = 1252;
			if (i != 2) {
				n.l += 16;
				n._R(1);
				if (n[n.l] !== 0) u = e[n[n.l]];
				n.l += 1;
				n.l += 2
			}
			if (o) n.l += 36;
			var d = [],
				p = {};
			var v = c - 10 - (f ? 264 : 0),
				g = o ? 32 : 11;
			while (i == 2 ? n.l < n.length && n[n.l] != 13 : n.l < v) {
				p = {};
				p.name = cptable.utils.decode(u, n.slice(n.l, n.l + g)).replace(/[\u0000\r\n].*$/g, "");
				n.l += g;
				p.type = String.fromCharCode(n._R(1));
				if (i != 2 && !o) p.offset = n._R(4);
				p.len = n._R(1);
				if (i == 2) p.offset = n._R(2);
				p.dec = n._R(1);
				if (p.name.length) d.push(p);
				if (i != 2) n.l += o ? 13 : 14;
				switch (p.type) {
					case "B":
						if ((!f || p.len != 8) && t.WTF) console.log("Skipping " + p.name + ":" + p.type);
						break;
					case "G":
						;
					case "P":
						if (t.WTF) console.log("Skipping " + p.name + ":" + p.type);
						break;
					case "C":
						;
					case "D":
						;
					case "F":
						;
					case "I":
						;
					case "L":
						;
					case "M":
						;
					case "N":
						;
					case "O":
						;
					case "T":
						;
					case "Y":
						;
					case "0":
						;
					case "@":
						;
					case "+":
						break;
					default:
						throw new Error("Unknown Field Type: " + p.type);
				}
			}
			if (n[n.l] !== 13) n.l = c - 1;
			else if (i == 2) n.l = 521;
			if (i != 2) {
				if (n._R(1) !== 13) throw new Error("DBF Terminator not found " + n.l + " " + n[n.l]);
				n.l = c
			}
			var m = 0,
				C = 0;
			a[0] = [];
			for (C = 0; C != d.length; ++C) a[0][C] = d[C].name;
			while (l-- > 0) {
				if (n[n.l] === 42) {
					n.l += h;
					continue
				}++n.l;
				a[++m] = [];
				C = 0;
				for (C = 0; C != d.length; ++C) {
					var k = n.slice(n.l, n.l + d[C].len);
					n.l += d[C].len;
					Ur(k, 0);
					var S = cptable.utils.decode(u, k);
					switch (d[C].type) {
						case "C":
							a[m][C] = cptable.utils.decode(u, k);
							a[m][C] = a[m][C].trim();
							break;
						case "D":
							if (S.length === 8) a[m][C] = new Date(+S.slice(0, 4), +S.slice(4, 6) - 1, +S.slice(6, 8));
							else a[m][C] = S;
							break;
						case "F":
							a[m][C] = parseFloat(S.trim());
							break;
						case "+":
							;
						case "I":
							a[m][C] = o ? k._R(-4, "i") ^ 2147483648 : k._R(4, "i");
							break;
						case "L":
							switch (S.toUpperCase()) {
								case "Y":
									;
								case "T":
									a[m][C] = true;
									break;
								case "N":
									;
								case "F":
									a[m][C] = false;
									break;
								case " ":
									;
								case "?":
									a[m][C] = false;
									break;
								default:
									throw new Error("DBF Unrecognized L:|" + S + "|");
							}
							break;
						case "M":
							if (!s) throw new Error("DBF Unexpected MEMO for type " + i.toString(16));
							a[m][C] = "##MEMO##" + (o ? parseInt(S.trim(), 10) : k._R(4));
							break;
						case "N":
							a[m][C] = +S.replace(/\u0000/g, "").trim();
							break;
						case "@":
							a[m][C] = new Date(k._R(-8, "f") - 621356832e5);
							break;
						case "T":
							a[m][C] = new Date((k._R(4) - 2440588) * 864e5 + k._R(4));
							break;
						case "Y":
							a[m][C] = k._R(4, "i") / 1e4;
							break;
						case "O":
							a[m][C] = -k._R(-8, "f");
							break;
						case "B":
							if (f && d[C].len == 8) {
								a[m][C] = k._R(8, "f");
								break
							};
						case "G":
							;
						case "P":
							k.l += d[C].len;
							break;
						case "0":
							if (d[C].name === "_NullFlags") break;
						default:
							throw new Error("DBF Unsupported data type " + d[C].type);
					}
				}
			}
			if (i != 2)
				if (n.l < n.length && n[n.l++] != 26) throw new Error("DBF EOF Marker missing " + (n.l - 1) + " of " + n.length + " " + n[n.l - 1].toString(
					16));
			return a
		}

		function t(e, t) {
			var a = t || {};
			if (!a.dateNF) a.dateNF = "yyyymmdd";
			return vt(r(e, a), a)
		}

		function a(e, r) {
			try {
				return dt(t(e, r), r)
			} catch (a) {
				if (r && r.WTF) throw a
			}
			return {
				SheetNames: [],
				Sheets: {}
			}
		}
		var n = {
			B: 8,
			C: 250,
			L: 1,
			D: 8,
			"?": 0,
			"": 0
		};

		function i(e, r) {
			var t = r || {};
			if (t.type == "string") throw new Error("Cannot write DBF to JS string");
			var a = zr();
			var i = ng(e, {
				header: 1,
				raw: true,
				cellDates: true
			});
			var s = i[0],
				f = i.slice(1);
			var o = 0,
				l = 0,
				c = 0,
				h = 1;
			for (o = 0; o < s.length; ++o) {
				if (o == null) continue;
				++c;
				if (typeof s[o] !== "string") throw new Error("DBF Invalid column name");
				if (s.indexOf(s[o]) !== o)
					for (l = 0; l < 1024; ++l)
						if (s.indexOf(s[o] + "_" + l) == -1) {
							s[o] += "_" + l;
							break
						}
			}
			var u = ct(e["!ref"]);
			var d = [];
			for (o = 0; o <= u.e.c - u.s.c; ++o) {
				var p = [];
				for (l = 0; l < f.length; ++l) {
					if (f[l][o] != null) p.push(f[l][o])
				}
				if (p.length == 0 || s[o] == null) {
					d[o] = "?";
					continue
				}
				var v = "",
					g = "";
				for (l = 0; l < p.length; ++l) {
					switch (typeof p[l]) {
						case "number":
							g = "B";
							break;
						case "string":
							g = "C";
							break;
						case "boolean":
							g = "L";
							break;
						case "object":
							g = p[l] instanceof Date ? "D" : "C";
							break;
						default:
							g = "C";
					}
					v = v && v != g ? "C" : g;
					if (v == "C") break
				}
				h += n[v] || 0;
				d[o] = v
			}
			var m = a.next(32);
			m._W(4, 318902576);
			m._W(4, f.length);
			m._W(2, 296 + 32 * c);
			m._W(2, h);
			for (o = 0; o < 4; ++o) m._W(4, 0);
			m._W(4, 768);
			for (o = 0, l = 0; o < s.length; ++o) {
				if (s[o] == null) continue;
				var b = a.next(32);
				var C = (s[o].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
				b._W(1, C, "sbcs");
				b._W(1, d[o] == "?" ? "C" : d[o], "sbcs");
				b._W(4, l);
				b._W(1, n[d[o]] || 0);
				b._W(1, 0);
				b._W(1, 2);
				b._W(4, 0);
				b._W(1, 0);
				b._W(4, 0);
				b._W(4, 0);
				l += n[d[o]] || 0
			}
			var E = a.next(264);
			E._W(4, 13);
			for (o = 0; o < 65; ++o) E._W(4, 0);
			for (o = 0; o < f.length; ++o) {
				var w = a.next(h);
				w._W(1, 0);
				for (l = 0; l < s.length; ++l) {
					if (s[l] == null) continue;
					switch (d[l]) {
						case "L":
							w._W(1, f[o][l] == null ? 63 : f[o][l] ? 84 : 70);
							break;
						case "B":
							w._W(8, f[o][l] || 0, "f");
							break;
						case "D":
							if (!f[o][l]) w._W(8, "00000000", "sbcs");
							else {
								w._W(4, ("0000" + f[o][l].getFullYear()).slice(-4), "sbcs");
								w._W(2, ("00" + (f[o][l].getMonth() + 1)).slice(-2), "sbcs");
								w._W(2, ("00" + f[o][l].getDate()).slice(-2), "sbcs")
							}
							break;
						case "C":
							var k = String(f[o][l] || "");
							w._W(1, k, "sbcs");
							for (c = 0; c < 250 - k.length; ++c) w._W(1, 32);
							break;
					}
				}
			}
			a.next(1)._W(1, 26);
			return a.end()
		}
		return {
			to_workbook: a,
			to_sheet: t,
			from_sheet: i
		}
	}();
	var Hs = function() {
		function e(e, t) {
			switch (t.type) {
				case "base64":
					return r(b.decode(e), t);
				case "binary":
					return r(e, t);
				case "buffer":
					return r(e.toString("binary"), t);
				case "array":
					return r(ae(e), t);
			}
			throw new Error("Unrecognized type " + t.type)
		}

		function r(e, r) {
			var t = e.split(/[\n\r]+/),
				a = -1,
				n = -1,
				i = 0,
				s = 0,
				f = [];
			var o = [];
			var l = null;
			var c = {},
				h = [],
				u = [],
				d = [];
			var p = 0,
				v;
			for (; i !== t.length; ++i) {
				p = 0;
				var g = t[i].trim();
				var m = g.replace(/;;/g, "").split(";").map(function(e) {
					return e.replace(/\u0001/g, ";")
				});
				var b = m[0],
					C;
				if (g.length > 0) switch (b) {
					case "ID":
						break;
					case "E":
						break;
					case "B":
						break;
					case "O":
						break;
					case "P":
						if (m[1].charAt(0) == "P") o.push(g.slice(3).replace(/;;/g, ";"));
						break;
					case "C":
						for (s = 1; s < m.length; ++s) switch (m[s].charAt(0)) {
							case "X":
								n = parseInt(m[s].slice(1)) - 1;
								break;
							case "Y":
								a = parseInt(m[s].slice(1)) - 1;
								n = 0;
								for (v = f.length; v <= a; ++v) f[v] = [];
								break;
							case "K":
								C = m[s].slice(1);
								if (C.charAt(0) === '"') C = C.slice(1, C.length - 1);
								else if (C === "TRUE") C = true;
								else if (C === "FALSE") C = false;
								else if (!isNaN(se(C))) {
									C = se(C);
									if (l !== null && y.is_date(l)) C = J(C)
								} else if (!isNaN(fe(C).getDate())) {
									C = te(C)
								}
								f[a][n] = C;
								l = null;
								break;
							case "E":
								var E = Il(m[s].slice(1), {
									r: a,
									c: n
								});
								f[a][n] = [f[a][n], E];
								break;
							default:
								if (r && r.WTF) throw new Error("SYLK bad record " + g);
						}
						break;
					case "F":
						var w = 0;
						for (s = 1; s < m.length; ++s) switch (m[s].charAt(0)) {
							case "X":
								n = parseInt(m[s].slice(1)) - 1;
								++w;
								break;
							case "Y":
								a = parseInt(m[s].slice(1)) - 1;
								for (v = f.length; v <= a; ++v) f[v] = [];
								break;
							case "M":
								p = parseInt(m[s].slice(1)) / 20;
								break;
							case "F":
								break;
							case "P":
								l = o[parseInt(m[s].slice(1))];
								break;
							case "S":
								break;
							case "D":
								break;
							case "N":
								break;
							case "W":
								d = m[s].slice(1).split(" ");
								for (v = parseInt(d[0], 10); v <= parseInt(d[1], 10); ++v) {
									p = parseInt(d[2], 10);
									u[v - 1] = p === 0 ? {
										hidden: true
									} : {
										wch: p
									};
									Kf(u[v - 1])
								}
								break;
							case "C":
								n = parseInt(m[s].slice(1)) - 1;
								if (!u[n]) u[n] = {};
								break;
							case "R":
								a = parseInt(m[s].slice(1)) - 1;
								if (!h[a]) h[a] = {};
								if (p > 0) {
									h[a].hpt = p;
									h[a].hpx = Qf(p)
								} else if (p === 0) h[a].hidden = true;
								break;
							default:
								if (r && r.WTF) throw new Error("SYLK bad record " + g);
						}
						if (w < 1) l = null;
						break;
					default:
						if (r && r.WTF) throw new Error("SYLK bad record " + g);
				}
			}
			if (h.length > 0) c["!rows"] = h;
			if (u.length > 0) c["!cols"] = u;
			return [f, c]
		}

		function t(r, t) {
			var a = e(r, t);
			var n = a[0],
				i = a[1];
			var s = vt(n, t);
			z(i).forEach(function(e) {
				s[e] = i[e]
			});
			return s
		}

		function a(e, r) {
			return dt(t(e, r), r)
		}

		function n(e, r, t, a) {
			var n = "C;Y" + (t + 1) + ";X" + (a + 1) + ";K";
			switch (e.t) {
				case "n":
					n += e.v || 0;
					if (e.f && !e.F) n += ";E" + Ol(e.f, {
						r: t,
						c: a
					});
					break;
				case "b":
					n += e.v ? "TRUE" : "FALSE";
					break;
				case "e":
					n += e.w || e.v;
					break;
				case "d":
					n += '"' + (e.w || e.v) + '"';
					break;
				case "s":
					n += '"' + e.v.replace(/"/g, "") + '"';
					break;
			}
			return n
		}

		function i(e, r) {
			r.forEach(function(r, t) {
				var a = "F;W" + (t + 1) + " " + (t + 1) + " ";
				if (r.hidden) a += "0";
				else {
					if (typeof r.width == "number") r.wpx = Vf(r.width);
					if (typeof r.wpx == "number") r.wch = zf(r.wpx);
					if (typeof r.wch == "number") a += Math.round(r.wch)
				}
				if (a.charAt(a.length - 1) != " ") e.push(a)
			})
		}

		function s(e, r) {
			r.forEach(function(r, t) {
				var a = "F;";
				if (r.hidden) a += "M0;";
				else if (r.hpt) a += "M" + 20 * r.hpt + ";";
				else if (r.hpx) a += "M" + 20 * Zf(r.hpx) + ";";
				if (a.length > 2) e.push(a + "R" + (t + 1))
			})
		}

		function f(e, r) {
			var t = ["ID;PWXL;N;E"],
				a = [];
			var f = ct(e["!ref"]),
				o;
			var l = Array.isArray(e);
			var c = "\r\n";
			t.push("P;PGeneral");
			t.push("F;P0;DG0G8;M255");
			if (e["!cols"]) i(t, e["!cols"]);
			if (e["!rows"]) s(t, e["!rows"]);
			t.push("B;Y" + (f.e.r - f.s.r + 1) + ";X" + (f.e.c - f.s.c + 1) + ";D" + [f.s.c, f.s.r, f.e.c, f.e.r].join(" "));
			for (var h = f.s.r; h <= f.e.r; ++h) {
				for (var u = f.s.c; u <= f.e.c; ++u) {
					var d = ft({
						r: h,
						c: u
					});
					o = l ? (e[h] || [])[u] : e[d];
					if (!o || o.v == null && (!o.f || o.F)) continue;
					a.push(n(o, e, h, u, r))
				}
			}
			return t.join(c) + c + a.join(c) + c + "E" + c
		}
		return {
			to_workbook: a,
			to_sheet: t,
			from_sheet: f
		}
	}();
	var Ws = function() {
		function e(e, t) {
			switch (t.type) {
				case "base64":
					return r(b.decode(e), t);
				case "binary":
					return r(e, t);
				case "buffer":
					return r(e.toString("binary"), t);
				case "array":
					return r(ae(e), t);
			}
			throw new Error("Unrecognized type " + t.type)
		}

		function r(e) {
			var r = e.split("\n"),
				t = -1,
				a = -1,
				n = 0,
				i = [];
			for (; n !== r.length; ++n) {
				if (r[n].trim() === "BOT") {
					i[++t] = [];
					a = 0;
					continue
				}
				if (t < 0) continue;
				var s = r[n].trim().split(",");
				var f = s[0],
					o = s[1];
				++n;
				var l = r[n].trim();
				switch (+f) {
					case -1:
						if (l === "BOT") {
							i[++t] = [];
							a = 0;
							continue
						} else if (l !== "EOD") throw new Error("Unrecognized DIF special command " + l);
						break;
					case 0:
						if (l === "TRUE") i[t][a] = true;
						else if (l === "FALSE") i[t][a] = false;
						else if (!isNaN(se(o))) i[t][a] = se(o);
						else if (!isNaN(fe(o).getDate())) i[t][a] = te(o);
						else i[t][a] = o;
						++a;
						break;
					case 1:
						l = l.slice(1, l.length - 1);
						i[t][a++] = l !== "" ? l : null;
						break;
				}
				if (l === "EOD") break
			}
			return i
		}

		function t(r, t) {
			return vt(e(r, t), t)
		}

		function a(e, r) {
			return dt(t(e, r), r)
		}
		var n = function() {
			var e = function t(e, r, a, n, i) {
				e.push(r);
				e.push(a + "," + n);
				e.push('"' + i.replace(/"/g, '""') + '"')
			};
			var r = function a(e, r, t, n) {
				e.push(r + "," + t);
				e.push(r == 1 ? '"' + n.replace(/"/g, '""') + '"' : n)
			};
			return function n(t) {
				var a = [];
				var n = ct(t["!ref"]),
					i;
				var s = Array.isArray(t);
				e(a, "TABLE", 0, 1, "sheetjs");
				e(a, "VECTORS", 0, n.e.r - n.s.r + 1, "");
				e(a, "TUPLES", 0, n.e.c - n.s.c + 1, "");
				e(a, "DATA", 0, 0, "");
				for (var f = n.s.r; f <= n.e.r; ++f) {
					r(a, -1, 0, "BOT");
					for (var o = n.s.c; o <= n.e.c; ++o) {
						var l = ft({
							r: f,
							c: o
						});
						i = s ? (t[f] || [])[o] : t[l];
						if (!i) {
							r(a, 1, 0, "");
							continue
						}
						switch (i.t) {
							case "n":
								var c = m ? i.w : i.v;
								if (!c && i.v != null) c = i.v;
								if (c == null) {
									if (m && i.f && !i.F) r(a, 1, 0, "=" + i.f);
									else r(a, 1, 0, "")
								} else r(a, 0, c, "V");
								break;
							case "b":
								r(a, 0, i.v ? 1 : 0, i.v ? "TRUE" : "FALSE");
								break;
							case "s":
								r(a, 1, 0, !m || isNaN(i.v) ? i.v : '="' + i.v + '"');
								break;
							case "d":
								if (!i.w) i.w = y.format(i.z || y._table[14], Q(te(i.v)));
								if (m) r(a, 0, i.w, "V");
								else r(a, 1, 0, i.w);
								break;
							default:
								r(a, 1, 0, "");
						}
					}
				}
				r(a, -1, 0, "EOD");
				var h = "\r\n";
				var u = a.join(h);
				return u
			}
		}();
		return {
			to_workbook: a,
			to_sheet: t,
			from_sheet: n
		}
	}();
	var Vs = function() {
		function e(e) {
			return e.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, "\n")
		}

		function r(e) {
			return e.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n")
		}

		function t(r) {
			var t = r.split("\n"),
				a = -1,
				n = -1,
				i = 0,
				s = [];
			for (; i !== t.length; ++i) {
				var f = t[i].trim().split(":");
				if (f[0] !== "cell") continue;
				var o = st(f[1]);
				if (s.length <= o.r)
					for (a = s.length; a <= o.r; ++a)
						if (!s[a]) s[a] = [];
				a = o.r;
				n = o.c;
				switch (f[2]) {
					case "t":
						s[a][n] = e(f[3]);
						break;
					case "v":
						s[a][n] = +f[3];
						break;
					case "vtf":
						var l = f[f.length - 1];
					case "vtc":
						switch (f[3]) {
							case "nl":
								s[a][n] = +f[4] ? true : false;
								break;
							default:
								s[a][n] = +f[4];
								break;
						}
						if (f[2] == "vtf") s[a][n] = [s[a][n], l];
				}
			}
			return s
		}

		function a(e, r) {
			return vt(t(e, r), r)
		}

		function n(e, r) {
			return dt(a(e, r), r)
		}
		var i = ["socialcalc:version:1.5", "MIME-Version: 1.0", "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"].join(
			"\n");
		var s = ["--SocialCalcSpreadsheetControlSave", "Content-type: text/plain; charset=UTF-8"].join("\n") + "\n";
		var f = ["# SocialCalc Spreadsheet Control Save", "part:sheet"].join("\n");
		var o = "--SocialCalcSpreadsheetControlSave--";

		function l(e) {
			if (!e || !e["!ref"]) return "";
			var t = [],
				a = [],
				n, i = "";
			var s = ot(e["!ref"]);
			var f = Array.isArray(e);
			for (var o = s.s.r; o <= s.e.r; ++o) {
				for (var l = s.s.c; l <= s.e.c; ++l) {
					i = ft({
						r: o,
						c: l
					});
					n = f ? (e[o] || [])[l] : e[i];
					if (!n || n.v == null || n.t === "z") continue;
					a = ["cell", i, "t"];
					switch (n.t) {
						case "s":
							;
						case "str":
							a.push(r(n.v));
							break;
						case "n":
							if (!n.f) {
								a[2] = "v";
								a[3] = n.v
							} else {
								a[2] = "vtf";
								a[3] = "n";
								a[4] = n.v;
								a[5] = r(n.f)
							}
							break;
						case "b":
							a[2] = "vt" + (n.f ? "f" : "c");
							a[3] = "nl";
							a[4] = n.v ? "1" : "0";
							a[5] = r(n.f || (n.v ? "TRUE" : "FALSE"));
							break;
						case "d":
							var c = Q(te(n.v));
							a[2] = "vtc";
							a[3] = "nd";
							a[4] = "" + c;
							a[5] = n.w || y.format(n.z || y._table[14], c);
							break;
						case "e":
							continue;
					}
					t.push(a.join(":"))
				}
			}
			t.push("sheet:c:" + (s.e.c - s.s.c + 1) + ":r:" + (s.e.r - s.s.r + 1) + ":tvf:1");
			t.push("valueformat:1:text-wiki");
			return t.join("\n")
		}

		function c(e) {
			return [i, s, f, s, l(e), o].join("\n")
		}
		return {
			to_workbook: n,
			to_sheet: a,
			from_sheet: c
		}
	}();
	var zs = function() {
		function e(e, r, t, a, n) {
			if (n.raw) r[t][a] = e;
			else if (e === "TRUE") r[t][a] = true;
			else if (e === "FALSE") r[t][a] = false;
			else if (e === "") {} else if (!isNaN(se(e))) r[t][a] = se(e);
			else if (!isNaN(fe(e).getDate())) r[t][a] = te(e);
			else r[t][a] = e
		}

		function r(r, t) {
			var a = t || {};
			var n = [];
			if (!r || r.length === 0) return n;
			var i = r.split(/[\r\n]/);
			var s = i.length - 1;
			while (s >= 0 && i[s].length === 0) --s;
			var f = 10,
				o = 0;
			var l = 0;
			for (; l <= s; ++l) {
				o = i[l].indexOf(" ");
				if (o == -1) o = i[l].length;
				else o++;
				f = Math.max(f, o)
			}
			for (l = 0; l <= s; ++l) {
				n[l] = [];
				var c = 0;
				e(i[l].slice(0, f).trim(), n, l, c, a);
				for (c = 1; c <= (i[l].length - f) / 10 + 1; ++c) e(i[l].slice(f + (c - 1) * 10, f + c * 10).trim(), n, l, c, a)
			}
			return n
		}
		var t = {
			44: ",",
			9: "\t",
			59: ";"
		};
		var a = {
			44: 3,
			9: 2,
			59: 1
		};

		function n(e) {
			var r = {},
				n = false,
				i = 0,
				s = 0;
			for (; i < e.length; ++i) {
				if ((s = e.charCodeAt(i)) == 34) n = !n;
				else if (!n && s in t) r[s] = (r[s] || 0) + 1
			}
			s = [];
			for (i in r)
				if (r.hasOwnProperty(i)) {
					s.push([r[i], i])
				}
			if (!s.length) {
				r = a;
				for (i in r)
					if (r.hasOwnProperty(i)) {
						s.push([r[i], i])
					}
			}
			s.sort(function(e, r) {
				return e[0] - r[0] || a[e[1]] - a[r[1]]
			});
			return t[s.pop()[1]]
		}

		function i(e, r) {
			var t = r || {};
			var a = "";
			if (g != null && t.dense == null) t.dense = g;
			var i = t.dense ? [] : {};
			var s = {
				s: {
					c: 0,
					r: 0
				},
				e: {
					c: 0,
					r: 0
				}
			};
			if (e.slice(0, 4) == "sep=" && e.charCodeAt(5) == 10) {
				a = e.charAt(4);
				e = e.slice(6)
			} else a = n(e.slice(0, 1024));
			var f = 0,
				o = 0,
				l = 0;
			var c = 0,
				h = 0,
				u = a.charCodeAt(0),
				d = false,
				p = 0;
			e = e.replace(/\r\n/gm, "\n");
			var v = t.dateNF != null ? F(t.dateNF) : null;

			function m() {
				var r = e.slice(c, h);
				var a = {};
				if (r.charAt(0) == '"' && r.charAt(r.length - 1) == '"') r = r.slice(1, -1).replace(/""/g, '"');
				if (r.length === 0) a.t = "z";
				else if (t.raw) {
					a.t = "s";
					a.v = r
				} else if (r.trim().length === 0) {
					a.t = "s";
					a.v = r
				} else if (r.charCodeAt(0) == 61) {
					if (r.charCodeAt(1) == 34 && r.charCodeAt(r.length - 1) == 34) {
						a.t = "s";
						a.v = r.slice(2, -1).replace(/""/g, '"')
					} else if (Pl(r)) {
						a.t = "n";
						a.f = r.slice(1)
					} else {
						a.t = "s";
						a.v = r
					}
				} else if (r == "TRUE") {
					a.t = "b";
					a.v = true
				} else if (r == "FALSE") {
					a.t = "b";
					a.v = false
				} else if (!isNaN(l = se(r))) {
					a.t = "n";
					if (t.cellText !== false) a.w = r;
					a.v = l
				} else if (!isNaN(fe(r).getDate()) || v && r.match(v)) {
					a.z = t.dateNF || y._table[14];
					var n = 0;
					if (v && r.match(v)) {
						r = P(r, t.dateNF, r.match(v) || []);
						n = 1
					}
					if (t.cellDates) {
						a.t = "d";
						a.v = te(r, n)
					} else {
						a.t = "n";
						a.v = Q(te(r, n))
					}
					if (t.cellText !== false) a.w = y.format(a.z, a.v instanceof Date ? Q(a.v) : a.v);
					if (!t.cellNF) delete a.z
				} else {
					a.t = "s";
					a.v = r
				}
				if (a.t == "z") {} else if (t.dense) {
					if (!i[f]) i[f] = [];
					i[f][o] = a
				} else i[ft({
					c: o,
					r: f
				})] = a;
				c = h + 1;
				if (s.e.c < o) s.e.c = o;
				if (s.e.r < f) s.e.r = f;
				if (p == u) ++o;
				else {
					o = 0;
					++f
				}
			}
			for (; h < e.length; ++h) switch (p = e.charCodeAt(h)) {
				case 34:
					d = !d;
					break;
				case u:
					;
				case 10:
					;
				case 13:
					if (!d) m();
					break;
				default:
					break;
			}
			if (h - c > 0) m();
			i["!ref"] = lt(s);
			return i
		}

		function s(e, t) {
			if (e.slice(0, 4) == "sep=") return i(e, t);
			if (e.indexOf("\t") >= 0 || e.indexOf(",") >= 0 || e.indexOf(";") >= 0) return i(e, t);
			return vt(r(e, t), t)
		}

		function f(e, r) {
			var t = "",
				a = r.type == "string" ? [0, 0, 0, 0] : Uv(e, r);
			switch (r.type) {
				case "base64":
					t = b.decode(e);
					break;
				case "binary":
					t = e;
					break;
				case "buffer":
					t = e.toString("binary");
					break;
				case "array":
					t = ae(e);
					break;
				case "string":
					t = e;
					break;
				default:
					throw new Error("Unrecognized type " + r.type);
			}
			if (a[0] == 239 && a[1] == 187 && a[2] == 191) t = Ue(t.slice(3));
			else if ((r.type == "binary" || r.type == "buffer") && typeof cptable !== "undefined" && r.codepage) t = cptable.utils.decode(r.codepage,
				cptable.utils.encode(1252, t));
			if (t.slice(0, 19) == "socialcalc:version:") return Vs.to_sheet(r.type == "string" ? t : Ue(t), r);
			return s(t, r)
		}

		function o(e, r) {
			return dt(f(e, r), r)
		}

		function l(e) {
			var r = [];
			var t = ct(e["!ref"]),
				a;
			var n = Array.isArray(e);
			for (var i = t.s.r; i <= t.e.r; ++i) {
				var s = [];
				for (var f = t.s.c; f <= t.e.c; ++f) {
					var o = ft({
						r: i,
						c: f
					});
					a = n ? (e[i] || [])[f] : e[o];
					if (!a || a.v == null) {
						s.push("          ");
						continue
					}
					var l = (a.w || (ut(a), a.w) || "").slice(0, 10);
					while (l.length < 10) l += " ";
					s.push(l + (f === 0 ? " " : ""))
				}
				r.push(s.join(""))
			}
			return r.join("\n")
		}
		return {
			to_workbook: o,
			to_sheet: f,
			from_sheet: l
		}
	}();

	function Xs(e, r) {
		var t = r || {},
			a = !!t.WTF;
		t.WTF = true;
		try {
			var n = Hs.to_workbook(e, t);
			t.WTF = a;
			return n
		} catch (i) {
			t.WTF = a;
			if (!i.message.match(/SYLK bad record ID/) && a) throw i;
			return zs.to_workbook(e, r)
		}
	}
	var Gs = function() {
		function e(e, r, t) {
			if (!e) return;
			Ur(e, e.l || 0);
			var a = t.Enum || C;
			while (e.l < e.length) {
				var n = e._R(2);
				var i = a[n] || a[255];
				var s = e._R(2);
				var f = e.l + s;
				var o = (i.f || Hr)(e, s, t);
				e.l = f;
				if (r(o, i.n, n)) return
			}
		}

		function r(e, r) {
			switch (r.type) {
				case "base64":
					return t(w(b.decode(e)), r);
				case "binary":
					return t(w(e), r);
				case "buffer":
					;
				case "array":
					return t(e, r);
			}
			throw "Unsupported type " + r.type
		}

		function t(r, t) {
			if (!r) return r;
			var a = t || {};
			if (g != null && a.dense == null) a.dense = g;
			var n = a.dense ? [] : {},
				i = "Sheet1",
				s = 0;
			var f = {},
				o = [i];
			var l = {
				s: {
					r: 0,
					c: 0
				},
				e: {
					r: 0,
					c: 0
				}
			};
			if (r[2] == 2) a.Enum = C;
			else if (r[2] == 26) a.Enum = E;
			else if (r[2] == 14) {
				a.Enum = E;
				a.qpro = true;
				r.l = 0
			} else throw new Error("Unrecognized LOTUS BOF " + r[2]);
			e(r, function(e, t, c) {
				if (r[2] == 2) switch (c) {
					case 0:
						a.vers = e;
						if (e >= 4096) a.qpro = true;
						break;
					case 6:
						l = e;
						break;
					case 15:
						if (!a.qpro) e[1].v = e[1].v.slice(1);
					case 13:
						;
					case 14:
						;
					case 16:
						;
					case 51:
						if (c == 14 && (e[2] & 112) == 112 && (e[2] & 15) > 1 && (e[2] & 15) < 15) {
							e[1].z = a.dateNF || y._table[14];
							if (a.cellDates) {
								e[1].t = "d";
								e[1].v = J(e[1].v)
							}
						}
						if (a.dense) {
							if (!n[e[0].r]) n[e[0].r] = [];
							n[e[0].r][e[0].c] = e[1]
						} else n[ft(e[0])] = e[1];
						break;
				} else switch (c) {
					case 22:
						e[1].v = e[1].v.slice(1);
					case 23:
						;
					case 24:
						;
					case 25:
						;
					case 37:
						;
					case 39:
						;
					case 40:
						if (e[3] > s) {
							n["!ref"] = lt(l);
							f[i] = n;
							n = a.dense ? [] : {};
							l = {
								s: {
									r: 0,
									c: 0
								},
								e: {
									r: 0,
									c: 0
								}
							};
							s = e[3];
							i = "Sheet" + (s + 1);
							o.push(i)
						}
						if (a.dense) {
							if (!n[e[0].r]) n[e[0].r] = [];
							n[e[0].r][e[0].c] = e[1]
						} else n[ft(e[0])] = e[1];
						if (l.e.c < e[0].c) l.e.c = e[0].c;
						if (l.e.r < e[0].r) l.e.r = e[0].r;
						break;
					default:
						break;
				}
			}, a);
			n["!ref"] = lt(l);
			f[i] = n;
			return {
				SheetNames: o,
				Sheets: f
			}
		}

		function a(e) {
			var r = {
				s: {
					c: 0,
					r: 0
				},
				e: {
					c: 0,
					r: 0
				}
			};
			r.s.c = e._R(2);
			r.s.r = e._R(2);
			r.e.c = e._R(2);
			r.e.r = e._R(2);
			if (r.s.c == 65535) r.s.c = r.e.c = r.s.r = r.e.r = 0;
			return r
		}

		function n(e, r, t) {
			var a = [{
				c: 0,
				r: 0
			}, {
				t: "n",
				v: 0
			}, 0];
			if (t.qpro && t.vers != 20768) {
				a[0].c = e._R(1);
				e.l++;
				a[0].r = e._R(2);
				e.l += 2
			} else {
				a[2] = e._R(1);
				a[0].c = e._R(2);
				a[0].r = e._R(2)
			}
			return a
		}

		function i(e, r, t) {
			var a = e.l + r;
			var i = n(e, r, t);
			i[1].t = "s";
			if (t.vers == 20768) {
				e.l++;
				var s = e._R(1);
				i[1].v = e._R(s, "utf8");
				return i
			}
			if (t.qpro) e.l++;
			i[1].v = e._R(a - e.l, "cstr");
			return i
		}

		function s(e, r, t) {
			var a = n(e, r, t);
			a[1].v = e._R(2, "i");
			return a
		}

		function f(e, r, t) {
			var a = n(e, r, t);
			a[1].v = e._R(8, "f");
			return a
		}

		function o(e, r, t) {
			var a = e.l + r;
			var i = n(e, r, t);
			i[1].v = e._R(8, "f");
			if (t.qpro) e.l = a;
			else {
				var s = e._R(2);
				e.l += s
			}
			return i
		}

		function l(e) {
			var r = [{
				c: 0,
				r: 0
			}, {
				t: "n",
				v: 0
			}, 0];
			r[0].r = e._R(2);
			r[3] = e[e.l++];
			r[0].c = e[e.l++];
			return r
		}

		function c(e, r) {
			var t = l(e, r);
			t[1].t = "s";
			t[1].v = e._R(r - 4, "cstr");
			return t
		}

		function h(e, r) {
			var t = l(e, r);
			t[1].v = e._R(2);
			var a = t[1].v >> 1;
			if (t[1].v & 1) {
				switch (a & 7) {
					case 1:
						a = (a >> 3) * 500;
						break;
					case 2:
						a = (a >> 3) / 20;
						break;
					case 4:
						a = (a >> 3) / 2e3;
						break;
					case 6:
						a = (a >> 3) / 16;
						break;
					case 7:
						a = (a >> 3) / 64;
						break;
					default:
						throw "unknown NUMBER_18 encoding " + (a & 7);
				}
			}
			t[1].v = a;
			return t
		}

		function u(e, r) {
			var t = l(e, r);
			var a = e._R(4);
			var n = e._R(4);
			var i = e._R(2);
			if (i == 65535) {
				t[1].v = 0;
				return t
			}
			var s = i & 32768;
			i = (i & 32767) - 16446;
			t[1].v = (s * 2 - 1) * ((i > 0 ? n << i : n >>> -i) + (i > -32 ? a << i + 32 : a >>> -(i + 32)));
			return t
		}

		function d(e, r) {
			var t = u(e, 14);
			e.l += r - 14;
			return t
		}

		function p(e, r) {
			var t = l(e, r);
			var a = e._R(4);
			t[1].v = a >> 6;
			return t
		}

		function v(e, r) {
			var t = l(e, r);
			var a = e._R(8, "f");
			t[1].v = a;
			return t
		}

		function m(e, r) {
			var t = v(e, 14);
			e.l += r - 10;
			return t
		}
		var C = {
			0: {
				n: "BOF",
				f: Bn
			},
			1: {
				n: "EOF"
			},
			2: {
				n: "CALCMODE"
			},
			3: {
				n: "CALCORDER"
			},
			4: {
				n: "SPLIT"
			},
			5: {
				n: "SYNC"
			},
			6: {
				n: "RANGE",
				f: a
			},
			7: {
				n: "WINDOW1"
			},
			8: {
				n: "COLW1"
			},
			9: {
				n: "WINTWO"
			},
			10: {
				n: "COLW2"
			},
			11: {
				n: "NAME"
			},
			12: {
				n: "BLANK"
			},
			13: {
				n: "INTEGER",
				f: s
			},
			14: {
				n: "NUMBER",
				f: f
			},
			15: {
				n: "LABEL",
				f: i
			},
			16: {
				n: "FORMULA",
				f: o
			},
			24: {
				n: "TABLE"
			},
			25: {
				n: "ORANGE"
			},
			26: {
				n: "PRANGE"
			},
			27: {
				n: "SRANGE"
			},
			28: {
				n: "FRANGE"
			},
			29: {
				n: "KRANGE1"
			},
			32: {
				n: "HRANGE"
			},
			35: {
				n: "KRANGE2"
			},
			36: {
				n: "PROTEC"
			},
			37: {
				n: "FOOTER"
			},
			38: {
				n: "HEADER"
			},
			39: {
				n: "SETUP"
			},
			40: {
				n: "MARGINS"
			},
			41: {
				n: "LABELFMT"
			},
			42: {
				n: "TITLES"
			},
			43: {
				n: "SHEETJS"
			},
			45: {
				n: "GRAPH"
			},
			46: {
				n: "NGRAPH"
			},
			47: {
				n: "CALCCOUNT"
			},
			48: {
				n: "UNFORMATTED"
			},
			49: {
				n: "CURSORW12"
			},
			50: {
				n: "WINDOW"
			},
			51: {
				n: "STRING",
				f: i
			},
			55: {
				n: "PASSWORD"
			},
			56: {
				n: "LOCKED"
			},
			60: {
				n: "QUERY"
			},
			61: {
				n: "QUERYNAME"
			},
			62: {
				n: "PRINT"
			},
			63: {
				n: "PRINTNAME"
			},
			64: {
				n: "GRAPH2"
			},
			65: {
				n: "GRAPHNAME"
			},
			66: {
				n: "ZOOM"
			},
			67: {
				n: "SYMSPLIT"
			},
			68: {
				n: "NSROWS"
			},
			69: {
				n: "NSCOLS"
			},
			70: {
				n: "RULER"
			},
			71: {
				n: "NNAME"
			},
			72: {
				n: "ACOMM"
			},
			73: {
				n: "AMACRO"
			},
			74: {
				n: "PARSE"
			},
			255: {
				n: "",
				f: Hr
			}
		};
		var E = {
			0: {
				n: "BOF"
			},
			1: {
				n: "EOF"
			},
			3: {
				n: "??"
			},
			4: {
				n: "??"
			},
			5: {
				n: "??"
			},
			6: {
				n: "??"
			},
			7: {
				n: "??"
			},
			9: {
				n: "??"
			},
			10: {
				n: "??"
			},
			11: {
				n: "??"
			},
			12: {
				n: "??"
			},
			14: {
				n: "??"
			},
			15: {
				n: "??"
			},
			16: {
				n: "??"
			},
			17: {
				n: "??"
			},
			18: {
				n: "??"
			},
			19: {
				n: "??"
			},
			21: {
				n: "??"
			},
			22: {
				n: "LABEL16",
				f: c
			},
			23: {
				n: "NUMBER17",
				f: u
			},
			24: {
				n: "NUMBER18",
				f: h
			},
			25: {
				n: "FORMULA19",
				f: d
			},
			26: {
				n: "??"
			},
			27: {
				n: "??"
			},
			28: {
				n: "??"
			},
			29: {
				n: "??"
			},
			30: {
				n: "??"
			},
			31: {
				n: "??"
			},
			33: {
				n: "??"
			},
			37: {
				n: "NUMBER25",
				f: p
			},
			39: {
				n: "NUMBER27",
				f: v
			},
			40: {
				n: "FORMULA28",
				f: m
			},
			255: {
				n: "",
				f: Hr
			}
		};
		return {
			to_workbook: r
		}
	}();
	var js = function Rg() {
		var e = Xe("t"),
			r = Xe("rPr"),
			t = /<(?:\w+:)?r>/g,
			a = /<\/(?:\w+:)?r>/,
			n = /\r\n/g;
		var i = function o(e, r, t) {
			var a = {},
				n = 65001,
				i = "";
			var f = e.match(we),
				o = 0;
			if (f)
				for (; o != f.length; ++o) {
					var l = Ae(f[o]);
					switch (l[0].replace(/\w*:/g, "")) {
						case "<condense":
							break;
						case "<extend":
							break;
						case "<shadow":
							if (!l.val) break;
						case "<shadow>":
							;
						case "<shadow/>":
							a.shadow = 1;
							break;
						case "</shadow>":
							break;
						case "<charset":
							if (l.val == "1") break;
							n = s[parseInt(l.val, 10)];
							break;
						case "<outline":
							if (!l.val) break;
						case "<outline>":
							;
						case "<outline/>":
							a.outline = 1;
							break;
						case "</outline>":
							break;
						case "<rFont":
							a.name = l.val;
							break;
						case "<sz":
							a.sz = l.val;
							break;
						case "<strike":
							if (!l.val) break;
						case "<strike>":
							;
						case "<strike/>":
							a.strike = 1;
							break;
						case "</strike>":
							break;
						case "<u":
							if (!l.val) break;
							switch (l.val) {
								case "double":
									a.uval = "double";
									break;
								case "singleAccounting":
									a.uval = "single-accounting";
									break;
								case "doubleAccounting":
									a.uval = "double-accounting";
									break;
							};
						case "<u>":
							;
						case "<u/>":
							a.u = 1;
							break;
						case "</u>":
							break;
						case "<b":
							if (l.val == "0") break;
						case "<b>":
							;
						case "<b/>":
							a.b = 1;
							break;
						case "</b>":
							break;
						case "<i":
							if (l.val == "0") break;
						case "<i>":
							;
						case "<i/>":
							a.i = 1;
							break;
						case "</i>":
							break;
						case "<color":
							if (l.rgb) a.color = l.rgb.slice(2, 8);
							break;
						case "<family":
							a.family = l.val;
							break;
						case "<vertAlign":
							i = l.val;
							break;
						case "<scheme":
							break;
						default:
							if (l[0].charCodeAt(1) !== 47) throw "Unrecognized rich format " + l[0];
					}
				}
			var c = [];
			if (a.u) c.push("text-decoration: underline;");
			if (a.uval) c.push("text-underline-style:" + a.uval + ";");
			if (a.sz) c.push("font-size:" + a.sz + ";");
			if (a.outline) c.push("text-effect: outline;");
			if (a.shadow) c.push("text-shadow: auto;");
			r.push('<span style="' + c.join("") + '">');
			if (a.b) {
				r.push("<b>");
				t.push("</b>")
			}
			if (a.i) {
				r.push("<i>");
				t.push("</i>")
			}
			if (a.strike) {
				r.push("<s>");
				t.push("</s>")
			}
			if (i == "superscript") i = "sup";
			else if (i == "subscript") i = "sub";
			if (i != "") {
				r.push("<" + i + ">");
				t.push("</" + i + ">")
			}
			t.push("</span>");
			return n
		};

		function f(t) {
			var a = [
				[], "", []
			];
			var s = t.match(e);
			if (!s) return "";
			a[1] = s[1];
			var f = t.match(r);
			if (f) i(f[1], a[0], a[2]);
			return a[0].join("") + a[1].replace(n, "<br/>") + a[2].join("")
		}
		return function l(e) {
			return e.replace(t, "").split(a).map(f).join("")
		}
	}();
	var Ks = /<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g,
		Ys = /<(?:\w+:)?r>/;
	var $s = /<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g;

	function Zs(e, r) {
		var t = r ? r.cellHTML : true;
		var a = {};
		if (!e) return null;
		if (e.match(/^\s*<(?:\w+:)?t[^>]*>/)) {
			a.t = xe(Ue(e.slice(e.indexOf(">") + 1).split(/<\/(?:\w+:)?t>/)[0] || ""));
			a.r = Ue(e);
			if (t) a.h = Fe(a.t)
		} else if (e.match(Ys)) {
			a.r = Ue(e);
			a.t = xe(Ue((e.replace($s, "").match(Ks) || []).join("").replace(we, "")));
			if (t) a.h = js(a.r)
		}
		return a
	}
	var Qs = /<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/;
	var Js = /<(?:\w+:)?(?:si|sstItem)>/g;
	var qs = /<\/(?:\w+:)?(?:si|sstItem)>/;

	function ef(e, r) {
		var t = [],
			a = "";
		if (!e) return t;
		var n = e.match(Qs);
		if (n) {
			a = n[2].replace(Js, "").split(qs);
			for (var i = 0; i != a.length; ++i) {
				var s = Zs(a[i].trim(), r);
				if (s != null) t[t.length] = s
			}
			n = Ae(n[1]);
			t.Count = n.count;
			t.Unique = n.uniqueCount
		}
		return t
	}
	_a.SST = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings";
	var rf = /^\s|\s$|[\t\n\r]/;

	function tf(e, r) {
		if (!r.bookSST) return "";
		var t = [Ce];
		t[t.length] = qe("sst", null, {
			xmlns: tr.main[0],
			count: e.Count,
			uniqueCount: e.Unique
		});
		for (var a = 0; a != e.length; ++a) {
			if (e[a] == null) continue;
			var n = e[a];
			var i = "<si>";
			if (n.r) i += n.r;
			else {
				i += "<t";
				if (!n.t) n.t = "";
				if (n.t.match(rf)) i += ' xml:space="preserve"';
				i += ">" + Re(n.t) + "</t>"
			}
			i += "</si>";
			t[t.length] = i
		}
		if (t.length > 2) {
			t[t.length] = "</sst>";
			t[1] = t[1].replace("/>", ">")
		}
		return t.join("")
	}

	function af(e) {
		return [e._R(4), e._R(4)]
	}

	function nf(e, r) {
		var t = [];
		var a = false;
		Vr(e, function n(e, i, s) {
			switch (s) {
				case 159:
					t.Count = e[0];
					t.Unique = e[1];
					break;
				case 19:
					t.push(e);
					break;
				case 160:
					return true;
				case 35:
					a = true;
					break;
				case 36:
					a = false;
					break;
				default:
					if (i.indexOf("Begin") > 0) {} else if (i.indexOf("End") > 0) {}
					if (!a || r.WTF) throw new Error("Unexpected record " + s + " " + i);
			}
		});
		return t
	}

	function sf(e, r) {
		if (!r) r = Wr(8);
		r._W(4, e.Count);
		r._W(4, e.Unique);
		return r
	}
	var ff = kt;

	function of(e) {
		var r = zr();
		Xr(r, "BrtBeginSst", sf(e));
		for (var t = 0; t < e.length; ++t) Xr(r, "BrtSSTItem", ff(e[t]));
		Xr(r, "BrtEndSst");
		return r.end()
	}

	function lf(e) {
		if (typeof cptable !== "undefined") return cptable.utils.encode(a, e);
		var r = [],
			t = e.split("");
		for (var n = 0; n < t.length; ++n) r[n] = t[n].charCodeAt(0);
		return r
	}

	function cf(e, r) {
		var t = {};
		t.Major = e._R(2);
		t.Minor = e._R(2);
		if (r >= 4) e.l += r - 4;
		return t
	}

	function hf(e) {
		var r = {};
		r.id = e._R(0, "lpp4");
		r.R = cf(e, 4);
		r.U = cf(e, 4);
		r.W = cf(e, 4);
		return r
	}

	function uf(e) {
		var r = e._R(4);
		var t = e.l + r - 4;
		var a = {};
		var n = e._R(4);
		var i = [];
		while (n-- > 0) i.push({
			t: e._R(4),
			v: e._R(0, "lpp4")
		});
		a.name = e._R(0, "lpp4");
		a.comps = i;
		if (e.l != t) throw new Error("Bad DataSpaceMapEntry: " + e.l + " != " + t);
		return a
	}

	function df(e) {
		var r = [];
		e.l += 4;
		var t = e._R(4);
		while (t-- > 0) r.push(uf(e));
		return r
	}

	function pf(e) {
		var r = [];
		e.l += 4;
		var t = e._R(4);
		while (t-- > 0) r.push(e._R(0, "lpp4"));
		return r
	}

	function vf(e) {
		var r = {};
		e._R(4);
		e.l += 4;
		r.id = e._R(0, "lpp4");
		r.name = e._R(0, "lpp4");
		r.R = cf(e, 4);
		r.U = cf(e, 4);
		r.W = cf(e, 4);
		return r
	}

	function gf(e) {
		var r = vf(e);
		r.ename = e._R(0, "8lpp4");
		r.blksz = e._R(4);
		r.cmode = e._R(4);
		if (e._R(4) != 4) throw new Error("Bad !Primary record");
		return r
	}

	function mf(e, r) {
		var t = e.l + r;
		var a = {};
		a.Flags = e._R(4) & 63;
		e.l += 4;
		a.AlgID = e._R(4);
		var n = false;
		switch (a.AlgID) {
			case 26126:
				;
			case 26127:
				;
			case 26128:
				n = a.Flags == 36;
				break;
			case 26625:
				n = a.Flags == 4;
				break;
			case 0:
				n = a.Flags == 16 || a.Flags == 4 || a.Flags == 36;
				break;
			default:
				throw "Unrecognized encryption algorithm: " + a.AlgID;
		}
		if (!n) throw new Error("Encryption Flags/AlgID mismatch");
		a.AlgIDHash = e._R(4);
		a.KeySize = e._R(4);
		a.ProviderType = e._R(4);
		e.l += 8;
		a.CSPName = e._R(t - e.l >> 1, "utf16le");
		e.l = t;
		return a
	}

	function bf(e, r) {
		var t = {},
			a = e.l + r;
		e.l += 4;
		t.Salt = e.slice(e.l, e.l + 16);
		e.l += 16;
		t.Verifier = e.slice(e.l, e.l + 16);
		e.l += 16;
		e._R(4);
		t.VerifierHash = e.slice(e.l, a);
		e.l = a;
		return t
	}

	function Cf(e) {
		var r = cf(e);
		switch (r.Minor) {
			case 2:
				return [r.Minor, Ef(e, r)];
			case 3:
				return [r.Minor, wf(e, r)];
			case 4:
				return [r.Minor, kf(e, r)];
		}
		throw new Error("ECMA-376 Encrypted file unrecognized Version: " + r.Minor)
	}

	function Ef(e) {
		var r = e._R(4);
		if ((r & 63) != 36) throw new Error("EncryptionInfo mismatch");
		var t = e._R(4);
		var a = mf(e, t);
		var n = bf(e, e.length - e.l);
		return {
			t: "Std",
			h: a,
			v: n
		}
	}

	function wf() {
		throw new Error("File is password-protected: ECMA-376 Extensible")
	}

	function kf(e) {
		var r = ["saltSize", "blockSize", "keyBits", "hashSize", "cipherAlgorithm", "cipherChaining", "hashAlgorithm", "saltValue"];
		e.l += 4;
		var t = e._R(e.length - e.l, "utf8");
		var a = {};
		t.replace(we, function n(e) {
			var t = Ae(e);
			switch (_e(t[0])) {
				case "<?xml":
					break;
				case "<encryption":
					;
				case "</encryption>":
					break;
				case "<keyData":
					r.forEach(function(e) {
						a[e] = t[e]
					});
					break;
				case "<dataIntegrity":
					a.encryptedHmacKey = t.encryptedHmacKey;
					a.encryptedHmacValue = t.encryptedHmacValue;
					break;
				case "<keyEncryptors>":
					;
				case "<keyEncryptors":
					a.encs = [];
					break;
				case "</keyEncryptors>":
					break;
				case "<keyEncryptor":
					a.uri = t.uri;
					break;
				case "</keyEncryptor>":
					break;
				case "<encryptedKey":
					a.encs.push(t);
					break;
				default:
					throw t[0];
			}
		});
		return a
	}

	function Sf(e, r) {
		var t = {};
		var a = t.EncryptionVersionInfo = cf(e, 4);
		r -= 4;
		if (a.Minor != 2) throw new Error("unrecognized minor version code: " + a.Minor);
		if (a.Major > 4 || a.Major < 2) throw new Error("unrecognized major version code: " + a.Major);
		t.Flags = e._R(4);
		r -= 4;
		var n = e._R(4);
		r -= 4;
		t.EncryptionHeader = mf(e, n);
		r -= n;
		t.EncryptionVerifier = bf(e, r);
		return t
	}

	function Af(e) {
		var r = {};
		var t = r.EncryptionVersionInfo = cf(e, 4);
		if (t.Major != 1 || t.Minor != 1) throw "unrecognized version code " + t.Major + " : " + t.Minor;
		r.Salt = e._R(16);
		r.EncryptedVerifier = e._R(16);
		r.EncryptedVerifierHash = e._R(16);
		return r
	}

	function _f(e) {
		var r = 0,
			t;
		var a = lf(e);
		var n = a.length + 1,
			i, s;
		var f, o, l;
		t = E(n);
		t[0] = a.length;
		for (i = 1; i != n; ++i) t[i] = a[i - 1];
		for (i = n - 1; i >= 0; --i) {
			s = t[i];
			f = (r & 16384) === 0 ? 0 : 1;
			o = r << 1 & 32767;
			l = f | o;
			r = l ^ s
		}
		return r ^ 52811
	}
	var Bf = function() {
		var e = [187, 255, 255, 186, 255, 255, 185, 128, 0, 190, 15, 0, 191, 15, 0];
		var r = [57840, 7439, 52380, 33984, 4364, 3600, 61902, 12606, 6258, 57657, 54287, 34041, 10252, 43370, 20163];
		var t = [44796, 19929, 39858, 10053, 20106, 40212, 10761, 31585, 63170, 64933, 60267, 50935, 40399, 11199, 17763, 35526, 1453, 2906,
			5812, 11624, 23248, 885, 1770, 3540, 7080, 14160, 28320, 56640, 55369, 41139, 20807, 41614, 21821, 43642, 17621, 28485, 56970, 44341,
			19019, 38038, 14605, 29210, 60195, 50791, 40175, 10751, 21502, 43004, 24537, 18387, 36774, 3949, 7898, 15796, 31592, 63184, 47201,
			24803, 49606, 37805, 14203, 28406, 56812, 17824, 35648, 1697, 3394, 6788, 13576, 27152, 43601, 17539, 35078, 557, 1114, 2228, 4456,
			30388, 60776, 51953, 34243, 7079, 14158, 28316, 14128, 28256, 56512, 43425, 17251, 34502, 7597, 13105, 26210, 52420, 35241, 883, 1766,
			3532, 4129, 8258, 16516, 33032, 4657, 9314, 18628
		];
		var a = function(e) {
			return (e / 2 | e * 128) & 255
		};
		var n = function(e, r) {
			return a(e ^ r)
		};
		var i = function(e) {
			var a = r[e.length - 1];
			var n = 104;
			for (var i = e.length - 1; i >= 0; --i) {
				var s = e[i];
				for (var f = 0; f != 7; ++f) {
					if (s & 64) a ^= t[n];
					s *= 2;
					--n
				}
			}
			return a
		};
		return function(r) {
			var t = lf(r);
			var a = i(t);
			var s = t.length;
			var f = E(16);
			for (var o = 0; o != 16; ++o) f[o] = 0;
			var l, c, h;
			if ((s & 1) === 1) {
				l = a >> 8;
				f[s] = n(e[0], l);
				--s;
				l = a & 255;
				c = t[t.length - 1];
				f[s] = n(c, l)
			}
			while (s > 0) {
				--s;
				l = a >> 8;
				f[s] = n(t[s], l);
				--s;
				l = a & 255;
				f[s] = n(t[s], l)
			}
			s = 15;
			h = 15 - t.length;
			while (h > 0) {
				l = a >> 8;
				f[s] = n(e[h], l);
				--s;
				--h;
				l = a & 255;
				f[s] = n(t[s], l);
				--s;
				--h
			}
			return f
		}
	}();
	var Tf = function(e, r, t, a, n) {
		if (!n) n = r;
		if (!a) a = Bf(e);
		var i, s;
		for (i = 0; i != r.length; ++i) {
			s = r[i];
			s ^= a[t];
			s = (s >> 5 | s << 3) & 255;
			n[i] = s;
			++t
		}
		return [n, t, a]
	};
	var xf = function(e) {
		var r = 0,
			t = Bf(e);
		return function(e) {
			var a = Tf("", e, r, t);
			r = a[1];
			return a[0]
		}
	};

	function yf(e, r, t, a) {
		var n = {
			key: Bn(e),
			verificationBytes: Bn(e)
		};
		if (t.password) n.verifier = _f(t.password);
		a.valid = n.verificationBytes === n.verifier;
		if (a.valid) a.insitu = xf(t.password);
		return n
	}

	function If(e, r, t) {
		var a = t || {};
		a.Info = e._R(2);
		e.l -= 2;
		if (a.Info === 1) a.Data = Af(e, r);
		else a.Data = Sf(e, r);
		return a
	}

	function Rf(e, r, t) {
		var a = {
			Type: t.biff >= 8 ? e._R(2) : 0
		};
		if (a.Type) If(e, r - 2, a);
		else yf(e, t.biff >= 8 ? r : r - 2, t, a);
		return a
	}
	var Of = function() {
		function e(e, t) {
			switch (t.type) {
				case "base64":
					return r(b.decode(e), t);
				case "binary":
					return r(e, t);
				case "buffer":
					return r(e.toString("binary"), t);
				case "array":
					return r(ae(e), t);
			}
			throw new Error("Unrecognized type " + t.type)
		}

		function r(e, r) {
			var t = r || {};
			var a = t.dense ? [] : {};
			var n = {
				s: {
					c: 0,
					r: 0
				},
				e: {
					c: 0,
					r: 0
				}
			};
			if (!e.match(/\\trowd/)) throw new Error("RTF missing table");
			a["!ref"] = lt(n);
			return a
		}

		function t(r, t) {
			return dt(e(r, t), t)
		}

		function a(e) {
			var r = ["{\\rtf1\\ansi"];
			var t = ct(e["!ref"]),
				a;
			var n = Array.isArray(e);
			for (var i = t.s.r; i <= t.e.r; ++i) {
				r.push("\\trowd\\trautofit1");
				for (var s = t.s.c; s <= t.e.c; ++s) r.push("\\cellx" + (s + 1));
				r.push("\\pard\\intbl");
				for (s = t.s.c; s <= t.e.c; ++s) {
					var f = ft({
						r: i,
						c: s
					});
					a = n ? (e[i] || [])[s] : e[f];
					if (!a || a.v == null && (!a.f || a.F)) continue;
					r.push(" " + (a.w || (ut(a), a.w)));
					r.push("\\cell")
				}
				r.push("\\pard\\intbl\\row")
			}
			return r.join("") + "}"
		}
		return {
			to_workbook: t,
			to_sheet: e,
			from_sheet: a
		}
	}();

	function Df(e) {
		var r = e.slice(e[0] === "#" ? 1 : 0).slice(0, 6);
		return [parseInt(r.slice(0, 2), 16), parseInt(r.slice(2, 4), 16), parseInt(r.slice(4, 6), 16)]
	}

	function Ff(e) {
		for (var r = 0, t = 1; r != 3; ++r) t = t * 256 + (e[r] > 255 ? 255 : e[r] < 0 ? 0 : e[r]);
		return t.toString(16).toUpperCase().slice(1)
	}

	function Pf(e) {
		var r = e[0] / 255,
			t = e[1] / 255,
			a = e[2] / 255;
		var n = Math.max(r, t, a),
			i = Math.min(r, t, a),
			s = n - i;
		if (s === 0) return [0, 0, r];
		var f = 0,
			o = 0,
			l = n + i;
		o = s / (l > 1 ? 2 - l : l);
		switch (n) {
			case r:
				f = ((t - a) / s + 6) % 6;
				break;
			case t:
				f = (a - r) / s + 2;
				break;
			case a:
				f = (r - t) / s + 4;
				break;
		}
		return [f / 6, o, l / 2]
	}

	function Nf(e) {
		var r = e[0],
			t = e[1],
			a = e[2];
		var n = t * 2 * (a < .5 ? a : 1 - a),
			i = a - n / 2;
		var s = [i, i, i],
			f = 6 * r;
		var o;
		if (t !== 0) switch (f | 0) {
			case 0:
				;
			case 6:
				o = n * f;
				s[0] += n;
				s[1] += o;
				break;
			case 1:
				o = n * (2 - f);
				s[0] += o;
				s[1] += n;
				break;
			case 2:
				o = n * (f - 2);
				s[1] += n;
				s[2] += o;
				break;
			case 3:
				o = n * (4 - f);
				s[1] += o;
				s[2] += n;
				break;
			case 4:
				o = n * (f - 4);
				s[2] += n;
				s[0] += o;
				break;
			case 5:
				o = n * (6 - f);
				s[2] += o;
				s[0] += n;
				break;
		}
		for (var l = 0; l != 3; ++l) s[l] = Math.round(s[l] * 255);
		return s
	}

	function Lf(e, r) {
		if (r === 0) return e;
		var t = Pf(Df(e));
		if (r < 0) t[2] = t[2] * (1 + r);
		else t[2] = 1 - (1 - t[2]) * (1 - r);
		return Ff(Nf(t))
	}
	var Mf = 6,
		Uf = 15,
		Hf = 1,
		Wf = Mf;

	function Vf(e) {
		return Math.floor((e + Math.round(128 / Wf) / 256) * Wf)
	}

	function zf(e) {
		return Math.floor((e - 5) / Wf * 100 + .5) / 100
	}

	function Xf(e) {
		return Math.round((e * Wf + 5) / Wf * 256) / 256
	}

	function Gf(e) {
		return Xf(zf(Vf(e)))
	}

	function jf(e) {
		var r = Math.abs(e - Gf(e)),
			t = Wf;
		if (r > .005)
			for (Wf = Hf; Wf < Uf; ++Wf)
				if (Math.abs(e - Gf(e)) <= r) {
					r = Math.abs(e - Gf(e));
					t = Wf
				}
		Wf = t
	}

	function Kf(e) {
		if (e.width) {
			e.wpx = Vf(e.width);
			e.wch = zf(e.wpx);
			e.MDW = Wf
		} else if (e.wpx) {
			e.wch = zf(e.wpx);
			e.width = Xf(e.wch);
			e.MDW = Wf
		} else if (typeof e.wch == "number") {
			e.width = Xf(e.wch);
			e.wpx = Vf(e.width);
			e.MDW = Wf
		}
		if (e.customWidth) delete e.customWidth
	}
	var Yf = 96,
		$f = Yf;

	function Zf(e) {
		return e * 96 / $f
	}

	function Qf(e) {
		return e * $f / 96
	}
	var Jf = {
		None: "none",
		Solid: "solid",
		Gray50: "mediumGray",
		Gray75: "darkGray",
		Gray25: "lightGray",
		HorzStripe: "darkHorizontal",
		VertStripe: "darkVertical",
		ReverseDiagStripe: "darkDown",
		DiagStripe: "darkUp",
		DiagCross: "darkGrid",
		ThickDiagCross: "darkTrellis",
		ThinHorzStripe: "lightHorizontal",
		ThinVertStripe: "lightVertical",
		ThinReverseDiagStripe: "lightDown",
		ThinHorzCross: "lightGrid"
	};

	function qf(e, r, t, a) {
		r.Borders = [];
		var n = {};
		e[0].match(we).forEach(function(e) {
			var t = Ae(e);
			switch (t[0]) {
				case "<borders":
					;
				case "<borders>":
					;
				case "</borders>":
					break;
				case "<border":
					;
				case "<border>":
					;
				case "<border/>":
					n = {};
					if (t.diagonalUp) {
						n.diagonalUp = t.diagonalUp
					}
					if (t.diagonalDown) {
						n.diagonalDown = t.diagonalDown
					}
					r.Borders.push(n);
					break;
				case "</border>":
					break;
				case "<left/>":
					break;
				case "<left":
					;
				case "<left>":
					break;
				case "</left>":
					break;
				case "<right/>":
					break;
				case "<right":
					;
				case "<right>":
					break;
				case "</right>":
					break;
				case "<top/>":
					break;
				case "<top":
					;
				case "<top>":
					break;
				case "</top>":
					break;
				case "<bottom/>":
					break;
				case "<bottom":
					;
				case "<bottom>":
					break;
				case "</bottom>":
					break;
				case "<diagonal":
					;
				case "<diagonal>":
					;
				case "<diagonal/>":
					break;
				case "</diagonal>":
					break;
				case "<horizontal":
					;
				case "<horizontal>":
					;
				case "<horizontal/>":
					break;
				case "</horizontal>":
					break;
				case "<vertical":
					;
				case "<vertical>":
					;
				case "<vertical/>":
					break;
				case "</vertical>":
					break;
				case "<start":
					;
				case "<start>":
					;
				case "<start/>":
					break;
				case "</start>":
					break;
				case "<end":
					;
				case "<end>":
					;
				case "<end/>":
					break;
				case "</end>":
					break;
				case "<color":
					;
				case "<color>":
					break;
				case "<color/>":
					;
				case "</color>":
					break;
				default:
					if (a && a.WTF) throw new Error("unrecognized " + t[0] + " in borders");
			}
		})
	}

	function eo(e, r, t, a) {
		r.Fills = [];
		var n = {};
		e[0].match(we).forEach(function(e) {
			var t = Ae(e);
			switch (t[0]) {
				case "<fills":
					;
				case "<fills>":
					;
				case "</fills>":
					break;
				case "<fill>":
					;
				case "<fill":
					;
				case "<fill/>":
					n = {};
					r.Fills.push(n);
					break;
				case "</fill>":
					break;
				case "<gradientFill>":
					break;
				case "<gradientFill":
					;
				case "</gradientFill>":
					r.Fills.push(n);
					n = {};
					break;
				case "<patternFill":
					;
				case "<patternFill>":
					if (t.patternType) n.patternType = t.patternType;
					break;
				case "<patternFill/>":
					;
				case "</patternFill>":
					break;
				case "<bgColor":
					if (!n.bgColor) n.bgColor = {};
					if (t.indexed) n.bgColor.indexed = parseInt(t.indexed, 10);
					if (t.theme) n.bgColor.theme = parseInt(t.theme, 10);
					if (t.tint) n.bgColor.tint = parseFloat(t.tint);
					if (t.rgb) n.bgColor.rgb = t.rgb.slice(-6);
					break;
				case "<bgColor/>":
					;
				case "</bgColor>":
					break;
				case "<fgColor":
					if (!n.fgColor) n.fgColor = {};
					if (t.theme) n.fgColor.theme = parseInt(t.theme, 10);
					if (t.tint) n.fgColor.tint = parseFloat(t.tint);
					if (t.rgb) n.fgColor.rgb = t.rgb.slice(-6);
					break;
				case "<fgColor/>":
					;
				case "</fgColor>":
					break;
				case "<stop":
					;
				case "<stop/>":
					break;
				case "</stop>":
					break;
				case "<color":
					;
				case "<color/>":
					break;
				case "</color>":
					break;
				default:
					if (a && a.WTF) throw new Error("unrecognized " + t[0] + " in fills");
			}
		})
	}

	function ro(e, r, t, a) {
		r.Fonts = [];
		var n = {};
		e[0].match(we).forEach(function(e) {
			var i = Ae(e);
			switch (i[0]) {
				case "<fonts":
					;
				case "<fonts>":
					;
				case "</fonts>":
					break;
				case "<font":
					;
				case "<font>":
					break;
				case "</font>":
					;
				case "<font/>":
					r.Fonts.push(n);
					n = {};
					break;
				case "<name":
					if (i.val) n.name = i.val;
					break;
				case "<name/>":
					;
				case "</name>":
					break;
				case "<b":
					n.bold = i.val ? Me(i.val) : 1;
					break;
				case "<b/>":
					n.bold = 1;
					break;
				case "<i":
					n.italic = i.val ? Me(i.val) : 1;
					break;
				case "<i/>":
					n.italic = 1;
					break;
				case "<u":
					switch (i.val) {
						case "none":
							n.underline = 0;
							break;
						case "single":
							n.underline = 1;
							break;
						case "double":
							n.underline = 2;
							break;
						case "singleAccounting":
							n.underline = 33;
							break;
						case "doubleAccounting":
							n.underline = 34;
							break;
					}
					break;
				case "<u/>":
					n.underline = 1;
					break;
				case "<strike":
					n.strike = i.val ? Me(i.val) : 1;
					break;
				case "<strike/>":
					n.strike = 1;
					break;
				case "<outline":
					n.outline = i.val ? Me(i.val) : 1;
					break;
				case "<outline/>":
					n.outline = 1;
					break;
				case "<shadow":
					n.shadow = i.val ? Me(i.val) : 1;
					break;
				case "<shadow/>":
					n.shadow = 1;
					break;
				case "<condense":
					n.condense = i.val ? Me(i.val) : 1;
					break;
				case "<condense/>":
					n.condense = 1;
					break;
				case "<extend":
					n.extend = i.val ? Me(i.val) : 1;
					break;
				case "<extend/>":
					n.extend = 1;
					break;
				case "<sz":
					if (i.val) n.sz = +i.val;
					break;
				case "<sz/>":
					;
				case "</sz>":
					break;
				case "<vertAlign":
					if (i.val) n.vertAlign = i.val;
					break;
				case "<vertAlign/>":
					;
				case "</vertAlign>":
					break;
				case "<family":
					if (i.val) n.family = parseInt(i.val, 10);
					break;
				case "<family/>":
					;
				case "</family>":
					break;
				case "<scheme":
					if (i.val) n.scheme = i.val;
					break;
				case "<scheme/>":
					;
				case "</scheme>":
					break;
				case "<charset":
					if (i.val == "1") break;
					i.codepage = s[parseInt(i.val, 10)];
					break;
				case "<color":
					if (!n.color) n.color = {};
					if (i.auto) n.color.auto = Me(i.auto);
					if (i.rgb) n.color.rgb = i.rgb.slice(-6);
					else if (i.indexed) {
						n.color.index = parseInt(i.indexed, 10);
						var f = ga[n.color.index];
						if (n.color.index == 81) f = ga[1];
						if (!f) throw new Error(e);
						n.color.rgb = f[0].toString(16) + f[1].toString(16) + f[2].toString(16)
					} else if (i.theme) {
						n.color.theme = parseInt(i.theme, 10);
						if (i.tint) n.color.tint = parseFloat(i.tint);
						if (i.theme && t.themeElements && t.themeElements.clrScheme) {
							n.color.rgb = Lf(t.themeElements.clrScheme[n.color.theme].rgb, n.color.tint || 0)
						}
					}
					break;
				case "<color/>":
					;
				case "</color>":
					break;
				default:
					if (a && a.WTF) throw new Error("unrecognized " + i[0] + " in fonts");
			}
		})
	}

	function to(e, r, t) {
		r.NumberFmt = [];
		var a = z(y._table);
		for (var n = 0; n < a.length; ++n) r.NumberFmt[a[n]] = y._table[a[n]];
		var i = e[0].match(we);
		if (!i) return;
		for (n = 0; n < i.length; ++n) {
			var s = Ae(i[n]);
			switch (s[0]) {
				case "<numFmts":
					;
				case "</numFmts>":
					;
				case "<numFmts/>":
					;
				case "<numFmts>":
					break;
				case "<numFmt":
					{
						var f = xe(Ue(s.formatCode)),
							o = parseInt(s.numFmtId, 10);r.NumberFmt[o] = f;
						if (o > 0) {
							if (o > 392) {
								for (o = 392; o > 60; --o)
									if (r.NumberFmt[o] == null) break;
								r.NumberFmt[o] = f
							}
							y.load(f, o)
						}
					}
					break;
				case "</numFmt>":
					break;
				default:
					if (t.WTF) throw new Error("unrecognized " + s[0] + " in numFmts");
			}
		}
	}

	function ao(e) {
		var r = ["<numFmts>"];
		[
			[5, 8],
			[23, 26],
			[41, 44],
			[50, 392]
		].forEach(function(t) {
			for (var a = t[0]; a <= t[1]; ++a)
				if (e[a] != null) r[r.length] = qe("numFmt", null, {
					numFmtId: a,
					formatCode: Re(e[a])
				})
		});
		if (r.length === 1) return "";
		r[r.length] = "</numFmts>";
		r[0] = qe("numFmts", null, {
			count: r.length - 2
		}).replace("/>", ">");
		return r.join("")
	}
	var no = ["numFmtId", "fillId", "fontId", "borderId", "xfId"];
	var io = ["applyAlignment", "applyBorder", "applyFill", "applyFont", "applyNumberFormat", "applyProtection", "pivotButton", "quotePrefix"];

	function so(e, r, t) {
		r.CellXf = [];
		var a;
		e[0].match(we).forEach(function(e) {
			var n = Ae(e),
				i = 0;
			switch (n[0]) {
				case "<cellXfs":
					;
				case "<cellXfs>":
					;
				case "<cellXfs/>":
					;
				case "</cellXfs>":
					break;
				case "<xf":
					;
				case "<xf/>":
					a = n;
					delete a[0];
					for (i = 0; i < no.length; ++i)
						if (a[no[i]]) a[no[i]] = parseInt(a[no[i]], 10);
					for (i = 0; i < io.length; ++i)
						if (a[io[i]]) a[io[i]] = Me(a[io[i]]);
					if (a.numFmtId > 392) {
						for (i = 392; i > 60; --i)
							if (r.NumberFmt[a.numFmtId] == r.NumberFmt[i]) {
								a.numFmtId = i;
								break
							}
					}
					r.CellXf.push(a);
					break;
				case "</xf>":
					break;
				case "<alignment":
					;
				case "<alignment/>":
					var s = {};
					if (n.vertical) s.vertical = n.vertical;
					if (n.horizontal) s.horizontal = n.horizontal;
					if (n.textRotation != null) s.textRotation = n.textRotation;
					if (n.indent) s.indent = n.indent;
					if (n.wrapText) s.wrapText = n.wrapText;
					a.alignment = s;
					break;
				case "</alignment>":
					break;
				case "<protection":
					;
				case "</protection>":
					;
				case "<protection/>":
					break;
				case "<extLst":
					;
				case "</extLst>":
					break;
				case "<ext":
					break;
				default:
					if (t.WTF) throw new Error("unrecognized " + n[0] + " in cellXfs");
			}
		})
	}

	function fo(e) {
		var r = [];
		r[r.length] = qe("cellXfs", null);
		e.forEach(function(e) {
			r[r.length] = qe("xf", null, e)
		});
		r[r.length] = "</cellXfs>";
		if (r.length === 2) return "";
		r[0] = qe("cellXfs", null, {
			count: r.length - 2
		}).replace("/>", ">");
		return r.join("")
	}
	var oo = function Og() {
		var e = /<numFmts([^>]*)>[\S\s]*?<\/numFmts>/;
		var r = /<cellXfs([^>]*)>[\S\s]*?<\/cellXfs>/;
		var t = /<fills([^>]*)>[\S\s]*?<\/fills>/;
		var a = /<fonts([^>]*)>[\S\s]*?<\/fonts>/;
		var n = /<borders([^>]*)>[\S\s]*?<\/borders>/;
		return function i(s, f, o) {
			var l = {};
			if (!s) return l;
			s = s.replace(/<!--([\s\S]*?)-->/gm, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
			var c;
			if (c = s.match(e)) to(c, l, o);
			if (c = s.match(a)) ro(c, l, f, o);
			if (c = s.match(t)) eo(c, l, f, o);
			if (c = s.match(n)) qf(c, l, f, o);
			if (c = s.match(r)) so(c, l, o);
			return l
		}
	}();
	var lo = qe("styleSheet", null, {
		xmlns: tr.main[0],
		"xmlns:vt": tr.vt
	});
	_a.STY = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles";

	function co(e, r) {
		var t = [Ce, lo],
			a;
		if (e.SSF && (a = ao(e.SSF)) != null) t[t.length] = a;
		t[t.length] =
			'<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>';
		t[t.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>';
		t[t.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>';
		t[t.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>';
		if (a = fo(r.cellXfs)) t[t.length] = a;
		t[t.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>';
		t[t.length] = '<dxfs count="0"/>';
		t[t.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>';
		if (t.length > 2) {
			t[t.length] = "</styleSheet>";
			t[1] = t[1].replace("/>", ">")
		}
		return t.join("")
	}

	function ho(e, r) {
		var t = e._R(2);
		var a = mt(e, r - 2);
		return [t, a]
	}

	function uo(e, r, t) {
		if (!t) t = Wr(6 + 4 * r.length);
		t._W(2, e);
		bt(r, t);
		var a = t.length > t.l ? t.slice(0, t.l) : t;
		if (t.l == null) t.l = t.length;
		return a
	}

	function po(e, r, t) {
		var a = {};
		a.sz = e._R(2) / 20;
		var n = jt(e, 2, t);
		if (n.fCondense) a.condense = 1;
		if (n.fExtend) a.extend = 1;
		if (n.fShadow) a.shadow = 1;
		if (n.fOutline) a.outline = 1;
		if (n.fStrikeout) a.strike = 1;
		if (n.fItalic) a.italic = 1;
		var i = e._R(2);
		if (i === 700) a.bold = 1;
		switch (e._R(2)) {
			case 1:
				a.vertAlign = "superscript";
				break;
			case 2:
				a.vertAlign = "subscript";
				break;
		}
		var s = e._R(1);
		if (s != 0) a.underline = s;
		var f = e._R(1);
		if (f > 0) a.family = f;
		var o = e._R(1);
		if (o > 0) a.charset = o;
		e.l++;
		a.color = Xt(e, 8);
		switch (e._R(1)) {
			case 1:
				a.scheme = "major";
				break;
			case 2:
				a.scheme = "minor";
				break;
		}
		a.name = mt(e, r - 21);
		return a
	}

	function vo(e, r) {
		if (!r) r = Wr(25 + 4 * 32);
		r._W(2, e.sz * 20);
		Kt(e, r);
		r._W(2, e.bold ? 700 : 400);
		var t = 0;
		if (e.vertAlign == "superscript") t = 1;
		else if (e.vertAlign == "subscript") t = 2;
		r._W(2, t);
		r._W(1, e.underline || 0);
		r._W(1, e.family || 0);
		r._W(1, e.charset || 0);
		r._W(1, 0);
		Gt(e.color, r);
		var a = 0;
		if (e.scheme == "major") a = 1;
		if (e.scheme == "minor") a = 2;
		r._W(1, a);
		bt(e.name, r);
		return r.length > r.l ? r.slice(0, r.l) : r
	}
	var go = ["none", "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid",
		"darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"
	];
	var mo = G(go);
	var bo = Hr;

	function Co(e, r) {
		if (!r) r = Wr(4 * 3 + 8 * 7 + 16 * 1);
		var t = mo[e.patternType];
		if (t == null) t = 40;
		r._W(4, t);
		var a = 0;
		if (t != 40) {
			Gt({
				auto: 1
			}, r);
			Gt({
				auto: 1
			}, r);
			for (; a < 12; ++a) r._W(4, 0)
		} else {
			for (; a < 4; ++a) r._W(4, 0);
			for (; a < 12; ++a) r._W(4, 0)
		}
		return r.length > r.l ? r.slice(0, r.l) : r
	}

	function Eo(e, r) {
		var t = e.l + r;
		var a = e._R(2);
		var n = e._R(2);
		e.l = t;
		return {
			ixfe: a,
			numFmtId: n
		}
	}

	function wo(e, r, t) {
		if (!t) t = Wr(16);
		t._W(2, r || 0);
		t._W(2, e.numFmtId || 0);
		t._W(2, 0);
		t._W(2, 0);
		t._W(2, 0);
		t._W(1, 0);
		t._W(1, 0);
		t._W(1, 0);
		t._W(1, 0);
		t._W(1, 0);
		t._W(1, 0);
		return t
	}

	function ko(e, r) {
		if (!r) r = Wr(10);
		r._W(1, 0);
		r._W(1, 0);
		r._W(4, 0);
		r._W(4, 0);
		return r
	}
	var So = Hr;

	function Ao(e, r) {
		if (!r) r = Wr(51);
		r._W(1, 0);
		ko(null, r);
		ko(null, r);
		ko(null, r);
		ko(null, r);
		ko(null, r);
		return r.length > r.l ? r.slice(0, r.l) : r
	}

	function _o(e, r) {
		if (!r) r = Wr(12 + 4 * 10);
		r._W(4, e.xfId);
		r._W(2, 1);
		r._W(1, +e.builtinId);
		r._W(1, 0);
		It(e.name || "", r);
		return r.length > r.l ? r.slice(0, r.l) : r
	}

	function Bo(e, r, t) {
		var a = Wr(4 + 256 * 2 * 4);
		a._W(4, e);
		It(r, a);
		It(t, a);
		return a.length > a.l ? a.slice(0, a.l) : a
	}

	function To(e, r, t) {
		var a = {};
		a.NumberFmt = [];
		for (var n in y._table) a.NumberFmt[n] = y._table[n];
		a.CellXf = [];
		a.Fonts = [];
		var i = [];
		var s = false;
		Vr(e, function f(e, n, o) {
			switch (o) {
				case 44:
					a.NumberFmt[e[0]] = e[1];
					y.load(e[1], e[0]);
					break;
				case 43:
					a.Fonts.push(e);
					if (e.color.theme != null && r && r.themeElements && r.themeElements.clrScheme) {
						e.color.rgb = Lf(r.themeElements.clrScheme[e.color.theme].rgb, e.color.tint || 0)
					}
					break;
				case 1025:
					break;
				case 45:
					break;
				case 46:
					break;
				case 47:
					if (i[i.length - 1] == "BrtBeginCellXFs") {
						a.CellXf.push(e)
					}
					break;
				case 48:
					;
				case 507:
					;
				case 572:
					;
				case 475:
					break;
				case 1171:
					;
				case 2102:
					;
				case 1130:
					;
				case 512:
					;
				case 2095:
					break;
				case 35:
					s = true;
					break;
				case 36:
					s = false;
					break;
				case 37:
					i.push(n);
					break;
				case 38:
					i.pop();
					break;
				default:
					if ((n || "").indexOf("Begin") > 0) i.push(n);
					else if ((n || "").indexOf("End") > 0) i.pop();
					else if (!s || t.WTF) throw new Error("Unexpected record " + o + " " + n);
			}
		});
		return a
	}

	function xo(e, r) {
		if (!r) return;
		var t = 0;
		[
			[5, 8],
			[23, 26],
			[41, 44],
			[50, 392]
		].forEach(function(e) {
			for (var a = e[0]; a <= e[1]; ++a)
				if (r[a] != null) ++t
		});
		if (t == 0) return;
		Xr(e, "BrtBeginFmts", gt(t));
		[
			[5, 8],
			[23, 26],
			[41, 44],
			[50, 392]
		].forEach(function(t) {
			for (var a = t[0]; a <= t[1]; ++a)
				if (r[a] != null) Xr(e, "BrtFmt", uo(a, r[a]))
		});
		Xr(e, "BrtEndFmts")
	}

	function yo(e) {
		var r = 1;
		if (r == 0) return;
		Xr(e, "BrtBeginFonts", gt(r));
		Xr(e, "BrtFont", vo({
			sz: 12,
			color: {
				theme: 1
			},
			name: "Calibri",
			family: 2,
			scheme: "minor"
		}));
		Xr(e, "BrtEndFonts")
	}

	function Io(e) {
		var r = 2;
		if (r == 0) return;
		Xr(e, "BrtBeginFills", gt(r));
		Xr(e, "BrtFill", Co({
			patternType: "none"
		}));
		Xr(e, "BrtFill", Co({
			patternType: "gray125"
		}));
		Xr(e, "BrtEndFills")
	}

	function Ro(e) {
		var r = 1;
		if (r == 0) return;
		Xr(e, "BrtBeginBorders", gt(r));
		Xr(e, "BrtBorder", Ao({}));
		Xr(e, "BrtEndBorders")
	}

	function Oo(e) {
		var r = 1;
		Xr(e, "BrtBeginCellStyleXFs", gt(r));
		Xr(e, "BrtXF", wo({
			numFmtId: 0,
			fontId: 0,
			fillId: 0,
			borderId: 0
		}, 65535));
		Xr(e, "BrtEndCellStyleXFs")
	}

	function Do(e, r) {
		Xr(e, "BrtBeginCellXFs", gt(r.length));
		r.forEach(function(r) {
			Xr(e, "BrtXF", wo(r, 0))
		});
		Xr(e, "BrtEndCellXFs")
	}

	function Fo(e) {
		var r = 1;
		Xr(e, "BrtBeginStyles", gt(r));
		Xr(e, "BrtStyle", _o({
			xfId: 0,
			builtinId: 0,
			name: "Normal"
		}));
		Xr(e, "BrtEndStyles")
	}

	function Po(e) {
		var r = 0;
		Xr(e, "BrtBeginDXFs", gt(r));
		Xr(e, "BrtEndDXFs")
	}

	function No(e) {
		var r = 0;
		Xr(e, "BrtBeginTableStyles", Bo(r, "TableStyleMedium9", "PivotStyleMedium4"));
		Xr(e, "BrtEndTableStyles")
	}

	function Lo() {
		return
	}

	function Mo(e, r) {
		var t = zr();
		Xr(t, "BrtBeginStyleSheet");
		xo(t, e.SSF);
		yo(t, e);
		Io(t, e);
		Ro(t, e);
		Oo(t, e);
		Do(t, r.cellXfs);
		Fo(t, e);
		Po(t, e);
		No(t, e);
		Lo(t, e);
		Xr(t, "BrtEndStyleSheet");
		return t.end()
	}
	_a.THEME = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme";

	function Uo(e, r, t) {
		r.themeElements.clrScheme = [];
		var a = {};
		(e[0].match(we) || []).forEach(function(e) {
			var n = Ae(e);
			switch (n[0]) {
				case "<a:clrScheme":
					;
				case "</a:clrScheme>":
					break;
				case "<a:srgbClr":
					a.rgb = n.val;
					break;
				case "<a:sysClr":
					a.rgb = n.lastClr;
					break;
				case "<a:dk1>":
					;
				case "</a:dk1>":
					;
				case "<a:lt1>":
					;
				case "</a:lt1>":
					;
				case "<a:dk2>":
					;
				case "</a:dk2>":
					;
				case "<a:lt2>":
					;
				case "</a:lt2>":
					;
				case "<a:accent1>":
					;
				case "</a:accent1>":
					;
				case "<a:accent2>":
					;
				case "</a:accent2>":
					;
				case "<a:accent3>":
					;
				case "</a:accent3>":
					;
				case "<a:accent4>":
					;
				case "</a:accent4>":
					;
				case "<a:accent5>":
					;
				case "</a:accent5>":
					;
				case "<a:accent6>":
					;
				case "</a:accent6>":
					;
				case "<a:hlink>":
					;
				case "</a:hlink>":
					;
				case "<a:folHlink>":
					;
				case "</a:folHlink>":
					if (n[0].charAt(1) === "/") {
						r.themeElements.clrScheme.push(a);
						a = {}
					} else {
						a.name = n[0].slice(3, n[0].length - 1)
					}
					break;
				default:
					if (t && t.WTF) throw new Error("Unrecognized " + n[0] + " in clrScheme");
			}
		})
	}

	function Ho() {}

	function Wo() {}
	var Vo = /<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/;
	var zo = /<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/;
	var Xo = /<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/;

	function Go(e, r, t) {
		r.themeElements = {};
		var a;
		[
			["clrScheme", Vo, Uo],
			["fontScheme", zo, Ho],
			["fmtScheme", Xo, Wo]
		].forEach(function(n) {
			if (!(a = e.match(n[1]))) throw new Error(n[0] + " not found in themeElements");
			n[2](a, r, t)
		})
	}
	var jo = /<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;

	function Ko(e, r) {
		if (!e || e.length === 0) return Ko(Yo());
		var t;
		var a = {};
		if (!(t = e.match(jo))) throw new Error("themeElements not found in theme");
		Go(t[0], a, r);
		return a
	}

	function Yo(e, r) {
		if (r && r.themeXLSX) return r.themeXLSX;
		var t = [Ce];
		t[t.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">';
		t[t.length] = "<a:themeElements>";
		t[t.length] = '<a:clrScheme name="Office">';
		t[t.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>';
		t[t.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>';
		t[t.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>';
		t[t.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>';
		t[t.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>';
		t[t.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>';
		t[t.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>';
		t[t.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>';
		t[t.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>';
		t[t.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>';
		t[t.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>';
		t[t.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>';
		t[t.length] = "</a:clrScheme>";
		t[t.length] = '<a:fontScheme name="Office">';
		t[t.length] = "<a:majorFont>";
		t[t.length] = '<a:latin typeface="Cambria"/>';
		t[t.length] = '<a:ea typeface=""/>';
		t[t.length] = '<a:cs typeface=""/>';
		t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>';
		t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>';
		t[t.length] = '<a:font script="Hans" typeface="宋体"/>';
		t[t.length] = '<a:font script="Hant" typeface="新細明體"/>';
		t[t.length] = '<a:font script="Arab" typeface="Times New Roman"/>';
		t[t.length] = '<a:font script="Hebr" typeface="Times New Roman"/>';
		t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>';
		t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>';
		t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>';
		t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>';
		t[t.length] = '<a:font script="Khmr" typeface="MoolBoran"/>';
		t[t.length] = '<a:font script="Knda" typeface="Tunga"/>';
		t[t.length] = '<a:font script="Guru" typeface="Raavi"/>';
		t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>';
		t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>';
		t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>';
		t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>';
		t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>';
		t[t.length] = '<a:font script="Deva" typeface="Mangal"/>';
		t[t.length] = '<a:font script="Telu" typeface="Gautami"/>';
		t[t.length] = '<a:font script="Taml" typeface="Latha"/>';
		t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>';
		t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>';
		t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>';
		t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>';
		t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>';
		t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>';
		t[t.length] = '<a:font script="Viet" typeface="Times New Roman"/>';
		t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>';
		t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>';
		t[t.length] = "</a:majorFont>";
		t[t.length] = "<a:minorFont>";
		t[t.length] = '<a:latin typeface="Calibri"/>';
		t[t.length] = '<a:ea typeface=""/>';
		t[t.length] = '<a:cs typeface=""/>';
		t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>';
		t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>';
		t[t.length] = '<a:font script="Hans" typeface="宋体"/>';
		t[t.length] = '<a:font script="Hant" typeface="新細明體"/>';
		t[t.length] = '<a:font script="Arab" typeface="Arial"/>';
		t[t.length] = '<a:font script="Hebr" typeface="Arial"/>';
		t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>';
		t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>';
		t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>';
		t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>';
		t[t.length] = '<a:font script="Khmr" typeface="DaunPenh"/>';
		t[t.length] = '<a:font script="Knda" typeface="Tunga"/>';
		t[t.length] = '<a:font script="Guru" typeface="Raavi"/>';
		t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>';
		t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>';
		t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>';
		t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>';
		t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>';
		t[t.length] = '<a:font script="Deva" typeface="Mangal"/>';
		t[t.length] = '<a:font script="Telu" typeface="Gautami"/>';
		t[t.length] = '<a:font script="Taml" typeface="Latha"/>';
		t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>';
		t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>';
		t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>';
		t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>';
		t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>';
		t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>';
		t[t.length] = '<a:font script="Viet" typeface="Arial"/>';
		t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>';
		t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>';
		t[t.length] = "</a:minorFont>";
		t[t.length] = "</a:fontScheme>";
		t[t.length] = '<a:fmtScheme name="Office">';
		t[t.length] = "<a:fillStyleLst>";
		t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';
		t[t.length] = '<a:gradFill rotWithShape="1">';
		t[t.length] = "<a:gsLst>";
		t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
		t[t.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
		t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
		t[t.length] = "</a:gsLst>";
		t[t.length] = '<a:lin ang="16200000" scaled="1"/>';
		t[t.length] = "</a:gradFill>";
		t[t.length] = '<a:gradFill rotWithShape="1">';
		t[t.length] = "<a:gsLst>";
		t[t.length] =
			'<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>';
		t[t.length] =
			'<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
		t[t.length] = "</a:gsLst>";
		t[t.length] = '<a:lin ang="16200000" scaled="0"/>';
		t[t.length] = "</a:gradFill>";
		t[t.length] = "</a:fillStyleLst>";
		t[t.length] = "<a:lnStyleLst>";
		t[t.length] =
			'<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>';
		t[t.length] =
			'<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>';
		t[t.length] =
			'<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>';
		t[t.length] = "</a:lnStyleLst>";
		t[t.length] = "<a:effectStyleLst>";
		t[t.length] = "<a:effectStyle>";
		t[t.length] = "<a:effectLst>";
		t[t.length] =
			'<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>';
		t[t.length] = "</a:effectLst>";
		t[t.length] = "</a:effectStyle>";
		t[t.length] = "<a:effectStyle>";
		t[t.length] = "<a:effectLst>";
		t[t.length] =
			'<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>';
		t[t.length] = "</a:effectLst>";
		t[t.length] = "</a:effectStyle>";
		t[t.length] = "<a:effectStyle>";
		t[t.length] = "<a:effectLst>";
		t[t.length] =
			'<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>';
		t[t.length] = "</a:effectLst>";
		t[t.length] =
			'<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>';
		t[t.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>';
		t[t.length] = "</a:effectStyle>";
		t[t.length] = "</a:effectStyleLst>";
		t[t.length] = "<a:bgFillStyleLst>";
		t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';
		t[t.length] = '<a:gradFill rotWithShape="1">';
		t[t.length] = "<a:gsLst>";
		t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
		t[t.length] =
			'<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
		t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>';
		t[t.length] = "</a:gsLst>";
		t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>';
		t[t.length] = "</a:gradFill>";
		t[t.length] = '<a:gradFill rotWithShape="1">';
		t[t.length] = "<a:gsLst>";
		t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
		t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>';
		t[t.length] = "</a:gsLst>";
		t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>';
		t[t.length] = "</a:gradFill>";
		t[t.length] = "</a:bgFillStyleLst>";
		t[t.length] = "</a:fmtScheme>";
		t[t.length] = "</a:themeElements>";
		t[t.length] = "<a:objectDefaults>";
		t[t.length] = "<a:spDef>";
		t[t.length] =
			'<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>';
		t[t.length] = "</a:spDef>";
		t[t.length] = "<a:lnDef>";
		t[t.length] =
			'<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>';
		t[t.length] = "</a:lnDef>";
		t[t.length] = "</a:objectDefaults>";
		t[t.length] = "<a:extraClrSchemeLst/>";
		t[t.length] = "</a:theme>";
		return t.join("")
	}

	function $o(e, r, t) {
		var a = e.l + r;
		var n = e._R(4);
		if (n === 124226) return;
		if (!t.cellStyles || !me) {
			e.l = a;
			return
		}
		var i = e.slice(e.l);
		e.l = a;
		var s;
		try {
			s = new me(i)
		} catch (f) {
			return
		}
		var o = ge(s, "theme/theme/theme1.xml", true);
		if (!o) return;
		return Ko(o, t)
	}

	function Zo(e) {
		return e._R(4)
	}

	function Qo(e) {
		var r = {};
		r.xclrType = e._R(2);
		r.nTintShade = e._R(2);
		switch (r.xclrType) {
			case 0:
				e.l += 4;
				break;
			case 1:
				r.xclrValue = Jo(e, 4);
				break;
			case 2:
				r.xclrValue = Xn(e, 4);
				break;
			case 3:
				r.xclrValue = Zo(e, 4);
				break;
			case 4:
				e.l += 4;
				break;
		}
		e.l += 8;
		return r
	}

	function Jo(e, r) {
		return Hr(e, r)
	}

	function qo(e, r) {
		return Hr(e, r)
	}

	function el(e) {
		var r = e._R(2);
		var t = e._R(2) - 4;
		var a = [r];
		switch (r) {
			case 4:
				;
			case 5:
				;
			case 7:
				;
			case 8:
				;
			case 9:
				;
			case 10:
				;
			case 11:
				;
			case 13:
				a[1] = Qo(e, t);
				break;
			case 6:
				a[1] = qo(e, t);
				break;
			case 14:
				;
			case 15:
				a[1] = e._R(t === 1 ? 1 : 2);
				break;
			default:
				throw new Error("Unrecognized ExtProp type: " + r + " " + t);
		}
		return a
	}

	function rl(e, r) {
		var t = e.l + r;
		e.l += 2;
		var a = e._R(2);
		e.l += 2;
		var n = e._R(2);
		var i = [];
		while (n-- > 0) i.push(el(e, t - e.l));
		return {
			ixfe: a,
			ext: i
		}
	}

	function tl(e, r) {
		r.forEach(function(e) {
			switch (e[0]) {
				case 4:
					break;
				case 5:
					break;
				case 6:
					break;
				case 7:
					break;
				case 8:
					break;
				case 9:
					break;
				case 10:
					break;
				case 11:
					break;
				case 13:
					break;
				case 14:
					break;
				case 15:
					break;
			}
		})
	}

	function al(e) {
		var r = [];
		if (!e) return r;
		var t = 1;
		(e.match(we) || []).forEach(function(e) {
			var a = Ae(e);
			switch (a[0]) {
				case "<?xml":
					break;
				case "<calcChain":
					;
				case "<calcChain>":
					;
				case "</calcChain>":
					break;
				case "<c":
					delete a[0];
					if (a.i) t = a.i;
					else a.i = t;
					r.push(a);
					break;
			}
		});
		return r
	}

	function nl(e) {
		var r = {};
		r.i = e._R(4);
		var t = {};
		t.r = e._R(4);
		t.c = e._R(4);
		r.r = ft(t);
		var a = e._R(1);
		if (a & 2) r.l = "1";
		if (a & 8) r.a = "1";
		return r
	}

	function il(e, r, t) {
		var a = [];
		var n = false;
		Vr(e, function i(e, r, s) {
			switch (s) {
				case 63:
					a.push(e);
					break;
				default:
					if ((r || "").indexOf("Begin") > 0) {} else if ((r || "").indexOf("End") > 0) {} else if (!n || t.WTF) throw new Error(
						"Unexpected record " + s + " " + r);
			}
		});
		return a
	}

	function sl() {}

	function fl(e, r, t) {
		if (!e) return e;
		var a = t || {};
		var n = false,
			i = false;
		Vr(e, function s(e, r, t) {
			if (i) return;
			switch (t) {
				case 359:
					;
				case 363:
					;
				case 364:
					;
				case 366:
					;
				case 367:
					;
				case 368:
					;
				case 369:
					;
				case 370:
					;
				case 371:
					;
				case 472:
					;
				case 577:
					;
				case 578:
					;
				case 579:
					;
				case 580:
					;
				case 581:
					;
				case 582:
					;
				case 583:
					;
				case 584:
					;
				case 585:
					;
				case 586:
					;
				case 587:
					break;
				case 35:
					n = true;
					break;
				case 36:
					n = false;
					break;
				default:
					if ((r || "").indexOf("Begin") > 0) {} else if ((r || "").indexOf("End") > 0) {} else if (!n || a.WTF) throw new Error(
						"Unexpected record " + t.toString(16) + " " + r);
			}
		}, a)
	}
	_a.IMG = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";
	_a.DRAW = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing";

	function ol(e, r) {
		if (!e) return "??";
		var t = (e.match(/<c:chart [^>]*r:id="([^"]*)"/) || ["", ""])[1];
		return r["!id"][t].Target
	}
	var ll = 1024;

	function cl(e, r) {
		var t = [21600, 21600];
		var a = ["m0,0l0", t[1], t[0], t[1], t[0], "0xe"].join(",");
		var n = [qe("xml", null, {
			"xmlns:v": ar.v,
			"xmlns:o": ar.o,
			"xmlns:x": ar.x,
			"xmlns:mv": ar.mv
		}).replace(/\/>/, ">"), qe("o:shapelayout", qe("o:idmap", null, {
			"v:ext": "edit",
			data: e
		}), {
			"v:ext": "edit"
		}), qe("v:shapetype", [qe("v:stroke", null, {
			joinstyle: "miter"
		}), qe("v:path", null, {
			gradientshapeok: "t",
			"o:connecttype": "rect"
		})].join(""), {
			id: "_x0000_t202",
			"o:spt": 202,
			coordsize: t.join(","),
			path: a
		})];
		while (ll < e * 1e3) ll += 1e3;
		r.map(function(e) {
			return st(e[0])
		}).forEach(function(e) {
			n = n.concat(["<v:shape" + Je({
					id: "_x0000_s" + ++ll,
					type: "#_x0000_t202",
					style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10;visibility:hidden",
					fillcolor: "#ECFAD4",
					strokecolor: "#edeaa1"
				}) + ">", qe("v:fill", qe("o:fill", null, {
					type: "gradientUnscaled",
					"v:ext": "view"
				}), {
					color2: "#BEFF82",
					angle: "-180",
					type: "gradient"
				}), qe("v:shadow", null, {
					on: "t",
					obscured: "t"
				}), qe("v:path", null, {
					"o:connecttype": "none"
				}), '<v:textbox><div style="text-align:left"></div></v:textbox>', '<x:ClientData ObjectType="Note">', "<x:MoveWithCells/>",
				"<x:SizeWithCells/>", Qe("x:Anchor", [e.c, 0, e.r, 0, e.c + 3, 100, e.r + 5, 100].join(",")), Qe("x:AutoFill", "False"), Qe(
					"x:Row", String(e.r)), Qe("x:Column", String(e.c)), "<x:Visible/>", "</x:ClientData>", "</v:shape>"
			])
		});
		n.push("</xml>");
		return n.join("")
	}
	_a.CMNT = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments";

	function hl(e, r, t, a, n) {
		for (var i = 0; i != r.length; ++i) {
			var s = r[i];
			var f = Zd(ve(e, s.replace(/^\//, ""), true), s, n);
			if (!f || !f.length) continue;
			var o = z(t);
			for (var l = 0; l != o.length; ++l) {
				var c = o[l];
				var h = a[c];
				if (h) {
					var u = h[s];
					if (u) ul(c, t[c], f)
				}
			}
		}
	}

	function ul(e, r, t) {
		var a = Array.isArray(r);
		var n, i;
		t.forEach(function(e) {
			if (a) {
				i = st(e.ref);
				if (!r[i.r]) r[i.r] = [];
				n = r[i.r][i.c]
			} else n = r[e.ref];
			if (!n) {
				n = {};
				if (a) r[i.r][i.c] = n;
				else r[e.ref] = n;
				var t = ct(r["!ref"] || "BDWGO1000001:A1");
				var s = st(e.ref);
				if (t.s.r > s.r) t.s.r = s.r;
				if (t.e.r < s.r) t.e.r = s.r;
				if (t.s.c > s.c) t.s.c = s.c;
				if (t.e.c < s.c) t.e.c = s.c;
				var f = lt(t);
				if (f !== r["!ref"]) r["!ref"] = f
			}
			if (!n.c) n.c = [];
			var o = {
				a: e.author,
				t: e.t,
				r: e.r
			};
			if (e.h) o.h = e.h;
			n.c.push(o)
		})
	}

	function dl(e, r) {
		if (e.match(/<(?:\w+:)?comments *\/>/)) return [];
		var t = [];
		var a = [];
		var n = e.match(/<(?:\w+:)?authors>([\s\S]*)<\/(?:\w+:)?authors>/);
		if (n && n[1]) n[1].split(/<\/\w*:?author>/).forEach(function(e) {
			if (e === "" || e.trim() === "") return;
			var r = e.match(/<(?:\w+:)?author[^>]*>(.*)/);
			if (r) t.push(r[1])
		});
		var i = e.match(/<(?:\w+:)?commentList>([\s\S]*)<\/(?:\w+:)?commentList>/);
		if (i && i[1]) i[1].split(/<\/\w*:?comment>/).forEach(function(e) {
			if (e === "" || e.trim() === "") return;
			var n = e.match(/<(?:\w+:)?comment[^>]*>/);
			if (!n) return;
			var i = Ae(n[0]);
			var s = {
				author: i.authorId && t[i.authorId] || "sheetjsghost",
				ref: i.ref,
				guid: i.guid
			};
			var f = st(i.ref);
			if (r.sheetRows && r.sheetRows <= f.r) return;
			var o = e.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/);
			var l = !!o && !!o[1] && Zs(o[1]) || {
				r: "",
				t: "",
				h: ""
			};
			s.r = l.r;
			if (l.r == "<t></t>") l.t = l.h = "";
			s.t = l.t.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
			if (r.cellHTML) s.h = l.h;
			a.push(s)
		});
		return a
	}
	var pl = qe("comments", null, {
		xmlns: tr.main[0]
	});

	function vl(e) {
		var r = [Ce, pl];
		var t = [];
		r.push("<authors>");
		e.map(function(e) {
			return e[1]
		}).forEach(function(e) {
			e.map(function(e) {
				return Re(e.a)
			}).forEach(function(e) {
				if (t.indexOf(e) > -1) return;
				t.push(e);
				r.push("<author>" + e + "</author>")
			})
		});
		r.push("</authors>");
		r.push("<commentList>");
		e.forEach(function(e) {
			e[1].forEach(function(a) {
				r.push('<comment ref="' + e[0] + '" authorId="' + t.indexOf(Re(a.a)) + '"><text>');
				r.push(Qe("t", a.t == null ? "" : a.t));
				r.push("</text></comment>")
			})
		});
		r.push("</commentList>");
		if (r.length > 2) {
			r[r.length] = "</comments>";
			r[1] = r[1].replace("/>", ">")
		}
		return r.join("")
	}

	function gl(e) {
		var r = {};
		r.iauthor = e._R(4);
		var t = Mt(e, 16);
		r.rfx = t.s;
		r.ref = ft(t.s);
		e.l += 16;
		return r
	}

	function ml(e, r) {
		if (r == null) r = Wr(36);
		r._W(4, e[1].iauthor);
		Ut(e[0], r);
		r._W(4, 0);
		r._W(4, 0);
		r._W(4, 0);
		r._W(4, 0);
		return r
	}
	var bl = mt;

	function Cl(e) {
		return bt(e.slice(0, 54))
	}

	function El(e, r) {
		var t = [];
		var a = [];
		var n = {};
		var i = false;
		Vr(e, function s(e, f, o) {
			switch (o) {
				case 632:
					a.push(e);
					break;
				case 635:
					n = e;
					break;
				case 637:
					n.t = e.t;
					n.h = e.h;
					n.r = e.r;
					break;
				case 636:
					n.author = a[n.iauthor];
					delete n.iauthor;
					if (r.sheetRows && r.sheetRows <= n.rfx.r) break;
					if (!n.t) n.t = "";
					delete n.rfx;
					t.push(n);
					break;
				case 35:
					i = true;
					break;
				case 36:
					i = false;
					break;
				case 37:
					break;
				case 38:
					break;
				default:
					if ((f || "").indexOf("Begin") > 0) {} else if ((f || "").indexOf("End") > 0) {} else if (!i || r.WTF) throw new Error(
						"Unexpected record " + o + " " + f);
			}
		});
		return t
	}

	function wl(e) {
		var r = zr();
		var t = [];
		Xr(r, "BrtBeginComments");
		Xr(r, "BrtBeginCommentAuthors");
		e.forEach(function(e) {
			e[1].forEach(function(e) {
				if (t.indexOf(e.a) > -1) return;
				t.push(e.a.slice(0, 54));
				Xr(r, "BrtCommentAuthor", Cl(e.a))
			})
		});
		Xr(r, "BrtEndCommentAuthors");
		Xr(r, "BrtBeginCommentList");
		e.forEach(function(e) {
			e[1].forEach(function(a) {
				a.iauthor = t.indexOf(a.a);
				var n = {
					s: st(e[0]),
					e: st(e[0])
				};
				Xr(r, "BrtBeginComment", ml([n, a]));
				if (a.t && a.t.length > 0) Xr(r, "BrtCommentText", At(a));
				Xr(r, "BrtEndComment");
				delete a.iauthor
			})
		});
		Xr(r, "BrtEndCommentList");
		Xr(r, "BrtEndComments");
		return r.end()
	}
	var kl = "application/vnd.ms-office.vbaProject";

	function Sl(e) {
		var r = L.utils.cfb_new({
			root: "R"
		});
		e.FullPaths.forEach(function(t, a) {
			if (t.slice(-1) === "/" || !t.match(/_VBA_PROJECT_CUR/)) return;
			var n = t.replace(/^[^\/]*/, "R").replace(/\/_VBA_PROJECT_CUR\u0000*/, "");
			L.utils.cfb_add(r, n, e.FileIndex[a].content)
		});
		return L.write(r)
	}

	function Al(e, r) {
		r.FullPaths.forEach(function(t, a) {
			if (a == 0) return;
			var n = t.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
			if (n.slice(-1) !== "/") L.utils.cfb_add(e, n, r.FileIndex[a].content)
		})
	}
	var _l = ["xlsb", "xlsm", "xlam", "biff8", "xla"];
	_a.DS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet";
	_a.MS = "http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet";

	function Bl() {
		return {
			"!type": "dialog"
		}
	}

	function Tl() {
		return {
			"!type": "dialog"
		}
	}

	function xl() {
		return {
			"!type": "macro"
		}
	}

	function yl() {
		return {
			"!type": "macro"
		}
	}
	var Il = function() {
		var e = /(^|[^A-Za-z])R(\[?)(-?\d+|)\]?C(\[?)(-?\d+|)\]?/g;
		var r = {
			r: 0,
			c: 0
		};

		function t(e, t, a, n, i, s) {
			var f = n.length > 0 ? parseInt(n, 10) | 0 : 0,
				o = s.length > 0 ? parseInt(s, 10) | 0 : 0;
			if (o < 0 && i.length === 0) o = 0;
			var l = false,
				c = false;
			if (i.length > 0 || s.length == 0) l = true;
			if (l) o += r.c;
			else --o;
			if (a.length > 0 || n.length == 0) c = true;
			if (c) f += r.r;
			else --f;
			return t + (l ? "" : "$") + tt(o) + (c ? "" : "$") + Jr(f)
		}
		return function a(n, i) {
			r = i;
			return n.replace(e, t)
		}
	}();
	var Rl =
		/(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)([1-9]\d{0,5}|10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6])(?![_.\(A-Za-z0-9])/g;
	var Ol = function() {
		return function e(r, t) {
			return r.replace(Rl, function(e, r, a, n, i, s) {
				var f = rt(n) - (a ? 0 : t.c);
				var o = Qr(s) - (i ? 0 : t.r);
				var l = o == 0 ? "" : !i ? "[" + o + "]" : o + 1;
				var c = f == 0 ? "" : !a ? "[" + f + "]" : f + 1;
				return r + "R" + l + "C" + c
			})
		}
	}();

	function Dl(e, r) {
		return e.replace(Rl, function(e, t, a, n, i, s) {
			return t + (a == "$" ? a + n : tt(rt(n) + r.c)) + (i == "$" ? i + s : Jr(Qr(s) + r.r))
		})
	}

	function Fl(e, r, t) {
		var a = ot(r),
			n = a.s,
			i = st(t);
		var s = {
			r: i.r - n.r,
			c: i.c - n.c
		};
		return Dl(e, s)
	}

	function Pl(e) {
		if (e.length == 1) return false;
		return true
	}

	function Nl(e) {
		return e.replace(/_xlfn\./g, "")
	}

	function Ll(e) {
		e.l += 1;
		return
	}

	function Ml(e, r) {
		var t = e._R(r == 1 ? 1 : 2);
		return [t & 16383, t >> 14 & 1, t >> 15 & 1]
	}

	function Ul(e, r, t) {
		var a = 2;
		if (t) {
			if (t.biff >= 2 && t.biff <= 5) return Hl(e, r, t);
			else if (t.biff == 12) a = 4
		}
		var n = e._R(a),
			i = e._R(a);
		var s = Ml(e, 2);
		var f = Ml(e, 2);
		return {
			s: {
				r: n,
				c: s[0],
				cRel: s[1],
				rRel: s[2]
			},
			e: {
				r: i,
				c: f[0],
				cRel: f[1],
				rRel: f[2]
			}
		}
	}

	function Hl(e) {
		var r = Ml(e, 2),
			t = Ml(e, 2);
		var a = e._R(1);
		var n = e._R(1);
		return {
			s: {
				r: r[0],
				c: a,
				cRel: r[1],
				rRel: r[2]
			},
			e: {
				r: t[0],
				c: n,
				cRel: t[1],
				rRel: t[2]
			}
		}
	}

	function Wl(e, r, t) {
		if (t.biff < 8) return Hl(e, r, t);
		var a = e._R(t.biff == 12 ? 4 : 2),
			n = e._R(t.biff == 12 ? 4 : 2);
		var i = Ml(e, 2);
		var s = Ml(e, 2);
		return {
			s: {
				r: a,
				c: i[0],
				cRel: i[1],
				rRel: i[2]
			},
			e: {
				r: n,
				c: s[0],
				cRel: s[1],
				rRel: s[2]
			}
		}
	}

	function Vl(e, r, t) {
		if (t && t.biff >= 2 && t.biff <= 5) return zl(e, r, t);
		var a = e._R(t && t.biff == 12 ? 4 : 2);
		var n = Ml(e, 2);
		return {
			r: a,
			c: n[0],
			cRel: n[1],
			rRel: n[2]
		}
	}

	function zl(e) {
		var r = Ml(e, 2);
		var t = e._R(1);
		return {
			r: r[0],
			c: t,
			cRel: r[1],
			rRel: r[2]
		}
	}

	function Xl(e) {
		var r = e._R(2);
		var t = e._R(2);
		return {
			r: r,
			c: t & 255,
			fQuoted: !!(t & 16384),
			cRel: t >> 15,
			rRel: t >> 15
		}
	}

	function Gl(e, r, t) {
		var a = t && t.biff ? t.biff : 8;
		if (a >= 2 && a <= 5) return jl(e, r, t);
		var n = e._R(a >= 12 ? 4 : 2);
		var i = e._R(2);
		var s = (i & 16384) >> 14,
			f = (i & 32768) >> 15;
		i &= 16383;
		if (f == 1)
			while (n > 524287) n -= 1048576;
		if (s == 1)
			while (i > 8191) i = i - 16384;
		return {
			r: n,
			c: i,
			cRel: s,
			rRel: f
		}
	}

	function jl(e) {
		var r = e._R(2);
		var t = e._R(1);
		var a = (r & 32768) >> 15,
			n = (r & 16384) >> 14;
		r &= 16383;
		if (a == 1 && r >= 8192) r = r - 16384;
		if (n == 1 && t >= 128) t = t - 256;
		return {
			r: r,
			c: t,
			cRel: n,
			rRel: a
		}
	}

	function Kl(e, r, t) {
		var a = (e[e.l++] & 96) >> 5;
		var n = Ul(e, t.biff >= 2 && t.biff <= 5 ? 6 : 8, t);
		return [a, n]
	}

	function Yl(e, r, t) {
		var a = (e[e.l++] & 96) >> 5;
		var n = e._R(2, "i");
		var i = 8;
		if (t) switch (t.biff) {
			case 5:
				e.l += 12;
				i = 6;
				break;
			case 12:
				i = 12;
				break;
		}
		var s = Ul(e, i, t);
		return [a, n, s]
	}

	function $l(e, r, t) {
		var a = (e[e.l++] & 96) >> 5;
		e.l += t && t.biff > 8 ? 12 : 8;
		return [a]
	}

	function Zl(e, r, t) {
		var a = (e[e.l++] & 96) >> 5;
		var n = e._R(2);
		var i = 8;
		if (t) switch (t.biff) {
			case 5:
				e.l += 12;
				i = 6;
				break;
			case 12:
				i = 12;
				break;
		}
		e.l += i;
		return [a, n]
	}

	function Ql(e, r, t) {
		var a = (e[e.l++] & 96) >> 5;
		var n = Wl(e, r - 1, t);
		return [a, n]
	}

	function Jl(e, r, t) {
		var a = (e[e.l++] & 96) >> 5;
		e.l += t.biff == 2 ? 6 : t.biff == 12 ? 14 : 7;
		return [a]
	}

	function ql(e) {
		var r = e[e.l + 1] & 1;
		var t = 1;
		e.l += 4;
		return [r, t]
	}

	function ec(e, r, t) {
		e.l += 2;
		var a = e._R(t && t.biff == 2 ? 1 : 2);
		var n = [];
		for (var i = 0; i <= a; ++i) n.push(e._R(t && t.biff == 2 ? 1 : 2));
		return n
	}

	function rc(e, r, t) {
		var a = e[e.l + 1] & 255 ? 1 : 0;
		e.l += 2;
		return [a, e._R(t && t.biff == 2 ? 1 : 2)]
	}

	function tc(e, r, t) {
		var a = e[e.l + 1] & 255 ? 1 : 0;
		e.l += 2;
		return [a, e._R(t && t.biff == 2 ? 1 : 2)]
	}

	function ac(e) {
		var r = e[e.l + 1] & 255 ? 1 : 0;
		e.l += 2;
		return [r, e._R(2)]
	}

	function nc(e, r, t) {
		var a = e[e.l + 1] & 255 ? 1 : 0;
		e.l += t && t.biff == 2 ? 3 : 4;
		return [a]
	}

	function ic(e) {
		var r = e._R(1),
			t = e._R(1);
		return [r, t]
	}

	function sc(e) {
		e._R(2);
		return ic(e, 2)
	}

	function fc(e) {
		e._R(2);
		return ic(e, 2)
	}

	function oc(e, r, t) {
		var a = (e[e.l] & 96) >> 5;
		e.l += 1;
		var n = Vl(e, 0, t);
		return [a, n]
	}

	function lc(e, r, t) {
		var a = (e[e.l] & 96) >> 5;
		e.l += 1;
		var n = Gl(e, 0, t);
		return [a, n]
	}

	function cc(e, r, t) {
		var a = (e[e.l] & 96) >> 5;
		e.l += 1;
		var n = e._R(2);
		if (t && t.biff == 5) e.l += 12;
		var i = Vl(e, 0, t);
		return [a, n, i]
	}

	function hc(e, r, t) {
		var a = (e[e.l] & 96) >> 5;
		e.l += 1;
		var n = e._R(t && t.biff <= 3 ? 1 : 2);
		return [Ch[n], bh[n], a]
	}

	function uc(e, r, t) {
		e.l++;
		var a = e._R(1),
			n = t && t.biff <= 3 ? [0, e._R(1)] : dc(e);
		return [a, (n[0] === 0 ? bh : mh)[n[1]]]
	}

	function dc(e) {
		return [e[e.l + 1] >> 7, e._R(2) & 32767]
	}

	function pc(e, r, t) {
		e.l += t && t.biff == 2 ? 3 : 4;
		return
	}

	function vc(e, r, t) {
		e.l++;
		if (t && t.biff == 12) return [e._R(4, "i"), 0];
		var a = e._R(2);
		var n = e._R(t && t.biff == 2 ? 1 : 2);
		return [a, n]
	}

	function gc(e) {
		e.l++;
		return Vt[e._R(1)]
	}

	function mc(e) {
		e.l++;
		return e._R(2)
	}

	function bc(e) {
		e.l++;
		return e._R(1) !== 0
	}

	function Cc(e) {
		e.l++;
		return Ht(e, 8)
	}

	function Ec(e, r, t) {
		e.l++;
		return Rn(e, r - 1, t)
	}

	function wc(e, r) {
		var t = [e._R(1)];
		if (r == 12) switch (t[0]) {
			case 2:
				t[0] = 4;
				break;
			case 4:
				t[0] = 16;
				break;
			case 0:
				t[0] = 1;
				break;
			case 1:
				t[0] = 2;
				break;
		}
		switch (t[0]) {
			case 4:
				t[1] = An(e, 1) ? "TRUE" : "FALSE";
				if (r != 12) e.l += 7;
				break;
			case 16:
				t[1] = Vt[e[e.l]];
				e.l += r == 12 ? 4 : 8;
				break;
			case 0:
				e.l += 8;
				break;
			case 1:
				t[1] = Ht(e, 8);
				break;
			case 2:
				t[1] = Pn(e, 0, {
					biff: r > 0 && r < 8 ? 2 : r
				});
				break;
			default:
				throw "Bad SerAr: " + t[0];
		}
		return t
	}

	function kc(e, r, t) {
		var a = e._R(t.biff == 12 ? 4 : 2);
		var n = [];
		for (var i = 0; i != a; ++i) n.push((t.biff == 12 ? Mt : qn)(e, 8));
		return n
	}

	function Sc(e, r, t) {
		var a = 0,
			n = 0;
		if (t.biff == 12) {
			a = e._R(4);
			n = e._R(4)
		} else {
			n = 1 + e._R(1);
			a = 1 + e._R(2)
		}
		if (t.biff >= 2 && t.biff < 8) {
			--a;
			if (--n == 0) n = 256
		}
		for (var i = 0, s = []; i != a && (s[i] = []); ++i)
			for (var f = 0; f != n; ++f) s[i][f] = wc(e, t.biff);
		return s
	}

	function Ac(e, r, t) {
		var a = e._R(1) >>> 5 & 3;
		var n = !t || t.biff >= 8 ? 4 : 2;
		var i = e._R(n);
		switch (t.biff) {
			case 2:
				e.l += 5;
				break;
			case 3:
				;
			case 4:
				e.l += 8;
				break;
			case 5:
				e.l += 12;
				break;
		}
		return [a, 0, i]
	}

	function _c(e, r, t) {
		if (t.biff == 5) return Bc(e, r, t);
		var a = e._R(1) >>> 5 & 3;
		var n = e._R(2);
		var i = e._R(4);
		return [a, n, i]
	}

	function Bc(e) {
		var r = e._R(1) >>> 5 & 3;
		var t = e._R(2, "i");
		e.l += 8;
		var a = e._R(2);
		e.l += 12;
		return [r, t, a]
	}

	function Tc(e, r, t) {
		var a = e._R(1) >>> 5 & 3;
		e.l += t && t.biff == 2 ? 3 : 4;
		var n = e._R(t && t.biff == 2 ? 1 : 2);
		return [a, n]
	}

	function xc(e, r, t) {
		var a = e._R(1) >>> 5 & 3;
		var n = e._R(t && t.biff == 2 ? 1 : 2);
		return [a, n]
	}

	function yc(e, r, t) {
		var a = e._R(1) >>> 5 & 3;
		e.l += 4;
		if (t.biff < 8) e.l--;
		if (t.biff == 12) e.l += 2;
		return [a]
	}

	function Ic(e, r, t) {
		var a = (e[e.l++] & 96) >> 5;
		var n = e._R(2);
		var i = 4;
		if (t) switch (t.biff) {
			case 5:
				i = 15;
				break;
			case 12:
				i = 6;
				break;
		}
		e.l += i;
		return [a, n]
	}
	var Rc = Hr;
	var Oc = Hr;
	var Dc = Hr;

	function Fc(e, r, t) {
		e.l += 2;
		return [Xl(e, 4, t)]
	}

	function Pc(e) {
		e.l += 6;
		return []
	}
	var Nc = Fc;
	var Lc = Pc;
	var Mc = Pc;
	var Uc = Fc;

	function Hc(e) {
		e.l += 2;
		return [Bn(e), e._R(2) & 1]
	}
	var Wc = Fc;
	var Vc = Hc;
	var zc = Pc;
	var Xc = Fc;
	var Gc = Fc;

	function jc(e) {
		e.l += 2;
		var r = e._R(2);
		e.l += 10;
		return {
			ixti: r
		}
	}

	function Kc(e) {
		e.l += 2;
		return [e._R(4)]
	}
	var Yc = {
		1: {
			n: "PtgExp",
			f: vc
		},
		2: {
			n: "PtgTbl",
			f: Dc
		},
		3: {
			n: "PtgAdd",
			f: Ll
		},
		4: {
			n: "PtgSub",
			f: Ll
		},
		5: {
			n: "PtgMul",
			f: Ll
		},
		6: {
			n: "PtgDiv",
			f: Ll
		},
		7: {
			n: "PtgPower",
			f: Ll
		},
		8: {
			n: "PtgConcat",
			f: Ll
		},
		9: {
			n: "PtgLt",
			f: Ll
		},
		10: {
			n: "PtgLe",
			f: Ll
		},
		11: {
			n: "PtgEq",
			f: Ll
		},
		12: {
			n: "PtgGe",
			f: Ll
		},
		13: {
			n: "PtgGt",
			f: Ll
		},
		14: {
			n: "PtgNe",
			f: Ll
		},
		15: {
			n: "PtgIsect",
			f: Ll
		},
		16: {
			n: "PtgUnion",
			f: Ll
		},
		17: {
			n: "PtgRange",
			f: Ll
		},
		18: {
			n: "PtgUplus",
			f: Ll
		},
		19: {
			n: "PtgUminus",
			f: Ll
		},
		20: {
			n: "PtgPercent",
			f: Ll
		},
		21: {
			n: "PtgParen",
			f: Ll
		},
		22: {
			n: "PtgMissArg",
			f: Ll
		},
		23: {
			n: "PtgStr",
			f: Ec
		},
		28: {
			n: "PtgErr",
			f: gc
		},
		29: {
			n: "PtgBool",
			f: bc
		},
		30: {
			n: "PtgInt",
			f: mc
		},
		31: {
			n: "PtgNum",
			f: Cc
		},
		32: {
			n: "PtgArray",
			f: Jl
		},
		33: {
			n: "PtgFunc",
			f: hc
		},
		34: {
			n: "PtgFuncVar",
			f: uc
		},
		35: {
			n: "PtgName",
			f: Ac
		},
		36: {
			n: "PtgRef",
			f: oc
		},
		37: {
			n: "PtgArea",
			f: Kl
		},
		38: {
			n: "PtgMemArea",
			f: Tc
		},
		39: {
			n: "PtgMemErr",
			f: Rc
		},
		40: {
			n: "PtgMemNoMem",
			f: Oc
		},
		41: {
			n: "PtgMemFunc",
			f: xc
		},
		42: {
			n: "PtgRefErr",
			f: yc
		},
		43: {
			n: "PtgAreaErr",
			f: $l
		},
		44: {
			n: "PtgRefN",
			f: lc
		},
		45: {
			n: "PtgAreaN",
			f: Ql
		},
		57: {
			n: "PtgNameX",
			f: _c
		},
		58: {
			n: "PtgRef3d",
			f: cc
		},
		59: {
			n: "PtgArea3d",
			f: Yl
		},
		60: {
			n: "PtgRefErr3d",
			f: Ic
		},
		61: {
			n: "PtgAreaErr3d",
			f: Zl
		},
		255: {}
	};
	var $c = {
		64: 32,
		96: 32,
		65: 33,
		97: 33,
		66: 34,
		98: 34,
		67: 35,
		99: 35,
		68: 36,
		100: 36,
		69: 37,
		101: 37,
		70: 38,
		102: 38,
		71: 39,
		103: 39,
		72: 40,
		104: 40,
		73: 41,
		105: 41,
		74: 42,
		106: 42,
		75: 43,
		107: 43,
		76: 44,
		108: 44,
		77: 45,
		109: 45,
		89: 57,
		121: 57,
		90: 58,
		122: 58,
		91: 59,
		123: 59,
		92: 60,
		124: 60,
		93: 61,
		125: 61
	};
	(function() {
		for (var e in $c) Yc[e] = Yc[$c[e]]
	})();
	var Zc = {
		1: {
			n: "PtgElfLel",
			f: Hc
		},
		2: {
			n: "PtgElfRw",
			f: Xc
		},
		3: {
			n: "PtgElfCol",
			f: Nc
		},
		6: {
			n: "PtgElfRwV",
			f: Gc
		},
		7: {
			n: "PtgElfColV",
			f: Uc
		},
		10: {
			n: "PtgElfRadical",
			f: Wc
		},
		11: {
			n: "PtgElfRadicalS",
			f: zc
		},
		13: {
			n: "PtgElfColS",
			f: Lc
		},
		15: {
			n: "PtgElfColSV",
			f: Mc
		},
		16: {
			n: "PtgElfRadicalLel",
			f: Vc
		},
		25: {
			n: "PtgList",
			f: jc
		},
		29: {
			n: "PtgSxName",
			f: Kc
		},
		255: {}
	};
	var Qc = {
		1: {
			n: "PtgAttrSemi",
			f: nc
		},
		2: {
			n: "PtgAttrIf",
			f: tc
		},
		4: {
			n: "PtgAttrChoose",
			f: ec
		},
		8: {
			n: "PtgAttrGoto",
			f: rc
		},
		16: {
			n: "PtgAttrSum",
			f: pc
		},
		32: {
			n: "PtgAttrBaxcel",
			f: ql
		},
		64: {
			n: "PtgAttrSpace",
			f: sc
		},
		65: {
			n: "PtgAttrSpaceSemi",
			f: fc
		},
		128: {
			n: "PtgAttrIfError",
			f: ac
		},
		255: {}
	};
	Qc[33] = Qc[32];

	function Jc(e, r, t, a) {
		if (a.biff < 8) return Hr(e, r);
		var n = e.l + r;
		var i = [];
		for (var s = 0; s !== t.length; ++s) {
			switch (t[s][0]) {
				case "PtgArray":
					t[s][1] = Sc(e, 0, a);
					i.push(t[s][1]);
					break;
				case "PtgMemArea":
					t[s][2] = kc(e, t[s][1], a);
					i.push(t[s][2]);
					break;
				case "PtgExp":
					if (a && a.biff == 12) {
						t[s][1][1] = e._R(4);
						i.push(t[s][1])
					}
					break;
				case "PtgList":
					;
				case "PtgElfRadicalS":
					;
				case "PtgElfColS":
					;
				case "PtgElfColSV":
					throw "Unsupported " + t[s][0];
				default:
					break;
			}
		}
		r = n - e.l;
		if (r !== 0) i.push(Hr(e, r));
		return i
	}

	function qc(e, r, t) {
		var a = e.l + r;
		var n, i, s = [];
		while (a != e.l) {
			r = a - e.l;
			i = e[e.l];
			n = Yc[i];
			if (i === 24 || i === 25) {
				i = e[e.l + 1];
				n = (i === 24 ? Zc : Qc)[i]
			}
			if (!n || !n.f) {
				Hr(e, r)
			} else {
				s.push([n.n, n.f(e, r, t)])
			}
		}
		return s
	}

	function eh(e) {
		var r = [];
		for (var t = 0; t < e.length; ++t) {
			var a = e[t],
				n = [];
			for (var i = 0; i < a.length; ++i) {
				var s = a[i];
				if (s) switch (s[0]) {
					case 2:
						n.push('"' + s[1].replace(/"/g, '""') + '"');
						break;
					default:
						n.push(s[1]);
				} else n.push("")
			}
			r.push(n.join(","))
		}
		return r.join(";")
	}
	var rh = {
		PtgAdd: "+",
		PtgConcat: "&",
		PtgDiv: "/",
		PtgEq: "=",
		PtgGe: ">=",
		PtgGt: ">",
		PtgLe: "<=",
		PtgLt: "<",
		PtgMul: "*",
		PtgNe: "<>",
		PtgPower: "^",
		PtgSub: "-"
	};

	function th(e, r) {
		if (!e && !(r && r.biff <= 5 && r.biff >= 2)) throw new Error("empty sheet name");
		if (e.indexOf(" ") > -1) return "'" + e + "'";
		return e
	}

	function ah(e, r, t) {
		if (!e) return "SH33TJSERR0";
		if (!e.XTI) return "SH33TJSERR6";
		var a = e.XTI[r];
		if (t.biff > 8 && !e.XTI[r]) return e.SheetNames[r];
		if (t.biff < 8) {
			if (r > 1e4) r -= 65536;
			if (r < 0) r = -r;
			return r == 0 ? "" : e.XTI[r - 1]
		}
		if (!a) return "SH33TJSERR1";
		var n = "";
		if (t.biff > 8) switch (e[a[0]][0]) {
			case 357:
				n = a[1] == -1 ? "#REF" : e.SheetNames[a[1]];
				return a[1] == a[2] ? n : n + ":" + e.SheetNames[a[2]];
			case 358:
				if (t.SID != null) return e.SheetNames[t.SID];
				return "SH33TJSSAME" + e[a[0]][0];
			case 355:
				;
			default:
				return "SH33TJSSRC" + e[a[0]][0];
		}
		switch (e[a[0]][0][0]) {
			case 1025:
				n = a[1] == -1 ? "#REF" : e.SheetNames[a[1]] || "SH33TJSERR3";
				return a[1] == a[2] ? n : n + ":" + e.SheetNames[a[2]];
			case 14849:
				return "SH33TJSERR8";
			default:
				if (!e[a[0]][0][3]) return "SH33TJSERR2";
				n = a[1] == -1 ? "#REF" : e[a[0]][0][3][a[1]] || "SH33TJSERR4";
				return a[1] == a[2] ? n : n + ":" + e[a[0]][0][3][a[2]];
		}
	}

	function nh(e, r, t) {
		return th(ah(e, r, t), t)
	}

	function ih(e, r, t, a, n) {
		var i = n && n.biff || 8;
		var s = {
			s: {
				c: 0,
				r: 0
			},
			e: {
				c: 0,
				r: 0
			}
		};
		var f = [],
			o, l, c, h = 0,
			u = 0,
			d, p = "";
		if (!e[0] || !e[0][0]) return "";
		var v = -1,
			g = "";
		for (var m = 0, b = e[0].length; m < b; ++m) {
			var C = e[0][m];
			switch (C[0]) {
				case "PtgUminus":
					f.push("-" + f.pop());
					break;
				case "PtgUplus":
					f.push("+" + f.pop());
					break;
				case "PtgPercent":
					f.push(f.pop() + "%");
					break;
				case "PtgAdd":
					;
				case "PtgConcat":
					;
				case "PtgDiv":
					;
				case "PtgEq":
					;
				case "PtgGe":
					;
				case "PtgGt":
					;
				case "PtgLe":
					;
				case "PtgLt":
					;
				case "PtgMul":
					;
				case "PtgNe":
					;
				case "PtgPower":
					;
				case "PtgSub":
					o = f.pop();
					l = f.pop();
					if (v >= 0) {
						switch (e[0][v][1][0]) {
							case 0:
								g = ie(" ", e[0][v][1][1]);
								break;
							case 1:
								g = ie("\r", e[0][v][1][1]);
								break;
							default:
								g = "";
								if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][v][1][0]);
						}
						l = l + g;
						v = -1
					}
					f.push(l + rh[C[0]] + o);
					break;
				case "PtgIsect":
					o = f.pop();
					l = f.pop();
					f.push(l + " " + o);
					break;
				case "PtgUnion":
					o = f.pop();
					l = f.pop();
					f.push(l + "," + o);
					break;
				case "PtgRange":
					o = f.pop();
					l = f.pop();
					f.push(l + ":" + o);
					break;
				case "PtgAttrChoose":
					break;
				case "PtgAttrGoto":
					break;
				case "PtgAttrIf":
					break;
				case "PtgAttrIfError":
					break;
				case "PtgRef":
					c = Gr(C[1][1], s, n);
					f.push(Kr(c, i));
					break;
				case "PtgRefN":
					c = t ? Gr(C[1][1], t, n) : C[1][1];
					f.push(Kr(c, i));
					break;
				case "PtgRef3d":
					h = C[1][1];
					c = Gr(C[1][2], s, n);
					p = nh(a, h, n);
					var E = p;
					f.push(p + "!" + Kr(c, i));
					break;
				case "PtgFunc":
					;
				case "PtgFuncVar":
					var w = C[1][0],
						k = C[1][1];
					if (!w) w = 0;
					w &= 127;
					var S = w == 0 ? [] : f.slice(-w);
					f.length -= w;
					if (k === "User") k = S.shift();
					f.push(k + "(" + S.join(",") + ")");
					break;
				case "PtgBool":
					f.push(C[1] ? "TRUE" : "FALSE");
					break;
				case "PtgInt":
					f.push(C[1]);
					break;
				case "PtgNum":
					f.push(String(C[1]));
					break;
				case "PtgStr":
					f.push('"' + C[1] + '"');
					break;
				case "PtgErr":
					f.push(C[1]);
					break;
				case "PtgAreaN":
					d = jr(C[1][1], t ? {
						s: t
					} : s, n);
					f.push(Yr(d, n));
					break;
				case "PtgArea":
					d = jr(C[1][1], s, n);
					f.push(Yr(d, n));
					break;
				case "PtgArea3d":
					h = C[1][1];
					d = C[1][2];
					p = nh(a, h, n);
					f.push(p + "!" + Yr(d, n));
					break;
				case "PtgAttrSum":
					f.push("SUM(" + f.pop() + ")");
					break;
				case "PtgAttrBaxcel":
					;
				case "PtgAttrSemi":
					break;
				case "PtgName":
					u = C[1][2];
					var A = (a.names || [])[u - 1] || (a[0] || [])[u];
					var _ = A ? A.Name : "SH33TJSNAME" + String(u);
					if (_ in Eh) _ = Eh[_];
					f.push(_);
					break;
				case "PtgNameX":
					var B = C[1][1];
					u = C[1][2];
					var T;
					if (n.biff <= 5) {
						if (B < 0) B = -B;
						if (a[B]) T = a[B][u]
					} else {
						var x = "";
						if (((a[B] || [])[0] || [])[0] == 14849) {} else if (((a[B] || [])[0] || [])[0] == 1025) {
							if (a[B][u] && a[B][u].itab > 0) {
								x = a.SheetNames[a[B][u].itab - 1] + "!"
							}
						} else x = a.SheetNames[u - 1] + "!";
						if (a[B] && a[B][u]) x += a[B][u].Name;
						else if (a[0] && a[0][u]) x += a[0][u].Name;
						else x += "SH33TJSERRX";
						f.push(x);
						break
					}
					if (!T) T = {
						Name: "SH33TJSERRY"
					};
					f.push(T.Name);
					break;
				case "PtgParen":
					var y = "(",
						I = ")";
					if (v >= 0) {
						g = "";
						switch (e[0][v][1][0]) {
							case 2:
								y = ie(" ", e[0][v][1][1]) + y;
								break;
							case 3:
								y = ie("\r", e[0][v][1][1]) + y;
								break;
							case 4:
								I = ie(" ", e[0][v][1][1]) + I;
								break;
							case 5:
								I = ie("\r", e[0][v][1][1]) + I;
								break;
							default:
								if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][v][1][0]);
						}
						v = -1
					}
					f.push(y + f.pop() + I);
					break;
				case "PtgRefErr":
					f.push("#REF!");
					break;
				case "PtgRefErr3d":
					f.push("#REF!");
					break;
				case "PtgExp":
					c = {
						c: C[1][1],
						r: C[1][0]
					};
					var R = {
						c: t.c,
						r: t.r
					};
					if (a.sharedf[ft(c)]) {
						var O = a.sharedf[ft(c)];
						f.push(ih(O, s, R, a, n))
					} else {
						var D = false;
						for (o = 0; o != a.arrayf.length; ++o) {
							l = a.arrayf[o];
							if (c.c < l[0].s.c || c.c > l[0].e.c) continue;
							if (c.r < l[0].s.r || c.r > l[0].e.r) continue;
							f.push(ih(l[1], s, R, a, n));
							D = true;
							break
						}
						if (!D) f.push(C[1])
					}
					break;
				case "PtgArray":
					f.push("{" + eh(C[1]) + "}");
					break;
				case "PtgMemArea":
					break;
				case "PtgAttrSpace":
					;
				case "PtgAttrSpaceSemi":
					v = m;
					break;
				case "PtgTbl":
					break;
				case "PtgMemErr":
					break;
				case "PtgMissArg":
					f.push("");
					break;
				case "PtgAreaErr":
					f.push("#REF!");
					break;
				case "PtgAreaErr3d":
					f.push("#REF!");
					break;
				case "PtgMemFunc":
					break;
				case "PtgMemNoMem":
					break;
				case "PtgElfCol":
					;
				case "PtgElfColS":
					;
				case "PtgElfColSV":
					;
				case "PtgElfColV":
					;
				case "PtgElfLel":
					;
				case "PtgElfRadical":
					;
				case "PtgElfRadicalLel":
					;
				case "PtgElfRadicalS":
					;
				case "PtgElfRw":
					;
				case "PtgElfRwV":
					throw new Error("Unsupported ELFs");
				case "PtgSxName":
					throw new Error("Unrecognized Formula Token: " + String(C));
				case "PtgList":
					throw new Error("Unrecognized Formula Token: " + String(C));
				default:
					throw new Error("Unrecognized Formula Token: " + String(C));
			}
			var F = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
			if (v >= 0 && F.indexOf(e[0][m][0]) == -1) {
				C = e[0][v];
				var P = true;
				switch (C[1][0]) {
					case 4:
						P = false;
					case 0:
						g = ie(" ", C[1][1]);
						break;
					case 5:
						P = false;
					case 1:
						g = ie("\r", C[1][1]);
						break;
					default:
						g = "";
						if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + C[1][0]);
				}
				f.push((P ? g : "") + f.pop() + (P ? "" : g));
				v = -1
			}
		}
		if (f.length > 1 && n.WTF) throw new Error("bad formula stack");
		return f[0]
	}

	function sh(e, r, t) {
		var a = e.l + r,
			n = t.biff == 2 ? 1 : 2;
		var i, s = e._R(n);
		if (s == 65535) return [
			[], Hr(e, r - 2)
		];
		var f = qc(e, s, t);
		if (r !== s + n) i = Jc(e, r - s - n, f, t);
		e.l = a;
		return [f, i]
	}

	function fh(e, r, t) {
		var a = e.l + r,
			n = t.biff == 2 ? 1 : 2;
		var i, s = e._R(n);
		if (s == 65535) return [
			[], Hr(e, r - 2)
		];
		var f = qc(e, s, t);
		if (r !== s + n) i = Jc(e, r - s - n, f, t);
		e.l = a;
		return [f, i]
	}

	function oh(e, r, t, a) {
		var n = e.l + r;
		var i = qc(e, a, t);
		var s;
		if (n !== e.l) s = Jc(e, n - e.l, i, t);
		return [i, s]
	}

	function lh(e, r, t) {
		var a = e.l + r;
		var n, i = e._R(2);
		var s = qc(e, i, t);
		if (i == 65535) return [
			[], Hr(e, r - 2)
		];
		if (r !== i + 2) n = Jc(e, a - i - 2, s, t);
		return [s, n]
	}

	function ch(e) {
		var r;
		if (xr(e, e.l + 6) !== 65535) return [Ht(e), "n"];
		switch (e[e.l]) {
			case 0:
				e.l += 8;
				return ["String", "s"];
			case 1:
				r = e[e.l + 2] === 1;
				e.l += 8;
				return [r, "b"];
			case 2:
				r = e[e.l + 2];
				e.l += 8;
				return [r, "e"];
			case 3:
				e.l += 8;
				return ["", "s"];
		}
		return []
	}

	function hh(e, r, t) {
		var a = e.l + r;
		var n = jn(e, 6);
		if (t.biff == 2) ++e.l;
		var i = ch(e, 8);
		var s = e._R(1);
		if (t.biff != 2) {
			e._R(1);
			if (t.biff >= 5) {
				e._R(4)
			}
		}
		var f = fh(e, a - e.l, t);
		return {
			cell: n,
			val: i[0],
			formula: f,
			shared: s >> 3 & 1,
			tt: i[1]
		}
	}

	function uh(e, r, t) {
		var a = e._R(4);
		var n = qc(e, a, t);
		var i = e._R(4);
		var s = i > 0 ? Jc(e, i, n, t) : null;
		return [n, s]
	}
	var dh = uh;
	var ph = uh;
	var vh = uh;
	var gh = uh;
	var mh = {
		0: "BEEP",
		1: "OPEN",
		2: "OPEN.LINKS",
		3: "CLOSE.ALL",
		4: "SAVE",
		5: "SAVE.AS",
		6: "FILE.DELETE",
		7: "PAGE.SETUP",
		8: "PRINT",
		9: "PRINTER.SETUP",
		10: "QUIT",
		11: "NEW.WINDOW",
		12: "ARRANGE.ALL",
		13: "WINDOW.SIZE",
		14: "WINDOW.MOVE",
		15: "FULL",
		16: "CLOSE",
		17: "RUN",
		22: "SET.PRINT.AREA",
		23: "SET.PRINT.TITLES",
		24: "SET.PAGE.BREAK",
		25: "REMOVE.PAGE.BREAK",
		26: "FONT",
		27: "DISPLAY",
		28: "PROTECT.DOCUMENT",
		29: "PRECISION",
		30: "A1.R1C1",
		31: "CALCULATE.NOW",
		32: "CALCULATION",
		34: "DATA.FIND",
		35: "EXTRACT",
		36: "DATA.DELETE",
		37: "SET.DATABASE",
		38: "SET.CRITERIA",
		39: "SORT",
		40: "DATA.SERIES",
		41: "TABLE",
		42: "FORMAT.NUMBER",
		43: "ALIGNMENT",
		44: "STYLE",
		45: "BORDER",
		46: "CELL.PROTECTION",
		47: "COLUMN.WIDTH",
		48: "UNDO",
		49: "CUT",
		50: "COPY",
		51: "PASTE",
		52: "CLEAR",
		53: "PASTE.SPECIAL",
		54: "EDIT.DELETE",
		55: "INSERT",
		56: "FILL.RIGHT",
		57: "FILL.DOWN",
		61: "DEFINE.NAME",
		62: "CREATE.NAMES",
		63: "FORMULA.GOTO",
		64: "FORMULA.FIND",
		65: "SELECT.LAST.CELL",
		66: "SHOW.ACTIVE.CELL",
		67: "GALLERY.AREA",
		68: "GALLERY.BAR",
		69: "GALLERY.COLUMN",
		70: "GALLERY.LINE",
		71: "GALLERY.PIE",
		72: "GALLERY.SCATTER",
		73: "COMBINATION",
		74: "PREFERRED",
		75: "ADD.OVERLAY",
		76: "GRIDLINES",
		77: "SET.PREFERRED",
		78: "AXES",
		79: "LEGEND",
		80: "ATTACH.TEXT",
		81: "ADD.ARROW",
		82: "SELECT.CHART",
		83: "SELECT.PLOT.AREA",
		84: "PATTERNS",
		85: "MAIN.CHART",
		86: "OVERLAY",
		87: "SCALE",
		88: "FORMAT.LEGEND",
		89: "FORMAT.TEXT",
		90: "EDIT.REPEAT",
		91: "PARSE",
		92: "JUSTIFY",
		93: "HIDE",
		94: "UNHIDE",
		95: "WORKSPACE",
		96: "FORMULA",
		97: "FORMULA.FILL",
		98: "FORMULA.ARRAY",
		99: "DATA.FIND.NEXT",
		100: "DATA.FIND.PREV",
		101: "FORMULA.FIND.NEXT",
		102: "FORMULA.FIND.PREV",
		103: "ACTIVATE",
		104: "ACTIVATE.NEXT",
		105: "ACTIVATE.PREV",
		106: "UNLOCKED.NEXT",
		107: "UNLOCKED.PREV",
		108: "COPY.PICTURE",
		109: "SELECT",
		110: "DELETE.NAME",
		111: "DELETE.FORMAT",
		112: "VLINE",
		113: "HLINE",
		114: "VPAGE",
		115: "HPAGE",
		116: "VSCROLL",
		117: "HSCROLL",
		118: "ALERT",
		119: "NEW",
		120: "CANCEL.COPY",
		121: "SHOW.CLIPBOARD",
		122: "MESSAGE",
		124: "PASTE.LINK",
		125: "APP.ACTIVATE",
		126: "DELETE.ARROW",
		127: "ROW.HEIGHT",
		128: "FORMAT.MOVE",
		129: "FORMAT.SIZE",
		130: "FORMULA.REPLACE",
		131: "SEND.KEYS",
		132: "SELECT.SPECIAL",
		133: "APPLY.NAMES",
		134: "REPLACE.FONT",
		135: "FREEZE.PANES",
		136: "SHOW.INFO",
		137: "SPLIT",
		138: "ON.WINDOW",
		139: "ON.DATA",
		140: "DISABLE.INPUT",
		142: "OUTLINE",
		143: "LIST.NAMES",
		144: "FILE.CLOSE",
		145: "SAVE.WORKBOOK",
		146: "DATA.FORM",
		147: "COPY.CHART",
		148: "ON.TIME",
		149: "WAIT",
		150: "FORMAT.FONT",
		151: "FILL.UP",
		152: "FILL.LEFT",
		153: "DELETE.OVERLAY",
		155: "SHORT.MENUS",
		159: "SET.UPDATE.STATUS",
		161: "COLOR.PALETTE",
		162: "DELETE.STYLE",
		163: "WINDOW.RESTORE",
		164: "WINDOW.MAXIMIZE",
		166: "CHANGE.LINK",
		167: "CALCULATE.DOCUMENT",
		168: "ON.KEY",
		169: "APP.RESTORE",
		170: "APP.MOVE",
		171: "APP.SIZE",
		172: "APP.MINIMIZE",
		173: "APP.MAXIMIZE",
		174: "BRING.TO.FRONT",
		175: "SEND.TO.BACK",
		185: "MAIN.CHART.TYPE",
		186: "OVERLAY.CHART.TYPE",
		187: "SELECT.END",
		188: "OPEN.MAIL",
		189: "SEND.MAIL",
		190: "STANDARD.FONT",
		191: "CONSOLIDATE",
		192: "SORT.SPECIAL",
		193: "GALLERY.3D.AREA",
		194: "GALLERY.3D.COLUMN",
		195: "GALLERY.3D.LINE",
		196: "GALLERY.3D.PIE",
		197: "VIEW.3D",
		198: "GOAL.SEEK",
		199: "WORKGROUP",
		200: "FILL.GROUP",
		201: "UPDATE.LINK",
		202: "PROMOTE",
		203: "DEMOTE",
		204: "SHOW.DETAIL",
		206: "UNGROUP",
		207: "OBJECT.PROPERTIES",
		208: "SAVE.NEW.OBJECT",
		209: "SHARE",
		210: "SHARE.NAME",
		211: "DUPLICATE",
		212: "APPLY.STYLE",
		213: "ASSIGN.TO.OBJECT",
		214: "OBJECT.PROTECTION",
		215: "HIDE.OBJECT",
		216: "SET.EXTRACT",
		217: "CREATE.PUBLISHER",
		218: "SUBSCRIBE.TO",
		219: "ATTRIBUTES",
		220: "SHOW.TOOLBAR",
		222: "PRINT.PREVIEW",
		223: "EDIT.COLOR",
		224: "SHOW.LEVELS",
		225: "FORMAT.MAIN",
		226: "FORMAT.OVERLAY",
		227: "ON.RECALC",
		228: "EDIT.SERIES",
		229: "DEFINE.STYLE",
		240: "LINE.PRINT",
		243: "ENTER.DATA",
		249: "GALLERY.RADAR",
		250: "MERGE.STYLES",
		251: "EDITION.OPTIONS",
		252: "PASTE.PICTURE",
		253: "PASTE.PICTURE.LINK",
		254: "SPELLING",
		256: "ZOOM",
		259: "INSERT.OBJECT",
		260: "WINDOW.MINIMIZE",
		265: "SOUND.NOTE",
		266: "SOUND.PLAY",
		267: "FORMAT.SHAPE",
		268: "EXTEND.POLYGON",
		269: "FORMAT.AUTO",
		272: "GALLERY.3D.BAR",
		273: "GALLERY.3D.SURFACE",
		274: "FILL.AUTO",
		276: "CUSTOMIZE.TOOLBAR",
		277: "ADD.TOOL",
		278: "EDIT.OBJECT",
		279: "ON.DOUBLECLICK",
		280: "ON.ENTRY",
		281: "WORKBOOK.ADD",
		282: "WORKBOOK.MOVE",
		283: "WORKBOOK.COPY",
		284: "WORKBOOK.OPTIONS",
		285: "SAVE.WORKSPACE",
		288: "CHART.WIZARD",
		289: "DELETE.TOOL",
		290: "MOVE.TOOL",
		291: "WORKBOOK.SELECT",
		292: "WORKBOOK.ACTIVATE",
		293: "ASSIGN.TO.TOOL",
		295: "COPY.TOOL",
		296: "RESET.TOOL",
		297: "CONSTRAIN.NUMERIC",
		298: "PASTE.TOOL",
		302: "WORKBOOK.NEW",
		305: "SCENARIO.CELLS",
		306: "SCENARIO.DELETE",
		307: "SCENARIO.ADD",
		308: "SCENARIO.EDIT",
		309: "SCENARIO.SHOW",
		310: "SCENARIO.SHOW.NEXT",
		311: "SCENARIO.SUMMARY",
		312: "PIVOT.TABLE.WIZARD",
		313: "PIVOT.FIELD.PROPERTIES",
		314: "PIVOT.FIELD",
		315: "PIVOT.ITEM",
		316: "PIVOT.ADD.FIELDS",
		318: "OPTIONS.CALCULATION",
		319: "OPTIONS.EDIT",
		320: "OPTIONS.VIEW",
		321: "ADDIN.MANAGER",
		322: "MENU.EDITOR",
		323: "ATTACH.TOOLBARS",
		324: "VBAActivate",
		325: "OPTIONS.CHART",
		328: "VBA.INSERT.FILE",
		330: "VBA.PROCEDURE.DEFINITION",
		336: "ROUTING.SLIP",
		338: "ROUTE.DOCUMENT",
		339: "MAIL.LOGON",
		342: "INSERT.PICTURE",
		343: "EDIT.TOOL",
		344: "GALLERY.DOUGHNUT",
		350: "CHART.TREND",
		352: "PIVOT.ITEM.PROPERTIES",
		354: "WORKBOOK.INSERT",
		355: "OPTIONS.TRANSITION",
		356: "OPTIONS.GENERAL",
		370: "FILTER.ADVANCED",
		373: "MAIL.ADD.MAILER",
		374: "MAIL.DELETE.MAILER",
		375: "MAIL.REPLY",
		376: "MAIL.REPLY.ALL",
		377: "MAIL.FORWARD",
		378: "MAIL.NEXT.LETTER",
		379: "DATA.LABEL",
		380: "INSERT.TITLE",
		381: "FONT.PROPERTIES",
		382: "MACRO.OPTIONS",
		383: "WORKBOOK.HIDE",
		384: "WORKBOOK.UNHIDE",
		385: "WORKBOOK.DELETE",
		386: "WORKBOOK.NAME",
		388: "GALLERY.CUSTOM",
		390: "ADD.CHART.AUTOFORMAT",
		391: "DELETE.CHART.AUTOFORMAT",
		392: "CHART.ADD.DATA",
		393: "AUTO.OUTLINE",
		394: "TAB.ORDER",
		395: "SHOW.DIALOG",
		396: "SELECT.ALL",
		397: "UNGROUP.SHEETS",
		398: "SUBTOTAL.CREATE",
		399: "SUBTOTAL.REMOVE",
		400: "RENAME.OBJECT",
		412: "WORKBOOK.SCROLL",
		413: "WORKBOOK.NEXT",
		414: "WORKBOOK.PREV",
		415: "WORKBOOK.TAB.SPLIT",
		416: "FULL.SCREEN",
		417: "WORKBOOK.PROTECT",
		420: "SCROLLBAR.PROPERTIES",
		421: "PIVOT.SHOW.PAGES",
		422: "TEXT.TO.COLUMNS",
		423: "FORMAT.CHARTTYPE",
		424: "LINK.FORMAT",
		425: "TRACER.DISPLAY",
		430: "TRACER.NAVIGATE",
		431: "TRACER.CLEAR",
		432: "TRACER.ERROR",
		433: "PIVOT.FIELD.GROUP",
		434: "PIVOT.FIELD.UNGROUP",
		435: "CHECKBOX.PROPERTIES",
		436: "LABEL.PROPERTIES",
		437: "LISTBOX.PROPERTIES",
		438: "EDITBOX.PROPERTIES",
		439: "PIVOT.REFRESH",
		440: "LINK.COMBO",
		441: "OPEN.TEXT",
		442: "HIDE.DIALOG",
		443: "SET.DIALOG.FOCUS",
		444: "ENABLE.OBJECT",
		445: "PUSHBUTTON.PROPERTIES",
		446: "SET.DIALOG.DEFAULT",
		447: "FILTER",
		448: "FILTER.SHOW.ALL",
		449: "CLEAR.OUTLINE",
		450: "FUNCTION.WIZARD",
		451: "ADD.LIST.ITEM",
		452: "SET.LIST.ITEM",
		453: "REMOVE.LIST.ITEM",
		454: "SELECT.LIST.ITEM",
		455: "SET.CONTROL.VALUE",
		456: "SAVE.COPY.AS",
		458: "OPTIONS.LISTS.ADD",
		459: "OPTIONS.LISTS.DELETE",
		460: "SERIES.AXES",
		461: "SERIES.X",
		462: "SERIES.Y",
		463: "ERRORBAR.X",
		464: "ERRORBAR.Y",
		465: "FORMAT.CHART",
		466: "SERIES.ORDER",
		467: "MAIL.LOGOFF",
		468: "CLEAR.ROUTING.SLIP",
		469: "APP.ACTIVATE.MICROSOFT",
		470: "MAIL.EDIT.MAILER",
		471: "ON.SHEET",
		472: "STANDARD.WIDTH",
		473: "SCENARIO.MERGE",
		474: "SUMMARY.INFO",
		475: "FIND.FILE",
		476: "ACTIVE.CELL.FONT",
		477: "ENABLE.TIPWIZARD",
		478: "VBA.MAKE.ADDIN",
		480: "INSERTDATATABLE",
		481: "WORKGROUP.OPTIONS",
		482: "MAIL.SEND.MAILER",
		485: "AUTOCORRECT",
		489: "POST.DOCUMENT",
		491: "PICKLIST",
		493: "VIEW.SHOW",
		494: "VIEW.DEFINE",
		495: "VIEW.DELETE",
		509: "SHEET.BACKGROUND",
		510: "INSERT.MAP.OBJECT",
		511: "OPTIONS.MENONO",
		517: "MSOCHECKS",
		518: "NORMAL",
		519: "LAYOUT",
		520: "RM.PRINT.AREA",
		521: "CLEAR.PRINT.AREA",
		522: "ADD.PRINT.AREA",
		523: "MOVE.BRK",
		545: "HIDECURR.NOTE",
		546: "HIDEALL.NOTES",
		547: "DELETE.NOTE",
		548: "TRAVERSE.NOTES",
		549: "ACTIVATE.NOTES",
		620: "PROTECT.REVISIONS",
		621: "UNPROTECT.REVISIONS",
		647: "OPTIONS.ME",
		653: "WEB.PUBLISH",
		667: "NEWWEBQUERY",
		673: "PIVOT.TABLE.CHART",
		753: "OPTIONS.SAVE",
		755: "OPTIONS.SPELL",
		808: "HIDEALL.INKANNOTS"
	};
	var bh = {
		0: "COUNT",
		1: "IF",
		2: "ISNA",
		3: "ISERROR",
		4: "SUM",
		5: "AVERAGE",
		6: "MIN",
		7: "MAX",
		8: "ROW",
		9: "COLUMN",
		10: "NA",
		11: "NPV",
		12: "STDEV",
		13: "DOLLAR",
		14: "FIXED",
		15: "SIN",
		16: "COS",
		17: "TAN",
		18: "ATAN",
		19: "PI",
		20: "SQRT",
		21: "EXP",
		22: "LN",
		23: "LOG10",
		24: "ABS",
		25: "INT",
		26: "SIGN",
		27: "ROUND",
		28: "LOOKUP",
		29: "INDEX",
		30: "REPT",
		31: "MID",
		32: "LEN",
		33: "VALUE",
		34: "TRUE",
		35: "FALSE",
		36: "AND",
		37: "OR",
		38: "NOT",
		39: "MOD",
		40: "DCOUNT",
		41: "DSUM",
		42: "DAVERAGE",
		43: "DMIN",
		44: "DMAX",
		45: "DSTDEV",
		46: "VAR",
		47: "DVAR",
		48: "TEXT",
		49: "LINEST",
		50: "TREND",
		51: "LOGEST",
		52: "GROWTH",
		53: "GOTO",
		54: "HALT",
		55: "RETURN",
		56: "PV",
		57: "FV",
		58: "NPER",
		59: "PMT",
		60: "RATE",
		61: "MIRR",
		62: "IRR",
		63: "RAND",
		64: "MATCH",
		65: "DATE",
		66: "TIME",
		67: "DAY",
		68: "MONTH",
		69: "YEAR",
		70: "WEEKDAY",
		71: "HOUR",
		72: "MINUTE",
		73: "SECOND",
		74: "NOW",
		75: "AREAS",
		76: "ROWS",
		77: "COLUMNS",
		78: "OFFSET",
		79: "ABSREF",
		80: "RELREF",
		81: "ARGUMENT",
		82: "SEARCH",
		83: "TRANSPOSE",
		84: "ERROR",
		85: "STEP",
		86: "TYPE",
		87: "ECHO",
		88: "SET.NAME",
		89: "CALLER",
		90: "DEREF",
		91: "WINDOWS",
		92: "SERIES",
		93: "DOCUMENTS",
		94: "ACTIVE.CELL",
		95: "SELECTION",
		96: "RESULT",
		97: "ATAN2",
		98: "ASIN",
		99: "ACOS",
		100: "CHOOSE",
		101: "HLOOKUP",
		102: "VLOOKUP",
		103: "LINKS",
		104: "INPUT",
		105: "ISREF",
		106: "GET.FORMULA",
		107: "GET.NAME",
		108: "SET.VALUE",
		109: "LOG",
		110: "EXEC",
		111: "CHAR",
		112: "LOWER",
		113: "UPPER",
		114: "PROPER",
		115: "LEFT",
		116: "RIGHT",
		117: "EXACT",
		118: "TRIM",
		119: "REPLACE",
		120: "SUBSTITUTE",
		121: "CODE",
		122: "NAMES",
		123: "DIRECTORY",
		124: "FIND",
		125: "CELL",
		126: "ISERR",
		127: "ISTEXT",
		128: "ISNUMBER",
		129: "ISBLANK",
		130: "T",
		131: "N",
		132: "FOPEN",
		133: "FCLOSE",
		134: "FSIZE",
		135: "FREADLN",
		136: "FREAD",
		137: "FWRITELN",
		138: "FWRITE",
		139: "FPOS",
		140: "DATEVALUE",
		141: "TIMEVALUE",
		142: "SLN",
		143: "SYD",
		144: "DDB",
		145: "GET.DEF",
		146: "REFTEXT",
		147: "TEXTREF",
		148: "INDIRECT",
		149: "REGISTER",
		150: "CALL",
		151: "ADD.BAR",
		152: "ADD.MENU",
		153: "ADD.COMMAND",
		154: "ENABLE.COMMAND",
		155: "CHECK.COMMAND",
		156: "RENAME.COMMAND",
		157: "SHOW.BAR",
		158: "DELETE.MENU",
		159: "DELETE.COMMAND",
		160: "GET.CHART.ITEM",
		161: "DIALOG.BOX",
		162: "CLEAN",
		163: "MDETERM",
		164: "MINVERSE",
		165: "MMULT",
		166: "FILES",
		167: "IPMT",
		168: "PPMT",
		169: "COUNTA",
		170: "CANCEL.KEY",
		171: "FOR",
		172: "WHILE",
		173: "BREAK",
		174: "NEXT",
		175: "INITIATE",
		176: "REQUEST",
		177: "POKE",
		178: "EXECUTE",
		179: "TERMINATE",
		180: "RESTART",
		181: "HELP",
		182: "GET.BAR",
		183: "PRODUCT",
		184: "FACT",
		185: "GET.CELL",
		186: "GET.WORKSPACE",
		187: "GET.WINDOW",
		188: "GET.DOCUMENT",
		189: "DPRODUCT",
		190: "ISNONTEXT",
		191: "GET.NOTE",
		192: "NOTE",
		193: "STDEVP",
		194: "VARP",
		195: "DSTDEVP",
		196: "DVARP",
		197: "TRUNC",
		198: "ISLOGICAL",
		199: "DCOUNTA",
		200: "DELETE.BAR",
		201: "UNREGISTER",
		204: "USDOLLAR",
		205: "FINDB",
		206: "SEARCHB",
		207: "REPLACEB",
		208: "LEFTB",
		209: "RIGHTB",
		210: "MIDB",
		211: "LENB",
		212: "ROUNDUP",
		213: "ROUNDDOWN",
		214: "ASC",
		215: "DBCS",
		216: "RANK",
		219: "ADDRESS",
		220: "DAYS360",
		221: "TODAY",
		222: "VDB",
		223: "ELSE",
		224: "ELSE.IF",
		225: "END.IF",
		226: "FOR.CELL",
		227: "MEDIAN",
		228: "SUMPRODUCT",
		229: "SINH",
		230: "COSH",
		231: "TANH",
		232: "ASINH",
		233: "ACOSH",
		234: "ATANH",
		235: "DGET",
		236: "CREATE.OBJECT",
		237: "VOLATILE",
		238: "LAST.ERROR",
		239: "CUSTOM.UNDO",
		240: "CUSTOM.REPEAT",
		241: "FORMULA.CONVERT",
		242: "GET.LINK.INFO",
		243: "TEXT.BOX",
		244: "INFO",
		245: "GROUP",
		246: "GET.OBJECT",
		247: "DB",
		248: "PAUSE",
		251: "RESUME",
		252: "FREQUENCY",
		253: "ADD.TOOLBAR",
		254: "DELETE.TOOLBAR",
		255: "User",
		256: "RESET.TOOLBAR",
		257: "EVALUATE",
		258: "GET.TOOLBAR",
		259: "GET.TOOL",
		260: "SPELLING.CHECK",
		261: "ERROR.TYPE",
		262: "APP.TITLE",
		263: "WINDOW.TITLE",
		264: "SAVE.TOOLBAR",
		265: "ENABLE.TOOL",
		266: "PRESS.TOOL",
		267: "REGISTER.ID",
		268: "GET.WORKBOOK",
		269: "AVEDEV",
		270: "BETADIST",
		271: "GAMMALN",
		272: "BETAINV",
		273: "BINOMDIST",
		274: "CHIDIST",
		275: "CHIINV",
		276: "COMBIN",
		277: "CONFIDENCE",
		278: "CRITBINOM",
		279: "EVEN",
		280: "EXPONDIST",
		281: "FDIST",
		282: "FINV",
		283: "FISHER",
		284: "FISHERINV",
		285: "FLOOR",
		286: "GAMMADIST",
		287: "GAMMAINV",
		288: "CEILING",
		289: "HYPGEOMDIST",
		290: "LOGNORMDIST",
		291: "LOGINV",
		292: "NEGBINOMDIST",
		293: "NORMDIST",
		294: "NORMSDIST",
		295: "NORMINV",
		296: "NORMSINV",
		297: "STANDARDIZE",
		298: "ODD",
		299: "PERMUT",
		300: "POISSON",
		301: "TDIST",
		302: "WEIBULL",
		303: "SUMXMY2",
		304: "SUMX2MY2",
		305: "SUMX2PY2",
		306: "CHITEST",
		307: "CORREL",
		308: "COVAR",
		309: "FORECAST",
		310: "FTEST",
		311: "INTERCEPT",
		312: "PEARSON",
		313: "RSQ",
		314: "STEYX",
		315: "SLOPE",
		316: "TTEST",
		317: "PROB",
		318: "DEVSQ",
		319: "GEOMEAN",
		320: "HARMEAN",
		321: "SUMSQ",
		322: "KURT",
		323: "SKEW",
		324: "ZTEST",
		325: "LARGE",
		326: "SMALL",
		327: "QUARTILE",
		328: "PERCENTILE",
		329: "PERCENTRANK",
		330: "MODE",
		331: "TRIMMEAN",
		332: "TINV",
		334: "MOVIE.COMMAND",
		335: "GET.MOVIE",
		336: "CONCATENATE",
		337: "POWER",
		338: "PIVOT.ADD.DATA",
		339: "GET.PIVOT.TABLE",
		340: "GET.PIVOT.FIELD",
		341: "GET.PIVOT.ITEM",
		342: "RADIANS",
		343: "DEGREES",
		344: "SUBTOTAL",
		345: "SUMIF",
		346: "COUNTIF",
		347: "COUNTBLANK",
		348: "SCENARIO.GET",
		349: "OPTIONS.LISTS.GET",
		350: "ISPMT",
		351: "DATEDIF",
		352: "DATESTRING",
		353: "NUMBERSTRING",
		354: "ROMAN",
		355: "OPEN.DIALOG",
		356: "SAVE.DIALOG",
		357: "VIEW.GET",
		358: "GETPIVOTDATA",
		359: "HYPERLINK",
		360: "PHONETIC",
		361: "AVERAGEA",
		362: "MAXA",
		363: "MINA",
		364: "STDEVPA",
		365: "VARPA",
		366: "STDEVA",
		367: "VARA",
		368: "BAHTTEXT",
		369: "THAIDAYOFWEEK",
		370: "THAIDIGIT",
		371: "THAIMONTHOFYEAR",
		372: "THAINUMSOUND",
		373: "THAINUMSTRING",
		374: "THAISTRINGLENGTH",
		375: "ISTHAIDIGIT",
		376: "ROUNDBAHTDOWN",
		377: "ROUNDBAHTUP",
		378: "THAIYEAR",
		379: "RTD",
		380: "CUBEVALUE",
		381: "CUBEMEMBER",
		382: "CUBEMEMBERPROPERTY",
		383: "CUBERANKEDMEMBER",
		384: "HEX2BIN",
		385: "HEX2DEC",
		386: "HEX2OCT",
		387: "DEC2BIN",
		388: "DEC2HEX",
		389: "DEC2OCT",
		390: "OCT2BIN",
		391: "OCT2HEX",
		392: "OCT2DEC",
		393: "BIN2DEC",
		394: "BIN2OCT",
		395: "BIN2HEX",
		396: "IMSUB",
		397: "IMDIV",
		398: "IMPOWER",
		399: "IMABS",
		400: "IMSQRT",
		401: "IMLN",
		402: "IMLOG2",
		403: "IMLOG10",
		404: "IMSIN",
		405: "IMCOS",
		406: "IMEXP",
		407: "IMARGUMENT",
		408: "IMCONJUGATE",
		409: "IMAGINARY",
		410: "IMREAL",
		411: "COMPLEX",
		412: "IMSUM",
		413: "IMPRODUCT",
		414: "SERIESSUM",
		415: "FACTDOUBLE",
		416: "SQRTPI",
		417: "QUOTIENT",
		418: "DELTA",
		419: "GESTEP",
		420: "ISEVEN",
		421: "ISODD",
		422: "MROUND",
		423: "ERF",
		424: "ERFC",
		425: "BESSELJ",
		426: "BESSELK",
		427: "BESSELY",
		428: "BESSELI",
		429: "XIRR",
		430: "XNPV",
		431: "PRICEMAT",
		432: "YIELDMAT",
		433: "INTRATE",
		434: "RECEIVED",
		435: "DISC",
		436: "PRICEDISC",
		437: "YIELDDISC",
		438: "TBILLEQ",
		439: "TBILLPRICE",
		440: "TBILLYIELD",
		441: "PRICE",
		442: "YIELD",
		443: "DOLLARDE",
		444: "DOLLARFR",
		445: "NOMINAL",
		446: "EFFECT",
		447: "CUMPRINC",
		448: "CUMIPMT",
		449: "EDATE",
		450: "EOMONTH",
		451: "YEARFRAC",
		452: "COUPDAYBS",
		453: "COUPDAYS",
		454: "COUPDAYSNC",
		455: "COUPNCD",
		456: "COUPNUM",
		457: "COUPPCD",
		458: "DURATION",
		459: "MDURATION",
		460: "ODDLPRICE",
		461: "ODDLYIELD",
		462: "ODDFPRICE",
		463: "ODDFYIELD",
		464: "RANDBETWEEN",
		465: "WEEKNUM",
		466: "AMORDEGRC",
		467: "AMORLINC",
		468: "CONVERT",
		724: "SHEETJS",
		469: "ACCRINT",
		470: "ACCRINTM",
		471: "WORKDAY",
		472: "NETWORKDAYS",
		473: "GCD",
		474: "MULTINOMIAL",
		475: "LCM",
		476: "FVSCHEDULE",
		477: "CUBEKPIMEMBER",
		478: "CUBESET",
		479: "CUBESETCOUNT",
		480: "IFERROR",
		481: "COUNTIFS",
		482: "SUMIFS",
		483: "AVERAGEIF",
		484: "AVERAGEIFS"
	};
	var Ch = {
		2: 1,
		3: 1,
		15: 1,
		16: 1,
		17: 1,
		18: 1,
		19: 0,
		20: 1,
		21: 1,
		22: 1,
		23: 1,
		24: 1,
		25: 1,
		26: 1,
		27: 2,
		30: 2,
		31: 3,
		32: 1,
		33: 1,
		38: 1,
		39: 2,
		40: 3,
		41: 3,
		42: 3,
		43: 3,
		44: 3,
		45: 3,
		47: 3,
		48: 2,
		53: 1,
		61: 3,
		65: 3,
		66: 3,
		67: 1,
		68: 1,
		69: 1,
		70: 1,
		71: 1,
		72: 1,
		73: 1,
		75: 1,
		76: 1,
		77: 1,
		79: 2,
		80: 2,
		83: 1,
		85: 0,
		86: 1,
		90: 1,
		97: 2,
		98: 1,
		99: 1,
		101: 3,
		102: 3,
		105: 1,
		111: 1,
		112: 1,
		113: 1,
		114: 1,
		117: 2,
		118: 1,
		119: 4,
		121: 1,
		126: 1,
		127: 1,
		128: 1,
		129: 1,
		130: 1,
		131: 1,
		133: 1,
		134: 1,
		135: 1,
		136: 2,
		137: 2,
		138: 2,
		140: 1,
		141: 1,
		142: 3,
		143: 4,
		144: 4,
		162: 1,
		163: 1,
		164: 1,
		165: 2,
		172: 1,
		175: 2,
		176: 2,
		177: 3,
		178: 2,
		179: 1,
		184: 1,
		189: 3,
		190: 1,
		195: 3,
		196: 3,
		197: 1,
		198: 1,
		199: 3,
		201: 1,
		207: 4,
		210: 3,
		211: 1,
		212: 2,
		213: 2,
		214: 1,
		215: 1,
		229: 1,
		230: 1,
		231: 1,
		232: 1,
		233: 1,
		234: 1,
		235: 3,
		244: 1,
		247: 4,
		252: 2,
		257: 1,
		261: 1,
		271: 1,
		273: 4,
		274: 2,
		275: 2,
		276: 2,
		277: 3,
		278: 3,
		279: 1,
		280: 3,
		281: 3,
		282: 3,
		283: 1,
		284: 1,
		285: 2,
		286: 4,
		287: 3,
		288: 2,
		289: 4,
		290: 3,
		291: 3,
		292: 3,
		293: 4,
		294: 1,
		295: 3,
		296: 1,
		297: 3,
		298: 1,
		299: 2,
		300: 3,
		301: 3,
		302: 4,
		303: 2,
		304: 2,
		305: 2,
		306: 2,
		307: 2,
		308: 2,
		309: 3,
		310: 2,
		311: 2,
		312: 2,
		313: 2,
		314: 2,
		315: 2,
		316: 4,
		325: 2,
		326: 2,
		327: 2,
		328: 2,
		331: 2,
		332: 2,
		337: 2,
		342: 1,
		343: 1,
		346: 2,
		347: 1,
		350: 4,
		351: 3,
		352: 1,
		353: 2,
		360: 1,
		368: 1,
		369: 1,
		370: 1,
		371: 1,
		372: 1,
		373: 1,
		374: 1,
		375: 1,
		376: 1,
		377: 1,
		378: 1,
		382: 3,
		385: 1,
		392: 1,
		393: 1,
		396: 2,
		397: 2,
		398: 2,
		399: 1,
		400: 1,
		401: 1,
		402: 1,
		403: 1,
		404: 1,
		405: 1,
		406: 1,
		407: 1,
		408: 1,
		409: 1,
		410: 1,
		414: 4,
		415: 1,
		416: 1,
		417: 2,
		420: 1,
		421: 1,
		422: 2,
		424: 1,
		425: 2,
		426: 2,
		427: 2,
		428: 2,
		430: 3,
		438: 3,
		439: 3,
		440: 3,
		443: 2,
		444: 2,
		445: 2,
		446: 2,
		447: 6,
		448: 6,
		449: 2,
		450: 2,
		464: 2,
		468: 3,
		476: 2,
		479: 1,
		480: 2,
		65535: 0
	};
	var Eh = {
		"_xlfn.ACOT": "ACOT",
		"_xlfn.ACOTH": "ACOTH",
		"_xlfn.AGGREGATE": "AGGREGATE",
		"_xlfn.ARABIC": "ARABIC",
		"_xlfn.AVERAGEIF": "AVERAGEIF",
		"_xlfn.AVERAGEIFS": "AVERAGEIFS",
		"_xlfn.BASE": "BASE",
		"_xlfn.BETA.DIST": "BETA.DIST",
		"_xlfn.BETA.INV": "BETA.INV",
		"_xlfn.BINOM.DIST": "BINOM.DIST",
		"_xlfn.BINOM.DIST.RANGE": "BINOM.DIST.RANGE",
		"_xlfn.BINOM.INV": "BINOM.INV",
		"_xlfn.BITAND": "BITAND",
		"_xlfn.BITLSHIFT": "BITLSHIFT",
		"_xlfn.BITOR": "BITOR",
		"_xlfn.BITRSHIFT": "BITRSHIFT",
		"_xlfn.BITXOR": "BITXOR",
		"_xlfn.CEILING.MATH": "CEILING.MATH",
		"_xlfn.CEILING.PRECISE": "CEILING.PRECISE",
		"_xlfn.CHISQ.DIST": "CHISQ.DIST",
		"_xlfn.CHISQ.DIST.RT": "CHISQ.DIST.RT",
		"_xlfn.CHISQ.INV": "CHISQ.INV",
		"_xlfn.CHISQ.INV.RT": "CHISQ.INV.RT",
		"_xlfn.CHISQ.TEST": "CHISQ.TEST",
		"_xlfn.COMBINA": "COMBINA",
		"_xlfn.CONCAT": "CONCAT",
		"_xlfn.CONFIDENCE.NORM": "CONFIDENCE.NORM",
		"_xlfn.CONFIDENCE.T": "CONFIDENCE.T",
		"_xlfn.COT": "COT",
		"_xlfn.COTH": "COTH",
		"_xlfn.COUNTIFS": "COUNTIFS",
		"_xlfn.COVARIANCE.P": "COVARIANCE.P",
		"_xlfn.COVARIANCE.S": "COVARIANCE.S",
		"_xlfn.CSC": "CSC",
		"_xlfn.CSCH": "CSCH",
		"_xlfn.DAYS": "DAYS",
		"_xlfn.DECIMAL": "DECIMAL",
		"_xlfn.ECMA.CEILING": "ECMA.CEILING",
		"_xlfn.ERF.PRECISE": "ERF.PRECISE",
		"_xlfn.ERFC.PRECISE": "ERFC.PRECISE",
		"_xlfn.EXPON.DIST": "EXPON.DIST",
		"_xlfn.F.DIST": "F.DIST",
		"_xlfn.F.DIST.RT": "F.DIST.RT",
		"_xlfn.F.INV": "F.INV",
		"_xlfn.F.INV.RT": "F.INV.RT",
		"_xlfn.F.TEST": "F.TEST",
		"_xlfn.FILTERXML": "FILTERXML",
		"_xlfn.FLOOR.MATH": "FLOOR.MATH",
		"_xlfn.FLOOR.PRECISE": "FLOOR.PRECISE",
		"_xlfn.FORECAST.ETS": "FORECAST.ETS",
		"_xlfn.FORECAST.ETS.CONFINT": "FORECAST.ETS.CONFINT",
		"_xlfn.FORECAST.ETS.SEASONALITY": "FORECAST.ETS.SEASONALITY",
		"_xlfn.FORECAST.ETS.STAT": "FORECAST.ETS.STAT",
		"_xlfn.FORECAST.LINEAR": "FORECAST.LINEAR",
		"_xlfn.FORMULATEXT": "FORMULATEXT",
		"_xlfn.GAMMA": "GAMMA",
		"_xlfn.GAMMA.DIST": "GAMMA.DIST",
		"_xlfn.GAMMA.INV": "GAMMA.INV",
		"_xlfn.GAMMALN.PRECISE": "GAMMALN.PRECISE",
		"_xlfn.GAUSS": "GAUSS",
		"_xlfn.HYPGEOM.DIST": "HYPGEOM.DIST",
		"_xlfn.IFERROR": "IFERROR",
		"_xlfn.IFNA": "IFNA",
		"_xlfn.IFS": "IFS",
		"_xlfn.IMCOSH": "IMCOSH",
		"_xlfn.IMCOT": "IMCOT",
		"_xlfn.IMCSC": "IMCSC",
		"_xlfn.IMCSCH": "IMCSCH",
		"_xlfn.IMSEC": "IMSEC",
		"_xlfn.IMSECH": "IMSECH",
		"_xlfn.IMSINH": "IMSINH",
		"_xlfn.IMTAN": "IMTAN",
		"_xlfn.ISFORMULA": "ISFORMULA",
		"_xlfn.ISO.CEILING": "ISO.CEILING",
		"_xlfn.ISOWEEKNUM": "ISOWEEKNUM",
		"_xlfn.LOGNORM.DIST": "LOGNORM.DIST",
		"_xlfn.LOGNORM.INV": "LOGNORM.INV",
		"_xlfn.MAXIFS": "MAXIFS",
		"_xlfn.MINIFS": "MINIFS",
		"_xlfn.MODE.MULT": "MODE.MULT",
		"_xlfn.MODE.SNGL": "MODE.SNGL",
		"_xlfn.MUNIT": "MUNIT",
		"_xlfn.NEGBINOM.DIST": "NEGBINOM.DIST",
		"_xlfn.NETWORKDAYS.INTL": "NETWORKDAYS.INTL",
		"_xlfn.NIGBINOM": "NIGBINOM",
		"_xlfn.NORM.DIST": "NORM.DIST",
		"_xlfn.NORM.INV": "NORM.INV",
		"_xlfn.NORM.S.DIST": "NORM.S.DIST",
		"_xlfn.NORM.S.INV": "NORM.S.INV",
		"_xlfn.NUMBERVALUE": "NUMBERVALUE",
		"_xlfn.PDURATION": "PDURATION",
		"_xlfn.PERCENTILE.EXC": "PERCENTILE.EXC",
		"_xlfn.PERCENTILE.INC": "PERCENTILE.INC",
		"_xlfn.PERCENTRANK.EXC": "PERCENTRANK.EXC",
		"_xlfn.PERCENTRANK.INC": "PERCENTRANK.INC",
		"_xlfn.PERMUTATIONA": "PERMUTATIONA",
		"_xlfn.PHI": "PHI",
		"_xlfn.POISSON.DIST": "POISSON.DIST",
		"_xlfn.QUARTILE.EXC": "QUARTILE.EXC",
		"_xlfn.QUARTILE.INC": "QUARTILE.INC",
		"_xlfn.QUERYSTRING": "QUERYSTRING",
		"_xlfn.RANK.AVG": "RANK.AVG",
		"_xlfn.RANK.EQ": "RANK.EQ",
		"_xlfn.RRI": "RRI",
		"_xlfn.SEC": "SEC",
		"_xlfn.SECH": "SECH",
		"_xlfn.SHEET": "SHEET",
		"_xlfn.SHEETS": "SHEETS",
		"_xlfn.SKEW.P": "SKEW.P",
		"_xlfn.STDEV.P": "STDEV.P",
		"_xlfn.STDEV.S": "STDEV.S",
		"_xlfn.SUMIFS": "SUMIFS",
		"_xlfn.SWITCH": "SWITCH",
		"_xlfn.T.DIST": "T.DIST",
		"_xlfn.T.DIST.2T": "T.DIST.2T",
		"_xlfn.T.DIST.RT": "T.DIST.RT",
		"_xlfn.T.INV": "T.INV",
		"_xlfn.T.INV.2T": "T.INV.2T",
		"_xlfn.T.TEST": "T.TEST",
		"_xlfn.TEXTJOIN": "TEXTJOIN",
		"_xlfn.UNICHAR": "UNICHAR",
		"_xlfn.UNICODE": "UNICODE",
		"_xlfn.VAR.P": "VAR.P",
		"_xlfn.VAR.S": "VAR.S",
		"_xlfn.WEBSERVICE": "WEBSERVICE",
		"_xlfn.WEIBULL.DIST": "WEIBULL.DIST",
		"_xlfn.WORKDAY.INTL": "WORKDAY.INTL",
		"_xlfn.XOR": "XOR",
		"_xlfn.Z.TEST": "Z.TEST"
	};

	function wh(e) {
		if (e.slice(0, 3) == "of:") e = e.slice(3);
		if (e.charCodeAt(0) == 61) {
			e = e.slice(1);
			if (e.charCodeAt(0) == 61) e = e.slice(1)
		}
		e = e.replace(/COM\.MICROSOFT\./g, "");
		e = e.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g, function(e, r) {
			return r.replace(/\./g, "")
		});
		e = e.replace(/\[.(#[A-Z]*[?!])\]/g, "$1");
		return e.replace(/[;~]/g, ",").replace(/\|/g, ";")
	}

	function kh(e) {
		var r = "of:=" + e.replace(Rl, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
		return r.replace(/;/g, "|").replace(/,/g, ";")
	}

	function Sh(e) {
		var r = e.split(":");
		var t = r[0].split(".")[0];
		return [t, r[0].split(".")[1] + (r.length > 1 ? ":" + (r[1].split(".")[1] || r[1].split(".")[0]) : "")]
	}

	function Ah(e) {
		return e.replace(/\./, "!")
	}
	var _h = {};
	var Bh = {};
	_a.WS = ["http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
		"http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"
	];

	function Th(e, r) {
		for (var t = 0, a = e.length; t < a; ++t)
			if (e[t].t === r) {
				e.Count++;
				return t
			}
		e[a] = {
			t: r
		};
		e.Count++;
		e.Unique++;
		return a
	}

	function xh(e, r) {
		var t = {
			min: e + 1,
			max: e + 1
		};
		var a = -1;
		if (r.MDW) Wf = r.MDW;
		if (r.width != null) t.customWidth = 1;
		else if (r.wpx != null) a = zf(r.wpx);
		else if (r.wch != null) a = r.wch;
		if (a > -1) {
			t.width = Xf(a);
			t.customWidth = 1
		} else if (r.width != null) t.width = r.width;
		if (r.hidden) t.hidden = true;
		return t
	}

	function yh(e, r) {
		if (!e) return;
		var t = [.7, .7, .75, .75, .3, .3];
		if (r == "xlml") t = [1, 1, 1, 1, .5, .5];
		if (e.left == null) e.left = t[0];
		if (e.right == null) e.right = t[1];
		if (e.top == null) e.top = t[2];
		if (e.bottom == null) e.bottom = t[3];
		if (e.header == null) e.header = t[4];
		if (e.footer == null) e.footer = t[5]
	}

	function Ih(e, r, t) {
		var a = t.revssf[r.z != null ? r.z : "General"];
		var n = 60,
			i = e.length;
		if (a == null && t.ssf) {
			for (; n < 392; ++n)
				if (t.ssf[n] == null) {
					y.load(r.z, n);
					t.ssf[n] = r.z;
					t.revssf[r.z] = a = n;
					break
				}
		}
		for (n = 0; n != i; ++n)
			if (e[n].numFmtId === a) return n;
		e[i] = {
			numFmtId: a,
			fontId: 0,
			fillId: 0,
			borderId: 0,
			xfId: 0,
			applyNumberFormat: 1
		};
		return i
	}

	function Rh(e, r, t, a, n, i) {
		if (e.t === "z") return;
		if (e.t === "d" && typeof e.v === "string") e.v = te(e.v);
		try {
			if (a.cellNF) e.z = y._table[r]
		} catch (s) {
			if (a.WTF) throw s
		}
		if (!a || a.cellText !== false) try {
			if (y._table[r] == null) y.load(O[r] || "General", r);
			if (e.t === "e") e.w = e.w || Vt[e.v];
			else if (r === 0) {
				if (e.t === "n") {
					if ((e.v | 0) === e.v) e.w = y._general_int(e.v);
					else e.w = y._general_num(e.v)
				} else if (e.t === "d") {
					var f = Q(e.v);
					if ((f | 0) === f) e.w = y._general_int(f);
					else e.w = y._general_num(f)
				} else if (e.v === undefined) return "";
				else e.w = y._general(e.v, Bh)
			} else if (e.t === "d") e.w = y.format(r, Q(e.v), Bh);
			else e.w = y.format(r, e.v, Bh)
		} catch (s) {
			if (a.WTF) throw s
		}
		if (!a.cellStyles) return;
		if (t != null) try {
			e.s = i.Fills[t];
			if (e.s.fgColor && e.s.fgColor.theme && !e.s.fgColor.rgb) {
				e.s.fgColor.rgb = Lf(n.themeElements.clrScheme[e.s.fgColor.theme].rgb, e.s.fgColor.tint || 0);
				if (a.WTF) e.s.fgColor.raw_rgb = n.themeElements.clrScheme[e.s.fgColor.theme].rgb
			}
			if (e.s.bgColor && e.s.bgColor.theme) {
				e.s.bgColor.rgb = Lf(n.themeElements.clrScheme[e.s.bgColor.theme].rgb, e.s.bgColor.tint || 0);
				if (a.WTF) e.s.bgColor.raw_rgb = n.themeElements.clrScheme[e.s.bgColor.theme].rgb
			}
		} catch (s) {
			if (a.WTF && i.Fills) throw s
		}
	}

	function Oh(e, r) {
		var t = ct(r);
		if (t.s.r <= t.e.r && t.s.c <= t.e.c && t.s.r >= 0 && t.s.c >= 0) e["!ref"] = lt(t)
	}
	var Dh = /<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g;
	var Fh = /<(?:\w+:)?sheetData>([\s\S]*)<\/(?:\w+:)?sheetData>/;
	var Ph = /<(?:\w:)?hyperlink [^>]*>/gm;
	var Nh = /"(\w*:\w*)"/;
	var Lh = /<(?:\w:)?col[^>]*[\/]?>/g;
	var Mh = /<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g;
	var Uh = /<(?:\w:)?pageMargins[^>]*\/>/g;
	var Hh = /<(?:\w:)?sheetPr(?:[^>a-z][^>]*)?\/>/;
	var Wh = /<(?:\w:)?sheetViews[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetViews)>/;

	function Vh(e, r, t, a, n, i, s) {
		if (!e) return e;
		if (g != null && r.dense == null) r.dense = g;
		var f = r.dense ? [] : {};
		var o = {
			s: {
				r: 2e6,
				c: 2e6
			},
			e: {
				r: 0,
				c: 0
			}
		};
		var l = "",
			c = "";
		var h = e.match(Fh);
		if (h) {
			l = e.slice(0, h.index);
			c = e.slice(h.index + h[0].length)
		} else l = c = e;
		var u = l.match(Hh);
		if (u) Xh(u[0], f, n, t);
		var d = (l.match(/<(?:\w*:)?dimension/) || {
			index: -1
		}).index;
		if (d > 0) {
			var p = l.slice(d, d + 50).match(Nh);
			if (p) Oh(f, p[1])
		}
		var v = l.match(Wh);
		if (v && v[1]) eu(v[1], n);
		var m = [];
		if (r.cellStyles) {
			var b = l.match(Lh);
			if (b) $h(m, b)
		}
		if (h) au(h[1], f, r, o, i, s);
		var C = c.match(Mh);
		if (C) f["!autofilter"] = Qh(C[0]);
		var E = [];
		var w = c.match(Dh);
		if (w)
			for (d = 0; d != w.length; ++d) E[d] = ct(w[d].slice(w[d].indexOf('"') + 1));
		var k = c.match(Ph);
		if (k) jh(f, k, a);
		var S = c.match(Uh);
		if (S) f["!margins"] = Kh(Ae(S[0]));
		if (!f["!ref"] && o.e.c >= o.s.c && o.e.r >= o.s.r) f["!ref"] = lt(o);
		if (r.sheetRows > 0 && f["!ref"]) {
			var A = ct(f["!ref"]);
			if (r.sheetRows < +A.e.r) {
				A.e.r = r.sheetRows - 1;
				if (A.e.r > o.e.r) A.e.r = o.e.r;
				if (A.e.r < A.s.r) A.s.r = A.e.r;
				if (A.e.c > o.e.c) A.e.c = o.e.c;
				if (A.e.c < A.s.c) A.s.c = A.e.c;
				f["!fullref"] = f["!ref"];
				f["!ref"] = lt(A)
			}
		}
		if (m.length > 0) f["!cols"] = m;
		if (E.length > 0) f["!merges"] = E;
		return f
	}

	function zh(e) {
		if (e.length === 0) return "";
		var r = '<mergeCells count="' + e.length + '">';
		for (var t = 0; t != e.length; ++t) r += '<mergeCell ref="' + lt(e[t]) + '"/>';
		return r + "</mergeCells>"
	}

	function Xh(e, r, t, a) {
		var n = Ae(e);
		if (!t.Sheets[a]) t.Sheets[a] = {};
		if (n.codeName) t.Sheets[a].CodeName = n.codeName
	}

	function Gh(e) {
		var r = {
			sheet: 1
		};
		var t = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"];
		var a = ["formatColumns", "formatRows", "formatCells", "insertColumns", "insertRows", "insertHyperlinks", "deleteColumns", "deleteRows",
			"sort", "autoFilter", "pivotTables"
		];
		t.forEach(function(t) {
			if (e[t] != null && e[t]) r[t] = "1"
		});
		a.forEach(function(t) {
			if (e[t] != null && !e[t]) r[t] = "0"
		});
		if (e.password) r.password = _f(e.password).toString(16).toUpperCase();
		return qe("sheetProtection", null, r)
	}

	function jh(e, r, t) {
		var a = Array.isArray(e);
		for (var n = 0; n != r.length; ++n) {
			var i = Ae(Ue(r[n]), true);
			if (!i.ref) return;
			var s = ((t || {})["!id"] || [])[i.id];
			if (s) {
				i.Target = s.Target;
				if (i.location) i.Target += "#" + i.location
			} else {
				i.Target = "#" + i.location;
				s = {
					Target: i.Target,
					TargetMode: "Internal"
				}
			}
			i.Rel = s;
			if (i.tooltip) {
				i.Tooltip = i.tooltip;
				delete i.tooltip
			}
			var f = ct(i.ref);
			for (var o = f.s.r; o <= f.e.r; ++o)
				for (var l = f.s.c; l <= f.e.c; ++l) {
					var c = ft({
						c: l,
						r: o
					});
					if (a) {
						if (!e[o]) e[o] = [];
						if (!e[o][l]) e[o][l] = {
							t: "z",
							v: undefined
						};
						e[o][l].l = i
					} else {
						if (!e[c]) e[c] = {
							t: "z",
							v: undefined
						};
						e[c].l = i
					}
				}
		}
	}

	function Kh(e) {
		var r = {};
		["left", "right", "top", "bottom", "header", "footer"].forEach(function(t) {
			if (e[t]) r[t] = parseFloat(e[t])
		});
		return r
	}

	function Yh(e) {
		yh(e);
		return qe("pageMargins", null, e)
	}

	function $h(e, r) {
		var t = false;
		for (var a = 0; a != r.length; ++a) {
			var n = Ae(r[a], true);
			if (n.hidden) n.hidden = Me(n.hidden);
			var i = parseInt(n.min, 10) - 1,
				s = parseInt(n.max, 10) - 1;
			delete n.min;
			delete n.max;
			n.width = +n.width;
			if (!t && n.width) {
				t = true;
				jf(n.width)
			}
			Kf(n);
			while (i <= s) e[i++] = ne(n)
		}
	}

	function Zh(e, r) {
		var t = ["<cols>"],
			a;
		for (var n = 0; n != r.length; ++n) {
			if (!(a = r[n])) continue;
			t[t.length] = qe("col", null, xh(n, a))
		}
		t[t.length] = "</cols>";
		return t.join("")
	}

	function Qh(e) {
		var r = {
			ref: (e.match(/ref="([^"]*)"/) || [])[1]
		};
		return r
	}

	function Jh(e) {
		return qe("autoFilter", null, {
			ref: e.ref
		})
	}
	var qh = /<(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/>/;

	function eu(e, r) {
		(e.match(qh) || []).forEach(function(e) {
			var t = Ae(e);
			if (Me(t.rightToLeft)) {
				if (!r.Views) r.Views = [{}];
				if (!r.Views[0]) r.Views[0] = {};
				r.Views[0].RTL = true
			}
		})
	}

	function ru(e, r, t, a) {
		var n = {
			workbookViewId: "0"
		};
		if ((((a || {}).Workbook || {}).Views || [])[0]) n.rightToLeft = a.Workbook.Views[0].RTL ? "1" : "0";
		return qe("sheetViews", qe("sheetView", null, n), {})
	}

	function tu(e, r, t, a) {
		if (e.v === undefined && e.f === undefined || e.t === "z") return "";
		var n = "";
		var i = e.t,
			s = e.v;
		switch (e.t) {
			case "b":
				n = e.v ? "1" : "0";
				break;
			case "n":
				n = "" + e.v;
				break;
			case "e":
				n = Vt[e.v];
				break;
			case "d":
				if (a.cellDates) n = te(e.v, -1).toISOString();
				else {
					e = ne(e);
					e.t = "n";
					n = "" + (e.v = Q(te(e.v)))
				}
				if (typeof e.z === "undefined") e.z = y._table[14];
				break;
			default:
				n = e.v;
				break;
		}
		var f = Qe("v", Re(n)),
			o = {
				r: r
			};
		var l = Ih(a.cellXfs, e, a);
		if (l !== 0) o.s = l;
		switch (e.t) {
			case "n":
				break;
			case "d":
				o.t = "d";
				break;
			case "b":
				o.t = "b";
				break;
			case "e":
				o.t = "e";
				break;
			default:
				if (e.v == null) {
					delete e.t;
					break
				}
				if (a.bookSST) {
					f = Qe("v", "" + Th(a.Strings, e.v));
					o.t = "s";
					break
				}
				o.t = "str";
				break;
		}
		if (e.t != i) {
			e.t = i;
			e.v = s
		}
		if (e.f) {
			var c = e.F && e.F.slice(0, r.length) == r ? {
				t: "array",
				ref: e.F
			} : null;
			f = qe("f", Re(e.f), c) + (e.v != null ? f : "")
		}
		if (e.l) t["!links"].push([r, e.l]);
		if (e.c) t["!comments"].push([r, e.c]);
		return qe("c", f, o)
	}
	var au = function() {
		var e = /<(?:\w+:)?c[ >]/,
			r = /<\/(?:\w+:)?row>/;
		var t = /r=["']([^"']*)["']/,
			a = /<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/;
		var n = /ref=["']([^"']*)["']/;
		var i = Xe("v"),
			s = Xe("f");
		return function f(o, l, c, h, u, d) {
			var p = 0,
				v = "",
				g = [],
				m = [],
				b = 0,
				C = 0,
				E = 0,
				w = "",
				k;
			var S, A = 0,
				_ = 0;
			var B, T;
			var x = 0,
				I = 0;
			var R = Array.isArray(d.CellXf),
				O;
			var D = [];
			var F = [];
			var P = Array.isArray(l);
			var N = [],
				L = {},
				M = false;
			for (var U = o.split(r), H = 0, W = U.length; H != W; ++H) {
				v = U[H].trim();
				var V = v.length;
				if (V === 0) continue;
				for (p = 0; p < V; ++p)
					if (v.charCodeAt(p) === 62) break;
					++p;
				S = Ae(v.slice(0, p), true);
				A = S.r != null ? parseInt(S.r, 10) : A + 1;
				_ = -1;
				if (c.sheetRows && c.sheetRows < A) continue;
				if (h.s.r > A - 1) h.s.r = A - 1;
				if (h.e.r < A - 1) h.e.r = A - 1;
				if (c && c.cellStyles) {
					L = {};
					M = false;
					if (S.ht) {
						M = true;
						L.hpt = parseFloat(S.ht);
						L.hpx = Qf(L.hpt)
					}
					if (S.hidden == "1") {
						M = true;
						L.hidden = true
					}
					if (S.outlineLevel != null) {
						M = true;
						L.level = +S.outlineLevel
					}
					if (M) N[A - 1] = L
				}
				g = v.slice(p).split(e);
				for (p = 0; p != g.length; ++p) {
					v = g[p].trim();
					if (v.length === 0) continue;
					m = v.match(t);
					b = p;
					C = 0;
					E = 0;
					v = "<c " + (v.slice(0, 1) == "<" ? ">" : "") + v;
					if (m != null && m.length === 2) {
						b = 0;
						w = m[1];
						for (C = 0; C != w.length; ++C) {
							if ((E = w.charCodeAt(C) - 64) < 1 || E > 26) break;
							b = 26 * b + E
						}--b;
						_ = b
					} else ++_;
					for (C = 0; C != v.length; ++C)
						if (v.charCodeAt(C) === 62) break;
						++C;
					S = Ae(v.slice(0, C), true);
					if (!S.r) S.r = ft({
						r: A - 1,
						c: _
					});
					w = v.slice(C);
					k = {
						t: ""
					};
					if ((m = w.match(i)) != null && m[1] !== "") k.v = xe(m[1]);
					if (c.cellFormula) {
						if ((m = w.match(s)) != null && m[1] !== "") {
							k.f = Nl(xe(Ue(m[1])));
							if (m[0].indexOf('t="array"') > -1) {
								k.F = (w.match(n) || [])[1];
								if (k.F.indexOf(":") > -1) D.push([ct(k.F), k.F])
							} else if (m[0].indexOf('t="shared"') > -1) {
								T = Ae(m[0]);
								F[parseInt(T.si, 10)] = [T, Nl(xe(Ue(m[1])))]
							}
						} else if (m = w.match(/<f[^>]*\/>/)) {
							T = Ae(m[0]);
							if (F[T.si]) k.f = Fl(F[T.si][1], F[T.si][0].ref, S.r)
						}
						var z = st(S.r);
						for (C = 0; C < D.length; ++C)
							if (z.r >= D[C][0].s.r && z.r <= D[C][0].e.r)
								if (z.c >= D[C][0].s.c && z.c <= D[C][0].e.c) k.F = D[C][1]
					}
					if (S.t == null && k.v === undefined) {
						if (k.f || k.F) {
							k.v = 0;
							k.t = "n"
						} else if (!c.sheetStubs) continue;
						else k.t = "z"
					} else k.t = S.t || "n";
					if (h.s.c > b) h.s.c = b;
					if (h.e.c < b) h.e.c = b;
					switch (k.t) {
						case "n":
							if (k.v == "" || k.v == null) {
								if (!c.sheetStubs) continue;
								k.t = "z"
							} else k.v = parseFloat(k.v);
							break;
						case "s":
							if (typeof k.v == "undefined") {
								if (!c.sheetStubs) continue;
								k.t = "z"
							} else {
								B = _h[parseInt(k.v, 10)];
								k.v = B.t;
								k.r = B.r;
								if (c.cellHTML) k.h = B.h
							}
							break;
						case "str":
							k.t = "s";
							k.v = k.v != null ? Ue(k.v) : "";
							if (c.cellHTML) k.h = Fe(k.v);
							break;
						case "inlineStr":
							m = w.match(a);
							k.t = "s";
							if (m != null && (B = Zs(m[1]))) k.v = B.t;
							else k.v = "";
							break;
						case "b":
							k.v = Me(k.v);
							break;
						case "d":
							if (c.cellDates) k.v = te(k.v, 1);
							else {
								k.v = Q(te(k.v, 1));
								k.t = "n"
							}
							break;
						case "e":
							if (!c || c.cellText !== false) k.w = k.v;
							k.v = zt[k.v];
							break;
					}
					x = I = 0;
					if (R && S.s !== undefined) {
						O = d.CellXf[S.s];
						if (O != null) {
							if (O.numFmtId != null) x = O.numFmtId;
							if (c.cellStyles) {
								if (O.fillId != null) I = O.fillId
							}
						}
					}
					Rh(k, x, I, c, u, d);
					if (c.cellDates && R && k.t == "n" && y.is_date(y._table[x])) {
						k.t = "d";
						k.v = J(k.v)
					}
					if (P) {
						var X = st(S.r);
						if (!l[X.r]) l[X.r] = [];
						l[X.r][X.c] = k
					} else l[S.r] = k
				}
			}
			if (N.length > 0) l["!rows"] = N
		}
	}();

	function nu(e, r, t, a) {
		var n = [],
			i = [],
			s = ct(e["!ref"]),
			f = "",
			o, l = "",
			c = [],
			h = 0,
			u = 0,
			d = e["!rows"];
		var p = Array.isArray(e);
		var v = {
				r: l
			},
			g, m = -1;
		for (u = s.s.c; u <= s.e.c; ++u) c[u] = tt(u);
		for (h = s.s.r; h <= s.e.r; ++h) {
			i = [];
			l = Jr(h);
			for (u = s.s.c; u <= s.e.c; ++u) {
				o = c[u] + l;
				var b = p ? (e[h] || [])[u] : e[o];
				if (b === undefined) continue;
				if ((f = tu(b, o, e, r, t, a)) != null) i.push(f)
			}
			if (i.length > 0 || d && d[h]) {
				v = {
					r: l
				};
				if (d && d[h]) {
					g = d[h];
					if (g.hidden) v.hidden = 1;
					m = -1;
					if (g.hpx) m = Zf(g.hpx);
					else if (g.hpt) m = g.hpt;
					if (m > -1) {
						v.ht = m;
						v.customHeight = 1
					}
					if (g.level) {
						v.outlineLevel = g.level
					}
				}
				n[n.length] = qe("row", i.join(""), v)
			}
		}
		if (d)
			for (; h < d.length; ++h) {
				if (d && d[h]) {
					v = {
						r: h + 1
					};
					g = d[h];
					if (g.hidden) v.hidden = 1;
					m = -1;
					if (g.hpx) m = Zf(g.hpx);
					else if (g.hpt) m = g.hpt;
					if (m > -1) {
						v.ht = m;
						v.customHeight = 1
					}
					if (g.level) {
						v.outlineLevel = g.level
					}
					n[n.length] = qe("row", "", v)
				}
			}
		return n.join("")
	}
	var iu = qe("worksheet", null, {
		xmlns: tr.main[0],
		"xmlns:r": tr.r
	});

	function su(e, r, t, a) {
		var n = [Ce, iu];
		var i = t.SheetNames[e],
			s = 0,
			f = "";
		var o = t.Sheets[i];
		if (o == null) o = {};
		var l = o["!ref"];
		if (l == null) l = "A1";
		if (!a) a = {};
		o["!comments"] = [];
		o["!drawing"] = [];
		if (r.bookType !== "xlsx" && t.vbaraw) {
			var c = t.SheetNames[e];
			try {
				if (t.Workbook) c = t.Workbook.Sheets[e].CodeName || c
			} catch (h) {}
			n[n.length] = qe("sheetPr", null, {
				codeName: Re(c)
			})
		}
		n[n.length] = qe("dimension", null, {
			ref: l
		});
		n[n.length] = ru(o, r, e, t);
		if (r.sheetFormat) n[n.length] = qe("sheetFormatPr", null, {
			defaultRowHeight: r.sheetFormat.defaultRowHeight || "16",
			baseColWidth: r.sheetFormat.baseColWidth || "10",
			outlineLevelRow: r.sheetFormat.outlineLevelRow || "7"
		});
		if (o["!cols"] != null && o["!cols"].length > 0) n[n.length] = Zh(o, o["!cols"]);
		n[s = n.length] = "<sheetData/>";
		o["!links"] = [];
		if (o["!ref"] != null) {
			f = nu(o, r, e, t, a);
			if (f.length > 0) n[n.length] = f
		}
		if (n.length > s + 1) {
			n[n.length] = "</sheetData>";
			n[s] = n[s].replace("/>", ">")
		}
		if (o["!protect"] != null) n[n.length] = Gh(o["!protect"]);
		if (o["!autofilter"] != null) n[n.length] = Jh(o["!autofilter"]);
		if (o["!merges"] != null && o["!merges"].length > 0) n[n.length] = zh(o["!merges"]);
		var u = -1,
			d, p = -1;
		if (o["!links"].length > 0) {
			n[n.length] = "<hyperlinks>";
			o["!links"].forEach(function(e) {
				if (!e[1].Target) return;
				d = {
					ref: e[0]
				};
				if (e[1].Target.charAt(0) != "#") {
					p = Ia(a, -1, Re(e[1].Target).replace(/#.*$/, ""), _a.HLINK);
					d["r:id"] = "rId" + p
				}
				if ((u = e[1].Target.indexOf("#")) > -1) d.location = Re(e[1].Target.slice(u + 1));
				if (e[1].Tooltip) d.tooltip = Re(e[1].Tooltip);
				n[n.length] = qe("hyperlink", null, d)
			});
			n[n.length] = "</hyperlinks>"
		}
		delete o["!links"];
		if (o["!margins"] != null) n[n.length] = Yh(o["!margins"]);
		n[n.length] = "";
		n[n.length] = Qe("ignoredErrors", qe("ignoredError", null, {
			numberStoredAsText: 1,
			sqref: l
		}));
		if (o["!drawing"].length > 0) {
			p = Ia(a, -1, "../drawings/drawing" + (e + 1) + ".xml", _a.DRAW);
			n[n.length] = qe("drawing", null, {
				"r:id": "rId" + p
			})
		} else delete o["!drawing"];
		if (o["!comments"].length > 0) {
			p = Ia(a, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", _a.VML);
			n[n.length] = qe("legacyDrawing", null, {
				"r:id": "rId" + p
			});
			o["!legacy"] = p
		}
		if (n.length > 2) {
			n[n.length] = "</worksheet>";
			n[1] = n[1].replace("/>", ">")
		}
		return n.join("")
	}

	function fu(e, r) {
		var t = {};
		var a = e.l + r;
		t.r = e._R(4);
		e.l += 4;
		var n = e._R(2);
		e.l += 1;
		var i = e._R(1);
		e.l = a;
		if (i & 7) t.level = i & 7;
		if (i & 16) t.hidden = true;
		if (i & 32) t.hpt = n / 20;
		return t
	}

	function ou(e, r, t) {
		var a = Wr(17 + 8 * 16);
		var n = (t["!rows"] || [])[e] || {};
		a._W(4, e);
		a._W(4, 0);
		var i = 320;
		if (n.hpx) i = Zf(n.hpx) * 20;
		else if (n.hpt) i = n.hpt * 20;
		a._W(2, i);
		a._W(1, 0);
		var s = 0;
		if (n.level) s |= n.level;
		if (n.hidden) s |= 16;
		if (n.hpx || n.hpt) s |= 32;
		a._W(1, s);
		a._W(1, 0);
		var f = 0,
			o = a.l;
		a.l += 4;
		var l = {
			r: e,
			c: 0
		};
		for (var c = 0; c < 16; ++c) {
			if (r.s.c > c + 1 << 10 || r.e.c < c << 10) continue;
			var h = -1,
				u = -1;
			for (var d = c << 10; d < c + 1 << 10; ++d) {
				l.c = d;
				var p = Array.isArray(t) ? (t[l.r] || [])[l.c] : t[ft(l)];
				if (p) {
					if (h < 0) h = d;
					u = d
				}
			}
			if (h < 0) continue;
			++f;
			a._W(4, h);
			a._W(4, u)
		}
		var v = a.l;
		a.l = o;
		a._W(4, f);
		a.l = v;
		return a.length > a.l ? a.slice(0, a.l) : a
	}

	function lu(e, r, t, a) {
		var n = ou(a, t, r);
		if (n.length > 17 || (r["!rows"] || [])[a]) Xr(e, "BrtRowHdr", n)
	}
	var cu = Mt;
	var hu = Ut;

	function uu() {}

	function du(e, r) {
		var t = {};
		e.l += 19;
		t.name = Tt(e, r - 19);
		return t
	}

	function pu(e, r) {
		if (r == null) r = Wr(84 + 4 * e.length);
		for (var t = 0; t < 3; ++t) r._W(1, 0);
		Gt({
			auto: 1
		}, r);
		r._W(-4, -1);
		r._W(-4, -1);
		xt(e, r);
		return r.slice(0, r.l)
	}

	function vu(e) {
		var r = _t(e);
		return [r]
	}

	function gu(e, r, t) {
		if (t == null) t = Wr(8);
		return Bt(r, t)
	}

	function mu(e) {
		var r = _t(e);
		var t = e._R(1);
		return [r, t, "b"]
	}

	function bu(e, r, t) {
		if (t == null) t = Wr(9);
		Bt(r, t);
		t._W(1, e.v ? 1 : 0);
		return t
	}

	function Cu(e) {
		var r = _t(e);
		var t = e._R(1);
		return [r, t, "e"]
	}

	function Eu(e) {
		var r = _t(e);
		var t = e._R(4);
		return [r, t, "s"]
	}

	function wu(e, r, t) {
		if (t == null) t = Wr(12);
		Bt(r, t);
		t._W(4, r.v);
		return t
	}

	function ku(e) {
		var r = _t(e);
		var t = Ht(e);
		return [r, t, "n"]
	}

	function Su(e, r, t) {
		if (t == null) t = Wr(16);
		Bt(r, t);
		Wt(e.v, t);
		return t
	}

	function Au(e) {
		var r = _t(e);
		var t = Ft(e);
		return [r, t, "n"]
	}

	function _u(e, r, t) {
		if (t == null) t = Wr(12);
		Bt(r, t);
		Pt(e.v, t);
		return t
	}

	function Bu(e) {
		var r = _t(e);
		var t = mt(e);
		return [r, t, "str"]
	}

	function Tu(e, r, t) {
		if (t == null) t = Wr(12 + 4 * e.v.length);
		Bt(r, t);
		bt(e.v, t);
		return t.length > t.l ? t.slice(0, t.l) : t
	}

	function xu(e, r, t) {
		var a = e.l + r;
		var n = _t(e);
		n.r = t["!row"];
		var i = e._R(1);
		var s = [n, i, "b"];
		if (t.cellFormula) {
			e.l += 2;
			var f = ph(e, a - e.l, t);
			s[3] = ih(f, null, n, t.supbooks, t)
		} else e.l = a;
		return s
	}

	function yu(e, r, t) {
		var a = e.l + r;
		var n = _t(e);
		n.r = t["!row"];
		var i = e._R(1);
		var s = [n, i, "e"];
		if (t.cellFormula) {
			e.l += 2;
			var f = ph(e, a - e.l, t);
			s[3] = ih(f, null, n, t.supbooks, t)
		} else e.l = a;
		return s
	}

	function Iu(e, r, t) {
		var a = e.l + r;
		var n = _t(e);
		n.r = t["!row"];
		var i = Ht(e);
		var s = [n, i, "n"];
		if (t.cellFormula) {
			e.l += 2;
			var f = ph(e, a - e.l, t);
			s[3] = ih(f, null, n, t.supbooks, t)
		} else e.l = a;
		return s
	}

	function Ru(e, r, t) {
		var a = e.l + r;
		var n = _t(e);
		n.r = t["!row"];
		var i = mt(e);
		var s = [n, i, "str"];
		if (t.cellFormula) {
			e.l += 2;
			var f = ph(e, a - e.l, t);
			s[3] = ih(f, null, n, t.supbooks, t)
		} else e.l = a;
		return s
	}
	var Ou = Mt;
	var Du = Ut;

	function Fu(e, r) {
		if (r == null) r = Wr(4);
		r._W(4, e);
		return r
	}

	function Pu(e, r) {
		var t = e.l + r;
		var a = Mt(e, 16);
		var n = yt(e);
		var i = mt(e);
		var s = mt(e);
		var f = mt(e);
		e.l = t;
		var o = {
			rfx: a,
			relId: n,
			loc: i,
			display: f
		};
		if (s) o.Tooltip = s;
		return o
	}

	function Nu(e, r) {
		var t = Wr(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
		Ut({
			s: st(e[0]),
			e: st(e[0])
		}, t);
		Dt("rId" + r, t);
		var a = e[1].Target.indexOf("#");
		var n = a == -1 ? "" : e[1].Target.slice(a + 1);
		bt(n || "", t);
		bt(e[1].Tooltip || "", t);
		bt("", t);
		return t.slice(0, t.l)
	}

	function Lu(e, r, t) {
		var a = e.l + r;
		var n = Nt(e, 16);
		var i = e._R(1);
		var s = [n];
		s[2] = i;
		if (t.cellFormula) {
			var f = dh(e, a - e.l, t);
			s[1] = f
		} else e.l = a;
		return s
	}

	function Mu(e, r, t) {
		var a = e.l + r;
		var n = Mt(e, 16);
		var i = [n];
		if (t.cellFormula) {
			var s = gh(e, a - e.l, t);
			i[1] = s;
			e.l = a
		} else e.l = a;
		return i
	}

	function Uu(e, r, t) {
		if (t == null) t = Wr(18);
		var a = xh(e, r);
		t._W(-4, e);
		t._W(-4, e);
		t._W(4, (a.width || 10) * 256);
		t._W(4, 0);
		var n = 0;
		if (r.hidden) n |= 1;
		if (typeof a.width == "number") n |= 2;
		t._W(1, n);
		t._W(1, 0);
		return t
	}
	var Hu = ["left", "right", "top", "bottom", "header", "footer"];

	function Wu(e) {
		var r = {};
		Hu.forEach(function(t) {
			r[t] = Ht(e, 8)
		});
		return r
	}

	function Vu(e, r) {
		if (r == null) r = Wr(6 * 8);
		yh(e);
		Hu.forEach(function(t) {
			Wt(e[t], r)
		});
		return r
	}

	function zu(e) {
		var r = e._R(2);
		e.l += 28;
		return {
			RTL: r & 32
		}
	}

	function Xu(e, r, t) {
		if (t == null) t = Wr(30);
		var a = 924;
		if ((((r || {}).Views || [])[0] || {}).RTL) a |= 32;
		t._W(2, a);
		t._W(4, 0);
		t._W(4, 0);
		t._W(4, 0);
		t._W(1, 0);
		t._W(1, 0);
		t._W(2, 0);
		t._W(2, 100);
		t._W(2, 0);
		t._W(2, 0);
		t._W(2, 0);
		t._W(4, 0);
		return t
	}

	function Gu(e) {
		var r = Wr(24);
		r._W(4, 4);
		r._W(4, 1);
		Ut(e, r);
		return r
	}

	function ju(e, r) {
		if (r == null) r = Wr(16 * 4 + 2);
		r._W(2, e.password ? _f(e.password) : 0);
		r._W(4, 1);
		[
			["objects", false],
			["scenarios", false],
			["formatCells", true],
			["formatColumns", true],
			["formatRows", true],
			["insertColumns", true],
			["insertRows", true],
			["insertHyperlinks", true],
			["deleteColumns", true],
			["deleteRows", true],
			["selectLockedCells", false],
			["sort", true],
			["autoFilter", true],
			["pivotTables", true],
			["selectUnlockedCells", false]
		].forEach(function(t) {
			if (t[1]) r._W(4, e[t[0]] != null && !e[t[0]] ? 1 : 0);
			else r._W(4, e[t[0]] != null && e[t[0]] ? 0 : 1)
		});
		return r
	}

	function Ku(e, r, t, a, n, i, s) {
		if (!e) return e;
		var f = r || {};
		if (!a) a = {
			"!id": {}
		};
		if (g != null && f.dense == null) f.dense = g;
		var o = f.dense ? [] : {};
		var l;
		var c = {
			s: {
				r: 2e6,
				c: 2e6
			},
			e: {
				r: 0,
				c: 0
			}
		};
		var h = false,
			u = false;
		var d, p, v, m, b, C, E, w, k;
		var S = [];
		f.biff = 12;
		f["!row"] = 0;
		var A = 0,
			_ = false;
		var B = [];
		var T = {};
		var x = f.supbooks || [
			[]
		];
		x.sharedf = T;
		x.arrayf = B;
		x.SheetNames = n.SheetNames || n.Sheets.map(function(e) {
			return e.name
		});
		if (!f.supbooks) {
			f.supbooks = x;
			if (n.Names)
				for (var I = 0; I < n.Names.length; ++I) x[0][I + 1] = n.Names[I]
		}
		var R = [],
			O = [];
		var D = false;
		Vr(e, function P(e, r, g) {
			if (u) return;
			switch (g) {
				case 148:
					l = e;
					break;
				case 0:
					d = e;
					if (f.sheetRows && f.sheetRows <= d.r) u = true;
					w = Jr(m = d.r);
					f["!row"] = d.r;
					if (e.hidden || e.hpt || e.level != null) {
						if (e.hpt) e.hpx = Qf(e.hpt);
						O[e.r] = e
					}
					break;
				case 2:
					;
				case 3:
					;
				case 4:
					;
				case 5:
					;
				case 6:
					;
				case 7:
					;
				case 8:
					;
				case 9:
					;
				case 10:
					;
				case 11:
					p = {
						t: e[2]
					};
					switch (e[2]) {
						case "n":
							p.v = e[1];
							break;
						case "s":
							E = _h[e[1]];
							p.v = E.t;
							p.r = E.r;
							break;
						case "b":
							p.v = e[1] ? true : false;
							break;
						case "e":
							p.v = e[1];
							if (f.cellText !== false) p.w = Vt[p.v];
							break;
						case "str":
							p.t = "s";
							p.v = e[1];
							break;
					}
					if (v = s.CellXf[e[0].iStyleRef]) Rh(p, v.numFmtId, null, f, i, s);
					b = e[0].c;
					if (f.dense) {
						if (!o[m]) o[m] = [];
						o[m][b] = p
					} else o[tt(b) + w] = p;
					if (f.cellFormula) {
						_ = false;
						for (A = 0; A < B.length; ++A) {
							var I = B[A];
							if (d.r >= I[0].s.r && d.r <= I[0].e.r)
								if (b >= I[0].s.c && b <= I[0].e.c) {
									p.F = lt(I[0]);
									_ = true
								}
						}
						if (!_ && e.length > 3) p.f = e[3]
					}
					if (c.s.r > d.r) c.s.r = d.r;
					if (c.s.c > b) c.s.c = b;
					if (c.e.r < d.r) c.e.r = d.r;
					if (c.e.c < b) c.e.c = b;
					if (f.cellDates && v && p.t == "n" && y.is_date(y._table[v.numFmtId])) {
						var F = y.parse_date_code(p.v);
						if (F) {
							p.t = "d";
							p.v = new Date(F.y, F.m - 1, F.d, F.H, F.M, F.S, F.u)
						}
					}
					break;
				case 1:
					if (!f.sheetStubs || h) break;
					p = {
						t: "z",
						v: undefined
					};
					b = e[0].c;
					if (f.dense) {
						if (!o[m]) o[m] = [];
						o[m][b] = p
					} else o[tt(b) + w] = p;
					if (c.s.r > d.r) c.s.r = d.r;
					if (c.s.c > b) c.s.c = b;
					if (c.e.r < d.r) c.e.r = d.r;
					if (c.e.c < b) c.e.c = b;
					break;
				case 176:
					S.push(e);
					break;
				case 494:
					var P = a["!id"][e.relId];
					if (P) {
						e.Target = P.Target;
						if (e.loc) e.Target += "#" + e.loc;
						e.Rel = P
					} else if (e.relId == "") {
						e.Target = "#" + e.loc
					}
					for (m = e.rfx.s.r; m <= e.rfx.e.r; ++m)
						for (b = e.rfx.s.c; b <= e.rfx.e.c; ++b) {
							if (f.dense) {
								if (!o[m]) o[m] = [];
								if (!o[m][b]) o[m][b] = {
									t: "z",
									v: undefined
								};
								o[m][b].l = e
							} else {
								C = ft({
									c: b,
									r: m
								});
								if (!o[C]) o[C] = {
									t: "z",
									v: undefined
								};
								o[C].l = e
							}
						}
					break;
				case 426:
					if (!f.cellFormula) break;
					B.push(e);
					k = f.dense ? o[m][b] : o[tt(b) + w];
					k.f = ih(e[1], c, {
						r: d.r,
						c: b
					}, x, f);
					k.F = lt(e[0]);
					break;
				case 427:
					if (!f.cellFormula) break;
					T[ft(e[0].s)] = e[1];
					k = f.dense ? o[m][b] : o[tt(b) + w];
					k.f = ih(e[1], c, {
						r: d.r,
						c: b
					}, x, f);
					break;
				case 60:
					if (!f.cellStyles) break;
					while (e.e >= e.s) {
						R[e.e--] = {
							width: e.w / 256,
							hidden: !!(e.flags & 1)
						};
						if (!D) {
							D = true;
							jf(e.w / 256)
						}
						Kf(R[e.e + 1])
					}
					break;
				case 161:
					o["!autofilter"] = {
						ref: lt(e)
					};
					break;
				case 476:
					o["!margins"] = e;
					break;
				case 147:
					if (!n.Sheets[t]) n.Sheets[t] = {};
					if (e.name) n.Sheets[t].CodeName = e.name;
					break;
				case 137:
					if (!n.Views) n.Views = [{}];
					if (!n.Views[0]) n.Views[0] = {};
					if (e.RTL) n.Views[0].RTL = true;
					break;
				case 485:
					break;
				case 175:
					;
				case 644:
					;
				case 625:
					;
				case 562:
					;
				case 396:
					;
				case 1112:
					;
				case 1146:
					;
				case 471:
					;
				case 1050:
					;
				case 649:
					;
				case 1105:
					;
				case 49:
					;
				case 589:
					;
				case 607:
					;
				case 564:
					;
				case 1055:
					;
				case 168:
					;
				case 174:
					;
				case 1180:
					;
				case 499:
					;
				case 64:
					;
				case 1053:
					;
				case 550:
					;
				case 171:
					;
				case 167:
					;
				case 1177:
					;
				case 169:
					;
				case 1181:
					;
				case 551:
					;
				case 552:
					;
				case 661:
					;
				case 639:
					;
				case 478:
					;
				case 151:
					;
				case 537:
					;
				case 477:
					;
				case 536:
					;
				case 1103:
					;
				case 680:
					;
				case 1104:
					;
				case 1024:
					;
				case 152:
					;
				case 663:
					;
				case 535:
					;
				case 678:
					;
				case 504:
					;
				case 1043:
					;
				case 428:
					;
				case 170:
					;
				case 50:
					;
				case 2070:
					;
				case 1045:
					break;
				case 35:
					h = true;
					break;
				case 36:
					h = false;
					break;
				case 37:
					break;
				case 38:
					break;
				default:
					if ((r || "").indexOf("Begin") > 0) {} else if ((r || "").indexOf("End") > 0) {} else if (!h || f.WTF) throw new Error(
						"Unexpected record " + g + " " + r);
			}
		}, f);
		delete f.supbooks;
		delete f["!row"];
		if (!o["!ref"] && (c.s.r < 2e6 || l && (l.e.r > 0 || l.e.c > 0 || l.s.r > 0 || l.s.c > 0))) o["!ref"] = lt(l || c);
		if (f.sheetRows && o["!ref"]) {
			var F = ct(o["!ref"]);
			if (f.sheetRows < +F.e.r) {
				F.e.r = f.sheetRows - 1;
				if (F.e.r > c.e.r) F.e.r = c.e.r;
				if (F.e.r < F.s.r) F.s.r = F.e.r;
				if (F.e.c > c.e.c) F.e.c = c.e.c;
				if (F.e.c < F.s.c) F.s.c = F.e.c;
				o["!fullref"] = o["!ref"];
				o["!ref"] = lt(F)
			}
		}
		if (S.length > 0) o["!merges"] = S;
		if (R.length > 0) o["!cols"] = R;
		if (O.length > 0) o["!rows"] = O;
		return o
	}

	function Yu(e, r, t, a, n, i) {
		if (r.v === undefined) return "";
		var s = "";
		switch (r.t) {
			case "b":
				s = r.v ? "1" : "0";
				break;
			case "d":
				r = ne(r);
				r.z = r.z || y._table[14];
				r.v = Q(te(r.v));
				r.t = "n";
				break;
			case "n":
				;
			case "e":
				s = "" + r.v;
				break;
			default:
				s = r.v;
				break;
		}
		var f = {
			r: t,
			c: a
		};
		f.s = Ih(n.cellXfs, r, n);
		if (r.l) i["!links"].push([ft(f), r.l]);
		if (r.c) i["!comments"].push([ft(f), r.c]);
		switch (r.t) {
			case "s":
				;
			case "str":
				if (n.bookSST) {
					s = Th(n.Strings, r.v);
					f.t = "s";
					f.v = s;
					Xr(e, "BrtCellIsst", wu(r, f))
				} else {
					f.t = "str";
					Xr(e, "BrtCellSt", Tu(r, f))
				}
				return;
			case "n":
				if (r.v == (r.v | 0) && r.v > -1e3 && r.v < 1e3) Xr(e, "BrtCellRk", _u(r, f));
				else Xr(e, "BrtCellReal", Su(r, f));
				return;
			case "b":
				f.t = "b";
				Xr(e, "BrtCellBool", bu(r, f));
				return;
			case "e":
				f.t = "e";
				break;
		}
		Xr(e, "BrtCellBlank", gu(r, f))
	}

	function $u(e, r, t, a) {
		var n = ct(r["!ref"] || "A1"),
			i, s = "",
			f = [];
		Xr(e, "BrtBeginSheetData");
		var o = Array.isArray(r);
		var l = n.e.r;
		if (r["!rows"]) l = Math.max(n.e.r, r["!rows"].length - 1);
		for (var c = n.s.r; c <= l; ++c) {
			s = Jr(c);
			lu(e, r, n, c);
			if (c <= n.e.r)
				for (var h = n.s.c; h <= n.e.c; ++h) {
					if (c === n.s.r) f[h] = tt(h);
					i = f[h] + s;
					var u = o ? (r[c] || [])[h] : r[i];
					if (!u) continue;
					Yu(e, u, c, h, a, r)
				}
		}
		Xr(e, "BrtEndSheetData")
	}

	function Zu(e, r) {
		if (!r || !r["!merges"]) return;
		Xr(e, "BrtBeginMergeCells", Fu(r["!merges"].length));
		r["!merges"].forEach(function(r) {
			Xr(e, "BrtMergeCell", Du(r))
		});
		Xr(e, "BrtEndMergeCells")
	}

	function Qu(e, r) {
		if (!r || !r["!cols"]) return;
		Xr(e, "BrtBeginColInfos");
		r["!cols"].forEach(function(r, t) {
			if (r) Xr(e, "BrtColInfo", Uu(t, r))
		});
		Xr(e, "BrtEndColInfos")
	}

	function Ju(e, r) {
		if (!r || !r["!ref"]) return;
		Xr(e, "BrtBeginCellIgnoreECs");
		Xr(e, "BrtCellIgnoreEC", Gu(ct(r["!ref"])));
		Xr(e, "BrtEndCellIgnoreECs")
	}

	function qu(e, r, t) {
		r["!links"].forEach(function(r) {
			if (!r[1].Target) return;
			var a = Ia(t, -1, r[1].Target.replace(/#.*$/, ""), _a.HLINK);
			Xr(e, "BrtHLink", Nu(r, a))
		});
		delete r["!links"]
	}

	function ed(e, r, t, a) {
		if (r["!comments"].length > 0) {
			var n = Ia(a, -1, "../drawings/vmlDrawing" + (t + 1) + ".vml", _a.VML);
			Xr(e, "BrtLegacyDrawing", Dt("rId" + n));
			r["!legacy"] = n
		}
	}

	function rd(e, r) {
		if (!r["!autofilter"]) return;
		Xr(e, "BrtBeginAFilter", Ut(ct(r["!autofilter"].ref)));
		Xr(e, "BrtEndAFilter")
	}

	function td(e, r, t) {
		Xr(e, "BrtBeginWsViews"); {
			Xr(e, "BrtBeginWsView", Xu(r, t));
			Xr(e, "BrtEndWsView")
		}
		Xr(e, "BrtEndWsViews")
	}

	function ad() {}

	function nd(e, r) {
		if (!r["!protect"]) return;
		Xr(e, "BrtSheetProtection", ju(r["!protect"]))
	}

	function id(e, r, t, a) {
		var n = zr();
		var i = t.SheetNames[e],
			s = t.Sheets[i] || {};
		var f = i;
		try {
			if (t && t.Workbook) f = t.Workbook.Sheets[e].CodeName || f
		} catch (o) {}
		var l = ct(s["!ref"] || "A1");
		s["!links"] = [];
		s["!comments"] = [];
		Xr(n, "BrtBeginSheet");
		if (t.vbaraw) Xr(n, "BrtWsProp", pu(f));
		Xr(n, "BrtWsDim", hu(l));
		td(n, s, t.Workbook);
		ad(n, s);
		Qu(n, s, e, r, t);
		$u(n, s, e, r, t);
		nd(n, s);
		rd(n, s);
		Zu(n, s);
		qu(n, s, a);
		if (s["!margins"]) Xr(n, "BrtMargins", Vu(s["!margins"]));
		Ju(n, s);
		ed(n, s, e, a);
		Xr(n, "BrtEndSheet");
		return n.end()
	}

	function sd(e) {
		var r = [];
		(e.match(/<c:pt idx="(\d*)">(.*?)<\/c:pt>/gm) || []).forEach(function(e) {
			var t = e.match(/<c:pt idx="(\d*?)"><c:v>(.*)<\/c:v><\/c:pt>/);
			if (!t) return;
			r[+t[1]] = +t[2]
		});
		var t = xe((e.match(/<c:formatCode>([\s\S]*?)<\/c:formatCode>/) || ["", "General"])[1]);
		return [r, t]
	}

	function fd(e, r, t, a, n, i) {
		var s = i || {
			"!type": "chart"
		};
		if (!e) return i;
		var f = 0,
			o = 0,
			l = "A";
		var c = {
			s: {
				r: 2e6,
				c: 2e6
			},
			e: {
				r: 0,
				c: 0
			}
		};
		(e.match(/<c:numCache>[\s\S]*?<\/c:numCache>/gm) || []).forEach(function(e) {
			var r = sd(e);
			c.s.r = c.s.c = 0;
			c.e.c = f;
			l = tt(f);
			r[0].forEach(function(e, t) {
				s[l + Jr(t)] = {
					t: "n",
					v: e,
					z: r[1]
				};
				o = t
			});
			if (c.e.r < o) c.e.r = o;
			++f
		});
		if (f > 0) s["!ref"] = lt(c);
		return s
	}
	_a.CS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet";
	var od = qe("chartsheet", null, {
		xmlns: tr.main[0],
		"xmlns:r": tr.r
	});

	function ld(e, r, t, a, n) {
		if (!e) return e;
		if (!a) a = {
			"!id": {}
		};
		var i = {
			"!type": "chart",
			"!chart": null,
			"!rel": ""
		};
		var s;
		var f = e.match(Hh);
		if (f) Xh(f[0], i, n, t);
		if (s = e.match(/drawing r:id="(.*?)"/)) i["!rel"] = s[1];
		if (a["!id"][i["!rel"]]) i["!chart"] = a["!id"][i["!rel"]];
		return i
	}

	function cd(e, r, t, a) {
		var n = [Ce, od];
		n[n.length] = qe("drawing", null, {
			"r:id": "rId1"
		});
		Ia(a, -1, "../drawings/drawing" + (e + 1) + ".xml", _a.DRAW);
		if (n.length > 2) {
			n[n.length] = "</chartsheet>";
			n[1] = n[1].replace("/>", ">")
		}
		return n.join("")
	}

	function hd(e, r) {
		e.l += 10;
		var t = mt(e, r - 10);
		return {
			name: t
		}
	}

	function ud(e, r, t, a, n) {
		if (!e) return e;
		if (!a) a = {
			"!id": {}
		};
		var i = {
			"!type": "chart",
			"!chart": null,
			"!rel": ""
		};
		var s = [];
		var f = false;
		Vr(e, function o(e, a, l) {
			switch (l) {
				case 550:
					i["!rel"] = e;
					break;
				case 651:
					if (!n.Sheets[t]) n.Sheets[t] = {};
					if (e.name) n.Sheets[t].CodeName = e.name;
					break;
				case 562:
					;
				case 652:
					;
				case 669:
					;
				case 679:
					;
				case 551:
					;
				case 552:
					;
				case 476:
					break;
				case 35:
					f = true;
					break;
				case 36:
					f = false;
					break;
				case 37:
					s.push(a);
					break;
				case 38:
					s.pop();
					break;
				default:
					if ((a || "").indexOf("Begin") > 0) s.push(a);
					else if ((a || "").indexOf("End") > 0) s.pop();
					else if (!f || r.WTF) throw new Error("Unexpected record " + l + " " + a);
			}
		}, r);
		if (a["!id"][i["!rel"]]) i["!chart"] = a["!id"][i["!rel"]];
		return i
	}

	function dd() {
		var e = zr();
		Xr(e, "BrtBeginSheet");
		Xr(e, "BrtEndSheet");
		return e.end()
	}
	var pd = [
		["allowRefreshQuery", false, "bool"],
		["autoCompressPictures", true, "bool"],
		["backupFile", false, "bool"],
		["checkCompatibility", false, "bool"],
		["CodeName", ""],
		["date1904", false, "bool"],
		["defaultThemeVersion", 0, "int"],
		["filterPrivacy", false, "bool"],
		["hidePivotFieldList", false, "bool"],
		["promptedSolutions", false, "bool"],
		["publishItems", false, "bool"],
		["refreshAllConnections", false, "bool"],
		["saveExternalLinkValues", true, "bool"],
		["showBorderUnselectedTables", true, "bool"],
		["showInkAnnotation", true, "bool"],
		["showObjects", "all"],
		["showPivotChartFilter", false, "bool"],
		["updateLinks", "userSet"]
	];
	var vd = [
		["activeTab", 0, "int"],
		["autoFilterDateGrouping", true, "bool"],
		["firstSheet", 0, "int"],
		["minimized", false, "bool"],
		["showHorizontalScroll", true, "bool"],
		["showSheetTabs", true, "bool"],
		["showVerticalScroll", true, "bool"],
		["tabRatio", 600, "int"],
		["visibility", "visible"]
	];
	var gd = [];
	var md = [
		["calcCompleted", "true"],
		["calcMode", "auto"],
		["calcOnSave", "true"],
		["concurrentCalc", "true"],
		["fullCalcOnLoad", "false"],
		["fullPrecision", "true"],
		["iterate", "false"],
		["iterateCount", "100"],
		["iterateDelta", "0.001"],
		["refMode", "A1"]
	];

	function bd(e, r) {
		for (var t = 0; t != e.length; ++t) {
			var a = e[t];
			for (var n = 0; n != r.length; ++n) {
				var i = r[n];
				if (a[i[0]] == null) a[i[0]] = i[1];
				else switch (i[2]) {
					case "bool":
						if (typeof a[i[0]] == "string") a[i[0]] = Me(a[i[0]]);
						break;
					case "int":
						if (typeof a[i[0]] == "string") a[i[0]] = parseInt(a[i[0]], 10);
						break;
				}
			}
		}
	}

	function Cd(e, r) {
		for (var t = 0; t != r.length; ++t) {
			var a = r[t];
			if (e[a[0]] == null) e[a[0]] = a[1];
			else switch (a[2]) {
				case "bool":
					if (typeof e[a[0]] == "string") e[a[0]] = Me(e[a[0]]);
					break;
				case "int":
					if (typeof e[a[0]] == "string") e[a[0]] = parseInt(e[a[0]], 10);
					break;
			}
		}
	}

	function Ed(e) {
		Cd(e.WBProps, pd);
		Cd(e.CalcPr, md);
		bd(e.WBView, vd);
		bd(e.Sheets, gd);
		Bh.date1904 = Me(e.WBProps.date1904)
	}

	function wd(e) {
		if (!e.Workbook) return "false";
		if (!e.Workbook.WBProps) return "false";
		return Me(e.Workbook.WBProps.date1904) ? "true" : "false"
	}
	var kd = "][*?/\\".split("");

	function Sd(e, r) {
		if (e.length > 31) {
			if (r) return false;
			throw new Error("Sheet names cannot exceed 31 chars")
		}
		var t = true;
		kd.forEach(function(a) {
			if (e.indexOf(a) == -1) return;
			if (!r) throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
			t = false
		});
		return t
	}

	function Ad(e, r, t) {
		e.forEach(function(a, n) {
			Sd(a);
			for (var i = 0; i < n; ++i)
				if (a == e[i]) throw new Error("Duplicate Sheet Name: " + a);
			if (t) {
				var s = r && r[n] && r[n].CodeName || a;
				if (s.charCodeAt(0) == 95 && s.length > 22) throw new Error("Bad Code Name: Worksheet" + s)
			}
		})
	}

	function _d(e) {
		if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
		if (!e.SheetNames.length) throw new Error("Workbook is empty");
		var r = e.Workbook && e.Workbook.Sheets || [];
		Ad(e.SheetNames, r, !!e.vbaraw)
	}
	var Bd = /<\w+:workbook/;

	function Td(e, r) {
		if (!e) throw new Error("Could not find file");
		var t = {
			AppVersion: {},
			WBProps: {},
			WBView: [],
			Sheets: [],
			CalcPr: {},
			Names: [],
			xmlns: ""
		};
		var a = false,
			n = "xmlns";
		var i = {},
			s = 0;
		e.replace(we, function f(o, l) {
			var c = Ae(o);
			switch (_e(c[0])) {
				case "<?xml":
					break;
				case "<workbook":
					if (o.match(Bd)) n = "xmlns" + o.match(/<(\w+):/)[1];
					t.xmlns = c[n];
					break;
				case "</workbook>":
					break;
				case "<fileVersion":
					delete c[0];
					t.AppVersion = c;
					break;
				case "<fileVersion/>":
					;
				case "</fileVersion>":
					break;
				case "<fileSharing":
					;
				case "<fileSharing/>":
					break;
				case "<workbookPr":
					;
				case "<workbookPr/>":
					pd.forEach(function(e) {
						if (c[e[0]] == null) return;
						switch (e[2]) {
							case "bool":
								t.WBProps[e[0]] = Me(c[e[0]]);
								break;
							case "int":
								t.WBProps[e[0]] = parseInt(c[e[0]], 10);
								break;
							default:
								t.WBProps[e[0]] = c[e[0]];
						}
					});
					if (c.codeName) t.WBProps.CodeName = c.codeName;
					break;
				case "</workbookPr>":
					break;
				case "<workbookProtection":
					break;
				case "<workbookProtection/>":
					break;
				case "<bookViews":
					;
				case "<bookViews>":
					;
				case "</bookViews>":
					break;
				case "<workbookView":
					delete c[0];
					t.WBView.push(c);
					break;
				case "</workbookView>":
					break;
				case "<sheets":
					;
				case "<sheets>":
					;
				case "</sheets>":
					break;
				case "<sheet":
					switch (c.state) {
						case "hidden":
							c.Hidden = 1;
							break;
						case "veryHidden":
							c.Hidden = 2;
							break;
						default:
							c.Hidden = 0;
					}
					delete c.state;
					c.name = xe(Ue(c.name));
					delete c[0];
					t.Sheets.push(c);
					break;
				case "</sheet>":
					break;
				case "<functionGroups":
					;
				case "<functionGroups/>":
					break;
				case "<functionGroup":
					break;
				case "<externalReferences":
					;
				case "</externalReferences>":
					;
				case "<externalReferences>":
					break;
				case "<externalReference":
					break;
				case "<definedNames/>":
					break;
				case "<definedNames>":
					;
				case "<definedNames":
					a = true;
					break;
				case "</definedNames>":
					a = false;
					break;
				case "<definedName":
					{
						i = {};i.Name = c.name;
						if (c.comment) i.Comment = c.comment;
						if (c.localSheetId) i.Sheet = +c.localSheetId;s = l + o.length
					}
					break;
				case "</definedName>":
					{
						i.Ref = e.slice(s, l);t.Names.push(i)
					}
					break;
				case "<definedName/>":
					break;
				case "<calcPr":
					delete c[0];
					t.CalcPr = c;
					break;
				case "<calcPr/>":
					delete c[0];
					t.CalcPr = c;
					break;
				case "</calcPr>":
					break;
				case "<oleSize":
					break;
				case "<customWorkbookViews>":
					;
				case "</customWorkbookViews>":
					;
				case "<customWorkbookViews":
					break;
				case "<customWorkbookView":
					;
				case "</customWorkbookView>":
					break;
				case "<pivotCaches>":
					;
				case "</pivotCaches>":
					;
				case "<pivotCaches":
					break;
				case "<pivotCache":
					break;
				case "<smartTagPr":
					;
				case "<smartTagPr/>":
					break;
				case "<smartTagTypes":
					;
				case "<smartTagTypes>":
					;
				case "</smartTagTypes>":
					break;
				case "<smartTagType":
					break;
				case "<webPublishing":
					;
				case "<webPublishing/>":
					break;
				case "<fileRecoveryPr":
					;
				case "<fileRecoveryPr/>":
					break;
				case "<webPublishObjects>":
					;
				case "<webPublishObjects":
					;
				case "</webPublishObjects>":
					break;
				case "<webPublishObject":
					break;
				case "<extLst":
					;
				case "<extLst>":
					;
				case "</extLst>":
					;
				case "<extLst/>":
					break;
				case "<ext":
					a = true;
					break;
				case "</ext>":
					a = false;
					break;
				case "<ArchID":
					break;
				case "<AlternateContent":
					;
				case "<AlternateContent>":
					a = true;
					break;
				case "</AlternateContent>":
					a = false;
					break;
				case "<revisionPtr":
					break;
				default:
					if (!a && r.WTF) throw new Error("unrecognized " + c[0] + " in workbook");
			}
			return o
		});
		if (tr.main.indexOf(t.xmlns) === -1) throw new Error("Unknown Namespace: " + t.xmlns);
		Ed(t);
		return t
	}
	var xd = qe("workbook", null, {
		xmlns: tr.main[0],
		"xmlns:r": tr.r
	});

	function yd(e) {
		var r = [Ce];
		r[r.length] = xd;
		var t = e.Workbook && (e.Workbook.Names || []).length > 0;
		var a = {
			codeName: "ThisWorkbook"
		};
		if (e.Workbook && e.Workbook.WBProps) {
			pd.forEach(function(r) {
				if (e.Workbook.WBProps[r[0]] == null) return;
				if (e.Workbook.WBProps[r[0]] == r[1]) return;
				a[r[0]] = e.Workbook.WBProps[r[0]]
			});
			if (e.Workbook.WBProps.CodeName) {
				a.codeName = e.Workbook.WBProps.CodeName;
				delete a.CodeName
			}
		}
		r[r.length] = qe("workbookPr", null, a);
		r[r.length] = "<sheets>";
		var n = e.Workbook && e.Workbook.Sheets || [];
		for (var i = 0; i != e.SheetNames.length; ++i) {
			var s = {
				name: Re(e.SheetNames[i].slice(0, 31))
			};
			s.sheetId = "" + (i + 1);
			s["r:id"] = "rId" + (i + 1);
			if (n[i]) switch (n[i].Hidden) {
				case 1:
					s.state = "hidden";
					break;
				case 2:
					s.state = "veryHidden";
					break;
			}
			r[r.length] = qe("sheet", null, s)
		}
		r[r.length] = "</sheets>";
		if (t) {
			r[r.length] = "<definedNames>";
			if (e.Workbook && e.Workbook.Names) e.Workbook.Names.forEach(function(e) {
				var t = {
					name: e.Name
				};
				if (e.Comment) t.comment = e.Comment;
				if (e.Sheet != null) t.localSheetId = "" + e.Sheet;
				if (!e.Ref) return;
				r[r.length] = qe("definedName", String(e.Ref), t)
			});
			r[r.length] = "</definedNames>"
		}
		if (r.length > 2) {
			r[r.length] = "</workbook>";
			r[1] = r[1].replace("/>", ">")
		}
		return r.join("")
	}

	function Id(e, r) {
		var t = {};
		t.Hidden = e._R(4);
		t.iTabID = e._R(4);
		t.strRelID = Ot(e, r - 8);
		t.name = mt(e);
		return t
	}

	function Rd(e, r) {
		if (!r) r = Wr(127);
		r._W(4, e.Hidden);
		r._W(4, e.iTabID);
		Dt(e.strRelID, r);
		bt(e.name.slice(0, 31), r);
		return r.length > r.l ? r.slice(0, r.l) : r
	}

	function Od(e, r) {
		var t = {};
		var a = e._R(4);
		t.defaultThemeVersion = e._R(4);
		var n = r > 8 ? mt(e) : "";
		if (n.length > 0) t.CodeName = n;
		t.autoCompressPictures = !!(a & 65536);
		t.backupFile = !!(a & 64);
		t.checkCompatibility = !!(a & 4096);
		t.date1904 = !!(a & 1);
		t.filterPrivacy = !!(a & 8);
		t.hidePivotFieldList = !!(a & 1024);
		t.promptedSolutions = !!(a & 16);
		t.publishItems = !!(a & 2048);
		t.refreshAllConnections = !!(a & 262144);
		t.saveExternalLinkValues = !!(a & 128);
		t.showBorderUnselectedTables = !!(a & 4);
		t.showInkAnnotation = !!(a & 32);
		t.showObjects = ["all", "placeholders", "none"][a >> 13 & 3];
		t.showPivotChartFilter = !!(a & 32768);
		t.updateLinks = ["userSet", "never", "always"][a >> 8 & 3];
		return t
	}

	function Dd(e, r) {
		if (!r) r = Wr(72);
		var t = 0;
		if (e) {
			if (e.filterPrivacy) t |= 8
		}
		r._W(4, t);
		r._W(4, 0);
		xt(e && e.CodeName || "ThisWorkbook", r);
		return r.slice(0, r.l)
	}

	function Fd(e, r) {
		var t = {};
		e._R(4);
		t.ArchID = e._R(4);
		e.l += r - 8;
		return t
	}

	function Pd(e, r, t) {
		var a = e.l + r;
		e.l += 4;
		e.l += 1;
		var n = e._R(4);
		var i = Rt(e);
		var s = vh(e, 0, t);
		var f = yt(e);
		e.l = a;
		var o = {
			Name: i,
			Ptg: s
		};
		if (n < 268435455) o.Sheet = n;
		if (f) o.Comment = f;
		return o
	}

	function Nd(e, r) {
		var t = {
			AppVersion: {},
			WBProps: {},
			WBView: [],
			Sheets: [],
			CalcPr: {},
			xmlns: ""
		};
		var a = false;
		if (!r) r = {};
		r.biff = 12;
		var n = [];
		var i = [
			[]
		];
		i.SheetNames = [];
		i.XTI = [];
		Vr(e, function s(e, f, o) {
			switch (o) {
				case 156:
					i.SheetNames.push(e.name);
					t.Sheets.push(e);
					break;
				case 153:
					t.WBProps = e;
					break;
				case 39:
					if (e.Sheet != null) r.SID = e.Sheet;
					e.Ref = ih(e.Ptg, null, null, i, r);
					delete r.SID;
					delete e.Ptg;
					n.push(e);
					break;
				case 1036:
					break;
				case 357:
					;
				case 358:
					;
				case 355:
					;
				case 667:
					if (!i[0].length) i[0] = [o, e];
					else i.push([o, e]);
					i[i.length - 1].XTI = [];
					break;
				case 362:
					if (i.length === 0) {
						i[0] = [];
						i[0].XTI = []
					}
					i[i.length - 1].XTI = i[i.length - 1].XTI.concat(e);
					i.XTI = i.XTI.concat(e);
					break;
				case 361:
					break;
				case 2071:
					;
				case 534:
					;
				case 677:
					;
				case 158:
					;
				case 157:
					;
				case 610:
					;
				case 2050:
					;
				case 155:
					;
				case 548:
					;
				case 676:
					;
				case 128:
					;
				case 665:
					;
				case 2128:
					;
				case 2125:
					;
				case 549:
					;
				case 2053:
					;
				case 596:
					;
				case 2076:
					;
				case 2075:
					;
				case 2082:
					;
				case 397:
					;
				case 154:
					;
				case 1117:
					;
				case 553:
					;
				case 2091:
					break;
				case 35:
					a = true;
					break;
				case 36:
					a = false;
					break;
				case 37:
					break;
				case 38:
					break;
				case 16:
					break;
				default:
					if ((f || "").indexOf("Begin") > 0) {} else if ((f || "").indexOf("End") > 0) {} else if (!a || r.WTF) throw new Error(
						"Unexpected record " + o + " " + f);
			}
		}, r);
		Ed(t);
		t.Names = n;
		t.supbooks = i;
		return t
	}

	function Ld(e, r) {
		Xr(e, "BrtBeginBundleShs");
		for (var t = 0; t != r.SheetNames.length; ++t) {
			var a = r.Workbook && r.Workbook.Sheets && r.Workbook.Sheets[t] && r.Workbook.Sheets[t].Hidden || 0;
			var n = {
				Hidden: a,
				iTabID: t + 1,
				strRelID: "rId" + (t + 1),
				name: r.SheetNames[t]
			};
			Xr(e, "BrtBundleSh", Rd(n))
		}
		Xr(e, "BrtEndBundleShs")
	}

	function Md(e, t) {
		if (!t) t = Wr(127);
		for (var a = 0; a != 4; ++a) t._W(4, 0);
		bt("SheetJS", t);
		bt(r.version, t);
		bt(r.version, t);
		bt("7262", t);
		t.length = t.l;
		return t.length > t.l ? t.slice(0, t.l) : t
	}

	function Ud(e, r) {
		if (!r) r = Wr(29);
		r._W(-4, 0);
		r._W(-4, 460);
		r._W(4, 28800);
		r._W(4, 17600);
		r._W(4, 500);
		r._W(4, e);
		r._W(4, e);
		var t = 120;
		r._W(1, t);
		return r.length > r.l ? r.slice(0, r.l) : r
	}

	function Hd(e, r) {
		if (!r.Workbook || !r.Workbook.Sheets) return;
		var t = r.Workbook.Sheets;
		var a = 0,
			n = -1,
			i = -1;
		for (; a < t.length; ++a) {
			if (!t[a] || !t[a].Hidden && n == -1) n = a;
			else if (t[a].Hidden == 1 && i == -1) i = a
		}
		if (i > n) return;
		Xr(e, "BrtBeginBookViews");
		Xr(e, "BrtBookView", Ud(n));
		Xr(e, "BrtEndBookViews")
	}

	function Wd(e, r) {
		var t = zr();
		Xr(t, "BrtBeginBook");
		Xr(t, "BrtFileVersion", Md());
		Xr(t, "BrtWbProp", Dd(e.Workbook && e.Workbook.WBProps || null));
		Hd(t, e, r);
		Ld(t, e, r);
		Xr(t, "BrtEndBook");
		return t.end()
	}

	function Vd(e, r, t) {
		if (r.slice(-4) === ".bin") return Nd(e, t);
		return Td(e, t)
	}

	function zd(e, r, t, a, n, i, s, f) {
		if (r.slice(-4) === ".bin") return Ku(e, a, t, n, i, s, f);
		return Vh(e, a, t, n, i, s, f)
	}

	function Xd(e, r, t, a, n, i, s, f) {
		if (r.slice(-4) === ".bin") return ud(e, a, t, n, i, s, f);
		return ld(e, a, t, n, i, s, f)
	}

	function Gd(e, r, t, a, n, i, s, f) {
		if (r.slice(-4) === ".bin") return xl(e, a, t, n, i, s, f);
		return yl(e, a, t, n, i, s, f)
	}

	function jd(e, r, t, a, n, i, s, f) {
		if (r.slice(-4) === ".bin") return Bl(e, a, t, n, i, s, f);
		return Tl(e, a, t, n, i, s, f)
	}

	function Kd(e, r, t, a) {
		if (r.slice(-4) === ".bin") return To(e, t, a);
		return oo(e, t, a)
	}

	function Yd(e, r, t) {
		return Ko(e, t)
	}

	function $d(e, r, t) {
		if (r.slice(-4) === ".bin") return nf(e, t);
		return ef(e, t)
	}

	function Zd(e, r, t) {
		if (r.slice(-4) === ".bin") return El(e, t);
		return dl(e, t)
	}

	function Qd(e, r, t) {
		if (r.slice(-4) === ".bin") return il(e, r, t);
		return al(e, r, t)
	}

	function Jd(e, r, t) {
		if (r.slice(-4) === ".bin") return fl(e, r, t);
		return sl(e, r, t)
	}

	function qd(e, r, t) {
		return (r.slice(-4) === ".bin" ? Wd : yd)(e, t)
	}

	function ep(e, r, t, a, n) {
		return (r.slice(-4) === ".bin" ? id : su)(e, t, a, n)
	}

	function rp(e, r, t, a, n) {
		return (r.slice(-4) === ".bin" ? dd : cd)(e, t, a, n)
	}

	function tp(e, r, t) {
		return (r.slice(-4) === ".bin" ? Mo : co)(e, t)
	}

	function ap(e, r, t) {
		return (r.slice(-4) === ".bin" ? of : tf)(e, t)
	}

	function np(e, r, t) {
		return (r.slice(-4) === ".bin" ? wl : vl)(e, t)
	}
	var ip = /([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g;
	var sp = /([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;
	var fp = function(e) {
		return String.fromCharCode(e)
	};

	function op(e, r) {
		var t = e.split(/\s+/);
		var a = [];
		if (!r) a[0] = t[0];
		if (t.length === 1) return a;
		var n = e.match(ip),
			i, s, f, o;
		if (n)
			for (o = 0; o != n.length; ++o) {
				i = n[o].match(sp);
				if ((s = i[1].indexOf(":")) === -1) a[i[1]] = i[2].slice(1, i[2].length - 1);
				else {
					if (i[1].slice(0, 6) === "xmlns:") f = "xmlns" + i[1].slice(6);
					else f = i[1].slice(s + 1);
					a[f] = i[2].slice(1, i[2].length - 1)
				}
			}
		return a
	}

	function lp(e) {
		var r = e.split(/\s+/);
		var t = {};
		if (r.length === 1) return t;
		var a = e.match(ip),
			n, i, s, f;
		if (a)
			for (f = 0; f != a.length; ++f) {
				n = a[f].match(sp);
				if ((i = n[1].indexOf(":")) === -1) t[n[1]] = n[2].slice(1, n[2].length - 1);
				else {
					if (n[1].slice(0, 6) === "xmlns:") s = "xmlns" + n[1].slice(6);
					else s = n[1].slice(i + 1);
					t[s] = n[2].slice(1, n[2].length - 1)
				}
			}
		return t
	}

	function cp(e, r) {
		var t = R[e] || xe(e);
		if (t === "General") return y._general(r);
		return y.format(t, r)
	}

	function hp(e, r, t, a) {
		var n = a;
		switch ((t[0].match(/dt:dt="([\w.]+)"/) || ["", ""])[1]) {
			case "boolean":
				n = Me(a);
				break;
			case "i2":
				;
			case "int":
				n = parseInt(a, 10);
				break;
			case "r4":
				;
			case "float":
				n = parseFloat(a);
				break;
			case "date":
				;
			case "dateTime.tz":
				n = te(a);
				break;
			case "i8":
				;
			case "string":
				;
			case "fixed":
				;
			case "uuid":
				;
			case "bin.base64":
				break;
			default:
				throw new Error("bad custprop:" + t[0]);
		}
		e[xe(r)] = n
	}

	function up(e, r, t) {
		if (e.t === "z") return;
		if (!t || t.cellText !== false) try {
			if (e.t === "e") {
				e.w = e.w || Vt[e.v]
			} else if (r === "General") {
				if (e.t === "n") {
					if ((e.v | 0) === e.v) e.w = y._general_int(e.v);
					else e.w = y._general_num(e.v)
				} else e.w = y._general(e.v)
			} else e.w = cp(r || "General", e.v)
		} catch (a) {
			if (t.WTF) throw a
		}
		try {
			var n = R[r] || r || "General";
			if (t.cellNF) e.z = n;
			if (t.cellDates && e.t == "n" && y.is_date(n)) {
				var i = y.parse_date_code(e.v);
				if (i) {
					e.t = "d";
					e.v = new Date(i.y, i.m - 1, i.d, i.H, i.M, i.S, i.u)
				}
			}
		} catch (a) {
			if (t.WTF) throw a
		}
	}

	function dp(e, r, t) {
		if (t.cellStyles) {
			if (r.Interior) {
				var a = r.Interior;
				if (a.Pattern) a.patternType = Jf[a.Pattern] || a.Pattern
			}
		}
		e[r.ID] = r
	}

	function pp(e, r, t, a, n, i, s, f, o, l) {
		var c = "General",
			h = a.StyleID,
			u = {};
		l = l || {};
		var d = [];
		var p = 0;
		if (h === undefined && f) h = f.StyleID;
		if (h === undefined && s) h = s.StyleID;
		while (i[h] !== undefined) {
			if (i[h].nf) c = i[h].nf;
			if (i[h].Interior) d.push(i[h].Interior);
			if (!i[h].Parent) break;
			h = i[h].Parent
		}
		switch (t.Type) {
			case "Boolean":
				a.t = "b";
				a.v = Me(e);
				break;
			case "String":
				a.t = "s";
				a.r = Ne(xe(e));
				a.v = e.indexOf("<") > -1 ? xe(r) : a.r;
				break;
			case "DateTime":
				if (e.slice(-1) != "Z") e += "Z";
				a.v = (te(e) - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1e3);
				if (a.v !== a.v) a.v = xe(e);
				else if (a.v < 60) a.v = a.v - 1;
				if (!c || c == "General") c = "yyyy-mm-dd";
			case "Number":
				if (a.v === undefined) a.v = +e;
				if (!a.t) a.t = "n";
				break;
			case "Error":
				a.t = "e";
				a.v = zt[e];
				if (l.cellText !== false) a.w = e;
				break;
			default:
				a.t = "s";
				a.v = Ne(r || e);
				break;
		}
		up(a, c, l);
		if (l.cellFormula !== false) {
			if (a.Formula) {
				var v = xe(a.Formula);
				if (v.charCodeAt(0) == 61) v = v.slice(1);
				a.f = Il(v, n);
				delete a.Formula;
				if (a.ArrayRange == "RC") a.F = Il("RC:RC", n);
				else if (a.ArrayRange) {
					a.F = Il(a.ArrayRange, n);
					o.push([ct(a.F), a.F])
				}
			} else {
				for (p = 0; p < o.length; ++p)
					if (n.r >= o[p][0].s.r && n.r <= o[p][0].e.r)
						if (n.c >= o[p][0].s.c && n.c <= o[p][0].e.c) a.F = o[p][1]
			}
		}
		if (l.cellStyles) {
			d.forEach(function(e) {
				if (!u.patternType && e.patternType) u.patternType = e.patternType
			});
			a.s = u
		}
		if (a.StyleID !== undefined) a.ixfe = a.StyleID
	}

	function vp(e) {
		e.t = e.v || "";
		e.t = e.t.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
		e.v = e.w = e.ixfe = undefined
	}

	function gp(e) {
		if (C && Buffer.isBuffer(e)) return e.toString("utf8");
		if (typeof e === "string") return e;
		throw new Error("Bad input format: expected Buffer or string")
	}
	var mp = /<(\/?)([^\s?>!\/:]*:|)([^\s?>:\/]+)[^>]*>/gm;

	function bp(e, r) {
		var t = r || {};
		I(y);
		var a = p(gp(e));
		if (t.type == "binary" || t.type == "array" || t.type == "base64") {
			if (typeof cptable !== "undefined") a = cptable.utils.decode(65001, h(a));
			else a = Ue(a)
		}
		var n = a.slice(0, 1024).toLowerCase(),
			i = false;
		if (n.indexOf("<?xml") == -1)["html", "table", "head", "meta", "script", "style", "div"].forEach(function(e) {
			if (n.indexOf("<" + e) >= 0) i = true
		});
		if (i) return ov.to_workbook(a, t);
		var s;
		var f = [],
			o;
		if (g != null && t.dense == null) t.dense = g;
		var l = {},
			c = [],
			u = t.dense ? [] : {},
			d = "";
		var v = {},
			m = {},
			b = {};
		var C = op('<Data ss:Type="String">'),
			E = 0;
		var w = 0,
			k = 0;
		var S = {
			s: {
				r: 2e6,
				c: 2e6
			},
			e: {
				r: 0,
				c: 0
			}
		};
		var A = {},
			_ = {};
		var B = "",
			T = 0;
		var x = [];
		var O = {},
			D = {},
			F = 0,
			P = [];
		var N = [],
			L = {};
		var M = [],
			U, H = false;
		var W = [];
		var V = [],
			z = {},
			X = 0,
			G = 0;
		var j = {
				Sheets: [],
				WBProps: {
					date1904: false
				}
			},
			K = {};
		mp.lastIndex = 0;
		a = a.replace(/<!--([\s\S]*?)-->/gm, "");
		while (s = mp.exec(a)) switch (s[3]) {
			case "Data":
				if (f[f.length - 1][1]) break;
				if (s[1] === "/") pp(a.slice(E, s.index), B, C, f[f.length - 1][0] == "Comment" ? L : m, {
					c: w,
					r: k
				}, A, M[w], b, W, t);
				else {
					B = "";
					C = op(s[0]);
					E = s.index + s[0].length
				}
				break;
			case "Cell":
				if (s[1] === "/") {
					if (N.length > 0) m.c = N;
					if ((!t.sheetRows || t.sheetRows > k) && m.v !== undefined) {
						if (t.dense) {
							if (!u[k]) u[k] = [];
							u[k][w] = m
						} else u[tt(w) + Jr(k)] = m
					}
					if (m.HRef) {
						m.l = {
							Target: m.HRef
						};
						if (m.HRefScreenTip) m.l.Tooltip = m.HRefScreenTip;
						delete m.HRef;
						delete m.HRefScreenTip
					}
					if (m.MergeAcross || m.MergeDown) {
						X = w + (parseInt(m.MergeAcross, 10) | 0);
						G = k + (parseInt(m.MergeDown, 10) | 0);
						x.push({
							s: {
								c: w,
								r: k
							},
							e: {
								c: X,
								r: G
							}
						})
					}
					if (!t.sheetStubs) {
						if (m.MergeAcross) w = X + 1;
						else ++w
					} else if (m.MergeAcross || m.MergeDown) {
						for (var Y = w; Y <= X; ++Y) {
							for (var $ = k; $ <= G; ++$) {
								if (Y > w || $ > k) {
									if (t.dense) {
										if (!u[$]) u[$] = [];
										u[$][Y] = {
											t: "z"
										}
									} else u[tt(Y) + Jr($)] = {
										t: "z"
									}
								}
							}
						}
						w = X + 1
					} else ++w
				} else {
					m = lp(s[0]);
					if (m.Index) w = +m.Index - 1;
					if (w < S.s.c) S.s.c = w;
					if (w > S.e.c) S.e.c = w;
					if (s[0].slice(-2) === "/>") ++w;
					N = []
				}
				break;
			case "Row":
				if (s[1] === "/" || s[0].slice(-2) === "/>") {
					if (k < S.s.r) S.s.r = k;
					if (k > S.e.r) S.e.r = k;
					if (s[0].slice(-2) === "/>") {
						b = op(s[0]);
						if (b.Index) k = +b.Index - 1
					}
					w = 0;
					++k
				} else {
					b = op(s[0]);
					if (b.Index) k = +b.Index - 1;
					z = {};
					if (b.AutoFitHeight == "0" || b.Height) {
						z.hpx = parseInt(b.Height, 10);
						z.hpt = Zf(z.hpx);
						V[k] = z
					}
					if (b.Hidden == "1") {
						z.hidden = true;
						V[k] = z
					}
				}
				break;
			case "Worksheet":
				if (s[1] === "/") {
					if ((o = f.pop())[0] !== s[3]) throw new Error("Bad state: " + o.join("|"));
					c.push(d);
					if (S.s.r <= S.e.r && S.s.c <= S.e.c) u["!ref"] = lt(S);
					if (x.length) u["!merges"] = x;
					if (M.length > 0) u["!cols"] = M;
					if (V.length > 0) u["!rows"] = V;
					l[d] = u
				} else {
					S = {
						s: {
							r: 2e6,
							c: 2e6
						},
						e: {
							r: 0,
							c: 0
						}
					};
					k = w = 0;
					f.push([s[3], false]);
					o = op(s[0]);
					d = xe(o.Name);
					u = t.dense ? [] : {};
					x = [];
					W = [];
					V = [];
					K = {
						name: d,
						Hidden: 0
					};
					j.Sheets.push(K)
				}
				break;
			case "Table":
				if (s[1] === "/") {
					if ((o = f.pop())[0] !== s[3]) throw new Error("Bad state: " + o.join("|"))
				} else if (s[0].slice(-2) == "/>") break;
				else {
					v = op(s[0]);
					f.push([s[3], false]);
					M = [];
					H = false
				}
				break;
			case "Style":
				if (s[1] === "/") dp(A, _, t);
				else _ = op(s[0]);
				break;
			case "NumberFormat":
				_.nf = xe(op(s[0]).Format || "General");
				if (R[_.nf]) _.nf = R[_.nf];
				for (var Z = 0; Z != 392; ++Z)
					if (y._table[Z] == _.nf) break;
				if (Z == 392)
					for (Z = 57; Z != 392; ++Z)
						if (y._table[Z] == null) {
							y.load(_.nf, Z);
							break
						}
				break;
			case "Column":
				if (f[f.length - 1][0] !== "Table") break;
				U = op(s[0]);
				if (U.Hidden) {
					U.hidden = true;
					delete U.Hidden
				}
				if (U.Width) U.wpx = parseInt(U.Width, 10);
				if (!H && U.wpx > 10) {
					H = true;
					Wf = Mf;
					for (var Q = 0; Q < M.length; ++Q)
						if (M[Q]) Kf(M[Q])
				}
				if (H) Kf(U);
				M[U.Index - 1 || M.length] = U;
				for (var J = 0; J < +U.Span; ++J) M[M.length] = ne(U);
				break;
			case "NamedRange":
				if (!j.Names) j.Names = [];
				var q = Ae(s[0]);
				var ee = {
					Name: q.Name,
					Ref: Il(q.RefersTo.slice(1), {
						r: 0,
						c: 0
					})
				};
				if (j.Sheets.length > 0) ee.Sheet = j.Sheets.length - 1;
				j.Names.push(ee);
				break;
			case "NamedCell":
				break;
			case "B":
				break;
			case "I":
				break;
			case "U":
				break;
			case "S":
				break;
			case "Sub":
				break;
			case "Sup":
				break;
			case "Span":
				break;
			case "Border":
				break;
			case "Alignment":
				break;
			case "Borders":
				break;
			case "Font":
				if (s[0].slice(-2) === "/>") break;
				else if (s[1] === "/") B += a.slice(T, s.index);
				else T = s.index + s[0].length;
				break;
			case "Interior":
				if (!t.cellStyles) break;
				_.Interior = op(s[0]);
				break;
			case "Protection":
				break;
			case "Author":
				;
			case "Title":
				;
			case "Description":
				;
			case "Created":
				;
			case "Keywords":
				;
			case "Subject":
				;
			case "Category":
				;
			case "Company":
				;
			case "LastAuthor":
				;
			case "LastSaved":
				;
			case "LastPrinted":
				;
			case "Version":
				;
			case "Revision":
				;
			case "TotalTime":
				;
			case "HyperlinkBase":
				;
			case "Manager":
				;
			case "ContentStatus":
				;
			case "Identifier":
				;
			case "Language":
				;
			case "AppName":
				if (s[0].slice(-2) === "/>") break;
				else if (s[1] === "/") en(O, s[3], a.slice(F, s.index));
				else F = s.index + s[0].length;
				break;
			case "Paragraphs":
				break;
			case "Styles":
				;
			case "Workbook":
				if (s[1] === "/") {
					if ((o = f.pop())[0] !== s[3]) throw new Error("Bad state: " + o.join("|"))
				} else f.push([s[3], false]);
				break;
			case "Comment":
				if (s[1] === "/") {
					if ((o = f.pop())[0] !== s[3]) throw new Error("Bad state: " + o.join("|"));
					vp(L);
					N.push(L)
				} else {
					f.push([s[3], false]);
					o = op(s[0]);
					L = {
						a: o.Author
					}
				}
				break;
			case "AutoFilter":
				if (s[1] === "/") {
					if ((o = f.pop())[0] !== s[3]) throw new Error("Bad state: " + o.join("|"))
				} else if (s[0].charAt(s[0].length - 2) !== "/") {
					var re = op(s[0]);
					u["!autofilter"] = {
						ref: Il(re.Range).replace(/\$/g, "")
					};
					f.push([s[3], true])
				}
				break;
			case "Name":
				break;
			case "ComponentOptions":
				;
			case "DocumentProperties":
				;
			case "CustomDocumentProperties":
				;
			case "OfficeDocumentSettings":
				;
			case "PivotTable":
				;
			case "PivotCache":
				;
			case "Names":
				;
			case "MapInfo":
				;
			case "PageBreaks":
				;
			case "QueryTable":
				;
			case "DataValidation":
				;
			case "Sorting":
				;
			case "Schema":
				;
			case "data":
				;
			case "ConditionalFormatting":
				;
			case "SmartTagType":
				;
			case "SmartTags":
				;
			case "ExcelWorkbook":
				;
			case "WorkbookOptions":
				;
			case "WorksheetOptions":
				if (s[1] === "/") {
					if ((o = f.pop())[0] !== s[3]) throw new Error("Bad state: " + o.join("|"))
				} else if (s[0].charAt(s[0].length - 2) !== "/") f.push([s[3], true]);
				break;
			default:
				if (f.length == 0 && s[3] == "document") return dv(a, t);
				if (f.length == 0 && s[3] == "UOF") return dv(a, t);
				var te = true;
				switch (f[f.length - 1][0]) {
					case "OfficeDocumentSettings":
						switch (s[3]) {
							case "AllowPNG":
								break;
							case "RemovePersonalInformation":
								break;
							case "DownloadComponents":
								break;
							case "LocationOfComponents":
								break;
							case "Colors":
								break;
							case "Color":
								break;
							case "Index":
								break;
							case "RGB":
								break;
							case "PixelsPerInch":
								break;
							case "TargetScreenSize":
								break;
							case "ReadOnlyRecommended":
								break;
							default:
								te = false;
						}
						break;
					case "ComponentOptions":
						switch (s[3]) {
							case "Toolbar":
								break;
							case "HideOfficeLogo":
								break;
							case "SpreadsheetAutoFit":
								break;
							case "Label":
								break;
							case "Caption":
								break;
							case "MaxHeight":
								break;
							case "MaxWidth":
								break;
							case "NextSheetNumber":
								break;
							default:
								te = false;
						}
						break;
					case "ExcelWorkbook":
						switch (s[3]) {
							case "Date1904":
								j.WBProps.date1904 = true;
								break;
							case "WindowHeight":
								break;
							case "WindowWidth":
								break;
							case "WindowTopX":
								break;
							case "WindowTopY":
								break;
							case "TabRatio":
								break;
							case "ProtectStructure":
								break;
							case "ProtectWindows":
								break;
							case "ActiveSheet":
								break;
							case "DisplayInkNotes":
								break;
							case "FirstVisibleSheet":
								break;
							case "SupBook":
								break;
							case "SheetName":
								break;
							case "SheetIndex":
								break;
							case "SheetIndexFirst":
								break;
							case "SheetIndexLast":
								break;
							case "Dll":
								break;
							case "AcceptLabelsInFormulas":
								break;
							case "DoNotSaveLinkValues":
								break;
							case "Iteration":
								break;
							case "MaxIterations":
								break;
							case "MaxChange":
								break;
							case "Path":
								break;
							case "Xct":
								break;
							case "Count":
								break;
							case "SelectedSheets":
								break;
							case "Calculation":
								break;
							case "Uncalced":
								break;
							case "StartupPrompt":
								break;
							case "Crn":
								break;
							case "ExternName":
								break;
							case "Formula":
								break;
							case "ColFirst":
								break;
							case "ColLast":
								break;
							case "WantAdvise":
								break;
							case "Boolean":
								break;
							case "Error":
								break;
							case "Text":
								break;
							case "OLE":
								break;
							case "NoAutoRecover":
								break;
							case "PublishObjects":
								break;
							case "DoNotCalculateBeforeSave":
								break;
							case "Number":
								break;
							case "RefModeR1C1":
								break;
							case "EmbedSaveSmartTags":
								break;
							default:
								te = false;
						}
						break;
					case "WorkbookOptions":
						switch (s[3]) {
							case "OWCVersion":
								break;
							case "Height":
								break;
							case "Width":
								break;
							default:
								te = false;
						}
						break;
					case "WorksheetOptions":
						switch (s[3]) {
							case "Visible":
								if (s[0].slice(-2) === "/>") {} else if (s[1] === "/") switch (a.slice(F, s.index)) {
									case "SheetHidden":
										K.Hidden = 1;
										break;
									case "SheetVeryHidden":
										K.Hidden = 2;
										break;
								} else F = s.index + s[0].length;
								break;
							case "Header":
								if (!u["!margins"]) yh(u["!margins"] = {}, "xlml");
								u["!margins"].header = Ae(s[0]).Margin;
								break;
							case "Footer":
								if (!u["!margins"]) yh(u["!margins"] = {}, "xlml");
								u["!margins"].footer = Ae(s[0]).Margin;
								break;
							case "PageMargins":
								var ae = Ae(s[0]);
								if (!u["!margins"]) yh(u["!margins"] = {}, "xlml");
								if (ae.Top) u["!margins"].top = ae.Top;
								if (ae.Left) u["!margins"].left = ae.Left;
								if (ae.Right) u["!margins"].right = ae.Right;
								if (ae.Bottom) u["!margins"].bottom = ae.Bottom;
								break;
							case "DisplayRightToLeft":
								if (!j.Views) j.Views = [];
								if (!j.Views[0]) j.Views[0] = {};
								j.Views[0].RTL = true;
								break;
							case "Unsynced":
								break;
							case "Print":
								break;
							case "Panes":
								break;
							case "Scale":
								break;
							case "Pane":
								break;
							case "Number":
								break;
							case "Layout":
								break;
							case "PageSetup":
								break;
							case "Selected":
								break;
							case "ProtectObjects":
								break;
							case "EnableSelection":
								break;
							case "ProtectScenarios":
								break;
							case "ValidPrinterInfo":
								break;
							case "HorizontalResolution":
								break;
							case "VerticalResolution":
								break;
							case "NumberofCopies":
								break;
							case "ActiveRow":
								break;
							case "ActiveCol":
								break;
							case "ActivePane":
								break;
							case "TopRowVisible":
								break;
							case "TopRowBottomPane":
								break;
							case "LeftColumnVisible":
								break;
							case "LeftColumnRightPane":
								break;
							case "FitToPage":
								break;
							case "RangeSelection":
								break;
							case "PaperSizeIndex":
								break;
							case "PageLayoutZoom":
								break;
							case "PageBreakZoom":
								break;
							case "FilterOn":
								break;
							case "DoNotDisplayGridlines":
								break;
							case "SplitHorizontal":
								break;
							case "SplitVertical":
								break;
							case "FreezePanes":
								break;
							case "FrozenNoSplit":
								break;
							case "FitWidth":
								break;
							case "FitHeight":
								break;
							case "CommentsLayout":
								break;
							case "Zoom":
								break;
							case "LeftToRight":
								break;
							case "Gridlines":
								break;
							case "AllowSort":
								break;
							case "AllowFilter":
								break;
							case "AllowInsertRows":
								break;
							case "AllowDeleteRows":
								break;
							case "AllowInsertCols":
								break;
							case "AllowDeleteCols":
								break;
							case "AllowInsertHyperlinks":
								break;
							case "AllowFormatCells":
								break;
							case "AllowSizeCols":
								break;
							case "AllowSizeRows":
								break;
							case "NoSummaryRowsBelowDetail":
								break;
							case "TabColorIndex":
								break;
							case "DoNotDisplayHeadings":
								break;
							case "ShowPageLayoutZoom":
								break;
							case "NoSummaryColumnsRightDetail":
								break;
							case "BlackAndWhite":
								break;
							case "DoNotDisplayZeros":
								break;
							case "DisplayPageBreak":
								break;
							case "RowColHeadings":
								break;
							case "DoNotDisplayOutline":
								break;
							case "NoOrientation":
								break;
							case "AllowUsePivotTables":
								break;
							case "ZeroHeight":
								break;
							case "ViewableRange":
								break;
							case "Selection":
								break;
							case "ProtectContents":
								break;
							default:
								te = false;
						}
						break;
					case "PivotTable":
						;
					case "PivotCache":
						switch (s[3]) {
							case "ImmediateItemsOnDrop":
								break;
							case "ShowPageMultipleItemLabel":
								break;
							case "CompactRowIndent":
								break;
							case "Location":
								break;
							case "PivotField":
								break;
							case "Orientation":
								break;
							case "LayoutForm":
								break;
							case "LayoutSubtotalLocation":
								break;
							case "LayoutCompactRow":
								break;
							case "Position":
								break;
							case "PivotItem":
								break;
							case "DataType":
								break;
							case "DataField":
								break;
							case "SourceName":
								break;
							case "ParentField":
								break;
							case "PTLineItems":
								break;
							case "PTLineItem":
								break;
							case "CountOfSameItems":
								break;
							case "Item":
								break;
							case "ItemType":
								break;
							case "PTSource":
								break;
							case "CacheIndex":
								break;
							case "ConsolidationReference":
								break;
							case "FileName":
								break;
							case "Reference":
								break;
							case "NoColumnGrand":
								break;
							case "NoRowGrand":
								break;
							case "BlankLineAfterItems":
								break;
							case "Hidden":
								break;
							case "Subtotal":
								break;
							case "BaseField":
								break;
							case "MapChildItems":
								break;
							case "Function":
								break;
							case "RefreshOnFileOpen":
								break;
							case "PrintSetTitles":
								break;
							case "MergeLabels":
								break;
							case "DefaultVersion":
								break;
							case "RefreshName":
								break;
							case "RefreshDate":
								break;
							case "RefreshDateCopy":
								break;
							case "VersionLastRefresh":
								break;
							case "VersionLastUpdate":
								break;
							case "VersionUpdateableMin":
								break;
							case "VersionRefreshableMin":
								break;
							case "Calculation":
								break;
							default:
								te = false;
						}
						break;
					case "PageBreaks":
						switch (s[3]) {
							case "ColBreaks":
								break;
							case "ColBreak":
								break;
							case "RowBreaks":
								break;
							case "RowBreak":
								break;
							case "ColStart":
								break;
							case "ColEnd":
								break;
							case "RowEnd":
								break;
							default:
								te = false;
						}
						break;
					case "AutoFilter":
						switch (s[3]) {
							case "AutoFilterColumn":
								break;
							case "AutoFilterCondition":
								break;
							case "AutoFilterAnd":
								break;
							case "AutoFilterOr":
								break;
							default:
								te = false;
						}
						break;
					case "QueryTable":
						switch (s[3]) {
							case "Id":
								break;
							case "AutoFormatFont":
								break;
							case "AutoFormatPattern":
								break;
							case "QuerySource":
								break;
							case "QueryType":
								break;
							case "EnableRedirections":
								break;
							case "RefreshedInXl9":
								break;
							case "URLString":
								break;
							case "HTMLTables":
								break;
							case "Connection":
								break;
							case "CommandText":
								break;
							case "RefreshInfo":
								break;
							case "NoTitles":
								break;
							case "NextId":
								break;
							case "ColumnInfo":
								break;
							case "OverwriteCells":
								break;
							case "DoNotPromptForFile":
								break;
							case "TextWizardSettings":
								break;
							case "Source":
								break;
							case "Number":
								break;
							case "Decimal":
								break;
							case "ThousandSeparator":
								break;
							case "TrailingMinusNumbers":
								break;
							case "FormatSettings":
								break;
							case "FieldType":
								break;
							case "Delimiters":
								break;
							case "Tab":
								break;
							case "Comma":
								break;
							case "AutoFormatName":
								break;
							case "VersionLastEdit":
								break;
							case "VersionLastRefresh":
								break;
							default:
								te = false;
						}
						break;
					case "Sorting":
						;
					case "ConditionalFormatting":
						;
					case "DataValidation":
						switch (s[3]) {
							case "Range":
								break;
							case "Type":
								break;
							case "Min":
								break;
							case "Max":
								break;
							case "Sort":
								break;
							case "Descending":
								break;
							case "Order":
								break;
							case "CaseSensitive":
								break;
							case "Value":
								break;
							case "ErrorStyle":
								break;
							case "ErrorMessage":
								break;
							case "ErrorTitle":
								break;
							case "CellRangeList":
								break;
							case "InputMessage":
								break;
							case "InputTitle":
								break;
							case "ComboHide":
								break;
							case "InputHide":
								break;
							case "Condition":
								break;
							case "Qualifier":
								break;
							case "UseBlank":
								break;
							case "Value1":
								break;
							case "Value2":
								break;
							case "Format":
								break;
							default:
								te = false;
						}
						break;
					case "MapInfo":
						;
					case "Schema":
						;
					case "data":
						switch (s[3]) {
							case "Map":
								break;
							case "Entry":
								break;
							case "Range":
								break;
							case "XPath":
								break;
							case "Field":
								break;
							case "XSDType":
								break;
							case "FilterOn":
								break;
							case "Aggregate":
								break;
							case "ElementType":
								break;
							case "AttributeType":
								break;
							case "schema":
								;
							case "element":
								;
							case "complexType":
								;
							case "datatype":
								;
							case "all":
								;
							case "attribute":
								;
							case "extends":
								break;
							case "row":
								break;
							default:
								te = false;
						}
						break;
					case "SmartTags":
						break;
					default:
						te = false;
						break;
				}
				if (te) break;
				if (!f[f.length - 1][1]) throw "Unrecognized tag: " + s[3] + "|" + f.join("|");
				if (f[f.length - 1][0] === "CustomDocumentProperties") {
					if (s[0].slice(-2) === "/>") break;
					else if (s[1] === "/") hp(D, s[3], P, a.slice(F, s.index));
					else {
						P = s;
						F = s.index + s[0].length
					}
					break
				}
				if (t.WTF) throw "Unrecognized tag: " + s[3] + "|" + f.join("|");
		}
		var ie = {};
		if (!t.bookSheets && !t.bookProps) ie.Sheets = l;
		ie.SheetNames = c;
		ie.Workbook = j;
		ie.SSF = y.get_table();
		ie.Props = O;
		ie.Custprops = D;
		return ie
	}

	function Cp(e, r) {
		yv(r = r || {});
		switch (r.type || "base64") {
			case "base64":
				return bp(b.decode(e), r);
			case "binary":
				;
			case "buffer":
				;
			case "file":
				return bp(e, r);
			case "array":
				return bp(S(e), r);
		}
	}

	function Ep(e, r) {
		var t = [];
		if (e.Props) t.push(rn(e.Props, r));
		if (e.Custprops) t.push(tn(e.Props, e.Custprops, r));
		return t.join("")
	}

	function wp() {
		return ""
	}

	function kp(e, r) {
		var t = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
		r.cellXfs.forEach(function(e, r) {
			var a = [];
			a.push(qe("NumberFormat", null, {
				"ss:Format": Re(y._table[e.numFmtId])
			}));
			t.push(qe("Style", a.join(""), {
				"ss:ID": "s" + (21 + r)
			}))
		});
		return qe("Styles", t.join(""))
	}

	function Sp(e) {
		return qe("NamedRange", null, {
			"ss:Name": e.Name,
			"ss:RefersTo": "=" + Ol(e.Ref, {
				r: 0,
				c: 0
			})
		})
	}

	function Ap(e) {
		if (!((e || {}).Workbook || {}).Names) return "";
		var r = e.Workbook.Names;
		var t = [];
		for (var a = 0; a < r.length; ++a) {
			var n = r[a];
			if (n.Sheet != null) continue;
			if (n.Name.match(/^_xlfn\./)) continue;
			t.push(Sp(n))
		}
		return qe("Names", t.join(""))
	}

	function _p(e, r, t, a) {
		if (!e) return "";
		if (!((a || {}).Workbook || {}).Names) return "";
		var n = a.Workbook.Names;
		var i = [];
		e: for (var s = 0; s < n.length; ++s) {
			var f = n[s];
			if (f.Sheet != t) continue;
			if (f.Name.match(/^_xlfn\./)) continue;
			i.push(Sp(f))
		}
		return i.join("")
	}

	function Bp(e, r, t, a) {
		if (!e) return "";
		var n = [];
		if (e["!margins"]) {
			n.push("<PageSetup>");
			if (e["!margins"].header) n.push(qe("Header", null, {
				"x:Margin": e["!margins"].header
			}));
			if (e["!margins"].footer) n.push(qe("Footer", null, {
				"x:Margin": e["!margins"].footer
			}));
			n.push(qe("PageMargins", null, {
				"x:Bottom": e["!margins"].bottom || "0.75",
				"x:Left": e["!margins"].left || "0.7",
				"x:Right": e["!margins"].right || "0.7",
				"x:Top": e["!margins"].top || "0.75"
			}));
			n.push("</PageSetup>")
		}
		if (a && a.Workbook && a.Workbook.Sheets && a.Workbook.Sheets[t]) {
			if (a.Workbook.Sheets[t].Hidden) n.push(qe("Visible", a.Workbook.Sheets[t].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
			else {
				for (var i = 0; i < t; ++i)
					if (a.Workbook.Sheets[i] && !a.Workbook.Sheets[i].Hidden) break;
				if (i == t) n.push("<Selected/>")
			}
		}
		if (((((a || {}).Workbook || {}).Views || [])[0] || {}).RTL) n.push("<DisplayRightToLeft/>");
		if (e["!protect"]) {
			n.push(Qe("ProtectContents", "True"));
			if (e["!protect"].objects) n.push(Qe("ProtectObjects", "True"));
			if (e["!protect"].scenarios) n.push(Qe("ProtectScenarios", "True"));
			if (e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells) n.push(Qe("EnableSelection", "NoSelection"));
			else if (e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells) n.push(Qe("EnableSelection", "UnlockedCells"));
			[
				["formatCells", "AllowFormatCells"],
				["formatColumns", "AllowSizeCols"],
				["formatRows", "AllowSizeRows"],
				["insertColumns", "AllowInsertCols"],
				["insertRows", "AllowInsertRows"],
				["insertHyperlinks", "AllowInsertHyperlinks"],
				["deleteColumns", "AllowDeleteCols"],
				["deleteRows", "AllowDeleteRows"],
				["sort", "AllowSort"],
				["autoFilter", "AllowFilter"],
				["pivotTables", "AllowUsePivotTables"]
			].forEach(function(r) {
				if (e["!protect"][r[0]]) n.push("<" + r[1] + "/>")
			})
		}
		if (n.length == 0) return "";
		return qe("WorksheetOptions", n.join(""), {
			xmlns: ar.x
		})
	}

	function Tp(e) {
		return e.map(function(e) {
			var r = Le(e.t || "");
			var t = qe("ss:Data", r, {
				xmlns: "http://www.w3.org/TR/REC-html40"
			});
			return qe("Comment", t, {
				"ss:Author": e.a
			})
		}).join("")
	}

	function xp(e, r, t, a, n, i, s) {
		if (!e || e.v == undefined && e.f == undefined) return "";
		var f = {};
		if (e.f) f["ss:Formula"] = "=" + Re(Ol(e.f, s));
		if (e.F && e.F.slice(0, r.length) == r) {
			var o = st(e.F.slice(r.length + 1));
			f["ss:ArrayRange"] = "RC:R" + (o.r == s.r ? "" : "[" + (o.r - s.r) + "]") + "C" + (o.c == s.c ? "" : "[" + (o.c - s.c) + "]")
		}
		if (e.l && e.l.Target) {
			f["ss:HRef"] = Re(e.l.Target);
			if (e.l.Tooltip) f["x:HRefScreenTip"] = Re(e.l.Tooltip)
		}
		if (t["!merges"]) {
			var l = t["!merges"];
			for (var c = 0; c != l.length; ++c) {
				if (l[c].s.c != s.c || l[c].s.r != s.r) continue;
				if (l[c].e.c > l[c].s.c) f["ss:MergeAcross"] = l[c].e.c - l[c].s.c;
				if (l[c].e.r > l[c].s.r) f["ss:MergeDown"] = l[c].e.r - l[c].s.r
			}
		}
		var h = "",
			u = "";
		switch (e.t) {
			case "z":
				return "";
			case "n":
				h = "Number";
				u = String(e.v);
				break;
			case "b":
				h = "Boolean";
				u = e.v ? "1" : "0";
				break;
			case "e":
				h = "Error";
				u = Vt[e.v];
				break;
			case "d":
				h = "DateTime";
				u = new Date(e.v).toISOString();
				if (e.z == null) e.z = e.z || y._table[14];
				break;
			case "s":
				h = "String";
				u = Pe(e.v || "");
				break;
		}
		var d = Ih(a.cellXfs, e, a);
		f["ss:StyleID"] = "s" + (21 + d);
		f["ss:Index"] = s.c + 1;
		var p = e.v != null ? u : "";
		var v = '<Data ss:Type="' + h + '">' + p + "</Data>";
		if ((e.c || []).length > 0) v += Tp(e.c);
		return qe("Cell", v, f)
	}

	function yp(e, r) {
		var t = '<Row ss:Index="' + (e + 1) + '"';
		if (r) {
			if (r.hpt && !r.hpx) r.hpx = Qf(r.hpt);
			if (r.hpx) t += ' ss:AutoFitHeight="0" ss:Height="' + r.hpx + '"';
			if (r.hidden) t += ' ss:Hidden="1"'
		}
		return t + ">"
	}

	function Ip(e, r, t, a) {
		if (!e["!ref"]) return "";
		var n = ct(e["!ref"]);
		var i = e["!merges"] || [],
			s = 0;
		var f = [];
		if (e["!cols"]) e["!cols"].forEach(function(e, r) {
			Kf(e);
			var t = !!e.width;
			var a = xh(r, e);
			var n = {
				"ss:Index": r + 1
			};
			if (t) n["ss:Width"] = Vf(a.width);
			if (e.hidden) n["ss:Hidden"] = "1";
			f.push(qe("Column", null, n))
		});
		var o = Array.isArray(e);
		for (var l = n.s.r; l <= n.e.r; ++l) {
			var c = [yp(l, (e["!rows"] || [])[l])];
			for (var h = n.s.c; h <= n.e.c; ++h) {
				var u = false;
				for (s = 0; s != i.length; ++s) {
					if (i[s].s.c > h) continue;
					if (i[s].s.r > l) continue;
					if (i[s].e.c < h) continue;
					if (i[s].e.r < l) continue;
					if (i[s].s.c != h || i[s].s.r != l) u = true;
					break
				}
				if (u) continue;
				var d = {
					r: l,
					c: h
				};
				var p = ft(d),
					v = o ? (e[l] || [])[h] : e[p];
				c.push(xp(v, p, e, r, t, a, d))
			}
			c.push("</Row>");
			if (c.length > 2) f.push(c.join(""))
		}
		return f.join("")
	}

	function Rp(e, r, t) {
		var a = [];
		var n = t.SheetNames[e];
		var i = t.Sheets[n];
		var s = i ? _p(i, r, e, t) : "";
		if (s.length > 0) a.push("<Names>" + s + "</Names>");
		s = i ? Ip(i, r, e, t) : "";
		if (s.length > 0) a.push("<Table>" + s + "</Table>");
		a.push(Bp(i, r, e, t));
		return a.join("")
	}

	function Op(e, r) {
		if (!r) r = {};
		if (!e.SSF) e.SSF = y.get_table();
		if (e.SSF) {
			I(y);
			y.load_table(e.SSF);
			r.revssf = j(e.SSF);
			r.revssf[e.SSF[65535]] = 0;
			r.ssf = e.SSF;
			r.cellXfs = [];
			Ih(r.cellXfs, {}, {
				revssf: {
					General: 0
				}
			})
		}
		var t = [];
		t.push(Ep(e, r));
		t.push(wp(e, r));
		t.push("");
		t.push("");
		for (var a = 0; a < e.SheetNames.length; ++a) t.push(qe("Worksheet", Rp(a, r, e), {
			"ss:Name": Re(e.SheetNames[a])
		}));
		t[2] = kp(e, r);
		t[3] = Ap(e, r);
		return Ce + qe("Workbook", t.join(""), {
			xmlns: ar.ss,
			"xmlns:o": ar.o,
			"xmlns:x": ar.x,
			"xmlns:ss": ar.ss,
			"xmlns:dt": ar.dt,
			"xmlns:html": ar.html
		})
	}

	function Dp(e) {
		var r = {};
		var t = e.content;
		t.l = 28;
		r.AnsiUserType = t._R(0, "lpstr-ansi");
		r.AnsiClipboardFormat = $t(t);
		if (t.length - t.l <= 4) return r;
		var a = t._R(4);
		if (a == 0 || a > 40) return r;
		t.l -= 4;
		r.Reserved1 = t._R(0, "lpstr-ansi");
		if (t.length - t.l <= 4) return r;
		a = t._R(4);
		if (a !== 1907505652) return r;
		r.UnicodeClipboardFormat = Zt(t);
		a = t._R(4);
		if (a == 0 || a > 40) return r;
		t.l -= 4;
		r.Reserved2 = t._R(0, "lpwstr")
	}

	function Fp(e, r, t, a) {
		var n = t;
		var i = [];
		var s = r.slice(r.l, r.l + n);
		if (a && a.enc && a.enc.insitu) switch (e.n) {
			case "BOF":
				;
			case "FilePass":
				;
			case "FileLock":
				;
			case "InterfaceHdr":
				;
			case "RRDInfo":
				;
			case "RRDHead":
				;
			case "UsrExcl":
				break;
			default:
				if (s.length === 0) break;
				a.enc.insitu(s);
		}
		i.push(s);
		r.l += n;
		var f = zp[xr(r, r.l)];
		var o = 0;
		while (f != null && f.n.slice(0, 8) === "Continue") {
			n = xr(r, r.l + 2);
			o = r.l + 4;
			if (f.n == "ContinueFrt") o += 4;
			else if (f.n.slice(0, 11) == "ContinueFrt") o += 12;
			i.push(r.slice(o, r.l + 4 + n));
			r.l += 4 + n;
			f = zp[xr(r, r.l)]
		}
		var l = B(i);
		Ur(l, 0);
		var c = 0;
		l.lens = [];
		for (var h = 0; h < i.length; ++h) {
			l.lens.push(c);
			c += i[h].length
		}
		return e.f(l, l.length, a)
	}

	function Pp(e, r, t) {
		if (e.t === "z") return;
		if (!e.XF) return;
		var a = 0;
		try {
			a = e.z || e.XF.numFmtId || 0;
			if (r.cellNF) e.z = y._table[a]
		} catch (n) {
			if (r.WTF) throw n
		}
		if (!r || r.cellText !== false) try {
			if (e.t === "e") {
				e.w = e.w || Vt[e.v]
			} else if (a === 0 || a == "General") {
				if (e.t === "n") {
					if ((e.v | 0) === e.v) e.w = y._general_int(e.v);
					else e.w = y._general_num(e.v)
				} else e.w = y._general(e.v)
			} else e.w = y.format(a, e.v, {
				date1904: !!t
			})
		} catch (n) {
			if (r.WTF) throw n
		}
		if (r.cellDates && a && e.t == "n" && y.is_date(y._table[a] || String(a))) {
			var i = y.parse_date_code(e.v);
			if (i) {
				e.t = "d";
				e.v = new Date(i.y, i.m - 1, i.d, i.H, i.M, i.S, i.u)
			}
		}
	}

	function Np(e, r, t) {
		return {
			v: e,
			ixfe: r,
			t: t
		}
	}

	function Lp(e, r) {
		var t = {
			opts: {}
		};
		var a = {};
		if (g != null && r.dense == null) r.dense = g;
		var n = r.dense ? [] : {};
		var i = {};
		var s = {};
		var f = null;
		var o = [];
		var c = "";
		var h = {};
		var u, d = "",
			p, v, m, b;
		var C = {};
		var E = [];
		var w;
		var k;
		var S = true;
		var A = [];
		var _ = [];
		var B = {
				Sheets: [],
				WBProps: {
					date1904: false
				},
				Views: [{}]
			},
			T = {};
		var x = function me(e) {
			if (e < 8) return ga[e];
			if (e < 64) return _[e - 8] || ga[e];
			return ga[e]
		};
		var I = function be(e, r, t) {
			var a = r.XF.data;
			if (!a || !a.patternType || !t || !t.cellStyles) return;
			r.s = {};
			r.s.patternType = a.patternType;
			var n;
			if (n = Ff(x(a.icvFore))) {
				r.s.fgColor = {
					rgb: n
				}
			}
			if (n = Ff(x(a.icvBack))) {
				r.s.bgColor = {
					rgb: n
				}
			}
		};
		var R = function Ce(e, r, t) {
			if (X > 1) return;
			if (!S) return;
			if (t.cellStyles && r.XF && r.XF.data) I(e, r, t);
			delete r.ixfe;
			delete r.XF;
			u = e;
			d = ft(e);
			if (s.s) {
				if (e.r < s.s.r) s.s.r = e.r;
				if (e.c < s.s.c) s.s.c = e.c
			}
			if (s.e) {
				if (e.r + 1 > s.e.r) s.e.r = e.r + 1;
				if (e.c + 1 > s.e.c) s.e.c = e.c + 1
			}
			if (t.cellFormula && r.f) {
				for (var a = 0; a < E.length; ++a) {
					if (E[a][0].s.c > e.c || E[a][0].s.r > e.r) continue;
					if (E[a][0].e.c < e.c || E[a][0].e.r < e.r) continue;
					r.F = lt(E[a][0]);
					if (E[a][0].s.c != e.c || E[a][0].s.r != e.r) delete r.f;
					if (r.f) r.f = "" + ih(E[a][1], s, e, W, O);
					break
				}
			}
			if (t.sheetRows && u.r >= t.sheetRows) S = false;
			else {
				if (t.dense) {
					if (!n[e.r]) n[e.r] = [];
					n[e.r][e.c] = r
				} else n[d] = r
			}
		};
		var O = {
			enc: false,
			sbcch: 0,
			snames: [],
			sharedf: C,
			arrayf: E,
			rrtabid: [],
			lastuser: "",
			biff: 8,
			codepage: 0,
			winlocked: 0,
			cellStyles: !!r && !!r.cellStyles,
			WTF: !!r && !!r.wtf
		};
		if (r.password) O.password = r.password;
		var D;
		var F = [];
		var P = [];
		var N = [],
			L = [];
		var M = 0,
			U = 0;
		var H = false;
		var W = [];
		W.SheetNames = O.snames;
		W.sharedf = O.sharedf;
		W.arrayf = O.arrayf;
		W.names = [];
		W.XTI = [];
		var V = "";
		var X = 0;
		var G = 0,
			j = [];
		var K = [];
		var Y;
		O.codepage = 1200;
		l(1200);
		var $ = false;
		while (e.l < e.length - 1) {
			var Z = e.l;
			var Q = e._R(2);
			if (Q === 0 && V === "EOF") break;
			var J = e.l === e.length ? 0 : e._R(2);
			var q = zp[Q];
			if (q && q.f) {
				if (r.bookSheets) {
					if (V === "BoundSheet8" && q.n !== "BoundSheet8") break
				}
				V = q.n;
				if (q.r === 2 || q.r == 12) {
					var ee = e._R(2);
					J -= 2;
					if (!O.enc && ee !== Q && ((ee & 255) << 8 | ee >> 8) !== Q) throw new Error("rt mismatch: " + ee + "!=" + Q);
					if (q.r == 12) {
						e.l += 10;
						J -= 10
					}
				}
				var re;
				if (q.n === "EOF") re = q.f(e, J, O);
				else re = Fp(q, e, J, O);
				var te = q.n;
				if (X == 0 && te != "BOF") continue;
				switch (te) {
					case "Date1904":
						t.opts.Date1904 = B.WBProps.date1904 = re;
						break;
					case "WriteProtect":
						t.opts.WriteProtect = true;
						break;
					case "FilePass":
						if (!O.enc) e.l = 0;
						O.enc = re;
						if (!r.password) throw new Error("File is password-protected");
						if (re.valid == null) throw new Error("Encryption scheme unsupported");
						if (!re.valid) throw new Error("Password is incorrect");
						break;
					case "WriteAccess":
						O.lastuser = re;
						break;
					case "FileSharing":
						break;
					case "CodePage":
						switch (re) {
							case 21010:
								re = 1200;
								break;
							case 32768:
								re = 1e4;
								break;
							case 32769:
								re = 1252;
								break;
						}
						l(O.codepage = re);
						$ = true;
						break;
					case "RRTabId":
						O.rrtabid = re;
						break;
					case "WinProtect":
						O.winlocked = re;
						break;
					case "Template":
						break;
					case "BookBool":
						break;
					case "UsesELFs":
						break;
					case "MTRSettings":
						break;
					case "RefreshAll":
						;
					case "CalcCount":
						;
					case "CalcDelta":
						;
					case "CalcIter":
						;
					case "CalcMode":
						;
					case "CalcPrecision":
						;
					case "CalcSaveRecalc":
						t.opts[te] = re;
						break;
					case "CalcRefMode":
						O.CalcRefMode = re;
						break;
					case "Uncalced":
						break;
					case "ForceFullCalculation":
						t.opts.FullCalc = re;
						break;
					case "WsBool":
						if (re.fDialog) n["!type"] = "dialog";
						break;
					case "XF":
						A.push(re);
						break;
					case "ExtSST":
						break;
					case "BookExt":
						break;
					case "RichTextStream":
						break;
					case "BkHim":
						break;
					case "SupBook":
						W.push([re]);
						W[W.length - 1].XTI = [];
						break;
					case "ExternName":
						W[W.length - 1].push(re);
						break;
					case "Index":
						break;
					case "Lbl":
						Y = {
							Name: re.Name,
							Ref: ih(re.rgce, s, null, W, O)
						};
						if (re.itab > 0) Y.Sheet = re.itab - 1;
						W.names.push(Y);
						if (!W[0]) {
							W[0] = [];
							W[0].XTI = []
						}
						W[W.length - 1].push(re);
						if (re.Name == "_xlnm._FilterDatabase" && re.itab > 0)
							if (re.rgce && re.rgce[0] && re.rgce[0][0] && re.rgce[0][0][0] == "PtgArea3d") K[re.itab - 1] = {
								ref: lt(re.rgce[0][0][1][2])
							};
						break;
					case "ExternCount":
						O.ExternCount = re;
						break;
					case "ExternSheet":
						if (W.length == 0) {
							W[0] = [];
							W[0].XTI = []
						}
						W[W.length - 1].XTI = W[W.length - 1].XTI.concat(re);
						W.XTI = W.XTI.concat(re);
						break;
					case "NameCmt":
						if (O.biff < 8) break;
						if (Y != null) Y.Comment = re[1];
						break;
					case "Protect":
						n["!protect"] = re;
						break;
					case "Password":
						if (re !== 0 && O.WTF) console.error("Password verifier: " + re);
						break;
					case "Prot4Rev":
						;
					case "Prot4RevPass":
						break;
					case "BoundSheet8":
						{
							i[re.pos] = re;O.snames.push(re.name)
						}
						break;
					case "EOF":
						{
							if (--X) break;
							if (s.e) {
								if (s.e.r > 0 && s.e.c > 0) {
									s.e.r--;
									s.e.c--;
									n["!ref"] = lt(s);
									s.e.r++;
									s.e.c++
								}
								if (F.length > 0) n["!merges"] = F;
								if (P.length > 0) n["!objects"] = P;
								if (N.length > 0) n["!cols"] = N;
								if (L.length > 0) n["!rows"] = L;
								B.Sheets.push(T)
							}
							if (c === "") h = n;
							else a[c] = n;n = r.dense ? [] : {}
						}
						break;
					case "BOF":
						{
							if (O.biff === 8) O.biff = {
								9: 2,
								521: 3,
								1033: 4
							}[Q] || {
								512: 2,
								768: 3,
								1024: 4,
								1280: 5,
								1536: 8,
								2: 2,
								7: 2
							}[re.BIFFVer] || 8;
							if (X++) break;S = true;n = r.dense ? [] : {};
							if (O.biff < 8 && !$) {
								$ = true;
								l(O.codepage = r.codepage || 1252)
							}
							if (O.biff < 5) {
								if (c === "") c = "Sheet1";
								s = {
									s: {
										r: 0,
										c: 0
									},
									e: {
										r: 0,
										c: 0
									}
								};
								var ae = {
									pos: e.l - J,
									name: c
								};
								i[ae.pos] = ae;
								O.snames.push(c)
							} else c = (i[Z] || {
								name: ""
							}).name;
							if (re.dt == 32) n["!type"] = "chart";
							if (re.dt == 64) n["!type"] = "macro";F = [];P = [];O.arrayf = E = [];N = [];L = [];M = U = 0;H = false;T = {
								Hidden: (i[Z] || {
									hs: 0
								}).hs,
								name: c
							}
						}
						break;
					case "Number":
						;
					case "BIFF2NUM":
						;
					case "BIFF2INT":
						{
							if (n["!type"] == "chart")
								if (r.dense ? (n[re.r] || [])[re.c] : n[ft({
										c: re.c,
										r: re.r
									})]) ++re.c;w = {
								ixfe: re.ixfe,
								XF: A[re.ixfe] || {},
								v: re.val,
								t: "n"
							};
							if (G > 0) w.z = j[w.ixfe >> 8 & 31];Pp(w, r, t.opts.Date1904);R({
								c: re.c,
								r: re.r
							}, w, r)
						}
						break;
					case "BoolErr":
						{
							w = {
								ixfe: re.ixfe,
								XF: A[re.ixfe],
								v: re.val,
								t: re.t
							};
							if (G > 0) w.z = j[w.ixfe >> 8 & 31];Pp(w, r, t.opts.Date1904);R({
								c: re.c,
								r: re.r
							}, w, r)
						}
						break;
					case "RK":
						{
							w = {
								ixfe: re.ixfe,
								XF: A[re.ixfe],
								v: re.rknum,
								t: "n"
							};
							if (G > 0) w.z = j[w.ixfe >> 8 & 31];Pp(w, r, t.opts.Date1904);R({
								c: re.c,
								r: re.r
							}, w, r)
						}
						break;
					case "MulRk":
						{
							for (var ne = re.c; ne <= re.C; ++ne) {
								var ie = re.rkrec[ne - re.c][0];
								w = {
									ixfe: ie,
									XF: A[ie],
									v: re.rkrec[ne - re.c][1],
									t: "n"
								};
								if (G > 0) w.z = j[w.ixfe >> 8 & 31];
								Pp(w, r, t.opts.Date1904);
								R({
									c: ne,
									r: re.r
								}, w, r)
							}
						}
						break;
					case "Formula":
						{
							if (re.val == "String") {
								f = re;
								break
							}
							w = Np(re.val, re.cell.ixfe, re.tt);w.XF = A[w.ixfe];
							if (r.cellFormula) {
								var se = re.formula;
								if (se && se[0] && se[0][0] && se[0][0][0] == "PtgExp") {
									var fe = se[0][0][1][0],
										oe = se[0][0][1][1];
									var le = ft({
										r: fe,
										c: oe
									});
									if (C[le]) w.f = "" + ih(re.formula, s, re.cell, W, O);
									else w.F = ((r.dense ? (n[fe] || [])[oe] : n[le]) || {}).F
								} else w.f = "" + ih(re.formula, s, re.cell, W, O)
							}
							if (G > 0) w.z = j[w.ixfe >> 8 & 31];Pp(w, r, t.opts.Date1904);R(re.cell, w, r);f = re
						}
						break;
					case "String":
						{
							if (f) {
								f.val = re;
								w = Np(re, f.cell.ixfe, "s");
								w.XF = A[w.ixfe];
								if (r.cellFormula) {
									w.f = "" + ih(f.formula, s, f.cell, W, O)
								}
								if (G > 0) w.z = j[w.ixfe >> 8 & 31];
								Pp(w, r, t.opts.Date1904);
								R(f.cell, w, r);
								f = null
							} else throw new Error("String record expects Formula")
						}
						break;
					case "Array":
						{
							E.push(re);
							var ce = ft(re[0].s);p = r.dense ? (n[re[0].s.r] || [])[re[0].s.c] : n[ce];
							if (r.cellFormula && p) {
								if (!f) break;
								if (!ce || !p) break;
								p.f = "" + ih(re[1], s, re[0], W, O);
								p.F = lt(re[0])
							}
						}
						break;
					case "ShrFmla":
						{
							if (!S) break;
							if (!r.cellFormula) break;
							if (d) {
								if (!f) break;
								C[ft(f.cell)] = re[0];
								p = r.dense ? (n[f.cell.r] || [])[f.cell.c] : n[ft(f.cell)];
								(p || {}).f = "" + ih(re[0], s, u, W, O)
							}
						}
						break;
					case "LabelSst":
						w = Np(o[re.isst].t, re.ixfe, "s");
						w.XF = A[w.ixfe];
						if (G > 0) w.z = j[w.ixfe >> 8 & 31];
						Pp(w, r, t.opts.Date1904);
						R({
							c: re.c,
							r: re.r
						}, w, r);
						break;
					case "Blank":
						if (r.sheetStubs) {
							w = {
								ixfe: re.ixfe,
								XF: A[re.ixfe],
								t: "z"
							};
							if (G > 0) w.z = j[w.ixfe >> 8 & 31];
							Pp(w, r, t.opts.Date1904);
							R({
								c: re.c,
								r: re.r
							}, w, r)
						}
						break;
					case "MulBlank":
						if (r.sheetStubs) {
							for (var he = re.c; he <= re.C; ++he) {
								var ue = re.ixfe[he - re.c];
								w = {
									ixfe: ue,
									XF: A[ue],
									t: "z"
								};
								if (G > 0) w.z = j[w.ixfe >> 8 & 31];
								Pp(w, r, t.opts.Date1904);
								R({
									c: he,
									r: re.r
								}, w, r)
							}
						}
						break;
					case "RString":
						;
					case "Label":
						;
					case "BIFF2STR":
						w = Np(re.val, re.ixfe, "s");
						w.XF = A[w.ixfe];
						if (G > 0) w.z = j[w.ixfe >> 8 & 31];
						Pp(w, r, t.opts.Date1904);
						R({
							c: re.c,
							r: re.r
						}, w, r);
						break;
					case "Dimensions":
						{
							if (X === 1) s = re
						}
						break;
					case "SST":
						{
							o = re
						}
						break;
					case "Format":
						{
							if (O.biff == 4) {
								j[G++] = re[1];
								for (var de = 0; de < G + 163; ++de)
									if (y._table[de] == re[1]) break;
								if (de >= 163) y.load(re[1], G + 163)
							} else y.load(re[1], re[0])
						}
						break;
					case "BIFF2FORMAT":
						{
							j[G++] = re;
							for (var pe = 0; pe < G + 163; ++pe)
								if (y._table[pe] == re) break;if (pe >= 163) y.load(re, G + 163)
						}
						break;
					case "MergeCells":
						F = F.concat(re);
						break;
					case "Obj":
						P[re.cmo[0]] = O.lastobj = re;
						break;
					case "TxO":
						O.lastobj.TxO = re;
						break;
					case "ImData":
						O.lastobj.ImData = re;
						break;
					case "HLink":
						{
							for (b = re[0].s.r; b <= re[0].e.r; ++b)
								for (m = re[0].s.c; m <= re[0].e.c; ++m) {
									p = r.dense ? (n[b] || [])[m] : n[ft({
										c: m,
										r: b
									})];
									if (p) p.l = re[1]
								}
						}
						break;
					case "HLinkTooltip":
						{
							for (b = re[0].s.r; b <= re[0].e.r; ++b)
								for (m = re[0].s.c; m <= re[0].e.c; ++m) {
									p = r.dense ? (n[b] || [])[m] : n[ft({
										c: m,
										r: b
									})];
									if (p && p.l) p.l.Tooltip = re[1]
								}
						}
						break;
					case "Note":
						{
							if (O.biff <= 5 && O.biff >= 2) break;p = r.dense ? (n[re[0].r] || [])[re[0].c] : n[ft(re[0])];
							var ve = P[re[2]];
							if (!p) break;
							if (!p.c) p.c = [];v = {
								a: re[1],
								t: ve.TxO.t
							};p.c.push(v)
						}
						break;
					default:
						switch (q.n) {
							case "ClrtClient":
								break;
							case "XFExt":
								tl(A[re.ixfe], re.ext);
								break;
							case "DefColWidth":
								M = re;
								break;
							case "DefaultRowHeight":
								U = re[1];
								break;
							case "ColInfo":
								{
									if (!O.cellStyles) break;
									while (re.e >= re.s) {
										N[re.e--] = {
											width: re.w / 256
										};
										if (!H) {
											H = true;
											jf(re.w / 256)
										}
										Kf(N[re.e + 1])
									}
								}
								break;
							case "Row":
								{
									var ge = {};
									if (re.level != null) {
										L[re.r] = ge;
										ge.level = re.level
									}
									if (re.hidden) {
										L[re.r] = ge;
										ge.hidden = true
									}
									if (re.hpt) {
										L[re.r] = ge;
										ge.hpt = re.hpt;
										ge.hpx = Qf(re.hpt)
									}
								}
								break;
							case "LeftMargin":
								;
							case "RightMargin":
								;
							case "TopMargin":
								;
							case "BottomMargin":
								if (!n["!margins"]) yh(n["!margins"] = {});
								n["!margins"][te.slice(0, -6).toLowerCase()] = re;
								break;
							case "Setup":
								if (!n["!margins"]) yh(n["!margins"] = {});
								n["!margins"].header = re.header;
								n["!margins"].footer = re.footer;
								break;
							case "Window2":
								if (re.RTL) B.Views[0].RTL = true;
								break;
							case "Header":
								break;
							case "Footer":
								break;
							case "HCenter":
								break;
							case "VCenter":
								break;
							case "Pls":
								break;
							case "GCW":
								break;
							case "LHRecord":
								break;
							case "DBCell":
								break;
							case "EntExU2":
								break;
							case "SxView":
								break;
							case "Sxvd":
								break;
							case "SXVI":
								break;
							case "SXVDEx":
								break;
							case "SxIvd":
								break;
							case "SXString":
								break;
							case "Sync":
								break;
							case "Addin":
								break;
							case "SXDI":
								break;
							case "SXLI":
								break;
							case "SXEx":
								break;
							case "QsiSXTag":
								break;
							case "Selection":
								break;
							case "Feat":
								break;
							case "FeatHdr":
								;
							case "FeatHdr11":
								break;
							case "Feature11":
								;
							case "Feature12":
								;
							case "List12":
								break;
							case "Country":
								k = re;
								break;
							case "RecalcId":
								break;
							case "DxGCol":
								break;
							case "Fbi":
								;
							case "Fbi2":
								;
							case "GelFrame":
								break;
							case "Font":
								break;
							case "XFCRC":
								break;
							case "Style":
								break;
							case "StyleExt":
								break;
							case "Palette":
								_ = re;
								break;
							case "Theme":
								D = re;
								break;
							case "ScenarioProtect":
								break;
							case "ObjProtect":
								break;
							case "CondFmt12":
								break;
							case "Table":
								break;
							case "TableStyles":
								break;
							case "TableStyle":
								break;
							case "TableStyleElement":
								break;
							case "SXStreamID":
								break;
							case "SXVS":
								break;
							case "DConRef":
								break;
							case "SXAddl":
								break;
							case "DConBin":
								break;
							case "DConName":
								break;
							case "SXPI":
								break;
							case "SxFormat":
								break;
							case "SxSelect":
								break;
							case "SxRule":
								break;
							case "SxFilt":
								break;
							case "SxItm":
								break;
							case "SxDXF":
								break;
							case "ScenMan":
								break;
							case "DCon":
								break;
							case "CellWatch":
								break;
							case "PrintRowCol":
								break;
							case "PrintGrid":
								break;
							case "PrintSize":
								break;
							case "XCT":
								break;
							case "CRN":
								break;
							case "Scl":
								{}
								break;
							case "SheetExt":
								{}
								break;
							case "SheetExtOptional":
								{}
								break;
							case "ObNoMacros":
								{}
								break;
							case "ObProj":
								{}
								break;
							case "CodeName":
								{
									if (!c) B.WBProps.CodeName = re || "ThisWorkbook";
									else T.CodeName = re || T.name
								}
								break;
							case "GUIDTypeLib":
								{}
								break;
							case "WOpt":
								break;
							case "PhoneticInfo":
								break;
							case "OleObjectSize":
								break;
							case "DXF":
								;
							case "DXFN":
								;
							case "DXFN12":
								;
							case "DXFN12List":
								;
							case "DXFN12NoCB":
								break;
							case "Dv":
								;
							case "DVal":
								break;
							case "BRAI":
								;
							case "Series":
								;
							case "SeriesText":
								break;
							case "DConn":
								break;
							case "DbOrParamQry":
								break;
							case "DBQueryExt":
								break;
							case "OleDbConn":
								break;
							case "ExtString":
								break;
							case "IFmtRecord":
								break;
							case "CondFmt":
								;
							case "CF":
								;
							case "CF12":
								;
							case "CFEx":
								break;
							case "Excel9File":
								break;
							case "Units":
								break;
							case "InterfaceHdr":
								;
							case "Mms":
								;
							case "InterfaceEnd":
								;
							case "DSF":
								break;
							case "BuiltInFnGroupCount":
								break;
							case "Window1":
								;
							case "HideObj":
								;
							case "GridSet":
								;
							case "Guts":
								;
							case "UserBView":
								;
							case "UserSViewBegin":
								;
							case "UserSViewEnd":
								;
							case "Pane":
								break;
							default:
								switch (q.n) {
									case "Dat":
										;
									case "Begin":
										;
									case "End":
										;
									case "StartBlock":
										;
									case "EndBlock":
										;
									case "Frame":
										;
									case "Area":
										;
									case "Axis":
										;
									case "AxisLine":
										;
									case "Tick":
										break;
									case "AxesUsed":
										;
									case "CrtLayout12":
										;
									case "CrtLayout12A":
										;
									case "CrtLink":
										;
									case "CrtLine":
										;
									case "CrtMlFrt":
										;
									case "CrtMlFrtContinue":
										break;
									case "LineFormat":
										;
									case "AreaFormat":
										;
									case "Chart":
										;
									case "Chart3d":
										;
									case "Chart3DBarShape":
										;
									case "ChartFormat":
										;
									case "ChartFrtInfo":
										break;
									case "PlotArea":
										;
									case "PlotGrowth":
										break;
									case "SeriesList":
										;
									case "SerParent":
										;
									case "SerAuxTrend":
										break;
									case "DataFormat":
										;
									case "SerToCrt":
										;
									case "FontX":
										break;
									case "CatSerRange":
										;
									case "AxcExt":
										;
									case "SerFmt":
										break;
									case "ShtProps":
										break;
									case "DefaultText":
										;
									case "Text":
										;
									case "CatLab":
										break;
									case "DataLabExtContents":
										break;
									case "Legend":
										;
									case "LegendException":
										break;
									case "Pie":
										;
									case "Scatter":
										break;
									case "PieFormat":
										;
									case "MarkerFormat":
										break;
									case "StartObject":
										;
									case "EndObject":
										break;
									case "AlRuns":
										;
									case "ObjectLink":
										break;
									case "SIIndex":
										break;
									case "AttachedLabel":
										;
									case "YMult":
										break;
									case "Line":
										;
									case "Bar":
										break;
									case "Surf":
										break;
									case "AxisParent":
										break;
									case "Pos":
										break;
									case "ValueRange":
										break;
									case "SXViewEx9":
										break;
									case "SXViewLink":
										break;
									case "PivotChartBits":
										break;
									case "SBaseRef":
										break;
									case "TextPropsStream":
										break;
									case "LnExt":
										break;
									case "MkrExt":
										break;
									case "CrtCoopt":
										break;
									case "Qsi":
										;
									case "Qsif":
										;
									case "Qsir":
										;
									case "QsiSXTag":
										break;
									case "TxtQry":
										break;
									case "FilterMode":
										break;
									case "AutoFilter":
										;
									case "AutoFilterInfo":
										break;
									case "AutoFilter12":
										break;
									case "DropDownObjIds":
										break;
									case "Sort":
										break;
									case "SortData":
										break;
									case "ShapePropsStream":
										break;
									case "MsoDrawing":
										;
									case "MsoDrawingGroup":
										;
									case "MsoDrawingSelection":
										break;
									case "WebPub":
										;
									case "AutoWebPub":
										break;
									case "HeaderFooter":
										;
									case "HFPicture":
										;
									case "PLV":
										;
									case "HorizontalPageBreaks":
										;
									case "VerticalPageBreaks":
										break;
									case "Backup":
										;
									case "CompressPictures":
										;
									case "Compat12":
										break;
									case "Continue":
										;
									case "ContinueFrt12":
										break;
									case "FrtFontList":
										;
									case "FrtWrapper":
										break;
									default:
										switch (q.n) {
											case "TabIdConf":
												;
											case "Radar":
												;
											case "RadarArea":
												;
											case "DropBar":
												;
											case "Intl":
												;
											case "CoordList":
												;
											case "SerAuxErrBar":
												break;
											case "BIFF2FONTCLR":
												;
											case "BIFF2FMTCNT":
												;
											case "BIFF2FONTXTRA":
												break;
											case "BIFF2XF":
												;
											case "BIFF3XF":
												;
											case "BIFF4XF":
												break;
											case "BIFF4FMTCNT":
												;
											case "BIFF2ROW":
												;
											case "BIFF2WINDOW2":
												break;
											case "SCENARIO":
												;
											case "DConBin":
												;
											case "PicF":
												;
											case "DataLabExt":
												;
											case "Lel":
												;
											case "BopPop":
												;
											case "BopPopCustom":
												;
											case "RealTimeData":
												;
											case "Name":
												break;
											case "LHNGraph":
												;
											case "FnGroupName":
												;
											case "AddMenu":
												;
											case "LPr":
												break;
											case "ListObj":
												;
											case "ListField":
												break;
											case "RRSort":
												break;
											case "BigName":
												break;
											case "ToolbarHdr":
												;
											case "ToolbarEnd":
												break;
											case "DDEObjName":
												break;
											case "FRTArchId$":
												break;
											default:
												if (r.WTF) throw "Unrecognized Record " + q.n;
										};
								};
						};
				}
			} else e.l += J
		}
		t.SheetNames = z(i).sort(function(e, r) {
			return Number(e) - Number(r)
		}).map(function(e) {
			return i[e].name
		});
		if (!r.bookSheets) t.Sheets = a;
		if (t.Sheets) K.forEach(function(e, r) {
			t.Sheets[t.SheetNames[r]]["!autofilter"] = e
		});
		t.Preamble = h;
		t.Strings = o;
		t.SSF = y.get_table();
		if (O.enc) t.Encryption = O.enc;
		if (D) t.Themes = D;
		t.Metadata = {};
		if (k !== undefined) t.Metadata.Country = k;
		if (W.names.length > 0) B.Names = W.names;
		t.Workbook = B;
		return t
	}

	function Mp(e, r, t) {
		var a = L.find(e, "!DocumentSummaryInformation");
		if (a && a.size > 0) try {
			var n = En(a, ca, "02d5cdd59c2e1b10939708002b2cf9ae");
			for (var i in n) r[i] = n[i]
		} catch (s) {
			if (t.WTF) throw s
		}
		var f = L.find(e, "!SummaryInformation");
		if (f && f.size > 0) try {
			var o = En(f, ha, "e0859ff2f94f6810ab9108002b27b3d9");
			for (var l in o)
				if (r[l] == null) r[l] = o[l]
		} catch (s) {
			if (t.WTF) throw s
		}
	}

	function Up(e, r) {
		if (!r) r = {};
		yv(r);
		c();
		if (r.codepage) f(r.codepage);
		var t, a;
		if (e.FullPaths) {
			if (L.find(e, "/encryption")) throw new Error("File is password-protected");
			t = L.find(e, "!CompObj");
			a = L.find(e, "/Workbook") || L.find(e, "/Book")
		} else {
			switch (r.type) {
				case "base64":
					e = w(b.decode(e));
					break;
				case "binary":
					e = w(e);
					break;
				case "buffer":
					break;
				case "array":
					if (!Array.isArray(e)) e = Array.prototype.slice.call(e);
					break;
			}
			Ur(e, 0);
			a = {
				content: e
			}
		}
		var n;
		var i;
		if (t) Dp(t);
		if (r.bookProps && !r.bookSheets) n = {};
		else {
			var s = C ? "buffer" : "array";
			if (a && a.content) n = Lp(a.content, r);
			else if ((i = L.find(e, "PerfectOffice_MAIN")) && i.content) n = Gs.to_workbook(i.content, (r.type = s, r));
			else if ((i = L.find(e, "NativeContent_MAIN")) && i.content) n = Gs.to_workbook(i.content, (r.type = s, r));
			else throw new Error("Cannot find Workbook stream");
			if (r.bookVBA && e.FullPaths && L.find(e, "/_VBA_PROJECT_CUR/VBA/dir")) n.vbaraw = Sl(e)
		}
		var o = {};
		if (e.FullPaths) Mp(e, o, r);
		n.Props = n.Custprops = o;
		if (r.bookFiles) n.cfb = e;
		return n
	}

	function Hp(e, r) {
		var t = r || {};
		var a = L.utils.cfb_new({
			root: "R"
		});
		var n = "/Workbook";
		switch (t.bookType || "xls") {
			case "xls":
				t.bookType = "biff8";
			case "xla":
				if (!t.bookType) t.bookType = "xla";
			case "biff8":
				n = "/Workbook";
				t.biff = 8;
				break;
			case "biff5":
				n = "/Book";
				t.biff = 5;
				break;
			default:
				throw new Error("invalid type " + t.bookType + " for XLS CFB");
		}
		L.utils.cfb_add(a, n, fv(e, t));
		if (t.biff == 8 && e.vbaraw) Al(a, L.read(e.vbaraw, {
			type: typeof e.vbaraw == "string" ? "binary" : "buffer"
		}));
		return a
	}
	var Wp = {
		0: {
			n: "BrtRowHdr",
			f: fu
		},
		1: {
			n: "BrtCellBlank",
			f: vu
		},
		2: {
			n: "BrtCellRk",
			f: Au
		},
		3: {
			n: "BrtCellError",
			f: Cu
		},
		4: {
			n: "BrtCellBool",
			f: mu
		},
		5: {
			n: "BrtCellReal",
			f: ku
		},
		6: {
			n: "BrtCellSt",
			f: Bu
		},
		7: {
			n: "BrtCellIsst",
			f: Eu
		},
		8: {
			n: "BrtFmlaString",
			f: Ru
		},
		9: {
			n: "BrtFmlaNum",
			f: Iu
		},
		10: {
			n: "BrtFmlaBool",
			f: xu
		},
		11: {
			n: "BrtFmlaError",
			f: yu
		},
		16: {
			n: "BrtFRTArchID$",
			f: Fd
		},
		19: {
			n: "BrtSSTItem",
			f: wt
		},
		20: {
			n: "BrtPCDIMissing"
		},
		21: {
			n: "BrtPCDINumber"
		},
		22: {
			n: "BrtPCDIBoolean"
		},
		23: {
			n: "BrtPCDIError"
		},
		24: {
			n: "BrtPCDIString"
		},
		25: {
			n: "BrtPCDIDatetime"
		},
		26: {
			n: "BrtPCDIIndex"
		},
		27: {
			n: "BrtPCDIAMissing"
		},
		28: {
			n: "BrtPCDIANumber"
		},
		29: {
			n: "BrtPCDIABoolean"
		},
		30: {
			n: "BrtPCDIAError"
		},
		31: {
			n: "BrtPCDIAString"
		},
		32: {
			n: "BrtPCDIADatetime"
		},
		33: {
			n: "BrtPCRRecord"
		},
		34: {
			n: "BrtPCRRecordDt"
		},
		35: {
			n: "BrtFRTBegin"
		},
		36: {
			n: "BrtFRTEnd"
		},
		37: {
			n: "BrtACBegin"
		},
		38: {
			n: "BrtACEnd"
		},
		39: {
			n: "BrtName",
			f: Pd
		},
		40: {
			n: "BrtIndexRowBlock"
		},
		42: {
			n: "BrtIndexBlock"
		},
		43: {
			n: "BrtFont",
			f: po
		},
		44: {
			n: "BrtFmt",
			f: ho
		},
		45: {
			n: "BrtFill",
			f: bo
		},
		46: {
			n: "BrtBorder",
			f: So
		},
		47: {
			n: "BrtXF",
			f: Eo
		},
		48: {
			n: "BrtStyle"
		},
		49: {
			n: "BrtCellMeta"
		},
		50: {
			n: "BrtValueMeta"
		},
		51: {
			n: "BrtMdb"
		},
		52: {
			n: "BrtBeginFmd"
		},
		53: {
			n: "BrtEndFmd"
		},
		54: {
			n: "BrtBeginMdx"
		},
		55: {
			n: "BrtEndMdx"
		},
		56: {
			n: "BrtBeginMdxTuple"
		},
		57: {
			n: "BrtEndMdxTuple"
		},
		58: {
			n: "BrtMdxMbrIstr"
		},
		59: {
			n: "BrtStr"
		},
		60: {
			n: "BrtColInfo",
			f: Ss
		},
		62: {
			n: "BrtCellRString"
		},
		63: {
			n: "BrtCalcChainItem$",
			f: nl
		},
		64: {
			n: "BrtDVal"
		},
		65: {
			n: "BrtSxvcellNum"
		},
		66: {
			n: "BrtSxvcellStr"
		},
		67: {
			n: "BrtSxvcellBool"
		},
		68: {
			n: "BrtSxvcellErr"
		},
		69: {
			n: "BrtSxvcellDate"
		},
		70: {
			n: "BrtSxvcellNil"
		},
		128: {
			n: "BrtFileVersion"
		},
		129: {
			n: "BrtBeginSheet"
		},
		130: {
			n: "BrtEndSheet"
		},
		131: {
			n: "BrtBeginBook",
			f: Hr,
			p: 0
		},
		132: {
			n: "BrtEndBook"
		},
		133: {
			n: "BrtBeginWsViews"
		},
		134: {
			n: "BrtEndWsViews"
		},
		135: {
			n: "BrtBeginBookViews"
		},
		136: {
			n: "BrtEndBookViews"
		},
		137: {
			n: "BrtBeginWsView",
			f: zu
		},
		138: {
			n: "BrtEndWsView"
		},
		139: {
			n: "BrtBeginCsViews"
		},
		140: {
			n: "BrtEndCsViews"
		},
		141: {
			n: "BrtBeginCsView"
		},
		142: {
			n: "BrtEndCsView"
		},
		143: {
			n: "BrtBeginBundleShs"
		},
		144: {
			n: "BrtEndBundleShs"
		},
		145: {
			n: "BrtBeginSheetData"
		},
		146: {
			n: "BrtEndSheetData"
		},
		147: {
			n: "BrtWsProp",
			f: du
		},
		148: {
			n: "BrtWsDim",
			f: cu,
			p: 16
		},
		151: {
			n: "BrtPane"
		},
		152: {
			n: "BrtSel"
		},
		153: {
			n: "BrtWbProp",
			f: Od
		},
		154: {
			n: "BrtWbFactoid"
		},
		155: {
			n: "BrtFileRecover"
		},
		156: {
			n: "BrtBundleSh",
			f: Id
		},
		157: {
			n: "BrtCalcProp"
		},
		158: {
			n: "BrtBookView"
		},
		159: {
			n: "BrtBeginSst",
			f: af
		},
		160: {
			n: "BrtEndSst"
		},
		161: {
			n: "BrtBeginAFilter",
			f: Mt
		},
		162: {
			n: "BrtEndAFilter"
		},
		163: {
			n: "BrtBeginFilterColumn"
		},
		164: {
			n: "BrtEndFilterColumn"
		},
		165: {
			n: "BrtBeginFilters"
		},
		166: {
			n: "BrtEndFilters"
		},
		167: {
			n: "BrtFilter"
		},
		168: {
			n: "BrtColorFilter"
		},
		169: {
			n: "BrtIconFilter"
		},
		170: {
			n: "BrtTop10Filter"
		},
		171: {
			n: "BrtDynamicFilter"
		},
		172: {
			n: "BrtBeginCustomFilters"
		},
		173: {
			n: "BrtEndCustomFilters"
		},
		174: {
			n: "BrtCustomFilter"
		},
		175: {
			n: "BrtAFilterDateGroupItem"
		},
		176: {
			n: "BrtMergeCell",
			f: Ou
		},
		177: {
			n: "BrtBeginMergeCells"
		},
		178: {
			n: "BrtEndMergeCells"
		},
		179: {
			n: "BrtBeginPivotCacheDef"
		},
		180: {
			n: "BrtEndPivotCacheDef"
		},
		181: {
			n: "BrtBeginPCDFields"
		},
		182: {
			n: "BrtEndPCDFields"
		},
		183: {
			n: "BrtBeginPCDField"
		},
		184: {
			n: "BrtEndPCDField"
		},
		185: {
			n: "BrtBeginPCDSource"
		},
		186: {
			n: "BrtEndPCDSource"
		},
		187: {
			n: "BrtBeginPCDSRange"
		},
		188: {
			n: "BrtEndPCDSRange"
		},
		189: {
			n: "BrtBeginPCDFAtbl"
		},
		190: {
			n: "BrtEndPCDFAtbl"
		},
		191: {
			n: "BrtBeginPCDIRun"
		},
		192: {
			n: "BrtEndPCDIRun"
		},
		193: {
			n: "BrtBeginPivotCacheRecords"
		},
		194: {
			n: "BrtEndPivotCacheRecords"
		},
		195: {
			n: "BrtBeginPCDHierarchies"
		},
		196: {
			n: "BrtEndPCDHierarchies"
		},
		197: {
			n: "BrtBeginPCDHierarchy"
		},
		198: {
			n: "BrtEndPCDHierarchy"
		},
		199: {
			n: "BrtBeginPCDHFieldsUsage"
		},
		200: {
			n: "BrtEndPCDHFieldsUsage"
		},
		201: {
			n: "BrtBeginExtConnection"
		},
		202: {
			n: "BrtEndExtConnection"
		},
		203: {
			n: "BrtBeginECDbProps"
		},
		204: {
			n: "BrtEndECDbProps"
		},
		205: {
			n: "BrtBeginECOlapProps"
		},
		206: {
			n: "BrtEndECOlapProps"
		},
		207: {
			n: "BrtBeginPCDSConsol"
		},
		208: {
			n: "BrtEndPCDSConsol"
		},
		209: {
			n: "BrtBeginPCDSCPages"
		},
		210: {
			n: "BrtEndPCDSCPages"
		},
		211: {
			n: "BrtBeginPCDSCPage"
		},
		212: {
			n: "BrtEndPCDSCPage"
		},
		213: {
			n: "BrtBeginPCDSCPItem"
		},
		214: {
			n: "BrtEndPCDSCPItem"
		},
		215: {
			n: "BrtBeginPCDSCSets"
		},
		216: {
			n: "BrtEndPCDSCSets"
		},
		217: {
			n: "BrtBeginPCDSCSet"
		},
		218: {
			n: "BrtEndPCDSCSet"
		},
		219: {
			n: "BrtBeginPCDFGroup"
		},
		220: {
			n: "BrtEndPCDFGroup"
		},
		221: {
			n: "BrtBeginPCDFGItems"
		},
		222: {
			n: "BrtEndPCDFGItems"
		},
		223: {
			n: "BrtBeginPCDFGRange"
		},
		224: {
			n: "BrtEndPCDFGRange"
		},
		225: {
			n: "BrtBeginPCDFGDiscrete"
		},
		226: {
			n: "BrtEndPCDFGDiscrete"
		},
		227: {
			n: "BrtBeginPCDSDTupleCache"
		},
		228: {
			n: "BrtEndPCDSDTupleCache"
		},
		229: {
			n: "BrtBeginPCDSDTCEntries"
		},
		230: {
			n: "BrtEndPCDSDTCEntries"
		},
		231: {
			n: "BrtBeginPCDSDTCEMembers"
		},
		232: {
			n: "BrtEndPCDSDTCEMembers"
		},
		233: {
			n: "BrtBeginPCDSDTCEMember"
		},
		234: {
			n: "BrtEndPCDSDTCEMember"
		},
		235: {
			n: "BrtBeginPCDSDTCQueries"
		},
		236: {
			n: "BrtEndPCDSDTCQueries"
		},
		237: {
			n: "BrtBeginPCDSDTCQuery"
		},
		238: {
			n: "BrtEndPCDSDTCQuery"
		},
		239: {
			n: "BrtBeginPCDSDTCSets"
		},
		240: {
			n: "BrtEndPCDSDTCSets"
		},
		241: {
			n: "BrtBeginPCDSDTCSet"
		},
		242: {
			n: "BrtEndPCDSDTCSet"
		},
		243: {
			n: "BrtBeginPCDCalcItems"
		},
		244: {
			n: "BrtEndPCDCalcItems"
		},
		245: {
			n: "BrtBeginPCDCalcItem"
		},
		246: {
			n: "BrtEndPCDCalcItem"
		},
		247: {
			n: "BrtBeginPRule"
		},
		248: {
			n: "BrtEndPRule"
		},
		249: {
			n: "BrtBeginPRFilters"
		},
		250: {
			n: "BrtEndPRFilters"
		},
		251: {
			n: "BrtBeginPRFilter"
		},
		252: {
			n: "BrtEndPRFilter"
		},
		253: {
			n: "BrtBeginPNames"
		},
		254: {
			n: "BrtEndPNames"
		},
		255: {
			n: "BrtBeginPName"
		},
		256: {
			n: "BrtEndPName"
		},
		257: {
			n: "BrtBeginPNPairs"
		},
		258: {
			n: "BrtEndPNPairs"
		},
		259: {
			n: "BrtBeginPNPair"
		},
		260: {
			n: "BrtEndPNPair"
		},
		261: {
			n: "BrtBeginECWebProps"
		},
		262: {
			n: "BrtEndECWebProps"
		},
		263: {
			n: "BrtBeginEcWpTables"
		},
		264: {
			n: "BrtEndECWPTables"
		},
		265: {
			n: "BrtBeginECParams"
		},
		266: {
			n: "BrtEndECParams"
		},
		267: {
			n: "BrtBeginECParam"
		},
		268: {
			n: "BrtEndECParam"
		},
		269: {
			n: "BrtBeginPCDKPIs"
		},
		270: {
			n: "BrtEndPCDKPIs"
		},
		271: {
			n: "BrtBeginPCDKPI"
		},
		272: {
			n: "BrtEndPCDKPI"
		},
		273: {
			n: "BrtBeginDims"
		},
		274: {
			n: "BrtEndDims"
		},
		275: {
			n: "BrtBeginDim"
		},
		276: {
			n: "BrtEndDim"
		},
		277: {
			n: "BrtIndexPartEnd"
		},
		278: {
			n: "BrtBeginStyleSheet"
		},
		279: {
			n: "BrtEndStyleSheet"
		},
		280: {
			n: "BrtBeginSXView"
		},
		281: {
			n: "BrtEndSXVI"
		},
		282: {
			n: "BrtBeginSXVI"
		},
		283: {
			n: "BrtBeginSXVIs"
		},
		284: {
			n: "BrtEndSXVIs"
		},
		285: {
			n: "BrtBeginSXVD"
		},
		286: {
			n: "BrtEndSXVD"
		},
		287: {
			n: "BrtBeginSXVDs"
		},
		288: {
			n: "BrtEndSXVDs"
		},
		289: {
			n: "BrtBeginSXPI"
		},
		290: {
			n: "BrtEndSXPI"
		},
		291: {
			n: "BrtBeginSXPIs"
		},
		292: {
			n: "BrtEndSXPIs"
		},
		293: {
			n: "BrtBeginSXDI"
		},
		294: {
			n: "BrtEndSXDI"
		},
		295: {
			n: "BrtBeginSXDIs"
		},
		296: {
			n: "BrtEndSXDIs"
		},
		297: {
			n: "BrtBeginSXLI"
		},
		298: {
			n: "BrtEndSXLI"
		},
		299: {
			n: "BrtBeginSXLIRws"
		},
		300: {
			n: "BrtEndSXLIRws"
		},
		301: {
			n: "BrtBeginSXLICols"
		},
		302: {
			n: "BrtEndSXLICols"
		},
		303: {
			n: "BrtBeginSXFormat"
		},
		304: {
			n: "BrtEndSXFormat"
		},
		305: {
			n: "BrtBeginSXFormats"
		},
		306: {
			n: "BrtEndSxFormats"
		},
		307: {
			n: "BrtBeginSxSelect"
		},
		308: {
			n: "BrtEndSxSelect"
		},
		309: {
			n: "BrtBeginISXVDRws"
		},
		310: {
			n: "BrtEndISXVDRws"
		},
		311: {
			n: "BrtBeginISXVDCols"
		},
		312: {
			n: "BrtEndISXVDCols"
		},
		313: {
			n: "BrtEndSXLocation"
		},
		314: {
			n: "BrtBeginSXLocation"
		},
		315: {
			n: "BrtEndSXView"
		},
		316: {
			n: "BrtBeginSXTHs"
		},
		317: {
			n: "BrtEndSXTHs"
		},
		318: {
			n: "BrtBeginSXTH"
		},
		319: {
			n: "BrtEndSXTH"
		},
		320: {
			n: "BrtBeginISXTHRws"
		},
		321: {
			n: "BrtEndISXTHRws"
		},
		322: {
			n: "BrtBeginISXTHCols"
		},
		323: {
			n: "BrtEndISXTHCols"
		},
		324: {
			n: "BrtBeginSXTDMPS"
		},
		325: {
			n: "BrtEndSXTDMPs"
		},
		326: {
			n: "BrtBeginSXTDMP"
		},
		327: {
			n: "BrtEndSXTDMP"
		},
		328: {
			n: "BrtBeginSXTHItems"
		},
		329: {
			n: "BrtEndSXTHItems"
		},
		330: {
			n: "BrtBeginSXTHItem"
		},
		331: {
			n: "BrtEndSXTHItem"
		},
		332: {
			n: "BrtBeginMetadata"
		},
		333: {
			n: "BrtEndMetadata"
		},
		334: {
			n: "BrtBeginEsmdtinfo"
		},
		335: {
			n: "BrtMdtinfo"
		},
		336: {
			n: "BrtEndEsmdtinfo"
		},
		337: {
			n: "BrtBeginEsmdb"
		},
		338: {
			n: "BrtEndEsmdb"
		},
		339: {
			n: "BrtBeginEsfmd"
		},
		340: {
			n: "BrtEndEsfmd"
		},
		341: {
			n: "BrtBeginSingleCells"
		},
		342: {
			n: "BrtEndSingleCells"
		},
		343: {
			n: "BrtBeginList"
		},
		344: {
			n: "BrtEndList"
		},
		345: {
			n: "BrtBeginListCols"
		},
		346: {
			n: "BrtEndListCols"
		},
		347: {
			n: "BrtBeginListCol"
		},
		348: {
			n: "BrtEndListCol"
		},
		349: {
			n: "BrtBeginListXmlCPr"
		},
		350: {
			n: "BrtEndListXmlCPr"
		},
		351: {
			n: "BrtListCCFmla"
		},
		352: {
			n: "BrtListTrFmla"
		},
		353: {
			n: "BrtBeginExternals"
		},
		354: {
			n: "BrtEndExternals"
		},
		355: {
			n: "BrtSupBookSrc",
			f: Ot
		},
		357: {
			n: "BrtSupSelf"
		},
		358: {
			n: "BrtSupSame"
		},
		359: {
			n: "BrtSupTabs"
		},
		360: {
			n: "BrtBeginSupBook"
		},
		361: {
			n: "BrtPlaceholderName"
		},
		362: {
			n: "BrtExternSheet",
			f: es
		},
		363: {
			n: "BrtExternTableStart"
		},
		364: {
			n: "BrtExternTableEnd"
		},
		366: {
			n: "BrtExternRowHdr"
		},
		367: {
			n: "BrtExternCellBlank"
		},
		368: {
			n: "BrtExternCellReal"
		},
		369: {
			n: "BrtExternCellBool"
		},
		370: {
			n: "BrtExternCellError"
		},
		371: {
			n: "BrtExternCellString"
		},
		372: {
			n: "BrtBeginEsmdx"
		},
		373: {
			n: "BrtEndEsmdx"
		},
		374: {
			n: "BrtBeginMdxSet"
		},
		375: {
			n: "BrtEndMdxSet"
		},
		376: {
			n: "BrtBeginMdxMbrProp"
		},
		377: {
			n: "BrtEndMdxMbrProp"
		},
		378: {
			n: "BrtBeginMdxKPI"
		},
		379: {
			n: "BrtEndMdxKPI"
		},
		380: {
			n: "BrtBeginEsstr"
		},
		381: {
			n: "BrtEndEsstr"
		},
		382: {
			n: "BrtBeginPRFItem"
		},
		383: {
			n: "BrtEndPRFItem"
		},
		384: {
			n: "BrtBeginPivotCacheIDs"
		},
		385: {
			n: "BrtEndPivotCacheIDs"
		},
		386: {
			n: "BrtBeginPivotCacheID"
		},
		387: {
			n: "BrtEndPivotCacheID"
		},
		388: {
			n: "BrtBeginISXVIs"
		},
		389: {
			n: "BrtEndISXVIs"
		},
		390: {
			n: "BrtBeginColInfos"
		},
		391: {
			n: "BrtEndColInfos"
		},
		392: {
			n: "BrtBeginRwBrk"
		},
		393: {
			n: "BrtEndRwBrk"
		},
		394: {
			n: "BrtBeginColBrk"
		},
		395: {
			n: "BrtEndColBrk"
		},
		396: {
			n: "BrtBrk"
		},
		397: {
			n: "BrtUserBookView"
		},
		398: {
			n: "BrtInfo"
		},
		399: {
			n: "BrtCUsr"
		},
		400: {
			n: "BrtUsr"
		},
		401: {
			n: "BrtBeginUsers"
		},
		403: {
			n: "BrtEOF"
		},
		404: {
			n: "BrtUCR"
		},
		405: {
			n: "BrtRRInsDel"
		},
		406: {
			n: "BrtRREndInsDel"
		},
		407: {
			n: "BrtRRMove"
		},
		408: {
			n: "BrtRREndMove"
		},
		409: {
			n: "BrtRRChgCell"
		},
		410: {
			n: "BrtRREndChgCell"
		},
		411: {
			n: "BrtRRHeader"
		},
		412: {
			n: "BrtRRUserView"
		},
		413: {
			n: "BrtRRRenSheet"
		},
		414: {
			n: "BrtRRInsertSh"
		},
		415: {
			n: "BrtRRDefName"
		},
		416: {
			n: "BrtRRNote"
		},
		417: {
			n: "BrtRRConflict"
		},
		418: {
			n: "BrtRRTQSIF"
		},
		419: {
			n: "BrtRRFormat"
		},
		420: {
			n: "BrtRREndFormat"
		},
		421: {
			n: "BrtRRAutoFmt"
		},
		422: {
			n: "BrtBeginUserShViews"
		},
		423: {
			n: "BrtBeginUserShView"
		},
		424: {
			n: "BrtEndUserShView"
		},
		425: {
			n: "BrtEndUserShViews"
		},
		426: {
			n: "BrtArrFmla",
			f: Lu
		},
		427: {
			n: "BrtShrFmla",
			f: Mu
		},
		428: {
			n: "BrtTable"
		},
		429: {
			n: "BrtBeginExtConnections"
		},
		430: {
			n: "BrtEndExtConnections"
		},
		431: {
			n: "BrtBeginPCDCalcMems"
		},
		432: {
			n: "BrtEndPCDCalcMems"
		},
		433: {
			n: "BrtBeginPCDCalcMem"
		},
		434: {
			n: "BrtEndPCDCalcMem"
		},
		435: {
			n: "BrtBeginPCDHGLevels"
		},
		436: {
			n: "BrtEndPCDHGLevels"
		},
		437: {
			n: "BrtBeginPCDHGLevel"
		},
		438: {
			n: "BrtEndPCDHGLevel"
		},
		439: {
			n: "BrtBeginPCDHGLGroups"
		},
		440: {
			n: "BrtEndPCDHGLGroups"
		},
		441: {
			n: "BrtBeginPCDHGLGroup"
		},
		442: {
			n: "BrtEndPCDHGLGroup"
		},
		443: {
			n: "BrtBeginPCDHGLGMembers"
		},
		444: {
			n: "BrtEndPCDHGLGMembers"
		},
		445: {
			n: "BrtBeginPCDHGLGMember"
		},
		446: {
			n: "BrtEndPCDHGLGMember"
		},
		447: {
			n: "BrtBeginQSI"
		},
		448: {
			n: "BrtEndQSI"
		},
		449: {
			n: "BrtBeginQSIR"
		},
		450: {
			n: "BrtEndQSIR"
		},
		451: {
			n: "BrtBeginDeletedNames"
		},
		452: {
			n: "BrtEndDeletedNames"
		},
		453: {
			n: "BrtBeginDeletedName"
		},
		454: {
			n: "BrtEndDeletedName"
		},
		455: {
			n: "BrtBeginQSIFs"
		},
		456: {
			n: "BrtEndQSIFs"
		},
		457: {
			n: "BrtBeginQSIF"
		},
		458: {
			n: "BrtEndQSIF"
		},
		459: {
			n: "BrtBeginAutoSortScope"
		},
		460: {
			n: "BrtEndAutoSortScope"
		},
		461: {
			n: "BrtBeginConditionalFormatting"
		},
		462: {
			n: "BrtEndConditionalFormatting"
		},
		463: {
			n: "BrtBeginCFRule"
		},
		464: {
			n: "BrtEndCFRule"
		},
		465: {
			n: "BrtBeginIconSet"
		},
		466: {
			n: "BrtEndIconSet"
		},
		467: {
			n: "BrtBeginDatabar"
		},
		468: {
			n: "BrtEndDatabar"
		},
		469: {
			n: "BrtBeginColorScale"
		},
		470: {
			n: "BrtEndColorScale"
		},
		471: {
			n: "BrtCFVO"
		},
		472: {
			n: "BrtExternValueMeta"
		},
		473: {
			n: "BrtBeginColorPalette"
		},
		474: {
			n: "BrtEndColorPalette"
		},
		475: {
			n: "BrtIndexedColor"
		},
		476: {
			n: "BrtMargins",
			f: Wu
		},
		477: {
			n: "BrtPrintOptions"
		},
		478: {
			n: "BrtPageSetup"
		},
		479: {
			n: "BrtBeginHeaderFooter"
		},
		480: {
			n: "BrtEndHeaderFooter"
		},
		481: {
			n: "BrtBeginSXCrtFormat"
		},
		482: {
			n: "BrtEndSXCrtFormat"
		},
		483: {
			n: "BrtBeginSXCrtFormats"
		},
		484: {
			n: "BrtEndSXCrtFormats"
		},
		485: {
			n: "BrtWsFmtInfo",
			f: uu
		},
		486: {
			n: "BrtBeginMgs"
		},
		487: {
			n: "BrtEndMGs"
		},
		488: {
			n: "BrtBeginMGMaps"
		},
		489: {
			n: "BrtEndMGMaps"
		},
		490: {
			n: "BrtBeginMG"
		},
		491: {
			n: "BrtEndMG"
		},
		492: {
			n: "BrtBeginMap"
		},
		493: {
			n: "BrtEndMap"
		},
		494: {
			n: "BrtHLink",
			f: Pu
		},
		495: {
			n: "BrtBeginDCon"
		},
		496: {
			n: "BrtEndDCon"
		},
		497: {
			n: "BrtBeginDRefs"
		},
		498: {
			n: "BrtEndDRefs"
		},
		499: {
			n: "BrtDRef"
		},
		500: {
			n: "BrtBeginScenMan"
		},
		501: {
			n: "BrtEndScenMan"
		},
		502: {
			n: "BrtBeginSct"
		},
		503: {
			n: "BrtEndSct"
		},
		504: {
			n: "BrtSlc"
		},
		505: {
			n: "BrtBeginDXFs"
		},
		506: {
			n: "BrtEndDXFs"
		},
		507: {
			n: "BrtDXF"
		},
		508: {
			n: "BrtBeginTableStyles"
		},
		509: {
			n: "BrtEndTableStyles"
		},
		510: {
			n: "BrtBeginTableStyle"
		},
		511: {
			n: "BrtEndTableStyle"
		},
		512: {
			n: "BrtTableStyleElement"
		},
		513: {
			n: "BrtTableStyleClient"
		},
		514: {
			n: "BrtBeginVolDeps"
		},
		515: {
			n: "BrtEndVolDeps"
		},
		516: {
			n: "BrtBeginVolType"
		},
		517: {
			n: "BrtEndVolType"
		},
		518: {
			n: "BrtBeginVolMain"
		},
		519: {
			n: "BrtEndVolMain"
		},
		520: {
			n: "BrtBeginVolTopic"
		},
		521: {
			n: "BrtEndVolTopic"
		},
		522: {
			n: "BrtVolSubtopic"
		},
		523: {
			n: "BrtVolRef"
		},
		524: {
			n: "BrtVolNum"
		},
		525: {
			n: "BrtVolErr"
		},
		526: {
			n: "BrtVolStr"
		},
		527: {
			n: "BrtVolBool"
		},
		528: {
			n: "BrtBeginCalcChain$"
		},
		529: {
			n: "BrtEndCalcChain$"
		},
		530: {
			n: "BrtBeginSortState"
		},
		531: {
			n: "BrtEndSortState"
		},
		532: {
			n: "BrtBeginSortCond"
		},
		533: {
			n: "BrtEndSortCond"
		},
		534: {
			n: "BrtBookProtection"
		},
		535: {
			n: "BrtSheetProtection"
		},
		536: {
			n: "BrtRangeProtection"
		},
		537: {
			n: "BrtPhoneticInfo"
		},
		538: {
			n: "BrtBeginECTxtWiz"
		},
		539: {
			n: "BrtEndECTxtWiz"
		},
		540: {
			n: "BrtBeginECTWFldInfoLst"
		},
		541: {
			n: "BrtEndECTWFldInfoLst"
		},
		542: {
			n: "BrtBeginECTwFldInfo"
		},
		548: {
			n: "BrtFileSharing"
		},
		549: {
			n: "BrtOleSize"
		},
		550: {
			n: "BrtDrawing",
			f: Ot
		},
		551: {
			n: "BrtLegacyDrawing"
		},
		552: {
			n: "BrtLegacyDrawingHF"
		},
		553: {
			n: "BrtWebOpt"
		},
		554: {
			n: "BrtBeginWebPubItems"
		},
		555: {
			n: "BrtEndWebPubItems"
		},
		556: {
			n: "BrtBeginWebPubItem"
		},
		557: {
			n: "BrtEndWebPubItem"
		},
		558: {
			n: "BrtBeginSXCondFmt"
		},
		559: {
			n: "BrtEndSXCondFmt"
		},
		560: {
			n: "BrtBeginSXCondFmts"
		},
		561: {
			n: "BrtEndSXCondFmts"
		},
		562: {
			n: "BrtBkHim"
		},
		564: {
			n: "BrtColor"
		},
		565: {
			n: "BrtBeginIndexedColors"
		},
		566: {
			n: "BrtEndIndexedColors"
		},
		569: {
			n: "BrtBeginMRUColors"
		},
		570: {
			n: "BrtEndMRUColors"
		},
		572: {
			n: "BrtMRUColor"
		},
		573: {
			n: "BrtBeginDVals"
		},
		574: {
			n: "BrtEndDVals"
		},
		577: {
			n: "BrtSupNameStart"
		},
		578: {
			n: "BrtSupNameValueStart"
		},
		579: {
			n: "BrtSupNameValueEnd"
		},
		580: {
			n: "BrtSupNameNum"
		},
		581: {
			n: "BrtSupNameErr"
		},
		582: {
			n: "BrtSupNameSt"
		},
		583: {
			n: "BrtSupNameNil"
		},
		584: {
			n: "BrtSupNameBool"
		},
		585: {
			n: "BrtSupNameFmla"
		},
		586: {
			n: "BrtSupNameBits"
		},
		587: {
			n: "BrtSupNameEnd"
		},
		588: {
			n: "BrtEndSupBook"
		},
		589: {
			n: "BrtCellSmartTagProperty"
		},
		590: {
			n: "BrtBeginCellSmartTag"
		},
		591: {
			n: "BrtEndCellSmartTag"
		},
		592: {
			n: "BrtBeginCellSmartTags"
		},
		593: {
			n: "BrtEndCellSmartTags"
		},
		594: {
			n: "BrtBeginSmartTags"
		},
		595: {
			n: "BrtEndSmartTags"
		},
		596: {
			n: "BrtSmartTagType"
		},
		597: {
			n: "BrtBeginSmartTagTypes"
		},
		598: {
			n: "BrtEndSmartTagTypes"
		},
		599: {
			n: "BrtBeginSXFilters"
		},
		600: {
			n: "BrtEndSXFilters"
		},
		601: {
			n: "BrtBeginSXFILTER"
		},
		602: {
			n: "BrtEndSXFilter"
		},
		603: {
			n: "BrtBeginFills"
		},
		604: {
			n: "BrtEndFills"
		},
		605: {
			n: "BrtBeginCellWatches"
		},
		606: {
			n: "BrtEndCellWatches"
		},
		607: {
			n: "BrtCellWatch"
		},
		608: {
			n: "BrtBeginCRErrs"
		},
		609: {
			n: "BrtEndCRErrs"
		},
		610: {
			n: "BrtCrashRecErr"
		},
		611: {
			n: "BrtBeginFonts"
		},
		612: {
			n: "BrtEndFonts"
		},
		613: {
			n: "BrtBeginBorders"
		},
		614: {
			n: "BrtEndBorders"
		},
		615: {
			n: "BrtBeginFmts"
		},
		616: {
			n: "BrtEndFmts"
		},
		617: {
			n: "BrtBeginCellXFs"
		},
		618: {
			n: "BrtEndCellXFs"
		},
		619: {
			n: "BrtBeginStyles"
		},
		620: {
			n: "BrtEndStyles"
		},
		625: {
			n: "BrtBigName"
		},
		626: {
			n: "BrtBeginCellStyleXFs"
		},
		627: {
			n: "BrtEndCellStyleXFs"
		},
		628: {
			n: "BrtBeginComments"
		},
		629: {
			n: "BrtEndComments"
		},
		630: {
			n: "BrtBeginCommentAuthors"
		},
		631: {
			n: "BrtEndCommentAuthors"
		},
		632: {
			n: "BrtCommentAuthor",
			f: bl
		},
		633: {
			n: "BrtBeginCommentList"
		},
		634: {
			n: "BrtEndCommentList"
		},
		635: {
			n: "BrtBeginComment",
			f: gl
		},
		636: {
			n: "BrtEndComment"
		},
		637: {
			n: "BrtCommentText",
			f: St
		},
		638: {
			n: "BrtBeginOleObjects"
		},
		639: {
			n: "BrtOleObject"
		},
		640: {
			n: "BrtEndOleObjects"
		},
		641: {
			n: "BrtBeginSxrules"
		},
		642: {
			n: "BrtEndSxRules"
		},
		643: {
			n: "BrtBeginActiveXControls"
		},
		644: {
			n: "BrtActiveX"
		},
		645: {
			n: "BrtEndActiveXControls"
		},
		646: {
			n: "BrtBeginPCDSDTCEMembersSortBy"
		},
		648: {
			n: "BrtBeginCellIgnoreECs"
		},
		649: {
			n: "BrtCellIgnoreEC"
		},
		650: {
			n: "BrtEndCellIgnoreECs"
		},
		651: {
			n: "BrtCsProp",
			f: hd
		},
		652: {
			n: "BrtCsPageSetup"
		},
		653: {
			n: "BrtBeginUserCsViews"
		},
		654: {
			n: "BrtEndUserCsViews"
		},
		655: {
			n: "BrtBeginUserCsView"
		},
		656: {
			n: "BrtEndUserCsView"
		},
		657: {
			n: "BrtBeginPcdSFCIEntries"
		},
		658: {
			n: "BrtEndPCDSFCIEntries"
		},
		659: {
			n: "BrtPCDSFCIEntry"
		},
		660: {
			n: "BrtBeginListParts"
		},
		661: {
			n: "BrtListPart"
		},
		662: {
			n: "BrtEndListParts"
		},
		663: {
			n: "BrtSheetCalcProp"
		},
		664: {
			n: "BrtBeginFnGroup"
		},
		665: {
			n: "BrtFnGroup"
		},
		666: {
			n: "BrtEndFnGroup"
		},
		667: {
			n: "BrtSupAddin"
		},
		668: {
			n: "BrtSXTDMPOrder"
		},
		669: {
			n: "BrtCsProtection"
		},
		671: {
			n: "BrtBeginWsSortMap"
		},
		672: {
			n: "BrtEndWsSortMap"
		},
		673: {
			n: "BrtBeginRRSort"
		},
		674: {
			n: "BrtEndRRSort"
		},
		675: {
			n: "BrtRRSortItem"
		},
		676: {
			n: "BrtFileSharingIso"
		},
		677: {
			n: "BrtBookProtectionIso"
		},
		678: {
			n: "BrtSheetProtectionIso"
		},
		679: {
			n: "BrtCsProtectionIso"
		},
		680: {
			n: "BrtRangeProtectionIso"
		},
		1024: {
			n: "BrtRwDescent"
		},
		1025: {
			n: "BrtKnownFonts"
		},
		1026: {
			n: "BrtBeginSXTupleSet"
		},
		1027: {
			n: "BrtEndSXTupleSet"
		},
		1028: {
			n: "BrtBeginSXTupleSetHeader"
		},
		1029: {
			n: "BrtEndSXTupleSetHeader"
		},
		1030: {
			n: "BrtSXTupleSetHeaderItem"
		},
		1031: {
			n: "BrtBeginSXTupleSetData"
		},
		1032: {
			n: "BrtEndSXTupleSetData"
		},
		1033: {
			n: "BrtBeginSXTupleSetRow"
		},
		1034: {
			n: "BrtEndSXTupleSetRow"
		},
		1035: {
			n: "BrtSXTupleSetRowItem"
		},
		1036: {
			n: "BrtNameExt"
		},
		1037: {
			n: "BrtPCDH14"
		},
		1038: {
			n: "BrtBeginPCDCalcMem14"
		},
		1039: {
			n: "BrtEndPCDCalcMem14"
		},
		1040: {
			n: "BrtSXTH14"
		},
		1041: {
			n: "BrtBeginSparklineGroup"
		},
		1042: {
			n: "BrtEndSparklineGroup"
		},
		1043: {
			n: "BrtSparkline"
		},
		1044: {
			n: "BrtSXDI14"
		},
		1045: {
			n: "BrtWsFmtInfoEx14"
		},
		1046: {
			n: "BrtBeginConditionalFormatting14"
		},
		1047: {
			n: "BrtEndConditionalFormatting14"
		},
		1048: {
			n: "BrtBeginCFRule14"
		},
		1049: {
			n: "BrtEndCFRule14"
		},
		1050: {
			n: "BrtCFVO14"
		},
		1051: {
			n: "BrtBeginDatabar14"
		},
		1052: {
			n: "BrtBeginIconSet14"
		},
		1053: {
			n: "BrtDVal14"
		},
		1054: {
			n: "BrtBeginDVals14"
		},
		1055: {
			n: "BrtColor14"
		},
		1056: {
			n: "BrtBeginSparklines"
		},
		1057: {
			n: "BrtEndSparklines"
		},
		1058: {
			n: "BrtBeginSparklineGroups"
		},
		1059: {
			n: "BrtEndSparklineGroups"
		},
		1061: {
			n: "BrtSXVD14"
		},
		1062: {
			n: "BrtBeginSXView14"
		},
		1063: {
			n: "BrtEndSXView14"
		},
		1064: {
			n: "BrtBeginSXView16"
		},
		1065: {
			n: "BrtEndSXView16"
		},
		1066: {
			n: "BrtBeginPCD14"
		},
		1067: {
			n: "BrtEndPCD14"
		},
		1068: {
			n: "BrtBeginExtConn14"
		},
		1069: {
			n: "BrtEndExtConn14"
		},
		1070: {
			n: "BrtBeginSlicerCacheIDs"
		},
		1071: {
			n: "BrtEndSlicerCacheIDs"
		},
		1072: {
			n: "BrtBeginSlicerCacheID"
		},
		1073: {
			n: "BrtEndSlicerCacheID"
		},
		1075: {
			n: "BrtBeginSlicerCache"
		},
		1076: {
			n: "BrtEndSlicerCache"
		},
		1077: {
			n: "BrtBeginSlicerCacheDef"
		},
		1078: {
			n: "BrtEndSlicerCacheDef"
		},
		1079: {
			n: "BrtBeginSlicersEx"
		},
		1080: {
			n: "BrtEndSlicersEx"
		},
		1081: {
			n: "BrtBeginSlicerEx"
		},
		1082: {
			n: "BrtEndSlicerEx"
		},
		1083: {
			n: "BrtBeginSlicer"
		},
		1084: {
			n: "BrtEndSlicer"
		},
		1085: {
			n: "BrtSlicerCachePivotTables"
		},
		1086: {
			n: "BrtBeginSlicerCacheOlapImpl"
		},
		1087: {
			n: "BrtEndSlicerCacheOlapImpl"
		},
		1088: {
			n: "BrtBeginSlicerCacheLevelsData"
		},
		1089: {
			n: "BrtEndSlicerCacheLevelsData"
		},
		1090: {
			n: "BrtBeginSlicerCacheLevelData"
		},
		1091: {
			n: "BrtEndSlicerCacheLevelData"
		},
		1092: {
			n: "BrtBeginSlicerCacheSiRanges"
		},
		1093: {
			n: "BrtEndSlicerCacheSiRanges"
		},
		1094: {
			n: "BrtBeginSlicerCacheSiRange"
		},
		1095: {
			n: "BrtEndSlicerCacheSiRange"
		},
		1096: {
			n: "BrtSlicerCacheOlapItem"
		},
		1097: {
			n: "BrtBeginSlicerCacheSelections"
		},
		1098: {
			n: "BrtSlicerCacheSelection"
		},
		1099: {
			n: "BrtEndSlicerCacheSelections"
		},
		1100: {
			n: "BrtBeginSlicerCacheNative"
		},
		1101: {
			n: "BrtEndSlicerCacheNative"
		},
		1102: {
			n: "BrtSlicerCacheNativeItem"
		},
		1103: {
			n: "BrtRangeProtection14"
		},
		1104: {
			n: "BrtRangeProtectionIso14"
		},
		1105: {
			n: "BrtCellIgnoreEC14"
		},
		1111: {
			n: "BrtList14"
		},
		1112: {
			n: "BrtCFIcon"
		},
		1113: {
			n: "BrtBeginSlicerCachesPivotCacheIDs"
		},
		1114: {
			n: "BrtEndSlicerCachesPivotCacheIDs"
		},
		1115: {
			n: "BrtBeginSlicers"
		},
		1116: {
			n: "BrtEndSlicers"
		},
		1117: {
			n: "BrtWbProp14"
		},
		1118: {
			n: "BrtBeginSXEdit"
		},
		1119: {
			n: "BrtEndSXEdit"
		},
		1120: {
			n: "BrtBeginSXEdits"
		},
		1121: {
			n: "BrtEndSXEdits"
		},
		1122: {
			n: "BrtBeginSXChange"
		},
		1123: {
			n: "BrtEndSXChange"
		},
		1124: {
			n: "BrtBeginSXChanges"
		},
		1125: {
			n: "BrtEndSXChanges"
		},
		1126: {
			n: "BrtSXTupleItems"
		},
		1128: {
			n: "BrtBeginSlicerStyle"
		},
		1129: {
			n: "BrtEndSlicerStyle"
		},
		1130: {
			n: "BrtSlicerStyleElement"
		},
		1131: {
			n: "BrtBeginStyleSheetExt14"
		},
		1132: {
			n: "BrtEndStyleSheetExt14"
		},
		1133: {
			n: "BrtBeginSlicerCachesPivotCacheID"
		},
		1134: {
			n: "BrtEndSlicerCachesPivotCacheID"
		},
		1135: {
			n: "BrtBeginConditionalFormattings"
		},
		1136: {
			n: "BrtEndConditionalFormattings"
		},
		1137: {
			n: "BrtBeginPCDCalcMemExt"
		},
		1138: {
			n: "BrtEndPCDCalcMemExt"
		},
		1139: {
			n: "BrtBeginPCDCalcMemsExt"
		},
		1140: {
			n: "BrtEndPCDCalcMemsExt"
		},
		1141: {
			n: "BrtPCDField14"
		},
		1142: {
			n: "BrtBeginSlicerStyles"
		},
		1143: {
			n: "BrtEndSlicerStyles"
		},
		1144: {
			n: "BrtBeginSlicerStyleElements"
		},
		1145: {
			n: "BrtEndSlicerStyleElements"
		},
		1146: {
			n: "BrtCFRuleExt"
		},
		1147: {
			n: "BrtBeginSXCondFmt14"
		},
		1148: {
			n: "BrtEndSXCondFmt14"
		},
		1149: {
			n: "BrtBeginSXCondFmts14"
		},
		1150: {
			n: "BrtEndSXCondFmts14"
		},
		1152: {
			n: "BrtBeginSortCond14"
		},
		1153: {
			n: "BrtEndSortCond14"
		},
		1154: {
			n: "BrtEndDVals14"
		},
		1155: {
			n: "BrtEndIconSet14"
		},
		1156: {
			n: "BrtEndDatabar14"
		},
		1157: {
			n: "BrtBeginColorScale14"
		},
		1158: {
			n: "BrtEndColorScale14"
		},
		1159: {
			n: "BrtBeginSxrules14"
		},
		1160: {
			n: "BrtEndSxrules14"
		},
		1161: {
			n: "BrtBeginPRule14"
		},
		1162: {
			n: "BrtEndPRule14"
		},
		1163: {
			n: "BrtBeginPRFilters14"
		},
		1164: {
			n: "BrtEndPRFilters14"
		},
		1165: {
			n: "BrtBeginPRFilter14"
		},
		1166: {
			n: "BrtEndPRFilter14"
		},
		1167: {
			n: "BrtBeginPRFItem14"
		},
		1168: {
			n: "BrtEndPRFItem14"
		},
		1169: {
			n: "BrtBeginCellIgnoreECs14"
		},
		1170: {
			n: "BrtEndCellIgnoreECs14"
		},
		1171: {
			n: "BrtDxf14"
		},
		1172: {
			n: "BrtBeginDxF14s"
		},
		1173: {
			n: "BrtEndDxf14s"
		},
		1177: {
			n: "BrtFilter14"
		},
		1178: {
			n: "BrtBeginCustomFilters14"
		},
		1180: {
			n: "BrtCustomFilter14"
		},
		1181: {
			n: "BrtIconFilter14"
		},
		1182: {
			n: "BrtPivotCacheConnectionName"
		},
		2048: {
			n: "BrtBeginDecoupledPivotCacheIDs"
		},
		2049: {
			n: "BrtEndDecoupledPivotCacheIDs"
		},
		2050: {
			n: "BrtDecoupledPivotCacheID"
		},
		2051: {
			n: "BrtBeginPivotTableRefs"
		},
		2052: {
			n: "BrtEndPivotTableRefs"
		},
		2053: {
			n: "BrtPivotTableRef"
		},
		2054: {
			n: "BrtSlicerCacheBookPivotTables"
		},
		2055: {
			n: "BrtBeginSxvcells"
		},
		2056: {
			n: "BrtEndSxvcells"
		},
		2057: {
			n: "BrtBeginSxRow"
		},
		2058: {
			n: "BrtEndSxRow"
		},
		2060: {
			n: "BrtPcdCalcMem15"
		},
		2067: {
			n: "BrtQsi15"
		},
		2068: {
			n: "BrtBeginWebExtensions"
		},
		2069: {
			n: "BrtEndWebExtensions"
		},
		2070: {
			n: "BrtWebExtension"
		},
		2071: {
			n: "BrtAbsPath15"
		},
		2072: {
			n: "BrtBeginPivotTableUISettings"
		},
		2073: {
			n: "BrtEndPivotTableUISettings"
		},
		2075: {
			n: "BrtTableSlicerCacheIDs"
		},
		2076: {
			n: "BrtTableSlicerCacheID"
		},
		2077: {
			n: "BrtBeginTableSlicerCache"
		},
		2078: {
			n: "BrtEndTableSlicerCache"
		},
		2079: {
			n: "BrtSxFilter15"
		},
		2080: {
			n: "BrtBeginTimelineCachePivotCacheIDs"
		},
		2081: {
			n: "BrtEndTimelineCachePivotCacheIDs"
		},
		2082: {
			n: "BrtTimelineCachePivotCacheID"
		},
		2083: {
			n: "BrtBeginTimelineCacheIDs"
		},
		2084: {
			n: "BrtEndTimelineCacheIDs"
		},
		2085: {
			n: "BrtBeginTimelineCacheID"
		},
		2086: {
			n: "BrtEndTimelineCacheID"
		},
		2087: {
			n: "BrtBeginTimelinesEx"
		},
		2088: {
			n: "BrtEndTimelinesEx"
		},
		2089: {
			n: "BrtBeginTimelineEx"
		},
		2090: {
			n: "BrtEndTimelineEx"
		},
		2091: {
			n: "BrtWorkBookPr15"
		},
		2092: {
			n: "BrtPCDH15"
		},
		2093: {
			n: "BrtBeginTimelineStyle"
		},
		2094: {
			n: "BrtEndTimelineStyle"
		},
		2095: {
			n: "BrtTimelineStyleElement"
		},
		2096: {
			n: "BrtBeginTimelineStylesheetExt15"
		},
		2097: {
			n: "BrtEndTimelineStylesheetExt15"
		},
		2098: {
			n: "BrtBeginTimelineStyles"
		},
		2099: {
			n: "BrtEndTimelineStyles"
		},
		2100: {
			n: "BrtBeginTimelineStyleElements"
		},
		2101: {
			n: "BrtEndTimelineStyleElements"
		},
		2102: {
			n: "BrtDxf15"
		},
		2103: {
			n: "BrtBeginDxfs15"
		},
		2104: {
			n: "brtEndDxfs15"
		},
		2105: {
			n: "BrtSlicerCacheHideItemsWithNoData"
		},
		2106: {
			n: "BrtBeginItemUniqueNames"
		},
		2107: {
			n: "BrtEndItemUniqueNames"
		},
		2108: {
			n: "BrtItemUniqueName"
		},
		2109: {
			n: "BrtBeginExtConn15"
		},
		2110: {
			n: "BrtEndExtConn15"
		},
		2111: {
			n: "BrtBeginOledbPr15"
		},
		2112: {
			n: "BrtEndOledbPr15"
		},
		2113: {
			n: "BrtBeginDataFeedPr15"
		},
		2114: {
			n: "BrtEndDataFeedPr15"
		},
		2115: {
			n: "BrtTextPr15"
		},
		2116: {
			n: "BrtRangePr15"
		},
		2117: {
			n: "BrtDbCommand15"
		},
		2118: {
			n: "BrtBeginDbTables15"
		},
		2119: {
			n: "BrtEndDbTables15"
		},
		2120: {
			n: "BrtDbTable15"
		},
		2121: {
			n: "BrtBeginDataModel"
		},
		2122: {
			n: "BrtEndDataModel"
		},
		2123: {
			n: "BrtBeginModelTables"
		},
		2124: {
			n: "BrtEndModelTables"
		},
		2125: {
			n: "BrtModelTable"
		},
		2126: {
			n: "BrtBeginModelRelationships"
		},
		2127: {
			n: "BrtEndModelRelationships"
		},
		2128: {
			n: "BrtModelRelationship"
		},
		2129: {
			n: "BrtBeginECTxtWiz15"
		},
		2130: {
			n: "BrtEndECTxtWiz15"
		},
		2131: {
			n: "BrtBeginECTWFldInfoLst15"
		},
		2132: {
			n: "BrtEndECTWFldInfoLst15"
		},
		2133: {
			n: "BrtBeginECTWFldInfo15"
		},
		2134: {
			n: "BrtFieldListActiveItem"
		},
		2135: {
			n: "BrtPivotCacheIdVersion"
		},
		2136: {
			n: "BrtSXDI15"
		},
		2137: {
			n: "BrtBeginModelTimeGroupings"
		},
		2138: {
			n: "BrtEndModelTimeGroupings"
		},
		2139: {
			n: "BrtBeginModelTimeGrouping"
		},
		2140: {
			n: "BrtEndModelTimeGrouping"
		},
		2141: {
			n: "BrtModelTimeGroupingCalcCol"
		},
		3073: {
			n: "BrtRevisionPtr"
		},
		65535: {
			n: ""
		}
	};
	var Vp = X(Wp, "n");
	var zp = {
		3: {
			n: "BIFF2NUM",
			f: Os
		},
		4: {
			n: "BIFF2STR",
			f: Rs
		},
		6: {
			n: "Formula",
			f: hh
		},
		9: {
			n: "BOF",
			f: li
		},
		10: {
			n: "EOF",
			f: wn
		},
		12: {
			n: "CalcCount",
			f: Bn
		},
		13: {
			n: "CalcMode",
			f: Bn
		},
		14: {
			n: "CalcPrecision",
			f: An
		},
		15: {
			n: "CalcRefMode",
			f: An
		},
		16: {
			n: "CalcDelta",
			f: Ht
		},
		17: {
			n: "CalcIter",
			f: An
		},
		18: {
			n: "Protect",
			f: An
		},
		19: {
			n: "Password",
			f: Bn
		},
		20: {
			n: "Header",
			f: $i
		},
		21: {
			n: "Footer",
			f: $i
		},
		23: {
			n: "ExternSheet",
			f: es
		},
		24: {
			n: "Lbl",
			f: qi
		},
		25: {
			n: "WinProtect",
			f: An
		},
		26: {
			n: "VerticalPageBreaks"
		},
		27: {
			n: "HorizontalPageBreaks"
		},
		28: {
			n: "Note",
			f: fs
		},
		29: {
			n: "Selection"
		},
		34: {
			n: "Date1904",
			f: An
		},
		35: {
			n: "ExternName",
			f: Qi
		},
		38: {
			n: "LeftMargin",
			f: Ht
		},
		39: {
			n: "RightMargin",
			f: Ht
		},
		40: {
			n: "TopMargin",
			f: Ht
		},
		41: {
			n: "BottomMargin",
			f: Ht
		},
		42: {
			n: "PrintRowCol",
			f: An
		},
		43: {
			n: "PrintGrid",
			f: An
		},
		47: {
			n: "FilePass",
			f: Rf
		},
		49: {
			n: "Font",
			f: Ti
		},
		51: {
			n: "PrintSize",
			f: Bn
		},
		60: {
			n: "Continue"
		},
		61: {
			n: "Window1",
			f: Si
		},
		64: {
			n: "Backup",
			f: An
		},
		65: {
			n: "Pane"
		},
		66: {
			n: "CodePage",
			f: Bn
		},
		77: {
			n: "Pls"
		},
		80: {
			n: "DCon"
		},
		81: {
			n: "DConRef"
		},
		82: {
			n: "DConName"
		},
		85: {
			n: "DefColWidth",
			f: Bn
		},
		89: {
			n: "XCT"
		},
		90: {
			n: "CRN"
		},
		91: {
			n: "FileSharing"
		},
		92: {
			n: "WriteAccess",
			f: ui
		},
		93: {
			n: "Obj",
			f: cs
		},
		94: {
			n: "Uncalced"
		},
		95: {
			n: "CalcSaveRecalc",
			f: An
		},
		96: {
			n: "Template"
		},
		97: {
			n: "Intl"
		},
		99: {
			n: "ObjProtect",
			f: An
		},
		125: {
			n: "ColInfo",
			f: Ss
		},
		128: {
			n: "Guts",
			f: zi
		},
		129: {
			n: "WsBool",
			f: pi
		},
		130: {
			n: "GridSet",
			f: Bn
		},
		131: {
			n: "HCenter",
			f: An
		},
		132: {
			n: "VCenter",
			f: An
		},
		133: {
			n: "BoundSheet8",
			f: vi
		},
		134: {
			n: "WriteProtect"
		},
		140: {
			n: "Country",
			f: bs
		},
		141: {
			n: "HideObj",
			f: Bn
		},
		144: {
			n: "Sort"
		},
		146: {
			n: "Palette",
			f: ws
		},
		151: {
			n: "Sync"
		},
		152: {
			n: "LPr"
		},
		153: {
			n: "DxGCol"
		},
		154: {
			n: "FnGroupName"
		},
		155: {
			n: "FilterMode"
		},
		156: {
			n: "BuiltInFnGroupCount",
			f: Bn
		},
		157: {
			n: "AutoFilterInfo"
		},
		158: {
			n: "AutoFilter"
		},
		160: {
			n: "Scl",
			f: xs
		},
		161: {
			n: "Setup",
			f: As
		},
		174: {
			n: "ScenMan"
		},
		175: {
			n: "SCENARIO"
		},
		176: {
			n: "SxView"
		},
		177: {
			n: "Sxvd"
		},
		178: {
			n: "SXVI"
		},
		180: {
			n: "SxIvd"
		},
		181: {
			n: "SXLI"
		},
		182: {
			n: "SXPI"
		},
		184: {
			n: "DocRoute"
		},
		185: {
			n: "RecipName"
		},
		189: {
			n: "MulRk",
			f: Mi
		},
		190: {
			n: "MulBlank",
			f: Ui
		},
		193: {
			n: "Mms",
			f: wn
		},
		197: {
			n: "SXDI"
		},
		198: {
			n: "SXDB"
		},
		199: {
			n: "SXFDB"
		},
		200: {
			n: "SXDBB"
		},
		201: {
			n: "SXNum"
		},
		202: {
			n: "SxBool",
			f: An
		},
		203: {
			n: "SxErr"
		},
		204: {
			n: "SXInt"
		},
		205: {
			n: "SXString"
		},
		206: {
			n: "SXDtr"
		},
		207: {
			n: "SxNil"
		},
		208: {
			n: "SXTbl"
		},
		209: {
			n: "SXTBRGIITM"
		},
		210: {
			n: "SxTbpg"
		},
		211: {
			n: "ObProj"
		},
		213: {
			n: "SXStreamID"
		},
		215: {
			n: "DBCell"
		},
		216: {
			n: "SXRng"
		},
		217: {
			n: "SxIsxoper"
		},
		218: {
			n: "BookBool",
			f: Bn
		},
		220: {
			n: "DbOrParamQry"
		},
		221: {
			n: "ScenarioProtect",
			f: An
		},
		222: {
			n: "OleObjectSize"
		},
		224: {
			n: "XF",
			f: Wi
		},
		225: {
			n: "InterfaceHdr",
			f: hi
		},
		226: {
			n: "InterfaceEnd",
			f: wn
		},
		227: {
			n: "SXVS"
		},
		229: {
			n: "MergeCells",
			f: os
		},
		233: {
			n: "BkHim"
		},
		235: {
			n: "MsoDrawingGroup"
		},
		236: {
			n: "MsoDrawing"
		},
		237: {
			n: "MsoDrawingSelection"
		},
		239: {
			n: "PhoneticInfo"
		},
		240: {
			n: "SxRule"
		},
		241: {
			n: "SXEx"
		},
		242: {
			n: "SxFilt"
		},
		244: {
			n: "SxDXF"
		},
		245: {
			n: "SxItm"
		},
		246: {
			n: "SxName"
		},
		247: {
			n: "SxSelect"
		},
		248: {
			n: "SXPair"
		},
		249: {
			n: "SxFmla"
		},
		251: {
			n: "SxFormat"
		},
		252: {
			n: "SST",
			f: mi
		},
		253: {
			n: "LabelSst",
			f: yi
		},
		255: {
			n: "ExtSST",
			f: bi
		},
		256: {
			n: "SXVDEx"
		},
		259: {
			n: "SXFormula"
		},
		290: {
			n: "SXDBEx"
		},
		311: {
			n: "RRDInsDel"
		},
		312: {
			n: "RRDHead"
		},
		315: {
			n: "RRDChgCell"
		},
		317: {
			n: "RRTabId",
			f: xn
		},
		318: {
			n: "RRDRenSheet"
		},
		319: {
			n: "RRSort"
		},
		320: {
			n: "RRDMove"
		},
		330: {
			n: "RRFormat"
		},
		331: {
			n: "RRAutoFmt"
		},
		333: {
			n: "RRInsertSh"
		},
		334: {
			n: "RRDMoveBegin"
		},
		335: {
			n: "RRDMoveEnd"
		},
		336: {
			n: "RRDInsDelBegin"
		},
		337: {
			n: "RRDInsDelEnd"
		},
		338: {
			n: "RRDConflict"
		},
		339: {
			n: "RRDDefName"
		},
		340: {
			n: "RRDRstEtxp"
		},
		351: {
			n: "LRng"
		},
		352: {
			n: "UsesELFs",
			f: An
		},
		353: {
			n: "DSF",
			f: wn
		},
		401: {
			n: "CUsr"
		},
		402: {
			n: "CbUsr"
		},
		403: {
			n: "UsrInfo"
		},
		404: {
			n: "UsrExcl"
		},
		405: {
			n: "FileLock"
		},
		406: {
			n: "RRDInfo"
		},
		407: {
			n: "BCUsrs"
		},
		408: {
			n: "UsrChk"
		},
		425: {
			n: "UserBView"
		},
		426: {
			n: "UserSViewBegin"
		},
		427: {
			n: "UserSViewEnd"
		},
		428: {
			n: "RRDUserView"
		},
		429: {
			n: "Qsi"
		},
		430: {
			n: "SupBook",
			f: Zi
		},
		431: {
			n: "Prot4Rev",
			f: An
		},
		432: {
			n: "CondFmt"
		},
		433: {
			n: "CF"
		},
		434: {
			n: "DVal"
		},
		437: {
			n: "DConBin"
		},
		438: {
			n: "TxO",
			f: ds
		},
		439: {
			n: "RefreshAll",
			f: An
		},
		440: {
			n: "HLink",
			f: ps
		},
		441: {
			n: "Lel"
		},
		442: {
			n: "CodeName",
			f: Fn
		},
		443: {
			n: "SXFDBType"
		},
		444: {
			n: "Prot4RevPass",
			f: Bn
		},
		445: {
			n: "ObNoMacros"
		},
		446: {
			n: "Dv"
		},
		448: {
			n: "Excel9File",
			f: wn
		},
		449: {
			n: "RecalcId",
			f: wi,
			r: 2
		},
		450: {
			n: "EntExU2",
			f: wn
		},
		512: {
			n: "Dimensions",
			f: Pi
		},
		513: {
			n: "Blank",
			f: Ts
		},
		515: {
			n: "Number",
			f: Ki
		},
		516: {
			n: "Label",
			f: Ii
		},
		517: {
			n: "BoolErr",
			f: Gi
		},
		518: {
			n: "Formula",
			f: hh
		},
		519: {
			n: "String",
			f: ys
		},
		520: {
			n: "Row",
			f: Ci
		},
		523: {
			n: "Index"
		},
		545: {
			n: "Array",
			f: ns
		},
		549: {
			n: "DefaultRowHeight",
			f: ki
		},
		566: {
			n: "Table"
		},
		574: {
			n: "Window2",
			f: _i
		},
		638: {
			n: "RK",
			f: Li
		},
		659: {
			n: "Style"
		},
		1030: {
			n: "Formula",
			f: hh
		},
		1048: {
			n: "BigName"
		},
		1054: {
			n: "Format",
			f: Oi
		},
		1084: {
			n: "ContinueBigName"
		},
		1212: {
			n: "ShrFmla",
			f: as
		},
		2048: {
			n: "HLinkTooltip",
			f: gs
		},
		2049: {
			n: "WebPub"
		},
		2050: {
			n: "QsiSXTag"
		},
		2051: {
			n: "DBQueryExt"
		},
		2052: {
			n: "ExtString"
		},
		2053: {
			n: "TxtQry"
		},
		2054: {
			n: "Qsir"
		},
		2055: {
			n: "Qsif"
		},
		2056: {
			n: "RRDTQSIF"
		},
		2057: {
			n: "BOF",
			f: li
		},
		2058: {
			n: "OleDbConn"
		},
		2059: {
			n: "WOpt"
		},
		2060: {
			n: "SXViewEx"
		},
		2061: {
			n: "SXTH"
		},
		2062: {
			n: "SXPIEx"
		},
		2063: {
			n: "SXVDTEx"
		},
		2064: {
			n: "SXViewEx9"
		},
		2066: {
			n: "ContinueFrt"
		},
		2067: {
			n: "RealTimeData"
		},
		2128: {
			n: "ChartFrtInfo"
		},
		2129: {
			n: "FrtWrapper"
		},
		2130: {
			n: "StartBlock"
		},
		2131: {
			n: "EndBlock"
		},
		2132: {
			n: "StartObject"
		},
		2133: {
			n: "EndObject"
		},
		2134: {
			n: "CatLab"
		},
		2135: {
			n: "YMult"
		},
		2136: {
			n: "SXViewLink"
		},
		2137: {
			n: "PivotChartBits"
		},
		2138: {
			n: "FrtFontList"
		},
		2146: {
			n: "SheetExt"
		},
		2147: {
			n: "BookExt",
			r: 12
		},
		2148: {
			n: "SXAddl"
		},
		2149: {
			n: "CrErr"
		},
		2150: {
			n: "HFPicture"
		},
		2151: {
			n: "FeatHdr",
			f: wn
		},
		2152: {
			n: "Feat"
		},
		2154: {
			n: "DataLabExt"
		},
		2155: {
			n: "DataLabExtContents"
		},
		2156: {
			n: "CellWatch"
		},
		2161: {
			n: "FeatHdr11"
		},
		2162: {
			n: "Feature11"
		},
		2164: {
			n: "DropDownObjIds"
		},
		2165: {
			n: "ContinueFrt11"
		},
		2166: {
			n: "DConn"
		},
		2167: {
			n: "List12"
		},
		2168: {
			n: "Feature12"
		},
		2169: {
			n: "CondFmt12"
		},
		2170: {
			n: "CF12"
		},
		2171: {
			n: "CFEx"
		},
		2172: {
			n: "XFCRC",
			f: ks,
			r: 12
		},
		2173: {
			n: "XFExt",
			f: rl,
			r: 12
		},
		2174: {
			n: "AutoFilter12"
		},
		2175: {
			n: "ContinueFrt12"
		},
		2180: {
			n: "MDTInfo"
		},
		2181: {
			n: "MDXStr"
		},
		2182: {
			n: "MDXTuple"
		},
		2183: {
			n: "MDXSet"
		},
		2184: {
			n: "MDXProp"
		},
		2185: {
			n: "MDXKPI"
		},
		2186: {
			n: "MDB"
		},
		2187: {
			n: "PLV"
		},
		2188: {
			n: "Compat12",
			f: An,
			r: 12
		},
		2189: {
			n: "DXF"
		},
		2190: {
			n: "TableStyles",
			r: 12
		},
		2191: {
			n: "TableStyle"
		},
		2192: {
			n: "TableStyleElement"
		},
		2194: {
			n: "StyleExt"
		},
		2195: {
			n: "NamePublish"
		},
		2196: {
			n: "NameCmt",
			f: ts,
			r: 12
		},
		2197: {
			n: "SortData"
		},
		2198: {
			n: "Theme",
			f: $o,
			r: 12
		},
		2199: {
			n: "GUIDTypeLib"
		},
		2200: {
			n: "FnGrp12"
		},
		2201: {
			n: "NameFnGrp12"
		},
		2202: {
			n: "MTRSettings",
			f: is,
			r: 12
		},
		2203: {
			n: "CompressPictures",
			f: wn
		},
		2204: {
			n: "HeaderFooter"
		},
		2205: {
			n: "CrtLayout12"
		},
		2206: {
			n: "CrtMlFrt"
		},
		2207: {
			n: "CrtMlFrtContinue"
		},
		2211: {
			n: "ForceFullCalculation",
			f: Ei
		},
		2212: {
			n: "ShapePropsStream"
		},
		2213: {
			n: "TextPropsStream"
		},
		2214: {
			n: "RichTextStream"
		},
		2215: {
			n: "CrtLayout12A"
		},
		4097: {
			n: "Units"
		},
		4098: {
			n: "Chart"
		},
		4099: {
			n: "Series"
		},
		4102: {
			n: "DataFormat"
		},
		4103: {
			n: "LineFormat"
		},
		4105: {
			n: "MarkerFormat"
		},
		4106: {
			n: "AreaFormat"
		},
		4107: {
			n: "PieFormat"
		},
		4108: {
			n: "AttachedLabel"
		},
		4109: {
			n: "SeriesText"
		},
		4116: {
			n: "ChartFormat"
		},
		4117: {
			n: "Legend"
		},
		4118: {
			n: "SeriesList"
		},
		4119: {
			n: "Bar"
		},
		4120: {
			n: "Line"
		},
		4121: {
			n: "Pie"
		},
		4122: {
			n: "Area"
		},
		4123: {
			n: "Scatter"
		},
		4124: {
			n: "CrtLine"
		},
		4125: {
			n: "Axis"
		},
		4126: {
			n: "Tick"
		},
		4127: {
			n: "ValueRange"
		},
		4128: {
			n: "CatSerRange"
		},
		4129: {
			n: "AxisLine"
		},
		4130: {
			n: "CrtLink"
		},
		4132: {
			n: "DefaultText"
		},
		4133: {
			n: "Text"
		},
		4134: {
			n: "FontX",
			f: Bn
		},
		4135: {
			n: "ObjectLink"
		},
		4146: {
			n: "Frame"
		},
		4147: {
			n: "Begin"
		},
		4148: {
			n: "End"
		},
		4149: {
			n: "PlotArea"
		},
		4154: {
			n: "Chart3d"
		},
		4156: {
			n: "PicF"
		},
		4157: {
			n: "DropBar"
		},
		4158: {
			n: "Radar"
		},
		4159: {
			n: "Surf"
		},
		4160: {
			n: "RadarArea"
		},
		4161: {
			n: "AxisParent"
		},
		4163: {
			n: "LegendException"
		},
		4164: {
			n: "ShtProps",
			f: _s
		},
		4165: {
			n: "SerToCrt"
		},
		4166: {
			n: "AxesUsed"
		},
		4168: {
			n: "SBaseRef"
		},
		4170: {
			n: "SerParent"
		},
		4171: {
			n: "SerAuxTrend"
		},
		4174: {
			n: "IFmtRecord"
		},
		4175: {
			n: "Pos"
		},
		4176: {
			n: "AlRuns"
		},
		4177: {
			n: "BRAI"
		},
		4187: {
			n: "SerAuxErrBar"
		},
		4188: {
			n: "ClrtClient",
			f: Es
		},
		4189: {
			n: "SerFmt"
		},
		4191: {
			n: "Chart3DBarShape"
		},
		4192: {
			n: "Fbi"
		},
		4193: {
			n: "BopPop"
		},
		4194: {
			n: "AxcExt"
		},
		4195: {
			n: "Dat"
		},
		4196: {
			n: "PlotGrowth"
		},
		4197: {
			n: "SIIndex"
		},
		4198: {
			n: "GelFrame"
		},
		4199: {
			n: "BopPopCustom"
		},
		4200: {
			n: "Fbi2"
		},
		0: {
			n: "Dimensions",
			f: Pi
		},
		2: {
			n: "BIFF2INT",
			f: Fs
		},
		5: {
			n: "BoolErr",
			f: Gi
		},
		7: {
			n: "String",
			f: Ns
		},
		8: {
			n: "BIFF2ROW"
		},
		11: {
			n: "Index"
		},
		22: {
			n: "ExternCount",
			f: Bn
		},
		30: {
			n: "BIFF2FORMAT",
			f: Fi
		},
		31: {
			n: "BIFF2FMTCNT"
		},
		32: {
			n: "BIFF2COLINFO"
		},
		33: {
			n: "Array",
			f: ns
		},
		37: {
			n: "DefaultRowHeight",
			f: ki
		},
		50: {
			n: "BIFF2FONTXTRA",
			f: Ls
		},
		52: {
			n: "DDEObjName"
		},
		62: {
			n: "BIFF2WINDOW2"
		},
		67: {
			n: "BIFF2XF"
		},
		69: {
			n: "BIFF2FONTCLR"
		},
		86: {
			n: "BIFF4FMTCNT"
		},
		126: {
			n: "RK"
		},
		127: {
			n: "ImData",
			f: Is
		},
		135: {
			n: "Addin"
		},
		136: {
			n: "Edg"
		},
		137: {
			n: "Pub"
		},
		145: {
			n: "Sub"
		},
		148: {
			n: "LHRecord"
		},
		149: {
			n: "LHNGraph"
		},
		150: {
			n: "Sound"
		},
		169: {
			n: "CoordList"
		},
		171: {
			n: "GCW"
		},
		188: {
			n: "ShrFmla"
		},
		191: {
			n: "ToolbarHdr"
		},
		192: {
			n: "ToolbarEnd"
		},
		194: {
			n: "AddMenu"
		},
		195: {
			n: "DelMenu"
		},
		214: {
			n: "RString",
			f: Ms
		},
		223: {
			n: "UDDesc"
		},
		234: {
			n: "TabIdConf"
		},
		354: {
			n: "XL5Modify"
		},
		421: {
			n: "FileSharing2"
		},
		521: {
			n: "BOF",
			f: li
		},
		536: {
			n: "Lbl",
			f: qi
		},
		547: {
			n: "ExternName",
			f: Qi
		},
		561: {
			n: "Font"
		},
		579: {
			n: "BIFF3XF"
		},
		1033: {
			n: "BOF",
			f: li
		},
		1091: {
			n: "BIFF4XF"
		},
		2157: {
			n: "FeatInfo"
		},
		2163: {
			n: "FeatInfo11"
		},
		2177: {
			n: "SXAddl12"
		},
		2240: {
			n: "AutoWebPub"
		},
		2241: {
			n: "ListObj"
		},
		2242: {
			n: "ListField"
		},
		2243: {
			n: "ListDV"
		},
		2244: {
			n: "ListCondFmt"
		},
		2245: {
			n: "ListCF"
		},
		2246: {
			n: "FMQry"
		},
		2247: {
			n: "FMSQry"
		},
		2248: {
			n: "PLV"
		},
		2249: {
			n: "LnExt"
		},
		2250: {
			n: "MkrExt"
		},
		2251: {
			n: "CrtCoopt"
		},
		2262: {
			n: "FRTArchId$",
			r: 12
		},
		29282: {}
	};
	var Xp = X(zp, "n");

	function Gp(e, r, t, a) {
		var n = +r || +Xp[r];
		if (isNaN(n)) return;
		var i = a || (t || []).length || 0;
		var s = e.next(4);
		s._W(2, n);
		s._W(2, i);
		if (i > 0 && Br(t)) e.push(t)
	}

	function jp(e, r, t) {
		if (!e) e = Wr(7);
		e._W(2, r);
		e._W(2, t);
		e._W(2, 0);
		e._W(1, 0);
		return e
	}

	function Kp(e, r, t, a) {
		var n = Wr(9);
		jp(n, e, r);
		if (a == "e") {
			n._W(1, t);
			n._W(1, 1)
		} else {
			n._W(1, t ? 1 : 0);
			n._W(1, 0)
		}
		return n
	}

	function Yp(e, r, t) {
		var a = Wr(8 + 2 * t.length);
		jp(a, e, r);
		a._W(1, t.length);
		a._W(t.length, t, "sbcs");
		return a.l < a.length ? a.slice(0, a.l) : a
	}

	function $p(e, r, t, a) {
		if (r.v != null) switch (r.t) {
			case "d":
				;
			case "n":
				var n = r.t == "d" ? Q(te(r.v)) : r.v;
				if (n == (n | 0) && n >= 0 && n < 65536) Gp(e, 2, Ps(t, a, n));
				else Gp(e, 3, Ds(t, a, n));
				return;
			case "b":
				;
			case "e":
				Gp(e, 5, Kp(t, a, r.v, r.t));
				return;
			case "s":
				;
			case "str":
				Gp(e, 4, Yp(t, a, r.v));
				return;
		}
		Gp(e, 1, jp(null, t, a))
	}

	function Zp(e, r, t, a) {
		var n = Array.isArray(r);
		var i = ct(r["!ref"] || "A1"),
			s, f = "",
			o = [];
		for (var l = i.s.r; l <= i.e.r; ++l) {
			f = Jr(l);
			for (var c = i.s.c; c <= i.e.c; ++c) {
				if (l === i.s.r) o[c] = tt(c);
				s = o[c] + f;
				var h = n ? (r[l] || [])[c] : r[s];
				if (!h) continue;
				$p(e, h, l, c, a)
			}
		}
	}

	function Qp(e, r) {
		var t = r || {};
		if (g != null && t.dense == null) t.dense = g;
		var a = zr();
		var n = 0;
		for (var i = 0; i < e.SheetNames.length; ++i)
			if (e.SheetNames[i] == t.sheet) n = i;
		if (n == 0 && !!t.sheet && e.SheetNames[0] != t.sheet) throw new Error("Sheet not found: " + t.sheet);
		Gp(a, 9, ci(e, 16, t));
		Zp(a, e.Sheets[e.SheetNames[n]], n, t, e);
		Gp(a, 10);
		return a.end()
	}

	function Jp(e, r, t) {
		Gp(e, "Font", xi({
			sz: 12,
			color: {
				theme: 1
			},
			name: "Arial",
			family: 2,
			scheme: "minor"
		}, t))
	}

	function qp(e, r, t) {
		if (!r) return;
		[
			[5, 8],
			[23, 26],
			[41, 44],
			[50, 392]
		].forEach(function(a) {
			for (var n = a[0]; n <= a[1]; ++n)
				if (r[n] != null) Gp(e, "Format", Di(n, r[n], t))
		})
	}

	function ev(e, r) {
		var t = Wr(19);
		t._W(4, 2151);
		t._W(4, 0);
		t._W(4, 0);
		t._W(2, 3);
		t._W(1, 1);
		t._W(4, 0);
		Gp(e, "FeatHdr", t);
		t = Wr(39);
		t._W(4, 2152);
		t._W(4, 0);
		t._W(4, 0);
		t._W(2, 3);
		t._W(1, 0);
		t._W(4, 0);
		t._W(2, 1);
		t._W(4, 4);
		t._W(2, 0);
		ei(ct(r["!ref"]), t);
		t._W(4, 4);
		Gp(e, "Feat", t)
	}

	function rv(e, r) {
		for (var t = 0; t < 16; ++t) Gp(e, "XF", Vi({
			numFmtId: 0,
			style: true
		}, 0, r));
		r.cellXfs.forEach(function(t) {
			Gp(e, "XF", Vi(t, 0, r))
		})
	}

	function tv(e, r) {
		for (var t = 0; t < r["!links"].length; ++t) {
			var a = r["!links"][t];
			Gp(e, "HLink", vs(a));
			if (a[1].Tooltip) Gp(e, "HLinkTooltip", ms(a))
		}
		delete r["!links"]
	}

	function av(e, r, t, a, n) {
		var i = 16 + Ih(n.cellXfs, r, n);
		if (r.v != null) switch (r.t) {
			case "d":
				;
			case "n":
				var s = r.t == "d" ? Q(te(r.v)) : r.v;
				Gp(e, "Number", Yi(t, a, s, i, n));
				return;
			case "b":
				;
			case "e":
				Gp(e, 517, ji(t, a, r.v, i, n, r.t));
				return;
			case "s":
				;
			case "str":
				Gp(e, "Label", Ri(t, a, r.v, i, n));
				return;
		}
		Gp(e, "Blank", Kn(t, a, i))
	}

	function nv(e, r, t) {
		var a = zr();
		var n = t.SheetNames[e],
			i = t.Sheets[n] || {};
		var s = (t || {}).Workbook || {};
		var f = (s.Sheets || [])[e] || {};
		var o = Array.isArray(i);
		var l, c = "",
			h = [];
		var u = ct(i["!ref"] || "A1");
		var d = r.biff == 8;
		Gp(a, 2057, ci(t, 16, r));
		Gp(a, "CalcMode", Tn(1));
		Gp(a, "CalcCount", Tn(100));
		Gp(a, "CalcRefMode", _n(true));
		Gp(a, "CalcIter", _n(false));
		Gp(a, "CalcDelta", Wt(.001));
		Gp(a, "CalcSaveRecalc", _n(true));
		Gp(a, "PrintRowCol", _n(false));
		Gp(a, "PrintGrid", _n(false));
		Gp(a, "GridSet", Tn(1));
		Gp(a, "Guts", Xi([0, 0]));
		Gp(a, "HCenter", _n(false));
		Gp(a, "VCenter", _n(false));
		Gp(a, "Dimensions", Ni(u, r));
		if (d) i["!links"] = [];
		for (var p = u.s.r; p <= u.e.r; ++p) {
			c = Jr(p);
			for (var v = u.s.c; v <= u.e.c; ++v) {
				if (p === u.s.r) h[v] = tt(v);
				l = h[v] + c;
				var g = o ? (i[p] || [])[v] : i[l];
				if (!g) continue;
				av(a, g, p, v, r);
				if (d && g.l) i["!links"].push([l, g.l])
			}
		}
		var m = f.CodeName || f.name || n;
		if (d && s.Views) Gp(a, "Window2", Bi(s.Views[0]));
		if (d && (i["!merges"] || []).length) Gp(a, "MergeCells", ls(i["!merges"]));
		if (d) tv(a, i);
		Gp(a, "CodeName", Nn(m, r));
		if (d) ev(a, i);
		Gp(a, "EOF");
		return a.end()
	}

	function iv(e, r, t) {
		var a = zr();
		var n = (e || {}).Workbook || {};
		var i = n.Sheets || [];
		var s = n.WBProps || {};
		var f = t.biff == 8,
			o = t.biff == 5;
		Gp(a, 2057, ci(e, 5, t));
		if (t.bookType == "xla") Gp(a, "Addin");
		Gp(a, "InterfaceHdr", f ? Tn(1200) : null);
		Gp(a, "Mms", kn(2));
		if (o) Gp(a, "ToolbarHdr");
		if (o) Gp(a, "ToolbarEnd");
		Gp(a, "InterfaceEnd");
		Gp(a, "WriteAccess", di("SheetJS", t));
		Gp(a, "CodePage", Tn(f ? 1200 : 1252));
		if (f) Gp(a, "DSF", Tn(0));
		if (f) Gp(a, "Excel9File");
		Gp(a, "RRTabId", Bs(e.SheetNames.length));
		if (f && e.vbaraw) {
			Gp(a, "ObProj");
			var l = s.CodeName || "ThisWorkbook";
			Gp(a, "CodeName", Nn(l, t))
		}
		Gp(a, "BuiltInFnGroupCount", Tn(17));
		Gp(a, "WinProtect", _n(false));
		Gp(a, "Protect", _n(false));
		Gp(a, "Password", Tn(0));
		if (f) Gp(a, "Prot4Rev", _n(false));
		if (f) Gp(a, "Prot4RevPass", Tn(0));
		Gp(a, "Window1", Ai(t));
		Gp(a, "Backup", _n(false));
		Gp(a, "HideObj", Tn(0));
		Gp(a, "Date1904", _n(wd(e) == "true"));
		Gp(a, "CalcPrecision", _n(true));
		if (f) Gp(a, "RefreshAll", _n(false));
		Gp(a, "BookBool", Tn(0));
		Jp(a, e, t);
		qp(a, e.SSF, t);
		rv(a, t);
		if (f) Gp(a, "UsesELFs", _n(false));
		var c = a.end();
		var h = zr();
		if (f) Gp(h, "Country", Cs());
		Gp(h, "EOF");
		var u = h.end();
		var d = zr();
		var p = 0,
			v = 0;
		for (v = 0; v < e.SheetNames.length; ++v) p += (f ? 12 : 11) + (f ? 2 : 1) * e.SheetNames[v].length;
		var g = c.length + p + u.length;
		for (v = 0; v < e.SheetNames.length; ++v) {
			var m = i[v] || {};
			Gp(d, "BoundSheet8", gi({
				pos: g,
				hs: m.Hidden || 0,
				dt: 0,
				name: e.SheetNames[v]
			}, t));
			g += r[v].length
		}
		var b = d.end();
		if (p != b.length) throw new Error("BS8 " + p + " != " + b.length);
		var C = [];
		if (c.length) C.push(c);
		if (b.length) C.push(b);
		if (u.length) C.push(u);
		return sr([C])
	}

	function sv(e, r) {
		var t = r || {};
		var a = [];
		if (e && !e.SSF) {
			e.SSF = y.get_table()
		}
		if (e && e.SSF) {
			I(y);
			y.load_table(e.SSF);
			t.revssf = j(e.SSF);
			t.revssf[e.SSF[65535]] = 0;
			t.ssf = e.SSF
		}
		t.cellXfs = [];
		t.Strings = [];
		t.Strings.Count = 0;
		t.Strings.Unique = 0;
		Ih(t.cellXfs, {}, {
			revssf: {
				General: 0
			}
		});
		for (var n = 0; n < e.SheetNames.length; ++n) a[a.length] = nv(n, t, e);
		a.unshift(iv(e, a, t));
		return sr([a])
	}

	function fv(e, r) {
		var t = r || {};
		switch (t.biff || 2) {
			case 8:
				;
			case 5:
				return sv(e, r);
			case 4:
				;
			case 3:
				;
			case 2:
				return Qp(e, r);
		}
		throw new Error("invalid type " + t.bookType + " for BIFF")
	}
	var ov = function() {
		function e(e, r) {
			var t = r || {};
			if (g != null && t.dense == null) t.dense = g;
			var a = t.dense ? [] : {};
			var n = e.match(/<table/i);
			if (!n) throw new Error("Invalid HTML: could not find <table>");
			var i = e.match(/<\/table/i);
			var s = n.index,
				f = i && i.index || e.length;
			var o = le(e.slice(s, f), /(:?<tr[^>]*>)/i, "<tr>");
			var l = -1,
				c = 0,
				h = 0,
				u = 0;
			var d = {
				s: {
					r: 1e7,
					c: 1e7
				},
				e: {
					r: 0,
					c: 0
				}
			};
			var p = [];
			for (s = 0; s < o.length; ++s) {
				var v = o[s].trim();
				var m = v.slice(0, 3).toLowerCase();
				if (m == "<tr") {
					++l;
					c = 0;
					continue
				}
				if (m != "<td") continue;
				var b = v.split(/<\/td>/i);
				for (f = 0; f < b.length; ++f) {
					var C = b[f].trim();
					if (C.slice(0, 3).toLowerCase() != "<td") continue;
					var E = C,
						w = 0;
					while (E.charAt(0) == "<" && (w = E.indexOf(">")) > -1) E = E.slice(w + 1);
					var k = Ae(C.slice(0, C.indexOf(">")));
					u = k.colspan ? +k.colspan : 1;
					if ((h = +k.rowspan) > 0 || u > 1) p.push({
						s: {
							r: l,
							c: c
						},
						e: {
							r: l + (h || 1) - 1,
							c: c + u - 1
						}
					});
					var S = k.t || "";
					if (!E.length) {
						c += u;
						continue
					}
					E = Ge(xe(E));
					if (d.s.r > l) d.s.r = l;
					if (d.e.r < l) d.e.r = l;
					if (d.s.c > c) d.s.c = c;
					if (d.e.c < c) d.e.c = c;
					if (!E.length) continue;
					var A = {
						t: "s",
						v: E
					};
					if (t.raw || !E.trim().length || S == "s") {} else if (E === "TRUE") A = {
						t: "b",
						v: true
					};
					else if (E === "FALSE") A = {
						t: "b",
						v: false
					};
					else if (!isNaN(se(E))) A = {
						t: "n",
						v: se(E)
					};
					else if (!isNaN(fe(E).getDate())) {
						A = {
							t: "d",
							v: te(E)
						};
						if (!t.cellDates) A = {
							t: "n",
							v: Q(A.v)
						};
						A.z = t.dateNF || y._table[14]
					}
					if (t.dense) {
						if (!a[l]) a[l] = [];
						a[l][c] = A
					} else a[ft({
						r: l,
						c: c
					})] = A;
					c += u
				}
			}
			a["!ref"] = lt(d);
			return a
		}

		function r(r, t) {
			return dt(e(r, t), t)
		}

		function t(e, r, t, a) {
			var n = e["!merges"] || [];
			var i = [];
			var s = "<td>" + (a.editable ? '<span contenteditable="true"></span>' : "") + "</td>";
			for (var f = r.s.c; f <= r.e.c; ++f) {
				var o = 0,
					l = 0;
				for (var c = 0; c < n.length; ++c) {
					if (n[c].s.r > t || n[c].s.c > f) continue;
					if (n[c].e.r < t || n[c].e.c < f) continue;
					if (n[c].s.r < t || n[c].s.c < f) {
						o = -1;
						break
					}
					o = n[c].e.r - n[c].s.r + 1;
					l = n[c].e.c - n[c].s.c + 1;
					break
				}
				if (o < 0) continue;
				var h = ft({
					r: t,
					c: f
				});
				var u = a.dense ? (e[t] || [])[f] : e[h];
				if (!u || u.v == null) {
					i.push(s);
					continue
				}
				var d = u.h || Re(u.w || (ut(u), u.w) || "");
				var p = {};
				if (o > 1) p.rowspan = o;
				if (l > 1) p.colspan = l;
				p.t = u.t;
				if (a.editable) d = '<span contenteditable="true">' + d + "</span>";
				p.id = "sjs-" + h;
				i.push(qe("td", d, p))
			}
			var v = "<tr>";
			return v + i.join("") + "</tr>"
		}

		function a(e, r, t) {
			var a = [];
			return a.join("") + "<table" + (t && t.id ? ' id="' + t.id + '"' : "") + ">"
		}
		var n = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>';
		var i = "</body></html>";

		function s(e, r) {
			var s = r || {};
			var f = s.header != null ? s.header : n;
			var o = s.footer != null ? s.footer : i;
			var l = [f];
			var c = ot(e["!ref"]);
			s.dense = Array.isArray(e);
			l.push(a(e, c, s));
			for (var h = c.s.r; h <= c.e.r; ++h) l.push(t(e, c, h, s));
			l.push("</table>" + o);
			return l.join("")
		}
		return {
			to_workbook: r,
			to_sheet: e,
			_row: t,
			BEGIN: n,
			END: i,
			_preamble: a,
			from_sheet: s
		}
	}();

	function lv(e, r) {
		var t = r || {};
		if (g != null) t.dense = g;
		var a = t.dense ? [] : {};
		var n = e.getElementsByTagName("tr");
		var i = {
			s: {
				r: 0,
				c: 0
			},
			e: {
				r: n.length - 1,
				c: 0
			}
		};
		var s = [],
			f = 0;
		var o = 0,
			l = 0,
			c = 0,
			h = 0,
			u = 0;
		for (; o < n.length; ++o) {
			var d = n[o];
			var p = d.children;
			for (l = c = 0; l < p.length; ++l) {
				var v = p[l],
					m = Ge(p[l].innerHTML);
				for (f = 0; f < s.length; ++f) {
					var b = s[f];
					if (b.s.c == c && b.s.r <= o && o <= b.e.r) {
						c = b.e.c + 1;
						f = -1
					}
				}
				u = +v.getAttribute("colspan") || 1;
				if ((h = +v.getAttribute("rowspan")) > 0 || u > 1) s.push({
					s: {
						r: o,
						c: c
					},
					e: {
						r: o + (h || 1) - 1,
						c: c + u - 1
					}
				});
				var C = {
					t: "s",
					v: m
				};
				var E = v.getAttribute("t") || "";
				if (m != null) {
					if (m.length == 0) C.t = E || "z";
					else if (t.raw || m.trim().length == 0 || E == "s") {} else if (m === "TRUE") C = {
						t: "b",
						v: true
					};
					else if (m === "FALSE") C = {
						t: "b",
						v: false
					};
					else if (!isNaN(se(m))) C = {
						t: "n",
						v: se(m)
					};
					else if (!isNaN(fe(m).getDate())) {
						C = {
							t: "d",
							v: te(m)
						};
						if (!t.cellDates) C = {
							t: "n",
							v: Q(C.v)
						};
						C.z = t.dateNF || y._table[14]
					}
				}
				if (t.dense) {
					if (!a[o]) a[o] = [];
					a[o][c] = C
				} else a[ft({
					c: c,
					r: o
				})] = C;
				if (i.e.c < c) i.e.c = c;
				c += u
			}
		}
		a["!merges"] = s;
		a["!ref"] = lt(i);
		return a
	}

	function cv(e, r) {
		return dt(lv(e, r), r)
	}
	var hv = function() {
		var e = function(e) {
			return xe(e.replace(/[\t\r\n]/g, " ").trim().replace(/ +/g, " ").replace(/<text:s\/>/g, " ").replace(/<text:s text:c="(\d+)"\/>/g,
				function(e, r) {
					return Array(parseInt(r, 10) + 1).join(" ")
				}).replace(/<text:tab[^>]*\/>/g, "\t").replace(/<text:line-break\/>/g, "\n").replace(/<[^>]*>/g, ""))
		};
		var r = {
			day: ["d", "dd"],
			month: ["m", "mm"],
			year: ["y", "yy"],
			hours: ["h", "hh"],
			minutes: ["m", "mm"],
			seconds: ["s", "ss"],
			"am-pm": ["A/P", "AM/PM"],
			"day-of-week": ["ddd", "dddd"],
			era: ["e", "ee"],
			quarter: ["\\Qm", 'm\\"th quarter"']
		};
		return function t(a, n) {
			var i = n || {};
			if (g != null && i.dense == null) i.dense = g;
			var s = gp(a);
			var f = [],
				o;
			var l;
			var c = {
					name: ""
				},
				h = "",
				u = 0;
			var d;
			var p;
			var v = {},
				m = [];
			var b = i.dense ? [] : {};
			var C, E;
			var w = {
				value: ""
			};
			var k = "",
				S = 0,
				A;
			var _ = -1,
				B = -1,
				T = {
					s: {
						r: 1e6,
						c: 1e7
					},
					e: {
						r: 0,
						c: 0
					}
				};
			var x = 0;
			var y = {};
			var I = [],
				R = {},
				O = 0,
				D = 0;
			var F = [],
				P = 1,
				N = 1;
			var L = [];
			var M = {
				Names: []
			};
			var U = {};
			var H = ["", ""];
			var W = [],
				V = {};
			var z = "",
				X = 0;
			var G = false,
				j = false;
			var K = 0;
			mp.lastIndex = 0;
			s = s.replace(/<!--([\s\S]*?)-->/gm, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
			while (C = mp.exec(s)) switch (C[3] = C[3].replace(/_.*$/, "")) {
				case "table":
					;
				case "工作表":
					if (C[1] === "/") {
						if (T.e.c >= T.s.c && T.e.r >= T.s.r) b["!ref"] = lt(T);
						if (I.length) b["!merges"] = I;
						if (F.length) b["!rows"] = F;
						d.name = Ue(d["名称"] || d.name);
						m.push(d.name);
						v[d.name] = b;
						j = false
					} else if (C[0].charAt(C[0].length - 2) !== "/") {
						d = Ae(C[0], false);
						_ = B = -1;
						T.s.r = T.s.c = 1e7;
						T.e.r = T.e.c = 0;
						b = i.dense ? [] : {};
						I = [];
						F = [];
						j = true
					}
					break;
				case "table-row-group":
					if (C[1] === "/") --x;
					else ++x;
					break;
				case "table-row":
					;
				case "行":
					if (C[1] === "/") {
						_ += P;
						P = 1;
						break
					}
					p = Ae(C[0], false);
					if (p["行号"]) _ = p["行号"] - 1;
					else if (_ == -1) _ = 0;
					P = +p["number-rows-repeated"] || 1;
					if (P < 10)
						for (K = 0; K < P; ++K)
							if (x > 0) F[_ + K] = {
								level: x
							};
					B = -1;
					break;
				case "covered-table-cell":
					++B;
					if (i.sheetStubs) {
						if (i.dense) {
							if (!b[_]) b[_] = [];
							b[_][B] = {
								t: "z"
							}
						} else b[ft({
							r: _,
							c: B
						})] = {
							t: "z"
						}
					}
					break;
				case "table-cell":
					;
				case "数据":
					if (C[0].charAt(C[0].length - 2) === "/") {
						++B;
						w = Ae(C[0], false);
						N = parseInt(w["number-columns-repeated"] || "1", 10);
						E = {
							t: "z",
							v: null
						};
						if (w.formula && i.cellFormula != false) E.f = wh(xe(w.formula));
						if ((w["数据类型"] || w["value-type"]) == "string") {
							E.t = "s";
							E.v = xe(w["string-value"] || "");
							if (i.dense) {
								if (!b[_]) b[_] = [];
								b[_][B] = E
							} else {
								b[ft({
									r: _,
									c: B
								})] = E
							}
						}
						B += N - 1
					} else if (C[1] !== "/") {
						++B;
						N = 1;
						var Y = P ? _ + P - 1 : _;
						if (B > T.e.c) T.e.c = B;
						if (B < T.s.c) T.s.c = B;
						if (_ < T.s.r) T.s.r = _;
						if (Y > T.e.r) T.e.r = Y;
						w = Ae(C[0], false);
						W = [];
						V = {};
						E = {
							t: w["数据类型"] || w["value-type"],
							v: null
						};
						if (i.cellFormula) {
							if (w.formula) w.formula = xe(w.formula);
							if (w["number-matrix-columns-spanned"] && w["number-matrix-rows-spanned"]) {
								O = parseInt(w["number-matrix-rows-spanned"], 10) || 0;
								D = parseInt(w["number-matrix-columns-spanned"], 10) || 0;
								R = {
									s: {
										r: _,
										c: B
									},
									e: {
										r: _ + O - 1,
										c: B + D - 1
									}
								};
								E.F = lt(R);
								L.push([R, E.F])
							}
							if (w.formula) E.f = wh(w.formula);
							else
								for (K = 0; K < L.length; ++K)
									if (_ >= L[K][0].s.r && _ <= L[K][0].e.r)
										if (B >= L[K][0].s.c && B <= L[K][0].e.c) E.F = L[K][1]
						}
						if (w["number-columns-spanned"] || w["number-rows-spanned"]) {
							O = parseInt(w["number-rows-spanned"], 10) || 0;
							D = parseInt(w["number-columns-spanned"], 10) || 0;
							R = {
								s: {
									r: _,
									c: B
								},
								e: {
									r: _ + O - 1,
									c: B + D - 1
								}
							};
							I.push(R)
						}
						if (w["number-columns-repeated"]) N = parseInt(w["number-columns-repeated"], 10);
						switch (E.t) {
							case "boolean":
								E.t = "b";
								E.v = Me(w["boolean-value"]);
								break;
							case "float":
								E.t = "n";
								E.v = parseFloat(w.value);
								break;
							case "percentage":
								E.t = "n";
								E.v = parseFloat(w.value);
								break;
							case "currency":
								E.t = "n";
								E.v = parseFloat(w.value);
								break;
							case "date":
								E.t = "d";
								E.v = te(w["date-value"]);
								if (!i.cellDates) {
									E.t = "n";
									E.v = Q(E.v)
								}
								E.z = "m/d/yy";
								break;
							case "time":
								E.t = "n";
								E.v = q(w["time-value"]) / 86400;
								break;
							case "number":
								E.t = "n";
								E.v = parseFloat(w["数据数值"]);
								break;
							default:
								if (E.t === "string" || E.t === "text" || !E.t) {
									E.t = "s";
									if (w["string-value"] != null) k = xe(w["string-value"])
								} else throw new Error("Unsupported value type " + E.t);
						}
					} else {
						G = false;
						if (E.t === "s") {
							E.v = k || "";
							G = S == 0
						}
						if (U.Target) E.l = U;
						if (W.length > 0) {
							E.c = W;
							W = []
						}
						if (k && i.cellText !== false) E.w = k;
						if (!G || i.sheetStubs) {
							if (!(i.sheetRows && i.sheetRows < _)) {
								for (var $ = 0; $ < P; ++$) {
									N = parseInt(w["number-columns-repeated"] || "1", 10);
									if (i.dense) {
										if (!b[_ + $]) b[_ + $] = [];
										b[_ + $][B] = $ == 0 ? E : ne(E);
										while (--N > 0) b[_ + $][B + N] = ne(E)
									} else {
										b[ft({
											r: _ + $,
											c: B
										})] = E;
										while (--N > 0) b[ft({
											r: _ + $,
											c: B + N
										})] = ne(E)
									}
									if (T.e.c <= B) T.e.c = B
								}
							}
						}
						N = parseInt(w["number-columns-repeated"] || "1", 10);
						B += N - 1;
						N = 0;
						E = {};
						k = ""
					}
					U = {};
					break;
				case "document":
					;
				case "document-content":
					;
				case "电子表格文档":
					;
				case "spreadsheet":
					;
				case "主体":
					;
				case "scripts":
					;
				case "styles":
					;
				case "font-face-decls":
					if (C[1] === "/") {
						if ((o = f.pop())[0] !== C[3]) throw "Bad state: " + o
					} else if (C[0].charAt(C[0].length - 2) !== "/") f.push([C[3], true]);
					break;
				case "annotation":
					if (C[1] === "/") {
						if ((o = f.pop())[0] !== C[3]) throw "Bad state: " + o;
						V.t = k;
						V.a = z;
						W.push(V)
					} else if (C[0].charAt(C[0].length - 2) !== "/") {
						f.push([C[3], false])
					}
					z = "";
					X = 0;
					k = "";
					S = 0;
					break;
				case "creator":
					if (C[1] === "/") {
						z = s.slice(X, C.index)
					} else X = C.index + C[0].length;
					break;
				case "meta":
					;
				case "元数据":
					;
				case "settings":
					;
				case "config-item-set":
					;
				case "config-item-map-indexed":
					;
				case "config-item-map-entry":
					;
				case "config-item-map-named":
					;
				case "shapes":
					;
				case "frame":
					;
				case "text-box":
					;
				case "image":
					;
				case "data-pilot-tables":
					;
				case "list-style":
					;
				case "form":
					;
				case "dde-links":
					;
				case "event-listeners":
					;
				case "chart":
					if (C[1] === "/") {
						if ((o = f.pop())[0] !== C[3]) throw "Bad state: " + o
					} else if (C[0].charAt(C[0].length - 2) !== "/") f.push([C[3], false]);
					k = "";
					S = 0;
					break;
				case "scientific-number":
					break;
				case "currency-symbol":
					break;
				case "currency-style":
					break;
				case "number-style":
					;
				case "percentage-style":
					;
				case "date-style":
					;
				case "time-style":
					if (C[1] === "/") {
						y[c.name] = h;
						if ((o = f.pop())[0] !== C[3]) throw "Bad state: " + o
					} else if (C[0].charAt(C[0].length - 2) !== "/") {
						h = "";
						c = Ae(C[0], false);
						f.push([C[3], true])
					}
					break;
				case "script":
					break;
				case "libraries":
					break;
				case "automatic-styles":
					break;
				case "master-styles":
					break;
				case "default-style":
					;
				case "page-layout":
					break;
				case "style":
					break;
				case "map":
					break;
				case "font-face":
					break;
				case "paragraph-properties":
					break;
				case "table-properties":
					break;
				case "table-column-properties":
					break;
				case "table-row-properties":
					break;
				case "table-cell-properties":
					break;
				case "number":
					switch (f[f.length - 1][0]) {
						case "time-style":
							;
						case "date-style":
							l = Ae(C[0], false);
							h += r[C[3]][l.style === "long" ? 1 : 0];
							break;
					}
					break;
				case "fraction":
					break;
				case "day":
					;
				case "month":
					;
				case "year":
					;
				case "era":
					;
				case "day-of-week":
					;
				case "week-of-year":
					;
				case "quarter":
					;
				case "hours":
					;
				case "minutes":
					;
				case "seconds":
					;
				case "am-pm":
					switch (f[f.length - 1][0]) {
						case "time-style":
							;
						case "date-style":
							l = Ae(C[0], false);
							h += r[C[3]][l.style === "long" ? 1 : 0];
							break;
					}
					break;
				case "boolean-style":
					break;
				case "boolean":
					break;
				case "text-style":
					break;
				case "text":
					if (C[0].slice(-2) === "/>") break;
					else if (C[1] === "/") switch (f[f.length - 1][0]) {
						case "number-style":
							;
						case "date-style":
							;
						case "time-style":
							h += s.slice(u, C.index);
							break;
					} else u = C.index + C[0].length;
					break;
				case "named-range":
					l = Ae(C[0], false);
					H = Sh(l["cell-range-address"]);
					var Z = {
						Name: l.name,
						Ref: H[0] + "!" + H[1]
					};
					if (j) Z.Sheet = m.length;
					M.Names.push(Z);
					break;
				case "text-content":
					break;
				case "text-properties":
					break;
				case "embedded-text":
					break;
				case "body":
					;
				case "电子表格":
					break;
				case "forms":
					break;
				case "table-column":
					break;
				case "table-header-rows":
					break;
				case "table-rows":
					break;
				case "table-column-group":
					break;
				case "table-header-columns":
					break;
				case "table-columns":
					break;
				case "null-date":
					break;
				case "graphic-properties":
					break;
				case "calculation-settings":
					break;
				case "named-expressions":
					break;
				case "label-range":
					break;
				case "label-ranges":
					break;
				case "named-expression":
					break;
				case "sort":
					break;
				case "sort-by":
					break;
				case "sort-groups":
					break;
				case "tab":
					break;
				case "line-break":
					break;
				case "span":
					break;
				case "p":
					;
				case "文本串":
					if (C[1] === "/" && (!w || !w["string-value"])) k = (k.length > 0 ? k + "\n" : "") + e(s.slice(S, C.index), A);
					else {
						A = Ae(C[0], false);
						S = C.index + C[0].length
					}
					break;
				case "s":
					break;
				case "database-range":
					if (C[1] === "/") break;
					try {
						H = Sh(Ae(C[0])["target-range-address"]);
						v[H[0]]["!autofilter"] = {
							ref: H[1]
						}
					} catch (J) {}
					break;
				case "date":
					break;
				case "object":
					break;
				case "title":
					;
				case "标题":
					break;
				case "desc":
					break;
				case "binary-data":
					break;
				case "table-source":
					break;
				case "scenario":
					break;
				case "iteration":
					break;
				case "content-validations":
					break;
				case "content-validation":
					break;
				case "help-message":
					break;
				case "error-message":
					break;
				case "database-ranges":
					break;
				case "filter":
					break;
				case "filter-and":
					break;
				case "filter-or":
					break;
				case "filter-condition":
					break;
				case "list-level-style-bullet":
					break;
				case "list-level-style-number":
					break;
				case "list-level-properties":
					break;
				case "sender-firstname":
					;
				case "sender-lastname":
					;
				case "sender-initials":
					;
				case "sender-title":
					;
				case "sender-position":
					;
				case "sender-email":
					;
				case "sender-phone-private":
					;
				case "sender-fax":
					;
				case "sender-company":
					;
				case "sender-phone-work":
					;
				case "sender-street":
					;
				case "sender-city":
					;
				case "sender-postal-code":
					;
				case "sender-country":
					;
				case "sender-state-or-province":
					;
				case "author-name":
					;
				case "author-initials":
					;
				case "chapter":
					;
				case "file-name":
					;
				case "template-name":
					;
				case "sheet-name":
					break;
				case "event-listener":
					break;
				case "initial-creator":
					;
				case "creation-date":
					;
				case "print-date":
					;
				case "generator":
					;
				case "document-statistic":
					;
				case "user-defined":
					;
				case "editing-duration":
					;
				case "editing-cycles":
					break;
				case "config-item":
					break;
				case "page-number":
					break;
				case "page-count":
					break;
				case "time":
					break;
				case "cell-range-source":
					break;
				case "detective":
					break;
				case "operation":
					break;
				case "highlighted-range":
					break;
				case "data-pilot-table":
					;
				case "source-cell-range":
					;
				case "source-service":
					;
				case "data-pilot-field":
					;
				case "data-pilot-level":
					;
				case "data-pilot-subtotals":
					;
				case "data-pilot-subtotal":
					;
				case "data-pilot-members":
					;
				case "data-pilot-member":
					;
				case "data-pilot-display-info":
					;
				case "data-pilot-sort-info":
					;
				case "data-pilot-layout-info":
					;
				case "data-pilot-field-reference":
					;
				case "data-pilot-groups":
					;
				case "data-pilot-group":
					;
				case "data-pilot-group-member":
					break;
				case "rect":
					break;
				case "dde-connection-decls":
					;
				case "dde-connection-decl":
					;
				case "dde-link":
					;
				case "dde-source":
					break;
				case "properties":
					break;
				case "property":
					break;
				case "a":
					if (C[1] !== "/") {
						U = Ae(C[0], false);
						if (!U.href) break;
						U.Target = U.href;
						delete U.href;
						if (U.Target.charAt(0) == "#" && U.Target.indexOf(".") > -1) {
							H = Sh(U.Target.slice(1));
							U.Target = "#" + H[0] + "!" + H[1]
						}
					}
					break;
				case "table-protection":
					break;
				case "data-pilot-grand-total":
					break;
				case "office-document-common-attrs":
					break;
				default:
					switch (C[2]) {
						case "dc:":
							;
						case "calcext:":
							;
						case "loext:":
							;
						case "ooo:":
							;
						case "chartooo:":
							;
						case "draw:":
							;
						case "style:":
							;
						case "chart:":
							;
						case "form:":
							;
						case "uof:":
							;
						case "表:":
							;
						case "字:":
							break;
						default:
							if (i.WTF) throw new Error(C);
					};
			}
			var ee = {
				Sheets: v,
				SheetNames: m,
				Workbook: M
			};
			if (i.bookSheets) delete ee.Sheets;
			return ee
		}
	}();

	function uv(e, r) {
		r = r || {};
		var t = !!de(e, "objectdata");
		if (t) Oa(ve(e, "META-INF/manifest.xml"), r);
		var a = ge(e, "content.xml");
		if (!a) throw new Error("Missing content.xml in " + (t ? "ODS" : "UOF") + " file");
		var n = hv(t ? a : Ue(a), r);
		if (de(e, "meta.xml")) n.Props = Ha(ve(e, "meta.xml"));
		return n
	}

	function dv(e, r) {
		return hv(e, r)
	}
	var pv = function() {
		var e = "<office:document-styles " + Je({
			"xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
			"xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
			"xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
			"xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
			"xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
			"xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
			"xmlns:xlink": "http://www.w3.org/1999/xlink",
			"xmlns:dc": "http://purl.org/dc/elements/1.1/",
			"xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
			"xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
			"xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
			"office:version": "1.2"
		}) + "></office:document-styles>";
		return function r() {
			return Ce + e
		}
	}();
	var vv = function() {
		var e = function(e) {
			return Re(e).replace(/  +/g, function(e) {
				return '<text:s text:c="' + e.length + '"/>'
			}).replace(/\t/g, "<text:tab/>").replace(/\n/g, "<text:line-break/>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>")
		};
		var r = "          <table:table-cell />\n";
		var t = "          <table:covered-table-cell/>\n";
		var a = function(a, n, i) {
			var s = [];
			s.push('      <table:table table:name="' + Re(n.SheetNames[i]) + '">\n');
			var f = 0,
				o = 0,
				l = ot(a["!ref"]);
			var c = a["!merges"] || [],
				h = 0;
			var u = Array.isArray(a);
			for (f = 0; f < l.s.r; ++f) s.push("        <table:table-row></table:table-row>\n");
			for (; f <= l.e.r; ++f) {
				s.push("        <table:table-row>\n");
				for (o = 0; o < l.s.c; ++o) s.push(r);
				for (; o <= l.e.c; ++o) {
					var d = false,
						p = {},
						v = "";
					for (h = 0; h != c.length; ++h) {
						if (c[h].s.c > o) continue;
						if (c[h].s.r > f) continue;
						if (c[h].e.c < o) continue;
						if (c[h].e.r < f) continue;
						if (c[h].s.c != o || c[h].s.r != f) d = true;
						p["table:number-columns-spanned"] = c[h].e.c - c[h].s.c + 1;
						p["table:number-rows-spanned"] = c[h].e.r - c[h].s.r + 1;
						break
					}
					if (d) {
						s.push(t);
						continue
					}
					var g = ft({
							r: f,
							c: o
						}),
						m = u ? (a[f] || [])[o] : a[g];
					if (m && m.f) {
						p["table:formula"] = Re(kh(m.f));
						if (m.F) {
							if (m.F.slice(0, g.length) == g) {
								var b = ot(m.F);
								p["table:number-matrix-columns-spanned"] = b.e.c - b.s.c + 1;
								p["table:number-matrix-rows-spanned"] = b.e.r - b.s.r + 1
							}
						}
					}
					if (!m) {
						s.push(r);
						continue
					}
					switch (m.t) {
						case "b":
							v = m.v ? "TRUE" : "FALSE";
							p["office:value-type"] = "boolean";
							p["office:boolean-value"] = m.v ? "true" : "false";
							break;
						case "n":
							v = m.w || String(m.v || 0);
							p["office:value-type"] = "float";
							p["office:value"] = m.v || 0;
							break;
						case "s":
							;
						case "str":
							v = m.v;
							p["office:value-type"] = "string";
							break;
						case "d":
							v = m.w || te(m.v).toISOString();
							p["office:value-type"] = "date";
							p["office:date-value"] = te(m.v).toISOString();
							p["table:style-name"] = "ce1";
							break;
						default:
							s.push(r);
							continue;
					}
					var C = e(v);
					if (m.l && m.l.Target) {
						var E = m.l.Target;
						E = E.charAt(0) == "#" ? "#" + Ah(E.slice(1)) : E;
						C = qe("text:a", C, {
							"xlink:href": E
						})
					}
					s.push("          " + qe("table:table-cell", qe("text:p", C, {}), p) + "\n")
				}
				s.push("        </table:table-row>\n")
			}
			s.push("      </table:table>\n");
			return s.join("")
		};
		var n = function(e) {
			e.push(" <office:automatic-styles>\n");
			e.push('  <number:date-style style:name="N37" number:automatic-order="true">\n');
			e.push('   <number:month number:style="long"/>\n');
			e.push("   <number:text>/</number:text>\n");
			e.push('   <number:day number:style="long"/>\n');
			e.push("   <number:text>/</number:text>\n");
			e.push("   <number:year/>\n");
			e.push("  </number:date-style>\n");
			e.push('  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>\n');
			e.push(" </office:automatic-styles>\n")
		};
		return function i(e, r) {
			var t = [Ce];
			var i = Je({
				"xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
				"xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
				"xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
				"xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
				"xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
				"xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
				"xmlns:xlink": "http://www.w3.org/1999/xlink",
				"xmlns:dc": "http://purl.org/dc/elements/1.1/",
				"xmlns:meta": "urn:oasis:names:tc:opendocument:xmlns:meta:1.0",
				"xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
				"xmlns:presentation": "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
				"xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
				"xmlns:chart": "urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
				"xmlns:dr3d": "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",
				"xmlns:math": "http://www.w3.org/1998/Math/MathML",
				"xmlns:form": "urn:oasis:names:tc:opendocument:xmlns:form:1.0",
				"xmlns:script": "urn:oasis:names:tc:opendocument:xmlns:script:1.0",
				"xmlns:ooo": "http://openoffice.org/2004/office",
				"xmlns:ooow": "http://openoffice.org/2004/writer",
				"xmlns:oooc": "http://openoffice.org/2004/calc",
				"xmlns:dom": "http://www.w3.org/2001/xml-events",
				"xmlns:xforms": "http://www.w3.org/2002/xforms",
				"xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
				"xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
				"xmlns:sheet": "urn:oasis:names:tc:opendocument:sh33tjs:1.0",
				"xmlns:rpt": "http://openoffice.org/2005/report",
				"xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
				"xmlns:xhtml": "http://www.w3.org/1999/xhtml",
				"xmlns:grddl": "http://www.w3.org/2003/g/data-view#",
				"xmlns:tableooo": "http://openoffice.org/2009/table",
				"xmlns:drawooo": "http://openoffice.org/2010/draw",
				"xmlns:calcext": "urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0",
				"xmlns:loext": "urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0",
				"xmlns:field": "urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0",
				"xmlns:formx": "urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0",
				"xmlns:css3t": "http://www.w3.org/TR/css3-text/",
				"office:version": "1.2"
			});
			var s = Je({
				"xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
				"office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
			});
			if (r.bookType == "fods") t.push("<office:document" + i + s + ">\n");
			else t.push("<office:document-content" + i + ">\n");
			n(t);
			t.push("  <office:body>\n");
			t.push("    <office:spreadsheet>\n");
			for (var f = 0; f != e.SheetNames.length; ++f) t.push(a(e.Sheets[e.SheetNames[f]], e, f, r));
			t.push("    </office:spreadsheet>\n");
			t.push("  </office:body>\n");
			if (r.bookType == "fods") t.push("</office:document>");
			else t.push("</office:document-content>");
			return t.join("")
		}
	}();

	function gv(e, r) {
		if (r.bookType == "fods") return vv(e, r);
		var t = new me;
		var a = "";
		var n = [];
		var i = [];
		a = "mimetype";
		t.file(a, "application/vnd.oasis.opendocument.spreadsheet");
		a = "content.xml";
		t.file(a, vv(e, r));
		n.push([a, "text/xml"]);
		i.push([a, "ContentFile"]);
		a = "styles.xml";
		t.file(a, pv(e, r));
		n.push([a, "text/xml"]);
		i.push([a, "StylesFile"]);
		a = "meta.xml";
		t.file(a, La());
		n.push([a, "text/xml"]);
		i.push([a, "MetadataFile"]);
		a = "manifest.rdf";
		t.file(a, Na(i));
		n.push([a, "application/rdf+xml"]);
		a = "META-INF/manifest.xml";
		t.file(a, Da(n));
		return t
	}

	function mv(e, r) {
		if (!r) return 0;
		var t = e.SheetNames.indexOf(r);
		if (t == -1) throw new Error("Sheet not found: " + r);
		return t
	}

	function bv(e) {
		return function r(t, a) {
			var n = mv(t, a.sheet);
			return e.from_sheet(t.Sheets[t.SheetNames[n]], a, t)
		}
	}
	var Cv = bv(ov);
	var Ev = bv({
		from_sheet: fg
	});
	var wv = bv(Hs);
	var kv = bv(Ws);
	var Sv = bv(zs);
	var Av = bv(Of);
	var _v = bv({
		from_sheet: og
	});
	var Bv = bv(Us);
	var Tv = bv(Vs);

	function xv(e) {
		return function r(t) {
			for (var a = 0; a != e.length; ++a) {
				var n = e[a];
				if (t[n[0]] === undefined) t[n[0]] = n[1];
				if (n[2] === "n") t[n[0]] = Number(t[n[0]])
			}
		}
	}
	var yv = xv([
		["cellNF", false],
		["cellHTML", true],
		["cellFormula", true],
		["cellStyles", false],
		["cellText", true],
		["cellDates", false],
		["sheetStubs", false],
		["sheetRows", 0, "n"],
		["bookDeps", false],
		["bookSheets", false],
		["bookProps", false],
		["bookFiles", false],
		["bookVBA", false],
		["password", ""],
		["WTF", false]
	]);
	var Iv = xv([
		["cellDates", false],
		["bookSST", false],
		["bookType", "xlsx"],
		["compression", false],
		["WTF", false]
	]);

	function Rv(e) {
		if (_a.WS.indexOf(e) > -1) return "sheet";
		if (_a.CS && e == _a.CS) return "chart";
		if (_a.DS && e == _a.DS) return "dialog";
		if (_a.MS && e == _a.MS) return "macro";
		return e && e.length ? e : "sheet"
	}

	function Ov(e, r) {
		if (!e) return 0;
		try {
			e = r.map(function a(r) {
				if (!r.id) r.id = r.strRelID;
				return [r.name, e["!id"][r.id].Target, Rv(e["!id"][r.id].Type)]
			})
		} catch (t) {
			return null
		}
		return !e || e.length === 0 ? null : e
	}

	function Dv(e, r, t, a, n, i, s, f, o, l, c, h) {
		try {
			i[a] = Ta(ge(e, t, true), r);
			var u = ve(e, r);
			switch (f) {
				case "sheet":
					s[a] = zd(u, r, n, o, i[a], l, c, h);
					break;
				case "chart":
					var d = Xd(u, r, n, o, i[a], l, c, h);
					s[a] = d;
					if (!d || !d["!chart"]) break;
					var p = be(d["!chart"].Target, r);
					var v = Ba(p);
					var g = ol(ge(e, p, true), Ta(ge(e, v, true), p));
					var m = be(g, p);
					var b = Ba(m);
					d = fd(ge(e, m, true), m, o, Ta(ge(e, b, true), m), l, d);
					break;
				case "macro":
					s[a] = Gd(u, r, n, o, i[a], l, c, h);
					break;
				case "dialog":
					s[a] = jd(u, r, n, o, i[a], l, c, h);
					break;
			}
		} catch (C) {
			if (o.WTF) throw C
		}
	}
	var Fv = function Dg(e) {
		return e.slice(-1) != "/"
	};

	function Pv(e) {
		return e.charAt(0) == "/" ? e.slice(1) : e
	}

	function Nv(e, r) {
		I(y);
		r = r || {};
		yv(r);
		if (de(e, "META-INF/manifest.xml")) return uv(e, r);
		if (de(e, "objectdata.xml")) return uv(e, r);
		if (de(e, "Index/Document.iwa")) throw new Error("Unsupported NUMBERS file");
		var t = z(e.files).filter(Fv).sort();
		var a = wa(ge(e, "[Content_Types].xml"));
		var n = false;
		var i, s;
		if (a.workbooks.length === 0) {
			s = "xl/workbook.xml";
			if (ve(e, s, true)) a.workbooks.push(s)
		}
		if (a.workbooks.length === 0) {
			s = "xl/workbook.bin";
			if (!ve(e, s, true)) throw new Error("Could not find workbook");
			a.workbooks.push(s);
			n = true
		}
		if (a.workbooks[0].slice(-3) == "bin") n = true;
		var f = {};
		var o = {};
		if (!r.bookSheets && !r.bookProps) {
			_h = [];
			if (a.sst) _h = $d(ve(e, Pv(a.sst)), a.sst, r);
			if (r.cellStyles && a.themes.length) f = Yd(ge(e, a.themes[0].replace(/^\//, ""), true) || "", a.themes[0], r);
			if (a.style) o = Kd(ve(e, Pv(a.style)), a.style, f, r)
		}
		a.links.map(function(t) {
			return Jd(ve(e, Pv(t)), t, r)
		});
		var l = Vd(ve(e, Pv(a.workbooks[0])), a.workbooks[0], r);
		var c = {},
			h = "";
		if (a.coreprops.length) {
			h = ve(e, Pv(a.coreprops[0]), true);
			if (h) c = Ha(h);
			if (a.extprops.length !== 0) {
				h = ve(e, Pv(a.extprops[0]), true);
				if (h) Ga(h, c, r)
			}
		}
		var u = {};
		if (!r.bookSheets || r.bookProps) {
			if (a.custprops.length !== 0) {
				h = ge(e, Pv(a.custprops[0]), true);
				if (h) u = $a(h, r)
			}
		}
		var d = {};
		if (r.bookSheets || r.bookProps) {
			if (l.Sheets) i = l.Sheets.map(function B(e) {
				return e.name
			});
			else if (c.Worksheets && c.SheetNames.length > 0) i = c.SheetNames;
			if (r.bookProps) {
				d.Props = c;
				d.Custprops = u
			}
			if (r.bookSheets && typeof i !== "undefined") d.SheetNames = i;
			if (r.bookSheets ? d.SheetNames : r.bookProps) return d
		}
		i = {};
		var p = {};
		if (r.bookDeps && a.calcchain) p = Qd(ve(e, Pv(a.calcchain)), a.calcchain, r);
		var v = 0;
		var g = {};
		var m, b; {
			var C = l.Sheets;
			c.Worksheets = C.length;
			c.SheetNames = [];
			for (var E = 0; E != C.length; ++E) {
				c.SheetNames[E] = C[E].name
			}
		}
		var w = n ? "bin" : "xml";
		var k = "xl/_rels/workbook." + w + ".rels";
		var S = Ta(ge(e, k, true), k);
		if (S) S = Ov(S, l.Sheets);
		var A = ve(e, "xl/worksheets/sheet.xml", true) ? 1 : 0;
		for (v = 0; v != c.Worksheets; ++v) {
			var _ = "sheet";
			if (S && S[v]) {
				m = "xl/" + S[v][1].replace(/[\/]?xl\//, "");
				_ = S[v][2]
			} else {
				m = "xl/worksheets/sheet" + (v + 1 - A) + "." + w;
				m = m.replace(/sheet0\./, "sheet.")
			}
			b = m.replace(/^(.*)(\/)([^\/]*)$/, "$1/_rels/$3.rels");
			Dv(e, m, b, c.SheetNames[v], v, g, i, _, r, l, f, o)
		}
		if (a.comments) hl(e, a.comments, i, g, r);
		d = {
			Directory: a,
			Workbook: l,
			Props: c,
			Custprops: u,
			Deps: p,
			Sheets: i,
			SheetNames: c.SheetNames,
			Strings: _h,
			Styles: o,
			Themes: f,
			SSF: y.get_table()
		};
		if (r.bookFiles) {
			d.keys = t;
			d.files = e.files
		}
		if (r.bookVBA) {
			if (a.vba.length > 0) d.vbaraw = ve(e, Pv(a.vba[0]), true);
			else if (a.defaults && a.defaults.bin === kl) d.vbaraw = ve(e, "xl/vbaProject.bin", true)
		}
		return d
	}

	function Lv(e, r) {
		var t = r || {};
		var a = "/!DataSpaces/Version";
		var n = L.find(e, a);
		if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
		hf(n.content);
		a = "/!DataSpaces/DataSpaceMap";
		n = L.find(e, a);
		if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
		var i = df(n.content);
		if (i.length !== 1 || i[0].comps.length !== 1 || i[0].comps[0].t !== 0 || i[0].name !== "StrongEncryptionDataSpace" || i[0].comps[0].v !==
			"EncryptedPackage") throw new Error("ECMA-376 Encrypted file bad " + a);
		a = "/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace";
		n = L.find(e, a);
		if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
		var s = pf(n.content);
		if (s.length != 1 || s[0] != "StrongEncryptionTransform") throw new Error("ECMA-376 Encrypted file bad " + a);
		a = "/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary";
		n = L.find(e, a);
		if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
		gf(n.content);
		a = "/EncryptionInfo";
		n = L.find(e, a);
		if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
		var f = Cf(n.content);
		a = "/EncryptedPackage";
		n = L.find(e, a);
		if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
		if (f[0] == 4 && typeof decrypt_agile !== "undefined") return decrypt_agile(f[1], n.content, t.password || "", t);
		if (f[0] == 2 && typeof decrypt_std76 !== "undefined") return decrypt_std76(f[1], n.content, t.password || "", t);
		throw new Error("File is password-protected")
	}

	function Mv(e, r) {
		ll = 1024;
		if (r.bookType == "ods") return gv(e, r);
		if (e && !e.SSF) {
			e.SSF = y.get_table()
		}
		if (e && e.SSF) {
			I(y);
			y.load_table(e.SSF);
			r.revssf = j(e.SSF);
			r.revssf[e.SSF[65535]] = 0;
			r.ssf = e.SSF
		}
		r.rels = {};
		r.wbrels = {};
		r.Strings = [];
		r.Strings.Count = 0;
		r.Strings.Unique = 0;
		var t = r.bookType == "xlsb" ? "bin" : "xml";
		var a = _l.indexOf(r.bookType) > -1;
		var n = Ea();
		Iv(r = r || {});
		var i = new me;
		var s = "",
			f = 0;
		r.cellXfs = [];
		Ih(r.cellXfs, {}, {
			revssf: {
				General: 0
			}
		});
		if (!e.Props) e.Props = {};
		s = "docProps/core.xml";
		i.file(s, za(e.Props, r));
		n.coreprops.push(s);
		Ia(r.rels, 2, s, _a.CORE_PROPS);
		s = "docProps/app.xml";
		if (e.Props && e.Props.SheetNames) {} else if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
		else e.Props.SheetNames = e.SheetNames.map(function(r, t) {
			return [(e.Workbook.Sheets[t] || {}).Hidden != 2, r]
		}).filter(function(e) {
			return e[0]
		}).map(function(e) {
			return e[1]
		});
		e.Props.Worksheets = e.Props.SheetNames.length;
		i.file(s, Ka(e.Props, r));
		n.extprops.push(s);
		Ia(r.rels, 3, s, _a.EXT_PROPS);
		if (e.Custprops !== e.Props && z(e.Custprops || {}).length > 0) {
			s = "docProps/custom.xml";
			i.file(s, Qa(e.Custprops, r));
			n.custprops.push(s);
			Ia(r.rels, 4, s, _a.CUST_PROPS)
		}
		s = "xl/workbook." + t;
		i.file(s, qd(e, s, r));
		n.workbooks.push(s);
		Ia(r.rels, 1, s, _a.WB);
		for (f = 1; f <= e.SheetNames.length; ++f) {
			var o = {
				"!id": {}
			};
			var l = e.Sheets[e.SheetNames[f - 1]];
			var c = (l || {})["!type"] || "sheet";
			switch (c) {
				case "chart":
					;
				default:
					s = "xl/worksheets/sheet" + f + "." + t;
					i.file(s, ep(f - 1, s, r, e, o));
					n.sheets.push(s);
					Ia(r.wbrels, -1, "worksheets/sheet" + f + "." + t, _a.WS[0]);
			}
			if (l) {
				var h = l["!comments"];
				if (h && h.length > 0) {
					var u = "xl/comments" + f + "." + t;
					i.file(u, np(h, u, r));
					n.comments.push(u);
					Ia(o, -1, "../comments" + f + "." + t, _a.CMNT)
				}
				if (l["!legacy"]) {
					i.file("xl/drawings/vmlDrawing" + f + ".vml", cl(f, l["!comments"]))
				}
				delete l["!comments"];
				delete l["!legacy"]
			}
			if (o["!id"].rId1) i.file(Ba(s), ya(o))
		}
		if (r.Strings != null && r.Strings.length > 0) {
			s = "xl/sharedStrings." + t;
			i.file(s, ap(r.Strings, s, r));
			n.strs.push(s);
			Ia(r.wbrels, -1, "sharedStrings." + t, _a.SST)
		}
		s = "xl/theme/theme1.xml";
		i.file(s, Yo(e.Themes, r));
		n.themes.push(s);
		Ia(r.wbrels, -1, "theme/theme1.xml", _a.THEME);
		s = "xl/styles." + t;
		i.file(s, tp(e, s, r));
		n.styles.push(s);
		Ia(r.wbrels, -1, "styles." + t, _a.STY);
		if (e.vbaraw && a) {
			s = "xl/vbaProject.bin";
			i.file(s, e.vbaraw);
			n.vba.push(s);
			Ia(r.wbrels, -1, "vbaProject.bin", _a.VBA)
		}
		i.file("[Content_Types].xml", Aa(n, r));
		i.file("_rels/.rels", ya(r.rels));
		i.file("xl/_rels/workbook." + t + ".rels", ya(r.wbrels));
		delete r.revssf;
		delete r.ssf;
		return i
	}

	function Uv(e, r) {
		var t = "";
		switch ((r || {}).type || "base64") {
			case "buffer":
				return [e[0], e[1], e[2], e[3]];
			case "base64":
				t = b.decode(e.slice(0, 24));
				break;
			case "binary":
				t = e;
				break;
			case "array":
				return [e[0], e[1], e[2], e[3]];
			default:
				throw new Error("Unrecognized type " + (r && r.type || "undefined"));
		}
		return [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3)]
	}

	function Hv(e, r) {
		if (L.find(e, "EncryptedPackage")) return Lv(e, r);
		return Up(e, r)
	}

	function Wv(e, r) {
		var t, a = e;
		var n = r || {};
		if (!n.type) n.type = C && Buffer.isBuffer(e) ? "buffer" : "base64";
		switch (n.type) {
			case "base64":
				t = new me(a, {
					base64: true
				});
				break;
			case "binary":
				;
			case "array":
				t = new me(a, {
					base64: false
				});
				break;
			case "buffer":
				t = new me(a);
				break;
			default:
				throw new Error("Unrecognized type " + n.type);
		}
		return Nv(t, n)
	}

	function Vv(e, r) {
		var t = 0;
		e: while (t < e.length) switch (e.charCodeAt(t)) {
			case 10:
				;
			case 13:
				;
			case 32:
				++t;
				break;
			case 60:
				return Cp(e.slice(t), r);
			default:
				break e;
		}
		return zs.to_workbook(e, r)
	}

	function zv(e, r) {
		var t = "",
			a = Uv(e, r);
		switch (r.type) {
			case "base64":
				t = b.decode(e);
				break;
			case "binary":
				t = e;
				break;
			case "buffer":
				t = e.toString("binary");
				break;
			case "array":
				t = ae(e);
				break;
			default:
				throw new Error("Unrecognized type " + r.type);
		}
		if (a[0] == 239 && a[1] == 187 && a[2] == 191) t = Ue(t);
		return Vv(t, r)
	}

	function Xv(e, r) {
		var t = e;
		if (r.type == "base64") t = b.decode(t);
		t = cptable.utils.decode(1200, t.slice(2), "str");
		r.type = "binary";
		return Vv(t, r)
	}

	function Gv(e) {
		return !e.match(/[^\x00-\x7F]/) ? e : He(e)
	}

	function jv(e, r, t, a) {
		if (a) {
			t.type = "string";
			return zs.to_workbook(e, t)
		}
		return zs.to_workbook(r, t)
	}

	function Kv(e, r) {
		c();
		if (typeof ArrayBuffer !== "undefined" && e instanceof ArrayBuffer) return Kv(new Uint8Array(e), r);
		var t = e,
			a = [0, 0, 0, 0],
			n = false;
		var i = r || {};
		Bh = {};
		if (i.dateNF) Bh.dateNF = i.dateNF;
		if (!i.type) i.type = C && Buffer.isBuffer(e) ? "buffer" : "base64";
		if (i.type == "file") {
			i.type = C ? "buffer" : "binary";
			t = V(e)
		}
		if (i.type == "string") {
			n = true;
			i.type = "binary";
			t = Gv(e)
		}
		if (i.type == "array" && typeof Uint8Array !== "undefined" && e instanceof Uint8Array && typeof ArrayBuffer !== "undefined") {
			var s = new ArrayBuffer(3),
				f = new Uint8Array(s);
			f.foo = "bar";
			if (!f.foo) {
				i = ne(i);
				i.type = "array";
				return Kv(_(t), i)
			}
		}
		switch ((a = Uv(t, i))[0]) {
			case 208:
				return Hv(L.read(t, i), i);
			case 9:
				return Up(t, i);
			case 60:
				return Cp(t, i);
			case 73:
				if (a[1] === 68) return Xs(t, i);
				break;
			case 84:
				if (a[1] === 65 && a[2] === 66 && a[3] === 76) return Ws.to_workbook(t, i);
				break;
			case 80:
				if (a[1] === 75 && a[2] < 32 && a[3] < 32) return Wv(t, i);
				break;
			case 239:
				return a[3] === 60 ? Cp(t, i) : jv(e, t, i, n);
			case 255:
				if (a[1] === 254) {
					return Xv(t, i)
				}
				break;
			case 0:
				if (a[1] === 0 && a[2] >= 2 && a[3] === 0) return Gs.to_workbook(t, i);
				break;
			case 3:
				;
			case 131:
				;
			case 139:
				;
			case 140:
				return Us.to_workbook(t, i);
			case 123:
				if (a[1] === 92 && a[2] === 114 && a[3] === 116) return Of.to_workbook(t, i);
				break;
			case 10:
				;
			case 13:
				;
			case 32:
				return zv(t, i);
		}
		if (a[2] <= 12 && a[3] <= 31) return Us.to_workbook(t, i);
		return jv(e, t, i, n)
	}

	function Yv(e, r) {
		var t = r || {};
		t.type = "file";
		return Kv(e, t)
	}

	function $v(e, r) {
		var t = r || {};
		var a = Mv(e, t);
		var n = {};
		if (t.compression) n.compression = "DEFLATE";
		switch (t.type) {
			case "base64":
				n.type = "base64";
				break;
			case "binary":
				n.type = "string";
				break;
			case "string":
				throw new Error("'string' output type invalid for '" + t.bookType + "' files");
			case "buffer":
				;
			case "file":
				n.type = C ? "nodebuffer" : "string";
				break;
			default:
				throw new Error("Unrecognized type " + t.type);
		}
		if (t.type === "file") return W(t.file, a.generate(n));
		var i = a.generate(n);
		return t.type == "string" ? Ue(i) : i
	}

	function Zv(e, r) {
		var t = r || {};
		var a = Hp(e, t);
		switch (t.type) {
			case "base64":
				;
			case "binary":
				break;
			case "buffer":
				;
			case "array":
				t.type = "";
				break;
			case "file":
				return W(t.file, L.write(a, {
					type: C ? "buffer" : ""
				}));
			case "string":
				throw new Error("'string' output type invalid for '" + t.bookType + "' files");
			default:
				throw new Error("Unrecognized type " + t.type);
		}
		return L.write(a, t)
	}

	function Qv(e, r, t) {
		if (!t) t = "";
		var a = t + e;
		switch (r.type) {
			case "base64":
				return b.encode(He(a));
			case "binary":
				return He(a);
			case "string":
				return e;
			case "file":
				return W(r.file, a, "utf8");
			case "buffer":
				{
					if (C) return new Buffer(a, "utf8");
					else return Qv(a, {
						type: "binary"
					}).split("").map(function(e) {
						return e.charCodeAt(0)
					})
				};
		}
		throw new Error("Unrecognized type " + r.type)
	}

	function Jv(e, r) {
		switch (r.type) {
			case "base64":
				return b.encode(e);
			case "binary":
				return e;
			case "string":
				return e;
			case "file":
				return W(r.file, e, "binary");
			case "buffer":
				{
					if (C) return new Buffer(e, "binary");
					else return e.split("").map(function(e) {
						return e.charCodeAt(0)
					})
				};
		}
		throw new Error("Unrecognized type " + r.type)
	}

	function qv(e, r) {
		switch (r.type) {
			case "string":
				;
			case "base64":
				;
			case "binary":
				var t = "";
				for (var a = 0; a < e.length; ++a) t += String.fromCharCode(e[a]);
				return r.type == "base64" ? b.encode(t) : r.type == "string" ? Ue(t) : t;
			case "file":
				return W(r.file, e);
			case "buffer":
				return e;
			default:
				throw new Error("Unrecognized type " + r.type);
		}
	}

	function eg(e, r) {
		_d(e);
		var t = r || {};
		if (t.type == "array") {
			t.type = "binary";
			var a = eg(e, t);
			t.type = "array";
			return k(a)
		}
		switch (t.bookType || "xlsb") {
			case "xml":
				;
			case "xlml":
				return Qv(Op(e, t), t);
			case "slk":
				;
			case "sylk":
				return Qv(wv(e, t), t);
			case "htm":
				;
			case "html":
				return Qv(Cv(e, t), t);
			case "txt":
				return Jv(_v(e, t), t);
			case "csv":
				return Qv(Ev(e, t), t, "\ufeff");
			case "dif":
				return Qv(kv(e, t), t);
			case "dbf":
				return qv(Bv(e, t), t);
			case "prn":
				return Qv(Sv(e, t), t);
			case "rtf":
				return Qv(Av(e, t), t);
			case "eth":
				return Qv(Tv(e, t), t);
			case "fods":
				return Qv(gv(e, t), t);
			case "biff2":
				if (!t.biff) t.biff = 2;
			case "biff3":
				if (!t.biff) t.biff = 3;
			case "biff4":
				if (!t.biff) t.biff = 4;
				return qv(fv(e, t), t);
			case "biff5":
				if (!t.biff) t.biff = 5;
			case "biff8":
				;
			case "xla":
				;
			case "xls":
				if (!t.biff) t.biff = 8;
				return Zv(e, t);
			case "xlsx":
				;
			case "xlsm":
				;
			case "xlam":
				;
			case "xlsb":
				;
			case "ods":
				return $v(e, t);
			default:
				throw new Error("Unrecognized bookType |" + t.bookType + "|");
		}
	}

	function rg(e) {
		if (e.bookType) return;
		var r = {
			xls: "biff8",
			htm: "html",
			slk: "sylk",
			socialcalc: "eth",
			Sh33tJS: "WTF"
		};
		var t = e.file.slice(e.file.lastIndexOf(".")).toLowerCase();
		if (t.match(/^\.[a-z]+$/)) e.bookType = t.slice(1);
		e.bookType = r[e.bookType] || e.bookType
	}

	function tg(e, r, t) {
		var a = t || {};
		a.type = "file";
		a.file = r;
		rg(a);
		return eg(e, a)
	}

	function ag(e, r, t, a) {
		var n = t || {};
		n.type = "file";
		n.file = e;
		rg(n);
		n.type = "buffer";
		var i = a;
		if (!(i instanceof Function)) i = t;
		return M.writeFile(e, eg(r, n), i)
	}

	function ng(e, r) {
		if (e == null || e["!ref"] == null) return [];
		var t = {
				t: "n",
				v: 0
			},
			a = 0,
			n = 1,
			i = [],
			s = true,
			f = 0,
			o = "";
		var l = {
			s: {
				r: 0,
				c: 0
			},
			e: {
				r: 0,
				c: 0
			}
		};
		var c = r || {};
		var h = c.raw;
		var u = c.defval;
		var d = c.range != null ? c.range : e["!ref"];
		if (c.header === 1) a = 1;
		else if (c.header === "A") a = 2;
		else if (Array.isArray(c.header)) a = 3;
		switch (typeof d) {
			case "string":
				l = ct(d);
				break;
			case "number":
				l = ct(e["!ref"]);
				l.s.r = d;
				break;
			default:
				l = d;
		}
		if (a > 0) n = 0;
		var p = Jr(l.s.r);
		var v = [];
		var g = [];
		var m = 0,
			b = 0;
		var C = Array.isArray(e);
		var E = l.s.r,
			w = 0,
			k = 0;
		if (C && !e[E]) e[E] = [];
		for (w = l.s.c; w <= l.e.c; ++w) {
			v[w] = tt(w);
			t = C ? e[E][w] : e[v[w] + p];
			switch (a) {
				case 1:
					i[w] = w - l.s.c;
					break;
				case 2:
					i[w] = v[w];
					break;
				case 3:
					i[w] = c.header[w - l.s.c];
					break;
				default:
					if (t == null) t = {
						w: "__EMPTY",
						t: "s"
					};
					o = f = ut(t, null, c);
					b = 0;
					for (k = 0; k < i.length; ++k)
						if (i[k] == o) o = f + "_" + ++b;
					i[w] = o;
			}
		}
		var S = a === 1 ? [] : {};
		for (E = l.s.r + n; E <= l.e.r; ++E) {
			p = Jr(E);
			s = true;
			if (a === 1) S = [];
			else {
				S = {};
				if (Object.defineProperty) try {
					Object.defineProperty(S, "__rowNum__", {
						value: E,
						enumerable: false
					})
				} catch (A) {
					S.__rowNum__ = E
				} else S.__rowNum__ = E
			}
			if (!C || e[E])
				for (w = l.s.c; w <= l.e.c; ++w) {
					t = C ? e[E][w] : e[v[w] + p];
					if (t === undefined || t.t === undefined) {
						if (u === undefined) continue;
						if (i[w] != null) {
							S[i[w]] = u;
							s = false
						}
						continue
					}
					f = t.v;
					switch (t.t) {
						case "z":
							if (f == null) break;
							continue;
						case "e":
							continue;
						case "s":
							;
						case "d":
							;
						case "b":
							;
						case "n":
							break;
						default:
							throw new Error("unrecognized type " + t.t);
					}
					if (i[w] != null) {
						if (f == null) {
							if (u !== undefined) S[i[w]] = u;
							else if (h && f === null) S[i[w]] = null;
							else continue
						} else {
							S[i[w]] = h ? f : ut(t, f, c)
						}
						s = false
					}
				}
			if (s === false || (a === 1 ? c.blankrows !== false : !!c.blankrows)) g[m++] = S
		}
		g.length = m;
		return g
	}
	var ig = /"/g;

	function sg(e, r, t, a, n, i, s, f) {
		var o = true;
		var l = [],
			c = "",
			h = Jr(t);
		for (var u = r.s.c; u <= r.e.c; ++u) {
			if (!a[u]) continue;
			var d = f.dense ? (e[t] || [])[u] : e[a[u] + h];
			if (d == null) c = "";
			else if (d.v != null) {
				o = false;
				c = "" + ut(d, null, f);
				for (var p = 0, v = 0; p !== c.length; ++p)
					if ((v = c.charCodeAt(p)) === n || v === i || v === 34) {
						c = '"' + c.replace(ig, '""') + '"';
						break
					}
				if (c == "ID") c = '"ID"'
			} else if (d.f != null && !d.F) {
				o = false;
				c = "=" + d.f;
				if (c.indexOf(",") >= 0) c = '"' + c.replace(ig, '""') + '"'
			} else c = "";
			l.push(c)
		}
		if (f.blankrows === false && o) return null;
		return l.join(s)
	}

	function fg(e, r) {
		var t = [];
		var a = r == null ? {} : r;
		if (e == null || e["!ref"] == null) return "";
		var n = ct(e["!ref"]);
		var i = a.FS !== undefined ? a.FS : ",",
			s = i.charCodeAt(0);
		var f = a.RS !== undefined ? a.RS : "\n",
			o = f.charCodeAt(0);
		var l = new RegExp((i == "|" ? "\\|" : i) + "+$");
		var c = "",
			h = [];
		a.dense = Array.isArray(e);
		var u = a.skipHidden && e["!cols"] || [];
		var d = a.skipHidden && e["!rows"] || [];
		for (var p = n.s.c; p <= n.e.c; ++p)
			if (!(u[p] || {}).hidden) h[p] = tt(p);
		for (var v = n.s.r; v <= n.e.r; ++v) {
			if ((d[v] || {}).hidden) continue;
			c = sg(e, n, v, h, s, o, i, a);
			if (c == null) {
				continue
			}
			if (a.strip) c = c.replace(l, "");
			t.push(c + f)
		}
		delete a.dense;
		return t.join("")
	}

	function og(e, r) {
		if (!r) r = {};
		r.FS = "\t";
		r.RS = "\n";
		var t = fg(e, r);
		if (typeof cptable == "undefined" || r.type == "string") return t;
		var a = cptable.utils.encode(1200, t, "str");
		return String.fromCharCode(255) + String.fromCharCode(254) + a
	}

	function lg(e) {
		var r = "",
			t, a = "";
		if (e == null || e["!ref"] == null) return [];
		var n = ct(e["!ref"]),
			i = "",
			s = [],
			f;
		var o = [];
		var l = Array.isArray(e);
		for (f = n.s.c; f <= n.e.c; ++f) s[f] = tt(f);
		for (var c = n.s.r; c <= n.e.r; ++c) {
			i = Jr(c);
			for (f = n.s.c; f <= n.e.c; ++f) {
				r = s[f] + i;
				t = l ? (e[c] || [])[f] : e[r];
				a = "";
				if (t === undefined) continue;
				else if (t.F != null) {
					r = t.F;
					if (!t.f) continue;
					a = t.f;
					if (r.indexOf(":") == -1) r = r + ":" + r
				}
				if (t.f != null) a = t.f;
				else if (t.t == "z") continue;
				else if (t.t == "n" && t.v != null) a = "" + t.v;
				else if (t.t == "b") a = t.v ? "TRUE" : "FALSE";
				else if (t.w !== undefined) a = "'" + t.w;
				else if (t.v === undefined) continue;
				else if (t.t == "s") a = "'" + t.v;
				else a = "" + t.v;
				o[o.length] = r + "=" + a
			}
		}
		return o
	}

	function cg(e, r, t) {
		var a = t || {};
		var n = +!a.skipHeader;
		var i = e || {};
		var s = 0,
			f = 0;
		if (i && a.origin != null) {
			if (typeof a.origin == "number") s = a.origin;
			else {
				var o = typeof a.origin == "string" ? st(a.origin) : a.origin;
				s = o.r;
				f = o.c
			}
		}
		var l;
		var c = {
			s: {
				c: 0,
				r: 0
			},
			e: {
				c: f,
				r: s + r.length - 1 + n
			}
		};
		if (i["!ref"]) {
			var h = ct(i["!ref"]);
			c.e.c = Math.max(c.e.c, h.e.c);
			c.e.r = Math.max(c.e.r, h.e.r);
			if (s == -1) {
				s = c.e.r + 1;
				c.e.r = s + r.length - 1 + n
			}
		}
		var u = a.header || [],
			d = 0;
		r.forEach(function(e, r) {
			z(e).filter(function(r) {
				return e.hasOwnProperty(r)
			}).forEach(function(t) {
				if ((d = u.indexOf(t)) == -1) u[d = u.length] = t;
				var o = e[t];
				var c = "z";
				var h = "";
				if (typeof o == "number") c = "n";
				else if (typeof o == "boolean") c = "b";
				else if (typeof o == "string") c = "s";
				else if (o instanceof Date) {
					c = "d";
					if (!a.cellDates) {
						c = "n";
						o = Q(o)
					}
					h = a.dateNF || y._table[14]
				}
				i[ft({
					c: f + d,
					r: s + r + n
				})] = l = {
					t: c,
					v: o
				};
				if (h) l.z = h
			})
		});
		c.e.c = Math.max(c.e.c, f + u.length - 1);
		var p = Jr(s);
		if (n)
			for (d = 0; d < u.length; ++d) i[tt(d + f) + p] = {
				t: "s",
				v: u[d]
			};
		i["!ref"] = lt(c);
		return i
	}

	function hg(e, r) {
		return cg(null, e, r)
	}
	var ug = {
		encode_col: tt,
		encode_row: Jr,
		encode_cell: ft,
		encode_range: lt,
		decode_col: rt,
		decode_row: Qr,
		split_cell: it,
		decode_cell: st,
		decode_range: ot,
		format_cell: ut,
		get_formulae: lg,
		make_csv: fg,
		make_json: ng,
		make_formulae: lg,
		sheet_add_aoa: pt,
		sheet_add_json: cg,
		aoa_to_sheet: vt,
		json_to_sheet: hg,
		table_to_sheet: lv,
		table_to_book: cv,
		sheet_to_csv: fg,
		sheet_to_txt: og,
		sheet_to_json: ng,
		sheet_to_html: ov.from_sheet,
		sheet_to_dif: Ws.from_sheet,
		sheet_to_slk: Hs.from_sheet,
		sheet_to_eth: Vs.from_sheet,
		sheet_to_formulae: lg,
		sheet_to_row_object_array: ng
	};
	(function(e) {
		e.consts = e.consts || {};

		function r(r) {
			r.forEach(function(r) {
				e.consts[r[0]] = r[1]
			})
		}

		function t(e, r, t) {
			return e[r] != null ? e[r] : e[r] = t
		}

		function a(e, r, t) {
			if (typeof r == "string") return e[r] || (e[r] = {
				t: "z"
			});
			if (typeof r != "number") return a(e, ft(r));
			return a(e, ft({
				r: r,
				c: t || 0
			}))
		}

		function n(e, r) {
			if (typeof r == "number") {
				if (r >= 0 && e.SheetNames.length > r) return r;
				throw new Error("Cannot find sheet # " + r)
			} else if (typeof r == "string") {
				var t = e.SheetNames.indexOf(r);
				if (t > -1) return t;
				throw new Error("Cannot find sheet name |" + r + "|")
			} else throw new Error("Cannot find sheet |" + r + "|")
		}
		e.book_new = function() {
			return {
				SheetNames: [],
				Sheets: {}
			}
		};
		e.book_append_sheet = function(e, r, t) {
			if (!t)
				for (var a = 1; a <= 65535; ++a)
					if (e.SheetNames.indexOf(t = "Sheet" + a) == -1) break;
			if (!t) throw new Error("Too many worksheets");
			Sd(t);
			if (e.SheetNames.indexOf(t) >= 0) throw new Error("Worksheet with name |" + t + "| already exists!");
			e.SheetNames.push(t);
			e.Sheets[t] = r
		};
		e.book_set_sheet_visibility = function(e, r, a) {
			t(e, "Workbook", {});
			t(e.Workbook, "Sheets", []);
			var i = n(e, r);
			t(e.Workbook.Sheets, i, {});
			switch (a) {
				case 0:
					;
				case 1:
					;
				case 2:
					break;
				default:
					throw new Error("Bad sheet visibility setting " + a);
			}
			e.Workbook.Sheets[i].Hidden = a
		};
		r([
			["SHEET_VISIBLE", 0],
			["SHEET_HIDDEN", 1],
			["SHEET_VERY_HIDDEN", 2]
		]);
		e.cell_set_number_format = function(e, r) {
			e.z = r;
			return e
		};
		e.cell_set_hyperlink = function(e, r, t) {
			if (!r) {
				delete e.l
			} else {
				e.l = {
					Target: r
				};
				if (t) e.l.Tooltip = t
			}
			return e
		};
		e.cell_set_internal_link = function(r, t, a) {
			return e.cell_set_hyperlink(r, "#" + t, a)
		};
		e.cell_add_comment = function(e, r, t) {
			if (!e.c) e.c = [];
			e.c.push({
				t: r,
				a: t || "SheetJS"
			})
		};
		e.sheet_set_array_formula = function(e, r, t) {
			var n = typeof r != "string" ? r : ct(r);
			var i = typeof r == "string" ? r : lt(r);
			for (var s = n.s.r; s <= n.e.r; ++s)
				for (var f = n.s.c; f <= n.e.c; ++f) {
					var o = a(e, s, f);
					o.t = "n";
					o.F = i;
					delete o.v;
					if (s == n.s.r && f == n.s.c) o.f = t
				}
			return e
		};
		return e
	})(ug);
	if (C && typeof require != "undefined")(function() {
		var e = {}.Readable;
		var t = function(r, t) {
			var a = e();
			var n = t == null ? {} : t;
			if (r == null || r["!ref"] == null) {
				a.push(null);
				return a
			}
			var i = ct(r["!ref"]);
			var s = n.FS !== undefined ? n.FS : ",",
				f = s.charCodeAt(0);
			var o = n.RS !== undefined ? n.RS : "\n",
				l = o.charCodeAt(0);
			var c = new RegExp((s == "|" ? "\\|" : s) + "+$");
			var h = "",
				u = [];
			n.dense = Array.isArray(r);
			var d = n.skipHidden && r["!cols"] || [];
			var p = n.skipHidden && r["!rows"] || [];
			for (var v = i.s.c; v <= i.e.c; ++v)
				if (!(d[v] || {}).hidden) u[v] = tt(v);
			var g = i.s.r;
			a._read = function() {
				if (g > i.e.r) return a.push(null);
				while (g <= i.e.r) {
					++g;
					if ((p[g - 1] || {}).hidden) continue;
					h = sg(r, i, g - 1, u, f, l, s, n);
					if (h != null) {
						if (n.strip) h = h.replace(c, "");
						a.push(h + o);
						break
					}
				}
			};
			return a
		};
		var a = function(r, t) {
			var a = e();
			var n = t || {};
			var i = n.header != null ? n.header : ov.BEGIN;
			var s = n.footer != null ? n.footer : ov.END;
			a.push(i);
			var f = ot(r["!ref"]);
			n.dense = Array.isArray(r);
			a.push(ov._preamble(r, f, n));
			var o = f.s.r;
			var l = false;
			a._read = function() {
				if (o > f.e.r) {
					if (!l) {
						l = true;
						a.push("</table>" + s)
					}
					return a.push(null)
				}
				while (o <= f.e.r) {
					a.push(ov._row(r, f, o, n));
					++o;
					break
				}
			};
			return a
		};
		r.stream = {
			to_html: a,
			to_csv: t
		}
	})();
	r.parse_xlscfb = Up;
	r.parse_ods = uv;
	r.parse_fods = dv;
	r.write_ods = gv;
	r.parse_zip = Nv;
	r.read = Kv;
	r.readFile = Yv;
	r.readFileSync = Yv;
	r.write = eg;
	r.writeFile = tg;
	r.writeFileSync = tg;
	r.writeFileAsync = ag;
	r.utils = ug;
	r.SSF = y;
	r.CFB = L
})(typeof exports !== "undefined" ? exports : XLSX);
var XLS = XLSX,
	ODS = XLSX;
