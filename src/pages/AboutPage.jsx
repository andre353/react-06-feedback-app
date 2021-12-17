import Card from '../components/shared/Card'
import {Link, NavLink} from 'react-router-dom'

function AboutPage() {
    return (
        <>
            <Card>
                <NavLink to='/' className="nav-link" activeClassName='active'>Home</NavLink>
                <NavLink to='/about' className="nav-link" activeClassName='active'>About</NavLink>
                <NavLink to='/post' className="nav-link" activeClassName='active'>Post</NavLink>
            </Card>
            <Card>
                <div className="about">
                    <h1>About This Project</h1>
                    <p>This is a React app to leave feedback for a product or service</p>
                    <p>Version: 1.0.0</p>
                    <p>
                        <Link to='/'>Back To Home</Link>
                    </p>
                </div>
            </Card>
        </>
    )
}

export default AboutPage
