import plugin from 'tailwindcss/plugin';
import { CSSRuleObject } from 'tailwindcss/types/config';

module.exports = plugin(({ matchUtilities, e, addUtilities, theme }) => {
  function getClassesForValues(
    values: Record<string, string>,
    prefix: string,
    attributesToSet: string[]
  ): CSSRuleObject {
    return Object.entries(values).reduce<CSSRuleObject>((acc, [key, value]) => {
      acc[`.${e(prefix)}-${e(key)}`] = Object.fromEntries(
        attributesToSet.map((attr) => [attr, value])
      );
      return acc;
    }, {});
  }

  addUtilities({
    ...getClassesForValues(
      {
        auto: 'auto',
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        full: '100%',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
      },
      's',
      ['width', 'height']
    ),
    ...getClassesForValues(
      {
        full: '100%',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
      },
      'min-s',
      ['minWidth', 'minHeight']
    ),
    ...getClassesForValues(
      {
        none: 'none',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        full: '100%',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
        prose: '65ch',
        ...breakpoints(theme('screens')),
      },
      'max-s',
      ['maxWidth', 'maxHeight']
    ),
    '.s-screen': {
      width: '100vw',
      height: '100vh',
    },
    '.min-s-screen': {
      minWidth: '100vw',
      minHeight: '100vh',
    },
    '.max-s-screen': {
      maxWidth: '100vw',
      maxHeight: '100vh',
    },
  });
  matchUtilities(
    {
      s: (value) => ({
        height: value,
        width: value,
      }),
    },
    { values: theme('spacing') }
  );
  matchUtilities(
    {
      'min-s': (value) => ({
        minHeight: value,
        minWidth: value,
      }),
    },
    { values: theme('spacing') }
  );
  matchUtilities(
    {
      'max-s': (value) => ({
        maxHeight: value,
        maxWidth: value,
      }),
    },
    { values: theme('spacing') }
  );
});

/**
 * got this from https://github.com/tailwindlabs/tailwindcss/blob/30df062a858628f16fa666f49cd905314146ca05/src/util/resolveConfig.js#L56-L67
 *
 * this is how tailwind generates the classNames for maxWidth here https://github.com/tailwindlabs/tailwindcss/blob/acf94038261aa532d970cc13070cdcdb1b41bb0a/stubs/config.full.js#L601-L621
 *
 */
function breakpoints(screens: any): any {
  return Object.keys(screens)
    .filter((key) => typeof screens[key] === 'string')
    .reduce(
      (breakpoints, key) => ({
        ...breakpoints,
        [`screen-${key}`]: screens[key],
      }),
      {}
    );
}
