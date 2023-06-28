import "./Assets/style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CheckUser from "./Components/checkUser/Index";
import Home from "./Components/Home/index";
import SignUp from "./Components/SignUp";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
// admin 
import Profile from "./Components/Users/Admin/profile/index";
import Dashboard from "./Components/Users/Admin/DashBoard/Index";
import Users from "./Components/Users/Admin/Users/Index";
import AddUser from "./Components/Users/Admin/Users/AddUser";
import EditUser from "./Components/Users/Admin/Users/EditUser";
import Segments from "./Components/Users/Admin/Segments/Index";
import AddSegment from "./Components/Users/Admin/Segments/Add";
import EditSegment from "./Components/Users/Admin/Segments/Edit";
import Guides from "./Components/Users/Admin/Guides/Index";
import AddGuide from "./Components/Users/Admin/Guides/Add";
import EditGuide from "./Components/Users/Admin/Guides/Edit";
import Department from "./Components/Users/Admin/Department/Index";
import AddDepartment from "./Components/Users/Admin/Department/AddDepartment";
import EditDepartment from "./Components/Users/Admin/Department/EditDepartment";
import ChangePassword from "./Components/Users/Admin/ChangePassword/Index";
import CompanySetting from "./Components/Users/Admin/CompanySetting/Index";
// user 
import SetUserPassword from "./Components/SetUserPassword";
import Search from "./Components/Users/Admin/Search/Index";
import Trending from "./Components/Users/Admin/Trending/Index";

// guide Manager 
import GuideDashboard from "./Components/Users/GuideManager/DashBoard/Index";
import GuideProfile from "./Components/Users/GuideManager/profile/index";
import GuideUsers from "./Components/Users/GuideManager/Users/Index";
import GuideSegments from "./Components/Users/GuideManager/Segments/Index";
import GuideAddSegment from "./Components/Users/GuideManager/Segments/Add";
import GuideEditSegment from "./Components/Users/GuideManager/Segments/Edit";
import GuideGuides from "./Components/Users/GuideManager/Guides/Index";
import GuideAddGuide from "./Components/Users/GuideManager/Guides/Add";
import GuideEditGuide from "./Components/Users/GuideManager/Guides/Edit";
import GuideDepartment from "./Components/Users/GuideManager/Department/Index";
import GuideChangePassword from "./Components/Users/GuideManager/ChangePassword/Index";
import GuideCompanySetting from "./Components/Users/GuideManager/CompanySetting/Index";
import GuideSearch from "./Components/Users/GuideManager/Search/Index";
// staff 
import StaffDashboard from "./Components/Users/Staff/DashBoard/Index";
import StaffProfile from "./Components/Users/Staff/profile/index";
import StaffUsers from "./Components/Users/Staff/Users/Index";
import StaffSegments from "./Components/Users/Staff/Segments/Index";
import StaffGuides from "./Components/Users/Staff/Guides/Index";
import StaffDepartment from "./Components/Users/Staff/Department/Index";
import StaffChangePassword from "./Components/Users/Staff/ChangePassword/Index";
import StaffCompanySetting from "./Components/Users/Staff/CompanySetting/Index";
import StaffSearch from "./Components/Users/Staff/Search/Index";

// payment 
import PackagePlans from "./Components/Users/Admin/PackagePlans/Index";
import PaymentSuccess from "./Components/Payment/PaymentSuccess";
import PaymentFailed from "./Components/Payment/PaymentFailed";

import Test from "./Components/GeneralComponents/test";
import Calendra from "./Components/Users/Admin/Calendra";

import Clipboard from "./Components/clipBoardCopy";
function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/checkuser" component={CheckUser} />
                    <Route exact path="/signin" component={Home} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/user/verify/:token" component={Home} />
                    <Route exact path="/password/reset/:token/:email" component={ResetPassword} />
                    <Route exact path="/password/set/:token" component={SetUserPassword} />
                    <Route exact path="/forgot-password" component={ForgotPassword} />
                    <Route exact path="/clipboard" component={Clipboard} />
                    {/* admin Panel Routes */}
                    <Route exact path="/admin/dashboard" component={Dashboard} />
                    <Route exact path="/admin/users" component={Users} />
                    <Route exact path="/admin/add/user" component={AddUser} />
                    <Route exact path="/admin/edit/user/:user_id" component={EditUser} />
                    <Route exact path="/admin/segments" component={Segments} />
                    <Route exact path="/admin/add/segment" component={AddSegment} />
                    <Route exact path="/admin/edit/segment/:segment_id" component={EditSegment} />
                    <Route exact path="/admin/guides" component={Guides} />
                    <Route exact path="/admin/add/guide" component={AddGuide} />
                    <Route exact path="/admin/edit/guide/:guide_id" component={EditGuide} />
                    <Route exact path="/admin/department" component={Department} />
                    <Route exact path="/admin/add/department" component={AddDepartment} />
                    <Route exact path="/admin/edit/department/:dept_id" component={EditDepartment} />
                    <Route exact path="/admin/profile" component={Profile} />
                    <Route exact path="/admin/changepassword" component={ChangePassword} />
                    <Route exact path="/admin/companysetting" component={CompanySetting} />
                    <Route exact path="/admin/search" component={Search} />
                    <Route exact path="/admin/calendra" component={Calendra} />
                    <Route exact path="/admin/trending" component={Trending} />

                    {/* Guide manager  */}

                    <Route exact path="/guide/dashboard" component={GuideDashboard} />
                    <Route exact path="/guide/users" component={GuideUsers} />
                    <Route exact path="/guide/segments" component={GuideSegments} />
                    <Route exact path="/guide/add/segment" component={GuideAddSegment} />
                    <Route exact path="/guide/edit/segment/:segment_id" component={GuideEditSegment} />
                    <Route exact path="/guide/guides" component={GuideGuides} />
                    <Route exact path="/guide/add/guide" component={GuideAddGuide} />
                    <Route exact path="/guide/edit/guide/:guide_id" component={GuideEditGuide} />
                    <Route exact path="/guide/department" component={GuideDepartment} />
                    <Route exact path="/guide/profile" component={GuideProfile} />
                    <Route exact path="/guide/changepassword" component={GuideChangePassword} />
                    <Route exact path="/guide/companysetting" component={GuideCompanySetting} />
                    <Route exact path="/guide/search" component={GuideSearch} />

                    <Route exact path="/staff/dashboard" component={StaffDashboard} />
                    <Route exact path="/staff/users" component={StaffUsers} />
                    <Route exact path="/staff/segments" component={StaffSegments} />
                    <Route exact path="/staff/guides" component={StaffGuides} />
                    <Route exact path="/staff/department" component={StaffDepartment} />
                    <Route exact path="/staff/profile" component={StaffProfile} />
                    <Route exact path="/staff/changepassword" component={StaffChangePassword} />
                    <Route exact path="/staff/companysetting" component={StaffCompanySetting} />
                    <Route exact path="/staff/search" component={StaffSearch} />
                    {/* Packages  */}
                    <Route exact path="/admin/packages" component={PackagePlans} />
                    <Route exact path="/admin/thank-you" component={PaymentSuccess} />
                    <Route exact path="/admin/payment-failed" component={PaymentFailed} />
                    <Route exact path="/test" component={Test} />
                    
                </Switch>
            </Router>
        </>
    );
}

export default App;
