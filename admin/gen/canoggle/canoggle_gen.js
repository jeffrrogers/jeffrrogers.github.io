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
if(a[b]!==t){A.iM(b)}a[b]=s}var r=a[b]
a[c]=function(){return r}
return r}}function makeConstList(a,b){if(b!=null)A.f(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var t=0;t<a.length;++t){convertToFastObject(a[t])}}var y=0
function instanceTearOffGetter(a,b){var t=null
return a?function(c){if(t===null)t=A.dR(b)
return new t(c,this)}:function(){if(t===null)t=A.dR(b)
return new t(this,null)}}function staticTearOffGetter(a){var t=null
return function(){if(t===null)t=A.dR(a).prototype
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
dX(a,b,c,d){return{i:a,p:b,e:c,x:d}},
dT(a){var t,s,r,q,p,o="_$dart_js",n=a[v.dispatchPropertyName]
if(n==null)if($.dV==null){A.iC()
n=a[v.dispatchPropertyName]}if(n!=null){t=n.p
if(!1===t)return n.i
if(!0===t)return a
s=Object.getPrototypeOf(a)
if(t===s)return n.i
if(n.e===s)throw A.e(A.ep("Return interceptor for "+A.i(t(a,n))))}r=a.constructor
if(r==null)q=null
else{p=$.cX
if(p==null)p=$.cX=A.dg(o)
q=r[p]}if(q!=null)return q
q=A.iH(a)
if(q!=null)return q
if(typeof a=="function")return B.N
t=Object.getPrototypeOf(a)
if(t==null)return B.o
if(t===Object.prototype)return B.o
if(typeof r=="function"){p=$.cX
if(p==null)p=$.cX=A.dg(o)
Object.defineProperty(r,p,{value:B.i,enumerable:false,writable:true,configurable:true})
return B.i}return B.i},
fL(a,b){if(a<0||a>4294967295)throw A.e(A.aR(a,0,4294967295,"length",null))
return J.fM(new Array(a),b)},
fM(a,b){var t=A.f(a,b.h("q<0>"))
t.$flags=1
return t},
fN(a,b){var t=u.U
return J.fn(t.a(a),t.a(b))},
ea(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
fO(a,b){var t,s
for(t=a.length;b<t;){s=a.charCodeAt(b)
if(s!==32&&s!==13&&!J.ea(s))break;++b}return b},
fP(a,b){var t,s,r
for(t=a.length;b>0;b=s){s=b-1
if(!(s<t))return A.a(a,s)
r=a.charCodeAt(s)
if(r!==32&&r!==13&&!J.ea(r))break}return b},
aE(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.b5.prototype
return J.bV.prototype}if(typeof a=="string")return J.ae.prototype
if(a==null)return J.b6.prototype
if(typeof a=="boolean")return J.bU.prototype
if(Array.isArray(a))return J.q.prototype
if(typeof a!="object"){if(typeof a=="function")return J.af.prototype
if(typeof a=="symbol")return J.b9.prototype
if(typeof a=="bigint")return J.b7.prototype
return a}if(a instanceof A.n)return a
return J.dT(a)},
bF(a){if(typeof a=="string")return J.ae.prototype
if(a==null)return a
if(Array.isArray(a))return J.q.prototype
if(typeof a!="object"){if(typeof a=="function")return J.af.prototype
if(typeof a=="symbol")return J.b9.prototype
if(typeof a=="bigint")return J.b7.prototype
return a}if(a instanceof A.n)return a
return J.dT(a)},
aX(a){if(a==null)return a
if(Array.isArray(a))return J.q.prototype
if(typeof a!="object"){if(typeof a=="function")return J.af.prototype
if(typeof a=="symbol")return J.b9.prototype
if(typeof a=="bigint")return J.b7.prototype
return a}if(a instanceof A.n)return a
return J.dT(a)},
ix(a){if(typeof a=="number")return J.aK.prototype
if(typeof a=="string")return J.ae.prototype
if(a==null)return a
if(!(a instanceof A.n))return J.az.prototype
return a},
iy(a){if(typeof a=="string")return J.ae.prototype
if(a==null)return a
if(!(a instanceof A.n))return J.az.prototype
return a},
aa(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.aE(a).I(a,b)},
I(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.iG(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.bF(a).p(a,b)},
dx(a,b){return J.aX(a).i(a,b)},
fn(a,b){return J.ix(a).B(a,b)},
fo(a,b){return J.aX(a).E(a,b)},
P(a){return J.aE(a).gu(a)},
fp(a){return J.bF(a).gF(a)},
fq(a){return J.bF(a).gO(a)},
b_(a){return J.aX(a).gq(a)},
an(a){return J.bF(a).gm(a)},
fr(a){return J.aE(a).gv(a)},
e0(a,b){return J.aX(a).T(a,b)},
fs(a,b){return J.iy(a).a_(a,b)},
ao(a){return J.aE(a).k(a)},
e1(a,b){return J.aX(a).X(a,b)},
bS:function bS(){},
bU:function bU(){},
b6:function b6(){},
b8:function b8(){},
ag:function ag(){},
c8:function c8(){},
az:function az(){},
af:function af(){},
b7:function b7(){},
b9:function b9(){},
q:function q(a){this.$ti=a},
bT:function bT(){},
cw:function cw(a){this.$ti=a},
ap:function ap(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aK:function aK(){},
b5:function b5(){},
bV:function bV(){},
ae:function ae(){}},A={dA:function dA(){},
ec(a){return new A.bY("Field '"+a+"' has been assigned during initialization.")},
aj(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
dG(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
dW(a){var t,s
for(t=$.O.length,s=0;s<t;++s)if(a===$.O[s])return!0
return!1},
h8(a,b,c){A.ek(b,"takeCount")
return new A.b4(a,b,c.h("b4<0>"))},
cv(){return new A.bp("No element")},
bY:function bY(a){this.a=a},
cR:function cR(){},
b3:function b3(){},
Z:function Z(){},
at:function at(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
au:function au(a,b,c){this.a=a
this.b=b
this.$ti=c},
ar:function ar(a,b,c){this.a=a
this.b=b
this.$ti=c},
be:function be(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
av:function av(a,b,c){this.a=a
this.b=b
this.$ti=c},
u:function u(a,b,c){this.a=a
this.b=b
this.$ti=c},
aB:function aB(a,b,c){this.a=a
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
fC(){throw A.e(A.aA("Cannot modify constant Set"))},
fa(a){var t=A.f9(a)
if(t!=null)return t
return"minified:"+a},
iG(a,b){var t
if(b!=null){t=b.x
if(t!=null)return t}return u.D.b(a)},
i(a){var t
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
t=J.ao(a)
return t},
bl(a){var t,s=$.eg
if(s==null)s=$.eg=Symbol("identityHashCode")
t=a[s]
if(t==null){t=Math.random()*0x3fffffff|0
a[s]=t}return t},
cG(a,b){var t,s,r,q,p,o=null,n=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
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
if(a instanceof A.n)return A.H(A.a9(a),null)
t=J.aE(a)
if(t===B.M||t===B.O||u.o.b(a)){s=B.k(a)
if(s!=="Object"&&s!=="")return s
r=a.constructor
if(typeof r=="function"){q=r.name
if(typeof q=="string"&&q!=="Object"&&q!=="")return q}}return A.H(A.a9(a),null)},
ei(a){var t,s,r
if(a==null||typeof a=="number"||A.dN(a))return J.ao(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.G)return a.k(0)
if(a instanceof A.ak)return a.aq(!0)
t=$.fm()
for(s=0;s<1;++s){r=t[s].bm(a)
if(r!=null)return r}return"Instance of '"+A.c9(a)+"'"},
D(a){var t
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){t=a-65536
return String.fromCharCode((B.b.a9(t,10)|55296)>>>0,t&1023|56320)}throw A.e(A.aR(a,0,1114111,null,null))},
h0(a,b,c,d,e,f,g,h,i){var t,s,r,q=b-1
if(a<100){a+=400
q-=4800}t=B.b.J(h,1000)
s=Date.UTC(a,q,c,d,e,f,g+B.b.A(h-t,1000))
r=!0
if(!isNaN(s))if(!(s<-864e13))if(!(s>864e13))r=s===864e13&&t!==0
if(r)return null
return s},
aw(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
h_(a){var t=A.aw(a).getUTCFullYear()+0
return t},
fY(a){var t=A.aw(a).getUTCMonth()+1
return t},
fU(a){var t=A.aw(a).getUTCDate()+0
return t},
fV(a){var t=A.aw(a).getUTCHours()+0
return t},
fX(a){var t=A.aw(a).getUTCMinutes()+0
return t},
fZ(a){var t=A.aw(a).getUTCSeconds()+0
return t},
fW(a){var t=A.aw(a).getUTCMilliseconds()+0
return t},
eh(a){var t=A.aw(a).getUTCDay()+0
return B.b.J(t+6,7)+1},
a(a,b){if(a==null)J.an(a)
throw A.e(A.dc(a,b))},
dc(a,b){var t,s="index"
if(!A.dO(b))return new A.a1(!0,b,s,null)
t=J.an(a)
if(b<0||b>=t)return A.e9(b,t,a,s)
return new A.aQ(null,null,!0,b,s,"Value not in range")},
ib(a){return new A.a1(!0,a,null,null)},
e(a){return A.C(a,new Error())},
C(a,b){var t
if(a==null)a=new A.bs()
b.dartException=a
t=A.iN
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:t})
b.name=""}else b.toString=t
return b},
iN(){return J.ao(this.dartException)},
aH(a,b){throw A.C(a,b==null?new Error():b)},
aZ(a,b,c){var t
if(b==null)b=0
if(c==null)c=0
t=Error()
A.aH(A.hH(a,b,c),t)},
hH(a,b,c){var t,s,r,q,p,o,n,m,l
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
a7(a){var t,s,r,q,p,o
a=A.iK(a.replace(String({}),"$receiver$"))
t=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(t==null)t=A.f([],u.s)
s=t.indexOf("\\$arguments\\$")
r=t.indexOf("\\$argumentsExpr\\$")
q=t.indexOf("\\$expr\\$")
p=t.indexOf("\\$method\\$")
o=t.indexOf("\\$receiver\\$")
return new A.cT(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),s,r,q,p,o)},
cU(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(t){return t.message}}(a)},
eo(a){return function($expr$){try{$expr$.$method$}catch(t){return t.message}}(a)},
dB(a,b){var t=b==null,s=t?null:b.method
return new A.bW(a,s,t?null:b.receiver)},
dv(a){if(a==null)return new A.cF(a)
if(typeof a!=="object")return a
if("dartException" in a)return A.aG(a,a.dartException)
return A.ia(a)},
aG(a,b){if(u.C.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
ia(a){var t,s,r,q,p,o,n,m,l,k,j,i,h
if(!("message" in a))return a
t=a.message
if("number" in a&&typeof a.number=="number"){s=a.number
r=s&65535
if((B.b.a9(s,16)&8191)===10)switch(r){case 438:return A.aG(a,A.dB(A.i(t)+" (Error "+r+")",null))
case 445:case 5007:A.i(t)
return A.aG(a,new A.bk())}}if(a instanceof TypeError){q=$.fc()
p=$.fd()
o=$.fe()
n=$.ff()
m=$.fi()
l=$.fj()
k=$.fh()
$.fg()
j=$.fl()
i=$.fk()
h=q.H(t)
if(h!=null)return A.aG(a,A.dB(A.x(t),h))
else{h=p.H(t)
if(h!=null){h.method="call"
return A.aG(a,A.dB(A.x(t),h))}else if(o.H(t)!=null||n.H(t)!=null||m.H(t)!=null||l.H(t)!=null||k.H(t)!=null||n.H(t)!=null||j.H(t)!=null||i.H(t)!=null){A.x(t)
return A.aG(a,new A.bk())}}return A.aG(a,new A.cf(typeof t=="string"?t:""))}if(a instanceof RangeError){if(typeof t=="string"&&t.indexOf("call stack")!==-1)return new A.bo()
t=function(b){try{return String(b)}catch(g){}return null}(a)
return A.aG(a,new A.a1(!1,null,null,typeof t=="string"?t.replace(/^RangeError:\s*/,""):t))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof t=="string"&&t==="too much recursion")return new A.bo()
return a},
dY(a){if(a==null)return J.P(a)
if(typeof a=="object")return A.bl(a)
return J.P(a)},
il(a){if(typeof a=="number")return B.h.gu(a)
if(a instanceof A.cm)return A.bl(a)
if(a instanceof A.ak)return a.gu(a)
return A.dY(a)},
eY(a,b){var t,s,r,q=a.length
for(t=0;t<q;t=r){s=t+1
r=s+1
b.j(0,a[t],a[s])}return b},
it(a,b){var t,s=a.length
for(t=0;t<s;++t)b.i(0,a[t])
return b},
hR(a,b,c,d,e,f){u.Z.a(a)
switch(A.N(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.e(new A.cW("Unsupported number of arguments for wrapped closure"))},
im(a,b){var t=a.$identity
if(!!t)return t
t=A.io(a,b)
a.$identity=t
return t},
io(a,b){var t
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.hR)},
fB(a1){var t,s,r,q,p,o,n,m,l,k,j=a1.co,i=a1.iS,h=a1.iI,g=a1.nDA,f=a1.aI,e=a1.fs,d=a1.cs,c=e[0],b=d[0],a=j[c],a0=a1.fT
a0.toString
t=i?Object.create(new A.cb().constructor.prototype):Object.create(new A.aJ(null,null).constructor.prototype)
t.$initialize=t.constructor
s=i?function static_tear_off(){this.$initialize()}:function tear_off(a2,a3){this.$initialize(a2,a3)}
t.constructor=s
s.prototype=t
t.$_name=c
t.$_target=a
r=!i
if(r)q=A.e6(c,a,h,g)
else{t.$static_name=c
q=a}t.$S=A.fx(a0,i,h)
t[b]=q
for(p=q,o=1;o<e.length;++o){n=e[o]
if(typeof n=="string"){m=j[n]
l=n
n=m}else l=""
k=d[o]
if(k!=null){if(r)n=A.e6(l,n,h,g)
t[k]=n}if(o===f)p=n}t.$C=p
t.$R=a1.rC
t.$D=a1.dV
return s},
fx(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.e("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.fu)}throw A.e("Error in functionType of tearoff")},
fy(a,b,c,d){var t=A.e5
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,t)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,t)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,t)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,t)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,t)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,t)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,t)}},
e6(a,b,c,d){if(c)return A.fA(a,b,d)
return A.fy(b.length,d,a,b)},
fz(a,b,c,d){var t=A.e5,s=A.fv
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
fA(a,b,c){var t,s
if($.e3==null)$.e3=A.e2("interceptor")
if($.e4==null)$.e4=A.e2("receiver")
t=b.length
s=A.fz(t,c,a,b)
return s},
dR(a){return A.fB(a)},
fu(a,b){return A.bE(v.typeUniverse,A.a9(a.a),b)},
e5(a){return a.a},
fv(a){return a.b},
e2(a){var t,s,r,q=new A.aJ("receiver","interceptor"),p=Object.getOwnPropertyNames(q)
p.$flags=1
t=p
for(p=t.length,s=0;s<p;++s){r=t[s]
if(q[r]===a)return r}throw A.e(A.dy("Field name "+a+" not found."))},
dg(a){return v.getIsolateTag(a)},
iH(a){var t,s,r,q,p,o=A.x($.f_.$1(a)),n=$.dd[o]
if(n!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}t=$.dk[o]
if(t!=null)return t
s=v.interceptorsByTag[o]
if(s==null){r=A.dL($.eW.$2(a,o))
if(r!=null){n=$.dd[r]
if(n!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}t=$.dk[r]
if(t!=null)return t
s=v.interceptorsByTag[r]
o=r}}if(s==null)return null
t=s.prototype
q=o[0]
if(q==="!"){n=A.dn(t)
$.dd[o]=n
Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}if(q==="~"){$.dk[o]=t
return t}if(q==="-"){p=A.dn(t)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:p,enumerable:false,writable:true,configurable:true})
return p.i}if(q==="+")return A.f4(a,t)
if(q==="*")throw A.e(A.ep(o))
if(v.leafTags[o]===true){p=A.dn(t)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:p,enumerable:false,writable:true,configurable:true})
return p.i}else return A.f4(a,t)},
f4(a,b){var t=Object.getPrototypeOf(a)
Object.defineProperty(t,v.dispatchPropertyName,{value:J.dX(b,t,null,null),enumerable:false,writable:true,configurable:true})
return b},
dn(a){return J.dX(a,!1,null,!!a.$iL)},
iJ(a,b,c){var t=b.prototype
if(v.leafTags[a]===true)return A.dn(t)
else return J.dX(t,c,null,null)},
iC(){if(!0===$.dV)return
$.dV=!0
A.iD()},
iD(){var t,s,r,q,p,o,n,m
$.dd=Object.create(null)
$.dk=Object.create(null)
A.iB()
t=v.interceptorsByTag
s=Object.getOwnPropertyNames(t)
if(typeof window!="undefined"){window
r=function(){}
for(q=0;q<s.length;++q){p=s[q]
o=$.f6.$1(p)
if(o!=null){n=A.iJ(p,t[p],o)
if(n!=null){Object.defineProperty(o,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
r.prototype=o}}}}for(q=0;q<s.length;++q){p=s[q]
if(/^[A-Za-z_]/.test(p)){m=t[p]
t["!"+p]=m
t["~"+p]=m
t["-"+p]=m
t["+"+p]=m
t["*"+p]=m}}},
iB(){var t,s,r,q,p,o,n=B.F()
n=A.aW(B.G,A.aW(B.H,A.aW(B.j,A.aW(B.j,A.aW(B.I,A.aW(B.J,A.aW(B.K(B.k),n)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){t=dartNativeDispatchHooksTransformer
if(typeof t=="function")t=[t]
if(Array.isArray(t))for(s=0;s<t.length;++s){r=t[s]
if(typeof r=="function")n=r(n)||n}}q=n.getTag
p=n.getUnknownTag
o=n.prototypeForTag
$.f_=new A.dh(q)
$.eW=new A.di(p)
$.f6=new A.dj(o)},
aW(a,b){return a(b)||b},
iq(a,b){var t=b.length,s=v.rttc[""+t+";"+a]
if(s==null)return null
if(t===0)return s
if(t===s.length)return s.apply(null,b)
return s(b)},
iL(a,b,c){var t=a.indexOf(b,c)
return t>=0},
iK(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
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
as:function as(a,b){this.a=a
this.$ti=b},
b1:function b1(){},
b2:function b2(a,b,c){this.a=a
this.b=b
this.$ti=c},
bR:function bR(){},
ad:function ad(a,b){this.a=a
this.$ti=b},
bn:function bn(){},
cT:function cT(a,b,c,d,e,f){var _=this
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
cF:function cF(a){this.a=a},
G:function G(){},
bJ:function bJ(){},
bK:function bK(){},
cd:function cd(){},
cb:function cb(){},
aJ:function aJ(a,b){this.a=a
this.b=b},
ca:function ca(a){this.a=a},
a3:function a3(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
cB:function cB(a,b){this.a=a
this.b=b
this.c=null},
a5:function a5(a,b){this.a=a
this.$ti=b},
bd:function bd(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
cC:function cC(a,b){this.a=a
this.$ti=b},
S:function S(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
a4:function a4(a,b){this.a=a
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
dh:function dh(a){this.a=a},
di:function di(a){this.a=a},
dj:function dj(a){this.a=a},
ak:function ak(){},
aS:function aS(){},
eK(a,b,c){if(a>>>0!==a||a>=c)throw A.e(A.dc(b,a))},
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
dF(a,b){var t=b.c
return t==null?b.c=A.bC(a,"e8",[b.x]):t},
el(a){var t=a.w
if(t===6||t===7)return A.el(a.x)
return t===11||t===12},
h6(a){return a.as},
a0(a){return A.d2(v.typeUniverse,a,!1)},
iF(a,b){var t,s,r,q,p
if(a==null)return null
t=b.y
s=a.Q
if(s==null)s=a.Q=new Map()
r=b.as
q=s.get(r)
if(q!=null)return q
p=A.am(v.typeUniverse,a.x,t,0)
s.set(r,p)
return p},
am(a0,a1,a2,a3){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=a1.w
switch(a){case 5:case 1:case 2:case 3:case 4:return a1
case 6:t=a1.x
s=A.am(a0,t,a2,a3)
if(s===t)return a1
return A.ez(a0,s,!0)
case 7:t=a1.x
s=A.am(a0,t,a2,a3)
if(s===t)return a1
return A.ey(a0,s,!0)
case 8:r=a1.y
q=A.aV(a0,r,a2,a3)
if(q===r)return a1
return A.bC(a0,a1.x,q)
case 9:p=a1.x
o=A.am(a0,p,a2,a3)
n=a1.y
m=A.aV(a0,n,a2,a3)
if(o===p&&m===n)return a1
return A.dJ(a0,o,m)
case 10:l=a1.x
k=a1.y
j=A.aV(a0,k,a2,a3)
if(j===k)return a1
return A.eA(a0,l,j)
case 11:i=a1.x
h=A.am(a0,i,a2,a3)
g=a1.y
f=A.i7(a0,g,a2,a3)
if(h===i&&f===g)return a1
return A.ex(a0,h,f)
case 12:e=a1.y
a3+=e.length
d=A.aV(a0,e,a2,a3)
p=a1.x
o=A.am(a0,p,a2,a3)
if(d===e&&o===p)return a1
return A.dK(a0,o,d,!0)
case 13:c=a1.x
if(c<a3)return a1
b=a2[c-a3]
if(b==null)return a1
return b
default:throw A.e(A.bH("Attempted to substitute unexpected RTI kind "+a))}},
aV(a,b,c,d){var t,s,r,q,p=b.length,o=A.d3(p)
for(t=!1,s=0;s<p;++s){r=b[s]
q=A.am(a,r,c,d)
if(q!==r)t=!0
o[s]=q}return t?o:b},
i8(a,b,c,d){var t,s,r,q,p,o,n=b.length,m=A.d3(n)
for(t=!1,s=0;s<n;s+=3){r=b[s]
q=b[s+1]
p=b[s+2]
o=A.am(a,p,c,d)
if(o!==p)t=!0
m.splice(s,3,r,q,o)}return t?m:b},
i7(a,b,c,d){var t,s=b.a,r=A.aV(a,s,c,d),q=b.b,p=A.aV(a,q,c,d),o=b.c,n=A.i8(a,o,c,d)
if(r===s&&p===q&&n===o)return b
t=new A.ch()
t.a=r
t.b=p
t.c=n
return t},
f(a,b){a[v.arrayRti]=b
return a},
db(a){var t=a.$S
if(t!=null){if(typeof t=="number")return A.iA(t)
return a.$S()}return null},
iE(a,b){var t
if(A.el(b))if(a instanceof A.G){t=A.db(a)
if(t!=null)return t}return A.a9(a)},
a9(a){if(a instanceof A.n)return A.j(a)
if(Array.isArray(a))return A.B(a)
return A.dM(J.aE(a))},
B(a){var t=a[v.arrayRti],s=u.b
if(t==null)return s
if(t.constructor!==s.constructor)return s
return t},
j(a){var t=a.$ti
return t!=null?t:A.dM(a)},
dM(a){var t=a.constructor,s=t.$ccache
if(s!=null)return s
return A.hP(a,t)},
hP(a,b){var t=a instanceof A.G?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,s=A.hv(v.typeUniverse,t.name)
b.$ccache=s
return s},
iA(a){var t,s=v.types,r=s[a]
if(typeof r=="string"){t=A.d2(v.typeUniverse,r,!1)
s[a]=t
return t}return r},
iz(a){return A.a8(A.j(a))},
dU(a){var t=A.db(a)
return A.a8(t==null?A.a9(a):t)},
dQ(a){var t
if(a instanceof A.ak)return A.is(a.$r,a.an())
t=a instanceof A.G?A.db(a):null
if(t!=null)return t
if(u.R.b(a))return J.fr(a).a
if(Array.isArray(a))return A.B(a)
return A.a9(a)},
a8(a){var t=a.r
return t==null?a.r=new A.cm(a):t},
is(a,b){var t,s,r=b,q=r.length
if(q===0)return u.F
if(0>=q)return A.a(r,0)
t=A.bE(v.typeUniverse,A.dQ(r[0]),"@<0>")
for(s=1;s<q;++s){if(!(s<r.length))return A.a(r,s)
t=A.eC(v.typeUniverse,t,A.dQ(r[s]))}return A.bE(v.typeUniverse,t,a)},
V(a){return A.a8(A.d2(v.typeUniverse,a,!1))},
hO(a){var t=this
t.b=A.i6(t)
return t.b(a)},
i6(a){var t,s,r,q,p
if(a===u.K)return A.hY
if(A.aF(a))return A.i1
t=a.w
if(t===6)return A.hL
if(t===1)return A.eU
if(t===7)return A.hT
s=A.i5(a)
if(s!=null)return s
if(t===8){r=a.x
if(a.y.every(A.aF)){a.f="$i"+r
if(r==="h")return A.hW
if(a===u.m)return A.hV
return A.i0}}else if(t===10){q=A.iq(a.x,a.y)
p=q==null?A.eU:q
return p==null?A.eJ(p):p}return A.hJ},
i5(a){if(a.w===8){if(a===u.S)return A.dO
if(a===u.i||a===u.H)return A.hX
if(a===u.N)return A.i_
if(a===u.y)return A.dN}return null},
hN(a){var t=this,s=A.hI
if(A.aF(t))s=A.hC
else if(t===u.K)s=A.eJ
else if(A.aY(t)){s=A.hK
if(t===u.a3)s=A.hA
else if(t===u.u)s=A.dL
else if(t===u.A)s=A.hy
else if(t===u.ae)s=A.eI
else if(t===u.I)s=A.hz
else if(t===u.z)s=A.hB}else if(t===u.S)s=A.N
else if(t===u.N)s=A.x
else if(t===u.y)s=A.hx
else if(t===u.H)s=A.eH
else if(t===u.i)s=A.eF
else if(t===u.m)s=A.eG
t.a=s
return t.a(a)},
hJ(a){var t=this
if(a==null)return A.aY(t)
return A.f0(v.typeUniverse,A.iE(a,t),t)},
hL(a){if(a==null)return!0
return this.x.b(a)},
i0(a){var t,s=this
if(a==null)return A.aY(s)
t=s.f
if(a instanceof A.n)return!!a[t]
return!!J.aE(a)[t]},
hW(a){var t,s=this
if(a==null)return A.aY(s)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
t=s.f
if(a instanceof A.n)return!!a[t]
return!!J.aE(a)[t]},
hV(a){var t=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.n)return!!a[t.f]
return!0}if(typeof a=="function")return!0
return!1},
eT(a){if(typeof a=="object"){if(a instanceof A.n)return u.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
hI(a){var t=this
if(a==null){if(A.aY(t))return a}else if(t.b(a))return a
throw A.C(A.eN(a,t),new Error())},
hK(a){var t=this
if(a==null||t.b(a))return a
throw A.C(A.eN(a,t),new Error())},
eN(a,b){return new A.aU("TypeError: "+A.eq(a,A.H(b,null)))},
ik(a,b,c,d){if(A.f0(v.typeUniverse,a,b))return a
throw A.C(A.hn("The type argument '"+A.H(a,null)+"' is not a subtype of the type variable bound '"+A.H(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
eq(a,b){return A.bP(a)+": type '"+A.H(A.dQ(a),null)+"' is not a subtype of type '"+b+"'"},
hn(a){return new A.aU("TypeError: "+a)},
R(a,b){return new A.aU("TypeError: "+A.eq(a,b))},
hT(a){var t=this
return t.x.b(a)||A.dF(v.typeUniverse,t).b(a)},
hY(a){return a!=null},
eJ(a){if(a!=null)return a
throw A.C(A.R(a,"Object"),new Error())},
i1(a){return!0},
hC(a){return a},
eU(a){return!1},
dN(a){return!0===a||!1===a},
hx(a){if(!0===a)return!0
if(!1===a)return!1
throw A.C(A.R(a,"bool"),new Error())},
hy(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.C(A.R(a,"bool?"),new Error())},
eF(a){if(typeof a=="number")return a
throw A.C(A.R(a,"double"),new Error())},
hz(a){if(typeof a=="number")return a
if(a==null)return a
throw A.C(A.R(a,"double?"),new Error())},
dO(a){return typeof a=="number"&&Math.floor(a)===a},
N(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.C(A.R(a,"int"),new Error())},
hA(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.C(A.R(a,"int?"),new Error())},
hX(a){return typeof a=="number"},
eH(a){if(typeof a=="number")return a
throw A.C(A.R(a,"num"),new Error())},
eI(a){if(typeof a=="number")return a
if(a==null)return a
throw A.C(A.R(a,"num?"),new Error())},
i_(a){return typeof a=="string"},
x(a){if(typeof a=="string")return a
throw A.C(A.R(a,"String"),new Error())},
dL(a){if(typeof a=="string")return a
if(a==null)return a
throw A.C(A.R(a,"String?"),new Error())},
eG(a){if(A.eT(a))return a
throw A.C(A.R(a,"JSObject"),new Error())},
hB(a){if(a==null)return a
if(A.eT(a))return a
throw A.C(A.R(a,"JSObject?"),new Error())},
eV(a,b){var t,s,r
for(t="",s="",r=0;r<a.length;++r,s=", ")t+=s+A.H(a[r],b)
return t},
i4(a,b){var t,s,r,q,p,o,n=a.x,m=a.y
if(""===n)return"("+A.eV(m,b)+")"
t=m.length
s=n.split(",")
r=s.length-t
for(q="(",p="",o=0;o<t;++o,p=", "){q+=p
if(r===0)q+="{"
q+=A.H(m[o],b)
if(r>=0)q+=" "+s[r];++r}return q+"})"},
eQ(a2,a3,a4){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=", ",a1=null
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
if(!(k===2||k===3||k===4||k===5||l===q))p+=" extends "+A.H(l,a3)}p+=">"}else p=""
q=a2.x
j=a2.y
i=j.a
h=i.length
g=j.b
f=g.length
e=j.c
d=e.length
c=A.H(q,a3)
for(b="",a="",r=0;r<h;++r,a=a0)b+=a+A.H(i[r],a3)
if(f>0){b+=a+"["
for(a="",r=0;r<f;++r,a=a0)b+=a+A.H(g[r],a3)
b+="]"}if(d>0){b+=a+"{"
for(a="",r=0;r<d;r+=3,a=a0){b+=a
if(e[r+1])b+="required "
b+=A.H(e[r+2],a3)+" "+e[r]}b+="}"}if(a1!=null){a3.toString
a3.length=a1}return p+"("+b+") => "+c},
H(a,b){var t,s,r,q,p,o,n,m=a.w
if(m===5)return"erased"
if(m===2)return"dynamic"
if(m===3)return"void"
if(m===1)return"Never"
if(m===4)return"any"
if(m===6){t=a.x
s=A.H(t,b)
r=t.w
return(r===11||r===12?"("+s+")":s)+"?"}if(m===7)return"FutureOr<"+A.H(a.x,b)+">"
if(m===8){q=A.i9(a.x)
p=a.y
return p.length>0?q+("<"+A.eV(p,b)+">"):q}if(m===10)return A.i4(a,b)
if(m===11)return A.eQ(a,b,null)
if(m===12)return A.eQ(a.x,b,a.y)
if(m===13){o=a.x
n=b.length
o=n-1-o
if(!(o>=0&&o<n))return A.a(b,o)
return b[o]}return"?"},
i9(a){var t=A.f9(a)
if(t!=null)return t
return"minified:"+a},
hw(a,b){var t=a.tR[b]
while(typeof t=="string")t=a.tR[t]
return t},
hv(a,b){var t,s,r,q,p,o=a.eT,n=o[b]
if(n==null)return A.d2(a,b,!1)
else if(typeof n=="number"){t=n
s=A.bD(a,5,"#")
r=A.d3(t)
for(q=0;q<t;++q)r[q]=s
p=A.bC(a,b,r)
o[b]=p
return p}else return n},
hu(a,b){return A.eD(a.tR,b)},
ht(a,b){return A.eD(a.eT,b)},
d2(a,b,c){var t,s=a.eC,r=s.get(b)
if(r!=null)return r
t=A.eB(a,null,b,!1)
s.set(b,t)
return t},
bE(a,b,c){var t,s,r=b.z
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
r=A.dJ(a,b,c.w===9?c.y:[c])
q.set(t,r)
return r},
eB(a,b,c,d){return A.hl(A.hf(a,b,c,d))},
al(a,b){b.a=A.hN
b.b=A.hO
return b},
bD(a,b,c){var t,s,r=a.eC.get(c)
if(r!=null)return r
t=new A.T(null,null)
t.w=b
t.as=c
s=A.al(a,t)
a.eC.set(c,s)
return s},
ez(a,b,c){var t,s=b.as+"?",r=a.eC.get(s)
if(r!=null)return r
t=A.hr(a,b,s,c)
a.eC.set(s,t)
return t},
hr(a,b,c,d){var t,s,r
if(d){t=b.w
s=!0
if(!A.aF(b))if(!(b===u.P||b===u.T))if(t!==6)s=t===7&&A.aY(b.x)
if(s)return b
else if(t===1)return u.P}r=new A.T(null,null)
r.w=6
r.x=b
r.as=c
return A.al(a,r)},
ey(a,b,c){var t,s=b.as+"/",r=a.eC.get(s)
if(r!=null)return r
t=A.hp(a,b,s,c)
a.eC.set(s,t)
return t},
hp(a,b,c,d){var t,s
if(d){t=b.w
if(A.aF(b)||b===u.K)return b
else if(t===1)return A.bC(a,"e8",[b])
else if(b===u.P||b===u.T)return u.x}s=new A.T(null,null)
s.w=7
s.x=b
s.as=c
return A.al(a,s)},
hs(a,b){var t,s,r=""+b+"^",q=a.eC.get(r)
if(q!=null)return q
t=new A.T(null,null)
t.w=13
t.x=b
t.as=r
s=A.al(a,t)
a.eC.set(r,s)
return s},
bB(a){var t,s,r,q=a.length
for(t="",s="",r=0;r<q;++r,s=",")t+=s+a[r].as
return t},
ho(a){var t,s,r,q,p,o=a.length
for(t="",s="",r=0;r<o;r+=3,s=","){q=a[r]
p=a[r+1]?"!":":"
t+=s+q+p+a[r+2].as}return t},
bC(a,b,c){var t,s,r,q=b
if(c.length>0)q+="<"+A.bB(c)+">"
t=a.eC.get(q)
if(t!=null)return t
s=new A.T(null,null)
s.w=8
s.x=b
s.y=c
if(c.length>0)s.c=c[0]
s.as=q
r=A.al(a,s)
a.eC.set(q,r)
return r},
dJ(a,b,c){var t,s,r,q,p,o
if(b.w===9){t=b.x
s=b.y.concat(c)}else{s=c
t=b}r=t.as+(";<"+A.bB(s)+">")
q=a.eC.get(r)
if(q!=null)return q
p=new A.T(null,null)
p.w=9
p.x=t
p.y=s
p.as=r
o=A.al(a,p)
a.eC.set(r,o)
return o},
eA(a,b,c){var t,s,r="+"+(b+"("+A.bB(c)+")"),q=a.eC.get(r)
if(q!=null)return q
t=new A.T(null,null)
t.w=10
t.x=b
t.y=c
t.as=r
s=A.al(a,t)
a.eC.set(r,s)
return s},
ex(a,b,c){var t,s,r,q,p,o=b.as,n=c.a,m=n.length,l=c.b,k=l.length,j=c.c,i=j.length,h="("+A.bB(n)
if(k>0){t=m>0?",":""
h+=t+"["+A.bB(l)+"]"}if(i>0){t=m>0?",":""
h+=t+"{"+A.ho(j)+"}"}s=o+(h+")")
r=a.eC.get(s)
if(r!=null)return r
q=new A.T(null,null)
q.w=11
q.x=b
q.y=c
q.as=s
p=A.al(a,q)
a.eC.set(s,p)
return p},
dK(a,b,c,d){var t,s=b.as+("<"+A.bB(c)+">"),r=a.eC.get(s)
if(r!=null)return r
t=A.hq(a,b,c,s,d)
a.eC.set(s,t)
return t},
hq(a,b,c,d,e){var t,s,r,q,p,o,n,m
if(e){t=c.length
s=A.d3(t)
for(r=0,q=0;q<t;++q){p=c[q]
if(p.w===1){s[q]=p;++r}}if(r>0){o=A.am(a,b,s,0)
n=A.aV(a,c,s,0)
return A.dK(a,o,n,c!==n)}}m=new A.T(null,null)
m.w=12
m.x=b
m.y=c
m.as=d
return A.al(a,m)},
hf(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
hl(a){var t,s,r,q,p,o,n,m=a.r,l=a.s
for(t=m.length,s=0;s<t;){r=m.charCodeAt(s)
if(r>=48&&r<=57)s=A.hh(s+1,r,m,l)
else if((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124)s=A.es(a,s,m,l,!1)
else if(r===46)s=A.es(a,s,m,l,!0)
else{++s
switch(r){case 44:break
case 58:l.push(!1)
break
case 33:l.push(!0)
break
case 59:l.push(A.aD(a.u,a.e,l.pop()))
break
case 94:l.push(A.hs(a.u,l.pop()))
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
case 62:A.hj(a,l)
break
case 38:A.hi(a,l)
break
case 63:q=a.u
l.push(A.ez(q,A.aD(q,a.e,l.pop()),a.n))
break
case 47:q=a.u
l.push(A.ey(q,A.aD(q,a.e,l.pop()),a.n))
break
case 40:l.push(-3)
l.push(a.p)
a.p=l.length
break
case 41:A.hg(a,l)
break
case 91:l.push(a.p)
a.p=l.length
break
case 93:p=l.splice(a.p)
A.et(a.u,a.e,p)
a.p=l.pop()
l.push(p)
l.push(-1)
break
case 123:l.push(a.p)
a.p=l.length
break
case 125:p=l.splice(a.p)
A.hm(a.u,a.e,p)
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
return A.aD(a.u,a.e,n)},
hh(a,b,c,d){var t,s,r=b-48
for(t=c.length;a<t;++a){s=c.charCodeAt(a)
if(!(s>=48&&s<=57))break
r=r*10+(s-48)}d.push(r)
return a},
es(a,b,c,d,e){var t,s,r,q,p,o,n=b+1
for(t=c.length;n<t;++n){s=c.charCodeAt(n)
if(s===46){if(e)break
e=!0}else{if(!((((s|32)>>>0)-97&65535)<26||s===95||s===36||s===124))r=s>=48&&s<=57
else r=!0
if(!r)break}}q=c.substring(b,n)
if(e){t=a.u
p=a.e
if(p.w===9)p=p.x
o=A.hw(t,p.x)[q]
if(o==null)A.aH('No "'+q+'" in "'+A.h6(p)+'"')
d.push(A.bE(t,p,o))}else d.push(q)
return n},
hj(a,b){var t,s=a.u,r=A.er(a,b),q=b.pop()
if(typeof q=="string")b.push(A.bC(s,q,r))
else{t=A.aD(s,a.e,q)
switch(t.w){case 11:b.push(A.dK(s,t,r,a.n))
break
default:b.push(A.dJ(s,t,r))
break}}},
hg(a,b){var t,s,r,q=a.u,p=b.pop(),o=null,n=null
if(typeof p=="number")switch(p){case-1:o=b.pop()
break
case-2:n=b.pop()
break
default:b.push(p)
break}else b.push(p)
t=A.er(a,b)
p=b.pop()
switch(p){case-3:p=b.pop()
if(o==null)o=q.sEA
if(n==null)n=q.sEA
s=A.aD(q,a.e,p)
r=new A.ch()
r.a=t
r.b=o
r.c=n
b.push(A.ex(q,s,r))
return
case-4:b.push(A.eA(q,b.pop(),t))
return
default:throw A.e(A.bH("Unexpected state under `()`: "+A.i(p)))}},
hi(a,b){var t=b.pop()
if(0===t){b.push(A.bD(a.u,1,"0&"))
return}if(1===t){b.push(A.bD(a.u,4,"1&"))
return}throw A.e(A.bH("Unexpected extended operation "+A.i(t)))},
er(a,b){var t=b.splice(a.p)
A.et(a.u,a.e,t)
a.p=b.pop()
return t},
aD(a,b,c){if(typeof c=="string")return A.bC(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.hk(a,b,c)}else return c},
et(a,b,c){var t,s=c.length
for(t=0;t<s;++t)c[t]=A.aD(a,b,c[t])},
hm(a,b,c){var t,s=c.length
for(t=2;t<s;t+=3)c[t]=A.aD(a,b,c[t])},
hk(a,b,c){var t,s,r=b.w
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
f0(a,b,c){var t,s=b.d
if(s==null)s=b.d=new Map()
t=s.get(c)
if(t==null){t=A.y(a,b,null,c,null)
s.set(c,t)}return t},
y(a,b,c,d,e){var t,s,r,q,p,o,n,m,l,k,j
if(b===d)return!0
if(A.aF(d))return!0
t=b.w
if(t===4)return!0
if(A.aF(b))return!1
if(b.w===1)return!0
s=t===13
if(s)if(A.y(a,c[b.x],c,d,e))return!0
r=d.w
q=u.P
if(b===q||b===u.T){if(r===7)return A.y(a,b,c,d.x,e)
return d===q||d===u.T||r===6}if(d===u.K){if(t===7)return A.y(a,b.x,c,d,e)
return t!==6}if(t===7){if(!A.y(a,b.x,c,d,e))return!1
return A.y(a,A.dF(a,b),c,d,e)}if(t===6)return A.y(a,q,c,d,e)&&A.y(a,b.x,c,d,e)
if(r===7){if(A.y(a,b,c,d.x,e))return!0
return A.y(a,b,c,A.dF(a,d),e)}if(r===6)return A.y(a,b,c,q,e)||A.y(a,b,c,d.x,e)
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
if(!A.y(a,k,c,j,e)||!A.y(a,j,e,k,c))return!1}return A.eS(a,b.x,c,d.x,e)}if(r===11){if(b===u.M)return!0
if(q)return!1
return A.eS(a,b,c,d,e)}if(t===8){if(r!==8)return!1
return A.hU(a,b,c,d,e)}if(p&&r===10)return A.hZ(a,b,c,d,e)
return!1},
eS(a2,a3,a4,a5,a6){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
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
hU(a,b,c,d,e){var t,s,r,q,p,o=b.x,n=d.x
while(o!==n){t=a.tR[o]
if(t==null)return!1
if(typeof t=="string"){o=t
continue}s=t[n]
if(s==null)return!1
r=s.length
q=r>0?new Array(r):v.typeUniverse.sEA
for(p=0;p<r;++p)q[p]=A.bE(a,b,s[p])
return A.eE(a,q,null,c,d.y,e)}return A.eE(a,b.y,null,c,d.y,e)},
eE(a,b,c,d,e,f){var t,s=b.length
for(t=0;t<s;++t)if(!A.y(a,b[t],d,e[t],f))return!1
return!0},
hZ(a,b,c,d,e){var t,s=b.y,r=d.y,q=s.length
if(q!==r.length)return!1
if(b.x!==d.x)return!1
for(t=0;t<q;++t)if(!A.y(a,s[t],c,r[t],e))return!1
return!0},
aY(a){var t=a.w,s=!0
if(!(a===u.P||a===u.T))if(!A.aF(a))if(t!==6)s=t===7&&A.aY(a.x)
return s},
aF(a){var t=a.w
return t===2||t===3||t===4||t===5||a===u.X},
eD(a,b){var t,s,r=Object.keys(b),q=r.length
for(t=0;t<q;++t){s=r[t]
a[s]=b[s]}},
d3(a){return a>0?new Array(a):v.typeUniverse.sEA},
T:function T(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
ch:function ch(){this.c=this.b=this.a=null},
cm:function cm(a){this.a=a},
cg:function cg(){},
aU:function aU(a){this.a=a},
ew(a,b,c){return 0},
M:function M(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
aT:function aT(a,b){this.a=a
this.$ti=b},
cc:function cc(){},
aM(a,b,c){return b.h("@<0>").a2(c).h("dC<1,2>").a(A.eY(a,new A.a3(b.h("@<0>").a2(c).h("a3<1,2>"))))},
X(a,b){return new A.a3(a.h("@<0>").a2(b).h("a3<1,2>"))},
ee(a){return new A.U(a.h("U<0>"))},
Y(a){return new A.U(a.h("U<0>"))},
fR(a,b){return b.h("ed<0>").a(A.it(a,new A.U(b.h("U<0>"))))},
dI(){var t=Object.create(null)
t["<non-identifier-key>"]=t
delete t["<non-identifier-key>"]
return t},
dH(a,b,c){var t=new A.aC(a,b,c.h("aC<0>"))
t.c=a.e
return t},
cD(a,b){var t,s,r=A.ee(b)
for(t=a.length,s=0;s<a.length;a.length===t||(0,A.z)(a),++s)r.i(0,b.a(a[s]))
return r},
fS(a,b){var t=A.ee(b)
t.L(0,a)
return t},
dD(a){var t,s
if(A.dW(a))return"{...}"
t=new A.ax("")
try{s={}
B.a.i($.O,a)
t.a+="{"
s.a=!0
a.N(0,new A.cE(s,t))
t.a+="}"}finally{if(0>=$.O.length)return A.a($.O,-1)
$.O.pop()}s=t.a
return s.charCodeAt(0)==0?s:s},
U:function U(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
ck:function ck(a){this.a=a
this.c=this.b=null},
aC:function aC(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
m:function m(){},
E:function E(){},
cE:function cE(a,b){this.a=a
this.b=b},
ai:function ai(){},
bA:function bA(){},
i3(a,b){var t,s,r,q=null
try{q=JSON.parse(a)}catch(s){t=A.dv(s)
r=String(t)
throw A.e(new A.cr(r))}r=A.d4(q)
return r},
d4(a){var t
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.ci(a,Object.create(null))
for(t=0;t<a.length;++t)a[t]=A.d4(a[t])
return a},
eb(a,b,c){return new A.bb(a,b)},
hG(a){return a.br()},
hd(a,b){return new A.cY(a,[],A.ip())},
he(a,b,c){var t,s=new A.ax(""),r=A.hd(s,b)
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
cx:function cx(){},
cz:function cz(a){this.b=a},
cy:function cy(a){this.a=a},
cZ:function cZ(){},
d_:function d_(a,b){this.a=a
this.b=b},
cY:function cY(a,b,c){this.c=a
this.a=b
this.b=c},
cA:function cA(){},
aN(a,b,c,d){var t,s=J.fL(a,d)
if(a!==0&&b!=null)for(t=0;t<a;++t)s[t]=b
return s},
fT(a,b,c){var t,s,r=A.f([],c.h("q<0>"))
for(t=a.length,s=0;s<a.length;a.length===t||(0,A.z)(a),++s)B.a.i(r,c.a(a[s]))
r.$flags=1
return r},
a_(a,b){var t,s
if(Array.isArray(a))return A.f(a.slice(0),b.h("q<0>"))
t=A.f([],b.h("q<0>"))
for(s=J.b_(a);s.l();)B.a.i(t,s.gn())
return t},
en(a,b,c){var t=J.b_(b)
if(!t.l())return a
if(c.length===0){do a+=A.i(t.gn())
while(t.l())}else{a+=A.i(t.gn())
while(t.l())a=a+c+A.i(t.gn())}return a},
fD(a,b,c){var t=A.h0(a,b,c,0,0,0,0,0,!0)
return new A.ac(t==null?new A.cp(a,b,c,0,0,0,0,0).$0():t,0,!0)},
fE(a){var t=Math.abs(a),s=a<0?"-":""
if(t>=1000)return""+a
if(t>=100)return s+"0"+t
if(t>=10)return s+"00"+t
return s+"000"+t},
e7(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bO(a){if(a>=10)return""+a
return"0"+a},
cq(a){return new A.aq(864e8*a)},
bP(a){if(typeof a=="number"||A.dN(a)||a==null)return J.ao(a)
if(typeof a=="string")return JSON.stringify(a)
return A.ei(a)},
bH(a){return new A.bG(a)},
dy(a){return new A.a1(!1,null,null,a)},
ft(a,b,c){return new A.a1(!0,a,b,c)},
h3(a){var t=null
return new A.aQ(t,t,!1,t,t,a)},
aR(a,b,c,d,e){return new A.aQ(b,c,!0,a,d,"Invalid value")},
h4(a,b,c){if(0>a||a>c)throw A.e(A.aR(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.e(A.aR(b,a,c,"end",null))
return b}return c},
ek(a,b){return a},
e9(a,b,c,d){return new A.bQ(b,!0,a,d,"Index out of range")},
aA(a){return new A.bt(a)},
ep(a){return new A.ce(a)},
em(a){return new A.bp(a)},
K(a){return new A.bM(a)},
fK(a,b,c){var t,s
if(A.dW(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}t=A.f([],u.s)
B.a.i($.O,a)
try{A.i2(a,t)}finally{if(0>=$.O.length)return A.a($.O,-1)
$.O.pop()}s=A.en(b,u.Y.a(t),", ")+c
return s.charCodeAt(0)==0?s:s},
dz(a,b,c){var t,s
if(A.dW(a))return b+"..."+c
t=new A.ax(b)
B.a.i($.O,a)
try{s=t
s.a=A.en(s.a,a,", ")}finally{if(0>=$.O.length)return A.a($.O,-1)
$.O.pop()}t.a+=c
s=t.a
return s.charCodeAt(0)==0?s:s},
i2(a,b){var t,s,r,q,p,o,n,m=a.gq(a),l=0,k=0
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
dE(a,b,c,d){var t
if(B.f===c){t=J.P(a)
b=J.P(b)
return A.dG(A.aj(A.aj($.dw(),t),b))}if(B.f===d){t=J.P(a)
b=J.P(b)
c=J.P(c)
return A.dG(A.aj(A.aj(A.aj($.dw(),t),b),c))}t=J.P(a)
b=J.P(b)
c=J.P(c)
d=J.P(d)
d=A.dG(A.aj(A.aj(A.aj(A.aj($.dw(),t),b),c),d))
return d},
cp:function cp(a,b,c,d,e,f,g,h){var _=this
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
aq:function aq(a){this.a=a},
cV:function cV(){},
p:function p(){},
bG:function bG(a){this.a=a},
bs:function bs(){},
a1:function a1(a,b,c,d){var _=this
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
cW:function cW(a){this.a=a},
cr:function cr(a){this.a=a},
c:function c(){},
Q:function Q(a,b,c){this.a=a
this.b=b
this.$ti=c},
bj:function bj(){},
n:function n(){},
ax:function ax(a){this.a=a},
f3(a,b,c){A.ik(c,u.H,"T","max")
return Math.max(c.a(a),c.a(b))},
cl:function cl(){this.b=this.a=0},
aI:function aI(a,b,c){this.a=a
this.b=b
this.c=c},
eZ(a,b,c){var t,s,r,q,p,o,n,m=b.toUpperCase(),l=m.length
if(l===0)return B.V
t=A.f([],u.p)
s=new A.df(t,c,A.f([],u.t),m,a)
if(0>=l)return A.a(m,0)
r=m.charCodeAt(0)
for(l=a.a*a.b,q=a.c,p=q.length,o=0;n=o<l,n;++o){if(n){if(!(o<p))return A.a(q,o)
n=q.charCodeAt(o)===46}else n=!0
if(n)continue
if(!(o<p))return A.a(q,o)
if(q.charCodeAt(o)!==r)continue
s.$1(o)
if(t.length>=c)break}return t},
ij(a,b){var t,s,r,q,p,o,n=b.toUpperCase(),m=A.Y(u.S),l=n.length
if(l===0)return m
t=new A.da(A.f([],u.t),n,m,a)
if(0>=l)return A.a(n,0)
s=n.charCodeAt(0)
for(l=a.a*a.b,r=a.c,q=r.length,p=0;o=p<l,o;++p){if(o){if(!(p<q))return A.a(r,p)
o=r.charCodeAt(p)===46}else o=!0
if(o)continue
if(!(p<q))return A.a(r,p)
if(r.charCodeAt(p)!==s)continue
t.$1(p)}return m},
df:function df(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
da:function da(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
f8(a,b,c){var t
if(a===B.p)return B.a4
if(b===6)return B.Y[B.b.J(B.b.A(c,7)*2654435761,8)]
t=B.Z.p(0,b)
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
h1(a){var t,s
for(t=0;t<2;++t){s=B.T[t]
if(s.c===a)return s}return null},
ej(a,b,c,d){A.cD(d,A.B(d).c)
A.cD(b,A.B(b).c)
return new A.cH(a,d,b,c)},
bm:function bm(a,b,c,d){var _=this
_.c=a
_.d=b
_.a=c
_.b=d},
cH:function cH(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.as=_.Q=_.z=_.x=$},
cI:function cI(a){this.a=a},
cJ:function cJ(a){this.a=a},
cK:function cK(a){this.a=a},
cL:function cL(a){this.a=a},
cM:function cM(a,b){this.a=a
this.b=b},
cN:function cN(a){this.a=a},
h5(){var t,s=A.X(u.w,u.S)
for(t=0;t<11;++t)s.j(0,B.S[t],0)
return new A.cO(s)},
iO(a1,a2,a3,a4,a5,a6,a7,a8,a9){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=null,a0=a6.c
if(0>=a0.length)return A.a(a0,0)
t=new A.cl()
t.aL(1e6+a4*7919+a0.charCodeAt(0)*104729+a1)
a0=a9.a
s=a9.b
r=A.ig(a0,s,a9.c,t)
if(r==null){a7.i(0,B.r)
return a}for(q=a9.r,p=q.length,o=r,n=0;n<p;++n){m=a3.bb(q[n])
if(J.fp(m))continue
l=t.K(m.length)
if(!(l>=0&&l<m.length))return A.a(m,l)
k=A.f5(o,a0,s,m[l],t)
if(k==null){a7.i(0,B.C)
return a}o=k}q=a3.e
l=q.length
j=a
if(l!==0){i=a9.gaB()
if(a5!=null)q=A.f([a5],u.s)
l=A.B(q)
h=l.h("u<1>")
q=A.a_(new A.u(q,l.h("o(1)").a(new A.ds(i,a2)),h),h.h("c.E"))
q.$flags=1
m=q
q=m.length
if(q!==0){q=t.K(q)
if(!(q>=0&&q<m.length))return A.a(m,q)
j=m[q]
k=A.f5(o,a0,s,j,t)
if(k==null){a7.i(0,B.t)
return a}o=k}}g=A.iu(o,a3.aZ(a9.w),t)
if(g==null){a7.i(0,B.v)
return a}f=new A.aI(a0,s,g)
if(!f.gac()){a7.i(0,B.w)
return a}e=A.ir(f,a3.a)
d=a3.b.a_(0,e)
a0=d.b
s=a0.length
if(s<a9.d){a7.i(0,B.x)
return a}if(s>a9.e){a7.i(0,B.y)
return a}if(e.a===0)c=0
else{s=A.j(e)
c=new A.ar(e,s.h("b(1)").a(new A.dt()),s.h("ar<1,b>")).af(0,B.D)}if(c<a9.f){a7.i(0,B.z)
return a}s=A.B(a0)
if(new A.u(a0,s.h("o(1)").a(new A.du()),s.h("u<1>")).gm(0)<p){a7.i(0,B.u)
return a}if(j!=null&&!B.a.t(a0,j)){a7.i(0,B.A)
return a}b=A.ej(f,d.a,j,a0)
a0=b.gaw()
if(a0.gO(a0)){a7.i(0,B.B)
return a}return b},
iw(a,b,c,d,e,f,g,h){var t,s,r=A.f8(e,h,c)
for(t=0;t<6e4;++t){s=A.iO(t,a,b,c,d,e,f,!0,r)
if(s!=null)return s}return null},
ic(a){var t,s,r,q,p,o,n,m,l=A.f([],u.s),k=a.a
if(!k.gac())B.a.i(l,"board is not connected")
t=a.b
s=A.a_(t,u.N)
r=a.c
B.a.L(s,r)
q=s.length
p=0
for(;p<s.length;s.length===q||(0,A.z)(s),++p){o=s[p]
if(o.length<4)B.a.i(l,o+" is shorter than 4")
if(A.eZ(k,o,1).length===0)B.a.i(l,o+" is not traceable")}s=a.gaw()
if(s.gO(s)){q=A.j(s)
B.a.i(l,"no required word uses: "+new A.ar(s,q.h("d(1)").a(new A.d5(a)),q.h("ar<1,d>")).G(0,", "))}n=A.cD(t,A.B(t).c).b7(A.cD(r,A.B(r).c))
if(n.a!==0)B.a.i(l,"in both lists: "+A.h8(n,5,A.j(n).c).G(0,", "))
m=a.d
if(m!=null&&!B.a.t(t,m))B.a.i(l,"Canuckle word "+m+" is not in the required list")
return l},
cs:function cs(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
ct:function ct(a,b){this.a=a
this.b=b},
cu:function cu(a,b){this.a=a
this.b=b},
w:function w(a,b){this.a=a
this.b=b},
cO:function cO(a){this.a=a},
cP:function cP(){},
cQ:function cQ(){},
ds:function ds(a,b){this.a=a
this.b=b},
dt:function dt(){},
du:function du(){},
d5:function d5(a){this.a=a},
fw(a1){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b="tools\\data\\dict_blocked.txt",a=A.dP("tools\\data\\stoplist.txt"),a0=u.N
a=A.fS(a,a0)
t=A.dP("tools\\data\\dict_bonus_only.txt")
a.L(0,t)
s=A.dP("tools\\data\\allowlist.txt")
r=$.cn.p(0,b)!=null?A.f1(b):B.W
t=A.Y(a0)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.z)(r),++p)t.i(0,r[p].a)
o=A.X(u.S,u.c)
q=u.O
n=A.a_(a1,q)
B.a.L(n,r)
m=n.length
l=u.B
p=0
for(;p<n.length;n.length===m||(0,A.z)(n),++p){k=n[p]
j=k.a.length
i=o.p(0,j)
if(i==null){i=A.f([],l)
o.j(0,j,i)
j=i}else j=i
J.dx(j,k)}h=A.Y(a0)
for(a0=new A.a4(o,o.$ti.h("a4<1,2>")).gq(0);a0.l();){g=a0.d
n=g.a
f=B.a_.p(0,n)
if(f==null)f=n>8?0.1:0
if(f<=0)continue
e=g.b
n=new A.co()
m=e.length-1
if(m<=32)A.ev(e,0,m,n,q)
else A.eu(e,0,m,n,q)
d=B.h.az(e.length*f)
c=0
for(;;){if(!(c<d&&c<e.length))break
A:{if(!(c<e.length))return A.a(e,c)
n=e[c]
if(n.b<=0)break
if(a.t(0,n.a))break A
if(!(c<e.length))return A.a(e,c)
if(t.t(0,e[c].a))break A
if(!(c<e.length))return A.a(e,c)
h.i(0,e[c].a)}++c}}for(a0=A.dH(s,s.r,A.j(s).c),t=a0.$ti.c;a0.l();){q=a0.d
if(q==null)q=t.a(q)
if(!a.t(0,q))h.i(0,q)}return new A.bI(h)},
hE(a,b){var t
A.x(a)
A.x(b)
t=B.b.B(a.length,b.length)
return t!==0?t:B.c.B(a,b)},
dP(a){var t,s,r,q,p,o=$.cn.p(0,a)
if(o==null)return A.Y(u.N)
t=A.Y(u.N)
for(s=B.l.av(o),r=s.length,q=0;q<s.length;s.length===r||(0,A.z)(s),++q){p=B.c.aD(s[q])
if(p.length===0||B.c.aH(p,"#"))continue
t.i(0,p.toUpperCase())}return t},
bI:function bI(a){this.a=a},
co:function co(){},
fQ(a,b){var t,s,r,q,p,o,n,m,l,k,j,i=A.aN(26,0,!1,u.S)
for(t=a.length,s=0;s<a.length;a.length===t||(0,A.z)(a),++s){r=a[s]
if(r.b<1e6)continue
for(q=r.a,p=q.length,o=0;o<p;++o){n=q.charCodeAt(o)-65
if(n>=0&&n<=25){if(!(n>=0&&n<26))return A.a(i,n)
B.a.j(i,n,i[n]+1)}}}t=A.f([],u.n)
for(n=0;n<26;++n){q=i[n]
if(q<1)q=1
t.push(Math.pow(q,b))}m=B.a.af(t,B.E)
l=A.f([],u.s)
k=A.f([],u.t)
for(j=0,n=0;n<26;++n){if(!(n<t.length))return A.a(t,n)
j+=Math.max(1,B.h.bk(t[n]/m*1e6))
B.a.i(l,A.D(65+n))
B.a.i(k,j)}return new A.aL(l,k,j)},
iu(a,b,c){var t,s,r,q,p,o,n,m,l=u.s,k=A.f(a.split(""),l),j=A.f([],u.t)
for(t=0,s=0,r=0;r<k.length;++r){q=k[r]
if(q===".")continue;++s
if(q==="#")B.a.i(j,r)
else if(B.c.t("AEIOU",q))++t}if(s===0)return null
p=B.h.b_(s*0.3)
o=B.h.az(s*0.48)
if(t>o)return null
n=p+c.K(Math.max(1,o-p+1))-t
m=A.f([],l)
for(r=0;r<j.length;++r){if(r<n){l=c.K(5)
if(!(l>=0&&l<5))return A.a("AEIOU",l)
l="AEIOU"[l]}else l=b.bf(c)
B.a.i(m,l)}B.a.aG(m,c)
for(r=0;r<j.length;++r){l=j[r]
if(!(r<m.length))return A.a(m,r)
B.a.j(k,l,m[r])}return B.a.ae(k)},
aL:function aL(a,b,c){this.a=a
this.b=b
this.c=c},
ie(){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=new A.d6()
d.$1("Loading dictionary...")
t=A.f1("tools\\data\\dict.txt")
s=A.ih(t)
r=A.fw(t)
q=$.cn.p(0,"tools\\data\\canuckle_words.txt")
p=u.s
o=u.e
o=new A.av(A.f((q==null?"":q).split("\n"),p),u.v.a(new A.d7()),o).aI(0,o.h("o(Z.E)").a(new A.d8()))
n=A.a_(o,o.$ti.h("c.E"))
q=A.B(n)
o=q.h("u<1>")
q=A.a_(new A.u(n,q.h("o(1)").a(r.gb8()),o),o.h("c.E"))
q.$flags=1
m=q
q=r.a
d.$1(""+s.b+" words in the trie, "+q.a+" required-eligible.")
d.$1(""+n.length+" Canuckle answers, "+m.length+" of them usable as a seed.\n")
o=m.length
if(o<100)A.dS("Only "+o+" seedable Canuckle words. Every board would draw from too small a pool.")
o=u.S
l=u.h
k=A.X(o,l)
for(j=t.length,i=0;i<t.length;t.length===j||(0,A.z)(t),++i){h=t[i].a
g=h.length
if(g<8)continue
if(!q.t(0,h))continue
f=k.p(0,g)
if(f==null){f=A.f([],p)
k.j(0,g,f)
g=f}else g=f
J.dx(g,h)}q=k.$ti.h("a5<1>")
q=A.a_(new A.a5(k,q),q.h("c.E"))
B.a.ag(q)
p=A.B(q)
d.$1("long words to seed with, by length -- "+new A.av(q,p.h("d(1)").a(new A.d9(k)),p.h("av<1,d>")).G(0," "))
p=k.p(0,8)
e=p==null?null:p.length
if(e==null)e=0
if(e<200)A.dS("Only "+e+" eight-letter words are required-eligible. Every board would draw its long word from too small a pool.")
return new A.cs(s,r,t,A.X(u.i,u._),m,k,A.X(o,l))},
iv(a,b,c,d,e){var t
if(!a.b.a.t(0,d))return d+" is too rare a word for Canoggle to ask players to find it, so it can't be featured."
t=A.f8(b,A.eh($.e_().U(0-A.cq(0).a).U(A.cq(c-1).a)),c).gaB()-4
if(d.length>t)return d+" is too long for the "+b.d+" board on day "+c+" (at most "+t+" letters)."
if(e.t(0,d))return d+" is already featured on the other board that day."
return null},
id(a,b,c,d,e,f){var t,s,r,q,p,o,n,m,l,k,j=null,i=d==null,h=!i
if(h){t=A.iv(b,e,c,d,a)
if(t!=null)return new A.ab(j,j,t)}s=A.iw(a,b,c,d,e,f,!0,A.eh($.e_().U(0-A.cq(0).a).U(A.cq(c-1).a)))
if(s==null){h=""+c
r=e.d
return new A.ab(j,j,i?"Day "+h+" "+r+": no candidate passed.":"No "+r+" board for day "+h+" passed its checks with "+d+" on it.")}if(h&&s.d!==d)return new A.ab(j,j,"Day "+c+" "+e.d+": "+d+" was not placed.")
q=A.ic(s)
if(q.length!==0)return new A.ab(j,j,"Day "+c+" "+e.d+" failed its audit:\n  "+B.a.G(q,"\n  "))
p=s.a
i=s.b
h=A.eO(i)
r=s.c
o=A.eO(r)
n=s.d
m=p.c
l=""+p.a+","+p.b+"~"+m+"~"+A.eL(B.a.G(A.f([h,o,n==null?"":n],u.s),"|"),m,!0)
k=A.iP(l)
if(k==null||k.a.c!==m||k.b.length!==i.length||k.c.length!==r.length||k.d!=n)return new A.ab(j,j,"Day "+c+" "+e.d+": codec round-trip failed.")
return new A.ab(s,l,j)},
d6:function d6(){},
d7:function d7(){},
d8:function d8(){},
d9:function d9(a){this.a=a},
ab:function ab(a,b,c){this.a=a
this.b=b
this.c=c},
ig(a,b,c,d){var t,s,r,q,p,o,n,m,l,k,j,i,h,g
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
A:{j=d.K(s)
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
if(A.hS(a,b,g))return g}return null},
hS(a,b,c){var t,s,r,q,p,o,n,m,l,k,j,i,h=new A.aI(a,b,c)
if(!h.gac())return!1
for(t=a*b,s=c.length,r=0;q=r<t,q;++r){if(q){if(!(r<s))return A.a(c,r)
q=c.charCodeAt(r)===46}else q=!0
if(q)continue
if(h.P(r).gm(0)<2)return!1}for(p=0;o=p+1,o<b;p=o)for(q=p*a,n=0;m=n+1,m<a;n=m){l=q+n
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
f5(a,b,c,d,e){var t,s,r,q,p,o,n,m,l,k,j=new A.aI(b,c,a),i=new A.dp(a),h=u.t,g=A.f([],h)
for(t=b*c,s=a.length,r=d.length,q=0;p=q<t,p;++q){if(p){if(!(q<s))return A.a(a,q)
p=a.charCodeAt(q)===46}else p=!0
if(!p){if(0>=r)return A.a(d,0)
p=i.$2(q,d[0])}else p=!1
if(p)B.a.i(g,q)}if(g.length===0)return null
for(o=0;o<40;++o){t=e.K(g.length)
if(!(t>=0&&t<g.length))return A.a(g,t)
n=A.f([g[t]],h)
while(t=n.length,t<r){m=d[t]
t=j.P(B.a.gba(n))
s=t.$ti
p=s.h("u<c.E>")
l=A.a_(new A.u(t,s.h("o(c.E)").a(new A.dq(n,i,m)),p),p.h("c.E"))
t=l.length
if(t===0)break
t=e.K(t)
if(!(t>=0&&t<l.length))return A.a(l,t)
B.a.i(n,l[t])}if(n.length!==r)continue
k=A.f(a.split(""),u.s)
for(q=0;q<n.length;++q){h=n[q]
if(!(q<r))return A.a(d,q)
B.a.j(k,h,d[q])}return B.a.ae(k)}return null},
dp:function dp(a){this.a=a},
dq:function dq(a,b,c){this.a=a
this.b=b
this.c=c},
f1(a){var t,s,r,q,p,o,n,m,l=$.cn.p(0,a)
if(l==null)l=A.dS("Missing "+a+".\nRun: dart run tools/build_dictionary.dart")
t=A.f([],u.B)
for(s=B.l.av(l),r=s.length,q=0;q<s.length;s.length===r||(0,A.z)(s),++q){p=s[q]
if(p.length===0)continue
o=B.c.aA(p,"\t")
if(o<=0)continue
n=B.c.D(p,0,o)
m=A.cG(B.c.a0(p,o+1),null)
B.a.i(t,new A.W(n,m==null?0:m))}return t},
ih(a){var t,s,r,q=new A.cS(new A.ay(A.aN(26,null,!1,u.V)))
for(t=a.length,s=0;s<a.length;a.length===t||(0,A.z)(a),++s){r=a[s].a
if(r.length<4)continue
q.i(0,r)}return q},
ir(a,b){var t,s,r,q,p,o,n=A.Y(u.N),m=a.a*a.b,l=new A.de(A.aN(m,!1,!1,u.y),4,n,a)
for(t=b.a.a,s=a.c,r=s.length,q=0;p=q<m,p;++q){if(p){if(!(q<r))return A.a(s,q)
p=s.charCodeAt(q)===46}else p=!0
if(p)continue
if(!(q<r))return A.a(s,q)
p=s.charCodeAt(q)-65
if(!(p>=0&&p<26))return A.a(t,p)
o=t[p]
if(o==null)continue
l.$3(q,o,1)}return n},
ay:function ay(a){this.a=a
this.b=null},
cS:function cS(a){this.a=a
this.b=0},
W:function W(a,b){this.a=a
this.b=b},
de:function de(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hM(a){var t,s,r,q,p,o
try{for(q=0;q<6;++q){t=B.X[q]
s=A.dL(a[t])
if(s!=null)$.cn.j(0,"tools\\data\\"+A.i(t),s)}p=A.ie()
$.eM=p
p=B.e.R(A.aM(["ok",!0,"seedable",p.e.length],u.N,u.K),null)
return p}catch(o){r=A.dv(o)
p=u.N
p=B.e.R(A.aM(["error",A.i(r)],p,p),null)
return p}},
hD(a){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f=null
try{t=$.eM
if(t==null){p=u.N
p=B.e.R(A.aM(["error","canoggleGenInit first"],p,p),f)
return p}s=u.l.a(B.e.b1(a,f))
r=A.h1(A.i(J.I(s,"kind")))
q=J.I(s,"day")
if(r==null||!A.dO(q)||q<1){p=u.N
p=B.e.R(A.aM(["error","bad request "+a],p,p),f)
return p}l=A.h5()
k=u.N
p=A.Y(k)
j=u.Q.a(J.I(s,"avoid"))
if(j==null)j=B.U
i=j.length
h=0
for(;h<j.length;j.length===i||(0,A.z)(j),++h){o=j[h]
J.dx(p,A.i(o).toUpperCase())}j=J.I(s,"forced")==null?f:A.i(J.I(s,"forced")).toUpperCase()
n=A.id(p,t,q,j,r,l)
p=u.u
p=B.e.R(n.b==null?A.aM(["error",n.c],k,p):A.aM(["line",n.b,"word",n.a.d],k,p),f)
return p}catch(g){m=A.dv(g)
p=u.N
p=B.e.R(A.aM(["error",A.i(m)],p,p),f)
return p}},
iI(){var t=v.G
t.canoggleGenInit=A.eR(new A.dl())
t.canoggleGenBuild=A.eR(new A.dm())},
dl:function dl(){},
dm:function dm(){},
f9(a){return v.mangledGlobalNames[a]},
iM(a){throw A.C(A.ec(a),new Error())},
dr(){throw A.C(A.ec(""),new Error())},
eR(a){var t
if(typeof a=="function")throw A.e(A.dy("Attempting to rewrap a JS function."))
t=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.hF,a)
t[$.dZ()]=a
return t},
hF(a,b,c){u.Z.a(a)
if(A.N(c)>=1)return a.$1(b)
return a.$0()},
iP(a){var t,s,r,q,p,o,n,m,l,k,j,i=null
try{k=u.s
t=A.f(a.split("~"),k)
if(J.an(t)!==3)return i
s=A.f(J.I(t,0).split(","),k)
if(J.an(s)!==2)return i
r=A.cG(J.I(s,0),i)
q=A.cG(J.I(s,1),i)
if(r==null||q==null||r<=0||q<=0)return i
p=J.I(t,1)
if(J.an(p)!==r*q)return i
o=A.eL(J.I(t,2),p,!1)
n=J.fs(o,"|")
if(J.an(n)!==3)return i
m=A.eP(J.I(n,0))
l=A.eP(J.I(n,1))
if(m==null||l==null)return i
J.e0(m,A.f7())
J.e0(l,A.f7())
k=J.I(n,2).length===0?i:J.I(n,2)
k=A.ej(new A.aI(r,q,p),l,k,m)
return k}catch(j){return i}},
ii(a,b){var t
A.x(a)
A.x(b)
t=B.b.B(a.length,b.length)
return t!==0?t:B.c.B(a,b)},
eO(a){var t,s,r,q,p,o,n,m,l,k
if(a.length===0)return""
t=A.a_(a,u.N)
B.a.ag(t)
s=new A.ax("")
for(r="",q=0,p="";q<t.length;++q,r=o){o=t[q]
p=o.length
n=r.length
m=B.b.b0(p<n?p:n,0,35)
l=0
for(;;){if(l<m){if(!(l<p))return A.a(o,l)
if(!(l<n))return A.a(r,l)
k=o.charCodeAt(l)===r.charCodeAt(l)}else k=!1
if(!k)break;++l}if(q>0)s.a+=","
p=B.b.bl(l,36).toUpperCase()
p=(s.a+=p)+B.c.a0(o,l)
s.a=p}return p.charCodeAt(0)==0?p:p},
eP(a){var t,s,r,q,p,o,n,m,l
if(a.length===0)return A.f([],u.s)
t=A.f([],u.s)
for(s=a.split(","),r=s.length,q="",p=0;p<r;++p,q=l){o=s[p]
n=o.length
if(n===0)return null
if(0>=n)return A.a(o,0)
m=A.cG(o[0],36)
if(m==null||m>q.length)return null
l=B.c.D(q,0,m)+B.c.a0(o,1)
if(l.length===0)return null
B.a.i(t,l)}return t},
eL(a,b,c){var t,s,r,q,p,o,n,m="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,|"
for(t=b.length,s=5938462,r=0;r<t;++r)s=s*31+b.charCodeAt(r)&2147483647
if(s===0)s=506952121
for(t=a.length,r=0,q="";r<t;++r){s^=s<<13&2147483647
s^=s>>>17
s=(s^s<<5&2147483647)>>>0
p=B.b.J(s,38)
o=a[r]
n=B.c.aA(m,o)
if(n<0){q+=o
continue}q+=m[c?B.b.J(n+p,38):B.b.J(n-p+76,38)]}return q.charCodeAt(0)==0?q:q},
dS(a){return A.aH(A.em(a))},
d1(a,b,c,d,e){if(c-b<=32)A.ev(a,b,c,d,e)
else A.eu(a,b,c,d,e)},
ev(a,b,c,d,e){var t,s,r,q,p,o
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
eu(a2,a3,a4,a5,a6){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=B.b.A(a4-a3+1,6),d=a3+e,c=a4-e,b=B.b.A(a3+a4,2),a=b-e,a0=b+e,a1=a2.length
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
l=J.aa(a5.$2(s,q),0)
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
A.d1(a2,a3,n-2,a5,a6)
A.d1(a2,m+2,a4,a5,a6)
if(l)return
if(n<d&&m>c){for(;;){if(!(n<a2.length))return A.a(a2,n)
if(!J.aa(a5.$2(a2[n],s),0))break;++n}for(;;){if(!(m>=0&&m<a2.length))return A.a(a2,m)
if(!J.aa(a5.$2(a2[m],q),0))break;--m}for(k=n;k<=m;++k){if(!(k<a2.length))return A.a(a2,k)
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
break}}}A.d1(a2,n,m,a5,a6)}else A.d1(a2,n,m,a5,a6)}},B={}
var w=[A,J,B]
var $={}
A.dA.prototype={}
J.bS.prototype={
I(a,b){return a===b},
gu(a){return A.bl(a)},
k(a){return"Instance of '"+A.c9(a)+"'"},
gv(a){return A.a8(A.dM(this))}}
J.bU.prototype={
k(a){return String(a)},
gu(a){return a?519018:218159},
gv(a){return A.a8(u.y)},
$il:1,
$io:1}
J.b6.prototype={
I(a,b){return null==b},
k(a){return"null"},
gu(a){return 0},
$il:1}
J.b8.prototype={$it:1}
J.ag.prototype={
gu(a){return 0},
k(a){return String(a)}}
J.c8.prototype={}
J.az.prototype={}
J.af.prototype={
k(a){var t=a[$.fb()]
if(t==null)t=a[$.dZ()]
if(t==null)return this.aJ(a)
return"JavaScript function for "+J.ao(t)},
$ia2:1}
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
return new A.u(a,t.h("o(1)").a(b),t.h("u<1>"))},
L(a,b){var t,s
A.B(a).h("c<1>").a(b)
a.$flags&1&&A.aZ(a,"addAll",2)
if(Array.isArray(b)){this.aN(a,b)
return}for(t=b.length,s=0;s<b.length;b.length===t||(0,A.z)(b),++s)a.push(b[s])},
aN(a,b){var t,s
u.b.a(b)
t=b.length
if(t===0)return
if(a===b)throw A.e(A.K(a))
for(s=0;s<t;++s)a.push(b[s])},
G(a,b){var t,s=A.aN(a.length,"",!1,u.N)
for(t=0;t<a.length;++t)this.j(s,t,A.i(a[t]))
return s.join(b)},
ae(a){return this.G(a,"")},
af(a,b){var t,s,r
A.B(a).h("1(1,1)").a(b)
t=a.length
if(t===0)throw A.e(A.cv())
if(0>=t)return A.a(a,0)
s=a[0]
for(r=1;r<t;++r){s=b.$2(s,a[r])
if(t!==a.length)throw A.e(A.K(a))}return s},
E(a,b){if(!(b<a.length))return A.a(a,b)
return a[b]},
gba(a){var t=a.length
if(t>0)return a[t-1]
throw A.e(A.cv())},
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
if(b==null)b=J.hQ()
if(t===2){s=a[0]
r=a[1]
o=b.$2(s,r)
if(typeof o!=="number")return o.C()
if(o>0){a[0]=r
a[1]=s}return}q=0
if(o.c.b(null))for(p=0;p<a.length;++p)if(a[p]===void 0){a[p]=null;++q}a.sort(A.im(b,2))
if(q>0)this.aW(a,q)},
ag(a){return this.T(a,null)},
aW(a,b){var t,s=a.length
for(;t=s-1,s>0;s=t)if(a[t]===null){a[t]=void 0;--b
if(b===0)break}},
aG(a,b){var t,s,r,q
a.$flags&2&&A.aZ(a,"shuffle")
t=a.length
while(t>1){s=b.K(t);--t
r=a.length
if(!(t<r))return A.a(a,t)
q=a[t]
if(!(s>=0&&s<r))return A.a(a,s)
a[t]=a[s]
a[s]=q}},
t(a,b){var t
for(t=0;t<a.length;++t)if(J.aa(a[t],b))return!0
return!1},
gF(a){return a.length===0},
gO(a){return a.length!==0},
k(a){return A.dz(a,"[","]")},
gq(a){return new J.ap(a,a.length,A.B(a).h("ap<1>"))},
gu(a){return A.bl(a)},
gm(a){return a.length},
p(a,b){if(!(b>=0&&b<a.length))throw A.e(A.dc(a,b))
return a[b]},
j(a,b,c){A.B(a).c.a(c)
a.$flags&2&&A.aZ(a)
if(!(b>=0&&b<a.length))throw A.e(A.dc(a,b))
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
J.cw.prototype={}
J.ap.prototype={
gn(){var t=this.d
return t==null?this.$ti.c.a(t):t},
l(){var t,s=this,r=s.a,q=r.length
if(s.b!==q){r=A.z(r)
throw A.e(r)}t=s.c
if(t>=q){s.d=null
return!1}s.d=r[t]
s.c=t+1
return!0},
$iv:1}
J.aK.prototype={
B(a,b){var t
A.eH(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){t=this.gad(b)
if(this.gad(a)===t)return 0
if(this.gad(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gad(a){return a===0?1/a<0:a<0},
b_(a){var t,s
if(a>=0){if(a<=2147483647){t=a|0
return a===t?t:t+1}}else if(a>=-2147483648)return a|0
s=Math.ceil(a)
if(isFinite(s))return s
throw A.e(A.aA(""+a+".ceil()"))},
az(a){var t,s
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){t=a|0
return a===t?t:t-1}s=Math.floor(a)
if(isFinite(s))return s
throw A.e(A.aA(""+a+".floor()"))},
bk(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.e(A.aA(""+a+".round()"))},
b0(a,b,c){if(B.b.B(b,c)>0)throw A.e(A.ib(b))
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
if(q==null)A.aH(A.aA("Unexpected toString result: "+t))
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
J(a,b){var t=a%b
if(t===0)return 0
if(t>0)return t
if(b<0)return t-b
else return t+b},
aK(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.ap(a,b)},
A(a,b){return(a|0)===a?a/b|0:this.ap(a,b)},
ap(a,b){var t=a/b
if(t>=-2147483648&&t<=2147483647)return t|0
if(t>0){if(t!==1/0)return Math.floor(t)}else if(t>-1/0)return Math.ceil(t)
throw A.e(A.aA("Result of truncating division is "+A.i(t)+": "+A.i(a)+" ~/ "+b))},
a9(a,b){var t
if(a>0)t=this.aY(a,b)
else{t=b>31?31:b
t=a>>t>>>0}return t},
aY(a,b){return b>31?0:a>>>b},
gv(a){return A.a8(u.H)},
$iJ:1,
$ik:1,
$iF:1}
J.b5.prototype={
gv(a){return A.a8(u.S)},
$il:1,
$ib:1}
J.bV.prototype={
gv(a){return A.a8(u.i)},
$il:1}
J.ae.prototype={
a_(a,b){var t=A.f(a.split(b),u.s)
return t},
aH(a,b){var t=b.length
if(t>a.length)return!1
return b===a.substring(0,t)},
D(a,b,c){return a.substring(b,A.h4(b,c,a.length))},
a0(a,b){return this.D(a,b,null)},
aD(a){var t,s,r,q=a.trim(),p=q.length
if(p===0)return q
if(0>=p)return A.a(q,0)
if(q.charCodeAt(0)===133){t=J.fO(q,1)
if(t===p)return""}else t=0
s=p-1
if(!(s>=0))return A.a(q,s)
r=q.charCodeAt(s)===133?J.fP(q,s):p
if(t===0&&r===p)return q
return q.substring(t,r)},
Z(a,b){var t,s
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.e(B.L)
for(t=a,s="";;){if((b&1)===1)s=t+s
b=b>>>1
if(b===0)break
t+=t}return s},
bg(a,b,c){var t=b-a.length
if(t<=0)return a
return this.Z(c,t)+a},
aA(a,b){var t=a.indexOf(b,0)
return t},
t(a,b){return A.iL(a,b,0)},
B(a,b){var t
A.x(b)
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
gv(a){return A.a8(u.N)},
gm(a){return a.length},
$il:1,
$iJ:1,
$ief:1,
$id:1}
A.bY.prototype={
k(a){return"LateInitializationError: "+this.a}}
A.cR.prototype={}
A.b3.prototype={}
A.Z.prototype={
gq(a){var t=this
return new A.at(t,t.gm(t),A.j(t).h("at<Z.E>"))},
gF(a){return this.gm(this)===0},
G(a,b){var t,s,r,q=this,p=q.gm(q)
if(b.length!==0){if(p===0)return""
t=A.i(q.E(0,0))
if(p!==q.gm(q))throw A.e(A.K(q))
for(s=t,r=1;r<p;++r){s=s+b+A.i(q.E(0,r))
if(p!==q.gm(q))throw A.e(A.K(q))}return s.charCodeAt(0)==0?s:s}else{for(r=0,s="";r<p;++r){s+=A.i(q.E(0,r))
if(p!==q.gm(q))throw A.e(A.K(q))}return s.charCodeAt(0)==0?s:s}}}
A.at.prototype={
gn(){var t=this.d
return t==null?this.$ti.c.a(t):t},
l(){var t,s=this,r=s.a,q=J.bF(r),p=q.gm(r)
if(s.b!==p)throw A.e(A.K(r))
t=s.c
if(t>=p){s.d=null
return!1}s.d=q.E(r,t);++s.c
return!0},
$iv:1}
A.au.prototype={
gq(a){return new A.be(J.b_(this.a),this.b,A.j(this).h("be<1,2>"))},
gm(a){return J.an(this.a)}}
A.ar.prototype={}
A.be.prototype={
l(){var t=this,s=t.b
if(s.l()){t.a=t.c.$1(s.gn())
return!0}t.a=null
return!1},
gn(){var t=this.a
return t==null?this.$ti.y[1].a(t):t},
$iv:1}
A.av.prototype={
gm(a){return J.an(this.a)},
E(a,b){return this.b.$1(J.fo(this.a,b))}}
A.u.prototype={
gq(a){return new A.aB(J.b_(this.a),this.b,this.$ti.h("aB<1>"))}}
A.aB.prototype={
l(){var t,s
for(t=this.a,s=this.b;t.l();)if(s.$1(t.gn()))return!0
return!1},
gn(){return this.a.gn()},
$iv:1}
A.bq.prototype={
gq(a){var t=this.a
return new A.br(t.gq(t),this.b,A.j(this).h("br<1>"))}}
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
$iv:1}
A.r.prototype={
sm(a,b){throw A.e(A.aA("Cannot change the length of a fixed-length list"))},
i(a,b){A.a9(a).h("r.E").a(b)
throw A.e(A.aA("Cannot add to a fixed-length list"))}}
A.bz.prototype={$r:"+bonus,required(1,2)",$s:1}
A.b0.prototype={
gF(a){return this.gm(this)===0},
k(a){return A.dD(this)},
$ia6:1}
A.bu.prototype={
gn(){var t=this.d
return t==null?this.$ti.c.a(t):t},
l(){var t=this,s=t.c
if(s>=t.b){t.d=null
return!1}t.d=t.a[s]
t.c=s+1
return!0},
$iv:1}
A.as.prototype={
a6(){var t=this,s=t.$map
if(s==null){s=new A.ba(t.$ti.h("ba<1,2>"))
A.eY(t.a,s)
t.$map=s}return s},
p(a,b){return this.a6().p(0,b)},
N(a,b){this.$ti.h("~(1,2)").a(b)
this.a6().N(0,b)},
gm(a){return this.a6().a}}
A.b1.prototype={
i(a,b){A.j(this).c.a(b)
A.fC()}}
A.b2.prototype={
gm(a){return this.b},
gO(a){return this.b!==0},
gq(a){var t,s=this,r=s.$keys
if(r==null){r=Object.keys(s.a)
s.$keys=r}t=r
return new A.bu(t,t.length,s.$ti.h("bu<1>"))}}
A.bR.prototype={
I(a,b){if(b==null)return!1
return b instanceof A.ad&&this.a.I(0,b.a)&&A.dU(this)===A.dU(b)},
gu(a){return A.dE(this.a,A.dU(this),B.f,B.f)},
k(a){var t=B.a.G([A.a8(this.$ti.c)],", ")
return this.a.k(0)+" with "+("<"+t+">")}}
A.ad.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.y[0])},
$S(){return A.iF(A.db(this.a),this.$ti)}}
A.bn.prototype={}
A.cT.prototype={
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
A.cF.prototype={
k(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.G.prototype={
k(a){var t=this.constructor,s=t==null?null:t.name
return"Closure '"+A.fa(s==null?"unknown":s)+"'"},
$ia2:1,
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
return"Closure '"+A.fa(t)+"'"}}
A.aJ.prototype={
I(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.aJ))return!1
return this.$_target===b.$_target&&this.a===b.a},
gu(a){return(A.dY(this.a)^A.bl(this.$_target))>>>0},
k(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.c9(this.a)+"'")}}
A.ca.prototype={
k(a){return"RuntimeError: "+this.a}}
A.a3.prototype={
gm(a){return this.a},
gF(a){return this.a===0},
gS(){return new A.a5(this,A.j(this).h("a5<1>"))},
au(a){var t
if((a&0x3fffffff)===a){t=this.c
if(t==null)return!1
return t[a]!=null}else return this.b5(a)},
b5(a){var t=this.d
if(t==null)return!1
return this.W(this.am(t,a),a)>=0},
p(a,b){var t,s,r,q,p=null
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
if(p==null)r[q]=[n.a1(b,c)]
else{o=n.W(p,b)
if(o>=0)p[o].b=c
else p.push(n.a1(b,c))}}},
aC(a,b){var t,s,r=this,q=A.j(r)
q.c.a(a)
q.h("2()").a(b)
if(r.au(a)){t=r.p(0,a)
return t==null?q.y[1].a(t):t}s=b.$0()
r.j(0,a,s)
return s},
N(a,b){var t,s,r=this
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
if(t==null)a[b]=this.a1(b,c)
else t.b=c},
a1(a,b){var t=this,s=A.j(t),r=new A.cB(s.c.a(a),s.y[1].a(b))
if(t.e==null)t.e=t.f=r
else t.f=t.f.c=r;++t.a
t.r=t.r+1&1073741823
return r},
aa(a){return J.P(a)&1073741823},
am(a,b){return a[this.aa(b)]},
W(a,b){var t,s
if(a==null)return-1
t=a.length
for(s=0;s<t;++s)if(J.aa(a[s].a,b))return s
return-1},
k(a){return A.dD(this)},
a7(){var t=Object.create(null)
t["<non-identifier-key>"]=t
delete t["<non-identifier-key>"]
return t},
$idC:1}
A.cB.prototype={}
A.a5.prototype={
gm(a){return this.a.a},
gF(a){return this.a.a===0},
gq(a){var t=this.a
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
$iv:1}
A.cC.prototype={
gm(a){return this.a.a},
gq(a){var t=this.a
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
$iv:1}
A.a4.prototype={
gm(a){return this.a.a},
gq(a){var t=this.a
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
$iv:1}
A.ba.prototype={
aa(a){return A.il(a)&1073741823},
W(a,b){var t,s
if(a==null)return-1
t=a.length
for(s=0;s<t;++s)if(J.aa(a[s].a,b))return s
return-1}}
A.dh.prototype={
$1(a){return this.a(a)},
$S:4}
A.di.prototype={
$2(a,b){return this.a(a,b)},
$S:9}
A.dj.prototype={
$1(a){return this.a(A.x(a))},
$S:10}
A.ak.prototype={
k(a){return this.aq(!1)},
aq(a){var t,s,r,q,p,o=this.aR(),n=this.an(),m=(a?"Record ":"")+"("
for(t=o.length,s="",r=0;r<t;++r,s=", "){m+=s
q=o[r]
if(typeof q=="string")m=m+q+": "
if(!(r<n.length))return A.a(n,r)
p=n[r]
m=a?m+A.ei(p):m+A.i(p)}m+=")"
return m.charCodeAt(0)==0?m:m},
aR(){var t,s=this.$s
while($.d0.length<=s)B.a.i($.d0,null)
t=$.d0[s]
if(t==null){t=this.aP()
B.a.j($.d0,s,t)}return t},
aP(){var t,s,r,q=this.$r,p=q.indexOf("("),o=q.substring(1,p),n=q.substring(p),m=n==="()"?0:n.replace(/[^,]/g,"").length+1,l=A.f(new Array(m),u.f)
for(t=0;t<m;++t)l[t]=t
if(o!==""){s=o.split(",")
t=s.length
for(r=m;t>0;){--r;--t
B.a.j(l,r,s[t])}}l=A.fT(l,!1,u.K)
l.$flags=3
return l}}
A.aS.prototype={
an(){return[this.a,this.b]},
I(a,b){if(b==null)return!1
return b instanceof A.aS&&this.$s===b.$s&&J.aa(this.a,b.a)&&J.aa(this.b,b.b)},
gu(a){return A.dE(this.$s,this.a,this.b,B.f)}}
A.aO.prototype={
gv(a){return B.ag},
$il:1}
A.bh.prototype={}
A.bZ.prototype={
gv(a){return B.ah},
$il:1}
A.aP.prototype={
gm(a){return a.length},
$iL:1}
A.bf.prototype={
j(a,b,c){A.eF(c)
a.$flags&2&&A.aZ(a)
A.eK(b,a,a.length)
a[b]=c},
$ic:1,
$ih:1}
A.bg.prototype={
j(a,b,c){A.N(c)
a.$flags&2&&A.aZ(a)
A.eK(b,a,a.length)
a[b]=c},
$ic:1,
$ih:1}
A.c_.prototype={
gv(a){return B.ai},
$il:1}
A.c0.prototype={
gv(a){return B.aj},
$il:1}
A.c1.prototype={
gv(a){return B.ak},
$il:1}
A.c2.prototype={
gv(a){return B.al},
$il:1}
A.c3.prototype={
gv(a){return B.am},
$il:1}
A.c4.prototype={
gv(a){return B.ao},
$il:1}
A.c5.prototype={
gv(a){return B.ap},
$il:1}
A.bi.prototype={
gv(a){return B.aq},
gm(a){return a.length},
$il:1}
A.c6.prototype={
gv(a){return B.ar},
gm(a){return a.length},
$il:1}
A.bv.prototype={}
A.bw.prototype={}
A.bx.prototype={}
A.by.prototype={}
A.T.prototype={
h(a){return A.bE(v.typeUniverse,this,a)},
a2(a){return A.eC(v.typeUniverse,this,a)}}
A.ch.prototype={}
A.cm.prototype={
k(a){return A.H(this.a,null)}}
A.cg.prototype={
k(a){return this.a}}
A.aU.prototype={}
A.M.prototype={
gn(){var t=this.b
return t==null?this.$ti.c.a(t):t},
aX(a,b){var t,s,r
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
p.d=null}r=p.aX(n,o)
if(1===r)return!0
if(0===r){p.b=null
q=p.e
if(q==null||q.length===0){p.a=A.ew
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
p.a=A.ew
throw o
return!1}if(0>=q.length)return A.a(q,-1)
p.a=q.pop()
n=1
continue}throw A.e(A.em("sync*"))}return!1},
bq(a){var t,s,r=this
if(a instanceof A.aT){t=a.a()
s=r.e
if(s==null)s=r.e=[]
B.a.i(s,r.a)
r.a=t
return 2}else{r.d=J.b_(a)
return 2}},
$iv:1}
A.aT.prototype={
gq(a){return new A.M(this.a(),this.$ti.h("M<1>"))}}
A.cc.prototype={}
A.U.prototype={
aU(){return new A.U(A.j(this).h("U<1>"))},
gq(a){var t=this,s=new A.aC(t,t.r,A.j(t).h("aC<1>"))
s.c=t.e
return s},
gm(a){return this.a},
gO(a){return this.a!==0},
t(a,b){var t,s
if(typeof b=="string"&&b!=="__proto__"){t=this.b
if(t==null)return!1
return u.g.a(t[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){s=this.c
if(s==null)return!1
return u.g.a(s[b])!=null}else return this.aQ(b)},
aQ(a){var t=this.d
if(t==null)return!1
return this.al(t[this.aj(a)],a)>=0},
i(a,b){var t,s,r=this
A.j(r).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){t=r.b
return r.ai(t==null?r.b=A.dI():t,b)}else if(typeof b=="number"&&(b&1073741823)===b){s=r.c
return r.ai(s==null?r.c=A.dI():s,b)}else return r.aM(b)},
aM(a){var t,s,r,q=this
A.j(q).c.a(a)
t=q.d
if(t==null)t=q.d=A.dI()
s=q.aj(a)
r=t[s]
if(r==null)t[s]=[q.a8(a)]
else{if(q.al(r,a)>=0)return!1
r.push(q.a8(a))}return!0},
ai(a,b){A.j(this).c.a(b)
if(u.g.a(a[b])!=null)return!1
a[b]=this.a8(b)
return!0},
aT(){this.r=this.r+1&1073741823},
a8(a){var t,s=this,r=new A.ck(A.j(s).c.a(a))
if(s.e==null)s.e=s.f=r
else{t=s.f
t.toString
r.c=t
s.f=t.b=r}++s.a
s.aT()
return r},
aj(a){return J.P(a)&1073741823},
al(a,b){var t,s
if(a==null)return-1
t=a.length
for(s=0;s<t;++s)if(J.aa(a[s].a,b))return s
return-1},
$ied:1}
A.ck.prototype={}
A.aC.prototype={
gn(){var t=this.d
return t==null?this.$ti.c.a(t):t},
l(){var t=this,s=t.c,r=t.a
if(t.b!==r.r)throw A.e(A.K(r))
else if(s==null){t.d=null
return!1}else{t.d=t.$ti.h("1?").a(s.a)
t.c=s.b
return!0}},
$iv:1}
A.m.prototype={
gq(a){return new A.at(a,a.length,A.a9(a).h("at<m.E>"))},
E(a,b){if(!(b<a.length))return A.a(a,b)
return a[b]},
gF(a){return a.length===0},
gO(a){return a.length!==0},
t(a,b){var t,s=a.length
for(t=0;t<s;++t)if(a[t]===b)return!0
return!1},
X(a,b){var t=A.a9(a)
return new A.u(a,t.h("o(m.E)").a(b),t.h("u<m.E>"))},
i(a,b){var t
A.a9(a).h("m.E").a(b)
t=a.length
this.sm(a,t+1)
if(!(t<a.length))return A.a(a,t)
a[t]=b},
k(a){return A.dz(a,"[","]")}}
A.E.prototype={
N(a,b){var t,s,r,q=A.j(this)
q.h("~(E.K,E.V)").a(b)
for(t=this.gS(),t=t.gq(t),q=q.h("E.V");t.l();){s=t.gn()
r=this.p(0,s)
b.$2(s,r==null?q.a(r):r)}},
gm(a){var t=this.gS()
return t.gm(t)},
gF(a){var t=this.gS()
return t.gF(t)},
k(a){return A.dD(this)},
$ia6:1}
A.cE.prototype={
$2(a,b){var t,s=this.a
if(!s.a)this.b.a+=", "
s.a=!1
s=this.b
t=A.i(a)
s.a=(s.a+=t)+": "
t=A.i(b)
s.a+=t},
$S:5}
A.ai.prototype={
gO(a){return this.gm(this)!==0},
L(a,b){var t
for(t=J.b_(A.j(this).h("c<1>").a(b));t.l();)this.i(0,t.gn())},
k(a){return A.dz(this,"{","}")},
$ic:1,
$iah:1}
A.bA.prototype={
b7(a){var t,s,r,q=this,p=q.aU()
for(t=A.dH(q,q.r,A.j(q).c),s=t.$ti.c;t.l();){r=t.d
if(r==null)r=s.a(r)
if(a.t(0,r))p.i(0,r)}return p}}
A.ci.prototype={
p(a,b){var t,s=this.b
if(s==null)return this.c.p(0,b)
else if(typeof b!="string")return null
else{t=s[b]
return typeof t=="undefined"?this.aV(b):t}},
gm(a){return this.b==null?this.c.a:this.V().length},
gF(a){return this.gm(0)===0},
gS(){if(this.b==null){var t=this.c
return new A.a5(t,A.j(t).h("a5<1>"))}return new A.cj(this)},
N(a,b){var t,s,r,q,p=this
u.cQ.a(b)
if(p.b==null)return p.c.N(0,b)
t=p.V()
for(s=0;s<t.length;++s){r=t[s]
q=p.b[r]
if(typeof q=="undefined"){q=A.d4(p.a[r])
p.b[r]=q}b.$2(r,q)
if(t!==p.c)throw A.e(A.K(p))}},
V(){var t=u.Q.a(this.c)
if(t==null)t=this.c=A.f(Object.keys(this.a),u.s)
return t},
aV(a){var t
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
t=A.d4(this.a[a])
return this.b[a]=t}}
A.cj.prototype={
gm(a){return this.a.gm(0)},
E(a,b){var t=this.a
if(t.b==null)t=t.gS().E(0,b)
else{t=t.V()
if(!(b<t.length))return A.a(t,b)
t=t[b]}return t},
gq(a){var t=this.a
if(t.b==null){t=t.gS()
t=t.gq(t)}else{t=t.V()
t=new J.ap(t,t.length,A.B(t).h("ap<1>"))}return t}}
A.bL.prototype={}
A.bN.prototype={}
A.bb.prototype={
k(a){var t=A.bP(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+t}}
A.bX.prototype={
k(a){return"Cyclic error in JSON stringify"}}
A.cx.prototype={
b1(a,b){var t=A.i3(a,this.gb2().a)
return t},
R(a,b){var t=A.he(a,this.gb3().b,null)
return t},
gb3(){return B.Q},
gb2(){return B.P}}
A.cz.prototype={}
A.cy.prototype={}
A.cZ.prototype={
aF(a){var t,s,r,q,p,o,n=a.length
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
a3(a){var t,s,r,q
for(t=this.a,s=t.length,r=0;r<s;++r){q=t[r]
if(a==null?q==null:a===q)throw A.e(new A.bX(a,null))}B.a.i(t,a)},
Y(a){var t,s,r,q,p=this
if(p.aE(a))return
p.a3(a)
try{t=p.b.$1(a)
if(!p.aE(t)){r=A.eb(a,null,p.gao())
throw A.e(r)}r=p.a
if(0>=r.length)return A.a(r,-1)
r.pop()}catch(q){s=A.dv(q)
r=A.eb(a,s,p.gao())
throw A.e(r)}},
aE(a){var t,s,r=this
if(typeof a=="number"){if(!isFinite(a))return!1
r.c.a+=B.h.k(a)
return!0}else if(a===!0){r.c.a+="true"
return!0}else if(a===!1){r.c.a+="false"
return!0}else if(a==null){r.c.a+="null"
return!0}else if(typeof a=="string"){t=r.c
t.a+='"'
r.aF(a)
t.a+='"'
return!0}else if(u.j.b(a)){r.a3(a)
r.bn(a)
t=r.a
if(0>=t.length)return A.a(t,-1)
t.pop()
return!0}else if(u.J.b(a)){r.a3(a)
s=r.bo(a)
t=r.a
if(0>=t.length)return A.a(t,-1)
t.pop()
return s}else return!1},
bn(a){var t,s=this.c
s.a+="["
if(J.fq(a)){if(0>=a.length)return A.a(a,0)
this.Y(a[0])
for(t=1;t<a.length;++t){s.a+=","
this.Y(a[t])}}s.a+="]"},
bo(a){var t,s,r,q,p,o,n=this,m={}
if(a.gF(a)){n.c.a+="{}"
return!0}t=a.gm(a)*2
s=A.aN(t,null,!1,u.X)
r=m.a=0
m.b=!0
a.N(0,new A.d_(m,s))
if(!m.b)return!1
q=n.c
q.a+="{"
for(p='"';r<t;r+=2,p=',"'){q.a+=p
n.aF(A.x(s[r]))
q.a+='":'
o=r+1
if(!(o<t))return A.a(s,o)
n.Y(s[o])}q.a+="}"
return!0}}
A.d_.prototype={
$2(a,b){var t,s
if(typeof a!="string")this.a.b=!1
t=this.b
s=this.a
B.a.j(t,s.a++,a)
B.a.j(t,s.a++,b)},
$S:5}
A.cY.prototype={
gao(){var t=this.c.a
return t.charCodeAt(0)==0?t:t}}
A.cA.prototype={
av(a){var t,s,r,q,p=A.f([],u.s),o=a.length
for(t=0,s=0,r=0;r<o;++r,s=q){q=a.charCodeAt(r)
if(q!==13){if(q!==10)continue
if(s===13){t=r+1
continue}}B.a.i(p,B.c.D(a,t,r))
t=r+1}if(t<o)B.a.i(p,B.c.D(a,t,o))
return p}}
A.cp.prototype={
$0(){var t=this
return A.aH(A.dy("("+t.a+", "+t.b+", "+t.c+", "+t.d+", "+t.e+", "+t.f+", "+t.r+", "+t.w+")"))},
$S:11}
A.ac.prototype={
U(a){var t=1000,s=B.b.J(a,t),r=B.b.A(a-s,t),q=this.b+s,p=B.b.J(q,t),o=this.a+B.b.A(q-p,t)+r
if(o<-864e13||o>864e13)A.aH(A.aR(o,-864e13,864e13,"millisecondsSinceEpoch",null))
if(o===864e13&&p!==0)A.aH(A.ft(p,"microsecond","Time including microseconds is outside valid range"))
return new A.ac(o,p,!0)},
I(a,b){var t
if(b==null)return!1
t=!1
if(b instanceof A.ac)if(this.a===b.a)t=this.b===b.b
return t},
gu(a){return A.dE(this.a,this.b,B.f,B.f)},
B(a,b){var t
u.k.a(b)
t=B.b.B(this.a,b.a)
if(t!==0)return t
return B.b.B(this.b,b.b)},
k(a){var t=this,s=A.fE(A.h_(t)),r=A.bO(A.fY(t)),q=A.bO(A.fU(t)),p=A.bO(A.fV(t)),o=A.bO(A.fX(t)),n=A.bO(A.fZ(t)),m=A.e7(A.fW(t)),l=t.b,k=l===0?"":A.e7(l)
return s+"-"+r+"-"+q+" "+p+":"+o+":"+n+"."+m+k+"Z"},
$iJ:1}
A.aq.prototype={
I(a,b){if(b==null)return!1
return b instanceof A.aq&&this.a===b.a},
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
A.cV.prototype={
k(a){return this.ak()}}
A.p.prototype={}
A.bG.prototype={
k(a){var t=this.a
if(t!=null)return"Assertion failed: "+A.bP(t)
return"Assertion failed"}}
A.bs.prototype={}
A.a1.prototype={
ga5(){return"Invalid argument"+(!this.a?"(s)":"")},
ga4(){return""},
k(a){var t=this,s=t.c,r=s==null?"":" ("+s+")",q=t.d,p=q==null?"":": "+q,o=t.ga5()+r+p
if(!t.a)return o
return o+t.ga4()+": "+A.bP(t.gab())},
gab(){return this.b}}
A.aQ.prototype={
gab(){return A.eI(this.b)},
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
A.cW.prototype={
k(a){return"Exception: "+this.a}}
A.cr.prototype={
k(a){var t=this.a,s=""!==t?"FormatException: "+t:"FormatException"
return s}}
A.c.prototype={
X(a,b){var t=A.j(this)
return new A.u(this,t.h("o(c.E)").a(b),t.h("u<c.E>"))},
af(a,b){var t,s
A.j(this).h("c.E(c.E,c.E)").a(b)
t=this.gq(this)
if(!t.l())throw A.e(A.cv())
s=t.gn()
while(t.l())s=b.$2(s,t.gn())
return s},
G(a,b){var t,s,r=this.gq(this)
if(!r.l())return""
t=J.ao(r.gn())
if(!r.l())return t
if(b.length===0){s=t
do s+=J.ao(r.gn())
while(r.l())}else{s=t
do s=s+b+J.ao(r.gn())
while(r.l())}return s.charCodeAt(0)==0?s:s},
gm(a){var t,s=this.gq(this)
for(t=0;s.l();)++t
return t},
E(a,b){var t,s
A.ek(b,"index")
t=this.gq(this)
for(s=b;t.l();){if(s===0)return t.gn();--s}throw A.e(A.e9(b,b-s,this,"index"))},
k(a){return A.fK(this,"(",")")}}
A.Q.prototype={
k(a){return"MapEntry("+A.i(this.a)+": "+A.i(this.b)+")"}}
A.bj.prototype={
gu(a){return A.n.prototype.gu.call(this,0)},
k(a){return"null"}}
A.n.prototype={$in:1,
I(a,b){return this===b},
gu(a){return A.bl(this)},
k(a){return"Instance of '"+A.c9(this)+"'"},
gv(a){return A.iz(this)},
toString(){return this.k(this)}}
A.ax.prototype={
gm(a){return this.a.length},
k(a){var t=this.a
return t.charCodeAt(0)==0?t:t},
$ih7:1}
A.cl.prototype={
aL(a){var t,s,r,q,p,o,n,m=this,l=4294967296,k=a<0?-1:0
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
m.M()
m.M()
m.M()
m.M()},
M(){var t=this,s=t.a,r=4294901760*s,q=r>>>0,p=55905*s,o=p>>>0,n=o+q+t.b
s=n>>>0
t.a=s
t.b=B.b.A(p-o+(r-q)+(n-s),4294967296)>>>0},
K(a){var t,s,r,q=this
if(a<=0||a>4294967296)throw A.e(A.h3("max must be in range 0 < max \u2264 2^32, was "+a))
t=a-1
if((a&t)>>>0===0){q.M()
return(q.a&t)>>>0}do{q.M()
s=q.a
r=s%a}while(s-r+a>=4294967296)
return r},
be(){this.M()
return(this.a&1)===0},
$ih2:1}
A.aI.prototype={
gbh(){var t,s,r,q,p,o
for(t=this.a*this.b,s=this.c,r=s.length,q=0,p=0;o=p<t,o;++p){if(o){if(!(p<r))return A.a(s,p)
o=s.charCodeAt(p)===46}else o=!0
if(!o)++q}return q},
P(a){return new A.aT(this.bc(a),u.E)},
bc(a){var t=this
return function(){var s=a
var r=0,q=2,p=[],o,n,m,l,k,j,i,h,g,f,e,d,c,b,a0,a1
return function $async$P(a2,a3,a4){if(a3===1){p.push(a4)
r=q}for(;;)switch(r){case 0:if(!(s>=0&&s<t.a*t.b)){r=1
break}o=t.a
n=B.b.J(s,o)
m=B.b.aK(s,o)
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
gac(){var t,s,r,q,p,o=this.aS()
if(o==null)return!0
t=A.fR([o],u.S)
s=A.f([o],u.t)
while(r=s.length,r!==0){if(0>=r)return A.a(s,-1)
r=this.P(s.pop())
q=r.$ti
r=new A.M(r.a(),q.h("M<1>"))
q=q.c
while(r.l()){p=r.b
if(p==null)p=q.a(p)
if(t.i(0,p))B.a.i(s,p)}}return t.a===this.gbh()},
aS(){var t,s,r,q,p
for(t=this.a*this.b,s=this.c,r=s.length,q=0;p=q<t,p;++q){if(p){if(!(q<r))return A.a(s,q)
p=s.charCodeAt(q)===46}else p=!0
if(!p)return q}return null},
k(a){var t,s,r,q,p,o
for(t=this.b,s=this.c,r=this.a,q=0,p="";q<t;q=o){o=q+1
p+=B.c.D(s,q*r,o*r)+"\n"}return p.charCodeAt(0)==0?p:p}}
A.df.prototype={
$1(a){var t,s,r,q,p,o,n,m=this,l=m.a,k=m.b
if(l.length>=k)return
t=m.c
B.a.i(t,a)
s=t.length
r=m.d
q=r.length
if(s===q){k=A.a_(t,u.S)
B.a.i(l,k)}else{if(!(s<q))return A.a(r,s)
p=r.charCodeAt(s)
for(s=m.e,r=s.P(a),q=r.$ti,r=new A.M(r.a(),q.h("M<1>")),s=s.c,o=s.length,q=q.c;r.l();){n=r.b
if(n==null)n=q.a(n)
if(B.a.t(t,n))continue
if(n>>>0!==n||n>=o)return A.a(s,n)
if(s.charCodeAt(n)!==p)continue
m.$1(n)
if(l.length>=k)break}}if(0>=t.length)return A.a(t,-1)
t.pop()},
$S:6}
A.da.prototype={
$1(a){var t,s,r,q,p,o,n=this,m=n.a
B.a.i(m,a)
t=m.length
s=n.b
r=s.length
if(t===r)n.c.L(0,m)
else{if(!(t<r))return A.a(s,t)
q=s.charCodeAt(t)
for(t=n.d,s=t.P(a),r=s.$ti,s=new A.M(s.a(),r.h("M<1>")),t=t.c,p=t.length,r=r.c;s.l();){o=s.b
if(o==null)o=r.a(o)
if(B.a.t(m,o))continue
if(o>>>0!==o||o>=p)return A.a(t,o)
if(t.charCodeAt(o)!==q)continue
n.$1(o)}}if(0>=m.length)return A.a(m,-1)
m.pop()},
$S:6}
A.A.prototype={
gaB(){return this.a*this.b-this.c}}
A.bm.prototype={
ak(){return"PuzzleKind."+this.b}}
A.cH.prototype={
gbj(){var t,s,r,q,p,o,n=this,m=n.x
if(m===$){t=A.X(u.N,u.r)
for(s=n.b,r=s.length,q=n.a,p=0;p<s.length;s.length===r||(0,A.z)(s),++p){o=s[p]
t.j(0,o,A.ij(q,o))}n.x!==$&&A.dr()
n.x=t
m=t}return m},
aO(){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6=u.N,a7=A.X(a6,u.G)
for(t=this.b,s=t.length,r=this.a,q=0;q<t.length;t.length===s||(0,A.z)(t),++q){p=t[q]
a7.j(0,p,A.eZ(r,p,64))}s=A.a_(t,a6)
B.a.T(s,new A.cI(a7))
r=u.L
o=A.X(a6,r)
n=u.S
m=A.Y(n)
for(l=s.length,q=0;q<s.length;s.length===l||(0,A.z)(s),++q){p=s[q]
for(k=a7.p(0,p),j=k.length,i=B.n,h=-1,g=0;g<k.length;k.length===j||(0,A.z)(k),++g){f=k[g]
e=J.e1(f,new A.cJ(m)).gm(0)
if(e>h){h=e
i=f}}o.j(0,p,i)
m.L(0,i)}for(l=o.$ti.h("S<2>"),d=!0;d;){c=A.X(n,n)
for(k=new A.S(o,o.r,o.e,l);k.l();){j=k.d
for(b=j.length,q=0;q<j.length;j.length===b||(0,A.z)(j),++q){a=j[q]
a0=c.p(0,a)
c.j(0,a,(a0==null?0:a0)+1)}}for(k=this.gbi(),j=A.j(k),b=j.h("o(1)").a(new A.cK(c)),k=k.gq(0),j=new A.aB(k,b,j.h("aB<1>")),d=!1;j.l();){b=k.gn()
for(a0=s.length,q=0;q<s.length;s.length===a0||(0,A.z)(s),++q){p=s[q]
a1=o.p(0,p)
a1.toString
a1=J.e1(a1,new A.cL(c))
a2=A.a_(a1,a1.$ti.h("c.E"))
a1=a7.p(0,p)
a1.toString
a3=A.B(a1)
a4=new A.u(a1,a3.h("o(1)").a(new A.cM(b,a2)),a3.h("u<1>"))
if(!a4.gq(0).l())continue
a5=a4.gq(0)
if(!a5.l())A.aH(A.cv())
o.j(0,p,a5.gn())
d=!0
break}if(d)break}}a6=A.X(a6,r)
for(a7=t.length,q=0;q<t.length;t.length===a7||(0,A.z)(t),++q){p=t[q]
s=o.p(0,p)
s.toString
a6.j(0,p,s)}return a6},
gbi(){var t,s,r,q=this,p=q.Q
if(p===$){t=A.Y(u.S)
for(s=q.gbj(),s=new A.S(s,s.r,s.e,A.j(s).h("S<2>"));s.l();){r=s.d
for(r=r.gq(r);r.l();)t.i(0,A.N(r.gn()))}q.Q!==$&&A.dr()
q.Q=t
p=t}return p},
gaw(){var t,s=this,r=s.as
if(r===$){t=new A.cN(s).$0()
s.as!==$&&A.dr()
s.as=t
r=t}return r},
k(a){var t=this.a
return"Puzzle("+t.a+"x"+t.b+", "+this.b.length+" required, "+this.c.length+" bonus)"}}
A.cI.prototype={
$2(a,b){var t
A.x(a)
A.x(b)
t=this.a
return B.b.B(t.p(0,a).length,t.p(0,b).length)},
$S:2}
A.cJ.prototype={
$1(a){return!this.a.t(0,A.N(a))},
$S:0}
A.cK.prototype={
$1(a){return!this.a.au(A.N(a))},
$S:0}
A.cL.prototype={
$1(a){return this.a.p(0,A.N(a))===1},
$S:0}
A.cM.prototype={
$1(a){var t
u.L.a(a)
t=J.bF(a)
return t.t(a,this.a)&&B.a.b4(this.b,t.gar(a))},
$S:12}
A.cN.prototype={
$0(){var t,s,r,q,p,o,n=u.S,m=A.Y(n),l=this.a,k=l.z
if(k===$){t=l.aO()
l.z!==$&&A.dr()
l.z=t
k=t}s=new A.S(k,k.r,k.e,A.j(k).h("S<2>"))
while(s.l()){r=s.d
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.z)(r),++p)m.i(0,r[p])}n=A.Y(n)
for(l=l.a,s=l.a*l.b,l=l.c,r=l.length,o=0;q=o<s,q;++o){if(q){if(!(o<r))return A.a(l,o)
q=l.charCodeAt(o)===46}else q=!0
if(!q&&!m.t(0,o))n.i(0,o)}return n},
$S:13}
A.cs.prototype={
aZ(a){var t=a==null?0.62:a
return this.d.aC(t,new A.ct(this,a))},
bb(a){return this.r.aC(a,new A.cu(this,a))}}
A.ct.prototype={
$0(){var t=this.b
if(t==null)t=0.62
return A.fQ(this.a.c,t)},
$S:14}
A.cu.prototype={
$0(){var t,s,r,q=A.f([],u.s)
for(t=this.a.f,t=new A.a4(t,A.j(t).h("a4<1,2>")).gq(0),s=this.b;t.l();){r=t.d
if(r.a<=s)B.a.L(q,r.b)}return q},
$S:15}
A.w.prototype={
ak(){return"Reject."+this.b}}
A.cO.prototype={
i(a,b){var t=this.a,s=t.p(0,b)
s.toString;++s
t.j(0,b,s)
return s},
k(a){var t=this.a,s=A.j(t).h("a4<1,2>")
return new A.au(new A.u(new A.a4(t,s),s.h("o(c.E)").a(new A.cP()),s.h("u<c.E>")),s.h("d(c.E)").a(new A.cQ()),s.h("au<c.E,d>")).G(0," ")}}
A.cP.prototype={
$1(a){return u.a.a(a).b>0},
$S:16}
A.cQ.prototype={
$1(a){u.a.a(a)
return a.a.b+"="+a.b},
$S:17}
A.ds.prototype={
$1(a){A.x(a)
return a.length<=this.a-4&&!this.b.t(0,a)},
$S:1}
A.dt.prototype={
$1(a){return A.x(a).length},
$S:18}
A.du.prototype={
$1(a){return A.x(a).length>=8},
$S:1}
A.d5.prototype={
$1(a){var t
A.N(a)
t=this.a.a.c
if(!(a>=0&&a<t.length))return A.a(t,a)
return t[a]+"@"+a},
$S:7}
A.bI.prototype={
b9(a){return this.a.t(0,A.x(a))},
a_(a,b){var t,s,r,q,p,o
u.W.a(b)
t=u.s
s=A.f([],t)
r=A.f([],t)
for(t=A.dH(b,b.r,A.j(b).c),q=this.a,p=t.$ti.c;t.l();){o=t.d
if(o==null)o=p.a(o)
B.a.i(q.t(0,o)?s:r,o)}B.a.T(s,A.eX())
B.a.T(r,A.eX())
return new A.bz(r,s)}}
A.co.prototype={
$2(a,b){var t=u.O
t.a(a)
return B.b.B(t.a(b).b,a.b)},
$S:19}
A.aL.prototype={
bd(a){var t,s,r=a.K(this.c),q=this.b,p=q.length,o=p-1
for(t=0;t<o;){s=B.b.a9(t+o,1)
if(!(s<p))return A.a(q,s)
if(q[s]<=r)t=s+1
else o=s}q=this.a
if(!(t>=0&&t<q.length))return A.a(q,t)
return q[t]},
bf(a){var t,s
for(t=0;t<64;++t){s=this.bd(a)
if(!B.c.t("AEIOU",s))return s}return"T"}}
A.d6.prototype={
$1(a){},
$S:20}
A.d7.prototype={
$1(a){return B.c.aD(A.x(a)).toUpperCase()},
$S:8}
A.d8.prototype={
$1(a){return A.x(a).length!==0},
$S:1}
A.d9.prototype={
$1(a){A.N(a)
return""+a+":"+this.a.p(0,a).length},
$S:7}
A.ab.prototype={}
A.dp.prototype={
$2(a,b){var t,s=this.a
if(!(a>=0&&a<s.length))return A.a(s,a)
t=s[a]
return t==="#"||t===b},
$S:21}
A.dq.prototype={
$1(a){A.N(a)
return!B.a.t(this.a,a)&&this.b.$2(a,this.c)},
$S:0}
A.ay.prototype={}
A.cS.prototype={
i(a,b){var t,s,r,q,p,o=this.a
for(t=b.length,s=u.V,r=0;r<t;++r){q=b.charCodeAt(r)-65
if(q<0||q>25)return
p=o.a
if(!(q>=0&&q<26))return A.a(p,q)
o=p[q]
if(o==null){o=new A.ay(A.aN(26,null,!1,s))
B.a.j(p,q,o)}}if(o.b==null){o.b=b;++this.b}}}
A.W.prototype={}
A.de.prototype={
$3(a,b,c){var t,s,r,q,p,o,n,m,l,k,j,i=this,h=i.a
B.a.j(h,a,!0)
t=b.b
if(t!=null&&c>=i.b)i.c.i(0,t)
for(s=i.d,r=s.P(a),q=r.$ti,r=new A.M(r.a(),q.h("M<1>")),p=c+1,o=b.a,s=s.c,n=s.length,m=h.length,q=q.c;r.l();){l=r.b
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
A.dl.prototype={
$1(a){return A.hM(A.eG(a))},
$S:23}
A.dm.prototype={
$1(a){return A.hD(A.x(a))},
$S:8};(function aliases(){var t=J.ag.prototype
t.aJ=t.k
t=A.c.prototype
t.aI=t.X})();(function installTearOffs(){var t=hunkHelpers._static_2,s=hunkHelpers._instance_1i,r=hunkHelpers._static_1,q=hunkHelpers.installStaticTearOff,p=hunkHelpers._instance_1u
t(J,"hQ","fN",24)
s(J.q.prototype,"gar","t",3)
s(A.m.prototype,"gar","t",3)
r(A,"ip","hG",4)
q(A,"f2",2,null,["$1$2","$2"],["f3",function(a,b){return A.f3(a,b,u.H)}],25,0)
t(A,"eX","hE",2)
p(A.bI.prototype,"gb8","b9",1)
t(A,"f7","ii",2)})();(function inheritance(){var t=hunkHelpers.mixin,s=hunkHelpers.inherit,r=hunkHelpers.inheritMany
s(A.n,null)
r(A.n,[A.dA,J.bS,A.bn,J.ap,A.p,A.cR,A.c,A.at,A.be,A.aB,A.br,A.r,A.ak,A.b0,A.bu,A.ai,A.G,A.cT,A.cF,A.E,A.cB,A.bd,A.S,A.bc,A.T,A.ch,A.cm,A.M,A.cc,A.ck,A.aC,A.m,A.bL,A.bN,A.cZ,A.ac,A.aq,A.cV,A.c7,A.bo,A.cW,A.cr,A.Q,A.bj,A.ax,A.cl,A.aI,A.A,A.cH,A.cs,A.cO,A.bI,A.aL,A.ab,A.ay,A.cS,A.W])
r(J.bS,[J.bU,J.b6,J.b8,J.b7,J.b9,J.aK,J.ae])
r(J.b8,[J.ag,J.q,A.aO,A.bh])
r(J.ag,[J.c8,J.az,J.af])
s(J.bT,A.bn)
s(J.cw,J.q)
r(J.aK,[J.b5,J.bV])
r(A.p,[A.bY,A.bs,A.bW,A.cf,A.ca,A.cg,A.bb,A.bG,A.a1,A.bt,A.ce,A.bp,A.bM])
r(A.c,[A.b3,A.au,A.u,A.bq,A.aT])
r(A.b3,[A.Z,A.a5,A.cC,A.a4])
s(A.ar,A.au)
r(A.Z,[A.av,A.cj])
s(A.b4,A.bq)
s(A.aS,A.ak)
s(A.bz,A.aS)
s(A.as,A.b0)
r(A.ai,[A.b1,A.bA])
s(A.b2,A.b1)
r(A.G,[A.bR,A.bJ,A.bK,A.cd,A.dh,A.dj,A.df,A.da,A.cJ,A.cK,A.cL,A.cM,A.cP,A.cQ,A.ds,A.dt,A.du,A.d5,A.d6,A.d7,A.d8,A.d9,A.dq,A.de,A.dl,A.dm])
s(A.ad,A.bR)
s(A.bk,A.bs)
r(A.cd,[A.cb,A.aJ])
r(A.E,[A.a3,A.ci])
s(A.ba,A.a3)
r(A.bK,[A.di,A.cE,A.d_,A.cI,A.co,A.dp])
r(A.bh,[A.bZ,A.aP])
r(A.aP,[A.bv,A.bx])
s(A.bw,A.bv)
s(A.bf,A.bw)
s(A.by,A.bx)
s(A.bg,A.by)
r(A.bf,[A.c_,A.c0])
r(A.bg,[A.c1,A.c2,A.c3,A.c4,A.c5,A.bi,A.c6])
s(A.aU,A.cg)
s(A.U,A.bA)
s(A.bX,A.bb)
s(A.cx,A.bL)
r(A.bN,[A.cz,A.cy])
s(A.cY,A.cZ)
s(A.cA,A.cc)
r(A.bJ,[A.cp,A.cN,A.ct,A.cu])
r(A.a1,[A.aQ,A.bQ])
r(A.cV,[A.bm,A.w])
t(A.bv,A.m)
t(A.bw,A.r)
t(A.bx,A.m)
t(A.by,A.r)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{b:"int",k:"double",F:"num",d:"String",o:"bool",bj:"Null",h:"List",n:"Object",a6:"Map",t:"JSObject"},mangledNames:{},types:["o(b)","o(d)","b(d,d)","o(n?)","@(@)","~(n?,n?)","~(b)","d(b)","d(d)","@(@,d)","@(d)","0&()","o(h<b>)","ah<b>()","aL()","h<d>()","o(Q<w,b>)","d(Q<w,b>)","b(d)","b(W,W)","~(d)","o(b,d)","~(b,ay,b)","d(t)","b(@,@)","0^(0^,0^)<F>"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;bonus,required":(a,b)=>c=>c instanceof A.bz&&a.b(c.a)&&b.b(c.b)}}
A.hu(v.typeUniverse,JSON.parse('{"c8":"ag","az":"ag","af":"ag","iU":"aO","bU":{"o":[],"l":[]},"b6":{"l":[]},"b8":{"t":[]},"ag":{"t":[]},"q":{"h":["1"],"t":[],"c":["1"]},"bT":{"bn":[]},"cw":{"q":["1"],"h":["1"],"t":[],"c":["1"]},"ap":{"v":["1"]},"aK":{"k":[],"F":[],"J":["F"]},"b5":{"k":[],"b":[],"F":[],"J":["F"],"l":[]},"bV":{"k":[],"F":[],"J":["F"],"l":[]},"ae":{"d":[],"J":["d"],"ef":[],"l":[]},"bY":{"p":[]},"b3":{"c":["1"]},"Z":{"c":["1"]},"at":{"v":["1"]},"au":{"c":["2"],"c.E":"2"},"ar":{"au":["1","2"],"c":["2"],"c.E":"2"},"be":{"v":["2"]},"av":{"Z":["2"],"c":["2"],"c.E":"2","Z.E":"2"},"u":{"c":["1"],"c.E":"1"},"aB":{"v":["1"]},"bq":{"c":["1"],"c.E":"1"},"b4":{"bq":["1"],"c":["1"],"c.E":"1"},"br":{"v":["1"]},"bz":{"aS":[],"ak":[]},"b0":{"a6":["1","2"]},"bu":{"v":["1"]},"as":{"b0":["1","2"],"a6":["1","2"]},"b1":{"ai":["1"],"ah":["1"],"c":["1"]},"b2":{"b1":["1"],"ai":["1"],"ah":["1"],"c":["1"]},"bR":{"G":[],"a2":[]},"ad":{"G":[],"a2":[]},"bk":{"p":[]},"bW":{"p":[]},"cf":{"p":[]},"G":{"a2":[]},"bJ":{"G":[],"a2":[]},"bK":{"G":[],"a2":[]},"cd":{"G":[],"a2":[]},"cb":{"G":[],"a2":[]},"aJ":{"G":[],"a2":[]},"ca":{"p":[]},"a3":{"E":["1","2"],"dC":["1","2"],"a6":["1","2"],"E.K":"1","E.V":"2"},"a5":{"c":["1"],"c.E":"1"},"bd":{"v":["1"]},"cC":{"c":["1"],"c.E":"1"},"S":{"v":["1"]},"a4":{"c":["Q<1,2>"],"c.E":"Q<1,2>"},"bc":{"v":["Q<1,2>"]},"ba":{"a3":["1","2"],"E":["1","2"],"dC":["1","2"],"a6":["1","2"],"E.K":"1","E.V":"2"},"aS":{"ak":[]},"aO":{"t":[],"l":[]},"bh":{"t":[]},"bZ":{"t":[],"l":[]},"aP":{"L":["1"],"t":[]},"bf":{"m":["k"],"h":["k"],"L":["k"],"t":[],"c":["k"],"r":["k"]},"bg":{"m":["b"],"h":["b"],"L":["b"],"t":[],"c":["b"],"r":["b"]},"c_":{"m":["k"],"h":["k"],"L":["k"],"t":[],"c":["k"],"r":["k"],"l":[],"m.E":"k","r.E":"k"},"c0":{"m":["k"],"h":["k"],"L":["k"],"t":[],"c":["k"],"r":["k"],"l":[],"m.E":"k","r.E":"k"},"c1":{"m":["b"],"h":["b"],"L":["b"],"t":[],"c":["b"],"r":["b"],"l":[],"m.E":"b","r.E":"b"},"c2":{"m":["b"],"h":["b"],"L":["b"],"t":[],"c":["b"],"r":["b"],"l":[],"m.E":"b","r.E":"b"},"c3":{"m":["b"],"h":["b"],"L":["b"],"t":[],"c":["b"],"r":["b"],"l":[],"m.E":"b","r.E":"b"},"c4":{"m":["b"],"h":["b"],"L":["b"],"t":[],"c":["b"],"r":["b"],"l":[],"m.E":"b","r.E":"b"},"c5":{"m":["b"],"h":["b"],"L":["b"],"t":[],"c":["b"],"r":["b"],"l":[],"m.E":"b","r.E":"b"},"bi":{"m":["b"],"h":["b"],"L":["b"],"t":[],"c":["b"],"r":["b"],"l":[],"m.E":"b","r.E":"b"},"c6":{"m":["b"],"h":["b"],"L":["b"],"t":[],"c":["b"],"r":["b"],"l":[],"m.E":"b","r.E":"b"},"cg":{"p":[]},"aU":{"p":[]},"M":{"v":["1"]},"aT":{"c":["1"],"c.E":"1"},"U":{"ai":["1"],"ed":["1"],"ah":["1"],"c":["1"]},"aC":{"v":["1"]},"E":{"a6":["1","2"]},"ai":{"ah":["1"],"c":["1"]},"bA":{"ai":["1"],"ah":["1"],"c":["1"]},"ci":{"E":["d","@"],"a6":["d","@"],"E.K":"d","E.V":"@"},"cj":{"Z":["d"],"c":["d"],"c.E":"d","Z.E":"d"},"bb":{"p":[]},"bX":{"p":[]},"ac":{"J":["ac"]},"k":{"F":[],"J":["F"]},"aq":{"J":["aq"]},"b":{"F":[],"J":["F"]},"h":{"c":["1"]},"F":{"J":["F"]},"ah":{"c":["1"]},"d":{"J":["d"],"ef":[]},"bG":{"p":[]},"bs":{"p":[]},"a1":{"p":[]},"aQ":{"p":[]},"bQ":{"p":[]},"bt":{"p":[]},"ce":{"p":[]},"bp":{"p":[]},"bM":{"p":[]},"c7":{"p":[]},"bo":{"p":[]},"ax":{"h7":[]},"cl":{"h2":[]},"fJ":{"h":["b"],"c":["b"]},"hc":{"h":["b"],"c":["b"]},"hb":{"h":["b"],"c":["b"]},"fH":{"h":["b"],"c":["b"]},"h9":{"h":["b"],"c":["b"]},"fI":{"h":["b"],"c":["b"]},"ha":{"h":["b"],"c":["b"]},"fF":{"h":["k"],"c":["k"]},"fG":{"h":["k"],"c":["k"]}}'))
A.ht(v.typeUniverse,JSON.parse('{"b3":1,"aP":1,"cc":2,"bA":1,"bL":2,"bN":2}'))
var u=(function rtii(){var t=A.a0
return{U:t("J<@>"),k:t("ac"),O:t("W"),d:t("aq"),C:t("p"),Z:t("a2"),W:t("c<d>"),Y:t("c<@>"),B:t("q<W>"),p:t("q<h<b>>"),f:t("q<n>"),s:t("q<d>"),n:t("q<k>"),b:t("q<@>"),t:t("q<b>"),T:t("b6"),m:t("t"),M:t("af"),D:t("L<@>"),_:t("aL"),c:t("h<W>"),G:t("h<h<b>>"),h:t("h<d>"),j:t("h<@>"),L:t("h<b>"),a:t("Q<w,b>"),l:t("a6<d,@>"),J:t("a6<@,@>"),e:t("av<d,d>"),P:t("bj"),K:t("n"),q:t("iV"),F:t("+()"),w:t("w"),r:t("ah<b>"),N:t("d"),v:t("d(d)"),R:t("l"),o:t("az"),E:t("aT<b>"),y:t("o"),i:t("k"),S:t("b"),x:t("e8<bj>?"),z:t("t?"),Q:t("h<@>?"),X:t("n?"),u:t("d?"),V:t("ay?"),g:t("ck?"),A:t("o?"),I:t("k?"),a3:t("b?"),ae:t("F?"),H:t("F"),cQ:t("~(d,@)")}})();(function constants(){var t=hunkHelpers.makeConstList
B.M=J.bS.prototype
B.a=J.q.prototype
B.b=J.b5.prototype
B.h=J.aK.prototype
B.c=J.ae.prototype
B.N=J.af.prototype
B.O=J.b8.prototype
B.o=J.c8.prototype
B.i=J.az.prototype
B.E=new A.ad(A.f2(),A.a0("ad<k>"))
B.D=new A.ad(A.f2(),A.a0("ad<b>"))
B.k=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.F=function() {
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
B.K=function(getTagFallback) {
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
B.G=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.J=function(hooks) {
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
B.I=function(hooks) {
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
B.H=function(hooks) {
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

B.e=new A.cx()
B.l=new A.cA()
B.L=new A.c7()
B.f=new A.cR()
B.P=new A.cy(null)
B.Q=new A.cz(null)
B.r=new A.w(0,"shape")
B.t=new A.w(1,"placement")
B.v=new A.w(2,"fill")
B.w=new A.w(3,"disconnected")
B.x=new A.w(4,"tooFewRequired")
B.y=new A.w(5,"tooManyRequired")
B.z=new A.w(6,"shortLongest")
B.A=new A.w(7,"canuckleNotRequired")
B.B=new A.w(8,"deadCell")
B.C=new A.w(9,"longPlacement")
B.u=new A.w(10,"tooFewLong")
B.S=t([B.r,B.t,B.v,B.w,B.x,B.y,B.z,B.A,B.B,B.C,B.u],A.a0("q<w>"))
B.a1=new A.bm("d","Daily",0,"main")
B.p=new A.bm("m","Mini",1,"mini")
B.T=t([B.a1,B.p],A.a0("q<bm>"))
B.W=t([],u.B)
B.V=t([],u.p)
B.n=t([],u.t)
B.U=t([],u.b)
B.X=t(["dict.txt","dict_blocked.txt","dict_bonus_only.txt","stoplist.txt","allowlist.txt","canuckle_words.txt"],u.s)
B.d=t([8,8],u.t)
B.q=new A.A(5,5,3,28,36,8,B.d,null)
B.af=new A.A(4,6,2,28,36,8,B.d,null)
B.a9=new A.A(6,5,6,28,36,8,B.d,null)
B.a5=new A.A(4,7,4,28,36,8,B.d,null)
B.aa=new A.A(7,5,9,28,36,8,B.d,null)
B.ac=new A.A(6,6,10,28,36,8,B.d,null)
B.a2=new A.A(5,7,9,28,36,8,B.d,null)
B.ae=new A.A(7,6,14,28,36,8,B.d,null)
B.Y=t([B.q,B.af,B.a9,B.a5,B.aa,B.ac,B.a2,B.ae],A.a0("q<A>"))
B.a6=new A.A(4,4,1,18,25,8,B.d,null)
B.a8=new A.A(4,4,0,22,30,8,B.d,null)
B.m=t([9,8],u.t)
B.a3=new A.A(5,4,2,25,34,8,B.m,null)
B.ab=new A.A(5,5,4,29,38,8,B.d,null)
B.ad=new A.A(5,5,3,33,43,8,B.m,null)
B.R=t([10,9],u.t)
B.a7=new A.A(6,5,3,43,56,8,B.R,null)
B.Z=new A.as([1,B.a6,2,B.a8,3,B.a3,4,B.ab,5,B.ad,6,B.q,7,B.a7],A.a0("as<b,A>"))
B.a_=new A.as([4,0.55,5,0.4,6,0.28,7,0.18,8,0.11],A.a0("as<b,k>"))
B.a4=new A.A(3,3,0,20,30,5,B.n,2)
B.a0={}
B.as=new A.b2(B.a0,0,A.a0("b2<d>"))
B.ag=A.V("iQ")
B.ah=A.V("iR")
B.ai=A.V("fF")
B.aj=A.V("fG")
B.ak=A.V("fH")
B.al=A.V("fI")
B.am=A.V("fJ")
B.an=A.V("n")
B.ao=A.V("h9")
B.ap=A.V("ha")
B.aq=A.V("hb")
B.ar=A.V("hc")})();(function staticFields(){$.cX=null
$.O=A.f([],u.f)
$.eg=null
$.e4=null
$.e3=null
$.f_=null
$.eW=null
$.f6=null
$.dd=null
$.dk=null
$.dV=null
$.d0=A.f([],A.a0("q<h<n>?>"))
$.cn=function(){var t=u.N
return A.X(t,t)}()
$.eM=null})();(function lazyInitializers(){var t=hunkHelpers.lazyFinal
t($,"iT","fb",()=>A.dg("_$dart_dartClosure"))
t($,"iS","dZ",()=>A.dg("_$dart_dartClosure_dartJSInterop"))
t($,"j6","fm",()=>A.f([new J.bT()],A.a0("q<bn>")))
t($,"iW","fc",()=>A.a7(A.cU({
toString:function(){return"$receiver$"}})))
t($,"iX","fd",()=>A.a7(A.cU({$method$:null,
toString:function(){return"$receiver$"}})))
t($,"iY","fe",()=>A.a7(A.cU(null)))
t($,"iZ","ff",()=>A.a7(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(s){return s.message}}()))
t($,"j1","fi",()=>A.a7(A.cU(void 0)))
t($,"j2","fj",()=>A.a7(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(s){return s.message}}()))
t($,"j0","fh",()=>A.a7(A.eo(null)))
t($,"j_","fg",()=>A.a7(function(){try{null.$method$}catch(s){return s.message}}()))
t($,"j4","fl",()=>A.a7(A.eo(void 0)))
t($,"j3","fk",()=>A.a7(function(){try{(void 0).$method$}catch(s){return s.message}}()))
t($,"j5","dw",()=>A.dY(B.an))
t($,"j7","e_",()=>A.fD(2026,11,5))})();(function nativeSupport(){!function(){var t=function(a){var n={}
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
var t=A.iI
if(typeof dartMainRunner==="function"){dartMainRunner(t,[])}else{t([])}})})()