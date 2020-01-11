## @webboot/crypto

this is the @webboot/crypto library.

webboot aims to make
[tofu - trust on first use](https://en.wikipedia.org/wiki/Trust_on_first_use)
a bit less scary.

this library exposes all cryptographic functionality used throughout webboot,
making both testing and auditing easier.

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
```javascript
import crypto from '@webboot/crypto'

const { hash, algorithm } = crypto.hash.create('testing', 'sha512')
console.log({ hash, algorithm })
```


#### changelog

##### 0.0.1
first release
