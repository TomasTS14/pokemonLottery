import Link from "next/link";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
export default function MyNavbar() {

    const paths = [
        { path: "/home", name: "Home" },
        { path: "/home/collection", name: "Collection" },
        { path: "/home/profile", name: "Profile" },
        { path: "/home/about", name: "About" },

    ];

    return (
        <Navbar fixed="top" bg="warning" expand="lg" className="text-black">
            <Container>
                <Navbar.Brand>Pokemon Lottery</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {paths.map((path, index) => (
                            <Nav.Link as="span" key={index}>
                                <Link className="nav-link" href={path.path}>
                                    {path.name}
                                </Link>
                            </Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
                <Button variant="danger" onClick={(e) => {
                    sessionStorage.removeItem("credentials");
                    window.location.reload();
                }}>Signout</Button>
            </Container>
        </Navbar >
    )
}