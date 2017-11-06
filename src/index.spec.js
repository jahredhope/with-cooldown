import withCooldown from './';

jest.useFakeTimers();

describe('with-cooldown', () => {
  it('should be a function', () => {
    expect(withCooldown).toEqual(expect.any(Function));
  });

  it('should return a function', () => {
    expect(withCooldown()).toEqual(expect.any(Function));
  });

  describe('wrapper', () => {
    it('should call the method once', () => {
      const mockFn = jest.fn();
      const wrapped = withCooldown(300, mockFn);
      expect(mockFn).toHaveBeenCalledTimes(0);
      wrapped();
      wrapped();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
    it('should call again after cooldown', () => {
      const mockFn = jest.fn();
      const wrapped = withCooldown(300, mockFn);
      expect(mockFn).toHaveBeenCalledTimes(0);
      wrapped();
      jest.runAllTimers();
      wrapped();
      wrapped();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should pass through arguments', () => {
      const param1 = 'example foo';
      const param2 = 'example bar';
      const mockFn = jest.fn();
      const wrapped = withCooldown(300, mockFn);
      wrapped(param1, param2);
      expect(mockFn).toHaveBeenCalledWith(param1, param2);
    });

    it('should not call again within cooldown', () => {
      const mockFn = jest.fn();
      const wrapped = withCooldown(300, mockFn);
      wrapped();
      wrapped();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should call again after cooldown', () => {
      const mockFn = jest.fn();
      const wrapped = withCooldown(300, mockFn);
      wrapped();
      jest.runAllTimers();
      wrapped();
      wrapped();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should pass through scope', () => {
      let lastScope;
      const mockFn = function() {
        lastScope = this;
      };
      const wrapped = withCooldown(300, mockFn);
      const exampleObject = {};
      wrapped.call(exampleObject);
      expect(lastScope).toBe(exampleObject);
    });
  });

  describe('decorator', () => {
    it('should wrap a class method', () => {
      const mockFn = jest.fn();
      class Foo {
        @withCooldown(100)
        bar() {
          mockFn();
        }
      }
      const foo = new Foo();
      expect(mockFn).toHaveBeenCalledTimes(0);
      foo.bar();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should pass through arguments', () => {
      const param1 = 'example foo';
      const param2 = 'example bar';
      const mockFn = jest.fn();
      class Foo {
        @withCooldown(100)
        bar(...args) {
          mockFn(...args);
        }
      }
      const foo = new Foo();
      foo.bar(param1, param2);
      expect(mockFn).toHaveBeenCalledWith(param1, param2);
    });

    it('should not call again within cooldown', () => {
      const mockFn = jest.fn();
      class Foo {
        @withCooldown(100)
        bar(...args) {
          mockFn(...args);
        }
      }
      const foo = new Foo();
      foo.bar();
      foo.bar();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should call again after cooldown', () => {
      const mockFn = jest.fn();
      class Foo {
        @withCooldown(100)
        bar(...args) {
          mockFn(...args);
        }
      }
      const foo = new Foo();
      foo.bar();
      jest.runAllTimers();
      foo.bar();
      foo.bar();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should pass through scope', () => {
      const mockFn = jest.fn();
      let lastScope;
      class Foo {
        @withCooldown(100)
        bar(...args) {
          lastScope = this;
        }
      }
      const foo = new Foo();
      const exampleObject = {};
      foo.bar.call(exampleObject);
      expect(lastScope).toBe(exampleObject);
    });
  });
});
