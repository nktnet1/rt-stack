interface Resources {
  "common": {
    "app": {
      "name": "RT Stack"
    },
    "auth": {
      "login": {
        "labels": {
          "email": "Email",
          "password": "Password"
        },
        "registerLinkReference": "Don't have an account? <RegisterLink>Register</RegisterLink>!",
        "verb": "Log In"
      },
      "register": {
        "labels": {
          "confirmPassword": "Confirm Password",
          "email": "Email",
          "fullName": "Full Name",
          "password": "Password"
        },
        "loginLinkReference": "Already have an account? <LoginLink>Log in</LoginLink>!",
        "verb": "Register"
      }
    },
    "home": {
      "authenticated": {
        "clickToViewPostText": "Click <LinkComponent>here <IconComponent/></LinkComponent> to view your posts.",
        "openApiReferenceText": "You can also interact with the OpenAPI specification using Scalar:",
        "welcomeUserText": "Welcome, <Bold>{{name}}</Bold>!"
      },
      "common": {
        "liveDemoText": "This is the live demo for <LinkComponent>{{appName}}</LinkComponent>.",
        "selectLanguageText": "Select Language:",
        "toggleThemeText": "Toggle Theme:"
      },
      "unauthenticated": {
        "loginText": "Please <LinkComponent>login<LinkComponent>."
      }
    },
    "nav": {
      "avatar": {
        "logout": "Log out",
        "theme": "Theme"
      },
      "links": {
        "home": "Home",
        "login": "Login",
        "posts": "Posts",
        "register": "Register"
      }
    },
    "posts": {
      "create": {
        "buttonLabel": "Create",
        "postContentLabel": "Content",
        "postTitleLabel": "Title",
        "subtitle": "Write about an interesting topic!",
        "title": "Create Post"
      },
      "delete": {
        "iconTooltip": "Delete post"
      },
      "list": {
        "emptyText": "There are no posts available.",
        "searchPlaceholder": "Search by title...",
        "sortByCreatedDateTooltip": "Sort by created date",
        "title": "Posts"
      },
      "view": {
        "backButton": "View all posts",
        "createdByLabel": "Created by"
      }
    }
  }
}

export default Resources;
