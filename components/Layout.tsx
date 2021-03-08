import NavBar from "./Nav-bar";

const Layout = ({children}) => {
    return (
        <div>
            <NavBar />
            <div>
                {children}
            </div>
        </div>
    )
}

export default Layout;