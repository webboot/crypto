## @webboot/crypto

this is the @webboot/crypto library.

**not audited and deployed yet. please be careful**

[webboot](https://webboot.github.io) aims to make
[tofu - trust on first use](https://en.wikipedia.org/wiki/Trust_on_first_use)
a bit less scary.

this library exposes all cryptographic functionality used throughout webboot,
making both testing and auditing easier.

additionally, this library does not have production dependencies.

[![NPM version][npm-image]][npm-url]
[![Linux Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

[npm-image]: https://img.shields.io/npm/v/@webboot/crypto.svg
[npm-url]: https://www.npmjs.com/package/@webboot/crypto
[travis-image]: https://img.shields.io/travis/com/webboot/crypto/master
[travis-url]: https://travis-ci.com/webboot/crypto
[appveyor-image]: https://img.shields.io/appveyor/ci/webboot/crypto/master.svg
[appveyor-url]: https://ci.appveyor.com/project/webboot/crypto/branch/master
[coveralls-image]: https://coveralls.io/repos/github/webboot/crypto/badge.svg
[coveralls-url]: https://coveralls.io/github/webboot/crypto
[greenkeeper-image]: https://badges.greenkeeper.io/webboot/crypto.svg
[greenkeeper-url]: https://badges.greenkeeper.io/webboot/crypto.svg
[snyk-image]: https://snyk.io/test/github/webboot/crypto/badge.svg
[snyk-url]: https://snyk.io/test/github/webboot/crypto

* [install](#install)
* [usage](#usage)
  * [hashes](#usage-hashes)
  * [ecdh](#usage-ecdh)
    * [buffers](#usage-sign)
    * [strings](#usage-sign)
    * [secrets](#usage-sign)
    * [curves](#usage-sign)
  * [verify](#usage-ecdh-)

### <a name="install"></a>install
```bash
npm install --save-exact @webboot/crypto
```

### <a name="usage"></a>usage
```javascript
import crypto from '@webboot/crypto'

const hash = crypto.hash.create('testing', 'sha512')
console.log(hash)
```

### <a name="usage-hash"></a>hash
hashes a string with the specified algorithm. default algo is sha521
```javascript
import crypto from '@webboot/crypto'

const { hash, algorithm } = crypto.hash.create('testing', 'sha512')
console.log({ hash, algorithm })
```

### <a name="usage-ecdh"></a>ecdh

```javascript
const options = {
  // ecdh curve to use
  curve: 'secp521r1',
  // return private key
  priv: false,
  // toString encoding to use before returning the keys, eg 'base64', 'hex'
  encoding: false,
}
```

#### <a name="usage-ecdh-buffers"></a>buffers
generates a ecdh pub/priv key pair.
```javascript
import crypto from '@webboot/crypto'

const { curve, priv, pub } = crypto.ecdh('testing', { priv: true })

// curve = 'secp521r1'
// priv  = Buffer
// pub   = Buffer
```

#### <a name="usage-ecdh-strings"></a>strings / hex
by default, `crypto.ecdh` returns buffers.
to return base64 or hex strings, simply specifiy the encoding as such.
```javascript
import crypto from '@webboot/crypto'

const { curve, priv, pub } = crypto.ecdh('testing', { encoding: 'base64', priv: true })

// curve = 'secp521r1'
// priv  = String
// pub   = String
```

#### <a name="usage-ecdh-secret"></a>generate secrets
```
import crypto from '@webboot/crypto'

const alicePrivateKey = crypto.hash.create('Alice: this string DOES NOT get hashed by ecdh.')
const bobPrivateKey = crypto.hash.create('Bob: this string DOES NOT get hashed by ecdh.')
const evePrivateKey = crypto.hash.create('Eve: this string DOES NOT get hashed by ecdh.')
const lilithPrivateKey = crypto.hash.create('Lilith: this string DOES NOT get hashed by ecdh.')

const alice = crypto.ecdh(alicePrivateKey)
const bob = crypto.ecdh(bobPrivateKey)
const eve = crypto.ecdh(evePrivateKey)
const lilith = crypto.ecdh(lilithPrivateKey)

const aliceSecret = alice.computeSecret(bob.pub)
const bobSecret = bob.computeSecret(alice.pub)
const eveSecret = eve.computeSecret(lilith.pub)
const lilithSecret = eve.computeSecret(eve.pub)

console.log(aliceSecret === bobSecret) // true
console.llog(eveSecret === lilithSecret) // true
console.log(aliceSecret === eveSecret) // false
console.log(bobSecret === lilithSecret) // false
```

#### <a name="usage-ecdh-curves"></a>different curves
if you want to use a different curve, just specify it.

please note that secp521r1 has been chosen after careful consideration of curve options.

being one of the default curves, it's existance can be assumed on most systems.
[SP 800-186 draft](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-186-draft.pdf)

#### <a name="usage-keypair"></a>

#### <a name="usage-sign"></a>

#### changelog

##### 0.0.1-alpha.0
first release

##### 0.0.1-alpha.1
bump required node version to 14.2.0

##### 0.0.1 - unreleased
...
