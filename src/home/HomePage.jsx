import { useQuery } from "@apollo/client"
import { useAuthStore } from "../hooks"
import { GET_USERS } from "../graphql/user"
import { useState } from "react"

export const HomePage = () => {

    const { user } = useAuthStore()
    const { startLogout } = useAuthStore()

    const { loading, error, data } = useQuery(GET_USERS)

    const logout = () => {
        startLogout()
    }

    const [ currentPage, setCurrentPage ] = useState(1)


    const recordsPerPage = 5
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = !loading && data != undefined && data.users.slice(firstIndex, lastIndex)
    const npage = !loading && data != undefined && Math.ceil(data.users.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    function prePage() {
        if( currentPage !== 1 ) {
            setCurrentPage(currentPage - 1)
        }
    }

    function changeCPage( id ) {
        setCurrentPage(id)
    }

    function nextPage() {
        if( currentPage !== npage ) {
            setCurrentPage(currentPage + 1)
        }
    }    

    return (
        <div className="container m-auto h-screen flex items-center justify-center">
            <div className="bg-zinc-900 rounded-lg shadow-lg shadow-black p-8 h-3/5 w-3/5">
                <div className="flex justify-between gap-x-1">
                    <div className="overflow-y-auto h-96 w-full px-5 py-5">
                        <div className="text-right"><button onClick={logout} type="button" className="btn btn-danger">Logout</button></div>
                        <h1 className="text-2xl font-bold py-2 mb-4">{user.name} {user.lastName}, Welcome to Manager Panel</h1>
                        <div className="bg-zinc-800 w-full rounded-lg shadow-lg shadow-black p-4 mb-2 hover:bg-zinc-700 hover: cursor-pointer">
                            <h2>Users</h2>

                            {(loading ) && <p>Loading...</p>}
                            {(error) && <p>Error...</p>}
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(!loading && !error) && records.map((item, i) => (
                                        <tr key={i}>
                                            <td>{item.name}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.email}</td>
                                        </tr>
                                        
                                    ))} 
                                </tbody>
                            </table>
                            <nav>
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a href="#" className="page-link" onClick={prePage}>Prev</a>
                                    </li>
                                    {
                                        numbers.map((n, i) => (
                                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                                <a href="#" className="page-link" onClick={() => changeCPage(n)}>{n}</a>
                                            </li>
                                        ))
                                    }
                                     <li className="page-item">
                                        <a href="#" className="page-link" onClick={nextPage}>Next</a>
                                    </li>
                                </ul>
                            </nav>
                
                        </div>
                    </div>
                </div>
            </div>
       </div>
    )
}
