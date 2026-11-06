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
if(a[b]!==t){A.iA(b)}a[b]=s}var r=a[b]
a[c]=function(){return r}
return r}}function makeConstList(a,b){if(b!=null)A.e(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var t=0;t<a.length;++t){convertToFastObject(a[t])}}var y=0
function instanceTearOffGetter(a,b){var t=null
return a?function(c){if(t===null)t=A.dT(b)
return new t(c,this)}:function(){if(t===null)t=A.dT(b)
return new t(this,null)}}function staticTearOffGetter(a){var t=null
return function(){if(t===null)t=A.dT(a).prototype
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
dY(a,b,c,d){return{i:a,p:b,e:c,x:d}},
dV(a){var t,s,r,q,p,o="_$dart_js",n=a[v.dispatchPropertyName]
if(n==null)if($.dW==null){A.il()
n=a[v.dispatchPropertyName]}if(n!=null){t=n.p
if(!1===t)return n.i
if(!0===t)return a
s=Object.getPrototypeOf(a)
if(t===s)return n.i
if(n.e===s)throw A.d(A.eq("Return interceptor for "+A.i(t(a,n))))}r=a.constructor
if(r==null)q=null
else{p=$.cS
if(p==null)p=$.cS=A.d3(o)
q=r[p]}if(q!=null)return q
q=A.is(a)
if(q!=null)return q
if(typeof a=="function")return B.K
t=Object.getPrototypeOf(a)
if(t==null)return B.A
if(t===Object.prototype)return B.A
if(typeof r=="function"){p=$.cS
if(p==null)p=$.cS=A.d3(o)
Object.defineProperty(r,p,{value:B.v,enumerable:false,writable:true,configurable:true})
return B.v}return B.v},
fC(a,b){if(a<0||a>4294967295)throw A.d(A.av(a,0,4294967295,"length",null))
return J.fD(new Array(a),b)},
ed(a,b){if(a<0)throw A.d(A.cl("Length must be a non-negative integer: "+a))
return A.e(new Array(a),b.h("l<0>"))},
fD(a,b){var t=A.e(a,b.h("l<0>"))
t.$flags=1
return t},
fE(a,b){var t=u.V
return J.e3(t.a(a),t.a(b))},
ee(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
fF(a,b){var t,s
for(t=a.length;b<t;){s=a.charCodeAt(b)
if(s!==32&&s!==13&&!J.ee(s))break;++b}return b},
fG(a,b){var t,s,r
for(t=a.length;b>0;b=s){s=b-1
if(!(s<t))return A.b(a,s)
r=a.charCodeAt(s)
if(r!==32&&r!==13&&!J.ee(r))break}return b},
aB(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.aZ.prototype
return J.bO.prototype}if(typeof a=="string")return J.ad.prototype
if(a==null)return J.b_.prototype
if(typeof a=="boolean")return J.bN.prototype
if(Array.isArray(a))return J.l.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ae.prototype
if(typeof a=="symbol")return J.b2.prototype
if(typeof a=="bigint")return J.b0.prototype
return a}if(a instanceof A.q)return a
return J.dV(a)},
dU(a){if(typeof a=="string")return J.ad.prototype
if(a==null)return a
if(Array.isArray(a))return J.l.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ae.prototype
if(typeof a=="symbol")return J.b2.prototype
if(typeof a=="bigint")return J.b0.prototype
return a}if(a instanceof A.q)return a
return J.dV(a)},
aC(a){if(a==null)return a
if(Array.isArray(a))return J.l.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ae.prototype
if(typeof a=="symbol")return J.b2.prototype
if(typeof a=="bigint")return J.b0.prototype
return a}if(a instanceof A.q)return a
return J.dV(a)},
ig(a){if(typeof a=="number")return J.aJ.prototype
if(typeof a=="string")return J.ad.prototype
if(a==null)return a
if(!(a instanceof A.q))return J.aw.prototype
return a},
ih(a){if(typeof a=="string")return J.ad.prototype
if(a==null)return a
if(!(a instanceof A.q))return J.aw.prototype
return a},
I(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.aB(a).K(a,b)},
u(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.ip(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.dU(a).n(a,b)},
e2(a,b){return J.aC(a).k(a,b)},
e3(a,b){return J.ig(a).B(a,b)},
e4(a,b){return J.aC(a).G(a,b)},
a2(a){return J.aB(a).gq(a)},
fg(a){return J.aC(a).gaQ(a)},
dp(a){return J.aC(a).gv(a)},
J(a){return J.dU(a).gl(a)},
fh(a){return J.aB(a).gA(a)},
fi(a,b){return J.aC(a).Y(a,b)},
fj(a,b,c){return J.ih(a).D(a,b,c)},
bz(a){return J.aB(a).i(a)},
bL:function bL(){},
bN:function bN(){},
b_:function b_(){},
b1:function b1(){},
af:function af(){},
c2:function c2(){},
aw:function aw(){},
ae:function ae(){},
b0:function b0(){},
b2:function b2(){},
l:function l(a){this.$ti=a},
bM:function bM(){},
cx:function cx(a){this.$ti=a},
al:function al(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aJ:function aJ(){},
aZ:function aZ(){},
bO:function bO(){},
ad:function ad(){}},A={dt:function dt(){},
eg(a){return new A.bR("Field '"+a+"' has been assigned during initialization.")},
aj(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
dG(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
eU(a,b,c){return a},
dX(a){var t,s
for(t=$.H.length,s=0;s<t;++s)if(a===$.H[s])return!0
return!1},
fZ(a,b,c,d){A.dE(b,"start")
A.dE(c,"end")
if(b>c)A.a1(A.av(b,0,c,"start",null))
return new A.bh(a,b,c,d.h("bh<0>"))},
fA(){return new A.bg("No element")},
bR:function bR(a){this.a=a},
cL:function cL(){},
aY:function aY(){},
K:function K(){},
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
T:function T(a,b,c){this.a=a
this.b=b
this.$ti=c},
bl:function bl(a,b,c){this.a=a
this.b=b
this.$ti=c},
r:function r(){},
dq(){throw A.d(A.bk("Cannot modify constant Set"))},
f3(a){var t=A.f2(a)
if(t!=null)return t
return"minified:"+a},
ip(a,b){var t
if(b!=null){t=b.x
if(t!=null)return t}return u.p.b(a)},
i(a){var t
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
t=J.bz(a)
return t},
bd(a){var t,s=$.ej
if(s==null)s=$.ej=Symbol("identityHashCode")
t=a[s]
if(t==null){t=Math.random()*0x3fffffff|0
a[s]=t}return t},
ag(a,b){var t,s,r,q,p,o=null,n=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
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
c3(a){var t,s,r,q
if(a instanceof A.q)return A.G(A.aD(a),null)
t=J.aB(a)
if(t===B.J||t===B.L||u.o.b(a)){s=B.x(a)
if(s!=="Object"&&s!=="")return s
r=a.constructor
if(typeof r=="function"){q=r.name
if(typeof q=="string"&&q!=="Object"&&q!=="")return q}}return A.G(A.aD(a),null)},
ek(a){var t,s,r
if(a==null||typeof a=="number"||A.dQ(a))return J.bz(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.aa)return a.i(0)
if(a instanceof A.a_)return a.aG(!0)
t=$.ff()
for(s=0;s<1;++s){r=t[s].bB(a)
if(r!=null)return r}return"Instance of '"+A.c3(a)+"'"},
y(a){var t
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){t=a-65536
return String.fromCharCode((B.b.aE(t,10)|55296)>>>0,t&1023|56320)}throw A.d(A.av(a,0,1114111,null,null))},
fR(a,b,c,d,e,f,g,h,i){var t,s,r,q=b-1
if(a<100){a+=400
q-=4800}t=B.b.C(h,1000)
s=Date.UTC(a,q,c,d,e,f,g+B.b.t(h-t,1000))
r=!0
if(!isNaN(s))if(!(s<-864e13))if(!(s>864e13))r=s===864e13&&t!==0
if(r)return null
return s},
au(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
fQ(a){var t=A.au(a).getUTCFullYear()+0
return t},
fO(a){var t=A.au(a).getUTCMonth()+1
return t},
fK(a){var t=A.au(a).getUTCDate()+0
return t},
fL(a){var t=A.au(a).getUTCHours()+0
return t},
fN(a){var t=A.au(a).getUTCMinutes()+0
return t},
fP(a){var t=A.au(a).getUTCSeconds()+0
return t},
fM(a){var t=A.au(a).getUTCMilliseconds()+0
return t},
dD(a){var t=A.au(a).getUTCDay()+0
return B.b.C(t+6,7)+1},
b(a,b){if(a==null)J.J(a)
throw A.d(A.cj(a,b))},
cj(a,b){var t,s="index"
if(!A.d1(b))return new A.a3(!0,b,s,null)
t=J.J(a)
if(b<0||b>=t)return A.dr(b,t,a,s)
return new A.aN(null,null,!0,b,s,"Value not in range")},
i3(a){return new A.a3(!0,a,null,null)},
d(a){return A.x(a,new Error())},
x(a,b){var t
if(a==null)a=new A.bi()
b.dartException=a
t=A.iC
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:t})
b.name=""}else b.toString=t
return b},
iC(){return J.bz(this.dartException)},
a1(a,b){throw A.x(a,b==null?new Error():b)},
aG(a,b,c){var t
if(b==null)b=0
if(c==null)c=0
t=Error()
A.a1(A.hv(a,b,c),t)},
hv(a,b,c){var t,s,r,q,p,o,n,m,l
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
n(a){throw A.d(A.X(a))},
a8(a){var t,s,r,q,p,o
a=A.ix(a.replace(String({}),"$receiver$"))
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
ep(a){return function($expr$){try{$expr$.$method$}catch(t){return t.message}}(a)},
du(a,b){var t=b==null,s=t?null:b.method
return new A.bP(a,s,t?null:b.receiver)},
ck(a){if(a==null)return new A.cJ(a)
if(typeof a!=="object")return a
if("dartException" in a)return A.aF(a,a.dartException)
return A.i1(a)},
aF(a,b){if(u.e.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
i1(a){var t,s,r,q,p,o,n,m,l,k,j,i,h
if(!("message" in a))return a
t=a.message
if("number" in a&&typeof a.number=="number"){s=a.number
r=s&65535
if((B.b.aE(s,16)&8191)===10)switch(r){case 438:return A.aF(a,A.du(A.i(t)+" (Error "+r+")",null))
case 445:case 5007:A.i(t)
return A.aF(a,new A.bc())}}if(a instanceof TypeError){q=$.f5()
p=$.f6()
o=$.f7()
n=$.f8()
m=$.fb()
l=$.fc()
k=$.fa()
$.f9()
j=$.fe()
i=$.fd()
h=q.I(t)
if(h!=null)return A.aF(a,A.du(A.v(t),h))
else{h=p.I(t)
if(h!=null){h.method="call"
return A.aF(a,A.du(A.v(t),h))}else if(o.I(t)!=null||n.I(t)!=null||m.I(t)!=null||l.I(t)!=null||k.I(t)!=null||n.I(t)!=null||j.I(t)!=null||i.I(t)!=null){A.v(t)
return A.aF(a,new A.bc())}}return A.aF(a,new A.ca(typeof t=="string"?t:""))}if(a instanceof RangeError){if(typeof t=="string"&&t.indexOf("call stack")!==-1)return new A.bf()
t=function(b){try{return String(b)}catch(g){}return null}(a)
return A.aF(a,new A.a3(!1,null,null,typeof t=="string"?t.replace(/^RangeError:\s*/,""):t))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof t=="string"&&t==="too much recursion")return new A.bf()
return a},
dZ(a){if(a==null)return J.a2(a)
if(typeof a=="object")return A.bd(a)
return J.a2(a)},
i6(a){if(typeof a=="number")return B.t.gq(a)
if(a instanceof A.ci)return A.bd(a)
if(a instanceof A.a_)return a.gq(a)
return A.dZ(a)},
eX(a,b){var t,s,r,q=a.length
for(t=0;t<q;t=r){s=t+1
r=s+1
b.j(0,a[t],a[s])}return b},
id(a,b){var t,s=a.length
for(t=0;t<s;++t)b.k(0,a[t])
return b},
hI(a,b,c,d,e,f){u.Z.a(a)
switch(A.ay(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.d(new A.cR("Unsupported number of arguments for wrapped closure"))},
i7(a,b){var t=a.$identity
if(!!t)return t
t=A.i8(a,b)
a.$identity=t
return t},
i8(a,b){var t
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.hI)},
fr(a1){var t,s,r,q,p,o,n,m,l,k,j=a1.co,i=a1.iS,h=a1.iI,g=a1.nDA,f=a1.aI,e=a1.fs,d=a1.cs,c=e[0],b=d[0],a=j[c],a0=a1.fT
a0.toString
t=i?Object.create(new A.c6().constructor.prototype):Object.create(new A.aH(null,null).constructor.prototype)
t.$initialize=t.constructor
s=i?function static_tear_off(){this.$initialize()}:function tear_off(a2,a3){this.$initialize(a2,a3)}
t.constructor=s
s.prototype=t
t.$_name=c
t.$_target=a
r=!i
if(r)q=A.e9(c,a,h,g)
else{t.$static_name=c
q=a}t.$S=A.fn(a0,i,h)
t[b]=q
for(p=q,o=1;o<e.length;++o){n=e[o]
if(typeof n=="string"){m=j[n]
l=n
n=m}else l=""
k=d[o]
if(k!=null){if(r)n=A.e9(l,n,h,g)
t[k]=n}if(o===f)p=n}t.$C=p
t.$R=a1.rC
t.$D=a1.dV
return s},
fn(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.d("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.fk)}throw A.d("Error in functionType of tearoff")},
fo(a,b,c,d){var t=A.e8
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,t)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,t)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,t)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,t)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,t)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,t)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,t)}},
e9(a,b,c,d){if(c)return A.fq(a,b,d)
return A.fo(b.length,d,a,b)},
fp(a,b,c,d){var t=A.e8,s=A.fl
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
fq(a,b,c){var t,s
if($.e6==null)$.e6=A.e5("interceptor")
if($.e7==null)$.e7=A.e5("receiver")
t=b.length
s=A.fp(t,c,a,b)
return s},
dT(a){return A.fr(a)},
fk(a,b){return A.by(v.typeUniverse,A.aD(a.a),b)},
e8(a){return a.a},
fl(a){return a.b},
e5(a){var t,s,r,q=new A.aH("receiver","interceptor"),p=Object.getOwnPropertyNames(q)
p.$flags=1
t=p
for(p=t.length,s=0;s<p;++s){r=t[s]
if(q[r]===a)return r}throw A.d(A.cl("Field name "+a+" not found."))},
d3(a){return v.getIsolateTag(a)},
is(a){var t,s,r,q,p,o=A.v($.eY.$1(a)),n=$.d2[o]
if(n!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}t=$.d7[o]
if(t!=null)return t
s=v.interceptorsByTag[o]
if(s==null){r=A.dN($.eT.$2(a,o))
if(r!=null){n=$.d2[r]
if(n!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}t=$.d7[r]
if(t!=null)return t
s=v.interceptorsByTag[r]
o=r}}if(s==null)return null
t=s.prototype
q=o[0]
if(q==="!"){n=A.df(t)
$.d2[o]=n
Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}if(q==="~"){$.d7[o]=t
return t}if(q==="-"){p=A.df(t)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:p,enumerable:false,writable:true,configurable:true})
return p.i}if(q==="+")return A.f0(a,t)
if(q==="*")throw A.d(A.eq(o))
if(v.leafTags[o]===true){p=A.df(t)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:p,enumerable:false,writable:true,configurable:true})
return p.i}else return A.f0(a,t)},
f0(a,b){var t=Object.getPrototypeOf(a)
Object.defineProperty(t,v.dispatchPropertyName,{value:J.dY(b,t,null,null),enumerable:false,writable:true,configurable:true})
return b},
df(a){return J.dY(a,!1,null,!!a.$iF)},
iu(a,b,c){var t=b.prototype
if(v.leafTags[a]===true)return A.df(t)
else return J.dY(t,c,null,null)},
il(){if(!0===$.dW)return
$.dW=!0
A.im()},
im(){var t,s,r,q,p,o,n,m
$.d2=Object.create(null)
$.d7=Object.create(null)
A.ik()
t=v.interceptorsByTag
s=Object.getOwnPropertyNames(t)
if(typeof window!="undefined"){window
r=function(){}
for(q=0;q<s.length;++q){p=s[q]
o=$.f1.$1(p)
if(o!=null){n=A.iu(p,t[p],o)
if(n!=null){Object.defineProperty(o,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
r.prototype=o}}}}for(q=0;q<s.length;++q){p=s[q]
if(/^[A-Za-z_]/.test(p)){m=t[p]
t["!"+p]=m
t["~"+p]=m
t["-"+p]=m
t["+"+p]=m
t["*"+p]=m}}},
ik(){var t,s,r,q,p,o,n=B.C()
n=A.aS(B.D,A.aS(B.E,A.aS(B.w,A.aS(B.w,A.aS(B.F,A.aS(B.G,A.aS(B.H(B.x),n)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){t=dartNativeDispatchHooksTransformer
if(typeof t=="function")t=[t]
if(Array.isArray(t))for(s=0;s<t.length;++s){r=t[s]
if(typeof r=="function")n=r(n)||n}}q=n.getTag
p=n.getUnknownTag
o=n.prototypeForTag
$.eY=new A.d4(q)
$.eT=new A.d5(p)
$.f1=new A.d6(o)},
aS(a,b){return a(b)||b},
ia(a,b){var t=b.length,s=v.rttc[""+t+";"+a]
if(s==null)return null
if(t===0)return s
if(t===s.length)return s.apply(null,b)
return s(b)},
iz(a,b,c){var t=a.indexOf(b,c)
return t>=0},
ix(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
a0:function a0(a,b){this.a=a
this.b=b},
bs:function bs(a,b,c){this.a=a
this.b=b
this.c=c},
aV:function aV(){},
bm:function bm(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
N:function N(a,b){this.a=a
this.$ti=b},
aW:function aW(){},
aI:function aI(a,b,c){this.a=a
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
cJ:function cJ(a){this.a=a},
aa:function aa(){},
bD:function bD(){},
bE:function bE(){},
c8:function c8(){},
c6:function c6(){},
aH:function aH(a,b){this.a=a
this.b=b},
c4:function c4(a){this.a=a},
a5:function a5(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
cF:function cF(a,b){this.a=a
this.b=b
this.c=null},
O:function O(a,b){this.a=a
this.$ti=b},
aq:function aq(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
cG:function cG(a,b){this.a=a
this.$ti=b},
ar:function ar(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
ao:function ao(a,b){this.a=a
this.$ti=b},
ap:function ap(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b3:function b3(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
d4:function d4(a){this.a=a},
d5:function d5(a){this.a=a},
d6:function d6(a){this.a=a},
a_:function a_(){},
aP:function aP(){},
aQ:function aQ(){},
eK(a,b,c){if(a>>>0!==a||a>=c)throw A.d(A.cj(b,a))},
aL:function aL(){},
b9:function b9(){},
bT:function bT(){},
aM:function aM(){},
b7:function b7(){},
b8:function b8(){},
bU:function bU(){},
bV:function bV(){},
bW:function bW(){},
bX:function bX(){},
bY:function bY(){},
bZ:function bZ(){},
c_:function c_(){},
ba:function ba(){},
c0:function c0(){},
bo:function bo(){},
bp:function bp(){},
bq:function bq(){},
br:function br(){},
dF(a,b){var t=b.c
return t==null?b.c=A.bw(a,"ec",[b.x]):t},
em(a){var t=a.w
if(t===6||t===7)return A.em(a.x)
return t===11||t===12},
fX(a){return a.as},
aT(a){return A.cX(v.typeUniverse,a,!1)},
az(a0,a1,a2,a3){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=a1.w
switch(a){case 5:case 1:case 2:case 3:case 4:return a1
case 6:t=a1.x
s=A.az(a0,t,a2,a3)
if(s===t)return a1
return A.ez(a0,s,!0)
case 7:t=a1.x
s=A.az(a0,t,a2,a3)
if(s===t)return a1
return A.ey(a0,s,!0)
case 8:r=a1.y
q=A.aR(a0,r,a2,a3)
if(q===r)return a1
return A.bw(a0,a1.x,q)
case 9:p=a1.x
o=A.az(a0,p,a2,a3)
n=a1.y
m=A.aR(a0,n,a2,a3)
if(o===p&&m===n)return a1
return A.dL(a0,o,m)
case 10:l=a1.x
k=a1.y
j=A.aR(a0,k,a2,a3)
if(j===k)return a1
return A.eA(a0,l,j)
case 11:i=a1.x
h=A.az(a0,i,a2,a3)
g=a1.y
f=A.hZ(a0,g,a2,a3)
if(h===i&&f===g)return a1
return A.ex(a0,h,f)
case 12:e=a1.y
a3+=e.length
d=A.aR(a0,e,a2,a3)
p=a1.x
o=A.az(a0,p,a2,a3)
if(d===e&&o===p)return a1
return A.dM(a0,o,d,!0)
case 13:c=a1.x
if(c<a3)return a1
b=a2[c-a3]
if(b==null)return a1
return b
default:throw A.d(A.bC("Attempted to substitute unexpected RTI kind "+a))}},
aR(a,b,c,d){var t,s,r,q,p=b.length,o=A.cY(p)
for(t=!1,s=0;s<p;++s){r=b[s]
q=A.az(a,r,c,d)
if(q!==r)t=!0
o[s]=q}return t?o:b},
i_(a,b,c,d){var t,s,r,q,p,o,n=b.length,m=A.cY(n)
for(t=!1,s=0;s<n;s+=3){r=b[s]
q=b[s+1]
p=b[s+2]
o=A.az(a,p,c,d)
if(o!==p)t=!0
m.splice(s,3,r,q,o)}return t?m:b},
hZ(a,b,c,d){var t,s=b.a,r=A.aR(a,s,c,d),q=b.b,p=A.aR(a,q,c,d),o=b.c,n=A.i_(a,o,c,d)
if(r===s&&p===q&&n===o)return b
t=new A.cc()
t.a=r
t.b=p
t.c=n
return t},
e(a,b){a[v.arrayRti]=b
return a},
eV(a){var t=a.$S
if(t!=null){if(typeof t=="number")return A.ij(t)
return a.$S()}return null},
io(a,b){var t
if(A.em(b))if(a instanceof A.aa){t=A.eV(a)
if(t!=null)return t}return A.aD(a)},
aD(a){if(a instanceof A.q)return A.m(a)
if(Array.isArray(a))return A.B(a)
return A.dP(J.aB(a))},
B(a){var t=a[v.arrayRti],s=u.b
if(t==null)return s
if(t.constructor!==s.constructor)return s
return t},
m(a){var t=a.$ti
return t!=null?t:A.dP(a)},
dP(a){var t=a.constructor,s=t.$ccache
if(s!=null)return s
return A.hG(a,t)},
hG(a,b){var t=a instanceof A.aa?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,s=A.hj(v.typeUniverse,t.name)
b.$ccache=s
return s},
ij(a){var t,s=v.types,r=s[a]
if(typeof r=="string"){t=A.cX(v.typeUniverse,r,!1)
s[a]=t
return t}return r},
ii(a){return A.aA(A.m(a))},
dS(a){var t
if(a instanceof A.a_)return A.ib(a.$r,a.ae())
t=a instanceof A.aa?A.eV(a):null
if(t!=null)return t
if(u.A.b(a))return J.fh(a).a
if(Array.isArray(a))return A.B(a)
return A.aD(a)},
aA(a){var t=a.r
return t==null?a.r=new A.ci(a):t},
ib(a,b){var t,s,r=b,q=r.length
if(q===0)return u.x
if(0>=q)return A.b(r,0)
t=A.by(v.typeUniverse,A.dS(r[0]),"@<0>")
for(s=1;s<q;++s){if(!(s<r.length))return A.b(r,s)
t=A.eC(v.typeUniverse,t,A.dS(r[s]))}return A.by(v.typeUniverse,t,a)},
V(a){return A.aA(A.cX(v.typeUniverse,a,!1))},
hF(a){var t=this
t.b=A.hY(t)
return t.b(a)},
hY(a){var t,s,r,q,p
if(a===u.K)return A.hO
if(A.aE(a))return A.hS
t=a.w
if(t===6)return A.hC
if(t===1)return A.eQ
if(t===7)return A.hJ
s=A.hX(a)
if(s!=null)return s
if(t===8){r=a.x
if(a.y.every(A.aE)){a.f="$i"+r
if(r==="h")return A.hM
if(a===u.m)return A.hL
return A.hR}}else if(t===10){q=A.ia(a.x,a.y)
p=q==null?A.eQ:q
return p==null?A.eJ(p):p}return A.hA},
hX(a){if(a.w===8){if(a===u.S)return A.d1
if(a===u.i||a===u.H)return A.hN
if(a===u.N)return A.hQ
if(a===u.y)return A.dQ}return null},
hE(a){var t=this,s=A.hz
if(A.aE(t))s=A.hq
else if(t===u.K)s=A.eJ
else if(A.aU(t)){s=A.hB
if(t===u.a3)s=A.ho
else if(t===u.aD)s=A.dN
else if(t===u.cG)s=A.hm
else if(t===u.n)s=A.eI
else if(t===u.dd)s=A.hn
else if(t===u.z)s=A.hp}else if(t===u.S)s=A.ay
else if(t===u.N)s=A.v
else if(t===u.y)s=A.hl
else if(t===u.H)s=A.eH
else if(t===u.i)s=A.eF
else if(t===u.m)s=A.eG
t.a=s
return t.a(a)},
hA(a){var t=this
if(a==null)return A.aU(t)
return A.iq(v.typeUniverse,A.io(a,t),t)},
hC(a){if(a==null)return!0
return this.x.b(a)},
hR(a){var t,s=this
if(a==null)return A.aU(s)
t=s.f
if(a instanceof A.q)return!!a[t]
return!!J.aB(a)[t]},
hM(a){var t,s=this
if(a==null)return A.aU(s)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
t=s.f
if(a instanceof A.q)return!!a[t]
return!!J.aB(a)[t]},
hL(a){var t=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.q)return!!a[t.f]
return!0}if(typeof a=="function")return!0
return!1},
eP(a){if(typeof a=="object"){if(a instanceof A.q)return u.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
hz(a){var t=this
if(a==null){if(A.aU(t))return a}else if(t.b(a))return a
throw A.x(A.eM(a,t),new Error())},
hB(a){var t=this
if(a==null||t.b(a))return a
throw A.x(A.eM(a,t),new Error())},
eM(a,b){return new A.bu("TypeError: "+A.es(a,A.G(b,null)))},
es(a,b){return A.bJ(a)+": type '"+A.G(A.dS(a),null)+"' is not a subtype of type '"+b+"'"},
M(a,b){return new A.bu("TypeError: "+A.es(a,b))},
hJ(a){var t=this
return t.x.b(a)||A.dF(v.typeUniverse,t).b(a)},
hO(a){return a!=null},
eJ(a){if(a!=null)return a
throw A.x(A.M(a,"Object"),new Error())},
hS(a){return!0},
hq(a){return a},
eQ(a){return!1},
dQ(a){return!0===a||!1===a},
hl(a){if(!0===a)return!0
if(!1===a)return!1
throw A.x(A.M(a,"bool"),new Error())},
hm(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.x(A.M(a,"bool?"),new Error())},
eF(a){if(typeof a=="number")return a
throw A.x(A.M(a,"double"),new Error())},
hn(a){if(typeof a=="number")return a
if(a==null)return a
throw A.x(A.M(a,"double?"),new Error())},
d1(a){return typeof a=="number"&&Math.floor(a)===a},
ay(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.x(A.M(a,"int"),new Error())},
ho(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.x(A.M(a,"int?"),new Error())},
hN(a){return typeof a=="number"},
eH(a){if(typeof a=="number")return a
throw A.x(A.M(a,"num"),new Error())},
eI(a){if(typeof a=="number")return a
if(a==null)return a
throw A.x(A.M(a,"num?"),new Error())},
hQ(a){return typeof a=="string"},
v(a){if(typeof a=="string")return a
throw A.x(A.M(a,"String"),new Error())},
dN(a){if(typeof a=="string")return a
if(a==null)return a
throw A.x(A.M(a,"String?"),new Error())},
eG(a){if(A.eP(a))return a
throw A.x(A.M(a,"JSObject"),new Error())},
hp(a){if(a==null)return a
if(A.eP(a))return a
throw A.x(A.M(a,"JSObject?"),new Error())},
eR(a,b){var t,s,r
for(t="",s="",r=0;r<a.length;++r,s=", ")t+=s+A.G(a[r],b)
return t},
hW(a,b){var t,s,r,q,p,o,n=a.x,m=a.y
if(""===n)return"("+A.eR(m,b)+")"
t=m.length
s=n.split(",")
r=s.length-t
for(q="(",p="",o=0;o<t;++o,p=", "){q+=p
if(r===0)q+="{"
q+=A.G(m[o],b)
if(r>=0)q+=" "+s[r];++r}return q+"})"},
eN(a2,a3,a4){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=", ",a1=null
if(a4!=null){t=a4.length
if(a3==null)a3=A.e([],u.s)
else a1=a3.length
s=a3.length
for(r=t;r>0;--r)B.a.k(a3,"T"+(s+r))
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
if(m===8){q=A.i0(a.x)
p=a.y
return p.length>0?q+("<"+A.eR(p,b)+">"):q}if(m===10)return A.hW(a,b)
if(m===11)return A.eN(a,b,null)
if(m===12)return A.eN(a.x,b,a.y)
if(m===13){o=a.x
n=b.length
o=n-1-o
if(!(o>=0&&o<n))return A.b(b,o)
return b[o]}return"?"},
i0(a){var t=A.f2(a)
if(t!=null)return t
return"minified:"+a},
hk(a,b){var t=a.tR[b]
while(typeof t=="string")t=a.tR[t]
return t},
hj(a,b){var t,s,r,q,p,o=a.eT,n=o[b]
if(n==null)return A.cX(a,b,!1)
else if(typeof n=="number"){t=n
s=A.bx(a,5,"#")
r=A.cY(t)
for(q=0;q<t;++q)r[q]=s
p=A.bw(a,b,r)
o[b]=p
return p}else return n},
hi(a,b){return A.eD(a.tR,b)},
hh(a,b){return A.eD(a.eT,b)},
cX(a,b,c){var t,s=a.eC,r=s.get(b)
if(r!=null)return r
t=A.eB(a,null,b,!1)
s.set(b,t)
return t},
by(a,b,c){var t,s,r=b.z
if(r==null)r=b.z=new Map()
t=r.get(c)
if(t!=null)return t
s=A.eB(a,b,c,!0)
r.set(c,s)
return s},
eC(a,b,c){var t,s,r,q=b.Q
if(q==null)q=b.Q=new Map()
t=c.as
s=q.get(t)
if(s!=null)return s
r=A.dL(a,b,c.w===9?c.y:[c])
q.set(t,r)
return r},
eB(a,b,c,d){return A.ha(A.h4(a,b,c,d))},
ak(a,b){b.a=A.hE
b.b=A.hF
return b},
bx(a,b,c){var t,s,r=a.eC.get(c)
if(r!=null)return r
t=new A.R(null,null)
t.w=b
t.as=c
s=A.ak(a,t)
a.eC.set(c,s)
return s},
ez(a,b,c){var t,s=b.as+"?",r=a.eC.get(s)
if(r!=null)return r
t=A.hf(a,b,s,c)
a.eC.set(s,t)
return t},
hf(a,b,c,d){var t,s,r
if(d){t=b.w
s=!0
if(!A.aE(b))if(!(b===u.P||b===u.T))if(t!==6)s=t===7&&A.aU(b.x)
if(s)return b
else if(t===1)return u.P}r=new A.R(null,null)
r.w=6
r.x=b
r.as=c
return A.ak(a,r)},
ey(a,b,c){var t,s=b.as+"/",r=a.eC.get(s)
if(r!=null)return r
t=A.hd(a,b,s,c)
a.eC.set(s,t)
return t},
hd(a,b,c,d){var t,s
if(d){t=b.w
if(A.aE(b)||b===u.K)return b
else if(t===1)return A.bw(a,"ec",[b])
else if(b===u.P||b===u.T)return u.bc}s=new A.R(null,null)
s.w=7
s.x=b
s.as=c
return A.ak(a,s)},
hg(a,b){var t,s,r=""+b+"^",q=a.eC.get(r)
if(q!=null)return q
t=new A.R(null,null)
t.w=13
t.x=b
t.as=r
s=A.ak(a,t)
a.eC.set(r,s)
return s},
bv(a){var t,s,r,q=a.length
for(t="",s="",r=0;r<q;++r,s=",")t+=s+a[r].as
return t},
hc(a){var t,s,r,q,p,o=a.length
for(t="",s="",r=0;r<o;r+=3,s=","){q=a[r]
p=a[r+1]?"!":":"
t+=s+q+p+a[r+2].as}return t},
bw(a,b,c){var t,s,r,q=b
if(c.length>0)q+="<"+A.bv(c)+">"
t=a.eC.get(q)
if(t!=null)return t
s=new A.R(null,null)
s.w=8
s.x=b
s.y=c
if(c.length>0)s.c=c[0]
s.as=q
r=A.ak(a,s)
a.eC.set(q,r)
return r},
dL(a,b,c){var t,s,r,q,p,o
if(b.w===9){t=b.x
s=b.y.concat(c)}else{s=c
t=b}r=t.as+(";<"+A.bv(s)+">")
q=a.eC.get(r)
if(q!=null)return q
p=new A.R(null,null)
p.w=9
p.x=t
p.y=s
p.as=r
o=A.ak(a,p)
a.eC.set(r,o)
return o},
eA(a,b,c){var t,s,r="+"+(b+"("+A.bv(c)+")"),q=a.eC.get(r)
if(q!=null)return q
t=new A.R(null,null)
t.w=10
t.x=b
t.y=c
t.as=r
s=A.ak(a,t)
a.eC.set(r,s)
return s},
ex(a,b,c){var t,s,r,q,p,o=b.as,n=c.a,m=n.length,l=c.b,k=l.length,j=c.c,i=j.length,h="("+A.bv(n)
if(k>0){t=m>0?",":""
h+=t+"["+A.bv(l)+"]"}if(i>0){t=m>0?",":""
h+=t+"{"+A.hc(j)+"}"}s=o+(h+")")
r=a.eC.get(s)
if(r!=null)return r
q=new A.R(null,null)
q.w=11
q.x=b
q.y=c
q.as=s
p=A.ak(a,q)
a.eC.set(s,p)
return p},
dM(a,b,c,d){var t,s=b.as+("<"+A.bv(c)+">"),r=a.eC.get(s)
if(r!=null)return r
t=A.he(a,b,c,s,d)
a.eC.set(s,t)
return t},
he(a,b,c,d,e){var t,s,r,q,p,o,n,m
if(e){t=c.length
s=A.cY(t)
for(r=0,q=0;q<t;++q){p=c[q]
if(p.w===1){s[q]=p;++r}}if(r>0){o=A.az(a,b,s,0)
n=A.aR(a,c,s,0)
return A.dM(a,o,n,c!==n)}}m=new A.R(null,null)
m.w=12
m.x=b
m.y=c
m.as=d
return A.ak(a,m)},
h4(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
ha(a){var t,s,r,q,p,o,n,m=a.r,l=a.s
for(t=m.length,s=0;s<t;){r=m.charCodeAt(s)
if(r>=48&&r<=57)s=A.h6(s+1,r,m,l)
else if((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124)s=A.eu(a,s,m,l,!1)
else if(r===46)s=A.eu(a,s,m,l,!0)
else{++s
switch(r){case 44:break
case 58:l.push(!1)
break
case 33:l.push(!0)
break
case 59:l.push(A.ax(a.u,a.e,l.pop()))
break
case 94:l.push(A.hg(a.u,l.pop()))
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
case 62:A.h8(a,l)
break
case 38:A.h7(a,l)
break
case 63:q=a.u
l.push(A.ez(q,A.ax(q,a.e,l.pop()),a.n))
break
case 47:q=a.u
l.push(A.ey(q,A.ax(q,a.e,l.pop()),a.n))
break
case 40:l.push(-3)
l.push(a.p)
a.p=l.length
break
case 41:A.h5(a,l)
break
case 91:l.push(a.p)
a.p=l.length
break
case 93:p=l.splice(a.p)
A.ev(a.u,a.e,p)
a.p=l.pop()
l.push(p)
l.push(-1)
break
case 123:l.push(a.p)
a.p=l.length
break
case 125:p=l.splice(a.p)
A.hb(a.u,a.e,p)
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
h6(a,b,c,d){var t,s,r=b-48
for(t=c.length;a<t;++a){s=c.charCodeAt(a)
if(!(s>=48&&s<=57))break
r=r*10+(s-48)}d.push(r)
return a},
eu(a,b,c,d,e){var t,s,r,q,p,o,n=b+1
for(t=c.length;n<t;++n){s=c.charCodeAt(n)
if(s===46){if(e)break
e=!0}else{if(!((((s|32)>>>0)-97&65535)<26||s===95||s===36||s===124))r=s>=48&&s<=57
else r=!0
if(!r)break}}q=c.substring(b,n)
if(e){t=a.u
p=a.e
if(p.w===9)p=p.x
o=A.hk(t,p.x)[q]
if(o==null)A.a1('No "'+q+'" in "'+A.fX(p)+'"')
d.push(A.by(t,p,o))}else d.push(q)
return n},
h8(a,b){var t,s=a.u,r=A.et(a,b),q=b.pop()
if(typeof q=="string")b.push(A.bw(s,q,r))
else{t=A.ax(s,a.e,q)
switch(t.w){case 11:b.push(A.dM(s,t,r,a.n))
break
default:b.push(A.dL(s,t,r))
break}}},
h5(a,b){var t,s,r,q=a.u,p=b.pop(),o=null,n=null
if(typeof p=="number")switch(p){case-1:o=b.pop()
break
case-2:n=b.pop()
break
default:b.push(p)
break}else b.push(p)
t=A.et(a,b)
p=b.pop()
switch(p){case-3:p=b.pop()
if(o==null)o=q.sEA
if(n==null)n=q.sEA
s=A.ax(q,a.e,p)
r=new A.cc()
r.a=t
r.b=o
r.c=n
b.push(A.ex(q,s,r))
return
case-4:b.push(A.eA(q,b.pop(),t))
return
default:throw A.d(A.bC("Unexpected state under `()`: "+A.i(p)))}},
h7(a,b){var t=b.pop()
if(0===t){b.push(A.bx(a.u,1,"0&"))
return}if(1===t){b.push(A.bx(a.u,4,"1&"))
return}throw A.d(A.bC("Unexpected extended operation "+A.i(t)))},
et(a,b){var t=b.splice(a.p)
A.ev(a.u,a.e,t)
a.p=b.pop()
return t},
ax(a,b,c){if(typeof c=="string")return A.bw(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.h9(a,b,c)}else return c},
ev(a,b,c){var t,s=c.length
for(t=0;t<s;++t)c[t]=A.ax(a,b,c[t])},
hb(a,b,c){var t,s=c.length
for(t=2;t<s;t+=3)c[t]=A.ax(a,b,c[t])},
h9(a,b,c){var t,s,r=b.w
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
iq(a,b,c){var t,s=b.d
if(s==null)s=b.d=new Map()
t=s.get(c)
if(t==null){t=A.w(a,b,null,c,null)
s.set(c,t)}return t},
w(a,b,c,d,e){var t,s,r,q,p,o,n,m,l,k,j
if(b===d)return!0
if(A.aE(d))return!0
t=b.w
if(t===4)return!0
if(A.aE(b))return!1
if(b.w===1)return!0
s=t===13
if(s)if(A.w(a,c[b.x],c,d,e))return!0
r=d.w
q=u.P
if(b===q||b===u.T){if(r===7)return A.w(a,b,c,d.x,e)
return d===q||d===u.T||r===6}if(d===u.K){if(t===7)return A.w(a,b.x,c,d,e)
return t!==6}if(t===7){if(!A.w(a,b.x,c,d,e))return!1
return A.w(a,A.dF(a,b),c,d,e)}if(t===6)return A.w(a,q,c,d,e)&&A.w(a,b.x,c,d,e)
if(r===7){if(A.w(a,b,c,d.x,e))return!0
return A.w(a,b,c,A.dF(a,d),e)}if(r===6)return A.w(a,b,c,q,e)||A.w(a,b,c,d.x,e)
if(s)return!1
q=t!==11
if((!q||t===12)&&d===u.Z)return!0
p=t===10
if(p&&d===u.w)return!0
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
if(!A.w(a,k,c,j,e)||!A.w(a,j,e,k,c))return!1}return A.eO(a,b.x,c,d.x,e)}if(r===11){if(b===u.L)return!0
if(q)return!1
return A.eO(a,b,c,d,e)}if(t===8){if(r!==8)return!1
return A.hK(a,b,c,d,e)}if(p&&r===10)return A.hP(a,b,c,d,e)
return!1},
eO(a2,a3,a4,a5,a6){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
if(!A.w(a2,a3.x,a4,a5.x,a6))return!1
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
if(!A.w(a2,q[i],a6,h,a4))return!1}for(i=0;i<n;++i){h=m[i]
if(!A.w(a2,q[p+i],a6,h,a4))return!1}for(i=0;i<j;++i){h=m[n+i]
if(!A.w(a2,l[i],a6,h,a4))return!1}g=t.c
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
if(!A.w(a2,f[b+2],a6,h,a4))return!1
break}}while(c<e){if(g[c+1])return!1
c+=3}return!0},
hK(a,b,c,d,e){var t,s,r,q,p,o=b.x,n=d.x
while(o!==n){t=a.tR[o]
if(t==null)return!1
if(typeof t=="string"){o=t
continue}s=t[n]
if(s==null)return!1
r=s.length
q=r>0?new Array(r):v.typeUniverse.sEA
for(p=0;p<r;++p)q[p]=A.by(a,b,s[p])
return A.eE(a,q,null,c,d.y,e)}return A.eE(a,b.y,null,c,d.y,e)},
eE(a,b,c,d,e,f){var t,s=b.length
for(t=0;t<s;++t)if(!A.w(a,b[t],d,e[t],f))return!1
return!0},
hP(a,b,c,d,e){var t,s=b.y,r=d.y,q=s.length
if(q!==r.length)return!1
if(b.x!==d.x)return!1
for(t=0;t<q;++t)if(!A.w(a,s[t],c,r[t],e))return!1
return!0},
aU(a){var t=a.w,s=!0
if(!(a===u.P||a===u.T))if(!A.aE(a))if(t!==6)s=t===7&&A.aU(a.x)
return s},
aE(a){var t=a.w
return t===2||t===3||t===4||t===5||a===u.X},
eD(a,b){var t,s,r=Object.keys(b),q=r.length
for(t=0;t<q;++t){s=r[t]
a[s]=b[s]}},
cY(a){return a>0?new Array(a):v.typeUniverse.sEA},
R:function R(a,b){var _=this
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
P(a,b,c){return b.h("@<0>").a6(c).h("dv<1,2>").a(A.eX(a,new A.a5(b.h("@<0>").a6(c).h("a5<1,2>"))))},
a6(a,b){return new A.a5(a.h("@<0>").a6(b).h("a5<1,2>"))},
dw(a){return new A.U(a.h("U<0>"))},
aK(a){return new A.U(a.h("U<0>"))},
dx(a,b){return b.h("eh<0>").a(A.id(a,new A.U(b.h("U<0>"))))},
dI(){var t=Object.create(null)
t["<non-identifier-key>"]=t
delete t["<non-identifier-key>"]
return t},
bn(a,b,c){var t=new A.a9(a,b,c.h("a9<0>"))
t.c=a.e
return t},
dy(a,b){var t,s,r=A.dw(b)
for(t=a.length,s=0;s<a.length;a.length===t||(0,A.n)(a),++s)r.k(0,b.a(a[s]))
return r},
dz(a,b){var t=A.dw(b)
t.L(0,a)
return t},
dB(a){var t,s
if(A.dX(a))return"{...}"
t=new A.ai("")
try{s={}
B.a.k($.H,a)
t.a+="{"
s.a=!0
a.M(0,new A.cI(s,t))
t.a+="}"}finally{if(0>=$.H.length)return A.b($.H,-1)
$.H.pop()}s=t.a
return s.charCodeAt(0)==0?s:s},
U:function U(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
cf:function cf(a){this.a=a
this.c=this.b=null},
a9:function a9(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
p:function p(){},
A:function A(){},
cI:function cI(a,b){this.a=a
this.b=b},
ah:function ah(){},
bt:function bt(){},
hV(a,b){var t,s,r,q=null
try{q=JSON.parse(a)}catch(s){t=A.ck(s)
r=String(t)
throw A.d(new A.cw(r))}r=A.cZ(q)
return r},
cZ(a){var t
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.cd(a,Object.create(null))
for(t=0;t<a.length;++t)a[t]=A.cZ(a[t])
return a},
ef(a,b,c){return new A.b4(a,b)},
hu(a){return a.bH()},
h2(a,b){return new A.cT(a,[],A.i9())},
h3(a,b,c){var t,s=new A.ai(""),r=A.h2(s,b)
r.a4(a)
t=s.a
return t.charCodeAt(0)==0?t:t},
cd:function cd(a,b){this.a=a
this.b=b
this.c=null},
ce:function ce(a){this.a=a},
bF:function bF(){},
bH:function bH(){},
b4:function b4(a,b){this.a=a
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
cH(a,b,c,d){var t,s=c?J.ed(a,d):J.fC(a,d)
if(a!==0&&b!=null)for(t=0;t<s.length;++t)s[t]=b
return s},
fJ(a,b,c){var t,s,r=A.e([],c.h("l<0>"))
for(t=a.length,s=0;s<a.length;a.length===t||(0,A.n)(a),++s)B.a.k(r,c.a(a[s]))
r.$flags=1
return r},
bS(a,b){var t,s
if(Array.isArray(a))return A.e(a.slice(0),b.h("l<0>"))
t=A.e([],b.h("l<0>"))
for(s=J.dp(a);s.m();)B.a.k(t,s.gu())
return t},
dA(a,b){var t=A.fJ(a,!1,b)
t.$flags=3
return t},
eo(a,b,c){var t=J.dp(b)
if(!t.m())return a
if(c.length===0){do a+=A.i(t.gu())
while(t.m())}else{a+=A.i(t.gu())
while(t.m())a=a+c+A.i(t.gu())}return a},
fs(a,b,c){var t=A.fR(a,b,c,0,0,0,0,0,!0)
return new A.ac(t==null?new A.cv(a,b,c,0,0,0,0,0).$0():t,0,!0)},
ft(a){var t=Math.abs(a),s=a<0?"-":""
if(t>=1000)return""+a
if(t>=100)return s+"0"+t
if(t>=10)return s+"00"+t
return s+"000"+t},
eb(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bI(a){if(a>=10)return""+a
return"0"+a},
aX(a){return new A.am(864e8*a)},
bJ(a){if(typeof a=="number"||A.dQ(a)||a==null)return J.bz(a)
if(typeof a=="string")return JSON.stringify(a)
return A.ek(a)},
bC(a){return new A.bB(a)},
cl(a){return new A.a3(!1,null,null,a)},
bA(a,b,c){return new A.a3(!0,a,b,c)},
fV(a){var t=null
return new A.aN(t,t,!1,t,t,a)},
av(a,b,c,d,e){return new A.aN(b,c,!0,a,d,"Invalid value")},
fW(a,b,c){if(0>a||a>c)throw A.d(A.av(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.d(A.av(b,a,c,"end",null))
return b}return c},
dE(a,b){return a},
dr(a,b,c,d){return new A.bK(b,!0,a,d,"Index out of range")},
bk(a){return new A.bj(a)},
eq(a){return new A.c9(a)},
en(a){return new A.bg(a)},
X(a){return new A.bG(a)},
fB(a,b,c){var t,s
if(A.dX(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}t=A.e([],u.s)
B.a.k($.H,a)
try{A.hT(a,t)}finally{if(0>=$.H.length)return A.b($.H,-1)
$.H.pop()}s=A.eo(b,u.h.a(t),", ")+c
return s.charCodeAt(0)==0?s:s},
ds(a,b,c){var t,s
if(A.dX(a))return b+"..."+c
t=new A.ai(b)
B.a.k($.H,a)
try{s=t
s.a=A.eo(s.a,a,", ")}finally{if(0>=$.H.length)return A.b($.H,-1)
$.H.pop()}t.a+=c
s=t.a
return s.charCodeAt(0)==0?s:s},
hT(a,b){var t,s,r,q,p,o,n,m=a.gv(a),l=0,k=0
for(;;){if(!(l<80||k<3))break
if(!m.m())return
t=A.i(m.gu())
B.a.k(b,t)
l+=t.length+2;++k}if(!m.m()){if(k<=5)return
if(0>=b.length)return A.b(b,-1)
s=b.pop()
if(0>=b.length)return A.b(b,-1)
r=b.pop()}else{q=m.gu();++k
if(!m.m()){if(k<=4){B.a.k(b,A.i(q))
return}s=A.i(q)
if(0>=b.length)return A.b(b,-1)
r=b.pop()
l+=s.length+2}else{p=m.gu();++k
for(;m.m();q=p,p=o){o=m.gu();++k
if(k>100){for(;;){if(!(l>75&&k>3))break
if(0>=b.length)return A.b(b,-1)
l-=b.pop().length+2;--k}B.a.k(b,"...")
return}}r=A.i(q)
s=A.i(p)
l+=s.length+r.length+4}}if(k>b.length+2){l+=5
n="..."}else n=null
for(;;){if(!(l>80&&b.length>3))break
if(0>=b.length)return A.b(b,-1)
l-=b.pop().length+2
if(n==null){l+=5
n="..."}}if(n!=null)B.a.k(b,n)
B.a.k(b,r)
B.a.k(b,s)},
dC(a,b,c,d){var t
if(B.k===c){t=B.b.gq(a)
b=J.a2(b)
return A.dG(A.aj(A.aj($.dm(),t),b))}if(B.k===d){t=B.b.gq(a)
b=J.a2(b)
c=J.a2(c)
return A.dG(A.aj(A.aj(A.aj($.dm(),t),b),c))}t=B.b.gq(a)
b=J.a2(b)
c=J.a2(c)
d=J.a2(d)
d=A.dG(A.aj(A.aj(A.aj(A.aj($.dm(),t),b),c),d))
return d},
cv:function cv(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
ac:function ac(a,b,c){this.a=a
this.b=b
this.c=c},
am:function am(a){this.a=a},
cQ:function cQ(){},
o:function o(){},
bB:function bB(a){this.a=a},
bi:function bi(){},
a3:function a3(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
aN:function aN(a,b,c,d,e,f){var _=this
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
c1:function c1(){},
bf:function bf(){},
cR:function cR(a){this.a=a},
cw:function cw(a){this.a=a},
c:function c(){},
at:function at(a,b,c){this.a=a
this.b=b
this.$ti=c},
bb:function bb(){},
q:function q(){},
ai:function ai(a){this.a=a},
cg:function cg(){this.b=this.a=0},
e0(a,b){var t=B.Y.n(0,a)
t.toString
if(a===6)return t.aZ(B.P[B.b.C(B.b.t(b-1,7),5)])
return t},
ab:function ab(a,b){this.a=a
this.b=b},
W:function W(a,b){this.a=a
this.b=b},
Q:function Q(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
fu(a){var t
A:{if("A"===a){t=B.d
break A}if("D"===a){t=B.e
break A}t=null
break A}return t},
ea(a,b,c){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f=null
if(c<=0||a<=0)return f
t=u.S
s=A.a6(t,u.N)
r=A.a6(t,u.v)
for(t=u.t,q=0;q<b.length;++q){p=b[q]
o=p.a
n=o.length
if(n===0)return f
for(m=0;m<n;++m){l=p.a1(m)
k=l.a
j=l.b
if(k<0||j<0||k>=a||j>=c)return f
i=k*c+j
h=s.n(0,i)
if(h!=null&&h!==o[m])return f
s.j(0,i,o[m])
g=r.n(0,i)
if(g==null){g=A.e([],t)
r.j(0,i,g)}B.a.k(g,q)}}return new A.cp(c,a,A.dA(b,u.c),s,r)},
a4:function a4(a,b,c){this.c=a
this.a=b
this.b=c},
a7:function a7(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cp:function cp(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=$},
cq:function cq(a,b,c){this.a=a
this.b=b
this.c=c},
cr:function cr(a){this.a=a},
cs:function cs(a){this.a=a},
cu:function cu(a){this.a=a},
ct:function ct(a){this.a=a},
el(a,b,c,d,e){var t=A.dA(a,u.N),s=A.fT(d,c.gW(),a),r=c.gW()
A.dy(r,A.B(r).c)
return new A.cK(d,c,s,t,b,e)},
fT(a,b,c){var t,s,r=A.e([],u.s)
for(t=B.B.gv(B.B);t.m();){s=t.gu()
if(!B.a.p(b,s)&&!B.a.p(c,s)&&A.fS(a,s))r.push(s)}if(r.length===0)return c
t=A.bS(c,u.N)
B.a.L(t,r)
B.a.Y(t,A.e_())
return t},
fS(a,b){var t,s,r,q=A.e(a.toUpperCase().split(""),u.s)
for(t=b.split(""),s=t.length,r=0;r<s;++r)if(!B.a.U(q,t[r]))return!1
return!0},
i5(a,b){var t
A.v(a)
A.v(b)
t=B.b.B(a.length,b.length)
return t!==0?t:B.c.B(a,b)},
cK:function cK(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
iv(a){var t
A:{if(B.o===a){t=B.ac
break A}if(B.p===a){t=B.ab
break A}t=null
break A}return t},
c5:function c5(a){this.a=a},
eZ(a){var t,s,r,q,p,o,n,m,l=$.dl.n(0,a)
if(l==null)l=A.ic("Missing "+a+". Run tools/build_dictionary.dart.")
t=A.e([],u.B)
for(s=B.y.aL(l),r=s.length,q=0;q<s.length;s.length===r||(0,A.n)(s),++q){p=s[q]
o=B.c.aP(p,"\t")
if(o<=0)continue
n=B.c.D(p,0,o)
m=A.ag(B.c.aX(B.c.Z(p,o+1)),null)
B.a.k(t,new A.Y(n,m==null?0:m))}return t},
fm(a3){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a="tools\\data\\dict_blocked.txt",a0=A.db("tools\\data\\dict_bonus_only.txt"),a1=A.db("tools\\data\\stoplist.txt"),a2=u.N
a1=A.dz(a1,a2)
a1.L(0,a0)
t=A.db("tools\\data\\allowlist.txt")
s=$.dl.n(0,a)!=null?A.eZ(a):B.U
r=A.aK(a2)
for(q=s.length,p=0;p<s.length;s.length===q||(0,A.n)(s),++p)r.k(0,s[p].a)
o=A.a6(u.S,u.u)
q=u.O
n=A.bS(a3,q)
B.a.L(n,s)
m=n.length
l=u.B
p=0
for(;p<n.length;n.length===m||(0,A.n)(n),++p){k=n[p]
j=k.a.length
i=o.n(0,j)
if(i==null){i=A.e([],l)
o.j(0,j,i)
j=i}else j=i
J.e2(j,k)}for(n=o.$ti,m=new A.ar(o,o.r,o.e,n.h("ar<2>"));m.m();){l=m.d
j=new A.co()
i=l.length-1
if(i<=32)A.dK(l,0,i,j,q)
else A.dJ(l,0,i,j,q)}h=A.a6(u.R,u.C)
for(q=A.m(t),m=q.h("a9<1>"),q=q.c,n=n.h("ap<1,2>"),p=0;p<3;++p){g=B.W[p]
f=A.aK(a2)
for(l=new A.ap(o,o.r,o.e,n);l.m();){j=l.d
j.toString
e=B.a1.n(0,g).n(0,j.a)
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
f.k(0,d[b].a)}++b}}for(l=new A.a9(t,t.r,m),l.c=t.e;l.m();){j=l.d
if(j==null)j=q.a(j)
if(!a1.p(0,j))f.k(0,j)}h.j(0,g,f)}return new A.cn(h,a0)},
db(a){var t,s,r,q,p,o=$.dl.n(0,a)
if(o==null)return A.aK(u.N)
t=A.aK(u.N)
for(s=B.y.aL(o),r=s.length,q=0;q<s.length;s.length===r||(0,A.n)(s),++q){p=B.c.aX(s[q])
if(p.length===0||B.c.ar(p,"#"))continue
t.k(0,p.toUpperCase())}return t},
Y:function Y(a,b){this.a=a
this.b=b},
cn:function cn(a,b){this.a=a
this.b=b},
co:function co(){},
ir(b0,b1){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=b0.b,a9=b0.c
if(a8.length+1<a9)return null
t=b0.f
s=t===B.q
r=s?A.hw(b0):B.S
if(s&&r.length===0)return null
for(s=b0.w,q=b0.r,p=u.s,o=u.N,n=b0.d-a9+1,m=u.S,l=u.D,k=b0.a,j=null,i=0;i<260;++i){h=A.e([],l)
g=A.aK(o)
f=new A.cO(b0,A.iv(t),A.a6(m,m),A.a6(m,m),h,g)
if(!f.b1(b1,r))continue
e=a9+b1.T(n)
d=A.bS(a8,o)
B.a.aq(d,b1)
c=new A.d8()
b=d.length-1
if(b<=32)A.dK(d,0,b,c,o)
else A.dJ(d,0,b,c,o)
for(a=0;a0=a+1,a0<d.length;a=a0)if(b1.ao()<0.25){c=d.length
if(!(a<c))return A.b(d,a)
a1=d[a]
if(!(a0<c))return A.b(d,a0)
d[a]=d[a0]
d[a0]=a1}c=A.e([],p)
for(b=d.length,a2=0;a2<d.length;d.length===b||(0,A.n)(d),++a2){a3=d[a2]
if(a3.length>3)c.push(a3)}b=A.e([],p)
for(a4=d.length,a2=0;a2<d.length;d.length===a4||(0,A.n)(d),++a2){a3=d[a2]
if(a3.length===3)b.push(a3)}f.aO(c,e-q,b1)
f.aO(b,e,b1)
if(h.length<a9||!g.p(0,k))continue
if(!f.b2())continue
a5=f.aW()
if(a5==null||a5.aY().length!==0)continue
a6=a5.gW()
h=A.B(a6)
g=h.h("z(1)")
h=h.h("T<1>")
if(new A.T(a6,g.a(new A.d9()),h).gl(0)<q)continue
if(new A.T(a6,g.a(new A.da()),h).gl(0)<s)continue
a7=f.bs(a5)
if(j==null||a7>j.b)j=new A.cB(a5,a7)}return j},
hw(a7){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=u.s,a6=A.e([a7.a],a5)
B.a.L(a6,a7.b)
t=A.e([],u.U)
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
if(A.hU(a7,A.e([q,h,d,a1],a5)))continue
for(a2=a1.length,a3=0;a3+l<a2;++a3){if(!(a3<a2))return A.b(a1,a3)
a4=a1[a3]
if(!(b<g))return A.b(h,b)
if(a4===h[b]){a4=a3+n-o
if(!(a4>=0&&a4<a2))return A.b(a1,a4)
a4=a1[a4]
if(!(b<e))return A.b(d,b)
a4=a4===d[b]}else a4=!1
if(a4)B.a.k(t,new A.L(q,h,d,a1,0,o,n,o-a3,b))}}}}j=e}if(t.length>400)break}A.ew(t,new A.d_(a7),u.Q)
return t},
hU(a,b){var t,s,r,q
for(t=a.x,s=0,r=0;r<4;++r){q=t.n(0,b[r])
if(q==null)continue;++s
if(B.a.p(b,q))return!0}return s>1},
er(a,b){return(a+64)*256+(b+64)},
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
d8:function d8(){},
d9:function d9(){},
da:function da(){},
L:function L(a,b,c,d,e,f,g,h,i){var _=this
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
iw(b1,b2,b3,b4){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8="EEEEEEEEEEEETTTTTTTTTAAAAAAAAOOOOOOOIIIIIIINNNNNNNHHHHHRRRRRRDDDDLLLLUUUCCCMMWWFFGGYYPPBB",a9=b1.length,b0=b2.b
if(a9>b0)return B.T
t=b0-a9
s=A.aK(u.N)
if(t===0)s.k(0,b1)
else for(b0=u.s,r=0;r<60;++r){for(q=b1,p=0;p<t;++p,q=o){o=b4.T(89)
if(!(o>=0&&o<89))return A.b(a8,o)
o=q+a8[o]}q=A.e((q.charCodeAt(0)==0?q:q).split(""),b0)
B.a.a5(q)
s.k(0,B.a.am(q))}n=A.e([],u.Y)
for(b0=A.bn(s,s.r,s.$ti.c),q=b2.r,a9=a9>=6,o=u.au,m=u.E,l=b2.d+2,k=b2.c,j=b2.f,i=b3.c.a,h=u.s,g=b0.$ti.c,f=b2.w,e=q+1,q=q===0,d=f+1,f=f===0;b0.m();){c=b0.d
if(c==null)c=g.a(c)
b=b3.b5(c)
a=A.e([],h)
for(a0=b.length,a1=0;a1<b.length;b.length===a0||(0,A.n)(b),++a1){a2=b[a1]
if(a2!==b1&&a2.length>=k&&i.n(0,j).p(0,a2))a.push(a2)}if(a.length+1<l)continue
a3=new A.T(a,o.a(new A.dg()),m).gl(0)
a0=new A.T(a,o.a(new A.dh()),m).gl(0)
a4=a9?1:0
if(a3>=(q?0:e)){a5=f?0:d
a5=a0+a4<a5
a0=a5}else a0=!0
if(a0)continue
B.a.k(n,new A.S(c,b,a))}a6=new A.dj(b3,b2)
a9=u._
b0=u.S
q=A.a6(a9,b0)
for(o=n.length,a1=0;a1<n.length;n.length===o||(0,A.n)(n),++a1){a7=n[a1]
q.j(0,a7,a6.$1(a7))}A.ew(n,new A.di(q),a9)
return A.fZ(n,0,A.eU(3,"count",b0),a9).bA(0)},
iy(a,b,c){var t,s,r=A.e(a.split(""),u.s)
for(t=0;t<40;++t){B.a.aq(r,c)
s=B.a.am(r)
if(!b.ai(0,new A.dk(s)))return s}return B.a.am(r)},
S:function S(a,b,c){this.b=a
this.c=b
this.d=c},
dg:function dg(){},
dh:function dh(){},
dj:function dj(a,b){this.a=a
this.b=b},
di:function di(a){this.a=a},
dk:function dk(a){this.a=a},
fH(a){var t,s,r,q,p=new Uint8Array(26)
for(t=a.length,s=0;s<t;++s){r=a.charCodeAt(s)-65
if(!(r>=0&&r<26))return A.b(p,r)
q=p[r]
if(!(r<26))return A.b(p,r)
p[r]=q+1}return p},
fI(a,b){var t,s,r,q,p=A.e([],u.l)
for(t=a.length,s=0;s<a.length;a.length===t||(0,A.n)(a),++s){r=a[s].a
q=r.length
if(q>=3&&q<=7)p.push(new A.b5(r,A.fH(r)))}p=new A.cD(p,A.a6(u.N,u.q),b)
p.b8(a,b)
return p},
b5:function b5(a,b){this.a=a
this.c=b},
cD:function cD(a,b,c){this.a=a
this.b=b
this.c=c},
ie(a,b,c){var t,s=A.e0(A.dD($.dn().O(0-A.aX(0).a).O(A.aX(b-1).a)),b),r=c.length
if(r<5||r>7)return c+" must be 5 to 7 letters."
t=s.b
if(r>t)return c+" is "+r+" letters, but day "+b+"'s wheel has "+t+"."
if(!a.b.E(c))return c+" isn't in Canagrams' dictionary."
if(a.c.b.p(0,c))return c+" is blocklisted (kept only as a bonus word), so it is never built around."
return null},
i4(c3,c4,c5,c6,c7){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0=A.e0(A.dD($.dn().O(0-A.aX(0).a).O(A.aX(c3-1).a)),c3),c1=c0.z,c2=A.dx([c1,B.j,B.h],u.I)
if(c1===B.h)c2.bz(A.dx([B.h],u.X))
c1=u.N
t=A.cH(240,c7,!1,c1)
for(s=A.bn(c2,c2.r,c2.$ti.c),r=u.s,q=c3*7919,p=c0.b,o=s.$ti.c;s.m();){n=s.d
if(n==null)n=o.a(n)
m=c0.aZ(n)
A:for(l=m.d,k=m.e,j=m.y,i=m.r,h=m.w,g=n.a*1299709,f=null,e=0,d=0,c=0,b=0;b<240;++b){a=t[b]
if(a.length>p)continue;++c
if(c>240)break A
a0=new A.cg()
a0.b9(q+c*104729+g+17&2147483647)
for(a1=A.iw(a,m,c6,a0),a2=a1.length,a3=0;a3<a1.length;a1.length===a2||(0,A.n)(a1),++a3){a4=a1[a3]
a5=a4.c
a6=A.dy(a5,A.B(a5).c)
a7=A.a6(c1,c1)
for(a8=A.e([a],r),a9=a4.d,B.a.L(a8,a9),b0=a8.length,b1=0;b1<a8.length;a8.length===b0||(0,A.n)(a8),++b1){b2=a8[b1]
b3=c6.b6(b2,a6)
if(b3!=null)a7.j(0,b2,b3)}b4=A.ir(new A.cC(a,a9,l,k,j,n,i,h,a7),a0)
if(b4==null)continue
a7=b4.a
a8=a7.gW()
b5=A.dy(a8,A.B(a8).c)
a8=A.e([],r)
for(a9=a5.length,b1=0;b1<a5.length;a5.length===a9||(0,A.n)(a5),++b1){b2=a5[b1]
if(!b5.p(0,b2))a8.push(b2)}B.a.Y(a8,A.e_())
b6=A.el(a8,a,a7,A.iy(a4.b,b5,a0),n)
b7=A.iD(A.f_(b6))
if(b7==null||b7.b.aY().length!==0)throw A.d(A.en("day "+c3+": a puzzle did not survive its own codec"))
b8=A.eW(a8,b5,c6).length
b9=b8+(c5.p(0,a)?1000:0)
if(f==null||b9<e){f=new A.cm(b6,b8)
e=b9}++d
if(d>=12)break A}}if(f!=null)return f}return null},
cm:function cm(a,b){this.a=a
this.c=b},
hD(a){var t,s,r,q,p,o,n
try{for(q=0;q<5;++q){t=B.Q[q]
s=A.dN(a[t])
if(s!=null)$.dl.j(0,"tools\\data\\"+A.i(t),s)}p=A.eZ("tools\\data\\dict.txt")
$.dR=A.fI(p,A.fm(p))
$.eS=A.db("tools\\data\\stoplist.txt")
o=B.f.F(A.P(["ok",!0],u.N,u.y),null)
return o}catch(n){r=A.ck(n)
o=u.N
o=B.f.F(A.P(["error",A.i(r)],o,o),null)
return o}},
hs(a){var t,s,r,q,p,o,n,m,l,k,j=null
try{t=$.dR
if(t==null){l=u.N
l=B.f.F(A.P(["error","canagramsGenInit first"],l,l),j)
return l}s=u.a.a(B.f.aM(a,j))
r=J.u(s,"day")
q=J.u(s,"forced")
if(!A.d1(r)||r<1||typeof q!="string"){l=u.N
l=B.f.F(A.P(["error","bad request "+a],l,l),j)
return l}p=q.toUpperCase()
o=A.ie(t,r,p)
if(o!=null){l=u.N
l=B.f.F(A.P(["error",o],l,l),j)
return l}n=A.i4(r,B.R,B.u,t,p)
if(n==null){l=u.N
l=B.f.F(A.P(["error","No puzzle for day "+A.i(r)+" fits around "+A.i(p)+"."],l,l),j)
return l}l=B.f.F(A.P(["line",A.f_(n.a),"word",n.a.e,"distractors",n.c],u.N,u.K),j)
return l}catch(k){m=A.ck(k)
l=u.N
l=B.f.F(A.P(["error",A.i(m)],l,l),j)
return l}},
i2(a){var t,s,r,q,p,o,n,m,l,k,j=null
try{t=$.dR
if(t==null){n=u.N
n=B.f.F(A.P(["error","canagramsGenInit first"],n,n),j)
return n}s=u.a.a(B.f.aM(a,j))
r=J.u(s,"day")
if(!A.d1(r)||r<1||typeof J.u(s,"word")!="string"){n=u.N
n=B.f.F(A.P(["error","bad request "+a],n,n),j)
return n}q=A.v(J.u(s,"word")).toUpperCase()
p=A.e0(A.dD($.dn().O(0-A.aX(0).a).O(A.aX(r-1).a)),r).f
n=A.v(q)
n=t.b.E(n)
m=A.v(q)
l=u.R.a(p)
m=B.f.F(A.P(["inDictionary",n,"required",t.c.a.n(0,l).p(0,m),"stoplisted",$.eS.p(0,q),"bonusOnly",t.c.b.p(0,q)],u.N,u.y),j)
return m}catch(k){o=A.ck(k)
n=u.N
n=B.f.F(A.P(["error",A.i(o)],n,n),j)
return n}},
it(){var t=v.G
t.canagramsGenInit=A.dO(new A.dc())
t.canagramsGenBuild=A.dO(new A.dd())
t.canagramsGenWordStatus=A.dO(new A.de())},
dc:function dc(){},
dd:function dd(){},
de:function de(){},
f2(a){return v.mangledGlobalNames[a]},
iA(a){throw A.x(A.eg(a),new Error())},
iB(){throw A.x(A.eg(""),new Error())},
dO(a){var t
if(typeof a=="function")throw A.d(A.cl("Attempting to rewrap a JS function."))
t=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.ht,a)
t[$.e1()]=a
return t},
ht(a,b,c){u.Z.a(a)
if(A.ay(c)>=1)return a.$1(b)
return a.$0()},
f_(a){var t,s,r,q,p,o,n,m="does not fit one base-36 digit",l=a.b,k=new A.ai("")
for(t=l.c,s=t.length,r=0;r<s;++r){q=t[r]
p=q.b
if(p<0||p>35)A.a1(A.bA(p,"n",m))
p=B.b.V(p,36).toUpperCase()
k.a+=p
p=q.c
if(p<0||p>35)A.a1(A.bA(p,"n",m))
p=B.b.V(p,36).toUpperCase()
k.a=(k.a+=p)+q.d.c
p=q.a.length
if(p>35)A.a1(A.bA(p,"n",m))
p=B.b.V(p,36).toUpperCase()
k.a+=p}o=l.b3(a.e)
t=B.a.an(l.gW(),",")
s=A.hx(a.d)
n=B.a.an(A.e([t,s,A.hr(o<0?0:o)],u.s),"|")
t=a.a
s=k.i(0)
return t+"~"+l.a+","+l.b+","+a.f.a+"~"+k.i(0)+"~"+A.eL(n,t+s,!0)},
iD(a3){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=null
try{a=u.s
t=A.e(a3.split("~"),a)
if(J.J(t)!==4)return a2
s=J.u(t,0)
if(J.J(s)===0)return a2
r=A.e(J.u(t,1).split(","),a)
if(J.J(r)!==3)return a2
q=A.ag(J.u(r,0),a2)
p=A.ag(J.u(r,1),a2)
if(q==null||p==null||q<=0||p<=0)return a2
o=A.ag(J.u(r,2),a2)
if(o==null||o<0||o>=6)return a2
n=J.u(t,2)
if(J.J(n)===0||B.b.C(J.J(n),4)!==0)return a2
m=A.e(A.eL(J.u(t,3),A.i(s)+A.i(n),!1).split("|"),a)
if(J.J(m)!==3)return a2
l=J.u(m,0).length===0?A.e([],a):A.e(J.u(m,0).split(","),a)
if(J.J(l)*4!==J.J(n))return a2
k=A.e([],u.D)
j=0
for(;;){a=j
a0=J.J(l)
if(typeof a!=="number")return a.bG()
if(!(a<a0))break
a=j
if(typeof a!=="number")return a.X()
a0=j
if(typeof a0!=="number")return a0.X()
i=J.fj(n,a*4,a0*4+4)
h=A.ag(J.u(i,0),36)
g=A.ag(J.u(i,1),36)
f=A.fu(J.u(i,2))
e=A.ag(J.u(i,3),36)
if(h==null||g==null||f==null||e==null)return a2
if(e!==J.u(l,j).length)return a2
J.e2(k,new A.a7(J.u(l,j),h,g,f))
a=j
if(typeof a!=="number")return a.bE()
j=a+1}d=A.ea(p,k,q)
if(d==null)return a2
c=A.hy(J.u(m,1))
if(c==null)return a2
J.fi(c,A.e_())
b=A.ag(J.u(m,2),36)
if(b==null||b<0||b>=J.J(k))return a2
a=J.u(k,b)
a0=o
if(a0>>>0!==a0||a0>=6)return A.b(B.z,a0)
a0=A.el(c,a.a,d,s,B.z[a0])
return a0}catch(a1){return a2}},
hr(a){if(a<0||a>35)throw A.d(A.bA(a,"n","does not fit one base-36 digit"))
return B.b.V(a,36).toUpperCase()},
hx(a){var t,s,r,q,p,o,n,m,l,k
if(a.length===0)return""
t=A.bS(a,u.N)
B.a.a5(t)
s=new A.ai("")
for(r="",q=0,p="";q<t.length;++q,r=o){o=t[q]
p=o.length
n=r.length
m=B.b.bp(p<n?p:n,0,35)
l=0
for(;;){if(l<m){if(!(l<p))return A.b(o,l)
if(!(l<n))return A.b(r,l)
k=o.charCodeAt(l)===r.charCodeAt(l)}else k=!1
if(!k)break;++l}if(q>0)s.a+=","
p=B.b.V(l,36).toUpperCase()
p=(s.a+=p)+B.c.Z(o,l)
s.a=p}return p.charCodeAt(0)==0?p:p},
hy(a){var t,s,r,q,p,o,n,m,l
if(a.length===0)return A.e([],u.s)
t=A.e([],u.s)
for(s=a.split(","),r=s.length,q="",p=0;p<r;++p,q=l){o=s[p]
n=o.length
if(n===0)return null
if(0>=n)return A.b(o,0)
m=A.ag(o[0],36)
if(m==null||m>q.length)return null
l=B.c.D(q,0,m)+B.c.Z(o,1)
if(l.length===0)return null
B.a.k(t,l)}return t},
eL(a,b,c){var t,s,r,q,p,o,n,m="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,|"
for(t=b.length,s=3957159,r=0;r<t;++r)s=s*31+b.charCodeAt(r)&2147483647
if(s===0)s=506952121
for(t=a.length,r=0,q="";r<t;++r){s^=s<<13&2147483647
s^=s>>>17
s=(s^s<<5&2147483647)>>>0
p=B.b.C(s,38)
o=a[r]
n=B.c.aP(m,o)
if(n<0){q+=o
continue}q+=m[c?B.b.C(n+p,38):B.b.C(n-p+76,38)]}return q.charCodeAt(0)==0?q:q},
eW(a,b,c){var t,s,r,q,p=A.e([],u.s)
for(t=a.length,s=c.c.a,r=0;r<a.length;a.length===t||(0,A.n)(a),++r){q=a[r]
if(!b.p(0,q)&&s.n(0,B.i).p(0,q))p.push(q)}return p},
ic(a){return A.a1(A.en(a))},
ew(a,b,c){A.ch(a,0,a.length-1,b,c)},
ch(a,b,c,d,e){if(c-b<=32)A.dK(a,b,c,d,e)
else A.dJ(a,b,c,d,e)},
dK(a,b,c,d,e){var t,s,r,q,p,o
for(t=b+1,s=J.aC(a);t<=c;++t){if(!(t>=0&&t<a.length))return A.b(a,t)
r=a[t]
q=t
for(;;){if(q>b){p=q-1
if(!(p>=0&&p<a.length))return A.b(a,p)
p=d.$2(a[p],r)
if(typeof p!=="number")return p.H()
p=p>0}else p=!1
if(!p)break
o=q-1
if(!(o>=0&&o<a.length))return A.b(a,o)
s.j(a,q,a[o])
q=o}s.j(a,q,r)}},
dJ(a2,a3,a4,a5,a6){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=B.b.t(a4-a3+1,6),d=a3+e,c=a4-e,b=B.b.t(a3+a4,2),a=b-e,a0=b+e,a1=a2.length
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
if(typeof a1!=="number")return a1.H()
if(a1>0){o=s
s=t
t=o}a1=a5.$2(q,p)
if(typeof a1!=="number")return a1.H()
if(a1>0){o=p
p=q
q=o}a1=a5.$2(t,r)
if(typeof a1!=="number")return a1.H()
if(a1>0){o=r
r=t
t=o}a1=a5.$2(s,r)
if(typeof a1!=="number")return a1.H()
if(a1>0){o=r
r=s
s=o}a1=a5.$2(t,q)
if(typeof a1!=="number")return a1.H()
if(a1>0){o=q
q=t
t=o}a1=a5.$2(r,q)
if(typeof a1!=="number")return a1.H()
if(a1>0){o=q
q=r
r=o}a1=a5.$2(s,p)
if(typeof a1!=="number")return a1.H()
if(a1>0){o=p
p=s
s=o}a1=a5.$2(s,r)
if(typeof a1!=="number")return a1.H()
if(a1>0){o=r
r=s
s=o}a1=a5.$2(q,p)
if(typeof a1!=="number")return a1.H()
if(a1>0){o=p
p=q
q=o}a1=J.aC(a2)
a1.j(a2,d,t)
a1.j(a2,b,r)
a1.j(a2,c,p)
if(!(a3>=0&&a3<a2.length))return A.b(a2,a3)
a1.j(a2,a,a2[a3])
if(!(a4>=0&&a4<a2.length))return A.b(a2,a4)
a1.j(a2,a0,a2[a4])
n=a3+1
m=a4-1
l=J.I(a5.$2(s,q),0)
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
if(!J.I(a5.$2(a2[n],s),0))break;++n}for(;;){if(!(m>=0&&m<a2.length))return A.b(a2,m)
if(!J.I(a5.$2(a2[m],q),0))break;--m}for(k=n;k<=m;++k){if(!(k<a2.length))return A.b(a2,k)
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
A.dt.prototype={}
J.bL.prototype={
K(a,b){return a===b},
gq(a){return A.bd(a)},
i(a){return"Instance of '"+A.c3(a)+"'"},
gA(a){return A.aA(A.dP(this))}}
J.bN.prototype={
i(a){return String(a)},
gq(a){return a?519018:218159},
gA(a){return A.aA(u.y)},
$ij:1,
$iz:1}
J.b_.prototype={
K(a,b){return null==b},
i(a){return"null"},
gq(a){return 0},
$ij:1}
J.b1.prototype={$it:1}
J.af.prototype={
gq(a){return 0},
i(a){return String(a)}}
J.c2.prototype={}
J.aw.prototype={}
J.ae.prototype={
i(a){var t=a[$.f4()]
if(t==null)t=a[$.e1()]
if(t==null)return this.b7(a)
return"JavaScript function for "+J.bz(t)},
$ian:1}
J.b0.prototype={
gq(a){return 0},
i(a){return String(a)}}
J.b2.prototype={
gq(a){return 0},
i(a){return String(a)}}
J.l.prototype={
k(a,b){A.B(a).c.a(b)
a.$flags&1&&A.aG(a,29)
a.push(b)},
U(a,b){var t
a.$flags&1&&A.aG(a,"remove",1)
for(t=0;t<a.length;++t)if(J.I(a[t],b)){a.splice(t,1)
return!0}return!1},
L(a,b){A.B(a).h("c<1>").a(b)
a.$flags&1&&A.aG(a,"addAll",2)
this.bb(a,b)
return},
bb(a,b){var t,s
u.b.a(b)
t=b.length
if(t===0)return
if(a===b)throw A.d(A.X(a))
for(s=0;s<t;++s)a.push(b[s])},
an(a,b){var t,s=A.cH(a.length,"",!1,u.N)
for(t=0;t<a.length;++t)this.j(s,t,A.i(a[t]))
return s.join(b)},
am(a){return this.an(a,"")},
G(a,b){if(!(b<a.length))return A.b(a,b)
return a[b]},
gS(a){if(a.length>0)return a[0]
throw A.d(A.fA())},
ai(a,b){var t,s
A.B(a).h("z(1)").a(b)
t=a.length
for(s=0;s<t;++s){if(b.$1(a[s]))return!0
if(a.length!==t)throw A.d(A.X(a))}return!1},
Y(a,b){var t,s,r,q,p,o=A.B(a)
o.h("a(1,1)?").a(b)
a.$flags&2&&A.aG(a,"sort")
t=a.length
if(t<2)return
if(b==null)b=J.hH()
if(t===2){s=a[0]
r=a[1]
o=b.$2(s,r)
if(typeof o!=="number")return o.H()
if(o>0){a[0]=r
a[1]=s}return}q=0
if(o.c.b(null))for(p=0;p<a.length;++p)if(a[p]===void 0){a[p]=null;++q}a.sort(A.i7(b,2))
if(q>0)this.bk(a,q)},
a5(a){return this.Y(a,null)},
bk(a,b){var t,s=a.length
for(;t=s-1,s>0;s=t)if(a[t]===null){a[t]=void 0;--b
if(b===0)break}},
aq(a,b){var t,s,r,q
a.$flags&2&&A.aG(a,"shuffle")
t=a.length
while(t>1){s=b.T(t);--t
r=a.length
if(!(t<r))return A.b(a,t)
q=a[t]
if(!(s>=0&&s<r))return A.b(a,s)
a[t]=a[s]
a[s]=q}},
p(a,b){var t
for(t=0;t<a.length;++t)if(J.I(a[t],b))return!0
return!1},
gaQ(a){return a.length!==0},
i(a){return A.ds(a,"[","]")},
gv(a){return new J.al(a,a.length,A.B(a).h("al<1>"))},
gq(a){return A.bd(a)},
gl(a){return a.length},
n(a,b){if(!(b>=0&&b<a.length))throw A.d(A.cj(a,b))
return a[b]},
j(a,b,c){A.B(a).c.a(c)
a.$flags&2&&A.aG(a)
if(!(b>=0&&b<a.length))throw A.d(A.cj(a,b))
a[b]=c},
bu(a,b){var t
A.B(a).h("z(1)").a(b)
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
r="Instance of '"+A.c3(a)+"'"
if(s==="")return r
return r+" ("+s+"length: "+a.length+")"}}
J.cx.prototype={}
J.al.prototype={
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
J.aJ.prototype={
B(a,b){var t
A.eH(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){t=this.gal(b)
if(this.gal(a)===t)return 0
if(this.gal(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gal(a){return a===0?1/a<0:a<0},
bt(a){var t,s
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){t=a|0
return a===t?t:t-1}s=Math.floor(a)
if(isFinite(s))return s
throw A.d(A.bk(""+a+".floor()"))},
bp(a,b,c){if(B.b.B(b,c)>0)throw A.d(A.i3(b))
if(this.B(a,b)<0)return b
if(this.B(a,c)>0)return c
return a},
V(a,b){var t,s,r,q,p
if(b<2||b>36)throw A.d(A.av(b,2,36,"radix",null))
t=a.toString(b)
s=t.length
r=s-1
if(!(r>=0))return A.b(t,r)
if(t.charCodeAt(r)!==41)return t
q=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(t)
if(q==null)A.a1(A.bk("Unexpected toString result: "+t))
s=q.length
if(1>=s)return A.b(q,1)
t=q[1]
if(3>=s)return A.b(q,3)
p=+q[3]
s=q[2]
if(s!=null){t+=s
p-=s.length}return t+B.c.X("0",p)},
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
if(a>0)t=this.bl(a,b)
else{t=b>31?31:b
t=a>>t>>>0}return t},
bl(a,b){return b>31?0:a>>>b},
gA(a){return A.aA(u.H)},
$iE:1,
$ik:1,
$iD:1}
J.aZ.prototype={
gA(a){return A.aA(u.S)},
$ij:1,
$ia:1}
J.bO.prototype={
gA(a){return A.aA(u.i)},
$ij:1}
J.ad.prototype={
aN(a,b){var t=b.length,s=a.length
if(t>s)return!1
return b===this.Z(a,s-t)},
ar(a,b){var t=b.length
if(t>a.length)return!1
return b===a.substring(0,t)},
D(a,b,c){return a.substring(b,A.fW(b,c,a.length))},
Z(a,b){return this.D(a,b,null)},
aX(a){var t,s,r,q=a.trim(),p=q.length
if(p===0)return q
if(0>=p)return A.b(q,0)
if(q.charCodeAt(0)===133){t=J.fF(q,1)
if(t===p)return""}else t=0
s=p-1
if(!(s>=0))return A.b(q,s)
r=q.charCodeAt(s)===133?J.fG(q,s):p
if(t===0&&r===p)return q
return q.substring(t,r)},
X(a,b){var t,s
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.d(B.I)
for(t=a,s="";;){if((b&1)===1)s=t+s
b=b>>>1
if(b===0)break
t+=t}return s},
by(a,b,c){var t=b-a.length
if(t<=0)return a
return this.X(c,t)+a},
aP(a,b){var t=a.indexOf(b,0)
return t},
B(a,b){var t
A.v(b)
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
$iei:1,
$if:1}
A.bR.prototype={
i(a){return"LateInitializationError: "+this.a}}
A.cL.prototype={}
A.aY.prototype={}
A.K.prototype={
gv(a){var t=this
return new A.as(t,t.gl(t),A.m(t).h("as<K.E>"))},
gN(a){return this.gl(this)===0},
a3(a){var t,s=this,r=A.dw(A.m(s).h("K.E"))
for(t=0;t<s.gl(s);++t)r.k(0,s.G(0,t))
return r}}
A.bh.prototype={
gbe(){var t=this.a.length,s=this.c
if(s>t)return t
return s},
gbm(){var t=this.a.length,s=this.b
if(s>t)return t
return s},
gl(a){var t,s=this.a.length,r=this.b
if(r>=s)return 0
t=this.c
if(t>=s)return s-r
return t-r},
G(a,b){var t=this,s=t.gbm()+b,r=t.gbe()
if(s>=r)throw A.d(A.dr(b,t.gl(0),t,"index"))
return J.e4(t.a,s)},
bA(a){var t,s,r,q,p=this,o=p.b,n=p.a,m=n.length,l=p.c
if(l<m)m=l
t=m-o
if(t<=0){n=J.ed(0,p.$ti.c)
return n}s=J.aC(n)
r=A.cH(t,s.G(n,o),!0,p.$ti.c)
for(q=1;q<t;++q){B.a.j(r,q,s.G(n,o+q))
if(n.length<m)throw A.d(A.X(p))}return r}}
A.as.prototype={
gu(){var t=this.d
return t==null?this.$ti.c.a(t):t},
m(){var t,s=this,r=s.a,q=J.dU(r),p=q.gl(r)
if(s.b!==p)throw A.d(A.X(r))
t=s.c
if(t>=p){s.d=null
return!1}s.d=q.G(r,t);++s.c
return!0},
$iC:1}
A.b6.prototype={
gl(a){return J.J(this.a)},
G(a,b){return this.b.$1(J.e4(this.a,b))}}
A.T.prototype={
gv(a){return new A.bl(J.dp(this.a),this.b,this.$ti.h("bl<1>"))}}
A.bl.prototype={
m(){var t,s
for(t=this.a,s=this.b;t.m();)if(s.$1(t.gu()))return!0
return!1},
gu(){return this.a.gu()},
$iC:1}
A.r.prototype={
sl(a,b){throw A.d(A.bk("Cannot change the length of a fixed-length list"))},
k(a,b){A.aD(a).h("r.E").a(b)
throw A.d(A.bk("Cannot add to a fixed-length list"))}}
A.a0.prototype={$r:"+(1,2)",$s:1}
A.bs.prototype={$r:"+(1,2,3)",$s:2}
A.aV.prototype={
gN(a){return this.gl(this)===0},
i(a){return A.dB(this)},
$iZ:1}
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
af(){var t=this,s=t.$map
if(s==null){s=new A.b3(t.$ti.h("b3<1,2>"))
A.eX(t.a,s)
t.$map=s}return s},
n(a,b){return this.af().n(0,b)},
M(a,b){this.$ti.h("~(1,2)").a(b)
this.af().M(0,b)},
gl(a){return this.af().a}}
A.aW.prototype={
k(a,b){A.m(this).c.a(b)
A.dq()},
U(a,b){A.dq()},
aV(a){A.dq()}}
A.aI.prototype={
gl(a){return this.b},
gv(a){var t,s=this,r=s.$keys
if(r==null){r=Object.keys(s.a)
s.$keys=r}t=r
return new A.bm(t,t.length,s.$ti.h("bm<1>"))},
p(a,b){if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
a3(a){return A.dz(this,this.$ti.c)}}
A.be.prototype={}
A.cM.prototype={
I(a){var t,s,r=this,q=new RegExp(r.a).exec(a)
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
A.cJ.prototype={
i(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.aa.prototype={
i(a){var t=this.constructor,s=t==null?null:t.name
return"Closure '"+A.f3(s==null?"unknown":s)+"'"},
$ian:1,
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
return"Closure '"+A.f3(t)+"'"}}
A.aH.prototype={
K(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.aH))return!1
return this.$_target===b.$_target&&this.a===b.a},
gq(a){return(A.dZ(this.a)^A.bd(this.$_target))>>>0},
i(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.c3(this.a)+"'")}}
A.c4.prototype={
i(a){return"RuntimeError: "+this.a}}
A.a5.prototype={
gl(a){return this.a},
gN(a){return this.a===0},
gR(){return new A.O(this,A.m(this).h("O<1>"))},
E(a){var t,s
if(typeof a=="string"){t=this.b
if(t==null)return!1
return t[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){s=this.c
if(s==null)return!1
return s[a]!=null}else return this.bv(a)},
bv(a){var t=this.d
if(t==null)return!1
return this.a2(this.aA(t,a),a)>=0},
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
s=this.a2(t,a)
if(s<0)return null
return t[s].b},
j(a,b,c){var t,s,r,q,p,o,n=this,m=A.m(n)
m.c.a(b)
m.y[1].a(c)
if(typeof b=="string"){t=n.b
n.av(t==null?n.b=n.ag():t,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){s=n.c
n.av(s==null?n.c=n.ag():s,b,c)}else{r=n.d
if(r==null)r=n.d=n.ag()
q=n.aj(b)
p=r[q]
if(p==null)r[q]=[n.ah(b,c)]
else{o=n.a2(p,b)
if(o>=0)p[o].b=c
else p.push(n.ah(b,c))}}},
M(a,b){var t,s,r=this
A.m(r).h("~(1,2)").a(b)
t=r.e
s=r.r
while(t!=null){b.$2(t.a,t.b)
if(s!==r.r)throw A.d(A.X(r))
t=t.c}},
av(a,b,c){var t,s=A.m(this)
s.c.a(b)
s.y[1].a(c)
t=a[b]
if(t==null)a[b]=this.ah(b,c)
else t.b=c},
ah(a,b){var t=this,s=A.m(t),r=new A.cF(s.c.a(a),s.y[1].a(b))
if(t.e==null)t.e=t.f=r
else t.f=t.f.c=r;++t.a
t.r=t.r+1&1073741823
return r},
aj(a){return J.a2(a)&1073741823},
aA(a,b){return a[this.aj(b)]},
a2(a,b){var t,s
if(a==null)return-1
t=a.length
for(s=0;s<t;++s)if(J.I(a[s].a,b))return s
return-1},
i(a){return A.dB(this)},
ag(){var t=Object.create(null)
t["<non-identifier-key>"]=t
delete t["<non-identifier-key>"]
return t},
$idv:1}
A.cF.prototype={}
A.O.prototype={
gl(a){return this.a.a},
gN(a){return this.a.a===0},
gv(a){var t=this.a
return new A.aq(t,t.r,t.e,this.$ti.h("aq<1>"))}}
A.aq.prototype={
gu(){return this.d},
m(){var t,s=this,r=s.a
if(s.b!==r.r)throw A.d(A.X(r))
t=s.c
if(t==null){s.d=null
return!1}else{s.d=t.a
s.c=t.c
return!0}},
$iC:1}
A.cG.prototype={
gl(a){return this.a.a},
gv(a){var t=this.a
return new A.ar(t,t.r,t.e,this.$ti.h("ar<1>"))}}
A.ar.prototype={
gu(){return this.d},
m(){var t,s=this,r=s.a
if(s.b!==r.r)throw A.d(A.X(r))
t=s.c
if(t==null){s.d=null
return!1}else{s.d=t.b
s.c=t.c
return!0}},
$iC:1}
A.ao.prototype={
gl(a){return this.a.a},
gv(a){var t=this.a
return new A.ap(t,t.r,t.e,this.$ti.h("ap<1,2>"))}}
A.ap.prototype={
gu(){var t=this.d
t.toString
return t},
m(){var t,s=this,r=s.a
if(s.b!==r.r)throw A.d(A.X(r))
t=s.c
if(t==null){s.d=null
return!1}else{s.d=new A.at(t.a,t.b,s.$ti.h("at<1,2>"))
s.c=t.c
return!0}},
$iC:1}
A.b3.prototype={
aj(a){return A.i6(a)&1073741823},
a2(a,b){var t,s
if(a==null)return-1
t=a.length
for(s=0;s<t;++s)if(J.I(a[s].a,b))return s
return-1}}
A.d4.prototype={
$1(a){return this.a(a)},
$S:1}
A.d5.prototype={
$2(a,b){return this.a(a,b)},
$S:6}
A.d6.prototype={
$1(a){return this.a(A.v(a))},
$S:7}
A.a_.prototype={
i(a){return this.aG(!1)},
aG(a){var t,s,r,q,p,o=this.bf(),n=this.ae(),m=(a?"Record ":"")+"("
for(t=o.length,s="",r=0;r<t;++r,s=", "){m+=s
q=o[r]
if(typeof q=="string")m=m+q+": "
if(!(r<n.length))return A.b(n,r)
p=n[r]
m=a?m+A.ek(p):m+A.i(p)}m+=")"
return m.charCodeAt(0)==0?m:m},
bf(){var t,s=this.$s
while($.cW.length<=s)B.a.k($.cW,null)
t=$.cW[s]
if(t==null){t=this.bc()
B.a.j($.cW,s,t)}return t},
bc(){var t,s,r,q=this.$r,p=q.indexOf("("),o=q.substring(1,p),n=q.substring(p),m=n==="()"?0:n.replace(/[^,]/g,"").length+1,l=A.e(new Array(m),u.f)
for(t=0;t<m;++t)l[t]=t
if(o!==""){s=o.split(",")
t=s.length
for(r=m;t>0;){--r;--t
B.a.j(l,r,s[t])}}return A.dA(l,u.K)}}
A.aP.prototype={
ae(){return[this.a,this.b]},
K(a,b){if(b==null)return!1
return b instanceof A.aP&&this.$s===b.$s&&J.I(this.a,b.a)&&J.I(this.b,b.b)},
gq(a){return A.dC(this.$s,this.a,this.b,B.k)}}
A.aQ.prototype={
ae(){return[this.a,this.b,this.c]},
K(a,b){var t=this
if(b==null)return!1
return b instanceof A.aQ&&t.$s===b.$s&&J.I(t.a,b.a)&&J.I(t.b,b.b)&&J.I(t.c,b.c)},
gq(a){var t=this
return A.dC(t.$s,t.a,t.b,t.c)}}
A.aL.prototype={
gA(a){return B.ad},
$ij:1}
A.b9.prototype={}
A.bT.prototype={
gA(a){return B.ae},
$ij:1}
A.aM.prototype={
gl(a){return a.length},
$iF:1}
A.b7.prototype={
j(a,b,c){A.eF(c)
a.$flags&2&&A.aG(a)
A.eK(b,a,a.length)
a[b]=c},
$ic:1,
$ih:1}
A.b8.prototype={
j(a,b,c){A.ay(c)
a.$flags&2&&A.aG(a)
A.eK(b,a,a.length)
a[b]=c},
$ic:1,
$ih:1}
A.bU.prototype={
gA(a){return B.af},
$ij:1}
A.bV.prototype={
gA(a){return B.ag},
$ij:1}
A.bW.prototype={
gA(a){return B.ah},
$ij:1}
A.bX.prototype={
gA(a){return B.ai},
$ij:1}
A.bY.prototype={
gA(a){return B.aj},
$ij:1}
A.bZ.prototype={
gA(a){return B.al},
$ij:1}
A.c_.prototype={
gA(a){return B.am},
$ij:1}
A.ba.prototype={
gA(a){return B.an},
gl(a){return a.length},
$ij:1}
A.c0.prototype={
gA(a){return B.ao},
gl(a){return a.length},
$ij:1,
$idH:1}
A.bo.prototype={}
A.bp.prototype={}
A.bq.prototype={}
A.br.prototype={}
A.R.prototype={
h(a){return A.by(v.typeUniverse,this,a)},
a6(a){return A.eC(v.typeUniverse,this,a)}}
A.cc.prototype={}
A.ci.prototype={
i(a){return A.G(this.a,null)}}
A.cb.prototype={
i(a){return this.a}}
A.bu.prototype={}
A.c7.prototype={}
A.U.prototype={
bh(){return new A.U(A.m(this).h("U<1>"))},
gv(a){var t=this,s=new A.a9(t,t.r,A.m(t).h("a9<1>"))
s.c=t.e
return s},
gl(a){return this.a},
p(a,b){var t,s
if(typeof b=="string"&&b!=="__proto__"){t=this.b
if(t==null)return!1
return u.g.a(t[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){s=this.c
if(s==null)return!1
return u.g.a(s[b])!=null}else return this.bd(b)},
bd(a){var t=this.d
if(t==null)return!1
return this.ad(t[this.a9(a)],a)>=0},
k(a,b){var t,s,r=this
A.m(r).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){t=r.b
return r.aw(t==null?r.b=A.dI():t,b)}else if(typeof b=="number"&&(b&1073741823)===b){s=r.c
return r.aw(s==null?r.c=A.dI():s,b)}else return r.ba(b)},
ba(a){var t,s,r,q=this
A.m(q).c.a(a)
t=q.d
if(t==null)t=q.d=A.dI()
s=q.a9(a)
r=t[s]
if(r==null)t[s]=[q.a8(a)]
else{if(q.ad(r,a)>=0)return!1
r.push(q.a8(a))}return!0},
U(a,b){var t=this
if(typeof b=="string"&&b!=="__proto__")return t.aD(t.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return t.aD(t.c,b)
else return t.bj(b)},
bj(a){var t,s,r,q,p=this,o=p.d
if(o==null)return!1
t=p.a9(a)
s=o[t]
r=p.ad(s,a)
if(r<0)return!1
q=s.splice(r,1)[0]
if(0===s.length)delete o[t]
p.aH(q)
return!0},
aw(a,b){A.m(this).c.a(b)
if(u.g.a(a[b])!=null)return!1
a[b]=this.a8(b)
return!0},
aD(a,b){var t
if(a==null)return!1
t=u.g.a(a[b])
if(t==null)return!1
this.aH(t)
delete a[b]
return!0},
aB(){this.r=this.r+1&1073741823},
a8(a){var t,s=this,r=new A.cf(A.m(s).c.a(a))
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
a9(a){return J.a2(a)&1073741823},
ad(a,b){var t,s
if(a==null)return-1
t=a.length
for(s=0;s<t;++s)if(J.I(a[s].a,b))return s
return-1},
$ieh:1}
A.cf.prototype={}
A.a9.prototype={
gu(){var t=this.d
return t==null?this.$ti.c.a(t):t},
m(){var t=this,s=t.c,r=t.a
if(t.b!==r.r)throw A.d(A.X(r))
else if(s==null){t.d=null
return!1}else{t.d=t.$ti.h("1?").a(s.a)
t.c=s.b
return!0}},
$iC:1}
A.p.prototype={
gv(a){return new A.as(a,a.length,A.aD(a).h("as<p.E>"))},
G(a,b){if(!(b<a.length))return A.b(a,b)
return a[b]},
gaQ(a){return a.length!==0},
k(a,b){var t
A.aD(a).h("p.E").a(b)
t=a.length
this.sl(a,t+1)
if(!(t<a.length))return A.b(a,t)
a[t]=b},
i(a){return A.ds(a,"[","]")}}
A.A.prototype={
M(a,b){var t,s,r,q=A.m(this)
q.h("~(A.K,A.V)").a(b)
for(t=this.gR(),t=t.gv(t),q=q.h("A.V");t.m();){s=t.gu()
r=this.n(0,s)
b.$2(s,r==null?q.a(r):r)}},
gl(a){var t=this.gR()
return t.gl(t)},
gN(a){var t=this.gR()
return t.gN(t)},
i(a){return A.dB(this)},
$iZ:1}
A.cI.prototype={
$2(a,b){var t,s=this.a
if(!s.a)this.b.a+=", "
s.a=!1
s=this.b
t=A.i(a)
s.a=(s.a+=t)+": "
t=A.i(b)
s.a+=t},
$S:2}
A.ah.prototype={
L(a,b){var t
A.m(this).h("c<1>").a(b)
for(t=b.gv(b);t.m();)this.k(0,t.gu())},
aV(a){var t,s,r
for(t=A.bn(a,a.r,A.m(a).c),s=t.$ti.c;t.m();){r=t.d
this.U(0,r==null?s.a(r):r)}},
bz(a){var t,s,r,q=this.a3(0)
for(t=A.bn(a,a.r,A.m(a).c),s=t.$ti.c;t.m();){r=t.d
q.U(0,r==null?s.a(r):r)}this.aV(q)},
i(a){return A.ds(this,"{","}")},
ai(a,b){var t
A.m(this).h("z(1)").a(b)
for(t=this.gv(this);t.m();)if(b.$1(t.gu()))return!0
return!1},
$ic:1,
$iaO:1}
A.bt.prototype={
a3(a){var t=this.bh()
t.L(0,this)
return t}}
A.cd.prototype={
n(a,b){var t,s=this.b
if(s==null)return this.c.n(0,b)
else if(typeof b!="string")return null
else{t=s[b]
return typeof t=="undefined"?this.bi(b):t}},
gl(a){return this.b==null?this.c.a:this.a_().length},
gN(a){return this.gl(0)===0},
gR(){if(this.b==null){var t=this.c
return new A.O(t,A.m(t).h("O<1>"))}return new A.ce(this)},
M(a,b){var t,s,r,q,p=this
u.cQ.a(b)
if(p.b==null)return p.c.M(0,b)
t=p.a_()
for(s=0;s<t.length;++s){r=t[s]
q=p.b[r]
if(typeof q=="undefined"){q=A.cZ(p.a[r])
p.b[r]=q}b.$2(r,q)
if(t!==p.c)throw A.d(A.X(p))}},
a_(){var t=u.aL.a(this.c)
if(t==null)t=this.c=A.e(Object.keys(this.a),u.s)
return t},
bi(a){var t
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
t=A.cZ(this.a[a])
return this.b[a]=t}}
A.ce.prototype={
gl(a){return this.a.gl(0)},
G(a,b){var t=this.a
if(t.b==null)t=t.gR().G(0,b)
else{t=t.a_()
if(!(b<t.length))return A.b(t,b)
t=t[b]}return t},
gv(a){var t=this.a
if(t.b==null){t=t.gR()
t=t.gv(t)}else{t=t.a_()
t=new J.al(t,t.length,A.B(t).h("al<1>"))}return t}}
A.bF.prototype={}
A.bH.prototype={}
A.b4.prototype={
i(a){var t=A.bJ(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+t}}
A.bQ.prototype={
i(a){return"Cyclic error in JSON stringify"}}
A.cy.prototype={
aM(a,b){var t=A.hV(a,this.gbq().a)
return t},
F(a,b){var t=A.h3(a,this.gbr().b,null)
return t},
gbr(){return B.N},
gbq(){return B.M}}
A.cA.prototype={}
A.cz.prototype={}
A.cU.prototype={
b0(a){var t,s,r,q,p,o,n=a.length
for(t=this.c,s=0,r=0;r<n;++r){q=a.charCodeAt(r)
if(q>92){if(q>=55296){p=q&64512
if(p===55296){o=r+1
o=!(o<n&&(a.charCodeAt(o)&64512)===56320)}else o=!1
if(!o)if(p===56320){p=r-1
p=!(p>=0&&(a.charCodeAt(p)&64512)===55296)}else p=!1
else p=!0
if(p){if(r>s)t.a+=B.c.D(a,s,r)
s=r+1
p=A.y(92)
t.a+=p
p=A.y(117)
t.a+=p
p=A.y(100)
t.a+=p
p=q>>>8&15
p=A.y(p<10?48+p:87+p)
t.a+=p
p=q>>>4&15
p=A.y(p<10?48+p:87+p)
t.a+=p
p=q&15
p=A.y(p<10?48+p:87+p)
t.a+=p}}continue}if(q<32){if(r>s)t.a+=B.c.D(a,s,r)
s=r+1
p=A.y(92)
t.a+=p
switch(q){case 8:p=A.y(98)
t.a+=p
break
case 9:p=A.y(116)
t.a+=p
break
case 10:p=A.y(110)
t.a+=p
break
case 12:p=A.y(102)
t.a+=p
break
case 13:p=A.y(114)
t.a+=p
break
default:p=A.y(117)
t.a+=p
p=A.y(48)
t.a=(t.a+=p)+p
p=q>>>4&15
p=A.y(p<10?48+p:87+p)
t.a+=p
p=q&15
p=A.y(p<10?48+p:87+p)
t.a+=p
break}}else if(q===34||q===92){if(r>s)t.a+=B.c.D(a,s,r)
s=r+1
p=A.y(92)
t.a+=p
p=A.y(q)
t.a+=p}}if(s===0)t.a+=a
else if(s<n)t.a+=B.c.D(a,s,n)},
a7(a){var t,s,r,q
for(t=this.a,s=t.length,r=0;r<s;++r){q=t[r]
if(a==null?q==null:a===q)throw A.d(new A.bQ(a,null))}B.a.k(t,a)},
a4(a){var t,s,r,q,p=this
if(p.b_(a))return
p.a7(a)
try{t=p.b.$1(a)
if(!p.b_(t)){r=A.ef(a,null,p.gaC())
throw A.d(r)}r=p.a
if(0>=r.length)return A.b(r,-1)
r.pop()}catch(q){s=A.ck(q)
r=A.ef(a,s,p.gaC())
throw A.d(r)}},
b_(a){var t,s,r=this
if(typeof a=="number"){if(!isFinite(a))return!1
r.c.a+=B.t.i(a)
return!0}else if(a===!0){r.c.a+="true"
return!0}else if(a===!1){r.c.a+="false"
return!0}else if(a==null){r.c.a+="null"
return!0}else if(typeof a=="string"){t=r.c
t.a+='"'
r.b0(a)
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
if(J.fg(a)){if(0>=a.length)return A.b(a,0)
this.a4(a[0])
for(t=1;t<a.length;++t){s.a+=","
this.a4(a[t])}}s.a+="]"},
bD(a){var t,s,r,q,p,o,n=this,m={}
if(a.gN(a)){n.c.a+="{}"
return!0}t=a.gl(a)*2
s=A.cH(t,null,!1,u.X)
r=m.a=0
m.b=!0
a.M(0,new A.cV(m,s))
if(!m.b)return!1
q=n.c
q.a+="{"
for(p='"';r<t;r+=2,p=',"'){q.a+=p
n.b0(A.v(s[r]))
q.a+='":'
o=r+1
if(!(o<t))return A.b(s,o)
n.a4(s[o])}q.a+="}"
return!0}}
A.cV.prototype={
$2(a,b){var t,s
if(typeof a!="string")this.a.b=!1
t=this.b
s=this.a
B.a.j(t,s.a++,a)
B.a.j(t,s.a++,b)},
$S:2}
A.cT.prototype={
gaC(){var t=this.c.a
return t.charCodeAt(0)==0?t:t}}
A.cE.prototype={
aL(a){var t,s,r,q,p=A.e([],u.s),o=a.length
for(t=0,s=0,r=0;r<o;++r,s=q){q=a.charCodeAt(r)
if(q!==13){if(q!==10)continue
if(s===13){t=r+1
continue}}B.a.k(p,B.c.D(a,t,r))
t=r+1}if(t<o)B.a.k(p,B.c.D(a,t,o))
return p}}
A.cv.prototype={
$0(){var t=this
return A.a1(A.cl("("+t.a+", "+t.b+", "+t.c+", "+t.d+", "+t.e+", "+t.f+", "+t.r+", "+t.w+")"))},
$S:8}
A.ac.prototype={
O(a){var t=1000,s=B.b.C(a,t),r=B.b.t(a-s,t),q=this.b+s,p=B.b.C(q,t),o=this.a+B.b.t(q-p,t)+r
if(o<-864e13||o>864e13)A.a1(A.av(o,-864e13,864e13,"millisecondsSinceEpoch",null))
if(o===864e13&&p!==0)A.a1(A.bA(p,"microsecond","Time including microseconds is outside valid range"))
A.eU(!0,"isUtc",u.y)
return new A.ac(o,p,!0)},
K(a,b){var t
if(b==null)return!1
t=!1
if(b instanceof A.ac)if(this.a===b.a)t=this.b===b.b
return t},
gq(a){return A.dC(this.a,this.b,B.k,B.k)},
B(a,b){var t
u.k.a(b)
t=B.b.B(this.a,b.a)
if(t!==0)return t
return B.b.B(this.b,b.b)},
i(a){var t=this,s=A.ft(A.fQ(t)),r=A.bI(A.fO(t)),q=A.bI(A.fK(t)),p=A.bI(A.fL(t)),o=A.bI(A.fN(t)),n=A.bI(A.fP(t)),m=A.eb(A.fM(t)),l=t.b,k=l===0?"":A.eb(l)
return s+"-"+r+"-"+q+" "+p+":"+o+":"+n+"."+m+k+"Z"},
$iE:1}
A.am.prototype={
K(a,b){if(b==null)return!1
return b instanceof A.am&&this.a===b.a},
gq(a){return B.b.gq(this.a)},
B(a,b){return B.b.B(this.a,u.d.a(b).a)},
i(a){var t,s,r,q,p,o=this.a,n=B.b.t(o,36e8),m=o%36e8
if(o<0){n=0-n
o=0-m
t="-"}else{o=m
t=""}s=B.b.t(o,6e7)
o%=6e7
r=s<10?"0":""
q=B.b.t(o,1e6)
p=q<10?"0":""
return t+n+":"+r+s+":"+p+q+"."+B.c.by(B.b.i(o%1e6),6,"0")},
$iE:1}
A.cQ.prototype={
i(a){return this.aa()}}
A.o.prototype={}
A.bB.prototype={
i(a){var t=this.a
if(t!=null)return"Assertion failed: "+A.bJ(t)
return"Assertion failed"}}
A.bi.prototype={}
A.a3.prototype={
gac(){return"Invalid argument"+(!this.a?"(s)":"")},
gab(){return""},
i(a){var t=this,s=t.c,r=s==null?"":" ("+s+")",q=t.d,p=q==null?"":": "+q,o=t.gac()+r+p
if(!t.a)return o
return o+t.gab()+": "+A.bJ(t.gak())},
gak(){return this.b}}
A.aN.prototype={
gak(){return A.eI(this.b)},
gac(){return"RangeError"},
gab(){var t,s=this.e,r=this.f
if(s==null)t=r!=null?": Not less than or equal to "+A.i(r):""
else if(r==null)t=": Not greater than or equal to "+A.i(s)
else if(r>s)t=": Not in inclusive range "+A.i(s)+".."+A.i(r)
else t=r<s?": Valid value range is empty":": Only valid value is "+A.i(s)
return t}}
A.bK.prototype={
gak(){return A.ay(this.b)},
gac(){return"RangeError"},
gab(){if(A.ay(this.b)<0)return": index must not be negative"
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
A.c1.prototype={
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
G(a,b){var t,s
A.dE(b,"index")
t=this.gv(this)
for(s=b;t.m();){if(s===0)return t.gu();--s}throw A.d(A.dr(b,b-s,this,"index"))},
i(a){return A.fB(this,"(",")")}}
A.at.prototype={
i(a){return"MapEntry("+A.i(this.a)+": "+A.i(this.b)+")"}}
A.bb.prototype={
gq(a){return A.q.prototype.gq.call(this,0)},
i(a){return"null"}}
A.q.prototype={$iq:1,
K(a,b){return this===b},
gq(a){return A.bd(this)},
i(a){return"Instance of '"+A.c3(this)+"'"},
gA(a){return A.ii(this)},
toString(){return this.i(this)}}
A.ai.prototype={
gl(a){return this.a.length},
i(a){var t=this.a
return t.charCodeAt(0)==0?t:t},
$ifY:1}
A.cg.prototype={
b9(a){var t,s,r,q,p,o,n,m=this,l=4294967296
do{t=a>>>0
a=B.b.t(a-t,l)
s=a>>>0
a=B.b.t(a-s,l)
r=(~t>>>0)+(t<<21>>>0)
q=r>>>0
s=(~s>>>0)+((s<<21|t>>>11)>>>0)+B.b.t(r-q,l)>>>0
r=((q^(q>>>24|s<<8))>>>0)*265
t=r>>>0
s=((s^s>>>24)>>>0)*265+B.b.t(r-t,l)>>>0
r=((t^(t>>>14|s<<18))>>>0)*21
t=r>>>0
s=((s^s>>>14)>>>0)*21+B.b.t(r-t,l)>>>0
t=(t^(t>>>28|s<<4))>>>0
s=(s^s>>>28)>>>0
r=(t<<31>>>0)+t
q=r>>>0
p=B.b.t(r-q,l)
r=m.a*1037
o=m.a=r>>>0
n=m.b*1037+B.b.t(r-o,l)>>>0
m.b=n
o=(o^q)>>>0
m.a=o
p=(n^s+((s<<31|t>>>1)>>>0)+p>>>0)>>>0
m.b=p}while(a!==0)
if(p===0&&o===0)m.a=23063
m.J()
m.J()
m.J()
m.J()},
J(){var t=this,s=t.a,r=4294901760*s,q=r>>>0,p=55905*s,o=p>>>0,n=o+q+t.b
s=n>>>0
t.a=s
t.b=B.b.t(p-o+(r-q)+(n-s),4294967296)>>>0},
T(a){var t,s,r,q=this
if(a<=0||a>4294967296)throw A.d(A.fV("max must be in range 0 < max \u2264 2^32, was "+a))
t=a-1
if((a&t)>>>0===0){q.J()
return(q.a&t)>>>0}do{q.J()
s=q.a
r=s%a}while(s-r+a>=4294967296)
return r},
ao(){var t,s=this
s.J()
t=s.a
s.J()
return((t&67108863)*134217728+(s.a&134217727))/9007199254740992},
aS(){this.J()
return(this.a&1)===0},
$ifU:1}
A.ab.prototype={
aa(){return"Commonness."+this.b}}
A.W.prototype={
aa(){return"BoardShape."+this.b}}
A.Q.prototype={
aZ(a){var t=this
return new A.Q(t.a,t.b,t.c,t.d,t.e,t.f,t.r,t.w,t.x,t.y,a)}}
A.a4.prototype={
aa(){return"Direction."+this.b}}
A.a7.prototype={
gl(a){return this.a.length},
a1(a){var t=this.b,s=this.c
return this.d===B.d?new A.a0(t,s+a):new A.a0(t+a,s)},
i(a){var t=this
return t.a+"@"+t.b+","+t.c+t.d.c}}
A.cp.prototype={
gap(){var t,s,r,q=this,p=q.f
if(p===$){t=q.d
s=A.m(t).h("O<1>")
r=A.bS(new A.O(t,s),s.h("c.E"))
B.a.a5(r)
q.f!==$&&A.iB()
q.f=r
p=r}return p},
aK(a){var t,s,r,q=this.c
if(!(a>=0&&a<q.length))return A.b(q,a)
t=q[a]
q=A.e([],u.t)
for(s=t.a.length,r=0;r<s;++r)q.push(new A.cq(this,t,r).$0())
return q},
b4(a){var t=this.e.n(0,a)
return t==null?B.m:t},
gW(){var t,s,r,q=A.e([],u.s)
for(t=this.c,s=t.length,r=0;r<s;++r)q.push(t[r].a)
return q},
b3(a){return B.a.bu(this.c,new A.cr(a))},
aY(){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1=this,b2=u.s,b3=A.e([],b2),b4=b1.c,b5=b4.length
if(b5===0)return A.e(["no words"],b2)
t=A.aK(u.N)
for(s=0;s<b5;++s){b2=b4[s].a
if(!t.k(0,b2))B.a.k(b3,b2+" appears twice")}for(b2=b1.gap(),r=b2.length,q=b1.b-1,p=b1.a,o=p-1,n=b1.e,m=b1.d,s=0;s<b2.length;b2.length===r||(0,A.n)(b2),++s){l=b2[s]
k=B.b.au(l,p)
j=B.b.C(l,p)
i=n.n(0,l)
if(i==null)i=B.m
h=A.B(i)
g=new A.b6(i,h.h("a4(1)").a(new A.cs(b1)),h.h("b6<1,a4>")).a3(0)
f=j>0&&m.E(l-1)
e=j<o&&m.E(l+1)
d=k>0&&m.E(l-p)
c=k<q&&m.E(l+p)
if((f||e)&&!g.p(0,B.d))B.a.k(b3,"stray across contact at "+k+","+j)
if((d||c)&&!g.p(0,B.e))B.a.k(b3,"stray down contact at "+k+","+j)}for(s=0;s<b5;++s){b=b4[s]
a=b.a1(0)
a0=a.a
a1=a.b
b2=b.a
a2=b.a1(b2.length-1)
a3=a2.a
a4=a2.b
r=b.d===B.d
a5=r?new A.a0(a0,a1-1):new A.a0(a0-1,a1)
a6=r?new A.a0(a3,a4+1):new A.a0(a3+1,a4)
r=new A.cu(b1)
if(r.$2(a5.a,a5.b)||r.$2(a6.a,a6.b))B.a.k(b3,b2+" runs into another word")}if(b5>1){for(b=0;b<b5;++b)if(!B.a.ai(b1.aK(b),new A.ct(b1)))B.a.k(b3,b4[b].a+" crosses nothing")
a7=A.dx([0],u.S)
a8=A.e([0],u.t)
while(b2=a8.length,b2!==0){if(0>=b2)return A.b(a8,-1)
for(b2=b1.aK(a8.pop()),b4=b2.length,s=0;s<b2.length;b2.length===b4||(0,A.n)(b2),++s){r=n.n(0,b2[s])
if(r==null)r=B.m
q=r.length
a9=0
for(;a9<r.length;r.length===q||(0,A.n)(r),++a9){b0=r[a9]
if(a7.k(0,b0))B.a.k(a8,b0)}}}if(a7.a!==b5)B.a.k(b3,"the grid is in pieces")}return b3},
gaR(){var t,s,r,q,p,o,n,m=this.gap(),l=m.length
if(l===0)return 0
for(t=this.a,s=t-1,r=this.d,q=0,p=0;o=m.length,p<o;m.length===l||(0,A.n)(m),++p){n=m[p]
if(r.E(B.b.au(n,t)*t+(s-B.b.C(n,t))))++q}return q/o}}
A.cq.prototype={
$0(){var t=this.b.a1(this.c)
return t.a*this.a.a+t.b},
$S:9}
A.cr.prototype={
$1(a){return u.c.a(a).a===this.a},
$S:3}
A.cs.prototype={
$1(a){var t
A.ay(a)
t=this.a.c
if(!(a>=0&&a<t.length))return A.b(t,a)
return t[a].d},
$S:10}
A.cu.prototype={
$2(a,b){var t,s=!1
if(a>=0)if(b>=0){t=this.a
if(a<t.b){s=t.a
s=b<s&&t.d.E(a*s+b)}}return s},
$S:11}
A.ct.prototype={
$1(a){return this.a.b4(A.ay(a)).length>1},
$S:12}
A.cK.prototype={
i(a){var t=this
return"Puzzle("+t.a+", "+t.b.c.length+" grid, "+t.c.length+" bonus, "+t.e+")"}}
A.c5.prototype={
aI(a,b){var t,s=!1
if(a>=0)if(b>=0){t=this.a
if(a<t.length)if(b<B.a.gS(t).length){s=t[a]
if(!(b<s.length))return A.b(s,b)
s=s.charCodeAt(b)===35}}return s}}
A.Y.prototype={}
A.cn.prototype={}
A.co.prototype={
$2(a,b){var t=u.O
t.a(a)
return B.b.B(t.a(b).b,a.b)},
$S:13}
A.cC.prototype={}
A.cB.prototype={}
A.d8.prototype={
$2(a,b){A.v(a)
return B.b.B(A.v(b).length,a.length)},
$S:4}
A.d9.prototype={
$1(a){return A.v(a).length===3},
$S:0}
A.da.prototype={
$1(a){return A.v(a).length>=6},
$S:0}
A.L.prototype={}
A.d_.prototype={
$2(a,b){var t=u.Q
t.a(a)
t.a(b)
t=new A.d0(this.a)
return J.e3(t.$1(a),t.$1(b))},
$S:14}
A.d0.prototype={
$1(a){return B.a.p(A.e([a.a,a.b,a.c,a.d],u.s),this.a.a)?0:1},
$S:15}
A.cO.prototype={
aO(a,b,c){var t,s,r,q,p,o,n,m=this
u.r.a(a)
t=m.f
s=m.e
r=0
for(;;){if(!(r<3&&s.length<b))break
for(q=a.length,p=!1,o=0;o<a.length;a.length===q||(0,A.n)(a),++o){n=a[o]
if(s.length>=b)break
if(t.p(0,n)||!m.aU(n))continue
if(m.aT(n,c))p=!0}if(!p)break;++r}},
aU(a){var t,s,r=this,q=r.a.x,p=q.n(0,a)
if(p!=null)return r.r===0&&!r.f.p(0,p)
for(q=new A.ao(q,A.m(q).h("ao<1,2>")).gv(0),t=r.f;q.m();){s=q.d
if(s.b===a&&t.p(0,s.a))return!1}return!0},
b1(a,b){var t,s,r,q,p,o,n,m=this
u.J.a(b)
t=m.a
s=t.a
switch(t.f.a){case 0:case 1:return m.P(s,0,0,a.aS()?B.d:B.e)
case 2:m.ay=0
return m.P(s,0,0,B.e)
case 3:t=m.b.a
r=B.b.t(B.a.gS(t).length,2)
q=s.length
p=t.length-q
if(m.bg(p,r,B.e,q))return m.P(s,p,r,B.e)
return m.P(s,5,B.b.t(B.a.gS(t).length-q,2),B.d)
case 4:t=m.b.a
q=B.b.t(B.a.gS(t).length-s.length,2)
o=a.aS()?B.d:B.e
return m.P(s,t.length/2|0,q,o)
case 5:if(b.length===0)return!1
t=a.ao()
q=b.length
if(t<0.7){t=a.T(Math.min(q,12))
if(!(t>=0&&t<b.length))return A.b(b,t)
n=b[t]}else{t=a.T(q)
if(!(t>=0&&t<b.length))return A.b(b,t)
n=b[t]}if(!m.P(n.a,0,n.e,B.d))return!1
t=n.f
if(!m.a0(n.b,0,t,B.e,!0))return!1
q=n.r
if(!m.a0(n.c,0,q,B.e,!0))return!1
o=n.x
if(!m.a0(n.d,o,n.w,B.d,!0))return!1
m.Q=1
m.as=o-1
m.at=t+1
m.ax=q-1
if(!m.f.p(0,s)){if(!m.aU(s))return!1
if(!m.aT(s,a))return!1}return!0}},
bg(a,b,c,d){var t,s,r,q,p=this.b
if(p==null)return!0
for(t=c===B.d,s=c===B.e,r=0;r<d;++r){q=s?a+r:a
if(!p.aI(q,t?b+r:b))return!1}return!0},
aJ(a3,a4,a5,a6,a7){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c=a6===B.e?1:0,b=a6===B.d,a=b?1:0,a0=b?1:2,a1=a3.length,a2=d.c
if(a2.E(A.er(a4-c,a5-a)))return-1
if(a2.E(A.er(a4+c*a1,a5+a*a1)))return-1
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
bo(a,b,c,d){return this.aJ(a,b,c,d,!1)},
a0(a,b,c,d,e){if(this.aJ(a,b,c,d,!e&&this.e.length===0)<0)return!1
this.az(a,b,c,d)
return!0},
P(a,b,c,d){return this.a0(a,b,c,d,!1)},
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
m.z=Math.max(m.z,p)}B.a.k(m.e,new A.a7(a,b,c,d))
m.f.k(0,a)
if(m.a.x.E(a))++m.r},
aT(a8,a9){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6=this,a7=(a6.x-a6.w+1)*(a6.z-a6.y+1)
for(t=a6.c,t=new A.ao(t,A.m(t).h("ao<1,2>")).gv(0),s=a8.length,r=a6.b!=null,q=a6.a.f,p=q===B.n,q=q===B.j,o=null,n=null;t.m();){m=t.d
l=m.a
k=B.b.t(l,256)-64
j=B.b.C(l,256)-64
for(l=m.b,i=0;i<s;++i){if(a8.charCodeAt(i)!==l)continue
for(h=k-i,g=j-i,f=0;f<2;++f){e=B.V[f]
d=e===B.e
c=d?h:k
b=e===B.d
a=b?g:j
a0=a6.bo(a8,c,a,e)
if(a0<=0)continue
a1=d?c+s-1:c
a2=b?a+s-1:a
a3=Math.max(a6.x,a1)-Math.min(a6.w,c)+1
a4=Math.max(a6.z,a2)-Math.min(a6.y,a)+1
a5=a0*8-(a3*a4-a7)*0.55+a9.ao()*3
if(a3>a4+2)a5-=(a3-a4-2)*2
if(q)a5+=a6.bn(a8,c,a,e)*40
if(p&&b){d=a6.ay
d.toString
a5+=Math.min(d-a,a2-d)*1.5}if(r)a5+=(Math.max(0,a6.w-c)+Math.max(0,a1-a6.x)+(Math.max(0,a6.y-a)+Math.max(0,a2-a6.z)))*2
if(o==null||a5>o){n=new A.bs(c,a,e)
o=a5}}}}if(n==null)return!1
a6.az(a8,n.a,n.b,n.c)
return!0},
bn(a,b,c,d){var t,s,r,q,p,o,n,m,l,k=this.c
k=A.dz(new A.O(k,A.m(k).h("O<1>")),u.S)
for(t=a.length,s=d===B.d,r=d===B.e,q=0;q<t;++q){p=r?b+q:b
o=s?c+q:c
k.k(0,(p+64)*256+(o+64))}for(t=A.m(k).c,s=A.bn(k,k.r,t),r=s.$ti.c,n=1048576,m=-1048576;s.m();){p=s.d
p=B.b.C(p==null?r.a(p):p,256)-64
n=Math.min(n,p)
m=Math.max(m,p)}for(t=A.bn(k,k.r,t),s=n+m,r=t.$ti.c,l=0;t.m();){p=t.d
if(p==null)p=r.a(p)
if(k.p(0,(B.b.t(p,256)-64+64)*256+(s-(B.b.C(p,256)-64)+64)))++l}return l/k.a},
b2(){var t,s,r,q,p,o,n,m=this,l=m.x-m.w+1,k=m.z-m.y+1
switch(m.a.f.a){case 0:return!0
case 1:t=m.aW()
return t!=null&&t.gaR()>=0.85
case 2:s=m.e
r=A.B(s)
q=new A.T(s,r.h("z(1)").a(new A.cP()),r.h("T<1>")).gl(0)
for(s=m.c,s=new A.aq(s,s.r,s.e,A.m(s).h("aq<1>")),p=!1,o=!1;s.m();){r=B.b.C(s.d,256)-64
n=m.ay
n.toString
if(r<n)p=!0
if(r>n)o=!0}return q>=3&&p&&o
case 3:return l>=9&&k>=9
case 4:return l>=8&&k>=8
case 5:return!0}},
aW(){var t,s,r,q,p,o=this,n=o.b,m=n==null,l=m?o.w:0,k=m?o.y:0,j=m?null:B.a.gS(n.a).length
if(j==null)j=o.z-o.y+1
t=m?null:n.a.length
if(t==null)t=o.x-o.w+1
m=A.e([],u.D)
for(s=o.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.n)(s),++q){p=s[q]
m.push(new A.a7(p.a,p.b-l,p.c-k,p.d))}return A.ea(t,m,j)},
bs(a){var t,s,r,q,p,o,n,m,l,k=this
for(t=a.gap(),s=t.length,r=a.e,q=0,p=0;o=t.length,p<o;t.length===s||(0,A.n)(t),++p){o=r.n(0,t[p])
if((o==null?B.m:o).length>1)++q}n=k.x-k.w+1
m=k.z-k.y+1
l=k.e.length*6+q*4+o/(n*m)*30
if(n>m+1)l-=(n-m-1)*4
return k.a.f===B.j?l+a.gaR()*40:l}}
A.cP.prototype={
$1(a){return u.c.a(a).d===B.d},
$S:3}
A.S.prototype={}
A.dg.prototype={
$1(a){return A.v(a).length===3},
$S:0}
A.dh.prototype={
$1(a){return A.v(a).length>=6},
$S:0}
A.dj.prototype={
$1(a){return A.eW(a.c,B.u,this.a).length-this.b.e},
$S:16}
A.di.prototype={
$2(a,b){var t,s,r=u._
r.a(a)
r.a(b)
r=this.a
t=r.n(0,a)
t.toString
r=r.n(0,b)
r.toString
s=B.b.B(t,r)
return s!==0?s:B.b.B(b.d.length,a.d.length)},
$S:17}
A.dk.prototype={
$1(a){var t
A.v(a)
t=this.a
if(!B.c.ar(t,a))t=A.iz(t,a,0)
else t=!0
return t},
$S:0}
A.b5.prototype={}
A.cD.prototype={
b8(a,b){var t,s,r,q,p
for(t=this.a,s=t.length,r=this.b,q=0;q<t.length;t.length===s||(0,A.n)(t),++q){p=t[q]
r.j(0,p.a,p)}},
b5(a){var t,s,r,q,p,o,n,m,l,k,j=new Uint8Array(26)
for(t=a.length,s=0;s<t;++s){r=a.charCodeAt(s)-65
if(!(r>=0&&r<26))return A.b(j,r)
q=j[r]
if(!(r<26))return A.b(j,r)
j[r]=q+1}p=A.e([],u.s)
A:for(r=this.a,q=r.length,o=0;o<r.length;r.length===q||(0,A.n)(r),++o){n=r[o]
m=n.a
if(m.length>t)continue A
for(l=n.c,k=0;k<26;++k)if(l[k]>j[k])continue A
B.a.k(p,m)}return p},
bx(a,b){var t
u.C.a(b)
t=a.length
if(t<4||!B.c.aN(a,"S"))return!1
if(b.p(0,B.c.D(a,0,t-1)))return!0
if(B.c.aN(a,"ES")&&b.p(0,B.c.D(a,0,t-2)))return!0
return!1},
b6(a,b){var t,s
u.C.a(b)
if(!this.bx(a,b))return null
t=a.length
s=B.c.D(a,0,t-1)
if(b.p(0,s))return s
return B.c.D(a,0,t-2)}}
A.cm.prototype={}
A.dc.prototype={
$1(a){return A.hD(A.eG(a))},
$S:18}
A.dd.prototype={
$1(a){return A.hs(A.v(a))},
$S:5}
A.de.prototype={
$1(a){return A.i2(A.v(a))},
$S:5};(function aliases(){var t=J.af.prototype
t.b7=t.i})();(function installTearOffs(){var t=hunkHelpers._static_2,s=hunkHelpers._static_1
t(J,"hH","fE",19)
s(A,"i9","hu",1)
t(A,"e_","i5",4)})();(function inheritance(){var t=hunkHelpers.mixin,s=hunkHelpers.inherit,r=hunkHelpers.inheritMany
s(A.q,null)
r(A.q,[A.dt,J.bL,A.be,J.al,A.o,A.cL,A.c,A.as,A.bl,A.r,A.a_,A.aV,A.bm,A.ah,A.cM,A.cJ,A.aa,A.A,A.cF,A.aq,A.ar,A.ap,A.R,A.cc,A.ci,A.c7,A.cf,A.a9,A.p,A.bF,A.bH,A.cU,A.ac,A.am,A.cQ,A.c1,A.bf,A.cR,A.cw,A.at,A.bb,A.ai,A.cg,A.Q,A.a7,A.cp,A.cK,A.c5,A.Y,A.cn,A.cC,A.cB,A.L,A.cO,A.S,A.b5,A.cD,A.cm])
r(J.bL,[J.bN,J.b_,J.b1,J.b0,J.b2,J.aJ,J.ad])
r(J.b1,[J.af,J.l,A.aL,A.b9])
r(J.af,[J.c2,J.aw,J.ae])
s(J.bM,A.be)
s(J.cx,J.l)
r(J.aJ,[J.aZ,J.bO])
r(A.o,[A.bR,A.bi,A.bP,A.ca,A.c4,A.cb,A.b4,A.bB,A.a3,A.bj,A.c9,A.bg,A.bG])
r(A.c,[A.aY,A.T])
r(A.aY,[A.K,A.O,A.cG,A.ao])
r(A.K,[A.bh,A.b6,A.ce])
r(A.a_,[A.aP,A.aQ])
s(A.a0,A.aP)
s(A.bs,A.aQ)
s(A.N,A.aV)
r(A.ah,[A.aW,A.bt])
s(A.aI,A.aW)
s(A.bc,A.bi)
r(A.aa,[A.bD,A.bE,A.c8,A.d4,A.d6,A.cr,A.cs,A.ct,A.d9,A.da,A.d0,A.cP,A.dg,A.dh,A.dj,A.dk,A.dc,A.dd,A.de])
r(A.c8,[A.c6,A.aH])
r(A.A,[A.a5,A.cd])
s(A.b3,A.a5)
r(A.bE,[A.d5,A.cI,A.cV,A.cu,A.co,A.d8,A.d_,A.di])
r(A.b9,[A.bT,A.aM])
r(A.aM,[A.bo,A.bq])
s(A.bp,A.bo)
s(A.b7,A.bp)
s(A.br,A.bq)
s(A.b8,A.br)
r(A.b7,[A.bU,A.bV])
r(A.b8,[A.bW,A.bX,A.bY,A.bZ,A.c_,A.ba,A.c0])
s(A.bu,A.cb)
s(A.U,A.bt)
s(A.bQ,A.b4)
s(A.cy,A.bF)
r(A.bH,[A.cA,A.cz])
s(A.cT,A.cU)
s(A.cE,A.c7)
r(A.bD,[A.cv,A.cq])
r(A.a3,[A.aN,A.bK])
r(A.cQ,[A.ab,A.W,A.a4])
t(A.bo,A.p)
t(A.bp,A.r)
t(A.bq,A.p)
t(A.br,A.r)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{a:"int",k:"double",D:"num",f:"String",z:"bool",bb:"Null",h:"List",q:"Object",Z:"Map",t:"JSObject"},mangledNames:{},types:["z(f)","@(@)","~(q?,q?)","z(a7)","a(f,f)","f(f)","@(@,f)","@(f)","0&()","a()","a4(a)","z(a,a)","z(a)","a(Y,Y)","a(L,L)","a(L)","a(S)","a(S,S)","f(t)","a(@,@)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.a0&&a.b(c.a)&&b.b(c.b),"3;":(a,b,c)=>d=>d instanceof A.bs&&a.b(d.a)&&b.b(d.b)&&c.b(d.c)}}
A.hi(v.typeUniverse,JSON.parse('{"c2":"af","aw":"af","ae":"af","iI":"aL","bN":{"z":[],"j":[]},"b_":{"j":[]},"b1":{"t":[]},"af":{"t":[]},"l":{"h":["1"],"t":[],"c":["1"]},"bM":{"be":[]},"cx":{"l":["1"],"h":["1"],"t":[],"c":["1"]},"al":{"C":["1"]},"aJ":{"k":[],"D":[],"E":["D"]},"aZ":{"k":[],"a":[],"D":[],"E":["D"],"j":[]},"bO":{"k":[],"D":[],"E":["D"],"j":[]},"ad":{"f":[],"E":["f"],"ei":[],"j":[]},"bR":{"o":[]},"aY":{"c":["1"]},"K":{"c":["1"]},"bh":{"K":["1"],"c":["1"],"K.E":"1","c.E":"1"},"as":{"C":["1"]},"b6":{"K":["2"],"c":["2"],"K.E":"2","c.E":"2"},"T":{"c":["1"],"c.E":"1"},"bl":{"C":["1"]},"a0":{"aP":[],"a_":[]},"bs":{"aQ":[],"a_":[]},"aV":{"Z":["1","2"]},"bm":{"C":["1"]},"N":{"aV":["1","2"],"Z":["1","2"]},"aW":{"ah":["1"],"aO":["1"],"c":["1"]},"aI":{"aW":["1"],"ah":["1"],"aO":["1"],"c":["1"]},"bc":{"o":[]},"bP":{"o":[]},"ca":{"o":[]},"aa":{"an":[]},"bD":{"an":[]},"bE":{"an":[]},"c8":{"an":[]},"c6":{"an":[]},"aH":{"an":[]},"c4":{"o":[]},"a5":{"A":["1","2"],"dv":["1","2"],"Z":["1","2"],"A.K":"1","A.V":"2"},"O":{"c":["1"],"c.E":"1"},"aq":{"C":["1"]},"cG":{"c":["1"],"c.E":"1"},"ar":{"C":["1"]},"ao":{"c":["at<1,2>"],"c.E":"at<1,2>"},"ap":{"C":["at<1,2>"]},"b3":{"a5":["1","2"],"A":["1","2"],"dv":["1","2"],"Z":["1","2"],"A.K":"1","A.V":"2"},"aP":{"a_":[]},"aQ":{"a_":[]},"aL":{"t":[],"j":[]},"b9":{"t":[]},"bT":{"t":[],"j":[]},"aM":{"F":["1"],"t":[]},"b7":{"p":["k"],"h":["k"],"F":["k"],"t":[],"c":["k"],"r":["k"]},"b8":{"p":["a"],"h":["a"],"F":["a"],"t":[],"c":["a"],"r":["a"]},"bU":{"p":["k"],"h":["k"],"F":["k"],"t":[],"c":["k"],"r":["k"],"j":[],"p.E":"k","r.E":"k"},"bV":{"p":["k"],"h":["k"],"F":["k"],"t":[],"c":["k"],"r":["k"],"j":[],"p.E":"k","r.E":"k"},"bW":{"p":["a"],"h":["a"],"F":["a"],"t":[],"c":["a"],"r":["a"],"j":[],"p.E":"a","r.E":"a"},"bX":{"p":["a"],"h":["a"],"F":["a"],"t":[],"c":["a"],"r":["a"],"j":[],"p.E":"a","r.E":"a"},"bY":{"p":["a"],"h":["a"],"F":["a"],"t":[],"c":["a"],"r":["a"],"j":[],"p.E":"a","r.E":"a"},"bZ":{"p":["a"],"h":["a"],"F":["a"],"t":[],"c":["a"],"r":["a"],"j":[],"p.E":"a","r.E":"a"},"c_":{"p":["a"],"h":["a"],"F":["a"],"t":[],"c":["a"],"r":["a"],"j":[],"p.E":"a","r.E":"a"},"ba":{"p":["a"],"h":["a"],"F":["a"],"t":[],"c":["a"],"r":["a"],"j":[],"p.E":"a","r.E":"a"},"c0":{"dH":[],"p":["a"],"h":["a"],"F":["a"],"t":[],"c":["a"],"r":["a"],"j":[],"p.E":"a","r.E":"a"},"cb":{"o":[]},"bu":{"o":[]},"U":{"ah":["1"],"eh":["1"],"aO":["1"],"c":["1"]},"a9":{"C":["1"]},"A":{"Z":["1","2"]},"ah":{"aO":["1"],"c":["1"]},"bt":{"ah":["1"],"aO":["1"],"c":["1"]},"cd":{"A":["f","@"],"Z":["f","@"],"A.K":"f","A.V":"@"},"ce":{"K":["f"],"c":["f"],"K.E":"f","c.E":"f"},"b4":{"o":[]},"bQ":{"o":[]},"ac":{"E":["ac"]},"k":{"D":[],"E":["D"]},"am":{"E":["am"]},"a":{"D":[],"E":["D"]},"h":{"c":["1"]},"D":{"E":["D"]},"aO":{"c":["1"]},"f":{"E":["f"],"ei":[]},"bB":{"o":[]},"bi":{"o":[]},"a3":{"o":[]},"aN":{"o":[]},"bK":{"o":[]},"bj":{"o":[]},"c9":{"o":[]},"bg":{"o":[]},"bG":{"o":[]},"c1":{"o":[]},"bf":{"o":[]},"ai":{"fY":[]},"cg":{"fU":[]},"fz":{"h":["a"],"c":["a"]},"dH":{"h":["a"],"c":["a"]},"h1":{"h":["a"],"c":["a"]},"fx":{"h":["a"],"c":["a"]},"h_":{"h":["a"],"c":["a"]},"fy":{"h":["a"],"c":["a"]},"h0":{"h":["a"],"c":["a"]},"fv":{"h":["k"],"c":["k"]},"fw":{"h":["k"],"c":["k"]}}'))
A.hh(v.typeUniverse,JSON.parse('{"aY":1,"aM":1,"c7":2,"bt":1,"bF":2,"bH":2}'))
var u=(function rtii(){var t=A.aT
return{I:t("W"),R:t("ab"),V:t("E<@>"),M:t("aI<f>"),k:t("ac"),O:t("Y"),d:t("am"),e:t("o"),Z:t("an"),W:t("N<a,k>"),h:t("c<@>"),F:t("l<W>"),B:t("l<Y>"),l:t("l<b5>"),f:t("l<q>"),D:t("l<a7>"),s:t("l<f>"),Y:t("l<S>"),U:t("l<L>"),b:t("l<@>"),t:t("l<a>"),T:t("b_"),m:t("t"),L:t("ae"),p:t("F<@>"),q:t("b5"),u:t("h<Y>"),r:t("h<f>"),J:t("h<L>"),j:t("h<@>"),v:t("h<a>"),a:t("Z<f,@>"),G:t("Z<@,@>"),P:t("bb"),K:t("q"),w:t("iJ"),x:t("+()"),C:t("aO<f>"),c:t("a7"),N:t("f"),A:t("j"),o:t("aw"),_:t("S"),E:t("T<f>"),Q:t("L"),y:t("z"),au:t("z(f)"),i:t("k"),S:t("a"),bc:t("ec<bb>?"),z:t("t?"),aL:t("h<@>?"),X:t("q?"),aD:t("f?"),g:t("cf?"),cG:t("z?"),dd:t("k?"),a3:t("a?"),n:t("D?"),H:t("D"),cQ:t("~(f,@)")}})();(function constants(){var t=hunkHelpers.makeConstList
B.J=J.bL.prototype
B.a=J.l.prototype
B.b=J.aZ.prototype
B.t=J.aJ.prototype
B.c=J.ad.prototype
B.K=J.ae.prototype
B.L=J.b1.prototype
B.A=J.c2.prototype
B.v=J.aw.prototype
B.h=new A.W(0,"free")
B.j=new A.W(1,"mirror")
B.n=new A.W(2,"spine")
B.o=new A.W(3,"leaf")
B.p=new A.W(4,"plus")
B.q=new A.W(5,"ring")
B.x=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.C=function() {
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
B.H=function(getTagFallback) {
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
B.D=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.G=function(hooks) {
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
B.F=function(hooks) {
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
B.E=function(hooks) {
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
B.w=function(hooks) { return hooks; }

B.f=new A.cy()
B.y=new A.cE()
B.I=new A.c1()
B.k=new A.cL()
B.i=new A.ab(1,"common")
B.d=new A.a4("A",0,"across")
B.e=new A.a4("D",1,"down")
B.M=new A.cz(null)
B.N=new A.cA(null)
B.P=t([B.j,B.n,B.o,B.p,B.q],u.F)
B.Q=t(["dict.txt","dict_blocked.txt","dict_bonus_only.txt","stoplist.txt","allowlist.txt"],u.s)
B.z=t([B.h,B.j,B.n,B.o,B.p,B.q],u.F)
B.U=t([],u.B)
B.R=t([],u.s)
B.T=t([],u.Y)
B.S=t([],u.U)
B.m=t([],u.t)
B.V=t([B.d,B.e],A.aT("l<a4>"))
B.r=new A.ab(0,"veryCommon")
B.l=new A.ab(2,"someLessCommon")
B.W=t([B.r,B.i,B.l],A.aT("l<ab>"))
B.a5=new A.Q("Easy",5,3,5,6,B.r,2,0,4,8,B.h)
B.a8=new A.Q("Easy",6,3,6,7,B.i,2,0,6,9,B.h)
B.aa=new A.Q("Medium",6,3,7,8,B.i,2,0,6,9,B.h)
B.a4=new A.Q("Medium-hard",7,3,8,9,B.l,2,2,22,10,B.h)
B.a7=new A.Q("Hard",7,3,10,11,B.l,2,3,25,10,B.h)
B.a6=new A.Q("Fun board",6,3,8,9,B.i,2,0,6,11,B.h)
B.a9=new A.Q("Toughest",7,3,12,13,B.l,2,4,28,11,B.h)
B.Y=new A.N([1,B.a5,2,B.a8,3,B.aa,4,B.a4,5,B.a7,6,B.a6,7,B.a9],A.aT("N<a,Q>"))
B.a_=new A.N([3,0.16,4,0.35,5,0.26,6,0.18,7,0.12],u.W)
B.a0=new A.N([3,0.22,4,0.55,5,0.4,6,0.28,7,0.18],u.W)
B.Z=new A.N([3,0.26,4,0.65,5,0.5,6,0.36,7,0.24],u.W)
B.a1=new A.N([B.r,B.a_,B.i,B.a0,B.l,B.Z],A.aT("N<ab,Z<a,k>>"))
B.a3={}
B.u=new A.aI(B.a3,0,u.M)
B.a2={INUK:0}
B.B=new A.aI(B.a2,1,u.M)
B.O=t(["....###....","....###....","....###....","....###....","###########","###########","###########","....###....","....###....","....###....","....###...."],u.s)
B.ab=new A.c5(B.O)
B.X=t(["......#......",".....###.....","..#..###..#..","..##.###.##..","#.#########.#","#############",".###########.","..#########..",".###########.","####..#..####","......#......","......#......","......#......"],u.s)
B.ac=new A.c5(B.X)
B.ad=A.V("iE")
B.ae=A.V("iF")
B.af=A.V("fv")
B.ag=A.V("fw")
B.ah=A.V("fx")
B.ai=A.V("fy")
B.aj=A.V("fz")
B.ak=A.V("q")
B.al=A.V("h_")
B.am=A.V("h0")
B.an=A.V("h1")
B.ao=A.V("dH")})();(function staticFields(){$.cS=null
$.H=A.e([],u.f)
$.ej=null
$.e7=null
$.e6=null
$.eY=null
$.eT=null
$.f1=null
$.d2=null
$.d7=null
$.dW=null
$.cW=A.e([],A.aT("l<h<q>?>"))
$.dl=function(){var t=u.N
return A.a6(t,t)}()
$.dR=null
$.eS=B.u})();(function lazyInitializers(){var t=hunkHelpers.lazyFinal
t($,"iH","f4",()=>A.d3("_$dart_dartClosure"))
t($,"iG","e1",()=>A.d3("_$dart_dartClosure_dartJSInterop"))
t($,"iV","ff",()=>A.e([new J.bM()],A.aT("l<be>")))
t($,"iK","f5",()=>A.a8(A.cN({
toString:function(){return"$receiver$"}})))
t($,"iL","f6",()=>A.a8(A.cN({$method$:null,
toString:function(){return"$receiver$"}})))
t($,"iM","f7",()=>A.a8(A.cN(null)))
t($,"iN","f8",()=>A.a8(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(s){return s.message}}()))
t($,"iQ","fb",()=>A.a8(A.cN(void 0)))
t($,"iR","fc",()=>A.a8(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(s){return s.message}}()))
t($,"iP","fa",()=>A.a8(A.ep(null)))
t($,"iO","f9",()=>A.a8(function(){try{null.$method$}catch(s){return s.message}}()))
t($,"iT","fe",()=>A.a8(A.ep(void 0)))
t($,"iS","fd",()=>A.a8(function(){try{(void 0).$method$}catch(s){return s.message}}()))
t($,"iU","dm",()=>A.dZ(B.ak))
t($,"iW","dn",()=>A.fs(2026,11,3))})();(function nativeSupport(){!function(){var t=function(a){var n={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.aL,SharedArrayBuffer:A.aL,ArrayBufferView:A.b9,DataView:A.bT,Float32Array:A.bU,Float64Array:A.bV,Int16Array:A.bW,Int32Array:A.bX,Int8Array:A.bY,Uint16Array:A.bZ,Uint32Array:A.c_,Uint8ClampedArray:A.ba,CanvasPixelArray:A.ba,Uint8Array:A.c0})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.aM.$nativeSuperclassTag="ArrayBufferView"
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
var t=A.it
if(typeof dartMainRunner==="function"){dartMainRunner(t,[])}else{t([])}})})()