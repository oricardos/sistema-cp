import { useState } from "react";
import { Button, Container, Grid, Input, Modal, Text } from "@nextui-org/react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Nome",
    selector: (row) => row.title,
  },
  {
    name: "Email",
    selector: (row) => row.year,
  },
  {
    name: "Telefone",
    selector: (row) => row.year,
  },
  {
    name: "Cidade",
    selector: (row) => row.year,
  },
];

const datas = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
];

function App() {
  const [visible, setVisible] = useState(false);
  const handleModal = () => setVisible(true);
  const handleCloseModal = () => setVisible(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const getItemsFromLocalStorage = () =>
    JSON.parse(localStorage.getItem("clients")) || [];
  const setItemsFromLocalStorage = (value) =>
    localStorage.setItem("clients", JSON.stringify(value));

  const handleChange = (evt) => {
    const value = evt.target.value;
    setData({ ...data, value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setItemsFromLocalStorage(data);
    console.log(data);
  };

  return (
    <Container css={{ mt: 20 }}>
      <Button auto onClick={handleModal}>
        Cadastrar Cliente
      </Button>

      <Modal
        width="600px"
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={handleCloseModal}
      >
        <Modal.Header>
          <Text id="modal-title" size={18} b>
            Novo Cliente
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Grid.Container gap={2} justify="center">
            <Grid xs={12} md={6}>
              <Input
                required
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                labelPlaceholder="Nome"
                onChange={handleChange}
                css={{ mb: 20 }}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Input
                required
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                labelPlaceholder="Email"
                onChange={handleChange}
                css={{ mb: 20 }}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Input
                required
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                labelPlaceholder="Telefone"
                onChange={handleChange}
                css={{ mb: 20 }}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Input
                required
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                labelPlaceholder="Cidade"
                onChange={handleChange}
                css={{ mb: 20 }}
              />
            </Grid>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button auto onClick={handleSubmit}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <DataTable columns={columns} data={datas} />
    </Container>
  );
}

export default App;
