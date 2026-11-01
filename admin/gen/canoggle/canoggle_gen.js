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
if(a[b]!==t){A.iQ(b)}a[b]=s}var r=a[b]
a[c]=function(){return r}
return r}}function makeConstList(a,b){if(b!=null)A.f(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var t=0;t<a.length;++t){convertToFastObject(a[t])}}var y=0
function instanceTearOffGetter(a,b){var t=null
return a?function(c){if(t===null)t=A.dU(b)
return new t(c,this)}:function(){if(t===null)t=A.dU(b)
return new t(this,null)}}function staticTearOffGetter(a){var t=null
return function(){if(t===null)t=A.dU(a).prototype
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
e_(a,b,c,d){return{i:a,p:b,e:c,x:d}},
dW(a){var t,s,r,q,p,o="_$dart_js",n=a[v.dispatchPropertyName]
if(n==null)if($.dY==null){A.iG()
n=a[v.dispatchPropertyName]}if(n!=null){t=n.p
if(!1===t)return n.i
if(!0===t)return a
s=Object.getPrototypeOf(a)
if(t===s)return n.i
if(n.e===s)throw A.e(A.es("Return interceptor for "+A.i(t(a,n))))}r=a.constructor
if(r==null)q=null
else{p=$.cZ
if(p==null)p=$.cZ=A.dj(o)
q=r[p]}if(q!=null)return q
q=A.iL(a)
if(q!=null)return q
if(typeof a=="function")return B.O
t=Object.getPrototypeOf(a)
if(t==null)return B.o
if(t===Object.prototype)return B.o
if(typeof r=="function"){p=$.cZ
if(p==null)p=$.cZ=A.dj(o)
Object.defineProperty(r,p,{value:B.i,enumerable:false,writable:true,configurable:true})
return B.i}return B.i},
fO(a,b){if(a<0||a>4294967295)throw A.e(A.aR(a,0,4294967295,"length",null))
return J.fP(new Array(a),b)},
fP(a,b){var t=A.f(a,b.h("q<0>"))
t.$flags=1
return t},
fQ(a,b){var t=u.U
return J.fq(t.a(a),t.a(b))},
ed(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
fR(a,b){var t,s
for(t=a.length;b<t;){s=a.charCodeAt(b)
if(s!==32&&s!==13&&!J.ed(s))break;++b}return b},
fS(a,b){var t,s,r
for(t=a.length;b>0;b=s){s=b-1
if(!(s<t))return A.a(a,s)
r=a.charCodeAt(s)
if(r!==32&&r!==13&&!J.ed(r))break}return b},
aF(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.b5.prototype
return J.bV.prototype}if(typeof a=="string")return J.af.prototype
if(a==null)return J.b6.prototype
if(typeof a=="boolean")return J.bU.prototype
if(Array.isArray(a))return J.q.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ag.prototype
if(typeof a=="symbol")return J.b9.prototype
if(typeof a=="bigint")return J.b7.prototype
return a}if(a instanceof A.n)return a
return J.dW(a)},
bF(a){if(typeof a=="string")return J.af.prototype
if(a==null)return a
if(Array.isArray(a))return J.q.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ag.prototype
if(typeof a=="symbol")return J.b9.prototype
if(typeof a=="bigint")return J.b7.prototype
return a}if(a instanceof A.n)return a
return J.dW(a)},
aX(a){if(a==null)return a
if(Array.isArray(a))return J.q.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ag.prototype
if(typeof a=="symbol")return J.b9.prototype
if(typeof a=="bigint")return J.b7.prototype
return a}if(a instanceof A.n)return a
return J.dW(a)},
iB(a){if(typeof a=="number")return J.aL.prototype
if(typeof a=="string")return J.af.prototype
if(a==null)return a
if(!(a instanceof A.n))return J.aA.prototype
return a},
iC(a){if(typeof a=="string")return J.af.prototype
if(a==null)return a
if(!(a instanceof A.n))return J.aA.prototype
return a},
ab(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.aF(a).J(a,b)},
G(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.iK(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.bF(a).q(a,b)},
dA(a,b){return J.aX(a).i(a,b)},
fq(a,b){return J.iB(a).B(a,b)},
fr(a,b){return J.aX(a).E(a,b)},
P(a){return J.aF(a).gu(a)},
fs(a){return J.bF(a).gG(a)},
ft(a){return J.bF(a).gP(a)},
b_(a){return J.aX(a).gt(a)},
ao(a){return J.bF(a).gm(a)},
fu(a){return J.aF(a).gv(a)},
e3(a,b){return J.aX(a).T(a,b)},
fv(a,b){return J.iC(a).a_(a,b)},
ap(a){return J.aF(a).k(a)},
e4(a,b){return J.aX(a).X(a,b)},
bS:function bS(){},
bU:function bU(){},
b6:function b6(){},
b8:function b8(){},
ah:function ah(){},
c8:function c8(){},
aA:function aA(){},
ag:function ag(){},
b7:function b7(){},
b9:function b9(){},
q:function q(a){this.$ti=a},
bT:function bT(){},
cy:function cy(a){this.$ti=a},
aq:function aq(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aL:function aL(){},
b5:function b5(){},
bV:function bV(){},
af:function af(){}},A={dD:function dD(){},
ef(a){return new A.bY("Field '"+a+"' has been assigned during initialization.")},
ak(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
dJ(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
dZ(a){var t,s
for(t=$.O.length,s=0;s<t;++s)if(a===$.O[s])return!0
return!1},
hb(a,b,c){A.en(b,"takeCount")
return new A.b4(a,b,c.h("b4<0>"))},
cx(){return new A.bp("No element")},
bY:function bY(a){this.a=a},
cT:function cT(){},
b3:function b3(){},
a_:function a_(){},
au:function au(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
av:function av(a,b,c){this.a=a
this.b=b
this.$ti=c},
as:function as(a,b,c){this.a=a
this.b=b
this.$ti=c},
be:function be(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
aw:function aw(a,b,c){this.a=a
this.b=b
this.$ti=c},
v:function v(a,b,c){this.a=a
this.b=b
this.$ti=c},
aC:function aC(a,b,c){this.a=a
this.b=b
this.$ti=c},
bq:function bq(a,b,c){this.a=a
this.b=b
this.$ti=c},
b4:function b4(a,b,c){this.a=a
this.b=b
this.$ti=c},
br:function br(a,b,c){this.a=a
this.b=b
this.$ti=c},
r:function r(){},
fF(){throw A.e(A.aB("Cannot modify constant Set"))},
fd(a){var t=A.fc(a)
if(t!=null)return t
return"minified:"+a},
iK(a,b){var t
if(b!=null){t=b.x
if(t!=null)return t}return u.D.b(a)},
i(a){var t
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
t=J.ap(a)
return t},
bl(a){var t,s=$.ej
if(s==null)s=$.ej=Symbol("identityHashCode")
t=a[s]
if(t==null){t=Math.random()*0x3fffffff|0
a[s]=t}return t},
cI(a,b){var t,s,r,q,p,o=null,n=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(n==null)return o
if(3>=n.length)return A.a(n,3)
t=n[3]
if(b==null){if(t!=null)return parseInt(a,10)
if(n[2]!=null)return parseInt(a,16)
return o}if(b<2||b>36)throw A.e(A.aR(b,2,36,"radix",o))
if(b===10&&t!=null)return parseInt(a,10)
if(b<10||t==null){s=b<=10?47+b:86+b
r=n[1]
for(q=r.length,p=0;p<q;++p)if((r.charCodeAt(p)|32)>s)return o}return parseInt(a,b)},
c9(a){var t,s,r,q
if(a instanceof A.n)return A.I(A.aa(a),null)
t=J.aF(a)
if(t===B.N||t===B.P||u.o.b(a)){s=B.k(a)
if(s!=="Object"&&s!=="")return s
r=a.constructor
if(typeof r=="function"){q=r.name
if(typeof q=="string"&&q!=="Object"&&q!=="")return q}}return A.I(A.aa(a),null)},
el(a){var t,s,r
if(a==null||typeof a=="number"||A.dR(a))return J.ap(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.H)return a.k(0)
if(a instanceof A.al)return a.aq(!0)
t=$.fp()
for(s=0;s<1;++s){r=t[s].bm(a)
if(r!=null)return r}return"Instance of '"+A.c9(a)+"'"},
D(a){var t
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){t=a-65536
return String.fromCharCode((B.b.a9(t,10)|55296)>>>0,t&1023|56320)}throw A.e(A.aR(a,0,1114111,null,null))},
h3(a,b,c,d,e,f,g,h,i){var t,s,r,q=b-1
if(a<100){a+=400
q-=4800}t=B.b.K(h,1000)
s=Date.UTC(a,q,c,d,e,f,g+B.b.A(h-t,1000))
r=!0
if(!isNaN(s))if(!(s<-864e13))if(!(s>864e13))r=s===864e13&&t!==0
if(r)return null
return s},
ax(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
h2(a){var t=A.ax(a).getUTCFullYear()+0
return t},
h0(a){var t=A.ax(a).getUTCMonth()+1
return t},
fX(a){var t=A.ax(a).getUTCDate()+0
return t},
fY(a){var t=A.ax(a).getUTCHours()+0
return t},
h_(a){var t=A.ax(a).getUTCMinutes()+0
return t},
h1(a){var t=A.ax(a).getUTCSeconds()+0
return t},
fZ(a){var t=A.ax(a).getUTCMilliseconds()+0
return t},
ek(a){var t=A.ax(a).getUTCDay()+0
return B.b.K(t+6,7)+1},
a(a,b){if(a==null)J.ao(a)
throw A.e(A.df(a,b))},
df(a,b){var t,s="index"
if(!A.dS(b))return new A.a2(!0,b,s,null)
t=J.ao(a)
if(b<0||b>=t)return A.ec(b,t,a,s)
return new A.aQ(null,null,!0,b,s,"Value not in range")},
ig(a){return new A.a2(!0,a,null,null)},
e(a){return A.C(a,new Error())},
C(a,b){var t
if(a==null)a=new A.bs()
b.dartException=a
t=A.iR
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:t})
b.name=""}else b.toString=t
return b},
iR(){return J.ap(this.dartException)},
aI(a,b){throw A.C(a,b==null?new Error():b)},
aZ(a,b,c){var t
if(b==null)b=0
if(c==null)c=0
t=Error()
A.aI(A.hK(a,b,c),t)},
hK(a,b,c){var t,s,r,q,p,o,n,m,l
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
return new A.bt("'"+t+"': Cannot "+p+" "+m+l+o)},
z(a){throw A.e(A.K(a))},
a8(a){var t,s,r,q,p,o
a=A.iO(a.replace(String({}),"$receiver$"))
t=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(t==null)t=A.f([],u.s)
s=t.indexOf("\\$arguments\\$")
r=t.indexOf("\\$argumentsExpr\\$")
q=t.indexOf("\\$expr\\$")
p=t.indexOf("\\$method\\$")
o=t.indexOf("\\$receiver\\$")
return new A.cV(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),s,r,q,p,o)},
cW(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(t){return t.message}}(a)},
er(a){return function($expr$){try{$expr$.$method$}catch(t){return t.message}}(a)},
dE(a,b){var t=b==null,s=t?null:b.method
return new A.bW(a,s,t?null:b.receiver)},
co(a){if(a==null)return new A.cH(a)
if(typeof a!=="object")return a
if("dartException" in a)return A.aH(a,a.dartException)
return A.id(a)},
aH(a,b){if(u.C.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
id(a){var t,s,r,q,p,o,n,m,l,k,j,i,h
if(!("message" in a))return a
t=a.message
if("number" in a&&typeof a.number=="number"){s=a.number
r=s&65535
if((B.b.a9(s,16)&8191)===10)switch(r){case 438:return A.aH(a,A.dE(A.i(t)+" (Error "+r+")",null))
case 445:case 5007:A.i(t)
return A.aH(a,new A.bk())}}if(a instanceof TypeError){q=$.ff()
p=$.fg()
o=$.fh()
n=$.fi()
m=$.fl()
l=$.fm()
k=$.fk()
$.fj()
j=$.fo()
i=$.fn()
h=q.I(t)
if(h!=null)return A.aH(a,A.dE(A.u(t),h))
else{h=p.I(t)
if(h!=null){h.method="call"
return A.aH(a,A.dE(A.u(t),h))}else if(o.I(t)!=null||n.I(t)!=null||m.I(t)!=null||l.I(t)!=null||k.I(t)!=null||n.I(t)!=null||j.I(t)!=null||i.I(t)!=null){A.u(t)
return A.aH(a,new A.bk())}}return A.aH(a,new A.cf(typeof t=="string"?t:""))}if(a instanceof RangeError){if(typeof t=="string"&&t.indexOf("call stack")!==-1)return new A.bo()
t=function(b){try{return String(b)}catch(g){}return null}(a)
return A.aH(a,new A.a2(!1,null,null,typeof t=="string"?t.replace(/^RangeError:\s*/,""):t))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof t=="string"&&t==="too much recursion")return new A.bo()
return a},
e0(a){if(a==null)return J.P(a)
if(typeof a=="object")return A.bl(a)
return J.P(a)},
iq(a){if(typeof a=="number")return B.h.gu(a)
if(a instanceof A.cm)return A.bl(a)
if(a instanceof A.al)return a.gu(a)
return A.e0(a)},
f0(a,b){var t,s,r,q=a.length
for(t=0;t<q;t=r){s=t+1
r=s+1
b.j(0,a[t],a[s])}return b},
ix(a,b){var t,s=a.length
for(t=0;t<s;++t)b.i(0,a[t])
return b},
hU(a,b,c,d,e,f){u.Z.a(a)
switch(A.N(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.e(new A.cY("Unsupported number of arguments for wrapped closure"))},
ir(a,b){var t=a.$identity
if(!!t)return t
t=A.is(a,b)
a.$identity=t
return t},
is(a,b){var t
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.hU)},
fE(a1){var t,s,r,q,p,o,n,m,l,k,j=a1.co,i=a1.iS,h=a1.iI,g=a1.nDA,f=a1.aI,e=a1.fs,d=a1.cs,c=e[0],b=d[0],a=j[c],a0=a1.fT
a0.toString
t=i?Object.create(new A.cb().constructor.prototype):Object.create(new A.aK(null,null).constructor.prototype)
t.$initialize=t.constructor
s=i?function static_tear_off(){this.$initialize()}:function tear_off(a2,a3){this.$initialize(a2,a3)}
t.constructor=s
s.prototype=t
t.$_name=c
t.$_target=a
r=!i
if(r)q=A.e9(c,a,h,g)
else{t.$static_name=c
q=a}t.$S=A.fA(a0,i,h)
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
fA(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.e("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.fx)}throw A.e("Error in functionType of tearoff")},
fB(a,b,c,d){var t=A.e8
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,t)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,t)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,t)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,t)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,t)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,t)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,t)}},
e9(a,b,c,d){if(c)return A.fD(a,b,d)
return A.fB(b.length,d,a,b)},
fC(a,b,c,d){var t=A.e8,s=A.fy
switch(b?-1:a){case 0:throw A.e(new A.ca("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,s,t)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,s,t)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,s,t)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,s,t)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,s,t)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,s,t)
default:return function(e,f,g){return function(){var r=[g(this)]
Array.prototype.push.apply(r,arguments)
return e.apply(f(this),r)}}(d,s,t)}},
fD(a,b,c){var t,s
if($.e6==null)$.e6=A.e5("interceptor")
if($.e7==null)$.e7=A.e5("receiver")
t=b.length
s=A.fC(t,c,a,b)
return s},
dU(a){return A.fE(a)},
fx(a,b){return A.bE(v.typeUniverse,A.aa(a.a),b)},
e8(a){return a.a},
fy(a){return a.b},
e5(a){var t,s,r,q=new A.aK("receiver","interceptor"),p=Object.getOwnPropertyNames(q)
p.$flags=1
t=p
for(p=t.length,s=0;s<p;++s){r=t[s]
if(q[r]===a)return r}throw A.e(A.dB("Field name "+a+" not found."))},
dj(a){return v.getIsolateTag(a)},
iL(a){var t,s,r,q,p,o=A.u($.f2.$1(a)),n=$.dg[o]
if(n!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}t=$.dn[o]
if(t!=null)return t
s=v.interceptorsByTag[o]
if(s==null){r=A.dO($.eZ.$2(a,o))
if(r!=null){n=$.dg[r]
if(n!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}t=$.dn[r]
if(t!=null)return t
s=v.interceptorsByTag[r]
o=r}}if(s==null)return null
t=s.prototype
q=o[0]
if(q==="!"){n=A.ds(t)
$.dg[o]=n
Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}if(q==="~"){$.dn[o]=t
return t}if(q==="-"){p=A.ds(t)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:p,enumerable:false,writable:true,configurable:true})
return p.i}if(q==="+")return A.f7(a,t)
if(q==="*")throw A.e(A.es(o))
if(v.leafTags[o]===true){p=A.ds(t)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:p,enumerable:false,writable:true,configurable:true})
return p.i}else return A.f7(a,t)},
f7(a,b){var t=Object.getPrototypeOf(a)
Object.defineProperty(t,v.dispatchPropertyName,{value:J.e_(b,t,null,null),enumerable:false,writable:true,configurable:true})
return b},
ds(a){return J.e_(a,!1,null,!!a.$iL)},
iN(a,b,c){var t=b.prototype
if(v.leafTags[a]===true)return A.ds(t)
else return J.e_(t,c,null,null)},
iG(){if(!0===$.dY)return
$.dY=!0
A.iH()},
iH(){var t,s,r,q,p,o,n,m
$.dg=Object.create(null)
$.dn=Object.create(null)
A.iF()
t=v.interceptorsByTag
s=Object.getOwnPropertyNames(t)
if(typeof window!="undefined"){window
r=function(){}
for(q=0;q<s.length;++q){p=s[q]
o=$.f9.$1(p)
if(o!=null){n=A.iN(p,t[p],o)
if(n!=null){Object.defineProperty(o,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
r.prototype=o}}}}for(q=0;q<s.length;++q){p=s[q]
if(/^[A-Za-z_]/.test(p)){m=t[p]
t["!"+p]=m
t["~"+p]=m
t["-"+p]=m
t["+"+p]=m
t["*"+p]=m}}},
iF(){var t,s,r,q,p,o,n=B.G()
n=A.aW(B.H,A.aW(B.I,A.aW(B.j,A.aW(B.j,A.aW(B.J,A.aW(B.K,A.aW(B.L(B.k),n)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){t=dartNativeDispatchHooksTransformer
if(typeof t=="function")t=[t]
if(Array.isArray(t))for(s=0;s<t.length;++s){r=t[s]
if(typeof r=="function")n=r(n)||n}}q=n.getTag
p=n.getUnknownTag
o=n.prototypeForTag
$.f2=new A.dk(q)
$.eZ=new A.dl(p)
$.f9=new A.dm(o)},
aW(a,b){return a(b)||b},
iu(a,b){var t=b.length,s=v.rttc[""+t+";"+a]
if(s==null)return null
if(t===0)return s
if(t===s.length)return s.apply(null,b)
return s(b)},
iP(a,b,c){var t=a.indexOf(b,c)
return t>=0},
iO(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
bz:function bz(a,b){this.a=a
this.b=b},
b0:function b0(){},
bu:function bu(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
at:function at(a,b){this.a=a
this.$ti=b},
b1:function b1(){},
b2:function b2(a,b,c){this.a=a
this.b=b
this.$ti=c},
bR:function bR(){},
ae:function ae(a,b){this.a=a
this.$ti=b},
bn:function bn(){},
cV:function cV(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bk:function bk(){},
bW:function bW(a,b,c){this.a=a
this.b=b
this.c=c},
cf:function cf(a){this.a=a},
cH:function cH(a){this.a=a},
H:function H(){},
bJ:function bJ(){},
bK:function bK(){},
cd:function cd(){},
cb:function cb(){},
aK:function aK(a,b){this.a=a
this.b=b},
ca:function ca(a){this.a=a},
a4:function a4(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
cD:function cD(a,b){this.a=a
this.b=b
this.c=null},
a6:function a6(a,b){this.a=a
this.$ti=b},
bd:function bd(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
cE:function cE(a,b){this.a=a
this.$ti=b},
S:function S(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
a5:function a5(a,b){this.a=a
this.$ti=b},
bc:function bc(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
ba:function ba(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
dk:function dk(a){this.a=a},
dl:function dl(a){this.a=a},
dm:function dm(a){this.a=a},
al:function al(){},
aS:function aS(){},
eO(a,b,c){if(a>>>0!==a||a>=c)throw A.e(A.df(b,a))},
aO:function aO(){},
bh:function bh(){},
bZ:function bZ(){},
aP:function aP(){},
bf:function bf(){},
bg:function bg(){},
c_:function c_(){},
c0:function c0(){},
c1:function c1(){},
c2:function c2(){},
c3:function c3(){},
c4:function c4(){},
c5:function c5(){},
bi:function bi(){},
c6:function c6(){},
bv:function bv(){},
bw:function bw(){},
bx:function bx(){},
by:function by(){},
dI(a,b){var t=b.c
return t==null?b.c=A.bC(a,"eb",[b.x]):t},
eo(a){var t=a.w
if(t===6||t===7)return A.eo(a.x)
return t===11||t===12},
h9(a){return a.as},
a1(a){return A.d4(v.typeUniverse,a,!1)},
iJ(a,b){var t,s,r,q,p
if(a==null)return null
t=b.y
s=a.Q
if(s==null)s=a.Q=new Map()
r=b.as
q=s.get(r)
if(q!=null)return q
p=A.an(v.typeUniverse,a.x,t,0)
s.set(r,p)
return p},
an(a0,a1,a2,a3){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=a1.w
switch(a){case 5:case 1:case 2:case 3:case 4:return a1
case 6:t=a1.x
s=A.an(a0,t,a2,a3)
if(s===t)return a1
return A.eC(a0,s,!0)
case 7:t=a1.x
s=A.an(a0,t,a2,a3)
if(s===t)return a1
return A.eB(a0,s,!0)
case 8:r=a1.y
q=A.aV(a0,r,a2,a3)
if(q===r)return a1
return A.bC(a0,a1.x,q)
case 9:p=a1.x
o=A.an(a0,p,a2,a3)
n=a1.y
m=A.aV(a0,n,a2,a3)
if(o===p&&m===n)return a1
return A.dM(a0,o,m)
case 10:l=a1.x
k=a1.y
j=A.aV(a0,k,a2,a3)
if(j===k)return a1
return A.eD(a0,l,j)
case 11:i=a1.x
h=A.an(a0,i,a2,a3)
g=a1.y
f=A.ia(a0,g,a2,a3)
if(h===i&&f===g)return a1
return A.eA(a0,h,f)
case 12:e=a1.y
a3+=e.length
d=A.aV(a0,e,a2,a3)
p=a1.x
o=A.an(a0,p,a2,a3)
if(d===e&&o===p)return a1
return A.dN(a0,o,d,!0)
case 13:c=a1.x
if(c<a3)return a1
b=a2[c-a3]
if(b==null)return a1
return b
default:throw A.e(A.bH("Attempted to substitute unexpected RTI kind "+a))}},
aV(a,b,c,d){var t,s,r,q,p=b.length,o=A.d5(p)
for(t=!1,s=0;s<p;++s){r=b[s]
q=A.an(a,r,c,d)
if(q!==r)t=!0
o[s]=q}return t?o:b},
ib(a,b,c,d){var t,s,r,q,p,o,n=b.length,m=A.d5(n)
for(t=!1,s=0;s<n;s+=3){r=b[s]
q=b[s+1]
p=b[s+2]
o=A.an(a,p,c,d)
if(o!==p)t=!0
m.splice(s,3,r,q,o)}return t?m:b},
ia(a,b,c,d){var t,s=b.a,r=A.aV(a,s,c,d),q=b.b,p=A.aV(a,q,c,d),o=b.c,n=A.ib(a,o,c,d)
if(r===s&&p===q&&n===o)return b
t=new A.ch()
t.a=r
t.b=p
t.c=n
return t},
f(a,b){a[v.arrayRti]=b
return a},
de(a){var t=a.$S
if(t!=null){if(typeof t=="number")return A.iE(t)
return a.$S()}return null},
iI(a,b){var t
if(A.eo(b))if(a instanceof A.H){t=A.de(a)
if(t!=null)return t}return A.aa(a)},
aa(a){if(a instanceof A.n)return A.j(a)
if(Array.isArray(a))return A.B(a)
return A.dQ(J.aF(a))},
B(a){var t=a[v.arrayRti],s=u.b
if(t==null)return s
if(t.constructor!==s.constructor)return s
return t},
j(a){var t=a.$ti
return t!=null?t:A.dQ(a)},
dQ(a){var t=a.constructor,s=t.$ccache
if(s!=null)return s
return A.hS(a,t)},
hS(a,b){var t=a instanceof A.H?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,s=A.hy(v.typeUniverse,t.name)
b.$ccache=s
return s},
iE(a){var t,s=v.types,r=s[a]
if(typeof r=="string"){t=A.d4(v.typeUniverse,r,!1)
s[a]=t
return t}return r},
iD(a){return A.a9(A.j(a))},
dX(a){var t=A.de(a)
return A.a9(t==null?A.aa(a):t)},
dT(a){var t
if(a instanceof A.al)return A.iw(a.$r,a.an())
t=a instanceof A.H?A.de(a):null
if(t!=null)return t
if(u.R.b(a))return J.fu(a).a
if(Array.isArray(a))return A.B(a)
return A.aa(a)},
a9(a){var t=a.r
return t==null?a.r=new A.cm(a):t},
iw(a,b){var t,s,r=b,q=r.length
if(q===0)return u.F
if(0>=q)return A.a(r,0)
t=A.bE(v.typeUniverse,A.dT(r[0]),"@<0>")
for(s=1;s<q;++s){if(!(s<r.length))return A.a(r,s)
t=A.eF(v.typeUniverse,t,A.dT(r[s]))}return A.bE(v.typeUniverse,t,a)},
W(a){return A.a9(A.d4(v.typeUniverse,a,!1))},
hR(a){var t=this
t.b=A.i9(t)
return t.b(a)},
i9(a){var t,s,r,q,p
if(a===u.K)return A.i0
if(A.aG(a))return A.i4
t=a.w
if(t===6)return A.hO
if(t===1)return A.eW
if(t===7)return A.hW
s=A.i8(a)
if(s!=null)return s
if(t===8){r=a.x
if(a.y.every(A.aG)){a.f="$i"+r
if(r==="h")return A.hZ
if(a===u.m)return A.hY
return A.i3}}else if(t===10){q=A.iu(a.x,a.y)
p=q==null?A.eW:q
return p==null?A.eM(p):p}return A.hM},
i8(a){if(a.w===8){if(a===u.S)return A.dS
if(a===u.i||a===u.H)return A.i_
if(a===u.N)return A.i2
if(a===u.y)return A.dR}return null},
hQ(a){var t=this,s=A.hL
if(A.aG(t))s=A.hF
else if(t===u.K)s=A.eM
else if(A.aY(t)){s=A.hN
if(t===u.a3)s=A.hD
else if(t===u.u)s=A.dO
else if(t===u.A)s=A.hB
else if(t===u.ae)s=A.eL
else if(t===u.I)s=A.hC
else if(t===u.z)s=A.hE}else if(t===u.S)s=A.N
else if(t===u.N)s=A.u
else if(t===u.y)s=A.hA
else if(t===u.H)s=A.eK
else if(t===u.i)s=A.eI
else if(t===u.m)s=A.eJ
t.a=s
return t.a(a)},
hM(a){var t=this
if(a==null)return A.aY(t)
return A.f3(v.typeUniverse,A.iI(a,t),t)},
hO(a){if(a==null)return!0
return this.x.b(a)},
i3(a){var t,s=this
if(a==null)return A.aY(s)
t=s.f
if(a instanceof A.n)return!!a[t]
return!!J.aF(a)[t]},
hZ(a){var t,s=this
if(a==null)return A.aY(s)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
t=s.f
if(a instanceof A.n)return!!a[t]
return!!J.aF(a)[t]},
hY(a){var t=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.n)return!!a[t.f]
return!0}if(typeof a=="function")return!0
return!1},
eV(a){if(typeof a=="object"){if(a instanceof A.n)return u.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
hL(a){var t=this
if(a==null){if(A.aY(t))return a}else if(t.b(a))return a
throw A.C(A.eQ(a,t),new Error())},
hN(a){var t=this
if(a==null||t.b(a))return a
throw A.C(A.eQ(a,t),new Error())},
eQ(a,b){return new A.aU("TypeError: "+A.et(a,A.I(b,null)))},
ip(a,b,c,d){if(A.f3(v.typeUniverse,a,b))return a
throw A.C(A.hq("The type argument '"+A.I(a,null)+"' is not a subtype of the type variable bound '"+A.I(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
et(a,b){return A.bP(a)+": type '"+A.I(A.dT(a),null)+"' is not a subtype of type '"+b+"'"},
hq(a){return new A.aU("TypeError: "+a)},
R(a,b){return new A.aU("TypeError: "+A.et(a,b))},
hW(a){var t=this
return t.x.b(a)||A.dI(v.typeUniverse,t).b(a)},
i0(a){return a!=null},
eM(a){if(a!=null)return a
throw A.C(A.R(a,"Object"),new Error())},
i4(a){return!0},
hF(a){return a},
eW(a){return!1},
dR(a){return!0===a||!1===a},
hA(a){if(!0===a)return!0
if(!1===a)return!1
throw A.C(A.R(a,"bool"),new Error())},
hB(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.C(A.R(a,"bool?"),new Error())},
eI(a){if(typeof a=="number")return a
throw A.C(A.R(a,"double"),new Error())},
hC(a){if(typeof a=="number")return a
if(a==null)return a
throw A.C(A.R(a,"double?"),new Error())},
dS(a){return typeof a=="number"&&Math.floor(a)===a},
N(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.C(A.R(a,"int"),new Error())},
hD(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.C(A.R(a,"int?"),new Error())},
i_(a){return typeof a=="number"},
eK(a){if(typeof a=="number")return a
throw A.C(A.R(a,"num"),new Error())},
eL(a){if(typeof a=="number")return a
if(a==null)return a
throw A.C(A.R(a,"num?"),new Error())},
i2(a){return typeof a=="string"},
u(a){if(typeof a=="string")return a
throw A.C(A.R(a,"String"),new Error())},
dO(a){if(typeof a=="string")return a
if(a==null)return a
throw A.C(A.R(a,"String?"),new Error())},
eJ(a){if(A.eV(a))return a
throw A.C(A.R(a,"JSObject"),new Error())},
hE(a){if(a==null)return a
if(A.eV(a))return a
throw A.C(A.R(a,"JSObject?"),new Error())},
eX(a,b){var t,s,r
for(t="",s="",r=0;r<a.length;++r,s=", ")t+=s+A.I(a[r],b)
return t},
i7(a,b){var t,s,r,q,p,o,n=a.x,m=a.y
if(""===n)return"("+A.eX(m,b)+")"
t=m.length
s=n.split(",")
r=s.length-t
for(q="(",p="",o=0;o<t;++o,p=", "){q+=p
if(r===0)q+="{"
q+=A.I(m[o],b)
if(r>=0)q+=" "+s[r];++r}return q+"})"},
eT(a2,a3,a4){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=", ",a1=null
if(a4!=null){t=a4.length
if(a3==null)a3=A.f([],u.s)
else a1=a3.length
s=a3.length
for(r=t;r>0;--r)B.a.i(a3,"T"+(s+r))
for(q=u.X,p="<",o="",r=0;r<t;++r,o=a0){n=a3.length
m=n-1-r
if(!(m>=0))return A.a(a3,m)
p=p+o+a3[m]
l=a4[r]
k=l.w
if(!(k===2||k===3||k===4||k===5||l===q))p+=" extends "+A.I(l,a3)}p+=">"}else p=""
q=a2.x
j=a2.y
i=j.a
h=i.length
g=j.b
f=g.length
e=j.c
d=e.length
c=A.I(q,a3)
for(b="",a="",r=0;r<h;++r,a=a0)b+=a+A.I(i[r],a3)
if(f>0){b+=a+"["
for(a="",r=0;r<f;++r,a=a0)b+=a+A.I(g[r],a3)
b+="]"}if(d>0){b+=a+"{"
for(a="",r=0;r<d;r+=3,a=a0){b+=a
if(e[r+1])b+="required "
b+=A.I(e[r+2],a3)+" "+e[r]}b+="}"}if(a1!=null){a3.toString
a3.length=a1}return p+"("+b+") => "+c},
I(a,b){var t,s,r,q,p,o,n,m=a.w
if(m===5)return"erased"
if(m===2)return"dynamic"
if(m===3)return"void"
if(m===1)return"Never"
if(m===4)return"any"
if(m===6){t=a.x
s=A.I(t,b)
r=t.w
return(r===11||r===12?"("+s+")":s)+"?"}if(m===7)return"FutureOr<"+A.I(a.x,b)+">"
if(m===8){q=A.ic(a.x)
p=a.y
return p.length>0?q+("<"+A.eX(p,b)+">"):q}if(m===10)return A.i7(a,b)
if(m===11)return A.eT(a,b,null)
if(m===12)return A.eT(a.x,b,a.y)
if(m===13){o=a.x
n=b.length
o=n-1-o
if(!(o>=0&&o<n))return A.a(b,o)
return b[o]}return"?"},
ic(a){var t=A.fc(a)
if(t!=null)return t
return"minified:"+a},
hz(a,b){var t=a.tR[b]
while(typeof t=="string")t=a.tR[t]
return t},
hy(a,b){var t,s,r,q,p,o=a.eT,n=o[b]
if(n==null)return A.d4(a,b,!1)
else if(typeof n=="number"){t=n
s=A.bD(a,5,"#")
r=A.d5(t)
for(q=0;q<t;++q)r[q]=s
p=A.bC(a,b,r)
o[b]=p
return p}else return n},
hx(a,b){return A.eG(a.tR,b)},
hw(a,b){return A.eG(a.eT,b)},
d4(a,b,c){var t,s=a.eC,r=s.get(b)
if(r!=null)return r
t=A.eE(a,null,b,!1)
s.set(b,t)
return t},
bE(a,b,c){var t,s,r=b.z
if(r==null)r=b.z=new Map()
t=r.get(c)
if(t!=null)return t
s=A.eE(a,b,c,!0)
r.set(c,s)
return s},
eF(a,b,c){var t,s,r,q=b.Q
if(q==null)q=b.Q=new Map()
t=c.as
s=q.get(t)
if(s!=null)return s
r=A.dM(a,b,c.w===9?c.y:[c])
q.set(t,r)
return r},
eE(a,b,c,d){return A.ho(A.hi(a,b,c,d))},
am(a,b){b.a=A.hQ
b.b=A.hR
return b},
bD(a,b,c){var t,s,r=a.eC.get(c)
if(r!=null)return r
t=new A.U(null,null)
t.w=b
t.as=c
s=A.am(a,t)
a.eC.set(c,s)
return s},
eC(a,b,c){var t,s=b.as+"?",r=a.eC.get(s)
if(r!=null)return r
t=A.hu(a,b,s,c)
a.eC.set(s,t)
return t},
hu(a,b,c,d){var t,s,r
if(d){t=b.w
s=!0
if(!A.aG(b))if(!(b===u.P||b===u.T))if(t!==6)s=t===7&&A.aY(b.x)
if(s)return b
else if(t===1)return u.P}r=new A.U(null,null)
r.w=6
r.x=b
r.as=c
return A.am(a,r)},
eB(a,b,c){var t,s=b.as+"/",r=a.eC.get(s)
if(r!=null)return r
t=A.hs(a,b,s,c)
a.eC.set(s,t)
return t},
hs(a,b,c,d){var t,s
if(d){t=b.w
if(A.aG(b)||b===u.K)return b
else if(t===1)return A.bC(a,"eb",[b])
else if(b===u.P||b===u.T)return u.x}s=new A.U(null,null)
s.w=7
s.x=b
s.as=c
return A.am(a,s)},
hv(a,b){var t,s,r=""+b+"^",q=a.eC.get(r)
if(q!=null)return q
t=new A.U(null,null)
t.w=13
t.x=b
t.as=r
s=A.am(a,t)
a.eC.set(r,s)
return s},
bB(a){var t,s,r,q=a.length
for(t="",s="",r=0;r<q;++r,s=",")t+=s+a[r].as
return t},
hr(a){var t,s,r,q,p,o=a.length
for(t="",s="",r=0;r<o;r+=3,s=","){q=a[r]
p=a[r+1]?"!":":"
t+=s+q+p+a[r+2].as}return t},
bC(a,b,c){var t,s,r,q=b
if(c.length>0)q+="<"+A.bB(c)+">"
t=a.eC.get(q)
if(t!=null)return t
s=new A.U(null,null)
s.w=8
s.x=b
s.y=c
if(c.length>0)s.c=c[0]
s.as=q
r=A.am(a,s)
a.eC.set(q,r)
return r},
dM(a,b,c){var t,s,r,q,p,o
if(b.w===9){t=b.x
s=b.y.concat(c)}else{s=c
t=b}r=t.as+(";<"+A.bB(s)+">")
q=a.eC.get(r)
if(q!=null)return q
p=new A.U(null,null)
p.w=9
p.x=t
p.y=s
p.as=r
o=A.am(a,p)
a.eC.set(r,o)
return o},
eD(a,b,c){var t,s,r="+"+(b+"("+A.bB(c)+")"),q=a.eC.get(r)
if(q!=null)return q
t=new A.U(null,null)
t.w=10
t.x=b
t.y=c
t.as=r
s=A.am(a,t)
a.eC.set(r,s)
return s},
eA(a,b,c){var t,s,r,q,p,o=b.as,n=c.a,m=n.length,l=c.b,k=l.length,j=c.c,i=j.length,h="("+A.bB(n)
if(k>0){t=m>0?",":""
h+=t+"["+A.bB(l)+"]"}if(i>0){t=m>0?",":""
h+=t+"{"+A.hr(j)+"}"}s=o+(h+")")
r=a.eC.get(s)
if(r!=null)return r
q=new A.U(null,null)
q.w=11
q.x=b
q.y=c
q.as=s
p=A.am(a,q)
a.eC.set(s,p)
return p},
dN(a,b,c,d){var t,s=b.as+("<"+A.bB(c)+">"),r=a.eC.get(s)
if(r!=null)return r
t=A.ht(a,b,c,s,d)
a.eC.set(s,t)
return t},
ht(a,b,c,d,e){var t,s,r,q,p,o,n,m
if(e){t=c.length
s=A.d5(t)
for(r=0,q=0;q<t;++q){p=c[q]
if(p.w===1){s[q]=p;++r}}if(r>0){o=A.an(a,b,s,0)
n=A.aV(a,c,s,0)
return A.dN(a,o,n,c!==n)}}m=new A.U(null,null)
m.w=12
m.x=b
m.y=c
m.as=d
return A.am(a,m)},
hi(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
ho(a){var t,s,r,q,p,o,n,m=a.r,l=a.s
for(t=m.length,s=0;s<t;){r=m.charCodeAt(s)
if(r>=48&&r<=57)s=A.hk(s+1,r,m,l)
else if((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124)s=A.ev(a,s,m,l,!1)
else if(r===46)s=A.ev(a,s,m,l,!0)
else{++s
switch(r){case 44:break
case 58:l.push(!1)
break
case 33:l.push(!0)
break
case 59:l.push(A.aE(a.u,a.e,l.pop()))
break
case 94:l.push(A.hv(a.u,l.pop()))
break
case 35:l.push(A.bD(a.u,5,"#"))
break
case 64:l.push(A.bD(a.u,2,"@"))
break
case 126:l.push(A.bD(a.u,3,"~"))
break
case 60:l.push(a.p)
a.p=l.length
break
case 62:A.hm(a,l)
break
case 38:A.hl(a,l)
break
case 63:q=a.u
l.push(A.eC(q,A.aE(q,a.e,l.pop()),a.n))
break
case 47:q=a.u
l.push(A.eB(q,A.aE(q,a.e,l.pop()),a.n))
break
case 40:l.push(-3)
l.push(a.p)
a.p=l.length
break
case 41:A.hj(a,l)
break
case 91:l.push(a.p)
a.p=l.length
break
case 93:p=l.splice(a.p)
A.ew(a.u,a.e,p)
a.p=l.pop()
l.push(p)
l.push(-1)
break
case 123:l.push(a.p)
a.p=l.length
break
case 125:p=l.splice(a.p)
A.hp(a.u,a.e,p)
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
return A.aE(a.u,a.e,n)},
hk(a,b,c,d){var t,s,r=b-48
for(t=c.length;a<t;++a){s=c.charCodeAt(a)
if(!(s>=48&&s<=57))break
r=r*10+(s-48)}d.push(r)
return a},
ev(a,b,c,d,e){var t,s,r,q,p,o,n=b+1
for(t=c.length;n<t;++n){s=c.charCodeAt(n)
if(s===46){if(e)break
e=!0}else{if(!((((s|32)>>>0)-97&65535)<26||s===95||s===36||s===124))r=s>=48&&s<=57
else r=!0
if(!r)break}}q=c.substring(b,n)
if(e){t=a.u
p=a.e
if(p.w===9)p=p.x
o=A.hz(t,p.x)[q]
if(o==null)A.aI('No "'+q+'" in "'+A.h9(p)+'"')
d.push(A.bE(t,p,o))}else d.push(q)
return n},
hm(a,b){var t,s=a.u,r=A.eu(a,b),q=b.pop()
if(typeof q=="string")b.push(A.bC(s,q,r))
else{t=A.aE(s,a.e,q)
switch(t.w){case 11:b.push(A.dN(s,t,r,a.n))
break
default:b.push(A.dM(s,t,r))
break}}},
hj(a,b){var t,s,r,q=a.u,p=b.pop(),o=null,n=null
if(typeof p=="number")switch(p){case-1:o=b.pop()
break
case-2:n=b.pop()
break
default:b.push(p)
break}else b.push(p)
t=A.eu(a,b)
p=b.pop()
switch(p){case-3:p=b.pop()
if(o==null)o=q.sEA
if(n==null)n=q.sEA
s=A.aE(q,a.e,p)
r=new A.ch()
r.a=t
r.b=o
r.c=n
b.push(A.eA(q,s,r))
return
case-4:b.push(A.eD(q,b.pop(),t))
return
default:throw A.e(A.bH("Unexpected state under `()`: "+A.i(p)))}},
hl(a,b){var t=b.pop()
if(0===t){b.push(A.bD(a.u,1,"0&"))
return}if(1===t){b.push(A.bD(a.u,4,"1&"))
return}throw A.e(A.bH("Unexpected extended operation "+A.i(t)))},
eu(a,b){var t=b.splice(a.p)
A.ew(a.u,a.e,t)
a.p=b.pop()
return t},
aE(a,b,c){if(typeof c=="string")return A.bC(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.hn(a,b,c)}else return c},
ew(a,b,c){var t,s=c.length
for(t=0;t<s;++t)c[t]=A.aE(a,b,c[t])},
hp(a,b,c){var t,s=c.length
for(t=2;t<s;t+=3)c[t]=A.aE(a,b,c[t])},
hn(a,b,c){var t,s,r=b.w
if(r===9){if(c===0)return b.x
t=b.y
s=t.length
if(c<=s)return t[c-1]
c-=s
b=b.x
r=b.w}else if(c===0)return b
if(r!==8)throw A.e(A.bH("Indexed base must be an interface type"))
t=b.y
if(c<=t.length)return t[c-1]
throw A.e(A.bH("Bad index "+c+" for "+b.k(0)))},
f3(a,b,c){var t,s=b.d
if(s==null)s=b.d=new Map()
t=s.get(c)
if(t==null){t=A.y(a,b,null,c,null)
s.set(c,t)}return t},
y(a,b,c,d,e){var t,s,r,q,p,o,n,m,l,k,j
if(b===d)return!0
if(A.aG(d))return!0
t=b.w
if(t===4)return!0
if(A.aG(b))return!1
if(b.w===1)return!0
s=t===13
if(s)if(A.y(a,c[b.x],c,d,e))return!0
r=d.w
q=u.P
if(b===q||b===u.T){if(r===7)return A.y(a,b,c,d.x,e)
return d===q||d===u.T||r===6}if(d===u.K){if(t===7)return A.y(a,b.x,c,d,e)
return t!==6}if(t===7){if(!A.y(a,b.x,c,d,e))return!1
return A.y(a,A.dI(a,b),c,d,e)}if(t===6)return A.y(a,q,c,d,e)&&A.y(a,b.x,c,d,e)
if(r===7){if(A.y(a,b,c,d.x,e))return!0
return A.y(a,b,c,A.dI(a,d),e)}if(r===6)return A.y(a,b,c,q,e)||A.y(a,b,c,d.x,e)
if(s)return!1
q=t!==11
if((!q||t===12)&&d===u.Z)return!0
p=t===10
if(p&&d===u.q)return!0
if(r===12){if(b===u.M)return!0
if(t!==12)return!1
o=b.y
n=d.y
m=o.length
if(m!==n.length)return!1
c=c==null?o:o.concat(c)
e=e==null?n:n.concat(e)
for(l=0;l<m;++l){k=o[l]
j=n[l]
if(!A.y(a,k,c,j,e)||!A.y(a,j,e,k,c))return!1}return A.eU(a,b.x,c,d.x,e)}if(r===11){if(b===u.M)return!0
if(q)return!1
return A.eU(a,b,c,d,e)}if(t===8){if(r!==8)return!1
return A.hX(a,b,c,d,e)}if(p&&r===10)return A.i1(a,b,c,d,e)
return!1},
eU(a2,a3,a4,a5,a6){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
if(!A.y(a2,a3.x,a4,a5.x,a6))return!1
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
if(!A.y(a2,q[i],a6,h,a4))return!1}for(i=0;i<n;++i){h=m[i]
if(!A.y(a2,q[p+i],a6,h,a4))return!1}for(i=0;i<j;++i){h=m[n+i]
if(!A.y(a2,l[i],a6,h,a4))return!1}g=t.c
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
if(!A.y(a2,f[b+2],a6,h,a4))return!1
break}}while(c<e){if(g[c+1])return!1
c+=3}return!0},
hX(a,b,c,d,e){var t,s,r,q,p,o=b.x,n=d.x
while(o!==n){t=a.tR[o]
if(t==null)return!1
if(typeof t=="string"){o=t
continue}s=t[n]
if(s==null)return!1
r=s.length
q=r>0?new Array(r):v.typeUniverse.sEA
for(p=0;p<r;++p)q[p]=A.bE(a,b,s[p])
return A.eH(a,q,null,c,d.y,e)}return A.eH(a,b.y,null,c,d.y,e)},
eH(a,b,c,d,e,f){var t,s=b.length
for(t=0;t<s;++t)if(!A.y(a,b[t],d,e[t],f))return!1
return!0},
i1(a,b,c,d,e){var t,s=b.y,r=d.y,q=s.length
if(q!==r.length)return!1
if(b.x!==d.x)return!1
for(t=0;t<q;++t)if(!A.y(a,s[t],c,r[t],e))return!1
return!0},
aY(a){var t=a.w,s=!0
if(!(a===u.P||a===u.T))if(!A.aG(a))if(t!==6)s=t===7&&A.aY(a.x)
return s},
aG(a){var t=a.w
return t===2||t===3||t===4||t===5||a===u.X},
eG(a,b){var t,s,r=Object.keys(b),q=r.length
for(t=0;t<q;++t){s=r[t]
a[s]=b[s]}},
d5(a){return a>0?new Array(a):v.typeUniverse.sEA},
U:function U(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
ch:function ch(){this.c=this.b=this.a=null},
cm:function cm(a){this.a=a},
cg:function cg(){},
aU:function aU(a){this.a=a},
ez(a,b,c){return 0},
M:function M(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
aT:function aT(a,b){this.a=a
this.$ti=b},
cc:function cc(){},
Y(a,b,c){return b.h("@<0>").a1(c).h("dF<1,2>").a(A.f0(a,new A.a4(b.h("@<0>").a1(c).h("a4<1,2>"))))},
T(a,b){return new A.a4(a.h("@<0>").a1(b).h("a4<1,2>"))},
eh(a){return new A.V(a.h("V<0>"))},
Z(a){return new A.V(a.h("V<0>"))},
fU(a,b){return b.h("eg<0>").a(A.ix(a,new A.V(b.h("V<0>"))))},
dL(){var t=Object.create(null)
t["<non-identifier-key>"]=t
delete t["<non-identifier-key>"]
return t},
dK(a,b,c){var t=new A.aD(a,b,c.h("aD<0>"))
t.c=a.e
return t},
cF(a,b){var t,s,r=A.eh(b)
for(t=a.length,s=0;s<a.length;a.length===t||(0,A.z)(a),++s)r.i(0,b.a(a[s]))
return r},
fV(a,b){var t=A.eh(b)
t.M(0,a)
return t},
dG(a){var t,s
if(A.dZ(a))return"{...}"
t=new A.ay("")
try{s={}
B.a.i($.O,a)
t.a+="{"
s.a=!0
a.O(0,new A.cG(s,t))
t.a+="}"}finally{if(0>=$.O.length)return A.a($.O,-1)
$.O.pop()}s=t.a
return s.charCodeAt(0)==0?s:s},
V:function V(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
ck:function ck(a){this.a=a
this.c=this.b=null},
aD:function aD(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
m:function m(){},
E:function E(){},
cG:function cG(a,b){this.a=a
this.b=b},
aj:function aj(){},
bA:function bA(){},
i6(a,b){var t,s,r,q=null
try{q=JSON.parse(a)}catch(s){t=A.co(s)
r=String(t)
throw A.e(new A.ct(r))}r=A.d6(q)
return r},
d6(a){var t
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.ci(a,Object.create(null))
for(t=0;t<a.length;++t)a[t]=A.d6(a[t])
return a},
ee(a,b,c){return new A.bb(a,b)},
hJ(a){return a.br()},
hg(a,b){return new A.d_(a,[],A.it())},
hh(a,b,c){var t,s=new A.ay(""),r=A.hg(s,b)
r.Y(a)
t=s.a
return t.charCodeAt(0)==0?t:t},
ci:function ci(a,b){this.a=a
this.b=b
this.c=null},
cj:function cj(a){this.a=a},
bL:function bL(){},
bN:function bN(){},
bb:function bb(a,b){this.a=a
this.b=b},
bX:function bX(a,b){this.a=a
this.b=b},
cz:function cz(){},
cB:function cB(a){this.b=a},
cA:function cA(a){this.a=a},
d0:function d0(){},
d1:function d1(a,b){this.a=a
this.b=b},
d_:function d_(a,b,c){this.c=a
this.a=b
this.b=c},
cC:function cC(){},
aN(a,b,c,d){var t,s=J.fO(a,d)
if(a!==0&&b!=null)for(t=0;t<a;++t)s[t]=b
return s},
fW(a,b,c){var t,s,r=A.f([],c.h("q<0>"))
for(t=a.length,s=0;s<a.length;a.length===t||(0,A.z)(a),++s)B.a.i(r,c.a(a[s]))
r.$flags=1
return r},
a0(a,b){var t,s
if(Array.isArray(a))return A.f(a.slice(0),b.h("q<0>"))
t=A.f([],b.h("q<0>"))
for(s=J.b_(a);s.l();)B.a.i(t,s.gn())
return t},
eq(a,b,c){var t=J.b_(b)
if(!t.l())return a
if(c.length===0){do a+=A.i(t.gn())
while(t.l())}else{a+=A.i(t.gn())
while(t.l())a=a+c+A.i(t.gn())}return a},
fG(a,b,c){var t=A.h3(a,b,c,0,0,0,0,0,!0)
return new A.ad(t==null?new A.cr(a,b,c,0,0,0,0,0).$0():t,0,!0)},
fH(a){var t=Math.abs(a),s=a<0?"-":""
if(t>=1000)return""+a
if(t>=100)return s+"0"+t
if(t>=10)return s+"00"+t
return s+"000"+t},
ea(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bO(a){if(a>=10)return""+a
return"0"+a},
cs(a){return new A.ar(864e8*a)},
bP(a){if(typeof a=="number"||A.dR(a)||a==null)return J.ap(a)
if(typeof a=="string")return JSON.stringify(a)
return A.el(a)},
bH(a){return new A.bG(a)},
dB(a){return new A.a2(!1,null,null,a)},
fw(a,b,c){return new A.a2(!0,a,b,c)},
h6(a){var t=null
return new A.aQ(t,t,!1,t,t,a)},
aR(a,b,c,d,e){return new A.aQ(b,c,!0,a,d,"Invalid value")},
h7(a,b,c){if(0>a||a>c)throw A.e(A.aR(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.e(A.aR(b,a,c,"end",null))
return b}return c},
en(a,b){return a},
ec(a,b,c,d){return new A.bQ(b,!0,a,d,"Index out of range")},
aB(a){return new A.bt(a)},
es(a){return new A.ce(a)},
ep(a){return new A.bp(a)},
K(a){return new A.bM(a)},
fN(a,b,c){var t,s
if(A.dZ(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}t=A.f([],u.s)
B.a.i($.O,a)
try{A.i5(a,t)}finally{if(0>=$.O.length)return A.a($.O,-1)
$.O.pop()}s=A.eq(b,u.Y.a(t),", ")+c
return s.charCodeAt(0)==0?s:s},
dC(a,b,c){var t,s
if(A.dZ(a))return b+"..."+c
t=new A.ay(b)
B.a.i($.O,a)
try{s=t
s.a=A.eq(s.a,a,", ")}finally{if(0>=$.O.length)return A.a($.O,-1)
$.O.pop()}t.a+=c
s=t.a
return s.charCodeAt(0)==0?s:s},
i5(a,b){var t,s,r,q,p,o,n,m=a.gt(a),l=0,k=0
for(;;){if(!(l<80||k<3))break
if(!m.l())return
t=A.i(m.gn())
B.a.i(b,t)
l+=t.length+2;++k}if(!m.l()){if(k<=5)return
if(0>=b.length)return A.a(b,-1)
s=b.pop()
if(0>=b.length)return A.a(b,-1)
r=b.pop()}else{q=m.gn();++k
if(!m.l()){if(k<=4){B.a.i(b,A.i(q))
return}s=A.i(q)
if(0>=b.length)return A.a(b,-1)
r=b.pop()
l+=s.length+2}else{p=m.gn();++k
for(;m.l();q=p,p=o){o=m.gn();++k
if(k>100){for(;;){if(!(l>75&&k>3))break
if(0>=b.length)return A.a(b,-1)
l-=b.pop().length+2;--k}B.a.i(b,"...")
return}}r=A.i(q)
s=A.i(p)
l+=s.length+r.length+4}}if(k>b.length+2){l+=5
n="..."}else n=null
for(;;){if(!(l>80&&b.length>3))break
if(0>=b.length)return A.a(b,-1)
l-=b.pop().length+2
if(n==null){l+=5
n="..."}}if(n!=null)B.a.i(b,n)
B.a.i(b,r)
B.a.i(b,s)},
dH(a,b,c,d){var t
if(B.f===c){t=J.P(a)
b=J.P(b)
return A.dJ(A.ak(A.ak($.dz(),t),b))}if(B.f===d){t=J.P(a)
b=J.P(b)
c=J.P(c)
return A.dJ(A.ak(A.ak(A.ak($.dz(),t),b),c))}t=J.P(a)
b=J.P(b)
c=J.P(c)
d=J.P(d)
d=A.dJ(A.ak(A.ak(A.ak(A.ak($.dz(),t),b),c),d))
return d},
cr:function cr(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
ad:function ad(a,b,c){this.a=a
this.b=b
this.c=c},
ar:function ar(a){this.a=a},
cX:function cX(){},
p:function p(){},
bG:function bG(a){this.a=a},
bs:function bs(){},
a2:function a2(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
aQ:function aQ(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
bQ:function bQ(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
bt:function bt(a){this.a=a},
ce:function ce(a){this.a=a},
bp:function bp(a){this.a=a},
bM:function bM(a){this.a=a},
c7:function c7(){},
bo:function bo(){},
cY:function cY(a){this.a=a},
ct:function ct(a){this.a=a},
c:function c(){},
Q:function Q(a,b,c){this.a=a
this.b=b
this.$ti=c},
bj:function bj(){},
n:function n(){},
ay:function ay(a){this.a=a},
f6(a,b,c){A.ip(c,u.H,"T","max")
return Math.max(c.a(a),c.a(b))},
cl:function cl(){this.b=this.a=0},
aJ:function aJ(a,b,c){this.a=a
this.b=b
this.c=c},
f1(a,b,c){var t,s,r,q,p,o,n,m=b.toUpperCase(),l=m.length
if(l===0)return B.W
t=A.f([],u.p)
s=new A.di(t,c,A.f([],u.t),m,a)
if(0>=l)return A.a(m,0)
r=m.charCodeAt(0)
for(l=a.a*a.b,q=a.c,p=q.length,o=0;n=o<l,n;++o){if(n){if(!(o<p))return A.a(q,o)
n=q.charCodeAt(o)===46}else n=!0
if(n)continue
if(!(o<p))return A.a(q,o)
if(q.charCodeAt(o)!==r)continue
s.$1(o)
if(t.length>=c)break}return t},
io(a,b){var t,s,r,q,p,o,n=b.toUpperCase(),m=A.Z(u.S),l=n.length
if(l===0)return m
t=new A.dd(A.f([],u.t),n,m,a)
if(0>=l)return A.a(n,0)
s=n.charCodeAt(0)
for(l=a.a*a.b,r=a.c,q=r.length,p=0;o=p<l,o;++p){if(o){if(!(p<q))return A.a(r,p)
o=r.charCodeAt(p)===46}else o=!0
if(o)continue
if(!(p<q))return A.a(r,p)
if(r.charCodeAt(p)!==s)continue
t.$1(p)}return m},
di:function di(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dd:function dd(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fb(a,b,c){var t
if(a===B.p)return B.a5
if(b===6)return B.Z[B.b.K(B.b.A(c,7)*2654435761,8)]
t=B.a_.q(0,b)
t.toString
return t},
A:function A(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
h4(a){var t,s
for(t=0;t<2;++t){s=B.U[t]
if(s.c===a)return s}return null},
em(a,b,c,d){A.cF(d,A.B(d).c)
A.cF(b,A.B(b).c)
return new A.cJ(a,d,b,c)},
bm:function bm(a,b,c,d){var _=this
_.c=a
_.d=b
_.a=c
_.b=d},
cJ:function cJ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.as=_.Q=_.z=_.x=$},
cK:function cK(a,b){this.a=a
this.b=b},
cL:function cL(a){this.a=a},
cM:function cM(a){this.a=a},
cN:function cN(a){this.a=a},
cO:function cO(a,b){this.a=a
this.b=b},
cP:function cP(a){this.a=a},
h8(){var t,s=A.T(u.w,u.S)
for(t=0;t<11;++t)s.j(0,B.T[t],0)
return new A.cQ(s)},
iS(a1,a2,a3,a4,a5,a6,a7,a8,a9){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=null,a0=a6.c
if(0>=a0.length)return A.a(a0,0)
t=new A.cl()
t.aM(1e6+a4*7919+a0.charCodeAt(0)*104729+a1)
a0=a9.a
s=a9.b
r=A.ik(a0,s,a9.c,t)
if(r==null){a7.i(0,B.r)
return a}for(q=a9.r,p=q.length,o=r,n=0;n<p;++n){m=a3.bb(q[n])
if(J.fs(m))continue
l=t.L(m.length)
if(!(l>=0&&l<m.length))return A.a(m,l)
k=A.f8(o,a0,s,m[l],t)
if(k==null){a7.i(0,B.C)
return a}o=k}q=a3.e
l=q.length
j=a
if(l!==0){i=a9.gaC()
if(a5!=null)q=A.f([a5],u.s)
l=A.B(q)
h=l.h("v<1>")
q=A.a0(new A.v(q,l.h("o(1)").a(new A.dw(i,a2)),h),h.h("c.E"))
q.$flags=1
m=q
q=m.length
if(q!==0){q=t.L(q)
if(!(q>=0&&q<m.length))return A.a(m,q)
j=m[q]
k=A.f8(o,a0,s,j,t)
if(k==null){a7.i(0,B.t)
return a}o=k}}g=A.iy(o,a3.b_(a9.w),t)
if(g==null){a7.i(0,B.v)
return a}f=new A.aJ(a0,s,g)
if(!f.gac()){a7.i(0,B.w)
return a}e=A.iv(f,a3.a)
d=a3.b.a_(0,e)
a0=d.b
s=a0.length
if(s<a9.d){a7.i(0,B.x)
return a}if(s>a9.e){a7.i(0,B.y)
return a}if(e.a===0)c=0
else{s=A.j(e)
c=new A.as(e,s.h("b(1)").a(new A.dx()),s.h("as<1,b>")).af(0,B.E)}if(c<a9.f){a7.i(0,B.z)
return a}s=A.B(a0)
if(new A.v(a0,s.h("o(1)").a(new A.dy()),s.h("v<1>")).gm(0)<p){a7.i(0,B.u)
return a}if(j!=null&&!B.a.p(a0,j)){a7.i(0,B.A)
return a}b=A.em(f,d.a,j,a0)
a0=b.gaw()
if(a0.gP(a0)){a7.i(0,B.B)
return a}return b},
iA(a,b,c,d,e,f,g,h){var t,s,r=A.fb(e,h,c)
for(t=0;t<6e4;++t){s=A.iS(t,a,b,c,d,e,f,!0,r)
if(s!=null)return s}return null},
ih(a){var t,s,r,q,p,o,n,m,l=A.f([],u.s),k=a.a
if(!k.gac())B.a.i(l,"board is not connected")
t=a.b
s=A.a0(t,u.N)
r=a.c
B.a.M(s,r)
q=s.length
p=0
for(;p<s.length;s.length===q||(0,A.z)(s),++p){o=s[p]
if(o.length<4)B.a.i(l,o+" is shorter than 4")
if(A.f1(k,o,1).length===0)B.a.i(l,o+" is not traceable")}s=a.gaw()
if(s.gP(s)){q=A.j(s)
B.a.i(l,"no required word uses: "+new A.as(s,q.h("d(1)").a(new A.d8(a)),q.h("as<1,d>")).H(0,", "))}n=A.cF(t,A.B(t).c).b7(A.cF(r,A.B(r).c))
if(n.a!==0)B.a.i(l,"in both lists: "+A.hb(n,5,A.j(n).c).H(0,", "))
m=a.d
if(m!=null&&!B.a.p(t,m))B.a.i(l,"Canuckle word "+m+" is not in the required list")
return l},
cu:function cu(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
cv:function cv(a,b){this.a=a
this.b=b},
cw:function cw(a,b){this.a=a
this.b=b},
x:function x(a,b){this.a=a
this.b=b},
cQ:function cQ(a){this.a=a},
cR:function cR(){},
cS:function cS(){},
dw:function dw(a,b){this.a=a
this.b=b},
dx:function dx(){},
dy:function dy(){},
d8:function d8(a){this.a=a},
fz(a1){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b="tools\\data\\dict_blocked.txt",a=A.cn("tools\\data\\stoplist.txt"),a0=u.N
a=A.fV(a,a0)
t=A.cn("tools\\data\\dict_bonus_only.txt")
a.M(0,t)
s=A.cn("tools\\data\\allowlist.txt")
r=$.cp.q(0,b)!=null?A.f4(b):B.X
t=A.Z(a0)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.z)(r),++p)t.i(0,r[p].a)
o=A.T(u.S,u.h)
q=u.O
n=A.a0(a1,q)
B.a.M(n,r)
m=n.length
l=u.B
p=0
for(;p<n.length;n.length===m||(0,A.z)(n),++p){k=n[p]
j=k.a.length
i=o.q(0,j)
if(i==null){i=A.f([],l)
o.j(0,j,i)
j=i}else j=i
J.dA(j,k)}h=A.Z(a0)
for(a0=new A.a5(o,o.$ti.h("a5<1,2>")).gt(0);a0.l();){g=a0.d
n=g.a
f=B.a0.q(0,n)
if(f==null)f=n>8?0.1:0
if(f<=0)continue
e=g.b
n=new A.cq()
m=e.length-1
if(m<=32)A.ey(e,0,m,n,q)
else A.ex(e,0,m,n,q)
d=B.h.aA(e.length*f)
c=0
for(;;){if(!(c<d&&c<e.length))break
A:{if(!(c<e.length))return A.a(e,c)
n=e[c]
if(n.b<=0)break
if(a.p(0,n.a))break A
if(!(c<e.length))return A.a(e,c)
if(t.p(0,e[c].a))break A
if(!(c<e.length))return A.a(e,c)
h.i(0,e[c].a)}++c}}for(a0=A.dK(s,s.r,A.j(s).c),t=a0.$ti.c;a0.l();){q=a0.d
if(q==null)q=t.a(q)
if(!a.p(0,q))h.i(0,q)}return new A.bI(h)},
hH(a,b){var t
A.u(a)
A.u(b)
t=B.b.B(a.length,b.length)
return t!==0?t:B.c.B(a,b)},
cn(a){var t,s,r,q,p,o=$.cp.q(0,a)
if(o==null)return A.Z(u.N)
t=A.Z(u.N)
for(s=B.l.av(o),r=s.length,q=0;q<s.length;s.length===r||(0,A.z)(s),++q){p=B.c.aE(s[q])
if(p.length===0||B.c.aI(p,"#"))continue
t.i(0,p.toUpperCase())}return t},
bI:function bI(a){this.a=a},
cq:function cq(){},
fT(a,b){var t,s,r,q,p,o,n,m,l,k,j,i=A.aN(26,0,!1,u.S)
for(t=a.length,s=0;s<a.length;a.length===t||(0,A.z)(a),++s){r=a[s]
if(r.b<1e6)continue
for(q=r.a,p=q.length,o=0;o<p;++o){n=q.charCodeAt(o)-65
if(n>=0&&n<=25){if(!(n>=0&&n<26))return A.a(i,n)
B.a.j(i,n,i[n]+1)}}}t=A.f([],u.n)
for(n=0;n<26;++n){q=i[n]
if(q<1)q=1
t.push(Math.pow(q,b))}m=B.a.af(t,B.F)
l=A.f([],u.s)
k=A.f([],u.t)
for(j=0,n=0;n<26;++n){if(!(n<t.length))return A.a(t,n)
j+=Math.max(1,B.h.bk(t[n]/m*1e6))
B.a.i(l,A.D(65+n))
B.a.i(k,j)}return new A.aM(l,k,j)},
iy(a,b,c){var t,s,r,q,p,o,n,m,l=u.s,k=A.f(a.split(""),l),j=A.f([],u.t)
for(t=0,s=0,r=0;r<k.length;++r){q=k[r]
if(q===".")continue;++s
if(q==="#")B.a.i(j,r)
else if(B.c.p("AEIOU",q))++t}if(s===0)return null
p=B.h.b0(s*0.3)
o=B.h.aA(s*0.48)
if(t>o)return null
n=p+c.L(Math.max(1,o-p+1))-t
m=A.f([],l)
for(r=0;r<j.length;++r){if(r<n){l=c.L(5)
if(!(l>=0&&l<5))return A.a("AEIOU",l)
l="AEIOU"[l]}else l=b.bf(c)
B.a.i(m,l)}B.a.aH(m,c)
for(r=0;r<j.length;++r){l=j[r]
if(!(r<m.length))return A.a(m,r)
B.a.j(k,l,m[r])}return B.a.ae(k)},
aM:function aM(a,b,c){this.a=a
this.b=b
this.c=c},
ij(){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=new A.d9()
d.$1("Loading dictionary...")
t=A.f4("tools\\data\\dict.txt")
s=A.il(t)
r=A.fz(t)
q=$.cp.q(0,"tools\\data\\canuckle_words.txt")
p=u.s
o=u.e
o=new A.aw(A.f((q==null?"":q).split("\n"),p),u.v.a(new A.da()),o).aJ(0,o.h("o(a_.E)").a(new A.db()))
n=A.a0(o,o.$ti.h("c.E"))
q=A.B(n)
o=q.h("v<1>")
q=A.a0(new A.v(n,q.h("o(1)").a(r.gb8()),o),o.h("c.E"))
q.$flags=1
m=q
q=r.a
d.$1(""+s.b+" words in the trie, "+q.a+" required-eligible.")
d.$1(""+n.length+" Canuckle answers, "+m.length+" of them usable as a seed.\n")
o=m.length
if(o<100)A.dV("Only "+o+" seedable Canuckle words. Every board would draw from too small a pool.")
o=u.S
l=u.l
k=A.T(o,l)
for(j=t.length,i=0;i<t.length;t.length===j||(0,A.z)(t),++i){h=t[i].a
g=h.length
if(g<8)continue
if(!q.p(0,h))continue
f=k.q(0,g)
if(f==null){f=A.f([],p)
k.j(0,g,f)
g=f}else g=f
J.dA(g,h)}q=k.$ti.h("a6<1>")
q=A.a0(new A.a6(k,q),q.h("c.E"))
B.a.ag(q)
p=A.B(q)
d.$1("long words to seed with, by length -- "+new A.aw(q,p.h("d(1)").a(new A.dc(k)),p.h("aw<1,d>")).H(0," "))
p=k.q(0,8)
e=p==null?null:p.length
if(e==null)e=0
if(e<200)A.dV("Only "+e+" eight-letter words are required-eligible. Every board would draw its long word from too small a pool.")
return new A.cu(s,r,t,A.T(u.i,u._),m,k,A.T(o,l))},
iz(a,b,c,d,e){var t
if(!a.b.a.p(0,d))return d+" is too rare a word for Canoggle to ask players to find it, so it can't be featured."
t=A.fb(b,A.ek($.e2().U(0-A.cs(0).a).U(A.cs(c-1).a)),c).gaC()-4
if(d.length>t)return d+" is too long for the "+b.d+" board on day "+c+" (at most "+t+" letters)."
if(e.p(0,d))return d+" is already featured on the other board that day."
return null},
ii(a,b,c,d,e,f){var t,s,r,q,p,o,n,m,l,k,j=null,i=d==null,h=!i
if(h){t=A.iz(b,e,c,d,a)
if(t!=null)return new A.ac(j,j,t)}s=A.iA(a,b,c,d,e,f,!0,A.ek($.e2().U(0-A.cs(0).a).U(A.cs(c-1).a)))
if(s==null){h=""+c
r=e.d
return new A.ac(j,j,i?"Day "+h+" "+r+": no candidate passed.":"No "+r+" board for day "+h+" passed its checks with "+d+" on it.")}if(h&&s.d!==d)return new A.ac(j,j,"Day "+c+" "+e.d+": "+d+" was not placed.")
q=A.ih(s)
if(q.length!==0)return new A.ac(j,j,"Day "+c+" "+e.d+" failed its audit:\n  "+B.a.H(q,"\n  "))
p=s.a
i=s.b
h=A.eR(i)
r=s.c
o=A.eR(r)
n=s.d
m=p.c
l=""+p.a+","+p.b+"~"+m+"~"+A.eP(B.a.H(A.f([h,o,n==null?"":n],u.s),"|"),m,!0)
k=A.iT(l)
if(k==null||k.a.c!==m||k.b.length!==i.length||k.c.length!==r.length||k.d!=n)return new A.ac(j,j,"Day "+c+" "+e.d+": codec round-trip failed.")
return new A.ac(s,l,j)},
d9:function d9(){},
da:function da(){},
db:function db(){},
dc:function dc(a){this.a=a},
ac:function ac(a,b,c){this.a=a
this.b=b
this.c=c},
ik(a,b,c,d){var t,s,r,q,p,o,n,m,l,k,j,i,h,g
if(c===0)return B.c.Z("#",a*b)
t=(c&1)===0&&d.be()
for(s=a*b,r=u.N,q=0;q<60;++q){p=A.aN(s,"#",!1,r)
o=s-1
n=0
m=0
for(;;){if(n<c){l=m+1
k=m<300
m=l}else k=!1
if(!k)break
A:{j=d.L(s)
if(!(j>=0&&j<s))return A.a(p,j)
if(p[j]===".")break A
if(t){i=o-j
if(i!==j){if(!(i>=0))return A.a(p,i)
k=p[i]==="."}else k=!0
if(k)break A
h=n+2
if(h>c)break
B.a.j(p,j,".")
B.a.j(p,i,".")
n=h}else{B.a.j(p,j,".");++n}}}if(n!==c)continue
g=B.a.ae(p)
if(A.hV(a,b,g))return g}return null},
hV(a,b,c){var t,s,r,q,p,o,n,m,l,k,j,i,h=new A.aJ(a,b,c)
if(!h.gac())return!1
for(t=a*b,s=c.length,r=0;q=r<t,q;++r){if(q){if(!(r<s))return A.a(c,r)
q=c.charCodeAt(r)===46}else q=!0
if(q)continue
if(h.R(r).gm(0)<2)return!1}for(p=0;o=p+1,o<b;p=o)for(q=p*a,n=0;m=n+1,m<a;n=m){l=q+n
if(l<t){if(!(l<s))return A.a(c,l)
k=c.charCodeAt(l)===46}else k=!0
j=!1
if(k){k=l+1
if(k<t){if(!(k<s))return A.a(c,k)
k=c.charCodeAt(k)===46}else k=!0
if(k){k=l+a
if(k<t){if(!(k<s))return A.a(c,k)
i=c.charCodeAt(k)===46}else i=!0
if(i){++k
if(k<t){if(!(k<s))return A.a(c,k)
k=c.charCodeAt(k)===46}else k=!0}else k=j}else k=j}else k=j
if(k)return!1}return!0},
f8(a,b,c,d,e){var t,s,r,q,p,o,n,m,l,k,j=new A.aJ(b,c,a),i=new A.dt(a),h=u.t,g=A.f([],h)
for(t=b*c,s=a.length,r=d.length,q=0;p=q<t,p;++q){if(p){if(!(q<s))return A.a(a,q)
p=a.charCodeAt(q)===46}else p=!0
if(!p){if(0>=r)return A.a(d,0)
p=i.$2(q,d[0])}else p=!1
if(p)B.a.i(g,q)}if(g.length===0)return null
for(o=0;o<40;++o){t=e.L(g.length)
if(!(t>=0&&t<g.length))return A.a(g,t)
n=A.f([g[t]],h)
while(t=n.length,t<r){m=d[t]
t=j.R(B.a.gba(n))
s=t.$ti
p=s.h("v<c.E>")
l=A.a0(new A.v(t,s.h("o(c.E)").a(new A.du(n,i,m)),p),p.h("c.E"))
t=l.length
if(t===0)break
t=e.L(t)
if(!(t>=0&&t<l.length))return A.a(l,t)
B.a.i(n,l[t])}if(n.length!==r)continue
k=A.f(a.split(""),u.s)
for(q=0;q<n.length;++q){h=n[q]
if(!(q<r))return A.a(d,q)
B.a.j(k,h,d[q])}return B.a.ae(k)}return null},
dt:function dt(a){this.a=a},
du:function du(a,b,c){this.a=a
this.b=b
this.c=c},
f4(a){var t,s,r,q,p,o,n,m,l=$.cp.q(0,a)
if(l==null)l=A.dV("Missing "+a+".\nRun: dart run tools/build_dictionary.dart")
t=A.f([],u.B)
for(s=B.l.av(l),r=s.length,q=0;q<s.length;s.length===r||(0,A.z)(s),++q){p=s[q]
if(p.length===0)continue
o=B.c.aB(p,"\t")
if(o<=0)continue
n=B.c.D(p,0,o)
m=A.cI(B.c.a0(p,o+1),null)
B.a.i(t,new A.X(n,m==null?0:m))}return t},
il(a){var t,s,r,q=new A.cU(new A.az(A.aN(26,null,!1,u.V)))
for(t=a.length,s=0;s<a.length;a.length===t||(0,A.z)(a),++s){r=a[s].a
if(r.length<4)continue
q.i(0,r)}return q},
iv(a,b){var t,s,r,q,p,o,n=A.Z(u.N),m=a.a*a.b,l=new A.dh(A.aN(m,!1,!1,u.y),4,n,a)
for(t=b.a.a,s=a.c,r=s.length,q=0;p=q<m,p;++q){if(p){if(!(q<r))return A.a(s,q)
p=s.charCodeAt(q)===46}else p=!0
if(p)continue
if(!(q<r))return A.a(s,q)
p=s.charCodeAt(q)-65
if(!(p>=0&&p<26))return A.a(t,p)
o=t[p]
if(o==null)continue
l.$3(q,o,1)}return n},
az:function az(a){this.a=a
this.b=null},
cU:function cU(a){this.a=a
this.b=0},
X:function X(a,b){this.a=a
this.b=b},
dh:function dh(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hP(a){var t,s,r,q,p,o
try{for(q=0;q<6;++q){t=B.Y[q]
s=A.dO(a[t])
if(s!=null)$.cp.j(0,"tools\\data\\"+A.i(t),s)}$.d7=A.ij()
$.eY=A.cn("tools\\data\\stoplist.txt")
$.eN=A.cn("tools\\data\\dict_bonus_only.txt")
p=B.d.F(A.Y(["ok",!0,"seedable",$.d7.e.length],u.N,u.K),null)
return p}catch(o){r=A.co(o)
p=u.N
p=B.d.F(A.Y(["error",A.i(r)],p,p),null)
return p}},
hG(a){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f=null
try{t=$.d7
if(t==null){p=u.N
p=B.d.F(A.Y(["error","canoggleGenInit first"],p,p),f)
return p}s=u.c.a(B.d.az(a,f))
r=A.h4(A.i(J.G(s,"kind")))
q=J.G(s,"day")
if(r==null||!A.dS(q)||q<1){p=u.N
p=B.d.F(A.Y(["error","bad request "+a],p,p),f)
return p}l=A.h8()
k=u.N
p=A.Z(k)
j=u.Q.a(J.G(s,"avoid"))
if(j==null)j=B.V
i=j.length
h=0
for(;h<j.length;j.length===i||(0,A.z)(j),++h){o=j[h]
J.dA(p,A.i(o).toUpperCase())}j=J.G(s,"forced")==null?f:A.i(J.G(s,"forced")).toUpperCase()
n=A.ii(p,t,q,j,r,l)
p=u.u
p=B.d.F(n.b==null?A.Y(["error",n.c],k,p):A.Y(["line",n.b,"word",n.a.d],k,p),f)
return p}catch(g){m=A.co(g)
p=u.N
p=B.d.F(A.Y(["error",A.i(m)],p,p),f)
return p}},
ie(a){var t,s,r,q,p,o,n=null
try{t=$.d7
if(t==null){p=u.N
p=B.d.F(A.Y(["error","canoggleGenInit first"],p,p),n)
return p}s=u.c.a(B.d.az(a,n))
if(typeof J.G(s,"word")!="string"){p=u.N
p=B.d.F(A.Y(["error","bad request "+a],p,p),n)
return p}r=A.u(J.G(s,"word")).toUpperCase()
p=B.d.F(A.Y(["inDictionary",t.a.p(0,r),"required",t.b.a.p(0,A.u(r)),"stoplisted",$.eY.p(0,r),"bonusOnly",$.eN.p(0,r)],u.N,u.y),n)
return p}catch(o){q=A.co(o)
p=u.N
p=B.d.F(A.Y(["error",A.i(q)],p,p),n)
return p}},
iM(){var t=v.G
t.canoggleGenInit=A.dP(new A.dp())
t.canoggleGenBuild=A.dP(new A.dq())
t.canoggleGenWordStatus=A.dP(new A.dr())},
dp:function dp(){},
dq:function dq(){},
dr:function dr(){},
fc(a){return v.mangledGlobalNames[a]},
iQ(a){throw A.C(A.ef(a),new Error())},
dv(){throw A.C(A.ef(""),new Error())},
dP(a){var t
if(typeof a=="function")throw A.e(A.dB("Attempting to rewrap a JS function."))
t=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.hI,a)
t[$.e1()]=a
return t},
hI(a,b,c){u.Z.a(a)
if(A.N(c)>=1)return a.$1(b)
return a.$0()},
iT(a){var t,s,r,q,p,o,n,m,l,k,j,i=null
try{k=u.s
t=A.f(a.split("~"),k)
if(J.ao(t)!==3)return i
s=A.f(J.G(t,0).split(","),k)
if(J.ao(s)!==2)return i
r=A.cI(J.G(s,0),i)
q=A.cI(J.G(s,1),i)
if(r==null||q==null||r<=0||q<=0)return i
p=J.G(t,1)
if(J.ao(p)!==r*q)return i
o=A.eP(J.G(t,2),p,!1)
n=J.fv(o,"|")
if(J.ao(n)!==3)return i
m=A.eS(J.G(n,0))
l=A.eS(J.G(n,1))
if(m==null||l==null)return i
J.e3(m,A.fa())
J.e3(l,A.fa())
k=J.G(n,2).length===0?i:J.G(n,2)
k=A.em(new A.aJ(r,q,p),l,k,m)
return k}catch(j){return i}},
im(a,b){var t
A.u(a)
A.u(b)
t=B.b.B(a.length,b.length)
return t!==0?t:B.c.B(a,b)},
eR(a){var t,s,r,q,p,o,n,m,l,k
if(a.length===0)return""
t=A.a0(a,u.N)
B.a.ag(t)
s=new A.ay("")
for(r="",q=0,p="";q<t.length;++q,r=o){o=t[q]
p=o.length
n=r.length
m=B.b.b1(p<n?p:n,0,35)
l=0
for(;;){if(l<m){if(!(l<p))return A.a(o,l)
if(!(l<n))return A.a(r,l)
k=o.charCodeAt(l)===r.charCodeAt(l)}else k=!1
if(!k)break;++l}if(q>0)s.a+=","
p=B.b.bl(l,36).toUpperCase()
p=(s.a+=p)+B.c.a0(o,l)
s.a=p}return p.charCodeAt(0)==0?p:p},
eS(a){var t,s,r,q,p,o,n,m,l
if(a.length===0)return A.f([],u.s)
t=A.f([],u.s)
for(s=a.split(","),r=s.length,q="",p=0;p<r;++p,q=l){o=s[p]
n=o.length
if(n===0)return null
if(0>=n)return A.a(o,0)
m=A.cI(o[0],36)
if(m==null||m>q.length)return null
l=B.c.D(q,0,m)+B.c.a0(o,1)
if(l.length===0)return null
B.a.i(t,l)}return t},
eP(a,b,c){var t,s,r,q,p,o,n,m="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,|"
for(t=b.length,s=5938462,r=0;r<t;++r)s=s*31+b.charCodeAt(r)&2147483647
if(s===0)s=506952121
for(t=a.length,r=0,q="";r<t;++r){s^=s<<13&2147483647
s^=s>>>17
s=(s^s<<5&2147483647)>>>0
p=B.b.K(s,38)
o=a[r]
n=B.c.aB(m,o)
if(n<0){q+=o
continue}q+=m[c?B.b.K(n+p,38):B.b.K(n-p+76,38)]}return q.charCodeAt(0)==0?q:q},
dV(a){return A.aI(A.ep(a))},
d3(a,b,c,d,e){if(c-b<=32)A.ey(a,b,c,d,e)
else A.ex(a,b,c,d,e)},
ey(a,b,c,d,e){var t,s,r,q,p,o
for(t=b+1,s=J.aX(a);t<=c;++t){if(!(t>=0&&t<a.length))return A.a(a,t)
r=a[t]
q=t
for(;;){if(q>b){p=q-1
if(!(p>=0&&p<a.length))return A.a(a,p)
p=d.$2(a[p],r)
if(typeof p!=="number")return p.C()
p=p>0}else p=!1
if(!p)break
o=q-1
if(!(o>=0&&o<a.length))return A.a(a,o)
s.j(a,q,a[o])
q=o}s.j(a,q,r)}},
ex(a2,a3,a4,a5,a6){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=B.b.A(a4-a3+1,6),d=a3+e,c=a4-e,b=B.b.A(a3+a4,2),a=b-e,a0=b+e,a1=a2.length
if(!(d>=0&&d<a1))return A.a(a2,d)
t=a2[d]
if(!(a>=0&&a<a1))return A.a(a2,a)
s=a2[a]
if(!(b>=0&&b<a1))return A.a(a2,b)
r=a2[b]
if(!(a0>=0&&a0<a1))return A.a(a2,a0)
q=a2[a0]
if(!(c>=0&&c<a1))return A.a(a2,c)
p=a2[c]
a1=a5.$2(t,s)
if(typeof a1!=="number")return a1.C()
if(a1>0){o=s
s=t
t=o}a1=a5.$2(q,p)
if(typeof a1!=="number")return a1.C()
if(a1>0){o=p
p=q
q=o}a1=a5.$2(t,r)
if(typeof a1!=="number")return a1.C()
if(a1>0){o=r
r=t
t=o}a1=a5.$2(s,r)
if(typeof a1!=="number")return a1.C()
if(a1>0){o=r
r=s
s=o}a1=a5.$2(t,q)
if(typeof a1!=="number")return a1.C()
if(a1>0){o=q
q=t
t=o}a1=a5.$2(r,q)
if(typeof a1!=="number")return a1.C()
if(a1>0){o=q
q=r
r=o}a1=a5.$2(s,p)
if(typeof a1!=="number")return a1.C()
if(a1>0){o=p
p=s
s=o}a1=a5.$2(s,r)
if(typeof a1!=="number")return a1.C()
if(a1>0){o=r
r=s
s=o}a1=a5.$2(q,p)
if(typeof a1!=="number")return a1.C()
if(a1>0){o=p
p=q
q=o}a1=J.aX(a2)
a1.j(a2,d,t)
a1.j(a2,b,r)
a1.j(a2,c,p)
if(!(a3>=0&&a3<a2.length))return A.a(a2,a3)
a1.j(a2,a,a2[a3])
if(!(a4>=0&&a4<a2.length))return A.a(a2,a4)
a1.j(a2,a0,a2[a4])
n=a3+1
m=a4-1
l=J.ab(a5.$2(s,q),0)
if(l)for(k=n;k<=m;++k){if(!(k<a2.length))return A.a(a2,k)
j=a2[k]
i=a5.$2(j,s)
if(i===0)continue
if(i<0){if(k!==n){if(!(n<a2.length))return A.a(a2,n)
a1.j(a2,k,a2[n])
a1.j(a2,n,j)}++n}else for(;;){if(!(m>=0&&m<a2.length))return A.a(a2,m)
i=a5.$2(a2[m],s)
if(i>0){--m
continue}else{h=a2.length
g=m-1
if(i<0){if(!(n<h))return A.a(a2,n)
a1.j(a2,k,a2[n])
f=n+1
if(!(m<a2.length))return A.a(a2,m)
a1.j(a2,n,a2[m])
a1.j(a2,m,j)
m=g
n=f
break}else{if(!(m<h))return A.a(a2,m)
a1.j(a2,k,a2[m])
a1.j(a2,m,j)
m=g
break}}}}else for(k=n;k<=m;++k){if(!(k<a2.length))return A.a(a2,k)
j=a2[k]
if(a5.$2(j,s)<0){if(k!==n){if(!(n<a2.length))return A.a(a2,n)
a1.j(a2,k,a2[n])
a1.j(a2,n,j)}++n}else if(a5.$2(j,q)>0)for(;;){if(!(m>=0&&m<a2.length))return A.a(a2,m)
if(a5.$2(a2[m],q)>0){--m
if(m<k)break
continue}else{if(!(m<a2.length))return A.a(a2,m)
i=a5.$2(a2[m],s)
h=a2.length
g=m-1
if(i<0){if(!(n<h))return A.a(a2,n)
a1.j(a2,k,a2[n])
f=n+1
if(!(m<a2.length))return A.a(a2,m)
a1.j(a2,n,a2[m])
a1.j(a2,m,j)
n=f}else{if(!(m<h))return A.a(a2,m)
a1.j(a2,k,a2[m])
a1.j(a2,m,j)}m=g
break}}}h=n-1
if(!(h<a2.length))return A.a(a2,h)
a1.j(a2,a3,a2[h])
a1.j(a2,h,s)
h=m+1
if(!(h>=0&&h<a2.length))return A.a(a2,h)
a1.j(a2,a4,a2[h])
a1.j(a2,h,q)
A.d3(a2,a3,n-2,a5,a6)
A.d3(a2,m+2,a4,a5,a6)
if(l)return
if(n<d&&m>c){for(;;){if(!(n<a2.length))return A.a(a2,n)
if(!J.ab(a5.$2(a2[n],s),0))break;++n}for(;;){if(!(m>=0&&m<a2.length))return A.a(a2,m)
if(!J.ab(a5.$2(a2[m],q),0))break;--m}for(k=n;k<=m;++k){if(!(k<a2.length))return A.a(a2,k)
j=a2[k]
if(a5.$2(j,s)===0){if(k!==n){if(!(n<a2.length))return A.a(a2,n)
a1.j(a2,k,a2[n])
a1.j(a2,n,j)}++n}else if(a5.$2(j,q)===0)for(;;){if(!(m>=0&&m<a2.length))return A.a(a2,m)
if(a5.$2(a2[m],q)===0){--m
if(m<k)break
continue}else{if(!(m<a2.length))return A.a(a2,m)
i=a5.$2(a2[m],s)
h=a2.length
g=m-1
if(i<0){if(!(n<h))return A.a(a2,n)
a1.j(a2,k,a2[n])
f=n+1
if(!(m<a2.length))return A.a(a2,m)
a1.j(a2,n,a2[m])
a1.j(a2,m,j)
n=f}else{if(!(m<h))return A.a(a2,m)
a1.j(a2,k,a2[m])
a1.j(a2,m,j)}m=g
break}}}A.d3(a2,n,m,a5,a6)}else A.d3(a2,n,m,a5,a6)}},B={}
var w=[A,J,B]
var $={}
A.dD.prototype={}
J.bS.prototype={
J(a,b){return a===b},
gu(a){return A.bl(a)},
k(a){return"Instance of '"+A.c9(a)+"'"},
gv(a){return A.a9(A.dQ(this))}}
J.bU.prototype={
k(a){return String(a)},
gu(a){return a?519018:218159},
gv(a){return A.a9(u.y)},
$il:1,
$io:1}
J.b6.prototype={
J(a,b){return null==b},
k(a){return"null"},
gu(a){return 0},
$il:1}
J.b8.prototype={$it:1}
J.ah.prototype={
gu(a){return 0},
k(a){return String(a)}}
J.c8.prototype={}
J.aA.prototype={}
J.ag.prototype={
k(a){var t=a[$.fe()]
if(t==null)t=a[$.e1()]
if(t==null)return this.aK(a)
return"JavaScript function for "+J.ap(t)},
$ia3:1}
J.b7.prototype={
gu(a){return 0},
k(a){return String(a)}}
J.b9.prototype={
gu(a){return 0},
k(a){return String(a)}}
J.q.prototype={
i(a,b){A.B(a).c.a(b)
a.$flags&1&&A.aZ(a,29)
a.push(b)},
X(a,b){var t=A.B(a)
return new A.v(a,t.h("o(1)").a(b),t.h("v<1>"))},
M(a,b){var t,s
A.B(a).h("c<1>").a(b)
a.$flags&1&&A.aZ(a,"addAll",2)
if(Array.isArray(b)){this.aO(a,b)
return}for(t=b.length,s=0;s<b.length;b.length===t||(0,A.z)(b),++s)a.push(b[s])},
aO(a,b){var t,s
u.b.a(b)
t=b.length
if(t===0)return
if(a===b)throw A.e(A.K(a))
for(s=0;s<t;++s)a.push(b[s])},
H(a,b){var t,s=A.aN(a.length,"",!1,u.N)
for(t=0;t<a.length;++t)this.j(s,t,A.i(a[t]))
return s.join(b)},
ae(a){return this.H(a,"")},
af(a,b){var t,s,r
A.B(a).h("1(1,1)").a(b)
t=a.length
if(t===0)throw A.e(A.cx())
if(0>=t)return A.a(a,0)
s=a[0]
for(r=1;r<t;++r){s=b.$2(s,a[r])
if(t!==a.length)throw A.e(A.K(a))}return s},
E(a,b){if(!(b<a.length))return A.a(a,b)
return a[b]},
gba(a){var t=a.length
if(t>0)return a[t-1]
throw A.e(A.cx())},
b4(a,b){var t,s
A.B(a).h("o(1)").a(b)
t=a.length
for(s=0;s<t;++s){if(!b.$1(a[s]))return!1
if(a.length!==t)throw A.e(A.K(a))}return!0},
T(a,b){var t,s,r,q,p,o=A.B(a)
o.h("b(1,1)?").a(b)
a.$flags&2&&A.aZ(a,"sort")
t=a.length
if(t<2)return
if(b==null)b=J.hT()
if(t===2){s=a[0]
r=a[1]
o=b.$2(s,r)
if(typeof o!=="number")return o.C()
if(o>0){a[0]=r
a[1]=s}return}q=0
if(o.c.b(null))for(p=0;p<a.length;++p)if(a[p]===void 0){a[p]=null;++q}a.sort(A.ir(b,2))
if(q>0)this.aX(a,q)},
ag(a){return this.T(a,null)},
aX(a,b){var t,s=a.length
for(;t=s-1,s>0;s=t)if(a[t]===null){a[t]=void 0;--b
if(b===0)break}},
aH(a,b){var t,s,r,q
a.$flags&2&&A.aZ(a,"shuffle")
t=a.length
while(t>1){s=b.L(t);--t
r=a.length
if(!(t<r))return A.a(a,t)
q=a[t]
if(!(s>=0&&s<r))return A.a(a,s)
a[t]=a[s]
a[s]=q}},
p(a,b){var t
for(t=0;t<a.length;++t)if(J.ab(a[t],b))return!0
return!1},
gG(a){return a.length===0},
gP(a){return a.length!==0},
k(a){return A.dC(a,"[","]")},
gt(a){return new J.aq(a,a.length,A.B(a).h("aq<1>"))},
gu(a){return A.bl(a)},
gm(a){return a.length},
q(a,b){if(!(b>=0&&b<a.length))throw A.e(A.df(a,b))
return a[b]},
j(a,b,c){A.B(a).c.a(c)
a.$flags&2&&A.aZ(a)
if(!(b>=0&&b<a.length))throw A.e(A.df(a,b))
a[b]=c},
$ic:1,
$ih:1}
J.bT.prototype={
bm(a){var t,s,r
if(!Array.isArray(a))return null
t=a.$flags|0
if((t&4)!==0)s="const, "
else if((t&2)!==0)s="unmodifiable, "
else s=(t&1)!==0?"fixed, ":""
r="Instance of '"+A.c9(a)+"'"
if(s==="")return r
return r+" ("+s+"length: "+a.length+")"}}
J.cy.prototype={}
J.aq.prototype={
gn(){var t=this.d
return t==null?this.$ti.c.a(t):t},
l(){var t,s=this,r=s.a,q=r.length
if(s.b!==q){r=A.z(r)
throw A.e(r)}t=s.c
if(t>=q){s.d=null
return!1}s.d=r[t]
s.c=t+1
return!0},
$iw:1}
J.aL.prototype={
B(a,b){var t
A.eK(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){t=this.gad(b)
if(this.gad(a)===t)return 0
if(this.gad(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gad(a){return a===0?1/a<0:a<0},
b0(a){var t,s
if(a>=0){if(a<=2147483647){t=a|0
return a===t?t:t+1}}else if(a>=-2147483648)return a|0
s=Math.ceil(a)
if(isFinite(s))return s
throw A.e(A.aB(""+a+".ceil()"))},
aA(a){var t,s
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){t=a|0
return a===t?t:t-1}s=Math.floor(a)
if(isFinite(s))return s
throw A.e(A.aB(""+a+".floor()"))},
bk(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.e(A.aB(""+a+".round()"))},
b1(a,b,c){if(B.b.B(b,c)>0)throw A.e(A.ig(b))
if(this.B(a,b)<0)return b
if(this.B(a,c)>0)return c
return a},
bl(a,b){var t,s,r,q,p
if(b<2||b>36)throw A.e(A.aR(b,2,36,"radix",null))
t=a.toString(b)
s=t.length
r=s-1
if(!(r>=0))return A.a(t,r)
if(t.charCodeAt(r)!==41)return t
q=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(t)
if(q==null)A.aI(A.aB("Unexpected toString result: "+t))
s=q.length
if(1>=s)return A.a(q,1)
t=q[1]
if(3>=s)return A.a(q,3)
p=+q[3]
s=q[2]
if(s!=null){t+=s
p-=s.length}return t+B.c.Z("0",p)},
k(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gu(a){var t,s,r,q,p=a|0
if(a===p)return p&536870911
t=Math.abs(a)
s=Math.log(t)/0.6931471805599453|0
r=Math.pow(2,s)
q=t<1?t/r:r/t
return((q*9007199254740992|0)+(q*3542243181176521|0))*599197+s*1259&536870911},
K(a,b){var t=a%b
if(t===0)return 0
if(t>0)return t
if(b<0)return t-b
else return t+b},
aL(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.ap(a,b)},
A(a,b){return(a|0)===a?a/b|0:this.ap(a,b)},
ap(a,b){var t=a/b
if(t>=-2147483648&&t<=2147483647)return t|0
if(t>0){if(t!==1/0)return Math.floor(t)}else if(t>-1/0)return Math.ceil(t)
throw A.e(A.aB("Result of truncating division is "+A.i(t)+": "+A.i(a)+" ~/ "+b))},
a9(a,b){var t
if(a>0)t=this.aZ(a,b)
else{t=b>31?31:b
t=a>>t>>>0}return t},
aZ(a,b){return b>31?0:a>>>b},
gv(a){return A.a9(u.H)},
$iJ:1,
$ik:1,
$iF:1}
J.b5.prototype={
gv(a){return A.a9(u.S)},
$il:1,
$ib:1}
J.bV.prototype={
gv(a){return A.a9(u.i)},
$il:1}
J.af.prototype={
a_(a,b){var t=A.f(a.split(b),u.s)
return t},
aI(a,b){var t=b.length
if(t>a.length)return!1
return b===a.substring(0,t)},
D(a,b,c){return a.substring(b,A.h7(b,c,a.length))},
a0(a,b){return this.D(a,b,null)},
aE(a){var t,s,r,q=a.trim(),p=q.length
if(p===0)return q
if(0>=p)return A.a(q,0)
if(q.charCodeAt(0)===133){t=J.fR(q,1)
if(t===p)return""}else t=0
s=p-1
if(!(s>=0))return A.a(q,s)
r=q.charCodeAt(s)===133?J.fS(q,s):p
if(t===0&&r===p)return q
return q.substring(t,r)},
Z(a,b){var t,s
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.e(B.M)
for(t=a,s="";;){if((b&1)===1)s=t+s
b=b>>>1
if(b===0)break
t+=t}return s},
bg(a,b,c){var t=b-a.length
if(t<=0)return a
return this.Z(c,t)+a},
aB(a,b){var t=a.indexOf(b,0)
return t},
p(a,b){return A.iP(a,b,0)},
B(a,b){var t
A.u(b)
if(a===b)t=0
else t=a<b?-1:1
return t},
k(a){return a},
gu(a){var t,s,r
for(t=a.length,s=0,r=0;r<t;++r){s=s+a.charCodeAt(r)&536870911
s=s+((s&524287)<<10)&536870911
s^=s>>6}s=s+((s&67108863)<<3)&536870911
s^=s>>11
return s+((s&16383)<<15)&536870911},
gv(a){return A.a9(u.N)},
gm(a){return a.length},
$il:1,
$iJ:1,
$iei:1,
$id:1}
A.bY.prototype={
k(a){return"LateInitializationError: "+this.a}}
A.cT.prototype={}
A.b3.prototype={}
A.a_.prototype={
gt(a){var t=this
return new A.au(t,t.gm(t),A.j(t).h("au<a_.E>"))},
gG(a){return this.gm(this)===0},
H(a,b){var t,s,r,q=this,p=q.gm(q)
if(b.length!==0){if(p===0)return""
t=A.i(q.E(0,0))
if(p!==q.gm(q))throw A.e(A.K(q))
for(s=t,r=1;r<p;++r){s=s+b+A.i(q.E(0,r))
if(p!==q.gm(q))throw A.e(A.K(q))}return s.charCodeAt(0)==0?s:s}else{for(r=0,s="";r<p;++r){s+=A.i(q.E(0,r))
if(p!==q.gm(q))throw A.e(A.K(q))}return s.charCodeAt(0)==0?s:s}}}
A.au.prototype={
gn(){var t=this.d
return t==null?this.$ti.c.a(t):t},
l(){var t,s=this,r=s.a,q=J.bF(r),p=q.gm(r)
if(s.b!==p)throw A.e(A.K(r))
t=s.c
if(t>=p){s.d=null
return!1}s.d=q.E(r,t);++s.c
return!0},
$iw:1}
A.av.prototype={
gt(a){return new A.be(J.b_(this.a),this.b,A.j(this).h("be<1,2>"))},
gm(a){return J.ao(this.a)}}
A.as.prototype={}
A.be.prototype={
l(){var t=this,s=t.b
if(s.l()){t.a=t.c.$1(s.gn())
return!0}t.a=null
return!1},
gn(){var t=this.a
return t==null?this.$ti.y[1].a(t):t},
$iw:1}
A.aw.prototype={
gm(a){return J.ao(this.a)},
E(a,b){return this.b.$1(J.fr(this.a,b))}}
A.v.prototype={
gt(a){return new A.aC(J.b_(this.a),this.b,this.$ti.h("aC<1>"))}}
A.aC.prototype={
l(){var t,s
for(t=this.a,s=this.b;t.l();)if(s.$1(t.gn()))return!0
return!1},
gn(){return this.a.gn()},
$iw:1}
A.bq.prototype={
gt(a){var t=this.a
return new A.br(t.gt(t),this.b,A.j(this).h("br<1>"))}}
A.b4.prototype={
gm(a){var t=this.a,s=t.gm(t)
t=this.b
if(s>t)return t
return s}}
A.br.prototype={
l(){if(--this.b>=0)return this.a.l()
this.b=-1
return!1},
gn(){if(this.b<0){this.$ti.c.a(null)
return null}return this.a.gn()},
$iw:1}
A.r.prototype={
sm(a,b){throw A.e(A.aB("Cannot change the length of a fixed-length list"))},
i(a,b){A.aa(a).h("r.E").a(b)
throw A.e(A.aB("Cannot add to a fixed-length list"))}}
A.bz.prototype={$r:"+bonus,required(1,2)",$s:1}
A.b0.prototype={
gG(a){return this.gm(this)===0},
k(a){return A.dG(this)},
$ia7:1}
A.bu.prototype={
gn(){var t=this.d
return t==null?this.$ti.c.a(t):t},
l(){var t=this,s=t.c
if(s>=t.b){t.d=null
return!1}t.d=t.a[s]
t.c=s+1
return!0},
$iw:1}
A.at.prototype={
a6(){var t=this,s=t.$map
if(s==null){s=new A.ba(t.$ti.h("ba<1,2>"))
A.f0(t.a,s)
t.$map=s}return s},
q(a,b){return this.a6().q(0,b)},
O(a,b){this.$ti.h("~(1,2)").a(b)
this.a6().O(0,b)},
gm(a){return this.a6().a}}
A.b1.prototype={
i(a,b){A.j(this).c.a(b)
A.fF()}}
A.b2.prototype={
gm(a){return this.b},
gP(a){return this.b!==0},
gt(a){var t,s=this,r=s.$keys
if(r==null){r=Object.keys(s.a)
s.$keys=r}t=r
return new A.bu(t,t.length,s.$ti.h("bu<1>"))},
p(a,b){if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)}}
A.bR.prototype={
J(a,b){if(b==null)return!1
return b instanceof A.ae&&this.a.J(0,b.a)&&A.dX(this)===A.dX(b)},
gu(a){return A.dH(this.a,A.dX(this),B.f,B.f)},
k(a){var t=B.a.H([A.a9(this.$ti.c)],", ")
return this.a.k(0)+" with "+("<"+t+">")}}
A.ae.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.y[0])},
$S(){return A.iJ(A.de(this.a),this.$ti)}}
A.bn.prototype={}
A.cV.prototype={
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
A.bk.prototype={
k(a){return"Null check operator used on a null value"}}
A.bW.prototype={
k(a){var t,s=this,r="NoSuchMethodError: method not found: '",q=s.b
if(q==null)return"NoSuchMethodError: "+s.a
t=s.c
if(t==null)return r+q+"' ("+s.a+")"
return r+q+"' on '"+t+"' ("+s.a+")"}}
A.cf.prototype={
k(a){var t=this.a
return t.length===0?"Error":"Error: "+t}}
A.cH.prototype={
k(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.H.prototype={
k(a){var t=this.constructor,s=t==null?null:t.name
return"Closure '"+A.fd(s==null?"unknown":s)+"'"},
$ia3:1,
gbp(){return this},
$C:"$1",
$R:1,
$D:null}
A.bJ.prototype={$C:"$0",$R:0}
A.bK.prototype={$C:"$2",$R:2}
A.cd.prototype={}
A.cb.prototype={
k(a){var t=this.$static_name
if(t==null)return"Closure of unknown static method"
return"Closure '"+A.fd(t)+"'"}}
A.aK.prototype={
J(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.aK))return!1
return this.$_target===b.$_target&&this.a===b.a},
gu(a){return(A.e0(this.a)^A.bl(this.$_target))>>>0},
k(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.c9(this.a)+"'")}}
A.ca.prototype={
k(a){return"RuntimeError: "+this.a}}
A.a4.prototype={
gm(a){return this.a},
gG(a){return this.a===0},
gS(){return new A.a6(this,A.j(this).h("a6<1>"))},
au(a){var t,s
if(typeof a=="string"){t=this.b
if(t==null)return!1
return t[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){s=this.c
if(s==null)return!1
return s[a]!=null}else return this.b5(a)},
b5(a){var t=this.d
if(t==null)return!1
return this.W(this.am(t,a),a)>=0},
q(a,b){var t,s,r,q,p=null
if(typeof b=="string"){t=this.b
if(t==null)return p
s=t[b]
r=s==null?p:s.b
return r}else if(typeof b=="number"&&(b&0x3fffffff)===b){q=this.c
if(q==null)return p
s=q[b]
r=s==null?p:s.b
return r}else return this.b6(b)},
b6(a){var t,s,r=this.d
if(r==null)return null
t=this.am(r,a)
s=this.W(t,a)
if(s<0)return null
return t[s].b},
j(a,b,c){var t,s,r,q,p,o,n=this,m=A.j(n)
m.c.a(b)
m.y[1].a(c)
if(typeof b=="string"){t=n.b
n.ah(t==null?n.b=n.a7():t,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){s=n.c
n.ah(s==null?n.c=n.a7():s,b,c)}else{r=n.d
if(r==null)r=n.d=n.a7()
q=n.aa(b)
p=r[q]
if(p==null)r[q]=[n.a8(b,c)]
else{o=n.W(p,b)
if(o>=0)p[o].b=c
else p.push(n.a8(b,c))}}},
aD(a,b){var t,s,r=this,q=A.j(r)
q.c.a(a)
q.h("2()").a(b)
if(r.au(a)){t=r.q(0,a)
return t==null?q.y[1].a(t):t}s=b.$0()
r.j(0,a,s)
return s},
O(a,b){var t,s,r=this
A.j(r).h("~(1,2)").a(b)
t=r.e
s=r.r
while(t!=null){b.$2(t.a,t.b)
if(s!==r.r)throw A.e(A.K(r))
t=t.c}},
ah(a,b,c){var t,s=A.j(this)
s.c.a(b)
s.y[1].a(c)
t=a[b]
if(t==null)a[b]=this.a8(b,c)
else t.b=c},
a8(a,b){var t=this,s=A.j(t),r=new A.cD(s.c.a(a),s.y[1].a(b))
if(t.e==null)t.e=t.f=r
else t.f=t.f.c=r;++t.a
t.r=t.r+1&1073741823
return r},
aa(a){return J.P(a)&1073741823},
am(a,b){return a[this.aa(b)]},
W(a,b){var t,s
if(a==null)return-1
t=a.length
for(s=0;s<t;++s)if(J.ab(a[s].a,b))return s
return-1},
k(a){return A.dG(this)},
a7(){var t=Object.create(null)
t["<non-identifier-key>"]=t
delete t["<non-identifier-key>"]
return t},
$idF:1}
A.cD.prototype={}
A.a6.prototype={
gm(a){return this.a.a},
gG(a){return this.a.a===0},
gt(a){var t=this.a
return new A.bd(t,t.r,t.e,this.$ti.h("bd<1>"))}}
A.bd.prototype={
gn(){return this.d},
l(){var t,s=this,r=s.a
if(s.b!==r.r)throw A.e(A.K(r))
t=s.c
if(t==null){s.d=null
return!1}else{s.d=t.a
s.c=t.c
return!0}},
$iw:1}
A.cE.prototype={
gm(a){return this.a.a},
gt(a){var t=this.a
return new A.S(t,t.r,t.e,this.$ti.h("S<1>"))}}
A.S.prototype={
gn(){return this.d},
l(){var t,s=this,r=s.a
if(s.b!==r.r)throw A.e(A.K(r))
t=s.c
if(t==null){s.d=null
return!1}else{s.d=t.b
s.c=t.c
return!0}},
$iw:1}
A.a5.prototype={
gm(a){return this.a.a},
gt(a){var t=this.a
return new A.bc(t,t.r,t.e,this.$ti.h("bc<1,2>"))}}
A.bc.prototype={
gn(){var t=this.d
t.toString
return t},
l(){var t,s=this,r=s.a
if(s.b!==r.r)throw A.e(A.K(r))
t=s.c
if(t==null){s.d=null
return!1}else{s.d=new A.Q(t.a,t.b,s.$ti.h("Q<1,2>"))
s.c=t.c
return!0}},
$iw:1}
A.ba.prototype={
aa(a){return A.iq(a)&1073741823},
W(a,b){var t,s
if(a==null)return-1
t=a.length
for(s=0;s<t;++s)if(J.ab(a[s].a,b))return s
return-1}}
A.dk.prototype={
$1(a){return this.a(a)},
$S:5}
A.dl.prototype={
$2(a,b){return this.a(a,b)},
$S:9}
A.dm.prototype={
$1(a){return this.a(A.u(a))},
$S:10}
A.al.prototype={
k(a){return this.aq(!1)},
aq(a){var t,s,r,q,p,o=this.aS(),n=this.an(),m=(a?"Record ":"")+"("
for(t=o.length,s="",r=0;r<t;++r,s=", "){m+=s
q=o[r]
if(typeof q=="string")m=m+q+": "
if(!(r<n.length))return A.a(n,r)
p=n[r]
m=a?m+A.el(p):m+A.i(p)}m+=")"
return m.charCodeAt(0)==0?m:m},
aS(){var t,s=this.$s
while($.d2.length<=s)B.a.i($.d2,null)
t=$.d2[s]
if(t==null){t=this.aQ()
B.a.j($.d2,s,t)}return t},
aQ(){var t,s,r,q=this.$r,p=q.indexOf("("),o=q.substring(1,p),n=q.substring(p),m=n==="()"?0:n.replace(/[^,]/g,"").length+1,l=A.f(new Array(m),u.f)
for(t=0;t<m;++t)l[t]=t
if(o!==""){s=o.split(",")
t=s.length
for(r=m;t>0;){--r;--t
B.a.j(l,r,s[t])}}l=A.fW(l,!1,u.K)
l.$flags=3
return l}}
A.aS.prototype={
an(){return[this.a,this.b]},
J(a,b){if(b==null)return!1
return b instanceof A.aS&&this.$s===b.$s&&J.ab(this.a,b.a)&&J.ab(this.b,b.b)},
gu(a){return A.dH(this.$s,this.a,this.b,B.f)}}
A.aO.prototype={
gv(a){return B.ah},
$il:1}
A.bh.prototype={}
A.bZ.prototype={
gv(a){return B.ai},
$il:1}
A.aP.prototype={
gm(a){return a.length},
$iL:1}
A.bf.prototype={
j(a,b,c){A.eI(c)
a.$flags&2&&A.aZ(a)
A.eO(b,a,a.length)
a[b]=c},
$ic:1,
$ih:1}
A.bg.prototype={
j(a,b,c){A.N(c)
a.$flags&2&&A.aZ(a)
A.eO(b,a,a.length)
a[b]=c},
$ic:1,
$ih:1}
A.c_.prototype={
gv(a){return B.aj},
$il:1}
A.c0.prototype={
gv(a){return B.ak},
$il:1}
A.c1.prototype={
gv(a){return B.al},
$il:1}
A.c2.prototype={
gv(a){return B.am},
$il:1}
A.c3.prototype={
gv(a){return B.an},
$il:1}
A.c4.prototype={
gv(a){return B.ap},
$il:1}
A.c5.prototype={
gv(a){return B.aq},
$il:1}
A.bi.prototype={
gv(a){return B.ar},
gm(a){return a.length},
$il:1}
A.c6.prototype={
gv(a){return B.as},
gm(a){return a.length},
$il:1}
A.bv.prototype={}
A.bw.prototype={}
A.bx.prototype={}
A.by.prototype={}
A.U.prototype={
h(a){return A.bE(v.typeUniverse,this,a)},
a1(a){return A.eF(v.typeUniverse,this,a)}}
A.ch.prototype={}
A.cm.prototype={
k(a){return A.I(this.a,null)}}
A.cg.prototype={
k(a){return this.a}}
A.aU.prototype={}
A.M.prototype={
gn(){var t=this.b
return t==null?this.$ti.c.a(t):t},
aY(a,b){var t,s,r
a=A.N(a)
b=b
t=this.a
for(;;)try{s=t(this,a,b)
return s}catch(r){b=r
a=1}},
l(){var t,s,r,q,p=this,o=null,n=0
for(;;){t=p.d
if(t!=null)try{if(t.l()){p.b=t.gn()
return!0}else p.d=null}catch(s){o=s
n=1
p.d=null}r=p.aY(n,o)
if(1===r)return!0
if(0===r){p.b=null
q=p.e
if(q==null||q.length===0){p.a=A.ez
return!1}if(0>=q.length)return A.a(q,-1)
p.a=q.pop()
n=0
o=null
continue}if(2===r){n=0
o=null
continue}if(3===r){o=p.c
p.c=null
q=p.e
if(q==null||q.length===0){p.b=null
p.a=A.ez
throw o
return!1}if(0>=q.length)return A.a(q,-1)
p.a=q.pop()
n=1
continue}throw A.e(A.ep("sync*"))}return!1},
bq(a){var t,s,r=this
if(a instanceof A.aT){t=a.a()
s=r.e
if(s==null)s=r.e=[]
B.a.i(s,r.a)
r.a=t
return 2}else{r.d=J.b_(a)
return 2}},
$iw:1}
A.aT.prototype={
gt(a){return new A.M(this.a(),this.$ti.h("M<1>"))}}
A.cc.prototype={}
A.V.prototype={
aV(){return new A.V(A.j(this).h("V<1>"))},
gt(a){var t=this,s=new A.aD(t,t.r,A.j(t).h("aD<1>"))
s.c=t.e
return s},
gm(a){return this.a},
gP(a){return this.a!==0},
p(a,b){var t,s
if(typeof b=="string"&&b!=="__proto__"){t=this.b
if(t==null)return!1
return u.g.a(t[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){s=this.c
if(s==null)return!1
return u.g.a(s[b])!=null}else return this.aR(b)},
aR(a){var t=this.d
if(t==null)return!1
return this.al(t[this.aj(a)],a)>=0},
i(a,b){var t,s,r=this
A.j(r).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){t=r.b
return r.ai(t==null?r.b=A.dL():t,b)}else if(typeof b=="number"&&(b&1073741823)===b){s=r.c
return r.ai(s==null?r.c=A.dL():s,b)}else return r.aN(b)},
aN(a){var t,s,r,q=this
A.j(q).c.a(a)
t=q.d
if(t==null)t=q.d=A.dL()
s=q.aj(a)
r=t[s]
if(r==null)t[s]=[q.a3(a)]
else{if(q.al(r,a)>=0)return!1
r.push(q.a3(a))}return!0},
ai(a,b){A.j(this).c.a(b)
if(u.g.a(a[b])!=null)return!1
a[b]=this.a3(b)
return!0},
aU(){this.r=this.r+1&1073741823},
a3(a){var t,s=this,r=new A.ck(A.j(s).c.a(a))
if(s.e==null)s.e=s.f=r
else{t=s.f
t.toString
r.c=t
s.f=t.b=r}++s.a
s.aU()
return r},
aj(a){return J.P(a)&1073741823},
al(a,b){var t,s
if(a==null)return-1
t=a.length
for(s=0;s<t;++s)if(J.ab(a[s].a,b))return s
return-1},
$ieg:1}
A.ck.prototype={}
A.aD.prototype={
gn(){var t=this.d
return t==null?this.$ti.c.a(t):t},
l(){var t=this,s=t.c,r=t.a
if(t.b!==r.r)throw A.e(A.K(r))
else if(s==null){t.d=null
return!1}else{t.d=t.$ti.h("1?").a(s.a)
t.c=s.b
return!0}},
$iw:1}
A.m.prototype={
gt(a){return new A.au(a,a.length,A.aa(a).h("au<m.E>"))},
E(a,b){if(!(b<a.length))return A.a(a,b)
return a[b]},
gG(a){return a.length===0},
gP(a){return a.length!==0},
p(a,b){var t,s=a.length
for(t=0;t<s;++t)if(a[t]===b)return!0
return!1},
X(a,b){var t=A.aa(a)
return new A.v(a,t.h("o(m.E)").a(b),t.h("v<m.E>"))},
i(a,b){var t
A.aa(a).h("m.E").a(b)
t=a.length
this.sm(a,t+1)
if(!(t<a.length))return A.a(a,t)
a[t]=b},
k(a){return A.dC(a,"[","]")}}
A.E.prototype={
O(a,b){var t,s,r,q=A.j(this)
q.h("~(E.K,E.V)").a(b)
for(t=this.gS(),t=t.gt(t),q=q.h("E.V");t.l();){s=t.gn()
r=this.q(0,s)
b.$2(s,r==null?q.a(r):r)}},
gm(a){var t=this.gS()
return t.gm(t)},
gG(a){var t=this.gS()
return t.gG(t)},
k(a){return A.dG(this)},
$ia7:1}
A.cG.prototype={
$2(a,b){var t,s=this.a
if(!s.a)this.b.a+=", "
s.a=!1
s=this.b
t=A.i(a)
s.a=(s.a+=t)+": "
t=A.i(b)
s.a+=t},
$S:6}
A.aj.prototype={
gP(a){return this.gm(this)!==0},
M(a,b){var t
for(t=J.b_(A.j(this).h("c<1>").a(b));t.l();)this.i(0,t.gn())},
k(a){return A.dC(this,"{","}")},
$ic:1,
$iai:1}
A.bA.prototype={
b7(a){var t,s,r,q=this,p=q.aV()
for(t=A.dK(q,q.r,A.j(q).c),s=t.$ti.c;t.l();){r=t.d
if(r==null)r=s.a(r)
if(a.p(0,r))p.i(0,r)}return p}}
A.ci.prototype={
q(a,b){var t,s=this.b
if(s==null)return this.c.q(0,b)
else if(typeof b!="string")return null
else{t=s[b]
return typeof t=="undefined"?this.aW(b):t}},
gm(a){return this.b==null?this.c.a:this.V().length},
gG(a){return this.gm(0)===0},
gS(){if(this.b==null){var t=this.c
return new A.a6(t,A.j(t).h("a6<1>"))}return new A.cj(this)},
O(a,b){var t,s,r,q,p=this
u.cQ.a(b)
if(p.b==null)return p.c.O(0,b)
t=p.V()
for(s=0;s<t.length;++s){r=t[s]
q=p.b[r]
if(typeof q=="undefined"){q=A.d6(p.a[r])
p.b[r]=q}b.$2(r,q)
if(t!==p.c)throw A.e(A.K(p))}},
V(){var t=u.Q.a(this.c)
if(t==null)t=this.c=A.f(Object.keys(this.a),u.s)
return t},
aW(a){var t
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
t=A.d6(this.a[a])
return this.b[a]=t}}
A.cj.prototype={
gm(a){return this.a.gm(0)},
E(a,b){var t=this.a
if(t.b==null)t=t.gS().E(0,b)
else{t=t.V()
if(!(b<t.length))return A.a(t,b)
t=t[b]}return t},
gt(a){var t=this.a
if(t.b==null){t=t.gS()
t=t.gt(t)}else{t=t.V()
t=new J.aq(t,t.length,A.B(t).h("aq<1>"))}return t}}
A.bL.prototype={}
A.bN.prototype={}
A.bb.prototype={
k(a){var t=A.bP(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+t}}
A.bX.prototype={
k(a){return"Cyclic error in JSON stringify"}}
A.cz.prototype={
az(a,b){var t=A.i6(a,this.gb2().a)
return t},
F(a,b){var t=A.hh(a,this.gb3().b,null)
return t},
gb3(){return B.R},
gb2(){return B.Q}}
A.cB.prototype={}
A.cA.prototype={}
A.d0.prototype={
aG(a){var t,s,r,q,p,o,n=a.length
for(t=this.c,s=0,r=0;r<n;++r){q=a.charCodeAt(r)
if(q>92){if(q>=55296){p=q&64512
if(p===55296){o=r+1
o=!(o<n&&(a.charCodeAt(o)&64512)===56320)}else o=!1
if(!o)if(p===56320){p=r-1
p=!(p>=0&&(a.charCodeAt(p)&64512)===55296)}else p=!1
else p=!0
if(p){if(r>s)t.a+=B.c.D(a,s,r)
s=r+1
p=A.D(92)
t.a+=p
p=A.D(117)
t.a+=p
p=A.D(100)
t.a+=p
p=q>>>8&15
p=A.D(p<10?48+p:87+p)
t.a+=p
p=q>>>4&15
p=A.D(p<10?48+p:87+p)
t.a+=p
p=q&15
p=A.D(p<10?48+p:87+p)
t.a+=p}}continue}if(q<32){if(r>s)t.a+=B.c.D(a,s,r)
s=r+1
p=A.D(92)
t.a+=p
switch(q){case 8:p=A.D(98)
t.a+=p
break
case 9:p=A.D(116)
t.a+=p
break
case 10:p=A.D(110)
t.a+=p
break
case 12:p=A.D(102)
t.a+=p
break
case 13:p=A.D(114)
t.a+=p
break
default:p=A.D(117)
t.a+=p
p=A.D(48)
t.a=(t.a+=p)+p
p=q>>>4&15
p=A.D(p<10?48+p:87+p)
t.a+=p
p=q&15
p=A.D(p<10?48+p:87+p)
t.a+=p
break}}else if(q===34||q===92){if(r>s)t.a+=B.c.D(a,s,r)
s=r+1
p=A.D(92)
t.a+=p
p=A.D(q)
t.a+=p}}if(s===0)t.a+=a
else if(s<n)t.a+=B.c.D(a,s,n)},
a2(a){var t,s,r,q
for(t=this.a,s=t.length,r=0;r<s;++r){q=t[r]
if(a==null?q==null:a===q)throw A.e(new A.bX(a,null))}B.a.i(t,a)},
Y(a){var t,s,r,q,p=this
if(p.aF(a))return
p.a2(a)
try{t=p.b.$1(a)
if(!p.aF(t)){r=A.ee(a,null,p.gao())
throw A.e(r)}r=p.a
if(0>=r.length)return A.a(r,-1)
r.pop()}catch(q){s=A.co(q)
r=A.ee(a,s,p.gao())
throw A.e(r)}},
aF(a){var t,s,r=this
if(typeof a=="number"){if(!isFinite(a))return!1
r.c.a+=B.h.k(a)
return!0}else if(a===!0){r.c.a+="true"
return!0}else if(a===!1){r.c.a+="false"
return!0}else if(a==null){r.c.a+="null"
return!0}else if(typeof a=="string"){t=r.c
t.a+='"'
r.aG(a)
t.a+='"'
return!0}else if(u.j.b(a)){r.a2(a)
r.bn(a)
t=r.a
if(0>=t.length)return A.a(t,-1)
t.pop()
return!0}else if(u.J.b(a)){r.a2(a)
s=r.bo(a)
t=r.a
if(0>=t.length)return A.a(t,-1)
t.pop()
return s}else return!1},
bn(a){var t,s=this.c
s.a+="["
if(J.ft(a)){if(0>=a.length)return A.a(a,0)
this.Y(a[0])
for(t=1;t<a.length;++t){s.a+=","
this.Y(a[t])}}s.a+="]"},
bo(a){var t,s,r,q,p,o,n=this,m={}
if(a.gG(a)){n.c.a+="{}"
return!0}t=a.gm(a)*2
s=A.aN(t,null,!1,u.X)
r=m.a=0
m.b=!0
a.O(0,new A.d1(m,s))
if(!m.b)return!1
q=n.c
q.a+="{"
for(p='"';r<t;r+=2,p=',"'){q.a+=p
n.aG(A.u(s[r]))
q.a+='":'
o=r+1
if(!(o<t))return A.a(s,o)
n.Y(s[o])}q.a+="}"
return!0}}
A.d1.prototype={
$2(a,b){var t,s
if(typeof a!="string")this.a.b=!1
t=this.b
s=this.a
B.a.j(t,s.a++,a)
B.a.j(t,s.a++,b)},
$S:6}
A.d_.prototype={
gao(){var t=this.c.a
return t.charCodeAt(0)==0?t:t}}
A.cC.prototype={
av(a){var t,s,r,q,p=A.f([],u.s),o=a.length
for(t=0,s=0,r=0;r<o;++r,s=q){q=a.charCodeAt(r)
if(q!==13){if(q!==10)continue
if(s===13){t=r+1
continue}}B.a.i(p,B.c.D(a,t,r))
t=r+1}if(t<o)B.a.i(p,B.c.D(a,t,o))
return p}}
A.cr.prototype={
$0(){var t=this
return A.aI(A.dB("("+t.a+", "+t.b+", "+t.c+", "+t.d+", "+t.e+", "+t.f+", "+t.r+", "+t.w+")"))},
$S:11}
A.ad.prototype={
U(a){var t=1000,s=B.b.K(a,t),r=B.b.A(a-s,t),q=this.b+s,p=B.b.K(q,t),o=this.a+B.b.A(q-p,t)+r
if(o<-864e13||o>864e13)A.aI(A.aR(o,-864e13,864e13,"millisecondsSinceEpoch",null))
if(o===864e13&&p!==0)A.aI(A.fw(p,"microsecond","Time including microseconds is outside valid range"))
return new A.ad(o,p,!0)},
J(a,b){var t
if(b==null)return!1
t=!1
if(b instanceof A.ad)if(this.a===b.a)t=this.b===b.b
return t},
gu(a){return A.dH(this.a,this.b,B.f,B.f)},
B(a,b){var t
u.k.a(b)
t=B.b.B(this.a,b.a)
if(t!==0)return t
return B.b.B(this.b,b.b)},
k(a){var t=this,s=A.fH(A.h2(t)),r=A.bO(A.h0(t)),q=A.bO(A.fX(t)),p=A.bO(A.fY(t)),o=A.bO(A.h_(t)),n=A.bO(A.h1(t)),m=A.ea(A.fZ(t)),l=t.b,k=l===0?"":A.ea(l)
return s+"-"+r+"-"+q+" "+p+":"+o+":"+n+"."+m+k+"Z"},
$iJ:1}
A.ar.prototype={
J(a,b){if(b==null)return!1
return b instanceof A.ar&&this.a===b.a},
gu(a){return B.b.gu(this.a)},
B(a,b){return B.b.B(this.a,u.d.a(b).a)},
k(a){var t,s,r,q,p,o=this.a,n=B.b.A(o,36e8),m=o%36e8
if(o<0){n=0-n
o=0-m
t="-"}else{o=m
t=""}s=B.b.A(o,6e7)
o%=6e7
r=s<10?"0":""
q=B.b.A(o,1e6)
p=q<10?"0":""
return t+n+":"+r+s+":"+p+q+"."+B.c.bg(B.b.k(o%1e6),6,"0")},
$iJ:1}
A.cX.prototype={
k(a){return this.ak()}}
A.p.prototype={}
A.bG.prototype={
k(a){var t=this.a
if(t!=null)return"Assertion failed: "+A.bP(t)
return"Assertion failed"}}
A.bs.prototype={}
A.a2.prototype={
ga5(){return"Invalid argument"+(!this.a?"(s)":"")},
ga4(){return""},
k(a){var t=this,s=t.c,r=s==null?"":" ("+s+")",q=t.d,p=q==null?"":": "+q,o=t.ga5()+r+p
if(!t.a)return o
return o+t.ga4()+": "+A.bP(t.gab())},
gab(){return this.b}}
A.aQ.prototype={
gab(){return A.eL(this.b)},
ga5(){return"RangeError"},
ga4(){var t,s=this.e,r=this.f
if(s==null)t=r!=null?": Not less than or equal to "+A.i(r):""
else if(r==null)t=": Not greater than or equal to "+A.i(s)
else if(r>s)t=": Not in inclusive range "+A.i(s)+".."+A.i(r)
else t=r<s?": Valid value range is empty":": Only valid value is "+A.i(s)
return t}}
A.bQ.prototype={
gab(){return A.N(this.b)},
ga5(){return"RangeError"},
ga4(){if(A.N(this.b)<0)return": index must not be negative"
var t=this.f
if(t===0)return": no indices are valid"
return": index should be less than "+t},
gm(a){return this.f}}
A.bt.prototype={
k(a){return"Unsupported operation: "+this.a}}
A.ce.prototype={
k(a){return"UnimplementedError: "+this.a}}
A.bp.prototype={
k(a){return"Bad state: "+this.a}}
A.bM.prototype={
k(a){var t=this.a
if(t==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.bP(t)+"."}}
A.c7.prototype={
k(a){return"Out of Memory"},
$ip:1}
A.bo.prototype={
k(a){return"Stack Overflow"},
$ip:1}
A.cY.prototype={
k(a){return"Exception: "+this.a}}
A.ct.prototype={
k(a){var t=this.a,s=""!==t?"FormatException: "+t:"FormatException"
return s}}
A.c.prototype={
X(a,b){var t=A.j(this)
return new A.v(this,t.h("o(c.E)").a(b),t.h("v<c.E>"))},
af(a,b){var t,s
A.j(this).h("c.E(c.E,c.E)").a(b)
t=this.gt(this)
if(!t.l())throw A.e(A.cx())
s=t.gn()
while(t.l())s=b.$2(s,t.gn())
return s},
H(a,b){var t,s,r=this.gt(this)
if(!r.l())return""
t=J.ap(r.gn())
if(!r.l())return t
if(b.length===0){s=t
do s+=J.ap(r.gn())
while(r.l())}else{s=t
do s=s+b+J.ap(r.gn())
while(r.l())}return s.charCodeAt(0)==0?s:s},
gm(a){var t,s=this.gt(this)
for(t=0;s.l();)++t
return t},
E(a,b){var t,s
A.en(b,"index")
t=this.gt(this)
for(s=b;t.l();){if(s===0)return t.gn();--s}throw A.e(A.ec(b,b-s,this,"index"))},
k(a){return A.fN(this,"(",")")}}
A.Q.prototype={
k(a){return"MapEntry("+A.i(this.a)+": "+A.i(this.b)+")"}}
A.bj.prototype={
gu(a){return A.n.prototype.gu.call(this,0)},
k(a){return"null"}}
A.n.prototype={$in:1,
J(a,b){return this===b},
gu(a){return A.bl(this)},
k(a){return"Instance of '"+A.c9(this)+"'"},
gv(a){return A.iD(this)},
toString(){return this.k(this)}}
A.ay.prototype={
gm(a){return this.a.length},
k(a){var t=this.a
return t.charCodeAt(0)==0?t:t},
$iha:1}
A.cl.prototype={
aM(a){var t,s,r,q,p,o,n,m=this,l=4294967296,k=a<0?-1:0
do{t=a>>>0
a=B.b.A(a-t,l)
s=a>>>0
a=B.b.A(a-s,l)
r=(~t>>>0)+(t<<21>>>0)
q=r>>>0
s=(~s>>>0)+((s<<21|t>>>11)>>>0)+B.b.A(r-q,l)>>>0
r=((q^(q>>>24|s<<8))>>>0)*265
t=r>>>0
s=((s^s>>>24)>>>0)*265+B.b.A(r-t,l)>>>0
r=((t^(t>>>14|s<<18))>>>0)*21
t=r>>>0
s=((s^s>>>14)>>>0)*21+B.b.A(r-t,l)>>>0
t=(t^(t>>>28|s<<4))>>>0
s=(s^s>>>28)>>>0
r=(t<<31>>>0)+t
q=r>>>0
p=B.b.A(r-q,l)
r=m.a*1037
o=m.a=r>>>0
n=m.b*1037+B.b.A(r-o,l)>>>0
m.b=n
o=(o^q)>>>0
m.a=o
p=(n^s+((s<<31|t>>>1)>>>0)+p>>>0)>>>0
m.b=p}while(a!==k)
if(p===0&&o===0)m.a=23063
m.N()
m.N()
m.N()
m.N()},
N(){var t=this,s=t.a,r=4294901760*s,q=r>>>0,p=55905*s,o=p>>>0,n=o+q+t.b
s=n>>>0
t.a=s
t.b=B.b.A(p-o+(r-q)+(n-s),4294967296)>>>0},
L(a){var t,s,r,q=this
if(a<=0||a>4294967296)throw A.e(A.h6("max must be in range 0 < max \u2264 2^32, was "+a))
t=a-1
if((a&t)>>>0===0){q.N()
return(q.a&t)>>>0}do{q.N()
s=q.a
r=s%a}while(s-r+a>=4294967296)
return r},
be(){this.N()
return(this.a&1)===0},
$ih5:1}
A.aJ.prototype={
gbh(){var t,s,r,q,p,o
for(t=this.a*this.b,s=this.c,r=s.length,q=0,p=0;o=p<t,o;++p){if(o){if(!(p<r))return A.a(s,p)
o=s.charCodeAt(p)===46}else o=!0
if(!o)++q}return q},
R(a){return new A.aT(this.bc(a),u.E)},
bc(a){var t=this
return function(){var s=a
var r=0,q=2,p=[],o,n,m,l,k,j,i,h,g,f,e,d,c,b,a0,a1
return function $async$R(a2,a3,a4){if(a3===1){p.push(a4)
r=q}for(;;)switch(r){case 0:if(!(s>=0&&s<t.a*t.b)){r=1
break}o=t.a
n=B.b.K(s,o)
m=B.b.aL(s,o)
l=t.b,k=o*l,j=t.c,i=j.length,h=-1
case 3:if(!(h<=1)){r=5
break}g=m+h,f=h===0,e=g>=0,d=g>=l,c=-1
case 6:if(!(c<=1)){r=8
break}if(c===0&&f){r=7
break}b=n+c
if(b<0||!e||b>=o||d){r=7
break}a0=g*o+b
if(a0>=0&&a0<k){if(!(a0>=0&&a0<i)){A.a(j,a0)
r=1
break}a1=j.charCodeAt(a0)===46}else a1=!0
r=!a1?9:10
break
case 9:r=11
return a2.b=a0,1
case 11:case 10:case 7:++c
r=6
break
case 8:case 4:++h
r=3
break
case 5:case 1:return 0
case 2:return a2.c=p.at(-1),3}}}},
gac(){var t,s,r,q,p,o=this.aT()
if(o==null)return!0
t=A.fU([o],u.S)
s=A.f([o],u.t)
while(r=s.length,r!==0){if(0>=r)return A.a(s,-1)
r=this.R(s.pop())
q=r.$ti
r=new A.M(r.a(),q.h("M<1>"))
q=q.c
while(r.l()){p=r.b
if(p==null)p=q.a(p)
if(t.i(0,p))B.a.i(s,p)}}return t.a===this.gbh()},
aT(){var t,s,r,q,p
for(t=this.a*this.b,s=this.c,r=s.length,q=0;p=q<t,p;++q){if(p){if(!(q<r))return A.a(s,q)
p=s.charCodeAt(q)===46}else p=!0
if(!p)return q}return null},
k(a){var t,s,r,q,p,o
for(t=this.b,s=this.c,r=this.a,q=0,p="";q<t;q=o){o=q+1
p+=B.c.D(s,q*r,o*r)+"\n"}return p.charCodeAt(0)==0?p:p}}
A.di.prototype={
$1(a){var t,s,r,q,p,o,n,m=this,l=m.a,k=m.b
if(l.length>=k)return
t=m.c
B.a.i(t,a)
s=t.length
r=m.d
q=r.length
if(s===q){k=A.a0(t,u.S)
B.a.i(l,k)}else{if(!(s<q))return A.a(r,s)
p=r.charCodeAt(s)
for(s=m.e,r=s.R(a),q=r.$ti,r=new A.M(r.a(),q.h("M<1>")),s=s.c,o=s.length,q=q.c;r.l();){n=r.b
if(n==null)n=q.a(n)
if(B.a.p(t,n))continue
if(n>>>0!==n||n>=o)return A.a(s,n)
if(s.charCodeAt(n)!==p)continue
m.$1(n)
if(l.length>=k)break}}if(0>=t.length)return A.a(t,-1)
t.pop()},
$S:7}
A.dd.prototype={
$1(a){var t,s,r,q,p,o,n=this,m=n.a
B.a.i(m,a)
t=m.length
s=n.b
r=s.length
if(t===r)n.c.M(0,m)
else{if(!(t<r))return A.a(s,t)
q=s.charCodeAt(t)
for(t=n.d,s=t.R(a),r=s.$ti,s=new A.M(s.a(),r.h("M<1>")),t=t.c,p=t.length,r=r.c;s.l();){o=s.b
if(o==null)o=r.a(o)
if(B.a.p(m,o))continue
if(o>>>0!==o||o>=p)return A.a(t,o)
if(t.charCodeAt(o)!==q)continue
n.$1(o)}}if(0>=m.length)return A.a(m,-1)
m.pop()},
$S:7}
A.A.prototype={
gaC(){return this.a*this.b-this.c}}
A.bm.prototype={
ak(){return"PuzzleKind."+this.b}}
A.cJ.prototype={
gbj(){var t,s,r,q,p,o,n=this,m=n.x
if(m===$){t=A.T(u.N,u.r)
for(s=n.b,r=s.length,q=n.a,p=0;p<s.length;s.length===r||(0,A.z)(s),++p){o=s[p]
t.j(0,o,A.io(q,o))}n.x!==$&&A.dv()
n.x=t
m=t}return m},
aP(){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7=u.N,a8=A.T(a7,u.G)
for(t=this.b,s=t.length,r=this.a,q=0;q<t.length;t.length===s||(0,A.z)(t),++q){p=t[q]
a8.j(0,p,A.f1(r,p,64))}s=u.S
r=A.T(a7,s)
for(o=0;o<t.length;++o)r.j(0,t[o],o)
n=A.a0(t,a7)
B.a.T(n,new A.cK(a8,r))
r=u.L
m=A.T(a7,r)
l=A.Z(s)
for(k=n.length,q=0;q<n.length;n.length===k||(0,A.z)(n),++q){p=n[q]
for(j=a8.q(0,p),i=j.length,h=B.n,g=-1,f=0;f<j.length;j.length===i||(0,A.z)(j),++f){e=j[f]
d=J.e4(e,new A.cL(l)).gm(0)
if(d>g){g=d
h=e}}m.j(0,p,h)
l.M(0,h)}for(k=m.$ti.h("S<2>"),c=!0;c;){b=A.T(s,s)
for(j=new A.S(m,m.r,m.e,k);j.l();){i=j.d
for(a=i.length,q=0;q<i.length;i.length===a||(0,A.z)(i),++q){a0=i[q]
a1=b.q(0,a0)
b.j(0,a0,(a1==null?0:a1)+1)}}for(j=this.gbi(),i=A.j(j),a=i.h("o(1)").a(new A.cM(b)),j=j.gt(0),i=new A.aC(j,a,i.h("aC<1>")),c=!1;i.l();){a=j.gn()
for(a1=n.length,q=0;q<n.length;n.length===a1||(0,A.z)(n),++q){p=n[q]
a2=m.q(0,p)
a2.toString
a2=J.e4(a2,new A.cN(b))
a3=A.a0(a2,a2.$ti.h("c.E"))
a2=a8.q(0,p)
a2.toString
a4=A.B(a2)
a5=new A.v(a2,a4.h("o(1)").a(new A.cO(a,a3)),a4.h("v<1>"))
if(!a5.gt(0).l())continue
a6=a5.gt(0)
if(!a6.l())A.aI(A.cx())
m.j(0,p,a6.gn())
c=!0
break}if(c)break}}a7=A.T(a7,r)
for(a8=t.length,q=0;q<t.length;t.length===a8||(0,A.z)(t),++q){p=t[q]
s=m.q(0,p)
s.toString
a7.j(0,p,s)}return a7},
gbi(){var t,s,r,q=this,p=q.Q
if(p===$){t=A.Z(u.S)
for(s=q.gbj(),s=new A.S(s,s.r,s.e,A.j(s).h("S<2>"));s.l();){r=s.d
for(r=r.gt(r);r.l();)t.i(0,A.N(r.gn()))}q.Q!==$&&A.dv()
q.Q=t
p=t}return p},
gaw(){var t,s=this,r=s.as
if(r===$){t=new A.cP(s).$0()
s.as!==$&&A.dv()
s.as=t
r=t}return r},
k(a){var t=this.a
return"Puzzle("+t.a+"x"+t.b+", "+this.b.length+" required, "+this.c.length+" bonus)"}}
A.cK.prototype={
$2(a,b){var t,s,r
A.u(a)
A.u(b)
t=this.a
s=B.b.B(t.q(0,a).length,t.q(0,b).length)
if(s!==0)t=s
else{t=this.b
r=t.q(0,a)
r.toString
t=t.q(0,b)
t.toString
t=B.b.B(r,t)}return t},
$S:2}
A.cL.prototype={
$1(a){return!this.a.p(0,A.N(a))},
$S:0}
A.cM.prototype={
$1(a){return!this.a.au(A.N(a))},
$S:0}
A.cN.prototype={
$1(a){return this.a.q(0,A.N(a))===1},
$S:0}
A.cO.prototype={
$1(a){var t
u.L.a(a)
t=J.bF(a)
return t.p(a,this.a)&&B.a.b4(this.b,t.gar(a))},
$S:12}
A.cP.prototype={
$0(){var t,s,r,q,p,o,n=u.S,m=A.Z(n),l=this.a,k=l.z
if(k===$){t=l.aP()
l.z!==$&&A.dv()
l.z=t
k=t}s=new A.S(k,k.r,k.e,A.j(k).h("S<2>"))
while(s.l()){r=s.d
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.z)(r),++p)m.i(0,r[p])}n=A.Z(n)
for(l=l.a,s=l.a*l.b,l=l.c,r=l.length,o=0;q=o<s,q;++o){if(q){if(!(o<r))return A.a(l,o)
q=l.charCodeAt(o)===46}else q=!0
if(!q&&!m.p(0,o))n.i(0,o)}return n},
$S:13}
A.cu.prototype={
b_(a){var t=a==null?0.62:a
return this.d.aD(t,new A.cv(this,a))},
bb(a){return this.r.aD(a,new A.cw(this,a))}}
A.cv.prototype={
$0(){var t=this.b
if(t==null)t=0.62
return A.fT(this.a.c,t)},
$S:14}
A.cw.prototype={
$0(){var t,s,r,q=A.f([],u.s)
for(t=this.a.f,t=new A.a5(t,A.j(t).h("a5<1,2>")).gt(0),s=this.b;t.l();){r=t.d
if(r.a<=s)B.a.M(q,r.b)}return q},
$S:15}
A.x.prototype={
ak(){return"Reject."+this.b}}
A.cQ.prototype={
i(a,b){var t=this.a,s=t.q(0,b)
s.toString;++s
t.j(0,b,s)
return s},
k(a){var t=this.a,s=A.j(t).h("a5<1,2>")
return new A.av(new A.v(new A.a5(t,s),s.h("o(c.E)").a(new A.cR()),s.h("v<c.E>")),s.h("d(c.E)").a(new A.cS()),s.h("av<c.E,d>")).H(0," ")}}
A.cR.prototype={
$1(a){return u.a.a(a).b>0},
$S:16}
A.cS.prototype={
$1(a){u.a.a(a)
return a.a.b+"="+a.b},
$S:17}
A.dw.prototype={
$1(a){A.u(a)
return a.length<=this.a-4&&!this.b.p(0,a)},
$S:1}
A.dx.prototype={
$1(a){return A.u(a).length},
$S:18}
A.dy.prototype={
$1(a){return A.u(a).length>=8},
$S:1}
A.d8.prototype={
$1(a){var t
A.N(a)
t=this.a.a.c
if(!(a>=0&&a<t.length))return A.a(t,a)
return t[a]+"@"+a},
$S:8}
A.bI.prototype={
b9(a){return this.a.p(0,A.u(a))},
a_(a,b){var t,s,r,q,p,o
u.W.a(b)
t=u.s
s=A.f([],t)
r=A.f([],t)
for(t=A.dK(b,b.r,A.j(b).c),q=this.a,p=t.$ti.c;t.l();){o=t.d
if(o==null)o=p.a(o)
B.a.i(q.p(0,o)?s:r,o)}B.a.T(s,A.f_())
B.a.T(r,A.f_())
return new A.bz(r,s)}}
A.cq.prototype={
$2(a,b){var t=u.O
t.a(a)
return B.b.B(t.a(b).b,a.b)},
$S:19}
A.aM.prototype={
bd(a){var t,s,r=a.L(this.c),q=this.b,p=q.length,o=p-1
for(t=0;t<o;){s=B.b.a9(t+o,1)
if(!(s<p))return A.a(q,s)
if(q[s]<=r)t=s+1
else o=s}q=this.a
if(!(t>=0&&t<q.length))return A.a(q,t)
return q[t]},
bf(a){var t,s
for(t=0;t<64;++t){s=this.bd(a)
if(!B.c.p("AEIOU",s))return s}return"T"}}
A.d9.prototype={
$1(a){},
$S:20}
A.da.prototype={
$1(a){return B.c.aE(A.u(a)).toUpperCase()},
$S:3}
A.db.prototype={
$1(a){return A.u(a).length!==0},
$S:1}
A.dc.prototype={
$1(a){A.N(a)
return""+a+":"+this.a.q(0,a).length},
$S:8}
A.ac.prototype={}
A.dt.prototype={
$2(a,b){var t,s=this.a
if(!(a>=0&&a<s.length))return A.a(s,a)
t=s[a]
return t==="#"||t===b},
$S:21}
A.du.prototype={
$1(a){A.N(a)
return!B.a.p(this.a,a)&&this.b.$2(a,this.c)},
$S:0}
A.az.prototype={}
A.cU.prototype={
i(a,b){var t,s,r,q,p,o=this.a
for(t=b.length,s=u.V,r=0;r<t;++r){q=b.charCodeAt(r)-65
if(q<0||q>25)return
p=o.a
if(!(q>=0&&q<26))return A.a(p,q)
o=p[q]
if(o==null){o=new A.az(A.aN(26,null,!1,s))
B.a.j(p,q,o)}}if(o.b==null){o.b=b;++this.b}},
p(a,b){var t,s,r,q,p,o=this.a
for(t=b.length,s=0;s<t;++s,o=p){r=b.charCodeAt(s)-65
if(r<0||r>25)return!1
q=o.a
if(!(r>=0&&r<26))return A.a(q,r)
p=q[r]
if(p==null)return!1}return o.b!=null}}
A.X.prototype={}
A.dh.prototype={
$3(a,b,c){var t,s,r,q,p,o,n,m,l,k,j,i=this,h=i.a
B.a.j(h,a,!0)
t=b.b
if(t!=null&&c>=i.b)i.c.i(0,t)
for(s=i.d,r=s.R(a),q=r.$ti,r=new A.M(r.a(),q.h("M<1>")),p=c+1,o=b.a,s=s.c,n=s.length,m=h.length,q=q.c;r.l();){l=r.b
if(l==null)l=q.a(l)
if(l>>>0!==l||l>=m)return A.a(h,l)
if(h[l])continue
if(l>>>0!==l||l>=n)return A.a(s,l)
k=s.charCodeAt(l)-65
if(!(k>=0&&k<26))return A.a(o,k)
j=o[k]
if(j==null)continue
i.$3(l,j,p)}B.a.j(h,a,!1)},
$S:22}
A.dp.prototype={
$1(a){return A.hP(A.eJ(a))},
$S:23}
A.dq.prototype={
$1(a){return A.hG(A.u(a))},
$S:3}
A.dr.prototype={
$1(a){return A.ie(A.u(a))},
$S:3};(function aliases(){var t=J.ah.prototype
t.aK=t.k
t=A.c.prototype
t.aJ=t.X})();(function installTearOffs(){var t=hunkHelpers._static_2,s=hunkHelpers._instance_1i,r=hunkHelpers._static_1,q=hunkHelpers.installStaticTearOff,p=hunkHelpers._instance_1u
t(J,"hT","fQ",24)
s(J.q.prototype,"gar","p",4)
s(A.m.prototype,"gar","p",4)
r(A,"it","hJ",5)
q(A,"f5",2,null,["$1$2","$2"],["f6",function(a,b){return A.f6(a,b,u.H)}],25,0)
t(A,"f_","hH",2)
p(A.bI.prototype,"gb8","b9",1)
t(A,"fa","im",2)})();(function inheritance(){var t=hunkHelpers.mixin,s=hunkHelpers.inherit,r=hunkHelpers.inheritMany
s(A.n,null)
r(A.n,[A.dD,J.bS,A.bn,J.aq,A.p,A.cT,A.c,A.au,A.be,A.aC,A.br,A.r,A.al,A.b0,A.bu,A.aj,A.H,A.cV,A.cH,A.E,A.cD,A.bd,A.S,A.bc,A.U,A.ch,A.cm,A.M,A.cc,A.ck,A.aD,A.m,A.bL,A.bN,A.d0,A.ad,A.ar,A.cX,A.c7,A.bo,A.cY,A.ct,A.Q,A.bj,A.ay,A.cl,A.aJ,A.A,A.cJ,A.cu,A.cQ,A.bI,A.aM,A.ac,A.az,A.cU,A.X])
r(J.bS,[J.bU,J.b6,J.b8,J.b7,J.b9,J.aL,J.af])
r(J.b8,[J.ah,J.q,A.aO,A.bh])
r(J.ah,[J.c8,J.aA,J.ag])
s(J.bT,A.bn)
s(J.cy,J.q)
r(J.aL,[J.b5,J.bV])
r(A.p,[A.bY,A.bs,A.bW,A.cf,A.ca,A.cg,A.bb,A.bG,A.a2,A.bt,A.ce,A.bp,A.bM])
r(A.c,[A.b3,A.av,A.v,A.bq,A.aT])
r(A.b3,[A.a_,A.a6,A.cE,A.a5])
s(A.as,A.av)
r(A.a_,[A.aw,A.cj])
s(A.b4,A.bq)
s(A.aS,A.al)
s(A.bz,A.aS)
s(A.at,A.b0)
r(A.aj,[A.b1,A.bA])
s(A.b2,A.b1)
r(A.H,[A.bR,A.bJ,A.bK,A.cd,A.dk,A.dm,A.di,A.dd,A.cL,A.cM,A.cN,A.cO,A.cR,A.cS,A.dw,A.dx,A.dy,A.d8,A.d9,A.da,A.db,A.dc,A.du,A.dh,A.dp,A.dq,A.dr])
s(A.ae,A.bR)
s(A.bk,A.bs)
r(A.cd,[A.cb,A.aK])
r(A.E,[A.a4,A.ci])
s(A.ba,A.a4)
r(A.bK,[A.dl,A.cG,A.d1,A.cK,A.cq,A.dt])
r(A.bh,[A.bZ,A.aP])
r(A.aP,[A.bv,A.bx])
s(A.bw,A.bv)
s(A.bf,A.bw)
s(A.by,A.bx)
s(A.bg,A.by)
r(A.bf,[A.c_,A.c0])
r(A.bg,[A.c1,A.c2,A.c3,A.c4,A.c5,A.bi,A.c6])
s(A.aU,A.cg)
s(A.V,A.bA)
s(A.bX,A.bb)
s(A.cz,A.bL)
r(A.bN,[A.cB,A.cA])
s(A.d_,A.d0)
s(A.cC,A.cc)
r(A.bJ,[A.cr,A.cP,A.cv,A.cw])
r(A.a2,[A.aQ,A.bQ])
r(A.cX,[A.bm,A.x])
t(A.bv,A.m)
t(A.bw,A.r)
t(A.bx,A.m)
t(A.by,A.r)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{b:"int",k:"double",F:"num",d:"String",o:"bool",bj:"Null",h:"List",n:"Object",a7:"Map",t:"JSObject"},mangledNames:{},types:["o(b)","o(d)","b(d,d)","d(d)","o(n?)","@(@)","~(n?,n?)","~(b)","d(b)","@(@,d)","@(d)","0&()","o(h<b>)","ai<b>()","aM()","h<d>()","o(Q<x,b>)","d(Q<x,b>)","b(d)","b(X,X)","~(d)","o(b,d)","~(b,az,b)","d(t)","b(@,@)","0^(0^,0^)<F>"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;bonus,required":(a,b)=>c=>c instanceof A.bz&&a.b(c.a)&&b.b(c.b)}}
A.hx(v.typeUniverse,JSON.parse('{"c8":"ah","aA":"ah","ag":"ah","iY":"aO","bU":{"o":[],"l":[]},"b6":{"l":[]},"b8":{"t":[]},"ah":{"t":[]},"q":{"h":["1"],"t":[],"c":["1"]},"bT":{"bn":[]},"cy":{"q":["1"],"h":["1"],"t":[],"c":["1"]},"aq":{"w":["1"]},"aL":{"k":[],"F":[],"J":["F"]},"b5":{"k":[],"b":[],"F":[],"J":["F"],"l":[]},"bV":{"k":[],"F":[],"J":["F"],"l":[]},"af":{"d":[],"J":["d"],"ei":[],"l":[]},"bY":{"p":[]},"b3":{"c":["1"]},"a_":{"c":["1"]},"au":{"w":["1"]},"av":{"c":["2"],"c.E":"2"},"as":{"av":["1","2"],"c":["2"],"c.E":"2"},"be":{"w":["2"]},"aw":{"a_":["2"],"c":["2"],"a_.E":"2","c.E":"2"},"v":{"c":["1"],"c.E":"1"},"aC":{"w":["1"]},"bq":{"c":["1"],"c.E":"1"},"b4":{"bq":["1"],"c":["1"],"c.E":"1"},"br":{"w":["1"]},"bz":{"aS":[],"al":[]},"b0":{"a7":["1","2"]},"bu":{"w":["1"]},"at":{"b0":["1","2"],"a7":["1","2"]},"b1":{"aj":["1"],"ai":["1"],"c":["1"]},"b2":{"b1":["1"],"aj":["1"],"ai":["1"],"c":["1"]},"bR":{"H":[],"a3":[]},"ae":{"H":[],"a3":[]},"bk":{"p":[]},"bW":{"p":[]},"cf":{"p":[]},"H":{"a3":[]},"bJ":{"H":[],"a3":[]},"bK":{"H":[],"a3":[]},"cd":{"H":[],"a3":[]},"cb":{"H":[],"a3":[]},"aK":{"H":[],"a3":[]},"ca":{"p":[]},"a4":{"E":["1","2"],"dF":["1","2"],"a7":["1","2"],"E.K":"1","E.V":"2"},"a6":{"c":["1"],"c.E":"1"},"bd":{"w":["1"]},"cE":{"c":["1"],"c.E":"1"},"S":{"w":["1"]},"a5":{"c":["Q<1,2>"],"c.E":"Q<1,2>"},"bc":{"w":["Q<1,2>"]},"ba":{"a4":["1","2"],"E":["1","2"],"dF":["1","2"],"a7":["1","2"],"E.K":"1","E.V":"2"},"aS":{"al":[]},"aO":{"t":[],"l":[]},"bh":{"t":[]},"bZ":{"t":[],"l":[]},"aP":{"L":["1"],"t":[]},"bf":{"m":["k"],"h":["k"],"L":["k"],"t":[],"c":["k"],"r":["k"]},"bg":{"m":["b"],"h":["b"],"L":["b"],"t":[],"c":["b"],"r":["b"]},"c_":{"m":["k"],"h":["k"],"L":["k"],"t":[],"c":["k"],"r":["k"],"l":[],"m.E":"k","r.E":"k"},"c0":{"m":["k"],"h":["k"],"L":["k"],"t":[],"c":["k"],"r":["k"],"l":[],"m.E":"k","r.E":"k"},"c1":{"m":["b"],"h":["b"],"L":["b"],"t":[],"c":["b"],"r":["b"],"l":[],"m.E":"b","r.E":"b"},"c2":{"m":["b"],"h":["b"],"L":["b"],"t":[],"c":["b"],"r":["b"],"l":[],"m.E":"b","r.E":"b"},"c3":{"m":["b"],"h":["b"],"L":["b"],"t":[],"c":["b"],"r":["b"],"l":[],"m.E":"b","r.E":"b"},"c4":{"m":["b"],"h":["b"],"L":["b"],"t":[],"c":["b"],"r":["b"],"l":[],"m.E":"b","r.E":"b"},"c5":{"m":["b"],"h":["b"],"L":["b"],"t":[],"c":["b"],"r":["b"],"l":[],"m.E":"b","r.E":"b"},"bi":{"m":["b"],"h":["b"],"L":["b"],"t":[],"c":["b"],"r":["b"],"l":[],"m.E":"b","r.E":"b"},"c6":{"m":["b"],"h":["b"],"L":["b"],"t":[],"c":["b"],"r":["b"],"l":[],"m.E":"b","r.E":"b"},"cg":{"p":[]},"aU":{"p":[]},"M":{"w":["1"]},"aT":{"c":["1"],"c.E":"1"},"V":{"aj":["1"],"eg":["1"],"ai":["1"],"c":["1"]},"aD":{"w":["1"]},"E":{"a7":["1","2"]},"aj":{"ai":["1"],"c":["1"]},"bA":{"aj":["1"],"ai":["1"],"c":["1"]},"ci":{"E":["d","@"],"a7":["d","@"],"E.K":"d","E.V":"@"},"cj":{"a_":["d"],"c":["d"],"a_.E":"d","c.E":"d"},"bb":{"p":[]},"bX":{"p":[]},"ad":{"J":["ad"]},"k":{"F":[],"J":["F"]},"ar":{"J":["ar"]},"b":{"F":[],"J":["F"]},"h":{"c":["1"]},"F":{"J":["F"]},"ai":{"c":["1"]},"d":{"J":["d"],"ei":[]},"bG":{"p":[]},"bs":{"p":[]},"a2":{"p":[]},"aQ":{"p":[]},"bQ":{"p":[]},"bt":{"p":[]},"ce":{"p":[]},"bp":{"p":[]},"bM":{"p":[]},"c7":{"p":[]},"bo":{"p":[]},"ay":{"ha":[]},"cl":{"h5":[]},"fM":{"h":["b"],"c":["b"]},"hf":{"h":["b"],"c":["b"]},"he":{"h":["b"],"c":["b"]},"fK":{"h":["b"],"c":["b"]},"hc":{"h":["b"],"c":["b"]},"fL":{"h":["b"],"c":["b"]},"hd":{"h":["b"],"c":["b"]},"fI":{"h":["k"],"c":["k"]},"fJ":{"h":["k"],"c":["k"]}}'))
A.hw(v.typeUniverse,JSON.parse('{"b3":1,"aP":1,"cc":2,"bA":1,"bL":2,"bN":2}'))
var u=(function rtii(){var t=A.a1
return{U:t("J<@>"),k:t("ad"),O:t("X"),d:t("ar"),C:t("p"),Z:t("a3"),W:t("c<d>"),Y:t("c<@>"),B:t("q<X>"),p:t("q<h<b>>"),f:t("q<n>"),s:t("q<d>"),n:t("q<k>"),b:t("q<@>"),t:t("q<b>"),T:t("b6"),m:t("t"),M:t("ag"),D:t("L<@>"),_:t("aM"),h:t("h<X>"),G:t("h<h<b>>"),l:t("h<d>"),j:t("h<@>"),L:t("h<b>"),a:t("Q<x,b>"),c:t("a7<d,@>"),J:t("a7<@,@>"),e:t("aw<d,d>"),P:t("bj"),K:t("n"),q:t("iZ"),F:t("+()"),w:t("x"),r:t("ai<b>"),N:t("d"),v:t("d(d)"),R:t("l"),o:t("aA"),E:t("aT<b>"),y:t("o"),i:t("k"),S:t("b"),x:t("eb<bj>?"),z:t("t?"),Q:t("h<@>?"),X:t("n?"),u:t("d?"),V:t("az?"),g:t("ck?"),A:t("o?"),I:t("k?"),a3:t("b?"),ae:t("F?"),H:t("F"),cQ:t("~(d,@)")}})();(function constants(){var t=hunkHelpers.makeConstList
B.N=J.bS.prototype
B.a=J.q.prototype
B.b=J.b5.prototype
B.h=J.aL.prototype
B.c=J.af.prototype
B.O=J.ag.prototype
B.P=J.b8.prototype
B.o=J.c8.prototype
B.i=J.aA.prototype
B.F=new A.ae(A.f5(),A.a1("ae<k>"))
B.E=new A.ae(A.f5(),A.a1("ae<b>"))
B.k=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.G=function() {
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
B.L=function(getTagFallback) {
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
B.H=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.K=function(hooks) {
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
B.J=function(hooks) {
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
B.I=function(hooks) {
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
B.j=function(hooks) { return hooks; }

B.d=new A.cz()
B.l=new A.cC()
B.M=new A.c7()
B.f=new A.cT()
B.Q=new A.cA(null)
B.R=new A.cB(null)
B.r=new A.x(0,"shape")
B.t=new A.x(1,"placement")
B.v=new A.x(2,"fill")
B.w=new A.x(3,"disconnected")
B.x=new A.x(4,"tooFewRequired")
B.y=new A.x(5,"tooManyRequired")
B.z=new A.x(6,"shortLongest")
B.A=new A.x(7,"canuckleNotRequired")
B.B=new A.x(8,"deadCell")
B.C=new A.x(9,"longPlacement")
B.u=new A.x(10,"tooFewLong")
B.T=t([B.r,B.t,B.v,B.w,B.x,B.y,B.z,B.A,B.B,B.C,B.u],A.a1("q<x>"))
B.a2=new A.bm("d","Daily",0,"main")
B.p=new A.bm("m","Mini",1,"mini")
B.U=t([B.a2,B.p],A.a1("q<bm>"))
B.X=t([],u.B)
B.W=t([],u.p)
B.n=t([],u.t)
B.V=t([],u.b)
B.Y=t(["dict.txt","dict_blocked.txt","dict_bonus_only.txt","stoplist.txt","allowlist.txt","canuckle_words.txt"],u.s)
B.e=t([8,8],u.t)
B.q=new A.A(5,5,3,28,36,8,B.e,null)
B.ag=new A.A(4,6,2,28,36,8,B.e,null)
B.aa=new A.A(6,5,6,28,36,8,B.e,null)
B.a6=new A.A(4,7,4,28,36,8,B.e,null)
B.ab=new A.A(7,5,9,28,36,8,B.e,null)
B.ad=new A.A(6,6,10,28,36,8,B.e,null)
B.a3=new A.A(5,7,9,28,36,8,B.e,null)
B.af=new A.A(7,6,14,28,36,8,B.e,null)
B.Z=t([B.q,B.ag,B.aa,B.a6,B.ab,B.ad,B.a3,B.af],A.a1("q<A>"))
B.a7=new A.A(4,4,1,18,25,8,B.e,null)
B.a9=new A.A(4,4,0,22,30,8,B.e,null)
B.m=t([9,8],u.t)
B.a4=new A.A(5,4,2,25,34,8,B.m,null)
B.ac=new A.A(5,5,4,29,38,8,B.e,null)
B.ae=new A.A(5,5,3,33,43,8,B.m,null)
B.S=t([10,9],u.t)
B.a8=new A.A(6,5,3,43,56,8,B.S,null)
B.a_=new A.at([1,B.a7,2,B.a9,3,B.a4,4,B.ac,5,B.ae,6,B.q,7,B.a8],A.a1("at<b,A>"))
B.a0=new A.at([4,0.55,5,0.4,6,0.28,7,0.18,8,0.11],A.a1("at<b,k>"))
B.a5=new A.A(3,3,0,20,30,5,B.n,2)
B.a1={}
B.D=new A.b2(B.a1,0,A.a1("b2<d>"))
B.ah=A.W("iU")
B.ai=A.W("iV")
B.aj=A.W("fI")
B.ak=A.W("fJ")
B.al=A.W("fK")
B.am=A.W("fL")
B.an=A.W("fM")
B.ao=A.W("n")
B.ap=A.W("hc")
B.aq=A.W("hd")
B.ar=A.W("he")
B.as=A.W("hf")})();(function staticFields(){$.cZ=null
$.O=A.f([],u.f)
$.ej=null
$.e7=null
$.e6=null
$.f2=null
$.eZ=null
$.f9=null
$.dg=null
$.dn=null
$.dY=null
$.d2=A.f([],A.a1("q<h<n>?>"))
$.cp=function(){var t=u.N
return A.T(t,t)}()
$.d7=null
$.eY=B.D
$.eN=B.D})();(function lazyInitializers(){var t=hunkHelpers.lazyFinal
t($,"iX","fe",()=>A.dj("_$dart_dartClosure"))
t($,"iW","e1",()=>A.dj("_$dart_dartClosure_dartJSInterop"))
t($,"ja","fp",()=>A.f([new J.bT()],A.a1("q<bn>")))
t($,"j_","ff",()=>A.a8(A.cW({
toString:function(){return"$receiver$"}})))
t($,"j0","fg",()=>A.a8(A.cW({$method$:null,
toString:function(){return"$receiver$"}})))
t($,"j1","fh",()=>A.a8(A.cW(null)))
t($,"j2","fi",()=>A.a8(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(s){return s.message}}()))
t($,"j5","fl",()=>A.a8(A.cW(void 0)))
t($,"j6","fm",()=>A.a8(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(s){return s.message}}()))
t($,"j4","fk",()=>A.a8(A.er(null)))
t($,"j3","fj",()=>A.a8(function(){try{null.$method$}catch(s){return s.message}}()))
t($,"j8","fo",()=>A.a8(A.er(void 0)))
t($,"j7","fn",()=>A.a8(function(){try{(void 0).$method$}catch(s){return s.message}}()))
t($,"j9","dz",()=>A.e0(B.ao))
t($,"jb","e2",()=>A.fG(2026,11,5))})();(function nativeSupport(){!function(){var t=function(a){var n={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.aO,SharedArrayBuffer:A.aO,ArrayBufferView:A.bh,DataView:A.bZ,Float32Array:A.c_,Float64Array:A.c0,Int16Array:A.c1,Int32Array:A.c2,Int8Array:A.c3,Uint16Array:A.c4,Uint32Array:A.c5,Uint8ClampedArray:A.bi,CanvasPixelArray:A.bi,Uint8Array:A.c6})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.aP.$nativeSuperclassTag="ArrayBufferView"
A.bv.$nativeSuperclassTag="ArrayBufferView"
A.bw.$nativeSuperclassTag="ArrayBufferView"
A.bf.$nativeSuperclassTag="ArrayBufferView"
A.bx.$nativeSuperclassTag="ArrayBufferView"
A.by.$nativeSuperclassTag="ArrayBufferView"
A.bg.$nativeSuperclassTag="ArrayBufferView"})()
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
var t=A.iM
if(typeof dartMainRunner==="function"){dartMainRunner(t,[])}else{t([])}})})()