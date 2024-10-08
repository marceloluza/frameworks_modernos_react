import './App.css'
import { Container, Nav, Navbar } from 'react-bootstrap'
import RotaPage from './utils/RotaPage'

function App() {

  return (
    <>
      <div className={`container`}>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">Meu app</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/cliente">Clientes</Nav.Link>
                <Nav.Link href="/lista-cliente">Lista Clientes</Nav.Link>
                <Nav.Link href="/produto">Produtos</Nav.Link>
                <Nav.Link href="/lista-produto">Lista Produtos</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        
        <RotaPage></RotaPage>
      </div>
    </>
  )
}

export default App
