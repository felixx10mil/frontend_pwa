const routes = [
  {
    path: '/',
    component: () => import('src/layouts/AuthLayout.vue'),
    children: [
      { path: '/', redirect: '/welcome' },
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('src/pages/WelcomePage.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/signin',
        name: 'signin',
        component: () => import('src/pages/auth/SigninPage.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/signin/by/email',
        name: 'signinByEmail',
        component: () => import('src/pages/auth/SigninByEmailPage.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/verify/auth/email/:token',
        name: 'verifyAuthEmail',
        component: () => import('src/pages/auth/VerifyAuthEmailPage.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import('src/pages/auth/SignupPage.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/forgot/password',
        name: 'forgot',
        component: () => import('src/pages/auth/ForgotPasswordPage.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/reset/password/:token',
        name: 'reset',
        component: () => import('src/pages/auth/ResetPasswordPage.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/confirm/account/:token',
        name: 'confirm',
        component: () => import('src/pages/auth/ConfirmAccountPage.vue'),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('src/layouts/HomeLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('src/pages/home/IndexPage.vue'),
        meta: {
          title: 'Home',
          requiresAuth: true,
        },
      },
    ],
  },

  {
    path: '/',
    component: () => import('src/layouts/UserLayout.vue'),
    children: [
      {
        path: 'users',
        name: 'users',
        component: () => import('src/pages/users/UsersPage.vue'),
        meta: {
          title: 'Users',
          requiresAuth: true,
        },
      },
      {
        path: 'users/:id/settings',
        name: 'users.settings',
        props(route) {
          return {
            id: parseInt(route.params.id),
          }
        },
        component: () => import('src/pages/users/UsersSettingPage.vue'),
        meta: {
          title: 'Setting',
          requiresAuth: true,
        },
      },
    ],
  },

  {
    path: '/',
    component: () => import('src/layouts/ProfileLayout.vue'),
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('src/pages/users/UserPageProfile.vue'),
        meta: {
          title: 'Profile',
          requiresAuth: true,
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/ErrorNotFound.vue'),
    meta: {
      requiresAuth: false,
    },
  },
]

export default routes
