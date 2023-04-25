import Companies from "../../../components/Companies"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Layout from "../../../components/Layout";
import PrivateRoute from "../../../components/authentication/PrivateRoute";

function companies() {
  return (
    <div>
      <Layout>
        <PrivateRoute>
          {/* <Sidebar /> */}
          <Companies />
        </PrivateRoute>
      </Layout>
    </div>
  )
}

export default companies