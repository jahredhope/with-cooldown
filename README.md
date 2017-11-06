# with-cooldown
Stops calls to the supplied method happening for a cooldown period.  
The initial call will go through, and for the timeout given all further calls will be immediately returned.  

Multiple calls are not replayed after the cooldown.  

This module works both with and without decorators, however decorators are the primary tested use-case.  

### Example

##### function syntax
``` javascript
import withCooldown from './with-cooldown';

const foo = withCooldown(
  100,
  () => console.log('Only call me once in 100ms')
)

foo(); // => Only call me once
foo(); // immediate return
```

##### decorator syntax
``` javascript
class Foo {
  @withCooldown(100)
  bar() {
      console.log('Only call me once in 100ms');
  }
}

const foo = new Foo();

foo.bar(); // => Only call me once
foo.bar(); // immediate return
```

### Contributing
Contributions are welcome.  
Pull requests will not be merged without related unit tests.  
