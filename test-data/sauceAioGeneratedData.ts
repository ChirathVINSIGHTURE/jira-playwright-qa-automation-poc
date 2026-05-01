export type SauceAioCase = {
  jiraKey: string;
  aioKey: string;
  summary: string;
  preconditions: string;
  steps: string[];
  expectedResults: string[];
  testTitle: string;
};

export const sauceUsers = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
};

export const checkoutData = {
  firstName: 'QA',
  lastName: 'Automation',
  postalCode: '500081',
};

export const sauceAioCases: SauceAioCase[] = [
  {
    jiraKey: 'QAD-5',
    aioKey: 'SAUCE-AIO-001',
    summary: 'Verify successful login with standard credentials',
    preconditions: 'App is reachable at Sauce Demo login page',
    steps: ['Open app', 'Enter username', 'Enter password', 'Click Login'],
    expectedResults: ['Inventory page loads', 'Products heading is visible'],
    testTitle: '[QAD-5][SAUCE-AIO-001] successful login shows inventory',
  },
  {
    jiraKey: 'QAD-4',
    aioKey: 'SAUCE-AIO-002',
    summary: 'Verify locked user cannot authenticate',
    preconditions: 'App is reachable at Sauce Demo login page',
    steps: ['Open app', 'Enter locked user credentials', 'Click Login'],
    expectedResults: ['Locked user error appears', 'Still on login page'],
    testTitle: '[QAD-4][SAUCE-AIO-002] locked user sees auth error',
  },
  {
    jiraKey: 'QAD-6',
    aioKey: 'SAUCE-AIO-003',
    summary: 'Verify inventory sort by Price (Low to High)',
    preconditions: 'Logged in as standard_user on inventory page',
    steps: ['Select sort option Price (Low to High)'],
    expectedResults: ['Prices are ascending'],
    testTitle: '[QAD-6][SAUCE-AIO-003] sort low-to-high orders prices',
  },
  {
    jiraKey: 'QAD-7',
    aioKey: 'SAUCE-AIO-004',
    summary: 'Verify add-to-cart updates cart badge',
    preconditions: 'Logged in as standard_user on inventory page',
    steps: ['Record initial badge', 'Add one item'],
    expectedResults: ['Badge increments by one'],
    testTitle: '[QAD-7][SAUCE-AIO-004] add to cart increments badge',
  },
  {
    jiraKey: 'QAD-8',
    aioKey: 'SAUCE-AIO-005',
    summary: 'Verify remove-from-cart restores inventory state',
    preconditions: 'Logged in with one item in cart',
    steps: ['Open cart', 'Remove item'],
    expectedResults: ['Cart badge clears', 'Inventory returns to addable state'],
    testTitle: '[QAD-8][SAUCE-AIO-005] remove from cart clears state',
  },
  {
    jiraKey: 'QAD-9',
    aioKey: 'SAUCE-AIO-006',
    summary: 'Verify checkout completes with valid shopper details',
    preconditions: 'Logged in with at least one item in cart',
    steps: ['Open cart', 'Checkout', 'Fill shopper details', 'Continue', 'Finish'],
    expectedResults: ['Order completion confirmation is shown'],
    testTitle: '[QAD-9][SAUCE-AIO-006] checkout completes successfully',
  },
  {
    jiraKey: 'QAD-10',
    aioKey: 'SAUCE-AIO-007',
    summary: 'Verify logout ends session',
    preconditions: 'Logged in on inventory page',
    steps: ['Open menu', 'Logout'],
    expectedResults: ['Login page is visible', 'Inventory route is blocked'],
    testTitle: '[QAD-10][SAUCE-AIO-007] logout invalidates session',
  },
];
