import "./App.css";

import { RouterProvider,Route,createRoutesFromElements, createBrowserRouter } from "react-router-dom";

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

      <Route path="otheruserprofile/:id" element={<OtherUserProfilePage/>} /> {/**profile of other user*/}

      <Route path="error" element={<>Internal server error</>}/>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
