import Login from "./components/auth/Login";
import Profile from "./components/profile/ProfileFeed";
import Guest from "./components/profile/GuestFeed";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import Education from "./components/account/Education";
import Experience from "./components/account/Experience";
import Information from "./components/account/Information";
import Social from "./components/account/Social";
import Friend from "./components/friend/FriendList";
import Room from "./components/message/Room";
import Jobs from "./components/Jobs/Jobs";
//Layout
import AccountLayout from "./components/layouts/AccountLayout";
import GeneralLayout from "./components/layouts/GeneralLayout";
import Doc from "./components/Jobs/Doc";
const routes = [
  {
    path: "/",
    exact: true,
    layout: GeneralLayout,
    main: Home,
  },
  {
    path: "/login",
    exact: true,
    layout: GeneralLayout,
    main: Login,
  },
  {
    path: "/register",
    exact: true,
    layout: GeneralLayout,
    main: Register,
  },
  {
    path: "/profile",
    exact: true,
    layout: GeneralLayout,
    main: Profile,
  },
  {
    path: "/profile/:id",
    exact: true,
    layout: GeneralLayout,
    main: Guest,
  },
  {
    path: "/account",
    exact: true,
    layout: AccountLayout,
    main: Information,
  },
  {
    path: "/account/education",
    exact: true,
    layout: AccountLayout,
    main: Education,
  },
  {
    path: "/account/experience",
    exact: true,
    layout: AccountLayout,
    main: Experience,
  },
  {
    path: "/account/social",
    exact: true,
    layout: AccountLayout,
    main: Social,
  },
  {
    path: "/friends",
    exact: true,
    layout: GeneralLayout,
    main: Friend,
  },
  {
    path: "/chat",
    exact: true,
    layout: GeneralLayout,
    main: Room,
  },
  {
    path: "/jobs",
    exact: true,
    layout: GeneralLayout,
    main: Jobs,
  },
  {
    path: "/doc",
    exact: true,
    layout: GeneralLayout,
    main: Doc,
  },
];

export default routes;
