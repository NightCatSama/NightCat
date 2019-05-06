module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'ci',
        'chore',
        'revert',
        'temp',
        'update',
        'change',
      ],
    ],
    'subject-case': [0, 'never', ['lower-case']],
  },
}
