# Login & Access Overview

This README describes how authentication and role-based access control are implemented for the backend and frontend, including login flow, route protection, and token handling.

# BE

**JWT-based authentication**
- Tokens expire in: `jwt.expiration=3600000` (1 hour)

**Public (unauthenticated) endpoints:**

- `/auth/login`
- `/auth/team-signup`
- `/users/accounts` (temporary for devs testing)

**Role & team-based access:**

- Use Spring Security with expression-based access checks on the controller methods. Example:

```js
@PreAuthorize("@authValidator.belongsToTeam(#teamId) and hasRole('ADMIN')")
```

You can mix team and role conditions. Examples:

```js
@PreAuthorize("hasRole('PLAYER')")

@PreAuthorize("@authValidator.belongsToTeam(#teamId)")

@PreAuthorize("@authValidator.belongsToTeam(#teamId) and (hasRole('ADMIN') or hasRole('STAFF'))")
```

---

# FE

**Role-based Rerouting after login**

After login in [LoginPage.jsx](https://github.com/andreea-lipan/beyond-ball/blob/c653bb39b4a66cc7e553aec224d55fd00f157276/beyond-ball-fe/src/pages/auth/LoginPage.jsx):

```js
if (role === "ADMIN") {
    navigate("/mock");
} else {
    navigate("/whiteboards");
}
...
```

**Routes only render if role matches:**

in [App.jsx \<Route\> elements](https://github.com/andreea-lipan/beyond-ball/blob/c653bb39b4a66cc7e553aec224d55fd00f157276/beyond-ball-fe/src/App.jsx):

```js
["PLAYER", "STAFF"].includes(role)
```

### !!!
### No need for developers to manually attach tokens in requests. Currently used for all existing requests:
### !!!

**Tokens are auto-attached to all API requests:**

```js
config.headers.Authorization = `Bearer ${token}`;
```

- `RequestInstance` (JSON APIs)
- `FileRequestInstance` (file uploads)

## Working with authentication data

There are two ways to get authentication data and use it in code.

**1.Basic get values from JWT:**

```js
Storage.getToken()
Storage.getRoleFromToken()
Storage.getTeamIdFromToken()
Storage.getUserIdFromToken()
```

Helpers that decode the current JWT from localStorage.

Recommended uses:
- Axios setup (headers)
    - Send teamId as part of the URL or query
    - Choose endpoints based on role
- Utility/helper functions
- Can be used outside React components as well

---

**2.For React Components**

Use the `useAuth()` hook:

```js
const { role, teamId } = useAuth();
```

Automatically updates on login/logout

Recommended uses:
- React components
- Routing logic
- Conditional rendering 
    - Prevent rendering if not certain role/team
    - Conditionally show buttons for roles/teams

---