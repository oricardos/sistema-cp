import { useEffect, useState } from "react";
import { Button, Container, Grid, Input, Modal, Text } from "@nextui-org/react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "id",
    selector: (row) => row.name,
  },
  {
    name: "name",
    selector: (row) => row.email,
  },
];

function App() {
  const [visible, setVisible] = useState(false);
  const handleModal = () => setVisible(true);
  const handleCloseModal = () => setVisible(false);
  const [data, setData] = useState([
    {
      name: "",
      email: "",
      phone: "",
      city: "",
    },
  ]);

  const getItemsFromLocalStorage = () =>
    JSON.parse(localStorage.getItem("clients")) || [];

  const setItemsFromLocalStorage = (value) =>
    localStorage.setItem("clients", JSON.stringify(value));

  //CREATE
  const createClient = (client) => {
    const db_client = getItemsFromLocalStorage();
    db_client.push(client);
    setItemsFromLocalStorage(db_client);
  };
  //Read
  const readClient = () => getItemsFromLocalStorage();

  //Delete
  const updateClient = (index, client) => {
    const updtClient = readClient();
    updtClient[index] = client;
    setItemsFromLocalStorage(updtClient);
  };

  const deleteClient = (index) => {
    const delClient = readClient();
    delClient.splice(index, 1);
    setItemsFromLocalStorage(delClient);
    updateClient();
  };
  let datatableData = {
    title: "Teste",
    columns: [
      {
        name: "Name",
        selector: (row) => row.name,
      },
      {
        name: "email",
        selector: (row) => row.email,
      },
      {
        name: "phone",
        selector: (row) => row.phone,
      },
      {
        name: "city",
        selector: (row) => row.city,
      },
    ],
  };

  const handleChange = (evt) => {
    let value = evt.target.value;
    setData({ ...data, [evt.target.name]: value });
  };

  const handleSubmit = (evt, index) => {
    evt.preventDefault();
    setItemsFromLocalStorage(data);
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
                name="name"
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
                name="email"
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
                name="phone"
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
                name="city"
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

      {/*<DataTable columns={datatableData} data={data} />*/}
    </Container>
  );
}

export default App;
