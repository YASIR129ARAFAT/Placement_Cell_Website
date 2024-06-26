import "./App.css";

import Login from "./pages/LoginPage.jsx";
import Registration from "./pages/RegistrationPage.jsx";
import ProfileCard from "./components/ProfileCard";
import AllAnnouncement from "./pages/AllAnnouncementPage.jsx";
import SingleAnnouncement from "./pages/SingleAnnouncementPage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";
import OpeningsPage from "./pages/OpeningsPage.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import AllUsersPage from "./pages/AllUsersPage.jsx";
import AllAdminPage from './pages/allAdminPage.jsx' 
import EditAnnouncementsPage from "./pages/editAnnouncementsPage.jsx";
import EditResultsPage from "./pages/EditResultsPage.jsx";
import OtherUserProfilePage from "./pages/OtherUserProfilePage.jsx";
import UpdateUserDataPage from "./pages/updateUserDataPage.jsx";
import AddOpeningPage from "./pages/addOpeningPage.jsx";
import ChangePasswordPage from "./pages/changePasswordPage.jsx";
import SingleOpeningPage from "./pages/SingleOpeningPage.jsx";
import AddSelectionsPage from "./pages/AddSelectionsPage.jsx";
import AllSelectionsPage from "./pages/AllSelectionsPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

import { RouterProvider,Route,createRoutesFromElements, createBrowserRouter } from "react-router-dom";
import ResetPasswordPage from "./pages/ResetPAsswordPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<Login />} />
      <Route path="register" element={<Registration />} />
      <Route path="profile" element={<ProfileCard/>}/>
      <Route path="allannouncements" element={<AllAnnouncement/>}/>
      <Route path="singleannouncement/:_id" element={<SingleAnnouncement/>}/>
      <Route path="results" element={<ResultsPage/>}/>
      <Route path="openings" element={<OpeningsPage/>}/>
      <Route path="userprofile" element={<UserProfilePage/>}/> {/**my profile */}
      <Route path="alluser" element={<AllUsersPage/>}/>
      <Route path="alladmins" element={<AllAdminPage/>}/>
      <Route path="editAnnouncement/:id" element={<EditAnnouncementsPage/>} />
      <Route path="editResults/:id" element={<EditResultsPage/>} />
      <Route path="updateUser/:id" element={<UpdateUserDataPage/>} />
      <Route path="changePassword" element={<ChangePasswordPage/>} />
      <Route path="addOpening" element={<AddOpeningPage/>} />
      <Route path="singleOpening/:_id" element={<SingleOpeningPage/>} />
      <Route path="addSelections/:_id" element={<AddSelectionsPage/>} />
      <Route path="allSelections" element={<AllSelectionsPage/>} />
      <Route path="otheruserprofile/:id" element={<OtherUserProfilePage/>} /> {/**profile of other user*/}

      <Route path="errorPage/:message" element={<ErrorPage/>}/>
      <Route path="forgotPassword" element={<ForgotPassword/>}/>
      <Route path="reset/:id" element={<ResetPasswordPage/>}/>


      <Route path="*" element={<PageNotFound/>}/>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
