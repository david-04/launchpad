export const TSCONFIG_JSON_TEMPLATES = {
    "tsconfig.cli-app-cjs.json": {
        "compilerOptions": {
            "allowArbitraryExtensions": false,
            "allowImportingTsExtensions": false,
            "allowJs": false,
            "allowSyntheticDefaultImports": false,
            "allowUmdGlobalAccess": false,
            "allowUnreachableCode": false,
            "allowUnusedLabels": false,
            "alwaysStrict": true,
            "composite": false,
            "declaration": false,
            "declarationMap": false,
            "disableReferencedProjectLoad": false,
            "disableSolutionSearching": false,
            "disableSourceOfProjectReferenceRedirect": false,
            "downlevelIteration": false,
            "emitBOM": false,
            "emitDeclarationOnly": false,
            "emitDecoratorMetadata": false,
            "esModuleInterop": true,
            "exactOptionalPropertyTypes": true,
            "experimentalDecorators": false,
            "forceConsistentCasingInFileNames": true,
            "importHelpers": false,
            "incremental": true,
            "inlineSourceMap": false,
            "inlineSources": false,
            "isolatedModules": true,
            "module": "commonjs",
            "moduleDetection": "force",
            "moduleResolution": "node10",
            "newLine": "lf",
            "noEmit": false,
            "noEmitHelpers": false,
            "noEmitOnError": true,
            "noFallthroughCasesInSwitch": true,
            "noImplicitAny": true,
            "noImplicitOverride": true,
            "noImplicitReturns": true,
            "noImplicitThis": true,
            "noLib": false,
            "noPropertyAccessFromIndexSignature": true,
            "noUncheckedIndexedAccess": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "outDir": "__OUT_DIR__",
            "preserveConstEnums": true,
            "preserveSymlinks": false,
            "removeComments": true,
            "resolveJsonModule": true,
            "skipLibCheck": true,
            "sourceMap": true,
            "strict": true,
            "strictBindCallApply": true,
            "strictFunctionTypes": true,
            "strictNullChecks": true,
            "strictPropertyInitialization": true,
            "stripInternal": true,
            "target": "es2022",
            "tsBuildInfoFile": "__OUT_DIR__/.tsbuildinfo",
            "useDefineForClassFields": true,
            "useUnknownInCatchVariables": true,
            "verbatimModuleSyntax": false
        },
        "include": [
            "__SRC_DIR__/**/*.ts",
            "__SRC_DIR__/**/*.tsx"
        ]
    },
    "tsconfig.cli-app-esm.json": {
        "compilerOptions": {
            "allowArbitraryExtensions": false,
            "allowImportingTsExtensions": false,
            "allowJs": false,
            "allowSyntheticDefaultImports": false,
            "allowUmdGlobalAccess": false,
            "allowUnreachableCode": false,
            "allowUnusedLabels": false,
            "alwaysStrict": true,
            "composite": false,
            "declaration": false,
            "declarationMap": false,
            "disableReferencedProjectLoad": false,
            "disableSolutionSearching": false,
            "disableSourceOfProjectReferenceRedirect": false,
            "downlevelIteration": false,
            "emitBOM": false,
            "emitDeclarationOnly": false,
            "emitDecoratorMetadata": false,
            "esModuleInterop": true,
            "exactOptionalPropertyTypes": true,
            "experimentalDecorators": false,
            "forceConsistentCasingInFileNames": true,
            "importHelpers": false,
            "incremental": true,
            "inlineSourceMap": false,
            "inlineSources": false,
            "isolatedModules": true,
            "module": "node16",
            "moduleDetection": "force",
            "moduleResolution": "node16",
            "newLine": "lf",
            "noEmit": false,
            "noEmitHelpers": false,
            "noEmitOnError": true,
            "noFallthroughCasesInSwitch": true,
            "noImplicitAny": true,
            "noImplicitOverride": true,
            "noImplicitReturns": true,
            "noImplicitThis": true,
            "noLib": false,
            "noPropertyAccessFromIndexSignature": true,
            "noUncheckedIndexedAccess": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "outDir": "__OUT_DIR__",
            "preserveConstEnums": true,
            "preserveSymlinks": false,
            "removeComments": true,
            "resolveJsonModule": true,
            "resolvePackageJsonExports": true,
            "resolvePackageJsonImports": true,
            "skipLibCheck": true,
            "sourceMap": true,
            "strict": true,
            "strictBindCallApply": true,
            "strictFunctionTypes": true,
            "strictNullChecks": true,
            "strictPropertyInitialization": true,
            "stripInternal": true,
            "target": "es2022",
            "tsBuildInfoFile": "__OUT_DIR__/.tsbuildinfo",
            "useDefineForClassFields": true,
            "useUnknownInCatchVariables": true,
            "verbatimModuleSyntax": false
        },
        "include": [
            "__SRC_DIR__/**/*.ts",
            "__SRC_DIR__/**/*.tsx"
        ],
        "ts-node": {
            "esm": true
        }
    },
    "tsconfig.cli-lib-cjs.json": {
        "compilerOptions": {
            "allowArbitraryExtensions": false,
            "allowImportingTsExtensions": false,
            "allowJs": false,
            "allowSyntheticDefaultImports": false,
            "allowUmdGlobalAccess": false,
            "allowUnreachableCode": false,
            "allowUnusedLabels": false,
            "alwaysStrict": true,
            "composite": false,
            "declaration": true,
            "declarationMap": true,
            "disableReferencedProjectLoad": false,
            "disableSolutionSearching": false,
            "disableSourceOfProjectReferenceRedirect": false,
            "downlevelIteration": false,
            "emitBOM": false,
            "emitDeclarationOnly": false,
            "emitDecoratorMetadata": false,
            "esModuleInterop": true,
            "exactOptionalPropertyTypes": true,
            "experimentalDecorators": false,
            "forceConsistentCasingInFileNames": true,
            "importHelpers": false,
            "incremental": true,
            "inlineSourceMap": false,
            "inlineSources": false,
            "isolatedModules": true,
            "module": "commonjs",
            "moduleDetection": "force",
            "moduleResolution": "node10",
            "newLine": "lf",
            "noEmit": false,
            "noEmitHelpers": false,
            "noEmitOnError": true,
            "noFallthroughCasesInSwitch": true,
            "noImplicitAny": true,
            "noImplicitOverride": true,
            "noImplicitReturns": true,
            "noImplicitThis": true,
            "noLib": false,
            "noPropertyAccessFromIndexSignature": true,
            "noUncheckedIndexedAccess": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "outDir": "__OUT_DIR__",
            "preserveConstEnums": true,
            "preserveSymlinks": false,
            "removeComments": true,
            "resolveJsonModule": true,
            "skipLibCheck": true,
            "sourceMap": true,
            "strict": true,
            "strictBindCallApply": true,
            "strictFunctionTypes": true,
            "strictNullChecks": true,
            "strictPropertyInitialization": true,
            "stripInternal": true,
            "target": "es2022",
            "tsBuildInfoFile": "__OUT_DIR__/.tsbuildinfo",
            "useDefineForClassFields": true,
            "useUnknownInCatchVariables": true,
            "verbatimModuleSyntax": false
        },
        "include": [
            "__SRC_DIR__/**/*.ts",
            "__SRC_DIR__/**/*.tsx"
        ]
    },
    "tsconfig.cli-lib-esm.json": {
        "compilerOptions": {
            "allowArbitraryExtensions": false,
            "allowImportingTsExtensions": false,
            "allowJs": false,
            "allowSyntheticDefaultImports": false,
            "allowUmdGlobalAccess": false,
            "allowUnreachableCode": false,
            "allowUnusedLabels": false,
            "alwaysStrict": true,
            "composite": false,
            "declaration": true,
            "declarationMap": true,
            "disableReferencedProjectLoad": false,
            "disableSolutionSearching": false,
            "disableSourceOfProjectReferenceRedirect": false,
            "downlevelIteration": false,
            "emitBOM": false,
            "emitDeclarationOnly": false,
            "emitDecoratorMetadata": false,
            "esModuleInterop": true,
            "exactOptionalPropertyTypes": true,
            "experimentalDecorators": false,
            "forceConsistentCasingInFileNames": true,
            "importHelpers": false,
            "incremental": true,
            "inlineSourceMap": false,
            "inlineSources": false,
            "isolatedModules": true,
            "module": "node16",
            "moduleDetection": "force",
            "moduleResolution": "node16",
            "newLine": "lf",
            "noEmit": false,
            "noEmitHelpers": false,
            "noEmitOnError": true,
            "noFallthroughCasesInSwitch": true,
            "noImplicitAny": true,
            "noImplicitOverride": true,
            "noImplicitReturns": true,
            "noImplicitThis": true,
            "noLib": false,
            "noPropertyAccessFromIndexSignature": true,
            "noUncheckedIndexedAccess": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "outDir": "__OUT_DIR__",
            "preserveConstEnums": true,
            "preserveSymlinks": false,
            "removeComments": true,
            "resolveJsonModule": true,
            "resolvePackageJsonExports": true,
            "resolvePackageJsonImports": true,
            "skipLibCheck": true,
            "sourceMap": true,
            "strict": true,
            "strictBindCallApply": true,
            "strictFunctionTypes": true,
            "strictNullChecks": true,
            "strictPropertyInitialization": true,
            "stripInternal": true,
            "target": "es2022",
            "tsBuildInfoFile": "__OUT_DIR__/.tsbuildinfo",
            "useDefineForClassFields": true,
            "useUnknownInCatchVariables": true,
            "verbatimModuleSyntax": false
        },
        "include": [
            "__SRC_DIR__/**/*.ts",
            "__SRC_DIR__/**/*.tsx"
        ],
        "ts-node": {
            "esm": true
        }
    },
    "tsconfig.web-app-cjs.json": {
        "compilerOptions": {
            "allowArbitraryExtensions": true,
            "allowImportingTsExtensions": false,
            "allowJs": false,
            "allowSyntheticDefaultImports": false,
            "allowUmdGlobalAccess": false,
            "allowUnreachableCode": false,
            "allowUnusedLabels": false,
            "alwaysStrict": true,
            "composite": false,
            "declaration": false,
            "declarationMap": false,
            "disableReferencedProjectLoad": false,
            "disableSolutionSearching": false,
            "disableSourceOfProjectReferenceRedirect": false,
            "downlevelIteration": false,
            "emitBOM": false,
            "emitDeclarationOnly": false,
            "emitDecoratorMetadata": false,
            "esModuleInterop": true,
            "exactOptionalPropertyTypes": true,
            "experimentalDecorators": false,
            "forceConsistentCasingInFileNames": true,
            "importHelpers": false,
            "incremental": true,
            "inlineSourceMap": false,
            "inlineSources": false,
            "isolatedModules": true,
            "jsx": "react",
            "jsxFactory": "React.createElement",
            "module": "commonjs",
            "moduleDetection": "force",
            "moduleResolution": "node10",
            "newLine": "lf",
            "noEmit": false,
            "noEmitHelpers": false,
            "noEmitOnError": true,
            "noFallthroughCasesInSwitch": true,
            "noImplicitAny": true,
            "noImplicitOverride": true,
            "noImplicitReturns": true,
            "noImplicitThis": true,
            "noLib": false,
            "noPropertyAccessFromIndexSignature": true,
            "noUncheckedIndexedAccess": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "outDir": "__OUT_DIR__",
            "preserveConstEnums": true,
            "preserveSymlinks": false,
            "removeComments": true,
            "resolveJsonModule": true,
            "skipLibCheck": true,
            "sourceMap": true,
            "strict": true,
            "strictBindCallApply": true,
            "strictFunctionTypes": true,
            "strictNullChecks": true,
            "strictPropertyInitialization": true,
            "stripInternal": true,
            "target": "es6",
            "tsBuildInfoFile": "__OUT_DIR__/.tsbuildinfo",
            "useDefineForClassFields": true,
            "useUnknownInCatchVariables": true,
            "verbatimModuleSyntax": false
        },
        "include": [
            "__SRC_DIR__/**/*.ts",
            "__SRC_DIR__/**/*.tsx"
        ]
    },
    "tsconfig.web-app-esm.json": {
        "compilerOptions": {
            "allowArbitraryExtensions": true,
            "allowImportingTsExtensions": false,
            "allowJs": false,
            "allowSyntheticDefaultImports": false,
            "allowUmdGlobalAccess": false,
            "allowUnreachableCode": false,
            "allowUnusedLabels": false,
            "alwaysStrict": true,
            "composite": false,
            "declaration": false,
            "declarationMap": false,
            "disableReferencedProjectLoad": false,
            "disableSolutionSearching": false,
            "disableSourceOfProjectReferenceRedirect": false,
            "downlevelIteration": false,
            "emitBOM": false,
            "emitDeclarationOnly": false,
            "emitDecoratorMetadata": false,
            "esModuleInterop": true,
            "exactOptionalPropertyTypes": true,
            "experimentalDecorators": false,
            "forceConsistentCasingInFileNames": true,
            "importHelpers": false,
            "incremental": true,
            "inlineSourceMap": false,
            "inlineSources": false,
            "isolatedModules": true,
            "jsx": "react",
            "jsxFactory": "React.createElement",
            "module": "node16",
            "moduleDetection": "force",
            "moduleResolution": "node16",
            "newLine": "lf",
            "noEmit": false,
            "noEmitHelpers": false,
            "noEmitOnError": true,
            "noFallthroughCasesInSwitch": true,
            "noImplicitAny": true,
            "noImplicitOverride": true,
            "noImplicitReturns": true,
            "noImplicitThis": true,
            "noLib": false,
            "noPropertyAccessFromIndexSignature": true,
            "noUncheckedIndexedAccess": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "outDir": "__OUT_DIR__",
            "preserveConstEnums": true,
            "preserveSymlinks": false,
            "removeComments": true,
            "resolveJsonModule": true,
            "resolvePackageJsonExports": true,
            "resolvePackageJsonImports": true,
            "skipLibCheck": true,
            "sourceMap": true,
            "strict": true,
            "strictBindCallApply": true,
            "strictFunctionTypes": true,
            "strictNullChecks": true,
            "strictPropertyInitialization": true,
            "stripInternal": true,
            "target": "es6",
            "tsBuildInfoFile": "__OUT_DIR__/.tsbuildinfo",
            "useDefineForClassFields": true,
            "useUnknownInCatchVariables": true,
            "verbatimModuleSyntax": false
        },
        "include": [
            "__SRC_DIR__/**/*.ts",
            "__SRC_DIR__/**/*.tsx"
        ],
        "ts-node": {
            "esm": true
        }
    },
    "tsconfig.web-lib-cjs.json": {
        "compilerOptions": {
            "allowArbitraryExtensions": true,
            "allowImportingTsExtensions": false,
            "allowJs": false,
            "allowSyntheticDefaultImports": false,
            "allowUmdGlobalAccess": false,
            "allowUnreachableCode": false,
            "allowUnusedLabels": false,
            "alwaysStrict": true,
            "composite": false,
            "declaration": true,
            "declarationMap": true,
            "disableReferencedProjectLoad": false,
            "disableSolutionSearching": false,
            "disableSourceOfProjectReferenceRedirect": false,
            "downlevelIteration": false,
            "emitBOM": false,
            "emitDeclarationOnly": false,
            "emitDecoratorMetadata": false,
            "esModuleInterop": true,
            "exactOptionalPropertyTypes": true,
            "experimentalDecorators": false,
            "forceConsistentCasingInFileNames": true,
            "importHelpers": false,
            "incremental": true,
            "inlineSourceMap": false,
            "inlineSources": false,
            "isolatedModules": true,
            "jsx": "react",
            "jsxFactory": "React.createElement",
            "module": "commonjs",
            "moduleDetection": "force",
            "moduleResolution": "node10",
            "newLine": "lf",
            "noEmit": false,
            "noEmitHelpers": false,
            "noEmitOnError": true,
            "noFallthroughCasesInSwitch": true,
            "noImplicitAny": true,
            "noImplicitOverride": true,
            "noImplicitReturns": true,
            "noImplicitThis": true,
            "noLib": false,
            "noPropertyAccessFromIndexSignature": true,
            "noUncheckedIndexedAccess": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "outDir": "__OUT_DIR__",
            "preserveConstEnums": true,
            "preserveSymlinks": false,
            "removeComments": true,
            "resolveJsonModule": true,
            "skipLibCheck": true,
            "sourceMap": true,
            "strict": true,
            "strictBindCallApply": true,
            "strictFunctionTypes": true,
            "strictNullChecks": true,
            "strictPropertyInitialization": true,
            "stripInternal": true,
            "target": "es6",
            "tsBuildInfoFile": "__OUT_DIR__/.tsbuildinfo",
            "useDefineForClassFields": true,
            "useUnknownInCatchVariables": true,
            "verbatimModuleSyntax": false
        },
        "include": [
            "__SRC_DIR__/**/*.ts",
            "__SRC_DIR__/**/*.tsx"
        ]
    },
    "tsconfig.web-lib-esm.json": {
        "compilerOptions": {
            "allowArbitraryExtensions": true,
            "allowImportingTsExtensions": false,
            "allowJs": false,
            "allowSyntheticDefaultImports": false,
            "allowUmdGlobalAccess": false,
            "allowUnreachableCode": false,
            "allowUnusedLabels": false,
            "alwaysStrict": true,
            "composite": false,
            "declaration": true,
            "declarationMap": true,
            "disableReferencedProjectLoad": false,
            "disableSolutionSearching": false,
            "disableSourceOfProjectReferenceRedirect": false,
            "downlevelIteration": false,
            "emitBOM": false,
            "emitDeclarationOnly": false,
            "emitDecoratorMetadata": false,
            "esModuleInterop": true,
            "exactOptionalPropertyTypes": true,
            "experimentalDecorators": false,
            "forceConsistentCasingInFileNames": true,
            "importHelpers": false,
            "incremental": true,
            "inlineSourceMap": false,
            "inlineSources": false,
            "isolatedModules": true,
            "jsx": "react",
            "jsxFactory": "React.createElement",
            "module": "node16",
            "moduleDetection": "force",
            "moduleResolution": "node16",
            "newLine": "lf",
            "noEmit": false,
            "noEmitHelpers": false,
            "noEmitOnError": true,
            "noFallthroughCasesInSwitch": true,
            "noImplicitAny": true,
            "noImplicitOverride": true,
            "noImplicitReturns": true,
            "noImplicitThis": true,
            "noLib": false,
            "noPropertyAccessFromIndexSignature": true,
            "noUncheckedIndexedAccess": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "outDir": "__OUT_DIR__",
            "preserveConstEnums": true,
            "preserveSymlinks": false,
            "removeComments": true,
            "resolveJsonModule": true,
            "resolvePackageJsonExports": true,
            "resolvePackageJsonImports": true,
            "skipLibCheck": true,
            "sourceMap": true,
            "strict": true,
            "strictBindCallApply": true,
            "strictFunctionTypes": true,
            "strictNullChecks": true,
            "strictPropertyInitialization": true,
            "stripInternal": true,
            "target": "es6",
            "tsBuildInfoFile": "__OUT_DIR__/.tsbuildinfo",
            "useDefineForClassFields": true,
            "useUnknownInCatchVariables": true,
            "verbatimModuleSyntax": false
        },
        "include": [
            "__SRC_DIR__/**/*.ts",
            "__SRC_DIR__/**/*.tsx"
        ],
        "ts-node": {
            "esm": true
        }
    }
} as const;