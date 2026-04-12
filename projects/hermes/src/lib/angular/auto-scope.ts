import { DestroyRef, inject } from '@angular/core';
import { Scope } from '../core/scope';

export function createAngularScope(destroyRef: DestroyRef = inject(DestroyRef)): Scope {
  const scope = new Scope();
  destroyRef.onDestroy(() => scope.dispose());
  return scope;
}