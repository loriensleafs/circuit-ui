module.exports = require('@sumup/foundry/eslint')(
  {
    language: 'JavaScript',
    environments: ['Node'],
    frameworks: ['React', 'Emotion', 'Jest'],
    openSource: true,
  },
  {
    rules: {
      'no-console': 'off',
    },
  },
);
