import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    "settings": {
      "import/resolver": {
        "node": {
          "paths": [
            "src"
          ],
          "extensions": [
            ".js",
            ".jsx",
            ".ts",
            ".tsx"
          ]
        }
      }
    },
    "env": {
      "browser": true,
      "es2021": true
    },
    "extends": [
      "next/core-web-vitals",
      "eslint:all",
      "plugin:react/all",
      "plugin:react-hooks/recommended",
      "airbnb",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true,
        "tsx": true
      },
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    "plugins": [
      "react",
      "simple-import-sort",
      "no-relative-import-paths",
      "@typescript-eslint"
    ],
    "rules": {
      "import/no-cycle": 0,
      "default-param-last": 0,
      "function-call-argument-newline": [
        "error",
        "consistent"
      ],
      "no-var": 0,
      "react/jsx-no-leaked-render": 0,
      "react/jsx-filename-extension": 0,
      "@next/next/no-img-element": 0,
      "react/react-in-jsx-scope": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "function-paren-newline": [
        "error",
        "consistent"
      ],
      "react/jsx-no-constructed-context-values": 0,
      "no-console": 0,
      "jsx-a11y/label-has-associated-control": 0,
      "prefer-destructuring": 0,
      "import/no-extraneous-dependencies": 0,
      "import/no-named-as-default": 0,
      "jsx-a11y/click-events-have-key-events": 0,
      "jsx-a11y/no-static-element-interactions": 0,
      "linebreak-style": 0,
      "max-classes-per-file": 0,
      "no-shadow": 0,
      "max-len": [
        "error",
        {
          "code": 128,
          "ignoreComments": true
        }
      ],
      "max-params": [
        "error",
        6
      ],
      "no-extra-boolean-cast": 0,
      "no-multi-spaces": [
        "error"
      ],
      "no-param-reassign": 0,
      "no-sequences": 0,
      "no-plusplus": 0,
      "@typescript-eslint/no-unused-vars": 1,
      "no-unused-vars": [
        1,
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      "react/destructuring-assignment": 0,
      "react/function-component-definition": 0,
      "react/jsx-key": [
        "error",
        {
          "checkFragmentShorthand": true,
          "checkKeyMustBeforeSpread": true
        }
      ],
      "react/jsx-no-useless-fragment": [
        "error",
        {
          "allowExpressions": true
        }
      ],
      "react/require-default-props": 0,
      "react-hooks/exhaustive-deps": 0,
      "react/jsx-props-no-spreading": 0,
      "react/no-array-index-key": 0,
      "react/no-unstable-nested-components": 0,
      "simple-import-sort/imports": "error",
      "no-relative-import-paths/no-relative-import-paths": [
        "warn",
        {
          "allowSameFolder": true,
          "rootDir": "src"
        }
      ],
      "import/extensions": 0,
      "indent": [
        "error",
        2
      ],
      "quotes": [
        "error",
        "single"
      ],
      "semi": [
        "error",
        "always"
      ],
      "react-hooks/rules-of-hooks": 0
    },
    "overrides": [
      {
        "files": [
          "*.js",
          "*.jsx",
          "*.ts",
          "*.tsx"
        ],
        "rules": {
          "simple-import-sort/imports": [
            "error",
            {
              "groups": [
                [
                  "^react",
                  "^@?\\w"
                ],
                [
                  "^(@|components)(/.*|$)"
                ],
                [
                  "^\\u0000"
                ],
                [
                  "^\\.\\.(?!/?$)",
                  "^\\.\\./?$"
                ],
                [
                  "^\\./(?=.*/)(?!/?$)",
                  "^\\.(?!/?$)",
                  "^\\./?$"
                ],
                [
                  "^.+\\.?(css)$"
                ]
              ]
            }
          ]
        }
      }
    ]
  }
)
