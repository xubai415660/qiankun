module.exports = {
    root: true, // 标识根目录
    env: {
        node: true,
        browser: true
    },
    ignorePatterns: ['node_modules/'], // 需要忽略的特定文件和目录
    extends: [
    /**
         * @vue/cli-plugin-eslint 提供了三种模式的规则：
         * 必要（默认）规则：plugin:vue/essential
         * 强烈推荐规则: plugin:vue/strongly-recommended
         * 推荐规则: plugin:vue/recommended
         * 三者并不是独立的，而是包含关系：推荐规则 》强烈推荐规则 》必要（默认）规则
         * 此外，我们也可以在 rules 对这些规则做自己的设定。
         * 更多设置规则：https://eslint.vuejs.org/rules/
         */
        // 'plugin:vue/recommended', // 推荐规则
        'plugin:vue/strongly-recommended' // 强烈推荐规则
    // 'plugin:vue/essential', // 必要（默认）规则
    ],
    plugins: ['prettier'],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
    /**
         * 0 = off, 1 = warn, 2 = error
         */
        'vue/multi-word-component-names': 'off', // 关闭强制组件name由多单词组成
        'vue/html-self-closing': 0, // 关闭强制自闭合标签检测
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: {
                    max: 6 // 单行最多6个属性
                },
                multiline: {
                    max: 1 // 超过6个属性，多行显示，每行1个
                }
            }
        ],
        'vue/singleline-html-element-content-newline': 0, // 关闭强制在单行元素的内容之前和之后使用换行符
        'no-tabs': ['error'], // 禁止使用tab缩进
        'indent': [2, 4], // 缩进风格，两个空格
        'semi': [0], // 关闭语句强制分号结尾
        'no-alert': 1, // 禁止使用 alert confirm prompt
        'no-dupe-keys': 'error', // 在创建对象字面量时不允许key重复 {a: 1, a: 1}
        'no-eval': 'error', // 禁止使用 eval
        'no-eq-null': 'error', // 禁止对 null 使用 == 或 != 运算符
        'no-func-assign': 'error', // 禁止重复的函数声明
        'no-implicit-coercion': 'warn', // 禁止隐式转换
        'no-mixed-spaces-and-tabs': [2, false], // 禁止混用 tab 和空格
        'no-multiple-empty-lines': [1, { max: 1 }], // 空行最多不能超过1行
        'no-redeclare': 2, // 禁止重复声明变量
        'no-spaced-func': 2, // 函数调用时 函数名与()之间不能有空格
        'no-trailing-spaces': 1, // 禁止行末空格
        'no-undef': 'warn', // 不能有未定义的变量
        'no-use-before-define': 2, // 未定义前不能使用 ？禁止声明提前
        'no-var': 2, // 禁止 var 声明变量，使用 let 和 const
        'comma-style': [2, 'last'], // 逗号风格，换行时在行首还是行尾
        'consistent-return': 0, // return 后面是否允许省略
        'consistent-this': [2, 'me'], // this 别名
        'default-case': 2, // switch 语句最后必须有 default
        'dot-location': 0, // 对象访问符的位置，换行时在行首还是行尾
        'id-length': [2, { min: 1 }], // 变量名长度
        'init-declarations': 0, // 声明时必须赋值
        'key-spacing': [2, { beforeColon: false, afterColon: true }], // 对象字面量中冒号的前后空格
        'lines-around-comment': 0, // 行前/行后注释
        'max-depth': [1, 4], // 嵌套块深度
        'space-before-function-paren': [1, 'always'], // 函数定义时括号前面要不要有空格
        'space-unary-ops': [0, { words: true, nonwords: false }], // 一元运算符的前/后要不要加空格
        'use-isnan': 2, // 禁止比较时使用NaN，只能用 isNaN()
        'vars-on-top': 2, // var必须放在作用域顶部
        'vue/require-v-for-key': 'warn', // vue v-for 必须绑定 key

        'no-await-in-loop': 'error', // 禁止在循环中使用 await
        'no-console': 'off', // 关闭禁止使用console
        'no-template-curly-in-string': 'error', // 禁用类似ES6模板字符串的字面量字符串定义
        'block-scoped-var': 'error', // 变量在定义块的外部使用时，规则会报错
        'complexity': ['error', { max: 10 }],
        'one-var': 'off', // 连续的变量声明只使用一个let或const关键字
        'quote-props': [
            // 对象字面值属性名称可以用两种方式定义：使用文字或使用字符串
            'error',
            'consistent', // 强制执行一致的引用风格需要引用对象字面值属性名称
            {
                keywords: true, // 关键字作为属性名称时必须加引号
                numbers: true // 数字作为属性名称时必须加引号
            }
        ],
        'quotes': ['error', 'single'], // 字符串字面量强制使用单引号
        'no-new': 'off', // 关闭禁止使用new构造方法而不赋值
        'curly': ['error', 'all'], // 必须使用 if(){} 中的{}
        'eqeqeq': ['error', 'smart'], // 必须使用全等
        'no-empty-function': 'warn', // 禁止出现空函数
        'no-implied-eval': 'error', // 禁止使用 eval()
        'no-lone-blocks': 'error', // 禁用不必要的嵌套块
        'no-loop-func': 'error', //
        'no-multi-spaces': 'error', // 不能用多余的空格
        'no-multi-str': 'error', // 字符串不能用\换行
        'no-plusplus': 'off', // 关闭禁止 ++ --
        'no-return-assign': 'error', // return 语句中不能有赋值表达式
        'no-self-compare': 'error', // 不能比较自身
        'no-throw-literal': 'error', // 禁止抛出字面量错误 throw "error"
        'no-unmodified-loop-condition': 'error', // 循环中的变量经常在循环中修改。如果不是，那可能是一个错误。
        'no-useless-concat': 'error', // 没有必要将两个字符串连接在一起 var foo = "a" + "b";
        'no-delete-var': 'error', // 不能对var声明的变量使用delete操作符
        'comma-dangle': 'error', // 对象字面量项尾必须有逗号
        'comma-spacing': 'error', // 逗号前后的空格
        'computed-property-spacing': 'error', // 不允许计算属性括号内的空格
        'implicit-arrow-linebreak': 'error', // 在箭头函数体之前不允许换行
        'keyword-spacing': 'error', // 关键字前后至少有一个空格
        'semi-spacing': 'error', // 分号前后禁用空格
        'semi-style': 'error' // 强制分号位于语句的末尾
    }
};
