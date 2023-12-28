import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Input,
  Row,
  Col,
  CardImg,
  Modal,
  ModalHeader,
  ModalBody,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { getPhotos, deletePhoto, addPhoto } from "./api/PhotoService";
import Photo from "./components/Photo";

function App() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [modal, setModal] = useState(false);
  const [modal_ct, setModal_ct] = useState(null);
  const [modal_d, setModal_d] = useState(null);

  const toggle = (ct, data) => {
    setModal(!modal);
    setModal_ct(ct ? ct : null);
    setModal_d(data ? data : null);
  };

  const fetchData = async () => {
    try {
      const response = await getPhotos(currentPage - 1, 12);
      setData(response.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("data", file);
      await addPhoto(formData);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePhoto(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <Container fluid className="vh-100 d-flex flex-column p-0">
      <Modal isOpen={modal} toggle={toggle} size="xl" centered={true}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <CardImg
            src={`data:${modal_ct};base64, ${modal_d}`}
            alt={"modal_image"}
            style={{
              maxWidth: "60%",
              objectFit: "cover",
              margin: "0 auto",
              display: "block",
            }}
          />
        </ModalBody>
      </Modal>

      <Container fluid className="bg-secondary">
        <h1 className="text-center text-white p-4">Galleria</h1>
        <div className=" p-4 text-white">
          <div className="d-flex flex-column w-50 mx-auto align-items-center gap-4">
            <Input type="file" onChange={handleFileChange} />
            <Button color="primary" onClick={handleUpload}>
              Carica
            </Button>
          </div>
        </div>
      </Container>

      <Container className="d-flex flex-column justify-content-between">
        <Pagination className="w-25 mx-auto my-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index + 1} active={index + 1 === currentPage}>
              <PaginationLink onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </Pagination>

        <Row>
          {data.content &&
            data.content.map((photo) => (
              <Col sm="6" md="4" lg="3" key={photo.id}>
                <Photo
                  photo={photo}
                  toggle={toggle}
                  handleDelete={handleDelete}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </Container>
  );
}

export default App;
