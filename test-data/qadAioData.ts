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
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
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
    steps: [
      'Open https://www.saucedemo.com',
      'Enter username standard_user',
      'Enter password secret_sauce',
      'Click Login',
    ],
    expectedResults: [
      'Inventory page loads',
      'Products heading is visible',
      'URL reflects inventory route',
    ],
    testTitle: '[QAD-5][SAUCE-AIO-001] successful login shows inventory',
  },
  {
    jiraKey: 'QAD-4',
    aioKey: 'SAUCE-AIO-002',
    summary: 'Verify locked user cannot authenticate',
    preconditions: 'App is reachable at Sauce Demo login page',
    steps: [
      'Open https://www.saucedemo.com',
      'Enter username locked_out_user',
      'Enter password secret_sauce',
      'Click Login',
    ],
    expectedResults: [
      'Locked user error is displayed',
      'User remains on login page',
    ],
    testTitle: '[QAD-4][SAUCE-AIO-002] locked user sees auth error',
  },
  {
    jiraKey: 'QAD-6',
    aioKey: 'SAUCE-AIO-003',
    summary: 'Verify inventory sort by Price (Low to High)',
    preconditions: 'Logged in as standard_user on inventory page',
    steps: ['Open sort dropdown', 'Select Price (Low to High)'],
    expectedResults: ['Prices are shown in ascending order'],
    testTitle: '[QAD-6][SAUCE-AIO-003] sort low-to-high orders prices',
  },
  {
    jiraKey: 'QAD-7',
    aioKey: 'SAUCE-AIO-004',
    summary: 'Verify add-to-cart updates cart badge',
    preconditions: 'Logged in as standard_user on inventory page',
    steps: ['Capture initial cart count', 'Add one inventory item'],
    expectedResults: ['Cart badge increments by one'],
    testTitle: '[QAD-7][SAUCE-AIO-004] add to cart increments badge',
  },
  {
    jiraKey: 'QAD-8',
    aioKey: 'SAUCE-AIO-005',
    summary: 'Verify remove-from-cart restores inventory state',
    preconditions: 'Logged in with one item already added',
    steps: ['Open cart', 'Remove added item'],
    expectedResults: [
      'Cart badge returns to empty',
      'Add to cart is available again',
    ],
    testTitle: '[QAD-8][SAUCE-AIO-005] remove from cart clears state',
  },
  {
    jiraKey: 'QAD-9',
    aioKey: 'SAUCE-AIO-006',
    summary: 'Verify checkout completes with valid shopper details',
    preconditions: 'Logged in with at least one item in cart',
    steps: [
      'Open cart',
      'Proceed to checkout',
      'Provide shopper details',
      'Continue',
      'Finish',
    ],
    expectedResults: ['Order completion confirmation is shown'],
    testTitle: '[QAD-9][SAUCE-AIO-006] checkout completes successfully',
  },
  {
    jiraKey: 'QAD-10',
    aioKey: 'SAUCE-AIO-007',
    summary: 'Verify logout ends session',
    preconditions: 'Logged in on inventory page',
    steps: ['Open side menu', 'Click Logout'],
    expectedResults: [
      'Login page is displayed',
      'Direct inventory visit redirects to login',
    ],
    testTitle: '[QAD-10][SAUCE-AIO-007] logout invalidates session',
  },
];
type ContactFormData = {
  fullName: string;
  email: string;
  phone: string;
  serviceInterested: string;
  message: string;
};

export type JiraAioTestCase = {
  jiraKey: string;
  aioKey: string;
  summary: string;
  description: string;
  acceptanceCriteria: string;
  testTitle: string;
  testSteps: string[];
  expectedResults: string[];
};

export const qadAioDerivedTests: JiraAioTestCase[] = [
  {
    jiraKey: 'QAD-1',
    aioKey: 'AIO-TC-001',
    summary: '[AIO-TC-001] Verify contact form submission',
    description: 'Open Contact page, fill details, and submit the form.',
    acceptanceCriteria: 'Success message is displayed after submit.',
    testTitle: 'Verify contact form submission from Contact page',
    testSteps: [
      'Open Contact page from homepage.',
      'Fill contact form fields with valid data.',
      'Click Send message.',
    ],
    expectedResults: [
      'Contact form submit action is accepted by UI.',
      'A post-submit confirmation or thank-you state appears.',
    ],
  },
  {
    jiraKey: 'QAD-2',
    aioKey: 'AIO-TC-003',
    summary: '[AIO-TC-003] Verify service page navigation',
    description: 'Go to Services and open Business Registration service details.',
    acceptanceCriteria: 'Business Registration page is displayed.',
    testTitle: 'Verify navigation to Business Registration service detail page',
    testSteps: [
      'Open Services from homepage top navigation.',
      'Open Business Registration & Corporate Secretary Services.',
    ],
    expectedResults: ['Business Registration service detail heading is visible.'],
  },
  {
    jiraKey: 'QAD-3',
    aioKey: 'AIO-TC-002',
    summary: '[AIO-TC-002] Verify consultation booking CTA',
    description: 'Open consultation CTA from homepage and verify contact form.',
    acceptanceCriteria: 'Consultation/contact form is displayed.',
    testTitle: 'Verify consultation CTA routes user to contact consultation form',
    testSteps: [
      'Click Book a consultation from homepage.',
      'Verify consultation form fields are visible.',
    ],
    expectedResults: ['Contact consultation form is displayed and ready for input.'],
  },
];

export const qadContactData: ContactFormData = {
  fullName: 'QA Automation User',
  email: 'qa.automation.user@example.com',
  phone: '+94 77 123 4567',
  serviceInterested: 'Business Registration & Corporate Secretary Services',
  message: 'Need help with registration timeline and compliance requirements.',
};
