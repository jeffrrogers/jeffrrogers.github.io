(function dartProgram(){function copyProperties(a,b){var t=Object.keys(a)
for(var s=0;s<t.length;s++){var r=t[s]
b[r]=a[r]}}function mixinPropertiesHard(a,b){var t=Object.keys(a)
for(var s=0;s<t.length;s++){var r=t[s]
if(!b.hasOwnProperty(r)){b[r]=a[r]}}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var t=function(){}
t.prototype={p:{}}
var s=new t()
if(!(Object.getPrototypeOf(s)&&Object.getPrototypeOf(s).p===t.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var r=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(r))return true}}catch(q){}return false}()
function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){Object.setPrototypeOf(a.prototype,b.prototype)
return}var t=Object.create(b.prototype)
copyProperties(a.prototype,t)
a.prototype=t}}function inheritMany(a,b){for(var t=0;t<b.length;t++){inherit(b[t],a)}}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazy(a,b,c,d){var t=a
a[b]=t
a[c]=function(){if(a[b]===t){a[b]=d()}a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var t=a
a[b]=t
a[c]=function(){if(a[b]===t){var s=d()
if(a[b]!==t){A.iv(b)}a[b]=s}var r=a[b]
a[c]=function(){return r}
return r}}function makeConstList(a,b){if(b!=null)A.e(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var t=0;t<a.length;++t){convertToFastObject(a[t])}}var y=0
function instanceTearOffGetter(a,b){var t=null
return a?function(c){if(t===null)t=A.dM(b)
return new t(c,this)}:function(){if(t===null)t=A.dM(b)
return new t(this,null)}}function staticTearOffGetter(a){var t=null
return function(){if(t===null)t=A.dM(a).prototype
return t}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number"){h+=x}return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var t=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var s=staticTearOffGetter(t)
a[b]=s}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var t=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var s=instanceTearOffGetter(c,t)
a[b]=s}function setOrUpdateInterceptorsByTag(a){var t=v.interceptorsByTag
if(!t){v.interceptorsByTag=a
return}copyProperties(a,t)}function setOrUpdateLeafTags(a){var t=v.leafTags
if(!t){v.leafTags=a
return}copyProperties(a,t)}function updateTypes(a){var t=v.types
var s=t.length
t.push.apply(t,a)
return s}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var t=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},s=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:t(0,0,null,["$0"],0),_instance_1u:t(0,1,null,["$1"],0),_instance_2u:t(0,2,null,["$2"],0),_instance_0i:t(1,0,null,["$0"],0),_instance_1i:t(1,1,null,["$1"],0),_instance_2i:t(1,2,null,["$2"],0),_static_0:s(0,null,["$0"],0),_static_1:s(1,null,["$1"],0),_static_2:s(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,updateHolder:updateHolder,convertToFastObject:convertToFastObject,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var J={
dS(a,b,c,d){return{i:a,p:b,e:c,x:d}},
dO(a){var t,s,r,q,p,o="_$dart_js",n=a[v.dispatchPropertyName]
if(n==null)if($.dP==null){A.ig()
n=a[v.dispatchPropertyName]}if(n!=null){t=n.p
if(!1===t)return n.i
if(!0===t)return a
s=Object.getPrototypeOf(a)
if(t===s)return n.i
if(n.e===s)throw A.d(A.ek("Return interceptor for "+A.i(t(a,n))))}r=a.constructor
if(r==null)q=null
else{p=$.cS
if(p==null)p=$.cS=A.d2(o)
q=r[p]}if(q!=null)return q
q=A.im(a)
if(q!=null)return q
if(typeof a=="function")return B.J
t=Object.getPrototypeOf(a)
if(t==null)return B.z
if(t===Object.prototype)return B.z
if(typeof r=="function"){p=$.cS
if(p==null)p=$.cS=A.d2(o)
Object.defineProperty(r,p,{value:B.u,enumerable:false,writable:true,configurable:true})
return B.u}return B.u},
fz(a,b){if(a<0||a>4294967295)throw A.d(A.av(a,0,4294967295,"length",null))
return J.fA(new Array(a),b)},
e6(a,b){if(a<0)throw A.d(A.ck("Length must be a non-negative integer: "+a))
return A.e(new Array(a),b.h("l<0>"))},
fA(a,b){var t=A.e(a,b.h("l<0>"))
t.$flags=1
return t},
fB(a,b){var t=u.V
return J.dX(t.a(a),t.a(b))},
e7(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
fC(a,b){var t,s
for(t=a.length;b<t;){s=a.charCodeAt(b)
if(s!==32&&s!==13&&!J.e7(s))break;++b}return b},
fD(a,b){var t,s,r
for(t=a.length;b>0;b=s){s=b-1
if(!(s<t))return A.b(a,s)
r=a.charCodeAt(s)
if(r!==32&&r!==13&&!J.e7(r))break}return b},
aC(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.aY.prototype
return J.bO.prototype}if(typeof a=="string")return J.ac.prototype
if(a==null)return J.aZ.prototype
if(typeof a=="boolean")return J.bN.prototype
if(Array.isArray(a))return J.l.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ad.prototype
if(typeof a=="symbol")return J.b1.prototype
if(typeof a=="bigint")return J.b_.prototype
return a}if(a instanceof A.q)return a
return J.dO(a)},
dN(a){if(typeof a=="string")return J.ac.prototype
if(a==null)return a
if(Array.isArray(a))return J.l.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ad.prototype
if(typeof a=="symbol")return J.b1.prototype
if(typeof a=="bigint")return J.b_.prototype
return a}if(a instanceof A.q)return a
return J.dO(a)},
aD(a){if(a==null)return a
if(Array.isArray(a))return J.l.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ad.prototype
if(typeof a=="symbol")return J.b1.prototype
if(typeof a=="bigint")return J.b_.prototype
return a}if(a instanceof A.q)return a
return J.dO(a)},
ia(a){if(typeof a=="number")return J.aI.prototype
if(typeof a=="string")return J.ac.prototype
if(a==null)return a
if(!(a instanceof A.q))return J.aw.prototype
return a},
ib(a){if(typeof a=="string")return J.ac.prototype
if(a==null)return a
if(!(a instanceof A.q))return J.aw.prototype
return a},
M(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.aC(a).J(a,b)},
v(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.ij(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.dN(a).n(a,b)},
dW(a,b){return J.aD(a).k(a,b)},
dX(a,b){return J.ia(a).B(a,b)},
dY(a,b){return J.aD(a).F(a,b)},
a1(a){return J.aC(a).gq(a)},
fd(a){return J.aD(a).gaP(a)},
dl(a){return J.aD(a).gv(a)},
I(a){return J.dN(a).gl(a)},
fe(a){return J.aC(a).gA(a)},
ff(a,b){return J.aD(a).a4(a,b)},
fg(a,b,c){return J.ib(a).D(a,b,c)},
bz(a){return J.aC(a).i(a)},
bL:function bL(){},
bN:function bN(){},
aZ:function aZ(){},
b0:function b0(){},
ae:function ae(){},
c1:function c1(){},
aw:function aw(){},
ad:function ad(){},
b_:function b_(){},
b1:function b1(){},
l:function l(a){this.$ti=a},
bM:function bM(){},
cx:function cx(a){this.$ti=a},
ak:function ak(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aI:function aI(){},
aY:function aY(){},
bO:function bO(){},
ac:function ac(){}},A={dq:function dq(){},
e9(a){return new A.bR("Field '"+a+"' has been assigned during initialization.")},
ai(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
dA(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
eP(a,b,c){return a},
dQ(a){var t,s
for(t=$.H.length,s=0;s<t;++s)if(a===$.H[s])return!0
return!1},
fV(a,b,c,d){A.dy(b,"start")
A.dy(c,"end")
if(b>c)A.a0(A.av(b,0,c,"start",null))
return new A.bh(a,b,c,d.h("bh<0>"))},
fx(){return new A.bg("No element")},
bR:function bR(a){this.a=a},
cL:function cL(){},
aX:function aX(){},
J:function J(){},
bh:function bh(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
as:function as(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
b6:function b6(a,b,c){this.a=a
this.b=b
this.$ti=c},
S:function S(a,b,c){this.a=a
this.b=b
this.$ti=c},
bl:function bl(a,b,c){this.a=a
this.b=b
this.$ti=c},
r:function r(){},
dm(){throw A.d(A.bk("Cannot modify constant Set"))},
f0(a){var t=A.f_(a)
if(t!=null)return t
return"minified:"+a},
ij(a,b){var t
if(b!=null){t=b.x
if(t!=null)return t}return u.p.b(a)},
i(a){var t
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
t=J.bz(a)
return t},
bd(a){var t,s=$.ed
if(s==null)s=$.ed=Symbol("identityHashCode")
t=a[s]
if(t==null){t=Math.random()*0x3fffffff|0
a[s]=t}return t},
af(a,b){var t,s,r,q,p,o=null,n=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(n==null)return o
if(3>=n.length)return A.b(n,3)
t=n[3]
if(b==null){if(t!=null)return parseInt(a,10)
if(n[2]!=null)return parseInt(a,16)
return o}if(b<2||b>36)throw A.d(A.av(b,2,36,"radix",o))
if(b===10&&t!=null)return parseInt(a,10)
if(b<10||t==null){s=b<=10?47+b:86+b
r=n[1]
for(q=r.length,p=0;p<q;++p)if((r.charCodeAt(p)|32)>s)return o}return parseInt(a,b)},
c2(a){var t,s,r,q
if(a instanceof A.q)return A.G(A.aE(a),null)
t=J.aC(a)
if(t===B.I||t===B.K||u.o.b(a)){s=B.w(a)
if(s!=="Object"&&s!=="")return s
r=a.constructor
if(typeof r=="function"){q=r.name
if(typeof q=="string"&&q!=="Object"&&q!=="")return q}}return A.G(A.aE(a),null)},
ef(a){var t,s,r
if(a==null||typeof a=="number"||A.dJ(a))return J.bz(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.a9)return a.i(0)
if(a instanceof A.Z)return a.aG(!0)
t=$.fc()
for(s=0;s<1;++s){r=t[s].bB(a)
if(r!=null)return r}return"Instance of '"+A.c2(a)+"'"},
x(a){var t
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){t=a-65536
return String.fromCharCode((B.a.aE(t,10)|55296)>>>0,t&1023|56320)}throw A.d(A.av(a,0,1114111,null,null))},
fO(a,b,c,d,e,f,g,h,i){var t,s,r,q=b-1
if(a<100){a+=400
q-=4800}t=B.a.C(h,1000)
s=Date.UTC(a,q,c,d,e,f,g+B.a.t(h-t,1000))
r=!0
if(!isNaN(s))if(!(s<-864e13))if(!(s>864e13))r=s===864e13&&t!==0
if(r)return null
return s},
au(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
fN(a){var t=A.au(a).getUTCFullYear()+0
return t},
fL(a){var t=A.au(a).getUTCMonth()+1
return t},
fH(a){var t=A.au(a).getUTCDate()+0
return t},
fI(a){var t=A.au(a).getUTCHours()+0
return t},
fK(a){var t=A.au(a).getUTCMinutes()+0
return t},
fM(a){var t=A.au(a).getUTCSeconds()+0
return t},
fJ(a){var t=A.au(a).getUTCMilliseconds()+0
return t},
ee(a){var t=A.au(a).getUTCDay()+0
return B.a.C(t+6,7)+1},
b(a,b){if(a==null)J.I(a)
throw A.d(A.cj(a,b))},
cj(a,b){var t,s="index"
if(!A.dK(b))return new A.a2(!0,b,s,null)
t=J.I(a)
if(b<0||b>=t)return A.dn(b,t,a,s)
return new A.aM(null,null,!0,b,s,"Value not in range")},
hZ(a){return new A.a2(!0,a,null,null)},
d(a){return A.w(a,new Error())},
w(a,b){var t
if(a==null)a=new A.bi()
b.dartException=a
t=A.ix
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:t})
b.name=""}else b.toString=t
return b},
ix(){return J.bz(this.dartException)},
a0(a,b){throw A.w(a,b==null?new Error():b)},
aT(a,b,c){var t
if(b==null)b=0
if(c==null)c=0
t=Error()
A.a0(A.hr(a,b,c),t)},
hr(a,b,c){var t,s,r,q,p,o,n,m,l
if(typeof b=="string")t=b
else{s="[]=;add;removeWhere;retainWhere;removeRange;setRange;setInt8;setInt16;setInt32;setUint8;setUint16;setUint32;setFloat32;setFloat64".split(";")
r=s.length
q=b
if(q>r){c=q/r|0
q%=r}t=s[q]}p=typeof c=="string"?c:"modify;remove from;add to".split(";")[c]
o=u.j.b(a)?"list":"ByteData"
n=a.$flags|0
m="a "
if((n&4)!==0)l="constant "
else if((n&2)!==0){l="unmodifiable "
m="an "}else l=(n&1)!==0?"fixed-length ":""
return new A.bj("'"+t+"': Cannot "+p+" "+m+l+o)},
n(a){throw A.d(A.W(a))},
a7(a){var t,s,r,q,p,o
a=A.is(a.replace(String({}),"$receiver$"))
t=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(t==null)t=A.e([],u.s)
s=t.indexOf("\\$arguments\\$")
r=t.indexOf("\\$argumentsExpr\\$")
q=t.indexOf("\\$expr\\$")
p=t.indexOf("\\$method\\$")
o=t.indexOf("\\$receiver\\$")
return new A.cM(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),s,r,q,p,o)},
cN(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(t){return t.message}}(a)},
ej(a){return function($expr$){try{$expr$.$method$}catch(t){return t.message}}(a)},
dr(a,b){var t=b==null,s=t?null:b.method
return new A.bP(a,s,t?null:b.receiver)},
di(a){if(a==null)return new A.cK(a)
if(typeof a!=="object")return a
if("dartException" in a)return A.aG(a,a.dartException)
return A.hY(a)},
aG(a,b){if(u.e.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
hY(a){var t,s,r,q,p,o,n,m,l,k,j,i,h
if(!("message" in a))return a
t=a.message
if("number" in a&&typeof a.number=="number"){s=a.number
r=s&65535
if((B.a.aE(s,16)&8191)===10)switch(r){case 438:return A.aG(a,A.dr(A.i(t)+" (Error "+r+")",null))
case 445:case 5007:A.i(t)
return A.aG(a,new A.bc())}}if(a instanceof TypeError){q=$.f2()
p=$.f3()
o=$.f4()
n=$.f5()
m=$.f8()
l=$.f9()
k=$.f7()
$.f6()
j=$.fb()
i=$.fa()
h=q.H(t)
if(h!=null)return A.aG(a,A.dr(A.z(t),h))
else{h=p.H(t)
if(h!=null){h.method="call"
return A.aG(a,A.dr(A.z(t),h))}else if(o.H(t)!=null||n.H(t)!=null||m.H(t)!=null||l.H(t)!=null||k.H(t)!=null||n.H(t)!=null||j.H(t)!=null||i.H(t)!=null){A.z(t)
return A.aG(a,new A.bc())}}return A.aG(a,new A.ca(typeof t=="string"?t:""))}if(a instanceof RangeError){if(typeof t=="string"&&t.indexOf("call stack")!==-1)return new A.bf()
t=function(b){try{return String(b)}catch(g){}return null}(a)
return A.aG(a,new A.a2(!1,null,null,typeof t=="string"?t.replace(/^RangeError:\s*/,""):t))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof t=="string"&&t==="too much recursion")return new A.bf()
return a},
dT(a){if(a==null)return J.a1(a)
if(typeof a=="object")return A.bd(a)
return J.a1(a)},
i1(a){if(typeof a=="number")return B.t.gq(a)
if(a instanceof A.ci)return A.bd(a)
if(a instanceof A.Z)return a.gq(a)
return A.dT(a)},
eS(a,b){var t,s,r,q=a.length
for(t=0;t<q;t=r){s=t+1
r=s+1
b.j(0,a[t],a[s])}return b},
i8(a,b){var t,s=a.length
for(t=0;t<s;++t)b.k(0,a[t])
return b},
hE(a,b,c,d,e,f){u.Z.a(a)
switch(A.ay(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.d(new A.cR("Unsupported number of arguments for wrapped closure"))},
i2(a,b){var t=a.$identity
if(!!t)return t
t=A.i3(a,b)
a.$identity=t
return t},
i3(a,b){var t
switch(b){case 0:t=a.$0
break
case 1:t=a.$1
break
case 2:t=a.$2
break
case 3:t=a.$3
break
case 4:t=a.$4
break
default:t=null}if(t!=null)return t.bind(a)
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.hE)},
fo(a1){var t,s,r,q,p,o,n,m,l,k,j=a1.co,i=a1.iS,h=a1.iI,g=a1.nDA,f=a1.aI,e=a1.fs,d=a1.cs,c=e[0],b=d[0],a=j[c],a0=a1.fT
a0.toString
t=i?Object.create(new A.c6().constructor.prototype):Object.create(new A.aH(null,null).constructor.prototype)
t.$initialize=t.constructor
s=i?function static_tear_off(){this.$initialize()}:function tear_off(a2,a3){this.$initialize(a2,a3)}
t.constructor=s
s.prototype=t
t.$_name=c
t.$_target=a
r=!i
if(r)q=A.e2(c,a,h,g)
else{t.$static_name=c
q=a}t.$S=A.fk(a0,i,h)
t[b]=q
for(p=q,o=1;o<e.length;++o){n=e[o]
if(typeof n=="string"){m=j[n]
l=n
n=m}else l=""
k=d[o]
if(k!=null){if(r)n=A.e2(l,n,h,g)
t[k]=n}if(o===f)p=n}t.$C=p
t.$R=a1.rC
t.$D=a1.dV
return s},
fk(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.d("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.fh)}throw A.d("Error in functionType of tearoff")},
fl(a,b,c,d){var t=A.e1
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,t)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,t)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,t)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,t)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,t)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,t)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,t)}},
e2(a,b,c,d){if(c)return A.fn(a,b,d)
return A.fl(b.length,d,a,b)},
fm(a,b,c,d){var t=A.e1,s=A.fi
switch(b?-1:a){case 0:throw A.d(new A.c4("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,s,t)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,s,t)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,s,t)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,s,t)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,s,t)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,s,t)
default:return function(e,f,g){return function(){var r=[g(this)]
Array.prototype.push.apply(r,arguments)
return e.apply(f(this),r)}}(d,s,t)}},
fn(a,b,c){var t,s
if($.e_==null)$.e_=A.dZ("interceptor")
if($.e0==null)$.e0=A.dZ("receiver")
t=b.length
s=A.fm(t,c,a,b)
return s},
dM(a){return A.fo(a)},
fh(a,b){return A.by(v.typeUniverse,A.aE(a.a),b)},
e1(a){return a.a},
fi(a){return a.b},
dZ(a){var t,s,r,q=new A.aH("receiver","interceptor"),p=Object.getOwnPropertyNames(q)
p.$flags=1
t=p
for(p=t.length,s=0;s<p;++s){r=t[s]
if(q[r]===a)return r}throw A.d(A.ck("Field name "+a+" not found."))},
d2(a){return v.getIsolateTag(a)},
im(a){var t,s,r,q,p,o=A.z($.eT.$1(a)),n=$.d1[o]
if(n!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}t=$.d6[o]
if(t!=null)return t
s=v.interceptorsByTag[o]
if(s==null){r=A.dH($.eO.$2(a,o))
if(r!=null){n=$.d1[r]
if(n!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}t=$.d6[r]
if(t!=null)return t
s=v.interceptorsByTag[r]
o=r}}if(s==null)return null
t=s.prototype
q=o[0]
if(q==="!"){n=A.dc(t)
$.d1[o]=n
Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}if(q==="~"){$.d6[o]=t
return t}if(q==="-"){p=A.dc(t)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:p,enumerable:false,writable:true,configurable:true})
return p.i}if(q==="+")return A.eW(a,t)
if(q==="*")throw A.d(A.ek(o))
if(v.leafTags[o]===true){p=A.dc(t)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:p,enumerable:false,writable:true,configurable:true})
return p.i}else return A.eW(a,t)},
eW(a,b){var t=Object.getPrototypeOf(a)
Object.defineProperty(t,v.dispatchPropertyName,{value:J.dS(b,t,null,null),enumerable:false,writable:true,configurable:true})
return b},
dc(a){return J.dS(a,!1,null,!!a.$iF)},
ip(a,b,c){var t=b.prototype
if(v.leafTags[a]===true)return A.dc(t)
else return J.dS(t,c,null,null)},
ig(){if(!0===$.dP)return
$.dP=!0
A.ih()},
ih(){var t,s,r,q,p,o,n,m
$.d1=Object.create(null)
$.d6=Object.create(null)
A.ie()
t=v.interceptorsByTag
s=Object.getOwnPropertyNames(t)
if(typeof window!="undefined"){window
r=function(){}
for(q=0;q<s.length;++q){p=s[q]
o=$.eX.$1(p)
if(o!=null){n=A.ip(p,t[p],o)
if(n!=null){Object.defineProperty(o,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
r.prototype=o}}}}for(q=0;q<s.length;++q){p=s[q]
if(/^[A-Za-z_]/.test(p)){m=t[p]
t["!"+p]=m
t["~"+p]=m
t["-"+p]=m
t["+"+p]=m
t["*"+p]=m}}},
ie(){var t,s,r,q,p,o,n=B.B()
n=A.aR(B.C,A.aR(B.D,A.aR(B.v,A.aR(B.v,A.aR(B.E,A.aR(B.F,A.aR(B.G(B.w),n)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){t=dartNativeDispatchHooksTransformer
if(typeof t=="function")t=[t]
if(Array.isArray(t))for(s=0;s<t.length;++s){r=t[s]
if(typeof r=="function")n=r(n)||n}}q=n.getTag
p=n.getUnknownTag
o=n.prototypeForTag
$.eT=new A.d3(q)
$.eO=new A.d4(p)
$.eX=new A.d5(o)},
aR(a,b){return a(b)||b},
i5(a,b){var t=b.length,s=v.rttc[""+t+";"+a]
if(s==null)return null
if(t===0)return s
if(t===s.length)return s.apply(null,b)
return s(b)},
iu(a,b,c){var t=a.indexOf(b,c)
return t>=0},
is(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
a_:function a_(a,b){this.a=a
this.b=b},
bs:function bs(a,b,c){this.a=a
this.b=b
this.c=c},
aU:function aU(){},
bm:function bm(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
N:function N(a,b){this.a=a
this.$ti=b},
aV:function aV(){},
aW:function aW(a,b,c){this.a=a
this.b=b
this.$ti=c},
be:function be(){},
cM:function cM(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bc:function bc(){},
bP:function bP(a,b,c){this.a=a
this.b=b
this.c=c},
ca:function ca(a){this.a=a},
cK:function cK(a){this.a=a},
a9:function a9(){},
bD:function bD(){},
bE:function bE(){},
c8:function c8(){},
c6:function c6(){},
aH:function aH(a,b){this.a=a
this.b=b},
c4:function c4(a){this.a=a},
a4:function a4(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
cF:function cF(a,b){this.a=a
this.b=b
this.c=null},
O:function O(a,b){this.a=a
this.$ti=b},
ap:function ap(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
cG:function cG(a,b){this.a=a
this.$ti=b},
aq:function aq(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
an:function an(a,b){this.a=a
this.$ti=b},
ao:function ao(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b2:function b2(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
d3:function d3(a){this.a=a},
d4:function d4(a){this.a=a},
d5:function d5(a){this.a=a},
Z:function Z(){},
aO:function aO(){},
aP:function aP(){},
eE(a,b,c){if(a>>>0!==a||a>=c)throw A.d(A.cj(b,a))},
aK:function aK(){},
b9:function b9(){},
bS:function bS(){},
aL:function aL(){},
b7:function b7(){},
b8:function b8(){},
bT:function bT(){},
bU:function bU(){},
bV:function bV(){},
bW:function bW(){},
bX:function bX(){},
bY:function bY(){},
bZ:function bZ(){},
ba:function ba(){},
c_:function c_(){},
bo:function bo(){},
bp:function bp(){},
bq:function bq(){},
br:function br(){},
dz(a,b){var t=b.c
return t==null?b.c=A.bw(a,"e5",[b.x]):t},
eg(a){var t=a.w
if(t===6||t===7)return A.eg(a.x)
return t===11||t===12},
fT(a){return a.as},
aB(a){return A.cX(v.typeUniverse,a,!1)},
az(a0,a1,a2,a3){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=a1.w
switch(a){case 5:case 1:case 2:case 3:case 4:return a1
case 6:t=a1.x
s=A.az(a0,t,a2,a3)
if(s===t)return a1
return A.et(a0,s,!0)
case 7:t=a1.x
s=A.az(a0,t,a2,a3)
if(s===t)return a1
return A.es(a0,s,!0)
case 8:r=a1.y
q=A.aQ(a0,r,a2,a3)
if(q===r)return a1
return A.bw(a0,a1.x,q)
case 9:p=a1.x
o=A.az(a0,p,a2,a3)
n=a1.y
m=A.aQ(a0,n,a2,a3)
if(o===p&&m===n)return a1
return A.dF(a0,o,m)
case 10:l=a1.x
k=a1.y
j=A.aQ(a0,k,a2,a3)
if(j===k)return a1
return A.eu(a0,l,j)
case 11:i=a1.x
h=A.az(a0,i,a2,a3)
g=a1.y
f=A.hV(a0,g,a2,a3)
if(h===i&&f===g)return a1
return A.er(a0,h,f)
case 12:e=a1.y
a3+=e.length
d=A.aQ(a0,e,a2,a3)
p=a1.x
o=A.az(a0,p,a2,a3)
if(d===e&&o===p)return a1
return A.dG(a0,o,d,!0)
case 13:c=a1.x
if(c<a3)return a1
b=a2[c-a3]
if(b==null)return a1
return b
default:throw A.d(A.bC("Attempted to substitute unexpected RTI kind "+a))}},
aQ(a,b,c,d){var t,s,r,q,p=b.length,o=A.cY(p)
for(t=!1,s=0;s<p;++s){r=b[s]
q=A.az(a,r,c,d)
if(q!==r)t=!0
o[s]=q}return t?o:b},
hW(a,b,c,d){var t,s,r,q,p,o,n=b.length,m=A.cY(n)
for(t=!1,s=0;s<n;s+=3){r=b[s]
q=b[s+1]
p=b[s+2]
o=A.az(a,p,c,d)
if(o!==p)t=!0
m.splice(s,3,r,q,o)}return t?m:b},
hV(a,b,c,d){var t,s=b.a,r=A.aQ(a,s,c,d),q=b.b,p=A.aQ(a,q,c,d),o=b.c,n=A.hW(a,o,c,d)
if(r===s&&p===q&&n===o)return b
t=new A.cc()
t.a=r
t.b=p
t.c=n
return t},
e(a,b){a[v.arrayRti]=b
return a},
eQ(a){var t=a.$S
if(t!=null){if(typeof t=="number")return A.id(t)
return a.$S()}return null},
ii(a,b){var t
if(A.eg(b))if(a instanceof A.a9){t=A.eQ(a)
if(t!=null)return t}return A.aE(a)},
aE(a){if(a instanceof A.q)return A.m(a)
if(Array.isArray(a))return A.y(a)
return A.dI(J.aC(a))},
y(a){var t=a[v.arrayRti],s=u.b
if(t==null)return s
if(t.constructor!==s.constructor)return s
return t},
m(a){var t=a.$ti
return t!=null?t:A.dI(a)},
dI(a){var t=a.constructor,s=t.$ccache
if(s!=null)return s
return A.hC(a,t)},
hC(a,b){var t=a instanceof A.a9?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,s=A.hf(v.typeUniverse,t.name)
b.$ccache=s
return s},
id(a){var t,s=v.types,r=s[a]
if(typeof r=="string"){t=A.cX(v.typeUniverse,r,!1)
s[a]=t
return t}return r},
ic(a){return A.aA(A.m(a))},
dL(a){var t
if(a instanceof A.Z)return A.i6(a.$r,a.ad())
t=a instanceof A.a9?A.eQ(a):null
if(t!=null)return t
if(u.E.b(a))return J.fe(a).a
if(Array.isArray(a))return A.y(a)
return A.aE(a)},
aA(a){var t=a.r
return t==null?a.r=new A.ci(a):t},
i6(a,b){var t,s,r=b,q=r.length
if(q===0)return u.A
if(0>=q)return A.b(r,0)
t=A.by(v.typeUniverse,A.dL(r[0]),"@<0>")
for(s=1;s<q;++s){if(!(s<r.length))return A.b(r,s)
t=A.ew(v.typeUniverse,t,A.dL(r[s]))}return A.by(v.typeUniverse,t,a)},
U(a){return A.aA(A.cX(v.typeUniverse,a,!1))},
hB(a){var t=this
t.b=A.hU(t)
return t.b(a)},
hU(a){var t,s,r,q,p
if(a===u.K)return A.hK
if(A.aF(a))return A.hO
t=a.w
if(t===6)return A.hy
if(t===1)return A.eL
if(t===7)return A.hF
s=A.hT(a)
if(s!=null)return s
if(t===8){r=a.x
if(a.y.every(A.aF)){a.f="$i"+r
if(r==="h")return A.hI
if(a===u.m)return A.hH
return A.hN}}else if(t===10){q=A.i5(a.x,a.y)
p=q==null?A.eL:q
return p==null?A.eD(p):p}return A.hw},
hT(a){if(a.w===8){if(a===u.S)return A.dK
if(a===u.i||a===u.H)return A.hJ
if(a===u.N)return A.hM
if(a===u.y)return A.dJ}return null},
hA(a){var t=this,s=A.hv
if(A.aF(t))s=A.hm
else if(t===u.K)s=A.eD
else if(A.aS(t)){s=A.hx
if(t===u.a3)s=A.hk
else if(t===u.aD)s=A.dH
else if(t===u.cG)s=A.hi
else if(t===u.n)s=A.eC
else if(t===u.dd)s=A.hj
else if(t===u.z)s=A.hl}else if(t===u.S)s=A.ay
else if(t===u.N)s=A.z
else if(t===u.y)s=A.hh
else if(t===u.H)s=A.eB
else if(t===u.i)s=A.ez
else if(t===u.m)s=A.eA
t.a=s
return t.a(a)},
hw(a){var t=this
if(a==null)return A.aS(t)
return A.ik(v.typeUniverse,A.ii(a,t),t)},
hy(a){if(a==null)return!0
return this.x.b(a)},
hN(a){var t,s=this
if(a==null)return A.aS(s)
t=s.f
if(a instanceof A.q)return!!a[t]
return!!J.aC(a)[t]},
hI(a){var t,s=this
if(a==null)return A.aS(s)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
t=s.f
if(a instanceof A.q)return!!a[t]
return!!J.aC(a)[t]},
hH(a){var t=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.q)return!!a[t.f]
return!0}if(typeof a=="function")return!0
return!1},
eK(a){if(typeof a=="object"){if(a instanceof A.q)return u.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
hv(a){var t=this
if(a==null){if(A.aS(t))return a}else if(t.b(a))return a
throw A.w(A.eG(a,t),new Error())},
hx(a){var t=this
if(a==null||t.b(a))return a
throw A.w(A.eG(a,t),new Error())},
eG(a,b){return new A.bu("TypeError: "+A.em(a,A.G(b,null)))},
em(a,b){return A.bJ(a)+": type '"+A.G(A.dL(a),null)+"' is not a subtype of type '"+b+"'"},
L(a,b){return new A.bu("TypeError: "+A.em(a,b))},
hF(a){var t=this
return t.x.b(a)||A.dz(v.typeUniverse,t).b(a)},
hK(a){return a!=null},
eD(a){if(a!=null)return a
throw A.w(A.L(a,"Object"),new Error())},
hO(a){return!0},
hm(a){return a},
eL(a){return!1},
dJ(a){return!0===a||!1===a},
hh(a){if(!0===a)return!0
if(!1===a)return!1
throw A.w(A.L(a,"bool"),new Error())},
hi(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.w(A.L(a,"bool?"),new Error())},
ez(a){if(typeof a=="number")return a
throw A.w(A.L(a,"double"),new Error())},
hj(a){if(typeof a=="number")return a
if(a==null)return a
throw A.w(A.L(a,"double?"),new Error())},
dK(a){return typeof a=="number"&&Math.floor(a)===a},
ay(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.w(A.L(a,"int"),new Error())},
hk(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.w(A.L(a,"int?"),new Error())},
hJ(a){return typeof a=="number"},
eB(a){if(typeof a=="number")return a
throw A.w(A.L(a,"num"),new Error())},
eC(a){if(typeof a=="number")return a
if(a==null)return a
throw A.w(A.L(a,"num?"),new Error())},
hM(a){return typeof a=="string"},
z(a){if(typeof a=="string")return a
throw A.w(A.L(a,"String"),new Error())},
dH(a){if(typeof a=="string")return a
if(a==null)return a
throw A.w(A.L(a,"String?"),new Error())},
eA(a){if(A.eK(a))return a
throw A.w(A.L(a,"JSObject"),new Error())},
hl(a){if(a==null)return a
if(A.eK(a))return a
throw A.w(A.L(a,"JSObject?"),new Error())},
eN(a,b){var t,s,r
for(t="",s="",r=0;r<a.length;++r,s=", ")t+=s+A.G(a[r],b)
return t},
hS(a,b){var t,s,r,q,p,o,n=a.x,m=a.y
if(""===n)return"("+A.eN(m,b)+")"
t=m.length
s=n.split(",")
r=s.length-t
for(q="(",p="",o=0;o<t;++o,p=", "){q+=p
if(r===0)q+="{"
q+=A.G(m[o],b)
if(r>=0)q+=" "+s[r];++r}return q+"})"},
eH(a2,a3,a4){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=", ",a1=null
if(a4!=null){t=a4.length
if(a3==null)a3=A.e([],u.s)
else a1=a3.length
s=a3.length
for(r=t;r>0;--r)B.b.k(a3,"T"+(s+r))
for(q=u.X,p="<",o="",r=0;r<t;++r,o=a0){n=a3.length
m=n-1-r
if(!(m>=0))return A.b(a3,m)
p=p+o+a3[m]
l=a4[r]
k=l.w
if(!(k===2||k===3||k===4||k===5||l===q))p+=" extends "+A.G(l,a3)}p+=">"}else p=""
q=a2.x
j=a2.y
i=j.a
h=i.length
g=j.b
f=g.length
e=j.c
d=e.length
c=A.G(q,a3)
for(b="",a="",r=0;r<h;++r,a=a0)b+=a+A.G(i[r],a3)
if(f>0){b+=a+"["
for(a="",r=0;r<f;++r,a=a0)b+=a+A.G(g[r],a3)
b+="]"}if(d>0){b+=a+"{"
for(a="",r=0;r<d;r+=3,a=a0){b+=a
if(e[r+1])b+="required "
b+=A.G(e[r+2],a3)+" "+e[r]}b+="}"}if(a1!=null){a3.toString
a3.length=a1}return p+"("+b+") => "+c},
G(a,b){var t,s,r,q,p,o,n,m=a.w
if(m===5)return"erased"
if(m===2)return"dynamic"
if(m===3)return"void"
if(m===1)return"Never"
if(m===4)return"any"
if(m===6){t=a.x
s=A.G(t,b)
r=t.w
return(r===11||r===12?"("+s+")":s)+"?"}if(m===7)return"FutureOr<"+A.G(a.x,b)+">"
if(m===8){q=A.hX(a.x)
p=a.y
return p.length>0?q+("<"+A.eN(p,b)+">"):q}if(m===10)return A.hS(a,b)
if(m===11)return A.eH(a,b,null)
if(m===12)return A.eH(a.x,b,a.y)
if(m===13){o=a.x
n=b.length
o=n-1-o
if(!(o>=0&&o<n))return A.b(b,o)
return b[o]}return"?"},
hX(a){var t=A.f_(a)
if(t!=null)return t
return"minified:"+a},
hg(a,b){var t=a.tR[b]
while(typeof t=="string")t=a.tR[t]
return t},
hf(a,b){var t,s,r,q,p,o=a.eT,n=o[b]
if(n==null)return A.cX(a,b,!1)
else if(typeof n=="number"){t=n
s=A.bx(a,5,"#")
r=A.cY(t)
for(q=0;q<t;++q)r[q]=s
p=A.bw(a,b,r)
o[b]=p
return p}else return n},
he(a,b){return A.ex(a.tR,b)},
hd(a,b){return A.ex(a.eT,b)},
cX(a,b,c){var t,s=a.eC,r=s.get(b)
if(r!=null)return r
t=A.ev(a,null,b,!1)
s.set(b,t)
return t},
by(a,b,c){var t,s,r=b.z
if(r==null)r=b.z=new Map()
t=r.get(c)
if(t!=null)return t
s=A.ev(a,b,c,!0)
r.set(c,s)
return s},
ew(a,b,c){var t,s,r,q=b.Q
if(q==null)q=b.Q=new Map()
t=c.as
s=q.get(t)
if(s!=null)return s
r=A.dF(a,b,c.w===9?c.y:[c])
q.set(t,r)
return r},
ev(a,b,c,d){return A.h6(A.h0(a,b,c,d))},
aj(a,b){b.a=A.hA
b.b=A.hB
return b},
bx(a,b,c){var t,s,r=a.eC.get(c)
if(r!=null)return r
t=new A.Q(null,null)
t.w=b
t.as=c
s=A.aj(a,t)
a.eC.set(c,s)
return s},
et(a,b,c){var t,s=b.as+"?",r=a.eC.get(s)
if(r!=null)return r
t=A.hb(a,b,s,c)
a.eC.set(s,t)
return t},
hb(a,b,c,d){var t,s,r
if(d){t=b.w
s=!0
if(!A.aF(b))if(!(b===u.P||b===u.T))if(t!==6)s=t===7&&A.aS(b.x)
if(s)return b
else if(t===1)return u.P}r=new A.Q(null,null)
r.w=6
r.x=b
r.as=c
return A.aj(a,r)},
es(a,b,c){var t,s=b.as+"/",r=a.eC.get(s)
if(r!=null)return r
t=A.h9(a,b,s,c)
a.eC.set(s,t)
return t},
h9(a,b,c,d){var t,s
if(d){t=b.w
if(A.aF(b)||b===u.K)return b
else if(t===1)return A.bw(a,"e5",[b])
else if(b===u.P||b===u.T)return u.bc}s=new A.Q(null,null)
s.w=7
s.x=b
s.as=c
return A.aj(a,s)},
hc(a,b){var t,s,r=""+b+"^",q=a.eC.get(r)
if(q!=null)return q
t=new A.Q(null,null)
t.w=13
t.x=b
t.as=r
s=A.aj(a,t)
a.eC.set(r,s)
return s},
bv(a){var t,s,r,q=a.length
for(t="",s="",r=0;r<q;++r,s=",")t+=s+a[r].as
return t},
h8(a){var t,s,r,q,p,o=a.length
for(t="",s="",r=0;r<o;r+=3,s=","){q=a[r]
p=a[r+1]?"!":":"
t+=s+q+p+a[r+2].as}return t},
bw(a,b,c){var t,s,r,q=b
if(c.length>0)q+="<"+A.bv(c)+">"
t=a.eC.get(q)
if(t!=null)return t
s=new A.Q(null,null)
s.w=8
s.x=b
s.y=c
if(c.length>0)s.c=c[0]
s.as=q
r=A.aj(a,s)
a.eC.set(q,r)
return r},
dF(a,b,c){var t,s,r,q,p,o
if(b.w===9){t=b.x
s=b.y.concat(c)}else{s=c
t=b}r=t.as+(";<"+A.bv(s)+">")
q=a.eC.get(r)
if(q!=null)return q
p=new A.Q(null,null)
p.w=9
p.x=t
p.y=s
p.as=r
o=A.aj(a,p)
a.eC.set(r,o)
return o},
eu(a,b,c){var t,s,r="+"+(b+"("+A.bv(c)+")"),q=a.eC.get(r)
if(q!=null)return q
t=new A.Q(null,null)
t.w=10
t.x=b
t.y=c
t.as=r
s=A.aj(a,t)
a.eC.set(r,s)
return s},
er(a,b,c){var t,s,r,q,p,o=b.as,n=c.a,m=n.length,l=c.b,k=l.length,j=c.c,i=j.length,h="("+A.bv(n)
if(k>0){t=m>0?",":""
h+=t+"["+A.bv(l)+"]"}if(i>0){t=m>0?",":""
h+=t+"{"+A.h8(j)+"}"}s=o+(h+")")
r=a.eC.get(s)
if(r!=null)return r
q=new A.Q(null,null)
q.w=11
q.x=b
q.y=c
q.as=s
p=A.aj(a,q)
a.eC.set(s,p)
return p},
dG(a,b,c,d){var t,s=b.as+("<"+A.bv(c)+">"),r=a.eC.get(s)
if(r!=null)return r
t=A.ha(a,b,c,s,d)
a.eC.set(s,t)
return t},
ha(a,b,c,d,e){var t,s,r,q,p,o,n,m
if(e){t=c.length
s=A.cY(t)
for(r=0,q=0;q<t;++q){p=c[q]
if(p.w===1){s[q]=p;++r}}if(r>0){o=A.az(a,b,s,0)
n=A.aQ(a,c,s,0)
return A.dG(a,o,n,c!==n)}}m=new A.Q(null,null)
m.w=12
m.x=b
m.y=c
m.as=d
return A.aj(a,m)},
h0(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
h6(a){var t,s,r,q,p,o,n,m=a.r,l=a.s
for(t=m.length,s=0;s<t;){r=m.charCodeAt(s)
if(r>=48&&r<=57)s=A.h2(s+1,r,m,l)
else if((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124)s=A.eo(a,s,m,l,!1)
else if(r===46)s=A.eo(a,s,m,l,!0)
else{++s
switch(r){case 44:break
case 58:l.push(!1)
break
case 33:l.push(!0)
break
case 59:l.push(A.ax(a.u,a.e,l.pop()))
break
case 94:l.push(A.hc(a.u,l.pop()))
break
case 35:l.push(A.bx(a.u,5,"#"))
break
case 64:l.push(A.bx(a.u,2,"@"))
break
case 126:l.push(A.bx(a.u,3,"~"))
break
case 60:l.push(a.p)
a.p=l.length
break
case 62:A.h4(a,l)
break
case 38:A.h3(a,l)
break
case 63:q=a.u
l.push(A.et(q,A.ax(q,a.e,l.pop()),a.n))
break
case 47:q=a.u
l.push(A.es(q,A.ax(q,a.e,l.pop()),a.n))
break
case 40:l.push(-3)
l.push(a.p)
a.p=l.length
break
case 41:A.h1(a,l)
break
case 91:l.push(a.p)
a.p=l.length
break
case 93:p=l.splice(a.p)
A.ep(a.u,a.e,p)
a.p=l.pop()
l.push(p)
l.push(-1)
break
case 123:l.push(a.p)
a.p=l.length
break
case 125:p=l.splice(a.p)
A.h7(a.u,a.e,p)
a.p=l.pop()
l.push(p)
l.push(-2)
break
case 43:o=m.indexOf("(",s)
l.push(m.substring(s,o))
l.push(-4)
l.push(a.p)
a.p=l.length
s=o+1
break
default:throw"Bad character "+r}}}n=l.pop()
return A.ax(a.u,a.e,n)},
h2(a,b,c,d){var t,s,r=b-48
for(t=c.length;a<t;++a){s=c.charCodeAt(a)
if(!(s>=48&&s<=57))break
r=r*10+(s-48)}d.push(r)
return a},
eo(a,b,c,d,e){var t,s,r,q,p,o,n=b+1
for(t=c.length;n<t;++n){s=c.charCodeAt(n)
if(s===46){if(e)break
e=!0}else{if(!((((s|32)>>>0)-97&65535)<26||s===95||s===36||s===124))r=s>=48&&s<=57
else r=!0
if(!r)break}}q=c.substring(b,n)
if(e){t=a.u
p=a.e
if(p.w===9)p=p.x
o=A.hg(t,p.x)[q]
if(o==null)A.a0('No "'+q+'" in "'+A.fT(p)+'"')
d.push(A.by(t,p,o))}else d.push(q)
return n},
h4(a,b){var t,s=a.u,r=A.en(a,b),q=b.pop()
if(typeof q=="string")b.push(A.bw(s,q,r))
else{t=A.ax(s,a.e,q)
switch(t.w){case 11:b.push(A.dG(s,t,r,a.n))
break
default:b.push(A.dF(s,t,r))
break}}},
h1(a,b){var t,s,r,q=a.u,p=b.pop(),o=null,n=null
if(typeof p=="number")switch(p){case-1:o=b.pop()
break
case-2:n=b.pop()
break
default:b.push(p)
break}else b.push(p)
t=A.en(a,b)
p=b.pop()
switch(p){case-3:p=b.pop()
if(o==null)o=q.sEA
if(n==null)n=q.sEA
s=A.ax(q,a.e,p)
r=new A.cc()
r.a=t
r.b=o
r.c=n
b.push(A.er(q,s,r))
return
case-4:b.push(A.eu(q,b.pop(),t))
return
default:throw A.d(A.bC("Unexpected state under `()`: "+A.i(p)))}},
h3(a,b){var t=b.pop()
if(0===t){b.push(A.bx(a.u,1,"0&"))
return}if(1===t){b.push(A.bx(a.u,4,"1&"))
return}throw A.d(A.bC("Unexpected extended operation "+A.i(t)))},
en(a,b){var t=b.splice(a.p)
A.ep(a.u,a.e,t)
a.p=b.pop()
return t},
ax(a,b,c){if(typeof c=="string")return A.bw(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.h5(a,b,c)}else return c},
ep(a,b,c){var t,s=c.length
for(t=0;t<s;++t)c[t]=A.ax(a,b,c[t])},
h7(a,b,c){var t,s=c.length
for(t=2;t<s;t+=3)c[t]=A.ax(a,b,c[t])},
h5(a,b,c){var t,s,r=b.w
if(r===9){if(c===0)return b.x
t=b.y
s=t.length
if(c<=s)return t[c-1]
c-=s
b=b.x
r=b.w}else if(c===0)return b
if(r!==8)throw A.d(A.bC("Indexed base must be an interface type"))
t=b.y
if(c<=t.length)return t[c-1]
throw A.d(A.bC("Bad index "+c+" for "+b.i(0)))},
ik(a,b,c){var t,s=b.d
if(s==null)s=b.d=new Map()
t=s.get(c)
if(t==null){t=A.u(a,b,null,c,null)
s.set(c,t)}return t},
u(a,b,c,d,e){var t,s,r,q,p,o,n,m,l,k,j
if(b===d)return!0
if(A.aF(d))return!0
t=b.w
if(t===4)return!0
if(A.aF(b))return!1
if(b.w===1)return!0
s=t===13
if(s)if(A.u(a,c[b.x],c,d,e))return!0
r=d.w
q=u.P
if(b===q||b===u.T){if(r===7)return A.u(a,b,c,d.x,e)
return d===q||d===u.T||r===6}if(d===u.K){if(t===7)return A.u(a,b.x,c,d,e)
return t!==6}if(t===7){if(!A.u(a,b.x,c,d,e))return!1
return A.u(a,A.dz(a,b),c,d,e)}if(t===6)return A.u(a,q,c,d,e)&&A.u(a,b.x,c,d,e)
if(r===7){if(A.u(a,b,c,d.x,e))return!0
return A.u(a,b,c,A.dz(a,d),e)}if(r===6)return A.u(a,b,c,q,e)||A.u(a,b,c,d.x,e)
if(s)return!1
q=t!==11
if((!q||t===12)&&d===u.Z)return!0
p=t===10
if(p&&d===u.x)return!0
if(r===12){if(b===u.L)return!0
if(t!==12)return!1
o=b.y
n=d.y
m=o.length
if(m!==n.length)return!1
c=c==null?o:o.concat(c)
e=e==null?n:n.concat(e)
for(l=0;l<m;++l){k=o[l]
j=n[l]
if(!A.u(a,k,c,j,e)||!A.u(a,j,e,k,c))return!1}return A.eJ(a,b.x,c,d.x,e)}if(r===11){if(b===u.L)return!0
if(q)return!1
return A.eJ(a,b,c,d,e)}if(t===8){if(r!==8)return!1
return A.hG(a,b,c,d,e)}if(p&&r===10)return A.hL(a,b,c,d,e)
return!1},
eJ(a2,a3,a4,a5,a6){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
if(!A.u(a2,a3.x,a4,a5.x,a6))return!1
t=a3.y
s=a5.y
r=t.a
q=s.a
p=r.length
o=q.length
if(p>o)return!1
n=o-p
m=t.b
l=s.b
k=m.length
j=l.length
if(p+k<o+j)return!1
for(i=0;i<p;++i){h=r[i]
if(!A.u(a2,q[i],a6,h,a4))return!1}for(i=0;i<n;++i){h=m[i]
if(!A.u(a2,q[p+i],a6,h,a4))return!1}for(i=0;i<j;++i){h=m[n+i]
if(!A.u(a2,l[i],a6,h,a4))return!1}g=t.c
f=s.c
e=g.length
d=f.length
for(c=0,b=0;b<d;b+=3){a=f[b]
for(;;){if(c>=e)return!1
a0=g[c]
c+=3
if(a<a0)return!1
a1=g[c-2]
if(a0<a){if(a1)return!1
continue}h=f[b+1]
if(a1&&!h)return!1
h=g[c-1]
if(!A.u(a2,f[b+2],a6,h,a4))return!1
break}}while(c<e){if(g[c+1])return!1
c+=3}return!0},
hG(a,b,c,d,e){var t,s,r,q,p,o=b.x,n=d.x
while(o!==n){t=a.tR[o]
if(t==null)return!1
if(typeof t=="string"){o=t
continue}s=t[n]
if(s==null)return!1
r=s.length
q=r>0?new Array(r):v.typeUniverse.sEA
for(p=0;p<r;++p)q[p]=A.by(a,b,s[p])
return A.ey(a,q,null,c,d.y,e)}return A.ey(a,b.y,null,c,d.y,e)},
ey(a,b,c,d,e,f){var t,s=b.length
for(t=0;t<s;++t)if(!A.u(a,b[t],d,e[t],f))return!1
return!0},
hL(a,b,c,d,e){var t,s=b.y,r=d.y,q=s.length
if(q!==r.length)return!1
if(b.x!==d.x)return!1
for(t=0;t<q;++t)if(!A.u(a,s[t],c,r[t],e))return!1
return!0},
aS(a){var t=a.w,s=!0
if(!(a===u.P||a===u.T))if(!A.aF(a))if(t!==6)s=t===7&&A.aS(a.x)
return s},
aF(a){var t=a.w
return t===2||t===3||t===4||t===5||a===u.X},
ex(a,b){var t,s,r=Object.keys(b),q=r.length
for(t=0;t<q;++t){s=r[t]
a[s]=b[s]}},
cY(a){return a>0?new Array(a):v.typeUniverse.sEA},
Q:function Q(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
cc:function cc(){this.c=this.b=this.a=null},
ci:function ci(a){this.a=a},
cb:function cb(){},
bu:function bu(a){this.a=a},
c7:function c7(){},
ar(a,b,c){return b.h("@<0>").a6(c).h("ds<1,2>").a(A.eS(a,new A.a4(b.h("@<0>").a6(c).h("a4<1,2>"))))},
a5(a,b){return new A.a4(a.h("@<0>").a6(b).h("a4<1,2>"))},
dt(a){return new A.T(a.h("T<0>"))},
aJ(a){return new A.T(a.h("T<0>"))},
du(a,b){return b.h("ea<0>").a(A.i8(a,new A.T(b.h("T<0>"))))},
dC(){var t=Object.create(null)
t["<non-identifier-key>"]=t
delete t["<non-identifier-key>"]
return t},
bn(a,b,c){var t=new A.a8(a,b,c.h("a8<0>"))
t.c=a.e
return t},
b5(a,b){var t,s,r=A.dt(b)
for(t=a.length,s=0;s<a.length;a.length===t||(0,A.n)(a),++s)r.k(0,b.a(a[s]))
return r},
dv(a,b){var t=A.dt(b)
t.L(0,a)
return t},
dw(a){var t,s
if(A.dQ(a))return"{...}"
t=new A.ah("")
try{s={}
B.b.k($.H,a)
t.a+="{"
s.a=!0
a.M(0,new A.cJ(s,t))
t.a+="}"}finally{if(0>=$.H.length)return A.b($.H,-1)
$.H.pop()}s=t.a
return s.charCodeAt(0)==0?s:s},
T:function T(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
cf:function cf(a){this.a=a
this.c=this.b=null},
a8:function a8(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
p:function p(){},
B:function B(){},
cJ:function cJ(a,b){this.a=a
this.b=b},
ag:function ag(){},
bt:function bt(){},
hR(a,b){var t,s,r,q=null
try{q=JSON.parse(a)}catch(s){t=A.di(s)
r=String(t)
throw A.d(new A.cw(r))}r=A.cZ(q)
return r},
cZ(a){var t
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.cd(a,Object.create(null))
for(t=0;t<a.length;++t)a[t]=A.cZ(a[t])
return a},
e8(a,b,c){return new A.b3(a,b)},
hq(a){return a.bH()},
fZ(a,b){return new A.cT(a,[],A.i4())},
h_(a,b,c){var t,s=new A.ah(""),r=A.fZ(s,b)
r.a2(a)
t=s.a
return t.charCodeAt(0)==0?t:t},
cd:function cd(a,b){this.a=a
this.b=b
this.c=null},
ce:function ce(a){this.a=a},
bF:function bF(){},
bH:function bH(){},
b3:function b3(a,b){this.a=a
this.b=b},
bQ:function bQ(a,b){this.a=a
this.b=b},
cy:function cy(){},
cA:function cA(a){this.b=a},
cz:function cz(a){this.a=a},
cU:function cU(){},
cV:function cV(a,b){this.a=a
this.b=b},
cT:function cT(a,b,c){this.c=a
this.a=b
this.b=c},
cE:function cE(){},
cI(a,b,c,d){var t,s=c?J.e6(a,d):J.fz(a,d)
if(a!==0&&b!=null)for(t=0;t<s.length;++t)s[t]=b
return s},
fG(a,b,c){var t,s,r=A.e([],c.h("l<0>"))
for(t=a.length,s=0;s<a.length;a.length===t||(0,A.n)(a),++s)B.b.k(r,c.a(a[s]))
r.$flags=1
return r},
cH(a,b){var t,s
if(Array.isArray(a))return A.e(a.slice(0),b.h("l<0>"))
t=A.e([],b.h("l<0>"))
for(s=J.dl(a);s.m();)B.b.k(t,s.gu())
return t},
eb(a,b){var t=A.fG(a,!1,b)
t.$flags=3
return t},
ei(a,b,c){var t=J.dl(b)
if(!t.m())return a
if(c.length===0){do a+=A.i(t.gu())
while(t.m())}else{a+=A.i(t.gu())
while(t.m())a=a+c+A.i(t.gu())}return a},
fp(a,b,c){var t=A.fO(a,b,c,0,0,0,0,0,!0)
return new A.ab(t==null?new A.cu(a,b,c,0,0,0,0,0).$0():t,0,!0)},
fq(a){var t=Math.abs(a),s=a<0?"-":""
if(t>=1000)return""+a
if(t>=100)return s+"0"+t
if(t>=10)return s+"00"+t
return s+"000"+t},
e4(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bI(a){if(a>=10)return""+a
return"0"+a},
cv(a){return new A.al(864e8*a)},
bJ(a){if(typeof a=="number"||A.dJ(a)||a==null)return J.bz(a)
if(typeof a=="string")return JSON.stringify(a)
return A.ef(a)},
bC(a){return new A.bB(a)},
ck(a){return new A.a2(!1,null,null,a)},
bA(a,b,c){return new A.a2(!0,a,b,c)},
fR(a){var t=null
return new A.aM(t,t,!1,t,t,a)},
av(a,b,c,d,e){return new A.aM(b,c,!0,a,d,"Invalid value")},
fS(a,b,c){if(0>a||a>c)throw A.d(A.av(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.d(A.av(b,a,c,"end",null))
return b}return c},
dy(a,b){return a},
dn(a,b,c,d){return new A.bK(b,!0,a,d,"Index out of range")},
bk(a){return new A.bj(a)},
ek(a){return new A.c9(a)},
eh(a){return new A.bg(a)},
W(a){return new A.bG(a)},
fy(a,b,c){var t,s
if(A.dQ(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}t=A.e([],u.s)
B.b.k($.H,a)
try{A.hP(a,t)}finally{if(0>=$.H.length)return A.b($.H,-1)
$.H.pop()}s=A.ei(b,u.h.a(t),", ")+c
return s.charCodeAt(0)==0?s:s},
dp(a,b,c){var t,s
if(A.dQ(a))return b+"..."+c
t=new A.ah(b)
B.b.k($.H,a)
try{s=t
s.a=A.ei(s.a,a,", ")}finally{if(0>=$.H.length)return A.b($.H,-1)
$.H.pop()}t.a+=c
s=t.a
return s.charCodeAt(0)==0?s:s},
hP(a,b){var t,s,r,q,p,o,n,m=a.gv(a),l=0,k=0
for(;;){if(!(l<80||k<3))break
if(!m.m())return
t=A.i(m.gu())
B.b.k(b,t)
l+=t.length+2;++k}if(!m.m()){if(k<=5)return
if(0>=b.length)return A.b(b,-1)
s=b.pop()
if(0>=b.length)return A.b(b,-1)
r=b.pop()}else{q=m.gu();++k
if(!m.m()){if(k<=4){B.b.k(b,A.i(q))
return}s=A.i(q)
if(0>=b.length)return A.b(b,-1)
r=b.pop()
l+=s.length+2}else{p=m.gu();++k
for(;m.m();q=p,p=o){o=m.gu();++k
if(k>100){for(;;){if(!(l>75&&k>3))break
if(0>=b.length)return A.b(b,-1)
l-=b.pop().length+2;--k}B.b.k(b,"...")
return}}r=A.i(q)
s=A.i(p)
l+=s.length+r.length+4}}if(k>b.length+2){l+=5
n="..."}else n=null
for(;;){if(!(l>80&&b.length>3))break
if(0>=b.length)return A.b(b,-1)
l-=b.pop().length+2
if(n==null){l+=5
n="..."}}if(n!=null)B.b.k(b,n)
B.b.k(b,r)
B.b.k(b,s)},
dx(a,b,c,d){var t
if(B.k===c){t=B.a.gq(a)
b=J.a1(b)
return A.dA(A.ai(A.ai($.dk(),t),b))}if(B.k===d){t=B.a.gq(a)
b=J.a1(b)
c=J.a1(c)
return A.dA(A.ai(A.ai(A.ai($.dk(),t),b),c))}t=B.a.gq(a)
b=J.a1(b)
c=J.a1(c)
d=J.a1(d)
d=A.dA(A.ai(A.ai(A.ai(A.ai($.dk(),t),b),c),d))
return d},
cu:function cu(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
ab:function ab(a,b,c){this.a=a
this.b=b
this.c=c},
al:function al(a){this.a=a},
cQ:function cQ(){},
o:function o(){},
bB:function bB(a){this.a=a},
bi:function bi(){},
a2:function a2(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
aM:function aM(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
bK:function bK(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
bj:function bj(a){this.a=a},
c9:function c9(a){this.a=a},
bg:function bg(a){this.a=a},
bG:function bG(a){this.a=a},
c0:function c0(){},
bf:function bf(){},
cR:function cR(a){this.a=a},
cw:function cw(a){this.a=a},
c:function c(){},
at:function at(a,b,c){this.a=a
this.b=b
this.$ti=c},
bb:function bb(){},
q:function q(){},
ah:function ah(a){this.a=a},
cg:function cg(){this.b=this.a=0},
eZ(a,b){var t=B.X.n(0,a)
t.toString
if(a===6)return t.aY(B.O[B.a.C(B.a.t(b-1,7),5)])
return t},
aa:function aa(a,b){this.a=a
this.b=b},
V:function V(a,b){this.a=a
this.b=b},
P:function P(a,b,c,d,e,f,g,h,i,j,k){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k},
fr(a){var t
A:{if("A"===a){t=B.d
break A}if("D"===a){t=B.e
break A}t=null
break A}return t},
e3(a,b,c){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f=null
if(c<=0||a<=0)return f
t=u.S
s=A.a5(t,u.N)
r=A.a5(t,u.v)
for(t=u.t,q=0;q<b.length;++q){p=b[q]
o=p.a
n=o.length
if(n===0)return f
for(m=0;m<n;++m){l=p.a_(m)
k=l.a
j=l.b
if(k<0||j<0||k>=a||j>=c)return f
i=k*c+j
h=s.n(0,i)
if(h!=null&&h!==o[m])return f
s.j(0,i,o[m])
g=r.n(0,i)
if(g==null){g=A.e([],t)
r.j(0,i,g)}B.b.k(g,q)}}return new A.co(c,a,A.eb(b,u.c),s,r)},
a3:function a3(a,b,c){this.c=a
this.a=b
this.b=c},
a6:function a6(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
co:function co(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=$},
cp:function cp(a,b,c){this.a=a
this.b=b
this.c=c},
cq:function cq(a){this.a=a},
cr:function cr(a){this.a=a},
ct:function ct(a){this.a=a},
cs:function cs(a){this.a=a},
fP(a,b,c,d,e){var t=c.gU()
A.b5(t,A.y(t).c)
A.b5(a,A.y(a).c)
return new A.c3(d,c,a,b,e)},
i0(a,b){var t
A.z(a)
A.z(b)
t=B.a.B(a.length,b.length)
return t!==0?t:B.c.B(a,b)},
c3:function c3(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
iq(a){var t
A:{if(B.o===a){t=B.aa
break A}if(B.p===a){t=B.a9
break A}t=null
break A}return t},
c5:function c5(a){this.a=a},
eU(a){var t,s,r,q,p,o,n,m,l=$.dj.n(0,a)
if(l==null)l=A.i7("Missing "+a+". Run tools/build_dictionary.dart.")
t=A.e([],u.B)
for(s=B.x.aL(l),r=s.length,q=0;q<s.length;s.length===r||(0,A.n)(s),++q){p=s[q]
o=B.c.aO(p,"\t")
if(o<=0)continue
n=B.c.D(p,0,o)
m=A.af(B.c.aW(B.c.W(p,o+1)),null)
B.b.k(t,new A.X(n,m==null?0:m))}return t},
fj(a3){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a="tools\\data\\dict_blocked.txt",a0=A.dR("tools\\data\\dict_bonus_only.txt"),a1=A.dR("tools\\data\\stoplist.txt"),a2=u.N
a1=A.dv(a1,a2)
a1.L(0,a0)
t=A.dR("tools\\data\\allowlist.txt")
s=$.dj.n(0,a)!=null?A.eU(a):B.T
r=A.aJ(a2)
for(q=s.length,p=0;p<s.length;s.length===q||(0,A.n)(s),++p)r.k(0,s[p].a)
o=A.a5(u.S,u.u)
q=u.O
n=A.cH(a3,q)
B.b.L(n,s)
m=n.length
l=u.B
p=0
for(;p<n.length;n.length===m||(0,A.n)(n),++p){k=n[p]
j=k.a.length
i=o.n(0,j)
if(i==null){i=A.e([],l)
o.j(0,j,i)
j=i}else j=i
J.dW(j,k)}for(n=o.$ti,m=new A.aq(o,o.r,o.e,n.h("aq<2>"));m.m();){l=m.d
j=new A.cn()
i=l.length-1
if(i<=32)A.dE(l,0,i,j,q)
else A.dD(l,0,i,j,q)}h=A.a5(u.l,u.C)
for(q=A.m(t),m=q.h("a8<1>"),q=q.c,n=n.h("ao<1,2>"),p=0;p<3;++p){g=B.V[p]
f=A.aJ(a2)
for(l=new A.ao(o,o.r,o.e,n);l.m();){j=l.d
j.toString
e=B.a0.n(0,g).n(0,j.a)
if(e==null)e=0
if(e<=0)continue
d=j.b
c=B.t.bt(d.length*e)
b=0
for(;;){if(!(b<c&&b<d.length))break
A:{if(!(b<d.length))return A.b(d,b)
j=d[b]
if(j.b<=0)break
if(a1.p(0,j.a))break A
if(!(b<d.length))return A.b(d,b)
if(r.p(0,d[b].a))break A
if(!(b<d.length))return A.b(d,b)
f.k(0,d[b].a)}++b}}for(l=new A.a8(t,t.r,m),l.c=t.e;l.m();){j=l.d
if(j==null)j=q.a(j)
if(!a1.p(0,j))f.k(0,j)}h.j(0,g,f)}return new A.cm(h,a0)},
dR(a){var t,s,r,q,p,o=$.dj.n(0,a)
if(o==null)return A.aJ(u.N)
t=A.aJ(u.N)
for(s=B.x.aL(o),r=s.length,q=0;q<s.length;s.length===r||(0,A.n)(s),++q){p=B.c.aW(s[q])
if(p.length===0||B.c.ar(p,"#"))continue
t.k(0,p.toUpperCase())}return t},
X:function X(a,b){this.a=a
this.b=b},
cm:function cm(a,b){this.a=a
this.b=b},
cn:function cn(){},
il(b0,b1){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=b0.b,a9=b0.c
if(a8.length+1<a9)return null
t=b0.f
s=t===B.q
r=s?A.hs(b0):B.R
if(s&&r.length===0)return null
for(s=b0.w,q=b0.r,p=u.s,o=u.N,n=b0.d-a9+1,m=u.S,l=u.D,k=b0.a,j=null,i=0;i<260;++i){h=A.e([],l)
g=A.aJ(o)
f=new A.cO(b0,A.iq(t),A.a5(m,m),A.a5(m,m),h,g)
if(!f.b0(b1,r))continue
e=a9+b1.S(n)
d=A.cH(a8,o)
B.b.aq(d,b1)
c=new A.d7()
b=d.length-1
if(b<=32)A.dE(d,0,b,c,o)
else A.dD(d,0,b,c,o)
for(a=0;a0=a+1,a0<d.length;a=a0)if(b1.an()<0.25){c=d.length
if(!(a<c))return A.b(d,a)
a1=d[a]
if(!(a0<c))return A.b(d,a0)
d[a]=d[a0]
d[a0]=a1}c=A.e([],p)
for(b=d.length,a2=0;a2<d.length;d.length===b||(0,A.n)(d),++a2){a3=d[a2]
if(a3.length>3)c.push(a3)}b=A.e([],p)
for(a4=d.length,a2=0;a2<d.length;d.length===a4||(0,A.n)(d),++a2){a3=d[a2]
if(a3.length===3)b.push(a3)}f.aN(c,e-q,b1)
f.aN(b,e,b1)
if(h.length<a9||!g.p(0,k))continue
if(!f.b1())continue
a5=f.aV()
if(a5==null||a5.aX().length!==0)continue
a6=a5.gU()
h=A.y(a6)
g=h.h("A(1)")
h=h.h("S<1>")
if(new A.S(a6,g.a(new A.d8()),h).gl(0)<q)continue
if(new A.S(a6,g.a(new A.d9()),h).gl(0)<s)continue
a7=f.bs(a5)
if(j==null||a7>j.b)j=new A.cB(a5,a7)}return j},
hs(a7){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=u.s,a6=A.e([a7.a],a5)
B.b.L(a6,a7.b)
t=A.e([],u.R)
for(s=a6.length,r=0;r<a6.length;a6.length===s||(0,A.n)(a6),++r){q=a6[r]
for(p=q.length,o=0;o<p;++o)for(n=o+2;n<p;++n)for(m=a6.length,l=n-o,k=l-1,j=m,i=0;i<j;j===m||(0,A.n)(a6),++i){h=a6[i]
if(h!==q){if(0>=h.length)return A.b(h,0)
g=h[0]!==q[o]}else g=!0
if(g)continue
for(g=h.length,f=0;e=a6.length,f<e;a6.length===j||(0,A.n)(a6),++f){d=a6[f]
e=!0
if(d!==q)if(d!==h){if(0>=d.length)return A.b(d,0)
e=d[0]!==q[n]}if(e)continue
e=d.length
c=Math.min(g,e)-1
for(b=2;b<=c;++b){if(k*(b-1)<2)continue
for(a=a6.length,a0=0;a0<a6.length;a6.length===a||(0,A.n)(a6),++a0){a1=a6[a0]
if(a1===q||a1===h||a1===d)continue
if(A.hQ(a7,A.e([q,h,d,a1],a5)))continue
for(a2=a1.length,a3=0;a3+l<a2;++a3){if(!(a3<a2))return A.b(a1,a3)
a4=a1[a3]
if(!(b<g))return A.b(h,b)
if(a4===h[b]){a4=a3+n-o
if(!(a4>=0&&a4<a2))return A.b(a1,a4)
a4=a1[a4]
if(!(b<e))return A.b(d,b)
a4=a4===d[b]}else a4=!1
if(a4)B.b.k(t,new A.K(q,h,d,a1,0,o,n,o-a3,b))}}}}j=e}if(t.length>400)break}A.eq(t,new A.d_(a7),u.M)
return t},
hQ(a,b){var t,s,r,q
for(t=a.x,s=0,r=0;r<4;++r){q=t.n(0,b[r])
if(q==null)continue;++s
if(B.b.p(b,q))return!0}return s>1},
el(a,b){return(a+64)*256+(b+64)},
cC:function cC(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
cB:function cB(a,b){this.a=a
this.b=b},
d7:function d7(){},
d8:function d8(){},
d9:function d9(){},
K:function K(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
d_:function d_(a){this.a=a},
d0:function d0(a){this.a=a},
cO:function cO(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=0
_.w=1048576
_.x=-1048576
_.y=1048576
_.z=-1048576
_.Q=0
_.as=-1
_.at=0
_.ax=-1
_.ay=null},
cP:function cP(){},
ir(b1,b2,b3,b4){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8="EEEEEEEEEEEETTTTTTTTTAAAAAAAAOOOOOOOIIIIIIINNNNNNNHHHHHRRRRRRDDDDLLLLUUUCCCMMWWFFGGYYPPBB",a9=b1.length,b0=b2.b
if(a9>b0)return B.S
t=b0-a9
s=A.aJ(u.N)
if(t===0)s.k(0,b1)
else for(b0=u.s,r=0;r<60;++r){for(q=b1,p=0;p<t;++p,q=o){o=b4.S(89)
if(!(o>=0&&o<89))return A.b(a8,o)
o=q+a8[o]}q=A.e((q.charCodeAt(0)==0?q:q).split(""),b0)
B.b.a3(q)
s.k(0,B.b.al(q))}n=A.e([],u.Y)
for(b0=A.bn(s,s.r,s.$ti.c),q=b2.r,a9=a9>=6,o=u.Q,m=u.U,l=b2.d+2,k=b2.c,j=b2.f,i=b3.c.a,h=u.s,g=b0.$ti.c,f=b2.w,e=q+1,q=q===0,d=f+1,f=f===0;b0.m();){c=b0.d
if(c==null)c=g.a(c)
b=b3.b4(c)
a=A.e([],h)
for(a0=b.length,a1=0;a1<b.length;b.length===a0||(0,A.n)(b),++a1){a2=b[a1]
if(a2!==b1&&a2.length>=k&&i.n(0,j).p(0,a2))a.push(a2)}if(a.length+1<l)continue
a3=new A.S(a,o.a(new A.dd()),m).gl(0)
a0=new A.S(a,o.a(new A.de()),m).gl(0)
a4=a9?1:0
if(a3>=(q?0:e)){a5=f?0:d
a5=a0+a4<a5
a0=a5}else a0=!0
if(a0)continue
B.b.k(n,new A.R(c,b,a))}a6=new A.dg(b3,b2)
a9=u._
b0=u.S
q=A.a5(a9,b0)
for(o=n.length,a1=0;a1<n.length;n.length===o||(0,A.n)(n),++a1){a7=n[a1]
q.j(0,a7,a6.$1(a7))}A.eq(n,new A.df(q),a9)
return A.fV(n,0,A.eP(3,"count",b0),a9).bA(0)},
it(a,b,c){var t,s,r=A.e(a.split(""),u.s)
for(t=0;t<40;++t){B.b.aq(r,c)
s=B.b.al(r)
if(!b.ah(0,new A.dh(s)))return s}return B.b.al(r)},
R:function R(a,b,c){this.b=a
this.c=b
this.d=c},
dd:function dd(){},
de:function de(){},
dg:function dg(a,b){this.a=a
this.b=b},
df:function df(a){this.a=a},
dh:function dh(a){this.a=a},
fE(a){var t,s,r,q,p=new Uint8Array(26)
for(t=a.length,s=0;s<t;++s){r=a.charCodeAt(s)-65
if(!(r>=0&&r<26))return A.b(p,r)
q=p[r]
if(!(r<26))return A.b(p,r)
p[r]=q+1}return p},
fF(a,b){var t,s,r,q,p=A.e([],u.a)
for(t=a.length,s=0;s<a.length;a.length===t||(0,A.n)(a),++s){r=a[s].a
q=r.length
if(q>=3&&q<=7)p.push(new A.b4(r,A.fE(r)))}p=new A.cD(p,A.a5(u.N,u.q),b)
p.b7(a,b)
return p},
b4:function b4(a,b){this.a=a
this.c=b},
cD:function cD(a,b,c){this.a=a
this.b=b
this.c=c},
i9(a,b,c){var t,s=A.eZ(A.ee($.dV().X(0-A.cv(0).a).X(A.cv(b-1).a)),b),r=c.length
if(r<5||r>7)return c+" must be 5 to 7 letters."
t=s.b
if(r>t)return c+" is "+r+" letters, but day "+b+"'s wheel has "+t+"."
if(!a.b.E(c))return c+" isn't in Canagrams' dictionary."
if(a.c.b.p(0,c))return c+" is blocklisted (kept only as a bonus word), so it is never built around."
return null},
i_(c3,c4,c5,c6,c7){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0=A.eZ(A.ee($.dV().X(0-A.cv(0).a).X(A.cv(c3-1).a)),c3),c1=c0.z,c2=A.du([c1,B.j,B.f],u.I)
if(c1===B.f)c2.bz(A.du([B.f],u.X))
c1=u.N
t=A.cI(240,c7,!1,c1)
for(s=A.bn(c2,c2.r,c2.$ti.c),r=u.s,q=c3*7919,p=c0.b,o=s.$ti.c;s.m();){n=s.d
if(n==null)n=o.a(n)
m=c0.aY(n)
A:for(l=m.d,k=m.e,j=m.y,i=m.r,h=m.w,g=n.a*1299709,f=null,e=0,d=0,c=0,b=0;b<240;++b){a=t[b]
if(a.length>p)continue;++c
if(c>240)break A
a0=new A.cg()
a0.b8(q+c*104729+g+17&2147483647)
for(a1=A.ir(a,m,c6,a0),a2=a1.length,a3=0;a3<a1.length;a1.length===a2||(0,A.n)(a1),++a3){a4=a1[a3]
a5=a4.c
a6=A.b5(a5,A.y(a5).c)
a7=A.a5(c1,c1)
for(a8=A.e([a],r),a9=a4.d,B.b.L(a8,a9),b0=a8.length,b1=0;b1<a8.length;a8.length===b0||(0,A.n)(a8),++b1){b2=a8[b1]
b3=c6.b5(b2,a6)
if(b3!=null)a7.j(0,b2,b3)}b4=A.il(new A.cC(a,a9,l,k,j,n,i,h,a7),a0)
if(b4==null)continue
a7=b4.a
a8=a7.gU()
b5=A.b5(a8,A.y(a8).c)
a8=A.e([],r)
for(a9=a5.length,b1=0;b1<a5.length;a5.length===a9||(0,A.n)(a5),++b1){b2=a5[b1]
if(!b5.p(0,b2))a8.push(b2)}B.b.a4(a8,A.eY())
a5=A.it(a4.b,b5,a0)
a9=a7.gU()
A.b5(a9,A.y(a9).c)
A.b5(a8,c1)
b6=new A.c3(a5,a7,a8,a,n)
b7=A.iy(A.eV(b6))
if(b7==null||b7.b.aX().length!==0)throw A.d(A.eh("day "+c3+": a puzzle did not survive its own codec"))
b8=A.eR(a8,b5,c6).length
b9=b8+(c5.p(0,a)?1000:0)
if(f==null||b9<e){f=new A.cl(b6,b8)
e=b9}++d
if(d>=12)break A}}if(f!=null)return f}return null},
cl:function cl(a,b){this.a=a
this.c=b},
hz(a){var t,s,r,q,p,o,n
try{for(q=0;q<5;++q){t=B.P[q]
s=A.dH(a[t])
if(s!=null)$.dj.j(0,"tools\\data\\"+A.i(t),s)}p=A.eU("tools\\data\\dict.txt")
$.eM=A.fF(p,A.fj(p))
o=B.h.K(A.ar(["ok",!0],u.N,u.y),null)
return o}catch(n){r=A.di(n)
o=u.N
o=B.h.K(A.ar(["error",A.i(r)],o,o),null)
return o}},
ho(a){var t,s,r,q,p,o,n,m,l,k,j=null
try{t=$.eM
if(t==null){l=u.N
l=B.h.K(A.ar(["error","canagramsGenInit first"],l,l),j)
return l}s=u.w.a(B.h.bp(a,j))
r=J.v(s,"day")
q=J.v(s,"forced")
if(!A.dK(r)||r<1||typeof q!="string"){l=u.N
l=B.h.K(A.ar(["error","bad request "+a],l,l),j)
return l}p=q.toUpperCase()
o=A.i9(t,r,p)
if(o!=null){l=u.N
l=B.h.K(A.ar(["error",o],l,l),j)
return l}n=A.i_(r,B.Q,B.A,t,p)
if(n==null){l=u.N
l=B.h.K(A.ar(["error","No puzzle for day "+A.i(r)+" fits around "+A.i(p)+"."],l,l),j)
return l}l=B.h.K(A.ar(["line",A.eV(n.a),"word",n.a.d,"distractors",n.c],u.N,u.K),j)
return l}catch(k){m=A.di(k)
l=u.N
l=B.h.K(A.ar(["error",A.i(m)],l,l),j)
return l}},
io(){var t=v.G
t.canagramsGenInit=A.eI(new A.da())
t.canagramsGenBuild=A.eI(new A.db())},
da:function da(){},
db:function db(){},
f_(a){return v.mangledGlobalNames[a]},
iv(a){throw A.w(A.e9(a),new Error())},
iw(){throw A.w(A.e9(""),new Error())},
eI(a){var t
if(typeof a=="function")throw A.d(A.ck("Attempting to rewrap a JS function."))
t=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.hp,a)
t[$.dU()]=a
return t},
hp(a,b,c){u.Z.a(a)
if(A.ay(c)>=1)return a.$1(b)
return a.$0()},
eV(a){var t,s,r,q,p,o,n,m="does not fit one base-36 digit",l=a.b,k=new A.ah("")
for(t=l.c,s=t.length,r=0;r<s;++r){q=t[r]
p=q.b
if(p<0||p>35)A.a0(A.bA(p,"n",m))
p=B.a.T(p,36).toUpperCase()
k.a+=p
p=q.c
if(p<0||p>35)A.a0(A.bA(p,"n",m))
p=B.a.T(p,36).toUpperCase()
k.a=(k.a+=p)+q.d.c
p=q.a.length
if(p>35)A.a0(A.bA(p,"n",m))
p=B.a.T(p,36).toUpperCase()
k.a+=p}o=l.b2(a.d)
t=B.b.am(l.gU(),",")
s=A.ht(a.c)
n=B.b.am(A.e([t,s,A.hn(o<0?0:o)],u.s),"|")
t=a.a
s=k.i(0)
return t+"~"+l.a+","+l.b+","+a.e.a+"~"+k.i(0)+"~"+A.eF(n,t+s,!0)},
iy(a3){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=null
try{a=u.s
t=A.e(a3.split("~"),a)
if(J.I(t)!==4)return a2
s=J.v(t,0)
if(J.I(s)===0)return a2
r=A.e(J.v(t,1).split(","),a)
if(J.I(r)!==3)return a2
q=A.af(J.v(r,0),a2)
p=A.af(J.v(r,1),a2)
if(q==null||p==null||q<=0||p<=0)return a2
o=A.af(J.v(r,2),a2)
if(o==null||o<0||o>=6)return a2
n=J.v(t,2)
if(J.I(n)===0||B.a.C(J.I(n),4)!==0)return a2
m=A.e(A.eF(J.v(t,3),A.i(s)+A.i(n),!1).split("|"),a)
if(J.I(m)!==3)return a2
l=J.v(m,0).length===0?A.e([],a):A.e(J.v(m,0).split(","),a)
if(J.I(l)*4!==J.I(n))return a2
k=A.e([],u.D)
j=0
for(;;){a=j
a0=J.I(l)
if(typeof a!=="number")return a.bG()
if(!(a<a0))break
a=j
if(typeof a!=="number")return a.V()
a0=j
if(typeof a0!=="number")return a0.V()
i=J.fg(n,a*4,a0*4+4)
h=A.af(J.v(i,0),36)
g=A.af(J.v(i,1),36)
f=A.fr(J.v(i,2))
e=A.af(J.v(i,3),36)
if(h==null||g==null||f==null||e==null)return a2
if(e!==J.v(l,j).length)return a2
J.dW(k,new A.a6(J.v(l,j),h,g,f))
a=j
if(typeof a!=="number")return a.bE()
j=a+1}d=A.e3(p,k,q)
if(d==null)return a2
c=A.hu(J.v(m,1))
if(c==null)return a2
J.ff(c,A.eY())
b=A.af(J.v(m,2),36)
if(b==null||b<0||b>=J.I(k))return a2
a=J.v(k,b)
a0=o
if(a0>>>0!==a0||a0>=6)return A.b(B.y,a0)
a0=A.fP(c,a.a,d,s,B.y[a0])
return a0}catch(a1){return a2}},
hn(a){if(a<0||a>35)throw A.d(A.bA(a,"n","does not fit one base-36 digit"))
return B.a.T(a,36).toUpperCase()},
ht(a){var t,s,r,q,p,o,n,m,l,k
if(a.length===0)return""
t=A.cH(a,u.N)
B.b.a3(t)
s=new A.ah("")
for(r="",q=0,p="";q<t.length;++q,r=o){o=t[q]
p=o.length
n=r.length
m=B.a.bo(p<n?p:n,0,35)
l=0
for(;;){if(l<m){if(!(l<p))return A.b(o,l)
if(!(l<n))return A.b(r,l)
k=o.charCodeAt(l)===r.charCodeAt(l)}else k=!1
if(!k)break;++l}if(q>0)s.a+=","
p=B.a.T(l,36).toUpperCase()
p=(s.a+=p)+B.c.W(o,l)
s.a=p}return p.charCodeAt(0)==0?p:p},
hu(a){var t,s,r,q,p,o,n,m,l
if(a.length===0)return A.e([],u.s)
t=A.e([],u.s)
for(s=a.split(","),r=s.length,q="",p=0;p<r;++p,q=l){o=s[p]
n=o.length
if(n===0)return null
if(0>=n)return A.b(o,0)
m=A.af(o[0],36)
if(m==null||m>q.length)return null
l=B.c.D(q,0,m)+B.c.W(o,1)
if(l.length===0)return null
B.b.k(t,l)}return t},
eF(a,b,c){var t,s,r,q,p,o,n,m="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,|"
for(t=b.length,s=3957159,r=0;r<t;++r)s=s*31+b.charCodeAt(r)&2147483647
if(s===0)s=506952121
for(t=a.length,r=0,q="";r<t;++r){s^=s<<13&2147483647
s^=s>>>17
s=(s^s<<5&2147483647)>>>0
p=B.a.C(s,38)
o=a[r]
n=B.c.aO(m,o)
if(n<0){q+=o
continue}q+=m[c?B.a.C(n+p,38):B.a.C(n-p+76,38)]}return q.charCodeAt(0)==0?q:q},
eR(a,b,c){var t,s,r,q,p=A.e([],u.s)
for(t=a.length,s=c.c.a,r=0;r<a.length;a.length===t||(0,A.n)(a),++r){q=a[r]
if(!b.p(0,q)&&s.n(0,B.i).p(0,q))p.push(q)}return p},
i7(a){return A.a0(A.eh(a))},
eq(a,b,c){A.ch(a,0,a.length-1,b,c)},
ch(a,b,c,d,e){if(c-b<=32)A.dE(a,b,c,d,e)
else A.dD(a,b,c,d,e)},
dE(a,b,c,d,e){var t,s,r,q,p,o
for(t=b+1,s=J.aD(a);t<=c;++t){if(!(t>=0&&t<a.length))return A.b(a,t)
r=a[t]
q=t
for(;;){if(q>b){p=q-1
if(!(p>=0&&p<a.length))return A.b(a,p)
p=d.$2(a[p],r)
if(typeof p!=="number")return p.G()
p=p>0}else p=!1
if(!p)break
o=q-1
if(!(o>=0&&o<a.length))return A.b(a,o)
s.j(a,q,a[o])
q=o}s.j(a,q,r)}},
dD(a2,a3,a4,a5,a6){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=B.a.t(a4-a3+1,6),d=a3+e,c=a4-e,b=B.a.t(a3+a4,2),a=b-e,a0=b+e,a1=a2.length
if(!(d>=0&&d<a1))return A.b(a2,d)
t=a2[d]
if(!(a>=0&&a<a1))return A.b(a2,a)
s=a2[a]
if(!(b>=0&&b<a1))return A.b(a2,b)
r=a2[b]
if(!(a0>=0&&a0<a1))return A.b(a2,a0)
q=a2[a0]
if(!(c>=0&&c<a1))return A.b(a2,c)
p=a2[c]
a1=a5.$2(t,s)
if(typeof a1!=="number")return a1.G()
if(a1>0){o=s
s=t
t=o}a1=a5.$2(q,p)
if(typeof a1!=="number")return a1.G()
if(a1>0){o=p
p=q
q=o}a1=a5.$2(t,r)
if(typeof a1!=="number")return a1.G()
if(a1>0){o=r
r=t
t=o}a1=a5.$2(s,r)
if(typeof a1!=="number")return a1.G()
if(a1>0){o=r
r=s
s=o}a1=a5.$2(t,q)
if(typeof a1!=="number")return a1.G()
if(a1>0){o=q
q=t
t=o}a1=a5.$2(r,q)
if(typeof a1!=="number")return a1.G()
if(a1>0){o=q
q=r
r=o}a1=a5.$2(s,p)
if(typeof a1!=="number")return a1.G()
if(a1>0){o=p
p=s
s=o}a1=a5.$2(s,r)
if(typeof a1!=="number")return a1.G()
if(a1>0){o=r
r=s
s=o}a1=a5.$2(q,p)
if(typeof a1!=="number")return a1.G()
if(a1>0){o=p
p=q
q=o}a1=J.aD(a2)
a1.j(a2,d,t)
a1.j(a2,b,r)
a1.j(a2,c,p)
if(!(a3>=0&&a3<a2.length))return A.b(a2,a3)
a1.j(a2,a,a2[a3])
if(!(a4>=0&&a4<a2.length))return A.b(a2,a4)
a1.j(a2,a0,a2[a4])
n=a3+1
m=a4-1
l=J.M(a5.$2(s,q),0)
if(l)for(k=n;k<=m;++k){if(!(k<a2.length))return A.b(a2,k)
j=a2[k]
i=a5.$2(j,s)
if(i===0)continue
if(i<0){if(k!==n){if(!(n<a2.length))return A.b(a2,n)
a1.j(a2,k,a2[n])
a1.j(a2,n,j)}++n}else for(;;){if(!(m>=0&&m<a2.length))return A.b(a2,m)
i=a5.$2(a2[m],s)
if(i>0){--m
continue}else{h=a2.length
g=m-1
if(i<0){if(!(n<h))return A.b(a2,n)
a1.j(a2,k,a2[n])
f=n+1
if(!(m<a2.length))return A.b(a2,m)
a1.j(a2,n,a2[m])
a1.j(a2,m,j)
m=g
n=f
break}else{if(!(m<h))return A.b(a2,m)
a1.j(a2,k,a2[m])
a1.j(a2,m,j)
m=g
break}}}}else for(k=n;k<=m;++k){if(!(k<a2.length))return A.b(a2,k)
j=a2[k]
if(a5.$2(j,s)<0){if(k!==n){if(!(n<a2.length))return A.b(a2,n)
a1.j(a2,k,a2[n])
a1.j(a2,n,j)}++n}else if(a5.$2(j,q)>0)for(;;){if(!(m>=0&&m<a2.length))return A.b(a2,m)
if(a5.$2(a2[m],q)>0){--m
if(m<k)break
continue}else{if(!(m<a2.length))return A.b(a2,m)
i=a5.$2(a2[m],s)
h=a2.length
g=m-1
if(i<0){if(!(n<h))return A.b(a2,n)
a1.j(a2,k,a2[n])
f=n+1
if(!(m<a2.length))return A.b(a2,m)
a1.j(a2,n,a2[m])
a1.j(a2,m,j)
n=f}else{if(!(m<h))return A.b(a2,m)
a1.j(a2,k,a2[m])
a1.j(a2,m,j)}m=g
break}}}h=n-1
if(!(h<a2.length))return A.b(a2,h)
a1.j(a2,a3,a2[h])
a1.j(a2,h,s)
h=m+1
if(!(h>=0&&h<a2.length))return A.b(a2,h)
a1.j(a2,a4,a2[h])
a1.j(a2,h,q)
A.ch(a2,a3,n-2,a5,a6)
A.ch(a2,m+2,a4,a5,a6)
if(l)return
if(n<d&&m>c){for(;;){if(!(n<a2.length))return A.b(a2,n)
if(!J.M(a5.$2(a2[n],s),0))break;++n}for(;;){if(!(m>=0&&m<a2.length))return A.b(a2,m)
if(!J.M(a5.$2(a2[m],q),0))break;--m}for(k=n;k<=m;++k){if(!(k<a2.length))return A.b(a2,k)
j=a2[k]
if(a5.$2(j,s)===0){if(k!==n){if(!(n<a2.length))return A.b(a2,n)
a1.j(a2,k,a2[n])
a1.j(a2,n,j)}++n}else if(a5.$2(j,q)===0)for(;;){if(!(m>=0&&m<a2.length))return A.b(a2,m)
if(a5.$2(a2[m],q)===0){--m
if(m<k)break
continue}else{if(!(m<a2.length))return A.b(a2,m)
i=a5.$2(a2[m],s)
h=a2.length
g=m-1
if(i<0){if(!(n<h))return A.b(a2,n)
a1.j(a2,k,a2[n])
f=n+1
if(!(m<a2.length))return A.b(a2,m)
a1.j(a2,n,a2[m])
a1.j(a2,m,j)
n=f}else{if(!(m<h))return A.b(a2,m)
a1.j(a2,k,a2[m])
a1.j(a2,m,j)}m=g
break}}}A.ch(a2,n,m,a5,a6)}else A.ch(a2,n,m,a5,a6)}},B={}
var w=[A,J,B]
var $={}
A.dq.prototype={}
J.bL.prototype={
J(a,b){return a===b},
gq(a){return A.bd(a)},
i(a){return"Instance of '"+A.c2(a)+"'"},
gA(a){return A.aA(A.dI(this))}}
J.bN.prototype={
i(a){return String(a)},
gq(a){return a?519018:218159},
gA(a){return A.aA(u.y)},
$ij:1,
$iA:1}
J.aZ.prototype={
J(a,b){return null==b},
i(a){return"null"},
gq(a){return 0},
$ij:1}
J.b0.prototype={$it:1}
J.ae.prototype={
gq(a){return 0},
i(a){return String(a)}}
J.c1.prototype={}
J.aw.prototype={}
J.ad.prototype={
i(a){var t=a[$.f1()]
if(t==null)t=a[$.dU()]
if(t==null)return this.b6(a)
return"JavaScript function for "+J.bz(t)},
$iam:1}
J.b_.prototype={
gq(a){return 0},
i(a){return String(a)}}
J.b1.prototype={
gq(a){return 0},
i(a){return String(a)}}
J.l.prototype={
k(a,b){A.y(a).c.a(b)
a.$flags&1&&A.aT(a,29)
a.push(b)},
L(a,b){A.y(a).h("c<1>").a(b)
a.$flags&1&&A.aT(a,"addAll",2)
this.ba(a,b)
return},
ba(a,b){var t,s
u.b.a(b)
t=b.length
if(t===0)return
if(a===b)throw A.d(A.W(a))
for(s=0;s<t;++s)a.push(b[s])},
am(a,b){var t,s=A.cI(a.length,"",!1,u.N)
for(t=0;t<a.length;++t)this.j(s,t,A.i(a[t]))
return s.join(b)},
al(a){return this.am(a,"")},
F(a,b){if(!(b<a.length))return A.b(a,b)
return a[b]},
gR(a){if(a.length>0)return a[0]
throw A.d(A.fx())},
ah(a,b){var t,s
A.y(a).h("A(1)").a(b)
t=a.length
for(s=0;s<t;++s){if(b.$1(a[s]))return!0
if(a.length!==t)throw A.d(A.W(a))}return!1},
a4(a,b){var t,s,r,q,p,o=A.y(a)
o.h("a(1,1)?").a(b)
a.$flags&2&&A.aT(a,"sort")
t=a.length
if(t<2)return
if(b==null)b=J.hD()
if(t===2){s=a[0]
r=a[1]
o=b.$2(s,r)
if(typeof o!=="number")return o.G()
if(o>0){a[0]=r
a[1]=s}return}q=0
if(o.c.b(null))for(p=0;p<a.length;++p)if(a[p]===void 0){a[p]=null;++q}a.sort(A.i2(b,2))
if(q>0)this.bj(a,q)},
a3(a){return this.a4(a,null)},
bj(a,b){var t,s=a.length
for(;t=s-1,s>0;s=t)if(a[t]===null){a[t]=void 0;--b
if(b===0)break}},
aq(a,b){var t,s,r,q
a.$flags&2&&A.aT(a,"shuffle")
t=a.length
while(t>1){s=b.S(t);--t
r=a.length
if(!(t<r))return A.b(a,t)
q=a[t]
if(!(s>=0&&s<r))return A.b(a,s)
a[t]=a[s]
a[s]=q}},
p(a,b){var t
for(t=0;t<a.length;++t)if(J.M(a[t],b))return!0
return!1},
gaP(a){return a.length!==0},
i(a){return A.dp(a,"[","]")},
gv(a){return new J.ak(a,a.length,A.y(a).h("ak<1>"))},
gq(a){return A.bd(a)},
gl(a){return a.length},
n(a,b){if(!(b>=0&&b<a.length))throw A.d(A.cj(a,b))
return a[b]},
j(a,b,c){A.y(a).c.a(c)
a.$flags&2&&A.aT(a)
if(!(b>=0&&b<a.length))throw A.d(A.cj(a,b))
a[b]=c},
bu(a,b){var t
A.y(a).h("A(1)").a(b)
if(0>=a.length)return-1
for(t=0;t<a.length;++t)if(b.$1(a[t]))return t
return-1},
$ic:1,
$ih:1}
J.bM.prototype={
bB(a){var t,s,r
if(!Array.isArray(a))return null
t=a.$flags|0
if((t&4)!==0)s="const, "
else if((t&2)!==0)s="unmodifiable, "
else s=(t&1)!==0?"fixed, ":""
r="Instance of '"+A.c2(a)+"'"
if(s==="")return r
return r+" ("+s+"length: "+a.length+")"}}
J.cx.prototype={}
J.ak.prototype={
gu(){var t=this.d
return t==null?this.$ti.c.a(t):t},
m(){var t,s=this,r=s.a,q=r.length
if(s.b!==q){r=A.n(r)
throw A.d(r)}t=s.c
if(t>=q){s.d=null
return!1}s.d=r[t]
s.c=t+1
return!0},
$iC:1}
J.aI.prototype={
B(a,b){var t
A.eB(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){t=this.gak(b)
if(this.gak(a)===t)return 0
if(this.gak(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gak(a){return a===0?1/a<0:a<0},
bt(a){var t,s
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){t=a|0
return a===t?t:t-1}s=Math.floor(a)
if(isFinite(s))return s
throw A.d(A.bk(""+a+".floor()"))},
bo(a,b,c){if(B.a.B(b,c)>0)throw A.d(A.hZ(b))
if(this.B(a,b)<0)return b
if(this.B(a,c)>0)return c
return a},
T(a,b){var t,s,r,q,p
if(b<2||b>36)throw A.d(A.av(b,2,36,"radix",null))
t=a.toString(b)
s=t.length
r=s-1
if(!(r>=0))return A.b(t,r)
if(t.charCodeAt(r)!==41)return t
q=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(t)
if(q==null)A.a0(A.bk("Unexpected toString result: "+t))
s=q.length
if(1>=s)return A.b(q,1)
t=q[1]
if(3>=s)return A.b(q,3)
p=+q[3]
s=q[2]
if(s!=null){t+=s
p-=s.length}return t+B.c.V("0",p)},
i(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gq(a){var t,s,r,q,p=a|0
if(a===p)return p&536870911
t=Math.abs(a)
s=Math.log(t)/0.6931471805599453|0
r=Math.pow(2,s)
q=t<1?t/r:r/t
return((q*9007199254740992|0)+(q*3542243181176521|0))*599197+s*1259&536870911},
C(a,b){var t=a%b
if(t===0)return 0
if(t>0)return t
if(b<0)return t-b
else return t+b},
au(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.aF(a,b)},
t(a,b){return(a|0)===a?a/b|0:this.aF(a,b)},
aF(a,b){var t=a/b
if(t>=-2147483648&&t<=2147483647)return t|0
if(t>0){if(t!==1/0)return Math.floor(t)}else if(t>-1/0)return Math.ceil(t)
throw A.d(A.bk("Result of truncating division is "+A.i(t)+": "+A.i(a)+" ~/ "+b))},
aE(a,b){var t
if(a>0)t=this.bk(a,b)
else{t=b>31?31:b
t=a>>t>>>0}return t},
bk(a,b){return b>31?0:a>>>b},
gA(a){return A.aA(u.H)},
$iE:1,
$ik:1,
$iD:1}
J.aY.prototype={
gA(a){return A.aA(u.S)},
$ij:1,
$ia:1}
J.bO.prototype={
gA(a){return A.aA(u.i)},
$ij:1}
J.ac.prototype={
aM(a,b){var t=b.length,s=a.length
if(t>s)return!1
return b===this.W(a,s-t)},
ar(a,b){var t=b.length
if(t>a.length)return!1
return b===a.substring(0,t)},
D(a,b,c){return a.substring(b,A.fS(b,c,a.length))},
W(a,b){return this.D(a,b,null)},
aW(a){var t,s,r,q=a.trim(),p=q.length
if(p===0)return q
if(0>=p)return A.b(q,0)
if(q.charCodeAt(0)===133){t=J.fC(q,1)
if(t===p)return""}else t=0
s=p-1
if(!(s>=0))return A.b(q,s)
r=q.charCodeAt(s)===133?J.fD(q,s):p
if(t===0&&r===p)return q
return q.substring(t,r)},
V(a,b){var t,s
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.d(B.H)
for(t=a,s="";;){if((b&1)===1)s=t+s
b=b>>>1
if(b===0)break
t+=t}return s},
by(a,b,c){var t=b-a.length
if(t<=0)return a
return this.V(c,t)+a},
aO(a,b){var t=a.indexOf(b,0)
return t},
B(a,b){var t
A.z(b)
if(a===b)t=0
else t=a<b?-1:1
return t},
i(a){return a},
gq(a){var t,s,r
for(t=a.length,s=0,r=0;r<t;++r){s=s+a.charCodeAt(r)&536870911
s=s+((s&524287)<<10)&536870911
s^=s>>6}s=s+((s&67108863)<<3)&536870911
s^=s>>11
return s+((s&16383)<<15)&536870911},
gA(a){return A.aA(u.N)},
gl(a){return a.length},
n(a,b){if(!(b>=0&&b<a.length))throw A.d(A.cj(a,b))
return a[b]},
$ij:1,
$iE:1,
$iec:1,
$if:1}
A.bR.prototype={
i(a){return"LateInitializationError: "+this.a}}
A.cL.prototype={}
A.aX.prototype={}
A.J.prototype={
gv(a){var t=this
return new A.as(t,t.gl(t),A.m(t).h("as<J.E>"))},
gN(a){return this.gl(this)===0},
a1(a){var t,s=this,r=A.dt(A.m(s).h("J.E"))
for(t=0;t<s.gl(s);++t)r.k(0,s.F(0,t))
return r}}
A.bh.prototype={
gbd(){var t=this.a.length,s=this.c
if(s>t)return t
return s},
gbl(){var t=this.a.length,s=this.b
if(s>t)return t
return s},
gl(a){var t,s=this.a.length,r=this.b
if(r>=s)return 0
t=this.c
if(t>=s)return s-r
return t-r},
F(a,b){var t=this,s=t.gbl()+b,r=t.gbd()
if(s>=r)throw A.d(A.dn(b,t.gl(0),t,"index"))
return J.dY(t.a,s)},
bA(a){var t,s,r,q,p=this,o=p.b,n=p.a,m=n.length,l=p.c
if(l<m)m=l
t=m-o
if(t<=0){n=J.e6(0,p.$ti.c)
return n}s=J.aD(n)
r=A.cI(t,s.F(n,o),!0,p.$ti.c)
for(q=1;q<t;++q){B.b.j(r,q,s.F(n,o+q))
if(n.length<m)throw A.d(A.W(p))}return r}}
A.as.prototype={
gu(){var t=this.d
return t==null?this.$ti.c.a(t):t},
m(){var t,s=this,r=s.a,q=J.dN(r),p=q.gl(r)
if(s.b!==p)throw A.d(A.W(r))
t=s.c
if(t>=p){s.d=null
return!1}s.d=q.F(r,t);++s.c
return!0},
$iC:1}
A.b6.prototype={
gl(a){return J.I(this.a)},
F(a,b){return this.b.$1(J.dY(this.a,b))}}
A.S.prototype={
gv(a){return new A.bl(J.dl(this.a),this.b,this.$ti.h("bl<1>"))}}
A.bl.prototype={
m(){var t,s
for(t=this.a,s=this.b;t.m();)if(s.$1(t.gu()))return!0
return!1},
gu(){return this.a.gu()},
$iC:1}
A.r.prototype={
sl(a,b){throw A.d(A.bk("Cannot change the length of a fixed-length list"))},
k(a,b){A.aE(a).h("r.E").a(b)
throw A.d(A.bk("Cannot add to a fixed-length list"))}}
A.a_.prototype={$r:"+(1,2)",$s:1}
A.bs.prototype={$r:"+(1,2,3)",$s:2}
A.aU.prototype={
gN(a){return this.gl(this)===0},
i(a){return A.dw(this)},
$iY:1}
A.bm.prototype={
gu(){var t=this.d
return t==null?this.$ti.c.a(t):t},
m(){var t=this,s=t.c
if(s>=t.b){t.d=null
return!1}t.d=t.a[s]
t.c=s+1
return!0},
$iC:1}
A.N.prototype={
ae(){var t=this,s=t.$map
if(s==null){s=new A.b2(t.$ti.h("b2<1,2>"))
A.eS(t.a,s)
t.$map=s}return s},
n(a,b){return this.ae().n(0,b)},
M(a,b){this.$ti.h("~(1,2)").a(b)
this.ae().M(0,b)},
gl(a){return this.ae().a}}
A.aV.prototype={
k(a,b){A.m(this).c.a(b)
A.dm()},
ap(a,b){A.dm()},
aU(a){A.dm()}}
A.aW.prototype={
gl(a){return this.b},
gv(a){var t,s=this,r=s.$keys
if(r==null){r=Object.keys(s.a)
s.$keys=r}t=r
return new A.bm(t,t.length,s.$ti.h("bm<1>"))},
p(a,b){if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
a1(a){return A.dv(this,this.$ti.c)}}
A.be.prototype={}
A.cM.prototype={
H(a){var t,s,r=this,q=new RegExp(r.a).exec(a)
if(q==null)return null
t=Object.create(null)
s=r.b
if(s!==-1)t.arguments=q[s+1]
s=r.c
if(s!==-1)t.argumentsExpr=q[s+1]
s=r.d
if(s!==-1)t.expr=q[s+1]
s=r.e
if(s!==-1)t.method=q[s+1]
s=r.f
if(s!==-1)t.receiver=q[s+1]
return t}}
A.bc.prototype={
i(a){return"Null check operator used on a null value"}}
A.bP.prototype={
i(a){var t,s=this,r="NoSuchMethodError: method not found: '",q=s.b
if(q==null)return"NoSuchMethodError: "+s.a
t=s.c
if(t==null)return r+q+"' ("+s.a+")"
return r+q+"' on '"+t+"' ("+s.a+")"}}
A.ca.prototype={
i(a){var t=this.a
return t.length===0?"Error":"Error: "+t}}
A.cK.prototype={
i(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.a9.prototype={
i(a){var t=this.constructor,s=t==null?null:t.name
return"Closure '"+A.f0(s==null?"unknown":s)+"'"},
$iam:1,
gbF(){return this},
$C:"$1",
$R:1,
$D:null}
A.bD.prototype={$C:"$0",$R:0}
A.bE.prototype={$C:"$2",$R:2}
A.c8.prototype={}
A.c6.prototype={
i(a){var t=this.$static_name
if(t==null)return"Closure of unknown static method"
return"Closure '"+A.f0(t)+"'"}}
A.aH.prototype={
J(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.aH))return!1
return this.$_target===b.$_target&&this.a===b.a},
gq(a){return(A.dT(this.a)^A.bd(this.$_target))>>>0},
i(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.c2(this.a)+"'")}}
A.c4.prototype={
i(a){return"RuntimeError: "+this.a}}
A.a4.prototype={
gl(a){return this.a},
gN(a){return this.a===0},
gP(){return new A.O(this,A.m(this).h("O<1>"))},
E(a){var t,s
if(typeof a=="string"){t=this.b
if(t==null)return!1
return t[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){s=this.c
if(s==null)return!1
return s[a]!=null}else return this.bv(a)},
bv(a){var t=this.d
if(t==null)return!1
return this.a0(this.aA(t,a),a)>=0},
n(a,b){var t,s,r,q,p=null
if(typeof b=="string"){t=this.b
if(t==null)return p
s=t[b]
r=s==null?p:s.b
return r}else if(typeof b=="number"&&(b&0x3fffffff)===b){q=this.c
if(q==null)return p
s=q[b]
r=s==null?p:s.b
return r}else return this.bw(b)},
bw(a){var t,s,r=this.d
if(r==null)return null
t=this.aA(r,a)
s=this.a0(t,a)
if(s<0)return null
return t[s].b},
j(a,b,c){var t,s,r,q,p,o,n=this,m=A.m(n)
m.c.a(b)
m.y[1].a(c)
if(typeof b=="string"){t=n.b
n.av(t==null?n.b=n.af():t,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){s=n.c
n.av(s==null?n.c=n.af():s,b,c)}else{r=n.d
if(r==null)r=n.d=n.af()
q=n.ai(b)
p=r[q]
if(p==null)r[q]=[n.a5(b,c)]
else{o=n.a0(p,b)
if(o>=0)p[o].b=c
else p.push(n.a5(b,c))}}},
M(a,b){var t,s,r=this
A.m(r).h("~(1,2)").a(b)
t=r.e
s=r.r
while(t!=null){b.$2(t.a,t.b)
if(s!==r.r)throw A.d(A.W(r))
t=t.c}},
av(a,b,c){var t,s=A.m(this)
s.c.a(b)
s.y[1].a(c)
t=a[b]
if(t==null)a[b]=this.a5(b,c)
else t.b=c},
a5(a,b){var t=this,s=A.m(t),r=new A.cF(s.c.a(a),s.y[1].a(b))
if(t.e==null)t.e=t.f=r
else t.f=t.f.c=r;++t.a
t.r=t.r+1&1073741823
return r},
ai(a){return J.a1(a)&1073741823},
aA(a,b){return a[this.ai(b)]},
a0(a,b){var t,s
if(a==null)return-1
t=a.length
for(s=0;s<t;++s)if(J.M(a[s].a,b))return s
return-1},
i(a){return A.dw(this)},
af(){var t=Object.create(null)
t["<non-identifier-key>"]=t
delete t["<non-identifier-key>"]
return t},
$ids:1}
A.cF.prototype={}
A.O.prototype={
gl(a){return this.a.a},
gN(a){return this.a.a===0},
gv(a){var t=this.a
return new A.ap(t,t.r,t.e,this.$ti.h("ap<1>"))}}
A.ap.prototype={
gu(){return this.d},
m(){var t,s=this,r=s.a
if(s.b!==r.r)throw A.d(A.W(r))
t=s.c
if(t==null){s.d=null
return!1}else{s.d=t.a
s.c=t.c
return!0}},
$iC:1}
A.cG.prototype={
gl(a){return this.a.a},
gv(a){var t=this.a
return new A.aq(t,t.r,t.e,this.$ti.h("aq<1>"))}}
A.aq.prototype={
gu(){return this.d},
m(){var t,s=this,r=s.a
if(s.b!==r.r)throw A.d(A.W(r))
t=s.c
if(t==null){s.d=null
return!1}else{s.d=t.b
s.c=t.c
return!0}},
$iC:1}
A.an.prototype={
gl(a){return this.a.a},
gv(a){var t=this.a
return new A.ao(t,t.r,t.e,this.$ti.h("ao<1,2>"))}}
A.ao.prototype={
gu(){var t=this.d
t.toString
return t},
m(){var t,s=this,r=s.a
if(s.b!==r.r)throw A.d(A.W(r))
t=s.c
if(t==null){s.d=null
return!1}else{s.d=new A.at(t.a,t.b,s.$ti.h("at<1,2>"))
s.c=t.c
return!0}},
$iC:1}
A.b2.prototype={
ai(a){return A.i1(a)&1073741823},
a0(a,b){var t,s
if(a==null)return-1
t=a.length
for(s=0;s<t;++s)if(J.M(a[s].a,b))return s
return-1}}
A.d3.prototype={
$1(a){return this.a(a)},
$S:1}
A.d4.prototype={
$2(a,b){return this.a(a,b)},
$S:5}
A.d5.prototype={
$1(a){return this.a(A.z(a))},
$S:6}
A.Z.prototype={
i(a){return this.aG(!1)},
aG(a){var t,s,r,q,p,o=this.be(),n=this.ad(),m=(a?"Record ":"")+"("
for(t=o.length,s="",r=0;r<t;++r,s=", "){m+=s
q=o[r]
if(typeof q=="string")m=m+q+": "
if(!(r<n.length))return A.b(n,r)
p=n[r]
m=a?m+A.ef(p):m+A.i(p)}m+=")"
return m.charCodeAt(0)==0?m:m},
be(){var t,s=this.$s
while($.cW.length<=s)B.b.k($.cW,null)
t=$.cW[s]
if(t==null){t=this.bb()
B.b.j($.cW,s,t)}return t},
bb(){var t,s,r,q=this.$r,p=q.indexOf("("),o=q.substring(1,p),n=q.substring(p),m=n==="()"?0:n.replace(/[^,]/g,"").length+1,l=A.e(new Array(m),u.f)
for(t=0;t<m;++t)l[t]=t
if(o!==""){s=o.split(",")
t=s.length
for(r=m;t>0;){--r;--t
B.b.j(l,r,s[t])}}return A.eb(l,u.K)}}
A.aO.prototype={
ad(){return[this.a,this.b]},
J(a,b){if(b==null)return!1
return b instanceof A.aO&&this.$s===b.$s&&J.M(this.a,b.a)&&J.M(this.b,b.b)},
gq(a){return A.dx(this.$s,this.a,this.b,B.k)}}
A.aP.prototype={
ad(){return[this.a,this.b,this.c]},
J(a,b){var t=this
if(b==null)return!1
return b instanceof A.aP&&t.$s===b.$s&&J.M(t.a,b.a)&&J.M(t.b,b.b)&&J.M(t.c,b.c)},
gq(a){var t=this
return A.dx(t.$s,t.a,t.b,t.c)}}
A.aK.prototype={
gA(a){return B.ab},
$ij:1}
A.b9.prototype={}
A.bS.prototype={
gA(a){return B.ac},
$ij:1}
A.aL.prototype={
gl(a){return a.length},
$iF:1}
A.b7.prototype={
j(a,b,c){A.ez(c)
a.$flags&2&&A.aT(a)
A.eE(b,a,a.length)
a[b]=c},
$ic:1,
$ih:1}
A.b8.prototype={
j(a,b,c){A.ay(c)
a.$flags&2&&A.aT(a)
A.eE(b,a,a.length)
a[b]=c},
$ic:1,
$ih:1}
A.bT.prototype={
gA(a){return B.ad},
$ij:1}
A.bU.prototype={
gA(a){return B.ae},
$ij:1}
A.bV.prototype={
gA(a){return B.af},
$ij:1}
A.bW.prototype={
gA(a){return B.ag},
$ij:1}
A.bX.prototype={
gA(a){return B.ah},
$ij:1}
A.bY.prototype={
gA(a){return B.aj},
$ij:1}
A.bZ.prototype={
gA(a){return B.ak},
$ij:1}
A.ba.prototype={
gA(a){return B.al},
gl(a){return a.length},
$ij:1}
A.c_.prototype={
gA(a){return B.am},
gl(a){return a.length},
$ij:1,
$idB:1}
A.bo.prototype={}
A.bp.prototype={}
A.bq.prototype={}
A.br.prototype={}
A.Q.prototype={
h(a){return A.by(v.typeUniverse,this,a)},
a6(a){return A.ew(v.typeUniverse,this,a)}}
A.cc.prototype={}
A.ci.prototype={
i(a){return A.G(this.a,null)}}
A.cb.prototype={
i(a){return this.a}}
A.bu.prototype={}
A.c7.prototype={}
A.T.prototype={
bg(){return new A.T(A.m(this).h("T<1>"))},
gv(a){var t=this,s=new A.a8(t,t.r,A.m(t).h("a8<1>"))
s.c=t.e
return s},
gl(a){return this.a},
p(a,b){var t,s
if(typeof b=="string"&&b!=="__proto__"){t=this.b
if(t==null)return!1
return u.g.a(t[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){s=this.c
if(s==null)return!1
return u.g.a(s[b])!=null}else return this.bc(b)},
bc(a){var t=this.d
if(t==null)return!1
return this.ac(t[this.a8(a)],a)>=0},
k(a,b){var t,s,r=this
A.m(r).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){t=r.b
return r.aw(t==null?r.b=A.dC():t,b)}else if(typeof b=="number"&&(b&1073741823)===b){s=r.c
return r.aw(s==null?r.c=A.dC():s,b)}else return r.b9(b)},
b9(a){var t,s,r,q=this
A.m(q).c.a(a)
t=q.d
if(t==null)t=q.d=A.dC()
s=q.a8(a)
r=t[s]
if(r==null)t[s]=[q.ag(a)]
else{if(q.ac(r,a)>=0)return!1
r.push(q.ag(a))}return!0},
ap(a,b){var t=this
if(typeof b=="string"&&b!=="__proto__")return t.aD(t.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return t.aD(t.c,b)
else return t.bi(b)},
bi(a){var t,s,r,q,p=this,o=p.d
if(o==null)return!1
t=p.a8(a)
s=o[t]
r=p.ac(s,a)
if(r<0)return!1
q=s.splice(r,1)[0]
if(0===s.length)delete o[t]
p.aH(q)
return!0},
aw(a,b){A.m(this).c.a(b)
if(u.g.a(a[b])!=null)return!1
a[b]=this.ag(b)
return!0},
aD(a,b){var t
if(a==null)return!1
t=u.g.a(a[b])
if(t==null)return!1
this.aH(t)
delete a[b]
return!0},
aB(){this.r=this.r+1&1073741823},
ag(a){var t,s=this,r=new A.cf(A.m(s).c.a(a))
if(s.e==null)s.e=s.f=r
else{t=s.f
t.toString
r.c=t
s.f=t.b=r}++s.a
s.aB()
return r},
aH(a){var t=this,s=a.c,r=a.b
if(s==null)t.e=r
else s.b=r
if(r==null)t.f=s
else r.c=s;--t.a
t.aB()},
a8(a){return J.a1(a)&1073741823},
ac(a,b){var t,s
if(a==null)return-1
t=a.length
for(s=0;s<t;++s)if(J.M(a[s].a,b))return s
return-1},
$iea:1}
A.cf.prototype={}
A.a8.prototype={
gu(){var t=this.d
return t==null?this.$ti.c.a(t):t},
m(){var t=this,s=t.c,r=t.a
if(t.b!==r.r)throw A.d(A.W(r))
else if(s==null){t.d=null
return!1}else{t.d=t.$ti.h("1?").a(s.a)
t.c=s.b
return!0}},
$iC:1}
A.p.prototype={
gv(a){return new A.as(a,a.length,A.aE(a).h("as<p.E>"))},
F(a,b){if(!(b<a.length))return A.b(a,b)
return a[b]},
gaP(a){return a.length!==0},
k(a,b){var t
A.aE(a).h("p.E").a(b)
t=a.length
this.sl(a,t+1)
if(!(t<a.length))return A.b(a,t)
a[t]=b},
i(a){return A.dp(a,"[","]")}}
A.B.prototype={
M(a,b){var t,s,r,q=A.m(this)
q.h("~(B.K,B.V)").a(b)
for(t=this.gP(),t=t.gv(t),q=q.h("B.V");t.m();){s=t.gu()
r=this.n(0,s)
b.$2(s,r==null?q.a(r):r)}},
gl(a){var t=this.gP()
return t.gl(t)},
gN(a){var t=this.gP()
return t.gN(t)},
i(a){return A.dw(this)},
$iY:1}
A.cJ.prototype={
$2(a,b){var t,s=this.a
if(!s.a)this.b.a+=", "
s.a=!1
s=this.b
t=A.i(a)
s.a=(s.a+=t)+": "
t=A.i(b)
s.a+=t},
$S:2}
A.ag.prototype={
L(a,b){var t
A.m(this).h("c<1>").a(b)
for(t=b.gv(b);t.m();)this.k(0,t.gu())},
aU(a){var t,s,r
for(t=A.bn(a,a.r,A.m(a).c),s=t.$ti.c;t.m();){r=t.d
this.ap(0,r==null?s.a(r):r)}},
bz(a){var t,s,r,q=this.a1(0)
for(t=A.bn(a,a.r,A.m(a).c),s=t.$ti.c;t.m();){r=t.d
q.ap(0,r==null?s.a(r):r)}this.aU(q)},
i(a){return A.dp(this,"{","}")},
ah(a,b){var t
A.m(this).h("A(1)").a(b)
for(t=this.gv(this);t.m();)if(b.$1(t.gu()))return!0
return!1},
$ic:1,
$iaN:1}
A.bt.prototype={
a1(a){var t=this.bg()
t.L(0,this)
return t}}
A.cd.prototype={
n(a,b){var t,s=this.b
if(s==null)return this.c.n(0,b)
else if(typeof b!="string")return null
else{t=s[b]
return typeof t=="undefined"?this.bh(b):t}},
gl(a){return this.b==null?this.c.a:this.Y().length},
gN(a){return this.gl(0)===0},
gP(){if(this.b==null){var t=this.c
return new A.O(t,A.m(t).h("O<1>"))}return new A.ce(this)},
M(a,b){var t,s,r,q,p=this
u.cQ.a(b)
if(p.b==null)return p.c.M(0,b)
t=p.Y()
for(s=0;s<t.length;++s){r=t[s]
q=p.b[r]
if(typeof q=="undefined"){q=A.cZ(p.a[r])
p.b[r]=q}b.$2(r,q)
if(t!==p.c)throw A.d(A.W(p))}},
Y(){var t=u.aL.a(this.c)
if(t==null)t=this.c=A.e(Object.keys(this.a),u.s)
return t},
bh(a){var t
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
t=A.cZ(this.a[a])
return this.b[a]=t}}
A.ce.prototype={
gl(a){return this.a.gl(0)},
F(a,b){var t=this.a
if(t.b==null)t=t.gP().F(0,b)
else{t=t.Y()
if(!(b<t.length))return A.b(t,b)
t=t[b]}return t},
gv(a){var t=this.a
if(t.b==null){t=t.gP()
t=t.gv(t)}else{t=t.Y()
t=new J.ak(t,t.length,A.y(t).h("ak<1>"))}return t}}
A.bF.prototype={}
A.bH.prototype={}
A.b3.prototype={
i(a){var t=A.bJ(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+t}}
A.bQ.prototype={
i(a){return"Cyclic error in JSON stringify"}}
A.cy.prototype={
bp(a,b){var t=A.hR(a,this.gbq().a)
return t},
K(a,b){var t=A.h_(a,this.gbr().b,null)
return t},
gbr(){return B.M},
gbq(){return B.L}}
A.cA.prototype={}
A.cz.prototype={}
A.cU.prototype={
b_(a){var t,s,r,q,p,o,n=a.length
for(t=this.c,s=0,r=0;r<n;++r){q=a.charCodeAt(r)
if(q>92){if(q>=55296){p=q&64512
if(p===55296){o=r+1
o=!(o<n&&(a.charCodeAt(o)&64512)===56320)}else o=!1
if(!o)if(p===56320){p=r-1
p=!(p>=0&&(a.charCodeAt(p)&64512)===55296)}else p=!1
else p=!0
if(p){if(r>s)t.a+=B.c.D(a,s,r)
s=r+1
p=A.x(92)
t.a+=p
p=A.x(117)
t.a+=p
p=A.x(100)
t.a+=p
p=q>>>8&15
p=A.x(p<10?48+p:87+p)
t.a+=p
p=q>>>4&15
p=A.x(p<10?48+p:87+p)
t.a+=p
p=q&15
p=A.x(p<10?48+p:87+p)
t.a+=p}}continue}if(q<32){if(r>s)t.a+=B.c.D(a,s,r)
s=r+1
p=A.x(92)
t.a+=p
switch(q){case 8:p=A.x(98)
t.a+=p
break
case 9:p=A.x(116)
t.a+=p
break
case 10:p=A.x(110)
t.a+=p
break
case 12:p=A.x(102)
t.a+=p
break
case 13:p=A.x(114)
t.a+=p
break
default:p=A.x(117)
t.a+=p
p=A.x(48)
t.a=(t.a+=p)+p
p=q>>>4&15
p=A.x(p<10?48+p:87+p)
t.a+=p
p=q&15
p=A.x(p<10?48+p:87+p)
t.a+=p
break}}else if(q===34||q===92){if(r>s)t.a+=B.c.D(a,s,r)
s=r+1
p=A.x(92)
t.a+=p
p=A.x(q)
t.a+=p}}if(s===0)t.a+=a
else if(s<n)t.a+=B.c.D(a,s,n)},
a7(a){var t,s,r,q
for(t=this.a,s=t.length,r=0;r<s;++r){q=t[r]
if(a==null?q==null:a===q)throw A.d(new A.bQ(a,null))}B.b.k(t,a)},
a2(a){var t,s,r,q,p=this
if(p.aZ(a))return
p.a7(a)
try{t=p.b.$1(a)
if(!p.aZ(t)){r=A.e8(a,null,p.gaC())
throw A.d(r)}r=p.a
if(0>=r.length)return A.b(r,-1)
r.pop()}catch(q){s=A.di(q)
r=A.e8(a,s,p.gaC())
throw A.d(r)}},
aZ(a){var t,s,r=this
if(typeof a=="number"){if(!isFinite(a))return!1
r.c.a+=B.t.i(a)
return!0}else if(a===!0){r.c.a+="true"
return!0}else if(a===!1){r.c.a+="false"
return!0}else if(a==null){r.c.a+="null"
return!0}else if(typeof a=="string"){t=r.c
t.a+='"'
r.b_(a)
t.a+='"'
return!0}else if(u.j.b(a)){r.a7(a)
r.bC(a)
t=r.a
if(0>=t.length)return A.b(t,-1)
t.pop()
return!0}else if(u.G.b(a)){r.a7(a)
s=r.bD(a)
t=r.a
if(0>=t.length)return A.b(t,-1)
t.pop()
return s}else return!1},
bC(a){var t,s=this.c
s.a+="["
if(J.fd(a)){if(0>=a.length)return A.b(a,0)
this.a2(a[0])
for(t=1;t<a.length;++t){s.a+=","
this.a2(a[t])}}s.a+="]"},
bD(a){var t,s,r,q,p,o,n=this,m={}
if(a.gN(a)){n.c.a+="{}"
return!0}t=a.gl(a)*2
s=A.cI(t,null,!1,u.X)
r=m.a=0
m.b=!0
a.M(0,new A.cV(m,s))
if(!m.b)return!1
q=n.c
q.a+="{"
for(p='"';r<t;r+=2,p=',"'){q.a+=p
n.b_(A.z(s[r]))
q.a+='":'
o=r+1
if(!(o<t))return A.b(s,o)
n.a2(s[o])}q.a+="}"
return!0}}
A.cV.prototype={
$2(a,b){var t,s
if(typeof a!="string")this.a.b=!1
t=this.b
s=this.a
B.b.j(t,s.a++,a)
B.b.j(t,s.a++,b)},
$S:2}
A.cT.prototype={
gaC(){var t=this.c.a
return t.charCodeAt(0)==0?t:t}}
A.cE.prototype={
aL(a){var t,s,r,q,p=A.e([],u.s),o=a.length
for(t=0,s=0,r=0;r<o;++r,s=q){q=a.charCodeAt(r)
if(q!==13){if(q!==10)continue
if(s===13){t=r+1
continue}}B.b.k(p,B.c.D(a,t,r))
t=r+1}if(t<o)B.b.k(p,B.c.D(a,t,o))
return p}}
A.cu.prototype={
$0(){var t=this
return A.a0(A.ck("("+t.a+", "+t.b+", "+t.c+", "+t.d+", "+t.e+", "+t.f+", "+t.r+", "+t.w+")"))},
$S:7}
A.ab.prototype={
X(a){var t=1000,s=B.a.C(a,t),r=B.a.t(a-s,t),q=this.b+s,p=B.a.C(q,t),o=this.a+B.a.t(q-p,t)+r
if(o<-864e13||o>864e13)A.a0(A.av(o,-864e13,864e13,"millisecondsSinceEpoch",null))
if(o===864e13&&p!==0)A.a0(A.bA(p,"microsecond","Time including microseconds is outside valid range"))
A.eP(!0,"isUtc",u.y)
return new A.ab(o,p,!0)},
J(a,b){var t
if(b==null)return!1
t=!1
if(b instanceof A.ab)if(this.a===b.a)t=this.b===b.b
return t},
gq(a){return A.dx(this.a,this.b,B.k,B.k)},
B(a,b){var t
u.k.a(b)
t=B.a.B(this.a,b.a)
if(t!==0)return t
return B.a.B(this.b,b.b)},
i(a){var t=this,s=A.fq(A.fN(t)),r=A.bI(A.fL(t)),q=A.bI(A.fH(t)),p=A.bI(A.fI(t)),o=A.bI(A.fK(t)),n=A.bI(A.fM(t)),m=A.e4(A.fJ(t)),l=t.b,k=l===0?"":A.e4(l)
return s+"-"+r+"-"+q+" "+p+":"+o+":"+n+"."+m+k+"Z"},
$iE:1}
A.al.prototype={
J(a,b){if(b==null)return!1
return b instanceof A.al&&this.a===b.a},
gq(a){return B.a.gq(this.a)},
B(a,b){return B.a.B(this.a,u.d.a(b).a)},
i(a){var t,s,r,q,p,o=this.a,n=B.a.t(o,36e8),m=o%36e8
if(o<0){n=0-n
o=0-m
t="-"}else{o=m
t=""}s=B.a.t(o,6e7)
o%=6e7
r=s<10?"0":""
q=B.a.t(o,1e6)
p=q<10?"0":""
return t+n+":"+r+s+":"+p+q+"."+B.c.by(B.a.i(o%1e6),6,"0")},
$iE:1}
A.cQ.prototype={
i(a){return this.a9()}}
A.o.prototype={}
A.bB.prototype={
i(a){var t=this.a
if(t!=null)return"Assertion failed: "+A.bJ(t)
return"Assertion failed"}}
A.bi.prototype={}
A.a2.prototype={
gab(){return"Invalid argument"+(!this.a?"(s)":"")},
gaa(){return""},
i(a){var t=this,s=t.c,r=s==null?"":" ("+s+")",q=t.d,p=q==null?"":": "+q,o=t.gab()+r+p
if(!t.a)return o
return o+t.gaa()+": "+A.bJ(t.gaj())},
gaj(){return this.b}}
A.aM.prototype={
gaj(){return A.eC(this.b)},
gab(){return"RangeError"},
gaa(){var t,s=this.e,r=this.f
if(s==null)t=r!=null?": Not less than or equal to "+A.i(r):""
else if(r==null)t=": Not greater than or equal to "+A.i(s)
else if(r>s)t=": Not in inclusive range "+A.i(s)+".."+A.i(r)
else t=r<s?": Valid value range is empty":": Only valid value is "+A.i(s)
return t}}
A.bK.prototype={
gaj(){return A.ay(this.b)},
gab(){return"RangeError"},
gaa(){if(A.ay(this.b)<0)return": index must not be negative"
var t=this.f
if(t===0)return": no indices are valid"
return": index should be less than "+t},
gl(a){return this.f}}
A.bj.prototype={
i(a){return"Unsupported operation: "+this.a}}
A.c9.prototype={
i(a){return"UnimplementedError: "+this.a}}
A.bg.prototype={
i(a){return"Bad state: "+this.a}}
A.bG.prototype={
i(a){var t=this.a
if(t==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.bJ(t)+"."}}
A.c0.prototype={
i(a){return"Out of Memory"},
$io:1}
A.bf.prototype={
i(a){return"Stack Overflow"},
$io:1}
A.cR.prototype={
i(a){return"Exception: "+this.a}}
A.cw.prototype={
i(a){var t=this.a,s=""!==t?"FormatException: "+t:"FormatException"
return s}}
A.c.prototype={
gl(a){var t,s=this.gv(this)
for(t=0;s.m();)++t
return t},
F(a,b){var t,s
A.dy(b,"index")
t=this.gv(this)
for(s=b;t.m();){if(s===0)return t.gu();--s}throw A.d(A.dn(b,b-s,this,"index"))},
i(a){return A.fy(this,"(",")")}}
A.at.prototype={
i(a){return"MapEntry("+A.i(this.a)+": "+A.i(this.b)+")"}}
A.bb.prototype={
gq(a){return A.q.prototype.gq.call(this,0)},
i(a){return"null"}}
A.q.prototype={$iq:1,
J(a,b){return this===b},
gq(a){return A.bd(this)},
i(a){return"Instance of '"+A.c2(this)+"'"},
gA(a){return A.ic(this)},
toString(){return this.i(this)}}
A.ah.prototype={
gl(a){return this.a.length},
i(a){var t=this.a
return t.charCodeAt(0)==0?t:t},
$ifU:1}
A.cg.prototype={
b8(a){var t,s,r,q,p,o,n,m=this,l=4294967296
do{t=a>>>0
a=B.a.t(a-t,l)
s=a>>>0
a=B.a.t(a-s,l)
r=(~t>>>0)+(t<<21>>>0)
q=r>>>0
s=(~s>>>0)+((s<<21|t>>>11)>>>0)+B.a.t(r-q,l)>>>0
r=((q^(q>>>24|s<<8))>>>0)*265
t=r>>>0
s=((s^s>>>24)>>>0)*265+B.a.t(r-t,l)>>>0
r=((t^(t>>>14|s<<18))>>>0)*21
t=r>>>0
s=((s^s>>>14)>>>0)*21+B.a.t(r-t,l)>>>0
t=(t^(t>>>28|s<<4))>>>0
s=(s^s>>>28)>>>0
r=(t<<31>>>0)+t
q=r>>>0
p=B.a.t(r-q,l)
r=m.a*1037
o=m.a=r>>>0
n=m.b*1037+B.a.t(r-o,l)>>>0
m.b=n
o=(o^q)>>>0
m.a=o
p=(n^s+((s<<31|t>>>1)>>>0)+p>>>0)>>>0
m.b=p}while(a!==0)
if(p===0&&o===0)m.a=23063
m.I()
m.I()
m.I()
m.I()},
I(){var t=this,s=t.a,r=4294901760*s,q=r>>>0,p=55905*s,o=p>>>0,n=o+q+t.b
s=n>>>0
t.a=s
t.b=B.a.t(p-o+(r-q)+(n-s),4294967296)>>>0},
S(a){var t,s,r,q=this
if(a<=0||a>4294967296)throw A.d(A.fR("max must be in range 0 < max \u2264 2^32, was "+a))
t=a-1
if((a&t)>>>0===0){q.I()
return(q.a&t)>>>0}do{q.I()
s=q.a
r=s%a}while(s-r+a>=4294967296)
return r},
an(){var t,s=this
s.I()
t=s.a
s.I()
return((t&67108863)*134217728+(s.a&134217727))/9007199254740992},
aR(){this.I()
return(this.a&1)===0},
$ifQ:1}
A.aa.prototype={
a9(){return"Commonness."+this.b}}
A.V.prototype={
a9(){return"BoardShape."+this.b}}
A.P.prototype={
aY(a){var t=this
return new A.P(t.a,t.b,t.c,t.d,t.e,t.f,t.r,t.w,t.x,t.y,a)}}
A.a3.prototype={
a9(){return"Direction."+this.b}}
A.a6.prototype={
gl(a){return this.a.length},
a_(a){var t=this.b,s=this.c
return this.d===B.d?new A.a_(t,s+a):new A.a_(t+a,s)},
i(a){var t=this
return t.a+"@"+t.b+","+t.c+t.d.c}}
A.co.prototype={
gao(){var t,s,r,q=this,p=q.f
if(p===$){t=q.d
s=A.m(t).h("O<1>")
r=A.cH(new A.O(t,s),s.h("c.E"))
B.b.a3(r)
q.f!==$&&A.iw()
q.f=r
p=r}return p},
aK(a){var t,s,r,q=this.c
if(!(a>=0&&a<q.length))return A.b(q,a)
t=q[a]
q=A.e([],u.t)
for(s=t.a.length,r=0;r<s;++r)q.push(new A.cp(this,t,r).$0())
return q},
b3(a){var t=this.e.n(0,a)
return t==null?B.m:t},
gU(){var t,s,r,q=A.e([],u.s)
for(t=this.c,s=t.length,r=0;r<s;++r)q.push(t[r].a)
return q},
b2(a){return B.b.bu(this.c,new A.cq(a))},
aX(){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1=this,b2=u.s,b3=A.e([],b2),b4=b1.c,b5=b4.length
if(b5===0)return A.e(["no words"],b2)
t=A.aJ(u.N)
for(s=0;s<b5;++s){b2=b4[s].a
if(!t.k(0,b2))B.b.k(b3,b2+" appears twice")}for(b2=b1.gao(),r=b2.length,q=b1.b-1,p=b1.a,o=p-1,n=b1.e,m=b1.d,s=0;s<b2.length;b2.length===r||(0,A.n)(b2),++s){l=b2[s]
k=B.a.au(l,p)
j=B.a.C(l,p)
i=n.n(0,l)
if(i==null)i=B.m
h=A.y(i)
g=new A.b6(i,h.h("a3(1)").a(new A.cr(b1)),h.h("b6<1,a3>")).a1(0)
f=j>0&&m.E(l-1)
e=j<o&&m.E(l+1)
d=k>0&&m.E(l-p)
c=k<q&&m.E(l+p)
if((f||e)&&!g.p(0,B.d))B.b.k(b3,"stray across contact at "+k+","+j)
if((d||c)&&!g.p(0,B.e))B.b.k(b3,"stray down contact at "+k+","+j)}for(s=0;s<b5;++s){b=b4[s]
a=b.a_(0)
a0=a.a
a1=a.b
b2=b.a
a2=b.a_(b2.length-1)
a3=a2.a
a4=a2.b
r=b.d===B.d
a5=r?new A.a_(a0,a1-1):new A.a_(a0-1,a1)
a6=r?new A.a_(a3,a4+1):new A.a_(a3+1,a4)
r=new A.ct(b1)
if(r.$2(a5.a,a5.b)||r.$2(a6.a,a6.b))B.b.k(b3,b2+" runs into another word")}if(b5>1){for(b=0;b<b5;++b)if(!B.b.ah(b1.aK(b),new A.cs(b1)))B.b.k(b3,b4[b].a+" crosses nothing")
a7=A.du([0],u.S)
a8=A.e([0],u.t)
while(b2=a8.length,b2!==0){if(0>=b2)return A.b(a8,-1)
for(b2=b1.aK(a8.pop()),b4=b2.length,s=0;s<b2.length;b2.length===b4||(0,A.n)(b2),++s){r=n.n(0,b2[s])
if(r==null)r=B.m
q=r.length
a9=0
for(;a9<r.length;r.length===q||(0,A.n)(r),++a9){b0=r[a9]
if(a7.k(0,b0))B.b.k(a8,b0)}}}if(a7.a!==b5)B.b.k(b3,"the grid is in pieces")}return b3},
gaQ(){var t,s,r,q,p,o,n,m=this.gao(),l=m.length
if(l===0)return 0
for(t=this.a,s=t-1,r=this.d,q=0,p=0;o=m.length,p<o;m.length===l||(0,A.n)(m),++p){n=m[p]
if(r.E(B.a.au(n,t)*t+(s-B.a.C(n,t))))++q}return q/o}}
A.cp.prototype={
$0(){var t=this.b.a_(this.c)
return t.a*this.a.a+t.b},
$S:8}
A.cq.prototype={
$1(a){return u.c.a(a).a===this.a},
$S:3}
A.cr.prototype={
$1(a){var t
A.ay(a)
t=this.a.c
if(!(a>=0&&a<t.length))return A.b(t,a)
return t[a].d},
$S:9}
A.ct.prototype={
$2(a,b){var t,s=!1
if(a>=0)if(b>=0){t=this.a
if(a<t.b){s=t.a
s=b<s&&t.d.E(a*s+b)}}return s},
$S:10}
A.cs.prototype={
$1(a){return this.a.b3(A.ay(a)).length>1},
$S:11}
A.c3.prototype={
i(a){var t=this
return"Puzzle("+t.a+", "+t.b.c.length+" grid, "+t.c.length+" bonus, "+t.d+")"}}
A.c5.prototype={
aI(a,b){var t,s=!1
if(a>=0)if(b>=0){t=this.a
if(a<t.length)if(b<B.b.gR(t).length){s=t[a]
if(!(b<s.length))return A.b(s,b)
s=s.charCodeAt(b)===35}}return s}}
A.X.prototype={}
A.cm.prototype={}
A.cn.prototype={
$2(a,b){var t=u.O
t.a(a)
return B.a.B(t.a(b).b,a.b)},
$S:12}
A.cC.prototype={}
A.cB.prototype={}
A.d7.prototype={
$2(a,b){A.z(a)
return B.a.B(A.z(b).length,a.length)},
$S:4}
A.d8.prototype={
$1(a){return A.z(a).length===3},
$S:0}
A.d9.prototype={
$1(a){return A.z(a).length>=6},
$S:0}
A.K.prototype={}
A.d_.prototype={
$2(a,b){var t=u.M
t.a(a)
t.a(b)
t=new A.d0(this.a)
return J.dX(t.$1(a),t.$1(b))},
$S:13}
A.d0.prototype={
$1(a){return B.b.p(A.e([a.a,a.b,a.c,a.d],u.s),this.a.a)?0:1},
$S:14}
A.cO.prototype={
aN(a,b,c){var t,s,r,q,p,o,n,m=this
u.r.a(a)
t=m.f
s=m.e
r=0
for(;;){if(!(r<3&&s.length<b))break
for(q=a.length,p=!1,o=0;o<a.length;a.length===q||(0,A.n)(a),++o){n=a[o]
if(s.length>=b)break
if(t.p(0,n)||!m.aT(n))continue
if(m.aS(n,c))p=!0}if(!p)break;++r}},
aT(a){var t,s,r=this,q=r.a.x,p=q.n(0,a)
if(p!=null)return r.r===0&&!r.f.p(0,p)
for(q=new A.an(q,A.m(q).h("an<1,2>")).gv(0),t=r.f;q.m();){s=q.d
if(s.b===a&&t.p(0,s.a))return!1}return!0},
b0(a,b){var t,s,r,q,p,o,n,m=this
u.J.a(b)
t=m.a
s=t.a
switch(t.f.a){case 0:case 1:return m.O(s,0,0,a.aR()?B.d:B.e)
case 2:m.ay=0
return m.O(s,0,0,B.e)
case 3:t=m.b.a
r=B.a.t(B.b.gR(t).length,2)
q=s.length
p=t.length-q
if(m.bf(p,r,B.e,q))return m.O(s,p,r,B.e)
return m.O(s,5,B.a.t(B.b.gR(t).length-q,2),B.d)
case 4:t=m.b.a
q=B.a.t(B.b.gR(t).length-s.length,2)
o=a.aR()?B.d:B.e
return m.O(s,t.length/2|0,q,o)
case 5:if(b.length===0)return!1
t=a.an()
q=b.length
if(t<0.7){t=a.S(Math.min(q,12))
if(!(t>=0&&t<b.length))return A.b(b,t)
n=b[t]}else{t=a.S(q)
if(!(t>=0&&t<b.length))return A.b(b,t)
n=b[t]}if(!m.O(n.a,0,n.e,B.d))return!1
t=n.f
if(!m.Z(n.b,0,t,B.e,!0))return!1
q=n.r
if(!m.Z(n.c,0,q,B.e,!0))return!1
o=n.x
if(!m.Z(n.d,o,n.w,B.d,!0))return!1
m.Q=1
m.as=o-1
m.at=t+1
m.ax=q-1
if(!m.f.p(0,s)){if(!m.aT(s))return!1
if(!m.aS(s,a))return!1}return!0}},
bf(a,b,c,d){var t,s,r,q,p=this.b
if(p==null)return!0
for(t=c===B.d,s=c===B.e,r=0;r<d;++r){q=s?a+r:a
if(!p.aI(q,t?b+r:b))return!1}return!0},
aJ(a3,a4,a5,a6,a7){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c=a6===B.e?1:0,b=a6===B.d,a=b?1:0,a0=b?1:2,a1=a3.length,a2=d.c
if(a2.E(A.el(a4-c,a5-a)))return-1
if(a2.E(A.el(a4+c*a1,a5+a*a1)))return-1
for(t=d.b,s=t==null,r=!s,q=d.d,p=0,o=0;o<a1;++o){n=a4+c*o
m=a5+a*o
l=(n+64)*256+(m+64)
k=a2.n(0,l)
if(k!=null){if(k!==a3.charCodeAt(o))return-1
j=q.n(0,l)
j.toString
if((j&a0)!==0)return-1;++p
continue}if(a2.E((n+a+64)*256+(m+c+64))||a2.E((n-a+64)*256+(m-c+64)))return-1
if(r)j=!t.aI(n,m)
else j=!1
if(j)return-1
if(n>=d.Q&&n<=d.as&&m>=d.at&&m<=d.ax)return-1}if(!a7&&p===0)return-1
if(p===a1)return-1
if(s){i=Math.min(d.w,a4)
h=Math.min(d.y,a5)
a2=a1-1
g=Math.max(d.x,a4+c*a2)
f=Math.max(d.z,a5+a*a2)
if(d.e.length!==0){a2=d.a.e
a2=g-i+1>a2||f-h+1>a2}else a2=!1
if(a2)return-1}e=d.ay
if(e!=null&&d.e.length!==0&&b)if(a5>e||a5+a1-1<e)return-1
return p},
bn(a,b,c,d){return this.aJ(a,b,c,d,!1)},
Z(a,b,c,d,e){if(this.aJ(a,b,c,d,!e&&this.e.length===0)<0)return!1
this.az(a,b,c,d)
return!0},
O(a,b,c,d){return this.Z(a,b,c,d,!1)},
az(a,b,c,d){var t,s,r,q,p,o,n,m=this,l=d===B.e?1:0,k=d===B.d,j=k?1:0,i=k?1:2
for(k=a.length,t=m.c,s=m.d,r=0;r<k;++r){q=b+l*r
p=c+j*r
o=(q+64)*256+(p+64)
t.j(0,o,a.charCodeAt(r))
n=s.n(0,o)
s.j(0,o,(n==null?0:n)|i)
m.w=Math.min(m.w,q)
m.x=Math.max(m.x,q)
m.y=Math.min(m.y,p)
m.z=Math.max(m.z,p)}B.b.k(m.e,new A.a6(a,b,c,d))
m.f.k(0,a)
if(m.a.x.E(a))++m.r},
aS(a8,a9){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6=this,a7=(a6.x-a6.w+1)*(a6.z-a6.y+1)
for(t=a6.c,t=new A.an(t,A.m(t).h("an<1,2>")).gv(0),s=a8.length,r=a6.b!=null,q=a6.a.f,p=q===B.n,q=q===B.j,o=null,n=null;t.m();){m=t.d
l=m.a
k=B.a.t(l,256)-64
j=B.a.C(l,256)-64
for(l=m.b,i=0;i<s;++i){if(a8.charCodeAt(i)!==l)continue
for(h=k-i,g=j-i,f=0;f<2;++f){e=B.U[f]
d=e===B.e
c=d?h:k
b=e===B.d
a=b?g:j
a0=a6.bn(a8,c,a,e)
if(a0<=0)continue
a1=d?c+s-1:c
a2=b?a+s-1:a
a3=Math.max(a6.x,a1)-Math.min(a6.w,c)+1
a4=Math.max(a6.z,a2)-Math.min(a6.y,a)+1
a5=a0*8-(a3*a4-a7)*0.55+a9.an()*3
if(a3>a4+2)a5-=(a3-a4-2)*2
if(q)a5+=a6.bm(a8,c,a,e)*40
if(p&&b){d=a6.ay
d.toString
a5+=Math.min(d-a,a2-d)*1.5}if(r)a5+=(Math.max(0,a6.w-c)+Math.max(0,a1-a6.x)+(Math.max(0,a6.y-a)+Math.max(0,a2-a6.z)))*2
if(o==null||a5>o){n=new A.bs(c,a,e)
o=a5}}}}if(n==null)return!1
a6.az(a8,n.a,n.b,n.c)
return!0},
bm(a,b,c,d){var t,s,r,q,p,o,n,m,l,k=this.c
k=A.dv(new A.O(k,A.m(k).h("O<1>")),u.S)
for(t=a.length,s=d===B.d,r=d===B.e,q=0;q<t;++q){p=r?b+q:b
o=s?c+q:c
k.k(0,(p+64)*256+(o+64))}for(t=A.m(k).c,s=A.bn(k,k.r,t),r=s.$ti.c,n=1048576,m=-1048576;s.m();){p=s.d
p=B.a.C(p==null?r.a(p):p,256)-64
n=Math.min(n,p)
m=Math.max(m,p)}for(t=A.bn(k,k.r,t),s=n+m,r=t.$ti.c,l=0;t.m();){p=t.d
if(p==null)p=r.a(p)
if(k.p(0,(B.a.t(p,256)-64+64)*256+(s-(B.a.C(p,256)-64)+64)))++l}return l/k.a},
b1(){var t,s,r,q,p,o,n,m=this,l=m.x-m.w+1,k=m.z-m.y+1
switch(m.a.f.a){case 0:return!0
case 1:t=m.aV()
return t!=null&&t.gaQ()>=0.85
case 2:s=m.e
r=A.y(s)
q=new A.S(s,r.h("A(1)").a(new A.cP()),r.h("S<1>")).gl(0)
for(s=m.c,s=new A.ap(s,s.r,s.e,A.m(s).h("ap<1>")),p=!1,o=!1;s.m();){r=B.a.C(s.d,256)-64
n=m.ay
n.toString
if(r<n)p=!0
if(r>n)o=!0}return q>=3&&p&&o
case 3:return l>=9&&k>=9
case 4:return l>=8&&k>=8
case 5:return!0}},
aV(){var t,s,r,q,p,o=this,n=o.b,m=n==null,l=m?o.w:0,k=m?o.y:0,j=m?null:B.b.gR(n.a).length
if(j==null)j=o.z-o.y+1
t=m?null:n.a.length
if(t==null)t=o.x-o.w+1
m=A.e([],u.D)
for(s=o.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.n)(s),++q){p=s[q]
m.push(new A.a6(p.a,p.b-l,p.c-k,p.d))}return A.e3(t,m,j)},
bs(a){var t,s,r,q,p,o,n,m,l,k=this
for(t=a.gao(),s=t.length,r=a.e,q=0,p=0;o=t.length,p<o;t.length===s||(0,A.n)(t),++p){o=r.n(0,t[p])
if((o==null?B.m:o).length>1)++q}n=k.x-k.w+1
m=k.z-k.y+1
l=k.e.length*6+q*4+o/(n*m)*30
if(n>m+1)l-=(n-m-1)*4
return k.a.f===B.j?l+a.gaQ()*40:l}}
A.cP.prototype={
$1(a){return u.c.a(a).d===B.d},
$S:3}
A.R.prototype={}
A.dd.prototype={
$1(a){return A.z(a).length===3},
$S:0}
A.de.prototype={
$1(a){return A.z(a).length>=6},
$S:0}
A.dg.prototype={
$1(a){return A.eR(a.c,B.A,this.a).length-this.b.e},
$S:15}
A.df.prototype={
$2(a,b){var t,s,r=u._
r.a(a)
r.a(b)
r=this.a
t=r.n(0,a)
t.toString
r=r.n(0,b)
r.toString
s=B.a.B(t,r)
return s!==0?s:B.a.B(b.d.length,a.d.length)},
$S:16}
A.dh.prototype={
$1(a){var t
A.z(a)
t=this.a
if(!B.c.ar(t,a))t=A.iu(t,a,0)
else t=!0
return t},
$S:0}
A.b4.prototype={}
A.cD.prototype={
b7(a,b){var t,s,r,q,p
for(t=this.a,s=t.length,r=this.b,q=0;q<t.length;t.length===s||(0,A.n)(t),++q){p=t[q]
r.j(0,p.a,p)}},
b4(a){var t,s,r,q,p,o,n,m,l,k,j=new Uint8Array(26)
for(t=a.length,s=0;s<t;++s){r=a.charCodeAt(s)-65
if(!(r>=0&&r<26))return A.b(j,r)
q=j[r]
if(!(r<26))return A.b(j,r)
j[r]=q+1}p=A.e([],u.s)
A:for(r=this.a,q=r.length,o=0;o<r.length;r.length===q||(0,A.n)(r),++o){n=r[o]
m=n.a
if(m.length>t)continue A
for(l=n.c,k=0;k<26;++k)if(l[k]>j[k])continue A
B.b.k(p,m)}return p},
bx(a,b){var t
u.C.a(b)
t=a.length
if(t<4||!B.c.aM(a,"S"))return!1
if(b.p(0,B.c.D(a,0,t-1)))return!0
if(B.c.aM(a,"ES")&&b.p(0,B.c.D(a,0,t-2)))return!0
return!1},
b5(a,b){var t,s
u.C.a(b)
if(!this.bx(a,b))return null
t=a.length
s=B.c.D(a,0,t-1)
if(b.p(0,s))return s
return B.c.D(a,0,t-2)}}
A.cl.prototype={}
A.da.prototype={
$1(a){return A.hz(A.eA(a))},
$S:17}
A.db.prototype={
$1(a){return A.ho(A.z(a))},
$S:18};(function aliases(){var t=J.ae.prototype
t.b6=t.i})();(function installTearOffs(){var t=hunkHelpers._static_2,s=hunkHelpers._static_1
t(J,"hD","fB",19)
s(A,"i4","hq",1)
t(A,"eY","i0",4)})();(function inheritance(){var t=hunkHelpers.mixin,s=hunkHelpers.inherit,r=hunkHelpers.inheritMany
s(A.q,null)
r(A.q,[A.dq,J.bL,A.be,J.ak,A.o,A.cL,A.c,A.as,A.bl,A.r,A.Z,A.aU,A.bm,A.ag,A.cM,A.cK,A.a9,A.B,A.cF,A.ap,A.aq,A.ao,A.Q,A.cc,A.ci,A.c7,A.cf,A.a8,A.p,A.bF,A.bH,A.cU,A.ab,A.al,A.cQ,A.c0,A.bf,A.cR,A.cw,A.at,A.bb,A.ah,A.cg,A.P,A.a6,A.co,A.c3,A.c5,A.X,A.cm,A.cC,A.cB,A.K,A.cO,A.R,A.b4,A.cD,A.cl])
r(J.bL,[J.bN,J.aZ,J.b0,J.b_,J.b1,J.aI,J.ac])
r(J.b0,[J.ae,J.l,A.aK,A.b9])
r(J.ae,[J.c1,J.aw,J.ad])
s(J.bM,A.be)
s(J.cx,J.l)
r(J.aI,[J.aY,J.bO])
r(A.o,[A.bR,A.bi,A.bP,A.ca,A.c4,A.cb,A.b3,A.bB,A.a2,A.bj,A.c9,A.bg,A.bG])
r(A.c,[A.aX,A.S])
r(A.aX,[A.J,A.O,A.cG,A.an])
r(A.J,[A.bh,A.b6,A.ce])
r(A.Z,[A.aO,A.aP])
s(A.a_,A.aO)
s(A.bs,A.aP)
s(A.N,A.aU)
r(A.ag,[A.aV,A.bt])
s(A.aW,A.aV)
s(A.bc,A.bi)
r(A.a9,[A.bD,A.bE,A.c8,A.d3,A.d5,A.cq,A.cr,A.cs,A.d8,A.d9,A.d0,A.cP,A.dd,A.de,A.dg,A.dh,A.da,A.db])
r(A.c8,[A.c6,A.aH])
r(A.B,[A.a4,A.cd])
s(A.b2,A.a4)
r(A.bE,[A.d4,A.cJ,A.cV,A.ct,A.cn,A.d7,A.d_,A.df])
r(A.b9,[A.bS,A.aL])
r(A.aL,[A.bo,A.bq])
s(A.bp,A.bo)
s(A.b7,A.bp)
s(A.br,A.bq)
s(A.b8,A.br)
r(A.b7,[A.bT,A.bU])
r(A.b8,[A.bV,A.bW,A.bX,A.bY,A.bZ,A.ba,A.c_])
s(A.bu,A.cb)
s(A.T,A.bt)
s(A.bQ,A.b3)
s(A.cy,A.bF)
r(A.bH,[A.cA,A.cz])
s(A.cT,A.cU)
s(A.cE,A.c7)
r(A.bD,[A.cu,A.cp])
r(A.a2,[A.aM,A.bK])
r(A.cQ,[A.aa,A.V,A.a3])
t(A.bo,A.p)
t(A.bp,A.r)
t(A.bq,A.p)
t(A.br,A.r)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{a:"int",k:"double",D:"num",f:"String",A:"bool",bb:"Null",h:"List",q:"Object",Y:"Map",t:"JSObject"},mangledNames:{},types:["A(f)","@(@)","~(q?,q?)","A(a6)","a(f,f)","@(@,f)","@(f)","0&()","a()","a3(a)","A(a,a)","A(a)","a(X,X)","a(K,K)","a(K)","a(R)","a(R,R)","f(t)","f(f)","a(@,@)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.a_&&a.b(c.a)&&b.b(c.b),"3;":(a,b,c)=>d=>d instanceof A.bs&&a.b(d.a)&&b.b(d.b)&&c.b(d.c)}}
A.he(v.typeUniverse,JSON.parse('{"c1":"ae","aw":"ae","ad":"ae","iD":"aK","bN":{"A":[],"j":[]},"aZ":{"j":[]},"b0":{"t":[]},"ae":{"t":[]},"l":{"h":["1"],"t":[],"c":["1"]},"bM":{"be":[]},"cx":{"l":["1"],"h":["1"],"t":[],"c":["1"]},"ak":{"C":["1"]},"aI":{"k":[],"D":[],"E":["D"]},"aY":{"k":[],"a":[],"D":[],"E":["D"],"j":[]},"bO":{"k":[],"D":[],"E":["D"],"j":[]},"ac":{"f":[],"E":["f"],"ec":[],"j":[]},"bR":{"o":[]},"aX":{"c":["1"]},"J":{"c":["1"]},"bh":{"J":["1"],"c":["1"],"J.E":"1","c.E":"1"},"as":{"C":["1"]},"b6":{"J":["2"],"c":["2"],"J.E":"2","c.E":"2"},"S":{"c":["1"],"c.E":"1"},"bl":{"C":["1"]},"a_":{"aO":[],"Z":[]},"bs":{"aP":[],"Z":[]},"aU":{"Y":["1","2"]},"bm":{"C":["1"]},"N":{"aU":["1","2"],"Y":["1","2"]},"aV":{"ag":["1"],"aN":["1"],"c":["1"]},"aW":{"aV":["1"],"ag":["1"],"aN":["1"],"c":["1"]},"bc":{"o":[]},"bP":{"o":[]},"ca":{"o":[]},"a9":{"am":[]},"bD":{"am":[]},"bE":{"am":[]},"c8":{"am":[]},"c6":{"am":[]},"aH":{"am":[]},"c4":{"o":[]},"a4":{"B":["1","2"],"ds":["1","2"],"Y":["1","2"],"B.K":"1","B.V":"2"},"O":{"c":["1"],"c.E":"1"},"ap":{"C":["1"]},"cG":{"c":["1"],"c.E":"1"},"aq":{"C":["1"]},"an":{"c":["at<1,2>"],"c.E":"at<1,2>"},"ao":{"C":["at<1,2>"]},"b2":{"a4":["1","2"],"B":["1","2"],"ds":["1","2"],"Y":["1","2"],"B.K":"1","B.V":"2"},"aO":{"Z":[]},"aP":{"Z":[]},"aK":{"t":[],"j":[]},"b9":{"t":[]},"bS":{"t":[],"j":[]},"aL":{"F":["1"],"t":[]},"b7":{"p":["k"],"h":["k"],"F":["k"],"t":[],"c":["k"],"r":["k"]},"b8":{"p":["a"],"h":["a"],"F":["a"],"t":[],"c":["a"],"r":["a"]},"bT":{"p":["k"],"h":["k"],"F":["k"],"t":[],"c":["k"],"r":["k"],"j":[],"p.E":"k","r.E":"k"},"bU":{"p":["k"],"h":["k"],"F":["k"],"t":[],"c":["k"],"r":["k"],"j":[],"p.E":"k","r.E":"k"},"bV":{"p":["a"],"h":["a"],"F":["a"],"t":[],"c":["a"],"r":["a"],"j":[],"p.E":"a","r.E":"a"},"bW":{"p":["a"],"h":["a"],"F":["a"],"t":[],"c":["a"],"r":["a"],"j":[],"p.E":"a","r.E":"a"},"bX":{"p":["a"],"h":["a"],"F":["a"],"t":[],"c":["a"],"r":["a"],"j":[],"p.E":"a","r.E":"a"},"bY":{"p":["a"],"h":["a"],"F":["a"],"t":[],"c":["a"],"r":["a"],"j":[],"p.E":"a","r.E":"a"},"bZ":{"p":["a"],"h":["a"],"F":["a"],"t":[],"c":["a"],"r":["a"],"j":[],"p.E":"a","r.E":"a"},"ba":{"p":["a"],"h":["a"],"F":["a"],"t":[],"c":["a"],"r":["a"],"j":[],"p.E":"a","r.E":"a"},"c_":{"dB":[],"p":["a"],"h":["a"],"F":["a"],"t":[],"c":["a"],"r":["a"],"j":[],"p.E":"a","r.E":"a"},"cb":{"o":[]},"bu":{"o":[]},"T":{"ag":["1"],"ea":["1"],"aN":["1"],"c":["1"]},"a8":{"C":["1"]},"B":{"Y":["1","2"]},"ag":{"aN":["1"],"c":["1"]},"bt":{"ag":["1"],"aN":["1"],"c":["1"]},"cd":{"B":["f","@"],"Y":["f","@"],"B.K":"f","B.V":"@"},"ce":{"J":["f"],"c":["f"],"J.E":"f","c.E":"f"},"b3":{"o":[]},"bQ":{"o":[]},"ab":{"E":["ab"]},"k":{"D":[],"E":["D"]},"al":{"E":["al"]},"a":{"D":[],"E":["D"]},"h":{"c":["1"]},"D":{"E":["D"]},"aN":{"c":["1"]},"f":{"E":["f"],"ec":[]},"bB":{"o":[]},"bi":{"o":[]},"a2":{"o":[]},"aM":{"o":[]},"bK":{"o":[]},"bj":{"o":[]},"c9":{"o":[]},"bg":{"o":[]},"bG":{"o":[]},"c0":{"o":[]},"bf":{"o":[]},"ah":{"fU":[]},"cg":{"fQ":[]},"fw":{"h":["a"],"c":["a"]},"dB":{"h":["a"],"c":["a"]},"fY":{"h":["a"],"c":["a"]},"fu":{"h":["a"],"c":["a"]},"fW":{"h":["a"],"c":["a"]},"fv":{"h":["a"],"c":["a"]},"fX":{"h":["a"],"c":["a"]},"fs":{"h":["k"],"c":["k"]},"ft":{"h":["k"],"c":["k"]}}'))
A.hd(v.typeUniverse,JSON.parse('{"aX":1,"aL":1,"c7":2,"bt":1,"bF":2,"bH":2}'))
var u=(function rtii(){var t=A.aB
return{I:t("V"),l:t("aa"),V:t("E<@>"),k:t("ab"),O:t("X"),d:t("al"),e:t("o"),Z:t("am"),W:t("N<a,k>"),h:t("c<@>"),F:t("l<V>"),B:t("l<X>"),a:t("l<b4>"),f:t("l<q>"),D:t("l<a6>"),s:t("l<f>"),Y:t("l<R>"),R:t("l<K>"),b:t("l<@>"),t:t("l<a>"),T:t("aZ"),m:t("t"),L:t("ad"),p:t("F<@>"),q:t("b4"),u:t("h<X>"),r:t("h<f>"),J:t("h<K>"),j:t("h<@>"),v:t("h<a>"),w:t("Y<f,@>"),G:t("Y<@,@>"),P:t("bb"),K:t("q"),x:t("iE"),A:t("+()"),C:t("aN<f>"),c:t("a6"),N:t("f"),E:t("j"),o:t("aw"),_:t("R"),U:t("S<f>"),M:t("K"),y:t("A"),Q:t("A(f)"),i:t("k"),S:t("a"),bc:t("e5<bb>?"),z:t("t?"),aL:t("h<@>?"),X:t("q?"),aD:t("f?"),g:t("cf?"),cG:t("A?"),dd:t("k?"),a3:t("a?"),n:t("D?"),H:t("D"),cQ:t("~(f,@)")}})();(function constants(){var t=hunkHelpers.makeConstList
B.I=J.bL.prototype
B.b=J.l.prototype
B.a=J.aY.prototype
B.t=J.aI.prototype
B.c=J.ac.prototype
B.J=J.ad.prototype
B.K=J.b0.prototype
B.z=J.c1.prototype
B.u=J.aw.prototype
B.f=new A.V(0,"free")
B.j=new A.V(1,"mirror")
B.n=new A.V(2,"spine")
B.o=new A.V(3,"leaf")
B.p=new A.V(4,"plus")
B.q=new A.V(5,"ring")
B.w=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.B=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof HTMLElement == "function";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
B.G=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var userAgent = navigator.userAgent;
    if (typeof userAgent != "string") return hooks;
    if (userAgent.indexOf("DumpRenderTree") >= 0) return hooks;
    if (userAgent.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
B.C=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.F=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
B.E=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
B.D=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
B.v=function(hooks) { return hooks; }

B.h=new A.cy()
B.x=new A.cE()
B.H=new A.c0()
B.k=new A.cL()
B.i=new A.aa(1,"common")
B.d=new A.a3("A",0,"across")
B.e=new A.a3("D",1,"down")
B.L=new A.cz(null)
B.M=new A.cA(null)
B.O=t([B.j,B.n,B.o,B.p,B.q],u.F)
B.P=t(["dict.txt","dict_blocked.txt","dict_bonus_only.txt","stoplist.txt","allowlist.txt"],u.s)
B.y=t([B.f,B.j,B.n,B.o,B.p,B.q],u.F)
B.T=t([],u.B)
B.Q=t([],u.s)
B.S=t([],u.Y)
B.R=t([],u.R)
B.m=t([],u.t)
B.U=t([B.d,B.e],A.aB("l<a3>"))
B.r=new A.aa(0,"veryCommon")
B.l=new A.aa(2,"someLessCommon")
B.V=t([B.r,B.i,B.l],A.aB("l<aa>"))
B.a3=new A.P("Easy",5,3,5,6,B.r,2,0,4,8,B.f)
B.a6=new A.P("Easy",6,3,6,7,B.i,2,0,6,9,B.f)
B.a8=new A.P("Medium",6,3,7,8,B.i,2,0,6,9,B.f)
B.a2=new A.P("Medium-hard",7,3,8,9,B.l,2,2,22,10,B.f)
B.a5=new A.P("Hard",7,3,10,11,B.l,2,3,25,10,B.f)
B.a4=new A.P("Fun board",6,3,8,9,B.i,2,0,6,11,B.f)
B.a7=new A.P("Toughest",7,3,12,13,B.l,2,4,28,11,B.f)
B.X=new A.N([1,B.a3,2,B.a6,3,B.a8,4,B.a2,5,B.a5,6,B.a4,7,B.a7],A.aB("N<a,P>"))
B.Z=new A.N([3,0.16,4,0.35,5,0.26,6,0.18,7,0.12],u.W)
B.a_=new A.N([3,0.22,4,0.55,5,0.4,6,0.28,7,0.18],u.W)
B.Y=new A.N([3,0.26,4,0.65,5,0.5,6,0.36,7,0.24],u.W)
B.a0=new A.N([B.r,B.Z,B.i,B.a_,B.l,B.Y],A.aB("N<aa,Y<a,k>>"))
B.a1={}
B.A=new A.aW(B.a1,0,A.aB("aW<f>"))
B.N=t(["....###....","....###....","....###....","....###....","###########","###########","###########","....###....","....###....","....###....","....###...."],u.s)
B.a9=new A.c5(B.N)
B.W=t(["......#......",".....###.....","..#..###..#..","..##.###.##..","#.#########.#","#############",".###########.","..#########..",".###########.","####..#..####","......#......","......#......","......#......"],u.s)
B.aa=new A.c5(B.W)
B.ab=A.U("iz")
B.ac=A.U("iA")
B.ad=A.U("fs")
B.ae=A.U("ft")
B.af=A.U("fu")
B.ag=A.U("fv")
B.ah=A.U("fw")
B.ai=A.U("q")
B.aj=A.U("fW")
B.ak=A.U("fX")
B.al=A.U("fY")
B.am=A.U("dB")})();(function staticFields(){$.cS=null
$.H=A.e([],u.f)
$.ed=null
$.e0=null
$.e_=null
$.eT=null
$.eO=null
$.eX=null
$.d1=null
$.d6=null
$.dP=null
$.cW=A.e([],A.aB("l<h<q>?>"))
$.dj=function(){var t=u.N
return A.a5(t,t)}()
$.eM=null})();(function lazyInitializers(){var t=hunkHelpers.lazyFinal
t($,"iC","f1",()=>A.d2("_$dart_dartClosure"))
t($,"iB","dU",()=>A.d2("_$dart_dartClosure_dartJSInterop"))
t($,"iQ","fc",()=>A.e([new J.bM()],A.aB("l<be>")))
t($,"iF","f2",()=>A.a7(A.cN({
toString:function(){return"$receiver$"}})))
t($,"iG","f3",()=>A.a7(A.cN({$method$:null,
toString:function(){return"$receiver$"}})))
t($,"iH","f4",()=>A.a7(A.cN(null)))
t($,"iI","f5",()=>A.a7(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(s){return s.message}}()))
t($,"iL","f8",()=>A.a7(A.cN(void 0)))
t($,"iM","f9",()=>A.a7(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(s){return s.message}}()))
t($,"iK","f7",()=>A.a7(A.ej(null)))
t($,"iJ","f6",()=>A.a7(function(){try{null.$method$}catch(s){return s.message}}()))
t($,"iO","fb",()=>A.a7(A.ej(void 0)))
t($,"iN","fa",()=>A.a7(function(){try{(void 0).$method$}catch(s){return s.message}}()))
t($,"iP","dk",()=>A.dT(B.ai))
t($,"iR","dV",()=>A.fp(2026,11,3))})();(function nativeSupport(){!function(){var t=function(a){var n={}
n[a]=1
return Object.keys(hunkHelpers.convertToFastObject(n))[0]}
v.getIsolateTag=function(a){return t("___dart_"+a+v.isolateTag)}
var s="___dart_isolate_tags_"
var r=Object[s]||(Object[s]=Object.create(null))
var q="_ZxYxX"
for(var p=0;;p++){var o=t(q+"_"+p+"_")
if(!(o in r)){r[o]=1
v.isolateTag=o
break}}v.dispatchPropertyName=v.getIsolateTag("dispatch_record")}()
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.aK,SharedArrayBuffer:A.aK,ArrayBufferView:A.b9,DataView:A.bS,Float32Array:A.bT,Float64Array:A.bU,Int16Array:A.bV,Int32Array:A.bW,Int8Array:A.bX,Uint16Array:A.bY,Uint32Array:A.bZ,Uint8ClampedArray:A.ba,CanvasPixelArray:A.ba,Uint8Array:A.c_})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.aL.$nativeSuperclassTag="ArrayBufferView"
A.bo.$nativeSuperclassTag="ArrayBufferView"
A.bp.$nativeSuperclassTag="ArrayBufferView"
A.b7.$nativeSuperclassTag="ArrayBufferView"
A.bq.$nativeSuperclassTag="ArrayBufferView"
A.br.$nativeSuperclassTag="ArrayBufferView"
A.b8.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$0=function(){return this()}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var t=document.scripts
function onLoad(b){for(var r=0;r<t.length;++r){t[r].removeEventListener("load",onLoad,false)}a(b.target)}for(var s=0;s<t.length;++s){t[s].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var t=A.io
if(typeof dartMainRunner==="function"){dartMainRunner(t,[])}else{t([])}})})()