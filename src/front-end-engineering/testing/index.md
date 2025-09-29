# 前端测试

测试是前端工程化中确保代码质量和功能正确性的重要环节。

## 测试类型

### 1. 单元测试 (Unit Testing)

测试最小可测试单元，通常是函数或组件。

```js
// 使用 Jest 进行单元测试示例
function add(a, b) {
  return a + b;
}

describe('add function', () => {
  test('should return the sum of two numbers', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 1)).toBe(0);
  });
});
```

### 2. 集成测试 (Integration Testing)

测试多个单元协同工作的效果。

```js
// 测试组件与 Redux store 的集成
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  
  expect(screen.getByText(/learn redux/i)).toBeInTheDocument();
});
```

### 3. 端到端测试 (E2E Testing)

模拟真实用户行为，测试整个应用流程。

```js
// 使用 Cypress 进行 E2E 测试
describe('Login Flow', () => {
  it('successfully logs in', () => {
    cy.visit('/login');
    
    cy.get('[data-cy=username]').type('user@example.com');
    cy.get('[data-cy=password]').type('password');
    cy.get('[data-cy=submit]').click();
    
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome, User');
  });
});
```

## 测试工具

### Jest

流行的 JavaScript 测试框架。

```js
// 配置文件 jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts'
  ]
};

// 测试示例
import { sum, subtract } from './math';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('subtracts 2 - 1 to equal 1', () => {
  expect(subtract(2, 1)).toBe(1);
});
```

### React Testing Library

为 React 组件提供测试工具。

```jsx
// 测试 React 组件
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments counter on click', () => {
  render(<Counter />);
  
  const button = screen.getByRole('button', { name: /increment/i });
  const count = screen.getByText(/0/i);
  
  fireEvent.click(button);
  
  expect(count).toHaveTextContent('1');
});
```

### Vue Test Utils

Vue.js 官方的测试工具库。

```js
// 测试 Vue 组件
import { mount } from '@vue/test-utils';
import Counter from '@/components/Counter.vue';

describe('Counter.vue', () => {
  test('renders correctly', () => {
    const wrapper = mount(Counter);
    expect(wrapper.text()).toContain('0');
  });

  test('increments when button is clicked', async () => {
    const wrapper = mount(Counter);
    const button = wrapper.find('button');
    
    await button.trigger('click');
    
    expect(wrapper.text()).toContain('1');
  });
});
```

### Cypress

现代化的端到端测试工具。

```js
// Cypress 测试示例
describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('adds a new todo', () => {
    cy.get('[data-cy=new-todo]')
      .type('Buy milk')
      .type('{enter}');
      
    cy.get('[data-cy=todo-list]')
      .should('contain', 'Buy milk');
  });

  it('marks todo as completed', () => {
    cy.get('[data-cy=new-todo]')
      .type('Buy milk{enter}');
      
    cy.get('[data-cy=todo-item]')
      .find('[data-cy=toggle]')
      .click();
      
    cy.get('[data-cy=todo-item]')
      .should('have.class', 'completed');
  });
});
```

## 测试最佳实践

### 1. 测试金字塔

遵循测试金字塔原则：
- 大量单元测试
- 适量集成测试
- 少量端到端测试

```js
// 单元测试 - 快速且专注
test('calculateTotal returns correct sum', () => {
  const items = [{ price: 10 }, { price: 20 }];
  expect(calculateTotal(items)).toBe(30);
});

// 集成测试 - 测试组件与 store 的交互
test('Cart component updates when items are added', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Cart />
    </Provider>
  );
  
  store.dispatch(addItem({ price: 10 }));
  
  expect(getByText('$10.00')).toBeInTheDocument();
});

// E2E 测试 - 完整的用户流程
it('user can complete purchase', () => {
  cy.visit('/cart');
  cy.get('[data-cy=checkout]').click();
  cy.get('[data-cy=payment-form]').should('be.visible');
  // ... 完成支付流程
});
```

### 2. 测试驱动开发 (TDD)

先写测试，再实现功能：

```js
// 1. 先写测试
test('getUser returns user data', async () => {
  const user = await getUser(1);
  expect(user).toHaveProperty('id', 1);
  expect(user).toHaveProperty('name');
});

// 2. 再实现功能
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

### 3. Mock 和 Stub

```js
// Mock API 调用
jest.mock('./api', () => ({
  fetchUser: jest.fn().mockResolvedValue({ id: 1, name: 'John' })
}));

test('loads user on mount', async () => {
  render(<UserProfile userId={1} />);
  
  expect(await screen.findByText('John')).toBeInTheDocument();
});

// Mock 定时器
test('shows loading state initially', () => {
  jest.useFakeTimers();
  
  render(<DelayedComponent />);
  
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  jest.advanceTimersByTime(2000);
  
  expect(screen.getByText('Content')).toBeInTheDocument();
});
```

## 测试覆盖率

```js
// Jest 配置获取测试覆盖率
// package.json
{
  "scripts": {
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.d.ts",
      "!src/index.js"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

## 持续集成中的测试

```yaml
# GitHub Actions 中运行测试
name: CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Run linting
        run: npm run lint
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v1
```

## 相关链接

- [Jest 官方文档](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vue Test Utils](https://vue-test-utils.vuejs.org/)
- [Cypress 官方文档](https://www.cypress.io/)