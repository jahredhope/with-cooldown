function withCooldown(cooldown = 100, callback) {
  let inCooldown = false;
  return function(...args) {
    if (inCooldown) {
      return;
    }
    inCooldown = true;
    callback.apply(this, args);
    setTimeout(() => {
      inCooldown = false;
    }, cooldown);
  };
}

export default (cooldown, callback) => {
  if (callback) {
    return withCooldown(cooldown, callback);
  }
  return (target, key, decorator) => {
    const originalMethod = decorator.value;
    decorator.value = withCooldown(cooldown, originalMethod);
    return decorator;
  };
  let inCooldown = false;
};
