# cls-porqpine

If you try to use [continuation-local-storage](https://github.com/othiym23/node-continuation-local-storage) with [porqpine](https://github.com/davejhilton/porqpine), you'll quickly discover that porqpine loses your CLS context. This happens because _mongo_ loses the CLS context, and this module exists to solve that problem.

## Usage

```js
var cls = require('continuation-local-storage');
var porqpine = require('porqpine');
var porqpatch = require('cls-porqpine');

// patch mongodb to cure its amnesia
porqpatch(cls.createNamespace('transaction'));
```