import Layout from "../../components/Layout";
import PrivateRoute from "../../components/authentication/PrivateRoute";
import Head from "next/head";
import Main from "../../components/Main";
import Sidebar from "../../components/Sidebar/Sidebar";
import Link from "next/link";


const UserIndex =() =>{
    return(
        <Layout>
        <PrivateRoute>
        <div className="text-dark">
            <Head>
                <title>Dashboard</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <Sidebar />
                <Main />
            </div>
        </div>
        </PrivateRoute>
        </Layout>
    )
}

export default UserIndex;


// export default function Home() {
//     return (
//         <div>
//             <Head>
//                 <title>Collabbi</title>
//                 <meta
//                     name="description"
//                     content="Generated by create next app"
//                 />
//                 <link rel="icon" href="/favicon.ico" />
//             </Head>
//             <div>
//                 <Sidebar />
//                 <Main />
//             </div>
//         </div>
//     );
// }